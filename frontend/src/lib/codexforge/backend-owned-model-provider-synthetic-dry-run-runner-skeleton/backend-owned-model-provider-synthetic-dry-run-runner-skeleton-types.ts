import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
  AthenaModelRoutingProviderSlotLabel,
} from "../athena-model-routing-provider-selection-preview";
import type { BackendAdmissionContractKey } from "../backend-owned-model-provider-run-admission-contract";
import type {
  BackendDryRunRunnerContractId,
  BackendDryRunRunnerContractKey,
} from "../backend-owned-model-provider-dry-run-runner-contract";
import type { BackendDryRunRunnerReviewKey } from "../backend-owned-model-provider-dry-run-runner-review-recovery-preview";
import type { ModelProviderRunIntentKey } from "../model-provider-approval-packet-run-intent-preview";

export const BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH =
  "5034-5065 - Backend-Owned Model Provider Synthetic Dry-Run Runner Skeleton";

export const BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_PHASE =
  5065;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5002-5033 - Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH =
  "5066-5097 - Backend-Owned Synthetic Dry-Run Result Capture Contract";

export type SyntheticDryRunRunnerSkeletonId = BackendDryRunRunnerContractId;

export type SyntheticDryRunRunnerSkeletonVersion =
  "backend-owned-model-provider-synthetic-dry-run-runner-skeleton-v1";
export type SyntheticDryRunInputFixtureVersion =
  "backend-owned-model-provider-synthetic-dry-run-input-fixture-v1";
export type SyntheticDryRunOutputFixtureVersion =
  "backend-owned-model-provider-synthetic-dry-run-output-fixture-v1";
export type SyntheticDryRunErrorFixtureVersion =
  "backend-owned-model-provider-synthetic-dry-run-error-fixture-v1";
export type SyntheticRunnerGateVersion =
  "backend-owned-model-provider-synthetic-dry-run-runner-gate-v1";
export type SyntheticRunnerReadinessVersion =
  "backend-owned-model-provider-synthetic-dry-run-runner-readiness-v1";
export type SyntheticRunnerHandoffPreviewVersion =
  "backend-owned-model-provider-synthetic-dry-run-runner-handoff-preview-v1";

export type SyntheticRunnerSource = "Athena / Jarvis Model Gateway";
export type SyntheticRunnerOwner = "backend-owned";
export type SyntheticRunnerFrontendMode = "preview-only";
export type SyntheticRunnerSkeletonMode = "synthetic fixture-only";
export type SyntheticRunnerPreviewOnlyStatement =
  "synthetic runner skeleton is preview-only";
export type SyntheticRunnerState = "skeleton / not executable";
export type SyntheticDryRunRequestState = "not created";
export type SyntheticRunnerInvocationState = "not invoked";
export type SyntheticDryRunExecutionState = "not executed";
export type SyntheticProviderCallPosture = "not implemented";
export type SyntheticModelCallPosture = "not implemented";
export type SyntheticPromptSendingPosture = "not implemented";
export type SyntheticProviderResponseState = "not received";
export type SyntheticModelOutputState = "not generated";
export type SyntheticFixtureResultState = "static placeholder only";
export type SyntheticSdkPosture = "no SDK imports";
export type SyntheticCredentialPosture = "opaque credential references only";
export type SyntheticSecretPosture = "no plaintext secrets";
export type SyntheticFrontendPosture = "blocked";
export type SyntheticBackendPosture = "server-only required";
export type SyntheticExecutionPosture = "blocked by default";
export type SyntheticManualApprovalRequirement = "manual approval required";
export type SyntheticManualConfirmationRequirement =
  "manual confirmation required";
export type SyntheticKillSwitchRequirement = "kill switch required";
export type SyntheticAuditRequirement = "audit required";
export type SyntheticPrivacyRedactionRequirement =
  "privacy/redaction required";
export type SyntheticCostAcknowledgementRequirement =
  "cost acknowledgement required";
export type SyntheticRateLimitGuardRequirement = "rate limit guard required";
export type SyntheticTimeoutCancelGuardRequirement =
  "timeout/cancel guard required";
export type SyntheticIdempotencyRequirement = "idempotency required";
export type SyntheticReplayBlockRequirement = "replay block required";
export type SyntheticSingleRunLockRequirement = "single-run lock required";
export type SyntheticRetryExecutionPosture = "no retry execution";
export type SyntheticFallbackExecutionPosture = "no fallback execution";
export type SyntheticResultCaptureFutureRequirement =
  "result capture required in future";
export type SyntheticPersistenceState = "not implemented";

