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
  ModelProviderAdmissionDecisionReviewKey,
  ModelProviderAdmissionGateFailureId,
  ModelProviderAdmissionGateFailureReviewKey,
  ModelProviderAdmissionRecoveryPlanKey,
  ModelProviderAdmissionRecoveryReadinessChecklistId,
  ModelProviderAdmissionRecoveryReadinessChecklistKey,
  ModelProviderAdmissionReviewAuditSummaryKey,
  ModelProviderRunAdmissionReviewKey,
} from "../model-provider-run-admission-review-recovery-preview";
import type {
  ModelProviderApprovalPacketKey,
  ModelProviderRunIntentKey,
} from "../model-provider-approval-packet-run-intent-preview";

export const BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH =
  "4938-4969 - Backend-Owned Model Provider Run Admission Contract";

export const BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_PHASE = 4969;

export const PREVIOUS_COMPLETED_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "4906-4937 - Model Provider Run Admission Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH =
  "4970-5001 - Backend-Owned Model Provider Dry-Run Runner Contract";

export type BackendAdmissionContractId = AthenaModelRoutingPreviewId;

export type BackendOwnedRunAdmissionContractVersion =
  "backend-owned-model-provider-run-admission-contract-v1";
export type BackendAdmissionRequestContractVersion =
  "backend-owned-model-provider-run-admission-request-contract-v1";
export type BackendAdmissionResponseContractVersion =
  "backend-owned-model-provider-run-admission-response-contract-v1";
export type BackendAdmissionErrorContractVersion =
  "backend-owned-model-provider-run-admission-error-contract-v1";
export type BackendOwnedContractGateSchemaVersion =
  "backend-owned-model-provider-run-admission-gate-schema-v1";
export type BackendContractReadinessMatrixVersion =
  "backend-owned-model-provider-run-admission-readiness-matrix-v1";

export type BackendAdmissionContractSource = "Athena / Jarvis Model Gateway";
export type BackendAdmissionContractOwner = "backend-owned";
export type BackendAdmissionFrontendMode = "preview-only";
export type BackendAdmissionContractMode = "contract-only";
export type BackendAdmissionContractPreviewOnlyStatement =
  "backend-owned contract is preview-only";
export type BackendAdmissionRequestPreviewOnlyStatement =
  "request contract preview";
export type BackendAdmissionResponsePreviewOnlyStatement =
  "response contract preview";
export type BackendAdmissionErrorPreviewOnlyStatement =
  "error contract preview";
export type BackendContractGateSchemaPreviewOnlyStatement =
  "gate schema is preview-only";
export type BackendContractReadinessPreviewOnlyStatement =
  "readiness matrix is preview-only";
export type BackendAdmissionRunPosture = "contract-defined / not executable";
export type BackendAdmissionProviderCallPosture = "not implemented";
export type BackendAdmissionModelCallPosture = "not implemented";
export type BackendAdmissionPromptSendingPosture = "not implemented";
export type BackendAdmissionSdkPosture = "no SDK imports";
export type BackendAdmissionCredentialPosture =
  "opaque credential references only";
export type BackendAdmissionSecretPosture = "no plaintext secrets";
export type BackendAdmissionFrontendPosture = "blocked";
export type BackendAdmissionBackendPosture = "server-only required";
export type BackendAdmissionExecutionPosture = "blocked by default";
export type BackendAdmissionContractState = "draft / preview-only";
export type BackendAdmissionRequestCreationState = "not created";
export type BackendAdmissionResponseState = "not received";
export type BackendAdmissionErrorState = "not received";
export type BackendAdmissionDecisionState = "not evaluated";
export type BackendAdmissionTokenState = "not issued";
export type BackendAdmissionLeaseState = "not created";
export type BackendAdmissionTicketState = "not issued";
export type BackendAdmissionDispatchState = "not dispatched";
export type BackendAdmissionJobExecutionState = "not executed";
export type BackendAdmissionResultCaptureState = "not implemented";
export type BackendAdmissionJoinState = "not persisted";
export type BackendAdmissionManualApprovalRequirement =
  "manual approval required";
