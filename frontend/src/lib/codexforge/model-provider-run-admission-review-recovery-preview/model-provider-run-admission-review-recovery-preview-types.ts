import type {
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
  AthenaModelRoutingPreviewId,
  AthenaModelRoutingProviderSlotLabel,
} from "../athena-model-routing-provider-selection-preview";
import type {
  ManualRunAdmissionAuditPreviewKey,
  ManualRunAdmissionBlockerKey,
  ManualRunAdmissionGateEvaluationKey,
  ManualRunAdmissionPreviewKey,
  ManualRunAdmissionTicketPreviewKey,
} from "../manual-gated-model-provider-run-admission-preview";
import type {
  ModelProviderApprovalPacketKey,
  ModelProviderRunIntentKey,
} from "../model-provider-approval-packet-run-intent-preview";

export const MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "4906-4937 - Model Provider Run Admission Review and Recovery Preview";

export const MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_PHASE = 4937;

export const PREVIOUS_COMPLETED_MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH =
  "4874-4905 - Manual Gated Model Provider Run Admission Preview";

export const NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH =
  "4938-4969 - Backend-Owned Model Provider Run Admission Contract";

export type ModelProviderAdmissionReviewId = AthenaModelRoutingPreviewId;

export type ModelProviderRunAdmissionReviewVersion =
  "model-provider-run-admission-review-preview-v1";
export type ModelProviderAdmissionDecisionReviewVersion =
  "model-provider-run-admission-decision-review-preview-v1";
export type ModelProviderAdmissionGateFailureReviewVersion =
  "model-provider-run-admission-gate-failure-review-preview-v1";
export type ModelProviderAdmissionRecoveryPlanVersion =
  "model-provider-run-admission-recovery-plan-preview-v1";
export type ModelProviderAdmissionRecoveryReadinessChecklistVersion =
  "model-provider-run-admission-recovery-readiness-checklist-v1";
export type ModelProviderAdmissionReviewAuditSummaryVersion =
  "model-provider-run-admission-review-audit-summary-preview-v1";

export type ModelProviderRunAdmissionReviewSource =
  "Athena / Jarvis Model Gateway";
export type ModelProviderRunAdmissionReviewMode = "preview-only";
export type ModelProviderRunAdmissionReviewPosture = "held / not admitted";
export type ModelProviderRunAdmissionState = "not admitted";
export type ModelProviderAdmissionDecisionState = "held";
export type ModelProviderAdmissionDecisionReviewState =
  "held / not admitted";
export type ModelProviderAdmissionTokenState = "not issued";
export type ModelProviderAdmissionLeaseState = "not created";
export type ModelProviderAdmissionTicketState =
  "preview-only / not issued";
export type ModelProviderReviewDispatchState = "not dispatched";
export type ModelProviderReviewJobExecutionState = "not executed";
export type ModelProviderProviderCallPosture = "not implemented";
export type ModelProviderModelCallPosture = "not implemented";
export type ModelProviderPromptSendingPosture = "not implemented";
export type ModelProviderSdkPosture = "no SDK imports";
export type ModelProviderCredentialPosture =
  "opaque credential references only";
export type ModelProviderSecretPosture = "no plaintext secrets";
export type ModelProviderFrontendPosture = "blocked";
export type ModelProviderBackendPosture = "server-only required";
export type ModelProviderExecutionPosture = "blocked by default";
export type ModelProviderManualOperatorReviewRequirement =
  "manual operator review required";
export type ModelProviderManualRecoveryReviewRequirement =
  "manual recovery review required";
export type ModelProviderManualApprovalRequirement =
  "manual approval required";
export type ModelProviderManualConfirmationRequirement =
  "manual confirmation required";
export type ModelProviderKillSwitchRequirement = "kill switch required";
export type ModelProviderAuditRequirement = "audit required";
export type ModelProviderPrivacyRedactionRequirement =
  "privacy/redaction required";
export type ModelProviderCostAcknowledgementRequirement =
  "cost acknowledgement required";
export type ModelProviderRateLimitGuardRequirement =
  "rate limit guard required";
export type ModelProviderTimeoutCancelGuardRequirement =
  "timeout/cancel guard required";
export type ModelProviderIdempotencyRequirement = "idempotency required";
export type ModelProviderReplayBlockRequirement = "replay block required";
export type ModelProviderSingleRunLockRequirement =
  "single-run lock required";
export type ModelProviderDryRunResultReviewRequirement =
  "dry-run result review required";
export type ModelProviderAcceptanceMatrixReviewRequirement =
  "acceptance matrix review required";
