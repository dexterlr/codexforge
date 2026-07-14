import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
  AthenaModelRoutingProviderSlotLabel,
} from "../athena-model-routing-provider-selection-preview";
import type { ModelProviderRunIntentKey } from "../model-provider-approval-packet-run-intent-preview";
import type {
  BackendOwnedSyntheticDryRunResultCaptureContractRecord,
  ResultCaptureContractId,
  ResultCaptureContractKey,
  ResultCaptureErrorKey,
  ResultCaptureRequestKey,
  ResultCaptureResponseKey,
  SyntheticResultEnvelopeKey,
} from "../backend-owned-synthetic-dry-run-result-capture-contract";
import type {
  ResultCaptureAcceptancePostureKey,
  ResultCaptureDecisionReviewKey,
  ResultCaptureGateFailureReviewKey,
  ResultCaptureRecoveryPlanKey,
  ResultCaptureRecoveryReadinessChecklistKey,
  ResultCaptureReviewAuditSummaryKey,
  ResultCaptureReviewKey,
} from "../backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH =
  "5130-5161 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Contract";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_PHASE =
  5161;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5098-5129 - Backend-Owned Synthetic Dry-Run Result Capture Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5162-5193 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview";

export type AuditApprovalJoinContractId = ResultCaptureContractId;

export type AuditApprovalJoinContractVersion =
  "backend-owned-synthetic-dry-run-audit-approval-join-contract-v1";
export type SyntheticAuditJoinContractVersion =
  "backend-owned-synthetic-dry-run-audit-join-contract-v1";
export type SyntheticApprovalJoinContractVersion =
  "backend-owned-synthetic-dry-run-approval-join-contract-v1";
export type ResultAuditApprovalLinkContractVersion =
  "backend-owned-synthetic-result-audit-approval-link-contract-v1";
export type AuditApprovalJoinRequestContractVersion =
  "backend-owned-synthetic-audit-approval-join-request-contract-v1";
export type AuditApprovalJoinResponseContractVersion =
  "backend-owned-synthetic-audit-approval-join-response-contract-v1";
export type AuditApprovalJoinErrorContractVersion =
  "backend-owned-synthetic-audit-approval-join-error-contract-v1";
export type AuditApprovalJoinGateVersion =
  "backend-owned-synthetic-audit-approval-join-gate-v1";
export type AuditApprovalJoinReadinessVersion =
  "backend-owned-synthetic-audit-approval-join-readiness-v1";
export type AuditApprovalEvidencePacketVersion =
  "backend-owned-synthetic-audit-approval-evidence-packet-v1";

export type AuditApprovalJoinSource =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["source"];
export type AuditApprovalJoinOwner =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["owner"];
export type AuditApprovalJoinFrontendMode = "preview-only";
export type AuditApprovalJoinContractMode = "contract-only";
export type AuditApprovalJoinPreviewOnlyStatement =
  "audit and approval join contract is preview-only";
export type AuditJoinPosture = "contract-defined / not persisted";
export type ApprovalJoinPosture = "contract-defined / not persisted";
export type ResultReferencePosture = "preview-only / not persisted";
export type EvidencePacketPosture = "preview-only";
export type JoinRequestState = "not created";
export type JoinInvocationState = "not invoked";
export type AuditJoinState = "not persisted";
export type ApprovalJoinState = "not persisted";
export type ResultReferenceState = "not persisted";
export type ResultPersistenceState = "not implemented";
export type AuditPersistenceState = "not implemented";
export type ApprovalPersistenceState = "not implemented";
export type ArtifactPersistenceState = "not implemented";
export type DatabaseWriteState = "not implemented";
export type FileWriteState = "not implemented";
export type ProviderResponseState =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["providerResponseState"];
export type ModelOutputState =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["modelOutputState"];
export type SyntheticFixtureResultState =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["syntheticFixtureResultState"];
export type ResultIdState =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["resultIdState"];
export type ResultDigestPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["resultDigestPosture"];
export type PromptSendingPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["promptSendingPosture"];
export type ModelCallPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["modelCallPosture"];
export type ProviderCallPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["providerCallPosture"];
export type SdkPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["sdkPosture"];
export type CredentialPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["credentialPosture"];
export type SecretPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["secretPosture"];
export type FrontendPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["frontendPosture"];
export type BackendPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["backendPosture"];
export type ExecutionPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["executionPosture"];
export type ManualApprovalRequirement =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["manualApprovalRequired"];
export type ManualConfirmationRequirement =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["manualConfirmationRequired"];
export type KillSwitchRequirement =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["killSwitchRequired"];
export type AuditRequirement =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["auditRequired"];
export type PrivacyRedactionRequirement =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["privacyRedactionRequired"];
export type CostAcknowledgementRequirement =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["costAcknowledgementRequired"];
export type RateLimitGuardRequirement =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["rateLimitGuardRequired"];
export type TimeoutCancelGuardRequirement =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["timeoutCancelGuardRequired"];
export type IdempotencyRequirement =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["idempotencyRequired"];
export type ReplayBlockRequirement =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["replayBlockRequired"];
export type SingleRunLockRequirement =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["singleRunLockRequired"];
export type RetryExecutionPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["noRetryExecution"];
export type FallbackExecutionPosture =
  BackendOwnedSyntheticDryRunResultCaptureContractRecord["noFallbackExecution"];
