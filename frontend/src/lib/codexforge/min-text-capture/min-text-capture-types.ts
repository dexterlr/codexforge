import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  SyntheticMvpManualApprovalFixtureKey,
  SyntheticMvpManualApprovalFixtureRecord,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import type {
  BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord,
} from "../min-synth-e2e-review";
import type {
  BackendOwnedMinimalManualGatedTextAdapterReviewRecord,
  MinimalTextAdapterOutputReviewKey,
  MinimalTextAdapterOutputReviewRecord,
} from "../min-text-adapter-review";
import type {
  MinimalTextModelAdapterMvpId,
  MinimalTextModelAdapterMvpKey,
  MinimalTextModelAdapterMvpRecord,
  MinimalTextModelAdapterPreviewId,
  TextAdapterDeterministicFixtureResponseKey,
  TextAdapterDeterministicFixtureResponseRecord,
  TextAdapterInputKey,
  TextAdapterInputRecord,
  TextAdapterRedactedPromptEnvelopeKey,
  TextAdapterRedactedPromptEnvelopeRecord,
  TextAdapterResponseId,
} from "../min-text-adapter";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH =
  "5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_PHASE =
  5737;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5674-5705 - Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview";

export const MINIMAL_TEXT_ADAPTER_RESULT_CAPTURE_SECTION_TITLES = [
  "Backend-owned minimal manual-gated text model adapter result capture MVP",
  "Text adapter result capture input",
  "Text adapter captured fixture result output",
  "Text adapter result capture envelope",
  "Text adapter result capture gates",
  "Text adapter result capture readiness matrix",
  "Text adapter result capture evidence preview",
] as const;

export type MinimalTextAdapterResultCaptureMvpId = MinimalTextModelAdapterMvpId;
export type MinimalTextAdapterResultCaptureSectionTitle =
  (typeof MINIMAL_TEXT_ADAPTER_RESULT_CAPTURE_SECTION_TITLES)[number];

export type MinimalTextAdapterResultCaptureCapabilityFamilyLabel =
  MinimalTextModelAdapterMvpRecord["capabilityFamily"];
export type MinimalTextAdapterResultCaptureWorkspaceTarget =
  MinimalTextModelAdapterMvpRecord["workspaceTarget"];
export type MinimalTextAdapterResultCaptureProviderSlotLabel =
  MinimalTextModelAdapterMvpRecord["providerSlotLabel"];
export type MinimalTextAdapterResultCaptureBackupProviderSlotLabel =
  MinimalTextModelAdapterMvpRecord["backupProviderSlotLabel"];
export type MinimalTextAdapterResultCaptureLocalPrivateAlternativeLabel =
  MinimalTextModelAdapterMvpRecord["localPrivateAlternativeLabel"];

export type MinimalTextAdapterResultCaptureMvpVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-mvp-v1";
export type TextAdapterResultCaptureInputVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-input-v1";
export type TextAdapterResultCaptureAdmissionCheckVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-admission-check-v1";
export type TextAdapterCapturedFixtureResultOutputVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-captured-fixture-result-output-v1";
export type TextAdapterResultCaptureEnvelopeVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-envelope-v1";
export type TextAdapterResultCaptureEvidencePreviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-evidence-preview-v1";
export type TextAdapterResultCaptureAuditPreviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-audit-preview-v1";
export type TextAdapterResultCaptureApprovalPreviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-approval-preview-v1";
export type TextAdapterResultCaptureSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-safety-gate-summary-v1";
export type TextAdapterResultCaptureBlockedLivePersistenceSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-blocked-live-persistence-summary-v1";
export type TextAdapterResultCaptureRequestVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-request-v1";
export type TextAdapterResultCaptureResponseVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-response-v1";
export type TextAdapterResultCaptureErrorVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-error-v1";
export type TextAdapterResultCaptureGateVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate-v1";
export type TextAdapterResultCaptureReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-readiness-matrix-v1";
export type TextAdapterResultCaptureSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-summary-v1";
export type TextAdapterResultCaptureGateSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate-summary-v1";
export type TextAdapterResultCaptureReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-readiness-summary-v1";

