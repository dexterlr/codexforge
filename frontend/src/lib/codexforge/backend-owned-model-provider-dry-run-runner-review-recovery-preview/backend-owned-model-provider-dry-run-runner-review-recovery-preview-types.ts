import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
} from "../athena-model-routing-provider-selection-preview";
import type {
  BackendDryRunErrorContractKey,
  BackendDryRunErrorContractRecord,
  BackendDryRunRequestContractKey,
  BackendDryRunRequestContractRecord,
  BackendDryRunResponseContractKey,
  BackendDryRunResponseContractRecord,
  BackendDryRunRunnerContractId,
  BackendDryRunRunnerContractKey,
  BackendDryRunRunnerGateSchemaKey,
  BackendDryRunRunnerHandoffPreviewKey,
  BackendDryRunRunnerReadinessMatrixKey,
  BackendOwnedModelProviderDryRunRunnerContractRecord,
} from "../backend-owned-model-provider-dry-run-runner-contract";

export const BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5002-5033 - Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview";

export const BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_PHASE =
  5033;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH =
  "4970-5001 - Backend-Owned Model Provider Dry-Run Runner Contract";

export const NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH =
  "5034-5065 - Backend-Owned Model Provider Synthetic Dry-Run Runner Skeleton";

export type BackendDryRunRunnerReviewId = BackendDryRunRunnerContractId;

export type BackendOwnedDryRunRunnerReviewVersion =
  "backend-owned-model-provider-dry-run-runner-review-preview-v1";
export type BackendDryRunRunnerDecisionReviewVersion =
  "backend-owned-model-provider-dry-run-runner-decision-review-preview-v1";
export type BackendDryRunRunnerGateFailureReviewVersion =
  "backend-owned-model-provider-dry-run-runner-gate-failure-review-preview-v1";
export type BackendDryRunRunnerRecoveryPlanVersion =
  "backend-owned-model-provider-dry-run-runner-recovery-plan-preview-v1";
export type BackendDryRunRunnerRecoveryReadinessChecklistVersion =
  "backend-owned-model-provider-dry-run-runner-recovery-readiness-checklist-v1";
export type BackendDryRunRunnerReviewAuditSummaryVersion =
  "backend-owned-model-provider-dry-run-runner-review-audit-summary-preview-v1";
export type BackendDryRunRunnerAcceptancePostureVersion =
  "backend-owned-model-provider-dry-run-runner-acceptance-posture-preview-v1";

export type BackendDryRunRunnerReviewSource = "Athena / Jarvis Model Gateway";
export type BackendDryRunRunnerReviewMode = "preview-only";
export type BackendDryRunRunnerReviewPosture =
  "runner contract review / not executable";
export type BackendDryRunRunnerDecisionState = "held / not executable";
export type BackendDryRunRunnerPreviewOnlyStatement =
  "dry-run runner review is preview-only";
export type BackendDryRunRunnerDecisionReviewPreviewOnlyStatement =
  "dry-run runner decision review is preview-only";
export type BackendDryRunRunnerGateFailureReviewPreviewOnlyStatement =
  "dry-run runner gate failure review is preview-only";
export type BackendDryRunRunnerRecoveryPlanPreviewOnlyStatement =
  "dry-run runner recovery plan is preview-only";
export type BackendDryRunRunnerRecoveryReadinessPreviewOnlyStatement =
  "dry-run runner recovery readiness is preview-only";
export type BackendDryRunRunnerReviewAuditSummaryPreviewOnlyStatement =
  "dry-run runner review audit summary is preview-only";
export type BackendDryRunRunnerAcceptancePosturePreviewOnlyStatement =
  "dry-run runner acceptance posture is preview-only";
export type BackendDryRunRunnerManualOperatorReviewRequirement =
  "manual operator review required";
export type BackendDryRunRunnerManualRecoveryReviewRequirement =
  "manual recovery review required";
export type BackendDryRunRunnerResultCaptureRequirement =
  "result capture required in future";
export type BackendDryRunRunnerPersistenceState = "not implemented";
export type BackendDryRunRunnerRecoveryPosture = "manual review only";
export type BackendDryRunRunnerRetryPosture = "disabled";
export type BackendDryRunRunnerFallbackPosture = "disabled";
export type BackendDryRunRunnerReviewSeverity =
  | "critical"
  | "high"
  | "medium";
export type BackendDryRunRunnerReviewReferenceState = "not persisted";
export type BackendDryRunRunnerAuditSummaryPosture = "preview-only";
export type BackendDryRunRunnerAcceptanceState =
  "not accepted / preview-only";
