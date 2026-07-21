export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH =
  "5834-5865 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_PHASE =
  5865;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5802-5833 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5866-5897 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference Review and Recovery Preview";

export const MINIMAL_PROVIDER_ADAPTER_SELECTION_SECTION_TITLES = [
  "Backend-owned minimal manual-gated provider adapter selection and credential reference MVP",
  "Provider adapter selection input",
  "Provider slot matrix",
  "Opaque credential reference",
  "Provider adapter selection output",
  "Provider adapter selection envelope",
  "Provider adapter selection gates",
  "Provider adapter selection readiness matrix",
  "Provider adapter selection evidence preview",
] as const;

export type MinimalProviderAdapterSelectionSectionTitle =
  (typeof MINIMAL_PROVIDER_ADAPTER_SELECTION_SECTION_TITLES)[number];

export type ProviderAdapterSelectionMvpId =
  | "text-chat-provider-selection"
  | "planning-reasoning-provider-selection";

export type ProviderAdapterSelectionCapabilityFamilyId =
  | "text-chat"
  | "planning-reasoning";

export type ProviderAdapterSelectionCapabilityFamilyLabel =
  | "text/chat"
  | "planning/reasoning";

export type ProviderAdapterSelectionWorkspaceTarget = "Athena Command Center";

export type ProviderAdapterSelectionProviderSlotLabel =
  | "OpenAI-compatible text provider slot"
  | "Anthropic-compatible text provider slot"
  | "Gemini-compatible text provider slot"
  | "local/private text provider slot"
  | "fallback disabled slot";

export type ProviderAdapterSelectionLocalPrivateAlternativeLabel =
  "local/private text provider slot";

export type ProviderAdapterSelectionOpaqueCredentialReferenceLabel =
  | "opaque credential reference label / athena text chat primary"
  | "opaque credential reference label / athena planning reasoning primary";

export type ProviderAdapterSelectionVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-mvp-v1";
export type ProviderAdapterSelectionInputVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-input-v1";
export type ProviderAdapterSelectionAdmissionCheckVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-admission-check-v1";
export type ProviderSlotMatrixVersion =
  "backend-owned-minimal-manual-gated-provider-slot-matrix-v1";
export type ProviderAdapterSelectionOutputVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-output-v1";
export type OpaqueCredentialReferenceInputVersion =
  "backend-owned-minimal-manual-gated-opaque-credential-reference-input-v1";
export type OpaqueCredentialReferenceOutputVersion =
  "backend-owned-minimal-manual-gated-opaque-credential-reference-output-v1";
export type ProviderAdapterSelectionEnvelopeVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-envelope-v1";
export type ProviderAdapterSelectionEvidencePreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-evidence-preview-v1";
export type ProviderAdapterSelectionAuditPreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-audit-preview-v1";
export type ProviderAdapterSelectionApprovalPreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-approval-preview-v1";
export type ProviderAdapterSelectionSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-safety-gate-summary-v1";
export type ProviderAdapterSelectionBlockedLiveProviderSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-blocked-live-provider-summary-v1";
export type ProviderAdapterSelectionRequestVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-request-v1";
export type ProviderAdapterSelectionResponseVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-response-v1";
export type ProviderAdapterSelectionErrorVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-error-v1";
export type ProviderAdapterSelectionGateVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-gate-v1";
export type ProviderAdapterSelectionReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-readiness-matrix-v1";
export type ProviderAdapterSelectionSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-summary-v1";
export type ProviderAdapterSelectionGateSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-gate-summary-v1";
export type ProviderAdapterSelectionReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-selection-readiness-summary-v1";

export type ProviderAdapterSelectionBackendOwnedPosture = "backend-owned";
export type ProviderAdapterSelectionServerOnlyPosture = "server-only";
export type ProviderAdapterSelectionPosture = "provider-selection";
export type ProviderAdapterSelectionCredentialReferencePosture =
  "opaque-reference-only";
export type ProviderAdapterSelectionManualGatedPosture = "manual-gated";
export type ProviderAdapterSelectionFixtureOnlyPosture = "fixture-only";
export type ProviderAdapterSelectionInMemoryOnlyPosture = "in-memory-only";
export type ProviderAdapterSelectionNoProviderSdkImport =
  "no provider SDK import";
export type ProviderAdapterSelectionNoProviderExecution =
  "no provider execution";
export type ProviderAdapterSelectionNoModelCalls = "no model calls";
export type ProviderAdapterSelectionNoPromptSending = "no prompt sending";
export type ProviderAdapterSelectionNoFrontendRequest =
  "no frontend request";
