import {
  listSyntheticMvpExecutionResults,
  type SyntheticMvpExecutionResultRecord,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
  type BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews,
  type BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
} from "../minimal-synth-exec-review";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviews,
  type BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord,
} from "../min-synth-capture-review";
import {
  listSyntheticApprovalJoinOutputs,
  listSyntheticAuditJoinOutputs,
} from "../min-synth-audit-join/min-synth-audit-join-catalog";
import type {
  SyntheticApprovalJoinOutputRecord,
  SyntheticAuditJoinOutputRecord,
} from "../min-synth-audit-join/min-synth-audit-join-types";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunAuditApprovalJoinReviews,
  type BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord,
} from "../min-synth-audit-join-review";
import {
  listMinimalManualGatedSyntheticDryRunResultCaptureMvpRecords,
  listSyntheticResultCaptureOutputs,
  type MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord,
  type SyntheticResultCaptureOutputRecord,
} from "../min-synth-result-capture";
import {
  listMinimalManualGatedSyntheticDryRunEndToEndPacketMvpRecords,
  listSyntheticEndToEndPacketApprovalPreviews,
  listSyntheticEndToEndPacketAuditPreviews,
  listSyntheticEndToEndPacketBlockedLivePersistenceSummaries,
  listSyntheticEndToEndPacketEnvelopes,
  listSyntheticEndToEndPacketEvidencePreviews,
  listSyntheticEndToEndPacketInputs,
  listSyntheticEndToEndPacketOutputs,
  listSyntheticEndToEndPacketSafetyGateSummaries,
  listSyntheticEndToEndPacketStageSummaries,
  type MinimalManualGatedSyntheticDryRunEndToEndPacketMvpRecord,
  type SyntheticEndToEndPacketApprovalPreviewRecord,
  type SyntheticEndToEndPacketAuditPreviewRecord,
  type SyntheticEndToEndPacketBlockedLivePersistenceSummaryRecord,
  type SyntheticEndToEndPacketEnvelopeRecord,
  type SyntheticEndToEndPacketEvidencePreviewRecord,
  type SyntheticEndToEndPacketInputRecord,
  type SyntheticEndToEndPacketOutputRecord,
  type SyntheticEndToEndPacketSafetyGateSummaryRecord,
  type SyntheticEndToEndPacketStageSummaryRecord,
} from "../min-synth-e2e-mvp";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
  type BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord,
  type MinimalSyntheticEndToEndPacketAcceptancePostureKey,
  type MinimalSyntheticEndToEndPacketAcceptanceState,
  type MinimalSyntheticEndToEndPacketFallbackPosture,
  type MinimalSyntheticEndToEndPacketGateFailureReviewKey,
  type MinimalSyntheticEndToEndPacketNoLiveGatePassStatement,
  type MinimalSyntheticEndToEndPacketNoRetryNoFallbackNoProviderNoPersistenceStatement,
  type MinimalSyntheticEndToEndPacketOutputOnlyStatement,
  type MinimalSyntheticEndToEndPacketOutputReviewKey,
  type MinimalSyntheticEndToEndPacketPreviewOnlyStatement,
  type MinimalSyntheticEndToEndPacketRecoveryPlanKey,
  type MinimalSyntheticEndToEndPacketRecoveryPosture,
  type MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistId,
  type MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistKey,
  type MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistLabel,
  type MinimalSyntheticEndToEndPacketReviewAuditSummaryKey,
  type MinimalSyntheticEndToEndPacketReviewCurrentReadiness,
  type MinimalSyntheticEndToEndPacketReviewDisplayStrings,
  type MinimalSyntheticEndToEndPacketReviewId,
  type MinimalSyntheticEndToEndPacketReviewKey,
  type MinimalSyntheticEndToEndPacketReviewMode,
  type MinimalSyntheticEndToEndPacketReviewPosture,
  type MinimalSyntheticEndToEndPacketReviewSeverity,
  type MinimalSyntheticEndToEndPacketReviewSource,
  type MinimalSyntheticEndToEndPacketRetryPosture,
  type MinimalTextModelAdapterMvpChecklist,
  type SyntheticEndToEndPacketAcceptancePostureRecord,
  type SyntheticEndToEndPacketGateFailureReviewRecord,
  type SyntheticEndToEndPacketGateFailureSummary,
  type SyntheticEndToEndPacketOutputReviewRecord,
  type SyntheticEndToEndPacketOutputReviewSummary,
  type SyntheticEndToEndPacketRecoveryPlanPreviewRecord,
  type SyntheticEndToEndPacketRecoveryReadinessChecklistRecord,
  type SyntheticEndToEndPacketRecoverySummary,
  type SyntheticEndToEndPacketReviewAuditSummaryRecord,
  type SyntheticEndToEndPacketReviewCapabilityFamilyGroup,
  type SyntheticEndToEndPacketReviewSummary,
  type SyntheticEndToEndPacketReviewWorkspaceGroup,
} from "./min-synth-e2e-review-types";
import type {
  SyntheticEndToEndPacketGateId,
} from "../min-synth-e2e-mvp";

type ReviewSourceBundle = Readonly<{
  packetMvpRecord: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpRecord;
  packetInputRecord: SyntheticEndToEndPacketInputRecord;
  packetOutputRecord: SyntheticEndToEndPacketOutputRecord;
  packetEnvelopeRecord: SyntheticEndToEndPacketEnvelopeRecord;
  packetStageSummaryRecord: SyntheticEndToEndPacketStageSummaryRecord;
  packetEvidencePreviewRecord: SyntheticEndToEndPacketEvidencePreviewRecord;
  packetAuditPreviewRecord: SyntheticEndToEndPacketAuditPreviewRecord;
  packetApprovalPreviewRecord: SyntheticEndToEndPacketApprovalPreviewRecord;
  packetSafetyGateSummaryRecord: SyntheticEndToEndPacketSafetyGateSummaryRecord;
  blockedLivePersistenceRecord: SyntheticEndToEndPacketBlockedLivePersistenceSummaryRecord;
  auditApprovalJoinReviewRecord: BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord;
  executionReviewRecord: BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord;
  resultCaptureReviewRecord: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord;
  manualApprovalDecisionReviewRecord: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord;
  executionResultRecord: SyntheticMvpExecutionResultRecord;
  resultCaptureOutputRecord: SyntheticResultCaptureOutputRecord;
  auditJoinOutputRecord: SyntheticAuditJoinOutputRecord;
  approvalJoinOutputRecord: SyntheticApprovalJoinOutputRecord;
}>;

type GateFailureSeed = Readonly<{
  severity: MinimalSyntheticEndToEndPacketReviewSeverity;
  label: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
}>;

