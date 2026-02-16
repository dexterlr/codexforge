import { NextResponse } from "next/server";
import { makeOperatorV3Plan } from "@/lib/operator/v3/generatePlan";

type PlanStep = {
  id: string;
  title: string;
  detail: string;
};

type Plan = {
  goal: string;
  steps: PlanStep[];
  meta: {
    createdAt: string;
    version: string;
    notes: string[];
  };
};

type ReqBody = {
  repoPath?: unknown;
  goal?: unknown;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function safeErrorMessage(e: unknown, fallback = "Unknown error") {
  if (e instanceof Error && typeof e.message === "string" && e.message.trim()) return e.message;
  if (typeof e === "string" && e.trim()) return e;
  if (e && typeof e === "object" && "message" in e) {
    const msg = (e as { message?: unknown }).message;
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  return fallback;
}

async function readJsonBody(req: Request): Promise<ReqBody | null> {
  try {
    const data = await req.json().catch(() => null);
    return (data ?? null) as ReqBody | null;
  } catch {
    return null;
  }
}

function makePlan(goal: string): Plan {
  const createdAt = new Date().toISOString();

  return {
    goal,
    steps: [
      { id: "read_repo", title: "Read repository", detail: "Read repository structure at repoPath (no writes)." },
      { id: "understand_goal", title: "Understand goal", detail: `Understand goal: "${goal}"` },
      { id: "propose_plan", title: "Propose minimal plan", detail: "Produce small, explicit steps with clear file targets." },
      { id: "generate_diffs", title: "Generate diffs", detail: "Generate diffs only (no file writes yet)." },
      { id: "human_approval", title: "Wait for human approval", detail: "Require explicit approval before any apply step." },
      { id: "apply_diffs", title: "Apply diffs to disk", detail: "Apply approved diffs atomically to allowlisted files." },
      { id: "run_tests", title: "Run tests", detail: "Run configured checks/tests and capture stdout/stderr." },
      { id: "summarize_audit", title: "Summarize + audit trail", detail: "Summarize results and persist audit trail artifacts." },
    ],
    meta: {
      createdAt,
      version: "plan-v1",
      notes: ["Deterministic stub planner", "No repo reads performed here yet", "v3Plan included in shadow mode"],
    },
  };
}

export async function POST(req: Request) {
  try {
    const body = await readJsonBody(req);

    const repoPath = isNonEmptyString(body?.repoPath) ? body.repoPath.trim() : "";
    const goal = isNonEmptyString(body?.goal) ? body.goal.trim() : "";

    if (!repoPath) {
      return NextResponse.json({ ok: false, error: "repoPath is required" }, { status: 400 });
    }
    if (!goal) {
      return NextResponse.json({ ok: false, error: "goal is required" }, { status: 400 });
    }

    const plan = makePlan(goal);

    // v3 shadow mode: deterministic plan data (no FS reads, no writes).
    const v3Plan = makeOperatorV3Plan({ repoPath, goal });

    return NextResponse.json({
      ok: true,
      plan,
      v3Plan,
    });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: safeErrorMessage(e, "Unknown error") }, { status: 500 });
  }
}
