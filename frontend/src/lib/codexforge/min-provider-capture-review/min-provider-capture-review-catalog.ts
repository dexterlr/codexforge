import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews,
} from "../min-provider-admit-review/min-provider-admit-review-catalog";
import type { ProviderDryRunAdmissionReviewId } from "../min-provider-admit-review/min-provider-admit-review-types";
import {
  listMinimalManualGatedProviderAdapterDryRunExecutionMvpRecords,
  listProviderDryRunBlockedLiveExecutionSummaries,
  listProviderDryRunExecutionOutputs,
  listProviderDryRunFixtureResponses,
} from "../min-provider-exec/min-provider-exec-catalog";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviews,
  listProviderDryRunExecutionAcceptancePostureRecords,
  listProviderDryRunExecutionReviewAuditSummaries,
} from "../min-provider-exec-review/min-provider-exec-review-catalog";
import type { ProviderDryRunExecutionReviewId } from "../min-provider-exec-review/min-provider-exec-review-types";
import {
  listMinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecords,
  listProviderDryRunCapturedFixtureResultOutputs,
  listProviderDryRunResultCaptureApprovalPreviews,
  listProviderDryRunResultCaptureAuditPreviews,
  listProviderDryRunResultCaptureBlockedPersistenceSummaries,
  listProviderDryRunResultCaptureChecks,
  listProviderDryRunResultCaptureEnvelopes,
  listProviderDryRunResultCaptureEvidencePreviews,
  listProviderDryRunResultCaptureInputs,
  listProviderDryRunResultCaptureReadinessMatrixRecords,
  listProviderDryRunResultCaptureSafetyGateSummaries,
} from "../min-provider-capture/min-provider-capture-catalog";
import type {
  ProviderDryRunExecutionDependencyId,
  ProviderDryRunResultCaptureCapabilityFamilyLabel,
  ProviderDryRunResultCaptureMvpId,
  ProviderDryRunResultCaptureProviderSlotLabel,
} from "../min-provider-capture/min-provider-capture-types";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews,
} from "../min-provider-review/min-provider-review-catalog";
import type { ProviderSelectionCredentialReferenceReviewId } from "../min-provider-review/min-provider-review-types";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE,
  MINIMAL_PROVIDER_DRY_RUN_RESULT_CAPTURE_REVIEW_SECTION_TITLES,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
  PROVIDER_DRY_RUN_RESULT_CAPTURE_GATE_FAILURE_REVIEW_DEFINITIONS,
  PROVIDER_DRY_RUN_RESULT_CAPTURE_RECOVERY_READINESS_CHECKLIST_DEFINITIONS,
  PROVIDER_DRY_RUN_RESULT_CAPTURE_REVIEW_EXAMPLES,
  type BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord,
  type ProviderAdapterDryRunAuditApprovalJoinMvpChecklist,
  type ProviderDryRunFixtureResponseCaptureState,
  type ProviderDryRunResultCaptureAcceptancePostureKey,
  type ProviderDryRunResultCaptureAcceptancePostureRecord,
  type ProviderDryRunResultCaptureAcceptancePostureVersion,
  type ProviderDryRunResultCaptureAcceptanceState,
  type ProviderDryRunResultCaptureAcceptanceStatement,
  type ProviderDryRunResultCaptureAuditPosture,
  type ProviderDryRunResultCaptureCredentialReferenceAuditState,
  type ProviderDryRunResultCaptureCurrentPosture,
  type ProviderDryRunResultCaptureEvidencePacketState,
  type ProviderDryRunResultCaptureFallbackPosture,
  type ProviderDryRunResultCaptureFixtureOnlyStatement,
  type ProviderDryRunResultCaptureGateFailureReviewId,
  type ProviderDryRunResultCaptureGateFailureReviewKey,
  type ProviderDryRunResultCaptureGateFailureReviewLabel,
  type ProviderDryRunResultCaptureGateFailureReviewRecord,
  type ProviderDryRunResultCaptureGateFailureReviewVersion,
  type ProviderDryRunResultCaptureGateFailureSummary,
  type ProviderDryRunResultCaptureGateFailureSummaryVersion,
  type ProviderDryRunResultCaptureNoLiveGatePassStatement,
  type ProviderDryRunResultCaptureNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement,
  type ProviderDryRunResultCaptureOutputReviewKey,
  type ProviderDryRunResultCaptureOutputReviewRecord,
  type ProviderDryRunResultCaptureOutputReviewSummary,
  type ProviderDryRunResultCaptureOutputReviewSummaryVersion,
  type ProviderDryRunResultCaptureOutputReviewVersion,
  type ProviderDryRunResultCaptureRecoveryPlanKey,
  type ProviderDryRunResultCaptureRecoveryPlanPreviewRecord,
  type ProviderDryRunResultCaptureRecoveryPlanVersion,
  type ProviderDryRunResultCaptureRecoveryPosture,
  type ProviderDryRunResultCaptureRecoveryReadinessChecklistId,
  type ProviderDryRunResultCaptureRecoveryReadinessChecklistKey,
  type ProviderDryRunResultCaptureRecoveryReadinessChecklistLabel,
  type ProviderDryRunResultCaptureRecoveryReadinessChecklistRecord,
  type ProviderDryRunResultCaptureRecoveryReadinessChecklistVersion,
  type ProviderDryRunResultCaptureRecoveryReadinessOwner,
  type ProviderDryRunResultCaptureRecoveryReadinessState,
  type ProviderDryRunResultCaptureRecoverySummary,
  type ProviderDryRunResultCaptureRecoverySummaryVersion,
  type ProviderDryRunResultCaptureRetryPosture,
  type ProviderDryRunResultCaptureReviewAuditSummaryKey,
  type ProviderDryRunResultCaptureReviewAuditSummaryRecord,
  type ProviderDryRunResultCaptureReviewAuditSummaryVersion,
  type ProviderDryRunResultCaptureReviewCapabilityFamilyGroup,
  type ProviderDryRunResultCaptureReviewCredentialReferenceGroup,
  type ProviderDryRunResultCaptureReviewCurrentReadiness,
  type ProviderDryRunResultCaptureReviewId,
  type ProviderDryRunResultCaptureReviewKey,
  type ProviderDryRunResultCaptureReviewLabel,
  type ProviderDryRunResultCaptureReviewMode,
  type ProviderDryRunResultCaptureReviewPosture,
  type ProviderDryRunResultCaptureReviewProviderSlotGroup,
  type ProviderDryRunResultCaptureReviewSeverity,
  type ProviderDryRunResultCaptureReviewSource,
  type ProviderDryRunResultCaptureReviewSummary,
  type ProviderDryRunResultCaptureReviewSummaryVersion,
  type ProviderDryRunResultCaptureReviewVersion,
} from "./min-provider-capture-review-types";

type ReviewSeed = Readonly<{
  reviewId: ProviderDryRunResultCaptureReviewId;
  sourceCaptureStableId: ProviderDryRunResultCaptureMvpId;
  sourceExecutionStableId: ProviderDryRunExecutionDependencyId;
  sourceExecutionReviewId: ProviderDryRunExecutionReviewId;
  sourceAdmissionReviewId: ProviderDryRunAdmissionReviewId;
  sourceProviderSelectionReviewId: ProviderSelectionCredentialReferenceReviewId;
  selectedCapabilityFamily: ProviderDryRunResultCaptureCapabilityFamilyLabel;
  providerSlotLabel: ProviderDryRunResultCaptureProviderSlotLabel;
  backupProviderSlotLabel: ProviderDryRunResultCaptureProviderSlotLabel;
  operatorFacingExplanation: string;
  remainingBlockers: readonly string[];
  nextSafeAction: string;
}>;

type ReadinessChecklistSeed = Readonly<{
  checklistId: ProviderDryRunResultCaptureRecoveryReadinessChecklistId;
  label: ProviderDryRunResultCaptureRecoveryReadinessChecklistLabel;
  state: ProviderDryRunResultCaptureRecoveryReadinessState;
  severity: ProviderDryRunResultCaptureReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ProviderDryRunResultCaptureRecoveryReadinessOwner;
  nextSafeAction: string;
}>;

const REVIEW_SOURCE: ProviderDryRunResultCaptureReviewSource =
  "Athena / Jarvis Model Gateway";
