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
] as const;

const DEFAULT_MAX_FILES = 2000;
const DEFAULT_MAX_DEPTH = 20;
const MAX_PLANNED_FILES = 8;

type GoalIntent = {
  raw: string;
  normalized: string;
  tokens: string[];

  appendMode: boolean;
  prependMode: boolean;

  wantsHistory: boolean;
  wantsEntry: boolean;
  wantsOperatorUi: boolean;
  wantsClawdUi: boolean;

  wantsPlanApi: boolean;
  wantsDiffApi: boolean;
  wantsApplyApi: boolean;
  wantsSnapshotApi: boolean;
  wantsTestApi: boolean;
  wantsRunApi: boolean;
  wantsCheckpointApi: boolean;

  wantsV3: boolean;
  wantsTypes: boolean;
  wantsBuild: boolean;
  wantsDev: boolean;
  wantsPackageJson: boolean;
  wantsTests: boolean;
  wantsScripts: boolean;
  wantsUi: boolean;
  wantsApi: boolean;
};

type CandidateTarget = {
  path: string;
  baseReason: string;
  score: number;
  reasons: string[];
};

function normalizeGoal(goal: string) {
  return goal.trim().replace(/\s+/g, " ");
}

function normalizeRepoPath(repoPath: string) {
  return repoPath.trim();
}

function toPosix(p: string) {
  return p.replaceAll("\\", "/").trim();
}

function tokenize(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9/._-]+/g)
    .map((x) => x.trim())
    .filter(Boolean);
}

function uniqStrings(values: string[]) {
  return Array.from(new Set(values));
}

function includesAny(haystack: string, needles: string[]) {
  return needles.some((needle) => haystack.includes(needle));
}

function pushReason(candidate: CandidateTarget, score: number, reason: string) {
  candidate.score += score;
  candidate.reasons.push(reason);
}

function createCandidate(path: string, baseReason: string): CandidateTarget {
  return {
    path: toPosix(path),
    baseReason: baseReason.trim(),
    score: 0,
    reasons: [],
  };
}

function parseGoalIntent(goal: string): GoalIntent {
  const normalized = normalizeGoal(goal);
  const raw = normalized.toLowerCase();
  const tokens = uniqStrings(tokenize(raw));

  const has = (...phrases: string[]) => includesAny(raw, phrases);

  return {
    raw,
    normalized,
    tokens,

    appendMode: raw.startsWith("append:"),
    prependMode: raw.startsWith("prepend:"),

    wantsHistory: has("history", "history page", "/history"),
    wantsEntry: has("entry", "entry page", "/entry"),
    wantsOperatorUi: has("operator ui", "operator page", "/operator", "operator screen"),
    wantsClawdUi: has("clawd", "clawd ui", "clawd page", "/clawd"),

    wantsPlanApi: has("plan api", "/api/operator/plan", "planner", "planning", "plan route"),
    wantsDiffApi: has("diff api", "/api/operator/diff", "diff route", "diffing"),
    wantsApplyApi: has("apply api", "/api/operator/apply", "apply route"),
    wantsSnapshotApi: has("snapshot api", "/api/operator/snapshot", "snapshot route"),
    wantsTestApi: has("test api", "/api/operator/test", "test route", "test runner"),
    wantsRunApi: has("/api/operator/run", "run route", "run log", "run logs", "runs"),
    wantsCheckpointApi: has(
      "/api/operator/checkpoint",
      "checkpoint route",
      "checkpoints",
      "checkpoint",
      "restore"
    ),

    wantsV3: has("v3", "shadow mode", "shadow plan", "planner v3"),
    wantsTypes: has("type", "types", "typing", "typescript"),
    wantsBuild: has("build", "npm run build"),
    wantsDev: has("dev", "npm run dev"),
    wantsPackageJson: has("package.json"),
    wantsTests: has("test", "tests"),
    wantsScripts: has("script", "scripts"),
    wantsUi: has("ui", "page", "screen", "button", "form", "layout"),
    wantsApi: has("api", "route", "endpoint"),
  };
}

