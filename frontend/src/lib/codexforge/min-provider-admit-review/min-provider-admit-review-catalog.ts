import {
  listMinimalManualGatedProviderAdapterDryRunAdmissionMvpRecords,
  listProviderDryRunAdmissionChecks,
  listProviderDryRunAdmissionEnvelopes,
  listProviderDryRunAdmissionOutputs,
  listProviderDryRunAdmissionReadinessMatrixRecords,
  listProviderDryRunAdmissionInputs,
  listProviderDryRunApprovalPreviews,
  listProviderDryRunAuditPreviews,
  listProviderDryRunBlockedExecutionSummaries,
  listProviderDryRunEvidencePreviews,
  listProviderDryRunIntentPreviews,
  listProviderDryRunSafetyGateSummaries,
} from "../min-provider-admit/min-provider-admit-catalog";
import type {
  ProviderDryRunAdmissionGateId,
  ProviderDryRunAdmissionMvpId,
} from "../min-provider-admit/min-provider-admit-types";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews,
  listProviderSelectionAcceptancePostureRecords,
  listProviderSelectionReviewAuditSummaries,
} from "../min-provider-review/min-provider-review-catalog";
import type { ProviderSelectionCredentialReferenceReviewId } from "../min-provider-review/min-provider-review-types";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
  type ProviderAdapterDryRunExecutionMvpChecklist,
  type ProviderDryRunAdmissionAcceptancePostureKey,
  type ProviderDryRunAdmissionAcceptancePostureRecord,
  type ProviderDryRunAdmissionAcceptancePostureVersion,
  type ProviderDryRunAdmissionAcceptanceState,
  type ProviderDryRunAdmissionAcceptanceStatement,
  type ProviderDryRunAdmissionAuditPosture,
  type ProviderDryRunAdmissionCredentialReferenceAuditState,
  type ProviderDryRunAdmissionCurrentPosture,
  type ProviderDryRunAdmissionEvidencePacketState,
  type ProviderDryRunAdmissionFallbackPosture,
  type ProviderDryRunAdmissionFixtureOnlyStatement,
  type ProviderDryRunAdmissionGateFailureReviewKey,
  type ProviderDryRunAdmissionGateFailureReviewRecord,
  type ProviderDryRunAdmissionGateFailureReviewVersion,
  type ProviderDryRunAdmissionGateFailureSummary,
  type ProviderDryRunAdmissionGateFailureSummaryVersion,
  type ProviderDryRunAdmissionNoLiveGatePassStatement,
  type ProviderDryRunAdmissionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement,
  type ProviderDryRunAdmissionOutputReviewKey,
  type ProviderDryRunAdmissionOutputReviewRecord,
  type ProviderDryRunAdmissionOutputReviewSummary,
  type ProviderDryRunAdmissionOutputReviewSummaryVersion,
  type ProviderDryRunAdmissionOutputReviewVersion,
  type ProviderDryRunAdmissionRecoveryPlanKey,
  type ProviderDryRunAdmissionRecoveryPlanPreviewRecord,
  type ProviderDryRunAdmissionRecoveryPlanVersion,
  type ProviderDryRunAdmissionRecoveryPosture,
  type ProviderDryRunAdmissionRecoveryReadinessChecklistId,
  type ProviderDryRunAdmissionRecoveryReadinessChecklistKey,
  type ProviderDryRunAdmissionRecoveryReadinessChecklistLabel,
  type ProviderDryRunAdmissionRecoveryReadinessChecklistRecord,
  type ProviderDryRunAdmissionRecoveryReadinessChecklistVersion,
  type ProviderDryRunAdmissionRecoveryReadinessOwner,
  type ProviderDryRunAdmissionRecoveryReadinessState,
  type ProviderDryRunAdmissionRecoverySummary,
  type ProviderDryRunAdmissionRecoverySummaryVersion,
  type ProviderDryRunAdmissionRetryPosture,
  type ProviderDryRunAdmissionReviewAuditSummaryKey,
  type ProviderDryRunAdmissionReviewAuditSummaryRecord,
  type ProviderDryRunAdmissionReviewAuditSummaryVersion,
  type ProviderDryRunAdmissionReviewCapabilityFamilyGroup,
  type ProviderDryRunAdmissionReviewCredentialReferenceGroup,
  type ProviderDryRunAdmissionReviewCurrentReadiness,
  type ProviderDryRunAdmissionReviewId,
  type ProviderDryRunAdmissionReviewKey,
  type ProviderDryRunAdmissionReviewMode,
  type ProviderDryRunAdmissionReviewPosture,
  type ProviderDryRunAdmissionReviewProviderSlotGroup,
  type ProviderDryRunAdmissionReviewRecord,
  type ProviderDryRunAdmissionReviewRequestLabel,
  type ProviderDryRunAdmissionReviewSeverity,
  type ProviderDryRunAdmissionReviewSource,
  type ProviderDryRunAdmissionReviewSummary,
  type ProviderDryRunAdmissionReviewSummaryVersion,
  type ProviderDryRunAdmissionReviewVersion,
  type ProviderDryRunAdmissionIntentAuditState,
} from "./min-provider-admit-review-types";

type ProviderDryRunAdmissionReviewSeed = Readonly<{
  reviewId: ProviderDryRunAdmissionReviewId;
  requestLabel: ProviderDryRunAdmissionReviewRequestLabel;
  selectedCapabilityFamily: "text/chat" | "planning/reasoning";
  providerSlotLabel:
    | "OpenAI-compatible text provider dry-run slot"
    | "Anthropic-compatible text provider dry-run slot"
    | "Gemini-compatible text provider dry-run slot"
    | "local/private text provider dry-run slot"
    | "fallback disabled dry-run slot";
  backupProviderSlotLabel:
    | "OpenAI-compatible text provider dry-run slot"
    | "Anthropic-compatible text provider dry-run slot"
    | "Gemini-compatible text provider dry-run slot"
    | "local/private text provider dry-run slot"
    | "fallback disabled dry-run slot";
  sourceMvpStableId: ProviderDryRunAdmissionMvpId;
  sourceProviderSelectionReviewId: ProviderSelectionCredentialReferenceReviewId;
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
}>;

type GateFailureSeed = Readonly<{
  gateId: ProviderDryRunAdmissionGateId;
  label: string;
  severity: ProviderDryRunAdmissionReviewSeverity;
  requiredEvidence: string;
  recoveryAction: string;
}>;

type ReadinessChecklistSeed = Readonly<{
  checklistId: ProviderDryRunAdmissionRecoveryReadinessChecklistId;
  label: ProviderDryRunAdmissionRecoveryReadinessChecklistLabel;
  state: ProviderDryRunAdmissionRecoveryReadinessState;
  severity: ProviderDryRunAdmissionReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ProviderDryRunAdmissionRecoveryReadinessOwner;
  nextSafeAction: string;
}>;

const REVIEW_SOURCE: ProviderDryRunAdmissionReviewSource =
  "Athena / Jarvis Model Gateway";
const REVIEW_MODE: ProviderDryRunAdmissionReviewMode = "preview-only";
const REVIEW_POSTURE: ProviderDryRunAdmissionReviewPosture =
  "minimal provider dry-run admission review / backend-only / admission-only / credential-reference-only / fixture-only / not-provider-executing / not persistent";
