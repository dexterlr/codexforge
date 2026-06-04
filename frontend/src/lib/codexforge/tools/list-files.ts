import "server-only";
import { promises as fs } from "node:fs";
import type { Dirent } from "node:fs";
import path from "node:path";
import type {
  CodexForgeToolDefinition,
  CodexForgeToolExecutionContext,
  CodexForgeToolResult,
} from "./contracts";
import {
  asBoolean,
  asNumber,
  asOptionalString,
  asStringArray,
  buildStartedAt,
  clampText,
  finishToolError,
  finishToolSuccess,
  normalizeWindowsPath,
} from "./shared";
import {
  appendCodexForgeToolPathSegment,
  appendCodexForgeToolRelativeSegment,
  resolveCodexForgeToolPath,
} from "./server-paths";

/* ================= CONSTANTS ================= */

const TOOL_NAME = "list-files";
const MAX_DEPTH = 8;
const MAX_ENTRIES = 2000;
const MAX_RESULTS = 500;
const DEFAULT_DEPTH = 2;

const BLOCKED_DIRS = new Set([
  ".git",
  "node_modules",
  ".next",
  "dist",
  "build",
  "out",
  ".turbo",
  ".idea",
  ".vscode",
]);

/* ================= TYPES ================= */

type ListFilesInput = {
  path?: string;
  recursive?: boolean;
  maxDepth?: number;
  maxResults?: number;
  includeFiles?: boolean;
  includeDirs?: boolean;
  includeHidden?: boolean;
  extensions?: string[];
  contains?: string;
};

type ResolvedPathInfo = {
  requestedPath: string;
  absolutePath: string;
  basePath: string;
  relativePath: string;
};

type ListedEntry = {
  path: string;
  name: string;
  kind: "file" | "dir";
  depth: number;
  extension?: string;
};

/* ================= HELPERS ================= */

function resolveTargetPath(
  requestedPath: string,
  context: CodexForgeToolExecutionContext
): ResolvedPathInfo {
  const resolved = resolveCodexForgeToolPath({
    requestedPath,
    context,
    outsideBaseError: "Requested path is outside the allowed workspace scope.",
    unsafeRelativeError: "Requested path contains unsafe traversal.",
  });

  return {
    requestedPath,
    absolutePath: resolved.absolutePath,
    basePath: resolved.basePath,
    relativePath: resolved.relativePath,
  };
}

function normalizeExtension(value: string): string {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return "";
  return trimmed.startsWith(".") ? trimmed : `.${trimmed}`;
}

function isHiddenName(name: string): boolean {
  return name.startsWith(".");
}

function shouldBlockDir(name: string): boolean {
  return BLOCKED_DIRS.has(name.toLowerCase());
}

function normalizeInput(input: Record<string, unknown>): ListFilesInput {
  const extensions = asStringArray(input.extensions)
    .map(normalizeExtension)
    .filter(Boolean);

  const maxDepth = asNumber(input.maxDepth);
  const maxResults = asNumber(input.maxResults);

  return {
    path: asOptionalString(input.path),
    recursive: asBoolean(input.recursive, false),
    maxDepth:
      typeof maxDepth === "number" && Number.isFinite(maxDepth)
        ? Math.max(0, Math.min(Math.floor(maxDepth), MAX_DEPTH))
        : undefined,
    maxResults:
      typeof maxResults === "number" && Number.isFinite(maxResults)
        ? Math.max(1, Math.min(Math.floor(maxResults), MAX_RESULTS))
        : undefined,
    includeFiles: asBoolean(input.includeFiles, true),
    includeDirs: asBoolean(input.includeDirs, true),
    includeHidden: asBoolean(input.includeHidden, false),
    extensions,
    contains: asOptionalString(input.contains)?.toLowerCase(),
  };
}

function entryMatchesFilters(
  entry: ListedEntry,
  input: Required<Pick<ListFilesInput, "includeFiles" | "includeDirs" | "includeHidden">> &
    Pick<ListFilesInput, "extensions" | "contains">
): boolean {
  if (entry.kind === "file" && !input.includeFiles) return false;
  if (entry.kind === "dir" && !input.includeDirs) return false;
  if (!input.includeHidden && isHiddenName(entry.name)) return false;

  if (entry.kind === "file" && input.extensions && input.extensions.length > 0) {
    if (!entry.extension || !input.extensions.includes(entry.extension)) {
      return false;
    }
  }

  if (input.contains) {
    const haystack = `${entry.path} ${entry.name}`.toLowerCase();
    if (!haystack.includes(input.contains)) {
      return false;
    }
  }

  return true;
}

function compareEntries(a: ListedEntry, b: ListedEntry): number {
  if (a.kind !== b.kind) {
    return a.kind === "dir" ? -1 : 1;
  }

  if (a.depth !== b.depth) {
    return a.depth - b.depth;
  }

  return a.path.localeCompare(b.path);
}

