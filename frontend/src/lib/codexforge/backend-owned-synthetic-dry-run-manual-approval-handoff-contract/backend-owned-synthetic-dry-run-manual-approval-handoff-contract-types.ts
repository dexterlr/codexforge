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
import type { EndToEndPacketContractKey } from "../backend-owned-synthetic-dry-run-end-to-end-packet-contract";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
  type EndToEndPacketAcceptancePostureKey,
  type EndToEndPacketDecisionReviewKey,
  type EndToEndPacketGateFailureReviewKey,
  type EndToEndPacketRecoveryPlanKey,
  type EndToEndPacketRecoveryReadinessChecklistKey,
  type EndToEndPacketReviewAuditSummaryKey,
  type EndToEndPacketReviewId,
  type EndToEndPacketReviewKey,
  type EndToEndPacketStageFailureReviewKey,
} from "../backend-owned-synthetic-dry-run-end-to-end-packet-review-recovery-preview";
import type { AuditApprovalJoinReviewKey } from "../backend-owned-synthetic-dry-run-audit-approval-join-review-recovery-preview";
import type { ResultCaptureReviewKey } from "../backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";
import type { ManualRunAdmissionPreviewKey } from "../manual-gated-model-provider-run-admission-preview";
import type {
  ModelProviderApprovalPacketKey,
  ModelProviderRunIntentKey,
} from "../model-provider-approval-packet-run-intent-preview";
import type { SyntheticRunnerSkeletonKey } from "../backend-owned-model-provider-synthetic-dry-run-runner-skeleton";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH =
  "5258-5289 - Backend-Owned Synthetic Dry-Run Manual Approval Handoff Contract";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_PHASE =
  5289;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH =
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;

export const NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5290-5321 - Backend-Owned Synthetic Dry-Run Manual Approval Handoff Review and Recovery Preview";

export type ManualApprovalHandoffContractId = EndToEndPacketReviewId;

export type ManualApprovalHandoffContractVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-contract-v1";
export type ManualApprovalHandoffPacketVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-packet-v1";
export type ManualApprovalHandoffRequestContractVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-request-contract-v1";
export type ManualApprovalHandoffResponseContractVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-response-contract-v1";
export type ManualApprovalHandoffErrorContractVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-error-contract-v1";
export type ManualApprovalScopeVersion =
  "backend-owned-synthetic-dry-run-manual-approval-scope-v1";
export type ManualApprovalHandoffGateVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-gate-v1";
export type ManualApprovalHandoffReadinessVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-readiness-v1";
export type ManualApprovalHandoffEvidenceSummaryVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-evidence-summary-v1";

export type ManualApprovalHandoffSource = "Athena / Jarvis Model Gateway";
export type ManualApprovalHandoffOwner = "backend-owned";
export type ManualApprovalHandoffFrontendMode = "preview-only";
export type ManualApprovalHandoffContractMode = "contract-only";
export type ManualApprovalHandoffPosture =
  "manual approval handoff / not executable / not persistent";
export type ManualApprovalHandoffPreviewOnlyStatement =
  "manual approval handoff contract is preview-only";
export type ManualApprovalHandoffState = "draft / preview-only";
export type ManualApprovalHandoffRequestState = "not created";
export type ManualApprovalHandoffInvocationState = "not invoked";
export type ManualApprovalHandoffResponseState = "not received";
export type ManualApprovalHandoffErrorState = "not received";
export type ManualApprovalOperatorApprovalState = "not requested";
export type ManualApprovalManualConfirmationState = "not captured";
export type ManualApprovalDecisionState = "not evaluated";
export type ManualApprovalTokenState = "not issued";
export type ManualApprovalLeaseState = "not created";
export type ManualApprovalReferenceState = "not persisted";
export type ManualApprovalEvidencePacketState = "preview-only";
export type ManualApprovalEndToEndPacketState = "draft / preview-only";
export type ManualApprovalPacketDecisionState = "held / not accepted";
export type ManualApprovalAdmissionState = "not admitted";
export type ManualApprovalDryRunExecutionState = "not executed";
export type ManualApprovalResultCaptureState = "not captured";
export type ManualApprovalJoinState = "not persisted";
export type ManualApprovalDatabaseWriteState = "not implemented";
export type ManualApprovalFileWriteState = "not implemented";
export type ManualApprovalQueueDispatchState = "not dispatched";
export type ManualApprovalWorkerDispatchState = "not dispatched";
export type ManualApprovalJobExecutionState = "not executed";
export type ManualApprovalProviderCallPosture = "not implemented";
export type ManualApprovalModelCallPosture = "not implemented";
export type ManualApprovalPromptSendingPosture = "not implemented";
export type ManualApprovalSdkPosture = "no SDK imports";
export type ManualApprovalCredentialPosture =
  "opaque credential references only";
