import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
  AthenaModelRoutingPreviewId,
  AthenaModelRoutingProviderSlotLabel,
} from "../athena-model-routing-provider-selection-preview";
import type {
  BackendAdmissionContractKey,
  BackendAdmissionErrorContractKey,
  BackendAdmissionRequestContractKey,
  BackendAdmissionResponseContractKey,
  BackendContractGateSchemaKey,
  BackendContractReadinessMatrixKey,
} from "../backend-owned-model-provider-run-admission-contract";
import type { ModelProviderRunIntentKey } from "../model-provider-approval-packet-run-intent-preview";

export const BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH =
  "4970-5001 - Backend-Owned Model Provider Dry-Run Runner Contract";

export const BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_PHASE = 5001;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH =
  "4938-4969 - Backend-Owned Model Provider Run Admission Contract";

export const NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5002-5033 - Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview";

export type BackendDryRunRunnerContractId = AthenaModelRoutingPreviewId;

export type BackendOwnedDryRunRunnerContractVersion =
  "backend-owned-model-provider-dry-run-runner-contract-v1";
export type BackendDryRunRequestContractVersion =
  "backend-owned-model-provider-dry-run-request-contract-v1";
export type BackendDryRunResponseContractVersion =
  "backend-owned-model-provider-dry-run-response-contract-v1";
export type BackendDryRunErrorContractVersion =
  "backend-owned-model-provider-dry-run-error-contract-v1";
export type BackendDryRunRunnerGateSchemaVersion =
  "backend-owned-model-provider-dry-run-runner-gate-schema-v1";
export type BackendDryRunRunnerReadinessMatrixVersion =
  "backend-owned-model-provider-dry-run-runner-readiness-matrix-v1";
export type BackendDryRunRunnerHandoffPreviewVersion =
  "backend-owned-model-provider-dry-run-runner-handoff-preview-v1";

export type BackendDryRunRunnerContractSource = "Athena / Jarvis Model Gateway";
export type BackendDryRunRunnerContractOwner = "backend-owned";
export type BackendDryRunRunnerFrontendMode = "preview-only";
export type BackendDryRunRunnerContractMode = "contract-only";
export type BackendDryRunRunnerContractPreviewOnlyStatement =
  "backend-owned dry-run runner contract is preview-only";
export type BackendDryRunRequestPreviewOnlyStatement =
  "dry-run request contract preview";
export type BackendDryRunResponsePreviewOnlyStatement =
  "dry-run response contract preview";
export type BackendDryRunErrorPreviewOnlyStatement =
  "dry-run error contract preview";
export type BackendDryRunRunnerGateSchemaPreviewOnlyStatement =
  "dry-run runner gate schema is preview-only";
export type BackendDryRunRunnerReadinessPreviewOnlyStatement =
  "dry-run runner readiness matrix is preview-only";
export type BackendDryRunRunnerHandoffPreviewOnlyStatement =
  "dry-run runner handoff preview is preview-only";
export type BackendDryRunRunnerPosture =
  "contract-defined / not executable";
export type BackendDryRunRunnerInvocationPosture = "not implemented";
export type BackendDryRunRunnerProviderCallPosture = "not implemented";
export type BackendDryRunRunnerModelCallPosture = "not implemented";
export type BackendDryRunRunnerPromptSendingPosture = "not implemented";
export type BackendDryRunRunnerSdkPosture = "no SDK imports";
export type BackendDryRunRunnerCredentialPosture =
  "opaque credential references only";
export type BackendDryRunRunnerSecretPosture = "no plaintext secrets";
export type BackendDryRunRunnerFrontendPosture = "blocked";
export type BackendDryRunRunnerBackendPosture = "server-only required";
export type BackendDryRunRunnerExecutionPosture = "blocked by default";
export type BackendDryRunRunnerContractState = "draft / preview-only";
export type BackendDryRunRequestCreationState = "not created";
export type BackendDryRunInvocationState = "not invoked";
export type BackendDryRunExecutionState = "not executed";
export type BackendDryRunResponseState = "not received";
export type BackendDryRunProviderResponseState = "not received";
export type BackendDryRunModelOutputState = "not generated";
export type BackendDryRunFixtureResultState = "not produced";
export type BackendDryRunDecisionState = "not evaluated";
export type BackendDryRunAdmissionTokenState = "not issued";
export type BackendDryRunAdmissionLeaseState = "not created";
export type BackendDryRunDispatchState = "not dispatched";
export type BackendDryRunJobExecutionState = "not executed";
export type BackendDryRunResultCaptureState = "not implemented";
export type BackendDryRunJoinState = "not persisted";
export type BackendDryRunManualApprovalRequirement =
  "manual approval required";
