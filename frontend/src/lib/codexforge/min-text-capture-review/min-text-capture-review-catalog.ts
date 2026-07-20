import {
  listAthenaModelRoutingPreviews,
} from "../athena-model-routing-provider-selection-preview";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews,
} from "../min-synth-e2e-review";
import {
  listTextAdapterFixtureResponses,
  listTextAdapterRedactedPromptEnvelopes,
} from "../min-text-adapter";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterReviews,
  listTextAdapterOutputReviewRecords,
} from "../min-text-adapter-review";
import {
  listMinimalManualGatedTextModelAdapterResultCaptureMvpRecords,
  listTextAdapterCapturedFixtureResultOutputs,
  listTextAdapterResultCaptureAdmissionChecks,
  listTextAdapterResultCaptureApprovalPreviews,
  listTextAdapterResultCaptureAuditPreviews,
  listTextAdapterResultCaptureBlockedLivePersistenceSummaries,
  listTextAdapterResultCaptureEnvelopes,
  listTextAdapterResultCaptureEvidencePreviews,
  listTextAdapterResultCaptureGates,
  listTextAdapterResultCaptureInputs,
  listTextAdapterResultCaptureSafetyGateSummaries,
  type MinimalTextAdapterResultCaptureMvpId,
  type TextAdapterResultCaptureGateId,
  type TextAdapterResultCaptureGateRecord,
} from "../min-text-capture";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
  type BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord,
  type MinimalTextAdapterResultCaptureReviewVersion,
  type MinimalTextAdapterAuditApprovalJoinMvpChecklist,
  type MinimalTextAdapterResultCaptureAcceptanceStatement,
  type MinimalTextAdapterResultCaptureAcceptanceState,
  type MinimalTextAdapterResultCaptureFallbackPosture,
  type MinimalTextAdapterResultCaptureMvpSourceReference,
  type MinimalTextAdapterResultCaptureNoLiveGatePassStatement,
  type MinimalTextAdapterResultCaptureNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement,
  type MinimalTextAdapterResultCaptureOutputOnlyStatement,
  type MinimalTextAdapterResultCapturePreviewOnlyStatement,
  type MinimalTextAdapterResultCaptureRecoveryPosture,
  type MinimalTextAdapterResultCaptureRetryPosture,
  type MinimalTextAdapterResultCaptureReviewCurrentReadiness,
  type MinimalTextAdapterResultCaptureReviewId,
  type MinimalTextAdapterResultCaptureReviewKey,
  type MinimalTextAdapterResultCaptureReviewMode,
  type MinimalTextAdapterResultCaptureReviewPosture,
  type MinimalTextAdapterResultCaptureReviewSeverity,
  type MinimalTextAdapterResultCaptureReviewSource,
  type TextAdapterCapturedFixtureResultOutputSourceReference,
  type TextAdapterResultCaptureAcceptancePostureRecord,
  type TextAdapterResultCaptureAcceptancePostureKey,
  type TextAdapterResultCaptureAdmissionCheckSourceReference,
  type TextAdapterResultCaptureApprovalPreviewSourceReference,
  type TextAdapterResultCaptureAuditPreviewSourceReference,
  type TextAdapterResultCaptureBlockedLivePersistenceSummarySourceReference,
  type TextAdapterResultCaptureDeterministicFixtureResponseSourceReference,
  type TextAdapterResultCaptureEnvelopeSourceReference,
  type TextAdapterResultCaptureEvidencePreviewSourceReference,
  type TextAdapterResultCaptureGateFailureReviewKey,
  type TextAdapterResultCaptureGateFailureReviewRecord,
  type TextAdapterResultCaptureGateFailureReviewVersion,
  type TextAdapterResultCaptureGateFailureSummary,
  type TextAdapterResultCaptureInputSourceReference,
  type TextAdapterResultCaptureOutputReviewKey,
  type TextAdapterResultCaptureOutputReviewRecord,
  type TextAdapterResultCaptureOutputReviewSummary,
  type TextAdapterResultCaptureOutputReviewVersion,
  type TextAdapterResultCaptureAcceptancePostureVersion,
  type TextAdapterResultCaptureRecoveryPlanKey,
  type TextAdapterResultCaptureRecoveryPlanPreviewRecord,
  type TextAdapterResultCaptureRecoveryPlanVersion,
  type TextAdapterResultCaptureRecoveryReadinessChecklistId,
  type TextAdapterResultCaptureRecoveryReadinessChecklistKey,
  type TextAdapterResultCaptureRecoveryReadinessChecklistLabel,
  type TextAdapterResultCaptureRedactedPromptEnvelopeSourceReference,
  type TextAdapterResultCaptureRecoveryReadinessChecklistRecord,
  type TextAdapterResultCaptureRecoveryReadinessChecklistVersion,
  type TextAdapterResultCaptureRecoverySummary,
  type TextAdapterResultCaptureReviewAuditSummaryKey,
  type TextAdapterResultCaptureReviewAuditSummaryRecord,
  type TextAdapterResultCaptureReviewAuditSummaryVersion,
  type TextAdapterResultCaptureReviewCapabilityFamilyGroup,
  type TextAdapterResultCaptureReviewDisplayStrings,
  type TextAdapterResultCaptureReviewSummary,
  type TextAdapterResultCaptureSafetyGateSummarySourceReference,
  type TextAdapterResultCaptureReviewWorkspaceGroup,
} from "./min-text-capture-review-types";

type ReviewSourceBundle = Readonly<{
  routingPreview: ReturnType<typeof listAthenaModelRoutingPreviews>[number];
  textAdapterReview: ReturnType<
    typeof listBackendOwnedMinimalManualGatedTextModelAdapterReviews
  >[number];
  textAdapterOutputReview: ReturnType<
    typeof listTextAdapterOutputReviewRecords
  >[number];
  syntheticEndToEndPacketReview: ReturnType<
    typeof listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews
  >[number];
  manualApprovalDecisionReview: ReturnType<
    typeof listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews
  >[number];
}>;

type GateFailureSeed = Readonly<{
  severity: MinimalTextAdapterResultCaptureReviewSeverity;
  requiredRecoveryAction: string;
}>;