export type SyntheticDryRunInputFixtureMode = "static / synthetic";
export type SyntheticPromptPayloadPosture = "redacted placeholder only";
export type SyntheticPromptTransmissionState = "not sent";
export type SyntheticCredentialReferencePosture = "opaque label only";
export type SyntheticAdmissionTokenPosture = "not issued";
export type SyntheticAdmissionLeasePosture = "not created";
export type SyntheticIdempotencyKeyPosture =
  "deterministic preview key only";
export type SyntheticReplayBlockPosture = "replay block required";
export type SyntheticSingleRunLockPosture = "single-run lock required";
export type SyntheticTimeoutCancelPosture = "timeout/cancel guard required";
export type SyntheticNoRealInputNoPromptSentStatement =
  "No real input. No prompt sent.";

export type SyntheticDryRunOutputMode = "static placeholder only";
export type SyntheticSyntheticResultState = "placeholder only";
export type SyntheticTokenCostAccountingState = "placeholder only";
export type SyntheticSafetyReviewState = "preview-only";
export type SyntheticJoinState = "not persisted";
export type SyntheticResultCaptureState = "not implemented";
export type SyntheticNoRealOutputNoModelOutputStatement =
  "No real output. No model output.";

export type SyntheticDryRunErrorMode = "static preview only";
export type SyntheticProviderErrorState = "not received";
export type SyntheticRetryPosture = "disabled";
export type SyntheticFallbackPosture = "disabled";
export type SyntheticRecoveryPosture = "manual review only";
export type SyntheticNoRealErrorNoProviderErrorStatement =
  "No real error. No provider error.";

export type SyntheticRunnerGateOwner =
  | "backend skeleton"
  | "operator"
  | "safety review";
export type SyntheticRunnerGateCurrentState = "preview-only / blocked";
export type SyntheticRunnerGateId =
  | "backend-admission-contract"
  | "dry-run-runner-contract"
  | "dry-run-runner-review"
  | "synthetic-input-fixture"
  | "synthetic-output-fixture"
  | "synthetic-error-fixture"
  | "operator-approval"
  | "manual-confirmation"
  | "kill-switch"
  | "audit"
  | "server-only-boundary"
  | "no-frontend-provider-call"
  | "no-provider-sdk-import-in-frontend"
  | "no-prompt-sending"
  | "opaque-credential-reference"
  | "no-plaintext-secrets"
  | "privacy-redaction"
  | "cost-rate-timeout"
  | "idempotency-replay-block"
  | "single-run-lock"
  | "no-queue-dispatch"
  | "no-worker-dispatch"
  | "no-job-execution"
  | "no-persistence-until-future-backend-batch";
export type SyntheticRunnerGateLabel =
  | "backend admission contract"
  | "dry-run runner contract"
  | "dry-run runner review"
  | "synthetic input fixture"
  | "synthetic output fixture"
  | "synthetic error fixture"
  | "operator approval"
  | "manual confirmation"
  | "kill switch"
  | "audit"
  | "server-only boundary"
  | "no frontend provider call"
  | "no provider SDK import in frontend"
  | "no prompt sending"
  | "opaque credential reference"
  | "no plaintext secrets"
  | "privacy/redaction"
  | "cost/rate/timeout"
  | "idempotency/replay block"
  | "single-run lock"
  | "no queue dispatch"
  | "no worker dispatch"
  | "no job execution"
  | "no persistence until future backend batch";

export type SyntheticInputFixtureState = "preview-only / static";
export type SyntheticOutputFixtureState = "preview-only / static";
export type SyntheticErrorFixtureState = "preview-only / static";
export type SyntheticRunnerGateSchemaState = "preview-only / blocked";
export type SyntheticAdmissionContractDependencyState =
  "reviewed / preview-only";
export type SyntheticRunnerContractDependencyState =
  "reviewed / preview-only";
export type SyntheticRunnerReviewDependencyState = "reviewed / preview-only";
export type SyntheticCredentialBoundaryState =
  "opaque credential references only";
export type SyntheticSafetyBoundaryState = "manual review only / blocked";
export type SyntheticAuditBoundaryState = "preview-only / not persisted";
export type SyntheticApprovalBoundaryState = "preview-only / not persisted";
export type SyntheticQueueBoundaryState = "blocked";
export type SyntheticWorkerBoundaryState = "blocked";
export type SyntheticJobBoundaryState = "blocked";
export type SyntheticProviderAdapterBoundaryState =
  "server-only adapters required";
export type SyntheticPersistenceBoundaryState = "not implemented";
export type SyntheticCurrentReadiness = "skeleton-only / not executable";

