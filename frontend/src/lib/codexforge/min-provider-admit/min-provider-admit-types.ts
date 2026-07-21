export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH =
  "5898-5929 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_PHASE =
  5929;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5866-5897 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5930-5961 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission Review and Recovery Preview";

export const MINIMAL_PROVIDER_DRY_RUN_ADMISSION_SECTION_TITLES = [
  "Backend-owned minimal manual-gated provider adapter dry-run admission MVP",
  "Provider adapter dry-run admission input",
  "Provider adapter dry-run admission check",
  "Provider adapter dry-run admission output",
  "Provider adapter dry-run admission envelope",
  "Provider adapter dry-run intent preview",
  "Provider adapter dry-run blocked execution summary",
  "Provider adapter dry-run admission gates",
  "Provider adapter dry-run admission readiness matrix",
  "Provider adapter dry-run admission evidence preview",
] as const;

export type MinimalProviderDryRunAdmissionSectionTitle =
  (typeof MINIMAL_PROVIDER_DRY_RUN_ADMISSION_SECTION_TITLES)[number];

export type ProviderDryRunAdmissionMvpId =
  | "text-chat-provider-dry-run-admission"
  | "planning-reasoning-provider-dry-run-admission";

export type ProviderDryRunAdmissionCapabilityFamilyId =
  | "text-chat"
  | "planning-reasoning";

export type ProviderDryRunAdmissionCapabilityFamilyLabel =
  | "text/chat"
  | "planning/reasoning";

export type ProviderDryRunAdmissionWorkspaceTarget = "Athena Command Center";

export type ProviderDryRunAdmissionProviderSlotLabel =
  | "OpenAI-compatible text provider dry-run slot"
  | "Anthropic-compatible text provider dry-run slot"
  | "Gemini-compatible text provider dry-run slot"
  | "local/private text provider dry-run slot"
  | "fallback disabled dry-run slot";

export type ProviderDryRunAdmissionLocalPrivateAlternativeLabel =
  "local/private text provider dry-run slot";

export type ProviderDryRunAdmissionOpaqueCredentialReferenceLabel =
  | "opaque credential reference label / athena dry-run text chat primary"
  | "opaque credential reference label / athena dry-run planning reasoning primary";

export type ProviderDryRunAdmissionVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-mvp-v1";
export type ProviderDryRunAdmissionInputVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-input-v1";
export type ProviderDryRunAdmissionCheckVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-check-v1";
export type ProviderDryRunAdmissionOutputVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output-v1";
export type ProviderDryRunAdmissionEnvelopeVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-envelope-v1";
export type ProviderDryRunIntentPreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-intent-preview-v1";
export type ProviderDryRunBlockedExecutionSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-blocked-execution-summary-v1";
export type ProviderDryRunEvidencePreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-evidence-preview-v1";
export type ProviderDryRunAuditPreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview-v1";
export type ProviderDryRunApprovalPreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview-v1";
export type ProviderDryRunSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-safety-gate-summary-v1";
export type ProviderDryRunReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-readiness-matrix-v1";
export type ProviderDryRunAdmissionRequestVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-request-v1";
export type ProviderDryRunAdmissionResponseVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-response-v1";
export type ProviderDryRunAdmissionErrorVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-error-v1";
export type ProviderDryRunAdmissionGateVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-gate-v1";
export type ProviderDryRunAdmissionSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-summary-v1";
export type ProviderDryRunAdmissionGateSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-gate-summary-v1";
export type ProviderDryRunAdmissionReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-readiness-summary-v1";

export type ProviderDryRunAdmissionBackendOwnedPosture = "backend-owned";
export type ProviderDryRunAdmissionServerOnlyPosture = "server-only";
export type ProviderDryRunAdmissionPosture = "provider-dry-run-admission";
export type ProviderDryRunAdmissionCredentialReferencePosture =
  "opaque-reference-only";
export type ProviderDryRunAdmissionManualGatedPosture = "manual-gated";
export type ProviderDryRunAdmissionFixtureOnlyPosture = "fixture-only";
export type ProviderDryRunAdmissionInMemoryOnlyPosture = "in-memory-only";
export type ProviderDryRunAdmissionNoProviderSdkImport =
  "no provider SDK import";
