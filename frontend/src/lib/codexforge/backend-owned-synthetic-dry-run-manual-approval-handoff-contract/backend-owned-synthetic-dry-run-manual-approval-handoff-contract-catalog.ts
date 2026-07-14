import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  listBackendOwnedSyntheticDryRunEndToEndPacketContracts,
  listSyntheticEndToEndPacketLineageRecords,
  type BackendOwnedSyntheticDryRunEndToEndPacketContractRecord,
  type EndToEndPacketLineageRecord,
} from "../backend-owned-synthetic-dry-run-end-to-end-packet-contract";
import {
  listBackendOwnedSyntheticDryRunEndToEndPacketReviews,
  listEndToEndPacketAcceptancePostureRecords,
  listEndToEndPacketDecisionReviewRecords,
  listEndToEndPacketGateFailureReviewRecords,
  listEndToEndPacketRecoveryPlanPreviews,
  listEndToEndPacketRecoveryReadinessChecklistRecords,
  listEndToEndPacketReviewAuditSummaries,
  listEndToEndPacketStageFailureReviewRecords,
  type BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord,
  type EndToEndPacketAcceptancePostureRecord,
  type EndToEndPacketDecisionReviewRecord,
  type EndToEndPacketGateFailureReviewRecord,
  type EndToEndPacketRecoveryPlanPreviewRecord,
  type EndToEndPacketRecoveryReadinessChecklistRecord,
  type EndToEndPacketReviewId,
  type EndToEndPacketReviewAuditSummaryRecord,
  type EndToEndPacketStageFailureReviewRecord,
} from "../backend-owned-synthetic-dry-run-end-to-end-packet-review-recovery-preview";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_PHASE,
  NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
  type BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord,
  type ManualApprovalHandoffCapabilityFamilyGroup,
  type ManualApprovalHandoffContractId,
  type ManualApprovalHandoffContractSummary,
  type ManualApprovalHandoffContractKey,
  type ManualApprovalHandoffCurrentReadiness,
  type ManualApprovalHandoffErrorContractRecord,
  type ManualApprovalHandoffErrorKey,
  type ManualApprovalHandoffEvidenceSummaryKey,
  type ManualApprovalHandoffEvidenceSummaryRecord,
  type ManualApprovalHandoffGateId,
  type ManualApprovalHandoffGateKey,
  type ManualApprovalHandoffGateLabel,
  type ManualApprovalHandoffGateOwner,
  type ManualApprovalHandoffGateRecord,
  type ManualApprovalHandoffGateSummary,
  type ManualApprovalHandoffPacketKey,
  type ManualApprovalHandoffPacketRecord,
  type ManualApprovalHandoffReadinessKey,
  type ManualApprovalHandoffReadinessMatrixRecord,
  type ManualApprovalHandoffReadinessSummary,
  type ManualApprovalHandoffRequestContractRecord,
  type ManualApprovalHandoffRequestKey,
  type ManualApprovalHandoffResponseContractRecord,
  type ManualApprovalHandoffResponseKey,
  type ManualApprovalHandoffWorkspaceGroup,
  type ManualApprovalScopeId,
  type ManualApprovalScopeKey,
  type ManualApprovalScopeLabel,
  type ManualApprovalScopeRecord,
} from "./backend-owned-synthetic-dry-run-manual-approval-handoff-contract-types";

type ScopeSeed = Readonly<{
  id: ManualApprovalScopeId;
  label: ManualApprovalScopeLabel;
  operatorActionRequired: string;
  requiredEvidence: string;
  blockedActions: readonly string[];
  allowedFutureActionsIfApproved: readonly string[];
  disallowedActionsEvenIfApproved: readonly string[];
  currentSafetyPosture: string;
}>;

type GateSeed = Readonly<{
  id: ManualApprovalHandoffGateId;
  label: ManualApprovalHandoffGateLabel;
  owner: ManualApprovalHandoffGateOwner;
  requiredState: string;
  evidenceRequirement: string;
  blockedDefaultReason: string;
}>;

const HANDOFF_SUMMARY_LINES = [
  "backend-owned synthetic dry-run manual approval handoff contract only",
  "manual approval handoff contract is preview-only",
  "handoff state is draft / preview-only",
  "handoff request is not created",
  "handoff invocation is not invoked",
  "handoff response is not received",
  "handoff error is not received",
  "operator approval state is not requested",
  "manual confirmation state is not captured",
  "approval decision state is not evaluated",
  "approval token is not issued",
  "approval lease is not created",
  "approval reference is not persisted",
  "audit reference is not persisted",
  "result reference is not persisted",
  "evidence packet is preview-only",
  "end-to-end packet state is draft / preview-only",
  "packet decision state is held / not accepted",
  "admission state is not admitted",
  "dry-run execution is not executed",
  "result capture state is not captured",
  "audit join state is not persisted",
  "approval join state is not persisted",
  "database write is not implemented",
  "file write is not implemented",
  "no file writes",
  "current readiness is manual-approval-handoff-contract-only / not approved / not executable / not persistent",
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
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval required",
  "manual confirmation required",
  "kill switch required",
  "audit required",
  "opaque credential references only",
  "no plaintext secrets",
  "backend-owned synthetic dry-run manual approval handoff review and recovery preview next",
] as const;

const GATE_SUMMARY_LINES = [
  "end-to-end packet review gate",
  "packet acceptance posture gate",
  "evidence packet gate",
  "operator approval gate",
  "manual confirmation gate",
  "approval scope gate",
  "approval expiry gate",
  "approval revocation gate",
  "kill switch gate",
  "audit gate",
  "privacy/redaction gate",
  "cost/rate/timeout gate",
  "idempotency/replay gate",
  "single-run lock gate",
  "server-only boundary gate",
  "opaque credential gate",
  "no plaintext secrets gate",
  "no frontend provider call gate",
  "no provider SDK import gate",
  "no prompt sending gate",
  "no queue dispatch gate",
  "no worker dispatch gate",
  "no job execution gate",
  "no result persistence gate",
  "no audit persistence gate",
  "no approval persistence gate",
  "no database write gate",
  "no file write gate",
] as const;

const READINESS_SUMMARY_LINES = [
  "handoff contract state",
  "handoff packet state",
  "handoff request contract state",
  "handoff response contract state",
  "handoff error contract state",
  "approval scope state",
  "gate schema state",
  "end-to-end packet review dependency",
  "evidence packet dependency",
  "operator approval dependency",
  "manual confirmation dependency",
  "kill switch dependency",
  "audit boundary state",
  "privacy boundary state",
  "cost/rate boundary state",
  "server-only boundary state",
  "queue boundary state",
  "worker boundary state",
  "job boundary state",
  "result persistence boundary state",
  "audit persistence boundary state",
  "approval persistence boundary state",
  "database boundary state",
  "file boundary state",
  "current readiness: manual-approval-handoff-contract-only / not approved / not executable / not persistent",
  "next safe action",
] as const;

const NEXT_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_CHECKLIST = [
  "Review the manual approval handoff contract, packet, request contract, response contract, error contract, scope records, gate records, readiness matrix, and evidence summary without enabling execution or persistence.",
  "Keep operator approval not requested, manual confirmation not captured, approval decision not evaluated, approval token not issued, approval lease not created, and every approval, audit, result, database, and file reference non-persistent.",
  "Preserve no prompt sending, no model calls, no provider SDK imports, no provider execution, no queue dispatch, no worker dispatch, no job execution, no retry execution, and no fallback execution posture.",
  "Carry kill switch, audit, privacy/redaction, cost/rate/timeout, idempotency/replay, single-run lock, and server-only boundary requirements into the next review and recovery preview batch.",
  "Keep the next batch backend-owned, deterministic, frontend-safe, review-first, and focused on manual approval handoff review and recovery preview only.",
] as const;