const CURRENT_READINESS: ProviderDryRunAdmissionReviewCurrentReadiness =
  "minimal-provider-dry-run-admission-review-only / backend-only / admission-only / credential-reference-only / fixture-only / not-provider-executing / not persistent";
const RECOVERY_POSTURE: ProviderDryRunAdmissionRecoveryPosture =
  "manual review only";
const RETRY_POSTURE: ProviderDryRunAdmissionRetryPosture = "disabled";
const FALLBACK_POSTURE: ProviderDryRunAdmissionFallbackPosture = "disabled";
const AUDIT_POSTURE: ProviderDryRunAdmissionAuditPosture = "preview-only";
const ACCEPTANCE_STATE: ProviderDryRunAdmissionAcceptanceState =
  "not accepted for live provider execution / provider dry-run admission fixture MVP accepted only";
const FIXTURE_ONLY_STATEMENT: ProviderDryRunAdmissionFixtureOnlyStatement =
  "Dry-run admission fixture only. No secret read. No provider call. No persistence.";
const NO_LIVE_GATE_PASS_STATEMENT: ProviderDryRunAdmissionNoLiveGatePassStatement =
  "No live gate pass.";
const NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT: ProviderDryRunAdmissionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence.";
const ACCEPTANCE_STATEMENT: ProviderDryRunAdmissionAcceptanceStatement =
  "Provider dry-run admission fixture accepted only. Live provider execution not accepted.";
const CURRENT_POSTURE: ProviderDryRunAdmissionCurrentPosture = "preview-only";
const EVIDENCE_PACKET_STATE: ProviderDryRunAdmissionEvidencePacketState =
  "preview-only / not persisted";
const ADMISSION_REFERENCE_STATE = "preview-only / not persisted" as const;
const PROVIDER_SLOT_REFERENCE_STATE = "preview-only / not persisted" as const;
const CREDENTIAL_REFERENCE_AUDIT_STATE: ProviderDryRunAdmissionCredentialReferenceAuditState =
  "opaque label only / not persisted";
const INTENT_AUDIT_STATE: ProviderDryRunAdmissionIntentAuditState =
  "preview-only / not executed";

const REVIEW_SUMMARY_LINES = [
  "backend-owned minimal manual-gated provider adapter dry-run admission review and recovery preview only",
  "provider adapter dry-run admission review is preview-only",
  "server-only provider dry-run admission helper exists",
  "provider dry-run admission is deterministic fixture-only",
  "dry-run intent is preview-only",
  "dry-run execution is blocked",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "backup provider slot is preview-only",
  "local/private alternative is preview-only",
  "provider adapter dry-run admission is not provider-executing yet",
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
  "backend-owned minimal manual-gated provider adapter dry-run execution MVP next",
] as const;

const OUTPUT_REVIEW_SUMMARY_LINES = [
  "Provider adapter dry-run admission output review",
  "admission state: admitted-for-backend-dry-run-preview-only or blocked-for-backend-dry-run-preview-only",
  "admission mode: deterministic-fixture-only",
  "dry-run execution state: blocked",
  "provider dry-run admission id posture: deterministic preview id only",
  "provider slot id posture: deterministic preview id only",
  "credential reference id posture: deterministic opaque reference id only",
  "admission digest posture: deterministic preview digest only",
  "selected provider slot posture: preview-only",
  "backup provider slot posture: preview-only",
  "local/private alternative posture: preview-only",
  "credential reference posture: opaque-reference-only",
  "output classification: deterministic dry-run admission fixture only",
  "result persistence state: not implemented",
  "audit persistence state: not implemented",
  "approval persistence state: not implemented",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only dry-run admission module boundary",
  "provider dry-run admission fixture mode",
  "provider selection credential reference review dependency",
  "credential reference opaque-only mode",
  "deterministic dry-run admission id",
  "deterministic provider slot id",
  "deterministic credential reference id",
  "deterministic admission digest",
  "supported capability family",
  "selected provider slot preview-only",
  "backup provider slot preview-only",
  "local/private alternative preview-only",
  "dry-run intent preview-only",
  "dry-run execution blocked",
  "credential value absent",
  "credential value not read",
  "env vars not read",
  "provider key not read",
  "redacted prompt envelope present",
  "prompt not sent",
  "provider SDK not imported",
  "provider response not received",
  "model output not generated",
  "manual approval fixture",
  "manual confirmation fixture",
  "in-memory only admission reference",
  "no real approval request",
  "no real approval recording",
  "no approval token issuance",
  "no approval lease issuance",
  "no frontend request",
  "no API route",
  "no fetch/network",
  "no provider SDK import",
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
  "Provider adapter dry-run admission recovery plan",
  "Provider adapter dry-run admission recovery readiness",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "provider adapter dry-run execution MVP comes next",
  NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT,
] as const;

const DRY_RUN_EXECUTION_MVP_CHECKLIST_LINES = [
  "Review backend-owned minimal provider adapter dry-run admission review records before any execution path is added.",
  "Keep the server-only provider dry-run admission helper deterministic, fixture-only, admission-only, credential-reference-only, backend-only, and non-persistent.",
  "Do not add credential value reads, env var reads, provider key reads, provider SDK imports, prompt sending, model calls, provider execution, or plugin execution.",
  "Do not add frontend requests, API routes, network calls, queue dispatch, worker dispatch, job execution, result persistence, audit persistence, approval persistence, database writes, or file writes.",
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH,
] as const satisfies ProviderAdapterDryRunExecutionMvpChecklist;

