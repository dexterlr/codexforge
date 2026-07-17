import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  listBackendOwnedSyntheticDryRunManualApprovalHandoffContracts,
  listManualApprovalHandoffPackets,
  listManualApprovalScopeRecords,
  type BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord,
  type ManualApprovalHandoffPacketRecord,
  type ManualApprovalScopeRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-handoff-contract";
import {
  listBackendOwnedSyntheticDryRunManualApprovalHandoffReviews,
  listManualApprovalHandoffAcceptancePostureRecords,
  listManualApprovalHandoffDecisionReviewRecords,
  listManualApprovalHandoffGateFailureReviewRecords,
  listManualApprovalHandoffRecoveryPlanPreviews,
  listManualApprovalHandoffRecoveryReadinessChecklistRecords,
  listManualApprovalHandoffReviewAuditSummaries,
  type BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord,
  type ManualApprovalHandoffAcceptancePostureRecord,
  type ManualApprovalHandoffDecisionReviewRecord,
  type ManualApprovalHandoffGateFailureReviewRecord,
  type ManualApprovalHandoffRecoveryPlanPreviewRecord,
  type ManualApprovalHandoffRecoveryReadinessChecklistRecord,
  type ManualApprovalHandoffReviewAuditSummaryRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-handoff-review-recovery-preview";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_PHASE,
  NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
  type ApprovalOutcomePreviewId,
  type ApprovalOutcomePreviewKey,
  type ApprovalOutcomePreviewLabel,
  type ApprovalOutcomePreviewRecord,
  type BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord,
  type ManualApprovalDecisionAllowedLabel,
  type ManualApprovalDecisionCapabilityFamilyGroup,
  type ManualApprovalDecisionContractId,
  type ManualApprovalDecisionContractKey,
  type ManualApprovalDecisionContractSummary,
  type ManualApprovalDecisionCurrentReadiness,
  type ManualApprovalDecisionErrorContractRecord,
  type ManualApprovalDecisionErrorKey,
  type ManualApprovalDecisionEvidenceSummaryKey,
  type ManualApprovalDecisionEvidenceSummaryRecord,
  type ManualApprovalDecisionGateId,
  type ManualApprovalDecisionGateKey,
  type ManualApprovalDecisionGateLabel,
  type ManualApprovalDecisionGateOwner,
  type ManualApprovalDecisionGateRecord,
  type ManualApprovalDecisionGateSummary,
  type ManualApprovalDecisionPacketKey,
  type ManualApprovalDecisionPacketRecord,
  type ManualApprovalDecisionReadinessKey,
  type ManualApprovalDecisionReadinessMatrixRecord,
  type ManualApprovalDecisionReadinessSummary,
  type ManualApprovalDecisionRequestContractRecord,
  type ManualApprovalDecisionRequestKey,
  type ManualApprovalDecisionResponseContractRecord,
  type ManualApprovalDecisionResponseKey,
  type ManualApprovalDecisionWorkspaceGroup,
} from "./backend-owned-synthetic-dry-run-manual-approval-decision-contract-types";

type DecisionPacketSeed = Readonly<{
  id: ManualApprovalDecisionContractId;
  sourceScopeId: ManualApprovalScopeRecord["scopeId"];
  operatorFocus: string;
}>;

type OutcomeSeed = Readonly<{
  id: ApprovalOutcomePreviewId;
  label: ApprovalOutcomePreviewLabel;
  operatorActionRequired: string;
  requiredEvidence: readonly string[];
  blockedActions: readonly string[];
  allowedFutureActionsIfSelectedInFutureBackendPath: readonly string[];
  disallowedActionsEvenIfSelected: readonly string[];
  currentSafetyPosture: string;
}>;

type GateSeed = Readonly<{
  id: ManualApprovalDecisionGateId;
  label: ManualApprovalDecisionGateLabel;
  owner: ManualApprovalDecisionGateOwner;
  requiredState: string;
  evidenceRequirement: string;
  blockedDefaultReason: string;
}>;

const DECISION_SUMMARY_LINES = [
  "backend-owned synthetic dry-run manual approval decision contract only",
  "manual approval decision contract is preview-only",
  "decision state is draft / preview-only / not evaluated",
  "decision request is not created",
  "decision invocation is not invoked",
  "decision response is not received",
  "decision error is not received",
  "operator approval state is not requested",
  "manual confirmation state is not captured",
  "approval outcome state is not decided",
  "approval token is not issued",
  "approval lease is not created",
  "approval reference is not persisted",
  "audit reference is not persisted",
  "result reference is not persisted",
  "evidence packet is preview-only",
  "handoff state is draft / preview-only",
  "end-to-end packet state is draft / preview-only",
  "packet decision state is held / not accepted",
  "admission state is not admitted",
  "dry-run execution is not executed",
  "result capture state is not captured",
  "audit join state is not persisted",
  "approval join state is not persisted",
  "database write is not implemented",
  "file write is not implemented",
  "current readiness is manual-approval-decision-contract-only / not decided / not executable / not persistent",
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
  "backend-owned synthetic dry-run manual approval decision review and recovery preview next",
] as const;

const GATE_SUMMARY_LINES = [
  "handoff review gate",
  "decision packet gate",
  "operator approval gate",
  "manual confirmation gate",
  "approval scope gate",
  "approval expiry gate",
  "approval revocation gate",
  "approval outcome gate",
  "approval token gate",
  "approval lease gate",
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
  "decision contract state",
  "decision packet state",
  "decision request contract state",
  "decision response contract state",
  "decision error contract state",
  "approval outcome state",
  "gate schema state",
  "handoff review dependency",
  "handoff evidence dependency",
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
  "current readiness: manual-approval-decision-contract-only / not decided / not executable / not persistent",
  "next safe action",
] as const;

const NEXT_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_CHECKLIST = [
  "Review the manual approval decision contract, decision packet, request contract, response contract, error contract, outcome previews, gate records, readiness matrix, and evidence summary without requesting or persisting approval.",
  "Keep decision state draft / preview-only / not evaluated, decision request not created, decision invocation not invoked, decision response not received, decision error not received, and approval outcome not decided.",
  "Keep operator approval not requested, manual confirmation not captured, approval token not issued, approval lease not created, and every approval, audit, result, database, and file reference non-persistent.",
  "Preserve no prompt sending, no model calls, no provider SDK imports, no provider execution, no queue dispatch, no worker dispatch, no job execution, no retry execution, and no fallback execution posture.",
  "Keep the next batch backend-owned, deterministic, frontend-safe, review-first, and focused on manual approval decision review and recovery preview only.",
] as const;

const ALLOWED_DECISION_LABELS: readonly ManualApprovalDecisionAllowedLabel[] = [
  "approve preview",
  "deny preview",
  "defer preview",
];

const CURRENT_READINESS: ManualApprovalDecisionCurrentReadiness =
  "manual-approval-decision-contract-only / not decided / not executable / not persistent";

