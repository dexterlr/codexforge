import {
  listSyntheticMvpManualApprovalFixtures,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp/backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-catalog";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview/backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview-catalog";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews,
} from "../min-provider-admit-review/min-provider-admit-review-catalog";
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
import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews,
  listProviderDryRunResultCaptureOutputReviewRecords,
} from "../min-provider-capture-review/min-provider-capture-review-catalog";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews,
} from "../min-provider-review/min-provider-review-catalog";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews,
} from "../min-text-aa-review/min-text-aa-review-catalog";
import type {
  BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord,
  ProviderDryRunResultCaptureOutputReviewRecord,
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
import type { BackendOwnedMinimalManualGatedTextAdapterAuditApprovalJoinReviewRecord } from "../min-text-aa-review/min-text-aa-review-types";
import type { SyntheticMvpManualApprovalFixtureRecord } from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import type { BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord } from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  type MinimalProviderAdapterDryRunAuditApprovalJoinMvpId,
  type MinimalProviderAdapterDryRunAuditApprovalJoinMvpKey,
  type MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord,
  type NextProviderAdapterDryRunAuditApprovalJoinReviewRecoveryChecklist,
  type ProviderAdapterApprovalJoinId,
  type ProviderAdapterDryRunApprovalJoinOutputKey,
  type ProviderAdapterDryRunApprovalJoinOutputRecord,
  type ProviderAdapterDryRunApprovalPreviewKey,
  type ProviderAdapterDryRunApprovalPreviewRecord,
  type ProviderAdapterDryRunAuditApprovalEvidencePreviewKey,
  type ProviderAdapterDryRunAuditApprovalEvidencePreviewRecord,
  type ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckKey,
  type ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckRecord,
  type ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryKey,
  type ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryRecord,
  type ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields,
  type ProviderAdapterDryRunAuditApprovalJoinCurrentReadiness,
  type ProviderAdapterAuditApprovalJoinDigest,
  type ProviderAdapterAuditApprovalJoinAuditReference,
  type ProviderAdapterAuditApprovalJoinApprovalReference,
  type ProviderAdapterDryRunAuditApprovalJoinEnvelopeKey,
  type ProviderAdapterDryRunAuditApprovalJoinEnvelopeRecord,
  type ProviderAdapterDryRunAuditApprovalJoinErrorKey,
  type ProviderAdapterDryRunAuditApprovalJoinErrorRecord,
  type ProviderAdapterAuditApprovalJoinEvidenceReference,
  type ProviderAdapterDryRunAuditApprovalJoinGateId,
  type ProviderAdapterDryRunAuditApprovalJoinGateRecord,
  type ProviderAdapterDryRunAuditApprovalJoinGateSummary,
  type ProviderAdapterDryRunAuditApprovalJoinInputKey,
  type ProviderAdapterDryRunAuditApprovalJoinInputRecord,
  type ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixId,
  type ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord,
  type ProviderAdapterDryRunAuditApprovalJoinReadinessSummary,
  type ProviderAdapterDryRunAuditApprovalJoinRequestKey,
  type ProviderAdapterDryRunAuditApprovalJoinRequestRecord,
  type ProviderAdapterDryRunAuditApprovalJoinResponseKey,
  type ProviderAdapterDryRunAuditApprovalJoinResponseRecord,
  type ProviderAdapterAuditApprovalJoinResultReference,
  type ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryKey,
  type ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryRecord,
  type ProviderAdapterDryRunAuditApprovalJoinSummary,
  type ProviderAdapterDryRunAuditJoinOutputKey,
  type ProviderAdapterDryRunAuditJoinOutputRecord,
  type ProviderAdapterDryRunAuditPreviewKey,
  type ProviderAdapterDryRunAuditPreviewRecord,
  type ProviderAdapterAuditJoinId,
  type ProviderAdapterDryRunAuditApprovalJoinGateSummaryVersion,
  type ProviderAdapterDryRunAuditApprovalJoinReadinessSummaryVersion,
  type ProviderAdapterDryRunAuditApprovalJoinSummaryVersion,
  type ProviderAdapterDryRunAuditApprovalJoinCurrentReadiness as CurrentReadiness,
  type ProviderAdapterDryRunAuditApprovalJoinGateVersion,
  type ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixVersion,
  type ProviderAdapterDryRunAuditApprovalJoinServerOnlyHelperStatement,
  type ProviderAdapterDryRunAuditApprovalJoinBackendOnlyStatement,
  type ProviderAdapterDryRunAuditApprovalJoinDeterministicStatement,
  type ProviderAdapterDryRunAuditApprovalJoinInMemoryOnlyStatement,
} from "./min-provider-audit-join-types";

type ProviderAuditApprovalJoinSourceBundle = Readonly<{
  reviewRecord: BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord;
  captureMvpRecord: MinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecord;
  captureInputRecord: ProviderDryRunResultCaptureInputRecord;
  captureCheckRecord: ProviderDryRunResultCaptureCheckRecord;
  capturedOutputRecord: ProviderDryRunCapturedFixtureResultOutputRecord;
  captureEnvelopeRecord: ProviderDryRunResultCaptureEnvelopeRecord;
  captureOutputReviewRecord: ProviderDryRunResultCaptureOutputReviewRecord;
  captureAuditPreviewRecord: SourceProviderDryRunResultCaptureAuditPreviewRecord;
  captureApprovalPreviewRecord: SourceProviderDryRunResultCaptureApprovalPreviewRecord;
  captureEvidencePreviewRecord: SourceProviderDryRunResultCaptureEvidencePreviewRecord;
  captureSafetyGateSummaryRecord: ProviderDryRunResultCaptureSafetyGateSummaryRecord;
  captureBlockedPersistenceSummaryRecord: ProviderDryRunResultCaptureBlockedPersistenceSummaryRecord;
  captureReadinessRecord: ProviderDryRunResultCaptureReadinessMatrixRecord;
  admissionReviewRecord: ProviderDryRunAdmissionReviewRecord;
  providerSelectionReviewRecord: ProviderSelectionCredentialReferenceReviewRecord;
  textAdapterAuditApprovalJoinReviewRecord: BackendOwnedMinimalManualGatedTextAdapterAuditApprovalJoinReviewRecord;
  manualApprovalDecisionReviewRecord: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord;
  manualApprovalFixtureRecord: SyntheticMvpManualApprovalFixtureRecord;
  manualConfirmationFixtureRecord: SyntheticMvpManualApprovalFixtureRecord;
}>;

type ProviderAuditApprovalJoinGateSeed = Readonly<{
  id: ProviderAdapterDryRunAuditApprovalJoinGateId;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
}>;

type ProviderAuditApprovalJoinReadinessSeed = Readonly<{
  id: ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixId;
  label: string;
  state: string;
  evidence: string;
  nextSafeAction: string;
}>;

const STATIC_FIXTURE_ID: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId =
  "code-assistance-request";

const CURRENT_READINESS: CurrentReadiness =
  "minimal-provider-dry-run-audit-approval-join-mvp-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent";

const SUMMARY_LINES = [
  "provider adapter dry-run audit and approval join MVP is backend-only",
  "server-only provider adapter dry-run audit and approval join helper exists",
  "provider adapter dry-run audit and approval join is produced in memory only",
  "deterministic provider adapter dry-run audit and approval join only",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "live provider execution is blocked",
  "provider response is not received from provider",
  "model output is not generated by provider/model",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no retry execution",
  "no fallback execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes",
  `current readiness is ${CURRENT_READINESS}`,
  "provider adapter dry-run audit and approval join review and recovery preview comes next",
] as const;

const GATE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only helper boundary",
  "provider dry-run fixture join mode",
  "result capture review dependency",
  "captured fixture result present",
  "result capture output review dependency",
  "opaque credential reference",
  "credential value absent",
  "environment variables not read",
  "provider key not read",
  "selected provider slot preview-only",
  "backup provider slot preview-only",
  "local/private alternative preview-only",
  "provider SDK not imported",
  "provider response not received",
  "model output not generated",
  "prompt not sent",
  "manual approval fixture",
  "manual confirmation fixture",
  "deterministic provider adapter id",
  "deterministic result capture id",
  "deterministic audit join id",
  "deterministic approval join id",
  "deterministic join digest",
  "in-memory only result reference",
  "in-memory only audit reference",
  "in-memory only approval reference",
  "no real approval request",
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
  "no retry execution",
  "no fallback execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database write",
  "no file write",
  "single-run lock preview",
  "idempotency/replay preview",
  "timeout/cancel preview",
  "privacy/redaction preview",
  "kill-switch fixture",
] as const;