export type ProviderAdapterSelectionNoApiRoute = "no API route";
export type ProviderAdapterSelectionNoQueueWorkerJobDispatch =
  "no queue/worker/job dispatch";
export type ProviderAdapterSelectionNoPersistence = "no persistence";
export type ProviderAdapterSelectionNoDatabaseWrites =
  "no database writes";
export type ProviderAdapterSelectionNoFileWrites = "no file writes";
export type ProviderAdapterSelectionNoResultPersistence =
  "no result persistence";
export type ProviderAdapterSelectionNoAuditPersistence =
  "no audit persistence";
export type ProviderAdapterSelectionNoApprovalPersistence =
  "no approval persistence";
export type ProviderAdapterSelectionNoApprovalRecording =
  "no approval recording";
export type ProviderAdapterSelectionNoApprovalTokenIssuance =
  "no approval token issuance";
export type ProviderAdapterSelectionNoApprovalLeaseIssuance =
  "no approval lease issuance";
export type ProviderAdapterSelectionCurrentReadiness =
  "minimal-provider-selection-credential-reference-mvp-only / backend-only / credential-reference-only / fixture-only / not provider-capable / not persistent";
export type ProviderAdapterSelectionState =
  "selected-provider-slot-and-opaque-credential-reference-fixture-only";
export type ProviderAdapterSelectionInputState =
  "deterministic provider selection fixture input only";
export type ProviderAdapterSelectionAdmissionState =
  "accepted / backend-only / preview-slot-only / opaque-reference-only";
export type ProviderSlotMatrixState =
  "deterministic provider slot matrix preview only";
export type ProviderAdapterSelectionOutputState =
  "selected-provider-slot-and-opaque-credential-reference-fixture-only";
export type OpaqueCredentialReferenceInputState =
  "opaque credential reference input only";
export type OpaqueCredentialReferenceOutputState =
  "opaque credential reference output only";
export type ProviderAdapterSelectionEnvelopeState =
  "provider selection envelope preview only";
export type ProviderAdapterSelectionEvidencePreviewState =
  "preview-only / not persisted";
export type ProviderAdapterSelectionAuditPreviewState =
  "preview-only / not persisted";
export type ProviderAdapterSelectionApprovalPreviewState =
  "preview-only / not persisted";
export type ProviderAdapterSelectionGateSummaryState =
  "preview-only blocked live provider summary";
export type ProviderAdapterSelectionBlockedLiveProviderState =
  "preview-only provider execution blocked summary";
export type ProviderAdapterSelectionRequestState =
  "deterministic provider selection fixture request only";
export type ProviderAdapterSelectionResponseState =
  "returned by server-only smoke/helper only";
export type ProviderAdapterSelectionErrorState =
  "deterministic preview only";
export type ProviderAdapterSelectionSelectedProviderState =
  "preview-only / not executed";
export type ProviderAdapterSelectionCredentialReferenceState =
  "opaque reference only / value not read";
export type ProviderAdapterSelectionCredentialValueState =
  "not present / not read";
export type ProviderAdapterSelectionCredentialValuePosture =
  "none / not read";
export type ProviderAdapterSelectionEnvVarState = "not read";
export type ProviderAdapterSelectionProviderKeyState = "not read";
export type ProviderAdapterSelectionProviderSdkImportState = "not imported";
export type ProviderAdapterSelectionProviderExecutionState = "blocked";
export type ProviderAdapterSelectionPromptPayloadPosture =
  "redacted placeholder only";
export type ProviderAdapterSelectionPromptTransmissionState = "not sent";
export type ProviderAdapterSelectionProviderPayloadPosture = "none";
export type ProviderAdapterSelectionProviderResponseState = "not received";
export type ProviderAdapterSelectionModelOutputState = "not generated";
export type ProviderAdapterSelectionModelOutputPosture = "none";
export type ProviderAdapterSelectionFrontendRequestState = "not created";
export type ProviderAdapterSelectionApiRouteState = "not created";
export type ProviderAdapterSelectionPersistenceTargetPosture = "none";
export type ProviderAdapterSelectionPersistenceState = "not implemented";
export type ProviderAdapterSelectionDatabaseWriteState =
  "not implemented";
export type ProviderAdapterSelectionFileWriteState = "not implemented";
export type ProviderAdapterSelectionDispatchState = "blocked";
export type ProviderAdapterSelectionApprovalFixtureState =
  "preview-only";
export type ProviderAdapterSelectionManualConfirmationFixtureState =
  "preview-only";
