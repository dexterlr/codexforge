import {
  listBackendOwnedModelProviderSyntheticDryRunRunnerSkeletons,
  type BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord,
} from "../backend-owned-model-provider-synthetic-dry-run-runner-skeleton";
import {
  listBackendOwnedSyntheticDryRunAuditApprovalJoinReviews,
  type BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord,
} from "../backend-owned-synthetic-dry-run-audit-approval-join-review-recovery-preview";
import {
  listBackendOwnedSyntheticDryRunEndToEndPacketReviews,
  type BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord,
} from "../backend-owned-synthetic-dry-run-end-to-end-packet-review-recovery-preview";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
  type BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedSyntheticDryRunManualApprovalHandoffReviews,
  type BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-handoff-review-recovery-preview";
import {
  listBackendOwnedSyntheticDryRunResultCaptureReviews,
  type BackendOwnedSyntheticDryRunResultCaptureReviewRecord,
} from "../backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
  type MinimalManualGatedSyntheticDryRunExecutionMvpCapabilityFamilyGroup,
  type MinimalManualGatedSyntheticDryRunExecutionMvpKey,
  type MinimalManualGatedSyntheticDryRunExecutionMvpRecord,
  type MinimalManualGatedSyntheticDryRunExecutionMvpWorkspaceGroup,
  type SyntheticMvpApprovalPreviewKey,
  type SyntheticMvpApprovalPreviewRecord,
  type SyntheticMvpAuditPreviewKey,
  type SyntheticMvpAuditPreviewRecord,
  type SyntheticMvpBlockedLiveExecutionSummaryKey,
  type SyntheticMvpBlockedLiveExecutionSummaryRecord,
  type SyntheticMvpCommonRecordFields,
  type SyntheticMvpCurrentReadiness,
  type SyntheticMvpDigest,
  type SyntheticMvpErrorKey,
  type SyntheticMvpErrorRecord,
  type SyntheticMvpExecutionAdmissionCheckKey,
  type SyntheticMvpExecutionAdmissionCheckRecord,
  type SyntheticMvpExecutionGateId,
  type SyntheticMvpExecutionGateRecord,
  type SyntheticMvpExecutionInputKey,
  type SyntheticMvpExecutionInputRecord,
  type SyntheticMvpExecutionResultKey,
  type SyntheticMvpExecutionResultRecord,
  type SyntheticMvpExecutionSummary,
  type SyntheticMvpGateSummary,
  type SyntheticMvpManualApprovalFixtureKey,
  type SyntheticMvpManualApprovalFixtureRecord,
  type SyntheticMvpReadinessMatrixId,
  type SyntheticMvpReadinessMatrixRecord,
  type SyntheticMvpReadinessSummary,
  type SyntheticMvpRequestKey,
  type SyntheticMvpRequestRecord,
  type SyntheticMvpResponseKey,
  type SyntheticMvpResponseRecord,
  type SyntheticMvpResultEnvelopeKey,
  type SyntheticMvpResultEnvelopeRecord,
  type SyntheticMvpResultId,
  type SyntheticMvpResultReference,
  type SyntheticMvpSafetyGateSummaryKey,
  type SyntheticMvpSafetyGateSummaryRecord,
  type MinimalManualGatedSyntheticDryRunExecutionMvpId,
} from "./backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-types";

type ExecutionGateSeed = Readonly<{
  gateId: SyntheticMvpExecutionGateId;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
}>;

type ReadinessSeed = Readonly<{
  readinessId: SyntheticMvpReadinessMatrixId;
  label: string;
  state: string;
  evidence: string;
  nextSafeAction: string;
}>;

const CURRENT_READINESS: SyntheticMvpCurrentReadiness =
  "minimal-synthetic-execution-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent";

const EXECUTION_SUMMARY_LINES = [
  "backend-owned minimal manual-gated synthetic dry-run execution MVP only",
  "minimal synthetic execution MVP is backend-only",
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
  "backend-owned minimal manual-gated synthetic dry-run execution review and recovery preview next",
] as const;

const GATE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only module boundary",
  "synthetic-only mode",
  "manual approval fixture",
  "manual confirmation fixture",
  "approval decision fixture",
  "kill switch inactive",
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

const READINESS_SUMMARY_LINES = [
  "server-only module state",
  "synthetic execution input state",
  "manual approval fixture state",
  "manual confirmation fixture state",
  "approval decision fixture state",
  "kill switch state",
  "execution function state",
  "deterministic result state",
  "result envelope state",
  "audit preview state",
  "approval preview state",
  "provider boundary state",
  "prompt boundary state",
  "model boundary state",
  "queue boundary state",
  "worker boundary state",
  "job boundary state",
  "persistence boundary state",
  "database boundary state",
  "file boundary state",
  `current readiness: ${CURRENT_READINESS}`,
  "next safe action",
] as const;

const NEXT_EXECUTION_REVIEW_RECOVERY_CHECKLIST = [
  "Review the deterministic in-memory synthetic execution result and envelope before adding any recovery preview posture.",
  "Keep the backend-owned minimal manual-gated synthetic dry-run execution MVP backend-only and server-only while no frontend request and no API route exist.",
  "Preserve preview-only approval fixtures, preview-only manual confirmation fixtures, and blocked provider/model/prompt/network execution paths.",
  "Carry execution review, gate failure review, recovery plan, and readiness preview forward without enabling retry, fallback, persistence, queue dispatch, worker dispatch, or job execution.",
  "execution review and recovery preview comes next",
] as const;

const BLOCKED_LIVE_ACTIONS = [
  "real approval request",
  "real approval recording",
  "approval token issuance",
  "approval lease issuance",
  "prompt sending",
  "model call",
  "provider SDK import",
  "provider execution",
  "plugin execution",
  "frontend request creation",
  "API route creation",
  "frontend fetch/network call",
  "queue dispatch",
  "worker dispatch",
  "job execution",
  "result persistence",
  "audit persistence",
  "approval persistence",
  "database write",
  "file write",
] as const;

