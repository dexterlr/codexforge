import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
  SyntheticExecutionResultReviewRecord,
} from "../minimal-synth-exec-review";
import type {
  MinimalManualGatedSyntheticDryRunResultCaptureMvpId,
  MinimalManualGatedSyntheticDryRunResultCaptureMvpKey,
  MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord,
  SyntheticResultCaptureApprovalPreviewKey,
  SyntheticResultCaptureAuditPreviewKey,
  SyntheticResultCaptureBlockedLivePersistenceSummaryKey,
  SyntheticResultCaptureEnvelopeKey,
  SyntheticResultCaptureEvidencePacketKey,
  SyntheticResultCaptureGateId,
  SyntheticResultCaptureInputKey,
  SyntheticResultCaptureOutputKey,
  SyntheticResultCaptureOutputRecord,
  SyntheticResultCaptureSafetyGateSummaryKey,
} from "../min-synth-result-capture";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5482-5513 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE =
  5513;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH =
  "5450-5481 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH =
  "5514-5545 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join MVP";

export const SYNTHETIC_RESULT_CAPTURE_REVIEW_SECTION_TITLES = [
  "Backend-owned minimal synthetic result capture review",
  "Synthetic result capture output review",
  "Synthetic result capture gate failure review",
  "Synthetic result capture recovery plan",
  "Synthetic result capture recovery readiness",
  "Synthetic result capture review audit summary",
  "Synthetic result capture acceptance posture",
] as const;

export type MinimalSyntheticResultCaptureReviewId =
  MinimalManualGatedSyntheticDryRunResultCaptureMvpId;

export type MinimalSyntheticResultCaptureReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review-preview-v1";
export type MinimalSyntheticResultCaptureOutputReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-output-review-preview-v1";
export type MinimalSyntheticResultCaptureGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-gate-failure-review-preview-v1";
export type MinimalSyntheticResultCaptureRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-recovery-plan-preview-v1";
export type MinimalSyntheticResultCaptureRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-recovery-readiness-checklist-v1";
export type MinimalSyntheticResultCaptureReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review-audit-summary-preview-v1";
export type MinimalSyntheticResultCaptureAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-acceptance-posture-preview-v1";

export type MinimalSyntheticResultCaptureReviewSource =
  "Athena / Jarvis Model Gateway";
export type MinimalSyntheticResultCaptureReviewMode = "preview-only";
export type MinimalSyntheticResultCaptureReviewPosture =
  "minimal synthetic result capture review / backend-only / in-memory-only / not provider-capable / not persistent";
export type MinimalSyntheticResultCaptureReviewCurrentReadiness =
  "minimal-synthetic-result-capture-review-only / backend-only / in-memory-only / not provider-capable / not persistent";
export type MinimalSyntheticResultCaptureReviewSeverity =
  "critical" | "high" | "medium";
export type MinimalSyntheticResultCaptureRecoveryPosture =
  "manual review only";
export type MinimalSyntheticResultCaptureRetryPosture = "disabled";
export type MinimalSyntheticResultCaptureFallbackPosture = "disabled";
export type MinimalSyntheticResultCaptureAcceptanceState =
  "not accepted for live persistence / synthetic capture MVP accepted only";
export type MinimalSyntheticResultCaptureReadinessState =
  "reviewed" | "blocked" | "backend future required";
export type MinimalSyntheticResultCaptureReadinessOwner =
  "operator" | "backend future" | "safety review";
export type MinimalSyntheticResultCaptureAuditPosture = "preview-only";
export type MinimalSyntheticResultCapturePreviewOnlyStatement =
  "minimal synthetic result capture review is preview-only";
export type MinimalSyntheticResultCaptureOutputOnlyStatement =
  "Synthetic capture only. No real output. No persistence.";
export type MinimalSyntheticResultCaptureNoLiveGatePassStatement =
  "No live gate pass.";
