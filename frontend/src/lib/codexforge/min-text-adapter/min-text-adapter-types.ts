import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  SyntheticMvpManualApprovalFixtureKey,
  SyntheticMvpManualApprovalFixtureRecord,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import type {
  BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord,
  MinimalSyntheticEndToEndPacketReviewId,
  SyntheticEndToEndPacketAcceptancePostureRecord,
  SyntheticEndToEndPacketReviewAuditSummaryRecord,
} from "../min-synth-e2e-review";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH =
  "5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_PHASE =
  5673;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5610-5641 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5674-5705 - Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview";

export const MINIMAL_TEXT_MODEL_ADAPTER_SECTION_TITLES = [
  "Backend-owned minimal manual-gated text model adapter MVP",
  "Text adapter input",
  "Text adapter redacted prompt envelope",
  "Text adapter deterministic fixture response",
  "Text adapter response envelope",
  "Text adapter gates",
  "Text adapter readiness matrix",
  "Text adapter evidence preview",
] as const;

export type MinimalTextModelAdapterMvpId = Extract<
  MinimalSyntheticEndToEndPacketReviewId,
  "conversational-planning-request"
>;

export type MinimalTextModelAdapterCapabilityFamilyId =
  | "text-chat"
  | "planning-reasoning";
export type MinimalTextModelAdapterCapabilityFamilyLabel =
  | "text/chat"
  | "planning/reasoning";
export type MinimalTextModelAdapterWorkspaceTarget =
  BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["workspaceTarget"];
export type MinimalTextModelAdapterProviderSlotLabel =
  BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["providerSlotLabel"];
export type MinimalTextModelAdapterBackupProviderSlotLabel =
  BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["backupProviderSlotLabel"];
export type MinimalTextModelAdapterLocalPrivateAlternativeLabel =
  BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["localPrivateAlternativeLabel"];

export type MinimalTextModelAdapterMvpVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-mvp-v1";
export type MinimalTextModelAdapterRoutingVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-routing-v1";
export type TextAdapterInputVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-input-v1";
export type TextAdapterAdmissionCheckVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-admission-check-v1";
export type TextAdapterNormalizedRequestVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-normalized-request-v1";
export type TextAdapterRedactedPromptEnvelopeVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-redacted-prompt-envelope-v1";
export type TextAdapterDeterministicFixtureResponseVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-deterministic-fixture-response-v1";
export type TextAdapterResponseEnvelopeVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-response-envelope-v1";
export type TextAdapterErrorEnvelopeVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-error-envelope-v1";
export type TextAdapterEvidencePreviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-evidence-preview-v1";
export type TextAdapterAuditPreviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-preview-v1";
export type TextAdapterApprovalPreviewVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-approval-preview-v1";
export type TextAdapterSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-safety-gate-summary-v1";
export type TextAdapterBlockedLiveProviderSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-blocked-live-provider-summary-v1";
export type TextAdapterRequestVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-request-v1";
export type TextAdapterResponseVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-response-v1";
export type TextAdapterErrorVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-error-v1";
export type TextAdapterGateVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-gate-v1";
export type TextAdapterReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-readiness-matrix-v1";
export type TextAdapterSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-summary-v1";
export type TextAdapterGateSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-gate-summary-v1";
export type TextAdapterReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-text-model-adapter-readiness-summary-v1";

export type MinimalTextModelAdapterBackendOwnedPosture = "backend-owned";
export type MinimalTextModelAdapterServerOnlyPosture = "server-only";
export type MinimalTextModelAdapterAdapterBoundaryPosture =
  "adapter-boundary";
export type MinimalTextModelAdapterManualGatedPosture = "manual-gated";
export type MinimalTextModelAdapterFixtureOnlyPosture = "fixture-only";
export type MinimalTextModelAdapterInMemoryOnlyPosture = "in-memory-only";
export type MinimalTextModelAdapterNoProviderExecution =
  "no provider execution";
export type MinimalTextModelAdapterNoModelCalls = "no model calls";
export type MinimalTextModelAdapterNoPromptSending = "no prompt sending";
export type MinimalTextModelAdapterNoFrontendRequest =
  "no frontend request";
