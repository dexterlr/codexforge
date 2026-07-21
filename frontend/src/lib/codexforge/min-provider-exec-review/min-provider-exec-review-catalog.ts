import {
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews,
  listProviderSelectionAcceptancePostureRecords,
  listProviderSelectionReviewAuditSummaries,
} from "../min-provider-review/min-provider-review-catalog";
import type { ProviderSelectionCredentialReferenceReviewId } from "../min-provider-review/min-provider-review-types";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews,
  listProviderDryRunAdmissionAcceptancePostureRecords,
  listProviderDryRunAdmissionReviewAuditSummaries,
} from "../min-provider-admit-review/min-provider-admit-review-catalog";
import type { ProviderDryRunAdmissionReviewId } from "../min-provider-admit-review/min-provider-admit-review-types";
import {
  listMinimalManualGatedProviderAdapterDryRunExecutionMvpRecords,
  listProviderDryRunApprovalPreviews,
  listProviderDryRunAuditPreviews,
  listProviderDryRunBlockedLiveExecutionSummaries,
  listProviderDryRunEvidencePreviews,
  listProviderDryRunExecutionEnvelopes,
  listProviderDryRunExecutionInputs,
  listProviderDryRunExecutionOutputs,
  listProviderDryRunExecutionPlans,
  listProviderDryRunExecutionReadinessMatrixRecords,
  listProviderDryRunFixtureResponses,
} from "../min-provider-exec/min-provider-exec-catalog";
import type {
  ProviderDryRunExecutionGateId,
  ProviderDryRunExecutionProviderSlotLabel,
} from "../min-provider-exec/min-provider-exec-types";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH,
  type BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord,
  type ProviderAdapterDryRunResultCaptureMvpChecklist,
  type ProviderDryRunExecutionAcceptancePostureKey,
  type ProviderDryRunExecutionAcceptancePostureRecord,
  type ProviderDryRunExecutionAcceptancePostureVersion,
  type ProviderDryRunExecutionAcceptanceState,
  type ProviderDryRunExecutionAcceptanceStatement,
  type ProviderDryRunExecutionAuditPosture,
  type ProviderDryRunExecutionCredentialReferenceAuditState,
  type ProviderDryRunExecutionCurrentPosture,
  type ProviderDryRunExecutionEvidencePacketState,
  type ProviderDryRunExecutionFallbackPosture,
  type ProviderDryRunExecutionFixtureOnlyStatement,
  type ProviderDryRunExecutionGateFailureReviewKey,
  type ProviderDryRunExecutionGateFailureReviewRecord,
  type ProviderDryRunExecutionGateFailureReviewVersion,
  type ProviderDryRunExecutionGateFailureSummary,
  type ProviderDryRunExecutionGateFailureSummaryVersion,
  type ProviderDryRunExecutionNoLiveGatePassStatement,
  type ProviderDryRunExecutionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement,
  type ProviderDryRunExecutionOutputReviewKey,
  type ProviderDryRunExecutionOutputReviewRecord,
  type ProviderDryRunExecutionOutputReviewSummary,
  type ProviderDryRunExecutionOutputReviewSummaryVersion,
  type ProviderDryRunExecutionOutputReviewVersion,
  type ProviderDryRunExecutionRecoveryPlanKey,
  type ProviderDryRunExecutionRecoveryPlanPreviewRecord,
  type ProviderDryRunExecutionRecoveryPlanVersion,
  type ProviderDryRunExecutionRecoveryPosture,
  type ProviderDryRunExecutionRecoveryReadinessChecklistId,
  type ProviderDryRunExecutionRecoveryReadinessChecklistKey,
  type ProviderDryRunExecutionRecoveryReadinessChecklistLabel,
  type ProviderDryRunExecutionRecoveryReadinessChecklistRecord,
  type ProviderDryRunExecutionRecoveryReadinessChecklistVersion,
  type ProviderDryRunExecutionRecoveryReadinessOwner,
  type ProviderDryRunExecutionRecoveryReadinessState,
  type ProviderDryRunExecutionRecoverySummary,
  type ProviderDryRunExecutionRecoverySummaryVersion,
  type ProviderDryRunExecutionRetryPosture,
  type ProviderDryRunSafetyGateSummarySourceReference,
  type ProviderDryRunExecutionReviewAuditSummaryKey,
  type ProviderDryRunExecutionReviewAuditSummaryRecord,
  type ProviderDryRunExecutionReviewAuditSummaryVersion,
  type ProviderDryRunExecutionReviewCapabilityFamilyGroup,
  type ProviderDryRunExecutionReviewCredentialReferenceGroup,
  type ProviderDryRunExecutionReviewCurrentReadiness,
  type ProviderDryRunExecutionReviewId,
  type ProviderDryRunExecutionReviewKey,
  type ProviderDryRunExecutionReviewLabel,
  type ProviderDryRunExecutionReviewMode,
  type ProviderDryRunExecutionReviewPosture,
  type ProviderDryRunExecutionReviewProviderSlotGroup,
  type ProviderDryRunExecutionReviewSeverity,
  type ProviderDryRunExecutionReviewSource,
  type ProviderDryRunExecutionReviewSummary,
  type ProviderDryRunExecutionReviewSummaryVersion,
  type ProviderDryRunExecutionReviewVersion,
} from "./min-provider-exec-review-types";

type ProviderDryRunExecutionReviewSeed = Readonly<{
  reviewId: ProviderDryRunExecutionReviewId;
  reviewLabel: ProviderDryRunExecutionReviewLabel;
  selectedCapabilityFamily: "text/chat" | "planning/reasoning";
  providerSlotLabel: ProviderDryRunExecutionProviderSlotLabel;
  backupProviderSlotLabel: ProviderDryRunExecutionProviderSlotLabel;
  sourceExecutionStableId:
    | "text-chat-provider-dry-run-execution"
    | "planning-reasoning-provider-dry-run-execution";
  sourceAdmissionReviewId: ProviderDryRunAdmissionReviewId;
  sourceProviderSelectionReviewId: ProviderSelectionCredentialReferenceReviewId;
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
}>;

type GateFailureSeed = Readonly<{
  gateId: ProviderDryRunExecutionGateId;
  label: string;
  severity: ProviderDryRunExecutionReviewSeverity;
}>;

type ReadinessChecklistSeed = Readonly<{
  checklistId: ProviderDryRunExecutionRecoveryReadinessChecklistId;
  label: ProviderDryRunExecutionRecoveryReadinessChecklistLabel;
  state: ProviderDryRunExecutionRecoveryReadinessState;
  severity: ProviderDryRunExecutionReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ProviderDryRunExecutionRecoveryReadinessOwner;
  nextSafeAction: string;
}>;

const REVIEW_SOURCE: ProviderDryRunExecutionReviewSource =
  "Athena / Jarvis Model Gateway";
const REVIEW_MODE: ProviderDryRunExecutionReviewMode = "preview-only";
const REVIEW_POSTURE: ProviderDryRunExecutionReviewPosture =
  "minimal provider dry-run execution review / backend-only / dry-run-fixture-only / credential-reference-only / not-live-provider-executing / not persistent";
const CURRENT_READINESS: ProviderDryRunExecutionReviewCurrentReadiness =
  "minimal-provider-dry-run-execution-review-only / backend-only / dry-run-fixture-only / credential-reference-only / not-live-provider-executing / not persistent";
const RECOVERY_POSTURE: ProviderDryRunExecutionRecoveryPosture =
  "manual review only";
const RETRY_POSTURE: ProviderDryRunExecutionRetryPosture = "disabled";
const FALLBACK_POSTURE: ProviderDryRunExecutionFallbackPosture = "disabled";
const AUDIT_POSTURE: ProviderDryRunExecutionAuditPosture = "preview-only";
const ACCEPTANCE_STATE: ProviderDryRunExecutionAcceptanceState =
  "not accepted for live provider execution / provider dry-run execution fixture MVP accepted only";
const FIXTURE_ONLY_STATEMENT: ProviderDryRunExecutionFixtureOnlyStatement =
  "Dry-run execution fixture only. No secret read. No provider call. No persistence.";
const NO_LIVE_GATE_PASS_STATEMENT: ProviderDryRunExecutionNoLiveGatePassStatement =
  "No live gate pass.";
const NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT: ProviderDryRunExecutionNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence.";
const ACCEPTANCE_STATEMENT: ProviderDryRunExecutionAcceptanceStatement =
  "Provider dry-run execution fixture accepted only. Live provider execution not accepted.";
const CURRENT_POSTURE: ProviderDryRunExecutionCurrentPosture = "preview-only";
const EVIDENCE_PACKET_STATE: ProviderDryRunExecutionEvidencePacketState =
  "preview-only / not persisted";
const EXECUTION_REFERENCE_STATE = "preview-only / not persisted" as const;
const FIXTURE_RESPONSE_REFERENCE_STATE = "preview-only / not persisted" as const;
const PROVIDER_SLOT_REFERENCE_STATE = "preview-only / not persisted" as const;
const CREDENTIAL_REFERENCE_AUDIT_STATE: ProviderDryRunExecutionCredentialReferenceAuditState =
  "opaque label only / not persisted";

