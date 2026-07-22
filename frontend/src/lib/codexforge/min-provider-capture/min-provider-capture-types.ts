export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH =
  "6026-6057 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_PHASE =
  6057;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5994-6025 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview";

export const MINIMAL_PROVIDER_DRY_RUN_RESULT_CAPTURE_SECTION_TITLES = [
  "Backend-owned minimal manual-gated provider adapter dry-run result capture MVP",
  "Provider adapter dry-run result capture input",
  "Provider adapter dry-run result capture check",
  "Provider adapter dry-run captured fixture result output",
  "Provider adapter dry-run result capture envelope",
  "Provider adapter dry-run result capture gates",
  "Provider adapter dry-run result capture readiness matrix",
  "Provider adapter dry-run result capture evidence preview",
  "Provider adapter dry-run result capture blocked persistence summary",
] as const;

export type MinimalProviderDryRunResultCaptureSectionTitle =
  (typeof MINIMAL_PROVIDER_DRY_RUN_RESULT_CAPTURE_SECTION_TITLES)[number];

export type ProviderDryRunResultCaptureMvpId =
  | "text-chat-provider-dry-run-result-capture"
  | "planning-reasoning-provider-dry-run-result-capture";

export type ProviderDryRunExecutionDependencyId =
  | "text-chat-provider-dry-run-execution"
  | "planning-reasoning-provider-dry-run-execution";

export type ProviderDryRunAdmissionDependencyId =
  | "text-chat-provider-dry-run-admission"
  | "planning-reasoning-provider-dry-run-admission";

export type ProviderDryRunResultCaptureCapabilityFamilyId =
  | "text-chat"
  | "planning-reasoning";

export type ProviderDryRunResultCaptureCapabilityFamilyLabel =
  | "text/chat"
  | "planning/reasoning";

export type ProviderDryRunResultCaptureWorkspaceTarget =
  "Athena Command Center";

export type ProviderDryRunResultCaptureProviderSlotLabel =
  | "OpenAI-compatible text provider dry-run capture slot"
  | "Anthropic-compatible text provider dry-run capture slot"
  | "Gemini-compatible text provider dry-run capture slot"
  | "local/private text provider dry-run capture slot"
  | "fallback disabled dry-run capture slot";

export type ProviderDryRunResultCaptureLocalPrivateAlternativeLabel =
  "local/private text provider dry-run capture slot";

export type ProviderDryRunResultCaptureOpaqueCredentialReferenceLabel =
  | "opaque credential reference label / athena dry-run result capture text chat primary"
  | "opaque credential reference label / athena dry-run result capture planning reasoning primary";

export type ProviderDryRunCapturedFixtureResponseLabel =
  | "deterministic dry-run fixture response / athena text chat result capture preview"
  | "deterministic dry-run fixture response / athena planning reasoning result capture preview";

export type ProviderDryRunResultCaptureVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-mvp-v1";
export type ProviderDryRunResultCaptureInputVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-input-v1";
export type ProviderDryRunResultCaptureCheckVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-check-v1";
export type ProviderDryRunCapturedFixtureResultOutputVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-captured-fixture-result-output-v1";
export type ProviderDryRunResultCaptureEnvelopeVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-envelope-v1";
export type ProviderDryRunResultCaptureEvidencePreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-evidence-preview-v1";
export type ProviderDryRunResultCaptureAuditPreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-audit-preview-v1";
export type ProviderDryRunResultCaptureApprovalPreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-approval-preview-v1";
export type ProviderDryRunResultCaptureSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-safety-gate-summary-v1";
export type ProviderDryRunResultCaptureBlockedPersistenceSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-blocked-persistence-summary-v1";
export type ProviderDryRunResultCaptureReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-readiness-matrix-v1";
export type ProviderDryRunResultCaptureRequestVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-request-v1";
export type ProviderDryRunResultCaptureResponseVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-response-v1";
export type ProviderDryRunResultCaptureErrorVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-error-v1";
export type ProviderDryRunResultCaptureGateVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate-v1";
export type ProviderDryRunResultCaptureSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-summary-v1";
export type ProviderDryRunResultCaptureGateSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate-summary-v1";
export type ProviderDryRunResultCaptureReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-readiness-summary-v1";

export type ProviderDryRunResultCaptureBackendOwnedPosture = "backend-owned";
export type ProviderDryRunResultCaptureServerOnlyPosture = "server-only";
export type ProviderDryRunResultCapturePosture =
  "provider-dry-run-result-capture";
export type ProviderDryRunResultCaptureCredentialReferencePosture =
  "opaque-reference-only";
export type ProviderDryRunResultCaptureManualGatedPosture =
  "manual-gated";
export type ProviderDryRunResultCaptureFixtureOnlyPosture = "fixture-only";
export type ProviderDryRunResultCaptureInMemoryOnlyPosture =
  "in-memory-only";
export type ProviderDryRunResultCaptureNoProviderSdkImport =
  "no provider SDK import";
export type ProviderDryRunResultCaptureNoLiveProviderExecution =
  "no live provider execution";