export type MinimalTextModelAdapterNoApiRoute = "no API route";
export type MinimalTextModelAdapterNoQueueWorkerJobDispatch =
  "no queue/worker/job dispatch";
export type MinimalTextModelAdapterNoPersistence = "no persistence";
export type MinimalTextModelAdapterNoDatabaseWrites =
  "no database writes";
export type MinimalTextModelAdapterNoFileWrites = "no file writes";
export type MinimalTextModelAdapterNoResultPersistence =
  "no result persistence";
export type MinimalTextModelAdapterNoAuditPersistence =
  "no audit persistence";
export type MinimalTextModelAdapterNoApprovalPersistence =
  "no approval persistence";
export type MinimalTextModelAdapterNoApprovalRecording =
  "no approval recording";
export type MinimalTextModelAdapterNoApprovalTokenIssuance =
  "no approval token issuance";
export type MinimalTextModelAdapterNoApprovalLeaseIssuance =
  "no approval lease issuance";
export type MinimalTextModelAdapterCurrentReadiness =
  "minimal-text-adapter-mvp-only / backend-only / fixture-only / not provider-capable / not persistent";
export type MinimalTextModelAdapterState =
  "completed-text-adapter-fixture-only";
export type TextAdapterRoutingState = "adapter-owned / provider-disabled";
export type TextAdapterAdmissionState =
  "accepted / fixture-only / provider-disabled";
export type TextAdapterInputState = "deterministic text adapter fixture input only";
export type TextAdapterNormalizedRequestState =
  "normalized text adapter fixture request only";
export type TextAdapterPromptEnvelopeState = "redacted preview only";
export type TextAdapterDeterministicFixtureResponseState =
  "deterministic fixture response in memory only";
export type TextAdapterResponseEnvelopeState =
  "fixture response envelope only";
export type TextAdapterErrorEnvelopeState = "preview-only error envelope";
export type TextAdapterRequestState =
  "deterministic text adapter fixture request only";
export type TextAdapterResponseState =
  "returned by server-only smoke/helper only";
export type TextAdapterErrorState = "deterministic preview only";
export type TextAdapterPreviewReferenceState =
  "preview-only / not persisted";
export type TextAdapterPromptPayloadPosture = "redacted placeholder only";
export type TextAdapterPromptTransmissionState = "not sent";
export type TextAdapterProviderPayloadPosture = "none";
export type TextAdapterProviderResponseState = "not received";
export type TextAdapterModelOutputState = "not generated";
export type TextAdapterFrontendRequestState = "not created";
export type TextAdapterApiRouteState = "not created";
export type TextAdapterPersistenceTargetPosture = "none";
export type TextAdapterPersistenceState = "not implemented";
export type TextAdapterDatabaseWriteTargetState = "none";
export type TextAdapterFileWriteTargetState = "none";
export type TextAdapterDispatchState = "blocked";
export type TextAdapterProviderSdkImportState = "not imported";
export type TextAdapterProviderCallState = "blocked";
export type TextAdapterModelCallState = "blocked";
export type TextAdapterApprovalFixtureState = "preview-only";
export type TextAdapterManualConfirmationFixtureState = "preview-only";
export type TextAdapterApprovalRecordingState = "not recorded";
export type TextAdapterApprovalTokenState = "not issued";
export type TextAdapterApprovalLeaseState = "not created";
export type TextAdapterTimestampPosture =
  "static fixture label only / no real timestamp";
export type TextAdapterRetryPosture = "disabled";
export type TextAdapterFallbackPosture = "disabled";
export type TextAdapterNormalizedOperatorIntent = "static fixture only";
export type TextAdapterRedactedPromptPreview = "static placeholder only";
export type TextAdapterDeterministicFixtureResponse =
  "static placeholder only";
export type TextAdapterNoFrontendRequestNoApiRouteNoProviderCallStatement =
  "No frontend request. No API route. No provider call.";