export type BackendAdmissionManualConfirmationRequirement =
  "manual confirmation required";
export type BackendAdmissionKillSwitchRequirement =
  "kill switch required";
export type BackendAdmissionAuditRequirement = "audit required";
export type BackendAdmissionPrivacyRedactionRequirement =
  "privacy/redaction required";
export type BackendAdmissionCostAcknowledgementRequirement =
  "cost acknowledgement required";
export type BackendAdmissionRateLimitGuardRequirement =
  "rate limit guard required";
export type BackendAdmissionTimeoutCancelGuardRequirement =
  "timeout/cancel guard required";
export type BackendAdmissionIdempotencyRequirement =
  "idempotency required";
export type BackendAdmissionReplayBlockRequirement =
  "replay block required";
export type BackendAdmissionSingleRunLockRequirement =
  "single-run lock required";
export type BackendAdmissionDryRunResultReviewRequirement =
  "dry-run result review required";
export type BackendAdmissionAcceptanceMatrixReviewRequirement =
  "acceptance matrix review required";
export type BackendAdmissionApprovalExpiryReviewRequirement =
  "approval expiry review required";
export type BackendAdmissionApprovalRevocationReviewRequirement =
  "approval revocation review required";
export type BackendAdmissionRetryExecutionPosture =
  "no retry execution";
export type BackendAdmissionFallbackExecutionPosture =
  "no fallback execution";
export type BackendAdmissionPromptPayloadPosture =
  "redacted placeholder only";
export type BackendAdmissionPromptTransmissionState = "not sent";
export type BackendAdmissionCredentialReferencePosture =
  "opaque label only";
export type BackendAdmissionReferencePosture = "preview-only";
export type BackendAdmissionIdempotencyKeyPosture =
  "deterministic preview key only";
export type BackendAdmissionExplicitNoRequestStatement =
  "No backend admission request is created.";
export type BackendAdmissionExplicitNoResponseStatement =
  "No backend admission response is received.";
export type BackendAdmissionExplicitNoErrorStatement =
  "No backend admission error is received.";
export type BackendContractGateOwner =
  | "backend-owned contract"
  | "operator"
  | "safety review";
export type BackendContractGateFrontendState = "preview-only";
export type BackendContractGateId =
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
  | "dry-run-result-review"
  | "acceptance-matrix-review"
  | "admission-review-recovery"
  | "no-queue-dispatch-until-backend-runner-contract"
  | "no-worker-dispatch-until-backend-runner-contract"
  | "no-job-execution-until-backend-runner-contract"
  | "no-persistence-until-future-backend-batch";
export type BackendContractGateLabel =
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
  | "dry-run result review"
  | "acceptance matrix review"
  | "admission review/recovery"
  | "no queue dispatch until backend runner contract"
  | "no worker dispatch until backend runner contract"
  | "no job execution until backend runner contract"
  | "no persistence until future backend batch";
export type BackendContractGateNextRequirement =
  typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH;
export type BackendContractGateSchemaState = "preview-only";
export type BackendContractCurrentReadiness =
  "not executable / contract-only";
export type BackendContractCredentialBoundaryState =
  "opaque credential references only";
export type BackendContractSafetyBoundaryState =
  "manual review only / blocked";
export type BackendContractAuditBoundaryState =
  "preview-only / not persisted";
export type BackendContractApprovalBoundaryState =
  "preview-only / not persisted";
export type BackendContractPersistenceBoundaryState = "not implemented";
export type BackendContractNextRequirement =
  "backend-owned model provider dry-run runner contract next";

export type BackendAdmissionContractKey =
  `backend-owned-model-provider-run-admission-contract:${BackendAdmissionContractId}`;