export type ModelProviderApprovalExpiryReviewRequirement =
  "approval expiry review required";
export type ModelProviderApprovalRevocationReviewRequirement =
  "approval revocation review required";
export type ModelProviderRetryExecutionPosture = "no retry execution";
export type ModelProviderFallbackExecutionPosture = "no fallback execution";
export type ModelProviderResultCaptureRequirement =
  "result capture required in future";
export type ModelProviderPersistenceState = "not implemented";
export type ModelProviderReviewPreviewOnlyStatement =
  "admission review is preview-only";
export type ModelProviderDecisionReviewPreviewOnlyStatement =
  "decision review is preview-only";
export type ModelProviderGateFailureReviewPreviewOnlyStatement =
  "gate failure review is preview-only";
export type ModelProviderRecoveryPlanPreviewOnlyStatement =
  "recovery plan is preview-only";
export type ModelProviderRecoveryReadinessPreviewOnlyStatement =
  "recovery readiness is preview-only";
export type ModelProviderAuditSummaryPreviewOnlyStatement =
  "audit summary is preview-only";
export type ModelProviderRecoveryPosture = "manual review only";
export type ModelProviderRetryPosture = "disabled";
export type ModelProviderFallbackPosture = "disabled";
export type ModelProviderReviewSeverity = "critical" | "high" | "medium";
export type ModelProviderReviewReferenceState = "not persisted";
export type ModelProviderAuditSummaryPosture = "preview-only";
export type ModelProviderRecoveryReadinessState =
  | "blocked"
  | "manual review required"
  | "backend future required";
export type ModelProviderRecoveryReadinessOwner =
  | "operator"
  | "backend future"
  | "safety review";
export type ModelProviderNextBackendOwnedRunAdmissionContractRequirement =
  "backend-owned model provider run admission contract next";
export type ModelProviderNoAdmissionNoExecutionStatement =
  "No admission. No execution. No provider execution. No model calls.";
export type ModelProviderNoGatePassStatement =
  "Gate remains held. No gate pass is granted.";
export type ModelProviderNoRetryNoFallbackNoExecutionStatement =
  "No retry. No fallback. No execution. Manual review only.";

export type ModelProviderAdmissionGateFailureId =
  | "operator-approval-gate"
  | "manual-confirmation-gate"
  | "kill-switch-gate"
  | "audit-gate"
  | "server-only-adapter-gate"
  | "opaque-credential-gate"
  | "prompt-payload-review-gate"
  | "privacy-redaction-gate"
  | "cost-rate-timeout-gate"
  | "idempotency-replay-gate"
  | "single-run-lock-gate"
  | "dry-run-result-review-gate"
  | "acceptance-matrix-gate"
  | "approval-expiry-gate"
  | "approval-revocation-gate"
  | "persistence-gate"
  | "queue-dispatch-gate"
  | "worker-dispatch-gate"
  | "job-execution-gate";

export type ModelProviderAdmissionGateFailureLabel =
  | "operator approval gate failure"
  | "manual confirmation gate failure"
  | "kill switch gate failure"
  | "audit gate failure"
  | "server-only adapter gate failure"
  | "opaque credential gate failure"
  | "prompt payload review gate failure"
  | "privacy/redaction gate failure"
  | "cost/rate/timeout gate failure"
  | "idempotency/replay gate failure"
  | "single-run lock gate failure"
  | "dry-run result review gate failure"
  | "acceptance matrix gate failure"
  | "approval expiry gate failure"
  | "approval revocation gate failure"
  | "persistence gate failure"
  | "queue dispatch gate failure"
  | "worker dispatch gate failure"
  | "job execution gate failure";

export type ModelProviderAdmissionGateFailureState =
  | "held / approval missing"
  | "held / confirmation missing"
  | "held / kill switch engaged"
  | "held / audit evidence missing"
  | "held / backend-only required"
  | "held / credential evidence missing"
  | "held / prompt payload not reviewed"
  | "held / privacy review incomplete"
  | "held / cost rate timeout incomplete"
  | "held / idempotency replay not proven"
  | "held / single-run lock missing"
  | "held / dry-run review missing"
  | "held / acceptance matrix unresolved"
  | "held / approval expiry not validated"
  | "held / approval revocation not validated"
  | "held / persistence not implemented"
  | "held / queue dispatch blocked"
  | "held / worker dispatch blocked"
  | "held / job execution blocked";

