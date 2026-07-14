import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
} from "../athena-model-routing-provider-selection-preview";
import type { BackendAdmissionContractKey } from "../backend-owned-model-provider-run-admission-contract";
import type { BackendDryRunRunnerContractKey } from "../backend-owned-model-provider-dry-run-runner-contract";
import type { SyntheticRunnerSkeletonKey } from "../backend-owned-model-provider-synthetic-dry-run-runner-skeleton";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
  type BackendOwnedSyntheticDryRunEndToEndPacketContractRecord,
  type EndToEndPacketAcceptanceKey,
  type EndToEndPacketContractId,
  type EndToEndPacketContractKey,
  type EndToEndPacketErrorKey,
  type EndToEndPacketGateKey,
  type EndToEndPacketLineageKey,
  type EndToEndPacketReadinessKey,
  type EndToEndPacketRequestKey,
  type EndToEndPacketResponseKey,
  type EndToEndPacketStageKey,
} from "../backend-owned-synthetic-dry-run-end-to-end-packet-contract";
import type { AuditApprovalJoinReviewKey } from "../backend-owned-synthetic-dry-run-audit-approval-join-review-recovery-preview";
import type { ResultCaptureReviewKey } from "../backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";
import type {
  ModelProviderApprovalPacketKey,
  ModelProviderRunIntentKey,
} from "../model-provider-approval-packet-run-intent-preview";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5226-5257 - Backend-Owned Synthetic Dry-Run End-to-End Packet Review and Recovery Preview";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_PHASE =
  5257;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH =
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;

export const NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH =
  "5258-5289 - Backend-Owned Synthetic Dry-Run Manual Approval Handoff Contract";

export type EndToEndPacketReviewId = EndToEndPacketContractId;

export type EndToEndPacketReviewVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-review-preview-v1";
export type EndToEndPacketDecisionReviewVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-decision-review-preview-v1";
export type EndToEndPacketStageFailureReviewVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-stage-failure-review-preview-v1";
export type EndToEndPacketGateFailureReviewVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-gate-failure-review-preview-v1";
export type EndToEndPacketRecoveryPlanVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-recovery-plan-preview-v1";
export type EndToEndPacketRecoveryReadinessChecklistVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-recovery-readiness-checklist-v1";
export type EndToEndPacketReviewAuditSummaryVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-review-audit-summary-preview-v1";
export type EndToEndPacketAcceptancePostureVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-acceptance-posture-preview-v1";

export type EndToEndPacketReviewSource =
  BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["source"];
export type EndToEndPacketReviewMode = "preview-only";
export type EndToEndPacketReviewPosture =
  "end-to-end packet review / not executable / not persistent";
export type EndToEndPacketReviewPreviewOnlyStatement =
  "end-to-end packet review is preview-only";
export type EndToEndPacketDecisionReviewPreviewOnlyStatement =
  "packet decision review is preview-only";
export type EndToEndPacketStageFailureReviewPreviewOnlyStatement =
  "packet stage failure review is preview-only";
export type EndToEndPacketGateFailureReviewPreviewOnlyStatement =
  "packet gate failure review is preview-only";
export type EndToEndPacketRecoveryPlanPreviewOnlyStatement =
  "packet recovery plan is preview-only";
export type EndToEndPacketRecoveryReadinessPreviewOnlyStatement =
  "packet recovery readiness is preview-only";
export type EndToEndPacketReviewAuditSummaryPreviewOnlyStatement =
  "packet review audit summary is preview-only";
export type EndToEndPacketAcceptancePosturePreviewOnlyStatement =
  "packet acceptance posture is preview-only";
export type EndToEndPacketDecisionState = "held / not accepted";
export type EndToEndPacketReviewSeverity = "critical" | "high" | "medium";
export type EndToEndPacketRecoveryPosture = "manual review only";
export type EndToEndPacketRetryPosture = "disabled";
export type EndToEndPacketFallbackPosture = "disabled";
export type EndToEndPacketReviewCurrentReadiness =
  "end-to-end-packet-review-only / not executable / not persistent";
