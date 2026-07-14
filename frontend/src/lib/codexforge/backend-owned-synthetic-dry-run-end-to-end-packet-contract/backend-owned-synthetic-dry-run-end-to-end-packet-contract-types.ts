import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
  AthenaModelRoutingProviderSlotLabel,
} from "../athena-model-routing-provider-selection-preview";
import type {
  BackendAdmissionContractKey,
  BackendOwnedModelProviderRunAdmissionContractRecord,
} from "../backend-owned-model-provider-run-admission-contract";
import type {
  BackendDryRunRunnerContractKey,
  BackendOwnedModelProviderDryRunRunnerContractRecord,
} from "../backend-owned-model-provider-dry-run-runner-contract";
import type {
  BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord,
  SyntheticDryRunInputFixtureKey,
  SyntheticDryRunOutputFixtureKey,
  SyntheticRunnerSkeletonKey,
} from "../backend-owned-model-provider-synthetic-dry-run-runner-skeleton";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
  type AuditApprovalJoinReviewId,
  type AuditApprovalJoinReviewKey,
  type BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord,
} from "../backend-owned-synthetic-dry-run-audit-approval-join-review-recovery-preview";
import type {
  AuditApprovalEvidencePacketKey,
  AuditApprovalJoinContractKey,
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord,
  SyntheticApprovalJoinContractKey,
  SyntheticAuditJoinContractKey,
} from "../backend-owned-synthetic-dry-run-audit-approval-join-contract";
import type {
  BackendOwnedSyntheticDryRunResultCaptureContractRecord,
  ResultCaptureContractKey,
  SyntheticResultEnvelopeKey,
} from "../backend-owned-synthetic-dry-run-result-capture-contract";
import type {
  BackendOwnedSyntheticDryRunResultCaptureReviewRecord,
  ResultCaptureReviewKey,
} from "../backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";
import type {
  ManualRunAdmissionPreviewKey,
  ManualRunAdmissionPreviewRecord,
} from "../manual-gated-model-provider-run-admission-preview";
import type {
  ModelProviderApprovalPacketKey,
  ModelProviderApprovalPacketRecord,
  ModelProviderRunIntentKey,
  ModelProviderRunIntentPreviewRecord,
} from "../model-provider-approval-packet-run-intent-preview";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH =
  "5194-5225 - Backend-Owned Synthetic Dry-Run End-to-End Packet Contract";

export const BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_PHASE =
  5225;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH =
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;

export const NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5226-5257 - Backend-Owned Synthetic Dry-Run End-to-End Packet Review and Recovery Preview";

export type EndToEndPacketContractId = AuditApprovalJoinReviewId;

export type EndToEndPacketContractVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-contract-v1";
export type EndToEndPacketStageContractVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-stage-contract-v1";
export type EndToEndPacketLineageVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-lineage-v1";
export type EndToEndPacketRequestContractVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-request-contract-v1";
export type EndToEndPacketResponseContractVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-response-contract-v1";
export type EndToEndPacketErrorContractVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-error-contract-v1";
export type EndToEndPacketGateVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-gate-v1";
export type EndToEndPacketReadinessVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-readiness-v1";
export type EndToEndPacketAcceptancePostureVersion =
  "backend-owned-synthetic-dry-run-end-to-end-packet-acceptance-posture-v1";

export type EndToEndPacketSource =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["source"];
export type EndToEndPacketOwner =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["owner"];
export type EndToEndPacketFrontendMode = "preview-only";
export type EndToEndPacketContractMode = "contract-only";
export type EndToEndPacketPosture =
  "end-to-end synthetic chain / not executable / not persistent";
export type EndToEndPacketPreviewOnlyStatement =
  "end-to-end packet contract is preview-only";
