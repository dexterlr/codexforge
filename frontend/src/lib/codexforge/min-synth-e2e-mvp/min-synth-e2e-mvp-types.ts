import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  MinimalManualGatedSyntheticDryRunExecutionMvpId,
  SyntheticMvpExecutionResultKey,
  SyntheticMvpExecutionResultRecord,
  SyntheticMvpManualApprovalFixtureKey,
  SyntheticMvpManualApprovalFixtureRecord,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
} from "../minimal-synth-exec-review";
import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord,
} from "../min-synth-capture-review";
import type {
  MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord,
  SyntheticResultCaptureEvidencePacketKey,
  SyntheticResultCaptureEvidencePacketRecord,
  SyntheticResultCaptureOutputKey,
  SyntheticResultCaptureOutputRecord,
} from "../min-synth-result-capture";
import type {
  BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord,
} from "../min-synth-audit-join-review";
import type {
  MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpKey,
  MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecord,
  SyntheticApprovalJoinOutputKey,
  SyntheticApprovalJoinOutputRecord,
  SyntheticAuditApprovalJoinEnvelopeKey,
  SyntheticAuditApprovalJoinEnvelopeRecord,
  SyntheticAuditJoinOutputKey,
  SyntheticAuditJoinOutputRecord,
} from "../min-synth-audit-join";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH =
  "5578-5609 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_PHASE =
  5609;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5546-5577 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5610-5641 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview";

export const SYNTHETIC_END_TO_END_PACKET_SECTION_TITLES = [
  "Backend-owned minimal manual-gated synthetic dry-run end-to-end packet MVP",
  "Synthetic end-to-end packet input",
  "Synthetic end-to-end packet output",
  "Synthetic end-to-end packet envelope",
  "Synthetic end-to-end packet stage summary",
  "Synthetic end-to-end packet gates",
  "Synthetic end-to-end packet readiness matrix",
  "Synthetic end-to-end packet evidence preview",
] as const;

export type MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId =
  MinimalManualGatedSyntheticDryRunExecutionMvpId;

export type MinimalManualGatedSyntheticDryRunEndToEndPacketMvpVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-mvp-v1";
export type SyntheticEndToEndPacketInputVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-input-v1";
export type SyntheticEndToEndPacketAdmissionCheckVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-admission-check-v1";
export type SyntheticEndToEndExecutionReferenceVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-execution-reference-v1";
export type SyntheticEndToEndResultCaptureReferenceVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-result-capture-reference-v1";
export type SyntheticEndToEndAuditJoinReferenceVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-audit-join-reference-v1";
export type SyntheticEndToEndApprovalJoinReferenceVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-approval-join-reference-v1";
export type SyntheticEndToEndPacketOutputVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-output-v1";
export type SyntheticEndToEndPacketEnvelopeVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-envelope-v1";
export type SyntheticEndToEndPacketStageSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-stage-summary-v1";
export type SyntheticEndToEndPacketEvidencePreviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-evidence-preview-v1";
export type SyntheticEndToEndPacketAuditPreviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-audit-preview-v1";
export type SyntheticEndToEndPacketApprovalPreviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-approval-preview-v1";
export type SyntheticEndToEndPacketSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-safety-gate-summary-v1";
export type SyntheticEndToEndPacketBlockedLivePersistenceSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-blocked-live-persistence-summary-v1";
export type SyntheticEndToEndPacketRequestVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-request-v1";
export type SyntheticEndToEndPacketResponseVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-response-v1";
export type SyntheticEndToEndPacketErrorVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-error-v1";
export type SyntheticEndToEndPacketGateVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-gate-v1";
export type SyntheticEndToEndPacketReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-readiness-matrix-v1";
export type SyntheticEndToEndPacketSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-summary-v1";
export type SyntheticEndToEndPacketGateSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-gate-summary-v1";
export type SyntheticEndToEndPacketReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-readiness-summary-v1";

export type SyntheticEndToEndPacketBackendOwnedPosture = "backend-owned";
export type SyntheticEndToEndPacketServerOnlyPosture = "server-only";
export type SyntheticEndToEndPacketSyntheticOnlyPosture = "synthetic-only";
export type SyntheticEndToEndPacketManualGatedPosture = "manual-gated";
export type SyntheticEndToEndPacketInMemoryOnlyPosture = "in-memory-only";
export type SyntheticEndToEndPacketNoProviderExecution =
  "no provider execution";
export type SyntheticEndToEndPacketNoModelCalls = "no model calls";
export type SyntheticEndToEndPacketNoPromptSending = "no prompt sending";
export type SyntheticEndToEndPacketNoFrontendRequest =
  "no frontend request";
export type SyntheticEndToEndPacketNoApiRoute = "no API route";
export type SyntheticEndToEndPacketNoQueueWorkerJobDispatch =
  "no queue/worker/job dispatch";
export type SyntheticEndToEndPacketNoPersistence = "no persistence";
export type SyntheticEndToEndPacketNoDatabaseWrites =
  "no database writes";
export type SyntheticEndToEndPacketNoFileWrites = "no file writes";
export type SyntheticEndToEndPacketNoResultPersistence =
  "no result persistence";
export type SyntheticEndToEndPacketNoAuditPersistence =
  "no audit persistence";
export type SyntheticEndToEndPacketNoApprovalPersistence =
  "no approval persistence";
export type SyntheticEndToEndPacketNoApprovalRecording =
  "no approval recording";