export type ManualApprovalSecretPosture = "no plaintext secrets";
export type ManualApprovalFrontendPosture = "blocked";
export type ManualApprovalBackendPosture = "server-only required";
export type ManualApprovalExecutionPosture = "blocked by default";
export type ManualApprovalRequiredState = "manual approval required";
export type ManualConfirmationRequiredState = "manual confirmation required";
export type KillSwitchRequiredState = "kill switch required";
export type AuditRequiredState = "audit required";
export type PrivacyRedactionRequiredState = "privacy/redaction required";
export type CostAcknowledgementRequiredState =
  "cost acknowledgement required";
export type RateLimitGuardRequiredState = "rate limit guard required";
export type TimeoutCancelGuardRequiredState = "timeout/cancel guard required";
export type IdempotencyRequiredState = "idempotency required";
export type ReplayBlockRequiredState = "replay block required";
export type SingleRunLockRequiredState = "single-run lock required";
export type NoRetryExecutionState = "no retry execution";
export type NoFallbackExecutionState = "no fallback execution";
export type ManualApprovalHandoffCurrentReadiness =
  "manual-approval-handoff-contract-only / not approved / not executable / not persistent";

export type ManualApprovalHandoffPacketMode = "preview-only";
export type ManualApprovalHandoffPacketPersistenceState = "not implemented";
export type ManualApprovalNoApprovalRequestNoPersistenceStatement =
  "No approval request created. No persistence.";

export type ManualApprovalHandoffRequestContractState = "preview-only";
export type ManualApprovalOperatorTargetPosture = "preview-only";
export type ManualApprovalPayloadPosture = "static preview only";
export type ManualApprovalReferencePosture = "not persisted";
export type ManualApprovalWritePosture = "not implemented";
export type ManualApprovalNoRequestCreatedStatement =
  "No handoff request created.";

export type ManualApprovalApprovalPersistenceState = "not implemented";
export type ManualApprovalAuditPersistenceState = "not implemented";
export type ManualApprovalResultPersistenceState = "not implemented";
export type ManualApprovalNoResponseNoApprovalStatement =
  "No handoff response. No approval.";

export type ManualApprovalRetryPosture = "disabled";
export type ManualApprovalFallbackPosture = "disabled";
export type ManualApprovalRecoveryPosture = "manual review only";
export type ManualApprovalNoErrorNoRetryNoFallbackStatement =
  "No handoff error. No retry. No fallback.";

export type ManualApprovalScopeId =
  | "synthetic-result-review-scope"
  | "audit-join-review-scope"
  | "approval-join-review-scope"
  | "end-to-end-packet-acceptance-scope"
  | "backend-only-runner-continuation-scope"
  | "no-provider-execution-scope"
  | "no-persistence-scope"
  | "no-queue-dispatch-scope"
  | "no-worker-dispatch-scope"
  | "no-job-execution-scope";

export type ManualApprovalScopeLabel =
  | "synthetic result review scope"
  | "audit join review scope"
  | "approval join review scope"
  | "end-to-end packet acceptance scope"
  | "backend-only runner continuation scope"
  | "no provider execution scope"
  | "no persistence scope"
  | "no queue dispatch scope"
  | "no worker dispatch scope"
  | "no job execution scope";

export type ManualApprovalScopeState = "preview-only / not approved";
export type ManualApprovalNoCurrentApprovalStatement =
  "No current approval.";