const MANUAL_APPROVAL_SCOPE_SEEDS = [
  {
    id: "synthetic-result-review-scope",
    label: "synthetic result review scope",
    operatorActionRequired:
      "Review the held synthetic result evidence and confirm it remains a static preview only.",
    requiredEvidence:
      "Synthetic result placeholder evidence, held result capture posture, and blocked persistence summary.",
    blockedActions: [
      "Do not capture a result record.",
      "Do not persist a result reference.",
    ],
    allowedFutureActionsIfApproved: [
      "Review backend-owned synthetic result capture continuation requirements.",
    ],
    disallowedActionsEvenIfApproved: [
      "Do not execute providers.",
      "Do not persist results.",
    ],
    currentSafetyPosture:
      "Preview-only result review remains blocked by operator approval, manual confirmation, audit, and persistence boundaries.",
  },
  {
    id: "audit-join-review-scope",
    label: "audit join review scope",
    operatorActionRequired:
      "Review audit join evidence and confirm audit references remain preview-only and not persisted.",
    requiredEvidence:
      "Audit join review reference, audit summary, and non-persistent audit boundary evidence.",
    blockedActions: [
      "Do not persist an audit join.",
      "Do not create audit records.",
    ],
    allowedFutureActionsIfApproved: [
      "Review backend-owned audit join continuation requirements.",
    ],
    disallowedActionsEvenIfApproved: [
      "Do not persist audit references.",
      "Do not write audit records.",
    ],
    currentSafetyPosture:
      "Audit review remains blocked by manual approval, audit policy, and server-only persistence boundaries.",
  },
  {
    id: "approval-join-review-scope",
    label: "approval join review scope",
    operatorActionRequired:
      "Review approval join evidence and confirm approval references remain preview-only and not persisted.",
    requiredEvidence:
      "Approval join review reference, held approval posture, and non-persistent approval boundary evidence.",
    blockedActions: [
      "Do not persist an approval join.",
      "Do not issue approval references.",
    ],
    allowedFutureActionsIfApproved: [
      "Review backend-owned approval join continuation requirements.",
    ],
    disallowedActionsEvenIfApproved: [
      "Do not persist approval references.",
      "Do not issue approval tokens.",
    ],
    currentSafetyPosture:
      "Approval review remains blocked by operator approval, manual confirmation, and non-persistent approval boundaries.",
  },
  {
    id: "end-to-end-packet-acceptance-scope",
    label: "end-to-end packet acceptance scope",
    operatorActionRequired:
      "Review packet acceptance blockers while keeping the packet held and not accepted.",
    requiredEvidence:
      "End-to-end packet acceptance posture, held decision review, and blocker evidence.",
    blockedActions: [
      "Do not accept the packet.",
      "Do not admit the packet for execution.",
    ],
    allowedFutureActionsIfApproved: [
      "Review the next backend-owned acceptance recovery preview.",
    ],
    disallowedActionsEvenIfApproved: [
      "Do not execute the dry-run packet.",
      "Do not persist acceptance results.",
    ],
    currentSafetyPosture:
      "Packet acceptance remains blocked by review-only acceptance posture, operator approval, and persistence boundaries.",
  },
  {
    id: "backend-only-runner-continuation-scope",
    label: "backend-only runner continuation scope",
    operatorActionRequired:
      "Confirm any future continuation remains backend-only and never callable from the frontend.",
    requiredEvidence:
      "Server-only boundary evidence, backend admission reference, and blocked frontend posture summary.",
    blockedActions: [
      "Do not invoke a frontend runner.",
      "Do not expose a callable frontend execution path.",
    ],
    allowedFutureActionsIfApproved: [
      "Review backend-only continuation prerequisites in the next batch.",
    ],
    disallowedActionsEvenIfApproved: [
      "Do not execute a runner from the frontend.",
      "Do not expose live API routes.",
    ],
    currentSafetyPosture:
      "Runner continuation remains blocked by server-only boundaries and backend-owned execution requirements.",
  },
  {
    id: "no-provider-execution-scope",
    label: "no provider execution scope",
    operatorActionRequired:
      "Confirm provider execution remains blocked and no provider call posture changes are introduced.",
    requiredEvidence:
      "Provider call posture, model call posture, prompt posture, and SDK posture evidence.",
    blockedActions: [
      "Do not call providers.",
      "Do not call models.",
    ],
    allowedFutureActionsIfApproved: [
      "Review provider execution blockers in a future backend-only phase.",
    ],
    disallowedActionsEvenIfApproved: [
      "Do not import provider SDKs.",
      "Do not send prompts.",
    ],
    currentSafetyPosture:
      "Provider execution remains blocked by default with no model calls, no prompt sending, and no SDK imports.",
  },
  {
    id: "no-persistence-scope",
    label: "no persistence scope",
    operatorActionRequired:
      "Confirm result, audit, approval, database, and file persistence all remain unimplemented.",
    requiredEvidence:
      "Non-persistent result, audit, approval, database, and file posture evidence.",
    blockedActions: [
      "Do not persist any records.",
      "Do not create database or file writes.",
    ],
    allowedFutureActionsIfApproved: [
      "Review persistence guardrails in a future backend-only phase.",
    ],
    disallowedActionsEvenIfApproved: [
      "Do not store results.",
      "Do not store approvals or audit records.",
    ],
    currentSafetyPosture:
      "Persistence remains blocked across result, audit, approval, database, and file boundaries.",
  },
  {
    id: "no-queue-dispatch-scope",
    label: "no queue dispatch scope",
    operatorActionRequired:
      "Confirm queue dispatch remains blocked and not dispatched.",
    requiredEvidence:
      "Queue boundary evidence, blocked action summary, and job orchestration denial posture.",
    blockedActions: ["Do not dispatch queues."],
    allowedFutureActionsIfApproved: [
      "Review queue boundary posture in a future backend-only phase.",
    ],
    disallowedActionsEvenIfApproved: [
      "Do not dispatch queue work from this contract layer.",
    ],
    currentSafetyPosture:
      "Queue dispatch remains blocked and not dispatched.",
  },
  {
    id: "no-worker-dispatch-scope",
    label: "no worker dispatch scope",
    operatorActionRequired:
      "Confirm worker dispatch remains blocked and not dispatched.",
    requiredEvidence:
      "Worker boundary evidence, blocked action summary, and orchestration denial posture.",
    blockedActions: ["Do not dispatch workers."],
    allowedFutureActionsIfApproved: [
      "Review worker boundary posture in a future backend-only phase.",
    ],
    disallowedActionsEvenIfApproved: [
      "Do not dispatch worker execution from this contract layer.",
    ],
    currentSafetyPosture:
      "Worker dispatch remains blocked and not dispatched.",
  },
  {
    id: "no-job-execution-scope",
    label: "no job execution scope",
    operatorActionRequired:
      "Confirm job execution remains blocked and not executed.",
    requiredEvidence:
      "Job boundary evidence, blocked action summary, and execution denial posture.",
    blockedActions: ["Do not execute jobs."],
    allowedFutureActionsIfApproved: [
      "Review job execution boundaries in a future backend-only phase.",
    ],
    disallowedActionsEvenIfApproved: [
      "Do not execute jobs from this contract layer.",
    ],
    currentSafetyPosture:
      "Job execution remains blocked and not executed.",
  },
] as const satisfies readonly ScopeSeed[];

