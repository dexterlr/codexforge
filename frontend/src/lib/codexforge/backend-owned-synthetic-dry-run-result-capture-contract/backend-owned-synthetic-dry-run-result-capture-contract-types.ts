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
import type { BackendDryRunRunnerReviewKey } from "../backend-owned-model-provider-dry-run-runner-review-recovery-preview";
import type { ModelProviderRunIntentKey } from "../model-provider-approval-packet-run-intent-preview";
import type {
  SyntheticDryRunErrorFixtureKey,
  SyntheticDryRunInputFixtureKey,
  SyntheticDryRunOutputFixtureKey,
  SyntheticDryRunRunnerSkeletonId,
  SyntheticRunnerHandoffPreviewKey,
  SyntheticRunnerReadinessKey,
  SyntheticRunnerSkeletonKey,
} from "../backend-owned-model-provider-synthetic-dry-run-runner-skeleton";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH =
  "5066-5097 - Backend-Owned Synthetic Dry-Run Result Capture Contract";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_PHASE =
  5097;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH =
  "5034-5065 - Backend-Owned Model Provider Synthetic Dry-Run Runner Skeleton";

export const NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5098-5129 - Backend-Owned Synthetic Dry-Run Result Capture Review and Recovery Preview";

export type ResultCaptureContractId = SyntheticDryRunRunnerSkeletonId;

export type ResultCaptureContractVersion =
  "backend-owned-synthetic-dry-run-result-capture-contract-v1";
export type SyntheticResultEnvelopeVersion =
  "backend-owned-synthetic-result-envelope-contract-v1";
export type ResultCaptureRequestVersion =
  "backend-owned-synthetic-result-capture-request-contract-v1";
export type ResultCaptureResponseVersion =
  "backend-owned-synthetic-result-capture-response-contract-v1";
export type ResultCaptureErrorVersion =
  "backend-owned-synthetic-result-capture-error-contract-v1";
export type ResultCaptureGateVersion =
  "backend-owned-synthetic-result-capture-gate-v1";
export type ResultCaptureReadinessVersion =
  "backend-owned-synthetic-result-capture-readiness-v1";
export type ResultCaptureAuditApprovalJoinVersion =
  "backend-owned-synthetic-result-capture-audit-approval-join-preview-v1";

export type ResultCaptureSource = "Athena / Jarvis Model Gateway";
export type ResultCaptureOwner = "backend-owned";
export type ResultCaptureFrontendMode = "preview-only";
export type ResultCaptureContractMode = "contract-only";
export type ResultCapturePosture = "contract-defined / not persisted";
export type ResultCapturePreviewOnlyStatement =
  "synthetic result capture contract is preview-only";
export type ResultCaptureRequestState = "not created";
export type ResultCaptureInvocationState = "not invoked";
export type ResultCaptureState = "not captured";
export type ResultPersistenceState = "not implemented";
export type AuditPersistenceState = "not implemented";
export type ApprovalPersistenceState = "not implemented";
export type ArtifactPersistenceState = "not implemented";
export type DatabaseWriteState = "not implemented";
export type FileWriteState = "not implemented";
export type ProviderResponseState = "not received";
export type ModelOutputState = "not generated";
export type SyntheticFixtureResultState = "static placeholder only";
export type ResultEnvelopeState = "preview-only";
export type ResultIdState = "not issued";
export type ResultDigestPosture = "deterministic preview digest only";
export type PromptSendingPosture = "not implemented";
export type ModelCallPosture = "not implemented";
export type ProviderCallPosture = "not implemented";
export type SdkPosture = "no SDK imports";
export type CredentialPosture = "opaque credential references only";
export type SecretPosture = "no plaintext secrets";
export type FrontendPosture = "blocked";
export type BackendPosture = "server-only required";
export type ExecutionPosture = "blocked by default";
export type ManualApprovalRequirement = "manual approval required";
export type ManualConfirmationRequirement = "manual confirmation required";
export type KillSwitchRequirement = "kill switch required";
export type AuditRequirement = "audit required";
export type PrivacyRedactionRequirement = "privacy/redaction required";
export type CostAcknowledgementRequirement = "cost acknowledgement required";
export type RateLimitGuardRequirement = "rate limit guard required";
export type TimeoutCancelGuardRequirement = "timeout/cancel guard required";
export type IdempotencyRequirement = "idempotency required";
export type ReplayBlockRequirement = "replay block required";
export type SingleRunLockRequirement = "single-run lock required";
export type RetryExecutionPosture = "no retry execution";
export type FallbackExecutionPosture = "no fallback execution";