export type ProviderAdapterSelectionApprovalTokenState = "not issued";
export type ProviderAdapterSelectionApprovalLeaseState = "not created";
export type ProviderAdapterSelectionApprovalRecordingState =
  "not recorded";
export type ProviderAdapterSelectionPreviewReferenceState =
  "preview-only / not persisted";
export type ProviderAdapterSelectionTimestampPosture =
  "static fixture label only / no real timestamp";
export type ProviderAdapterSelectionRetryPosture = "disabled";
export type ProviderAdapterSelectionFallbackPosture = "disabled";
export type ProviderAdapterSelectionSupportedCapabilityState =
  "supported by text adapter boundary";
export type ProviderAdapterSelectionNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement =
  "No frontend request. No API route. No provider call. No secret read.";
export type ProviderAdapterSelectionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement =
  "Provider selection only. No provider output. No secret read. No persistence.";
export type ProviderAdapterSelectionNoLiveErrorNoRetryNoFallbackStatement =
  "No live error. No retry. No fallback.";
export type ProviderAdapterSelectionReviewRecoveryNextStatement =
  "provider adapter selection and credential reference review and recovery preview comes next";

export type ProviderAdapterSelectionMvpKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-mvp:${ProviderAdapterSelectionMvpId}`;
export type ProviderAdapterSelectionInputKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-input:${ProviderAdapterSelectionMvpId}`;
export type ProviderAdapterSelectionAdmissionCheckKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-admission-check:${ProviderAdapterSelectionMvpId}`;
export type ProviderSlotMatrixKey =
  `backend-owned-minimal-manual-gated-provider-slot-matrix:${ProviderAdapterSelectionMvpId}`;
export type ProviderSlotRecordKey =
  `backend-owned-minimal-manual-gated-provider-slot:${ProviderAdapterSelectionMvpId}:${ProviderSlotOrder}`;
export type ProviderAdapterSelectionOutputKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-output:${ProviderAdapterSelectionMvpId}`;
export type OpaqueCredentialReferenceInputKey =
  `backend-owned-minimal-manual-gated-opaque-credential-reference-input:${ProviderAdapterSelectionMvpId}`;
export type OpaqueCredentialReferenceOutputKey =
  `backend-owned-minimal-manual-gated-opaque-credential-reference-output:${ProviderAdapterSelectionMvpId}`;
export type ProviderAdapterSelectionEnvelopeKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-envelope:${ProviderAdapterSelectionMvpId}`;
export type ProviderAdapterSelectionEvidencePreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-evidence-preview:${ProviderAdapterSelectionMvpId}`;
export type ProviderAdapterSelectionAuditPreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-audit-preview:${ProviderAdapterSelectionMvpId}`;
export type ProviderAdapterSelectionApprovalPreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-approval-preview:${ProviderAdapterSelectionMvpId}`;
export type ProviderAdapterSelectionSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-safety-gate-summary:${ProviderAdapterSelectionMvpId}`;
export type ProviderAdapterSelectionBlockedLiveProviderSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-blocked-live-provider-summary:${ProviderAdapterSelectionMvpId}`;
export type ProviderAdapterSelectionRequestKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-request:${ProviderAdapterSelectionMvpId}`;
export type ProviderAdapterSelectionResponseKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-response:${ProviderAdapterSelectionMvpId}`;
export type ProviderAdapterSelectionErrorKey =
  `backend-owned-minimal-manual-gated-provider-adapter-selection-error:${ProviderAdapterSelectionMvpId}`;
export type ProviderSelectionPreviewId =
  `provider-selection-preview:${ProviderAdapterSelectionMvpId}`;
export type ProviderSelectionPreviewSlotId =
  `provider-slot-preview:${ProviderAdapterSelectionMvpId}:${ProviderSlotOrder}`;
export type ProviderSelectionPreviewCredentialReferenceId =
  `credential-reference-preview:${ProviderAdapterSelectionMvpId}`;
export type ProviderSelectionPreviewDigest =
  `provider-selection-digest-preview:${ProviderAdapterSelectionMvpId}:fixture-only`;
export type ProviderSelectionPreviewResultReference =
  `provider-selection-result-reference-preview:${ProviderAdapterSelectionMvpId}`;
export type ProviderSelectionPreviewAuditReference =
  `provider-selection-audit-reference-preview:${ProviderAdapterSelectionMvpId}`;
export type ProviderSelectionPreviewApprovalReference =
  `provider-selection-approval-reference-preview:${ProviderAdapterSelectionMvpId}`;
export type ProviderSelectionPreviewEvidenceReference =
  `provider-selection-evidence-reference-preview:${ProviderAdapterSelectionMvpId}`;

