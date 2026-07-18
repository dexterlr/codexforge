import type { AiModelProviderWorkspaceTarget } from "../ai-provider-registry";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview/backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview-catalog";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview/backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview-types";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews,
} from "../minimal-synth-exec-review/backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-recovery-preview-catalog";
import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord,
} from "../minimal-synth-exec-review/backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-recovery-preview-types";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviews,
  listSyntheticResultCaptureOutputReviewRecords,
} from "../min-synth-capture-review/min-synth-capture-review-catalog";
import type {
  BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord,
  SyntheticResultCaptureOutputReviewRecord,
} from "../min-synth-capture-review/min-synth-capture-review-types";
import {
  listMinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecords,
  listSyntheticApprovalJoinOutputs,
  listSyntheticApprovalJoinPreviews,
  listSyntheticAuditApprovalEvidencePackets,
  listSyntheticAuditApprovalJoinBlockedLivePersistenceSummaries,
  listSyntheticAuditApprovalJoinEnvelopes,
  listSyntheticAuditApprovalJoinGates,
  listSyntheticAuditApprovalJoinInputs,
  listSyntheticAuditApprovalJoinSafetyGateSummaries,
  listSyntheticAuditJoinOutputs,
  listSyntheticAuditJoinPreviews,
} from "../min-synth-audit-join/min-synth-audit-join-catalog";
import type {
  MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecord,
  SyntheticApprovalJoinOutputRecord,
  SyntheticApprovalJoinPreviewRecord,
  SyntheticAuditApprovalEvidencePacketRecord,
  SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryRecord,
  SyntheticAuditApprovalJoinEnvelopeRecord,
  SyntheticAuditApprovalJoinGateId,
  SyntheticAuditApprovalJoinGateRecord,
  SyntheticAuditApprovalJoinInputRecord,
  SyntheticAuditApprovalJoinSafetyGateSummaryRecord,
  SyntheticAuditJoinOutputRecord,
  SyntheticAuditJoinPreviewRecord,
} from "../min-synth-audit-join/min-synth-audit-join-types";
import {
  listSyntheticResultCaptureOutputs,
} from "../min-synth-result-capture/min-synth-result-capture-catalog";
import type {
  SyntheticResultCaptureOutputRecord,
} from "../min-synth-result-capture/min-synth-result-capture-types";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
  type BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord,
  type MinimalEndToEndPacketMvpChecklist,
  type MinimalSyntheticAuditApprovalJoinAcceptancePostureKey,
  type MinimalSyntheticAuditApprovalJoinAcceptanceState,
  type MinimalSyntheticAuditApprovalJoinAcceptanceStatement,
  type MinimalSyntheticAuditApprovalJoinFallbackPosture,
  type MinimalSyntheticAuditApprovalJoinGateFailureReviewKey,
  type MinimalSyntheticAuditApprovalJoinNoLiveGatePassStatement,
  type MinimalSyntheticAuditApprovalJoinNoRetryNoFallbackNoProviderNoPersistenceStatement,
  type MinimalSyntheticAuditApprovalJoinOutputOnlyStatement,
  type MinimalSyntheticAuditApprovalJoinOutputReviewKey,
  type MinimalSyntheticAuditApprovalJoinPreviewOnlyStatement,
  type MinimalSyntheticAuditApprovalJoinRecoveryPlanKey,
  type MinimalSyntheticAuditApprovalJoinRecoveryPosture,
  type MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistId,
  type MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistKey,
  type MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistLabel,
  type MinimalSyntheticAuditApprovalJoinReadinessOwner,
  type MinimalSyntheticAuditApprovalJoinReadinessState,
  type MinimalSyntheticAuditApprovalJoinRetryPosture,
  type MinimalSyntheticAuditApprovalJoinReviewAuditSummaryKey,
  type MinimalSyntheticAuditApprovalJoinReviewCurrentReadiness,
  type MinimalSyntheticAuditApprovalJoinReviewDisplayStrings,
  type MinimalSyntheticAuditApprovalJoinReviewId,
  type MinimalSyntheticAuditApprovalJoinReviewKey,
  type MinimalSyntheticAuditApprovalJoinReviewMode,
  type MinimalSyntheticAuditApprovalJoinReviewPosture,
  type MinimalSyntheticAuditApprovalJoinReviewSeverity,
  type MinimalSyntheticAuditApprovalJoinReviewSource,
  type SyntheticAuditApprovalJoinAcceptancePostureRecord,
  type SyntheticAuditApprovalJoinGateFailureReviewRecord,
  type SyntheticAuditApprovalJoinGateFailureSummary,
  type SyntheticAuditApprovalJoinOutputReviewRecord,
  type SyntheticAuditApprovalJoinOutputReviewSummary,
  type SyntheticAuditApprovalJoinRecoveryPlanPreviewRecord,
  type SyntheticAuditApprovalJoinRecoveryReadinessChecklistRecord,
  type SyntheticAuditApprovalJoinRecoverySummary,
  type SyntheticAuditApprovalJoinReviewCapabilityFamilyGroup,
  type SyntheticAuditApprovalJoinReviewAuditSummaryRecord,
  type SyntheticAuditApprovalJoinReviewSummary,
  type SyntheticAuditApprovalJoinReviewWorkspaceGroup,
} from "./min-synth-audit-join-review-types";

type JoinReviewSourceBundle = Readonly<{
  mvpRecord: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecord;
  inputRecord: SyntheticAuditApprovalJoinInputRecord;
  auditJoinOutputRecord: SyntheticAuditJoinOutputRecord;
  approvalJoinOutputRecord: SyntheticApprovalJoinOutputRecord;
  envelopeRecord: SyntheticAuditApprovalJoinEnvelopeRecord;
  auditPreviewRecord: SyntheticAuditJoinPreviewRecord;
  approvalPreviewRecord: SyntheticApprovalJoinPreviewRecord;
  evidencePacketRecord: SyntheticAuditApprovalEvidencePacketRecord;
  safetyGateSummaryRecord: SyntheticAuditApprovalJoinSafetyGateSummaryRecord;
  blockedLivePersistenceSummaryRecord: SyntheticAuditApprovalJoinBlockedLivePersistenceSummaryRecord;
  resultCaptureReviewRecord: BackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviewRecord;
  resultCaptureOutputRecord: SyntheticResultCaptureOutputRecord;
  resultCaptureOutputReviewRecord: SyntheticResultCaptureOutputReviewRecord;
  executionReviewRecord: BackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviewRecord;
  manualApprovalDecisionReviewRecord: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord;
}>;

