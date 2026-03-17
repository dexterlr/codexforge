import type { OperatorV3Constraints, OperatorV3Plan, OperatorV3PlannedFile } from "./plan";

export type OperatorV3PlanInput = {
  repoPath: string;
  goal: string;
};

const DEFAULT_SKIP_DIRS = [
  ".git",
  "node_modules",
  ".next",
  "dist",
  "build",
  "out",
  ".turbo",
  ".cache",
  "coverage",
  ".operator",
];

// These are v3 “shadow mode” defaults (safe + deterministic).
const DEFAULT_MAX_FILES = 2000;
const DEFAULT_MAX_DEPTH = 20;

function normalizeGoal(goal: string) {
  return goal.trim();
}

function normalizeRepoPath(repoPath: string) {
  return repoPath.trim();
}

function toPosix(p: string) {
  return p.replaceAll("\\", "/");
}

function uniqPlannedFiles(files: OperatorV3PlannedFile[]) {
  const seen = new Set<string>();
  const out: OperatorV3PlannedFile[] = [];
  for (const f of files) {
    const k = toPosix(f.path.trim());
    if (!k) continue;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ path: k, reason: f.reason });
  }
  return out;
}

function goalHints(goal: string) {
  const g = goal.toLowerCase();

  const has = (s: string) => g.includes(s);

  return {
    raw: g,

    // app areas
    history: has("history"),
    operatorUi: has("operator") || has("operator ui") || has("/operator"),
    entry: has("entry") || has("/entry"),

    // api areas
    planApi: has("plan") || has("/api/operator/plan"),
    diffApi: has("diff") || has("/api/operator/diff"),
    applyApi: has("apply") || has("/api/operator/apply"),
    snapshotApi: has("snapshot") || has("/api/operator/snapshot"),
    runApi: has("run") || has("/api/operator/run"),
    checkpointApi: has("checkpoint") || has("/api/operator/checkpoint") || has("restore"),

    // qualities
    types: has("type") || has("typing") || has("typescript"),
    build: has("build") || has("npm run build"),
    dev: has("dev") || has("npm run dev"),
    test: has("test") || has("tests"),
  };
}

function inferPlannedFiles(goal: string): OperatorV3PlannedFile[] {
  const h = goalHints(goal);
  const files: OperatorV3PlannedFile[] = [];

  // UI targets
  if (h.history) {
    files.push({
      path: "src/app/history/page.tsx",
      reason: "Goal references History UX; likely changes on the History page.",
    });
  }

  if (h.operatorUi) {
    files.push({
      path: "src/app/operator/page.tsx",
      reason: "Goal references Operator UI; likely changes on the Operator page.",
    });
  }

  if (h.entry) {
    files.push({
      path: "src/app/entry/page.tsx",
      reason: "Goal references entry workflow; likely changes on the Entry page.",
    });
  }

  // API targets (Operator endpoints)
  if (h.planApi) {
    files.push({
      path: "src/app/api/operator/plan/route.ts",
      reason: "Goal references planning; likely changes to /api/operator/plan.",
    });
  }

  if (h.diffApi) {
    files.push({
      path: "src/app/api/operator/diff/route.ts",
      reason: "Goal references diffing; likely changes to /api/operator/diff.",
    });
  }

  if (h.applyApi) {
    files.push({
      path: "src/app/api/operator/apply/route.ts",
      reason: "Goal references apply; likely changes to /api/operator/apply.",
    });
  }

  if (h.snapshotApi) {
    files.push({
      path: "src/app/api/operator/snapshot/route.ts",
      reason: "Goal references snapshot; likely changes to /api/operator/snapshot.",
    });
  }

  if (h.runApi) {
    // run routes are nested; include directory “targets” as specific known routes
    files.push({
      path: "src/app/api/operator/run/list/route.ts",
      reason: "Goal references runs; run/list is commonly involved.",
    });
    files.push({
      path: "src/app/api/operator/run/get/route.ts",
      reason: "Goal references runs; run/get is commonly involved.",
    });
    files.push({
      path: "src/app/api/operator/run/start/route.ts",
      reason: "Goal references runs; run/start is commonly involved.",
    });
    files.push({
      path: "src/app/api/operator/run/update/route.ts",
      reason: "Goal references runs; run/update is commonly involved.",
    });
  }

  if (h.checkpointApi) {
    files.push({
      path: "src/app/api/operator/checkpoint/list/route.ts",
      reason: "Goal references checkpoints; checkpoint/list is likely involved.",
    });
    files.push({
      path: "src/app/api/operator/checkpoint/restore/route.ts",
      reason: "Goal references restore/checkpoints; checkpoint/restore is likely involved.",
    });
  }

  // v3 library itself
  if (h.planApi || h.types || h.build) {
    files.push({
      path: "src/lib/operator/v3/plan.ts",
      reason: "Goal references planning/types/build; v3 plan types may need updates.",
    });
    files.push({
      path: "src/lib/operator/v3/generatePlan.ts",
      reason: "Goal references planning/types/build; v3 generator may need updates.",
    });
  }

  return uniqPlannedFiles(files);
}

function buildRisks(goal: string): string[] {
  const h = goalHints(goal);

  const risks: string[] = [
    "Never write outside allowlist",
    "Never touch node_modules/.next/.git and other generated dirs",
    "Plan must remain usable offline (no dependency on AI/network)",
    "All file writes must be atomic and checkpointed",
    "Human approval required before apply",
  ];

  if (h.types || h.build) {
    risks.push("TypeScript build can fail from small type mismatches; keep types strict and explicit");
  }

  if (h.runApi || h.snapshotApi) {
    risks.push("Node/Next build typing can be sensitive around fs.Dirent typing; avoid fragile Node typings");
  }

  return risks;
}

function buildConstraints(): OperatorV3Constraints {
  return {
    allowlistOnly: true,
    skipDirs: DEFAULT_SKIP_DIRS.slice(),
    maxFiles: DEFAULT_MAX_FILES,
    maxDepth: DEFAULT_MAX_DEPTH,
    offlineCapable: true,
    requiresHumanApprovalBeforeApply: true,
  };
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
    "Define constraints (allowlist-only, skip dirs, safety caps, offline requirement)",
    "Create a snapshot (read-only) of allowlisted files and metadata",
    "Propose file targets and risks before generating diffs",
    "Generate diffs for allowlisted files only (no writes)",
    "Require explicit human approval before apply",
    "Apply diffs atomically with checkpoint creation",
    "Run tests/commands and capture outputs",
    "Persist audit trail artifacts for plan/diff/apply/test",
  ];

  const files = inferPlannedFiles(goal);
  const risks = buildRisks(goal);
  const constraints = buildConstraints();

  return {
    version: "v3",
    goal,
    repoPath,
    steps,
    files,
    risks,
    constraints,
  };
}

/**
 * Back-compat name for the API route import.
 * Keep both exports so we never break the app route import again.
 */
export function generatePlanV3Shadow(input: OperatorV3PlanInput): OperatorV3Plan {
  return makeOperatorV3Plan(input);
}
