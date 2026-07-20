import {
  listAthenaModelRoutingPreviews,
} from "../athena-model-routing-provider-selection-preview";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews,
  listSyntheticEndToEndPacketAcceptancePostureRecords,
  listSyntheticEndToEndPacketReviewAuditSummaries,
} from "../min-synth-e2e-review";
import {
  listMinimalManualGatedTextModelAdapterMvpRecords,
  listTextAdapterAdmissionChecks,
  listTextAdapterApprovalPreviews,
  listTextAdapterAuditPreviews,
  listTextAdapterBlockedLiveProviderSummaries,
  listTextAdapterEvidencePreviews,
  listTextAdapterFixtureResponses,
  listTextAdapterGates,
  listTextAdapterInputs,
  listTextAdapterNormalizedRequests,
  listTextAdapterRedactedPromptEnvelopes,
  listTextAdapterResponseEnvelopes,
} from "../min-text-adapter";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
  type BackendOwnedMinimalManualGatedTextAdapterReviewRecord,
  type MinimalTextAdapterAcceptancePostureKey,
  type MinimalTextAdapterAcceptancePostureRecord,
  type MinimalTextAdapterAcceptanceState,
  type MinimalTextAdapterAcceptanceStatement,
  type MinimalTextAdapterGateFailureReviewKey,
  type MinimalTextAdapterGateFailureReviewRecord,
  type MinimalTextAdapterGateFailureSummary,
  type MinimalTextAdapterNoLiveGatePassStatement,
  type MinimalTextAdapterNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement,
  type MinimalTextAdapterOutputOnlyStatement,
  type MinimalTextAdapterOutputReviewKey,
  type MinimalTextAdapterOutputReviewRecord,
  type MinimalTextAdapterOutputReviewSummary,
  type MinimalTextAdapterRecoveryPlanKey,
  type MinimalTextAdapterRecoveryPlanPreviewRecord,
  type MinimalTextAdapterRecoveryReadinessChecklistId,
  type MinimalTextAdapterRecoveryReadinessChecklistKey,
  type MinimalTextAdapterRecoveryReadinessChecklistRecord,
  type MinimalTextAdapterRecoverySummary,
  type MinimalTextAdapterResultCaptureMvpChecklist,
  type MinimalTextAdapterReviewAuditSummaryKey,
  type MinimalTextAdapterReviewAuditSummaryRecord,
  type MinimalTextAdapterReviewCapabilityFamilyGroup,
  type MinimalTextAdapterReviewCurrentReadiness,
  type MinimalTextAdapterReviewDisplayStrings,
  type MinimalTextAdapterReviewId,
  type MinimalTextAdapterReviewKey,
  type MinimalTextAdapterReviewMode,
  type MinimalTextAdapterReviewPosture,
  type MinimalTextAdapterReviewSeverity,
  type MinimalTextAdapterReviewSource,
  type MinimalTextAdapterReviewSummary,
  type MinimalTextAdapterReviewVersion,
  type MinimalTextAdapterReviewWorkspaceGroup,
} from "./min-text-adapter-review-types";

type TextAdapterReviewSourceBundle = Readonly<{
  routingPreviewRecord: ReturnType<typeof listAthenaModelRoutingPreviews>[number];
  endToEndPacketReviewRecord: ReturnType<
    typeof listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews
  >[number];
  acceptancePostureRecord: ReturnType<
    typeof listSyntheticEndToEndPacketAcceptancePostureRecords
  >[number];
  auditSummaryRecord: ReturnType<
    typeof listSyntheticEndToEndPacketReviewAuditSummaries
  >[number];
  manualApprovalDecisionReviewRecord: ReturnType<
    typeof listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews
  >[number];
}>;

type GateFailureSeed = Readonly<{
  severity: MinimalTextAdapterReviewSeverity;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
}>;

