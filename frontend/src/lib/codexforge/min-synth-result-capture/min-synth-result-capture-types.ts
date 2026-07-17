import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
  SyntheticExecutionResultReviewRecord,
} from "../minimal-synth-exec-review";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  MinimalManualGatedSyntheticDryRunExecutionMvpId,
  MinimalManualGatedSyntheticDryRunExecutionMvpKey,
  MinimalManualGatedSyntheticDryRunExecutionMvpRecord,
  SyntheticMvpExecutionResultKey,
  SyntheticMvpExecutionResultRecord,
  SyntheticMvpManualApprovalFixtureKey,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH =
  "5450-5481 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_PHASE =
  5481;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5418-5449 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5482-5513 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture Review and Recovery Preview";

export const SYNTHETIC_RESULT_CAPTURE_SECTION_TITLES = [
  "Backend-owned minimal manual-gated synthetic dry-run result capture MVP",
  "Synthetic result capture input",
  "Synthetic result capture output",
  "Synthetic result capture envelope",
  "Synthetic result capture gates",
  "Synthetic result capture readiness matrix",
  "Synthetic result capture audit and approval preview",
] as const;

export type MinimalManualGatedSyntheticDryRunResultCaptureMvpId =
  MinimalManualGatedSyntheticDryRunExecutionMvpId;

export type MinimalManualGatedSyntheticDryRunResultCaptureMvpVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-mvp-v1";
export type SyntheticResultCaptureInputVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-input-v1";
export type SyntheticResultCaptureAdmissionCheckVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-admission-check-v1";
export type SyntheticResultCaptureOutputVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-output-v1";
export type SyntheticResultCaptureEnvelopeVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-envelope-v1";
export type SyntheticResultCaptureAuditPreviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-audit-preview-v1";
export type SyntheticResultCaptureApprovalPreviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-approval-preview-v1";
export type SyntheticResultCaptureEvidencePacketVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-evidence-packet-v1";
export type SyntheticResultCaptureSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-safety-gate-summary-v1";
export type SyntheticResultCaptureBlockedLivePersistenceSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-blocked-live-persistence-summary-v1";
export type SyntheticResultCaptureRequestVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-request-v1";
export type SyntheticResultCaptureResponseVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-response-v1";
export type SyntheticResultCaptureErrorVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-error-v1";
export type SyntheticResultCaptureGateVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-gate-v1";
export type SyntheticResultCaptureReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-readiness-matrix-v1";
export type SyntheticResultCaptureSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-summary-v1";
export type SyntheticResultCaptureGateSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-gate-summary-v1";
export type SyntheticResultCaptureReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-readiness-summary-v1";

export type SyntheticResultCaptureBackendOwnedPosture = "backend-owned";
export type SyntheticResultCaptureServerOnlyPosture = "server-only";
export type SyntheticResultCaptureSyntheticOnlyPosture = "synthetic-only";
export type SyntheticResultCaptureManualGatedPosture = "manual-gated";
export type SyntheticResultCaptureInMemoryOnlyPosture = "in-memory-only";
export type SyntheticResultCaptureNoProviderExecution = "no provider execution";
export type SyntheticResultCaptureNoModelCalls = "no model calls";
export type SyntheticResultCaptureNoPromptSending = "no prompt sending";
export type SyntheticResultCaptureNoFrontendRequest = "no frontend request";
export type SyntheticResultCaptureNoApiRoute = "no API route";
export type SyntheticResultCaptureNoQueueWorkerJobDispatch =
  "no queue/worker/job dispatch";
export type SyntheticResultCaptureNoPersistence = "no persistence";
export type SyntheticResultCaptureNoDatabaseWrites = "no database writes";
export type SyntheticResultCaptureNoFileWrites = "no file writes";
export type SyntheticResultCaptureNoApprovalRecording =
  "no approval recording";
export type SyntheticResultCaptureNoApprovalTokenIssuance =
  "no approval token issuance";
export type SyntheticResultCaptureNoApprovalLeaseIssuance =
  "no approval lease issuance";
export type SyntheticResultCaptureCurrentReadiness =
  "minimal-synthetic-result-capture-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent";
