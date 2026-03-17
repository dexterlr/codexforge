import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type ReqBody = {
  repoPath?: string;
  runId?: string;

  // Optional updates
  phase?: string;

  // Optional log append (either string or array)
  log?: string;
  logs?: string[];

  // Optional merge payload (advanced): shallow-merge extra fields into run
  // (kept for flexibility, but still validated/safe)
  patch?: Record<string, unknown>;
};

type RunFile = {
  version: number;
  runId: string;
  createdAt: string;
  updatedAt: string;
  repoPath: string;
  goal: string;
  phase: string;
  logs: string[];
  [k: string]: unknown;
};

type UpdateResp =
  | { ok: true; run: RunFile; runFile: string }
  | { ok: false; error: string };

const MAX_LOG_LINES = 2000;
const MAX_LOG_CHARS = 50_000;

function json(status: number, payload: UpdateResp) {
  return NextResponse.json(payload, { status });
}

function nowIso() {
  return new Date().toISOString();
}

function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return !rel.startsWith("..") && !path.isAbsolute(rel);
}

function sanitizeRunId(s: string) {
  // strict hex-ish id (your runIds are hex)
  return /^[a-f0-9]{8,64}$/i.test(s) ? s : "";
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : null;
}

function isIsoLikeString(v: unknown) {
  // Keep it permissive (we only need “string exists” here, not strict parsing)
  return typeof v === "string" && v.trim().length >= 10;
}

function validateRunFile(parsed: unknown, expectedRunId: string): RunFile | null {
  const r = asRecord(parsed);
  if (!r) return null;

  const version = typeof r.version === "number" ? r.version : NaN;
  const runId = typeof r.runId === "string" ? r.runId : "";
  const createdAt = r.createdAt;
  const updatedAt = r.updatedAt;
  const repoPath = typeof r.repoPath === "string" ? r.repoPath : "";
  const goal = typeof r.goal === "string" ? r.goal : "";
  const phase = typeof r.phase === "string" ? r.phase : "";
  const logs = Array.isArray(r.logs) ? r.logs : null;

  if (!Number.isFinite(version) || version < 1) return null;
  if (!runId || runId !== expectedRunId) return null;
  if (!isIsoLikeString(createdAt) || !isIsoLikeString(updatedAt)) return null;
  if (!repoPath || !goal || !phase) return null;
  if (!logs || !logs.every((x) => typeof x === "string")) return null;

  return r as RunFile;
}

function capLogs(logs: string[]) {
  // Keep newest last (append-style). Trim to max lines + max char budget.
  const out = logs.slice(-MAX_LOG_LINES);

  // Char budget: if too big, drop oldest until within budget
  let total = out.reduce((sum, s) => sum + s.length, 0);
  while (out.length > 0 && total > MAX_LOG_CHARS) {
    const removed = out.shift();
    total -= removed ? removed.length : 0;
  }

  return out;
}

async function atomicWrite(fileAbs: string, content: string) {
  const dir = path.dirname(fileAbs);
  const tmp = path.join(
    dir,
    `${path.basename(fileAbs)}.tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
  await fs.writeFile(tmp, content, "utf8");
  await fs.rename(tmp, fileAbs);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    const runIdRaw = String(body?.runId ?? "").trim();
    const runId = sanitizeRunId(runIdRaw);

    if (!repoPath) return json(400, { ok: false, error: "repoPath is required" });
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

    // <repo>/.operator/runs/<runId>.json
    const runRel = path.join(".operator", "runs", `${runId}.json`);
    const runAbs = path.resolve(path.join(rootAbs, runRel));

    if (!isLikelyInside(rootAbs, runAbs)) {
      return json(400, { ok: false, error: "Resolved path escapes repoPath" });
    }

    // Read existing
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

    const run = validateRunFile(parsed, runId);
    if (!run) {
      return json(500, { ok: false, error: "run file missing required fields" });
    }

    // ----- Apply updates (strict-ish + safe) -----

    // Phase (optional)
    const nextPhase =
      typeof body?.phase === "string" && body.phase.trim() ? body.phase.trim() : undefined;

    // Logs (optional)
    const toAppend: string[] = [];
    if (typeof body?.log === "string" && body.log.trim()) toAppend.push(body.log.trim());
    if (Array.isArray(body?.logs)) {
      for (const x of body.logs) {
        if (typeof x === "string" && x.trim()) toAppend.push(x.trim());
      }
    }

    // Optional shallow patch (protect critical keys)
    const patchObj = asRecord(body?.patch);
    if (patchObj) {
      const blocked = new Set([
        "version",
        "runId",
        "createdAt",
        "updatedAt",
        "repoPath",
        "logs",
        "goal",
      ]);

      for (const [k, v] of Object.entries(patchObj)) {
        if (blocked.has(k)) continue;
        run[k] = v;
      }
    }

    if (nextPhase) run.phase = nextPhase;

    // Always enforce log caps (even if no new logs)
    if (toAppend.length) {
      const stamped = toAppend.map((line) => `[${nowIso()}] ${line}`);
      run.logs = capLogs([...run.logs, ...stamped]);
    } else {
      run.logs = capLogs(run.logs);
    }

    run.updatedAt = nowIso();

    // Write back (atomic)
    await atomicWrite(runAbs, JSON.stringify(run, null, 2) + "\n");

    return json(200, { ok: true, run, runFile: runAbs });
  } catch (e: unknown) {
    const msg = e instanceof Error && e.message.trim() ? e.message : "Unknown error";
    return json(500, { ok: false, error: msg });
  }
}
