import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  CodexForgeToolDefinition,
  CodexForgeToolExecutionContext,
  CodexForgeToolResult,
  CodexForgeToolWarning,
} from "./contracts";
import {
  asBoolean,
  asNumber,
  asOptionalString,
  buildStartedAt,
  clampText,
  finishToolError,
  finishToolSuccess,
  normalizeWindowsPath,
} from "./shared";

/* ================= CONSTANTS ================= */

const TOOL_NAME = "apply-diff";

const DEFAULT_MAX_PATCH_CHARS = 120_000;
const MAX_PATCH_CHARS = 250_000;
const DEFAULT_MAX_FILE_CHARS = 1_000_000;
const MAX_FILE_CHARS = 2_000_000;

const BLOCKED_DIRS = new Set([
  ".git",
  "node_modules",
  ".next",
  "dist",
  "build",
  "out",
  "coverage",
  ".turbo",
  ".vercel",
]);

/* ================= TYPES ================= */

type ApplyDiffInput = {
  path?: string;
  patch?: string;
  originalContent?: string;
  createIfMissing?: boolean;
  dryRun?: boolean;
  createBackup?: boolean;
  ensureTrailingNewline?: boolean;
  maxPatchChars?: number;
  maxFileChars?: number;
};

type ResolvedScope = {
  requestedPath: string;
  basePath: string;
  absolutePath: string;
  relativePath: string;
};

type ParsedPatch = {
  oldHeader: string;
  newHeader: string;
  hunks: ParsedHunk[];
};

type ParsedHunkLine =
  | { type: "context"; text: string }
  | { type: "add"; text: string }
  | { type: "remove"; text: string };

type ParsedHunk = {
  oldStart: number;
  oldCount: number;
  newStart: number;
  newCount: number;
  lines: ParsedHunkLine[];
};

type ApplyStats = {
  created: boolean;
  changed: boolean;
  unchanged: boolean;
  dryRun: boolean;
  additions: number;
  removals: number;
  hunks: number;
  oldBytes: number;
  newBytes: number;
  byteDelta: number;
  oldLineCount: number;
  newLineCount: number;
  lineDelta: number;
  backupPath?: string;
};

/* ================= HELPERS ================= */

function cleanInputPath(value: string): string {
  return value.trim().replaceAll("/", path.sep);
}

function isAbsolutePath(value: string): boolean {
  return path.isAbsolute(value);
}

function pickBasePath(context: CodexForgeToolExecutionContext): string {
  const repoPath = asOptionalString(context.repoPath);
  const cwd = asOptionalString(context.cwd);
  const workspaceRoot = asOptionalString(context.workspaceRoot);

  return repoPath ?? cwd ?? workspaceRoot ?? process.cwd();
}

function ensureInsideBase(targetPath: string, basePath: string): boolean {
  const normalizedTarget = path.resolve(targetPath);
  const normalizedBase = path.resolve(basePath);

  if (normalizedTarget === normalizedBase) {
    return true;
  }

  const relative = path.relative(normalizedBase, normalizedTarget);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function hasBlockedPathSegment(relativePath: string): string | null {
  const segments = normalizeWindowsPath(relativePath)
    .split("\\")
    .map((segment) => segment.trim())
    .filter(Boolean);

  for (const segment of segments) {
    if (BLOCKED_DIRS.has(segment)) {
      return segment;
    }
  }

  return null;
}

function clampNumber(
  value: number | undefined,
  fallback: number,
  min: number,
  max: number
): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(Math.max(value, min), max);
}

function normalizeInput(input: Record<string, unknown>): ApplyDiffInput {
  return {
    path: asOptionalString(input.path),
    patch: typeof input.patch === "string" ? input.patch : undefined,
    originalContent:
      typeof input.originalContent === "string" ? input.originalContent : undefined,
    createIfMissing: asBoolean(input.createIfMissing, true),
    dryRun: asBoolean(input.dryRun, true),
    createBackup: asBoolean(input.createBackup, true),
    ensureTrailingNewline: asBoolean(input.ensureTrailingNewline, false),
    maxPatchChars: asNumber(input.maxPatchChars),
    maxFileChars: asNumber(input.maxFileChars),
  };
}