export type SyntheticResultCaptureState =
  "captured-synthetic-in-memory-only";
export type SyntheticResultCaptureResultState =
  "deterministic synthetic result captured in memory only";
export type SyntheticResultCapturePersistenceState = "not implemented";
export type SyntheticResultCaptureProviderResponseState = "not received";
export type SyntheticResultCaptureModelOutputState = "not generated";
export type SyntheticResultCapturePromptState = "not sent";
export type SyntheticResultCaptureFrontendRequestState = "not created";
export type SyntheticResultCaptureApiRouteState = "not created";
export type SyntheticResultCapturePersistenceTargetState = "none";
export type SyntheticResultCaptureDatabaseWriteTargetState = "none";
export type SyntheticResultCaptureFileWriteTargetState = "none";
export type SyntheticResultCaptureDispatchState = "blocked";
export type SyntheticResultCaptureProviderSdkImportState = "not imported";
export type SyntheticResultCaptureApprovalFixtureState = "preview-only";
export type SyntheticResultCaptureManualConfirmationFixtureState =
  "preview-only";
export type SyntheticResultCaptureApprovalRecordingState = "not recorded";
export type SyntheticResultCaptureApprovalTokenState = "not issued";
export type SyntheticResultCaptureApprovalLeaseState = "not created";
export type SyntheticResultCaptureTimestampPosture =
  "static fixture label only / no real timestamp";
export type SyntheticResultCaptureRetryPosture = "disabled";
export type SyntheticResultCaptureFallbackPosture = "disabled";
export type SyntheticResultCaptureDeterministicStatement =
  "deterministic synthetic capture only";
export type SyntheticResultCaptureInMemoryOnlyStatement =
  "synthetic result capture is produced in memory only";
export type SyntheticResultCaptureServerOnlyHelperStatement =
  "server-only synthetic result capture helper exists";
export type SyntheticResultCaptureNoFrontendRequestStatement =
  "no frontend request is created";
export type SyntheticResultCaptureNoApiRouteStatement =
  "no API route is created";
export type SyntheticResultCaptureNoRealApprovalRequestStatement =
  "no real approval request";
export type SyntheticResultCaptureNoRealApprovalRecordingStatement =
  "no real approval recording";
export type SyntheticResultCaptureApprovalFixtureStatement =
  "approval fixture is preview-only";
export type SyntheticResultCaptureManualConfirmationStatement =
  "manual confirmation fixture is preview-only";
export type SyntheticResultCaptureApprovalTokenStatement =
  "approval token is not issued";
export type SyntheticResultCaptureApprovalLeaseStatement =
  "approval lease is not created";
export type SyntheticResultCaptureRequestState =
  "deterministic synthetic capture request only";
export type SyntheticResultCaptureResponseState =
  "returned by server-only smoke/helper only";
export type SyntheticResultCaptureErrorState = "deterministic preview only";
export type SyntheticResultCaptureEvidencePacketState =
  "preview-only / not persisted";
export type SyntheticResultCapturePreviewReferenceState =
  "preview-only / not persisted";

export type SyntheticResultId =
  SyntheticMvpExecutionResultRecord["resultId"];
export type SyntheticResultCaptureId =
  `synthetic-result-capture-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureDigest =
  `synthetic-result-capture-digest-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}:in-memory-only`;
export type SyntheticResultCaptureResultReference =
  `synthetic-result-capture-result-reference-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureAuditReference =
  `synthetic-result-capture-audit-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureApprovalReference =
  `synthetic-result-capture-approval-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureEvidenceReference =
  `synthetic-result-capture-evidence-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;

export type MinimalManualGatedSyntheticDryRunResultCaptureMvpKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-mvp:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureInputKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-input:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureAdmissionCheckKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-admission-check:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureOutputKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-output:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureEnvelopeKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-envelope:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureAuditPreviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-audit-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureApprovalPreviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-approval-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureEvidencePacketKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-evidence-packet:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-safety-gate-summary:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureBlockedLivePersistenceSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-blocked-live-persistence-summary:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureRequestKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-request:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureResponseKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-response:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;
export type SyntheticResultCaptureErrorKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-error:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}`;