export type TextAdapterResultCaptureBackendOwnedPosture = "backend-owned";
export type TextAdapterResultCaptureServerOnlyPosture = "server-only";
export type TextAdapterResultCaptureResultCapturePosture = "result-capture";
export type TextAdapterResultCaptureManualGatedPosture = "manual-gated";
export type TextAdapterResultCaptureFixtureOnlyPosture = "fixture-only";
export type TextAdapterResultCaptureInMemoryOnlyPosture = "in-memory-only";
export type TextAdapterResultCaptureNoProviderExecution =
  "no provider execution";
export type TextAdapterResultCaptureNoModelCalls = "no model calls";
export type TextAdapterResultCaptureNoPromptSending = "no prompt sending";
export type TextAdapterResultCaptureNoFrontendRequest =
  "no frontend request";
export type TextAdapterResultCaptureNoApiRoute = "no API route";
export type TextAdapterResultCaptureNoQueueWorkerJobDispatch =
  "no queue/worker/job dispatch";
export type TextAdapterResultCaptureNoPersistence = "no persistence";
export type TextAdapterResultCaptureNoDatabaseWrites =
  "no database writes";
export type TextAdapterResultCaptureNoFileWrites = "no file writes";
export type TextAdapterResultCaptureNoResultPersistence =
  "no result persistence";
export type TextAdapterResultCaptureNoAuditPersistence =
  "no audit persistence";
export type TextAdapterResultCaptureNoApprovalPersistence =
  "no approval persistence";
export type TextAdapterResultCaptureNoApprovalRecording =
  "no approval recording";
export type TextAdapterResultCaptureNoApprovalTokenIssuance =
  "no approval token issuance";
export type TextAdapterResultCaptureNoApprovalLeaseIssuance =
  "no approval lease issuance";
export type TextAdapterResultCaptureCurrentReadiness =
  "minimal-text-adapter-result-capture-mvp-only / backend-only / fixture-only / in-memory-only / not persistent";

export type TextAdapterResultCaptureState =
  "captured-text-adapter-fixture-in-memory-only";
export type TextAdapterCapturedFixtureResultState =
  "deterministic fixture result captured in memory only";
export type TextAdapterResultCaptureRequestState =
  "deterministic text adapter capture request only";
export type TextAdapterResultCaptureResponseState =
  "returned by server-only smoke/helper only";
export type TextAdapterResultCaptureErrorState = "deterministic preview only";
export type TextAdapterResultCapturePromptPayloadPosture =
  "redacted placeholder only";
export type TextAdapterResultCaptureFixtureResponsePosture =
  "deterministic fixture response only";
export type TextAdapterResultCaptureProviderPayloadPosture = "none";
export type TextAdapterResultCaptureModelOutputPosture = "none";
export type TextAdapterResultCapturePromptTransmissionState = "not sent";
export type TextAdapterResultCaptureProviderSdkImportState =
  "not imported";
export type TextAdapterResultCaptureProviderResponseState =
  "not received";
export type TextAdapterResultCaptureModelOutputState =
  "not generated";
export type TextAdapterResultCaptureApprovalFixtureState =
  "preview-only";
export type TextAdapterResultCaptureManualConfirmationFixtureState =
  "preview-only";
export type TextAdapterResultCaptureApprovalRecordingState =
  "not recorded";
export type TextAdapterResultCaptureApprovalTokenState = "not issued";
export type TextAdapterResultCaptureApprovalLeaseState = "not created";
export type TextAdapterResultCaptureFrontendRequestState =
  "not created";
export type TextAdapterResultCaptureApiRouteState = "not created";
export type TextAdapterResultCapturePersistenceTargetPosture = "none";
export type TextAdapterResultCapturePersistenceState =
  "not implemented";
export type TextAdapterResultCaptureDatabaseWriteTargetState = "none";
export type TextAdapterResultCaptureFileWriteTargetState = "none";
export type TextAdapterResultCaptureDispatchState = "blocked";
export type TextAdapterResultCaptureProviderCallState = "blocked";
export type TextAdapterResultCaptureModelCallState = "blocked";
export type TextAdapterResultCaptureTimestampPosture =
  "static fixture label only / no real timestamp";
export type TextAdapterResultCaptureRetryPosture = "disabled";
export type TextAdapterResultCaptureFallbackPosture = "disabled";
export type TextAdapterResultCaptureNormalizedOperatorIntent =
  "static fixture only";
export type TextAdapterResultCaptureCapturedResultPayloadLabel =
  "static text adapter fixture output only";
export type TextAdapterResultCapturePreviewReferenceState =
  "preview-only / not persisted";
export type TextAdapterResultCaptureNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement =
  "No frontend request. No API route. No provider call. No persistence.";
export type TextAdapterResultCaptureFixtureCaptureOnlyNoProviderOutputNoPersistenceStatement =
  "Fixture capture only. No provider output. No persistence.";
export type TextAdapterResultCaptureNoLiveErrorNoRetryNoFallbackStatement =
  "No live error. No retry. No fallback.";

export type MinimalTextAdapterResultCaptureMvpKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-mvp:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureInputKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-input:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureAdmissionCheckKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-admission-check:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterCapturedFixtureResultOutputKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-captured-fixture-result-output:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureEnvelopeKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-envelope:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureEvidencePreviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-evidence-preview:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureAuditPreviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-audit-preview:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureApprovalPreviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-approval-preview:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-safety-gate-summary:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureBlockedLivePersistenceSummaryKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-blocked-live-persistence-summary:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureRequestKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-request:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureResponseKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-response:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureErrorKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-error:${MinimalTextAdapterResultCaptureMvpId}`;

export type TextAdapterResultCapturePreviewId =
  `text-adapter-result-capture-preview:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureDigest =
  `text-adapter-result-capture-digest-preview:${MinimalTextAdapterResultCaptureMvpId}:in-memory-only`;
export type TextAdapterResultCaptureResultReference =
  `text-adapter-result-capture-result-reference-preview:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureAuditReference =
  `text-adapter-result-capture-audit-reference-preview:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureApprovalReference =
  `text-adapter-result-capture-approval-reference-preview:${MinimalTextAdapterResultCaptureMvpId}`;
export type TextAdapterResultCaptureEvidenceReference =
  `text-adapter-result-capture-evidence-reference-preview:${MinimalTextAdapterResultCaptureMvpId}`;

export type TextAdapterResultCaptureGateId =
  | "backend-only-boundary"
  | "server-only-capture-module-boundary"
  | "text-adapter-fixture-capture-mode"
  | "minimal-text-adapter-review-dependency"
  | "deterministic-fixture-response-present"
  | "redacted-prompt-envelope-present"
  | "prompt-not-sent"
  | "provider-sdk-not-imported"
  | "provider-response-not-received"
  | "model-output-not-generated"
  | "manual-approval-fixture"
  | "manual-confirmation-fixture"
  | "deterministic-adapter-id"
  | "deterministic-fixture-response-id"
  | "deterministic-capture-id"
  | "deterministic-capture-digest"
  | "in-memory-only-result-reference"
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

export type TextAdapterResultCaptureReadinessMatrixId =
  | "server-only-result-capture-helper-state"
  | "minimal-text-adapter-review-dependency"
  | "text-adapter-fixture-response-dependency"
  | "redacted-prompt-envelope-dependency"
  | "result-capture-input-state"
  | "capture-admission-check-state"
  | "captured-fixture-result-output-state"
  | "capture-envelope-state"
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

export type TextAdapterCapturedFixtureResultPayload = Readonly<{
  label: TextAdapterResultCaptureCapturedResultPayloadLabel;
  captureEnvelopeState: "preview-only";
  evidenceDigest: TextAdapterResultCaptureDigest;
  auditPreviewState: TextAdapterResultCapturePreviewReferenceState;
  approvalPreviewState: TextAdapterResultCaptureApprovalFixtureState;
}>;