export type ProviderDryRunAdmissionNoProviderExecution =
  "no provider execution";
export type ProviderDryRunAdmissionNoModelCalls = "no model calls";
export type ProviderDryRunAdmissionNoPromptSending = "no prompt sending";
export type ProviderDryRunAdmissionNoFrontendRequest = "no frontend request";
export type ProviderDryRunAdmissionNoApiRoute = "no API route";
export type ProviderDryRunAdmissionNoQueueWorkerJobDispatch =
  "no queue/worker/job dispatch";
export type ProviderDryRunAdmissionNoPersistence = "no persistence";
export type ProviderDryRunAdmissionNoDatabaseWrites = "no database writes";
export type ProviderDryRunAdmissionNoFileWrites = "no file writes";
export type ProviderDryRunAdmissionNoResultPersistence =
  "no result persistence";
export type ProviderDryRunAdmissionNoAuditPersistence =
  "no audit persistence";
export type ProviderDryRunAdmissionNoApprovalPersistence =
  "no approval persistence";
export type ProviderDryRunAdmissionNoApprovalRecording =
  "no approval recording";
export type ProviderDryRunAdmissionNoApprovalTokenIssuance =
  "no approval token issuance";
export type ProviderDryRunAdmissionNoApprovalLeaseIssuance =
  "no approval lease issuance";
export type ProviderDryRunAdmissionCurrentReadiness =
  "minimal-provider-dry-run-admission-mvp-only / backend-only / admission-only / credential-reference-only / fixture-only / not-provider-executing / not persistent";
export type ProviderDryRunAdmissionMode = "deterministic-fixture-only";
export type ProviderDryRunAdmissionState =
  | "admitted-for-backend-dry-run-preview-only"
  | "blocked-for-backend-dry-run-preview-only";
export type ProviderDryRunAdmissionInputState =
  "deterministic provider dry-run admission fixture input only";
export type ProviderDryRunAdmissionCheckState =
  | "admitted-for-backend-dry-run-preview-only"
  | "blocked-for-backend-dry-run-preview-only";
export type ProviderDryRunAdmissionOutputState =
  | "admitted-for-backend-dry-run-preview-only"
  | "blocked-for-backend-dry-run-preview-only";
export type ProviderDryRunAdmissionEnvelopeState =
  "provider dry-run admission envelope preview only";
export type ProviderDryRunIntentPreviewState = "preview-only";
export type ProviderDryRunBlockedExecutionState =
  "preview-only provider execution blocked summary";
export type ProviderDryRunEvidencePreviewState =
  "preview-only / not persisted";
export type ProviderDryRunAuditPreviewState = "preview-only / not persisted";
export type ProviderDryRunApprovalPreviewState =
  "preview-only / not persisted";
export type ProviderDryRunGateSummaryState =
  "preview-only blocked dry-run admission summary";
export type ProviderDryRunRequestState =
  "deterministic provider dry-run admission fixture request only";
export type ProviderDryRunResponseState =
  "returned by server-only smoke/helper only";
export type ProviderDryRunErrorState = "deterministic preview only";
export type ProviderDryRunSelectedProviderState =
  "preview-only / not executed";
export type ProviderDryRunCredentialReferenceState =
  "opaque reference only / value not read";
export type ProviderDryRunCredentialValueState = "not present / not read";
export type ProviderDryRunCredentialValuePosture = "none / not read";
export type ProviderDryRunEnvVarState = "not read";
export type ProviderDryRunProviderKeyState = "not read";
export type ProviderDryRunProviderSdkImportState = "not imported";
export type ProviderDryRunProviderExecutionState = "blocked";
export type ProviderDryRunPromptPayloadPosture =
  "redacted placeholder only";
export type ProviderDryRunPromptTransmissionState = "not sent";
export type ProviderDryRunProviderPayloadPosture = "none";
export type ProviderDryRunProviderResponseState = "not received";
export type ProviderDryRunModelOutputState = "not generated";
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
export type ProviderDryRunAdmissionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement =
  "Dry-run admission only. No provider output. No secret read. No persistence.";