export type EndToEndPacketManualOperatorReviewRequirement =
  "manual operator review required";
export type EndToEndPacketManualRecoveryReviewRequirement =
  "manual recovery review required";
export type EndToEndPacketNoExecutionNoPersistenceStatement =
  "No end-to-end packet execution. No persistence.";
export type EndToEndPacketNoStagePassNoExecutionStatement =
  "No stage pass. No execution.";
export type EndToEndPacketNoGatePassStatement =
  "No gate pass is granted.";
export type EndToEndPacketNoRetryNoFallbackNoExecutionNoPersistenceStatement =
  "No retry. No fallback. No execution. No persistence.";
export type EndToEndPacketNoAcceptanceNoExecutionStatement =
  "No end-to-end acceptance. No execution.";
export type EndToEndPacketNoResultPersistenceStatement =
  "No result persistence.";
export type EndToEndPacketNoAuditPersistenceStatement =
  "No audit persistence.";
export type EndToEndPacketNoApprovalPersistenceStatement =
  "No approval persistence.";
export type EndToEndPacketNoDatabaseWriteStatement =
  "No database write.";
export type EndToEndPacketNoFileWriteStatement = "No file write.";
export type EndToEndPacketAuditSummaryPosture = "preview-only";
export type EndToEndPacketRecoveryReadinessState =
  | "blocked"
  | "manual review required"
  | "backend future required";
export type EndToEndPacketRecoveryReadinessOwner =
  | "operator"
  | "backend future"
  | "safety review";

export type EndToEndPacketStageFailureId =
  | "run-intent-stage"
  | "approval-packet-stage"
  | "manual-admission-stage"
  | "backend-admission-contract-stage"
  | "dry-run-runner-contract-stage"
  | "synthetic-runner-skeleton-stage"
  | "synthetic-result-envelope-stage"
  | "result-capture-contract-stage"
  | "result-capture-review-stage"
  | "audit-join-contract-stage"
  | "approval-join-contract-stage"
  | "audit-approval-join-review-stage"
  | "evidence-packet-stage"
  | "final-packet-stage";

export type EndToEndPacketStageFailureLabel =
  | "run intent stage failure"
  | "approval packet stage failure"
  | "manual admission stage failure"
  | "backend admission contract stage failure"
  | "dry-run runner contract stage failure"
  | "synthetic runner skeleton stage failure"
  | "synthetic result envelope stage failure"
  | "result capture contract stage failure"
  | "result capture review stage failure"
  | "audit join contract stage failure"
  | "approval join contract stage failure"
  | "audit approval join review stage failure"
  | "evidence packet stage failure"
  | "final packet stage failure";

export type EndToEndPacketStageFailureState =
  | "held / run intent preview-only"
  | "held / approval packet preview-only"
  | "held / manual admission preview-only"
  | "held / backend admission contract preview-only"
  | "held / dry-run runner contract preview-only"
  | "held / synthetic runner skeleton preview-only"
  | "held / synthetic result envelope preview-only"
  | "held / result capture contract preview-only"
  | "held / result capture review preview-only"
  | "held / audit join contract preview-only"
  | "held / approval join contract preview-only"
  | "held / audit approval join review preview-only"
  | "held / evidence packet preview-only"
  | "held / final packet draft preview-only";

export type EndToEndPacketGateFailureId =
  | "run-intent-gate"
  | "approval-packet-gate"
  | "manual-admission-gate"
  | "backend-admission-contract-gate"
  | "admission-token-gate"
  | "admission-lease-gate"
  | "dry-run-runner-contract-gate"
  | "synthetic-runner-skeleton-gate"
  | "result-envelope-gate"
  | "result-capture-contract-gate"
  | "result-capture-review-gate"
  | "audit-approval-join-contract-gate"
  | "audit-approval-join-review-gate"
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

