import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

type Diff = {
  filePath: string; // repo-relative, POSIX style
  patch: string; // unified diff text (full-replace format our diff endpoint emits)
};

type ApplyBody = {
  repoPath?: string;
  diffs?: Diff[];
  dryRun?: boolean; // default true
};

type ApplyResult = {
  ok: true;
  dryRun: boolean;
  appliedFiles: string[];
  checkpoint?: {
    id: string;
    dirAbs: string;
    files: string[];
  };
};

type ErrResult = { ok: false; error: string };

const MAX_FILE_BYTES = 500_000; // safety cap per file
const MAX_DIFFS = 25; // safety cap per request

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

function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return !!rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : null;
}

function errorMessage(e: unknown, fallback: string) {
  if (e instanceof Error && typeof e.message === "string" && e.message.trim()) return e.message;
  if (typeof e === "string" && e.trim()) return e;
  return fallback;
}

function json(status: number, payload: ErrResult | ApplyResult) {
  return NextResponse.json(payload, { status });
}

function json400(msg: string) {
  return json(400, { ok: false, error: msg });
}

function allowedTargetsList() {
  return Array.from(ALLOWED_TARGETS).sort().join(", ");
}

/**
 * Our diff format is "simple full replace":
 * - header lines: --- file, +++ file, @@ -1,x +1,y @@
 * - then all old lines prefixed with "-"
 * - then all new lines prefixed with "+"
 *
 * Apply reconstructs NEW content by joining "+" lines (stripping the '+').
 * (We ignore "---/+++/@@/old '-' lines".)
 */
function reconstructNewTextFromPatch(patch: string) {
  const lines = patch.split(/\r?\n/);
  const plusLines = lines.filter((l) => l.startsWith("+") && !l.startsWith("+++ "));
  const rebuilt = plusLines.map((l) => l.slice(1)).join("\n");
  return rebuilt;
}

function safeCheckpointId() {
  // Short, filesystem-safe id
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const rand = crypto.randomBytes(4).toString("hex");
  return `${stamp}-${rand}`;
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

async function fileExists(absPath: string) {
  try {
    const st = await fs.stat(absPath);
    return st.isFile();
  } catch {
    return false;
  }
}

function sanitizeRelForCheckpoint(relPosix: string) {
  // turn "src/app/x.ts" into "src__app__x.ts"
  return relPosix.replaceAll("/", "__");
}

async function readUtf8WithCap(absPath: string) {
  const buf = await fs.readFile(absPath);
  if (buf.byteLength > MAX_FILE_BYTES) {
    throw new Error(`File too large (> ${MAX_FILE_BYTES} bytes).`);
  }
  return buf.toString("utf8");
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
    const body = bodyRec as ApplyBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    const diffsRaw = body?.diffs;
    const dryRun = body?.dryRun !== false; // default true

    if (!repoPath) return json400("repoPath is required");
    if (!Array.isArray(diffsRaw)) return json400("diffs[] is required");
    if (diffsRaw.length === 0) return json400("diffs[] must not be empty");
    if (diffsRaw.length > MAX_DIFFS) return json400(`Too many diffs (max ${MAX_DIFFS}).`);

    const diffs: Diff[] = diffsRaw.map((d) => ({
      filePath: toPosix(String((d as Diff).filePath ?? "").trim()),
      patch: String((d as Diff).patch ?? ""),
    }));

    for (const d of diffs) {
      if (!d.filePath) return json400("diff.filePath is required");
      if (!d.patch) return json400("diff.patch is required");
      if (!ALLOWED_TARGETS.has(d.filePath)) {
        return json400(`Target not allowed: ${d.filePath}. Allowed: ${allowedTargetsList()}`);
      }
    }

    const rootAbs = path.resolve(repoPath);

    // Validate repoPath exists and is a folder
    let st;
    try {
      st = await fs.stat(rootAbs);
    } catch {
      return json400("repoPath does not exist");
    }
    if (!st.isDirectory()) return json400("repoPath must be a folder");

    // Resolve targets + validate they are inside repoPath
    const targetsAbs = diffs.map((d) => {
      const abs = path.resolve(path.join(rootAbs, d.filePath));
      if (!isLikelyInside(rootAbs, abs)) {
        throw new Error(`Resolved path escapes repoPath: ${d.filePath}`);
      }
      return abs;
    });

    // For dryRun, just report what would happen.
    if (dryRun) {
      const appliedFiles = diffs.map((d) => d.filePath);
      const out: ApplyResult = { ok: true, dryRun: true, appliedFiles };
      return NextResponse.json(out);
    }

    // ---- CHECKPOINT BEFORE WRITES ----
    const checkpointId = safeCheckpointId();
    const checkpointDirAbs = path.join(rootAbs, ".operator", "checkpoints", checkpointId);
    await ensureDir(checkpointDirAbs);

    // Save originals for every target (or empty marker if missing)
    const checkpointFiles: string[] = [];

    for (let i = 0; i < diffs.length; i++) {
      const relPosix = diffs[i].filePath;
      const abs = targetsAbs[i];

      const name = sanitizeRelForCheckpoint(relPosix);
      const savePath = path.join(checkpointDirAbs, `${name}.before`);

      if (await fileExists(abs)) {
        const original = await readUtf8WithCap(abs);
        await fs.writeFile(savePath, original, "utf8");
      } else {
        await fs.writeFile(savePath, "", "utf8");
      }
      checkpointFiles.push(`${name}.before`);
    }

    // Write metadata (helps future restore tooling)
    const meta = {
      id: checkpointId,
      createdAt: new Date().toISOString(),
      repoRoot: rootAbs,
      files: diffs.map((d) => d.filePath),
    };
    await fs.writeFile(path.join(checkpointDirAbs, "meta.json"), JSON.stringify(meta, null, 2), "utf8");

    // ---- APPLY WRITES (atomic per file) ----
    const appliedFiles: string[] = [];

    for (let i = 0; i < diffs.length; i++) {
      const relPosix = diffs[i].filePath;
      const abs = targetsAbs[i];

      const newText = reconstructNewTextFromPatch(diffs[i].patch);

      // Always end file with newline for consistency
      const finalText = newText.endsWith("\n") ? newText : `${newText}\n`;

      await ensureDir(path.dirname(abs));
      await writeTextAtomic(abs, finalText);
      appliedFiles.push(relPosix);
    }

    const out: ApplyResult = {
      ok: true,
      dryRun: false,
      appliedFiles,
      checkpoint: {
        id: checkpointId,
        dirAbs: checkpointDirAbs,
        files: checkpointFiles,
      },
    };

    return NextResponse.json(out);
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: errorMessage(e, "Unknown error") }, { status: 500 });
  }
}