const READINESS_SUMMARY_LINES = [
  "server helper state",
  "source review state",
  "result capture source state",
  "result capture input state",
  "result capture check state",
  "captured result state",
  "result capture envelope state",
  "result capture output review state",
  "audit preview state",
  "approval preview state",
  "evidence preview state",
  "admission review state",
  "approval fixture state",
  "manual confirmation fixture state",
  "credential boundary state",
  "provider boundary state",
  "prompt boundary state",
  "model boundary state",
  "frontend boundary state",
  "API boundary state",
  "queue boundary state",
  "worker boundary state",
  "job boundary state",
  "result persistence boundary state",
  "audit persistence boundary state",
  "approval persistence boundary state",
  "database boundary state",
  "file boundary state",
  "single-run lock state",
  "idempotency/replay state",
  "timeout/cancel state",
  "privacy/redaction state",
  "kill-switch state",
  `current readiness: ${CURRENT_READINESS}`,
] as const;

const NEXT_REVIEW_RECOVERY_CHECKLIST = [
  "Review every deterministic provider dry-run audit join and approval join record before adding review and recovery previews.",
  "Keep the provider adapter dry-run audit and approval join MVP backend-only, server-only, dry-run-fixture-only, credential-reference-only, and in-memory-only.",
  "Preserve preview-only approval fixtures, preview-only manual confirmation fixtures, blocked prompt transmission, blocked provider/model execution, and blocked persistence boundaries.",
  "Carry audit and approval join review, gate failure review, recovery plan, and readiness preview forward without adding approval recording, token or lease issuance, queue dispatch, worker dispatch, job execution, retry, fallback, or storage writes.",
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
] as const satisfies NextProviderAdapterDryRunAuditApprovalJoinReviewRecoveryChecklist;

const BLOCKED_LIVE_ACTIONS = [
  "real approval request",
  "real approval recording",
  "approval token issuance",
  "approval lease issuance",
  "frontend request creation",
  "API route creation",
  "fetch/network call",
  "provider execution",
  "model call",
  "prompt sending",
  "queue dispatch",
  "worker dispatch",
  "job execution",
  "retry execution",
  "fallback execution",
  "result persistence",
  "audit persistence",
  "approval persistence",
  "database write",
  "file write",
] as const;

const SOURCE_REVIEWS =
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews();
const SOURCE_CAPTURE_MVPS =
  listMinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecords();
const SOURCE_CAPTURE_INPUTS = listProviderDryRunResultCaptureInputs();
const SOURCE_CAPTURE_CHECKS = listProviderDryRunResultCaptureChecks();
const SOURCE_CAPTURED_OUTPUTS = listProviderDryRunCapturedFixtureResultOutputs();
const SOURCE_CAPTURE_ENVELOPES = listProviderDryRunResultCaptureEnvelopes();
const SOURCE_CAPTURE_OUTPUT_REVIEWS =
  listProviderDryRunResultCaptureOutputReviewRecords();
const SOURCE_CAPTURE_AUDIT_PREVIEWS =
  listProviderDryRunResultCaptureAuditPreviews();
const SOURCE_CAPTURE_APPROVAL_PREVIEWS =
  listProviderDryRunResultCaptureApprovalPreviews();
const SOURCE_CAPTURE_EVIDENCE_PREVIEWS =
  listProviderDryRunResultCaptureEvidencePreviews();
const SOURCE_CAPTURE_SAFETY_GATE_SUMMARIES =
  listProviderDryRunResultCaptureSafetyGateSummaries();
const SOURCE_CAPTURE_BLOCKED_PERSISTENCE_SUMMARIES =
  listProviderDryRunResultCaptureBlockedPersistenceSummaries();
const SOURCE_CAPTURE_READINESS =
  listProviderDryRunResultCaptureReadinessMatrixRecords();
const SOURCE_ADMISSION_REVIEWS =
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews();
const SOURCE_SELECTION_REVIEWS =
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews();
const SOURCE_TEXT_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEWS =
  listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews();
const SOURCE_MANUAL_APPROVAL_DECISION_REVIEWS =
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews();
const SOURCE_MANUAL_APPROVAL_FIXTURES = listSyntheticMvpManualApprovalFixtures();

function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function cloneList<T>(records: readonly T[]): readonly T[] {
  return records.map((record) => cloneDeep(record));
}

function cloneRecord<T>(record: T): T {
  return cloneDeep(record);
}

function findRequiredByKey<T extends Readonly<{ key: string }>>(
  records: readonly T[],
  key: string,
  label: string
): T {
  const record = records.find((candidate) => candidate.key === key);

  if (!record) {
    throw new Error(`Missing ${label}: ${key}`);
  }

  return record;
}

function findRequiredById<T extends Readonly<{ id: string }>>(
  records: readonly T[],
  id: string,
  label: string
): T {
  const record = records.find((candidate) => candidate.id === id);

  if (!record) {
    throw new Error(`Missing ${label}: ${id}`);
  }

  return record;
}

function extractSlotIdentity(label: string): string {
  const normalized = label.toLowerCase();

  if (normalized.includes("openai-compatible")) {
    return "openai-compatible";
  }

  if (normalized.includes("anthropic-compatible")) {
    return "anthropic-compatible";
  }

  if (normalized.includes("gemini-compatible")) {
    return "gemini-compatible";
  }

  if (normalized.includes("local/private")) {
    return "local-private";
  }

  if (normalized.includes("fallback disabled")) {
    return "fallback-disabled";
  }

  return normalized;
}

function isKnownSlotIdentity(label: string): boolean {
  return [
    "openai-compatible",
    "anthropic-compatible",
    "gemini-compatible",
    "local-private",
    "fallback-disabled",
  ].includes(extractSlotIdentity(label));
}

function buildProviderAdapterAuditJoinId(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterAuditJoinId {
  return `provider-dry-run-audit-join-preview:${id}`;
}

function buildProviderAdapterApprovalJoinId(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterApprovalJoinId {
  return `provider-dry-run-approval-join-preview:${id}`;
}

function buildProviderAdapterAuditApprovalJoinDigest(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterAuditApprovalJoinDigest {
  return `provider-dry-run-audit-approval-join-digest-preview:${id}:in-memory-only`;
}

function buildProviderAdapterAuditApprovalJoinResultReference(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterAuditApprovalJoinResultReference {
  return `provider-dry-run-audit-approval-join-result-reference-preview:${id}`;
}

function buildProviderAdapterAuditApprovalJoinAuditReference(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterAuditApprovalJoinAuditReference {
  return `provider-dry-run-audit-approval-join-audit-reference-preview:${id}`;
}

function buildProviderAdapterAuditApprovalJoinApprovalReference(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterAuditApprovalJoinApprovalReference {
  return `provider-dry-run-audit-approval-join-approval-reference-preview:${id}`;
}

function buildProviderAdapterAuditApprovalJoinEvidenceReference(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterAuditApprovalJoinEvidenceReference {
  return `provider-dry-run-audit-approval-join-evidence-reference-preview:${id}`;
}

export function buildStableMinimalProviderAdapterDryRunAuditApprovalJoinMvpKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): MinimalProviderAdapterDryRunAuditApprovalJoinMvpKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-mvp:${id}`;
}

function buildInputKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunAuditApprovalJoinInputKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-input:${id}`;
}

function buildAdmissionCheckKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-admission-check:${id}`;
}

function buildAuditJoinOutputKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunAuditJoinOutputKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-join-output:${id}`;
}

function buildApprovalJoinOutputKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunApprovalJoinOutputKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-join-output:${id}`;
}

function buildEnvelopeKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunAuditApprovalJoinEnvelopeKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-envelope:${id}`;
}

function buildAuditPreviewKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunAuditPreviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview:${id}`;
}

function buildApprovalPreviewKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunApprovalPreviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview:${id}`;
}

function buildEvidencePreviewKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunAuditApprovalEvidencePreviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-evidence-preview:${id}`;
}

function buildSafetyGateSummaryKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-safety-gate-summary:${id}`;
}

function buildBlockedLivePersistenceSummaryKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-blocked-live-persistence-summary:${id}`;
}

function buildRequestKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunAuditApprovalJoinRequestKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-request:${id}`;
}

function buildResponseKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunAuditApprovalJoinResponseKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-response:${id}`;
}

function buildErrorKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): ProviderAdapterDryRunAuditApprovalJoinErrorKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-error:${id}`;
}

