import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
} from "../athena-model-routing-provider-selection-preview";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
  type AuditApprovalEvidencePacketKey,
  type AuditApprovalJoinContractId,
  type AuditApprovalJoinContractKey,
  type AuditApprovalJoinErrorContractKey,
  type AuditApprovalJoinGateKey,
  type AuditApprovalJoinReadinessKey,
  type AuditApprovalJoinRequestContractKey,
  type AuditApprovalJoinResponseContractKey,
  type BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord,
  type ResultAuditApprovalLinkContractKey,
  type SyntheticApprovalJoinContractKey,
  type SyntheticAuditJoinContractKey,
} from "../backend-owned-synthetic-dry-run-audit-approval-join-contract";
import type { SyntheticResultEnvelopeKey } from "../backend-owned-synthetic-dry-run-result-capture-contract";
import type {
  ResultCaptureAcceptancePostureKey,
  ResultCaptureReviewKey,
} from "../backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";
import type { ModelProviderRunIntentKey } from "../model-provider-approval-packet-run-intent-preview";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5162-5193 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE =
  5193;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH =
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;

export const NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH =
  "5194-5225 - Backend-Owned Synthetic Dry-Run End-to-End Packet Contract";

export type AuditApprovalJoinReviewId = AuditApprovalJoinContractId;

export type AuditApprovalJoinReviewVersion =
  "backend-owned-synthetic-dry-run-audit-approval-join-review-preview-v1";
export type AuditApprovalJoinDecisionReviewVersion =
  "backend-owned-synthetic-dry-run-audit-approval-join-decision-review-preview-v1";
export type AuditApprovalJoinGateFailureReviewVersion =
  "backend-owned-synthetic-dry-run-audit-approval-join-gate-failure-review-preview-v1";
export type AuditApprovalJoinRecoveryPlanVersion =
  "backend-owned-synthetic-dry-run-audit-approval-join-recovery-plan-preview-v1";
export type AuditApprovalJoinRecoveryReadinessChecklistVersion =
  "backend-owned-synthetic-dry-run-audit-approval-join-recovery-readiness-checklist-v1";
export type AuditApprovalJoinRecoveryReadinessChecklistMarker =
  "audit and approval join recovery readiness checklist";
export type AuditApprovalJoinReviewAuditSummaryVersion =
  "backend-owned-synthetic-dry-run-audit-approval-join-review-audit-summary-preview-v1";
export type AuditApprovalJoinAcceptancePostureVersion =
  "backend-owned-synthetic-dry-run-audit-approval-join-acceptance-posture-preview-v1";

export type AuditApprovalJoinReviewSource =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["source"];
export type AuditApprovalJoinReviewMode = "preview-only";
export type AuditApprovalJoinReviewPosture =
  "audit and approval join review / not persistent";
export type AuditApprovalJoinDecisionState = "held / not joined";
export type AuditApprovalJoinReviewPreviewOnlyStatement =
  "audit and approval join review is preview-only";
export type AuditApprovalJoinDecisionReviewPreviewOnlyStatement =
  "audit and approval join decision review is preview-only";
export type AuditApprovalJoinGateFailureReviewPreviewOnlyStatement =
  "audit and approval join gate failure review is preview-only";
export type AuditApprovalJoinRecoveryPlanPreviewOnlyStatement =
  "audit and approval join recovery plan is preview-only";
export type AuditApprovalJoinRecoveryReadinessPreviewOnlyStatement =
  "audit and approval join recovery readiness is preview-only";
export type AuditApprovalJoinReviewAuditSummaryPreviewOnlyStatement =
  "audit and approval join review audit summary is preview-only";
export type AuditApprovalJoinAcceptancePosturePreviewOnlyStatement =
  "audit and approval join acceptance posture is preview-only";
export type AuditApprovalJoinManualOperatorReviewRequirement =
  "manual operator review required";
export type AuditApprovalJoinManualRecoveryReviewRequirement =
  "manual recovery review required";
