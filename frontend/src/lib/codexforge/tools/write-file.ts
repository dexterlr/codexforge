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

const TOOL_NAME = "write-file";

const DEFAULT_MAX_CONTENT_CHARS = 1_000_000;
const MAX_CONTENT_CHARS = 2_000_000;
const DEFAULT_BACKUP_SUFFIX = ".bak";
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

type WriteFileInput = {
  path?: string;
  content?: string;
  createDirectories?: boolean;
  createBackup?: boolean;
  backupSuffix?: string;
  overwrite?: boolean;
  ensureTrailingNewline?: boolean;
  maxContentChars?: number;
};

type ResolvedWriteScope = {
  requestedPath: string;
  basePath: string;
  absolutePath: string;
  relativePath: string;
  parentDirectory: string;
};

type ExistingFileInfo = {
  exists: boolean;
  isFile: boolean;
  size: number;
};

type WriteOperationSummary = {
  created: boolean;
  overwritten: boolean;
  backupCreated: boolean;
  bytesWritten: number;
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

function normalizeInput(input: Record<string, unknown>): WriteFileInput {
  return {
    path: asOptionalString(input.path),
    content:
      typeof input.content === "string" ? input.content : undefined,
    createDirectories: asBoolean(input.createDirectories, true),
    createBackup: asBoolean(input.createBackup, false),
    backupSuffix: asOptionalString(input.backupSuffix),
    overwrite: asBoolean(input.overwrite, true),
    ensureTrailingNewline: asBoolean(input.ensureTrailingNewline, false),
    maxContentChars: asNumber(input.maxContentChars),
  };
}

function resolveWriteScope(
  requestedPath: string,
  context: CodexForgeToolExecutionContext
): ResolvedWriteScope {
  const basePath = path.resolve(pickBasePath(context));
  const cleaned = cleanInputPath(requestedPath);

  const absolutePath = isAbsolutePath(cleaned)
    ? path.resolve(cleaned)
    : path.resolve(basePath, cleaned);

  if (!ensureInsideBase(absolutePath, basePath)) {
    throw new Error("Requested write path is outside the allowed workspace scope.");
  }

  const relativePath = normalizeWindowsPath(path.relative(basePath, absolutePath));
  const blockedSegment = hasBlockedPathSegment(relativePath);
  if (blockedSegment) {
    throw new Error(`Writing inside '${blockedSegment}' is blocked.`);
  }

  const parentDirectory = path.dirname(absolutePath);
  if (!ensureInsideBase(parentDirectory, basePath)) {
    throw new Error("Resolved parent directory is outside the allowed workspace scope.");
  }

  return {
    requestedPath,
    basePath,
    absolutePath,
    relativePath,
    parentDirectory,
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

function buildBackupPath(
  absolutePath: string,
  backupSuffix: string
): string {
  return `${absolutePath}${backupSuffix}`;
}

function buildSummary(args: {
  relativePath: string;
  absolutePath: string;
  operation: WriteOperationSummary;
}): string {
  const displayPath = args.relativePath || normalizeWindowsPath(args.absolutePath);
  const parts = [`Wrote ${displayPath}`, `${args.operation.bytesWritten} bytes`];

  if (args.operation.created) {
    parts.push("created");
  }

  if (args.operation.overwritten) {
    parts.push("overwritten");
  }

  if (args.operation.backupCreated) {
    parts.push("backup created");
  }

  return parts.join(" • ");
}

/* ================= TOOL ================= */

export const writeFileTool: CodexForgeToolDefinition = {
  name: "write-file",
  label: "Write File",
  description:
    "Create or replace a workspace-scoped file with strict path validation, optional parent directory creation, and optional backup creation.",
  availability: "ready",
  domain: "repo",
  safety: "elevated",
  capabilities: ["write"],
  tags: [
    "repo",
    "files",
    "write",
    "mutation",
    "save",
    "workspace-guarded",
    "create",
    "overwrite",
  ],
  parameters: [
    {
      name: "path",
      type: "string",
      description: "Project-relative or absolute file path to write.",
      required: true,
    },
    {
      name: "content",
      type: "string",
      description: "Full file contents to write.",
      required: true,
    },
    {
      name: "createDirectories",
      type: "boolean",
      description: "Whether missing parent directories should be created automatically.",
      required: false,
      defaultValue: true,
    },
    {
      name: "createBackup",
      type: "boolean",
      description: "Whether an existing file should be copied to a backup path before overwrite.",
      required: false,
      defaultValue: false,
    },
    {
      name: "backupSuffix",
      type: "string",
      description: "Suffix used when creating a backup file.",
      required: false,
      defaultValue: DEFAULT_BACKUP_SUFFIX,
    },
    {
      name: "overwrite",
      type: "boolean",
      description: "Whether an existing file may be overwritten.",
      required: false,
      defaultValue: true,
    },
    {
      name: "ensureTrailingNewline",
      type: "boolean",
      description: "Whether to ensure the written file ends with a newline.",
      required: false,
      defaultValue: false,
    },
    {
      name: "maxContentChars",
      type: "number",
      description: "Maximum allowed content length.",
      required: false,
      defaultValue: DEFAULT_MAX_CONTENT_CHARS,
    },
  ],
  examples: [
    {
      title: "Create a new helper file",
      input: {
        path: "src/lib/codexforge/tools/example.ts",
        content: "export const example = true;\n",
      },
    },
    {
      title: "Overwrite a file and keep a backup",
      input: {
        path: "src/lib/codexforge/tools/index.ts",
        content: "export {};\n",
        createBackup: true,
      },
    },
  ],
  metadata: {
    provider: "local",
    version: "codexforge-write-file-v1",
    supportedPlatforms: ["windows", "linux", "darwin"],
    tags: ["filesystem", "workspace-guarded", "server-only", "mutation"],
    requiresRuntime: "server",
  },
  handler: async (
    rawInput: Record<string, unknown>,
    context: CodexForgeToolExecutionContext
  ): Promise<CodexForgeToolResult> => {
    const startedAt = buildStartedAt();

    try {
      if (context.allowWrites !== true) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Write blocked.",
          code: "WRITES_NOT_ALLOWED",
          message:
            "This tool requires allowWrites to be enabled in the execution context.",
          startedAt,
          retryable: false,
        });
      }

      const input = normalizeInput(rawInput);

      if (!input.path) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Missing path.",
          code: "MISSING_PATH",
          message: "The write-file tool requires a path.",
          startedAt,
          retryable: false,
        });
      }

      if (typeof input.content !== "string") {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Missing content.",
          code: "MISSING_CONTENT",
          message: "The write-file tool requires full file content.",
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

      const resolved = resolveWriteScope(input.path, context);
      const normalizedContent = normalizeContent(
        input.content,
        input.ensureTrailingNewline === true,
        maxContentChars
      );

      const existing = await getExistingFileInfo(resolved.absolutePath);

      if (existing.exists && !existing.isFile) {
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

      if (existing.exists && input.overwrite === false) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Target already exists.",
          code: "FILE_EXISTS",
          message: "The target file already exists and overwrite is disabled.",
          startedAt,
          retryable: false,
          details: {
            path: resolved.requestedPath,
            absolutePath: resolved.absolutePath,
          },
        });
      }

      const parentInfo = await getExistingFileInfo(resolved.parentDirectory);
      const warnings: CodexForgeToolWarning[] = [];

      if (!parentInfo.exists) {
        if (input.createDirectories === false) {
          return finishToolError({
            toolName: TOOL_NAME,
            summary: "Parent directory missing.",
            code: "PARENT_DIRECTORY_MISSING",
            message:
              "The target parent directory does not exist and createDirectories is disabled.",
            startedAt,
            retryable: false,
            details: {
              parentDirectory: resolved.parentDirectory,
            },
          });
        }

        await fs.mkdir(resolved.parentDirectory, { recursive: true });
        warnings.push({
          code: "DIRECTORIES_CREATED",
          message: "Missing parent directories were created automatically.",
        });
      }

      let backupCreated = false;
      const backupSuffix = input.backupSuffix?.trim() || DEFAULT_BACKUP_SUFFIX;

      if (existing.exists && input.createBackup === true) {
        const backupPath = buildBackupPath(resolved.absolutePath, backupSuffix);
        await fs.copyFile(resolved.absolutePath, backupPath);
        backupCreated = true;
        warnings.push({
          code: "BACKUP_CREATED",
          message: `Backup created at ${normalizeWindowsPath(backupPath)}.`,
        });
      }

      await fs.writeFile(resolved.absolutePath, normalizedContent, "utf8");

      const operation: WriteOperationSummary = {
        created: !existing.exists,
        overwritten: existing.exists,
        backupCreated,
        bytesWritten: Buffer.byteLength(normalizedContent, "utf8"),
      };

      const relativeDisplayPath =
        resolved.relativePath.length > 0
          ? resolved.relativePath
          : normalizeWindowsPath(path.basename(resolved.absolutePath));

      return finishToolSuccess({
        toolName: TOOL_NAME,
        summary: buildSummary({
          relativePath: relativeDisplayPath,
          absolutePath: resolved.absolutePath,
          operation,
        }),
        startedAt,
        warnings: warnings.length > 0 ? warnings : undefined,
        content: {
          type: "json",
          json: {
            requestedPath: resolved.requestedPath,
            relativePath: relativeDisplayPath,
            absolutePath: resolved.absolutePath,
            parentDirectory: normalizeWindowsPath(resolved.parentDirectory),
            created: operation.created,
            overwritten: operation.overwritten,
            backupCreated: operation.backupCreated,
            bytesWritten: operation.bytesWritten,
          },
        },
        raw: {
          requestedPath: resolved.requestedPath,
          absolutePath: resolved.absolutePath,
          bytesWritten: operation.bytesWritten,
        },
      });
    } catch (error) {
      return finishToolError({
        toolName: TOOL_NAME,
        summary: "Failed to write file.",
        code: "WRITE_FILE_FAILED",
        message:
          error instanceof Error && error.message.trim().length > 0
            ? clampText(error.message, 400)
            : "An unexpected error occurred while writing the file.",
        startedAt,
        retryable: false,
      });
    }
  },
};