type RecoveryReadinessChecklistSeed = Readonly<{
  checklistId: MinimalTextAdapterRecoveryReadinessChecklistId;
  label: MinimalTextAdapterRecoveryReadinessChecklistRecord["label"];
  state: MinimalTextAdapterRecoveryReadinessChecklistRecord["state"];
  severity: MinimalTextAdapterRecoveryReadinessChecklistRecord["severity"];
  evidenceRequired: string;
  recoveryAction: string;
  owner: MinimalTextAdapterRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const REVIEW_SOURCE: MinimalTextAdapterReviewSource =
  "Athena / Jarvis Model Gateway";
const REVIEW_MODE: MinimalTextAdapterReviewMode = "preview-only";
const REVIEW_POSTURE: MinimalTextAdapterReviewPosture =
  "minimal text adapter review / backend-only / fixture-only / not provider-capable / not persistent";
const CURRENT_READINESS: MinimalTextAdapterReviewCurrentReadiness =
  "minimal-text-adapter-review-only / backend-only / fixture-only / not provider-capable / not persistent";
const ACCEPTANCE_STATE: MinimalTextAdapterAcceptanceState =
  "not accepted for live provider execution / text adapter fixture MVP accepted only";
const OUTPUT_ONLY_STATEMENT: MinimalTextAdapterOutputOnlyStatement =
  "Fixture response only. No real output. No provider call. No persistence.";
const NO_LIVE_GATE_PASS_STATEMENT: MinimalTextAdapterNoLiveGatePassStatement =
  "No live gate pass.";
const NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_PERSISTENCE_STATEMENT: MinimalTextAdapterNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No persistence.";
const ACCEPTANCE_STATEMENT: MinimalTextAdapterAcceptanceStatement =
  "Text adapter fixture accepted only. Live provider execution not accepted.";

const SOURCE_MVP_RECORD = resolveRequiredRecord(
  listMinimalManualGatedTextModelAdapterMvpRecords(),
  (record) => record.stableId,
  "conversational-planning-request",
  "minimal text adapter MVP record"
);
const SOURCE_INPUT_RECORD = resolveRequiredRecord(
  listTextAdapterInputs(),
  (record) => record.stableId,
  "conversational-planning-request",
  "text adapter input record"
);
const SOURCE_ADMISSION_CHECK_RECORD = resolveRequiredRecord(
  listTextAdapterAdmissionChecks(),
  (record) => record.stableId,
  "conversational-planning-request",
  "text adapter admission check record"
);
const SOURCE_NORMALIZED_REQUEST_RECORD = resolveRequiredRecord(
  listTextAdapterNormalizedRequests(),
  (record) => record.stableId,
  "conversational-planning-request",
  "text adapter normalized request record"
);
const SOURCE_REDACTED_PROMPT_ENVELOPE_RECORD = resolveRequiredRecord(
  listTextAdapterRedactedPromptEnvelopes(),
  (record) => record.stableId,
  "conversational-planning-request",
  "text adapter redacted prompt envelope record"
);
const SOURCE_FIXTURE_RESPONSE_RECORD = resolveRequiredRecord(
  listTextAdapterFixtureResponses(),
  (record) => record.stableId,
  "conversational-planning-request",
  "text adapter fixture response record"
);
const SOURCE_RESPONSE_ENVELOPE_RECORD = resolveRequiredRecord(
  listTextAdapterResponseEnvelopes(),
  (record) => record.stableId,
  "conversational-planning-request",
  "text adapter response envelope record"
);
const SOURCE_EVIDENCE_PREVIEW_RECORD = resolveRequiredRecord(
  listTextAdapterEvidencePreviews(),
  (record) => record.stableId,
  "conversational-planning-request",
  "text adapter evidence preview record"
);
const SOURCE_AUDIT_PREVIEW_RECORD = resolveRequiredRecord(
  listTextAdapterAuditPreviews(),
  (record) => record.stableId,
  "conversational-planning-request",
  "text adapter audit preview record"
);
const SOURCE_APPROVAL_PREVIEW_RECORD = resolveRequiredRecord(
  listTextAdapterApprovalPreviews(),
  (record) => record.stableId,
  "conversational-planning-request",
  "text adapter approval preview record"
);
const SOURCE_BLOCKED_LIVE_PROVIDER_SUMMARY_RECORD = resolveRequiredRecord(
  listTextAdapterBlockedLiveProviderSummaries(),
  (record) => record.stableId,
  "conversational-planning-request",
  "text adapter blocked live provider summary record"
);
const TEXT_ADAPTER_GATE_RECORDS = listTextAdapterGates();

const REVIEW_SUMMARY_LINES = [
  "backend-owned minimal manual-gated text model adapter review and recovery preview only",
  "minimal text adapter review is preview-only",
  "server-only text adapter helper exists",
  "text adapter output is deterministic fixture output only",
  "text adapter is not provider-capable yet",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "provider response is not received",
  "model output is not generated",
  "no prompt sending",
  "no LLM/model calls",
  "no frontend provider call",
  "no frontend fetch/network call",
  "no provider SDK imports",
  "no provider execution",
  "no plugin execution",
  "no autonomous execution",
  "no live video generation",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no retry execution",
  "no fallback execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no persistent memory",
  "no browser storage",
  "no database writes",
  "no file writes",
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval fixture required",
  "manual confirmation fixture required",
  "kill switch required",
  "audit preview required",
  "opaque credential references only",
  "no plaintext secrets",
  `current readiness is ${CURRENT_READINESS}`,
  `acceptance state is ${ACCEPTANCE_STATE}`,
  "backend-owned minimal manual-gated text model adapter result capture MVP next",
] as const;

const OUTPUT_REVIEW_SUMMARY_LINES = [
  "Text adapter output review",
  "text adapter output is deterministic fixture output only",
  "prompt transmission state is not sent",
  "provider response is not received",
  "model output is not generated",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "text adapter result capture MVP comes next",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only adapter module boundary",
  "text adapter fixture mode",
  "synthetic end-to-end packet review dependency",
  "manual approval fixture",
  "manual confirmation fixture",
  "deterministic adapter id",
  "deterministic request id",
  "deterministic response id",
  "deterministic adapter digest",
  "redacted prompt envelope",
  "prompt not sent",
  "provider SDK not imported",
  "provider response not received",
  "model output not generated",
  "no real approval recording",
  "no approval token issuance",
  "no approval lease issuance",
  "no frontend request",
  "no API route",
  "no fetch/network",
  "no provider execution",
  "no model call",
  "no prompt sending",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database write",
  "no file write",
  "single-run lock preview",
  "idempotency/replay preview",
  "timeout/cancel preview",
  "privacy/redaction preview",
  "kill switch fixture",
] as const;

const RECOVERY_SUMMARY_LINES = [
  "Text adapter recovery plan",
  "Text adapter recovery readiness",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "text adapter result capture MVP comes next",
] as const;

const MINIMAL_TEXT_ADAPTER_RESULT_CAPTURE_MVP_CHECKLIST_LINES = [
  "Carry the review and recovery layer forward without opening a frontend request or API route.",
  "Keep the server-only text adapter helper backend-only, fixture-only, deterministic, and in-memory only.",
  "Do not add prompt sending, provider SDK imports, provider execution, model calls, queue dispatch, worker dispatch, or job execution.",
  "Keep approval fixtures preview-only and leave approval tokens, approval leases, result persistence, audit persistence, approval persistence, database writes, and file writes unimplemented.",
  "5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP",
] as const;

const GATE_FAILURE_SEEDS = new Map<
  ReturnType<typeof listTextAdapterGates>[number]["id"],
  GateFailureSeed
>([
  [
    "backend-only-boundary",
    {
      severity: "critical",
      requiredEvidenceToUnblock:
        "Backend-only execution path required and no frontend-callable adapter path exists.",
      requiredRecoveryAction:
        "Keep the review layer read-only and backend-owned.",
    },
  ],
  [
    "server-only-adapter-module-boundary",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "server-only text adapter helper exists",
      requiredRecoveryAction:
        "Do not expose the helper through a client module or API route.",
    },
  ],
  [
    "text-adapter-fixture-mode",
    {
      severity: "critical",
      requiredEvidenceToUnblock:
        "text adapter output is deterministic fixture output only",
      requiredRecoveryAction:
        "Keep text adapter output fixture-only and detached from provider traffic.",
    },
  ],
  [
    "synthetic-end-to-end-packet-review-dependency",
    {
      severity: "high",
      requiredEvidenceToUnblock:
        "Backend-owned minimal synthetic end-to-end packet review remains available as a deterministic dependency.",
      requiredRecoveryAction:
        "Preserve the synthetic end-to-end packet review dependency and keep it preview-only.",
    },
  ],
  [
    "manual-approval-fixture",
    {
      severity: "high",
      requiredEvidenceToUnblock: "approval fixture is preview-only",
      requiredRecoveryAction:
        "Keep manual approval fixture preview-only and unrecorded.",
    },
  ],
  [
    "manual-confirmation-fixture",
    {
      severity: "high",
      requiredEvidenceToUnblock:
        "manual confirmation fixture is preview-only",
      requiredRecoveryAction:
        "Keep manual confirmation fixture preview-only and unrecorded.",
    },
  ],
  [
    "deterministic-adapter-id",
    {
      severity: "high",
      requiredEvidenceToUnblock:
        "adapter id posture remains deterministic preview id only.",
      requiredRecoveryAction:
        "Keep adapter identifiers deterministic and preview-only.",
    },
  ],
  [
    "deterministic-request-id",
    {
      severity: "high",
      requiredEvidenceToUnblock:
        "request id posture remains deterministic preview id only.",
      requiredRecoveryAction:
        "Keep request identifiers deterministic and preview-only.",
    },
  ],
  [
    "deterministic-response-id",
    {
      severity: "high",
      requiredEvidenceToUnblock:
        "response id posture remains deterministic preview id only.",
      requiredRecoveryAction:
        "Keep response identifiers deterministic and preview-only.",
    },
  ],
  [
    "deterministic-adapter-digest",
    {
      severity: "high",
      requiredEvidenceToUnblock:
        "digest posture remains deterministic preview digest only.",
      requiredRecoveryAction:
        "Keep the adapter digest deterministic and preview-only.",
    },
  ],
  [
    "redacted-prompt-envelope",
    {
      severity: "high",
      requiredEvidenceToUnblock:
        "redacted prompt envelope is preview-only",
      requiredRecoveryAction:
        "Keep prompt content redacted and preview-only.",
    },
  ],
  [
    "prompt-not-sent",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "prompt transmission state is not sent",
      requiredRecoveryAction: "Keep prompt transmission unimplemented.",
    },
  ],
  [
    "provider-response-not-received",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "provider response is not received",
      requiredRecoveryAction:
        "Keep provider response ingestion out of scope.",
    },
  ],
  [
    "model-output-not-generated",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "model output is not generated",
      requiredRecoveryAction: "Keep model output generation blocked.",
    },
  ],
  [
    "no-real-approval-recording",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no real approval recording",
      requiredRecoveryAction:
        "Do not record approval state or convert preview approval into a live decision.",
    },
  ],
  [
    "no-approval-token-issuance",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "approval token is not issued",
      requiredRecoveryAction: "Keep approval token issuance absent.",
    },
  ],
  [
    "no-approval-lease-issuance",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "approval lease is not created",
      requiredRecoveryAction: "Keep approval lease issuance absent.",
    },
  ],
  [
    "no-frontend-request",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no frontend request is created",
      requiredRecoveryAction:
        "Keep the chat input inert, local only, and detached from execution.",
    },
  ],
  [
    "no-api-route",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no API route is created",
      requiredRecoveryAction:
        "Do not expose the text adapter helper through a route.",
    },
  ],
  [
    "no-fetch-network",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no frontend fetch/network call",
      requiredRecoveryAction: "Keep the frontend network boundary closed.",
    },
  ],
  [
    "no-provider-sdk-import",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no provider SDK imports",
      requiredRecoveryAction: "Do not import provider SDKs.",
    },
  ],
  [
    "no-provider-execution",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no provider execution",
      requiredRecoveryAction:
        "Keep provider execution blocked until a future backend-only implementation exists.",
    },
  ],
  [
    "no-model-call",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no LLM/model calls",
      requiredRecoveryAction: "Keep model invocation blocked.",
    },
  ],
  [
    "no-prompt-sending",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no prompt sending",
      requiredRecoveryAction: "Keep prompt sending absent.",
    },
  ],
  [
    "no-queue-dispatch",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no queue dispatch",
      requiredRecoveryAction: "Keep queue dispatch blocked.",
    },
  ],
  [
    "no-worker-dispatch",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no worker dispatch",
      requiredRecoveryAction: "Keep worker dispatch blocked.",
    },
  ],
  [
    "no-job-execution",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no job execution",
      requiredRecoveryAction: "Keep job execution blocked.",
    },
  ],
  [
    "no-result-persistence",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no result persistence",
      requiredRecoveryAction: "Keep result persistence unimplemented.",
    },
  ],
  [
    "no-audit-persistence",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no audit persistence",
      requiredRecoveryAction: "Keep audit persistence unimplemented.",
    },
  ],
  [
    "no-approval-persistence",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no approval persistence",
      requiredRecoveryAction: "Keep approval persistence unimplemented.",
    },
  ],
  [
    "no-database-write",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no database writes",
      requiredRecoveryAction: "Keep database writes absent.",
    },
  ],
  [
    "no-file-write",
    {
      severity: "critical",
      requiredEvidenceToUnblock: "no file writes",
      requiredRecoveryAction: "Keep file writes absent.",
    },
  ],
  [
    "single-run-lock-preview",
    {
      severity: "medium",
      requiredEvidenceToUnblock: "single-run lock preview",
      requiredRecoveryAction:
        "Keep single-run lock posture preview-only and inert.",
    },
  ],
  [
    "idempotency-replay-preview",
    {
      severity: "medium",
      requiredEvidenceToUnblock: "idempotency/replay preview",
      requiredRecoveryAction:
        "Keep idempotency and replay posture preview-only and inert.",
    },
  ],
  [
    "timeout-cancel-preview",
    {
      severity: "medium",
      requiredEvidenceToUnblock: "timeout/cancel preview",
      requiredRecoveryAction:
        "Keep timeout and cancel posture preview-only and inert.",
    },
  ],
  [
    "privacy-redaction-preview",
    {
      severity: "high",
      requiredEvidenceToUnblock: "privacy/redaction preview",
      requiredRecoveryAction:
        "Keep privacy and redaction posture explicit and preview-only.",
    },
  ],
  [
    "kill-switch-fixture",
    {
      severity: "high",
      requiredEvidenceToUnblock: "kill switch fixture remains visible and inactive",
      requiredRecoveryAction:
        "Keep kill switch posture visible, inactive, and fixture-only.",
    },
  ],
]);

