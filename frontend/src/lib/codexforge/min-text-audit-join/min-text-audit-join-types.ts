import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  SyntheticMvpManualApprovalFixtureKey,
  SyntheticMvpManualApprovalFixtureRecord,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import type {
  BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord,
  TextAdapterResultCaptureOutputReviewKey,
  TextAdapterResultCaptureOutputReviewRecord,
} from "../min-text-capture-review";
import type {
  MinimalTextAdapterResultCaptureMvpId,
  MinimalTextAdapterResultCaptureMvpKey,
  MinimalTextAdapterResultCaptureMvpRecord,
  TextAdapterCapturedFixtureResultOutputKey,
  TextAdapterCapturedFixtureResultOutputRecord,
  TextAdapterResultCaptureApprovalPreviewKey as SourceTextAdapterResultCaptureApprovalPreviewKey,
  TextAdapterResultCaptureApprovalPreviewRecord as SourceTextAdapterResultCaptureApprovalPreviewRecord,
  TextAdapterResultCaptureAuditPreviewKey as SourceTextAdapterResultCaptureAuditPreviewKey,
  TextAdapterResultCaptureAuditPreviewRecord as SourceTextAdapterResultCaptureAuditPreviewRecord,
  TextAdapterResultCaptureEnvelopeKey,
  TextAdapterResultCaptureEvidencePreviewKey as SourceTextAdapterResultCaptureEvidencePreviewKey,
  TextAdapterResultCaptureEvidencePreviewRecord as SourceTextAdapterResultCaptureEvidencePreviewRecord,
  TextAdapterResultCaptureInputKey,
  TextAdapterResultCapturePreviewId,
} from "../min-text-capture";
import type {
  BackendOwnedMinimalManualGatedTextAdapterReviewRecord,
  MinimalTextAdapterOutputReviewKey,
} from "../min-text-adapter-review";
import type {
  TextAdapterRedactedPromptEnvelopeKey,
  TextAdapterRedactedPromptEnvelopeRecord,
} from "../min-text-adapter";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH =
  "5770-5801 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_PHASE =
  5801;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5802-5833 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join Review and Recovery Preview";

export const MINIMAL_TEXT_ADAPTER_AUDIT_APPROVAL_JOIN_SECTION_TITLES = [
  "Backend-owned minimal manual-gated text model adapter audit and approval join MVP",
  "Text adapter audit and approval join input",
  "Text adapter audit join output",
  "Text adapter approval join output",
  "Text adapter audit and approval join envelope",
  "Text adapter audit and approval join gates",
  "Text adapter audit and approval join readiness matrix",
  "Text adapter audit and approval join evidence preview",
] as const;

export type MinimalTextAdapterAuditApprovalJoinMvpId =
  MinimalTextAdapterResultCaptureMvpId;
export type MinimalTextAdapterAuditApprovalJoinSectionTitle =
  (typeof MINIMAL_TEXT_ADAPTER_AUDIT_APPROVAL_JOIN_SECTION_TITLES)[number];

export type MinimalTextAdapterAuditApprovalJoinCapabilityFamilyLabel =
  MinimalTextAdapterResultCaptureMvpRecord["capabilityFamily"];
export type MinimalTextAdapterAuditApprovalJoinWorkspaceTarget =
  MinimalTextAdapterResultCaptureMvpRecord["workspaceTarget"];
export type MinimalTextAdapterAuditApprovalJoinProviderSlotLabel =
  MinimalTextAdapterResultCaptureMvpRecord["providerSlotLabel"];
export type MinimalTextAdapterAuditApprovalJoinBackupProviderSlotLabel =
  MinimalTextAdapterResultCaptureMvpRecord["backupProviderSlotLabel"];
export type MinimalTextAdapterAuditApprovalJoinLocalPrivateAlternativeLabel =
  MinimalTextAdapterResultCaptureMvpRecord["localPrivateAlternativeLabel"];

export type MinimalTextAdapterAuditApprovalJoinMvpVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-mvp-v1";
export type TextAdapterAuditApprovalJoinInputVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-input-v1";
export type TextAdapterAuditApprovalJoinAdmissionCheckVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-admission-check-v1";
export type TextAdapterAuditJoinOutputVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-join-output-v1";
export type TextAdapterApprovalJoinOutputVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-approval-join-output-v1";
export type TextAdapterAuditApprovalJoinEnvelopeVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-envelope-v1";
export type TextAdapterAuditPreviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-preview-v1";
export type TextAdapterApprovalPreviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-approval-preview-v1";
export type TextAdapterAuditApprovalEvidencePreviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-evidence-preview-v1";
export type TextAdapterAuditApprovalJoinSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-safety-gate-summary-v1";
export type TextAdapterAuditApprovalJoinBlockedLivePersistenceSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-blocked-live-persistence-summary-v1";
export type TextAdapterAuditApprovalJoinRequestVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-request-v1";
export type TextAdapterAuditApprovalJoinResponseVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-response-v1";
export type TextAdapterAuditApprovalJoinErrorVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-error-v1";
export type TextAdapterAuditApprovalJoinGateVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-gate-v1";
export type TextAdapterAuditApprovalJoinReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-readiness-matrix-v1";
export type TextAdapterAuditApprovalJoinSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-summary-v1";
export type TextAdapterAuditApprovalJoinGateSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-gate-summary-v1";
export type TextAdapterAuditApprovalJoinReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-readiness-summary-v1";