export type AuditApprovalJoinReviewSeverity = "critical" | "high" | "medium";
export type AuditApprovalJoinRecoveryPosture = "manual review only";
export type AuditApprovalJoinRetryPosture = "disabled";
export type AuditApprovalJoinFallbackPosture = "disabled";
export type AuditApprovalJoinAuditSummaryPosture = "preview-only";
export type AuditApprovalJoinAcceptanceState =
  "not accepted / preview-only";
export type AuditApprovalJoinRecoveryReadinessState =
  | "blocked"
  | "manual review required"
  | "backend future required";
export type AuditApprovalJoinRecoveryReadinessOwner =
  | "operator"
  | "backend future"
  | "safety review";
export type AuditApprovalJoinNoAuditApprovalJoinNoPersistenceStatement =
  "No audit/approval join. No persistence.";
export type AuditApprovalJoinNoGatePassStatement =
  "Gate remains blocked. No gate pass is granted.";
export type AuditApprovalJoinNoRetryNoFallbackNoPersistenceStatement =
  "No retry. No fallback. No persistence. Manual review only.";
export type AuditApprovalJoinNoAcceptanceNoPersistenceStatement =
  "No acceptance. No persistence. Preview-only.";

export type AuditApprovalJoinGateFailureId =
  | "synthetic-result-envelope-gate"
  | "result-capture-review-gate"
  | "result-capture-acceptance-posture-gate"
  | "audit-join-contract-gate"
  | "approval-join-contract-gate"
  | "result-to-audit-approval-link-gate"
  | "join-request-contract-gate"
  | "join-response-contract-gate"
  | "join-error-contract-gate"
  | "evidence-packet-gate"
  | "operator-approval-gate"
  | "manual-confirmation-gate"
  | "kill-switch-gate"
  | "audit-gate"
  | "server-only-boundary-gate"
  | "opaque-credential-gate"
  | "privacy-redaction-gate"
  | "cost-rate-timeout-gate"
  | "idempotency-replay-gate"
  | "single-run-lock-gate"
  | "result-persistence-gate"
  | "audit-persistence-gate"
  | "approval-persistence-gate"
  | "database-write-gate"
  | "file-write-gate"
  | "queue-dispatch-gate"
  | "worker-dispatch-gate"
  | "job-execution-gate";

export type AuditApprovalJoinGateFailureLabel =
  | "synthetic result envelope gate failure"
  | "result capture review gate failure"
  | "result capture acceptance posture gate failure"
  | "audit join contract gate failure"
  | "approval join contract gate failure"
  | "result-to-audit-approval link gate failure"
  | "join request contract gate failure"
  | "join response contract gate failure"
  | "join error contract gate failure"
  | "evidence packet gate failure"
  | "operator approval gate failure"
  | "manual confirmation gate failure"
  | "kill switch gate failure"
  | "audit gate failure"
  | "server-only boundary gate failure"
  | "opaque credential gate failure"
  | "privacy/redaction gate failure"
  | "cost/rate/timeout gate failure"
  | "idempotency/replay gate failure"
  | "single-run lock gate failure"
  | "result persistence gate failure"
  | "audit persistence gate failure"
  | "approval persistence gate failure"
  | "database write gate failure"
  | "file write gate failure"
  | "queue dispatch gate failure"
  | "worker dispatch gate failure"
  | "job execution gate failure";

export type AuditApprovalJoinGateFailureState =
  | "held / synthetic result envelope preview-only"
  | "held / result capture review preview-only"
  | "held / result capture acceptance posture preview-only"
  | "held / audit join contract preview-only"
  | "held / approval join contract preview-only"
  | "held / result-to-audit-approval link preview-only"
  | "held / join request not created"
  | "held / join response not received"
  | "held / join error not received"
  | "held / evidence packet preview-only"
  | "held / operator approval missing"
  | "held / manual confirmation missing"
  | "held / kill switch review required"
  | "held / audit evidence missing"
  | "held / server-only boundary required"
  | "held / opaque credential reference required"
  | "held / privacy redaction incomplete"
  | "held / cost rate timeout review incomplete"
  | "held / idempotency replay block not proven"
  | "held / single-run lock missing"
  | "held / result persistence not implemented"
  | "held / audit persistence not implemented"
  | "held / approval persistence not implemented"
  | "held / database write not implemented"
  | "held / file write not implemented"
  | "held / queue dispatch blocked"
  | "held / worker dispatch blocked"
  | "held / job execution blocked";

