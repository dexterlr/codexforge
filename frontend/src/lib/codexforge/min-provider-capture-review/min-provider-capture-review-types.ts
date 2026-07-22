import type {
  ProviderDryRunAdmissionReviewRecord,
} from "../min-provider-admit-review/min-provider-admit-review-types";
import type {
  MinimalManualGatedProviderAdapterDryRunExecutionMvpRecord,
  ProviderDryRunBlockedLiveExecutionSummaryRecord,
  ProviderDryRunExecutionOutputRecord,
  ProviderDryRunFixtureResponseRecord,
} from "../min-provider-exec/min-provider-exec-types";
import type {
  BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord,
  ProviderDryRunExecutionAcceptancePostureRecord,
  ProviderDryRunExecutionReviewAuditSummaryRecord,
} from "../min-provider-exec-review/min-provider-exec-review-types";
import type {
  MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord,
  ProviderDryRunCapturedFixtureResultOutputRecord,
  ProviderDryRunResultCaptureApprovalPreviewRecord,
  ProviderDryRunResultCaptureAuditPreviewRecord,
  ProviderDryRunResultCaptureBlockedPersistenceSummaryRecord,
  ProviderDryRunResultCaptureCapabilityFamilyLabel,
  ProviderDryRunResultCaptureCheckRecord,
  ProviderDryRunResultCaptureEnvelopeRecord,
  ProviderDryRunResultCaptureEvidencePreviewRecord,
  ProviderDryRunResultCaptureInputRecord,
  ProviderDryRunResultCaptureProviderSlotLabel,
  ProviderDryRunResultCaptureReadinessMatrixRecord,
  ProviderDryRunResultCaptureSafetyGateSummaryRecord,
  ProviderDryRunResultCaptureWorkspaceTarget,
} from "../min-provider-capture/min-provider-capture-types";
import type { ProviderSelectionCredentialReferenceReviewRecord } from "../min-provider-review/min-provider-review-types";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH =
  "6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview";

export const BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE =
  6089;

export const PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH =
  "6026-6057 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP";

export const NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH =
  "6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP";

export const MINIMAL_PROVIDER_DRY_RUN_RESULT_CAPTURE_REVIEW_SECTION_TITLES = [
  "Backend-owned minimal provider adapter dry-run result capture review",
  "Provider adapter dry-run result capture output review",
  "Provider adapter dry-run result capture gate failure review",
  "Provider adapter dry-run result capture recovery plan",
  "Provider adapter dry-run result capture recovery readiness",
  "Provider adapter dry-run result capture review audit summary",
  "Provider adapter dry-run result capture acceptance posture",
] as const;

export type ProviderDryRunResultCaptureReviewSectionTitle =
  (typeof MINIMAL_PROVIDER_DRY_RUN_RESULT_CAPTURE_REVIEW_SECTION_TITLES)[number];

export const PROVIDER_DRY_RUN_RESULT_CAPTURE_REVIEW_EXAMPLES = [
  {
    reviewId: "openai-compatible-text-provider-dry-run-capture-slot",
    reviewLabel: "OpenAI-compatible text provider dry-run capture slot",
  },
  {
    reviewId: "anthropic-compatible-text-provider-dry-run-capture-slot",
    reviewLabel: "Anthropic-compatible text provider dry-run capture slot",
  },
  {
    reviewId: "gemini-compatible-text-provider-dry-run-capture-slot",
    reviewLabel: "Gemini-compatible text provider dry-run capture slot",
  },
  {
    reviewId: "local-private-text-provider-dry-run-capture-slot",
    reviewLabel: "local/private text provider dry-run capture slot",
  },
  {
    reviewId: "fallback-disabled-dry-run-capture-slot",
    reviewLabel: "fallback disabled dry-run capture slot",
  },
  {
    reviewId: "conversational-planning-request",
    reviewLabel: "conversational planning request",
  },
  {
    reviewId: "code-assistance-request",
    reviewLabel: "code assistance request",
  },
  {
    reviewId: "website-copy-code-request",
    reviewLabel: "website copy/code request",
  },
  {
    reviewId: "audit-recovery-explanation-request",
    reviewLabel: "audit/recovery explanation request",
  },
] as const;

export type ProviderDryRunResultCaptureReviewId =
  (typeof PROVIDER_DRY_RUN_RESULT_CAPTURE_REVIEW_EXAMPLES)[number]["reviewId"];
export type ProviderDryRunResultCaptureReviewLabel =
  (typeof PROVIDER_DRY_RUN_RESULT_CAPTURE_REVIEW_EXAMPLES)[number]["reviewLabel"];

export type ProviderDryRunResultCaptureReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review-preview-v1";
export type ProviderDryRunResultCaptureOutputReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-output-review-preview-v1";
export type ProviderDryRunResultCaptureGateFailureReviewVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate-failure-review-preview-v1";
export type ProviderDryRunResultCaptureRecoveryPlanVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-recovery-plan-preview-v1";
export type ProviderDryRunResultCaptureRecoveryReadinessChecklistVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-recovery-readiness-checklist-v1";
export type ProviderDryRunResultCaptureReviewAuditSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review-audit-summary-preview-v1";
export type ProviderDryRunResultCaptureAcceptancePostureVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-acceptance-posture-preview-v1";
export type ProviderDryRunResultCaptureReviewSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review-summary-v1";
export type ProviderDryRunResultCaptureOutputReviewSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-output-review-summary-v1";
export type ProviderDryRunResultCaptureGateFailureSummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate-failure-summary-v1";
export type ProviderDryRunResultCaptureRecoverySummaryVersion =
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-recovery-summary-v1";

export type ProviderDryRunResultCaptureReviewSource =
  "Athena / Jarvis Model Gateway";
export type ProviderDryRunResultCaptureReviewMode = "preview-only";
export type ProviderDryRunResultCaptureReviewPosture =
  "minimal provider dry-run result capture review / backend-only / dry-run-fixture-capture-only / credential-reference-only / not-live-provider-executing / not persistent";
