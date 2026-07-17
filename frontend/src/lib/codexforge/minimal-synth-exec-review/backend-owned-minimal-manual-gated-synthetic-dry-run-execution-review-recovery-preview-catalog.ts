import type { AiModelProviderWorkspaceTarget } from "../ai-provider-registry";
import {
  listBackendOwnedModelProviderSyntheticDryRunRunnerSkeletons,
} from "../backend-owned-model-provider-synthetic-dry-run-runner-skeleton";
import {
  listBackendOwnedSyntheticDryRunEndToEndPacketReviews,
} from "../backend-owned-synthetic-dry-run-end-to-end-packet-review-recovery-preview";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedSyntheticDryRunResultCaptureReviews,
} from "../backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";
import {
  listMinimalManualGatedSyntheticDryRunExecutionMvpRecords,
  listSyntheticMvpApprovalPreviews,
  listSyntheticMvpAuditPreviews,
  listSyntheticMvpBlockedLiveExecutionSummaries,
  listSyntheticMvpExecutionAdmissionChecks,
  listSyntheticMvpExecutionGates,
  listSyntheticMvpExecutionInputs,
  listSyntheticMvpExecutionResults,
  listSyntheticMvpManualApprovalFixtures,
  listSyntheticMvpResultEnvelopes,
  listSyntheticMvpSafetyGateSummaries,
  type SyntheticMvpExecutionGateId,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
  type BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
  type MinimalSyntheticExecutionAcceptancePostureKey,
  type MinimalSyntheticExecutionAcceptanceStatement,
  type MinimalSyntheticExecutionGateFailureReviewKey,
  type MinimalSyntheticExecutionPreviewOnlyStatement,
  type MinimalSyntheticExecutionRecoveryPlanKey,
  type MinimalSyntheticExecutionRecoveryReadinessChecklistId,
  type MinimalSyntheticExecutionRecoveryReadinessChecklistKey,
  type MinimalSyntheticExecutionRecoveryReadinessChecklistLabel,
  type SyntheticExecutionRecoveryReadinessChecklistRecord,
  type MinimalSyntheticExecutionResultCaptureMvpChecklist,
  type MinimalSyntheticExecutionResultOnlyStatement,
  type MinimalSyntheticExecutionResultReviewKey,
  type MinimalSyntheticExecutionReviewAuditSummaryKey,
  type SyntheticExecutionReviewAuditSummaryRecord,
  type MinimalSyntheticExecutionReviewCurrentReadiness,
  type MinimalSyntheticExecutionReviewId,
  type MinimalSyntheticExecutionReviewKey,
  type MinimalSyntheticExecutionReviewSeverity,
  type SyntheticExecutionAcceptancePostureRecord,
  type SyntheticExecutionGateFailureReviewRecord,
  type SyntheticExecutionGateFailureSummary,
  type SyntheticExecutionRecoveryPlanPreviewRecord,
  type SyntheticExecutionRecoverySummary,
  type SyntheticExecutionResultReviewRecord,
  type SyntheticExecutionResultReviewSummary,
  type SyntheticExecutionReviewCapabilityFamilyGroup,
  type SyntheticExecutionReviewSummary,
  type SyntheticExecutionReviewWorkspaceGroup,
} from "./backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-recovery-preview-types";

type GateFailureSeed = Readonly<{
  severity: MinimalSyntheticExecutionReviewSeverity;
  gateState: string;
  operatorFacingExplanation: string;
  requiredRecoveryAction: string;
}>;