const DECISION_PACKET_SEEDS = [
  {
    id: "conversational-planning-request",
    sourceScopeId: "end-to-end-packet-acceptance-scope",
    operatorFocus: "conversational planning continuation",
  },
  {
    id: "code-assistance-request",
    sourceScopeId: "backend-only-runner-continuation-scope",
    operatorFocus: "code assistance continuation",
  },
  {
    id: "website-copy-code-request",
    sourceScopeId: "backend-only-runner-continuation-scope",
    operatorFocus: "website copy/code continuation",
  },
  {
    id: "product-video-request",
    sourceScopeId: "no-provider-execution-scope",
    operatorFocus: "product video continuation",
  },
  {
    id: "storyboard-image-request",
    sourceScopeId: "no-provider-execution-scope",
    operatorFocus: "storyboard image continuation",
  },
  {
    id: "audio-narration-request",
    sourceScopeId: "no-provider-execution-scope",
    operatorFocus: "audio narration continuation",
  },
  {
    id: "transcription-caption-request",
    sourceScopeId: "no-provider-execution-scope",
    operatorFocus: "transcription/caption continuation",
  },
  {
    id: "embeddings-search-request",
    sourceScopeId: "no-persistence-scope",
    operatorFocus: "embeddings/search continuation",
  },
  {
    id: "safety-moderation-review-request",
    sourceScopeId: "audit-join-review-scope",
    operatorFocus: "safety/moderation continuation",
  },
  {
    id: "local-private-inference-request",
    sourceScopeId: "backend-only-runner-continuation-scope",
    operatorFocus: "local/private inference continuation",
  },
  {
    id: "audit-recovery-explanation-request",
    sourceScopeId: "audit-join-review-scope",
    operatorFocus: "audit/recovery explanation continuation",
  },
] as const satisfies readonly DecisionPacketSeed[];

const APPROVAL_OUTCOME_SEEDS = [
  {
    id: "approve-synthetic-packet-preview",
    label: "approve synthetic packet preview",
    operatorActionRequired:
      "Keep approve preview as a future backend-owned outcome only after operator approval, manual confirmation, and server-only review exist.",
    requiredEvidence: [
      "Linked handoff review record",
      "Decision packet summary",
      "Kill switch review requirement",
      "Audit requirement reminder",
    ],
    blockedActions: [
      "Do not request approval.",
      "Do not issue approval tokens.",
      "Do not persist any approval record.",
    ],
    allowedFutureActionsIfSelectedInFutureBackendPath: [
      "Re-enter backend-owned decision review and recovery preview.",
      "Verify server-only adapters, audit gates, and privacy gates.",
    ],
    disallowedActionsEvenIfSelected: [
      "Do not execute providers.",
      "Do not persist audit, approval, or result references.",
      "Do not create live API routes.",
    ],
    currentSafetyPosture:
      "Approve preview remains held behind operator approval, manual confirmation, kill switch review, and server-only execution boundaries.",
  },
  {
    id: "deny-synthetic-packet-preview",
    label: "deny synthetic packet preview",
    operatorActionRequired:
      "Keep deny preview available as a held operator-facing outcome while all execution and persistence remain blocked.",
    requiredEvidence: [
      "Linked blocker summary",
      "Gate failure posture",
      "Privacy and audit boundary reminders",
    ],
    blockedActions: [
      "Do not deny anything in live state.",
      "Do not persist any denial record.",
    ],
    allowedFutureActionsIfSelectedInFutureBackendPath: [
      "Record future backend-owned denial reasoning in a server-only path.",
      "Return to manual review with updated evidence.",
    ],
    disallowedActionsEvenIfSelected: [
      "Do not call providers.",
      "Do not persist approval, audit, or result state.",
    ],
    currentSafetyPosture:
      "Deny preview remains informational only and cannot alter live state.",
  },
  {
    id: "defer-synthetic-packet-preview",
    label: "defer synthetic packet preview",
    operatorActionRequired:
      "Keep defer preview as a held review-only path while evidence, privacy, and cost/rate/timeout review remain incomplete.",
    requiredEvidence: [
      "Linked handoff evidence summary",
      "Cost/rate/timeout guard requirement",
      "Manual confirmation requirement",
    ],
    blockedActions: [
      "Do not create a deferral record.",
      "Do not create approval leases.",
    ],
    allowedFutureActionsIfSelectedInFutureBackendPath: [
      "Return to backend-owned decision review with more evidence.",
      "Keep packet held / not accepted.",
    ],
    disallowedActionsEvenIfSelected: [
      "Do not dispatch queues, workers, or jobs.",
      "Do not persist any deferred state.",
    ],
    currentSafetyPosture:
      "Defer preview keeps the packet held and non-persistent until additional manual review occurs.",
  },
  {
    id: "request-more-evidence-preview",
    label: "request more evidence preview",
    operatorActionRequired:
      "Keep request-more-evidence preview available without sending prompts or creating any live request.",
    requiredEvidence: [
      "Linked audit summary",
      "Linked acceptance posture",
      "Decision packet blocker summary",
    ],
    blockedActions: [
      "Do not send prompts.",
      "Do not create live evidence requests.",
    ],
    allowedFutureActionsIfSelectedInFutureBackendPath: [
      "Collect additional backend-owned review evidence only.",
      "Re-run manual review without enabling execution.",
    ],
    disallowedActionsEvenIfSelected: [
      "Do not call models.",
      "Do not persist additional evidence from the frontend.",
    ],
    currentSafetyPosture:
      "More-evidence preview remains an inert operator-facing placeholder only.",
  },
  {
    id: "escalate-safety-review-preview",
    label: "escalate safety review preview",
    operatorActionRequired:
      "Keep escalate-safety-review preview available while safety, privacy, and audit requirements stay unresolved.",
    requiredEvidence: [
      "Safety evidence summary",
      "Privacy/redaction boundary summary",
      "Audit requirement reminder",
    ],
    blockedActions: [
      "Do not trigger safety workflows.",
      "Do not create escalation tickets from the frontend.",
    ],
    allowedFutureActionsIfSelectedInFutureBackendPath: [
      "Route the packet into a future backend-owned safety review path.",
      "Preserve server-only credential and prompt boundaries.",
    ],
    disallowedActionsEvenIfSelected: [
      "Do not import provider SDKs.",
      "Do not dispatch safety queues or workers.",
    ],
    currentSafetyPosture:
      "Safety escalation preview remains non-executable and non-persistent.",
  },
  {
    id: "keep-locked-preview",
    label: "keep locked preview",
    operatorActionRequired:
      "Keep the current locked posture visible while operator approval, manual confirmation, and persistence all remain blocked.",
    requiredEvidence: [
      "Blocked gate summary",
      "Readiness matrix summary",
      "No-persistence posture summary",
    ],
    blockedActions: [
      "Do not unlock execution.",
      "Do not unlock persistence.",
    ],
    allowedFutureActionsIfSelectedInFutureBackendPath: [
      "Retain the held packet posture in a future backend-only review path.",
      "Require another manual review checkpoint.",
    ],
    disallowedActionsEvenIfSelected: [
      "Do not execute dry runs.",
      "Do not create tokens, leases, or result records.",
    ],
    currentSafetyPosture:
      "Keep-locked preview is the default held posture for the current contract-only layer.",
  },
] as const satisfies readonly OutcomeSeed[];

