import {
  listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews,
  listTextAdapterAuditApprovalJoinAcceptancePostureRecords,
  listTextAdapterAuditApprovalJoinReviewAuditSummaries,
} from "../min-text-aa-review";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews,
} from "../min-text-capture-review";
import {
  listMinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecords,
  listOpaqueCredentialReferenceInputs,
  listOpaqueCredentialReferenceOutputs,
  listProviderAdapterSelectionAdmissionChecks,
  listProviderAdapterSelectionApprovalPreviews,
  listProviderAdapterSelectionAuditPreviews,
  listProviderAdapterSelectionBlockedLiveProviderSummaries,
  listProviderAdapterSelectionEnvelopes,
  listProviderAdapterSelectionEvidencePreviews,
  listProviderAdapterSelectionInputs,
  listProviderAdapterSelectionOutputs,
  listProviderAdapterSelectionSafetyGateSummaries,
  listProviderSlotMatrixRecords,
} from "../min-provider-select/min-provider-select-catalog";
import type { ProviderAdapterSelectionMvpId } from "../min-provider-select/min-provider-select-types";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH,
  type ProviderAdapterDryRunAdmissionMvpChecklist,
  type ProviderSelectionAcceptancePostureKey,
  type ProviderSelectionAcceptancePostureRecord,
  type ProviderSelectionAcceptancePostureVersion,
  type ProviderSelectionAcceptanceState,
  type ProviderSelectionAcceptanceStatement,
  type ProviderSelectionAuditPosture,
  type ProviderSelectionCredentialReferenceReviewId,
  type ProviderSelectionCredentialReferenceReviewKey,
  type ProviderSelectionCredentialReferenceReviewRecord,
  type ProviderSelectionCredentialReferenceReviewVersion,
  type ProviderSelectionCurrentPosture,
  type ProviderSelectionEvidencePacketState,
  type ProviderSelectionFallbackPosture,
  type ProviderSelectionFixtureOnlyStatement,
  type ProviderSelectionGateFailureReviewKey,
  type ProviderSelectionGateFailureReviewRecord,
  type ProviderSelectionGateFailureReviewVersion,
  type ProviderSelectionGateFailureSummary,
  type ProviderSelectionGateFailureSummaryVersion,
  type ProviderSelectionNoLiveGatePassStatement,
  type ProviderSelectionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement,
  type ProviderSelectionOutputReviewKey,
  type ProviderSelectionOutputReviewRecord,
  type ProviderSelectionOutputReviewSummary,
  type ProviderSelectionOutputReviewSummaryVersion,
  type ProviderSelectionOutputReviewVersion,
  type ProviderSelectionPreviewOnlyStatement,
  type ProviderSelectionRecoveryPlanKey,
  type ProviderSelectionRecoveryPlanPreviewRecord,
  type ProviderSelectionRecoveryPlanVersion,
  type ProviderSelectionRecoveryPosture,
  type ProviderSelectionRecoveryReadinessChecklistId,
  type ProviderSelectionRecoveryReadinessChecklistKey,
  type ProviderSelectionRecoveryReadinessChecklistLabel,
  type ProviderSelectionRecoveryReadinessChecklistRecord,
  type ProviderSelectionRecoveryReadinessChecklistVersion,
  type ProviderSelectionRecoveryReadinessOwner,
  type ProviderSelectionRecoveryReadinessState,
  type ProviderSelectionRecoverySummary,
  type ProviderSelectionRecoverySummaryVersion,
  type ProviderSelectionRetryPosture,
  type ProviderSelectionReviewAuditSummaryKey,
  type ProviderSelectionReviewAuditSummaryRecord,
  type ProviderSelectionReviewAuditSummaryVersion,
  type ProviderSelectionReviewCapabilityFamilyGroup,
  type ProviderSelectionReviewCurrentReadiness,
  type ProviderSelectionReviewCredentialReferenceGroup,
  type ProviderSelectionReviewMode,
  type ProviderSelectionReviewPosture,
  type ProviderSelectionReviewProviderSlotGroup,
  type ProviderSelectionReviewRequestLabel,
  type ProviderSelectionReviewSeverity,
  type ProviderSelectionReviewSource,
  type ProviderSelectionReviewSummary,
  type ProviderSelectionReviewSummaryVersion,
} from "./min-provider-review-types";

type ExistingReviewSourceId = Exclude<
  ProviderSelectionCredentialReferenceReviewId,
  "fallback-disabled-request"
>;

type ProviderSelectionReviewSeed = Readonly<{
  reviewId: ProviderSelectionCredentialReferenceReviewId;
  requestLabel: ProviderSelectionReviewRequestLabel;
  selectedCapabilityFamily: "text/chat" | "planning/reasoning";
  providerSlotLabel:
    | "OpenAI-compatible text provider slot"
    | "Anthropic-compatible text provider slot"
    | "Gemini-compatible text provider slot"
    | "local/private text provider slot"
    | "fallback disabled slot";
  backupProviderSlotLabel:
    | "OpenAI-compatible text provider slot"
    | "Anthropic-compatible text provider slot"
    | "Gemini-compatible text provider slot"
    | "local/private text provider slot"
    | "fallback disabled slot";
  opaqueCredentialReferenceLabel:
    | "opaque credential reference label / athena text chat primary"
    | "opaque credential reference label / athena planning reasoning primary";
  sourceMvpStableId: ProviderAdapterSelectionMvpId;
  sourceJoinReviewId: ExistingReviewSourceId;
  sourceResultCaptureReviewId: ExistingReviewSourceId;
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
}>;

type GateFailureSeed = Readonly<{
  gateId: ProviderSelectionGateFailureReviewRecord["failedGateId"];
  label: string;
  severity: ProviderSelectionReviewSeverity;
  requiredEvidence: string;
  recoveryAction: string;
}>;

type ReadinessChecklistSeed = Readonly<{
  checklistId: ProviderSelectionRecoveryReadinessChecklistId;
  label: ProviderSelectionRecoveryReadinessChecklistLabel;
  state: ProviderSelectionRecoveryReadinessState;
  severity: ProviderSelectionReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ProviderSelectionRecoveryReadinessOwner;
  nextSafeAction: string;
}>;