const REVIEW_MODE: ProviderDryRunResultCaptureReviewMode = "preview-only";
const REVIEW_POSTURE: ProviderDryRunResultCaptureReviewPosture =
  "minimal provider dry-run result capture review / backend-only / dry-run-fixture-capture-only / credential-reference-only / not-live-provider-executing / not persistent";
const CURRENT_READINESS: ProviderDryRunResultCaptureReviewCurrentReadiness =
  "minimal-provider-dry-run-result-capture-review-only / backend-only / dry-run-fixture-capture-only / credential-reference-only / not-live-provider-executing / not persistent";
const RECOVERY_POSTURE: ProviderDryRunResultCaptureRecoveryPosture =
  "manual review only";
const RETRY_POSTURE: ProviderDryRunResultCaptureRetryPosture = "disabled";
const FALLBACK_POSTURE: ProviderDryRunResultCaptureFallbackPosture =
  "disabled";
const AUDIT_POSTURE: ProviderDryRunResultCaptureAuditPosture = "preview-only";
const ACCEPTANCE_STATE: ProviderDryRunResultCaptureAcceptanceState =
  "not accepted for live provider execution or persistence / provider dry-run result capture fixture MVP accepted only";
const FIXTURE_ONLY_STATEMENT: ProviderDryRunResultCaptureFixtureOnlyStatement =
  "Dry-run result capture fixture only. No secret read. No provider call. No persistence.";
const NO_LIVE_GATE_PASS_STATEMENT: ProviderDryRunResultCaptureNoLiveGatePassStatement =
  "No live gate pass.";
const NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT: ProviderDryRunResultCaptureNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence.";
const ACCEPTANCE_STATEMENT: ProviderDryRunResultCaptureAcceptanceStatement =
  "Provider dry-run result capture fixture accepted only. Live provider execution and persistence not accepted.";
const CURRENT_POSTURE: ProviderDryRunResultCaptureCurrentPosture =
  "preview-only";
const EVIDENCE_PACKET_STATE: ProviderDryRunResultCaptureEvidencePacketState =
  "preview-only / not persisted";
const REFERENCE_STATE = "preview-only / not persisted" as const;
const CREDENTIAL_REFERENCE_AUDIT_STATE: ProviderDryRunResultCaptureCredentialReferenceAuditState =
  "opaque label only / not persisted";
const FIXTURE_RESPONSE_STATE: ProviderDryRunFixtureResponseCaptureState =
  "captured in memory only";
const RESULT_CAPTURE_REVIEW_READINESS_ID = "captured-fixture-result-output-state";

const REVIEW_SUMMARY_LINES = [
  "backend-owned minimal manual-gated provider adapter dry-run result capture review and recovery preview only",
  "provider adapter dry-run result capture review is preview-only",
  "server-only provider dry-run result capture helper exists",
  "provider dry-run fixture response is captured in memory only",
  "provider dry-run result capture is deterministic fixture-only",
  "provider adapter dry-run result capture is not persistent",
  "live provider execution is blocked",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "backup provider slot is preview-only",
  "local/private alternative is preview-only",
  "provider adapter dry-run result capture is not live provider execution",
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
  "backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP next",
] as const;

const OUTPUT_REVIEW_SUMMARY_LINES = [
  "Provider adapter dry-run result capture output review",
  "capture state: captured-provider-dry-run-fixture-result-in-memory-only",
  "capture mode: deterministic-fixture-only",
  "captured fixture response state: captured in memory only",
  "live provider execution state: blocked",
  "provider dry-run result capture id posture: deterministic preview id only",
  "provider dry-run execution id posture: deterministic preview id only",
  "provider dry-run admission id posture: deterministic preview id only",
  "provider slot id posture: deterministic preview id only",
  "credential reference id posture: deterministic opaque reference id only",
  "capture digest posture: deterministic preview digest only",
  "selected provider slot posture: preview-only",
  "backup provider slot posture: preview-only",
  "local/private alternative posture: preview-only",
  "credential reference posture: opaque-reference-only",
  "output classification: deterministic dry-run fixture result capture only",
  "result persistence state: not implemented",
  "audit persistence state: not implemented",
  "approval persistence state: not implemented",
] as const;

const GATE_FAILURE_SUMMARY_LINES = PROVIDER_DRY_RUN_RESULT_CAPTURE_GATE_FAILURE_REVIEW_DEFINITIONS.map(
  (definition) => definition.failedGateLabel
) as readonly string[];

const RECOVERY_SUMMARY_LINES = [
  "Provider adapter dry-run result capture recovery plan",
  "Provider adapter dry-run result capture recovery readiness",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "provider adapter dry-run audit and approval join MVP comes next",
  NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT,
] as const;

const PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_CHECKLIST = [
  "Review backend-owned minimal provider adapter dry-run result capture review records before joining audit and approval previews.",
  "Keep the server-only provider dry-run result capture helper deterministic, fixture-only, credential-reference-only, backend-only, and non-persistent.",
  "Do not add credential value reads, env var reads, provider key reads, provider SDK imports, prompt sending, model calls, provider execution, or plugin execution.",
  "Do not add frontend requests, API routes, network calls, queue dispatch, worker dispatch, job execution, result persistence, audit persistence, approval persistence, database writes, or file writes.",
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
] as const satisfies ProviderAdapterDryRunAuditApprovalJoinMvpChecklist;

