import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_PHASE,
  type ApprovalOutcomePreviewId,
  type ApprovalOutcomePreviewKey,
  type ApprovalOutcomePreviewLabel,
  type ApprovalOutcomePreviewRecord,
  type BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord,
  type ManualApprovalDecisionContractId,
  type ManualApprovalDecisionContractKey,
  type ManualApprovalDecisionCurrentReadiness as ManualApprovalDecisionContractCurrentReadiness,
  type ManualApprovalDecisionErrorKey,
  type ManualApprovalDecisionEvidenceSummaryKey,
  type ManualApprovalDecisionGateId,
  type ManualApprovalDecisionGateKey,
  type ManualApprovalDecisionGateLabel,
  type ManualApprovalDecisionPacketKey,
  type ManualApprovalDecisionPacketRecord,
  type ManualApprovalDecisionReadinessKey,
  type ManualApprovalDecisionRequestKey,
  type ManualApprovalDecisionRequestContractRecord,
  type ManualApprovalDecisionResponseContractRecord,
  type ManualApprovalDecisionResponseKey,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-contract";
import type { ManualApprovalHandoffEvidenceSummaryKey } from "../backend-owned-synthetic-dry-run-manual-approval-handoff-contract";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5354-5385 - Backend-Owned Synthetic Dry-Run Manual Approval Decision Review and Recovery Preview";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_PHASE =
  5385;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH =
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH =
  "5386-5417 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution MVP";

export type ManualApprovalDecisionReviewId = ManualApprovalDecisionContractId;

export type ManualApprovalDecisionReviewVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-review-preview-v1";
export type ManualApprovalDecisionOutcomeReviewVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-outcome-review-preview-v1";
export type ManualApprovalDecisionGateFailureReviewVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-gate-failure-review-preview-v1";
export type ManualApprovalDecisionRecoveryPlanVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-recovery-plan-preview-v1";
export type ManualApprovalDecisionRecoveryReadinessChecklistVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-recovery-readiness-checklist-v1";
export type ManualApprovalDecisionReviewAuditSummaryVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-review-audit-summary-preview-v1";
export type ManualApprovalDecisionAcceptancePostureVersion =
  "backend-owned-synthetic-dry-run-manual-approval-decision-acceptance-posture-preview-v1";

export type ManualApprovalDecisionReviewMode = "preview-only";
export type ManualApprovalDecisionReviewPosture =
  "manual approval decision review / not evaluated / not persistent";
export type ManualApprovalDecisionReviewPreviewOnlyStatement =
  "manual approval decision review is preview-only";
export type ManualApprovalDecisionOutcomeReviewPreviewOnlyStatement =
  "manual approval decision outcome review is preview-only";
export type ManualApprovalDecisionGateFailureReviewPreviewOnlyStatement =
  "manual approval decision gate failure review is preview-only";
export type ManualApprovalDecisionRecoveryPlanPreviewOnlyStatement =
  "manual approval decision recovery plan is preview-only";
export type ManualApprovalDecisionRecoveryReadinessPreviewOnlyStatement =
  "manual approval decision recovery readiness is preview-only";
export type ManualApprovalDecisionReviewAuditSummaryPreviewOnlyStatement =
  "manual approval decision review audit summary is preview-only";
export type ManualApprovalDecisionAcceptancePosturePreviewOnlyStatement =
  "manual approval decision acceptance posture is preview-only";
export type ManualApprovalDecisionReviewSeverity =
  | "critical"
  | "high"
  | "medium";
export type ManualApprovalDecisionRecoveryPosture = "manual review only";
export type ManualApprovalDecisionRetryPosture = "disabled";
export type ManualApprovalDecisionFallbackPosture = "disabled";
export type ManualApprovalDecisionReviewCurrentReadiness =
  "manual-approval-decision-review-only / not decided / not executable / not persistent";
export type ManualApprovalDecisionManualOperatorReviewRequirement =
  "manual operator review required";
export type ManualApprovalDecisionManualRecoveryReviewRequirement =
  "manual recovery review required";
export type ManualApprovalDecisionNoOutcomeSelectionNoApprovalStatement =
  "No outcome selection. No approval.";
export type ManualApprovalDecisionNoGatePassStatement =
  "No gate pass is granted.";
export type ManualApprovalDecisionNoRetryNoFallbackNoApprovalDecisionNoPersistenceStatement =
  "No retry. No fallback. No approval decision. No persistence.";
export type ManualApprovalDecisionNoDecisionAcceptanceNoExecutionStatement =
  "No decision acceptance. No execution.";
