import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type ReqBody = {
  repoPath?: string;
  runId?: string;
};

type RunPhase =
  | "idle"
  | "snapshotting"
  | "planning"
  | "awaiting_plan_approval"
  | "diffing"
  | "awaiting_diff_approval"
  | "applying"
  | "testing"
  | "done"
  | "error"
  | "canceled";

type RunFileV1 = {
  version: 1;
  runId: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  repoPath: string;
  goal: string;
  phase: RunPhase | string;
  logs: string[];
  // forward-compatible: allow extra fields
  [k: string]: unknown;
};

type GetResp =
  | { ok: true; run: RunFileV1; runFile: string }
  | { ok: false; error: string };

function json(status: number, payload: GetResp) {
  return NextResponse.json(payload, { status });
}

function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return !rel.startsWith("..") && !path.isAbsolute(rel);
}

function sanitizeRunId(s: string) {
  // Allow hex-like ids (your example is hex). Keep strict for safety.
  return /^[a-f0-9]{8,64}$/i.test(s) ? s : "";
}

function isISODateString(s: unknown) {
  if (typeof s !== "string" || !s.trim()) return false;
  const t = Date.parse(s);
  return Number.isFinite(t);
}

function asStringArray(v: unknown): string[] | null {
  if (!Array.isArray(v)) return null;
  for (const x of v) if (typeof x !== "string") return null;
  return v;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function normalizeRunFile(obj: Record<string, unknown>, fallbackRepoPath: string): RunFileV1 | null {
  // Required basics
  const version = obj.version;
  const runId = obj.runId;
  const createdAt = obj.createdAt;
  const updatedAt = obj.updatedAt;
  const repoPath = obj.repoPath;
  const goal = obj.goal;
  const phase = obj.phase;
  const logs = obj.logs;

  if (version !== 1) return null;
  if (typeof runId !== "string" || !runId.trim()) return null;
  if (!isISODateString(createdAt)) return null;
  if (!isISODateString(updatedAt)) return null;

  const rp =
    typeof repoPath === "string" && repoPath.trim()
      ? repoPath
      : fallbackRepoPath;

  if (!rp.trim()) return null;

  if (typeof goal !== "string") return null;
  if (typeof phase !== "string") return null;

  const logsArr = asStringArray(logs);
  if (!logsArr) return null;

  // Keep forward-compatible fields
  return {
    ...(obj as Record<string, unknown>),
    version: 1,
    runId,
    createdAt: String(createdAt),
    updatedAt: String(updatedAt),
    repoPath: rp,
    goal,
    phase,
    logs: logsArr,
  } as RunFileV1;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    const runIdRaw = String(body?.runId ?? "").trim();

    if (!repoPath) return json(400, { ok: false, error: "repoPath is required" });

    const runId = sanitizeRunId(runIdRaw);
    if (!runId) return json(400, { ok: false, error: "runId is required (hex id)" });

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

    // Build the run file path safely under: <repo>/.operator/runs/<runId>.json
    const runRel = path.join(".operator", "runs", `${runId}.json`);
    const runAbs = path.resolve(path.join(rootAbs, runRel));

    if (!isLikelyInside(rootAbs, runAbs)) {
      return json(400, { ok: false, error: "Resolved path escapes repoPath" });
    }

    // Read + parse
    let raw: string;
    try {
      raw = await fs.readFile(runAbs, "utf8");
    } catch {
      return json(404, { ok: false, error: "run file not found" });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return json(500, { ok: false, error: "run file is not valid JSON" });
    }

    if (!isObject(parsed)) {
      return json(500, { ok: false, error: "run file has invalid shape" });
    }

    const normalized = normalizeRunFile(parsed, rootAbs);
    if (!normalized) {
      return json(500, { ok: false, error: "run file missing required fields" });
    }

    return json(200, { ok: true, run: normalized, runFile: runAbs });
  } catch (e: unknown) {
    const msg = e instanceof Error && e.message.trim() ? e.message : "Unknown error";
    return json(500, { ok: false, error: msg });
  }
}