const RECOVERY_READINESS_CHECKLIST_SEEDS = [
  {
    checklistId: "server-only-text-adapter-helper-reviewed",
    label: "server-only text adapter helper reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "server-only text adapter helper exists",
    recoveryAction:
      "Keep the helper deterministic, server-only, and detached from client execution.",
    owner: "operator",
    nextSafeAction:
      "Review the helper boundary without adding a frontend-callable path.",
  },
  {
    checklistId: "text-adapter-input-reviewed",
    label: "text adapter input reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired:
      "text adapter input remains deterministic text adapter fixture input only",
    recoveryAction:
      "Keep text adapter input typed, deterministic, and detached from transport.",
    owner: "operator",
    nextSafeAction: "Review input posture without creating a request path.",
  },
  {
    checklistId: "adapter-admission-check-reviewed",
    label: "adapter admission check reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired:
      "adapter admission check remains accepted / fixture-only / provider-disabled",
    recoveryAction: "Keep admission checks deterministic and typed.",
    owner: "operator",
    nextSafeAction: "Review admission posture without enabling execution.",
  },
  {
    checklistId: "normalized-request-reviewed",
    label: "normalized request reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired:
      "normalized request remains normalized text adapter fixture request only",
    recoveryAction: "Keep normalized requests typed and redacted.",
    owner: "operator",
    nextSafeAction: "Review normalized request posture only.",
  },
  {
    checklistId: "redacted-prompt-envelope-reviewed",
    label: "redacted prompt envelope reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "redacted prompt envelope is preview-only",
    recoveryAction: "Keep prompt content redacted and preview-only.",
    owner: "safety review",
    nextSafeAction: "Review prompt redaction without sending anything.",
  },
  {
    checklistId: "deterministic-fixture-response-reviewed",
    label: "deterministic fixture response reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired:
      "text adapter output is deterministic fixture output only",
    recoveryAction: "Keep output deterministic, fixture-only, and in memory only.",
    owner: "operator",
    nextSafeAction: "Review output posture without treating it as provider output.",
  },
  {
    checklistId: "response-envelope-reviewed",
    label: "response envelope reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: OUTPUT_ONLY_STATEMENT,
    recoveryAction: "Keep the response envelope limited to preview references.",
    owner: "operator",
    nextSafeAction: "Review response envelope references only.",
  },
  {
    checklistId: "error-envelope-reviewed",
    label: "error envelope reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "error envelope remains preview-only and deterministic",
    recoveryAction: "Keep the error envelope deterministic and inert.",
    owner: "operator",
    nextSafeAction: "Review error posture without enabling retries.",
  },
  {
    checklistId: "evidence-preview-reviewed",
    label: "evidence preview reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "evidence packet state is preview-only / not persisted",
    recoveryAction: "Keep evidence preview-only and unpersisted.",
    owner: "operator",
    nextSafeAction: "Review evidence without creating stored packets.",
  },
  {
    checklistId: "audit-preview-reviewed",
    label: "audit preview reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "audit preview state is preview-only",
    recoveryAction: "Keep audit preview disconnected from persistence.",
    owner: "operator",
    nextSafeAction: "Review audit posture without storing audit records.",
  },
  {
    checklistId: "approval-preview-reviewed",
    label: "approval preview reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "approval preview state is preview-only",
    recoveryAction: "Keep approval preview disconnected from persistence.",
    owner: "operator",
    nextSafeAction: "Review approval posture without issuing tokens or leases.",
  },
  {
    checklistId: "synthetic-end-to-end-packet-review-dependency-reviewed",
    label: "synthetic end-to-end packet review dependency reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired:
      "Backend-owned minimal synthetic end-to-end packet review remains a typed dependency.",
    recoveryAction:
      "Preserve the synthetic end-to-end packet review dependency and keep it preview-only.",
    owner: "operator",
    nextSafeAction: "Carry the dependency forward without enabling execution.",
  },
  {
    checklistId: "manual-approval-fixture-reviewed",
    label: "manual approval fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "approval fixture is preview-only",
    recoveryAction: "Keep manual approval fixture preview-only.",
    owner: "operator",
    nextSafeAction: "Do not convert approval preview into a live request.",
  },
  {
    checklistId: "manual-confirmation-fixture-reviewed",
    label: "manual confirmation fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "manual confirmation fixture is preview-only",
    recoveryAction: "Keep manual confirmation fixture preview-only.",
    owner: "operator",
    nextSafeAction: "Do not record confirmation state.",
  },
  {
    checklistId: "kill-switch-fixture-reviewed",
    label: "kill switch fixture reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired: "kill switch required",
    recoveryAction:
      "Keep the kill switch posture visible and inactive fixture-only.",
    owner: "safety review",
    nextSafeAction: "Confirm kill switch posture stays visible and inactive.",
  },
  {
    checklistId: "provider-boundary-reviewed",
    label: "provider boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no provider execution",
    recoveryAction: "Do not import provider SDKs or connect provider execution.",
    owner: "backend future",
    nextSafeAction: "Hold provider execution out of scope for this batch.",
  },
  {
    checklistId: "prompt-boundary-reviewed",
    label: "prompt boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no prompt sending",
    recoveryAction: "Keep prompt sending absent.",
    owner: "backend future",
    nextSafeAction: "Do not add prompt transport.",
  },
  {
    checklistId: "model-boundary-reviewed",
    label: "model boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no LLM/model calls",
    recoveryAction: "Keep model invocation blocked.",
    owner: "backend future",
    nextSafeAction: "Do not add model output generation.",
  },
  {
    checklistId: "frontend-request-boundary-reviewed",
    label: "frontend request boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no frontend request is created",
    recoveryAction: "Keep the frontend request boundary closed.",
    owner: "backend future",
    nextSafeAction: "Do not add a client request surface.",
  },
  {
    checklistId: "api-route-boundary-reviewed",
    label: "API route boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no API route is created",
    recoveryAction: "Keep API route creation out of scope.",
    owner: "backend future",
    nextSafeAction: "Do not add a route for adapter execution.",
  },
  {
    checklistId: "queue-dispatch-still-blocked",
    label: "queue dispatch still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no queue dispatch",
    recoveryAction: "Keep queue dispatch blocked.",
    owner: "backend future",
    nextSafeAction: "Do not introduce queue orchestration.",
  },
  {
    checklistId: "worker-dispatch-still-blocked",
    label: "worker dispatch still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no worker dispatch",
    recoveryAction: "Keep worker dispatch blocked.",
    owner: "backend future",
    nextSafeAction: "Do not introduce worker orchestration.",
  },
  {
    checklistId: "job-execution-still-blocked",
    label: "job execution still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no job execution",
    recoveryAction: "Keep job execution blocked.",
    owner: "backend future",
    nextSafeAction: "Do not introduce job execution.",
  },
  {
    checklistId: "result-persistence-still-blocked",
    label: "result persistence still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no result persistence",
    recoveryAction: "Keep result persistence unimplemented.",
    owner: "backend future",
    nextSafeAction:
      "Keep result references preview-only until backend persistence exists.",
  },
  {
    checklistId: "audit-persistence-still-blocked",
    label: "audit persistence still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no audit persistence",
    recoveryAction: "Keep audit persistence unimplemented.",
    owner: "backend future",
    nextSafeAction:
      "Keep audit references preview-only until backend persistence exists.",
  },
  {
    checklistId: "approval-persistence-still-blocked",
    label: "approval persistence still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no approval persistence",
    recoveryAction: "Keep approval persistence unimplemented.",
    owner: "backend future",
    nextSafeAction:
      "Keep approval references preview-only until backend persistence exists.",
  },
  {
    checklistId: "database-writes-still-blocked",
    label: "database writes still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no database writes",
    recoveryAction: "Keep database writes absent.",
    owner: "backend future",
    nextSafeAction: "Do not introduce database writes.",
  },
  {
    checklistId: "file-writes-still-blocked",
    label: "file writes still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no file writes",
    recoveryAction: "Keep file writes absent.",
    owner: "backend future",
    nextSafeAction: "Do not introduce file writes.",
  },
] as const satisfies readonly RecoveryReadinessChecklistSeed[];