export type SyntheticEndToEndPacketNoApprovalTokenIssuance =
  "no approval token issuance";
export type SyntheticEndToEndPacketNoApprovalLeaseIssuance =
  "no approval lease issuance";
export type SyntheticEndToEndPacketCurrentReadiness =
  "minimal-synthetic-end-to-end-packet-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent";
export type SyntheticEndToEndPacketState =
  "assembled-synthetic-in-memory-only";
export type SyntheticEndToEndExecutionState =
  "deterministic synthetic execution in memory only";
export type SyntheticEndToEndResultCaptureState =
  "deterministic synthetic capture in memory only";
export type SyntheticEndToEndAuditJoinState =
  "deterministic synthetic audit join in memory only";
export type SyntheticEndToEndApprovalJoinState =
  "deterministic synthetic approval join in memory only";
export type SyntheticEndToEndPacketPersistenceState = "not implemented";
export type SyntheticEndToEndPacketProviderResponseState = "not received";
export type SyntheticEndToEndPacketModelOutputState = "not generated";
export type SyntheticEndToEndPacketPromptState = "not sent";
export type SyntheticEndToEndPacketFrontendRequestState = "not created";
export type SyntheticEndToEndPacketApiRouteState = "not created";
export type SyntheticEndToEndPacketPersistenceTargetState = "none";
export type SyntheticEndToEndPacketDatabaseWriteTargetState = "none";
export type SyntheticEndToEndPacketFileWriteTargetState = "none";
export type SyntheticEndToEndPacketDispatchState = "blocked";
export type SyntheticEndToEndPacketProviderSdkImportState =
  "not imported";
export type SyntheticEndToEndPacketApprovalFixtureState = "preview-only";
export type SyntheticEndToEndPacketManualConfirmationFixtureState =
  "preview-only";
export type SyntheticEndToEndPacketApprovalRecordingState =
  "not recorded";
export type SyntheticEndToEndPacketApprovalTokenState = "not issued";
export type SyntheticEndToEndPacketApprovalLeaseState = "not created";
export type SyntheticEndToEndPacketTimestampPosture =
  "static fixture label only / no real timestamp";
export type SyntheticEndToEndPacketRetryPosture = "disabled";
export type SyntheticEndToEndPacketFallbackPosture = "disabled";
export type SyntheticEndToEndPacketDeterministicStatement =
  "deterministic synthetic end-to-end packet only";
export type SyntheticEndToEndPacketInMemoryOnlyStatement =
  "synthetic end-to-end packet is produced in memory only";
export type SyntheticEndToEndPacketServerOnlyHelperStatement =
  "server-only synthetic end-to-end packet helper exists";
export type SyntheticEndToEndPacketNoFrontendRequestStatement =
  "no frontend request is created";
export type SyntheticEndToEndPacketNoApiRouteStatement =
  "no API route is created";
export type SyntheticEndToEndPacketNoRealApprovalRequestStatement =
  "no real approval request";
export type SyntheticEndToEndPacketNoRealApprovalRecordingStatement =
  "no real approval recording";
export type SyntheticEndToEndPacketApprovalFixtureStatement =
  "approval fixture is preview-only";
export type SyntheticEndToEndPacketManualConfirmationStatement =
  "manual confirmation fixture is preview-only";
export type SyntheticEndToEndPacketApprovalTokenStatement =
  "approval token is not issued";
export type SyntheticEndToEndPacketApprovalLeaseStatement =
  "approval lease is not created";
export type SyntheticEndToEndPacketRequestState =
  "deterministic synthetic packet request only";
export type SyntheticEndToEndPacketResponseState =
  "returned by server-only smoke/helper only";
export type SyntheticEndToEndPacketErrorState =
  "deterministic preview only";
export type SyntheticEndToEndPacketPreviewReferenceState =
  "preview-only / not persisted";
export type SyntheticEndToEndPacketStageSummaryState =
  "static synthetic placeholder only";
export type SyntheticEndToEndPacketResponseStatement =
  "Synthetic packet only. No provider output. No persistence.";
export type SyntheticEndToEndPacketErrorStatement =
  "No live error. No retry. No fallback.";