export type SyntheticResultCaptureGateId =
  | "backend-only-boundary"
  | "server-only-module-boundary"
  | "synthetic-only-capture-mode"
  | "manual-approval-fixture"
  | "manual-confirmation-fixture"
  | "synthetic-execution-result-present"
  | "deterministic-capture-id"
  | "deterministic-digest"
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
  | "privacy-redaction-preview";

export type SyntheticResultCaptureReadinessMatrixId =
  | "server-only-capture-helper-state"
  | "synthetic-execution-result-dependency"
  | "result-capture-input-state"
  | "capture-admission-check-state"
  | "capture-output-state"
  | "capture-envelope-state"
  | "audit-preview-state"
  | "approval-preview-state"
  | "evidence-packet-state"
  | "provider-boundary-state"
  | "prompt-boundary-state"
  | "model-boundary-state"
  | "frontend-request-boundary-state"
  | "api-route-boundary-state"
  | "queue-boundary-state"
  | "worker-boundary-state"
  | "job-boundary-state"
  | "persistence-boundary-state"
  | "database-boundary-state"
  | "file-boundary-state";

export type SyntheticResultCapturePayload = Readonly<{
  label: "static synthetic result capture placeholder only";
  captureEnvelopeState: "preview-only";
  evidenceDigest: string;
  auditPreviewState: SyntheticResultCaptureEvidencePacketState;
  approvalPreviewState: SyntheticResultCaptureApprovalFixtureState;
}>;

export type SyntheticExecutionResultFixtureInput = Readonly<{
  key: SyntheticMvpExecutionResultKey;
  executionMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
  resultId: SyntheticResultId;
  syntheticDigest: SyntheticMvpExecutionResultRecord["syntheticDigest"];
  providerResponseState: SyntheticResultCaptureProviderResponseState;
  modelOutputState: SyntheticResultCaptureModelOutputState;
  deterministicSyntheticResultStatement:
    SyntheticMvpExecutionResultRecord["deterministicSyntheticResultStatement"];
  inMemoryOnlyResultStatement:
    SyntheticMvpExecutionResultRecord["inMemoryOnlyResultStatement"];
}>;