function buildCandidates(): CandidateTarget[] {
  return [
    createCandidate(
      "src/app/history/page.tsx",
      "History page target for history-related UI work and safe demo append/prepend flows."
    ),
    createCandidate(
      "src/app/entry/page.tsx",
      "Entry page target for entry workflow and form-related changes."
    ),
    createCandidate(
      "src/app/clawd/page.tsx",
      "Clawd page target for the current operator UI surface."
    ),
    createCandidate(
      "src/app/api/operator/plan/route.ts",
      "Planning route target for operator planning behavior."
    ),
    createCandidate(
      "src/app/api/operator/diff/route.ts",
      "Diff route target for operator diff generation behavior."
    ),
    createCandidate(
      "src/app/api/operator/apply/route.ts",
      "Apply route target for operator apply behavior."
    ),
    createCandidate(
      "src/app/api/operator/snapshot/route.ts",
      "Snapshot route target for snapshot behavior."
    ),
    createCandidate(
      "src/app/api/operator/test/route.ts",
      "Test route target for operator test execution behavior."
    ),
    createCandidate(
      "src/app/api/operator/run/list/route.ts",
      "Run list route target for run listing behavior."
    ),
    createCandidate(
      "src/app/api/operator/run/get/route.ts",
      "Run get route target for reading run state."
    ),
    createCandidate(
      "src/app/api/operator/run/start/route.ts",
      "Run start route target for starting operator runs."
    ),
    createCandidate(
      "src/app/api/operator/run/update/route.ts",
      "Run update route target for updating run state."
    ),
    createCandidate(
      "src/app/api/operator/checkpoint/list/route.ts",
      "Checkpoint list route target for checkpoint discovery."
    ),
    createCandidate(
      "src/app/api/operator/checkpoint/restore/route.ts",
      "Checkpoint restore route target for restore behavior."
    ),
    createCandidate(
      "src/lib/operator/v3/plan.ts",
      "v3 plan types target for planner structure and typing."
    ),
    createCandidate(
      "src/lib/operator/v3/generatePlan.ts",
      "v3 generator target for shadow planning logic."
    ),
    createCandidate(
      "package.json",
      "Package manifest target for scripts, test commands, build commands, and tooling behavior."
    ),
  ];
}