export type BackendDryRunRunnerRecoveryReadinessState =
  | "blocked"
  | "manual review required"
  | "backend future required";
export type BackendDryRunRunnerRecoveryReadinessOwner =
  | "operator"
  | "backend future"
  | "safety review";
export type BackendDryRunRunnerSyntheticSkeletonRequirement =
  "backend-owned synthetic dry-run runner skeleton next";
export type BackendDryRunRunnerNoRunnerInvocationNoExecutionStatement =
  "No runner invocation. No execution. No provider execution. No model calls.";
export type BackendDryRunRunnerNoGatePassStatement =
  "Gate remains blocked. No gate pass is granted.";
export type BackendDryRunRunnerNoRetryNoFallbackNoExecutionStatement =
  "No retry. No fallback. No execution. Manual review only.";
export type BackendDryRunRunnerNoAcceptanceNoExecutionStatement =
  "No acceptance. No execution. No provider execution. No model calls.";

export type BackendDryRunRunnerGateFailureId =
  | "backend-admission-contract-gate"
  | "admission-token-gate"
  | "admission-lease-gate"
  | "operator-approval-gate"
  | "manual-confirmation-gate"
  | "approval-expiry-revocation-gate"
  | "kill-switch-gate"
  | "audit-gate"
  | "server-only-boundary-gate"
  | "opaque-credential-gate"
  | "prompt-payload-review-gate"
  | "privacy-redaction-gate"
  | "cost-rate-timeout-gate"
  | "idempotency-replay-gate"
  | "single-run-lock-gate"
  | "dry-run-request-contract-gate"
  | "dry-run-response-contract-gate"
  | "dry-run-error-contract-gate"
  | "runner-invocation-gate"
  | "provider-adapter-boundary-gate"
  | "queue-dispatch-gate"
  | "worker-dispatch-gate"
  | "job-execution-gate"
  | "persistence-gate";

export type BackendDryRunRunnerGateFailureLabel =
  | "backend admission contract gate failure"
  | "admission token gate failure"
  | "admission lease gate failure"
  | "operator approval gate failure"
  | "manual confirmation gate failure"
  | "approval expiry/revocation gate failure"
  | "kill switch gate failure"
  | "audit gate failure"
  | "server-only boundary gate failure"
  | "opaque credential gate failure"
  | "prompt payload review gate failure"
  | "privacy/redaction gate failure"
  | "cost/rate/timeout gate failure"
  | "idempotency/replay gate failure"
  | "single-run lock gate failure"
  | "dry-run request contract gate failure"
  | "dry-run response contract gate failure"
  | "dry-run error contract gate failure"
  | "runner invocation gate failure"
  | "provider adapter boundary gate failure"
  | "queue dispatch gate failure"
  | "worker dispatch gate failure"
  | "job execution gate failure"
  | "persistence gate failure";

export type BackendDryRunRunnerGateFailureState =
  | "held / backend admission contract missing"
  | "held / admission token not issued"
  | "held / admission lease not created"
  | "held / operator approval missing"
  | "held / manual confirmation missing"
  | "held / approval expiry revocation unresolved"
  | "held / kill switch engaged"
  | "held / audit evidence missing"
  | "held / server-only boundary required"
  | "held / opaque credential missing"
  | "held / prompt payload not reviewed"
  | "held / privacy redaction incomplete"
  | "held / cost rate timeout incomplete"
  | "held / idempotency replay not proven"
  | "held / single-run lock missing"
  | "held / dry-run request contract missing"
  | "held / dry-run response contract missing"
  | "held / dry-run error contract missing"
  | "held / runner invocation blocked"
  | "held / provider adapter boundary blocked"
  | "held / queue dispatch blocked"
  | "held / worker dispatch blocked"
  | "held / job execution blocked"
  | "held / persistence not implemented";

export type BackendDryRunRunnerRecoveryReadinessChecklistId =
  | "backend-admission-contract-reviewed"
  | "admission-token-contract-reviewed"
  | "admission-lease-contract-reviewed"
  | "runner-contract-reviewed"
  | "dry-run-request-contract-reviewed"
  | "dry-run-response-contract-reviewed"
  | "dry-run-error-contract-reviewed"
  | "runner-gate-schema-reviewed"
  | "runner-readiness-matrix-reviewed"
  | "dry-run-handoff-preview-reviewed"
  | "opaque-credential-label-reviewed"
  | "prompt-payload-redacted"
  | "privacy-redaction-reviewed"
  | "cost-acknowledgement-reviewed"
  | "rate-limit-reviewed"
  | "timeout-cancel-reviewed"
  | "idempotency-replay-reviewed"
  | "single-run-lock-reviewed"
  | "queue-dispatch-still-blocked"
  | "worker-dispatch-still-blocked"
  | "job-execution-still-blocked"
  | "persistence-still-blocked"
  | "provider-adapter-boundary-still-blocked";

