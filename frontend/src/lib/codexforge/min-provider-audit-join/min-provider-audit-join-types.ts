import type {
  BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord,
  ProviderDryRunResultCaptureOutputReviewRecord,
  ProviderDryRunResultCaptureReviewId,
} from "../min-provider-capture-review/min-provider-capture-review-types";
import type {
  MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord,
  ProviderDryRunCapturedFixtureResultOutputRecord,
  ProviderDryRunResultCaptureApprovalPreviewRecord as SourceProviderDryRunResultCaptureApprovalPreviewRecord,
  ProviderDryRunResultCaptureAuditPreviewRecord as SourceProviderDryRunResultCaptureAuditPreviewRecord,
  ProviderDryRunResultCaptureBlockedPersistenceSummaryRecord,
  ProviderDryRunResultCaptureCheckRecord,
  ProviderDryRunResultCaptureEnvelopeRecord,
  ProviderDryRunResultCaptureEvidencePreviewRecord as SourceProviderDryRunResultCaptureEvidencePreviewRecord,
  ProviderDryRunResultCaptureInputRecord,
  ProviderDryRunResultCaptureReadinessMatrixRecord,
  ProviderDryRunResultCaptureSafetyGateSummaryRecord,
} from "../min-provider-capture/min-provider-capture-types";
import type { ProviderDryRunAdmissionReviewRecord } from "../min-provider-admit-review/min-provider-admit-review-types";
import type { ProviderSelectionCredentialReferenceReviewRecord } from "../min-provider-review/min-provider-review-types";
import type { SyntheticMvpManualApprovalFixtureRecord } from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import type { BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord } from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH =
  "6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_PHASE =
  6121;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH =
  "6122-6153 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join Review and Recovery Preview";

export const MINIMAL_PROVIDER_DRY_RUN_AUDIT_APPROVAL_JOIN_SECTION_TITLES = [
  "Backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP",
  "Provider adapter dry-run audit and approval join input",
  "Provider adapter dry-run audit join output",
  "Provider adapter dry-run approval join output",
  "Provider adapter dry-run audit and approval join envelope",
  "Provider adapter dry-run audit and approval join gates",
  "Provider adapter dry-run audit and approval join readiness matrix",
  "Provider adapter dry-run audit and approval join evidence preview",
] as const;

export type ProviderDryRunAuditApprovalJoinSectionTitle =
  (typeof MINIMAL_PROVIDER_DRY_RUN_AUDIT_APPROVAL_JOIN_SECTION_TITLES)[number];

export type MinimalProviderAdapterDryRunAuditApprovalJoinMvpId =
  ProviderDryRunResultCaptureReviewId;
export type MinimalProviderAdapterDryRunAuditApprovalJoinCapabilityFamilyLabel =
  BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord["selectedCapabilityFamily"];
export type MinimalProviderAdapterDryRunAuditApprovalJoinWorkspaceTarget =
  BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord["workspaceTarget"];
export type MinimalProviderAdapterDryRunAuditApprovalJoinProviderSlotLabel =
  BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord["providerSlotLabel"];
export type MinimalProviderAdapterDryRunAuditApprovalJoinBackupProviderSlotLabel =
  BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord["backupProviderSlotLabel"];
export type MinimalProviderAdapterDryRunAuditApprovalJoinLocalPrivateAlternativeLabel =
  BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord["localPrivateAlternativeLabel"];
export type MinimalProviderAdapterDryRunAuditApprovalJoinOpaqueCredentialReferenceLabel =
  BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord["opaqueCredentialReferenceLabel"];

export type MinimalProviderAdapterDryRunAuditApprovalJoinMvpVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-mvp-v1";
export type ProviderAdapterDryRunAuditApprovalJoinInputVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-input-v1";
export type ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-admission-check-v1";
export type ProviderAdapterDryRunAuditJoinOutputVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-join-output-v1";
export type ProviderAdapterDryRunApprovalJoinOutputVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-join-output-v1";
export type ProviderAdapterDryRunAuditApprovalJoinEnvelopeVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-envelope-v1";
export type ProviderAdapterDryRunAuditPreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview-v1";
export type ProviderAdapterDryRunApprovalPreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview-v1";
export type ProviderAdapterDryRunAuditApprovalEvidencePreviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-evidence-preview-v1";
export type ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-safety-gate-summary-v1";
export type ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-blocked-live-persistence-summary-v1";
export type ProviderAdapterDryRunAuditApprovalJoinRequestVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-request-v1";
export type ProviderAdapterDryRunAuditApprovalJoinResponseVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-response-v1";
export type ProviderAdapterDryRunAuditApprovalJoinErrorVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-error-v1";
export type ProviderAdapterDryRunAuditApprovalJoinGateVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-gate-v1";
export type ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-readiness-matrix-v1";
export type ProviderAdapterDryRunAuditApprovalJoinSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-summary-v1";
export type ProviderAdapterDryRunAuditApprovalJoinGateSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-gate-summary-v1";
export type ProviderAdapterDryRunAuditApprovalJoinReadinessSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-readiness-summary-v1";

export type ProviderAdapterDryRunAuditApprovalJoinBackendOwnedMode =
  "backend-owned";
export type ProviderAdapterDryRunAuditApprovalJoinServerOnlyMode =
  "server-only";
export type ProviderAdapterDryRunAuditApprovalJoinMode =
  "audit-approval-join";
export type ProviderAdapterDryRunAuditApprovalJoinManualGatedMode =
  "manual-gated";