export type ProviderDryRunResultCaptureReviewCurrentReadiness =
  "minimal-provider-dry-run-result-capture-review-only / backend-only / dry-run-fixture-capture-only / credential-reference-only / not-live-provider-executing / not persistent";
export type ProviderDryRunResultCaptureReviewSeverity =
  | "critical"
  | "high"
  | "medium";
export type ProviderDryRunResultCaptureRecoveryPosture =
  "manual review only";
export type ProviderDryRunResultCaptureRetryPosture = "disabled";
export type ProviderDryRunResultCaptureFallbackPosture = "disabled";
export type ProviderDryRunResultCaptureAuditPosture = "preview-only";
export type ProviderDryRunResultCaptureAcceptanceState =
  "not accepted for live provider execution or persistence / provider dry-run result capture fixture MVP accepted only";
export type ProviderDryRunResultCaptureRecoveryReadinessState =
  | "reviewed"
  | "blocked"
  | "backend future required";
export type ProviderDryRunResultCaptureRecoveryReadinessOwner =
  "operator" | "backend future" | "safety review";
export type ProviderDryRunResultCaptureFixtureOnlyStatement =
  "Dry-run result capture fixture only. No secret read. No provider call. No persistence.";
export type ProviderDryRunResultCaptureNoLiveGatePassStatement =
  "No live gate pass.";
export type ProviderDryRunResultCaptureNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence.";
export type ProviderDryRunResultCaptureAcceptanceStatement =
  "Provider dry-run result capture fixture accepted only. Live provider execution and persistence not accepted.";

export type ProviderDryRunResultCaptureReviewHelperState = "exists";
export type ProviderDryRunResultCaptureReviewState =
  "deterministic fixture-only";
export type ProviderDryRunFixtureResponseCaptureState =
  "captured in memory only";
export type ProviderDryRunResultCapturePreviewState = "preview-only";
export type ProviderDryRunResultCaptureCredentialReferenceState =
  "opaque label only";
export type ProviderDryRunResultCaptureCredentialValueState =
  "not present / not read";
export type ProviderDryRunResultCaptureEnvVarState = "not read";
export type ProviderDryRunResultCaptureProviderKeyState = "not read";
export type ProviderDryRunResultCaptureProviderSdkImportState =
  "not imported";
export type ProviderDryRunResultCaptureLiveProviderExecutionState = "blocked";
export type ProviderDryRunResultCaptureProviderResponseState =
  "not received from provider";
export type ProviderDryRunResultCaptureModelCallState = "not called";
export type ProviderDryRunResultCaptureModelOutputState =
  "not generated by provider/model";
export type ProviderDryRunResultCapturePromptTransmissionState = "not sent";
export type ProviderDryRunResultCaptureFrontendRequestState = "not created";
export type ProviderDryRunResultCaptureApiRouteState = "not created";
export type ProviderDryRunResultCaptureDispatchState = "not dispatched";
export type ProviderDryRunResultCaptureJobExecutionState = "not executed";
export type ProviderDryRunResultCapturePersistenceState =
  "not implemented";
export type ProviderDryRunResultCaptureApprovalFixtureState =
  "preview-only";
export type ProviderDryRunResultCaptureManualConfirmationFixtureState =
  "preview-only";
export type ProviderDryRunResultCaptureApprovalTokenState = "not issued";
export type ProviderDryRunResultCaptureApprovalLeaseState = "not created";
export type ProviderDryRunResultCaptureEvidencePacketState =
  "preview-only / not persisted";
export type ProviderDryRunResultCaptureKillSwitchState =
  "inactive fixture only";
export type ProviderDryRunResultCaptureDeterministicPreviewIdPosture =
  "deterministic preview id only";
export type ProviderDryRunResultCaptureDeterministicOpaqueReferenceIdPosture =
  "deterministic opaque reference id only";
export type ProviderDryRunResultCaptureDeterministicPreviewDigestPosture =
  "deterministic preview digest only";
export type ProviderDryRunResultCaptureCredentialReferencePosture =
  "opaque-reference-only";
export type ProviderDryRunResultCaptureOutputClassification =
  "deterministic dry-run fixture result capture only";
export type ProviderDryRunResultCaptureReferenceState =
  "preview-only / not persisted";
export type ProviderDryRunResultCaptureCredentialReferenceAuditState =
  "opaque label only / not persisted";
export type ProviderDryRunResultCaptureCurrentPosture = "preview-only";
export type ProviderDryRunResultCaptureGateState = "blocked";

export type ProviderDryRunResultCaptureReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review:${ProviderDryRunResultCaptureReviewId}`;
export type ProviderDryRunResultCaptureOutputReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-output-review:${ProviderDryRunResultCaptureReviewId}`;
export type ProviderDryRunResultCaptureGateFailureReviewKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate-failure-review:${ProviderDryRunResultCaptureReviewId}:${ProviderDryRunResultCaptureGateFailureReviewId}`;
export type ProviderDryRunResultCaptureRecoveryPlanKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-recovery-plan:${ProviderDryRunResultCaptureReviewId}`;
export type ProviderDryRunResultCaptureRecoveryReadinessChecklistKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-recovery-readiness:${ProviderDryRunResultCaptureReviewId}:${ProviderDryRunResultCaptureRecoveryReadinessChecklistId}`;
export type ProviderDryRunResultCaptureReviewAuditSummaryKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review-audit-summary:${ProviderDryRunResultCaptureReviewId}`;
export type ProviderDryRunResultCaptureAcceptancePostureKey =
  `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-acceptance-posture:${ProviderDryRunResultCaptureReviewId}`;

export type ProviderDryRunResultCaptureMvpSourceReference =
  MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord["key"];
export type ProviderDryRunResultCaptureInputSourceReference =
  ProviderDryRunResultCaptureInputRecord["key"];
export type ProviderDryRunResultCaptureCheckSourceReference =
  ProviderDryRunResultCaptureCheckRecord["key"];