export type EndToEndPacketState = "draft / preview-only";
export type EndToEndPacketRequestState = "not created";
export type EndToEndPacketInvocationState = "not invoked";
export type EndToEndPacketAdmissionState = "not admitted";
export type EndToEndPacketAdmissionTokenState = "not issued";
export type EndToEndPacketAdmissionLeaseState = "not created";
export type EndToEndPacketDryRunRequestState = "not created";
export type EndToEndPacketRunnerInvocationState = "not invoked";
export type EndToEndPacketDryRunExecutionState = "not executed";
export type EndToEndPacketProviderResponseState =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["providerResponseState"];
export type EndToEndPacketModelOutputState =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["modelOutputState"];
export type EndToEndPacketSyntheticFixtureResultState =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["syntheticFixtureResultState"];
export type EndToEndPacketResultCaptureState = "not captured";
export type EndToEndPacketResultPersistenceState =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["resultPersistenceState"];
export type EndToEndPacketAuditJoinState =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["auditJoinState"];
export type EndToEndPacketApprovalJoinState =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["approvalJoinState"];
export type EndToEndPacketResultReferenceState =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["resultReferenceState"];
export type EndToEndPacketEvidencePacketState = "preview-only";
export type EndToEndPacketAuditEnvelopeState = "not created";
export type EndToEndPacketApprovalEnvelopeState = "not created";
export type EndToEndPacketDatabaseWriteState =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["databaseWriteState"];
export type EndToEndPacketFileWriteState =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["fileWriteState"];
export type EndToEndPacketQueueDispatchState =
  BackendOwnedModelProviderDryRunRunnerContractRecord["queueDispatchState"];
export type EndToEndPacketWorkerDispatchState =
  BackendOwnedModelProviderDryRunRunnerContractRecord["workerDispatchState"];
export type EndToEndPacketJobExecutionState =
  BackendOwnedModelProviderDryRunRunnerContractRecord["jobExecutionState"];
export type EndToEndPacketPromptSendingPosture =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["promptSendingPosture"];
export type EndToEndPacketModelCallPosture =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["modelCallPosture"];
export type EndToEndPacketProviderCallPosture =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["providerCallPosture"];
export type EndToEndPacketSdkPosture =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["sdkPosture"];
export type EndToEndPacketCredentialPosture =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["credentialPosture"];
export type EndToEndPacketSecretPosture =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["secretPosture"];
export type EndToEndPacketFrontendPosture =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["frontendPosture"];
export type EndToEndPacketBackendPosture =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["backendPosture"];
export type EndToEndPacketExecutionPosture =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["executionPosture"];
export type EndToEndPacketManualApprovalRequirement =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["manualApprovalRequired"];
export type EndToEndPacketManualConfirmationRequirement =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["manualConfirmationRequired"];
export type EndToEndPacketKillSwitchRequirement =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["killSwitchRequired"];
export type EndToEndPacketAuditRequirement =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["auditRequired"];
export type EndToEndPacketPrivacyRedactionRequirement =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["privacyRedactionRequired"];
export type EndToEndPacketCostAcknowledgementRequirement =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["costAcknowledgementRequired"];
export type EndToEndPacketRateLimitGuardRequirement =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["rateLimitGuardRequired"];
export type EndToEndPacketTimeoutCancelGuardRequirement =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["timeoutCancelGuardRequired"];
export type EndToEndPacketIdempotencyRequirement =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["idempotencyRequired"];
export type EndToEndPacketReplayBlockRequirement =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["replayBlockRequired"];
export type EndToEndPacketSingleRunLockRequirement =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["singleRunLockRequired"];
export type EndToEndPacketRetryExecutionPosture =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["noRetryExecution"];
export type EndToEndPacketFallbackExecutionPosture =
  BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["noFallbackExecution"];

export type EndToEndPacketStageOwner =
  | "Athena"
  | "backend contract"
  | "backend runner"
  | "synthetic fixture"
  | "result capture"
  | "audit / approval join"
  | "operator";
export type EndToEndPacketStageState =
  | "preview-only / linked"
  | "preview-only / blocked"
  | "draft / preview-only";
export type EndToEndPacketStageNoExecutionStatement =
  "No stage execution. Preview-only.";
export type EndToEndPacketStageId =
  | "run-intent-stage"
  | "approval-packet-stage"
  | "manual-admission-preview-stage"
  | "backend-admission-contract-stage"
  | "dry-run-runner-contract-stage"
  | "synthetic-runner-skeleton-stage"
  | "synthetic-input-fixture-stage"
  | "synthetic-output-fixture-stage"
  | "synthetic-result-envelope-stage"
  | "result-capture-contract-stage"
  | "result-capture-review-stage"
  | "audit-join-contract-stage"
  | "approval-join-contract-stage"
  | "evidence-packet-stage"
  | "final-end-to-end-packet-stage";