export type ProviderDryRunResultCaptureNoModelCalls = "no model calls";
export type ProviderDryRunResultCaptureNoPromptSending =
  "no prompt sending";
export type ProviderDryRunResultCaptureNoFrontendRequest =
  "no frontend request";
export type ProviderDryRunResultCaptureNoApiRoute = "no API route";
export type ProviderDryRunResultCaptureNoQueueWorkerJobDispatch =
  "no queue/worker/job dispatch";
export type ProviderDryRunResultCaptureNoPersistence = "no persistence";
export type ProviderDryRunResultCaptureNoDatabaseWrites =
  "no database writes";
export type ProviderDryRunResultCaptureNoFileWrites = "no file writes";
export type ProviderDryRunResultCaptureNoResultPersistence =
  "no result persistence";
export type ProviderDryRunResultCaptureNoAuditPersistence =
  "no audit persistence";
export type ProviderDryRunResultCaptureNoApprovalPersistence =
  "no approval persistence";
export type ProviderDryRunResultCaptureNoApprovalRecording =
  "no approval recording";
export type ProviderDryRunResultCaptureNoApprovalTokenIssuance =
  "no approval token issuance";
export type ProviderDryRunResultCaptureNoApprovalLeaseIssuance =
  "no approval lease issuance";
export type ProviderDryRunResultCaptureCurrentReadiness =
  "minimal-provider-dry-run-result-capture-mvp-only / backend-only / dry-run-fixture-capture-only / credential-reference-only / not-live-provider-executing / not persistent";
export type ProviderDryRunResultCaptureMode =
  "deterministic-fixture-only";
export type ProviderDryRunResultCaptureState =
  "captured-provider-dry-run-fixture-result-in-memory-only";
export type ProviderDryRunResultCaptureInputState =
  "deterministic provider dry-run result capture fixture request only";
export type ProviderDryRunResultCaptureCheckState =
  "validated preview-only result capture gate set";
export type ProviderDryRunCapturedFixtureResultOutputState =
  "captured-provider-dry-run-fixture-result-in-memory-only";
export type ProviderDryRunResultCaptureEnvelopeState =
  "provider dry-run result capture envelope preview only";
export type ProviderDryRunResultCaptureEvidencePreviewState =
  "preview-only / not persisted";
export type ProviderDryRunResultCaptureAuditPreviewState =
  "preview-only / not persisted";
export type ProviderDryRunResultCaptureApprovalPreviewState =
  "preview-only / not persisted";
export type ProviderDryRunResultCaptureGateSummaryState =
  "preview-only blocked dry-run result capture summary";
export type ProviderDryRunResultCaptureBlockedPersistenceState =
  "preview-only blocked persistence summary";
export type ProviderDryRunResultCaptureRequestState =
  "deterministic provider dry-run result capture fixture request only";
export type ProviderDryRunResultCaptureResponseState =
  "returned by server-only smoke/helper only";
export type ProviderDryRunResultCaptureErrorState =
  "deterministic preview only";
export type ProviderDryRunResultCaptureSelectedProviderState =
  "preview-only / not live-executed";
export type ProviderDryRunResultCaptureSelectedProviderPosture =
  "preview slot only";
export type ProviderDryRunResultCapturePreviewOnlyState = "preview-only";
export type ProviderDryRunResultCaptureCredentialReferenceState =
  "opaque reference only / value not read";
export type ProviderDryRunResultCaptureCredentialValueState =
  | "not present"
  | "not present / not read";
export type ProviderDryRunResultCaptureCredentialValuePosture =
  "none / not read";
export type ProviderDryRunResultCaptureEnvVarState = "not read";
export type ProviderDryRunResultCaptureProviderKeyState = "not read";
export type ProviderDryRunResultCaptureProviderSdkImportState =
  "not imported";
export type ProviderDryRunResultCaptureLiveProviderExecutionState =
  "blocked";
export type ProviderDryRunResultCapturePromptPayloadPosture =
  "redacted placeholder only";
export type ProviderDryRunResultCapturePromptTransmissionState =
  "not sent";
export type ProviderDryRunResultCaptureDryRunFixtureResponsePosture =
  "deterministic fixture response only";
export type ProviderDryRunResultCaptureFixtureResponseState =
  "deterministic dry-run fixture captured in memory only";
export type ProviderDryRunResultCaptureProviderPayloadPosture = "none";
export type ProviderDryRunResultCaptureProviderResponseState =
  "not received from provider";
export type ProviderDryRunResultCaptureModelOutputState =
  "not generated by provider/model";
export type ProviderDryRunResultCaptureModelOutputPosture = "none";
export type ProviderDryRunResultCaptureFrontendRequestState =
  "not created";
export type ProviderDryRunResultCaptureApiRouteState = "not created";
export type ProviderDryRunResultCapturePersistenceTargetPosture = "none";
export type ProviderDryRunResultCapturePersistenceState =
  "not implemented";
export type ProviderDryRunResultCaptureDatabaseWriteState =
  "not implemented";
export type ProviderDryRunResultCaptureFileWriteState =
  "not implemented";