const REVIEW_SEEDS = [
  {
    reviewId: "conversational-planning-request",
    requestLabel: "conversational planning request",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "Gemini-compatible text provider dry-run slot",
    backupProviderSlotLabel: "OpenAI-compatible text provider dry-run slot",
    sourceMvpStableId: "planning-reasoning-provider-dry-run-admission",
    sourceProviderSelectionReviewId: "conversational-planning-request",
    operatorFacingExplanation:
      "Athena can now review conversational planning admission posture as a backend-owned preview packet before any execution path exists.",
    remainingBlockers: [
      "dry-run execution remains blocked",
      "provider execution remains blocked",
      "result persistence remains blocked",
    ],
    nextSafeAction:
      "Use the review packet to confirm planning posture before the backend-owned dry-run execution MVP.",
  },
  {
    reviewId: "code-assistance-request",
    requestLabel: "code assistance request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "OpenAI-compatible text provider dry-run slot",
    backupProviderSlotLabel: "Anthropic-compatible text provider dry-run slot",
    sourceMvpStableId: "text-chat-provider-dry-run-admission",
    sourceProviderSelectionReviewId: "code-assistance-request",
    operatorFacingExplanation:
      "Jarvis can now review code assistance admission posture with opaque credential labels only and no provider-side activity.",
    remainingBlockers: [
      "frontend request creation remains blocked",
      "API route creation remains blocked",
      "prompt transmission remains blocked",
    ],
    nextSafeAction:
      "Keep code assistance admission review preview-only until the server-only execution MVP exists.",
  },
  {
    reviewId: "website-copy-code-request",
    requestLabel: "website copy/code request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "Anthropic-compatible text provider dry-run slot",
    backupProviderSlotLabel: "Gemini-compatible text provider dry-run slot",
    sourceMvpStableId: "text-chat-provider-dry-run-admission",
    sourceProviderSelectionReviewId: "website-copy-code-request",
    operatorFacingExplanation:
      "Athena can now explain website copy/code admission posture across selected and backup preview slots without reading secrets or calling a model.",
    remainingBlockers: [
      "model calls remain blocked",
      "provider SDK imports remain blocked",
      "audit persistence remains blocked",
    ],
    nextSafeAction:
      "Use the website copy/code review packet to verify slot posture before any backend execution slice.",
  },
  {
    reviewId: "audit-recovery-explanation-request",
    requestLabel: "audit/recovery explanation request",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "local/private text provider dry-run slot",
    backupProviderSlotLabel: "fallback disabled dry-run slot",
    sourceMvpStableId: "planning-reasoning-provider-dry-run-admission",
    sourceProviderSelectionReviewId: "audit-recovery-explanation-request",
    operatorFacingExplanation:
      "Athena can now review a local/private alternative and recovery posture without turning that alternative into an executable provider path.",
    remainingBlockers: [
      "queue dispatch remains blocked",
      "worker dispatch remains blocked",
      "job execution remains blocked",
    ],
    nextSafeAction:
      "Use the recovery preview to keep manual review explicit before any execution work begins.",
  },
  {
    reviewId: "fallback-disabled-request",
    requestLabel: "fallback disabled request",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "fallback disabled dry-run slot",
    backupProviderSlotLabel: "local/private text provider dry-run slot",
    sourceMvpStableId: "planning-reasoning-provider-dry-run-admission",
    sourceProviderSelectionReviewId: "fallback-disabled-request",
    operatorFacingExplanation:
      "Athena can now show that fallback stays disabled in the dry-run admission review layer instead of silently swapping providers.",
    remainingBlockers: [
      "fallback remains disabled",
      "retry remains disabled",
      "dry-run execution is still not implemented",
    ],
    nextSafeAction:
      "Keep fallback disabled and move next to the backend-owned dry-run execution MVP only.",
  },
] as const satisfies readonly ProviderDryRunAdmissionReviewSeed[];

const GATE_FAILURE_SEEDS = [
  ["backend-only-boundary", "backend-only boundary"],
  [
    "server-only-dry-run-admission-module-boundary",
    "server-only dry-run admission module boundary",
  ],
  [
    "provider-dry-run-admission-fixture-mode",
    "provider dry-run admission fixture mode",
  ],
  [
    "provider-selection-credential-reference-review-dependency",
    "provider selection credential reference review dependency",
  ],
  [
    "credential-reference-opaque-only-mode",
    "credential reference opaque-only mode",
  ],
  [
    "deterministic-provider-dry-run-admission-id",
    "deterministic dry-run admission id",
  ],
  ["deterministic-provider-slot-id", "deterministic provider slot id"],
  [
    "deterministic-credential-reference-id",
    "deterministic credential reference id",
  ],
  ["deterministic-admission-digest", "deterministic admission digest"],
  ["supported-capability-family", "supported capability family"],
  ["selected-provider-slot-preview-only", "selected provider slot preview-only"],
  ["backup-provider-slot-preview-only", "backup provider slot preview-only"],
  [
    "local-private-alternative-preview-only",
    "local/private alternative preview-only",
  ],
  ["dry-run-intent-preview-only", "dry-run intent preview-only"],
  ["dry-run-execution-blocked", "dry-run execution blocked"],
  ["credential-value-absent", "credential value absent"],
  ["credential-value-not-read", "credential value not read"],
  ["env-vars-not-read", "env vars not read"],
  ["provider-key-not-read", "provider key not read"],
  [
    "redacted-prompt-envelope-present",
    "redacted prompt envelope present",
  ],
  ["prompt-not-sent", "prompt not sent"],
  ["provider-sdk-not-imported", "provider SDK not imported"],
  ["provider-response-not-received", "provider response not received"],
  ["model-output-not-generated", "model output not generated"],
  ["manual-approval-fixture", "manual approval fixture"],
  ["manual-confirmation-fixture", "manual confirmation fixture"],
  [
    "in-memory-only-admission-reference",
    "in-memory only admission reference",
  ],
  ["no-real-approval-request", "no real approval request"],
  ["no-real-approval-recording", "no real approval recording"],
  ["no-approval-token-issuance", "no approval token issuance"],
  ["no-approval-lease-issuance", "no approval lease issuance"],
  ["no-frontend-request", "no frontend request"],
  ["no-api-route", "no API route"],
  ["no-fetch-network", "no fetch/network"],
  ["no-provider-sdk-import", "no provider SDK import"],
  ["no-provider-execution", "no provider execution"],
  ["no-model-call", "no model call"],
  ["no-prompt-sending", "no prompt sending"],
  ["no-queue-dispatch", "no queue dispatch"],
  ["no-worker-dispatch", "no worker dispatch"],
  ["no-job-execution", "no job execution"],
  ["no-result-persistence", "no result persistence"],
  ["no-audit-persistence", "no audit persistence"],
  ["no-approval-persistence", "no approval persistence"],
  ["no-database-write", "no database write"],
  ["no-file-write", "no file write"],
  ["single-run-lock-preview", "single-run lock preview"],
  ["idempotency-replay-preview", "idempotency/replay preview"],
  ["timeout-cancel-preview", "timeout/cancel preview"],
  ["privacy-redaction-preview", "privacy/redaction preview"],
  ["kill-switch-fixture", "kill switch fixture"],
] as const;

