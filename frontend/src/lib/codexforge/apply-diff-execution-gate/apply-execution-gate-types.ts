export type ApplyExecutionRiskLevel = "low" | "medium" | "high" | "critical";

export type ApplyExecutionDryRunStatus =
  | "dry-run-complete"
  | "ready-for-real-patch-review"
  | "pseudo-only"
  | "blocked"
  | "needs-approval"
  | "needs-current-file-verification"
  | "needs-rollback-plan"
  | "needs-verification-plan"
  | "conflict-risk"
  | "invalid";

export type ApplyExecutionPatchSourceState =
  | "pseudo-diff-only"
  | "real-patch-missing"
  | "real-patch-available-unreviewed"
  | "real-patch-reviewed";

export type ApplyExecutionRealPatchAvailabilityState =
  | "missing"
  | "available-unreviewed"
  | "reviewed";

export type ApplyExecutionApprovalPosture =
  | "missing"
  | "packet-present"
  | "approved"
  | "rejected";

export type ApplyExecutionPolicyPosture =
  | "unchecked"
  | "blocked"
  | "approval-required"
  | "review-ready"
  | "confirmed";

export type ApplyExecutionPlanPosture = "missing" | "present" | "acknowledged";
export type ApplyExecutionOperatorAcknowledgementState = "missing" | "partial" | "satisfied";
export type ApplyExecutionBridgeMode = "execute-route-enabled" | "request-preview-only";

export type ApplyExecutionResultStatus =
  | "not-requested"
  | "blocked"
  | "approval-required"
  | "policy-failed"
  | "request-ready"
  | "dispatched"
  | "completed"
  | "failed"
  | "cancelled";

export type ApplyExecutionAuditLedgerState =
  | "input-created"
  | "approval-reviewed"
  | "policy-confirmed"
  | "request-built"
  | "bridge-blocked"
  | "bridge-ready"
  | "user-dispatched"
  | "result-captured"
  | "verification-required"
  | "rollback-ready";

export type ApplyExecutionToolInputPreview = {
  path: string;
  patch: string;
  originalContent?: string;
  createIfMissing: boolean;
  dryRun: false;
  createBackup: boolean;
  ensureTrailingNewline: boolean;
  maxPatchChars?: number;
  maxFileChars?: number;
};

export type ApplyExecutionGateInputSource = {
  dryRunId: string;
  applyGateId: string;
  approvalPacketId: string;
  previewDiffCompositionId: string;
  queueItemId: string;
  goal: string;
  targetFiles: readonly string[];
  dryRunStatus?: ApplyExecutionDryRunStatus;
  dryRunResultSummary?: readonly string[];
  patchSourceState?: ApplyExecutionPatchSourceState;
  realPatchAvailabilityState?: ApplyExecutionRealPatchAvailabilityState;
  approvalPosture?: ApplyExecutionApprovalPosture;
  policyPosture?: ApplyExecutionPolicyPosture;
  rollbackPosture?: ApplyExecutionPlanPosture;
  verificationPosture?: ApplyExecutionPlanPosture;
  operatorAcknowledgementState?: ApplyExecutionOperatorAcknowledgementState;
  riskLevel?: ApplyExecutionRiskLevel;
  approvedTargetFiles?: readonly string[];
  patchSummary?: readonly string[];
  rollbackPlan?: readonly string[];
  verificationPlan?: readonly string[];
  evidenceRefs?: readonly string[];
  toolInputPreview?: Partial<ApplyExecutionToolInputPreview>;
};