type ReadinessChecklistSeed = Readonly<{
  checklistId: MinimalSyntheticExecutionRecoveryReadinessChecklistId;
  label: MinimalSyntheticExecutionRecoveryReadinessChecklistLabel;
  state: SyntheticExecutionRecoveryReadinessChecklistRecord["state"];
  severity: MinimalSyntheticExecutionReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: SyntheticExecutionRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const CURRENT_READINESS: MinimalSyntheticExecutionReviewCurrentReadiness =
  "minimal-synthetic-execution-review-only / backend-only / in-memory-only / not provider-capable / not persistent";

const PREVIEW_ONLY_STATEMENT: MinimalSyntheticExecutionPreviewOnlyStatement =
  "minimal synthetic execution review is preview-only";

const SYNTHETIC_RESULT_ONLY_STATEMENT: MinimalSyntheticExecutionResultOnlyStatement =
  "Synthetic result only. No real output.";

const ACCEPTANCE_STATEMENT: MinimalSyntheticExecutionAcceptanceStatement =
  "Synthetic MVP accepted only. Live execution not accepted.";

const REVIEW_SUMMARY_LINES = [
  "backend-owned minimal manual-gated synthetic dry-run execution review and recovery preview only",
  "minimal synthetic execution review is preview-only",
  "server-only synthetic execution helper exists",
  "synthetic execution result is produced in memory only",
  "deterministic synthetic result only",
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
  "acceptance state is not accepted for live execution / synthetic MVP accepted only",
  "backend-owned minimal manual-gated synthetic dry-run result capture MVP next",
] as const;

const RESULT_REVIEW_SUMMARY_LINES = [
  "deterministic synthetic result produced in memory only",
  "deterministic preview id only",
  "deterministic preview digest only",
  "provider response is not received",
  "model output is not generated",
  "synthetic fixture only",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "result capture MVP comes next",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only module boundary",
  "synthetic-only mode",
  "manual approval fixture",
  "manual confirmation fixture",
  "approval decision fixture",
  "kill switch inactive fixture",
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
  "deterministic result",
  "in-memory only result",
  "single-run lock preview",
  "idempotency/replay preview",
  "timeout/cancel preview",
  "privacy/redaction preview",
] as const;

const RECOVERY_SUMMARY_LINES = [
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "provider boundary recovery",
  "prompt boundary recovery",
  "model boundary recovery",
  "queue dispatch blocked recovery",
  "worker dispatch blocked recovery",
  "job execution blocked recovery",
  "result persistence missing recovery",
  "audit persistence missing recovery",
  "approval persistence missing recovery",
  "database write blocked recovery",
  "file write blocked recovery",
  "result capture MVP comes next",
] as const;

const MINIMAL_SYNTHETIC_RESULT_CAPTURE_MVP_CHECKLIST = [
  "Keep the server-only synthetic execution helper deterministic and in-memory only while review and recovery stay preview-only.",
  "Introduce result capture as a backend-owned minimal manual-gated MVP without creating a frontend request or API route.",
  "Preserve no prompt sending, no model calls, no provider SDK imports, no provider execution, no plugin execution, and no persistence until backend-only capture gates exist.",
  "Keep approval fixture, manual confirmation fixture, and kill switch posture preview-only until result capture evidence is defined.",
  "Advance to 5450-5481 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture MVP without enabling retry, fallback, queues, workers, jobs, database writes, or file writes.",
] as const;

function cloneList<T>(records: readonly T[]): readonly T[] {
  return [...records];
}

function resolveRequiredRecord<T>(record: T | undefined, message: string): T {
  if (!record) {
    throw new Error(message);
  }

  return record;
}

function buildMapById<T extends Readonly<{ id: MinimalSyntheticExecutionReviewId }>>(
  records: readonly T[]
): ReadonlyMap<MinimalSyntheticExecutionReviewId, T> {
  return new Map(records.map((record) => [record.id, record] as const));
}

function buildMapByExecutionMvpId<
  T extends Readonly<{ executionMvpId: MinimalSyntheticExecutionReviewId }>
>(records: readonly T[]): ReadonlyMap<MinimalSyntheticExecutionReviewId, T> {
  return new Map(
    records.map((record) => [record.executionMvpId, record] as const)
  );
}

function groupByReviewId<T>(
  records: readonly T[],
  resolveId: (record: T) => MinimalSyntheticExecutionReviewId
): ReadonlyMap<MinimalSyntheticExecutionReviewId, readonly T[]> {
  const grouped = new Map<MinimalSyntheticExecutionReviewId, T[]>();

  records.forEach((record) => {
    const id = resolveId(record);
    const existing = grouped.get(id);

    if (existing) {
      existing.push(record);
      return;
    }

    grouped.set(id, [record]);
  });

  return new Map(
    Array.from(grouped.entries(), ([id, items]) => [id, cloneList(items)])
  );
}

function groupReviewRecordsByCapabilityFamily(
  records: readonly BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord[]
) : readonly SyntheticExecutionReviewCapabilityFamilyGroup[] {
  const grouped = new Map<
    BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord["selectedCapabilityFamily"]["id"],
    SyntheticExecutionReviewCapabilityFamilyGroup
  >();

  records.forEach((record) => {
    const capabilityFamilyId = record.selectedCapabilityFamily.id;
    const existing = grouped.get(capabilityFamilyId);

    if (existing) {
      grouped.set(capabilityFamilyId, {
        ...existing,
        reviewCount: existing.reviewCount + 1,
        reviews: [...existing.reviews, record],
      });
      return;
    }

    grouped.set(capabilityFamilyId, {
      capabilityFamilyId,
      capabilityFamilyLabel: record.selectedCapabilityFamily.label,
      reviewCount: 1,
      reviews: [record],
    });
  });

  return Array.from(grouped.values()).sort((left, right) =>
    left.capabilityFamilyLabel.localeCompare(right.capabilityFamilyLabel)
  );
}

function groupReviewRecordsByWorkspaceTarget(
  records: readonly BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord[]
): readonly SyntheticExecutionReviewWorkspaceGroup[] {
  const grouped = new Map<
    AiModelProviderWorkspaceTarget,
    SyntheticExecutionReviewWorkspaceGroup
  >();

  records.forEach((record) => {
    const existing = grouped.get(record.workspaceTarget);

    if (existing) {
      grouped.set(record.workspaceTarget, {
        ...existing,
        reviewCount: existing.reviewCount + 1,
        reviews: [...existing.reviews, record],
      });
      return;
    }

    grouped.set(record.workspaceTarget, {
      workspaceTarget: record.workspaceTarget,
      reviewCount: 1,
      reviews: [record],
    });
  });

  return Array.from(grouped.values()).sort((left, right) =>
    left.workspaceTarget.localeCompare(right.workspaceTarget)
  );
}

export function buildStableMinimalSyntheticExecutionReviewKey(
  id: MinimalSyntheticExecutionReviewId
): MinimalSyntheticExecutionReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review:${id}`;
}

export function buildStableSyntheticExecutionResultReviewKey(
  id: MinimalSyntheticExecutionReviewId
): MinimalSyntheticExecutionResultReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result-review:${id}`;
}

export function buildStableSyntheticExecutionGateFailureReviewKey(
  id: MinimalSyntheticExecutionReviewId,
  gateId: SyntheticMvpExecutionGateId
): MinimalSyntheticExecutionGateFailureReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-gate-failure-review:${id}:${gateId}`;
}

export function buildStableSyntheticExecutionRecoveryPlanKey(
  id: MinimalSyntheticExecutionReviewId
): MinimalSyntheticExecutionRecoveryPlanKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-recovery-plan:${id}`;
}

export function buildStableSyntheticExecutionRecoveryReadinessChecklistKey(
  id: MinimalSyntheticExecutionReviewId,
  checklistId: MinimalSyntheticExecutionRecoveryReadinessChecklistId
): MinimalSyntheticExecutionRecoveryReadinessChecklistKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-recovery-readiness:${id}:${checklistId}`;
}

export function buildStableSyntheticExecutionReviewAuditSummaryKey(
  id: MinimalSyntheticExecutionReviewId
): MinimalSyntheticExecutionReviewAuditSummaryKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-audit-summary:${id}`;
}