export type AuditApprovalJoinRecoveryReadinessChecklistId =
  | "audit-join-contract-reviewed"
  | "approval-join-contract-reviewed"
  | "result-link-contract-reviewed"
  | "join-request-contract-reviewed"
  | "join-response-contract-reviewed"
  | "join-error-contract-reviewed"
  | "join-gates-reviewed"
  | "join-readiness-matrix-reviewed"
  | "evidence-packet-reviewed"
  | "audit-evidence-reviewed"
  | "approval-evidence-reviewed"
  | "result-evidence-reviewed"
  | "result-digest-reviewed"
  | "result-id-reviewed"
  | "privacy-redaction-reviewed"
  | "cost-rate-reviewed"
  | "timeout-cancel-reviewed"
  | "idempotency-replay-reviewed"
  | "single-run-lock-reviewed"
  | "audit-persistence-still-blocked"
  | "approval-persistence-still-blocked"
  | "result-persistence-still-blocked"
  | "database-writes-still-blocked"
  | "file-writes-still-blocked"
  | "queue-dispatch-still-blocked"
  | "worker-dispatch-still-blocked"
  | "job-execution-still-blocked";

export type AuditApprovalJoinRecoveryReadinessChecklistLabel =
  | "audit join contract reviewed"
  | "approval join contract reviewed"
  | "result link contract reviewed"
  | "join request contract reviewed"
  | "join response contract reviewed"
  | "join error contract reviewed"
  | "join gates reviewed"
  | "join readiness matrix reviewed"
  | "evidence packet reviewed"
  | "audit evidence reviewed"
  | "approval evidence reviewed"
  | "result evidence reviewed"
  | "result digest reviewed"
  | "result id reviewed"
  | "privacy/redaction reviewed"
  | "cost/rate reviewed"
  | "timeout/cancel reviewed"
  | "idempotency/replay reviewed"
  | "single-run lock reviewed"
  | "audit persistence still blocked"
  | "approval persistence still blocked"
  | "result persistence still blocked"
  | "database writes still blocked"
  | "file writes still blocked"
  | "queue dispatch still blocked"
  | "worker dispatch still blocked"
  | "job execution still blocked";

export type AuditApprovalJoinReviewKey =
  `backend-owned-synthetic-dry-run-audit-approval-join-review:${AuditApprovalJoinReviewId}`;
export type AuditApprovalJoinDecisionReviewKey =
  `backend-owned-synthetic-dry-run-audit-approval-join-decision-review:${AuditApprovalJoinReviewId}`;
export type AuditApprovalJoinGateFailureReviewKey =
  `backend-owned-synthetic-dry-run-audit-approval-join-gate-failure-review:${AuditApprovalJoinReviewId}:${AuditApprovalJoinGateFailureId}`;
export type AuditApprovalJoinRecoveryPlanKey =
  `backend-owned-synthetic-dry-run-audit-approval-join-recovery-plan:${AuditApprovalJoinReviewId}`;
export type AuditApprovalJoinRecoveryReadinessChecklistKey =
  `backend-owned-synthetic-dry-run-audit-approval-join-recovery-readiness:${AuditApprovalJoinRecoveryReadinessChecklistId}`;
export type AuditApprovalJoinReviewAuditSummaryKey =
  `backend-owned-synthetic-dry-run-audit-approval-join-review-audit-summary:${AuditApprovalJoinReviewId}`;
export type AuditApprovalJoinAcceptancePostureKey =
  `backend-owned-synthetic-dry-run-audit-approval-join-acceptance-posture:${AuditApprovalJoinReviewId}`;