export type ProviderDryRunNoLiveErrorNoRetryNoFallbackStatement =
  "No live error. No retry. No fallback.";
export type ProviderDryRunReviewRecoveryNextStatement =
  "provider adapter dry-run admission review and recovery preview comes next";
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

export type ProviderDryRunAdmissionMvpKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-mvp:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunAdmissionInputKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-input:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunAdmissionCheckKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-check:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunAdmissionOutputKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunAdmissionEnvelopeKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-envelope:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunIntentPreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-intent-preview:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunBlockedExecutionSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-blocked-execution-summary:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunEvidencePreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-evidence-preview:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunAuditPreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunApprovalPreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-safety-gate-summary:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunAdmissionRequestKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-request:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunAdmissionResponseKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-response:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunAdmissionErrorKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-error:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunAdmissionPreviewId =
  `provider-dry-run-admission-preview:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunPreviewSlotId =
  `provider-dry-run-slot-preview:${ProviderDryRunAdmissionMvpId}:${ProviderDryRunSlotOrder}`;
export type ProviderDryRunPreviewCredentialReferenceId =
  `provider-dry-run-credential-reference-preview:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunPreviewDigest =
  `provider-dry-run-admission-digest-preview:${ProviderDryRunAdmissionMvpId}:fixture-only`;
export type ProviderDryRunPreviewResultReference =
  `provider-dry-run-result-reference-preview:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunPreviewAuditReference =
  `provider-dry-run-audit-reference-preview:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunPreviewApprovalReference =
  `provider-dry-run-approval-reference-preview:${ProviderDryRunAdmissionMvpId}`;
export type ProviderDryRunPreviewEvidenceReference =
  `provider-dry-run-evidence-reference-preview:${ProviderDryRunAdmissionMvpId}`;

export type ProviderDryRunSlotOrder =
  | "selected"
  | "backup"
  | "local-private";

export type ProviderDryRunAdmissionGateId =
  | "backend-only-boundary"
  | "server-only-dry-run-admission-module-boundary"
  | "provider-dry-run-admission-fixture-mode"
  | "provider-selection-credential-reference-review-dependency"
  | "credential-reference-opaque-only-mode"
  | "deterministic-provider-dry-run-admission-id"
  | "deterministic-provider-slot-id"
  | "deterministic-credential-reference-id"
  | "deterministic-admission-digest"
  | "supported-capability-family"
  | "selected-provider-slot-preview-only"
  | "backup-provider-slot-preview-only"
  | "local-private-alternative-preview-only"
  | "dry-run-intent-preview-only"
  | "dry-run-execution-blocked"
  | "credential-value-absent"
  | "credential-value-not-read"
  | "env-vars-not-read"
  | "provider-key-not-read"
  | "redacted-prompt-envelope-present"
  | "prompt-not-sent"
  | "provider-sdk-not-imported"
  | "provider-response-not-received"
  | "model-output-not-generated"
  | "manual-approval-fixture"
  | "manual-confirmation-fixture"
  | "in-memory-only-admission-reference"
  | "no-real-approval-request"
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

export type ProviderDryRunReadinessId =
  | "server-only-dry-run-admission-helper-state"
  | "provider-selection-credential-reference-review-dependency-state"
  | "provider-dry-run-admission-input-state"
  | "provider-dry-run-admission-check-state"
  | "provider-dry-run-admission-output-state"
  | "provider-dry-run-admission-envelope-state"
  | "provider-dry-run-intent-preview-state"
  | "provider-dry-run-blocked-execution-summary-state"
  | "provider-dry-run-evidence-preview-state"
  | "provider-dry-run-audit-preview-state"
  | "provider-dry-run-approval-preview-state"
  | "credential-value-boundary-state"
  | "env-var-boundary-state"
  | "provider-key-boundary-state"
  | "provider-sdk-boundary-state"
  | "provider-execution-boundary-state"
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

