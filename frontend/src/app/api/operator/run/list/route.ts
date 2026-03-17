import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type ReqBody = {
  repoPath?: string;
  limit?: number; // optional cap (default 50, max 200)
};

type RunSummary = {
  runId: string;
  createdAt: string;
  updatedAt: string;
  goal: string;
  phase: string;
};

type ListResp =
  | { ok: true; runsDir: string; count: number; capped: boolean; runs: RunSummary[] }
  | { ok: false; error: string };

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

function json(status: number, payload: ListResp) {
  return NextResponse.json(payload, { status });
}

function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return !rel.startsWith("..") && !path.isAbsolute(rel);
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : null;
}

function sanitizeRunIdFromFilename(name: string) {
  // expects "<runId>.json"
  if (!name.toLowerCase().endsWith(".json")) return "";
  const base = name.slice(0, -5);
  return /^[a-f0-9]{8,64}$/i.test(base) ? base : "";
}

function isIsoString(v: unknown) {
  return typeof v === "string" && v.length >= 10;
}

function safeNumber(v: unknown) {
  return typeof v === "number" && Number.isFinite(v) ? v : NaN;
}

function clampLimit(v: unknown) {
  const n = safeNumber(v);
  if (!Number.isFinite(n)) return DEFAULT_LIMIT;
  return Math.max(1, Math.min(MAX_LIMIT, Math.floor(n)));
}

function parseRunSummary(parsed: unknown): RunSummary | null {
  const r = asRecord(parsed);
  if (!r) return null;

  const runId = typeof r.runId === "string" ? r.runId : "";
  const createdAt = r.createdAt;
  const updatedAt = r.updatedAt;
  const goal = typeof r.goal === "string" ? r.goal : "";
  const phase = typeof r.phase === "string" ? r.phase : "";

  if (!runId || !/^[a-f0-9]{8,64}$/i.test(runId)) return null;
  if (!isIsoString(createdAt) || !isIsoString(updatedAt)) return null;
  if (!goal) return null;
  if (!phase) return null;

  return { runId, createdAt: String(createdAt), updatedAt: String(updatedAt), goal, phase };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    if (!repoPath) return json(400, { ok: false, error: "repoPath is required" });

    const limit = clampLimit(body?.limit);

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

    // runs dir: <repo>/.operator/runs
    const runsRel = path.join(".operator", "runs");
    const runsAbs = path.resolve(path.join(rootAbs, runsRel));

    if (!isLikelyInside(rootAbs, runsAbs)) {
      return json(400, { ok: false, error: "Resolved path escapes repoPath" });
    }

    // If runs dir doesn't exist, return empty list (not an error)
    let dirEntries: import("node:fs").Dirent[];
    try {
      dirEntries = await fs.readdir(runsAbs, { withFileTypes: true });
    } catch {
      return json(200, { ok: true, runsDir: runsAbs, count: 0, capped: false, runs: [] });
    }

    const jsonFiles = dirEntries
      .filter((d) => d.isFile())
      .map((d) => d.name)
      .filter((name) => sanitizeRunIdFromFilename(name));

    // Read + parse summaries (best-effort; ignore bad files)
    const runs: RunSummary[] = [];

    for (const name of jsonFiles) {
      const fileAbs = path.resolve(path.join(runsAbs, name));
      if (!isLikelyInside(runsAbs, fileAbs)) continue;

      try {
        const raw = await fs.readFile(fileAbs, "utf8");
        const parsed: unknown = JSON.parse(raw);
        const summary = parseRunSummary(parsed);
        if (summary) runs.push(summary);
      } catch {
        // ignore corrupt/unreadable file
      }
    }

    // Sort newest-first by updatedAt
    runs.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

    const capped = runs.length > limit;
    const sliced = runs.slice(0, limit);

    return json(200, {
      ok: true,
      runsDir: runsAbs,
      count: sliced.length,
      capped,
      runs: sliced,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error && e.message.trim() ? e.message : "Unknown error";
    return json(500, { ok: false, error: msg });
  }
}
