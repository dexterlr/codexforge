import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type ReqBody = {
  repoPath?: string;
  runId?: string;
  phase?: string;
  log?: string;
  logs?: string[];
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

// simple in-process per-file write queue
const writeQueues = new Map<string, Promise<void>>();

function json(status: number, payload: UpdateResp) {
  return NextResponse.json(payload, { status });
}

function nowIso() {
  return new Date().toISOString();
}

function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function sanitizeRunId(s: string) {
  return /^[a-f0-9]{8,64}$/i.test(s) ? s : "";
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : null;
}

function isIsoLikeString(v: unknown) {
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
  const out = logs.slice(-MAX_LOG_LINES);

  let total = out.reduce((sum, s) => sum + s.length, 0);
  while (out.length > 0 && total > MAX_LOG_CHARS) {
    const removed = out.shift();
    total -= removed ? removed.length : 0;
  }

  return out;
}

async function readValidRunFile(runAbs: string, runId: string) {
  let raw: string;
  try {
    raw = await fs.readFile(runAbs, "utf8");
  } catch {
    throw new Error("run file not found");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("run file is not valid JSON");
  }

  const run = validateRunFile(parsed, runId);
  if (!run) {
    throw new Error("run file missing required fields");
  }

  return run;
}

async function writeRunFileAtomic(runAbs: string, run: RunFile) {
  const dir = path.dirname(runAbs);
  const base = path.basename(runAbs);
  const tempAbs = path.join(dir, `${base}.tmp`);

  const content = JSON.stringify(run, null, 2) + "\n";

  await fs.writeFile(tempAbs, content, "utf8");
  await fs.rename(tempAbs, runAbs);
}

async function withFileQueue<T>(fileAbs: string, work: () => Promise<T>): Promise<T> {
  const prev = writeQueues.get(fileAbs) ?? Promise.resolve();

  let release!: () => void;
  const next = new Promise<void>((resolve) => {
    release = resolve;
  });

  writeQueues.set(fileAbs, prev.then(() => next));

  await prev;

  try {
    return await work();
  } finally {
    release();
    if (writeQueues.get(fileAbs) === next) {
      writeQueues.delete(fileAbs);
    }
  }
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

    let stRoot;
    try {
      stRoot = await fs.stat(rootAbs);
    } catch {
      return json(400, { ok: false, error: "repoPath does not exist" });
    }

    if (!stRoot.isDirectory()) {
      return json(400, { ok: false, error: "repoPath must be a folder" });
    }

    const runRel = path.join(".operator", "runs", `${runId}.json`);
    const runAbs = path.resolve(path.join(rootAbs, runRel));

    if (!isLikelyInside(rootAbs, runAbs)) {
      return json(400, { ok: false, error: "Resolved path escapes repoPath" });
    }

    const result = await withFileQueue(runAbs, async () => {
      const run = await readValidRunFile(runAbs, runId);

      const nextPhase =
        typeof body?.phase === "string" && body.phase.trim()
          ? body.phase.trim()
          : undefined;

      const toAppend: string[] = [];

      if (typeof body?.log === "string" && body.log.trim()) {
        toAppend.push(body.log.trim());
      }

      if (Array.isArray(body?.logs)) {
        for (const x of body.logs) {
          if (typeof x === "string" && x.trim()) {
            toAppend.push(x.trim());
          }
        }
      }

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

      if (nextPhase) {
        run.phase = nextPhase;
      }

      if (toAppend.length) {
        const stamped = toAppend.map((line) => `[${nowIso()}] ${line}`);
        run.logs = capLogs([...run.logs, ...stamped]);
      } else {
        run.logs = capLogs(run.logs);
      }

      run.updatedAt = nowIso();

      await writeRunFileAtomic(runAbs, run);

      return run;
    });

    return json(200, { ok: true, run: result, runFile: runAbs });
  } catch (e: unknown) {
    const msg = e instanceof Error && e.message.trim() ? e.message : "Unknown error";

    if (msg === "run file not found") {
      return json(404, { ok: false, error: msg });
    }

    if (
      msg === "run file is not valid JSON" ||
      msg === "run file missing required fields"
    ) {
      return json(500, { ok: false, error: msg });
    }

    return json(500, { ok: false, error: msg });
  }
}