export type ProviderAdapterDryRunAuditApprovalJoinFixtureOnlyMode =
  "fixture-only";
export type ProviderAdapterDryRunAuditApprovalJoinCredentialReferenceOnlyMode =
  "credential-reference-only";
export type ProviderAdapterDryRunAuditApprovalJoinInMemoryOnlyMode =
  "in-memory-only";
export type ProviderAdapterDryRunAuditApprovalJoinState =
  "joined-provider-dry-run-fixture-in-memory-only";
export type ProviderAdapterDryRunAuditJoinState =
  "deterministic provider dry-run audit join in memory only";
export type ProviderAdapterDryRunApprovalJoinState =
  "deterministic provider dry-run approval join in memory only";
export type ProviderAdapterDryRunAuditApprovalJoinCurrentReadiness =
  "minimal-provider-dry-run-audit-approval-join-mvp-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent";
export type ProviderAdapterDryRunAuditApprovalJoinCredentialReferenceState =
  "opaque credential reference label only";
export type ProviderAdapterDryRunAuditApprovalJoinCredentialValueState =
  "credential value not present and not read";
export type ProviderAdapterDryRunAuditApprovalJoinEnvVarState =
  "environment variables not read";
export type ProviderAdapterDryRunAuditApprovalJoinProviderKeyState =
  "provider key not read";
export type ProviderAdapterDryRunAuditApprovalJoinProviderSdkImportState =
  "provider SDK not imported";
export type ProviderAdapterDryRunAuditApprovalJoinLiveProviderExecutionState =
  "live provider execution blocked";
export type ProviderAdapterDryRunAuditApprovalJoinProviderResponseState =
  "provider response not received from provider";
export type ProviderAdapterDryRunAuditApprovalJoinModelOutputState =
  "model output not generated by provider/model";
export type ProviderAdapterDryRunAuditApprovalJoinPromptTransmissionState =
  "prompt transmission state is not sent";
export type ProviderAdapterDryRunAuditApprovalJoinFrontendRequestState =
  "frontend request not created";
export type ProviderAdapterDryRunAuditApprovalJoinApiRouteState =
  "API route not created";
export type ProviderAdapterDryRunAuditApprovalJoinDispatchState =
  "queue dispatch blocked";
export type ProviderAdapterDryRunAuditApprovalJoinWorkerDispatchState =
  "worker dispatch blocked";
export type ProviderAdapterDryRunAuditApprovalJoinJobExecutionState =
  "job execution blocked";
export type ProviderAdapterDryRunAuditApprovalJoinPersistenceState =
  "persistence not implemented";
export type ProviderAdapterDryRunAuditApprovalJoinResultPersistenceState =
  "result persistence not implemented";
export type ProviderAdapterDryRunAuditApprovalJoinAuditPersistenceState =
  "audit persistence not implemented";
export type ProviderAdapterDryRunAuditApprovalJoinApprovalPersistenceState =
  "approval persistence not implemented";
export type ProviderAdapterDryRunAuditApprovalJoinDatabaseWriteState =
  "database write target none";
export type ProviderAdapterDryRunAuditApprovalJoinFileWriteState =
  "file write target none";
export type ProviderAdapterDryRunAuditApprovalJoinRetryPosture =
  "retry disabled";
export type ProviderAdapterDryRunAuditApprovalJoinFallbackPosture =
  "fallback disabled";
export type ProviderAdapterDryRunAuditApprovalJoinApprovalFixtureState =
  "approval fixture preview-only";
export type ProviderAdapterDryRunAuditApprovalJoinManualConfirmationFixtureState =
  "manual confirmation fixture preview-only";
export type ProviderAdapterDryRunAuditApprovalJoinRealApprovalRequestState =
  "real approval request absent";
export type ProviderAdapterDryRunAuditApprovalJoinApprovalRecordingState =
  "approval recording not recorded";
export type ProviderAdapterDryRunAuditApprovalJoinApprovalTokenState =
  "approval token not issued";
export type ProviderAdapterDryRunAuditApprovalJoinApprovalLeaseState =
  "approval lease not created";
export type ProviderAdapterDryRunAuditApprovalJoinPreviewReferenceState =
  "preview-only / not persisted";
export type ProviderAdapterDryRunAuditApprovalJoinTimestampPosture =
  "static fixture label only, with no real timestamp";
export type ProviderAdapterDryRunAuditApprovalJoinKillSwitchState =
  "kill switch fixture retained";
export type ProviderAdapterDryRunAuditApprovalJoinDeterministicStatement =
  "deterministic provider adapter dry-run audit and approval join only";
export type ProviderAdapterDryRunAuditApprovalJoinInMemoryOnlyStatement =
  "provider adapter dry-run audit and approval join is produced in memory only";
export type ProviderAdapterDryRunAuditApprovalJoinServerOnlyHelperStatement =
  "server-only provider adapter dry-run audit and approval join helper exists";
export type ProviderAdapterDryRunAuditApprovalJoinBackendOnlyStatement =
  "provider adapter dry-run audit and approval join MVP is backend-only";
export type ProviderAdapterDryRunAuditApprovalJoinNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement =
  "No frontend request. No API route. No provider call. No persistence.";
export type ProviderAdapterDryRunAuditApprovalJoinResponseStatement =
  "Provider adapter dry-run audit and approval join only. No provider output. No persistence.";
export type ProviderAdapterDryRunAuditApprovalJoinErrorStatement =
  "No live error. No retry. No fallback.";