export type EndToEndPacketStageLabel =
  | "run intent stage"
  | "approval packet stage"
  | "manual admission preview stage"
  | "backend admission contract stage"
  | "dry-run runner contract stage"
  | "synthetic runner skeleton stage"
  | "synthetic input fixture stage"
  | "synthetic output fixture stage"
  | "synthetic result envelope stage"
  | "result capture contract stage"
  | "result capture review stage"
  | "audit join contract stage"
  | "approval join contract stage"
  | "evidence packet stage"
  | "final end-to-end packet stage";

export type EndToEndPacketStageSourceReference =
  | ModelProviderRunIntentKey
  | ModelProviderApprovalPacketKey
  | ManualRunAdmissionPreviewKey
  | BackendAdmissionContractKey
  | BackendDryRunRunnerContractKey
  | SyntheticRunnerSkeletonKey
  | SyntheticDryRunInputFixtureKey
  | SyntheticDryRunOutputFixtureKey
  | SyntheticResultEnvelopeKey
  | ResultCaptureContractKey
  | ResultCaptureReviewKey
  | SyntheticAuditJoinContractKey
  | SyntheticApprovalJoinContractKey
  | AuditApprovalEvidencePacketKey
  | AuditApprovalJoinContractKey
  | AuditApprovalJoinReviewKey
  | EndToEndPacketContractKey;

export type EndToEndPacketLineageMode = "preview-only";
export type EndToEndPacketLineageConsistencyState = "preview-only";
export type EndToEndPacketLineagePersistenceState = "not implemented";
export type EndToEndPacketNoLineagePersistenceStatement =
  "No lineage persistence.";

export type EndToEndPacketRequestPayloadPosture =
  "static preview packet only";
export type EndToEndPacketPromptPayloadPosture =
  "redacted placeholder only";
export type EndToEndPacketResultPayloadPosture =
  "static placeholder only";
export type EndToEndPacketAuditPayloadPosture = "preview-only";
export type EndToEndPacketApprovalPayloadPosture = "preview-only";
export type EndToEndPacketEvidencePacketPosture = "preview-only";
export type EndToEndPacketPersistenceTargetPosture = "not implemented";
export type EndToEndPacketDatabaseWritePosture = "not implemented";
export type EndToEndPacketFileWritePosture = "not implemented";
export type EndToEndPacketNoRequestCreatedStatement =
  "No packet request created.";

export type EndToEndPacketResponseState = "not received";
export type EndToEndPacketDecisionState = "not evaluated";
export type EndToEndPacketAcceptanceState = "not accepted / preview-only";
export type EndToEndPacketNoResponseNoPersistenceStatement =
  "No packet response. No persistence.";

export type EndToEndPacketErrorState = "not received";
export type EndToEndPacketRetryPosture = "disabled";
export type EndToEndPacketFallbackPosture = "disabled";
export type EndToEndPacketRecoveryPosture = "manual review only";
export type EndToEndPacketNoErrorNoRetryNoFallbackStatement =
  "No packet error. No retry. No fallback.";

export type EndToEndPacketGateOwner =
  | "backend packet contract"
  | "operator"
  | "safety review"
  | "backend future";
export type EndToEndPacketGateCurrentState = "preview-only / blocked";
export type EndToEndPacketGateId =
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
  | "no-frontend-provider-call-gate"
  | "no-provider-sdk-import-gate"
  | "no-prompt-sending-gate"
  | "opaque-credential-gate"
  | "no-plaintext-secrets-gate"
  | "privacy-redaction-gate"
  | "cost-rate-timeout-gate"
  | "idempotency-replay-gate"
  | "single-run-lock-gate"
  | "no-queue-dispatch-gate"
  | "no-worker-dispatch-gate"
  | "no-job-execution-gate"
  | "no-result-persistence-gate"
  | "no-audit-persistence-gate"
  | "no-approval-persistence-gate"
  | "no-database-write-gate"
  | "no-file-write-gate";