const MANUAL_APPROVAL_GATE_SEEDS = [
  {
    id: "end-to-end-packet-review-gate",
    label: "end-to-end packet review gate",
    owner: "backend manual approval handoff contract",
    requiredState:
      "A reviewed end-to-end packet review reference must remain linked and preview-only.",
    evidenceRequirement:
      "End-to-end packet review, decision review, and blocker evidence must remain visible.",
    blockedDefaultReason:
      "The handoff stays blocked until the reviewed packet remains held and preview-only.",
  },
  {
    id: "packet-acceptance-posture-gate",
    label: "packet acceptance posture gate",
    owner: "backend manual approval handoff contract",
    requiredState:
      "Acceptance posture must remain held / not accepted and preview-only.",
    evidenceRequirement:
      "Packet acceptance posture reference and acceptance blocker evidence must remain visible.",
    blockedDefaultReason:
      "Acceptance remains blocked because the packet is still held and not accepted.",
  },
  {
    id: "evidence-packet-gate",
    label: "evidence packet gate",
    owner: "backend manual approval handoff contract",
    requiredState: "Evidence packet posture must remain preview-only.",
    evidenceRequirement:
      "Evidence packet reference, review audit summary, and blocker evidence must remain visible.",
    blockedDefaultReason:
      "Evidence remains preview-only and cannot advance into persistence.",
  },
  {
    id: "operator-approval-gate",
    label: "operator approval gate",
    owner: "operator",
    requiredState: "Operator approval must be explicitly requested in a future backend-only path.",
    evidenceRequirement:
      "Operator approval request evidence and approval scope evidence must remain visible.",
    blockedDefaultReason:
      "Operator approval is not requested in this preview-only contract layer.",
  },
  {
    id: "manual-confirmation-gate",
    label: "manual confirmation gate",
    owner: "operator",
    requiredState:
      "Manual confirmation must be explicitly captured in a future backend-only path.",
    evidenceRequirement:
      "Manual confirmation evidence and operator acknowledgement posture must remain visible.",
    blockedDefaultReason:
      "Manual confirmation is not captured in this preview-only contract layer.",
  },
  {
    id: "approval-scope-gate",
    label: "approval scope gate",
    owner: "operator",
    requiredState:
      "Approval scope records must remain preview-only / not approved until a future backend-only review path exists.",
    evidenceRequirement:
      "Scope records, blocked actions, and allowed future actions must remain visible.",
    blockedDefaultReason:
      "Approval scopes remain preview-only and are not approved.",
  },
  {
    id: "approval-expiry-gate",
    label: "approval expiry gate",
    owner: "backend future",
    requiredState:
      "Any future approval expiry must remain backend-owned and server-only.",
    evidenceRequirement:
      "Approval expiry policy evidence and server-only boundary notes must remain visible.",
    blockedDefaultReason:
      "Approval expiry remains undefined because no live approval exists.",
  },
  {
    id: "approval-revocation-gate",
    label: "approval revocation gate",
    owner: "backend future",
    requiredState:
      "Any future approval revocation must remain backend-owned and server-only.",
    evidenceRequirement:
      "Approval revocation policy evidence and operator review notes must remain visible.",
    blockedDefaultReason:
      "Approval revocation remains undefined because no live approval exists.",
  },
  {
    id: "kill-switch-gate",
    label: "kill switch gate",
    owner: "safety review",
    requiredState: "Kill switch review must remain required before any future backend-only execution path.",
    evidenceRequirement:
      "Kill switch requirement, blocked action summary, and operator review notes must remain visible.",
    blockedDefaultReason:
      "Kill switch review is still required and remains unresolved.",
  },
  {
    id: "audit-gate",
    label: "audit gate",
    owner: "safety review",
    requiredState:
      "Audit review must remain required before any future backend-only execution path.",
    evidenceRequirement:
      "Audit requirement, review audit summary, and non-persistent audit posture must remain visible.",
    blockedDefaultReason:
      "Audit remains required and audit persistence is not implemented.",
  },
  {
    id: "privacy-redaction-gate",
    label: "privacy/redaction gate",
    owner: "safety review",
    requiredState:
      "Privacy/redaction review must remain required before any future backend-only execution path.",
    evidenceRequirement:
      "Privacy evidence, redaction posture, and secret posture must remain visible.",
    blockedDefaultReason:
      "Privacy/redaction review remains required and unresolved.",
  },
  {
    id: "cost-rate-timeout-gate",
    label: "cost/rate/timeout gate",
    owner: "safety review",
    requiredState:
      "Cost acknowledgement, rate limit guard, and timeout/cancel guard must remain required.",
    evidenceRequirement:
      "Cost, rate, and timeout guard evidence must remain visible.",
    blockedDefaultReason:
      "Cost, rate, and timeout review remains required and unresolved.",
  },
  {
    id: "idempotency-replay-gate",
    label: "idempotency/replay gate",
    owner: "safety review",
    requiredState:
      "Idempotency and replay block proof must remain required before any future execution path.",
    evidenceRequirement:
      "Idempotency, replay block, and deterministic key evidence must remain visible.",
    blockedDefaultReason:
      "Idempotency and replay safeguards remain required and unresolved.",
  },
  {
    id: "single-run-lock-gate",
    label: "single-run lock gate",
    owner: "safety review",
    requiredState:
      "Single-run lock proof must remain required before any future execution path.",
    evidenceRequirement:
      "Single-run lock evidence and blocked runner continuation posture must remain visible.",
    blockedDefaultReason:
      "Single-run lock remains required and unresolved.",
  },
  {
    id: "server-only-boundary-gate",
    label: "server-only boundary gate",
    owner: "backend future",
    requiredState:
      "Any future handoff must remain backend-owned and server-only.",
    evidenceRequirement:
      "Server-only boundary evidence and blocked frontend posture must remain visible.",
    blockedDefaultReason:
      "Server-only execution remains required and unresolved.",
  },
  {
    id: "opaque-credential-gate",
    label: "opaque credential gate",
    owner: "safety review",
    requiredState:
      "Only opaque credential references may exist in any future backend-only path.",
    evidenceRequirement:
      "Credential posture evidence and provider boundary notes must remain visible.",
    blockedDefaultReason:
      "Opaque credential posture remains mandatory.",
  },
  {
    id: "no-plaintext-secrets-gate",
    label: "no plaintext secrets gate",
    owner: "safety review",
    requiredState:
      "No plaintext secrets may exist in any future backend-only path.",
    evidenceRequirement:
      "Secret posture evidence and redaction notes must remain visible.",
    blockedDefaultReason:
      "Plaintext secrets are disallowed.",
  },
  {
    id: "no-frontend-provider-call-gate",
    label: "no frontend provider call gate",
    owner: "backend future",
    requiredState:
      "Frontend provider calls must remain blocked.",
    evidenceRequirement:
      "Frontend posture evidence and provider boundary notes must remain visible.",
    blockedDefaultReason:
      "Frontend provider calls remain blocked.",
  },
  {
    id: "no-provider-sdk-import-gate",
    label: "no provider SDK import gate",
    owner: "backend future",
    requiredState:
      "Provider SDK imports must remain absent from the frontend contract layer.",
    evidenceRequirement:
      "SDK posture evidence and import boundary notes must remain visible.",
    blockedDefaultReason:
      "Provider SDK imports remain disallowed.",
  },
  {
    id: "no-prompt-sending-gate",
    label: "no prompt sending gate",
    owner: "backend future",
    requiredState: "Prompt sending must remain unimplemented.",
    evidenceRequirement:
      "Prompt posture evidence and blocked action summary must remain visible.",
    blockedDefaultReason:
      "Prompt sending remains unimplemented.",
  },
  {
    id: "no-queue-dispatch-gate",
    label: "no queue dispatch gate",
    owner: "backend future",
    requiredState: "Queue dispatch must remain blocked and not dispatched.",
    evidenceRequirement:
      "Queue boundary evidence and blocked action summary must remain visible.",
    blockedDefaultReason:
      "Queue dispatch remains blocked and not dispatched.",
  },
  {
    id: "no-worker-dispatch-gate",
    label: "no worker dispatch gate",
    owner: "backend future",
    requiredState: "Worker dispatch must remain blocked and not dispatched.",
    evidenceRequirement:
      "Worker boundary evidence and blocked action summary must remain visible.",
    blockedDefaultReason:
      "Worker dispatch remains blocked and not dispatched.",
  },
  {
    id: "no-job-execution-gate",
    label: "no job execution gate",
    owner: "backend future",
    requiredState: "Job execution must remain blocked and not executed.",
    evidenceRequirement:
      "Job boundary evidence and blocked action summary must remain visible.",
    blockedDefaultReason:
      "Job execution remains blocked and not executed.",
  },
  {
    id: "no-result-persistence-gate",
    label: "no result persistence gate",
    owner: "backend future",
    requiredState: "Result persistence must remain unimplemented.",
    evidenceRequirement:
      "Result boundary evidence and non-persistent result posture must remain visible.",
    blockedDefaultReason:
      "Result persistence remains unimplemented.",
  },
  {
    id: "no-audit-persistence-gate",
    label: "no audit persistence gate",
    owner: "backend future",
    requiredState: "Audit persistence must remain unimplemented.",
    evidenceRequirement:
      "Audit boundary evidence and non-persistent audit posture must remain visible.",
    blockedDefaultReason:
      "Audit persistence remains unimplemented.",
  },
  {
    id: "no-approval-persistence-gate",
    label: "no approval persistence gate",
    owner: "backend future",
    requiredState: "Approval persistence must remain unimplemented.",
    evidenceRequirement:
      "Approval boundary evidence and non-persistent approval posture must remain visible.",
    blockedDefaultReason:
      "Approval persistence remains unimplemented.",
  },
  {
    id: "no-database-write-gate",
    label: "no database write gate",
    owner: "backend future",
    requiredState: "Database writes must remain unimplemented.",
    evidenceRequirement:
      "Database boundary evidence and non-persistent database posture must remain visible.",
    blockedDefaultReason:
      "Database writes remain unimplemented.",
  },
  {
    id: "no-file-write-gate",
    label: "no file write gate",
    owner: "backend future",
    requiredState: "File writes must remain unimplemented.",
    evidenceRequirement:
      "File boundary evidence and non-persistent file posture must remain visible.",
    blockedDefaultReason:
      "File writes remain unimplemented.",
  },
] as const satisfies readonly GateSeed[];

