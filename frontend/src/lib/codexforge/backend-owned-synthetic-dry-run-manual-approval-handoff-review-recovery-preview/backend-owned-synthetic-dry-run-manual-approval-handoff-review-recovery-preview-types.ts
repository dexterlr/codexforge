import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
  type BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord,
  type ManualApprovalHandoffContractId,
  type ManualApprovalHandoffContractKey,
  type ManualApprovalHandoffCurrentReadiness as ManualApprovalHandoffContractCurrentReadiness,
  type ManualApprovalHandoffEvidenceSummaryKey,
  type ManualApprovalHandoffErrorKey,
  type ManualApprovalHandoffGateId,
  type ManualApprovalHandoffGateKey,
  type ManualApprovalHandoffGateLabel,
  type ManualApprovalHandoffPacketKey,
  type ManualApprovalHandoffReadinessKey,
  type ManualApprovalHandoffRequestKey,
  type ManualApprovalHandoffResponseKey,
  type ManualApprovalScopeKey,
} from "../backend-owned-synthetic-dry-run-manual-approval-handoff-contract";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5290-5321 - Backend-Owned Synthetic Dry-Run Manual Approval Handoff Review and Recovery Preview";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_PHASE =
  5321;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH =
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;

export const NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH =
  "5322-5353 - Backend-Owned Synthetic Dry-Run Manual Approval Decision Contract";

export type ManualApprovalHandoffReviewId = ManualApprovalHandoffContractId;

export type ManualApprovalHandoffReviewVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-review-preview-v1";
export type ManualApprovalHandoffDecisionReviewVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-decision-review-preview-v1";
export type ManualApprovalHandoffGateFailureReviewVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-gate-failure-review-preview-v1";
export type ManualApprovalHandoffRecoveryPlanVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-recovery-plan-preview-v1";
export type ManualApprovalHandoffRecoveryReadinessChecklistVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-recovery-readiness-checklist-v1";
export type ManualApprovalHandoffReviewAuditSummaryVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-review-audit-summary-preview-v1";
export type ManualApprovalHandoffAcceptancePostureVersion =
  "backend-owned-synthetic-dry-run-manual-approval-handoff-acceptance-posture-preview-v1";

export type ManualApprovalHandoffReviewSource =
  BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["source"];
export type ManualApprovalHandoffReviewMode = "preview-only";
export type ManualApprovalHandoffReviewPosture =
  "manual approval handoff review / not approved / not persistent";
export type ManualApprovalHandoffReviewPreviewOnlyStatement =
  "manual approval handoff review is preview-only";
export type ManualApprovalHandoffDecisionReviewPreviewOnlyStatement =
  "manual approval handoff decision review is preview-only";
export type ManualApprovalHandoffGateFailureReviewPreviewOnlyStatement =
  "manual approval handoff gate failure review is preview-only";
export type ManualApprovalHandoffRecoveryPlanPreviewOnlyStatement =
  "manual approval handoff recovery plan is preview-only";
export type ManualApprovalHandoffRecoveryReadinessPreviewOnlyStatement =
  "manual approval handoff recovery readiness is preview-only";
export type ManualApprovalHandoffReviewAuditSummaryPreviewOnlyStatement =
  "manual approval handoff review audit summary is preview-only";
export type ManualApprovalHandoffAcceptancePosturePreviewOnlyStatement =
  "manual approval handoff acceptance posture is preview-only";
export type ManualApprovalHandoffDecisionState =
  "held / approval not requested";
export type ManualApprovalHandoffReviewSeverity =
  | "critical"
  | "high"
  | "medium";
export type ManualApprovalHandoffRecoveryPosture = "manual review only";
export type ManualApprovalHandoffRetryPosture = "disabled";
export type ManualApprovalHandoffFallbackPosture = "disabled";
export type ManualApprovalHandoffReviewCurrentReadiness =
  "manual-approval-handoff-review-only / not approved / not executable / not persistent";
export type ManualApprovalHandoffManualOperatorReviewRequirement =
  "manual operator review required";
export type ManualApprovalHandoffManualRecoveryReviewRequirement =
  "manual recovery review required";
export type ManualApprovalHandoffNoApprovalRequestNoApprovalPersistenceStatement =
  "No approval request. No approval persistence.";
export type ManualApprovalHandoffNoGatePassStatement =
  "No gate pass is granted.";
