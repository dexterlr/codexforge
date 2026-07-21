export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH =
  "5962-5993 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_PHASE =
  5993;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5930-5961 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5994-6025 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview";

export const MINIMAL_PROVIDER_DRY_RUN_EXECUTION_SECTION_TITLES = [
  "Backend-owned minimal manual-gated provider adapter dry-run execution MVP",
  "Provider adapter dry-run execution input",
  "Provider adapter dry-run execution plan",
  "Provider adapter dry-run execution output",
  "Provider adapter dry-run execution envelope",
  "Provider adapter dry-run fixture response",
  "Provider adapter dry-run blocked live execution summary",
  "Provider adapter dry-run execution gates",
  "Provider adapter dry-run execution readiness matrix",
  "Provider adapter dry-run execution evidence preview",
] as const;

export type MinimalProviderDryRunExecutionSectionTitle =
  (typeof MINIMAL_PROVIDER_DRY_RUN_EXECUTION_SECTION_TITLES)[number];

export type ProviderDryRunExecutionMvpId =
  | "text-chat-provider-dry-run-execution"
  | "planning-reasoning-provider-dry-run-execution";

export type ProviderDryRunExecutionCapabilityFamilyId =
  | "text-chat"
  | "planning-reasoning";

export type ProviderDryRunExecutionCapabilityFamilyLabel =
  | "text/chat"
  | "planning/reasoning";

export type ProviderDryRunExecutionWorkspaceTarget = "Athena Command Center";

export type ProviderDryRunExecutionProviderSlotLabel =
  | "OpenAI-compatible text provider dry-run execution slot"
  | "Anthropic-compatible text provider dry-run execution slot"
  | "Gemini-compatible text provider dry-run execution slot"
  | "local/private text provider dry-run execution slot"
  | "fallback disabled dry-run execution slot";

export type ProviderDryRunExecutionLocalPrivateAlternativeLabel =
  "local/private text provider dry-run execution slot";

export type ProviderDryRunExecutionOpaqueCredentialReferenceLabel =
  | "opaque credential reference label / athena dry-run execution text chat primary"
  | "opaque credential reference label / athena dry-run execution planning reasoning primary";

export type ProviderDryRunExecutionFixtureProviderResponse =
  | "deterministic dry-run fixture response / athena text chat provider preview"
  | "deterministic dry-run fixture response / athena planning reasoning provider preview";

export type ProviderDryRunExecutionVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-mvp-v1";
export type ProviderDryRunExecutionInputVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-input-v1";
export type ProviderDryRunExecutionPlanVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-plan-v1";
export type ProviderDryRunExecutionOutputVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-output-v1";
export type ProviderDryRunExecutionEnvelopeVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-envelope-v1";
export type ProviderDryRunFixtureResponseVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-fixture-response-v1";
export type ProviderDryRunBlockedLiveExecutionSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-blocked-live-execution-summary-v1";
export type ProviderDryRunEvidencePreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-evidence-preview-v1";
export type ProviderDryRunAuditPreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-audit-preview-v1";
export type ProviderDryRunApprovalPreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-approval-preview-v1";
export type ProviderDryRunSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-safety-gate-summary-v1";
export type ProviderDryRunReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-readiness-matrix-v1";
export type ProviderDryRunExecutionRequestVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-request-v1";
export type ProviderDryRunExecutionResponseVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-response-v1";
export type ProviderDryRunExecutionErrorVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-error-v1";
export type ProviderDryRunExecutionGateVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-gate-v1";
export type ProviderDryRunExecutionSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-summary-v1";
export type ProviderDryRunExecutionGateSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-gate-summary-v1";
export type ProviderDryRunExecutionReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-readiness-summary-v1";

export type ProviderDryRunExecutionBackendOwnedPosture = "backend-owned";
export type ProviderDryRunExecutionServerOnlyPosture = "server-only";
export type ProviderDryRunExecutionPosture = "provider-dry-run-execution";
export type ProviderDryRunExecutionCredentialReferencePosture =
  "opaque-reference-only";
export type ProviderDryRunExecutionManualGatedPosture = "manual-gated";
export type ProviderDryRunExecutionFixtureOnlyPosture = "fixture-only";
export type ProviderDryRunExecutionInMemoryOnlyPosture = "in-memory-only";
export type ProviderDryRunExecutionNoProviderSdkImport =
  "no provider SDK import";
export type ProviderDryRunExecutionNoLiveProviderExecution =
  "no live provider execution";