export type TextAdapterResultCaptureCommonRecordFields = Readonly<{
  stableId: MinimalTextAdapterResultCaptureMvpId;
  capabilityFamily: MinimalTextAdapterResultCaptureCapabilityFamilyLabel;
  workspaceTarget: MinimalTextAdapterResultCaptureWorkspaceTarget;
  providerSlotLabel: MinimalTextAdapterResultCaptureProviderSlotLabel;
  backupProviderSlotLabel:
    MinimalTextAdapterResultCaptureBackupProviderSlotLabel;
  localPrivateAlternativeLabel:
    MinimalTextAdapterResultCaptureLocalPrivateAlternativeLabel;
  sourceMinimalTextAdapterMvpReference: MinimalTextModelAdapterMvpKey;
  sourceMinimalTextAdapterReviewReference:
    BackendOwnedMinimalManualGatedTextAdapterReviewRecord["key"];
  sourceTextAdapterDeterministicFixtureResponseReference:
    TextAdapterDeterministicFixtureResponseKey;
  sourceTextAdapterOutputReviewReference: MinimalTextAdapterOutputReviewKey;
  sourceTextAdapterRedactedPromptEnvelopeReference:
    TextAdapterRedactedPromptEnvelopeKey;
  sourceSyntheticEndToEndPacketReviewReference:
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["key"];
  sourceManualApprovalDecisionReviewReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
  sourceManualApprovalFixtureReference: SyntheticMvpManualApprovalFixtureKey;
  sourceManualConfirmationFixtureReference:
    SyntheticMvpManualApprovalFixtureKey;
  backendOwnedPosture: TextAdapterResultCaptureBackendOwnedPosture;
  serverOnlyPosture: TextAdapterResultCaptureServerOnlyPosture;
  resultCapturePosture: TextAdapterResultCaptureResultCapturePosture;
  manualGatedPosture: TextAdapterResultCaptureManualGatedPosture;
  fixtureOnlyPosture: TextAdapterResultCaptureFixtureOnlyPosture;
  inMemoryOnlyPosture: TextAdapterResultCaptureInMemoryOnlyPosture;
  noProviderExecution: TextAdapterResultCaptureNoProviderExecution;
  noModelCalls: TextAdapterResultCaptureNoModelCalls;
  noPromptSending: TextAdapterResultCaptureNoPromptSending;
  noFrontendRequest: TextAdapterResultCaptureNoFrontendRequest;
  noApiRoute: TextAdapterResultCaptureNoApiRoute;
  noQueueWorkerJobDispatch:
    TextAdapterResultCaptureNoQueueWorkerJobDispatch;
  noPersistence: TextAdapterResultCaptureNoPersistence;
  noDatabaseWrites: TextAdapterResultCaptureNoDatabaseWrites;
  noFileWrites: TextAdapterResultCaptureNoFileWrites;
  noResultPersistence: TextAdapterResultCaptureNoResultPersistence;
  noAuditPersistence: TextAdapterResultCaptureNoAuditPersistence;
  noApprovalPersistence: TextAdapterResultCaptureNoApprovalPersistence;
  noApprovalRecording: TextAdapterResultCaptureNoApprovalRecording;
  noApprovalTokenIssuance:
    TextAdapterResultCaptureNoApprovalTokenIssuance;
  noApprovalLeaseIssuance:
    TextAdapterResultCaptureNoApprovalLeaseIssuance;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type MinimalTextAdapterResultCaptureMvpRecord = Readonly<{
  key: MinimalTextAdapterResultCaptureMvpKey;
  version: MinimalTextAdapterResultCaptureMvpVersion;
  label: "Backend-owned minimal manual-gated text model adapter result capture MVP";
  requestLabel: MinimalTextModelAdapterMvpRecord["requestLabel"];
  captureState: TextAdapterResultCaptureState;
  textAdapterId: MinimalTextModelAdapterPreviewId;
  fixtureResponseId: TextAdapterResponseId;
  captureId: TextAdapterResultCapturePreviewId;
  captureDigest: TextAdapterResultCaptureDigest;
  normalizedOperatorIntent:
    TextAdapterResultCaptureNormalizedOperatorIntent;
  redactedPromptReference: TextAdapterRedactedPromptEnvelopeKey;
  deterministicFixtureResponseReference:
    TextAdapterDeterministicFixtureResponseKey;
  capturedResultPayload: TextAdapterCapturedFixtureResultPayload;
  providerResponseState: TextAdapterResultCaptureProviderResponseState;
  modelOutputState: TextAdapterResultCaptureModelOutputState;
  resultReference: TextAdapterResultCaptureResultReference;
  auditReference: TextAdapterResultCaptureAuditReference;
  approvalReference: TextAdapterResultCaptureApprovalReference;
  evidencePacketReference: TextAdapterResultCaptureEvidenceReference;
  timestampPosture: TextAdapterResultCaptureTimestampPosture;
  persistenceState: TextAdapterResultCapturePersistenceState;
  currentReadiness: TextAdapterResultCaptureCurrentReadiness;
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureInputRecord = Readonly<{
  key: TextAdapterResultCaptureInputKey;
  version: TextAdapterResultCaptureInputVersion;
  sourceTextAdapterInputReference: TextAdapterInputKey;
  requestState: TextAdapterResultCaptureRequestState;
  frontendRequestState: TextAdapterResultCaptureFrontendRequestState;
  apiRouteState: TextAdapterResultCaptureApiRouteState;
  promptPayloadPosture: TextAdapterResultCapturePromptPayloadPosture;
  promptTransmissionState:
    TextAdapterResultCapturePromptTransmissionState;
  fixtureResponsePosture:
    TextAdapterResultCaptureFixtureResponsePosture;
  providerPayloadPosture:
    TextAdapterResultCaptureProviderPayloadPosture;
  modelOutputPosture: TextAdapterResultCaptureModelOutputPosture;
  persistenceTargetPosture:
    TextAdapterResultCapturePersistenceTargetPosture;
  explicitNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement:
    TextAdapterResultCaptureNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement;
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureAdmissionCheckRecord = Readonly<{
  key: TextAdapterResultCaptureAdmissionCheckKey;
  version: TextAdapterResultCaptureAdmissionCheckVersion;
  admissionState: "accepted / fixture-only / in-memory-only / persistence-blocked";
  sourceTextAdapterInputReference: TextAdapterInputKey;
  sourceMinimalTextAdapterReviewReference:
    BackendOwnedMinimalManualGatedTextAdapterReviewRecord["key"];
  sourceTextAdapterOutputReviewReference: MinimalTextAdapterOutputReviewKey;
  backendOnlyCheck: "passed";
  serverOnlyCheck: "passed";
  manualGatedCheck: "passed";
  fixtureResponseCheck: "passed";
  reviewDependencyCheck: "passed";
  captureBoundaryCheck: "passed";
  persistenceCheck: "blocked";
  nextSafeAction: string;
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterCapturedFixtureResultOutputRecord = Readonly<{
  key: TextAdapterCapturedFixtureResultOutputKey;
  version: TextAdapterCapturedFixtureResultOutputVersion;
  captureState: TextAdapterResultCaptureState;
  capturedResultState: TextAdapterCapturedFixtureResultState;
  textAdapterId: MinimalTextModelAdapterPreviewId;
  fixtureResponseId: TextAdapterResponseId;
  captureId: TextAdapterResultCapturePreviewId;
  captureDigest: TextAdapterResultCaptureDigest;
  normalizedOperatorIntent:
    TextAdapterResultCaptureNormalizedOperatorIntent;
  redactedPromptReference: TextAdapterRedactedPromptEnvelopeKey;
  deterministicFixtureResponseReference:
    TextAdapterDeterministicFixtureResponseKey;
  capturedResultPayload: TextAdapterCapturedFixtureResultPayload;
  providerResponseState: TextAdapterResultCaptureProviderResponseState;
  modelOutputState: TextAdapterResultCaptureModelOutputState;
  resultReference: TextAdapterResultCaptureResultReference;
  auditReference: TextAdapterResultCaptureAuditReference;
  approvalReference: TextAdapterResultCaptureApprovalReference;
  evidencePacketReference: TextAdapterResultCaptureEvidenceReference;
  timestampPosture: TextAdapterResultCaptureTimestampPosture;
  resultPersistenceState: TextAdapterResultCapturePersistenceState;
  auditPersistenceState: TextAdapterResultCapturePersistenceState;
  approvalPersistenceState: TextAdapterResultCapturePersistenceState;
  databaseWriteState: TextAdapterResultCapturePersistenceState;
  fileWriteState: TextAdapterResultCapturePersistenceState;
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureEnvelopeRecord = Readonly<{
  key: TextAdapterResultCaptureEnvelopeKey;
  version: TextAdapterResultCaptureEnvelopeVersion;
  requestReference: TextAdapterResultCaptureRequestKey;
  responseReference: TextAdapterResultCaptureResponseKey;
  errorReference: TextAdapterResultCaptureErrorKey;
  inputReference: TextAdapterResultCaptureInputKey;
  outputReference: TextAdapterCapturedFixtureResultOutputKey;
  evidencePreviewReference: TextAdapterResultCaptureEvidencePreviewKey;
  auditPreviewReference: TextAdapterResultCaptureAuditPreviewKey;
  approvalPreviewReference: TextAdapterResultCaptureApprovalPreviewKey;
  captureState: TextAdapterResultCaptureState;
  capturedResultState: TextAdapterCapturedFixtureResultState;
  providerResponseState: TextAdapterResultCaptureProviderResponseState;
  modelOutputState: TextAdapterResultCaptureModelOutputState;
  resultPersistenceState: TextAdapterResultCapturePersistenceState;
  auditPersistenceState: TextAdapterResultCapturePersistenceState;
  approvalPersistenceState: TextAdapterResultCapturePersistenceState;
  databaseWriteState: TextAdapterResultCapturePersistenceState;
  fileWriteState: TextAdapterResultCapturePersistenceState;
  explicitFixtureCaptureOnlyNoProviderOutputNoPersistenceStatement:
    TextAdapterResultCaptureFixtureCaptureOnlyNoProviderOutputNoPersistenceStatement;
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureEvidencePreviewRecord = Readonly<{
  key: TextAdapterResultCaptureEvidencePreviewKey;
  version: TextAdapterResultCaptureEvidencePreviewVersion;
  evidenceReference: TextAdapterResultCaptureEvidenceReference;
  evidencePreviewState: TextAdapterResultCapturePreviewReferenceState;
  evidenceSummaryLines: readonly string[];
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureAuditPreviewRecord = Readonly<{
  key: TextAdapterResultCaptureAuditPreviewKey;
  version: TextAdapterResultCaptureAuditPreviewVersion;
  auditReference: TextAdapterResultCaptureAuditReference;
  auditPreviewState: TextAdapterResultCapturePreviewReferenceState;
  auditSummaryLines: readonly string[];
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureApprovalPreviewRecord = Readonly<{
  key: TextAdapterResultCaptureApprovalPreviewKey;
  version: TextAdapterResultCaptureApprovalPreviewVersion;
  approvalReference: TextAdapterResultCaptureApprovalReference;
  approvalPreviewState: TextAdapterResultCapturePreviewReferenceState;
  approvalFixtureState: TextAdapterResultCaptureApprovalFixtureState;
  manualConfirmationFixtureState:
    TextAdapterResultCaptureManualConfirmationFixtureState;
  approvalTokenState: TextAdapterResultCaptureApprovalTokenState;
  approvalLeaseState: TextAdapterResultCaptureApprovalLeaseState;
  approvalSummaryLines: readonly string[];
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureSafetyGateSummaryRecord = Readonly<{
  key: TextAdapterResultCaptureSafetyGateSummaryKey;
  version: TextAdapterResultCaptureSafetyGateSummaryVersion;
  serverOnlyHelperStatement:
    "server-only text adapter result capture helper exists";
  fixtureCaptureStatement:
    "text adapter fixture response is captured in memory only";
  redactedPromptStatement: "redacted prompt envelope is preview-only";
  blockedPersistenceStatement:
    "text adapter result capture is not persistent";
  currentReadiness: TextAdapterResultCaptureCurrentReadiness;
  summaryLines: readonly string[];
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureBlockedLivePersistenceSummaryRecord =
  Readonly<{
    key: TextAdapterResultCaptureBlockedLivePersistenceSummaryKey;
    version: TextAdapterResultCaptureBlockedLivePersistenceSummaryVersion;
    blockedLiveActions: readonly string[];
    noRealApprovalRequestStatement: "no real approval request";
    noRealApprovalRecordingStatement: "no real approval recording";
    retryPosture: TextAdapterResultCaptureRetryPosture;
    fallbackPosture: TextAdapterResultCaptureFallbackPosture;
    summaryLines: readonly string[];
  } & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureRequestRecord = Readonly<{
  key: TextAdapterResultCaptureRequestKey;
  version: TextAdapterResultCaptureRequestVersion;
  requestState: TextAdapterResultCaptureRequestState;
  textAdapterResultCaptureMvpId: MinimalTextAdapterResultCaptureMvpId;
  frontendRequestState: TextAdapterResultCaptureFrontendRequestState;
  apiRouteState: TextAdapterResultCaptureApiRouteState;
  promptPayloadPosture: TextAdapterResultCapturePromptPayloadPosture;
  promptTransmissionState:
    TextAdapterResultCapturePromptTransmissionState;
  fixtureResponsePosture:
    TextAdapterResultCaptureFixtureResponsePosture;
  providerPayloadPosture:
    TextAdapterResultCaptureProviderPayloadPosture;
  modelOutputPosture: TextAdapterResultCaptureModelOutputPosture;
  persistenceTargetPosture:
    TextAdapterResultCapturePersistenceTargetPosture;
  explicitNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement:
    TextAdapterResultCaptureNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement;
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureResponseRecord = Readonly<{
  key: TextAdapterResultCaptureResponseKey;
  version: TextAdapterResultCaptureResponseVersion;
  responseState: TextAdapterResultCaptureResponseState;
  textAdapterResultCaptureMvpId: MinimalTextAdapterResultCaptureMvpId;
  captureState: TextAdapterResultCaptureState;
  capturedResultState: TextAdapterCapturedFixtureResultState;
  providerResponseState: TextAdapterResultCaptureProviderResponseState;
  modelOutputState: TextAdapterResultCaptureModelOutputState;
  resultPersistenceState: TextAdapterResultCapturePersistenceState;
  auditPersistenceState: TextAdapterResultCapturePersistenceState;
  approvalPersistenceState: TextAdapterResultCapturePersistenceState;
  databaseWriteState: TextAdapterResultCapturePersistenceState;
  fileWriteState: TextAdapterResultCapturePersistenceState;
  explicitFixtureCaptureOnlyNoProviderOutputNoPersistenceStatement:
    TextAdapterResultCaptureFixtureCaptureOnlyNoProviderOutputNoPersistenceStatement;
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureErrorRecord = Readonly<{
  key: TextAdapterResultCaptureErrorKey;
  version: TextAdapterResultCaptureErrorVersion;
  errorState: TextAdapterResultCaptureErrorState;
  textAdapterResultCaptureMvpId: MinimalTextAdapterResultCaptureMvpId;
  failedGateExamples: readonly TextAdapterResultCaptureGateId[];
  missingTextAdapterFixtureResponseExample:
    "Text adapter deterministic fixture response is required.";
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
  retryPosture: TextAdapterResultCaptureRetryPosture;
  fallbackPosture: TextAdapterResultCaptureFallbackPosture;
  explicitNoLiveErrorNoRetryNoFallbackStatement:
    TextAdapterResultCaptureNoLiveErrorNoRetryNoFallbackStatement;
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureGateRecord = Readonly<{
  id: TextAdapterResultCaptureGateId;
  key: `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate:${MinimalTextAdapterResultCaptureMvpId}:${TextAdapterResultCaptureGateId}`;
  version: TextAdapterResultCaptureGateVersion;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureReadinessMatrixRecord = Readonly<{
  id: TextAdapterResultCaptureReadinessMatrixId;
  key: `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-readiness:${MinimalTextAdapterResultCaptureMvpId}:${TextAdapterResultCaptureReadinessMatrixId}`;
  version: TextAdapterResultCaptureReadinessMatrixVersion;
  label: string;
  state: string;
  evidence: string;
  currentReadiness: TextAdapterResultCaptureCurrentReadiness;
  nextSafeAction: string;
} & TextAdapterResultCaptureCommonRecordFields>;

export type TextAdapterResultCaptureSummary = Readonly<{
  version: TextAdapterResultCaptureSummaryVersion;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  captureCount: number;
  currentReadiness: TextAdapterResultCaptureCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type TextAdapterResultCaptureGateSummary = Readonly<{
  version: TextAdapterResultCaptureGateSummaryVersion;
  gateCount: number;
  blockedGateCount: number;
  currentReadiness: TextAdapterResultCaptureCurrentReadiness;
  summaryLines: readonly string[];
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type TextAdapterResultCaptureReadinessSummary = Readonly<{
  version: TextAdapterResultCaptureReadinessSummaryVersion;
  readinessCount: number;
  currentReadiness: TextAdapterResultCaptureCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type MinimalTextAdapterResultCaptureMvpRunInput = Readonly<{
  textAdapterResultCaptureMvpId: MinimalTextAdapterResultCaptureMvpId;
  backendOwnedMode: TextAdapterResultCaptureBackendOwnedPosture;
  serverOnlyMode: TextAdapterResultCaptureServerOnlyPosture;
  resultCaptureMode: TextAdapterResultCaptureResultCapturePosture;
  manualGatedMode: TextAdapterResultCaptureManualGatedPosture;
  fixtureOnlyMode: TextAdapterResultCaptureFixtureOnlyPosture;
  sourceTextAdapterMvp: MinimalTextModelAdapterMvpRecord;
  sourceTextAdapterInput: TextAdapterInputRecord;
  sourceTextAdapterReview:
    BackendOwnedMinimalManualGatedTextAdapterReviewRecord;
  sourceTextAdapterDeterministicFixtureResponse:
    TextAdapterDeterministicFixtureResponseRecord;
  sourceTextAdapterOutputReview: MinimalTextAdapterOutputReviewRecord;
  sourceTextAdapterRedactedPromptEnvelope:
    TextAdapterRedactedPromptEnvelopeRecord;
  sourceSyntheticEndToEndPacketReview:
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord;
  sourceManualApprovalDecisionReview:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord;
  manualApprovalFixture: SyntheticMvpManualApprovalFixtureRecord;
  manualConfirmationFixture: SyntheticMvpManualApprovalFixtureRecord;
  normalizedOperatorIntent:
    TextAdapterResultCaptureNormalizedOperatorIntent;
  promptTransmissionState:
    TextAdapterResultCapturePromptTransmissionState;
  providerSdkImportState:
    TextAdapterResultCaptureProviderSdkImportState;
  providerResponseState:
    TextAdapterResultCaptureProviderResponseState;
  modelOutputState: TextAdapterResultCaptureModelOutputState;
  approvalFixtureState: TextAdapterResultCaptureApprovalFixtureState;
  manualConfirmationFixtureState:
    TextAdapterResultCaptureManualConfirmationFixtureState;
  approvalRecordingState:
    TextAdapterResultCaptureApprovalRecordingState;
  approvalTokenState: TextAdapterResultCaptureApprovalTokenState;
  approvalLeaseState: TextAdapterResultCaptureApprovalLeaseState;
  frontendRequestState: TextAdapterResultCaptureFrontendRequestState;
  apiRouteState: TextAdapterResultCaptureApiRouteState;
  providerExecutionState: TextAdapterResultCaptureProviderCallState;
  modelCallState: TextAdapterResultCaptureModelCallState;
  persistenceTargetPosture:
    TextAdapterResultCapturePersistenceTargetPosture;
  databaseWriteTargetState:
    TextAdapterResultCaptureDatabaseWriteTargetState;
  fileWriteTargetState: TextAdapterResultCaptureFileWriteTargetState;
  queueDispatchState: TextAdapterResultCaptureDispatchState;
  workerDispatchState: TextAdapterResultCaptureDispatchState;
  jobExecutionState: TextAdapterResultCaptureDispatchState;
}>;

export type MinimalTextAdapterResultCaptureMvpServerRunRecord = Readonly<{
  textAdapterResultCaptureMvpId: MinimalTextAdapterResultCaptureMvpId;
  requestLabel: MinimalTextModelAdapterMvpRecord["requestLabel"];
  sourceTextAdapterReviewReference:
    BackendOwnedMinimalManualGatedTextAdapterReviewRecord["key"];
  sourceTextAdapterInputReference: TextAdapterInputKey;
  sourceTextAdapterDeterministicFixtureResponseReference:
    TextAdapterDeterministicFixtureResponseKey;
  sourceTextAdapterOutputReviewReference: MinimalTextAdapterOutputReviewKey;
  sourceTextAdapterRedactedPromptEnvelopeReference:
    TextAdapterRedactedPromptEnvelopeKey;
  captureState: TextAdapterResultCaptureState;
  textAdapterId: MinimalTextModelAdapterPreviewId;
  fixtureResponseId: TextAdapterResponseId;
  captureId: TextAdapterResultCapturePreviewId;
  captureDigest: TextAdapterResultCaptureDigest;
  normalizedOperatorIntent:
    TextAdapterResultCaptureNormalizedOperatorIntent;
  capturedResultPayload: TextAdapterCapturedFixtureResultPayload;
  providerResponseState: TextAdapterResultCaptureProviderResponseState;
  modelOutputState: TextAdapterResultCaptureModelOutputState;
  resultReference: TextAdapterResultCaptureResultReference;
  auditReference: TextAdapterResultCaptureAuditReference;
  approvalReference: TextAdapterResultCaptureApprovalReference;
  evidencePacketReference: TextAdapterResultCaptureEvidenceReference;
  timestampPosture: TextAdapterResultCaptureTimestampPosture;
  persistenceState: TextAdapterResultCapturePersistenceState;
  currentReadiness: TextAdapterResultCaptureCurrentReadiness;
  nextTextAdapterResultCaptureReviewRecoveryChecklist: readonly string[];
}>;