export type ManualApprovalDecisionNoApprovalRequestStatement =
  "No approval request.";
export type ManualApprovalDecisionNoApprovalDecisionStatement =
  "No approval decision.";
export type ManualApprovalDecisionNoApprovalTokenStatement =
  "No approval token.";
export type ManualApprovalDecisionNoApprovalLeaseStatement =
  "No approval lease.";
export type ManualApprovalDecisionNoApprovalPersistenceStatement =
  "No approval persistence.";
export type ManualApprovalDecisionNoAuditPersistenceStatement =
  "No audit persistence.";
export type ManualApprovalDecisionNoResultPersistenceStatement =
  "No result persistence.";
export type ManualApprovalDecisionNoDatabaseWriteStatement =
  "No database write.";
export type ManualApprovalDecisionNoFileWriteStatement = "No file write.";
export type ManualApprovalDecisionAuditSummaryPosture = "preview-only";
export type ManualApprovalDecisionRecoveryReadinessState =
  | "blocked"
  | "manual review required"
  | "backend future required";
export type ManualApprovalDecisionRecoveryReadinessOwner =
  | "operator"
  | "backend future"
  | "safety review";
export type ManualApprovalDecisionAcceptanceState =
  "not accepted / preview-only";
export type ManualApprovalDecisionReviewSectionTitle =
  | "Backend-owned synthetic dry-run manual approval decision review"
  | "Manual approval decision outcome review"
  | "Manual approval decision gate failure review"
  | "Manual approval decision recovery plan"
  | "Manual approval decision recovery readiness"
  | "Manual approval decision review audit summary"
  | "Manual approval decision acceptance posture";
export type MinimalManualGatedSyntheticDryRunExecutionMvpChecklist =
  readonly string[];

export type ManualApprovalDecisionGateFailureState =
  | "held / handoff review preview-only"
  | "held / decision packet preview-only"
  | "held / operator approval not requested"
  | "held / manual confirmation not captured"
  | "held / approval scope preview-only"
  | "held / approval expiry not created"
  | "held / approval revocation not evaluated"
  | "held / approval outcome not decided"
  | "held / approval token not issued"
  | "held / approval lease not created"
  | "held / kill switch review required"
  | "held / audit evidence not persisted"
  | "held / privacy/redaction review required"
  | "held / cost/rate/timeout review required"
  | "held / idempotency/replay review required"
  | "held / single-run lock not created"
  | "held / server-only boundary required"
  | "held / opaque credential references only"
  | "held / plaintext secrets forbidden"
  | "held / frontend provider calls blocked"
  | "held / provider SDK imports blocked"
  | "held / prompt sending blocked"
  | "held / queue dispatch blocked"
  | "held / worker dispatch blocked"
  | "held / job execution blocked"
  | "held / result persistence blocked"
  | "held / audit persistence blocked"
  | "held / approval persistence blocked"
  | "held / database write blocked"
  | "held / file write blocked";

export type ManualApprovalDecisionRecoveryReadinessChecklistId =
  | "decision-contract-reviewed"
  | "decision-packet-reviewed"
  | "decision-request-contract-reviewed"
  | "decision-response-contract-reviewed"
  | "decision-error-contract-reviewed"
  | "approval-outcome-previews-reviewed"
  | "decision-gates-reviewed"
  | "decision-readiness-matrix-reviewed"
  | "decision-evidence-summary-reviewed"
  | "handoff-review-reviewed"
  | "handoff-acceptance-posture-reviewed"
  | "operator-approval-evidence-reviewed"
  | "manual-confirmation-evidence-reviewed"
  | "selected-decision-reviewed"
  | "approval-token-reviewed"
  | "approval-lease-reviewed"
  | "approval-reference-reviewed"
  | "audit-reference-reviewed"
  | "result-reference-reviewed"
  | "privacy-redaction-reviewed"
  | "cost-rate-reviewed"
  | "timeout-cancel-reviewed"
  | "idempotency-replay-reviewed"
  | "single-run-lock-reviewed"
  | "queue-dispatch-still-blocked"
  | "worker-dispatch-still-blocked"
  | "job-execution-still-blocked"
  | "result-persistence-still-blocked"
  | "audit-persistence-still-blocked"
  | "approval-persistence-still-blocked"
  | "database-writes-still-blocked"
  | "file-writes-still-blocked";