export type ManualApprovalHandoffNoRetryNoFallbackNoApprovalExecutionNoPersistenceStatement =
  "No retry. No fallback. No approval execution. No persistence.";
export type ManualApprovalHandoffNoApprovalAcceptanceNoExecutionStatement =
  "No approval acceptance. No execution.";
export type ManualApprovalHandoffNoApprovalRequestStatement =
  "No approval request.";
export type ManualApprovalHandoffNoApprovalPersistenceStatement =
  "No approval persistence.";
export type ManualApprovalHandoffNoAuditPersistenceStatement =
  "No audit persistence.";
export type ManualApprovalHandoffNoResultPersistenceStatement =
  "No result persistence.";
export type ManualApprovalHandoffNoDatabaseWriteStatement =
  "No database write.";
export type ManualApprovalHandoffNoFileWriteStatement = "No file write.";
export type ManualApprovalHandoffAuditSummaryPosture = "preview-only";
export type ManualApprovalHandoffRecoveryReadinessState =
  | "blocked"
  | "manual review required"
  | "backend future required";
export type ManualApprovalHandoffRecoveryReadinessOwner =
  | "operator"
  | "backend future"
  | "safety review";
export type ManualApprovalHandoffAcceptanceState =
  "not accepted / preview-only";
export type ManualApprovalHandoffDecisionContractChecklist = readonly string[];
export type ManualApprovalHandoffReviewSectionTitle =
  | "Backend-owned synthetic dry-run manual approval handoff review"
  | "Manual approval handoff decision review"
  | "Manual approval handoff gate failure review"
  | "Manual approval handoff recovery plan"
  | "Manual approval handoff recovery readiness"
  | "Manual approval handoff review audit summary"
  | "Manual approval handoff acceptance posture";

export type ManualApprovalHandoffGateFailureState =
  | "held / end-to-end packet review incomplete"
  | "held / packet acceptance posture incomplete"
  | "held / evidence packet preview-only"
  | "held / operator approval not requested"
  | "held / manual confirmation not captured"
  | "held / approval scope preview-only"
  | "held / approval expiry not created"
  | "held / approval revocation not evaluated"
  | "held / kill switch review required"
  | "held / audit evidence not persisted"
  | "held / privacy/redaction review required"
  | "held / cost/rate/timeout guard review required"
  | "held / idempotency and replay review required"
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

export type ManualApprovalHandoffRecoveryReadinessChecklistId =
  | "handoff-contract-reviewed"
  | "handoff-packet-reviewed"
  | "handoff-request-contract-reviewed"
  | "handoff-response-contract-reviewed"
  | "handoff-error-contract-reviewed"
  | "manual-approval-scope-reviewed"
  | "handoff-gates-reviewed"
  | "handoff-readiness-matrix-reviewed"
  | "handoff-evidence-summary-reviewed"
  | "end-to-end-packet-review-reviewed"
  | "acceptance-posture-reviewed"
  | "operator-approval-evidence-reviewed"
  | "manual-confirmation-evidence-reviewed"
  | "approval-decision-reviewed"
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

export type ManualApprovalHandoffRecoveryReadinessChecklistLabel =
  | "handoff contract reviewed"
  | "handoff packet reviewed"
  | "handoff request contract reviewed"
  | "handoff response contract reviewed"
  | "handoff error contract reviewed"
  | "manual approval scope reviewed"
  | "handoff gates reviewed"
  | "handoff readiness matrix reviewed"
  | "handoff evidence summary reviewed"
  | "end-to-end packet review reviewed"
  | "acceptance posture reviewed"
  | "operator approval evidence reviewed"
  | "manual confirmation evidence reviewed"
  | "approval decision reviewed"
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

export type ManualApprovalHandoffReviewKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-review:${ManualApprovalHandoffReviewId}`;
export type ManualApprovalHandoffDecisionReviewKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-decision-review:${ManualApprovalHandoffReviewId}`;
export type ManualApprovalHandoffGateFailureReviewKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-gate-failure-review:${ManualApprovalHandoffReviewId}:${ManualApprovalHandoffGateId}`;
export type ManualApprovalHandoffRecoveryPlanKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-recovery-plan:${ManualApprovalHandoffReviewId}`;
export type ManualApprovalHandoffRecoveryReadinessChecklistKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-recovery-readiness:${ManualApprovalHandoffReviewId}:${ManualApprovalHandoffRecoveryReadinessChecklistId}`;
export type ManualApprovalHandoffReviewAuditSummaryKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-review-audit-summary:${ManualApprovalHandoffReviewId}`;
export type ManualApprovalHandoffAcceptancePostureKey =
  `backend-owned-synthetic-dry-run-manual-approval-handoff-acceptance-posture:${ManualApprovalHandoffReviewId}`;

