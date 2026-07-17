import type {
  BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord,
} from "../backend-owned-model-provider-synthetic-dry-run-runner-skeleton";
import type {
  BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord,
} from "../backend-owned-synthetic-dry-run-audit-approval-join-review-recovery-preview";
import type {
  BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord,
} from "../backend-owned-synthetic-dry-run-end-to-end-packet-review-recovery-preview";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-contract";
import type {
  BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-handoff-review-recovery-preview";
import type {
  BackendOwnedSyntheticDryRunResultCaptureReviewRecord,
} from "../backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH =
  "5386-5417 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_PHASE =
  5417;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5354-5385 - Backend-Owned Synthetic Dry-Run Manual Approval Decision Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH =
  "5418-5449 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution Review and Recovery Preview";

export const SYNTHETIC_MVP_SECTION_TITLES = [
  "Backend-owned minimal manual-gated synthetic dry-run execution MVP",
  "Synthetic execution input",
  "Synthetic execution result",
  "Synthetic MVP result envelope",
  "Synthetic MVP gates",
  "Synthetic MVP readiness matrix",
  "Synthetic MVP audit and approval preview",
  "Synthetic MVP audit preview",
  "Synthetic MVP approval preview",
] as const;

export type MinimalManualGatedSyntheticDryRunExecutionMvpId =
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["id"];

export type MinimalManualGatedSyntheticDryRunExecutionMvpVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-v1";
export type SyntheticMvpExecutionInputVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-input-v1";
export type SyntheticMvpExecutionAdmissionCheckVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-admission-check-v1";
export type SyntheticMvpManualApprovalFixtureVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-manual-approval-fixture-v1";
export type SyntheticMvpExecutionResultVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result-v1";
export type SyntheticMvpResultEnvelopeVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result-envelope-v1";
export type SyntheticMvpAuditPreviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-audit-preview-v1";
export type SyntheticMvpApprovalPreviewVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-approval-preview-v1";
export type SyntheticMvpSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-safety-gate-summary-v1";
export type SyntheticMvpBlockedLiveExecutionSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-blocked-live-execution-summary-v1";
export type SyntheticMvpRequestVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-request-v1";
export type SyntheticMvpResponseVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-response-v1";
export type SyntheticMvpErrorVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-error-v1";
export type SyntheticMvpExecutionGateVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-gate-v1";
export type SyntheticMvpReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-readiness-matrix-v1";
export type SyntheticMvpExecutionSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-summary-v1";
export type SyntheticMvpGateSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-gate-summary-v1";
export type SyntheticMvpReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-readiness-summary-v1";

export type SyntheticMvpCommonExecutionPosture = "backend-owned";
export type SyntheticMvpCommonSyntheticPosture = "synthetic-only";
export type SyntheticMvpCommonManualGatedPosture = "manual-gated";
export type SyntheticMvpCommonInMemoryOnlyPosture = "in-memory-only";
export type SyntheticMvpNoProviderExecution = "no provider execution";
export type SyntheticMvpNoModelCalls = "no model calls";
export type SyntheticMvpNoPromptSending = "no prompt sending";
export type SyntheticMvpNoQueueWorkerJobDispatch =
  "no queue/worker/job dispatch";
export type SyntheticMvpNoPersistence = "no persistence";
export type SyntheticMvpNoDatabaseWrites = "no database writes";
export type SyntheticMvpNoFileWrites = "no file writes";
export type SyntheticMvpNoApprovalRecording = "no approval recording";
export type SyntheticMvpNoApprovalTokenIssuance =
  "no approval token issuance";
export type SyntheticMvpNoApprovalLeaseIssuance =
  "no approval lease issuance";
export type SyntheticMvpCurrentReadiness =
  "minimal-synthetic-execution-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent";
export type SyntheticMvpDeterministicResultStatement =
  "deterministic synthetic result only";
export type SyntheticMvpInMemoryOnlyResultStatement =
  "synthetic execution result is produced in memory only";
export type SyntheticMvpServerOnlyHelperStatement =
  "server-only synthetic execution helper exists";
export type SyntheticMvpNoFrontendRequestStatement =
  "no frontend request is created";
export type SyntheticMvpNoApiRouteStatement = "no API route is created";
export type SyntheticMvpNoRealApprovalRequestStatement =
  "no real approval request";
export type SyntheticMvpNoRealApprovalRecordingStatement =
  "no real approval recording";
export type SyntheticMvpApprovalFixtureState = "preview-only";
export type SyntheticMvpManualConfirmationFixtureState = "preview-only";
export type SyntheticMvpSelectedDecisionFixture =
  "static synthetic approve-preview fixture";
export type SyntheticMvpKillSwitchState = "inactive";
export type SyntheticMvpBlockedRequestState = "blocked";
export type SyntheticMvpValidatedState = "validated";
export type SyntheticMvpAdmissionAcceptedState = "yes, as fixture-only";
export type SyntheticMvpExecutionState = "completed-synthetic-mvp-only";
export type SyntheticMvpPersistenceState = "not implemented";
export type SyntheticMvpProviderResponseState = "not received";
export type SyntheticMvpModelOutputState = "not generated";
export type SyntheticMvpResponseState =
  "returned by server-only smoke/helper only";
export type SyntheticMvpRequestState =
  "deterministic synthetic request only";
export type SyntheticMvpResultState =
  "deterministic synthetic result produced in memory only";
export type SyntheticMvpErrorState = "deterministic preview only";
export type SyntheticMvpRetryPosture = "disabled";
export type SyntheticMvpFallbackPosture = "disabled";
export type SyntheticMvpResultId =
  `synthetic-mvp-result-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpDigest =
  `synthetic-mvp-digest-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}:approve-preview`;
export type SyntheticMvpAuditReference =
  `synthetic-mvp-audit-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpApprovalReference =
  `synthetic-mvp-approval-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpResultReference =
  `synthetic-mvp-result-envelope-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;

