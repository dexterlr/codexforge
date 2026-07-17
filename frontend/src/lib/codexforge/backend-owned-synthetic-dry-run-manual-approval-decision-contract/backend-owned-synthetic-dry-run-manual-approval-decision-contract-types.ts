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
  ManualApprovalHandoffContractKey,
  ManualApprovalHandoffPacketKey,
  ManualApprovalScopeKey,
} from "../backend-owned-synthetic-dry-run-manual-approval-handoff-contract";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
  type ManualApprovalHandoffAcceptancePostureKey,
  type ManualApprovalHandoffDecisionReviewKey,
  type ManualApprovalHandoffGateFailureReviewKey,
  type ManualApprovalHandoffRecoveryPlanKey,
  type ManualApprovalHandoffRecoveryReadinessChecklistKey,
  type ManualApprovalHandoffReviewAuditSummaryKey,
  type ManualApprovalHandoffReviewId,
  type ManualApprovalHandoffReviewKey,
} from "../backend-owned-synthetic-dry-run-manual-approval-handoff-review-recovery-preview";
import type { EndToEndPacketAcceptancePostureKey } from "../backend-owned-synthetic-dry-run-end-to-end-packet-review-recovery-preview";
import type { EndToEndPacketReviewKey } from "../backend-owned-synthetic-dry-run-end-to-end-packet-review-recovery-preview";
import type { ManualRunAdmissionPreviewKey } from "../manual-gated-model-provider-run-admission-preview";
import type {
  ModelProviderApprovalPacketKey,
  ModelProviderRunIntentKey,
} from "../model-provider-approval-packet-run-intent-preview";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH =
  "5322-5353 - Backend-Owned Synthetic Dry-Run Manual Approval Decision Contract";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_PHASE =
  5353;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH =
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH;

export const NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5354-5385 - Backend-Owned Synthetic Dry-Run Manual Approval Decision Review and Recovery Preview";

export type ManualApprovalDecisionContractId = ManualApprovalHandoffReviewId;

export type ManualApprovalDecisionContractVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-contract-v1";
export type ManualApprovalDecisionPacketVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-packet-v1";
export type ManualApprovalDecisionRequestContractVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-request-contract-v1";
export type ManualApprovalDecisionResponseContractVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-response-contract-v1";
export type ManualApprovalDecisionErrorContractVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-error-contract-v1";
export type ApprovalOutcomePreviewVersion =
  "backend-owned-synthetic-dry-run-approval-outcome-preview-v1";
export type ManualApprovalDecisionGateVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-gate-v1";
export type ManualApprovalDecisionReadinessVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-readiness-v1";
export type ManualApprovalDecisionEvidenceSummaryVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-evidence-summary-v1";

export type ManualApprovalDecisionSource = "Athena / Jarvis Model Gateway";
export type ManualApprovalDecisionOwner = "backend-owned";
export type ManualApprovalDecisionFrontendMode = "preview-only";
export type ManualApprovalDecisionContractMode = "contract-only";
export type ManualApprovalDecisionPosture =
  "manual approval decision / not evaluated / not persistent";
export type ManualApprovalDecisionPreviewOnlyStatement =
  "manual approval decision contract is preview-only";
export type ManualApprovalDecisionState =
  "draft / preview-only / not evaluated";
export type ManualApprovalDecisionRequestState = "not created";
export type ManualApprovalDecisionInvocationState = "not invoked";
export type ManualApprovalDecisionResponseState = "not received";
export type ManualApprovalDecisionErrorState = "not received";
export type ManualApprovalOperatorApprovalState = "not requested";
export type ManualApprovalManualConfirmationState = "not captured";
export type ManualApprovalOutcomeDecisionState = "not decided";
export type ManualApprovalDecisionEvaluationState = "not evaluated";
export type ManualApprovalDecisionSelectionState = "not selected";
export type ManualApprovalTokenState = "not issued";
export type ManualApprovalLeaseState = "not created";
export type ManualApprovalReferenceState = "not persisted";
export type ManualApprovalEvidencePacketState = "preview-only";
export type ManualApprovalHandoffState = "draft / preview-only";
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
export type ManualApprovalDecisionCurrentReadiness =
  "manual-approval-decision-contract-only / not decided / not executable / not persistent";

export type ManualApprovalDecisionPacketMode = "preview-only";
export type ManualApprovalDecisionAllowedLabel =
  | "approve preview"
  | "deny preview"
  | "defer preview";
export type ManualApprovalDecisionPacketPersistenceState = "not implemented";
export type ManualApprovalNoDecisionNoPersistenceStatement =
  "No approval decision. No persistence.";

