/**
 * CodexForge Execution Engine (v0 → UI Harness Compatible)
 *
 * Purpose:
 * - This is the headless engine for the Operator UI.
 * - It owns the state machine + transitions.
 * - No AI calls, no filesystem writes yet — structure only.
 *
 * Hard rules:
 * - Explicit steps
 * - Human approval required (plan + diffs)
 * - No silent mutations
 * - UI must stay fast; engine is synchronous for now
 */

/** Inputs */
export type CodexGoal = {
  goal: string;
  repoPath: string;
};

/** Plan */
export type CodexPlanStep = {
  id: string;
  description: string;
};

export type CodexPlan = {
  steps: CodexPlanStep[];
};

/** Diff */
export type CodexDiff = {
  filePath: string;
  patch: string; // (placeholder) later: unified diff text
};

/** Result */
export type CodexResult = {
  success: boolean;
  message: string;
  testOutput?: string;
};

/** Operator phases (matches the Operator UI page) */
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

/**
 * State machine (single canonical state type)
 *
 * NOTE:
 * - We keep logs INSIDE the engine so the UI can just render them.
 * - We do NOT create timestamps in the engine (avoid hydration issues).
 *   UI should pass a ready-made timestamp label string into log() calls.
 */
export type RunState = {
  phase: Phase;
  goal: CodexGoal | null;
  plan: CodexPlan | null;
  diffs: CodexDiff[];
  logs: string[]; // newest-first (like your UI harness)
  testOutput?: string;
  error?: string;
};