const REVIEW_SUMMARY_LINES = [
  "backend-owned minimal manual-gated provider adapter dry-run execution review and recovery preview only",
  "provider adapter dry-run execution review is preview-only",
  "server-only provider dry-run execution helper exists",
  "provider dry-run execution is deterministic fixture-only",
  "dry-run fixture response is produced in memory only",
  "live provider execution is blocked",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "backup provider slot is preview-only",
  "local/private alternative is preview-only",
  "provider adapter dry-run execution is not live provider execution",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "provider response is not received from provider",
  "model output is not generated by provider/model",
  "no prompt sending",
  "no LLM/model calls",
  "no frontend provider call",
  "no frontend fetch/network call",
  "no provider SDK imports",
  "no live provider execution",
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
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "backend-owned minimal manual-gated provider adapter dry-run result capture MVP next",
] as const;

const OUTPUT_REVIEW_SUMMARY_LINES = [
  "Provider adapter dry-run execution output review",
  "execution state: executed-provider-dry-run-fixture-in-memory-only",
  "execution mode: deterministic-fixture-only",
  "dry-run fixture response state: produced in memory only",
  "live provider execution state: blocked",
  "provider dry-run execution id posture: deterministic preview id only",
  "provider dry-run admission id posture: deterministic preview id only",
  "provider slot id posture: deterministic preview id only",
  "credential reference id posture: deterministic opaque reference id only",
  "execution digest posture: deterministic preview digest only",
  "selected provider slot posture: preview-only",
  "backup provider slot posture: preview-only",
  "local/private alternative posture: preview-only",
  "credential reference posture: opaque-reference-only",
  "output classification: deterministic dry-run execution fixture only",
  "result persistence state: not implemented",
  "audit persistence state: not implemented",
  "approval persistence state: not implemented",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only dry-run execution module boundary",
  "provider dry-run execution fixture mode",
  "provider dry-run admission review dependency",
  "provider dry-run admission output dependency",
  "credential reference opaque-only mode",
  "deterministic dry-run execution id",
  "deterministic dry-run admission id",
  "deterministic provider slot id",
  "deterministic credential reference id",
  "deterministic execution digest",
  "supported capability family",
  "selected provider slot preview-only",
  "backup provider slot preview-only",
  "local/private alternative preview-only",
  "dry-run intent preview-only",
  "fixture response only",
  "live provider execution blocked",
  "credential value absent",
  "credential value not read",
  "env vars not read",
  "provider key not read",
  "redacted prompt envelope present",
  "prompt not sent",
  "provider SDK not imported",
  "provider response not received from provider",
  "model output not generated by provider/model",
  "manual approval fixture",
  "manual confirmation fixture",
  "in-memory only execution reference",
  "no real approval request",
  "no real approval recording",
  "no approval token issuance",
  "no approval lease issuance",
  "no frontend request",
  "no API route",
  "no fetch/network",
  "no provider SDK import",
  "no live provider execution",
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
  "Provider adapter dry-run execution recovery plan",
  "Provider adapter dry-run execution recovery readiness",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "provider adapter dry-run result capture MVP comes next",
  NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT,
] as const;

const PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_CHECKLIST = [
  "Review backend-owned minimal provider adapter dry-run execution review records before any result capture layer is added.",
  "Keep the server-only provider dry-run execution helper deterministic, fixture-only, credential-reference-only, backend-only, and non-persistent.",
  "Do not add credential value reads, env var reads, provider key reads, provider SDK imports, prompt sending, model calls, provider execution, or plugin execution.",
  "Do not add frontend requests, API routes, network calls, queue dispatch, worker dispatch, job execution, result persistence, audit persistence, approval persistence, database writes, or file writes.",
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
] as const satisfies ProviderAdapterDryRunResultCaptureMvpChecklist;

const REVIEW_SEEDS = [
  {
    reviewId: "openai-compatible-text-provider-dry-run-execution-slot",
    reviewLabel: "OpenAI-compatible text provider dry-run execution slot",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "OpenAI-compatible text provider dry-run execution slot",
    backupProviderSlotLabel:
      "Anthropic-compatible text provider dry-run execution slot",
    sourceExecutionStableId: "text-chat-provider-dry-run-execution",
    sourceAdmissionReviewId: "code-assistance-request",
    sourceProviderSelectionReviewId: "code-assistance-request",
    operatorFacingExplanation:
      "Athena can review the OpenAI-compatible dry-run execution slot as a backend-owned fixture preview without reading credential values or calling a provider.",
    remainingBlockers: [
      "live provider execution remains blocked",
      "provider SDK import remains blocked",
      "result persistence remains blocked",
    ],
    nextSafeAction:
      "Keep the OpenAI-compatible slot preview-only and advance only to the backend-owned dry-run result capture MVP.",
  },
  {
    reviewId: "anthropic-compatible-text-provider-dry-run-execution-slot",
    reviewLabel: "Anthropic-compatible text provider dry-run execution slot",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "Anthropic-compatible text provider dry-run execution slot",
    backupProviderSlotLabel:
      "OpenAI-compatible text provider dry-run execution slot",
    sourceExecutionStableId: "text-chat-provider-dry-run-execution",
    sourceAdmissionReviewId: "website-copy-code-request",
    sourceProviderSelectionReviewId: "website-copy-code-request",
    operatorFacingExplanation:
      "Jarvis can review the Anthropic-compatible dry-run execution slot as a deterministic fallback-safe preview with opaque credential references only.",
    remainingBlockers: [
      "prompt transmission remains blocked",
      "model calls remain blocked",
      "audit persistence remains blocked",
    ],
    nextSafeAction:
      "Use the Anthropic-compatible review preview to confirm operator posture before the backend-owned result capture MVP.",
  },
  {
    reviewId: "gemini-compatible-text-provider-dry-run-execution-slot",
    reviewLabel: "Gemini-compatible text provider dry-run execution slot",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "Gemini-compatible text provider dry-run execution slot",
    backupProviderSlotLabel:
      "OpenAI-compatible text provider dry-run execution slot",
    sourceExecutionStableId: "planning-reasoning-provider-dry-run-execution",
    sourceAdmissionReviewId: "conversational-planning-request",
    sourceProviderSelectionReviewId: "conversational-planning-request",
    operatorFacingExplanation:
      "Athena can review the Gemini-compatible planning slot as a deterministic execution fixture only, with no prompt transmission and no provider output.",
    remainingBlockers: [
      "live provider execution remains blocked",
      "queue and worker dispatch remain blocked",
      "database and file writes remain blocked",
    ],
    nextSafeAction:
      "Keep the planning slot review-only and move to result capture without enabling any live provider execution path.",
  },
  {
    reviewId: "local-private-text-provider-dry-run-execution-slot",
    reviewLabel: "local/private text provider dry-run execution slot",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "local/private text provider dry-run execution slot",
    backupProviderSlotLabel:
      "OpenAI-compatible text provider dry-run execution slot",
    sourceExecutionStableId: "text-chat-provider-dry-run-execution",
    sourceAdmissionReviewId: "audit-recovery-explanation-request",
    sourceProviderSelectionReviewId: "audit-recovery-explanation-request",
    operatorFacingExplanation:
      "Athena can review the local/private alternative as a preview-only dry-run execution slot without any provider SDK import or credential read.",
    remainingBlockers: [
      "frontend request creation remains blocked",
      "API route creation remains blocked",
      "approval persistence remains blocked",
    ],
    nextSafeAction:
      "Keep the local/private alternative in preview-only posture until result capture remains fully backend-only and non-persistent.",
  },
  {
    reviewId: "fallback-disabled-dry-run-execution-slot",
    reviewLabel: "fallback disabled dry-run execution slot",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "fallback disabled dry-run execution slot",
    backupProviderSlotLabel:
      "local/private text provider dry-run execution slot",
    sourceExecutionStableId: "planning-reasoning-provider-dry-run-execution",
    sourceAdmissionReviewId: "fallback-disabled-request",
    sourceProviderSelectionReviewId: "fallback-disabled-request",
    operatorFacingExplanation:
      "Athena can review the fallback-disabled slot as an explicit no-retry, no-fallback, no-live-execution preview record.",
    remainingBlockers: [
      "fallback remains disabled",
      "retry remains disabled",
      "result capture remains unimplemented",
    ],
    nextSafeAction:
      "Keep fallback disabled and advance only to result capture preview records that preserve the same blocked posture.",
  },
  {
    reviewId: "conversational-planning-request",
    reviewLabel: "conversational planning request",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "Gemini-compatible text provider dry-run execution slot",
    backupProviderSlotLabel:
      "OpenAI-compatible text provider dry-run execution slot",
    sourceExecutionStableId: "planning-reasoning-provider-dry-run-execution",
    sourceAdmissionReviewId: "conversational-planning-request",
    sourceProviderSelectionReviewId: "conversational-planning-request",
    operatorFacingExplanation:
      "Athena can review the conversational planning dry-run execution path as a deterministic fixture-only preview request.",
    remainingBlockers: [
      "live provider execution remains blocked",
      "prompt sending remains blocked",
      "result persistence remains blocked",
    ],
    nextSafeAction:
      "Confirm the planning request review posture and defer all live execution work to future backend-only batches.",
  },
  {
    reviewId: "code-assistance-request",
    reviewLabel: "code assistance request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "OpenAI-compatible text provider dry-run execution slot",
    backupProviderSlotLabel:
      "Anthropic-compatible text provider dry-run execution slot",
    sourceExecutionStableId: "text-chat-provider-dry-run-execution",
    sourceAdmissionReviewId: "code-assistance-request",
    sourceProviderSelectionReviewId: "code-assistance-request",
    operatorFacingExplanation:
      "Jarvis can review code assistance dry-run execution posture with deterministic slot labels and opaque credential references only.",
    remainingBlockers: [
      "model calls remain blocked",
      "provider responses remain blocked",
      "approval joins remain blocked",
    ],
    nextSafeAction:
      "Use the code assistance review preview to verify boundaries before adding backend-owned result capture references.",
  },
  {
    reviewId: "website-copy-code-request",
    reviewLabel: "website copy/code request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "Anthropic-compatible text provider dry-run execution slot",
    backupProviderSlotLabel:
      "Gemini-compatible text provider dry-run execution slot",
    sourceExecutionStableId: "text-chat-provider-dry-run-execution",
    sourceAdmissionReviewId: "website-copy-code-request",
    sourceProviderSelectionReviewId: "website-copy-code-request",
    operatorFacingExplanation:
      "Athena can review website copy/code dry-run execution posture as an inert preview that never sends prompts and never reads secrets.",
    remainingBlockers: [
      "frontend networking remains blocked",
      "worker and job execution remain blocked",
      "file writes remain blocked",
    ],
    nextSafeAction:
      "Keep website copy/code preview-only and add only backend-safe result capture review records next.",
  },
  {
    reviewId: "audit-recovery-explanation-request",
    reviewLabel: "audit/recovery explanation request",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "local/private text provider dry-run execution slot",
    backupProviderSlotLabel:
      "fallback disabled dry-run execution slot",
    sourceExecutionStableId: "planning-reasoning-provider-dry-run-execution",
    sourceAdmissionReviewId: "audit-recovery-explanation-request",
    sourceProviderSelectionReviewId: "audit-recovery-explanation-request",
    operatorFacingExplanation:
      "Athena can review audit and recovery explanation posture across the local/private and fallback-disabled dry-run execution previews without enabling any execution path.",
    remainingBlockers: [
      "audit persistence remains blocked",
      "approval persistence remains blocked",
      "result capture remains unimplemented",
    ],
    nextSafeAction:
      "Use the audit/recovery preview to confirm blocked posture before adding deterministic result capture references in the next batch.",
  },
] as const satisfies readonly ProviderDryRunExecutionReviewSeed[];