function buildSummary(args: {
  root: string;
  scannedCount: number;
  returnedCount: number;
  truncated: boolean;
  recursive: boolean;
  depth: number;
}): string {
  const parts = [
    `Listed ${args.returnedCount} item${args.returnedCount === 1 ? "" : "s"}`,
    `from ${args.root || "."}`,
    args.recursive ? `recursive depth ${args.depth}` : "non-recursive",
    `scanned ${args.scannedCount}`,
  ];

  if (args.truncated) {
    parts.push("truncated");
  }

  return parts.join(" • ");
}

/* ================= WALKER ================= */

async function walkDirectory(args: {
  startAbsolutePath: string;
  startRelativePath: string;
  maxDepth: number;
  maxResults: number;
  includeFiles: boolean;
  includeDirs: boolean;
  includeHidden: boolean;
  extensions?: string[];
  contains?: string;
}): Promise<{
  entries: ListedEntry[];
  scannedCount: number;
  truncated: boolean;
}> {
  const results: ListedEntry[] = [];
  let scannedCount = 0;
  let truncated = false;

  const queue: Array<{
    absolutePath: string;
    relativePath: string;
    depth: number;
  }> = [
    {
      absolutePath: args.startAbsolutePath,
      relativePath: args.startRelativePath,
      depth: 0,
    },
  ];

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;

    let dirEntries: Dirent[];
    try {
      dirEntries = await fs.readdir(current.absolutePath, { withFileTypes: true });
    } catch {
      continue;
    }

    dirEntries.sort((a, b) => a.name.localeCompare(b.name));

    for (const dirent of dirEntries) {
      scannedCount += 1;

      if (scannedCount > MAX_ENTRIES) {
        truncated = true;
        return { entries: results, scannedCount, truncated };
      }

      const childAbsolutePath = appendCodexForgeToolPathSegment(current.absolutePath, dirent.name);
      const childRelativePath = appendCodexForgeToolRelativeSegment(current.relativePath, dirent.name);

      const isDir = dirent.isDirectory();
      const isFile = dirent.isFile();

      if (!args.includeHidden && isHiddenName(dirent.name)) {
        continue;
      }

      if (isDir && shouldBlockDir(dirent.name)) {
        continue;
      }

      const entry: ListedEntry = {
        path: childRelativePath,
        name: dirent.name,
        kind: isDir ? "dir" : "file",
        depth: current.depth + 1,
        extension: isFile ? path.extname(dirent.name).toLowerCase() || undefined : undefined,
      };

      if (
        entryMatchesFilters(entry, {
          includeFiles: args.includeFiles,
          includeDirs: args.includeDirs,
          includeHidden: args.includeHidden,
          extensions: args.extensions,
          contains: args.contains,
        })
      ) {
        results.push(entry);

        if (results.length >= args.maxResults) {
          truncated = true;
          return { entries: results, scannedCount, truncated };
        }
      }

      if (isDir && current.depth < args.maxDepth) {
        queue.push({
          absolutePath: childAbsolutePath,
          relativePath: childRelativePath,
          depth: current.depth + 1,
        });
      }
    }
  }

  return { entries: results, scannedCount, truncated };
}

/* ================= TOOL ================= */