type GateFailureSeed = Readonly<{
  severity: MinimalSyntheticAuditApprovalJoinReviewSeverity;
}>;

type ReadinessChecklistSeed = Readonly<{
  checklistId: MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistId;
  label: MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistLabel;
  state: MinimalSyntheticAuditApprovalJoinReadinessState;
  severity: MinimalSyntheticAuditApprovalJoinReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: MinimalSyntheticAuditApprovalJoinReadinessOwner;
  nextSafeAction: string;
}>;

const CURRENT_READINESS: MinimalSyntheticAuditApprovalJoinReviewCurrentReadiness =
  "minimal-synthetic-audit-approval-join-review-only / backend-only / in-memory-only / not provider-capable / not persistent";

const REVIEW_SOURCE: MinimalSyntheticAuditApprovalJoinReviewSource =
  "Athena / Jarvis Model Gateway";
const REVIEW_MODE: MinimalSyntheticAuditApprovalJoinReviewMode = "preview-only";
const REVIEW_POSTURE: MinimalSyntheticAuditApprovalJoinReviewPosture =
  "minimal synthetic audit and approval join review / backend-only / in-memory-only / not provider-capable / not persistent";
const PREVIEW_ONLY_STATEMENT: MinimalSyntheticAuditApprovalJoinPreviewOnlyStatement =
  "minimal synthetic audit and approval join review is preview-only";
const OUTPUT_ONLY_STATEMENT: MinimalSyntheticAuditApprovalJoinOutputOnlyStatement =
  "Synthetic join only. No real output. No persistence.";
const NO_LIVE_GATE_PASS_STATEMENT: MinimalSyntheticAuditApprovalJoinNoLiveGatePassStatement =
  "No live gate pass.";
const NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PERSISTENCE_STATEMENT: MinimalSyntheticAuditApprovalJoinNoRetryNoFallbackNoProviderNoPersistenceStatement =
  "No retry. No fallback. No provider execution. No persistence.";
const ACCEPTANCE_STATEMENT: MinimalSyntheticAuditApprovalJoinAcceptanceStatement =
  "Synthetic audit approval join MVP accepted only. Live persistence not accepted.";
const ACCEPTANCE_STATE: MinimalSyntheticAuditApprovalJoinAcceptanceState =
  "not accepted for live persistence / synthetic audit approval join MVP accepted only";
const RECOVERY_POSTURE: MinimalSyntheticAuditApprovalJoinRecoveryPosture =
  "manual review only";
const RETRY_POSTURE: MinimalSyntheticAuditApprovalJoinRetryPosture = "disabled";
const FALLBACK_POSTURE: MinimalSyntheticAuditApprovalJoinFallbackPosture =
  "disabled";

const REVIEW_SUMMARY_LINES = [
  "backend-owned minimal manual-gated synthetic dry-run audit and approval join review and recovery preview only",
  "minimal synthetic audit and approval join review is preview-only",
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
  `acceptance state is ${ACCEPTANCE_STATE}`,
  "backend-owned minimal manual-gated synthetic dry-run end-to-end packet MVP next",
] as const;