const READINESS_CHECKLIST_SEEDS = [
  [
    "server-only-provider-dry-run-admission-helper-reviewed",
    "server-only provider dry-run admission helper reviewed",
    "reviewed",
    "operator",
  ],
  ["dry-run-admission-input-reviewed", "dry-run admission input reviewed", "reviewed", "operator"],
  ["dry-run-admission-check-reviewed", "dry-run admission check reviewed", "reviewed", "operator"],
  ["dry-run-admission-output-reviewed", "dry-run admission output reviewed", "reviewed", "operator"],
  ["dry-run-admission-envelope-reviewed", "dry-run admission envelope reviewed", "reviewed", "operator"],
  ["dry-run-intent-preview-reviewed", "dry-run intent preview reviewed", "reviewed", "operator"],
  [
    "dry-run-blocked-execution-summary-reviewed",
    "dry-run blocked execution summary reviewed",
    "reviewed",
    "operator",
  ],
  ["evidence-preview-reviewed", "evidence preview reviewed", "reviewed", "operator"],
  ["audit-preview-reviewed", "audit preview reviewed", "reviewed", "operator"],
  ["approval-preview-reviewed", "approval preview reviewed", "reviewed", "operator"],
  [
    "provider-selection-credential-reference-review-dependency-reviewed",
    "provider selection credential reference review dependency reviewed",
    "reviewed",
    "safety review",
  ],
  ["selected-provider-slot-reviewed", "selected provider slot reviewed", "reviewed", "operator"],
  ["backup-provider-slot-reviewed", "backup provider slot reviewed", "reviewed", "operator"],
  [
    "local-private-alternative-reviewed",
    "local/private alternative reviewed",
    "reviewed",
    "operator",
  ],
  ["opaque-credential-reference-reviewed", "opaque credential reference reviewed", "reviewed", "operator"],
  ["credential-value-absent-reviewed", "credential value absent reviewed", "reviewed", "safety review"],
  ["credential-value-not-read-reviewed", "credential value not read reviewed", "reviewed", "safety review"],
  ["env-vars-not-read-reviewed", "env vars not read reviewed", "reviewed", "safety review"],
  ["provider-key-not-read-reviewed", "provider key not read reviewed", "reviewed", "safety review"],
  [
    "provider-sdk-import-boundary-reviewed",
    "provider SDK import boundary reviewed",
    "reviewed",
    "safety review",
  ],
  [
    "provider-execution-boundary-reviewed",
    "provider execution boundary reviewed",
    "reviewed",
    "safety review",
  ],
  [
    "redacted-prompt-envelope-reviewed",
    "redacted prompt envelope reviewed",
    "reviewed",
    "safety review",
  ],
  [
    "prompt-transmission-blocked-reviewed",
    "prompt transmission blocked reviewed",
    "reviewed",
    "safety review",
  ],
  ["manual-approval-fixture-reviewed", "manual approval fixture reviewed", "reviewed", "operator"],
  [
    "manual-confirmation-fixture-reviewed",
    "manual confirmation fixture reviewed",
    "reviewed",
    "operator",
  ],
  ["kill-switch-fixture-reviewed", "kill switch fixture reviewed", "reviewed", "safety review"],
  ["model-boundary-reviewed", "model boundary reviewed", "reviewed", "safety review"],
  [
    "frontend-request-boundary-reviewed",
    "frontend request boundary reviewed",
    "reviewed",
    "safety review",
  ],
  ["api-route-boundary-reviewed", "API route boundary reviewed", "reviewed", "safety review"],
  ["queue-dispatch-still-blocked", "queue dispatch still blocked", "blocked", "backend future"],
  ["worker-dispatch-still-blocked", "worker dispatch still blocked", "blocked", "backend future"],
  ["job-execution-still-blocked", "job execution still blocked", "blocked", "backend future"],
  ["result-persistence-still-blocked", "result persistence still blocked", "blocked", "backend future"],
  ["audit-persistence-still-blocked", "audit persistence still blocked", "blocked", "backend future"],
  ["approval-persistence-still-blocked", "approval persistence still blocked", "blocked", "backend future"],
  ["database-writes-still-blocked", "database writes still blocked", "blocked", "backend future"],
  ["file-writes-still-blocked", "file writes still blocked", "blocked", "backend future"],
  [
    "provider-adapter-dry-run-execution-not-implemented",
    "provider adapter dry-run execution not implemented",
    "backend future required",
    "backend future",
  ],
] as const;

function cloneList<T>(items: readonly T[]): readonly T[] {
  return [...items];
}

export function uniqueProviderDryRunAdmissionReviewDisplayStrings(
  values: readonly string[]
): readonly string[] {
  return [...new Set(values)];
}

function resolveRequiredRecord<T>(value: T | undefined, message: string): T {
  if (value === undefined) {
    throw new Error(message);
  }

  return value;
}

export function buildStableProviderDryRunAdmissionReviewKey(
  reviewId: ProviderDryRunAdmissionReviewId
): ProviderDryRunAdmissionReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-review:${reviewId}`;
}

export function buildStableProviderDryRunAdmissionOutputReviewKey(
  reviewId: ProviderDryRunAdmissionReviewId
): ProviderDryRunAdmissionOutputReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output-review:${reviewId}`;
}

export function buildStableProviderDryRunAdmissionGateFailureReviewKey(
  reviewId: ProviderDryRunAdmissionReviewId,
  gateId: ProviderDryRunAdmissionGateId
): ProviderDryRunAdmissionGateFailureReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-gate-failure-review:${reviewId}:${gateId}`;
}

export function buildStableProviderDryRunAdmissionRecoveryPlanKey(
  reviewId: ProviderDryRunAdmissionReviewId
): ProviderDryRunAdmissionRecoveryPlanKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-recovery-plan:${reviewId}`;
}

export function buildStableProviderDryRunAdmissionRecoveryReadinessChecklistKey(
  reviewId: ProviderDryRunAdmissionReviewId,
  checklistId: ProviderDryRunAdmissionRecoveryReadinessChecklistId
): ProviderDryRunAdmissionRecoveryReadinessChecklistKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-recovery-readiness:${reviewId}:${checklistId}`;
}

export function buildStableProviderDryRunAdmissionReviewAuditSummaryKey(
  reviewId: ProviderDryRunAdmissionReviewId
): ProviderDryRunAdmissionReviewAuditSummaryKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-review-audit-summary:${reviewId}`;
}