type ReadinessChecklistSeed = Readonly<{
  checklistId: MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistId;
  label: MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistLabel;
  state:
    SyntheticEndToEndPacketRecoveryReadinessChecklistRecord["state"];
  severity: MinimalSyntheticEndToEndPacketReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: SyntheticEndToEndPacketRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const CURRENT_READINESS: MinimalSyntheticEndToEndPacketReviewCurrentReadiness =
  "minimal-synthetic-end-to-end-packet-review-only / backend-only / in-memory-only / not provider-capable / not persistent";

const REVIEW_SOURCE: MinimalSyntheticEndToEndPacketReviewSource =
  "Athena / Jarvis Model Gateway";
const REVIEW_MODE: MinimalSyntheticEndToEndPacketReviewMode = "preview-only";
const REVIEW_POSTURE: MinimalSyntheticEndToEndPacketReviewPosture =
  "minimal synthetic end-to-end packet review / backend-only / in-memory-only / not provider-capable / not persistent";
const PREVIEW_ONLY_STATEMENT: MinimalSyntheticEndToEndPacketPreviewOnlyStatement =
  "minimal synthetic end-to-end packet review is preview-only";
const OUTPUT_ONLY_STATEMENT: MinimalSyntheticEndToEndPacketOutputOnlyStatement =
  "Synthetic packet only. No real output. No persistence.";
const NO_LIVE_GATE_PASS_STATEMENT: MinimalSyntheticEndToEndPacketNoLiveGatePassStatement =
  "No live gate pass.";
const NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PERSISTENCE_STATEMENT: MinimalSyntheticEndToEndPacketNoRetryNoFallbackNoProviderNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No persistence.";
const ACCEPTANCE_STATE: MinimalSyntheticEndToEndPacketAcceptanceState =
  "not accepted for live execution / synthetic end-to-end packet MVP accepted only";
const ACCEPTANCE_STATEMENT =
  "Synthetic end-to-end packet MVP accepted only. Live execution not accepted." as const;
const RECOVERY_POSTURE: MinimalSyntheticEndToEndPacketRecoveryPosture =
  "manual review only";
const RETRY_POSTURE: MinimalSyntheticEndToEndPacketRetryPosture = "disabled";
const FALLBACK_POSTURE: MinimalSyntheticEndToEndPacketFallbackPosture =
  "disabled";

const REVIEW_SUMMARY_LINES = [
  "backend-owned minimal manual-gated synthetic dry-run end-to-end packet review and recovery preview only",
  "minimal synthetic end-to-end packet review is preview-only",
  "server-only synthetic end-to-end packet helper exists",
  "synthetic end-to-end packet is produced in memory only",
  "deterministic synthetic end-to-end packet only",
  "synthetic execution, capture, audit join, and approval join are bundled in memory only",
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
  "backend-owned minimal manual-gated text model adapter MVP next",
] as const;

const OUTPUT_REVIEW_SUMMARY_LINES = [
  "synthetic end-to-end packet output review is preview-only",
  "packet state: assembled-synthetic-in-memory-only",
  "packet id posture: deterministic preview id only",
  "execution id posture: deterministic preview id only",
  "capture id posture: deterministic preview id only",
  "audit join id posture: deterministic preview id only",
  "approval join id posture: deterministic preview id only",
  "result reference posture: preview-only / not persisted",
  "audit reference posture: preview-only / not persisted",
  "approval reference posture: preview-only / not persisted",
  "digest posture: deterministic preview digest only",
  "provider response state: not received",
  "model output state: not generated",
  "output classification: synthetic fixture only",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only module boundary",
  "synthetic-only packet mode",
  "manual approval fixture",
  "manual confirmation fixture",
  "synthetic execution result present",
  "synthetic result capture present",
  "synthetic audit join present",
  "synthetic approval join present",
  "deterministic execution id",
  "deterministic capture id",
  "deterministic audit join id",
  "deterministic approval join id",
  "deterministic packet id",
  "deterministic packet digest",
  "in-memory only result reference",
  "in-memory only audit reference",
  "in-memory only approval reference",
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
] as const;

const RECOVERY_SUMMARY_LINES = [
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "server-only packet helper recovery",
  "synthetic end-to-end packet input recovery",
  "packet output recovery",
  "packet envelope recovery",
  "packet stage summary recovery",
  "execution dependency recovery",
  "result capture dependency recovery",
  "audit join dependency recovery",
  "approval join dependency recovery",
  "audit preview recovery",
  "approval preview recovery",
  "evidence packet recovery",
  "provider boundary recovery",
  "prompt boundary recovery",
  "model boundary recovery",
  "frontend request boundary recovery",
  "API route boundary recovery",
  "queue dispatch blocked recovery",
  "worker dispatch blocked recovery",
  "job execution blocked recovery",
  "result persistence missing recovery",
  "audit persistence missing recovery",
  "approval persistence missing recovery",
  "database write blocked recovery",
  "file write blocked recovery",
  "text model adapter MVP comes next",
] as const;

const MINIMAL_TEXT_MODEL_ADAPTER_MVP_CHECKLIST = [
  "Keep the server-only synthetic end-to-end packet helper deterministic, backend-only, and in-memory only while the review layer remains preview-only.",
  "Preserve typed synthetic execution, capture, audit join, approval join, packet output, envelope, stage summary, evidence, audit preview, and approval preview references without adding persistence.",
  "Do not add a frontend request, API route, fetch/network call, provider SDK import, provider execution, prompt sending, model call, queue dispatch, worker dispatch, or job execution.",
  "Do not add real approval requests, approval recording, approval token issuance, approval lease issuance, result persistence, audit persistence, approval persistence, database writes, file writes, retry, or fallback.",
  "Advance to 5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP with a server-only adapter path and no live provider execution from the frontend.",
] as const satisfies MinimalTextModelAdapterMvpChecklist;

const REQUEST_LABELS: Readonly<Record<MinimalSyntheticEndToEndPacketReviewId, string>> =
  {
    "conversational-planning-request": "conversational planning request",
    "code-assistance-request": "code assistance request",
    "website-copy-code-request": "website copy/code request",
    "product-video-request": "product video request",
    "storyboard-image-request": "storyboard image request",
    "audio-narration-request": "audio narration request",
    "transcription-caption-request": "transcription/caption request",
    "embeddings-search-request": "embeddings/search request",
    "safety-moderation-review-request":
      "safety/moderation review request",
    "local-private-inference-request": "local/private inference request",
    "audit-recovery-explanation-request":
      "audit/recovery explanation request",
  };

const MVP_RECORDS = listMinimalManualGatedSyntheticDryRunEndToEndPacketMvpRecords();
const PACKET_INPUT_RECORDS = listSyntheticEndToEndPacketInputs();
const PACKET_OUTPUT_RECORDS = listSyntheticEndToEndPacketOutputs();
const PACKET_ENVELOPE_RECORDS = listSyntheticEndToEndPacketEnvelopes();
const PACKET_STAGE_SUMMARY_RECORDS = listSyntheticEndToEndPacketStageSummaries();
const PACKET_EVIDENCE_PREVIEW_RECORDS = listSyntheticEndToEndPacketEvidencePreviews();
const PACKET_AUDIT_PREVIEW_RECORDS = listSyntheticEndToEndPacketAuditPreviews();
const PACKET_APPROVAL_PREVIEW_RECORDS = listSyntheticEndToEndPacketApprovalPreviews();
const PACKET_SAFETY_SUMMARY_RECORDS = listSyntheticEndToEndPacketSafetyGateSummaries();
const PACKET_BLOCKED_LIVE_PERSISTENCE_RECORDS =
  listSyntheticEndToEndPacketBlockedLivePersistenceSummaries();
const AUDIT_APPROVAL_JOIN_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunAuditApprovalJoinReviews();
const EXECUTION_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews();
const RESULT_CAPTURE_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviews();
const MANUAL_APPROVAL_DECISION_REVIEW_RECORDS =
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews();
const EXECUTION_RESULT_RECORDS = listSyntheticMvpExecutionResults();
const RESULT_CAPTURE_MVP_RECORDS =
  listMinimalManualGatedSyntheticDryRunResultCaptureMvpRecords();
const RESULT_CAPTURE_OUTPUT_RECORDS = listSyntheticResultCaptureOutputs();
const AUDIT_JOIN_OUTPUT_RECORDS = listSyntheticAuditJoinOutputs();
const APPROVAL_JOIN_OUTPUT_RECORDS = listSyntheticApprovalJoinOutputs();

function cloneList<T>(records: readonly T[]): readonly T[] {
  return records.map((record) => record);
}

function getRequiredRecord<T>(
  records: readonly T[],
  predicate: (record: T) => boolean,
  description: string
): T {
  const match = records.find(predicate);

  if (!match) {
    throw new Error(`Missing ${description}.`);
  }

  return match;
}

function buildStableLookupKey(
  id: MinimalSyntheticEndToEndPacketReviewId,
  scope: string
): string {
  return `${scope}:${id}`;
}

function buildSourceBundle(
  id: MinimalSyntheticEndToEndPacketReviewId
): ReviewSourceBundle {
  const resultCaptureMvpRecord = getRequiredRecord(
    RESULT_CAPTURE_MVP_RECORDS,
    (record) => record.stableId === id,
    `result capture MVP record for ${id}`
  );

  return {
    packetMvpRecord: getRequiredRecord(
      MVP_RECORDS,
      (record) => record.stableId === id,
      `packet MVP record for ${id}`
    ),
    packetInputRecord: getRequiredRecord(
      PACKET_INPUT_RECORDS,
      (record) => record.stableId === id,
      `packet input record for ${id}`
    ),
    packetOutputRecord: getRequiredRecord(
      PACKET_OUTPUT_RECORDS,
      (record) => record.stableId === id,
      `packet output record for ${id}`
    ),
    packetEnvelopeRecord: getRequiredRecord(
      PACKET_ENVELOPE_RECORDS,
      (record) => record.stableId === id,
      `packet envelope record for ${id}`
    ),
    packetStageSummaryRecord: getRequiredRecord(
      PACKET_STAGE_SUMMARY_RECORDS,
      (record) => record.stableId === id,
      `packet stage summary record for ${id}`
    ),
    packetEvidencePreviewRecord: getRequiredRecord(
      PACKET_EVIDENCE_PREVIEW_RECORDS,
      (record) => record.stableId === id,
      `packet evidence preview record for ${id}`
    ),
    packetAuditPreviewRecord: getRequiredRecord(
      PACKET_AUDIT_PREVIEW_RECORDS,
      (record) => record.stableId === id,
      `packet audit preview record for ${id}`
    ),
    packetApprovalPreviewRecord: getRequiredRecord(
      PACKET_APPROVAL_PREVIEW_RECORDS,
      (record) => record.stableId === id,
      `packet approval preview record for ${id}`
    ),
    packetSafetyGateSummaryRecord: getRequiredRecord(
      PACKET_SAFETY_SUMMARY_RECORDS,
      (record) => record.stableId === id,
      `packet safety gate summary record for ${id}`
    ),
    blockedLivePersistenceRecord: getRequiredRecord(
      PACKET_BLOCKED_LIVE_PERSISTENCE_RECORDS,
      (record) => record.stableId === id,
      `packet blocked live persistence record for ${id}`
    ),
    auditApprovalJoinReviewRecord: getRequiredRecord(
      AUDIT_APPROVAL_JOIN_REVIEW_RECORDS,
      (record) => record.id === id,
      `audit approval join review record for ${id}`
    ),
    executionReviewRecord: getRequiredRecord(
      EXECUTION_REVIEW_RECORDS,
      (record) => record.id === id,
      `execution review record for ${id}`
    ),
    resultCaptureReviewRecord: getRequiredRecord(
      RESULT_CAPTURE_REVIEW_RECORDS,
      (record) => record.id === id,
      `result capture review record for ${id}`
    ),
    manualApprovalDecisionReviewRecord: getRequiredRecord(
      MANUAL_APPROVAL_DECISION_REVIEW_RECORDS,
      (record) => record.id === id,
      `manual approval decision review record for ${id}`
    ),
    executionResultRecord: getRequiredRecord(
      EXECUTION_RESULT_RECORDS,
      (record) => record.executionMvpId === id,
      `execution result record for ${id}`
    ),
    resultCaptureOutputRecord: getRequiredRecord(
      RESULT_CAPTURE_OUTPUT_RECORDS,
      (record) => record.resultCaptureMvpId === id,
      `result capture output record for ${id}`
    ),
    auditJoinOutputRecord: getRequiredRecord(
      AUDIT_JOIN_OUTPUT_RECORDS,
      (record) => record.auditApprovalJoinMvpId === id,
      `audit join output record for ${id}`
    ),
    approvalJoinOutputRecord: getRequiredRecord(
      APPROVAL_JOIN_OUTPUT_RECORDS,
      (record) => record.auditApprovalJoinMvpId === id,
      `approval join output record for ${id}`
    ),
  };
}

export function buildStableMinimalSyntheticEndToEndPacketReviewKey(
  id: MinimalSyntheticEndToEndPacketReviewId
): MinimalSyntheticEndToEndPacketReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review:${id}`;
}

export function buildStableSyntheticEndToEndPacketOutputReviewKey(
  id: MinimalSyntheticEndToEndPacketReviewId
): MinimalSyntheticEndToEndPacketOutputReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-output-review:${id}`;
}

