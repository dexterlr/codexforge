import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews,
  type BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
} from "../minimal-synth-exec-review";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviews,
  listSyntheticResultCaptureOutputReviewRecords,
  type BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord,
  type SyntheticResultCaptureOutputReviewRecord,
} from "../min-synth-capture-review";
import {
  listMinimalManualGatedSyntheticDryRunResultCaptureMvpRecords,
  listSyntheticResultCaptureApprovalPreviews,
  listSyntheticResultCaptureAuditPreviews,
  listSyntheticResultCaptureEvidencePackets,
  listSyntheticResultCaptureOutputs,
  type MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord,
  type SyntheticResultCaptureApprovalPreviewRecord,
  type SyntheticResultCaptureAuditPreviewRecord,
  type SyntheticResultCaptureEvidencePacketRecord,
  type SyntheticResultCaptureOutputRecord,
} from "../min-synth-result-capture";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
  type BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listSyntheticMvpManualApprovalFixtures,
  type SyntheticMvpManualApprovalFixtureRecord,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpCapabilityFamilyGroup,
  type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId,
  type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpKey,
  type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecord,
  type MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpWorkspaceGroup,
  type SyntheticApprovalJoinOutputKey,
  type SyntheticApprovalJoinOutputRecord,
  type SyntheticApprovalJoinPreviewKey,
  type SyntheticApprovalJoinPreviewRecord,
  type SyntheticAuditApprovalEvidencePacketKey,
  type SyntheticAuditApprovalEvidencePacketRecord,
  type SyntheticAuditApprovalJoinAdmissionCheckKey,
  type SyntheticAuditApprovalJoinAdmissionCheckRecord,
  type SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryKey,
  type SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryRecord,
  type SyntheticAuditApprovalJoinCommonRecordFields,
  type SyntheticAuditApprovalJoinCurrentReadiness,
  type SyntheticAuditApprovalJoinDigest,
  type SyntheticAuditApprovalJoinEnvelopeKey,
  type SyntheticAuditApprovalJoinEnvelopeRecord,
  type SyntheticAuditApprovalJoinErrorKey,
  type SyntheticAuditApprovalJoinErrorRecord,
  type SyntheticAuditApprovalJoinEvidenceReference,
  type SyntheticAuditApprovalJoinGateId,
  type SyntheticAuditApprovalJoinGateRecord,
  type SyntheticAuditApprovalJoinGateSummary,
  type SyntheticAuditApprovalJoinInputKey,
  type SyntheticAuditApprovalJoinInputRecord,
  type SyntheticAuditApprovalJoinPayload,
  type SyntheticAuditApprovalJoinPreviewReferenceState,
  type SyntheticAuditApprovalJoinReadinessMatrixId,
  type SyntheticAuditApprovalJoinReadinessMatrixRecord,
  type SyntheticAuditApprovalJoinReadinessSummary,
  type SyntheticAuditApprovalJoinRequestKey,
  type SyntheticAuditApprovalJoinRequestRecord,
  type SyntheticAuditApprovalJoinResponseKey,
  type SyntheticAuditApprovalJoinResponseRecord,
  type SyntheticAuditApprovalJoinResultReference,
  type SyntheticAuditApprovalJoinSafetyGateSummaryKey,
  type SyntheticAuditApprovalJoinSafetyGateSummaryRecord,
  type SyntheticAuditApprovalJoinSummary,
  type SyntheticAuditApprovalJoinAuditReference,
  type SyntheticAuditApprovalJoinApprovalReference,
  type SyntheticAuditApprovalJoinInputVersion,
  type SyntheticAuditJoinId,
  type SyntheticAuditJoinOutputKey,
  type SyntheticAuditJoinOutputRecord,
  type SyntheticAuditJoinPreviewKey,
  type SyntheticAuditJoinPreviewRecord,
  type SyntheticApprovalJoinId,
  type SyntheticAuditApprovalJoinResponseStatement,
  type SyntheticAuditApprovalJoinErrorStatement,
} from "./min-synth-audit-join-types";

type JoinSourceBundle = Readonly<{
  mvpRecord: MinimalManualGatedSyntheticDryRunResultCaptureMvpRecord;
  reviewRecord: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord;
  outputRecord: SyntheticResultCaptureOutputRecord;
  outputReviewRecord: SyntheticResultCaptureOutputReviewRecord;
  executionReviewRecord: BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord;
  manualApprovalDecisionReviewRecord: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord;
  manualApprovalFixtureRecord: SyntheticMvpManualApprovalFixtureRecord;
  auditPreviewRecord: SyntheticResultCaptureAuditPreviewRecord;
  approvalPreviewRecord: SyntheticResultCaptureApprovalPreviewRecord;
  evidencePacketRecord: SyntheticResultCaptureEvidencePacketRecord;
}>;

type JoinGateSeed = Readonly<{
  gateId: SyntheticAuditApprovalJoinGateId;
  label: string;
  owner: string;
  requiredState: string;
  currentState: string;
  evidence: string;
  blockedLiveAction: string;
}>;

type JoinReadinessSeed = Readonly<{
  readinessId: SyntheticAuditApprovalJoinReadinessMatrixId;
  label: string;
  state: string;
  evidence: string;
  nextSafeAction: string;
}>;

const CURRENT_READINESS: SyntheticAuditApprovalJoinCurrentReadiness =
  "minimal-synthetic-audit-approval-join-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent";

const SYNTHETIC_AUDIT_APPROVAL_JOIN_SUMMARY_LINES = [
  "backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP only",
  "minimal synthetic audit and approval join MVP is backend-only",
  "server-only synthetic audit and approval join helper exists",
  "synthetic audit and approval join is produced in memory only",
  "deterministic synthetic audit and approval join only",
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
  "backend-owned minimal manual-gated synthetic dry-run audit and approval join review and recovery preview next",
] as const;