const GATE_FAILURE_SEEDS = [
  { gateId: "backend-only-boundary", label: "backend-only boundary", severity: "critical" },
  { gateId: "server-only-dry-run-execution-module-boundary", label: "server-only dry-run execution module boundary", severity: "critical" },
  { gateId: "provider-dry-run-execution-fixture-mode", label: "provider dry-run execution fixture mode", severity: "high" },
  { gateId: "provider-dry-run-admission-review-dependency", label: "provider dry-run admission review dependency", severity: "high" },
  { gateId: "provider-dry-run-admission-output-dependency", label: "provider dry-run admission output dependency", severity: "high" },
  { gateId: "credential-reference-opaque-only-mode", label: "credential reference opaque-only mode", severity: "critical" },
  { gateId: "deterministic-provider-dry-run-execution-id", label: "deterministic dry-run execution id", severity: "medium" },
  { gateId: "deterministic-provider-dry-run-admission-id", label: "deterministic dry-run admission id", severity: "medium" },
  { gateId: "deterministic-provider-slot-id", label: "deterministic provider slot id", severity: "medium" },
  { gateId: "deterministic-credential-reference-id", label: "deterministic credential reference id", severity: "medium" },
  { gateId: "deterministic-execution-digest", label: "deterministic execution digest", severity: "medium" },
  { gateId: "supported-capability-family", label: "supported capability family", severity: "medium" },
  { gateId: "selected-provider-slot-preview-only", label: "selected provider slot preview-only", severity: "medium" },
  { gateId: "backup-provider-slot-preview-only", label: "backup provider slot preview-only", severity: "medium" },
  { gateId: "local-private-alternative-preview-only", label: "local/private alternative preview-only", severity: "medium" },
  { gateId: "dry-run-intent-preview-only", label: "dry-run intent preview-only", severity: "medium" },
  { gateId: "fixture-response-only", label: "fixture response only", severity: "high" },
  { gateId: "live-provider-execution-blocked", label: "live provider execution blocked", severity: "critical" },
  { gateId: "credential-value-absent", label: "credential value absent", severity: "critical" },
  { gateId: "credential-value-not-read", label: "credential value not read", severity: "critical" },
  { gateId: "env-vars-not-read", label: "env vars not read", severity: "critical" },
  { gateId: "provider-key-not-read", label: "provider key not read", severity: "critical" },
  { gateId: "redacted-prompt-envelope-present", label: "redacted prompt envelope present", severity: "high" },
  { gateId: "prompt-not-sent", label: "prompt not sent", severity: "critical" },
  { gateId: "provider-sdk-not-imported", label: "provider SDK not imported", severity: "critical" },
  { gateId: "provider-response-not-received-from-provider", label: "provider response not received from provider", severity: "high" },
  { gateId: "model-output-not-generated-by-provider-model", label: "model output not generated by provider/model", severity: "high" },
  { gateId: "manual-approval-fixture", label: "manual approval fixture", severity: "medium" },
  { gateId: "manual-confirmation-fixture", label: "manual confirmation fixture", severity: "medium" },
  { gateId: "in-memory-only-execution-reference", label: "in-memory only execution reference", severity: "high" },
  { gateId: "no-real-approval-request", label: "no real approval request", severity: "critical" },
  { gateId: "no-real-approval-recording", label: "no real approval recording", severity: "critical" },
  { gateId: "no-approval-token-issuance", label: "no approval token issuance", severity: "critical" },
  { gateId: "no-approval-lease-issuance", label: "no approval lease issuance", severity: "critical" },
  { gateId: "no-frontend-request", label: "no frontend request", severity: "critical" },
  { gateId: "no-api-route", label: "no API route", severity: "critical" },
  { gateId: "no-fetch-network", label: "no fetch/network", severity: "critical" },
  { gateId: "no-provider-sdk-import", label: "no provider SDK import", severity: "critical" },
  { gateId: "no-live-provider-execution", label: "no live provider execution", severity: "critical" },
  { gateId: "no-model-call", label: "no model call", severity: "critical" },
  { gateId: "no-prompt-sending", label: "no prompt sending", severity: "critical" },
  { gateId: "no-queue-dispatch", label: "no queue dispatch", severity: "critical" },
  { gateId: "no-worker-dispatch", label: "no worker dispatch", severity: "critical" },
  { gateId: "no-job-execution", label: "no job execution", severity: "critical" },
  { gateId: "no-result-persistence", label: "no result persistence", severity: "critical" },
  { gateId: "no-audit-persistence", label: "no audit persistence", severity: "critical" },
  { gateId: "no-approval-persistence", label: "no approval persistence", severity: "critical" },
  { gateId: "no-database-write", label: "no database write", severity: "critical" },
  { gateId: "no-file-write", label: "no file write", severity: "critical" },
  { gateId: "single-run-lock-preview", label: "single-run lock preview", severity: "medium" },
  { gateId: "idempotency-replay-preview", label: "idempotency/replay preview", severity: "medium" },
  { gateId: "timeout-cancel-preview", label: "timeout/cancel preview", severity: "medium" },
  { gateId: "privacy-redaction-preview", label: "privacy/redaction preview", severity: "medium" },
  { gateId: "kill-switch-fixture", label: "kill switch fixture", severity: "medium" },
] as const satisfies readonly GateFailureSeed[];