export type EndToEndPacketGateFailureLabel =
  | "run intent gate failure"
  | "approval packet gate failure"
  | "manual admission gate failure"
  | "backend admission contract gate failure"
  | "admission token gate failure"
  | "admission lease gate failure"
  | "dry-run runner contract gate failure"
  | "synthetic runner skeleton gate failure"
  | "result envelope gate failure"
  | "result capture contract gate failure"
  | "result capture review gate failure"
  | "audit approval join contract gate failure"
  | "audit approval join review gate failure"
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

export type EndToEndPacketGateFailureState =
  | "held / run intent review incomplete"
  | "held / approval packet review incomplete"
  | "held / manual admission review incomplete"
  | "held / backend admission contract preview-only"
  | "held / admission token not issued"
  | "held / admission lease not created"
  | "held / dry-run runner contract preview-only"
  | "held / synthetic runner skeleton preview-only"
  | "held / result envelope preview-only"
  | "held / result capture contract preview-only"
  | "held / result capture review preview-only"
  | "held / audit approval join contract preview-only"
  | "held / audit approval join review preview-only"
  | "held / evidence packet preview-only"
  | "held / operator approval missing"
  | "held / manual confirmation missing"
  | "held / kill switch review required"
  | "held / audit evidence missing"
  | "held / server-only boundary required"
  | "held / opaque credential references only"
  | "held / privacy redaction review incomplete"
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

export type EndToEndPacketRecoveryReadinessChecklistId =
  | "run-intent-reviewed"
  | "approval-packet-reviewed"
  | "manual-admission-reviewed"
  | "backend-admission-contract-reviewed"
  | "dry-run-runner-contract-reviewed"
  | "synthetic-runner-skeleton-reviewed"
  | "result-capture-contract-reviewed"
  | "result-capture-review-reviewed"
  | "audit-approval-join-contract-reviewed"
  | "audit-approval-join-review-reviewed"
  | "evidence-packet-reviewed"
  | "lineage-reviewed"
  | "stage-contract-reviewed"
  | "packet-request-contract-reviewed"
  | "packet-response-contract-reviewed"
  | "packet-error-contract-reviewed"
  | "packet-gates-reviewed"
  | "packet-readiness-matrix-reviewed"
  | "packet-acceptance-posture-reviewed"
  | "privacy-redaction-reviewed"
  | "cost-rate-reviewed"
  | "timeout-cancel-reviewed"
  | "idempotency-replay-reviewed"
  | "single-run-lock-reviewed"
  | "result-persistence-still-blocked"
  | "audit-persistence-still-blocked"
  | "approval-persistence-still-blocked"
  | "database-writes-still-blocked"
  | "file-writes-still-blocked"
  | "queue-dispatch-still-blocked"
  | "worker-dispatch-still-blocked"
  | "job-execution-still-blocked";

export type EndToEndPacketRecoveryReadinessChecklistLabel =
  | "run intent reviewed"
  | "approval packet reviewed"
  | "manual admission reviewed"
  | "backend admission contract reviewed"
  | "dry-run runner contract reviewed"
  | "synthetic runner skeleton reviewed"
  | "result capture contract reviewed"
  | "result capture review reviewed"
  | "audit approval join contract reviewed"
  | "audit approval join review reviewed"
  | "evidence packet reviewed"
  | "lineage reviewed"
  | "stage contract reviewed"
  | "packet request contract reviewed"
  | "packet response contract reviewed"
  | "packet error contract reviewed"
  | "packet gates reviewed"
  | "packet readiness matrix reviewed"
  | "packet acceptance posture reviewed"
  | "privacy/redaction reviewed"
  | "cost/rate reviewed"
  | "timeout/cancel reviewed"
  | "idempotency/replay reviewed"
  | "single-run lock reviewed"
  | "result persistence still blocked"
  | "audit persistence still blocked"
  | "approval persistence still blocked"
  | "database writes still blocked"
  | "file writes still blocked"
  | "queue dispatch still blocked"
  | "worker dispatch still blocked"
  | "job execution still blocked";

