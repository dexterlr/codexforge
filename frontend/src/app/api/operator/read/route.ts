import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type ReqBody = {
  repoPath?: string;
  filePath?: string; // repo-relative ("/" or "\" ok)
};

type ReadOk = { ok: true; root: string; filePath: string; bytes: number; text: string };
type ReadErr = { ok: false; error: string };
type ReadResponse = ReadOk | ReadErr;

// Safety caps
const MAX_FILE_BYTES = 1_000_000; // 1MB max per read
const BLOCKED_DIRS = new Set([
  ".git",
  "node_modules",
  ".next",
  "dist",
  "build",
  "out",
]);

function json(status: number, payload: ReadResponse) {
  return NextResponse.json(payload, { status });
}

function toPosix(p: string) {
  return p.replace(/\\/g, "/");
}

function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return !rel.startsWith("..") && !path.isAbsolute(rel);
}

function normalizeRepoRelative(filePathRaw: string): { ok: true; filePosix: string } | { ok: false; error: string } {
  let filePosix = toPosix(filePathRaw).trim();

  if (!filePosix) return { ok: false, error: "filePath is required" };

  // Force repo-relative paths only
  filePosix = filePosix.replace(/^\/+/, ""); // strip leading slashes

  // Reject absolute/drive/UNC style inputs (Windows + POSIX)
  if (path.posix.isAbsolute(filePosix) || path.win32.isAbsolute(filePosix)) {
    return { ok: false, error: "filePath must be repo-relative" };
  }
  if (/^[a-zA-Z]:/.test(filePosix)) {
    return { ok: false, error: "filePath must be repo-relative" };
  }
  if (filePosix.startsWith("//")) {
    return { ok: false, error: "filePath must be repo-relative" };
  }

  // Block obvious traversal patterns early
  if (filePosix.includes("..")) {
    return { ok: false, error: "filePath must not contain '..'" };
  }

  // Block sensitive/common heavy folders
  const firstSeg = filePosix.split("/")[0] ?? "";
  if (BLOCKED_DIRS.has(firstSeg)) {
    return { ok: false, error: `Reading from '${firstSeg}' is blocked` };
  }

  return { ok: true, filePosix };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    const filePathRaw = String(body?.filePath ?? "").trim();

    if (!repoPath) return json(400, { ok: false, error: "repoPath is required" });

    const norm = normalizeRepoRelative(filePathRaw);
    if (!norm.ok) return json(400, { ok: false, error: norm.error });

    const rootAbs = path.resolve(repoPath);

    // Validate repoPath exists and is a folder
    let stRoot: Awaited<ReturnType<typeof fs.stat>>;
    try {
      stRoot = await fs.stat(rootAbs);
    } catch {
      return json(400, { ok: false, error: "repoPath does not exist" });
    }
    if (!stRoot.isDirectory()) {
      return json(400, { ok: false, error: "repoPath must be a folder" });
    }

    // Resolve target path safely inside repo (critical: do NOT use path.join with absolute file inputs)
    const absPath = path.resolve(rootAbs, norm.filePosix);

    if (!isLikelyInside(rootAbs, absPath)) {
      return json(400, { ok: false, error: "Resolved path escapes repoPath" });
    }

    // Stat target
    let stFile: Awaited<ReturnType<typeof fs.stat>>;
    try {
      stFile = await fs.stat(absPath);
    } catch {
      return json(400, { ok: false, error: "filePath does not exist" });
    }
    if (!stFile.isFile()) {
      return json(400, { ok: false, error: "filePath must be a file" });
    }
    if (stFile.size > MAX_FILE_BYTES) {
      return json(400, { ok: false, error: `File too large (> ${MAX_FILE_BYTES} bytes)` });
    }

    // Read as UTF-8 (for code/text files). If you later need binary, add base64 mode.
    const buf = await fs.readFile(absPath);
    const text = buf.toString("utf8");

    return json(200, {
      ok: true,
      root: rootAbs,
      filePath: norm.filePosix,
      bytes: buf.byteLength,
      text,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error && e.message.trim() ? e.message : "Unknown error";
    return json(500, { ok: false, error: msg });
  }
}