const READINESS_CHECKLIST_SEEDS = [
  {
    checklistId: "server-only-provider-dry-run-execution-helper-reviewed",
    label: "server-only provider dry-run execution helper reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Server-only helper evidence shows deterministic fixture-only execution output and no frontend exposure.",
    recoveryAction:
      "Keep the server-only helper review-only and do not expose it to frontend callers.",
    owner: "operator",
    nextSafeAction:
      "Confirm the server-only helper stays review-only before adding result capture previews.",
  },
  {
    checklistId: "dry-run-execution-input-reviewed",
    label: "dry-run execution input reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Input preview shows opaque credential labels only and no credential value reads.",
    recoveryAction:
      "Keep input previews redacted, deterministic, and backend-only.",
    owner: "operator",
    nextSafeAction:
      "Preserve input redaction before any result capture additions.",
  },
  {
    checklistId: "dry-run-execution-plan-reviewed",
    label: "dry-run execution plan reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Execution plan preview shows blocked live actions and deterministic fixture checks only.",
    recoveryAction:
      "Keep execution plan preview-only and preserve blocked live action coverage.",
    owner: "operator",
    nextSafeAction:
      "Carry the blocked plan posture into the result capture MVP.",
  },
  {
    checklistId: "dry-run-execution-output-reviewed",
    label: "dry-run execution output reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Output review records show deterministic in-memory fixture output only.",
    recoveryAction:
      "Preserve in-memory fixture output posture and avoid persistence.",
    owner: "operator",
    nextSafeAction:
      "Add only non-persistent result capture previews next.",
  },
  {
    checklistId: "dry-run-execution-envelope-reviewed",
    label: "dry-run execution envelope reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Envelope preview shows redacted prompt references only and no transmitted payload.",
    recoveryAction:
      "Keep the envelope redacted and unsent.",
    owner: "operator",
    nextSafeAction:
      "Retain redacted envelopes in the result capture MVP.",
  },
  {
    checklistId: "dry-run-fixture-response-reviewed",
    label: "dry-run fixture response reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Fixture response review confirms output is produced in memory only.",
    recoveryAction:
      "Preserve deterministic fixture response generation and avoid provider output.",
    owner: "operator",
    nextSafeAction:
      "Reference the fixture response in result capture previews only.",
  },
  {
    checklistId: "dry-run-blocked-live-execution-summary-reviewed",
    label: "dry-run blocked live execution summary reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Blocked live execution summary lists approval, provider, model, network, and persistence blockers.",
    recoveryAction:
      "Preserve the blocked live execution summary across future backend-only batches.",
    owner: "operator",
    nextSafeAction:
      "Keep live execution blocked while adding result capture previews.",
  },
  {
    checklistId: "evidence-preview-reviewed",
    label: "evidence preview reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Evidence preview confirms references remain preview-only and not persisted.",
    recoveryAction:
      "Retain preview-only evidence references and avoid persistence.",
    owner: "operator",
    nextSafeAction:
      "Keep evidence previews inert while result capture remains non-persistent.",
  },
  {
    checklistId: "audit-preview-reviewed",
    label: "audit preview reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Audit preview confirms no audit persistence and no secret reads.",
    recoveryAction:
      "Preserve preview-only audit summaries and avoid durable audit joins.",
    owner: "safety review",
    nextSafeAction:
      "Carry audit preview posture into the next backend-only batch.",
  },
  {
    checklistId: "approval-preview-reviewed",
    label: "approval preview reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Approval preview shows fixture-only approval state, no token issuance, and no lease creation.",
    recoveryAction:
      "Keep approval previews fixture-only and non-persistent.",
    owner: "safety review",
    nextSafeAction:
      "Preserve approval preview boundaries during result capture work.",
  },
  {
    checklistId: "provider-dry-run-admission-review-dependency-reviewed",
    label: "provider dry-run admission review dependency reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired:
      "Admission review dependency references remain linked to deterministic backend-only review records.",
    recoveryAction:
      "Keep admission review references stable and preview-only.",
    owner: "operator",
    nextSafeAction:
      "Retain admission review linkage while adding result capture previews.",
  },
  {
    checklistId: "provider-dry-run-admission-output-dependency-reviewed",
    label: "provider dry-run admission output dependency reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired:
      "Admission output dependency remains deterministic and blocked from live execution.",
    recoveryAction:
      "Preserve admission output dependency as a preview-only prerequisite.",
    owner: "operator",
    nextSafeAction:
      "Keep admission output dependency intact before any result capture references.",
  },
  {
    checklistId: "selected-provider-slot-reviewed",
    label: "selected provider slot reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Selected provider slot remains preview-only and not live-executed.",
    recoveryAction:
      "Keep the selected slot preview-only.",
    owner: "operator",
    nextSafeAction:
      "Retain selected slot preview posture in the next batch.",
  },
  {
    checklistId: "backup-provider-slot-reviewed",
    label: "backup provider slot reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Backup provider slot remains preview-only and not live-executed.",
    recoveryAction:
      "Keep the backup slot preview-only.",
    owner: "operator",
    nextSafeAction:
      "Carry backup slot preview posture forward.",
  },
  {
    checklistId: "local-private-alternative-reviewed",
    label: "local/private alternative reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Local/private alternative remains preview-only and non-executing.",
    recoveryAction:
      "Keep the local/private alternative inert and review-only.",
    owner: "operator",
    nextSafeAction:
      "Keep the local/private alternative in preview-only posture.",
  },
  {
    checklistId: "opaque-credential-reference-reviewed",
    label: "opaque credential reference reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired:
      "Credential references remain opaque labels only and never expose values.",
    recoveryAction:
      "Preserve opaque credential reference labels only.",
    owner: "safety review",
    nextSafeAction:
      "Do not widen credential reference handling beyond opaque labels.",
  },
  {
    checklistId: "credential-value-absent-reviewed",
    label: "credential value absent reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired:
      "Review records confirm credential values are not present.",
    recoveryAction:
      "Keep credential values absent from all review and result capture records.",
    owner: "safety review",
    nextSafeAction:
      "Continue to exclude credential values entirely.",
  },
  {
    checklistId: "credential-value-not-read-reviewed",
    label: "credential value not read reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired:
      "Review records confirm credential values are not read.",
    recoveryAction:
      "Keep credential value reads out of the backend-owned preview path.",
    owner: "safety review",
    nextSafeAction:
      "Do not introduce credential value reads in the next batch.",
  },
  {
    checklistId: "env-vars-not-read-reviewed",
    label: "env vars not read reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired:
      "Review records confirm env vars are not read.",
    recoveryAction:
      "Preserve the no-env-read boundary across all preview and result capture code.",
    owner: "safety review",
    nextSafeAction:
      "Keep env var reads fully blocked.",
  },
  {
    checklistId: "provider-key-not-read-reviewed",
    label: "provider key not read reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired:
      "Review records confirm provider keys are not read.",
    recoveryAction:
      "Keep provider key reads fully blocked.",
    owner: "safety review",
    nextSafeAction:
      "Do not introduce provider key access.",
  },
  {
    checklistId: "provider-sdk-import-boundary-reviewed",
    label: "provider SDK import boundary reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired:
      "Review records confirm provider SDKs are not imported.",
    recoveryAction:
      "Keep provider SDK imports out of the preview layer.",
    owner: "safety review",
    nextSafeAction:
      "Preserve the no-provider-SDK boundary in the next batch.",
  },
  {
    checklistId: "live-provider-execution-boundary-reviewed",
    label: "live provider execution boundary reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired:
      "Review records confirm live provider execution remains blocked.",
    recoveryAction:
      "Keep live provider execution blocked.",
    owner: "safety review",
    nextSafeAction:
      "Advance only with result capture previews that do not execute providers.",
  },
  {
    checklistId: "redacted-prompt-envelope-reviewed",
    label: "redacted prompt envelope reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired:
      "Redacted prompt envelope stays preview-only and never includes provider-ready payloads.",
    recoveryAction:
      "Preserve prompt redaction and preview-only references.",
    owner: "safety review",
    nextSafeAction:
      "Keep prompt envelopes redacted in the next batch.",
  },
  {
    checklistId: "prompt-transmission-blocked-reviewed",
    label: "prompt transmission blocked reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired:
      "Review records confirm prompts are not sent.",
    recoveryAction:
      "Keep prompt transmission fully blocked.",
    owner: "safety review",
    nextSafeAction:
      "Do not add prompt transmission in result capture.",
  },
  {
    checklistId: "manual-approval-fixture-reviewed",
    label: "manual approval fixture reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Manual approval remains a preview-only fixture and not a real approval flow.",
    recoveryAction:
      "Keep manual approval as a fixture only.",
    owner: "operator",
    nextSafeAction:
      "Carry manual approval fixture posture into the next batch.",
  },
  {
    checklistId: "manual-confirmation-fixture-reviewed",
    label: "manual confirmation fixture reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Manual confirmation remains a preview-only fixture and not a captured approval state.",
    recoveryAction:
      "Keep manual confirmation as a fixture only.",
    owner: "operator",
    nextSafeAction:
      "Keep manual confirmation preview-only.",
  },
  {
    checklistId: "kill-switch-fixture-reviewed",
    label: "kill switch fixture reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired:
      "Kill switch remains an inactive fixture only.",
    recoveryAction:
      "Retain the kill switch as a preview-only fixture.",
    owner: "safety review",
    nextSafeAction:
      "Preserve kill switch fixture posture across result capture work.",
  },
  {
    checklistId: "model-boundary-reviewed",
    label: "model boundary reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired:
      "Review records confirm no models are called and no model output is generated by a provider/model.",
    recoveryAction:
      "Keep model calls blocked and outputs provider-free.",
    owner: "safety review",
    nextSafeAction:
      "Do not add model calls in the next batch.",
  },
  {
    checklistId: "frontend-request-boundary-reviewed",
    label: "frontend request boundary reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired:
      "Review records confirm no frontend request is created.",
    recoveryAction:
      "Keep the frontend request boundary closed.",
    owner: "safety review",
    nextSafeAction:
      "Preserve the no-frontend-request boundary.",
  },
  {
    checklistId: "api-route-boundary-reviewed",
    label: "API route boundary reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired:
      "Review records confirm no API route is created.",
    recoveryAction:
      "Keep API route creation blocked.",
    owner: "safety review",
    nextSafeAction:
      "Do not introduce API routes in the next batch.",
  },
  {
    checklistId: "queue-dispatch-still-blocked",
    label: "queue dispatch still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Queue dispatch remains blocked across all dry-run execution review records.",
    recoveryAction:
      "Do not add queue dispatch in review or result capture layers.",
    owner: "backend future",
    nextSafeAction:
      "Keep queue dispatch blocked while result capture remains preview-only.",
  },
  {
    checklistId: "worker-dispatch-still-blocked",
    label: "worker dispatch still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Worker dispatch remains blocked across all dry-run execution review records.",
    recoveryAction:
      "Do not add worker dispatch in review or result capture layers.",
    owner: "backend future",
    nextSafeAction:
      "Keep worker dispatch blocked while result capture remains preview-only.",
  },
  {
    checklistId: "job-execution-still-blocked",
    label: "job execution still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Job execution remains blocked across all dry-run execution review records.",
    recoveryAction:
      "Do not add job execution in review or result capture layers.",
    owner: "backend future",
    nextSafeAction:
      "Keep job execution blocked while result capture remains preview-only.",
  },
  {
    checklistId: "result-persistence-still-blocked",
    label: "result persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Result persistence remains unimplemented across all execution review records.",
    recoveryAction:
      "Keep result persistence unimplemented in the review layer.",
    owner: "backend future",
    nextSafeAction:
      "Only preview result capture references next; do not persist them.",
  },
  {
    checklistId: "audit-persistence-still-blocked",
    label: "audit persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Audit persistence remains unimplemented across all execution review records.",
    recoveryAction:
      "Keep audit persistence unimplemented.",
    owner: "backend future",
    nextSafeAction:
      "Retain non-persistent audit previews in the next batch.",
  },
  {
    checklistId: "approval-persistence-still-blocked",
    label: "approval persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Approval persistence remains unimplemented across all execution review records.",
    recoveryAction:
      "Keep approval persistence unimplemented.",
    owner: "backend future",
    nextSafeAction:
      "Keep approval joins preview-only and non-persistent.",
  },
  {
    checklistId: "database-writes-still-blocked",
    label: "database writes still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Database writes remain blocked across all execution review records.",
    recoveryAction:
      "Do not add database writes in this review family.",
    owner: "backend future",
    nextSafeAction:
      "Keep database writes blocked in the next batch.",
  },
  {
    checklistId: "file-writes-still-blocked",
    label: "file writes still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "File writes remain blocked across all execution review records.",
    recoveryAction:
      "Do not add file writes in this review family.",
    owner: "backend future",
    nextSafeAction:
      "Keep file writes blocked in the next batch.",
  },
  {
    checklistId: "provider-adapter-dry-run-result-capture-not-implemented",
    label: "provider adapter dry-run result capture not implemented",
    state: "backend future required",
    severity: "high",
    evidenceRequired:
      "The next backend-owned result capture MVP is not implemented in this batch.",
    recoveryAction:
      "Advance to the backend-owned minimal manual-gated provider adapter dry-run result capture MVP without enabling live execution or persistence.",
    owner: "backend future",
    nextSafeAction:
      "Advance only to the backend-owned dry-run result capture MVP.",
  },
] as const satisfies readonly ReadinessChecklistSeed[];