export type EndToEndPacketGateLabel =
  | "run intent gate"
  | "approval packet gate"
  | "manual admission gate"
  | "backend admission contract gate"
  | "admission token gate"
  | "admission lease gate"
  | "dry-run runner contract gate"
  | "synthetic runner skeleton gate"
  | "result envelope gate"
  | "result capture contract gate"
  | "result capture review gate"
  | "audit approval join contract gate"
  | "audit approval join review gate"
  | "evidence packet gate"
  | "operator approval gate"
  | "manual confirmation gate"
  | "kill switch gate"
  | "audit gate"
  | "server-only boundary gate"
  | "no frontend provider call gate"
  | "no provider SDK import gate"
  | "no prompt sending gate"
  | "opaque credential gate"
  | "no plaintext secrets gate"
  | "privacy/redaction gate"
  | "cost/rate/timeout gate"
  | "idempotency/replay gate"
  | "single-run lock gate"
  | "no queue dispatch gate"
  | "no worker dispatch gate"
  | "no job execution gate"
  | "no result persistence gate"
  | "no audit persistence gate"
  | "no approval persistence gate"
  | "no database write gate"
  | "no file write gate";

export type EndToEndPacketStageContractState = "preview-only / blocked";
export type EndToEndPacketLineageContractState = "preview-only";
export type EndToEndPacketRequestContractState = "preview-only";
export type EndToEndPacketResponseContractState = "preview-only";
export type EndToEndPacketErrorContractState = "preview-only";
export type EndToEndPacketGateSchemaState = "preview-only / blocked";
export type EndToEndPacketDependencyState = "linked / preview-only";
export type EndToEndPacketSafetyBoundaryState =
  "blocked / manual review required";
export type EndToEndPacketPrivacyBoundaryState =
  "blocked / manual review required";
export type EndToEndPacketCredentialBoundaryState =
  "opaque credential references only";
export type EndToEndPacketQueueBoundaryState = "blocked / not dispatched";
export type EndToEndPacketWorkerBoundaryState = "blocked / not dispatched";
export type EndToEndPacketJobBoundaryState = "blocked / not executed";
export type EndToEndPacketResultPersistenceBoundaryState = "not implemented";
export type EndToEndPacketAuditPersistenceBoundaryState = "not implemented";
export type EndToEndPacketApprovalPersistenceBoundaryState =
  "not implemented";
export type EndToEndPacketDatabaseBoundaryState = "not implemented";
export type EndToEndPacketFileBoundaryState = "not implemented";
export type EndToEndPacketCurrentReadiness =
  "end-to-end-packet-contract-only / not executable / not persistent";

export type EndToEndPacketNoAcceptanceNoExecutionStatement =
  "No end-to-end acceptance. No execution.";

export type EndToEndPacketContractKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-contract:${EndToEndPacketContractId}`;
export type EndToEndPacketStageKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-stage:${EndToEndPacketContractId}:${EndToEndPacketStageId}`;
export type EndToEndPacketLineageKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-lineage:${EndToEndPacketContractId}`;
export type EndToEndPacketRequestKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-request:${EndToEndPacketContractId}`;
export type EndToEndPacketResponseKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-response:${EndToEndPacketContractId}`;
export type EndToEndPacketErrorKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-error:${EndToEndPacketContractId}`;
export type EndToEndPacketGateKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-gate:${EndToEndPacketGateId}`;
export type EndToEndPacketReadinessKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-readiness:${EndToEndPacketContractId}`;
export type EndToEndPacketAcceptanceKey =
  `backend-owned-synthetic-dry-run-end-to-end-packet-acceptance:${EndToEndPacketContractId}`;