export function buildStableSyntheticEndToEndPacketGateFailureReviewKey(
  id: MinimalSyntheticEndToEndPacketReviewId,
  gateId: SyntheticEndToEndPacketGateId
): MinimalSyntheticEndToEndPacketGateFailureReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-gate-failure-review:${id}:${gateId}`;
}

export function buildStableSyntheticEndToEndPacketRecoveryPlanKey(
  id: MinimalSyntheticEndToEndPacketReviewId
): MinimalSyntheticEndToEndPacketRecoveryPlanKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-recovery-plan:${id}`;
}

export function buildStableSyntheticEndToEndPacketRecoveryReadinessChecklistKey(
  id: MinimalSyntheticEndToEndPacketReviewId,
  checklistId: MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistId
): MinimalSyntheticEndToEndPacketRecoveryReadinessChecklistKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-recovery-readiness:${id}:${checklistId}`;
}

export function buildStableSyntheticEndToEndPacketReviewAuditSummaryKey(
  id: MinimalSyntheticEndToEndPacketReviewId
): MinimalSyntheticEndToEndPacketReviewAuditSummaryKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review-audit-summary:${id}`;
}

export function buildStableSyntheticEndToEndPacketAcceptancePostureKey(
  id: MinimalSyntheticEndToEndPacketReviewId
): MinimalSyntheticEndToEndPacketAcceptancePostureKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-acceptance-posture:${id}`;
}

function buildReviewRecord(
  id: MinimalSyntheticEndToEndPacketReviewId
): BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord {
  const source = buildSourceBundle(id);
  const requestLabel = REQUEST_LABELS[id];

  return {
    id,
    key: buildStableMinimalSyntheticEndToEndPacketReviewKey(id),
    reviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review-preview-v1",
    source: REVIEW_SOURCE,
    reviewMode: REVIEW_MODE,
    reviewPosture: REVIEW_POSTURE,
    previewOnlyStatement: PREVIEW_ONLY_STATEMENT,
    requestLabel,
    label: `${requestLabel} packet review`,
    workspaceTarget: source.packetMvpRecord.workspaceTarget,
    sourceMinimalSyntheticEndToEndPacketMvpReference: source.packetMvpRecord.key,
    sourceSyntheticEndToEndPacketInputReference: source.packetInputRecord.key,
    sourceSyntheticEndToEndPacketOutputReference: source.packetOutputRecord.key,
    sourceSyntheticEndToEndPacketEnvelopeReference:
      source.packetEnvelopeRecord.key,
    sourceSyntheticEndToEndPacketStageSummaryReference:
      source.packetStageSummaryRecord.key,
    sourceSyntheticEndToEndPacketEvidencePreviewReference:
      source.packetEvidencePreviewRecord.key,
    sourceSyntheticEndToEndPacketAuditPreviewReference:
      source.packetAuditPreviewRecord.key,
    sourceSyntheticEndToEndPacketApprovalPreviewReference:
      source.packetApprovalPreviewRecord.key,
    sourceSyntheticEndToEndPacketSafetyGateSummaryReference:
      source.packetSafetyGateSummaryRecord.key,
    sourceSyntheticEndToEndPacketBlockedLivePersistenceSummaryReference:
      source.blockedLivePersistenceRecord.key,
    sourceMinimalSyntheticAuditApprovalJoinReviewReference:
      source.auditApprovalJoinReviewRecord.key,
    sourceSyntheticAuditJoinOutputReference:
      source.auditJoinOutputRecord.key,
    sourceSyntheticApprovalJoinOutputReference:
      source.approvalJoinOutputRecord.key,
    sourceMinimalSyntheticResultCaptureReviewReference:
      source.resultCaptureReviewRecord.key,
    sourceSyntheticResultCaptureOutputReference:
      source.resultCaptureOutputRecord.key,
    sourceMinimalSyntheticExecutionReviewReference:
      source.executionReviewRecord.key,
    sourceSyntheticExecutionResultReference:
      source.executionResultRecord.key,
    sourceManualApprovalDecisionReviewReference:
      source.manualApprovalDecisionReviewRecord.key,
    selectedCapabilityFamily:
      source.manualApprovalDecisionReviewRecord.selectedCapabilityFamily,
    providerSlotLabel: source.manualApprovalDecisionReviewRecord.providerSlotLabel,
    backupProviderSlotLabel:
      source.manualApprovalDecisionReviewRecord.backupProviderSlotLabel,
    localPrivateAlternativeLabel:
      source.manualApprovalDecisionReviewRecord.localPrivateAlternativeLabel,
    serverOnlyPacketHelperState: "exists",
    syntheticEndToEndPacketState: "assembled-synthetic-in-memory-only",
    deterministicPacketState: "produced in memory only",
    syntheticExecutionState: "bundled in memory only",
    syntheticCaptureState: "bundled in memory only",
    syntheticAuditJoinState: "bundled in memory only",
    syntheticApprovalJoinState: "bundled in memory only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    promptSendingState: "not implemented",
    providerExecutionState: "blocked",
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
    nextTextModelAdapterMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
    currentReadiness: CURRENT_READINESS,
  };
}

const REVIEW_RECORDS = MVP_RECORDS.map((record) =>
  buildReviewRecord(record.stableId)
);

function buildOutputReviewRecord(
  review: BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord
): SyntheticEndToEndPacketOutputReviewRecord {
  return {
    id: review.id,
    key: buildStableSyntheticEndToEndPacketOutputReviewKey(review.id),
    outputReviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-output-review-preview-v1",
    endToEndPacketReviewId: review.id,
    sourcePacketOutputReference: review.sourceSyntheticEndToEndPacketOutputReference,
    sourcePacketEnvelopeReference:
      review.sourceSyntheticEndToEndPacketEnvelopeReference,
    sourcePacketStageSummaryReference:
      review.sourceSyntheticEndToEndPacketStageSummaryReference,
    packetState: "assembled-synthetic-in-memory-only",
    packetIdPosture: "deterministic preview id only",
    executionIdPosture: "deterministic preview id only",
    captureIdPosture: "deterministic preview id only",
    auditJoinIdPosture: "deterministic preview id only",
    approvalJoinIdPosture: "deterministic preview id only",
    resultReferencePosture: "preview-only / not persisted",
    auditReferencePosture: "preview-only / not persisted",
    approvalReferencePosture: "preview-only / not persisted",
    digestPosture: "deterministic preview digest only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    outputClassification: "synthetic fixture only",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    operatorFacingExplanation:
      `${review.requestLabel} remains a deterministic synthetic packet preview that never becomes a provider response or a persisted result.`,
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
      `Keep ${review.requestLabel} output review preview-only and move the next backend step to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH}.`,
    explicitSyntheticPacketOnlyNoRealOutputNoPersistenceStatement:
      OUTPUT_ONLY_STATEMENT,
  };
}

const OUTPUT_REVIEW_RECORDS = REVIEW_RECORDS.map(buildOutputReviewRecord);

const GATE_FAILURE_SEEDS = new Map<SyntheticEndToEndPacketGateId, GateFailureSeed>([
  [
    "backend-only-boundary",
    {
      severity: "critical",
      label: "backend-only boundary",
      requiredEvidenceToUnblock:
        "Backend-owned synthetic packet helper remains outside any frontend execution path.",
      requiredRecoveryAction:
        "Keep the packet review layer read-only and backend-owned.",
    },
  ],
  [
    "server-only-module-boundary",
    {
      severity: "critical",
      label: "server-only module boundary",
      requiredEvidenceToUnblock:
        "server-only synthetic end-to-end packet helper exists",
      requiredRecoveryAction:
        "Do not expose the helper through a client module or API route.",
    },
  ],
  [
    "synthetic-only-packet-mode",
    {
      severity: "critical",
      label: "synthetic-only packet mode",
      requiredEvidenceToUnblock:
        "deterministic synthetic end-to-end packet only",
      requiredRecoveryAction:
        "Keep packet assembly synthetic-only and detached from real provider traffic.",
    },
  ],
  [
    "manual-approval-fixture",
    {
      severity: "high",
      label: "manual approval fixture",
      requiredEvidenceToUnblock: "approval fixture is preview-only",
      requiredRecoveryAction:
        "Keep approval review fixture-only and never convert it into a live request.",
    },
  ],
  [
    "manual-confirmation-fixture",
    {
      severity: "high",
      label: "manual confirmation fixture",
      requiredEvidenceToUnblock:
        "manual confirmation fixture is preview-only",
      requiredRecoveryAction:
        "Keep confirmation review synthetic and unrecorded.",
    },
  ],
  [
    "synthetic-execution-result-present",
    {
      severity: "high",
      label: "synthetic execution result present",
      requiredEvidenceToUnblock:
        "synthetic execution, capture, audit join, and approval join are bundled in memory only",
      requiredRecoveryAction:
        "Preserve the synthetic execution dependency as an in-memory fixture.",
    },
  ],
  [
    "synthetic-result-capture-present",
    {
      severity: "high",
      label: "synthetic result capture present",
      requiredEvidenceToUnblock:
        "synthetic execution, capture, audit join, and approval join are bundled in memory only",
      requiredRecoveryAction:
        "Preserve the synthetic result capture dependency as an in-memory fixture.",
    },
  ],
  [
    "synthetic-audit-join-present",
    {
      severity: "high",
      label: "synthetic audit join present",
      requiredEvidenceToUnblock:
        "synthetic execution, capture, audit join, and approval join are bundled in memory only",
      requiredRecoveryAction:
        "Preserve the synthetic audit join dependency as an in-memory fixture.",
    },
  ],
  [
    "synthetic-approval-join-present",
    {
      severity: "high",
      label: "synthetic approval join present",
      requiredEvidenceToUnblock:
        "synthetic execution, capture, audit join, and approval join are bundled in memory only",
      requiredRecoveryAction:
        "Preserve the synthetic approval join dependency as an in-memory fixture.",
    },
  ],
  [
    "deterministic-execution-id",
    {
      severity: "high",
      label: "deterministic execution id",
      requiredEvidenceToUnblock: "execution id posture: deterministic preview id only",
      requiredRecoveryAction:
        "Keep synthetic execution ids deterministic and preview-only.",
    },
  ],
  [
    "deterministic-capture-id",
    {
      severity: "high",
      label: "deterministic capture id",
      requiredEvidenceToUnblock: "capture id posture: deterministic preview id only",
      requiredRecoveryAction:
        "Keep synthetic capture ids deterministic and preview-only.",
    },
  ],
  [
    "deterministic-audit-join-id",
    {
      severity: "high",
      label: "deterministic audit join id",
      requiredEvidenceToUnblock: "audit join id posture: deterministic preview id only",
      requiredRecoveryAction:
        "Keep synthetic audit join ids deterministic and preview-only.",
    },
  ],
  [
    "deterministic-approval-join-id",
    {
      severity: "high",
      label: "deterministic approval join id",
      requiredEvidenceToUnblock: "approval join id posture: deterministic preview id only",
      requiredRecoveryAction:
        "Keep synthetic approval join ids deterministic and preview-only.",
    },
  ],
  [
    "deterministic-packet-id",
    {
      severity: "high",
      label: "deterministic packet id",
      requiredEvidenceToUnblock: "packet id posture: deterministic preview id only",
      requiredRecoveryAction:
        "Keep packet ids deterministic and preview-only.",
    },
  ],
  [
    "deterministic-packet-digest",
    {
      severity: "high",
      label: "deterministic packet digest",
      requiredEvidenceToUnblock:
        "digest posture: deterministic preview digest only",
      requiredRecoveryAction:
        "Keep packet digests deterministic and preview-only.",
    },
  ],
  [
    "in-memory-only-result-reference",
    {
      severity: "high",
      label: "in-memory only result reference",
      requiredEvidenceToUnblock:
        "result reference posture: preview-only / not persisted",
      requiredRecoveryAction:
        "Keep result references in memory only and out of persistence layers.",
    },
  ],
  [
    "in-memory-only-audit-reference",
    {
      severity: "high",
      label: "in-memory only audit reference",
      requiredEvidenceToUnblock:
        "audit reference posture: preview-only / not persisted",
      requiredRecoveryAction:
        "Keep audit references in memory only and out of persistence layers.",
    },
  ],
  [
    "in-memory-only-approval-reference",
    {
      severity: "high",
      label: "in-memory only approval reference",
      requiredEvidenceToUnblock:
        "approval reference posture: preview-only / not persisted",
      requiredRecoveryAction:
        "Keep approval references in memory only and out of persistence layers.",
    },
  ],
  [
    "no-real-approval-recording",
    {
      severity: "critical",
      label: "no real approval recording",
      requiredEvidenceToUnblock: "no real approval recording",
      requiredRecoveryAction:
        "Do not record approval state or convert preview approval into a live decision.",
    },
  ],
  [
    "no-approval-token-issuance",
    {
      severity: "critical",
      label: "no approval token issuance",
      requiredEvidenceToUnblock: "approval token is not issued",
      requiredRecoveryAction:
        "Keep token issuance absent from the review layer.",
    },
  ],
  [
    "no-approval-lease-issuance",
    {
      severity: "critical",
      label: "no approval lease issuance",
      requiredEvidenceToUnblock: "approval lease is not created",
      requiredRecoveryAction:
        "Keep lease issuance absent from the review layer.",
    },
  ],
  [
    "no-frontend-request",
    {
      severity: "critical",
      label: "no frontend request",
      requiredEvidenceToUnblock: "no frontend request is created",
      requiredRecoveryAction:
        "Keep the frontend chat input inert and local only.",
    },
  ],
  [
    "no-api-route",
    {
      severity: "critical",
      label: "no API route",
      requiredEvidenceToUnblock: "no API route is created",
      requiredRecoveryAction:
        "Do not expose the packet review through a route or fetch path.",
    },
  ],
  [
    "no-fetch-network",
    {
      severity: "critical",
      label: "no fetch/network",
      requiredEvidenceToUnblock: "no frontend fetch/network call",
      requiredRecoveryAction:
        "Keep the frontend network boundary closed.",
    },
  ],
  [
    "no-provider-sdk-import",
    {
      severity: "critical",
      label: "no provider SDK import",
      requiredEvidenceToUnblock: "no provider SDK imports",
      requiredRecoveryAction:
        "Do not add provider SDK imports to the review or UI layer.",
    },
  ],
  [
    "no-provider-execution",
    {
      severity: "critical",
      label: "no provider execution",
      requiredEvidenceToUnblock: "no provider execution",
      requiredRecoveryAction:
        "Keep provider execution blocked until a future backend-only adapter exists.",
    },
  ],
  [
    "no-model-call",
    {
      severity: "critical",
      label: "no model call",
      requiredEvidenceToUnblock: "no LLM/model calls",
      requiredRecoveryAction:
        "Keep model calls absent from the packet review path.",
    },
  ],
  [
    "no-prompt-sending",
    {
      severity: "critical",
      label: "no prompt sending",
      requiredEvidenceToUnblock: "no prompt sending",
      requiredRecoveryAction:
        "Keep prompt sending unimplemented.",
    },
  ],
  [
    "no-queue-dispatch",
    {
      severity: "critical",
      label: "no queue dispatch",
      requiredEvidenceToUnblock: "no queue dispatch",
      requiredRecoveryAction: "Keep queue dispatch blocked.",
    },
  ],
  [
    "no-worker-dispatch",
    {
      severity: "critical",
      label: "no worker dispatch",
      requiredEvidenceToUnblock: "no worker dispatch",
      requiredRecoveryAction: "Keep worker dispatch blocked.",
    },
  ],
  [
    "no-job-execution",
    {
      severity: "critical",
      label: "no job execution",
      requiredEvidenceToUnblock: "no job execution",
      requiredRecoveryAction: "Keep job execution blocked.",
    },
  ],
  [
    "no-result-persistence",
    {
      severity: "critical",
      label: "no result persistence",
      requiredEvidenceToUnblock: "no result persistence",
      requiredRecoveryAction: "Keep result persistence unimplemented.",
    },
  ],
  [
    "no-audit-persistence",
    {
      severity: "critical",
      label: "no audit persistence",
      requiredEvidenceToUnblock: "no audit persistence",
      requiredRecoveryAction: "Keep audit persistence unimplemented.",
    },
  ],
  [
    "no-approval-persistence",
    {
      severity: "critical",
      label: "no approval persistence",
      requiredEvidenceToUnblock: "no approval persistence",
      requiredRecoveryAction: "Keep approval persistence unimplemented.",
    },
  ],
  [
    "no-database-write",
    {
      severity: "critical",
      label: "no database write",
      requiredEvidenceToUnblock: "no database writes",
      requiredRecoveryAction: "Keep database writes absent.",
    },
  ],
  [
    "no-file-write",
    {
      severity: "critical",
      label: "no file write",
      requiredEvidenceToUnblock: "no file writes",
      requiredRecoveryAction: "Keep file writes absent.",
    },
  ],
  [
    "single-run-lock-preview",
    {
      severity: "medium",
      label: "single-run lock preview",
      requiredEvidenceToUnblock: "single-run lock preview",
      requiredRecoveryAction:
        "Keep lock posture review-only and do not add execution coordination.",
    },
  ],
  [
    "idempotency-replay-preview",
    {
      severity: "medium",
      label: "idempotency/replay preview",
      requiredEvidenceToUnblock: "idempotency/replay preview",
      requiredRecoveryAction:
        "Keep replay handling review-only and detached from live execution.",
    },
  ],
  [
    "timeout-cancel-preview",
    {
      severity: "medium",
      label: "timeout/cancel preview",
      requiredEvidenceToUnblock: "timeout/cancel preview",
      requiredRecoveryAction:
        "Keep timeout and cancel posture review-only and inert.",
    },
  ],
  [
    "privacy-redaction-preview",
    {
      severity: "high",
      label: "privacy/redaction preview",
      requiredEvidenceToUnblock: "privacy/redaction preview",
      requiredRecoveryAction:
        "Keep privacy and redaction posture explicit before any future backend adapter work.",
    },
  ],
]);

function buildGateFailureReviewRecord(
  review: BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord,
  gateId: SyntheticEndToEndPacketGateId
): SyntheticEndToEndPacketGateFailureReviewRecord {
  const seed = GATE_FAILURE_SEEDS.get(gateId);

  if (!seed) {
    throw new Error(`Missing gate failure seed for ${gateId}.`);
  }

  return {
    id: review.id,
    key: buildStableSyntheticEndToEndPacketGateFailureReviewKey(
      review.id,
      gateId
    ),
    gateFailureReviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-gate-failure-review-preview-v1",
    endToEndPacketReviewId: review.id,
    failedGateId: gateId,
    failedGateLabel: seed.label,
    gateState: "blocked",
    severity: seed.severity,
    affectedCapabilityFamily: review.selectedCapabilityFamily.label,
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation:
      `${review.requestLabel} remains blocked at ${seed.label} because the synthetic packet review must stay backend-only, in-memory-only, and preview-only.`,
    requiredEvidenceToUnblock: seed.requiredEvidenceToUnblock,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    textModelAdapterMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
    nextSafeAction:
      `Keep ${seed.label} blocked and carry the evidence into ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH}.`,
    explicitNoLiveGatePassStatement: NO_LIVE_GATE_PASS_STATEMENT,
  };
}

const ALL_GATE_FAILURE_REVIEW_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  Array.from(GATE_FAILURE_SEEDS.keys()).map((gateId) =>
    buildGateFailureReviewRecord(review, gateId)
  )
);

const READINESS_CHECKLIST_SEEDS: readonly ReadinessChecklistSeed[] = [
  {
    checklistId: "server-only-packet-helper-reviewed",
    label: "server-only packet helper reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "server-only synthetic end-to-end packet helper exists",
    recoveryAction: "Keep the packet helper server-only and deterministic.",
    owner: "operator",
    nextSafeAction:
      "Review the helper boundary without adding a frontend-callable path.",
  },
  {
    checklistId: "synthetic-end-to-end-packet-input-reviewed",
    label: "synthetic end-to-end packet input reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic end-to-end packet input is typed and deterministic",
    recoveryAction: "Keep packet input preview-only and detached from live transport.",
    owner: "operator",
    nextSafeAction: "Review packet input posture without adding a request path.",
  },
  {
    checklistId: "packet-admission-check-reviewed",
    label: "packet admission check reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "packet admission check validates synthetic-only and blocked live actions",
    recoveryAction: "Keep admission checks deterministic and typed.",
    owner: "operator",
    nextSafeAction: "Review admission posture without enabling execution.",
  },
  {
    checklistId: "packet-output-reviewed",
    label: "packet output reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic end-to-end packet output stays assembled-synthetic-in-memory-only",
    recoveryAction: "Keep packet output in memory only.",
    owner: "operator",
    nextSafeAction: "Review output posture without promoting it into a provider result.",
  },
  {
    checklistId: "packet-envelope-reviewed",
    label: "packet envelope reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "Synthetic packet only. No real output. No persistence.",
    recoveryAction: "Keep the envelope limited to synthetic preview references.",
    owner: "operator",
    nextSafeAction: "Review envelope references only.",
  },
  {
    checklistId: "packet-stage-summary-reviewed",
    label: "packet stage summary reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "packet stage summary remains static placeholder only",
    recoveryAction: "Keep the stage summary typed and synthetic-only.",
    owner: "operator",
    nextSafeAction: "Review stage summary lines without enabling execution stages.",
  },
  {
    checklistId: "evidence-packet-reviewed",
    label: "evidence packet reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "evidence packet state is preview-only",
    recoveryAction: "Keep the evidence packet preview-only and unpersisted.",
    owner: "operator",
    nextSafeAction: "Review evidence without creating a stored packet.",
  },
  {
    checklistId: "synthetic-execution-dependency-reviewed",
    label: "synthetic execution dependency reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic execution dependency remains bundled in memory only",
    recoveryAction: "Keep the execution dependency synthetic and deterministic.",
    owner: "operator",
    nextSafeAction: "Review execution dependency posture only.",
  },
  {
    checklistId: "synthetic-execution-result-reviewed",
    label: "synthetic execution result reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic execution result remains deterministic preview output only",
    recoveryAction: "Keep execution results detached from model output generation.",
    owner: "operator",
    nextSafeAction: "Review execution results without introducing model calls.",
  },
  {
    checklistId: "synthetic-result-capture-dependency-reviewed",
    label: "synthetic result capture dependency reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic result capture dependency remains bundled in memory only",
    recoveryAction: "Keep result capture dependency synthetic and deterministic.",
    owner: "operator",
    nextSafeAction: "Review result capture dependency posture only.",
  },
  {
    checklistId: "synthetic-result-capture-output-reviewed",
    label: "synthetic result capture output reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic result capture output remains preview-only",
    recoveryAction: "Keep capture output detached from persistence.",
    owner: "operator",
    nextSafeAction: "Review capture output without enabling storage.",
  },
  {
    checklistId: "synthetic-audit-join-dependency-reviewed",
    label: "synthetic audit join dependency reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic audit join dependency remains bundled in memory only",
    recoveryAction: "Keep audit join dependency synthetic and deterministic.",
    owner: "operator",
    nextSafeAction: "Review audit join dependency posture only.",
  },
  {
    checklistId: "synthetic-audit-join-output-reviewed",
    label: "synthetic audit join output reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic audit join output remains preview-only",
    recoveryAction: "Keep audit join output detached from audit persistence.",
    owner: "operator",
    nextSafeAction: "Review audit join output without persistence.",
  },
  {
    checklistId: "synthetic-approval-join-dependency-reviewed",
    label: "synthetic approval join dependency reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic approval join dependency remains bundled in memory only",
    recoveryAction: "Keep approval join dependency synthetic and deterministic.",
    owner: "operator",
    nextSafeAction: "Review approval join dependency posture only.",
  },
  {
    checklistId: "synthetic-approval-join-output-reviewed",
    label: "synthetic approval join output reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic approval join output remains preview-only",
    recoveryAction: "Keep approval join output detached from approval persistence.",
    owner: "operator",
    nextSafeAction: "Review approval join output without persistence.",
  },
  {
    checklistId: "manual-approval-fixture-reviewed",
    label: "manual approval fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "approval fixture is preview-only",
    recoveryAction: "Keep approval review fixture-only.",
    owner: "operator",
    nextSafeAction: "Do not convert approval preview into a live request.",
  },
  {
    checklistId: "manual-confirmation-fixture-reviewed",
    label: "manual confirmation fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "manual confirmation fixture is preview-only",
    recoveryAction: "Keep manual confirmation synthetic and unrecorded.",
    owner: "operator",
    nextSafeAction: "Do not record confirmation state.",
  },
  {
    checklistId: "kill-switch-fixture-reviewed",
    label: "kill switch fixture reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired: "kill switch required",
    recoveryAction: "Keep kill switch posture present as a fixture-only requirement.",
    owner: "safety review",
    nextSafeAction: "Confirm kill switch posture stays visible and inactive.",
  },
  {
    checklistId: "deterministic-packet-reviewed",
    label: "deterministic packet reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "deterministic synthetic end-to-end packet only",
    recoveryAction: "Preserve deterministic packet ids and digest posture.",
    owner: "operator",
    nextSafeAction: "Keep packet identifiers preview-only.",
  },
  {
    checklistId: "in-memory-only-packet-reviewed",
    label: "in-memory-only packet reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic end-to-end packet is produced in memory only",
    recoveryAction: "Keep the packet and its references in memory only.",
    owner: "operator",
    nextSafeAction: "Do not add persistence targets to the packet path.",
  },
  {
    checklistId: "blocked-live-persistence-summary-reviewed",
    label: "blocked live persistence summary reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "blocked live persistence summary remains present",
    recoveryAction: "Keep the blocked live persistence summary visible.",
    owner: "operator",
    nextSafeAction: "Carry blocked persistence evidence into the next batch.",
  },
  {
    checklistId: "provider-boundary-reviewed",
    label: "provider boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no provider execution",
    recoveryAction: "Do not import provider SDKs or connect provider execution.",
    owner: "backend future",
    nextSafeAction: "Hold provider execution out of scope until the server-only text model adapter exists.",
  },
  {
    checklistId: "prompt-boundary-reviewed",
    label: "prompt boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no prompt sending",
    recoveryAction: "Keep prompt sending unimplemented.",
    owner: "backend future",
    nextSafeAction: "Leave prompt payloads absent from the review layer.",
  },
  {
    checklistId: "model-boundary-reviewed",
    label: "model boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no LLM/model calls",
    recoveryAction: "Keep model invocation blocked.",
    owner: "backend future",
    nextSafeAction: "Do not add model output generation to the review layer.",
  },
  {
    checklistId: "frontend-request-boundary-reviewed",
    label: "frontend request boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no frontend request is created",
    recoveryAction: "Keep the chat input inert and local only.",
    owner: "backend future",
    nextSafeAction: "Do not add a client request surface.",
  },
  {
    checklistId: "api-route-boundary-reviewed",
    label: "API route boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no API route is created",
    recoveryAction: "Do not expose the packet helper through an API route.",
    owner: "backend future",
    nextSafeAction: "Leave API route creation for a future backend-only batch.",
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
    recoveryAction: "Do not persist result references.",
    owner: "backend future",
    nextSafeAction: "Keep result references preview-only until backend persistence exists.",
  },
  {
    checklistId: "audit-persistence-still-blocked",
    label: "audit persistence still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no audit persistence",
    recoveryAction: "Do not persist audit references.",
    owner: "backend future",
    nextSafeAction: "Keep audit references preview-only until backend persistence exists.",
  },
  {
    checklistId: "approval-persistence-still-blocked",
    label: "approval persistence still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no approval persistence",
    recoveryAction: "Do not persist approval references.",
    owner: "backend future",
    nextSafeAction: "Keep approval references preview-only until backend persistence exists.",
  },
  {
    checklistId: "database-writes-still-blocked",
    label: "database writes still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no database writes",
    recoveryAction: "Keep database writes absent.",
    owner: "backend future",
    nextSafeAction: "Do not introduce database writes into the review layer.",
  },
  {
    checklistId: "file-writes-still-blocked",
    label: "file writes still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no file writes",
    recoveryAction: "Keep file writes absent.",
    owner: "backend future",
    nextSafeAction: "Do not introduce file writes into the review layer.",
  },
] as const;

function buildRecoveryPlanRecord(
  review: BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord
): SyntheticEndToEndPacketRecoveryPlanPreviewRecord {
  return {
    id: review.id,
    key: buildStableSyntheticEndToEndPacketRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-recovery-plan-preview-v1",
    endToEndPacketReviewId: review.id,
    recoveryPosture: RECOVERY_POSTURE,
    serverOnlyPacketHelperRecovery:
      "Keep the server-only synthetic end-to-end packet helper deterministic, review-safe, and in-memory only.",
    syntheticEndToEndPacketInputRecovery:
      "Keep the packet input typed, deterministic, and detached from frontend requests and API routes.",
    packetOutputRecovery:
      "Keep packet output preview-only and never treat it as provider output or a real model result.",
    packetEnvelopeRecovery:
      "Keep the packet envelope limited to synthetic references and blocked live actions.",
    packetStageSummaryRecovery:
      "Keep stage summary static, deterministic, and review-only.",
    executionDependencyRecovery:
      "Keep the execution dependency synthetic, in-memory only, and provider-free.",
    resultCaptureDependencyRecovery:
      "Keep the result capture dependency synthetic, in-memory only, and unpersisted.",
    auditJoinDependencyRecovery:
      "Keep the audit join dependency synthetic, in-memory only, and unpersisted.",
    approvalJoinDependencyRecovery:
      "Keep the approval join dependency synthetic, in-memory only, and unpersisted.",
    auditPreviewRecovery:
      "Keep audit preview review-only and disconnected from audit persistence.",
    approvalPreviewRecovery:
      "Keep approval preview review-only and disconnected from approval persistence.",
    evidencePacketRecovery:
      "Keep the evidence packet preview-only and deterministic.",
    providerBoundaryRecovery:
      "Do not import provider SDKs or connect provider execution.",
    promptBoundaryRecovery:
      "Keep prompt sending unimplemented.",
    modelBoundaryRecovery:
      "Keep model output generation blocked.",
    frontendRequestBoundaryRecovery:
      "Do not create a frontend request path for the packet review.",
    apiRouteBoundaryRecovery:
      "Do not create an API route for the packet helper.",
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
      "Keep database write targets absent.",
    fileWriteBlockedRecovery:
      "Keep file write targets absent.",
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    operatorActionRequired:
      `Review ${review.requestLabel} manually and keep the packet review preview-only until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH} defines the next safe backend-only adapter boundary.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
    explicitNoRetryNoFallbackNoProviderNoPersistenceStatement:
      NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PERSISTENCE_STATEMENT,
  };
}