export type ManualApprovalDecisionRecoveryReadinessChecklistLabel =
  | "decision contract reviewed"
  | "decision packet reviewed"
  | "decision request contract reviewed"
  | "decision response contract reviewed"
  | "decision error contract reviewed"
  | "approval outcome previews reviewed"
  | "decision gates reviewed"
  | "decision readiness matrix reviewed"
  | "decision evidence summary reviewed"
  | "handoff review reviewed"
  | "handoff acceptance posture reviewed"
  | "operator approval evidence reviewed"
  | "manual confirmation evidence reviewed"
  | "selected decision reviewed"
  | "approval token reviewed"
  | "approval lease reviewed"
  | "approval reference reviewed"
  | "audit reference reviewed"
  | "result reference reviewed"
  | "privacy/redaction reviewed"
  | "cost/rate reviewed"
  | "timeout/cancel reviewed"
  | "idempotency/replay reviewed"
  | "single-run lock reviewed"
  | "queue dispatch still blocked"
  | "worker dispatch still blocked"
  | "job execution still blocked"
  | "result persistence still blocked"
  | "audit persistence still blocked"
  | "approval persistence still blocked"
  | "database writes still blocked"
  | "file writes still blocked";

export type ManualApprovalDecisionReviewKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-review:${ManualApprovalDecisionReviewId}`;
export type ManualApprovalDecisionOutcomeReviewKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-outcome-review:${ManualApprovalDecisionReviewId}:${ApprovalOutcomePreviewId}`;
export type ManualApprovalDecisionGateFailureReviewKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-gate-failure-review:${ManualApprovalDecisionReviewId}:${ManualApprovalDecisionGateId}`;
export type ManualApprovalDecisionRecoveryPlanKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-recovery-plan:${ManualApprovalDecisionReviewId}`;
export type ManualApprovalDecisionRecoveryReadinessChecklistKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-recovery-readiness:${ManualApprovalDecisionReviewId}:${ManualApprovalDecisionRecoveryReadinessChecklistId}`;
export type ManualApprovalDecisionReviewAuditSummaryKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-review-audit-summary:${ManualApprovalDecisionReviewId}`;
export type ManualApprovalDecisionAcceptancePostureKey =
  `backend-owned-synthetic-dry-run-manual-approval-decision-acceptance-posture:${ManualApprovalDecisionReviewId}`;