export type BackendDryRunRunnerRecoveryReadinessChecklistLabel =
  | "backend admission contract reviewed"
  | "admission token contract reviewed"
  | "admission lease contract reviewed"
  | "runner contract reviewed"
  | "dry-run request contract reviewed"
  | "dry-run response contract reviewed"
  | "dry-run error contract reviewed"
  | "runner gate schema reviewed"
  | "runner readiness matrix reviewed"
  | "dry-run handoff preview reviewed"
  | "opaque credential label reviewed"
  | "prompt payload redacted"
  | "privacy/redaction reviewed"
  | "cost acknowledgement reviewed"
  | "rate limit reviewed"
  | "timeout/cancel reviewed"
  | "idempotency/replay reviewed"
  | "single-run lock reviewed"
  | "queue dispatch still blocked"
  | "worker dispatch still blocked"
  | "job execution still blocked"
  | "persistence still blocked"
  | "provider adapter boundary still blocked";

export type BackendDryRunRunnerReviewKey =
  `backend-owned-model-provider-dry-run-runner-review:${BackendDryRunRunnerReviewId}`;
export type BackendDryRunRunnerDecisionReviewKey =
  `backend-owned-model-provider-dry-run-runner-decision-review:${BackendDryRunRunnerReviewId}`;
export type BackendDryRunRunnerGateFailureReviewKey =
  `backend-owned-model-provider-dry-run-runner-gate-failure-review:${BackendDryRunRunnerReviewId}:${BackendDryRunRunnerGateFailureId}`;
export type BackendDryRunRunnerRecoveryPlanKey =
  `backend-owned-model-provider-dry-run-runner-recovery-plan:${BackendDryRunRunnerReviewId}`;
export type BackendDryRunRunnerRecoveryReadinessChecklistKey =
  `backend-owned-model-provider-dry-run-runner-recovery-readiness:${BackendDryRunRunnerRecoveryReadinessChecklistId}`;
export type BackendDryRunRunnerReviewAuditSummaryKey =
  `backend-owned-model-provider-dry-run-runner-review-audit-summary:${BackendDryRunRunnerReviewId}`;
export type BackendDryRunRunnerAcceptancePostureKey =
  `backend-owned-model-provider-dry-run-runner-acceptance-posture:${BackendDryRunRunnerReviewId}`;