const SYNTHETIC_AUDIT_APPROVAL_JOIN_GATE_SUMMARY_LINES = [
  "backend-only boundary",
  "server-only module boundary",
  "synthetic-only join mode",
  "manual approval fixture",
  "manual confirmation fixture",
  "synthetic result capture present",
  "deterministic audit join id",
  "deterministic approval join id",
  "deterministic join digest",
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

const SYNTHETIC_AUDIT_APPROVAL_JOIN_READINESS_SUMMARY_LINES = [
  "server-only join helper state",
  "synthetic result capture dependency",
  "audit preview dependency",
  "approval preview dependency",
  "audit and approval join input state",
  "join admission check state",
  "audit join output state",
  "approval join output state",
  "join envelope state",
  "evidence packet state",
  "provider boundary state",
  "prompt boundary state",
  "model boundary state",
  "frontend request boundary state",
  "API route boundary state",
  "queue boundary state",
  "worker boundary state",
  "job boundary state",
  "result persistence boundary state",
  "audit persistence boundary state",
  "approval persistence boundary state",
  "database boundary state",
  "file boundary state",
  `current readiness: ${CURRENT_READINESS}`,
  "next safe action",
] as const;

const NEXT_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_CHECKLIST = [
  "Review the deterministic in-memory audit and approval join envelope before adding review and recovery previews.",
  "Keep the backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP backend-only, server-only, synthetic-only, and in-memory only.",
  "Do not create a frontend request, API route, provider/model call, provider SDK import, or persistence target.",
  "Preserve preview-only approval fixtures, preview-only manual confirmation fixtures, and blocked approval recording/token/lease paths.",
  "audit and approval join review and recovery preview comes next",
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

const JOIN_GATE_SEEDS = [
  {
    gateId: "backend-only-boundary",
    label: "backend-only boundary",
    owner: "backend-owned audit approval join MVP",
    requiredState: "backend-only execution path required",
    currentState: "backend-only join path only",
    evidence: "minimal synthetic audit and approval join MVP is backend-only",
    blockedLiveAction: "frontend-callable audit approval join",
  },
  {
    gateId: "server-only-module-boundary",
    label: "server-only module boundary",
    owner: "backend-owned audit approval join MVP",
    requiredState: "server-only adapters required",
    currentState: "server-only synthetic audit and approval join helper exists",
    evidence: "server-only synthetic audit and approval join helper exists",
    blockedLiveAction: "client import of join helper",
  },
  {
    gateId: "synthetic-only-join-mode",
    label: "synthetic-only join mode",
    owner: "backend-owned audit approval join MVP",
    requiredState: "synthetic-only join required",
    currentState: "deterministic synthetic audit and approval join only",
    evidence: "deterministic synthetic audit and approval join only",
    blockedLiveAction: "live provider-backed audit approval join",
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
    gateId: "synthetic-result-capture-present",
    label: "synthetic result capture present",
    owner: "backend-owned audit approval join MVP",
    requiredState: "synthetic result capture fixture required",
    currentState: "deterministic synthetic result capture fixture present",
    evidence: "source synthetic result capture output reference stays deterministic and in memory only",
    blockedLiveAction: "join without synthetic result capture output",
  },
  {
    gateId: "deterministic-audit-join-id",
    label: "deterministic audit join id",
    owner: "backend-owned audit approval join MVP",
    requiredState: "deterministic audit join id required",
    currentState: "deterministic preview audit join id generated",
    evidence: "synthetic audit join id is deterministic preview only",
    blockedLiveAction: "randomized audit join id generation",
  },
  {
    gateId: "deterministic-approval-join-id",
    label: "deterministic approval join id",
    owner: "backend-owned audit approval join MVP",
    requiredState: "deterministic approval join id required",
    currentState: "deterministic preview approval join id generated",
    evidence: "synthetic approval join id is deterministic preview only",
    blockedLiveAction: "randomized approval join id generation",
  },
  {
    gateId: "deterministic-join-digest",
    label: "deterministic join digest",
    owner: "backend-owned audit approval join MVP",
    requiredState: "deterministic join digest required",
    currentState: "deterministic preview join digest generated",
    evidence: "synthetic join digest is deterministic preview only",
    blockedLiveAction: "non-deterministic join digest generation",
  },
  {
    gateId: "in-memory-only-result-reference",
    label: "in-memory only result reference",
    owner: "backend-owned audit approval join MVP",
    requiredState: "in-memory-only result reference required",
    currentState: "synthetic audit and approval join is produced in memory only",
    evidence: "synthetic audit and approval join is produced in memory only",
    blockedLiveAction: "persistent result reference storage",
  },
  {
    gateId: "in-memory-only-audit-reference",
    label: "in-memory only audit reference",
    owner: "backend-owned audit approval join MVP",
    requiredState: "preview-only audit reference required",
    currentState: "audit reference state: preview-only / not persisted",
    evidence: "audit reference stays preview-only / not persisted",
    blockedLiveAction: "persistent audit reference storage",
  },
  {
    gateId: "in-memory-only-approval-reference",
    label: "in-memory only approval reference",
    owner: "backend-owned audit approval join MVP",
    requiredState: "preview-only approval reference required",
    currentState: "approval reference state: preview-only / not persisted",
    evidence: "approval reference stays preview-only / not persisted",
    blockedLiveAction: "persistent approval reference storage",
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
    currentState: "frontend network posture blocked",
    evidence: "no frontend fetch/network call",
    blockedLiveAction: "network request from frontend or helper",
  },
  {
    gateId: "no-provider-sdk-import",
    label: "no provider SDK import",
    owner: "safety gate",
    requiredState: "no provider SDK imports",
    currentState: "provider SDK import state: not imported",
    evidence: "no provider SDK imports",
    blockedLiveAction: "provider SDK import",
  },
  {
    gateId: "no-provider-execution",
    label: "no provider execution",
    owner: "safety gate",
    requiredState: "no provider execution",
    currentState: "provider execution state: blocked",
    evidence: "no provider execution",
    blockedLiveAction: "provider execution",
  },
  {
    gateId: "no-model-call",
    label: "no model call",
    owner: "safety gate",
    requiredState: "no model calls",
    currentState: "model output state: not generated",
    evidence: "no LLM/model calls",
    blockedLiveAction: "model call",
  },
  {
    gateId: "no-prompt-sending",
    label: "no prompt sending",
    owner: "safety gate",
    requiredState: "no prompt sending",
    currentState: "prompt state: not sent",
    evidence: "no prompt sending",
    blockedLiveAction: "prompt sending",
  },
  {
    gateId: "no-queue-dispatch",
    label: "no queue dispatch",
    owner: "safety gate",
    requiredState: "queue dispatch blocked",
    currentState: "queue dispatch state: blocked",
    evidence: "no queue dispatch",
    blockedLiveAction: "queue dispatch",
  },
  {
    gateId: "no-worker-dispatch",
    label: "no worker dispatch",
    owner: "safety gate",
    requiredState: "worker dispatch blocked",
    currentState: "worker dispatch state: blocked",
    evidence: "no worker dispatch",
    blockedLiveAction: "worker dispatch",
  },
  {
    gateId: "no-job-execution",
    label: "no job execution",
    owner: "safety gate",
    requiredState: "job execution blocked",
    currentState: "job execution state: blocked",
    evidence: "no job execution",
    blockedLiveAction: "job execution",
  },
  {
    gateId: "no-result-persistence",
    label: "no result persistence",
    owner: "safety gate",
    requiredState: "result persistence blocked",
    currentState: "result persistence state: not implemented",
    evidence: "no result persistence",
    blockedLiveAction: "result persistence",
  },
  {
    gateId: "no-audit-persistence",
    label: "no audit persistence",
    owner: "safety gate",
    requiredState: "audit persistence blocked",
    currentState: "audit persistence state: not implemented",
    evidence: "no audit persistence",
    blockedLiveAction: "audit persistence",
  },
  {
    gateId: "no-approval-persistence",
    label: "no approval persistence",
    owner: "safety gate",
    requiredState: "approval persistence blocked",
    currentState: "approval persistence state: not implemented",
    evidence: "no approval persistence",
    blockedLiveAction: "approval persistence",
  },
  {
    gateId: "no-database-write",
    label: "no database write",
    owner: "safety gate",
    requiredState: "database writes blocked",
    currentState: "database write state: not implemented",
    evidence: "no database writes",
    blockedLiveAction: "database write",
  },
  {
    gateId: "no-file-write",
    label: "no file write",
    owner: "safety gate",
    requiredState: "file writes blocked",
    currentState: "file write state: not implemented",
    evidence: "no file writes",
    blockedLiveAction: "file write",
  },
  {
    gateId: "single-run-lock-preview",
    label: "single-run lock preview",
    owner: "safety review",
    requiredState: "single-run lock preview required",
    currentState: "preview-only lock posture",
    evidence: "single-run lock preview",
    blockedLiveAction: "concurrent live join execution",
  },
  {
    gateId: "idempotency-replay-preview",
    label: "idempotency/replay preview",
    owner: "safety review",
    requiredState: "idempotency/replay preview required",
    currentState: "preview-only replay posture",
    evidence: "idempotency/replay preview",
    blockedLiveAction: "replay without review",
  },
  {
    gateId: "timeout-cancel-preview",
    label: "timeout/cancel preview",
    owner: "safety review",
    requiredState: "timeout/cancel preview required",
    currentState: "preview-only timeout posture",
    evidence: "timeout/cancel preview",
    blockedLiveAction: "unbounded live join runtime",
  },
  {
    gateId: "privacy-redaction-preview",
    label: "privacy/redaction preview",
    owner: "safety review",
    requiredState: "privacy/redaction preview required",
    currentState: "preview-only redaction posture",
    evidence: "privacy/redaction preview",
    blockedLiveAction: "unredacted live evidence persistence",
  },
] as const satisfies readonly JoinGateSeed[];

const JOIN_READINESS_SEEDS = [
  {
    readinessId: "server-only-join-helper-state",
    label: "server-only join helper state",
    state: "implemented / server-only",
    evidence: "server-only synthetic audit and approval join helper exists",
    nextSafeAction:
      "Keep the join helper server-only while review and recovery preview is added next.",
  },
  {
    readinessId: "synthetic-result-capture-dependency",
    label: "synthetic result capture dependency",
    state: "ready / deterministic preview only",
    evidence: "synthetic result capture is produced in memory only",
    nextSafeAction: "Keep the deterministic result capture fixture unchanged.",
  },
  {
    readinessId: "audit-preview-dependency",
    label: "audit preview dependency",
    state: "ready / preview-only",
    evidence: "audit preview remains preview-only / not persisted",
    nextSafeAction: "Keep audit preview in memory only.",
  },
  {
    readinessId: "approval-preview-dependency",
    label: "approval preview dependency",
    state: "ready / preview-only",
    evidence: "approval preview remains preview-only / not persisted",
    nextSafeAction: "Keep approval preview in memory only.",
  },
  {
    readinessId: "audit-approval-join-input-state",
    label: "audit and approval join input state",
    state: "implemented / deterministic preview only",
    evidence: "deterministic synthetic join request only",
    nextSafeAction: "Keep request input free of provider payloads and persistence targets.",
  },
  {
    readinessId: "join-admission-check-state",
    label: "join admission check state",
    state: "implemented / deterministic preview only",
    evidence: "join admission gates validate preview-only fixtures and blocked live actions",
    nextSafeAction: "Keep admission validation deterministic and server-only.",
  },
  {
    readinessId: "audit-join-output-state",
    label: "audit join output state",
    state: "implemented / in-memory only",
    evidence: "deterministic synthetic audit join in memory only",
    nextSafeAction: "Keep audit join output preview-only and not persisted.",
  },
  {
    readinessId: "approval-join-output-state",
    label: "approval join output state",
    state: "implemented / in-memory only",
    evidence: "deterministic synthetic approval join in memory only",
    nextSafeAction: "Keep approval join output preview-only and not persisted.",
  },
  {
    readinessId: "join-envelope-state",
    label: "join envelope state",
    state: "implemented / preview-only",
    evidence: "Synthetic join only. No provider output. No persistence.",
    nextSafeAction: "Keep join envelope limited to synthetic references.",
  },
  {
    readinessId: "evidence-packet-state",
    label: "evidence packet state",
    state: "implemented / preview-only",
    evidence: "preview-only / not persisted",
    nextSafeAction: "Keep evidence packet preview-only and synthetic.",
  },
  {
    readinessId: "provider-boundary-state",
    label: "provider boundary state",
    state: "blocked / not provider-capable",
    evidence: "no provider execution",
    nextSafeAction: "Do not connect provider SDKs or provider execution.",
  },
  {
    readinessId: "prompt-boundary-state",
    label: "prompt boundary state",
    state: "blocked / no prompt sending",
    evidence: "no prompt sending",
    nextSafeAction: "Do not send prompts from this MVP.",
  },
  {
    readinessId: "model-boundary-state",
    label: "model boundary state",
    state: "blocked / no model calls",
    evidence: "no LLM/model calls",
    nextSafeAction: "Keep model output absent and deterministic.",
  },
  {
    readinessId: "frontend-request-boundary-state",
    label: "frontend request boundary state",
    state: "blocked / not created",
    evidence: "no frontend request is created",
    nextSafeAction: "Keep the join helper backend-only and non-callable from the client.",
  },
  {
    readinessId: "api-route-boundary-state",
    label: "API route boundary state",
    state: "blocked / not created",
    evidence: "no API route is created",
    nextSafeAction: "Do not expose an API route for the join helper.",
  },
  {
    readinessId: "queue-boundary-state",
    label: "queue boundary state",
    state: "blocked / not dispatched",
    evidence: "no queue dispatch",
    nextSafeAction: "Keep queues out of the MVP path.",
  },
  {
    readinessId: "worker-boundary-state",
    label: "worker boundary state",
    state: "blocked / not dispatched",
    evidence: "no worker dispatch",
    nextSafeAction: "Keep workers out of the MVP path.",
  },
  {
    readinessId: "job-boundary-state",
    label: "job boundary state",
    state: "blocked / not executed",
    evidence: "no job execution",
    nextSafeAction: "Keep job execution out of the MVP path.",
  },
  {
    readinessId: "result-persistence-boundary-state",
    label: "result persistence boundary state",
    state: "blocked / not implemented",
    evidence: "no result persistence",
    nextSafeAction: "Do not persist result join output.",
  },
  {
    readinessId: "audit-persistence-boundary-state",
    label: "audit persistence boundary state",
    state: "blocked / not implemented",
    evidence: "no audit persistence",
    nextSafeAction: "Do not persist audit join output.",
  },
  {
    readinessId: "approval-persistence-boundary-state",
    label: "approval persistence boundary state",
    state: "blocked / not implemented",
    evidence: "no approval persistence",
    nextSafeAction: "Do not persist approval join output.",
  },
  {
    readinessId: "database-boundary-state",
    label: "database boundary state",
    state: "blocked / not implemented",
    evidence: "no database writes",
    nextSafeAction: "Keep database write targets absent.",
  },
  {
    readinessId: "file-boundary-state",
    label: "file boundary state",
    state: "blocked / not implemented",
    evidence: "no file writes",
    nextSafeAction: "Keep file write targets absent.",
  },
] as const satisfies readonly JoinReadinessSeed[];

const RESULT_CAPTURE_MVP_RECORDS =
  listMinimalManualGatedSyntheticDryRunResultCaptureMvpRecords();
const RESULT_CAPTURE_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviews();
const RESULT_CAPTURE_OUTPUT_RECORDS = listSyntheticResultCaptureOutputs();
const RESULT_CAPTURE_OUTPUT_REVIEW_RECORDS =
  listSyntheticResultCaptureOutputReviewRecords();
const EXECUTION_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews();
const MANUAL_APPROVAL_DECISION_REVIEW_RECORDS =
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews();
const MANUAL_APPROVAL_FIXTURE_RECORDS =
  listSyntheticMvpManualApprovalFixtures();
const RESULT_CAPTURE_AUDIT_PREVIEW_RECORDS =
  listSyntheticResultCaptureAuditPreviews();
const RESULT_CAPTURE_APPROVAL_PREVIEW_RECORDS =
  listSyntheticResultCaptureApprovalPreviews();
const RESULT_CAPTURE_EVIDENCE_PACKET_RECORDS =
  listSyntheticResultCaptureEvidencePackets();

function findRequired<T>(
  records: readonly T[],
  predicate: (record: T) => boolean,
  label: string
): T {
  const record = records.find(predicate);

  if (!record) {
    throw new Error(`Missing ${label}.`);
  }

  return record;
}

function resolveJoinSourceBundle(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): JoinSourceBundle {
  return {
    mvpRecord: findRequired(
      RESULT_CAPTURE_MVP_RECORDS,
      (record) => record.id === id,
      `result capture MVP record for ${id}`
    ),
    reviewRecord: findRequired(
      RESULT_CAPTURE_REVIEW_RECORDS,
      (record) => record.id === id,
      `result capture review record for ${id}`
    ),
    outputRecord: findRequired(
      RESULT_CAPTURE_OUTPUT_RECORDS,
      (record) => record.resultCaptureMvpId === id,
      `result capture output record for ${id}`
    ),
    outputReviewRecord: findRequired(
      RESULT_CAPTURE_OUTPUT_REVIEW_RECORDS,
      (record) => record.resultCaptureReviewId === id,
      `result capture output review record for ${id}`
    ),
    executionReviewRecord: findRequired(
      EXECUTION_REVIEW_RECORDS,
      (record) => record.id === id,
      `execution review record for ${id}`
    ),
    manualApprovalDecisionReviewRecord: findRequired(
      MANUAL_APPROVAL_DECISION_REVIEW_RECORDS,
      (record) => record.id === id,
      `manual approval decision review record for ${id}`
    ),
    manualApprovalFixtureRecord: findRequired(
      MANUAL_APPROVAL_FIXTURE_RECORDS,
      (record) => record.executionMvpId === id,
      `manual approval fixture record for ${id}`
    ),
    auditPreviewRecord: findRequired(
      RESULT_CAPTURE_AUDIT_PREVIEW_RECORDS,
      (record) => record.resultCaptureMvpId === id,
      `result capture audit preview record for ${id}`
    ),
    approvalPreviewRecord: findRequired(
      RESULT_CAPTURE_APPROVAL_PREVIEW_RECORDS,
      (record) => record.resultCaptureMvpId === id,
      `result capture approval preview record for ${id}`
    ),
    evidencePacketRecord: findRequired(
      RESULT_CAPTURE_EVIDENCE_PACKET_RECORDS,
      (record) => record.resultCaptureMvpId === id,
      `result capture evidence packet record for ${id}`
    ),
  };
}

function buildSyntheticAuditJoinId(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditJoinId {
  return `synthetic-audit-join-preview:${id}`;
}

function buildSyntheticApprovalJoinId(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticApprovalJoinId {
  return `synthetic-approval-join-preview:${id}`;
}

function buildSyntheticAuditApprovalJoinDigest(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinDigest {
  return `synthetic-audit-approval-join-digest-preview:${id}:in-memory-only`;
}

function buildSyntheticAuditApprovalJoinResultReference(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinResultReference {
  return `synthetic-audit-approval-join-result-reference-preview:${id}`;
}

function buildSyntheticAuditApprovalJoinAuditReference(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinAuditReference {
  return `synthetic-audit-approval-join-audit-reference-preview:${id}`;
}

function buildSyntheticAuditApprovalJoinApprovalReference(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinApprovalReference {
  return `synthetic-audit-approval-join-approval-reference-preview:${id}`;
}

function buildSyntheticAuditApprovalJoinEvidenceReference(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinEvidenceReference {
  return `synthetic-audit-approval-join-evidence-preview:${id}`;
}

function buildSyntheticAuditApprovalJoinPayload(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinPayload {
  return {
    label: "static synthetic audit and approval join placeholder only",
    joinEnvelopeState: "preview-only",
    evidenceDigest: buildSyntheticAuditApprovalJoinDigest(id),
    auditPreviewState: "preview-only / not persisted",
    approvalPreviewState: "preview-only / not persisted",
    evidencePreviewState: "preview-only / not persisted",
  };
}

export function buildStableMinimalSyntheticAuditApprovalJoinMvpKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-mvp:${id}`;
}

function buildSyntheticAuditApprovalJoinInputKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinInputKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-input:${id}`;
}

function buildSyntheticAuditApprovalJoinAdmissionCheckKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinAdmissionCheckKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-admission-check:${id}`;
}

function buildSyntheticAuditJoinOutputKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditJoinOutputKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-join-output:${id}`;
}

function buildSyntheticApprovalJoinOutputKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticApprovalJoinOutputKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-approval-join-output:${id}`;
}

function buildSyntheticAuditApprovalJoinEnvelopeKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinEnvelopeKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-envelope:${id}`;
}

function buildSyntheticAuditJoinPreviewKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditJoinPreviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-join-preview:${id}`;
}

function buildSyntheticApprovalJoinPreviewKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticApprovalJoinPreviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-approval-join-preview:${id}`;
}

function buildSyntheticAuditApprovalEvidencePacketKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalEvidencePacketKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-evidence-packet:${id}`;
}

function buildSyntheticAuditApprovalJoinSafetyGateSummaryKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinSafetyGateSummaryKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-safety-gate-summary:${id}`;
}

function buildSyntheticAuditApprovalJoinBlockedLivePersistenceSummaryKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-blocked-live-persistence-summary:${id}`;
}

function buildSyntheticAuditApprovalJoinRequestKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinRequestKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-request:${id}`;
}

function buildSyntheticAuditApprovalJoinResponseKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinResponseKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-response:${id}`;
}

function buildSyntheticAuditApprovalJoinErrorKey(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinErrorKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-error:${id}`;
}

function buildCommonRecordFields(
  sourceBundle: JoinSourceBundle
): SyntheticAuditApprovalJoinCommonRecordFields {
  return {
    stableId: sourceBundle.mvpRecord.id,
    capabilityFamily: sourceBundle.mvpRecord.selectedCapabilityFamily,
    workspaceTarget: sourceBundle.mvpRecord.workspaceTarget,
    providerSlotLabel: sourceBundle.mvpRecord.providerSlotLabel,
    localPrivateAlternativeLabel:
      sourceBundle.mvpRecord.localPrivateAlternativeLabel,
    sourceMinimalSyntheticResultCaptureMvpReference: sourceBundle.mvpRecord.key,
    sourceMinimalSyntheticResultCaptureReviewReference:
      sourceBundle.reviewRecord.key,
    sourceSyntheticResultCaptureOutputReference: sourceBundle.outputRecord.key,
    sourceSyntheticResultCaptureOutputReviewReference:
      sourceBundle.outputReviewRecord.key,
    sourceMinimalSyntheticExecutionReviewReference:
      sourceBundle.executionReviewRecord.key,
    sourceManualApprovalDecisionReviewReference:
      sourceBundle.manualApprovalDecisionReviewRecord.key,
    sourceManualApprovalFixtureReference:
      sourceBundle.manualApprovalFixtureRecord.key,
    sourceManualConfirmationFixtureReference:
      sourceBundle.manualApprovalFixtureRecord.key,
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
    noResultPersistence: "no result persistence",
    noAuditPersistence: "no audit persistence",
    noApprovalPersistence: "no approval persistence",
    noApprovalRecording: "no approval recording",
    noApprovalTokenIssuance: "no approval token issuance",
    noApprovalLeaseIssuance: "no approval lease issuance",
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

function buildMvpRecord(
  sourceBundle: JoinSourceBundle
): MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecord {
  return {
    id: sourceBundle.mvpRecord.id,
    key: buildStableMinimalSyntheticAuditApprovalJoinMvpKey(
      sourceBundle.mvpRecord.id
    ),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-mvp-v1",
    label:
      "Backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP",
    requestLabel: sourceBundle.mvpRecord.requestLabel,
    sourceSyntheticResultCaptureAuditPreviewReference:
      sourceBundle.auditPreviewRecord.key,
    sourceSyntheticResultCaptureApprovalPreviewReference:
      sourceBundle.approvalPreviewRecord.key,
    sourceSyntheticResultCaptureEvidencePacketReference:
      sourceBundle.evidencePacketRecord.key,
    currentReadiness: CURRENT_READINESS,
    serverOnlyHelperStatement:
      "server-only synthetic audit and approval join helper exists",
    deterministicSyntheticJoinStatement:
      "deterministic synthetic audit and approval join only",
    inMemoryOnlyJoinStatement:
      "synthetic audit and approval join is produced in memory only",
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildInputRecord(
  sourceBundle: JoinSourceBundle
): SyntheticAuditApprovalJoinInputRecord {
  return {
    key: buildSyntheticAuditApprovalJoinInputKey(sourceBundle.mvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-input-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    requestState: "deterministic synthetic join request only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    resultCapturePayloadPosture: "deterministic synthetic capture fixture only",
    auditPayloadPosture: "preview-only",
    approvalPayloadPosture: "preview-only",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoPersistenceStatement:
      "No frontend request. No API route. No persistence.",
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildAdmissionCheckRecord(
  sourceBundle: JoinSourceBundle
): SyntheticAuditApprovalJoinAdmissionCheckRecord {
  return {
    key: buildSyntheticAuditApprovalJoinAdmissionCheckKey(
      sourceBundle.mvpRecord.id
    ),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-admission-check-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    admissionAccepted: "validated",
    backendOwnedModeState: "validated",
    serverOnlyModeState: "validated",
    syntheticJoinModeState: "validated",
    manualGatedModeState: "validated",
    syntheticResultCaptureState: "validated",
    auditPreviewState: "validated",
    approvalPreviewState: "validated",
    evidencePreviewState: "validated",
    manualApprovalFixtureState: "validated",
    manualConfirmationFixtureState: "validated",
    providerExecutionBlockedState: "validated",
    promptSendingBlockedState: "validated",
    modelCallsBlockedState: "validated",
    persistenceBlockedState: "validated",
    queueWorkerJobBlockedState: "validated",
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildAuditJoinOutputRecord(
  sourceBundle: JoinSourceBundle
): SyntheticAuditJoinOutputRecord {
  return {
    key: buildSyntheticAuditJoinOutputKey(sourceBundle.mvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-join-output-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    sourceSyntheticResultCaptureId: sourceBundle.outputRecord.syntheticCaptureId,
    syntheticAuditJoinId: buildSyntheticAuditJoinId(sourceBundle.mvpRecord.id),
    syntheticJoinDigest: buildSyntheticAuditApprovalJoinDigest(
      sourceBundle.mvpRecord.id
    ),
    joinState: "joined-synthetic-in-memory-only",
    auditJoinState: "deterministic synthetic audit join in memory only",
    resultReference: buildSyntheticAuditApprovalJoinResultReference(
      sourceBundle.mvpRecord.id
    ),
    auditReference: buildSyntheticAuditApprovalJoinAuditReference(
      sourceBundle.mvpRecord.id
    ),
    auditReferenceState: "preview-only / not persisted",
    evidenceReference: buildSyntheticAuditApprovalJoinEvidenceReference(
      sourceBundle.mvpRecord.id
    ),
    providerResponseState: "not received",
    modelOutputState: "not generated",
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildApprovalJoinOutputRecord(
  sourceBundle: JoinSourceBundle
): SyntheticApprovalJoinOutputRecord {
  return {
    key: buildSyntheticApprovalJoinOutputKey(sourceBundle.mvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-approval-join-output-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    sourceSyntheticResultCaptureId: sourceBundle.outputRecord.syntheticCaptureId,
    syntheticApprovalJoinId: buildSyntheticApprovalJoinId(
      sourceBundle.mvpRecord.id
    ),
    syntheticJoinDigest: buildSyntheticAuditApprovalJoinDigest(
      sourceBundle.mvpRecord.id
    ),
    joinState: "joined-synthetic-in-memory-only",
    approvalJoinState:
      "deterministic synthetic approval join in memory only",
    resultReference: buildSyntheticAuditApprovalJoinResultReference(
      sourceBundle.mvpRecord.id
    ),
    approvalReference: buildSyntheticAuditApprovalJoinApprovalReference(
      sourceBundle.mvpRecord.id
    ),
    approvalReferenceState: "preview-only / not persisted",
    evidenceReference: buildSyntheticAuditApprovalJoinEvidenceReference(
      sourceBundle.mvpRecord.id
    ),
    providerResponseState: "not received",
    modelOutputState: "not generated",
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildEnvelopeRecord(
  sourceBundle: JoinSourceBundle
): SyntheticAuditApprovalJoinEnvelopeRecord {
  return {
    key: buildSyntheticAuditApprovalJoinEnvelopeKey(sourceBundle.mvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-envelope-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    requestReference: buildSyntheticAuditApprovalJoinRequestKey(
      sourceBundle.mvpRecord.id
    ),
    responseReference: buildSyntheticAuditApprovalJoinResponseKey(
      sourceBundle.mvpRecord.id
    ),
    errorReference: buildSyntheticAuditApprovalJoinErrorKey(
      sourceBundle.mvpRecord.id
    ),
    auditJoinOutputReference: buildSyntheticAuditJoinOutputKey(
      sourceBundle.mvpRecord.id
    ),
    approvalJoinOutputReference: buildSyntheticApprovalJoinOutputKey(
      sourceBundle.mvpRecord.id
    ),
    resultReference: buildSyntheticAuditApprovalJoinResultReference(
      sourceBundle.mvpRecord.id
    ),
    auditReference: buildSyntheticAuditApprovalJoinAuditReference(
      sourceBundle.mvpRecord.id
    ),
    approvalReference: buildSyntheticAuditApprovalJoinApprovalReference(
      sourceBundle.mvpRecord.id
    ),
    evidenceReference: buildSyntheticAuditApprovalJoinEvidenceReference(
      sourceBundle.mvpRecord.id
    ),
    joinState: "joined-synthetic-in-memory-only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitSyntheticJoinOnlyNoProviderOutputNoPersistenceStatement:
      "Synthetic join only. No provider output. No persistence.",
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildAuditPreviewRecord(
  sourceBundle: JoinSourceBundle
): SyntheticAuditJoinPreviewRecord {
  return {
    key: buildSyntheticAuditJoinPreviewKey(sourceBundle.mvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-join-preview-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    auditReference: buildSyntheticAuditApprovalJoinAuditReference(
      sourceBundle.mvpRecord.id
    ),
    auditPreviewState: "preview-only / not persisted",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    explicitNoAuditPersistenceStatement: "no audit persistence",
    auditEvidenceSummary:
      sourceBundle.auditPreviewRecord.auditSummaryLines.join(" | "),
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildApprovalPreviewRecord(
  sourceBundle: JoinSourceBundle
): SyntheticApprovalJoinPreviewRecord {
  return {
    key: buildSyntheticApprovalJoinPreviewKey(sourceBundle.mvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-approval-join-preview-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    approvalReference: buildSyntheticAuditApprovalJoinApprovalReference(
      sourceBundle.mvpRecord.id
    ),
    approvalPreviewState: "preview-only / not persisted",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    explicitNoApprovalPersistenceStatement: "no approval persistence",
    approvalEvidenceSummary:
      `approval reference: ${sourceBundle.approvalPreviewRecord.approvalReference} | approval state: ${sourceBundle.approvalPreviewRecord.approvalState} | approval fixture: ${sourceBundle.approvalPreviewRecord.approvalFixtureState} | manual confirmation fixture: ${sourceBundle.approvalPreviewRecord.manualConfirmationFixtureState}`,
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildEvidencePacketRecord(
  sourceBundle: JoinSourceBundle
): SyntheticAuditApprovalEvidencePacketRecord {
  return {
    key: buildSyntheticAuditApprovalEvidencePacketKey(sourceBundle.mvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-evidence-packet-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    evidenceReference: buildSyntheticAuditApprovalJoinEvidenceReference(
      sourceBundle.mvpRecord.id
    ),
    evidencePacketState: "preview-only / not persisted",
    syntheticJoinDigest: buildSyntheticAuditApprovalJoinDigest(
      sourceBundle.mvpRecord.id
    ),
    sourceResultReference: buildSyntheticAuditApprovalJoinResultReference(
      sourceBundle.mvpRecord.id
    ),
    sourceAuditReference: buildSyntheticAuditApprovalJoinAuditReference(
      sourceBundle.mvpRecord.id
    ),
    sourceApprovalReference: buildSyntheticAuditApprovalJoinApprovalReference(
      sourceBundle.mvpRecord.id
    ),
    evidenceSummaryLines: [
      `source capture output: ${sourceBundle.outputRecord.key}`,
      `source audit preview: ${sourceBundle.auditPreviewRecord.key}`,
      `source approval preview: ${sourceBundle.approvalPreviewRecord.key}`,
      `source evidence packet: ${sourceBundle.evidencePacketRecord.key}`,
      "preview-only / not persisted",
      "deterministic synthetic audit and approval join only",
    ],
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildSafetyGateSummaryRecord(
  sourceBundle: JoinSourceBundle
): SyntheticAuditApprovalJoinSafetyGateSummaryRecord {
  return {
    key: buildSyntheticAuditApprovalJoinSafetyGateSummaryKey(
      sourceBundle.mvpRecord.id
    ),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-safety-gate-summary-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    currentReadiness: CURRENT_READINESS,
    serverOnlyHelperStatement:
      "server-only synthetic audit and approval join helper exists",
    deterministicSyntheticJoinStatement:
      "deterministic synthetic audit and approval join only",
    inMemoryOnlyJoinStatement:
      "synthetic audit and approval join is produced in memory only",
    noFrontendRequestStatement: "no frontend request is created",
    noApiRouteStatement: "no API route is created",
    summaryLines: [...SYNTHETIC_AUDIT_APPROVAL_JOIN_SUMMARY_LINES],
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildBlockedLivePersistenceSummaryRecord(
  sourceBundle: JoinSourceBundle
): SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryRecord {
  return {
    key: buildSyntheticAuditApprovalJoinBlockedLivePersistenceSummaryKey(
      sourceBundle.mvpRecord.id
    ),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-blocked-live-persistence-summary-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    currentReadiness: CURRENT_READINESS,
    noRealApprovalRequestStatement: "no real approval request",
    noRealApprovalRecordingStatement: "no real approval recording",
    approvalFixtureStatement: "approval fixture is preview-only",
    manualConfirmationFixtureStatement:
      "manual confirmation fixture is preview-only",
    approvalTokenStatement: "approval token is not issued",
    approvalLeaseStatement: "approval lease is not created",
    blockedLiveActions: [...BLOCKED_LIVE_PERSISTENCE_ACTIONS],
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildRequestRecord(
  sourceBundle: JoinSourceBundle
): SyntheticAuditApprovalJoinRequestRecord {
  return {
    key: buildSyntheticAuditApprovalJoinRequestKey(sourceBundle.mvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-request-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    requestState: "deterministic synthetic join request only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    resultCapturePayloadPosture: "deterministic synthetic capture fixture only",
    auditPayloadPosture: "preview-only",
    approvalPayloadPosture: "preview-only",
    providerPayloadPosture: "none",
    modelOutputPosture: "none",
    persistenceTargetPosture: "none",
    explicitNoFrontendRequestNoApiRouteNoPersistenceStatement:
      "No frontend request. No API route. No persistence.",
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildResponseRecord(
  sourceBundle: JoinSourceBundle
): SyntheticAuditApprovalJoinResponseRecord {
  return {
    key: buildSyntheticAuditApprovalJoinResponseKey(sourceBundle.mvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-response-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    responseState: "returned by server-only smoke/helper only",
    joinState: "joined-synthetic-in-memory-only",
    auditJoinState: "deterministic synthetic audit join in memory only",
    approvalJoinState: "deterministic synthetic approval join in memory only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitSyntheticJoinOnlyNoProviderOutputNoPersistenceStatement:
      "Synthetic join only. No provider output. No persistence.",
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildErrorRecord(
  sourceBundle: JoinSourceBundle
): SyntheticAuditApprovalJoinErrorRecord {
  return {
    key: buildSyntheticAuditApprovalJoinErrorKey(sourceBundle.mvpRecord.id),
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-error-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    errorState: "deterministic preview only",
    failedGateExamples: [
      "synthetic-result-capture-present",
      "manual-approval-fixture",
      "no-provider-execution",
      "no-result-persistence",
    ],
    missingSyntheticResultCaptureExample:
      "Synthetic result capture output is required.",
    missingAuditPreviewExample: "Synthetic audit preview is required.",
    missingApprovalPreviewExample: "Synthetic approval preview is required.",
    missingManualApprovalFixtureExample:
      "Manual approval fixture must remain preview-only.",
    providerResponseDetectedExample:
      "Provider response detected in synthetic join input.",
    modelOutputDetectedExample:
      "Model output detected in synthetic join input.",
    promptSentDetectedExample:
      "Prompt sending detected in synthetic join input.",
    persistenceAttemptedExample:
      "Persistence target detected in synthetic join input.",
    databaseWriteAttemptedExample:
      "Database write target detected in synthetic join input.",
    fileWriteAttemptedExample:
      "File write target detected in synthetic join input.",
    queueWorkerJobAttemptedExample:
      "Queue, worker, or job execution detected in synthetic join input.",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    explicitNoLiveErrorNoRetryNoFallbackStatement:
      "No live error. No retry. No fallback.",
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildGateRecord(
  sourceBundle: JoinSourceBundle,
  seed: JoinGateSeed
): SyntheticAuditApprovalJoinGateRecord {
  return {
    id: seed.gateId,
    key:
      `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-gate:${sourceBundle.mvpRecord.id}:${seed.gateId}`,
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-gate-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    label: seed.label,
    owner: seed.owner,
    requiredState: seed.requiredState,
    currentState: seed.currentState,
    evidence: seed.evidence,
    blockedLiveAction: seed.blockedLiveAction,
    ...buildCommonRecordFields(sourceBundle),
  };
}

function buildReadinessMatrixRecord(
  sourceBundle: JoinSourceBundle,
  seed: JoinReadinessSeed
): SyntheticAuditApprovalJoinReadinessMatrixRecord {
  return {
    id: seed.readinessId,
    key:
      `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-readiness:${sourceBundle.mvpRecord.id}:${seed.readinessId}`,
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-readiness-matrix-v1",
    auditApprovalJoinMvpId: sourceBundle.mvpRecord.id,
    label: seed.label,
    state: seed.state,
    evidence: seed.evidence,
    nextSafeAction: seed.nextSafeAction,
    currentReadiness: CURRENT_READINESS,
    ...buildCommonRecordFields(sourceBundle),
  };
}

const JOIN_SOURCE_BUNDLES = RESULT_CAPTURE_MVP_RECORDS.map((record) =>
  resolveJoinSourceBundle(record.id)
);

const MINIMAL_SYNTH_AUDIT_APPROVAL_JOIN_MVP_RECORDS = JOIN_SOURCE_BUNDLES.map(
  buildMvpRecord
);
const SYNTHETIC_AUDIT_APPROVAL_JOIN_INPUT_RECORDS = JOIN_SOURCE_BUNDLES.map(
  buildInputRecord
);
const SYNTHETIC_AUDIT_APPROVAL_JOIN_ADMISSION_CHECK_RECORDS =
  JOIN_SOURCE_BUNDLES.map(buildAdmissionCheckRecord);
const SYNTHETIC_AUDIT_JOIN_OUTPUT_RECORDS = JOIN_SOURCE_BUNDLES.map(
  buildAuditJoinOutputRecord
);
const SYNTHETIC_APPROVAL_JOIN_OUTPUT_RECORDS = JOIN_SOURCE_BUNDLES.map(
  buildApprovalJoinOutputRecord
);
const SYNTHETIC_AUDIT_APPROVAL_JOIN_ENVELOPE_RECORDS =
  JOIN_SOURCE_BUNDLES.map(buildEnvelopeRecord);
const SYNTHETIC_AUDIT_JOIN_PREVIEW_RECORDS = JOIN_SOURCE_BUNDLES.map(
  buildAuditPreviewRecord
);
const SYNTHETIC_APPROVAL_JOIN_PREVIEW_RECORDS = JOIN_SOURCE_BUNDLES.map(
  buildApprovalPreviewRecord
);
const SYNTHETIC_AUDIT_APPROVAL_EVIDENCE_PACKET_RECORDS =
  JOIN_SOURCE_BUNDLES.map(buildEvidencePacketRecord);
const SYNTHETIC_AUDIT_APPROVAL_JOIN_SAFETY_GATE_SUMMARY_RECORDS =
  JOIN_SOURCE_BUNDLES.map(buildSafetyGateSummaryRecord);
const SYNTHETIC_AUDIT_APPROVAL_JOIN_BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORDS =
  JOIN_SOURCE_BUNDLES.map(buildBlockedLivePersistenceSummaryRecord);
const SYNTHETIC_AUDIT_APPROVAL_JOIN_REQUEST_RECORDS = JOIN_SOURCE_BUNDLES.map(
  buildRequestRecord
);
const SYNTHETIC_AUDIT_APPROVAL_JOIN_RESPONSE_RECORDS =
  JOIN_SOURCE_BUNDLES.map(buildResponseRecord);
const SYNTHETIC_AUDIT_APPROVAL_JOIN_ERROR_RECORDS = JOIN_SOURCE_BUNDLES.map(
  buildErrorRecord
);
const SYNTHETIC_AUDIT_APPROVAL_JOIN_GATE_RECORDS = JOIN_SOURCE_BUNDLES.flatMap(
  (sourceBundle) => JOIN_GATE_SEEDS.map((seed) => buildGateRecord(sourceBundle, seed))
);
const SYNTHETIC_AUDIT_APPROVAL_JOIN_READINESS_MATRIX_RECORDS =
  JOIN_SOURCE_BUNDLES.flatMap((sourceBundle) =>
    JOIN_READINESS_SEEDS.map((seed) =>
      buildReadinessMatrixRecord(sourceBundle, seed)
    )
  );

export function listMinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecords(): readonly MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecord[] {
  return MINIMAL_SYNTH_AUDIT_APPROVAL_JOIN_MVP_RECORDS;
}

export function listSyntheticAuditApprovalJoinInputs(): readonly SyntheticAuditApprovalJoinInputRecord[] {
  return SYNTHETIC_AUDIT_APPROVAL_JOIN_INPUT_RECORDS;
}

export function listSyntheticAuditApprovalJoinAdmissionChecks(): readonly SyntheticAuditApprovalJoinAdmissionCheckRecord[] {
  return SYNTHETIC_AUDIT_APPROVAL_JOIN_ADMISSION_CHECK_RECORDS;
}

export function listSyntheticAuditJoinOutputs(): readonly SyntheticAuditJoinOutputRecord[] {
  return SYNTHETIC_AUDIT_JOIN_OUTPUT_RECORDS;
}

export function listSyntheticApprovalJoinOutputs(): readonly SyntheticApprovalJoinOutputRecord[] {
  return SYNTHETIC_APPROVAL_JOIN_OUTPUT_RECORDS;
}

export function listSyntheticAuditApprovalJoinEnvelopes(): readonly SyntheticAuditApprovalJoinEnvelopeRecord[] {
  return SYNTHETIC_AUDIT_APPROVAL_JOIN_ENVELOPE_RECORDS;
}

export function listSyntheticAuditJoinPreviews(): readonly SyntheticAuditJoinPreviewRecord[] {
  return SYNTHETIC_AUDIT_JOIN_PREVIEW_RECORDS;
}

export function listSyntheticApprovalJoinPreviews(): readonly SyntheticApprovalJoinPreviewRecord[] {
  return SYNTHETIC_APPROVAL_JOIN_PREVIEW_RECORDS;
}

export function listSyntheticAuditApprovalEvidencePackets(): readonly SyntheticAuditApprovalEvidencePacketRecord[] {
  return SYNTHETIC_AUDIT_APPROVAL_EVIDENCE_PACKET_RECORDS;
}

export function listSyntheticAuditApprovalJoinSafetyGateSummaries(): readonly SyntheticAuditApprovalJoinSafetyGateSummaryRecord[] {
  return SYNTHETIC_AUDIT_APPROVAL_JOIN_SAFETY_GATE_SUMMARY_RECORDS;
}

export function listSyntheticAuditApprovalJoinBlockedLivePersistenceSummaries(): readonly SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryRecord[] {
  return SYNTHETIC_AUDIT_APPROVAL_JOIN_BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORDS;
}

export function listSyntheticAuditApprovalJoinRequestRecords(): readonly SyntheticAuditApprovalJoinRequestRecord[] {
  return SYNTHETIC_AUDIT_APPROVAL_JOIN_REQUEST_RECORDS;
}

export function listSyntheticAuditApprovalJoinResponseRecords(): readonly SyntheticAuditApprovalJoinResponseRecord[] {
  return SYNTHETIC_AUDIT_APPROVAL_JOIN_RESPONSE_RECORDS;
}

export function listSyntheticAuditApprovalJoinErrorRecords(): readonly SyntheticAuditApprovalJoinErrorRecord[] {
  return SYNTHETIC_AUDIT_APPROVAL_JOIN_ERROR_RECORDS;
}

export function listSyntheticAuditApprovalJoinGates(): readonly SyntheticAuditApprovalJoinGateRecord[] {
  return SYNTHETIC_AUDIT_APPROVAL_JOIN_GATE_RECORDS;
}

export function listSyntheticAuditApprovalJoinReadinessMatrixRecords(): readonly SyntheticAuditApprovalJoinReadinessMatrixRecord[] {
  return SYNTHETIC_AUDIT_APPROVAL_JOIN_READINESS_MATRIX_RECORDS;
}

export function groupMinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpsByCapabilityFamily(): readonly MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpCapabilityFamilyGroup[] {
  const counts = new Map<
    MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpCapabilityFamilyGroup["capabilityFamilyId"],
    MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpCapabilityFamilyGroup
  >();

  for (const record of MINIMAL_SYNTH_AUDIT_APPROVAL_JOIN_MVP_RECORDS) {
    const existing = counts.get(record.capabilityFamily.id);

    if (existing) {
      counts.set(record.capabilityFamily.id, {
        ...existing,
        joinCount: existing.joinCount + 1,
      });
      continue;
    }

    counts.set(record.capabilityFamily.id, {
      capabilityFamilyId: record.capabilityFamily.id,
      capabilityFamilyLabel: record.capabilityFamily.label,
      joinCount: 1,
    });
  }

  return [...counts.values()].sort((left, right) =>
    left.capabilityFamilyLabel.localeCompare(right.capabilityFamilyLabel)
  );
}

export function groupMinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpsByWorkspaceTarget(): readonly MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpWorkspaceGroup[] {
  const counts = new Map<
    MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpWorkspaceGroup["workspaceTarget"],
    MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpWorkspaceGroup
  >();

  for (const record of MINIMAL_SYNTH_AUDIT_APPROVAL_JOIN_MVP_RECORDS) {
    const existing = counts.get(record.workspaceTarget);

    if (existing) {
      counts.set(record.workspaceTarget, {
        workspaceTarget: record.workspaceTarget,
        joinCount: existing.joinCount + 1,
      });
      continue;
    }

    counts.set(record.workspaceTarget, {
      workspaceTarget: record.workspaceTarget,
      joinCount: 1,
    });
  }

  return [...counts.values()].sort((left, right) =>
    left.workspaceTarget.localeCompare(right.workspaceTarget)
  );
}

export function buildSyntheticAuditApprovalJoinSummary(): SyntheticAuditApprovalJoinSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-summary-v1",
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_PHASE,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    currentReadiness: CURRENT_READINESS,
    recordCount: MINIMAL_SYNTH_AUDIT_APPROVAL_JOIN_MVP_RECORDS.length,
    summaryLines: [...SYNTHETIC_AUDIT_APPROVAL_JOIN_SUMMARY_LINES],
  };
}

export function buildSyntheticAuditApprovalJoinGateSummary(): SyntheticAuditApprovalJoinGateSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-gate-summary-v1",
    gateCount: SYNTHETIC_AUDIT_APPROVAL_JOIN_GATE_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: [...SYNTHETIC_AUDIT_APPROVAL_JOIN_GATE_SUMMARY_LINES],
  };
}

export function buildSyntheticAuditApprovalJoinReadinessSummary(): SyntheticAuditApprovalJoinReadinessSummary {
  return {
    version:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-readiness-summary-v1",
    readinessCount:
      SYNTHETIC_AUDIT_APPROVAL_JOIN_READINESS_MATRIX_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: [...SYNTHETIC_AUDIT_APPROVAL_JOIN_READINESS_SUMMARY_LINES],
  };
}

export function buildNextAuditApprovalJoinReviewRecoveryChecklist(): readonly string[] {
  return [...NEXT_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_CHECKLIST];
}