function resolveScope(
  requestedPath: string,
  context: CodexForgeToolExecutionContext
): ResolvedScope {
  const basePath = path.resolve(pickBasePath(context));
  const cleaned = cleanInputPath(requestedPath);

  const absolutePath = isAbsolutePath(cleaned)
    ? path.resolve(cleaned)
    : path.resolve(basePath, cleaned);

  if (!ensureInsideBase(absolutePath, basePath)) {
    throw new Error("Requested apply path is outside the allowed workspace scope.");
  }

  const relativePath = normalizeWindowsPath(path.relative(basePath, absolutePath));
  const blockedSegment = hasBlockedPathSegment(relativePath);

  if (blockedSegment) {
    throw new Error(`Diff apply inside '${blockedSegment}' is blocked.`);
  }

  return {
    requestedPath,
    basePath,
    absolutePath,
    relativePath,
  };
}

function normalizeContent(
  content: string,
  ensureTrailingNewline: boolean,
  maxChars: number
): string {
  let normalized = content.replace(/\r\n/g, "\n");

  if (ensureTrailingNewline && !normalized.endsWith("\n")) {
    normalized += "\n";
  }

  if (normalized.length > maxChars) {
    throw new Error(
      `Content exceeds maximum allowed length of ${maxChars} characters.`
    );
  }

  return normalized;
}

function splitLines(text: string): string[] {
  if (text.length === 0) {
    return [];
  }

  return text.split("\n");
}

function countLines(text: string): number {
  if (text.length === 0) {
    return 0;
  }

  return text.split("\n").length;
}

function parseRangePart(value: string): { start: number; count: number } {
  const match = value.match(/^(\d+)(?:,(\d+))?$/);
  if (!match) {
    throw new Error(`Invalid hunk range '${value}'.`);
  }

  const start = Number(match[1]);
  const count = match[2] ? Number(match[2]) : 1;

  if (!Number.isFinite(start) || !Number.isFinite(count)) {
    throw new Error(`Invalid hunk range '${value}'.`);
  }

  return {
    start,
    count,
  };
}

function parsePatch(patch: string): ParsedPatch {
  const normalized = patch.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");

  if (lines.length < 2) {
    throw new Error("Patch is too short.");
  }

  const oldHeader = lines[0];
  const newHeader = lines[1];

  if (!oldHeader.startsWith("--- ")) {
    throw new Error("Patch is missing the old file header.");
  }

  if (!newHeader.startsWith("+++ ")) {
    throw new Error("Patch is missing the new file header.");
  }

  const hunks: ParsedHunk[] = [];
  let index = 2;

  while (index < lines.length) {
    const line = lines[index];

    if (!line) {
      index += 1;
      continue;
    }

    const hunkHeaderMatch = line.match(/^@@ -(\d+(?:,\d+)?) \+(\d+(?:,\d+)?) @@$/);
    if (!hunkHeaderMatch) {
      throw new Error(`Invalid hunk header '${line}'.`);
    }

    const oldRange = parseRangePart(hunkHeaderMatch[1]);
    const newRange = parseRangePart(hunkHeaderMatch[2]);

    index += 1;

    const hunkLines: ParsedHunkLine[] = [];
    while (index < lines.length) {
      const hunkLine = lines[index];

      if (hunkLine.startsWith("@@ ")) {
        break;
      }

      if (hunkLine.startsWith("--- ") && hunkLines.length === 0) {
        break;
      }

      if (hunkLine.startsWith("+")) {
        hunkLines.push({ type: "add", text: hunkLine.slice(1) });
      } else if (hunkLine.startsWith("-")) {
        hunkLines.push({ type: "remove", text: hunkLine.slice(1) });
      } else if (hunkLine.startsWith(" ")) {
        hunkLines.push({ type: "context", text: hunkLine.slice(1) });
      } else if (hunkLine === "\\ No newline at end of file") {
        // ignored for now
      } else if (hunkLine === "") {
        hunkLines.push({ type: "context", text: "" });
      } else {
        throw new Error(`Invalid hunk line '${hunkLine}'.`);
      }

      index += 1;
    }

    hunks.push({
      oldStart: oldRange.start,
      oldCount: oldRange.count,
      newStart: newRange.start,
      newCount: newRange.count,
      lines: hunkLines,
    });
  }

  return {
    oldHeader,
    newHeader,
    hunks,
  };
}