export function buildStableProviderDryRunAdmissionAcceptancePostureKey(
  reviewId: ProviderDryRunAdmissionReviewId
): ProviderDryRunAdmissionAcceptancePostureKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-acceptance-posture:${reviewId}`;
}

type ProviderDryRunAdmissionSourceBundle = Readonly<{
  mvpRecord: ReturnType<
    typeof listMinimalManualGatedProviderAdapterDryRunAdmissionMvpRecords
  >[number];
  inputRecord: ReturnType<typeof listProviderDryRunAdmissionInputs>[number];
  checkRecord: ReturnType<typeof listProviderDryRunAdmissionChecks>[number];
  outputRecord: ReturnType<typeof listProviderDryRunAdmissionOutputs>[number];
  envelopeRecord: ReturnType<typeof listProviderDryRunAdmissionEnvelopes>[number];
  intentPreviewRecord: ReturnType<typeof listProviderDryRunIntentPreviews>[number];
  blockedExecutionRecord:
    ReturnType<typeof listProviderDryRunBlockedExecutionSummaries>[number];
  evidencePreviewRecord:
    ReturnType<typeof listProviderDryRunEvidencePreviews>[number];
  auditPreviewRecord: ReturnType<typeof listProviderDryRunAuditPreviews>[number];
  approvalPreviewRecord:
    ReturnType<typeof listProviderDryRunApprovalPreviews>[number];
  safetyGateSummaryRecord:
    ReturnType<typeof listProviderDryRunSafetyGateSummaries>[number];
  readinessMatrixRecord:
    ReturnType<typeof listProviderDryRunAdmissionReadinessMatrixRecords>[number];
  providerSelectionReviewRecord:
    ReturnType<
      typeof listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews
    >[number];
  providerSelectionAcceptancePostureRecord:
    ReturnType<typeof listProviderSelectionAcceptancePostureRecords>[number];
  providerSelectionAuditSummaryRecord:
    ReturnType<typeof listProviderSelectionReviewAuditSummaries>[number];
}>;

function resolveSourceBundle(
  seed: ProviderDryRunAdmissionReviewSeed
): ProviderDryRunAdmissionSourceBundle {
  const mvpRecord = resolveRequiredRecord(
    listMinimalManualGatedProviderAdapterDryRunAdmissionMvpRecords().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider dry-run admission MVP source for ${seed.reviewId}`
  );
  const inputRecord = resolveRequiredRecord(
    listProviderDryRunAdmissionInputs().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider dry-run admission input source for ${seed.reviewId}`
  );
  const checkRecord = resolveRequiredRecord(
    listProviderDryRunAdmissionChecks().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider dry-run admission check source for ${seed.reviewId}`
  );
  const outputRecord = resolveRequiredRecord(
    listProviderDryRunAdmissionOutputs().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider dry-run admission output source for ${seed.reviewId}`
  );
  const envelopeRecord = resolveRequiredRecord(
    listProviderDryRunAdmissionEnvelopes().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider dry-run admission envelope source for ${seed.reviewId}`
  );
  const intentPreviewRecord = resolveRequiredRecord(
    listProviderDryRunIntentPreviews().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider dry-run intent preview source for ${seed.reviewId}`
  );
  const blockedExecutionRecord = resolveRequiredRecord(
    listProviderDryRunBlockedExecutionSummaries().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider dry-run blocked execution source for ${seed.reviewId}`
  );
  const evidencePreviewRecord = resolveRequiredRecord(
    listProviderDryRunEvidencePreviews().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider dry-run evidence preview source for ${seed.reviewId}`
  );
  const auditPreviewRecord = resolveRequiredRecord(
    listProviderDryRunAuditPreviews().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider dry-run audit preview source for ${seed.reviewId}`
  );
  const approvalPreviewRecord = resolveRequiredRecord(
    listProviderDryRunApprovalPreviews().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider dry-run approval preview source for ${seed.reviewId}`
  );
  const safetyGateSummaryRecord = resolveRequiredRecord(
    listProviderDryRunSafetyGateSummaries().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider dry-run safety gate summary source for ${seed.reviewId}`
  );
  const readinessMatrixRecord = resolveRequiredRecord(
    listProviderDryRunAdmissionReadinessMatrixRecords().find(
      (record) =>
        record.stableId === seed.sourceMvpStableId &&
        record.readinessId === "provider-dry-run-admission-output-state"
    ),
    `Missing provider dry-run readiness matrix source for ${seed.reviewId}`
  );
  const providerSelectionReviewRecord = resolveRequiredRecord(
    listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews().find(
      (record) => record.reviewId === seed.sourceProviderSelectionReviewId
    ),
    `Missing provider selection review source for ${seed.reviewId}`
  );
  const providerSelectionAcceptancePostureRecord = resolveRequiredRecord(
    listProviderSelectionAcceptancePostureRecords().find(
      (record) => record.providerSelectionReviewId === seed.sourceProviderSelectionReviewId
    ),
    `Missing provider selection acceptance posture source for ${seed.reviewId}`
  );
  const providerSelectionAuditSummaryRecord = resolveRequiredRecord(
    listProviderSelectionReviewAuditSummaries().find(
      (record) => record.providerSelectionReviewId === seed.sourceProviderSelectionReviewId
    ),
    `Missing provider selection audit summary source for ${seed.reviewId}`
  );

  return {
    mvpRecord,
    inputRecord,
    checkRecord,
    outputRecord,
    envelopeRecord,
    intentPreviewRecord,
    blockedExecutionRecord,
    evidencePreviewRecord,
    auditPreviewRecord,
    approvalPreviewRecord,
    safetyGateSummaryRecord,
    readinessMatrixRecord,
    providerSelectionReviewRecord,
    providerSelectionAcceptancePostureRecord,
    providerSelectionAuditSummaryRecord,
  };
}

function buildReviewRecord(
  seed: ProviderDryRunAdmissionReviewSeed
): ProviderDryRunAdmissionReviewRecord {
  const sourceBundle = resolveSourceBundle(seed);

  return {
    key: buildStableProviderDryRunAdmissionReviewKey(seed.reviewId),
    reviewVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-review-preview-v1",
    reviewId: seed.reviewId,
    requestLabel: seed.requestLabel,
    source: REVIEW_SOURCE,
    reviewMode: REVIEW_MODE,
    reviewPosture: REVIEW_POSTURE,
    sourceProviderDryRunAdmissionMvpReference: sourceBundle.mvpRecord.key,
    sourceProviderDryRunAdmissionInputReference: sourceBundle.inputRecord.key,
    sourceProviderDryRunAdmissionCheckReference: sourceBundle.checkRecord.key,
    sourceProviderDryRunAdmissionOutputReference: sourceBundle.outputRecord.key,
    sourceProviderDryRunAdmissionEnvelopeReference:
      sourceBundle.envelopeRecord.key,
    sourceProviderDryRunIntentPreviewReference:
      sourceBundle.intentPreviewRecord.key,
    sourceProviderDryRunBlockedExecutionSummaryReference:
      sourceBundle.blockedExecutionRecord.key,
    sourceProviderDryRunEvidencePreviewReference:
      sourceBundle.evidencePreviewRecord.key,
    sourceProviderDryRunAuditPreviewReference:
      sourceBundle.auditPreviewRecord.key,
    sourceProviderDryRunApprovalPreviewReference:
      sourceBundle.approvalPreviewRecord.key,
    sourceProviderDryRunSafetyGateSummaryReference:
      sourceBundle.safetyGateSummaryRecord.key,
    sourceProviderDryRunReadinessMatrixReference:
      sourceBundle.readinessMatrixRecord.key,
    sourceProviderSelectionCredentialReferenceReviewReference:
      sourceBundle.providerSelectionReviewRecord.key,
    sourceProviderSelectionAcceptancePostureReference:
      sourceBundle.providerSelectionAcceptancePostureRecord.key,
    sourceProviderSelectionAuditSummaryReference:
      sourceBundle.providerSelectionAuditSummaryRecord.key,
    selectedCapabilityFamily: seed.selectedCapabilityFamily,
    workspaceTarget: sourceBundle.mvpRecord.workspaceTarget,
    providerSlotLabel: seed.providerSlotLabel,
    backupProviderSlotLabel: seed.backupProviderSlotLabel,
    localPrivateAlternativeLabel: "local/private text provider dry-run slot",
    opaqueCredentialReferenceLabel:
      sourceBundle.mvpRecord.opaqueCredentialReferenceLabel,
    serverOnlyProviderDryRunAdmissionHelperState: "exists",
    providerDryRunAdmissionState: "deterministic fixture-only",
    dryRunIntentState: "preview-only",
    dryRunExecutionState: "blocked",
    selectedProviderSlotState: "preview-only",
    backupProviderSlotState: "preview-only",
    localPrivateAlternativeState: "preview-only",
    credentialReferenceState: "opaque label only",
    credentialValueState: "not present / not read",
    envVarState: "not read",
    providerKeyState: "not read",
    providerSdkImportState: "not imported",
    providerExecutionState: "blocked",
    providerResponseState: "not received",
    modelCallState: "not called",
    modelOutputState: "not generated",
    redactedPromptEnvelopeState: "preview-only",
    promptTransmissionState: "not sent",
    frontendRequestState: "not created",
    apiRouteState: "not created",
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
    evidencePacketState: EVIDENCE_PACKET_STATE,
    killSwitchState: "inactive fixture only",
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    operatorFacingExplanation: seed.operatorFacingExplanation,
    remainingBlockers: seed.remainingBlockers,
    nextSafeAction: seed.nextSafeAction,
    nextProviderAdapterDryRunExecutionMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH,
  };
}