const OUTPUT_REVIEW_SUMMARY_LINES = [
  "synthetic audit and approval join output review is preview-only",
  "join state: joined-synthetic-in-memory-only",
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

const RECOVERY_SUMMARY_LINES = [
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "server-only join helper recovery",
  "synthetic audit and approval join input recovery",
  "audit join output recovery",
  "approval join output recovery",
  "join envelope recovery",
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
  "end-to-end packet MVP comes next",
] as const;

const MINIMAL_END_TO_END_PACKET_MVP_CHECKLIST = [
  "Keep the server-only synthetic audit and approval join helper deterministic and in-memory only while review and recovery remain preview-only.",
  "Preserve the synthetic audit join output, synthetic approval join output, join envelope, previews, and evidence packet as typed deterministic in-memory fixtures only.",
  "Do not add a frontend request, API route, prompt sending, model calls, provider SDK imports, provider execution, plugin execution, queue dispatch, worker dispatch, or job execution.",
  "Do not add result persistence, audit persistence, approval persistence, database writes, file writes, browser storage, retry, or fallback.",
  "Advance to 5578-5609 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP without enabling any live approval, provider, or persistence path.",
] as const;

const GATE_FAILURE_SEEDS = new Map<
  SyntheticAuditApprovalJoinGateId,
  GateFailureSeed
>([
  ["backend-only-boundary", { severity: "critical" }],
  ["server-only-module-boundary", { severity: "critical" }],
  ["synthetic-only-join-mode", { severity: "critical" }],
  ["manual-approval-fixture", { severity: "high" }],
  ["manual-confirmation-fixture", { severity: "high" }],
  ["synthetic-result-capture-present", { severity: "high" }],
  ["deterministic-audit-join-id", { severity: "high" }],
  ["deterministic-approval-join-id", { severity: "high" }],
  ["deterministic-join-digest", { severity: "high" }],
  ["in-memory-only-result-reference", { severity: "high" }],
  ["in-memory-only-audit-reference", { severity: "high" }],
  ["in-memory-only-approval-reference", { severity: "high" }],
  ["no-real-approval-recording", { severity: "critical" }],
  ["no-approval-token-issuance", { severity: "critical" }],
  ["no-approval-lease-issuance", { severity: "critical" }],
  ["no-frontend-request", { severity: "critical" }],
  ["no-api-route", { severity: "critical" }],
  ["no-fetch-network", { severity: "critical" }],
  ["no-provider-sdk-import", { severity: "critical" }],
  ["no-provider-execution", { severity: "critical" }],
  ["no-model-call", { severity: "critical" }],
  ["no-prompt-sending", { severity: "critical" }],
  ["no-queue-dispatch", { severity: "critical" }],
  ["no-worker-dispatch", { severity: "critical" }],
  ["no-job-execution", { severity: "critical" }],
  ["no-result-persistence", { severity: "critical" }],
  ["no-audit-persistence", { severity: "critical" }],
  ["no-approval-persistence", { severity: "critical" }],
  ["no-database-write", { severity: "critical" }],
  ["no-file-write", { severity: "critical" }],
  ["single-run-lock-preview", { severity: "medium" }],
  ["idempotency-replay-preview", { severity: "medium" }],
  ["timeout-cancel-preview", { severity: "medium" }],
  ["privacy-redaction-preview", { severity: "high" }],
]);

const READINESS_CHECKLIST_SEEDS: readonly ReadinessChecklistSeed[] = [
  {
    checklistId: "server-only-join-helper-reviewed",
    label: "server-only join helper reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "server-only synthetic audit and approval join helper exists",
    recoveryAction: "Keep the helper server-only and deterministic.",
    owner: "operator",
    nextSafeAction: "Review helper posture without exposing a frontend callable path.",
  },
  {
    checklistId: "synthetic-audit-and-approval-join-input-reviewed",
    label: "synthetic audit and approval join input reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "deterministic synthetic join request only",
    recoveryAction: "Keep the join input preview-only and typed.",
    owner: "operator",
    nextSafeAction: "Confirm the input remains detached from live provider payloads.",
  },
  {
    checklistId: "join-admission-check-reviewed",
    label: "join admission check reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "join admission gates validate preview-only fixtures and blocked live actions",
    recoveryAction: "Preserve deterministic admission checks.",
    owner: "operator",
    nextSafeAction: "Keep admission evidence static and review-safe.",
  },
  {
    checklistId: "audit-join-output-reviewed",
    label: "audit join output reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "deterministic synthetic audit join in memory only",
    recoveryAction: "Keep audit join output in memory only.",
    owner: "operator",
    nextSafeAction: "Review the audit join output as a preview artifact only.",
  },
  {
    checklistId: "approval-join-output-reviewed",
    label: "approval join output reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "deterministic synthetic approval join in memory only",
    recoveryAction: "Keep approval join output in memory only.",
    owner: "operator",
    nextSafeAction: "Review the approval join output as a preview artifact only.",
  },
  {
    checklistId: "join-envelope-reviewed",
    label: "join envelope reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "Synthetic join only. No provider output. No persistence.",
    recoveryAction: "Keep the join envelope synthetic-only.",
    owner: "operator",
    nextSafeAction: "Confirm only preview references remain in the envelope.",
  },
  {
    checklistId: "audit-preview-reviewed",
    label: "audit preview reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "preview-only / not persisted audit preview",
    recoveryAction: "Keep the audit preview detached from persistence.",
    owner: "operator",
    nextSafeAction: "Review audit preview evidence only in Athena.",
  },
  {
    checklistId: "approval-preview-reviewed",
    label: "approval preview reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "preview-only / not persisted approval preview",
    recoveryAction: "Keep the approval preview detached from persistence.",
    owner: "operator",
    nextSafeAction: "Review approval preview evidence only in Athena.",
  },
  {
    checklistId: "evidence-packet-reviewed",
    label: "evidence packet reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "preview-only / not persisted evidence packet",
    recoveryAction: "Keep the evidence packet preview-only.",
    owner: "operator",
    nextSafeAction: "Review evidence lines without creating a persisted packet.",
  },
  {
    checklistId: "synthetic-result-capture-dependency-reviewed",
    label: "synthetic result capture dependency reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic result capture is produced in memory only",
    recoveryAction: "Keep the capture dependency deterministic and in-memory only.",
    owner: "operator",
    nextSafeAction: "Confirm the join review still points to synthetic capture only.",
  },
  {
    checklistId: "synthetic-result-capture-output-reviewed",
    label: "synthetic result capture output reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic result capture output review remains preview-only",
    recoveryAction: "Keep result capture output review as a typed preview.",
    owner: "operator",
    nextSafeAction: "Review output posture without enabling a live result path.",
  },
  {
    checklistId: "manual-approval-fixture-reviewed",
    label: "manual approval fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "approval fixture is preview-only",
    recoveryAction: "Keep manual approval fixture static and synthetic.",
    owner: "operator",
    nextSafeAction: "Do not translate preview approval into a real approval request.",
  },
  {
    checklistId: "manual-confirmation-fixture-reviewed",
    label: "manual confirmation fixture reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "manual confirmation fixture is preview-only",
    recoveryAction: "Keep manual confirmation synthetic and uncaptured.",
    owner: "operator",
    nextSafeAction: "Review manual confirmation posture without recording state.",
  },
  {
    checklistId: "kill-switch-fixture-reviewed",
    label: "kill switch fixture reviewed",
    state: "reviewed",
    severity: "medium",
    evidenceRequired: "kill switch required",
    recoveryAction: "Keep kill switch posture present as a fixture-only requirement.",
    owner: "safety review",
    nextSafeAction: "Confirm kill switch posture stays documented and inactive.",
  },
  {
    checklistId: "deterministic-audit-join-reviewed",
    label: "deterministic audit join reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "deterministic synthetic audit and approval join only",
    recoveryAction: "Preserve deterministic audit join identifiers and digest posture.",
    owner: "operator",
    nextSafeAction: "Keep audit join identifiers preview-only.",
  },
  {
    checklistId: "deterministic-approval-join-reviewed",
    label: "deterministic approval join reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "deterministic synthetic audit and approval join only",
    recoveryAction: "Preserve deterministic approval join identifiers and digest posture.",
    owner: "operator",
    nextSafeAction: "Keep approval join identifiers preview-only.",
  },
  {
    checklistId: "in-memory-only-join-reviewed",
    label: "in-memory-only join reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "synthetic audit and approval join is produced in memory only",
    recoveryAction: "Keep the join in memory only.",
    owner: "operator",
    nextSafeAction: "Do not add persistence targets to the join path.",
  },
  {
    checklistId: "blocked-live-persistence-summary-reviewed",
    label: "blocked live persistence summary reviewed",
    state: "reviewed",
    severity: "high",
    evidenceRequired: "blocked live audit and approval persistence summary remains present",
    recoveryAction: "Keep the blocked live persistence summary visible.",
    owner: "operator",
    nextSafeAction: "Carry the blocked persistence summary forward into the next batch.",
  },
  {
    checklistId: "provider-boundary-reviewed",
    label: "provider boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no provider execution",
    recoveryAction: "Do not connect provider SDKs or provider execution.",
    owner: "backend future",
    nextSafeAction: "Hold provider execution out of scope until end-to-end packet MVP.",
  },
  {
    checklistId: "prompt-boundary-reviewed",
    label: "prompt boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no prompt sending",
    recoveryAction: "Keep prompt sending unimplemented.",
    owner: "backend future",
    nextSafeAction: "Leave prompt payloads absent from the join review path.",
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
    recoveryAction: "Keep the join helper non-callable from the client.",
    owner: "backend future",
    nextSafeAction: "Do not add a client request surface.",
  },
  {
    checklistId: "api-route-boundary-reviewed",
    label: "API route boundary reviewed",
    state: "blocked",
    severity: "critical",
    evidenceRequired: "no API route is created",
    recoveryAction: "Do not expose the join helper through an API route.",
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
    nextSafeAction: "Carry result persistence blockers into the end-to-end packet MVP.",
  },
  {
    checklistId: "audit-persistence-still-blocked",
    label: "audit persistence still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no audit persistence",
    recoveryAction: "Do not persist audit references.",
    owner: "backend future",
    nextSafeAction: "Carry audit persistence blockers into the end-to-end packet MVP.",
  },
  {
    checklistId: "approval-persistence-still-blocked",
    label: "approval persistence still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no approval persistence",
    recoveryAction: "Do not persist approval references.",
    owner: "backend future",
    nextSafeAction: "Carry approval persistence blockers into the end-to-end packet MVP.",
  },
  {
    checklistId: "database-writes-still-blocked",
    label: "database writes still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no database writes",
    recoveryAction: "Keep database write targets absent.",
    owner: "backend future",
    nextSafeAction: "Do not add database writes in the review layer.",
  },
  {
    checklistId: "file-writes-still-blocked",
    label: "file writes still blocked",
    state: "backend future required",
    severity: "critical",
    evidenceRequired: "no file writes",
    recoveryAction: "Keep file write targets absent.",
    owner: "backend future",
    nextSafeAction: "Do not add file writes in the review layer.",
  },
] as const;

const AUDIT_APPROVAL_JOIN_MVP_RECORDS =
  listMinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRecords();
const AUDIT_APPROVAL_JOIN_INPUT_RECORDS = listSyntheticAuditApprovalJoinInputs();
const AUDIT_JOIN_OUTPUT_RECORDS = listSyntheticAuditJoinOutputs();
const APPROVAL_JOIN_OUTPUT_RECORDS = listSyntheticApprovalJoinOutputs();
const AUDIT_APPROVAL_JOIN_ENVELOPE_RECORDS =
  listSyntheticAuditApprovalJoinEnvelopes();
const AUDIT_JOIN_PREVIEW_RECORDS = listSyntheticAuditJoinPreviews();
const APPROVAL_JOIN_PREVIEW_RECORDS = listSyntheticApprovalJoinPreviews();
const AUDIT_APPROVAL_EVIDENCE_PACKET_RECORDS =
  listSyntheticAuditApprovalEvidencePackets();
const AUDIT_APPROVAL_JOIN_SAFETY_GATE_SUMMARY_RECORDS =
  listSyntheticAuditApprovalJoinSafetyGateSummaries();
const AUDIT_APPROVAL_JOIN_BLOCKED_PERSISTENCE_SUMMARY_RECORDS =
  listSyntheticAuditApprovalJoinBlockedLivePersistenceSummaries();
const AUDIT_APPROVAL_JOIN_GATE_RECORDS = listSyntheticAuditApprovalJoinGates();
const RESULT_CAPTURE_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunResultCaptureReviews();
const RESULT_CAPTURE_OUTPUT_RECORDS = listSyntheticResultCaptureOutputs();
const RESULT_CAPTURE_OUTPUT_REVIEW_RECORDS =
  listSyntheticResultCaptureOutputReviewRecords();
const EXECUTION_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews();
const MANUAL_APPROVAL_DECISION_REVIEW_RECORDS =
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

function buildMapById<T extends Readonly<{ id: string }>>(
  items: readonly T[]
): ReadonlyMap<T["id"], T> {
  return new Map(items.map((item) => [item.id, item] as const));
}

function resolveJoinReviewSourceBundle(
  id: MinimalSyntheticAuditApprovalJoinReviewId
): JoinReviewSourceBundle {
  return {
    mvpRecord: findRequired(
      AUDIT_APPROVAL_JOIN_MVP_RECORDS,
      (record) => record.id === id,
      `audit approval join MVP record for ${id}`
    ),
    inputRecord: findRequired(
      AUDIT_APPROVAL_JOIN_INPUT_RECORDS,
      (record) => record.auditApprovalJoinMvpId === id,
      `audit approval join input record for ${id}`
    ),
    auditJoinOutputRecord: findRequired(
      AUDIT_JOIN_OUTPUT_RECORDS,
      (record) => record.auditApprovalJoinMvpId === id,
      `audit join output record for ${id}`
    ),
    approvalJoinOutputRecord: findRequired(
      APPROVAL_JOIN_OUTPUT_RECORDS,
      (record) => record.auditApprovalJoinMvpId === id,
      `approval join output record for ${id}`
    ),
    envelopeRecord: findRequired(
      AUDIT_APPROVAL_JOIN_ENVELOPE_RECORDS,
      (record) => record.auditApprovalJoinMvpId === id,
      `audit approval join envelope record for ${id}`
    ),
    auditPreviewRecord: findRequired(
      AUDIT_JOIN_PREVIEW_RECORDS,
      (record) => record.auditApprovalJoinMvpId === id,
      `audit join preview record for ${id}`
    ),
    approvalPreviewRecord: findRequired(
      APPROVAL_JOIN_PREVIEW_RECORDS,
      (record) => record.auditApprovalJoinMvpId === id,
      `approval join preview record for ${id}`
    ),
    evidencePacketRecord: findRequired(
      AUDIT_APPROVAL_EVIDENCE_PACKET_RECORDS,
      (record) => record.auditApprovalJoinMvpId === id,
      `audit approval evidence packet record for ${id}`
    ),
    safetyGateSummaryRecord: findRequired(
      AUDIT_APPROVAL_JOIN_SAFETY_GATE_SUMMARY_RECORDS,
      (record) => record.auditApprovalJoinMvpId === id,
      `audit approval join safety gate summary record for ${id}`
    ),
    blockedLivePersistenceSummaryRecord: findRequired(
      AUDIT_APPROVAL_JOIN_BLOCKED_PERSISTENCE_SUMMARY_RECORDS,
      (record) => record.auditApprovalJoinMvpId === id,
      `audit approval join blocked persistence summary record for ${id}`
    ),
    resultCaptureReviewRecord: findRequired(
      RESULT_CAPTURE_REVIEW_RECORDS,
      (record) => record.id === id,
      `result capture review record for ${id}`
    ),
    resultCaptureOutputRecord: findRequired(
      RESULT_CAPTURE_OUTPUT_RECORDS,
      (record) => record.resultCaptureMvpId === id,
      `result capture output record for ${id}`
    ),
    resultCaptureOutputReviewRecord: findRequired(
      RESULT_CAPTURE_OUTPUT_REVIEW_RECORDS,
      (record) => record.resultCaptureReviewId === id,
      `result capture output review record for ${id}`
    ),
    executionReviewRecord: findRequired(
      EXECUTION_REVIEW_RECORDS,
      (record) => record.id === id,
      `minimal synthetic execution review record for ${id}`
    ),
    manualApprovalDecisionReviewRecord: findRequired(
      MANUAL_APPROVAL_DECISION_REVIEW_RECORDS,
      (record) => record.id === id,
      `manual approval decision review record for ${id}`
    ),
  };
}

function resolveJoinGateRecord(
  reviewId: MinimalSyntheticAuditApprovalJoinReviewId,
  gateId: SyntheticAuditApprovalJoinGateId
): SyntheticAuditApprovalJoinGateRecord {
  return findRequired(
    AUDIT_APPROVAL_JOIN_GATE_RECORDS,
    (record) =>
      record.auditApprovalJoinMvpId === reviewId && record.id === gateId,
    `audit approval join gate ${gateId} for ${reviewId}`
  );
}

export function buildStableMinimalSyntheticAuditApprovalJoinReviewKey(
  id: MinimalSyntheticAuditApprovalJoinReviewId
): MinimalSyntheticAuditApprovalJoinReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-review:${id}`;
}

export function buildStableSyntheticAuditApprovalJoinOutputReviewKey(
  id: MinimalSyntheticAuditApprovalJoinReviewId
): MinimalSyntheticAuditApprovalJoinOutputReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-output-review:${id}`;
}