export type SyntheticRunnerHandoffState = "preview-only / not handed off";
export type SyntheticBackendRunnerTarget = "synthetic skeleton only";
export type SyntheticProviderCallState = "not called";
export type SyntheticFixtureResultPlaceholderState = "placeholder only";
export type SyntheticQueueWorkerJobStateSummary = "blocked / blocked / blocked";
export type SyntheticNoHandoffNoExecutionStatement =
  "No handoff. No execution.";

export type SyntheticRunnerSkeletonKey =
  `backend-owned-model-provider-synthetic-dry-run-runner-skeleton:${SyntheticDryRunRunnerSkeletonId}`;
export type SyntheticDryRunInputFixtureKey =
  `backend-owned-model-provider-synthetic-dry-run-input-fixture:${SyntheticDryRunRunnerSkeletonId}`;
export type SyntheticDryRunOutputFixtureKey =
  `backend-owned-model-provider-synthetic-dry-run-output-fixture:${SyntheticDryRunRunnerSkeletonId}`;
export type SyntheticDryRunErrorFixtureKey =
  `backend-owned-model-provider-synthetic-dry-run-error-fixture:${SyntheticDryRunRunnerSkeletonId}`;
export type SyntheticRunnerGateKey =
  `backend-owned-model-provider-synthetic-dry-run-runner-gate:${SyntheticRunnerGateId}`;
export type SyntheticRunnerReadinessKey =
  `backend-owned-model-provider-synthetic-dry-run-runner-readiness:${SyntheticDryRunRunnerSkeletonId}`;
export type SyntheticRunnerHandoffPreviewKey =
  `backend-owned-model-provider-synthetic-dry-run-runner-handoff-preview:${SyntheticDryRunRunnerSkeletonId}`;

export type BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord =
  Readonly<{
    id: SyntheticDryRunRunnerSkeletonId;
    key: SyntheticRunnerSkeletonKey;
    skeletonVersion: SyntheticDryRunRunnerSkeletonVersion;
    previewOnlyStatement: SyntheticRunnerPreviewOnlyStatement;
    requestLabel: string;
    label: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    source: SyntheticRunnerSource;
    owner: SyntheticRunnerOwner;
    frontendMode: SyntheticRunnerFrontendMode;
    skeletonMode: SyntheticRunnerSkeletonMode;
    runnerState: SyntheticRunnerState;
    dryRunRequestState: SyntheticDryRunRequestState;
    runnerInvocationState: SyntheticRunnerInvocationState;
    dryRunExecutionState: SyntheticDryRunExecutionState;
    providerCallPosture: SyntheticProviderCallPosture;
    modelCallPosture: SyntheticModelCallPosture;
    promptSendingPosture: SyntheticPromptSendingPosture;
    providerResponseState: SyntheticProviderResponseState;
    modelOutputState: SyntheticModelOutputState;
    syntheticFixtureResultState: SyntheticFixtureResultState;
    sdkPosture: SyntheticSdkPosture;
    credentialPosture: SyntheticCredentialPosture;
    secretPosture: SyntheticSecretPosture;
    frontendPosture: SyntheticFrontendPosture;
    backendPosture: SyntheticBackendPosture;
    executionPosture: SyntheticExecutionPosture;
    sourceDryRunRunnerContractReference: BackendDryRunRunnerContractKey;
    sourceDryRunRunnerReviewReference: BackendDryRunRunnerReviewKey;
    sourceBackendAdmissionContractReference: BackendAdmissionContractKey;
    sourceRunIntentReference: ModelProviderRunIntentKey;
    selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
    providerSlotLabel: AthenaModelRoutingProviderSlotLabel;
    backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
    localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
    manualApprovalRequired: SyntheticManualApprovalRequirement;
    manualConfirmationRequired: SyntheticManualConfirmationRequirement;
    killSwitchRequired: SyntheticKillSwitchRequirement;
    auditRequired: SyntheticAuditRequirement;
    privacyRedactionRequired: SyntheticPrivacyRedactionRequirement;
    costAcknowledgementRequired: SyntheticCostAcknowledgementRequirement;
    rateLimitGuardRequired: SyntheticRateLimitGuardRequirement;
    timeoutCancelGuardRequired: SyntheticTimeoutCancelGuardRequirement;
    idempotencyRequired: SyntheticIdempotencyRequirement;
    replayBlockRequired: SyntheticReplayBlockRequirement;
    singleRunLockRequired: SyntheticSingleRunLockRequirement;
    noRetryExecution: SyntheticRetryExecutionPosture;
    noFallbackExecution: SyntheticFallbackExecutionPosture;
    resultCaptureRequiredInFuture: SyntheticResultCaptureFutureRequirement;
    resultPersistenceState: SyntheticPersistenceState;
    auditPersistenceState: SyntheticPersistenceState;
    approvalPersistenceState: SyntheticPersistenceState;
    nextSyntheticDryRunResultCaptureContractRequirement:
      typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH;
    blockedDefaultReason: string;
    nextSafeAction: string;
  }>;