const REVIEW_SOURCE: ProviderSelectionReviewSource =
  "Athena / Jarvis Model Gateway";
const REVIEW_MODE: ProviderSelectionReviewMode = "preview-only";
const REVIEW_POSTURE: ProviderSelectionReviewPosture =
  "minimal provider selection credential reference review / backend-only / credential-reference-only / fixture-only / not provider-capable / not persistent";
const CURRENT_READINESS: ProviderSelectionReviewCurrentReadiness =
  "minimal-provider-selection-credential-reference-review-only / backend-only / credential-reference-only / fixture-only / not provider-capable / not persistent";
const RECOVERY_POSTURE: ProviderSelectionRecoveryPosture =
  "manual review only";
const RETRY_POSTURE: ProviderSelectionRetryPosture = "disabled";
const FALLBACK_POSTURE: ProviderSelectionFallbackPosture = "disabled";
const AUDIT_POSTURE: ProviderSelectionAuditPosture = "preview-only";
const ACCEPTANCE_STATE: ProviderSelectionAcceptanceState =
  "not accepted for live provider execution / provider selection credential reference fixture MVP accepted only";
const PREVIEW_ONLY_STATEMENT: ProviderSelectionPreviewOnlyStatement =
  "Provider adapter selection review is preview-only.";
const FIXTURE_ONLY_STATEMENT: ProviderSelectionFixtureOnlyStatement =
  "Provider selection fixture only. No secret read. No provider call. No persistence.";
const NO_LIVE_GATE_PASS_STATEMENT: ProviderSelectionNoLiveGatePassStatement =
  "No live gate pass.";
const NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT: ProviderSelectionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence.";
const ACCEPTANCE_STATEMENT: ProviderSelectionAcceptanceStatement =
  "Provider selection credential reference fixture accepted only. Live provider execution not accepted.";
const CURRENT_POSTURE: ProviderSelectionCurrentPosture = "preview-only";
const EVIDENCE_PACKET_STATE: ProviderSelectionEvidencePacketState =
  "preview-only / not persisted";

const REVIEW_SUMMARY_LINES = [
  "backend-owned minimal manual-gated provider adapter selection and credential reference review and recovery preview only",
  "provider adapter selection review is preview-only",
  "server-only provider selection helper exists",
  "provider slot selection is deterministic fixture-only",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "backup provider slot is preview-only",
  "local/private alternative is preview-only",
  "provider adapter selection is not provider-capable yet",
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
  "backend-owned minimal manual-gated provider adapter dry-run admission MVP next",
] as const;

const OUTPUT_REVIEW_SUMMARY_LINES = [
  "Provider adapter selection output review",
  "selected-provider-slot-and-opaque-credential-reference-fixture-only",
  "provider selection id posture: deterministic preview id only",
  "provider slot id posture: deterministic preview id only",
  "credential reference id posture: deterministic opaque reference id only",
  "selection digest posture: deterministic preview digest only",
  "credential reference posture: opaque-reference-only",
  "prompt transmission state: not sent",
  "provider response state: not received",
  "model output state: not generated",
  "output classification: deterministic provider selection fixture only",
  "result persistence state: not implemented",
  "audit persistence state: not implemented",
  "approval persistence state: not implemented",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only provider selection module boundary",
  "provider selection fixture mode",
  "credential reference opaque-only mode",
  "text adapter audit/approval join review dependency",
  "deterministic provider selection id",
  "deterministic provider slot id",
  "deterministic credential reference id",
  "deterministic selection digest",
  "supported capability family",
  "selected provider slot preview-only",
  "backup provider slot preview-only",
  "local/private alternative preview-only",
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
  "in-memory only selection reference",
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
  "Provider adapter selection recovery plan",
  "Provider adapter selection recovery readiness",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "provider adapter dry-run admission MVP comes next",
  NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT,
] as const;

const DRY_RUN_ADMISSION_MVP_CHECKLIST_LINES = [
  "Review backend-owned minimal provider adapter selection and credential reference review records before admitting any dry-run path.",
  "Keep the server-only provider selection helper deterministic, fixture-only, credential-reference-only, backend-only, and non-persistent.",
  "Do not add credential value reads, env var reads, provider key reads, provider SDK imports, prompt sending, model calls, provider execution, or plugin execution.",
  "Do not add frontend requests, API routes, network calls, queue dispatch, worker dispatch, job execution, result persistence, audit persistence, approval persistence, database writes, or file writes.",
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
] as const satisfies ProviderAdapterDryRunAdmissionMvpChecklist;