export type BackendAdmissionRequestContractKey =
  `backend-owned-model-provider-run-admission-request-contract:${BackendAdmissionContractId}`;
export type BackendAdmissionResponseContractKey =
  `backend-owned-model-provider-run-admission-response-contract:${BackendAdmissionContractId}`;
export type BackendAdmissionErrorContractKey =
  `backend-owned-model-provider-run-admission-error-contract:${BackendAdmissionContractId}`;
export type BackendContractGateSchemaKey =
  `backend-owned-model-provider-run-admission-gate-schema:${BackendContractGateId}`;
export type BackendContractReadinessMatrixKey =
  `backend-owned-model-provider-run-admission-readiness-matrix:${BackendAdmissionContractId}`;

export type BackendOwnedModelProviderRunAdmissionContractRecord = Readonly<{
  id: BackendAdmissionContractId;
  key: BackendAdmissionContractKey;
  contractVersion: BackendOwnedRunAdmissionContractVersion;
  previewOnlyStatement: BackendAdmissionContractPreviewOnlyStatement;
  label: string;
  operatorRequestPhrase: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  source: BackendAdmissionContractSource;
  contractOwner: BackendAdmissionContractOwner;
  frontendMode: BackendAdmissionFrontendMode;
  contractMode: BackendAdmissionContractMode;
  runAdmissionPosture: BackendAdmissionRunPosture;
  providerCallPosture: BackendAdmissionProviderCallPosture;
  modelCallPosture: BackendAdmissionModelCallPosture;
  promptSendingPosture: BackendAdmissionPromptSendingPosture;
  sdkPosture: BackendAdmissionSdkPosture;
  credentialPosture: BackendAdmissionCredentialPosture;
  secretPosture: BackendAdmissionSecretPosture;
  frontendPosture: BackendAdmissionFrontendPosture;
  backendPosture: BackendAdmissionBackendPosture;
  executionPosture: BackendAdmissionExecutionPosture;
  sourceAdmissionReviewReference: ModelProviderRunAdmissionReviewKey;
  sourceAdmissionDecisionReviewReference: ModelProviderAdmissionDecisionReviewKey;
  sourceGateFailureReviewReference: ModelProviderAdmissionGateFailureReviewKey;
  sourceAdmissionRecoveryPlanReference: ModelProviderAdmissionRecoveryPlanKey;
  sourceAdmissionRecoveryReadinessReference: ModelProviderAdmissionRecoveryReadinessChecklistKey;
  sourceAdmissionAuditSummaryReference: ModelProviderAdmissionReviewAuditSummaryKey;
  sourceApprovalPacketReference: ModelProviderApprovalPacketKey;
  sourceRunIntentReference: ModelProviderRunIntentKey;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  providerSlotLabel: AthenaModelRoutingProviderSlotLabel;
  backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
  localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
  admissionContractState: BackendAdmissionContractState;
  admissionRequestState: BackendAdmissionRequestCreationState;
  admissionTokenState: BackendAdmissionTokenState;
  admissionLeaseState: BackendAdmissionLeaseState;
  admissionTicketState: BackendAdmissionTicketState;
  queueDispatchState: BackendAdmissionDispatchState;
  workerDispatchState: BackendAdmissionDispatchState;
  jobExecutionState: BackendAdmissionJobExecutionState;
  resultCaptureState: BackendAdmissionResultCaptureState;
  auditJoinState: BackendAdmissionJoinState;
  approvalJoinState: BackendAdmissionJoinState;
  manualApprovalRequired: BackendAdmissionManualApprovalRequirement;
  manualConfirmationRequired: BackendAdmissionManualConfirmationRequirement;
  killSwitchRequired: BackendAdmissionKillSwitchRequirement;
  auditRequired: BackendAdmissionAuditRequirement;
  privacyRedactionRequired: BackendAdmissionPrivacyRedactionRequirement;
  costAcknowledgementRequired: BackendAdmissionCostAcknowledgementRequirement;
  rateLimitGuardRequired: BackendAdmissionRateLimitGuardRequirement;
  timeoutCancelGuardRequired: BackendAdmissionTimeoutCancelGuardRequirement;
  idempotencyRequired: BackendAdmissionIdempotencyRequirement;
  replayBlockRequired: BackendAdmissionReplayBlockRequirement;
  singleRunLockRequired: BackendAdmissionSingleRunLockRequirement;
  dryRunResultReviewRequired: BackendAdmissionDryRunResultReviewRequirement;
  acceptanceMatrixReviewRequired: BackendAdmissionAcceptanceMatrixReviewRequirement;
  approvalExpiryReviewRequired: BackendAdmissionApprovalExpiryReviewRequirement;
  approvalRevocationReviewRequired:
    BackendAdmissionApprovalRevocationReviewRequirement;
  noRetryExecution: BackendAdmissionRetryExecutionPosture;
  noFallbackExecution: BackendAdmissionFallbackExecutionPosture;
  blockedDefaultReason: string;
  nextSafeAction: string;
  nextBackendOwnedDryRunRunnerContractRequirement:
    BackendContractNextRequirement;
}>;