export type EndToEndPacketReviewKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-review:${EndToEndPacketReviewId}`;
export type EndToEndPacketDecisionReviewKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-decision-review:${EndToEndPacketReviewId}`;
export type EndToEndPacketStageFailureReviewKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-stage-failure-review:${EndToEndPacketReviewId}:${EndToEndPacketStageFailureId}`;
export type EndToEndPacketGateFailureReviewKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-gate-failure-review:${EndToEndPacketReviewId}:${EndToEndPacketGateFailureId}`;
export type EndToEndPacketRecoveryPlanKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-recovery-plan:${EndToEndPacketReviewId}`;
export type EndToEndPacketRecoveryReadinessChecklistKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-recovery-readiness:${EndToEndPacketReviewId}:${EndToEndPacketRecoveryReadinessChecklistId}`;
export type EndToEndPacketReviewAuditSummaryKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-review-audit-summary:${EndToEndPacketReviewId}`;
export type EndToEndPacketAcceptancePostureKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-acceptance-posture:${EndToEndPacketReviewId}`;

export type BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord =
  Readonly<{
    id: EndToEndPacketReviewId;
    key: EndToEndPacketReviewKey;
    reviewVersion: EndToEndPacketReviewVersion;
    previewOnlyStatement: EndToEndPacketReviewPreviewOnlyStatement;
    source: EndToEndPacketReviewSource;
    reviewMode: EndToEndPacketReviewMode;
    reviewPosture: EndToEndPacketReviewPosture;
    requestLabel: string;
    label: string;
    operatorRequestPhrase: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    sourceEndToEndPacketContractReference: EndToEndPacketContractKey;
    sourceEndToEndStageContractReference: EndToEndPacketStageKey;
    sourceEndToEndLineageReference: EndToEndPacketLineageKey;
    sourceEndToEndPacketRequestReference: EndToEndPacketRequestKey;
    sourceEndToEndPacketResponseReference: EndToEndPacketResponseKey;
    sourceEndToEndPacketErrorReference: EndToEndPacketErrorKey;
    sourceEndToEndPacketGateReference: EndToEndPacketGateKey;
    sourceEndToEndPacketReadinessReference: EndToEndPacketReadinessKey;
    sourceEndToEndPacketAcceptanceReference: EndToEndPacketAcceptanceKey;
    sourceRunIntentReference: ModelProviderRunIntentKey;
    sourceApprovalPacketReference: ModelProviderApprovalPacketKey;
    sourceAdmissionContractReference: BackendAdmissionContractKey;
    sourceDryRunRunnerContractReference: BackendDryRunRunnerContractKey;
    sourceSyntheticRunnerSkeletonReference: SyntheticRunnerSkeletonKey;
    sourceResultCaptureReviewReference: ResultCaptureReviewKey;
    sourceAuditApprovalJoinReviewReference: AuditApprovalJoinReviewKey;
    selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
    providerSlotLabel:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["providerSlotLabel"];
    backupProviderSlotLabel:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["backupProviderSlotLabel"];
    localPrivateAlternativeLabel:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["localPrivateAlternativeLabel"];
    packetState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["packetState"];
    packetRequestState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["packetRequestState"];
    packetInvocationState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["packetInvocationState"];
    packetResponseState: "not received";
    packetErrorState: "not received";
    packetDecisionState: EndToEndPacketDecisionState;
    packetAcceptanceState: "not accepted / preview-only";
    admissionState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["admissionState"];
    admissionTokenState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["admissionTokenState"];
    admissionLeaseState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["admissionLeaseState"];
    dryRunRequestState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["dryRunRequestState"];
    runnerInvocationState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["runnerInvocationState"];
    dryRunExecutionState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["dryRunExecutionState"];
    providerResponseState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["providerResponseState"];
    modelOutputState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["modelOutputState"];
    syntheticFixtureResultState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["syntheticFixtureResultState"];
    resultCaptureState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["resultCaptureState"];
    resultPersistenceState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["resultPersistenceState"];
    auditJoinState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["auditJoinState"];
    approvalJoinState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["approvalJoinState"];
    resultReferenceState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["resultReferenceState"];
    evidencePacketState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["evidencePacketState"];
    auditEnvelopeState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["auditEnvelopeState"];
    approvalEnvelopeState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["approvalEnvelopeState"];
    databaseWriteState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["databaseWriteState"];
    fileWriteState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["fileWriteState"];
    queueDispatchState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["queueDispatchState"];
    workerDispatchState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["workerDispatchState"];
    jobExecutionState:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["jobExecutionState"];
    providerCallPosture:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["providerCallPosture"];
    modelCallPosture:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["modelCallPosture"];
    promptSendingPosture:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["promptSendingPosture"];
    sdkPosture:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["sdkPosture"];
    credentialPosture:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["credentialPosture"];
    secretPosture:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["secretPosture"];
    frontendPosture:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["frontendPosture"];
    backendPosture:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["backendPosture"];
    executionPosture:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["executionPosture"];
    manualOperatorReviewRequired: EndToEndPacketManualOperatorReviewRequirement;
    manualRecoveryReviewRequired: EndToEndPacketManualRecoveryReviewRequirement;
    manualApprovalRequired:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["manualApprovalRequired"];
    manualConfirmationRequired:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["manualConfirmationRequired"];
    killSwitchRequired:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["killSwitchRequired"];
    auditRequired:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["auditRequired"];
    privacyRedactionRequired:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["privacyRedactionRequired"];
    costAcknowledgementRequired:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["costAcknowledgementRequired"];
    rateLimitGuardRequired:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["rateLimitGuardRequired"];
    timeoutCancelGuardRequired:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["timeoutCancelGuardRequired"];
    idempotencyRequired:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["idempotencyRequired"];
    replayBlockRequired:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["replayBlockRequired"];
    singleRunLockRequired:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["singleRunLockRequired"];
    noRetryExecution:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["noRetryExecution"];
    noFallbackExecution:
      BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["noFallbackExecution"];
    nextManualApprovalHandoffContractRequirement:
      typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
    blockedDefaultReason: string;
    nextSafeAction: string;
    currentReadiness: EndToEndPacketReviewCurrentReadiness;
  }>;