export type ManualApprovalHandoffGateId =
  | "end-to-end-packet-review-gate"
  | "packet-acceptance-posture-gate"
  | "evidence-packet-gate"
  | "operator-approval-gate"
  | "manual-confirmation-gate"
  | "approval-scope-gate"
  | "approval-expiry-gate"
  | "approval-revocation-gate"
  | "kill-switch-gate"
  | "audit-gate"
  | "privacy-redaction-gate"
  | "cost-rate-timeout-gate"
  | "idempotency-replay-gate"
  | "single-run-lock-gate"
  | "server-only-boundary-gate"
  | "opaque-credential-gate"
  | "no-plaintext-secrets-gate"
  | "no-frontend-provider-call-gate"
  | "no-provider-sdk-import-gate"
  | "no-prompt-sending-gate"
  | "no-queue-dispatch-gate"
  | "no-worker-dispatch-gate"
  | "no-job-execution-gate"
  | "no-result-persistence-gate"
  | "no-audit-persistence-gate"
  | "no-approval-persistence-gate"
  | "no-database-write-gate"
  | "no-file-write-gate";

export type ManualApprovalHandoffGateLabel =
  | "end-to-end packet review gate"
  | "packet acceptance posture gate"
  | "evidence packet gate"
  | "operator approval gate"
  | "manual confirmation gate"
  | "approval scope gate"
  | "approval expiry gate"
  | "approval revocation gate"
  | "kill switch gate"
  | "audit gate"
  | "privacy/redaction gate"
  | "cost/rate/timeout gate"
  | "idempotency/replay gate"
  | "single-run lock gate"
  | "server-only boundary gate"
  | "opaque credential gate"
  | "no plaintext secrets gate"
  | "no frontend provider call gate"
  | "no provider SDK import gate"
  | "no prompt sending gate"
  | "no queue dispatch gate"
  | "no worker dispatch gate"
  | "no job execution gate"
  | "no result persistence gate"
  | "no audit persistence gate"
  | "no approval persistence gate"
  | "no database write gate"
  | "no file write gate";

export type ManualApprovalHandoffGateOwner =
  | "backend manual approval handoff contract"
  | "operator"
  | "safety review"
  | "backend future";

export type ManualApprovalHandoffGateCurrentState =
  "preview-only / blocked";

export type ManualApprovalHandoffPacketState = "preview-only";
export type ManualApprovalHandoffResponseContractState = "preview-only";
export type ManualApprovalHandoffErrorContractState = "preview-only";
export type ManualApprovalScopeSchemaState = "preview-only / not approved";
export type ManualApprovalHandoffGateSchemaState =
  "preview-only / blocked";
export type ManualApprovalHandoffDependencyState = "linked / preview-only";
export type ManualApprovalOperatorApprovalDependency = "not requested";
export type ManualApprovalManualConfirmationDependency = "not captured";
export type ManualApprovalKillSwitchDependency = "required / not reviewed";
export type ManualApprovalAuditBoundaryState = "required / not persisted";
export type ManualApprovalPrivacyBoundaryState = "required / blocked";
export type ManualApprovalCostRateBoundaryState = "required / blocked";
export type ManualApprovalServerOnlyBoundaryState = "required / blocked";
export type ManualApprovalQueueBoundaryState = "blocked / not dispatched";
export type ManualApprovalWorkerBoundaryState = "blocked / not dispatched";
export type ManualApprovalJobBoundaryState = "blocked / not executed";
export type ManualApprovalPersistenceBoundaryState = "not implemented";
export type ManualApprovalEvidenceState = "preview-only";
export type ManualApprovalEvidenceDigestPosture =
  "deterministic preview digest only";
export type ManualApprovalNoEvidencePersistenceStatement =
  "No evidence persistence.";

export type ManualApprovalHandoffContractKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-contract:${ManualApprovalHandoffContractId}`;
export type ManualApprovalHandoffPacketKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-packet:${ManualApprovalHandoffContractId}`;
export type ManualApprovalHandoffRequestKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-request:${ManualApprovalHandoffContractId}`;
export type ManualApprovalHandoffResponseKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-response:${ManualApprovalHandoffContractId}`;
export type ManualApprovalHandoffErrorKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-error:${ManualApprovalHandoffContractId}`;
export type ManualApprovalScopeKey =
  `backend-owned-synthetic-dry-run-manual-approval-scope:${ManualApprovalHandoffContractId}:${ManualApprovalScopeId}`;
export type ManualApprovalHandoffGateKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-gate:${ManualApprovalHandoffContractId}:${ManualApprovalHandoffGateId}`;
export type ManualApprovalHandoffReadinessKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-readiness:${ManualApprovalHandoffContractId}`;
export type ManualApprovalHandoffEvidenceSummaryKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-evidence-summary:${ManualApprovalHandoffContractId}`;