export type BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord =
  Readonly<{
    id: AuditApprovalJoinReviewId;
    key: AuditApprovalJoinReviewKey;
    reviewVersion: AuditApprovalJoinReviewVersion;
    previewOnlyStatement: AuditApprovalJoinReviewPreviewOnlyStatement;
    source: AuditApprovalJoinReviewSource;
    reviewMode: AuditApprovalJoinReviewMode;
    reviewPosture: AuditApprovalJoinReviewPosture;
    label: string;
    operatorRequestPhrase: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    sourceAuditApprovalJoinContractReference: AuditApprovalJoinContractKey;
    sourceSyntheticAuditJoinContractReference: SyntheticAuditJoinContractKey;
    sourceSyntheticApprovalJoinContractReference: SyntheticApprovalJoinContractKey;
    sourceResultToAuditApprovalLinkReference: ResultAuditApprovalLinkContractKey;
    sourceAuditApprovalJoinRequestReference: AuditApprovalJoinRequestContractKey;
    sourceAuditApprovalJoinResponseReference: AuditApprovalJoinResponseContractKey;
    sourceAuditApprovalJoinErrorReference: AuditApprovalJoinErrorContractKey;
    sourceAuditApprovalJoinGateReference: AuditApprovalJoinGateKey;
    sourceAuditApprovalJoinReadinessReference: AuditApprovalJoinReadinessKey;
    sourceAuditApprovalEvidencePacketReference: AuditApprovalEvidencePacketKey;
    sourceResultCaptureReviewReference: ResultCaptureReviewKey;
    sourceResultCaptureAcceptancePostureReference: ResultCaptureAcceptancePostureKey;
    sourceSyntheticResultEnvelopeReference: SyntheticResultEnvelopeKey;
    sourceRunIntentReference: ModelProviderRunIntentKey;
    selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
    providerSlotLabel:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["providerSlotLabel"];
    backupProviderSlotLabel:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["backupProviderSlotLabel"];
    localPrivateAlternativeLabel:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["localPrivateAlternativeLabel"];
    auditJoinState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["auditJoinState"];
    approvalJoinState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["approvalJoinState"];
    resultReferenceState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["resultReferenceState"];
    evidencePacketState: "preview-only";
    joinRequestState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["joinRequestState"];
    joinInvocationState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["joinInvocationState"];
    joinResponseState: "not received";
    joinErrorState: "not received";
    auditEnvelopeState: "not created";
    approvalEnvelopeState: "not created";
    auditAppendState: "not appended";
    approvalAppendState: "not appended";
    auditPersistenceState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["auditPersistenceState"];
    approvalPersistenceState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["approvalPersistenceState"];
    resultPersistenceState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["resultPersistenceState"];
    artifactPersistenceState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["artifactPersistenceState"];
    databaseWriteState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["databaseWriteState"];
    fileWriteState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["fileWriteState"];
    resultIdState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["resultIdState"];
    resultDigestPosture:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["resultDigestPosture"];
    providerResponseState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["providerResponseState"];
    modelOutputState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["modelOutputState"];
    syntheticFixtureResultState:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["syntheticFixtureResultState"];
    providerCallPosture:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["providerCallPosture"];
    modelCallPosture:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["modelCallPosture"];
    promptSendingPosture:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["promptSendingPosture"];
    sdkPosture:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["sdkPosture"];
    credentialPosture:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["credentialPosture"];
    secretPosture:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["secretPosture"];
    frontendPosture:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["frontendPosture"];
    backendPosture:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["backendPosture"];
    executionPosture:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["executionPosture"];
    manualOperatorReviewRequired: AuditApprovalJoinManualOperatorReviewRequirement;
    manualRecoveryReviewRequired: AuditApprovalJoinManualRecoveryReviewRequirement;
    manualApprovalRequired:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["manualApprovalRequired"];
    manualConfirmationRequired:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["manualConfirmationRequired"];
    killSwitchRequired:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["killSwitchRequired"];
    auditRequired:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["auditRequired"];
    privacyRedactionRequired:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["privacyRedactionRequired"];
    costAcknowledgementRequired:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["costAcknowledgementRequired"];
    rateLimitGuardRequired:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["rateLimitGuardRequired"];
    timeoutCancelGuardRequired:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["timeoutCancelGuardRequired"];
    idempotencyRequired:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["idempotencyRequired"];
    replayBlockRequired:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["replayBlockRequired"];
    singleRunLockRequired:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["singleRunLockRequired"];
    noRetryExecution:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["noRetryExecution"];
    noFallbackExecution:
      BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["noFallbackExecution"];
    nextEndToEndPacketContractRequirement:
      typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
  }>;