export type MinimalSyntheticResultCaptureNoRetryNoFallbackNoProviderNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No persistence.";
export type MinimalSyntheticResultCaptureAcceptanceStatement =
  "Synthetic capture MVP accepted only. Live persistence not accepted.";

export type MinimalSyntheticResultCaptureReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review:${MinimalSyntheticResultCaptureReviewId}`;
export type MinimalSyntheticResultCaptureOutputReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-output-review:${MinimalSyntheticResultCaptureReviewId}`;
export type MinimalSyntheticResultCaptureGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-gate-failure-review:${MinimalSyntheticResultCaptureReviewId}:${SyntheticResultCaptureGateId}`;
export type MinimalSyntheticResultCaptureRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-recovery-plan:${MinimalSyntheticResultCaptureReviewId}`;

export type MinimalSyntheticResultCaptureRecoveryReadinessChecklistId =
  | "server-only-capture-helper-reviewed"
  | "synthetic-result-capture-input-reviewed"
  | "capture-admission-check-reviewed"
  | "capture-output-reviewed"
  | "capture-envelope-reviewed"
  | "capture-audit-preview-reviewed"
  | "capture-approval-preview-reviewed"
  | "capture-evidence-packet-reviewed"
  | "synthetic-execution-result-reviewed"
  | "manual-approval-fixture-reviewed"
  | "manual-confirmation-fixture-reviewed"
  | "kill-switch-fixture-reviewed"
  | "deterministic-capture-reviewed"
  | "in-memory-only-capture-reviewed"
  | "blocked-live-persistence-summary-reviewed"
  | "provider-boundary-reviewed"
  | "prompt-boundary-reviewed"
  | "model-boundary-reviewed"
  | "frontend-request-boundary-reviewed"
  | "api-route-boundary-reviewed"
  | "queue-dispatch-still-blocked"
  | "worker-dispatch-still-blocked"
  | "job-execution-still-blocked"
  | "result-persistence-still-blocked"
  | "audit-persistence-still-blocked"
  | "approval-persistence-still-blocked"
  | "database-writes-still-blocked"
  | "file-writes-still-blocked";

export type MinimalSyntheticResultCaptureRecoveryReadinessChecklistLabel =
  | "server-only capture helper reviewed"
  | "synthetic result capture input reviewed"
  | "capture admission check reviewed"
  | "capture output reviewed"
  | "capture envelope reviewed"
  | "capture audit preview reviewed"
  | "capture approval preview reviewed"
  | "capture evidence packet reviewed"
  | "synthetic execution result reviewed"
  | "manual approval fixture reviewed"
  | "manual confirmation fixture reviewed"
  | "kill switch fixture reviewed"
  | "deterministic capture reviewed"
  | "in-memory-only capture reviewed"
  | "blocked live persistence summary reviewed"
  | "provider boundary reviewed"
  | "prompt boundary reviewed"
  | "model boundary reviewed"
  | "frontend request boundary reviewed"
  | "API route boundary reviewed"
  | "queue dispatch still blocked"
  | "worker dispatch still blocked"
  | "job execution still blocked"
  | "result persistence still blocked"
  | "audit persistence still blocked"
  | "approval persistence still blocked"
  | "database writes still blocked"
  | "file writes still blocked";

export type MinimalSyntheticResultCaptureRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-recovery-readiness:${MinimalSyntheticResultCaptureReviewId}:${MinimalSyntheticResultCaptureRecoveryReadinessChecklistId}`;
export type MinimalSyntheticResultCaptureReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review-audit-summary:${MinimalSyntheticResultCaptureReviewId}`;
export type MinimalSyntheticResultCaptureAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-acceptance-posture:${MinimalSyntheticResultCaptureReviewId}`;

export type MinimalSyntheticResultCaptureReviewSectionTitle =
  (typeof SYNTHETIC_RESULT_CAPTURE_REVIEW_SECTION_TITLES)[number];

export type MinimalAuditAndApprovalJoinMvpChecklist = readonly string[];
export type MinimalSyntheticResultCaptureReviewDisplayStrings =
  readonly string[];

export type BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord =
  Readonly<{
    id: MinimalSyntheticResultCaptureReviewId;
    key: MinimalSyntheticResultCaptureReviewKey;
    reviewVersion: MinimalSyntheticResultCaptureReviewVersion;
    source: MinimalSyntheticResultCaptureReviewSource;
    reviewMode: MinimalSyntheticResultCaptureReviewMode;
    reviewPosture: MinimalSyntheticResultCaptureReviewPosture;
    previewOnlyStatement: MinimalSyntheticResultCapturePreviewOnlyStatement;
    requestLabel: MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["requestLabel"];
    label: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    sourceMinimalSyntheticResultCaptureMvpReference:
      MinimalManualGatedSyntheticDryRunResultCaptureMvpKey;
    sourceSyntheticResultCaptureInputReference: SyntheticResultCaptureInputKey;
    sourceSyntheticResultCaptureOutputReference:
      SyntheticResultCaptureOutputKey;
    sourceSyntheticResultCaptureEnvelopeReference:
      SyntheticResultCaptureEnvelopeKey;
    sourceSyntheticResultCaptureAuditPreviewReference:
      SyntheticResultCaptureAuditPreviewKey;
    sourceSyntheticResultCaptureApprovalPreviewReference:
      SyntheticResultCaptureApprovalPreviewKey;
    sourceSyntheticResultCaptureEvidencePacketReference:
      SyntheticResultCaptureEvidencePacketKey;
    sourceSyntheticResultCaptureSafetyGateSummaryReference:
      SyntheticResultCaptureSafetyGateSummaryKey;
    sourceSyntheticResultCaptureBlockedLivePersistenceSummaryReference:
      SyntheticResultCaptureBlockedLivePersistenceSummaryKey;
    sourceMinimalSyntheticExecutionReviewReference:
      BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord["key"];
    sourceSyntheticExecutionResultReference:
      BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord["sourceSyntheticMvpExecutionResultReference"];
    sourceSyntheticExecutionResultReviewReference:
      SyntheticExecutionResultReviewRecord["key"];
    sourceManualApprovalDecisionReviewReference:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
    selectedCapabilityFamily:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"];
    providerSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["providerSlotLabel"];
    backupProviderSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["backupProviderSlotLabel"];
    localPrivateAlternativeLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["localPrivateAlternativeLabel"];
    serverOnlyCaptureHelperState: "exists";
    syntheticResultCaptureState: "captured-synthetic-in-memory-only";
    deterministicCaptureState: "produced in memory only";
    frontendRequestState: "not created";
    apiRouteState: "not created";
    providerResponseState: "not received";
    modelOutputState: "not generated";
    promptSendingState: "not implemented";
    providerExecutionState: "blocked";
    queueDispatchState: "not dispatched";
    workerDispatchState: "not dispatched";
    jobExecutionState: "not executed";
    resultPersistenceState: "not implemented";
    auditPersistenceState: "not implemented";
    approvalPersistenceState: "not implemented";
    databaseWriteState: "not implemented";
    fileWriteState: "not implemented";
    approvalFixtureState: "preview-only";
    manualConfirmationFixtureState: "preview-only";
    approvalTokenState: "not issued";
    approvalLeaseState: "not created";
    auditPreviewState: "preview-only";
    approvalPreviewState: "preview-only";
    resultReferenceState: "preview-only / not persisted";
    evidencePacketState: "preview-only / not persisted";
    killSwitchState: "inactive fixture only";
    retryPosture: MinimalSyntheticResultCaptureRetryPosture;
    fallbackPosture: MinimalSyntheticResultCaptureFallbackPosture;
    nextAuditAndApprovalJoinMvpRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
    currentReadiness: MinimalSyntheticResultCaptureReviewCurrentReadiness;
  }>;

export type SyntheticResultCaptureOutputReviewRecord = Readonly<{
  key: MinimalSyntheticResultCaptureOutputReviewKey;
  outputReviewVersion: MinimalSyntheticResultCaptureOutputReviewVersion;
  resultCaptureReviewId: MinimalSyntheticResultCaptureReviewId;
  sourceCaptureOutputReference: SyntheticResultCaptureOutputKey;
  sourceCaptureEnvelopeReference: SyntheticResultCaptureEnvelopeKey;
  captureState: "captured-synthetic-in-memory-only";
  captureIdPosture: "deterministic preview id only";
  resultIdPosture: "deterministic preview id only";
  digestPosture: "deterministic preview digest only";
  providerResponseState: "not received";
  modelOutputState: "not generated";
  outputClassification: "synthetic fixture only";
  resultPersistenceState: "not implemented";
  auditPersistenceState: "not implemented";
  approvalPersistenceState: "not implemented";
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
  explicitSyntheticCaptureOnlyNoRealOutputNoPersistenceStatement:
    MinimalSyntheticResultCaptureOutputOnlyStatement;
}>;

export type SyntheticResultCaptureGateFailureReviewRecord = Readonly<{
  key: MinimalSyntheticResultCaptureGateFailureReviewKey;
  gateFailureReviewVersion:
    MinimalSyntheticResultCaptureGateFailureReviewVersion;
  resultCaptureReviewId: MinimalSyntheticResultCaptureReviewId;
  failedGateId: SyntheticResultCaptureGateId;
  failedGateLabel: string;
  gateState: string;
  severity: MinimalSyntheticResultCaptureReviewSeverity;
  affectedCapabilityFamily:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"];
  affectedWorkspaceTarget: AiModelProviderWorkspaceTarget;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  auditAndApprovalJoinMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  nextSafeAction: string;
  explicitNoLiveGatePassStatement:
    MinimalSyntheticResultCaptureNoLiveGatePassStatement;
}>;

export type SyntheticResultCaptureRecoveryPlanPreviewRecord = Readonly<{
  id: MinimalSyntheticResultCaptureReviewId;
  key: MinimalSyntheticResultCaptureRecoveryPlanKey;
  recoveryPlanVersion: MinimalSyntheticResultCaptureRecoveryPlanVersion;
  resultCaptureReviewId: MinimalSyntheticResultCaptureReviewId;
  recoveryPosture: MinimalSyntheticResultCaptureRecoveryPosture;
  serverOnlyCaptureHelperRecovery: string;
  syntheticResultCaptureInputRecovery: string;
  syntheticResultCaptureOutputRecovery: string;
  captureEnvelopeRecovery: string;
  auditPreviewRecovery: string;
  approvalPreviewRecovery: string;
  evidencePacketRecovery: string;
  providerBoundaryRecovery: string;
  promptBoundaryRecovery: string;
  modelBoundaryRecovery: string;
  frontendRequestBoundaryRecovery: string;
  apiRouteBoundaryRecovery: string;
  queueDispatchBlockedRecovery: string;
  workerDispatchBlockedRecovery: string;
  jobExecutionBlockedRecovery: string;
  resultPersistenceMissingRecovery: string;
  auditPersistenceMissingRecovery: string;
  approvalPersistenceMissingRecovery: string;
  databaseWriteBlockedRecovery: string;
  fileWriteBlockedRecovery: string;
  retryPosture: MinimalSyntheticResultCaptureRetryPosture;
  fallbackPosture: MinimalSyntheticResultCaptureFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  explicitNoRetryNoFallbackNoProviderNoPersistenceStatement:
    MinimalSyntheticResultCaptureNoRetryNoFallbackNoProviderNoPersistenceStatement;
}>;

export type SyntheticResultCaptureRecoveryReadinessChecklistRecord = Readonly<{
  key: MinimalSyntheticResultCaptureRecoveryReadinessChecklistKey;
  checklistVersion:
    MinimalSyntheticResultCaptureRecoveryReadinessChecklistVersion;
  resultCaptureReviewId: MinimalSyntheticResultCaptureReviewId;
  checklistId: MinimalSyntheticResultCaptureRecoveryReadinessChecklistId;
  label: MinimalSyntheticResultCaptureRecoveryReadinessChecklistLabel;
  state: MinimalSyntheticResultCaptureReadinessState;
  severity: MinimalSyntheticResultCaptureReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: MinimalSyntheticResultCaptureReadinessOwner;
  currentPosture: MinimalSyntheticResultCaptureReviewMode;
  auditAndApprovalJoinMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  nextSafeAction: string;
}>;

export type SyntheticResultCaptureReviewAuditSummaryRecord = Readonly<{
  id: MinimalSyntheticResultCaptureReviewId;
  key: MinimalSyntheticResultCaptureReviewAuditSummaryKey;
  auditSummaryVersion:
    MinimalSyntheticResultCaptureReviewAuditSummaryVersion;
  resultCaptureReviewId: MinimalSyntheticResultCaptureReviewId;
  auditPosture: MinimalSyntheticResultCaptureAuditPosture;
  syntheticCaptureReferenceState: "preview-only / not persisted";
  syntheticResultReferenceState: "preview-only / not persisted";
  auditReferenceState: "not persisted";
  approvalReferenceState: "not persisted";
  evidencePacketState: "preview-only";
  serverOnlyCaptureHelperEvidenceSummary: string;
  deterministicCaptureEvidenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noProviderOutputStatement: "No provider output.";
  noModelOutputStatement: "No model output.";
  noPromptSendingStatement: "No prompt sending.";
  noResultPersistenceStatement: "No result persistence.";
  noAuditPersistenceStatement: "No audit persistence.";
  noApprovalPersistenceStatement: "No approval persistence.";
  noDatabaseWriteStatement: "No database write.";
  noFileWriteStatement: "No file write.";
  auditAndApprovalJoinMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
}>;

export type SyntheticResultCaptureAcceptancePostureRecord = Readonly<{
  id: MinimalSyntheticResultCaptureReviewId;
  key: MinimalSyntheticResultCaptureAcceptancePostureKey;
  acceptancePostureVersion:
    MinimalSyntheticResultCaptureAcceptancePostureVersion;
  resultCaptureReviewId: MinimalSyntheticResultCaptureReviewId;
  acceptanceState: MinimalSyntheticResultCaptureAcceptanceState;
  syntheticOnlyAcceptanceSummary: string;
  backendOnlyAcceptanceSummary: string;
  inMemoryOnlyAcceptanceSummary: string;
  providerBlockers: readonly string[];
  promptBlockers: readonly string[];
  modelBlockers: readonly string[];
  queueWorkerJobBlockers: readonly string[];
  resultPersistenceBlockers: readonly string[];
  auditPersistenceBlockers: readonly string[];
  approvalPersistenceBlockers: readonly string[];
  databaseFileBlockers: readonly string[];
  approvalBlockers: readonly string[];
  auditBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitSyntheticCaptureAcceptedLivePersistenceNotAcceptedStatement:
    MinimalSyntheticResultCaptureAcceptanceStatement;
}>;

export type SyntheticResultCaptureReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord[];
}>;

export type SyntheticResultCaptureReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord[];
}>;

export type SyntheticResultCaptureReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  reviewCount: number;
  outputReviewCount: number;
  gateFailureCount: number;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  currentReadiness: MinimalSyntheticResultCaptureReviewCurrentReadiness;
  acceptanceState: MinimalSyntheticResultCaptureAcceptanceState;
  summaryLines: readonly string[];
}>;

export type SyntheticResultCaptureOutputReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  outputReviewCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type SyntheticResultCaptureGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  gateFailureCount: number;
  summaryLines: readonly string[];
  topFailedGateLabels: readonly string[];
  nextSafeAction: string;
}>;

export type SyntheticResultCaptureRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  currentReadiness: MinimalSyntheticResultCaptureReviewCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type SyntheticResultCaptureOutputReviewSeed = Readonly<{
  review: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord;
  output: SyntheticResultCaptureOutputRecord;
}>;