export type ManualApprovalDecisionRequestContractState = "preview-only";
export type ManualApprovalOperatorTargetPosture = "preview-only";
export type ManualApprovalDecisionPayloadPosture = "static preview only";
export type ManualApprovalReferencePosture = "not persisted";
export type ManualApprovalWritePosture = "not implemented";
export type ManualApprovalNoDecisionRequestCreatedStatement =
  "No decision request created.";

export type ManualApprovalApprovalPersistenceState = "not implemented";
export type ManualApprovalAuditPersistenceState = "not implemented";
export type ManualApprovalResultPersistenceState = "not implemented";
export type ManualApprovalNoDecisionResponseNoApprovalStatement =
  "No decision response. No approval.";

export type ManualApprovalRetryPosture = "disabled";
export type ManualApprovalFallbackPosture = "disabled";
export type ManualApprovalRecoveryPosture = "manual review only";
export type ManualApprovalNoDecisionErrorNoRetryNoFallbackStatement =
  "No decision error. No retry. No fallback.";

export type ApprovalOutcomePreviewId =
  | "approve-synthetic-packet-preview"
  | "deny-synthetic-packet-preview"
  | "defer-synthetic-packet-preview"
  | "request-more-evidence-preview"
  | "escalate-safety-review-preview"
  | "keep-locked-preview";

export type ApprovalOutcomePreviewLabel =
  | "approve synthetic packet preview"
  | "deny synthetic packet preview"
  | "defer synthetic packet preview"
  | "request more evidence preview"
  | "escalate safety review preview"
  | "keep locked preview";

export type ApprovalOutcomePreviewState = "preview-only / not selected";
export type ApprovalOutcomePreviewNoSelectionStatement =
  "No current outcome selection.";

export type ManualApprovalDecisionGateId =
  | "handoff-review-gate"
  | "decision-packet-gate"
  | "operator-approval-gate"
  | "manual-confirmation-gate"
  | "approval-scope-gate"
  | "approval-expiry-gate"
  | "approval-revocation-gate"
  | "approval-outcome-gate"
  | "approval-token-gate"
  | "approval-lease-gate"
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

export type ManualApprovalDecisionGateLabel =
  | "handoff review gate"
  | "decision packet gate"
  | "operator approval gate"
  | "manual confirmation gate"
  | "approval scope gate"
  | "approval expiry gate"
  | "approval revocation gate"
  | "approval outcome gate"
  | "approval token gate"
  | "approval lease gate"
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

export type ManualApprovalDecisionGateOwner =
  | "backend manual approval decision contract"
  | "operator"
  | "safety review"
  | "backend future";

export type ManualApprovalDecisionGateCurrentState =
  "preview-only / blocked";

export type ManualApprovalDecisionPacketState = "preview-only";
export type ManualApprovalDecisionResponseContractState = "preview-only";
export type ManualApprovalDecisionErrorContractState = "preview-only";
export type ManualApprovalDecisionOutcomeState = "preview-only / not selected";
export type ManualApprovalDecisionGateSchemaState =
  "preview-only / blocked";
export type ManualApprovalDecisionDependencyState = "linked / preview-only";
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
  "No decision evidence persistence.";

export type ManualApprovalDecisionContractKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-contract:${ManualApprovalDecisionContractId}`;
export type ManualApprovalDecisionPacketKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-packet:${ManualApprovalDecisionContractId}`;
export type ManualApprovalDecisionRequestKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-request:${ManualApprovalDecisionContractId}`;
export type ManualApprovalDecisionResponseKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-response:${ManualApprovalDecisionContractId}`;
export type ManualApprovalDecisionErrorKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-error:${ManualApprovalDecisionContractId}`;
export type ApprovalOutcomePreviewKey =
  `backend-owned-synthetic-dry-run-approval-outcome-preview:${ManualApprovalDecisionContractId}:${ApprovalOutcomePreviewId}`;
export type ManualApprovalDecisionGateKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-gate:${ManualApprovalDecisionContractId}:${ManualApprovalDecisionGateId}`;
export type ManualApprovalDecisionReadinessKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-readiness:${ManualApprovalDecisionContractId}`;
export type ManualApprovalDecisionEvidenceSummaryKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-evidence-summary:${ManualApprovalDecisionContractId}`;