type ReadinessChecklistSeed = Readonly<{
  checklistId: TextAdapterResultCaptureRecoveryReadinessChecklistId;
  label: TextAdapterResultCaptureRecoveryReadinessChecklistLabel;
  state: TextAdapterResultCaptureRecoveryReadinessChecklistRecord["state"];
  severity: MinimalTextAdapterResultCaptureReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: TextAdapterResultCaptureRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const ACTUAL_CAPTURE_ID: MinimalTextAdapterResultCaptureMvpId =
  "conversational-planning-request";

const REVIEW_SOURCE: MinimalTextAdapterResultCaptureReviewSource =
  "Athena / Jarvis Model Gateway";
const REVIEW_MODE: MinimalTextAdapterResultCaptureReviewMode = "preview-only";
const REVIEW_POSTURE: MinimalTextAdapterResultCaptureReviewPosture =
  "minimal text adapter result capture review / backend-only / fixture-only / in-memory-only / not persistent";
const CURRENT_READINESS: MinimalTextAdapterResultCaptureReviewCurrentReadiness =
  "minimal-text-adapter-result-capture-review-only / backend-only / fixture-only / in-memory-only / not persistent";
const PREVIEW_ONLY_STATEMENT: MinimalTextAdapterResultCapturePreviewOnlyStatement =
  "minimal text adapter result capture review is preview-only";
const OUTPUT_ONLY_STATEMENT: MinimalTextAdapterResultCaptureOutputOnlyStatement =
  "Fixture capture only. No real output. No provider call. No persistence.";
const NO_LIVE_GATE_PASS_STATEMENT: MinimalTextAdapterResultCaptureNoLiveGatePassStatement =
  "No live gate pass.";
const NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_PERSISTENCE_STATEMENT: MinimalTextAdapterResultCaptureNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No persistence.";
const RECOVERY_POSTURE: MinimalTextAdapterResultCaptureRecoveryPosture =
  "manual review only";
const RETRY_POSTURE: MinimalTextAdapterResultCaptureRetryPosture = "disabled";
const FALLBACK_POSTURE: MinimalTextAdapterResultCaptureFallbackPosture =
  "disabled";
const ACCEPTANCE_STATE: MinimalTextAdapterResultCaptureAcceptanceState =
  "not accepted for live persistence / text adapter result capture fixture MVP accepted only";
const ACCEPTANCE_STATEMENT: MinimalTextAdapterResultCaptureAcceptanceStatement =
  "Text adapter result capture fixture accepted only. Live persistence not accepted.";

const REVIEW_SUMMARY_LINES = [
  "backend-owned minimal manual-gated text model adapter result capture review and recovery preview only",
  "minimal text adapter result capture review is preview-only",
  "server-only text adapter result capture helper exists",
  "text adapter fixture response is captured in memory only",
  "text adapter result capture is not persistent",
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
  "backend-owned minimal manual-gated text model adapter audit and approval join MVP next",
] as const;

const OUTPUT_REVIEW_SUMMARY_LINES = [
  "Text adapter result capture output review",
  "capture state: captured-text-adapter-fixture-in-memory-only",
  "adapter id posture: deterministic preview id only",
  "fixture response id posture: deterministic preview id only",
  "capture id posture: deterministic preview id only",
  "digest posture: deterministic preview digest only",
  "prompt transmission state: not sent",
  "provider response state: not received",
  "model output state: not generated",
  "output classification: captured deterministic fixture only",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only capture module boundary",
  "text adapter fixture capture mode",
  "minimal text adapter review dependency",
  "deterministic fixture response present",
  "redacted prompt envelope present",
  "prompt not sent",
  "provider SDK not imported",
  "provider response not received",
  "model output not generated",
  "manual approval fixture",
  "manual confirmation fixture",
  "deterministic adapter id",
  "deterministic fixture response id",
  "deterministic capture id",
  "deterministic capture digest",
  "in-memory only result reference",
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
  "Text adapter result capture recovery plan",
  "Text adapter result capture recovery readiness",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "backend-owned minimal manual-gated text model adapter audit and approval join MVP next",
  NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_PERSISTENCE_STATEMENT,
] as const;

const MINIMAL_TEXT_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_CHECKLIST_LINES = [
  "Review text adapter result capture review, output review, gate failure review, recovery plan, recovery readiness, audit summary, and acceptance posture before adding join records.",
  "Keep the server-only text adapter result capture helper backend-only, fixture-only, deterministic, and in-memory only.",
  "Do not add prompt sending, provider SDK imports, provider execution, model calls, queue dispatch, worker dispatch, or job execution.",
  "Keep approval fixtures preview-only and leave approval tokens, approval leases, result persistence, audit persistence, approval persistence, database writes, and file writes unimplemented.",
  "5770-5801 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP",
] as const;

function cloneList<T>(items: readonly T[]): readonly T[] {
  return [...items];
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

function buildMapById<T extends Readonly<{ id: string }>>(
  items: readonly T[]
): ReadonlyMap<T["id"], T> {
  return new Map(items.map((item) => [item.id, item] as const));
}

function buildMapByStableId<T extends Readonly<{ stableId: string }>>(
  items: readonly T[]
): ReadonlyMap<T["stableId"], T> {
  return new Map(items.map((item) => [item.stableId, item] as const));
}

function resolveActualCaptureRecord<T extends Readonly<{ stableId: string }>>(
  items: readonly T[],
  kind: string
): T {
  return resolveRequiredRecord(
    buildMapByStableId(items).get(ACTUAL_CAPTURE_ID),
    `Missing ${kind} for ${ACTUAL_CAPTURE_ID}.`
  );
}

function isActualCaptureId(
  id: MinimalTextAdapterResultCaptureReviewId
): id is MinimalTextAdapterResultCaptureMvpId {
  return id === ACTUAL_CAPTURE_ID;
}

function uniqueTextValues(
  values: readonly string[]
): TextAdapterResultCaptureReviewDisplayStrings {
  return [...new Set(values)];
}

const ROUTING_PREVIEWS = listAthenaModelRoutingPreviews();
const ROUTING_PREVIEWS_BY_ID = buildMapById(ROUTING_PREVIEWS);
const TEXT_ADAPTER_REVIEWS =
  listBackendOwnedMinimalManualGatedTextModelAdapterReviews();
const TEXT_ADAPTER_REVIEWS_BY_ID = buildMapById(TEXT_ADAPTER_REVIEWS);
const TEXT_ADAPTER_OUTPUT_REVIEWS = listTextAdapterOutputReviewRecords();
const TEXT_ADAPTER_OUTPUT_REVIEWS_BY_ID = buildMapById(
  TEXT_ADAPTER_OUTPUT_REVIEWS
);
const SYNTHETIC_END_TO_END_PACKET_REVIEWS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews();
const SYNTHETIC_END_TO_END_PACKET_REVIEWS_BY_ID = buildMapById(
  SYNTHETIC_END_TO_END_PACKET_REVIEWS
);
const MANUAL_APPROVAL_DECISION_REVIEWS =
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews();
const MANUAL_APPROVAL_DECISION_REVIEWS_BY_ID = buildMapById(
  MANUAL_APPROVAL_DECISION_REVIEWS
);

const ACTUAL_CAPTURE_MVP_RECORD = resolveActualCaptureRecord(
  listMinimalManualGatedTextModelAdapterResultCaptureMvpRecords(),
  "text adapter result capture MVP record"
);
const ACTUAL_CAPTURE_INPUT_RECORD = resolveActualCaptureRecord(
  listTextAdapterResultCaptureInputs(),
  "text adapter result capture input record"
);
const ACTUAL_CAPTURE_ADMISSION_CHECK_RECORD = resolveActualCaptureRecord(
  listTextAdapterResultCaptureAdmissionChecks(),
  "text adapter result capture admission check record"
);
const ACTUAL_CAPTURE_OUTPUT_RECORD = resolveActualCaptureRecord(
  listTextAdapterCapturedFixtureResultOutputs(),
  "text adapter captured fixture result output record"
);
const ACTUAL_CAPTURE_ENVELOPE_RECORD = resolveActualCaptureRecord(
  listTextAdapterResultCaptureEnvelopes(),
  "text adapter result capture envelope record"
);
const ACTUAL_CAPTURE_EVIDENCE_PREVIEW_RECORD = resolveActualCaptureRecord(
  listTextAdapterResultCaptureEvidencePreviews(),
  "text adapter result capture evidence preview record"
);
const ACTUAL_CAPTURE_AUDIT_PREVIEW_RECORD = resolveActualCaptureRecord(
  listTextAdapterResultCaptureAuditPreviews(),
  "text adapter result capture audit preview record"
);
const ACTUAL_CAPTURE_APPROVAL_PREVIEW_RECORD = resolveActualCaptureRecord(
  listTextAdapterResultCaptureApprovalPreviews(),
  "text adapter result capture approval preview record"
);
const ACTUAL_CAPTURE_SAFETY_GATE_SUMMARY_RECORD = resolveActualCaptureRecord(
  listTextAdapterResultCaptureSafetyGateSummaries(),
  "text adapter result capture safety gate summary record"
);
const ACTUAL_CAPTURE_BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORD =
  resolveActualCaptureRecord(
    listTextAdapterResultCaptureBlockedLivePersistenceSummaries(),
    "text adapter result capture blocked live persistence summary record"
  );
const ACTUAL_DETERMINISTIC_FIXTURE_RESPONSE_RECORD = resolveActualCaptureRecord(
  listTextAdapterFixtureResponses(),
  "text adapter deterministic fixture response record"
);
const ACTUAL_REDACTED_PROMPT_ENVELOPE_RECORD = resolveActualCaptureRecord(
  listTextAdapterRedactedPromptEnvelopes(),
  "text adapter redacted prompt envelope record"
);
const ACTUAL_CAPTURE_GATE_RECORDS = listTextAdapterResultCaptureGates();
const ACTUAL_CAPTURE_GATE_RECORDS_BY_ID = new Map<
  TextAdapterResultCaptureGateId,
  TextAdapterResultCaptureGateRecord
>(ACTUAL_CAPTURE_GATE_RECORDS.map((record) => [record.id, record] as const));

function resolveReviewSourceBundle(
  id: MinimalTextAdapterResultCaptureReviewId
): ReviewSourceBundle {
  return {
    routingPreview: resolveRequiredRecord(
      ROUTING_PREVIEWS_BY_ID.get(id),
      `Missing routing preview for ${id}.`
    ),
    textAdapterReview: resolveRequiredRecord(
      TEXT_ADAPTER_REVIEWS_BY_ID.get(id),
      `Missing text adapter review for ${id}.`
    ),
    textAdapterOutputReview: resolveRequiredRecord(
      TEXT_ADAPTER_OUTPUT_REVIEWS_BY_ID.get(id),
      `Missing text adapter output review for ${id}.`
    ),
    syntheticEndToEndPacketReview: resolveRequiredRecord(
      SYNTHETIC_END_TO_END_PACKET_REVIEWS_BY_ID.get(id),
      `Missing synthetic end-to-end packet review for ${id}.`
    ),
    manualApprovalDecisionReview: resolveRequiredRecord(
      MANUAL_APPROVAL_DECISION_REVIEWS_BY_ID.get(id),
      `Missing manual approval decision review for ${id}.`
    ),
  };
}

export function buildStableMinimalTextAdapterResultCaptureReviewKey(
  id: MinimalTextAdapterResultCaptureReviewId
): MinimalTextAdapterResultCaptureReviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-review:${id}`;
}

export function buildStableTextAdapterResultCaptureOutputReviewKey(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureOutputReviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-output-review:${id}`;
}

export function buildStableTextAdapterResultCaptureGateFailureReviewKey(
  id: MinimalTextAdapterResultCaptureReviewId,
  gateId: TextAdapterResultCaptureGateId
): TextAdapterResultCaptureGateFailureReviewKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate-failure-review:${id}:${gateId}`;
}

export function buildStableTextAdapterResultCaptureRecoveryPlanKey(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureRecoveryPlanKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-recovery-plan:${id}`;
}