export type ProviderDryRunExecutionNoModelCalls = "no model calls";
export type ProviderDryRunExecutionNoPromptSending = "no prompt sending";
export type ProviderDryRunExecutionNoFrontendRequest = "no frontend request";
export type ProviderDryRunExecutionNoApiRoute = "no API route";
export type ProviderDryRunExecutionNoQueueWorkerJobDispatch =
  "no queue/worker/job dispatch";
export type ProviderDryRunExecutionNoPersistence = "no persistence";
export type ProviderDryRunExecutionNoDatabaseWrites = "no database writes";
export type ProviderDryRunExecutionNoFileWrites = "no file writes";
export type ProviderDryRunExecutionNoResultPersistence =
  "no result persistence";
export type ProviderDryRunExecutionNoAuditPersistence =
  "no audit persistence";
export type ProviderDryRunExecutionNoApprovalPersistence =
  "no approval persistence";
export type ProviderDryRunExecutionNoApprovalRecording =
  "no approval recording";
export type ProviderDryRunExecutionNoApprovalTokenIssuance =
  "no approval token issuance";
export type ProviderDryRunExecutionNoApprovalLeaseIssuance =
  "no approval lease issuance";
export type ProviderDryRunExecutionCurrentReadiness =
  "minimal-provider-dry-run-execution-mvp-only / backend-only / dry-run-fixture-only / credential-reference-only / not-live-provider-executing / not persistent";
export type ProviderDryRunExecutionMode = "deterministic-fixture-only";
export type ProviderDryRunExecutionState =
  "executed-provider-dry-run-fixture-in-memory-only";
export type ProviderDryRunExecutionInputState =
  "deterministic provider dry-run execution fixture input only";
export type ProviderDryRunExecutionPlanState =
  "preview-only dry-run execution plan";
export type ProviderDryRunExecutionOutputState =
  "executed-provider-dry-run-fixture-in-memory-only";
export type ProviderDryRunExecutionEnvelopeState =
  "provider dry-run execution envelope preview only";
export type ProviderDryRunFixtureResponseState =
  "deterministic dry-run fixture response only";
export type ProviderDryRunBlockedLiveExecutionState =
  "preview-only blocked live execution summary";
export type ProviderDryRunEvidencePreviewState =
  "preview-only / not persisted";
export type ProviderDryRunAuditPreviewState = "preview-only / not persisted";
export type ProviderDryRunApprovalPreviewState =
  "preview-only / not persisted";
export type ProviderDryRunGateSummaryState =
  "preview-only blocked dry-run execution summary";
export type ProviderDryRunRequestState =
  "deterministic provider dry-run execution fixture request only";
export type ProviderDryRunResponseState =
  "returned by server-only smoke/helper only";
export type ProviderDryRunErrorState = "deterministic preview only";
export type ProviderDryRunSelectedProviderState =
  "preview-only / not live-executed";
export type ProviderDryRunSelectedProviderPosture = "preview slot only";
export type ProviderDryRunPreviewOnlyState = "preview-only";
export type ProviderDryRunCredentialReferenceState =
  "opaque reference only / value not read";
export type ProviderDryRunCredentialValueState =
  | "not present"
  | "not present / not read";
export type ProviderDryRunCredentialValuePosture = "none / not read";
export type ProviderDryRunEnvVarState = "not read";
export type ProviderDryRunProviderKeyState = "not read";
export type ProviderDryRunProviderSdkImportState = "not imported";
export type ProviderDryRunLiveProviderExecutionState = "blocked";
export type ProviderDryRunPromptPayloadPosture =
  "redacted placeholder only";
export type ProviderDryRunPromptTransmissionState = "not sent";
export type ProviderDryRunProviderPayloadPosture = "none";
export type ProviderDryRunProviderResponseState =
  "not received from provider";
export type ProviderDryRunModelOutputState =
  "not generated by provider/model";
export type ProviderDryRunModelOutputPosture = "none";
export type ProviderDryRunFrontendRequestState = "not created";
export type ProviderDryRunApiRouteState = "not created";
export type ProviderDryRunPersistenceTargetPosture = "none";
export type ProviderDryRunPersistenceState = "not implemented";
export type ProviderDryRunDatabaseWriteState = "not implemented";
export type ProviderDryRunFileWriteState = "not implemented";
export type ProviderDryRunDispatchState = "blocked";
export type ProviderDryRunApprovalFixtureState = "preview-only";
export type ProviderDryRunManualConfirmationFixtureState = "preview-only";
export type ProviderDryRunApprovalTokenState = "not issued";
export type ProviderDryRunApprovalLeaseState = "not created";
export type ProviderDryRunApprovalRecordingState = "not recorded";
export type ProviderDryRunPreviewReferenceState =
  "preview-only / not persisted";