export type BackendOwnedSyntheticDryRunEndToEndPacketContractRecord =
  Readonly<{
    id: EndToEndPacketContractId;
    key: EndToEndPacketContractKey;
    packetContractVersion: EndToEndPacketContractVersion;
    previewOnlyStatement: EndToEndPacketPreviewOnlyStatement;
    requestLabel: string;
    label: string;
    workspaceTarget: AiModelProviderWorkspaceTarget;
    source: EndToEndPacketSource;
    owner: EndToEndPacketOwner;
    frontendMode: EndToEndPacketFrontendMode;
    contractMode: EndToEndPacketContractMode;
    packetPosture: EndToEndPacketPosture;
    sourceRunIntentReference: ModelProviderRunIntentKey;
    sourceApprovalPacketReference: ModelProviderApprovalPacketKey;
    sourceManualAdmissionPreviewReference: ManualRunAdmissionPreviewKey;
    sourceBackendAdmissionContractReference: BackendAdmissionContractKey;
    sourceDryRunRunnerContractReference: BackendDryRunRunnerContractKey;
    sourceSyntheticRunnerSkeletonReference: SyntheticRunnerSkeletonKey;
    sourceSyntheticResultCaptureContractReference: ResultCaptureContractKey;
    sourceResultCaptureReviewReference: ResultCaptureReviewKey;
    sourceAuditApprovalJoinContractReference: AuditApprovalJoinContractKey;
    sourceAuditApprovalJoinReviewReference: AuditApprovalJoinReviewKey;
    selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
    providerSlotLabel: AthenaModelRoutingProviderSlotLabel;
    backupProviderSlotLabel: AthenaModelRoutingProviderSlotLabel;
    localPrivateAlternativeLabel: AthenaModelRoutingProviderSlotLabel;
    packetState: EndToEndPacketState;
    packetRequestState: EndToEndPacketRequestState;
    packetInvocationState: EndToEndPacketInvocationState;
    admissionState: EndToEndPacketAdmissionState;
    admissionTokenState: EndToEndPacketAdmissionTokenState;
    admissionLeaseState: EndToEndPacketAdmissionLeaseState;
    dryRunRequestState: EndToEndPacketDryRunRequestState;
    runnerInvocationState: EndToEndPacketRunnerInvocationState;
    dryRunExecutionState: EndToEndPacketDryRunExecutionState;
    providerResponseState: EndToEndPacketProviderResponseState;
    modelOutputState: EndToEndPacketModelOutputState;
    syntheticFixtureResultState: EndToEndPacketSyntheticFixtureResultState;
    resultCaptureState: EndToEndPacketResultCaptureState;
    resultPersistenceState: EndToEndPacketResultPersistenceState;
    auditJoinState: EndToEndPacketAuditJoinState;
    approvalJoinState: EndToEndPacketApprovalJoinState;
    resultReferenceState: EndToEndPacketResultReferenceState;
    evidencePacketState: EndToEndPacketEvidencePacketState;
    auditEnvelopeState: EndToEndPacketAuditEnvelopeState;
    approvalEnvelopeState: EndToEndPacketApprovalEnvelopeState;
    databaseWriteState: EndToEndPacketDatabaseWriteState;
    fileWriteState: EndToEndPacketFileWriteState;
    queueDispatchState: EndToEndPacketQueueDispatchState;
    workerDispatchState: EndToEndPacketWorkerDispatchState;
    jobExecutionState: EndToEndPacketJobExecutionState;
    promptSendingPosture: EndToEndPacketPromptSendingPosture;
    modelCallPosture: EndToEndPacketModelCallPosture;
    providerCallPosture: EndToEndPacketProviderCallPosture;
    sdkPosture: EndToEndPacketSdkPosture;
    credentialPosture: EndToEndPacketCredentialPosture;
    secretPosture: EndToEndPacketSecretPosture;
    frontendPosture: EndToEndPacketFrontendPosture;
    backendPosture: EndToEndPacketBackendPosture;
    executionPosture: EndToEndPacketExecutionPosture;
    manualApprovalRequired: EndToEndPacketManualApprovalRequirement;
    manualConfirmationRequired: EndToEndPacketManualConfirmationRequirement;
    killSwitchRequired: EndToEndPacketKillSwitchRequirement;
    auditRequired: EndToEndPacketAuditRequirement;
    privacyRedactionRequired: EndToEndPacketPrivacyRedactionRequirement;
    costAcknowledgementRequired: EndToEndPacketCostAcknowledgementRequirement;
    rateLimitGuardRequired: EndToEndPacketRateLimitGuardRequirement;
    timeoutCancelGuardRequired: EndToEndPacketTimeoutCancelGuardRequirement;
    idempotencyRequired: EndToEndPacketIdempotencyRequirement;
    replayBlockRequired: EndToEndPacketReplayBlockRequirement;
    singleRunLockRequired: EndToEndPacketSingleRunLockRequirement;
    noRetryExecution: EndToEndPacketRetryExecutionPosture;
    noFallbackExecution: EndToEndPacketFallbackExecutionPosture;
    nextEndToEndPacketReviewRecoveryRequirement:
      typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
    blockedDefaultReason: string;
    nextSafeAction: string;
  }>;

