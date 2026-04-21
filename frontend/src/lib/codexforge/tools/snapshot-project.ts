import { createHash } from "node:crypto";
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
  asStringArray,
  buildStartedAt,
  clampText,
  dedupeStrings,
  finishToolError,
  finishToolSuccess,
  normalizeWindowsPath,
} from "./shared";

/* ================= CONSTANTS ================= */

const TOOL_NAME = "snapshot-project";

const DEFAULT_MAX_FILES = 2000;
const DEFAULT_MAX_DEPTH = 12;
const DEFAULT_MAX_FILE_BYTES = 512 * 1024;
const DEFAULT_MAX_CONTENT_BYTES = 16 * 1024;
const DEFAULT_MAX_TOTAL_BYTES = 32 * 1024 * 1024;
const DEFAULT_MAX_RETURN_ITEMS = 400;

const BLOCKED_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  "dist",
  "build",
  "out",
  "coverage",
  ".turbo",
  ".vercel",
]);

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".mdx",
  ".txt",
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".html",
  ".htm",
  ".yml",
  ".yaml",
  ".xml",
  ".svg",
  ".sql",
  ".py",
  ".rb",
  ".go",
  ".rs",
  ".java",
  ".kt",
  ".swift",
  ".php",
  ".cs",
  ".cpp",
  ".c",
  ".h",
  ".hpp",
  ".sh",
  ".zsh",
  ".ps1",
  ".bat",
  ".cmd",
  ".env",
  ".gitignore",
  ".npmrc",
  ".prettierrc",
  ".eslintrc",
  ".editorconfig",
]);

/* ================= TYPES ================= */

type SnapshotProjectInput = {
  path?: string;
  recursive?: boolean;
  includeHidden?: boolean;
  includeContent?: boolean;
  hashAlgorithm?: string;
  fileExtensions?: string[];
  maxFiles?: number;
  maxDepth?: number;
  maxFileBytes?: number;
  maxContentBytes?: number;
  maxTotalBytes?: number;
  maxReturnItems?: number;
};

type ResolvedScope = {
  requestedPath?: string;
  basePath: string;
  absolutePath: string;
  relativePath: string;
};

type SnapshotStats = {
  scannedDirectories: number;
  scannedFiles: number;
  returnedFiles: number;
  skippedDirectories: number;
  skippedFiles: number;
  skippedByExtension: number;
  skippedBySize: number;
  includedContentFiles: number;
  totalBytesRead: number;
};

type WalkQueueItem = {
  absolutePath: string;
  relativePath: string;
  depth: number;
};

type SnapshotFileRecord = {
  relativePath: string;
  absolutePath: string;
  name: string;
  extension: string;
  size: number;
  mtimeMs: number;
  ctimeMs: number;
  hash: string;
  content?: string;
  contentIncluded: boolean;
};