function cloneList<T>(records: readonly T[]): readonly T[] {
  return [...records];
}

function uniqueStrings(values: readonly string[]): readonly string[] {
  return Array.from(new Set(values));
}

function resolveRequiredRecord<T>(record: T | undefined, message: string): T {
  if (!record) {
    throw new Error(message);
  }

  return record;
}

function buildMapByStableId<T extends Readonly<{ stableId: string }>>(
  records: readonly T[]
): ReadonlyMap<string, T> {
  return new Map(records.map((record) => [record.stableId, record] as const));
}

function buildMapByReviewId<T extends Readonly<{ reviewId: string }>>(
  records: readonly T[]
): ReadonlyMap<string, T> {
  return new Map(records.map((record) => [record.reviewId, record] as const));
}

function buildMapByAdmissionReviewId<
  T extends Readonly<{ providerDryRunAdmissionReviewId: string }>
>(records: readonly T[]): ReadonlyMap<string, T> {
  return new Map(
    records.map((record) => [record.providerDryRunAdmissionReviewId, record] as const)
  );
}

function buildMapByProviderSelectionReviewId<
  T extends Readonly<{ providerSelectionReviewId: string }>
>(records: readonly T[]): ReadonlyMap<string, T> {
  return new Map(
    records.map((record) => [record.providerSelectionReviewId, record] as const)
  );
}

function groupReviewRecordsByCapabilityFamily(
  records: readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord[]
): readonly ProviderDryRunExecutionReviewCapabilityFamilyGroup[] {
  const grouped = new Map<
    BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord["selectedCapabilityFamily"],
    BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord[]
  >();

  records.forEach((record) => {
    const existing = grouped.get(record.selectedCapabilityFamily);

    if (existing) {
      existing.push(record);
      return;
    }

    grouped.set(record.selectedCapabilityFamily, [record]);
  });

  return Array.from(grouped.entries(), ([capabilityFamily, items]) => ({
    capabilityFamily,
    reviews: cloneList(items),
  }));
}

function groupReviewRecordsByProviderSlot(
  records: readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord[]
): readonly ProviderDryRunExecutionReviewProviderSlotGroup[] {
  const grouped = new Map<
    BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord["providerSlotLabel"],
    BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord[]
  >();

  records.forEach((record) => {
    const existing = grouped.get(record.providerSlotLabel);

    if (existing) {
      existing.push(record);
      return;
    }

    grouped.set(record.providerSlotLabel, [record]);
  });

  return Array.from(grouped.entries(), ([providerSlot, items]) => ({
    providerSlot,
    reviews: cloneList(items),
  }));
}

function groupReviewRecordsByCredentialReference(
  records: readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord[]
): readonly ProviderDryRunExecutionReviewCredentialReferenceGroup[] {
  const grouped = new Map<
    BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord["opaqueCredentialReferenceLabel"],
    BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord[]
  >();

  records.forEach((record) => {
    const existing = grouped.get(record.opaqueCredentialReferenceLabel);

    if (existing) {
      existing.push(record);
      return;
    }

    grouped.set(record.opaqueCredentialReferenceLabel, [record]);
  });

  return Array.from(grouped.entries(), ([credentialReference, items]) => ({
    credentialReference,
    reviews: cloneList(items),
  }));
}

function buildOperatorFacingGateExplanation(
  review: BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord,
  gate: GateFailureSeed
): string {
  return `Athena flags ${gate.label} as a review-only blocker on ${review.reviewLabel}; live provider execution remains blocked and no secrets are read.`;
}

function buildRequiredEvidenceToUnblock(gate: GateFailureSeed): string {
  return `Deterministic preview evidence confirming ${gate.label} remains satisfied in the backend-only dry-run execution review layer without provider calls, prompt sending, or persistence.`;
}

function buildRequiredRecoveryAction(gate: GateFailureSeed): string {
  return `Keep ${gate.label} enforced in the preview layer and defer all live execution and persistence work to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH}.`;
}

function buildFailedGateSummaryLine(
  review: BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord
): string {
  return `${review.reviewLabel}: blocked gates remain preview-only and prevent live provider execution.`;
}

function buildRecoverySummaryLine(
  review: BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord
): string {
  return `${review.reviewLabel}: recovery remains manual review only, retry disabled, fallback disabled.`;
}

