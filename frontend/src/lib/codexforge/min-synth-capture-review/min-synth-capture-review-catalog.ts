import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews,
  listSyntheticExecutionResultReviewRecords,
} from "../minimal-synth-exec-review";
import {
  listMinimalManualGatedSyntheticDryRunResultCaptureMvpRecords,
  listSyntheticResultCaptureAdmissionChecks,
  listSyntheticResultCaptureApprovalPreviews,
  listSyntheticResultCaptureAuditPreviews,
  listSyntheticResultCaptureBlockedLivePersistenceSummaries,
  listSyntheticResultCaptureEnvelopes,
  listSyntheticResultCaptureEvidencePackets,
  listSyntheticResultCaptureGates,
  listSyntheticResultCaptureInputs,
  listSyntheticResultCaptureOutputs,
  listSyntheticResultCaptureSafetyGateSummaries,
  type MinimalManualGatedSyntheticDryRunResultCaptureMvpId,
  type MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord,
  type SyntheticResultCaptureAdmissionCheckRecord,
  type SyntheticResultCaptureApprovalPreviewRecord,
  type SyntheticResultCaptureAuditPreviewRecord,
  type SyntheticResultCaptureBlockedLivePersistenceSummaryRecord,
  type SyntheticResultCaptureEnvelopeRecord,
  type SyntheticResultCaptureEvidencePacketRecord,
  type SyntheticResultCaptureGateId,
  type SyntheticResultCaptureGateRecord,
  type SyntheticResultCaptureInputRecord,
  type SyntheticResultCaptureOutputRecord,
  type SyntheticResultCaptureSafetyGateSummaryRecord,
} from "../min-synth-result-capture";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
  type BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord,
  type MinimalAuditAndApprovalJoinMvpChecklist,
  type MinimalSyntheticResultCaptureAcceptancePostureKey,
  type MinimalSyntheticResultCaptureAcceptanceStatement,
  type MinimalSyntheticResultCaptureFallbackPosture,
  type MinimalSyntheticResultCaptureGateFailureReviewKey,
  type MinimalSyntheticResultCaptureGateFailureReviewVersion,
  type MinimalSyntheticResultCaptureNoLiveGatePassStatement,
  type MinimalSyntheticResultCaptureNoRetryNoFallbackNoProviderNoPersistenceStatement,
  type MinimalSyntheticResultCaptureOutputOnlyStatement,
  type MinimalSyntheticResultCaptureOutputReviewKey,
  type MinimalSyntheticResultCaptureOutputReviewVersion,
  type MinimalSyntheticResultCapturePreviewOnlyStatement,
  type MinimalSyntheticResultCaptureRecoveryPlanKey,
  type MinimalSyntheticResultCaptureRecoveryPlanVersion,
  type MinimalSyntheticResultCaptureRecoveryReadinessChecklistId,
  type MinimalSyntheticResultCaptureRecoveryReadinessChecklistKey,
  type MinimalSyntheticResultCaptureRecoveryReadinessChecklistLabel,
  type MinimalSyntheticResultCaptureRecoveryReadinessChecklistVersion,
  type MinimalSyntheticResultCaptureRecoveryPosture,
  type MinimalSyntheticResultCaptureRetryPosture,
  type MinimalSyntheticResultCaptureReviewAuditSummaryKey,
  type MinimalSyntheticResultCaptureReviewAuditSummaryVersion,
  type MinimalSyntheticResultCaptureReviewCurrentReadiness,
  type MinimalSyntheticResultCaptureReviewDisplayStrings,
  type MinimalSyntheticResultCaptureReviewId,
  type MinimalSyntheticResultCaptureReviewKey,
  type MinimalSyntheticResultCaptureReviewMode,
  type MinimalSyntheticResultCaptureReviewPosture,
  type MinimalSyntheticResultCaptureReviewSeverity,
  type MinimalSyntheticResultCaptureReviewSource,
  type MinimalSyntheticResultCaptureReviewVersion,
  type SyntheticResultCaptureAcceptancePostureRecord,
  type SyntheticResultCaptureGateFailureReviewRecord,
  type SyntheticResultCaptureGateFailureSummary,
  type SyntheticResultCaptureOutputReviewRecord,
  type SyntheticResultCaptureOutputReviewSummary,
  type SyntheticResultCaptureRecoveryPlanPreviewRecord,
  type SyntheticResultCaptureRecoveryReadinessChecklistRecord,
  type SyntheticResultCaptureRecoverySummary,
  type SyntheticResultCaptureReviewAuditSummaryRecord,
  type SyntheticResultCaptureReviewCapabilityFamilyGroup,
  type SyntheticResultCaptureReviewSummary,
  type SyntheticResultCaptureReviewWorkspaceGroup,
} from "./min-synth-capture-review-types";