export type BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord =
  Readonly<{
    id: ManualApprovalDecisionContractId;
    key: ManualApprovalDecisionContractKey;
    decisionContractVersion: ManualApprovalDecisionContractVersion;
    previewOnlyStatement: ManualApprovalDecisionPreviewOnlyStatement;
    requestLabel: string;
    label: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    source: ManualApprovalDecisionSource;
    owner: ManualApprovalDecisionOwner;
    frontendMode: ManualApprovalDecisionFrontendMode;
    contractMode: ManualApprovalDecisionContractMode;
    decisionPosture: ManualApprovalDecisionPosture;
    sourceManualApprovalHandoffReviewReference: ManualApprovalHandoffReviewKey;
    sourceManualApprovalHandoffDecisionReviewReference: ManualApprovalHandoffDecisionReviewKey;
    sourceManualApprovalHandoffGateFailureReviewReference: ManualApprovalHandoffGateFailureReviewKey;
    sourceManualApprovalHandoffRecoveryPlanReference: ManualApprovalHandoffRecoveryPlanKey;
    sourceManualApprovalHandoffRecoveryReadinessReference: ManualApprovalHandoffRecoveryReadinessChecklistKey;
    sourceManualApprovalHandoffReviewAuditSummaryReference: ManualApprovalHandoffReviewAuditSummaryKey;
    sourceManualApprovalHandoffAcceptancePostureReference: ManualApprovalHandoffAcceptancePostureKey;
    sourceManualApprovalHandoffContractReference: ManualApprovalHandoffContractKey;
    sourceManualApprovalHandoffPacketReference: ManualApprovalHandoffPacketKey;
    sourceManualApprovalScopeReference: ManualApprovalScopeKey;
    sourceEndToEndPacketReviewReference: EndToEndPacketReviewKey;
    sourceEndToEndPacketAcceptancePostureReference: EndToEndPacketAcceptancePostureKey;
    sourceRunIntentReference: ModelProviderRunIntentKey;
    sourceApprovalPacketReference: ModelProviderApprovalPacketKey;
    sourceManualAdmissionPreviewReference: ManualRunAdmissionPreviewKey;
    sourceBackendAdmissionContractReference: BackendAdmissionContractKey;
    selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
    providerSlotLabel: AthenaModelRoutingProviderSlotLabel;
    backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
    localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
    decisionState: ManualApprovalDecisionState;
    decisionRequestState: ManualApprovalDecisionRequestState;
    decisionInvocationState: ManualApprovalDecisionInvocationState;
    decisionResponseState: ManualApprovalDecisionResponseState;
    decisionErrorState: ManualApprovalDecisionErrorState;
    operatorApprovalState: ManualApprovalOperatorApprovalState;
    manualConfirmationState: ManualApprovalManualConfirmationState;
    approvalOutcomeState: ManualApprovalOutcomeDecisionState;
    approvalTokenState: ManualApprovalTokenState;
    approvalLeaseState: ManualApprovalLeaseState;
    approvalReferenceState: ManualApprovalReferenceState;
    auditReferenceState: ManualApprovalReferenceState;
    resultReferenceState: ManualApprovalReferenceState;
    evidencePacketState: ManualApprovalEvidencePacketState;
    handoffState: ManualApprovalHandoffState;
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
    nextManualApprovalDecisionReviewRecoveryRequirement:
      typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH;
    blockedDefaultReason: string;
    nextSafeAction: string;
  }>;

export type ManualApprovalDecisionPacketRecord = Readonly<{
  id: ManualApprovalDecisionContractId;
  key: ManualApprovalDecisionPacketKey;
  approvalDecisionPacketVersion: ManualApprovalDecisionPacketVersion;
  decisionContractId: ManualApprovalDecisionContractId;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  sourceHandoffReviewReference: ManualApprovalHandoffReviewKey;
  sourceHandoffPacketReference: ManualApprovalHandoffPacketKey;
  sourceHandoffEvidenceSummaryReference: ManualApprovalHandoffReviewAuditSummaryKey;
  sourceAcceptancePostureReference: ManualApprovalHandoffAcceptancePostureKey;
  packetMode: ManualApprovalDecisionPacketMode;
  operatorFacingDecisionSummary: string;
  requestedDecisionScope: string;
  allowedDecisionLabels: readonly ManualApprovalDecisionAllowedLabel[];
  selectedDecisionLabel: ManualApprovalDecisionSelectionState;
  approvalReasonSummary: string;
  denialReasonSummary: string;
  deferralReasonSummary: string;
  safetyEvidenceSummary: string;
  privacyRedactionSummary: string;
  costRateTimeoutSummary: string;
  remainingBlockerSummary: string;
  operatorApprovalState: ManualApprovalOperatorApprovalState;
  manualConfirmationState: ManualApprovalManualConfirmationState;
  approvalDecisionState: ManualApprovalDecisionEvaluationState;
  persistenceState: ManualApprovalDecisionPacketPersistenceState;
  explicitNoApprovalDecisionNoPersistenceStatement:
    ManualApprovalNoDecisionNoPersistenceStatement;
}>;