const REVIEW_SEEDS = [
  {
    reviewId: "conversational-planning-request",
    requestLabel: "conversational planning request",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "OpenAI-compatible text provider slot",
    backupProviderSlotLabel: "Anthropic-compatible text provider slot",
    opaqueCredentialReferenceLabel:
      "opaque credential reference label / athena planning reasoning primary",
    sourceMvpStableId: "planning-reasoning-provider-selection",
    sourceJoinReviewId: "conversational-planning-request",
    sourceResultCaptureReviewId: "conversational-planning-request",
    operatorFacingExplanation:
      "Athena can now review a backend-owned conversational planning selection preview without reading a credential value or contacting any provider.",
    remainingBlockers: [
      "dry-run admission is not implemented",
      "provider execution remains blocked",
      "prompt transmission remains blocked",
    ],
    nextSafeAction:
      "Review the dry-run admission checklist before adding any admission contract.",
  },
  {
    reviewId: "code-assistance-request",
    requestLabel: "code assistance request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "Anthropic-compatible text provider slot",
    backupProviderSlotLabel: "Gemini-compatible text provider slot",
    opaqueCredentialReferenceLabel:
      "opaque credential reference label / athena text chat primary",
    sourceMvpStableId: "text-chat-provider-selection",
    sourceJoinReviewId: "code-assistance-request",
    sourceResultCaptureReviewId: "code-assistance-request",
    operatorFacingExplanation:
      "Jarvis can review a deterministic code assistance provider slot choice as an opaque label only, with no env lookup and no provider SDK import.",
    remainingBlockers: [
      "frontend request creation remains blocked",
      "API route creation remains blocked",
      "persistence remains blocked",
    ],
    nextSafeAction:
      "Keep the code assistance selection preview-only until dry-run admission exists.",
  },
  {
    reviewId: "website-copy-code-request",
    requestLabel: "website copy/code request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "Gemini-compatible text provider slot",
    backupProviderSlotLabel: "OpenAI-compatible text provider slot",
    opaqueCredentialReferenceLabel:
      "opaque credential reference label / athena text chat primary",
    sourceMvpStableId: "text-chat-provider-selection",
    sourceJoinReviewId: "website-copy-code-request",
    sourceResultCaptureReviewId: "website-copy-code-request",
    operatorFacingExplanation:
      "Athena can now explain how website copy/code work would be routed across preview slots while keeping the credential boundary fully opaque and inert.",
    remainingBlockers: [
      "model calls remain blocked",
      "provider execution remains blocked",
      "approval persistence remains blocked",
    ],
    nextSafeAction:
      "Use this preview to verify copy and routing posture before admission work starts.",
  },
  {
    reviewId: "audit-recovery-explanation-request",
    requestLabel: "audit/recovery explanation request",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "local/private text provider slot",
    backupProviderSlotLabel: "fallback disabled slot",
    opaqueCredentialReferenceLabel:
      "opaque credential reference label / athena planning reasoning primary",
    sourceMvpStableId: "planning-reasoning-provider-selection",
    sourceJoinReviewId: "audit-recovery-explanation-request",
    sourceResultCaptureReviewId: "audit-recovery-explanation-request",
    operatorFacingExplanation:
      "Athena can now review recovery posture for a local/private alternative without turning that alternative into an executable provider path.",
    remainingBlockers: [
      "queue dispatch remains blocked",
      "worker dispatch remains blocked",
      "job execution remains blocked",
    ],
    nextSafeAction:
      "Use the recovery preview to confirm manual-review-only posture before any future dry-run admission slice.",
  },
  {
    reviewId: "fallback-disabled-request",
    requestLabel: "fallback disabled request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "fallback disabled slot",
    backupProviderSlotLabel: "local/private text provider slot",
    opaqueCredentialReferenceLabel:
      "opaque credential reference label / athena text chat primary",
    sourceMvpStableId: "text-chat-provider-selection",
    sourceJoinReviewId: "audit-recovery-explanation-request",
    sourceResultCaptureReviewId: "audit-recovery-explanation-request",
    operatorFacingExplanation:
      "Jarvis can now show that fallback stays disabled in the provider selection preview, rather than silently swapping providers or reading any secret.",
    remainingBlockers: [
      "fallback remains disabled",
      "retry remains disabled",
      "dry-run admission remains unimplemented",
    ],
    nextSafeAction:
      "Keep fallback disabled and move next to the dry-run admission MVP only.",
  },
] as const satisfies readonly ProviderSelectionReviewSeed[];

const GATE_FAILURE_SEEDS = [
  ["backend-only-boundary", "backend-only boundary"],
  [
    "server-only-provider-selection-module-boundary",
    "server-only provider selection module boundary",
  ],
  ["provider-selection-fixture-mode", "provider selection fixture mode"],
  [
    "credential-reference-opaque-only-mode",
    "credential reference opaque-only mode",
  ],
  [
    "text-adapter-audit-approval-join-review-dependency",
    "text adapter audit/approval join review dependency",
  ],
  ["deterministic-provider-selection-id", "deterministic provider selection id"],
  ["deterministic-provider-slot-id", "deterministic provider slot id"],
  [
    "deterministic-credential-reference-id",
    "deterministic credential reference id",
  ],
  ["deterministic-selection-digest", "deterministic selection digest"],
  ["supported-capability-family", "supported capability family"],
  ["selected-provider-slot-preview-only", "selected provider slot preview-only"],
  ["backup-provider-slot-preview-only", "backup provider slot preview-only"],
  [
    "local-private-alternative-preview-only",
    "local/private alternative preview-only",
  ],
  ["credential-value-absent", "credential value absent"],
  ["credential-value-not-read", "credential value not read"],
  ["env-vars-not-read", "env vars not read"],
  ["provider-key-not-read", "provider key not read"],
  ["redacted-prompt-envelope-present", "redacted prompt envelope present"],
  ["prompt-not-sent", "prompt not sent"],
  ["provider-sdk-not-imported", "provider SDK not imported"],
  ["provider-response-not-received", "provider response not received"],
  ["model-output-not-generated", "model output not generated"],
  ["manual-approval-fixture", "manual approval fixture"],
  ["manual-confirmation-fixture", "manual confirmation fixture"],
  [
    "in-memory-only-selection-reference",
    "in-memory only selection reference",
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
    "server-only-provider-selection-helper-reviewed",
    "server-only provider selection helper reviewed",
    "reviewed",
    "operator",
  ],
  ["provider-selection-input-reviewed", "provider selection input reviewed", "reviewed", "operator"],
  [
    "provider-selection-admission-check-reviewed",
    "provider selection admission check reviewed",
    "reviewed",
    "operator",
  ],
  ["provider-slot-matrix-reviewed", "provider slot matrix reviewed", "reviewed", "operator"],
  [
    "provider-slot-selection-output-reviewed",
    "provider slot selection output reviewed",
    "reviewed",
    "operator",
  ],
  [
    "opaque-credential-reference-input-reviewed",
    "opaque credential reference input reviewed",
    "reviewed",
    "operator",
  ],
  [
    "opaque-credential-reference-output-reviewed",
    "opaque credential reference output reviewed",
    "reviewed",
    "operator",
  ],
  ["provider-selection-envelope-reviewed", "provider selection envelope reviewed", "reviewed", "operator"],
  ["evidence-preview-reviewed", "evidence preview reviewed", "reviewed", "operator"],
  ["audit-preview-reviewed", "audit preview reviewed", "reviewed", "operator"],
  ["approval-preview-reviewed", "approval preview reviewed", "reviewed", "operator"],
  [
    "text-adapter-audit-approval-join-review-dependency-reviewed",
    "text adapter audit approval join review dependency reviewed",
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
  ["provider-boundary-reviewed", "provider boundary reviewed", "reviewed", "safety review"],
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
    "provider-adapter-dry-run-admission-not-implemented",
    "provider adapter dry-run admission not implemented",
    "backend future required",
    "backend future",
  ],
] as const;