export type ProviderDryRunTimestampPosture =
  "static fixture label only / no real timestamp";
export type ProviderDryRunRetryPosture = "disabled";
export type ProviderDryRunFallbackPosture = "disabled";
export type ProviderDryRunSupportedCapabilityState =
  "supported by text adapter boundary";
export type ProviderDryRunNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement =
  "No frontend request. No API route. No provider call. No secret read.";
export type ProviderDryRunExecutionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement =
  "Dry-run execution fixture only. No provider output. No secret read. No persistence.";
export type ProviderDryRunNoLiveErrorNoRetryNoFallbackStatement =
  "No live error. No retry. No fallback.";
export type ProviderDryRunExecutionReviewRecoveryNextStatement =
  "provider adapter dry-run execution review and recovery preview comes next";
export type ProviderDryRunNoFrontendRequestStatement =
  "no frontend request is created";
export type ProviderDryRunNoApiRouteStatement = "no API route is created";
export type ProviderDryRunNoProviderCallStatement = "no provider call exists";
export type ProviderDryRunNoModelCallStatement = "no model call exists";
export type ProviderDryRunNoRealApprovalRequestStatement =
  "no real approval request exists";
export type ProviderDryRunNoRealApprovalRecordingStatement =
  "no real approval recording exists";
export type ProviderDryRunNoApprovalTokenStatement =
  "no approval token exists";
export type ProviderDryRunNoApprovalLeaseStatement =
  "no approval lease exists";

export type ProviderDryRunExecutionMvpKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-mvp:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunExecutionInputKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-input:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunExecutionPlanKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-plan:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunExecutionOutputKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-output:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunExecutionEnvelopeKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-envelope:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunFixtureResponseKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-fixture-response:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunBlockedLiveExecutionSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-blocked-live-execution-summary:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunEvidencePreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-evidence-preview:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunAuditPreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-audit-preview:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunApprovalPreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-approval-preview:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-safety-gate-summary:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunExecutionRequestKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-request:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunExecutionResponseKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-response:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunExecutionErrorKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-error:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunExecutionPreviewId =
  `provider-dry-run-execution-preview:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunAdmissionPreviewId =
  `provider-dry-run-admission-preview:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunPreviewSlotId =
  `provider-dry-run-execution-slot-preview:${ProviderDryRunExecutionMvpId}:${ProviderDryRunSlotOrder}`;
export type ProviderDryRunPreviewCredentialReferenceId =
  `provider-dry-run-execution-credential-reference-preview:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunPreviewDigest =
  `provider-dry-run-execution-digest-preview:${ProviderDryRunExecutionMvpId}:fixture-only`;
export type ProviderDryRunPreviewResultReference =
  `provider-dry-run-execution-result-reference-preview:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunPreviewAuditReference =
  `provider-dry-run-execution-audit-reference-preview:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunPreviewApprovalReference =
  `provider-dry-run-execution-approval-reference-preview:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunPreviewEvidenceReference =
  `provider-dry-run-execution-evidence-reference-preview:${ProviderDryRunExecutionMvpId}`;
export type ProviderDryRunPreviewPromptReference =
  `provider-dry-run-execution-prompt-reference-preview:${ProviderDryRunExecutionMvpId}`;

export type ProviderDryRunSlotOrder =
  | "selected"
  | "backup"
  | "local-private";

export type ProviderDryRunExecutionGateId =
  | "backend-only-boundary"
  | "server-only-dry-run-execution-module-boundary"
  | "provider-dry-run-execution-fixture-mode"
  | "provider-dry-run-admission-review-dependency"
  | "provider-dry-run-admission-output-dependency"
  | "credential-reference-opaque-only-mode"
  | "deterministic-provider-dry-run-execution-id"
  | "deterministic-provider-dry-run-admission-id"
  | "deterministic-provider-slot-id"
  | "deterministic-credential-reference-id"
  | "deterministic-execution-digest"
  | "supported-capability-family"
  | "selected-provider-slot-preview-only"
  | "backup-provider-slot-preview-only"
  | "local-private-alternative-preview-only"
  | "dry-run-intent-preview-only"
  | "fixture-response-only"
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
  | "in-memory-only-execution-reference"
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

