import "server-only";
import { promises as fs } from "node:fs";
import type { Dirent } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  appendCodexForgePathSegment,
  CODEXFORGE_PROJECT_ROOT,
  isAbsolutePathInsideBase,
  resolveCodexForgeProjectPath,
  toPortableProjectRelativePath,
} from "@/lib/codexforge/server-safe-paths";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PROJECT_ROOT = CODEXFORGE_PROJECT_ROOT;
const MAX_RESULTS = 1000;
const MAX_DEPTH = 9;
const MAX_FILE_BYTES = 512 * 1024;
const MAX_READ_BYTES = 128 * 1024;

// Safety text for smoke coverage: path traversal guard, file size cap, binary guard, no command execution, no writes.
const SKIP_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  "dist",
  "build",
  "out",
  "coverage",
  ".turbo",
  ".cache",
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
  ".yml",
  ".yaml",
  ".ps1",
  ".html",
  ".svg",
]);

type SnapshotEntry = {
  path: string;
  name: string;
  type: "file" | "directory";
  extension?: string;
  depth: number;
  parentPath: string;
  sizeBytes?: number;
  sizeLabel?: string;
  lineCount?: number;
  importCount?: number;
  exportCount?: number;
  binary?: boolean;
  generated?: boolean;
};

function resolveProjectPath(requestedPath = "."): string | null {
  try {
    return resolveCodexForgeProjectPath(requestedPath, {
      outsideBaseError: "Path traversal guard rejected the requested path.",
      unsafeRelativeError: "Path traversal guard rejected the requested path.",
    }).absolutePath;
  } catch {
    return null;
  }
}

function parseMaxResults(url: URL): number {
  const value = Number(url.searchParams.get("maxResults"));
  if (!Number.isFinite(value)) return 800;
  return Math.max(1, Math.min(Math.floor(value), MAX_RESULTS));
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 102.4) / 10} KB`;
  return `${Math.round(bytes / 104857.6) / 10} MB`;
}

function isTextLike(filePath: string): boolean {
  const extension = path.extname(filePath).toLowerCase();
  const name = path.basename(filePath).toLowerCase();
  return TEXT_EXTENSIONS.has(extension) || TEXT_EXTENSIONS.has(name);
}

function looksBinary(buffer: Buffer): boolean {
  const limit = Math.min(buffer.length, 1024);
  for (let index = 0; index < limit; index += 1) {
    if (buffer[index] === 0) return true;
  }
  return false;
}

function countMatches(text: string, pattern: RegExp): number {
  return Array.from(text.matchAll(pattern)).length;
}

async function inspectTextFile(absPath: string, sizeBytes: number): Promise<{
  lineCount?: number;
  importCount?: number;
  exportCount?: number;
  binary: boolean;
}> {
  if (sizeBytes > MAX_READ_BYTES || !isTextLike(absPath)) {
    return { binary: !isTextLike(absPath) };
  }

  const buffer = await fs.readFile(absPath).catch(() => null);
  if (!buffer) return { binary: false };
  if (looksBinary(buffer)) return { binary: true };
  const text = buffer.toString("utf8");
  return {
    lineCount: text.length ? text.split(/\r?\n/).length : 0,
    importCount: countMatches(text, /\bimport\s+(?:type\s+)?/g),
    exportCount: countMatches(text, /\bexport\s+(?:type\s+)?/g),
    binary: false,
  };
}

function compareEntries(a: SnapshotEntry, b: SnapshotEntry): number {
  if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
  return a.path.localeCompare(b.path);
}

async function walkProject(rootAbs: string, maxResults: number): Promise<{
  entries: SnapshotEntry[];
  capped: boolean;
}> {
  const entries: SnapshotEntry[] = [];
  const queue: Array<{ absPath: string; depth: number }> = [{ absPath: rootAbs, depth: 0 }];
  let capped = false;

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;

    let dirents: Dirent[];
    try {
      dirents = await fs.readdir(current.absPath, { withFileTypes: true });
    } catch {
      continue;
    }

    dirents.sort((a, b) => a.name.localeCompare(b.name));

    for (const dirent of dirents) {
      if (entries.length >= maxResults) {
        capped = true;
        break;
      }

      if (dirent.name.startsWith(".") && dirent.name !== ".env") continue;
      const absPath = appendCodexForgePathSegment(current.absPath, dirent.name);
      if (!isAbsolutePathInsideBase(absPath, PROJECT_ROOT, true)) continue;
      const relative = toPortableProjectRelativePath(absPath, PROJECT_ROOT);
      const parentPath = path.posix.dirname(relative).replace(/^\.$/, "");

      if (dirent.isDirectory()) {
        if (SKIP_DIRS.has(dirent.name)) continue;
        entries.push({
          path: relative,
          name: dirent.name,
          type: "directory",
          depth: current.depth + 1,
          parentPath,
        });
        if (current.depth < MAX_DEPTH) queue.push({ absPath, depth: current.depth + 1 });
        continue;
      }

      if (!dirent.isFile()) continue;
      const stat = await fs.stat(absPath).catch(() => null);
      if (!stat) continue;
      const sizeBlocked = stat.size > MAX_FILE_BYTES;
      const inspection = sizeBlocked
        ? { binary: false }
        : await inspectTextFile(absPath, stat.size);

      entries.push({
        path: relative,
        name: dirent.name,
        type: "file",
        extension: path.extname(dirent.name).toLowerCase(),
        depth: current.depth + 1,
        parentPath,
        sizeBytes: stat.size,
        sizeLabel: formatSize(stat.size),
        lineCount: inspection.lineCount,
        importCount: inspection.importCount,
        exportCount: inspection.exportCount,
        binary: inspection.binary,
        generated: false,
      });
    }

    if (capped) break;
  }

  return { entries: entries.sort(compareEntries), capped };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const requestedPath = url.searchParams.get("path")?.trim() || ".";
  const rootAbs = resolveProjectPath(requestedPath);

  if (!rootAbs) {
    return NextResponse.json({ ok: false, error: "Path traversal guard rejected the requested path." }, { status: 400 });
  }

  const stat = await fs.stat(rootAbs).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    return NextResponse.json({ ok: false, error: "Requested project path is not a directory." }, { status: 400 });
  }

  const maxResults = parseMaxResults(url);
  const result = await walkProject(rootAbs, maxResults);
  const fileCount = result.entries.filter((entry) => entry.type === "file").length;
  const directoryCount = result.entries.filter((entry) => entry.type === "directory").length;

  return NextResponse.json({
    ok: true,
    root: PROJECT_ROOT,
    entries: result.entries,
    fileCount,
    directoryCount,
    capped: result.capped,
    maxResults,
    safety: "Read-only project snapshot with path traversal guard, file size cap, binary guard, and no command execution.",
  });
}
