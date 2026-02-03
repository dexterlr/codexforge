import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

type SnapshotFile = {
  path: string;   // repo-relative, POSIX style
  bytes: number;
  mtimeMs: number;
};

const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  ".next",
  "dist",
  "build",
  "out",
  ".turbo",
  ".cache",
  "coverage",
]);

const MAX_FILES = 2000;      // hard cap for safety
const MAX_DEPTH = 20;        // avoid runaway recursion

function toPosix(p: string) {
  return p.split(path.sep).join("/");
}

function isLikelyInside(parent: string, child: string) {
  const rel = path.relative(parent, child);
  return !!rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}

async function walkDir(
  rootAbs: string,
  currentAbs: string,
  depth: number,
  out: SnapshotFile[]
) {
  if (out.length >= MAX_FILES) return;
  if (depth > MAX_DEPTH) return;

  let entries: fs.Dirent[];
  try {
    entries = await fs.readdir(currentAbs, { withFileTypes: true });
  } catch {
    return;
  }

  for (const ent of entries) {
    if (out.length >= MAX_FILES) break;

    const abs = path.join(currentAbs, ent.name);

    // Skip obvious junk dirs
    if (ent.isDirectory() && SKIP_DIRS.has(ent.name)) continue;

    // If it’s a directory, recurse
    if (ent.isDirectory()) {
      await walkDir(rootAbs, abs, depth + 1, out);
      continue;
    }

    // Only include normal files
    if (!ent.isFile()) continue;

    try {
      const st = await fs.stat(abs);
      const rel = path.relative(rootAbs, abs);
      out.push({
        path: toPosix(rel),
        bytes: st.size,
        mtimeMs: st.mtimeMs,
      });
    } catch {
      // ignore unreadable files
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { repoPath?: string }
      | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    if (!repoPath) {
      return NextResponse.json(
        { ok: false, error: "repoPath is required" },
        { status: 400 }
      );
    }

    const rootAbs = path.resolve(repoPath);

    // Basic safety checks
    let st;
    try {
      st = await fs.stat(rootAbs);
    } catch {
      return NextResponse.json(
        { ok: false, error: "repoPath does not exist" },
        { status: 400 }
      );
    }

    if (!st.isDirectory()) {
      return NextResponse.json(
        { ok: false, error: "repoPath must be a folder" },
        { status: 400 }
      );
    }

    // Walk the folder (read-only)
    const files: SnapshotFile[] = [];
    await walkDir(rootAbs, rootAbs, 0, files);

    // Deterministic ordering
    files.sort((a, b) => a.path.localeCompare(b.path));

    return NextResponse.json({
      ok: true,
      root: rootAbs,
      fileCount: files.length,
      capped: files.length >= MAX_FILES,
      files,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
