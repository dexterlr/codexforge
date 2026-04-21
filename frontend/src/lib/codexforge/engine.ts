/**
 * CodexForge Execution Engine (v6)
 *
 * Goals:
 * - deterministic state transitions
 * - real repository snapshot retained in engine state
 * - diff generation derived from snapshot instead of hard-coded sample diffs
 * - explicit approval checkpoints
 * - no silent filesystem writes
 * - no AI calls
 * - richer, UI-friendly state without changing the existing route contract
 *
 * Notes:
 * - This remains a preview-only engine.
 * - It is the bridge between the UI harness and a later real operator/apply flow.
 * - Diffs are proposed patches generated from real snapshot files.
 */

import path from "node:path";
import fs from "node:fs/promises";

/* ================= INPUT ================= */

export type CodexGoal = {
  goal: string;
  repoPath: string;
};

/* ================= PLAN ================= */

export type CodexPlanStep = {
  id: string;
  description: string;
};

export type CodexPlan = {
  steps: CodexPlanStep[];
};

/* ================= DIFF ================= */

export type CodexDiff = {
  filePath: string;
  patch: string;
};

/* ================= SNAPSHOT ================= */

export type SnapshotFile = {
  path: string;
  content: string;
};

export type SnapshotState = {
  fileCount: number;
  files: SnapshotFile[];
  sampledPaths: string[];
};

/* ================= PHASE ================= */

export type Phase =
  | "idle"
  | "planning"
  | "awaiting_plan_approval"
  | "diffing"
  | "awaiting_diff_approval"
  | "applying"
  | "testing"
  | "done"
  | "error";

/* ================= SUMMARY ================= */

export type RunSummary = {
  phaseLabel: string;
  planStepCount: number;
  diffCount: number;
  snapshotFileCount: number;
  hasSnapshot: boolean;
  requiresPlanApproval: boolean;
  requiresDiffApproval: boolean;
  canStart: boolean;
  canReset: boolean;
  isTerminal: boolean;
  hasError: boolean;
};

/* ================= STATE ================= */

export type RunState = {
  phase: Phase;
  goal: CodexGoal | null;
  plan: CodexPlan | null;
  diffs: CodexDiff[];
  logs: string[];
  snapshot?: SnapshotState;
  testOutput?: string;
  error?: string;
  summary: RunSummary;
};

/* ================= ACTION ================= */

export type EngineAction =
  | { type: "start"; goal: CodexGoal }
  | { type: "approvePlan" }
  | { type: "rejectPlan" }
  | { type: "approveDiffs" }
  | { type: "rejectDiffs" }
  | { type: "reset" };

/* ================= CONSTANTS ================= */

const IGNORE_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  ".turbo",
  "dist",
  "build",
  "coverage",
  ".operator",
  ".checkpoints",
]);

const IGNORE_FILE_NAMES = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
]);

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".txt",
  ".css",
  ".scss",
  ".html",
  ".yml",
  ".yaml",
  ".env",
  ".gitignore",
]);

const MAX_BYTES = 512 * 1024;
const MAX_SNAPSHOT_FILES = 400;
const MAX_SAMPLE_PATHS = 12;
const MAX_DIFFS = 6;
const PATCH_PREVIEW_LINES = 12;
const MAX_LOGS = 80;