export type BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord =
  Readonly<{
    id: ManualApprovalDecisionReviewId;
    key: ManualApprovalDecisionReviewKey;
    reviewVersion: ManualApprovalDecisionReviewVersion;
    previewOnlyStatement: ManualApprovalDecisionReviewPreviewOnlyStatement;
    source: BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["source"];
    reviewMode: ManualApprovalDecisionReviewMode;
    reviewPosture: ManualApprovalDecisionReviewPosture;
    requestLabel: BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["requestLabel"];
    label: BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["label"];
    workspaceTarget: AiModelProviderWorkspaceTarget;
    sourceManualApprovalDecisionContractReference: ManualApprovalDecisionContractKey;
    sourceManualApprovalDecisionPacketReference: ManualApprovalDecisionPacketKey;
    sourceManualApprovalDecisionRequestReference: ManualApprovalDecisionRequestKey;
    sourceManualApprovalDecisionResponseReference: ManualApprovalDecisionResponseKey;
    sourceManualApprovalDecisionErrorReference: ManualApprovalDecisionErrorKey;
    sourceApprovalOutcomePreviewReference: ApprovalOutcomePreviewKey;
    sourceManualApprovalDecisionGateReference: ManualApprovalDecisionGateKey;
    sourceManualApprovalDecisionReadinessReference: ManualApprovalDecisionReadinessKey;
    sourceManualApprovalDecisionEvidenceSummaryReference: ManualApprovalDecisionEvidenceSummaryKey;
    sourceManualApprovalHandoffReviewReference:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["sourceManualApprovalHandoffReviewReference"];
    sourceManualApprovalHandoffAcceptancePostureReference:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["sourceManualApprovalHandoffAcceptancePostureReference"];
    sourceManualApprovalHandoffEvidenceSummaryReference:
      ManualApprovalHandoffEvidenceSummaryKey;
    sourceEndToEndPacketReviewReference:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["sourceEndToEndPacketReviewReference"];
    sourceRunIntentReference:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["sourceRunIntentReference"];
    sourceApprovalPacketReference:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["sourceApprovalPacketReference"];
    sourceManualAdmissionPreviewReference:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["sourceManualAdmissionPreviewReference"];
    sourceBackendAdmissionContractReference:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["sourceBackendAdmissionContractReference"];
    selectedCapabilityFamily:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["selectedCapabilityFamily"];
    providerSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["providerSlotLabel"];
    backupProviderSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["backupProviderSlotLabel"];
    localPrivateAlternativeLabel:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["localPrivateAlternativeLabel"];
    decisionState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["decisionState"];
    decisionRequestState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["decisionRequestState"];
    decisionInvocationState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["decisionInvocationState"];
    decisionResponseState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["decisionResponseState"];
    decisionErrorState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["decisionErrorState"];
    selectedDecisionState:
      ManualApprovalDecisionResponseContractRecord["selectedDecisionState"];
    approvalOutcomeState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["approvalOutcomeState"];
    operatorApprovalState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["operatorApprovalState"];
    manualConfirmationState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["manualConfirmationState"];
    approvalTokenState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["approvalTokenState"];
    approvalLeaseState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["approvalLeaseState"];
    approvalReferenceState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["approvalReferenceState"];
    auditReferenceState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["auditReferenceState"];
    resultReferenceState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["resultReferenceState"];
    evidencePacketState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["evidencePacketState"];
    handoffState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["handoffState"];
    endToEndPacketState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["endToEndPacketState"];
    packetDecisionState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["packetDecisionState"];
    admissionState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["admissionState"];
    dryRunExecutionState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["dryRunExecutionState"];
    resultCaptureState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["resultCaptureState"];
    auditJoinState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["auditJoinState"];
    approvalJoinState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["approvalJoinState"];
    databaseWriteState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["databaseWriteState"];
    fileWriteState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["fileWriteState"];
    queueDispatchState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["queueDispatchState"];
    workerDispatchState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["workerDispatchState"];
    jobExecutionState:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["jobExecutionState"];
    providerCallPosture:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["providerCallPosture"];
    modelCallPosture:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["modelCallPosture"];
    promptSendingPosture:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["promptSendingPosture"];
    sdkPosture:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["sdkPosture"];
    credentialPosture:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["credentialPosture"];
    secretPosture:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["secretPosture"];
    frontendPosture:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["frontendPosture"];
    backendPosture:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["backendPosture"];
    executionPosture:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["executionPosture"];
    manualOperatorReviewRequired:
      ManualApprovalDecisionManualOperatorReviewRequirement;
    manualRecoveryReviewRequired:
      ManualApprovalDecisionManualRecoveryReviewRequirement;
    manualApprovalRequired:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["manualApprovalRequired"];
    manualConfirmationRequired:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["manualConfirmationRequired"];
    killSwitchRequired:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["killSwitchRequired"];
    auditRequired:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["auditRequired"];
    privacyRedactionRequired:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["privacyRedactionRequired"];
    costAcknowledgementRequired:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["costAcknowledgementRequired"];
    rateLimitGuardRequired:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["rateLimitGuardRequired"];
    timeoutCancelGuardRequired:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["timeoutCancelGuardRequired"];
    idempotencyRequired:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["idempotencyRequired"];
    replayBlockRequired:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["replayBlockRequired"];
    singleRunLockRequired:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["singleRunLockRequired"];
    noRetryExecution:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["noRetryExecution"];
    noFallbackExecution:
      BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["noFallbackExecution"];
    nextMinimalManualGatedSyntheticDryRunExecutionMvpRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH;
    currentReadiness: ManualApprovalDecisionReviewCurrentReadiness;
  }>;

export type ManualApprovalDecisionOutcomeReviewRecord = Readonly<{
  key: ManualApprovalDecisionOutcomeReviewKey;
  outcomeReviewVersion: ManualApprovalDecisionOutcomeReviewVersion;
  previewOnlyStatement:
    ManualApprovalDecisionOutcomeReviewPreviewOnlyStatement;
  decisionReviewId: ManualApprovalDecisionReviewId;
  sourceDecisionContractReference: ManualApprovalDecisionContractKey;
  sourceApprovalOutcomePreviewReference: ApprovalOutcomePreviewKey;
  outcomeLabel: ApprovalOutcomePreviewLabel;
  outcomeState: ApprovalOutcomePreviewRecord["outcomeState"];
  operatorFacingExplanation: string;
  requiredEvidenceToSelectLater: ApprovalOutcomePreviewRecord["requiredEvidence"];
  blockedActions: ApprovalOutcomePreviewRecord["blockedActions"];
  allowedFutureActionsIfSelectedInFutureBackendPath:
    ApprovalOutcomePreviewRecord["allowedFutureActionsIfSelectedInFutureBackendPath"];
  disallowedActionsEvenIfSelected:
    ApprovalOutcomePreviewRecord["disallowedActionsEvenIfSelected"];
  currentSafetyPosture: ApprovalOutcomePreviewRecord["currentSafetyPosture"];
  approvalTokenPosture: ApprovalOutcomePreviewRecord["approvalTokenPosture"];
  approvalLeasePosture: ApprovalOutcomePreviewRecord["approvalLeasePosture"];
  persistencePosture: ApprovalOutcomePreviewRecord["persistencePosture"];
  nextSafeAction: string;
  explicitNoOutcomeSelectionNoApprovalStatement:
    ManualApprovalDecisionNoOutcomeSelectionNoApprovalStatement;
}>;

