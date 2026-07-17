import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
  type BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews,
  listSyntheticExecutionResultReviewRecords,
  type BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
  type SyntheticExecutionResultReviewRecord,
} from "../minimal-synth-exec-review";
import {
  listMinimalManualGatedSyntheticDryRunExecutionMvpRecords,
  listSyntheticMvpExecutionResults,
  listSyntheticMvpManualApprovalFixtures,
  type MinimalManualGatedSyntheticDryRunExecutionMvpId,
  type MinimalManualGatedSyntheticDryRunExecutionMvpRecord,
  type SyntheticMvpExecutionResultRecord,
  type SyntheticMvpManualApprovalFixtureRecord,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
  type MinimalManualGatedSyntheticDryRunResultCaptureMvpCapabilityFamilyGroup,
  type MinimalManualGatedSyntheticDryRunResultCaptureMvpId,
  type MinimalManualGatedSyntheticDryRunResultCaptureMvpKey,
  type MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord,
  type MinimalManualGatedSyntheticDryRunResultCaptureMvpWorkspaceGroup,
  type SyntheticResultCaptureAdmissionCheckKey,
  type SyntheticResultCaptureAdmissionCheckRecord,
  type SyntheticResultCaptureApprovalPreviewKey,
  type SyntheticResultCaptureApprovalPreviewRecord,
  type SyntheticResultCaptureAuditPreviewKey,
  type SyntheticResultCaptureAuditPreviewRecord,
  type SyntheticResultCaptureBlockedLivePersistenceSummaryKey,
  type SyntheticResultCaptureBlockedLivePersistenceSummaryRecord,
  type SyntheticResultCaptureCommonRecordFields,
  type SyntheticResultCaptureCurrentReadiness,
  type SyntheticResultCaptureDigest,
  type SyntheticResultCaptureEnvelopeKey,
  type SyntheticResultCaptureEnvelopeRecord,
  type SyntheticResultCaptureErrorKey,
  type SyntheticResultCaptureErrorRecord,
  type SyntheticResultCaptureEvidencePacketKey,
  type SyntheticResultCaptureEvidencePacketRecord,
  type SyntheticResultCaptureEvidenceReference,
  type SyntheticResultCaptureGateId,
  type SyntheticResultCaptureGateRecord,
  type SyntheticResultCaptureGateSummary,
  type SyntheticResultCaptureInputKey,
  type SyntheticResultCaptureInputRecord,
  type SyntheticResultCaptureOutputKey,
  type SyntheticResultCaptureOutputRecord,
  type SyntheticResultCaptureReadinessMatrixId,
  type SyntheticResultCaptureReadinessMatrixRecord,
  type SyntheticResultCaptureReadinessSummary,
  type SyntheticResultCaptureRequestKey,
  type SyntheticResultCaptureRequestRecord,
  type SyntheticResultCaptureResponseKey,
  type SyntheticResultCaptureResponseRecord,
  type SyntheticResultCaptureResultReference,
  type SyntheticResultCaptureSafetyGateSummaryKey,
  type SyntheticResultCaptureSafetyGateSummaryRecord,
  type SyntheticResultCaptureSummary,
  type SyntheticResultCaptureAuditReference,
  type SyntheticResultCaptureApprovalReference,
  type SyntheticResultCaptureId,
  type SyntheticResultCapturePayload,
} from "./min-synth-result-capture-types";

type ResultCaptureGateSeed = Readonly<{
  gateId: SyntheticResultCaptureGateId;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
}>;

type ResultCaptureReadinessSeed = Readonly<{
  readinessId: SyntheticResultCaptureReadinessMatrixId;
  label: string;
  state: string;
  evidence: string;
  nextSafeAction: string;
}>;

const CURRENT_READINESS: SyntheticResultCaptureCurrentReadiness =
  "minimal-synthetic-result-capture-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent";

const RESULT_CAPTURE_SUMMARY_LINES = [
  "backend-owned minimal manual-gated synthetic dry-run result capture MVP only",
  "minimal synthetic result capture MVP is backend-only",
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
  "backend-owned minimal manual-gated synthetic dry-run result capture review and recovery preview next",
] as const;