export type BackendOwnedModelProviderDryRunRunnerReviewRecord = Readonly<{
  id: BackendDryRunRunnerReviewId;
  key: BackendDryRunRunnerReviewKey;
  reviewVersion: BackendOwnedDryRunRunnerReviewVersion;
  previewOnlyStatement: BackendDryRunRunnerPreviewOnlyStatement;
  source: BackendDryRunRunnerReviewSource;
  reviewMode: BackendDryRunRunnerReviewMode;
  reviewPosture: BackendDryRunRunnerReviewPosture;
  label: string;
  operatorRequestPhrase: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  sourceBackendDryRunRunnerContractReference: BackendDryRunRunnerContractKey;
  sourceDryRunRequestContractReference: BackendDryRunRequestContractKey;
  sourceDryRunResponseContractReference: BackendDryRunResponseContractKey;
  sourceDryRunErrorContractReference: BackendDryRunErrorContractKey;
  sourceDryRunRunnerGateSchemaReference: BackendDryRunRunnerGateSchemaKey;
  sourceDryRunRunnerReadinessMatrixReference:
    BackendDryRunRunnerReadinessMatrixKey;
  sourceDryRunRunnerHandoffPreviewReference: BackendDryRunRunnerHandoffPreviewKey;
  sourceBackendAdmissionContractReference:
    BackendOwnedModelProviderDryRunRunnerContractRecord["sourceBackendAdmissionContractReference"];
  sourceRunIntentReference:
    BackendOwnedModelProviderDryRunRunnerContractRecord["sourceRunIntentReference"];
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  providerSlotLabel:
    BackendOwnedModelProviderDryRunRunnerContractRecord["providerSlotLabel"];
  backupProviderSlotLabel:
    BackendOwnedModelProviderDryRunRunnerContractRecord["backupProviderSlotLabel"];
  localPrivateAlternativeLabel:
    BackendOwnedModelProviderDryRunRunnerContractRecord["localPrivateAlternativeLabel"];
  dryRunRunnerContractState:
    BackendOwnedModelProviderDryRunRunnerContractRecord["dryRunRunnerContractState"];
  dryRunRequestState: BackendDryRunRequestContractRecord["requestCreationState"];
  dryRunInvocationState:
    BackendDryRunRequestContractRecord["runnerInvocationState"];
  dryRunExecutionState:
    BackendDryRunResponseContractRecord["dryRunExecutionState"];
  dryRunResponseState: BackendDryRunResponseContractRecord["responseState"];
  dryRunErrorState: BackendDryRunErrorContractRecord["errorState"];
  providerResponseState:
    BackendDryRunResponseContractRecord["providerResponseState"];
  modelOutputState: BackendDryRunResponseContractRecord["modelOutputState"];
  fixtureResultState:
    BackendDryRunResponseContractRecord["fixtureResultState"];
  admissionTokenState: BackendDryRunRequestContractRecord["admissionTokenPosture"];
  admissionLeaseState: BackendDryRunRequestContractRecord["admissionLeasePosture"];
  queueDispatchState: BackendDryRunResponseContractRecord["queueDispatchState"];
  workerDispatchState:
    BackendDryRunResponseContractRecord["workerDispatchState"];
  jobExecutionState: BackendDryRunResponseContractRecord["jobExecutionState"];
  providerCallPosture:
    BackendOwnedModelProviderDryRunRunnerContractRecord["providerCallPosture"];
  modelCallPosture:
    BackendOwnedModelProviderDryRunRunnerContractRecord["modelCallPosture"];
  promptSendingPosture:
    BackendOwnedModelProviderDryRunRunnerContractRecord["promptSendingPosture"];
  sdkPosture: BackendOwnedModelProviderDryRunRunnerContractRecord["sdkPosture"];
  credentialPosture:
    BackendOwnedModelProviderDryRunRunnerContractRecord["credentialPosture"];
  secretPosture:
    BackendOwnedModelProviderDryRunRunnerContractRecord["secretPosture"];
  frontendPosture:
    BackendOwnedModelProviderDryRunRunnerContractRecord["frontendPosture"];
  backendPosture:
    BackendOwnedModelProviderDryRunRunnerContractRecord["backendPosture"];
  executionPosture:
    BackendOwnedModelProviderDryRunRunnerContractRecord["executionPosture"];
  manualOperatorReviewRequired:
    BackendDryRunRunnerManualOperatorReviewRequirement;
  manualRecoveryReviewRequired:
    BackendDryRunRunnerManualRecoveryReviewRequirement;
  manualApprovalRequired:
    BackendOwnedModelProviderDryRunRunnerContractRecord["manualApprovalRequired"];
  manualConfirmationRequired:
    BackendOwnedModelProviderDryRunRunnerContractRecord["manualConfirmationRequired"];
  killSwitchRequired:
    BackendOwnedModelProviderDryRunRunnerContractRecord["killSwitchRequired"];
  auditRequired:
    BackendOwnedModelProviderDryRunRunnerContractRecord["auditRequired"];
  privacyRedactionRequired:
    BackendOwnedModelProviderDryRunRunnerContractRecord["privacyRedactionRequired"];
  costAcknowledgementRequired:
    BackendOwnedModelProviderDryRunRunnerContractRecord["costAcknowledgementRequired"];
  rateLimitGuardRequired:
    BackendOwnedModelProviderDryRunRunnerContractRecord["rateLimitGuardRequired"];
  timeoutCancelGuardRequired:
    BackendOwnedModelProviderDryRunRunnerContractRecord["timeoutCancelGuardRequired"];
  idempotencyRequired:
    BackendOwnedModelProviderDryRunRunnerContractRecord["idempotencyRequired"];
  replayBlockRequired:
    BackendOwnedModelProviderDryRunRunnerContractRecord["replayBlockRequired"];
  singleRunLockRequired:
    BackendOwnedModelProviderDryRunRunnerContractRecord["singleRunLockRequired"];
  noRetryExecution:
    BackendOwnedModelProviderDryRunRunnerContractRecord["noRetryExecution"];
  noFallbackExecution:
    BackendOwnedModelProviderDryRunRunnerContractRecord["noFallbackExecution"];
  resultCaptureRequiredInFuture: BackendDryRunRunnerResultCaptureRequirement;
  resultPersistenceState: BackendDryRunRunnerPersistenceState;
  auditPersistenceState: BackendDryRunRunnerPersistenceState;
  approvalPersistenceState: BackendDryRunRunnerPersistenceState;
  nextSyntheticDryRunRunnerSkeletonRequirement:
    BackendDryRunRunnerSyntheticSkeletonRequirement;
}>;