type GateFailureSeed = Readonly<{
  gateId: SyntheticResultCaptureGateId;
  severity: MinimalSyntheticResultCaptureReviewSeverity;
  gateState: string;
  operatorFacingExplanation: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

type ReadinessChecklistSeed = Readonly<{
  checklistId: MinimalSyntheticResultCaptureRecoveryReadinessChecklistId;
  label: MinimalSyntheticResultCaptureRecoveryReadinessChecklistLabel;
  state: SyntheticResultCaptureRecoveryReadinessChecklistRecord["state"];
  severity: MinimalSyntheticResultCaptureReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: SyntheticResultCaptureRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const CURRENT_READINESS: MinimalSyntheticResultCaptureReviewCurrentReadiness =
  "minimal-synthetic-result-capture-review-only / backend-only / in-memory-only / not provider-capable / not persistent";

const REVIEW_SOURCE: MinimalSyntheticResultCaptureReviewSource =
  "Athena / Jarvis Model Gateway";
const REVIEW_MODE: MinimalSyntheticResultCaptureReviewMode = "preview-only";
const REVIEW_POSTURE: MinimalSyntheticResultCaptureReviewPosture =
  "minimal synthetic result capture review / backend-only / in-memory-only / not provider-capable / not persistent";
const PREVIEW_ONLY_STATEMENT: MinimalSyntheticResultCapturePreviewOnlyStatement =
  "minimal synthetic result capture review is preview-only";
const OUTPUT_ONLY_STATEMENT: MinimalSyntheticResultCaptureOutputOnlyStatement =
  "Synthetic capture only. No real output. No persistence.";
const NO_LIVE_GATE_PASS_STATEMENT: MinimalSyntheticResultCaptureNoLiveGatePassStatement =
  "No live gate pass.";
const NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PERSISTENCE_STATEMENT: MinimalSyntheticResultCaptureNoRetryNoFallbackNoProviderNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No persistence.";
const ACCEPTANCE_STATEMENT: MinimalSyntheticResultCaptureAcceptanceStatement =
  "Synthetic capture MVP accepted only. Live persistence not accepted.";
const RECOVERY_POSTURE: MinimalSyntheticResultCaptureRecoveryPosture =
  "manual review only";
const RETRY_POSTURE: MinimalSyntheticResultCaptureRetryPosture = "disabled";
const FALLBACK_POSTURE: MinimalSyntheticResultCaptureFallbackPosture =
  "disabled";

const REVIEW_SUMMARY_LINES = [
  "backend-owned minimal manual-gated synthetic dry-run result capture review and recovery preview only",
  "minimal synthetic result capture review is preview-only",
  "server-only synthetic result capture helper exists",
  "synthetic result capture is produced in memory only",
  "deterministic synthetic capture only",
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
  "acceptance state is not accepted for live persistence / synthetic capture MVP accepted only",
  "backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP next",
] as const;

const OUTPUT_REVIEW_SUMMARY_LINES = [
  "synthetic result capture output review is preview-only",
  "capture state: captured-synthetic-in-memory-only",
  "capture id posture: deterministic preview id only",
  "result id posture: deterministic preview id only",
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
  "synthetic-only capture mode",
  "manual approval fixture",
  "manual confirmation fixture",
  "synthetic execution result present",
  "deterministic capture id",
  "deterministic digest",
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
] as const;

const RECOVERY_SUMMARY_LINES = [
  "synthetic result capture recovery plan is preview-only",
  "synthetic result capture recovery readiness is preview-only",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "server-only capture helper recovery",
  "synthetic result capture input recovery",
  "synthetic result capture output recovery",
  "capture envelope recovery",
  "audit preview recovery",
  "approval preview recovery",
  "evidence packet recovery",
  "provider boundary recovery",
  "prompt boundary recovery",
  "model boundary recovery",
  "frontend request boundary recovery",
  "API route boundary recovery",
  "queue/worker/job blocked recovery",
  "result/audit/approval persistence recovery",
  "database/file write blocked recovery",
  "backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP next",
  NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PERSISTENCE_STATEMENT,
] as const;

const MINIMAL_AUDIT_AND_APPROVAL_JOIN_MVP_CHECKLIST = [
  "Review synthetic capture references, audit preview references, approval preview references, and evidence packet references before joining them.",
  "Keep the join MVP backend-owned, preview-safe, deterministic, in-memory only, and non-persistent.",
  "Do not create a frontend request, API route, provider/model path, queue, worker, job, database write, or file write when the join MVP is added.",
  "Preserve preview-only approval fixtures, preview-only manual confirmation fixtures, and blocked approval token and lease paths.",
  "Carry forward no prompt sending, no provider execution, no result persistence, no audit persistence, and no approval persistence posture.",
] as const;

const RESULT_CAPTURE_MVP_RECORDS =
  listMinimalManualGatedSyntheticDryRunResultCaptureMvpRecords();
const RESULT_CAPTURE_INPUTS = listSyntheticResultCaptureInputs();
const RESULT_CAPTURE_ADMISSION_CHECKS = listSyntheticResultCaptureAdmissionChecks();
const RESULT_CAPTURE_OUTPUTS = listSyntheticResultCaptureOutputs();
const RESULT_CAPTURE_ENVELOPES = listSyntheticResultCaptureEnvelopes();
const RESULT_CAPTURE_AUDIT_PREVIEWS = listSyntheticResultCaptureAuditPreviews();
const RESULT_CAPTURE_APPROVAL_PREVIEWS =
  listSyntheticResultCaptureApprovalPreviews();
const RESULT_CAPTURE_EVIDENCE_PACKETS = listSyntheticResultCaptureEvidencePackets();
const RESULT_CAPTURE_SAFETY_GATE_SUMMARIES =
  listSyntheticResultCaptureSafetyGateSummaries();
const RESULT_CAPTURE_BLOCKED_LIVE_PERSISTENCE_SUMMARIES =
  listSyntheticResultCaptureBlockedLivePersistenceSummaries();
const RESULT_CAPTURE_GATES = listSyntheticResultCaptureGates();
const EXECUTION_REVIEWS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews();
const EXECUTION_RESULT_REVIEWS = listSyntheticExecutionResultReviewRecords();
const MANUAL_APPROVAL_DECISION_REVIEWS =
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews();

function cloneList<T>(items: readonly T[]): readonly T[] {
  return [...items];
}

function resolveRequiredRecord<T>(value: T | undefined, message: string): T {
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

function buildMapByResultCaptureId<T extends Readonly<{ resultCaptureMvpId: string }>>(
  items: readonly T[]
): ReadonlyMap<T["resultCaptureMvpId"], T> {
  return new Map(items.map((item) => [item.resultCaptureMvpId, item] as const));
}

function buildMapByExecutionReviewId<
  T extends Readonly<{ executionReviewId: string }>
>(items: readonly T[]): ReadonlyMap<T["executionReviewId"], T> {
  return new Map(items.map((item) => [item.executionReviewId, item] as const));
}

function buildGateMapByReviewId(
  items: readonly SyntheticResultCaptureGateRecord[]
): ReadonlyMap<MinimalSyntheticResultCaptureReviewId, readonly SyntheticResultCaptureGateRecord[]> {
  const gateMap = new Map<
    MinimalSyntheticResultCaptureReviewId,
    SyntheticResultCaptureGateRecord[]
  >();

  items.forEach((item) => {
    const records = gateMap.get(item.resultCaptureMvpId) ?? [];
    records.push(item);
    gateMap.set(item.resultCaptureMvpId, records);
  });

  return gateMap;
}

const RESULT_CAPTURE_MVP_RECORDS_BY_ID = buildMapById(RESULT_CAPTURE_MVP_RECORDS);
const RESULT_CAPTURE_INPUTS_BY_ID = buildMapByResultCaptureId(RESULT_CAPTURE_INPUTS);
const RESULT_CAPTURE_ADMISSION_CHECKS_BY_ID = buildMapByResultCaptureId(
  RESULT_CAPTURE_ADMISSION_CHECKS
);
const RESULT_CAPTURE_OUTPUTS_BY_ID = buildMapByResultCaptureId(RESULT_CAPTURE_OUTPUTS);
const RESULT_CAPTURE_ENVELOPES_BY_ID = buildMapByResultCaptureId(
  RESULT_CAPTURE_ENVELOPES
);
const RESULT_CAPTURE_AUDIT_PREVIEWS_BY_ID = buildMapByResultCaptureId(
  RESULT_CAPTURE_AUDIT_PREVIEWS
);
const RESULT_CAPTURE_APPROVAL_PREVIEWS_BY_ID = buildMapByResultCaptureId(
  RESULT_CAPTURE_APPROVAL_PREVIEWS
);
const RESULT_CAPTURE_EVIDENCE_PACKETS_BY_ID = buildMapByResultCaptureId(
  RESULT_CAPTURE_EVIDENCE_PACKETS
);
const RESULT_CAPTURE_SAFETY_GATE_SUMMARIES_BY_ID = buildMapByResultCaptureId(
  RESULT_CAPTURE_SAFETY_GATE_SUMMARIES
);
const RESULT_CAPTURE_BLOCKED_LIVE_PERSISTENCE_SUMMARIES_BY_ID =
  buildMapByResultCaptureId(RESULT_CAPTURE_BLOCKED_LIVE_PERSISTENCE_SUMMARIES);
const RESULT_CAPTURE_GATES_BY_ID = buildGateMapByReviewId(RESULT_CAPTURE_GATES);
const EXECUTION_REVIEWS_BY_ID = buildMapById(EXECUTION_REVIEWS);
const EXECUTION_RESULT_REVIEWS_BY_ID = buildMapByExecutionReviewId(
  EXECUTION_RESULT_REVIEWS
);
const MANUAL_APPROVAL_DECISION_REVIEWS_BY_ID = buildMapById(
  MANUAL_APPROVAL_DECISION_REVIEWS
);

function resolveResultCaptureMvp(
  id: MinimalSyntheticResultCaptureReviewId
): MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord {
  return resolveRequiredRecord(
    RESULT_CAPTURE_MVP_RECORDS_BY_ID.get(id),
    `Missing result capture MVP record for ${id}.`
  );
}

function resolveInput(
  id: MinimalSyntheticResultCaptureReviewId
): SyntheticResultCaptureInputRecord {
  return resolveRequiredRecord(
    RESULT_CAPTURE_INPUTS_BY_ID.get(id),
    `Missing result capture input for ${id}.`
  );
}

function resolveAdmissionCheck(
  id: MinimalSyntheticResultCaptureReviewId
): SyntheticResultCaptureAdmissionCheckRecord {
  return resolveRequiredRecord(
    RESULT_CAPTURE_ADMISSION_CHECKS_BY_ID.get(id),
    `Missing result capture admission check for ${id}.`
  );
}

function resolveOutput(
  id: MinimalSyntheticResultCaptureReviewId
): SyntheticResultCaptureOutputRecord {
  return resolveRequiredRecord(
    RESULT_CAPTURE_OUTPUTS_BY_ID.get(id),
    `Missing result capture output for ${id}.`
  );
}

function resolveEnvelope(
  id: MinimalSyntheticResultCaptureReviewId
): SyntheticResultCaptureEnvelopeRecord {
  return resolveRequiredRecord(
    RESULT_CAPTURE_ENVELOPES_BY_ID.get(id),
    `Missing result capture envelope for ${id}.`
  );
}

function resolveAuditPreview(
  id: MinimalSyntheticResultCaptureReviewId
): SyntheticResultCaptureAuditPreviewRecord {
  return resolveRequiredRecord(
    RESULT_CAPTURE_AUDIT_PREVIEWS_BY_ID.get(id),
    `Missing result capture audit preview for ${id}.`
  );
}

function resolveApprovalPreview(
  id: MinimalSyntheticResultCaptureReviewId
): SyntheticResultCaptureApprovalPreviewRecord {
  return resolveRequiredRecord(
    RESULT_CAPTURE_APPROVAL_PREVIEWS_BY_ID.get(id),
    `Missing result capture approval preview for ${id}.`
  );
}

function resolveEvidencePacket(
  id: MinimalSyntheticResultCaptureReviewId
): SyntheticResultCaptureEvidencePacketRecord {
  return resolveRequiredRecord(
    RESULT_CAPTURE_EVIDENCE_PACKETS_BY_ID.get(id),
    `Missing result capture evidence packet for ${id}.`
  );
}

function resolveSafetyGateSummary(
  id: MinimalSyntheticResultCaptureReviewId
): SyntheticResultCaptureSafetyGateSummaryRecord {
  return resolveRequiredRecord(
    RESULT_CAPTURE_SAFETY_GATE_SUMMARIES_BY_ID.get(id),
    `Missing result capture safety gate summary for ${id}.`
  );
}

function resolveBlockedLivePersistenceSummary(
  id: MinimalSyntheticResultCaptureReviewId
): SyntheticResultCaptureBlockedLivePersistenceSummaryRecord {
  return resolveRequiredRecord(
    RESULT_CAPTURE_BLOCKED_LIVE_PERSISTENCE_SUMMARIES_BY_ID.get(id),
    `Missing blocked live persistence summary for ${id}.`
  );
}

function resolveExecutionReview(id: MinimalSyntheticResultCaptureReviewId) {
  return resolveRequiredRecord(
    EXECUTION_REVIEWS_BY_ID.get(id),
    `Missing minimal synthetic execution review for ${id}.`
  );
}

function resolveExecutionResultReview(id: MinimalSyntheticResultCaptureReviewId) {
  return resolveRequiredRecord(
    EXECUTION_RESULT_REVIEWS_BY_ID.get(id),
    `Missing synthetic execution result review for ${id}.`
  );
}

function resolveManualApprovalDecisionReview(
  id: MinimalSyntheticResultCaptureReviewId
) {
  return resolveRequiredRecord(
    MANUAL_APPROVAL_DECISION_REVIEWS_BY_ID.get(id),
    `Missing manual approval decision review for ${id}.`
  );
}

function resolveGateRecord(
  reviewId: MinimalSyntheticResultCaptureReviewId,
  gateId: SyntheticResultCaptureGateId
): SyntheticResultCaptureGateRecord {
  const gates = resolveRequiredRecord(
    RESULT_CAPTURE_GATES_BY_ID.get(reviewId),
    `Missing result capture gates for ${reviewId}.`
  );

  return resolveRequiredRecord(
    gates.find((record) => record.gateId === gateId),
    `Missing result capture gate ${gateId} for ${reviewId}.`
  );
}

export function buildStableMinimalSyntheticResultCaptureReviewKey(
  id: MinimalSyntheticResultCaptureReviewId
): MinimalSyntheticResultCaptureReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review:${id}`;
}

export function buildStableSyntheticResultCaptureOutputReviewKey(
  id: MinimalSyntheticResultCaptureReviewId
): MinimalSyntheticResultCaptureOutputReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-output-review:${id}`;
}

export function buildStableSyntheticResultCaptureGateFailureReviewKey(
  id: MinimalSyntheticResultCaptureReviewId,
  gateId: SyntheticResultCaptureGateId
): MinimalSyntheticResultCaptureGateFailureReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-gate-failure-review:${id}:${gateId}`;
}

export function buildStableSyntheticResultCaptureRecoveryPlanKey(
  id: MinimalSyntheticResultCaptureReviewId
): MinimalSyntheticResultCaptureRecoveryPlanKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-recovery-plan:${id}`;
}

export function buildStableSyntheticResultCaptureRecoveryReadinessChecklistKey(
  id: MinimalSyntheticResultCaptureReviewId,
  checklistId: MinimalSyntheticResultCaptureRecoveryReadinessChecklistId
): MinimalSyntheticResultCaptureRecoveryReadinessChecklistKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-recovery-readiness:${id}:${checklistId}`;
}

export function buildStableSyntheticResultCaptureReviewAuditSummaryKey(
  id: MinimalSyntheticResultCaptureReviewId
): MinimalSyntheticResultCaptureReviewAuditSummaryKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review-audit-summary:${id}`;
}

