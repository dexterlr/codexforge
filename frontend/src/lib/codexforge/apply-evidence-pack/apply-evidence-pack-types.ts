export type ApplyEvidencePackState =
  | "draft"
  | "incomplete"
  | "blocked"
  | "ready-for-human-review"
  | "approved-for-future-guarded-apply"
  | "rejected";

export type ApplyEvidenceRiskLevel = "low" | "medium" | "high" | "critical";

export type ApplyEvidenceCurrentFileState =
  | "review-missing"
  | "review-state-current"
  | "stale-or-unknown";

export type ApplyEvidenceApprovalState =
  | "not-reviewed"
  | "reviewed"
  | "approved"
  | "rejected";

export type ApplyEvidenceCheckStatus =
  | "not-run"
  | "pending-human-run"
  | "passed-externally"
  | "failed-externally";

export type ApplyEvidenceRef = {
  id: string;
  label: string;
  summary: string;
};

export type ApplyEvidenceInputSource = {
  previewDiffPackageId: string;
  applyGateId: string;
  queueItemId: string;
  goal: string;
  targetFiles: readonly string[];
  primaryFile?: string;
  previewDiffSummary: readonly string[];
  evidenceRefs?: readonly ApplyEvidenceRef[];
  riskLevel?: ApplyEvidenceRiskLevel;
  currentFileVerificationState?: ApplyEvidenceCurrentFileState;
  currentFileReviewNote?: string;
  rollbackPlan?: readonly string[];
  testPlan?: readonly string[];
  smokeChecks?: readonly string[];
  operatorApprovalNote?: string;
  approvalState?: ApplyEvidenceApprovalState;
  mutationFirewallAcknowledged?: boolean;
  futureGuardedApplyAcknowledged?: boolean;
  noMutationAcknowledged?: boolean;
  highRiskAcknowledged?: boolean;
};

export type ApplyEvidenceInput = {
  id: string;
  previewDiffPackageId: string;
  applyGateId: string;
  queueItemId: string;
  goal: string;
  targetFiles: string[];
  primaryFile: string;
  previewDiffSummary: string[];
  evidenceRefs: ApplyEvidenceRef[];
  riskLevel: ApplyEvidenceRiskLevel;
  currentFileVerificationState: ApplyEvidenceCurrentFileState;
  currentFileReviewNote: string;
  rollbackPlan: string[];
  testPlan: string[];
  smokeChecks: string[];
  operatorApprovalNote: string;
  approvalState: ApplyEvidenceApprovalState;
  mutationFirewallAcknowledged: boolean;
  futureGuardedApplyAcknowledged: boolean;
  noMutationAcknowledged: boolean;
  highRiskAcknowledged: boolean;
  previewOnly: true;
};

export type ApplyEvidenceCurrentFileVerification = {
  id: string;
  inputId: string;
  state: ApplyEvidenceCurrentFileState;
  required: true;
  representedAsReviewMetadata: true;
  targetFiles: string[];
  reviewNote: string;
  missingItems: string[];
  summary: string[];
};

export type ApplyEvidenceRisk = {
  id: string;
  inputId: string;
  level: ApplyEvidenceRiskLevel;
  score: number;
  targetFileCount: number;
  highRiskAcknowledged: boolean;
  blockers: string[];
  warnings: string[];
  summary: string[];
};

export type ApplyEvidenceSmokeCheck = {
  id: string;
  label: string;
  status: ApplyEvidenceCheckStatus;
  runHere: false;
};

export type ApplyEvidenceTestPlan = {
  id: string;
  inputId: string;
  required: true;
  checks: ApplyEvidenceSmokeCheck[];
  smokeResultPlaceholders: ApplyEvidenceSmokeCheck[];
  missingItems: string[];
  summary: string[];
};

export type ApplyEvidenceRollbackPlan = {
  id: string;
  inputId: string;
  required: true;
  notes: string[];
  missingItems: string[];
  summary: string[];
};

export type ApplyEvidenceApproval = {
  id: string;
  inputId: string;
  approvalState: ApplyEvidenceApprovalState;
  operatorApprovalNote: string;
  operatorApprovalNoteRequired: true;
  approvalPacketId: string;
  approvedForFutureGuardedApply: boolean;
  futureGuardedApplyOnly: true;
  missingItems: string[];
  summary: string[];
};

export type ApplyEvidenceFirewall = {
  id: "apply-evidence-mutation-firewall";
  inputId: string;
  active: true;
  actualApplyBlocked: true;
  sourceMutationBlocked: true;
  shellExecutionBlocked: true;
  brokerExecutionBlocked: true;
  externalNetworkBlocked: true;
  aiCallsBlocked: true;
  blockedTools: string[];
  allowedActions: string[];
  summary: string[];
};

export type ApplyEvidenceSummary = {
  id: string;
  inputId: string;
  state: ApplyEvidencePackState;
  targetFileCount: number;
  evidenceRefCount: number;
  checkCount: number;
  blockerCount: number;
  missingItemCount: number;
  finalReadinessDecision: ApplyEvidencePackState;
  nextSafeAction: string;
  summary: string[];
};

export type ApplyEvidenceValidation = {
  valid: boolean;
  state: ApplyEvidencePackState;
  blockedReasons: string[];
  missingItems: string[];
  warnings: string[];
  summary: string[];
};

export type ApplyEvidencePack = {
  id: string;
  state: ApplyEvidencePackState;
  input: ApplyEvidenceInput;
  currentFileVerification: ApplyEvidenceCurrentFileVerification;
  risk: ApplyEvidenceRisk;
  testPlan: ApplyEvidenceTestPlan;
  rollbackPlan: ApplyEvidenceRollbackPlan;
  approval: ApplyEvidenceApproval;
  firewall: ApplyEvidenceFirewall;
  summary: ApplyEvidenceSummary;
  evidenceReport: string;
  previewReviewArtifact: true;
};

export function buildApplyEvidencePackStableKey(
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

export function uniqueApplyEvidenceStrings(values: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function clampApplyEvidenceScore(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.min(100, Math.max(0, Math.round(numeric)));
}