export type ProviderDryRunResultCaptureDispatchState = "blocked";
export type ProviderDryRunResultCaptureApprovalFixtureState =
  "preview-only";
export type ProviderDryRunResultCaptureManualConfirmationFixtureState =
  "preview-only";
export type ProviderDryRunResultCaptureApprovalTokenState =
  "not issued";
export type ProviderDryRunResultCaptureApprovalLeaseState =
  "not created";
export type ProviderDryRunResultCaptureApprovalRecordingState =
  "not recorded";
export type ProviderDryRunResultCapturePreviewReferenceState =
  "preview-only / not persisted";
export type ProviderDryRunResultCaptureTimestampPosture =
  "static fixture label only / no real timestamp";
export type ProviderDryRunResultCaptureRetryPosture = "disabled";
export type ProviderDryRunResultCaptureFallbackPosture = "disabled";
export type ProviderDryRunResultCaptureSupportedCapabilityState =
  "supported by text adapter boundary";
export type ProviderDryRunResultCaptureExecutionReviewDependencyState =
  "available / preview-only";
export type ProviderDryRunResultCaptureExecutionOutputDependencyState =
  "available / deterministic fixture-only";
export type ProviderDryRunResultCaptureFixtureResponseDependencyState =
  "available / deterministic fixture-only";
export type ProviderDryRunResultCaptureNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadNoPersistenceStatement =
  "No frontend request. No API route. No provider call. No secret read. No persistence.";
export type ProviderDryRunResultCaptureFixtureOnlyNoProviderOutputNoSecretReadNoPersistenceStatement =
  "Dry-run result capture fixture only. No provider output. No secret read. No persistence.";
export type ProviderDryRunResultCaptureNoLiveErrorNoRetryNoFallbackStatement =
  "No live error. No retry. No fallback.";
export type ProviderDryRunResultCaptureReviewRecoveryNextStatement =
  "provider adapter dry-run result capture review and recovery preview comes next";
export type ProviderDryRunResultCaptureNoFrontendRequestStatement =
  "no frontend request is created";
export type ProviderDryRunResultCaptureNoApiRouteStatement =
  "no API route is created";
export type ProviderDryRunResultCaptureNoProviderCallStatement =
  "no provider call exists";
export type ProviderDryRunResultCaptureNoModelCallStatement =
  "no model call exists";
export type ProviderDryRunResultCaptureNoRealApprovalRequestStatement =
  "no real approval request exists";
export type ProviderDryRunResultCaptureNoRealApprovalRecordingStatement =
  "no real approval recording exists";
export type ProviderDryRunResultCaptureNoApprovalTokenStatement =
  "no approval token exists";
export type ProviderDryRunResultCaptureNoApprovalLeaseStatement =
  "no approval lease exists";

export type ProviderDryRunResultCaptureMvpKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-mvp:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCaptureInputKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-input:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCaptureCheckKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-check:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunCapturedFixtureResultOutputKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-captured-fixture-result-output:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCaptureEnvelopeKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-envelope:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCaptureEvidencePreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-evidence-preview:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCaptureAuditPreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-audit-preview:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCaptureApprovalPreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-approval-preview:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCaptureSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-safety-gate-summary:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCaptureBlockedPersistenceSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-blocked-persistence-summary:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCaptureRequestKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-request:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCaptureResponseKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-response:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCaptureErrorKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-error:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCapturePreviewId =
  `provider-dry-run-result-capture-preview:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunExecutionPreviewIdReference =
  `provider-dry-run-execution-preview:${ProviderDryRunExecutionDependencyId}`;
export type ProviderDryRunAdmissionPreviewIdReference =
  `provider-dry-run-admission-preview:${ProviderDryRunAdmissionDependencyId}`;
export type ProviderDryRunResultCapturePreviewSlotId =
  `provider-dry-run-result-capture-slot-preview:${ProviderDryRunResultCaptureMvpId}:${ProviderDryRunResultCaptureSlotOrder}`;
export type ProviderDryRunResultCapturePreviewCredentialReferenceId =
  `provider-dry-run-result-capture-credential-reference-preview:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCapturePreviewDigest =
  `provider-dry-run-result-capture-digest-preview:${ProviderDryRunResultCaptureMvpId}:fixture-only`;