export type EndToEndPacketStageContractRecord = Readonly<{
  key: EndToEndPacketStageKey;
  stageContractVersion: EndToEndPacketStageContractVersion;
  packetContractId: EndToEndPacketContractId;
  stageId: EndToEndPacketStageId;
  stageLabel: EndToEndPacketStageLabel;
  stageOwner: EndToEndPacketStageOwner;
  sourceReference: EndToEndPacketStageSourceReference;
  stageState: EndToEndPacketStageState;
  requiredEvidence: string;
  currentBlockedReason: string;
  nextSafeAction: string;
  explicitNoStageExecutionStatement: EndToEndPacketStageNoExecutionStatement;
}>;

export type EndToEndPacketLineageRecord = Readonly<{
  id: EndToEndPacketContractId;
  key: EndToEndPacketLineageKey;
  lineageVersion: EndToEndPacketLineageVersion;
  packetContractId: EndToEndPacketContractId;
  lineageMode: EndToEndPacketLineageMode;
  runIntentReference: ModelProviderRunIntentKey;
  admissionReference: BackendAdmissionContractKey;
  runnerReference: BackendDryRunRunnerContractKey;
  resultReference: ResultCaptureContractKey;
  auditReference: SyntheticAuditJoinContractKey;
  approvalReference: SyntheticApprovalJoinContractKey;
  evidencePacketReference: AuditApprovalEvidencePacketKey;
  lineageConsistencyState: EndToEndPacketLineageConsistencyState;
  lineagePersistenceState: EndToEndPacketLineagePersistenceState;
  resultReferenceState: EndToEndPacketResultReferenceState;
  auditReferenceState: EndToEndPacketAuditJoinState;
  approvalReferenceState: EndToEndPacketApprovalJoinState;
  databaseWriteState: EndToEndPacketDatabaseWriteState;
  fileWriteState: EndToEndPacketFileWriteState;
  explicitNoLineagePersistenceStatement:
    EndToEndPacketNoLineagePersistenceStatement;
}>;

export type EndToEndPacketRequestContractRecord = Readonly<{
  id: EndToEndPacketContractId;
  key: EndToEndPacketRequestKey;
  packetRequestContractVersion: EndToEndPacketRequestContractVersion;
  packetContractId: EndToEndPacketContractId;
  packetRequestState: EndToEndPacketRequestState;
  packetInvocationState: EndToEndPacketInvocationState;
  payloadPosture: EndToEndPacketRequestPayloadPosture;
  promptPayloadPosture: EndToEndPacketPromptPayloadPosture;
  resultPayloadPosture: EndToEndPacketResultPayloadPosture;
  auditPayloadPosture: EndToEndPacketAuditPayloadPosture;
  approvalPayloadPosture: EndToEndPacketApprovalPayloadPosture;
  evidencePacketPosture: EndToEndPacketEvidencePacketPosture;
  persistenceTargetPosture: EndToEndPacketPersistenceTargetPosture;
  databaseWritePosture: EndToEndPacketDatabaseWritePosture;
  fileWritePosture: EndToEndPacketFileWritePosture;
  explicitNoPacketRequestCreatedStatement:
    EndToEndPacketNoRequestCreatedStatement;
}>;