export type ProviderSlotOrder =
  | "primary"
  | "backup"
  | "local-private"
  | "fallback-disabled";

export type ProviderAdapterSelectionGateId =
  | "backend-only-boundary"
  | "server-only-provider-selection-module-boundary"
  | "provider-selection-fixture-mode"
  | "credential-reference-opaque-only-mode"
  | "text-adapter-audit-approval-join-review-dependency"
  | "deterministic-provider-selection-id"
  | "deterministic-provider-slot-id"
  | "deterministic-credential-reference-id"
  | "deterministic-selection-digest"
  | "supported-capability-family"
  | "selected-provider-slot-preview-only"
  | "backup-provider-slot-preview-only"
  | "local-private-alternative-preview-only"
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
  | "in-memory-only-selection-reference"
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

export type ProviderAdapterSelectionReadinessId =
  | "server-only-provider-selection-helper-state"
  | "text-adapter-audit-approval-join-review-dependency-state"
  | "provider-selection-input-state"
  | "provider-selection-admission-check-state"
  | "provider-slot-matrix-state"
  | "provider-slot-selection-output-state"
  | "opaque-credential-reference-input-state"
  | "opaque-credential-reference-output-state"
  | "selection-envelope-state"
  | "evidence-preview-state"
  | "audit-preview-state"
  | "approval-preview-state"
  | "credential-value-boundary-state"
  | "env-var-boundary-state"
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

export type ProviderAdapterSelectionSourceTextAdapterAuditApprovalJoinReviewReference =
  "Backend-owned minimal text adapter audit and approval join review";
export type ProviderAdapterSelectionSourceTextAdapterAuditApprovalJoinAcceptancePostureReference =
  "Text adapter audit and approval join acceptance posture";
export type ProviderAdapterSelectionSourceTextAdapterAuditApprovalJoinAuditSummaryReference =
  "Text adapter audit and approval join review audit summary";
export type ProviderAdapterSelectionSourceTextAdapterResultCaptureReviewReference =
  "Backend-owned minimal text adapter result capture review";
export type ProviderAdapterSelectionSourceMinimalTextAdapterReviewReference =
  "Backend-owned minimal text adapter review";
export type ProviderAdapterSelectionSourceManualApprovalDecisionReviewReference =
  "Backend-owned synthetic dry-run manual approval decision review";
export type ProviderAdapterSelectionNextReviewRecoveryRequirement =
  "5866-5897 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference Review and Recovery Preview";

type ProviderAdapterSelectionCommonRecordFields = Readonly<{
  version: string;
  stableId: ProviderAdapterSelectionMvpId;
  capabilityFamily: ProviderAdapterSelectionCapabilityFamilyLabel;
  workspaceTarget: ProviderAdapterSelectionWorkspaceTarget;
  providerSlotLabel: ProviderAdapterSelectionProviderSlotLabel;
  backupProviderSlotLabel: ProviderAdapterSelectionProviderSlotLabel;
  localPrivateAlternativeLabel: ProviderAdapterSelectionLocalPrivateAlternativeLabel;
  opaqueCredentialReferenceLabel: ProviderAdapterSelectionOpaqueCredentialReferenceLabel;
  credentialReferencePosture: ProviderAdapterSelectionCredentialReferencePosture;
  credentialValueState: ProviderAdapterSelectionCredentialValueState;
  envVarState: ProviderAdapterSelectionEnvVarState;
  providerKeyState: ProviderAdapterSelectionProviderKeyState;
  sourceTextAdapterAuditApprovalJoinReviewReference: ProviderAdapterSelectionSourceTextAdapterAuditApprovalJoinReviewReference;
  sourceTextAdapterAuditApprovalJoinAcceptancePostureReference: ProviderAdapterSelectionSourceTextAdapterAuditApprovalJoinAcceptancePostureReference;
  sourceTextAdapterAuditApprovalJoinAuditSummaryReference: ProviderAdapterSelectionSourceTextAdapterAuditApprovalJoinAuditSummaryReference;
  sourceTextAdapterResultCaptureReviewReference: ProviderAdapterSelectionSourceTextAdapterResultCaptureReviewReference;
  sourceMinimalTextAdapterReviewReference: ProviderAdapterSelectionSourceMinimalTextAdapterReviewReference;
  sourceManualApprovalDecisionReviewReference: ProviderAdapterSelectionSourceManualApprovalDecisionReviewReference;
  backendOwnedPosture: ProviderAdapterSelectionBackendOwnedPosture;
  serverOnlyPosture: ProviderAdapterSelectionServerOnlyPosture;
  providerSelectionPosture: ProviderAdapterSelectionPosture;
  manualGatedPosture: ProviderAdapterSelectionManualGatedPosture;
  fixtureOnlyPosture: ProviderAdapterSelectionFixtureOnlyPosture;
  inMemoryOnlyPosture: ProviderAdapterSelectionInMemoryOnlyPosture;
  noProviderSdkImport: ProviderAdapterSelectionNoProviderSdkImport;
  noProviderExecution: ProviderAdapterSelectionNoProviderExecution;
  noModelCalls: ProviderAdapterSelectionNoModelCalls;
  noPromptSending: ProviderAdapterSelectionNoPromptSending;
  noFrontendRequest: ProviderAdapterSelectionNoFrontendRequest;
  noApiRoute: ProviderAdapterSelectionNoApiRoute;
  noQueueWorkerJobDispatch: ProviderAdapterSelectionNoQueueWorkerJobDispatch;
  noPersistence: ProviderAdapterSelectionNoPersistence;
  noDatabaseWrites: ProviderAdapterSelectionNoDatabaseWrites;
  noFileWrites: ProviderAdapterSelectionNoFileWrites;
  noResultPersistence: ProviderAdapterSelectionNoResultPersistence;
  noAuditPersistence: ProviderAdapterSelectionNoAuditPersistence;
  noApprovalPersistence: ProviderAdapterSelectionNoApprovalPersistence;
  noApprovalRecording: ProviderAdapterSelectionNoApprovalRecording;
  noApprovalTokenIssuance: ProviderAdapterSelectionNoApprovalTokenIssuance;
  noApprovalLeaseIssuance: ProviderAdapterSelectionNoApprovalLeaseIssuance;
  nextReviewRecoveryRequirement: ProviderAdapterSelectionNextReviewRecoveryRequirement;
}>;

