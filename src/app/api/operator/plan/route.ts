import { NextResponse } from "next/server";

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

function safeErrorMessage(e: unknown, fallback = "Unknown error") {
  if (e instanceof Error && typeof e.message === "string" && e.message.trim()) return e.message;
  if (typeof e === "string" && e.trim()) return e;
  return fallback;
}

function makePlan(goal: string): Plan {
  // Deterministic, fast, safe planner.
  // Later: replace with real planner (LLM or rules) reading repo snapshot.
  const createdAt = new Date().toISOString();

  return {
    goal,
    steps: [
      {
        id: "read_repo",
        title: "Read repository",
        detail: "Read repository structure at repoPath (no writes).",
      },
      {
        id: "understand_goal",
        title: "Understand goal",
        detail: `Understand goal: "${goal}"`,
      },
      {
        id: "propose_plan",
        title: "Propose minimal plan",
        detail: "Produce small, explicit steps with clear file targets.",
      },
      {
        id: "generate_diffs",
        title: "Generate diffs",
        detail: "Generate diffs only (no file writes yet).",
      },
      {
        id: "human_approval",
        title: "Wait for human approval",
        detail: "Require explicit approval before any apply step.",
      },
      {
        id: "apply_diffs",
        title: "Apply diffs to disk",
        detail: "Apply approved diffs atomically to allowlisted files.",
      },
      {
        id: "run_tests",
        title: "Run tests",
        detail: "Run configured checks/tests and capture stdout/stderr.",
      },
      {
        id: "summarize_audit",
        title: "Summarize + audit trail",
        detail: "Summarize results and persist audit trail artifacts.",
      },
    ],
    meta: {
      createdAt,
      version: "plan-v1",
      notes: ["Deterministic stub planner", "No repo reads performed here yet"],
    },
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { repoPath?: unknown; goal?: unknown }
      | null;

    const repoPath = typeof body?.repoPath === "string" ? body.repoPath.trim() : "";
    const goal = typeof body?.goal === "string" ? body.goal.trim() : "";

    if (!repoPath) {
      return NextResponse.json({ ok: false, error: "repoPath is required" }, { status: 400 });
    }

    if (!goal) {
      return NextResponse.json({ ok: false, error: "goal is required" }, { status: 400 });
    }

    const plan = makePlan(goal);

    return NextResponse.json({
      ok: true,
      plan,
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: safeErrorMessage(e, "Unknown error") },
      { status: 500 }
    );
  }
}