export type ApplyExecutionGateInput = {
  id: string;
  dryRunId: string;
  applyGateId: string;
  approvalPacketId: string;
  previewDiffCompositionId: string;
  queueItemId: string;
  goal: string;
  targetFiles: string[];
  dryRunStatus: ApplyExecutionDryRunStatus;
  dryRunResultSummary: string[];
  patchSourceState: ApplyExecutionPatchSourceState;
  realPatchAvailabilityState: ApplyExecutionRealPatchAvailabilityState;
  approvalPosture: ApplyExecutionApprovalPosture;
  policyPosture: ApplyExecutionPolicyPosture;
  rollbackPosture: ApplyExecutionPlanPosture;
  verificationPosture: ApplyExecutionPlanPosture;
  operatorAcknowledgementState: ApplyExecutionOperatorAcknowledgementState;
  riskLevel: ApplyExecutionRiskLevel;
  approvedTargetFiles: string[];
  patchSummary: string[];
  rollbackPlan: string[];
  verificationPlan: string[];
  evidenceRefs: string[];
  toolInputPreview: ApplyExecutionToolInputPreview;
  deterministicInputOnly: true;
};

export type ApplyExecutionGateValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type ApplyExecutionApprovalStateSource = {
  input: ApplyExecutionGateInput;
  explicitOperatorApproval?: boolean;
  approvalId?: string;
  approvalLabel?: string;
  approvalNote?: string;
  acknowledgedTargetFiles?: readonly string[];
  acknowledgedRollbackPlan?: boolean;
  acknowledgedVerificationPlan?: boolean;
  acknowledgedMutationRisk?: boolean;
  acknowledgedCurrentFileVerification?: boolean;
  acknowledgedNoSilentExecution?: boolean;
  acknowledgedPolicyBoundary?: boolean;
  highRiskExtraAcknowledged?: boolean;
  approvedAtLabel?: string;
  approvalSource?: string;
};

export type ApplyExecutionApprovalState = {
  id: string;
  executionGateId: string;
  explicitOperatorApproval: boolean;
  approvalId: string;
  approvalLabel: string;
  approvalNote: string;
  acknowledgedTargetFiles: string[];
  acknowledgedRollbackPlan: boolean;
  acknowledgedVerificationPlan: boolean;
  acknowledgedMutationRisk: boolean;
  acknowledgedCurrentFileVerification: boolean;
  acknowledgedNoSilentExecution: boolean;
  acknowledgedPolicyBoundary: boolean;
  highRiskExtraAcknowledged: boolean;
  approvedAtLabel: string;
  approvalSource: string;
  missingAcknowledgements: string[];
  satisfied: boolean;
};

export type ApplyExecutionPolicyConfirmation = {
  id: string;
  executionGateId: string;
  toolName: "apply-diff";
  applyDiffApprovalRequired: true;
  approvalStateSatisfied: boolean;
  dryRunCleanEnough: boolean;
  pseudoOnlyPatchBlocksExecution: boolean;
  realPatchPresent: boolean;
  realPatchReviewed: boolean;
  targetFilesMatchApprovedPacket: boolean;
  singleApplyDiffTargetCovered: boolean;
  rollbackRequired: true;
  rollbackSatisfied: boolean;
  verificationRequired: true;
  verificationSatisfied: boolean;
  highOrCriticalRiskRequiresExtraAcknowledgement: boolean;
  highRiskAcknowledgementSatisfied: boolean;
  brokerExecutionBlocked: true;
  writeFileDirectCallBlocked: true;
  runCommandDirectCallBlocked: true;
  directApplyDiffCallBlocked: true;
  executeRouteOnlyAllowedBoundary: true;
  allowedBoundary: "/api/codexforge/tools/execute";
  blockedTools: string[];
  blockedReasons: string[];
  warnings: string[];
  ready: boolean;
  summary: string[];
};

export type ApplyExecutionRequestPacket = {
  id: string;
  requestId: string;
  executionGateId: string;
  toolName: "apply-diff";
  toolInputPreview: ApplyExecutionToolInputPreview;
  approvalState: ApplyExecutionApprovalState;
  policyConfirmation: ApplyExecutionPolicyConfirmation;
  targetFiles: string[];
  patchSummary: string[];
  rollbackNotes: string[];
  verificationChecks: string[];
  expectedResultContract: ApplyExecutionResultContract;
  ready: boolean;
  blockedReasons: string[];
  safetyNotes: string[];
};