function resolveRequiredRecord<TRecord>(
  records: readonly TRecord[],
  selectId: (record: TRecord) => string,
  id: string,
  label: string
): TRecord {
  const record = records.find((candidate) => selectId(candidate) === id);

  if (!record) {
    throw new Error(`Missing ${label}: ${id}`);
  }

  return record;
}

function cloneList<T>(records: readonly T[]): readonly T[] {
  return [...records];
}

function buildReviewOnlySourceReference(
  prefix: string,
  reviewId: MinimalTextAdapterReviewId
): string {
  return `${prefix}:${reviewId}`;
}

export function buildStableMinimalTextAdapterReviewKey(
  reviewId: MinimalTextAdapterReviewId
): MinimalTextAdapterReviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-review:${reviewId}`;
}

export function buildStableTextAdapterOutputReviewKey(
  reviewId: MinimalTextAdapterReviewId
): MinimalTextAdapterOutputReviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-output-review:${reviewId}`;
}

export function buildStableTextAdapterGateFailureReviewKey(
  reviewId: MinimalTextAdapterReviewId,
  gateId: ReturnType<typeof listTextAdapterGates>[number]["id"]
): MinimalTextAdapterGateFailureReviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-gate-failure-review:${reviewId}:${gateId}`;
}

export function buildStableTextAdapterRecoveryPlanKey(
  reviewId: MinimalTextAdapterReviewId
): MinimalTextAdapterRecoveryPlanKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-recovery-plan:${reviewId}`;
}