export function buildStableSyntheticResultCaptureAcceptancePostureKey(
  id: MinimalSyntheticResultCaptureReviewId
): MinimalSyntheticResultCaptureAcceptancePostureKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-acceptance-posture:${id}`;
}

function buildReviewRecord(
  id: MinimalSyntheticResultCaptureReviewId
): BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord {
  const mvpRecord = resolveResultCaptureMvp(id);
  const input = resolveInput(id);
  const output = resolveOutput(id);
  const envelope = resolveEnvelope(id);
  const auditPreview = resolveAuditPreview(id);
  const approvalPreview = resolveApprovalPreview(id);
  const evidencePacket = resolveEvidencePacket(id);
  const safetyGateSummary = resolveSafetyGateSummary(id);
  const blockedSummary = resolveBlockedLivePersistenceSummary(id);
  const executionReview = resolveExecutionReview(id);
  const executionResultReview = resolveExecutionResultReview(id);
  const decisionReview = resolveManualApprovalDecisionReview(id);

  return {
    id,
    key: buildStableMinimalSyntheticResultCaptureReviewKey(id),
    reviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review-preview-v1",
    source: REVIEW_SOURCE,
    reviewMode: REVIEW_MODE,
    reviewPosture: REVIEW_POSTURE,
    previewOnlyStatement: PREVIEW_ONLY_STATEMENT,
    requestLabel: mvpRecord.requestLabel,
    label: `${mvpRecord.requestLabel} synthetic result capture review`,
    workspaceTarget: mvpRecord.workspaceTarget,
    sourceMinimalSyntheticResultCaptureMvpReference: mvpRecord.key,
    sourceSyntheticResultCaptureInputReference: input.key,
    sourceSyntheticResultCaptureOutputReference: output.key,
    sourceSyntheticResultCaptureEnvelopeReference: envelope.key,
    sourceSyntheticResultCaptureAuditPreviewReference: auditPreview.key,
    sourceSyntheticResultCaptureApprovalPreviewReference: approvalPreview.key,
    sourceSyntheticResultCaptureEvidencePacketReference: evidencePacket.key,
    sourceSyntheticResultCaptureSafetyGateSummaryReference:
      safetyGateSummary.key,
    sourceSyntheticResultCaptureBlockedLivePersistenceSummaryReference:
      blockedSummary.key,
    sourceMinimalSyntheticExecutionReviewReference: executionReview.key,
    sourceSyntheticExecutionResultReference:
      executionReview.sourceSyntheticMvpExecutionResultReference,
    sourceSyntheticExecutionResultReviewReference: executionResultReview.key,
    sourceManualApprovalDecisionReviewReference: decisionReview.key,
    selectedCapabilityFamily: { ...decisionReview.selectedCapabilityFamily },
    providerSlotLabel: decisionReview.providerSlotLabel,
    backupProviderSlotLabel: decisionReview.backupProviderSlotLabel,
    localPrivateAlternativeLabel: decisionReview.localPrivateAlternativeLabel,
    serverOnlyCaptureHelperState: "exists",
    syntheticResultCaptureState: output.captureState,
    deterministicCaptureState: "produced in memory only",
    frontendRequestState: input.frontendRequestState,
    apiRouteState: input.apiRouteState,
    providerResponseState: output.providerResponseState,
    modelOutputState: output.modelOutputState,
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
    approvalFixtureState: approvalPreview.approvalFixtureState,
    manualConfirmationFixtureState:
      approvalPreview.manualConfirmationFixtureState,
    approvalTokenState: approvalPreview.approvalTokenState,
    approvalLeaseState: approvalPreview.approvalLeaseState,
    auditPreviewState: "preview-only",
    approvalPreviewState: "preview-only",
    resultReferenceState: "preview-only / not persisted",
    evidencePacketState: evidencePacket.evidencePacketState,
    killSwitchState: "inactive fixture only",
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    nextAuditAndApprovalJoinMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    currentReadiness: CURRENT_READINESS,
  };
}

const REVIEW_RECORDS = RESULT_CAPTURE_MVP_RECORDS.map((record) =>
  buildReviewRecord(record.id)
);

const REVIEW_RECORDS_BY_ID = buildMapById(REVIEW_RECORDS);

function resolveReview(
  id: MinimalSyntheticResultCaptureReviewId
): BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord {
  return resolveRequiredRecord(
    REVIEW_RECORDS_BY_ID.get(id),
    `Missing result capture review for ${id}.`
  );
}

function buildOutputReviewRecord(
  review: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord
): SyntheticResultCaptureOutputReviewRecord {
  return {
    key: buildStableSyntheticResultCaptureOutputReviewKey(review.id),
    outputReviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-output-review-preview-v1",
    resultCaptureReviewId: review.id,
    sourceCaptureOutputReference:
      review.sourceSyntheticResultCaptureOutputReference,
    sourceCaptureEnvelopeReference:
      review.sourceSyntheticResultCaptureEnvelopeReference,
    captureState: "captured-synthetic-in-memory-only",
    captureIdPosture: "deterministic preview id only",
    resultIdPosture: "deterministic preview id only",
    digestPosture: "deterministic preview digest only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    outputClassification: "synthetic fixture only",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    operatorFacingExplanation:
      `${review.requestLabel} stays captured as a deterministic in-memory synthetic fixture only, so there is no provider response, model output, or persisted result to treat as a live artifact.`,
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
      `Keep ${review.requestLabel} output review preview-only until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH}.`,
    explicitSyntheticCaptureOnlyNoRealOutputNoPersistenceStatement:
      OUTPUT_ONLY_STATEMENT,
  };
}

const OUTPUT_REVIEW_RECORDS = REVIEW_RECORDS.map(buildOutputReviewRecord);

const GATE_FAILURE_SEEDS = new Map<SyntheticResultCaptureGateId, GateFailureSeed>(
  [
    [
      "backend-only-boundary",
      {
        gateId: "backend-only-boundary",
        severity: "critical",
        gateState: "backend-only boundary required",
        operatorFacingExplanation:
          "Result capture remains backend-only, which is why the new review layer can explain the posture without creating any frontend-callable execution path.",
        requiredRecoveryAction:
          "Keep result capture backend-owned and do not introduce frontend-callable capture execution.",
        nextSafeAction: "Keep the backend-only boundary intact.",
      },
    ],
    [
      "server-only-module-boundary",
      {
        gateId: "server-only-module-boundary",
        severity: "critical",
        gateState: "server-only capture helper boundary required",
        operatorFacingExplanation:
          "The server-only helper is intentionally isolated so the synthetic capture output can be reviewed without exposing a route, fetch path, or client import path.",
        requiredRecoveryAction:
          "Retain the server-only module boundary and do not export the helper to the frontend.",
        nextSafeAction: "Keep the server-only helper server-only.",
      },
    ],
    [
      "synthetic-only-capture-mode",
      {
        gateId: "synthetic-only-capture-mode",
        severity: "critical",
        gateState: "synthetic-only capture mode remains active",
        operatorFacingExplanation:
          "Capture remains deterministic and synthetic-only, so no real provider response or model output can exist.",
        requiredRecoveryAction:
          "Keep synthetic-only capture mode active until a later backend batch explicitly expands the contract.",
        nextSafeAction: "Do not replace the synthetic capture with live output.",
      },
    ],
    [
      "manual-approval-fixture",
      {
        gateId: "manual-approval-fixture",
        severity: "high",
        gateState: "manual approval fixture remains preview-only",
        operatorFacingExplanation:
          "Approval evidence is still a preview fixture, which keeps result capture synthetic-only and non-authoritative.",
        requiredRecoveryAction:
          "Keep the approval fixture preview-only and do not request a real approval.",
        nextSafeAction: "Do not create a real approval request.",
      },
    ],
    [
      "manual-confirmation-fixture",
      {
        gateId: "manual-confirmation-fixture",
        severity: "high",
        gateState: "manual confirmation fixture remains preview-only",
        operatorFacingExplanation:
          "Manual confirmation is still fixture-only, so no operator confirmation is captured or stored.",
        requiredRecoveryAction:
          "Preserve the manual confirmation fixture as preview-only evidence.",
        nextSafeAction: "Do not capture a real manual confirmation.",
      },
    ],
    [
      "synthetic-execution-result-present",
      {
        gateId: "synthetic-execution-result-present",
        severity: "high",
        gateState: "synthetic execution result fixture remains required",
        operatorFacingExplanation:
          "The capture output depends on a deterministic synthetic execution result rather than any provider-backed execution payload.",
        requiredRecoveryAction:
          "Keep the synthetic execution result dependency deterministic and in memory only.",
        nextSafeAction: "Do not swap the dependency to a live provider result.",
      },
    ],
    [
      "deterministic-capture-id",
      {
        gateId: "deterministic-capture-id",
        severity: "high",
        gateState: "deterministic capture id remains required",
        operatorFacingExplanation:
          "The capture id is deterministic preview-only evidence, which proves the review layer is still synthetic and inert.",
        requiredRecoveryAction:
          "Preserve deterministic capture id generation exactly as preview-only evidence.",
        nextSafeAction: "Do not introduce randomized capture ids.",
      },
    ],
    [
      "deterministic-digest",
      {
        gateId: "deterministic-digest",
        severity: "high",
        gateState: "deterministic digest remains required",
        operatorFacingExplanation:
          "The digest stays deterministic preview-only evidence instead of a live persisted integrity artifact.",
        requiredRecoveryAction:
          "Keep digest generation deterministic and preview-only.",
        nextSafeAction: "Do not introduce non-deterministic digests.",
      },
    ],
    [
      "in-memory-only-result-reference",
      {
        gateId: "in-memory-only-result-reference",
        severity: "critical",
        gateState: "in-memory-only result reference required",
        operatorFacingExplanation:
          "References remain preview-only and in memory only, so nothing becomes a durable result, audit, or approval join.",
        requiredRecoveryAction:
          "Retain the in-memory-only reference posture and avoid all persistence paths.",
        nextSafeAction: "Do not persist result references.",
      },
    ],
    [
      "no-real-approval-recording",
      {
        gateId: "no-real-approval-recording",
        severity: "critical",
        gateState: "real approval recording remains blocked",
        operatorFacingExplanation:
          "No approval recording exists or is persisted, which keeps the review layer synthetic-only and non-authoritative.",
        requiredRecoveryAction:
          "Do not add approval recording or approval persistence in this batch.",
        nextSafeAction: "Keep approval recording blocked.",
      },
    ],
    [
      "no-approval-token-issuance",
      {
        gateId: "no-approval-token-issuance",
        severity: "critical",
        gateState: "approval token issuance remains blocked",
        operatorFacingExplanation:
          "No approval token is issued, so the capture path cannot be mistaken for a live admitted flow.",
        requiredRecoveryAction:
          "Keep token issuance absent from the review and helper layers.",
        nextSafeAction: "Do not issue approval tokens.",
      },
    ],
    [
      "no-approval-lease-issuance",
      {
        gateId: "no-approval-lease-issuance",
        severity: "critical",
        gateState: "approval lease issuance remains blocked",
        operatorFacingExplanation:
          "No approval lease is created, which prevents any live execution-style unlock or temporal authority.",
        requiredRecoveryAction:
          "Keep approval lease creation absent.",
        nextSafeAction: "Do not create approval leases.",
      },
    ],
    [
      "no-frontend-request",
      {
        gateId: "no-frontend-request",
        severity: "critical",
        gateState: "frontend request remains absent",
        operatorFacingExplanation:
          "There is still no frontend request path, which is why the result capture path remains backend-only and inert.",
        requiredRecoveryAction:
          "Do not add any frontend request surface for synthetic capture.",
        nextSafeAction: "Keep frontend request creation absent.",
      },
    ],
    [
      "no-api-route",
      {
        gateId: "no-api-route",
        severity: "critical",
        gateState: "API route remains absent",
        operatorFacingExplanation:
          "No route exists for result capture, so the helper cannot be called as a live application endpoint.",
        requiredRecoveryAction:
          "Do not add a live API route for result capture.",
        nextSafeAction: "Keep API route creation absent.",
      },
    ],
    [
      "no-fetch-network",
      {
        gateId: "no-fetch-network",
        severity: "high",
        gateState: "network path remains blocked",
        operatorFacingExplanation:
          "No fetch or network call exists, so there is no transport path for prompts, provider requests, or persisted capture traffic.",
        requiredRecoveryAction:
          "Keep frontend fetch and network calls absent.",
        nextSafeAction: "Do not add network calls.",
      },
    ],
    [
      "no-provider-sdk-import",
      {
        gateId: "no-provider-sdk-import",
        severity: "critical",
        gateState: "provider SDK import remains blocked",
        operatorFacingExplanation:
          "No provider SDK import exists, which confirms the layer is not provider-capable yet.",
        requiredRecoveryAction:
          "Do not import provider SDKs into Athena, Jarvis, or the result capture review layer.",
        nextSafeAction: "Keep provider SDK imports absent.",
      },
    ],
    [
      "no-provider-execution",
      {
        gateId: "no-provider-execution",
        severity: "critical",
        gateState: "provider execution remains blocked",
        operatorFacingExplanation:
          "No provider executes, so the capture output remains a deterministic fixture only.",
        requiredRecoveryAction:
          "Keep provider execution blocked and review-only.",
        nextSafeAction: "Do not add provider execution.",
      },
    ],
    [
      "no-model-call",
      {
        gateId: "no-model-call",
        severity: "critical",
        gateState: "model calls remain blocked",
        operatorFacingExplanation:
          "No LLM/model call exists, which is why no model output is generated and the capture stays synthetic.",
        requiredRecoveryAction:
          "Do not add a model call path in this batch.",
        nextSafeAction: "Keep model calls blocked.",
      },
    ],
    [
      "no-prompt-sending",
      {
        gateId: "no-prompt-sending",
        severity: "critical",
        gateState: "prompt sending remains blocked",
        operatorFacingExplanation:
          "No prompt is sent anywhere, so the capture review cannot mutate into a live inference path.",
        requiredRecoveryAction:
          "Keep prompt sending absent from all frontend and helper code.",
        nextSafeAction: "Do not send prompts.",
      },
    ],
    [
      "no-queue-dispatch",
      {
        gateId: "no-queue-dispatch",
        severity: "high",
        gateState: "queue dispatch remains blocked",
        operatorFacingExplanation:
          "No queue dispatch occurs, so the layer cannot become asynchronous or production-like.",
        requiredRecoveryAction:
          "Do not add queue dispatch in this preview batch.",
        nextSafeAction: "Keep queue dispatch blocked.",
      },
    ],
    [
      "no-worker-dispatch",
      {
        gateId: "no-worker-dispatch",
        severity: "high",
        gateState: "worker dispatch remains blocked",
        operatorFacingExplanation:
          "No worker dispatch occurs, preserving the inert server-only posture.",
        requiredRecoveryAction:
          "Keep worker dispatch blocked.",
        nextSafeAction: "Do not add workers.",
      },
    ],
    [
      "no-job-execution",
      {
        gateId: "no-job-execution",
        severity: "high",
        gateState: "job execution remains blocked",
        operatorFacingExplanation:
          "No job executes, which keeps the layer review-only and non-operational.",
        requiredRecoveryAction:
          "Do not create or schedule jobs in this batch.",
        nextSafeAction: "Keep job execution blocked.",
      },
    ],
    [
      "no-result-persistence",
      {
        gateId: "no-result-persistence",
        severity: "critical",
        gateState: "result persistence not implemented",
        operatorFacingExplanation:
          "Results are not persisted, which is why the capture output remains preview-only and synthetic.",
        requiredRecoveryAction:
          "Keep result persistence absent until the join MVP explicitly defines safe reference handling.",
        nextSafeAction: "Do not persist results.",
      },
    ],
    [
      "no-audit-persistence",
      {
        gateId: "no-audit-persistence",
        severity: "critical",
        gateState: "audit persistence not implemented",
        operatorFacingExplanation:
          "Audit references remain preview-only and are not written anywhere.",
        requiredRecoveryAction:
          "Keep audit persistence blocked.",
        nextSafeAction: "Do not persist audit records.",
      },
    ],
    [
      "no-approval-persistence",
      {
        gateId: "no-approval-persistence",
        severity: "critical",
        gateState: "approval persistence not implemented",
        operatorFacingExplanation:
          "Approval references remain preview-only and are not persisted.",
        requiredRecoveryAction:
          "Keep approval persistence blocked.",
        nextSafeAction: "Do not persist approval records.",
      },
    ],
    [
      "no-database-write",
      {
        gateId: "no-database-write",
        severity: "critical",
        gateState: "database writes not implemented",
        operatorFacingExplanation:
          "No database write path exists, so the review layer stays fully non-persistent.",
        requiredRecoveryAction:
          "Do not add database writes in this batch.",
        nextSafeAction: "Keep database writes blocked.",
      },
    ],
    [
      "no-file-write",
      {
        gateId: "no-file-write",
        severity: "critical",
        gateState: "file writes not implemented",
        operatorFacingExplanation:
          "No file write path exists, which keeps the capture output ephemeral and in memory only.",
        requiredRecoveryAction:
          "Do not add file writes in this batch.",
        nextSafeAction: "Keep file writes blocked.",
      },
    ],
    [
      "single-run-lock-preview",
      {
        gateId: "single-run-lock-preview",
        severity: "medium",
        gateState: "single-run lock remains preview-only",
        operatorFacingExplanation:
          "Single-run locking remains documented preview evidence instead of a live coordination primitive.",
        requiredRecoveryAction:
          "Keep single-run lock handling preview-only.",
        nextSafeAction: "Do not implement a live lock.",
      },
    ],
    [
      "idempotency-replay-preview",
      {
        gateId: "idempotency-replay-preview",
        severity: "medium",
        gateState: "idempotency and replay remain preview-only",
        operatorFacingExplanation:
          "Idempotency and replay controls are still review-only evidence, not runtime behavior.",
        requiredRecoveryAction:
          "Keep idempotency and replay posture preview-only.",
        nextSafeAction: "Do not add retry or replay execution.",
      },
    ],
    [
      "timeout-cancel-preview",
      {
        gateId: "timeout-cancel-preview",
        severity: "medium",
        gateState: "timeout and cancel remain preview-only",
        operatorFacingExplanation:
          "Timeout and cancel handling still exists only as preview posture, not operational control.",
        requiredRecoveryAction:
          "Keep timeout/cancel review-only.",
        nextSafeAction: "Do not add timeout or cancel execution.",
      },
    ],
    [
      "privacy-redaction-preview",
      {
        gateId: "privacy-redaction-preview",
        severity: "high",
        gateState: "privacy and redaction remain preview-only",
        operatorFacingExplanation:
          "Privacy and redaction constraints remain review evidence, which blocks any live prompt or provider path.",
        requiredRecoveryAction:
          "Keep privacy and redaction handling review-only and secret-free.",
        nextSafeAction: "Do not send live payloads.",
      },
    ],
  ]
);

function resolveGateFailureSeed(gateId: SyntheticResultCaptureGateId) {
  return resolveRequiredRecord(
    GATE_FAILURE_SEEDS.get(gateId),
    `Missing gate failure seed for ${gateId}.`
  );
}

function buildGateFailureReviewRecord(
  review: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord,
  gateId: SyntheticResultCaptureGateId
): SyntheticResultCaptureGateFailureReviewRecord {
  const gateRecord = resolveGateRecord(review.id, gateId);
  const seed = resolveGateFailureSeed(gateId);

  return {
    key: buildStableSyntheticResultCaptureGateFailureReviewKey(
      review.id,
      gateId
    ),
    gateFailureReviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-gate-failure-review-preview-v1",
    resultCaptureReviewId: review.id,
    failedGateId: gateId,
    failedGateLabel: gateRecord.label,
    gateState: seed.gateState,
    severity: seed.severity,
    affectedCapabilityFamily: { ...review.selectedCapabilityFamily },
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation: seed.operatorFacingExplanation,
    requiredEvidenceToUnblock:
      `${gateRecord.requiredState}. ${gateRecord.evidence}`,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    auditAndApprovalJoinMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    nextSafeAction: seed.nextSafeAction,
    explicitNoLiveGatePassStatement: NO_LIVE_GATE_PASS_STATEMENT,
  };
}

const GATE_FAILURE_REVIEW_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  resolveRequiredRecord(
    RESULT_CAPTURE_GATES_BY_ID.get(review.id),
    `Missing result capture gates for ${review.id}.`
  ).map((gate) => buildGateFailureReviewRecord(review, gate.gateId))
);

function buildRecoveryPlanPreviewRecord(
  review: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord
): SyntheticResultCaptureRecoveryPlanPreviewRecord {
  return {
    id: review.id,
    key: buildStableSyntheticResultCaptureRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-recovery-plan-preview-v1",
    resultCaptureReviewId: review.id,
    recoveryPosture: RECOVERY_POSTURE,
    serverOnlyCaptureHelperRecovery:
      "Keep the capture helper server-only and do not create a client import, route, or fetch path.",
    syntheticResultCaptureInputRecovery:
      "Preserve deterministic synthetic input only and do not create a frontend request payload.",
    syntheticResultCaptureOutputRecovery:
      "Keep output deterministic, in memory only, and review-safe with no provider or model output.",
    captureEnvelopeRecovery:
      "Keep request, response, error, and output references preview-only and not persisted.",
    auditPreviewRecovery:
      "Retain audit preview references as preview-only and non-persistent.",
    approvalPreviewRecovery:
      "Retain approval preview references, approval fixture state, token state, and lease state as preview-only evidence.",
    evidencePacketRecovery:
      "Keep the evidence packet deterministic, preview-only, and not persisted.",
    providerBoundaryRecovery:
      "Do not import provider SDKs or execute providers.",
    promptBoundaryRecovery:
      "Do not send prompts from Athena, Jarvis, or the helper layer.",
    modelBoundaryRecovery:
      "Do not call models or generate model output.",
    frontendRequestBoundaryRecovery:
      "Do not create a frontend request path for result capture review.",
    apiRouteBoundaryRecovery:
      "Do not add an API route for result capture review or helper execution.",
    queueDispatchBlockedRecovery:
      "Keep queue dispatch blocked.",
    workerDispatchBlockedRecovery:
      "Keep worker dispatch blocked.",
    jobExecutionBlockedRecovery:
      "Keep job execution blocked.",
    resultPersistenceMissingRecovery:
      "Keep result persistence absent until the audit and approval join MVP defines the next safe reference layer.",
    auditPersistenceMissingRecovery:
      "Keep audit persistence absent.",
    approvalPersistenceMissingRecovery:
      "Keep approval persistence absent.",
    databaseWriteBlockedRecovery:
      "Keep database writes blocked.",
    fileWriteBlockedRecovery:
      "Keep file writes blocked.",
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    operatorActionRequired:
      `Review ${review.requestLabel} manually and preserve the backend-only in-memory-only posture until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH}.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    explicitNoRetryNoFallbackNoProviderNoPersistenceStatement:
      NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PERSISTENCE_STATEMENT,
  };
}