const MANUAL_APPROVAL_DECISION_GATE_SEEDS = [
  {
    id: "handoff-review-gate",
    label: "handoff review gate",
    owner: "backend manual approval decision contract",
    requiredState:
      "A reviewed manual approval handoff review reference must remain linked and preview-only.",
    evidenceRequirement:
      "Handoff review, decision review, and blocker evidence must remain visible.",
    blockedDefaultReason:
      "The decision contract stays blocked until the handoff review remains held and preview-only.",
  },
  {
    id: "decision-packet-gate",
    label: "decision packet gate",
    owner: "backend manual approval decision contract",
    requiredState:
      "The decision packet must remain preview-only with no selected decision label.",
    evidenceRequirement:
      "Decision packet summary, scope summary, and blocker summary must remain visible.",
    blockedDefaultReason:
      "The decision packet remains preview-only and cannot create a live decision request.",
  },
  {
    id: "operator-approval-gate",
    label: "operator approval gate",
    owner: "operator",
    requiredState:
      "Operator approval must be explicitly requested in a future backend-only path.",
    evidenceRequirement:
      "Operator approval evidence and linked decision packet context must remain visible.",
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
      "Decision scope must remain preview-only until a future backend-owned manual approval path exists.",
    evidenceRequirement:
      "Linked scope reference, blocked actions, and future allowed actions must remain visible.",
    blockedDefaultReason:
      "Approval scope remains preview-only and is not approved.",
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
    id: "approval-outcome-gate",
    label: "approval outcome gate",
    owner: "backend manual approval decision contract",
    requiredState:
      "Every outcome preview must remain not selected until a future backend-only decision path exists.",
    evidenceRequirement:
      "Outcome previews, blocked actions, and no-selection posture must remain visible.",
    blockedDefaultReason:
      "No approval outcome is currently selected in the contract-only layer.",
  },
  {
    id: "approval-token-gate",
    label: "approval token gate",
    owner: "backend future",
    requiredState:
      "Any future approval token issuance must remain backend-owned and server-only.",
    evidenceRequirement:
      "Approval token posture and future backend ownership notes must remain visible.",
    blockedDefaultReason:
      "Approval tokens are not issued in this preview-only contract layer.",
  },
  {
    id: "approval-lease-gate",
    label: "approval lease gate",
    owner: "backend future",
    requiredState:
      "Any future approval lease creation must remain backend-owned and server-only.",
    evidenceRequirement:
      "Approval lease posture and server-only boundary notes must remain visible.",
    blockedDefaultReason:
      "Approval leases are not created in this preview-only contract layer.",
  },
  {
    id: "kill-switch-gate",
    label: "kill switch gate",
    owner: "safety review",
    requiredState:
      "Kill switch review must remain required before any future backend-only execution path.",
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
      "Audit requirement, linked audit summary, and non-persistent audit posture must remain visible.",
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
      "Single-run lock evidence and blocked continuation posture must remain visible.",
    blockedDefaultReason:
      "Single-run lock remains required and unresolved.",
  },
  {
    id: "server-only-boundary-gate",
    label: "server-only boundary gate",
    owner: "backend future",
    requiredState:
      "Any future decision path must remain backend-owned and server-only.",
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
      "Secret posture evidence and privacy notes must remain visible.",
    blockedDefaultReason:
      "Plaintext secrets are disallowed.",
  },
  {
    id: "no-frontend-provider-call-gate",
    label: "no frontend provider call gate",
    owner: "backend future",
    requiredState: "Frontend provider calls must remain blocked.",
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
    requiredState:
      "Result persistence must remain unimplemented in the contract-only layer.",
    evidenceRequirement:
      "Result persistence posture and blocked persistence summary must remain visible.",
    blockedDefaultReason:
      "Result persistence remains unimplemented.",
  },
  {
    id: "no-audit-persistence-gate",
    label: "no audit persistence gate",
    owner: "backend future",
    requiredState:
      "Audit persistence must remain unimplemented in the contract-only layer.",
    evidenceRequirement:
      "Audit persistence posture and blocked persistence summary must remain visible.",
    blockedDefaultReason:
      "Audit persistence remains unimplemented.",
  },
  {
    id: "no-approval-persistence-gate",
    label: "no approval persistence gate",
    owner: "backend future",
    requiredState:
      "Approval persistence must remain unimplemented in the contract-only layer.",
    evidenceRequirement:
      "Approval persistence posture and blocked persistence summary must remain visible.",
    blockedDefaultReason:
      "Approval persistence remains unimplemented.",
  },
  {
    id: "no-database-write-gate",
    label: "no database write gate",
    owner: "backend future",
    requiredState: "Database writes must remain unimplemented.",
    evidenceRequirement:
      "Database write posture and blocked persistence summary must remain visible.",
    blockedDefaultReason:
      "Database writes remain unimplemented.",
  },
  {
    id: "no-file-write-gate",
    label: "no file write gate",
    owner: "backend future",
    requiredState: "File writes must remain unimplemented.",
    evidenceRequirement:
      "File write posture and blocked persistence summary must remain visible.",
    blockedDefaultReason:
      "File writes remain unimplemented.",
  },
] as const satisfies readonly GateSeed[];

const HANDOFF_CONTRACTS =
  listBackendOwnedSyntheticDryRunManualApprovalHandoffContracts();
const HANDOFF_PACKETS = listManualApprovalHandoffPackets();
const HANDOFF_SCOPE_RECORDS = listManualApprovalScopeRecords();
const HANDOFF_REVIEWS = listBackendOwnedSyntheticDryRunManualApprovalHandoffReviews();
const HANDOFF_DECISION_REVIEWS = listManualApprovalHandoffDecisionReviewRecords();
const HANDOFF_GATE_FAILURE_REVIEWS =
  listManualApprovalHandoffGateFailureReviewRecords();
const HANDOFF_RECOVERY_PLANS = listManualApprovalHandoffRecoveryPlanPreviews();
const HANDOFF_RECOVERY_READINESS =
  listManualApprovalHandoffRecoveryReadinessChecklistRecords();
const HANDOFF_REVIEW_AUDIT_SUMMARIES =
  listManualApprovalHandoffReviewAuditSummaries();
const HANDOFF_ACCEPTANCE_POSTURES =
  listManualApprovalHandoffAcceptancePostureRecords();

function cloneList<T>(records: readonly T[]): readonly T[] {
  return [...records];
}

function cloneCapabilityFamily(
  family: BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["selectedCapabilityFamily"]
): BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["selectedCapabilityFamily"] {
  return { ...family };
}