export function buildStableTextAdapterRecoveryReadinessChecklistKey(
  reviewId: MinimalTextAdapterReviewId,
  checklistId: MinimalTextAdapterRecoveryReadinessChecklistId
): MinimalTextAdapterRecoveryReadinessChecklistKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-recovery-readiness:${reviewId}:${checklistId}`;
}

export function buildStableTextAdapterReviewAuditSummaryKey(
  reviewId: MinimalTextAdapterReviewId
): MinimalTextAdapterReviewAuditSummaryKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-review-audit-summary:${reviewId}`;
}

export function buildStableTextAdapterAcceptancePostureKey(
  reviewId: MinimalTextAdapterReviewId
): MinimalTextAdapterAcceptancePostureKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-acceptance-posture:${reviewId}`;
}

function buildSourceBundle(
  reviewId: MinimalTextAdapterReviewId
): TextAdapterReviewSourceBundle {
  return {
    routingPreviewRecord: resolveRequiredRecord(
      listAthenaModelRoutingPreviews(),
      (record) => record.id,
      reviewId,
      "routing preview record"
    ),
    endToEndPacketReviewRecord: resolveRequiredRecord(
      listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews(),
      (record) => record.id,
      reviewId,
      "synthetic end-to-end packet review record"
    ),
    acceptancePostureRecord: resolveRequiredRecord(
      listSyntheticEndToEndPacketAcceptancePostureRecords(),
      (record) => record.id,
      reviewId,
      "synthetic end-to-end packet acceptance posture record"
    ),
    auditSummaryRecord: resolveRequiredRecord(
      listSyntheticEndToEndPacketReviewAuditSummaries(),
      (record) => record.id,
      reviewId,
      "synthetic end-to-end packet audit summary record"
    ),
    manualApprovalDecisionReviewRecord: resolveRequiredRecord(
      listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews(),
      (record) => record.id,
      reviewId,
      "manual approval decision review record"
    ),
  };
}

function buildTextAdapterInputSourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterInputReference"] {
  if (reviewId === "conversational-planning-request") {
    return SOURCE_INPUT_RECORD.key;
  }

  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-input-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterInputReference"];
}

function buildTextAdapterAdmissionCheckSourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterAdmissionCheckReference"] {
  if (reviewId === "conversational-planning-request") {
    return SOURCE_ADMISSION_CHECK_RECORD.key;
  }

  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-admission-check-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterAdmissionCheckReference"];
}

function buildTextAdapterNormalizedRequestSourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterNormalizedRequestReference"] {
  if (reviewId === "conversational-planning-request") {
    return SOURCE_NORMALIZED_REQUEST_RECORD.key;
  }

  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-normalized-request-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterNormalizedRequestReference"];
}

function buildTextAdapterRedactedPromptEnvelopeSourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterRedactedPromptEnvelopeReference"] {
  if (reviewId === "conversational-planning-request") {
    return SOURCE_REDACTED_PROMPT_ENVELOPE_RECORD.key;
  }

  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-redacted-prompt-envelope-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterRedactedPromptEnvelopeReference"];
}

function buildTextAdapterDeterministicFixtureResponseSourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterDeterministicFixtureResponseReference"] {
  if (reviewId === "conversational-planning-request") {
    return SOURCE_FIXTURE_RESPONSE_RECORD.key;
  }

  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-deterministic-fixture-response-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterDeterministicFixtureResponseReference"];
}

function buildTextAdapterResponseEnvelopeSourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterResponseEnvelopeReference"] {
  if (reviewId === "conversational-planning-request") {
    return SOURCE_RESPONSE_ENVELOPE_RECORD.key;
  }

  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-response-envelope-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterResponseEnvelopeReference"];
}

function buildTextAdapterErrorEnvelopeSourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterErrorEnvelopeReference"] {
  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-error-envelope-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterErrorEnvelopeReference"];
}

function buildTextAdapterEvidencePreviewSourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterEvidencePreviewReference"] {
  if (reviewId === "conversational-planning-request") {
    return SOURCE_EVIDENCE_PREVIEW_RECORD.key;
  }

  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-evidence-preview-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterEvidencePreviewReference"];
}

function buildTextAdapterAuditPreviewSourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterAuditPreviewReference"] {
  if (reviewId === "conversational-planning-request") {
    return SOURCE_AUDIT_PREVIEW_RECORD.key;
  }

  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-audit-preview-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterAuditPreviewReference"];
}

function buildTextAdapterApprovalPreviewSourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterApprovalPreviewReference"] {
  if (reviewId === "conversational-planning-request") {
    return SOURCE_APPROVAL_PREVIEW_RECORD.key;
  }

  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-approval-preview-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterApprovalPreviewReference"];
}

function buildTextAdapterSafetyGateSummarySourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterSafetyGateSummaryReference"] {
  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-safety-gate-summary-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterSafetyGateSummaryReference"];
}

function buildTextAdapterBlockedLiveProviderSummarySourceReference(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterBlockedLiveProviderSummaryReference"] {
  if (reviewId === "conversational-planning-request") {
    return SOURCE_BLOCKED_LIVE_PROVIDER_SUMMARY_RECORD.key;
  }

  return buildReviewOnlySourceReference(
    "backend-owned-minimal-manual-gated-text-model-adapter-blocked-live-provider-summary-review-source",
    reviewId
  ) as BackendOwnedMinimalManualGatedTextAdapterReviewRecord["sourceTextAdapterBlockedLiveProviderSummaryReference"];
}

function buildReviewRecord(
  reviewId: MinimalTextAdapterReviewId
): BackendOwnedMinimalManualGatedTextAdapterReviewRecord {
  const source = buildSourceBundle(reviewId);

  return {
    id: reviewId,
    key: buildStableMinimalTextAdapterReviewKey(reviewId),
    reviewVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-review-preview-v1",
    source: REVIEW_SOURCE,
    reviewMode: REVIEW_MODE,
    reviewPosture: REVIEW_POSTURE,
    previewOnlyStatement: "minimal text adapter review is preview-only",
    requestLabel: source.routingPreviewRecord.operatorGoalLabel,
    label: source.routingPreviewRecord.operatorGoalLabel,
    operatorRequestPhrase: source.routingPreviewRecord.operatorRequestPhrase,
    workspaceTarget: source.endToEndPacketReviewRecord.workspaceTarget,
    sourceMinimalTextAdapterMvpReference: SOURCE_MVP_RECORD.key,
    sourceTextAdapterInputReference:
      buildTextAdapterInputSourceReference(reviewId),
    sourceTextAdapterAdmissionCheckReference:
      buildTextAdapterAdmissionCheckSourceReference(reviewId),
    sourceTextAdapterNormalizedRequestReference:
      buildTextAdapterNormalizedRequestSourceReference(reviewId),
    sourceTextAdapterRedactedPromptEnvelopeReference:
      buildTextAdapterRedactedPromptEnvelopeSourceReference(reviewId),
    sourceTextAdapterDeterministicFixtureResponseReference:
      buildTextAdapterDeterministicFixtureResponseSourceReference(reviewId),
    sourceTextAdapterResponseEnvelopeReference:
      buildTextAdapterResponseEnvelopeSourceReference(reviewId),
    sourceTextAdapterErrorEnvelopeReference:
      buildTextAdapterErrorEnvelopeSourceReference(reviewId),
    sourceTextAdapterEvidencePreviewReference:
      buildTextAdapterEvidencePreviewSourceReference(reviewId),
    sourceTextAdapterAuditPreviewReference:
      buildTextAdapterAuditPreviewSourceReference(reviewId),
    sourceTextAdapterApprovalPreviewReference:
      buildTextAdapterApprovalPreviewSourceReference(reviewId),
    sourceTextAdapterSafetyGateSummaryReference:
      buildTextAdapterSafetyGateSummarySourceReference(reviewId),
    sourceTextAdapterBlockedLiveProviderSummaryReference:
      buildTextAdapterBlockedLiveProviderSummarySourceReference(reviewId),
    sourceSyntheticEndToEndPacketReviewReference:
      source.endToEndPacketReviewRecord.key,
    sourceSyntheticEndToEndPacketAcceptancePostureReference:
      source.acceptancePostureRecord.key,
    sourceSyntheticEndToEndPacketAuditSummaryReference:
      source.auditSummaryRecord.key,
    sourceManualApprovalDecisionReviewReference:
      source.manualApprovalDecisionReviewRecord.key,
    selectedCapabilityFamily:
      source.manualApprovalDecisionReviewRecord.selectedCapabilityFamily,
    providerSlotLabel: source.manualApprovalDecisionReviewRecord.providerSlotLabel,
    backupProviderSlotLabel:
      source.manualApprovalDecisionReviewRecord.backupProviderSlotLabel,
    localPrivateAlternativeLabel:
      source.manualApprovalDecisionReviewRecord.localPrivateAlternativeLabel,
    serverOnlyTextAdapterHelperState: "exists",
    textAdapterState: "completed-text-adapter-fixture-only",
    deterministicFixtureResponseState: "produced in memory only",
    redactedPromptEnvelopeState: "preview-only",
    promptTransmissionState: "not sent",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    providerSdkImportState: "not imported",
    providerExecutionState: "blocked",
    providerResponseState: "not received",
    modelCallState: "not called",
    modelOutputState: "not generated",
    queueDispatchState: "not dispatched",
    workerDispatchState: "not dispatched",
    jobExecutionState: "not executed",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    auditPreviewState: "preview-only",
    approvalPreviewState: "preview-only",
    resultReferenceState: "preview-only / not persisted",
    auditReferenceState: "preview-only / not persisted",
    approvalReferenceState: "preview-only / not persisted",
    evidencePacketState: "preview-only / not persisted",
    killSwitchState: "inactive fixture only",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    nextTextAdapterResultCaptureMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
    currentReadiness: CURRENT_READINESS,
    operatorFacingExplanation:
      `${source.routingPreviewRecord.operatorGoalLabel} can now be reviewed through Athena as a backend-only, fixture-only, preview-only text adapter case. The server-only helper still returns deterministic in-memory fixture output, sends prompts to no provider, calls no model, imports no provider SDK, stores nothing, and remains unreachable from the frontend.`,
  };
}

const REVIEW_RECORDS = listAthenaModelRoutingPreviews().map((preview) =>
  buildReviewRecord(preview.id)
);

function buildOutputReviewRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterReviewRecord
): MinimalTextAdapterOutputReviewRecord {
  return {
    id: review.id,
    key: buildStableTextAdapterOutputReviewKey(review.id),
    outputReviewVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-output-review-preview-v1",
    textAdapterReviewId: review.id,
    sourceDeterministicFixtureResponseReference:
      review.sourceTextAdapterDeterministicFixtureResponseReference,
    sourceResponseEnvelopeReference:
      review.sourceTextAdapterResponseEnvelopeReference,
    sourceRedactedPromptEnvelopeReference:
      review.sourceTextAdapterRedactedPromptEnvelopeReference,
    adapterState: "completed-text-adapter-fixture-only",
    adapterIdPosture: "deterministic preview id only",
    requestIdPosture: "deterministic preview id only",
    responseIdPosture: "deterministic preview id only",
    digestPosture: "deterministic preview digest only",
    promptTransmissionState: "not sent",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    outputClassification: "deterministic fixture only",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    operatorFacingExplanation:
      `${review.requestLabel} still resolves to a deterministic fixture response preview only. No provider output is received, no model output is generated, and no result, audit, or approval reference is persisted.`,
    remainingBlockers: [
      "no frontend request",
      "no API route",
      "no prompt sending",
      "no model calls",
      "no provider SDK imports",
      "no provider execution",
      "no result persistence",
      "no audit persistence",
      "no approval persistence",
    ],
    nextSafeAction:
      `Keep ${review.requestLabel} output review preview-only and carry the next backend step into ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH}.`,
    explicitFixtureResponseOnlyNoRealOutputNoProviderCallNoPersistenceStatement:
      OUTPUT_ONLY_STATEMENT,
  };
}

const OUTPUT_REVIEW_RECORDS = REVIEW_RECORDS.map(buildOutputReviewRecord);

function buildGateFailureReviewRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterReviewRecord,
  gate: ReturnType<typeof listTextAdapterGates>[number]
): MinimalTextAdapterGateFailureReviewRecord {
  const seed = GATE_FAILURE_SEEDS.get(gate.id);

  if (!seed) {
    throw new Error(`Missing text adapter gate failure seed for ${gate.id}.`);
  }

  return {
    id: review.id,
    key: buildStableTextAdapterGateFailureReviewKey(review.id, gate.id),
    gateFailureReviewVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-gate-failure-review-preview-v1",
    textAdapterReviewId: review.id,
    failedGateId: gate.id,
    failedGateLabel: gate.label.toLowerCase(),
    gateState: gate.currentState,
    severity: seed.severity,
    affectedCapabilityFamily: review.selectedCapabilityFamily.label,
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation:
      `${review.requestLabel} remains blocked at ${gate.label.toLowerCase()} because the text adapter review layer must stay backend-only, fixture-only, preview-only, and detached from live provider or persistence behavior.`,
    requiredEvidenceToUnblock: seed.requiredEvidenceToUnblock,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    resultCaptureMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
    nextSafeAction:
      `Keep ${gate.label.toLowerCase()} enforced and carry its evidence forward into ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH}.`,
    explicitNoLiveGatePassStatement: NO_LIVE_GATE_PASS_STATEMENT,
  };
}

const GATE_FAILURE_REVIEW_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  TEXT_ADAPTER_GATE_RECORDS.map((gate) =>
    buildGateFailureReviewRecord(review, gate)
  )
);

function buildRecoveryPlanRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterReviewRecord
): MinimalTextAdapterRecoveryPlanPreviewRecord {
  return {
    id: review.id,
    key: buildStableTextAdapterRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-recovery-plan-preview-v1",
    textAdapterReviewId: review.id,
    recoveryPosture: "manual review only",
    serverOnlyTextAdapterHelperRecovery:
      "Keep the server-only text adapter helper deterministic, review-safe, and backend-only.",
    textAdapterInputRecovery:
      "Keep text adapter input typed, deterministic, and detached from frontend requests and API routes.",
    adapterAdmissionCheckRecovery:
      "Keep admission checks deterministic, typed, and fixture-only.",
    normalizedRequestRecovery:
      "Keep normalized requests limited to redacted preview-only intent packaging.",
    redactedPromptEnvelopeRecovery:
      "Keep the redacted prompt envelope preview-only and never transmit it.",
    deterministicFixtureResponseRecovery:
      "Keep deterministic fixture responses in memory only and never treat them as provider output.",
    responseEnvelopeRecovery:
      "Keep the response envelope limited to preview references and blocked live actions.",
    errorEnvelopeRecovery:
      "Keep error envelopes deterministic, preview-only, and retry-free.",
    providerBoundaryRecovery:
      "Do not import provider SDKs or connect provider execution.",
    promptBoundaryRecovery:
      "Keep prompt sending absent.",
    modelBoundaryRecovery:
      "Keep model invocation absent.",
    frontendRequestBoundaryRecovery:
      "Do not create a frontend request path for the text adapter review.",
    apiRouteBoundaryRecovery:
      "Do not create an API route for the text adapter helper.",
    queueDispatchBlockedRecovery: "Keep queue dispatch blocked.",
    workerDispatchBlockedRecovery: "Keep worker dispatch blocked.",
    jobExecutionBlockedRecovery: "Keep job execution blocked.",
    resultPersistenceMissingRecovery: "Keep result persistence unimplemented.",
    auditPersistenceMissingRecovery: "Keep audit persistence unimplemented.",
    approvalPersistenceMissingRecovery:
      "Keep approval persistence unimplemented.",
    databaseWriteBlockedRecovery: "Keep database writes absent.",
    fileWriteBlockedRecovery: "Keep file writes absent.",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    operatorActionRequired:
      `Review ${review.requestLabel} manually and keep the text adapter review preview-only until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH} defines the next safe backend-owned capture boundary.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
    explicitNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement:
      NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_PERSISTENCE_STATEMENT,
  };
}