export type ProviderDryRunCapturedFixtureResultOutputSourceReference =
  ProviderDryRunCapturedFixtureResultOutputRecord["key"];
export type ProviderDryRunResultCaptureEnvelopeSourceReference =
  ProviderDryRunResultCaptureEnvelopeRecord["key"];
export type ProviderDryRunResultCaptureEvidencePreviewSourceReference =
  ProviderDryRunResultCaptureEvidencePreviewRecord["key"];
export type ProviderDryRunResultCaptureAuditPreviewSourceReference =
  ProviderDryRunResultCaptureAuditPreviewRecord["key"];
export type ProviderDryRunResultCaptureApprovalPreviewSourceReference =
  ProviderDryRunResultCaptureApprovalPreviewRecord["key"];
export type ProviderDryRunResultCaptureSafetyGateSummarySourceReference =
  ProviderDryRunResultCaptureSafetyGateSummaryRecord["key"];
export type ProviderDryRunResultCaptureBlockedPersistenceSummarySourceReference =
  ProviderDryRunResultCaptureBlockedPersistenceSummaryRecord["key"];
export type ProviderDryRunResultCaptureReadinessMatrixSourceReference =
  ProviderDryRunResultCaptureReadinessMatrixRecord["key"];
export type ProviderDryRunExecutionReviewSourceReference =
  BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord["key"];
export type ProviderDryRunExecutionAcceptancePostureSourceReference =
  ProviderDryRunExecutionAcceptancePostureRecord["key"];
export type ProviderDryRunExecutionReviewAuditSummarySourceReference =
  ProviderDryRunExecutionReviewAuditSummaryRecord["key"];
export type ProviderDryRunExecutionMvpSourceReference =
  MinimalManualGatedProviderAdapterDryRunExecutionMvpRecord["key"];
export type ProviderDryRunFixtureResponseSourceReference =
  ProviderDryRunFixtureResponseRecord["key"];
export type ProviderDryRunExecutionOutputSourceReference =
  ProviderDryRunExecutionOutputRecord["key"];
export type ProviderDryRunBlockedLiveExecutionSummarySourceReference =
  ProviderDryRunBlockedLiveExecutionSummaryRecord["key"];
export type ProviderDryRunAdmissionReviewSourceReference =
  ProviderDryRunAdmissionReviewRecord["key"];
export type ProviderSelectionCredentialReferenceReviewSourceReference =
  ProviderSelectionCredentialReferenceReviewRecord["key"];

export const PROVIDER_DRY_RUN_RESULT_CAPTURE_GATE_FAILURE_REVIEW_DEFINITIONS = [
  {
    failedGateId: "backend-only-boundary",
    failedGateLabel: "backend-only boundary",
  },
  {
    failedGateId: "server-only-dry-run-result-capture-module-boundary",
    failedGateLabel: "server-only dry-run result capture module boundary",
  },
  {
    failedGateId: "provider-dry-run-result-capture-fixture-mode",
    failedGateLabel: "provider dry-run result capture fixture mode",
  },
  {
    failedGateId: "provider-dry-run-execution-review-dependency",
    failedGateLabel: "provider dry-run execution review dependency",
  },
  {
    failedGateId: "provider-dry-run-execution-output-dependency",
    failedGateLabel: "provider dry-run execution output dependency",
  },
  {
    failedGateId: "provider-dry-run-fixture-response-dependency",
    failedGateLabel: "provider dry-run fixture response dependency",
  },
  {
    failedGateId: "credential-reference-opaque-only-mode",
    failedGateLabel: "credential reference opaque-only mode",
  },
  {
    failedGateId: "deterministic-dry-run-result-capture-id",
    failedGateLabel: "deterministic dry-run result capture id",
  },
  {
    failedGateId: "deterministic-dry-run-execution-id",
    failedGateLabel: "deterministic dry-run execution id",
  },
  {
    failedGateId: "deterministic-dry-run-admission-id",
    failedGateLabel: "deterministic dry-run admission id",
  },
  {
    failedGateId: "deterministic-provider-slot-id",
    failedGateLabel: "deterministic provider slot id",
  },
  {
    failedGateId: "deterministic-credential-reference-id",
    failedGateLabel: "deterministic credential reference id",
  },
  {
    failedGateId: "deterministic-capture-digest",
    failedGateLabel: "deterministic capture digest",
  },
  {
    failedGateId: "supported-capability-family",
    failedGateLabel: "supported capability family",
  },
  {
    failedGateId: "selected-provider-slot-preview-only",
    failedGateLabel: "selected provider slot preview-only",
  },
  {
    failedGateId: "backup-provider-slot-preview-only",
    failedGateLabel: "backup provider slot preview-only",
  },
  {
    failedGateId: "local-private-alternative-preview-only",
    failedGateLabel: "local/private alternative preview-only",
  },
  {
    failedGateId: "dry-run-fixture-response-only",
    failedGateLabel: "dry-run fixture response only",
  },
  {
    failedGateId: "live-provider-execution-blocked",
    failedGateLabel: "live provider execution blocked",
  },
  {
    failedGateId: "credential-value-absent",
    failedGateLabel: "credential value absent",
  },
  {
    failedGateId: "credential-value-not-read",
    failedGateLabel: "credential value not read",
  },
  {
    failedGateId: "env-vars-not-read",
    failedGateLabel: "env vars not read",
  },
  {
    failedGateId: "provider-key-not-read",
    failedGateLabel: "provider key not read",
  },
  {
    failedGateId: "redacted-prompt-envelope-present",
    failedGateLabel: "redacted prompt envelope present",
  },
  {
    failedGateId: "prompt-not-sent",
    failedGateLabel: "prompt not sent",
  },
  {
    failedGateId: "provider-sdk-not-imported",
    failedGateLabel: "provider SDK not imported",
  },
  {
    failedGateId: "provider-response-not-received-from-provider",
    failedGateLabel: "provider response not received from provider",
  },
  {
    failedGateId: "model-output-not-generated-by-provider-model",
    failedGateLabel: "model output not generated by provider/model",
  },
  {
    failedGateId: "manual-approval-fixture",
    failedGateLabel: "manual approval fixture",
  },
  {
    failedGateId: "manual-confirmation-fixture",
    failedGateLabel: "manual confirmation fixture",
  },
  {
    failedGateId: "in-memory-only-capture-reference",
    failedGateLabel: "in-memory only capture reference",
  },
  {
    failedGateId: "no-real-approval-request",
    failedGateLabel: "no real approval request",
  },
  {
    failedGateId: "no-real-approval-recording",
    failedGateLabel: "no real approval recording",
  },
  {
    failedGateId: "no-approval-token-issuance",
    failedGateLabel: "no approval token issuance",
  },
  {
    failedGateId: "no-approval-lease-issuance",
    failedGateLabel: "no approval lease issuance",
  },
  {
    failedGateId: "no-frontend-request",
    failedGateLabel: "no frontend request",
  },
  {
    failedGateId: "no-api-route",
    failedGateLabel: "no API route",
  },
  {
    failedGateId: "no-fetch-network",
    failedGateLabel: "no fetch/network",
  },
  {
    failedGateId: "no-provider-sdk-import",
    failedGateLabel: "no provider SDK import",
  },
  {
    failedGateId: "no-live-provider-execution",
    failedGateLabel: "no live provider execution",
  },
  {
    failedGateId: "no-model-call",
    failedGateLabel: "no model call",
  },
  {
    failedGateId: "no-prompt-sending",
    failedGateLabel: "no prompt sending",
  },
  {
    failedGateId: "no-queue-dispatch",
    failedGateLabel: "no queue dispatch",
  },
  {
    failedGateId: "no-worker-dispatch",
    failedGateLabel: "no worker dispatch",
  },
  {
    failedGateId: "no-job-execution",
    failedGateLabel: "no job execution",
  },
  {
    failedGateId: "no-result-persistence",
    failedGateLabel: "no result persistence",
  },
  {
    failedGateId: "no-audit-persistence",
    failedGateLabel: "no audit persistence",
  },
  {
    failedGateId: "no-approval-persistence",
    failedGateLabel: "no approval persistence",
  },
  {
    failedGateId: "no-database-write",
    failedGateLabel: "no database write",
  },
  {
    failedGateId: "no-file-write",
    failedGateLabel: "no file write",
  },
  {
    failedGateId: "single-run-lock-preview",
    failedGateLabel: "single-run lock preview",
  },
  {
    failedGateId: "idempotency-replay-preview",
    failedGateLabel: "idempotency/replay preview",
  },
  {
    failedGateId: "timeout-cancel-preview",
    failedGateLabel: "timeout/cancel preview",
  },
  {
    failedGateId: "privacy-redaction-preview",
    failedGateLabel: "privacy/redaction preview",
  },
  {
    failedGateId: "kill-switch-fixture",
    failedGateLabel: "kill switch fixture",
  },
] as const;