export type ProviderDryRunSourceProviderSelectionReviewReference =
  "Backend-owned minimal provider adapter selection and credential reference review";
export type ProviderDryRunSourceProviderSelectionAcceptancePostureReference =
  "Provider adapter selection acceptance posture";
export type ProviderDryRunSourceProviderSelectionAuditSummaryReference =
  "Provider adapter selection review audit summary";
export type ProviderDryRunSourceProviderSelectionMvpReference =
  "Backend-owned minimal manual-gated provider adapter selection and credential reference MVP";
export type ProviderDryRunSourceTextAdapterAuditApprovalJoinReviewReference =
  "Backend-owned minimal text adapter audit and approval join review";
export type ProviderDryRunSourceTextAdapterResultCaptureReviewReference =
  "Backend-owned minimal text adapter result capture review";
export type ProviderDryRunSourceManualApprovalDecisionReviewReference =
  "Backend-owned synthetic dry-run manual approval decision review";
export type ProviderDryRunAdmissionNextReviewRecoveryRequirement =
  "5930-5961 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission Review and Recovery Preview";

type ProviderDryRunAdmissionCommonRecordFields = Readonly<{
  version: string;
  stableId: ProviderDryRunAdmissionMvpId;
  capabilityFamily: ProviderDryRunAdmissionCapabilityFamilyLabel;
  workspaceTarget: ProviderDryRunAdmissionWorkspaceTarget;
  providerSlotLabel: ProviderDryRunAdmissionProviderSlotLabel;
  backupProviderSlotLabel: ProviderDryRunAdmissionProviderSlotLabel;
  localPrivateAlternativeLabel: ProviderDryRunAdmissionLocalPrivateAlternativeLabel;
  opaqueCredentialReferenceLabel: ProviderDryRunAdmissionOpaqueCredentialReferenceLabel;
  credentialReferencePosture: ProviderDryRunAdmissionCredentialReferencePosture;
  credentialValueState: ProviderDryRunCredentialValueState;
  envVarState: ProviderDryRunEnvVarState;
  providerKeyState: ProviderDryRunProviderKeyState;
  sourceProviderSelectionCredentialReferenceReviewReference: ProviderDryRunSourceProviderSelectionReviewReference;
  sourceProviderSelectionCredentialReferenceAcceptancePostureReference: ProviderDryRunSourceProviderSelectionAcceptancePostureReference;
  sourceProviderSelectionCredentialReferenceAuditSummaryReference: ProviderDryRunSourceProviderSelectionAuditSummaryReference;
  sourceProviderSelectionCredentialReferenceMvpReference: ProviderDryRunSourceProviderSelectionMvpReference;
  sourceTextAdapterAuditApprovalJoinReviewReference: ProviderDryRunSourceTextAdapterAuditApprovalJoinReviewReference;
  sourceTextAdapterResultCaptureReviewReference: ProviderDryRunSourceTextAdapterResultCaptureReviewReference;
  sourceManualApprovalDecisionReviewReference: ProviderDryRunSourceManualApprovalDecisionReviewReference;
  backendOwnedPosture: ProviderDryRunAdmissionBackendOwnedPosture;
  serverOnlyPosture: ProviderDryRunAdmissionServerOnlyPosture;
  dryRunAdmissionPosture: ProviderDryRunAdmissionPosture;
  manualGatedPosture: ProviderDryRunAdmissionManualGatedPosture;
  fixtureOnlyPosture: ProviderDryRunAdmissionFixtureOnlyPosture;
  inMemoryOnlyPosture: ProviderDryRunAdmissionInMemoryOnlyPosture;
  noProviderSdkImport: ProviderDryRunAdmissionNoProviderSdkImport;
  noProviderExecution: ProviderDryRunAdmissionNoProviderExecution;
  noModelCalls: ProviderDryRunAdmissionNoModelCalls;
  noPromptSending: ProviderDryRunAdmissionNoPromptSending;
  noFrontendRequest: ProviderDryRunAdmissionNoFrontendRequest;
  noApiRoute: ProviderDryRunAdmissionNoApiRoute;
  noQueueWorkerJobDispatch: ProviderDryRunAdmissionNoQueueWorkerJobDispatch;
  noPersistence: ProviderDryRunAdmissionNoPersistence;
  noDatabaseWrites: ProviderDryRunAdmissionNoDatabaseWrites;
  noFileWrites: ProviderDryRunAdmissionNoFileWrites;
  noResultPersistence: ProviderDryRunAdmissionNoResultPersistence;
  noAuditPersistence: ProviderDryRunAdmissionNoAuditPersistence;
  noApprovalPersistence: ProviderDryRunAdmissionNoApprovalPersistence;
  noApprovalRecording: ProviderDryRunAdmissionNoApprovalRecording;
  noApprovalTokenIssuance: ProviderDryRunAdmissionNoApprovalTokenIssuance;
  noApprovalLeaseIssuance: ProviderDryRunAdmissionNoApprovalLeaseIssuance;
  nextReviewRecoveryRequirement: ProviderDryRunAdmissionNextReviewRecoveryRequirement;
}>;