const RECOVERY_PLAN_PREVIEW_RECORDS = REVIEW_RECORDS.map(buildRecoveryPlanRecord);

function buildRecoveryReadinessChecklistRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterReviewRecord,
  seed: RecoveryReadinessChecklistSeed
): MinimalTextAdapterRecoveryReadinessChecklistRecord {
  return {
    id: review.id,
    key: buildStableTextAdapterRecoveryReadinessChecklistKey(
      review.id,
      seed.checklistId
    ),
    checklistVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-recovery-readiness-checklist-v1",
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    resultCaptureMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

const RECOVERY_READINESS_CHECKLIST_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  RECOVERY_READINESS_CHECKLIST_SEEDS.map((seed) =>
    buildRecoveryReadinessChecklistRecord(review, seed)
  )
);

function buildReviewGateSummary(reviewId: MinimalTextAdapterReviewId): string {
  return GATE_FAILURE_REVIEW_RECORDS.filter(
    (record) => record.textAdapterReviewId === reviewId
  )
    .slice(0, 10)
    .map((record) => record.failedGateLabel)
    .join(" | ");
}

function buildReviewAuditSummaryRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterReviewRecord
): MinimalTextAdapterReviewAuditSummaryRecord {
  return {
    id: review.id,
    key: buildStableTextAdapterReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-review-audit-summary-preview-v1",
    textAdapterReviewId: review.id,
    auditPosture: "preview-only",
    adapterReferenceState: "preview-only / not persisted",
    requestReferenceState: "preview-only / not persisted",
    responseReferenceState: "preview-only / not persisted",
    auditReferenceState: "preview-only / not persisted",
    approvalReferenceState: "preview-only / not persisted",
    evidencePacketState: "preview-only",
    serverOnlyAdapterHelperEvidenceSummary:
      "server-only text adapter helper exists and remains backend-only.",
    deterministicFixtureResponseEvidenceSummary:
      "text adapter output is deterministic fixture output only and remains in memory only.",
    redactedPromptEvidenceSummary:
      "redacted prompt envelope is preview-only and prompt transmission state is not sent.",
    failedGateSummary: buildReviewGateSummary(review.id),
    recoverySummary:
      "Recovery remains manual review only with retry disabled and fallback disabled.",
    blockedActionSummary:
      "No frontend request. No API route. No prompt sending. No model calls. No provider execution. No result persistence.",
    noProviderOutputStatement: "No provider output.",
    noModelOutputStatement: "No model output.",
    noPromptSendingStatement: "No prompt sending.",
    noResultPersistenceStatement: "No result persistence.",
    noAuditPersistenceStatement: "No audit persistence.",
    noApprovalPersistenceStatement: "No approval persistence.",
    noDatabaseWriteStatement: "No database write.",
    noFileWriteStatement: "No file write.",
    textAdapterResultCaptureMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
  };
}