export type ProviderDryRunResultCaptureGateFailureReviewId =
  (typeof PROVIDER_DRY_RUN_RESULT_CAPTURE_GATE_FAILURE_REVIEW_DEFINITIONS)[number]["failedGateId"];
export type ProviderDryRunResultCaptureGateFailureReviewLabel =
  (typeof PROVIDER_DRY_RUN_RESULT_CAPTURE_GATE_FAILURE_REVIEW_DEFINITIONS)[number]["failedGateLabel"];

export const PROVIDER_DRY_RUN_RESULT_CAPTURE_RECOVERY_READINESS_CHECKLIST_DEFINITIONS =
  [
    {
      checklistId:
        "server-only-provider-dry-run-result-capture-helper-reviewed",
      label: "server-only provider dry-run result capture helper reviewed",
    },
    {
      checklistId: "dry-run-result-capture-input-reviewed",
      label: "dry-run result capture input reviewed",
    },
    {
      checklistId: "dry-run-result-capture-check-reviewed",
      label: "dry-run result capture check reviewed",
    },
    {
      checklistId: "captured-fixture-result-output-reviewed",
      label: "captured fixture result output reviewed",
    },
    {
      checklistId: "result-capture-envelope-reviewed",
      label: "result capture envelope reviewed",
    },
    {
      checklistId: "blocked-persistence-summary-reviewed",
      label: "blocked persistence summary reviewed",
    },
    {
      checklistId: "evidence-preview-reviewed",
      label: "evidence preview reviewed",
    },
    {
      checklistId: "audit-preview-reviewed",
      label: "audit preview reviewed",
    },
    {
      checklistId: "approval-preview-reviewed",
      label: "approval preview reviewed",
    },
    {
      checklistId: "provider-dry-run-execution-review-dependency-reviewed",
      label: "provider dry-run execution review dependency reviewed",
    },
    {
      checklistId: "provider-dry-run-execution-output-dependency-reviewed",
      label: "provider dry-run execution output dependency reviewed",
    },
    {
      checklistId: "provider-dry-run-fixture-response-reviewed",
      label: "provider dry-run fixture response reviewed",
    },
    {
      checklistId: "selected-provider-slot-reviewed",
      label: "selected provider slot reviewed",
    },
    {
      checklistId: "backup-provider-slot-reviewed",
      label: "backup provider slot reviewed",
    },
    {
      checklistId: "local-private-alternative-reviewed",
      label: "local/private alternative reviewed",
    },
    {
      checklistId: "opaque-credential-reference-reviewed",
      label: "opaque credential reference reviewed",
    },
    {
      checklistId: "credential-value-absent-reviewed",
      label: "credential value absent reviewed",
    },
    {
      checklistId: "credential-value-not-read-reviewed",
      label: "credential value not read reviewed",
    },
    {
      checklistId: "env-vars-not-read-reviewed",
      label: "env vars not read reviewed",
    },
    {
      checklistId: "provider-key-not-read-reviewed",
      label: "provider key not read reviewed",
    },
    {
      checklistId: "provider-sdk-import-boundary-reviewed",
      label: "provider SDK import boundary reviewed",
    },
    {
      checklistId: "live-provider-execution-boundary-reviewed",
      label: "live provider execution boundary reviewed",
    },
    {
      checklistId: "redacted-prompt-envelope-reviewed",
      label: "redacted prompt envelope reviewed",
    },
    {
      checklistId: "prompt-transmission-blocked-reviewed",
      label: "prompt transmission blocked reviewed",
    },
    {
      checklistId: "manual-approval-fixture-reviewed",
      label: "manual approval fixture reviewed",
    },
    {
      checklistId: "manual-confirmation-fixture-reviewed",
      label: "manual confirmation fixture reviewed",
    },
    {
      checklistId: "kill-switch-fixture-reviewed",
      label: "kill switch fixture reviewed",
    },
    {
      checklistId: "model-boundary-reviewed",
      label: "model boundary reviewed",
    },
    {
      checklistId: "frontend-request-boundary-reviewed",
      label: "frontend request boundary reviewed",
    },
    {
      checklistId: "api-route-boundary-reviewed",
      label: "API route boundary reviewed",
    },
    {
      checklistId: "queue-dispatch-still-blocked",
      label: "queue dispatch still blocked",
    },
    {
      checklistId: "worker-dispatch-still-blocked",
      label: "worker dispatch still blocked",
    },
    {
      checklistId: "job-execution-still-blocked",
      label: "job execution still blocked",
    },
    {
      checklistId: "result-persistence-still-blocked",
      label: "result persistence still blocked",
    },
    {
      checklistId: "audit-persistence-still-blocked",
      label: "audit persistence still blocked",
    },
    {
      checklistId: "approval-persistence-still-blocked",
      label: "approval persistence still blocked",
    },
    {
      checklistId: "database-writes-still-blocked",
      label: "database writes still blocked",
    },
    {
      checklistId: "file-writes-still-blocked",
      label: "file writes still blocked",
    },
    {
      checklistId: "provider-adapter-dry-run-audit-approval-join-not-implemented",
      label: "provider adapter dry-run audit approval join not implemented",
    },
  ] as const;