export function buildStableTextAdapterResultCaptureRecoveryReadinessChecklistKey(
  id: MinimalTextAdapterResultCaptureReviewId,
  checklistId: TextAdapterResultCaptureRecoveryReadinessChecklistId
): TextAdapterResultCaptureRecoveryReadinessChecklistKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-recovery-readiness:${id}:${checklistId}`;
}

export function buildStableTextAdapterResultCaptureReviewAuditSummaryKey(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureReviewAuditSummaryKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-review-audit-summary:${id}`;
}

export function buildStableTextAdapterResultCaptureAcceptancePostureKey(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureAcceptancePostureKey {
  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-acceptance-posture:${id}`;
}

function buildMinimalTextAdapterResultCaptureMvpSourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): MinimalTextAdapterResultCaptureMvpSourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_CAPTURE_MVP_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-mvp-review-source:${id}`;
}

function buildTextAdapterResultCaptureInputSourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureInputSourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_CAPTURE_INPUT_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-input-review-source:${id}`;
}

function buildTextAdapterResultCaptureAdmissionCheckSourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureAdmissionCheckSourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_CAPTURE_ADMISSION_CHECK_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-admission-check-review-source:${id}`;
}

function buildTextAdapterCapturedFixtureResultOutputSourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterCapturedFixtureResultOutputSourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_CAPTURE_OUTPUT_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-captured-fixture-result-output-review-source:${id}`;
}

function buildTextAdapterResultCaptureEnvelopeSourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureEnvelopeSourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_CAPTURE_ENVELOPE_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-envelope-review-source:${id}`;
}

function buildTextAdapterResultCaptureEvidencePreviewSourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureEvidencePreviewSourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_CAPTURE_EVIDENCE_PREVIEW_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-evidence-preview-review-source:${id}`;
}

function buildTextAdapterResultCaptureAuditPreviewSourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureAuditPreviewSourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_CAPTURE_AUDIT_PREVIEW_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-audit-preview-review-source:${id}`;
}

function buildTextAdapterResultCaptureApprovalPreviewSourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureApprovalPreviewSourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_CAPTURE_APPROVAL_PREVIEW_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-approval-preview-review-source:${id}`;
}

function buildTextAdapterResultCaptureSafetyGateSummarySourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureSafetyGateSummarySourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_CAPTURE_SAFETY_GATE_SUMMARY_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-safety-gate-summary-review-source:${id}`;
}

function buildTextAdapterResultCaptureBlockedLivePersistenceSummarySourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureBlockedLivePersistenceSummarySourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_CAPTURE_BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-result-capture-blocked-live-persistence-summary-review-source:${id}`;
}

function buildTextAdapterDeterministicFixtureResponseSourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureDeterministicFixtureResponseSourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_DETERMINISTIC_FIXTURE_RESPONSE_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-deterministic-fixture-response-review-source:${id}`;
}

function buildTextAdapterRedactedPromptEnvelopeSourceReference(
  id: MinimalTextAdapterResultCaptureReviewId
): TextAdapterResultCaptureRedactedPromptEnvelopeSourceReference {
  if (isActualCaptureId(id)) {
    return ACTUAL_REDACTED_PROMPT_ENVELOPE_RECORD.key;
  }

  return `backend-owned-minimal-manual-gated-text-model-adapter-redacted-prompt-envelope-review-source:${id}`;
}