const REVIEW_AUDIT_SUMMARY_RECORDS = REVIEW_RECORDS.map(
  buildReviewAuditSummaryRecord
);

function buildAcceptancePostureRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterReviewRecord
): MinimalTextAdapterAcceptancePostureRecord {
  return {
    id: review.id,
    key: buildStableTextAdapterAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-acceptance-posture-preview-v1",
    textAdapterReviewId: review.id,
    acceptanceState: ACCEPTANCE_STATE,
    fixtureOnlyAcceptanceSummary:
      `${review.requestLabel} is accepted only as deterministic fixture review output.`,
    backendOnlyAcceptanceSummary:
      "The text adapter remains backend-only and not frontend-callable.",
    serverOnlyAcceptanceSummary:
      "The server-only helper exists and remains the only execution surface.",
    redactedPromptAcceptanceSummary:
      "The redacted prompt envelope is accepted only as preview-only evidence and is never sent.",
    providerBlockers: [
      "no provider SDK imports",
      "no provider execution",
      "provider response is not received",
      "text adapter is not provider-capable yet",
    ],
    promptBlockers: [
      "redacted prompt envelope is preview-only",
      "prompt transmission state is not sent",
      "no prompt sending",
    ],
    modelBlockers: [
      "no LLM/model calls",
      "model output is not generated",
      "model call state is not called",
    ],
    queueWorkerJobBlockers: [
      "no queue dispatch",
      "no worker dispatch",
      "no job execution",
    ],
    resultPersistenceBlockers: [
      "no result persistence",
      "result reference state is preview-only / not persisted",
    ],
    auditPersistenceBlockers: [
      "no audit persistence",
      "audit reference state is preview-only / not persisted",
    ],
    approvalPersistenceBlockers: [
      "no approval persistence",
      "approval reference state is preview-only / not persisted",
    ],
    databaseFileBlockers: [
      "no database writes",
      "no file writes",
    ],
    approvalBlockers: [
      "no real approval request",
      "no real approval recording",
      "approval fixture is preview-only",
      "approval token is not issued",
      "approval lease is not created",
    ],
    auditBlockers: [
      "audit preview is preview-only",
      "no audit persistence",
    ],
    requiredEvidence: [
      "server-only text adapter helper exists",
      "text adapter output is deterministic fixture output only",
      "redacted prompt envelope is preview-only",
      "prompt transmission state is not sent",
      "Backend-owned minimal synthetic end-to-end packet review remains available",
    ],
    nextSafeAction:
      `Keep ${review.requestLabel} in preview-only review posture and move the next backend step to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH}.`,
    explicitTextAdapterFixtureAcceptedLiveProviderExecutionNotAcceptedStatement:
      ACCEPTANCE_STATEMENT,
  };
}

