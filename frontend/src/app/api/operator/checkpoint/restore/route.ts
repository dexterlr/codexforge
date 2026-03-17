import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

type RestoreBody = {
  repoPath?: string;
  checkpointId?: string;
  dryRun?: boolean; // default true
  // Optional: restore only these repo-relative paths (POSIX)
  onlyFiles?: string[];
};

type MetaFile = {
  id?: string;
  createdAt?: string;
  repoRoot?: string;
  files?: string[]; // repo-relative, POSIX
};

type RestoredItem = {
  beforeFile: string;     // checkpoint filename (e.g. src__app__x.ts.before)
  targetRel: string;      // repo-relative POSIX path (e.g. src/app/x.ts)
  targetAbs: string;      // absolute path
  bytes: number;
  wrote: boolean;
};

type SkippedItem = {
  beforeFile: string;
  reason: string;
};

type OkResp = {
  ok: true;
  dryRun: boolean;
  checkpointId: string;
  checkpointDir: string;
  restored: RestoredItem[];
  skipped: SkippedItem[];
  meta?: MetaFile;
};

type ErrResp = { ok: false; error: string };

const MAX_FILE_BYTES = 500_000; // safety cap per file
const MAX_FILES = 50; // safety cap per restore op

// Keep this aligned with apply allowlist.
// Restore is powerful: do NOT let it write arbitrary files.
const ALLOWED_TARGETS = new Set<string>([
  "src/app/history/page.tsx",
  "src/app/operator/page.tsx",
  "src/app/api/operator/snapshot/route.ts",
  "src/app/api/operator/plan/route.ts",
  "src/app/api/operator/diff/route.ts",
  "src/app/api/operator/apply/route.ts",
  "src/app/api/operator/test/route.ts",
]);

function toPosix(p: string) {
  return p.replace(/\\/g, "/");
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : null;
}

function errorMessage(e: unknown, fallback: string) {
  if (e instanceof Error && typeof e.message === "string" && e.message.trim()) return e.message;
  if (typeof e === "string" && e.trim()) return e;
  return fallback;
}

function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return !!rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}

function json(status: number, payload: OkResp | ErrResp) {
  return NextResponse.json(payload, { status });
}

function json400(msg: string) {
  return json(400, { ok: false, error: msg });
}

async function ensureDir(dirAbs: string) {
  await fs.mkdir(dirAbs, { recursive: true });
}

async function writeTextAtomic(absPath: string, content: string) {
  const dir = path.dirname(absPath);
  const base = path.basename(absPath);
  const tmp = path.join(dir, `${base}.tmp-${crypto.randomBytes(4).toString("hex")}`);
  await fs.writeFile(tmp, content, "utf8");
  await fs.rename(tmp, absPath);
}

async function readUtf8WithCap(absPath: string) {
  const buf = await fs.readFile(absPath);
  if (buf.byteLength > MAX_FILE_BYTES) throw new Error(`File too large (> ${MAX_FILE_BYTES} bytes).`);
  return { text: buf.toString("utf8"), bytes: buf.byteLength };
}

// "src__app__operator__page.tsx.before" -> "src/app/operator/page.tsx"
function targetRelFromBeforeName(beforeFile: string) {
  if (!beforeFile.endsWith(".before")) return "";
  const stem = beforeFile.slice(0, -".before".length);
  // inverse of sanitizeRelForCheckpoint(): "/" -> "__"
  const rel = stem.replaceAll("__", "/");
  return toPosix(rel);
}

function normalizeOnlyFiles(onlyFiles: unknown) {
  if (!Array.isArray(onlyFiles)) return null;
  const out: string[] = [];
  for (const x of onlyFiles) {
    const s = typeof x === "string" ? toPosix(x.trim()) : "";
    if (s) out.push(s);
  }
  return out.length ? out : [];
}

