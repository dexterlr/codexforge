import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
} from "../minimal-synth-exec-review";
import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord,
  MinimalSyntheticResultCaptureOutputReviewKey,
} from "../min-synth-capture-review";
import type {
  MinimalManualGatedSyntheticDryRunResultCaptureMvpId,
  MinimalManualGatedSyntheticDryRunResultCaptureMvpKey,
  MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord,
  SyntheticResultCaptureApprovalPreviewKey,
  SyntheticResultCaptureApprovalPreviewRecord,
  SyntheticResultCaptureAuditPreviewKey,
  SyntheticResultCaptureAuditPreviewRecord,
  SyntheticResultCaptureEvidencePacketKey,
  SyntheticResultCaptureEvidencePacketRecord,
  SyntheticResultCaptureOutputKey,
  SyntheticResultCaptureOutputRecord,
} from "../min-synth-result-capture";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  SyntheticMvpManualApprovalFixtureKey,
  SyntheticMvpManualApprovalFixtureRecord,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH =
  "5514-5545 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_PHASE =
  5545;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5482-5513 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5546-5577 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview";

export const SYNTHETIC_AUDIT_APPROVAL_JOIN_SECTION_TITLES = [
  "Backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP",
  "Synthetic audit and approval join input",
  "Synthetic audit join output",
  "Synthetic approval join output",
  "Synthetic audit and approval join envelope",
  "Synthetic audit and approval join gates",
  "Synthetic audit and approval join readiness matrix",
  "Synthetic audit and approval join evidence preview",
] as const;

export type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId =
  MinimalManualGatedSyntheticDryRunResultCaptureMvpId;

export type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-mvp-v1";
export type SyntheticAuditApprovalJoinInputVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-input-v1";
export type SyntheticAuditApprovalJoinAdmissionCheckVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-admission-check-v1";
export type SyntheticAuditJoinOutputVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-join-output-v1";
export type SyntheticApprovalJoinOutputVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-approval-join-output-v1";
export type SyntheticAuditApprovalJoinEnvelopeVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-envelope-v1";
export type SyntheticAuditJoinPreviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-join-preview-v1";
export type SyntheticApprovalJoinPreviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-approval-join-preview-v1";
export type SyntheticAuditApprovalEvidencePacketVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-evidence-packet-v1";
export type SyntheticAuditApprovalJoinSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-safety-gate-summary-v1";
export type SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-blocked-live-persistence-summary-v1";
export type SyntheticAuditApprovalJoinRequestVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-request-v1";
export type SyntheticAuditApprovalJoinResponseVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-response-v1";
export type SyntheticAuditApprovalJoinErrorVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-error-v1";
export type SyntheticAuditApprovalJoinGateVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-gate-v1";
export type SyntheticAuditApprovalJoinReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-readiness-matrix-v1";
export type SyntheticAuditApprovalJoinSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-summary-v1";
export type SyntheticAuditApprovalJoinGateSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-gate-summary-v1";
export type SyntheticAuditApprovalJoinReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-readiness-summary-v1";

export type SyntheticAuditApprovalJoinBackendOwnedPosture = "backend-owned";
export type SyntheticAuditApprovalJoinServerOnlyPosture = "server-only";
export type SyntheticAuditApprovalJoinSyntheticOnlyPosture = "synthetic-only";
export type SyntheticAuditApprovalJoinManualGatedPosture = "manual-gated";
export type SyntheticAuditApprovalJoinInMemoryOnlyPosture = "in-memory-only";
export type SyntheticAuditApprovalJoinNoProviderExecution =
  "no provider execution";
export type SyntheticAuditApprovalJoinNoModelCalls = "no model calls";
export type SyntheticAuditApprovalJoinNoPromptSending = "no prompt sending";
export type SyntheticAuditApprovalJoinNoFrontendRequest =
  "no frontend request";
export type SyntheticAuditApprovalJoinNoApiRoute = "no API route";
export type SyntheticAuditApprovalJoinNoQueueWorkerJobDispatch =
  "no queue/worker/job dispatch";
export type SyntheticAuditApprovalJoinNoPersistence = "no persistence";
export type SyntheticAuditApprovalJoinNoDatabaseWrites =
  "no database writes";
export type SyntheticAuditApprovalJoinNoFileWrites = "no file writes";
export type SyntheticAuditApprovalJoinNoResultPersistence =
  "no result persistence";