const REVIEW_SEEDS = [
  {
    reviewId: "openai-compatible-text-provider-dry-run-capture-slot",
    sourceCaptureStableId: "text-chat-provider-dry-run-result-capture",
    sourceExecutionStableId: "text-chat-provider-dry-run-execution",
    sourceExecutionReviewId:
      "openai-compatible-text-provider-dry-run-execution-slot",
    sourceAdmissionReviewId: "code-assistance-request",
    sourceProviderSelectionReviewId: "code-assistance-request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "OpenAI-compatible text provider dry-run capture slot",
    backupProviderSlotLabel:
      "Anthropic-compatible text provider dry-run capture slot",
    operatorFacingExplanation:
      "Athena can review the OpenAI-compatible provider adapter dry-run result capture slot as a backend-owned deterministic fixture capture preview without reading credential values, reading env vars, or calling a provider.",
    remainingBlockers: [
      "live provider execution remains blocked",
      "provider SDK import remains blocked",
      "result persistence remains blocked",
    ],
    nextSafeAction:
      "Keep the OpenAI-compatible slot preview-only and advance only to the backend-owned dry-run audit and approval join MVP.",
  },
  {
    reviewId: "anthropic-compatible-text-provider-dry-run-capture-slot",
    sourceCaptureStableId: "text-chat-provider-dry-run-result-capture",
    sourceExecutionStableId: "text-chat-provider-dry-run-execution",
    sourceExecutionReviewId:
      "anthropic-compatible-text-provider-dry-run-execution-slot",
    sourceAdmissionReviewId: "website-copy-code-request",
    sourceProviderSelectionReviewId: "website-copy-code-request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel:
      "Anthropic-compatible text provider dry-run capture slot",
    backupProviderSlotLabel: "OpenAI-compatible text provider dry-run capture slot",
    operatorFacingExplanation:
      "Jarvis can review the Anthropic-compatible dry-run capture slot as a deterministic fallback-safe preview with opaque credential references only and no live provider output.",
    remainingBlockers: [
      "prompt transmission remains blocked",
      "model calls remain blocked",
      "audit persistence remains blocked",
    ],
    nextSafeAction:
      "Use the Anthropic-compatible preview to confirm capture posture before the audit and approval join layer is added.",
  },
  {
    reviewId: "gemini-compatible-text-provider-dry-run-capture-slot",
    sourceCaptureStableId: "planning-reasoning-provider-dry-run-result-capture",
    sourceExecutionStableId: "planning-reasoning-provider-dry-run-execution",
    sourceExecutionReviewId:
      "gemini-compatible-text-provider-dry-run-execution-slot",
    sourceAdmissionReviewId: "conversational-planning-request",
    sourceProviderSelectionReviewId: "conversational-planning-request",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "Gemini-compatible text provider dry-run capture slot",
    backupProviderSlotLabel: "fallback disabled dry-run capture slot",
    operatorFacingExplanation:
      "Athena can review the Gemini-compatible planning slot as a deterministic result capture fixture only, with no prompt transmission, no provider response, and no persisted output.",
    remainingBlockers: [
      "live provider execution remains blocked",
      "queue and worker dispatch remain blocked",
      "database and file writes remain blocked",
    ],
    nextSafeAction:
      "Keep the planning slot review-only and move to audit and approval join previews without enabling any live provider execution path.",
  },
  {
    reviewId: "local-private-text-provider-dry-run-capture-slot",
    sourceCaptureStableId: "text-chat-provider-dry-run-result-capture",
    sourceExecutionStableId: "text-chat-provider-dry-run-execution",
    sourceExecutionReviewId:
      "local-private-text-provider-dry-run-execution-slot",
    sourceAdmissionReviewId: "audit-recovery-explanation-request",
    sourceProviderSelectionReviewId: "audit-recovery-explanation-request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel:
      "local/private text provider dry-run capture slot",
    backupProviderSlotLabel: "OpenAI-compatible text provider dry-run capture slot",
    operatorFacingExplanation:
      "Athena can review the local/private alternative as a preview-only dry-run result capture slot without any provider SDK import, credential read, or persistence write.",
    remainingBlockers: [
      "frontend request creation remains blocked",
      "API route creation remains blocked",
      "approval persistence remains blocked",
    ],
    nextSafeAction:
      "Keep the local/private alternative in preview-only posture until the audit and approval join layer remains fully backend-only and non-persistent.",
  },
  {
    reviewId: "fallback-disabled-dry-run-capture-slot",
    sourceCaptureStableId: "planning-reasoning-provider-dry-run-result-capture",
    sourceExecutionStableId: "planning-reasoning-provider-dry-run-execution",
    sourceExecutionReviewId: "fallback-disabled-dry-run-execution-slot",
    sourceAdmissionReviewId: "fallback-disabled-request",
    sourceProviderSelectionReviewId: "fallback-disabled-request",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "fallback disabled dry-run capture slot",
    backupProviderSlotLabel:
      "local/private text provider dry-run capture slot",
    operatorFacingExplanation:
      "Athena can review the fallback-disabled slot as an explicit no-retry, no-fallback, no-live-execution result capture preview record.",
    remainingBlockers: [
      "fallback remains disabled",
      "retry remains disabled",
      "audit and approval join remains unimplemented",
    ],
    nextSafeAction:
      "Keep fallback disabled and advance only to audit and approval join previews that preserve the same blocked posture.",
  },
  {
    reviewId: "conversational-planning-request",
    sourceCaptureStableId: "planning-reasoning-provider-dry-run-result-capture",
    sourceExecutionStableId: "planning-reasoning-provider-dry-run-execution",
    sourceExecutionReviewId: "conversational-planning-request",
    sourceAdmissionReviewId: "conversational-planning-request",
    sourceProviderSelectionReviewId: "conversational-planning-request",
    selectedCapabilityFamily: "planning/reasoning",
    providerSlotLabel: "Gemini-compatible text provider dry-run capture slot",
    backupProviderSlotLabel: "fallback disabled dry-run capture slot",
    operatorFacingExplanation:
      "Athena can review conversational planning capture posture as a deterministic preview-only request path with opaque credential references and in-memory fixture output only.",
    remainingBlockers: [
      "provider output remains synthetic and blocked",
      "result persistence remains blocked",
      "audit and approval join remains future work",
    ],
    nextSafeAction:
      "Review planning capture posture and prepare the next backend-owned audit and approval join MVP.",
  },
  {
    reviewId: "code-assistance-request",
    sourceCaptureStableId: "text-chat-provider-dry-run-result-capture",
    sourceExecutionStableId: "text-chat-provider-dry-run-execution",
    sourceExecutionReviewId: "code-assistance-request",
    sourceAdmissionReviewId: "code-assistance-request",
    sourceProviderSelectionReviewId: "code-assistance-request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel: "OpenAI-compatible text provider dry-run capture slot",
    backupProviderSlotLabel:
      "Anthropic-compatible text provider dry-run capture slot",
    operatorFacingExplanation:
      "Athena can review code assistance capture posture as a backend-only deterministic preview that captures fixture results in memory only and sends nothing to a provider.",
    remainingBlockers: [
      "provider SDK import remains blocked",
      "model calls remain blocked",
      "persistence remains blocked",
    ],
    nextSafeAction:
      "Confirm the code assistance capture envelope and keep all execution and persistence lanes blocked.",
  },
  {
    reviewId: "website-copy-code-request",
    sourceCaptureStableId: "text-chat-provider-dry-run-result-capture",
    sourceExecutionStableId: "text-chat-provider-dry-run-execution",
    sourceExecutionReviewId: "website-copy-code-request",
    sourceAdmissionReviewId: "website-copy-code-request",
    sourceProviderSelectionReviewId: "website-copy-code-request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel:
      "Anthropic-compatible text provider dry-run capture slot",
    backupProviderSlotLabel: "OpenAI-compatible text provider dry-run capture slot",
    operatorFacingExplanation:
      "Jarvis can review website copy/code capture posture as a deterministic dry-run fixture capture with blocked provider response, blocked model output, and blocked persistence.",
    remainingBlockers: [
      "live provider execution remains blocked",
      "manual approval remains preview-only",
      "approval persistence remains blocked",
    ],
    nextSafeAction:
      "Use the website copy/code preview to verify boundary posture before joining audit and approval previews.",
  },
  {
    reviewId: "audit-recovery-explanation-request",
    sourceCaptureStableId: "text-chat-provider-dry-run-result-capture",
    sourceExecutionStableId: "text-chat-provider-dry-run-execution",
    sourceExecutionReviewId: "audit-recovery-explanation-request",
    sourceAdmissionReviewId: "audit-recovery-explanation-request",
    sourceProviderSelectionReviewId: "audit-recovery-explanation-request",
    selectedCapabilityFamily: "text/chat",
    providerSlotLabel:
      "local/private text provider dry-run capture slot",
    backupProviderSlotLabel: "OpenAI-compatible text provider dry-run capture slot",
    operatorFacingExplanation:
      "Athena can review audit and recovery explanation posture as an operator-facing deterministic capture summary that stays backend-only, server-only, and non-persistent.",
    remainingBlockers: [
      "audit persistence remains blocked",
      "approval join remains future work",
      "database and file writes remain blocked",
    ],
    nextSafeAction:
      "Use the audit/recovery explanation preview to prepare the backend-owned dry-run audit and approval join MVP.",
  },
] as const satisfies readonly ReviewSeed[];

function cloneList<T>(records: readonly T[]): readonly T[] {
  return [...records];
}

function uniqueStrings<T extends string>(values: readonly T[]): readonly T[] {
  return Array.from(new Set(values));
}

function resolveRequiredRecordBySuffix<T extends Readonly<{ key: string }>>(
  records: readonly T[],
  suffix: string,
  label: string
): T {
  const record = records.find((candidate) =>
    candidate.key.endsWith(`:${suffix}`)
  );

  if (!record) {
    throw new Error(`Missing ${label} for ${suffix}`);
  }

  return record;
}

function resolveRequiredRecordByValue<T>(
  records: readonly T[],
  predicate: (record: T) => boolean,
  label: string
): T {
  const record = records.find(predicate);

  if (!record) {
    throw new Error(`Missing ${label}`);
  }

  return record;
}

function resolveReviewLabel(
  reviewId: ProviderDryRunResultCaptureReviewId
): ProviderDryRunResultCaptureReviewLabel {
  const example = resolveRequiredRecordByValue(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_REVIEW_EXAMPLES,
    (candidate) => candidate.reviewId === reviewId,
    `review example ${reviewId}`
  );

  return example.reviewLabel;
}