export type SyntheticAuditJoinMode = "preview-only";
export type SyntheticApprovalJoinMode = "preview-only";
export type AuditReferenceState = "not persisted";
export type ApprovalReferenceState = "not persisted";
export type AuditEvidencePosture = "preview-only";
export type ApprovalEvidencePosture = "preview-only";
export type AuditEnvelopeState = "not created";
export type ApprovalEnvelopeState = "not created";
export type AuditAppendState = "not appended";
export type ApprovalAppendState = "not appended";
export type NoAuditPersistenceStatement = "No audit persistence";
export type NoApprovalPersistenceStatement = "No approval persistence";
export type NoDatabaseWriteStatement = "No database write";
export type NoFileWriteStatement = "No file write";
export type ExplicitNoAuditJoinNoPersistenceStatement =
  "No audit join. No persistence.";
export type ExplicitNoApprovalJoinNoPersistenceStatement =
  "No approval join. No persistence.";
export type AuditLinkState = "preview-only / not persisted";
export type ApprovalLinkState = "preview-only / not persisted";
export type JoinConsistencyState = "preview-only";
export type EvidencePacketState = "preview-only";
export type ResultLineagePosture = "static preview only";
export type ExplicitNoResultAuditApprovalLinkPersistedStatement =
  "No result-audit-approval link persisted.";
export type AuditReferencePosture = "preview-only";
export type ApprovalReferencePosture = "preview-only";
export type PersistenceTargetPosture = "not implemented";
export type DatabaseWritePosture = "not implemented";
export type FileWritePosture = "not implemented";
export type ExplicitNoJoinRequestCreatedStatement =
  "No join request created.";
export type JoinResponseState = "not received";
export type JoinDecisionState = "not evaluated";
export type ExplicitNoJoinResponseNoPersistenceStatement =
  "No join response. No persistence.";
export type JoinErrorState = "not received";
export type RetryPosture = "disabled";
export type FallbackPosture = "disabled";
export type RecoveryPosture = "manual review only";
export type ExplicitNoJoinErrorNoRetryNoFallbackStatement =
  "No join error. No retry. No fallback.";
export type AuditApprovalJoinGateOwner =
  | "backend join contract"
  | "operator"
  | "safety review";
export type AuditApprovalJoinGateCurrentState = "preview-only / blocked";
export type AuditApprovalJoinGateId =
  | "synthetic-result-envelope"
  | "result-capture-review"
  | "result-capture-acceptance-posture"
  | "audit-join-contract"
  | "approval-join-contract"
  | "result-audit-approval-link-contract"
  | "join-request-contract"
  | "join-response-contract"
  | "join-error-contract"
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
export type AuditApprovalJoinGateLabel =
  | "synthetic result envelope"
  | "result capture review"
  | "result capture acceptance posture"
  | "audit join contract"
  | "approval join contract"
  | "result-to-audit-approval link contract"
  | "join request contract"
  | "join response contract"
  | "join error contract"
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
export type AuditApprovalJoinContractState = "preview-only / contract-defined";
export type SyntheticAuditJoinContractState =
  "preview-only / contract-defined";
export type SyntheticApprovalJoinContractState =
  "preview-only / contract-defined";
export type ResultAuditApprovalLinkContractState =
  "preview-only / contract-defined";