function scoreCandidates(intent: GoalIntent): CandidateTarget[] {
  const candidates = buildCandidates();

  const byPath = new Map<string, CandidateTarget>();
  for (const candidate of candidates) {
    byPath.set(candidate.path, candidate);
  }

  const hit = (path: string, score: number, reason: string) => {
    const candidate = byPath.get(path);
    if (!candidate) return;
    pushReason(candidate, score, reason);
  };

  const hasSpecificUiTarget =
    intent.wantsHistory || intent.wantsEntry || intent.wantsOperatorUi || intent.wantsClawdUi;

  const hasSpecificApiTarget =
    intent.wantsPlanApi ||
    intent.wantsDiffApi ||
    intent.wantsApplyApi ||
    intent.wantsSnapshotApi ||
    intent.wantsTestApi ||
    intent.wantsRunApi ||
    intent.wantsCheckpointApi;

  if (intent.appendMode || intent.prependMode) {
    hit(
      "src/app/history/page.tsx",
      10_000,
      "Append/prepend command mode is deliberately pinned to the safest current allowlisted target."
    );
    return candidates;
  }

  if (intent.wantsHistory) {
    hit("src/app/history/page.tsx", 500, "Goal explicitly references history.");
  }

  if (intent.wantsEntry) {
    hit("src/app/entry/page.tsx", 500, "Goal explicitly references entry.");
  }

  if (intent.wantsOperatorUi || intent.wantsClawdUi) {
    hit("src/app/clawd/page.tsx", 520, "Goal explicitly references the current operator/clawd UI.");
  }

  if (intent.wantsPlanApi) {
    hit("src/app/api/operator/plan/route.ts", 550, "Goal explicitly references operator planning.");
    hit("src/lib/operator/v3/generatePlan.ts", 180, "Planner logic often pairs with v3 generation.");
    hit("src/lib/operator/v3/plan.ts", 110, "Planner work may require plan typing updates.");
  }

  if (intent.wantsDiffApi) {
    hit("src/app/api/operator/diff/route.ts", 550, "Goal explicitly references diff generation.");
  }

  if (intent.wantsApplyApi) {
    hit("src/app/api/operator/apply/route.ts", 550, "Goal explicitly references apply behavior.");
  }

  if (intent.wantsSnapshotApi) {
    hit("src/app/api/operator/snapshot/route.ts", 550, "Goal explicitly references snapshot behavior.");
  }

  if (intent.wantsTestApi) {
    hit("src/app/api/operator/test/route.ts", 560, "Goal explicitly references test route behavior.");
    hit("package.json", 220, "Test behavior may depend on package scripts.");
  }

  if (intent.wantsRunApi) {
    hit("src/app/api/operator/run/list/route.ts", 220, "Goal explicitly references run listing/logging.");
    hit("src/app/api/operator/run/get/route.ts", 200, "Goal explicitly references reading run state.");
    hit("src/app/api/operator/run/start/route.ts", 220, "Goal explicitly references starting runs.");
    hit("src/app/api/operator/run/update/route.ts", 210, "Goal explicitly references updating runs.");
  }

  if (intent.wantsCheckpointApi) {
    hit("src/app/api/operator/checkpoint/list/route.ts", 220, "Goal explicitly references checkpoint listing.");
    hit("src/app/api/operator/checkpoint/restore/route.ts", 240, "Goal explicitly references restore/checkpoint behavior.");
  }

  if (intent.wantsV3) {
    hit("src/lib/operator/v3/generatePlan.ts", 300, "Goal explicitly references v3/shadow planning.");
    hit("src/lib/operator/v3/plan.ts", 220, "v3 work commonly touches plan types.");
    hit("src/app/api/operator/plan/route.ts", 120, "v3 planner changes often surface through the plan route.");
  }

  if (intent.wantsTypes) {
    hit("src/lib/operator/v3/plan.ts", 180, "Goal references types/typing.");
    hit("src/lib/operator/v3/generatePlan.ts", 80, "Typing improvements often pair with generator updates.");
  }

  if (intent.wantsBuild) {
    hit("package.json", 260, "Build goals frequently involve scripts/tooling.");
    hit("src/lib/operator/v3/plan.ts", 70, "Build issues can come from type structure.");
    hit("src/lib/operator/v3/generatePlan.ts", 70, "Build issues can come from generator typing.");
  }

  if (intent.wantsDev) {
    hit("package.json", 220, "Dev workflow goals frequently involve scripts/tooling.");
  }

  if (intent.wantsPackageJson || intent.wantsScripts) {
    hit("package.json", 360, "Goal explicitly references package.json/scripts.");
  }

  if (intent.wantsTests && !intent.wantsTestApi) {
    hit("package.json", 180, "Tests may require script definitions.");
    hit("src/app/api/operator/test/route.ts", 140, "Tests may involve the operator test route.");
  }

  if (intent.wantsUi && !hasSpecificUiTarget) {
    hit("src/app/history/page.tsx", 40, "Generic UI wording slightly favors page targets.");
    hit("src/app/entry/page.tsx", 30, "Generic UI wording slightly favors page targets.");
    hit("src/app/clawd/page.tsx", 35, "Generic UI wording slightly favors page targets.");
  }

  if (intent.wantsApi && !hasSpecificApiTarget) {
    hit("src/app/api/operator/plan/route.ts", 20, "Generic API wording slightly favors route targets.");
    hit("src/app/api/operator/diff/route.ts", 20, "Generic API wording slightly favors route targets.");
    hit("src/app/api/operator/apply/route.ts", 20, "Generic API wording slightly favors route targets.");
    hit("src/app/api/operator/snapshot/route.ts", 20, "Generic API wording slightly favors route targets.");
    hit("src/app/api/operator/test/route.ts", 20, "Generic API wording slightly favors route targets.");
  }

  return candidates;
}