const RESULT_CAPTURE_GATE_SUMMARY_LINES = [
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

const RESULT_CAPTURE_READINESS_SUMMARY_LINES = [
  "server-only capture helper state",
  "synthetic execution result dependency",
  "result capture input state",
  "capture admission check state",
  "capture output state",
  "capture envelope state",
  "audit preview state",
  "approval preview state",
  "evidence packet state",
  "provider boundary state",
  "prompt boundary state",
  "model boundary state",
  "frontend request boundary state",
  "API route boundary state",
  "queue boundary state",
  "worker boundary state",
  "job boundary state",
  "persistence boundary state",
  "database boundary state",
  "file boundary state",
  `current readiness: ${CURRENT_READINESS}`,
  "next safe action",
] as const;

const NEXT_RESULT_CAPTURE_REVIEW_RECOVERY_CHECKLIST = [
  "Review the deterministic in-memory synthetic result capture output before adding review and recovery previews.",
  "Keep the backend-owned minimal manual-gated synthetic dry-run result capture MVP backend-only, server-only, synthetic-only, and in-memory only.",
  "Do not create a frontend request, API route, provider/model call, provider SDK import, or persistence target.",
  "Preserve preview-only approval fixtures, preview-only manual confirmation fixtures, and blocked approval recording/token/lease paths.",
  "result capture review and recovery preview comes next",
] as const;

const BLOCKED_LIVE_PERSISTENCE_ACTIONS = [
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

const RESULT_CAPTURE_GATE_SEEDS = [
  {
    gateId: "backend-only-boundary",
    label: "backend-only boundary",
    owner: "backend-owned result capture MVP",
    requiredState: "backend-only execution path required",
    currentState: "backend-only capture path only",
    evidence: "minimal synthetic result capture MVP is backend-only",
    blockedLiveAction: "frontend-callable result capture",
  },
  {
    gateId: "server-only-module-boundary",
    label: "server-only module boundary",
    owner: "backend-owned result capture MVP",
    requiredState: "server-only adapters required",
    currentState: "server-only synthetic result capture helper exists",
    evidence: "server-only synthetic result capture helper exists",
    blockedLiveAction: "client import of capture helper",
  },
  {
    gateId: "synthetic-only-capture-mode",
    label: "synthetic-only capture mode",
    owner: "backend-owned result capture MVP",
    requiredState: "synthetic-only capture required",
    currentState: "deterministic synthetic capture only",
    evidence: "deterministic synthetic capture only",
    blockedLiveAction: "live provider-backed result capture",
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
    gateId: "synthetic-execution-result-present",
    label: "synthetic execution result present",
    owner: "backend-owned result capture MVP",
    requiredState: "synthetic execution result fixture required",
    currentState: "deterministic synthetic execution result fixture present",
    evidence: "source synthetic execution result reference stays deterministic and in memory only",
    blockedLiveAction: "result capture without synthetic execution result",
  },
  {
    gateId: "deterministic-capture-id",
    label: "deterministic capture id",
    owner: "backend-owned result capture MVP",
    requiredState: "deterministic capture id required",
    currentState: "deterministic preview capture id generated",
    evidence: "synthetic capture id is deterministic preview only",
    blockedLiveAction: "randomized capture id generation",
  },
  {
    gateId: "deterministic-digest",
    label: "deterministic digest",
    owner: "backend-owned result capture MVP",
    requiredState: "deterministic digest required",
    currentState: "deterministic preview digest generated",
    evidence: "synthetic digest is deterministic preview only",
    blockedLiveAction: "non-deterministic digest generation",
  },
  {
    gateId: "in-memory-only-result-reference",
    label: "in-memory only result reference",
    owner: "backend-owned result capture MVP",
    requiredState: "in-memory-only result reference required",
    currentState: "synthetic result capture is produced in memory only",
    evidence: "synthetic result capture is produced in memory only",
    blockedLiveAction: "persistent result reference storage",
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
    gateId: "single-run-lock-preview",
    label: "single-run lock preview",
    owner: "safety gate",
    requiredState: "single-run lock preview required",
    currentState: "single-run lock preview only",
    evidence: "single-run lock preview remains static",
    blockedLiveAction: "parallel live result capture",
  },
  {
    gateId: "idempotency-replay-preview",
    label: "idempotency/replay preview",
    owner: "safety gate",
    requiredState: "idempotency/replay preview required",
    currentState: "idempotency and replay remain preview-only",
    evidence: "idempotency/replay preview remains static",
    blockedLiveAction: "live replay and retry",
  },
  {
    gateId: "timeout-cancel-preview",
    label: "timeout/cancel preview",
    owner: "safety gate",
    requiredState: "timeout/cancel preview required",
    currentState: "timeout/cancel preview only",
    evidence: "timeout/cancel preview remains static",
    blockedLiveAction: "live timeout and cancel control",
  },
  {
    gateId: "privacy-redaction-preview",
    label: "privacy/redaction preview",
    owner: "safety gate",
    requiredState: "privacy/redaction preview required",
    currentState: "privacy/redaction preview only",
    evidence: "privacy/redaction preview remains static",
    blockedLiveAction: "live payload transmission",
  },
] as const satisfies readonly ResultCaptureGateSeed[];

const RESULT_CAPTURE_READINESS_SEEDS = [
  {
    readinessId: "server-only-capture-helper-state",
    label: "server-only capture helper state",
    state: "implemented / server-only",
    evidence: "server-only synthetic result capture helper exists",
    nextSafeAction:
      "Keep the result capture helper server-only while review and recovery preview is added next.",
  },
  {
    readinessId: "synthetic-execution-result-dependency",
    label: "synthetic execution result dependency",
    state: "implemented / deterministic fixture",
    evidence:
      "Synthetic execution result dependency stays deterministic and in memory only.",
    nextSafeAction:
      "Preserve deterministic synthetic execution result fixtures only.",
  },
  {
    readinessId: "result-capture-input-state",
    label: "result capture input state",
    state: "implemented / synthetic-only",
    evidence:
      "Synthetic result capture input is deterministic synthetic capture request only.",
    nextSafeAction:
      "Keep frontend request creation, API route creation, and persistence blocked.",
  },
  {
    readinessId: "capture-admission-check-state",
    label: "capture admission check state",
    state: "implemented / validated",
    evidence:
      "Capture admission checks validate backend-only, server-only, synthetic-only, and manual-gated fixture posture.",
    nextSafeAction: "Preserve admission checks as deterministic gate validation only.",
  },
  {
    readinessId: "capture-output-state",
    label: "capture output state",
    state: "implemented / in-memory-only",
    evidence: "synthetic result capture is produced in memory only",
    nextSafeAction: "Keep capture output preview-only and non-persistent.",
  },
  {
    readinessId: "capture-envelope-state",
    label: "capture envelope state",
    state: "implemented / preview-only",
    evidence:
      "Synthetic result capture envelope links request, response, error, and output references without persistence.",
    nextSafeAction: "Keep envelope references preview-only / not persisted.",
  },
  {
    readinessId: "audit-preview-state",
    label: "audit preview state",
    state: "implemented / preview-only",
    evidence: "no audit persistence",
    nextSafeAction: "Keep audit preview visible while audit persistence stays blocked.",
  },
  {
    readinessId: "approval-preview-state",
    label: "approval preview state",
    state: "implemented / preview-only",
    evidence: "approval fixture is preview-only",
    nextSafeAction:
      "Keep approval preview, approval token issuance, and approval lease issuance blocked.",
  },
  {
    readinessId: "evidence-packet-state",
    label: "evidence packet state",
    state: "implemented / preview-only",
    evidence: "Evidence packet is preview-only / not persisted.",
    nextSafeAction:
      "Carry evidence previews into review and recovery without persistence.",
  },
  {
    readinessId: "provider-boundary-state",
    label: "provider boundary state",
    state: "blocked",
    evidence: "no provider execution",
    nextSafeAction: "Do not enable provider execution in result capture MVP.",
  },
  {
    readinessId: "prompt-boundary-state",
    label: "prompt boundary state",
    state: "blocked",
    evidence: "no prompt sending",
    nextSafeAction: "Keep prompt sending disabled.",
  },
  {
    readinessId: "model-boundary-state",
    label: "model boundary state",
    state: "blocked",
    evidence: "no model calls",
    nextSafeAction: "Keep model calls disabled.",
  },
  {
    readinessId: "frontend-request-boundary-state",
    label: "frontend request boundary state",
    state: "blocked",
    evidence: "no frontend request is created",
    nextSafeAction: "Do not create frontend-callable result capture flows.",
  },
  {
    readinessId: "api-route-boundary-state",
    label: "API route boundary state",
    state: "blocked",
    evidence: "no API route is created",
    nextSafeAction: "Do not expose a live API route.",
  },
  {
    readinessId: "queue-boundary-state",
    label: "queue boundary state",
    state: "blocked",
    evidence: "no queue dispatch",
    nextSafeAction: "Keep queue dispatch disabled.",
  },
  {
    readinessId: "worker-boundary-state",
    label: "worker boundary state",
    state: "blocked",
    evidence: "no worker dispatch",
    nextSafeAction: "Keep worker dispatch disabled.",
  },
  {
    readinessId: "job-boundary-state",
    label: "job boundary state",
    state: "blocked",
    evidence: "no job execution",
    nextSafeAction: "Keep job execution disabled.",
  },
  {
    readinessId: "persistence-boundary-state",
    label: "persistence boundary state",
    state: "blocked",
    evidence: "no result persistence | no audit persistence | no approval persistence",
    nextSafeAction: "Keep all persistence disabled.",
  },
  {
    readinessId: "database-boundary-state",
    label: "database boundary state",
    state: "blocked",
    evidence: "no database writes",
    nextSafeAction: "Keep database writes disabled.",
  },
  {
    readinessId: "file-boundary-state",
    label: "file boundary state",
    state: "blocked",
    evidence: "no file writes",
    nextSafeAction: "Keep file writes disabled.",
  },
] as const satisfies readonly ResultCaptureReadinessSeed[];

function cloneList<T>(records: readonly T[]): readonly T[] {
  return [...records];
}

const EXECUTION_MVP_RECORDS = listMinimalManualGatedSyntheticDryRunExecutionMvpRecords();
const EXECUTION_RESULTS = listSyntheticMvpExecutionResults();
const MANUAL_APPROVAL_FIXTURES = listSyntheticMvpManualApprovalFixtures();
const EXECUTION_REVIEWS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews();
const EXECUTION_RESULT_REVIEWS = listSyntheticExecutionResultReviewRecords();
const MANUAL_APPROVAL_DECISION_REVIEWS =
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews();

function buildRecordMap<T extends { id: MinimalManualGatedSyntheticDryRunExecutionMvpId }>(
  records: readonly T[]
): ReadonlyMap<MinimalManualGatedSyntheticDryRunExecutionMvpId, T> {
  return new Map(records.map((record) => [record.id, record]));
}

const EXECUTION_MVP_RECORDS_BY_ID = buildRecordMap(EXECUTION_MVP_RECORDS);
const EXECUTION_RESULTS_BY_ID = new Map(
  EXECUTION_RESULTS.map((record) => [record.executionMvpId, record] as const)
);
const MANUAL_APPROVAL_FIXTURES_BY_ID = new Map(
  MANUAL_APPROVAL_FIXTURES.map((record) => [record.executionMvpId, record] as const)
);
const EXECUTION_REVIEWS_BY_ID = buildRecordMap(EXECUTION_REVIEWS);
const EXECUTION_RESULT_REVIEWS_BY_ID = new Map(
  EXECUTION_RESULT_REVIEWS.map((record) => [record.executionReviewId, record] as const)
);
const MANUAL_APPROVAL_DECISION_REVIEWS_BY_ID = buildRecordMap(
  MANUAL_APPROVAL_DECISION_REVIEWS
);

function resolveExecutionMvpRecord(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): MinimalManualGatedSyntheticDryRunExecutionMvpRecord {
  const record = EXECUTION_MVP_RECORDS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic execution MVP record for ${id}.`);
  }

  return record;
}

function resolveExecutionResult(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticMvpExecutionResultRecord {
  const record = EXECUTION_RESULTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic execution result for ${id}.`);
  }

  return record;
}