export type ProviderDryRunResultCapturePreviewResultReference =
  `provider-dry-run-result-capture-result-reference-preview:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCapturePreviewAuditReference =
  `provider-dry-run-result-capture-audit-reference-preview:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCapturePreviewApprovalReference =
  `provider-dry-run-result-capture-approval-reference-preview:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCapturePreviewEvidenceReference =
  `provider-dry-run-result-capture-evidence-reference-preview:${ProviderDryRunResultCaptureMvpId}`;
export type ProviderDryRunResultCapturePreviewPromptReference =
  `provider-dry-run-result-capture-prompt-reference-preview:${ProviderDryRunResultCaptureMvpId}`;

export type ProviderDryRunResultCaptureSlotOrder =
  | "selected"
  | "backup"
  | "local-private";

export type ProviderDryRunResultCaptureGateId =
  | "backend-only-boundary"
  | "server-only-dry-run-result-capture-module-boundary"
  | "provider-dry-run-result-capture-fixture-mode"
  | "provider-dry-run-execution-review-dependency"
  | "provider-dry-run-execution-output-dependency"
  | "provider-dry-run-fixture-response-dependency"
  | "credential-reference-opaque-only-mode"
  | "deterministic-dry-run-result-capture-id"
  | "deterministic-dry-run-execution-id"
  | "deterministic-dry-run-admission-id"
  | "deterministic-provider-slot-id"
  | "deterministic-credential-reference-id"
  | "deterministic-capture-digest"
  | "supported-capability-family"
  | "selected-provider-slot-preview-only"
  | "backup-provider-slot-preview-only"
  | "local-private-alternative-preview-only"
  | "dry-run-fixture-response-only"
  | "live-provider-execution-blocked"
  | "credential-value-absent"
  | "credential-value-not-read"
  | "env-vars-not-read"
  | "provider-key-not-read"
  | "redacted-prompt-envelope-present"
  | "prompt-not-sent"
  | "provider-sdk-not-imported"
  | "provider-response-not-received-from-provider"
  | "model-output-not-generated-by-provider-model"
  | "manual-approval-fixture"
  | "manual-confirmation-fixture"
  | "in-memory-only-capture-reference"
  | "no-real-approval-request"
  | "no-real-approval-recording"
  | "no-approval-token-issuance"
  | "no-approval-lease-issuance"
  | "no-frontend-request"
  | "no-api-route"
  | "no-fetch-network"
  | "no-provider-sdk-import"
  | "no-live-provider-execution"
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

export type ProviderDryRunResultCaptureReadinessId =
  | "server-only-dry-run-result-capture-helper-state"
  | "provider-dry-run-execution-review-dependency-state"
  | "dry-run-result-capture-input-state"
  | "dry-run-result-capture-check-state"
  | "captured-fixture-result-output-state"
  | "result-capture-envelope-state"
  | "evidence-preview-state"
  | "audit-preview-state"
  | "approval-preview-state"
  | "blocked-persistence-summary-state"
  | "credential-value-boundary-state"
  | "env-var-boundary-state"
  | "provider-key-boundary-state"
  | "provider-sdk-boundary-state"
  | "live-provider-execution-boundary-state"
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

export type ProviderDryRunResultCaptureSourceExecutionReviewReference =
  "Backend-owned minimal provider adapter dry-run execution review";
export type ProviderDryRunResultCaptureSourceExecutionAcceptancePostureReference =
  "Provider adapter dry-run execution acceptance posture";
export type ProviderDryRunResultCaptureSourceExecutionAuditSummaryReference =
  "Provider adapter dry-run execution review audit summary";
export type ProviderDryRunResultCaptureSourceExecutionMvpReference =
  "Backend-owned minimal manual-gated provider adapter dry-run execution MVP";
export type ProviderDryRunResultCaptureSourceFixtureResponseReference =
  "Provider adapter dry-run fixture response";
export type ProviderDryRunResultCaptureSourceExecutionOutputReference =
  "Provider adapter dry-run execution output";
export type ProviderDryRunResultCaptureSourceBlockedLiveExecutionSummaryReference =
  "Provider adapter dry-run blocked live execution summary";
export type ProviderDryRunResultCaptureSourceAdmissionReviewReference =
  "Backend-owned minimal provider adapter dry-run admission review";
export type ProviderDryRunResultCaptureSourceSelectionReviewReference =
  "Backend-owned minimal provider adapter selection and credential reference review";
export type ProviderDryRunResultCaptureSourceManualApprovalDecisionReviewReference =
  "Backend-owned synthetic dry-run manual approval decision review";
export type ProviderDryRunResultCaptureNextReviewRecoveryRequirement =
  "6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview";

type ProviderDryRunResultCaptureRecordFields = Readonly<{
  stableId: ProviderDryRunResultCaptureMvpId;
  capabilityFamily: ProviderDryRunResultCaptureCapabilityFamilyLabel;
  workspaceTarget: ProviderDryRunResultCaptureWorkspaceTarget;
  providerSlotLabel: ProviderDryRunResultCaptureProviderSlotLabel;
  backupProviderSlotLabel: ProviderDryRunResultCaptureProviderSlotLabel;
  localPrivateAlternativeLabel: ProviderDryRunResultCaptureLocalPrivateAlternativeLabel;
  opaqueCredentialReferenceLabel: ProviderDryRunResultCaptureOpaqueCredentialReferenceLabel;
  credentialReferencePosture: ProviderDryRunResultCaptureCredentialReferencePosture;
  credentialValueState: ProviderDryRunResultCaptureCredentialValueState;
  envVarState: ProviderDryRunResultCaptureEnvVarState;
  providerKeyState: ProviderDryRunResultCaptureProviderKeyState;
  sourceProviderDryRunExecutionReviewReference: ProviderDryRunResultCaptureSourceExecutionReviewReference;
  sourceProviderDryRunExecutionAcceptancePostureReference: ProviderDryRunResultCaptureSourceExecutionAcceptancePostureReference;
  sourceProviderDryRunExecutionAuditSummaryReference: ProviderDryRunResultCaptureSourceExecutionAuditSummaryReference;
  sourceProviderDryRunExecutionMvpReference: ProviderDryRunResultCaptureSourceExecutionMvpReference;
  sourceProviderDryRunFixtureResponseReference: ProviderDryRunResultCaptureSourceFixtureResponseReference;
  sourceProviderDryRunExecutionOutputReference: ProviderDryRunResultCaptureSourceExecutionOutputReference;
  sourceProviderDryRunBlockedLiveExecutionSummaryReference: ProviderDryRunResultCaptureSourceBlockedLiveExecutionSummaryReference;
  sourceProviderDryRunAdmissionReviewReference: ProviderDryRunResultCaptureSourceAdmissionReviewReference;
  sourceProviderSelectionCredentialReferenceReviewReference: ProviderDryRunResultCaptureSourceSelectionReviewReference;
  sourceManualApprovalDecisionReviewReference: ProviderDryRunResultCaptureSourceManualApprovalDecisionReviewReference;
  backendOwnedPosture: ProviderDryRunResultCaptureBackendOwnedPosture;
  serverOnlyPosture: ProviderDryRunResultCaptureServerOnlyPosture;
  dryRunResultCapturePosture: ProviderDryRunResultCapturePosture;
  manualGatedPosture: ProviderDryRunResultCaptureManualGatedPosture;
  fixtureOnlyPosture: ProviderDryRunResultCaptureFixtureOnlyPosture;
  inMemoryOnlyPosture: ProviderDryRunResultCaptureInMemoryOnlyPosture;
  noProviderSdkImport: ProviderDryRunResultCaptureNoProviderSdkImport;
  noLiveProviderExecution: ProviderDryRunResultCaptureNoLiveProviderExecution;
  noModelCalls: ProviderDryRunResultCaptureNoModelCalls;
  noPromptSending: ProviderDryRunResultCaptureNoPromptSending;
  noFrontendRequest: ProviderDryRunResultCaptureNoFrontendRequest;
  noApiRoute: ProviderDryRunResultCaptureNoApiRoute;
  noQueueWorkerJobDispatch: ProviderDryRunResultCaptureNoQueueWorkerJobDispatch;
  noPersistence: ProviderDryRunResultCaptureNoPersistence;
  noDatabaseWrites: ProviderDryRunResultCaptureNoDatabaseWrites;
  noFileWrites: ProviderDryRunResultCaptureNoFileWrites;
  noResultPersistence: ProviderDryRunResultCaptureNoResultPersistence;
  noAuditPersistence: ProviderDryRunResultCaptureNoAuditPersistence;
  noApprovalPersistence: ProviderDryRunResultCaptureNoApprovalPersistence;
  noApprovalRecording: ProviderDryRunResultCaptureNoApprovalRecording;
  noApprovalTokenIssuance: ProviderDryRunResultCaptureNoApprovalTokenIssuance;
  noApprovalLeaseIssuance: ProviderDryRunResultCaptureNoApprovalLeaseIssuance;
  currentReadiness: ProviderDryRunResultCaptureCurrentReadiness;
  nextReviewRecoveryRequirement: ProviderDryRunResultCaptureNextReviewRecoveryRequirement;
}>;

export type MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: ProviderDryRunResultCaptureMvpKey;
      version: ProviderDryRunResultCaptureVersion;
      captureState: ProviderDryRunResultCaptureState;
      captureMode: ProviderDryRunResultCaptureMode;
      providerDryRunResultCaptureId: ProviderDryRunResultCapturePreviewId;
      providerDryRunExecutionId: ProviderDryRunExecutionPreviewIdReference;
      providerDryRunAdmissionId: ProviderDryRunAdmissionPreviewIdReference;
      providerSlotId: ProviderDryRunResultCapturePreviewSlotId;
      credentialReferenceId: ProviderDryRunResultCapturePreviewCredentialReferenceId;
      captureDigest: ProviderDryRunResultCapturePreviewDigest;
      selectedProviderSlotLabel: ProviderDryRunResultCaptureProviderSlotLabel;
      selectedBackupProviderSlotLabel: ProviderDryRunResultCaptureProviderSlotLabel;
      redactedPromptReference: ProviderDryRunResultCapturePreviewPromptReference;
      capturedDryRunFixtureResponse: ProviderDryRunCapturedFixtureResponseLabel;
      providerResponseState: ProviderDryRunResultCaptureProviderResponseState;
      modelOutputState: ProviderDryRunResultCaptureModelOutputState;
      providerSdkImportState: ProviderDryRunResultCaptureProviderSdkImportState;
      liveProviderExecutionState: ProviderDryRunResultCaptureLiveProviderExecutionState;
      resultReference: ProviderDryRunResultCapturePreviewResultReference;
      auditReference: ProviderDryRunResultCapturePreviewAuditReference;
      approvalReference: ProviderDryRunResultCapturePreviewApprovalReference;
      evidencePacketReference: ProviderDryRunResultCapturePreviewEvidenceReference;
      timestampPosture: ProviderDryRunResultCaptureTimestampPosture;
      persistenceState: ProviderDryRunResultCapturePersistenceState;
      reviewRecoveryPreviewNextStatement: ProviderDryRunResultCaptureReviewRecoveryNextStatement;
      noFrontendRequestStatement: ProviderDryRunResultCaptureNoFrontendRequestStatement;
      noApiRouteStatement: ProviderDryRunResultCaptureNoApiRouteStatement;
      noProviderCallStatement: ProviderDryRunResultCaptureNoProviderCallStatement;
      noModelCallStatement: ProviderDryRunResultCaptureNoModelCallStatement;
      noRealApprovalRequestStatement: ProviderDryRunResultCaptureNoRealApprovalRequestStatement;
      noRealApprovalRecordingStatement: ProviderDryRunResultCaptureNoRealApprovalRecordingStatement;
      noApprovalTokenStatement: ProviderDryRunResultCaptureNoApprovalTokenStatement;
      noApprovalLeaseStatement: ProviderDryRunResultCaptureNoApprovalLeaseStatement;
    }>;

export type ProviderDryRunResultCaptureInputRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: ProviderDryRunResultCaptureInputKey;
      requestVersion: ProviderDryRunResultCaptureInputVersion;
      requestState: ProviderDryRunResultCaptureInputState;
      frontendRequestState: ProviderDryRunResultCaptureFrontendRequestState;
      apiRouteState: ProviderDryRunResultCaptureApiRouteState;
      promptPayloadPosture: ProviderDryRunResultCapturePromptPayloadPosture;
      promptTransmissionState: ProviderDryRunResultCapturePromptTransmissionState;
      selectedProviderPosture: ProviderDryRunResultCaptureSelectedProviderPosture;
      backupProviderPosture: ProviderDryRunResultCaptureSelectedProviderPosture;
      localPrivateAlternativePosture: ProviderDryRunResultCaptureSelectedProviderPosture;
      credentialValuePosture: ProviderDryRunResultCaptureCredentialValuePosture;
      dryRunFixtureResponsePosture: ProviderDryRunResultCaptureDryRunFixtureResponsePosture;
      providerPayloadPosture: ProviderDryRunResultCaptureProviderPayloadPosture;
      modelOutputPosture: ProviderDryRunResultCaptureModelOutputPosture;
      persistenceTargetPosture: ProviderDryRunResultCapturePersistenceTargetPosture;
      explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadNoPersistenceStatement: ProviderDryRunResultCaptureNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadNoPersistenceStatement;
    }>;

export type ProviderDryRunResultCaptureCheckRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: ProviderDryRunResultCaptureCheckKey;
      checkVersion: ProviderDryRunResultCaptureCheckVersion;
      checkState: ProviderDryRunResultCaptureCheckState;
      supportedCapabilityState: ProviderDryRunResultCaptureSupportedCapabilityState;
      providerDryRunExecutionReviewDependencyState: ProviderDryRunResultCaptureExecutionReviewDependencyState;
      providerDryRunExecutionOutputDependencyState: ProviderDryRunResultCaptureExecutionOutputDependencyState;
      providerDryRunFixtureResponseDependencyState: ProviderDryRunResultCaptureFixtureResponseDependencyState;
      selectedProviderSlotState: ProviderDryRunResultCapturePreviewOnlyState;
      backupProviderSlotState: ProviderDryRunResultCapturePreviewOnlyState;
      localPrivateAlternativeState: ProviderDryRunResultCapturePreviewOnlyState;
      providerSdkImportState: ProviderDryRunResultCaptureProviderSdkImportState;
      liveProviderExecutionState: ProviderDryRunResultCaptureLiveProviderExecutionState;
      providerResponseState: ProviderDryRunResultCaptureProviderResponseState;
      modelOutputState: ProviderDryRunResultCaptureModelOutputState;
      promptTransmissionState: ProviderDryRunResultCapturePromptTransmissionState;
      approvalFixtureState: ProviderDryRunResultCaptureApprovalFixtureState;
      manualConfirmationFixtureState: ProviderDryRunResultCaptureManualConfirmationFixtureState;
      frontendRequestState: ProviderDryRunResultCaptureFrontendRequestState;
      apiRouteState: ProviderDryRunResultCaptureApiRouteState;
      resultPersistenceState: ProviderDryRunResultCapturePersistenceState;
      auditPersistenceState: ProviderDryRunResultCapturePersistenceState;
      approvalPersistenceState: ProviderDryRunResultCapturePersistenceState;
      databaseWriteState: ProviderDryRunResultCaptureDatabaseWriteState;
      fileWriteState: ProviderDryRunResultCaptureFileWriteState;
      queueDispatchState: ProviderDryRunResultCaptureDispatchState;
      workerDispatchState: ProviderDryRunResultCaptureDispatchState;
      jobExecutionState: ProviderDryRunResultCaptureDispatchState;
      blockedLiveAction: string;
    }>;

export type ProviderDryRunCapturedFixtureResultOutputRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: ProviderDryRunCapturedFixtureResultOutputKey;
      outputVersion: ProviderDryRunCapturedFixtureResultOutputVersion;
      responseVersion: ProviderDryRunResultCaptureResponseVersion;
      responseState: ProviderDryRunResultCaptureResponseState;
      captureState: ProviderDryRunCapturedFixtureResultOutputState;
      capturedFixtureResponseState: ProviderDryRunResultCaptureFixtureResponseState;
      capturedDryRunFixtureResponse: ProviderDryRunCapturedFixtureResponseLabel;
      selectedProviderState: ProviderDryRunResultCaptureSelectedProviderState;
      credentialReferenceState: ProviderDryRunResultCaptureCredentialReferenceState;
      providerSdkImportState: ProviderDryRunResultCaptureProviderSdkImportState;
      providerResponseState: ProviderDryRunResultCaptureProviderResponseState;
      modelOutputState: ProviderDryRunResultCaptureModelOutputState;
      resultPersistenceState: ProviderDryRunResultCapturePersistenceState;
      auditPersistenceState: ProviderDryRunResultCapturePersistenceState;
      approvalPersistenceState: ProviderDryRunResultCapturePersistenceState;
      databaseWriteState: ProviderDryRunResultCaptureDatabaseWriteState;
      fileWriteState: ProviderDryRunResultCaptureFileWriteState;
      explicitDryRunResultCaptureFixtureOnlyNoProviderOutputNoSecretReadNoPersistenceStatement: ProviderDryRunResultCaptureFixtureOnlyNoProviderOutputNoSecretReadNoPersistenceStatement;
    }>;

export type ProviderDryRunResultCaptureEnvelopeRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: ProviderDryRunResultCaptureEnvelopeKey;
      envelopeVersion: ProviderDryRunResultCaptureEnvelopeVersion;
      envelopeState: ProviderDryRunResultCaptureEnvelopeState;
      redactedPromptEnvelopeLabel: string;
      redactedPromptReference: ProviderDryRunResultCapturePreviewPromptReference;
      promptPayloadPosture: ProviderDryRunResultCapturePromptPayloadPosture;
      promptTransmissionState: ProviderDryRunResultCapturePromptTransmissionState;
      providerPayloadPosture: ProviderDryRunResultCaptureProviderPayloadPosture;
      providerResponseState: ProviderDryRunResultCaptureProviderResponseState;
      modelOutputState: ProviderDryRunResultCaptureModelOutputState;
      resultReference: ProviderDryRunResultCapturePreviewResultReference;
      auditReference: ProviderDryRunResultCapturePreviewAuditReference;
      approvalReference: ProviderDryRunResultCapturePreviewApprovalReference;
      evidencePacketReference: ProviderDryRunResultCapturePreviewEvidenceReference;
      timestampPosture: ProviderDryRunResultCaptureTimestampPosture;
    }>;

export type ProviderDryRunResultCaptureEvidencePreviewRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: ProviderDryRunResultCaptureEvidencePreviewKey;
      evidenceVersion: ProviderDryRunResultCaptureEvidencePreviewVersion;
      evidencePreviewState: ProviderDryRunResultCaptureEvidencePreviewState;
      evidenceReference: ProviderDryRunResultCapturePreviewEvidenceReference;
      evidenceSummaryLines: readonly string[];
    }>;

export type ProviderDryRunResultCaptureAuditPreviewRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: ProviderDryRunResultCaptureAuditPreviewKey;
      auditVersion: ProviderDryRunResultCaptureAuditPreviewVersion;
      auditPreviewState: ProviderDryRunResultCaptureAuditPreviewState;
      auditReference: ProviderDryRunResultCapturePreviewAuditReference;
      auditSummaryLines: readonly string[];
    }>;

export type ProviderDryRunResultCaptureApprovalPreviewRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: ProviderDryRunResultCaptureApprovalPreviewKey;
      approvalVersion: ProviderDryRunResultCaptureApprovalPreviewVersion;
      approvalPreviewState: ProviderDryRunResultCaptureApprovalPreviewState;
      approvalReference: ProviderDryRunResultCapturePreviewApprovalReference;
      approvalFixtureState: ProviderDryRunResultCaptureApprovalFixtureState;
      manualConfirmationFixtureState: ProviderDryRunResultCaptureManualConfirmationFixtureState;
      approvalTokenState: ProviderDryRunResultCaptureApprovalTokenState;
      approvalLeaseState: ProviderDryRunResultCaptureApprovalLeaseState;
      approvalSummaryLines: readonly string[];
    }>;

export type ProviderDryRunResultCaptureSafetyGateSummaryRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: ProviderDryRunResultCaptureSafetyGateSummaryKey;
      gateSummaryVersion: ProviderDryRunResultCaptureSafetyGateSummaryVersion;
      gateSummaryState: ProviderDryRunResultCaptureGateSummaryState;
      gateCount: number;
      summaryLines: readonly string[];
      nextSafeAction: string;
    }>;

export type ProviderDryRunResultCaptureBlockedPersistenceSummaryRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: ProviderDryRunResultCaptureBlockedPersistenceSummaryKey;
      blockedPersistenceSummaryVersion: ProviderDryRunResultCaptureBlockedPersistenceSummaryVersion;
      blockedPersistenceSummaryState: ProviderDryRunResultCaptureBlockedPersistenceState;
      resultPersistenceState: ProviderDryRunResultCapturePersistenceState;
      auditPersistenceState: ProviderDryRunResultCapturePersistenceState;
      approvalPersistenceState: ProviderDryRunResultCapturePersistenceState;
      databaseWriteState: ProviderDryRunResultCaptureDatabaseWriteState;
      fileWriteState: ProviderDryRunResultCaptureFileWriteState;
      queueDispatchState: ProviderDryRunResultCaptureDispatchState;
      workerDispatchState: ProviderDryRunResultCaptureDispatchState;
      jobExecutionState: ProviderDryRunResultCaptureDispatchState;
      blockedTargets: readonly string[];
      nextSafeAction: string;
    }>;

export type ProviderDryRunResultCaptureReadinessMatrixRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-readiness-matrix:${ProviderDryRunResultCaptureMvpId}:${ProviderDryRunResultCaptureReadinessId}`;
      readinessVersion: ProviderDryRunResultCaptureReadinessMatrixVersion;
      readinessId: ProviderDryRunResultCaptureReadinessId;
      label: string;
      state: string;
      evidence: string;
      nextSafeAction: string;
    }>;