export type ProviderDryRunReadinessId =
  | "server-only-dry-run-execution-helper-state"
  | "provider-dry-run-admission-review-dependency-state"
  | "provider-dry-run-execution-input-state"
  | "provider-dry-run-execution-plan-state"
  | "provider-dry-run-execution-output-state"
  | "provider-dry-run-execution-envelope-state"
  | "provider-dry-run-fixture-response-state"
  | "provider-dry-run-blocked-live-execution-summary-state"
  | "provider-dry-run-evidence-preview-state"
  | "provider-dry-run-audit-preview-state"
  | "provider-dry-run-approval-preview-state"
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

export type ProviderDryRunExecutionSourceAdmissionReviewReference =
  "Backend-owned minimal provider adapter dry-run admission review";
export type ProviderDryRunExecutionSourceAdmissionAcceptancePostureReference =
  "Provider adapter dry-run admission acceptance posture";
export type ProviderDryRunExecutionSourceAdmissionAuditSummaryReference =
  "Provider adapter dry-run admission review audit summary";
export type ProviderDryRunExecutionSourceAdmissionMvpReference =
  "Backend-owned minimal manual-gated provider adapter dry-run admission MVP";
export type ProviderDryRunExecutionSourceSelectionReviewReference =
  "Backend-owned minimal provider adapter selection and credential reference review";
export type ProviderDryRunExecutionSourceTextAdapterAuditApprovalJoinReviewReference =
  "Backend-owned minimal text adapter audit and approval join review";
export type ProviderDryRunExecutionSourceManualApprovalDecisionReviewReference =
  "Backend-owned synthetic dry-run manual approval decision review";
export type ProviderDryRunExecutionNextReviewRecoveryRequirement =
  "5994-6025 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview";

type ProviderDryRunExecutionCommonRecordFields = Readonly<{
  version: string;
  stableId: ProviderDryRunExecutionMvpId;
  capabilityFamily: ProviderDryRunExecutionCapabilityFamilyLabel;
  workspaceTarget: ProviderDryRunExecutionWorkspaceTarget;
  providerSlotLabel: ProviderDryRunExecutionProviderSlotLabel;
  backupProviderSlotLabel: ProviderDryRunExecutionProviderSlotLabel;
  localPrivateAlternativeLabel: ProviderDryRunExecutionLocalPrivateAlternativeLabel;
  opaqueCredentialReferenceLabel: ProviderDryRunExecutionOpaqueCredentialReferenceLabel;
  credentialReferencePosture: ProviderDryRunExecutionCredentialReferencePosture;
  credentialValueState: ProviderDryRunCredentialValueState;
  envVarState: ProviderDryRunEnvVarState;
  providerKeyState: ProviderDryRunProviderKeyState;
  sourceProviderDryRunAdmissionReviewReference: ProviderDryRunExecutionSourceAdmissionReviewReference;
  sourceProviderDryRunAdmissionAcceptancePostureReference: ProviderDryRunExecutionSourceAdmissionAcceptancePostureReference;
  sourceProviderDryRunAdmissionAuditSummaryReference: ProviderDryRunExecutionSourceAdmissionAuditSummaryReference;
  sourceProviderDryRunAdmissionMvpReference: ProviderDryRunExecutionSourceAdmissionMvpReference;
  sourceProviderSelectionCredentialReferenceReviewReference: ProviderDryRunExecutionSourceSelectionReviewReference;
  sourceTextAdapterAuditApprovalJoinReviewReference: ProviderDryRunExecutionSourceTextAdapterAuditApprovalJoinReviewReference;
  sourceManualApprovalDecisionReviewReference: ProviderDryRunExecutionSourceManualApprovalDecisionReviewReference;
  backendOwnedPosture: ProviderDryRunExecutionBackendOwnedPosture;
  serverOnlyPosture: ProviderDryRunExecutionServerOnlyPosture;
  dryRunExecutionPosture: ProviderDryRunExecutionPosture;
  manualGatedPosture: ProviderDryRunExecutionManualGatedPosture;
  fixtureOnlyPosture: ProviderDryRunExecutionFixtureOnlyPosture;
  inMemoryOnlyPosture: ProviderDryRunExecutionInMemoryOnlyPosture;
  noProviderSdkImport: ProviderDryRunExecutionNoProviderSdkImport;
  noLiveProviderExecution: ProviderDryRunExecutionNoLiveProviderExecution;
  noModelCalls: ProviderDryRunExecutionNoModelCalls;
  noPromptSending: ProviderDryRunExecutionNoPromptSending;
  noFrontendRequest: ProviderDryRunExecutionNoFrontendRequest;
  noApiRoute: ProviderDryRunExecutionNoApiRoute;
  noQueueWorkerJobDispatch: ProviderDryRunExecutionNoQueueWorkerJobDispatch;
  noPersistence: ProviderDryRunExecutionNoPersistence;
  noDatabaseWrites: ProviderDryRunExecutionNoDatabaseWrites;
  noFileWrites: ProviderDryRunExecutionNoFileWrites;
  noResultPersistence: ProviderDryRunExecutionNoResultPersistence;
  noAuditPersistence: ProviderDryRunExecutionNoAuditPersistence;
  noApprovalPersistence: ProviderDryRunExecutionNoApprovalPersistence;
  noApprovalRecording: ProviderDryRunExecutionNoApprovalRecording;
  noApprovalTokenIssuance: ProviderDryRunExecutionNoApprovalTokenIssuance;
  noApprovalLeaseIssuance: ProviderDryRunExecutionNoApprovalLeaseIssuance;
  nextReviewRecoveryRequirement: ProviderDryRunExecutionNextReviewRecoveryRequirement;
}>;