const GATE_FAILURE_SEEDS = new Map<TextAdapterResultCaptureGateId, GateFailureSeed>([
  ["backend-only-boundary", { severity: "critical", requiredRecoveryAction: "Keep the result capture review layer backend-owned and do not introduce a frontend-callable path." }],
  ["server-only-capture-module-boundary", { severity: "critical", requiredRecoveryAction: "Retain the server-only capture helper boundary and do not export it to the client or a route." }],
  ["text-adapter-fixture-capture-mode", { severity: "critical", requiredRecoveryAction: "Keep capture fixture-only and deterministic until a later backend batch explicitly expands the contract." }],
  ["minimal-text-adapter-review-dependency", { severity: "high", requiredRecoveryAction: "Preserve the minimal text adapter review dependency and keep it preview-only." }],
  ["deterministic-fixture-response-present", { severity: "high", requiredRecoveryAction: "Keep the deterministic fixture response visible and in-memory only." }],
  ["redacted-prompt-envelope-present", { severity: "high", requiredRecoveryAction: "Keep the prompt envelope redacted and preview-only." }],
  ["prompt-not-sent", { severity: "critical", requiredRecoveryAction: "Keep prompt transmission absent." }],
  ["provider-sdk-not-imported", { severity: "critical", requiredRecoveryAction: "Do not import provider SDKs." }],
  ["provider-response-not-received", { severity: "critical", requiredRecoveryAction: "Keep provider response ingestion out of scope." }],
  ["model-output-not-generated", { severity: "critical", requiredRecoveryAction: "Keep model output generation blocked." }],
  ["manual-approval-fixture", { severity: "high", requiredRecoveryAction: "Keep manual approval fixture preview-only and unrecorded." }],
  ["manual-confirmation-fixture", { severity: "high", requiredRecoveryAction: "Keep manual confirmation fixture preview-only and unrecorded." }],
  ["deterministic-adapter-id", { severity: "high", requiredRecoveryAction: "Keep adapter identifiers deterministic and preview-only." }],
  ["deterministic-fixture-response-id", { severity: "high", requiredRecoveryAction: "Keep fixture response identifiers deterministic and preview-only." }],
  ["deterministic-capture-id", { severity: "high", requiredRecoveryAction: "Keep capture identifiers deterministic and preview-only." }],
  ["deterministic-capture-digest", { severity: "high", requiredRecoveryAction: "Keep the capture digest deterministic and preview-only." }],
  ["in-memory-only-result-reference", { severity: "high", requiredRecoveryAction: "Keep result references preview-only and non-persistent." }],
  ["no-real-approval-recording", { severity: "critical", requiredRecoveryAction: "Do not record approval state or convert preview approval into a live decision." }],
  ["no-approval-token-issuance", { severity: "critical", requiredRecoveryAction: "Keep approval token issuance absent." }],
  ["no-approval-lease-issuance", { severity: "critical", requiredRecoveryAction: "Keep approval lease issuance absent." }],
  ["no-frontend-request", { severity: "critical", requiredRecoveryAction: "Keep the chat input inert, local only, and detached from execution." }],
  ["no-api-route", { severity: "critical", requiredRecoveryAction: "Do not expose the capture helper through a route." }],
  ["no-fetch-network", { severity: "critical", requiredRecoveryAction: "Keep the frontend network boundary closed." }],
  ["no-provider-sdk-import", { severity: "critical", requiredRecoveryAction: "Do not add provider SDK imports." }],
  ["no-provider-execution", { severity: "critical", requiredRecoveryAction: "Keep provider execution blocked." }],
  ["no-model-call", { severity: "critical", requiredRecoveryAction: "Keep model invocation blocked." }],
  ["no-prompt-sending", { severity: "critical", requiredRecoveryAction: "Keep prompt sending absent." }],
  ["no-queue-dispatch", { severity: "critical", requiredRecoveryAction: "Keep queue dispatch blocked." }],
  ["no-worker-dispatch", { severity: "critical", requiredRecoveryAction: "Keep worker dispatch blocked." }],
  ["no-job-execution", { severity: "critical", requiredRecoveryAction: "Keep job execution blocked." }],
  ["no-result-persistence", { severity: "critical", requiredRecoveryAction: "Keep result persistence unimplemented." }],
  ["no-audit-persistence", { severity: "critical", requiredRecoveryAction: "Keep audit persistence unimplemented." }],
  ["no-approval-persistence", { severity: "critical", requiredRecoveryAction: "Keep approval persistence unimplemented." }],
  ["no-database-write", { severity: "critical", requiredRecoveryAction: "Keep database writes absent." }],
  ["no-file-write", { severity: "critical", requiredRecoveryAction: "Keep file writes absent." }],
  ["single-run-lock-preview", { severity: "medium", requiredRecoveryAction: "Keep single-run lock posture preview-only and inert." }],
  ["idempotency-replay-preview", { severity: "medium", requiredRecoveryAction: "Keep idempotency and replay posture preview-only and inert." }],
  ["timeout-cancel-preview", { severity: "medium", requiredRecoveryAction: "Keep timeout and cancel posture preview-only and inert." }],
  ["privacy-redaction-preview", { severity: "high", requiredRecoveryAction: "Keep privacy and redaction posture explicit and preview-only." }],
  ["kill-switch-fixture", { severity: "high", requiredRecoveryAction: "Keep kill switch posture visible, inactive, and fixture-only." }],
]);