function resolveGateFailureSeverity(
  failedGateId: ProviderDryRunResultCaptureGateFailureReviewId
): ProviderDryRunResultCaptureReviewSeverity {
  switch (failedGateId) {
    case "backend-only-boundary":
    case "server-only-dry-run-result-capture-module-boundary":
    case "live-provider-execution-blocked":
    case "no-live-provider-execution":
    case "no-result-persistence":
    case "no-audit-persistence":
    case "no-approval-persistence":
    case "no-database-write":
    case "no-file-write":
    case "provider-sdk-not-imported":
    case "no-provider-sdk-import":
    case "prompt-not-sent":
    case "no-prompt-sending":
    case "no-model-call":
      return "critical";
    case "credential-value-absent":
    case "credential-value-not-read":
    case "env-vars-not-read":
    case "provider-key-not-read":
    case "manual-approval-fixture":
    case "manual-confirmation-fixture":
    case "no-real-approval-request":
    case "no-real-approval-recording":
    case "no-approval-token-issuance":
    case "no-approval-lease-issuance":
    case "single-run-lock-preview":
    case "idempotency-replay-preview":
    case "timeout-cancel-preview":
    case "privacy-redaction-preview":
    case "kill-switch-fixture":
      return "high";
    default:
      return "medium";
  }
}

function buildReadinessChecklistSeed(
  checklistId: ProviderDryRunResultCaptureRecoveryReadinessChecklistId,
  label: ProviderDryRunResultCaptureRecoveryReadinessChecklistLabel
): ReadinessChecklistSeed {
  switch (checklistId) {
    case "queue-dispatch-still-blocked":
    case "worker-dispatch-still-blocked":
    case "job-execution-still-blocked":
    case "result-persistence-still-blocked":
    case "audit-persistence-still-blocked":
    case "approval-persistence-still-blocked":
    case "database-writes-still-blocked":
    case "file-writes-still-blocked":
      return {
        checklistId,
        label,
        state: "blocked",
        severity: "high",
        evidenceRequired: `${label} evidence must remain explicit in preview-only records.`,
        recoveryAction:
          "Keep the blocked boundary explicit until the backend-owned audit and approval join MVP defines the next server-only preview layer.",
        owner: "backend future",
        nextSafeAction:
          "Preserve the blocked posture and move only to the backend-owned dry-run audit and approval join MVP.",
      };
    case "provider-adapter-dry-run-audit-approval-join-not-implemented":
      return {
        checklistId,
        label,
        state: "backend future required",
        severity: "critical",
        evidenceRequired:
          "Audit and approval join dependency evidence must be listed before any persistence or live execution claim is made.",
        recoveryAction:
          "Implement the backend-owned dry-run audit and approval join MVP as the next safe batch without enabling persistence or live execution.",
        owner: "backend future",
        nextSafeAction:
          "Advance to 6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP.",
      };
    case "provider-sdk-import-boundary-reviewed":
    case "live-provider-execution-boundary-reviewed":
    case "redacted-prompt-envelope-reviewed":
    case "prompt-transmission-blocked-reviewed":
    case "kill-switch-fixture-reviewed":
    case "model-boundary-reviewed":
    case "frontend-request-boundary-reviewed":
    case "api-route-boundary-reviewed":
      return {
        checklistId,
        label,
        state: "reviewed",
        severity: "critical",
        evidenceRequired: `${label} evidence is present in the preview-only review layer.`,
        recoveryAction:
          "Keep the safety boundary explicit and unchanged while the join layer remains unimplemented.",
        owner: "safety review",
        nextSafeAction:
          "Retain preview-only posture and confirm the same boundary in the next audit and approval join MVP.",
      };
    default:
      return {
        checklistId,
        label,
        state: "reviewed",
        severity: "medium",
        evidenceRequired: `${label} evidence is present in deterministic in-memory review records.`,
        recoveryAction:
          "Keep the reviewed record backend-only, preview-only, and deterministic.",
        owner: "operator",
        nextSafeAction:
          "Use the reviewed record as evidence for the next backend-owned audit and approval join MVP.",
      };
  }
}

const PROVIDER_SELECTION_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews();
const PROVIDER_DRY_RUN_ADMISSION_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews();
const PROVIDER_DRY_RUN_EXECUTION_MVP_RECORDS =
  listMinimalManualGatedProviderAdapterDryRunExecutionMvpRecords();
const PROVIDER_DRY_RUN_FIXTURE_RESPONSE_RECORDS =
  listProviderDryRunFixtureResponses();
const PROVIDER_DRY_RUN_EXECUTION_OUTPUT_RECORDS =
  listProviderDryRunExecutionOutputs();
const PROVIDER_DRY_RUN_BLOCKED_EXECUTION_SUMMARY_RECORDS =
  listProviderDryRunBlockedLiveExecutionSummaries();
const PROVIDER_DRY_RUN_EXECUTION_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviews();
const PROVIDER_DRY_RUN_EXECUTION_ACCEPTANCE_POSTURE_RECORDS =
  listProviderDryRunExecutionAcceptancePostureRecords();
const PROVIDER_DRY_RUN_EXECUTION_REVIEW_AUDIT_SUMMARY_RECORDS =
  listProviderDryRunExecutionReviewAuditSummaries();
const PROVIDER_DRY_RUN_RESULT_CAPTURE_MVP_RECORDS =
  listMinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecords();
const PROVIDER_DRY_RUN_RESULT_CAPTURE_INPUT_RECORDS =
  listProviderDryRunResultCaptureInputs();
const PROVIDER_DRY_RUN_RESULT_CAPTURE_CHECK_RECORDS =
  listProviderDryRunResultCaptureChecks();
const PROVIDER_DRY_RUN_CAPTURED_OUTPUT_RECORDS =
  listProviderDryRunCapturedFixtureResultOutputs();
const PROVIDER_DRY_RUN_RESULT_CAPTURE_ENVELOPE_RECORDS =
  listProviderDryRunResultCaptureEnvelopes();
const PROVIDER_DRY_RUN_RESULT_CAPTURE_EVIDENCE_PREVIEW_RECORDS =
  listProviderDryRunResultCaptureEvidencePreviews();
const PROVIDER_DRY_RUN_RESULT_CAPTURE_AUDIT_PREVIEW_RECORDS =
  listProviderDryRunResultCaptureAuditPreviews();
const PROVIDER_DRY_RUN_RESULT_CAPTURE_APPROVAL_PREVIEW_RECORDS =
  listProviderDryRunResultCaptureApprovalPreviews();
const PROVIDER_DRY_RUN_RESULT_CAPTURE_SAFETY_GATE_SUMMARY_RECORDS =
  listProviderDryRunResultCaptureSafetyGateSummaries();
const PROVIDER_DRY_RUN_RESULT_CAPTURE_BLOCKED_PERSISTENCE_SUMMARY_RECORDS =
  listProviderDryRunResultCaptureBlockedPersistenceSummaries();
const PROVIDER_DRY_RUN_RESULT_CAPTURE_READINESS_MATRIX_RECORDS =
  listProviderDryRunResultCaptureReadinessMatrixRecords();

function resolveSelectionReview(
  reviewId: ProviderSelectionCredentialReferenceReviewId
) {
  return resolveRequiredRecordByValue(
    PROVIDER_SELECTION_REVIEW_RECORDS,
    (record) => record.reviewId === reviewId,
    `provider selection review ${reviewId}`
  );
}

function resolveAdmissionReview(reviewId: ProviderDryRunAdmissionReviewId) {
  return resolveRequiredRecordByValue(
    PROVIDER_DRY_RUN_ADMISSION_REVIEW_RECORDS,
    (record) => record.reviewId === reviewId,
    `provider dry-run admission review ${reviewId}`
  );
}

function resolveExecutionReview(reviewId: ProviderDryRunExecutionReviewId) {
  return resolveRequiredRecordByValue(
    PROVIDER_DRY_RUN_EXECUTION_REVIEW_RECORDS,
    (record) => record.reviewId === reviewId,
    `provider dry-run execution review ${reviewId}`
  );
}

function resolveExecutionAcceptancePosture(
  reviewId: ProviderDryRunExecutionReviewId
) {
  return resolveRequiredRecordByValue(
    PROVIDER_DRY_RUN_EXECUTION_ACCEPTANCE_POSTURE_RECORDS,
    (record) => record.providerDryRunExecutionReviewId === reviewId,
    `provider dry-run execution acceptance posture ${reviewId}`
  );
}

function resolveExecutionAuditSummary(reviewId: ProviderDryRunExecutionReviewId) {
  return resolveRequiredRecordByValue(
    PROVIDER_DRY_RUN_EXECUTION_REVIEW_AUDIT_SUMMARY_RECORDS,
    (record) => record.providerDryRunExecutionReviewId === reviewId,
    `provider dry-run execution audit summary ${reviewId}`
  );
}