export type BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord =
  Readonly<{
    id: ManualApprovalHandoffReviewId;
    key: ManualApprovalHandoffReviewKey;
    reviewVersion: ManualApprovalHandoffReviewVersion;
    previewOnlyStatement: ManualApprovalHandoffReviewPreviewOnlyStatement;
    source: ManualApprovalHandoffReviewSource;
    reviewMode: ManualApprovalHandoffReviewMode;
    reviewPosture: ManualApprovalHandoffReviewPosture;
    requestLabel: string;
    label: string;
    operatorRequestPhrase: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    sourceManualApprovalHandoffContractReference: ManualApprovalHandoffContractKey;
    sourceManualApprovalHandoffPacketReference: ManualApprovalHandoffPacketKey;
    sourceManualApprovalHandoffRequestReference: ManualApprovalHandoffRequestKey;
    sourceManualApprovalHandoffResponseReference: ManualApprovalHandoffResponseKey;
    sourceManualApprovalHandoffErrorReference: ManualApprovalHandoffErrorKey;
    sourceManualApprovalScopeReference: ManualApprovalScopeKey;
    sourceManualApprovalHandoffGateReference: ManualApprovalHandoffGateKey;
    sourceManualApprovalHandoffReadinessReference: ManualApprovalHandoffReadinessKey;
    sourceManualApprovalHandoffEvidenceSummaryReference: ManualApprovalHandoffEvidenceSummaryKey;
    sourceEndToEndPacketReviewReference:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["sourceEndToEndPacketReviewReference"];
    sourceEndToEndPacketAcceptancePostureReference:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["sourceEndToEndPacketAcceptancePostureReference"];
    sourceEndToEndPacketAuditSummaryReference:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["sourceEndToEndPacketReviewAuditSummaryReference"];
    sourceRunIntentReference:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["sourceRunIntentReference"];
    sourceApprovalPacketReference:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["sourceApprovalPacketReference"];
    sourceManualAdmissionPreviewReference:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["sourceManualAdmissionPreviewReference"];
    sourceBackendAdmissionContractReference:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["sourceBackendAdmissionContractReference"];
    selectedCapabilityFamily:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["selectedCapabilityFamily"];
    providerSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["providerSlotLabel"];
    backupProviderSlotLabel:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["backupProviderSlotLabel"];
    localPrivateAlternativeLabel:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["localPrivateAlternativeLabel"];
    handoffState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["handoffState"];
    handoffRequestState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["handoffRequestState"];
    handoffInvocationState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["handoffInvocationState"];
    handoffResponseState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["handoffResponseState"];
    handoffErrorState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["handoffErrorState"];
    operatorApprovalState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["operatorApprovalState"];
    manualConfirmationState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["manualConfirmationState"];
    approvalDecisionState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["approvalDecisionState"];
    approvalTokenState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["approvalTokenState"];
    approvalLeaseState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["approvalLeaseState"];
    approvalReferenceState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["approvalReferenceState"];
    auditReferenceState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["auditReferenceState"];
    resultReferenceState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["resultReferenceState"];
    evidencePacketState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["evidencePacketState"];
    endToEndPacketState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["endToEndPacketState"];
    packetDecisionState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["packetDecisionState"];
    admissionState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["admissionState"];
    dryRunExecutionState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["dryRunExecutionState"];
    resultCaptureState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["resultCaptureState"];
    auditJoinState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["auditJoinState"];
    approvalJoinState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["approvalJoinState"];
    databaseWriteState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["databaseWriteState"];
    fileWriteState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["fileWriteState"];
    queueDispatchState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["queueDispatchState"];
    workerDispatchState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["workerDispatchState"];
    jobExecutionState:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["jobExecutionState"];
    providerCallPosture:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["providerCallPosture"];
    modelCallPosture:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["modelCallPosture"];
    promptSendingPosture:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["promptSendingPosture"];
    sdkPosture:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["sdkPosture"];
    credentialPosture:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["credentialPosture"];
    secretPosture:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["secretPosture"];
    frontendPosture:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["frontendPosture"];
    backendPosture:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["backendPosture"];
    executionPosture:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["executionPosture"];
    manualOperatorReviewRequired:
      ManualApprovalHandoffManualOperatorReviewRequirement;
    manualRecoveryReviewRequired:
      ManualApprovalHandoffManualRecoveryReviewRequirement;
    manualApprovalRequired:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["manualApprovalRequired"];
    manualConfirmationRequired:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["manualConfirmationRequired"];
    killSwitchRequired:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["killSwitchRequired"];
    auditRequired:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["auditRequired"];
    privacyRedactionRequired:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["privacyRedactionRequired"];
    costAcknowledgementRequired:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["costAcknowledgementRequired"];
    rateLimitGuardRequired:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["rateLimitGuardRequired"];
    timeoutCancelGuardRequired:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["timeoutCancelGuardRequired"];
    idempotencyRequired:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["idempotencyRequired"];
    replayBlockRequired:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["replayBlockRequired"];
    singleRunLockRequired:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["singleRunLockRequired"];
    noRetryExecution:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["noRetryExecution"];
    noFallbackExecution:
      BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["noFallbackExecution"];
    nextManualApprovalDecisionContractRequirement:
      typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
    currentReadiness: ManualApprovalHandoffReviewCurrentReadiness;
  }>;