export type ApplyExecutionRequestValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type ApplyExecutionBridgeRequestBody = {
  toolName: "apply-diff";
  mode: "execute";
  input: ApplyExecutionToolInputPreview;
  context: {
    requestId: string;
    userIntent: string;
    metadata: {
      executionGateId: string;
      approvalPacketId: string;
      approvalLabel: string;
      boundary: "/api/codexforge/tools/execute";
    };
  };
  approvalState: {
    approved: true;
    approvalId: string;
    approvedAt: string;
    approvedBy: string;
    reason: string;
  };
};

export type ApplyExecutionBridgePayload = {
  id: string;
  requestId: string;
  bridgeMode: ApplyExecutionBridgeMode;
  boundary: "/api/codexforge/tools/execute";
  method: "POST";
  canDispatch: boolean;
  requestBody: ApplyExecutionBridgeRequestBody | null;
  blockedReasons: string[];
  safetyNotes: string[];
  summary: string[];
};

export type ApplyExecutionResultContractSource = {
  requestId: string;
  resultId?: string;
  ok?: boolean;
  status?: ApplyExecutionResultStatus;
  summary?: readonly string[];
  changedFiles?: readonly string[];
  warnings?: readonly string[];
  errors?: readonly string[];
  verificationNextSteps?: readonly string[];
  rollbackNextSteps?: readonly string[];
  evidenceRefs?: readonly string[];
};

export type ApplyExecutionResultContract = {
  id: string;
  requestId: string;
  ok: boolean;
  status: ApplyExecutionResultStatus;
  summary: string[];
  changedFiles: string[];
  warnings: string[];
  errors: string[];
  verificationNextSteps: string[];
  rollbackNextSteps: string[];
  evidenceRefs: string[];
};

export type ApplyExecutionAuditLedgerItem = {
  id: string;
  executionGateId: string;
  state: ApplyExecutionAuditLedgerState;
  label: string;
  detail: string;
};

export type ApplyExecutionAuditLedger = {
  id: string;
  executionGateId: string;
  items: ApplyExecutionAuditLedgerItem[];
  summary: string[];
};

export type ApplyDiffExecutionGateSummary = {
  id: string;
  executionGateId: string;
  approvalReady: boolean;
  policyReady: boolean;
  requestReady: boolean;
  bridgeMode: ApplyExecutionBridgeMode;
  targetFileCount: number;
  blockedReasons: string[];
  nextSafeAction: string;
  summary: string[];
};

export type ApplyDiffExecutionGateSession = {
  input: ApplyExecutionGateInput;
  inputValidation: ApplyExecutionGateValidation;
  approvalState: ApplyExecutionApprovalState;
  approvalValidation: ApplyExecutionGateValidation;
  policyConfirmation: ApplyExecutionPolicyConfirmation;
  requestPacket: ApplyExecutionRequestPacket;
  requestValidation: ApplyExecutionRequestValidation;
  bridgePayload: ApplyExecutionBridgePayload;
  resultContract: ApplyExecutionResultContract;
  auditLedger: ApplyExecutionAuditLedger;
  summary: ApplyDiffExecutionGateSummary;
};

export function buildApplyDiffExecutionGateStableKey(
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

export function uniqueApplyDiffExecutionGateStrings(
  values: readonly (string | null | undefined)[]
): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function sameApplyDiffExecutionGateStringSet(left: readonly string[], right: readonly string[]): boolean {
  const normalizedLeft = uniqueApplyDiffExecutionGateStrings(left);
  const normalizedRight = uniqueApplyDiffExecutionGateStrings(right);
  return normalizedLeft.length === normalizedRight.length && normalizedLeft.every((item, index) => item === normalizedRight[index]);
}