const EXECUTION_GATE_SEEDS = [
  {
    gateId: "backend-only-boundary",
    label: "backend-only boundary",
    owner: "backend-owned execution MVP",
    requiredState: "backend-only execution path required",
    currentState: "backend-only fixture path only",
    evidence: "Minimal synthetic execution MVP is backend-only.",
    blockedLiveAction: "frontend-callable execution",
  },
  {
    gateId: "server-only-module-boundary",
    label: "server-only module boundary",
    owner: "backend-owned execution MVP",
    requiredState: "server-only adapters required",
    currentState: "server-only synthetic execution helper exists",
    evidence: "server-only synthetic execution helper exists",
    blockedLiveAction: "client import of execution helper",
  },
  {
    gateId: "synthetic-only-mode",
    label: "synthetic-only mode",
    owner: "backend-owned execution MVP",
    requiredState: "synthetic-only execution required",
    currentState: "synthetic-only fixture path",
    evidence: "deterministic synthetic result only",
    blockedLiveAction: "live provider-backed execution",
  },
  {
    gateId: "manual-approval-fixture",
    label: "manual approval fixture",
    owner: "operator fixture",
    requiredState: "manual approval fixture required",
    currentState: "approval fixture is preview-only",
    evidence: "approval fixture is preview-only",
    blockedLiveAction: "real approval request",
  },
  {
    gateId: "manual-confirmation-fixture",
    label: "manual confirmation fixture",
    owner: "operator fixture",
    requiredState: "manual confirmation fixture required",
    currentState: "manual confirmation fixture is preview-only",
    evidence: "manual confirmation fixture is preview-only",
    blockedLiveAction: "real manual confirmation capture",
  },
  {
    gateId: "approval-decision-fixture",
    label: "approval decision fixture",
    owner: "operator fixture",
    requiredState: "static synthetic approve-preview fixture required",
    currentState: "static synthetic approve-preview fixture selected",
    evidence: "selected decision fixture is static synthetic approve-preview.",
    blockedLiveAction: "live approval decision evaluation",
  },
  {
    gateId: "kill-switch-inactive",
    label: "kill switch inactive",
    owner: "safety gate",
    requiredState: "kill switch required",
    currentState: "kill switch fixture inactive",
    evidence: "kill switch fixture is inactive.",
    blockedLiveAction: "live execution while kill switch active",
  },
  {
    gateId: "no-real-approval-recording",
    label: "no real approval recording",
    owner: "safety gate",
    requiredState: "no real approval recording",
    currentState: "preview-only approval fixture only",
    evidence: "no real approval recording",
    blockedLiveAction: "approval recording",
  },
  {
    gateId: "no-approval-token-issuance",
    label: "no approval token issuance",
    owner: "safety gate",
    requiredState: "approval token is not issued",
    currentState: "approval token is not issued",
    evidence: "approval token is not issued",
    blockedLiveAction: "approval token issuance",
  },
  {
    gateId: "no-approval-lease-issuance",
    label: "no approval lease issuance",
    owner: "safety gate",
    requiredState: "approval lease is not created",
    currentState: "approval lease is not created",
    evidence: "approval lease is not created",
    blockedLiveAction: "approval lease issuance",
  },
  {
    gateId: "no-frontend-request",
    label: "no frontend request",
    owner: "safety gate",
    requiredState: "no frontend request is created",
    currentState: "frontend request state: not created",
    evidence: "no frontend request is created",
    blockedLiveAction: "frontend request creation",
  },
  {
    gateId: "no-api-route",
    label: "no API route",
    owner: "safety gate",
    requiredState: "no API route is created",
    currentState: "API route state: not created",
    evidence: "no API route is created",
    blockedLiveAction: "live API route exposure",
  },
  {
    gateId: "no-fetch-network",
    label: "no fetch/network",
    owner: "safety gate",
    requiredState: "no frontend fetch/network call",
    currentState: "network path blocked",
    evidence: "no frontend fetch/network call",
    blockedLiveAction: "network call",
  },
  {
    gateId: "no-provider-sdk-import",
    label: "no provider SDK import",
    owner: "safety gate",
    requiredState: "no provider SDK imports",
    currentState: "provider SDK import blocked",
    evidence: "No provider SDKs imported",
    blockedLiveAction: "provider SDK import",
  },
  {
    gateId: "no-provider-execution",
    label: "no provider execution",
    owner: "safety gate",
    requiredState: "no provider execution",
    currentState: "provider execution blocked",
    evidence: "no provider execution",
    blockedLiveAction: "provider execution",
  },
  {
    gateId: "no-model-call",
    label: "no model call",
    owner: "safety gate",
    requiredState: "no model calls",
    currentState: "model calls blocked",
    evidence: "No model calls yet",
    blockedLiveAction: "LLM/model call",
  },
  {
    gateId: "no-prompt-sending",
    label: "no prompt sending",
    owner: "safety gate",
    requiredState: "no prompt sending",
    currentState: "prompt sending blocked",
    evidence: "No prompt sending",
    blockedLiveAction: "prompt sending",
  },
  {
    gateId: "no-queue-dispatch",
    label: "no queue dispatch",
    owner: "safety gate",
    requiredState: "no queue dispatch",
    currentState: "queue dispatch blocked",
    evidence: "no queue dispatch",
    blockedLiveAction: "queue dispatch",
  },
  {
    gateId: "no-worker-dispatch",
    label: "no worker dispatch",
    owner: "safety gate",
    requiredState: "no worker dispatch",
    currentState: "worker dispatch blocked",
    evidence: "no worker dispatch",
    blockedLiveAction: "worker dispatch",
  },
  {
    gateId: "no-job-execution",
    label: "no job execution",
    owner: "safety gate",
    requiredState: "no job execution",
    currentState: "job execution blocked",
    evidence: "no job execution",
    blockedLiveAction: "job execution",
  },
  {
    gateId: "no-result-persistence",
    label: "no result persistence",
    owner: "safety gate",
    requiredState: "no result persistence",
    currentState: "result persistence blocked",
    evidence: "no result persistence",
    blockedLiveAction: "result persistence",
  },
  {
    gateId: "no-audit-persistence",
    label: "no audit persistence",
    owner: "safety gate",
    requiredState: "no audit persistence",
    currentState: "audit persistence blocked",
    evidence: "no audit persistence",
    blockedLiveAction: "audit persistence",
  },
  {
    gateId: "no-approval-persistence",
    label: "no approval persistence",
    owner: "safety gate",
    requiredState: "no approval persistence",
    currentState: "approval persistence blocked",
    evidence: "no approval persistence",
    blockedLiveAction: "approval persistence",
  },
  {
    gateId: "no-database-write",
    label: "no database write",
    owner: "safety gate",
    requiredState: "no database writes",
    currentState: "database writes blocked",
    evidence: "no database writes",
    blockedLiveAction: "database write",
  },
  {
    gateId: "no-file-write",
    label: "no file write",
    owner: "safety gate",
    requiredState: "no file writes",
    currentState: "file writes blocked",
    evidence: "no file writes",
    blockedLiveAction: "file write",
  },
  {
    gateId: "deterministic-result",
    label: "deterministic result",
    owner: "backend-owned execution MVP",
    requiredState: "deterministic synthetic result only",
    currentState: "deterministic preview result generated",
    evidence: "deterministic synthetic result only",
    blockedLiveAction: "randomized output generation",
  },
  {
    gateId: "in-memory-only-result",
    label: "in-memory only result",
    owner: "backend-owned execution MVP",
    requiredState: "in-memory-only result required",
    currentState: "synthetic execution result is produced in memory only",
    evidence: "synthetic execution result is produced in memory only",
    blockedLiveAction: "persistent result storage",
  },
  {
    gateId: "single-run-lock-preview",
    label: "single-run lock preview",
    owner: "safety gate",
    requiredState: "single-run lock preview required",
    currentState: "single-run lock preview only",
    evidence: "single-run lock preview remains static.",
    blockedLiveAction: "parallel live execution",
  },
  {
    gateId: "idempotency-replay-preview",
    label: "idempotency/replay preview",
    owner: "safety gate",
    requiredState: "idempotency/replay preview required",
    currentState: "idempotency and replay remain preview-only",
    evidence: "idempotency/replay preview remains static.",
    blockedLiveAction: "live replay and retry",
  },
  {
    gateId: "timeout-cancel-preview",
    label: "timeout/cancel preview",
    owner: "safety gate",
    requiredState: "timeout/cancel preview required",
    currentState: "timeout/cancel preview only",
    evidence: "timeout/cancel preview remains static.",
    blockedLiveAction: "live timeout and cancel control",
  },
  {
    gateId: "privacy-redaction-preview",
    label: "privacy/redaction preview",
    owner: "safety gate",
    requiredState: "privacy/redaction preview required",
    currentState: "privacy/redaction preview only",
    evidence: "privacy/redaction preview remains static.",
    blockedLiveAction: "live prompt payload transmission",
  },
] as const satisfies readonly ExecutionGateSeed[];