function buildOutputReviewRecord(
  review: ProviderDryRunAdmissionReviewRecord
): ProviderDryRunAdmissionOutputReviewRecord {
  const sourceOutput = resolveRequiredRecord(
    listProviderDryRunAdmissionOutputs().find(
      (record) => record.key === review.sourceProviderDryRunAdmissionOutputReference
    ),
    `Missing provider dry-run admission output for ${review.reviewId}`
  );

  return {
    key: buildStableProviderDryRunAdmissionOutputReviewKey(review.reviewId),
    outputReviewVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output-review-preview-v1",
    providerDryRunAdmissionReviewId: review.reviewId,
    sourceProviderDryRunAdmissionOutputReference:
      review.sourceProviderDryRunAdmissionOutputReference,
    sourceProviderDryRunAdmissionEnvelopeReference:
      review.sourceProviderDryRunAdmissionEnvelopeReference,
    sourceProviderDryRunIntentPreviewReference:
      review.sourceProviderDryRunIntentPreviewReference,
    sourceProviderDryRunBlockedExecutionSummaryReference:
      review.sourceProviderDryRunBlockedExecutionSummaryReference,
    admissionState: sourceOutput.admissionState,
    admissionMode: "deterministic-fixture-only",
    dryRunExecutionState: "blocked",
    providerDryRunAdmissionIdPosture: "deterministic preview id only",
    providerSlotIdPosture: "deterministic preview id only",
    credentialReferenceIdPosture: "deterministic opaque reference id only",
    admissionDigestPosture: "deterministic preview digest only",
    selectedProviderSlotPosture: "preview-only",
    backupProviderSlotPosture: "preview-only",
    localPrivateAlternativePosture: "preview-only",
    credentialReferencePosture: "opaque-reference-only",
    credentialValueState: review.credentialValueState,
    envVarState: review.envVarState,
    providerKeyState: review.providerKeyState,
    providerSdkImportState: review.providerSdkImportState,
    providerExecutionState: review.providerExecutionState,
    promptTransmissionState: review.promptTransmissionState,
    providerResponseState: review.providerResponseState,
    modelOutputState: review.modelOutputState,
    outputClassification: "deterministic dry-run admission fixture only",
    resultPersistenceState: review.resultPersistenceState,
    auditPersistenceState: review.auditPersistenceState,
    approvalPersistenceState: review.approvalPersistenceState,
    operatorFacingExplanation:
      "This output review stays in deterministic preview form only. It can explain admitted-preview and blocked-preview posture without reading secrets or calling any provider.",
    remainingBlockers: uniqueProviderDryRunAdmissionReviewDisplayStrings([
      ...review.remainingBlockers,
      "provider response is not received",
      "model output is not generated",
    ]),
    nextSafeAction:
      "Review the blocked execution posture and carry it forward into the backend-owned dry-run execution MVP only.",
    explicitDryRunAdmissionFixtureOnlyNoSecretReadNoProviderCallNoPersistenceStatement:
      FIXTURE_ONLY_STATEMENT,
  };
}

function buildGateFailureSeed(
  gateId: ProviderDryRunAdmissionGateId,
  label: string
): GateFailureSeed {
  return {
    gateId,
    label,
    severity:
      label.includes("no ") || label.includes("not ") || label.includes("blocked")
        ? "critical"
        : label.includes("preview") || label.includes("fixture")
          ? "medium"
          : "high",
    requiredEvidence: `${label} evidence must remain explicit in typed preview form before any execution work can proceed.`,
    recoveryAction: `Keep ${label} visible as a blocked review gate and preserve the same boundary in the backend-owned execution MVP.`,
  };
}

function buildReadinessChecklistSeed(
  checklistId: ProviderDryRunAdmissionRecoveryReadinessChecklistId,
  label: ProviderDryRunAdmissionRecoveryReadinessChecklistLabel,
  state: ProviderDryRunAdmissionRecoveryReadinessState,
  owner: ProviderDryRunAdmissionRecoveryReadinessOwner
): ReadinessChecklistSeed {
  const severity: ProviderDryRunAdmissionReviewSeverity =
    state === "blocked"
      ? "high"
      : state === "backend future required"
        ? "critical"
        : "medium";

  return {
    checklistId,
    label,
    state,
    severity,
    evidenceRequired: `${label} evidence is required in typed preview form.`,
    recoveryAction:
      state === "reviewed"
        ? `Keep ${label} explicit in the review packet.`
        : `Leave ${label} blocked until the backend-owned dry-run execution MVP defines the execution contract.`,
    owner,
    nextSafeAction:
      state === "reviewed"
        ? "Maintain the current preview-only boundary."
        : "Escalate to the backend-owned dry-run execution MVP only.",
  };
}

export function listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews():
  readonly ProviderDryRunAdmissionReviewRecord[] {
  return REVIEW_SEEDS.map((seed) => buildReviewRecord(seed));
}

export function listProviderDryRunAdmissionOutputReviewRecords():
  readonly ProviderDryRunAdmissionOutputReviewRecord[] {
  return listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews().map(
    (review) => buildOutputReviewRecord(review)
  );
}

export function listProviderDryRunAdmissionGateFailureReviewRecords():
  readonly ProviderDryRunAdmissionGateFailureReviewRecord[] {
  const reviews =
    listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews();

  return GATE_FAILURE_SEEDS.map(([gateId, label], index) => {
    const review = reviews[index % reviews.length];
    const seed = buildGateFailureSeed(gateId, label);

    return {
      key: buildStableProviderDryRunAdmissionGateFailureReviewKey(
        review.reviewId,
        gateId
      ),
      gateFailureReviewVersion:
        "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-gate-failure-review-preview-v1",
      providerDryRunAdmissionReviewId: review.reviewId,
      failedGateId: gateId,
      failedGateLabel: label,
      gateState: "blocked",
      severity: seed.severity,
      affectedCapabilityFamily: review.selectedCapabilityFamily,
      affectedWorkspaceTarget: review.workspaceTarget,
      affectedProviderSlot: review.providerSlotLabel,
      affectedCredentialReference: review.opaqueCredentialReferenceLabel,
      operatorFacingExplanation:
        `${label} remains a blocked preview gate. Athena can explain it, but this batch does not pass it live.`,
      requiredEvidenceToUnblock: seed.requiredEvidence,
      requiredRecoveryAction: seed.recoveryAction,
      providerAdapterDryRunExecutionMvpDependency:
        NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH,
      nextSafeAction:
        "Preserve the blocked gate and move next to the backend-owned dry-run execution MVP.",
      explicitNoLiveGatePassStatement: NO_LIVE_GATE_PASS_STATEMENT,
    };
  });
}

