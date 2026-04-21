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

const TOOL_NAME = "generate-diff";

const DEFAULT_MAX_CONTENT_CHARS = 1_000_000;
const MAX_CONTENT_CHARS = 2_000_000;
const DEFAULT_MAX_PATCH_CHARS = 120_000;
const MAX_PATCH_CHARS = 250_000;

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

type GenerateDiffInput = {
  path?: string;
  content?: string;
  originalContent?: string;
  ensureTrailingNewline?: boolean;
  maxContentChars?: number;
  maxPatchChars?: number;
  contextLines?: number;
  treatMissingAsNewFile?: boolean;
};

type ResolvedDiffScope = {
  requestedPath: string;
  basePath: string;
  absolutePath: string;
  relativePath: string;
};

type ExistingFileInfo = {
  exists: boolean;
  isFile: boolean;
  size: number;
};

type DiffLine =
  | { type: "context"; text: string }
  | { type: "add"; text: string }
  | { type: "remove"; text: string };

type DiffHunk = {
  oldStart: number;
  oldCount: number;
  newStart: number;
  newCount: number;
  lines: DiffLine[];
};

type DiffStats = {
  created: boolean;
  changed: boolean;
  unchanged: boolean;
  oldBytes: number;
  newBytes: number;
  byteDelta: number;
  additions: number;
  removals: number;
  oldLineCount: number;
  newLineCount: number;
  lineDelta: number;
  hunks: number;
  truncated: boolean;
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

function normalizeInput(input: Record<string, unknown>): GenerateDiffInput {
  return {
    path: asOptionalString(input.path),
    content: typeof input.content === "string" ? input.content : undefined,
    originalContent:
      typeof input.originalContent === "string" ? input.originalContent : undefined,
    ensureTrailingNewline: asBoolean(input.ensureTrailingNewline, false),
    maxContentChars: asNumber(input.maxContentChars),
    maxPatchChars: asNumber(input.maxPatchChars),
    contextLines: asNumber(input.contextLines),
    treatMissingAsNewFile: asBoolean(input.treatMissingAsNewFile, true),
  };
}

function resolveDiffScope(
  requestedPath: string,
  context: CodexForgeToolExecutionContext
): ResolvedDiffScope {
  const basePath = path.resolve(pickBasePath(context));
  const cleaned = cleanInputPath(requestedPath);

  const absolutePath = isAbsolutePath(cleaned)
    ? path.resolve(cleaned)
    : path.resolve(basePath, cleaned);

  if (!ensureInsideBase(absolutePath, basePath)) {
    throw new Error("Requested diff path is outside the allowed workspace scope.");
  }

  const relativePath = normalizeWindowsPath(path.relative(basePath, absolutePath));
  const blockedSegment = hasBlockedPathSegment(relativePath);
  if (blockedSegment) {
    throw new Error(`Diff generation inside '${blockedSegment}' is blocked.`);
  }

  return {
    requestedPath,
    basePath,
    absolutePath,
    relativePath,
  };
}

async function getExistingFileInfo(absolutePath: string): Promise<ExistingFileInfo> {
  try {
    const stat = await fs.stat(absolutePath);
    return {
      exists: true,
      isFile: stat.isFile(),
      size: stat.size,
    };
  } catch {
    return {
      exists: false,
      isFile: false,
      size: 0,
    };
  }
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

function splitLinesForDiff(text: string): string[] {
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

function buildLcsTable(a: string[], b: string[]): number[][] {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const table = Array.from({ length: rows }, () => Array<number>(cols).fill(0));

  for (let i = a.length - 1; i >= 0; i -= 1) {
    for (let j = b.length - 1; j >= 0; j -= 1) {
      if (a[i] === b[j]) {
        table[i][j] = table[i + 1][j + 1] + 1;
      } else {
        table[i][j] = Math.max(table[i + 1][j], table[i][j + 1]);
      }
    }
  }

  return table;
}

function buildDiffLines(oldLines: string[], newLines: string[]): DiffLine[] {
  const table = buildLcsTable(oldLines, newLines);
  const lines: DiffLine[] = [];

  let i = 0;
  let j = 0;

  while (i < oldLines.length && j < newLines.length) {
    if (oldLines[i] === newLines[j]) {
      lines.push({ type: "context", text: oldLines[i] });
      i += 1;
      j += 1;
      continue;
    }

    if (table[i + 1][j] >= table[i][j + 1]) {
      lines.push({ type: "remove", text: oldLines[i] });
      i += 1;
    } else {
      lines.push({ type: "add", text: newLines[j] });
      j += 1;
    }
  }

  while (i < oldLines.length) {
    lines.push({ type: "remove", text: oldLines[i] });
    i += 1;
  }

  while (j < newLines.length) {
    lines.push({ type: "add", text: newLines[j] });
    j += 1;
  }

  return lines;
}

function buildHunks(diffLines: DiffLine[], contextLines: number): DiffHunk[] {
  const hunks: DiffHunk[] = [];
  let oldLineNumber = 1;
  let newLineNumber = 1;
  let currentIndex = 0;

  while (currentIndex < diffLines.length) {
    while (
      currentIndex < diffLines.length &&
      diffLines[currentIndex].type === "context"
    ) {
      oldLineNumber += 1;
      newLineNumber += 1;
      currentIndex += 1;
    }

    if (currentIndex >= diffLines.length) {
      break;
    }

    const hunkStartIndex = Math.max(0, currentIndex - contextLines);
    let oldStart = oldLineNumber;
    let newStart = newLineNumber;

    for (let rewindIndex = currentIndex - 1; rewindIndex >= hunkStartIndex; rewindIndex -= 1) {
      if (diffLines[rewindIndex].type === "context") {
        oldStart -= 1;
        newStart -= 1;
      }
    }

    let hunkEndIndex = currentIndex;
    let trailingContext = 0;

    while (hunkEndIndex < diffLines.length) {
      const line = diffLines[hunkEndIndex];

      if (line.type === "context") {
        trailingContext += 1;
        if (trailingContext > contextLines) {
          break;
        }
      } else {
        trailingContext = 0;
      }

      hunkEndIndex += 1;
    }

    const hunkLines = diffLines.slice(hunkStartIndex, hunkEndIndex);

    let oldCount = 0;
    let newCount = 0;

    for (const line of hunkLines) {
      if (line.type === "context") {
        oldCount += 1;
        newCount += 1;
      } else if (line.type === "remove") {
        oldCount += 1;
      } else if (line.type === "add") {
        newCount += 1;
      }
    }

    hunks.push({
      oldStart,
      oldCount,
      newStart,
      newCount,
      lines: hunkLines,
    });

    for (let advanceIndex = currentIndex; advanceIndex < hunkEndIndex; advanceIndex += 1) {
      const line = diffLines[advanceIndex];
      if (line.type === "context") {
        oldLineNumber += 1;
        newLineNumber += 1;
      } else if (line.type === "remove") {
        oldLineNumber += 1;
      } else if (line.type === "add") {
        newLineNumber += 1;
      }
    }

    currentIndex = hunkEndIndex;
  }

  return hunks;
}

function formatHunkLine(line: DiffLine): string {
  switch (line.type) {
    case "context":
      return ` ${line.text}`;
    case "add":
      return `+${line.text}`;
    case "remove":
      return `-${line.text}`;
  }
}

function formatUnifiedPatch(args: {
  relativePath: string;
  oldExists: boolean;
  hunks: DiffHunk[];
}): string {
  const filePath = args.relativePath || "file";
  const oldHeader = args.oldExists ? `a/${filePath}` : "/dev/null";
  const newHeader = `b/${filePath}`;

  const lines: string[] = [`--- ${oldHeader}`, `+++ ${newHeader}`];

  for (const hunk of args.hunks) {
    lines.push(
      `@@ -${hunk.oldStart},${hunk.oldCount} +${hunk.newStart},${hunk.newCount} @@`
    );

    for (const line of hunk.lines) {
      lines.push(formatHunkLine(line));
    }
  }

  return lines.join("\n");
}

function clampPatch(
  patch: string,
  maxPatchChars: number
): { patch: string; truncated: boolean } {
  if (patch.length <= maxPatchChars) {
    return { patch, truncated: false };
  }

  return {
    patch: `${patch.slice(0, Math.max(0, maxPatchChars - 4))}\n...`,
    truncated: true,
  };
}

function buildStats(args: {
  oldContent: string;
  newContent: string;
  hunks: DiffHunk[];
  created: boolean;
  truncated: boolean;
}): DiffStats {
  let additions = 0;
  let removals = 0;

  for (const hunk of args.hunks) {
    for (const line of hunk.lines) {
      if (line.type === "add") additions += 1;
      if (line.type === "remove") removals += 1;
    }
  }

  const oldBytes = Buffer.byteLength(args.oldContent, "utf8");
  const newBytes = Buffer.byteLength(args.newContent, "utf8");
  const oldLineCount = countLines(args.oldContent);
  const newLineCount = countLines(args.newContent);

  return {
    created: args.created,
    changed: args.oldContent !== args.newContent,
    unchanged: args.oldContent === args.newContent,
    oldBytes,
    newBytes,
    byteDelta: newBytes - oldBytes,
    additions,
    removals,
    oldLineCount,
    newLineCount,
    lineDelta: newLineCount - oldLineCount,
    hunks: args.hunks.length,
    truncated: args.truncated,
  };
}

function buildSummary(args: {
  relativePath: string;
  absolutePath: string;
  stats: DiffStats;
}): string {
  const displayPath = args.relativePath || normalizeWindowsPath(args.absolutePath);

  if (args.stats.unchanged) {
    return `No diff for ${displayPath} • content unchanged`;
  }

  const parts = [`Generated diff for ${displayPath}`];

  if (args.stats.created) {
    parts.push("new file");
  }

  parts.push(
    `+${args.stats.additions}/-${args.stats.removals}`,
    `${args.stats.newBytes} bytes`
  );

  if (args.stats.truncated) {
    parts.push("truncated");
  }

  return parts.join(" • ");
}

/* ================= TOOL ================= */

export const generateDiffTool: CodexForgeToolDefinition = {
  name: "generate-diff",
  label: "Generate Diff",
  description:
    "Generate a unified diff preview for a proposed full-file replacement with workspace guardrails, new-file support, and structured diff metadata.",
  availability: "ready",
  domain: "repo",
  safety: "guarded",
  capabilities: ["diff", "read", "inspect"],
  tags: [
    "diff",
    "preview",
    "edit",
    "patch",
    "proposal",
    "workspace-guarded",
    "unified-diff",
  ],
  parameters: [
    {
      name: "path",
      type: "string",
      description: "Project-relative or absolute target file path.",
      required: true,
    },
    {
      name: "content",
      type: "string",
      description: "Proposed full replacement content.",
      required: true,
    },
    {
      name: "originalContent",
      type: "string",
      description:
        "Optional explicit original content. If omitted, the tool reads the current file from disk.",
      required: false,
    },
    {
      name: "ensureTrailingNewline",
      type: "boolean",
      description: "Whether to ensure the proposed content ends with a newline.",
      required: false,
      defaultValue: false,
    },
    {
      name: "contextLines",
      type: "number",
      description: "Context lines to include around changes.",
      required: false,
      defaultValue: 3,
    },
    {
      name: "treatMissingAsNewFile",
      type: "boolean",
      description: "Whether a missing file should be treated as a new-file diff.",
      required: false,
      defaultValue: true,
    },
    {
      name: "maxContentChars",
      type: "number",
      description: "Maximum allowed content size for old and new text.",
      required: false,
      defaultValue: DEFAULT_MAX_CONTENT_CHARS,
    },
    {
      name: "maxPatchChars",
      type: "number",
      description: "Maximum patch length returned.",
      required: false,
      defaultValue: DEFAULT_MAX_PATCH_CHARS,
    },
  ],
  examples: [
    {
      title: "Diff an existing file",
      input: {
        path: "src/lib/codexforge/tools/index.ts",
        content: "export const example = true;\n",
      },
    },
    {
      title: "Preview a new file",
      input: {
        path: "src/lib/codexforge/tools/new-tool.ts",
        content: "export const newTool = true;\n",
        treatMissingAsNewFile: true,
      },
    },
  ],
  metadata: {
    provider: "local",
    version: "codexforge-generate-diff-v1",
    supportedPlatforms: ["windows", "linux", "darwin"],
    tags: ["filesystem", "workspace-guarded", "server-only", "preview"],
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
          message: "The generate-diff tool requires a path.",
          startedAt,
          retryable: false,
        });
      }

      if (typeof input.content !== "string") {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Missing content.",
          code: "MISSING_CONTENT",
          message: "The generate-diff tool requires proposed full-file content.",
          startedAt,
          retryable: false,
        });
      }

      const maxContentChars = clampNumber(
        input.maxContentChars,
        DEFAULT_MAX_CONTENT_CHARS,
        1,
        MAX_CONTENT_CHARS
      );
      const maxPatchChars = clampNumber(
        input.maxPatchChars,
        DEFAULT_MAX_PATCH_CHARS,
        1_000,
        MAX_PATCH_CHARS
      );
      const contextLines = clampNumber(input.contextLines, 3, 0, 12);

      const resolved = resolveDiffScope(input.path, context);
      const warnings: CodexForgeToolWarning[] = [];

      const newContent = normalizeContent(
        input.content,
        input.ensureTrailingNewline === true,
        maxContentChars
      );

      let oldContent = "";
      let oldExists = false;

      if (typeof input.originalContent === "string") {
        oldContent = normalizeContent(
          input.originalContent,
          false,
          maxContentChars
        );
        oldExists = true;
        warnings.push({
          code: "ORIGINAL_CONTENT_OVERRIDE",
          message: "Diff used provided originalContent instead of reading from disk.",
        });
      } else {
        const existing = await getExistingFileInfo(resolved.absolutePath);

        if (existing.exists) {
          if (!existing.isFile) {
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
          oldContent = normalizeContent(buffer.toString("utf8"), false, maxContentChars);
          oldExists = true;
        } else if (input.treatMissingAsNewFile === false) {
          return finishToolError({
            toolName: TOOL_NAME,
            summary: "Target file missing.",
            code: "FILE_NOT_FOUND",
            message:
              "The target file does not exist and treatMissingAsNewFile is disabled.",
            startedAt,
            retryable: false,
            details: {
              path: resolved.requestedPath,
              absolutePath: resolved.absolutePath,
            },
          });
        } else {
          warnings.push({
            code: "MISSING_FILE_TREATED_AS_NEW",
            message: "Missing file was treated as a new-file diff.",
          });
        }
      }

      const oldLines = splitLinesForDiff(oldContent);
      const newLines = splitLinesForDiff(newContent);

      const diffLines = buildDiffLines(oldLines, newLines);
      const hunks =
        oldContent === newContent ? [] : buildHunks(diffLines, contextLines);

      const rawPatch = formatUnifiedPatch({
        relativePath:
          resolved.relativePath.length > 0
            ? resolved.relativePath
            : normalizeWindowsPath(path.basename(resolved.absolutePath)),
        oldExists,
        hunks,
      });

      const patchClamp = clampPatch(rawPatch, maxPatchChars);
      if (patchClamp.truncated) {
        warnings.push({
          code: "PATCH_TRUNCATED",
          message: `Patch output was limited to ${maxPatchChars} characters.`,
        });
      }

      const stats = buildStats({
        oldContent,
        newContent,
        hunks,
        created: !oldExists,
        truncated: patchClamp.truncated,
      });

      const relativeDisplayPath =
        resolved.relativePath.length > 0
          ? resolved.relativePath
          : normalizeWindowsPath(path.basename(resolved.absolutePath));

      return finishToolSuccess({
        toolName: TOOL_NAME,
        summary: buildSummary({
          relativePath: relativeDisplayPath,
          absolutePath: resolved.absolutePath,
          stats,
        }),
        startedAt,
        warnings: warnings.length > 0 ? warnings : undefined,
        content: {
          type: "json",
          json: {
            requestedPath: resolved.requestedPath,
            relativePath: relativeDisplayPath,
            absolutePath: resolved.absolutePath,
            patch: patchClamp.patch,
            stats: {
              created: stats.created,
              changed: stats.changed,
              unchanged: stats.unchanged,
              oldBytes: stats.oldBytes,
              newBytes: stats.newBytes,
              byteDelta: stats.byteDelta,
              additions: stats.additions,
              removals: stats.removals,
              oldLineCount: stats.oldLineCount,
              newLineCount: stats.newLineCount,
              lineDelta: stats.lineDelta,
              hunks: stats.hunks,
              truncated: stats.truncated,
            },
          },
        },
        raw: {
          requestedPath: resolved.requestedPath,
          absolutePath: resolved.absolutePath,
          created: stats.created,
          changed: stats.changed,
        },
      });
    } catch (error) {
      return finishToolError({
        toolName: TOOL_NAME,
        summary: "Failed to generate diff.",
        code: "GENERATE_DIFF_FAILED",
        message:
          error instanceof Error && error.message.trim().length > 0
            ? clampText(error.message, 400)
            : "An unexpected error occurred while generating the diff.",
        startedAt,
        retryable: false,
      });
    }
  },
};