/** Helpers (pure, deterministic) */
function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(16).slice(2)}`;
}

export function makeDefaultPlan(goal: string): CodexPlan {
  return {
    steps: [
      { id: uid("step"), description: "Read repository at repoPath" },
      { id: uid("step"), description: `Understand goal: "${goal}"` },
      { id: uid("step"), description: "Propose minimal plan (small, explicit steps)" },
      { id: uid("step"), description: "Generate diffs (no file writes yet)" },
      { id: uid("step"), description: "Wait for human approval" },
      { id: uid("step"), description: "Apply diffs to disk" },
      { id: uid("step"), description: "Run tests" },
      { id: uid("step"), description: "Summarize result + save audit trail" },
    ],
  };
}

export function makeSampleDiffs(): CodexDiff[] {
  return [
    {
      filePath: "README.md",
      patch: "+++ README.md\n+ Added note: This is a test diff. (Later: real unified diff output.)",
    },
    {
      filePath: "src/lib/codexforge/engine.ts",
      patch: "+++ src/lib/codexforge/engine.ts\n+ Placeholder engine file. (Later: real engine implementation.)",
    },
  ];
}

/**
 * Engine class
 * - Encapsulates state
 * - Provides explicit transition methods
 */
export class CodexForgeEngine {
  private state: RunState = {
    phase: "idle",
    goal: null,
    plan: null,
    diffs: [],
    logs: [],
    testOutput: undefined,
    error: undefined,
  };

  getState(): RunState {
    return this.state;
  }

  /** UI provides already-formatted log prefix, e.g. "[16:13:28]" */
  private log(nowLabel: string, msg: string) {
    this.state = {
      ...this.state,
      logs: [`${nowLabel} ${msg}`, ...this.state.logs],
    };
  }

  /** Reset back to idle */
  reset(nowLabel: string) {
    this.state = {
      phase: "idle",
      goal: this.state.goal, // keep last goal around (handy)
      plan: null,
      diffs: [],
      logs: this.state.logs,
      testOutput: undefined,
      error: undefined,
    };
    this.log(nowLabel, "Reset to idle.");
  }

  /** Start a run (enters planning, immediately produces plan in v0) */
  start(nowLabel: string, goal: CodexGoal) {
    if (this.state.phase !== "idle") {
      this.log(nowLabel, "Start ignored (not idle).");
      return;
    }

    this.state = {
      ...this.state,
      phase: "planning",
      goal,
      plan: null,
      diffs: [],
      testOutput: undefined,
      error: undefined,
    };

    this.log(nowLabel, "Starting planning phase…");

    // v0: produce a plan instantly (later: AI call)
    const plan = makeDefaultPlan(goal.goal);
    this.state = { ...this.state, phase: "awaiting_plan_approval", plan };
    this.log(nowLabel, "Plan ready. Awaiting approval.");
  }

  /** Human rejects plan -> back to idle */
  rejectPlan(nowLabel: string) {
    if (this.state.phase !== "awaiting_plan_approval") {
      this.log(nowLabel, "Reject plan ignored (wrong phase).");
      return;
    }

    this.state = {
      ...this.state,
      phase: "idle",
      plan: null,
      diffs: [],
      testOutput: undefined,
      error: undefined,
    };
    this.log(nowLabel, "Plan rejected. Back to idle.");
  }

  /** Human approves plan -> generate diffs (v0: instantly) */
  approvePlan(nowLabel: string) {
    if (this.state.phase !== "awaiting_plan_approval") {
      this.log(nowLabel, "Approve plan ignored (wrong phase).");
      return;
    }
    if (!this.state.plan) {
      this.fail(nowLabel, "No plan present to approve.");
      return;
    }

    this.state = { ...this.state, phase: "diffing" };
    this.log(nowLabel, "Plan approved. Generating diffs…");

    // v0: generate diffs instantly (later: AI diff generator)
    const diffs = makeSampleDiffs();

    this.state = { ...this.state, phase: "awaiting_diff_approval", diffs };
    this.log(nowLabel, `Diffs ready (${diffs.length}). Awaiting approval.`);
  }

  /** Human rejects diffs -> go back to plan approval */
  rejectDiffs(nowLabel: string) {
    if (this.state.phase !== "awaiting_diff_approval") {
      this.log(nowLabel, "Reject diffs ignored (wrong phase).");
      return;
    }

    this.state = {
      ...this.state,
      phase: "awaiting_plan_approval",
      diffs: [],
      testOutput: undefined,
      error: undefined,
    };
    this.log(nowLabel, "Diffs rejected. Back to plan approval.");
  }

  /** Human approves diffs -> apply + test (still stubbed) */
  approveDiffs(nowLabel: string) {
    if (this.state.phase !== "awaiting_diff_approval") {
      this.log(nowLabel, "Approve diffs ignored (wrong phase).");
      return;
    }
    if (this.state.diffs.length === 0) {
      this.fail(nowLabel, "No diffs present to approve.");
      return;
    }

    this.state = { ...this.state, phase: "applying" };
    this.log(nowLabel, "Diffs approved. Applying changes… (stub)");

    // v0: no filesystem write yet
    this.state = { ...this.state, phase: "testing" };
    this.log(nowLabel, "Pretending to run tests… (stub)");

    this.state = {
      ...this.state,
      phase: "done",
      testOutput: "All tests passed (stub).",
    };
    this.log(nowLabel, "Run complete (local stub).");
  }

  /** Hard stop on error */
  fail(nowLabel: string, error: string) {
    this.state = { ...this.state, phase: "error", error };
    this.log(nowLabel, `ERROR: ${error}`);
  }
}

// --- Repo snapshot (read-only, safe) ---------------------------------

export type SnapshotFile = {
  path: string;     // repo-relative path using forward slashes
  content: string;  // UTF-8 text
};

const SNAPSHOT_IGNORE_DIRS = new Set(["node_modules", ".next", ".git"]);
const SNAPSHOT_MAX_BYTES = 512 * 1024; // 512 KB per file (safety)

const SNAPSHOT_TEXT_EXTS = new Set([
  ".ts", ".tsx", ".js", ".jsx",
  ".json", ".md", ".txt", ".css",
  ".html", ".yml", ".yaml",
  ".env", ".gitignore",
]);

function toPosixPath(p: string) {
  return p.replaceAll("\\", "/");
}

/**
 * Read the repo into memory safely (no writes).
 * - Skips heavy/unsafe dirs: node_modules, .next, .git
 * - Only reads text-like files by extension
 * - Limits file size per file
 */
export async function snapshotRepo(repoPath: string): Promise<SnapshotFile[]> {
  // Dynamic imports so this file can still be imported in browser contexts safely.
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  const root = path.resolve(repoPath);
  const out: SnapshotFile[] = [];

  async function walk(absDir: string) {
    const entries = await fs.readdir(absDir, { withFileTypes: true });

    for (const ent of entries) {
      const abs = path.join(absDir, ent.name);

      if (ent.isDirectory()) {
        if (SNAPSHOT_IGNORE_DIRS.has(ent.name)) continue;
        await walk(abs);
        continue;
      }

      if (!ent.isFile()) continue;

      const ext = path.extname(ent.name);
      const isAllowed =
        SNAPSHOT_TEXT_EXTS.has(ext) ||
        SNAPSHOT_TEXT_EXTS.has(ent.name); // for ".env", ".gitignore"

      if (!isAllowed) continue;

      const stat = await fs.stat(abs);
      if (stat.size > SNAPSHOT_MAX_BYTES) continue;

      const content = await fs.readFile(abs, "utf8");

      const rel = path.relative(root, abs);
      out.push({ path: toPosixPath(rel), content });
    }
  }

  await walk(root);

  // Stable ordering makes diffs/replays deterministic
  out.sort((a, b) => a.path.localeCompare(b.path));

  return out;
}