const RECOVERY_READINESS_CHECKLIST_SEEDS = [
  {
    checklistId: "server-only-text-adapter-result-capture-helper-reviewed",
    label: "server-only text adapter result capture helper reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "server-only text adapter result capture helper exists",
    recoveryAction: "Keep the helper deterministic, server-only, and detached from client execution.",
    owner: "operator",
    nextSafeAction: "Review the helper boundary without adding a frontend-callable path.",
  },
  {
    checklistId: "text-adapter-result-capture-input-reviewed",
    label: "text adapter result capture input reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "text adapter result capture input remains deterministic text adapter capture request only",
    recoveryAction: "Keep result capture input typed, deterministic, and detached from transport.",
    owner: "operator",
    nextSafeAction: "Review input posture without creating a request path.",
  },
  {
    checklistId: "result-capture-admission-check-reviewed",
    label: "result capture admission check reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "admission state remains accepted / fixture-only / in-memory-only / persistence-blocked",
    recoveryAction: "Keep admission checks deterministic and typed.",
    owner: "operator",
    nextSafeAction: "Review admission posture without enabling execution.",
  },
  {
    checklistId: "captured-fixture-result-output-reviewed",
    label: "captured fixture result output reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "captured fixture result output remains deterministic fixture result captured in memory only",
    recoveryAction: "Keep the captured fixture result deterministic and in memory only.",
    owner: "operator",
    nextSafeAction: "Review the captured result without treating it as live provider output.",
  },
  {
    checklistId: "result-capture-envelope-reviewed",
    label: "result capture envelope reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "result capture envelope remains preview-only / not persisted",
    recoveryAction: "Keep envelope references preview-only and non-persistent.",
    owner: "operator",
    nextSafeAction: "Review envelope posture without adding persisted references.",
  },
  {
    checklistId: "evidence-preview-reviewed",
    label: "evidence preview reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired: "evidence preview remains preview-only / not persisted",
    recoveryAction: "Keep evidence summaries preview-only and deterministic.",
    owner: "operator",
    nextSafeAction: "Review evidence posture without creating stored evidence packets.",
  },
  {
    checklistId: "audit-preview-reviewed",
    label: "audit preview reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired: "audit preview remains preview-only",
    recoveryAction: "Keep audit preview summaries visible without persistence.",
    owner: "operator",
    nextSafeAction: "Review audit posture without adding audit persistence.",
  },
  {
    checklistId: "approval-preview-reviewed",
    label: "approval preview reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired: "approval preview remains preview-only",
    recoveryAction: "Keep approval preview summaries visible without recording approval.",
    owner: "operator",
    nextSafeAction: "Review approval posture without requesting or recording approval.",
  },
  {
    checklistId: "minimal-text-adapter-review-dependency-reviewed",
    label: "minimal text adapter review dependency reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "Backend-owned minimal text adapter review remains available",
    recoveryAction: "Preserve the text adapter review dependency and keep it inert.",
    owner: "operator",
    nextSafeAction: "Review dependency posture without mutating the prior review layer.",
  },
  {
    checklistId: "text-adapter-deterministic-fixture-response-reviewed",
    label: "text adapter deterministic fixture response reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "text adapter deterministic fixture response remains preview-only and in memory only",
    recoveryAction: "Keep deterministic fixture response references preview-only and typed.",
    owner: "operator",
    nextSafeAction: "Review fixture response posture without live provider output.",
  },
  {
    checklistId: "text-adapter-output-review-reviewed",
    label: "text adapter output review reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "Text adapter output review remains preview-only",
    recoveryAction: "Keep output review posture deterministic and inert.",
    owner: "operator",
    nextSafeAction: "Review output review posture without execution.",
  },
  {
    checklistId: "redacted-prompt-envelope-reviewed",
    label: "redacted prompt envelope reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "redacted prompt envelope is preview-only",
    recoveryAction: "Keep prompt content redacted and preview-only.",
    owner: "safety review",
    nextSafeAction: "Review redaction posture without exposing prompt content.",
  },
  {
    checklistId: "manual-approval-fixture-reviewed",
    label: "manual approval fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "approval fixture is preview-only",
    recoveryAction: "Keep approval fixtures preview-only and unrecorded.",
    owner: "operator",
    nextSafeAction: "Review approval fixture posture without turning it into a real request.",
  },
  {
    checklistId: "manual-confirmation-fixture-reviewed",
    label: "manual confirmation fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "manual confirmation fixture is preview-only",
    recoveryAction: "Keep manual confirmation fixtures preview-only and unrecorded.",
    owner: "operator",
    nextSafeAction: "Review manual confirmation posture without capturing live confirmation.",
  },
  {
    checklistId: "kill-switch-fixture-reviewed",
    label: "kill switch fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "kill switch fixture remains visible and inactive",
    recoveryAction: "Keep kill switch posture visible, inactive, and fixture-only.",
    owner: "safety review",
    nextSafeAction: "Review kill switch posture without enabling runtime control.",
  },
  {
    checklistId: "provider-boundary-reviewed",
    label: "provider boundary reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired: "no provider execution",
    recoveryAction: "Keep provider boundaries closed and backend-only.",
    owner: "backend future",
    nextSafeAction: "Do not connect provider execution in this batch.",
  },
  {
    checklistId: "prompt-boundary-reviewed",
    label: "prompt boundary reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired: "no prompt sending",
    recoveryAction: "Keep prompt transmission absent.",
    owner: "backend future",
    nextSafeAction: "Do not add prompt sending in this batch.",
  },
  {
    checklistId: "model-boundary-reviewed",
    label: "model boundary reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired: "no LLM/model calls",
    recoveryAction: "Keep model invocation blocked.",
    owner: "backend future",
    nextSafeAction: "Do not add model calls in this batch.",
  },
  {
    checklistId: "frontend-request-boundary-reviewed",
    label: "frontend request boundary reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired: "no frontend request is created",
    recoveryAction: "Keep frontend request creation absent.",
    owner: "operator",
    nextSafeAction: "Keep the chat input inert and local only.",
  },
  {
    checklistId: "api-route-boundary-reviewed",
    label: "API route boundary reviewed",
    state: "reviewed",
    severity: "critical",
    evidenceRequired: "no API route is created",
    recoveryAction: "Keep API route creation absent.",
    owner: "backend future",
    nextSafeAction: "Do not expose a route in this batch.",
  },
  {
    checklistId: "queue-dispatch-still-blocked",
    label: "queue dispatch still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no queue dispatch",
    recoveryAction: "Keep queue dispatch blocked.",
    owner: "backend future",
    nextSafeAction: "Leave queue orchestration for a future backend batch.",
  },
  {
    checklistId: "worker-dispatch-still-blocked",
    label: "worker dispatch still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no worker dispatch",
    recoveryAction: "Keep worker dispatch blocked.",
    owner: "backend future",
    nextSafeAction: "Leave worker orchestration for a future backend batch.",
  },
  {
    checklistId: "job-execution-still-blocked",
    label: "job execution still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no job execution",
    recoveryAction: "Keep job execution blocked.",
    owner: "backend future",
    nextSafeAction: "Leave job execution for a future backend batch.",
  },
  {
    checklistId: "result-persistence-still-blocked",
    label: "result persistence still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no result persistence",
    recoveryAction: "Keep result persistence unimplemented.",
    owner: "backend future",
    nextSafeAction: "Add join-safe preview records first, then consider persistence in a later batch.",
  },
  {
    checklistId: "audit-persistence-still-blocked",
    label: "audit persistence still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no audit persistence",
    recoveryAction: "Keep audit persistence unimplemented.",
    owner: "backend future",
    nextSafeAction: "Add join-safe preview records first, then consider audit persistence in a later batch.",
  },
  {
    checklistId: "approval-persistence-still-blocked",
    label: "approval persistence still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no approval persistence",
    recoveryAction: "Keep approval persistence unimplemented.",
    owner: "backend future",
    nextSafeAction: "Add join-safe preview records first, then consider approval persistence in a later batch.",
  },
  {
    checklistId: "database-writes-still-blocked",
    label: "database writes still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no database writes",
    recoveryAction: "Keep database writes absent.",
    owner: "backend future",
    nextSafeAction: "Do not add database writes in this batch.",
  },
  {
    checklistId: "file-writes-still-blocked",
    label: "file writes still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no file writes",
    recoveryAction: "Keep file writes absent.",
    owner: "backend future",
    nextSafeAction: "Do not add file writes in this batch.",
  },
] as const satisfies readonly ReadinessChecklistSeed[];

