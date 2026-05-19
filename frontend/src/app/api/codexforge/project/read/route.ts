import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PROJECT_ROOT = process.cwd();
const MAX_FILE_BYTES = 512 * 1024;
const MAX_PREVIEW_CHARS = 6000;

// Safety text for smoke coverage: path traversal guard, file size cap, binary guard, no command execution, no writes.
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
  ".env",
  ".gitignore",
]);

function toPosix(value: string): string {
  return value.replaceAll("\\", "/");
}

function isInsideProjectRoot(targetAbs: string): boolean {
  const relative = path.relative(PROJECT_ROOT, targetAbs);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function resolveFilePath(requestedPath: string): string | null {
  const target = path.resolve(PROJECT_ROOT, requestedPath);
  if (!isInsideProjectRoot(target)) return null;
  return target;
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

function parseMaxChars(url: URL): number {
  const value = Number(url.searchParams.get("maxChars"));
  if (!Number.isFinite(value)) return MAX_PREVIEW_CHARS;
  return Math.max(200, Math.min(Math.floor(value), MAX_PREVIEW_CHARS));
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 102.4) / 10} KB`;
  return `${Math.round(bytes / 104857.6) / 10} MB`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const requestedPath = url.searchParams.get("path")?.trim() ?? "";
  const maxChars = parseMaxChars(url);

  if (!requestedPath) {
    return NextResponse.json({ ok: false, error: "path is required." }, { status: 400 });
  }

  const absPath = resolveFilePath(requestedPath);
  if (!absPath) {
    return NextResponse.json({ ok: false, error: "Path traversal guard rejected the requested file." }, { status: 400 });
  }

  const stat = await fs.stat(absPath).catch(() => null);
  if (!stat || !stat.isFile()) {
    return NextResponse.json({ ok: false, error: "Requested path is not a file." }, { status: 400 });
  }

  if (stat.size > MAX_FILE_BYTES) {
    return NextResponse.json({
      ok: true,
      path: toPosix(path.relative(PROJECT_ROOT, absPath)),
      sizeBytes: stat.size,
      sizeLabel: formatSize(stat.size),
      lineCount: 0,
      content: "",
      truncated: false,
      binaryBlocked: false,
      sizeBlocked: true,
      safety: "Read-only file size cap blocked preview; no command execution and no writes.",
    });
  }

  const buffer = await fs.readFile(absPath);
  const binaryBlocked = looksBinary(buffer) || !isTextLike(absPath);
  if (binaryBlocked) {
    return NextResponse.json({
      ok: true,
      path: toPosix(path.relative(PROJECT_ROOT, absPath)),
      sizeBytes: stat.size,
      sizeLabel: formatSize(stat.size),
      lineCount: 0,
      content: "",
      truncated: false,
      binaryBlocked: true,
      sizeBlocked: false,
      safety: "Read-only binary guard blocked text preview; no command execution and no writes.",
    });
  }

  const text = buffer.toString("utf8").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const truncated = text.length > maxChars;
  const content = truncated ? `${text.slice(0, maxChars - 3)}...` : text;

  return NextResponse.json({
    ok: true,
    path: toPosix(path.relative(PROJECT_ROOT, absPath)),
    sizeBytes: stat.size,
    sizeLabel: formatSize(stat.size),
    lineCount: text.length ? text.split("\n").length : 0,
    content,
    truncated,
    binaryBlocked: false,
    sizeBlocked: false,
    safety: "Read-only file preview with path traversal guard, file size cap, binary guard, and no command execution.",
  });
}