function resolveRequiredRecord<T>(record: T | undefined, message: string): T {
  if (!record) {
    throw new Error(message);
  }

  return record;
}

function groupRecordsById<T>(
  records: readonly T[],
  resolveId: (record: T) => ManualApprovalDecisionContractId
): ReadonlyMap<ManualApprovalDecisionContractId, readonly T[]> {
  const grouped = new Map<ManualApprovalDecisionContractId, T[]>();

  records.forEach((record) => {
    const id = resolveId(record);
    const existing = grouped.get(id);

    if (existing) {
      existing.push(record);
      return;
    }

    grouped.set(id, [record]);
  });

  const readonlyGrouped = new Map<
    ManualApprovalDecisionContractId,
    readonly T[]
  >();

  grouped.forEach((value, key) => {
    readonlyGrouped.set(key, [...value]);
  });

  return readonlyGrouped;
}

function groupContractsByCapabilityFamily(
  contracts: readonly BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord[]
): readonly ManualApprovalDecisionCapabilityFamilyGroup[] {
  const grouped = new Map<
    AiModelProviderCapabilityId,
    BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord[]
  >();

  contracts.forEach((contract) => {
    const existing = grouped.get(contract.selectedCapabilityFamily.id);

    if (existing) {
      existing.push(contract);
      return;
    }

    grouped.set(contract.selectedCapabilityFamily.id, [contract]);
  });

  return [...grouped.values()].map((contractsForFamily) => ({
    capabilityFamilyId: contractsForFamily[0].selectedCapabilityFamily.id,
    capabilityFamilyLabel: contractsForFamily[0].selectedCapabilityFamily.label,
    contractCount: contractsForFamily.length,
    contracts: [...contractsForFamily],
  }));
}

function groupContractsByWorkspaceTarget(
  contracts: readonly BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord[]
): readonly ManualApprovalDecisionWorkspaceGroup[] {
  const grouped = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord[]
  >();

  contracts.forEach((contract) => {
    const existing = grouped.get(contract.workspaceTarget);

    if (existing) {
      existing.push(contract);
      return;
    }

    grouped.set(contract.workspaceTarget, [contract]);
  });

  return [...grouped.values()].map((contractsForWorkspace) => ({
    workspaceTarget: contractsForWorkspace[0].workspaceTarget,
    contractCount: contractsForWorkspace.length,
    contracts: [...contractsForWorkspace],
  }));
}

export function buildStableManualApprovalDecisionContractKey(
  id: ManualApprovalDecisionContractId
): ManualApprovalDecisionContractKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-contract:${id}`;
}

export function buildStableManualApprovalDecisionPacketKey(
  id: ManualApprovalDecisionContractId
): ManualApprovalDecisionPacketKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-packet:${id}`;
}

export function buildStableManualApprovalDecisionRequestKey(
  id: ManualApprovalDecisionContractId
): ManualApprovalDecisionRequestKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-request:${id}`;
}

export function buildStableManualApprovalDecisionResponseKey(
  id: ManualApprovalDecisionContractId
): ManualApprovalDecisionResponseKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-response:${id}`;
}

export function buildStableManualApprovalDecisionErrorKey(
  id: ManualApprovalDecisionContractId
): ManualApprovalDecisionErrorKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-error:${id}`;
}

export function buildStableApprovalOutcomePreviewKey(
  decisionContractId: ManualApprovalDecisionContractId,
  outcomeId: ApprovalOutcomePreviewId
): ApprovalOutcomePreviewKey {
  return `backend-owned-synthetic-dry-run-approval-outcome-preview:${decisionContractId}:${outcomeId}`;
}

export function buildStableManualApprovalDecisionGateKey(
  decisionContractId: ManualApprovalDecisionContractId,
  gateId: ManualApprovalDecisionGateId
): ManualApprovalDecisionGateKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-gate:${decisionContractId}:${gateId}`;
}

export function buildStableManualApprovalDecisionReadinessKey(
  id: ManualApprovalDecisionContractId
): ManualApprovalDecisionReadinessKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-readiness:${id}`;
}

export function buildStableManualApprovalDecisionEvidenceSummaryKey(
  id: ManualApprovalDecisionContractId
): ManualApprovalDecisionEvidenceSummaryKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-evidence-summary:${id}`;
}

export function buildUniqueManualApprovalDecisionDisplayStrings(
  values: readonly string[]
): readonly string[] {
  const seen = new Set<string>();
  const unique: string[] = [];

  values.forEach((value) => {
    const normalized = value.trim();

    if (normalized.length === 0 || seen.has(normalized)) {
      return;
    }

    seen.add(normalized);
    unique.push(normalized);
  });

  return unique;
}

const HANDOFF_PACKET_SEED_BY_ID = new Map<
  ManualApprovalDecisionContractId,
  DecisionPacketSeed
>(DECISION_PACKET_SEEDS.map((seed) => [seed.id, seed]));

const HANDOFF_CONTRACT_BY_ID = new Map<
  ManualApprovalDecisionContractId,
  BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord
>(HANDOFF_CONTRACTS.map((record) => [record.id, record]));

const HANDOFF_PACKET_BY_ID = new Map<
  ManualApprovalDecisionContractId,
  ManualApprovalHandoffPacketRecord
>(HANDOFF_PACKETS.map((record) => [record.id, record]));

const HANDOFF_SCOPE_BY_KEY = new Map<
  string,
  ManualApprovalScopeRecord
>(
  HANDOFF_SCOPE_RECORDS.map((record) => [
    `${record.handoffContractId}:${record.scopeId}`,
    record,
  ])
);

const HANDOFF_REVIEW_BY_ID = new Map<
  ManualApprovalDecisionContractId,
  BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord
>(HANDOFF_REVIEWS.map((record) => [record.id, record]));

const HANDOFF_DECISION_REVIEW_BY_ID = new Map<
  ManualApprovalDecisionContractId,
  ManualApprovalHandoffDecisionReviewRecord
>(HANDOFF_DECISION_REVIEWS.map((record) => [record.handoffReviewId, record]));

const HANDOFF_GATE_FAILURE_REVIEWS_BY_ID = groupRecordsById(
  HANDOFF_GATE_FAILURE_REVIEWS,
  (record) => record.handoffReviewId
);

const HANDOFF_RECOVERY_PLAN_BY_ID = new Map<
  ManualApprovalDecisionContractId,
  ManualApprovalHandoffRecoveryPlanPreviewRecord
>(HANDOFF_RECOVERY_PLANS.map((record) => [record.handoffReviewId, record]));

const HANDOFF_RECOVERY_READINESS_BY_ID = groupRecordsById(
  HANDOFF_RECOVERY_READINESS,
  (record) => record.handoffReviewId
);

const HANDOFF_REVIEW_AUDIT_SUMMARY_BY_ID = new Map<
  ManualApprovalDecisionContractId,
  ManualApprovalHandoffReviewAuditSummaryRecord