export type BackendDryRunManualConfirmationRequirement =
  "manual confirmation required";
export type BackendDryRunKillSwitchRequirement = "kill switch required";
export type BackendDryRunAuditRequirement = "audit required";
export type BackendDryRunPrivacyRedactionRequirement =
  "privacy/redaction required";
export type BackendDryRunCostAcknowledgementRequirement =
  "cost acknowledgement required";
export type BackendDryRunRateLimitGuardRequirement =
  "rate limit guard required";
export type BackendDryRunTimeoutCancelGuardRequirement =
  "timeout/cancel guard required";
export type BackendDryRunIdempotencyRequirement =
  "idempotency required";
export type BackendDryRunReplayBlockRequirement =
  "replay block required";
export type BackendDryRunSingleRunLockRequirement =
  "single-run lock required";
export type BackendDryRunResultReviewFutureRequirement =
  "dry-run result review required in future";
export type BackendDryRunAcceptanceMatrixReviewRequirement =
  "acceptance matrix review required";
export type BackendDryRunApprovalExpiryReviewRequirement =
  "approval expiry review required";
export type BackendDryRunApprovalRevocationReviewRequirement =
  "approval revocation review required";
export type BackendDryRunRetryExecutionPosture =
  "no retry execution";
export type BackendDryRunFallbackExecutionPosture =
  "no fallback execution";
export type BackendDryRunPromptPayloadPosture =
  "redacted placeholder only";
export type BackendDryRunPromptTransmissionState = "not sent";
export type BackendDryRunCredentialReferencePosture =
  "opaque label only";
export type BackendDryRunReferencePosture = "preview-only";
export type BackendDryRunIdempotencyKeyPosture =
  "deterministic preview key only";
export type BackendDryRunTimeoutCancelPosture =
  "timeout/cancel guard required";
export type BackendDryRunReplayBlockPosture = "replay block required";
export type BackendDryRunSingleRunLockPosture =
  "single-run lock required";
export type BackendDryRunExplicitNoRequestStatement =
  "No backend dry-run request is created.";
export type BackendDryRunExplicitNoResponseStatement =
  "No backend dry-run response is received.";
export type BackendDryRunExplicitNoErrorStatement =
  "No backend dry-run error is received.";
export type BackendDryRunRunnerGateOwner =
  | "backend-owned runner contract"
  | "operator"
  | "safety review";
export type BackendDryRunRunnerGateFrontendState = "preview-only";
export type BackendDryRunRunnerGateId =
  | "backend-admission-contract"
  | "admission-token"
  | "admission-lease"
  | "operator-approval"
  | "manual-confirmation"
  | "approval-scope"
  | "approval-expiry"
  | "approval-revocation"
  | "kill-switch"
  | "audit"
  | "server-only-boundary"
  | "no-frontend-provider-call"
  | "no-provider-sdk-import-in-frontend"
  | "no-prompt-sending-from-frontend"
  | "opaque-credential-reference"
  | "no-plaintext-secrets"
  | "privacy-redaction"
  | "cost-acknowledgement"
  | "rate-limit-guard"
  | "timeout-cancel-guard"
  | "idempotency"
  | "replay-block"
  | "single-run-lock"
  | "dry-run-request-contract"
  | "dry-run-response-contract"
  | "dry-run-error-contract"
  | "no-queue-dispatch-until-backend-runner-implementation"
  | "no-worker-dispatch-until-backend-runner-implementation"
  | "no-job-execution-until-backend-runner-implementation"
  | "no-persistence-until-future-backend-batch";
export type BackendDryRunRunnerGateLabel =
  | "backend admission contract"
  | "admission token"
  | "admission lease"
  | "operator approval"
  | "manual confirmation"
  | "approval scope"
  | "approval expiry"
  | "approval revocation"
  | "kill switch"
  | "audit"
  | "server-only boundary"
  | "no frontend provider call"
  | "no provider SDK import in frontend"
  | "no prompt sending from frontend"
  | "opaque credential reference"
  | "no plaintext secrets"
  | "privacy/redaction"
  | "cost acknowledgement"
  | "rate limit guard"
  | "timeout/cancel guard"
  | "idempotency"
  | "replay block"
  | "single-run lock"
  | "dry-run request contract"
  | "dry-run response contract"
  | "dry-run error contract"
  | "no queue dispatch until backend runner implementation"
  | "no worker dispatch until backend runner implementation"
  | "no job execution until backend runner implementation"
  | "no persistence until future backend batch";