export type ProviderSlotRecord = Readonly<{
  slotKey: ProviderSlotRecordKey;
  slotId: ProviderSelectionPreviewSlotId;
  slotOrder: ProviderSlotOrder;
  slotLabel: ProviderAdapterSelectionProviderSlotLabel;
  previewState: "preview-only";
  blockedLiveAction: string;
}>;

export type MinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecord =
  Readonly<
    ProviderAdapterSelectionCommonRecordFields & {
      key: ProviderAdapterSelectionMvpKey;
      selectionState: ProviderAdapterSelectionState;
      providerSelectionId: ProviderSelectionPreviewId;
      providerSlotId: ProviderSelectionPreviewSlotId;
      credentialReferenceId: ProviderSelectionPreviewCredentialReferenceId;
      selectionDigest: ProviderSelectionPreviewDigest;
      selectedProviderState: ProviderAdapterSelectionSelectedProviderState;
      credentialReferenceState: ProviderAdapterSelectionCredentialReferenceState;
      timestampPosture: ProviderAdapterSelectionTimestampPosture;
      currentReadiness: ProviderAdapterSelectionCurrentReadiness;
      reviewRecoveryPreviewNextStatement: ProviderAdapterSelectionReviewRecoveryNextStatement;
    }
  >;

export type ProviderAdapterSelectionInputRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderAdapterSelectionInputKey;
    requestVersion: ProviderAdapterSelectionRequestVersion;
    requestState: ProviderAdapterSelectionRequestState;
    inputState: ProviderAdapterSelectionInputState;
    frontendRequestState: ProviderAdapterSelectionFrontendRequestState;
    apiRouteState: ProviderAdapterSelectionApiRouteState;
    promptPayloadPosture: ProviderAdapterSelectionPromptPayloadPosture;
    promptTransmissionState: ProviderAdapterSelectionPromptTransmissionState;
    selectedProviderPosture: "preview slot only";
    credentialValuePosture: ProviderAdapterSelectionCredentialValuePosture;
    providerPayloadPosture: ProviderAdapterSelectionProviderPayloadPosture;
    modelOutputPosture: ProviderAdapterSelectionModelOutputPosture;
    persistenceTargetPosture: ProviderAdapterSelectionPersistenceTargetPosture;
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement: ProviderAdapterSelectionNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement;
  }
>;

export type ProviderAdapterSelectionAdmissionCheckRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderAdapterSelectionAdmissionCheckKey;
    admissionState: ProviderAdapterSelectionAdmissionState;
    requiredChecks: readonly string[];
    blockedLiveAction: string;
  }
>;

export type ProviderSlotMatrixRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderSlotMatrixKey;
    providerSlotMatrixState: ProviderSlotMatrixState;
    fallbackDisabledSlotLabel: "fallback disabled slot";
    supportedCapabilityState: ProviderAdapterSelectionSupportedCapabilityState;
    slots: readonly ProviderSlotRecord[];
  }