export function buildStableSyntheticAuditApprovalJoinGateFailureReviewKey(
  id: MinimalSyntheticAuditApprovalJoinReviewId,
  gateId: SyntheticAuditApprovalJoinGateId
): MinimalSyntheticAuditApprovalJoinGateFailureReviewKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-gate-failure-review:${id}:${gateId}`;
}

export function buildStableSyntheticAuditApprovalJoinRecoveryPlanKey(
  id: MinimalSyntheticAuditApprovalJoinReviewId
): MinimalSyntheticAuditApprovalJoinRecoveryPlanKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-recovery-plan:${id}`;
}

export function buildStableSyntheticAuditApprovalJoinRecoveryReadinessChecklistKey(
  id: MinimalSyntheticAuditApprovalJoinReviewId,
  checklistId: MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistId
): MinimalSyntheticAuditApprovalJoinRecoveryReadinessChecklistKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-recovery-readiness:${id}:${checklistId}`;
}

export function buildStableSyntheticAuditApprovalJoinReviewAuditSummaryKey(
  id: MinimalSyntheticAuditApprovalJoinReviewId
): MinimalSyntheticAuditApprovalJoinReviewAuditSummaryKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-review-audit-summary:${id}`;
}

export function buildStableSyntheticAuditApprovalJoinAcceptancePostureKey(
  id: MinimalSyntheticAuditApprovalJoinReviewId
): MinimalSyntheticAuditApprovalJoinAcceptancePostureKey {
  return `backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-acceptance-posture:${id}`;
}