export type BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord =
  Readonly<{
    id: ManualApprovalHandoffContractId;
    key: ManualApprovalHandoffContractKey;
    handoffContractVersion: ManualApprovalHandoffContractVersion;
    previewOnlyStatement: ManualApprovalHandoffPreviewOnlyStatement;
    requestLabel: string;
    label: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    source: ManualApprovalHandoffSource;
    owner: ManualApprovalHandoffOwner;
    frontendMode: ManualApprovalHandoffFrontendMode;
    contractMode: ManualApprovalHandoffContractMode;
    handoffPosture: ManualApprovalHandoffPosture;
    sourceEndToEndPacketReviewReference: EndToEndPacketReviewKey;
    sourceEndToEndPacketDecisionReviewReference: EndToEndPacketDecisionReviewKey;
    sourceEndToEndPacketStageFailureReviewReference: EndToEndPacketStageFailureReviewKey;
    sourceEndToEndPacketStageFailureReviewReferences: readonly EndToEndPacketStageFailureReviewKey[];
    sourceEndToEndPacketGateFailureReviewReference: EndToEndPacketGateFailureReviewKey;
    sourceEndToEndPacketGateFailureReviewReferences: readonly EndToEndPacketGateFailureReviewKey[];
    sourceEndToEndPacketRecoveryPlanReference: EndToEndPacketRecoveryPlanKey;
    sourceEndToEndPacketRecoveryReadinessReference: EndToEndPacketRecoveryReadinessChecklistKey;
    sourceEndToEndPacketRecoveryReadinessReferences: readonly EndToEndPacketRecoveryReadinessChecklistKey[];
    sourceEndToEndPacketReviewAuditSummaryReference: EndToEndPacketReviewAuditSummaryKey;
    sourceEndToEndPacketAcceptancePostureReference: EndToEndPacketAcceptancePostureKey;
    sourceEndToEndPacketContractReference: EndToEndPacketContractKey;
    sourceRunIntentReference: ModelProviderRunIntentKey;
    sourceApprovalPacketReference: ModelProviderApprovalPacketKey;
    sourceManualAdmissionPreviewReference: ManualRunAdmissionPreviewKey;
    sourceBackendAdmissionContractReference: BackendAdmissionContractKey;
    sourceSyntheticRunnerSkeletonReference: SyntheticRunnerSkeletonKey;
    sourceResultCaptureReviewReference: ResultCaptureReviewKey;
    sourceAuditApprovalJoinReviewReference: AuditApprovalJoinReviewKey;
    selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
    providerSlotLabel: AthenaModelRoutingProviderSlotLabel;
    backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
    localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
    handoffState: ManualApprovalHandoffState;
    handoffRequestState: ManualApprovalHandoffRequestState;
    handoffInvocationState: ManualApprovalHandoffInvocationState;
    handoffResponseState: ManualApprovalHandoffResponseState;
    handoffErrorState: ManualApprovalHandoffErrorState;
    operatorApprovalState: ManualApprovalOperatorApprovalState;
    manualConfirmationState: ManualApprovalManualConfirmationState;
    approvalDecisionState: ManualApprovalDecisionState;
    approvalTokenState: ManualApprovalTokenState;
    approvalLeaseState: ManualApprovalLeaseState;
    approvalReferenceState: ManualApprovalReferenceState;
    auditReferenceState: ManualApprovalReferenceState;
    resultReferenceState: ManualApprovalReferenceState;
    evidencePacketState: ManualApprovalEvidencePacketState;
    endToEndPacketState: ManualApprovalEndToEndPacketState;
    packetDecisionState: ManualApprovalPacketDecisionState;
    admissionState: ManualApprovalAdmissionState;
    dryRunExecutionState: ManualApprovalDryRunExecutionState;
    resultCaptureState: ManualApprovalResultCaptureState;
    auditJoinState: ManualApprovalJoinState;
    approvalJoinState: ManualApprovalJoinState;
    databaseWriteState: ManualApprovalDatabaseWriteState;
    fileWriteState: ManualApprovalFileWriteState;
    queueDispatchState: ManualApprovalQueueDispatchState;
    workerDispatchState: ManualApprovalWorkerDispatchState;
    jobExecutionState: ManualApprovalJobExecutionState;
    providerCallPosture: ManualApprovalProviderCallPosture;
    modelCallPosture: ManualApprovalModelCallPosture;
    promptSendingPosture: ManualApprovalPromptSendingPosture;
    sdkPosture: ManualApprovalSdkPosture;
    credentialPosture: ManualApprovalCredentialPosture;
    secretPosture: ManualApprovalSecretPosture;
    frontendPosture: ManualApprovalFrontendPosture;
    backendPosture: ManualApprovalBackendPosture;
    executionPosture: ManualApprovalExecutionPosture;
    manualApprovalRequired: ManualApprovalRequiredState;
    manualConfirmationRequired: ManualConfirmationRequiredState;
    killSwitchRequired: KillSwitchRequiredState;
    auditRequired: AuditRequiredState;
    privacyRedactionRequired: PrivacyRedactionRequiredState;
    costAcknowledgementRequired: CostAcknowledgementRequiredState;
    rateLimitGuardRequired: RateLimitGuardRequiredState;
    timeoutCancelGuardRequired: TimeoutCancelGuardRequiredState;
    idempotencyRequired: IdempotencyRequiredState;
    replayBlockRequired: ReplayBlockRequiredState;
    singleRunLockRequired: SingleRunLockRequiredState;
    noRetryExecution: NoRetryExecutionState;
    noFallbackExecution: NoFallbackExecutionState;
    nextManualApprovalHandoffReviewRecoveryRequirement:
      typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH;
    blockedDefaultReason: string;
    nextSafeAction: string;
  }>;