export type BackendDryRunRunnerGateNextRequirement =
  typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH;
export type BackendDryRunRunnerGateSchemaState = "preview-only";
export type BackendDryRunRunnerCurrentReadiness =
  "not executable / contract-only";
export type BackendDryRunRunnerAdmissionDependencyState =
  "preview-only dependency satisfied";
export type BackendDryRunRunnerCredentialBoundaryState =
  "opaque credential references only";
export type BackendDryRunRunnerSafetyBoundaryState =
  "manual review only / blocked";
export type BackendDryRunRunnerAuditBoundaryState =
  "preview-only / not persisted";
export type BackendDryRunRunnerApprovalBoundaryState =
  "preview-only / not persisted";
export type BackendDryRunRunnerProviderAdapterBoundaryState =
  "server-only adapters required";
export type BackendDryRunRunnerPersistenceBoundaryState =
  "not implemented";
export type BackendDryRunRunnerNextRequirement =
  "backend-owned dry-run runner review and recovery preview next";
export type BackendDryRunRunnerHandoffState =
  "preview-only / not handed off";
export type BackendDryRunRunnerTarget = "contract-only";
export type BackendDryRunRunnerProviderCallState = "not called";
export type BackendDryRunRunnerQueueWorkerJobStateSummary =
  "not dispatched / not dispatched / not executed";
export type BackendDryRunRunnerExplicitNoHandoffStatement =
  "No backend dry-run handoff or execution occurs.";

export type BackendDryRunRunnerContractKey =
  `backend-owned-model-provider-dry-run-runner-contract:${BackendDryRunRunnerContractId}`;
export type BackendDryRunRequestContractKey =
  `backend-owned-model-provider-dry-run-request-contract:${BackendDryRunRunnerContractId}`;
export type BackendDryRunResponseContractKey =
  `backend-owned-model-provider-dry-run-response-contract:${BackendDryRunRunnerContractId}`;
export type BackendDryRunErrorContractKey =
  `backend-owned-model-provider-dry-run-error-contract:${BackendDryRunRunnerContractId}`;
export type BackendDryRunRunnerGateSchemaKey =
  `backend-owned-model-provider-dry-run-runner-gate-schema:${BackendDryRunRunnerGateId}`;
export type BackendDryRunRunnerReadinessMatrixKey =
  `backend-owned-model-provider-dry-run-runner-readiness-matrix:${BackendDryRunRunnerContractId}`;
export type BackendDryRunRunnerHandoffPreviewKey =
  `backend-owned-model-provider-dry-run-runner-handoff-preview:${BackendDryRunRunnerContractId}`;