export type SyntheticAuditApprovalJoinNoAuditPersistence =
  "no audit persistence";
export type SyntheticAuditApprovalJoinNoApprovalPersistence =
  "no approval persistence";
export type SyntheticAuditApprovalJoinNoApprovalRecording =
  "no approval recording";
export type SyntheticAuditApprovalJoinNoApprovalTokenIssuance =
  "no approval token issuance";
export type SyntheticAuditApprovalJoinNoApprovalLeaseIssuance =
  "no approval lease issuance";
export type SyntheticAuditApprovalJoinCurrentReadiness =
  "minimal-synthetic-audit-approval-join-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent";
export type SyntheticAuditApprovalJoinState =
  "joined-synthetic-in-memory-only";
export type SyntheticAuditJoinState =
  "deterministic synthetic audit join in memory only";
export type SyntheticApprovalJoinState =
  "deterministic synthetic approval join in memory only";
export type SyntheticAuditApprovalJoinPersistenceState = "not implemented";
export type SyntheticAuditApprovalJoinProviderResponseState = "not received";
export type SyntheticAuditApprovalJoinModelOutputState = "not generated";
export type SyntheticAuditApprovalJoinPromptState = "not sent";
export type SyntheticAuditApprovalJoinFrontendRequestState = "not created";
export type SyntheticAuditApprovalJoinApiRouteState = "not created";
export type SyntheticAuditApprovalJoinPersistenceTargetState = "none";
export type SyntheticAuditApprovalJoinDatabaseWriteTargetState = "none";
export type SyntheticAuditApprovalJoinFileWriteTargetState = "none";
export type SyntheticAuditApprovalJoinDispatchState = "blocked";
export type SyntheticAuditApprovalJoinProviderSdkImportState =
  "not imported";
export type SyntheticAuditApprovalJoinApprovalFixtureState = "preview-only";
export type SyntheticAuditApprovalJoinManualConfirmationFixtureState =
  "preview-only";
export type SyntheticAuditApprovalJoinApprovalRecordingState =
  "not recorded";
export type SyntheticAuditApprovalJoinApprovalTokenState = "not issued";
export type SyntheticAuditApprovalJoinApprovalLeaseState = "not created";
export type SyntheticAuditApprovalJoinTimestampPosture =
  "static fixture label only / no real timestamp";
export type SyntheticAuditApprovalJoinRetryPosture = "disabled";
export type SyntheticAuditApprovalJoinFallbackPosture = "disabled";
export type SyntheticAuditApprovalJoinDeterministicStatement =
  "deterministic synthetic audit and approval join only";
export type SyntheticAuditApprovalJoinInMemoryOnlyStatement =
  "synthetic audit and approval join is produced in memory only";
export type SyntheticAuditApprovalJoinServerOnlyHelperStatement =
  "server-only synthetic audit and approval join helper exists";
export type SyntheticAuditApprovalJoinNoFrontendRequestStatement =
  "no frontend request is created";
export type SyntheticAuditApprovalJoinNoApiRouteStatement =
  "no API route is created";
export type SyntheticAuditApprovalJoinNoRealApprovalRequestStatement =
  "no real approval request";
export type SyntheticAuditApprovalJoinNoRealApprovalRecordingStatement =
  "no real approval recording";
export type SyntheticAuditApprovalJoinApprovalFixtureStatement =
  "approval fixture is preview-only";
export type SyntheticAuditApprovalJoinManualConfirmationStatement =
  "manual confirmation fixture is preview-only";
export type SyntheticAuditApprovalJoinApprovalTokenStatement =
  "approval token is not issued";
export type SyntheticAuditApprovalJoinApprovalLeaseStatement =
  "approval lease is not created";
export type SyntheticAuditApprovalJoinRequestState =
  "deterministic synthetic join request only";
export type SyntheticAuditApprovalJoinResponseState =
  "returned by server-only smoke/helper only";
export type SyntheticAuditApprovalJoinErrorState =
  "deterministic preview only";
export type SyntheticAuditApprovalJoinEvidencePacketState =
  "preview-only / not persisted";
export type SyntheticAuditApprovalJoinPreviewReferenceState =
  "preview-only / not persisted";
export type SyntheticAuditApprovalJoinResponseStatement =
  "Synthetic join only. No provider output. No persistence.";