function buildSafetyGateSummaryReference(
  stableId: (typeof executionMvpRecords)[number]["stableId"]
): ProviderDryRunSafetyGateSummarySourceReference {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-safety-gate-summary:${stableId}`;
}

const executionMvpRecords = listMinimalManualGatedProviderAdapterDryRunExecutionMvpRecords();
const executionInputs = listProviderDryRunExecutionInputs();
const executionPlans = listProviderDryRunExecutionPlans();
const executionOutputs = listProviderDryRunExecutionOutputs();
const executionEnvelopes = listProviderDryRunExecutionEnvelopes();
const fixtureResponses = listProviderDryRunFixtureResponses();
const blockedLiveExecutionSummaries =
  listProviderDryRunBlockedLiveExecutionSummaries();
const evidencePreviews = listProviderDryRunEvidencePreviews();
const auditPreviews = listProviderDryRunAuditPreviews();
const approvalPreviews = listProviderDryRunApprovalPreviews();
const readinessMatrixRecords = listProviderDryRunExecutionReadinessMatrixRecords();

const admissionReviewRecords =
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews();
const admissionAcceptancePostureRecords =
  listProviderDryRunAdmissionAcceptancePostureRecords();
const admissionAuditSummaryRecords =
  listProviderDryRunAdmissionReviewAuditSummaries();

const selectionReviewRecords =
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews();
const selectionAcceptancePostureRecords =
  listProviderSelectionAcceptancePostureRecords();
const selectionAuditSummaryRecords = listProviderSelectionReviewAuditSummaries();

const executionMvpByStableId = buildMapByStableId(executionMvpRecords);
const executionInputByStableId = buildMapByStableId(executionInputs);
const executionPlanByStableId = buildMapByStableId(executionPlans);
const executionOutputByStableId = buildMapByStableId(executionOutputs);
const executionEnvelopeByStableId = buildMapByStableId(executionEnvelopes);
const fixtureResponseByStableId = buildMapByStableId(fixtureResponses);
const blockedSummaryByStableId = buildMapByStableId(blockedLiveExecutionSummaries);
const evidencePreviewByStableId = buildMapByStableId(evidencePreviews);
const auditPreviewByStableId = buildMapByStableId(auditPreviews);
const approvalPreviewByStableId = buildMapByStableId(approvalPreviews);
const readinessMatrixByStableId = buildMapByStableId(readinessMatrixRecords);

const admissionReviewById = buildMapByReviewId(admissionReviewRecords);
const admissionAcceptanceById = buildMapByAdmissionReviewId(
  admissionAcceptancePostureRecords
);
const admissionAuditSummaryById = buildMapByAdmissionReviewId(
  admissionAuditSummaryRecords
);

const selectionReviewById = buildMapByReviewId(selectionReviewRecords);
const selectionAcceptanceById = buildMapByProviderSelectionReviewId(
  selectionAcceptancePostureRecords
);
const selectionAuditSummaryById = buildMapByProviderSelectionReviewId(
  selectionAuditSummaryRecords
);

const REVIEW_RECORDS: readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord[] =
  REVIEW_SEEDS.map((seed) => {
  const sourceExecution = resolveRequiredRecord(
    executionMvpByStableId.get(seed.sourceExecutionStableId),
    `Missing provider dry-run execution MVP record for ${seed.reviewId}`
  );
  const sourceInput = resolveRequiredRecord(
    executionInputByStableId.get(seed.sourceExecutionStableId),
    `Missing provider dry-run execution input record for ${seed.reviewId}`
  );
  const sourcePlan = resolveRequiredRecord(
    executionPlanByStableId.get(seed.sourceExecutionStableId),
    `Missing provider dry-run execution plan record for ${seed.reviewId}`
  );
  const sourceOutput = resolveRequiredRecord(
    executionOutputByStableId.get(seed.sourceExecutionStableId),
    `Missing provider dry-run execution output record for ${seed.reviewId}`
  );
  const sourceEnvelope = resolveRequiredRecord(
    executionEnvelopeByStableId.get(seed.sourceExecutionStableId),
    `Missing provider dry-run execution envelope record for ${seed.reviewId}`
  );
  const sourceFixtureResponse = resolveRequiredRecord(
    fixtureResponseByStableId.get(seed.sourceExecutionStableId),
    `Missing provider dry-run fixture response record for ${seed.reviewId}`
  );
  const sourceBlockedSummary = resolveRequiredRecord(
    blockedSummaryByStableId.get(seed.sourceExecutionStableId),
    `Missing provider dry-run blocked live execution summary record for ${seed.reviewId}`
  );
  const sourceEvidencePreview = resolveRequiredRecord(
    evidencePreviewByStableId.get(seed.sourceExecutionStableId),
    `Missing provider dry-run evidence preview record for ${seed.reviewId}`
  );
  const sourceAuditPreview = resolveRequiredRecord(
    auditPreviewByStableId.get(seed.sourceExecutionStableId),
    `Missing provider dry-run audit preview record for ${seed.reviewId}`
  );
  const sourceApprovalPreview = resolveRequiredRecord(
    approvalPreviewByStableId.get(seed.sourceExecutionStableId),
    `Missing provider dry-run approval preview record for ${seed.reviewId}`
  );
  const sourceReadinessMatrix = resolveRequiredRecord(
    readinessMatrixByStableId.get(seed.sourceExecutionStableId),
    `Missing provider dry-run readiness matrix record for ${seed.reviewId}`
  );
  const sourceAdmissionReview = resolveRequiredRecord(
    admissionReviewById.get(seed.sourceAdmissionReviewId),
    `Missing provider dry-run admission review record for ${seed.reviewId}`
  );
  const sourceAdmissionAcceptance = resolveRequiredRecord(
    admissionAcceptanceById.get(seed.sourceAdmissionReviewId),
    `Missing provider dry-run admission acceptance posture record for ${seed.reviewId}`
  );
  const sourceAdmissionAuditSummary = resolveRequiredRecord(
    admissionAuditSummaryById.get(seed.sourceAdmissionReviewId),
    `Missing provider dry-run admission audit summary record for ${seed.reviewId}`
  );
  const sourceSelectionReview = resolveRequiredRecord(
    selectionReviewById.get(seed.sourceProviderSelectionReviewId),
    `Missing provider selection review record for ${seed.reviewId}`
  );
  const sourceSelectionAcceptance = resolveRequiredRecord(
    selectionAcceptanceById.get(seed.sourceProviderSelectionReviewId),
    `Missing provider selection acceptance posture record for ${seed.reviewId}`
  );
  const sourceSelectionAuditSummary = resolveRequiredRecord(
    selectionAuditSummaryById.get(seed.sourceProviderSelectionReviewId),
    `Missing provider selection audit summary record for ${seed.reviewId}`
  );

  return {
    key: buildStableProviderDryRunExecutionReviewKey(seed.reviewId),
    reviewVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review-preview-v1",
    reviewId: seed.reviewId,
    reviewLabel: seed.reviewLabel,
    source: REVIEW_SOURCE,
    reviewMode: REVIEW_MODE,
    reviewPosture: REVIEW_POSTURE,
    sourceProviderDryRunExecutionMvpReference: sourceExecution.key,
    sourceProviderDryRunExecutionInputReference: sourceInput.key,
    sourceProviderDryRunExecutionPlanReference: sourcePlan.key,
    sourceProviderDryRunExecutionOutputReference: sourceOutput.key,
    sourceProviderDryRunExecutionEnvelopeReference: sourceEnvelope.key,
    sourceProviderDryRunFixtureResponseReference: sourceFixtureResponse.key,
    sourceProviderDryRunBlockedLiveExecutionSummaryReference:
      sourceBlockedSummary.key,
    sourceProviderDryRunEvidencePreviewReference: sourceEvidencePreview.key,
    sourceProviderDryRunAuditPreviewReference: sourceAuditPreview.key,
    sourceProviderDryRunApprovalPreviewReference: sourceApprovalPreview.key,
    sourceProviderDryRunSafetyGateSummaryReference:
      buildSafetyGateSummaryReference(sourceExecution.stableId),
    sourceProviderDryRunReadinessMatrixReference: sourceReadinessMatrix.key,
    sourceProviderDryRunAdmissionReviewReference: sourceAdmissionReview.key,
    sourceProviderDryRunAdmissionAcceptancePostureReference:
      sourceAdmissionAcceptance.key,
    sourceProviderDryRunAdmissionAuditSummaryReference:
      sourceAdmissionAuditSummary.key,
    sourceProviderSelectionCredentialReferenceReviewReference:
      sourceSelectionReview.key,
    sourceProviderSelectionAcceptancePostureReference:
      sourceSelectionAcceptance.key,
    sourceProviderSelectionAuditSummaryReference:
      sourceSelectionAuditSummary.key,
    selectedCapabilityFamily: seed.selectedCapabilityFamily,
    workspaceTarget: sourceExecution.workspaceTarget,
    providerSlotLabel: seed.providerSlotLabel,
    backupProviderSlotLabel: seed.backupProviderSlotLabel,
    localPrivateAlternativeLabel: sourceExecution.localPrivateAlternativeLabel,
    opaqueCredentialReferenceLabel: sourceExecution.opaqueCredentialReferenceLabel,
    serverOnlyProviderDryRunExecutionHelperState: "exists",
    providerDryRunExecutionState: "deterministic fixture-only",
    dryRunFixtureResponseState: "produced in memory only",
    liveProviderExecutionState: "blocked",
    selectedProviderSlotState: "preview-only",
    backupProviderSlotState: "preview-only",
    localPrivateAlternativeState: "preview-only",
    credentialReferenceState: "opaque label only",
    credentialValueState: "not present / not read",
    envVarState: "not read",
    providerKeyState: "not read",
    providerSdkImportState: "not imported",
    providerResponseState: "not received from provider",
    modelCallState: "not called",
    modelOutputState: "not generated by provider/model",
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
    evidencePacketState: "preview-only / not persisted",
    killSwitchState: "inactive fixture only",
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    operatorFacingExplanation: seed.operatorFacingExplanation,
    remainingBlockers: cloneList(seed.remainingBlockers),
    nextSafeAction: seed.nextSafeAction,
    currentReadiness: CURRENT_READINESS,
    acceptanceState: ACCEPTANCE_STATE,
    recoveryPosture: RECOVERY_POSTURE,
    nextProviderAdapterDryRunResultCaptureMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    };
  });

const OUTPUT_REVIEW_RECORDS: readonly ProviderDryRunExecutionOutputReviewRecord[] =
  REVIEW_RECORDS.map((review) => ({
  key: buildStableProviderDryRunExecutionOutputReviewKey(review.reviewId),
  outputReviewVersion:
    "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-output-review-preview-v1",
  providerDryRunExecutionReviewId: review.reviewId,
  sourceProviderDryRunExecutionOutputReference:
    review.sourceProviderDryRunExecutionOutputReference,
  sourceProviderDryRunExecutionEnvelopeReference:
    review.sourceProviderDryRunExecutionEnvelopeReference,
  sourceProviderDryRunFixtureResponseReference:
    review.sourceProviderDryRunFixtureResponseReference,
  sourceProviderDryRunBlockedLiveExecutionSummaryReference:
    review.sourceProviderDryRunBlockedLiveExecutionSummaryReference,
  executionState: "executed-provider-dry-run-fixture-in-memory-only",
  executionMode: "deterministic-fixture-only",
  dryRunFixtureResponseState: review.dryRunFixtureResponseState,
  liveProviderExecutionState: review.liveProviderExecutionState,
  providerDryRunExecutionIdPosture: "deterministic preview id only",
  providerDryRunAdmissionIdPosture: "deterministic preview id only",
  providerSlotIdPosture: "deterministic preview id only",
  credentialReferenceIdPosture: "deterministic opaque reference id only",
  executionDigestPosture: "deterministic preview digest only",
  selectedProviderSlotPosture: "preview-only",
  backupProviderSlotPosture: "preview-only",
  localPrivateAlternativePosture: "preview-only",
  credentialReferencePosture: "opaque-reference-only",
  credentialValueState: review.credentialValueState,
  envVarState: review.envVarState,
  providerKeyState: review.providerKeyState,
  providerSdkImportState: review.providerSdkImportState,
  providerResponseState: review.providerResponseState,
  modelOutputState: review.modelOutputState,
  promptTransmissionState: review.promptTransmissionState,
  outputClassification: "deterministic dry-run execution fixture only",
  resultPersistenceState: review.resultPersistenceState,
  auditPersistenceState: review.auditPersistenceState,
  approvalPersistenceState: review.approvalPersistenceState,
  operatorFacingExplanation:
    review.operatorFacingExplanation,
  remainingBlockers: cloneList(review.remainingBlockers),
  nextSafeAction: review.nextSafeAction,
    explicitDryRunExecutionFixtureOnlyNoSecretReadNoProviderCallNoPersistenceStatement:
      FIXTURE_ONLY_STATEMENT,
  }));

const GATE_FAILURE_REVIEW_RECORDS: readonly ProviderDryRunExecutionGateFailureReviewRecord[] =
  REVIEW_RECORDS.flatMap((review) =>
    GATE_FAILURE_SEEDS.map((gate) => ({
    key: buildStableProviderDryRunExecutionGateFailureReviewKey(
      review.reviewId,
      gate.gateId
    ),
    gateFailureReviewVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-gate-failure-review-preview-v1",
    providerDryRunExecutionReviewId: review.reviewId,
    failedGateId: gate.gateId,
    failedGateLabel: gate.label,
    gateState: "blocked",
    severity: gate.severity,
    affectedCapabilityFamily: review.selectedCapabilityFamily,
    affectedWorkspaceTarget: review.workspaceTarget,
    affectedProviderSlot: review.providerSlotLabel,
    affectedCredentialReference: review.opaqueCredentialReferenceLabel,
    operatorFacingExplanation: buildOperatorFacingGateExplanation(review, gate),
    requiredEvidenceToUnblock: buildRequiredEvidenceToUnblock(gate),
    requiredRecoveryAction: buildRequiredRecoveryAction(gate),
    providerAdapterDryRunResultCaptureMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    nextSafeAction: review.nextSafeAction,
      explicitNoLiveGatePassStatement: NO_LIVE_GATE_PASS_STATEMENT,
    }))
  );

const RECOVERY_PLAN_PREVIEW_RECORDS: readonly ProviderDryRunExecutionRecoveryPlanPreviewRecord[] =
  REVIEW_RECORDS.map((review) => ({
  key: buildStableProviderDryRunExecutionRecoveryPlanKey(review.reviewId),
  recoveryPlanVersion:
    "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-recovery-plan-preview-v1",
  providerDryRunExecutionReviewId: review.reviewId,
  recoveryPosture: RECOVERY_POSTURE,
  serverOnlyProviderDryRunExecutionHelperRecovery:
    "Keep the server-only provider dry-run execution helper deterministic, backend-only, and review-safe.",
  dryRunExecutionInputRecovery:
    "Preserve redacted input previews and opaque credential references only.",
  dryRunExecutionPlanRecovery:
    "Keep the execution plan preview-only with blocked live actions and no runtime dispatch.",
  dryRunExecutionOutputRecovery:
    "Keep output review records deterministic, fixture-only, and in memory only.",
  dryRunExecutionEnvelopeRecovery:
    "Preserve the redacted prompt envelope preview and prevent prompt transmission.",
  dryRunFixtureResponseRecovery:
    "Preserve deterministic dry-run fixture responses and avoid provider output.",
  dryRunBlockedLiveExecutionSummaryRecovery:
    "Keep the blocked live execution summary explicit across approval, provider, model, and persistence boundaries.",
  evidencePreviewRecovery:
    "Retain preview-only evidence references and keep them non-persistent.",
  auditPreviewRecovery:
    "Retain preview-only audit summaries and keep them non-persistent.",
  approvalPreviewRecovery:
    "Retain preview-only approval fixtures and keep them non-persistent.",
  dryRunAdmissionDependencyRecovery:
    "Keep provider dry-run admission review and output dependencies linked as preview-only prerequisites.",
  providerSelectionDependencyRecovery:
    "Keep provider selection credential reference review dependencies stable and opaque-only.",
  credentialReferenceRecovery:
    "Preserve opaque credential reference labels only and do not read credential values.",
  credentialValueBoundaryRecovery:
    "Keep credential values absent and unread across the review and result capture layers.",
  envVarBoundaryRecovery:
    "Keep env vars unread across the review and result capture layers.",
  providerKeyBoundaryRecovery:
    "Keep provider keys unread across the review and result capture layers.",
  providerSdkBoundaryRecovery:
    "Keep provider SDK imports out of the preview layer.",
  liveProviderExecutionBoundaryRecovery:
    "Keep live provider execution blocked while result capture remains preview-only.",
  promptBoundaryRecovery:
    "Keep prompt sending blocked and redacted prompt references preview-only.",
  modelBoundaryRecovery:
    "Keep model calls blocked and provider/model output ungenerated.",
  frontendRequestBoundaryRecovery:
    "Keep frontend request creation blocked.",
  apiRouteBoundaryRecovery:
    "Keep API route creation blocked.",
  queueDispatchBlockedRecovery:
    "Keep queue dispatch blocked.",
  workerDispatchBlockedRecovery:
    "Keep worker dispatch blocked.",
  jobExecutionBlockedRecovery:
    "Keep job execution blocked.",
  resultPersistenceMissingRecovery:
    "Keep result persistence unimplemented until a future backend-owned result capture phase explicitly adds it.",
  auditPersistenceMissingRecovery:
    "Keep audit persistence unimplemented.",
  approvalPersistenceMissingRecovery:
    "Keep approval persistence unimplemented.",
  databaseWriteBlockedRecovery:
    "Keep database writes blocked.",
  fileWriteBlockedRecovery:
    "Keep file writes blocked.",
  resultCaptureMissingRecovery:
    "Add deterministic preview-only result capture records in the next batch without enabling provider execution or persistence.",
  retryPosture: RETRY_POSTURE,
  fallbackPosture: FALLBACK_POSTURE,
  operatorActionRequired: review.nextSafeAction,
  nextSafeBatchRecommendation:
    NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    explicitNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement:
      NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT,
  }));

const RECOVERY_READINESS_CHECKLIST_RECORDS: readonly ProviderDryRunExecutionRecoveryReadinessChecklistRecord[] =
  REVIEW_RECORDS.flatMap((review) =>
    READINESS_CHECKLIST_SEEDS.map((seed) => ({
    key: buildStableProviderDryRunExecutionRecoveryReadinessChecklistKey(
      review.reviewId,
      seed.checklistId
    ),
    checklistVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-recovery-readiness-checklist-v1",
    providerDryRunExecutionReviewId: review.reviewId,
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: CURRENT_POSTURE,
    providerAdapterDryRunResultCaptureMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
      nextSafeAction: seed.nextSafeAction,
    }))
  );

const REVIEW_AUDIT_SUMMARY_RECORDS: readonly ProviderDryRunExecutionReviewAuditSummaryRecord[] =
  REVIEW_RECORDS.map((review) => ({
  key: buildStableProviderDryRunExecutionReviewAuditSummaryKey(review.reviewId),
  auditSummaryVersion:
    "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review-audit-summary-preview-v1",
  providerDryRunExecutionReviewId: review.reviewId,
  auditPosture: AUDIT_POSTURE,
  executionReferenceState: EXECUTION_REFERENCE_STATE,
  fixtureResponseReferenceState: FIXTURE_RESPONSE_REFERENCE_STATE,
  providerSlotReferenceState: PROVIDER_SLOT_REFERENCE_STATE,
  credentialReferenceState: CREDENTIAL_REFERENCE_AUDIT_STATE,
  liveProviderExecutionState: review.liveProviderExecutionState,
  credentialValueState: review.credentialValueState,
  envVarState: review.envVarState,
  providerKeyState: review.providerKeyState,
  evidencePacketState: EVIDENCE_PACKET_STATE,
  serverOnlyExecutionHelperEvidenceSummary:
    "Server-only helper evidence confirms deterministic in-memory fixture execution output only.",
  deterministicDryRunExecutionEvidenceSummary:
    "Deterministic provider dry-run execution evidence confirms stable preview ids, stable digest posture, and no provider execution.",
  fixtureResponseEvidenceSummary:
    "Fixture response evidence confirms in-memory response generation only and no provider/model output.",
  failedGateSummary: buildFailedGateSummaryLine(review),
  recoverySummary: buildRecoverySummaryLine(review),
  blockedActionSummary:
    "Blocked actions still include provider calls, prompt sending, model calls, queue/worker/job execution, and all persistence paths.",
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
    providerAdapterDryRunResultCaptureMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
  }));

const ACCEPTANCE_POSTURE_RECORDS: readonly ProviderDryRunExecutionAcceptancePostureRecord[] =
  REVIEW_RECORDS.map((review) => ({
  key: buildStableProviderDryRunExecutionAcceptancePostureKey(review.reviewId),
  acceptancePostureVersion:
    "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-acceptance-posture-preview-v1",
  providerDryRunExecutionReviewId: review.reviewId,
  acceptanceState: ACCEPTANCE_STATE,
  fixtureOnlyAcceptanceSummary:
    "The dry-run execution fixture layer is accepted only as a deterministic preview-only fixture.",
  backendOnlyAcceptanceSummary:
    "Execution review remains accepted only for backend-owned preview coverage.",
  serverOnlyAcceptanceSummary:
    "Execution review remains accepted only while the helper stays server-only.",
  dryRunExecutionOnlyAcceptanceSummary:
    "Execution review remains accepted only for dry-run fixture execution posture.",
  credentialReferenceOnlyAcceptanceSummary:
    "Execution review remains accepted only for opaque credential reference labels.",
  fixtureResponseOnlyAcceptanceSummary:
    "Execution review remains accepted only for in-memory fixture responses.",
  blockedLiveExecutionAcceptanceSummary:
    "Live provider execution remains explicitly blocked and not accepted.",
  selectedProviderSlotAcceptanceSummary:
    "Selected provider slots remain accepted only as preview-only labels.",
  backupProviderSlotAcceptanceSummary:
    "Backup provider slots remain accepted only as preview-only labels.",
  localPrivateAlternativeAcceptanceSummary:
    "Local/private alternatives remain accepted only as preview-only labels.",
  providerBlockers: [
    "no provider SDK imports",
    "no live provider execution",
    "no provider response",
  ],
  credentialValueBlockers: [
    "credential value is not present",
    "credential value is not read",
  ],
  envVarBlockers: [
    "env vars are not read",
    "provider key is not read",
  ],
  promptBlockers: [
    "redacted prompt envelope is preview-only",
    "prompt transmission is not sent",
  ],
  modelBlockers: [
    "model call state is not called",
    "model output state is not generated by provider/model",
  ],
  queueWorkerJobBlockers: [
    "queue dispatch is not dispatched",
    "worker dispatch is not dispatched",
    "job execution is not executed",
  ],
  resultPersistenceBlockers: [
    "result persistence is not implemented",
  ],
  auditPersistenceBlockers: [
    "audit persistence is not implemented",
  ],
  approvalPersistenceBlockers: [
    "approval persistence is not implemented",
  ],
  databaseFileBlockers: [
    "database write is not implemented",
    "file write is not implemented",
  ],
  approvalBlockers: [
    "no real approval request",
    "no real approval recording",
    "approval token is not issued",
    "approval lease is not created",
  ],
  auditBlockers: [
    "evidence packet is preview-only / not persisted",
    "audit posture is preview-only",
  ],
  resultCaptureBlockers: [
    "provider adapter dry-run result capture is not implemented",
  ],
  requiredEvidence: uniqueStrings([
    review.sourceProviderDryRunExecutionOutputReference,
    review.sourceProviderDryRunExecutionEnvelopeReference,
    review.sourceProviderDryRunFixtureResponseReference,
    review.sourceProviderDryRunBlockedLiveExecutionSummaryReference,
    review.sourceProviderDryRunEvidencePreviewReference,
  ]),
  nextSafeAction: review.nextSafeAction,
    explicitProviderDryRunExecutionFixtureAcceptedLiveProviderExecutionNotAcceptedStatement:
      ACCEPTANCE_STATEMENT,
  }));

export function buildStableProviderDryRunExecutionReviewKey(
  reviewId: ProviderDryRunExecutionReviewId
): ProviderDryRunExecutionReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review:${reviewId}`;
}