const RECOVERY_PLAN_PREVIEW_RECORDS = REVIEW_RECORDS.map(buildRecoveryPlanRecord);

function buildRecoveryReadinessChecklistRecord(
  review: BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord,
  seed: ReadinessChecklistSeed
): SyntheticEndToEndPacketRecoveryReadinessChecklistRecord {
  return {
    id: review.id,
    key: buildStableSyntheticEndToEndPacketRecoveryReadinessChecklistKey(
      review.id,
      seed.checklistId
    ),
    checklistVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-recovery-readiness-checklist-v1",
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    textModelAdapterMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

const RECOVERY_READINESS_CHECKLIST_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  READINESS_CHECKLIST_SEEDS.map((seed) =>
    buildRecoveryReadinessChecklistRecord(review, seed)
  )
);

function buildReviewGateSummary(reviewId: MinimalSyntheticEndToEndPacketReviewId): string {
  return ALL_GATE_FAILURE_REVIEW_RECORDS.filter(
    (record) => record.endToEndPacketReviewId === reviewId
  )
    .slice(0, 10)
    .map((record) => record.failedGateLabel)
    .join(" | ");
}

function buildReviewAuditSummaryRecord(
  review: BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord
): SyntheticEndToEndPacketReviewAuditSummaryRecord {
  const source = buildSourceBundle(review.id);

  return {
    id: review.id,
    key: buildStableSyntheticEndToEndPacketReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review-audit-summary-preview-v1",
    endToEndPacketReviewId: review.id,
    auditPosture: "preview-only",
    syntheticPacketReferenceState: "preview-only / not persisted",
    syntheticExecutionReferenceState: "preview-only / not persisted",
    syntheticCaptureReferenceState: "preview-only / not persisted",
    syntheticAuditReferenceState: "preview-only / not persisted",
    syntheticApprovalReferenceState: "preview-only / not persisted",
    evidencePacketState: "preview-only",
    serverOnlyPacketHelperEvidenceSummary:
      `${review.requestLabel} keeps the packet helper confined to a backend-owned server-only path.`,
    deterministicPacketEvidenceSummary:
      `${review.requestLabel} preserves deterministic preview-only execution, capture, audit join, approval join, packet id, and digest posture.`,
    stageSummary: source.packetStageSummaryRecord.summaryLines.join(" | "),
    failedGateSummary: buildReviewGateSummary(review.id),
    recoverySummary:
      "manual review only | retry disabled | fallback disabled | no provider execution | no persistence",
    blockedActionSummary:
      "no prompt sending | no model calls | no provider execution | no real approval recording | no result persistence | no audit persistence | no approval persistence | no database write | no file write",
    noProviderOutputStatement: "No provider output.",
    noModelOutputStatement: "No model output.",
    noPromptSendingStatement: "No prompt sending.",
    noResultPersistenceStatement: "No result persistence.",
    noAuditPersistenceStatement: "No audit persistence.",
    noApprovalPersistenceStatement: "No approval persistence.",
    noDatabaseWriteStatement: "No database write.",
    noFileWriteStatement: "No file write.",
    textModelAdapterMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
  };
}

const REVIEW_AUDIT_SUMMARY_RECORDS = REVIEW_RECORDS.map(
  buildReviewAuditSummaryRecord
);

function buildAcceptancePostureRecord(
  review: BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord
): SyntheticEndToEndPacketAcceptancePostureRecord {
  return {
    id: review.id,
    key: buildStableSyntheticEndToEndPacketAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-acceptance-posture-preview-v1",
    endToEndPacketReviewId: review.id,
    acceptanceState: ACCEPTANCE_STATE,
    syntheticOnlyAcceptanceSummary:
      `${review.requestLabel} is accepted only as a deterministic synthetic end-to-end packet review preview.`,
    backendOnlyAcceptanceSummary:
      "Backend-only acceptance is limited to server-side preview helpers and typed review records.",
    inMemoryOnlyAcceptanceSummary:
      "In-memory-only acceptance is limited to deterministic preview references and evidence.",
    executionCaptureAuditApprovalBundleAcceptanceSummary:
      "Execution, capture, audit join, and approval join are accepted only as a bundled synthetic in-memory fixture set.",
    providerBlockers: [
      "no provider SDK imports",
      "no provider execution",
      "not provider-capable",
    ],
    promptBlockers: ["no prompt sending", "no frontend request", "no API route"],
    modelBlockers: ["no model calls", "no model output", "no provider response"],
    queueWorkerJobBlockers: [
      "no queue dispatch",
      "no worker dispatch",
      "no job execution",
    ],
    resultPersistenceBlockers: [
      "no result persistence",
      "result reference is preview-only / not persisted",
    ],
    auditPersistenceBlockers: [
      "no audit persistence",
      "audit reference is preview-only / not persisted",
    ],
    approvalPersistenceBlockers: [
      "no approval persistence",
      "approval reference is preview-only / not persisted",
    ],
    databaseFileBlockers: ["no database writes", "no file writes"],
    approvalBlockers: [
      "no real approval request",
      "no real approval recording",
      "approval token is not issued",
      "approval lease is not created",
    ],
    auditBlockers: [
      "audit preview is preview-only",
      "evidence packet is preview-only",
      "live audit persistence blocked",
    ],
    requiredEvidence: [
      "server-only synthetic end-to-end packet helper exists",
      "synthetic end-to-end packet is produced in memory only",
      "deterministic synthetic end-to-end packet only",
      "synthetic execution, capture, audit join, and approval join are bundled in memory only",
      "approval fixture is preview-only",
      "manual confirmation fixture is preview-only",
      "blocked live persistence summary remains present",
    ],
    nextSafeAction:
      `Keep ${review.requestLabel} accepted only for synthetic preview review and move the next safe implementation step to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH}.`,
    explicitSyntheticPacketAcceptedLiveExecutionNotAcceptedStatement:
      ACCEPTANCE_STATEMENT,
  };
}

const ACCEPTANCE_POSTURE_RECORDS = REVIEW_RECORDS.map(
  buildAcceptancePostureRecord
);

function groupReviewRecordsByCapabilityFamily(
  records: readonly BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord[]
): readonly SyntheticEndToEndPacketReviewCapabilityFamilyGroup[] {
  const groups = new Map<
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["selectedCapabilityFamily"]["id"],
    {
      capabilityFamilyId: BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["selectedCapabilityFamily"]["id"];
      capabilityFamilyLabel: BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["selectedCapabilityFamily"]["label"];
      reviews: BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord[];
    }
  >();

  records.forEach((review) => {
    const existing = groups.get(review.selectedCapabilityFamily.id);
    if (existing) {
      existing.reviews.push(review);
      return;
    }

    groups.set(review.selectedCapabilityFamily.id, {
      capabilityFamilyId: review.selectedCapabilityFamily.id,
      capabilityFamilyLabel: review.selectedCapabilityFamily.label,
      reviews: [review],
    });
  });

  return Array.from(groups.values()).map((value) => ({
    capabilityFamilyId: value.capabilityFamilyId,
    capabilityFamilyLabel: value.capabilityFamilyLabel,
    reviewCount: value.reviews.length,
    reviews: cloneList(value.reviews),
  }));
}

function groupReviewRecordsByWorkspaceTarget(
  records: readonly BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord[]
): readonly SyntheticEndToEndPacketReviewWorkspaceGroup[] {
  const groups = new Map<
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord["workspaceTarget"],
    BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord[]
  >();

  records.forEach((review) => {
    const existing = groups.get(review.workspaceTarget) ?? [];
    existing.push(review);
    groups.set(review.workspaceTarget, existing);
  });

  return Array.from(groups.entries()).map(([workspaceTarget, reviews]) => ({
    workspaceTarget,
    reviewCount: reviews.length,
    reviews: cloneList(reviews),
  }));
}

export function listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews(): readonly BackendOwnedMinimalManualGatedSyntheticEndToEndPacketReviewRecord[] {
  return cloneList(REVIEW_RECORDS);
}

export function listSyntheticEndToEndPacketOutputReviewRecords(): readonly SyntheticEndToEndPacketOutputReviewRecord[] {
  return cloneList(OUTPUT_REVIEW_RECORDS);
}

export function listSyntheticEndToEndPacketGateFailureReviewRecords(): readonly SyntheticEndToEndPacketGateFailureReviewRecord[] {
  return cloneList(ALL_GATE_FAILURE_REVIEW_RECORDS);
}

export function listSyntheticEndToEndPacketRecoveryPlanPreviews(): readonly SyntheticEndToEndPacketRecoveryPlanPreviewRecord[] {
  return cloneList(RECOVERY_PLAN_PREVIEW_RECORDS);
}

export function listSyntheticEndToEndPacketRecoveryReadinessChecklistRecords(): readonly SyntheticEndToEndPacketRecoveryReadinessChecklistRecord[] {
  return cloneList(RECOVERY_READINESS_CHECKLIST_RECORDS);
}

export function listSyntheticEndToEndPacketReviewAuditSummaries(): readonly SyntheticEndToEndPacketReviewAuditSummaryRecord[] {
  return cloneList(REVIEW_AUDIT_SUMMARY_RECORDS);
}

export function listSyntheticEndToEndPacketAcceptancePostureRecords(): readonly SyntheticEndToEndPacketAcceptancePostureRecord[] {
  return cloneList(ACCEPTANCE_POSTURE_RECORDS);
}

export function groupSyntheticEndToEndPacketReviewsByCapabilityFamily(): readonly SyntheticEndToEndPacketReviewCapabilityFamilyGroup[] {
  return groupReviewRecordsByCapabilityFamily(REVIEW_RECORDS);
}

export function groupSyntheticEndToEndPacketReviewsByWorkspaceTarget(): readonly SyntheticEndToEndPacketReviewWorkspaceGroup[] {
  return groupReviewRecordsByWorkspaceTarget(REVIEW_RECORDS);
}

export function buildSyntheticEndToEndPacketReviewSummary(): SyntheticEndToEndPacketReviewSummary {
  const capabilityGroups =
    groupSyntheticEndToEndPacketReviewsByCapabilityFamily();
  const workspaceGroups = groupSyntheticEndToEndPacketReviewsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
    reviewCount: REVIEW_RECORDS.length,
    outputReviewCount: OUTPUT_REVIEW_RECORDS.length,
    gateFailureCount: ALL_GATE_FAILURE_REVIEW_RECORDS.length,
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

export function buildSyntheticEndToEndPacketOutputReviewSummary(): SyntheticEndToEndPacketOutputReviewSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
    outputReviewCount: OUTPUT_REVIEW_RECORDS.length,
    summaryLines: cloneList(OUTPUT_REVIEW_SUMMARY_LINES),
    nextSafeAction:
      `Keep synthetic end-to-end packet output review preview-only until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH}.`,
  };
}