export type MinimalManualGatedSyntheticDryRunExecutionMvpKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpExecutionInputKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-input:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpExecutionAdmissionCheckKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-admission-check:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpManualApprovalFixtureKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-manual-approval-fixture:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpExecutionResultKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpResultEnvelopeKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result-envelope:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpAuditPreviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-audit-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpApprovalPreviewKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-approval-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-safety-gate-summary:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpBlockedLiveExecutionSummaryKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-blocked-live-execution-summary:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpRequestKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-request:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpResponseKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-response:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;
export type SyntheticMvpErrorKey =
  `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-error:${MinimalManualGatedSyntheticDryRunExecutionMvpId}`;

export type SyntheticMvpExecutionGateId =
  | "backend-only-boundary"
  | "server-only-module-boundary"
  | "synthetic-only-mode"
  | "manual-approval-fixture"
  | "manual-confirmation-fixture"
  | "approval-decision-fixture"
  | "kill-switch-inactive"
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
  | "deterministic-result"
  | "in-memory-only-result"
  | "single-run-lock-preview"
  | "idempotency-replay-preview"
  | "timeout-cancel-preview"
  | "privacy-redaction-preview";

export type SyntheticMvpReadinessMatrixId =
  | "server-only-module-state"
  | "synthetic-execution-input-state"
  | "manual-approval-fixture-state"
  | "manual-confirmation-fixture-state"
  | "approval-decision-fixture-state"
  | "kill-switch-state"
  | "execution-function-state"
  | "deterministic-result-state"
  | "result-envelope-state"
  | "audit-preview-state"
  | "approval-preview-state"
  | "provider-boundary-state"
  | "prompt-boundary-state"
  | "model-boundary-state"
  | "queue-boundary-state"
  | "worker-boundary-state"
  | "job-boundary-state"
  | "persistence-boundary-state"
  | "database-boundary-state"
  | "file-boundary-state";