export function buildStableProviderDryRunExecutionOutputReviewKey(
  reviewId: ProviderDryRunExecutionReviewId
): ProviderDryRunExecutionOutputReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-output-review:${reviewId}`;
}

export function buildStableProviderDryRunExecutionGateFailureReviewKey(
  reviewId: ProviderDryRunExecutionReviewId,
  gateId: ProviderDryRunExecutionGateId
): ProviderDryRunExecutionGateFailureReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-gate-failure-review:${reviewId}:${gateId}`;
}

export function buildStableProviderDryRunExecutionRecoveryPlanKey(
  reviewId: ProviderDryRunExecutionReviewId
): ProviderDryRunExecutionRecoveryPlanKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-recovery-plan:${reviewId}`;
}

export function buildStableProviderDryRunExecutionRecoveryReadinessChecklistKey(
  reviewId: ProviderDryRunExecutionReviewId,
  checklistId: ProviderDryRunExecutionRecoveryReadinessChecklistId
): ProviderDryRunExecutionRecoveryReadinessChecklistKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-recovery-readiness:${reviewId}:${checklistId}`;
}

export function buildStableProviderDryRunExecutionReviewAuditSummaryKey(
  reviewId: ProviderDryRunExecutionReviewId
): ProviderDryRunExecutionReviewAuditSummaryKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review-audit-summary:${reviewId}`;
}

export function buildStableProviderDryRunExecutionAcceptancePostureKey(
  reviewId: ProviderDryRunExecutionReviewId
): ProviderDryRunExecutionAcceptancePostureKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-acceptance-posture:${reviewId}`;
}