export type ResultEnvelopeMode = "preview-only";
export type ResultPayloadPosture = "static placeholder only";
export type TokenCostAccountingState = "placeholder only";
export type SafetyReviewState = "preview-only";
export type JoinState = "not persisted";
export type ResultReferenceState = "not persisted";
export type ExplicitNoRealResultNoPersistenceStatement =
  "No real result. No result persistence.";

export type CaptureMode = "preview-only";
export type AuditReferencePosture = "preview-only";
export type ApprovalReferencePosture = "preview-only";
export type PersistenceTargetPosture = "not implemented";
export type ExplicitNoCaptureRequestCreatedStatement =
  "No capture request created.";

export type ResultCaptureResponseState = "not received";
export type CaptureDecisionState = "not evaluated";
export type ResultLocationState = "not available";
export type ExplicitNoCaptureResponseNoPersistenceStatement =
  "No capture response. No persistence.";

export type ResultCaptureErrorState = "not received";
export type RetryPosture = "disabled";
export type FallbackPosture = "disabled";
export type RecoveryPosture = "manual review only";
export type ExplicitNoCaptureErrorNoRetryNoFallbackStatement =
  "No capture error. No retry. No fallback.";

export type ResultCaptureGateOwner =
  | "backend capture contract"
  | "operator"
  | "safety review";
export type ResultCaptureGateCurrentState = "preview-only / blocked";
export type ResultCaptureGateId =
  | "synthetic-runner-skeleton"
  | "synthetic-output-fixture"
  | "synthetic-error-fixture"
  | "synthetic-result-envelope"
  | "result-capture-request"
  | "result-capture-response"
  | "result-capture-error"
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
  | "no-result-persistence"
  | "no-audit-persistence"
  | "no-approval-persistence"
  | "no-database-writes"
  | "no-file-writes";
export type ResultCaptureGateLabel =
  | "synthetic runner skeleton"
  | "synthetic output fixture"
  | "synthetic error fixture"
  | "synthetic result envelope"
  | "result capture request"
  | "result capture response"
  | "result capture error"
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
  | "no result persistence"
  | "no audit persistence"
  | "no approval persistence"
  | "no database writes"
  | "no file writes";

export type ResultCaptureContractState = "preview-only / contract-defined";
export type ResultEnvelopeContractState = "preview-only";
export type ResultCaptureRequestContractState = "preview-only";
export type ResultCaptureResponseContractState = "preview-only";
export type ResultCaptureErrorContractState = "preview-only";
export type ResultCaptureGateSchemaState = "preview-only / blocked";
export type SyntheticRunnerSkeletonDependencyState =
  "reviewed / preview-only";
export type SyntheticOutputFixtureDependencyState =
  "reviewed / preview-only";
export type SyntheticErrorFixtureDependencyState = "reviewed / preview-only";
export type CredentialBoundaryState = "opaque credential references only";
export type SafetyBoundaryState = "manual review only / blocked";
export type AuditBoundaryState = "preview-only / not persisted";
export type ApprovalBoundaryState = "preview-only / not persisted";
export type ResultPersistenceBoundaryState = "not implemented";
export type AuditPersistenceBoundaryState = "not implemented";
export type ApprovalPersistenceBoundaryState = "not implemented";
export type DatabaseBoundaryState = "not implemented";
export type FileBoundaryState = "not implemented";
export type CurrentResultCaptureReadiness =
  "capture-contract-only / not persistent";

export type ResultCaptureContractKey =
  `backend-owned-synthetic-dry-run-result-capture-contract:${ResultCaptureContractId}`;
export type SyntheticResultEnvelopeKey =
  `backend-owned-synthetic-result-envelope-contract:${ResultCaptureContractId}`;
export type ResultCaptureRequestKey =
  `backend-owned-synthetic-result-capture-request-contract:${ResultCaptureContractId}`;
export type ResultCaptureResponseKey =
  `backend-owned-synthetic-result-capture-response-contract:${ResultCaptureContractId}`;