export type EndToEndPacketDecisionReviewRecord = Readonly<{
  id: EndToEndPacketReviewId;
  key: EndToEndPacketDecisionReviewKey;
  decisionReviewVersion: EndToEndPacketDecisionReviewVersion;
  previewOnlyStatement: EndToEndPacketDecisionReviewPreviewOnlyStatement;
  endToEndPacketReviewId: EndToEndPacketReviewId;
  sourcePacketContractReference: EndToEndPacketContractKey;
  sourceStageContractReference: EndToEndPacketStageKey;
  sourceLineageReference: EndToEndPacketLineageKey;
  sourceRequestReference: EndToEndPacketRequestKey;
  sourceResponseReference: EndToEndPacketResponseKey;
  sourceErrorReference: EndToEndPacketErrorKey;
  decisionState: EndToEndPacketDecisionState;
  packetReasonSummary: string;
  topBlockingStages: readonly EndToEndPacketStageFailureLabel[];
  topBlockingGates: readonly EndToEndPacketGateFailureLabel[];
  topMissingEvidence: readonly string[];
  operatorReviewNotes: readonly string[];
  manualRecoveryRequirement: string;
  manualApprovalHandoffDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  nextSafeAction: string;
  explicitNoEndToEndPacketExecutionNoPersistenceStatement:
    EndToEndPacketNoExecutionNoPersistenceStatement;
}>;