export type BackendOwnedModelProviderDryRunRunnerContractRecord = Readonly<{
  id: BackendDryRunRunnerContractId;
  key: BackendDryRunRunnerContractKey;
  contractVersion: BackendOwnedDryRunRunnerContractVersion;
  previewOnlyStatement: BackendDryRunRunnerContractPreviewOnlyStatement;
  label: string;
  operatorRequestPhrase: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  source: BackendDryRunRunnerContractSource;
  contractOwner: BackendDryRunRunnerContractOwner;
  frontendMode: BackendDryRunRunnerFrontendMode;
  contractMode: BackendDryRunRunnerContractMode;
  dryRunRunnerPosture: BackendDryRunRunnerPosture;
  runnerInvocationPosture: BackendDryRunRunnerInvocationPosture;
  providerCallPosture: BackendDryRunRunnerProviderCallPosture;
  modelCallPosture: BackendDryRunRunnerModelCallPosture;
  promptSendingPosture: BackendDryRunRunnerPromptSendingPosture;
  sdkPosture: BackendDryRunRunnerSdkPosture;
  credentialPosture: BackendDryRunRunnerCredentialPosture;
  secretPosture: BackendDryRunRunnerSecretPosture;
  frontendPosture: BackendDryRunRunnerFrontendPosture;
  backendPosture: BackendDryRunRunnerBackendPosture;
  executionPosture: BackendDryRunRunnerExecutionPosture;
  sourceBackendAdmissionContractReference: BackendAdmissionContractKey;
  sourceBackendAdmissionRequestContractReference:
    BackendAdmissionRequestContractKey;
  sourceBackendAdmissionResponseContractReference:
    BackendAdmissionResponseContractKey;
  sourceBackendAdmissionErrorContractReference:
    BackendAdmissionErrorContractKey;
  sourceBackendContractGateSchemaReference: BackendContractGateSchemaKey;
  sourceBackendContractReadinessMatrixReference:
    BackendContractReadinessMatrixKey;
  sourceRunIntentReference: ModelProviderRunIntentKey;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  providerSlotLabel: AthenaModelRoutingProviderSlotLabel;
  backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
  localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
  dryRunRunnerContractState: BackendDryRunRunnerContractState;
  dryRunRequestState: BackendDryRunRequestCreationState;
  dryRunInvocationState: BackendDryRunInvocationState;
  dryRunExecutionState: BackendDryRunExecutionState;
  providerResponseState: BackendDryRunProviderResponseState;
  modelOutputState: BackendDryRunModelOutputState;
  fixtureResultState: BackendDryRunFixtureResultState;
  admissionTokenState: BackendDryRunAdmissionTokenState;
  admissionLeaseState: BackendDryRunAdmissionLeaseState;
  queueDispatchState: BackendDryRunDispatchState;
  workerDispatchState: BackendDryRunDispatchState;
  jobExecutionState: BackendDryRunJobExecutionState;
  resultCaptureState: BackendDryRunResultCaptureState;
  auditJoinState: BackendDryRunJoinState;
  approvalJoinState: BackendDryRunJoinState;
  manualApprovalRequired: BackendDryRunManualApprovalRequirement;
  manualConfirmationRequired: BackendDryRunManualConfirmationRequirement;
  killSwitchRequired: BackendDryRunKillSwitchRequirement;
  auditRequired: BackendDryRunAuditRequirement;
  privacyRedactionRequired: BackendDryRunPrivacyRedactionRequirement;
  costAcknowledgementRequired: BackendDryRunCostAcknowledgementRequirement;
  rateLimitGuardRequired: BackendDryRunRateLimitGuardRequirement;
  timeoutCancelGuardRequired: BackendDryRunTimeoutCancelGuardRequirement;
  idempotencyRequired: BackendDryRunIdempotencyRequirement;
  replayBlockRequired: BackendDryRunReplayBlockRequirement;
  singleRunLockRequired: BackendDryRunSingleRunLockRequirement;
  dryRunResultReviewRequiredInFuture:
    BackendDryRunResultReviewFutureRequirement;
  acceptanceMatrixReviewRequired:
    BackendDryRunAcceptanceMatrixReviewRequirement;
  approvalExpiryReviewRequired:
    BackendDryRunApprovalExpiryReviewRequirement;
  approvalRevocationReviewRequired:
    BackendDryRunApprovalRevocationReviewRequirement;
  noRetryExecution: BackendDryRunRetryExecutionPosture;
  noFallbackExecution: BackendDryRunFallbackExecutionPosture;
  blockedDefaultReason: string;
  nextSafeAction: string;
  nextDryRunRunnerReviewRecoveryRequirement:
    BackendDryRunRunnerNextRequirement;
}>;

export type BackendDryRunRequestContractRecord = Readonly<{
  id: BackendDryRunRunnerContractId;
  key: BackendDryRunRequestContractKey;
  requestContractVersion: BackendDryRunRequestContractVersion;
  previewOnlyStatement: BackendDryRunRequestPreviewOnlyStatement;
  backendDryRunRunnerContractId: BackendDryRunRunnerContractId;
  sourceBackendAdmissionContractReference: BackendAdmissionContractKey;
  sourceRunIntentReference: ModelProviderRunIntentKey;
  targetCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  targetProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  requestCreationState: BackendDryRunRequestCreationState;
  runnerInvocationState: BackendDryRunInvocationState;
  promptPayloadPosture: BackendDryRunPromptPayloadPosture;
  promptTransmissionState: BackendDryRunPromptTransmissionState;
  credentialReferencePosture: BackendDryRunCredentialReferencePosture;
  approvalReferencePosture: BackendDryRunReferencePosture;
  auditReferencePosture: BackendDryRunReferencePosture;
  admissionTokenPosture: BackendDryRunAdmissionTokenState;
  admissionLeasePosture: BackendDryRunAdmissionLeaseState;
  idempotencyKeyPosture: BackendDryRunIdempotencyKeyPosture;
  replayBlockPosture: BackendDryRunReplayBlockPosture;
  singleRunLockPosture: BackendDryRunSingleRunLockPosture;
  timeoutCancelPosture: BackendDryRunTimeoutCancelPosture;
  serverOnlyBoundaryRequirement: BackendDryRunRunnerBackendPosture;
  blockedDefaultReason: string;
  explicitNoBackendDryRunRequestCreatedStatement:
    BackendDryRunExplicitNoRequestStatement;
}>;