export type SyntheticDryRunInputFixtureRecord = Readonly<{
  id: SyntheticDryRunRunnerSkeletonId;
  key: SyntheticDryRunInputFixtureKey;
  fixtureVersion: SyntheticDryRunInputFixtureVersion;
  requestLabel: string;
  syntheticRunnerSkeletonId: SyntheticDryRunRunnerSkeletonId;
  sourceRunIntentReference: ModelProviderRunIntentKey;
  sourceBackendAdmissionContractReference: BackendAdmissionContractKey;
  targetCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  fixtureMode: SyntheticDryRunInputFixtureMode;
  promptPayloadPosture: SyntheticPromptPayloadPosture;
  promptTransmissionState: SyntheticPromptTransmissionState;
  credentialReferencePosture: SyntheticCredentialReferencePosture;
  admissionTokenPosture: SyntheticAdmissionTokenPosture;
  admissionLeasePosture: SyntheticAdmissionLeasePosture;
  idempotencyKeyPosture: SyntheticIdempotencyKeyPosture;
  replayBlockPosture: SyntheticReplayBlockPosture;
  singleRunLockPosture: SyntheticSingleRunLockPosture;
  timeoutCancelPosture: SyntheticTimeoutCancelPosture;
  blockedDefaultReason: string;
  explicitNoRealInputNoPromptSentStatement:
    SyntheticNoRealInputNoPromptSentStatement;
}>;

export type SyntheticDryRunOutputFixtureRecord = Readonly<{
  id: SyntheticDryRunRunnerSkeletonId;
  key: SyntheticDryRunOutputFixtureKey;
  fixtureVersion: SyntheticDryRunOutputFixtureVersion;
  requestLabel: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  syntheticRunnerSkeletonId: SyntheticDryRunRunnerSkeletonId;
  sourceInputFixtureReference: SyntheticDryRunInputFixtureKey;
  outputMode: SyntheticDryRunOutputMode;
  providerResponseState: SyntheticProviderResponseState;
  modelOutputState: SyntheticModelOutputState;
  syntheticResultState: SyntheticSyntheticResultState;
  tokenCostAccountingState: SyntheticTokenCostAccountingState;
  safetyReviewState: SyntheticSafetyReviewState;
  auditJoinState: SyntheticJoinState;
  approvalJoinState: SyntheticJoinState;
  resultCaptureState: SyntheticResultCaptureState;
  blockedDefaultReason: string;
  explicitNoRealOutputNoModelOutputStatement:
    SyntheticNoRealOutputNoModelOutputStatement;
}>;

export type SyntheticDryRunErrorFixtureRecord = Readonly<{
  id: SyntheticDryRunRunnerSkeletonId;
  key: SyntheticDryRunErrorFixtureKey;
  fixtureVersion: SyntheticDryRunErrorFixtureVersion;
  requestLabel: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  syntheticRunnerSkeletonId: SyntheticDryRunRunnerSkeletonId;
  sourceInputFixtureReference: SyntheticDryRunInputFixtureKey;
  errorMode: SyntheticDryRunErrorMode;
  providerErrorState: SyntheticProviderErrorState;
  validationErrorExamples: readonly string[];
  admissionDeniedExamples: readonly string[];
  runnerInvocationDeniedExample: string;
  killSwitchDenialExample: string;
  credentialBoundaryDenialExample: string;
  privacyRedactionDenialExample: string;
  queueDispatchBlockedExample: string;
  workerDispatchBlockedExample: string;
  jobExecutionBlockedExample: string;
  retryPosture: SyntheticRetryPosture;
  fallbackPosture: SyntheticFallbackPosture;
  recoveryPosture: SyntheticRecoveryPosture;
  explicitNoRealErrorNoProviderErrorStatement:
    SyntheticNoRealErrorNoProviderErrorStatement;
}>;

