import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

type ReqBody = {
  repoPath?: string;
  goal?: string;
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

type RunFile = {
  version: 1;
  runId: string;
  createdAt: string;
  updatedAt: string;
  repoPath: string;
  goal: string;
  phase: RunPhase;
  logs: string[];
  snapshot?: unknown;
  plan?: unknown;
  diffs?: unknown;
  appliedFiles?: string[];
  testOutput?: string;
  lastError?: string;
};

type Resp =
  | { ok: true; runId: string; runFile: string }
  | { ok: false; error: string };

const RUN_ID_BYTES = 12;
const MAX_GOAL_LENGTH = 2000;

function json(status: number, payload: Resp) {
  return NextResponse.json(payload, { status });
}

function nowIso() {
  return new Date().toISOString();
}

function makeRunId() {
  return crypto.randomBytes(RUN_ID_BYTES).toString("hex");
}

function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
}

function logLine(msg: string) {
  return `[${nowIso()}] ${msg}`;
}

function normalizeRepoPath(input: string) {
  return path.resolve(input.trim());
}

function normalizeGoal(input: string) {
  return input.replace(/\s+/g, " ").trim();
}

async function ensureDirectory(dirAbs: string) {
  await fs.mkdir(dirAbs, { recursive: true });
}

async function writeJsonFile(fileAbs: string, value: unknown) {
  await fs.writeFile(fileAbs, JSON.stringify(value, null, 2) + "\n", "utf8");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPathRaw = String(body?.repoPath ?? "");
    const goalRaw = String(body?.goal ?? "");

    const repoAbs = normalizeRepoPath(repoPathRaw);
    const goal = normalizeGoal(goalRaw);

    if (!repoPathRaw.trim()) {
      return json(400, { ok: false, error: "repoPath is required" });
    }

    if (!goal) {
      return json(400, { ok: false, error: "goal is required" });
    }

    if (goal.length > MAX_GOAL_LENGTH) {
      return json(400, { ok: false, error: `goal is too long (max ${MAX_GOAL_LENGTH} characters)` });
    }

    let repoStat: Awaited<ReturnType<typeof fs.stat>>;
    try {
      repoStat = await fs.stat(repoAbs);
    } catch {
      return json(400, { ok: false, error: "repoPath does not exist" });
    }

    if (!repoStat.isDirectory()) {
      return json(400, { ok: false, error: "repoPath must be a folder" });
    }

    const operatorDirAbs = path.resolve(path.join(repoAbs, ".operator"));
    if (!isLikelyInside(repoAbs, operatorDirAbs)) {
      return json(400, { ok: false, error: "Invalid operator path" });
    }

    const runsDirAbs = path.resolve(path.join(operatorDirAbs, "runs"));
    if (!isLikelyInside(repoAbs, runsDirAbs)) {
      return json(400, { ok: false, error: "Invalid runs directory" });
    }

    await ensureDirectory(runsDirAbs);

    const runId = makeRunId();
    const runFileAbs = path.resolve(path.join(runsDirAbs, `${runId}.json`));

    if (!isLikelyInside(runsDirAbs, runFileAbs)) {
      return json(400, { ok: false, error: "Invalid run file path" });
    }

    const createdAt = nowIso();

    const run: RunFile = {
      version: 1,
      runId,
      createdAt,
      updatedAt: createdAt,
      repoPath: repoAbs,
      goal,
      phase: "idle",
      logs: [logLine("Run created.")],
    };

    await writeJsonFile(runFileAbs, run);

    return json(200, {
      ok: true,
      runId,
      runFile: runFileAbs,
    });
  } catch (e: unknown) {
    const msg =
      e instanceof Error && e.message.trim()
        ? e.message
        : "Unknown error";

    return json(500, { ok: false, error: msg });
  }
}