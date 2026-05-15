import type { GroundedFixRiskLevel } from "../grounded-fix";

export type ApplyRealPatchState = "absent" | "available-unreviewed" | "reviewed";
export type ApplyApprovalPosture = "missing" | "review-required" | "approved-for-request-preview";
export type ApplyFileVerificationState = "unchecked" | "verified-current" | "stale-or-unknown";
export type ApplyHumanReviewState = "not-reviewed" | "reviewed" | "approved" | "rejected";
export type ApplyOperatorDecision = "pending" | "approve-request-preview" | "reject" | "needs-changes";
export type ApplyPreviewState = "blocked" | "request-preview-ready";
export type ApplyToolPosture = "approval-required" | "confirmed" | "blocked";

export type ApplyGateInputSource = {
  previewDiffCompositionId: string;
  queueItemId: string;
  sourceGroundedFixId: string;
  goal: string;
  targetFiles: readonly string[];
  primaryFile: string;
  pseudoDiffSummary: readonly string[];
  realPatchState?: ApplyRealPatchState;
  riskLevel: GroundedFixRiskLevel;
  confidence: number;
  verificationChecks?: readonly string[];
  rollbackNotes?: readonly string[];
  approvalPosture?: ApplyApprovalPosture;
  currentFileVerificationState?: ApplyFileVerificationState;
  humanReviewState?: ApplyHumanReviewState;
};

export type ApplyGateInput = {
  id: string;
  previewDiffCompositionId: string;
  queueItemId: string;
  sourceGroundedFixId: string;
  goal: string;
  targetFiles: string[];
  primaryFile: string;
  pseudoDiffSummary: string[];
  realPatchState: ApplyRealPatchState;
  riskLevel: GroundedFixRiskLevel;
  confidence: number;
  verificationChecks: string[];
  rollbackNotes: string[];
  approvalPosture: ApplyApprovalPosture;
  currentFileVerificationState: ApplyFileVerificationState;
  humanReviewState: ApplyHumanReviewState;
  noHiddenMutationGuarantee: string;
};

export type ApplyGateValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type ApplyApprovalPacketSource = {
  input: ApplyGateInput;
  operatorDecision?: ApplyOperatorDecision;
  approved?: boolean;
  approvalNote?: string;
  rollbackAcknowledged?: boolean;
  currentFileVerificationAcknowledged?: boolean;
  noSilentMutationAcknowledged?: boolean;
  toolPolicyConfirmed?: boolean;
  highRiskAcknowledged?: boolean;
};

export type ApplyApprovalPacket = {
  id: string;
  applyGateInputId: string;
  operatorDecision: ApplyOperatorDecision;
  approved: boolean;
  approvalNote: string;
  targetFiles: string[];
  riskLevel: GroundedFixRiskLevel;
  requiredChecks: string[];
  rollbackAcknowledged: boolean;
  currentFileVerificationAcknowledged: boolean;
  noSilentMutationAcknowledged: boolean;
  toolPolicyConfirmed: boolean;
  highRiskAcknowledged: boolean;
  applyDiffApprovalLabel: string;
  createdFromPreviewDiffPackageOnly: true;
  missingAcknowledgements: string[];
};

export type PatchApplyPolicy = {
  id: "patch-apply-policy";
  allowed: boolean;
  previewDiffPackageRequired: true;
  explicitHumanApprovalRequired: true;
  currentFilesMustBeVerified: true;
  rollbackPlanRequired: true;
  verificationPlanRequired: true;
  highOrCriticalRiskRequiresExtraAcknowledgement: boolean;
  pseudoDiffAloneIsNotApplyable: true;
  realPatchMustBeReviewedSeparately: true;
  applyDiffRequiresToolPolicyApproval: true;
  writeFileRequiresToolPolicyApproval: true;
  runCommandRequiresToolPolicyApproval: true;
  applyRequestCanBePrepared: boolean;
  actualMutationRemainsBlocked: true;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type ApplyRequestPayloadPreview = {
  tool: "apply-diff";
  displayOnly: true;
  approvalId: string;
  approvalLabel: string;
  targetFiles: string[];
  patchSourceState: ApplyRealPatchState;
  requestSummary: string[];
};

export type ApplyRequestPreview = {
  id: string;
  intendedTool: "apply-diff";
  toolPolicyPosture: ApplyToolPosture;
  targetFiles: string[];
  patchSourceState: ApplyRealPatchState;
  operatorApprovalState: ApplyOperatorDecision;
  previewState: ApplyPreviewState;
  requiredApprovalId: string;
  requiredApprovalLabel: string;
  payloadPreview: ApplyRequestPayloadPreview;
  safetyNotes: string[];
  futureExecutorBoundary: string;
  displayOnly: true;
};

export type ApplyMutationFirewall = {
  id: "apply-mutation-firewall";
  blocked: boolean;
  blockedTools: string[];
  blockedReasons: string[];
  allowlistedPreviewActions: string[];
  summary: string[];
};

export type ApplyVerificationCheck = {
  id: string;
  label: string;
  commandOrReview: string;
  required: boolean;
  runHere: false;
};

export type ApplyVerificationGate = {
  id: "apply-verification-gate";
  checks: ApplyVerificationCheck[];
  noChecksRunHere: true;
  summary: string[];
};

export type ApplyRollbackGate = {
  id: "apply-rollback-gate";
  notes: string[];
  acknowledgementRequired: true;
  acknowledged: boolean;
  summary: string[];
};

export type PatchApplicationGateSummary = {
  id: "patch-application-gate-summary";
  approvalState: ApplyOperatorDecision;
  blocked: boolean;
  targetFileCount: number;
  riskLevel: GroundedFixRiskLevel;
  requiredChecks: string[];
  missingAcknowledgements: string[];
  nextSafeAction: string;
  summary: string[];
};

export type PatchApplicationGateSession = {
  input: ApplyGateInput;
  validation: ApplyGateValidation;
  approvalPacket: ApplyApprovalPacket;
  policy: PatchApplyPolicy;
  requestPreview: ApplyRequestPreview;
  mutationFirewall: ApplyMutationFirewall;
  verificationGate: ApplyVerificationGate;
  rollbackGate: ApplyRollbackGate;
  summary: PatchApplicationGateSummary;
  applyReviewPrompt: string;
};

export function buildPatchApplicationGateStableKey(
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

export function uniquePatchApplicationGateStrings(values: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function clampPatchApplicationGateScore(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.min(1, Math.max(0, numeric));
}