/* ================= HELPERS ================= */

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(16).slice(2)}`;
}

function trimGoal(goal: string) {
  return goal.replace(/\s+/g, " ").trim();
}

function toPosixPath(value: string) {
  return value.replaceAll("\\", "/");
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isTextLikeFile(fileName: string, ext: string) {
  return TEXT_EXTENSIONS.has(ext) || TEXT_EXTENSIONS.has(fileName);
}

function cloneSnapshotFile(file: SnapshotFile): SnapshotFile {
  return {
    path: file.path,
    content: file.content,
  };
}

function clonePlan(plan: CodexPlan | null): CodexPlan | null {
  if (!plan) return null;

  return {
    steps: plan.steps.map((step) => ({ ...step })),
  };
}

function cloneSnapshot(snapshot?: SnapshotState): SnapshotState | undefined {
  if (!snapshot) return undefined;

  return {
    fileCount: snapshot.fileCount,
    files: snapshot.files.map(cloneSnapshotFile),
    sampledPaths: [...snapshot.sampledPaths],
  };
}

function cloneSummary(summary: RunSummary): RunSummary {
  return { ...summary };
}

function getPhaseLabel(phase: Phase): string {
  switch (phase) {
    case "idle":
      return "Idle";
    case "planning":
      return "Planning";
    case "awaiting_plan_approval":
      return "Awaiting plan approval";
    case "diffing":
      return "Diffing";
    case "awaiting_diff_approval":
      return "Awaiting diff approval";
    case "applying":
      return "Applying";
    case "testing":
      return "Testing";
    case "done":
      return "Done";
    case "error":
      return "Error";
    default:
      return phase;
  }
}

function isTerminalPhase(phase: Phase) {
  return phase === "done" || phase === "error";
}

function canStartFromPhase(phase: Phase) {
  return phase === "idle" || phase === "done" || phase === "error";
}

function buildSummary(state: Omit<RunState, "summary">): RunSummary {
  const phase = state.phase;
  const snapshotFileCount = state.snapshot?.fileCount ?? 0;
  const diffCount = state.diffs.length;
  const planStepCount = state.plan?.steps.length ?? 0;

  return {
    phaseLabel: getPhaseLabel(phase),
    planStepCount,
    diffCount,
    snapshotFileCount,
    hasSnapshot: snapshotFileCount > 0,
    requiresPlanApproval: phase === "awaiting_plan_approval",
    requiresDiffApproval: phase === "awaiting_diff_approval",
    canStart: canStartFromPhase(phase),
    canReset: phase !== "idle" || !!state.goal || !!state.plan || diffCount > 0,
    isTerminal: isTerminalPhase(phase),
    hasError: isNonEmptyString(state.error),
  };
}

function attachSummary(state: Omit<RunState, "summary">): RunState {
  return {
    ...state,
    summary: buildSummary(state),
  };
}

function createBaseState(): RunState {
  return attachSummary({
    phase: "idle",
    goal: null,
    plan: null,
    diffs: [],
    logs: [],
    snapshot: undefined,
    testOutput: undefined,
    error: undefined,
  });
}

function cloneState(state: RunState): RunState {
  return {
    phase: state.phase,
    goal: state.goal ? { ...state.goal } : null,
    plan: clonePlan(state.plan),
    diffs: state.diffs.map((diff) => ({ ...diff })),
    logs: [...state.logs],
    snapshot: cloneSnapshot(state.snapshot),
    testOutput: state.testOutput,
    error: state.error,
    summary: cloneSummary(state.summary),
  };
}

function withCleanExecutionFields(state: RunState): RunState {
  return attachSummary({
    ...state,
    diffs: [],
    testOutput: undefined,
    error: undefined,
  });
}

function withLog(state: RunState, now: string, message: string): RunState {
  const nextLogs = [`${now} ${message}`, ...state.logs].slice(0, MAX_LOGS);

  return attachSummary({
    ...state,
    logs: nextLogs,
  });
}

function withPhase(state: RunState, phase: Phase): RunState {
  return attachSummary({
    ...state,
    phase,
  });
}

function getPatchPreviewLines(content: string, maxLines = PATCH_PREVIEW_LINES) {
  return content
    .split(/\r?\n/)
    .slice(0, maxLines)
    .map((line) => `+ ${line}`);
}

function buildPatchHeader(filePath: string) {
  return ["--- /dev/null", `+++ ${filePath}`];
}

function normalizeWhitespacePreview(text: string) {
  return text.replace(/\t/g, "  ").trimEnd();
}

function assertValidGoal(goal: CodexGoal) {
  if (!isNonEmptyString(goal.goal)) {
    throw new Error("Goal text is required.");
  }

  if (!isNonEmptyString(goal.repoPath)) {
    throw new Error("repoPath is required.");
  }
}

function chooseInterestingFiles(
  files: SnapshotFile[],
  goalText: string,
  maxCount = MAX_DIFFS
) {
  const goal = goalText.toLowerCase();

  const scored = files.map((file) => {
    const filePath = file.path.toLowerCase();
    let score = 0;

    if (filePath.includes("readme")) score += 1;
    if (filePath.endsWith(".md")) score += 1;
    if (filePath.endsWith(".ts")) score += 2;
    if (filePath.endsWith(".tsx")) score += 2;
    if (filePath.includes("src/")) score += 2;
    if (filePath.includes("app/")) score += 2;
    if (filePath.includes("api/")) score += 2;
    if (filePath.includes("engine")) score += 2;
    if (filePath.includes("codexforge")) score += 2;

    if (goal.includes("readme") && filePath.includes("readme")) score += 4;
    if (goal.includes("api") && filePath.includes("api")) score += 4;
    if (goal.includes("engine") && filePath.includes("engine")) score += 4;
    if (goal.includes("chat") && filePath.includes("chat")) score += 4;
    if (
      goal.includes("ui") &&
      (filePath.endsWith(".tsx") || filePath.includes("page"))
    ) {
      score += 3;
    }

    return {
      file,
      score,
    };
  });

  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return a.file.path.localeCompare(b.file.path);
  });

  return scored.slice(0, maxCount).map((entry) => entry.file);
}

function buildDiffForFile(file: SnapshotFile, goalText: string): CodexDiff {
  const previewLines = getPatchPreviewLines(file.content);
  const goal = trimGoal(goalText);

  const patchLines = [
    ...buildPatchHeader(file.path),
    "@@ Proposed CodexForge preview patch @@",
    `+ Goal context: ${goal}`,
    "+ File selected from repository snapshot.",
    "+ Review this file before real mutation/apply is enabled.",
    "+ Suggested focus: inspect structure, constraints, and safest minimal edit.",
    ...previewLines.map(normalizeWhitespacePreview),
  ];

  return {
    filePath: file.path,
    patch: patchLines.join("\n"),
  };
}

function buildDiffsFromSnapshot(
  files: SnapshotFile[],
  goalText: string
): CodexDiff[] {
  if (files.length === 0) return [];

  const selectedFiles = chooseInterestingFiles(files, goalText, MAX_DIFFS);
  return selectedFiles.map((file) => buildDiffForFile(file, goalText));
}

/* ================= SNAPSHOT ================= */

async function snapshotRepo(repoPath: string): Promise<SnapshotFile[]> {
  const root = path.resolve(repoPath);
  const out: SnapshotFile[] = [];

  async function walk(dir: string): Promise<void> {
    if (out.length >= MAX_SNAPSHOT_FILES) return;

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (out.length >= MAX_SNAPSHOT_FILES) return;

      const abs = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (IGNORE_DIRS.has(entry.name)) continue;
        await walk(abs);
        continue;
      }

      if (!entry.isFile()) continue;
      if (IGNORE_FILE_NAMES.has(entry.name)) continue;

      const ext = path.extname(entry.name).toLowerCase();
      if (!isTextLikeFile(entry.name, ext)) continue;

      const stat = await fs.stat(abs);
      if (stat.size > MAX_BYTES) continue;

      const content = await fs.readFile(abs, "utf8");
      const rel = toPosixPath(path.relative(root, abs));

      out.push({
        path: rel,
        content,
      });
    }
  }

  await walk(root);
  out.sort((a, b) => a.path.localeCompare(b.path));

  return out;
}

/* ================= PLAN BUILDERS ================= */

function makeDefaultPlan(goal: string, files: SnapshotFile[] = []): CodexPlan {
  const normalizedGoal = trimGoal(goal);
  const fileCount = files.length;

  return {
    steps: [
      {
        id: uid("step"),
        description: `Read repository snapshot${
          fileCount ? ` (${fileCount} files)` : ""
        }`,
      },
      {
        id: uid("step"),
        description: `Understand goal: "${normalizedGoal}"`,
      },
      {
        id: uid("step"),
        description: "Identify the smallest safe implementation surface",
      },
      {
        id: uid("step"),
        description: "Generate candidate diffs from real snapshot files",
      },
      {
        id: uid("step"),
        description: "Wait for human diff approval",
      },
      {
        id: uid("step"),
        description: "Apply approved changes later via dedicated apply flow",
      },
      {
        id: uid("step"),
        description: "Run tests and summarize results",
      },
    ],
  };
}

/* ================= ENGINE ================= */

export class CodexForgeEngine {
  private state: RunState = createBaseState();

  getState(): RunState {
    return cloneState(this.state);
  }

  async runAction(now: string, action: EngineAction): Promise<RunState> {
    switch (action.type) {
      case "reset":
        this.state = this.handleReset(this.state, now);
        break;

      case "start":
        this.state = await this.handleStart(this.state, now, action.goal);
        break;

      case "approvePlan":
        this.state = this.handleApprovePlan(this.state, now);
        break;

      case "rejectPlan":
        this.state = this.handleRejectPlan(this.state, now);
        break;

      case "approveDiffs":
        this.state = this.handleApproveDiffs(this.state, now);
        break;

      case "rejectDiffs":
        this.state = this.handleRejectDiffs(this.state, now);
        break;
    }

    return this.getState();
  }

  private handleReset(state: RunState, now: string): RunState {
    const next = attachSummary({
      ...createBaseState(),
      goal: state.goal ? { ...state.goal } : null,
      logs: state.logs,
    });

    return withLog(next, now, "Reset to idle");
  }

  private async handleStart(
    state: RunState,
    now: string,
    goal: CodexGoal
  ): Promise<RunState> {
    if (!canStartFromPhase(state.phase)) {
      return withLog(state, now, `Start ignored (${state.phase})`);
    }

    try {
      assertValidGoal(goal);
    } catch (error) {
      return this.fail(
        withCleanExecutionFields(state),
        now,
        error instanceof Error ? error.message : "Invalid goal"
      );
    }

    let next = attachSummary({
      ...createBaseState(),
      phase: "planning",
      goal: {
        goal: trimGoal(goal.goal),
        repoPath: goal.repoPath.trim(),
      },
      logs: state.logs,
    });

    next = withLog(next, now, "Loading repository snapshot...");

    try {
      const files = await snapshotRepo(goal.repoPath);

      next = attachSummary({
        ...next,
        snapshot: {
          fileCount: files.length,
          files,
          sampledPaths: files.slice(0, MAX_SAMPLE_PATHS).map((file) => file.path),
        },
      });

      next = withLog(next, now, `Snapshot loaded (${files.length} files)`);

      const plan = makeDefaultPlan(goal.goal, files);

      next = attachSummary({
        ...next,
        phase: "awaiting_plan_approval",
        plan,
        error: undefined,
      });

      next = withLog(next, now, `Plan ready (${plan.steps.length} steps)`);
      return next;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "unknown error";

      return this.fail(next, now, `Snapshot failed (${message})`);
    }
  }

  private handleApprovePlan(state: RunState, now: string): RunState {
    if (state.phase !== "awaiting_plan_approval" || !state.plan) {
      return withLog(state, now, "Approve plan ignored");
    }

    let next = attachSummary({
      ...state,
      phase: "diffing",
      diffs: [],
      testOutput: undefined,
      error: undefined,
    });

    next = withLog(next, now, "Generating diff previews...");

    const snapshotFiles = state.snapshot?.files ?? [];
    const goalText = state.goal?.goal ?? "";
    const diffs = buildDiffsFromSnapshot(snapshotFiles, goalText);

    next = attachSummary({
      ...next,
      phase: "awaiting_diff_approval",
      diffs,
      error: undefined,
    });

    if (snapshotFiles.length === 0) {
      next = withLog(next, now, "No snapshot files available, diff set is empty");
      return next;
    }

    next = withLog(
      next,
      now,
      `Generated ${diffs.length} diff preview${
        diffs.length === 1 ? "" : "s"
      } from snapshot`
    );

    return next;
  }

  private handleRejectPlan(state: RunState, now: string): RunState {
    if (state.phase !== "awaiting_plan_approval") {
      return withLog(state, now, "Reject plan ignored");
    }

    const next = attachSummary({
      ...state,
      phase: "idle",
      plan: null,
      diffs: [],
      testOutput: undefined,
      error: undefined,
      snapshot: undefined,
    });

    return withLog(next, now, "Plan rejected");
  }

  private handleApproveDiffs(state: RunState, now: string): RunState {
    if (state.phase !== "awaiting_diff_approval") {
      return withLog(state, now, "Approve diffs ignored");
    }

    let next = withPhase(
      attachSummary({
        ...state,
        phase: "applying",
        error: undefined,
      }),
      "applying"
    );

    next = withLog(next, now, "Preview apply phase started");

    next = withPhase(next, "testing");
    next = withLog(next, now, "Preview test phase started");

    next = attachSummary({
      ...next,
      phase: "done",
      testOutput:
        state.diffs.length > 0
          ? `Preview completed for ${state.diffs.length} diff${
              state.diffs.length === 1 ? "" : "s"
            }`
          : "No diffs to apply",
      error: undefined,
    });

    next = withLog(next, now, "Execution complete");
    return next;
  }

  private handleRejectDiffs(state: RunState, now: string): RunState {
    if (state.phase !== "awaiting_diff_approval") {
      return withLog(state, now, "Reject diffs ignored");
    }

    const next = attachSummary({
      ...state,
      phase: "awaiting_plan_approval",
      diffs: [],
      testOutput: undefined,
      error: undefined,
    });

    return withLog(next, now, "Diffs rejected");
  }

  private fail(state: RunState, now: string, error: string): RunState {
    const next = attachSummary({
      ...state,
      phase: "error",
      diffs: [],
      testOutput: undefined,
      error,
    });

    return withLog(next, now, `ERROR: ${error}`);
  }
}