export type AuditApprovalJoinRequestContractState = "preview-only";
export type AuditApprovalJoinResponseContractState = "preview-only";
export type AuditApprovalJoinErrorContractState = "preview-only";
export type AuditApprovalJoinGateSchemaState = "preview-only / blocked";
export type ResultCaptureReviewDependencyState = "reviewed / preview-only";
export type ResultEnvelopeDependencyState = "reviewed / preview-only";
export type ResultDigestDependencyState = "deterministic preview digest only";
export type EvidencePacketDependencyState = "preview-only";
export type AuditBoundaryState = "preview-only / not persisted";
export type ApprovalBoundaryState = "preview-only / not persisted";
export type ResultPersistenceBoundaryState = "not implemented";
export type AuditPersistenceBoundaryState = "not implemented";
export type ApprovalPersistenceBoundaryState = "not implemented";
export type DatabaseBoundaryState = "not implemented";
export type FileBoundaryState = "not implemented";
export type CurrentAuditApprovalJoinReadiness =
  "join-contract-only / not persistent";
export type AuditApprovalEvidenceState = "preview-only";
export type ResultEvidenceState = "preview-only";
export type BlockedActionEvidenceState = "preview-only";
export type PrivacyRedactionEvidenceState = "preview-only";
export type EvidenceDigestPosture = "deterministic preview digest only";
export type EvidencePacketPersistenceState = "not implemented";
export type ExplicitNoEvidencePacketPersistenceStatement =
  "No evidence packet persistence.";

export type AuditApprovalJoinContractKey =
  `backend-owned-synthetic-dry-run-audit-approval-join-contract:${AuditApprovalJoinContractId}`;
export type SyntheticAuditJoinContractKey =
  `backend-owned-synthetic-dry-run-audit-join-contract:${AuditApprovalJoinContractId}`;
export type SyntheticApprovalJoinContractKey =
  `backend-owned-synthetic-dry-run-approval-join-contract:${AuditApprovalJoinContractId}`;
export type ResultAuditApprovalLinkContractKey =
  `backend-owned-synthetic-result-audit-approval-link-contract:${AuditApprovalJoinContractId}`;
export type AuditApprovalJoinRequestContractKey =
  `backend-owned-synthetic-audit-approval-join-request-contract:${AuditApprovalJoinContractId}`;
export type AuditApprovalJoinResponseContractKey =
  `backend-owned-synthetic-audit-approval-join-response-contract:${AuditApprovalJoinContractId}`;
export type AuditApprovalJoinErrorContractKey =
  `backend-owned-synthetic-audit-approval-join-error-contract:${AuditApprovalJoinContractId}`;
export type AuditApprovalJoinGateKey =
  `backend-owned-synthetic-audit-approval-join-gate:${AuditApprovalJoinGateId}`;
export type AuditApprovalJoinReadinessKey =
  `backend-owned-synthetic-audit-approval-join-readiness:${AuditApprovalJoinContractId}`;
export type AuditApprovalEvidencePacketKey =
  `backend-owned-synthetic-audit-approval-evidence-packet:${AuditApprovalJoinContractId}`;

export type BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord =
  Readonly<{
    id: AuditApprovalJoinContractId;
    key: AuditApprovalJoinContractKey;
    joinContractVersion: AuditApprovalJoinContractVersion;
    previewOnlyStatement: AuditApprovalJoinPreviewOnlyStatement;
    requestLabel: string;
    label: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    source: AuditApprovalJoinSource;
    owner: AuditApprovalJoinOwner;
    frontendMode: AuditApprovalJoinFrontendMode;
    contractMode: AuditApprovalJoinContractMode;
    auditJoinPosture: AuditJoinPosture;
    approvalJoinPosture: ApprovalJoinPosture;
    resultReferencePosture: ResultReferencePosture;
    evidencePacketPosture: EvidencePacketPosture;
    joinRequestState: JoinRequestState;
    joinInvocationState: JoinInvocationState;
    auditJoinState: AuditJoinState;
    approvalJoinState: ApprovalJoinState;
    resultReferenceState: ResultReferenceState;
    resultPersistenceState: ResultPersistenceState;
    auditPersistenceState: AuditPersistenceState;
    approvalPersistenceState: ApprovalPersistenceState;
    artifactPersistenceState: ArtifactPersistenceState;
    databaseWriteState: DatabaseWriteState;
    fileWriteState: FileWriteState;
    sourceResultCaptureReviewReference: ResultCaptureReviewKey;
    sourceResultCaptureDecisionReviewReference: ResultCaptureDecisionReviewKey;
    sourceResultCaptureGateFailureReviewReference: ResultCaptureGateFailureReviewKey;
    sourceResultCaptureRecoveryPlanReference: ResultCaptureRecoveryPlanKey;
    sourceResultCaptureRecoveryReadinessReference: ResultCaptureRecoveryReadinessChecklistKey;
    sourceResultCaptureAuditSummaryReference: ResultCaptureReviewAuditSummaryKey;
    sourceResultCaptureAcceptancePostureReference: ResultCaptureAcceptancePostureKey;
    sourceResultCaptureContractReference: ResultCaptureContractKey;
    sourceSyntheticResultEnvelopeReference: SyntheticResultEnvelopeKey;
    sourceResultCaptureRequestReference: ResultCaptureRequestKey;
    sourceResultCaptureResponseReference: ResultCaptureResponseKey;
    sourceResultCaptureErrorReference: ResultCaptureErrorKey;
    sourceSyntheticRunnerSkeletonReference:
      BackendOwnedSyntheticDryRunResultCaptureContractRecord["sourceSyntheticRunnerSkeletonReference"];
    sourceRunIntentReference: ModelProviderRunIntentKey;
    selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
    providerSlotLabel: AthenaModelRoutingProviderSlotLabel;
    backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
    localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
    providerResponseState: ProviderResponseState;
    modelOutputState: ModelOutputState;
    syntheticFixtureResultState: SyntheticFixtureResultState;
    resultIdState: ResultIdState;
    resultDigestPosture: ResultDigestPosture;
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
    nextAuditApprovalJoinReviewRecoveryRequirement:
      typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
    blockedDefaultReason: string;
    nextSafeAction: string;
  }>;