export type ManualApprovalDecisionGateFailureReviewRecord = Readonly<{
  key: ManualApprovalDecisionGateFailureReviewKey;
  gateFailureReviewVersion: ManualApprovalDecisionGateFailureReviewVersion;
  previewOnlyStatement:
    ManualApprovalDecisionGateFailureReviewPreviewOnlyStatement;
  decisionReviewId: ManualApprovalDecisionReviewId;
  failedGateId: ManualApprovalDecisionGateId;
  failedGateLabel: ManualApprovalDecisionGateLabel;
  gateState: ManualApprovalDecisionGateFailureState;
  severity: ManualApprovalDecisionReviewSeverity;
  affectedCapabilityFamily:
    BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["selectedCapabilityFamily"];
  affectedWorkspaceTarget: AiModelProviderWorkspaceTarget;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  minimalSyntheticDryRunExecutionMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH;
  nextSafeAction: string;
  explicitNoGatePassStatement: ManualApprovalDecisionNoGatePassStatement;
}>;

export type ManualApprovalDecisionRecoveryPlanPreviewRecord = Readonly<{
  id: ManualApprovalDecisionReviewId;
  key: ManualApprovalDecisionRecoveryPlanKey;
  recoveryPlanVersion: ManualApprovalDecisionRecoveryPlanVersion;
  previewOnlyStatement:
    ManualApprovalDecisionRecoveryPlanPreviewOnlyStatement;
  decisionReviewId: ManualApprovalDecisionReviewId;
  recoveryPosture: ManualApprovalDecisionRecoveryPosture;
  decisionContractRecovery: string;
  decisionPacketRecovery: string;
  decisionRequestNotCreatedRecovery: string;
  decisionResponseNotReceivedRecovery: string;
  decisionErrorNotReceivedRecovery: string;
  selectedDecisionNotSelectedRecovery: string;
  approvalOutcomeNotDecidedRecovery: string;
  operatorApprovalNotRequestedRecovery: string;
  manualConfirmationNotCapturedRecovery: string;
  approvalTokenNotIssuedRecovery: string;
  approvalLeaseNotCreatedRecovery: string;
  approvalReferenceNotPersistedRecovery: string;
  auditReferenceNotPersistedRecovery: string;
  resultReferenceNotPersistedRecovery: string;
  approvalScopeRecovery: string;
  approvalExpiryRevocationRecovery: string;
  killSwitchRecovery: string;
  privacyRedactionRecovery: string;
  costRateTimeoutRecovery: string;
  queueDispatchBlockedRecovery: string;
  workerDispatchBlockedRecovery: string;
  jobExecutionBlockedRecovery: string;
  resultPersistenceMissingRecovery: string;
  auditPersistenceMissingRecovery: string;
  approvalPersistenceMissingRecovery: string;
  databaseWriteBlockedRecovery: string;
  fileWriteBlockedRecovery: string;
  retryPosture: ManualApprovalDecisionRetryPosture;
  fallbackPosture: ManualApprovalDecisionFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH;
  explicitNoRetryNoFallbackNoApprovalDecisionNoPersistenceStatement:
    ManualApprovalDecisionNoRetryNoFallbackNoApprovalDecisionNoPersistenceStatement;
}>;

export type ManualApprovalDecisionRecoveryReadinessChecklistRecord =
  Readonly<{
    key: ManualApprovalDecisionRecoveryReadinessChecklistKey;
    checklistVersion:
      ManualApprovalDecisionRecoveryReadinessChecklistVersion;
    decisionReviewId: ManualApprovalDecisionReviewId;
    checklistId: ManualApprovalDecisionRecoveryReadinessChecklistId;
    label: ManualApprovalDecisionRecoveryReadinessChecklistLabel;
    state: ManualApprovalDecisionRecoveryReadinessState;
    severity: ManualApprovalDecisionReviewSeverity;
    evidenceRequired: string;
    recoveryAction: string;
    owner: ManualApprovalDecisionRecoveryReadinessOwner;
    currentPosture: ManualApprovalDecisionReviewMode;
    minimalSyntheticDryRunExecutionMvpDependency:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH;
    nextSafeAction: string;
  }>;