function buildReviewRecord(
  id: MinimalSyntheticAuditApprovalJoinReviewId
): BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord {
  const sourceBundle = resolveJoinReviewSourceBundle(id);
  const decisionReview = sourceBundle.manualApprovalDecisionReviewRecord;

  return {
    id,
    key: buildStableMinimalSyntheticAuditApprovalJoinReviewKey(id),
    reviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-review-preview-v1",
    source: REVIEW_SOURCE,
    reviewMode: REVIEW_MODE,
    reviewPosture: REVIEW_POSTURE,
    previewOnlyStatement: PREVIEW_ONLY_STATEMENT,
    requestLabel: sourceBundle.mvpRecord.requestLabel,
    label: `${sourceBundle.mvpRecord.requestLabel} synthetic audit approval join review`,
    workspaceTarget: sourceBundle.mvpRecord.workspaceTarget,
    sourceMinimalSyntheticAuditApprovalJoinMvpReference:
      sourceBundle.mvpRecord.key,
    sourceSyntheticAuditApprovalJoinInputReference:
      sourceBundle.inputRecord.key,
    sourceSyntheticAuditJoinOutputReference:
      sourceBundle.auditJoinOutputRecord.key,
    sourceSyntheticApprovalJoinOutputReference:
      sourceBundle.approvalJoinOutputRecord.key,
    sourceSyntheticAuditApprovalJoinEnvelopeReference:
      sourceBundle.envelopeRecord.key,
    sourceSyntheticAuditJoinPreviewReference:
      sourceBundle.auditPreviewRecord.key,
    sourceSyntheticApprovalJoinPreviewReference:
      sourceBundle.approvalPreviewRecord.key,
    sourceSyntheticAuditApprovalEvidencePacketReference:
      sourceBundle.evidencePacketRecord.key,
    sourceSyntheticAuditApprovalJoinSafetyGateSummaryReference:
      sourceBundle.safetyGateSummaryRecord.key,
    sourceSyntheticAuditApprovalJoinBlockedLivePersistenceSummaryReference:
      sourceBundle.blockedLivePersistenceSummaryRecord.key,
    sourceMinimalSyntheticResultCaptureReviewReference:
      sourceBundle.resultCaptureReviewRecord.key,
    sourceSyntheticResultCaptureOutputReference:
      sourceBundle.resultCaptureOutputRecord.key,
    sourceSyntheticResultCaptureOutputReviewReference:
      sourceBundle.resultCaptureOutputReviewRecord.key,
    sourceMinimalSyntheticExecutionReviewReference:
      sourceBundle.executionReviewRecord.key,
    sourceManualApprovalDecisionReviewReference: decisionReview.key,
    selectedCapabilityFamily: { ...decisionReview.selectedCapabilityFamily },
    providerSlotLabel: decisionReview.providerSlotLabel,
    backupProviderSlotLabel: decisionReview.backupProviderSlotLabel,
    localPrivateAlternativeLabel: decisionReview.localPrivateAlternativeLabel,
    serverOnlyJoinHelperState: "exists",
    syntheticAuditAndApprovalJoinState: "joined-synthetic-in-memory-only",
    deterministicJoinState: "produced in memory only",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    providerResponseState: sourceBundle.auditJoinOutputRecord.providerResponseState,
    modelOutputState: sourceBundle.auditJoinOutputRecord.modelOutputState,
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
    auditReferenceState: "preview-only / not persisted",
    approvalReferenceState: "preview-only / not persisted",
    resultReferenceState: "preview-only / not persisted",
    evidencePacketState: "preview-only / not persisted",
    killSwitchState: "inactive fixture only",
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    nextEndToEndPacketMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    currentReadiness: CURRENT_READINESS,
  };
}