export type ProviderDryRunResultCaptureRecoveryReadinessChecklistId =
  (typeof PROVIDER_DRY_RUN_RESULT_CAPTURE_RECOVERY_READINESS_CHECKLIST_DEFINITIONS)[number]["checklistId"];
export type ProviderDryRunResultCaptureRecoveryReadinessChecklistLabel =
  (typeof PROVIDER_DRY_RUN_RESULT_CAPTURE_RECOVERY_READINESS_CHECKLIST_DEFINITIONS)[number]["label"];

export type BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord =
  Readonly<{
    key: ProviderDryRunResultCaptureReviewKey;
    reviewVersion: ProviderDryRunResultCaptureReviewVersion;
    reviewId: ProviderDryRunResultCaptureReviewId;
    reviewLabel: ProviderDryRunResultCaptureReviewLabel;
    source: ProviderDryRunResultCaptureReviewSource;
    reviewMode: ProviderDryRunResultCaptureReviewMode;
    reviewPosture: ProviderDryRunResultCaptureReviewPosture;
    sourceProviderDryRunResultCaptureMvpReference: ProviderDryRunResultCaptureMvpSourceReference;
    sourceProviderDryRunResultCaptureInputReference: ProviderDryRunResultCaptureInputSourceReference;
    sourceProviderDryRunResultCaptureCheckReference: ProviderDryRunResultCaptureCheckSourceReference;
    sourceProviderDryRunCapturedFixtureResultOutputReference: ProviderDryRunCapturedFixtureResultOutputSourceReference;
    sourceProviderDryRunResultCaptureEnvelopeReference: ProviderDryRunResultCaptureEnvelopeSourceReference;
    sourceProviderDryRunResultCaptureEvidencePreviewReference: ProviderDryRunResultCaptureEvidencePreviewSourceReference;
    sourceProviderDryRunResultCaptureAuditPreviewReference: ProviderDryRunResultCaptureAuditPreviewSourceReference;
    sourceProviderDryRunResultCaptureApprovalPreviewReference: ProviderDryRunResultCaptureApprovalPreviewSourceReference;
    sourceProviderDryRunResultCaptureSafetyGateSummaryReference: ProviderDryRunResultCaptureSafetyGateSummarySourceReference;
    sourceProviderDryRunResultCaptureBlockedPersistenceSummaryReference: ProviderDryRunResultCaptureBlockedPersistenceSummarySourceReference;
    sourceProviderDryRunResultCaptureReadinessMatrixReference: ProviderDryRunResultCaptureReadinessMatrixSourceReference;
    sourceProviderDryRunExecutionReviewReference: ProviderDryRunExecutionReviewSourceReference;
    sourceProviderDryRunExecutionAcceptancePostureReference: ProviderDryRunExecutionAcceptancePostureSourceReference;
    sourceProviderDryRunExecutionAuditSummaryReference: ProviderDryRunExecutionReviewAuditSummarySourceReference;
    sourceProviderDryRunExecutionMvpReference: ProviderDryRunExecutionMvpSourceReference;
    sourceProviderDryRunFixtureResponseReference: ProviderDryRunFixtureResponseSourceReference;
    sourceProviderDryRunExecutionOutputReference: ProviderDryRunExecutionOutputSourceReference;
    sourceProviderDryRunBlockedLiveExecutionSummaryReference: ProviderDryRunBlockedLiveExecutionSummarySourceReference;
    sourceProviderDryRunAdmissionReviewReference: ProviderDryRunAdmissionReviewSourceReference;
    sourceProviderSelectionCredentialReferenceReviewReference: ProviderSelectionCredentialReferenceReviewSourceReference;
    selectedCapabilityFamily: ProviderDryRunResultCaptureCapabilityFamilyLabel;
    workspaceTarget: ProviderDryRunResultCaptureWorkspaceTarget;
    providerSlotLabel: ProviderDryRunResultCaptureProviderSlotLabel;
    backupProviderSlotLabel: ProviderDryRunResultCaptureProviderSlotLabel;
    localPrivateAlternativeLabel: MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord["localPrivateAlternativeLabel"];
    opaqueCredentialReferenceLabel: MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord["opaqueCredentialReferenceLabel"];
    serverOnlyProviderDryRunResultCaptureHelperState: ProviderDryRunResultCaptureReviewHelperState;
    providerDryRunResultCaptureState: ProviderDryRunResultCaptureReviewState;
    providerDryRunFixtureResponseCaptureState: ProviderDryRunFixtureResponseCaptureState;
    providerDryRunResultCapturePersistenceState: ProviderDryRunResultCapturePersistenceState;
    liveProviderExecutionState: ProviderDryRunResultCaptureLiveProviderExecutionState;
    selectedProviderSlotState: ProviderDryRunResultCapturePreviewState;
    backupProviderSlotState: ProviderDryRunResultCapturePreviewState;
    localPrivateAlternativeState: ProviderDryRunResultCapturePreviewState;
    credentialReferenceState: ProviderDryRunResultCaptureCredentialReferenceState;
    credentialValueState: ProviderDryRunResultCaptureCredentialValueState;
    envVarState: ProviderDryRunResultCaptureEnvVarState;
    providerKeyState: ProviderDryRunResultCaptureProviderKeyState;
    providerSdkImportState: ProviderDryRunResultCaptureProviderSdkImportState;
    providerResponseState: ProviderDryRunResultCaptureProviderResponseState;
    modelCallState: ProviderDryRunResultCaptureModelCallState;
    modelOutputState: ProviderDryRunResultCaptureModelOutputState;
    redactedPromptEnvelopeState: ProviderDryRunResultCapturePreviewState;
    promptTransmissionState: ProviderDryRunResultCapturePromptTransmissionState;
    frontendRequestState: ProviderDryRunResultCaptureFrontendRequestState;
    apiRouteState: ProviderDryRunResultCaptureApiRouteState;
    queueDispatchState: ProviderDryRunResultCaptureDispatchState;
    workerDispatchState: ProviderDryRunResultCaptureDispatchState;
    jobExecutionState: ProviderDryRunResultCaptureJobExecutionState;
    resultPersistenceState: ProviderDryRunResultCapturePersistenceState;
    auditPersistenceState: ProviderDryRunResultCapturePersistenceState;
    approvalPersistenceState: ProviderDryRunResultCapturePersistenceState;
    databaseWriteState: ProviderDryRunResultCapturePersistenceState;
    fileWriteState: ProviderDryRunResultCapturePersistenceState;
    approvalFixtureState: ProviderDryRunResultCaptureApprovalFixtureState;
    manualConfirmationFixtureState: ProviderDryRunResultCaptureManualConfirmationFixtureState;
    approvalTokenState: ProviderDryRunResultCaptureApprovalTokenState;
    approvalLeaseState: ProviderDryRunResultCaptureApprovalLeaseState;
    evidencePacketState: ProviderDryRunResultCaptureEvidencePacketState;
    killSwitchState: ProviderDryRunResultCaptureKillSwitchState;
    retryPosture: ProviderDryRunResultCaptureRetryPosture;
    fallbackPosture: ProviderDryRunResultCaptureFallbackPosture;
    operatorFacingExplanation: string;
    remainingBlockers: readonly string[];
    nextSafeAction: string;
    currentReadiness: ProviderDryRunResultCaptureReviewCurrentReadiness;
    acceptanceState: ProviderDryRunResultCaptureAcceptanceState;
    recoveryPosture: ProviderDryRunResultCaptureRecoveryPosture;
    nextProviderAdapterDryRunAuditApprovalJoinMvpRequirement:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  }>;