export type SyntheticMvpCommonRecordFields = Readonly<{
  stableId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
  requestLabel: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["requestLabel"];
  label: string;
  selectedCapabilityFamily:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"];
  workspaceTarget:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["workspaceTarget"];
  providerSlotLabel:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["providerSlotLabel"];
  localPrivateAlternativeLabel:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["localPrivateAlternativeLabel"];
  sourceManualApprovalDecisionReviewReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
  sourceManualApprovalDecisionContractReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["sourceManualApprovalDecisionContractReference"];
  sourceManualApprovalHandoffReviewReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["sourceManualApprovalHandoffReviewReference"];
  sourceEndToEndPacketReviewReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["sourceEndToEndPacketReviewReference"];
  sourceSyntheticRunnerSkeletonReference:
    BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord["key"];
  sourceResultCaptureReviewReference:
    BackendOwnedSyntheticDryRunResultCaptureReviewRecord["key"];
  sourceAuditApprovalJoinReviewReference:
    BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord["key"];
  backendOwnedPosture: SyntheticMvpCommonExecutionPosture;
  syntheticOnlyPosture: SyntheticMvpCommonSyntheticPosture;
  manualGatedPosture: SyntheticMvpCommonManualGatedPosture;
  inMemoryOnlyPosture: SyntheticMvpCommonInMemoryOnlyPosture;
  noProviderExecution: SyntheticMvpNoProviderExecution;
  noModelCalls: SyntheticMvpNoModelCalls;
  noPromptSending: SyntheticMvpNoPromptSending;
  noQueueWorkerJobDispatch: SyntheticMvpNoQueueWorkerJobDispatch;
  noPersistence: SyntheticMvpNoPersistence;
  noDatabaseWrites: SyntheticMvpNoDatabaseWrites;
  noFileWrites: SyntheticMvpNoFileWrites;
  noApprovalRecording: SyntheticMvpNoApprovalRecording;
  noApprovalTokenIssuance: SyntheticMvpNoApprovalTokenIssuance;
  noApprovalLeaseIssuance: SyntheticMvpNoApprovalLeaseIssuance;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type MinimalManualGatedSyntheticDryRunExecutionMvpRecord = Readonly<
  {
    id: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    key: MinimalManualGatedSyntheticDryRunExecutionMvpKey;
    version: MinimalManualGatedSyntheticDryRunExecutionMvpVersion;
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpExecutionInputRecord = Readonly<
  {
    key: SyntheticMvpExecutionInputKey;
    version: SyntheticMvpExecutionInputVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    requestState: SyntheticMvpRequestState;
    executionMode: SyntheticMvpCommonSyntheticPosture;
    executionOwnership: SyntheticMvpCommonExecutionPosture;
    operatorApprovalFixtureState: "static preview only";
    manualConfirmationFixtureState: SyntheticMvpManualConfirmationFixtureState;
    promptPayloadPosture: "redacted placeholder only";
    providerPayloadPosture: "none";
    persistenceTargetPosture: "none";
    explicitNoFrontendRequestNoApiRouteStatement:
      "No frontend request. No API route.";
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpExecutionAdmissionCheckRecord = Readonly<
  {
    key: SyntheticMvpExecutionAdmissionCheckKey;
    version: SyntheticMvpExecutionAdmissionCheckVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    admissionAccepted: SyntheticMvpAdmissionAcceptedState;
    syntheticOnlyModeState: SyntheticMvpValidatedState;
    backendOwnedModeState: SyntheticMvpValidatedState;
    manualApprovalDecisionFixtureState: SyntheticMvpValidatedState;
    previewOnlyDecisionState: SyntheticMvpValidatedState;
    selectedDecisionFixtureState: SyntheticMvpValidatedState;
    manualConfirmationFixtureState: SyntheticMvpValidatedState;
    killSwitchFixtureState: SyntheticMvpValidatedState;
    providerExecutionBlockedState: SyntheticMvpValidatedState;
    promptSendingBlockedState: SyntheticMvpValidatedState;
    modelCallsBlockedState: SyntheticMvpValidatedState;
    queueWorkerJobBlockedState: SyntheticMvpValidatedState;
    persistenceBlockedState: SyntheticMvpValidatedState;
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpManualApprovalFixtureRecord = Readonly<
  {
    key: SyntheticMvpManualApprovalFixtureKey;
    version: SyntheticMvpManualApprovalFixtureVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    approvalFixtureState: SyntheticMvpApprovalFixtureState;
    decisionFixtureState: SyntheticMvpApprovalFixtureState;
    selectedDecisionFixture: SyntheticMvpSelectedDecisionFixture;
    manualConfirmationFixtureState: SyntheticMvpManualConfirmationFixtureState;
    approvalRequestState: "not created";
    approvalRecordingState: "not recorded";
    approvalTokenIssuanceState: "not issued";
    approvalLeaseIssuanceState: "not created";
    explicitPreviewOnlyStatement:
      "approval fixture is preview-only";
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpExecutionResultRecord = Readonly<
  {
    key: SyntheticMvpExecutionResultKey;
    version: SyntheticMvpExecutionResultVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    acceptedSyntheticAdmission: SyntheticMvpAdmissionAcceptedState;
    resultId: SyntheticMvpResultId;
    syntheticDigest: SyntheticMvpDigest;
    auditReference: SyntheticMvpAuditReference;
    approvalReference: SyntheticMvpApprovalReference;
    resultReference: SyntheticMvpResultReference;
    executionState: SyntheticMvpExecutionState;
    persistenceState: SyntheticMvpPersistenceState;
    providerResponseState: SyntheticMvpProviderResponseState;
    modelOutputState: SyntheticMvpModelOutputState;
    deterministicSyntheticResultStatement:
      SyntheticMvpDeterministicResultStatement;
    inMemoryOnlyResultStatement:
      SyntheticMvpInMemoryOnlyResultStatement;
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpResultEnvelopeRecord = Readonly<
  {
    key: SyntheticMvpResultEnvelopeKey;
    version: SyntheticMvpResultEnvelopeVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    requestReference: SyntheticMvpRequestKey;
    responseReference: SyntheticMvpResponseKey;
    errorReference: SyntheticMvpErrorKey;
    resultReference: SyntheticMvpExecutionResultKey;
    responseState: SyntheticMvpResponseState;
    resultState: SyntheticMvpResultState;
    providerResponseState: SyntheticMvpProviderResponseState;
    modelOutputState: SyntheticMvpModelOutputState;
    resultPersistenceState: SyntheticMvpPersistenceState;
    auditPersistenceState: SyntheticMvpPersistenceState;
    approvalPersistenceState: SyntheticMvpPersistenceState;
    databaseWriteState: SyntheticMvpPersistenceState;
    fileWriteState: SyntheticMvpPersistenceState;
    explicitSyntheticResultOnlyNoProviderOutputStatement:
      "Synthetic result only. No provider output.";
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpAuditPreviewRecord = Readonly<
  {
    key: SyntheticMvpAuditPreviewKey;
    version: SyntheticMvpAuditPreviewVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    auditReference: SyntheticMvpAuditReference;
    auditState: "preview-only / not persisted";
    evidenceSummary: string;
    explicitNoAuditPersistenceStatement: "no audit persistence";
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpApprovalPreviewRecord = Readonly<
  {
    key: SyntheticMvpApprovalPreviewKey;
    version: SyntheticMvpApprovalPreviewVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    approvalReference: SyntheticMvpApprovalReference;
    approvalState: "preview-only / not persisted";
    approvalFixtureState: SyntheticMvpApprovalFixtureState;
    manualConfirmationFixtureState: SyntheticMvpManualConfirmationFixtureState;
    explicitNoApprovalPersistenceStatement: "no approval persistence";
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpSafetyGateSummaryRecord = Readonly<
  {
    key: SyntheticMvpSafetyGateSummaryKey;
    version: SyntheticMvpSafetyGateSummaryVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    serverOnlyHelperStatement: SyntheticMvpServerOnlyHelperStatement;
    noFrontendRequestStatement: SyntheticMvpNoFrontendRequestStatement;
    noApiRouteStatement: SyntheticMvpNoApiRouteStatement;
    deterministicSyntheticResultStatement:
      SyntheticMvpDeterministicResultStatement;
    currentReadiness: SyntheticMvpCurrentReadiness;
    summaryLines: readonly string[];
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpBlockedLiveExecutionSummaryRecord = Readonly<
  {
    key: SyntheticMvpBlockedLiveExecutionSummaryKey;
    version: SyntheticMvpBlockedLiveExecutionSummaryVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    blockedLiveActions: readonly string[];
    noRealApprovalRequestStatement:
      SyntheticMvpNoRealApprovalRequestStatement;
    noRealApprovalRecordingStatement:
      SyntheticMvpNoRealApprovalRecordingStatement;
    retryPosture: SyntheticMvpRetryPosture;
    fallbackPosture: SyntheticMvpFallbackPosture;
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpRequestRecord = Readonly<
  {
    key: SyntheticMvpRequestKey;
    version: SyntheticMvpRequestVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    requestState: SyntheticMvpRequestState;
    frontendRequestState: "not created";
    apiRouteState: "not created";
    operatorApprovalFixtureState: "static preview only";
    manualConfirmationFixtureState: "static preview only";
    promptPayloadPosture: "redacted placeholder only";
    providerPayloadPosture: "none";
    persistenceTargetPosture: "none";
    explicitNoFrontendRequestNoApiRouteStatement:
      "No frontend request. No API route.";
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpResponseRecord = Readonly<
  {
    key: SyntheticMvpResponseKey;
    version: SyntheticMvpResponseVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    responseState: SyntheticMvpResponseState;
    resultState: SyntheticMvpResultState;
    providerResponseState: SyntheticMvpProviderResponseState;
    modelOutputState: SyntheticMvpModelOutputState;
    resultPersistenceState: SyntheticMvpPersistenceState;
    auditPersistenceState: SyntheticMvpPersistenceState;
    approvalPersistenceState: SyntheticMvpPersistenceState;
    databaseWriteState: SyntheticMvpPersistenceState;
    fileWriteState: SyntheticMvpPersistenceState;
    explicitSyntheticResultOnlyNoProviderOutputStatement:
      "Synthetic result only. No provider output.";
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpErrorRecord = Readonly<
  {
    key: SyntheticMvpErrorKey;
    version: SyntheticMvpErrorVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    errorState: SyntheticMvpErrorState;
    failedGateExamples: readonly string[];
    killSwitchActiveExample: string;
    missingApprovalFixtureExample: string;
    staleDecisionFixtureExample: string;
    providerExecutionAttemptedExample: string;
    promptSendingAttemptedExample: string;
    modelCallAttemptedExample: string;
    persistenceAttemptedExample: string;
    queueWorkerJobAttemptedExample: string;
    retryPosture: SyntheticMvpRetryPosture;
    fallbackPosture: SyntheticMvpFallbackPosture;
    explicitNoLiveErrorNoRetryNoFallbackStatement:
      "No live error. No retry. No fallback.";
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpExecutionGateRecord = Readonly<
  {
    key: `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-gate:${MinimalManualGatedSyntheticDryRunExecutionMvpId}:${SyntheticMvpExecutionGateId}`;
    version: SyntheticMvpExecutionGateVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    gateId: SyntheticMvpExecutionGateId;
    label: string;
    owner: string;
    requiredState: string;
    currentState: string;
    evidence: string;
    blockedLiveAction: string;
    nextReviewRecoveryRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
  } & SyntheticMvpCommonRecordFields
>;

export type SyntheticMvpReadinessMatrixRecord = Readonly<
  {
    key: `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-readiness:${MinimalManualGatedSyntheticDryRunExecutionMvpId}:${SyntheticMvpReadinessMatrixId}`;
    version: SyntheticMvpReadinessMatrixVersion;
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    readinessId: SyntheticMvpReadinessMatrixId;
    label: string;
    state: string;
    evidence: string;
    currentReadiness: SyntheticMvpCurrentReadiness;
    nextSafeAction: string;
  } & SyntheticMvpCommonRecordFields
>;

export type MinimalManualGatedSyntheticDryRunExecutionMvpCapabilityFamilyGroup =
  Readonly<{
    capabilityFamilyId:
      MinimalManualGatedSyntheticDryRunExecutionMvpRecord["selectedCapabilityFamily"]["id"];
    capabilityFamilyLabel:
      MinimalManualGatedSyntheticDryRunExecutionMvpRecord["selectedCapabilityFamily"]["label"];
    executionCount: number;
  }>;

export type MinimalManualGatedSyntheticDryRunExecutionMvpWorkspaceGroup =
  Readonly<{
    workspaceTarget:
      MinimalManualGatedSyntheticDryRunExecutionMvpRecord["workspaceTarget"];
    executionCount: number;
  }>;

export type SyntheticMvpExecutionSummary = Readonly<{
  version: SyntheticMvpExecutionSummaryVersion;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
  executionCount: number;
  currentReadiness: SyntheticMvpCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type SyntheticMvpGateSummary = Readonly<{
  version: SyntheticMvpGateSummaryVersion;
  gateCount: number;
  blockedGateCount: number;
  summaryLines: readonly string[];
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type SyntheticMvpReadinessSummary = Readonly<{
  version: SyntheticMvpReadinessSummaryVersion;
  readinessCount: number;
  currentReadiness: SyntheticMvpCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type MinimalManualGatedSyntheticDryRunExecutionMvpRunInput = Readonly<{
  executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
  executionMode: SyntheticMvpCommonSyntheticPosture;
  executionOwnership: SyntheticMvpCommonExecutionPosture;
  manualApprovalDecisionFixtureState: SyntheticMvpApprovalFixtureState;
  previewOnlyDecisionState: SyntheticMvpApprovalFixtureState;
  selectedDecisionFixture: SyntheticMvpSelectedDecisionFixture;
  manualConfirmationFixtureState: SyntheticMvpManualConfirmationFixtureState;
  killSwitchFixtureState: SyntheticMvpKillSwitchState;
  providerExecutionRequestState: SyntheticMvpBlockedRequestState;
  promptSendingRequestState: SyntheticMvpBlockedRequestState;
  modelCallRequestState: SyntheticMvpBlockedRequestState;
  queueDispatchRequestState: SyntheticMvpBlockedRequestState;
  workerDispatchRequestState: SyntheticMvpBlockedRequestState;
  jobExecutionRequestState: SyntheticMvpBlockedRequestState;
  persistenceRequestState: SyntheticMvpBlockedRequestState;
}>;

export type MinimalManualGatedSyntheticDryRunExecutionMvpServerRunRecord =
  Readonly<{
    executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId;
    requestLabel: string;
    acceptedSyntheticAdmission: SyntheticMvpAdmissionAcceptedState;
    resultId: SyntheticMvpResultId;
    syntheticDigest: SyntheticMvpDigest;
    auditReference: SyntheticMvpAuditReference;
    approvalReference: SyntheticMvpApprovalReference;
    resultReference: SyntheticMvpResultReference;
    executionState: SyntheticMvpExecutionState;
    persistenceState: SyntheticMvpPersistenceState;
    currentReadiness: SyntheticMvpCurrentReadiness;
    serverOnlyHelperStatement: SyntheticMvpServerOnlyHelperStatement;
    deterministicSyntheticResultStatement:
      SyntheticMvpDeterministicResultStatement;
    inMemoryOnlyResultStatement:
      SyntheticMvpInMemoryOnlyResultStatement;
    noFrontendRequestStatement: SyntheticMvpNoFrontendRequestStatement;
    noApiRouteStatement: SyntheticMvpNoApiRouteStatement;
    nextExecutionReviewRecoveryChecklist: readonly string[];
  }>;