const READINESS_SEEDS = [
  {
    readinessId: "server-only-module-state",
    label: "server-only module state",
    state: "implemented / server-only",
    evidence: "server-only synthetic execution helper exists",
    nextSafeAction:
      "Keep the execution helper server-only while review and recovery preview is added next.",
  },
  {
    readinessId: "synthetic-execution-input-state",
    label: "synthetic execution input state",
    state: "implemented / synthetic-only",
    evidence: "Synthetic execution input is deterministic synthetic request only.",
    nextSafeAction: "Preserve redacted placeholder-only request posture.",
  },
  {
    readinessId: "manual-approval-fixture-state",
    label: "manual approval fixture state",
    state: "implemented / preview-only",
    evidence: "approval fixture is preview-only",
    nextSafeAction: "Keep real approval request creation blocked.",
  },
  {
    readinessId: "manual-confirmation-fixture-state",
    label: "manual confirmation fixture state",
    state: "implemented / preview-only",
    evidence: "manual confirmation fixture is preview-only",
    nextSafeAction: "Keep live manual confirmation capture blocked.",
  },
  {
    readinessId: "approval-decision-fixture-state",
    label: "approval decision fixture state",
    state: "implemented / approve-preview fixture",
    evidence: "selected decision fixture is static synthetic approve-preview.",
    nextSafeAction: "Carry the static approve-preview decision into review and recovery preview only.",
  },
  {
    readinessId: "kill-switch-state",
    label: "kill switch state",
    state: "implemented / inactive fixture",
    evidence: "kill switch fixture is inactive.",
    nextSafeAction: "Retain kill switch requirement for future backend execution paths.",
  },
  {
    readinessId: "execution-function-state",
    label: "execution function state",
    state: "implemented / pure deterministic helper",
    evidence: "server-only synthetic execution helper exists",
    nextSafeAction: "Keep the function pure and in-memory only.",
  },
  {
    readinessId: "deterministic-result-state",
    label: "deterministic result state",
    state: "implemented / deterministic preview",
    evidence: "deterministic synthetic result only",
    nextSafeAction: "Preserve stable preview ids and digest generation.",
  },
  {
    readinessId: "result-envelope-state",
    label: "result envelope state",
    state: "implemented / in-memory only",
    evidence: "synthetic execution result is produced in memory only",
    nextSafeAction: "Keep provider output and live result persistence absent.",
  },
  {
    readinessId: "audit-preview-state",
    label: "audit preview state",
    state: "implemented / preview-only",
    evidence: "audit preview required",
    nextSafeAction: "Keep audit persistence blocked until a future backend batch.",
  },
  {
    readinessId: "approval-preview-state",
    label: "approval preview state",
    state: "implemented / preview-only",
    evidence: "approval fixture is preview-only",
    nextSafeAction: "Keep approval persistence and recording blocked.",
  },
  {
    readinessId: "provider-boundary-state",
    label: "provider boundary state",
    state: "blocked / not provider-capable",
    evidence: "no provider execution",
    nextSafeAction: "Do not import provider SDKs or add provider calls.",
  },
  {
    readinessId: "prompt-boundary-state",
    label: "prompt boundary state",
    state: "blocked / no prompt sending",
    evidence: "no prompt sending",
    nextSafeAction: "Keep prompt payloads redacted and unsent.",
  },
  {
    readinessId: "model-boundary-state",
    label: "model boundary state",
    state: "blocked / no model calls",
    evidence: "no LLM/model calls",
    nextSafeAction: "Keep model output ungenerated.",
  },
  {
    readinessId: "queue-boundary-state",
    label: "queue boundary state",
    state: "blocked",
    evidence: "no queue dispatch",
    nextSafeAction: "Keep queue dispatch unavailable.",
  },
  {
    readinessId: "worker-boundary-state",
    label: "worker boundary state",
    state: "blocked",
    evidence: "no worker dispatch",
    nextSafeAction: "Keep worker dispatch unavailable.",
  },
  {
    readinessId: "job-boundary-state",
    label: "job boundary state",
    state: "blocked",
    evidence: "no job execution",
    nextSafeAction: "Keep job execution unavailable.",
  },
  {
    readinessId: "persistence-boundary-state",
    label: "persistence boundary state",
    state: "blocked / not persistent",
    evidence: "no result persistence; no audit persistence; no approval persistence",
    nextSafeAction: "Do not persist any execution outputs or audit/approval artifacts.",
  },
  {
    readinessId: "database-boundary-state",
    label: "database boundary state",
    state: "blocked",
    evidence: "no database writes",
    nextSafeAction: "Keep database writes unavailable.",
  },
  {
    readinessId: "file-boundary-state",
    label: "file boundary state",
    state: "blocked",
    evidence: "no file writes",
    nextSafeAction: "Keep file writes unavailable.",
  },
] as const satisfies readonly ReadinessSeed[];