export type SyntheticEndToEndPacketId =
  `synthetic-end-to-end-packet-preview:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketDigest =
  `synthetic-end-to-end-packet-digest-preview:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}:in-memory-only`;
export type SyntheticEndToEndPacketResultReference =
  `synthetic-end-to-end-packet-result-reference-preview:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketAuditReference =
  `synthetic-end-to-end-packet-audit-reference-preview:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketApprovalReference =
  `synthetic-end-to-end-packet-approval-reference-preview:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketEvidenceReference =
  `synthetic-end-to-end-packet-evidence-reference-preview:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;

export type MinimalManualGatedSyntheticDryRunEndToEndPacketMvpKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-mvp:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketInputKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-input:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketAdmissionCheckKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-admission-check:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndExecutionReferenceKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-execution-reference:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndResultCaptureReferenceKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-result-capture-reference:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndAuditJoinReferenceKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-audit-join-reference:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndApprovalJoinReferenceKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-approval-join-reference:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketOutputKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-output:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketEnvelopeKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-envelope:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketStageSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-stage-summary:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketEvidencePreviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-evidence-preview:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketAuditPreviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-audit-preview:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketApprovalPreviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-approval-preview:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-safety-gate-summary:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketBlockedLivePersistenceSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-blocked-live-persistence-summary:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketRequestKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-request:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketResponseKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-response:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
export type SyntheticEndToEndPacketErrorKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-error:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;

export type SyntheticEndToEndPacketGateId =
  | "backend-only-boundary"
  | "server-only-module-boundary"
  | "synthetic-only-packet-mode"
  | "manual-approval-fixture"
  | "manual-confirmation-fixture"
  | "synthetic-execution-result-present"
  | "synthetic-result-capture-present"
  | "synthetic-audit-join-present"
  | "synthetic-approval-join-present"
  | "deterministic-execution-id"
  | "deterministic-capture-id"
  | "deterministic-audit-join-id"
  | "deterministic-approval-join-id"
  | "deterministic-packet-id"
  | "deterministic-packet-digest"
  | "in-memory-only-result-reference"
  | "in-memory-only-audit-reference"
  | "in-memory-only-approval-reference"
  | "no-real-approval-recording"
  | "no-approval-token-issuance"
  | "no-approval-lease-issuance"
  | "no-frontend-request"
  | "no-api-route"
  | "no-fetch-network"
  | "no-provider-sdk-import"
  | "no-provider-execution"
  | "no-model-call"
  | "no-prompt-sending"
  | "no-queue-dispatch"
  | "no-worker-dispatch"
  | "no-job-execution"
  | "no-result-persistence"
  | "no-audit-persistence"
  | "no-approval-persistence"
  | "no-database-write"
  | "no-file-write"
  | "single-run-lock-preview"
  | "idempotency-replay-preview"
  | "timeout-cancel-preview"
  | "privacy-redaction-preview";

export type SyntheticEndToEndPacketReadinessMatrixId =
  | "server-only-packet-helper-state"
  | "synthetic-execution-dependency"
  | "synthetic-result-capture-dependency"
  | "synthetic-audit-join-dependency"
  | "synthetic-approval-join-dependency"
  | "packet-input-state"
  | "packet-admission-check-state"
  | "packet-output-state"
  | "packet-envelope-state"
  | "packet-stage-summary-state"
  | "evidence-packet-state"
  | "audit-preview-state"
  | "approval-preview-state"
  | "provider-boundary-state"
  | "prompt-boundary-state"
  | "model-boundary-state"
  | "frontend-request-boundary-state"
  | "api-route-boundary-state"
  | "queue-boundary-state"
  | "worker-boundary-state"
  | "job-boundary-state"
  | "result-persistence-boundary-state"
  | "audit-persistence-boundary-state"
  | "approval-persistence-boundary-state"
  | "database-boundary-state"
  | "file-boundary-state";

export type SyntheticEndToEndPacketStageSummary = Readonly<{
  label: SyntheticEndToEndPacketStageSummaryState;
  executionStage: SyntheticEndToEndExecutionState;
  resultCaptureStage: SyntheticEndToEndResultCaptureState;
  auditJoinStage: SyntheticEndToEndAuditJoinState;
  approvalJoinStage: SyntheticEndToEndApprovalJoinState;
  packetAssemblyStage: SyntheticEndToEndPacketState;
  recoveryState:
    "end-to-end packet review and recovery preview comes next";
}>;

export type SyntheticEndToEndPacketEvidencePreview = Readonly<{
  label: SyntheticEndToEndPacketPreviewReferenceState;
  syntheticDigest: SyntheticEndToEndPacketDigest;
  evidenceSummaryLines: readonly string[];
}>;

export type SyntheticEndToEndPacketAuditPreview = Readonly<{
  label: SyntheticEndToEndPacketPreviewReferenceState;
  auditSummaryLines: readonly string[];
}>;

export type SyntheticEndToEndPacketApprovalPreview = Readonly<{
  label: SyntheticEndToEndPacketPreviewReferenceState;
  approvalSummaryLines: readonly string[];
  approvalFixtureState: SyntheticEndToEndPacketApprovalFixtureState;
  manualConfirmationFixtureState:
    SyntheticEndToEndPacketManualConfirmationFixtureState;
  approvalTokenState: SyntheticEndToEndPacketApprovalTokenState;
  approvalLeaseState: SyntheticEndToEndPacketApprovalLeaseState;
}>;

export type SyntheticEndToEndPacketCommonRecordFields = Readonly<{
  stableId: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId;
  capabilityFamily:
    MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["selectedCapabilityFamily"];
  workspaceTarget:
    MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["workspaceTarget"];
  providerSlotLabel:
    MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["providerSlotLabel"];
  localPrivateAlternativeLabel:
    MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["localPrivateAlternativeLabel"];
  sourceMinimalSyntheticAuditApprovalJoinMvpReference:
    MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpKey;
  sourceMinimalSyntheticAuditApprovalJoinReviewReference:
    BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord["key"];
  sourceSyntheticAuditJoinOutputReference: SyntheticAuditJoinOutputKey;
  sourceSyntheticApprovalJoinOutputReference: SyntheticApprovalJoinOutputKey;
  sourceMinimalSyntheticResultCaptureReviewReference:
    BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord["key"];
  sourceSyntheticResultCaptureOutputReference:
    SyntheticResultCaptureOutputKey;
  sourceMinimalSyntheticExecutionReviewReference:
    BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord["key"];
  sourceSyntheticExecutionResultReference: SyntheticMvpExecutionResultKey;
  sourceManualApprovalDecisionReviewReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
  sourceManualApprovalFixtureReference: SyntheticMvpManualApprovalFixtureKey;
  backendOwnedPosture: SyntheticEndToEndPacketBackendOwnedPosture;
  serverOnlyPosture: SyntheticEndToEndPacketServerOnlyPosture;
  syntheticOnlyPosture: SyntheticEndToEndPacketSyntheticOnlyPosture;
  manualGatedPosture: SyntheticEndToEndPacketManualGatedPosture;
  inMemoryOnlyPosture: SyntheticEndToEndPacketInMemoryOnlyPosture;
  noProviderExecution: SyntheticEndToEndPacketNoProviderExecution;
  noModelCalls: SyntheticEndToEndPacketNoModelCalls;
  noPromptSending: SyntheticEndToEndPacketNoPromptSending;
  noFrontendRequest: SyntheticEndToEndPacketNoFrontendRequest;
  noApiRoute: SyntheticEndToEndPacketNoApiRoute;
  noQueueWorkerJobDispatch:
    SyntheticEndToEndPacketNoQueueWorkerJobDispatch;
  noPersistence: SyntheticEndToEndPacketNoPersistence;
  noDatabaseWrites: SyntheticEndToEndPacketNoDatabaseWrites;
  noFileWrites: SyntheticEndToEndPacketNoFileWrites;
  noResultPersistence: SyntheticEndToEndPacketNoResultPersistence;
  noAuditPersistence: SyntheticEndToEndPacketNoAuditPersistence;
  noApprovalPersistence: SyntheticEndToEndPacketNoApprovalPersistence;
  noApprovalRecording: SyntheticEndToEndPacketNoApprovalRecording;
  noApprovalTokenIssuance:
    SyntheticEndToEndPacketNoApprovalTokenIssuance;
  noApprovalLeaseIssuance:
    SyntheticEndToEndPacketNoApprovalLeaseIssuance;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type MinimalManualGatedSyntheticDryRunEndToEndPacketMvpRecord =
  Readonly<{
    key: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpKey;
    version: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpVersion;
    packetState: SyntheticEndToEndPacketState;
    syntheticExecutionId: SyntheticMvpExecutionResultRecord["resultId"];
    syntheticCaptureId:
      SyntheticResultCaptureOutputRecord["syntheticCaptureId"];
    syntheticAuditJoinId: SyntheticAuditJoinOutputRecord["syntheticAuditJoinId"];
    syntheticApprovalJoinId:
      SyntheticApprovalJoinOutputRecord["syntheticApprovalJoinId"];
    syntheticEndToEndPacketId: SyntheticEndToEndPacketId;
    syntheticPacketDigest: SyntheticEndToEndPacketDigest;
    resultReference: SyntheticEndToEndPacketResultReference;
    auditReference: SyntheticEndToEndPacketAuditReference;
    approvalReference: SyntheticEndToEndPacketApprovalReference;
    evidencePacketReference: SyntheticEndToEndPacketEvidenceReference;
    packetTimestampPosture: SyntheticEndToEndPacketTimestampPosture;
    currentReadiness: SyntheticEndToEndPacketCurrentReadiness;
  } & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketInputRecord = Readonly<{
  key: SyntheticEndToEndPacketInputKey;
  version: SyntheticEndToEndPacketInputVersion;
  requestState: SyntheticEndToEndPacketRequestState;
  frontendRequestState: SyntheticEndToEndPacketFrontendRequestState;
  apiRouteState: SyntheticEndToEndPacketApiRouteState;
  executionPayloadPosture:
    "deterministic synthetic execution fixture only";
  resultCapturePayloadPosture:
    "deterministic synthetic capture fixture only";
  auditJoinPayloadPosture:
    "deterministic synthetic audit join fixture only";
  approvalJoinPayloadPosture:
    "deterministic synthetic approval join fixture only";
  providerPayloadPosture: "none";
  modelOutputPosture: "none";
  persistenceTargetPosture: "none";
  explicitNoFrontendRequestNoApiRouteNoPersistenceStatement:
    "No frontend request. No API route. No persistence.";
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketAdmissionCheckRecord = Readonly<{
  key: SyntheticEndToEndPacketAdmissionCheckKey;
  version: SyntheticEndToEndPacketAdmissionCheckVersion;
  backendOnlyState: "validated";
  serverOnlyState: "validated";
  syntheticOnlyState: "validated";
  manualGatedState: "validated";
  syntheticExecutionResultState: "validated";
  syntheticResultCaptureState: "validated";
  syntheticAuditJoinState: "validated";
  syntheticApprovalJoinState: "validated";
  approvalFixtureState: "validated";
  manualConfirmationFixtureState: "validated";
  previewOnlyReferenceState: "validated";
  providerModelPromptBoundaryState: "validated";
  frontendApiBoundaryState: "validated";
  persistenceBoundaryState: "validated";
  queueWorkerJobBoundaryState: "validated";
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndExecutionReferenceRecord = Readonly<{
  key: SyntheticEndToEndExecutionReferenceKey;
  version: SyntheticEndToEndExecutionReferenceVersion;
  syntheticExecutionId: SyntheticMvpExecutionResultRecord["resultId"];
  executionState: SyntheticEndToEndExecutionState;
  executionReferenceState: "deterministic preview id only";
  providerResponseState: SyntheticEndToEndPacketProviderResponseState;
  modelOutputState: SyntheticEndToEndPacketModelOutputState;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndResultCaptureReferenceRecord = Readonly<{
  key: SyntheticEndToEndResultCaptureReferenceKey;
  version: SyntheticEndToEndResultCaptureReferenceVersion;
  syntheticCaptureId:
    SyntheticResultCaptureOutputRecord["syntheticCaptureId"];
  resultCaptureState: SyntheticEndToEndResultCaptureState;
  resultReference: SyntheticEndToEndPacketResultReference;
  resultReferenceState: SyntheticEndToEndPacketPreviewReferenceState;
  providerResponseState: SyntheticEndToEndPacketProviderResponseState;
  modelOutputState: SyntheticEndToEndPacketModelOutputState;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndAuditJoinReferenceRecord = Readonly<{
  key: SyntheticEndToEndAuditJoinReferenceKey;
  version: SyntheticEndToEndAuditJoinReferenceVersion;
  syntheticAuditJoinId: SyntheticAuditJoinOutputRecord["syntheticAuditJoinId"];
  auditJoinState: SyntheticEndToEndAuditJoinState;
  auditReference: SyntheticEndToEndPacketAuditReference;
  auditReferenceState: SyntheticEndToEndPacketPreviewReferenceState;
  providerResponseState: SyntheticEndToEndPacketProviderResponseState;
  modelOutputState: SyntheticEndToEndPacketModelOutputState;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndApprovalJoinReferenceRecord = Readonly<{
  key: SyntheticEndToEndApprovalJoinReferenceKey;
  version: SyntheticEndToEndApprovalJoinReferenceVersion;
  syntheticApprovalJoinId:
    SyntheticApprovalJoinOutputRecord["syntheticApprovalJoinId"];
  approvalJoinState: SyntheticEndToEndApprovalJoinState;
  approvalReference: SyntheticEndToEndPacketApprovalReference;
  approvalReferenceState: SyntheticEndToEndPacketPreviewReferenceState;
  approvalFixtureState: SyntheticEndToEndPacketApprovalFixtureState;
  manualConfirmationFixtureState:
    SyntheticEndToEndPacketManualConfirmationFixtureState;
  approvalTokenState: SyntheticEndToEndPacketApprovalTokenState;
  approvalLeaseState: SyntheticEndToEndPacketApprovalLeaseState;
  providerResponseState: SyntheticEndToEndPacketProviderResponseState;
  modelOutputState: SyntheticEndToEndPacketModelOutputState;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketOutputRecord = Readonly<{
  key: SyntheticEndToEndPacketOutputKey;
  version: SyntheticEndToEndPacketOutputVersion;
  responseState: SyntheticEndToEndPacketResponseState;
  packetState: SyntheticEndToEndPacketState;
  executionState: SyntheticEndToEndExecutionState;
  resultCaptureState: SyntheticEndToEndResultCaptureState;
  auditJoinState: SyntheticEndToEndAuditJoinState;
  approvalJoinState: SyntheticEndToEndApprovalJoinState;
  syntheticExecutionId: SyntheticMvpExecutionResultRecord["resultId"];
  syntheticCaptureId:
    SyntheticResultCaptureOutputRecord["syntheticCaptureId"];
  syntheticAuditJoinId: SyntheticAuditJoinOutputRecord["syntheticAuditJoinId"];
  syntheticApprovalJoinId:
    SyntheticApprovalJoinOutputRecord["syntheticApprovalJoinId"];
  syntheticEndToEndPacketId: SyntheticEndToEndPacketId;
  syntheticPacketDigest: SyntheticEndToEndPacketDigest;
  resultReference: SyntheticEndToEndPacketResultReference;
  auditReference: SyntheticEndToEndPacketAuditReference;
  approvalReference: SyntheticEndToEndPacketApprovalReference;
  evidencePacketReference: SyntheticEndToEndPacketEvidenceReference;
  packetTimestampPosture: SyntheticEndToEndPacketTimestampPosture;
  providerResponseState: SyntheticEndToEndPacketProviderResponseState;
  modelOutputState: SyntheticEndToEndPacketModelOutputState;
  resultPersistenceState: SyntheticEndToEndPacketPersistenceState;
  auditPersistenceState: SyntheticEndToEndPacketPersistenceState;
  approvalPersistenceState: SyntheticEndToEndPacketPersistenceState;
  databaseWriteState: SyntheticEndToEndPacketPersistenceState;
  fileWriteState: SyntheticEndToEndPacketPersistenceState;
  explicitSyntheticPacketOnlyNoProviderOutputNoPersistenceStatement:
    SyntheticEndToEndPacketResponseStatement;
  currentReadiness: SyntheticEndToEndPacketCurrentReadiness;
  serverOnlyHelperStatement:
    SyntheticEndToEndPacketServerOnlyHelperStatement;
  deterministicSyntheticPacketStatement:
    SyntheticEndToEndPacketDeterministicStatement;
  inMemoryOnlyPacketStatement:
    SyntheticEndToEndPacketInMemoryOnlyStatement;
  noFrontendRequestStatement:
    SyntheticEndToEndPacketNoFrontendRequestStatement;
  noApiRouteStatement: SyntheticEndToEndPacketNoApiRouteStatement;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketEnvelopeRecord = Readonly<{
  key: SyntheticEndToEndPacketEnvelopeKey;
  version: SyntheticEndToEndPacketEnvelopeVersion;
  requestReference: SyntheticEndToEndPacketRequestKey;
  responseReference: SyntheticEndToEndPacketResponseKey;
  errorReference: SyntheticEndToEndPacketErrorKey;
  outputReference: SyntheticEndToEndPacketOutputKey;
  executionReference: SyntheticEndToEndExecutionReferenceKey;
  resultCaptureReference: SyntheticEndToEndResultCaptureReferenceKey;
  auditJoinReference: SyntheticEndToEndAuditJoinReferenceKey;
  approvalJoinReference: SyntheticEndToEndApprovalJoinReferenceKey;
  stageSummaryReference: SyntheticEndToEndPacketStageSummaryKey;
  evidencePreviewReference: SyntheticEndToEndPacketEvidencePreviewKey;
  auditPreviewReference: SyntheticEndToEndPacketAuditPreviewKey;
  approvalPreviewReference: SyntheticEndToEndPacketApprovalPreviewKey;
  packetState: SyntheticEndToEndPacketState;
  resultReference: SyntheticEndToEndPacketResultReference;
  auditReference: SyntheticEndToEndPacketAuditReference;
  approvalReference: SyntheticEndToEndPacketApprovalReference;
  evidenceReference: SyntheticEndToEndPacketEvidenceReference;
  providerResponseState: SyntheticEndToEndPacketProviderResponseState;
  modelOutputState: SyntheticEndToEndPacketModelOutputState;
  resultPersistenceState: SyntheticEndToEndPacketPersistenceState;
  auditPersistenceState: SyntheticEndToEndPacketPersistenceState;
  approvalPersistenceState: SyntheticEndToEndPacketPersistenceState;
  databaseWriteState: SyntheticEndToEndPacketPersistenceState;
  fileWriteState: SyntheticEndToEndPacketPersistenceState;
  explicitSyntheticPacketOnlyNoProviderOutputNoPersistenceStatement:
    SyntheticEndToEndPacketResponseStatement;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketStageSummaryRecord = Readonly<{
  key: SyntheticEndToEndPacketStageSummaryKey;
  version: SyntheticEndToEndPacketStageSummaryVersion;
  stageSummaryState: SyntheticEndToEndPacketStageSummaryState;
  stageSummary: SyntheticEndToEndPacketStageSummary;
  summaryLines: readonly string[];
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketEvidencePreviewRecord = Readonly<{
  key: SyntheticEndToEndPacketEvidencePreviewKey;
  version: SyntheticEndToEndPacketEvidencePreviewVersion;
  evidenceReference: SyntheticEndToEndPacketEvidenceReference;
  evidencePreviewState: SyntheticEndToEndPacketPreviewReferenceState;
  evidencePreview: SyntheticEndToEndPacketEvidencePreview;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketAuditPreviewRecord = Readonly<{
  key: SyntheticEndToEndPacketAuditPreviewKey;
  version: SyntheticEndToEndPacketAuditPreviewVersion;
  auditReference: SyntheticEndToEndPacketAuditReference;
  auditPreviewState: SyntheticEndToEndPacketPreviewReferenceState;
  auditPreview: SyntheticEndToEndPacketAuditPreview;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketApprovalPreviewRecord = Readonly<{
  key: SyntheticEndToEndPacketApprovalPreviewKey;
  version: SyntheticEndToEndPacketApprovalPreviewVersion;
  approvalReference: SyntheticEndToEndPacketApprovalReference;
  approvalPreviewState: SyntheticEndToEndPacketPreviewReferenceState;
  approvalPreview: SyntheticEndToEndPacketApprovalPreview;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketSafetyGateSummaryRecord = Readonly<{
  key: SyntheticEndToEndPacketSafetyGateSummaryKey;
  version: SyntheticEndToEndPacketSafetyGateSummaryVersion;
  serverOnlyHelperStatement:
    SyntheticEndToEndPacketServerOnlyHelperStatement;
  noFrontendRequestStatement:
    SyntheticEndToEndPacketNoFrontendRequestStatement;
  noApiRouteStatement: SyntheticEndToEndPacketNoApiRouteStatement;
  deterministicSyntheticPacketStatement:
    SyntheticEndToEndPacketDeterministicStatement;
  currentReadiness: SyntheticEndToEndPacketCurrentReadiness;
  summaryLines: readonly string[];
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketBlockedLivePersistenceSummaryRecord =
  Readonly<{
    key: SyntheticEndToEndPacketBlockedLivePersistenceSummaryKey;
    version: SyntheticEndToEndPacketBlockedLivePersistenceSummaryVersion;
    blockedLiveActions: readonly string[];
    persistenceState: SyntheticEndToEndPacketPersistenceState;
    summaryLines: readonly string[];
  } & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketRequestRecord = Readonly<{
  key: SyntheticEndToEndPacketRequestKey;
  version: SyntheticEndToEndPacketRequestVersion;
  requestState: SyntheticEndToEndPacketRequestState;
  frontendRequestState: SyntheticEndToEndPacketFrontendRequestState;
  apiRouteState: SyntheticEndToEndPacketApiRouteState;
  executionPayloadPosture:
    "deterministic synthetic execution fixture only";
  resultCapturePayloadPosture:
    "deterministic synthetic capture fixture only";
  auditJoinPayloadPosture:
    "deterministic synthetic audit join fixture only";
  approvalJoinPayloadPosture:
    "deterministic synthetic approval join fixture only";
  providerPayloadPosture: "none";
  modelOutputPosture: "none";
  persistenceTargetPosture: "none";
  explicitNoFrontendRequestNoApiRouteNoPersistenceStatement:
    "No frontend request. No API route. No persistence.";
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketResponseRecord = Readonly<{
  key: SyntheticEndToEndPacketResponseKey;
  version: SyntheticEndToEndPacketResponseVersion;
  responseState: SyntheticEndToEndPacketResponseState;
  packetState: SyntheticEndToEndPacketState;
  executionState: SyntheticEndToEndExecutionState;
  resultCaptureState: SyntheticEndToEndResultCaptureState;
  auditJoinState: SyntheticEndToEndAuditJoinState;
  approvalJoinState: SyntheticEndToEndApprovalJoinState;
  providerResponseState: SyntheticEndToEndPacketProviderResponseState;
  modelOutputState: SyntheticEndToEndPacketModelOutputState;
  resultPersistenceState: SyntheticEndToEndPacketPersistenceState;
  auditPersistenceState: SyntheticEndToEndPacketPersistenceState;
  approvalPersistenceState: SyntheticEndToEndPacketPersistenceState;
  databaseWriteState: SyntheticEndToEndPacketPersistenceState;
  fileWriteState: SyntheticEndToEndPacketPersistenceState;
  explicitSyntheticPacketOnlyNoProviderOutputNoPersistenceStatement:
    SyntheticEndToEndPacketResponseStatement;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketErrorRecord = Readonly<{
  key: SyntheticEndToEndPacketErrorKey;
  version: SyntheticEndToEndPacketErrorVersion;
  errorState: SyntheticEndToEndPacketErrorState;
  failedGateExamples: readonly SyntheticEndToEndPacketGateId[];
  missingSyntheticExecutionExample:
    "Synthetic execution result fixture is required.";
  missingSyntheticResultCaptureExample:
    "Synthetic result capture output is required.";
  missingAuditJoinExample: "Synthetic audit join output is required.";
  missingApprovalJoinExample:
    "Synthetic approval join output is required.";
  missingManualApprovalFixtureExample:
    "Manual approval fixture is required.";
  providerResponseDetectedExample:
    "Provider response must remain absent.";
  modelOutputDetectedExample: "Model output must remain absent.";
  promptSentDetectedExample: "Prompt sending must remain blocked.";
  persistenceAttemptedExample:
    "Persistence target must remain absent.";
  databaseWriteAttemptedExample:
    "Database write target must remain absent.";
  fileWriteAttemptedExample:
    "File write target must remain absent.";
  queueWorkerJobAttemptedExample:
    "Queue, worker, and job dispatch must remain blocked.";
  retryPosture: SyntheticEndToEndPacketRetryPosture;
  fallbackPosture: SyntheticEndToEndPacketFallbackPosture;
  explicitNoLiveErrorNoRetryNoFallbackStatement:
    SyntheticEndToEndPacketErrorStatement;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketGateRecord = Readonly<{
  id: SyntheticEndToEndPacketGateId;
  key: `${SyntheticEndToEndPacketGateId}:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
  version: SyntheticEndToEndPacketGateVersion;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type SyntheticEndToEndPacketReadinessMatrixRecord = Readonly<{
  id: SyntheticEndToEndPacketReadinessMatrixId;
  key: `${SyntheticEndToEndPacketReadinessMatrixId}:${MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId}`;
  version: SyntheticEndToEndPacketReadinessMatrixVersion;
  label: string;
  state: string;
  evidence: string;
  currentReadiness: SyntheticEndToEndPacketCurrentReadiness;
  nextSafeAction: string;
} & SyntheticEndToEndPacketCommonRecordFields>;