type SnapshotSummary = {
  snapshotId: string;
  scope: {
    requestedPath: string;
    relativePath: string;
    absolutePath: string;
  };
  hashAlgorithm: string;
  recursive: boolean;
  includeHidden: boolean;
  includeContent: boolean;
  stats: SnapshotStats;
  files: SnapshotFileRecord[];
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

function resolveScope(
  requestedPath: string | undefined,
  context: CodexForgeToolExecutionContext
): ResolvedScope {
  const basePath = path.resolve(pickBasePath(context));
  const cleaned = requestedPath ? cleanInputPath(requestedPath) : "";

  const absolutePath = cleaned
    ? isAbsolutePath(cleaned)
      ? path.resolve(cleaned)
      : path.resolve(basePath, cleaned)
    : basePath;

  if (!ensureInsideBase(absolutePath, basePath)) {
    throw new Error("Requested snapshot path is outside the allowed workspace scope.");
  }

  const relativePath = normalizeWindowsPath(path.relative(basePath, absolutePath));

  return {
    requestedPath,
    basePath,
    absolutePath,
    relativePath,
  };
}

function normalizeExtension(value: string): string {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return "";
  return trimmed.startsWith(".") ? trimmed : `.${trimmed}`;
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

function normalizeHashAlgorithm(value: string | undefined): string {
  const normalized = (value ?? "sha256").trim().toLowerCase();
  const allowed = new Set(["sha1", "sha256", "sha512"]);
  return allowed.has(normalized) ? normalized : "sha256";
}

function normalizeInput(input: Record<string, unknown>): SnapshotProjectInput {
  return {
    path: asOptionalString(input.path),
    recursive: asBoolean(input.recursive, true),
    includeHidden: asBoolean(input.includeHidden, false),
    includeContent: asBoolean(input.includeContent, false),
    hashAlgorithm: asOptionalString(input.hashAlgorithm),
    fileExtensions: asStringArray(input.fileExtensions).map(normalizeExtension),
    maxFiles: asNumber(input.maxFiles),
    maxDepth: asNumber(input.maxDepth),
    maxFileBytes: asNumber(input.maxFileBytes),
    maxContentBytes: asNumber(input.maxContentBytes),
    maxTotalBytes: asNumber(input.maxTotalBytes),
    maxReturnItems: asNumber(input.maxReturnItems),
  };
}

function shouldIncludeHidden(name: string, includeHidden: boolean): boolean {
  if (includeHidden) return true;
  return !name.startsWith(".");
}

function looksBinary(buffer: Buffer): boolean {
  const sampleLength = Math.min(buffer.length, 1024);

  for (let index = 0; index < sampleLength; index += 1) {
    if (buffer[index] === 0) {
      return true;
    }
  }

  return false;
}

function isTextLikeFile(filePath: string): boolean {
  const extension = path.extname(filePath).toLowerCase();

  if (TEXT_EXTENSIONS.has(extension)) {
    return true;
  }

  const basename = path.basename(filePath).toLowerCase();
  return TEXT_EXTENSIONS.has(basename);
}

function shouldIncludeByExtension(
  filePath: string,
  allowedExtensions: string[]
): boolean {
  if (allowedExtensions.length === 0) {
    return true;
  }

  const extension = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath).toLowerCase();

  return allowedExtensions.includes(extension) || allowedExtensions.includes(basename);
}

function buildHash(buffer: Buffer, algorithm: string): string {
  return createHash(algorithm).update(buffer).digest("hex");
}

function buildSnapshotId(args: {
  scope: string;
  algorithm: string;
  files: Array<Pick<SnapshotFileRecord, "relativePath" | "hash" | "size" | "mtimeMs">>;
}): string {
  const payload = JSON.stringify({
    scope: args.scope,
    algorithm: args.algorithm,
    files: args.files.map((file) => ({
      path: file.relativePath,
      hash: file.hash,
      size: file.size,
      mtimeMs: file.mtimeMs,
    })),
  });

  return createHash("sha256").update(payload).digest("hex").slice(0, 24);
}

function clampContentText(text: string, maxBytes: number): string {
  const buffer = Buffer.from(text, "utf8");
  if (buffer.byteLength <= maxBytes) {
    return text;
  }

  const sliced = buffer.subarray(0, maxBytes);
  return `${sliced.toString("utf8")}\n...`;
}

/* ================= WALK ================= */

async function collectCandidates(args: {
  scope: ResolvedScope;
  recursive: boolean;
  includeHidden: boolean;
  maxDepth: number;
  maxFiles: number;
  stats: SnapshotStats;
}): Promise<Array<{ absolutePath: string; relativePath: string }>> {
  const queue: WalkQueueItem[] = [
    {
      absolutePath: args.scope.absolutePath,
      relativePath: args.scope.relativePath,
      depth: 0,
    },
  ];

  const files: Array<{ absolutePath: string; relativePath: string }> = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;

    let stat;
    try {
      stat = await fs.stat(current.absolutePath);
    } catch {
      args.stats.skippedFiles += 1;
      continue;
    }

    if (stat.isFile()) {
      files.push({
        absolutePath: current.absolutePath,
        relativePath:
          current.relativePath.length > 0
            ? current.relativePath
            : path.basename(current.absolutePath),
      });
      args.stats.scannedFiles += 1;

      if (files.length >= args.maxFiles) {
        break;
      }

      continue;
    }

    if (!stat.isDirectory()) {
      continue;
    }

    args.stats.scannedDirectories += 1;

    let dirEntries: Array<{
      name: string;
      isFile(): boolean;
      isDirectory(): boolean;
    }>;

    try {
      dirEntries = await fs.readdir(current.absolutePath, {
        withFileTypes: true,
      });
    } catch {
      args.stats.skippedDirectories += 1;
      continue;
    }

    for (const entry of dirEntries) {
      const entryName = entry.name;

      if (!shouldIncludeHidden(entryName, args.includeHidden)) {
        if (entry.isDirectory()) {
          args.stats.skippedDirectories += 1;
        }
        continue;
      }

      if (entry.isDirectory() && BLOCKED_DIRS.has(entryName)) {
        args.stats.skippedDirectories += 1;
        continue;
      }

      const entryAbsolutePath = path.join(current.absolutePath, entryName);
      const entryRelativePath = normalizeWindowsPath(
        current.relativePath
          ? path.join(current.relativePath, entryName)
          : entryName
      );

      if (entry.isFile()) {
        files.push({
          absolutePath: entryAbsolutePath,
          relativePath: entryRelativePath,
        });
        args.stats.scannedFiles += 1;

        if (files.length >= args.maxFiles) {
          return files;
        }

        continue;
      }

      if (!entry.isDirectory()) {
        continue;
      }

      if (!args.recursive) {
        continue;
      }

      if (current.depth + 1 > args.maxDepth) {
        args.stats.skippedDirectories += 1;
        continue;
      }

      queue.push({
        absolutePath: entryAbsolutePath,
        relativePath: entryRelativePath,
        depth: current.depth + 1,
      });
    }
  }

  return files;
}