function buildReviewRecord(
  id: MinimalTextAdapterResultCaptureReviewId
): BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord {
  const sourceBundle = resolveReviewSourceBundle(id);

  return {
    id,
    key: buildStableMinimalTextAdapterResultCaptureReviewKey(id),
    reviewVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-review-preview-v1",
    source: REVIEW_SOURCE,
    reviewMode: REVIEW_MODE,
    reviewPosture: REVIEW_POSTURE,
    previewOnlyStatement: PREVIEW_ONLY_STATEMENT,
    requestLabel: sourceBundle.routingPreview.operatorGoalLabel,
    label: `${sourceBundle.routingPreview.operatorGoalLabel} text adapter result capture review`,
    operatorRequestPhrase: sourceBundle.routingPreview.operatorRequestPhrase,
    workspaceTarget: sourceBundle.routingPreview.workspaceTarget,
    sourceMinimalTextAdapterResultCaptureMvpReference:
      buildMinimalTextAdapterResultCaptureMvpSourceReference(id),
    sourceTextAdapterResultCaptureInputReference:
      buildTextAdapterResultCaptureInputSourceReference(id),
    sourceTextAdapterResultCaptureAdmissionCheckReference:
      buildTextAdapterResultCaptureAdmissionCheckSourceReference(id),
    sourceTextAdapterCapturedFixtureResultOutputReference:
      buildTextAdapterCapturedFixtureResultOutputSourceReference(id),
    sourceTextAdapterResultCaptureEnvelopeReference:
      buildTextAdapterResultCaptureEnvelopeSourceReference(id),
    sourceTextAdapterResultCaptureEvidencePreviewReference:
      buildTextAdapterResultCaptureEvidencePreviewSourceReference(id),
    sourceTextAdapterResultCaptureAuditPreviewReference:
      buildTextAdapterResultCaptureAuditPreviewSourceReference(id),
    sourceTextAdapterResultCaptureApprovalPreviewReference:
      buildTextAdapterResultCaptureApprovalPreviewSourceReference(id),
    sourceTextAdapterResultCaptureSafetyGateSummaryReference:
      buildTextAdapterResultCaptureSafetyGateSummarySourceReference(id),
    sourceTextAdapterResultCaptureBlockedLivePersistenceSummaryReference:
      buildTextAdapterResultCaptureBlockedLivePersistenceSummarySourceReference(id),
    sourceMinimalTextAdapterReviewReference:
      sourceBundle.textAdapterReview.key,
    sourceTextAdapterDeterministicFixtureResponseReference:
      buildTextAdapterDeterministicFixtureResponseSourceReference(id),
    sourceTextAdapterOutputReviewReference:
      sourceBundle.textAdapterOutputReview.key,
    sourceTextAdapterRedactedPromptEnvelopeReference:
      buildTextAdapterRedactedPromptEnvelopeSourceReference(id),
    sourceSyntheticEndToEndPacketReviewReference:
      sourceBundle.syntheticEndToEndPacketReview.key,
    sourceManualApprovalDecisionReviewReference:
      sourceBundle.manualApprovalDecisionReview.key,
    selectedCapabilityFamily: {
      ...sourceBundle.manualApprovalDecisionReview.selectedCapabilityFamily,
    },
    providerSlotLabel:
      sourceBundle.manualApprovalDecisionReview.providerSlotLabel,
    backupProviderSlotLabel:
      sourceBundle.manualApprovalDecisionReview.backupProviderSlotLabel,
    localPrivateAlternativeLabel:
      sourceBundle.manualApprovalDecisionReview.localPrivateAlternativeLabel,
    serverOnlyTextAdapterResultCaptureHelperState: "exists",
    textAdapterResultCaptureState: "captured-text-adapter-fixture-in-memory-only",
    deterministicCaptureState: "produced in memory only",
    capturedFixtureResponseState: "captured in memory only",
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
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    nextTextAdapterAuditApprovalJoinMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    currentReadiness: CURRENT_READINESS,
    operatorFacingExplanation:
      `${sourceBundle.routingPreview.operatorGoalLabel} can now be reviewed as a backend-owned, fixture-only, in-memory-only text adapter result capture lane, while prompt sending, provider execution, model calls, approval recording, and persistence remain blocked.`,
  };
}

const REVIEW_RECORDS = ROUTING_PREVIEWS.map((preview) =>
  buildReviewRecord(preview.id)
);
const REVIEW_RECORDS_BY_ID = buildMapById(REVIEW_RECORDS);

function resolveReview(
  id: MinimalTextAdapterResultCaptureReviewId
): BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord {
  return resolveRequiredRecord(
    REVIEW_RECORDS_BY_ID.get(id),
    `Missing text adapter result capture review for ${id}.`
  );
}

function buildOutputReviewRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord
): TextAdapterResultCaptureOutputReviewRecord {
  return {
    id: review.id,
    key: buildStableTextAdapterResultCaptureOutputReviewKey(review.id),
    outputReviewVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-output-review-preview-v1",
    textAdapterResultCaptureReviewId: review.id,
    sourceCapturedFixtureResultOutputReference:
      review.sourceTextAdapterCapturedFixtureResultOutputReference,
    sourceResultCaptureEnvelopeReference:
      review.sourceTextAdapterResultCaptureEnvelopeReference,
    sourceRedactedPromptEnvelopeReference:
      review.sourceTextAdapterRedactedPromptEnvelopeReference,
    captureState: "captured-text-adapter-fixture-in-memory-only",
    adapterIdPosture: "deterministic preview id only",
    fixtureResponseIdPosture: "deterministic preview id only",
    captureIdPosture: "deterministic preview id only",
    digestPosture: "deterministic preview digest only",
    promptTransmissionState: "not sent",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    outputClassification: "captured deterministic fixture only",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    operatorFacingExplanation:
      `${review.requestLabel} remains a deterministic in-memory text adapter fixture capture only, so there is no provider response, model output, or persisted result to treat as live output.`,
    remainingBlockers: [
      "no prompt sending",
      "no model calls",
      "no provider SDK imports",
      "no provider execution",
      "no result persistence",
      "no audit persistence",
      "no approval persistence",
      "no database writes",
      "no file writes",
    ],
    nextSafeAction:
      `Keep ${review.requestLabel} output review preview-only until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH}.`,
    explicitFixtureCaptureOnlyNoRealOutputNoProviderCallNoPersistenceStatement:
      OUTPUT_ONLY_STATEMENT,
  };
}

const OUTPUT_REVIEW_RECORDS = REVIEW_RECORDS.map(buildOutputReviewRecord);

function resolveActualCaptureGateRecord(
  gateId: TextAdapterResultCaptureGateId
): TextAdapterResultCaptureGateRecord {
  return resolveRequiredRecord(
    ACTUAL_CAPTURE_GATE_RECORDS_BY_ID.get(gateId),
    `Missing text adapter result capture gate record for ${gateId}.`
  );
}

function buildGateFailureReviewRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord,
  gateId: TextAdapterResultCaptureGateId
): TextAdapterResultCaptureGateFailureReviewRecord {
  const gateRecord = resolveActualCaptureGateRecord(gateId);
  const seed = resolveRequiredRecord(
    GATE_FAILURE_SEEDS.get(gateId),
    `Missing gate failure seed for ${gateId}.`
  );

  return {
    id: review.id,
    key: buildStableTextAdapterResultCaptureGateFailureReviewKey(
      review.id,
      gateId
    ),
    gateFailureReviewVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate-failure-review-preview-v1",
    textAdapterResultCaptureReviewId: review.id,
    failedGateId: gateId,
    failedGateLabel: gateRecord.label,
    gateState: gateRecord.currentState,
    severity: seed.severity,
    affectedCapabilityFamily: review.selectedCapabilityFamily.label,
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation:
      `${review.requestLabel} remains blocked at the "${gateRecord.label}" boundary because this batch only exposes preview-only review and recovery records and does not unlock live capture, prompt sending, provider execution, or persistence.`,
    requiredEvidenceToUnblock: gateRecord.evidence,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    auditApprovalJoinMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    nextSafeAction:
      `Keep ${review.requestLabel} gate review preview-only until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH}.`,
    explicitNoLiveGatePassStatement: NO_LIVE_GATE_PASS_STATEMENT,
  };
}