export type SyntheticResultCaptureCommonRecordFields = Readonly<{
  stableId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
  requestLabel: MinimalManualGatedSyntheticDryRunExecutionMvpRecord["requestLabel"];
  label: string;
  selectedCapabilityFamily:
    MinimalManualGatedSyntheticDryRunExecutionMvpRecord["selectedCapabilityFamily"];
  workspaceTarget: MinimalManualGatedSyntheticDryRunExecutionMvpRecord["workspaceTarget"];
  providerSlotLabel:
    MinimalManualGatedSyntheticDryRunExecutionMvpRecord["providerSlotLabel"];
  localPrivateAlternativeLabel:
    MinimalManualGatedSyntheticDryRunExecutionMvpRecord["localPrivateAlternativeLabel"];
  sourceMinimalSyntheticExecutionMvpReference:
    MinimalManualGatedSyntheticDryRunExecutionMvpKey;
  sourceMinimalSyntheticExecutionReviewReference:
    BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord["key"];
  sourceSyntheticExecutionResultReference: SyntheticMvpExecutionResultKey;
  sourceSyntheticExecutionResultReviewReference:
    SyntheticExecutionResultReviewRecord["key"];
  sourceManualApprovalDecisionReviewReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
  sourceManualApprovalFixtureReference: SyntheticMvpManualApprovalFixtureKey;
  sourceManualConfirmationFixtureReference:
    SyntheticMvpManualApprovalFixtureKey;
  backendOwnedPosture: SyntheticResultCaptureBackendOwnedPosture;
  serverOnlyPosture: SyntheticResultCaptureServerOnlyPosture;
  syntheticOnlyPosture: SyntheticResultCaptureSyntheticOnlyPosture;
  manualGatedPosture: SyntheticResultCaptureManualGatedPosture;
  inMemoryOnlyPosture: SyntheticResultCaptureInMemoryOnlyPosture;
  noProviderExecution: SyntheticResultCaptureNoProviderExecution;
  noModelCalls: SyntheticResultCaptureNoModelCalls;
  noPromptSending: SyntheticResultCaptureNoPromptSending;
  noFrontendRequest: SyntheticResultCaptureNoFrontendRequest;
  noApiRoute: SyntheticResultCaptureNoApiRoute;
  noQueueWorkerJobDispatch:
    SyntheticResultCaptureNoQueueWorkerJobDispatch;
  noPersistence: SyntheticResultCaptureNoPersistence;
  noDatabaseWrites: SyntheticResultCaptureNoDatabaseWrites;
  noFileWrites: SyntheticResultCaptureNoFileWrites;
  noApprovalRecording: SyntheticResultCaptureNoApprovalRecording;
  noApprovalTokenIssuance:
    SyntheticResultCaptureNoApprovalTokenIssuance;
  noApprovalLeaseIssuance:
    SyntheticResultCaptureNoApprovalLeaseIssuance;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord = Readonly<
  {
    id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    key: MinimalManualGatedSyntheticDryRunResultCaptureMvpKey;
    version: MinimalManualGatedSyntheticDryRunResultCaptureMvpVersion;
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureInputRecord = Readonly<
  {
    key: SyntheticResultCaptureInputKey;
    version: SyntheticResultCaptureInputVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    requestState: SyntheticResultCaptureRequestState;
    frontendRequestState: SyntheticResultCaptureFrontendRequestState;
    apiRouteState: SyntheticResultCaptureApiRouteState;
    resultPayloadPosture: "deterministic synthetic result fixture only";
    providerPayloadPosture: "none";
    modelOutputPosture: "none";
    persistenceTargetPosture: "none";
    explicitNoFrontendRequestNoApiRouteNoPersistenceStatement:
      "No frontend request. No API route. No persistence.";
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureAdmissionCheckRecord = Readonly<
  {
    key: SyntheticResultCaptureAdmissionCheckKey;
    version: SyntheticResultCaptureAdmissionCheckVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    backendOwnedModeState: "validated";
    serverOnlyModeState: "validated";
    syntheticOnlyModeState: "validated";
    manualGatedFixtureModeState: "validated";
    approvalFixturePreviewState: "validated";
    manualConfirmationPreviewState: "validated";
    syntheticExecutionResultPresentState: "validated";
    providerResponseBlockedState: "validated";
    modelOutputBlockedState: "validated";
    promptSendingBlockedState: "validated";
    frontendRequestBlockedState: "validated";
    apiRouteBlockedState: "validated";
    persistenceBlockedState: "validated";
    databaseFileWriteBlockedState: "validated";
    queueWorkerJobDispatchBlockedState: "validated";
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureOutputRecord = Readonly<
  {
    key: SyntheticResultCaptureOutputKey;
    version: SyntheticResultCaptureOutputVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    captureState: SyntheticResultCaptureState;
    resultState: SyntheticResultCaptureResultState;
    syntheticResultId: SyntheticResultId;
    syntheticCaptureId: SyntheticResultCaptureId;
    syntheticDigest: SyntheticResultCaptureDigest;
    resultReference: SyntheticResultCaptureResultReference;
    auditReference: SyntheticResultCaptureAuditReference;
    approvalReference: SyntheticResultCaptureApprovalReference;
    resultPayload: SyntheticResultCapturePayload;
    captureTimestampPosture: SyntheticResultCaptureTimestampPosture;
    persistenceState: SyntheticResultCapturePersistenceState;
    providerResponseState: SyntheticResultCaptureProviderResponseState;
    modelOutputState: SyntheticResultCaptureModelOutputState;
    deterministicSyntheticCaptureStatement:
      SyntheticResultCaptureDeterministicStatement;
    inMemoryOnlyCaptureStatement:
      SyntheticResultCaptureInMemoryOnlyStatement;
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureEnvelopeRecord = Readonly<
  {
    key: SyntheticResultCaptureEnvelopeKey;
    version: SyntheticResultCaptureEnvelopeVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    requestReference: SyntheticResultCaptureRequestKey;
    responseReference: SyntheticResultCaptureResponseKey;
    errorReference: SyntheticResultCaptureErrorKey;
    outputReference: SyntheticResultCaptureOutputKey;
    captureState: SyntheticResultCaptureState;
    resultState: SyntheticResultCaptureResultState;
    providerResponseState: SyntheticResultCaptureProviderResponseState;
    modelOutputState: SyntheticResultCaptureModelOutputState;
    resultPersistenceState: SyntheticResultCapturePersistenceState;
    auditPersistenceState: SyntheticResultCapturePersistenceState;
    approvalPersistenceState: SyntheticResultCapturePersistenceState;
    databaseWriteState: SyntheticResultCapturePersistenceState;
    fileWriteState: SyntheticResultCapturePersistenceState;
    explicitSyntheticCaptureOnlyNoProviderOutputNoPersistenceStatement:
      "Synthetic capture only. No provider output. No persistence.";
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureAuditPreviewRecord = Readonly<
  {
    key: SyntheticResultCaptureAuditPreviewKey;
    version: SyntheticResultCaptureAuditPreviewVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    auditReference: SyntheticResultCaptureAuditReference;
    auditState: SyntheticResultCapturePreviewReferenceState;
    auditSummaryLines: readonly string[];
    explicitNoAuditPersistenceStatement: "no audit persistence";
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureApprovalPreviewRecord = Readonly<
  {
    key: SyntheticResultCaptureApprovalPreviewKey;
    version: SyntheticResultCaptureApprovalPreviewVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    approvalReference: SyntheticResultCaptureApprovalReference;
    approvalState: SyntheticResultCapturePreviewReferenceState;
    approvalFixtureState: SyntheticResultCaptureApprovalFixtureState;
    manualConfirmationFixtureState:
      SyntheticResultCaptureManualConfirmationFixtureState;
    approvalTokenState: SyntheticResultCaptureApprovalTokenState;
    approvalLeaseState: SyntheticResultCaptureApprovalLeaseState;
    explicitNoApprovalPersistenceStatement: "no approval persistence";
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureEvidencePacketRecord = Readonly<
  {
    key: SyntheticResultCaptureEvidencePacketKey;
    version: SyntheticResultCaptureEvidencePacketVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    evidenceReference: SyntheticResultCaptureEvidenceReference;
    evidencePacketState: SyntheticResultCaptureEvidencePacketState;
    evidenceSummaryLines: readonly string[];
    syntheticDigest: SyntheticResultCaptureDigest;
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureSafetyGateSummaryRecord = Readonly<
  {
    key: SyntheticResultCaptureSafetyGateSummaryKey;
    version: SyntheticResultCaptureSafetyGateSummaryVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    serverOnlyHelperStatement:
      SyntheticResultCaptureServerOnlyHelperStatement;
    noFrontendRequestStatement:
      SyntheticResultCaptureNoFrontendRequestStatement;
    noApiRouteStatement: SyntheticResultCaptureNoApiRouteStatement;
    deterministicSyntheticCaptureStatement:
      SyntheticResultCaptureDeterministicStatement;
    currentReadiness: SyntheticResultCaptureCurrentReadiness;
    summaryLines: readonly string[];
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureBlockedLivePersistenceSummaryRecord =
  Readonly<
    {
      key: SyntheticResultCaptureBlockedLivePersistenceSummaryKey;
      version: SyntheticResultCaptureBlockedLivePersistenceSummaryVersion;
      resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
      blockedLiveActions: readonly string[];
      noRealApprovalRequestStatement:
        SyntheticResultCaptureNoRealApprovalRequestStatement;
      noRealApprovalRecordingStatement:
        SyntheticResultCaptureNoRealApprovalRecordingStatement;
      retryPosture: SyntheticResultCaptureRetryPosture;
      fallbackPosture: SyntheticResultCaptureFallbackPosture;
    } & SyntheticResultCaptureCommonRecordFields
  >;

export type SyntheticResultCaptureRequestRecord = Readonly<
  {
    key: SyntheticResultCaptureRequestKey;
    version: SyntheticResultCaptureRequestVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    requestState: SyntheticResultCaptureRequestState;
    frontendRequestState: SyntheticResultCaptureFrontendRequestState;
    apiRouteState: SyntheticResultCaptureApiRouteState;
    resultPayloadPosture: "deterministic synthetic result fixture only";
    providerPayloadPosture: "none";
    modelOutputPosture: "none";
    persistenceTargetPosture: "none";
    explicitNoFrontendRequestNoApiRouteNoPersistenceStatement:
      "No frontend request. No API route. No persistence.";
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureResponseRecord = Readonly<
  {
    key: SyntheticResultCaptureResponseKey;
    version: SyntheticResultCaptureResponseVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    responseState: SyntheticResultCaptureResponseState;
    captureState: SyntheticResultCaptureState;
    resultState: SyntheticResultCaptureResultState;
    providerResponseState: SyntheticResultCaptureProviderResponseState;
    modelOutputState: SyntheticResultCaptureModelOutputState;
    resultPersistenceState: SyntheticResultCapturePersistenceState;
    auditPersistenceState: SyntheticResultCapturePersistenceState;
    approvalPersistenceState: SyntheticResultCapturePersistenceState;
    databaseWriteState: SyntheticResultCapturePersistenceState;
    fileWriteState: SyntheticResultCapturePersistenceState;
    explicitSyntheticCaptureOnlyNoProviderOutputNoPersistenceStatement:
      "Synthetic capture only. No provider output. No persistence.";
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureErrorRecord = Readonly<
  {
    key: SyntheticResultCaptureErrorKey;
    version: SyntheticResultCaptureErrorVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    errorState: SyntheticResultCaptureErrorState;
    failedGateExamples: readonly string[];
    missingSyntheticExecutionResultExample: string;
    missingManualApprovalFixtureExample: string;
    providerResponseDetectedExample: string;
    modelOutputDetectedExample: string;
    promptSentDetectedExample: string;
    persistenceAttemptedExample: string;
    databaseWriteAttemptedExample: string;
    fileWriteAttemptedExample: string;
    queueWorkerJobAttemptedExample: string;
    retryPosture: SyntheticResultCaptureRetryPosture;
    fallbackPosture: SyntheticResultCaptureFallbackPosture;
    explicitNoLiveErrorNoRetryNoFallbackStatement:
      "No live error. No retry. No fallback.";
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureGateRecord = Readonly<
  {
    key: `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-gate:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}:${SyntheticResultCaptureGateId}`;
    version: SyntheticResultCaptureGateVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    gateId: SyntheticResultCaptureGateId;
    label: string;
    owner: string;
    requiredState: string;
    currentState: string;
    evidence: string;
    blockedLiveAction: string;
    nextReviewRecoveryRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  } & SyntheticResultCaptureCommonRecordFields
>;

export type SyntheticResultCaptureReadinessMatrixRecord = Readonly<
  {
    key: `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-readiness:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}:${SyntheticResultCaptureReadinessMatrixId}`;
    version: SyntheticResultCaptureReadinessMatrixVersion;
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    readinessId: SyntheticResultCaptureReadinessMatrixId;
    label: string;
    state: string;
    evidence: string;
    currentReadiness: SyntheticResultCaptureCurrentReadiness;
    nextSafeAction: string;
  } & SyntheticResultCaptureCommonRecordFields
>;

export type MinimalManualGatedSyntheticDryRunResultCaptureMvpCapabilityFamilyGroup =
  Readonly<{
    capabilityFamilyId:
      MinimalManualGatedSyntheticDryRunExecutionMvpRecord["selectedCapabilityFamily"]["id"];
    capabilityFamilyLabel:
      MinimalManualGatedSyntheticDryRunExecutionMvpRecord["selectedCapabilityFamily"]["label"];
    captureCount: number;
  }>;

export type MinimalManualGatedSyntheticDryRunResultCaptureMvpWorkspaceGroup =
  Readonly<{
    workspaceTarget: MinimalManualGatedSyntheticDryRunExecutionMvpRecord["workspaceTarget"];
    captureCount: number;
  }>;

export type SyntheticResultCaptureSummary = Readonly<{
  version: SyntheticResultCaptureSummaryVersion;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  captureCount: number;
  currentReadiness: SyntheticResultCaptureCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type SyntheticResultCaptureGateSummary = Readonly<{
  version: SyntheticResultCaptureGateSummaryVersion;
  gateCount: number;
  blockedGateCount: number;
  summaryLines: readonly string[];
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type SyntheticResultCaptureReadinessSummary = Readonly<{
  version: SyntheticResultCaptureReadinessSummaryVersion;
  readinessCount: number;
  currentReadiness: SyntheticResultCaptureCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type MinimalManualGatedSyntheticDryRunResultCaptureMvpRunInput =
  Readonly<{
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    backendOwnedMode: SyntheticResultCaptureBackendOwnedPosture;
    serverOnlyMode: SyntheticResultCaptureServerOnlyPosture;
    syntheticCaptureMode: SyntheticResultCaptureSyntheticOnlyPosture;
    manualGatedMode: SyntheticResultCaptureManualGatedPosture;
    syntheticExecutionResult: SyntheticExecutionResultFixtureInput;
    approvalFixtureState: SyntheticResultCaptureApprovalFixtureState;
    manualConfirmationFixtureState:
      SyntheticResultCaptureManualConfirmationFixtureState;
    approvalRecordingState: SyntheticResultCaptureApprovalRecordingState;
    approvalTokenState: SyntheticResultCaptureApprovalTokenState;
    approvalLeaseState: SyntheticResultCaptureApprovalLeaseState;
    providerResponseState: SyntheticResultCaptureProviderResponseState;
    modelOutputState: SyntheticResultCaptureModelOutputState;
    promptState: SyntheticResultCapturePromptState;
    frontendRequestState: SyntheticResultCaptureFrontendRequestState;
    apiRouteState: SyntheticResultCaptureApiRouteState;
    persistenceTargetState: SyntheticResultCapturePersistenceTargetState;
    databaseWriteTargetState:
      SyntheticResultCaptureDatabaseWriteTargetState;
    fileWriteTargetState: SyntheticResultCaptureFileWriteTargetState;
    queueDispatchState: SyntheticResultCaptureDispatchState;
    workerDispatchState: SyntheticResultCaptureDispatchState;
    jobExecutionState: SyntheticResultCaptureDispatchState;
    providerSdkImportState: SyntheticResultCaptureProviderSdkImportState;
    providerExecutionState: SyntheticResultCaptureDispatchState;
  }>;

export type MinimalManualGatedSyntheticDryRunResultCaptureMvpServerRunRecord =
  Readonly<{
    resultCaptureMvpId: MinimalManualGatedSyntheticDryRunResultCaptureMvpId;
    requestLabel: MinimalManualGatedSyntheticDryRunExecutionMvpRecord["requestLabel"];
    sourceSyntheticExecutionResultReference: SyntheticMvpExecutionResultKey;
    syntheticResultId: SyntheticResultId;
    captureState: SyntheticResultCaptureState;
    resultState: SyntheticResultCaptureResultState;
    syntheticCaptureId: SyntheticResultCaptureId;
    syntheticDigest: SyntheticResultCaptureDigest;
    resultReference: SyntheticResultCaptureResultReference;
    auditReference: SyntheticResultCaptureAuditReference;
    approvalReference: SyntheticResultCaptureApprovalReference;
    evidenceReference: SyntheticResultCaptureEvidenceReference;
    resultPayload: SyntheticResultCapturePayload;
    captureTimestampPosture: SyntheticResultCaptureTimestampPosture;
    persistenceState: SyntheticResultCapturePersistenceState;
    currentReadiness: SyntheticResultCaptureCurrentReadiness;
    serverOnlyHelperStatement:
      SyntheticResultCaptureServerOnlyHelperStatement;
    deterministicSyntheticCaptureStatement:
      SyntheticResultCaptureDeterministicStatement;
    inMemoryOnlyCaptureStatement:
      SyntheticResultCaptureInMemoryOnlyStatement;
    noFrontendRequestStatement:
      SyntheticResultCaptureNoFrontendRequestStatement;
    noApiRouteStatement: SyntheticResultCaptureNoApiRouteStatement;
    nextResultCaptureReviewRecoveryChecklist: readonly string[];
  }>;