export function buildUniqueProviderDryRunExecutionReviewDisplayStrings(
  values: readonly string[]
): readonly string[] {
  return uniqueStrings(values.filter((value) => value.trim().length > 0));
}

export function listBackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviews():
  readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviewRecord[] {
  return cloneList(REVIEW_RECORDS);
}

export function listProviderDryRunExecutionOutputReviewRecords():
  readonly ProviderDryRunExecutionOutputReviewRecord[] {
  return cloneList(OUTPUT_REVIEW_RECORDS);
}

export function listProviderDryRunExecutionGateFailureReviewRecords():
  readonly ProviderDryRunExecutionGateFailureReviewRecord[] {
  return cloneList(GATE_FAILURE_REVIEW_RECORDS);
}

export function listProviderDryRunExecutionRecoveryPlanPreviews():
  readonly ProviderDryRunExecutionRecoveryPlanPreviewRecord[] {
  return cloneList(RECOVERY_PLAN_PREVIEW_RECORDS);
}

export function listProviderDryRunExecutionRecoveryReadinessChecklistRecords():
  readonly ProviderDryRunExecutionRecoveryReadinessChecklistRecord[] {
  return cloneList(RECOVERY_READINESS_CHECKLIST_RECORDS);
}

export function listProviderDryRunExecutionReviewAuditSummaries():
  readonly ProviderDryRunExecutionReviewAuditSummaryRecord[] {
  return cloneList(REVIEW_AUDIT_SUMMARY_RECORDS);
}

export function listProviderDryRunExecutionAcceptancePostureRecords():
  readonly ProviderDryRunExecutionAcceptancePostureRecord[] {
  return cloneList(ACCEPTANCE_POSTURE_RECORDS);
}

export function groupProviderDryRunExecutionReviewsByCapabilityFamily():
  readonly ProviderDryRunExecutionReviewCapabilityFamilyGroup[] {
  return groupReviewRecordsByCapabilityFamily(REVIEW_RECORDS);
}

export function groupProviderDryRunExecutionReviewsByProviderSlot():
  readonly ProviderDryRunExecutionReviewProviderSlotGroup[] {
  return groupReviewRecordsByProviderSlot(REVIEW_RECORDS);
}

export function groupProviderDryRunExecutionReviewsByCredentialReference():
  readonly ProviderDryRunExecutionReviewCredentialReferenceGroup[] {
  return groupReviewRecordsByCredentialReference(REVIEW_RECORDS);
}

export function buildProviderDryRunExecutionReviewSummary():
  ProviderDryRunExecutionReviewSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review-summary-v1",
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_EXECUTION_MVP_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    reviewCount: REVIEW_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    acceptanceState: ACCEPTANCE_STATE,
    recoveryPosture: RECOVERY_POSTURE,
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildProviderDryRunExecutionOutputReviewSummary():
  ProviderDryRunExecutionOutputReviewSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-output-review-summary-v1",
    recordCount: OUTPUT_REVIEW_RECORDS.length,
    summaryLines: cloneList(OUTPUT_REVIEW_SUMMARY_LINES),
    nextSafeAction:
      "Advance only to the backend-owned dry-run result capture MVP while keeping output review fixture-only and non-persistent.",
  };
}

export function buildProviderDryRunExecutionGateFailureSummary():
  ProviderDryRunExecutionGateFailureSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-gate-failure-summary-v1",
    recordCount: GATE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    nextSafeAction:
      "Keep gate failures preview-only and preserve blocked live execution while moving to the result capture MVP.",
  };
}

export function buildProviderDryRunExecutionRecoverySummary():
  ProviderDryRunExecutionRecoverySummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-recovery-summary-v1",
    planCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    checklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextSafeAction:
      "Recovery remains manual review only; advance only to the backend-owned dry-run result capture MVP.",
  };
}

export function buildProviderAdapterDryRunResultCaptureMvpChecklist():
  ProviderAdapterDryRunResultCaptureMvpChecklist {
  return cloneList(PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_CHECKLIST);
}