export type MinimalManualGatedProviderAdapterDryRunExecutionMvpRecord =
  Readonly<
    ProviderDryRunExecutionCommonRecordFields & {
      key: ProviderDryRunExecutionMvpKey;
      executionMode: ProviderDryRunExecutionMode;
      executionState: ProviderDryRunExecutionState;
      providerDryRunExecutionId: ProviderDryRunExecutionPreviewId;
      providerDryRunAdmissionId: ProviderDryRunAdmissionPreviewId;
      providerSlotId: ProviderDryRunPreviewSlotId;
      credentialReferenceId: ProviderDryRunPreviewCredentialReferenceId;
      executionDigest: ProviderDryRunPreviewDigest;
      selectedProviderState: ProviderDryRunSelectedProviderState;
      credentialReferenceState: ProviderDryRunCredentialReferenceState;
      redactedPromptReference: ProviderDryRunPreviewPromptReference;
      timestampPosture: ProviderDryRunTimestampPosture;
      currentReadiness: ProviderDryRunExecutionCurrentReadiness;
      reviewRecoveryPreviewNextStatement: ProviderDryRunExecutionReviewRecoveryNextStatement;
    }
  >;

export type ProviderDryRunExecutionInputRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunExecutionInputKey;
    requestVersion: ProviderDryRunExecutionRequestVersion;
    requestState: ProviderDryRunRequestState;
    inputState: ProviderDryRunExecutionInputState;
    executionMode: ProviderDryRunExecutionMode;
    frontendRequestState: ProviderDryRunFrontendRequestState;
    apiRouteState: ProviderDryRunApiRouteState;
    dryRunIntentState: ProviderDryRunPreviewOnlyState;
    promptPayloadPosture: ProviderDryRunPromptPayloadPosture;
    promptTransmissionState: ProviderDryRunPromptTransmissionState;
    selectedProviderPosture: ProviderDryRunSelectedProviderPosture;
    backupProviderPosture: ProviderDryRunSelectedProviderPosture;
    localPrivateAlternativePosture: ProviderDryRunSelectedProviderPosture;
    credentialValuePosture: ProviderDryRunCredentialValuePosture;
    providerPayloadPosture: ProviderDryRunProviderPayloadPosture;
    modelOutputPosture: ProviderDryRunModelOutputPosture;
    persistenceTargetPosture: ProviderDryRunPersistenceTargetPosture;
    providerSdkImportState: ProviderDryRunProviderSdkImportState;
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement: ProviderDryRunNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement;
  }
>;

export type ProviderDryRunExecutionPlanRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunExecutionPlanKey;
    planVersion: ProviderDryRunExecutionPlanVersion;
    planState: ProviderDryRunExecutionPlanState;
    executionMode: ProviderDryRunExecutionMode;
    supportedCapabilityState: ProviderDryRunSupportedCapabilityState;
    dryRunIntentState: ProviderDryRunPreviewOnlyState;
    requiredChecks: readonly string[];
    blockedLiveAction: string;
  }
>;

export type ProviderDryRunExecutionOutputRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunExecutionOutputKey;
    responseVersion: ProviderDryRunExecutionResponseVersion;
    responseState: ProviderDryRunResponseState;
    outputVersion: ProviderDryRunExecutionOutputVersion;
    executionMode: ProviderDryRunExecutionMode;
    executionState: ProviderDryRunExecutionOutputState;
    providerDryRunExecutionId: ProviderDryRunExecutionPreviewId;
    providerDryRunAdmissionId: ProviderDryRunAdmissionPreviewId;
    providerSlotId: ProviderDryRunPreviewSlotId;
    credentialReferenceId: ProviderDryRunPreviewCredentialReferenceId;
    executionDigest: ProviderDryRunPreviewDigest;
    selectedProviderState: ProviderDryRunSelectedProviderState;
    credentialReferenceState: ProviderDryRunCredentialReferenceState;
    providerSdkImportState: ProviderDryRunProviderSdkImportState;
    liveProviderExecutionState: ProviderDryRunLiveProviderExecutionState;
    promptTransmissionState: ProviderDryRunPromptTransmissionState;
    providerResponseState: ProviderDryRunProviderResponseState;
    modelOutputState: ProviderDryRunModelOutputState;
    redactedPromptReference: ProviderDryRunPreviewPromptReference;
    resultReference: ProviderDryRunPreviewResultReference;
    auditReference: ProviderDryRunPreviewAuditReference;
    approvalReference: ProviderDryRunPreviewApprovalReference;
    evidencePacketReference: ProviderDryRunPreviewEvidenceReference;
    timestampPosture: ProviderDryRunTimestampPosture;
    persistenceState: ProviderDryRunPersistenceState;
    explicitDryRunExecutionFixtureOnlyNoProviderOutputNoSecretReadNoPersistenceStatement: ProviderDryRunExecutionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement;
    currentReadiness: ProviderDryRunExecutionCurrentReadiness;
  }
>;

export type ProviderDryRunExecutionEnvelopeRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunExecutionEnvelopeKey;
    envelopeVersion: ProviderDryRunExecutionEnvelopeVersion;
    envelopeState: ProviderDryRunExecutionEnvelopeState;
    providerDryRunExecutionId: ProviderDryRunExecutionPreviewId;
    executionDigest: ProviderDryRunPreviewDigest;
    redactedPromptEnvelopeLabel: "redacted prompt envelope fixture / provider dry-run execution preview";
    promptPayloadPosture: ProviderDryRunPromptPayloadPosture;
    promptTransmissionState: ProviderDryRunPromptTransmissionState;
    providerPayloadPosture: ProviderDryRunProviderPayloadPosture;
    providerResponseState: ProviderDryRunProviderResponseState;
    modelOutputState: ProviderDryRunModelOutputState;
    redactedPromptReference: ProviderDryRunPreviewPromptReference;
    resultReference: ProviderDryRunPreviewResultReference;
    auditReference: ProviderDryRunPreviewAuditReference;
    approvalReference: ProviderDryRunPreviewApprovalReference;
    evidencePacketReference: ProviderDryRunPreviewEvidenceReference;
  }
>;

export type ProviderDryRunFixtureResponseRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunFixtureResponseKey;
    fixtureResponseVersion: ProviderDryRunFixtureResponseVersion;
    fixtureResponseState: ProviderDryRunFixtureResponseState;
    providerDryRunExecutionId: ProviderDryRunExecutionPreviewId;
    executionDigest: ProviderDryRunPreviewDigest;
    selectedProviderState: ProviderDryRunSelectedProviderState;
    fixtureProviderResponse: ProviderDryRunExecutionFixtureProviderResponse;
    providerResponseState: ProviderDryRunProviderResponseState;
    modelOutputState: ProviderDryRunModelOutputState;
    resultReference: ProviderDryRunPreviewResultReference;
  }
>;

export type ProviderDryRunBlockedLiveExecutionSummaryRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunBlockedLiveExecutionSummaryKey;
    blockedLiveExecutionVersion: ProviderDryRunBlockedLiveExecutionSummaryVersion;
    blockedLiveExecutionState: ProviderDryRunBlockedLiveExecutionState;
    executionState: ProviderDryRunExecutionState;
    blockedLiveActions: readonly string[];
  }
>;

export type ProviderDryRunEvidencePreviewRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunEvidencePreviewKey;
    evidenceVersion: ProviderDryRunEvidencePreviewVersion;
    evidencePreviewState: ProviderDryRunEvidencePreviewState;
    evidenceSummaryLines: readonly string[];
    evidenceReference: ProviderDryRunPreviewEvidenceReference;
  }
>;

export type ProviderDryRunAuditPreviewRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunAuditPreviewKey;
    auditVersion: ProviderDryRunAuditPreviewVersion;
    auditPreviewState: ProviderDryRunAuditPreviewState;
    auditSummaryLines: readonly string[];
    auditReference: ProviderDryRunPreviewAuditReference;
  }
>;

export type ProviderDryRunApprovalPreviewRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunApprovalPreviewKey;
    approvalVersion: ProviderDryRunApprovalPreviewVersion;
    approvalPreviewState: ProviderDryRunApprovalPreviewState;
    approvalSummaryLines: readonly string[];
    approvalReference: ProviderDryRunPreviewApprovalReference;
    approvalFixtureState: ProviderDryRunApprovalFixtureState;
    manualConfirmationFixtureState: ProviderDryRunManualConfirmationFixtureState;
    approvalTokenState: ProviderDryRunApprovalTokenState;
    approvalLeaseState: ProviderDryRunApprovalLeaseState;
    approvalRecordingState: ProviderDryRunApprovalRecordingState;
  }
>;

export type ProviderDryRunSafetyGateSummaryRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunSafetyGateSummaryKey;
    gateSummaryVersion: ProviderDryRunSafetyGateSummaryVersion;
    gateSummaryState: ProviderDryRunGateSummaryState;
    topGateLabels: readonly string[];
    blockedLiveActions: readonly string[];
  }
>;

export type ProviderDryRunExecutionRequestRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunExecutionRequestKey;
    requestVersion: ProviderDryRunExecutionRequestVersion;
    requestState: ProviderDryRunRequestState;
    providerDryRunExecutionMvpId: ProviderDryRunExecutionMvpId;
    executionMode: ProviderDryRunExecutionMode;
    frontendRequestState: ProviderDryRunFrontendRequestState;
    apiRouteState: ProviderDryRunApiRouteState;
    promptPayloadPosture: ProviderDryRunPromptPayloadPosture;
    promptTransmissionState: ProviderDryRunPromptTransmissionState;
    selectedProviderPosture: ProviderDryRunSelectedProviderPosture;
    credentialReferencePosture: ProviderDryRunExecutionCredentialReferencePosture;
    credentialValuePosture: ProviderDryRunCredentialValuePosture;
    providerPayloadPosture: ProviderDryRunProviderPayloadPosture;
    modelOutputPosture: ProviderDryRunModelOutputPosture;
    persistenceTargetPosture: ProviderDryRunPersistenceTargetPosture;
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement: ProviderDryRunNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement;
  }
>;

export type ProviderDryRunExecutionResponseRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunExecutionResponseKey;
    responseVersion: ProviderDryRunExecutionResponseVersion;
    providerDryRunExecutionMvpId: ProviderDryRunExecutionMvpId;
    responseState: ProviderDryRunResponseState;
    executionMode: ProviderDryRunExecutionMode;
    executionState: ProviderDryRunExecutionState;
    selectedProviderState: ProviderDryRunSelectedProviderState;
    credentialReferenceState: ProviderDryRunCredentialReferenceState;
    providerSdkImportState: ProviderDryRunProviderSdkImportState;
    providerResponseState: ProviderDryRunProviderResponseState;
    modelOutputState: ProviderDryRunModelOutputState;
    resultPersistenceState: ProviderDryRunPersistenceState;
    auditPersistenceState: ProviderDryRunPersistenceState;
    approvalPersistenceState: ProviderDryRunPersistenceState;
    databaseWriteState: ProviderDryRunDatabaseWriteState;
    fileWriteState: ProviderDryRunFileWriteState;
    explicitDryRunExecutionFixtureOnlyNoProviderOutputNoSecretReadNoPersistenceStatement: ProviderDryRunExecutionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement;
  }
>;

export type ProviderDryRunExecutionErrorRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunExecutionErrorKey;
    errorVersion: ProviderDryRunExecutionErrorVersion;
    providerDryRunExecutionMvpId: ProviderDryRunExecutionMvpId;
    errorState: ProviderDryRunErrorState;
    failedGateExamples: readonly string[];
    missingProviderDryRunAdmissionReviewExample: string;
    missingProviderDryRunAdmissionOutputExample: string;
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
    retryPosture: ProviderDryRunRetryPosture;
    fallbackPosture: ProviderDryRunFallbackPosture;
    explicitNoLiveErrorNoRetryNoFallbackStatement: ProviderDryRunNoLiveErrorNoRetryNoFallbackStatement;
  }
>;

export type ProviderDryRunExecutionGateKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-gate:${ProviderDryRunExecutionMvpId}:${ProviderDryRunExecutionGateId}`;

export type ProviderDryRunExecutionGateRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunExecutionGateKey;
    gateVersion: ProviderDryRunExecutionGateVersion;
    gateId: ProviderDryRunExecutionGateId;
    label: string;
    owner: string;
    requiredState: string;
    currentState: string;
    evidence: string;
    blockedLiveAction: string;
  }
>;

export type ProviderDryRunExecutionReadinessKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-readiness:${ProviderDryRunExecutionMvpId}:${ProviderDryRunReadinessId}`;

export type ProviderDryRunReadinessMatrixRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    key: ProviderDryRunExecutionReadinessKey;
    readinessVersion: ProviderDryRunReadinessMatrixVersion;
    readinessId: ProviderDryRunReadinessId;
    label: string;
    state: string;
    evidence: string;
    nextSafeAction: string;
  }
>;

export type ProviderDryRunExecutionSummary = Readonly<{
  version: ProviderDryRunExecutionSummaryVersion;
  highestDetectedPhase: number;
  latestCompletedBatch: typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH;
  previousCompletedBatch: typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch: typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
  currentReadiness: ProviderDryRunExecutionCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type ProviderDryRunExecutionGateSummary = Readonly<{
  version: ProviderDryRunExecutionGateSummaryVersion;
  gateCount: number;
  summaryLines: readonly string[];
  blockedLiveActions: readonly string[];
}>;

export type ProviderDryRunExecutionReadinessSummary = Readonly<{
  version: ProviderDryRunExecutionReadinessSummaryVersion;
  readinessCount: number;
  currentReadiness: ProviderDryRunExecutionCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type ProviderDryRunExecutionReviewRecoveryChecklist =
  readonly string[];

export type MinimalProviderDryRunExecutionServerRunRecord = Readonly<
  ProviderDryRunExecutionCommonRecordFields & {
    executionMode: ProviderDryRunExecutionMode;
    executionState: ProviderDryRunExecutionState;
    providerDryRunExecutionId: ProviderDryRunExecutionPreviewId;
    providerDryRunAdmissionId: ProviderDryRunAdmissionPreviewId;
    providerSlotId: ProviderDryRunPreviewSlotId;
    credentialReferenceId: ProviderDryRunPreviewCredentialReferenceId;
    executionDigest: ProviderDryRunPreviewDigest;
    selectedProviderState: ProviderDryRunSelectedProviderState;
    credentialReferenceState: ProviderDryRunCredentialReferenceState;
    redactedPromptReference: ProviderDryRunPreviewPromptReference;
    fixtureProviderResponse: ProviderDryRunExecutionFixtureProviderResponse;
    providerResponseState: ProviderDryRunProviderResponseState;
    modelOutputState: ProviderDryRunModelOutputState;
    providerSdkImportState: ProviderDryRunProviderSdkImportState;
    liveProviderExecutionState: ProviderDryRunLiveProviderExecutionState;
    resultReference: ProviderDryRunPreviewResultReference;
    auditReference: ProviderDryRunPreviewAuditReference;
    approvalReference: ProviderDryRunPreviewApprovalReference;
    evidencePacketReference: ProviderDryRunPreviewEvidenceReference;
    approvalFixtureState: ProviderDryRunApprovalFixtureState;
    manualConfirmationFixtureState: ProviderDryRunManualConfirmationFixtureState;
    approvalTokenState: ProviderDryRunApprovalTokenState;
    approvalLeaseState: ProviderDryRunApprovalLeaseState;
    timestampPosture: ProviderDryRunTimestampPosture;
    persistenceState: ProviderDryRunPersistenceState;
    currentReadiness: ProviderDryRunExecutionCurrentReadiness;
    noFrontendRequestStatement: ProviderDryRunNoFrontendRequestStatement;
    noApiRouteStatement: ProviderDryRunNoApiRouteStatement;
    noProviderCallStatement: ProviderDryRunNoProviderCallStatement;
    noModelCallStatement: ProviderDryRunNoModelCallStatement;
    noRealApprovalRequestStatement: ProviderDryRunNoRealApprovalRequestStatement;
    noRealApprovalRecordingStatement: ProviderDryRunNoRealApprovalRecordingStatement;
    noApprovalTokenStatement: ProviderDryRunNoApprovalTokenStatement;
    noApprovalLeaseStatement: ProviderDryRunNoApprovalLeaseStatement;
    nextReviewRecoveryChecklist: ProviderDryRunExecutionReviewRecoveryChecklist;
  }
>;