export type SyntheticAuditJoinContractRecord = Readonly<{
  id: AuditApprovalJoinContractId;
  key: SyntheticAuditJoinContractKey;
  auditJoinContractVersion: SyntheticAuditJoinContractVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  joinContractId: AuditApprovalJoinContractId;
  sourceResultCaptureReviewReference: ResultCaptureReviewKey;
  sourceSyntheticResultEnvelopeReference: SyntheticResultEnvelopeKey;
  sourceResultCaptureAuditSummaryReference: ResultCaptureReviewAuditSummaryKey;
  auditJoinMode: SyntheticAuditJoinMode;
  auditReferenceState: AuditReferenceState;
  auditEvidencePosture: AuditEvidencePosture;
  auditEnvelopeState: AuditEnvelopeState;
  auditAppendState: AuditAppendState;
  auditPersistenceState: AuditPersistenceState;
  databaseWriteState: DatabaseWriteState;
  fileWriteState: FileWriteState;
  evidenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noAuditPersistenceStatement: NoAuditPersistenceStatement;
  noDatabaseWriteStatement: NoDatabaseWriteStatement;
  noFileWriteStatement: NoFileWriteStatement;
  blockedDefaultReason: string;
  explicitNoAuditJoinNoPersistenceStatement:
    ExplicitNoAuditJoinNoPersistenceStatement;
}>;

export type SyntheticApprovalJoinContractRecord = Readonly<{
  id: AuditApprovalJoinContractId;
  key: SyntheticApprovalJoinContractKey;
  approvalJoinContractVersion: SyntheticApprovalJoinContractVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  joinContractId: AuditApprovalJoinContractId;
  sourceResultCaptureReviewReference: ResultCaptureReviewKey;
  sourceResultCaptureAcceptancePostureReference: ResultCaptureAcceptancePostureKey;
  sourceRunIntentReference: ModelProviderRunIntentKey;
  approvalJoinMode: SyntheticApprovalJoinMode;
  approvalReferenceState: ApprovalReferenceState;
  approvalEvidencePosture: ApprovalEvidencePosture;
  approvalEnvelopeState: ApprovalEnvelopeState;
  approvalAppendState: ApprovalAppendState;
  approvalPersistenceState: ApprovalPersistenceState;
  databaseWriteState: DatabaseWriteState;
  fileWriteState: FileWriteState;
  operatorApprovalRequirement: ManualApprovalRequirement;
  manualConfirmationRequirement: ManualConfirmationRequirement;
  approvalScopeSummary: string;
  approvalBlockerSummary: string;
  noApprovalPersistenceStatement: NoApprovalPersistenceStatement;
  noDatabaseWriteStatement: NoDatabaseWriteStatement;
  noFileWriteStatement: NoFileWriteStatement;
  blockedDefaultReason: string;
  explicitNoApprovalJoinNoPersistenceStatement:
    ExplicitNoApprovalJoinNoPersistenceStatement;
}>;