export function buildStableSyntheticExecutionAcceptancePostureKey(
  id: MinimalSyntheticExecutionReviewId
): MinimalSyntheticExecutionAcceptancePostureKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-acceptance-posture:${id}`;
}

export function buildUniqueSyntheticExecutionReviewDisplayStrings(
  values: readonly string[]
): readonly string[] {
  return Array.from(new Set(values));
}

const MVP_RECORDS = listMinimalManualGatedSyntheticDryRunExecutionMvpRecords();
const EXECUTION_INPUTS = listSyntheticMvpExecutionInputs();
const ADMISSION_CHECKS = listSyntheticMvpExecutionAdmissionChecks();
const MANUAL_APPROVAL_FIXTURES = listSyntheticMvpManualApprovalFixtures();
const EXECUTION_RESULTS = listSyntheticMvpExecutionResults();
const RESULT_ENVELOPES = listSyntheticMvpResultEnvelopes();
const AUDIT_PREVIEWS = listSyntheticMvpAuditPreviews();
const APPROVAL_PREVIEWS = listSyntheticMvpApprovalPreviews();
const SAFETY_GATE_SUMMARIES = listSyntheticMvpSafetyGateSummaries();
const BLOCKED_LIVE_EXECUTION_SUMMARIES =
  listSyntheticMvpBlockedLiveExecutionSummaries();
const EXECUTION_GATES = listSyntheticMvpExecutionGates();
const DECISION_REVIEWS =
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews();
const END_TO_END_PACKET_REVIEWS =
  listBackendOwnedSyntheticDryRunEndToEndPacketReviews();
const SYNTHETIC_RUNNER_SKELETONS =
  listBackendOwnedModelProviderSyntheticDryRunRunnerSkeletons();
const RESULT_CAPTURE_REVIEWS =
  listBackendOwnedSyntheticDryRunResultCaptureReviews();

const MVP_RECORDS_BY_ID = buildMapById(MVP_RECORDS);
const EXECUTION_INPUTS_BY_ID = buildMapByExecutionMvpId(EXECUTION_INPUTS);
const ADMISSION_CHECKS_BY_ID = buildMapByExecutionMvpId(ADMISSION_CHECKS);
const MANUAL_APPROVAL_FIXTURES_BY_ID =
  buildMapByExecutionMvpId(MANUAL_APPROVAL_FIXTURES);
const EXECUTION_RESULTS_BY_ID = buildMapByExecutionMvpId(EXECUTION_RESULTS);
const RESULT_ENVELOPES_BY_ID = buildMapByExecutionMvpId(RESULT_ENVELOPES);
const AUDIT_PREVIEWS_BY_ID = buildMapByExecutionMvpId(AUDIT_PREVIEWS);
const APPROVAL_PREVIEWS_BY_ID = buildMapByExecutionMvpId(APPROVAL_PREVIEWS);
const SAFETY_GATE_SUMMARIES_BY_ID =
  buildMapByExecutionMvpId(SAFETY_GATE_SUMMARIES);
const BLOCKED_LIVE_EXECUTION_SUMMARIES_BY_ID = buildMapByExecutionMvpId(
  BLOCKED_LIVE_EXECUTION_SUMMARIES
);
const DECISION_REVIEWS_BY_ID = buildMapById(DECISION_REVIEWS);
const END_TO_END_PACKET_REVIEWS_BY_ID = buildMapById(END_TO_END_PACKET_REVIEWS);
const SYNTHETIC_RUNNER_SKELETONS_BY_ID = buildMapById(
  SYNTHETIC_RUNNER_SKELETONS
);
const RESULT_CAPTURE_REVIEWS_BY_ID = buildMapById(RESULT_CAPTURE_REVIEWS);
const EXECUTION_GATES_BY_ID = groupByReviewId(
  EXECUTION_GATES,
  (record) => record.executionMvpId
);

function resolveDecisionReview(id: MinimalSyntheticExecutionReviewId) {
  return resolveRequiredRecord(
    DECISION_REVIEWS_BY_ID.get(id),
    `Missing manual approval decision review for synthetic execution review ${id}.`
  );
}

function buildExecutionReviewRecord(
  reviewId: MinimalSyntheticExecutionReviewId
): BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord {
  const mvpRecord = resolveRequiredRecord(
    MVP_RECORDS_BY_ID.get(reviewId),
    `Missing MVP record for synthetic execution review ${reviewId}.`
  );
  const executionInput = resolveRequiredRecord(
    EXECUTION_INPUTS_BY_ID.get(reviewId),
    `Missing execution input for synthetic execution review ${reviewId}.`
  );
  const admissionCheck = resolveRequiredRecord(
    ADMISSION_CHECKS_BY_ID.get(reviewId),
    `Missing admission check for synthetic execution review ${reviewId}.`
  );
  const manualApprovalFixture = resolveRequiredRecord(
    MANUAL_APPROVAL_FIXTURES_BY_ID.get(reviewId),
    `Missing manual approval fixture for synthetic execution review ${reviewId}.`
  );
  const executionResult = resolveRequiredRecord(
    EXECUTION_RESULTS_BY_ID.get(reviewId),
    `Missing execution result for synthetic execution review ${reviewId}.`
  );
  const resultEnvelope = resolveRequiredRecord(
    RESULT_ENVELOPES_BY_ID.get(reviewId),
    `Missing result envelope for synthetic execution review ${reviewId}.`
  );
  const auditPreview = resolveRequiredRecord(
    AUDIT_PREVIEWS_BY_ID.get(reviewId),
    `Missing audit preview for synthetic execution review ${reviewId}.`
  );
  const approvalPreview = resolveRequiredRecord(
    APPROVAL_PREVIEWS_BY_ID.get(reviewId),
    `Missing approval preview for synthetic execution review ${reviewId}.`
  );
  const safetyGateSummary = resolveRequiredRecord(
    SAFETY_GATE_SUMMARIES_BY_ID.get(reviewId),
    `Missing safety gate summary for synthetic execution review ${reviewId}.`
  );
  const blockedLiveExecutionSummary = resolveRequiredRecord(
    BLOCKED_LIVE_EXECUTION_SUMMARIES_BY_ID.get(reviewId),
    `Missing blocked live execution summary for synthetic execution review ${reviewId}.`
  );
  const decisionReview = resolveDecisionReview(reviewId);
  const endToEndPacketReview = resolveRequiredRecord(
    END_TO_END_PACKET_REVIEWS_BY_ID.get(reviewId),
    `Missing end-to-end packet review for synthetic execution review ${reviewId}.`
  );
  const syntheticRunnerSkeleton = resolveRequiredRecord(
    SYNTHETIC_RUNNER_SKELETONS_BY_ID.get(reviewId),
    `Missing synthetic runner skeleton for synthetic execution review ${reviewId}.`
  );
  const resultCaptureReview = resolveRequiredRecord(
    RESULT_CAPTURE_REVIEWS_BY_ID.get(reviewId),
    `Missing result capture review for synthetic execution review ${reviewId}.`
  );

  return {
    id: reviewId,
    key: buildStableMinimalSyntheticExecutionReviewKey(reviewId),
    reviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-preview-v1",
    source: "Athena / Jarvis Model Gateway",
    reviewMode: "preview-only",
    reviewPosture:
      "minimal synthetic execution review / backend-only / in-memory-only / not provider-capable / not persistent",
    previewOnlyStatement: PREVIEW_ONLY_STATEMENT,
    requestLabel: mvpRecord.requestLabel,
    label: `${mvpRecord.requestLabel} synthetic execution review`,
    workspaceTarget: mvpRecord.workspaceTarget,
    sourceMinimalSyntheticExecutionMvpReference: mvpRecord.key,
    sourceSyntheticMvpExecutionInputReference: executionInput.key,
    sourceSyntheticMvpAdmissionCheckReference: admissionCheck.key,
    sourceManualApprovalFixtureReference: manualApprovalFixture.key,
    sourceManualConfirmationFixtureReference: manualApprovalFixture.key,
    sourceSyntheticMvpExecutionResultReference: executionResult.key,
    sourceSyntheticMvpResultEnvelopeReference: resultEnvelope.key,
    sourceSyntheticMvpAuditPreviewReference: auditPreview.key,
    sourceSyntheticMvpApprovalPreviewReference: approvalPreview.key,
    sourceSyntheticMvpSafetyGateSummaryReference: safetyGateSummary.key,
    sourceSyntheticMvpBlockedLiveExecutionSummaryReference:
      blockedLiveExecutionSummary.key,
    sourceManualApprovalDecisionReviewReference: decisionReview.key,
    sourceEndToEndPacketReviewReference: endToEndPacketReview.key,
    sourceSyntheticRunnerSkeletonReference: syntheticRunnerSkeleton.key,
    sourceResultCaptureReviewReference: resultCaptureReview.key,
    selectedCapabilityFamily: { ...decisionReview.selectedCapabilityFamily },
    providerSlotLabel: decisionReview.providerSlotLabel,
    backupProviderSlotLabel: decisionReview.backupProviderSlotLabel,
    localPrivateAlternativeLabel: decisionReview.localPrivateAlternativeLabel,
    serverOnlyHelperState: "exists",
    syntheticExecutionState: executionResult.executionState,
    deterministicResultState: "produced in memory only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    providerResponseState: executionResult.providerResponseState,
    modelOutputState: executionResult.modelOutputState,
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
    killSwitchState: "inactive fixture only",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    nextResultCaptureMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    currentReadiness: CURRENT_READINESS,
  };
}

const REVIEW_RECORDS = MVP_RECORDS.map((record) =>
  buildExecutionReviewRecord(record.id)
);

const REVIEW_RECORDS_BY_ID = buildMapById(REVIEW_RECORDS);

function resolveExecutionReview(id: MinimalSyntheticExecutionReviewId) {
  return resolveRequiredRecord(
    REVIEW_RECORDS_BY_ID.get(id),
    `Missing execution review record ${id}.`
  );
}

const GATE_FAILURE_SEEDS = new Map<
  SyntheticMvpExecutionGateId,
  GateFailureSeed
>([
  [
    "backend-only-boundary",
    {
      severity: "critical",
      gateState: "backend-only boundary required",
      operatorFacingExplanation:
        "Execution remains synthetic-only because the path is still backend-owned and not exposed to any frontend caller.",
      requiredRecoveryAction:
        "Keep execution backend-only until a later backend result capture MVP adds the next safe layer.",
    },
  ],
  [
    "server-only-module-boundary",
    {
      severity: "critical",
      gateState: "server-only helper boundary required",
      operatorFacingExplanation:
        "The helper is intentionally server-only, so the review can prove the boundary without creating a callable frontend path.",
      requiredRecoveryAction:
        "Retain server-only module isolation and do not export a frontend execution surface.",
    },
  ],
  [
    "synthetic-only-mode",
    {
      severity: "critical",
      gateState: "synthetic-only mode remains active",
      operatorFacingExplanation:
        "The MVP is deterministic fixture execution only and does not represent a live provider-backed run.",
      requiredRecoveryAction:
        "Keep synthetic-only mode active until a later backend batch explicitly introduces real result capture.",
    },
  ],
  [
    "manual-approval-fixture",
    {
      severity: "high",
      gateState: "manual approval fixture preview-only",
      operatorFacingExplanation:
        "Approval evidence is still a preview fixture, so no real approval request exists to authorize live execution.",
      requiredRecoveryAction:
        "Keep the approval fixture preview-only and do not convert it into a live approval request.",
    },
  ],
  [
    "manual-confirmation-fixture",
    {
      severity: "high",
      gateState: "manual confirmation fixture preview-only",
      operatorFacingExplanation:
        "Manual confirmation remains a fixture preview, so no real operator confirmation is captured.",
      requiredRecoveryAction:
        "Preserve preview-only manual confirmation until a later backend-only approval path exists.",
    },
  ],
  [
    "approval-decision-fixture",
    {
      severity: "high",
      gateState: "approval decision fixture preview-only",
      operatorFacingExplanation:
        "The selected decision remains a static synthetic fixture and is not a real evaluated approval decision.",
      requiredRecoveryAction:
        "Keep the decision fixture static and review-only.",
    },
  ],
  [
    "kill-switch-inactive",
    {
      severity: "high",
      gateState: "kill switch inactive fixture only",
      operatorFacingExplanation:
        "The kill switch is represented as an inactive fixture for review coverage, not a live safety control path.",
      requiredRecoveryAction:
        "Retain the inactive kill switch fixture and avoid live execution plumbing.",
    },
  ],
  [
    "no-real-approval-recording",
    {
      severity: "critical",
      gateState: "real approval recording remains blocked",
      operatorFacingExplanation:
        "No approval recording is created or persisted, which keeps the MVP synthetic-only.",
      requiredRecoveryAction:
        "Do not add approval recording or approval persistence in this batch.",
    },
  ],
  [
    "no-approval-token-issuance",
    {
      severity: "critical",
      gateState: "approval token issuance remains blocked",
      operatorFacingExplanation:
        "No approval token is issued, so the execution path cannot become a real admitted run.",
      requiredRecoveryAction:
        "Keep token issuance absent until a future backend-only approval layer exists.",
    },
  ],
  [
    "no-approval-lease-issuance",
    {
      severity: "critical",
      gateState: "approval lease issuance remains blocked",
      operatorFacingExplanation:
        "No approval lease is created, which prevents live execution sequencing or lease-based execution unlocks.",
      requiredRecoveryAction:
        "Keep lease creation absent in this preview layer.",
    },
  ],
  [
    "no-frontend-request",
    {
      severity: "critical",
      gateState: "frontend request not created",
      operatorFacingExplanation:
        "There is still no frontend request path, so the MVP remains backend-only and synthetic.",
      requiredRecoveryAction:
        "Do not create a frontend request or interactive execution surface.",
    },
  ],
  [
    "no-api-route",
    {
      severity: "critical",
      gateState: "API route not created",
      operatorFacingExplanation:
        "No live route exists for execution, which keeps the MVP non-routable and non-provider-capable.",
      requiredRecoveryAction:
        "Do not add an API route for synthetic execution in this batch.",
    },
  ],
  [
    "no-fetch-network",
    {
      severity: "high",
      gateState: "network path remains blocked",
      operatorFacingExplanation:
        "No fetch or network call exists, so the review layer cannot send prompts or contact providers.",
      requiredRecoveryAction:
        "Keep frontend fetch/network calls absent.",
    },
  ],
  [
    "no-provider-sdk-import",
    {
      severity: "critical",
      gateState: "provider SDK import remains blocked",
      operatorFacingExplanation:
        "No provider SDK import exists, which confirms the MVP is not a real provider execution path.",
      requiredRecoveryAction:
        "Do not import provider SDKs into Athena, Jarvis, or the synthetic review layer.",
    },
  ],
  [
    "no-provider-execution",
    {
      severity: "critical",
      gateState: "provider execution remains blocked",
      operatorFacingExplanation:
        "No provider executes, so the result remains a deterministic in-memory fixture only.",
      requiredRecoveryAction:
        "Keep provider execution blocked and review-only.",
    },
  ],
  [
    "no-model-call",
    {
      severity: "critical",
      gateState: "model calls remain blocked",
      operatorFacingExplanation:
        "No LLM/model call exists, which is why no model output is generated.",
      requiredRecoveryAction:
        "Do not add a model call path in this batch.",
    },
  ],
  [
    "no-prompt-sending",
    {
      severity: "critical",
      gateState: "prompt sending remains blocked",
      operatorFacingExplanation:
        "No prompt is ever sent, so the MVP remains a synthetic dry-run review path rather than a live execution path.",
      requiredRecoveryAction:
        "Keep prompt sending absent from all frontend and review code.",
    },
  ],
  [
    "no-queue-dispatch",
    {
      severity: "high",
      gateState: "queue dispatch remains blocked",
      operatorFacingExplanation:
        "No queue dispatch occurs, so execution cannot become asynchronous or production-like.",
      requiredRecoveryAction:
        "Do not add queue dispatch in this preview batch.",
    },
  ],
  [
    "no-worker-dispatch",
    {
      severity: "high",
      gateState: "worker dispatch remains blocked",
      operatorFacingExplanation:
        "No worker dispatch occurs, preserving the inert server-only dry-run posture.",
      requiredRecoveryAction:
        "Keep worker dispatch blocked.",
    },
  ],
  [
    "no-job-execution",
    {
      severity: "high",
      gateState: "job execution remains blocked",
      operatorFacingExplanation:
        "No job executes, which keeps the layer review-only and non-operational.",
      requiredRecoveryAction:
        "Do not create or schedule jobs in this batch.",
    },
  ],
  [
    "no-result-persistence",
    {
      severity: "critical",
      gateState: "result persistence not implemented",
      operatorFacingExplanation:
        "Results are not captured or persisted, which is why the current path remains in-memory only.",
      requiredRecoveryAction:
        "Keep result persistence absent until the result capture MVP batch.",
    },
  ],
  [
    "no-audit-persistence",
    {
      severity: "critical",
      gateState: "audit persistence not implemented",
      operatorFacingExplanation:
        "Audit references remain preview-only and are not written anywhere.",
      requiredRecoveryAction:
        "Keep audit persistence blocked.",
    },
  ],
  [
    "no-approval-persistence",
    {
      severity: "critical",
      gateState: "approval persistence not implemented",
      operatorFacingExplanation:
        "Approval references remain preview-only and are not persisted, keeping the review layer inert.",
      requiredRecoveryAction:
        "Keep approval persistence blocked.",
    },
  ],
  [
    "no-database-write",
    {
      severity: "critical",
      gateState: "database writes not implemented",
      operatorFacingExplanation:
        "No database write path exists, so the execution review remains fully non-persistent.",
      requiredRecoveryAction:
        "Do not add database writes in this batch.",
    },
  ],
  [
    "no-file-write",
    {
      severity: "critical",
      gateState: "file writes not implemented",
      operatorFacingExplanation:
        "No file write path exists, which keeps the result ephemeral and in memory only.",
      requiredRecoveryAction:
        "Do not add file writes in this batch.",
    },
  ],
  [
    "deterministic-result",
    {
      severity: "high",
      gateState: "deterministic result preserved",
      operatorFacingExplanation:
        "The result stays deterministic, which proves the review layer is still synthetic and fixture-driven.",
      requiredRecoveryAction:
        "Keep deterministic result generation unchanged.",
    },
  ],
  [
    "in-memory-only-result",
    {
      severity: "critical",
      gateState: "result remains in memory only",
      operatorFacingExplanation:
        "The result exists only in memory, so there is no stored outcome to treat as a real execution artifact.",
      requiredRecoveryAction:
        "Retain the in-memory-only result posture until the result capture MVP exists.",
    },
  ],
  [
    "single-run-lock-preview",
    {
      severity: "medium",
      gateState: "single-run lock remains preview-only",
      operatorFacingExplanation:
        "Single-run locking is still a preview concept rather than a live execution lock.",
      requiredRecoveryAction:
        "Keep single-run lock handling as review-only evidence.",
    },
  ],
  [
    "idempotency-replay-preview",
    {
      severity: "medium",
      gateState: "idempotency and replay remain preview-only",
      operatorFacingExplanation:
        "Idempotency and replay controls are documented as preview evidence only, not enforced runtime behavior.",
      requiredRecoveryAction:
        "Keep idempotency and replay posture preview-only.",
    },
  ],
  [
    "timeout-cancel-preview",
    {
      severity: "medium",
      gateState: "timeout and cancel remain preview-only",
      operatorFacingExplanation:
        "Timeout and cancel handling still exists only as preview posture, not operational control.",
      requiredRecoveryAction:
        "Keep timeout/cancel review-only.",
    },
  ],
  [
    "privacy-redaction-preview",
    {
      severity: "high",
      gateState: "privacy and redaction remain preview-only",
      operatorFacingExplanation:
        "Privacy and redaction constraints are still review evidence, which blocks any live prompt or provider path.",
      requiredRecoveryAction:
        "Keep privacy/redaction handling review-only and secret-free.",
    },
  ],
]);

function resolveGateFailureSeed(
  gateId: SyntheticMvpExecutionGateId
): GateFailureSeed {
  return resolveRequiredRecord(
    GATE_FAILURE_SEEDS.get(gateId),
    `Missing gate failure seed for ${gateId}.`
  );
}

function buildResultReviewRecord(
  review: BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord
): SyntheticExecutionResultReviewRecord {
  return {
    key: buildStableSyntheticExecutionResultReviewKey(review.id),
    resultReviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result-review-preview-v1",
    executionReviewId: review.id,
    sourceExecutionResultReference:
      review.sourceSyntheticMvpExecutionResultReference,
    sourceResultEnvelopeReference:
      review.sourceSyntheticMvpResultEnvelopeReference,
    resultState: "deterministic synthetic result produced in memory only",
    resultIdPosture: "deterministic preview id only",
    resultDigestPosture: "deterministic preview digest only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    outputClassification: "synthetic fixture only",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    operatorFacingExplanation:
      `${review.requestLabel} still resolves to a deterministic synthetic result that exists in memory only and never becomes a real provider output.`,
    remainingBlockers: [
      "no prompt sending",
      "no model calls",
      "no provider execution",
      "no result persistence",
      "no audit persistence",
      "no approval persistence",
      "no database writes",
      "no file writes",
    ],
    nextSafeAction:
      `Keep ${review.requestLabel} in preview-only review posture until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH}.`,
    explicitSyntheticResultOnlyNoRealOutputStatement:
      SYNTHETIC_RESULT_ONLY_STATEMENT,
  };
}

const RESULT_REVIEW_RECORDS = REVIEW_RECORDS.map(buildResultReviewRecord);

function buildGateFailureReviewRecord(
  review: BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
  gateId: SyntheticMvpExecutionGateId
): SyntheticExecutionGateFailureReviewRecord {
  const gateRecords = resolveRequiredRecord(
    EXECUTION_GATES_BY_ID.get(review.id),
    `Missing execution gates for review ${review.id}.`
  );
  const gateRecord = resolveRequiredRecord(
    gateRecords.find((record) => record.gateId === gateId),
    `Missing execution gate ${gateId} for review ${review.id}.`
  );
  const seed = resolveGateFailureSeed(gateId);

  return {
    key: buildStableSyntheticExecutionGateFailureReviewKey(review.id, gateId),
    gateFailureReviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-gate-failure-review-preview-v1",
    executionReviewId: review.id,
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
    resultCaptureMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    nextSafeAction:
      `Keep ${gateRecord.label} blocked for ${review.requestLabel}.`,
    explicitNoLiveGatePassStatement: "No live gate pass.",
  };
}

const GATE_FAILURE_REVIEW_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  GATE_FAILURE_SUMMARY_LINES.map((_, index) => {
    const gateRecords = resolveRequiredRecord(
      EXECUTION_GATES_BY_ID.get(review.id),
      `Missing execution gates for review ${review.id}.`
    );
    const gateRecord = gateRecords[index];

    return buildGateFailureReviewRecord(
      review,
      resolveRequiredRecord(
        gateRecord?.gateId,
        `Missing gate record index ${index} for review ${review.id}.`
      )
    );
  })
);

function buildRecoveryPlanPreviewRecord(
  review: BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord
): SyntheticExecutionRecoveryPlanPreviewRecord {
  return {
    id: review.id,
    key: buildStableSyntheticExecutionRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-recovery-plan-preview-v1",
    executionReviewId: review.id,
    recoveryPosture: "manual review only",
    serverOnlyHelperRecovery:
      "Keep the helper server-only and preserve the backend-only boundary.",
    syntheticExecutionInputRecovery:
      "Keep synthetic execution input deterministic, redacted, and non-networked.",
    manualApprovalFixtureRecovery:
      "Keep the manual approval fixture preview-only and not recorded.",
    manualConfirmationFixtureRecovery:
      "Keep the manual confirmation fixture preview-only and not captured.",
    approvalDecisionFixtureRecovery:
      "Keep the approval decision fixture static and synthetic.",
    killSwitchFixtureRecovery:
      "Retain the inactive kill switch fixture without wiring live execution control.",
    deterministicResultRecovery:
      "Preserve deterministic result generation and do not introduce model output.",
    resultEnvelopeRecovery:
      "Keep the result envelope server-only and not persisted.",
    auditPreviewRecovery:
      "Keep audit references preview-only and not persisted.",
    approvalPreviewRecovery:
      "Keep approval references preview-only and not persisted.",
    providerBoundaryRecovery:
      "Do not import provider SDKs or create provider execution paths.",
    promptBoundaryRecovery:
      "Do not create prompt sending or prompt transport paths.",
    modelBoundaryRecovery:
      "Do not create model invocation or output generation paths.",
    queueDispatchBlockedRecovery:
      "Keep queue dispatch blocked.",
    workerDispatchBlockedRecovery:
      "Keep worker dispatch blocked.",
    jobExecutionBlockedRecovery:
      "Keep job execution blocked.",
    resultPersistenceMissingRecovery:
      "Keep result persistence unimplemented until result capture MVP work starts.",
    auditPersistenceMissingRecovery:
      "Keep audit persistence unimplemented.",
    approvalPersistenceMissingRecovery:
      "Keep approval persistence unimplemented.",
    databaseWriteBlockedRecovery:
      "Do not add database writes.",
    fileWriteBlockedRecovery:
      "Do not add file writes.",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    operatorActionRequired:
      `Review ${review.requestLabel} as preview-only evidence and keep execution blocked.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    explicitNoRetryNoFallbackNoProviderNoPersistenceStatement:
      "No retry. No fallback. No provider execution. No persistence.",
  };
}

