import { promises as fs } from "node:fs";
import path from "node:path";
import type { CodexForgeFileNode, CodexForgeFilePreview } from "../types";

export const CODEXFORGE_FILES_MAX_PREVIEW_LENGTH = 3200;

const LANGUAGE_BY_EXTENSION: Record<string, string> = {
  ".ts": "typescript",
  ".tsx": "tsx",
  ".js": "javascript",
  ".jsx": "jsx",
  ".json": "json",
  ".md": "markdown",
  ".css": "css",
  ".ps1": "powershell",
};

function normalizePath(value: string): string {
  return value.replaceAll("\\", "/");
}

function resolveInsideProject(relativePath: string): string | null {
  const root = process.cwd();
  const absolutePath = path.resolve(root, relativePath);
  const relative = path.relative(root, absolutePath);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) return null;
  return absolutePath;
}

export async function buildFilePreview(
  file: CodexForgeFileNode,
  maxPreviewLength = CODEXFORGE_FILES_MAX_PREVIEW_LENGTH
): Promise<CodexForgeFilePreview> {
  const safeMax = Math.max(200, Math.min(maxPreviewLength, CODEXFORGE_FILES_MAX_PREVIEW_LENGTH));
  const absolutePath = resolveInsideProject(file.path);
  const empty = {
    path: file.path,
    language: LANGUAGE_BY_EXTENSION[file.extension] ?? "text",
    preview: "",
    lineCount: file.lineCount,
    byteLength: 0,
    truncated: false,
    maxPreviewLength: safeMax,
  };

  if (!absolutePath) return empty;

  const stat = await fs.stat(absolutePath).catch(() => null);
  if (!stat || !stat.isFile() || stat.size > 512 * 1024) return empty;

  const text = await fs.readFile(absolutePath, "utf8").catch(() => "");
  const preview = text.length > safeMax ? `${text.slice(0, safeMax)}...` : text;

  return {
    path: normalizePath(path.relative(process.cwd(), absolutePath)),
    language: LANGUAGE_BY_EXTENSION[file.extension] ?? "text",
    preview,
    lineCount: text ? text.split(/\r?\n/).length : file.lineCount,
    byteLength: stat.size,
    truncated: text.length > safeMax,
    maxPreviewLength: safeMax,
  };
}

export async function buildFilePreviews(
  files: CodexForgeFileNode[],
  maxPreviewLength = CODEXFORGE_FILES_MAX_PREVIEW_LENGTH
): Promise<Record<string, CodexForgeFilePreview>> {
  const previews: Record<string, CodexForgeFilePreview> = {};
  for (const file of files.slice(0, 12)) {
    previews[file.path] = await buildFilePreview(file, maxPreviewLength);
  }
  return previews;
}