async function tryReadMeta(metaAbs: string): Promise<MetaFile | null> {
  try {
    const raw = await fs.readFile(metaAbs, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    const rec = asRecord(parsed);
    if (!rec) return null;

    const files = Array.isArray(rec.files)
      ? rec.files.map((x) => (typeof x === "string" ? toPosix(x.trim()) : "")).filter(Boolean)
      : undefined;

    return {
      id: typeof rec.id === "string" ? rec.id : undefined,
      createdAt: typeof rec.createdAt === "string" ? rec.createdAt : undefined,
      repoRoot: typeof rec.repoRoot === "string" ? rec.repoRoot : undefined,
      files,
    };
  } catch {
    return null;
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    { ok: true },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const raw = (await req.json().catch(() => null)) as unknown;
    const bodyRec = asRecord(raw);
    const body = bodyRec as RestoreBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    const checkpointId = String(body?.checkpointId ?? "").trim();
    const dryRun = body?.dryRun !== false; // default true
    const onlyFiles = normalizeOnlyFiles(body?.onlyFiles);

    if (!repoPath) return json400("repoPath is required");
    if (!checkpointId) return json400("checkpointId is required");

    const rootAbs = path.resolve(repoPath);

    // Validate repoPath exists and is a folder
    let st;
    try {
      st = await fs.stat(rootAbs);
    } catch {
      return json400("repoPath does not exist");
    }
    if (!st.isDirectory()) return json400("repoPath must be a folder");

    const checkpointDirAbs = path.resolve(path.join(rootAbs, ".operator", "checkpoints", checkpointId));

    if (!isLikelyInside(rootAbs, checkpointDirAbs)) {
      return json400("checkpoint path escapes repoPath");
    }

    // Ensure checkpoint dir exists
    try {
      const cst = await fs.stat(checkpointDirAbs);
      if (!cst.isDirectory()) return json(404, { ok: false, error: "checkpoint not found" });
    } catch {
      return json(404, { ok: false, error: "checkpoint not found" });
    }

    const metaAbs = path.join(checkpointDirAbs, "meta.json");
    const meta = await tryReadMeta(metaAbs);

    // Determine candidate before files
    const entries = await fs.readdir(checkpointDirAbs);
    let beforeFiles = entries.filter((f) => f.endsWith(".before"));

    // If meta.files exists, restrict to that list (more trustworthy mapping)
    if (meta?.files?.length) {
      const wanted = new Set(meta.files.map(toPosix));
      beforeFiles = beforeFiles.filter((bf) => wanted.has(targetRelFromBeforeName(bf)));
    }

    if (onlyFiles) {
      const wanted = new Set(onlyFiles.map(toPosix));
      beforeFiles = beforeFiles.filter((bf) => wanted.has(targetRelFromBeforeName(bf)));
    }

    // Safety cap
    if (beforeFiles.length > MAX_FILES) {
      return json400(`Too many checkpoint files to restore (max ${MAX_FILES}).`);
    }

    const restored: RestoredItem[] = [];
    const skipped: SkippedItem[] = [];

    for (const beforeFile of beforeFiles) {
      const targetRel = targetRelFromBeforeName(beforeFile);

      if (!targetRel) {
        skipped.push({ beforeFile, reason: "could not map before file to target path" });
        continue;
      }

      // allowlist enforcement
      if (!ALLOWED_TARGETS.has(targetRel)) {
        skipped.push({ beforeFile, reason: `target not allowed: ${targetRel}` });
        continue;
      }

      const beforeAbs = path.join(checkpointDirAbs, beforeFile);
      const targetAbs = path.resolve(path.join(rootAbs, targetRel));

      if (!isLikelyInside(rootAbs, targetAbs)) {
        skipped.push({ beforeFile, reason: "target path escapes repoPath" });
        continue;
      }

      // Read checkpoint content (cap)
      let text: string;
      let bytes: number;
      try {
        const r = await readUtf8WithCap(beforeAbs);
        text = r.text;
        bytes = r.bytes;
      } catch (e) {
        skipped.push({ beforeFile, reason: `read failed: ${errorMessage(e, "unknown read error")}` });
        continue;
      }

      // Normalize newline ending
      const finalText = text.endsWith("\n") || text.length === 0 ? text : `${text}\n`;

      if (!dryRun) {
        await ensureDir(path.dirname(targetAbs));
        await writeTextAtomic(targetAbs, finalText);
      }

      restored.push({
        beforeFile,
        targetRel,
        targetAbs,
        bytes,
        wrote: !dryRun,
      });
    }

    const out: OkResp = {
      ok: true,
      dryRun,
      checkpointId,
      checkpointDir: checkpointDirAbs,
      restored,
      skipped,
      ...(meta ? { meta } : {}),
    };

    return json(200, out);
  } catch (e: unknown) {
    return json(500, { ok: false, error: errorMessage(e, "Unknown error") });
  }
}