export type ProviderDryRunResultCaptureOutputReviewRecord = Readonly<{
  key: ProviderDryRunResultCaptureOutputReviewKey;
  outputReviewVersion: ProviderDryRunResultCaptureOutputReviewVersion;
  providerDryRunResultCaptureReviewId: ProviderDryRunResultCaptureReviewId;
  sourceProviderDryRunCapturedFixtureResultOutputReference: ProviderDryRunCapturedFixtureResultOutputSourceReference;
  sourceProviderDryRunResultCaptureEnvelopeReference: ProviderDryRunResultCaptureEnvelopeSourceReference;
  sourceProviderDryRunResultCaptureBlockedPersistenceSummaryReference: ProviderDryRunResultCaptureBlockedPersistenceSummarySourceReference;
  sourceProviderDryRunFixtureResponseReference: ProviderDryRunFixtureResponseSourceReference;
  captureState: "captured-provider-dry-run-fixture-result-in-memory-only";
  captureMode: "deterministic-fixture-only";
  capturedFixtureResponseState: ProviderDryRunFixtureResponseCaptureState;
  liveProviderExecutionState: ProviderDryRunResultCaptureLiveProviderExecutionState;
  providerDryRunResultCaptureIdPosture: ProviderDryRunResultCaptureDeterministicPreviewIdPosture;
  providerDryRunExecutionIdPosture: ProviderDryRunResultCaptureDeterministicPreviewIdPosture;
  providerDryRunAdmissionIdPosture: ProviderDryRunResultCaptureDeterministicPreviewIdPosture;
  providerSlotIdPosture: ProviderDryRunResultCaptureDeterministicPreviewIdPosture;
  credentialReferenceIdPosture: ProviderDryRunResultCaptureDeterministicOpaqueReferenceIdPosture;
  captureDigestPosture: ProviderDryRunResultCaptureDeterministicPreviewDigestPosture;
  selectedProviderSlotPosture: ProviderDryRunResultCapturePreviewState;
  backupProviderSlotPosture: ProviderDryRunResultCapturePreviewState;
  localPrivateAlternativePosture: ProviderDryRunResultCapturePreviewState;
  credentialReferencePosture: ProviderDryRunResultCaptureCredentialReferencePosture;
  credentialValueState: ProviderDryRunResultCaptureCredentialValueState;
  envVarState: ProviderDryRunResultCaptureEnvVarState;
  providerKeyState: ProviderDryRunResultCaptureProviderKeyState;
  providerSdkImportState: ProviderDryRunResultCaptureProviderSdkImportState;
  providerResponseState: ProviderDryRunResultCaptureProviderResponseState;
  modelOutputState: ProviderDryRunResultCaptureModelOutputState;
  promptTransmissionState: ProviderDryRunResultCapturePromptTransmissionState;
  outputClassification: ProviderDryRunResultCaptureOutputClassification;
  resultPersistenceState: ProviderDryRunResultCapturePersistenceState;
  auditPersistenceState: ProviderDryRunResultCapturePersistenceState;
  approvalPersistenceState: ProviderDryRunResultCapturePersistenceState;
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
  explicitDryRunResultCaptureFixtureOnlyNoSecretReadNoProviderCallNoPersistenceStatement:
    ProviderDryRunResultCaptureFixtureOnlyStatement;
}>;