>;

export type ProviderAdapterSelectionOutputRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderAdapterSelectionOutputKey;
    responseVersion: ProviderAdapterSelectionResponseVersion;
    responseState: ProviderAdapterSelectionResponseState;
    selectionState: ProviderAdapterSelectionOutputState;
    providerSelectionId: ProviderSelectionPreviewId;
    providerSlotId: ProviderSelectionPreviewSlotId;
    credentialReferenceId: ProviderSelectionPreviewCredentialReferenceId;
    selectionDigest: ProviderSelectionPreviewDigest;
    selectedProviderState: ProviderAdapterSelectionSelectedProviderState;
    credentialReferenceState: ProviderAdapterSelectionCredentialReferenceState;
    providerSdkImportState: ProviderAdapterSelectionProviderSdkImportState;
    providerExecutionState: ProviderAdapterSelectionProviderExecutionState;
    promptTransmissionState: ProviderAdapterSelectionPromptTransmissionState;
    providerResponseState: ProviderAdapterSelectionProviderResponseState;
    modelOutputState: ProviderAdapterSelectionModelOutputState;
    resultReference: ProviderSelectionPreviewResultReference;
    auditReference: ProviderSelectionPreviewAuditReference;
    approvalReference: ProviderSelectionPreviewApprovalReference;
    evidencePacketReference: ProviderSelectionPreviewEvidenceReference;
    timestampPosture: ProviderAdapterSelectionTimestampPosture;
    persistenceState: ProviderAdapterSelectionPersistenceState;
    explicitProviderSelectionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement: ProviderAdapterSelectionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement;
    currentReadiness: ProviderAdapterSelectionCurrentReadiness;
  }
>;

export type OpaqueCredentialReferenceInputRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: OpaqueCredentialReferenceInputKey;
    credentialReferenceInputState: OpaqueCredentialReferenceInputState;
    credentialReferenceId: ProviderSelectionPreviewCredentialReferenceId;
    credentialValuePosture: ProviderAdapterSelectionCredentialValuePosture;
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement: ProviderAdapterSelectionNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement;
  }
>;

export type OpaqueCredentialReferenceOutputRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: OpaqueCredentialReferenceOutputKey;
    credentialReferenceOutputState: OpaqueCredentialReferenceOutputState;
    credentialReferenceId: ProviderSelectionPreviewCredentialReferenceId;
    credentialReferenceState: ProviderAdapterSelectionCredentialReferenceState;
  }
>;

export type ProviderAdapterSelectionEnvelopeRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderAdapterSelectionEnvelopeKey;
    envelopeState: ProviderAdapterSelectionEnvelopeState;
    providerSelectionId: ProviderSelectionPreviewId;
    selectionDigest: ProviderSelectionPreviewDigest;
    promptPayloadPosture: ProviderAdapterSelectionPromptPayloadPosture;
    promptTransmissionState: ProviderAdapterSelectionPromptTransmissionState;
    providerPayloadPosture: ProviderAdapterSelectionProviderPayloadPosture;
    providerResponseState: ProviderAdapterSelectionProviderResponseState;
    modelOutputState: ProviderAdapterSelectionModelOutputState;
    resultReference: ProviderSelectionPreviewResultReference;
    auditReference: ProviderSelectionPreviewAuditReference;
    approvalReference: ProviderSelectionPreviewApprovalReference;
    evidencePacketReference: ProviderSelectionPreviewEvidenceReference;
  }
>;

export type ProviderAdapterSelectionEvidencePreviewRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderAdapterSelectionEvidencePreviewKey;
    evidencePreviewState: ProviderAdapterSelectionEvidencePreviewState;
    evidenceSummaryLines: readonly string[];
    evidenceReference: ProviderSelectionPreviewEvidenceReference;
  }
>;

export type ProviderAdapterSelectionAuditPreviewRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderAdapterSelectionAuditPreviewKey;
    auditPreviewState: ProviderAdapterSelectionAuditPreviewState;
    auditSummaryLines: readonly string[];
    auditReference: ProviderSelectionPreviewAuditReference;
  }
>;

export type ProviderAdapterSelectionApprovalPreviewRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderAdapterSelectionApprovalPreviewKey;
    approvalPreviewState: ProviderAdapterSelectionApprovalPreviewState;
    approvalSummaryLines: readonly string[];
    approvalReference: ProviderSelectionPreviewApprovalReference;
    approvalFixtureState: ProviderAdapterSelectionApprovalFixtureState;
    manualConfirmationFixtureState: ProviderAdapterSelectionManualConfirmationFixtureState;
    approvalTokenState: ProviderAdapterSelectionApprovalTokenState;
    approvalLeaseState: ProviderAdapterSelectionApprovalLeaseState;
    approvalRecordingState: ProviderAdapterSelectionApprovalRecordingState;
  }