export type AuditApprovalJoinDecisionReviewRecord = Readonly<{
  key: AuditApprovalJoinDecisionReviewKey;
  decisionReviewVersion: AuditApprovalJoinDecisionReviewVersion;
  previewOnlyStatement: AuditApprovalJoinDecisionReviewPreviewOnlyStatement;
  auditApprovalJoinReviewId: AuditApprovalJoinReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  sourceJoinContractReference: AuditApprovalJoinContractKey;
  sourceAuditJoinReference: SyntheticAuditJoinContractKey;
  sourceApprovalJoinReference: SyntheticApprovalJoinContractKey;
  sourceLinkContractReference: ResultAuditApprovalLinkContractKey;
  decisionState: AuditApprovalJoinDecisionState;
  joinReasonSummary: string;
  topBlockingGates: readonly AuditApprovalJoinGateFailureLabel[];
  topMissingEvidence: readonly string[];
  operatorReviewNotes: readonly string[];
  manualRecoveryRequirement: string;
  endToEndPacketDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
  nextSafeAction: string;
  explicitNoAuditApprovalJoinNoPersistenceStatement:
    AuditApprovalJoinNoAuditApprovalJoinNoPersistenceStatement;
}>;

export type AuditApprovalJoinGateFailureReviewRecord = Readonly<{
  key: AuditApprovalJoinGateFailureReviewKey;
  gateFailureReviewVersion: AuditApprovalJoinGateFailureReviewVersion;
  previewOnlyStatement: AuditApprovalJoinGateFailureReviewPreviewOnlyStatement;
  auditApprovalJoinReviewId: AuditApprovalJoinReviewId;
  label: string;
  failedGateId: AuditApprovalJoinGateFailureId;
  failedGateLabel: AuditApprovalJoinGateFailureLabel;
  gateState: AuditApprovalJoinGateFailureState;
  severity: AuditApprovalJoinReviewSeverity;
  affectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  affectedWorkspaceTarget: AiModelProviderWorkspaceTarget;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  endToEndPacketDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
  nextSafeAction: string;
  explicitNoGatePassStatement: AuditApprovalJoinNoGatePassStatement;
}>;

export type AuditApprovalJoinRecoveryPlanPreviewRecord = Readonly<{
  key: AuditApprovalJoinRecoveryPlanKey;
  recoveryPlanVersion: AuditApprovalJoinRecoveryPlanVersion;
  previewOnlyStatement: AuditApprovalJoinRecoveryPlanPreviewOnlyStatement;
  auditApprovalJoinReviewId: AuditApprovalJoinReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  recoveryPosture: AuditApprovalJoinRecoveryPosture;
  missingAuditEvidenceRecovery: string;
  missingApprovalEvidenceRecovery: string;
  missingResultReferenceRecovery: string;
  missingEvidencePacketRecovery: string;
  joinRequestNotCreatedRecovery: string;
  joinResponseNotReceivedRecovery: string;
  joinErrorNotReceivedRecovery: string;
  auditEnvelopeNotCreatedRecovery: string;
  approvalEnvelopeNotCreatedRecovery: string;
  auditAppendNotAppendedRecovery: string;
  approvalAppendNotAppendedRecovery: string;
  resultLinkNotPersistedRecovery: string;
  auditPersistenceMissingRecovery: string;
  approvalPersistenceMissingRecovery: string;
  resultPersistenceMissingRecovery: string;
  artifactPersistenceMissingRecovery: string;
  databaseWriteBlockedRecovery: string;
  fileWriteBlockedRecovery: string;
  privacyRedactionRecovery: string;
  retryPosture: AuditApprovalJoinRetryPosture;
  fallbackPosture: AuditApprovalJoinFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
  explicitNoRetryNoFallbackNoPersistenceStatement:
    AuditApprovalJoinNoRetryNoFallbackNoPersistenceStatement;
}>;