/* ================= TOOL ================= */

export const snapshotProjectTool: CodexForgeToolDefinition = {
  name: "snapshot-project",
  label: "Snapshot Project",
  description:
    "Capture a guarded project snapshot with file metadata, hashes, optional lightweight content capture, and deterministic snapshot identity.",
  availability: "ready",
  domain: "repo",
  safety: "safe",
  capabilities: ["snapshot", "read", "inspect"],
  tags: [
    "snapshot",
    "repo",
    "state",
    "inventory",
    "hash",
    "checkpoint",
    "workspace-guarded",
  ],
  parameters: [
    {
      name: "path",
      type: "string",
      description: "Optional folder or file path to snapshot.",
      required: false,
    },
    {
      name: "recursive",
      type: "boolean",
      description: "Whether to recurse into subfolders.",
      required: false,
      defaultValue: true,
    },
    {
      name: "includeHidden",
      type: "boolean",
      description: "Whether dotfiles and dotfolders should be included.",
      required: false,
      defaultValue: false,
    },
    {
      name: "includeContent",
      type: "boolean",
      description: "Whether to include small text file content in the snapshot.",
      required: false,
      defaultValue: false,
    },
    {
      name: "hashAlgorithm",
      type: "enum",
      description: "Hash algorithm used for file fingerprints.",
      required: false,
      enumValues: ["sha1", "sha256", "sha512"],
      defaultValue: "sha256",
    },
    {
      name: "fileExtensions",
      type: "string[]",
      description: "Optional list of file extensions to include.",
      required: false,
    },
    {
      name: "maxFiles",
      type: "number",
      description: "Maximum number of files to scan.",
      required: false,
      defaultValue: DEFAULT_MAX_FILES,
    },
    {
      name: "maxDepth",
      type: "number",
      description: "Maximum recursion depth.",
      required: false,
      defaultValue: DEFAULT_MAX_DEPTH,
    },
    {
      name: "maxFileBytes",
      type: "number",
      description: "Maximum file size to read for hashing.",
      required: false,
      defaultValue: DEFAULT_MAX_FILE_BYTES,
    },
    {
      name: "maxContentBytes",
      type: "number",
      description: "Maximum bytes of content to include per file.",
      required: false,
      defaultValue: DEFAULT_MAX_CONTENT_BYTES,
    },
    {
      name: "maxTotalBytes",
      type: "number",
      description: "Maximum total bytes read during snapshotting.",
      required: false,
      defaultValue: DEFAULT_MAX_TOTAL_BYTES,
    },
    {
      name: "maxReturnItems",
      type: "number",
      description: "Maximum number of file records to return.",
      required: false,
      defaultValue: DEFAULT_MAX_RETURN_ITEMS,
    },
  ],
  examples: [
    {
      title: "Snapshot the repo root",
      input: {},
    },
    {
      title: "Snapshot a tool folder with content",
      input: {
        path: "src/lib/codexforge/tools",
        includeContent: true,
        fileExtensions: ["ts"],
      },
    },
  ],
  metadata: {
    provider: "local",
    version: "codexforge-snapshot-project-v1",
    supportedPlatforms: ["windows", "linux", "darwin"],
    tags: ["filesystem", "workspace-guarded", "state-capture", "server-only"],
    requiresRuntime: "server",
  },
  handler: async (
    rawInput: Record<string, unknown>,
    context: CodexForgeToolExecutionContext
  ): Promise<CodexForgeToolResult> => {
    const startedAt = buildStartedAt();

    try {
      const input = normalizeInput(rawInput);
      const scope = resolveScope(input.path, context);

      const recursive = input.recursive !== false;
      const includeHidden = input.includeHidden === true;
      const includeContent = input.includeContent === true;
      const hashAlgorithm = normalizeHashAlgorithm(input.hashAlgorithm);
      const fileExtensions = dedupeStrings(
        (input.fileExtensions ?? []).map(normalizeExtension).filter(Boolean)
      );

      const maxFiles = clampNumber(input.maxFiles, DEFAULT_MAX_FILES, 1, 20_000);
      const maxDepth = clampNumber(input.maxDepth, DEFAULT_MAX_DEPTH, 0, 64);
      const maxFileBytes = clampNumber(
        input.maxFileBytes,
        DEFAULT_MAX_FILE_BYTES,
        256,
        4 * 1024 * 1024
      );
      const maxContentBytes = clampNumber(
        input.maxContentBytes,
        DEFAULT_MAX_CONTENT_BYTES,
        128,
        256 * 1024
      );
      const maxTotalBytes = clampNumber(
        input.maxTotalBytes,
        DEFAULT_MAX_TOTAL_BYTES,
        1024,
        256 * 1024 * 1024
      );
      const maxReturnItems = clampNumber(
        input.maxReturnItems,
        DEFAULT_MAX_RETURN_ITEMS,
        1,
        5_000
      );

      const stats: SnapshotStats = {
        scannedDirectories: 0,
        scannedFiles: 0,
        returnedFiles: 0,
        skippedDirectories: 0,
        skippedFiles: 0,
        skippedByExtension: 0,
        skippedBySize: 0,
        includedContentFiles: 0,
        totalBytesRead: 0,
      };

      const warnings: CodexForgeToolWarning[] = [];

      const candidates = await collectCandidates({
        scope,
        recursive,
        includeHidden,
        maxDepth,
        maxFiles,
        stats,
      });

      if (candidates.length >= maxFiles) {
        warnings.push({
          code: "FILE_SCAN_LIMIT_REACHED",
          message: `Snapshot scan was limited to ${maxFiles} files.`,
        });
      }

      const snapshotFiles: SnapshotFileRecord[] = [];

      for (const candidate of candidates) {
        if (!shouldIncludeByExtension(candidate.absolutePath, fileExtensions)) {
          stats.skippedByExtension += 1;
          continue;
        }

        let stat;
        try {
          stat = await fs.stat(candidate.absolutePath);
        } catch {
          stats.skippedFiles += 1;
          continue;
        }

        if (!stat.isFile()) {
          continue;
        }

        if (stat.size > maxFileBytes) {
          stats.skippedBySize += 1;
          continue;
        }

        if (stats.totalBytesRead + stat.size > maxTotalBytes) {
          warnings.push({
            code: "TOTAL_BYTE_LIMIT_REACHED",
            message: `Snapshot read budget was limited to ${maxTotalBytes} bytes.`,
          });
          break;
        }

        let buffer: Buffer;
        try {
          buffer = await fs.readFile(candidate.absolutePath);
        } catch {
          stats.skippedFiles += 1;
          continue;
        }

        stats.totalBytesRead += buffer.byteLength;

        const isBinary = looksBinary(buffer) && !isTextLikeFile(candidate.absolutePath);
        const extension = path.extname(candidate.relativePath).toLowerCase();

        let content: string | undefined;
        let contentIncluded = false;

        if (includeContent && !isBinary && buffer.byteLength <= maxContentBytes) {
          content = clampContentText(buffer.toString("utf8"), maxContentBytes);
          contentIncluded = true;
          stats.includedContentFiles += 1;
        }

        snapshotFiles.push({
          relativePath: candidate.relativePath,
          absolutePath: candidate.absolutePath,
          name: path.basename(candidate.relativePath),
          extension,
          size: buffer.byteLength,
          mtimeMs: stat.mtimeMs,
          ctimeMs: stat.ctimeMs,
          hash: buildHash(buffer, hashAlgorithm),
          ...(contentIncluded && content !== undefined ? { content } : {}),
          contentIncluded,
        });

        if (snapshotFiles.length >= maxReturnItems) {
          warnings.push({
            code: "RETURN_ITEM_LIMIT_REACHED",
            message: `Snapshot results were limited to ${maxReturnItems} file records.`,
          });
          break;
        }
      }

      snapshotFiles.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
      stats.returnedFiles = snapshotFiles.length;

      const scopeDisplay =
        scope.relativePath.length > 0
          ? scope.relativePath
          : normalizeWindowsPath(path.basename(scope.absolutePath)) || ".";

      const summary: SnapshotSummary = {
        snapshotId: buildSnapshotId({
          scope: scope.absolutePath,
          algorithm: hashAlgorithm,
          files: snapshotFiles,
        }),
        scope: {
          requestedPath: scope.requestedPath ?? "",
          relativePath: scopeDisplay,
          absolutePath: scope.absolutePath,
        },
        hashAlgorithm,
        recursive,
        includeHidden,
        includeContent,
        stats,
        files: snapshotFiles,
      };

      const summaryText =
        snapshotFiles.length > 0
          ? `Captured snapshot ${summary.snapshotId} for ${scopeDisplay} • ${snapshotFiles.length} files • ${stats.totalBytesRead} bytes read`
          : `Captured empty snapshot for ${scopeDisplay} • no files matched`;

      return finishToolSuccess({
        toolName: TOOL_NAME,
        summary: summaryText,
        startedAt,
        warnings: warnings.length > 0 ? warnings : undefined,
        content: {
          type: "json",
          json: {
            snapshotId: summary.snapshotId,
            scope: summary.scope,
            hashAlgorithm: summary.hashAlgorithm,
            recursive: summary.recursive,
            includeHidden: summary.includeHidden,
            includeContent: summary.includeContent,
            stats: summary.stats,
            files: summary.files.map((file) => ({
              relativePath: file.relativePath,
              absolutePath: file.absolutePath,
              name: file.name,
              extension: file.extension,
              size: file.size,
              mtimeMs: file.mtimeMs,
              ctimeMs: file.ctimeMs,
              hash: file.hash,
              contentIncluded: file.contentIncluded,
              ...(file.contentIncluded && file.content !== undefined
                ? { content: file.content }
                : {}),
            })),
          },
        },
        raw: {
          snapshotId: summary.snapshotId,
          fileCount: summary.files.length,
          scope: summary.scope.absolutePath,
        },
      });
    } catch (error) {
      return finishToolError({
        toolName: TOOL_NAME,
        summary: "Failed to snapshot project.",
        code: "SNAPSHOT_PROJECT_FAILED",
        message:
          error instanceof Error && error.message.trim().length > 0
            ? clampText(error.message, 400)
            : "An unexpected error occurred while snapshotting the project.",
        startedAt,
        retryable: false,
      });
    }
  },
};