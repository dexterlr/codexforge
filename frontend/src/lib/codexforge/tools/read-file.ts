import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  CodexForgeToolDefinition,
  CodexForgeToolExecutionContext,
  CodexForgeToolResult,
} from "./contracts";
import {
  asBoolean,
  asOptionalString,
  buildStartedAt,
  clampText,
  finishToolError,
  finishToolSuccess,
  normalizeWindowsPath,
} from "./shared";
import { resolveCodexForgeToolPath } from "./server-paths";

/* ================= CONSTANTS ================= */

const TOOL_NAME = "read-file";
const MAX_FILE_BYTES = 512 * 1024;
const MAX_RETURN_CHARS = 40_000;
const MAX_LINE_COUNT = 1200;
const ELLIPSIS = "...";

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
]);

/* ================= TYPES ================= */

type ReadFileInput = {
  path?: string;
  includeLineNumbers?: boolean;
  maxChars?: number;
};

type ResolvedPathInfo = {
  requestedPath: string;
  absolutePath: string;
  basePath: string;
  relativePath: string;
};

/* ================= HELPERS ================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function resolveTargetPath(
  requestedPath: string,
  context: CodexForgeToolExecutionContext
): ResolvedPathInfo {
  const resolved = resolveCodexForgeToolPath({
    requestedPath,
    context,
    allowBasePath: false,
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

function addLineNumbers(text: string): string {
  const lines = text.split(/\r?\n/);
  const width = String(lines.length).length;

  return lines
    .map((line, index) => `${String(index + 1).padStart(width, " ")}| ${line}`)
    .join("\n");
}

function clampTextResult(
  text: string,
  maxChars: number
): { text: string; truncated: boolean } {
  if (text.length <= maxChars) {
    return { text, truncated: false };
  }

  const safeMax = Math.max(0, maxChars - ELLIPSIS.length);

  return {
    text: `${text.slice(0, safeMax)}${ELLIPSIS}`,
    truncated: true,
  };
}

function clampLines(
  text: string,
  maxLines: number
): { text: string; truncated: boolean } {
  const lines = text.split(/\r?\n/);

  if (lines.length <= maxLines) {
    return { text, truncated: false };
  }

  return {
    text: `${lines.slice(0, maxLines).join("\n")}\n${ELLIPSIS}`,
    truncated: true,
  };
}

function buildSummary(args: {
  relativePath: string;
  absolutePath: string;
  byteLength: number;
  lineCount: number;
  truncated: boolean;
}): string {
  const parts = [
    `Read ${args.relativePath || args.absolutePath}`,
    `${args.byteLength} bytes`,
    `${args.lineCount} lines`,
  ];

  if (args.truncated) {
    parts.push("truncated");
  }

  return parts.join(" • ");
}

function normalizeInput(input: Record<string, unknown>): ReadFileInput {
  return {
    path: asOptionalString(input.path),
    includeLineNumbers: asBoolean(input.includeLineNumbers, true),
    maxChars: asNumber(input.maxChars),
  };
}

/* ================= TOOL FACTORY ================= */