function toPlannedFiles(intent: GoalIntent): OperatorV3PlannedFile[] {
  const scored = scoreCandidates(intent)
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.path.localeCompare(b.path);
    });

  if (scored.length === 0) {
    if (intent.wantsBuild || intent.wantsDev || intent.wantsTests || intent.wantsPackageJson || intent.wantsScripts) {
      return [
        {
          path: "package.json",
          reason: "Fallback target for script/build/dev/test goals when no stronger target is detected.",
        },
      ];
    }

    return [
      {
        path: "src/app/history/page.tsx",
        reason: "Fallback target for vague UI/demo goals; history page remains the safest default target.",
      },
    ];
  }

  return scored.slice(0, MAX_PLANNED_FILES).map((candidate) => {
    const topReasons = candidate.reasons.slice(0, 3).join(" ");
    const reason = `${candidate.baseReason}${topReasons ? ` ${topReasons}` : ""}`.trim();
    return {
      path: candidate.path,
      reason,
    };
  });
}

function buildRisks(intent: GoalIntent): string[] {
  const risks: string[] = [
    "Never write outside allowlist",
    "Never touch node_modules/.next/.git and other generated dirs",
    "Plan must remain usable offline (no dependency on AI/network)",
    "All file writes must be atomic and checkpointed",
    "Human approval required before apply",
  ];

  if (intent.wantsTypes || intent.wantsBuild || intent.wantsV3) {
    risks.push("TypeScript changes can fail from small structural mismatches; keep types explicit and stable.");
  }

  if (intent.wantsRunApi || intent.wantsSnapshotApi || intent.wantsTestApi || intent.wantsApi) {
    risks.push("Route changes can fail from path handling or process execution details; keep server-side behavior conservative.");
  }

  if (intent.wantsPackageJson || intent.wantsScripts || intent.wantsBuild || intent.wantsDev || intent.wantsTests) {
    risks.push("Script changes can break local workflows; prefer additive script updates over destructive changes.");
  }

  if (intent.wantsUi) {
    risks.push("UI goals should not degrade local-first behavior or make AI a hard dependency.");
  }

  return uniqStrings(risks);
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
 * Operator v3 shadow-mode planner
 * - deterministic
 * - fast
 * - no filesystem reads
 * - no network
 * - pure data output
 */
export function makeOperatorV3Plan(input: OperatorV3PlanInput): OperatorV3Plan {
  const goal = normalizeGoal(input.goal);
  const repoPath = normalizeRepoPath(input.repoPath);
  const intent = parseGoalIntent(goal);

  const steps: string[] = [
    "Validate inputs (repoPath, goal) and keep plan generation deterministic",
    "Parse goal into structured intent signals",
    "Apply safety constraints (allowlist-only, skip dirs, safety caps, offline requirement)",
    "Score candidate files by intent instead of relying on a single keyword match",
    "Prioritize explicit target matches over generic UI/API language",
    "Select the highest-confidence planned files before diff generation",
    "Generate diffs for allowlisted files only (no writes)",
    "Require explicit human approval before apply",
    "Apply diffs atomically with checkpoint creation",
    "Run tests/commands and capture outputs",
    "Persist audit trail artifacts for plan/diff/apply/test",
  ];

  const files = toPlannedFiles(intent);
  const risks = buildRisks(intent);
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
 * Back-compat export name for existing imports.
 */
export function generatePlanV3Shadow(input: OperatorV3PlanInput): OperatorV3Plan {
  return makeOperatorV3Plan(input);
}