export type ModelProviderAdmissionRecoveryReadinessChecklistId =
  | "approval-scope-reviewed"
  | "manual-confirmation-captured"
  | "kill-switch-reviewed"
  | "audit-posture-reviewed"
  | "server-only-adapter-contract-ready"
  | "opaque-credential-label-reviewed"
  | "prompt-payload-redacted"
  | "privacy-redaction-reviewed"
  | "cost-acknowledgement-reviewed"
  | "rate-limit-reviewed"
  | "timeout-cancel-reviewed"
  | "idempotency-replay-reviewed"
  | "single-run-lock-reviewed"
  | "dry-run-result-reviewed"
  | "acceptance-matrix-reviewed"
  | "expiry-revocation-reviewed"
  | "queue-dispatch-still-blocked"
  | "worker-dispatch-still-blocked"
  | "job-execution-still-blocked"
  | "persistence-still-blocked";

export type ModelProviderAdmissionRecoveryReadinessChecklistLabel =
  | "approval scope reviewed"
  | "manual confirmation captured"
  | "kill switch reviewed"
  | "audit posture reviewed"
  | "server-only adapter contract ready"
  | "opaque credential label reviewed"
  | "prompt payload redacted"
  | "privacy/redaction reviewed"
  | "cost acknowledgement reviewed"
  | "rate limit reviewed"
  | "timeout/cancel reviewed"
  | "idempotency/replay reviewed"
  | "single-run lock reviewed"
  | "dry-run result reviewed"
  | "acceptance matrix reviewed"
  | "expiry/revocation reviewed"
  | "queue dispatch still blocked"
  | "worker dispatch still blocked"
  | "job execution still blocked"
  | "persistence still blocked";

export type ModelProviderRunAdmissionReviewKey =
  `model-provider-run-admission-review:${ModelProviderAdmissionReviewId}`;
export type ModelProviderAdmissionDecisionReviewKey =
  `model-provider-admission-decision-review:${ModelProviderAdmissionReviewId}`;
export type ModelProviderAdmissionGateFailureReviewKey =
  `model-provider-admission-gate-failure-review:${ModelProviderAdmissionReviewId}:${ModelProviderAdmissionGateFailureId}`;
export type ModelProviderAdmissionRecoveryPlanKey =
  `model-provider-run-admission-recovery-plan:${ModelProviderAdmissionReviewId}`;
export type ModelProviderAdmissionRecoveryReadinessChecklistKey =
  `model-provider-run-admission-recovery-readiness:${ModelProviderAdmissionRecoveryReadinessChecklistId}`;
export type ModelProviderAdmissionReviewAuditSummaryKey =
  `model-provider-run-admission-review-audit-summary:${ModelProviderAdmissionReviewId}`;