export type SyntheticRunnerGateRecord = Readonly<{
  id: SyntheticRunnerGateId;
  key: SyntheticRunnerGateKey;
  gateVersion: SyntheticRunnerGateVersion;
  label: SyntheticRunnerGateLabel;
  owner: SyntheticRunnerGateOwner;
  requiredState: string;
  currentState: SyntheticRunnerGateCurrentState;
  evidenceRequirement: string;
  blockedDefaultReason: string;
  nextResultCaptureContractRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH;
}>;

export type SyntheticRunnerReadinessMatrixRecord = Readonly<{
  id: SyntheticDryRunRunnerSkeletonId;
  key: SyntheticRunnerReadinessKey;
  readinessVersion: SyntheticRunnerReadinessVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  skeletonState: SyntheticRunnerState;
  inputFixtureState: SyntheticInputFixtureState;
  outputFixtureState: SyntheticOutputFixtureState;
  errorFixtureState: SyntheticErrorFixtureState;
  gateSchemaState: SyntheticRunnerGateSchemaState;
  admissionContractDependencyState: SyntheticAdmissionContractDependencyState;
  runnerContractDependencyState: SyntheticRunnerContractDependencyState;
  runnerReviewDependencyState: SyntheticRunnerReviewDependencyState;
  credentialBoundaryState: SyntheticCredentialBoundaryState;
  safetyBoundaryState: SyntheticSafetyBoundaryState;
  auditBoundaryState: SyntheticAuditBoundaryState;
  approvalBoundaryState: SyntheticApprovalBoundaryState;
  queueBoundaryState: SyntheticQueueBoundaryState;
  workerBoundaryState: SyntheticWorkerBoundaryState;
  jobBoundaryState: SyntheticJobBoundaryState;
  providerAdapterBoundaryState: SyntheticProviderAdapterBoundaryState;
  persistenceBoundaryState: SyntheticPersistenceBoundaryState;
  resultCaptureDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH;
  currentReadiness: SyntheticCurrentReadiness;
  nextSafeAction: string;
}>;

export type SyntheticRunnerHandoffPreviewRecord = Readonly<{
  id: SyntheticDryRunRunnerSkeletonId;
  key: SyntheticRunnerHandoffPreviewKey;
  handoffPreviewVersion: SyntheticRunnerHandoffPreviewVersion;
  requestLabel: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  syntheticRunnerSkeletonId: SyntheticDryRunRunnerSkeletonId;
  sourceBackendAdmissionContractReference: BackendAdmissionContractKey;
  sourceRunnerContractReference: BackendDryRunRunnerContractKey;
  sourceRunnerReviewReference: BackendDryRunRunnerReviewKey;
  handoffState: SyntheticRunnerHandoffState;
  backendRunnerTarget: SyntheticBackendRunnerTarget;
  dryRunRequestState: SyntheticDryRunRequestState;
  runnerInvocationState: SyntheticRunnerInvocationState;
  providerCallState: SyntheticProviderCallState;
  modelOutputState: SyntheticModelOutputState;
  fixtureResultState: SyntheticFixtureResultPlaceholderState;
  auditJoinState: SyntheticJoinState;
  approvalJoinState: SyntheticJoinState;
  queueWorkerJobStateSummary: SyntheticQueueWorkerJobStateSummary;
  blockedDefaultReason: string;
  explicitNoHandoffNoExecutionStatement:
    SyntheticNoHandoffNoExecutionStatement;
}>;

export type SyntheticRunnerSkeletonCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  skeletonCount: number;
  skeletons: readonly BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord[];
}>;

export type SyntheticRunnerSkeletonWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  skeletonCount: number;
  skeletons: readonly BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord[];
}>;

export type SyntheticRunnerSkeletonSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH;
  skeletonCount: number;
  inputFixtureCount: number;
  outputFixtureCount: number;
  errorFixtureCount: number;
  gateCount: number;
  readinessRecordCount: number;
  handoffPreviewCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  runnerState: SyntheticRunnerState;
  currentReadiness: SyntheticCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type SyntheticRunnerGateSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH;
  gateCount: number;
  backendSkeletonGateCount: number;
  operatorGateCount: number;
  safetyReviewGateCount: number;
  summaryLines: readonly string[];
}>;

export type SyntheticRunnerReadinessSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH;
  readinessRecordCount: number;
  currentReadiness: SyntheticCurrentReadiness;
  nextSafeAction: string;
  summaryLines: readonly string[];
}>;

export type SyntheticRunnerGateSeed = Readonly<{
  id: SyntheticRunnerGateId;
  label: SyntheticRunnerGateLabel;
  owner: SyntheticRunnerGateOwner;
  requiredState: string;
  evidenceRequirement: string;
  blockedDefaultReason: string;
}>;