export const listFilesTool: CodexForgeToolDefinition = {
  name: "list-files",
  label: "List Files",
  description:
    "List files and folders from the active project with workspace guardrails, filtering, and controlled recursion.",
  availability: "ready",
  domain: "repo",
  safety: "safe",
  capabilities: ["read", "inspect"],
  tags: ["repo", "files", "discovery", "tree", "folders", "safe"],
  parameters: [
    {
      name: "path",
      type: "string",
      description: "Optional folder path to inspect. Defaults to the repo root or current workspace root.",
      required: false,
    },
    {
      name: "recursive",
      type: "boolean",
      description: "Whether to recursively walk subfolders.",
      required: false,
      defaultValue: false,
    },
    {
      name: "maxDepth",
      type: "number",
      description: `Maximum recursion depth. Clamped to ${MAX_DEPTH}.`,
      required: false,
      defaultValue: DEFAULT_DEPTH,
    },
    {
      name: "maxResults",
      type: "number",
      description: `Maximum number of returned entries. Clamped to ${MAX_RESULTS}.`,
      required: false,
      defaultValue: 200,
    },
    {
      name: "includeFiles",
      type: "boolean",
      description: "Whether to include files in the result.",
      required: false,
      defaultValue: true,
    },
    {
      name: "includeDirs",
      type: "boolean",
      description: "Whether to include directories in the result.",
      required: false,
      defaultValue: true,
    },
    {
      name: "includeHidden",
      type: "boolean",
      description: "Whether to include dotfiles and hidden-style folders.",
      required: false,
      defaultValue: false,
    },
    {
      name: "extensions",
      type: "string[]",
      description: "Optional list of file extensions to include, for example ['ts','tsx','md'].",
      required: false,
    },
    {
      name: "contains",
      type: "string",
      description: "Optional case-insensitive substring filter applied to entry paths and names.",
      required: false,
    },
  ],
  examples: [
    {
      title: "List root files and folders",
      input: {},
    },
    {
      title: "List src recursively",
      input: {
        path: "src",
        recursive: true,
        maxDepth: 3,
      },
    },
    {
      title: "List only TypeScript files",
      input: {
        path: "src/lib/codexforge",
        recursive: true,
        extensions: ["ts", "tsx"],
      },
    },
  ],
  metadata: {
    provider: "local",
    version: "codexforge-list-files-v1",
    supportedPlatforms: ["windows", "linux", "darwin"],
    tags: ["filesystem", "workspace-guarded", "directory-walker"],
  },
  handler: async (
    rawInput: Record<string, unknown>,
    context: CodexForgeToolExecutionContext
  ): Promise<CodexForgeToolResult> => {
    const startedAt = buildStartedAt();

    try {
      const input = normalizeInput(rawInput);
      const requestedPath = input.path ?? ".";

      const resolved = resolveTargetPath(requestedPath, context);

      const stat = await fs.stat(resolved.absolutePath).catch(() => null);
      if (!stat) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: `Path not found: ${requestedPath}`,
          code: "PATH_NOT_FOUND",
          message: "The requested path could not be found.",
          startedAt,
          retryable: false,
          details: {
            requestedPath,
            absolutePath: resolved.absolutePath,
          },
        });
      }

      if (!stat.isDirectory()) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: `Path is not a directory: ${requestedPath}`,
          code: "NOT_A_DIRECTORY",
          message: "The list-files tool can only inspect directories.",
          startedAt,
          retryable: false,
          details: {
            requestedPath,
            absolutePath: resolved.absolutePath,
          },
        });
      }

      const recursive = input.recursive === true;
      const maxDepth = recursive ? input.maxDepth ?? DEFAULT_DEPTH : 0;

      const maxResults =
        typeof input.maxResults === "number" && Number.isFinite(input.maxResults)
          ? Math.max(1, Math.min(Math.floor(input.maxResults), MAX_RESULTS))
          : 200;

      const extensions =
        input.extensions && input.extensions.length > 0
          ? input.extensions
          : undefined;

      const walkResult = await walkDirectory({
        startAbsolutePath: resolved.absolutePath,
        startRelativePath: resolved.relativePath,
        maxDepth,
        maxResults,
        includeFiles: input.includeFiles !== false,
        includeDirs: input.includeDirs !== false,
        includeHidden: input.includeHidden === true,
        extensions,
        contains: input.contains,
      });

      const sortedEntries = [...walkResult.entries].sort(compareEntries);

      const rootLabel =
        resolved.relativePath && resolved.relativePath.length > 0
          ? resolved.relativePath
          : ".";

      const warnings =
        walkResult.truncated || (recursive && maxDepth >= DEFAULT_DEPTH)
          ? [
              ...(walkResult.truncated
                ? [
                    {
                      code: "RESULT_LIMIT_APPLIED",
                      message:
                        "Listing was truncated by safety limits. Narrow the path, reduce recursion, or add filters.",
                    },
                  ]
                : []),
              ...(extensions === undefined
                ? [
                    {
                      code: "NO_EXTENSION_FILTER",
                      message:
                        "No extension filter was provided. Use extensions to narrow very large trees.",
                    },
                  ]
                : []),
            ]
          : undefined;

      return finishToolSuccess({
        toolName: TOOL_NAME,
        summary: buildSummary({
          root: rootLabel,
          scannedCount: walkResult.scannedCount,
          returnedCount: sortedEntries.length,
          truncated: walkResult.truncated,
          recursive,
          depth: maxDepth,
        }),
        startedAt,
        warnings,
        content: {
          type: "json",
          json: {
            requestedPath,
            root: rootLabel,
            absolutePath: resolved.absolutePath,
            recursive,
            maxDepth,
            returnedCount: sortedEntries.length,
            scannedCount: walkResult.scannedCount,
            truncated: walkResult.truncated,
            entries: sortedEntries.map((entry) => ({
              path: entry.path,
              name: entry.name,
              kind: entry.kind,
              depth: entry.depth,
              ...(entry.extension ? { extension: entry.extension } : {}),
            })),
          },
        },
        raw: {
          requestedPath,
          absolutePath: resolved.absolutePath,
        },
      });
    } catch (error) {
      return finishToolError({
        toolName: TOOL_NAME,
        summary: "Failed to list files.",
        code: "LIST_FILES_FAILED",
        message:
          error instanceof Error && error.message.trim().length > 0
            ? clampText(error.message, 400)
            : "An unexpected error occurred while listing files.",
        startedAt,
        retryable: false,
      });
    }
  },
};