export type TextAdapterAuditApprovalJoinBackendOwnedPosture = "backend-owned";
export type TextAdapterAuditApprovalJoinServerOnlyPosture = "server-only";
export type TextAdapterAuditApprovalJoinPosture = "audit-approval-join";
export type TextAdapterAuditApprovalJoinManualGatedPosture = "manual-gated";
export type TextAdapterAuditApprovalJoinFixtureOnlyPosture = "fixture-only";
export type TextAdapterAuditApprovalJoinInMemoryOnlyPosture =
  "in-memory-only";
export type TextAdapterAuditApprovalJoinNoProviderExecution =
  "no provider execution";
export type TextAdapterAuditApprovalJoinNoModelCalls = "no model calls";
export type TextAdapterAuditApprovalJoinNoPromptSending =
  "no prompt sending";
export type TextAdapterAuditApprovalJoinNoFrontendRequest =
  "no frontend request";
export type TextAdapterAuditApprovalJoinNoApiRoute = "no API route";
export type TextAdapterAuditApprovalJoinNoQueueWorkerJobDispatch =
  "no queue/worker/job dispatch";
export type TextAdapterAuditApprovalJoinNoPersistence = "no persistence";
export type TextAdapterAuditApprovalJoinNoDatabaseWrites =
  "no database writes";
export type TextAdapterAuditApprovalJoinNoFileWrites = "no file writes";
export type TextAdapterAuditApprovalJoinNoResultPersistence =
  "no result persistence";
export type TextAdapterAuditApprovalJoinNoAuditPersistence =
  "no audit persistence";
export type TextAdapterAuditApprovalJoinNoApprovalPersistence =
  "no approval persistence";
export type TextAdapterAuditApprovalJoinNoApprovalRecording =
  "no approval recording";
export type TextAdapterAuditApprovalJoinNoApprovalTokenIssuance =
  "no approval token issuance";
export type TextAdapterAuditApprovalJoinNoApprovalLeaseIssuance =
  "no approval lease issuance";
export type TextAdapterAuditApprovalJoinCurrentReadiness =
  "minimal-text-adapter-audit-approval-join-mvp-only / backend-only / fixture-only / in-memory-only / not persistent";

export type TextAdapterAuditApprovalJoinState =
  "joined-text-adapter-fixture-in-memory-only";
export type TextAdapterAuditJoinState =
  "deterministic audit join in memory only";
export type TextAdapterApprovalJoinState =
  "deterministic approval join in memory only";
export type TextAdapterAuditApprovalJoinPersistenceState =
  "not implemented";
export type TextAdapterAuditApprovalJoinProviderResponseState =
  "not received";
export type TextAdapterAuditApprovalJoinModelOutputState =
  "not generated";
export type TextAdapterAuditApprovalJoinPromptTransmissionState =
  "not sent";
export type TextAdapterAuditApprovalJoinProviderSdkImportState =
  "not imported";
export type TextAdapterAuditApprovalJoinFrontendRequestState =
  "not created";
export type TextAdapterAuditApprovalJoinApiRouteState = "not created";
export type TextAdapterAuditApprovalJoinPersistenceTargetPosture = "none";
export type TextAdapterAuditApprovalJoinDatabaseWriteTargetState = "none";
export type TextAdapterAuditApprovalJoinFileWriteTargetState = "none";
export type TextAdapterAuditApprovalJoinDispatchState = "blocked";
export type TextAdapterAuditApprovalJoinProviderCallState = "blocked";
export type TextAdapterAuditApprovalJoinModelCallState = "blocked";
export type TextAdapterAuditApprovalJoinApprovalFixtureState =
  "preview-only";
export type TextAdapterAuditApprovalJoinManualConfirmationFixtureState =
  "preview-only";
export type TextAdapterAuditApprovalJoinApprovalRecordingState =
  "not recorded";
export type TextAdapterAuditApprovalJoinApprovalTokenState = "not issued";
export type TextAdapterAuditApprovalJoinApprovalLeaseState = "not created";
export type TextAdapterAuditApprovalJoinTimestampPosture =
  "static fixture label only / no real timestamp";
export type TextAdapterAuditApprovalJoinRetryPosture = "disabled";
export type TextAdapterAuditApprovalJoinFallbackPosture = "disabled";
export type TextAdapterAuditApprovalJoinDeterministicStatement =
  "deterministic text adapter audit and approval join only";
export type TextAdapterAuditApprovalJoinInMemoryOnlyStatement =
  "text adapter audit and approval join is produced in memory only";
export type TextAdapterAuditApprovalJoinServerOnlyHelperStatement =
  "server-only text adapter audit and approval join helper exists";
export type TextAdapterAuditApprovalJoinNoFrontendRequestStatement =
  "no frontend request is created";
export type TextAdapterAuditApprovalJoinNoApiRouteStatement =
  "no API route is created";
export type TextAdapterAuditApprovalJoinNoRealApprovalRequestStatement =
  "no real approval request";
export type TextAdapterAuditApprovalJoinNoRealApprovalRecordingStatement =
  "no real approval recording";
export type TextAdapterAuditApprovalJoinApprovalFixtureStatement =
  "approval fixture is preview-only";
export type TextAdapterAuditApprovalJoinManualConfirmationStatement =
  "manual confirmation fixture is preview-only";
export type TextAdapterAuditApprovalJoinApprovalTokenStatement =
  "approval token is not issued";
export type TextAdapterAuditApprovalJoinApprovalLeaseStatement =
  "approval lease is not created";
export type TextAdapterAuditApprovalJoinRequestState =
  "deterministic text adapter audit approval join request only";