function cloneList<T>(records: readonly T[]): readonly T[] {
  return [...records];
}

function cloneCapabilityFamily(
  family: BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord["selectedCapabilityFamily"]
): BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord["selectedCapabilityFamily"] {
  return { ...family };
}

function resolveRequiredRecord<T>(record: T | undefined, message: string): T {
  if (!record) {
    throw new Error(message);
  }

  return record;
}

function buildContractLabel(requestLabel: string): string {
  return `Backend-owned ${requestLabel} synthetic dry-run manual approval handoff contract`;
}

function buildNextSafeAction(requestLabel: string): string {
  return `Review the ${requestLabel} handoff contract, packet, request/response/error posture, scopes, gates, readiness, and evidence summary before the backend-owned synthetic dry-run manual approval handoff review and recovery preview batch.`;
}

function buildBlockedDefaultReason(requestLabel: string): string {
  return `Manual approval handoff remains preview-only for ${requestLabel} because operator approval is not requested, manual confirmation is not captured, and execution and persistence remain blocked by default.`;
}

function groupRecordsById<T>(
  records: readonly T[],
  resolveId: (record: T) => EndToEndPacketReviewId
): ReadonlyMap<EndToEndPacketReviewId, readonly T[]> {
  const grouped = new Map<EndToEndPacketReviewId, T[]>();

  records.forEach((record) => {
    const id = resolveId(record);
    const existing = grouped.get(id);

    if (existing) {
      existing.push(record);
      return;
    }

    grouped.set(id, [record]);
  });

  return grouped;
}

export function buildStableManualApprovalHandoffContractKey(
  id: ManualApprovalHandoffContractId
): ManualApprovalHandoffContractKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-contract:${id}`;
}

export function buildStableManualApprovalHandoffPacketKey(
  id: ManualApprovalHandoffContractId
): ManualApprovalHandoffPacketKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-packet:${id}`;
}

export function buildStableManualApprovalHandoffRequestKey(
  id: ManualApprovalHandoffContractId
): ManualApprovalHandoffRequestKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-request:${id}`;
}

export function buildStableManualApprovalHandoffResponseKey(
  id: ManualApprovalHandoffContractId
): ManualApprovalHandoffResponseKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-response:${id}`;
}

export function buildStableManualApprovalHandoffErrorKey(
  id: ManualApprovalHandoffContractId
): ManualApprovalHandoffErrorKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-error:${id}`;
}

export function buildStableManualApprovalScopeKey(
  handoffContractId: ManualApprovalHandoffContractId,
  scopeId: ManualApprovalScopeId
): ManualApprovalScopeKey {
  return `backend-owned-synthetic-dry-run-manual-approval-scope:${handoffContractId}:${scopeId}`;
}

export function buildStableManualApprovalHandoffGateKey(
  handoffContractId: ManualApprovalHandoffContractId,
  gateId: ManualApprovalHandoffGateId
): ManualApprovalHandoffGateKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-gate:${handoffContractId}:${gateId}`;
}

export function buildStableManualApprovalHandoffReadinessKey(
  id: ManualApprovalHandoffContractId
): ManualApprovalHandoffReadinessKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-readiness:${id}`;
}

export function buildStableManualApprovalHandoffEvidenceSummaryKey(
  id: ManualApprovalHandoffContractId
): ManualApprovalHandoffEvidenceSummaryKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-evidence-summary:${id}`;
}

const END_TO_END_PACKET_CONTRACTS = listBackendOwnedSyntheticDryRunEndToEndPacketContracts();
const END_TO_END_PACKET_LINEAGES = listSyntheticEndToEndPacketLineageRecords();
const END_TO_END_PACKET_REVIEWS = listBackendOwnedSyntheticDryRunEndToEndPacketReviews();
const END_TO_END_PACKET_DECISION_REVIEWS = listEndToEndPacketDecisionReviewRecords();
const END_TO_END_PACKET_STAGE_FAILURE_REVIEWS =
  listEndToEndPacketStageFailureReviewRecords();
const END_TO_END_PACKET_GATE_FAILURE_REVIEWS =
  listEndToEndPacketGateFailureReviewRecords();
const END_TO_END_PACKET_RECOVERY_PLANS = listEndToEndPacketRecoveryPlanPreviews();
const END_TO_END_PACKET_RECOVERY_READINESS =
  listEndToEndPacketRecoveryReadinessChecklistRecords();
const END_TO_END_PACKET_REVIEW_AUDIT_SUMMARIES =
  listEndToEndPacketReviewAuditSummaries();
const END_TO_END_PACKET_ACCEPTANCE_POSTURES =
  listEndToEndPacketAcceptancePostureRecords();

