import type { OperatorV3Plan, OperatorV3PlannedFile } from "./plan";

export type OperatorV3PlanInput = {
  repoPath: string;
  goal: string;
};

function normalizeGoal(goal: string) {
  return goal.trim();
}

function normalizeRepoPath(repoPath: string) {
  return repoPath.trim();
}

/**
 * Operator v3 "shadow mode" planner
 * - Deterministic
 * - Fast
 * - No filesystem reads
 * - No network
 * - Pure data output
 */
export function makeOperatorV3Plan(input: OperatorV3PlanInput): OperatorV3Plan {
  const goal = normalizeGoal(input.goal);
  const repoPath = normalizeRepoPath(input.repoPath);

  const steps: string[] = [
    "Validate inputs (repoPath, goal) and keep plan generation deterministic",
    "Create a snapshot (read-only) of allowlisted files and metadata",
    "Propose file targets and risks before generating diffs",
    "Generate diffs for allowlisted files only (no writes)",
    "Require explicit human approval before apply",
    "Apply diffs atomically with checkpoint creation",
    "Run tests/commands and capture outputs",
    "Persist audit trail artifacts for plan/diff/apply/test",
  ];

  const files: OperatorV3PlannedFile[] = [];

  const risks: string[] = [
    "Never write outside allowlist",
    "Never touch node_modules/.next/.git and other generated dirs",
    "Plan must remain usable offline (no dependency on AI/network)",
  ];

  return {
    version: "v3",
    goal,
    repoPath,
    steps,
    files,
    risks,
  };
}