export type TextAdapterAuditApprovalJoinResponseState =
  "returned by server-only smoke/helper only";
export type TextAdapterAuditApprovalJoinErrorState =
  "deterministic preview only";
export type TextAdapterAuditApprovalJoinPreviewReferenceState =
  "preview-only / not persisted";
export type TextAdapterAuditApprovalJoinRedactedPromptPosture =
  "preview-only / not sent";
export type TextAdapterAuditApprovalJoinFixtureResponsePosture =
  "deterministic fixture result only";
export type TextAdapterAuditApprovalJoinAuditPayloadPosture =
  "preview-only";
export type TextAdapterAuditApprovalJoinApprovalPayloadPosture =
  "preview-only";
export type TextAdapterAuditApprovalJoinProviderPayloadPosture = "none";
export type TextAdapterAuditApprovalJoinModelOutputPosture = "none";
export type TextAdapterAuditApprovalJoinResponseStatement =
  "Text adapter audit and approval join only. No provider output. No persistence.";
export type TextAdapterAuditApprovalJoinErrorStatement =
  "No live error. No retry. No fallback.";
export type TextAdapterAuditApprovalJoinNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement =
  "No frontend request. No API route. No provider call. No persistence.";

export type TextAdapterAuditJoinId =
  `text-adapter-audit-join-preview:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterApprovalJoinId =
  `text-adapter-approval-join-preview:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinDigest =
  `text-adapter-audit-approval-join-digest-preview:${MinimalTextAdapterAuditApprovalJoinMvpId}:in-memory-only`;