>;

export type ProviderAdapterSelectionSafetyGateSummaryRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderAdapterSelectionSafetyGateSummaryKey;
    gateSummaryState: ProviderAdapterSelectionGateSummaryState;
    topGateLabels: readonly string[];
    blockedLiveActions: readonly string[];
  }
>;

export type ProviderAdapterSelectionBlockedLiveProviderSummaryRecord =
  Readonly<
    ProviderAdapterSelectionCommonRecordFields & {
      key: ProviderAdapterSelectionBlockedLiveProviderSummaryKey;
      blockedLiveProviderSummaryState: ProviderAdapterSelectionBlockedLiveProviderState;
      blockedLiveActions: readonly string[];
    }
  >;

export type ProviderAdapterSelectionRequestRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderAdapterSelectionRequestKey;
    requestVersion: ProviderAdapterSelectionRequestVersion;
    requestState: ProviderAdapterSelectionRequestState;
    frontendRequestState: ProviderAdapterSelectionFrontendRequestState;
    apiRouteState: ProviderAdapterSelectionApiRouteState;
    promptPayloadPosture: ProviderAdapterSelectionPromptPayloadPosture;
    promptTransmissionState: ProviderAdapterSelectionPromptTransmissionState;
    selectedProviderPosture: "preview slot only";
    credentialReferencePosture: ProviderAdapterSelectionCredentialReferencePosture;
    credentialValuePosture: ProviderAdapterSelectionCredentialValuePosture;
    providerPayloadPosture: ProviderAdapterSelectionProviderPayloadPosture;
    modelOutputPosture: ProviderAdapterSelectionModelOutputPosture;
    persistenceTargetPosture: ProviderAdapterSelectionPersistenceTargetPosture;
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement: ProviderAdapterSelectionNoFrontendRequestNoApiRouteNoProviderCallNoSecretReadStatement;
  }
>;

export type ProviderAdapterSelectionResponseRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderAdapterSelectionResponseKey;
    responseVersion: ProviderAdapterSelectionResponseVersion;
    responseState: ProviderAdapterSelectionResponseState;
    selectionState: ProviderAdapterSelectionState;
    selectedProviderState: ProviderAdapterSelectionSelectedProviderState;
    credentialReferenceState: ProviderAdapterSelectionCredentialReferenceState;
    providerSdkImportState: ProviderAdapterSelectionProviderSdkImportState;
    providerResponseState: ProviderAdapterSelectionProviderResponseState;
    modelOutputState: ProviderAdapterSelectionModelOutputState;
    resultPersistenceState: ProviderAdapterSelectionPersistenceState;
    auditPersistenceState: ProviderAdapterSelectionPersistenceState;
    approvalPersistenceState: ProviderAdapterSelectionPersistenceState;
    databaseWriteState: ProviderAdapterSelectionDatabaseWriteState;
    fileWriteState: ProviderAdapterSelectionFileWriteState;
    explicitProviderSelectionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement: ProviderAdapterSelectionOnlyNoProviderOutputNoSecretReadNoPersistenceStatement;
  }
>;

export type ProviderAdapterSelectionErrorRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    key: ProviderAdapterSelectionErrorKey;
    errorVersion: ProviderAdapterSelectionErrorVersion;
    errorState: ProviderAdapterSelectionErrorState;
    failedGateExamples: readonly string[];
    missingTextAdapterAuditApprovalJoinReviewExample: string;
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
    retryPosture: ProviderAdapterSelectionRetryPosture;
    fallbackPosture: ProviderAdapterSelectionFallbackPosture;
    explicitNoLiveErrorNoRetryNoFallbackStatement: ProviderAdapterSelectionNoLiveErrorNoRetryNoFallbackStatement;
  }
>;

export type ProviderAdapterSelectionGateRecord = Readonly<{
  version: ProviderAdapterSelectionGateVersion;
  key: `${ProviderAdapterSelectionMvpId}:${ProviderAdapterSelectionGateId}`;
  stableId: ProviderAdapterSelectionMvpId;
  capabilityFamily: ProviderAdapterSelectionCapabilityFamilyLabel;
  gateId: ProviderAdapterSelectionGateId;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
  nextReviewRecoveryRequirement: ProviderAdapterSelectionNextReviewRecoveryRequirement;
}>;