export type ManualApprovalDecisionRequestContractRecord = Readonly<{
  id: ManualApprovalDecisionContractId;
  key: ManualApprovalDecisionRequestKey;
  decisionRequestContractVersion: ManualApprovalDecisionRequestContractVersion;
  decisionContractId: ManualApprovalDecisionContractId;
  requestLabel: string;
  sourceDecisionPacketReference: ManualApprovalDecisionPacketKey;
  decisionRequestState: ManualApprovalDecisionRequestState;
  decisionInvocationState: ManualApprovalDecisionInvocationState;
  operatorTargetPosture: ManualApprovalOperatorTargetPosture;
  decisionPayloadPosture: ManualApprovalDecisionPayloadPosture;
  approvalReferencePosture: ManualApprovalReferencePosture;
  auditReferencePosture: ManualApprovalReferencePosture;
  resultReferencePosture: ManualApprovalReferencePosture;
  databaseWritePosture: ManualApprovalWritePosture;
  fileWritePosture: ManualApprovalWritePosture;
  explicitNoDecisionRequestCreatedStatement:
    ManualApprovalNoDecisionRequestCreatedStatement;
}>;

export type ManualApprovalDecisionResponseContractRecord = Readonly<{
  id: ManualApprovalDecisionContractId;
  key: ManualApprovalDecisionResponseKey;
  decisionResponseContractVersion: ManualApprovalDecisionResponseContractVersion;
  decisionContractId: ManualApprovalDecisionContractId;
  requestLabel: string;
  sourceDecisionRequestReference: ManualApprovalDecisionRequestKey;
  responseState: ManualApprovalDecisionResponseState;
  approvalDecisionState: ManualApprovalDecisionEvaluationState;
  selectedDecisionState: ManualApprovalDecisionSelectionState;
  approvalTokenState: ManualApprovalTokenState;
  approvalLeaseState: ManualApprovalLeaseState;
  approvalPersistenceState: ManualApprovalApprovalPersistenceState;
  auditPersistenceState: ManualApprovalAuditPersistenceState;
  resultPersistenceState: ManualApprovalResultPersistenceState;
  databaseWriteState: ManualApprovalDatabaseWriteState;
  fileWriteState: ManualApprovalFileWriteState;
  explicitNoDecisionResponseNoApprovalStatement:
    ManualApprovalNoDecisionResponseNoApprovalStatement;
}>;

export type ManualApprovalDecisionErrorContractRecord = Readonly<{
  id: ManualApprovalDecisionContractId;
  key: ManualApprovalDecisionErrorKey;
  decisionErrorContractVersion: ManualApprovalDecisionErrorContractVersion;
  decisionContractId: ManualApprovalDecisionContractId;
  requestLabel: string;
  sourceDecisionRequestReference: ManualApprovalDecisionRequestKey;
  errorState: ManualApprovalDecisionErrorState;
  missingOperatorApprovalExample: string;
  missingManualConfirmationExample: string;
  staleHandoffPacketExample: string;
  unresolvedBlockerExample: string;
  killSwitchActiveExample: string;
  privacyRedactionDeniedExample: string;
  approvalScopeDeniedExample: string;
  persistenceDeniedExample: string;
  databaseWriteBlockedExample: string;
  fileWriteBlockedExample: string;
  retryPosture: ManualApprovalRetryPosture;
  fallbackPosture: ManualApprovalFallbackPosture;
  recoveryPosture: ManualApprovalRecoveryPosture;
  explicitNoDecisionErrorNoRetryNoFallbackStatement:
    ManualApprovalNoDecisionErrorNoRetryNoFallbackStatement;
}>;

export type ApprovalOutcomePreviewRecord = Readonly<{
  decisionContractId: ManualApprovalDecisionContractId;
  key: ApprovalOutcomePreviewKey;
  outcomeVersion: ApprovalOutcomePreviewVersion;
  outcomeId: ApprovalOutcomePreviewId;
  outcomeLabel: ApprovalOutcomePreviewLabel;
  outcomeState: ApprovalOutcomePreviewState;
  operatorActionRequired: string;
  manualConfirmationRequired: ManualConfirmationRequiredState;
  requiredEvidence: readonly string[];
  blockedActions: readonly string[];
  allowedFutureActionsIfSelectedInFutureBackendPath: readonly string[];
  disallowedActionsEvenIfSelected: readonly string[];
  currentSafetyPosture: string;
  approvalTokenPosture: ManualApprovalTokenState;
  approvalLeasePosture: ManualApprovalLeaseState;
  persistencePosture: ManualApprovalPersistenceBoundaryState;
  explicitNoCurrentOutcomeSelectionStatement:
    ApprovalOutcomePreviewNoSelectionStatement;
}>;