export type BackendDryRunResponseContractRecord = Readonly<{
  id: BackendDryRunRunnerContractId;
  key: BackendDryRunResponseContractKey;
  responseContractVersion: BackendDryRunResponseContractVersion;
  previewOnlyStatement: BackendDryRunResponsePreviewOnlyStatement;
  backendDryRunRunnerContractId: BackendDryRunRunnerContractId;
  requestContractReference: BackendDryRunRequestContractKey;
  responseState: BackendDryRunResponseState;
  dryRunDecisionState: BackendDryRunDecisionState;
  runnerInvocationState: BackendDryRunInvocationState;
  dryRunExecutionState: BackendDryRunExecutionState;
  providerResponseState: BackendDryRunProviderResponseState;
  modelOutputState: BackendDryRunModelOutputState;
  fixtureResultState: BackendDryRunFixtureResultState;
  tokenCostAccountingState: "not available";
  queueDispatchState: BackendDryRunDispatchState;
  workerDispatchState: BackendDryRunDispatchState;
  jobExecutionState: BackendDryRunJobExecutionState;
  resultState: "not available";
  auditJoinState: BackendDryRunJoinState;
  approvalJoinState: BackendDryRunJoinState;
  blockedDefaultReason: string;
  explicitNoBackendDryRunResponseReceivedStatement:
    BackendDryRunExplicitNoResponseStatement;
}>;

export type BackendDryRunErrorContractRecord = Readonly<{
  id: BackendDryRunRunnerContractId;
  key: BackendDryRunErrorContractKey;
  errorContractVersion: BackendDryRunErrorContractVersion;
  previewOnlyStatement: BackendDryRunErrorPreviewOnlyStatement;
  backendDryRunRunnerContractId: BackendDryRunRunnerContractId;
  requestContractReference: BackendDryRunRequestContractKey;
  errorState: BackendDryRunResponseState;
  validationErrorExamples: readonly string[];
  admissionDeniedExamples: readonly string[];
  runnerInvocationDeniedExample: string;
  killSwitchDenialExample: string;
  approvalStaleDenialExample: string;
  credentialBoundaryDenialExample: string;
  privacyRedactionDenialExample: string;
  rateTimeoutDenialExample: string;
  queueDispatchBlockedExample: string;
  workerDispatchBlockedExample: string;
  jobExecutionBlockedExample: string;
  retryPosture: "disabled";
  fallbackPosture: "disabled";
  recoveryPosture: "manual review only";
  explicitNoBackendDryRunErrorReceivedStatement:
    BackendDryRunExplicitNoErrorStatement;
}>;

export type BackendDryRunRunnerGateSchemaRecord = Readonly<{
  key: BackendDryRunRunnerGateSchemaKey;
  gateSchemaVersion: BackendDryRunRunnerGateSchemaVersion;
  previewOnlyStatement: BackendDryRunRunnerGateSchemaPreviewOnlyStatement;
  id: BackendDryRunRunnerGateId;
  label: BackendDryRunRunnerGateLabel;
  owner: BackendDryRunRunnerGateOwner;
  requiredState: string;
  currentFrontendState: BackendDryRunRunnerGateFrontendState;
  evidenceRequirement: string;
  blockedDefaultReason: string;
  nextBackendRunnerRequirement: BackendDryRunRunnerGateNextRequirement;
}>;