const RECOVERY_PLAN_PREVIEW_RECORDS = REVIEW_RECORDS.map(
  buildRecoveryPlanPreviewRecord
);

const READINESS_CHECKLIST_SEEDS = [
  {
    checklistId: "server-only-capture-helper-reviewed",
    label: "server-only capture helper reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "server-only synthetic result capture helper exists",
    recoveryAction: "Keep the helper server-only.",
    owner: "operator",
    nextSafeAction: "Do not create a frontend-callable helper path.",
  },
  {
    checklistId: "synthetic-result-capture-input-reviewed",
    label: "synthetic result capture input reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "deterministic synthetic capture request only",
    recoveryAction: "Preserve deterministic synthetic input only.",
    owner: "operator",
    nextSafeAction: "Do not add live input transport.",
  },
  {
    checklistId: "capture-admission-check-reviewed",
    label: "capture admission check reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "capture admission check remains validated",
    recoveryAction: "Keep admission synthetic-only and preview-safe.",
    owner: "operator",
    nextSafeAction: "Do not loosen admission gates.",
  },
  {
    checklistId: "capture-output-reviewed",
    label: "capture output reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "capture state: captured-synthetic-in-memory-only",
    recoveryAction: "Keep output deterministic and in memory only.",
    owner: "operator",
    nextSafeAction: "Do not replace output with provider data.",
  },
  {
    checklistId: "capture-envelope-reviewed",
    label: "capture envelope reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "preview-only / not persisted envelope references",
    recoveryAction: "Keep envelope references preview-only and unpersisted.",
    owner: "operator",
    nextSafeAction: "Do not persist the envelope.",
  },
  {
    checklistId: "capture-audit-preview-reviewed",
    label: "capture audit preview reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "audit preview state: preview-only",
    recoveryAction: "Keep audit preview review-only.",
    owner: "operator",
    nextSafeAction: "Do not persist audit previews.",
  },
  {
    checklistId: "capture-approval-preview-reviewed",
    label: "capture approval preview reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "approval preview state: preview-only",
    recoveryAction: "Keep approval preview review-only.",
    owner: "operator",
    nextSafeAction: "Do not persist approval previews.",
  },
  {
    checklistId: "capture-evidence-packet-reviewed",
    label: "capture evidence packet reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "evidence packet state: preview-only / not persisted",
    recoveryAction: "Keep evidence packet preview-only and not persisted.",
    owner: "operator",
    nextSafeAction: "Do not persist evidence packets.",
  },
  {
    checklistId: "synthetic-execution-result-reviewed",
    label: "synthetic execution result reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "source synthetic execution result reference remains deterministic",
    recoveryAction: "Keep the execution result dependency deterministic and in memory only.",
    owner: "operator",
    nextSafeAction: "Do not swap to a live execution result.",
  },
  {
    checklistId: "manual-approval-fixture-reviewed",
    label: "manual approval fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "approval fixture is preview-only",
    recoveryAction: "Keep approval fixture preview-only.",
    owner: "operator",
    nextSafeAction: "Do not request real approval.",
  },
  {
    checklistId: "manual-confirmation-fixture-reviewed",
    label: "manual confirmation fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "manual confirmation fixture is preview-only",
    recoveryAction: "Keep manual confirmation fixture preview-only.",
    owner: "operator",
    nextSafeAction: "Do not capture real confirmation.",
  },
  {
    checklistId: "kill-switch-fixture-reviewed",
    label: "kill switch fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "kill switch state: inactive fixture only",
    recoveryAction: "Keep the kill switch as inactive review-only evidence.",
    owner: "safety review",
    nextSafeAction: "Do not wire a live kill switch path in this batch.",
  },
  {
    checklistId: "deterministic-capture-reviewed",
    label: "deterministic capture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "deterministic synthetic capture only",
    recoveryAction: "Preserve deterministic capture id and digest generation.",
    owner: "operator",
    nextSafeAction: "Do not introduce non-deterministic capture evidence.",
  },
  {
    checklistId: "in-memory-only-capture-reviewed",
    label: "in-memory-only capture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic result capture is produced in memory only",
    recoveryAction: "Keep capture output in memory only.",
    owner: "operator",
    nextSafeAction: "Do not add persistence.",
  },
  {
    checklistId: "blocked-live-persistence-summary-reviewed",
    label: "blocked live persistence summary reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "blocked live persistence summary remains static preview evidence",
    recoveryAction: "Keep live persistence blocked.",
    owner: "operator",
    nextSafeAction: "Do not unlock live persistence.",
  },
  {
    checklistId: "provider-boundary-reviewed",
    label: "provider boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no provider SDK imports; no provider execution",
    recoveryAction: "Keep provider boundary blocked.",
    owner: "backend future",
    nextSafeAction: "Do not import provider SDKs or execute providers.",
  },
  {
    checklistId: "prompt-boundary-reviewed",
    label: "prompt boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no prompt sending",
    recoveryAction: "Keep prompt transport absent.",
    owner: "backend future",
    nextSafeAction: "Do not send prompts.",
  },
  {
    checklistId: "model-boundary-reviewed",
    label: "model boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no model calls",
    recoveryAction: "Keep model invocation absent.",
    owner: "backend future",
    nextSafeAction: "Do not call models.",
  },
  {
    checklistId: "frontend-request-boundary-reviewed",
    label: "frontend request boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no frontend request is created",
    recoveryAction: "Keep frontend request creation absent.",
    owner: "backend future",
    nextSafeAction: "Do not add frontend-callable capture execution.",
  },
  {
    checklistId: "api-route-boundary-reviewed",
    label: "API route boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no API route is created",
    recoveryAction: "Keep API route creation absent.",
    owner: "backend future",
    nextSafeAction: "Do not add a live API route.",
  },
  {
    checklistId: "queue-dispatch-still-blocked",
    label: "queue dispatch still blocked",
    state: "blocked",
    severity: "high",
    evidenceRequired: "queue dispatch state: not dispatched",
    recoveryAction: "Keep queue dispatch blocked.",
    owner: "backend future",
    nextSafeAction: "Do not add queues.",
  },
  {
    checklistId: "worker-dispatch-still-blocked",
    label: "worker dispatch still blocked",
    state: "blocked",
    severity: "high",
    evidenceRequired: "worker dispatch state: not dispatched",
    recoveryAction: "Keep worker dispatch blocked.",
    owner: "backend future",
    nextSafeAction: "Do not add workers.",
  },
  {
    checklistId: "job-execution-still-blocked",
    label: "job execution still blocked",
    state: "blocked",
    severity: "high",
    evidenceRequired: "job execution state: not executed",
    recoveryAction: "Keep job execution blocked.",
    owner: "backend future",
    nextSafeAction: "Do not add jobs.",
  },
  {
    checklistId: "result-persistence-still-blocked",
    label: "result persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "result persistence state: not implemented",
    recoveryAction: "Keep result persistence blocked.",
    owner: "backend future",
    nextSafeAction: "Do not persist results in this batch.",
  },
  {
    checklistId: "audit-persistence-still-blocked",
    label: "audit persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "audit persistence state: not implemented",
    recoveryAction: "Keep audit persistence blocked.",
    owner: "backend future",
    nextSafeAction: "Do not persist audit records.",
  },
  {
    checklistId: "approval-persistence-still-blocked",
    label: "approval persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "approval persistence state: not implemented",
    recoveryAction: "Keep approval persistence blocked.",
    owner: "backend future",
    nextSafeAction: "Do not persist approval records.",
  },
  {
    checklistId: "database-writes-still-blocked",
    label: "database writes still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "database write state: not implemented",
    recoveryAction: "Keep database writes blocked.",
    owner: "backend future",
    nextSafeAction: "Do not add database writes.",
  },
  {
    checklistId: "file-writes-still-blocked",
    label: "file writes still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "file write state: not implemented",
    recoveryAction: "Keep file writes blocked.",
    owner: "backend future",
    nextSafeAction: "Do not add file writes.",
  },
] as const satisfies readonly ReadinessChecklistSeed[];