const ACCEPTANCE_POSTURE_RECORDS = REVIEW_RECORDS.map(
  buildAcceptancePostureRecord
);

export function listBackendOwnedMinimalManualGatedTextModelAdapterReviews():
  readonly BackendOwnedMinimalManualGatedTextAdapterReviewRecord[] {
  return cloneList(REVIEW_RECORDS);
}

export function listTextAdapterOutputReviewRecords():
  readonly MinimalTextAdapterOutputReviewRecord[] {
  return cloneList(OUTPUT_REVIEW_RECORDS);
}

export function listTextAdapterGateFailureReviewRecords():
  readonly MinimalTextAdapterGateFailureReviewRecord[] {
  return cloneList(GATE_FAILURE_REVIEW_RECORDS);
}

export function listTextAdapterRecoveryPlanPreviews():
  readonly MinimalTextAdapterRecoveryPlanPreviewRecord[] {
  return cloneList(RECOVERY_PLAN_PREVIEW_RECORDS);
}

export function listTextAdapterRecoveryReadinessChecklistRecords():
  readonly MinimalTextAdapterRecoveryReadinessChecklistRecord[] {
  return cloneList(RECOVERY_READINESS_CHECKLIST_RECORDS);
}

export function listTextAdapterReviewAuditSummaries():
  readonly MinimalTextAdapterReviewAuditSummaryRecord[] {
  return cloneList(REVIEW_AUDIT_SUMMARY_RECORDS);
}

export function listTextAdapterAcceptancePostureRecords():
  readonly MinimalTextAdapterAcceptancePostureRecord[] {
  return cloneList(ACCEPTANCE_POSTURE_RECORDS);
}

export function groupTextAdapterReviewsByCapabilityFamily():
  readonly MinimalTextAdapterReviewCapabilityFamilyGroup[] {
  const groups = new Map<
    MinimalTextAdapterReviewCapabilityFamilyGroup["capabilityFamilyId"],
    BackendOwnedMinimalManualGatedTextAdapterReviewRecord[]
  >();

  for (const review of REVIEW_RECORDS) {
    const key = review.selectedCapabilityFamily.id;
    const existing = groups.get(key) ?? [];
    existing.push(review);
    groups.set(key, existing);
  }

  return [...groups.entries()].map(([capabilityFamilyId, reviews]) => ({
    capabilityFamilyId,
    capabilityFamilyLabel: reviews[0].selectedCapabilityFamily.label,
    reviewCount: reviews.length,
    reviews: cloneList(reviews),
  }));
}

export function groupTextAdapterReviewsByWorkspaceTarget():
  readonly MinimalTextAdapterReviewWorkspaceGroup[] {
  const groups = new Map<
    MinimalTextAdapterReviewWorkspaceGroup["workspaceTarget"],
    BackendOwnedMinimalManualGatedTextAdapterReviewRecord[]
  >();

  for (const review of REVIEW_RECORDS) {
    const key = review.workspaceTarget;
    const existing = groups.get(key) ?? [];
    existing.push(review);
    groups.set(key, existing);
  }

  return [...groups.entries()].map(([workspaceTarget, reviews]) => ({
    workspaceTarget,
    reviewCount: reviews.length,
    reviews: cloneList(reviews),
  }));
}

export function buildTextAdapterReviewSummary():
  MinimalTextAdapterReviewSummary {
  const capabilityGroups = groupTextAdapterReviewsByCapabilityFamily();
  const workspaceGroups = groupTextAdapterReviewsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
    reviewCount: REVIEW_RECORDS.length,
    outputReviewCount: OUTPUT_REVIEW_RECORDS.length,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    auditSummaryCount: REVIEW_AUDIT_SUMMARY_RECORDS.length,
    acceptancePostureCount: ACCEPTANCE_POSTURE_RECORDS.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    currentReadiness: CURRENT_READINESS,
    acceptanceState: ACCEPTANCE_STATE,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildTextAdapterOutputReviewSummary():
  MinimalTextAdapterOutputReviewSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
    outputReviewCount: OUTPUT_REVIEW_RECORDS.length,
    summaryLines: cloneList(OUTPUT_REVIEW_SUMMARY_LINES),
    nextSafeAction:
      `Keep output review preview-only and move the next backend step to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH}.`,
  };
}

export function buildTextAdapterGateFailureSummary():
  MinimalTextAdapterGateFailureSummary {
  const topFailedGateLabels = [...new Set(
    GATE_FAILURE_REVIEW_RECORDS.map((record) => record.failedGateLabel)
  )];

  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    topFailedGateLabels: cloneList(topFailedGateLabels),
    nextSafeAction:
      `Keep live gates blocked and carry the evidence forward into ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH}.`,
  };
}

export function buildTextAdapterRecoverySummary():
  MinimalTextAdapterRecoverySummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextSafeAction:
      `Keep recovery manual-review-only and carry the next backend step to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH}.`,
  };
}

export function buildMinimalTextAdapterResultCaptureMvpChecklist():
  MinimalTextAdapterResultCaptureMvpChecklist {
  return cloneList(MINIMAL_TEXT_ADAPTER_RESULT_CAPTURE_MVP_CHECKLIST_LINES);
}

export function buildUniqueMinimalTextAdapterReviewDisplayStrings(
  values: readonly string[]
): MinimalTextAdapterReviewDisplayStrings {
  return cloneList([...new Set(values)]);
}