export type BackendAdmissionRequestContractRecord = Readonly<{
  id: BackendAdmissionContractId;
  key: BackendAdmissionRequestContractKey;
  requestContractVersion: BackendAdmissionRequestContractVersion;
  previewOnlyStatement: BackendAdmissionRequestPreviewOnlyStatement;
  backendAdmissionContractId: BackendAdmissionContractId;
  sourceRunIntentReference: ModelProviderRunIntentKey;
  sourceAdmissionReviewReference: ModelProviderRunAdmissionReviewKey;
  targetCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  targetProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  requestCreationState: BackendAdmissionRequestCreationState;
  promptPayloadPosture: BackendAdmissionPromptPayloadPosture;
  promptTransmissionState: BackendAdmissionPromptTransmissionState;
  credentialReferencePosture: BackendAdmissionCredentialReferencePosture;
  approvalReferencePosture: BackendAdmissionReferencePosture;
  auditReferencePosture: BackendAdmissionReferencePosture;
  idempotencyKeyPosture: BackendAdmissionIdempotencyKeyPosture;
  replayBlockPosture: BackendAdmissionReplayBlockRequirement;
  singleRunLockPosture: BackendAdmissionSingleRunLockRequirement;
  serverOnlyBoundaryRequirement: BackendAdmissionBackendPosture;
  blockedDefaultReason: string;
  explicitNoBackendRequestCreatedStatement:
    BackendAdmissionExplicitNoRequestStatement;
}>;

export type BackendAdmissionResponseContractRecord = Readonly<{
  id: BackendAdmissionContractId;
  key: BackendAdmissionResponseContractKey;
  responseContractVersion: BackendAdmissionResponseContractVersion;
  previewOnlyStatement: BackendAdmissionResponsePreviewOnlyStatement;
  backendAdmissionContractId: BackendAdmissionContractId;
  requestContractReference: BackendAdmissionRequestContractKey;
  responseState: BackendAdmissionResponseState;
  admissionDecisionState: BackendAdmissionDecisionState;
  admissionTokenState: BackendAdmissionTokenState;
  admissionLeaseState: BackendAdmissionLeaseState;
  queueDispatchState: BackendAdmissionDispatchState;
  workerDispatchState: BackendAdmissionDispatchState;
  jobExecutionState: BackendAdmissionJobExecutionState;
  resultState: "not available";
  auditJoinState: BackendAdmissionJoinState;
  approvalJoinState: BackendAdmissionJoinState;
  blockedDefaultReason: string;
  explicitNoBackendResponseReceivedStatement:
    BackendAdmissionExplicitNoResponseStatement;
}>;