export type ManualApprovalDecisionGateRecord = Readonly<{
  decisionContractId: ManualApprovalDecisionContractId;
  requestLabel: string;
  id: ManualApprovalDecisionGateId;
  key: ManualApprovalDecisionGateKey;
  label: ManualApprovalDecisionGateLabel;
  gateVersion: ManualApprovalDecisionGateVersion;
  owner: ManualApprovalDecisionGateOwner;
  requiredState: string;
  currentState: ManualApprovalDecisionGateCurrentState;
  evidenceRequirement: string;
  blockedDefaultReason: string;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type ManualApprovalDecisionReadinessMatrixRecord = Readonly<{
  id: ManualApprovalDecisionContractId;
  key: ManualApprovalDecisionReadinessKey;
  readinessVersion: ManualApprovalDecisionReadinessVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  decisionContractState: ManualApprovalDecisionState;
  decisionPacketState: ManualApprovalDecisionPacketState;
  decisionRequestContractState: ManualApprovalDecisionRequestContractState;
  decisionResponseContractState: ManualApprovalDecisionResponseContractState;
  decisionErrorContractState: ManualApprovalDecisionErrorContractState;
  approvalOutcomeState: ManualApprovalDecisionOutcomeState;
  gateSchemaState: ManualApprovalDecisionGateSchemaState;
  handoffReviewDependency: ManualApprovalDecisionDependencyState;
  handoffEvidenceDependency: ManualApprovalDecisionDependencyState;
  operatorApprovalDependency: ManualApprovalOperatorApprovalState;
  manualConfirmationDependency: ManualApprovalManualConfirmationState;
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
  currentReadiness: ManualApprovalDecisionCurrentReadiness;
  nextSafeAction: string;
}>;

export type ManualApprovalDecisionEvidenceSummaryRecord = Readonly<{
  id: ManualApprovalDecisionContractId;
  key: ManualApprovalDecisionEvidenceSummaryKey;
  evidenceSummaryVersion: ManualApprovalDecisionEvidenceSummaryVersion;
  decisionContractId: ManualApprovalDecisionContractId;
  requestLabel: string;
  sourceHandoffReviewReference: ManualApprovalHandoffReviewKey;
  sourceHandoffAuditSummaryReference: ManualApprovalHandoffReviewAuditSummaryKey;
  sourceHandoffAcceptancePostureReference: ManualApprovalHandoffAcceptancePostureKey;
  evidenceState: ManualApprovalEvidenceState;
  safetyEvidence: string;
  privacyEvidence: string;
  auditEvidence: string;
  approvalEvidence: string;
  resultEvidence: string;
  handoffEvidence: string;
  gateEvidence: string;
  blockerEvidence: string;
  recoveryEvidence: string;
  evidenceDigestPosture: ManualApprovalEvidenceDigestPosture;
  persistenceState: ManualApprovalPersistenceBoundaryState;
  explicitNoDecisionEvidencePersistenceStatement:
    ManualApprovalNoEvidencePersistenceStatement;
}>;

export type ManualApprovalDecisionCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  contractCount: number;
  contracts: readonly BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord[];
}>;

export type ManualApprovalDecisionWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  contractCount: number;
  contracts: readonly BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord[];
}>;

export type ManualApprovalDecisionContractSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH;
  contractCount: number;
  packetCount: number;
  requestContractCount: number;
  responseContractCount: number;
  errorContractCount: number;
  outcomeRecordCount: number;
  gateRecordCount: number;
  readinessRecordCount: number;
  evidenceSummaryCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  decisionState: ManualApprovalDecisionState;
  currentReadiness: ManualApprovalDecisionCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type ManualApprovalDecisionGateSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH;
  gateCount: number;
  backendContractGateCount: number;
  operatorGateCount: number;
  safetyReviewGateCount: number;
  backendFutureGateCount: number;
  summaryLines: readonly string[];
}>;

export type ManualApprovalDecisionReadinessSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH;
  readinessRecordCount: number;
  currentReadiness: ManualApprovalDecisionCurrentReadiness;
  nextSafeAction: string;
  summaryLines: readonly string[];
}>;