export type ManualApprovalDecisionReviewAuditSummaryRecord = Readonly<{
  id: ManualApprovalDecisionReviewId;
  key: ManualApprovalDecisionReviewAuditSummaryKey;
  auditSummaryVersion: ManualApprovalDecisionReviewAuditSummaryVersion;
  previewOnlyStatement:
    ManualApprovalDecisionReviewAuditSummaryPreviewOnlyStatement;
  decisionReviewId: ManualApprovalDecisionReviewId;
  auditPosture: ManualApprovalDecisionAuditSummaryPosture;
  approvalReferenceState:
    BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["approvalReferenceState"];
  auditReferenceState:
    BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["auditReferenceState"];
  resultReferenceState:
    BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["resultReferenceState"];
  evidencePacketState:
    BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["evidencePacketState"];
  outcomeEvidenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noApprovalRequestStatement: ManualApprovalDecisionNoApprovalRequestStatement;
  noApprovalDecisionStatement:
    ManualApprovalDecisionNoApprovalDecisionStatement;
  noApprovalTokenStatement: ManualApprovalDecisionNoApprovalTokenStatement;
  noApprovalLeaseStatement: ManualApprovalDecisionNoApprovalLeaseStatement;
  noApprovalPersistenceStatement:
    ManualApprovalDecisionNoApprovalPersistenceStatement;
  noAuditPersistenceStatement:
    ManualApprovalDecisionNoAuditPersistenceStatement;
  noResultPersistenceStatement:
    ManualApprovalDecisionNoResultPersistenceStatement;
  noDatabaseWriteStatement:
    ManualApprovalDecisionNoDatabaseWriteStatement;
  noFileWriteStatement: ManualApprovalDecisionNoFileWriteStatement;
  minimalSyntheticDryRunExecutionMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH;
}>;

export type ManualApprovalDecisionAcceptancePostureRecord = Readonly<{
  id: ManualApprovalDecisionReviewId;
  key: ManualApprovalDecisionAcceptancePostureKey;
  acceptancePostureVersion: ManualApprovalDecisionAcceptancePostureVersion;
  previewOnlyStatement:
    ManualApprovalDecisionAcceptancePosturePreviewOnlyStatement;
  decisionReviewId: ManualApprovalDecisionReviewId;
  acceptanceState: ManualApprovalDecisionAcceptanceState;
  approvalBlockers: readonly string[];
  manualConfirmationBlockers: readonly string[];
  outcomeBlockers: readonly string[];
  tokenLeaseBlockers: readonly string[];
  evidencePacketBlockers: readonly string[];
  handoffBlockers: readonly string[];
  endToEndPacketBlockers: readonly string[];
  safetyBlockers: readonly string[];
  privacyBlockers: readonly string[];
  costRateBlockers: readonly string[];
  auditBlockers: readonly string[];
  resultBlockers: readonly string[];
  persistenceBlockers: readonly string[];
  databaseFileBlockers: readonly string[];
  queueWorkerJobBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitNoDecisionAcceptanceNoExecutionStatement:
    ManualApprovalDecisionNoDecisionAcceptanceNoExecutionStatement;
}>;

export type ManualApprovalDecisionReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel:
    BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["selectedCapabilityFamily"]["label"];
  reviewCount: number;
  reviews: readonly BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord[];
}>;

export type ManualApprovalDecisionReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  reviewCount: number;
  reviews: readonly BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord[];
}>;

export type ManualApprovalDecisionReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH;
  reviewCount: number;
  outcomeReviewCount: number;
  gateFailureCount: number;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  decisionState:
    BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["decisionState"];
  currentReadiness: ManualApprovalDecisionReviewCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type ManualApprovalDecisionOutcomeSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH;
  outcomeReviewCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ManualApprovalDecisionGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH;
  gateFailureCount: number;
  summaryLines: readonly string[];
  topFailedGateLabels: readonly ManualApprovalDecisionGateLabel[];
  nextSafeAction: string;
}>;

export type ManualApprovalDecisionRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  currentReadiness:
    | ManualApprovalDecisionReviewCurrentReadiness
    | ManualApprovalDecisionContractCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;