export type ResultAuditApprovalLinkContractRecord = Readonly<{
  id: AuditApprovalJoinContractId;
  key: ResultAuditApprovalLinkContractKey;
  linkContractVersion: ResultAuditApprovalLinkContractVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  joinContractId: AuditApprovalJoinContractId;
  sourceResultCaptureContractReference: ResultCaptureContractKey;
  sourceResultEnvelopeReference: SyntheticResultEnvelopeKey;
  sourceAuditJoinContractReference: SyntheticAuditJoinContractKey;
  sourceApprovalJoinContractReference: SyntheticApprovalJoinContractKey;
  resultReferenceState: ResultReferenceState;
  resultIdState: ResultIdState;
  resultDigestPosture: ResultDigestPosture;
  auditLinkState: AuditLinkState;
  approvalLinkState: ApprovalLinkState;
  joinConsistencyState: JoinConsistencyState;
  evidencePacketState: EvidencePacketState;
  resultLineagePosture: ResultLineagePosture;
  databaseWriteState: DatabaseWriteState;
  fileWriteState: FileWriteState;
  blockedDefaultReason: string;
  explicitNoResultAuditApprovalLinkPersistedStatement:
    ExplicitNoResultAuditApprovalLinkPersistedStatement;
}>;

export type AuditApprovalJoinRequestContractRecord = Readonly<{
  id: AuditApprovalJoinContractId;
  key: AuditApprovalJoinRequestContractKey;
  requestContractVersion: AuditApprovalJoinRequestContractVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  joinContractId: AuditApprovalJoinContractId;
  sourceAuditJoinContractReference: SyntheticAuditJoinContractKey;
  sourceApprovalJoinContractReference: SyntheticApprovalJoinContractKey;
  sourceLinkContractReference: ResultAuditApprovalLinkContractKey;
  joinRequestState: JoinRequestState;
  joinInvocationState: JoinInvocationState;
  auditReferencePosture: AuditReferencePosture;
  approvalReferencePosture: ApprovalReferencePosture;
  resultReferencePosture: ResultReferencePosture;
  evidencePacketPosture: EvidencePacketPosture;
  persistenceTargetPosture: PersistenceTargetPosture;
  databaseWritePosture: DatabaseWritePosture;
  fileWritePosture: FileWritePosture;
  blockedDefaultReason: string;
  explicitNoJoinRequestCreatedStatement:
    ExplicitNoJoinRequestCreatedStatement;
}>;

export type AuditApprovalJoinResponseContractRecord = Readonly<{
  id: AuditApprovalJoinContractId;
  key: AuditApprovalJoinResponseContractKey;
  responseContractVersion: AuditApprovalJoinResponseContractVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  joinContractId: AuditApprovalJoinContractId;
  sourceJoinRequestReference: AuditApprovalJoinRequestContractKey;
  responseState: JoinResponseState;
  joinDecisionState: JoinDecisionState;
  auditJoinState: AuditJoinState;
  approvalJoinState: ApprovalJoinState;
  resultReferenceState: ResultReferenceState;
  databaseWriteState: DatabaseWriteState;
  fileWriteState: FileWriteState;
  blockedDefaultReason: string;
  explicitNoJoinResponseNoPersistenceStatement:
    ExplicitNoJoinResponseNoPersistenceStatement;
}>;

export type AuditApprovalJoinErrorContractRecord = Readonly<{
  id: AuditApprovalJoinContractId;
  key: AuditApprovalJoinErrorContractKey;
  errorContractVersion: AuditApprovalJoinErrorContractVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  joinContractId: AuditApprovalJoinContractId;
  sourceJoinRequestReference: AuditApprovalJoinRequestContractKey;
  errorState: JoinErrorState;
  validationErrorExamples: readonly string[];
  missingResultReferenceExample: string;
  missingAuditEvidenceExample: string;
  missingApprovalEvidenceExample: string;
  auditPersistenceDeniedExample: string;
  approvalPersistenceDeniedExample: string;
  databaseWriteBlockedExample: string;
  fileWriteBlockedExample: string;
  privacyRedactionDeniedExample: string;
  retryPosture: RetryPosture;
  fallbackPosture: FallbackPosture;
  recoveryPosture: RecoveryPosture;
  explicitNoJoinErrorNoRetryNoFallbackStatement:
    ExplicitNoJoinErrorNoRetryNoFallbackStatement;
}>;

