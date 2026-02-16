// Operator v3 plan types
// Pure data structures — no logic here

export type OperatorV3Plan = {
  version: "v3";

  goal: string;
  repoPath: string;

  // High-level intent steps (human readable)
  steps: string[];

  // Future-proof fields (unused for now)
  files?: OperatorV3PlannedFile[];
  risks?: string[];
};

export type OperatorV3PlannedFile = {
  path: string; // repo-relative, POSIX
  reason: string; // why this file is touched
};