export type ModelProviderRunAdmissionReviewRecord = Readonly<{
  id: ModelProviderAdmissionReviewId;
  key: ModelProviderRunAdmissionReviewKey;
  reviewVersion: ModelProviderRunAdmissionReviewVersion;
  previewOnlyStatement: ModelProviderReviewPreviewOnlyStatement;
  source: ModelProviderRunAdmissionReviewSource;
  reviewMode: ModelProviderRunAdmissionReviewMode;
  admissionReviewPosture: ModelProviderRunAdmissionReviewPosture;
  label: string;
  operatorRequestPhrase: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  sourceAdmissionPreviewReference: ManualRunAdmissionPreviewKey;
  sourceAdmissionGateEvaluationReference: ManualRunAdmissionGateEvaluationKey;
  sourceAdmissionTicketPreviewReference: ManualRunAdmissionTicketPreviewKey;
  sourceAdmissionBlockerReference: ManualRunAdmissionBlockerKey;
  sourceAdmissionAuditPreviewReference: ManualRunAdmissionAuditPreviewKey;
  sourceApprovalPacketReference: ModelProviderApprovalPacketKey;
  sourceRunIntentReference: ModelProviderRunIntentKey;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  providerSlotLabel: AthenaModelRoutingProviderSlotLabel;
  backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
  localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
  runAdmissionState: ModelProviderRunAdmissionState;
  admissionDecisionState: ModelProviderAdmissionDecisionState;
  admissionTokenState: ModelProviderAdmissionTokenState;
  admissionLeaseState: ModelProviderAdmissionLeaseState;
  admissionTicketState: ModelProviderAdmissionTicketState;
  queueDispatchState: ModelProviderReviewDispatchState;
  workerDispatchState: ModelProviderReviewDispatchState;
  jobExecutionState: ModelProviderReviewJobExecutionState;
  providerCallPosture: ModelProviderProviderCallPosture;
  modelCallPosture: ModelProviderModelCallPosture;
  promptSendingPosture: ModelProviderPromptSendingPosture;
  sdkPosture: ModelProviderSdkPosture;
  credentialPosture: ModelProviderCredentialPosture;
  secretPosture: ModelProviderSecretPosture;
  frontendPosture: ModelProviderFrontendPosture;
  backendPosture: ModelProviderBackendPosture;
  executionPosture: ModelProviderExecutionPosture;
  manualOperatorReviewRequired: ModelProviderManualOperatorReviewRequirement;
  manualRecoveryReviewRequired: ModelProviderManualRecoveryReviewRequirement;
  manualApprovalRequired: ModelProviderManualApprovalRequirement;
  manualConfirmationRequired: ModelProviderManualConfirmationRequirement;
  killSwitchRequired: ModelProviderKillSwitchRequirement;
  auditRequired: ModelProviderAuditRequirement;
  privacyRedactionRequired: ModelProviderPrivacyRedactionRequirement;
  costAcknowledgementRequired: ModelProviderCostAcknowledgementRequirement;
  rateLimitGuardRequired: ModelProviderRateLimitGuardRequirement;
  timeoutCancelGuardRequired: ModelProviderTimeoutCancelGuardRequirement;
  idempotencyRequired: ModelProviderIdempotencyRequirement;
  replayBlockRequired: ModelProviderReplayBlockRequirement;
  singleRunLockRequired: ModelProviderSingleRunLockRequirement;
  dryRunResultReviewRequired: ModelProviderDryRunResultReviewRequirement;
  acceptanceMatrixReviewRequired: ModelProviderAcceptanceMatrixReviewRequirement;
  approvalExpiryReviewRequired: ModelProviderApprovalExpiryReviewRequirement;
  approvalRevocationReviewRequired: ModelProviderApprovalRevocationReviewRequirement;
  noRetryExecution: ModelProviderRetryExecutionPosture;
  noFallbackExecution: ModelProviderFallbackExecutionPosture;
  resultCaptureRequiredInFuture: ModelProviderResultCaptureRequirement;
  resultPersistenceState: ModelProviderPersistenceState;
  auditPersistenceState: ModelProviderPersistenceState;
  approvalPersistenceState: ModelProviderPersistenceState;
  nextBackendOwnedRunAdmissionContractRequirement:
    ModelProviderNextBackendOwnedRunAdmissionContractRequirement;
}>;

export type ModelProviderAdmissionDecisionReviewRecord = Readonly<{
  key: ModelProviderAdmissionDecisionReviewKey;
  decisionReviewVersion: ModelProviderAdmissionDecisionReviewVersion;
  previewOnlyStatement: ModelProviderDecisionReviewPreviewOnlyStatement;
  admissionReviewId: ModelProviderAdmissionReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  sourceAdmissionPreviewReference: ManualRunAdmissionPreviewKey;
  sourceGateEvaluationReference: ManualRunAdmissionGateEvaluationKey;
  decisionState: ModelProviderAdmissionDecisionReviewState;
  admissionReasonSummary: string;
  topBlockingGates: readonly ModelProviderAdmissionGateFailureLabel[];
  topMissingEvidence: readonly string[];
  operatorReviewNotes: readonly string[];
  manualRecoveryRequirement: string;
  nextSafeAction: string;
  explicitNoAdmissionNoExecutionStatement:
    ModelProviderNoAdmissionNoExecutionStatement;
}>;

export type ModelProviderAdmissionGateFailureReviewRecord = Readonly<{
  key: ModelProviderAdmissionGateFailureReviewKey;
  gateFailureReviewVersion: ModelProviderAdmissionGateFailureReviewVersion;
  previewOnlyStatement: ModelProviderGateFailureReviewPreviewOnlyStatement;
  admissionReviewId: ModelProviderAdmissionReviewId;
  label: string;
  failedGateId: ModelProviderAdmissionGateFailureId;
  failedGateLabel: ModelProviderAdmissionGateFailureLabel;
  gateState: ModelProviderAdmissionGateFailureState;
  severity: ModelProviderReviewSeverity;
  affectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  affectedWorkspaceTarget: AiModelProviderWorkspaceTarget;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
  explicitNoGatePassStatement: ModelProviderNoGatePassStatement;
}>;