>(HANDOFF_REVIEW_AUDIT_SUMMARIES.map((record) => [record.handoffReviewId, record]));

const HANDOFF_ACCEPTANCE_POSTURE_BY_ID = new Map<
  ManualApprovalDecisionContractId,
  ManualApprovalHandoffAcceptancePostureRecord
>(HANDOFF_ACCEPTANCE_POSTURES.map((record) => [record.handoffReviewId, record]));

function resolveDecisionPacketSeed(
  id: ManualApprovalDecisionContractId
): DecisionPacketSeed {
  return resolveRequiredRecord(
    HANDOFF_PACKET_SEED_BY_ID.get(id),
    `Missing decision packet seed for ${id}.`
  );
}

function resolveHandoffContract(
  id: ManualApprovalDecisionContractId
): BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord {
  return resolveRequiredRecord(
    HANDOFF_CONTRACT_BY_ID.get(id),
    `Missing handoff contract for ${id}.`
  );
}

function resolveHandoffPacket(
  id: ManualApprovalDecisionContractId
): ManualApprovalHandoffPacketRecord {
  return resolveRequiredRecord(
    HANDOFF_PACKET_BY_ID.get(id),
    `Missing handoff packet for ${id}.`
  );
}

function resolveScopeRecord(
  id: ManualApprovalDecisionContractId,
  scopeId: ManualApprovalScopeRecord["scopeId"]
): ManualApprovalScopeRecord {
  return resolveRequiredRecord(
    HANDOFF_SCOPE_BY_KEY.get(`${id}:${scopeId}`),
    `Missing scope record ${scopeId} for ${id}.`
  );
}

function resolveHandoffReview(
  id: ManualApprovalDecisionContractId
): BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord {
  return resolveRequiredRecord(
    HANDOFF_REVIEW_BY_ID.get(id),
    `Missing handoff review for ${id}.`
  );
}

function resolveHandoffDecisionReview(
  id: ManualApprovalDecisionContractId
): ManualApprovalHandoffDecisionReviewRecord {
  return resolveRequiredRecord(
    HANDOFF_DECISION_REVIEW_BY_ID.get(id),
    `Missing handoff decision review for ${id}.`
  );
}

function resolvePrimaryGateFailureReview(
  id: ManualApprovalDecisionContractId
): ManualApprovalHandoffGateFailureReviewRecord {
  const records = HANDOFF_GATE_FAILURE_REVIEWS_BY_ID.get(id);

  return resolveRequiredRecord(
    records?.[0],
    `Missing handoff gate failure review for ${id}.`
  );
}

function resolveHandoffRecoveryPlan(
  id: ManualApprovalDecisionContractId
): ManualApprovalHandoffRecoveryPlanPreviewRecord {
  return resolveRequiredRecord(
    HANDOFF_RECOVERY_PLAN_BY_ID.get(id),
    `Missing handoff recovery plan for ${id}.`
  );
}

function resolvePrimaryRecoveryReadinessRecord(
  id: ManualApprovalDecisionContractId
): ManualApprovalHandoffRecoveryReadinessChecklistRecord {
  const records = HANDOFF_RECOVERY_READINESS_BY_ID.get(id);

  return resolveRequiredRecord(
    records?.[0],
    `Missing handoff recovery readiness for ${id}.`
  );
}

function resolveHandoffReviewAuditSummary(
  id: ManualApprovalDecisionContractId
): ManualApprovalHandoffReviewAuditSummaryRecord {
  return resolveRequiredRecord(
    HANDOFF_REVIEW_AUDIT_SUMMARY_BY_ID.get(id),
    `Missing handoff review audit summary for ${id}.`
  );
}

function resolveHandoffAcceptancePosture(
  id: ManualApprovalDecisionContractId
): ManualApprovalHandoffAcceptancePostureRecord {
  return resolveRequiredRecord(
    HANDOFF_ACCEPTANCE_POSTURE_BY_ID.get(id),
    `Missing handoff acceptance posture for ${id}.`
  );
}

const MANUAL_APPROVAL_DECISION_CONTRACTS: readonly BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord[] =
  HANDOFF_CONTRACTS.map((handoffContract) => {
    const packetSeed = resolveDecisionPacketSeed(handoffContract.id);
    const scopeRecord = resolveScopeRecord(handoffContract.id, packetSeed.sourceScopeId);
    const handoffReview = resolveHandoffReview(handoffContract.id);
    const handoffDecisionReview = resolveHandoffDecisionReview(handoffContract.id);
    const gateFailureReview = resolvePrimaryGateFailureReview(handoffContract.id);
    const recoveryPlan = resolveHandoffRecoveryPlan(handoffContract.id);
    const recoveryReadiness = resolvePrimaryRecoveryReadinessRecord(handoffContract.id);
    const reviewAuditSummary = resolveHandoffReviewAuditSummary(handoffContract.id);
    const acceptancePosture = resolveHandoffAcceptancePosture(handoffContract.id);

    return {
      id: handoffContract.id,
      key: buildStableManualApprovalDecisionContractKey(handoffContract.id),
      decisionContractVersion:
        "backend-owned-synthetic-dry-run-manual-approval-decision-contract-v1",
      previewOnlyStatement: "manual approval decision contract is preview-only",
      requestLabel: handoffContract.requestLabel,
      label: `${handoffContract.requestLabel} manual approval decision contract`,
      workspaceTarget: handoffContract.workspaceTarget,
      source: handoffContract.source,
      owner: handoffContract.owner,
      frontendMode: handoffContract.frontendMode,
      contractMode: handoffContract.contractMode,
      decisionPosture:
        "manual approval decision / not evaluated / not persistent",
      sourceManualApprovalHandoffReviewReference: handoffReview.key,
      sourceManualApprovalHandoffDecisionReviewReference:
        handoffDecisionReview.key,
      sourceManualApprovalHandoffGateFailureReviewReference:
        gateFailureReview.key,
      sourceManualApprovalHandoffRecoveryPlanReference: recoveryPlan.key,
      sourceManualApprovalHandoffRecoveryReadinessReference:
        recoveryReadiness.key,
      sourceManualApprovalHandoffReviewAuditSummaryReference:
        reviewAuditSummary.key,
      sourceManualApprovalHandoffAcceptancePostureReference:
        acceptancePosture.key,
      sourceManualApprovalHandoffContractReference: handoffContract.key,
      sourceManualApprovalHandoffPacketReference:
        resolveHandoffPacket(handoffContract.id).key,
      sourceManualApprovalScopeReference: scopeRecord.key,
      sourceEndToEndPacketReviewReference:
        handoffContract.sourceEndToEndPacketReviewReference,
      sourceEndToEndPacketAcceptancePostureReference:
        handoffContract.sourceEndToEndPacketAcceptancePostureReference,
      sourceRunIntentReference: handoffContract.sourceRunIntentReference,
      sourceApprovalPacketReference:
        handoffContract.sourceApprovalPacketReference,
      sourceManualAdmissionPreviewReference:
        handoffContract.sourceManualAdmissionPreviewReference,
      sourceBackendAdmissionContractReference:
        handoffContract.sourceBackendAdmissionContractReference,
      selectedCapabilityFamily: cloneCapabilityFamily(
        handoffContract.selectedCapabilityFamily
      ),
      providerSlotLabel: handoffContract.providerSlotLabel,
      backupProviderSlotLabel: handoffContract.backupProviderSlotLabel,
      localPrivateAlternativeLabel: handoffContract.localPrivateAlternativeLabel,
      decisionState: "draft / preview-only / not evaluated",
      decisionRequestState: "not created",
      decisionInvocationState: "not invoked",
      decisionResponseState: "not received",
      decisionErrorState: "not received",
      operatorApprovalState: "not requested",
      manualConfirmationState: "not captured",
      approvalOutcomeState: "not decided",
      approvalTokenState: "not issued",
      approvalLeaseState: "not created",
      approvalReferenceState: "not persisted",
      auditReferenceState: "not persisted",
      resultReferenceState: "not persisted",
      evidencePacketState: "preview-only",
      handoffState: "draft / preview-only",
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
      nextManualApprovalDecisionReviewRecoveryRequirement:
        NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
      blockedDefaultReason: `${packetSeed.operatorFocus} remains held because operator approval is not requested, manual confirmation is not captured, and every decision path stays preview-only.`,
      nextSafeAction:
        "Advance into backend-owned synthetic dry-run manual approval decision review and recovery preview only.",
    };
  });

