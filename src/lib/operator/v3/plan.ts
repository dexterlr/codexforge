// Operator v3 plan types
// Pure data structures — no logic here

export type OperatorV3Plan = {
  version: "v3";

  goal: string;
  repoPath: string;

  // High-level intent steps (human readable)
  steps: string[];

  // Planned file touches (deterministic in shadow mode)
  files?: OperatorV3PlannedFile[];

  // Known risks / warnings (human readable)
  risks?: string[];

  // Hard constraints the operator must respect
  constraints?: OperatorV3Constraints;
};

export type OperatorV3PlannedFile = {
  path: string; // repo-relative, POSIX
  reason: string; // why this file is touched
};

export type OperatorV3Constraints = {
  // Always true for our operator: no out-of-band writes.
  allowlistOnly: boolean;

  // Directories we must never touch (even read as targets)
  skipDirs: string[];

  // Guardrails for scale / safety
  maxFiles: number;
  maxDepth: number;

  // UX / product constraints
  offlineCapable: boolean;
  requiresHumanApprovalBeforeApply: boolean;
};