export function listProviderDryRunAdmissionRecoveryPlanPreviews():
  readonly ProviderDryRunAdmissionRecoveryPlanPreviewRecord[] {
  return listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews().map(
    (review) => ({
      key: buildStableProviderDryRunAdmissionRecoveryPlanKey(review.reviewId),
      recoveryPlanVersion:
        "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-recovery-plan-preview-v1",
      providerDryRunAdmissionReviewId: review.reviewId,
      recoveryPosture: RECOVERY_POSTURE,
      serverOnlyProviderDryRunAdmissionHelperRecovery:
        "Keep the provider dry-run admission helper server-only, deterministic, and review-safe.",
      dryRunAdmissionInputRecovery:
        "Preserve backend-only input fixtures and keep frontend request creation blocked.",
      dryRunAdmissionCheckRecovery:
        "Keep gate evaluation deterministic, static, and blocked from live execution.",
      dryRunAdmissionOutputRecovery:
        "Retain admitted-preview or blocked-preview output posture without introducing provider-side effects.",
      dryRunAdmissionEnvelopeRecovery:
        "Keep the redacted prompt envelope preview-only and prevent prompt transmission.",
      dryRunIntentPreviewRecovery:
        "Leave intent posture preview-only until the execution MVP defines a backend-owned execution envelope.",
      dryRunBlockedExecutionSummaryRecovery:
        "Carry the blocked execution summary forward as an explicit safety boundary.",
      evidencePreviewRecovery:
        "Keep evidence previews deterministic and non-persistent.",
      auditPreviewRecovery:
        "Keep audit previews visible while audit persistence remains unimplemented.",
      approvalPreviewRecovery:
        "Keep approval previews fixture-only with no real approval request or recording.",
      credentialReferenceRecovery:
        "Preserve opaque credential reference labels only and do not surface credential values.",
      credentialValueBoundaryRecovery:
        "Keep credential value state not present and not read.",
      envVarBoundaryRecovery:
        "Keep env var state not read in every review and execution-prep record.",
      providerKeyBoundaryRecovery:
        "Keep provider key state not read and do not widen secret boundaries.",
      providerSdkBoundaryRecovery:
        "Continue blocking provider SDK imports until the backend-owned execution MVP explicitly defines safe adapters.",
      providerExecutionBoundaryRecovery:
        "Continue blocking provider execution in this review layer.",
      promptBoundaryRecovery:
        "Keep prompt sending blocked and limit the review layer to redacted envelopes only.",
      modelBoundaryRecovery:
        "Keep model call state not called and model output state not generated.",
      frontendRequestBoundaryRecovery:
        "Keep frontend request creation blocked and leave the chat input inert/local only.",
      apiRouteBoundaryRecovery:
        "Do not create an API route in this batch.",
      queueDispatchBlockedRecovery:
        "Keep queue dispatch blocked until the backend-owned execution MVP defines its handoff contract.",
      workerDispatchBlockedRecovery:
        "Keep worker dispatch blocked and out of the frontend and review path.",
      jobExecutionBlockedRecovery:
        "Keep job execution blocked and non-existent in this batch.",
      resultPersistenceMissingRecovery:
        "Keep result persistence unimplemented and review-only.",
      auditPersistenceMissingRecovery:
        "Keep audit persistence unimplemented and review-only.",
      approvalPersistenceMissingRecovery:
        "Keep approval persistence unimplemented and review-only.",
      databaseWriteBlockedRecovery:
        "Continue blocking database writes from this review layer.",
      fileWriteBlockedRecovery:
        "Continue blocking file writes from this review layer.",
      dryRunExecutionMissingRecovery:
        "Add the backend-owned, server-only dry-run execution MVP next without widening any secret or persistence boundary.",
      retryPosture: RETRY_POSTURE,
      fallbackPosture: FALLBACK_POSTURE,
      operatorActionRequired:
        "Review the blocked execution posture and verify the helper remains deterministic, fixture-only, and secret-free.",
      nextSafeBatchRecommendation:
        NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH,
      explicitNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement:
        NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT,
    })
  );
}

export function listProviderDryRunAdmissionRecoveryReadinessChecklistRecords():
  readonly ProviderDryRunAdmissionRecoveryReadinessChecklistRecord[] {
  const reviews =
    listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews();

  return READINESS_CHECKLIST_SEEDS.map(
    ([checklistId, label, state, owner], index) => {
      const review = reviews[index % reviews.length];
      const seed = buildReadinessChecklistSeed(checklistId, label, state, owner);

      return {
        key: buildStableProviderDryRunAdmissionRecoveryReadinessChecklistKey(
          review.reviewId,
          checklistId
        ),
        checklistVersion:
          "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-recovery-readiness-checklist-v1",
        providerDryRunAdmissionReviewId: review.reviewId,
        checklistId,
        label,
        state,
        severity: seed.severity,
        evidenceRequired: seed.evidenceRequired,
        recoveryAction: seed.recoveryAction,
        owner,
        currentPosture: CURRENT_POSTURE,
        providerAdapterDryRunExecutionMvpDependency:
          NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH,
        nextSafeAction: seed.nextSafeAction,
      };
    }
  );
}

export function listProviderDryRunAdmissionReviewAuditSummaries():
  readonly ProviderDryRunAdmissionReviewAuditSummaryRecord[] {
  return listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews().map(
    (review) => ({
      key: buildStableProviderDryRunAdmissionReviewAuditSummaryKey(
        review.reviewId
      ),
      auditSummaryVersion:
        "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-review-audit-summary-preview-v1",
      providerDryRunAdmissionReviewId: review.reviewId,
      auditPosture: AUDIT_POSTURE,
      admissionReferenceState: ADMISSION_REFERENCE_STATE,
      providerSlotReferenceState: PROVIDER_SLOT_REFERENCE_STATE,
      credentialReferenceState: CREDENTIAL_REFERENCE_AUDIT_STATE,
      dryRunIntentState: INTENT_AUDIT_STATE,
      dryRunBlockedExecutionSummary:
        "Dry-run blocked execution summary remains explicit and preview-only.",
      credentialValueState: review.credentialValueState,
      envVarState: review.envVarState,
      providerKeyState: review.providerKeyState,
      evidencePacketState: EVIDENCE_PACKET_STATE,
      serverOnlyAdmissionHelperEvidenceSummary:
        "The server-only provider dry-run admission helper exists and stays backend-only, deterministic, and non-persistent.",
      deterministicDryRunAdmissionEvidenceSummary:
        "Deterministic preview ids, slot ids, credential reference ids, and admission digests stay static and secret-free.",
      failedGateSummary:
        "Execution, persistence, secret reads, provider SDK imports, prompt sending, and real approvals all remain blocked.",
      recoverySummary:
        "Recovery remains manual review only with retry and fallback disabled.",
      blockedActionSummary:
        "No frontend request, no API route, no provider execution, no queue dispatch, no worker dispatch, no job execution.",
      noSecretReadStatement: "No secret read.",
      noEnvVarReadStatement: "No env var read.",
      noProviderOutputStatement: "No provider output received.",
      noModelOutputStatement: "No model output generated.",
      noPromptSendingStatement: "No prompt sending.",
      noResultPersistenceStatement: "No result persistence.",
      noAuditPersistenceStatement: "No audit persistence.",
      noApprovalPersistenceStatement: "No approval persistence.",
      noDatabaseWriteStatement: "No database write.",
      noFileWriteStatement: "No file write.",
      providerAdapterDryRunExecutionMvpRequirement:
        NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH,
    })
  );
}

