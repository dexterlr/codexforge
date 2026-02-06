import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type ReqBody = {
  repoPath?: string;
};

type CheckpointMeta = {
  id?: string;
  createdAt?: string;
  repoRoot?: string;
  files?: string[];
  [k: string]: unknown;
};

type ListedCheckpoint = {
  id: string;
  dirAbs: string;
  meta?: CheckpointMeta;
  metaError?: string;
};

type Resp =
  | { ok: true; checkpointsDir: string; count: number; checkpoints: ListedCheckpoint[] }
  | { ok: false; error: string };

function json(status: number, payload: Resp) {
  return NextResponse.json(payload, { status });
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

async function isDir(absPath: string) {
  try {
    const st = await fs.stat(absPath);
    return st.isDirectory();
  } catch {
    return false;
  }
}

async function safeReadJson(absPath: string): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  try {
    const raw = await fs.readFile(absPath, "utf8");
    return { ok: true, data: JSON.parse(raw) as unknown };
  } catch (e: unknown) {
    return { ok: false, error: errorMessage(e, "Failed to read JSON") };
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
    const body = bodyRec as ReqBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    if (!repoPath) return json(400, { ok: false, error: "repoPath is required" });

    const rootAbs = path.resolve(repoPath);

    // Validate repoPath exists and is a folder
    let st;
    try {
      st = await fs.stat(rootAbs);
    } catch {
      return json(400, { ok: false, error: "repoPath does not exist" });
    }
    if (!st.isDirectory()) return json(400, { ok: false, error: "repoPath must be a folder" });

    const checkpointsDir = path.resolve(path.join(rootAbs, ".operator", "checkpoints"));
    if (!isLikelyInside(rootAbs, checkpointsDir)) {
      return json(400, { ok: false, error: "checkpoints path escapes repoPath" });
    }

    if (!(await isDir(checkpointsDir))) {
      return json(200, { ok: true, checkpointsDir, count: 0, checkpoints: [] });
    }

    const entries = await fs.readdir(checkpointsDir, { withFileTypes: true });

    const dirs = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      // ignore weird names
      .filter((name) => !!name && !name.includes("/") && !name.includes("\\"))
      // newest-first (ids include ISO timestamps)
      .sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));

    const checkpoints: ListedCheckpoint[] = [];

    for (const id of dirs) {
      const dirAbs = path.resolve(path.join(checkpointsDir, id));
      if (!isLikelyInside(checkpointsDir, dirAbs)) continue;

      const metaPath = path.join(dirAbs, "meta.json");
      const metaRead = await safeReadJson(metaPath);

      if (metaRead.ok) {
        const rec = asRecord(metaRead.data);
        checkpoints.push({
          id,
          dirAbs,
          meta: (rec ?? { raw: metaRead.data }) as CheckpointMeta,
        });
      } else {
        checkpoints.push({
          id,
          dirAbs,
          metaError: metaRead.error,
        });
      }
    }

    return json(200, {
      ok: true,
      checkpointsDir,
      count: checkpoints.length,
      checkpoints,
    });
  } catch (e: unknown) {
    return json(500, { ok: false, error: errorMessage(e, "Unknown error") });
  }
}