export type ProviderDryRunResultCaptureGateFailureReviewRecord = Readonly<{
  key: ProviderDryRunResultCaptureGateFailureReviewKey;
  gateFailureReviewVersion: ProviderDryRunResultCaptureGateFailureReviewVersion;
  providerDryRunResultCaptureReviewId: ProviderDryRunResultCaptureReviewId;
  failedGateId: ProviderDryRunResultCaptureGateFailureReviewId;
  failedGateLabel: ProviderDryRunResultCaptureGateFailureReviewLabel;
  gateState: ProviderDryRunResultCaptureGateState;
  severity: ProviderDryRunResultCaptureReviewSeverity;
  affectedCapabilityFamily: ProviderDryRunResultCaptureCapabilityFamilyLabel;
  affectedWorkspaceTarget: ProviderDryRunResultCaptureWorkspaceTarget;
  affectedProviderSlot: ProviderDryRunResultCaptureProviderSlotLabel;
  affectedCredentialReference: MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord["opaqueCredentialReferenceLabel"];
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  providerAdapterDryRunAuditApprovalJoinMvpDependency:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  nextSafeAction: string;
  explicitNoLiveGatePassStatement:
    ProviderDryRunResultCaptureNoLiveGatePassStatement;
}>;

export type ProviderDryRunResultCaptureRecoveryPlanPreviewRecord = Readonly<{
  key: ProviderDryRunResultCaptureRecoveryPlanKey;
  recoveryPlanVersion: ProviderDryRunResultCaptureRecoveryPlanVersion;
  providerDryRunResultCaptureReviewId: ProviderDryRunResultCaptureReviewId;
  recoveryPosture: ProviderDryRunResultCaptureRecoveryPosture;
  serverOnlyProviderDryRunResultCaptureHelperRecovery: string;
  dryRunResultCaptureInputRecovery: string;
  dryRunResultCaptureCheckRecovery: string;
  capturedFixtureResultOutputRecovery: string;
  resultCaptureEnvelopeRecovery: string;
  blockedPersistenceSummaryRecovery: string;
  evidencePreviewRecovery: string;
  auditPreviewRecovery: string;
  approvalPreviewRecovery: string;
  dryRunExecutionDependencyRecovery: string;
  dryRunFixtureResponseDependencyRecovery: string;
  providerSelectionDependencyRecovery: string;
  credentialReferenceRecovery: string;
  credentialValueBoundaryRecovery: string;
  envVarBoundaryRecovery: string;
  providerKeyBoundaryRecovery: string;
  providerSdkBoundaryRecovery: string;
  liveProviderExecutionBoundaryRecovery: string;
  promptBoundaryRecovery: string;
  modelBoundaryRecovery: string;
  frontendRequestBoundaryRecovery: string;
  apiRouteBoundaryRecovery: string;
  queueDispatchBlockedRecovery: string;
  workerDispatchBlockedRecovery: string;
  jobExecutionBlockedRecovery: string;
  resultPersistenceMissingRecovery: string;
  auditPersistenceMissingRecovery: string;
  approvalPersistenceMissingRecovery: string;
  databaseWriteBlockedRecovery: string;
  fileWriteBlockedRecovery: string;
  auditApprovalJoinMissingRecovery: string;
  retryPosture: ProviderDryRunResultCaptureRetryPosture;
  fallbackPosture: ProviderDryRunResultCaptureFallbackPosture;
  operatorActionRequired: string;
  nextSafeBatchRecommendation:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  explicitNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement:
    ProviderDryRunResultCaptureNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement;
}>;

export type ProviderDryRunResultCaptureRecoveryReadinessChecklistRecord =
  Readonly<{
    key: ProviderDryRunResultCaptureRecoveryReadinessChecklistKey;
    checklistVersion: ProviderDryRunResultCaptureRecoveryReadinessChecklistVersion;
    providerDryRunResultCaptureReviewId: ProviderDryRunResultCaptureReviewId;
    checklistId: ProviderDryRunResultCaptureRecoveryReadinessChecklistId;
    label: ProviderDryRunResultCaptureRecoveryReadinessChecklistLabel;
    state: ProviderDryRunResultCaptureRecoveryReadinessState;
    severity: ProviderDryRunResultCaptureReviewSeverity;
    evidenceRequired: string;
    recoveryAction: string;
    owner: ProviderDryRunResultCaptureRecoveryReadinessOwner;
    currentPosture: ProviderDryRunResultCaptureCurrentPosture;
    providerAdapterDryRunAuditApprovalJoinMvpDependency:
      typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
    nextSafeAction: string;
  }>;

