import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord,
} from "../backend-owned-model-provider-synthetic-dry-run-runner-skeleton";
import type {
  BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord,
} from "../backend-owned-synthetic-dry-run-end-to-end-packet-review-recovery-preview";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  BackendOwnedSyntheticDryRunResultCaptureReviewRecord,
} from "../backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";
import type {
  MinimalManualGatedSyntheticDryRunExecutionMvpId,
  MinimalManualGatedSyntheticDryRunExecutionMvpKey,
  MinimalManualGatedSyntheticDryRunExecutionMvpRecord,
  SyntheticMvpApprovalPreviewKey,
  SyntheticMvpAuditPreviewKey,
  SyntheticMvpBlockedLiveExecutionSummaryKey,
  SyntheticMvpExecutionAdmissionCheckKey,
  SyntheticMvpExecutionGateId,
  SyntheticMvpExecutionInputKey,
  SyntheticMvpExecutionResultKey,
  SyntheticMvpManualApprovalFixtureKey,
  SyntheticMvpResultEnvelopeKey,
  SyntheticMvpSafetyGateSummaryKey,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5418-5449 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_PHASE =
  5449;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH =
  "5386-5417 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH =
  "5450-5481 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture MVP";

export const SYNTHETIC_EXECUTION_REVIEW_SECTION_TITLES = [
  "Backend-owned minimal synthetic execution review",
  "Synthetic execution result review",
  "Synthetic execution gate failure review",
  "Synthetic execution recovery plan",
  "Synthetic execution recovery readiness",
  "Synthetic execution review audit summary",
  "Synthetic execution acceptance posture",
] as const;

export type MinimalSyntheticExecutionReviewId =
  MinimalManualGatedSyntheticDryRunExecutionMvpId;

export type MinimalSyntheticExecutionReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-preview-v1";
export type MinimalSyntheticExecutionResultReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result-review-preview-v1";
export type MinimalSyntheticExecutionGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-gate-failure-review-preview-v1";
export type MinimalSyntheticExecutionRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-recovery-plan-preview-v1";
export type MinimalSyntheticExecutionRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-recovery-readiness-checklist-v1";
export type MinimalSyntheticExecutionReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-audit-summary-preview-v1";
export type MinimalSyntheticExecutionAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-acceptance-posture-preview-v1";

export type MinimalSyntheticExecutionReviewSource =
  "Athena / Jarvis Model Gateway";
export type MinimalSyntheticExecutionReviewMode = "preview-only";
export type MinimalSyntheticExecutionReviewPosture =
  "minimal synthetic execution review / backend-only / in-memory-only / not provider-capable / not persistent";
export type MinimalSyntheticExecutionReviewCurrentReadiness =
  "minimal-synthetic-execution-review-only / backend-only / in-memory-only / not provider-capable / not persistent";
export type MinimalSyntheticExecutionReviewSeverity =
  "critical" | "high" | "medium";
export type MinimalSyntheticExecutionRecoveryPosture =
  "manual review only";
export type MinimalSyntheticExecutionRetryPosture = "disabled";
export type MinimalSyntheticExecutionFallbackPosture = "disabled";
export type MinimalSyntheticExecutionAcceptanceState =
  "not accepted for live execution / synthetic MVP accepted only";
export type MinimalSyntheticExecutionReadinessState =
  "reviewed" | "blocked" | "backend future required";
export type MinimalSyntheticExecutionReadinessOwner =
  "operator" | "backend future" | "safety review";
export type MinimalSyntheticExecutionAuditPosture = "preview-only";
export type MinimalSyntheticExecutionPreviewOnlyStatement =
  "minimal synthetic execution review is preview-only";
export type MinimalSyntheticExecutionResultOnlyStatement =
  "Synthetic result only. No real output.";
export type MinimalSyntheticExecutionNoLiveGatePassStatement =
  "No live gate pass.";
export type MinimalSyntheticExecutionNoRetryNoFallbackNoProviderNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No persistence.";
export type MinimalSyntheticExecutionAcceptanceStatement =
  "Synthetic MVP accepted only. Live execution not accepted.";

export type MinimalSyntheticExecutionReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review:${MinimalSyntheticExecutionReviewId}`;
export type MinimalSyntheticExecutionResultReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result-review:${MinimalSyntheticExecutionReviewId}`;
export type MinimalSyntheticExecutionGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-gate-failure-review:${MinimalSyntheticExecutionReviewId}:${SyntheticMvpExecutionGateId}`;
export type MinimalSyntheticExecutionRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-recovery-plan:${MinimalSyntheticExecutionReviewId}`;

export type MinimalSyntheticExecutionRecoveryReadinessChecklistId =
  | "server-only-helper-reviewed"
  | "synthetic-execution-input-reviewed"
  | "admission-check-reviewed"
  | "manual-approval-fixture-reviewed"
  | "manual-confirmation-fixture-reviewed"
  | "approval-decision-fixture-reviewed"
  | "kill-switch-fixture-reviewed"
  | "deterministic-result-reviewed"
  | "result-envelope-reviewed"
  | "audit-preview-reviewed"
  | "approval-preview-reviewed"
  | "blocked-live-execution-summary-reviewed"
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

export type MinimalSyntheticExecutionRecoveryReadinessChecklistLabel =
  | "server-only helper reviewed"
  | "synthetic execution input reviewed"
  | "admission check reviewed"
  | "manual approval fixture reviewed"
  | "manual confirmation fixture reviewed"
  | "approval decision fixture reviewed"
  | "kill switch fixture reviewed"
  | "deterministic result reviewed"
  | "result envelope reviewed"
  | "audit preview reviewed"
  | "approval preview reviewed"
  | "blocked live execution summary reviewed"
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

export type MinimalSyntheticExecutionRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-recovery-readiness:${MinimalSyntheticExecutionReviewId}:${MinimalSyntheticExecutionRecoveryReadinessChecklistId}`;
export type MinimalSyntheticExecutionReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-audit-summary:${MinimalSyntheticExecutionReviewId}`;
export type MinimalSyntheticExecutionAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-acceptance-posture:${MinimalSyntheticExecutionReviewId}`;

export type MinimalSyntheticExecutionReviewSectionTitle =
  (typeof SYNTHETIC_EXECUTION_REVIEW_SECTION_TITLES)[number];

export type MinimalSyntheticExecutionResultCaptureMvpChecklist =
  readonly string[];

export type BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord =
  Readonly<{
    id: MinimalSyntheticExecutionReviewId;
    key: MinimalSyntheticExecutionReviewKey;
    reviewVersion: MinimalSyntheticExecutionReviewVersion;
    source: MinimalSyntheticExecutionReviewSource;
    reviewMode: MinimalSyntheticExecutionReviewMode;
    reviewPosture: MinimalSyntheticExecutionReviewPosture;
    previewOnlyStatement: MinimalSyntheticExecutionPreviewOnlyStatement;
    requestLabel: MinimalManualGatedSyntheticDryRunExecutionMvpRecord["requestLabel"];
    label: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    sourceMinimalSyntheticExecutionMvpReference:
      MinimalManualGatedSyntheticDryRunExecutionMvpKey;
    sourceSyntheticMvpExecutionInputReference:
      SyntheticMvpExecutionInputKey;
    sourceSyntheticMvpAdmissionCheckReference:
      SyntheticMvpExecutionAdmissionCheckKey;
    sourceManualApprovalFixtureReference:
      SyntheticMvpManualApprovalFixtureKey;
    sourceManualConfirmationFixtureReference:
      SyntheticMvpManualApprovalFixtureKey;
    sourceSyntheticMvpExecutionResultReference:
      SyntheticMvpExecutionResultKey;
    sourceSyntheticMvpResultEnvelopeReference:
      SyntheticMvpResultEnvelopeKey;
    sourceSyntheticMvpAuditPreviewReference:
      SyntheticMvpAuditPreviewKey;
    sourceSyntheticMvpApprovalPreviewReference:
      SyntheticMvpApprovalPreviewKey;
    sourceSyntheticMvpSafetyGateSummaryReference:
      SyntheticMvpSafetyGateSummaryKey;
    sourceSyntheticMvpBlockedLiveExecutionSummaryReference:
      SyntheticMvpBlockedLiveExecutionSummaryKey;
    sourceManualApprovalDecisionReviewReference:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
    sourceEndToEndPacketReviewReference:
      BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord["key"];
    sourceSyntheticRunnerSkeletonReference:
      BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord["key"];
    sourceResultCaptureReviewReference:
      BackendOwnedSyntheticDryRunResultCaptureReviewRecord["key"];
    selectedCapabilityFamily:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"];
    providerSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["providerSlotLabel"];
    backupProviderSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["backupProviderSlotLabel"];
    localPrivateAlternativeLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["localPrivateAlternativeLabel"];
    serverOnlyHelperState: "exists";
    syntheticExecutionState: "completed-synthetic-mvp-only";
    deterministicResultState: "produced in memory only";
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
    killSwitchState: "inactive fixture only";
    retryPosture: MinimalSyntheticExecutionRetryPosture;
    fallbackPosture: MinimalSyntheticExecutionFallbackPosture;
    nextResultCaptureMvpRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
    currentReadiness: MinimalSyntheticExecutionReviewCurrentReadiness;
  }>;

export type SyntheticExecutionResultReviewRecord = Readonly<{
  key: MinimalSyntheticExecutionResultReviewKey;
  resultReviewVersion: MinimalSyntheticExecutionResultReviewVersion;
  executionReviewId: MinimalSyntheticExecutionReviewId;
  sourceExecutionResultReference: SyntheticMvpExecutionResultKey;
  sourceResultEnvelopeReference: SyntheticMvpResultEnvelopeKey;
  resultState: "deterministic synthetic result produced in memory only";
  resultIdPosture: "deterministic preview id only";
  resultDigestPosture: "deterministic preview digest only";
  providerResponseState: "not received";
  modelOutputState: "not generated";
  outputClassification: "synthetic fixture only";
  resultPersistenceState: "not implemented";
  auditPersistenceState: "not implemented";
  approvalPersistenceState: "not implemented";
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
  explicitSyntheticResultOnlyNoRealOutputStatement:
    MinimalSyntheticExecutionResultOnlyStatement;
}>;

export type SyntheticExecutionGateFailureReviewRecord = Readonly<{
  key: MinimalSyntheticExecutionGateFailureReviewKey;
  gateFailureReviewVersion:
    MinimalSyntheticExecutionGateFailureReviewVersion;
  executionReviewId: MinimalSyntheticExecutionReviewId;
  failedGateId: SyntheticMvpExecutionGateId;
  failedGateLabel: string;
  gateState: string;
  severity: MinimalSyntheticExecutionReviewSeverity;
  affectedCapabilityFamily:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"];
  affectedWorkspaceTarget: AiModelProviderWorkspaceTarget;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  resultCaptureMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  nextSafeAction: string;
  explicitNoLiveGatePassStatement:
    MinimalSyntheticExecutionNoLiveGatePassStatement;
}>;

export type SyntheticExecutionRecoveryPlanPreviewRecord = Readonly<{
  id: MinimalSyntheticExecutionReviewId;
  key: MinimalSyntheticExecutionRecoveryPlanKey;
  recoveryPlanVersion: MinimalSyntheticExecutionRecoveryPlanVersion;
  executionReviewId: MinimalSyntheticExecutionReviewId;
  recoveryPosture: MinimalSyntheticExecutionRecoveryPosture;
  serverOnlyHelperRecovery: string;
  syntheticExecutionInputRecovery: string;
  manualApprovalFixtureRecovery: string;
  manualConfirmationFixtureRecovery: string;
  approvalDecisionFixtureRecovery: string;
  killSwitchFixtureRecovery: string;
  deterministicResultRecovery: string;
  resultEnvelopeRecovery: string;
  auditPreviewRecovery: string;
  approvalPreviewRecovery: string;
  providerBoundaryRecovery: string;
  promptBoundaryRecovery: string;
  modelBoundaryRecovery: string;
  queueDispatchBlockedRecovery: string;
  workerDispatchBlockedRecovery: string;
  jobExecutionBlockedRecovery: string;
  resultPersistenceMissingRecovery: string;
  auditPersistenceMissingRecovery: string;
  approvalPersistenceMissingRecovery: string;
  databaseWriteBlockedRecovery: string;
  fileWriteBlockedRecovery: string;
  retryPosture: MinimalSyntheticExecutionRetryPosture;
  fallbackPosture: MinimalSyntheticExecutionFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  explicitNoRetryNoFallbackNoProviderNoPersistenceStatement:
    MinimalSyntheticExecutionNoRetryNoFallbackNoProviderNoPersistenceStatement;
}>;

export type SyntheticExecutionRecoveryReadinessChecklistRecord = Readonly<{
  key: MinimalSyntheticExecutionRecoveryReadinessChecklistKey;
  checklistVersion:
    MinimalSyntheticExecutionRecoveryReadinessChecklistVersion;
  executionReviewId: MinimalSyntheticExecutionReviewId;
  checklistId: MinimalSyntheticExecutionRecoveryReadinessChecklistId;
  label: MinimalSyntheticExecutionRecoveryReadinessChecklistLabel;
  state: MinimalSyntheticExecutionReadinessState;
  severity: MinimalSyntheticExecutionReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: MinimalSyntheticExecutionReadinessOwner;
  currentPosture: MinimalSyntheticExecutionReviewMode;
  resultCaptureMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  nextSafeAction: string;
}>;

export type SyntheticExecutionReviewAuditSummaryRecord = Readonly<{
  id: MinimalSyntheticExecutionReviewId;
  key: MinimalSyntheticExecutionReviewAuditSummaryKey;
  auditSummaryVersion:
    MinimalSyntheticExecutionReviewAuditSummaryVersion;
  executionReviewId: MinimalSyntheticExecutionReviewId;
  auditPosture: MinimalSyntheticExecutionAuditPosture;
  syntheticResultReferenceState: "preview-only / not persisted";
  auditReferenceState: "not persisted";
  approvalReferenceState: "not persisted";
  evidencePacketState: "preview-only";
  serverOnlyHelperEvidenceSummary: string;
  deterministicResultEvidenceSummary: string;
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
  resultCaptureMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
}>;

export type SyntheticExecutionAcceptancePostureRecord = Readonly<{
  id: MinimalSyntheticExecutionReviewId;
  key: MinimalSyntheticExecutionAcceptancePostureKey;
  acceptancePostureVersion:
    MinimalSyntheticExecutionAcceptancePostureVersion;
  executionReviewId: MinimalSyntheticExecutionReviewId;
  acceptanceState: MinimalSyntheticExecutionAcceptanceState;
  syntheticOnlyAcceptanceSummary: string;
  backendOnlyAcceptanceSummary: string;
  inMemoryOnlyAcceptanceSummary: string;
  providerBlockers: readonly string[];
  promptBlockers: readonly string[];
  modelBlockers: readonly string[];
  queueWorkerJobBlockers: readonly string[];
  persistenceBlockers: readonly string[];
  databaseFileBlockers: readonly string[];
  approvalBlockers: readonly string[];
  auditBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitSyntheticMvpAcceptedLiveExecutionNotAcceptedStatement:
    MinimalSyntheticExecutionAcceptanceStatement;
}>;

export type SyntheticExecutionReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["label"];
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord[];
}>;

export type SyntheticExecutionReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord[];
}>;

export type SyntheticExecutionReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  reviewCount: number;
  resultReviewCount: number;
  gateFailureCount: number;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  currentReadiness: MinimalSyntheticExecutionReviewCurrentReadiness;
  acceptanceState: MinimalSyntheticExecutionAcceptanceState;
  summaryLines: readonly string[];
}>;

export type SyntheticExecutionResultReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  resultReviewCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type SyntheticExecutionGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  gateFailureCount: number;
  summaryLines: readonly string[];
  topFailedGateLabels: readonly string[];
  nextSafeAction: string;
}>;

export type SyntheticExecutionRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  currentReadiness: MinimalSyntheticExecutionReviewCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;