const RECOVERY_PLAN_PREVIEW_RECORDS = REVIEW_RECORDS.map(
  buildRecoveryPlanPreviewRecord
);

const READINESS_CHECKLIST_SEEDS = [
  {
    checklistId: "server-only-helper-reviewed",
    label: "server-only helper reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "server-only synthetic execution helper exists",
    recoveryAction: "Keep the helper server-only.",
    owner: "operator",
    nextSafeAction: "Do not expose the helper to the frontend.",
  },
  {
    checklistId: "synthetic-execution-input-reviewed",
    label: "synthetic execution input reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "deterministic synthetic request only",
    recoveryAction: "Preserve deterministic synthetic input.",
    owner: "operator",
    nextSafeAction: "Do not add a live input path.",
  },
  {
    checklistId: "admission-check-reviewed",
    label: "admission check reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "yes, as fixture-only",
    recoveryAction: "Preserve fixture-only admission.",
    owner: "operator",
    nextSafeAction: "Keep admission synthetic-only.",
  },
  {
    checklistId: "manual-approval-fixture-reviewed",
    label: "manual approval fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "approval fixture is preview-only",
    recoveryAction: "Keep approval fixture preview-only.",
    owner: "operator",
    nextSafeAction: "Do not create a real approval request.",
  },
  {
    checklistId: "manual-confirmation-fixture-reviewed",
    label: "manual confirmation fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "manual confirmation fixture is preview-only",
    recoveryAction: "Keep manual confirmation fixture preview-only.",
    owner: "operator",
    nextSafeAction: "Do not capture a real manual confirmation.",
  },
  {
    checklistId: "approval-decision-fixture-reviewed",
    label: "approval decision fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "static synthetic approve-preview fixture",
    recoveryAction: "Keep approval decision fixture synthetic.",
    owner: "operator",
    nextSafeAction: "Do not evaluate a real approval decision.",
  },
  {
    checklistId: "kill-switch-fixture-reviewed",
    label: "kill switch fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "inactive fixture only",
    recoveryAction: "Keep the kill switch as inactive review-only evidence.",
    owner: "safety review",
    nextSafeAction: "Do not wire a live kill switch control in this batch.",
  },
  {
    checklistId: "deterministic-result-reviewed",
    label: "deterministic result reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "deterministic synthetic result only",
    recoveryAction: "Preserve deterministic in-memory output.",
    owner: "operator",
    nextSafeAction: "Do not replace the fixture result with provider output.",
  },
  {
    checklistId: "result-envelope-reviewed",
    label: "result envelope reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "preview-only / not persisted",
    recoveryAction: "Keep result envelope server-only and unpersisted.",
    owner: "operator",
    nextSafeAction: "Do not persist the result envelope.",
  },
  {
    checklistId: "audit-preview-reviewed",
    label: "audit preview reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "audit preview state: preview-only",
    recoveryAction: "Keep audit preview review-only.",
    owner: "operator",
    nextSafeAction: "Do not persist audit evidence.",
  },
  {
    checklistId: "approval-preview-reviewed",
    label: "approval preview reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "approval preview state: preview-only",
    recoveryAction: "Keep approval preview review-only.",
    owner: "operator",
    nextSafeAction: "Do not persist approval evidence.",
  },
  {
    checklistId: "blocked-live-execution-summary-reviewed",
    label: "blocked live execution summary reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "blocked live execution summary remains static",
    recoveryAction: "Keep live execution blocked.",
    owner: "operator",
    nextSafeAction: "Do not unlock live execution.",
  },
  {
    checklistId: "provider-boundary-reviewed",
    label: "provider boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no provider SDK imports; no provider execution",
    recoveryAction: "Keep provider boundary blocked.",
    owner: "backend future",
    nextSafeAction: "Do not import provider SDKs.",
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
    nextSafeAction: "Do not add frontend-callable execution.",
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
  review: BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
  seed: ReadinessChecklistSeed
): SyntheticExecutionRecoveryReadinessChecklistRecord {
  return {
    key: buildStableSyntheticExecutionRecoveryReadinessChecklistKey(
      review.id,
      seed.checklistId
    ),
    checklistVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-recovery-readiness-checklist-v1",
    executionReviewId: review.id,
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    resultCaptureMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

const RECOVERY_READINESS_CHECKLIST_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  READINESS_CHECKLIST_SEEDS.map((seed) =>
    buildRecoveryReadinessChecklistRecord(review, seed)
  )
);

function buildReviewAuditSummaryRecord(
  review: BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord
): SyntheticExecutionReviewAuditSummaryRecord {
  const gateFailures = GATE_FAILURE_REVIEW_RECORDS.filter(
    (record) => record.executionReviewId === review.id
  );

  return {
    id: review.id,
    key: buildStableSyntheticExecutionReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-audit-summary-preview-v1",
    executionReviewId: review.id,
    auditPosture: "preview-only",
    syntheticResultReferenceState: "preview-only / not persisted",
    auditReferenceState: "not persisted",
    approvalReferenceState: "not persisted",
    evidencePacketState: "preview-only",
    serverOnlyHelperEvidenceSummary:
      `Server-only helper remains present for ${review.requestLabel} without creating a frontend request or API route.`,
    deterministicResultEvidenceSummary:
      "Deterministic synthetic result remains in memory only and does not become provider output or model output.",
    failedGateSummary: gateFailures
      .slice(0, 6)
      .map((record) => `${record.failedGateLabel}: ${record.gateState}`)
      .join(" | "),
    recoverySummary:
      "Recovery is manual review only. Retry disabled. Fallback disabled. Provider, prompt, model, queue, worker, job, and persistence boundaries remain blocked.",
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
    resultCaptureMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
  };
}

const REVIEW_AUDIT_SUMMARY_RECORDS = REVIEW_RECORDS.map(
  buildReviewAuditSummaryRecord
);

function buildAcceptancePostureRecord(
  review: BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord
): SyntheticExecutionAcceptancePostureRecord {
  return {
    id: review.id,
    key: buildStableSyntheticExecutionAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-acceptance-posture-preview-v1",
    executionReviewId: review.id,
    acceptanceState:
      "not accepted for live execution / synthetic MVP accepted only",
    syntheticOnlyAcceptanceSummary:
      "Synthetic MVP output is accepted as a deterministic fixture preview only.",
    backendOnlyAcceptanceSummary:
      "Execution posture remains backend-only and server-only.",
    inMemoryOnlyAcceptanceSummary:
      "Result posture remains in memory only and not persisted.",
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
    persistenceBlockers: [
      "no result persistence",
      "no audit persistence",
      "no approval persistence",
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
      "audit preview state: preview-only",
      "synthetic result reference state: preview-only / not persisted",
    ],
    requiredEvidence: [
      review.sourceMinimalSyntheticExecutionMvpReference,
      review.sourceSyntheticMvpExecutionResultReference,
      review.sourceSyntheticMvpResultEnvelopeReference,
      review.sourceSyntheticMvpBlockedLiveExecutionSummaryReference,
      review.sourceResultCaptureReviewReference,
    ],
    nextSafeAction:
      `Advance only to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH} while preserving backend-only, in-memory-only posture.`,
    explicitSyntheticMvpAcceptedLiveExecutionNotAcceptedStatement:
      ACCEPTANCE_STATEMENT,
  };
}

const ACCEPTANCE_POSTURE_RECORDS = REVIEW_RECORDS.map(
  buildAcceptancePostureRecord
);

export function listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews(): readonly BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord[] {
  return cloneList(REVIEW_RECORDS);
}

export function listSyntheticExecutionResultReviewRecords(): readonly SyntheticExecutionResultReviewRecord[] {
  return cloneList(RESULT_REVIEW_RECORDS);
}

export function listSyntheticExecutionGateFailureReviewRecords(): readonly SyntheticExecutionGateFailureReviewRecord[] {
  return cloneList(GATE_FAILURE_REVIEW_RECORDS);
}

export function listSyntheticExecutionRecoveryPlanPreviews(): readonly SyntheticExecutionRecoveryPlanPreviewRecord[] {
  return cloneList(RECOVERY_PLAN_PREVIEW_RECORDS);
}

export function listSyntheticExecutionRecoveryReadinessChecklistRecords(): readonly SyntheticExecutionRecoveryReadinessChecklistRecord[] {
  return cloneList(RECOVERY_READINESS_CHECKLIST_RECORDS);
}

export function listSyntheticExecutionReviewAuditSummaries(): readonly SyntheticExecutionReviewAuditSummaryRecord[] {
  return cloneList(REVIEW_AUDIT_SUMMARY_RECORDS);
}

export function listSyntheticExecutionAcceptancePostureRecords(): readonly SyntheticExecutionAcceptancePostureRecord[] {
  return cloneList(ACCEPTANCE_POSTURE_RECORDS);
}

export function groupSyntheticExecutionReviewsByCapabilityFamily(): readonly SyntheticExecutionReviewCapabilityFamilyGroup[] {
  return groupReviewRecordsByCapabilityFamily(REVIEW_RECORDS);
}

export function groupSyntheticExecutionReviewsByWorkspaceTarget(): readonly SyntheticExecutionReviewWorkspaceGroup[] {
  return groupReviewRecordsByWorkspaceTarget(REVIEW_RECORDS);
}

export function buildSyntheticExecutionReviewSummary(): SyntheticExecutionReviewSummary {
  const capabilityGroups = groupSyntheticExecutionReviewsByCapabilityFamily();
  const workspaceGroups = groupSyntheticExecutionReviewsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    reviewCount: REVIEW_RECORDS.length,
    resultReviewCount: RESULT_REVIEW_RECORDS.length,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    auditSummaryCount: REVIEW_AUDIT_SUMMARY_RECORDS.length,
    acceptancePostureCount: ACCEPTANCE_POSTURE_RECORDS.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    currentReadiness: CURRENT_READINESS,
    acceptanceState:
      "not accepted for live execution / synthetic MVP accepted only",
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildSyntheticExecutionResultReviewSummary(): SyntheticExecutionResultReviewSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    resultReviewCount: RESULT_REVIEW_RECORDS.length,
    summaryLines: cloneList(RESULT_REVIEW_SUMMARY_LINES),
    nextSafeAction:
      "Keep result review deterministic, synthetic-only, and in-memory only.",
  };
}

export function buildSyntheticExecutionGateFailureSummary(): SyntheticExecutionGateFailureSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    topFailedGateLabels: cloneList(GATE_FAILURE_SUMMARY_LINES),
    nextSafeAction:
      "Keep every synthetic execution gate blocked for live execution.",
  };
}

export function buildSyntheticExecutionRecoverySummary(): SyntheticExecutionRecoverySummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextSafeAction:
      "Keep recovery manual-review-only while execution, providers, and persistence remain blocked.",
  };
}

export function buildMinimalSyntheticResultCaptureMvpChecklist(): MinimalSyntheticExecutionResultCaptureMvpChecklist {
  return cloneList(MINIMAL_SYNTHETIC_RESULT_CAPTURE_MVP_CHECKLIST);
}