export function createReadFileTool(): CodexForgeToolDefinition {
  return {
    name: "read-file",
    label: "Read File",
    description:
      "Read a text file from the active project with workspace guardrails, truncation, and metadata.",
    availability: "ready",
    domain: "repo",
    safety: "safe",
    capabilities: ["read", "inspect"],
    tags: ["repo", "files", "read", "source", "content", "safe"],
    parameters: [
      {
        name: "path",
        type: "string",
        description: "Project-relative or absolute file path to read.",
        required: true,
      },
      {
        name: "includeLineNumbers",
        type: "boolean",
        description: "Whether to prefix returned lines with line numbers.",
        required: false,
        defaultValue: true,
      },
      {
        name: "maxChars",
        type: "number",
        description: "Optional character cap for returned file content.",
        required: false,
        defaultValue: MAX_RETURN_CHARS,
      },
    ],
    examples: [
      {
        title: "Read a TypeScript file",
        input: {
          path: "src/lib/codexforge/tools/index.ts",
        },
      },
      {
        title: "Read without line numbers",
        input: {
          path: "src/app/api/codexforge/chat/route.ts",
          includeLineNumbers: false,
        },
      },
    ],
    metadata: {
      provider: "local",
      version: "codexforge-read-file-v1",
      supportedPlatforms: ["windows", "linux", "darwin"],
      tags: ["filesystem", "workspace-guarded", "text-only"],
    },
    handler: async (
      rawInput: Record<string, unknown>,
      context: CodexForgeToolExecutionContext
    ): Promise<CodexForgeToolResult> => {
      const startedAt = buildStartedAt();

      try {
        const input = normalizeInput(rawInput);
        const requestedPath = input.path;

        if (!requestedPath) {
          return finishToolError({
            toolName: TOOL_NAME,
            summary: "Missing file path.",
            code: "MISSING_PATH",
            message: "The read-file tool requires a path.",
            startedAt,
            retryable: false,
          });
        }

        const resolved = resolveTargetPath(requestedPath, context);

        const stat = await fs.stat(resolved.absolutePath).catch(() => null);
        if (!stat) {
          return finishToolError({
            toolName: TOOL_NAME,
            summary: `File not found: ${requestedPath}`,
            code: "FILE_NOT_FOUND",
            message: "The requested file could not be found.",
            startedAt,
            retryable: false,
            details: {
              requestedPath,
              absolutePath: resolved.absolutePath,
            },
          });
        }

        if (!stat.isFile()) {
          return finishToolError({
            toolName: TOOL_NAME,
            summary: `Path is not a file: ${requestedPath}`,
            code: "NOT_A_FILE",
            message: "The requested path exists but is not a file.",
            startedAt,
            retryable: false,
            details: {
              requestedPath,
              absolutePath: resolved.absolutePath,
            },
          });
        }

        if (stat.size > MAX_FILE_BYTES) {
          return finishToolError({
            toolName: TOOL_NAME,
            summary: `File too large to read safely: ${requestedPath}`,
            code: "FILE_TOO_LARGE",
            message: `The file exceeds the safe size limit of ${MAX_FILE_BYTES} bytes.`,
            startedAt,
            retryable: false,
            details: {
              requestedPath,
              absolutePath: resolved.absolutePath,
              size: stat.size,
              maxBytes: MAX_FILE_BYTES,
            },
          });
        }

        const buffer = await fs.readFile(resolved.absolutePath);

        if (looksBinary(buffer) && !isTextLikeFile(resolved.absolutePath)) {
          return finishToolError({
            toolName: TOOL_NAME,
            summary: `Binary file cannot be read as text: ${requestedPath}`,
            code: "BINARY_FILE",
            message: "The requested file appears to be binary and cannot be returned as text.",
            startedAt,
            retryable: false,
            details: {
              requestedPath,
              absolutePath: resolved.absolutePath,
            },
          });
        }

        let text = buffer.toString("utf8");
        const warnings: CodexForgeToolResult["warnings"] = [];

        const lineClamp = clampLines(text, MAX_LINE_COUNT);
        text = lineClamp.text;
        if (lineClamp.truncated) {
          warnings.push({
            code: "LINE_LIMIT_APPLIED",
            message: `File output was limited to ${MAX_LINE_COUNT} lines.`,
          });
        }

        const maxChars =
          typeof input.maxChars === "number" && input.maxChars > 0
            ? Math.min(input.maxChars, MAX_RETURN_CHARS)
            : MAX_RETURN_CHARS;

        const charClamp = clampTextResult(text, maxChars);
        text = charClamp.text;
        if (charClamp.truncated) {
          warnings.push({
            code: "CHAR_LIMIT_APPLIED",
            message: `File output was limited to ${maxChars} characters.`,
          });
        }

        const withLineNumbers =
          input.includeLineNumbers === false ? text : addLineNumbers(text);

        const normalizedRelativePath =
          resolved.relativePath.length > 0
            ? resolved.relativePath
            : path.basename(resolved.absolutePath);

        return finishToolSuccess({
          toolName: TOOL_NAME,
          summary: buildSummary({
            relativePath: normalizedRelativePath,
            absolutePath: resolved.absolutePath,
            byteLength: buffer.byteLength,
            lineCount: text.split(/\r?\n/).length,
            truncated: lineClamp.truncated || charClamp.truncated,
          }),
          startedAt,
          warnings: warnings.length > 0 ? warnings : undefined,
          content: {
            type: "json",
            json: {
              requestedPath,
              relativePath: normalizedRelativePath,
              absolutePath: resolved.absolutePath,
              size: buffer.byteLength,
              truncated: lineClamp.truncated || charClamp.truncated,
              content: withLineNumbers,
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
          summary: "Failed to read file.",
          code: "READ_FILE_FAILED",
          message:
            error instanceof Error && error.message.trim().length > 0
              ? clampText(error.message, 400)
              : "An unexpected error occurred while reading the file.",
          startedAt,
          retryable: false,
        });
      }
    },
  };
}

/* ================= EXPORTS ================= */

export const readFileTool = createReadFileTool();