function resolveExecutionMvp(stableId: ProviderDryRunExecutionDependencyId) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_EXECUTION_MVP_RECORDS,
    stableId,
    "provider dry-run execution MVP record"
  );
}

function resolveFixtureResponse(stableId: ProviderDryRunExecutionDependencyId) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_FIXTURE_RESPONSE_RECORDS,
    stableId,
    "provider dry-run fixture response"
  );
}

function resolveExecutionOutput(stableId: ProviderDryRunExecutionDependencyId) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_EXECUTION_OUTPUT_RECORDS,
    stableId,
    "provider dry-run execution output"
  );
}

function resolveBlockedExecutionSummary(
  stableId: ProviderDryRunExecutionDependencyId
) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_BLOCKED_EXECUTION_SUMMARY_RECORDS,
    stableId,
    "provider dry-run blocked live execution summary"
  );
}

function resolveCaptureMvp(stableId: ProviderDryRunResultCaptureMvpId) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_MVP_RECORDS,
    stableId,
    "provider dry-run result capture MVP"
  );
}

function resolveCaptureInput(stableId: ProviderDryRunResultCaptureMvpId) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_INPUT_RECORDS,
    stableId,
    "provider dry-run result capture input"
  );
}

function resolveCaptureCheck(stableId: ProviderDryRunResultCaptureMvpId) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_CHECK_RECORDS,
    stableId,
    "provider dry-run result capture check"
  );
}

function resolveCapturedOutput(stableId: ProviderDryRunResultCaptureMvpId) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_CAPTURED_OUTPUT_RECORDS,
    stableId,
    "provider dry-run captured fixture result output"
  );
}

function resolveCaptureEnvelope(stableId: ProviderDryRunResultCaptureMvpId) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_ENVELOPE_RECORDS,
    stableId,
    "provider dry-run result capture envelope"
  );
}

function resolveCaptureEvidencePreview(stableId: ProviderDryRunResultCaptureMvpId) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_EVIDENCE_PREVIEW_RECORDS,
    stableId,
    "provider dry-run result capture evidence preview"
  );
}

function resolveCaptureAuditPreview(stableId: ProviderDryRunResultCaptureMvpId) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_AUDIT_PREVIEW_RECORDS,
    stableId,
    "provider dry-run result capture audit preview"
  );
}

function resolveCaptureApprovalPreview(stableId: ProviderDryRunResultCaptureMvpId) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_APPROVAL_PREVIEW_RECORDS,
    stableId,
    "provider dry-run result capture approval preview"
  );
}

function resolveCaptureSafetyGateSummary(
  stableId: ProviderDryRunResultCaptureMvpId
) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_SAFETY_GATE_SUMMARY_RECORDS,
    stableId,
    "provider dry-run result capture safety gate summary"
  );
}

function resolveCaptureBlockedPersistenceSummary(
  stableId: ProviderDryRunResultCaptureMvpId
) {
  return resolveRequiredRecordBySuffix(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_BLOCKED_PERSISTENCE_SUMMARY_RECORDS,
    stableId,
    "provider dry-run result capture blocked persistence summary"
  );
}

function resolveCaptureReadinessMatrix(stableId: ProviderDryRunResultCaptureMvpId) {
  return resolveRequiredRecordByValue(
    PROVIDER_DRY_RUN_RESULT_CAPTURE_READINESS_MATRIX_RECORDS,
    (record) =>
      record.stableId === stableId &&
      record.readinessId === RESULT_CAPTURE_REVIEW_READINESS_ID,
    `provider dry-run result capture readiness matrix ${stableId}`
  );
}

const REVIEW_RECORDS: readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord[] =
  REVIEW_SEEDS.map((seed) => {
    const captureMvp = resolveCaptureMvp(seed.sourceCaptureStableId);
    const input = resolveCaptureInput(seed.sourceCaptureStableId);
    const check = resolveCaptureCheck(seed.sourceCaptureStableId);
    const capturedOutput = resolveCapturedOutput(seed.sourceCaptureStableId);
    const envelope = resolveCaptureEnvelope(seed.sourceCaptureStableId);
    const evidencePreview = resolveCaptureEvidencePreview(seed.sourceCaptureStableId);
    const auditPreview = resolveCaptureAuditPreview(seed.sourceCaptureStableId);
    const approvalPreview = resolveCaptureApprovalPreview(seed.sourceCaptureStableId);
    const safetyGateSummary = resolveCaptureSafetyGateSummary(
      seed.sourceCaptureStableId
    );
    const blockedPersistenceSummary = resolveCaptureBlockedPersistenceSummary(
      seed.sourceCaptureStableId
    );
    const readinessMatrix = resolveCaptureReadinessMatrix(
      seed.sourceCaptureStableId
    );
    const executionReview = resolveExecutionReview(seed.sourceExecutionReviewId);
    const executionAcceptancePosture = resolveExecutionAcceptancePosture(
      seed.sourceExecutionReviewId
    );
    const executionAuditSummary = resolveExecutionAuditSummary(
      seed.sourceExecutionReviewId
    );
    const executionMvp = resolveExecutionMvp(seed.sourceExecutionStableId);
    const fixtureResponse = resolveFixtureResponse(seed.sourceExecutionStableId);
    const executionOutput = resolveExecutionOutput(seed.sourceExecutionStableId);
    const blockedExecutionSummary = resolveBlockedExecutionSummary(
      seed.sourceExecutionStableId
    );
    const admissionReview = resolveAdmissionReview(seed.sourceAdmissionReviewId);
    const selectionReview = resolveSelectionReview(
      seed.sourceProviderSelectionReviewId
    );

    return {
      key: buildStableProviderDryRunResultCaptureReviewKey(seed.reviewId),
      reviewVersion:
        "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review-preview-v1",
      reviewId: seed.reviewId,
      reviewLabel: resolveReviewLabel(seed.reviewId),
      source: REVIEW_SOURCE,
      reviewMode: REVIEW_MODE,
      reviewPosture: REVIEW_POSTURE,
      sourceProviderDryRunResultCaptureMvpReference: captureMvp.key,
      sourceProviderDryRunResultCaptureInputReference: input.key,
      sourceProviderDryRunResultCaptureCheckReference: check.key,
      sourceProviderDryRunCapturedFixtureResultOutputReference:
        capturedOutput.key,
      sourceProviderDryRunResultCaptureEnvelopeReference: envelope.key,
      sourceProviderDryRunResultCaptureEvidencePreviewReference:
        evidencePreview.key,
      sourceProviderDryRunResultCaptureAuditPreviewReference: auditPreview.key,
      sourceProviderDryRunResultCaptureApprovalPreviewReference:
        approvalPreview.key,
      sourceProviderDryRunResultCaptureSafetyGateSummaryReference:
        safetyGateSummary.key,
      sourceProviderDryRunResultCaptureBlockedPersistenceSummaryReference:
        blockedPersistenceSummary.key,
      sourceProviderDryRunResultCaptureReadinessMatrixReference:
        readinessMatrix.key,
      sourceProviderDryRunExecutionReviewReference: executionReview.key,
      sourceProviderDryRunExecutionAcceptancePostureReference:
        executionAcceptancePosture.key,
      sourceProviderDryRunExecutionAuditSummaryReference:
        executionAuditSummary.key,
      sourceProviderDryRunExecutionMvpReference: executionMvp.key,
      sourceProviderDryRunFixtureResponseReference: fixtureResponse.key,
      sourceProviderDryRunExecutionOutputReference: executionOutput.key,
      sourceProviderDryRunBlockedLiveExecutionSummaryReference:
        blockedExecutionSummary.key,
      sourceProviderDryRunAdmissionReviewReference: admissionReview.key,
      sourceProviderSelectionCredentialReferenceReviewReference:
        selectionReview.key,
      selectedCapabilityFamily: seed.selectedCapabilityFamily,
      workspaceTarget: captureMvp.workspaceTarget,
      providerSlotLabel: seed.providerSlotLabel,
      backupProviderSlotLabel: seed.backupProviderSlotLabel,
      localPrivateAlternativeLabel: captureMvp.localPrivateAlternativeLabel,
      opaqueCredentialReferenceLabel: captureMvp.opaqueCredentialReferenceLabel,
      serverOnlyProviderDryRunResultCaptureHelperState: "exists",
      providerDryRunResultCaptureState: "deterministic fixture-only",
      providerDryRunFixtureResponseCaptureState: FIXTURE_RESPONSE_STATE,
      providerDryRunResultCapturePersistenceState: "not implemented",
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
      remainingBlockers: seed.remainingBlockers,
      nextSafeAction: seed.nextSafeAction,
      currentReadiness: CURRENT_READINESS,
      acceptanceState: ACCEPTANCE_STATE,
      recoveryPosture: RECOVERY_POSTURE,
      nextProviderAdapterDryRunAuditApprovalJoinMvpRequirement:
        NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    };
  });

