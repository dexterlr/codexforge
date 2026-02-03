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

export type Plan = { steps: string[] };

export type Diff = {
  filePath: string;
  patch: string; // placeholder for now (later: unified diff)
};

export type RunState = {
  phase: Phase;
  repoPath: string;
  goal: string;
  plan: Plan | null;
  diffs: Diff[];
  logs: string[];        // newest-first or oldest-first is your choice (we'll keep it newest-first like you have)
  testOutput?: string;   // optional: UI can show this
  error?: string;
};