const END_TO_END_PACKET_CONTRACTS_BY_ID = new Map(
  END_TO_END_PACKET_CONTRACTS.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_LINEAGES_BY_ID = new Map(
  END_TO_END_PACKET_LINEAGES.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_DECISION_REVIEWS_BY_ID = new Map(
  END_TO_END_PACKET_DECISION_REVIEWS.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_RECOVERY_PLANS_BY_ID = new Map(
  END_TO_END_PACKET_RECOVERY_PLANS.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_REVIEW_AUDIT_SUMMARIES_BY_ID = new Map(
  END_TO_END_PACKET_REVIEW_AUDIT_SUMMARIES.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_ACCEPTANCE_POSTURES_BY_ID = new Map(
  END_TO_END_PACKET_ACCEPTANCE_POSTURES.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_STAGE_FAILURE_REVIEWS_BY_ID = groupRecordsById(
  END_TO_END_PACKET_STAGE_FAILURE_REVIEWS,
  (record) => record.endToEndPacketReviewId
);
const END_TO_END_PACKET_GATE_FAILURE_REVIEWS_BY_ID = groupRecordsById(
  END_TO_END_PACKET_GATE_FAILURE_REVIEWS,
  (record) => record.endToEndPacketReviewId
);
const END_TO_END_PACKET_RECOVERY_READINESS_BY_ID = groupRecordsById(
  END_TO_END_PACKET_RECOVERY_READINESS,
  (record) => record.endToEndPacketReviewId
);

function buildManualApprovalHandoffContractRecord(
  review: BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord
): BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord {
  const packetContract = resolveRequiredRecord(
    END_TO_END_PACKET_CONTRACTS_BY_ID.get(review.id),
    `Missing end-to-end packet contract for manual approval handoff ${review.id}.`
  );
  const decisionReview = resolveRequiredRecord(
    END_TO_END_PACKET_DECISION_REVIEWS_BY_ID.get(review.id),
    `Missing end-to-end packet decision review for manual approval handoff ${review.id}.`
  );
  const stageFailures = resolveRequiredRecord(
    END_TO_END_PACKET_STAGE_FAILURE_REVIEWS_BY_ID.get(review.id),
    `Missing end-to-end packet stage failures for manual approval handoff ${review.id}.`
  );
  const gateFailures = resolveRequiredRecord(
    END_TO_END_PACKET_GATE_FAILURE_REVIEWS_BY_ID.get(review.id),
    `Missing end-to-end packet gate failures for manual approval handoff ${review.id}.`
  );
  const recoveryPlan = resolveRequiredRecord(
    END_TO_END_PACKET_RECOVERY_PLANS_BY_ID.get(review.id),
    `Missing end-to-end packet recovery plan for manual approval handoff ${review.id}.`
  );
  const readinessRecords = resolveRequiredRecord(
    END_TO_END_PACKET_RECOVERY_READINESS_BY_ID.get(review.id),
    `Missing end-to-end packet recovery readiness for manual approval handoff ${review.id}.`
  );
  const reviewAuditSummary = resolveRequiredRecord(
    END_TO_END_PACKET_REVIEW_AUDIT_SUMMARIES_BY_ID.get(review.id),
    `Missing end-to-end packet review audit summary for manual approval handoff ${review.id}.`
  );
  const acceptancePosture = resolveRequiredRecord(
    END_TO_END_PACKET_ACCEPTANCE_POSTURES_BY_ID.get(review.id),
    `Missing end-to-end packet acceptance posture for manual approval handoff ${review.id}.`
  );

  return {
    id: review.id,
    key: buildStableManualApprovalHandoffContractKey(review.id),
    handoffContractVersion:
      "backend-owned-synthetic-dry-run-manual-approval-handoff-contract-v1",
    previewOnlyStatement: "manual approval handoff contract is preview-only",
    requestLabel: review.requestLabel,
    label: buildContractLabel(review.requestLabel),
    workspaceTarget: review.workspaceTarget,
    source: "Athena / Jarvis Model Gateway",
    owner: "backend-owned",
    frontendMode: "preview-only",
    contractMode: "contract-only",
    handoffPosture:
      "manual approval handoff / not executable / not persistent",
    sourceEndToEndPacketReviewReference: review.key,
    sourceEndToEndPacketDecisionReviewReference: decisionReview.key,
    sourceEndToEndPacketStageFailureReviewReference: stageFailures[0].key,
    sourceEndToEndPacketStageFailureReviewReferences: stageFailures.map(
      (record) => record.key
    ),
    sourceEndToEndPacketGateFailureReviewReference: gateFailures[0].key,
    sourceEndToEndPacketGateFailureReviewReferences: gateFailures.map(
      (record) => record.key
    ),
    sourceEndToEndPacketRecoveryPlanReference: recoveryPlan.key,
    sourceEndToEndPacketRecoveryReadinessReference: readinessRecords[0].key,
    sourceEndToEndPacketRecoveryReadinessReferences: readinessRecords.map(
      (record) => record.key
    ),
    sourceEndToEndPacketReviewAuditSummaryReference: reviewAuditSummary.key,
    sourceEndToEndPacketAcceptancePostureReference: acceptancePosture.key,
    sourceEndToEndPacketContractReference:
      review.sourceEndToEndPacketContractReference,
    sourceRunIntentReference: review.sourceRunIntentReference,
    sourceApprovalPacketReference: review.sourceApprovalPacketReference,
    sourceManualAdmissionPreviewReference:
      packetContract.sourceManualAdmissionPreviewReference,
    sourceBackendAdmissionContractReference:
      packetContract.sourceBackendAdmissionContractReference,
    sourceSyntheticRunnerSkeletonReference:
      review.sourceSyntheticRunnerSkeletonReference,
    sourceResultCaptureReviewReference: review.sourceResultCaptureReviewReference,
    sourceAuditApprovalJoinReviewReference:
      review.sourceAuditApprovalJoinReviewReference,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    providerSlotLabel: review.providerSlotLabel,
    backupProviderSlotLabel: review.backupProviderSlotLabel,
    localPrivateAlternativeLabel: review.localPrivateAlternativeLabel,
    handoffState: "draft / preview-only",
    handoffRequestState: "not created",
    handoffInvocationState: "not invoked",
    handoffResponseState: "not received",
    handoffErrorState: "not received",
    operatorApprovalState: "not requested",
    manualConfirmationState: "not captured",
    approvalDecisionState: "not evaluated",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    approvalReferenceState: "not persisted",
    auditReferenceState: "not persisted",
    resultReferenceState: "not persisted",
    evidencePacketState: "preview-only",
    endToEndPacketState: "draft / preview-only",
    packetDecisionState: "held / not accepted",
    admissionState: "not admitted",
    dryRunExecutionState: "not executed",
    resultCaptureState: "not captured",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    queueDispatchState: "not dispatched",
    workerDispatchState: "not dispatched",
    jobExecutionState: "not executed",
    providerCallPosture: "not implemented",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    manualApprovalRequired: "manual approval required",
    manualConfirmationRequired: "manual confirmation required",
    killSwitchRequired: "kill switch required",
    auditRequired: "audit required",
    privacyRedactionRequired: "privacy/redaction required",
    costAcknowledgementRequired: "cost acknowledgement required",
    rateLimitGuardRequired: "rate limit guard required",
    timeoutCancelGuardRequired: "timeout/cancel guard required",
    idempotencyRequired: "idempotency required",
    replayBlockRequired: "replay block required",
    singleRunLockRequired: "single-run lock required",
    noRetryExecution: "no retry execution",
    noFallbackExecution: "no fallback execution",
    nextManualApprovalHandoffReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
    blockedDefaultReason: buildBlockedDefaultReason(review.requestLabel),
    nextSafeAction: buildNextSafeAction(review.requestLabel),
  };
}

const MANUAL_APPROVAL_HANDOFF_CONTRACTS = END_TO_END_PACKET_REVIEWS.map((review) =>
  buildManualApprovalHandoffContractRecord(review)
);

const MANUAL_APPROVAL_HANDOFF_CONTRACTS_BY_ID = new Map(
  MANUAL_APPROVAL_HANDOFF_CONTRACTS.map((record) => [record.id, record] as const)
);

function buildManualApprovalHandoffPacketRecord(
  contract: BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord,
  reviewAuditSummary: EndToEndPacketReviewAuditSummaryRecord,
  acceptancePosture: EndToEndPacketAcceptancePostureRecord,
  lineage: EndToEndPacketLineageRecord
): ManualApprovalHandoffPacketRecord {
  return {
    id: contract.id,
    key: buildStableManualApprovalHandoffPacketKey(contract.id),
    handoffPacketVersion:
      "backend-owned-synthetic-dry-run-manual-approval-handoff-packet-v1",
    handoffContractId: contract.id,
    requestLabel: contract.requestLabel,
    label: `${contract.requestLabel} manual approval handoff packet`,
    workspaceTarget: contract.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(
      contract.selectedCapabilityFamily
    ),
    sourceEndToEndPacketReviewReference:
      contract.sourceEndToEndPacketReviewReference,
    sourceAcceptancePostureReference:
      contract.sourceEndToEndPacketAcceptancePostureReference,
    sourceEvidencePacketReference: lineage.evidencePacketReference,
    packetMode: "preview-only",
    operatorFacingSummary:
      `${contract.requestLabel} remains held for manual operator review only. The handoff packet is a deterministic preview and cannot request approval or execute anything.`,
    requestedApprovalScope:
      "Synthetic result review, audit join review, approval join review, end-to-end packet acceptance, and backend-only runner continuation review.",
    approvalReasonSummary:
      `${contract.requestLabel} remains blocked because operator approval is not requested, manual confirmation is not captured, and the packet remains held / not accepted.`,
    safetyEvidenceSummary: reviewAuditSummary.blockedActionSummary,
    privacyRedactionSummary:
      `${contract.privacyRedactionRequired}. ${contract.credentialPosture}. ${contract.secretPosture}.`,
    costRateTimeoutSummary:
      `${contract.costAcknowledgementRequired}. ${contract.rateLimitGuardRequired}. ${contract.timeoutCancelGuardRequired}. ${contract.idempotencyRequired}. ${contract.replayBlockRequired}. ${contract.singleRunLockRequired}.`,
    blockedActionSummary:
      "No prompt sending. No model calls. No provider execution. No queue dispatch. No worker dispatch. No job execution.",
    remainingBlockerSummary:
      `${acceptancePosture.runIntentBlockers[0]} | ${acceptancePosture.persistenceBlockers[0]} | operator approval state: ${contract.operatorApprovalState} | manual confirmation state: ${contract.manualConfirmationState}`,
    manualApprovalState: "not requested",
    manualConfirmationState: "not captured",
    persistenceState: "not implemented",
    explicitNoApprovalRequestNoPersistenceStatement:
      "No approval request created. No persistence.",
  };
}

const MANUAL_APPROVAL_HANDOFF_PACKETS = MANUAL_APPROVAL_HANDOFF_CONTRACTS.map(
  (contract) =>
    buildManualApprovalHandoffPacketRecord(
      contract,
      resolveRequiredRecord(
        END_TO_END_PACKET_REVIEW_AUDIT_SUMMARIES_BY_ID.get(contract.id),
        `Missing audit summary for manual approval handoff packet ${contract.id}.`
      ),
      resolveRequiredRecord(
        END_TO_END_PACKET_ACCEPTANCE_POSTURES_BY_ID.get(contract.id),
        `Missing acceptance posture for manual approval handoff packet ${contract.id}.`
      ),
      resolveRequiredRecord(
        END_TO_END_PACKET_LINEAGES_BY_ID.get(contract.id),
        `Missing lineage for manual approval handoff packet ${contract.id}.`
      )
    )
);

const MANUAL_APPROVAL_HANDOFF_PACKETS_BY_ID = new Map(
  MANUAL_APPROVAL_HANDOFF_PACKETS.map((record) => [record.id, record] as const)
);

const MANUAL_APPROVAL_HANDOFF_REQUEST_CONTRACTS =
  MANUAL_APPROVAL_HANDOFF_CONTRACTS.map(
    (contract) =>
      ({
        id: contract.id,
        key: buildStableManualApprovalHandoffRequestKey(contract.id),
        handoffRequestContractVersion:
          "backend-owned-synthetic-dry-run-manual-approval-handoff-request-contract-v1",
        handoffContractId: contract.id,
        requestLabel: contract.requestLabel,
        sourceHandoffPacketReference: buildStableManualApprovalHandoffPacketKey(
          contract.id
        ),
        handoffRequestState: "not created",
        handoffInvocationState: "not invoked",
        operatorTargetPosture: "preview-only",
        approvalPayloadPosture: "static preview only",
        approvalReferencePosture: "not persisted",
        auditReferencePosture: "not persisted",
        resultReferencePosture: "not persisted",
        databaseWritePosture: "not implemented",
        fileWritePosture: "not implemented",
        explicitNoHandoffRequestCreatedStatement: "No handoff request created.",
      }) as const satisfies ManualApprovalHandoffRequestContractRecord
  );

const MANUAL_APPROVAL_HANDOFF_REQUEST_CONTRACTS_BY_ID = new Map(
  MANUAL_APPROVAL_HANDOFF_REQUEST_CONTRACTS.map((record) => [record.id, record] as const)
);

const MANUAL_APPROVAL_HANDOFF_RESPONSE_CONTRACTS =
  MANUAL_APPROVAL_HANDOFF_CONTRACTS.map(
    (contract) =>
      ({
        id: contract.id,
        key: buildStableManualApprovalHandoffResponseKey(contract.id),
        handoffResponseContractVersion:
          "backend-owned-synthetic-dry-run-manual-approval-handoff-response-contract-v1",
        handoffContractId: contract.id,
        requestLabel: contract.requestLabel,
        sourceHandoffRequestReference:
          buildStableManualApprovalHandoffRequestKey(contract.id),
        responseState: "not received",
        approvalDecisionState: "not evaluated",
        manualConfirmationState: "not captured",
        approvalTokenState: "not issued",
        approvalLeaseState: "not created",
        approvalPersistenceState: "not implemented",
        auditPersistenceState: "not implemented",
        resultPersistenceState: "not implemented",
        databaseWriteState: "not implemented",
        fileWriteState: "not implemented",
        explicitNoHandoffResponseNoApprovalStatement:
          "No handoff response. No approval.",
      }) as const satisfies ManualApprovalHandoffResponseContractRecord
  );

const MANUAL_APPROVAL_HANDOFF_ERROR_CONTRACTS =
  MANUAL_APPROVAL_HANDOFF_CONTRACTS.map(
    (contract) =>
      ({
        id: contract.id,
        key: buildStableManualApprovalHandoffErrorKey(contract.id),
        handoffErrorContractVersion:
          "backend-owned-synthetic-dry-run-manual-approval-handoff-error-contract-v1",
        handoffContractId: contract.id,
        requestLabel: contract.requestLabel,
        sourceHandoffRequestReference:
          buildStableManualApprovalHandoffRequestKey(contract.id),
        errorState: "not received",
        missingOperatorApprovalExample:
          `Operator approval is still not requested for ${contract.requestLabel}.`,
        missingManualConfirmationExample:
          `Manual confirmation is still not captured for ${contract.requestLabel}.`,
        staleEvidencePacketExample:
          `Evidence packet review remains preview-only for ${contract.requestLabel} and cannot be treated as live approval evidence.`,
        unresolvedBlockerExample:
          `${contract.requestLabel} remains blocked because the packet is still held / not accepted and server-only execution remains required.`,
        killSwitchActiveExample:
          `A future backend-only handoff for ${contract.requestLabel} would remain denied while the kill switch is active.`,
        privacyRedactionDeniedExample:
          `Privacy/redaction remains required for ${contract.requestLabel} before any future backend-only approval path may advance.`,
        persistenceDeniedExample:
          `Persistence remains denied for ${contract.requestLabel} because result, audit, and approval persistence are not implemented.`,
        databaseWriteBlockedExample:
          `Database writes remain blocked for ${contract.requestLabel} because database write state is not implemented.`,
        fileWriteBlockedExample:
          `File writes remain blocked for ${contract.requestLabel} because file write state is not implemented.`,
        retryPosture: "disabled",
        fallbackPosture: "disabled",
        recoveryPosture: "manual review only",
        explicitNoHandoffErrorNoRetryNoFallbackStatement:
          "No handoff error. No retry. No fallback.",
      }) as const satisfies ManualApprovalHandoffErrorContractRecord
  );

function buildManualApprovalScopeRecord(
  contract: BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord,
  seed: ScopeSeed
): ManualApprovalScopeRecord {
  return {
    handoffContractId: contract.id,
    key: buildStableManualApprovalScopeKey(contract.id, seed.id),
    approvalScopeVersion: "backend-owned-synthetic-dry-run-manual-approval-scope-v1",
    requestLabel: contract.requestLabel,
    scopeId: seed.id,
    scopeLabel: seed.label,
    scopeState: "preview-only / not approved",
    operatorActionRequired: seed.operatorActionRequired,
    manualConfirmationRequired: "manual confirmation required",
    requiredEvidence: seed.requiredEvidence,
    blockedActions: seed.blockedActions,
    allowedFutureActionsIfApproved: seed.allowedFutureActionsIfApproved,
    disallowedActionsEvenIfApproved: seed.disallowedActionsEvenIfApproved,
    currentSafetyPosture: seed.currentSafetyPosture,
    explicitNoCurrentApprovalStatement: "No current approval.",
  };
}

const MANUAL_APPROVAL_SCOPE_RECORDS = MANUAL_APPROVAL_HANDOFF_CONTRACTS.flatMap(
  (contract) =>
    MANUAL_APPROVAL_SCOPE_SEEDS.map((seed) =>
      buildManualApprovalScopeRecord(contract, seed)
    )
);

function buildManualApprovalHandoffGateRecord(
  contract: BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord,
  seed: GateSeed
): ManualApprovalHandoffGateRecord {
  return {
    handoffContractId: contract.id,
    requestLabel: contract.requestLabel,
    id: seed.id,
    key: buildStableManualApprovalHandoffGateKey(contract.id, seed.id),
    label: seed.label,
    gateVersion: "backend-owned-synthetic-dry-run-manual-approval-handoff-gate-v1",
    owner: seed.owner,
    requiredState: seed.requiredState,
    currentState: "preview-only / blocked",
    evidenceRequirement: seed.evidenceRequirement,
    blockedDefaultReason: seed.blockedDefaultReason,
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

const MANUAL_APPROVAL_HANDOFF_GATE_RECORDS = MANUAL_APPROVAL_HANDOFF_CONTRACTS.flatMap(
  (contract) =>
    MANUAL_APPROVAL_GATE_SEEDS.map((seed) =>
      buildManualApprovalHandoffGateRecord(contract, seed)
    )
);

const CURRENT_HANDOFF_READINESS: ManualApprovalHandoffCurrentReadiness =
  "manual-approval-handoff-contract-only / not approved / not executable / not persistent";

const MANUAL_APPROVAL_HANDOFF_READINESS_MATRIX_RECORDS =
  MANUAL_APPROVAL_HANDOFF_CONTRACTS.map(
    (contract) =>
      ({
        id: contract.id,
        key: buildStableManualApprovalHandoffReadinessKey(contract.id),
        readinessVersion:
          "backend-owned-synthetic-dry-run-manual-approval-handoff-readiness-v1",
        requestLabel: contract.requestLabel,
        label: contract.label,
        workspaceTarget: contract.workspaceTarget,
        selectedCapabilityFamily: cloneCapabilityFamily(
          contract.selectedCapabilityFamily
        ),
        handoffContractState: contract.handoffState,
        handoffPacketState: "preview-only",
        handoffRequestContractState: "preview-only",
        handoffResponseContractState: "preview-only",
        handoffErrorContractState: "preview-only",
        approvalScopeState: "preview-only / not approved",
        gateSchemaState: "preview-only / blocked",
        endToEndPacketReviewDependency: "linked / preview-only",
        evidencePacketDependency: "linked / preview-only",
        operatorApprovalDependency: "not requested",
        manualConfirmationDependency: "not captured",
        killSwitchDependency: "required / not reviewed",
        auditBoundaryState: "required / not persisted",
        privacyBoundaryState: "required / blocked",
        costRateBoundaryState: "required / blocked",
        serverOnlyBoundaryState: "required / blocked",
        queueBoundaryState: "blocked / not dispatched",
        workerBoundaryState: "blocked / not dispatched",
        jobBoundaryState: "blocked / not executed",
        resultPersistenceBoundaryState: "not implemented",
        auditPersistenceBoundaryState: "not implemented",
        approvalPersistenceBoundaryState: "not implemented",
        databaseBoundaryState: "not implemented",
        fileBoundaryState: "not implemented",
        currentReadiness: CURRENT_HANDOFF_READINESS,
        nextSafeAction: contract.nextSafeAction,
      }) as const satisfies ManualApprovalHandoffReadinessMatrixRecord
  );

function buildManualApprovalHandoffEvidenceSummaryRecord(
  contract: BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord,
  reviewAuditSummary: EndToEndPacketReviewAuditSummaryRecord
): ManualApprovalHandoffEvidenceSummaryRecord {
  return {
    id: contract.id,
    key: buildStableManualApprovalHandoffEvidenceSummaryKey(contract.id),
    evidenceSummaryVersion:
      "backend-owned-synthetic-dry-run-manual-approval-handoff-evidence-summary-v1",
    handoffContractId: contract.id,
    requestLabel: contract.requestLabel,
    sourceEndToEndPacketReviewReference:
      contract.sourceEndToEndPacketReviewReference,
    sourcePacketAuditSummaryReference:
      contract.sourceEndToEndPacketReviewAuditSummaryReference,
    sourcePacketAcceptancePostureReference:
      contract.sourceEndToEndPacketAcceptancePostureReference,
    evidenceState: "preview-only",
    safetyEvidence:
      `${contract.manualApprovalRequired}. ${contract.manualConfirmationRequired}. ${contract.killSwitchRequired}. ${contract.auditRequired}.`,
    privacyEvidence:
      `${contract.privacyRedactionRequired}. ${contract.credentialPosture}. ${contract.secretPosture}.`,
    auditEvidence:
      `${reviewAuditSummary.failedGateSummary}. audit reference state: ${contract.auditReferenceState}.`,
    approvalEvidence:
      `operator approval state: ${contract.operatorApprovalState}. manual confirmation state: ${contract.manualConfirmationState}. approval reference state: ${contract.approvalReferenceState}.`,
    resultEvidence:
      `result capture state: ${contract.resultCaptureState}. result reference state: ${contract.resultReferenceState}.`,
    stageEvidence: reviewAuditSummary.stageEvidenceSummary,
    gateEvidence: reviewAuditSummary.failedGateSummary,
    blockerEvidence: reviewAuditSummary.blockedActionSummary,
    recoveryEvidence:
      `next review and recovery requirement: ${contract.nextManualApprovalHandoffReviewRecoveryRequirement}.`,
    evidenceDigestPosture: "deterministic preview digest only",
    persistenceState: "not implemented",
    explicitNoEvidencePersistenceStatement: "No evidence persistence.",
  };
}

const MANUAL_APPROVAL_HANDOFF_EVIDENCE_SUMMARIES =
  MANUAL_APPROVAL_HANDOFF_CONTRACTS.map((contract) =>
    buildManualApprovalHandoffEvidenceSummaryRecord(
      contract,
      resolveRequiredRecord(
        END_TO_END_PACKET_REVIEW_AUDIT_SUMMARIES_BY_ID.get(contract.id),
        `Missing audit summary for manual approval handoff evidence ${contract.id}.`
      )
    )
  );

export function listBackendOwnedSyntheticDryRunManualApprovalHandoffContracts():
  readonly BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord[] {
  return cloneList(MANUAL_APPROVAL_HANDOFF_CONTRACTS);
}

export function listManualApprovalHandoffPackets():
  readonly ManualApprovalHandoffPacketRecord[] {
  return cloneList(MANUAL_APPROVAL_HANDOFF_PACKETS);
}

export function listManualApprovalHandoffRequestContracts():
  readonly ManualApprovalHandoffRequestContractRecord[] {
  return cloneList(MANUAL_APPROVAL_HANDOFF_REQUEST_CONTRACTS);
}

export function listManualApprovalHandoffResponseContracts():
  readonly ManualApprovalHandoffResponseContractRecord[] {
  return cloneList(MANUAL_APPROVAL_HANDOFF_RESPONSE_CONTRACTS);
}

export function listManualApprovalHandoffErrorContracts():
  readonly ManualApprovalHandoffErrorContractRecord[] {
  return cloneList(MANUAL_APPROVAL_HANDOFF_ERROR_CONTRACTS);
}

export function listManualApprovalScopeRecords():
  readonly ManualApprovalScopeRecord[] {
  return cloneList(MANUAL_APPROVAL_SCOPE_RECORDS);
}

export function listManualApprovalHandoffGateRecords():
  readonly ManualApprovalHandoffGateRecord[] {
  return cloneList(MANUAL_APPROVAL_HANDOFF_GATE_RECORDS);
}

export function listManualApprovalHandoffReadinessMatrixRecords():
  readonly ManualApprovalHandoffReadinessMatrixRecord[] {
  return cloneList(MANUAL_APPROVAL_HANDOFF_READINESS_MATRIX_RECORDS);
}

export function listManualApprovalHandoffEvidenceSummaries():
  readonly ManualApprovalHandoffEvidenceSummaryRecord[] {
  return cloneList(MANUAL_APPROVAL_HANDOFF_EVIDENCE_SUMMARIES);
}

export function groupManualApprovalHandoffsByCapabilityFamily():
  readonly ManualApprovalHandoffCapabilityFamilyGroup[] {
  const groups = new Map<
    AiModelProviderCapabilityId,
    BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord[]
  >();

  MANUAL_APPROVAL_HANDOFF_CONTRACTS.forEach((contract) => {
    const existing = groups.get(contract.selectedCapabilityFamily.id);

    if (existing) {
      existing.push(contract);
      return;
    }

    groups.set(contract.selectedCapabilityFamily.id, [contract]);
  });

  return Array.from(groups.entries()).map(([capabilityFamilyId, contracts]) => ({
    capabilityFamilyId,
    capabilityFamilyLabel: contracts[0].selectedCapabilityFamily.label,
    contractCount: contracts.length,
    contracts: cloneList(contracts),
  }));
}

export function groupManualApprovalHandoffsByWorkspaceTarget():
  readonly ManualApprovalHandoffWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord[]
  >();

  MANUAL_APPROVAL_HANDOFF_CONTRACTS.forEach((contract) => {
    const existing = groups.get(contract.workspaceTarget);

    if (existing) {
      existing.push(contract);
      return;
    }

    groups.set(contract.workspaceTarget, [contract]);
  });

  return Array.from(groups.entries()).map(([workspaceTarget, contracts]) => ({
    workspaceTarget,
    contractCount: contracts.length,
    contracts: cloneList(contracts),
  }));
}

export function buildManualApprovalHandoffSummary():
  ManualApprovalHandoffContractSummary {
  const capabilityGroups = groupManualApprovalHandoffsByCapabilityFamily();
  const workspaceGroups = groupManualApprovalHandoffsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
    contractCount: MANUAL_APPROVAL_HANDOFF_CONTRACTS.length,
    packetCount: MANUAL_APPROVAL_HANDOFF_PACKETS.length,
    requestContractCount: MANUAL_APPROVAL_HANDOFF_REQUEST_CONTRACTS.length,
    responseContractCount: MANUAL_APPROVAL_HANDOFF_RESPONSE_CONTRACTS.length,
    errorContractCount: MANUAL_APPROVAL_HANDOFF_ERROR_CONTRACTS.length,
    scopeRecordCount: MANUAL_APPROVAL_SCOPE_RECORDS.length,
    gateRecordCount: MANUAL_APPROVAL_HANDOFF_GATE_RECORDS.length,
    readinessRecordCount: MANUAL_APPROVAL_HANDOFF_READINESS_MATRIX_RECORDS.length,
    evidenceSummaryCount: MANUAL_APPROVAL_HANDOFF_EVIDENCE_SUMMARIES.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    handoffState: "draft / preview-only",
    currentReadiness: CURRENT_HANDOFF_READINESS,
    summaryLines: cloneList(HANDOFF_SUMMARY_LINES),
  };
}

export function buildManualApprovalHandoffGateSummary():
  ManualApprovalHandoffGateSummary {
  const ownerCounts = MANUAL_APPROVAL_HANDOFF_GATE_RECORDS.reduce(
    (accumulator, gate) => {
      switch (gate.owner) {
        case "backend manual approval handoff contract":
          accumulator.backendContractGateCount += 1;
          break;
        case "operator":
          accumulator.operatorGateCount += 1;
          break;
        case "safety review":
          accumulator.safetyReviewGateCount += 1;
          break;
        case "backend future":
          accumulator.backendFutureGateCount += 1;
          break;
      }

      return accumulator;
    },
    {
      backendContractGateCount: 0,
      operatorGateCount: 0,
      safetyReviewGateCount: 0,
      backendFutureGateCount: 0,
    }
  );

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
    gateCount: MANUAL_APPROVAL_HANDOFF_GATE_RECORDS.length,
    backendContractGateCount: ownerCounts.backendContractGateCount,
    operatorGateCount: ownerCounts.operatorGateCount,
    safetyReviewGateCount: ownerCounts.safetyReviewGateCount,
    backendFutureGateCount: ownerCounts.backendFutureGateCount,
    summaryLines: cloneList(GATE_SUMMARY_LINES),
  };
}

export function buildManualApprovalHandoffReadinessSummary():
  ManualApprovalHandoffReadinessSummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
    readinessRecordCount: MANUAL_APPROVAL_HANDOFF_READINESS_MATRIX_RECORDS.length,
    currentReadiness: CURRENT_HANDOFF_READINESS,
    nextSafeAction: buildUniqueManualApprovalHandoffDisplayStrings(
      MANUAL_APPROVAL_HANDOFF_CONTRACTS.map((contract) => contract.nextSafeAction)
    ).join(" "),
    summaryLines: cloneList(READINESS_SUMMARY_LINES),
  };
}

export function buildNextManualApprovalHandoffReviewAndRecoveryChecklist():
  readonly string[] {
  return cloneList(NEXT_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_CHECKLIST);
}

export function buildUniqueManualApprovalHandoffDisplayStrings<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Array.from(new Set(values));
}