export type ManualApprovalHandoffDecisionReviewRecord = Readonly<{
  id: ManualApprovalHandoffReviewId;
  key: ManualApprovalHandoffDecisionReviewKey;
  decisionReviewVersion: ManualApprovalHandoffDecisionReviewVersion;
  previewOnlyStatement: ManualApprovalHandoffDecisionReviewPreviewOnlyStatement;
  handoffReviewId: ManualApprovalHandoffReviewId;
  sourceHandoffContractReference: ManualApprovalHandoffContractKey;
  sourceHandoffPacketReference: ManualApprovalHandoffPacketKey;
  sourceRequestReference: ManualApprovalHandoffRequestKey;
  sourceResponseReference: ManualApprovalHandoffResponseKey;
  sourceErrorReference: ManualApprovalHandoffErrorKey;
  decisionState: ManualApprovalHandoffDecisionState;
  approvalReasonSummary: string;
  topBlockingGates: readonly ManualApprovalHandoffGateLabel[];
  topMissingEvidence: readonly string[];
  operatorReviewNotes: readonly string[];
  manualRecoveryRequirement: string;
  manualApprovalDecisionDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  nextSafeAction: string;
  explicitNoApprovalRequestNoApprovalPersistenceStatement:
    ManualApprovalHandoffNoApprovalRequestNoApprovalPersistenceStatement;
}>;

export type ManualApprovalHandoffGateFailureReviewRecord = Readonly<{
  key: ManualApprovalHandoffGateFailureReviewKey;
  gateFailureReviewVersion: ManualApprovalHandoffGateFailureReviewVersion;
  previewOnlyStatement: ManualApprovalHandoffGateFailureReviewPreviewOnlyStatement;
  handoffReviewId: ManualApprovalHandoffReviewId;
  failedGateId: ManualApprovalHandoffGateId;
  failedGateLabel: ManualApprovalHandoffGateLabel;
  gateState: ManualApprovalHandoffGateFailureState;
  severity: ManualApprovalHandoffReviewSeverity;
  affectedCapabilityFamily:
    BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["selectedCapabilityFamily"];
  affectedWorkspaceTarget: AiModelProviderWorkspaceTarget;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  manualApprovalDecisionDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  nextSafeAction: string;
  explicitNoGatePassStatement: ManualApprovalHandoffNoGatePassStatement;
}>;

export type ManualApprovalHandoffRecoveryPlanPreviewRecord = Readonly<{
  id: ManualApprovalHandoffReviewId;
  key: ManualApprovalHandoffRecoveryPlanKey;
  recoveryPlanVersion: ManualApprovalHandoffRecoveryPlanVersion;
  previewOnlyStatement: ManualApprovalHandoffRecoveryPlanPreviewOnlyStatement;
  handoffReviewId: ManualApprovalHandoffReviewId;
  recoveryPosture: ManualApprovalHandoffRecoveryPosture;
  endToEndPacketReviewRecovery: string;
  acceptancePostureRecovery: string;
  evidencePacketRecovery: string;
  operatorApprovalNotRequestedRecovery: string;
  manualConfirmationNotCapturedRecovery: string;
  approvalDecisionNotEvaluatedRecovery: string;
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
  retryPosture: ManualApprovalHandoffRetryPosture;
  fallbackPosture: ManualApprovalHandoffFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  explicitNoRetryNoFallbackNoApprovalExecutionNoPersistenceStatement:
    ManualApprovalHandoffNoRetryNoFallbackNoApprovalExecutionNoPersistenceStatement;
}>;

