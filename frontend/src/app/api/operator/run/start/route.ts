import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

type ReqBody = {
  repoPath?: string;
  goal?: string;
};

type RunFile = {
  version: 1;
  runId: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  repoPath: string; // absolute resolved
  goal: string;
  phase:
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

function json(status: number, payload: Resp) {
  return NextResponse.json(payload, { status });
}

function nowIso() {
  return new Date().toISOString();
}

function makeRunId() {
  // short + filesystem-safe
  return crypto.randomBytes(12).toString("hex");
}

function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return !rel.startsWith("..") && !path.isAbsolute(rel);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPathRaw = String(body?.repoPath ?? "").trim();
    const goal = String(body?.goal ?? "").trim();

    if (!repoPathRaw) return json(400, { ok: false, error: "repoPath is required" });
    if (!goal) return json(400, { ok: false, error: "goal is required" });

    const repoAbs = path.resolve(repoPathRaw);

    // Validate repoPath exists and is a folder
    let stRoot: Awaited<ReturnType<typeof fs.stat>>;
    try {
      stRoot = await fs.stat(repoAbs);
    } catch {
      return json(400, { ok: false, error: "repoPath does not exist" });
    }
    if (!stRoot.isDirectory()) {
      return json(400, { ok: false, error: "repoPath must be a folder" });
    }

    // Build safe run directory inside repo
    const opDirAbs = path.resolve(path.join(repoAbs, ".operator"));
    if (!isLikelyInside(repoAbs, opDirAbs)) {
      return json(400, { ok: false, error: "Internal error: opDir escapes repoPath" });
    }

    const runsDirAbs = path.resolve(path.join(opDirAbs, "runs"));
    if (!isLikelyInside(repoAbs, runsDirAbs)) {
      return json(400, { ok: false, error: "Internal error: runsDir escapes repoPath" });
    }

    await fs.mkdir(runsDirAbs, { recursive: true });

    const runId = makeRunId();
    const runFileAbs = path.resolve(path.join(runsDirAbs, `${runId}.json`));
    if (!isLikelyInside(runsDirAbs, runFileAbs)) {
      return json(400, { ok: false, error: "Internal error: run file escapes runsDir" });
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
      logs: [`[${createdAt}] Run created.`],
    };

    await fs.writeFile(runFileAbs, JSON.stringify(run, null, 2), "utf8");

    return json(200, { ok: true, runId, runFile: runFileAbs });
  } catch (e: unknown) {
    const msg = e instanceof Error && e.message.trim() ? e.message : "Unknown error";
    return json(500, { ok: false, error: msg });
  }
}