const REVIEW_RECORDS = AUDIT_APPROVAL_JOIN_MVP_RECORDS.map((record) =>
  buildReviewRecord(record.id)
);

const REVIEW_RECORDS_BY_ID = buildMapById(REVIEW_RECORDS);

function resolveReview(
  id: MinimalSyntheticAuditApprovalJoinReviewId
): BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord {
  return resolveRequiredRecord(
    REVIEW_RECORDS_BY_ID.get(id),
    `Missing audit approval join review for ${id}.`
  );
}

function buildOutputReviewRecord(
  review: BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord
): SyntheticAuditApprovalJoinOutputReviewRecord {
  return {
    id: review.id,
    key: buildStableSyntheticAuditApprovalJoinOutputReviewKey(review.id),
    outputReviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-output-review-preview-v1",
    auditApprovalJoinReviewId: review.id,
    sourceAuditJoinOutputReference: review.sourceSyntheticAuditJoinOutputReference,
    sourceApprovalJoinOutputReference:
      review.sourceSyntheticApprovalJoinOutputReference,
    sourceJoinEnvelopeReference:
      review.sourceSyntheticAuditApprovalJoinEnvelopeReference,
    joinState: "joined-synthetic-in-memory-only",
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
      `${review.requestLabel} stays joined as a deterministic in-memory synthetic audit and approval preview only, so there is no provider response, model output, or persisted result to treat as a live output.`,
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
      `Keep ${review.requestLabel} output review preview-only until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH}.`,
    explicitSyntheticJoinOnlyNoRealOutputNoPersistenceStatement:
      OUTPUT_ONLY_STATEMENT,
  };
}

const OUTPUT_REVIEW_RECORDS = REVIEW_RECORDS.map(buildOutputReviewRecord);

function buildGateFailureOperatorFacingExplanation(
  review: BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord,
  gateRecord: SyntheticAuditApprovalJoinGateRecord
): string {
  return `${review.requestLabel} remains blocked at ${gateRecord.label} because the review layer must stay backend-only, server-only, synthetic-only, in-memory-only, and not persistent.`;
}

function buildGateFailureRequiredRecoveryAction(
  gateRecord: SyntheticAuditApprovalJoinGateRecord
): string {
  return `Keep ${gateRecord.label} held until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH} defines backend-owned end-to-end packet evidence without enabling live prompts, models, providers, approvals, or persistence.`;
}

function buildGateFailureNextSafeAction(
  gateRecord: SyntheticAuditApprovalJoinGateRecord
): string {
  return `Review ${gateRecord.label} as a preview-only blocker and carry it into ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH}.`;
}

function buildGateFailureReviewRecord(
  review: BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord,
  gateId: SyntheticAuditApprovalJoinGateId
): SyntheticAuditApprovalJoinGateFailureReviewRecord {
  const gateRecord = resolveJoinGateRecord(review.id, gateId);
  const seed = resolveRequiredRecord(
    GATE_FAILURE_SEEDS.get(gateId),
    `Missing audit approval join gate failure seed for ${gateId}.`
  );

  return {
    id: review.id,
    key: buildStableSyntheticAuditApprovalJoinGateFailureReviewKey(
      review.id,
      gateId
    ),
    gateFailureReviewVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-gate-failure-review-preview-v1",
    auditApprovalJoinReviewId: review.id,
    failedGateId: gateId,
    failedGateLabel: gateRecord.label,
    gateState: "blocked",
    severity: seed.severity,
    affectedCapabilityFamily: review.selectedCapabilityFamily.label,
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation: buildGateFailureOperatorFacingExplanation(
      review,
      gateRecord
    ),
    requiredEvidenceToUnblock: gateRecord.requiredState,
    requiredRecoveryAction: buildGateFailureRequiredRecoveryAction(gateRecord),
    endToEndPacketMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    nextSafeAction: buildGateFailureNextSafeAction(gateRecord),
    explicitNoLiveGatePassStatement: NO_LIVE_GATE_PASS_STATEMENT,
  };
}

