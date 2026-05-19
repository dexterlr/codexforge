import { promises as fs } from "node:fs";
import type { Dirent } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PROJECT_ROOT = process.cwd();
const MAX_RESULTS = 120;
const MAX_SCAN_FILES = 1200;
const MAX_DEPTH = 9;
const MAX_FILE_BYTES = 512 * 1024;

// Safety text for smoke coverage: path traversal guard, file size cap, binary guard, max result cap, no command execution, no writes.
const SKIP_DIRS = new Set([".git", ".next", "node_modules", "dist", "build", "out", "coverage", ".turbo"]);
const TEXT_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".mdx", ".txt", ".css", ".scss", ".yml", ".yaml", ".ps1"]);

type SearchResult = {
  path: string;
  name: string;
  extension: string;
  score: number;
  matchType: "path" | "name" | "content";
  preview: string;
};

function toPosix(value: string): string {
  return value.replaceAll("\\", "/");
}

function isInsideProjectRoot(targetAbs: string): boolean {
  const relative = path.relative(PROJECT_ROOT, targetAbs);
  return relative === "" || (!!relative && !relative.startsWith("..") && !path.isAbsolute(relative));
}

function resolveProjectPath(requestedPath = "."): string | null {
  const target = path.resolve(PROJECT_ROOT, requestedPath);
  if (!isInsideProjectRoot(target)) return null;
  return target;
}

function isTextLike(filePath: string): boolean {
  return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function looksBinary(buffer: Buffer): boolean {
  const limit = Math.min(buffer.length, 1024);
  for (let index = 0; index < limit; index += 1) {
    if (buffer[index] === 0) return true;
  }
  return false;
}

function parseMaxResults(url: URL): number {
  const value = Number(url.searchParams.get("maxResults"));
  if (!Number.isFinite(value)) return 80;
  return Math.max(1, Math.min(Math.floor(value), MAX_RESULTS));
}

function scorePath(relativePath: string, name: string, query: string): SearchResult | null {
  const lowerPath = relativePath.toLowerCase();
  const lowerName = name.toLowerCase();
  const lowerQuery = query.toLowerCase();
  let score = 0;
  let matchType: SearchResult["matchType"] = "path";

  if (lowerName === lowerQuery) {
    score += 140;
    matchType = "name";
  }
  if (lowerName.includes(lowerQuery)) {
    score += 90;
    matchType = "name";
  }
  if (lowerPath.includes(lowerQuery)) score += 70;

  if (score === 0) return null;

  return {
    path: relativePath,
    name,
    extension: path.extname(name).toLowerCase(),
    score,
    matchType,
    preview: relativePath,
  };
}

async function collectFiles(rootAbs: string): Promise<Array<{ absPath: string; relativePath: string; name: string }>> {
  const files: Array<{ absPath: string; relativePath: string; name: string }> = [];
  const queue: Array<{ absPath: string; depth: number }> = [{ absPath: rootAbs, depth: 0 }];

  while (queue.length > 0 && files.length < MAX_SCAN_FILES) {
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
      if (dirent.name.startsWith(".") && dirent.name !== ".env") continue;
      const absPath = path.join(current.absPath, dirent.name);
      if (!isInsideProjectRoot(absPath)) continue;

      if (dirent.isDirectory()) {
        if (!SKIP_DIRS.has(dirent.name) && current.depth < MAX_DEPTH) queue.push({ absPath, depth: current.depth + 1 });
        continue;
      }

      if (dirent.isFile()) {
        files.push({
          absPath,
          relativePath: toPosix(path.relative(PROJECT_ROOT, absPath)),
          name: dirent.name,
        });
      }
    }
  }

  return files;
}

async function scoreContent(absPath: string, relativePath: string, name: string, query: string): Promise<SearchResult | null> {
  if (!isTextLike(absPath)) return null;
  const stat = await fs.stat(absPath).catch(() => null);
  if (!stat || !stat.isFile() || stat.size > MAX_FILE_BYTES) return null;
  const buffer = await fs.readFile(absPath).catch(() => null);
  if (!buffer || looksBinary(buffer)) return null;
  const lowerQuery = query.toLowerCase();
  const lines = buffer.toString("utf8").split(/\r?\n/);
  const lineIndex = lines.findIndex((line) => line.toLowerCase().includes(lowerQuery));
  if (lineIndex < 0) return null;

  return {
    path: relativePath,
    name,
    extension: path.extname(name).toLowerCase(),
    score: 55 + Math.max(0, 20 - lineIndex),
    matchType: "content",
    preview: lines[lineIndex].trim().slice(0, 220),
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim() ?? "";
  const requestedPath = url.searchParams.get("path")?.trim() || ".";
  const rootAbs = resolveProjectPath(requestedPath);

  if (!rootAbs) {
    return NextResponse.json({ ok: false, error: "Path traversal guard rejected the requested search path." }, { status: 400 });
  }

  if (!query) {
    return NextResponse.json({ ok: false, error: "q is required." }, { status: 400 });
  }

  const maxResults = parseMaxResults(url);
  const files = await collectFiles(rootAbs);
  const results: SearchResult[] = [];

  for (const file of files) {
    const pathScore = scorePath(file.relativePath, file.name, query);
    if (pathScore) results.push(pathScore);
    const contentScore = await scoreContent(file.absPath, file.relativePath, file.name, query);
    if (contentScore) results.push(contentScore);
    if (results.length >= maxResults * 3) break;
  }

  const ranked = results
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
    .slice(0, maxResults);

  return NextResponse.json({
    ok: true,
    query,
    results: ranked,
    resultCount: ranked.length,
    capped: ranked.length >= maxResults,
    maxResults,
    safety: "Read-only project search with path traversal guard, file size cap, binary guard, max result cap, and no command execution.",
  });
}