export type EndToEndPacketStageFailureReviewRecord = Readonly<{
  key: EndToEndPacketStageFailureReviewKey;
  stageFailureReviewVersion: EndToEndPacketStageFailureReviewVersion;
  previewOnlyStatement: EndToEndPacketStageFailureReviewPreviewOnlyStatement;
  endToEndPacketReviewId: EndToEndPacketReviewId;
  failedStageId: EndToEndPacketStageFailureId;
  failedStageLabel: EndToEndPacketStageFailureLabel;
  stageState: EndToEndPacketStageFailureState;
  severity: EndToEndPacketReviewSeverity;
  affectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  affectedWorkspaceTarget: AiModelProviderWorkspaceTarget;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  manualApprovalHandoffDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  nextSafeAction: string;
  explicitNoStagePassNoExecutionStatement:
    EndToEndPacketNoStagePassNoExecutionStatement;
}>;

export type EndToEndPacketGateFailureReviewRecord = Readonly<{
  key: EndToEndPacketGateFailureReviewKey;
  gateFailureReviewVersion: EndToEndPacketGateFailureReviewVersion;
  previewOnlyStatement: EndToEndPacketGateFailureReviewPreviewOnlyStatement;
  endToEndPacketReviewId: EndToEndPacketReviewId;
  failedGateId: EndToEndPacketGateFailureId;
  failedGateLabel: EndToEndPacketGateFailureLabel;
  gateState: EndToEndPacketGateFailureState;
  severity: EndToEndPacketReviewSeverity;
  affectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  affectedWorkspaceTarget: AiModelProviderWorkspaceTarget;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  manualApprovalHandoffDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  nextSafeAction: string;
  explicitNoGatePassStatement: EndToEndPacketNoGatePassStatement;
}>;

export type EndToEndPacketRecoveryPlanPreviewRecord = Readonly<{
  id: EndToEndPacketReviewId;
  key: EndToEndPacketRecoveryPlanKey;
  recoveryPlanVersion: EndToEndPacketRecoveryPlanVersion;
  previewOnlyStatement: EndToEndPacketRecoveryPlanPreviewOnlyStatement;
  endToEndPacketReviewId: EndToEndPacketReviewId;
  recoveryPosture: EndToEndPacketRecoveryPosture;
  runIntentRecovery: string;
  approvalPacketRecovery: string;
  manualAdmissionRecovery: string;
  backendAdmissionRecovery: string;
  admissionTokenRecovery: string;
  admissionLeaseRecovery: string;
  runnerContractRecovery: string;
  syntheticRunnerSkeletonRecovery: string;
  resultCaptureRecovery: string;
  auditJoinRecovery: string;
  approvalJoinRecovery: string;
  evidencePacketRecovery: string;
  stageConsistencyRecovery: string;
  lineageConsistencyRecovery: string;
  requestNotCreatedRecovery: string;
  responseNotReceivedRecovery: string;
  errorNotReceivedRecovery: string;
  acceptanceUnresolvedRecovery: string;
  resultPersistenceMissingRecovery: string;
  auditPersistenceMissingRecovery: string;
  approvalPersistenceMissingRecovery: string;
  databaseWriteBlockedRecovery: string;
  fileWriteBlockedRecovery: string;
  queueDispatchBlockedRecovery: string;
  workerDispatchBlockedRecovery: string;
  jobExecutionBlockedRecovery: string;
  retryPosture: EndToEndPacketRetryPosture;
  fallbackPosture: EndToEndPacketFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  explicitNoRetryNoFallbackNoExecutionNoPersistenceStatement:
    EndToEndPacketNoRetryNoFallbackNoExecutionNoPersistenceStatement;
}>;

export type EndToEndPacketRecoveryReadinessChecklistRecord = Readonly<{
  key: EndToEndPacketRecoveryReadinessChecklistKey;
  checklistVersion: EndToEndPacketRecoveryReadinessChecklistVersion;
  endToEndPacketReviewId: EndToEndPacketReviewId;
  checklistId: EndToEndPacketRecoveryReadinessChecklistId;
  label: EndToEndPacketRecoveryReadinessChecklistLabel;
  state: EndToEndPacketRecoveryReadinessState;
  severity: EndToEndPacketReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: EndToEndPacketRecoveryReadinessOwner;
  currentPosture: EndToEndPacketReviewMode;
  manualApprovalHandoffContractDependency:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  nextSafeAction: string;
}>;