export type TextAdapterFixtureResponseOnlyNoProviderOutputNoPersistenceStatement =
  "Fixture response only. No provider output. No persistence.";
export type TextAdapterNoLiveErrorNoRetryNoFallbackStatement =
  "No live error. No retry. No fallback.";

export type MinimalTextModelAdapterPreviewId =
  `text-model-adapter-preview:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterRequestId =
  `text-model-adapter-request-preview:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterResponseId =
  `text-model-adapter-response-preview:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterDigest =
  `text-model-adapter-digest-preview:${MinimalTextModelAdapterMvpId}:fixture-only`;
export type TextAdapterResultReference =
  `text-model-adapter-result-reference-preview:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterAuditReference =
  `text-model-adapter-audit-reference-preview:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterApprovalReference =
  `text-model-adapter-approval-reference-preview:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterEvidenceReference =
  `text-model-adapter-evidence-reference-preview:${MinimalTextModelAdapterMvpId}`;

export type MinimalTextModelAdapterMvpKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-mvp:${MinimalTextModelAdapterMvpId}`;
export type MinimalTextModelAdapterRoutingKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-routing:${MinimalTextModelAdapterCapabilityFamilyId}`;
export type TextAdapterInputKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-input:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterAdmissionCheckKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-admission-check:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterNormalizedRequestKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-normalized-request:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterRedactedPromptEnvelopeKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-redacted-prompt-envelope:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterDeterministicFixtureResponseKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-deterministic-fixture-response:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterResponseEnvelopeKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-response-envelope:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterErrorEnvelopeKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-error-envelope:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterEvidencePreviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-evidence-preview:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterAuditPreviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-audit-preview:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterApprovalPreviewKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-approval-preview:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-safety-gate-summary:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterBlockedLiveProviderSummaryKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-blocked-live-provider-summary:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterRequestKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-request:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterResponseKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-response:${MinimalTextModelAdapterMvpId}`;
export type TextAdapterErrorKey =
  `backend-owned-minimal-manual-gated-text-model-adapter-error:${MinimalTextModelAdapterMvpId}`;

export type TextAdapterGateId =
  | "backend-only-boundary"
  | "server-only-adapter-module-boundary"
  | "text-adapter-fixture-mode"
  | "synthetic-end-to-end-packet-review-dependency"
  | "manual-approval-fixture"
  | "manual-confirmation-fixture"
  | "deterministic-adapter-id"
  | "deterministic-request-id"
  | "deterministic-response-id"
  | "deterministic-adapter-digest"
  | "redacted-prompt-envelope"
  | "prompt-not-sent"
  | "provider-response-not-received"
  | "model-output-not-generated"
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

export type TextAdapterReadinessMatrixId =
  | "server-only-adapter-helper-state"
  | "synthetic-end-to-end-packet-review-dependency"
  | "text-adapter-input-state"
  | "adapter-admission-check-state"
  | "normalized-request-state"
  | "redacted-prompt-envelope-state"
  | "deterministic-fixture-response-state"
  | "response-envelope-state"
  | "error-envelope-state"
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

export type MinimalTextModelAdapterCommonRecordFields = Readonly<{
  stableId: MinimalTextModelAdapterMvpId;
  capabilityFamily: MinimalTextModelAdapterCapabilityFamilyLabel;
  workspaceTarget: MinimalTextModelAdapterWorkspaceTarget;
  providerSlotLabel: MinimalTextModelAdapterProviderSlotLabel;
  backupProviderSlotLabel: MinimalTextModelAdapterBackupProviderSlotLabel;
  localPrivateAlternativeLabel:
    MinimalTextModelAdapterLocalPrivateAlternativeLabel;
  sourceSyntheticEndToEndPacketReviewReference:
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["key"];
  sourceSyntheticEndToEndPacketAcceptancePostureReference:
    SyntheticEndToEndPacketAcceptancePostureRecord["key"];
  sourceSyntheticEndToEndPacketAuditSummaryReference:
    SyntheticEndToEndPacketReviewAuditSummaryRecord["key"];
  sourceManualApprovalDecisionReviewReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
  sourceManualApprovalFixtureReference: SyntheticMvpManualApprovalFixtureKey;
  sourceManualConfirmationFixtureReference:
    SyntheticMvpManualApprovalFixtureKey;
  backendOwnedPosture: MinimalTextModelAdapterBackendOwnedPosture;
  serverOnlyPosture: MinimalTextModelAdapterServerOnlyPosture;
  adapterBoundaryPosture: MinimalTextModelAdapterAdapterBoundaryPosture;
  manualGatedPosture: MinimalTextModelAdapterManualGatedPosture;
  fixtureOnlyPosture: MinimalTextModelAdapterFixtureOnlyPosture;
  inMemoryOnlyPosture: MinimalTextModelAdapterInMemoryOnlyPosture;
  noProviderExecution: MinimalTextModelAdapterNoProviderExecution;
  noModelCalls: MinimalTextModelAdapterNoModelCalls;
  noPromptSending: MinimalTextModelAdapterNoPromptSending;
  noFrontendRequest: MinimalTextModelAdapterNoFrontendRequest;
  noApiRoute: MinimalTextModelAdapterNoApiRoute;
  noQueueWorkerJobDispatch:
    MinimalTextModelAdapterNoQueueWorkerJobDispatch;
  noPersistence: MinimalTextModelAdapterNoPersistence;
  noDatabaseWrites: MinimalTextModelAdapterNoDatabaseWrites;
  noFileWrites: MinimalTextModelAdapterNoFileWrites;
  noResultPersistence: MinimalTextModelAdapterNoResultPersistence;
  noAuditPersistence: MinimalTextModelAdapterNoAuditPersistence;
  noApprovalPersistence: MinimalTextModelAdapterNoApprovalPersistence;
  noApprovalRecording: MinimalTextModelAdapterNoApprovalRecording;
  noApprovalTokenIssuance:
    MinimalTextModelAdapterNoApprovalTokenIssuance;
  noApprovalLeaseIssuance:
    MinimalTextModelAdapterNoApprovalLeaseIssuance;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type MinimalTextModelAdapterRoutingRecord = Readonly<{
  stableId: MinimalTextModelAdapterCapabilityFamilyId;
  key: MinimalTextModelAdapterRoutingKey;
  version: MinimalTextModelAdapterRoutingVersion;
  capabilityFamilyId: MinimalTextModelAdapterCapabilityFamilyId;
  capabilityFamilyLabel: MinimalTextModelAdapterCapabilityFamilyLabel;
  workspaceTarget: MinimalTextModelAdapterWorkspaceTarget;
  providerSlotLabel: MinimalTextModelAdapterProviderSlotLabel;
  backupProviderSlotLabel: MinimalTextModelAdapterBackupProviderSlotLabel;
  localPrivateAlternativeLabel:
    MinimalTextModelAdapterLocalPrivateAlternativeLabel;
  routingState: TextAdapterRoutingState;
  providerExecutionState: TextAdapterDispatchState;
  summary: string;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type MinimalTextModelAdapterMvpRecord = Readonly<{
  key: MinimalTextModelAdapterMvpKey;
  version: MinimalTextModelAdapterMvpVersion;
  label: "Backend-owned minimal manual-gated text model adapter MVP";
  requestLabel: string;
  adapterState: MinimalTextModelAdapterState;
  textAdapterId: MinimalTextModelAdapterPreviewId;
  requestId: TextAdapterRequestId;
  responseId: TextAdapterResponseId;
  adapterDigest: TextAdapterDigest;
  normalizedOperatorIntent: TextAdapterNormalizedOperatorIntent;
  redactedPromptPreview: TextAdapterRedactedPromptPreview;
  deterministicFixtureResponse: TextAdapterDeterministicFixtureResponse;
  providerResponseState: TextAdapterProviderResponseState;
  modelOutputState: TextAdapterModelOutputState;
  resultReference: TextAdapterResultReference;
  auditReference: TextAdapterAuditReference;
  approvalReference: TextAdapterApprovalReference;
  evidencePacketReference: TextAdapterEvidenceReference;
  timestampPosture: TextAdapterTimestampPosture;
  currentReadiness: MinimalTextModelAdapterCurrentReadiness;
  routingRecordReferences: readonly MinimalTextModelAdapterRoutingKey[];
  safetyGateSummaryReference: TextAdapterSafetyGateSummaryKey;
  blockedLiveProviderSummaryReference:
    TextAdapterBlockedLiveProviderSummaryKey;
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterInputRecord = Readonly<{
  key: TextAdapterInputKey;
  version: TextAdapterInputVersion;
  inputState: TextAdapterInputState;
  frontendRequestState: TextAdapterFrontendRequestState;
  apiRouteState: TextAdapterApiRouteState;
  operatorIntentSource: "synthetic end-to-end packet review fixture";
  promptPayloadPosture: TextAdapterPromptPayloadPosture;
  promptTransmissionState: TextAdapterPromptTransmissionState;
  providerPayloadPosture: TextAdapterProviderPayloadPosture;
  modelOutputPosture: "none";
  persistenceTargetPosture: TextAdapterPersistenceTargetPosture;
  explicitNoFrontendRequestNoApiRouteNoProviderCallStatement:
    TextAdapterNoFrontendRequestNoApiRouteNoProviderCallStatement;
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterAdmissionCheckRecord = Readonly<{
  key: TextAdapterAdmissionCheckKey;
  version: TextAdapterAdmissionCheckVersion;
  admissionState: TextAdapterAdmissionState;
  acceptedFixtureId: MinimalTextModelAdapterMvpId;
  backendOnlyCheck: "passed";
  serverOnlyCheck: "passed";
  fixtureOnlyCheck: "passed";
  providerExecutionCheck: "blocked";
  persistenceCheck: "blocked";
  nextSafeAction: string;
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterNormalizedRequestRecord = Readonly<{
  key: TextAdapterNormalizedRequestKey;
  version: TextAdapterNormalizedRequestVersion;
  normalizedRequestState: TextAdapterNormalizedRequestState;
  textAdapterId: MinimalTextModelAdapterPreviewId;
  normalizedOperatorIntent: TextAdapterNormalizedOperatorIntent;
  selectedRoutingFamilyId: MinimalTextModelAdapterCapabilityFamilyId;
  selectedRoutingFamilyLabel: MinimalTextModelAdapterCapabilityFamilyLabel;
  routingRecordReference: MinimalTextModelAdapterRoutingKey;
  promptPayloadPosture: TextAdapterPromptPayloadPosture;
  persistenceTargetPosture: TextAdapterPersistenceTargetPosture;
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterRedactedPromptEnvelopeRecord = Readonly<{
  key: TextAdapterRedactedPromptEnvelopeKey;
  version: TextAdapterRedactedPromptEnvelopeVersion;
  promptEnvelopeState: TextAdapterPromptEnvelopeState;
  normalizedRequestReference: TextAdapterNormalizedRequestKey;
  redactedPromptPreview: TextAdapterRedactedPromptPreview;
  promptPayloadPosture: TextAdapterPromptPayloadPosture;
  promptTransmissionState: TextAdapterPromptTransmissionState;
  providerPayloadPosture: TextAdapterProviderPayloadPosture;
  privacyRedactionPosture: "preview-only";
  killSwitchState: "fixture-only";
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterDeterministicFixtureResponseRecord = Readonly<{
  key: TextAdapterDeterministicFixtureResponseKey;
  version: TextAdapterDeterministicFixtureResponseVersion;
  fixtureResponseState: TextAdapterDeterministicFixtureResponseState;
  responseId: TextAdapterResponseId;
  deterministicFixtureResponse: TextAdapterDeterministicFixtureResponse;
  providerResponseState: TextAdapterProviderResponseState;
  modelOutputState: TextAdapterModelOutputState;
  resultReference: TextAdapterResultReference;
  resultReferenceState: TextAdapterPreviewReferenceState;
  explicitFixtureResponseOnlyNoProviderOutputNoPersistenceStatement:
    TextAdapterFixtureResponseOnlyNoProviderOutputNoPersistenceStatement;
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterResponseEnvelopeRecord = Readonly<{
  key: TextAdapterResponseEnvelopeKey;
  version: TextAdapterResponseEnvelopeVersion;
  responseEnvelopeState: TextAdapterResponseEnvelopeState;
  requestReference: TextAdapterRequestKey;
  responseReference: TextAdapterResponseKey;
  errorReference: TextAdapterErrorKey;
  inputReference: TextAdapterInputKey;
  admissionCheckReference: TextAdapterAdmissionCheckKey;
  normalizedRequestReference: TextAdapterNormalizedRequestKey;
  redactedPromptEnvelopeReference: TextAdapterRedactedPromptEnvelopeKey;
  fixtureResponseReference: TextAdapterDeterministicFixtureResponseKey;
  evidencePreviewReference: TextAdapterEvidencePreviewKey;
  auditPreviewReference: TextAdapterAuditPreviewKey;
  approvalPreviewReference: TextAdapterApprovalPreviewKey;
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterErrorEnvelopeRecord = Readonly<{
  key: TextAdapterErrorEnvelopeKey;
  version: TextAdapterErrorEnvelopeVersion;
  errorEnvelopeState: TextAdapterErrorEnvelopeState;
  requestReference: TextAdapterRequestKey;
  responseReference: TextAdapterResponseKey;
  errorReference: TextAdapterErrorKey;
  representativeFailureExamples: readonly TextAdapterGateId[];
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterEvidencePreviewRecord = Readonly<{
  key: TextAdapterEvidencePreviewKey;
  version: TextAdapterEvidencePreviewVersion;
  evidenceReference: TextAdapterEvidenceReference;
  evidencePreviewState: TextAdapterPreviewReferenceState;
  evidenceSummaryLines: readonly string[];
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterAuditPreviewRecord = Readonly<{
  key: TextAdapterAuditPreviewKey;
  version: TextAdapterAuditPreviewVersion;
  auditReference: TextAdapterAuditReference;
  auditPreviewState: TextAdapterPreviewReferenceState;
  auditSummaryLines: readonly string[];
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterApprovalPreviewRecord = Readonly<{
  key: TextAdapterApprovalPreviewKey;
  version: TextAdapterApprovalPreviewVersion;
  approvalReference: TextAdapterApprovalReference;
  approvalPreviewState: TextAdapterPreviewReferenceState;
  approvalFixtureState: TextAdapterApprovalFixtureState;
  manualConfirmationFixtureState:
    TextAdapterManualConfirmationFixtureState;
  approvalTokenState: TextAdapterApprovalTokenState;
  approvalLeaseState: TextAdapterApprovalLeaseState;
  approvalSummaryLines: readonly string[];
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterSafetyGateSummaryRecord = Readonly<{
  key: TextAdapterSafetyGateSummaryKey;
  version: TextAdapterSafetyGateSummaryVersion;
  serverOnlyHelperStatement: "server-only text adapter helper exists";
  deterministicFixtureStatement:
    "text adapter output is deterministic fixture output only";
  redactedPromptStatement: "redacted prompt envelope is preview-only";
  providerCapabilityStatement:
    "text adapter is not provider-capable yet";
  currentReadiness: MinimalTextModelAdapterCurrentReadiness;
  summaryLines: readonly string[];
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterBlockedLiveProviderSummaryRecord = Readonly<{
  key: TextAdapterBlockedLiveProviderSummaryKey;
  version: TextAdapterBlockedLiveProviderSummaryVersion;
  blockedLiveActions: readonly string[];
  providerExecutionState: TextAdapterDispatchState;
  persistenceState: TextAdapterPersistenceState;
  summaryLines: readonly string[];
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterRequestRecord = Readonly<{
  key: TextAdapterRequestKey;
  version: TextAdapterRequestVersion;
  requestState: TextAdapterRequestState;
  textAdapterMvpId: MinimalTextModelAdapterMvpId;
  frontendRequestState: TextAdapterFrontendRequestState;
  apiRouteState: TextAdapterApiRouteState;
  promptPayloadPosture: TextAdapterPromptPayloadPosture;
  promptTransmissionState: TextAdapterPromptTransmissionState;
  providerPayloadPosture: TextAdapterProviderPayloadPosture;
  modelOutputPosture: "none";
  persistenceTargetPosture: TextAdapterPersistenceTargetPosture;
  explicitNoFrontendRequestNoApiRouteNoProviderCallStatement:
    TextAdapterNoFrontendRequestNoApiRouteNoProviderCallStatement;
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterResponseRecord = Readonly<{
  key: TextAdapterResponseKey;
  version: TextAdapterResponseVersion;
  responseState: TextAdapterResponseState;
  textAdapterMvpId: MinimalTextModelAdapterMvpId;
  adapterState: MinimalTextModelAdapterState;
  fixtureResponseState: TextAdapterDeterministicFixtureResponseState;
  providerResponseState: TextAdapterProviderResponseState;
  modelOutputState: TextAdapterModelOutputState;
  resultPersistenceState: TextAdapterPersistenceState;
  auditPersistenceState: TextAdapterPersistenceState;
  approvalPersistenceState: TextAdapterPersistenceState;
  databaseWriteState: TextAdapterPersistenceState;
  fileWriteState: TextAdapterPersistenceState;
  explicitFixtureResponseOnlyNoProviderOutputNoPersistenceStatement:
    TextAdapterFixtureResponseOnlyNoProviderOutputNoPersistenceStatement;
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterErrorRecord = Readonly<{
  key: TextAdapterErrorKey;
  version: TextAdapterErrorVersion;
  errorState: TextAdapterErrorState;
  textAdapterMvpId: MinimalTextModelAdapterMvpId;
  failedGateExamples: readonly TextAdapterGateId[];
  missingSyntheticEndToEndPacketReviewExample:
    "Synthetic end-to-end packet review fixture is required.";
  missingManualApprovalFixtureExample:
    "Manual approval fixture is required.";
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
  retryPosture: TextAdapterRetryPosture;
  fallbackPosture: TextAdapterFallbackPosture;
  explicitNoLiveErrorNoRetryNoFallbackStatement:
    TextAdapterNoLiveErrorNoRetryNoFallbackStatement;
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterGateRecord = Readonly<{
  id: TextAdapterGateId;
  key: `${TextAdapterGateId}:${MinimalTextModelAdapterMvpId}`;
  version: TextAdapterGateVersion;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterReadinessMatrixRecord = Readonly<{
  id: TextAdapterReadinessMatrixId;
  key: `${TextAdapterReadinessMatrixId}:${MinimalTextModelAdapterMvpId}`;
  version: TextAdapterReadinessMatrixVersion;
  label: string;
  state: string;
  evidence: string;
  currentReadiness: MinimalTextModelAdapterCurrentReadiness;
  nextSafeAction: string;
} & MinimalTextModelAdapterCommonRecordFields>;

export type TextAdapterSummary = Readonly<{
  version: TextAdapterSummaryVersion;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH;
  adapterCount: number;
  routingCount: number;
  currentReadiness: MinimalTextModelAdapterCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type TextAdapterGateSummary = Readonly<{
  version: TextAdapterGateSummaryVersion;
  gateCount: number;
  currentReadiness: MinimalTextModelAdapterCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type TextAdapterReadinessSummary = Readonly<{
  version: TextAdapterReadinessSummaryVersion;
  readinessCount: number;
  currentReadiness: MinimalTextModelAdapterCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type MinimalTextModelAdapterMvpRunInput = Readonly<{
  textAdapterMvpId: MinimalTextModelAdapterMvpId;
  backendOwnedMode: MinimalTextModelAdapterBackendOwnedPosture;
  serverOnlyMode: MinimalTextModelAdapterServerOnlyPosture;
  adapterBoundaryMode: MinimalTextModelAdapterAdapterBoundaryPosture;
  manualGatedMode: MinimalTextModelAdapterManualGatedPosture;
  fixtureOnlyMode: MinimalTextModelAdapterFixtureOnlyPosture;
  sourceSyntheticEndToEndPacketReview:
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord;
  sourceSyntheticEndToEndPacketAcceptancePosture:
    SyntheticEndToEndPacketAcceptancePostureRecord;
  sourceSyntheticEndToEndPacketAuditSummary:
    SyntheticEndToEndPacketReviewAuditSummaryRecord;
  sourceManualApprovalDecisionReview:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord;
  manualApprovalFixture: SyntheticMvpManualApprovalFixtureRecord;
  manualConfirmationFixture: SyntheticMvpManualApprovalFixtureRecord;
  normalizedOperatorIntent: TextAdapterNormalizedOperatorIntent;
  promptPayloadPosture: TextAdapterPromptPayloadPosture;
  promptTransmissionState: TextAdapterPromptTransmissionState;
  providerPayloadPosture: TextAdapterProviderPayloadPosture;
  providerResponseState: TextAdapterProviderResponseState;
  modelOutputState: TextAdapterModelOutputState;
  approvalFixtureState: TextAdapterApprovalFixtureState;
  manualConfirmationFixtureState:
    TextAdapterManualConfirmationFixtureState;
  approvalRecordingState: TextAdapterApprovalRecordingState;
  approvalTokenState: TextAdapterApprovalTokenState;
  approvalLeaseState: TextAdapterApprovalLeaseState;
  frontendRequestState: TextAdapterFrontendRequestState;
  apiRouteState: TextAdapterApiRouteState;
  persistenceTargetPosture: TextAdapterPersistenceTargetPosture;
  databaseWriteTargetState: TextAdapterDatabaseWriteTargetState;
  fileWriteTargetState: TextAdapterFileWriteTargetState;
  queueDispatchState: TextAdapterDispatchState;
  workerDispatchState: TextAdapterDispatchState;
  jobExecutionState: TextAdapterDispatchState;
  providerSdkImportState: TextAdapterProviderSdkImportState;
  providerExecutionState: TextAdapterProviderCallState;
  modelCallState: TextAdapterModelCallState;
}>;

export type MinimalTextModelAdapterMvpServerRunRecord = Readonly<{
  textAdapterMvpId: MinimalTextModelAdapterMvpId;
  requestLabel: string;
  sourceSyntheticEndToEndPacketReviewReference:
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["key"];
  sourceSyntheticEndToEndPacketAcceptancePostureReference:
    SyntheticEndToEndPacketAcceptancePostureRecord["key"];
  sourceSyntheticEndToEndPacketAuditSummaryReference:
    SyntheticEndToEndPacketReviewAuditSummaryRecord["key"];
  sourceManualApprovalDecisionReviewReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
  sourceManualApprovalFixtureReference: SyntheticMvpManualApprovalFixtureKey;
  sourceManualConfirmationFixtureReference:
    SyntheticMvpManualApprovalFixtureKey;
  adapterState: MinimalTextModelAdapterState;
  textAdapterId: MinimalTextModelAdapterPreviewId;
  requestId: TextAdapterRequestId;
  responseId: TextAdapterResponseId;
  adapterDigest: TextAdapterDigest;
  normalizedOperatorIntent: TextAdapterNormalizedOperatorIntent;
  redactedPromptPreview: TextAdapterRedactedPromptPreview;
  deterministicFixtureResponse: TextAdapterDeterministicFixtureResponse;
  providerResponseState: TextAdapterProviderResponseState;
  modelOutputState: TextAdapterModelOutputState;
  resultReference: TextAdapterResultReference;
  auditReference: TextAdapterAuditReference;
  approvalReference: TextAdapterApprovalReference;
  evidencePacketReference: TextAdapterEvidenceReference;
  timestampPosture: TextAdapterTimestampPosture;
  persistenceState: TextAdapterPersistenceState;
  currentReadiness: MinimalTextModelAdapterCurrentReadiness;
  nextTextAdapterReviewRecoveryChecklist: readonly string[];
}>;