function applyParsedPatch(oldContent: string, parsed: ParsedPatch): {
  newContent: string;
  additions: number;
  removals: number;
} {
  const sourceLines = splitLines(oldContent);
  const outputLines: string[] = [];

  let sourceIndex = 0;
  let additions = 0;
  let removals = 0;

  for (const hunk of parsed.hunks) {
    const hunkStartIndex = Math.max(0, hunk.oldStart - 1);

    while (sourceIndex < hunkStartIndex && sourceIndex < sourceLines.length) {
      outputLines.push(sourceLines[sourceIndex]);
      sourceIndex += 1;
    }

    for (const line of hunk.lines) {
      if (line.type === "context") {
        const actual = sourceLines[sourceIndex] ?? "";
        if (actual !== line.text) {
          throw new Error(
            `Patch context mismatch near line ${sourceIndex + 1}. Expected '${line.text}' but found '${actual}'.`
          );
        }

        outputLines.push(actual);
        sourceIndex += 1;
        continue;
      }

      if (line.type === "remove") {
        const actual = sourceLines[sourceIndex] ?? "";
        if (actual !== line.text) {
          throw new Error(
            `Patch removal mismatch near line ${sourceIndex + 1}. Expected '${line.text}' but found '${actual}'.`
          );
        }

        sourceIndex += 1;
        removals += 1;
        continue;
      }

      if (line.type === "add") {
        outputLines.push(line.text);
        additions += 1;
      }
    }
  }

  while (sourceIndex < sourceLines.length) {
    outputLines.push(sourceLines[sourceIndex]);
    sourceIndex += 1;
  }

  return {
    newContent: outputLines.join("\n"),
    additions,
    removals,
  };
}

function buildBackupPath(absolutePath: string): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .replace("T", "_")
    .replace("Z", "");

  return `${absolutePath}.bak.${timestamp}`;
}

async function ensureParentDirectory(absolutePath: string): Promise<void> {
  const parent = path.dirname(absolutePath);
  await fs.mkdir(parent, { recursive: true });
}

function buildStats(args: {
  oldContent: string;
  newContent: string;
  additions: number;
  removals: number;
  hunks: number;
  created: boolean;
  dryRun: boolean;
  backupPath?: string;
}): ApplyStats {
  const oldBytes = Buffer.byteLength(args.oldContent, "utf8");
  const newBytes = Buffer.byteLength(args.newContent, "utf8");
  const oldLineCount = countLines(args.oldContent);
  const newLineCount = countLines(args.newContent);

  return {
    created: args.created,
    changed: args.oldContent !== args.newContent,
    unchanged: args.oldContent === args.newContent,
    dryRun: args.dryRun,
    additions: args.additions,
    removals: args.removals,
    hunks: args.hunks,
    oldBytes,
    newBytes,
    byteDelta: newBytes - oldBytes,
    oldLineCount,
    newLineCount,
    lineDelta: newLineCount - oldLineCount,
    ...(args.backupPath ? { backupPath: args.backupPath } : {}),
  };
}

function buildSummary(relativePath: string, absolutePath: string, stats: ApplyStats): string {
  const displayPath = relativePath || normalizeWindowsPath(absolutePath);

  if (stats.unchanged) {
    return `${stats.dryRun ? "Validated" : "Applied"} diff for ${displayPath} • no content change`;
  }

  const parts = [
    `${stats.dryRun ? "Validated" : "Applied"} diff for ${displayPath}`,
  ];

  if (stats.created) {
    parts.push("new file");
  }

  parts.push(`+${stats.additions}/-${stats.removals}`);

  if (stats.dryRun) {
    parts.push("dry run");
  }

  return parts.join(" • ");
}

/* ================= TOOL ================= */