export type ManualApprovalHandoffPacketRecord = Readonly<{
  id: ManualApprovalHandoffContractId;
  key: ManualApprovalHandoffPacketKey;
  handoffPacketVersion: ManualApprovalHandoffPacketVersion;
  handoffContractId: ManualApprovalHandoffContractId;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  sourceEndToEndPacketReviewReference: EndToEndPacketReviewKey;
  sourceAcceptancePostureReference: EndToEndPacketAcceptancePostureKey;
  sourceEvidencePacketReference: string;
  packetMode: ManualApprovalHandoffPacketMode;
  operatorFacingSummary: string;
  requestedApprovalScope: string;
  approvalReasonSummary: string;
  safetyEvidenceSummary: string;
  privacyRedactionSummary: string;
  costRateTimeoutSummary: string;
  blockedActionSummary: string;
  remainingBlockerSummary: string;
  manualApprovalState: ManualApprovalOperatorApprovalState;
  manualConfirmationState: ManualApprovalManualConfirmationState;
  persistenceState: ManualApprovalHandoffPacketPersistenceState;
  explicitNoApprovalRequestNoPersistenceStatement:
    ManualApprovalNoApprovalRequestNoPersistenceStatement;
}>;

export type ManualApprovalHandoffRequestContractRecord = Readonly<{
  id: ManualApprovalHandoffContractId;
  key: ManualApprovalHandoffRequestKey;
  handoffRequestContractVersion: ManualApprovalHandoffRequestContractVersion;
  handoffContractId: ManualApprovalHandoffContractId;
  requestLabel: string;
  sourceHandoffPacketReference: ManualApprovalHandoffPacketKey;
  handoffRequestState: ManualApprovalHandoffRequestState;
  handoffInvocationState: ManualApprovalHandoffInvocationState;
  operatorTargetPosture: ManualApprovalOperatorTargetPosture;
  approvalPayloadPosture: ManualApprovalPayloadPosture;
  approvalReferencePosture: ManualApprovalReferencePosture;
  auditReferencePosture: ManualApprovalReferencePosture;
  resultReferencePosture: ManualApprovalReferencePosture;
  databaseWritePosture: ManualApprovalWritePosture;
  fileWritePosture: ManualApprovalWritePosture;
  explicitNoHandoffRequestCreatedStatement:
    ManualApprovalNoRequestCreatedStatement;
}>;