export type AuditApprovalJoinRecoveryReadinessChecklistRecord = Readonly<{
  key: AuditApprovalJoinRecoveryReadinessChecklistKey;
  checklistVersion: AuditApprovalJoinRecoveryReadinessChecklistVersion;
  previewOnlyStatement: AuditApprovalJoinRecoveryReadinessPreviewOnlyStatement;
  checklistId: AuditApprovalJoinRecoveryReadinessChecklistId;
  label: AuditApprovalJoinRecoveryReadinessChecklistLabel;
  state: AuditApprovalJoinRecoveryReadinessState;
  severity: AuditApprovalJoinReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: AuditApprovalJoinRecoveryReadinessOwner;
  currentPosture: "preview-only";
  endToEndPacketContractDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
  nextSafeAction: string;
}>;

export type AuditApprovalJoinReviewAuditSummaryRecord = Readonly<{
  key: AuditApprovalJoinReviewAuditSummaryKey;
  auditSummaryVersion: AuditApprovalJoinReviewAuditSummaryVersion;
  previewOnlyStatement: AuditApprovalJoinReviewAuditSummaryPreviewOnlyStatement;
  auditApprovalJoinReviewId: AuditApprovalJoinReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  auditPosture: AuditApprovalJoinAuditSummaryPosture;
  auditReferenceState: "not persisted";
  approvalReferenceState: "not persisted";
  resultReferenceState: "not persisted";
  evidencePacketState: "preview-only";
  evidenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noAuditPersistenceStatement: "No audit persistence";
  noApprovalPersistenceStatement: "No approval persistence";
  noResultPersistenceStatement: "No result persistence";
  noDatabaseWriteStatement: "No database write";
  noFileWriteStatement: "No file write";
  endToEndPacketContractRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
}>;

export type AuditApprovalJoinAcceptancePostureRecord = Readonly<{
  key: AuditApprovalJoinAcceptancePostureKey;
  acceptancePostureVersion: AuditApprovalJoinAcceptancePostureVersion;
  previewOnlyStatement: AuditApprovalJoinAcceptancePosturePreviewOnlyStatement;
  auditApprovalJoinReviewId: AuditApprovalJoinReviewId;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  acceptanceState: AuditApprovalJoinAcceptanceState;
  acceptanceBlockers: readonly string[];
  safetyBlockers: readonly string[];
  privacyBlockers: readonly string[];
  costRateBlockers: readonly string[];
  auditBlockers: readonly string[];
  approvalBlockers: readonly string[];
  resultLinkBlockers: readonly string[];
  evidencePacketBlockers: readonly string[];
  persistenceBlockers: readonly string[];
  databaseFileBlockers: readonly string[];
  queueWorkerJobBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitNoAcceptanceNoPersistenceStatement:
    AuditApprovalJoinNoAcceptanceNoPersistenceStatement;
}>;

export type AuditApprovalJoinReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  reviewCount: number;
  reviews: readonly BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord[];
}>;

export type AuditApprovalJoinReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  reviewCount: number;
  reviews: readonly BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord[];
}>;

export type AuditApprovalJoinReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
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

export type AuditApprovalJoinGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  gateFailureReviewCount: number;
  uniqueFailedGateCount: number;
  criticalGateCount: number;
  highGateCount: number;
  mediumGateCount: number;
  summaryLines: readonly string[];
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
}>;

export type AuditApprovalJoinRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  recoveryPlanCount: number;
  recoveryReadinessChecklistCount: number;
  blockedChecklistCount: number;
  acceptancePostureCount: number;
  summaryLines: readonly string[];
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
  nextSafeAction: string;
}>;