export function listProviderDryRunAdmissionAcceptancePostureRecords():
  readonly ProviderDryRunAdmissionAcceptancePostureRecord[] {
  return listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews().map(
    (review) => ({
      key: buildStableProviderDryRunAdmissionAcceptancePostureKey(
        review.reviewId
      ),
      acceptancePostureVersion:
        "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-acceptance-posture-preview-v1",
      providerDryRunAdmissionReviewId: review.reviewId,
      acceptanceState: ACCEPTANCE_STATE,
      fixtureOnlyAcceptanceSummary:
        "The deterministic dry-run admission fixture MVP is accepted for preview-only review surfaces.",
      backendOnlyAcceptanceSummary:
        "The review layer is accepted only as a backend-owned boundary with no frontend-callable execution.",
      serverOnlyAcceptanceSummary:
        "The server-only provider dry-run admission helper remains the only safe source for deterministic admission output.",
      admissionOnlyAcceptanceSummary:
        "Only admission posture is accepted here; execution remains out of scope and blocked.",
      credentialReferenceOnlyAcceptanceSummary:
        "Only opaque credential reference labels are accepted in this layer.",
      dryRunIntentOnlyAcceptanceSummary:
        "Dry-run intent remains preview-only and is not executable.",
      blockedExecutionAcceptanceSummary:
        "Blocked execution posture is required and remains accepted only as a safety boundary.",
      selectedProviderSlotAcceptanceSummary:
        "Selected provider slot posture is accepted only as preview-only metadata.",
      backupProviderSlotAcceptanceSummary:
        "Backup provider slot posture is accepted only as preview-only metadata.",
      localPrivateAlternativeAcceptanceSummary:
        "Local/private alternative posture is accepted only as preview-only metadata.",
      providerBlockers: [
        "provider SDK imports remain blocked",
        "provider execution remains blocked",
        "provider response remains blocked",
      ],
      credentialValueBlockers: [
        "credential value is not present",
        "credential value reads remain blocked",
      ],
      envVarBlockers: [
        "env vars are not read",
        "provider key reads remain blocked",
      ],
      promptBlockers: [
        "prompt sending remains blocked",
        "redacted prompt envelope remains preview-only",
      ],
      modelBlockers: [
        "model calls remain blocked",
        "model output remains not generated",
      ],
      queueWorkerJobBlockers: [
        "queue dispatch remains blocked",
        "worker dispatch remains blocked",
        "job execution remains blocked",
      ],
      resultPersistenceBlockers: ["result persistence remains blocked"],
      auditPersistenceBlockers: ["audit persistence remains blocked"],
      approvalPersistenceBlockers: ["approval persistence remains blocked"],
      databaseFileBlockers: [
        "database writes remain blocked",
        "file writes remain blocked",
      ],
      approvalBlockers: [
        "no real approval request",
        "no real approval recording",
        "approval token is not issued",
        "approval lease is not created",
      ],
      auditBlockers: [
        "audit preview remains non-persistent",
        "audit evidence remains preview-only",
      ],
      dryRunExecutionBlockers: [
        "dry-run execution remains blocked",
        "backend-owned execution MVP is still required",
      ],
      requiredEvidence: [
        "server-only helper evidence",
        "deterministic dry-run admission evidence",
        "blocked execution evidence",
        "opaque credential reference evidence",
        "manual approval fixture evidence",
        "kill switch fixture evidence",
      ],
      nextSafeAction:
        "Accept the fixture-only review layer for preview work only and move next to the backend-owned dry-run execution MVP.",
      explicitProviderDryRunAdmissionFixtureAcceptedLiveProviderExecutionNotAcceptedStatement:
        ACCEPTANCE_STATEMENT,
    })
  );
}

function buildGroupByLabel<T>(
  items: readonly T[],
  resolveLabel: (item: T) => string
): ReadonlyMap<string, readonly T[]> {
  const map = new Map<string, T[]>();

  items.forEach((item) => {
    const label = resolveLabel(item);
    const existing = map.get(label);

    if (existing) {
      existing.push(item);
      return;
    }

    map.set(label, [item]);
  });

  return new Map(
    [...map.entries()].map(([label, groupedReviews]) => [label, [...groupedReviews]])
  );
}

export function groupProviderDryRunAdmissionReviewsByCapabilityFamily():
  readonly ProviderDryRunAdmissionReviewCapabilityFamilyGroup[] {
  const reviews =
    listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews();

  return [...buildGroupByLabel(reviews, (review) => review.selectedCapabilityFamily).entries()].map(
    ([capabilityFamily, groupedReviews]) => ({
      capabilityFamily:
        capabilityFamily as ProviderDryRunAdmissionReviewCapabilityFamilyGroup["capabilityFamily"],
      reviews: groupedReviews as readonly ProviderDryRunAdmissionReviewRecord[],
    })
  );
}

export function groupProviderDryRunAdmissionReviewsByProviderSlot():
  readonly ProviderDryRunAdmissionReviewProviderSlotGroup[] {
  const reviews =
    listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews();

  return [...buildGroupByLabel(reviews, (review) => review.providerSlotLabel).entries()].map(
    ([providerSlot, groupedReviews]) => ({
      providerSlot:
        providerSlot as ProviderDryRunAdmissionReviewProviderSlotGroup["providerSlot"],
      reviews: groupedReviews as readonly ProviderDryRunAdmissionReviewRecord[],
    })
  );
}

export function groupProviderDryRunAdmissionReviewsByCredentialReference():
  readonly ProviderDryRunAdmissionReviewCredentialReferenceGroup[] {
  const reviews =
    listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews();

  return [...buildGroupByLabel(reviews, (review) => review.opaqueCredentialReferenceLabel).entries()].map(
    ([credentialReference, groupedReviews]) => ({
      credentialReference:
        credentialReference as ProviderDryRunAdmissionReviewCredentialReferenceGroup["credentialReference"],
      reviews: groupedReviews as readonly ProviderDryRunAdmissionReviewRecord[],
    })
  );
}

export function buildProviderDryRunAdmissionReviewSummary():
  ProviderDryRunAdmissionReviewSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-review-summary-v1",
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH,
    reviewCount:
      listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews()
        .length,
    currentReadiness: CURRENT_READINESS,
    acceptanceState: ACCEPTANCE_STATE,
    recoveryPosture: RECOVERY_POSTURE,
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildProviderDryRunAdmissionOutputReviewSummary():
  ProviderDryRunAdmissionOutputReviewSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-output-review-summary-v1",
    recordCount: listProviderDryRunAdmissionOutputReviewRecords().length,
    summaryLines: cloneList(OUTPUT_REVIEW_SUMMARY_LINES),
    nextSafeAction:
      "Keep output review deterministic and blocked until the backend-owned dry-run execution MVP exists.",
  };
}

export function buildProviderDryRunAdmissionGateFailureSummary():
  ProviderDryRunAdmissionGateFailureSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-gate-failure-summary-v1",
    recordCount: listProviderDryRunAdmissionGateFailureReviewRecords().length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    nextSafeAction:
      "Preserve gate failure evidence and move next to the backend-owned dry-run execution MVP only.",
  };
}

export function buildProviderDryRunAdmissionRecoverySummary():
  ProviderDryRunAdmissionRecoverySummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-admission-recovery-summary-v1",
    planCount: listProviderDryRunAdmissionRecoveryPlanPreviews().length,
    checklistCount:
      listProviderDryRunAdmissionRecoveryReadinessChecklistRecords().length,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextSafeAction:
      "Keep recovery manual-review-only and let the backend-owned dry-run execution MVP define the next safe contract.",
  };
}

export function buildProviderAdapterDryRunExecutionMvpChecklist():
  ProviderAdapterDryRunExecutionMvpChecklist {
  return cloneList(DRY_RUN_EXECUTION_MVP_CHECKLIST_LINES);
}