function resolveSourceBundle(
  review: BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord
): ProviderAuditApprovalJoinSourceBundle {
  const admissionReview = findRequiredByKey(
    SOURCE_ADMISSION_REVIEWS,
    review.sourceProviderDryRunAdmissionReviewReference,
    "provider dry-run admission review"
  );
  const providerSelectionReview = findRequiredByKey(
    SOURCE_SELECTION_REVIEWS,
    review.sourceProviderSelectionCredentialReferenceReviewReference,
    "provider selection credential reference review"
  );
  const textAdapterAuditApprovalJoinReview = findRequiredByKey(
    SOURCE_TEXT_ADAPTER_AUDIT_APPROVAL_JOIN_REVIEWS,
    providerSelectionReview.sourceTextAdapterAuditApprovalJoinReviewReference,
    "text adapter audit approval join review"
  );
  const manualApprovalDecisionReview = findRequiredByKey(
    SOURCE_MANUAL_APPROVAL_DECISION_REVIEWS,
    textAdapterAuditApprovalJoinReview.sourceManualApprovalDecisionReviewReference,
    "manual approval decision review"
  );
  const manualApprovalFixture = SOURCE_MANUAL_APPROVAL_FIXTURES.find(
    (candidate) => candidate.executionMvpId === manualApprovalDecisionReview.id
  );

  if (!manualApprovalFixture) {
    throw new Error(
      `Missing manual approval fixture for ${manualApprovalDecisionReview.id}`
    );
  }

  return {
    reviewRecord: review,
    captureMvpRecord: findRequiredByKey(
      SOURCE_CAPTURE_MVPS,
      review.sourceProviderDryRunResultCaptureMvpReference,
      "provider dry-run result capture MVP"
    ),
    captureInputRecord: findRequiredByKey(
      SOURCE_CAPTURE_INPUTS,
      review.sourceProviderDryRunResultCaptureInputReference,
      "provider dry-run result capture input"
    ),
    captureCheckRecord: findRequiredByKey(
      SOURCE_CAPTURE_CHECKS,
      review.sourceProviderDryRunResultCaptureCheckReference,
      "provider dry-run result capture check"
    ),
    capturedOutputRecord: findRequiredByKey(
      SOURCE_CAPTURED_OUTPUTS,
      review.sourceProviderDryRunCapturedFixtureResultOutputReference,
      "captured provider dry-run fixture result output"
    ),
    captureEnvelopeRecord: findRequiredByKey(
      SOURCE_CAPTURE_ENVELOPES,
      review.sourceProviderDryRunResultCaptureEnvelopeReference,
      "provider dry-run result capture envelope"
    ),
    captureOutputReviewRecord: SOURCE_CAPTURE_OUTPUT_REVIEWS.find(
      (candidate) =>
        candidate.providerDryRunResultCaptureReviewId === review.reviewId
    ) as ProviderDryRunResultCaptureOutputReviewRecord,
    captureAuditPreviewRecord: findRequiredByKey(
      SOURCE_CAPTURE_AUDIT_PREVIEWS,
      review.sourceProviderDryRunResultCaptureAuditPreviewReference,
      "provider dry-run audit preview"
    ),
    captureApprovalPreviewRecord: findRequiredByKey(
      SOURCE_CAPTURE_APPROVAL_PREVIEWS,
      review.sourceProviderDryRunResultCaptureApprovalPreviewReference,
      "provider dry-run approval preview"
    ),
    captureEvidencePreviewRecord: findRequiredByKey(
      SOURCE_CAPTURE_EVIDENCE_PREVIEWS,
      review.sourceProviderDryRunResultCaptureEvidencePreviewReference,
      "provider dry-run evidence preview"
    ),
    captureSafetyGateSummaryRecord: findRequiredByKey(
      SOURCE_CAPTURE_SAFETY_GATE_SUMMARIES,
      review.sourceProviderDryRunResultCaptureSafetyGateSummaryReference,
      "provider dry-run safety gate summary"
    ),
    captureBlockedPersistenceSummaryRecord: findRequiredByKey(
      SOURCE_CAPTURE_BLOCKED_PERSISTENCE_SUMMARIES,
      review.sourceProviderDryRunResultCaptureBlockedPersistenceSummaryReference,
      "provider dry-run blocked persistence summary"
    ),
    captureReadinessRecord: findRequiredByKey(
      SOURCE_CAPTURE_READINESS,
      review.sourceProviderDryRunResultCaptureReadinessMatrixReference,
      "provider dry-run readiness matrix record"
    ),
    admissionReviewRecord: admissionReview,
    providerSelectionReviewRecord: providerSelectionReview,
    textAdapterAuditApprovalJoinReviewRecord: textAdapterAuditApprovalJoinReview,
    manualApprovalDecisionReviewRecord: manualApprovalDecisionReview,
    manualApprovalFixtureRecord: manualApprovalFixture,
    manualConfirmationFixtureRecord: manualApprovalFixture,
  };
}