export type ProviderAdapterAuditJoinId =
  `provider-dry-run-audit-join-preview:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterApprovalJoinId =
  `provider-dry-run-approval-join-preview:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterAuditApprovalJoinDigest =
  `provider-dry-run-audit-approval-join-digest-preview:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}:in-memory-only`;
export type ProviderAdapterAuditApprovalJoinResultReference =
  `provider-dry-run-audit-approval-join-result-reference-preview:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterAuditApprovalJoinAuditReference =
  `provider-dry-run-audit-approval-join-audit-reference-preview:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterAuditApprovalJoinApprovalReference =
  `provider-dry-run-audit-approval-join-approval-reference-preview:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterAuditApprovalJoinEvidenceReference =
  `provider-dry-run-audit-approval-join-evidence-reference-preview:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;

export type MinimalProviderAdapterDryRunAuditApprovalJoinMvpKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-mvp:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunAuditApprovalJoinInputKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-input:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-admission-check:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunAuditJoinOutputKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-join-output:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunApprovalJoinOutputKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-join-output:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunAuditApprovalJoinEnvelopeKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-envelope:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunAuditPreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunApprovalPreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunAuditApprovalEvidencePreviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-evidence-preview:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-safety-gate-summary:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-blocked-live-persistence-summary:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunAuditApprovalJoinRequestKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-request:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunAuditApprovalJoinResponseKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-response:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;
export type ProviderAdapterDryRunAuditApprovalJoinErrorKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-error:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}`;

export type ProviderAdapterDryRunAuditApprovalJoinGateId =
  | "backend-only-boundary"
  | "server-only-helper-boundary"
  | "provider-dry-run-fixture-join-mode"
  | "result-capture-review-dependency"
  | "captured-fixture-result-present"
  | "result-capture-output-review-dependency"
  | "opaque-credential-reference"
  | "credential-value-absent"
  | "environment-variables-not-read"
  | "provider-key-not-read"
  | "selected-provider-slot-preview-only"
  | "backup-provider-slot-preview-only"
  | "local-private-alternative-preview-only"
  | "provider-sdk-not-imported"
  | "provider-response-not-received"
  | "model-output-not-generated"
  | "prompt-not-sent"
  | "manual-approval-fixture"
  | "manual-confirmation-fixture"
  | "deterministic-provider-adapter-id"
  | "deterministic-result-capture-id"
  | "deterministic-audit-join-id"
  | "deterministic-approval-join-id"
  | "deterministic-join-digest"
  | "in-memory-only-result-reference"
  | "in-memory-only-audit-reference"
  | "in-memory-only-approval-reference"
  | "no-real-approval-request"
  | "no-real-approval-recording"
  | "no-approval-token-issuance"
  | "no-approval-lease-issuance"
  | "no-frontend-request"
  | "no-api-route"
  | "no-fetch-network"
  | "no-provider-execution"
  | "no-model-call"
  | "no-prompt-sending"
  | "no-queue-dispatch"
  | "no-worker-dispatch"
  | "no-job-execution"
  | "no-retry-execution"
  | "no-fallback-execution"
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

export type ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixId =
  | "server-only-helper-state"
  | "source-review-state"
  | "result-capture-mvp-state"
  | "result-capture-input-state"
  | "result-capture-check-state"
  | "captured-result-state"
  | "result-capture-envelope-state"
  | "result-capture-output-review-state"
  | "audit-preview-state"
  | "approval-preview-state"
  | "evidence-preview-state"
  | "admission-review-state"
  | "approval-fixture-state"
  | "manual-confirmation-fixture-state"
  | "credential-boundary-state"
  | "provider-boundary-state"
  | "prompt-boundary-state"
  | "model-boundary-state"
  | "frontend-boundary-state"
  | "api-route-boundary-state"
  | "queue-boundary-state"
  | "worker-boundary-state"
  | "job-boundary-state"
  | "result-persistence-boundary-state"
  | "audit-persistence-boundary-state"
  | "approval-persistence-boundary-state"
  | "database-boundary-state"
  | "file-boundary-state"
  | "single-run-lock-state"
  | "idempotency-replay-state"
  | "timeout-cancel-state"
  | "privacy-redaction-state"
  | "kill-switch-state";

export type ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields = Readonly<{
  stableId: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId;
  reviewLabel: BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord["reviewLabel"];
  requestLabel: ProviderDryRunAdmissionReviewRecord["requestLabel"];
  requestIdentityId: ProviderDryRunAdmissionReviewRecord["reviewId"];
  resultCaptureStableId: MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord["stableId"];
  capabilityFamily: MinimalProviderAdapterDryRunAuditApprovalJoinCapabilityFamilyLabel;
  workspaceTarget: MinimalProviderAdapterDryRunAuditApprovalJoinWorkspaceTarget;
  providerSlotLabel: MinimalProviderAdapterDryRunAuditApprovalJoinProviderSlotLabel;
  backupProviderSlotLabel: MinimalProviderAdapterDryRunAuditApprovalJoinBackupProviderSlotLabel;
  localPrivateAlternativeLabel: MinimalProviderAdapterDryRunAuditApprovalJoinLocalPrivateAlternativeLabel;
  opaqueCredentialReferenceLabel: MinimalProviderAdapterDryRunAuditApprovalJoinOpaqueCredentialReferenceLabel;
  sourceProviderDryRunResultCaptureReviewReference:
    BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord["key"];
  sourceProviderDryRunResultCaptureMvpReference:
    MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord["key"];
  sourceProviderDryRunResultCaptureInputReference:
    ProviderDryRunResultCaptureInputRecord["key"];
  sourceProviderDryRunResultCaptureCheckReference:
    ProviderDryRunResultCaptureCheckRecord["key"];
  sourceProviderDryRunCapturedFixtureResultOutputReference:
    ProviderDryRunCapturedFixtureResultOutputRecord["key"];
  sourceProviderDryRunResultCaptureEnvelopeReference:
    ProviderDryRunResultCaptureEnvelopeRecord["key"];
  sourceProviderDryRunResultCaptureOutputReviewReference:
    ProviderDryRunResultCaptureOutputReviewRecord["key"];
  sourceProviderDryRunResultCaptureAuditPreviewReference:
    SourceProviderDryRunResultCaptureAuditPreviewRecord["key"];
  sourceProviderDryRunResultCaptureApprovalPreviewReference:
    SourceProviderDryRunResultCaptureApprovalPreviewRecord["key"];
  sourceProviderDryRunResultCaptureEvidencePreviewReference:
    SourceProviderDryRunResultCaptureEvidencePreviewRecord["key"];
  sourceProviderDryRunResultCaptureSafetyGateSummaryReference:
    ProviderDryRunResultCaptureSafetyGateSummaryRecord["key"];
  sourceProviderDryRunResultCaptureBlockedPersistenceSummaryReference:
    ProviderDryRunResultCaptureBlockedPersistenceSummaryRecord["key"];
  sourceProviderDryRunResultCaptureReadinessMatrixReference:
    ProviderDryRunResultCaptureReadinessMatrixRecord["key"];
  sourceProviderDryRunAdmissionReviewReference:
    ProviderDryRunAdmissionReviewRecord["key"];
  sourceProviderSelectionCredentialReferenceReviewReference:
    ProviderSelectionCredentialReferenceReviewRecord["key"];
  sourceManualApprovalDecisionReviewReference:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["key"];
  sourceManualApprovalFixtureReference:
    SyntheticMvpManualApprovalFixtureRecord["key"];
  sourceManualConfirmationFixtureReference:
    SyntheticMvpManualApprovalFixtureRecord["key"];
  backendOwnedMode: ProviderAdapterDryRunAuditApprovalJoinBackendOwnedMode;
  serverOnlyMode: ProviderAdapterDryRunAuditApprovalJoinServerOnlyMode;
  auditApprovalJoinMode: ProviderAdapterDryRunAuditApprovalJoinMode;
  manualGatedMode: ProviderAdapterDryRunAuditApprovalJoinManualGatedMode;
  fixtureOnlyMode: ProviderAdapterDryRunAuditApprovalJoinFixtureOnlyMode;
  credentialReferenceOnlyMode:
    ProviderAdapterDryRunAuditApprovalJoinCredentialReferenceOnlyMode;
  inMemoryOnlyMode: ProviderAdapterDryRunAuditApprovalJoinInMemoryOnlyMode;
  currentReadiness: ProviderAdapterDryRunAuditApprovalJoinCurrentReadiness;
  nextReviewRecoveryRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
}>;

export type MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord = Readonly<
  {
    key: MinimalProviderAdapterDryRunAuditApprovalJoinMvpKey;
    version: MinimalProviderAdapterDryRunAuditApprovalJoinMvpVersion;
    label: "Backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP";
    joinState: ProviderAdapterDryRunAuditApprovalJoinState;
    auditJoinState: ProviderAdapterDryRunAuditJoinState;
    approvalJoinState: ProviderAdapterDryRunApprovalJoinState;
    auditJoinId: ProviderAdapterAuditJoinId;
    approvalJoinId: ProviderAdapterApprovalJoinId;
    joinDigest: ProviderAdapterAuditApprovalJoinDigest;
    resultReference: ProviderAdapterAuditApprovalJoinResultReference;
    auditReference: ProviderAdapterAuditApprovalJoinAuditReference;
    approvalReference: ProviderAdapterAuditApprovalJoinApprovalReference;
    evidenceReference: ProviderAdapterAuditApprovalJoinEvidenceReference;
    credentialReferenceState:
      ProviderAdapterDryRunAuditApprovalJoinCredentialReferenceState;
    credentialValueState:
      ProviderAdapterDryRunAuditApprovalJoinCredentialValueState;
    envVarState: ProviderAdapterDryRunAuditApprovalJoinEnvVarState;
    providerKeyState: ProviderAdapterDryRunAuditApprovalJoinProviderKeyState;
    providerSdkImportState:
      ProviderAdapterDryRunAuditApprovalJoinProviderSdkImportState;
    providerResponseState:
      ProviderAdapterDryRunAuditApprovalJoinProviderResponseState;
    modelOutputState: ProviderAdapterDryRunAuditApprovalJoinModelOutputState;
    promptTransmissionState:
      ProviderAdapterDryRunAuditApprovalJoinPromptTransmissionState;
    frontendRequestState:
      ProviderAdapterDryRunAuditApprovalJoinFrontendRequestState;
    apiRouteState: ProviderAdapterDryRunAuditApprovalJoinApiRouteState;
    resultPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinResultPersistenceState;
    auditPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinAuditPersistenceState;
    approvalPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinApprovalPersistenceState;
    timestampPosture: ProviderAdapterDryRunAuditApprovalJoinTimestampPosture;
    killSwitchState: ProviderAdapterDryRunAuditApprovalJoinKillSwitchState;
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunAuditApprovalJoinInputRecord = Readonly<
  {
    key: ProviderAdapterDryRunAuditApprovalJoinInputKey;
    version: ProviderAdapterDryRunAuditApprovalJoinInputVersion;
    sourceProviderDryRunResultCaptureInputReference:
      ProviderDryRunResultCaptureInputRecord["key"];
    requestState: "deterministic provider dry-run audit approval join request only";
    resultPayloadPosture: "captured fixture result only";
    auditPayloadPosture: "preview-only";
    approvalPayloadPosture: "preview-only";
    providerPayloadPosture: "none";
    modelOutputPosture: "none";
    persistenceTargetPosture: "none";
    promptTransmissionState:
      ProviderAdapterDryRunAuditApprovalJoinPromptTransmissionState;
    frontendRequestState:
      ProviderAdapterDryRunAuditApprovalJoinFrontendRequestState;
    apiRouteState: ProviderAdapterDryRunAuditApprovalJoinApiRouteState;
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement:
      ProviderAdapterDryRunAuditApprovalJoinNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement;
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckRecord =
  Readonly<
    {
      key: ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckKey;
      version: ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckVersion;
      admissionState:
        "accepted / backend-only / credential-reference-only / fixture-only / in-memory-only / persistence-blocked";
      backendOnlyCheck: "passed";
      serverOnlyCheck: "passed";
      sourceReviewCheck: "passed";
      captureDependencyCheck: "passed";
      credentialBoundaryCheck: "passed";
      providerBoundaryCheck: "passed";
      approvalBoundaryCheck: "passed";
      persistenceBoundaryCheck: "blocked";
      nextSafeAction: string;
    } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
  >;

export type ProviderAdapterDryRunAuditJoinOutputRecord = Readonly<
  {
    key: ProviderAdapterDryRunAuditJoinOutputKey;
    version: ProviderAdapterDryRunAuditJoinOutputVersion;
    joinState: ProviderAdapterDryRunAuditApprovalJoinState;
    auditJoinState: ProviderAdapterDryRunAuditJoinState;
    resultCaptureStableId:
      MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord["stableId"];
    auditJoinId: ProviderAdapterAuditJoinId;
    joinDigest: ProviderAdapterAuditApprovalJoinDigest;
    sourceProviderDryRunAuditPreviewReference:
      SourceProviderDryRunResultCaptureAuditPreviewRecord["key"];
    resultReference: ProviderAdapterAuditApprovalJoinResultReference;
    auditReference: ProviderAdapterAuditApprovalJoinAuditReference;
    evidenceReference: ProviderAdapterAuditApprovalJoinEvidenceReference;
    providerResponseState:
      ProviderAdapterDryRunAuditApprovalJoinProviderResponseState;
    modelOutputState: ProviderAdapterDryRunAuditApprovalJoinModelOutputState;
    resultPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinResultPersistenceState;
    auditPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinAuditPersistenceState;
    databaseWriteState:
      ProviderAdapterDryRunAuditApprovalJoinDatabaseWriteState;
    fileWriteState: ProviderAdapterDryRunAuditApprovalJoinFileWriteState;
    timestampPosture: ProviderAdapterDryRunAuditApprovalJoinTimestampPosture;
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunApprovalJoinOutputRecord = Readonly<
  {
    key: ProviderAdapterDryRunApprovalJoinOutputKey;
    version: ProviderAdapterDryRunApprovalJoinOutputVersion;
    joinState: ProviderAdapterDryRunAuditApprovalJoinState;
    approvalJoinState: ProviderAdapterDryRunApprovalJoinState;
    resultCaptureStableId:
      MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord["stableId"];
    approvalJoinId: ProviderAdapterApprovalJoinId;
    joinDigest: ProviderAdapterAuditApprovalJoinDigest;
    sourceProviderDryRunApprovalPreviewReference:
      SourceProviderDryRunResultCaptureApprovalPreviewRecord["key"];
    resultReference: ProviderAdapterAuditApprovalJoinResultReference;
    approvalReference: ProviderAdapterAuditApprovalJoinApprovalReference;
    evidenceReference: ProviderAdapterAuditApprovalJoinEvidenceReference;
    providerResponseState:
      ProviderAdapterDryRunAuditApprovalJoinProviderResponseState;
    modelOutputState: ProviderAdapterDryRunAuditApprovalJoinModelOutputState;
    approvalFixtureState:
      ProviderAdapterDryRunAuditApprovalJoinApprovalFixtureState;
    manualConfirmationFixtureState:
      ProviderAdapterDryRunAuditApprovalJoinManualConfirmationFixtureState;
    realApprovalRequestState:
      ProviderAdapterDryRunAuditApprovalJoinRealApprovalRequestState;
    approvalRecordingState:
      ProviderAdapterDryRunAuditApprovalJoinApprovalRecordingState;
    approvalTokenState: ProviderAdapterDryRunAuditApprovalJoinApprovalTokenState;
    approvalLeaseState: ProviderAdapterDryRunAuditApprovalJoinApprovalLeaseState;
    resultPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinResultPersistenceState;
    approvalPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinApprovalPersistenceState;
    databaseWriteState:
      ProviderAdapterDryRunAuditApprovalJoinDatabaseWriteState;
    fileWriteState: ProviderAdapterDryRunAuditApprovalJoinFileWriteState;
    timestampPosture: ProviderAdapterDryRunAuditApprovalJoinTimestampPosture;
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunAuditApprovalJoinEnvelopeRecord = Readonly<
  {
    key: ProviderAdapterDryRunAuditApprovalJoinEnvelopeKey;
    version: ProviderAdapterDryRunAuditApprovalJoinEnvelopeVersion;
    requestReference: ProviderAdapterDryRunAuditApprovalJoinRequestKey;
    responseReference: ProviderAdapterDryRunAuditApprovalJoinResponseKey;
    errorReference: ProviderAdapterDryRunAuditApprovalJoinErrorKey;
    inputReference: ProviderAdapterDryRunAuditApprovalJoinInputKey;
    resultCaptureEnvelopeReference: ProviderDryRunResultCaptureEnvelopeRecord["key"];
    auditJoinOutputReference: ProviderAdapterDryRunAuditJoinOutputKey;
    approvalJoinOutputReference: ProviderAdapterDryRunApprovalJoinOutputKey;
    auditPreviewReference: ProviderAdapterDryRunAuditPreviewKey;
    approvalPreviewReference: ProviderAdapterDryRunApprovalPreviewKey;
    evidencePreviewReference:
      ProviderAdapterDryRunAuditApprovalEvidencePreviewKey;
    joinState: ProviderAdapterDryRunAuditApprovalJoinState;
    auditJoinState: ProviderAdapterDryRunAuditJoinState;
    approvalJoinState: ProviderAdapterDryRunApprovalJoinState;
    providerResponseState:
      ProviderAdapterDryRunAuditApprovalJoinProviderResponseState;
    modelOutputState: ProviderAdapterDryRunAuditApprovalJoinModelOutputState;
    resultPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinResultPersistenceState;
    auditPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinAuditPersistenceState;
    approvalPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinApprovalPersistenceState;
    databaseWriteState:
      ProviderAdapterDryRunAuditApprovalJoinDatabaseWriteState;
    fileWriteState: ProviderAdapterDryRunAuditApprovalJoinFileWriteState;
    explicitJoinOnlyNoProviderOutputNoPersistenceStatement:
      ProviderAdapterDryRunAuditApprovalJoinResponseStatement;
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunAuditPreviewRecord = Readonly<
  {
    key: ProviderAdapterDryRunAuditPreviewKey;
    version: ProviderAdapterDryRunAuditPreviewVersion;
    sourceProviderDryRunResultCaptureAuditPreviewReference:
      SourceProviderDryRunResultCaptureAuditPreviewRecord["key"];
    auditReference: ProviderAdapterAuditApprovalJoinAuditReference;
    auditState: ProviderAdapterDryRunAuditApprovalJoinPreviewReferenceState;
    auditSummaryLines: readonly string[];
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunApprovalPreviewRecord = Readonly<
  {
    key: ProviderAdapterDryRunApprovalPreviewKey;
    version: ProviderAdapterDryRunApprovalPreviewVersion;
    sourceProviderDryRunResultCaptureApprovalPreviewReference:
      SourceProviderDryRunResultCaptureApprovalPreviewRecord["key"];
    approvalReference: ProviderAdapterAuditApprovalJoinApprovalReference;
    approvalState: ProviderAdapterDryRunAuditApprovalJoinPreviewReferenceState;
    approvalFixtureState:
      ProviderAdapterDryRunAuditApprovalJoinApprovalFixtureState;
    manualConfirmationFixtureState:
      ProviderAdapterDryRunAuditApprovalJoinManualConfirmationFixtureState;
    realApprovalRequestState:
      ProviderAdapterDryRunAuditApprovalJoinRealApprovalRequestState;
    approvalRecordingState:
      ProviderAdapterDryRunAuditApprovalJoinApprovalRecordingState;
    approvalTokenState: ProviderAdapterDryRunAuditApprovalJoinApprovalTokenState;
    approvalLeaseState: ProviderAdapterDryRunAuditApprovalJoinApprovalLeaseState;
    approvalSummaryLines: readonly string[];
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunAuditApprovalEvidencePreviewRecord = Readonly<
  {
    key: ProviderAdapterDryRunAuditApprovalEvidencePreviewKey;
    version: ProviderAdapterDryRunAuditApprovalEvidencePreviewVersion;
    sourceProviderDryRunResultCaptureEvidencePreviewReference:
      SourceProviderDryRunResultCaptureEvidencePreviewRecord["key"];
    evidenceReference: ProviderAdapterAuditApprovalJoinEvidenceReference;
    evidenceState: ProviderAdapterDryRunAuditApprovalJoinPreviewReferenceState;
    evidenceSummaryLines: readonly string[];
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryRecord =
  Readonly<
    {
      key: ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryKey;
      version: ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryVersion;
      serverOnlyHelperStatement:
        ProviderAdapterDryRunAuditApprovalJoinServerOnlyHelperStatement;
      backendOnlyStatement:
        ProviderAdapterDryRunAuditApprovalJoinBackendOnlyStatement;
      deterministicJoinStatement:
        ProviderAdapterDryRunAuditApprovalJoinDeterministicStatement;
      inMemoryOnlyJoinStatement:
        ProviderAdapterDryRunAuditApprovalJoinInMemoryOnlyStatement;
      currentReadiness:
        ProviderAdapterDryRunAuditApprovalJoinCurrentReadiness;
      summaryLines: readonly string[];
    } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
  >;

export type ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryRecord =
  Readonly<
    {
      key: ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryKey;
      version: ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryVersion;
      blockedLiveActions: readonly string[];
      retryPosture: ProviderAdapterDryRunAuditApprovalJoinRetryPosture;
      fallbackPosture: ProviderAdapterDryRunAuditApprovalJoinFallbackPosture;
      summaryLines: readonly string[];
    } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
  >;

export type ProviderAdapterDryRunAuditApprovalJoinRequestRecord = Readonly<
  {
    key: ProviderAdapterDryRunAuditApprovalJoinRequestKey;
    version: ProviderAdapterDryRunAuditApprovalJoinRequestVersion;
    requestState: "deterministic provider dry-run audit approval join request only";
    providerAdapterDryRunAuditApprovalJoinMvpId:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpId;
    frontendRequestState:
      ProviderAdapterDryRunAuditApprovalJoinFrontendRequestState;
    apiRouteState: ProviderAdapterDryRunAuditApprovalJoinApiRouteState;
    resultPayloadPosture: "captured fixture result only";
    auditPayloadPosture: "preview-only";
    approvalPayloadPosture: "preview-only";
    providerPayloadPosture: "none";
    modelOutputPosture: "none";
    persistenceTargetPosture: "none";
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement:
      ProviderAdapterDryRunAuditApprovalJoinNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement;
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunAuditApprovalJoinResponseRecord = Readonly<
  {
    key: ProviderAdapterDryRunAuditApprovalJoinResponseKey;
    version: ProviderAdapterDryRunAuditApprovalJoinResponseVersion;
    responseState: "returned by server-only provider audit approval join helper only";
    providerAdapterDryRunAuditApprovalJoinMvpId:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpId;
    joinState: ProviderAdapterDryRunAuditApprovalJoinState;
    auditJoinState: ProviderAdapterDryRunAuditJoinState;
    approvalJoinState: ProviderAdapterDryRunApprovalJoinState;
    providerResponseState:
      ProviderAdapterDryRunAuditApprovalJoinProviderResponseState;
    modelOutputState: ProviderAdapterDryRunAuditApprovalJoinModelOutputState;
    resultPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinResultPersistenceState;
    auditPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinAuditPersistenceState;
    approvalPersistenceState:
      ProviderAdapterDryRunAuditApprovalJoinApprovalPersistenceState;
    databaseWriteState:
      ProviderAdapterDryRunAuditApprovalJoinDatabaseWriteState;
    fileWriteState: ProviderAdapterDryRunAuditApprovalJoinFileWriteState;
    explicitJoinOnlyNoProviderOutputNoPersistenceStatement:
      ProviderAdapterDryRunAuditApprovalJoinResponseStatement;
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunAuditApprovalJoinErrorRecord = Readonly<
  {
    key: ProviderAdapterDryRunAuditApprovalJoinErrorKey;
    version: ProviderAdapterDryRunAuditApprovalJoinErrorVersion;
    errorState: "deterministic preview-error record only";
    providerAdapterDryRunAuditApprovalJoinMvpId:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpId;
    failedGateExamples: readonly ProviderAdapterDryRunAuditApprovalJoinGateId[];
    missingSourceReviewExample:
      "Provider dry-run result capture review source is required.";
    missingCapturedResultExample:
      "Provider dry-run captured fixture result source is required.";
    missingOutputReviewExample:
      "Provider dry-run result capture output review source is required.";
    missingAuditPreviewExample:
      "Provider dry-run audit preview source is required.";
    missingApprovalPreviewExample:
      "Provider dry-run approval preview source is required.";
    promptTransmissionAttemptedExample:
      "Prompt transmission must remain blocked.";
    providerSdkImportAttemptedExample:
      "Provider SDK import must remain blocked.";
    providerExecutionAttemptedExample:
      "Provider execution must remain blocked.";
    modelCallAttemptedExample: "Model calls must remain blocked.";
    approvalAttemptedExample:
      "Real approval request, recording, token, and lease must remain absent.";
    persistenceAttemptedExample:
      "Result, audit, approval, database, and file persistence must remain blocked.";
    explicitNoLiveErrorNoRetryNoFallbackStatement:
      ProviderAdapterDryRunAuditApprovalJoinErrorStatement;
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunAuditApprovalJoinGateRecord = Readonly<
  {
    id: ProviderAdapterDryRunAuditApprovalJoinGateId;
    key: `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-gate:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}:${ProviderAdapterDryRunAuditApprovalJoinGateId}`;
    version: ProviderAdapterDryRunAuditApprovalJoinGateVersion;
    label: string;
    owner: string;
    requiredState: string;
    currentState: string;
    evidence: string;
    blockedLiveAction: string;
  } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
>;

export type ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord =
  Readonly<
    {
      id: ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixId;
      key: `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-readiness:${MinimalProviderAdapterDryRunAuditApprovalJoinMvpId}:${ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixId}`;
      version: ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixVersion;
      label: string;
      state: string;
      evidence: string;
      currentReadiness:
        ProviderAdapterDryRunAuditApprovalJoinCurrentReadiness;
      nextSafeAction: string;
    } & ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields
  >;

export type ProviderAdapterDryRunAuditApprovalJoinSummary = Readonly<{
  version: ProviderAdapterDryRunAuditApprovalJoinSummaryVersion;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH;
  currentReadiness: ProviderAdapterDryRunAuditApprovalJoinCurrentReadiness;
  recordCount: number;
  auditOutputCount: number;
  approvalOutputCount: number;
  envelopeCount: number;
  evidencePreviewCount: number;
  gateCount: number;
  readinessCount: number;
  summaryLines: readonly string[];
}>;

export type ProviderAdapterDryRunAuditApprovalJoinGateSummary = Readonly<{
  version: ProviderAdapterDryRunAuditApprovalJoinGateSummaryVersion;
  recordCount: number;
  uniqueGateCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderAdapterDryRunAuditApprovalJoinReadinessSummary = Readonly<{
  version: ProviderAdapterDryRunAuditApprovalJoinReadinessSummaryVersion;
  recordCount: number;
  uniqueReadinessCount: number;
  currentReadiness: ProviderAdapterDryRunAuditApprovalJoinCurrentReadiness;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type NextProviderAdapterDryRunAuditApprovalJoinReviewRecoveryChecklist =
  readonly string[];

export type MinimalProviderAdapterDryRunAuditApprovalJoinMvpRunInput =
  Readonly<{
    providerAdapterDryRunAuditApprovalJoinMvpId:
      MinimalProviderAdapterDryRunAuditApprovalJoinMvpId;
    backendOwnedMode: ProviderAdapterDryRunAuditApprovalJoinBackendOwnedMode;
    serverOnlyMode: ProviderAdapterDryRunAuditApprovalJoinServerOnlyMode;
    auditApprovalJoinMode: ProviderAdapterDryRunAuditApprovalJoinMode;
    manualGatedMode:
      ProviderAdapterDryRunAuditApprovalJoinManualGatedMode;
    fixtureOnlyMode: ProviderAdapterDryRunAuditApprovalJoinFixtureOnlyMode;
    credentialReferenceOnlyMode:
      ProviderAdapterDryRunAuditApprovalJoinCredentialReferenceOnlyMode;
    inMemoryOnlyMode: ProviderAdapterDryRunAuditApprovalJoinInMemoryOnlyMode;
    sourceProviderDryRunResultCaptureReview:
      BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord;
    sourceProviderDryRunResultCaptureMvp:
      MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord;
    sourceProviderDryRunResultCaptureInput:
      ProviderDryRunResultCaptureInputRecord;
    sourceProviderDryRunResultCaptureCheck:
      ProviderDryRunResultCaptureCheckRecord;
    sourceProviderDryRunCapturedFixtureResultOutput:
      ProviderDryRunCapturedFixtureResultOutputRecord;
    sourceProviderDryRunResultCaptureEnvelope:
      ProviderDryRunResultCaptureEnvelopeRecord;
    sourceProviderDryRunResultCaptureOutputReview:
      ProviderDryRunResultCaptureOutputReviewRecord;
    sourceProviderDryRunResultCaptureAuditPreview:
      SourceProviderDryRunResultCaptureAuditPreviewRecord;
    sourceProviderDryRunResultCaptureApprovalPreview:
      SourceProviderDryRunResultCaptureApprovalPreviewRecord;
    sourceProviderDryRunResultCaptureEvidencePreview:
      SourceProviderDryRunResultCaptureEvidencePreviewRecord;
    sourceProviderDryRunResultCaptureSafetyGateSummary:
      ProviderDryRunResultCaptureSafetyGateSummaryRecord;
    sourceProviderDryRunResultCaptureBlockedPersistenceSummary:
      ProviderDryRunResultCaptureBlockedPersistenceSummaryRecord;
    sourceProviderDryRunResultCaptureReadinessMatrix:
      ProviderDryRunResultCaptureReadinessMatrixRecord;
    sourceProviderDryRunAdmissionReview: ProviderDryRunAdmissionReviewRecord;
    sourceProviderSelectionCredentialReferenceReview:
      ProviderSelectionCredentialReferenceReviewRecord;
    sourceManualApprovalDecisionReview:
      BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord;
    manualApprovalFixture: SyntheticMvpManualApprovalFixtureRecord;
    manualConfirmationFixture: SyntheticMvpManualApprovalFixtureRecord;
  }>;

export type MinimalProviderAdapterDryRunAuditApprovalJoinMvpServerRunRecord =
  Readonly<{
    mvpRecord: MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord;
    inputRecord: ProviderAdapterDryRunAuditApprovalJoinInputRecord;
    admissionCheckRecord:
      ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckRecord;
    auditJoinOutputRecord: ProviderAdapterDryRunAuditJoinOutputRecord;
    approvalJoinOutputRecord: ProviderAdapterDryRunApprovalJoinOutputRecord;
    envelopeRecord: ProviderAdapterDryRunAuditApprovalJoinEnvelopeRecord;
    auditPreviewRecord: ProviderAdapterDryRunAuditPreviewRecord;
    approvalPreviewRecord: ProviderAdapterDryRunApprovalPreviewRecord;
    evidencePreviewRecord:
      ProviderAdapterDryRunAuditApprovalEvidencePreviewRecord;
    safetyGateSummaryRecord:
      ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryRecord;
    blockedLivePersistenceSummaryRecord:
      ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryRecord;
    requestRecord: ProviderAdapterDryRunAuditApprovalJoinRequestRecord;
    responseRecord: ProviderAdapterDryRunAuditApprovalJoinResponseRecord;
    errorRecord: ProviderAdapterDryRunAuditApprovalJoinErrorRecord;
    gateRecords: readonly ProviderAdapterDryRunAuditApprovalJoinGateRecord[];
    readinessRecords:
      readonly ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord[];
    summary: ProviderAdapterDryRunAuditApprovalJoinSummary;
    gateSummary: ProviderAdapterDryRunAuditApprovalJoinGateSummary;
    readinessSummary: ProviderAdapterDryRunAuditApprovalJoinReadinessSummary;
    nextReviewRecoveryChecklist:
      NextProviderAdapterDryRunAuditApprovalJoinReviewRecoveryChecklist;
    serializedDeterministicResult: string;
  }>;