export type ManualApprovalHandoffResponseContractRecord = Readonly<{
  id: ManualApprovalHandoffContractId;
  key: ManualApprovalHandoffResponseKey;
  handoffResponseContractVersion: ManualApprovalHandoffResponseContractVersion;
  handoffContractId: ManualApprovalHandoffContractId;
  requestLabel: string;
  sourceHandoffRequestReference: ManualApprovalHandoffRequestKey;
  responseState: ManualApprovalHandoffResponseState;
  approvalDecisionState: ManualApprovalDecisionState;
  manualConfirmationState: ManualApprovalManualConfirmationState;
  approvalTokenState: ManualApprovalTokenState;
  approvalLeaseState: ManualApprovalLeaseState;
  approvalPersistenceState: ManualApprovalApprovalPersistenceState;
  auditPersistenceState: ManualApprovalAuditPersistenceState;
  resultPersistenceState: ManualApprovalResultPersistenceState;
  databaseWriteState: ManualApprovalDatabaseWriteState;
  fileWriteState: ManualApprovalFileWriteState;
  explicitNoHandoffResponseNoApprovalStatement:
    ManualApprovalNoResponseNoApprovalStatement;
}>;

export type ManualApprovalHandoffErrorContractRecord = Readonly<{
  id: ManualApprovalHandoffContractId;
  key: ManualApprovalHandoffErrorKey;
  handoffErrorContractVersion: ManualApprovalHandoffErrorContractVersion;
  handoffContractId: ManualApprovalHandoffContractId;
  requestLabel: string;
  sourceHandoffRequestReference: ManualApprovalHandoffRequestKey;
  errorState: ManualApprovalHandoffErrorState;
  missingOperatorApprovalExample: string;
  missingManualConfirmationExample: string;
  staleEvidencePacketExample: string;
  unresolvedBlockerExample: string;
  killSwitchActiveExample: string;
  privacyRedactionDeniedExample: string;
  persistenceDeniedExample: string;
  databaseWriteBlockedExample: string;
  fileWriteBlockedExample: string;
  retryPosture: ManualApprovalRetryPosture;
  fallbackPosture: ManualApprovalFallbackPosture;
  recoveryPosture: ManualApprovalRecoveryPosture;
  explicitNoHandoffErrorNoRetryNoFallbackStatement:
    ManualApprovalNoErrorNoRetryNoFallbackStatement;
}>;

export type ManualApprovalScopeRecord = Readonly<{
  handoffContractId: ManualApprovalHandoffContractId;
  key: ManualApprovalScopeKey;
  approvalScopeVersion: ManualApprovalScopeVersion;
  requestLabel: string;
  scopeId: ManualApprovalScopeId;
  scopeLabel: ManualApprovalScopeLabel;
  scopeState: ManualApprovalScopeState;
  operatorActionRequired: string;
  manualConfirmationRequired: ManualConfirmationRequiredState;
  requiredEvidence: string;
  blockedActions: readonly string[];
  allowedFutureActionsIfApproved: readonly string[];
  disallowedActionsEvenIfApproved: readonly string[];
  currentSafetyPosture: string;
  explicitNoCurrentApprovalStatement:
    ManualApprovalNoCurrentApprovalStatement;
}>;