const OUTPUT_REVIEW_RECORDS: readonly ProviderDryRunResultCaptureOutputReviewRecord[] =
  REVIEW_SEEDS.map((seed) => {
    const captureMvp = resolveCaptureMvp(seed.sourceCaptureStableId);
    const capturedOutput = resolveCapturedOutput(seed.sourceCaptureStableId);
    const envelope = resolveCaptureEnvelope(seed.sourceCaptureStableId);
    const blockedPersistenceSummary = resolveCaptureBlockedPersistenceSummary(
      seed.sourceCaptureStableId
    );
    const fixtureResponse = resolveFixtureResponse(seed.sourceExecutionStableId);

    return {
      key: buildStableProviderDryRunResultCaptureOutputReviewKey(seed.reviewId),
      outputReviewVersion:
        "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-output-review-preview-v1",
      providerDryRunResultCaptureReviewId: seed.reviewId,
      sourceProviderDryRunCapturedFixtureResultOutputReference:
        capturedOutput.key,
      sourceProviderDryRunResultCaptureEnvelopeReference: envelope.key,
      sourceProviderDryRunResultCaptureBlockedPersistenceSummaryReference:
        blockedPersistenceSummary.key,
      sourceProviderDryRunFixtureResponseReference: fixtureResponse.key,
      captureState:
        "captured-provider-dry-run-fixture-result-in-memory-only",
      captureMode: "deterministic-fixture-only",
      capturedFixtureResponseState: FIXTURE_RESPONSE_STATE,
      liveProviderExecutionState: "blocked",
      providerDryRunResultCaptureIdPosture: "deterministic preview id only",
      providerDryRunExecutionIdPosture: "deterministic preview id only",
      providerDryRunAdmissionIdPosture: "deterministic preview id only",
      providerSlotIdPosture: "deterministic preview id only",
      credentialReferenceIdPosture:
        "deterministic opaque reference id only",
      captureDigestPosture: "deterministic preview digest only",
      selectedProviderSlotPosture: "preview-only",
      backupProviderSlotPosture: "preview-only",
      localPrivateAlternativePosture: "preview-only",
      credentialReferencePosture: "opaque-reference-only",
      credentialValueState: "not present / not read",
      envVarState: "not read",
      providerKeyState: "not read",
      providerSdkImportState: "not imported",
      providerResponseState: "not received from provider",
      modelOutputState: "not generated by provider/model",
      promptTransmissionState: "not sent",
      outputClassification:
        "deterministic dry-run fixture result capture only",
      resultPersistenceState: "not implemented",
      auditPersistenceState: "not implemented",
      approvalPersistenceState: "not implemented",
      operatorFacingExplanation:
        `${resolveReviewLabel(seed.reviewId)} stays capture-only: deterministic fixture output is held in memory only, with no provider response, no model output, and no persistence target.`,
      remainingBlockers: uniqueStrings([
        ...seed.remainingBlockers,
        "captured fixture output remains preview-only",
        "result capture envelope remains preview-only",
      ]),
      nextSafeAction:
        `Keep ${captureMvp.providerSlotLabel.toLowerCase()} output review preview-only and advance only to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH}.`,
      explicitDryRunResultCaptureFixtureOnlyNoSecretReadNoProviderCallNoPersistenceStatement:
        FIXTURE_ONLY_STATEMENT,
    };
  });

const GATE_FAILURE_REVIEW_RECORDS: readonly ProviderDryRunResultCaptureGateFailureReviewRecord[] =
  REVIEW_RECORDS.flatMap((review) =>
    PROVIDER_DRY_RUN_RESULT_CAPTURE_GATE_FAILURE_REVIEW_DEFINITIONS.map(
      (definition) => ({
        key: buildStableProviderDryRunResultCaptureGateFailureReviewKey(
          review.reviewId,
          definition.failedGateId
        ),
        gateFailureReviewVersion:
          "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate-failure-review-preview-v1",
        providerDryRunResultCaptureReviewId: review.reviewId,
        failedGateId: definition.failedGateId,
        failedGateLabel: definition.failedGateLabel,
        gateState: "blocked",
        severity: resolveGateFailureSeverity(definition.failedGateId),
        affectedCapabilityFamily: review.selectedCapabilityFamily,
        affectedWorkspaceTarget: review.workspaceTarget,
        affectedProviderSlot: review.providerSlotLabel,
        affectedCredentialReference: review.opaqueCredentialReferenceLabel,
        operatorFacingExplanation:
          `${definition.failedGateLabel} stays preview-only for ${review.reviewLabel}. The layer confirms the boundary, but it does not pass a live gate or enable execution or persistence.`,
        requiredEvidenceToUnblock:
          `${definition.failedGateLabel} evidence must remain explicit in backend-only review records before the next server-only join layer is added.`,
        requiredRecoveryAction:
          `Keep ${definition.failedGateLabel} blocked in preview-only review records and route future work into the backend-owned dry-run audit and approval join MVP.`,
        providerAdapterDryRunAuditApprovalJoinMvpDependency:
          NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
        nextSafeAction:
          "Preserve the blocked gate and move only to the backend-owned audit and approval join MVP.",
        explicitNoLiveGatePassStatement: NO_LIVE_GATE_PASS_STATEMENT,
      })
    )
  );

const RECOVERY_PLAN_PREVIEW_RECORDS: readonly ProviderDryRunResultCaptureRecoveryPlanPreviewRecord[] =
  REVIEW_RECORDS.map((review) => ({
    key: buildStableProviderDryRunResultCaptureRecoveryPlanKey(review.reviewId),
    recoveryPlanVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-recovery-plan-preview-v1",
    providerDryRunResultCaptureReviewId: review.reviewId,
    recoveryPosture: RECOVERY_POSTURE,
    serverOnlyProviderDryRunResultCaptureHelperRecovery:
      "Keep the server-only result capture helper unchanged and use review records only to explain its deterministic in-memory behavior.",
    dryRunResultCaptureInputRecovery:
      "Keep the capture input redacted, fixture-only, and backend-owned with no frontend request and no API route.",
    dryRunResultCaptureCheckRecovery:
      "Keep capture checks blocked, deterministic, and preview-only until the next server-only join layer exists.",
    capturedFixtureResultOutputRecovery:
      "Keep captured fixture output in memory only and avoid any persistence target, provider response claim, or model output claim.",
    resultCaptureEnvelopeRecovery:
      "Keep the result capture envelope redacted, preview-only, and detached from prompt transmission.",
    blockedPersistenceSummaryRecovery:
      "Keep blocked persistence explicit and do not introduce storage writes, audit writes, approval writes, or filesystem writes.",
    evidencePreviewRecovery:
      "Retain evidence preview-only posture and do not persist evidence packets.",
    auditPreviewRecovery:
      "Retain audit preview-only posture and do not persist audit joins or audit records.",
    approvalPreviewRecovery:
      "Retain approval preview-only posture and do not create real approval requests, records, tokens, or leases.",
    dryRunExecutionDependencyRecovery:
      "Continue sourcing capture review evidence from the existing dry-run execution review layer without changing its blocked posture.",
    dryRunFixtureResponseDependencyRecovery:
      "Continue sourcing deterministic fixture responses from the existing execution MVP without enabling provider calls.",
    providerSelectionDependencyRecovery:
      "Continue sourcing provider slot and credential reference posture from the selection review layer with opaque labels only.",
    credentialReferenceRecovery:
      "Keep credential references opaque and operator-facing only.",
    credentialValueBoundaryRecovery:
      "Keep credential values absent and unread.",
    envVarBoundaryRecovery:
      "Keep env vars unread.",
    providerKeyBoundaryRecovery:
      "Keep provider keys unread.",
    providerSdkBoundaryRecovery:
      "Keep provider SDK imports blocked.",
    liveProviderExecutionBoundaryRecovery:
      "Keep live provider execution blocked.",
    promptBoundaryRecovery:
      "Keep prompt transmission blocked and the chat input inert/local only.",
    modelBoundaryRecovery:
      "Keep model calls blocked and model output unavailable.",
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
      "Leave result persistence unimplemented in this review-only batch.",
    auditPersistenceMissingRecovery:
      "Leave audit persistence unimplemented in this review-only batch.",
    approvalPersistenceMissingRecovery:
      "Leave approval persistence unimplemented in this review-only batch.",
    databaseWriteBlockedRecovery:
      "Keep database writes blocked.",
    fileWriteBlockedRecovery:
      "Keep file writes blocked.",
    auditApprovalJoinMissingRecovery:
      "Implement the backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP next without enabling live execution or persistence.",
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    operatorActionRequired:
      "Operator action required: confirm the preview-only review evidence and keep every execution and persistence boundary blocked.",
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    explicitNoRetryNoFallbackNoProviderNoPromptNoSecretReadNoPersistenceStatement:
      NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_SECRET_READ_NO_PERSISTENCE_STATEMENT,
  }));