export type BackendDryRunRunnerDecisionReviewRecord = Readonly<{
  key: BackendDryRunRunnerDecisionReviewKey;
  decisionReviewVersion: BackendDryRunRunnerDecisionReviewVersion;
  previewOnlyStatement: BackendDryRunRunnerDecisionReviewPreviewOnlyStatement;
  dryRunRunnerReviewId: BackendDryRunRunnerReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  sourceRunnerContractReference: BackendDryRunRunnerContractKey;
  sourceRequestContractReference: BackendDryRunRequestContractKey;
  sourceResponseContractReference: BackendDryRunResponseContractKey;
  sourceErrorContractReference: BackendDryRunErrorContractKey;
  decisionState: BackendDryRunRunnerDecisionState;
  runnerReasonSummary: string;
  topBlockingGates: readonly BackendDryRunRunnerGateFailureLabel[];
  topMissingEvidence: readonly string[];
  operatorReviewNotes: readonly string[];
  manualRecoveryRequirement: string;
  backendSkeletonDependency:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
  nextSafeAction: string;
  explicitNoRunnerInvocationNoExecutionStatement:
    BackendDryRunRunnerNoRunnerInvocationNoExecutionStatement;
}>;

export type BackendDryRunRunnerGateFailureReviewRecord = Readonly<{
  key: BackendDryRunRunnerGateFailureReviewKey;
  gateFailureReviewVersion: BackendDryRunRunnerGateFailureReviewVersion;
  previewOnlyStatement: BackendDryRunRunnerGateFailureReviewPreviewOnlyStatement;
  dryRunRunnerReviewId: BackendDryRunRunnerReviewId;
  label: string;
  failedGateId: BackendDryRunRunnerGateFailureId;
  failedGateLabel: BackendDryRunRunnerGateFailureLabel;
  gateState: BackendDryRunRunnerGateFailureState;
  severity: BackendDryRunRunnerReviewSeverity;
  affectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  affectedWorkspaceTarget: AiModelProviderWorkspaceTarget;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  backendSkeletonDependency:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
  nextSafeAction: string;
  explicitNoGatePassStatement: BackendDryRunRunnerNoGatePassStatement;
}>;

export type BackendDryRunRunnerRecoveryPlanPreviewRecord = Readonly<{
  key: BackendDryRunRunnerRecoveryPlanKey;
  recoveryPlanVersion: BackendDryRunRunnerRecoveryPlanVersion;
  previewOnlyStatement: BackendDryRunRunnerRecoveryPlanPreviewOnlyStatement;
  dryRunRunnerReviewId: BackendDryRunRunnerReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  recoveryPosture: BackendDryRunRunnerRecoveryPosture;
  missingBackendAdmissionContractRecovery: string;
  admissionTokenNotIssuedRecovery: string;
  admissionLeaseNotCreatedRecovery: string;
  missingManualApprovalRecovery: string;
  missingManualConfirmationRecovery: string;
  killSwitchActiveRecovery: string;
  approvalExpiredRecovery: string;
  approvalRevokedRecovery: string;
  missingOpaqueCredentialRecovery: string;
  promptPayloadNotReviewedRecovery: string;
  privacyRedactionIncompleteRecovery: string;
  costRateTimeoutIncompleteRecovery: string;
  runnerContractIncompleteRecovery: string;
  dryRunRequestNotCreatedRecovery: string;
  runnerInvocationNotInvokedRecovery: string;
  dryRunExecutionNotExecutedRecovery: string;
  providerResponseNotReceivedRecovery: string;
  modelOutputNotGeneratedRecovery: string;
  fixtureResultNotProducedRecovery: string;
  queueDispatchBlockedRecovery: string;
  workerDispatchBlockedRecovery: string;
  jobExecutionBlockedRecovery: string;
  auditPersistenceMissingRecovery: string;
  resultPersistenceMissingRecovery: string;
  approvalPersistenceMissingRecovery: string;
  retryPosture: BackendDryRunRunnerRetryPosture;
  fallbackPosture: BackendDryRunRunnerFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
  explicitNoRetryNoFallbackNoExecutionStatement:
    BackendDryRunRunnerNoRetryNoFallbackNoExecutionStatement;
}>;