export type MinimalManualGatedProviderAdapterDryRunAdmissionMvpRecord =
  Readonly<
    ProviderDryRunAdmissionCommonRecordFields & {
      key: ProviderDryRunAdmissionMvpKey;
      admissionMode: ProviderDryRunAdmissionMode;
      admissionState: ProviderDryRunAdmissionState;
      providerDryRunAdmissionId: ProviderDryRunAdmissionPreviewId;
      providerSlotId: ProviderDryRunPreviewSlotId;
      credentialReferenceId: ProviderDryRunPreviewCredentialReferenceId;
      admissionDigest: ProviderDryRunPreviewDigest;
      selectedProviderState: ProviderDryRunSelectedProviderState;
      credentialReferenceState: ProviderDryRunCredentialReferenceState;
      timestampPosture: ProviderDryRunTimestampPosture;
      currentReadiness: ProviderDryRunAdmissionCurrentReadiness;
      reviewRecoveryPreviewNextStatement: ProviderDryRunReviewRecoveryNextStatement;
    }
  >;

export type ProviderDryRunAdmissionInputRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunAdmissionInputKey;
    requestVersion: ProviderDryRunAdmissionRequestVersion;
    requestState: ProviderDryRunRequestState;
    inputState: ProviderDryRunAdmissionInputState;
    admissionMode: ProviderDryRunAdmissionMode;
    frontendRequestState: ProviderDryRunFrontendRequestState;
    apiRouteState: ProviderDryRunApiRouteState;
    promptPayloadPosture: ProviderDryRunPromptPayloadPosture;
    promptTransmissionState: ProviderDryRunPromptTransmissionState;
    selectedProviderPosture: "preview slot only";
    credentialValuePosture: ProviderDryRunCredentialValuePosture;
    providerPayloadPosture: ProviderDryRunProviderPayloadPosture;
    modelOutputPosture: ProviderDryRunModelOutputPosture;
    persistenceTargetPosture: ProviderDryRunPersistenceTargetPosture;
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement: ProviderDryRunNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement;
  }
>;

export type ProviderDryRunAdmissionCheckRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunAdmissionCheckKey;
    checkVersion: ProviderDryRunAdmissionCheckVersion;
    admissionMode: ProviderDryRunAdmissionMode;
    admissionState: ProviderDryRunAdmissionCheckState;
    supportedCapabilityState: ProviderDryRunSupportedCapabilityState;
    dryRunIntentState: ProviderDryRunIntentPreviewState;
    requiredChecks: readonly string[];
    blockedLiveAction: string;
  }
>;

export type ProviderDryRunAdmissionOutputRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunAdmissionOutputKey;
    responseVersion: ProviderDryRunAdmissionResponseVersion;
    responseState: ProviderDryRunResponseState;
    outputVersion: ProviderDryRunAdmissionOutputVersion;
    admissionMode: ProviderDryRunAdmissionMode;
    admissionState: ProviderDryRunAdmissionOutputState;
    providerDryRunAdmissionId: ProviderDryRunAdmissionPreviewId;
    providerSlotId: ProviderDryRunPreviewSlotId;
    credentialReferenceId: ProviderDryRunPreviewCredentialReferenceId;
    admissionDigest: ProviderDryRunPreviewDigest;
    selectedProviderState: ProviderDryRunSelectedProviderState;
    credentialReferenceState: ProviderDryRunCredentialReferenceState;
    providerSdkImportState: ProviderDryRunProviderSdkImportState;
    providerExecutionState: ProviderDryRunProviderExecutionState;
    promptTransmissionState: ProviderDryRunPromptTransmissionState;
    providerResponseState: ProviderDryRunProviderResponseState;
    modelOutputState: ProviderDryRunModelOutputState;
    resultReference: ProviderDryRunPreviewResultReference;
    auditReference: ProviderDryRunPreviewAuditReference;
    approvalReference: ProviderDryRunPreviewApprovalReference;
    evidencePacketReference: ProviderDryRunPreviewEvidenceReference;
    timestampPosture: ProviderDryRunTimestampPosture;
    persistenceState: ProviderDryRunPersistenceState;
    explicitDryRunAdmissionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement: ProviderDryRunAdmissionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement;
    currentReadiness: ProviderDryRunAdmissionCurrentReadiness;
  }
>;

export type ProviderDryRunAdmissionEnvelopeRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunAdmissionEnvelopeKey;
    envelopeVersion: ProviderDryRunAdmissionEnvelopeVersion;
    envelopeState: ProviderDryRunAdmissionEnvelopeState;
    providerDryRunAdmissionId: ProviderDryRunAdmissionPreviewId;
    admissionDigest: ProviderDryRunPreviewDigest;
    redactedPromptEnvelopeLabel: "redacted prompt envelope fixture / provider dry-run preview";
    promptPayloadPosture: ProviderDryRunPromptPayloadPosture;
    promptTransmissionState: ProviderDryRunPromptTransmissionState;
    providerPayloadPosture: ProviderDryRunProviderPayloadPosture;
    providerResponseState: ProviderDryRunProviderResponseState;
    modelOutputState: ProviderDryRunModelOutputState;
    resultReference: ProviderDryRunPreviewResultReference;
    auditReference: ProviderDryRunPreviewAuditReference;
    approvalReference: ProviderDryRunPreviewApprovalReference;
    evidencePacketReference: ProviderDryRunPreviewEvidenceReference;
  }
>;

export type ProviderDryRunIntentPreviewRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunIntentPreviewKey;
    intentVersion: ProviderDryRunIntentPreviewVersion;
    intentPreviewState: ProviderDryRunIntentPreviewState;
    admissionMode: ProviderDryRunAdmissionMode;
    providerDryRunAdmissionId: ProviderDryRunAdmissionPreviewId;
    providerSlotId: ProviderDryRunPreviewSlotId;
    credentialReferenceId: ProviderDryRunPreviewCredentialReferenceId;
    admissionDigest: ProviderDryRunPreviewDigest;
    redactedPromptEnvelopeLabel: "redacted prompt envelope fixture / provider dry-run preview";
    promptPayloadPosture: ProviderDryRunPromptPayloadPosture;
    manualApprovalFixtureState: ProviderDryRunApprovalFixtureState;
    manualConfirmationFixtureState: ProviderDryRunManualConfirmationFixtureState;
  }
>;

export type ProviderDryRunBlockedExecutionSummaryRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunBlockedExecutionSummaryKey;
    blockedExecutionVersion: ProviderDryRunBlockedExecutionSummaryVersion;
    blockedExecutionState: ProviderDryRunBlockedExecutionState;
    admissionState: ProviderDryRunAdmissionState;
    blockedLiveActions: readonly string[];
  }
>;

export type ProviderDryRunEvidencePreviewRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunEvidencePreviewKey;
    evidenceVersion: ProviderDryRunEvidencePreviewVersion;
    evidencePreviewState: ProviderDryRunEvidencePreviewState;
    evidenceSummaryLines: readonly string[];
    evidenceReference: ProviderDryRunPreviewEvidenceReference;
  }
>;

export type ProviderDryRunAuditPreviewRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunAuditPreviewKey;
    auditVersion: ProviderDryRunAuditPreviewVersion;
    auditPreviewState: ProviderDryRunAuditPreviewState;
    auditSummaryLines: readonly string[];
    auditReference: ProviderDryRunPreviewAuditReference;
  }
>;

export type ProviderDryRunApprovalPreviewRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
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
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunSafetyGateSummaryKey;
    gateSummaryVersion: ProviderDryRunSafetyGateSummaryVersion;
    gateSummaryState: ProviderDryRunGateSummaryState;
    topGateLabels: readonly string[];
    blockedLiveActions: readonly string[];
  }
>;

export type ProviderDryRunAdmissionRequestRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunAdmissionRequestKey;
    requestVersion: ProviderDryRunAdmissionRequestVersion;
    requestState: ProviderDryRunRequestState;
    providerDryRunAdmissionMvpId: ProviderDryRunAdmissionMvpId;
    admissionMode: ProviderDryRunAdmissionMode;
    frontendRequestState: ProviderDryRunFrontendRequestState;
    apiRouteState: ProviderDryRunApiRouteState;
    promptPayloadPosture: ProviderDryRunPromptPayloadPosture;
    promptTransmissionState: ProviderDryRunPromptTransmissionState;
    selectedProviderPosture: "preview slot only";
    credentialReferencePosture: ProviderDryRunAdmissionCredentialReferencePosture;
    credentialValuePosture: ProviderDryRunCredentialValuePosture;
    providerPayloadPosture: ProviderDryRunProviderPayloadPosture;
    modelOutputPosture: ProviderDryRunModelOutputPosture;
    persistenceTargetPosture: ProviderDryRunPersistenceTargetPosture;
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement: ProviderDryRunNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement;
  }
>;

export type ProviderDryRunAdmissionResponseRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunAdmissionResponseKey;
    responseVersion: ProviderDryRunAdmissionResponseVersion;
    providerDryRunAdmissionMvpId: ProviderDryRunAdmissionMvpId;
    responseState: ProviderDryRunResponseState;
    admissionMode: ProviderDryRunAdmissionMode;
    admissionState: ProviderDryRunAdmissionState;
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
    explicitDryRunAdmissionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement: ProviderDryRunAdmissionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement;
  }
>;

export type ProviderDryRunAdmissionErrorRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    key: ProviderDryRunAdmissionErrorKey;
    errorVersion: ProviderDryRunAdmissionErrorVersion;
    providerDryRunAdmissionMvpId: ProviderDryRunAdmissionMvpId;
    errorState: ProviderDryRunErrorState;
    failedGateExamples: readonly string[];
    missingProviderSelectionReviewExample: string;
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

export type ProviderDryRunAdmissionGateRecord = Readonly<{
  version: ProviderDryRunAdmissionGateVersion;
  key: `${ProviderDryRunAdmissionMvpId}:${ProviderDryRunAdmissionGateId}`;
  stableId: ProviderDryRunAdmissionMvpId;
  capabilityFamily: ProviderDryRunAdmissionCapabilityFamilyLabel;
  gateId: ProviderDryRunAdmissionGateId;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
  nextReviewRecoveryRequirement: ProviderDryRunAdmissionNextReviewRecoveryRequirement;
}>;

export type ProviderDryRunReadinessMatrixRecord = Readonly<{
  version: ProviderDryRunReadinessMatrixVersion;
  key: `${ProviderDryRunAdmissionMvpId}:${ProviderDryRunReadinessId}`;
  stableId: ProviderDryRunAdmissionMvpId;
  capabilityFamily: ProviderDryRunAdmissionCapabilityFamilyLabel;
  readinessId: ProviderDryRunReadinessId;
  label: string;
  state: string;
  evidence: string;
  currentReadiness: ProviderDryRunAdmissionCurrentReadiness;
  nextSafeAction: string;
}>;