function resolveManualApprovalFixture(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticMvpManualApprovalFixtureRecord {
  const record = MANUAL_APPROVAL_FIXTURES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing manual approval fixture for ${id}.`);
  }

  return record;
}

function resolveExecutionReview(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord {
  const record = EXECUTION_REVIEWS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing minimal synthetic execution review for ${id}.`);
  }

  return record;
}

function resolveExecutionResultReview(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticExecutionResultReviewRecord {
  const record = EXECUTION_RESULT_REVIEWS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic execution result review for ${id}.`);
  }

  return record;
}

function resolveManualApprovalDecisionReview(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord {
  const record = MANUAL_APPROVAL_DECISION_REVIEWS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing manual approval decision review for ${id}.`);
  }

  return record;
}

function buildSyntheticResultCaptureId(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureId {
  return `synthetic-result-capture-preview:${id}`;
}

function buildSyntheticResultCaptureDigest(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureDigest {
  return `synthetic-result-capture-digest-preview:${id}:in-memory-only`;
}

function buildSyntheticResultCaptureResultReference(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureResultReference {
  return `synthetic-result-capture-result-reference-preview:${id}`;
}

function buildSyntheticResultCaptureAuditReference(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureAuditReference {
  return `synthetic-result-capture-audit-preview:${id}`;
}

function buildSyntheticResultCaptureApprovalReference(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureApprovalReference {
  return `synthetic-result-capture-approval-preview:${id}`;
}

function buildSyntheticResultCaptureEvidenceReference(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureEvidenceReference {
  return `synthetic-result-capture-evidence-preview:${id}`;
}

function buildSyntheticResultCapturePayload(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCapturePayload {
  return {
    label: "static synthetic result capture placeholder only",
    captureEnvelopeState: "preview-only",
    evidenceDigest: buildSyntheticResultCaptureDigest(id),
    auditPreviewState: "preview-only / not persisted",
    approvalPreviewState: "preview-only",
  };
}

export function buildStableMinimalSyntheticResultCaptureMvpKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): MinimalManualGatedSyntheticDryRunResultCaptureMvpKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-mvp:${id}`;
}

function buildSyntheticResultCaptureInputKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureInputKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-input:${id}`;
}

function buildSyntheticResultCaptureAdmissionCheckKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureAdmissionCheckKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-admission-check:${id}`;
}

function buildSyntheticResultCaptureOutputKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureOutputKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-output:${id}`;
}

function buildSyntheticResultCaptureEnvelopeKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureEnvelopeKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-envelope:${id}`;
}

function buildSyntheticResultCaptureAuditPreviewKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureAuditPreviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-audit-preview:${id}`;
}

function buildSyntheticResultCaptureApprovalPreviewKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureApprovalPreviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-approval-preview:${id}`;
}

function buildSyntheticResultCaptureEvidencePacketKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureEvidencePacketKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-evidence-packet:${id}`;
}

function buildSyntheticResultCaptureSafetyGateSummaryKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureSafetyGateSummaryKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-safety-gate-summary:${id}`;
}

function buildSyntheticResultCaptureBlockedLivePersistenceSummaryKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureBlockedLivePersistenceSummaryKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-blocked-live-persistence-summary:${id}`;
}

function buildSyntheticResultCaptureRequestKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureRequestKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-request:${id}`;
}

function buildSyntheticResultCaptureResponseKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureResponseKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-response:${id}`;
}