export const applyDiffTool: CodexForgeToolDefinition = {
  name: "apply-diff",
  label: "Apply Diff",
  description:
    "Apply a unified diff to a workspace-scoped file with guarded path validation, dry-run support, backup creation, and structured apply metadata.",
  availability: "ready",
  domain: "repo",
  safety: "elevated",
  capabilities: ["diff", "write"],
  tags: [
    "diff",
    "apply",
    "patch",
    "workspace-guarded",
    "dry-run",
    "backup",
    "server-only",
  ],
  parameters: [
    {
      name: "path",
      type: "string",
      description: "Project-relative or absolute target file path.",
      required: true,
    },
    {
      name: "patch",
      type: "string",
      description: "Unified diff patch to apply.",
      required: true,
    },
    {
      name: "originalContent",
      type: "string",
      description:
        "Optional explicit original content. If omitted, the current file is read from disk.",
      required: false,
    },
    {
      name: "createIfMissing",
      type: "boolean",
      description: "Whether missing target files may be created.",
      required: false,
      defaultValue: true,
    },
    {
      name: "dryRun",
      type: "boolean",
      description: "Whether to validate and compute the result without writing the file.",
      required: false,
      defaultValue: true,
    },
    {
      name: "createBackup",
      type: "boolean",
      description: "Whether to create a timestamped backup before writing.",
      required: false,
      defaultValue: true,
    },
    {
      name: "ensureTrailingNewline",
      type: "boolean",
      description: "Whether to ensure the final written content ends with a newline.",
      required: false,
      defaultValue: false,
    },
    {
      name: "maxPatchChars",
      type: "number",
      description: "Maximum patch size accepted by the tool.",
      required: false,
      defaultValue: DEFAULT_MAX_PATCH_CHARS,
    },
    {
      name: "maxFileChars",
      type: "number",
      description: "Maximum source or result content size accepted by the tool.",
      required: false,
      defaultValue: DEFAULT_MAX_FILE_CHARS,
    },
  ],
  examples: [
    {
      title: "Validate a patch without writing",
      input: {
        path: "src/lib/codexforge/tools/index.ts",
        patch: "--- a/src/lib/codexforge/tools/index.ts\n+++ b/src/lib/codexforge/tools/index.ts\n@@ -1,1 +1,1 @@\n-old\n+new",
        dryRun: true,
      },
    },
    {
      title: "Apply a patch and create a backup",
      input: {
        path: "src/lib/codexforge/tools/index.ts",
        patch: "--- a/src/lib/codexforge/tools/index.ts\n+++ b/src/lib/codexforge/tools/index.ts\n@@ -1,1 +1,1 @@\n-old\n+new",
        dryRun: false,
        createBackup: true,
      },
    },
  ],
  metadata: {
    provider: "local",
    version: "codexforge-apply-diff-v1",
    supportedPlatforms: ["windows", "linux", "darwin"],
    tags: ["filesystem", "workspace-guarded", "mutation", "preview", "server-only"],
    requiresRuntime: "server",
  },
  handler: async (
    rawInput: Record<string, unknown>,
    context: CodexForgeToolExecutionContext
  ): Promise<CodexForgeToolResult> => {
    const startedAt = buildStartedAt();

    try {
      const input = normalizeInput(rawInput);

      if (!input.path) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Missing path.",
          code: "MISSING_PATH",
          message: "The apply-diff tool requires a path.",
          startedAt,
          retryable: false,
        });
      }

      if (!input.patch) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Missing patch.",
          code: "MISSING_PATCH",
          message: "The apply-diff tool requires a unified diff patch.",
          startedAt,
          retryable: false,
        });
      }

      const maxPatchChars = clampNumber(
        input.maxPatchChars,
        DEFAULT_MAX_PATCH_CHARS,
        1_000,
        MAX_PATCH_CHARS
      );
      const maxFileChars = clampNumber(
        input.maxFileChars,
        DEFAULT_MAX_FILE_CHARS,
        1,
        MAX_FILE_CHARS
      );

      const patch = input.patch.replace(/\r\n/g, "\n");
      if (patch.length > maxPatchChars) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Patch too large.",
          code: "PATCH_TOO_LARGE",
          message: `Patch exceeds maximum allowed size of ${maxPatchChars} characters.`,
          startedAt,
          retryable: false,
        });
      }

      const resolved = resolveScope(input.path, context);
      const warnings: CodexForgeToolWarning[] = [];

      const parsed = parsePatch(patch);

      let oldContent = "";
      let fileExists = false;

      if (typeof input.originalContent === "string") {
        oldContent = normalizeContent(input.originalContent, false, maxFileChars);
        fileExists = true;
        warnings.push({
          code: "ORIGINAL_CONTENT_OVERRIDE",
          message: "Patch apply used provided originalContent instead of reading from disk.",
        });
      } else {
        try {
          const stat = await fs.stat(resolved.absolutePath);
          if (!stat.isFile()) {
            return finishToolError({
              toolName: TOOL_NAME,
              summary: "Target is not a file.",
              code: "NOT_A_FILE",
              message: "The target path exists but is not a file.",
              startedAt,
              retryable: false,
              details: {
                path: resolved.requestedPath,
                absolutePath: resolved.absolutePath,
              },
            });
          }

          const buffer = await fs.readFile(resolved.absolutePath);
          oldContent = normalizeContent(buffer.toString("utf8"), false, maxFileChars);
          fileExists = true;
        } catch {
          if (input.createIfMissing === false) {
            return finishToolError({
              toolName: TOOL_NAME,
              summary: "Target file missing.",
              code: "FILE_NOT_FOUND",
              message: "The target file does not exist and createIfMissing is disabled.",
              startedAt,
              retryable: false,
              details: {
                path: resolved.requestedPath,
                absolutePath: resolved.absolutePath,
              },
            });
          }

          warnings.push({
            code: "MISSING_FILE_TREATED_AS_NEW",
            message: "Missing target file was treated as a new file.",
          });
        }
      }

      const applyResult = applyParsedPatch(oldContent, parsed);
      const finalContent = normalizeContent(
        applyResult.newContent,
        input.ensureTrailingNewline === true,
        maxFileChars
      );

      let backupPath: string | undefined;
      const dryRun = input.dryRun !== false;
      const shouldCreateBackup = input.createBackup !== false;

      if (!dryRun) {
        await ensureParentDirectory(resolved.absolutePath);

        if (fileExists && shouldCreateBackup) {
          backupPath = buildBackupPath(resolved.absolutePath);
          await fs.copyFile(resolved.absolutePath, backupPath);
        }

        await fs.writeFile(resolved.absolutePath, finalContent, "utf8");
      } else {
        warnings.push({
          code: "DRY_RUN_ONLY",
          message: "Diff was validated but not written because dryRun is enabled.",
        });
      }

      const relativeDisplayPath =
        resolved.relativePath.length > 0
          ? resolved.relativePath
          : normalizeWindowsPath(path.basename(resolved.absolutePath));

      const stats = buildStats({
        oldContent,
        newContent: finalContent,
        additions: applyResult.additions,
        removals: applyResult.removals,
        hunks: parsed.hunks.length,
        created: !fileExists,
        dryRun,
        ...(backupPath ? { backupPath } : {}),
      });

      return finishToolSuccess({
        toolName: TOOL_NAME,
        summary: buildSummary(
          relativeDisplayPath,
          resolved.absolutePath,
          stats
        ),
        startedAt,
        warnings: warnings.length > 0 ? warnings : undefined,
        content: {
          type: "json",
          json: {
            requestedPath: resolved.requestedPath,
            relativePath: relativeDisplayPath,
            absolutePath: resolved.absolutePath,
            dryRun: stats.dryRun,
            created: stats.created,
            changed: stats.changed,
            unchanged: stats.unchanged,
            additions: stats.additions,
            removals: stats.removals,
            hunks: stats.hunks,
            oldBytes: stats.oldBytes,
            newBytes: stats.newBytes,
            byteDelta: stats.byteDelta,
            oldLineCount: stats.oldLineCount,
            newLineCount: stats.newLineCount,
            lineDelta: stats.lineDelta,
            ...(stats.backupPath ? { backupPath: stats.backupPath } : {}),
            content: finalContent,
          },
        },
        raw: {
          requestedPath: resolved.requestedPath,
          absolutePath: resolved.absolutePath,
          dryRun: stats.dryRun,
          changed: stats.changed,
          ...(stats.backupPath ? { backupPath: stats.backupPath } : {}),
        },
      });
    } catch (error) {
      return finishToolError({
        toolName: TOOL_NAME,
        summary: "Failed to apply diff.",
        code: "APPLY_DIFF_FAILED",
        message:
          error instanceof Error && error.message.trim().length > 0
            ? clampText(error.message, 400)
            : "An unexpected error occurred while applying the diff.",
        startedAt,
        retryable: false,
      });
    }
  },
};