export type ResultCaptureErrorKey =
  `backend-owned-synthetic-result-capture-error-contract:${ResultCaptureContractId}`;
export type ResultCaptureGateKey =
  `backend-owned-synthetic-result-capture-gate:${ResultCaptureGateId}`;
export type ResultCaptureReadinessKey =
  `backend-owned-synthetic-result-capture-readiness:${ResultCaptureContractId}`;
export type ResultCaptureAuditApprovalJoinKey =
  `backend-owned-synthetic-result-capture-audit-approval-join:${ResultCaptureContractId}`;

export type BackendOwnedSyntheticDryRunResultCaptureContractRecord =
  Readonly<{
    id: ResultCaptureContractId;
    key: ResultCaptureContractKey;
    captureContractVersion: ResultCaptureContractVersion;
    previewOnlyStatement: ResultCapturePreviewOnlyStatement;
    requestLabel: string;
    label: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    source: ResultCaptureSource;
    owner: ResultCaptureOwner;
    frontendMode: ResultCaptureFrontendMode;
    contractMode: ResultCaptureContractMode;
    resultCapturePosture: ResultCapturePosture;
    captureRequestState: ResultCaptureRequestState;
    captureInvocationState: ResultCaptureInvocationState;
    resultCaptureState: ResultCaptureState;
    resultPersistenceState: ResultPersistenceState;
    auditPersistenceState: AuditPersistenceState;
    approvalPersistenceState: ApprovalPersistenceState;
    artifactPersistenceState: ArtifactPersistenceState;
    databaseWriteState: DatabaseWriteState;
    fileWriteState: FileWriteState;
    providerResponseState: ProviderResponseState;
    modelOutputState: ModelOutputState;
    syntheticFixtureResultState: SyntheticFixtureResultState;
    resultEnvelopeState: ResultEnvelopeState;
    resultIdState: ResultIdState;
    resultDigestPosture: ResultDigestPosture;
    sourceSyntheticRunnerSkeletonReference: SyntheticRunnerSkeletonKey;
    sourceSyntheticInputFixtureReference: SyntheticDryRunInputFixtureKey;
    sourceSyntheticOutputFixtureReference: SyntheticDryRunOutputFixtureKey;
    sourceSyntheticErrorFixtureReference: SyntheticDryRunErrorFixtureKey;
    sourceSyntheticRunnerReadinessReference: SyntheticRunnerReadinessKey;
    sourceSyntheticRunnerHandoffReference: SyntheticRunnerHandoffPreviewKey;
    sourceDryRunRunnerReviewReference: BackendDryRunRunnerReviewKey;
    sourceBackendAdmissionContractReference: BackendAdmissionContractKey;
    sourceRunIntentReference: ModelProviderRunIntentKey;
    selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
    providerSlotLabel: AthenaModelRoutingProviderSlotLabel;
    backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
    localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
    promptSendingPosture: PromptSendingPosture;
    modelCallPosture: ModelCallPosture;
    providerCallPosture: ProviderCallPosture;
    sdkPosture: SdkPosture;
    credentialPosture: CredentialPosture;
    secretPosture: SecretPosture;
    frontendPosture: FrontendPosture;
    backendPosture: BackendPosture;
    executionPosture: ExecutionPosture;
    manualApprovalRequired: ManualApprovalRequirement;
    manualConfirmationRequired: ManualConfirmationRequirement;
    killSwitchRequired: KillSwitchRequirement;
    auditRequired: AuditRequirement;
    privacyRedactionRequired: PrivacyRedactionRequirement;
    costAcknowledgementRequired: CostAcknowledgementRequirement;
    rateLimitGuardRequired: RateLimitGuardRequirement;
    timeoutCancelGuardRequired: TimeoutCancelGuardRequirement;
    idempotencyRequired: IdempotencyRequirement;
    replayBlockRequired: ReplayBlockRequirement;
    singleRunLockRequired: SingleRunLockRequirement;
    noRetryExecution: RetryExecutionPosture;
    noFallbackExecution: FallbackExecutionPosture;
    nextResultCaptureReviewRecoveryRequirement:
      typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
    blockedDefaultReason: string;
    nextSafeAction: string;
  }>;