const RECOVERY_READINESS_CHECKLIST_RECORDS: readonly ProviderDryRunResultCaptureRecoveryReadinessChecklistRecord[] =
  REVIEW_RECORDS.flatMap((review) =>
    PROVIDER_DRY_RUN_RESULT_CAPTURE_RECOVERY_READINESS_CHECKLIST_DEFINITIONS.map(
      (definition) => {
        const seed = buildReadinessChecklistSeed(
          definition.checklistId,
          definition.label
        );

        return {
          key: buildStableProviderDryRunResultCaptureRecoveryReadinessChecklistKey(
            review.reviewId,
            seed.checklistId
          ),
          checklistVersion:
            "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-recovery-readiness-checklist-v1",
          providerDryRunResultCaptureReviewId: review.reviewId,
          checklistId: seed.checklistId,
          label: seed.label,
          state: seed.state,
          severity: seed.severity,
          evidenceRequired: seed.evidenceRequired,
          recoveryAction: seed.recoveryAction,
          owner: seed.owner,
          currentPosture: CURRENT_POSTURE,
          providerAdapterDryRunAuditApprovalJoinMvpDependency:
            NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
          nextSafeAction: seed.nextSafeAction,
        };
      }
    )
  );

const REVIEW_AUDIT_SUMMARY_RECORDS: readonly ProviderDryRunResultCaptureReviewAuditSummaryRecord[] =
  REVIEW_RECORDS.map((review) => ({
    key: buildStableProviderDryRunResultCaptureReviewAuditSummaryKey(
      review.reviewId
    ),
    auditSummaryVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review-audit-summary-preview-v1",
    providerDryRunResultCaptureReviewId: review.reviewId,
    auditPosture: AUDIT_POSTURE,
    captureReferenceState: REFERENCE_STATE,
    capturedFixtureResponseReferenceState: REFERENCE_STATE,
    executionReferenceState: REFERENCE_STATE,
    providerSlotReferenceState: REFERENCE_STATE,
    credentialReferenceState: CREDENTIAL_REFERENCE_AUDIT_STATE,
    liveProviderExecutionState: "blocked",
    credentialValueState: "not present / not read",
    envVarState: "not read",
    providerKeyState: "not read",
    evidencePacketState: EVIDENCE_PACKET_STATE,
    serverOnlyResultCaptureHelperEvidenceSummary:
      "Server-only helper exists and stays deterministic, fixture-only, backend-only, and in-memory only.",
    deterministicDryRunResultCaptureEvidenceSummary:
      "Result capture identifiers, output review keys, gate review keys, and recovery review keys are deterministic preview identifiers only.",
    capturedFixtureResponseEvidenceSummary:
      "Captured fixture response references remain preview-only and are not persisted.",
    blockedPersistenceSummary:
      "Result persistence, audit persistence, approval persistence, database writes, and file writes remain blocked.",
    failedGateSummary:
      "Live provider execution, prompt sending, model calls, provider SDK imports, and persistence all remain blocked gates.",
    recoverySummary:
      "Recovery remains manual review only with retry disabled and fallback disabled.",
    blockedActionSummary:
      "No frontend request, no API route, no queue dispatch, no worker dispatch, and no job execution are created by this review layer.",
    noSecretReadStatement:
      "No credential value is present or read.",
    noEnvVarReadStatement: "No env vars are read.",
    noProviderOutputStatement:
      "No provider response is received from a provider.",
    noModelOutputStatement:
      "No model output is generated by a provider/model.",
    noPromptSendingStatement: "No prompt sending.",
    noResultPersistenceStatement: "No result persistence.",
    noAuditPersistenceStatement: "No audit persistence.",
    noApprovalPersistenceStatement: "No approval persistence.",
    noDatabaseWriteStatement: "No database write.",
    noFileWriteStatement: "No file write.",
    providerAdapterDryRunAuditAndApprovalJoinMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
  }));

const ACCEPTANCE_POSTURE_RECORDS: readonly ProviderDryRunResultCaptureAcceptancePostureRecord[] =
  REVIEW_RECORDS.map((review) => ({
    key: buildStableProviderDryRunResultCaptureAcceptancePostureKey(
      review.reviewId
    ),
    acceptancePostureVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-acceptance-posture-preview-v1",
    providerDryRunResultCaptureReviewId: review.reviewId,
    acceptanceState: ACCEPTANCE_STATE,
    fixtureOnlyAcceptanceSummary:
      "The review layer accepts deterministic fixture-only result capture preview records.",
    backendOnlyAcceptanceSummary:
      "The review layer accepts backend-only posture only.",
    serverOnlyAcceptanceSummary:
      "The review layer accepts server-only helper posture only.",
    dryRunResultCaptureOnlyAcceptanceSummary:
      "The review layer accepts dry-run result capture preview posture only.",
    credentialReferenceOnlyAcceptanceSummary:
      "The review layer accepts opaque credential reference posture only.",
    capturedFixtureResponseOnlyAcceptanceSummary:
      "The review layer accepts captured fixture response references in memory only.",
    blockedLiveExecutionAcceptanceSummary:
      "Live provider execution remains explicitly blocked and is not accepted.",
    blockedPersistenceAcceptanceSummary:
      "Result, audit, and approval persistence remain blocked and are not accepted.",
    selectedProviderSlotAcceptanceSummary:
      "Selected provider slots remain preview-only and are not live-executed.",
    backupProviderSlotAcceptanceSummary:
      "Backup provider slots remain preview-only and are not live-executed.",
    localPrivateAlternativeAcceptanceSummary:
      "Local/private alternatives remain preview-only and are not live-executed.",
    providerBlockers: [
      "provider SDK imports remain blocked",
      "live provider execution remains blocked",
      "provider responses remain unavailable",
    ],
    credentialValueBlockers: [
      "credential values are not present",
      "credential values are not read",
    ],
    envVarBlockers: ["env vars are not read", "provider keys are not read"],
    promptBlockers: [
      "redacted prompt envelope is preview-only",
      "prompt transmission is not sent",
    ],
    modelBlockers: [
      "model calls are not made",
      "model output is not generated",
    ],
    queueWorkerJobBlockers: [
      "queue dispatch is not dispatched",
      "worker dispatch is not dispatched",
      "job execution is not executed",
    ],
    resultPersistenceBlockers: ["result persistence is not implemented"],
    auditPersistenceBlockers: ["audit persistence is not implemented"],
    approvalPersistenceBlockers: ["approval persistence is not implemented"],
    databaseFileBlockers: [
      "database write is not implemented",
      "file write is not implemented",
    ],
    approvalBlockers: [
      "no real approval request exists",
      "no real approval recording exists",
      "approval token is not issued",
      "approval lease is not created",
    ],
    auditBlockers: [
      "audit remains preview-only",
      "evidence packets are not persisted",
    ],
    auditApprovalJoinBlockers: [
      "audit approval join MVP is not implemented",
      "joined result/audit/approval persistence is unavailable",
    ],
    requiredEvidence: [
      "server-only helper evidence",
      "deterministic capture output evidence",
      "blocked persistence evidence",
      "execution review dependency evidence",
    ],
    nextSafeAction:
      "Accept the fixture-only review layer, keep live execution and persistence blocked, and implement the backend-owned audit and approval join MVP next.",
    explicitProviderDryRunResultCaptureFixtureAcceptedLiveProviderExecutionAndPersistenceNotAcceptedStatement:
      ACCEPTANCE_STATEMENT,
  }));