export type BackendDryRunRunnerReadinessMatrixRecord = Readonly<{
  id: BackendDryRunRunnerContractId;
  key: BackendDryRunRunnerReadinessMatrixKey;
  readinessMatrixVersion: BackendDryRunRunnerReadinessMatrixVersion;
  previewOnlyStatement: BackendDryRunRunnerReadinessPreviewOnlyStatement;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  runnerContractDraftState: BackendDryRunRunnerContractState;
  dryRunRequestContractState: BackendDryRunRequestCreationState;
  dryRunResponseContractState: BackendDryRunResponseState;
  dryRunErrorContractState: BackendDryRunResponseState;
  runnerGateSchemaState: BackendDryRunRunnerGateSchemaState;
  admissionContractDependencyState:
    BackendDryRunRunnerAdmissionDependencyState;
  admissionTokenState: BackendDryRunAdmissionTokenState;
  admissionLeaseState: BackendDryRunAdmissionLeaseState;
  credentialBoundaryState: BackendDryRunRunnerCredentialBoundaryState;
  safetyBoundaryState: BackendDryRunRunnerSafetyBoundaryState;
  auditBoundaryState: BackendDryRunRunnerAuditBoundaryState;
  approvalBoundaryState: BackendDryRunRunnerApprovalBoundaryState;
  queueBoundaryState: BackendDryRunDispatchState;
  workerBoundaryState: BackendDryRunDispatchState;
  jobBoundaryState: BackendDryRunJobExecutionState;
  providerAdapterBoundaryState:
    BackendDryRunRunnerProviderAdapterBoundaryState;
  persistenceBoundaryState:
    BackendDryRunRunnerPersistenceBoundaryState;
  dryRunReviewRecoveryDependency:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH;
  currentReadiness: BackendDryRunRunnerCurrentReadiness;
  nextSafeAction: string;
}>;

export type BackendDryRunRunnerHandoffPreviewRecord = Readonly<{
  id: BackendDryRunRunnerContractId;
  key: BackendDryRunRunnerHandoffPreviewKey;
  handoffPreviewVersion: BackendDryRunRunnerHandoffPreviewVersion;
  previewOnlyStatement: BackendDryRunRunnerHandoffPreviewOnlyStatement;
  backendDryRunRunnerContractId: BackendDryRunRunnerContractId;
  sourceAdmissionContractReference: BackendAdmissionContractKey;
  sourceRunIntentReference: ModelProviderRunIntentKey;
  handoffState: BackendDryRunRunnerHandoffState;
  backendRunnerTarget: BackendDryRunRunnerTarget;
  dryRunRequestState: BackendDryRunRequestCreationState;
  runnerInvocationState: BackendDryRunInvocationState;
  providerCallState: BackendDryRunRunnerProviderCallState;
  modelOutputState: BackendDryRunModelOutputState;
  auditJoinState: BackendDryRunJoinState;
  approvalJoinState: BackendDryRunJoinState;
  queueWorkerJobStateSummary: BackendDryRunRunnerQueueWorkerJobStateSummary;
  blockedDefaultReason: string;
  explicitNoHandoffNoExecutionStatement:
    BackendDryRunRunnerExplicitNoHandoffStatement;
}>;

export type BackendDryRunRunnerContractCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  contractCount: number;
  contracts: readonly BackendOwnedModelProviderDryRunRunnerContractRecord[];
}>;

export type BackendDryRunRunnerContractWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  contractCount: number;
  contracts: readonly BackendOwnedModelProviderDryRunRunnerContractRecord[];
}>;

export type BackendDryRunRunnerContractSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH;
  contractCount: number;
  requestContractCount: number;
  responseContractCount: number;
  errorContractCount: number;
  gateSchemaCount: number;
  readinessMatrixCount: number;
  handoffPreviewCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  runnerContractState: BackendDryRunRunnerContractState;
  currentReadiness: BackendDryRunRunnerCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type BackendDryRunRunnerGateSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH;
  gateCount: number;
  operatorOwnedGateCount: number;
  backendOwnedGateCount: number;
  safetyReviewGateCount: number;
  summaryLines: readonly string[];
}>;

export type BackendDryRunRunnerReadinessSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH;
  readinessMatrixCount: number;
  currentReadiness: BackendDryRunRunnerCurrentReadiness;
  nextSafeAction: string;
  summaryLines: readonly string[];
}>;

export type BackendDryRunRunnerGateSchemaSeed = Readonly<{
  id: BackendDryRunRunnerGateId;
  label: BackendDryRunRunnerGateLabel;
  owner: BackendDryRunRunnerGateOwner;
  requiredState: string;
  evidenceRequirement: string;
  blockedDefaultReason: string;
}>;