export type MinimalManualGatedSyntheticDryRunEndToEndPacketMvpCapabilityFamilyGroup =
  Readonly<{
    capabilityFamilyId:
      MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["selectedCapabilityFamily"]["id"];
    capabilityFamilyLabel:
      MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["selectedCapabilityFamily"]["label"];
    packetCount: number;
  }>;

export type MinimalManualGatedSyntheticDryRunEndToEndPacketMvpWorkspaceGroup =
  Readonly<{
    workspaceTarget:
      MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["workspaceTarget"];
    packetCount: number;
  }>;

export type SyntheticEndToEndPacketSummary = Readonly<{
  version: SyntheticEndToEndPacketSummaryVersion;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  packetCount: number;
  currentReadiness: SyntheticEndToEndPacketCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type SyntheticEndToEndPacketGateSummary = Readonly<{
  version: SyntheticEndToEndPacketGateSummaryVersion;
  gateCount: number;
  currentReadiness: SyntheticEndToEndPacketCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type SyntheticEndToEndPacketReadinessSummary = Readonly<{
  version: SyntheticEndToEndPacketReadinessSummaryVersion;
  readinessCount: number;
  currentReadiness: SyntheticEndToEndPacketCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type MinimalManualGatedSyntheticDryRunEndToEndPacketMvpRunInput =
  Readonly<{
    endToEndPacketMvpId: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId;
    backendOwnedMode: SyntheticEndToEndPacketBackendOwnedPosture;
    serverOnlyMode: SyntheticEndToEndPacketServerOnlyPosture;
    syntheticPacketMode: SyntheticEndToEndPacketSyntheticOnlyPosture;
    manualGatedMode: SyntheticEndToEndPacketManualGatedPosture;
    syntheticExecutionResult: SyntheticMvpExecutionResultRecord;
    syntheticResultCaptureOutput: SyntheticResultCaptureOutputRecord;
    syntheticAuditJoinOutput: SyntheticAuditJoinOutputRecord;
    syntheticApprovalJoinOutput: SyntheticApprovalJoinOutputRecord;
    syntheticAuditApprovalJoinEnvelope: SyntheticAuditApprovalJoinEnvelopeRecord;
    syntheticEvidencePacket: SyntheticResultCaptureEvidencePacketRecord;
    manualApprovalFixture: SyntheticMvpManualApprovalFixtureRecord;
    approvalFixtureState: SyntheticEndToEndPacketApprovalFixtureState;
    manualConfirmationFixtureState:
      SyntheticEndToEndPacketManualConfirmationFixtureState;
    approvalRecordingState: SyntheticEndToEndPacketApprovalRecordingState;
    approvalTokenState: SyntheticEndToEndPacketApprovalTokenState;
    approvalLeaseState: SyntheticEndToEndPacketApprovalLeaseState;
    auditReferenceState: SyntheticEndToEndPacketPreviewReferenceState;
    approvalReferenceState: SyntheticEndToEndPacketPreviewReferenceState;
    resultReferenceState: SyntheticEndToEndPacketPreviewReferenceState;
    evidencePacketReferenceState:
      SyntheticEndToEndPacketPreviewReferenceState;
    providerResponseState: SyntheticEndToEndPacketProviderResponseState;
    modelOutputState: SyntheticEndToEndPacketModelOutputState;
    promptState: SyntheticEndToEndPacketPromptState;
    frontendRequestState: SyntheticEndToEndPacketFrontendRequestState;
    apiRouteState: SyntheticEndToEndPacketApiRouteState;
    persistenceTargetState:
      SyntheticEndToEndPacketPersistenceTargetState;
    databaseWriteTargetState:
      SyntheticEndToEndPacketDatabaseWriteTargetState;
    fileWriteTargetState: SyntheticEndToEndPacketFileWriteTargetState;
    queueDispatchState: SyntheticEndToEndPacketDispatchState;
    workerDispatchState: SyntheticEndToEndPacketDispatchState;
    jobExecutionState: SyntheticEndToEndPacketDispatchState;
    providerSdkImportState:
      SyntheticEndToEndPacketProviderSdkImportState;
    providerExecutionState: SyntheticEndToEndPacketDispatchState;
  }>;

export type MinimalManualGatedSyntheticDryRunEndToEndPacketMvpServerRunRecord =
  Readonly<{
    endToEndPacketMvpId: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId;
    requestLabel:
      MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecord["requestLabel"];
    sourceSyntheticExecutionResultReference:
      SyntheticMvpExecutionResultKey;
    sourceSyntheticResultCaptureOutputReference:
      SyntheticResultCaptureOutputKey;
    sourceSyntheticAuditJoinOutputReference: SyntheticAuditJoinOutputKey;
    sourceSyntheticApprovalJoinOutputReference:
      SyntheticApprovalJoinOutputKey;
    packetState: SyntheticEndToEndPacketState;
    executionState: SyntheticEndToEndExecutionState;
    resultCaptureState: SyntheticEndToEndResultCaptureState;
    auditJoinState: SyntheticEndToEndAuditJoinState;
    approvalJoinState: SyntheticEndToEndApprovalJoinState;
    syntheticExecutionId: SyntheticMvpExecutionResultRecord["resultId"];
    syntheticCaptureId:
      SyntheticResultCaptureOutputRecord["syntheticCaptureId"];
    syntheticAuditJoinId: SyntheticAuditJoinOutputRecord["syntheticAuditJoinId"];
    syntheticApprovalJoinId:
      SyntheticApprovalJoinOutputRecord["syntheticApprovalJoinId"];
    syntheticEndToEndPacketId: SyntheticEndToEndPacketId;
    syntheticPacketDigest: SyntheticEndToEndPacketDigest;
    resultReference: SyntheticEndToEndPacketResultReference;
    auditReference: SyntheticEndToEndPacketAuditReference;
    approvalReference: SyntheticEndToEndPacketApprovalReference;
    evidencePacketReference: SyntheticEndToEndPacketEvidenceReference;
    stageSummary: SyntheticEndToEndPacketStageSummary;
    evidencePreview: SyntheticEndToEndPacketEvidencePreview;
    auditPreview: SyntheticEndToEndPacketAuditPreview;
    approvalPreview: SyntheticEndToEndPacketApprovalPreview;
    packetTimestampPosture: SyntheticEndToEndPacketTimestampPosture;
    persistenceState: SyntheticEndToEndPacketPersistenceState;
    currentReadiness: SyntheticEndToEndPacketCurrentReadiness;
    serverOnlyHelperStatement:
      SyntheticEndToEndPacketServerOnlyHelperStatement;
    deterministicSyntheticPacketStatement:
      SyntheticEndToEndPacketDeterministicStatement;
    inMemoryOnlyPacketStatement:
      SyntheticEndToEndPacketInMemoryOnlyStatement;
    noFrontendRequestStatement:
      SyntheticEndToEndPacketNoFrontendRequestStatement;
    noApiRouteStatement: SyntheticEndToEndPacketNoApiRouteStatement;
    nextEndToEndPacketReviewRecoveryChecklist: readonly string[];
  }>;