export type ProviderDryRunResultCaptureGateRecord = Readonly<{
  key: `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate:${ProviderDryRunResultCaptureMvpId}:${ProviderDryRunResultCaptureGateId}`;
  gateVersion: ProviderDryRunResultCaptureGateVersion;
  stableId: ProviderDryRunResultCaptureMvpId;
  gateId: ProviderDryRunResultCaptureGateId;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
  nextReviewRecoveryRequirement: ProviderDryRunResultCaptureNextReviewRecoveryRequirement;
}>;

export type ProviderDryRunResultCaptureRequestRecord =
  ProviderDryRunResultCaptureInputRecord &
    Readonly<{
      requestKey: ProviderDryRunResultCaptureRequestKey;
    }>;

export type ProviderDryRunResultCaptureResponseRecord =
  ProviderDryRunCapturedFixtureResultOutputRecord &
    Readonly<{
      responseKey: ProviderDryRunResultCaptureResponseKey;
    }>;

export type ProviderDryRunResultCaptureErrorRecord =
  ProviderDryRunResultCaptureRecordFields &
    Readonly<{
      key: ProviderDryRunResultCaptureErrorKey;
      errorVersion: ProviderDryRunResultCaptureErrorVersion;
      errorState: ProviderDryRunResultCaptureErrorState;
      failedGateExamples: readonly ProviderDryRunResultCaptureGateId[];
      missingProviderDryRunExecutionReviewExample: string;
      missingProviderDryRunFixtureResponseExample: string;
      missingProviderDryRunExecutionOutputExample: string;
      missingProviderSlotExample: string;
      missingOpaqueCredentialReferenceExample: string;
      credentialValueDetectedExample: string;
      envVarReadAttemptedExample: string;
      providerSdkImportAttemptedExample: string;
      providerCallAttemptedExample: string;
      modelCallAttemptedExample: string;
      promptTransmissionAttemptedExample: string;
      persistenceAttemptedExample: string;
      databaseWriteAttemptedExample: string;
      fileWriteAttemptedExample: string;
      queueWorkerJobAttemptedExample: string;
      retryPosture: ProviderDryRunResultCaptureRetryPosture;
      fallbackPosture: ProviderDryRunResultCaptureFallbackPosture;
      explicitNoLiveErrorNoRetryNoFallbackStatement: ProviderDryRunResultCaptureNoLiveErrorNoRetryNoFallbackStatement;
    }>;

export type ProviderDryRunResultCaptureSummary = Readonly<{
  version: ProviderDryRunResultCaptureSummaryVersion;
  highestDetectedPhase: number;
  latestCompletedBatch: typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  previousCompletedBatch: typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch: typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  currentReadiness: ProviderDryRunResultCaptureCurrentReadiness;
  captureMode: ProviderDryRunResultCaptureMode;
  summaryLines: readonly string[];
}>;

export type ProviderDryRunResultCaptureGateSummary = Readonly<{
  version: ProviderDryRunResultCaptureGateSummaryVersion;
  gateCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderDryRunResultCaptureReadinessSummary = Readonly<{
  version: ProviderDryRunResultCaptureReadinessSummaryVersion;
  recordCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderDryRunResultCaptureReviewRecoveryChecklist =
  readonly [
    string,
    string,
    string,
    string,
    ProviderDryRunResultCaptureNextReviewRecoveryRequirement,
  ];

export type MinimalProviderDryRunResultCaptureServerRunRecord =
  MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord;