export type SyntheticResultEnvelopeContractRecord = Readonly<{
  id: ResultCaptureContractId;
  key: SyntheticResultEnvelopeKey;
  envelopeContractVersion: SyntheticResultEnvelopeVersion;
  requestLabel: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  captureContractId: ResultCaptureContractId;
  sourceSyntheticOutputFixtureReference: SyntheticDryRunOutputFixtureKey;
  sourceSyntheticErrorFixtureReference: SyntheticDryRunErrorFixtureKey;
  resultEnvelopeMode: ResultEnvelopeMode;
  resultPayloadPosture: ResultPayloadPosture;
  providerResponseState: ProviderResponseState;
  modelOutputState: ModelOutputState;
  syntheticFixtureResultState: SyntheticFixtureResultState;
  tokenCostAccountingState: TokenCostAccountingState;
  safetyReviewState: SafetyReviewState;
  resultIdState: ResultIdState;
  resultDigestPosture: ResultDigestPosture;
  auditJoinState: JoinState;
  approvalJoinState: JoinState;
  artifactReferenceState: JoinState;
  blockedDefaultReason: string;
  explicitNoRealResultNoPersistenceStatement:
    ExplicitNoRealResultNoPersistenceStatement;
}>;

export type ResultCaptureRequestContractRecord = Readonly<{
  id: ResultCaptureContractId;
  key: ResultCaptureRequestKey;
  requestContractVersion: ResultCaptureRequestVersion;
  requestLabel: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  captureContractId: ResultCaptureContractId;
  sourceSyntheticResultEnvelopeReference: SyntheticResultEnvelopeKey;
  sourceRunnerSkeletonReference: SyntheticRunnerSkeletonKey;
  captureRequestState: ResultCaptureRequestState;
  captureInvocationState: ResultCaptureInvocationState;
  captureMode: CaptureMode;
  resultPayloadPosture: ResultPayloadPosture;
  resultIdPosture: ResultIdState;
  resultDigestPosture: ResultDigestPosture;
  auditReferencePosture: AuditReferencePosture;
  approvalReferencePosture: ApprovalReferencePosture;
  persistenceTargetPosture: PersistenceTargetPosture;
  databaseWritePosture: DatabaseWriteState;
  fileWritePosture: FileWriteState;
  blockedDefaultReason: string;
  explicitNoCaptureRequestCreatedStatement:
    ExplicitNoCaptureRequestCreatedStatement;
}>;

export type ResultCaptureResponseContractRecord = Readonly<{
  id: ResultCaptureContractId;
  key: ResultCaptureResponseKey;
  responseContractVersion: ResultCaptureResponseVersion;
  requestLabel: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  captureContractId: ResultCaptureContractId;
  sourceCaptureRequestReference: ResultCaptureRequestKey;
  responseState: ResultCaptureResponseState;
  captureDecisionState: CaptureDecisionState;
  resultCaptureState: ResultCaptureState;
  resultPersistenceState: ResultPersistenceState;
  auditPersistenceState: AuditPersistenceState;
  approvalPersistenceState: ApprovalPersistenceState;
  artifactPersistenceState: ArtifactPersistenceState;
  resultIdState: ResultIdState;
  resultLocationState: ResultLocationState;
  databaseWriteState: DatabaseWriteState;
  fileWriteState: FileWriteState;
  blockedDefaultReason: string;
  explicitNoCaptureResponseNoPersistenceStatement:
    ExplicitNoCaptureResponseNoPersistenceStatement;
}>;

export type ResultCaptureErrorContractRecord = Readonly<{
  id: ResultCaptureContractId;
  key: ResultCaptureErrorKey;
  errorContractVersion: ResultCaptureErrorVersion;
  requestLabel: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  captureContractId: ResultCaptureContractId;
  sourceCaptureRequestReference: ResultCaptureRequestKey;
  errorState: ResultCaptureErrorState;
  validationErrorExamples: readonly string[];
  missingSyntheticOutputExample: string;
  missingAuditJoinExample: string;
  missingApprovalJoinExample: string;
  persistenceDeniedExample: string;
  databaseWriteBlockedExample: string;
  fileWriteBlockedExample: string;
  artifactPersistenceBlockedExample: string;
  privacyRedactionDeniedExample: string;
  retryPosture: RetryPosture;
  fallbackPosture: FallbackPosture;
  recoveryPosture: RecoveryPosture;
  explicitNoCaptureErrorNoRetryNoFallbackStatement:
    ExplicitNoCaptureErrorNoRetryNoFallbackStatement;
}>;