export type BackendDryRunRunnerRecoveryReadinessChecklistRecord = Readonly<{
  key: BackendDryRunRunnerRecoveryReadinessChecklistKey;
  checklistVersion: BackendDryRunRunnerRecoveryReadinessChecklistVersion;
  previewOnlyStatement: BackendDryRunRunnerRecoveryReadinessPreviewOnlyStatement;
  checklistId: BackendDryRunRunnerRecoveryReadinessChecklistId;
  label: BackendDryRunRunnerRecoveryReadinessChecklistLabel;
  state: BackendDryRunRunnerRecoveryReadinessState;
  severity: BackendDryRunRunnerReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: BackendDryRunRunnerRecoveryReadinessOwner;
  currentPosture: BackendDryRunRunnerReviewMode;
  syntheticRunnerSkeletonDependency:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
  nextSafeAction: string;
}>;

export type BackendDryRunRunnerReviewAuditSummaryRecord = Readonly<{
  key: BackendDryRunRunnerReviewAuditSummaryKey;
  auditSummaryVersion: BackendDryRunRunnerReviewAuditSummaryVersion;
  previewOnlyStatement:
    BackendDryRunRunnerReviewAuditSummaryPreviewOnlyStatement;
  dryRunRunnerReviewId: BackendDryRunRunnerReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  auditPosture: BackendDryRunRunnerAuditSummaryPosture;
  auditReferenceState: BackendDryRunRunnerReviewReferenceState;
  approvalReferenceState: BackendDryRunRunnerReviewReferenceState;
  resultReferenceState: BackendDryRunRunnerReviewReferenceState;
  evidenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noPromptSendingStatement: "No prompt sending";
  noProviderExecutionStatement: "No provider execution";
  noRunnerInvocationStatement: "No runner invocation";
  noQueueDispatchStatement: "No queue dispatch";
  noWorkerDispatchStatement: "No worker dispatch";
  noJobExecutionStatement: "No job execution";
  noPersistenceStatement: "No persistence";
  syntheticRunnerSkeletonRequirement:
    BackendDryRunRunnerSyntheticSkeletonRequirement;
}>;

export type BackendOwnedModelProviderDryRunRunnerAcceptancePostureRecord =
  Readonly<{
    key: BackendDryRunRunnerAcceptancePostureKey;
    acceptancePostureVersion: BackendDryRunRunnerAcceptancePostureVersion;
    previewOnlyStatement:
      BackendDryRunRunnerAcceptancePosturePreviewOnlyStatement;
    dryRunRunnerReviewId: BackendDryRunRunnerReviewId;
    label: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
    acceptanceState: BackendDryRunRunnerAcceptanceState;
    acceptanceBlockers: readonly string[];
    safetyBlockers: readonly string[];
    privacyBlockers: readonly string[];
    costRateBlockers: readonly string[];
    auditBlockers: readonly string[];
    approvalBlockers: readonly string[];
    runnerBlockers: readonly string[];
    queueWorkerJobBlockers: readonly string[];
    persistenceBlockers: readonly string[];
    requiredEvidence: readonly string[];
    nextSafeAction: string;
    explicitNoAcceptanceNoExecutionStatement:
      BackendDryRunRunnerNoAcceptanceNoExecutionStatement;
  }>;

export type BackendDryRunRunnerReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  reviewCount: number;
  reviews: readonly BackendOwnedModelProviderDryRunRunnerReviewRecord[];
}>;

export type BackendDryRunRunnerReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  reviewCount: number;
  reviews: readonly BackendOwnedModelProviderDryRunRunnerReviewRecord[];
}>;

export type BackendDryRunRunnerReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
  reviewCount: number;
  decisionReviewCount: number;
  gateFailureReviewCount: number;
  recoveryPlanCount: number;
  recoveryReadinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  summaryLines: readonly string[];
}>;

export type BackendDryRunRunnerGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH;
  gateFailureReviewCount: number;
  uniqueFailedGateCount: number;
  criticalGateCount: number;
  highGateCount: number;
  mediumGateCount: number;
  summaryLines: readonly string[];
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
}>;

export type BackendDryRunRunnerRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH;
  recoveryPlanCount: number;
  recoveryReadinessChecklistCount: number;
  blockedChecklistCount: number;
  acceptancePostureCount: number;
  summaryLines: readonly string[];
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
  nextSafeAction: string;
}>;