export type SyntheticAuditApprovalJoinErrorStatement =
  "No live error. No retry. No fallback.";

export type SyntheticAuditJoinId =
  `synthetic-audit-join-preview:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticApprovalJoinId =
  `synthetic-approval-join-preview:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinDigest =
  `synthetic-audit-approval-join-digest-preview:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}:in-memory-only`;
export type SyntheticAuditApprovalJoinResultReference =
  `synthetic-audit-approval-join-result-reference-preview:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinAuditReference =
  `synthetic-audit-approval-join-audit-reference-preview:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinApprovalReference =
  `synthetic-audit-approval-join-approval-reference-preview:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinEvidenceReference =
  `synthetic-audit-approval-join-evidence-preview:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;

export type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-mvp:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinInputKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-input:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinAdmissionCheckKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-admission-check:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditJoinOutputKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-join-output:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticApprovalJoinOutputKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-approval-join-output:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinEnvelopeKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-envelope:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditJoinPreviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-join-preview:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticApprovalJoinPreviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-approval-join-preview:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalEvidencePacketKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-evidence-packet:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-safety-gate-summary:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-blocked-live-persistence-summary:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinRequestKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-request:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinResponseKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-response:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;
export type SyntheticAuditApprovalJoinErrorKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-error:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}`;

export type SyntheticAuditApprovalJoinGateId =
  | "backend-only-boundary"
  | "server-only-module-boundary"
  | "synthetic-only-join-mode"
  | "manual-approval-fixture"
  | "manual-confirmation-fixture"
  | "synthetic-result-capture-present"
  | "deterministic-audit-join-id"
  | "deterministic-approval-join-id"
  | "deterministic-join-digest"
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

export type SyntheticAuditApprovalJoinReadinessMatrixId =
  | "server-only-join-helper-state"
  | "synthetic-result-capture-dependency"
  | "audit-preview-dependency"
  | "approval-preview-dependency"
  | "audit-approval-join-input-state"
  | "join-admission-check-state"
  | "audit-join-output-state"
  | "approval-join-output-state"
  | "join-envelope-state"
  | "evidence-packet-state"
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

export type SyntheticAuditApprovalJoinPayload = Readonly<{
  label: "static synthetic audit and approval join placeholder only";
  joinEnvelopeState: "preview-only";
  evidenceDigest: SyntheticAuditApprovalJoinDigest;
  auditPreviewState: SyntheticAuditApprovalJoinPreviewReferenceState;
  approvalPreviewState: SyntheticAuditApprovalJoinPreviewReferenceState;
  evidencePreviewState: SyntheticAuditApprovalJoinEvidencePacketState;
}>;

export type SyntheticAuditApprovalJoinCommonRecordFields = Readonly<{
  stableId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  capabilityFamily:
    MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["selectedCapabilityFamily"];
  workspaceTarget:
    MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["workspaceTarget"];
  providerSlotLabel:
    MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["providerSlotLabel"];
  localPrivateAlternativeLabel:
    MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["localPrivateAlternativeLabel"];
  sourceMinimalSyntheticResultCaptureMvpReference:
    MinimalManualGatedSyntheticDryRunResultCaptureMvpKey;
  sourceMinimalSyntheticResultCaptureReviewReference:
    BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord["key"];
  sourceSyntheticResultCaptureOutputReference: SyntheticResultCaptureOutputKey;
  sourceSyntheticResultCaptureOutputReviewReference:
    MinimalSyntheticResultCaptureOutputReviewKey;
  sourceMinimalSyntheticExecutionReviewReference:
    BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord["key"];
  sourceManualApprovalDecisionReviewReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
  sourceManualApprovalFixtureReference: SyntheticMvpManualApprovalFixtureKey;
  sourceManualConfirmationFixtureReference:
    SyntheticMvpManualApprovalFixtureKey;
  backendOwnedPosture: SyntheticAuditApprovalJoinBackendOwnedPosture;
  serverOnlyPosture: SyntheticAuditApprovalJoinServerOnlyPosture;
  syntheticOnlyPosture: SyntheticAuditApprovalJoinSyntheticOnlyPosture;
  manualGatedPosture: SyntheticAuditApprovalJoinManualGatedPosture;
  inMemoryOnlyPosture: SyntheticAuditApprovalJoinInMemoryOnlyPosture;
  noProviderExecution: SyntheticAuditApprovalJoinNoProviderExecution;
  noModelCalls: SyntheticAuditApprovalJoinNoModelCalls;
  noPromptSending: SyntheticAuditApprovalJoinNoPromptSending;
  noFrontendRequest: SyntheticAuditApprovalJoinNoFrontendRequest;
  noApiRoute: SyntheticAuditApprovalJoinNoApiRoute;
  noQueueWorkerJobDispatch:
    SyntheticAuditApprovalJoinNoQueueWorkerJobDispatch;
  noPersistence: SyntheticAuditApprovalJoinNoPersistence;
  noDatabaseWrites: SyntheticAuditApprovalJoinNoDatabaseWrites;
  noFileWrites: SyntheticAuditApprovalJoinNoFileWrites;
  noResultPersistence: SyntheticAuditApprovalJoinNoResultPersistence;
  noAuditPersistence: SyntheticAuditApprovalJoinNoAuditPersistence;
  noApprovalPersistence: SyntheticAuditApprovalJoinNoApprovalPersistence;
  noApprovalRecording: SyntheticAuditApprovalJoinNoApprovalRecording;
  noApprovalTokenIssuance:
    SyntheticAuditApprovalJoinNoApprovalTokenIssuance;
  noApprovalLeaseIssuance:
    SyntheticAuditApprovalJoinNoApprovalLeaseIssuance;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecord =
  Readonly<{
    id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
    key: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpKey;
    version: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpVersion;
    label: string;
    requestLabel:
      MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["requestLabel"];
    sourceSyntheticResultCaptureAuditPreviewReference:
      SyntheticResultCaptureAuditPreviewKey;
    sourceSyntheticResultCaptureApprovalPreviewReference:
      SyntheticResultCaptureApprovalPreviewKey;
    sourceSyntheticResultCaptureEvidencePacketReference:
      SyntheticResultCaptureEvidencePacketKey;
    currentReadiness: SyntheticAuditApprovalJoinCurrentReadiness;
    serverOnlyHelperStatement:
      SyntheticAuditApprovalJoinServerOnlyHelperStatement;
    deterministicSyntheticJoinStatement:
      SyntheticAuditApprovalJoinDeterministicStatement;
    inMemoryOnlyJoinStatement:
      SyntheticAuditApprovalJoinInMemoryOnlyStatement;
  } & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditApprovalJoinInputRecord = Readonly<{
  key: SyntheticAuditApprovalJoinInputKey;
  version: SyntheticAuditApprovalJoinInputVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  requestState: SyntheticAuditApprovalJoinRequestState;
  frontendRequestState: SyntheticAuditApprovalJoinFrontendRequestState;
  apiRouteState: SyntheticAuditApprovalJoinApiRouteState;
  resultCapturePayloadPosture: "deterministic synthetic capture fixture only";
  auditPayloadPosture: "preview-only";
  approvalPayloadPosture: "preview-only";
  providerPayloadPosture: "none";
  modelOutputPosture: "none";
  persistenceTargetPosture: "none";
  explicitNoFrontendRequestNoApiRouteNoPersistenceStatement:
    "No frontend request. No API route. No persistence.";
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditApprovalJoinAdmissionCheckRecord = Readonly<{
  key: SyntheticAuditApprovalJoinAdmissionCheckKey;
  version: SyntheticAuditApprovalJoinAdmissionCheckVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  admissionAccepted: "validated";
  backendOwnedModeState: "validated";
  serverOnlyModeState: "validated";
  syntheticJoinModeState: "validated";
  manualGatedModeState: "validated";
  syntheticResultCaptureState: "validated";
  auditPreviewState: "validated";
  approvalPreviewState: "validated";
  evidencePreviewState: "validated";
  manualApprovalFixtureState: "validated";
  manualConfirmationFixtureState: "validated";
  providerExecutionBlockedState: "validated";
  promptSendingBlockedState: "validated";
  modelCallsBlockedState: "validated";
  persistenceBlockedState: "validated";
  queueWorkerJobBlockedState: "validated";
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditJoinOutputRecord = Readonly<{
  key: SyntheticAuditJoinOutputKey;
  version: SyntheticAuditJoinOutputVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  sourceSyntheticResultCaptureId:
    SyntheticResultCaptureOutputRecord["syntheticCaptureId"];
  syntheticAuditJoinId: SyntheticAuditJoinId;
  syntheticJoinDigest: SyntheticAuditApprovalJoinDigest;
  joinState: SyntheticAuditApprovalJoinState;
  auditJoinState: SyntheticAuditJoinState;
  resultReference: SyntheticAuditApprovalJoinResultReference;
  auditReference: SyntheticAuditApprovalJoinAuditReference;
  auditReferenceState: SyntheticAuditApprovalJoinPreviewReferenceState;
  evidenceReference: SyntheticAuditApprovalJoinEvidenceReference;
  providerResponseState: SyntheticAuditApprovalJoinProviderResponseState;
  modelOutputState: SyntheticAuditApprovalJoinModelOutputState;
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticApprovalJoinOutputRecord = Readonly<{
  key: SyntheticApprovalJoinOutputKey;
  version: SyntheticApprovalJoinOutputVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  sourceSyntheticResultCaptureId:
    SyntheticResultCaptureOutputRecord["syntheticCaptureId"];
  syntheticApprovalJoinId: SyntheticApprovalJoinId;
  syntheticJoinDigest: SyntheticAuditApprovalJoinDigest;
  joinState: SyntheticAuditApprovalJoinState;
  approvalJoinState: SyntheticApprovalJoinState;
  resultReference: SyntheticAuditApprovalJoinResultReference;
  approvalReference: SyntheticAuditApprovalJoinApprovalReference;
  approvalReferenceState: SyntheticAuditApprovalJoinPreviewReferenceState;
  evidenceReference: SyntheticAuditApprovalJoinEvidenceReference;
  providerResponseState: SyntheticAuditApprovalJoinProviderResponseState;
  modelOutputState: SyntheticAuditApprovalJoinModelOutputState;
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditApprovalJoinEnvelopeRecord = Readonly<{
  key: SyntheticAuditApprovalJoinEnvelopeKey;
  version: SyntheticAuditApprovalJoinEnvelopeVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  requestReference: SyntheticAuditApprovalJoinRequestKey;
  responseReference: SyntheticAuditApprovalJoinResponseKey;
  errorReference: SyntheticAuditApprovalJoinErrorKey;
  auditJoinOutputReference: SyntheticAuditJoinOutputKey;
  approvalJoinOutputReference: SyntheticApprovalJoinOutputKey;
  resultReference: SyntheticAuditApprovalJoinResultReference;
  auditReference: SyntheticAuditApprovalJoinAuditReference;
  approvalReference: SyntheticAuditApprovalJoinApprovalReference;
  evidenceReference: SyntheticAuditApprovalJoinEvidenceReference;
  joinState: SyntheticAuditApprovalJoinState;
  providerResponseState: SyntheticAuditApprovalJoinProviderResponseState;
  modelOutputState: SyntheticAuditApprovalJoinModelOutputState;
  resultPersistenceState: SyntheticAuditApprovalJoinPersistenceState;
  auditPersistenceState: SyntheticAuditApprovalJoinPersistenceState;
  approvalPersistenceState: SyntheticAuditApprovalJoinPersistenceState;
  databaseWriteState: SyntheticAuditApprovalJoinPersistenceState;
  fileWriteState: SyntheticAuditApprovalJoinPersistenceState;
  explicitSyntheticJoinOnlyNoProviderOutputNoPersistenceStatement:
    SyntheticAuditApprovalJoinResponseStatement;
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditJoinPreviewRecord = Readonly<{
  key: SyntheticAuditJoinPreviewKey;
  version: SyntheticAuditJoinPreviewVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  auditReference: SyntheticAuditApprovalJoinAuditReference;
  auditPreviewState: SyntheticAuditApprovalJoinPreviewReferenceState;
  approvalFixtureState: SyntheticAuditApprovalJoinApprovalFixtureState;
  manualConfirmationFixtureState:
    SyntheticAuditApprovalJoinManualConfirmationFixtureState;
  explicitNoAuditPersistenceStatement: "no audit persistence";
  auditEvidenceSummary: string;
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticApprovalJoinPreviewRecord = Readonly<{
  key: SyntheticApprovalJoinPreviewKey;
  version: SyntheticApprovalJoinPreviewVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  approvalReference: SyntheticAuditApprovalJoinApprovalReference;
  approvalPreviewState: SyntheticAuditApprovalJoinPreviewReferenceState;
  approvalFixtureState: SyntheticAuditApprovalJoinApprovalFixtureState;
  manualConfirmationFixtureState:
    SyntheticAuditApprovalJoinManualConfirmationFixtureState;
  explicitNoApprovalPersistenceStatement: "no approval persistence";
  approvalEvidenceSummary: string;
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditApprovalEvidencePacketRecord = Readonly<{
  key: SyntheticAuditApprovalEvidencePacketKey;
  version: SyntheticAuditApprovalEvidencePacketVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  evidenceReference: SyntheticAuditApprovalJoinEvidenceReference;
  evidencePacketState: SyntheticAuditApprovalJoinEvidencePacketState;
  syntheticJoinDigest: SyntheticAuditApprovalJoinDigest;
  sourceResultReference: SyntheticAuditApprovalJoinResultReference;
  sourceAuditReference: SyntheticAuditApprovalJoinAuditReference;
  sourceApprovalReference: SyntheticAuditApprovalJoinApprovalReference;
  evidenceSummaryLines: readonly string[];
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditApprovalJoinSafetyGateSummaryRecord = Readonly<{
  key: SyntheticAuditApprovalJoinSafetyGateSummaryKey;
  version: SyntheticAuditApprovalJoinSafetyGateSummaryVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  currentReadiness: SyntheticAuditApprovalJoinCurrentReadiness;
  serverOnlyHelperStatement:
    SyntheticAuditApprovalJoinServerOnlyHelperStatement;
  deterministicSyntheticJoinStatement:
    SyntheticAuditApprovalJoinDeterministicStatement;
  inMemoryOnlyJoinStatement:
    SyntheticAuditApprovalJoinInMemoryOnlyStatement;
  noFrontendRequestStatement:
    SyntheticAuditApprovalJoinNoFrontendRequestStatement;
  noApiRouteStatement: SyntheticAuditApprovalJoinNoApiRouteStatement;
  summaryLines: readonly string[];
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryRecord =
  Readonly<{
    key: SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryKey;
    version:
      SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryVersion;
    auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
    currentReadiness: SyntheticAuditApprovalJoinCurrentReadiness;
    noRealApprovalRequestStatement:
      SyntheticAuditApprovalJoinNoRealApprovalRequestStatement;
    noRealApprovalRecordingStatement:
      SyntheticAuditApprovalJoinNoRealApprovalRecordingStatement;
    approvalFixtureStatement:
      SyntheticAuditApprovalJoinApprovalFixtureStatement;
    manualConfirmationFixtureStatement:
      SyntheticAuditApprovalJoinManualConfirmationStatement;
    approvalTokenStatement:
      SyntheticAuditApprovalJoinApprovalTokenStatement;
    approvalLeaseStatement:
      SyntheticAuditApprovalJoinApprovalLeaseStatement;
    blockedLiveActions: readonly string[];
  } & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditApprovalJoinRequestRecord = Readonly<{
  key: SyntheticAuditApprovalJoinRequestKey;
  version: SyntheticAuditApprovalJoinRequestVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  requestState: SyntheticAuditApprovalJoinRequestState;
  frontendRequestState: SyntheticAuditApprovalJoinFrontendRequestState;
  apiRouteState: SyntheticAuditApprovalJoinApiRouteState;
  resultCapturePayloadPosture: "deterministic synthetic capture fixture only";
  auditPayloadPosture: "preview-only";
  approvalPayloadPosture: "preview-only";
  providerPayloadPosture: "none";
  modelOutputPosture: "none";
  persistenceTargetPosture: "none";
  explicitNoFrontendRequestNoApiRouteNoPersistenceStatement:
    "No frontend request. No API route. No persistence.";
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditApprovalJoinResponseRecord = Readonly<{
  key: SyntheticAuditApprovalJoinResponseKey;
  version: SyntheticAuditApprovalJoinResponseVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  responseState: SyntheticAuditApprovalJoinResponseState;
  joinState: SyntheticAuditApprovalJoinState;
  auditJoinState: SyntheticAuditJoinState;
  approvalJoinState: SyntheticApprovalJoinState;
  providerResponseState: SyntheticAuditApprovalJoinProviderResponseState;
  modelOutputState: SyntheticAuditApprovalJoinModelOutputState;
  resultPersistenceState: SyntheticAuditApprovalJoinPersistenceState;
  auditPersistenceState: SyntheticAuditApprovalJoinPersistenceState;
  approvalPersistenceState: SyntheticAuditApprovalJoinPersistenceState;
  databaseWriteState: SyntheticAuditApprovalJoinPersistenceState;
  fileWriteState: SyntheticAuditApprovalJoinPersistenceState;
  explicitSyntheticJoinOnlyNoProviderOutputNoPersistenceStatement:
    SyntheticAuditApprovalJoinResponseStatement;
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditApprovalJoinErrorRecord = Readonly<{
  key: SyntheticAuditApprovalJoinErrorKey;
  version: SyntheticAuditApprovalJoinErrorVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  errorState: SyntheticAuditApprovalJoinErrorState;
  failedGateExamples: readonly SyntheticAuditApprovalJoinGateId[];
  missingSyntheticResultCaptureExample:
    "Synthetic result capture output is required.";
  missingAuditPreviewExample: "Synthetic audit preview is required.";
  missingApprovalPreviewExample: "Synthetic approval preview is required.";
  missingManualApprovalFixtureExample:
    "Manual approval fixture must remain preview-only.";
  providerResponseDetectedExample:
    "Provider response detected in synthetic join input.";
  modelOutputDetectedExample:
    "Model output detected in synthetic join input.";
  promptSentDetectedExample:
    "Prompt sending detected in synthetic join input.";
  persistenceAttemptedExample:
    "Persistence target detected in synthetic join input.";
  databaseWriteAttemptedExample:
    "Database write target detected in synthetic join input.";
  fileWriteAttemptedExample:
    "File write target detected in synthetic join input.";
  queueWorkerJobAttemptedExample:
    "Queue, worker, or job execution detected in synthetic join input.";
  retryPosture: SyntheticAuditApprovalJoinRetryPosture;
  fallbackPosture: SyntheticAuditApprovalJoinFallbackPosture;
  explicitNoLiveErrorNoRetryNoFallbackStatement:
    SyntheticAuditApprovalJoinErrorStatement;
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditApprovalJoinGateRecord = Readonly<{
  id: SyntheticAuditApprovalJoinGateId;
  key: `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-gate:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}:${SyntheticAuditApprovalJoinGateId}`;
  version: SyntheticAuditApprovalJoinGateVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type SyntheticAuditApprovalJoinReadinessMatrixRecord = Readonly<{
  id: SyntheticAuditApprovalJoinReadinessMatrixId;
  key: `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-readiness:${MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId}:${SyntheticAuditApprovalJoinReadinessMatrixId}`;
  version: SyntheticAuditApprovalJoinReadinessMatrixVersion;
  auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
  label: string;
  state: string;
  evidence: string;
  nextSafeAction: string;
  currentReadiness: SyntheticAuditApprovalJoinCurrentReadiness;
} & SyntheticAuditApprovalJoinCommonRecordFields>;

export type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpCapabilityFamilyGroup =
  Readonly<{
    capabilityFamilyId:
      MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["selectedCapabilityFamily"]["id"];
    capabilityFamilyLabel:
      MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["selectedCapabilityFamily"]["label"];
    joinCount: number;
  }>;

export type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpWorkspaceGroup =
  Readonly<{
    workspaceTarget:
      MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["workspaceTarget"];
    joinCount: number;
  }>;

export type SyntheticAuditApprovalJoinSummary = Readonly<{
  version: SyntheticAuditApprovalJoinSummaryVersion;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_PHASE;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  currentReadiness: SyntheticAuditApprovalJoinCurrentReadiness;
  recordCount: number;
  summaryLines: readonly string[];
}>;

export type SyntheticAuditApprovalJoinGateSummary = Readonly<{
  version: SyntheticAuditApprovalJoinGateSummaryVersion;
  gateCount: number;
  currentReadiness: SyntheticAuditApprovalJoinCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type SyntheticAuditApprovalJoinReadinessSummary = Readonly<{
  version: SyntheticAuditApprovalJoinReadinessSummaryVersion;
  readinessCount: number;
  currentReadiness: SyntheticAuditApprovalJoinCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRunInput =
  Readonly<{
    auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
    backendOwnedMode: SyntheticAuditApprovalJoinBackendOwnedPosture;
    serverOnlyMode: SyntheticAuditApprovalJoinServerOnlyPosture;
    syntheticJoinMode: SyntheticAuditApprovalJoinSyntheticOnlyPosture;
    manualGatedMode: SyntheticAuditApprovalJoinManualGatedPosture;
    syntheticResultCaptureOutput: SyntheticResultCaptureOutputRecord;
    syntheticAuditPreview: SyntheticResultCaptureAuditPreviewRecord;
    syntheticApprovalPreview: SyntheticResultCaptureApprovalPreviewRecord;
    syntheticEvidencePacket: SyntheticResultCaptureEvidencePacketRecord;
    manualApprovalFixture: SyntheticMvpManualApprovalFixtureRecord;
    approvalRecordingState: SyntheticAuditApprovalJoinApprovalRecordingState;
    approvalTokenState: SyntheticAuditApprovalJoinApprovalTokenState;
    approvalLeaseState: SyntheticAuditApprovalJoinApprovalLeaseState;
    providerResponseState: SyntheticAuditApprovalJoinProviderResponseState;
    modelOutputState: SyntheticAuditApprovalJoinModelOutputState;
    promptState: SyntheticAuditApprovalJoinPromptState;
    frontendRequestState: SyntheticAuditApprovalJoinFrontendRequestState;
    apiRouteState: SyntheticAuditApprovalJoinApiRouteState;
    persistenceTargetState: SyntheticAuditApprovalJoinPersistenceTargetState;
    databaseWriteTargetState:
      SyntheticAuditApprovalJoinDatabaseWriteTargetState;
    fileWriteTargetState: SyntheticAuditApprovalJoinFileWriteTargetState;
    queueDispatchState: SyntheticAuditApprovalJoinDispatchState;
    workerDispatchState: SyntheticAuditApprovalJoinDispatchState;
    jobExecutionState: SyntheticAuditApprovalJoinDispatchState;
    providerSdkImportState: SyntheticAuditApprovalJoinProviderSdkImportState;
    providerExecutionState: SyntheticAuditApprovalJoinDispatchState;
  }>;

export type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpServerRunRecord =
  Readonly<{
    auditApprovalJoinMvpId: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId;
    requestLabel:
      MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord["requestLabel"];
    sourceSyntheticResultCaptureOutputReference: SyntheticResultCaptureOutputKey;
    sourceSyntheticAuditPreviewReference: SyntheticResultCaptureAuditPreviewKey;
    sourceSyntheticApprovalPreviewReference:
      SyntheticResultCaptureApprovalPreviewKey;
    sourceSyntheticEvidencePacketReference:
      SyntheticResultCaptureEvidencePacketKey;
    sourceManualApprovalFixtureReference: SyntheticMvpManualApprovalFixtureKey;
    joinState: SyntheticAuditApprovalJoinState;
    auditJoinState: SyntheticAuditJoinState;
    approvalJoinState: SyntheticApprovalJoinState;
    syntheticResultCaptureId:
      SyntheticResultCaptureOutputRecord["syntheticCaptureId"];
    syntheticAuditJoinId: SyntheticAuditJoinId;
    syntheticApprovalJoinId: SyntheticApprovalJoinId;
    syntheticJoinDigest: SyntheticAuditApprovalJoinDigest;
    resultReference: SyntheticAuditApprovalJoinResultReference;
    auditReference: SyntheticAuditApprovalJoinAuditReference;
    approvalReference: SyntheticAuditApprovalJoinApprovalReference;
    evidencePacketReference: SyntheticAuditApprovalJoinEvidenceReference;
    joinPayload: SyntheticAuditApprovalJoinPayload;
    joinTimestampPosture: SyntheticAuditApprovalJoinTimestampPosture;
    persistenceState: SyntheticAuditApprovalJoinPersistenceState;
    currentReadiness: SyntheticAuditApprovalJoinCurrentReadiness;
    serverOnlyHelperStatement:
      SyntheticAuditApprovalJoinServerOnlyHelperStatement;
    deterministicSyntheticJoinStatement:
      SyntheticAuditApprovalJoinDeterministicStatement;
    inMemoryOnlyJoinStatement:
      SyntheticAuditApprovalJoinInMemoryOnlyStatement;
    noFrontendRequestStatement:
      SyntheticAuditApprovalJoinNoFrontendRequestStatement;
    noApiRouteStatement: SyntheticAuditApprovalJoinNoApiRouteStatement;
    nextAuditApprovalJoinReviewRecoveryChecklist: readonly string[];
  }>;