export type ManualApprovalHandoffGateRecord = Readonly<{
  handoffContractId: ManualApprovalHandoffContractId;
  requestLabel: string;
  id: ManualApprovalHandoffGateId;
  key: ManualApprovalHandoffGateKey;
  label: ManualApprovalHandoffGateLabel;
  gateVersion: ManualApprovalHandoffGateVersion;
  owner: ManualApprovalHandoffGateOwner;
  requiredState: string;
  currentState: ManualApprovalHandoffGateCurrentState;
  evidenceRequirement: string;
  blockedDefaultReason: string;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type ManualApprovalHandoffReadinessMatrixRecord = Readonly<{
  id: ManualApprovalHandoffContractId;
  key: ManualApprovalHandoffReadinessKey;
  readinessVersion: ManualApprovalHandoffReadinessVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  handoffContractState: ManualApprovalHandoffState;
  handoffPacketState: ManualApprovalHandoffPacketState;
  handoffRequestContractState: ManualApprovalHandoffRequestContractState;
  handoffResponseContractState: ManualApprovalHandoffResponseContractState;
  handoffErrorContractState: ManualApprovalHandoffErrorContractState;
  approvalScopeState: ManualApprovalScopeSchemaState;
  gateSchemaState: ManualApprovalHandoffGateSchemaState;
  endToEndPacketReviewDependency: ManualApprovalHandoffDependencyState;
  evidencePacketDependency: ManualApprovalHandoffDependencyState;
  operatorApprovalDependency: ManualApprovalOperatorApprovalDependency;
  manualConfirmationDependency: ManualApprovalManualConfirmationDependency;
  killSwitchDependency: ManualApprovalKillSwitchDependency;
  auditBoundaryState: ManualApprovalAuditBoundaryState;
  privacyBoundaryState: ManualApprovalPrivacyBoundaryState;
  costRateBoundaryState: ManualApprovalCostRateBoundaryState;
  serverOnlyBoundaryState: ManualApprovalServerOnlyBoundaryState;
  queueBoundaryState: ManualApprovalQueueBoundaryState;
  workerBoundaryState: ManualApprovalWorkerBoundaryState;
  jobBoundaryState: ManualApprovalJobBoundaryState;
  resultPersistenceBoundaryState: ManualApprovalPersistenceBoundaryState;
  auditPersistenceBoundaryState: ManualApprovalPersistenceBoundaryState;
  approvalPersistenceBoundaryState: ManualApprovalPersistenceBoundaryState;
  databaseBoundaryState: ManualApprovalPersistenceBoundaryState;
  fileBoundaryState: ManualApprovalPersistenceBoundaryState;
  currentReadiness: ManualApprovalHandoffCurrentReadiness;
  nextSafeAction: string;
}>;

export type ManualApprovalHandoffEvidenceSummaryRecord = Readonly<{
  id: ManualApprovalHandoffContractId;
  key: ManualApprovalHandoffEvidenceSummaryKey;
  evidenceSummaryVersion: ManualApprovalHandoffEvidenceSummaryVersion;
  handoffContractId: ManualApprovalHandoffContractId;
  requestLabel: string;
  sourceEndToEndPacketReviewReference: EndToEndPacketReviewKey;
  sourcePacketAuditSummaryReference: EndToEndPacketReviewAuditSummaryKey;
  sourcePacketAcceptancePostureReference: EndToEndPacketAcceptancePostureKey;
  evidenceState: ManualApprovalEvidenceState;
  safetyEvidence: string;
  privacyEvidence: string;
  auditEvidence: string;
  approvalEvidence: string;
  resultEvidence: string;
  stageEvidence: string;
  gateEvidence: string;
  blockerEvidence: string;
  recoveryEvidence: string;
  evidenceDigestPosture: ManualApprovalEvidenceDigestPosture;
  persistenceState: ManualApprovalPersistenceBoundaryState;
  explicitNoEvidencePersistenceStatement:
    ManualApprovalNoEvidencePersistenceStatement;
}>;

export type ManualApprovalHandoffCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  contractCount: number;
  contracts: readonly BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord[];
}>;

export type ManualApprovalHandoffWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  contractCount: number;
  contracts: readonly BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord[];
}>;

export type ManualApprovalHandoffContractSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH;
  contractCount: number;
  packetCount: number;
  requestContractCount: number;
  responseContractCount: number;
  errorContractCount: number;
  scopeRecordCount: number;
  gateRecordCount: number;
  readinessRecordCount: number;
  evidenceSummaryCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  handoffState: ManualApprovalHandoffState;
  currentReadiness: ManualApprovalHandoffCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type ManualApprovalHandoffGateSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH;
  gateCount: number;
  backendContractGateCount: number;
  operatorGateCount: number;
  safetyReviewGateCount: number;
  backendFutureGateCount: number;
  summaryLines: readonly string[];
}>;

export type ManualApprovalHandoffReadinessSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH;
  readinessRecordCount: number;
  currentReadiness: ManualApprovalHandoffCurrentReadiness;
  nextSafeAction: string;
  summaryLines: readonly string[];
}>;