export type BackendAdmissionErrorContractRecord = Readonly<{
  id: BackendAdmissionContractId;
  key: BackendAdmissionErrorContractKey;
  errorContractVersion: BackendAdmissionErrorContractVersion;
  previewOnlyStatement: BackendAdmissionErrorPreviewOnlyStatement;
  backendAdmissionContractId: BackendAdmissionContractId;
  requestContractReference: BackendAdmissionRequestContractKey;
  errorState: BackendAdmissionErrorState;
  validationErrorExamples: readonly string[];
  admissionDenialExamples: readonly string[];
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
  explicitNoBackendErrorReceivedStatement:
    BackendAdmissionExplicitNoErrorStatement;
}>;

export type BackendOwnedContractGateSchemaRecord = Readonly<{
  key: BackendContractGateSchemaKey;
  gateSchemaVersion: BackendOwnedContractGateSchemaVersion;
  previewOnlyStatement: BackendContractGateSchemaPreviewOnlyStatement;
  id: BackendContractGateId;
  label: BackendContractGateLabel;
  owner: BackendContractGateOwner;
  requiredState: string;
  currentFrontendState: BackendContractGateFrontendState;
  evidenceRequirement: string;
  blockedDefaultReason: string;
  nextBackendContractRequirement: BackendContractGateNextRequirement;
}>;

export type BackendContractReadinessMatrixRecord = Readonly<{
  id: BackendAdmissionContractId;
  key: BackendContractReadinessMatrixKey;
  readinessMatrixVersion: BackendContractReadinessMatrixVersion;
  previewOnlyStatement: BackendContractReadinessPreviewOnlyStatement;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  contractDraftState: BackendAdmissionContractState;
  requestContractState: BackendAdmissionRequestCreationState;
  responseContractState: BackendAdmissionResponseState;
  errorContractState: BackendAdmissionErrorState;
  gateSchemaState: BackendContractGateSchemaState;
  credentialBoundaryState: BackendContractCredentialBoundaryState;
  safetyBoundaryState: BackendContractSafetyBoundaryState;
  auditBoundaryState: BackendContractAuditBoundaryState;
  approvalBoundaryState: BackendContractApprovalBoundaryState;
  queueBoundaryState: BackendAdmissionDispatchState;
  workerBoundaryState: BackendAdmissionDispatchState;
  jobBoundaryState: BackendAdmissionJobExecutionState;
  persistenceBoundaryState: BackendContractPersistenceBoundaryState;
  dryRunRunnerDependency:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH;
  currentReadiness: BackendContractCurrentReadiness;
  nextSafeAction: string;
}>;

export type BackendAdmissionContractCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  contractCount: number;
  contracts: readonly BackendOwnedModelProviderRunAdmissionContractRecord[];
}>;

export type BackendAdmissionContractWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  contractCount: number;
  contracts: readonly BackendOwnedModelProviderRunAdmissionContractRecord[];
}>;

export type BackendAdmissionContractSummary = Readonly<{
  currentBatch: typeof BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH;
  contractCount: number;
  requestContractCount: number;
  responseContractCount: number;
  errorContractCount: number;
  gateSchemaCount: number;
  readinessMatrixCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  contractState: BackendAdmissionContractState;
  currentReadiness: BackendContractCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type BackendContractGateSummary = Readonly<{
  currentBatch: typeof BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH;
  gateCount: number;
  operatorOwnedGateCount: number;
  backendOwnedGateCount: number;
  safetyReviewGateCount: number;
  summaryLines: readonly string[];
}>;

export type BackendContractReadinessSummary = Readonly<{
  currentBatch: typeof BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH;
  readinessMatrixCount: number;
  currentReadiness: BackendContractCurrentReadiness;
  nextSafeAction: string;
  summaryLines: readonly string[];
}>;

export type BackendAdmissionContractSeed = Readonly<{
  primaryGateFailureId: ModelProviderAdmissionGateFailureId;
  readinessChecklistId: ModelProviderAdmissionRecoveryReadinessChecklistId;
  nextSafeAction: string;
}>;
