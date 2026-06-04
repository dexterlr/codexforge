import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Dirent } from "node:fs";
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
import {
  appendCodexForgeToolPathSegment,
  appendCodexForgeToolRelativeSegment,
  resolveCodexForgeToolPath,
} from "./server-paths";

/* ================= CONSTANTS ================= */

const TOOL_NAME = "search-project";

const DEFAULT_MAX_RESULTS = 60;
const DEFAULT_MAX_FILE_BYTES = 512 * 1024;
const DEFAULT_MAX_SCAN_FILES = 1500;
const DEFAULT_MAX_DEPTH = 8;
const DEFAULT_MAX_MATCHES_PER_FILE = 8;
const DEFAULT_MAX_PREVIEW_CHARS = 240;
const DEFAULT_CONTEXT_LINES = 2;

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

type SearchProjectInput = {
  query?: string;
  path?: string;
  recursive?: boolean;
  caseSensitive?: boolean;
  regex?: boolean;
  includeHidden?: boolean;
  fileExtensions?: string[];
  maxResults?: number;
  maxFileBytes?: number;
  maxDepth?: number;
};

type ResolvedScope = {
  requestedPath?: string;
  basePath: string;
  absolutePath: string;
  relativePath: string;
};

type SearchToken = {
  value: string;
  normalized: string;
};

type SearchHit = {
  relativePath: string;
  absolutePath: string;
  type: "content" | "filename";
  score: number;
  fileName: string;
  extension: string;
  line?: number;
  column?: number;
  preview: string;
  matchText?: string;
};

type SearchStats = {
  scannedDirectories: number;
  scannedFiles: number;
  skippedFiles: number;
  skippedDirectories: number;
  matchedFiles: number;
};

type WalkQueueItem = {
  absolutePath: string;
  relativePath: string;
  depth: number;
};

/* ================= HELPERS ================= */

function normalizeExtension(value: string): string {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return "";
  return trimmed.startsWith(".") ? trimmed : `.${trimmed}`;
}

