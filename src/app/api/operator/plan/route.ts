import { NextResponse } from "next/server";

type Plan = {
  steps: string[];
};

function makePlan(goal: string): Plan {
  // Stub planner: deterministic, fast, safe.
  // Later: replace with real planner (LLM or rules) reading repo snapshot.
  return {
    steps: [
      "Read repository at repoPath",
      `Understand goal: "${goal}"`,
      "Propose minimal plan (small, explicit steps)",
      "Generate diffs (no file writes yet)",
      "Wait for human approval",
      "Apply diffs to disk",
      "Run tests",
      "Summarize result + save audit trail",
    ],
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { repoPath?: string; goal?: string }
      | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    const goal = String(body?.goal ?? "").trim();

    if (!repoPath) {
      return NextResponse.json(
        { ok: false, error: "repoPath is required" },
        { status: 400 }
      );
    }

    if (!goal) {
      return NextResponse.json(
        { ok: false, error: "goal is required" },
        { status: 400 }
      );
    }

    const plan = makePlan(goal);

    return NextResponse.json({
      ok: true,
      plan,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
