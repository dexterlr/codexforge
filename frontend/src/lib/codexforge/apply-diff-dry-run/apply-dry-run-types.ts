import type { GroundedFixRiskLevel } from "../grounded-fix";

export type ApplyDiffDryRunPatchSourceState =
  | "pseudo-diff-only"
  | "real-patch-missing"
  | "real-patch-available-unreviewed"
  | "real-patch-reviewed";

export type ApplyDiffDryRunRealPatchAvailabilityState =
  | "missing"
  | "available-unreviewed"
  | "reviewed";

export type ApplyDiffDryRunApprovalPosture =
  | "missing"
  | "packet-present"
  | "approved"
  | "rejected";

export type ApplyDiffDryRunPolicyPosture =
  | "unchecked"
  | "blocked"
  | "approval-required"
  | "review-ready";

export type ApplyDiffDryRunPlanPosture =
  | "missing"
  | "present"
  | "acknowledged";

export type ApplyDiffDryRunFileVerificationState =
  | "unchecked"
  | "verified-current"
  | "stale-or-unknown";

export type ApplyDiffDryRunStatus =
  | "ready-for-real-patch-review"
  | "pseudo-only"
  | "blocked"
  | "needs-approval"
  | "needs-current-file-verification"
  | "needs-rollback-plan"
  | "needs-verification-plan"
  | "conflict-risk"
  | "invalid";

export type ApplyDryRunResultStatus = ApplyDiffDryRunStatus | "dry-run-complete";

export type ApplyDiffDryRunInputSource = {
  applyGateId: string;
  approvalPacketId: string;
  previewDiffCompositionId: string;
  queueItemId: string;
  goal: string;
  targetFiles: readonly string[];
  primaryFile?: string;
  patchSourceState?: ApplyDiffDryRunPatchSourceState;
  pseudoDiffSummary: readonly string[];
  realPatchAvailabilityState?: ApplyDiffDryRunRealPatchAvailabilityState;
  approvalPosture?: ApplyDiffDryRunApprovalPosture;
  policyPosture?: ApplyDiffDryRunPolicyPosture;
  rollbackPosture?: ApplyDiffDryRunPlanPosture;
  verificationPosture?: ApplyDiffDryRunPlanPosture;
  currentFileVerificationState?: ApplyDiffDryRunFileVerificationState;
  riskLevel: GroundedFixRiskLevel;
  confidence: number;
  approvedTargetFiles?: readonly string[];
  rollbackPlan?: readonly string[];
  verificationPlan?: readonly string[];
  smokeChecks?: readonly string[];
  staleEvidenceWarnings?: readonly string[];
  approvalPacketExplicit?: boolean;
  currentFileVerificationAcknowledged?: boolean;
  rollbackPlanAcknowledged?: boolean;
  verificationPlanAcknowledged?: boolean;
  highRiskExtraReviewAcknowledged?: boolean;
  noMutationAcknowledged?: boolean;
};

export type ApplyDiffDryRunInput = {
  id: string;
  applyGateId: string;
  approvalPacketId: string;
  previewDiffCompositionId: string;
  queueItemId: string;
  goal: string;
  targetFiles: string[];
  primaryFile: string;
  patchSourceState: ApplyDiffDryRunPatchSourceState;
  pseudoDiffSummary: string[];
  realPatchAvailabilityState: ApplyDiffDryRunRealPatchAvailabilityState;
  approvalPosture: ApplyDiffDryRunApprovalPosture;
  policyPosture: ApplyDiffDryRunPolicyPosture;
  rollbackPosture: ApplyDiffDryRunPlanPosture;
  verificationPosture: ApplyDiffDryRunPlanPosture;
  currentFileVerificationState: ApplyDiffDryRunFileVerificationState;
  riskLevel: GroundedFixRiskLevel;
  confidence: number;
  approvedTargetFiles: string[];
  rollbackPlan: string[];
  verificationPlan: string[];
  smokeChecks: string[];
  staleEvidenceWarnings: string[];
  approvalPacketExplicit: boolean;
  currentFileVerificationAcknowledged: boolean;
  rollbackPlanAcknowledged: boolean;
  verificationPlanAcknowledged: boolean;
  highRiskExtraReviewAcknowledged: boolean;
  noMutationAcknowledged: boolean;
  pseudoDiffApplyable: false;
  noMutationGuarantee: string;
};