export type ProviderAdapterSelectionReadinessMatrixRecord = Readonly<{
  version: ProviderAdapterSelectionReadinessMatrixVersion;
  key: `${ProviderAdapterSelectionMvpId}:${ProviderAdapterSelectionReadinessId}`;
  stableId: ProviderAdapterSelectionMvpId;
  capabilityFamily: ProviderAdapterSelectionCapabilityFamilyLabel;
  readinessId: ProviderAdapterSelectionReadinessId;
  label: string;
  state: string;
  evidence: string;
  currentReadiness: ProviderAdapterSelectionCurrentReadiness;
  nextSafeAction: string;
}>;

export type MinimalProviderAdapterSelectionServerRunRecord = Readonly<
  ProviderAdapterSelectionCommonRecordFields & {
    providerSelectionId: ProviderSelectionPreviewId;
    providerSlotId: ProviderSelectionPreviewSlotId;
    credentialReferenceId: ProviderSelectionPreviewCredentialReferenceId;
    selectionDigest: ProviderSelectionPreviewDigest;
    selectionState: ProviderAdapterSelectionState;
    selectedProviderState: ProviderAdapterSelectionSelectedProviderState;
    credentialReferenceState: ProviderAdapterSelectionCredentialReferenceState;
    providerSdkImportState: ProviderAdapterSelectionProviderSdkImportState;
    providerExecutionState: ProviderAdapterSelectionProviderExecutionState;
    promptPayloadPosture: ProviderAdapterSelectionPromptPayloadPosture;
    promptTransmissionState: ProviderAdapterSelectionPromptTransmissionState;
    providerPayloadPosture: ProviderAdapterSelectionProviderPayloadPosture;
    providerResponseState: ProviderAdapterSelectionProviderResponseState;
    modelOutputState: ProviderAdapterSelectionModelOutputState;
    frontendRequestState: ProviderAdapterSelectionFrontendRequestState;
    apiRouteState: ProviderAdapterSelectionApiRouteState;
    queueDispatchState: ProviderAdapterSelectionDispatchState;
    workerDispatchState: ProviderAdapterSelectionDispatchState;
    jobExecutionState: ProviderAdapterSelectionDispatchState;
    approvalFixtureState: ProviderAdapterSelectionApprovalFixtureState;
    manualConfirmationFixtureState: ProviderAdapterSelectionManualConfirmationFixtureState;
    approvalTokenState: ProviderAdapterSelectionApprovalTokenState;
    approvalLeaseState: ProviderAdapterSelectionApprovalLeaseState;
    resultReference: ProviderSelectionPreviewResultReference;
    auditReference: ProviderSelectionPreviewAuditReference;
    approvalReference: ProviderSelectionPreviewApprovalReference;
    evidencePacketReference: ProviderSelectionPreviewEvidenceReference;
    timestampPosture: ProviderAdapterSelectionTimestampPosture;
    persistenceState: ProviderAdapterSelectionPersistenceState;
    noFrontendRequestStatement: "no frontend request is created";
    noApiRouteStatement: "no API route is created";
    noProviderCallStatement: "no provider call exists";
    noModelCallStatement: "no model call exists";
    reviewRecoveryPreviewNextStatement: ProviderAdapterSelectionReviewRecoveryNextStatement;
    currentReadiness: ProviderAdapterSelectionCurrentReadiness;
  }
>;

export type ProviderAdapterSelectionSummary = Readonly<{
  version: ProviderAdapterSelectionSummaryVersion;
  highestDetectedPhase: number;
  latestCompletedBatch: typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH;
  previousCompletedBatch: typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch: typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH;
  currentReadiness: ProviderAdapterSelectionCurrentReadiness;
  mvpCount: number;
  slotMatrixCount: number;
  opaqueCredentialReferenceCount: number;
  summaryLines: readonly string[];
}>;

export type ProviderAdapterSelectionGateSummary = Readonly<{
  version: ProviderAdapterSelectionGateSummaryVersion;
  gateCount: number;
  blockedLiveActionCount: number;
  currentReadiness: ProviderAdapterSelectionCurrentReadiness;
  summaryLines: readonly string[];
}>;

export type ProviderAdapterSelectionReadinessSummary = Readonly<{
  version: ProviderAdapterSelectionReadinessSummaryVersion;
  readinessCount: number;
  currentReadiness: ProviderAdapterSelectionCurrentReadiness;
  nextSafeAction: string;
  summaryLines: readonly string[];
}>;

export type ProviderAdapterSelectionReviewRecoveryChecklist =
  readonly string[];