const GATE_FAILURE_REVIEW_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  ACTUAL_CAPTURE_GATE_RECORDS.map((gateRecord) =>
    buildGateFailureReviewRecord(review, gateRecord.id)
  )
);

function buildRecoveryPlanRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord
): TextAdapterResultCaptureRecoveryPlanPreviewRecord {
  return {
    id: review.id,
    key: buildStableTextAdapterResultCaptureRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-recovery-plan-preview-v1",
    textAdapterResultCaptureReviewId: review.id,
    recoveryPosture: RECOVERY_POSTURE,
    serverOnlyTextAdapterResultCaptureHelperRecovery:
      "Keep the helper server-only, deterministic, backend-owned, and detached from client execution.",
    textAdapterResultCaptureInputRecovery:
      "Keep result capture inputs typed, deterministic, and transport-free.",
    resultCaptureAdmissionCheckRecovery:
      "Keep admission checks fixture-only, in-memory-only, and persistence-blocked.",
    capturedFixtureResultOutputRecovery:
      "Keep captured fixture result output deterministic, in-memory-only, and non-persistent.",
    resultCaptureEnvelopeRecovery:
      "Keep result capture envelope references preview-only and non-persistent.",
    evidencePreviewRecovery:
      "Keep evidence previews typed, deterministic, and preview-only.",
    auditPreviewRecovery:
      "Keep audit previews visible without creating persisted audit joins.",
    approvalPreviewRecovery:
      "Keep approval previews visible without creating approval requests or approvals records.",
    redactedPromptEnvelopeRecovery:
      "Keep prompt content redacted, preview-only, and unsent.",
    providerBoundaryRecovery:
      "Keep provider SDK imports and provider execution blocked.",
    promptBoundaryRecovery:
      "Keep prompt sending absent.",
    modelBoundaryRecovery:
      "Keep model calls blocked and model output ungenerated.",
    frontendRequestBoundaryRecovery:
      "Keep frontend request creation absent and the chat input inert/local only.",
    apiRouteBoundaryRecovery:
      "Keep API routes absent and backend-owned only.",
    queueDispatchBlockedRecovery:
      "Keep queue dispatch blocked.",
    workerDispatchBlockedRecovery:
      "Keep worker dispatch blocked.",
    jobExecutionBlockedRecovery:
      "Keep job execution blocked.",
    resultPersistenceMissingRecovery:
      "Keep result persistence unimplemented.",
    auditPersistenceMissingRecovery:
      "Keep audit persistence unimplemented.",
    approvalPersistenceMissingRecovery:
      "Keep approval persistence unimplemented.",
    databaseWriteBlockedRecovery:
      "Keep database writes absent.",
    fileWriteBlockedRecovery:
      "Keep file writes absent.",
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    operatorActionRequired:
      `Review ${review.requestLabel} capture posture manually without enabling execution or persistence.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    explicitNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement:
      NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PROMPT_NO_PERSISTENCE_STATEMENT,
  };
}

const RECOVERY_PLAN_RECORDS = REVIEW_RECORDS.map(buildRecoveryPlanRecord);

function buildRecoveryReadinessChecklistRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord,
  seed: ReadinessChecklistSeed
): TextAdapterResultCaptureRecoveryReadinessChecklistRecord {
  return {
    id: review.id,
    key: buildStableTextAdapterResultCaptureRecoveryReadinessChecklistKey(
      review.id,
      seed.checklistId
    ),
    checklistVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-recovery-readiness-checklist-v1",
    textAdapterResultCaptureReviewId: review.id,
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    auditApprovalJoinMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

const RECOVERY_READINESS_CHECKLIST_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  RECOVERY_READINESS_CHECKLIST_SEEDS.map((seed) =>
    buildRecoveryReadinessChecklistRecord(review, seed)
  )
);

function buildReviewAuditSummaryRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord
): TextAdapterResultCaptureReviewAuditSummaryRecord {
  return {
    id: review.id,
    key: buildStableTextAdapterResultCaptureReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-review-audit-summary-preview-v1",
    textAdapterResultCaptureReviewId: review.id,
    auditPosture: "preview-only",
    captureReferenceState: "preview-only / not persisted",
    adapterReferenceState: "preview-only / not persisted",
    fixtureResponseReferenceState: "preview-only / not persisted",
    auditReferenceState: "preview-only / not persisted",
    approvalReferenceState: "preview-only / not persisted",
    evidencePacketState: "preview-only",
    serverOnlyCaptureHelperEvidenceSummary:
      "Server-only text adapter result capture helper exists and stays backend-owned only.",
    deterministicCaptureEvidenceSummary:
      "Deterministic fixture response is captured in memory only and remains preview-safe.",
    redactedPromptEvidenceSummary:
      "Redacted prompt envelope remains preview-only and prompt transmission stays unsent.",
    failedGateSummary:
      "Backend-only, server-only, provider, prompt, model, approval, persistence, database, file, and orchestration gates remain blocked.",
    recoverySummary:
      "Recovery is manual review only with retry and fallback disabled.",
    blockedActionSummary:
      "No provider execution, no model calls, no prompt sending, no approval recording, no persistence, no database writes, and no file writes.",
    noProviderOutputStatement: "No provider output.",
    noModelOutputStatement: "No model output.",
    noPromptSendingStatement: "No prompt sending.",
    noResultPersistenceStatement: "No result persistence.",
    noAuditPersistenceStatement: "No audit persistence.",
    noApprovalPersistenceStatement: "No approval persistence.",
    noDatabaseWriteStatement: "No database write.",
    noFileWriteStatement: "No file write.",
    textAdapterAuditApprovalJoinMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH,
  };
}

const REVIEW_AUDIT_SUMMARY_RECORDS = REVIEW_RECORDS.map(
  buildReviewAuditSummaryRecord
);

function buildAcceptancePostureRecord(
  review: BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord
): TextAdapterResultCaptureAcceptancePostureRecord {
  return {
    id: review.id,
    key: buildStableTextAdapterResultCaptureAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-acceptance-posture-preview-v1",
    textAdapterResultCaptureReviewId: review.id,
    acceptanceState: ACCEPTANCE_STATE,
    fixtureOnlyAcceptanceSummary:
      "Text adapter result capture fixture MVP is accepted as deterministic fixture-only review data.",
    backendOnlyAcceptanceSummary:
      "Result capture review remains accepted only for backend-owned review posture.",
    serverOnlyAcceptanceSummary:
      "Result capture review remains accepted only for a server-only helper boundary.",
    inMemoryOnlyAcceptanceSummary:
      "Result capture review remains accepted only while references and captured fixture output stay in memory only.",
    redactedPromptAcceptanceSummary:
      "Redacted prompt envelope remains accepted only as preview-only evidence with no prompt transmission.",
    providerBlockers: [
      "no provider SDK imports",
      "no provider execution",
      "provider response is not received",
    ],
    promptBlockers: [
      "no prompt sending",
      "prompt transmission state is not sent",
      "redacted prompt envelope is preview-only",
    ],
    modelBlockers: [
      "no LLM/model calls",
      "model output is not generated",
      "model call state: not called",
    ],
    queueWorkerJobBlockers: [
      "no queue dispatch",
      "no worker dispatch",
      "no job execution",
    ],
    resultPersistenceBlockers: [
      "no result persistence",
      "result reference state: preview-only / not persisted",
    ],
    auditPersistenceBlockers: [
      "no audit persistence",
      "audit reference state: preview-only / not persisted",
    ],
    approvalPersistenceBlockers: [
      "no approval persistence",
      "approval reference state: preview-only / not persisted",
    ],
    databaseFileBlockers: [
      "no database writes",
      "no file writes",
    ],
    approvalBlockers: [
      "no real approval request",
      "no real approval recording",
      "approval token is not issued",
      "approval lease is not created",
    ],
    auditBlockers: [
      "audit preview is preview-only",
      "no audit persistence",
    ],
    requiredEvidence: [
      "server-only text adapter result capture helper exists",
      "text adapter fixture response is captured in memory only",
      "text adapter result capture is not persistent",
      "redacted prompt envelope is preview-only",
      "prompt transmission state is not sent",
      "approval fixture is preview-only",
      "manual confirmation fixture is preview-only",
      "kill switch required",
    ],
    nextSafeAction:
      `Keep ${review.requestLabel} accepted only as preview-safe text adapter fixture capture review data until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH}.`,
    explicitTextAdapterResultCaptureFixtureAcceptedLivePersistenceNotAcceptedStatement:
      ACCEPTANCE_STATEMENT,
  };
}

const ACCEPTANCE_POSTURE_RECORDS = REVIEW_RECORDS.map(
  buildAcceptancePostureRecord
);

export function listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews():
  readonly BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord[] {
  return cloneList(REVIEW_RECORDS);
}

export function listTextAdapterResultCaptureOutputReviewRecords():
  readonly TextAdapterResultCaptureOutputReviewRecord[] {
  return cloneList(OUTPUT_REVIEW_RECORDS);
}

export function listTextAdapterResultCaptureGateFailureReviewRecords():
  readonly TextAdapterResultCaptureGateFailureReviewRecord[] {
  return cloneList(GATE_FAILURE_REVIEW_RECORDS);
}

export function listTextAdapterResultCaptureRecoveryPlanPreviews():
  readonly TextAdapterResultCaptureRecoveryPlanPreviewRecord[] {
  return cloneList(RECOVERY_PLAN_RECORDS);
}

export function listTextAdapterResultCaptureRecoveryReadinessChecklistRecords():
  readonly TextAdapterResultCaptureRecoveryReadinessChecklistRecord[] {
  return cloneList(RECOVERY_READINESS_CHECKLIST_RECORDS);
}

export function listTextAdapterResultCaptureReviewAuditSummaries():
  readonly TextAdapterResultCaptureReviewAuditSummaryRecord[] {
  return cloneList(REVIEW_AUDIT_SUMMARY_RECORDS);
}

export function listTextAdapterResultCaptureAcceptancePostureRecords():
  readonly TextAdapterResultCaptureAcceptancePostureRecord[] {
  return cloneList(ACCEPTANCE_POSTURE_RECORDS);
}

export function uniqueTextAdapterResultCaptureReviewDisplayStrings(
  values: readonly string[]
): TextAdapterResultCaptureReviewDisplayStrings {
  return uniqueTextValues(values);
}

export function groupTextAdapterResultCaptureReviewsByCapabilityFamily():
  readonly TextAdapterResultCaptureReviewCapabilityFamilyGroup[] {
  const groups = new Map<
    BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord["selectedCapabilityFamily"]["id"],
    TextAdapterResultCaptureReviewCapabilityFamilyGroup
  >();

  REVIEW_RECORDS.forEach((review) => {
    const existing = groups.get(review.selectedCapabilityFamily.id);
    if (!existing) {
      groups.set(review.selectedCapabilityFamily.id, {
        capabilityFamilyId: review.selectedCapabilityFamily.id,
        capabilityFamilyLabel: review.selectedCapabilityFamily.label,
        reviewCount: 1,
        reviews: [review],
      });
      return;
    }

    groups.set(review.selectedCapabilityFamily.id, {
      ...existing,
      reviewCount: existing.reviewCount + 1,
      reviews: [...existing.reviews, review],
    });
  });

  return [...groups.values()];
}

export function groupTextAdapterResultCaptureReviewsByWorkspaceTarget():
  readonly TextAdapterResultCaptureReviewWorkspaceGroup[] {
  const groups = new Map<
    BackendOwnedMinimalManualGatedTextAdapterResultCaptureReviewRecord["workspaceTarget"],
    TextAdapterResultCaptureReviewWorkspaceGroup
  >();

  REVIEW_RECORDS.forEach((review) => {
    const existing = groups.get(review.workspaceTarget);
    if (!existing) {
      groups.set(review.workspaceTarget, {
        workspaceTarget: review.workspaceTarget,
        reviewCount: 1,
        reviews: [review],
      });
      return;
    }

    groups.set(review.workspaceTarget, {
      ...existing,
      reviewCount: existing.reviewCount + 1,
      reviews: [...existing.reviews, review],
    });
  });

  return [...groups.values()];
}

export function buildTextAdapterResultCaptureReviewSummary():
  TextAdapterResultCaptureReviewSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_MVP_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    reviewCount: REVIEW_RECORDS.length,
    outputReviewCount: OUTPUT_REVIEW_RECORDS.length,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    recoveryPlanCount: RECOVERY_PLAN_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    auditSummaryCount: REVIEW_AUDIT_SUMMARY_RECORDS.length,
    acceptancePostureCount: ACCEPTANCE_POSTURE_RECORDS.length,
    capabilityFamilyGroupCount:
      groupTextAdapterResultCaptureReviewsByCapabilityFamily().length,
    workspaceTargetGroupCount:
      groupTextAdapterResultCaptureReviewsByWorkspaceTarget().length,
    currentReadiness: CURRENT_READINESS,
    acceptanceState: ACCEPTANCE_STATE,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildTextAdapterResultCaptureOutputReviewSummary():
  TextAdapterResultCaptureOutputReviewSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    outputReviewCount: OUTPUT_REVIEW_RECORDS.length,
    summaryLines: cloneList(OUTPUT_REVIEW_SUMMARY_LINES),
    nextSafeAction:
      `Review deterministic fixture capture posture before ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH}.`,
  };
}

export function buildTextAdapterResultCaptureGateFailureSummary():
  TextAdapterResultCaptureGateFailureSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    topFailedGateLabels: uniqueTextValues(
      GATE_FAILURE_REVIEW_RECORDS.map((record) => record.failedGateLabel)
    ).slice(0, 8),
    nextSafeAction:
      `Keep gate failures preview-only and blocked until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH}.`,
  };
}

export function buildTextAdapterResultCaptureRecoverySummary():
  TextAdapterResultCaptureRecoverySummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    recoveryPlanCount: RECOVERY_PLAN_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextSafeAction:
      `Carry the recovery preview posture forward into ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_BATCH}.`,
  };
}

export function buildMinimalTextAdapterAuditApprovalJoinMvpChecklist():
  MinimalTextAdapterAuditApprovalJoinMvpChecklist {
  return cloneList(MINIMAL_TEXT_ADAPTER_AUDIT_APPROVAL_JOIN_MVP_CHECKLIST_LINES);
}