export type ApplyDiffDryRunValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type ApplyDiffDryRunPolicy = {
  id: string;
  dryRunId: string;
  allowed: boolean;
  validApplyGateInputRequired: true;
  explicitApprovalPacketRequired: true;
  currentFileVerificationAcknowledgementRequired: true;
  rollbackPlanRequired: true;
  verificationPlanRequired: true;
  realPatchRequiredForFutureApply: true;
  pseudoDiffCanOnlySimulateIntent: true;
  actualMutationBlocked: true;
  realApplyDiffCallBlocked: true;
  writeFileBlocked: true;
  runCommandBlocked: true;
  brokerExecutionBlocked: true;
  lowConfidenceBlocksFutureApply: boolean;
  highOrCriticalRiskRequiresExtraReview: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type ApplyDiffFileOperationIntent =
  | "add"
  | "update"
  | "remove"
  | "rename"
  | "refactor"
  | "guard"
  | "test"
  | "docs"
  | "unknown";

export type ApplyDiffDryRunFileOperation = {
  id: string;
  dryRunId: string;
  filePath: string;
  operationIntent: ApplyDiffFileOperationIntent;
  wouldTargetFile: true;
  wouldInspectPatchShape: true;
  wouldCheckApproval: true;
  wouldCheckRollbackPlan: true;
  wouldCheckVerificationPlan: true;
  wouldApplyPatch: false;
  refusedForRealApply: boolean;
  refusalReason: string | null;
  summary: string[];
};

export type ApplyDiffDryRunSimulation = {
  id: string;
  dryRunId: string;
  status: ApplyDiffDryRunStatus;
  wouldTargetFiles: string[];
  wouldInspectPatchShape: true;
  wouldCheckApproval: true;
  wouldCheckRollbackPlan: true;
  wouldCheckVerificationPlan: true;
  wouldRefusePseudoOnlyPatch: boolean;
  wouldRefuseStaleOrUncheckedFiles: boolean;
  wouldCallApplyDiff: false;
  wouldWriteFiles: false;
  operations: ApplyDiffDryRunFileOperation[];
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type ApplyDryRunFileImpactItem = {
  id: string;
  dryRunId: string;
  filePath: string;
  operationIntent: ApplyDiffFileOperationIntent;
  riskLevel: GroundedFixRiskLevel;
  expectedChangeSummary: string;
  verificationRequirement: string;
  rollbackRequirement: string;
  conflictWarning: string | null;
  smokeChecks: string[];
};

export type ApplyDryRunFileImpact = {
  id: string;
  dryRunId: string;
  items: ApplyDryRunFileImpactItem[];
  summary: string[];
};

export type ApplyDryRunConflictKind =
  | "pseudo-diff-only"
  | "missing-real-patch"
  | "missing-current-file-verification"
  | "target-file-outside-approved-packet"
  | "broad-file-impact"
  | "high-risk-file"
  | "stale-evidence"
  | "missing-smoke-coverage"
  | "missing-rollback"
  | "missing-approval";

export type ApplyDryRunConflictSeverity = "warning" | "blocker";

export type ApplyDryRunConflictItem = {
  id: string;
  dryRunId: string;
  kind: ApplyDryRunConflictKind;
  severity: ApplyDryRunConflictSeverity;
  filePath: string | null;
  label: string;
  detail: string;
  blocksFutureApply: boolean;
};

export type ApplyDryRunConflictCheck = {
  id: string;
  dryRunId: string;
  items: ApplyDryRunConflictItem[];
  blockerCount: number;
  warningCount: number;
  summary: string[];
};

export type ApplyDryRunResult = {
  id: string;
  dryRunId: string;
  ok: boolean;
  status: ApplyDryRunResultStatus;
  summary: string[];
  blockedReasons: string[];
  warnings: string[];
  targetFiles: string[];
  simulatedOperations: ApplyDiffDryRunFileOperation[];
  requiredNextSteps: string[];
  futureExecutorBoundary: string;
  simulationOnly: true;
};

export type ApplyDryRunLedgerState =
  | "requested"
  | "input-validated"
  | "policy-checked"
  | "simulation-started"
  | "file-impact-built"
  | "conflict-check-built"
  | "blocked"
  | "dry-run-complete"
  | "ready-for-real-patch-review";

export type ApplyDryRunLedgerItem = {
  id: string;
  dryRunId: string;
  state: ApplyDryRunLedgerState;
  label: string;
  detail: string;
};

export type ApplyDryRunLedger = {
  id: string;
  dryRunId: string;
  items: ApplyDryRunLedgerItem[];
  summary: string[];
};

export type ApplyDiffDryRunSummary = {
  id: string;
  dryRunId: string;
  targetFileCount: number;
  simulatedOperationCount: number;
  blockedState: boolean;
  warningsCount: number;
  conflictCount: number;
  readinessStatus: ApplyDryRunResultStatus;
  nextSafeAction: string;
  summary: string[];
};

export type ApplyDiffDryRunSession = {
  input: ApplyDiffDryRunInput;
  validation: ApplyDiffDryRunValidation;
  policy: ApplyDiffDryRunPolicy;
  simulation: ApplyDiffDryRunSimulation;
  fileImpact: ApplyDryRunFileImpact;
  conflictCheck: ApplyDryRunConflictCheck;
  result: ApplyDryRunResult;
  ledger: ApplyDryRunLedger;
  summary: ApplyDiffDryRunSummary;
  dryRunReport: string;
};

export function buildApplyDiffDryRunStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._/-]+/g, "-")
        .replace(/[/-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function uniqueApplyDiffDryRunStrings(values: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function clampApplyDiffDryRunScore(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.min(1, Math.max(0, numeric));
}