export type EndToEndPacketResponseContractRecord = Readonly<{
  id: EndToEndPacketContractId;
  key: EndToEndPacketResponseKey;
  packetResponseContractVersion: EndToEndPacketResponseContractVersion;
  packetContractId: EndToEndPacketContractId;
  sourcePacketRequestReference: EndToEndPacketRequestKey;
  responseState: EndToEndPacketResponseState;
  packetDecisionState: EndToEndPacketDecisionState;
  packetAcceptanceState: EndToEndPacketAcceptanceState;
  packetPersistenceState: EndToEndPacketResultPersistenceState;
  resultPersistenceState: EndToEndPacketResultPersistenceState;
  auditPersistenceState: EndToEndPacketResultPersistenceState;
  approvalPersistenceState: EndToEndPacketResultPersistenceState;
  databaseWriteState: EndToEndPacketDatabaseWriteState;
  fileWriteState: EndToEndPacketFileWriteState;
  explicitNoPacketResponseNoPersistenceStatement:
    EndToEndPacketNoResponseNoPersistenceStatement;
}>;

export type EndToEndPacketErrorContractRecord = Readonly<{
  id: EndToEndPacketContractId;
  key: EndToEndPacketErrorKey;
  packetErrorContractVersion: EndToEndPacketErrorContractVersion;
  packetContractId: EndToEndPacketContractId;
  sourcePacketRequestReference: EndToEndPacketRequestKey;
  errorState: EndToEndPacketErrorState;
  missingRunIntentExample: string;
  missingAdmissionEvidenceExample: string;
  missingRunnerEvidenceExample: string;
  missingResultEvidenceExample: string;
  missingAuditEvidenceExample: string;
  missingApprovalEvidenceExample: string;
  persistenceDeniedExample: string;
  databaseWriteBlockedExample: string;
  fileWriteBlockedExample: string;
  privacyRedactionDeniedExample: string;
  retryPosture: EndToEndPacketRetryPosture;
  fallbackPosture: EndToEndPacketFallbackPosture;
  recoveryPosture: EndToEndPacketRecoveryPosture;
  explicitNoPacketErrorNoRetryNoFallbackStatement:
    EndToEndPacketNoErrorNoRetryNoFallbackStatement;
}>;