export type MinimalProviderDryRunAdmissionServerRunRecord = Readonly<
  ProviderDryRunAdmissionCommonRecordFields & {
    admissionMode: ProviderDryRunAdmissionMode;
    admissionState: ProviderDryRunAdmissionState;
    providerDryRunAdmissionId: ProviderDryRunAdmissionPreviewId;
    providerSlotId: ProviderDryRunPreviewSlotId;
    credentialReferenceId: ProviderDryRunPreviewCredentialReferenceId;
    admissionDigest: ProviderDryRunPreviewDigest;
    selectedProviderState: ProviderDryRunSelectedProviderState;
    credentialReferenceState: ProviderDryRunCredentialReferenceState;
    providerSdkImportState: ProviderDryRunProviderSdkImportState;
    providerExecutionState: ProviderDryRunProviderExecutionState;
    promptPayloadPosture: ProviderDryRunPromptPayloadPosture;
    promptTransmissionState: ProviderDryRunPromptTransmissionState;
    providerPayloadPosture: ProviderDryRunProviderPayloadPosture;
    providerResponseState: ProviderDryRunProviderResponseState;
    modelOutputState: ProviderDryRunModelOutputState;
    frontendRequestState: ProviderDryRunFrontendRequestState;
    apiRouteState: ProviderDryRunApiRouteState;
    queueDispatchState: ProviderDryRunDispatchState;
    workerDispatchState: ProviderDryRunDispatchState;
    jobExecutionState: ProviderDryRunDispatchState;
    approvalFixtureState: ProviderDryRunApprovalFixtureState;
    manualConfirmationFixtureState: ProviderDryRunManualConfirmationFixtureState;
    approvalTokenState: ProviderDryRunApprovalTokenState;
    approvalLeaseState: ProviderDryRunApprovalLeaseState;
    resultReference: ProviderDryRunPreviewResultReference;
    auditReference: ProviderDryRunPreviewAuditReference;
    approvalReference: ProviderDryRunPreviewApprovalReference;
    evidencePacketReference: ProviderDryRunPreviewEvidenceReference;
    timestampPosture: ProviderDryRunTimestampPosture;
    persistenceState: ProviderDryRunPersistenceState;
    noFrontendRequestStatement: ProviderDryRunNoFrontendRequestStatement;
    noApiRouteStatement: ProviderDryRunNoApiRouteStatement;
    noProviderCallStatement: ProviderDryRunNoProviderCallStatement;
    noModelCallStatement: ProviderDryRunNoModelCallStatement;
    noRealApprovalRequestStatement: ProviderDryRunNoRealApprovalRequestStatement;
    noRealApprovalRecordingStatement: ProviderDryRunNoRealApprovalRecordingStatement;
    noApprovalTokenStatement: ProviderDryRunNoApprovalTokenStatement;
    noApprovalLeaseStatement: ProviderDryRunNoApprovalLeaseStatement;
    reviewRecoveryPreviewNextStatement: ProviderDryRunReviewRecoveryNextStatement;
    currentReadiness: ProviderDryRunAdmissionCurrentReadiness;
  }
>;

export type ProviderDryRunAdmissionSummary = Readonly<{
  version: ProviderDryRunAdmissionSummaryVersion;
  highestDetectedPhase: number;
  latestCompletedBatch: typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH;
  previousCompletedBatch: typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch: typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH;
  currentReadiness: ProviderDryRunAdmissionCurrentReadiness;
  mvpCount: number;
  inputCount: number;
  outputCount: number;
  summaryLines: readonly string[];
}>;

export type ProviderDryRunAdmissionGateSummary = Readonly<{
  version: ProviderDryRunAdmissionGateSummaryVersion;
  gateCount: number;
  blockedLiveActionCount: number;
  currentReadiness: ProviderDryRunAdmissionCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type ProviderDryRunAdmissionReadinessSummary = Readonly<{
  version: ProviderDryRunAdmissionReadinessSummaryVersion;
  readinessCount: number;
  currentReadiness: ProviderDryRunAdmissionCurrentReadiness;
  nextSafeAction: string;
  summaryLines: readonly string[];
}>;

export type ProviderDryRunAdmissionReviewRecoveryChecklist = readonly string[];