function buildSyntheticResultCaptureErrorKey(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): SyntheticResultCaptureErrorKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-error:${id}`;
}

function buildCommonRecordFields(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord,
  executionReview: BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
  executionResult: SyntheticMvpExecutionResultRecord,
  executionResultReview: SyntheticExecutionResultReviewRecord,
  decisionReview: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
  manualApprovalFixture: SyntheticMvpManualApprovalFixtureRecord
): SyntheticResultCaptureCommonRecordFields {
  return {
    stableId: executionMvpRecord.id,
    requestLabel: executionMvpRecord.requestLabel,
    label: executionMvpRecord.label,
    selectedCapabilityFamily: executionMvpRecord.selectedCapabilityFamily,
    workspaceTarget: executionMvpRecord.workspaceTarget,
    providerSlotLabel: executionMvpRecord.providerSlotLabel,
    localPrivateAlternativeLabel:
      executionMvpRecord.localPrivateAlternativeLabel,
    sourceMinimalSyntheticExecutionMvpReference: executionMvpRecord.key,
    sourceMinimalSyntheticExecutionReviewReference: executionReview.key,
    sourceSyntheticExecutionResultReference: executionResult.key,
    sourceSyntheticExecutionResultReviewReference: executionResultReview.key,
    sourceManualApprovalDecisionReviewReference: decisionReview.key,
    sourceManualApprovalFixtureReference: manualApprovalFixture.key,
    sourceManualConfirmationFixtureReference: manualApprovalFixture.key,
    backendOwnedPosture: "backend-owned",
    serverOnlyPosture: "server-only",
    syntheticOnlyPosture: "synthetic-only",
    manualGatedPosture: "manual-gated",
    inMemoryOnlyPosture: "in-memory-only",
    noProviderExecution: "no provider execution",
    noModelCalls: "no model calls",
    noPromptSending: "no prompt sending",
    noFrontendRequest: "no frontend request",
    noApiRoute: "no API route",
    noQueueWorkerJobDispatch: "no queue/worker/job dispatch",
    noPersistence: "no persistence",
    noDatabaseWrites: "no database writes",
    noFileWrites: "no file writes",
    noApprovalRecording: "no approval recording",
    noApprovalTokenIssuance: "no approval token issuance",
    noApprovalLeaseIssuance: "no approval lease issuance",
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

function buildResultCaptureMvpRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    id: executionMvpRecord.id,
    key: buildStableMinimalSyntheticResultCaptureMvpKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-mvp-v1",
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildInputRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureInputRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureInputKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-input-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    requestState: "deterministic synthetic capture request only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    resultPayloadPosture: "deterministic synthetic result fixture only",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoPersistenceStatement:
      "No frontend request. No API route. No persistence.",
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildAdmissionCheckRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureAdmissionCheckRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureAdmissionCheckKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-admission-check-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    backendOwnedModeState: "validated",
    serverOnlyModeState: "validated",
    syntheticOnlyModeState: "validated",
    manualGatedFixtureModeState: "validated",
    approvalFixturePreviewState: "validated",
    manualConfirmationPreviewState: "validated",
    syntheticExecutionResultPresentState: "validated",
    providerResponseBlockedState: "validated",
    modelOutputBlockedState: "validated",
    promptSendingBlockedState: "validated",
    frontendRequestBlockedState: "validated",
    apiRouteBlockedState: "validated",
    persistenceBlockedState: "validated",
    databaseFileWriteBlockedState: "validated",
    queueWorkerJobDispatchBlockedState: "validated",
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildOutputRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureOutputRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureOutputKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-output-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    captureState: "captured-synthetic-in-memory-only",
    resultState: "deterministic synthetic result captured in memory only",
    syntheticResultId: executionResult.resultId,
    syntheticCaptureId: buildSyntheticResultCaptureId(executionMvpRecord.id),
    syntheticDigest: buildSyntheticResultCaptureDigest(executionMvpRecord.id),
    resultReference: buildSyntheticResultCaptureResultReference(
      executionMvpRecord.id
    ),
    auditReference: buildSyntheticResultCaptureAuditReference(
      executionMvpRecord.id
    ),
    approvalReference: buildSyntheticResultCaptureApprovalReference(
      executionMvpRecord.id
    ),
    resultPayload: buildSyntheticResultCapturePayload(executionMvpRecord.id),
    captureTimestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    deterministicSyntheticCaptureStatement:
      "deterministic synthetic capture only",
    inMemoryOnlyCaptureStatement:
      "synthetic result capture is produced in memory only",
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildEnvelopeRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureEnvelopeRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureEnvelopeKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-envelope-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    requestReference: buildSyntheticResultCaptureRequestKey(executionMvpRecord.id),
    responseReference:
      buildSyntheticResultCaptureResponseKey(executionMvpRecord.id),
    errorReference: buildSyntheticResultCaptureErrorKey(executionMvpRecord.id),
    outputReference: buildSyntheticResultCaptureOutputKey(executionMvpRecord.id),
    captureState: "captured-synthetic-in-memory-only",
    resultState: "deterministic synthetic result captured in memory only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitSyntheticCaptureOnlyNoProviderOutputNoPersistenceStatement:
      "Synthetic capture only. No provider output. No persistence.",
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildAuditPreviewRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureAuditPreviewRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureAuditPreviewKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-audit-preview-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    auditReference: buildSyntheticResultCaptureAuditReference(
      executionMvpRecord.id
    ),
    auditState: "preview-only / not persisted",
    auditSummaryLines: [
      `source synthetic execution result: ${executionResult.key}`,
      `source execution review: ${executionReview.key}`,
      `source execution result review: ${executionResultReview.key}`,
      "audit preview required",
      "no audit persistence",
    ],
    explicitNoAuditPersistenceStatement: "no audit persistence",
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildApprovalPreviewRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureApprovalPreviewRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureApprovalPreviewKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-approval-preview-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    approvalReference: buildSyntheticResultCaptureApprovalReference(
      executionMvpRecord.id
    ),
    approvalState: "preview-only / not persisted",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    explicitNoApprovalPersistenceStatement: "no approval persistence",
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildEvidencePacketRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureEvidencePacketRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureEvidencePacketKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-evidence-packet-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    evidenceReference: buildSyntheticResultCaptureEvidenceReference(
      executionMvpRecord.id
    ),
    evidencePacketState: "preview-only / not persisted",
    evidenceSummaryLines: [
      `source execution result id: ${executionResult.resultId}`,
      `capture digest: ${buildSyntheticResultCaptureDigest(executionMvpRecord.id)}`,
      "preview-only evidence packet",
      "no audit persistence",
      "no approval persistence",
    ],
    syntheticDigest: buildSyntheticResultCaptureDigest(executionMvpRecord.id),
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildSafetyGateSummaryRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureSafetyGateSummaryRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureSafetyGateSummaryKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-safety-gate-summary-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    serverOnlyHelperStatement:
      "server-only synthetic result capture helper exists",
    noFrontendRequestStatement: "no frontend request is created",
    noApiRouteStatement: "no API route is created",
    deterministicSyntheticCaptureStatement:
      "deterministic synthetic capture only",
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RESULT_CAPTURE_SUMMARY_LINES),
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildBlockedLivePersistenceSummaryRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureBlockedLivePersistenceSummaryRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureBlockedLivePersistenceSummaryKey(
      executionMvpRecord.id
    ),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-blocked-live-persistence-summary-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    blockedLiveActions: cloneList(BLOCKED_LIVE_PERSISTENCE_ACTIONS),
    noRealApprovalRequestStatement: "no real approval request",
    noRealApprovalRecordingStatement: "no real approval recording",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildRequestRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureRequestRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureRequestKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-request-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    requestState: "deterministic synthetic capture request only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    resultPayloadPosture: "deterministic synthetic result fixture only",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoPersistenceStatement:
      "No frontend request. No API route. No persistence.",
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildResponseRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureResponseRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureResponseKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-response-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    responseState: "returned by server-only smoke/helper only",
    captureState: "captured-synthetic-in-memory-only",
    resultState: "deterministic synthetic result captured in memory only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitSyntheticCaptureOnlyNoProviderOutputNoPersistenceStatement:
      "Synthetic capture only. No provider output. No persistence.",
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildErrorRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord
): SyntheticResultCaptureErrorRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    key: buildSyntheticResultCaptureErrorKey(executionMvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-error-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    errorState: "deterministic preview only",
    failedGateExamples: cloneList(RESULT_CAPTURE_GATE_SUMMARY_LINES),
    missingSyntheticExecutionResultExample:
      "If the synthetic execution result fixture were missing, result capture would reject admission immediately.",
    missingManualApprovalFixtureExample:
      "If the preview-only manual approval fixture were missing, result capture would reject admission immediately.",
    providerResponseDetectedExample:
      "If a provider response were detected, result capture would reject the request because provider output must remain absent.",
    modelOutputDetectedExample:
      "If model output were detected, result capture would reject the request because model output must remain absent.",
    promptSentDetectedExample:
      "If prompt sending were detected, result capture would reject the request because prompt sending is blocked.",
    persistenceAttemptedExample:
      "If result, audit, or approval persistence were attempted, result capture would reject the request because persistence is blocked.",
    databaseWriteAttemptedExample:
      "If a database write were attempted, result capture would reject the request because database writes are blocked.",
    fileWriteAttemptedExample:
      "If a file write were attempted, result capture would reject the request because file writes are blocked.",
    queueWorkerJobAttemptedExample:
      "If queue, worker, or job dispatch were attempted, result capture would reject the request because execution dispatch is blocked.",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    explicitNoLiveErrorNoRetryNoFallbackStatement:
      "No live error. No retry. No fallback.",
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
  };
}

function buildGateRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord,
  seed: ResultCaptureGateSeed
): SyntheticResultCaptureGateRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
    key: `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-gate:${executionMvpRecord.id}:${seed.gateId}`,
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-gate-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    gateId: seed.gateId,
    label: seed.label,
    owner: seed.owner,
    requiredState: seed.requiredState,
    currentState: seed.currentState,
    evidence: `${seed.evidence}. Source result: ${executionResult.key}.`,
    blockedLiveAction: seed.blockedLiveAction,
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

function buildReadinessMatrixRecord(
  executionMvpRecord: MinimalManualGatedSyntheticDryRunExecutionMvpRecord,
  seed: ResultCaptureReadinessSeed
): SyntheticResultCaptureReadinessMatrixRecord {
  const executionReview = resolveExecutionReview(executionMvpRecord.id);
  const executionResult = resolveExecutionResult(executionMvpRecord.id);
  const executionResultReview = resolveExecutionResultReview(executionMvpRecord.id);
  const decisionReview = resolveManualApprovalDecisionReview(executionMvpRecord.id);
  const manualApprovalFixture = resolveManualApprovalFixture(executionMvpRecord.id);

  return {
    ...buildCommonRecordFields(
      executionMvpRecord,
      executionReview,
      executionResult,
      executionResultReview,
      decisionReview,
      manualApprovalFixture
    ),
    key: `backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-readiness:${executionMvpRecord.id}:${seed.readinessId}`,
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-readiness-matrix-v1",
    resultCaptureMvpId: executionMvpRecord.id,
    readinessId: seed.readinessId,
    label: seed.label,
    state: seed.state,
    evidence: `${seed.evidence}. Source result: ${executionResult.key}.`,
    currentReadiness: CURRENT_READINESS,
    nextSafeAction: seed.nextSafeAction,
  };
}

const RESULT_CAPTURE_MVP_RECORDS = EXECUTION_MVP_RECORDS.map(
  buildResultCaptureMvpRecord
);
const RESULT_CAPTURE_INPUT_RECORDS = EXECUTION_MVP_RECORDS.map(buildInputRecord);
const RESULT_CAPTURE_ADMISSION_CHECK_RECORDS = EXECUTION_MVP_RECORDS.map(
  buildAdmissionCheckRecord
);
const RESULT_CAPTURE_OUTPUT_RECORDS = EXECUTION_MVP_RECORDS.map(
  buildOutputRecord
);
const RESULT_CAPTURE_ENVELOPE_RECORDS = EXECUTION_MVP_RECORDS.map(
  buildEnvelopeRecord
);
const RESULT_CAPTURE_AUDIT_PREVIEW_RECORDS = EXECUTION_MVP_RECORDS.map(
  buildAuditPreviewRecord
);
const RESULT_CAPTURE_APPROVAL_PREVIEW_RECORDS = EXECUTION_MVP_RECORDS.map(
  buildApprovalPreviewRecord
);
const RESULT_CAPTURE_EVIDENCE_PACKET_RECORDS = EXECUTION_MVP_RECORDS.map(
  buildEvidencePacketRecord
);
const RESULT_CAPTURE_SAFETY_GATE_SUMMARY_RECORDS = EXECUTION_MVP_RECORDS.map(
  buildSafetyGateSummaryRecord
);
const RESULT_CAPTURE_BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORDS =
  EXECUTION_MVP_RECORDS.map(buildBlockedLivePersistenceSummaryRecord);
const RESULT_CAPTURE_REQUEST_RECORDS = EXECUTION_MVP_RECORDS.map(
  buildRequestRecord
);
const RESULT_CAPTURE_RESPONSE_RECORDS = EXECUTION_MVP_RECORDS.map(
  buildResponseRecord
);
const RESULT_CAPTURE_ERROR_RECORDS = EXECUTION_MVP_RECORDS.map(
  buildErrorRecord
);
const RESULT_CAPTURE_GATE_RECORDS = EXECUTION_MVP_RECORDS.flatMap((record) =>
  RESULT_CAPTURE_GATE_SEEDS.map((seed) => buildGateRecord(record, seed))
);
const RESULT_CAPTURE_READINESS_MATRIX_RECORDS = EXECUTION_MVP_RECORDS.flatMap(
  (record) =>
    RESULT_CAPTURE_READINESS_SEEDS.map((seed) =>
      buildReadinessMatrixRecord(record, seed)
    )
);

export function listMinimalManualGatedSyntheticDryRunResultCaptureMvpRecords(): readonly MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord[] {
  return cloneList(RESULT_CAPTURE_MVP_RECORDS);
}

export function listSyntheticResultCaptureInputs(): readonly SyntheticResultCaptureInputRecord[] {
  return cloneList(RESULT_CAPTURE_INPUT_RECORDS);
}

export function listSyntheticResultCaptureAdmissionChecks(): readonly SyntheticResultCaptureAdmissionCheckRecord[] {
  return cloneList(RESULT_CAPTURE_ADMISSION_CHECK_RECORDS);
}

export function listSyntheticResultCaptureOutputs(): readonly SyntheticResultCaptureOutputRecord[] {
  return cloneList(RESULT_CAPTURE_OUTPUT_RECORDS);
}

export function listSyntheticResultCaptureEnvelopes(): readonly SyntheticResultCaptureEnvelopeRecord[] {
  return cloneList(RESULT_CAPTURE_ENVELOPE_RECORDS);
}

export function listSyntheticResultCaptureAuditPreviews(): readonly SyntheticResultCaptureAuditPreviewRecord[] {
  return cloneList(RESULT_CAPTURE_AUDIT_PREVIEW_RECORDS);
}

export function listSyntheticResultCaptureApprovalPreviews(): readonly SyntheticResultCaptureApprovalPreviewRecord[] {
  return cloneList(RESULT_CAPTURE_APPROVAL_PREVIEW_RECORDS);
}

export function listSyntheticResultCaptureEvidencePackets(): readonly SyntheticResultCaptureEvidencePacketRecord[] {
  return cloneList(RESULT_CAPTURE_EVIDENCE_PACKET_RECORDS);
}

export function listSyntheticResultCaptureSafetyGateSummaries(): readonly SyntheticResultCaptureSafetyGateSummaryRecord[] {
  return cloneList(RESULT_CAPTURE_SAFETY_GATE_SUMMARY_RECORDS);
}

export function listSyntheticResultCaptureBlockedLivePersistenceSummaries(): readonly SyntheticResultCaptureBlockedLivePersistenceSummaryRecord[] {
  return cloneList(RESULT_CAPTURE_BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORDS);
}

export function listSyntheticResultCaptureRequestRecords(): readonly SyntheticResultCaptureRequestRecord[] {
  return cloneList(RESULT_CAPTURE_REQUEST_RECORDS);
}

export function listSyntheticResultCaptureResponseRecords(): readonly SyntheticResultCaptureResponseRecord[] {
  return cloneList(RESULT_CAPTURE_RESPONSE_RECORDS);
}

export function listSyntheticResultCaptureErrorRecords(): readonly SyntheticResultCaptureErrorRecord[] {
  return cloneList(RESULT_CAPTURE_ERROR_RECORDS);
}

export function listSyntheticResultCaptureGates(): readonly SyntheticResultCaptureGateRecord[] {
  return cloneList(RESULT_CAPTURE_GATE_RECORDS);
}

export function listSyntheticResultCaptureReadinessMatrixRecords(): readonly SyntheticResultCaptureReadinessMatrixRecord[] {
  return cloneList(RESULT_CAPTURE_READINESS_MATRIX_RECORDS);
}

export function groupMinimalManualGatedSyntheticDryRunResultCaptureMvpsByCapabilityFamily(): readonly MinimalManualGatedSyntheticDryRunResultCaptureMvpCapabilityFamilyGroup[] {
  const grouped = new Map<
    MinimalManualGatedSyntheticDryRunExecutionMvpRecord["selectedCapabilityFamily"]["id"],
    MinimalManualGatedSyntheticDryRunResultCaptureMvpCapabilityFamilyGroup
  >();

  RESULT_CAPTURE_MVP_RECORDS.forEach((record) => {
    const existing = grouped.get(record.selectedCapabilityFamily.id);

    if (existing) {
      grouped.set(record.selectedCapabilityFamily.id, {
        ...existing,
        captureCount: existing.captureCount + 1,
      });
      return;
    }

    grouped.set(record.selectedCapabilityFamily.id, {
      capabilityFamilyId: record.selectedCapabilityFamily.id,
      capabilityFamilyLabel: record.selectedCapabilityFamily.label,
      captureCount: 1,
    });
  });

  return Array.from(grouped.values()).sort((left, right) =>
    left.capabilityFamilyLabel.localeCompare(right.capabilityFamilyLabel)
  );
}

export function groupMinimalManualGatedSyntheticDryRunResultCaptureMvpsByWorkspaceTarget(): readonly MinimalManualGatedSyntheticDryRunResultCaptureMvpWorkspaceGroup[] {
  const grouped = new Map<
    MinimalManualGatedSyntheticDryRunExecutionMvpRecord["workspaceTarget"],
    MinimalManualGatedSyntheticDryRunResultCaptureMvpWorkspaceGroup
  >();

  RESULT_CAPTURE_MVP_RECORDS.forEach((record) => {
    const existing = grouped.get(record.workspaceTarget);

    if (existing) {
      grouped.set(record.workspaceTarget, {
        ...existing,
        captureCount: existing.captureCount + 1,
      });
      return;
    }

    grouped.set(record.workspaceTarget, {
      workspaceTarget: record.workspaceTarget,
      captureCount: 1,
    });
  });

  return Array.from(grouped.values()).sort((left, right) =>
    left.workspaceTarget.localeCompare(right.workspaceTarget)
  );
}

export function buildSyntheticResultCaptureSummary(): SyntheticResultCaptureSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-summary-v1",
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_MVP_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    captureCount: RESULT_CAPTURE_MVP_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RESULT_CAPTURE_SUMMARY_LINES),
    nextSafeAction:
      "Keep the MVP backend-only, server-only, deterministic, and in-memory only while result capture review and recovery preview is defined next.",
  };
}

export function buildSyntheticResultCaptureGateSummary(): SyntheticResultCaptureGateSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-gate-summary-v1",
    gateCount: RESULT_CAPTURE_GATE_SEEDS.length,
    blockedGateCount: RESULT_CAPTURE_GATE_SEEDS.length,
    summaryLines: cloneList(RESULT_CAPTURE_GATE_SUMMARY_LINES),
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

export function buildSyntheticResultCaptureReadinessSummary(): SyntheticResultCaptureReadinessSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-readiness-summary-v1",
    readinessCount: RESULT_CAPTURE_READINESS_SEEDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RESULT_CAPTURE_READINESS_SUMMARY_LINES),
    nextSafeAction:
      "Advance to result capture review and recovery preview without creating a frontend request, API route, provider/model call, queue dispatch, worker dispatch, job execution, or persistence path.",
  };
}

export function buildNextResultCaptureReviewRecoveryChecklist(): readonly string[] {
  return cloneList(NEXT_RESULT_CAPTURE_REVIEW_RECOVERY_CHECKLIST);
}