export type ResultCaptureGateRecord = Readonly<{
  id: ResultCaptureGateId;
  key: ResultCaptureGateKey;
  gateVersion: ResultCaptureGateVersion;
  label: ResultCaptureGateLabel;
  owner: ResultCaptureGateOwner;
  requiredState: string;
  currentState: ResultCaptureGateCurrentState;
  evidenceRequirement: string;
  blockedDefaultReason: string;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type ResultCaptureReadinessMatrixRecord = Readonly<{
  id: ResultCaptureContractId;
  key: ResultCaptureReadinessKey;
  readinessVersion: ResultCaptureReadinessVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  captureContractState: ResultCaptureContractState;
  resultEnvelopeState: ResultEnvelopeContractState;
  captureRequestContractState: ResultCaptureRequestContractState;
  captureResponseContractState: ResultCaptureResponseContractState;
  captureErrorContractState: ResultCaptureErrorContractState;
  gateSchemaState: ResultCaptureGateSchemaState;
  syntheticRunnerSkeletonDependency: SyntheticRunnerSkeletonDependencyState;
  syntheticOutputFixtureDependency: SyntheticOutputFixtureDependencyState;
  syntheticErrorFixtureDependency: SyntheticErrorFixtureDependencyState;
  credentialBoundaryState: CredentialBoundaryState;
  safetyBoundaryState: SafetyBoundaryState;
  auditBoundaryState: AuditBoundaryState;
  approvalBoundaryState: ApprovalBoundaryState;
  resultPersistenceBoundaryState: ResultPersistenceBoundaryState;
  auditPersistenceBoundaryState: AuditPersistenceBoundaryState;
  approvalPersistenceBoundaryState: ApprovalPersistenceBoundaryState;
  databaseBoundaryState: DatabaseBoundaryState;
  fileBoundaryState: FileBoundaryState;
  currentReadiness: CurrentResultCaptureReadiness;
  nextSafeAction: string;
}>;

export type ResultCaptureAuditApprovalJoinPreviewRecord = Readonly<{
  id: ResultCaptureContractId;
  key: ResultCaptureAuditApprovalJoinKey;
  joinPreviewVersion: ResultCaptureAuditApprovalJoinVersion;
  requestLabel: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  captureContractId: ResultCaptureContractId;
  sourceResultEnvelopeReference: SyntheticResultEnvelopeKey;
  auditJoinState: JoinState;
  approvalJoinState: JoinState;
  resultReferenceState: ResultReferenceState;
  evidenceSummary: string;
  blockedActionSummary: string;
  noResultPersistenceStatement: string;
  noAuditPersistenceStatement: string;
  noApprovalPersistenceStatement: string;
  noDatabaseWriteStatement: string;
  noFileWriteStatement: string;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type ResultCaptureContractCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  contractCount: number;
  contracts: readonly BackendOwnedSyntheticDryRunResultCaptureContractRecord[];
}>;

export type ResultCaptureContractWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  contractCount: number;
  contracts: readonly BackendOwnedSyntheticDryRunResultCaptureContractRecord[];
}>;

export type ResultCaptureContractSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  contractCount: number;
  resultEnvelopeCount: number;
  requestContractCount: number;
  responseContractCount: number;
  errorContractCount: number;
  gateCount: number;
  readinessRecordCount: number;
  joinPreviewCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  resultCaptureState: ResultCaptureState;
  currentReadiness: CurrentResultCaptureReadiness;
  summaryLines: readonly string[];
}>;

export type ResultCaptureGateSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  gateCount: number;
  backendCaptureContractGateCount: number;
  operatorGateCount: number;
  safetyReviewGateCount: number;
  summaryLines: readonly string[];
}>;

export type ResultCaptureReadinessSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  readinessRecordCount: number;
  currentReadiness: CurrentResultCaptureReadiness;
  nextSafeAction: string;
  summaryLines: readonly string[];
}>;

export type ResultCaptureGateSeed = Readonly<{
  id: ResultCaptureGateId;
  label: ResultCaptureGateLabel;
  owner: ResultCaptureGateOwner;
  requiredState: string;
  evidenceRequirement: string;
  blockedDefaultReason: string;
}>;