const MANUAL_APPROVAL_DECISION_PACKETS: readonly ManualApprovalDecisionPacketRecord[] =
  MANUAL_APPROVAL_DECISION_CONTRACTS.map((contract) => {
    const packetSeed = resolveDecisionPacketSeed(contract.id);
    const scopeRecord = resolveScopeRecord(contract.id, packetSeed.sourceScopeId);
    const reviewAuditSummary = resolveHandoffReviewAuditSummary(contract.id);
    const acceptancePosture = resolveHandoffAcceptancePosture(contract.id);
    const handoffPacket = resolveHandoffPacket(contract.id);

    return {
      id: contract.id,
      key: buildStableManualApprovalDecisionPacketKey(contract.id),
      approvalDecisionPacketVersion:
        "backend-owned-synthetic-dry-run-manual-approval-decision-packet-v1",
      decisionContractId: contract.id,
      requestLabel: contract.requestLabel,
      label: `${contract.requestLabel} manual approval decision packet`,
      workspaceTarget: contract.workspaceTarget,
      selectedCapabilityFamily: cloneCapabilityFamily(
        contract.selectedCapabilityFamily
      ),
      sourceHandoffReviewReference: contract.sourceManualApprovalHandoffReviewReference,
      sourceHandoffPacketReference: handoffPacket.key,
      sourceHandoffEvidenceSummaryReference: reviewAuditSummary.key,
      sourceAcceptancePostureReference: acceptancePosture.key,
      packetMode: "preview-only",
      operatorFacingDecisionSummary: `Preview how a future backend-owned operator decision for ${packetSeed.operatorFocus} would remain held until manual approval, manual confirmation, kill switch review, and server-only review exist.`,
      requestedDecisionScope: `Review ${scopeRecord.scopeLabel} for ${contract.requestLabel} without requesting, evaluating, or persisting any approval decision.`,
      allowedDecisionLabels: ALLOWED_DECISION_LABELS,
      selectedDecisionLabel: "not selected",
      approvalReasonSummary: `Approve preview remains a future backend-only option only after ${contract.requestLabel} completes operator approval, manual confirmation, audit review, privacy/redaction review, and server-only gating.`,
      denialReasonSummary: `Deny preview remains the default posture while ${contract.requestLabel} lacks operator approval, manual confirmation, and a backend-owned decision execution path.`,
      deferralReasonSummary: `Defer preview remains available while ${contract.requestLabel} waits for more evidence, privacy review, and cost/rate/timeout review.`,
      safetyEvidenceSummary: `Safety evidence stays limited to the linked handoff review, gate failure posture, and acceptance posture for ${contract.requestLabel}.`,
      privacyRedactionSummary:
        "Privacy and redaction evidence remain preview-only with opaque credential references only and no plaintext secrets.",
      costRateTimeoutSummary:
        "Cost acknowledgement, rate limit guard, and timeout/cancel guard remain required and unresolved for any future backend path.",
      remainingBlockerSummary: `${scopeRecord.scopeLabel}, operator approval, manual confirmation, approval outcome selection, token or lease creation, and all persistence boundaries remain blocked.`,
      operatorApprovalState: "not requested",
      manualConfirmationState: "not captured",
      approvalDecisionState: "not evaluated",
      persistenceState: "not implemented",
      explicitNoApprovalDecisionNoPersistenceStatement:
        "No approval decision. No persistence.",
    };
  });

const MANUAL_APPROVAL_DECISION_REQUEST_CONTRACTS: readonly ManualApprovalDecisionRequestContractRecord[] =
  MANUAL_APPROVAL_DECISION_CONTRACTS.map((contract) => ({
    id: contract.id,
    key: buildStableManualApprovalDecisionRequestKey(contract.id),
    decisionRequestContractVersion:
      "backend-owned-synthetic-dry-run-manual-approval-decision-request-contract-v1",
    decisionContractId: contract.id,
    requestLabel: contract.requestLabel,
    sourceDecisionPacketReference: buildStableManualApprovalDecisionPacketKey(
      contract.id
    ),
    decisionRequestState: "not created",
    decisionInvocationState: "not invoked",
    operatorTargetPosture: "preview-only",
    decisionPayloadPosture: "static preview only",
    approvalReferencePosture: "not persisted",
    auditReferencePosture: "not persisted",
    resultReferencePosture: "not persisted",
    databaseWritePosture: "not implemented",
    fileWritePosture: "not implemented",
    explicitNoDecisionRequestCreatedStatement: "No decision request created.",
  }));

const MANUAL_APPROVAL_DECISION_RESPONSE_CONTRACTS: readonly ManualApprovalDecisionResponseContractRecord[] =
  MANUAL_APPROVAL_DECISION_CONTRACTS.map((contract) => ({
    id: contract.id,
    key: buildStableManualApprovalDecisionResponseKey(contract.id),
    decisionResponseContractVersion:
      "backend-owned-synthetic-dry-run-manual-approval-decision-response-contract-v1",
    decisionContractId: contract.id,
    requestLabel: contract.requestLabel,
    sourceDecisionRequestReference: buildStableManualApprovalDecisionRequestKey(
      contract.id
    ),
    responseState: "not received",
    approvalDecisionState: "not evaluated",
    selectedDecisionState: "not selected",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    approvalPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    resultPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    explicitNoDecisionResponseNoApprovalStatement:
      "No decision response. No approval.",
  }));