export type ModelProviderAdmissionRecoveryPlanPreviewRecord = Readonly<{
  key: ModelProviderAdmissionRecoveryPlanKey;
  recoveryPlanVersion: ModelProviderAdmissionRecoveryPlanVersion;
  previewOnlyStatement: ModelProviderRecoveryPlanPreviewOnlyStatement;
  admissionReviewId: ModelProviderAdmissionReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  recoveryPosture: ModelProviderRecoveryPosture;
  missingManualApprovalRecovery: string;
  missingManualConfirmationRecovery: string;
  killSwitchActiveRecovery: string;
  approvalExpiredRecovery: string;
  approvalRevokedRecovery: string;
  missingOpaqueCredentialRecovery: string;
  promptPayloadNotReviewedRecovery: string;
  privacyRedactionIncompleteRecovery: string;
  costRateTimeoutIncompleteRecovery: string;
  dryRunReviewMissingRecovery: string;
  acceptanceMatrixUnresolvedRecovery: string;
  auditPersistenceMissingRecovery: string;
  resultPersistenceMissingRecovery: string;
  approvalPersistenceMissingRecovery: string;
  queueDispatchBlockedRecovery: string;
  workerDispatchBlockedRecovery: string;
  jobExecutionBlockedRecovery: string;
  retryPosture: ModelProviderRetryPosture;
  fallbackPosture: ModelProviderFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH;
  explicitNoRetryNoFallbackNoExecutionStatement:
    ModelProviderNoRetryNoFallbackNoExecutionStatement;
}>;

export type ModelProviderAdmissionRecoveryReadinessChecklistRecord = Readonly<{
  key: ModelProviderAdmissionRecoveryReadinessChecklistKey;
  checklistVersion: ModelProviderAdmissionRecoveryReadinessChecklistVersion;
  previewOnlyStatement: ModelProviderRecoveryReadinessPreviewOnlyStatement;
  checklistId: ModelProviderAdmissionRecoveryReadinessChecklistId;
  label: ModelProviderAdmissionRecoveryReadinessChecklistLabel;
  state: ModelProviderRecoveryReadinessState;
  severity: ModelProviderReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ModelProviderRecoveryReadinessOwner;
  currentPosture: ModelProviderRunAdmissionReviewMode;
  backendContractDependency:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH;
  nextSafeAction: string;
}>;

export type ModelProviderAdmissionReviewAuditSummaryRecord = Readonly<{
  key: ModelProviderAdmissionReviewAuditSummaryKey;
  auditSummaryVersion: ModelProviderAdmissionReviewAuditSummaryVersion;
  previewOnlyStatement: ModelProviderAuditSummaryPreviewOnlyStatement;
  admissionReviewId: ModelProviderAdmissionReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  auditPosture: ModelProviderAuditSummaryPosture;
  auditReferenceState: ModelProviderReviewReferenceState;
  approvalReferenceState: ModelProviderReviewReferenceState;
  resultReferenceState: ModelProviderReviewReferenceState;
  evidenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noProviderExecutionStatement: "No provider execution";
  noQueueDispatchStatement: "No queue dispatch";
  noWorkerDispatchStatement: "No worker dispatch";
  noJobExecutionStatement: "No job execution";
  noPersistenceStatement: "No persistence";
  backendOwnedContractRequirement:
    ModelProviderNextBackendOwnedRunAdmissionContractRequirement;
}>;

export type ModelProviderRunAdmissionReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: string;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  reviewCount: number;
  reviews: readonly ModelProviderRunAdmissionReviewRecord[];
}>;

export type ModelProviderRunAdmissionReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  reviewCount: number;
  reviews: readonly ModelProviderRunAdmissionReviewRecord[];
}>;

export type ModelProviderRunAdmissionReviewSummary = Readonly<{
  currentBatch: typeof MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH;
  reviewCount: number;
  decisionReviewCount: number;
  gateFailureReviewCount: number;
  recoveryPlanCount: number;
  recoveryReadinessChecklistCount: number;
  auditSummaryCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  summaryLines: readonly string[];
}>;

export type ModelProviderAdmissionGateFailureSummary = Readonly<{
  currentBatch: typeof MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH;
  gateFailureReviewCount: number;
  criticalGateFailureCount: number;
  highGateFailureCount: number;
  mediumGateFailureCount: number;
  summaryLines: readonly string[];
}>;

export type ModelProviderAdmissionRecoverySummary = Readonly<{
  currentBatch: typeof MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH;
  recoveryPlanCount: number;
  recoveryReadinessChecklistCount: number;
  manualReviewOnlyCount: number;
  retryDisabledCount: number;
  fallbackDisabledCount: number;
  summaryLines: readonly string[];
}>;