const DECISION_REVIEWS = listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews();
const RUNNER_SKELETONS_BY_ID = new Map(
  listBackendOwnedModelProviderSyntheticDryRunRunnerSkeletons().map((record) => [
    record.id,
    record,
  ] as const)
);
const RESULT_CAPTURE_REVIEWS_BY_ID = new Map(
  listBackendOwnedSyntheticDryRunResultCaptureReviews().map((record) => [
    record.id,
    record,
  ] as const)
);
const AUDIT_APPROVAL_JOIN_REVIEWS_BY_ID = new Map(
  listBackendOwnedSyntheticDryRunAuditApprovalJoinReviews().map((record) => [
    record.id,
    record,
  ] as const)
);
const END_TO_END_PACKET_REVIEWS_BY_ID = new Map(
  listBackendOwnedSyntheticDryRunEndToEndPacketReviews().map((record) => [
    record.id,
    record,
  ] as const)
);
const MANUAL_APPROVAL_HANDOFF_REVIEWS_BY_ID = new Map(
  listBackendOwnedSyntheticDryRunManualApprovalHandoffReviews().map((record) => [
    record.id,
    record,
  ] as const)
);

function cloneList<T>(records: readonly T[]): readonly T[] {
  return [...records];
}

function cloneCapabilityFamily(
  capabilityFamily: MinimalManualGatedSyntheticDryRunExecutionMvpRecord["selectedCapabilityFamily"]
): MinimalManualGatedSyntheticDryRunExecutionMvpRecord["selectedCapabilityFamily"] {
  return { ...capabilityFamily };
}

function resolveRequiredRecord<T>(record: T | undefined, message: string): T {
  if (!record) {
    throw new Error(message);
  }

  return record;
}

function resolveRunnerSkeleton(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): BackendOwnedModelProviderSyntheticDryRunRunnerSkeletonRecord {
  return resolveRequiredRecord(
    RUNNER_SKELETONS_BY_ID.get(id),
    `Missing synthetic runner skeleton for ${id}`
  );
}

function resolveResultCaptureReview(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): BackendOwnedSyntheticDryRunResultCaptureReviewRecord {
  return resolveRequiredRecord(
    RESULT_CAPTURE_REVIEWS_BY_ID.get(id),
    `Missing result capture review for ${id}`
  );
}

function resolveAuditApprovalJoinReview(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord {
  return resolveRequiredRecord(
    AUDIT_APPROVAL_JOIN_REVIEWS_BY_ID.get(id),
    `Missing audit approval join review for ${id}`
  );
}

function resolveEndToEndPacketReview(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord {
  return resolveRequiredRecord(
    END_TO_END_PACKET_REVIEWS_BY_ID.get(id),
    `Missing end-to-end packet review for ${id}`
  );
}

function resolveManualApprovalHandoffReview(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord {
  return resolveRequiredRecord(
    MANUAL_APPROVAL_HANDOFF_REVIEWS_BY_ID.get(id),
    `Missing manual approval handoff review for ${id}`
  );
}

export function buildStableMinimalSyntheticExecutionMvpKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): MinimalManualGatedSyntheticDryRunExecutionMvpKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp:${id}`;
}

function buildSyntheticMvpExecutionInputKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpExecutionInputKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-input:${id}`;
}

function buildSyntheticMvpExecutionAdmissionCheckKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpExecutionAdmissionCheckKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-admission-check:${id}`;
}

function buildSyntheticMvpManualApprovalFixtureKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpManualApprovalFixtureKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-manual-approval-fixture:${id}`;
}

function buildSyntheticMvpExecutionResultKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpExecutionResultKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result:${id}`;
}

function buildSyntheticMvpResultEnvelopeKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpResultEnvelopeKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result-envelope:${id}`;
}

function buildSyntheticMvpAuditPreviewKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpAuditPreviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-audit-preview:${id}`;
}

function buildSyntheticMvpApprovalPreviewKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpApprovalPreviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-approval-preview:${id}`;
}

function buildSyntheticMvpSafetyGateSummaryKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpSafetyGateSummaryKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-safety-gate-summary:${id}`;
}

function buildSyntheticMvpBlockedLiveExecutionSummaryKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpBlockedLiveExecutionSummaryKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-blocked-live-execution-summary:${id}`;
}

function buildSyntheticMvpRequestKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpRequestKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-request:${id}`;
}

function buildSyntheticMvpResponseKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpResponseKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-response:${id}`;
}

function buildSyntheticMvpErrorKey(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpErrorKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-error:${id}`;
}

function buildSyntheticMvpResultId(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpResultId {
  return `synthetic-mvp-result-preview:${id}`;
}

function buildSyntheticMvpDigest(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpDigest {
  return `synthetic-mvp-digest-preview:${id}:approve-preview`;
}

function buildSyntheticMvpAuditReference(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): `synthetic-mvp-audit-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}` {
  return `synthetic-mvp-audit-preview:${id}`;
}

function buildSyntheticMvpApprovalReference(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): `synthetic-mvp-approval-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}` {
  return `synthetic-mvp-approval-preview:${id}`;
}

function buildSyntheticMvpResultReference(
  id: MinimalManualGatedSyntheticDryRunExecutionMvpId
): SyntheticMvpResultReference {
  return `synthetic-mvp-result-envelope-preview:${id}`;
}

function buildCommonRecordFields(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpCommonRecordFields {
  const runnerSkeleton = resolveRunnerSkeleton(review.id);
  const resultCaptureReview = resolveResultCaptureReview(review.id);
  const auditApprovalJoinReview = resolveAuditApprovalJoinReview(review.id);

  return {
    stableId: review.id,
    requestLabel: review.requestLabel,
    label: `${review.requestLabel} minimal synthetic execution MVP`,
    selectedCapabilityFamily: cloneCapabilityFamily(
      review.selectedCapabilityFamily
    ),
    workspaceTarget: review.workspaceTarget,
    providerSlotLabel: review.providerSlotLabel,
    localPrivateAlternativeLabel: review.localPrivateAlternativeLabel,
    sourceManualApprovalDecisionReviewReference: review.key,
    sourceManualApprovalDecisionContractReference:
      review.sourceManualApprovalDecisionContractReference,
    sourceManualApprovalHandoffReviewReference:
      review.sourceManualApprovalHandoffReviewReference,
    sourceEndToEndPacketReviewReference:
      review.sourceEndToEndPacketReviewReference,
    sourceSyntheticRunnerSkeletonReference: runnerSkeleton.key,
    sourceResultCaptureReviewReference: resultCaptureReview.key,
    sourceAuditApprovalJoinReviewReference: auditApprovalJoinReview.key,
    backendOwnedPosture: "backend-owned",
    syntheticOnlyPosture: "synthetic-only",
    manualGatedPosture: "manual-gated",
    inMemoryOnlyPosture: "in-memory-only",
    noProviderExecution: "no provider execution",
    noModelCalls: "no model calls",
    noPromptSending: "no prompt sending",
    noQueueWorkerJobDispatch: "no queue/worker/job dispatch",
    noPersistence: "no persistence",
    noDatabaseWrites: "no database writes",
    noFileWrites: "no file writes",
    noApprovalRecording: "no approval recording",
    noApprovalTokenIssuance: "no approval token issuance",
    noApprovalLeaseIssuance: "no approval lease issuance",
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

function buildExecutionMvpRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): MinimalManualGatedSyntheticDryRunExecutionMvpRecord {
  return {
    id: review.id,
    key: buildStableMinimalSyntheticExecutionMvpKey(review.id),
    version: "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-v1",
    ...buildCommonRecordFields(review),
  };
}

function buildExecutionInputRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpExecutionInputRecord {
  return {
    key: buildSyntheticMvpExecutionInputKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-input-v1",
    executionMvpId: review.id,
    requestState: "deterministic synthetic request only",
    executionMode: "synthetic-only",
    executionOwnership: "backend-owned",
    operatorApprovalFixtureState: "static preview only",
    manualConfirmationFixtureState: "preview-only",
    promptPayloadPosture: "redacted placeholder only",
    providerPayloadPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteStatement:
      "No frontend request. No API route.",
    ...buildCommonRecordFields(review),
  };
}

function buildExecutionAdmissionCheckRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpExecutionAdmissionCheckRecord {
  return {
    key: buildSyntheticMvpExecutionAdmissionCheckKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-admission-check-v1",
    executionMvpId: review.id,
    admissionAccepted: "yes, as fixture-only",
    syntheticOnlyModeState: "validated",
    backendOwnedModeState: "validated",
    manualApprovalDecisionFixtureState: "validated",
    previewOnlyDecisionState: "validated",
    selectedDecisionFixtureState: "validated",
    manualConfirmationFixtureState: "validated",
    killSwitchFixtureState: "validated",
    providerExecutionBlockedState: "validated",
    promptSendingBlockedState: "validated",
    modelCallsBlockedState: "validated",
    queueWorkerJobBlockedState: "validated",
    persistenceBlockedState: "validated",
    ...buildCommonRecordFields(review),
  };
}

function buildManualApprovalFixtureRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpManualApprovalFixtureRecord {
  return {
    key: buildSyntheticMvpManualApprovalFixtureKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-manual-approval-fixture-v1",
    executionMvpId: review.id,
    approvalFixtureState: "preview-only",
    decisionFixtureState: "preview-only",
    selectedDecisionFixture: "static synthetic approve-preview fixture",
    manualConfirmationFixtureState: "preview-only",
    approvalRequestState: "not created",
    approvalRecordingState: "not recorded",
    approvalTokenIssuanceState: "not issued",
    approvalLeaseIssuanceState: "not created",
    explicitPreviewOnlyStatement: "approval fixture is preview-only",
    ...buildCommonRecordFields(review),
  };
}

function buildExecutionResultRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpExecutionResultRecord {
  return {
    key: buildSyntheticMvpExecutionResultKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result-v1",
    executionMvpId: review.id,
    acceptedSyntheticAdmission: "yes, as fixture-only",
    resultId: buildSyntheticMvpResultId(review.id),
    syntheticDigest: buildSyntheticMvpDigest(review.id),
    auditReference: buildSyntheticMvpAuditReference(review.id),
    approvalReference: buildSyntheticMvpApprovalReference(review.id),
    resultReference: buildSyntheticMvpResultReference(review.id),
    executionState: "completed-synthetic-mvp-only",
    persistenceState: "not implemented",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    deterministicSyntheticResultStatement: "deterministic synthetic result only",
    inMemoryOnlyResultStatement:
      "synthetic execution result is produced in memory only",
    ...buildCommonRecordFields(review),
  };
}

function buildResultEnvelopeRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpResultEnvelopeRecord {
  return {
    key: buildSyntheticMvpResultEnvelopeKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result-envelope-v1",
    executionMvpId: review.id,
    requestReference: buildSyntheticMvpRequestKey(review.id),
    responseReference: buildSyntheticMvpResponseKey(review.id),
    errorReference: buildSyntheticMvpErrorKey(review.id),
    resultReference: buildSyntheticMvpExecutionResultKey(review.id),
    responseState: "returned by server-only smoke/helper only",
    resultState: "deterministic synthetic result produced in memory only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitSyntheticResultOnlyNoProviderOutputStatement:
      "Synthetic result only. No provider output.",
    ...buildCommonRecordFields(review),
  };
}

function buildAuditPreviewRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpAuditPreviewRecord {
  const resultCaptureReview = resolveResultCaptureReview(review.id);
  const auditApprovalJoinReview = resolveAuditApprovalJoinReview(review.id);

  return {
    key: buildSyntheticMvpAuditPreviewKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-audit-preview-v1",
    executionMvpId: review.id,
    auditReference: buildSyntheticMvpAuditReference(review.id),
    auditState: "preview-only / not persisted",
    evidenceSummary:
      `${review.requestLabel} synthetic execution audit preview stays preview-only and unpersisted while result capture review ${resultCaptureReview.key} and audit approval join review ${auditApprovalJoinReview.key} remain source-only evidence.`,
    explicitNoAuditPersistenceStatement: "no audit persistence",
    ...buildCommonRecordFields(review),
  };
}

function buildApprovalPreviewRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpApprovalPreviewRecord {
  const handoffReview = resolveManualApprovalHandoffReview(review.id);

  return {
    key: buildSyntheticMvpApprovalPreviewKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-approval-preview-v1",
    executionMvpId: review.id,
    approvalReference: buildSyntheticMvpApprovalReference(review.id),
    approvalState: "preview-only / not persisted",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    explicitNoApprovalPersistenceStatement: "no approval persistence",
    ...buildCommonRecordFields(review),
  };
}

function buildSafetyGateSummaryRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpSafetyGateSummaryRecord {
  return {
    key: buildSyntheticMvpSafetyGateSummaryKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-safety-gate-summary-v1",
    executionMvpId: review.id,
    serverOnlyHelperStatement: "server-only synthetic execution helper exists",
    noFrontendRequestStatement: "no frontend request is created",
    noApiRouteStatement: "no API route is created",
    deterministicSyntheticResultStatement: "deterministic synthetic result only",
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(EXECUTION_SUMMARY_LINES),
    ...buildCommonRecordFields(review),
  };
}

function buildBlockedLiveExecutionSummaryRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpBlockedLiveExecutionSummaryRecord {
  return {
    key: buildSyntheticMvpBlockedLiveExecutionSummaryKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-blocked-live-execution-summary-v1",
    executionMvpId: review.id,
    blockedLiveActions: cloneList(BLOCKED_LIVE_ACTIONS),
    noRealApprovalRequestStatement: "no real approval request",
    noRealApprovalRecordingStatement: "no real approval recording",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    ...buildCommonRecordFields(review),
  };
}

function buildRequestRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpRequestRecord {
  return {
    key: buildSyntheticMvpRequestKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-request-v1",
    executionMvpId: review.id,
    requestState: "deterministic synthetic request only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    operatorApprovalFixtureState: "static preview only",
    manualConfirmationFixtureState: "static preview only",
    promptPayloadPosture: "redacted placeholder only",
    providerPayloadPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteStatement:
      "No frontend request. No API route.",
    ...buildCommonRecordFields(review),
  };
}

function buildResponseRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpResponseRecord {
  return {
    key: buildSyntheticMvpResponseKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-response-v1",
    executionMvpId: review.id,
    responseState: "returned by server-only smoke/helper only",
    resultState: "deterministic synthetic result produced in memory only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitSyntheticResultOnlyNoProviderOutputStatement:
      "Synthetic result only. No provider output.",
    ...buildCommonRecordFields(review),
  };
}

function buildErrorRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): SyntheticMvpErrorRecord {
  return {
    key: buildSyntheticMvpErrorKey(review.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-error-v1",
    executionMvpId: review.id,
    errorState: "deterministic preview only",
    failedGateExamples: cloneList(GATE_SUMMARY_LINES),
    killSwitchActiveExample:
      "If the kill switch fixture were active, the synthetic MVP would stay blocked and no result would be returned.",
    missingApprovalFixtureExample:
      "If the preview-only approval fixture were missing, the synthetic MVP would reject admission immediately.",
    staleDecisionFixtureExample:
      "If the selected decision fixture were stale or not approve-preview, the synthetic MVP would reject admission immediately.",
    providerExecutionAttemptedExample:
      "If provider execution were attempted, the synthetic MVP would reject the request because provider execution is blocked.",
    promptSendingAttemptedExample:
      "If prompt sending were attempted, the synthetic MVP would reject the request because prompt sending is blocked.",
    modelCallAttemptedExample:
      "If a model call were attempted, the synthetic MVP would reject the request because model calls are blocked.",
    persistenceAttemptedExample:
      "If result, audit, approval, database, or file persistence were attempted, the synthetic MVP would reject the request because persistence is blocked.",
    queueWorkerJobAttemptedExample:
      "If queue, worker, or job dispatch were attempted, the synthetic MVP would reject the request because execution dispatch is blocked.",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    explicitNoLiveErrorNoRetryNoFallbackStatement:
      "No live error. No retry. No fallback.",
    ...buildCommonRecordFields(review),
  };
}

function buildExecutionGateRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
  seed: ExecutionGateSeed
): SyntheticMvpExecutionGateRecord {
  return {
    ...buildCommonRecordFields(review),
    key: `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-gate:${review.id}:${seed.gateId}`,
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-gate-v1",
    executionMvpId: review.id,
    gateId: seed.gateId,
    label: seed.label,
    owner: seed.owner,
    requiredState: seed.requiredState,
    currentState: seed.currentState,
    evidence: `${seed.evidence} Source review: ${review.key}.`,
    blockedLiveAction: seed.blockedLiveAction,
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

function buildReadinessMatrixRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
  seed: ReadinessSeed
): SyntheticMvpReadinessMatrixRecord {
  return {
    ...buildCommonRecordFields(review),
    key: `backend-owned-minimal-manual-gated-synthetic-dry-run-execution-readiness:${review.id}:${seed.readinessId}`,
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-readiness-matrix-v1",
    executionMvpId: review.id,
    readinessId: seed.readinessId,
    label: seed.label,
    state: seed.state,
    evidence: `${seed.evidence} Source review: ${review.key}.`,
    currentReadiness: CURRENT_READINESS,
    nextSafeAction: seed.nextSafeAction,
  };
}

const MINIMAL_SYNTHETIC_EXECUTION_MVP_RECORDS = DECISION_REVIEWS.map(
  buildExecutionMvpRecord
);
const SYNTHETIC_MVP_EXECUTION_INPUTS = DECISION_REVIEWS.map(
  buildExecutionInputRecord
);
const SYNTHETIC_MVP_EXECUTION_ADMISSION_CHECKS = DECISION_REVIEWS.map(
  buildExecutionAdmissionCheckRecord
);
const SYNTHETIC_MVP_MANUAL_APPROVAL_FIXTURES = DECISION_REVIEWS.map(
  buildManualApprovalFixtureRecord
);
const SYNTHETIC_MVP_EXECUTION_RESULTS = DECISION_REVIEWS.map(
  buildExecutionResultRecord
);
const SYNTHETIC_MVP_RESULT_ENVELOPES = DECISION_REVIEWS.map(
  buildResultEnvelopeRecord
);
const SYNTHETIC_MVP_AUDIT_PREVIEWS = DECISION_REVIEWS.map(
  buildAuditPreviewRecord
);
const SYNTHETIC_MVP_APPROVAL_PREVIEWS = DECISION_REVIEWS.map(
  buildApprovalPreviewRecord
);
const SYNTHETIC_MVP_SAFETY_GATE_SUMMARIES = DECISION_REVIEWS.map(
  buildSafetyGateSummaryRecord
);
const SYNTHETIC_MVP_BLOCKED_LIVE_EXECUTION_SUMMARIES = DECISION_REVIEWS.map(
  buildBlockedLiveExecutionSummaryRecord
);
const SYNTHETIC_MVP_REQUEST_RECORDS = DECISION_REVIEWS.map(buildRequestRecord);
const SYNTHETIC_MVP_RESPONSE_RECORDS = DECISION_REVIEWS.map(buildResponseRecord);
const SYNTHETIC_MVP_ERROR_RECORDS = DECISION_REVIEWS.map(buildErrorRecord);
const SYNTHETIC_MVP_EXECUTION_GATES = DECISION_REVIEWS.flatMap((review) =>
  EXECUTION_GATE_SEEDS.map((seed) => buildExecutionGateRecord(review, seed))
);
const SYNTHETIC_MVP_READINESS_MATRIX_RECORDS = DECISION_REVIEWS.flatMap(
  (review) =>
    READINESS_SEEDS.map((seed) => buildReadinessMatrixRecord(review, seed))
);

export function listMinimalManualGatedSyntheticDryRunExecutionMvpRecords(): readonly MinimalManualGatedSyntheticDryRunExecutionMvpRecord[] {
  return cloneList(MINIMAL_SYNTHETIC_EXECUTION_MVP_RECORDS);
}

export function listSyntheticMvpExecutionInputs(): readonly SyntheticMvpExecutionInputRecord[] {
  return cloneList(SYNTHETIC_MVP_EXECUTION_INPUTS);
}

export function listSyntheticMvpExecutionAdmissionChecks(): readonly SyntheticMvpExecutionAdmissionCheckRecord[] {
  return cloneList(SYNTHETIC_MVP_EXECUTION_ADMISSION_CHECKS);
}

export function listSyntheticMvpManualApprovalFixtures(): readonly SyntheticMvpManualApprovalFixtureRecord[] {
  return cloneList(SYNTHETIC_MVP_MANUAL_APPROVAL_FIXTURES);
}

export function listSyntheticMvpExecutionResults(): readonly SyntheticMvpExecutionResultRecord[] {
  return cloneList(SYNTHETIC_MVP_EXECUTION_RESULTS);
}

export function listSyntheticMvpResultEnvelopes(): readonly SyntheticMvpResultEnvelopeRecord[] {
  return cloneList(SYNTHETIC_MVP_RESULT_ENVELOPES);
}

export function listSyntheticMvpAuditPreviews(): readonly SyntheticMvpAuditPreviewRecord[] {
  return cloneList(SYNTHETIC_MVP_AUDIT_PREVIEWS);
}

export function listSyntheticMvpApprovalPreviews(): readonly SyntheticMvpApprovalPreviewRecord[] {
  return cloneList(SYNTHETIC_MVP_APPROVAL_PREVIEWS);
}

export function listSyntheticMvpSafetyGateSummaries(): readonly SyntheticMvpSafetyGateSummaryRecord[] {
  return cloneList(SYNTHETIC_MVP_SAFETY_GATE_SUMMARIES);
}

export function listSyntheticMvpBlockedLiveExecutionSummaries(): readonly SyntheticMvpBlockedLiveExecutionSummaryRecord[] {
  return cloneList(SYNTHETIC_MVP_BLOCKED_LIVE_EXECUTION_SUMMARIES);
}

export function listSyntheticMvpRequestRecords(): readonly SyntheticMvpRequestRecord[] {
  return cloneList(SYNTHETIC_MVP_REQUEST_RECORDS);
}

export function listSyntheticMvpResponseRecords(): readonly SyntheticMvpResponseRecord[] {
  return cloneList(SYNTHETIC_MVP_RESPONSE_RECORDS);
}

export function listSyntheticMvpErrorRecords(): readonly SyntheticMvpErrorRecord[] {
  return cloneList(SYNTHETIC_MVP_ERROR_RECORDS);
}

export function listSyntheticMvpExecutionGates(): readonly SyntheticMvpExecutionGateRecord[] {
  return cloneList(SYNTHETIC_MVP_EXECUTION_GATES);
}

export function listSyntheticMvpReadinessMatrixRecords(): readonly SyntheticMvpReadinessMatrixRecord[] {
  return cloneList(SYNTHETIC_MVP_READINESS_MATRIX_RECORDS);
}

export function groupMinimalManualGatedSyntheticDryRunExecutionMvpsByCapabilityFamily(): readonly MinimalManualGatedSyntheticDryRunExecutionMvpCapabilityFamilyGroup[] {
  const grouped = new Map<
    MinimalManualGatedSyntheticDryRunExecutionMvpRecord["selectedCapabilityFamily"]["id"],
    MinimalManualGatedSyntheticDryRunExecutionMvpCapabilityFamilyGroup
  >();

  MINIMAL_SYNTHETIC_EXECUTION_MVP_RECORDS.forEach((record) => {
    const capabilityFamilyId = record.selectedCapabilityFamily.id;
    const existing = grouped.get(capabilityFamilyId);

    if (existing) {
      grouped.set(capabilityFamilyId, {
        ...existing,
        executionCount: existing.executionCount + 1,
      });
      return;
    }

    grouped.set(capabilityFamilyId, {
      capabilityFamilyId,
      capabilityFamilyLabel: record.selectedCapabilityFamily.label,
      executionCount: 1,
    });
  });

  return Array.from(grouped.values()).sort((left, right) =>
    left.capabilityFamilyLabel.localeCompare(right.capabilityFamilyLabel)
  );
}

export function groupMinimalManualGatedSyntheticDryRunExecutionMvpsByWorkspaceTarget(): readonly MinimalManualGatedSyntheticDryRunExecutionMvpWorkspaceGroup[] {
  const grouped = new Map<
    MinimalManualGatedSyntheticDryRunExecutionMvpRecord["workspaceTarget"],
    MinimalManualGatedSyntheticDryRunExecutionMvpWorkspaceGroup
  >();

  MINIMAL_SYNTHETIC_EXECUTION_MVP_RECORDS.forEach((record) => {
    const existing = grouped.get(record.workspaceTarget);

    if (existing) {
      grouped.set(record.workspaceTarget, {
        ...existing,
        executionCount: existing.executionCount + 1,
      });
      return;
    }

    grouped.set(record.workspaceTarget, {
      workspaceTarget: record.workspaceTarget,
      executionCount: 1,
    });
  });

  return Array.from(grouped.values()).sort((left, right) =>
    left.workspaceTarget.localeCompare(right.workspaceTarget)
  );
}

export function buildSyntheticMvpExecutionSummary(): SyntheticMvpExecutionSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-summary-v1",
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
    executionCount: MINIMAL_SYNTHETIC_EXECUTION_MVP_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(EXECUTION_SUMMARY_LINES),
    nextSafeAction:
      "Keep the MVP backend-only, in-memory only, and deterministic while execution review and recovery preview is defined next.",
  };
}

export function buildSyntheticMvpGateSummary(): SyntheticMvpGateSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-gate-summary-v1",
    gateCount: EXECUTION_GATE_SEEDS.length,
    blockedGateCount: EXECUTION_GATE_SEEDS.length,
    summaryLines: cloneList(GATE_SUMMARY_LINES),
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

export function buildSyntheticMvpReadinessSummary(): SyntheticMvpReadinessSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-readiness-summary-v1",
    readinessCount: READINESS_SEEDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(READINESS_SUMMARY_LINES),
    nextSafeAction:
      "Advance to execution review and recovery preview without creating a frontend request, API route, provider/model call, or persistence path.",
  };
}

export function buildNextExecutionReviewRecoveryChecklist(): readonly string[] {
  return cloneList(NEXT_EXECUTION_REVIEW_RECOVERY_CHECKLIST);
}