const SYNTHETIC_AUDIT_APPROVAL_JOIN_GATE_IDS: readonly SyntheticAuditApprovalJoinGateId[] =
  [
    "backend-only-boundary",
    "server-only-module-boundary",
    "synthetic-only-join-mode",
    "manual-approval-fixture",
    "manual-confirmation-fixture",
    "synthetic-result-capture-present",
    "deterministic-audit-join-id",
    "deterministic-approval-join-id",
    "deterministic-join-digest",
    "in-memory-only-result-reference",
    "in-memory-only-audit-reference",
    "in-memory-only-approval-reference",
    "no-real-approval-recording",
    "no-approval-token-issuance",
    "no-approval-lease-issuance",
    "no-frontend-request",
    "no-api-route",
    "no-fetch-network",
    "no-provider-sdk-import",
    "no-provider-execution",
    "no-model-call",
    "no-prompt-sending",
    "no-queue-dispatch",
    "no-worker-dispatch",
    "no-job-execution",
    "no-result-persistence",
    "no-audit-persistence",
    "no-approval-persistence",
    "no-database-write",
    "no-file-write",
    "single-run-lock-preview",
    "idempotency-replay-preview",
    "timeout-cancel-preview",
    "privacy-redaction-preview",
  ] as const;

const ALL_GATE_FAILURE_REVIEW_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  SYNTHETIC_AUDIT_APPROVAL_JOIN_GATE_IDS.map((gateId) =>
    buildGateFailureReviewRecord(review, gateId)
  )
);