export type EndToEndPacketGateRecord = Readonly<{
  id: EndToEndPacketGateId;
  key: EndToEndPacketGateKey;
  label: EndToEndPacketGateLabel;
  gateVersion: EndToEndPacketGateVersion;
  owner: EndToEndPacketGateOwner;
  requiredState: string;
  currentState: EndToEndPacketGateCurrentState;
  evidenceRequirement: string;
  blockedDefaultReason: string;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type EndToEndPacketReadinessMatrixRecord = Readonly<{
  id: EndToEndPacketContractId;
  key: EndToEndPacketReadinessKey;
  readinessVersion: EndToEndPacketReadinessVersion;
  requestLabel: string;
  label: string;
  workspaceTarget: AiModelProviderWorkspaceTarget;
  selectedCapabilityFamily: AthenaModelRoutingCapabilityFamilyRecord;
  packetContractState: EndToEndPacketState;
  stageContractState: EndToEndPacketStageContractState;
  lineageContractState: EndToEndPacketLineageContractState;
  requestContractState: EndToEndPacketRequestContractState;
  responseContractState: EndToEndPacketResponseContractState;
  errorContractState: EndToEndPacketErrorContractState;
  gateSchemaState: EndToEndPacketGateSchemaState;
  runIntentDependency: EndToEndPacketDependencyState;
  admissionDependency: EndToEndPacketDependencyState;
  runnerDependency: EndToEndPacketDependencyState;
  resultCaptureDependency: EndToEndPacketDependencyState;
  auditJoinDependency: EndToEndPacketDependencyState;
  approvalJoinDependency: EndToEndPacketDependencyState;
  evidencePacketDependency: EndToEndPacketDependencyState;
  safetyBoundaryState: EndToEndPacketSafetyBoundaryState;
  privacyBoundaryState: EndToEndPacketPrivacyBoundaryState;
  credentialBoundaryState: EndToEndPacketCredentialBoundaryState;
  queueBoundaryState: EndToEndPacketQueueBoundaryState;
  workerBoundaryState: EndToEndPacketWorkerBoundaryState;
  jobBoundaryState: EndToEndPacketJobBoundaryState;
  resultPersistenceBoundaryState: EndToEndPacketResultPersistenceBoundaryState;
  auditPersistenceBoundaryState: EndToEndPacketAuditPersistenceBoundaryState;
  approvalPersistenceBoundaryState:
    EndToEndPacketApprovalPersistenceBoundaryState;
  databaseBoundaryState: EndToEndPacketDatabaseBoundaryState;
  fileBoundaryState: EndToEndPacketFileBoundaryState;
  currentReadiness: EndToEndPacketCurrentReadiness;
  nextSafeAction: string;
}>;

export type EndToEndPacketAcceptancePostureRecord = Readonly<{
  id: EndToEndPacketContractId;
  key: EndToEndPacketAcceptanceKey;
  acceptancePostureVersion: EndToEndPacketAcceptancePostureVersion;
  packetContractId: EndToEndPacketContractId;
  acceptanceState: EndToEndPacketAcceptanceState;
  runIntentBlockers: readonly string[];
  admissionBlockers: readonly string[];
  runnerBlockers: readonly string[];
  resultCaptureBlockers: readonly string[];
  auditJoinBlockers: readonly string[];
  approvalJoinBlockers: readonly string[];
  evidencePacketBlockers: readonly string[];
  safetyBlockers: readonly string[];
  privacyBlockers: readonly string[];
  costRateBlockers: readonly string[];
  persistenceBlockers: readonly string[];
  queueWorkerJobBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitNoEndToEndAcceptanceNoExecutionStatement:
    EndToEndPacketNoAcceptanceNoExecutionStatement;
}>;

export type EndToEndPacketContractCapabilityFamilyGroup = Readonly<{
  capabilityFamilyId: AiModelProviderCapabilityId;
  capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
  packetCount: number;
  packets: readonly BackendOwnedSyntheticDryRunEndToEndPacketContractRecord[];
}>;

export type EndToEndPacketContractWorkspaceGroup = Readonly<{
  workspaceTarget: AiModelProviderWorkspaceTarget;
  packetCount: number;
  packets: readonly BackendOwnedSyntheticDryRunEndToEndPacketContractRecord[];
}>;

export type EndToEndPacketContractSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  packetContractCount: number;
  stageContractCount: number;
  lineageRecordCount: number;
  requestContractCount: number;
  responseContractCount: number;
  errorContractCount: number;
  gateRecordCount: number;
  readinessRecordCount: number;
  acceptanceRecordCount: number;
  capabilityFamilyGroupCount: number;
  workspaceTargetGroupCount: number;
  packetState: EndToEndPacketState;
  currentReadiness: EndToEndPacketCurrentReadiness;
  acceptanceState: EndToEndPacketAcceptanceState;
  summaryLines: readonly string[];
}>;

export type EndToEndPacketGateSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  gateCount: number;
  backendPacketContractGateCount: number;
  operatorGateCount: number;
  safetyReviewGateCount: number;
  backendFutureGateCount: number;
  summaryLines: readonly string[];
}>;

export type EndToEndPacketReadinessSummary = Readonly<{
  currentBatch:
    typeof BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  readinessRecordCount: number;
  currentReadiness: EndToEndPacketCurrentReadiness;
  nextSafeAction: string;
  summaryLines: readonly string[];
}>;

export type EndToEndPacketContractSeed = Readonly<{
  requestId: EndToEndPacketContractId;
  requestLabel: string;
  label: string;
  blockedDefaultReason: string;
  nextSafeAction: string;
}>;

export type EndToEndPacketStageSeed = Readonly<{
  stageId: EndToEndPacketStageId;
  stageLabel: EndToEndPacketStageLabel;
  stageOwner: EndToEndPacketStageOwner;
  stageState: EndToEndPacketStageState;
  requiredEvidence: string;
  currentBlockedReason: string;
  nextSafeAction: string;
}>;

export type EndToEndPacketGateSeed = Readonly<{
  id: EndToEndPacketGateId;
  label: EndToEndPacketGateLabel;
  owner: EndToEndPacketGateOwner;
  requiredState: string;
  evidenceRequirement: string;
  blockedDefaultReason: string;
}>;