const MANUAL_APPROVAL_DECISION_ERROR_CONTRACTS: readonly ManualApprovalDecisionErrorContractRecord[] =
  MANUAL_APPROVAL_DECISION_CONTRACTS.map((contract) => ({
    id: contract.id,
    key: buildStableManualApprovalDecisionErrorKey(contract.id),
    decisionErrorContractVersion:
      "backend-owned-synthetic-dry-run-manual-approval-decision-error-contract-v1",
    decisionContractId: contract.id,
    requestLabel: contract.requestLabel,
    sourceDecisionRequestReference: buildStableManualApprovalDecisionRequestKey(
      contract.id
    ),
    errorState: "not received",
    missingOperatorApprovalExample: `Missing operator approval remains the default example for ${contract.requestLabel}.`,
    missingManualConfirmationExample: `Missing manual confirmation remains the default example for ${contract.requestLabel}.`,
    staleHandoffPacketExample: `A stale handoff packet for ${contract.requestLabel} would remain blocked pending manual review.`,
    unresolvedBlockerExample: `An unresolved blocker for ${contract.requestLabel} would keep the decision path held and not selected.`,
    killSwitchActiveExample: `An active kill switch for ${contract.requestLabel} would keep every future decision path blocked.`,
    privacyRedactionDeniedExample: `A privacy/redaction denial for ${contract.requestLabel} would keep execution and persistence blocked.`,
    approvalScopeDeniedExample: `An approval scope denial for ${contract.requestLabel} would keep the decision request uncreated.`,
    persistenceDeniedExample: `A persistence denial for ${contract.requestLabel} would keep approval, audit, and result references non-persistent.`,
    databaseWriteBlockedExample: `A database write attempt for ${contract.requestLabel} would remain blocked because database writes are not implemented.`,
    fileWriteBlockedExample: `A file write attempt for ${contract.requestLabel} would remain blocked because file writes are not implemented.`,
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    recoveryPosture: "manual review only",
    explicitNoDecisionErrorNoRetryNoFallbackStatement:
      "No decision error. No retry. No fallback.",
  }));

const APPROVAL_OUTCOME_PREVIEW_RECORDS: readonly ApprovalOutcomePreviewRecord[] =
  MANUAL_APPROVAL_DECISION_CONTRACTS.flatMap((contract) =>
    APPROVAL_OUTCOME_SEEDS.map((seed) => ({
      decisionContractId: contract.id,
      key: buildStableApprovalOutcomePreviewKey(contract.id, seed.id),
      outcomeVersion:
        "backend-owned-synthetic-dry-run-approval-outcome-preview-v1",
      outcomeId: seed.id,
      outcomeLabel: seed.label,
      outcomeState: "preview-only / not selected",
      operatorActionRequired: `${seed.operatorActionRequired} ${contract.requestLabel} remains held in preview-only mode.`,
      manualConfirmationRequired: "manual confirmation required",
      requiredEvidence: [
        ...seed.requiredEvidence,
        `${contract.requestLabel} decision contract`,
      ],
      blockedActions: seed.blockedActions,
      allowedFutureActionsIfSelectedInFutureBackendPath: [
        ...seed.allowedFutureActionsIfSelectedInFutureBackendPath,
        `Keep ${contract.requestLabel} inside a backend-owned review path only.`,
      ],
      disallowedActionsEvenIfSelected: seed.disallowedActionsEvenIfSelected,
      currentSafetyPosture: `${seed.currentSafetyPosture} ${contract.selectedCapabilityFamily.label} remains blocked by default.`,
      approvalTokenPosture: "not issued",
      approvalLeasePosture: "not created",
      persistencePosture: "not implemented",
      explicitNoCurrentOutcomeSelectionStatement:
        "No current outcome selection.",
    }))
  );

const MANUAL_APPROVAL_DECISION_GATE_RECORDS: readonly ManualApprovalDecisionGateRecord[] =
  MANUAL_APPROVAL_DECISION_CONTRACTS.flatMap((contract) =>
    MANUAL_APPROVAL_DECISION_GATE_SEEDS.map((seed) => ({
      decisionContractId: contract.id,
      requestLabel: contract.requestLabel,
      id: seed.id,
      key: buildStableManualApprovalDecisionGateKey(contract.id, seed.id),
      label: seed.label,
      gateVersion: "backend-owned-synthetic-dry-run-manual-approval-decision-gate-v1",
      owner: seed.owner,
      requiredState: seed.requiredState,
      currentState: "preview-only / blocked",
      evidenceRequirement: seed.evidenceRequirement,
      blockedDefaultReason: seed.blockedDefaultReason,
      nextReviewRecoveryRequirement:
        NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
    }))
  );

const MANUAL_APPROVAL_DECISION_READINESS_RECORDS: readonly ManualApprovalDecisionReadinessMatrixRecord[] =
  MANUAL_APPROVAL_DECISION_CONTRACTS.map((contract) => ({
    id: contract.id,
    key: buildStableManualApprovalDecisionReadinessKey(contract.id),
    readinessVersion:
      "backend-owned-synthetic-dry-run-manual-approval-decision-readiness-v1",
    requestLabel: contract.requestLabel,
    label: `${contract.requestLabel} manual approval decision readiness`,
    workspaceTarget: contract.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(
      contract.selectedCapabilityFamily
    ),
    decisionContractState: "draft / preview-only / not evaluated",
    decisionPacketState: "preview-only",
    decisionRequestContractState: "preview-only",
    decisionResponseContractState: "preview-only",
    decisionErrorContractState: "preview-only",
    approvalOutcomeState: "preview-only / not selected",
    gateSchemaState: "preview-only / blocked",
    handoffReviewDependency: "linked / preview-only",
    handoffEvidenceDependency: "linked / preview-only",
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
    currentReadiness: CURRENT_READINESS,
    nextSafeAction:
      "Keep manual approval decision data contract-only and move next into decision review and recovery preview only.",
  }));