function buildCommonRecordFields(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinCommonRecordFields {
  return {
    stableId: bundle.reviewRecord.reviewId,
    reviewLabel: bundle.reviewRecord.reviewLabel,
    requestLabel: bundle.admissionReviewRecord.requestLabel,
    requestIdentityId: bundle.admissionReviewRecord.reviewId,
    resultCaptureStableId: bundle.captureMvpRecord.stableId,
    capabilityFamily: bundle.reviewRecord.selectedCapabilityFamily,
    workspaceTarget: bundle.reviewRecord.workspaceTarget,
    providerSlotLabel: bundle.reviewRecord.providerSlotLabel,
    backupProviderSlotLabel: bundle.reviewRecord.backupProviderSlotLabel,
    localPrivateAlternativeLabel: bundle.reviewRecord.localPrivateAlternativeLabel,
    opaqueCredentialReferenceLabel:
      bundle.reviewRecord.opaqueCredentialReferenceLabel,
    sourceProviderDryRunResultCaptureReviewReference: bundle.reviewRecord.key,
    sourceProviderDryRunResultCaptureMvpReference: bundle.captureMvpRecord.key,
    sourceProviderDryRunResultCaptureInputReference:
      bundle.captureInputRecord.key,
    sourceProviderDryRunResultCaptureCheckReference:
      bundle.captureCheckRecord.key,
    sourceProviderDryRunCapturedFixtureResultOutputReference:
      bundle.capturedOutputRecord.key,
    sourceProviderDryRunResultCaptureEnvelopeReference:
      bundle.captureEnvelopeRecord.key,
    sourceProviderDryRunResultCaptureOutputReviewReference:
      bundle.captureOutputReviewRecord.key,
    sourceProviderDryRunResultCaptureAuditPreviewReference:
      bundle.captureAuditPreviewRecord.key,
    sourceProviderDryRunResultCaptureApprovalPreviewReference:
      bundle.captureApprovalPreviewRecord.key,
    sourceProviderDryRunResultCaptureEvidencePreviewReference:
      bundle.captureEvidencePreviewRecord.key,
    sourceProviderDryRunResultCaptureSafetyGateSummaryReference:
      bundle.captureSafetyGateSummaryRecord.key,
    sourceProviderDryRunResultCaptureBlockedPersistenceSummaryReference:
      bundle.captureBlockedPersistenceSummaryRecord.key,
    sourceProviderDryRunResultCaptureReadinessMatrixReference:
      bundle.captureReadinessRecord.key,
    sourceProviderDryRunAdmissionReviewReference:
      bundle.admissionReviewRecord.key,
    sourceProviderSelectionCredentialReferenceReviewReference:
      bundle.providerSelectionReviewRecord.key,
    sourceManualApprovalDecisionReviewReference:
      bundle.manualApprovalDecisionReviewRecord.key,
    sourceManualApprovalFixtureReference:
      bundle.manualApprovalFixtureRecord.key,
    sourceManualConfirmationFixtureReference:
      bundle.manualConfirmationFixtureRecord.key,
    backendOwnedMode: "backend-owned",
    serverOnlyMode: "server-only",
    auditApprovalJoinMode: "audit-approval-join",
    manualGatedMode: "manual-gated",
    fixtureOnlyMode: "fixture-only",
    credentialReferenceOnlyMode: "credential-reference-only",
    inMemoryOnlyMode: "in-memory-only",
    currentReadiness: CURRENT_READINESS,
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

const GATE_SEEDS: readonly ProviderAuditApprovalJoinGateSeed[] = [
  {
    id: "backend-only-boundary",
    label: "backend-only boundary",
    owner: "backend-owned join",
    requiredState: "backend-owned",
    currentState: "backend-owned join only",
    evidence: "provider adapter dry-run audit and approval join MVP is backend-only",
    blockedLiveAction: "frontend-callable join",
  },
  {
    id: "server-only-helper-boundary",
    label: "server-only helper boundary",
    owner: "server-only helper",
    requiredState: "server-only",
    currentState: "server-only helper exists",
    evidence: "server-only provider adapter dry-run audit and approval join helper exists",
    blockedLiveAction: "client import of join helper",
  },
  {
    id: "provider-dry-run-fixture-join-mode",
    label: "provider dry-run fixture join mode",
    owner: "join mode",
    requiredState: "manual-gated / fixture-only / credential-reference-only",
    currentState: "dry-run fixture join mode only",
    evidence: "joined provider dry-run fixture remains in memory only",
    blockedLiveAction: "live provider-backed join",
  },
  {
    id: "result-capture-review-dependency",
    label: "result capture review dependency",
    owner: "source review",
    requiredState: "review record exists",
    currentState: "review record resolved",
    evidence: "provider dry-run result capture review source is resolved",
    blockedLiveAction: "join without review source",
  },
  {
    id: "captured-fixture-result-present",
    label: "captured fixture result present",
    owner: "captured result source",
    requiredState: "captured-provider-dry-run-fixture-result-in-memory-only",
    currentState: "captured-provider-dry-run-fixture-result-in-memory-only",
    evidence: "captured provider dry-run fixture result output is present",
    blockedLiveAction: "join without captured fixture result",
  },
  {
    id: "result-capture-output-review-dependency",
    label: "result capture output review dependency",
    owner: "output review",
    requiredState: "output review exists",
    currentState: "output review resolved",
    evidence: "provider dry-run result capture output review is present",
    blockedLiveAction: "join without output review",
  },
  {
    id: "opaque-credential-reference",
    label: "opaque credential reference",
    owner: "credential boundary",
    requiredState: "opaque label only",
    currentState: "opaque credential reference label only",
    evidence: "credential reference is opaque label only",
    blockedLiveAction: "credential value exposure",
  },
  {
    id: "credential-value-absent",
    label: "credential value absent",
    owner: "credential boundary",
    requiredState: "not present / not read",
    currentState: "credential value not present and not read",
    evidence: "credential value is not present",
    blockedLiveAction: "credential value hydration",
  },
  {
    id: "environment-variables-not-read",
    label: "environment variables not read",
    owner: "secret boundary",
    requiredState: "not read",
    currentState: "environment variables not read",
    evidence: "env vars are not read",
    blockedLiveAction: "environment secret read",
  },
  {
    id: "provider-key-not-read",
    label: "provider key not read",
    owner: "secret boundary",
    requiredState: "not read",
    currentState: "provider key not read",
    evidence: "provider key is not read",
    blockedLiveAction: "provider key read",
  },
  {
    id: "selected-provider-slot-preview-only",
    label: "selected provider slot preview-only",
    owner: "provider slot boundary",
    requiredState: "preview-only",
    currentState: "preview-only label",
    evidence: "selected provider slot remains a preview-only label",
    blockedLiveAction: "selected provider execution",
  },
  {
    id: "backup-provider-slot-preview-only",
    label: "backup provider slot preview-only",
    owner: "provider slot boundary",
    requiredState: "preview-only",
    currentState: "preview-only label",
    evidence: "backup provider slot remains a preview-only label",
    blockedLiveAction: "backup provider execution",
  },
  {
    id: "local-private-alternative-preview-only",
    label: "local/private alternative preview-only",
    owner: "provider slot boundary",
    requiredState: "preview-only",
    currentState: "preview-only label",
    evidence: "local/private alternative remains a preview-only label",
    blockedLiveAction: "local/private provider execution",
  },
  {
    id: "provider-sdk-not-imported",
    label: "provider SDK not imported",
    owner: "provider boundary",
    requiredState: "not imported",
    currentState: "provider SDK not imported",
    evidence: "provider SDK not imported",
    blockedLiveAction: "provider SDK import",
  },
  {
    id: "provider-response-not-received",
    label: "provider response not received",
    owner: "provider boundary",
    requiredState: "not received from provider",
    currentState: "provider response not received from provider",
    evidence: "provider response is not received from provider",
    blockedLiveAction: "provider response receipt",
  },
  {
    id: "model-output-not-generated",
    label: "model output not generated",
    owner: "model boundary",
    requiredState: "not generated by provider/model",
    currentState: "model output not generated by provider/model",
    evidence: "model output is not generated by provider/model",
    blockedLiveAction: "provider/model output generation",
  },
  {
    id: "prompt-not-sent",
    label: "prompt not sent",
    owner: "prompt boundary",
    requiredState: "not sent",
    currentState: "prompt transmission state is not sent",
    evidence: "prompt transmission state is not sent",
    blockedLiveAction: "prompt sending",
  },
  {
    id: "manual-approval-fixture",
    label: "manual approval fixture",
    owner: "approval fixture",
    requiredState: "preview-only",
    currentState: "approval fixture preview-only",
    evidence: "approval fixture is preview-only",
    blockedLiveAction: "real approval request",
  },
  {
    id: "manual-confirmation-fixture",
    label: "manual confirmation fixture",
    owner: "confirmation fixture",
    requiredState: "preview-only",
    currentState: "manual confirmation fixture preview-only",
    evidence: "manual confirmation fixture is preview-only",
    blockedLiveAction: "manual confirmation capture",
  },
  {
    id: "deterministic-provider-adapter-id",
    label: "deterministic provider adapter id",
    owner: "determinism",
    requiredState: "stable review id only",
    currentState: "stable review id only",
    evidence: "join stable id is derived from the source review id only",
    blockedLiveAction: "random join id",
  },
  {
    id: "deterministic-result-capture-id",
    label: "deterministic result capture id",
    owner: "determinism",
    requiredState: "stable capture id only",
    currentState: "stable capture id only",
    evidence: "result capture stable id is preserved from the source record",
    blockedLiveAction: "random capture id",
  },
  {
    id: "deterministic-audit-join-id",
    label: "deterministic audit join id",
    owner: "determinism",
    requiredState: "derived from stable source id",
    currentState: "derived from stable source id",
    evidence: "audit join id is derived from the stable source id only",
    blockedLiveAction: "random audit join id",
  },
  {
    id: "deterministic-approval-join-id",
    label: "deterministic approval join id",
    owner: "determinism",
    requiredState: "derived from stable source id",
    currentState: "derived from stable source id",
    evidence: "approval join id is derived from the stable source id only",
    blockedLiveAction: "random approval join id",
  },
  {
    id: "deterministic-join-digest",
    label: "deterministic join digest",
    owner: "determinism",
    requiredState: "derived from stable source id",
    currentState: "derived from stable source id",
    evidence: "join digest is derived from the stable source id only",
    blockedLiveAction: "random join digest",
  },
  {
    id: "in-memory-only-result-reference",
    label: "in-memory only result reference",
    owner: "reference boundary",
    requiredState: "preview-only / not persisted",
    currentState: "preview-only / not persisted",
    evidence: "result reference remains in memory only",
    blockedLiveAction: "persisted result reference",
  },
  {
    id: "in-memory-only-audit-reference",
    label: "in-memory only audit reference",
    owner: "reference boundary",
    requiredState: "preview-only / not persisted",
    currentState: "preview-only / not persisted",
    evidence: "audit reference remains in memory only",
    blockedLiveAction: "persisted audit reference",
  },
  {
    id: "in-memory-only-approval-reference",
    label: "in-memory only approval reference",
    owner: "reference boundary",
    requiredState: "preview-only / not persisted",
    currentState: "preview-only / not persisted",
    evidence: "approval reference remains in memory only",
    blockedLiveAction: "persisted approval reference",
  },
  {
    id: "no-real-approval-request",
    label: "no real approval request",
    owner: "approval boundary",
    requiredState: "not created",
    currentState: "real approval request absent",
    evidence: "no real approval request",
    blockedLiveAction: "approval request creation",
  },
  {
    id: "no-real-approval-recording",
    label: "no real approval recording",
    owner: "approval boundary",
    requiredState: "not recorded",
    currentState: "approval recording not recorded",
    evidence: "no real approval recording",
    blockedLiveAction: "approval recording",
  },
  {
    id: "no-approval-token-issuance",
    label: "no approval token issuance",
    owner: "approval boundary",
    requiredState: "not issued",
    currentState: "approval token not issued",
    evidence: "approval token is not issued",
    blockedLiveAction: "approval token issuance",
  },
  {
    id: "no-approval-lease-issuance",
    label: "no approval lease issuance",
    owner: "approval boundary",
    requiredState: "not created",
    currentState: "approval lease not created",
    evidence: "approval lease is not created",
    blockedLiveAction: "approval lease issuance",
  },
  {
    id: "no-frontend-request",
    label: "no frontend request",
    owner: "frontend boundary",
    requiredState: "not created",
    currentState: "frontend request not created",
    evidence: "no frontend request is created",
    blockedLiveAction: "frontend request creation",
  },
  {
    id: "no-api-route",
    label: "no API route",
    owner: "API boundary",
    requiredState: "not created",
    currentState: "API route not created",
    evidence: "no API route is created",
    blockedLiveAction: "API route creation",
  },
  {
    id: "no-fetch-network",
    label: "no fetch/network",
    owner: "network boundary",
    requiredState: "blocked",
    currentState: "no fetch/network",
    evidence: "join remains in-memory-only with no network path",
    blockedLiveAction: "fetch/network call",
  },
  {
    id: "no-provider-execution",
    label: "no provider execution",
    owner: "provider boundary",
    requiredState: "blocked",
    currentState: "live provider execution blocked",
    evidence: "live provider execution is blocked",
    blockedLiveAction: "provider execution",
  },
  {
    id: "no-model-call",
    label: "no model call",
    owner: "model boundary",
    requiredState: "blocked",
    currentState: "model output not generated by provider/model",
    evidence: "model output is not generated by provider/model",
    blockedLiveAction: "model call",
  },
  {
    id: "no-prompt-sending",
    label: "no prompt sending",
    owner: "prompt boundary",
    requiredState: "blocked",
    currentState: "prompt transmission state is not sent",
    evidence: "prompt transmission state is not sent",
    blockedLiveAction: "prompt sending",
  },
  {
    id: "no-queue-dispatch",
    label: "no queue dispatch",
    owner: "dispatch boundary",
    requiredState: "blocked",
    currentState: "queue dispatch blocked",
    evidence: "no queue dispatch",
    blockedLiveAction: "queue dispatch",
  },
  {
    id: "no-worker-dispatch",
    label: "no worker dispatch",
    owner: "dispatch boundary",
    requiredState: "blocked",
    currentState: "worker dispatch blocked",
    evidence: "no worker dispatch",
    blockedLiveAction: "worker dispatch",
  },
  {
    id: "no-job-execution",
    label: "no job execution",
    owner: "dispatch boundary",
    requiredState: "blocked",
    currentState: "job execution blocked",
    evidence: "no job execution",
    blockedLiveAction: "job execution",
  },
  {
    id: "no-retry-execution",
    label: "no retry execution",
    owner: "retry boundary",
    requiredState: "disabled",
    currentState: "retry disabled",
    evidence: "no retry execution",
    blockedLiveAction: "retry execution",
  },
  {
    id: "no-fallback-execution",
    label: "no fallback execution",
    owner: "fallback boundary",
    requiredState: "disabled",
    currentState: "fallback disabled",
    evidence: "no fallback execution",
    blockedLiveAction: "fallback execution",
  },
  {
    id: "no-result-persistence",
    label: "no result persistence",
    owner: "persistence boundary",
    requiredState: "not implemented",
    currentState: "result persistence not implemented",
    evidence: "no result persistence",
    blockedLiveAction: "result persistence",
  },
  {
    id: "no-audit-persistence",
    label: "no audit persistence",
    owner: "persistence boundary",
    requiredState: "not implemented",
    currentState: "audit persistence not implemented",
    evidence: "no audit persistence",
    blockedLiveAction: "audit persistence",
  },
  {
    id: "no-approval-persistence",
    label: "no approval persistence",
    owner: "persistence boundary",
    requiredState: "not implemented",
    currentState: "approval persistence not implemented",
    evidence: "no approval persistence",
    blockedLiveAction: "approval persistence",
  },
  {
    id: "no-database-write",
    label: "no database write",
    owner: "storage boundary",
    requiredState: "not implemented",
    currentState: "database write target none",
    evidence: "no database writes",
    blockedLiveAction: "database write",
  },
  {
    id: "no-file-write",
    label: "no file write",
    owner: "storage boundary",
    requiredState: "not implemented",
    currentState: "file write target none",
    evidence: "no file writes",
    blockedLiveAction: "file write",
  },
  {
    id: "single-run-lock-preview",
    label: "single-run lock preview",
    owner: "safety review",
    requiredState: "preview-only",
    currentState: "preview-only marker",
    evidence: "single-run lock remains preview-only",
    blockedLiveAction: "live lock acquisition",
  },
  {
    id: "idempotency-replay-preview",
    label: "idempotency/replay preview",
    owner: "safety review",
    requiredState: "preview-only",
    currentState: "preview-only marker",
    evidence: "idempotency/replay posture remains preview-only",
    blockedLiveAction: "live replay path",
  },
  {
    id: "timeout-cancel-preview",
    label: "timeout/cancel preview",
    owner: "safety review",
    requiredState: "preview-only",
    currentState: "preview-only marker",
    evidence: "timeout/cancel posture remains preview-only",
    blockedLiveAction: "live cancel path",
  },
  {
    id: "privacy-redaction-preview",
    label: "privacy/redaction preview",
    owner: "safety review",
    requiredState: "preview-only",
    currentState: "preview-only marker",
    evidence: "privacy/redaction posture remains preview-only",
    blockedLiveAction: "unredacted prompt/provider payload",
  },
  {
    id: "kill-switch-fixture",
    label: "kill-switch fixture",
    owner: "safety review",
    requiredState: "fixture retained",
    currentState: "kill switch fixture retained",
    evidence: "kill switch fixture retained",
    blockedLiveAction: "live join without kill switch fixture",
  },
] as const;

function buildReadinessSeeds(
  bundle: ProviderAuditApprovalJoinSourceBundle
): readonly ProviderAuditApprovalJoinReadinessSeed[] {
  return [
    {
      id: "server-only-helper-state",
      label: "server-only helper state",
      state: "server-only provider adapter dry-run audit and approval join helper exists",
      evidence: "server-only helper boundary remains explicit",
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[0],
    },
    {
      id: "source-review-state",
      label: "source review state",
      state: "provider dry-run result capture review resolved",
      evidence: bundle.reviewRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[0],
    },
    {
      id: "result-capture-mvp-state",
      label: "result capture source state",
      state: bundle.captureMvpRecord.captureState,
      evidence: bundle.captureMvpRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[1],
    },
    {
      id: "result-capture-input-state",
      label: "result capture input state",
      state: bundle.captureInputRecord.requestState,
      evidence: bundle.captureInputRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[1],
    },
    {
      id: "result-capture-check-state",
      label: "result capture check state",
      state: bundle.captureCheckRecord.checkState,
      evidence: bundle.captureCheckRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[1],
    },
    {
      id: "captured-result-state",
      label: "captured result state",
      state: bundle.capturedOutputRecord.captureState,
      evidence: bundle.capturedOutputRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[1],
    },
    {
      id: "result-capture-envelope-state",
      label: "result capture envelope state",
      state: bundle.captureEnvelopeRecord.envelopeState,
      evidence: bundle.captureEnvelopeRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[1],
    },
    {
      id: "result-capture-output-review-state",
      label: "result capture output review state",
      state: bundle.captureOutputReviewRecord.captureState,
      evidence: bundle.captureOutputReviewRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[0],
    },
    {
      id: "audit-preview-state",
      label: "audit preview state",
      state: bundle.captureAuditPreviewRecord.auditPreviewState,
      evidence: bundle.captureAuditPreviewRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "approval-preview-state",
      label: "approval preview state",
      state: bundle.captureApprovalPreviewRecord.approvalPreviewState,
      evidence: bundle.captureApprovalPreviewRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "evidence-preview-state",
      label: "evidence preview state",
      state: bundle.captureEvidencePreviewRecord.evidencePreviewState,
      evidence: bundle.captureEvidencePreviewRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "admission-review-state",
      label: "admission review state",
      state: bundle.admissionReviewRecord.providerDryRunAdmissionState,
      evidence: bundle.admissionReviewRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[0],
    },
    {
      id: "approval-fixture-state",
      label: "approval fixture state",
      state: "approval fixture preview-only",
      evidence: bundle.manualApprovalFixtureRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "manual-confirmation-fixture-state",
      label: "manual confirmation fixture state",
      state: "manual confirmation fixture preview-only",
      evidence: bundle.manualConfirmationFixtureRecord.key,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "credential-boundary-state",
      label: "credential boundary state",
      state: "credential value not present and not read",
      evidence: bundle.providerSelectionReviewRecord.opaqueCredentialReferenceLabel,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[1],
    },
    {
      id: "provider-boundary-state",
      label: "provider boundary state",
      state: "live provider execution blocked",
      evidence: bundle.reviewRecord.liveProviderExecutionState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "prompt-boundary-state",
      label: "prompt boundary state",
      state: "prompt transmission state is not sent",
      evidence: bundle.captureEnvelopeRecord.promptTransmissionState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "model-boundary-state",
      label: "model boundary state",
      state: "model output not generated by provider/model",
      evidence: bundle.capturedOutputRecord.modelOutputState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "frontend-boundary-state",
      label: "frontend boundary state",
      state: "frontend request not created",
      evidence: bundle.captureInputRecord.frontendRequestState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[1],
    },
    {
      id: "api-route-boundary-state",
      label: "API boundary state",
      state: "API route not created",
      evidence: bundle.captureInputRecord.apiRouteState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[1],
    },
    {
      id: "queue-boundary-state",
      label: "queue boundary state",
      state: "queue dispatch blocked",
      evidence: bundle.reviewRecord.queueDispatchState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "worker-boundary-state",
      label: "worker boundary state",
      state: "worker dispatch blocked",
      evidence: bundle.reviewRecord.workerDispatchState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "job-boundary-state",
      label: "job boundary state",
      state: "job execution blocked",
      evidence: bundle.reviewRecord.jobExecutionState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "result-persistence-boundary-state",
      label: "result persistence boundary state",
      state: "result persistence not implemented",
      evidence: bundle.captureBlockedPersistenceSummaryRecord.resultPersistenceState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "audit-persistence-boundary-state",
      label: "audit persistence boundary state",
      state: "audit persistence not implemented",
      evidence: bundle.captureBlockedPersistenceSummaryRecord.auditPersistenceState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "approval-persistence-boundary-state",
      label: "approval persistence boundary state",
      state: "approval persistence not implemented",
      evidence: bundle.captureBlockedPersistenceSummaryRecord.approvalPersistenceState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "database-boundary-state",
      label: "database boundary state",
      state: "database write target none",
      evidence: bundle.captureBlockedPersistenceSummaryRecord.databaseWriteState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "file-boundary-state",
      label: "file boundary state",
      state: "file write target none",
      evidence: bundle.captureBlockedPersistenceSummaryRecord.fileWriteState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
    },
    {
      id: "single-run-lock-state",
      label: "single-run lock state",
      state: "preview-only lock posture",
      evidence: "single-run lock preview remains explicit",
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[3],
    },
    {
      id: "idempotency-replay-state",
      label: "idempotency/replay state",
      state: "preview-only replay posture",
      evidence: "idempotency/replay preview remains explicit",
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[3],
    },
    {
      id: "timeout-cancel-state",
      label: "timeout/cancel state",
      state: "preview-only timeout posture",
      evidence: "timeout/cancel preview remains explicit",
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[3],
    },
    {
      id: "privacy-redaction-state",
      label: "privacy/redaction state",
      state: "preview-only redaction posture",
      evidence: "privacy/redaction preview remains explicit",
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[3],
    },
    {
      id: "kill-switch-state",
      label: "kill-switch state",
      state: "kill switch fixture retained",
      evidence: bundle.reviewRecord.killSwitchState,
      nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[3],
    },
  ] as const;
}

function buildMvpRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord {
  const id = bundle.reviewRecord.reviewId;

  return {
    key: buildStableMinimalProviderAdapterDryRunAuditApprovalJoinMvpKey(id),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-mvp-v1",
    label:
      "Backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP",
    joinState: "joined-provider-dry-run-fixture-in-memory-only",
    auditJoinState: "deterministic provider dry-run audit join in memory only",
    approvalJoinState:
      "deterministic provider dry-run approval join in memory only",
    auditJoinId: buildProviderAdapterAuditJoinId(id),
    approvalJoinId: buildProviderAdapterApprovalJoinId(id),
    joinDigest: buildProviderAdapterAuditApprovalJoinDigest(id),
    resultReference: buildProviderAdapterAuditApprovalJoinResultReference(id),
    auditReference: buildProviderAdapterAuditApprovalJoinAuditReference(id),
    approvalReference:
      buildProviderAdapterAuditApprovalJoinApprovalReference(id),
    evidenceReference:
      buildProviderAdapterAuditApprovalJoinEvidenceReference(id),
    credentialReferenceState: "opaque credential reference label only",
    credentialValueState: "credential value not present and not read",
    envVarState: "environment variables not read",
    providerKeyState: "provider key not read",
    providerSdkImportState: "provider SDK not imported",
    providerResponseState: "provider response not received from provider",
    modelOutputState: "model output not generated by provider/model",
    promptTransmissionState: "prompt transmission state is not sent",
    frontendRequestState: "frontend request not created",
    apiRouteState: "API route not created",
    resultPersistenceState: "result persistence not implemented",
    auditPersistenceState: "audit persistence not implemented",
    approvalPersistenceState: "approval persistence not implemented",
    timestampPosture: "static fixture label only, with no real timestamp",
    killSwitchState: "kill switch fixture retained",
    ...buildCommonRecordFields(bundle),
  };
}

function buildInputRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinInputRecord {
  return {
    key: buildInputKey(bundle.reviewRecord.reviewId),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-input-v1",
    requestState:
      "deterministic provider dry-run audit approval join request only",
    resultPayloadPosture: "captured fixture result only",
    auditPayloadPosture: "preview-only",
    approvalPayloadPosture: "preview-only",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    promptTransmissionState: "prompt transmission state is not sent",
    frontendRequestState: "frontend request not created",
    apiRouteState: "API route not created",
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement:
      "No frontend request. No API route. No provider call. No persistence.",
    ...buildCommonRecordFields(bundle),
  };
}

function buildAdmissionCheckRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckRecord {
  return {
    key: buildAdmissionCheckKey(bundle.reviewRecord.reviewId),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-admission-check-v1",
    admissionState:
      "accepted / backend-only / credential-reference-only / fixture-only / in-memory-only / persistence-blocked",
    backendOnlyCheck: "passed",
    serverOnlyCheck: "passed",
    sourceReviewCheck: "passed",
    captureDependencyCheck: "passed",
    credentialBoundaryCheck: "passed",
    providerBoundaryCheck: "passed",
    approvalBoundaryCheck: "passed",
    persistenceBoundaryCheck: "blocked",
    nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[1],
    ...buildCommonRecordFields(bundle),
  };
}

function buildAuditJoinOutputRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditJoinOutputRecord {
  const id = bundle.reviewRecord.reviewId;

  return {
    key: buildAuditJoinOutputKey(id),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-join-output-v1",
    joinState: "joined-provider-dry-run-fixture-in-memory-only",
    auditJoinState: "deterministic provider dry-run audit join in memory only",
    auditJoinId: buildProviderAdapterAuditJoinId(id),
    joinDigest: buildProviderAdapterAuditApprovalJoinDigest(id),
    sourceProviderDryRunAuditPreviewReference: bundle.captureAuditPreviewRecord.key,
    resultReference: buildProviderAdapterAuditApprovalJoinResultReference(id),
    auditReference: buildProviderAdapterAuditApprovalJoinAuditReference(id),
    evidenceReference:
      buildProviderAdapterAuditApprovalJoinEvidenceReference(id),
    providerResponseState: "provider response not received from provider",
    modelOutputState: "model output not generated by provider/model",
    resultPersistenceState: "result persistence not implemented",
    auditPersistenceState: "audit persistence not implemented",
    databaseWriteState: "database write target none",
    fileWriteState: "file write target none",
    timestampPosture: "static fixture label only, with no real timestamp",
    ...buildCommonRecordFields(bundle),
  };
}

function buildApprovalJoinOutputRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunApprovalJoinOutputRecord {
  const id = bundle.reviewRecord.reviewId;

  return {
    key: buildApprovalJoinOutputKey(id),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-join-output-v1",
    joinState: "joined-provider-dry-run-fixture-in-memory-only",
    approvalJoinState:
      "deterministic provider dry-run approval join in memory only",
    approvalJoinId: buildProviderAdapterApprovalJoinId(id),
    joinDigest: buildProviderAdapterAuditApprovalJoinDigest(id),
    sourceProviderDryRunApprovalPreviewReference:
      bundle.captureApprovalPreviewRecord.key,
    resultReference: buildProviderAdapterAuditApprovalJoinResultReference(id),
    approvalReference:
      buildProviderAdapterAuditApprovalJoinApprovalReference(id),
    evidenceReference:
      buildProviderAdapterAuditApprovalJoinEvidenceReference(id),
    providerResponseState: "provider response not received from provider",
    modelOutputState: "model output not generated by provider/model",
    approvalFixtureState: "approval fixture preview-only",
    manualConfirmationFixtureState: "manual confirmation fixture preview-only",
    realApprovalRequestState: "real approval request absent",
    approvalRecordingState: "approval recording not recorded",
    approvalTokenState: "approval token not issued",
    approvalLeaseState: "approval lease not created",
    resultPersistenceState: "result persistence not implemented",
    approvalPersistenceState: "approval persistence not implemented",
    databaseWriteState: "database write target none",
    fileWriteState: "file write target none",
    timestampPosture: "static fixture label only, with no real timestamp",
    ...buildCommonRecordFields(bundle),
  };
}

function buildEnvelopeRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinEnvelopeRecord {
  const id = bundle.reviewRecord.reviewId;

  return {
    key: buildEnvelopeKey(id),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-envelope-v1",
    requestReference: buildRequestKey(id),
    responseReference: buildResponseKey(id),
    errorReference: buildErrorKey(id),
    inputReference: buildInputKey(id),
    resultCaptureEnvelopeReference: bundle.captureEnvelopeRecord.key,
    auditJoinOutputReference: buildAuditJoinOutputKey(id),
    approvalJoinOutputReference: buildApprovalJoinOutputKey(id),
    auditPreviewReference: buildAuditPreviewKey(id),
    approvalPreviewReference: buildApprovalPreviewKey(id),
    evidencePreviewReference: buildEvidencePreviewKey(id),
    joinState: "joined-provider-dry-run-fixture-in-memory-only",
    auditJoinState: "deterministic provider dry-run audit join in memory only",
    approvalJoinState:
      "deterministic provider dry-run approval join in memory only",
    providerResponseState: "provider response not received from provider",
    modelOutputState: "model output not generated by provider/model",
    resultPersistenceState: "result persistence not implemented",
    auditPersistenceState: "audit persistence not implemented",
    approvalPersistenceState: "approval persistence not implemented",
    databaseWriteState: "database write target none",
    fileWriteState: "file write target none",
    explicitJoinOnlyNoProviderOutputNoPersistenceStatement:
      "Provider adapter dry-run audit and approval join only. No provider output. No persistence.",
    ...buildCommonRecordFields(bundle),
  };
}

function buildAuditPreviewRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditPreviewRecord {
  const id = bundle.reviewRecord.reviewId;

  return {
    key: buildAuditPreviewKey(id),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview-v1",
    auditReference: buildProviderAdapterAuditApprovalJoinAuditReference(id),
    auditState: "preview-only / not persisted",
    auditSummaryLines: [
      "provider adapter dry-run audit and approval join MVP is backend-only",
      "deterministic provider adapter dry-run audit and approval join only",
      "provider adapter dry-run audit and approval join is produced in memory only",
      "no audit persistence",
    ] as const,
    ...buildCommonRecordFields(bundle),
  };
}

function buildApprovalPreviewRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunApprovalPreviewRecord {
  const id = bundle.reviewRecord.reviewId;

  return {
    key: buildApprovalPreviewKey(id),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview-v1",
    approvalReference:
      buildProviderAdapterAuditApprovalJoinApprovalReference(id),
    approvalState: "preview-only / not persisted",
    approvalFixtureState: "approval fixture preview-only",
    manualConfirmationFixtureState: "manual confirmation fixture preview-only",
    realApprovalRequestState: "real approval request absent",
    approvalRecordingState: "approval recording not recorded",
    approvalTokenState: "approval token not issued",
    approvalLeaseState: "approval lease not created",
    approvalSummaryLines: [
      "approval fixture is preview-only",
      "manual confirmation fixture is preview-only",
      "no real approval request",
      "no real approval recording",
      "approval token is not issued",
      "approval lease is not created",
    ] as const,
    ...buildCommonRecordFields(bundle),
  };
}

function buildEvidencePreviewRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditApprovalEvidencePreviewRecord {
  const id = bundle.reviewRecord.reviewId;

  return {
    key: buildEvidencePreviewKey(id),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-evidence-preview-v1",
    evidenceReference:
      buildProviderAdapterAuditApprovalJoinEvidenceReference(id),
    evidenceState: "preview-only / not persisted",
    evidenceSummaryLines: [
      `review source: ${bundle.reviewRecord.key}`,
      `result source: ${bundle.capturedOutputRecord.key}`,
      `audit source: ${bundle.captureAuditPreviewRecord.key}`,
      `approval source: ${bundle.captureApprovalPreviewRecord.key}`,
      `manual approval fixture: ${bundle.manualApprovalFixtureRecord.key}`,
      `manual confirmation fixture: ${bundle.manualConfirmationFixtureRecord.key}`,
    ] as const,
    ...buildCommonRecordFields(bundle),
  };
}

function buildSafetyGateSummaryRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryRecord {
  return {
    key: buildSafetyGateSummaryKey(bundle.reviewRecord.reviewId),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-safety-gate-summary-v1",
    serverOnlyHelperStatement:
      "server-only provider adapter dry-run audit and approval join helper exists",
    backendOnlyStatement:
      "provider adapter dry-run audit and approval join MVP is backend-only",
    deterministicJoinStatement:
      "deterministic provider adapter dry-run audit and approval join only",
    inMemoryOnlyJoinStatement:
      "provider adapter dry-run audit and approval join is produced in memory only",
    summaryLines: SUMMARY_LINES,
    ...buildCommonRecordFields(bundle),
  };
}

function buildBlockedLivePersistenceSummaryRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryRecord {
  return {
    key: buildBlockedLivePersistenceSummaryKey(bundle.reviewRecord.reviewId),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-blocked-live-persistence-summary-v1",
    blockedLiveActions: BLOCKED_LIVE_ACTIONS,
    retryPosture: "retry disabled",
    fallbackPosture: "fallback disabled",
    summaryLines: [
      "live provider execution is blocked",
      "no real approval request",
      "no real approval recording",
      "no queue dispatch",
      "no worker dispatch",
      "no job execution",
      "no retry execution",
      "no fallback execution",
      "no result persistence",
      "no audit persistence",
      "no approval persistence",
      "no database writes",
      "no file writes",
    ] as const,
    ...buildCommonRecordFields(bundle),
  };
}

function buildRequestRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinRequestRecord {
  return {
    key: buildRequestKey(bundle.reviewRecord.reviewId),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-request-v1",
    requestState:
      "deterministic provider dry-run audit approval join request only",
    providerAdapterDryRunAuditApprovalJoinMvpId: bundle.reviewRecord.reviewId,
    frontendRequestState: "frontend request not created",
    apiRouteState: "API route not created",
    resultPayloadPosture: "captured fixture result only",
    auditPayloadPosture: "preview-only",
    approvalPayloadPosture: "preview-only",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoProviderCallNoPersistenceStatement:
      "No frontend request. No API route. No provider call. No persistence.",
    ...buildCommonRecordFields(bundle),
  };
}

function buildResponseRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinResponseRecord {
  return {
    key: buildResponseKey(bundle.reviewRecord.reviewId),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-response-v1",
    responseState:
      "returned by server-only provider audit approval join helper only",
    providerAdapterDryRunAuditApprovalJoinMvpId: bundle.reviewRecord.reviewId,
    joinState: "joined-provider-dry-run-fixture-in-memory-only",
    auditJoinState: "deterministic provider dry-run audit join in memory only",
    approvalJoinState:
      "deterministic provider dry-run approval join in memory only",
    providerResponseState: "provider response not received from provider",
    modelOutputState: "model output not generated by provider/model",
    resultPersistenceState: "result persistence not implemented",
    auditPersistenceState: "audit persistence not implemented",
    approvalPersistenceState: "approval persistence not implemented",
    databaseWriteState: "database write target none",
    fileWriteState: "file write target none",
    explicitJoinOnlyNoProviderOutputNoPersistenceStatement:
      "Provider adapter dry-run audit and approval join only. No provider output. No persistence.",
    ...buildCommonRecordFields(bundle),
  };
}

function buildErrorRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinErrorRecord {
  return {
    key: buildErrorKey(bundle.reviewRecord.reviewId),
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-error-v1",
    errorState: "deterministic preview-error record only",
    providerAdapterDryRunAuditApprovalJoinMvpId: bundle.reviewRecord.reviewId,
    failedGateExamples: [
      "no-provider-execution",
      "no-result-persistence",
      "no-approval-token-issuance",
      "kill-switch-fixture",
    ] as const,
    missingSourceReviewExample:
      "Provider dry-run result capture review source is required.",
    missingCapturedResultExample:
      "Provider dry-run captured fixture result source is required.",
    missingOutputReviewExample:
      "Provider dry-run result capture output review source is required.",
    missingAuditPreviewExample:
      "Provider dry-run audit preview source is required.",
    missingApprovalPreviewExample:
      "Provider dry-run approval preview source is required.",
    promptTransmissionAttemptedExample:
      "Prompt transmission must remain blocked.",
    providerSdkImportAttemptedExample:
      "Provider SDK import must remain blocked.",
    providerExecutionAttemptedExample:
      "Provider execution must remain blocked.",
    modelCallAttemptedExample: "Model calls must remain blocked.",
    approvalAttemptedExample:
      "Real approval request, recording, token, and lease must remain absent.",
    persistenceAttemptedExample:
      "Result, audit, approval, database, and file persistence must remain blocked.",
    explicitNoLiveErrorNoRetryNoFallbackStatement:
      "No live error. No retry. No fallback.",
    ...buildCommonRecordFields(bundle),
  };
}

function buildGateRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle,
  seed: ProviderAuditApprovalJoinGateSeed
): ProviderAdapterDryRunAuditApprovalJoinGateRecord {
  return {
    id: seed.id,
    key: `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-gate:${bundle.reviewRecord.reviewId}:${seed.id}`,
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-gate-v1",
    label: seed.label,
    owner: seed.owner,
    requiredState: seed.requiredState,
    currentState: seed.currentState,
    evidence: seed.evidence,
    blockedLiveAction: seed.blockedLiveAction,
    ...buildCommonRecordFields(bundle),
  };
}

function buildReadinessRecord(
  bundle: ProviderAuditApprovalJoinSourceBundle,
  seed: ProviderAuditApprovalJoinReadinessSeed
): ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord {
  return {
    id: seed.id,
    key: `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-readiness:${bundle.reviewRecord.reviewId}:${seed.id}`,
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-readiness-matrix-v1",
    label: seed.label,
    state: seed.state,
    evidence: seed.evidence,
    nextSafeAction: seed.nextSafeAction,
    ...buildCommonRecordFields(bundle),
  };
}

function validateBundle(bundle: ProviderAuditApprovalJoinSourceBundle): void {
  if (
    !bundle.captureOutputReviewRecord ||
    bundle.captureOutputReviewRecord.providerDryRunResultCaptureReviewId !==
      bundle.reviewRecord.reviewId
  ) {
    throw new Error(
      `Missing provider dry-run result capture output review for ${bundle.reviewRecord.reviewId}`
    );
  }

  if (
    bundle.admissionReviewRecord.reviewId !==
      bundle.providerSelectionReviewRecord.reviewId
  ) {
    throw new Error(
      `Provider/request identity mismatch for ${bundle.reviewRecord.reviewId}`
    );
  }

  if (
    bundle.providerSelectionReviewRecord
      .sourceTextAdapterAuditApprovalJoinReviewReference !==
      bundle.textAdapterAuditApprovalJoinReviewRecord.key
  ) {
    throw new Error(
      `Provider selection source join review mismatch for ${bundle.reviewRecord.reviewId}`
    );
  }

  if (
    bundle.textAdapterAuditApprovalJoinReviewRecord
      .sourceManualApprovalDecisionReviewReference !==
      bundle.manualApprovalDecisionReviewRecord.key
  ) {
    throw new Error(
      `Manual approval decision source mismatch for ${bundle.reviewRecord.reviewId}`
    );
  }

  if (
    !isKnownSlotIdentity(bundle.reviewRecord.providerSlotLabel) ||
    !isKnownSlotIdentity(bundle.reviewRecord.backupProviderSlotLabel) ||
    !isKnownSlotIdentity(bundle.reviewRecord.localPrivateAlternativeLabel) ||
    !isKnownSlotIdentity(bundle.admissionReviewRecord.providerSlotLabel) ||
    !isKnownSlotIdentity(bundle.admissionReviewRecord.backupProviderSlotLabel) ||
    !isKnownSlotIdentity(bundle.admissionReviewRecord.localPrivateAlternativeLabel) ||
    !isKnownSlotIdentity(bundle.providerSelectionReviewRecord.providerSlotLabel) ||
    !isKnownSlotIdentity(bundle.providerSelectionReviewRecord.backupProviderSlotLabel) ||
    !isKnownSlotIdentity(
      bundle.providerSelectionReviewRecord.localPrivateAlternativeLabel
    )
  ) {
    throw new Error(
      `Unknown provider slot label detected for ${bundle.reviewRecord.reviewId}`
    );
  }
}

const SOURCE_BUNDLES = SOURCE_REVIEWS.map((review) => {
  const bundle = resolveSourceBundle(review);
  validateBundle(bundle);
  return bundle;
});

const MVP_RECORDS = SOURCE_BUNDLES.map(buildMvpRecord);
const INPUT_RECORDS = SOURCE_BUNDLES.map(buildInputRecord);
const ADMISSION_CHECK_RECORDS = SOURCE_BUNDLES.map(buildAdmissionCheckRecord);
const AUDIT_JOIN_OUTPUT_RECORDS = SOURCE_BUNDLES.map(buildAuditJoinOutputRecord);
const APPROVAL_JOIN_OUTPUT_RECORDS =
  SOURCE_BUNDLES.map(buildApprovalJoinOutputRecord);
const ENVELOPE_RECORDS = SOURCE_BUNDLES.map(buildEnvelopeRecord);
const AUDIT_PREVIEW_RECORDS = SOURCE_BUNDLES.map(buildAuditPreviewRecord);
const APPROVAL_PREVIEW_RECORDS = SOURCE_BUNDLES.map(buildApprovalPreviewRecord);
const EVIDENCE_PREVIEW_RECORDS = SOURCE_BUNDLES.map(buildEvidencePreviewRecord);
const SAFETY_GATE_SUMMARY_RECORDS =
  SOURCE_BUNDLES.map(buildSafetyGateSummaryRecord);
const BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORDS =
  SOURCE_BUNDLES.map(buildBlockedLivePersistenceSummaryRecord);
const REQUEST_RECORDS = SOURCE_BUNDLES.map(buildRequestRecord);
const RESPONSE_RECORDS = SOURCE_BUNDLES.map(buildResponseRecord);
const ERROR_RECORDS = SOURCE_BUNDLES.map(buildErrorRecord);
const GATE_RECORDS = SOURCE_BUNDLES.flatMap((bundle) =>
  GATE_SEEDS.map((seed) => buildGateRecord(bundle, seed))
);
const READINESS_RECORDS = SOURCE_BUNDLES.flatMap((bundle) =>
  buildReadinessSeeds(bundle).map((seed) => buildReadinessRecord(bundle, seed))
);

export function listMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpRecords():
  readonly MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord[] {
  return cloneList(MVP_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinInputs():
  readonly ProviderAdapterDryRunAuditApprovalJoinInputRecord[] {
  return cloneList(INPUT_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinAdmissionChecks():
  readonly ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckRecord[] {
  return cloneList(ADMISSION_CHECK_RECORDS);
}

export function listProviderAdapterDryRunAuditJoinOutputs():
  readonly ProviderAdapterDryRunAuditJoinOutputRecord[] {
  return cloneList(AUDIT_JOIN_OUTPUT_RECORDS);
}

export function listProviderAdapterDryRunApprovalJoinOutputs():
  readonly ProviderAdapterDryRunApprovalJoinOutputRecord[] {
  return cloneList(APPROVAL_JOIN_OUTPUT_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinEnvelopes():
  readonly ProviderAdapterDryRunAuditApprovalJoinEnvelopeRecord[] {
  return cloneList(ENVELOPE_RECORDS);
}

export function listProviderAdapterDryRunAuditPreviews():
  readonly ProviderAdapterDryRunAuditPreviewRecord[] {
  return cloneList(AUDIT_PREVIEW_RECORDS);
}

export function listProviderAdapterDryRunApprovalPreviews():
  readonly ProviderAdapterDryRunApprovalPreviewRecord[] {
  return cloneList(APPROVAL_PREVIEW_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalEvidencePreviews():
  readonly ProviderAdapterDryRunAuditApprovalEvidencePreviewRecord[] {
  return cloneList(EVIDENCE_PREVIEW_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaries():
  readonly ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryRecord[] {
  return cloneList(SAFETY_GATE_SUMMARY_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaries():
  readonly ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryRecord[] {
  return cloneList(BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinRequests():
  readonly ProviderAdapterDryRunAuditApprovalJoinRequestRecord[] {
  return cloneList(REQUEST_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinResponses():
  readonly ProviderAdapterDryRunAuditApprovalJoinResponseRecord[] {
  return cloneList(RESPONSE_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinErrors():
  readonly ProviderAdapterDryRunAuditApprovalJoinErrorRecord[] {
  return cloneList(ERROR_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinGates():
  readonly ProviderAdapterDryRunAuditApprovalJoinGateRecord[] {
  return cloneList(GATE_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecords():
  readonly ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord[] {
  return cloneList(READINESS_RECORDS);
}

export function buildProviderAdapterDryRunAuditApprovalJoinSummary():
  ProviderAdapterDryRunAuditApprovalJoinSummary {
  return cloneRecord({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-summary-v1" as ProviderAdapterDryRunAuditApprovalJoinSummaryVersion,
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    currentReadiness: CURRENT_READINESS,
    recordCount: MVP_RECORDS.length,
    auditOutputCount: AUDIT_JOIN_OUTPUT_RECORDS.length,
    approvalOutputCount: APPROVAL_JOIN_OUTPUT_RECORDS.length,
    envelopeCount: ENVELOPE_RECORDS.length,
    evidencePreviewCount: EVIDENCE_PREVIEW_RECORDS.length,
    gateCount: GATE_RECORDS.length,
    readinessCount: READINESS_RECORDS.length,
    summaryLines: SUMMARY_LINES,
  });
}

export function buildProviderAdapterDryRunAuditApprovalJoinGateSummary():
  ProviderAdapterDryRunAuditApprovalJoinGateSummary {
  return cloneRecord({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-gate-summary-v1" as ProviderAdapterDryRunAuditApprovalJoinGateSummaryVersion,
    recordCount: GATE_RECORDS.length,
    uniqueGateCount: GATE_SEEDS.length,
    summaryLines: GATE_SUMMARY_LINES,
    nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[1],
  });
}

export function buildProviderAdapterDryRunAuditApprovalJoinReadinessSummary():
  ProviderAdapterDryRunAuditApprovalJoinReadinessSummary {
  return cloneRecord({
    version:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-readiness-summary-v1" as ProviderAdapterDryRunAuditApprovalJoinReadinessSummaryVersion,
    recordCount: READINESS_RECORDS.length,
    uniqueReadinessCount: buildReadinessSeeds(SOURCE_BUNDLES[0]).length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: READINESS_SUMMARY_LINES,
    nextSafeAction: NEXT_REVIEW_RECOVERY_CHECKLIST[2],
  });
}

export function buildNextProviderAdapterDryRunAuditApprovalJoinReviewRecoveryChecklist():
  NextProviderAdapterDryRunAuditApprovalJoinReviewRecoveryChecklist {
  return cloneRecord(NEXT_REVIEW_RECOVERY_CHECKLIST);
}