function cloneList<T>(items: readonly T[]): readonly T[] {
  return [...items];
}

function uniqueProviderSelectionReviewDisplayStrings(
  values: readonly string[]
): readonly string[] {
  return [...new Set(values)];
}

function resolveRequiredRecord<T>(
  value: T | undefined,
  message: string
): T {
  if (value === undefined) {
    throw new Error(message);
  }

  return value;
}

function buildStableProviderSelectionCredentialReferenceReviewKey(
  reviewId: ProviderSelectionCredentialReferenceReviewId
): ProviderSelectionCredentialReferenceReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-review:${reviewId}`;
}

function buildStableProviderSelectionOutputReviewKey(
  reviewId: ProviderSelectionCredentialReferenceReviewId
): ProviderSelectionOutputReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-output-review:${reviewId}`;
}

function buildStableProviderSelectionGateFailureReviewKey(
  reviewId: ProviderSelectionCredentialReferenceReviewId,
  gateId: ProviderSelectionGateFailureReviewRecord["failedGateId"]
): ProviderSelectionGateFailureReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-gate-failure-review:${reviewId}:${gateId}`;
}

function buildStableProviderSelectionRecoveryPlanKey(
  reviewId: ProviderSelectionCredentialReferenceReviewId
): ProviderSelectionRecoveryPlanKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-plan:${reviewId}`;
}

function buildStableProviderSelectionRecoveryReadinessChecklistKey(
  reviewId: ProviderSelectionCredentialReferenceReviewId,
  checklistId: ProviderSelectionRecoveryReadinessChecklistId
): ProviderSelectionRecoveryReadinessChecklistKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-readiness:${reviewId}:${checklistId}`;
}

function buildStableProviderSelectionReviewAuditSummaryKey(
  reviewId: ProviderSelectionCredentialReferenceReviewId
): ProviderSelectionReviewAuditSummaryKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-review-audit-summary:${reviewId}`;
}