export type ProviderDryRunResultCaptureReviewAuditSummaryRecord = Readonly<{
  key: ProviderDryRunResultCaptureReviewAuditSummaryKey;
  auditSummaryVersion: ProviderDryRunResultCaptureReviewAuditSummaryVersion;
  providerDryRunResultCaptureReviewId: ProviderDryRunResultCaptureReviewId;
  auditPosture: ProviderDryRunResultCaptureAuditPosture;
  captureReferenceState: ProviderDryRunResultCaptureReferenceState;
  capturedFixtureResponseReferenceState: ProviderDryRunResultCaptureReferenceState;
  executionReferenceState: ProviderDryRunResultCaptureReferenceState;
  providerSlotReferenceState: ProviderDryRunResultCaptureReferenceState;
  credentialReferenceState: ProviderDryRunResultCaptureCredentialReferenceAuditState;
  liveProviderExecutionState: ProviderDryRunResultCaptureLiveProviderExecutionState;
  credentialValueState: ProviderDryRunResultCaptureCredentialValueState;
  envVarState: ProviderDryRunResultCaptureEnvVarState;
  providerKeyState: ProviderDryRunResultCaptureProviderKeyState;
  evidencePacketState: ProviderDryRunResultCaptureEvidencePacketState;
  serverOnlyResultCaptureHelperEvidenceSummary: string;
  deterministicDryRunResultCaptureEvidenceSummary: string;
  capturedFixtureResponseEvidenceSummary: string;
  blockedPersistenceSummary: string;
  failedGateSummary: string;
  recoverySummary: string;
  blockedActionSummary: string;
  noSecretReadStatement: string;
  noEnvVarReadStatement: string;
  noProviderOutputStatement: string;
  noModelOutputStatement: string;
  noPromptSendingStatement: string;
  noResultPersistenceStatement: string;
  noAuditPersistenceStatement: string;
  noApprovalPersistenceStatement: string;
  noDatabaseWriteStatement: string;
  noFileWriteStatement: string;
  providerAdapterDryRunAuditAndApprovalJoinMvpRequirement:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
}>;

export type ProviderDryRunResultCaptureAcceptancePostureRecord = Readonly<{
  key: ProviderDryRunResultCaptureAcceptancePostureKey;
  acceptancePostureVersion: ProviderDryRunResultCaptureAcceptancePostureVersion;
  providerDryRunResultCaptureReviewId: ProviderDryRunResultCaptureReviewId;
  acceptanceState: ProviderDryRunResultCaptureAcceptanceState;
  fixtureOnlyAcceptanceSummary: string;
  backendOnlyAcceptanceSummary: string;
  serverOnlyAcceptanceSummary: string;
  dryRunResultCaptureOnlyAcceptanceSummary: string;
  credentialReferenceOnlyAcceptanceSummary: string;
  capturedFixtureResponseOnlyAcceptanceSummary: string;
  blockedLiveExecutionAcceptanceSummary: string;
  blockedPersistenceAcceptanceSummary: string;
  selectedProviderSlotAcceptanceSummary: string;
  backupProviderSlotAcceptanceSummary: string;
  localPrivateAlternativeAcceptanceSummary: string;
  providerBlockers: readonly string[];
  credentialValueBlockers: readonly string[];
  envVarBlockers: readonly string[];
  promptBlockers: readonly string[];
  modelBlockers: readonly string[];
  queueWorkerJobBlockers: readonly string[];
  resultPersistenceBlockers: readonly string[];
  auditPersistenceBlockers: readonly string[];
  approvalPersistenceBlockers: readonly string[];
  databaseFileBlockers: readonly string[];
  approvalBlockers: readonly string[];
  auditBlockers: readonly string[];
  auditApprovalJoinBlockers: readonly string[];
  requiredEvidence: readonly string[];
  nextSafeAction: string;
  explicitProviderDryRunResultCaptureFixtureAcceptedLiveProviderExecutionAndPersistenceNotAcceptedStatement:
    ProviderDryRunResultCaptureAcceptanceStatement;
}>;

export type ProviderDryRunResultCaptureReviewSummary = Readonly<{
  version: ProviderDryRunResultCaptureReviewSummaryVersion;
  highestDetectedPhase:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE;
  latestCompletedBatch:
    typeof BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH;
  previousCompletedBatch:
    typeof PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH;
  nextLikelyBatch:
    typeof NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH;
  currentReadiness: ProviderDryRunResultCaptureReviewCurrentReadiness;
  acceptanceState: ProviderDryRunResultCaptureAcceptanceState;
  recoveryPosture: ProviderDryRunResultCaptureRecoveryPosture;
  retryPosture: ProviderDryRunResultCaptureRetryPosture;
  fallbackPosture: ProviderDryRunResultCaptureFallbackPosture;
  recordCount: number;
  sectionTitles: readonly ProviderDryRunResultCaptureReviewSectionTitle[];
  summaryLines: readonly string[];
}>;

export type ProviderDryRunResultCaptureOutputReviewSummary = Readonly<{
  version: ProviderDryRunResultCaptureOutputReviewSummaryVersion;
  recordCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderDryRunResultCaptureGateFailureSummary = Readonly<{
  version: ProviderDryRunResultCaptureGateFailureSummaryVersion;
  recordCount: number;
  blockedGateCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderDryRunResultCaptureRecoverySummary = Readonly<{
  version: ProviderDryRunResultCaptureRecoverySummaryVersion;
  recordCount: number;
  summaryLines: readonly string[];
  nextSafeAction: string;
}>;

export type ProviderAdapterDryRunAuditApprovalJoinMvpChecklist =
  readonly string[];

export type ProviderDryRunResultCaptureReviewCapabilityFamilyGroup = Readonly<{
  capabilityFamily: ProviderDryRunResultCaptureCapabilityFamilyLabel;
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord[];
}>;

export type ProviderDryRunResultCaptureReviewProviderSlotGroup = Readonly<{
  providerSlotLabel: ProviderDryRunResultCaptureProviderSlotLabel;
  reviewCount: number;
  reviews: readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord[];
}>;

export type ProviderDryRunResultCaptureReviewCredentialReferenceGroup =
  Readonly<{
    opaqueCredentialReferenceLabel: MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord["opaqueCredentialReferenceLabel"];
    reviewCount: number;
    reviews: readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord[];
  }>;