export type ManualApprovalHandoffRecoveryReadinessChecklistRecord = Readonly<{
  key: ManualApprovalHandoffRecoveryReadinessChecklistKey;
  checklistVersion: ManualApprovalHandoffRecoveryReadinessChecklistVersion;
  handoffReviewId: ManualApprovalHandoffReviewId;
  checklistId: ManualApprovalHandoffRecoveryReadinessChecklistId;
  label: ManualApprovalHandoffRecoveryReadinessChecklistLabel;
  state: ManualApprovalHandoffRecoveryReadinessState;
  severity: ManualApprovalHandoffReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ManualApprovalHandoffRecoveryReadinessOwner;
  currentPosture: ManualApprovalHandoffReviewMode;
  manualApprovalDecisionContractDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  nextSafeAction: string;
}>;

export type ManualApprovalHandoffReviewAuditSummaryRecord = Readonly<{
  id: ManualApprovalHandoffReviewId;
  key: ManualApprovalHandoffReviewAuditSummaryKey;
  auditSummaryVersion: ManualApprovalHandoffReviewAuditSummaryVersion;
  previewOnlyStatement:
    ManualApprovalHandoffReviewAuditSummaryPreviewOnlyStatement;
  handoffReviewId: ManualApprovalHandoffReviewId;
  auditPosture: ManualApprovalHandoffAuditSummaryPosture;
  approvalReferenceState:
    BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["approvalReferenceState"];
  auditReferenceState:
    BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["auditReferenceState"];
  resultReferenceState:
    BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["resultReferenceState"];
  evidencePacketState:
    BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["evidencePacketState"];
  handoffEvidenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noApprovalRequestStatement: ManualApprovalHandoffNoApprovalRequestStatement;
  noApprovalPersistenceStatement:
    ManualApprovalHandoffNoApprovalPersistenceStatement;
  noAuditPersistenceStatement: ManualApprovalHandoffNoAuditPersistenceStatement;
  noResultPersistenceStatement:
    ManualApprovalHandoffNoResultPersistenceStatement;
  noDatabaseWriteStatement: ManualApprovalHandoffNoDatabaseWriteStatement;
  noFileWriteStatement: ManualApprovalHandoffNoFileWriteStatement;
  manualApprovalDecisionContractRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
}>;

export type ManualApprovalHandoffAcceptancePostureRecord = Readonly<{
  id: ManualApprovalHandoffReviewId;
  key: ManualApprovalHandoffAcceptancePostureKey;
  acceptancePostureVersion: ManualApprovalHandoffAcceptancePostureVersion;
  previewOnlyStatement:
    ManualApprovalHandoffAcceptancePosturePreviewOnlyStatement;
  handoffReviewId: ManualApprovalHandoffReviewId;
  acceptanceState: ManualApprovalHandoffAcceptanceState;
  approvalBlockers: readonly string[];
  manualConfirmationBlockers: readonly string[];
  evidencePacketBlockers: readonly string[];
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
  explicitNoApprovalAcceptanceNoExecutionStatement:
    ManualApprovalHandoffNoApprovalAcceptanceNoExecutionStatement;
}>;

export type ManualApprovalHandoffReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel:
    BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["selectedCapabilityFamily"]["label"];
  reviewCount: number;
  reviews: readonly BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord[];
}>;

export type ManualApprovalHandoffReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  reviewCount: number;
  reviews: readonly BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord[];
}>;

export type ManualApprovalHandoffReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  reviewCount: number;
  decisionReviewCount: number;
  gateFailureCount: number;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  handoffState:
    BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["handoffState"];
  currentReadiness: ManualApprovalHandoffReviewCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type ManualApprovalHandoffGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  gateFailureCount: number;
  summaryLines: readonly string[];
  topFailedGateLabels: readonly ManualApprovalHandoffGateLabel[];
  nextSafeAction: string;
}>;

export type ManualApprovalHandoffRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  currentReadiness:
    ManualApprovalHandoffReviewCurrentReadiness |
    ManualApprovalHandoffContractCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;