function buildStableProviderSelectionAcceptancePostureKey(
  reviewId: ProviderSelectionCredentialReferenceReviewId
): ProviderSelectionAcceptancePostureKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-selection-acceptance-posture:${reviewId}`;
}

type ProviderSelectionSourceBundle = Readonly<{
  mvpRecord: ReturnType<
    typeof listMinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecords
  >[number];
  inputRecord: ReturnType<typeof listProviderAdapterSelectionInputs>[number];
  admissionCheckRecord:
    ReturnType<typeof listProviderAdapterSelectionAdmissionChecks>[number];
  slotMatrixRecord: ReturnType<typeof listProviderSlotMatrixRecords>[number];
  outputRecord: ReturnType<typeof listProviderAdapterSelectionOutputs>[number];
  opaqueCredentialInputRecord:
    ReturnType<typeof listOpaqueCredentialReferenceInputs>[number];
  opaqueCredentialOutputRecord:
    ReturnType<typeof listOpaqueCredentialReferenceOutputs>[number];
  envelopeRecord: ReturnType<typeof listProviderAdapterSelectionEnvelopes>[number];
  evidencePreviewRecord:
    ReturnType<typeof listProviderAdapterSelectionEvidencePreviews>[number];
  auditPreviewRecord:
    ReturnType<typeof listProviderAdapterSelectionAuditPreviews>[number];
  approvalPreviewRecord:
    ReturnType<typeof listProviderAdapterSelectionApprovalPreviews>[number];
  safetyGateSummaryRecord:
    ReturnType<typeof listProviderAdapterSelectionSafetyGateSummaries>[number];
  blockedLiveProviderSummaryRecord:
    ReturnType<typeof listProviderAdapterSelectionBlockedLiveProviderSummaries>[number];
  joinReviewRecord:
    ReturnType<typeof listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews>[number];
  joinAcceptancePostureRecord:
    ReturnType<typeof listTextAdapterAuditApprovalJoinAcceptancePostureRecords>[number];
  joinAuditSummaryRecord:
    ReturnType<typeof listTextAdapterAuditApprovalJoinReviewAuditSummaries>[number];
  resultCaptureReviewRecord:
    ReturnType<typeof listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews>[number];
}>;

function resolveSourceBundle(
  seed: ProviderSelectionReviewSeed
): ProviderSelectionSourceBundle {
  const mvpRecord = resolveRequiredRecord(
    listMinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecords().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider selection MVP source for ${seed.reviewId}`
  );
  const inputRecord = resolveRequiredRecord(
    listProviderAdapterSelectionInputs().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider selection input source for ${seed.reviewId}`
  );
  const admissionCheckRecord = resolveRequiredRecord(
    listProviderAdapterSelectionAdmissionChecks().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider selection admission source for ${seed.reviewId}`
  );
  const slotMatrixRecord = resolveRequiredRecord(
    listProviderSlotMatrixRecords().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider slot matrix source for ${seed.reviewId}`
  );
  const outputRecord = resolveRequiredRecord(
    listProviderAdapterSelectionOutputs().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider selection output source for ${seed.reviewId}`
  );
  const opaqueCredentialInputRecord = resolveRequiredRecord(
    listOpaqueCredentialReferenceInputs().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing opaque credential input source for ${seed.reviewId}`
  );
  const opaqueCredentialOutputRecord = resolveRequiredRecord(
    listOpaqueCredentialReferenceOutputs().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing opaque credential output source for ${seed.reviewId}`
  );
  const envelopeRecord = resolveRequiredRecord(
    listProviderAdapterSelectionEnvelopes().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider selection envelope source for ${seed.reviewId}`
  );
  const evidencePreviewRecord = resolveRequiredRecord(
    listProviderAdapterSelectionEvidencePreviews().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider selection evidence preview source for ${seed.reviewId}`
  );
  const auditPreviewRecord = resolveRequiredRecord(
    listProviderAdapterSelectionAuditPreviews().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider selection audit preview source for ${seed.reviewId}`
  );
  const approvalPreviewRecord = resolveRequiredRecord(
    listProviderAdapterSelectionApprovalPreviews().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider selection approval preview source for ${seed.reviewId}`
  );
  const safetyGateSummaryRecord = resolveRequiredRecord(
    listProviderAdapterSelectionSafetyGateSummaries().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider selection safety gate summary source for ${seed.reviewId}`
  );
  const blockedLiveProviderSummaryRecord = resolveRequiredRecord(
    listProviderAdapterSelectionBlockedLiveProviderSummaries().find(
      (record) => record.stableId === seed.sourceMvpStableId
    ),
    `Missing provider selection blocked live summary source for ${seed.reviewId}`
  );
  const joinReviewRecord = resolveRequiredRecord(
    listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews().find(
      (record) => record.id === seed.sourceJoinReviewId
    ),
    `Missing text adapter audit approval join review source for ${seed.reviewId}`
  );
  const joinAcceptancePostureRecord = resolveRequiredRecord(
    listTextAdapterAuditApprovalJoinAcceptancePostureRecords().find(
      (record) => record.id === seed.sourceJoinReviewId
    ),
    `Missing text adapter audit approval join acceptance posture source for ${seed.reviewId}`
  );
  const joinAuditSummaryRecord = resolveRequiredRecord(
    listTextAdapterAuditApprovalJoinReviewAuditSummaries().find(
      (record) => record.id === seed.sourceJoinReviewId
    ),
    `Missing text adapter audit approval join audit summary source for ${seed.reviewId}`
  );
  const resultCaptureReviewRecord = resolveRequiredRecord(
    listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews().find(
      (record) => record.id === seed.sourceResultCaptureReviewId
    ),
    `Missing text adapter result capture review source for ${seed.reviewId}`
  );

  return {
    mvpRecord,
    inputRecord,
    admissionCheckRecord,
    slotMatrixRecord,
    outputRecord,
    opaqueCredentialInputRecord,
    opaqueCredentialOutputRecord,
    envelopeRecord,
    evidencePreviewRecord,
    auditPreviewRecord,
    approvalPreviewRecord,
    safetyGateSummaryRecord,
    blockedLiveProviderSummaryRecord,
    joinReviewRecord,
    joinAcceptancePostureRecord,
    joinAuditSummaryRecord,
    resultCaptureReviewRecord,
  };
}

function buildReviewRecord(
  seed: ProviderSelectionReviewSeed
): ProviderSelectionCredentialReferenceReviewRecord {
  const sourceBundle = resolveSourceBundle(seed);

  return {
    key: buildStableProviderSelectionCredentialReferenceReviewKey(seed.reviewId),
    reviewVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-review-preview-v1",
    reviewId: seed.reviewId,
    requestLabel: seed.requestLabel,
    source: REVIEW_SOURCE,
    reviewMode: REVIEW_MODE,
    reviewPosture: REVIEW_POSTURE,
    sourceProviderSelectionCredentialReferenceMvpReference:
      sourceBundle.mvpRecord.key,
    sourceProviderAdapterSelectionInputReference: sourceBundle.inputRecord.key,
    sourceProviderAdapterSelectionAdmissionCheckReference:
      sourceBundle.admissionCheckRecord.key,
    sourceProviderSlotMatrixReference: sourceBundle.slotMatrixRecord.key,
    sourceProviderSlotSelectionOutputReference: sourceBundle.outputRecord.key,
    sourceOpaqueCredentialReferenceInputReference:
      sourceBundle.opaqueCredentialInputRecord.key,
    sourceOpaqueCredentialReferenceOutputReference:
      sourceBundle.opaqueCredentialOutputRecord.key,
    sourceProviderAdapterSelectionEnvelopeReference:
      sourceBundle.envelopeRecord.key,
    sourceProviderAdapterSelectionEvidencePreviewReference:
      sourceBundle.evidencePreviewRecord.key,
    sourceProviderAdapterSelectionAuditPreviewReference:
      sourceBundle.auditPreviewRecord.key,
    sourceProviderAdapterSelectionApprovalPreviewReference:
      sourceBundle.approvalPreviewRecord.key,
    sourceProviderAdapterSelectionSafetyGateSummaryReference:
      sourceBundle.safetyGateSummaryRecord.key,
    sourceProviderAdapterSelectionBlockedLiveProviderSummaryReference:
      sourceBundle.blockedLiveProviderSummaryRecord.key,
    sourceTextAdapterAuditApprovalJoinReviewReference:
      sourceBundle.joinReviewRecord.key,
    sourceTextAdapterAuditApprovalJoinAcceptancePostureReference:
      sourceBundle.joinAcceptancePostureRecord.key,
    sourceTextAdapterAuditApprovalJoinAuditSummaryReference:
      sourceBundle.joinAuditSummaryRecord.key,
    sourceTextAdapterResultCaptureReviewReference:
      sourceBundle.resultCaptureReviewRecord.key,
    selectedCapabilityFamily: seed.selectedCapabilityFamily,
    workspaceTarget: sourceBundle.mvpRecord.workspaceTarget,
    providerSlotLabel: seed.providerSlotLabel,
    backupProviderSlotLabel: seed.backupProviderSlotLabel,
    localPrivateAlternativeLabel: "local/private text provider slot",
    opaqueCredentialReferenceLabel: seed.opaqueCredentialReferenceLabel,
    serverOnlyProviderSelectionHelperState: "exists",
    providerSlotSelectionState: "deterministic fixture-only",
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
    nextProviderAdapterDryRunAdmissionMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
  };
}

function buildOutputReviewRecord(
  review: ProviderSelectionCredentialReferenceReviewRecord
): ProviderSelectionOutputReviewRecord {
  return {
    key: buildStableProviderSelectionOutputReviewKey(review.reviewId),
    outputReviewVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-output-review-preview-v1",
    providerSelectionReviewId: review.reviewId,
    sourceProviderSlotSelectionOutputReference:
      review.sourceProviderSlotSelectionOutputReference,
    sourceOpaqueCredentialReferenceOutputReference:
      review.sourceOpaqueCredentialReferenceOutputReference,
    sourceProviderAdapterSelectionEnvelopeReference:
      review.sourceProviderAdapterSelectionEnvelopeReference,
    selectionState:
      "selected-provider-slot-and-opaque-credential-reference-fixture-only",
    providerSelectionIdPosture: "deterministic preview id only",
    providerSlotIdPosture: "deterministic preview id only",
    credentialReferenceIdPosture: "deterministic opaque reference id only",
    selectionDigestPosture: "deterministic preview digest only",
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
    outputClassification: "deterministic provider selection fixture only",
    resultPersistenceState: review.resultPersistenceState,
    auditPersistenceState: review.auditPersistenceState,
    approvalPersistenceState: review.approvalPersistenceState,
    operatorFacingExplanation:
      "This output review shows only a deterministic slot selection and an opaque credential reference label; no secret is read and no provider is called.",
    remainingBlockers: [
      "provider execution remains blocked",
      "live prompt transmission remains blocked",
      "result persistence remains blocked",
    ],
    nextSafeAction:
      "Review the dry-run admission MVP requirements before introducing any admission path.",
    explicitProviderSelectionFixtureOnlyNoSecretReadNoProviderCallNoPersistenceStatement:
      FIXTURE_ONLY_STATEMENT,
  };
}

function buildGateFailureSeed(
  gateId: ProviderSelectionGateFailureReviewRecord["failedGateId"],
  label: string
): GateFailureSeed {
  return {
    gateId,
    label,
    severity:
      label.includes("no ") || label.includes("not ")
        ? "critical"
        : label.includes("preview")
          ? "medium"
          : "high",
    requiredEvidence: `${label} evidence must remain explicit before any dry-run admission work can proceed.`,
    recoveryAction: `Preserve ${label} as a preview-only gate and carry the same boundary forward into the dry-run admission MVP.`,
  };
}

function buildReadinessChecklistSeed(
  checklistId: ProviderSelectionRecoveryReadinessChecklistId,
  label: ProviderSelectionRecoveryReadinessChecklistLabel,
  state: ProviderSelectionRecoveryReadinessState,
  owner: ProviderSelectionRecoveryReadinessOwner
): ReadinessChecklistSeed {
  const severity: ProviderSelectionReviewSeverity =
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
        ? `Keep ${label} in the preview-only review packet.`
        : `Leave ${label} blocked until the dry-run admission MVP defines a backend-owned contract.`,
    owner,
    nextSafeAction:
      state === "reviewed"
        ? "Maintain the current preview-only boundary."
        : "Escalate to the backend-owned dry-run admission MVP only.",
  };
}

export function listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews():
  readonly ProviderSelectionCredentialReferenceReviewRecord[] {
  return REVIEW_SEEDS.map((seed) => buildReviewRecord(seed));
}

export function listProviderSelectionOutputReviewRecords():
  readonly ProviderSelectionOutputReviewRecord[] {
  return listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews().map(
    (review) => buildOutputReviewRecord(review)
  );
}

export function listProviderSelectionGateFailureReviewRecords():
  readonly ProviderSelectionGateFailureReviewRecord[] {
  const reviews =
    listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews();

  return GATE_FAILURE_SEEDS.map(([gateId, label], index) => {
    const review = reviews[index % reviews.length];
    const seed = buildGateFailureSeed(gateId, label);

    return {
      key: buildStableProviderSelectionGateFailureReviewKey(
        review.reviewId,
        gateId
      ),
      gateFailureReviewVersion:
        "backend-owned-minimal-manual-gated-provider-adapter-selection-gate-failure-review-preview-v1",
      providerSelectionReviewId: review.reviewId,
      failedGateId: gateId,
      failedGateLabel: label,
      gateState: "blocked",
      severity: seed.severity,
      affectedCapabilityFamily: review.selectedCapabilityFamily,
      affectedWorkspaceTarget: review.workspaceTarget,
      affectedProviderSlot: review.providerSlotLabel,
      affectedCredentialReference: review.opaqueCredentialReferenceLabel,
      operatorFacingExplanation:
        `${label} remains a review-only blocked gate. Athena can explain the boundary but cannot pass it live.`,
      requiredEvidenceToUnblock: seed.requiredEvidence,
      requiredRecoveryAction: seed.recoveryAction,
      providerAdapterDryRunAdmissionMvpDependency:
        NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
      nextSafeAction:
        "Preserve the blocked gate and move next to the backend-owned dry-run admission MVP.",
      explicitNoLiveGatePassStatement: NO_LIVE_GATE_PASS_STATEMENT,
    };
  });
}

export function listProviderSelectionRecoveryPlanPreviews():
  readonly ProviderSelectionRecoveryPlanPreviewRecord[] {
  return listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews().map(
    (review) => ({
      key: buildStableProviderSelectionRecoveryPlanKey(review.reviewId),
      recoveryPlanVersion:
        "backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-plan-preview-v1",
      providerSelectionReviewId: review.reviewId,
      recoveryPosture: RECOVERY_POSTURE,
      serverOnlyProviderSelectionHelperRecovery:
        "Keep the provider selection helper server-only and deterministic.",
      providerSelectionInputRecovery:
        "Preserve backend-only deterministic inputs and avoid frontend creation.",
      providerSelectionAdmissionCheckRecovery:
        "Keep admission checks review-only until the dry-run admission MVP exists.",
      providerSlotMatrixRecovery:
        "Retain a preview-only slot matrix with no executable provider path.",
      providerSlotSelectionOutputRecovery:
        "Limit output to deterministic slot labels and opaque credential references.",
      opaqueCredentialReferenceInputRecovery:
        "Keep credential input opaque and never resolve a secret value.",
      opaqueCredentialReferenceOutputRecovery:
        "Keep credential output as an opaque label only with no persistence.",
      providerSelectionEnvelopeRecovery:
        "Keep the envelope redacted and preview-only with no prompt egress.",
      evidencePreviewRecovery:
        "Keep evidence packets preview-only and non-persistent.",
      auditPreviewRecovery:
        "Retain audit preview coverage without audit persistence.",
      approvalPreviewRecovery:
        "Retain approval preview coverage without real approval requests or recording.",
      credentialReferenceRecovery:
        "Confirm the credential reference remains a label only and never a secret value.",
      credentialValueBoundaryRecovery:
        "Preserve the credential value boundary as absent and unread.",
      envVarBoundaryRecovery:
        "Preserve the env var boundary as unread.",
      providerKeyBoundaryRecovery:
        "Preserve the provider key boundary as unread.",
      providerSdkBoundaryRecovery:
        "Keep provider SDK imports out of the batch.",
      providerExecutionBoundaryRecovery:
        "Keep provider execution blocked.",
      promptBoundaryRecovery:
        "Keep prompt sending blocked.",
      modelBoundaryRecovery:
        "Keep model calls blocked.",
      frontendRequestBoundaryRecovery:
        "Keep frontend requests blocked.",
      apiRouteBoundaryRecovery:
        "Keep API route creation blocked.",
      queueDispatchBlockedRecovery:
        "Leave queue dispatch unimplemented in this preview batch.",
      workerDispatchBlockedRecovery:
        "Leave worker dispatch unimplemented in this preview batch.",
      jobExecutionBlockedRecovery:
        "Leave job execution unimplemented in this preview batch.",
      resultPersistenceMissingRecovery:
        "Keep result persistence out of scope until a future backend batch.",
      auditPersistenceMissingRecovery:
        "Keep audit persistence out of scope until a future backend batch.",
      approvalPersistenceMissingRecovery:
        "Keep approval persistence out of scope until a future backend batch.",
      databaseWriteBlockedRecovery:
        "Keep database writes blocked.",
      fileWriteBlockedRecovery:
        "Keep file writes blocked.",
      dryRunAdmissionMissingRecovery:
        "Implement a backend-owned dry-run admission MVP next instead of executing providers here.",
      retryPosture: RETRY_POSTURE,
      fallbackPosture: FALLBACK_POSTURE,
      operatorActionRequired:
        "Operator review is required before any future dry-run admission work can be accepted.",
      nextSafeBatchRecommendation:
        NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
      explicitNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement:
        NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT,
    })
  );
}

export function listProviderSelectionRecoveryReadinessChecklistRecords():
  readonly ProviderSelectionRecoveryReadinessChecklistRecord[] {
  const representativeReviewId =
    listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews()[0]
      ?.reviewId ?? "conversational-planning-request";

  return READINESS_CHECKLIST_SEEDS.map(
    ([checklistId, label, state, owner]) => {
      const seed = buildReadinessChecklistSeed(
        checklistId,
        label,
        state,
        owner
      );

      return {
        key: buildStableProviderSelectionRecoveryReadinessChecklistKey(
          representativeReviewId,
          checklistId
        ),
        checklistVersion:
          "backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-readiness-checklist-v1",
        providerSelectionReviewId: representativeReviewId,
        checklistId,
        label,
        state: seed.state,
        severity: seed.severity,
        evidenceRequired: seed.evidenceRequired,
        recoveryAction: seed.recoveryAction,
        owner: seed.owner,
        currentPosture: CURRENT_POSTURE,
        providerAdapterDryRunAdmissionMvpDependency:
          NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
        nextSafeAction: seed.nextSafeAction,
      };
    }
  );
}

export function listProviderSelectionReviewAuditSummaries():
  readonly ProviderSelectionReviewAuditSummaryRecord[] {
  return listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews().map(
    (review) => ({
      key: buildStableProviderSelectionReviewAuditSummaryKey(review.reviewId),
      auditSummaryVersion:
        "backend-owned-minimal-manual-gated-provider-adapter-selection-review-audit-summary-preview-v1",
      providerSelectionReviewId: review.reviewId,
      auditPosture: AUDIT_POSTURE,
      selectionReferenceState: "preview-only / not persisted",
      providerSlotReferenceState: "preview-only / not persisted",
      credentialReferenceState: "opaque label only / not persisted",
      credentialValueState: review.credentialValueState,
      envVarState: review.envVarState,
      providerKeyState: review.providerKeyState,
      evidencePacketState: review.evidencePacketState,
      serverOnlySelectionHelperEvidenceSummary:
        "Server-only provider selection helper exists and remains non-executable.",
      deterministicProviderSlotSelectionEvidenceSummary:
        "Provider slot selection remains deterministic fixture-only.",
      opaqueCredentialReferenceEvidenceSummary:
        "Credential references remain opaque labels only.",
      failedGateSummary:
        "All live provider gates remain blocked in preview-only posture.",
      recoverySummary:
        "Recovery remains manual review only with dry-run admission deferred.",
      blockedActionSummary:
        "Provider execution, prompt sending, persistence, and dispatch remain blocked.",
      noSecretReadStatement: "No secret read.",
      noEnvVarReadStatement: "No env var read.",
      noProviderOutputStatement: "No provider output.",
      noModelOutputStatement: "No model output.",
      noPromptSendingStatement: "No prompt sending.",
      noResultPersistenceStatement: "No result persistence.",
      noAuditPersistenceStatement: "No audit persistence.",
      noApprovalPersistenceStatement: "No approval persistence.",
      noDatabaseWriteStatement: "No database write.",
      noFileWriteStatement: "No file write.",
      providerAdapterDryRunAdmissionMvpRequirement:
        NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
    })
  );
}

export function listProviderSelectionAcceptancePostureRecords():
  readonly ProviderSelectionAcceptancePostureRecord[] {
  return listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews().map(
    (review) => ({
      key: buildStableProviderSelectionAcceptancePostureKey(review.reviewId),
      acceptancePostureVersion:
        "backend-owned-minimal-manual-gated-provider-adapter-selection-acceptance-posture-preview-v1",
      providerSelectionReviewId: review.reviewId,
      acceptanceState: ACCEPTANCE_STATE,
      fixtureOnlyAcceptanceSummary:
        "The provider selection credential reference fixture is accepted as a typed preview only.",
      backendOnlyAcceptanceSummary:
        "Backend-only posture is accepted; no frontend-callable path exists.",
      serverOnlyAcceptanceSummary:
        "Server-only provider selection helper remains accepted as non-executable infrastructure.",
      credentialReferenceOnlyAcceptanceSummary:
        "Only opaque credential references are accepted in this slice.",
      opaqueCredentialReferenceAcceptanceSummary:
        "Opaque label-only credential references are accepted; secret values remain out of scope.",
      selectedProviderSlotAcceptanceSummary:
        "Selected provider slot preview is accepted as deterministic display data only.",
      backupProviderSlotAcceptanceSummary:
        "Backup provider slot preview is accepted as deterministic display data only.",
      localPrivateAlternativeAcceptanceSummary:
        "Local/private alternative preview is accepted as a non-executable display path only.",
      providerBlockers: [
        "provider adapter is not provider-capable yet",
        "provider execution remains blocked",
      ],
      credentialValueBlockers: [
        "credential value is not present",
        "credential value is not read",
      ],
      envVarBlockers: ["env vars are not read"],
      promptBlockers: ["prompt sending remains blocked"],
      modelBlockers: ["model calls remain blocked"],
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
      auditBlockers: ["audit preview only", "audit persistence remains blocked"],
      dryRunAdmissionBlockers: [
        "backend-owned provider adapter dry-run admission MVP is not implemented",
      ],
      requiredEvidence: [
        "server-only provider selection helper evidence",
        "deterministic provider slot selection evidence",
        "opaque credential reference evidence",
        "review-only audit summary evidence",
      ],
      nextSafeAction:
        "Accept the fixture-only review layer and move next to the backend-owned provider adapter dry-run admission MVP.",
      explicitProviderSelectionCredentialReferenceFixtureAcceptedLiveProviderExecutionNotAcceptedStatement:
        ACCEPTANCE_STATEMENT,
    })
  );
}

function buildGroupByLabel<T>(
  reviews: readonly ProviderSelectionCredentialReferenceReviewRecord[],
  resolveLabel: (
    review: ProviderSelectionCredentialReferenceReviewRecord
  ) => T
): ReadonlyMap<T, readonly ProviderSelectionCredentialReferenceReviewRecord[]> {
  const map = new Map<T, ProviderSelectionCredentialReferenceReviewRecord[]>();

  for (const review of reviews) {
    const label = resolveLabel(review);
    const existing = map.get(label);
    if (existing) {
      existing.push(review);
    } else {
      map.set(label, [review]);
    }
  }

  return new Map(
    [...map.entries()].map(([label, groupedReviews]) => [label, [...groupedReviews]])
  );
}

export function groupProviderSelectionReviewsByCapabilityFamily():
  readonly ProviderSelectionReviewCapabilityFamilyGroup[] {
  const reviews =
    listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews();

  return [...buildGroupByLabel(reviews, (review) => review.selectedCapabilityFamily).entries()].map(
    ([capabilityFamily, groupedReviews]) => ({
      capabilityFamily,
      reviews: groupedReviews,
    })
  );
}

export function groupProviderSelectionReviewsByProviderSlot():
  readonly ProviderSelectionReviewProviderSlotGroup[] {
  const reviews =
    listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews();

  return [...buildGroupByLabel(reviews, (review) => review.providerSlotLabel).entries()].map(
    ([providerSlot, groupedReviews]) => ({
      providerSlot,
      reviews: groupedReviews,
    })
  );
}

export function groupProviderSelectionReviewsByCredentialReference():
  readonly ProviderSelectionReviewCredentialReferenceGroup[] {
  const reviews =
    listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews();

  return [...buildGroupByLabel(reviews, (review) => review.opaqueCredentialReferenceLabel).entries()].map(
    ([credentialReference, groupedReviews]) => ({
      credentialReference,
      reviews: groupedReviews,
    })
  );
}

export function buildProviderSelectionReviewSummary():
  ProviderSelectionReviewSummary {
  const reviews =
    listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews();

  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-review-summary-v1",
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_SELECTION_AND_CREDENTIAL_REFERENCE_MVP_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_ADMISSION_MVP_BATCH,
    reviewCount: reviews.length,
    currentReadiness: CURRENT_READINESS,
    acceptanceState: ACCEPTANCE_STATE,
    recoveryPosture: RECOVERY_POSTURE,
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildProviderSelectionOutputReviewSummary():
  ProviderSelectionOutputReviewSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-output-review-summary-v1",
    recordCount: listProviderSelectionOutputReviewRecords().length,
    summaryLines: cloneList(OUTPUT_REVIEW_SUMMARY_LINES),
    nextSafeAction:
      "Keep the output review fixture-only and move next to dry-run admission planning.",
  };
}

export function buildProviderSelectionGateFailureSummary():
  ProviderSelectionGateFailureSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-gate-failure-summary-v1",
    recordCount: listProviderSelectionGateFailureReviewRecords().length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    nextSafeAction:
      "Preserve all blocked live gates and carry them forward into the dry-run admission MVP.",
  };
}

export function buildProviderSelectionRecoverySummary():
  ProviderSelectionRecoverySummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-summary-v1",
    planCount: listProviderSelectionRecoveryPlanPreviews().length,
    checklistCount: listProviderSelectionRecoveryReadinessChecklistRecords().length,
    summaryLines: uniqueProviderSelectionReviewDisplayStrings(
      RECOVERY_SUMMARY_LINES
    ),
    nextSafeAction:
      "Recovery remains manual review only; do not add retry, fallback, or execution in this batch.",
  };
}

export function buildProviderAdapterDryRunAdmissionMvpChecklist():
  ProviderAdapterDryRunAdmissionMvpChecklist {
  return cloneList(DRY_RUN_ADMISSION_MVP_CHECKLIST_LINES);
}

export {
  buildStableProviderSelectionAcceptancePostureKey,
  buildStableProviderSelectionCredentialReferenceReviewKey,
  buildStableProviderSelectionGateFailureReviewKey,
  buildStableProviderSelectionOutputReviewKey,
  buildStableProviderSelectionRecoveryPlanKey,
  buildStableProviderSelectionRecoveryReadinessChecklistKey,
  buildStableProviderSelectionReviewAuditSummaryKey,
  uniqueProviderSelectionReviewDisplayStrings,
};