const MANUAL_APPROVAL_DECISION_EVIDENCE_SUMMARIES: readonly ManualApprovalDecisionEvidenceSummaryRecord[] =
  MANUAL_APPROVAL_DECISION_CONTRACTS.map((contract) => {
    const reviewAuditSummary = resolveHandoffReviewAuditSummary(contract.id);
    const acceptancePosture = resolveHandoffAcceptancePosture(contract.id);
    const gateFailureReview = resolvePrimaryGateFailureReview(contract.id);
    const recoveryPlan = resolveHandoffRecoveryPlan(contract.id);

    return {
      id: contract.id,
      key: buildStableManualApprovalDecisionEvidenceSummaryKey(contract.id),
      evidenceSummaryVersion:
        "backend-owned-synthetic-dry-run-manual-approval-decision-evidence-summary-v1",
      decisionContractId: contract.id,
      requestLabel: contract.requestLabel,
      sourceHandoffReviewReference: contract.sourceManualApprovalHandoffReviewReference,
      sourceHandoffAuditSummaryReference: reviewAuditSummary.key,
      sourceHandoffAcceptancePostureReference: acceptancePosture.key,
      evidenceState: "preview-only",
      safetyEvidence: `Safety evidence remains linked to the handoff review, gate failure posture, and held acceptance posture for ${contract.requestLabel}.`,
      privacyEvidence:
        "Privacy evidence remains preview-only with redaction required, opaque credential references only, and no plaintext secrets.",
      auditEvidence:
        "Audit evidence remains preview-only, required, and non-persistent.",
      approvalEvidence:
        "Approval evidence remains preview-only with operator approval not requested, manual confirmation not captured, and approval outcome not decided.",
      resultEvidence:
        "Result evidence remains preview-only with result references not persisted and result capture not captured.",
      handoffEvidence: reviewAuditSummary.handoffEvidenceSummary,
      gateEvidence: gateFailureReview.failedGateLabel,
      blockerEvidence: gateFailureReview.requiredRecoveryAction,
      recoveryEvidence: recoveryPlan.nextSafeBatchRecommendation,
      evidenceDigestPosture: "deterministic preview digest only",
      persistenceState: "not implemented",
      explicitNoDecisionEvidencePersistenceStatement:
        "No decision evidence persistence.",
    };
  });

export function listBackendOwnedSyntheticDryRunManualApprovalDecisionContracts(): readonly BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord[] {
  return cloneList(MANUAL_APPROVAL_DECISION_CONTRACTS);
}

export function listManualApprovalDecisionPackets(): readonly ManualApprovalDecisionPacketRecord[] {
  return cloneList(MANUAL_APPROVAL_DECISION_PACKETS);
}

export function listManualApprovalDecisionRequestContracts(): readonly ManualApprovalDecisionRequestContractRecord[] {
  return cloneList(MANUAL_APPROVAL_DECISION_REQUEST_CONTRACTS);
}

export function listManualApprovalDecisionResponseContracts(): readonly ManualApprovalDecisionResponseContractRecord[] {
  return cloneList(MANUAL_APPROVAL_DECISION_RESPONSE_CONTRACTS);
}

export function listManualApprovalDecisionErrorContracts(): readonly ManualApprovalDecisionErrorContractRecord[] {
  return cloneList(MANUAL_APPROVAL_DECISION_ERROR_CONTRACTS);
}

export function listApprovalOutcomePreviewRecords(): readonly ApprovalOutcomePreviewRecord[] {
  return cloneList(APPROVAL_OUTCOME_PREVIEW_RECORDS);
}

export function listManualApprovalDecisionGateRecords(): readonly ManualApprovalDecisionGateRecord[] {
  return cloneList(MANUAL_APPROVAL_DECISION_GATE_RECORDS);
}

export function listManualApprovalDecisionReadinessMatrixRecords(): readonly ManualApprovalDecisionReadinessMatrixRecord[] {
  return cloneList(MANUAL_APPROVAL_DECISION_READINESS_RECORDS);
}

export function listManualApprovalDecisionEvidenceSummaries(): readonly ManualApprovalDecisionEvidenceSummaryRecord[] {
  return cloneList(MANUAL_APPROVAL_DECISION_EVIDENCE_SUMMARIES);
}

export function groupManualApprovalDecisionsByCapabilityFamily(): readonly ManualApprovalDecisionCapabilityFamilyGroup[] {
  return groupContractsByCapabilityFamily(MANUAL_APPROVAL_DECISION_CONTRACTS);
}

export function groupManualApprovalDecisionsByWorkspaceTarget(): readonly ManualApprovalDecisionWorkspaceGroup[] {
  return groupContractsByWorkspaceTarget(MANUAL_APPROVAL_DECISION_CONTRACTS);
}

export function buildManualApprovalDecisionSummary(): ManualApprovalDecisionContractSummary {
  const capabilityGroups = groupManualApprovalDecisionsByCapabilityFamily();
  const workspaceGroups = groupManualApprovalDecisionsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
    contractCount: MANUAL_APPROVAL_DECISION_CONTRACTS.length,
    packetCount: MANUAL_APPROVAL_DECISION_PACKETS.length,
    requestContractCount: MANUAL_APPROVAL_DECISION_REQUEST_CONTRACTS.length,
    responseContractCount: MANUAL_APPROVAL_DECISION_RESPONSE_CONTRACTS.length,
    errorContractCount: MANUAL_APPROVAL_DECISION_ERROR_CONTRACTS.length,
    outcomeRecordCount: APPROVAL_OUTCOME_PREVIEW_RECORDS.length,
    gateRecordCount: MANUAL_APPROVAL_DECISION_GATE_RECORDS.length,
    readinessRecordCount: MANUAL_APPROVAL_DECISION_READINESS_RECORDS.length,
    evidenceSummaryCount: MANUAL_APPROVAL_DECISION_EVIDENCE_SUMMARIES.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    decisionState: "draft / preview-only / not evaluated",
    currentReadiness: CURRENT_READINESS,
    summaryLines: buildUniqueManualApprovalDecisionDisplayStrings(
      DECISION_SUMMARY_LINES
    ),
  };
}

export function buildManualApprovalDecisionGateSummary(): ManualApprovalDecisionGateSummary {
  const backendContractGateCount = MANUAL_APPROVAL_DECISION_GATE_RECORDS.filter(
    (record) => record.owner === "backend manual approval decision contract"
  ).length;
  const operatorGateCount = MANUAL_APPROVAL_DECISION_GATE_RECORDS.filter(
    (record) => record.owner === "operator"
  ).length;
  const safetyReviewGateCount = MANUAL_APPROVAL_DECISION_GATE_RECORDS.filter(
    (record) => record.owner === "safety review"
  ).length;
  const backendFutureGateCount = MANUAL_APPROVAL_DECISION_GATE_RECORDS.filter(
    (record) => record.owner === "backend future"
  ).length;

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
    gateCount: MANUAL_APPROVAL_DECISION_GATE_RECORDS.length,
    backendContractGateCount,
    operatorGateCount,
    safetyReviewGateCount,
    backendFutureGateCount,
    summaryLines: buildUniqueManualApprovalDecisionDisplayStrings(
      GATE_SUMMARY_LINES
    ),
  };
}

export function buildManualApprovalDecisionReadinessSummary(): ManualApprovalDecisionReadinessSummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
    readinessRecordCount: MANUAL_APPROVAL_DECISION_READINESS_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    nextSafeAction:
      "Keep the decision layer contract-only and review recovery posture in the next batch.",
    summaryLines: buildUniqueManualApprovalDecisionDisplayStrings(
      READINESS_SUMMARY_LINES
    ),
  };
}

export function buildNextManualApprovalDecisionReviewAndRecoveryChecklist(): readonly string[] {
  return cloneList(NEXT_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_CHECKLIST);
}
