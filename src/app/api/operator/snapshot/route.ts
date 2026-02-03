import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

type SnapshotFile = {
  path: string; // repo-relative, POSIX style
  bytes: number;
  mtimeMs: number;
};

type ReqBody = { repoPath?: string };

const SKIP_DIRS = new Set<string>([
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

const MAX_FILES = 2000; // hard cap for safety
const MAX_DEPTH = 20; // avoid runaway recursion

function toPosix(p: string) {
  return p.split(path.sep).join("/");
}

function errorMessage(e: unknown): string {
  if (e && typeof e === "object" && "message" in e) {
    const msg = (e as { message?: unknown }).message;
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  return "Unknown error";
}

async function walkDir(
  rootAbs: string,
  currentAbs: string,
  depth: number,
  out: SnapshotFile[]
): Promise<void> {
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

    // Skip obvious junk dirs early
    if (ent.isDirectory() && SKIP_DIRS.has(ent.name)) continue;

    const abs = path.join(currentAbs, ent.name);

    if (ent.isDirectory()) {
      await walkDir(rootAbs, abs, depth + 1, out);
      continue;
    }

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
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    if (!repoPath) {
      return NextResponse.json({ ok: false, error: "repoPath is required" }, { status: 400 });
    }

    const rootAbs = path.resolve(repoPath);

    // Validate repoPath exists and is a folder
    let st: Awaited<ReturnType<typeof fs.stat>>;
    try {
      st = await fs.stat(rootAbs);
    } catch {
      return NextResponse.json({ ok: false, error: "repoPath does not exist" }, { status: 400 });
    }

    if (!st.isDirectory()) {
      return NextResponse.json({ ok: false, error: "repoPath must be a folder" }, { status: 400 });
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
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: errorMessage(e) }, { status: 500 });
  }
}