function resolveScope(
  requestedPath: string | undefined,
  context: CodexForgeToolExecutionContext
): ResolvedScope {
  const resolved = resolveCodexForgeToolPath({
    requestedPath,
    context,
    outsideBaseError: "Requested search path is outside the allowed workspace scope.",
    unsafeRelativeError: "Requested search path contains unsafe traversal.",
  });

  return {
    requestedPath,
    basePath: resolved.basePath,
    absolutePath: resolved.absolutePath,
    relativePath: resolved.relativePath,
  };
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

function shouldIncludeHidden(name: string, includeHidden: boolean): boolean {
  if (includeHidden) return true;
  return !name.startsWith(".");
}

function tokenizeQuery(query: string): SearchToken[] {
  return dedupeStrings(
    query
      .split(/\s+/)
      .map((part) => part.trim())
      .filter(Boolean)
  ).map((value) => ({
    value,
    normalized: value.toLowerCase(),
  }));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildRegex(
  query: string,
  caseSensitive: boolean,
  regex: boolean
): RegExp {
  const source = regex ? query : escapeRegExp(query);
  return new RegExp(source, caseSensitive ? "g" : "gi");
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

function normalizeInput(input: Record<string, unknown>): SearchProjectInput {
  return {
    query: asOptionalString(input.query),
    path: asOptionalString(input.path),
    recursive: asBoolean(input.recursive, true),
    caseSensitive: asBoolean(input.caseSensitive, false),
    regex: asBoolean(input.regex, false),
    includeHidden: asBoolean(input.includeHidden, false),
    fileExtensions: asStringArray(input.fileExtensions).map(normalizeExtension),
    maxResults: asNumber(input.maxResults),
    maxFileBytes: asNumber(input.maxFileBytes),
    maxDepth: asNumber(input.maxDepth),
  };
}

function buildPreviewFromLine(
  lineText: string,
  maxChars: number
): string {
  const normalized = lineText.replace(/\t/g, "  ").trim();
  return clampText(normalized, maxChars);
}

function buildPreviewFromContext(
  lines: string[],
  lineIndex: number,
  contextLines: number,
  maxChars: number
): string {
  const start = Math.max(0, lineIndex - contextLines);
  const end = Math.min(lines.length, lineIndex + contextLines + 1);

  const slice = lines.slice(start, end).map((line) => line.trim()).filter(Boolean);
  return clampText(slice.join(" | "), maxChars);
}

function computeFilenameScore(
  fileName: string,
  relativePath: string,
  query: string,
  tokens: SearchToken[],
  caseSensitive: boolean
): number {
  const haystackName = caseSensitive ? fileName : fileName.toLowerCase();
  const haystackPath = caseSensitive ? relativePath : relativePath.toLowerCase();
  const targetQuery = caseSensitive ? query : query.toLowerCase();

  let score = 0;

  if (haystackName === targetQuery) score += 220;
  if (haystackName.includes(targetQuery)) score += 120;
  if (haystackPath.includes(targetQuery)) score += 80;

  for (const token of tokens) {
    const tokenValue = caseSensitive ? token.value : token.normalized;
    if (haystackName.includes(tokenValue)) score += 30;
    if (haystackPath.includes(tokenValue)) score += 18;
  }

  return score;
}

function computeContentScore(
  lineText: string,
  relativePath: string,
  query: string,
  tokens: SearchToken[],
  caseSensitive: boolean,
  lineNumber: number
): number {
  const haystackLine = caseSensitive ? lineText : lineText.toLowerCase();
  const haystackPath = caseSensitive ? relativePath : relativePath.toLowerCase();
  const targetQuery = caseSensitive ? query : query.toLowerCase();

  let score = 0;

  if (haystackLine.includes(targetQuery)) score += 100;
  if (haystackPath.includes(targetQuery)) score += 20;

  for (const token of tokens) {
    const tokenValue = caseSensitive ? token.value : token.normalized;
    if (haystackLine.includes(tokenValue)) score += 18;
    if (haystackPath.includes(tokenValue)) score += 8;
  }

  if (lineNumber <= 40) score += 8;

  return score;
}

function compareHits(a: SearchHit, b: SearchHit): number {
  if (a.score !== b.score) return b.score - a.score;
  if (a.relativePath !== b.relativePath) {
    return a.relativePath.localeCompare(b.relativePath);
  }

  const aLine = a.line ?? Number.MAX_SAFE_INTEGER;
  const bLine = b.line ?? Number.MAX_SAFE_INTEGER;
  return aLine - bLine;
}

function shouldSearchFileByExtension(
  filePath: string,
  allowedExtensions: string[]
): boolean {
  if (allowedExtensions.length === 0) {
    return isTextLikeFile(filePath);
  }

  const extension = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath).toLowerCase();

  return allowedExtensions.includes(extension) || allowedExtensions.includes(basename);
}

async function collectFileCandidates(args: {
  scope: ResolvedScope;
  recursive: boolean;
  includeHidden: boolean;
  maxDepth: number;
  stats: SearchStats;
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
      continue;
    }

    if (!stat.isDirectory()) {
      continue;
    }

    args.stats.scannedDirectories += 1;

    let dirEntries: Dirent[];
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

      const entryAbsolutePath = appendCodexForgeToolPathSegment(current.absolutePath, entryName);
      const entryRelativePath = appendCodexForgeToolRelativeSegment(current.relativePath, entryName);

      if (entry.isFile()) {
        files.push({
          absolutePath: entryAbsolutePath,
          relativePath: entryRelativePath,
        });
        args.stats.scannedFiles += 1;
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

async function searchFile(args: {
  fileAbsolutePath: string;
  fileRelativePath: string;
  query: string;
  regexPattern: RegExp;
  caseSensitive: boolean;
  tokens: SearchToken[];
  maxFileBytes: number;
  maxMatchesPerFile: number;
  maxPreviewChars: number;
  stats: SearchStats;
}): Promise<SearchHit[]> {
  const hits: SearchHit[] = [];
  const fileName = path.basename(args.fileRelativePath);
  const extension = path.extname(args.fileRelativePath).toLowerCase();

  const filenameScore = computeFilenameScore(
    fileName,
    args.fileRelativePath,
    args.query,
    args.tokens,
    args.caseSensitive
  );

  if (filenameScore > 0) {
    hits.push({
      relativePath: args.fileRelativePath,
      absolutePath: args.fileAbsolutePath,
      type: "filename",
      score: filenameScore,
      fileName,
      extension,
      preview: clampText(args.fileRelativePath, args.maxPreviewChars),
      matchText: fileName,
    });
  }

  let stat;
  try {
    stat = await fs.stat(args.fileAbsolutePath);
  } catch {
    args.stats.skippedFiles += 1;
    return hits;
  }

  if (!stat.isFile()) {
    return hits;
  }

  if (stat.size > args.maxFileBytes) {
    args.stats.skippedFiles += 1;
    return hits;
  }

  let buffer: Buffer;
  try {
    buffer = await fs.readFile(args.fileAbsolutePath);
  } catch {
    args.stats.skippedFiles += 1;
    return hits;
  }

  if (looksBinary(buffer) && !isTextLikeFile(args.fileAbsolutePath)) {
    args.stats.skippedFiles += 1;
    return hits;
  }

  const text = buffer.toString("utf8");
  const lines = text.split(/\r?\n/);

  let matchesForFile = 0;

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const lineText = lines[lineIndex];
    args.regexPattern.lastIndex = 0;
    const match = args.regexPattern.exec(lineText);

    if (!match || match.index < 0) {
      continue;
    }

    matchesForFile += 1;

    hits.push({
      relativePath: args.fileRelativePath,
      absolutePath: args.fileAbsolutePath,
      type: "content",
      score: computeContentScore(
        lineText,
        args.fileRelativePath,
        args.query,
        args.tokens,
        args.caseSensitive,
        lineIndex + 1
      ),
      fileName,
      extension,
      line: lineIndex + 1,
      column: match.index + 1,
      preview: buildPreviewFromContext(
        lines,
        lineIndex,
        DEFAULT_CONTEXT_LINES,
        args.maxPreviewChars
      ),
      matchText: buildPreviewFromLine(match[0], args.maxPreviewChars),
    });

    if (matchesForFile >= args.maxMatchesPerFile) {
      break;
    }
  }

  return hits;
}

/* ================= TOOL ================= */

export const searchProjectTool: CodexForgeToolDefinition = {
  name: "search-project",
  label: "Search Project",
  description:
    "Search the active project for filenames and text matches with guarded workspace scope, ranked results, and useful previews.",
  availability: "ready",
  domain: "repo",
  safety: "safe",
  capabilities: ["search", "inspect", "read"],
  tags: [
    "repo",
    "search",
    "codebase",
    "symbols",
    "references",
    "files",
    "content",
    "safe",
  ],
  parameters: [
    {
      name: "query",
      type: "string",
      description: "Search query or regex pattern.",
      required: true,
    },
    {
      name: "path",
      type: "string",
      description: "Optional folder or file path to narrow the search.",
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
      name: "caseSensitive",
      type: "boolean",
      description: "Whether matching should be case-sensitive.",
      required: false,
      defaultValue: false,
    },
    {
      name: "regex",
      type: "boolean",
      description: "Whether query should be treated as a regular expression.",
      required: false,
      defaultValue: false,
    },
    {
      name: "includeHidden",
      type: "boolean",
      description: "Whether dotfiles and dotfolders should be included.",
      required: false,
      defaultValue: false,
    },
    {
      name: "fileExtensions",
      type: "string[]",
      description: "Optional list of file extensions to include, such as ['ts','tsx','md'].",
      required: false,
    },
    {
      name: "maxResults",
      type: "number",
      description: "Maximum number of ranked results to return.",
      required: false,
      defaultValue: DEFAULT_MAX_RESULTS,
    },
    {
      name: "maxFileBytes",
      type: "number",
      description: "Maximum file size to scan.",
      required: false,
      defaultValue: DEFAULT_MAX_FILE_BYTES,
    },
    {
      name: "maxDepth",
      type: "number",
      description: "Maximum recursion depth when recursive search is enabled.",
      required: false,
      defaultValue: DEFAULT_MAX_DEPTH,
    },
  ],
  examples: [
    {
      title: "Search for a symbol in the repo",
      input: {
        query: "runCodexForgeEngine",
      },
    },
    {
      title: "Search only TypeScript files in a folder",
      input: {
        query: "CodexForgeToolRegistry",
        path: "src/lib/codexforge/tools",
        fileExtensions: ["ts"],
      },
    },
    {
      title: "Regex search",
      input: {
        query: "build[A-Z][A-Za-z]+",
        regex: true,
      },
    },
  ],
  metadata: {
    provider: "local",
    version: "codexforge-search-project-v1",
    supportedPlatforms: ["windows", "linux", "darwin"],
    tags: ["filesystem", "workspace-guarded", "content-search", "filename-search"],
  },
  handler: async (
    rawInput: Record<string, unknown>,
    context: CodexForgeToolExecutionContext
  ): Promise<CodexForgeToolResult> => {
    const startedAt = buildStartedAt();

    try {
      const input = normalizeInput(rawInput);
      const query = input.query;

      if (!query) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Missing search query.",
          code: "MISSING_QUERY",
          message: "The search-project tool requires a query.",
          startedAt,
          retryable: false,
        });
      }

      const scope = resolveScope(input.path, context);
      const recursive = input.recursive !== false;
      const caseSensitive = input.caseSensitive === true;
      const regex = input.regex === true;
      const includeHidden = input.includeHidden === true;
      const maxResults = clampNumber(input.maxResults, DEFAULT_MAX_RESULTS, 1, 200);
      const maxFileBytes = clampNumber(
        input.maxFileBytes,
        DEFAULT_MAX_FILE_BYTES,
        1024,
        2 * 1024 * 1024
      );
      const maxDepth = clampNumber(input.maxDepth, DEFAULT_MAX_DEPTH, 0, 32);

      const regexPattern = buildRegex(query, caseSensitive, regex);
      const tokens = tokenizeQuery(query);
      const allowedExtensions = dedupeStrings(
        (input.fileExtensions ?? []).map(normalizeExtension).filter(Boolean)
      );

      const stats: SearchStats = {
        scannedDirectories: 0,
        scannedFiles: 0,
        skippedFiles: 0,
        skippedDirectories: 0,
        matchedFiles: 0,
      };

      const warnings: CodexForgeToolWarning[] = [];

      const candidates = await collectFileCandidates({
        scope,
        recursive,
        includeHidden,
        maxDepth,
        stats,
      });

      const cappedCandidates = candidates.slice(0, DEFAULT_MAX_SCAN_FILES);
      if (candidates.length > cappedCandidates.length) {
        warnings.push({
          code: "SCAN_LIMIT_APPLIED",
          message: `Search scan was limited to ${DEFAULT_MAX_SCAN_FILES} files.`,
        });
      }

      const hits: SearchHit[] = [];
      const matchedFiles = new Set<string>();

      for (const candidate of cappedCandidates) {
        if (!shouldSearchFileByExtension(candidate.absolutePath, allowedExtensions)) {
          stats.skippedFiles += 1;
          continue;
        }

        const fileHits = await searchFile({
          fileAbsolutePath: candidate.absolutePath,
          fileRelativePath: candidate.relativePath,
          query,
          regexPattern,
          caseSensitive,
          tokens,
          maxFileBytes,
          maxMatchesPerFile: DEFAULT_MAX_MATCHES_PER_FILE,
          maxPreviewChars: DEFAULT_MAX_PREVIEW_CHARS,
          stats,
        });

        if (fileHits.length > 0) {
          matchedFiles.add(candidate.relativePath);
          hits.push(...fileHits);
        }
      }

      stats.matchedFiles = matchedFiles.size;

      const rankedHits = hits.sort(compareHits).slice(0, maxResults);
      if (hits.length > rankedHits.length) {
        warnings.push({
          code: "RESULT_LIMIT_APPLIED",
          message: `Search results were limited to ${maxResults} entries.`,
        });
      }

      const normalizedScopePath =
        scope.relativePath.length > 0
          ? scope.relativePath
          : normalizeWindowsPath(path.basename(scope.absolutePath));

      return finishToolSuccess({
        toolName: TOOL_NAME,
        summary:
          rankedHits.length > 0
            ? `Found ${rankedHits.length} result${rankedHits.length === 1 ? "" : "s"} for "${query}" in ${normalizedScopePath || scope.absolutePath}.`
            : `No results found for "${query}" in ${normalizedScopePath || scope.absolutePath}.`,
        startedAt,
        warnings: warnings.length > 0 ? warnings : undefined,
        content: {
          type: "json",
          json: {
            query,
            scope: {
              requestedPath: scope.requestedPath ?? "",
              relativePath: normalizedScopePath || "",
              absolutePath: scope.absolutePath,
            },
            options: {
              recursive,
              caseSensitive,
              regex,
              includeHidden,
              fileExtensions: allowedExtensions,
              maxResults,
              maxFileBytes,
              maxDepth,
            },
            stats,
            results: rankedHits.map((hit) => ({
              relativePath: hit.relativePath,
              absolutePath: hit.absolutePath,
              type: hit.type,
              score: hit.score,
              fileName: hit.fileName,
              extension: hit.extension,
              line: hit.line ?? null,
              column: hit.column ?? null,
              preview: hit.preview,
              matchText: hit.matchText ?? null,
            })),
          },
        },
        raw: {
          query,
          resultCount: rankedHits.length,
          matchedFiles: stats.matchedFiles,
        },
      });
    } catch (error) {
      return finishToolError({
        toolName: TOOL_NAME,
        summary: "Failed to search project.",
        code: "SEARCH_PROJECT_FAILED",
        message:
          error instanceof Error && error.message.trim().length > 0
            ? clampText(error.message, 400)
            : "An unexpected error occurred while searching the project.",
        startedAt,
        retryable: false,
      });
    }
  },
};