export type EndToEndPacketReviewAuditSummaryRecord = Readonly<{
  id: EndToEndPacketReviewId;
  key: EndToEndPacketReviewAuditSummaryKey;
  auditSummaryVersion: EndToEndPacketReviewAuditSummaryVersion;
  previewOnlyStatement: EndToEndPacketReviewAuditSummaryPreviewOnlyStatement;
  endToEndPacketReviewId: EndToEndPacketReviewId;
  auditPosture: EndToEndPacketAuditSummaryPosture;
  resultReferenceState:
    BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["resultReferenceState"];
  auditReferenceState:
    BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["auditJoinState"];
  approvalReferenceState:
    BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["approvalJoinState"];
  evidencePacketState:
    BackendOwnedSyntheticDryRunEndToEndPacketContractRecord["evidencePacketState"];
  stageEvidenceSummary: string;
  lineageEvidenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noResultPersistenceStatement: EndToEndPacketNoResultPersistenceStatement;
  noAuditPersistenceStatement: EndToEndPacketNoAuditPersistenceStatement;
  noApprovalPersistenceStatement: EndToEndPacketNoApprovalPersistenceStatement;
  noDatabaseWriteStatement: EndToEndPacketNoDatabaseWriteStatement;
  noFileWriteStatement: EndToEndPacketNoFileWriteStatement;
  manualApprovalHandoffContractRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
}>;

export type EndToEndPacketAcceptancePostureRecord = Readonly<{
  id: EndToEndPacketReviewId;
  key: EndToEndPacketAcceptancePostureKey;
  acceptancePostureVersion: EndToEndPacketAcceptancePostureVersion;
  previewOnlyStatement: EndToEndPacketAcceptancePosturePreviewOnlyStatement;
  endToEndPacketReviewId: EndToEndPacketReviewId;
  acceptanceState: "not accepted / preview-only";
  runIntentBlockers: readonly string[];
  admissionBlockers: readonly string[];
  runnerBlockers: readonly string[];
  resultCaptureBlockers: readonly string[];
  auditJoinBlockers: readonly string[];
  approvalJoinBlockers: readonly string[];
  evidencePacketBlockers: readonly string[];
  stageBlockers: readonly string[];
  lineageBlockers: readonly string[];
  safetyBlockers: readonly string[];
  privacyBlockers: readonly string[];
  costRateBlockers: readonly string[];
  persistenceBlockers: readonly string[];
  databaseFileBlockers: readonly string[];
  queueWorkerJobBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitNoEndToEndAcceptanceNoExecutionStatement:
    EndToEndPacketNoAcceptanceNoExecutionStatement;
}>;

export type EndToEndPacketReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  reviewCount: number;
  reviews: readonly BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord[];
}>;

export type EndToEndPacketReviewWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  reviewCount: number;
  reviews: readonly BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord[];
}>;

export type EndToEndPacketReviewSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  reviewCount: number;
  decisionReviewCount: number;
  stageFailureCount: number;
  gateFailureCount: number;
  recoveryPlanCount: number;
  readinessChecklistCount: number;
  auditSummaryCount: number;
  acceptancePostureCount: number;
  currentReadiness: EndToEndPacketReviewCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type EndToEndPacketStageFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  stageFailureCount: number;
  summaryLines: readonly string[];
  topFailedStageLabels: readonly EndToEndPacketStageFailureLabel[];
  nextSafeAction: string;
}>;

export type EndToEndPacketGateFailureSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  gateFailureCount: number;
  summaryLines: readonly string[];
  topFailedGateLabels: readonly EndToEndPacketGateFailureLabel[];
  nextSafeAction: string;
}>;

export type EndToEndPacketRecoverySummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  recoveryPlanCount: number;
  summaryLines: readonly string[];
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH;
  nextSafeAction: string;
}>;