export type TextAdapterAuditApprovalJoinResultReference =
  `text-adapter-audit-approval-join-result-reference-preview:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinAuditReference =
  `text-adapter-audit-approval-join-audit-reference-preview:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinApprovalReference =
  `text-adapter-audit-approval-join-approval-reference-preview:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinEvidenceReference =
  `text-adapter-audit-approval-join-evidence-reference-preview:${MinimalTextAdapterAuditApprovalJoinMvpId}`;

export type MinimalTextAdapterAuditApprovalJoinMvpKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-mvp:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinInputKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-input:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinAdmissionCheckKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-admission-check:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditJoinOutputKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-join-output:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterApprovalJoinOutputKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-approval-join-output:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinEnvelopeKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-envelope:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditPreviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-preview:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterApprovalPreviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-approval-preview:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalEvidencePreviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-evidence-preview:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-safety-gate-summary:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinBlockedLivePersistenceSummaryKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-blocked-live-persistence-summary:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinRequestKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-request:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinResponseKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-response:${MinimalTextAdapterAuditApprovalJoinMvpId}`;
export type TextAdapterAuditApprovalJoinErrorKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-error:${MinimalTextAdapterAuditApprovalJoinMvpId}`;

export type TextAdapterAuditApprovalJoinGateId =
  | "backend-only-boundary"
  | "server-only-join-module-boundary"
  | "text-adapter-fixture-audit-approval-join-mode"
  | "minimal-text-adapter-result-capture-review-dependency"
  | "captured-fixture-result-present"
  | "redacted-prompt-envelope-present"
  | "prompt-not-sent"
  | "provider-sdk-not-imported"
  | "provider-response-not-received"
  | "model-output-not-generated"
  | "manual-approval-fixture"
  | "manual-confirmation-fixture"
  | "deterministic-adapter-id"
  | "deterministic-result-capture-id"
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
  | "privacy-redaction-preview"
  | "kill-switch-fixture";

export type TextAdapterAuditApprovalJoinReadinessMatrixId =
  | "server-only-audit-approval-join-helper-state"
  | "minimal-text-adapter-result-capture-review-dependency"
  | "text-adapter-captured-fixture-result-dependency"
  | "redacted-prompt-envelope-dependency"
  | "audit-and-approval-join-input-state"
  | "join-admission-check-state"
  | "audit-join-output-state"
  | "approval-join-output-state"
  | "join-envelope-state"
  | "evidence-preview-state"
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

export type TextAdapterAuditApprovalJoinCommonRecordFields = Readonly<{
  stableId: MinimalTextAdapterAuditApprovalJoinMvpId;
  capabilityFamily: MinimalTextAdapterAuditApprovalJoinCapabilityFamilyLabel;
  workspaceTarget: MinimalTextAdapterAuditApprovalJoinWorkspaceTarget;
  providerSlotLabel: MinimalTextAdapterAuditApprovalJoinProviderSlotLabel;
  backupProviderSlotLabel:
    MinimalTextAdapterAuditApprovalJoinBackupProviderSlotLabel;
  localPrivateAlternativeLabel:
    MinimalTextAdapterAuditApprovalJoinLocalPrivateAlternativeLabel;
  sourceMinimalTextAdapterResultCaptureMvpReference:
    MinimalTextAdapterResultCaptureMvpKey;
  sourceMinimalTextAdapterResultCaptureReviewReference:
    BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord["key"];
  sourceTextAdapterCapturedFixtureResultOutputReference:
    TextAdapterCapturedFixtureResultOutputKey;
  sourceTextAdapterResultCaptureOutputReviewReference:
    TextAdapterResultCaptureOutputReviewKey;
  sourceTextAdapterResultCaptureAuditPreviewReference:
    SourceTextAdapterResultCaptureAuditPreviewKey;
  sourceTextAdapterResultCaptureApprovalPreviewReference:
    SourceTextAdapterResultCaptureApprovalPreviewKey;
  sourceTextAdapterResultCaptureEvidencePreviewReference:
    SourceTextAdapterResultCaptureEvidencePreviewKey;
  sourceTextAdapterRedactedPromptEnvelopeReference:
    TextAdapterRedactedPromptEnvelopeKey;
  sourceMinimalTextAdapterReviewReference:
    BackendOwnedMinimalManualGatedTextAdapterReviewRecord["key"];
  sourceManualApprovalDecisionReviewReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
  sourceManualApprovalFixtureReference: SyntheticMvpManualApprovalFixtureKey;
  sourceManualConfirmationFixtureReference:
    SyntheticMvpManualApprovalFixtureKey;
  backendOwnedPosture: TextAdapterAuditApprovalJoinBackendOwnedPosture;
  serverOnlyPosture: TextAdapterAuditApprovalJoinServerOnlyPosture;
  auditApprovalJoinPosture: TextAdapterAuditApprovalJoinPosture;
  manualGatedPosture: TextAdapterAuditApprovalJoinManualGatedPosture;
  fixtureOnlyPosture: TextAdapterAuditApprovalJoinFixtureOnlyPosture;
  inMemoryOnlyPosture: TextAdapterAuditApprovalJoinInMemoryOnlyPosture;
  noProviderExecution: TextAdapterAuditApprovalJoinNoProviderExecution;
  noModelCalls: TextAdapterAuditApprovalJoinNoModelCalls;
  noPromptSending: TextAdapterAuditApprovalJoinNoPromptSending;
  noFrontendRequest: TextAdapterAuditApprovalJoinNoFrontendRequest;
  noApiRoute: TextAdapterAuditApprovalJoinNoApiRoute;
  noQueueWorkerJobDispatch:
    TextAdapterAuditApprovalJoinNoQueueWorkerJobDispatch;
  noPersistence: TextAdapterAuditApprovalJoinNoPersistence;
  noDatabaseWrites: TextAdapterAuditApprovalJoinNoDatabaseWrites;
  noFileWrites: TextAdapterAuditApprovalJoinNoFileWrites;
  noResultPersistence: TextAdapterAuditApprovalJoinNoResultPersistence;
  noAuditPersistence: TextAdapterAuditApprovalJoinNoAuditPersistence;
  noApprovalPersistence: TextAdapterAuditApprovalJoinNoApprovalPersistence;
  noApprovalRecording: TextAdapterAuditApprovalJoinNoApprovalRecording;
  noApprovalTokenIssuance:
    TextAdapterAuditApprovalJoinNoApprovalTokenIssuance;
  noApprovalLeaseIssuance:
    TextAdapterAuditApprovalJoinNoApprovalLeaseIssuance;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type MinimalTextAdapterAuditApprovalJoinMvpRecord = Readonly<{
  key: MinimalTextAdapterAuditApprovalJoinMvpKey;
  version: MinimalTextAdapterAuditApprovalJoinMvpVersion;
  label: "Backend-owned minimal manual-gated text model adapter audit and approval join MVP";
  requestLabel: MinimalTextAdapterResultCaptureMvpRecord["requestLabel"];
  joinState: TextAdapterAuditApprovalJoinState;
  textAdapterId: MinimalTextAdapterResultCaptureMvpRecord["textAdapterId"];
  resultCaptureId: TextAdapterResultCapturePreviewId;
  auditJoinId: TextAdapterAuditJoinId;
  approvalJoinId: TextAdapterApprovalJoinId;
  joinDigest: TextAdapterAuditApprovalJoinDigest;
  redactedPromptReference: TextAdapterRedactedPromptEnvelopeKey;
  capturedFixtureResponseReference:
    TextAdapterCapturedFixtureResultOutputKey;
  resultReference: TextAdapterAuditApprovalJoinResultReference;
  auditReference: TextAdapterAuditApprovalJoinAuditReference;
  approvalReference: TextAdapterAuditApprovalJoinApprovalReference;
  evidencePreviewReference: TextAdapterAuditApprovalJoinEvidenceReference;
  providerResponseState: TextAdapterAuditApprovalJoinProviderResponseState;
  modelOutputState: TextAdapterAuditApprovalJoinModelOutputState;
  timestampPosture: TextAdapterAuditApprovalJoinTimestampPosture;
  persistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  currentReadiness: TextAdapterAuditApprovalJoinCurrentReadiness;
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalJoinInputRecord = Readonly<{
  key: TextAdapterAuditApprovalJoinInputKey;
  version: TextAdapterAuditApprovalJoinInputVersion;
  sourceTextAdapterResultCaptureInputReference: TextAdapterResultCaptureInputKey;
  requestState: TextAdapterAuditApprovalJoinRequestState;
  frontendRequestState: TextAdapterAuditApprovalJoinFrontendRequestState;
  apiRouteState: TextAdapterAuditApprovalJoinApiRouteState;
  redactedPromptPosture: TextAdapterAuditApprovalJoinRedactedPromptPosture;
  capturedFixtureResponsePosture:
    TextAdapterAuditApprovalJoinFixtureResponsePosture;
  auditPayloadPosture: TextAdapterAuditApprovalJoinAuditPayloadPosture;
  approvalPayloadPosture:
    TextAdapterAuditApprovalJoinApprovalPayloadPosture;
  providerPayloadPosture:
    TextAdapterAuditApprovalJoinProviderPayloadPosture;
  modelOutputPosture: TextAdapterAuditApprovalJoinModelOutputPosture;
  persistenceTargetPosture:
    TextAdapterAuditApprovalJoinPersistenceTargetPosture;
  explicitNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement:
    TextAdapterAuditApprovalJoinNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement;
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalJoinAdmissionCheckRecord = Readonly<{
  key: TextAdapterAuditApprovalJoinAdmissionCheckKey;
  version: TextAdapterAuditApprovalJoinAdmissionCheckVersion;
  admissionState:
    "accepted / fixture-only / in-memory-only / persistence-blocked";
  backendOnlyCheck: "passed";
  serverOnlyCheck: "passed";
  manualGatedCheck: "passed";
  reviewDependencyCheck: "passed";
  captureDependencyCheck: "passed";
  promptBoundaryCheck: "passed";
  providerBoundaryCheck: "passed";
  approvalBoundaryCheck: "passed";
  persistenceBoundaryCheck: "blocked";
  nextSafeAction: string;
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditJoinOutputRecord = Readonly<{
  key: TextAdapterAuditJoinOutputKey;
  version: TextAdapterAuditJoinOutputVersion;
  joinState: TextAdapterAuditApprovalJoinState;
  auditJoinState: TextAdapterAuditJoinState;
  textAdapterId: MinimalTextAdapterResultCaptureMvpRecord["textAdapterId"];
  resultCaptureId: TextAdapterResultCapturePreviewId;
  auditJoinId: TextAdapterAuditJoinId;
  joinDigest: TextAdapterAuditApprovalJoinDigest;
  redactedPromptReference: TextAdapterRedactedPromptEnvelopeKey;
  capturedFixtureResponseReference:
    TextAdapterCapturedFixtureResultOutputKey;
  sourceTextAdapterAuditPreviewReference:
    SourceTextAdapterResultCaptureAuditPreviewKey;
  resultReference: TextAdapterAuditApprovalJoinResultReference;
  auditReference: TextAdapterAuditApprovalJoinAuditReference;
  evidencePreviewReference: TextAdapterAuditApprovalJoinEvidenceReference;
  providerResponseState: TextAdapterAuditApprovalJoinProviderResponseState;
  modelOutputState: TextAdapterAuditApprovalJoinModelOutputState;
  resultPersistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  auditPersistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  databaseWriteState: TextAdapterAuditApprovalJoinPersistenceState;
  fileWriteState: TextAdapterAuditApprovalJoinPersistenceState;
  timestampPosture: TextAdapterAuditApprovalJoinTimestampPosture;
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterApprovalJoinOutputRecord = Readonly<{
  key: TextAdapterApprovalJoinOutputKey;
  version: TextAdapterApprovalJoinOutputVersion;
  joinState: TextAdapterAuditApprovalJoinState;
  approvalJoinState: TextAdapterApprovalJoinState;
  textAdapterId: MinimalTextAdapterResultCaptureMvpRecord["textAdapterId"];
  resultCaptureId: TextAdapterResultCapturePreviewId;
  approvalJoinId: TextAdapterApprovalJoinId;
  joinDigest: TextAdapterAuditApprovalJoinDigest;
  redactedPromptReference: TextAdapterRedactedPromptEnvelopeKey;
  capturedFixtureResponseReference:
    TextAdapterCapturedFixtureResultOutputKey;
  sourceTextAdapterApprovalPreviewReference:
    SourceTextAdapterResultCaptureApprovalPreviewKey;
  resultReference: TextAdapterAuditApprovalJoinResultReference;
  approvalReference: TextAdapterAuditApprovalJoinApprovalReference;
  evidencePreviewReference: TextAdapterAuditApprovalJoinEvidenceReference;
  providerResponseState: TextAdapterAuditApprovalJoinProviderResponseState;
  modelOutputState: TextAdapterAuditApprovalJoinModelOutputState;
  approvalFixtureState: TextAdapterAuditApprovalJoinApprovalFixtureState;
  manualConfirmationFixtureState:
    TextAdapterAuditApprovalJoinManualConfirmationFixtureState;
  approvalTokenState: TextAdapterAuditApprovalJoinApprovalTokenState;
  approvalLeaseState: TextAdapterAuditApprovalJoinApprovalLeaseState;
  resultPersistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  approvalPersistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  databaseWriteState: TextAdapterAuditApprovalJoinPersistenceState;
  fileWriteState: TextAdapterAuditApprovalJoinPersistenceState;
  timestampPosture: TextAdapterAuditApprovalJoinTimestampPosture;
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalJoinEnvelopeRecord = Readonly<{
  key: TextAdapterAuditApprovalJoinEnvelopeKey;
  version: TextAdapterAuditApprovalJoinEnvelopeVersion;
  requestReference: TextAdapterAuditApprovalJoinRequestKey;
  responseReference: TextAdapterAuditApprovalJoinResponseKey;
  errorReference: TextAdapterAuditApprovalJoinErrorKey;
  inputReference: TextAdapterAuditApprovalJoinInputKey;
  resultCaptureEnvelopeReference: TextAdapterResultCaptureEnvelopeKey;
  auditJoinOutputReference: TextAdapterAuditJoinOutputKey;
  approvalJoinOutputReference: TextAdapterApprovalJoinOutputKey;
  auditPreviewReference: TextAdapterAuditPreviewKey;
  approvalPreviewReference: TextAdapterApprovalPreviewKey;
  evidencePreviewReference: TextAdapterAuditApprovalEvidencePreviewKey;
  joinState: TextAdapterAuditApprovalJoinState;
  auditJoinState: TextAdapterAuditJoinState;
  approvalJoinState: TextAdapterApprovalJoinState;
  providerResponseState: TextAdapterAuditApprovalJoinProviderResponseState;
  modelOutputState: TextAdapterAuditApprovalJoinModelOutputState;
  resultPersistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  auditPersistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  approvalPersistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  databaseWriteState: TextAdapterAuditApprovalJoinPersistenceState;
  fileWriteState: TextAdapterAuditApprovalJoinPersistenceState;
  explicitFixtureAuditApprovalJoinOnlyNoProviderOutputNoPersistenceStatement:
    TextAdapterAuditApprovalJoinResponseStatement;
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalEvidencePreviewRecord = Readonly<{
  key: TextAdapterAuditApprovalEvidencePreviewKey;
  version: TextAdapterAuditApprovalEvidencePreviewVersion;
  evidenceReference: TextAdapterAuditApprovalJoinEvidenceReference;
  evidencePreviewState: TextAdapterAuditApprovalJoinPreviewReferenceState;
  evidenceSummaryLines: readonly string[];
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditPreviewRecord = Readonly<{
  key: TextAdapterAuditPreviewKey;
  version: TextAdapterAuditPreviewVersion;
  sourceTextAdapterResultCaptureAuditPreviewReference:
    SourceTextAdapterResultCaptureAuditPreviewKey;
  auditReference: TextAdapterAuditApprovalJoinAuditReference;
  auditState: TextAdapterAuditApprovalJoinPreviewReferenceState;
  auditSummaryLines: readonly string[];
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterApprovalPreviewRecord = Readonly<{
  key: TextAdapterApprovalPreviewKey;
  version: TextAdapterApprovalPreviewVersion;
  sourceTextAdapterResultCaptureApprovalPreviewReference:
    SourceTextAdapterResultCaptureApprovalPreviewKey;
  approvalReference: TextAdapterAuditApprovalJoinApprovalReference;
  approvalState: TextAdapterAuditApprovalJoinPreviewReferenceState;
  approvalFixtureState: TextAdapterAuditApprovalJoinApprovalFixtureState;
  manualConfirmationFixtureState:
    TextAdapterAuditApprovalJoinManualConfirmationFixtureState;
  approvalTokenState: TextAdapterAuditApprovalJoinApprovalTokenState;
  approvalLeaseState: TextAdapterAuditApprovalJoinApprovalLeaseState;
  approvalSummaryLines: readonly string[];
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalJoinSafetyGateSummaryRecord = Readonly<{
  key: TextAdapterAuditApprovalJoinSafetyGateSummaryKey;
  version: TextAdapterAuditApprovalJoinSafetyGateSummaryVersion;
  serverOnlyHelperStatement:
    TextAdapterAuditApprovalJoinServerOnlyHelperStatement;
  deterministicJoinStatement:
    TextAdapterAuditApprovalJoinDeterministicStatement;
  inMemoryOnlyJoinStatement:
    TextAdapterAuditApprovalJoinInMemoryOnlyStatement;
  blockedPersistenceStatement:
    "text adapter result capture is not persistent";
  currentReadiness: TextAdapterAuditApprovalJoinCurrentReadiness;
  summaryLines: readonly string[];
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalJoinBlockedLivePersistenceSummaryRecord =
  Readonly<{
    key: TextAdapterAuditApprovalJoinBlockedLivePersistenceSummaryKey;
    version: TextAdapterAuditApprovalJoinBlockedLivePersistenceSummaryVersion;
    blockedLiveActions: readonly string[];
    noRealApprovalRequestStatement:
      TextAdapterAuditApprovalJoinNoRealApprovalRequestStatement;
    noRealApprovalRecordingStatement:
      TextAdapterAuditApprovalJoinNoRealApprovalRecordingStatement;
    retryPosture: TextAdapterAuditApprovalJoinRetryPosture;
    fallbackPosture: TextAdapterAuditApprovalJoinFallbackPosture;
    summaryLines: readonly string[];
  } & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalJoinRequestRecord = Readonly<{
  key: TextAdapterAuditApprovalJoinRequestKey;
  version: TextAdapterAuditApprovalJoinRequestVersion;
  requestState: TextAdapterAuditApprovalJoinRequestState;
  textAdapterAuditApprovalJoinMvpId: MinimalTextAdapterAuditApprovalJoinMvpId;
  frontendRequestState: TextAdapterAuditApprovalJoinFrontendRequestState;
  apiRouteState: TextAdapterAuditApprovalJoinApiRouteState;
  redactedPromptPosture: TextAdapterAuditApprovalJoinRedactedPromptPosture;
  capturedFixtureResponsePosture:
    TextAdapterAuditApprovalJoinFixtureResponsePosture;
  auditPayloadPosture: TextAdapterAuditApprovalJoinAuditPayloadPosture;
  approvalPayloadPosture:
    TextAdapterAuditApprovalJoinApprovalPayloadPosture;
  providerPayloadPosture:
    TextAdapterAuditApprovalJoinProviderPayloadPosture;
  modelOutputPosture: TextAdapterAuditApprovalJoinModelOutputPosture;
  persistenceTargetPosture:
    TextAdapterAuditApprovalJoinPersistenceTargetPosture;
  explicitNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement:
    TextAdapterAuditApprovalJoinNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement;
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalJoinResponseRecord = Readonly<{
  key: TextAdapterAuditApprovalJoinResponseKey;
  version: TextAdapterAuditApprovalJoinResponseVersion;
  responseState: TextAdapterAuditApprovalJoinResponseState;
  textAdapterAuditApprovalJoinMvpId: MinimalTextAdapterAuditApprovalJoinMvpId;
  joinState: TextAdapterAuditApprovalJoinState;
  auditJoinState: TextAdapterAuditJoinState;
  approvalJoinState: TextAdapterApprovalJoinState;
  providerResponseState: TextAdapterAuditApprovalJoinProviderResponseState;
  modelOutputState: TextAdapterAuditApprovalJoinModelOutputState;
  resultPersistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  auditPersistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  approvalPersistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  databaseWriteState: TextAdapterAuditApprovalJoinPersistenceState;
  fileWriteState: TextAdapterAuditApprovalJoinPersistenceState;
  explicitFixtureAuditApprovalJoinOnlyNoProviderOutputNoPersistenceStatement:
    TextAdapterAuditApprovalJoinResponseStatement;
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalJoinErrorRecord = Readonly<{
  key: TextAdapterAuditApprovalJoinErrorKey;
  version: TextAdapterAuditApprovalJoinErrorVersion;
  errorState: TextAdapterAuditApprovalJoinErrorState;
  textAdapterAuditApprovalJoinMvpId: MinimalTextAdapterAuditApprovalJoinMvpId;
  failedGateExamples: readonly TextAdapterAuditApprovalJoinGateId[];
  missingTextAdapterResultCaptureExample:
    "Text adapter captured fixture result output is required.";
  missingAuditPreviewExample: "Text adapter audit preview is required.";
  missingApprovalPreviewExample:
    "Text adapter approval preview is required.";
  missingRedactedPromptEnvelopeExample:
    "Text adapter redacted prompt envelope is required.";
  promptTransmissionAttemptedExample:
    "Prompt transmission must remain blocked.";
  providerSdkImportAttemptedExample:
    "Provider SDK import must remain blocked.";
  providerCallAttemptedExample:
    "Provider execution must remain blocked.";
  modelCallAttemptedExample: "Model calls must remain blocked.";
  persistenceAttemptedExample:
    "Persistence target must remain absent.";
  databaseWriteAttemptedExample:
    "Database write target must remain absent.";
  fileWriteAttemptedExample: "File write target must remain absent.";
  queueWorkerJobAttemptedExample:
    "Queue, worker, and job dispatch must remain blocked.";
  retryPosture: TextAdapterAuditApprovalJoinRetryPosture;
  fallbackPosture: TextAdapterAuditApprovalJoinFallbackPosture;
  explicitNoLiveErrorNoRetryNoFallbackStatement:
    TextAdapterAuditApprovalJoinErrorStatement;
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalJoinGateRecord = Readonly<{
  id: TextAdapterAuditApprovalJoinGateId;
  key: `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-gate:${MinimalTextAdapterAuditApprovalJoinMvpId}:${TextAdapterAuditApprovalJoinGateId}`;
  version: TextAdapterAuditApprovalJoinGateVersion;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalJoinReadinessMatrixRecord = Readonly<{
  id: TextAdapterAuditApprovalJoinReadinessMatrixId;
  key: `backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-readiness:${MinimalTextAdapterAuditApprovalJoinMvpId}:${TextAdapterAuditApprovalJoinReadinessMatrixId}`;
  version: TextAdapterAuditApprovalJoinReadinessMatrixVersion;
  label: string;
  state: string;
  evidence: string;
  currentReadiness: TextAdapterAuditApprovalJoinCurrentReadiness;
  nextSafeAction: string;
} & TextAdapterAuditApprovalJoinCommonRecordFields>;

export type TextAdapterAuditApprovalJoinSummary = Readonly<{
  version: TextAdapterAuditApprovalJoinSummaryVersion;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  joinCount: number;
  currentReadiness: TextAdapterAuditApprovalJoinCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type TextAdapterAuditApprovalJoinGateSummary = Readonly<{
  version: TextAdapterAuditApprovalJoinGateSummaryVersion;
  gateCount: number;
  blockedGateCount: number;
  currentReadiness: TextAdapterAuditApprovalJoinCurrentReadiness;
  summaryLines: readonly string[];
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type TextAdapterAuditApprovalJoinReadinessSummary = Readonly<{
  version: TextAdapterAuditApprovalJoinReadinessSummaryVersion;
  readinessCount: number;
  currentReadiness: TextAdapterAuditApprovalJoinCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type MinimalTextAdapterAuditApprovalJoinMvpRunInput = Readonly<{
  textAdapterAuditApprovalJoinMvpId: MinimalTextAdapterAuditApprovalJoinMvpId;
  backendOwnedMode: TextAdapterAuditApprovalJoinBackendOwnedPosture;
  serverOnlyMode: TextAdapterAuditApprovalJoinServerOnlyPosture;
  auditApprovalJoinMode: TextAdapterAuditApprovalJoinPosture;
  manualGatedMode: TextAdapterAuditApprovalJoinManualGatedPosture;
  fixtureOnlyMode: TextAdapterAuditApprovalJoinFixtureOnlyPosture;
  sourceTextAdapterResultCaptureMvp: MinimalTextAdapterResultCaptureMvpRecord;
  sourceTextAdapterResultCaptureReview:
    BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord;
  sourceTextAdapterCapturedFixtureResultOutput:
    TextAdapterCapturedFixtureResultOutputRecord;
  sourceTextAdapterResultCaptureOutputReview:
    TextAdapterResultCaptureOutputReviewRecord;
  sourceTextAdapterResultCaptureAuditPreview:
    SourceTextAdapterResultCaptureAuditPreviewRecord;
  sourceTextAdapterResultCaptureApprovalPreview:
    SourceTextAdapterResultCaptureApprovalPreviewRecord;
  sourceTextAdapterResultCaptureEvidencePreview:
    SourceTextAdapterResultCaptureEvidencePreviewRecord;
  sourceTextAdapterRedactedPromptEnvelope:
    TextAdapterRedactedPromptEnvelopeRecord;
  sourceMinimalTextAdapterReview:
    BackendOwnedMinimalManualGatedTextAdapterReviewRecord;
  sourceManualApprovalDecisionReview:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord;
  manualApprovalFixture: SyntheticMvpManualApprovalFixtureRecord;
  manualConfirmationFixture: SyntheticMvpManualApprovalFixtureRecord;
  promptTransmissionState:
    TextAdapterAuditApprovalJoinPromptTransmissionState;
  providerSdkImportState:
    TextAdapterAuditApprovalJoinProviderSdkImportState;
  providerResponseState:
    TextAdapterAuditApprovalJoinProviderResponseState;
  modelOutputState: TextAdapterAuditApprovalJoinModelOutputState;
  approvalFixtureState: TextAdapterAuditApprovalJoinApprovalFixtureState;
  manualConfirmationFixtureState:
    TextAdapterAuditApprovalJoinManualConfirmationFixtureState;
  approvalRecordingState:
    TextAdapterAuditApprovalJoinApprovalRecordingState;
  approvalTokenState: TextAdapterAuditApprovalJoinApprovalTokenState;
  approvalLeaseState: TextAdapterAuditApprovalJoinApprovalLeaseState;
  frontendRequestState: TextAdapterAuditApprovalJoinFrontendRequestState;
  apiRouteState: TextAdapterAuditApprovalJoinApiRouteState;
  providerExecutionState: TextAdapterAuditApprovalJoinProviderCallState;
  modelCallState: TextAdapterAuditApprovalJoinModelCallState;
  persistenceTargetPosture:
    TextAdapterAuditApprovalJoinPersistenceTargetPosture;
  databaseWriteTargetState:
    TextAdapterAuditApprovalJoinDatabaseWriteTargetState;
  fileWriteTargetState: TextAdapterAuditApprovalJoinFileWriteTargetState;
  queueDispatchState: TextAdapterAuditApprovalJoinDispatchState;
  workerDispatchState: TextAdapterAuditApprovalJoinDispatchState;
  jobExecutionState: TextAdapterAuditApprovalJoinDispatchState;
}>;

export type MinimalTextAdapterAuditApprovalJoinMvpServerRunRecord = Readonly<{
  textAdapterAuditApprovalJoinMvpId: MinimalTextAdapterAuditApprovalJoinMvpId;
  requestLabel: MinimalTextAdapterResultCaptureMvpRecord["requestLabel"];
  sourceTextAdapterResultCaptureReviewReference:
    BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord["key"];
  sourceTextAdapterCapturedFixtureResultOutputReference:
    TextAdapterCapturedFixtureResultOutputKey;
  sourceTextAdapterAuditPreviewReference:
    SourceTextAdapterResultCaptureAuditPreviewKey;
  sourceTextAdapterApprovalPreviewReference:
    SourceTextAdapterResultCaptureApprovalPreviewKey;
  sourceTextAdapterEvidencePreviewReference:
    SourceTextAdapterResultCaptureEvidencePreviewKey;
  sourceTextAdapterRedactedPromptEnvelopeReference:
    TextAdapterRedactedPromptEnvelopeKey;
  joinState: TextAdapterAuditApprovalJoinState;
  auditJoinState: TextAdapterAuditJoinState;
  approvalJoinState: TextAdapterApprovalJoinState;
  textAdapterId: MinimalTextAdapterResultCaptureMvpRecord["textAdapterId"];
  resultCaptureId: TextAdapterResultCapturePreviewId;
  auditJoinId: TextAdapterAuditJoinId;
  approvalJoinId: TextAdapterApprovalJoinId;
  joinDigest: TextAdapterAuditApprovalJoinDigest;
  redactedPromptReference: TextAdapterRedactedPromptEnvelopeKey;
  capturedFixtureResponseReference:
    TextAdapterCapturedFixtureResultOutputKey;
  resultReference: TextAdapterAuditApprovalJoinResultReference;
  auditReference: TextAdapterAuditApprovalJoinAuditReference;
  approvalReference: TextAdapterAuditApprovalJoinApprovalReference;
  evidencePreviewReference: TextAdapterAuditApprovalJoinEvidenceReference;
  providerResponseState: TextAdapterAuditApprovalJoinProviderResponseState;
  modelOutputState: TextAdapterAuditApprovalJoinModelOutputState;
  timestampPosture: TextAdapterAuditApprovalJoinTimestampPosture;
  persistenceState: TextAdapterAuditApprovalJoinPersistenceState;
  currentReadiness: TextAdapterAuditApprovalJoinCurrentReadiness;
  serverOnlyHelperStatement:
    TextAdapterAuditApprovalJoinServerOnlyHelperStatement;
  deterministicTextAdapterJoinStatement:
    TextAdapterAuditApprovalJoinDeterministicStatement;
  inMemoryOnlyJoinStatement:
    TextAdapterAuditApprovalJoinInMemoryOnlyStatement;
  noFrontendRequestStatement:
    TextAdapterAuditApprovalJoinNoFrontendRequestStatement;
  noApiRouteStatement:
    TextAdapterAuditApprovalJoinNoApiRouteStatement;
  nextTextAdapterAuditApprovalJoinReviewRecoveryChecklist: readonly string[];
}>;