function buildRecoveryPlanRecord(
  review: BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord
): SyntheticAuditApprovalJoinRecoveryPlanPreviewRecord {
  return {
    id: review.id,
    key: buildStableSyntheticAuditApprovalJoinRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-recovery-plan-preview-v1",
    auditApprovalJoinReviewId: review.id,
    recoveryPosture: RECOVERY_POSTURE,
    serverOnlyJoinHelperRecovery:
      "Keep the server-only synthetic audit and approval join helper deterministic, review-safe, and in-memory only.",
    syntheticAuditAndApprovalJoinInputRecovery:
      "Keep the synthetic audit and approval join input typed, deterministic, and detached from frontend requests and API routes.",
    auditJoinOutputRecovery:
      "Keep audit join output preview-only and not persisted.",
    approvalJoinOutputRecovery:
      "Keep approval join output preview-only and not persisted.",
    joinEnvelopeRecovery:
      "Keep the join envelope limited to synthetic references and blocked live actions.",
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
      "Do not create a frontend request path for the join review.",
    apiRouteBoundaryRecovery:
      "Do not create an API route for the join helper.",
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
      `Review ${review.requestLabel} manually and keep the join review preview-only until the end-to-end packet MVP defines the next safe backend-owned evidence path.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    explicitNoRetryNoFallbackNoProviderNoPersistenceStatement:
      NO_RETRY_NO_FALLBACK_NO_PROVIDER_NO_PERSISTENCE_STATEMENT,
  };
}

const RECOVERY_PLAN_PREVIEW_RECORDS = REVIEW_RECORDS.map(buildRecoveryPlanRecord);

function buildRecoveryReadinessChecklistRecord(
  review: BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord,
  seed: ReadinessChecklistSeed
): SyntheticAuditApprovalJoinRecoveryReadinessChecklistRecord {
  return {
    id: review.id,
    key: buildStableSyntheticAuditApprovalJoinRecoveryReadinessChecklistKey(
      review.id,
      seed.checklistId
    ),
    checklistVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-recovery-readiness-checklist-v1",
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    endToEndPacketMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

const RECOVERY_READINESS_CHECKLIST_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  READINESS_CHECKLIST_SEEDS.map((seed) =>
    buildRecoveryReadinessChecklistRecord(review, seed)
  )
);

function buildReviewGateSummary(
  reviewId: MinimalSyntheticAuditApprovalJoinReviewId
): string {
  return ALL_GATE_FAILURE_REVIEW_RECORDS.filter(
    (record) => record.auditApprovalJoinReviewId === reviewId
  )
    .slice(0, 8)
    .map((record) => record.failedGateLabel)
    .join(" | ");
}

function buildReviewAuditSummaryRecord(
  review: BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord
): SyntheticAuditApprovalJoinReviewAuditSummaryRecord {
  return {
    id: review.id,
    key: buildStableSyntheticAuditApprovalJoinReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-review-audit-summary-preview-v1",
    auditApprovalJoinReviewId: review.id,
    auditPosture: "preview-only",
    syntheticJoinReferenceState: "preview-only / not persisted",
    syntheticResultReferenceState: "preview-only / not persisted",
    auditReferenceState: "preview-only / not persisted",
    approvalReferenceState: "preview-only / not persisted",
    evidencePacketState: "preview-only",
    serverOnlyJoinHelperEvidenceSummary:
      `${review.requestLabel} keeps the synthetic audit and approval join helper confined to a backend-owned server-only path.`,
    deterministicJoinEvidenceSummary:
      `${review.requestLabel} preserves deterministic preview-only join identifiers, digest posture, and in-memory references only.`,
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
    endToEndPacketMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
  };
}

const REVIEW_AUDIT_SUMMARY_RECORDS = REVIEW_RECORDS.map(
  buildReviewAuditSummaryRecord
);

function buildAcceptancePostureRecord(
  review: BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord
): SyntheticAuditApprovalJoinAcceptancePostureRecord {
  return {
    id: review.id,
    key: buildStableSyntheticAuditApprovalJoinAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-acceptance-posture-preview-v1",
    auditApprovalJoinReviewId: review.id,
    acceptanceState: ACCEPTANCE_STATE,
    syntheticOnlyAcceptanceSummary:
      `${review.requestLabel} is accepted only as a deterministic synthetic audit and approval join preview.`,
    backendOnlyAcceptanceSummary:
      "Backend-only acceptance is limited to server-side preview helpers and typed review records.",
    inMemoryOnlyAcceptanceSummary:
      "In-memory-only acceptance is limited to deterministic preview references and evidence.",
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
      "server-only synthetic audit and approval join helper exists",
      "synthetic audit and approval join is produced in memory only",
      "deterministic synthetic audit and approval join only",
      "manual approval fixture is preview-only",
      "manual confirmation fixture is preview-only",
      "blocked live persistence summary remains present",
    ],
    nextSafeAction:
      `Keep ${review.requestLabel} accepted only for synthetic preview review and move the next safe implementation step to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH}.`,
    explicitSyntheticJoinAcceptedLivePersistenceNotAcceptedStatement:
      ACCEPTANCE_STATEMENT,
  };
}

const ACCEPTANCE_POSTURE_RECORDS = REVIEW_RECORDS.map(
  buildAcceptancePostureRecord
);

function groupReviewRecordsByCapabilityFamily(
  records: readonly BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord[]
): readonly SyntheticAuditApprovalJoinReviewCapabilityFamilyGroup[] {
  const groups = new Map<
    BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord["selectedCapabilityFamily"]["id"],
    {
      capabilityFamilyId: BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord["selectedCapabilityFamily"]["id"];
      capabilityFamilyLabel: BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord["selectedCapabilityFamily"]["label"];
      reviews: BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord[];
    }
  >();

  records.forEach((review) => {
    const existingGroup = groups.get(review.selectedCapabilityFamily.id);
    if (existingGroup) {
      existingGroup.reviews.push(review);
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
  records: readonly BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord[]
): readonly SyntheticAuditApprovalJoinReviewWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord[]
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

export function listBackendOwnedMinimalManualGatedSyntheticDryRunAuditApprovalJoinReviews(): readonly BackendOwnedMinimalManualGatedSyntheticAuditApprovalJoinReviewRecord[] {
  return cloneList(REVIEW_RECORDS);
}

export function listSyntheticAuditApprovalJoinOutputReviewRecords(): readonly SyntheticAuditApprovalJoinOutputReviewRecord[] {
  return cloneList(OUTPUT_REVIEW_RECORDS);
}

export function listSyntheticAuditApprovalJoinGateFailureReviewRecords(): readonly SyntheticAuditApprovalJoinGateFailureReviewRecord[] {
  return cloneList(ALL_GATE_FAILURE_REVIEW_RECORDS);
}

export function listSyntheticAuditApprovalJoinRecoveryPlanPreviews(): readonly SyntheticAuditApprovalJoinRecoveryPlanPreviewRecord[] {
  return cloneList(RECOVERY_PLAN_PREVIEW_RECORDS);
}

export function listSyntheticAuditApprovalJoinRecoveryReadinessChecklistRecords(): readonly SyntheticAuditApprovalJoinRecoveryReadinessChecklistRecord[] {
  return cloneList(RECOVERY_READINESS_CHECKLIST_RECORDS);
}

export function listSyntheticAuditApprovalJoinReviewAuditSummaries(): readonly SyntheticAuditApprovalJoinReviewAuditSummaryRecord[] {
  return cloneList(REVIEW_AUDIT_SUMMARY_RECORDS);
}

export function listSyntheticAuditApprovalJoinAcceptancePostureRecords(): readonly SyntheticAuditApprovalJoinAcceptancePostureRecord[] {
  return cloneList(ACCEPTANCE_POSTURE_RECORDS);
}

export function groupSyntheticAuditApprovalJoinReviewsByCapabilityFamily(): readonly SyntheticAuditApprovalJoinReviewCapabilityFamilyGroup[] {
  return groupReviewRecordsByCapabilityFamily(REVIEW_RECORDS);
}

export function groupSyntheticAuditApprovalJoinReviewsByWorkspaceTarget(): readonly SyntheticAuditApprovalJoinReviewWorkspaceGroup[] {
  return groupReviewRecordsByWorkspaceTarget(REVIEW_RECORDS);
}

export function buildSyntheticAuditApprovalJoinReviewSummary(): SyntheticAuditApprovalJoinReviewSummary {
  const capabilityGroups =
    groupSyntheticAuditApprovalJoinReviewsByCapabilityFamily();
  const workspaceGroups = groupSyntheticAuditApprovalJoinReviewsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
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

export function buildSyntheticAuditApprovalJoinOutputReviewSummary(): SyntheticAuditApprovalJoinOutputReviewSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    outputReviewCount: OUTPUT_REVIEW_RECORDS.length,
    summaryLines: cloneList(OUTPUT_REVIEW_SUMMARY_LINES),
    nextSafeAction:
      `Keep synthetic audit and approval join output review preview-only until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH}.`,
  };
}

export function buildSyntheticAuditApprovalJoinGateFailureSummary(): SyntheticAuditApprovalJoinGateFailureSummary {
  const topFailedGateLabels = Array.from(
    new Set(
      ALL_GATE_FAILURE_REVIEW_RECORDS.map((record) => record.failedGateLabel)
    )
  );

  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    gateFailureCount: ALL_GATE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    topFailedGateLabels: cloneList(topFailedGateLabels),
    nextSafeAction:
      `Keep live gate pass blocked and carry failure evidence into ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH}.`,
  };
}

export function buildSyntheticAuditApprovalJoinRecoverySummary(): SyntheticAuditApprovalJoinRecoverySummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextSafeAction:
      `Keep recovery manual-review-only and move safe backend-owned expansion to ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_MVP_BATCH}.`,
  };
}

export function buildMinimalEndToEndPacketMvpChecklist(): MinimalEndToEndPacketMvpChecklist {
  return cloneList(MINIMAL_END_TO_END_PACKET_MVP_CHECKLIST);
}

export function buildUniqueSyntheticAuditApprovalJoinReviewDisplayStrings(): MinimalSyntheticAuditApprovalJoinReviewDisplayStrings {
  const items = [
    ...REVIEW_SUMMARY_LINES,
    ...OUTPUT_REVIEW_SUMMARY_LINES,
    ...GATE_FAILURE_SUMMARY_LINES,
    ...RECOVERY_SUMMARY_LINES,
  ];

  return cloneList(Array.from(new Set(items)));
}