export function buildSyntheticEndToEndPacketGateFailureSummary(): SyntheticEndToEndPacketGateFailureSummary {
  const topFailedGateLabels = Array.from(
    new Set(ALL_GATE_FAILURE_REVIEW_RECORDS.map((record) => record.failedGateLabel))
  );

  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
    gateFailureCount: ALL_GATE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    topFailedGateLabels: cloneList(topFailedGateLabels),
    nextSafeAction:
      `Keep live gate pass blocked and carry failure evidence into ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH}.`,
  };
}

export function buildSyntheticEndToEndPacketRecoverySummary(): SyntheticEndToEndPacketRecoverySummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextSafeAction:
      `Keep recovery manual-review-only and move safe backend-owned expansion to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_TEXT_MODEL_ADAPTER_MVP_BATCH}.`,
  };
}

export function buildMinimalTextModelAdapterMvpChecklist(): MinimalTextModelAdapterMvpChecklist {
  return cloneList(MINIMAL_TEXT_MODEL_ADAPTER_MVP_CHECKLIST);
}

export function buildUniqueMinimalSyntheticEndToEndPacketReviewDisplayStrings(
  values?: readonly string[]
): MinimalSyntheticEndToEndPacketReviewDisplayStrings {
  const items =
    values && values.length > 0
      ? values
      : [
          ...REVIEW_SUMMARY_LINES,
          ...OUTPUT_REVIEW_SUMMARY_LINES,
          ...GATE_FAILURE_SUMMARY_LINES,
          ...RECOVERY_SUMMARY_LINES,
        ];

  return cloneList(Array.from(new Set(items)));
}