export type AuditApprovalJoinGateRecord = Readonly<{
  id: AuditApprovalJoinGateId;
  key: AuditApprovalJoinGateKey;
  gateVersion: AuditApprovalJoinGateVersion;
  label: AuditApprovalJoinGateLabel;
  owner: AuditApprovalJoinGateOwner;
  requiredState: string;
  currentState: AuditApprovalJoinGateCurrentState;
  evidenceRequirement: string;
  blockedDefaultReason: string;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type AuditApprovalJoinReadinessMatrixRecord = Readonly<{
  id: AuditApprovalJoinContractId;
  key: AuditApprovalJoinReadinessKey;
  readinessVersion: AuditApprovalJoinReadinessVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  joinContractState: AuditApprovalJoinContractState;
  auditJoinContractState: SyntheticAuditJoinContractState;
  approvalJoinContractState: SyntheticApprovalJoinContractState;
  resultLinkContractState: ResultAuditApprovalLinkContractState;
  joinRequestContractState: AuditApprovalJoinRequestContractState;
  joinResponseContractState: AuditApprovalJoinResponseContractState;
  joinErrorContractState: AuditApprovalJoinErrorContractState;
  gateSchemaState: AuditApprovalJoinGateSchemaState;
  resultCaptureReviewDependency: ResultCaptureReviewDependencyState;
  resultEnvelopeDependency: ResultEnvelopeDependencyState;
  resultDigestDependency: ResultDigestDependencyState;
  evidencePacketDependency: EvidencePacketDependencyState;
  auditBoundaryState: AuditBoundaryState;
  approvalBoundaryState: ApprovalBoundaryState;
  resultPersistenceBoundaryState: ResultPersistenceBoundaryState;
  auditPersistenceBoundaryState: AuditPersistenceBoundaryState;
  approvalPersistenceBoundaryState: ApprovalPersistenceBoundaryState;
  databaseBoundaryState: DatabaseBoundaryState;
  fileBoundaryState: FileBoundaryState;
  currentReadiness: CurrentAuditApprovalJoinReadiness;
  nextSafeAction: string;
}>;

export type AuditApprovalEvidencePacketPreviewRecord = Readonly<{
  id: AuditApprovalJoinContractId;
  key: AuditApprovalEvidencePacketKey;
  evidencePacketVersion: AuditApprovalEvidencePacketVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  joinContractId: AuditApprovalJoinContractId;
  sourceResultCaptureReviewReference: ResultCaptureReviewKey;
  sourceResultEnvelopeReference: SyntheticResultEnvelopeKey;
  sourceAuditJoinReference: SyntheticAuditJoinContractKey;
  sourceApprovalJoinReference: SyntheticApprovalJoinContractKey;
  evidencePacketState: EvidencePacketState;
  evidenceDigestPosture: EvidenceDigestPosture;
  approvalEvidenceState: AuditApprovalEvidenceState;
  auditEvidenceState: AuditApprovalEvidenceState;
  resultEvidenceState: ResultEvidenceState;
  blockedActionEvidenceState: BlockedActionEvidenceState;
  privacyRedactionEvidenceState: PrivacyRedactionEvidenceState;
  persistenceState: EvidencePacketPersistenceState;
  databaseWriteState: DatabaseWriteState;
  fileWriteState: FileWriteState;
  blockedDefaultReason: string;
  explicitNoEvidencePacketPersistenceStatement:
    ExplicitNoEvidencePacketPersistenceStatement;
}>;

export type AuditApprovalJoinContractCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  contractCount: number;
  contracts: readonly BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord[];
}>;

export type AuditApprovalJoinContractWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  contractCount: number;
  contracts: readonly BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord[];
}>;

export type AuditApprovalJoinContractSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  contractCount: number;
  auditJoinContractCount: number;
  approvalJoinContractCount: number;
  resultLinkContractCount: number;
  requestContractCount: number;
  responseContractCount: number;
  errorContractCount: number;
  gateCount: number;
  readinessRecordCount: number;
  evidencePacketCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  summaryLines: readonly string[];
}>;

export type AuditApprovalJoinGateSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  gateCount: number;
  backendJoinContractGateCount: number;
  operatorGateCount: number;
  safetyReviewGateCount: number;
  summaryLines: readonly string[];
}>;

export type AuditApprovalJoinReadinessSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  readinessRecordCount: number;
  currentReadiness: CurrentAuditApprovalJoinReadiness;
  nextSafeAction: string;
  summaryLines: readonly string[];
}>;

export type AuditApprovalJoinGateSeed = Readonly<{
  id: AuditApprovalJoinGateId;
  label: AuditApprovalJoinGateLabel;
  owner: AuditApprovalJoinGateOwner;
  requiredState: string;
  evidenceRequirement: string;
  blockedDefaultReason: string;
}>;