export function buildStableProviderDryRunResultCaptureReviewKey(
  reviewId: ProviderDryRunResultCaptureReviewId
): ProviderDryRunResultCaptureReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review:${reviewId}`;
}

export function buildStableProviderDryRunResultCaptureOutputReviewKey(
  reviewId: ProviderDryRunResultCaptureReviewId
): ProviderDryRunResultCaptureOutputReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-output-review:${reviewId}`;
}

export function buildStableProviderDryRunResultCaptureGateFailureReviewKey(
  reviewId: ProviderDryRunResultCaptureReviewId,
  failedGateId: ProviderDryRunResultCaptureGateFailureReviewId
): ProviderDryRunResultCaptureGateFailureReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate-failure-review:${reviewId}:${failedGateId}`;
}

export function buildStableProviderDryRunResultCaptureRecoveryPlanKey(
  reviewId: ProviderDryRunResultCaptureReviewId
): ProviderDryRunResultCaptureRecoveryPlanKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-recovery-plan:${reviewId}`;
}

export function buildStableProviderDryRunResultCaptureRecoveryReadinessChecklistKey(
  reviewId: ProviderDryRunResultCaptureReviewId,
  checklistId: ProviderDryRunResultCaptureRecoveryReadinessChecklistId
): ProviderDryRunResultCaptureRecoveryReadinessChecklistKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-recovery-readiness:${reviewId}:${checklistId}`;
}

export function buildStableProviderDryRunResultCaptureReviewAuditSummaryKey(
  reviewId: ProviderDryRunResultCaptureReviewId
): ProviderDryRunResultCaptureReviewAuditSummaryKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review-audit-summary:${reviewId}`;
}

export function buildStableProviderDryRunResultCaptureAcceptancePostureKey(
  reviewId: ProviderDryRunResultCaptureReviewId
): ProviderDryRunResultCaptureAcceptancePostureKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-acceptance-posture:${reviewId}`;
}

export function listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews(): readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord[] {
  return cloneList(REVIEW_RECORDS);
}

export function listProviderDryRunResultCaptureOutputReviewRecords(): readonly ProviderDryRunResultCaptureOutputReviewRecord[] {
  return cloneList(OUTPUT_REVIEW_RECORDS);
}

export function listProviderDryRunResultCaptureGateFailureReviewRecords(): readonly ProviderDryRunResultCaptureGateFailureReviewRecord[] {
  return cloneList(GATE_FAILURE_REVIEW_RECORDS);
}

export function listProviderDryRunResultCaptureRecoveryPlanPreviews(): readonly ProviderDryRunResultCaptureRecoveryPlanPreviewRecord[] {
  return cloneList(RECOVERY_PLAN_PREVIEW_RECORDS);
}

export function listProviderDryRunResultCaptureRecoveryReadinessChecklistRecords(): readonly ProviderDryRunResultCaptureRecoveryReadinessChecklistRecord[] {
  return cloneList(RECOVERY_READINESS_CHECKLIST_RECORDS);
}

export function listProviderDryRunResultCaptureReviewAuditSummaries(): readonly ProviderDryRunResultCaptureReviewAuditSummaryRecord[] {
  return cloneList(REVIEW_AUDIT_SUMMARY_RECORDS);
}

export function listProviderDryRunResultCaptureAcceptancePostureRecords(): readonly ProviderDryRunResultCaptureAcceptancePostureRecord[] {
  return cloneList(ACCEPTANCE_POSTURE_RECORDS);
}

export function groupProviderDryRunResultCaptureReviewsByCapabilityFamily(): readonly ProviderDryRunResultCaptureReviewCapabilityFamilyGroup[] {
  return uniqueStrings(REVIEW_RECORDS.map((record) => record.selectedCapabilityFamily)).map(
    (capabilityFamily) => {
      const reviews = REVIEW_RECORDS.filter(
        (record) => record.selectedCapabilityFamily === capabilityFamily
      );

      return {
        capabilityFamily,
        reviewCount: reviews.length,
        reviews,
      };
    }
  );
}

export function groupProviderDryRunResultCaptureReviewsByProviderSlot(): readonly ProviderDryRunResultCaptureReviewProviderSlotGroup[] {
  return uniqueStrings(REVIEW_RECORDS.map((record) => record.providerSlotLabel)).map(
    (providerSlotLabel) => {
      const reviews = REVIEW_RECORDS.filter(
        (record) => record.providerSlotLabel === providerSlotLabel
      );

      return {
        providerSlotLabel: providerSlotLabel as ProviderDryRunResultCaptureProviderSlotLabel,
        reviewCount: reviews.length,
        reviews,
      };
    }
  );
}

export function groupProviderDryRunResultCaptureReviewsByCredentialReference(): readonly ProviderDryRunResultCaptureReviewCredentialReferenceGroup[] {
  return uniqueStrings(
    REVIEW_RECORDS.map((record) => record.opaqueCredentialReferenceLabel)
  ).map((opaqueCredentialReferenceLabel) => {
    const reviews = REVIEW_RECORDS.filter(
      (record) =>
        record.opaqueCredentialReferenceLabel === opaqueCredentialReferenceLabel
    );

    return {
      opaqueCredentialReferenceLabel:
        opaqueCredentialReferenceLabel as BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord["opaqueCredentialReferenceLabel"],
      reviewCount: reviews.length,
      reviews,
    };
  });
}

export function buildProviderDryRunResultCaptureReviewSummary(): ProviderDryRunResultCaptureReviewSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review-summary-v1",
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    currentReadiness: CURRENT_READINESS,
    acceptanceState: ACCEPTANCE_STATE,
    recoveryPosture: RECOVERY_POSTURE,
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    recordCount: REVIEW_RECORDS.length,
    sectionTitles: MINIMAL_PROVIDER_DRY_RUN_RESULT_CAPTURE_REVIEW_SECTION_TITLES,
    summaryLines: REVIEW_SUMMARY_LINES,
  };
}

export function buildProviderDryRunResultCaptureOutputReviewSummary(): ProviderDryRunResultCaptureOutputReviewSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-output-review-summary-v1",
    recordCount: OUTPUT_REVIEW_RECORDS.length,
    summaryLines: OUTPUT_REVIEW_SUMMARY_LINES,
    nextSafeAction:
      "Keep captured fixture output preview-only and use the next backend-owned audit and approval join MVP for any future join-layer work.",
  };
}

export function buildProviderDryRunResultCaptureGateFailureSummary(): ProviderDryRunResultCaptureGateFailureSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate-failure-summary-v1",
    recordCount: GATE_FAILURE_REVIEW_RECORDS.length,
    blockedGateCount: GATE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: GATE_FAILURE_SUMMARY_LINES,
    nextSafeAction:
      "Keep every listed gate blocked and preserve preview-only posture until the backend-owned audit and approval join MVP is implemented.",
  };
}

export function buildProviderDryRunResultCaptureRecoverySummary(): ProviderDryRunResultCaptureRecoverySummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-recovery-summary-v1",
    recordCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    summaryLines: RECOVERY_SUMMARY_LINES,
    nextSafeAction:
      "Recovery remains manual review only; move next to the backend-owned audit and approval join MVP without enabling execution or persistence.",
  };
}

export function buildProviderAdapterDryRunAuditApprovalJoinMvpChecklist(): ProviderAdapterDryRunAuditApprovalJoinMvpChecklist {
  return cloneList(PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_CHECKLIST);
}

export function uniqueProviderDryRunResultCaptureReviewDisplayStrings(
  values: readonly string[]
): readonly string[] {
  return uniqueStrings(values);
}