function buildRecoveryReadinessChecklistRecord(
  review: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord,
  seed: ReadinessChecklistSeed
): SyntheticResultCaptureRecoveryReadinessChecklistRecord {
  return {
    key: buildStableSyntheticResultCaptureRecoveryReadinessChecklistKey(
      review.id,
      seed.checklistId
    ),
    checklistVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-recovery-readiness-checklist-v1",
    resultCaptureReviewId: review.id,
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: REVIEW_MODE,
    auditAndApprovalJoinMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

const RECOVERY_READINESS_CHECKLIST_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  READINESS_CHECKLIST_SEEDS.map((seed) =>
    buildRecoveryReadinessChecklistRecord(review, seed)
  )
);

function buildReviewAuditSummaryRecord(
  review: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord
): SyntheticResultCaptureReviewAuditSummaryRecord {
  const gateFailures = GATE_FAILURE_REVIEW_RECORDS.filter(
    (record) => record.resultCaptureReviewId === review.id
  );

  return {
    id: review.id,
    key: buildStableSyntheticResultCaptureReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review-audit-summary-preview-v1",
    resultCaptureReviewId: review.id,
    auditPosture: "preview-only",
    syntheticCaptureReferenceState: "preview-only / not persisted",
    syntheticResultReferenceState: "preview-only / not persisted",
    auditReferenceState: "not persisted",
    approvalReferenceState: "not persisted",
    evidencePacketState: "preview-only",
    serverOnlyCaptureHelperEvidenceSummary:
      `Server-only synthetic result capture helper remains present for ${review.requestLabel} without creating a frontend request or API route.`,
    deterministicCaptureEvidenceSummary:
      "Deterministic capture id, digest, and output remain in memory only and never become provider output or persisted storage.",
    failedGateSummary: gateFailures
      .slice(0, 6)
      .map((record) => `${record.failedGateLabel}: ${record.gateState}`)
      .join(" | "),
    recoverySummary:
      "Recovery is manual review only. Retry disabled. Fallback disabled. Provider, prompt, model, frontend request, API route, queue, worker, job, and persistence boundaries remain blocked.",
    blockedActionSummary:
      "No real approval request. No real approval recording. No prompt sending. No model calls. No provider execution. No result persistence. No audit persistence. No approval persistence. No database write. No file write.",
    noProviderOutputStatement: "No provider output.",
    noModelOutputStatement: "No model output.",
    noPromptSendingStatement: "No prompt sending.",
    noResultPersistenceStatement: "No result persistence.",
    noAuditPersistenceStatement: "No audit persistence.",
    noApprovalPersistenceStatement: "No approval persistence.",
    noDatabaseWriteStatement: "No database write.",
    noFileWriteStatement: "No file write.",
    auditAndApprovalJoinMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
  };
}

const REVIEW_AUDIT_SUMMARY_RECORDS = REVIEW_RECORDS.map(
  buildReviewAuditSummaryRecord
);

function buildAcceptancePostureRecord(
  review: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord
): SyntheticResultCaptureAcceptancePostureRecord {
  return {
    id: review.id,
    key: buildStableSyntheticResultCaptureAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-acceptance-posture-preview-v1",
    resultCaptureReviewId: review.id,
    acceptanceState:
      "not accepted for live persistence / synthetic capture MVP accepted only",
    syntheticOnlyAcceptanceSummary:
      "Synthetic capture output is accepted as deterministic preview evidence only.",
    backendOnlyAcceptanceSummary:
      "Result capture posture remains backend-only and server-only.",
    inMemoryOnlyAcceptanceSummary:
      "Result capture remains in memory only and not persisted.",
    providerBlockers: [
      "no provider SDK imports",
      "no provider execution",
      `provider slot remains previewed as ${review.providerSlotLabel}`,
    ],
    promptBlockers: [
      "no prompt sending",
      "no frontend request is created",
      "no API route is created",
    ],
    modelBlockers: [
      "no LLM/model calls",
      "model output is not generated",
      "provider response is not received",
    ],
    queueWorkerJobBlockers: [
      "no queue dispatch",
      "no worker dispatch",
      "no job execution",
    ],
    resultPersistenceBlockers: ["no result persistence"],
    auditPersistenceBlockers: ["no audit persistence"],
    approvalPersistenceBlockers: ["no approval persistence"],
    databaseFileBlockers: ["no database writes", "no file writes"],
    approvalBlockers: [
      "no real approval request",
      "no real approval recording",
      "approval token is not issued",
      "approval lease is not created",
    ],
    auditBlockers: [
      "audit preview state: preview-only",
      "result reference state: preview-only / not persisted",
      "evidence packet state: preview-only / not persisted",
    ],
    requiredEvidence: [
      review.sourceMinimalSyntheticResultCaptureMvpReference,
      review.sourceSyntheticResultCaptureOutputReference,
      review.sourceSyntheticResultCaptureEnvelopeReference,
      review.sourceSyntheticResultCaptureAuditPreviewReference,
      review.sourceSyntheticResultCaptureApprovalPreviewReference,
      review.sourceSyntheticResultCaptureEvidencePacketReference,
      review.sourceSyntheticResultCaptureBlockedLivePersistenceSummaryReference,
    ],
    nextSafeAction:
      `Advance only to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH} while preserving backend-only, in-memory-only, non-provider-capable posture.`,
    explicitSyntheticCaptureAcceptedLivePersistenceNotAcceptedStatement:
      ACCEPTANCE_STATEMENT,
  };
}

const ACCEPTANCE_POSTURE_RECORDS = REVIEW_RECORDS.map(
  buildAcceptancePostureRecord
);

function groupReviewRecordsByCapabilityFamily(
  records: readonly BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord[]
): readonly SyntheticResultCaptureReviewCapabilityFamilyGroup[] {
  const groups = new Map<
    BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord["selectedCapabilityFamily"]["id"],
    {
      capabilityFamilyLabel: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord["selectedCapabilityFamily"]["label"];
      reviews: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord[];
    }
  >();

  records.forEach((record) => {
    const existing = groups.get(record.selectedCapabilityFamily.id);
    if (existing) {
      existing.reviews.push(record);
      return;
    }

    groups.set(record.selectedCapabilityFamily.id, {
      capabilityFamilyLabel: record.selectedCapabilityFamily.label,
      reviews: [record],
    });
  });

  return Array.from(groups.entries()).map(([capabilityFamilyId, value]) => ({
    capabilityFamilyId,
    capabilityFamilyLabel: value.capabilityFamilyLabel,
    reviewCount: value.reviews.length,
    reviews: cloneList(value.reviews),
  }));
}

function groupReviewRecordsByWorkspaceTarget(
  records: readonly BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord[]
): readonly SyntheticResultCaptureReviewWorkspaceGroup[] {
  const groups = new Map<
    BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord["workspaceTarget"],
    BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord[]
  >();

  records.forEach((record) => {
    const existing = groups.get(record.workspaceTarget) ?? [];
    existing.push(record);
    groups.set(record.workspaceTarget, existing);
  });

  return Array.from(groups.entries()).map(([workspaceTarget, reviews]) => ({
    workspaceTarget,
    reviewCount: reviews.length,
    reviews: cloneList(reviews),
  }));
}

function uniqueStrings(values: readonly string[]): readonly string[] {
  return Array.from(new Set(values));
}

export function buildUniqueSyntheticResultCaptureReviewDisplayStrings(): MinimalSyntheticResultCaptureReviewDisplayStrings {
  return uniqueStrings(
    REVIEW_RECORDS.flatMap((record) => [
      record.requestLabel,
      record.selectedCapabilityFamily.label,
      record.workspaceTarget,
      record.providerSlotLabel,
      record.backupProviderSlotLabel,
      record.localPrivateAlternativeLabel,
      record.currentReadiness,
      record.nextAuditAndApprovalJoinMvpRequirement,
    ])
  );
}

export function listBackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviews(): readonly BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord[] {
  return cloneList(REVIEW_RECORDS);
}

export function listSyntheticResultCaptureOutputReviewRecords(): readonly SyntheticResultCaptureOutputReviewRecord[] {
  return cloneList(OUTPUT_REVIEW_RECORDS);
}

export function listSyntheticResultCaptureGateFailureReviewRecords(): readonly SyntheticResultCaptureGateFailureReviewRecord[] {
  return cloneList(GATE_FAILURE_REVIEW_RECORDS);
}

export function listSyntheticResultCaptureRecoveryPlanPreviews(): readonly SyntheticResultCaptureRecoveryPlanPreviewRecord[] {
  return cloneList(RECOVERY_PLAN_PREVIEW_RECORDS);
}

export function listSyntheticResultCaptureRecoveryReadinessChecklistRecords(): readonly SyntheticResultCaptureRecoveryReadinessChecklistRecord[] {
  return cloneList(RECOVERY_READINESS_CHECKLIST_RECORDS);
}

export function listSyntheticResultCaptureReviewAuditSummaries(): readonly SyntheticResultCaptureReviewAuditSummaryRecord[] {
  return cloneList(REVIEW_AUDIT_SUMMARY_RECORDS);
}

export function listSyntheticResultCaptureAcceptancePostureRecords(): readonly SyntheticResultCaptureAcceptancePostureRecord[] {
  return cloneList(ACCEPTANCE_POSTURE_RECORDS);
}

export function groupSyntheticResultCaptureReviewsByCapabilityFamily(): readonly SyntheticResultCaptureReviewCapabilityFamilyGroup[] {
  return groupReviewRecordsByCapabilityFamily(REVIEW_RECORDS);
}

export function groupSyntheticResultCaptureReviewsByWorkspaceTarget(): readonly SyntheticResultCaptureReviewWorkspaceGroup[] {
  return groupReviewRecordsByWorkspaceTarget(REVIEW_RECORDS);
}

export function buildSyntheticResultCaptureReviewSummary(): SyntheticResultCaptureReviewSummary {
  const capabilityGroups = groupSyntheticResultCaptureReviewsByCapabilityFamily();
  const workspaceGroups = groupSyntheticResultCaptureReviewsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
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
    acceptanceState:
      "not accepted for live persistence / synthetic capture MVP accepted only",
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildSyntheticResultCaptureOutputReviewSummary(): SyntheticResultCaptureOutputReviewSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    outputReviewCount: OUTPUT_REVIEW_RECORDS.length,
    summaryLines: cloneList(OUTPUT_REVIEW_SUMMARY_LINES),
    nextSafeAction:
      "Keep synthetic capture output review deterministic, in-memory only, and preview-only.",
  };
}

export function buildSyntheticResultCaptureGateFailureSummary(): SyntheticResultCaptureGateFailureSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    topFailedGateLabels: uniqueStrings(
      GATE_FAILURE_REVIEW_RECORDS.map((record) => record.failedGateLabel)
    ),
    nextSafeAction:
      "Keep every synthetic result capture gate blocked for live persistence and provider-capable execution.",
  };
}

export function buildSyntheticResultCaptureRecoverySummary(): SyntheticResultCaptureRecoverySummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextSafeAction:
      "Keep recovery manual-review-only while provider execution, requests, routes, and persistence remain blocked.",
  };
}

export function buildMinimalAuditAndApprovalJoinMvpChecklist(): MinimalAuditAndApprovalJoinMvpChecklist {
  return cloneList(MINIMAL_AUDIT_AND_APPROVAL_JOIN_MVP_CHECKLIST);
}
