import type {
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  listBackendOwnedSyntheticDryRunEndToEndPacketContracts,
  listSyntheticEndToEndPacketAcceptancePostureRecords,
  listSyntheticEndToEndPacketErrorContracts,
  listSyntheticEndToEndPacketGateRecords,
  listSyntheticEndToEndPacketLineageRecords,
  listSyntheticEndToEndPacketReadinessMatrixRecords,
  listSyntheticEndToEndPacketRequestContracts,
  listSyntheticEndToEndPacketResponseContracts,
  listSyntheticEndToEndPacketStageRecords,
  type BackendOwnedSyntheticDryRunEndToEndPacketContractRecord,
  type EndToEndPacketAcceptancePostureRecord as EndToEndPacketContractAcceptancePostureRecord,
  type EndToEndPacketContractId,
  type EndToEndPacketErrorContractRecord,
  type EndToEndPacketGateRecord,
  type EndToEndPacketLineageRecord,
  type EndToEndPacketReadinessMatrixRecord,
  type EndToEndPacketRequestContractRecord,
  type EndToEndPacketResponseContractRecord,
  type EndToEndPacketStageContractRecord,
} from "../backend-owned-synthetic-dry-run-end-to-end-packet-contract";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
  type BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord,
  type EndToEndPacketAcceptancePostureKey,
  type EndToEndPacketAcceptancePostureRecord,
  type EndToEndPacketDecisionReviewKey,
  type EndToEndPacketDecisionReviewRecord,
  type EndToEndPacketDecisionState,
  type EndToEndPacketGateFailureId,
  type EndToEndPacketGateFailureLabel,
  type EndToEndPacketGateFailureReviewKey,
  type EndToEndPacketGateFailureReviewRecord,
  type EndToEndPacketGateFailureState,
  type EndToEndPacketGateFailureSummary,
  type EndToEndPacketRecoveryPlanKey,
  type EndToEndPacketRecoveryPlanPreviewRecord,
  type EndToEndPacketRecoveryReadinessChecklistId,
  type EndToEndPacketRecoveryReadinessChecklistKey,
  type EndToEndPacketRecoveryReadinessChecklistLabel,
  type EndToEndPacketRecoveryReadinessChecklistRecord,
  type EndToEndPacketRecoverySummary,
  type EndToEndPacketReviewAuditSummaryKey,
  type EndToEndPacketReviewAuditSummaryRecord,
  type EndToEndPacketReviewCapabilityFamilyGroup,
  type EndToEndPacketReviewCurrentReadiness,
  type EndToEndPacketReviewId,
  type EndToEndPacketReviewKey,
  type EndToEndPacketReviewSeverity,
  type EndToEndPacketReviewSummary,
  type EndToEndPacketReviewWorkspaceGroup,
  type EndToEndPacketStageFailureId,
  type EndToEndPacketStageFailureLabel,
  type EndToEndPacketStageFailureReviewKey,
  type EndToEndPacketStageFailureReviewRecord,
  type EndToEndPacketStageFailureState,
  type EndToEndPacketStageFailureSummary,
} from "./backend-owned-synthetic-dry-run-end-to-end-packet-review-recovery-preview-types";

type DecisionSeed = Readonly<{
  topBlockingStageIds: readonly EndToEndPacketStageFailureId[];
  topBlockingGateIds: readonly EndToEndPacketGateFailureId[];
  topMissingEvidence: readonly string[];
  operatorReviewNotes: readonly string[];
  packetReasonSummary: string;
  manualRecoveryRequirement: string;
  nextSafeAction: string;
}>;

type StageFailureSeed = Readonly<{
  id: EndToEndPacketStageFailureId;
  label: EndToEndPacketStageFailureLabel;
  state: EndToEndPacketStageFailureState;
  severity: EndToEndPacketReviewSeverity;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

type GateFailureSeed = Readonly<{
  id: EndToEndPacketGateFailureId;
  label: EndToEndPacketGateFailureLabel;
  state: EndToEndPacketGateFailureState;
  severity: EndToEndPacketReviewSeverity;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

type RecoveryReadinessChecklistSeed = Readonly<{
  checklistId: EndToEndPacketRecoveryReadinessChecklistId;
  label: EndToEndPacketRecoveryReadinessChecklistLabel;
  state: EndToEndPacketRecoveryReadinessChecklistRecord["state"];
  severity: EndToEndPacketReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: EndToEndPacketRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const REVIEW_SUMMARY_LINES = [
  "backend-owned synthetic dry-run end-to-end packet review and recovery preview only",
  "end-to-end packet review is preview-only",
  "packet decision review is preview-only",
  "packet stage failure review is preview-only",
  "packet gate failure review is preview-only",
  "packet recovery plan is preview-only",
  "packet recovery readiness is preview-only",
  "packet review audit summary is preview-only",
  "packet acceptance posture is preview-only",
  "packet state is draft / preview-only",
  "packet request is not created",
  "packet invocation is not invoked",
  "packet response is not received",
  "packet error is not received",
  "decision state is held / not accepted",
  "admission state is not admitted",
  "admission token is not issued",
  "admission lease is not created",
  "dry-run request is not created",
  "runner invocation is not invoked",
  "dry-run execution is not executed",
  "provider response is not received",
  "model output is not generated",
  "synthetic fixture result is static placeholder only",
  "result capture state is not captured",
  "result persistence is not implemented",
  "audit join state is not persisted",
  "approval join state is not persisted",
  "result reference state is not persisted",
  "evidence packet is preview-only",
  "audit envelope state is not created",
  "approval envelope state is not created",
  "database write is not implemented",
  "file write is not implemented",
  "current readiness is end-to-end-packet-review-only / not executable / not persistent",
  "acceptance state is not accepted / preview-only",
  "recovery is manual review only",
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
  "backend-owned synthetic dry-run manual approval handoff contract next",
] as const;

export const END_TO_END_PACKET_REVIEW_SECTION_TITLES = [
  "Backend-owned synthetic dry-run end-to-end packet review",
  "End-to-end packet decision review",
  "End-to-end packet stage failure review",
  "End-to-end packet gate failure review",
  "End-to-end packet recovery plan",
  "End-to-end packet recovery readiness",
  "End-to-end packet review audit summary",
  "End-to-end packet acceptance posture",
] as const;

const STAGE_FAILURE_SUMMARY_LINES = [
  "run intent stage failure",
  "approval packet stage failure",
  "manual admission stage failure",
  "backend admission contract stage failure",
  "dry-run runner contract stage failure",
  "synthetic runner skeleton stage failure",
  "synthetic result envelope stage failure",
  "result capture contract stage failure",
  "result capture review stage failure",
  "audit join contract stage failure",
  "approval join contract stage failure",
  "audit approval join review stage failure",
  "evidence packet stage failure",
  "final packet stage failure",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "run intent gate failure",
  "approval packet gate failure",
  "manual admission gate failure",
  "backend admission contract gate failure",
  "admission token gate failure",
  "admission lease gate failure",
  "dry-run runner contract gate failure",
  "synthetic runner skeleton gate failure",
  "result envelope gate failure",
  "result capture contract gate failure",
  "result capture review gate failure",
  "audit approval join contract gate failure",
  "audit approval join review gate failure",
  "evidence packet gate failure",
  "operator approval gate failure",
  "manual confirmation gate failure",
  "kill switch gate failure",
  "audit gate failure",
  "server-only boundary gate failure",
  "opaque credential gate failure",
  "privacy/redaction gate failure",
  "cost/rate/timeout gate failure",
  "idempotency/replay gate failure",
  "single-run lock gate failure",
  "result persistence gate failure",
  "audit persistence gate failure",
  "approval persistence gate failure",
  "database write gate failure",
  "file write gate failure",
  "queue dispatch gate failure",
  "worker dispatch gate failure",
  "job execution gate failure",
] as const;

const RECOVERY_SUMMARY_LINES = [
  "packet recovery plan is preview-only",
  "packet recovery readiness is preview-only",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "request not created recovery",
  "response not received recovery",
  "error not received recovery",
  "acceptance unresolved recovery",
  "result persistence missing recovery",
  "audit persistence missing recovery",
  "approval persistence missing recovery",
  "database write blocked recovery",
  "file write blocked recovery",
  "queue dispatch blocked recovery",
  "worker dispatch blocked recovery",
  "job execution blocked recovery",
  "backend-owned synthetic dry-run manual approval handoff contract next",
] as const;

const MANUAL_APPROVAL_HANDOFF_CONTRACT_CHECKLIST = [
  "Review held end-to-end packet decisions before any manual approval handoff contract is drafted.",
  "Carry packet request, response, error, stage, gate, lineage, readiness, and acceptance posture forward as preview-only references only.",
  "Keep packet execution, provider execution, result persistence, audit persistence, approval persistence, database writes, file writes, queue dispatch, worker dispatch, and job execution blocked.",
  "Preserve manual operator review, manual recovery review, manual approval, manual confirmation, kill switch, privacy/redaction, cost/rate/timeout, idempotency/replay, and single-run lock requirements.",
  "Define the next batch as backend-owned, deterministic, frontend-safe, and manual review first without enabling retries, fallbacks, or any live execution path.",
] as const;

function createDecisionSeed(
  topBlockingStageIds: readonly EndToEndPacketStageFailureId[],
  topBlockingGateIds: readonly EndToEndPacketGateFailureId[],
  topMissingEvidence: readonly string[],
  operatorReviewNotes: readonly string[],
  packetReasonSummary: string,
  manualRecoveryRequirement: string,
  nextSafeAction: string
): DecisionSeed {
  return {
    topBlockingStageIds,
    topBlockingGateIds,
    topMissingEvidence,
    operatorReviewNotes,
    packetReasonSummary,
    manualRecoveryRequirement,
    nextSafeAction,
  };
}

function createStageFailureSeed(
  id: EndToEndPacketStageFailureId,
  label: EndToEndPacketStageFailureLabel,
  state: EndToEndPacketStageFailureState,
  severity: EndToEndPacketReviewSeverity,
  operatorFacingExplanation: string,
  requiredEvidenceToUnblock: string,
  requiredRecoveryAction: string,
  nextSafeAction: string
): StageFailureSeed {
  return {
    id,
    label,
    state,
    severity,
    operatorFacingExplanation,
    requiredEvidenceToUnblock,
    requiredRecoveryAction,
    nextSafeAction,
  };
}

function createGateFailureSeed(
  id: EndToEndPacketGateFailureId,
  label: EndToEndPacketGateFailureLabel,
  state: EndToEndPacketGateFailureState,
  severity: EndToEndPacketReviewSeverity,
  operatorFacingExplanation: string,
  requiredEvidenceToUnblock: string,
  requiredRecoveryAction: string,
  nextSafeAction: string
): GateFailureSeed {
  return {
    id,
    label,
    state,
    severity,
    operatorFacingExplanation,
    requiredEvidenceToUnblock,
    requiredRecoveryAction,
    nextSafeAction,
  };
}

function createRecoveryReadinessChecklistSeed(
  checklistId: EndToEndPacketRecoveryReadinessChecklistId,
  label: EndToEndPacketRecoveryReadinessChecklistLabel,
  state: EndToEndPacketRecoveryReadinessChecklistRecord["state"],
  severity: EndToEndPacketReviewSeverity,
  evidenceRequired: string,
  recoveryAction: string,
  owner: EndToEndPacketRecoveryReadinessChecklistRecord["owner"],
  nextSafeAction: string
): RecoveryReadinessChecklistSeed {
  return {
    checklistId,
    label,
    state,
    severity,
    evidenceRequired,
    recoveryAction,
    owner,
    nextSafeAction,
  };
}

const DECISION_SEEDS = {
  "conversational-planning-request": createDecisionSeed(
    ["run-intent-stage", "approval-packet-stage", "final-packet-stage"],
    ["run-intent-gate", "operator-approval-gate", "result-persistence-gate"],
    [
      "A reviewed planning run intent that still never creates a packet request.",
      "Manual approval notes explaining why the held planning packet must stay preview-only.",
      "Persistence evidence proving planning output still cannot be stored anywhere.",
    ],
    [
      "Planning remains held while the packet never leaves preview-only posture.",
      "The operator can review the planning packet, but cannot admit or execute it.",
    ],
    "Conversational planning remains held because the packet request is not created, operator approval remains outstanding, and result persistence is still not implemented.",
    "Review planning packet blockers manually and carry the held packet into the manual approval handoff contract without creating any execution path.",
    "Keep the planning packet held and prepare the manual approval handoff contract.",
  ),
  "code-assistance-request": createDecisionSeed(
    [
      "run-intent-stage",
      "backend-admission-contract-stage",
      "dry-run-runner-contract-stage",
    ],
    [
      "idempotency-replay-gate",
      "single-run-lock-gate",
      "audit-approval-join-review-gate",
    ],
    [
      "Idempotency and replay-block evidence for future backend-only code assistance packets.",
      "Single-run lock proof showing the code assistance packet cannot duplicate work.",
      "Review notes showing audit and approval joins still remain preview-only.",
    ],
    [
      "Code assistance remains review-only while backend admission and runner posture stay unresolved.",
      "No retry or fallback path may be introduced for the code assistance packet.",
    ],
    "Code assistance remains held because the end-to-end packet lacks reviewed idempotency safeguards, a single-run lock, and a completed audit/approval review handoff.",
    "Keep code assistance review-only, preserve replay protections as future work, and carry the held packet into the manual approval handoff contract.",
    "Hold the code assistance packet and document the handoff dependencies.",
  ),
  "website-copy-code-request": createDecisionSeed(
    [
      "approval-packet-stage",
      "result-capture-review-stage",
      "final-packet-stage",
    ],
    ["server-only-boundary-gate", "database-write-gate", "file-write-gate"],
    [
      "A reviewed website copy/code approval packet that remains non-runnable.",
      "Explicit database-write blocking evidence for website packet handling.",
      "Explicit file-write blocking evidence for website packet handling.",
    ],
    [
      "Website copy/code remains frontend-blocked and cannot mutate product assets.",
      "The held packet must stay draft while database and file writes remain unimplemented.",
    ],
    "Website copy/code remains held because approval review is incomplete and all database/file mutation paths stay blocked.",
    "Carry the held website packet into the manual approval handoff contract without introducing writes, uploads, or execution.",
    "Keep the website packet draft-only and blocked by server-only boundaries.",
  ),
  "product-video-request": createDecisionSeed(
    [
      "synthetic-runner-skeleton-stage",
      "result-capture-contract-stage",
      "final-packet-stage",
    ],
    ["kill-switch-gate", "queue-dispatch-gate", "job-execution-gate"],
    [
      "Kill switch review proving video execution remains blocked by default.",
      "Queue dispatch evidence showing the product video packet cannot dispatch work.",
      "Job execution evidence showing no render or publish path exists.",
    ],
    [
      "The above-the-fold video console stays locked while packet review remains preview-only.",
      "Video packet execution, queue dispatch, and job execution remain blocked.",
    ],
    "Product video remains held because kill switch review is required and queue/job execution stay blocked with no runnable backend-owned handoff.",
    "Preserve the locked video posture and carry the held packet into the manual approval handoff contract without enabling video generation.",
    "Keep the product video packet locked and manual-review-only.",
  ),
  "storyboard-image-request": createDecisionSeed(
    [
      "synthetic-result-envelope-stage",
      "approval-join-contract-stage",
      "final-packet-stage",
    ],
    [
      "privacy-redaction-gate",
      "opaque-credential-gate",
      "approval-persistence-gate",
    ],
    [
      "Privacy/redaction evidence showing storyboard image content remains safe to review only.",
      "Opaque credential evidence showing no plaintext secrets are exposed.",
      "Approval persistence evidence proving the held packet still stores nothing.",
    ],
    [
      "Storyboard image output remains a static placeholder only.",
      "Credential posture remains opaque and approval joins remain non-persistent.",
    ],
    "Storyboard image remains held because privacy review is incomplete, credential posture stays opaque, and approval persistence is not implemented.",
    "Keep storyboard image review-only and carry the unresolved privacy and credential blockers into the manual approval handoff contract.",
    "Hold the storyboard image packet and continue manual review.",
  ),
  "audio-narration-request": createDecisionSeed(
    [
      "manual-admission-stage",
      "dry-run-runner-contract-stage",
      "result-capture-review-stage",
    ],
    ["admission-token-gate", "cost-rate-timeout-gate", "worker-dispatch-gate"],
    [
      "Manual admission evidence showing no admission token is issued for narration.",
      "Cost/rate/timeout evidence for future backend-owned narration review.",
      "Worker dispatch evidence proving the narration packet never leaves preview-only posture.",
    ],
    [
      "Audio narration stays held while admission and worker boundaries remain blocked.",
      "No narration retry, fallback, or worker execution path exists.",
    ],
    "Audio narration remains held because admission is incomplete, cost and timeout review is unresolved, and worker dispatch remains blocked.",
    "Carry held narration admission and worker blockers into the manual approval handoff contract while keeping the packet non-executable.",
    "Keep the audio narration packet not admitted and not dispatched.",
  ),
  "transcription-caption-request": createDecisionSeed(
    [
      "backend-admission-contract-stage",
      "synthetic-result-envelope-stage",
      "audit-approval-join-review-stage",
    ],
    ["cost-rate-timeout-gate", "worker-dispatch-gate", "job-execution-gate"],
    [
      "Throughput and timeout evidence for transcription/caption review.",
      "Worker isolation evidence for caption handling that still never dispatches.",
      "Job execution evidence proving no caption processing job can start.",
    ],
    [
      "Transcription/caption remains held while worker and job boundaries stay blocked.",
      "Audit/approval review still remains preview-only and non-persistent.",
    ],
    "Transcription/caption remains held because backend admission is unresolved, the result envelope stays preview-only, and worker/job execution remain blocked.",
    "Carry held caption boundaries into the manual approval handoff contract and preserve no-execution posture.",
    "Keep the transcription/caption packet blocked by manual review only.",
  ),
  "embeddings-search-request": createDecisionSeed(
    ["run-intent-stage", "result-capture-contract-stage", "evidence-packet-stage"],
    ["idempotency-replay-gate", "result-persistence-gate", "audit-persistence-gate"],
    [
      "Replay protection evidence for embeddings/search packet reuse.",
      "Result persistence evidence proving search vectors remain unpersisted.",
      "Audit persistence evidence proving search review writes remain disabled.",
    ],
    [
      "Embeddings/search remains held while persistence boundaries stay unimplemented.",
      "Replay protections are still a manual review item for the next batch.",
    ],
    "Embeddings/search remains held because replay protections are incomplete and both result and audit persistence remain blocked.",
    "Carry held embeddings/search persistence and replay blockers into the manual approval handoff contract.",
    "Keep the embeddings/search packet preview-only and non-persistent.",
  ),
  "safety-moderation-review-request": createDecisionSeed(
    ["approval-packet-stage", "audit-join-contract-stage", "evidence-packet-stage"],
    ["privacy-redaction-gate", "audit-gate", "operator-approval-gate"],
    [
      "A reviewed moderation approval packet that still cannot be accepted.",
      "Audit evidence showing moderation review remains preview-only.",
      "Privacy/redaction evidence showing sensitive moderation content stays protected.",
    ],
    [
      "Safety/moderation remains held under manual review and audit requirements.",
      "Operator approval is still required before any future handoff contract can exist.",
    ],
    "Safety/moderation remains held because privacy, audit, and operator approval requirements are unresolved and the packet remains preview-only.",
    "Carry the held safety packet into the manual approval handoff contract with audit and privacy requirements intact.",
    "Keep the safety/moderation packet under manual review.",
  ),
  "local-private-inference-request": createDecisionSeed(
    [
      "manual-admission-stage",
      "synthetic-runner-skeleton-stage",
      "final-packet-stage",
    ],
    ["server-only-boundary-gate", "opaque-credential-gate", "single-run-lock-gate"],
    [
      "Server-only boundary evidence for future local/private backend adapters.",
      "Opaque credential evidence showing local/private references remain non-secret labels.",
      "Single-run lock evidence proving local/private dry-runs remain deterministic.",
    ],
    [
      "Local/private inference remains held because frontend execution is blocked by design.",
      "Credential posture stays opaque and all backend-only boundaries remain future work.",
    ],
    "Local/private inference remains held because server-only boundaries, opaque credentials, and single-run lock requirements remain unresolved.",
    "Carry held local/private inference constraints into the manual approval handoff contract without enabling any direct local execution path.",
    "Keep the local/private packet blocked behind server-only review.",
  ),
  "audit-recovery-explanation-request": createDecisionSeed(
    [
      "audit-approval-join-review-stage",
      "evidence-packet-stage",
      "final-packet-stage",
    ],
    [
      "audit-approval-join-review-gate",
      "manual-confirmation-gate",
      "approval-persistence-gate",
    ],
    [
      "Reviewed audit/recovery explanation evidence that still remains preview-only.",
      "Manual confirmation evidence proving no explanation packet is accepted automatically.",
      "Approval persistence evidence confirming no handoff record is stored yet.",
    ],
    [
      "Audit/recovery explanation stays held as a preview-only operator aid.",
      "Manual confirmation and approval persistence remain unresolved blockers.",
    ],
    "Audit/recovery explanation remains held because audit/approval review is preview-only, manual confirmation is still required, and approval persistence remains blocked.",
    "Carry the held audit/recovery explanation packet into the manual approval handoff contract while preserving non-persistent posture.",
    "Keep the audit/recovery explanation packet in manual review only.",
  ),
} as const satisfies Record<EndToEndPacketReviewId, DecisionSeed>;

const STAGE_FAILURE_SEEDS = [
  createStageFailureSeed(
    "run-intent-stage",
    "run intent stage failure",
    "held / run intent preview-only",
    "high",
    "Run intent remains linked as a typed reference, but it never graduates into a created end-to-end packet request.",
    "A reviewed run intent reference, capability family selection, and packet-request hold rationale.",
    "Carry run intent evidence into the manual approval handoff contract without creating a packet request.",
    "Keep the run intent stage held and preview-only.",
  ),
  createStageFailureSeed(
    "approval-packet-stage",
    "approval packet stage failure",
    "held / approval packet preview-only",
    "high",
    "The approval packet remains a review artifact and does not unlock packet acceptance or execution.",
    "A reviewed approval packet digest, held decision notes, and operator-facing approval blockers.",
    "Keep approval packet review local to the preview layer and hand the blockers forward manually.",
    "Continue approval packet review without accepting the packet.",
  ),
  createStageFailureSeed(
    "manual-admission-stage",
    "manual admission stage failure",
    "held / manual admission preview-only",
    "high",
    "Manual admission remains preview-only, so no admission token or lease can be created for the packet.",
    "A manual admission review showing admission remains not admitted and token issuance stays blocked.",
    "Preserve manual admission as a held review step and document the blocker for the next batch.",
    "Keep manual admission blocked and review-only.",
  ),
  createStageFailureSeed(
    "backend-admission-contract-stage",
    "backend admission contract stage failure",
    "held / backend admission contract preview-only",
    "critical",
    "Backend admission contract coverage exists only as typed preview data, so the packet cannot progress toward execution.",
    "Reviewed backend admission contract references, server-only ownership notes, and no-admission evidence.",
    "Carry backend admission requirements into the manual approval handoff contract without creating a backend request path.",
    "Hold the backend admission contract stage at preview-only.",
  ),
  createStageFailureSeed(
    "dry-run-runner-contract-stage",
    "dry-run runner contract stage failure",
    "held / dry-run runner contract preview-only",
    "critical",
    "The dry-run runner contract remains a non-runnable preview, so packet invocation never occurs.",
    "Reviewed runner contract references, blocked invocation evidence, and no-dispatch posture.",
    "Preserve runner contract references as inert inputs to the next manual approval handoff contract.",
    "Keep the dry-run runner contract stage non-runnable.",
  ),
  createStageFailureSeed(
    "synthetic-runner-skeleton-stage",
    "synthetic runner skeleton stage failure",
    "held / synthetic runner skeleton preview-only",
    "critical",
    "Synthetic runner skeleton coverage exists only as a static placeholder, so no backend-owned dry-run execution can begin.",
    "Reviewed runner skeleton references, fixture posture, and server-only boundary notes.",
    "Carry synthetic runner skeleton posture forward without enabling any execution path.",
    "Keep the synthetic runner skeleton stage preview-only.",
  ),
  createStageFailureSeed(
    "synthetic-result-envelope-stage",
    "synthetic result envelope stage failure",
    "held / synthetic result envelope preview-only",
    "high",
    "The result envelope remains a static placeholder, so the packet never produces a provider response or model output.",
    "Reviewed synthetic result envelope references, placeholder output posture, and no-model-call evidence.",
    "Maintain the static result placeholder and document why output remains non-generated.",
    "Continue result envelope review without generating output.",
  ),
  createStageFailureSeed(
    "result-capture-contract-stage",
    "result capture contract stage failure",
    "held / result capture contract preview-only",
    "high",
    "Result capture contract coverage exists only as typed preview data, so nothing is captured or persisted.",
    "Reviewed result capture contract references, capture blockers, and no-persistence evidence.",
    "Carry capture blockers into the next manual approval handoff contract without creating storage paths.",
    "Keep the result capture contract stage blocked.",
  ),
  createStageFailureSeed(
    "result-capture-review-stage",
    "result capture review stage failure",
    "held / result capture review preview-only",
    "high",
    "Result capture review remains held while packet response and packet error states both remain not received.",
    "A reviewed capture decision summary, held capture notes, and static placeholder evidence.",
    "Preserve capture review posture and hand the blockers forward manually.",
    "Keep result capture review held and non-persistent.",
  ),
  createStageFailureSeed(
    "audit-join-contract-stage",
    "audit join contract stage failure",
    "held / audit join contract preview-only",
    "high",
    "Audit join contract references remain preview-only, so no audit envelope or audit persistence path exists.",
    "Reviewed audit join references, held audit evidence, and non-persistent audit posture.",
    "Carry audit join blockers into the next batch and keep audit references non-persistent.",
    "Continue audit join review only.",
  ),
  createStageFailureSeed(
    "approval-join-contract-stage",
    "approval join contract stage failure",
    "held / approval join contract preview-only",
    "high",
    "Approval join contract references remain preview-only, so no approval envelope or approval persistence path exists.",
    "Reviewed approval join references, held approval evidence, and non-persistent approval posture.",
    "Carry approval join blockers into the next batch and keep approval references non-persistent.",
    "Continue approval join review only.",
  ),
  createStageFailureSeed(
    "audit-approval-join-review-stage",
    "audit approval join review stage failure",
    "held / audit approval join review preview-only",
    "critical",
    "Audit/approval join review remains a held preview layer and still cannot hand the packet into an accepted recovery state.",
    "Reviewed audit/approval join review notes, gate blockers, and manual recovery posture.",
    "Preserve review-only join recovery posture and carry it into the manual approval handoff contract.",
    "Keep the audit/approval join review stage held.",
  ),
  createStageFailureSeed(
    "evidence-packet-stage",
    "evidence packet stage failure",
    "held / evidence packet preview-only",
    "high",
    "Evidence packet coverage remains preview-only, so the operator can review evidence but cannot persist or approve it.",
    "Reviewed evidence packet references, redaction posture, and blocked persistence evidence.",
    "Carry evidence packet review into the next batch without creating storage or approval writes.",
    "Keep the evidence packet stage preview-only.",
  ),
  createStageFailureSeed(
    "final-packet-stage",
    "final packet stage failure",
    "held / final packet draft preview-only",
    "critical",
    "The final packet stays in draft preview-only posture because every blocking stage remains unresolved.",
    "A reviewed final packet hold summary covering request, response, error, execution, and persistence blockers.",
    "Carry the complete held packet into the manual approval handoff contract as inert review evidence only.",
    "Keep the final packet stage held and not accepted.",
  ),
] as const satisfies readonly StageFailureSeed[];

const GATE_FAILURE_SEEDS = [
  createGateFailureSeed(
    "run-intent-gate",
    "run intent gate failure",
    "held / run intent review incomplete",
    "high",
    "Run intent review has not satisfied the evidence needed to let the packet leave preview-only posture.",
    "Reviewed run intent rationale and packet-request hold notes.",
    "Carry run intent review evidence forward without creating a packet request.",
    "Keep the run intent gate blocked.",
  ),
  createGateFailureSeed(
    "approval-packet-gate",
    "approval packet gate failure",
    "held / approval packet review incomplete",
    "high",
    "Approval packet review remains incomplete, so acceptance remains held.",
    "Reviewed approval packet digest, hold notes, and operator approval blockers.",
    "Complete approval packet review in the next handoff contract without accepting the packet.",
    "Keep the approval packet gate blocked.",
  ),
  createGateFailureSeed(
    "manual-admission-gate",
    "manual admission gate failure",
    "held / manual admission review incomplete",
    "high",
    "Manual admission remains a held preview step and cannot authorize packet execution.",
    "Manual admission review notes showing not admitted posture.",
    "Carry admission blockers into the manual approval handoff contract.",
    "Keep the manual admission gate blocked.",
  ),
  createGateFailureSeed(
    "backend-admission-contract-gate",
    "backend admission contract gate failure",
    "held / backend admission contract preview-only",
    "critical",
    "Backend admission contracts remain preview-only and do not authorize any live request path.",
    "Reviewed server-only admission contract references and blocked execution notes.",
    "Keep backend admission as a preview-only dependency in the next batch.",
    "Keep the backend admission contract gate blocked.",
  ),
  createGateFailureSeed(
    "admission-token-gate",
    "admission token gate failure",
    "held / admission token not issued",
    "critical",
    "No admission token is issued, so the packet remains held by design.",
    "Admission review evidence proving token issuance is not implemented.",
    "Carry token issuance as future backend work and do not synthesize one in frontend code.",
    "Keep the admission token gate blocked.",
  ),
  createGateFailureSeed(
    "admission-lease-gate",
    "admission lease gate failure",
    "held / admission lease not created",
    "critical",
    "No admission lease exists, so packet execution cannot be reserved or started.",
    "Admission lease review notes showing lease creation is still blocked.",
    "Carry admission lease requirements into the next backend-owned handoff contract.",
    "Keep the admission lease gate blocked.",
  ),
  createGateFailureSeed(
    "dry-run-runner-contract-gate",
    "dry-run runner contract gate failure",
    "held / dry-run runner contract preview-only",
    "critical",
    "Runner contract coverage exists only as preview data, so invocation remains impossible.",
    "Reviewed runner contract references and no-invocation posture.",
    "Preserve runner contract posture without introducing dispatch or jobs.",
    "Keep the dry-run runner contract gate blocked.",
  ),
  createGateFailureSeed(
    "synthetic-runner-skeleton-gate",
    "synthetic runner skeleton gate failure",
    "held / synthetic runner skeleton preview-only",
    "critical",
    "Synthetic runner skeleton remains a placeholder and cannot advance toward execution.",
    "Runner skeleton review notes and fixture-only posture evidence.",
    "Carry skeleton review posture forward without enabling any runner path.",
    "Keep the synthetic runner skeleton gate blocked.",
  ),
  createGateFailureSeed(
    "result-envelope-gate",
    "result envelope gate failure",
    "held / result envelope preview-only",
    "high",
    "The result envelope remains static placeholder evidence and never becomes a received provider response.",
    "Reviewed placeholder result envelope and no-output evidence.",
    "Keep the result envelope placeholder-only and document the hold.",
    "Keep the result envelope gate blocked.",
  ),
  createGateFailureSeed(
    "result-capture-contract-gate",
    "result capture contract gate failure",
    "held / result capture contract preview-only",
    "high",
    "Result capture contract posture remains preview-only and cannot store packet output.",
    "Reviewed capture contract references and no-capture evidence.",
    "Carry capture blockers into the next batch without persisting anything.",
    "Keep the result capture contract gate blocked.",
  ),
  createGateFailureSeed(
    "result-capture-review-gate",
    "result capture review gate failure",
    "held / result capture review preview-only",
    "high",
    "Result capture review remains held because response and error states both remain not received.",
    "Capture review notes covering held packet response and error posture.",
    "Preserve held capture review as inert evidence only.",
    "Keep the result capture review gate blocked.",
  ),
  createGateFailureSeed(
    "audit-approval-join-contract-gate",
    "audit approval join contract gate failure",
    "held / audit approval join contract preview-only",
    "high",
    "Audit and approval join contracts remain preview-only and cannot create persisted references.",
    "Reviewed join contract references and blocked persistence evidence.",
    "Carry join contract blockers into the manual approval handoff contract.",
    "Keep the audit approval join contract gate blocked.",
  ),
  createGateFailureSeed(
    "audit-approval-join-review-gate",
    "audit approval join review gate failure",
    "held / audit approval join review preview-only",
    "critical",
    "Audit and approval join review remains held and cannot resolve the packet into acceptance or recovery completion.",
    "Reviewed join review notes, held decisions, and manual recovery posture.",
    "Preserve held join review posture for the next batch.",
    "Keep the audit approval join review gate blocked.",
  ),
  createGateFailureSeed(
    "evidence-packet-gate",
    "evidence packet gate failure",
    "held / evidence packet preview-only",
    "high",
    "Evidence packets stay preview-only and cannot be persisted or accepted.",
    "Reviewed evidence packet references and redaction notes.",
    "Carry evidence packet review into the next batch without persisting anything.",
    "Keep the evidence packet gate blocked.",
  ),
  createGateFailureSeed(
    "operator-approval-gate",
    "operator approval gate failure",
    "held / operator approval missing",
    "critical",
    "Operator approval remains required before any future manual handoff contract can be accepted.",
    "Explicit operator approval evidence and hold notes.",
    "Require operator approval in the next batch without bypassing review posture.",
    "Keep the operator approval gate blocked.",
  ),
  createGateFailureSeed(
    "manual-confirmation-gate",
    "manual confirmation gate failure",
    "held / manual confirmation missing",
    "critical",
    "Manual confirmation remains required and prevents any autonomous packet handoff.",
    "Manual confirmation evidence showing no autonomous acceptance path exists.",
    "Carry manual confirmation requirements into the next batch.",
    "Keep the manual confirmation gate blocked.",
  ),
  createGateFailureSeed(
    "kill-switch-gate",
    "kill switch gate failure",
    "held / kill switch review required",
    "critical",
    "Kill switch review is still required before any future backend-owned execution path can exist.",
    "Kill switch review notes showing execution remains blocked by default.",
    "Preserve kill switch requirements in the manual approval handoff contract.",
    "Keep the kill switch gate blocked.",
  ),
  createGateFailureSeed(
    "audit-gate",
    "audit gate failure",
    "held / audit evidence missing",
    "high",
    "Audit review is still required and audit evidence remains preview-only.",
    "Reviewed audit evidence requirements and non-persistent audit posture.",
    "Carry audit review requirements forward without creating audit writes.",
    "Keep the audit gate blocked.",
  ),
  createGateFailureSeed(
    "server-only-boundary-gate",
    "server-only boundary gate failure",
    "held / server-only boundary required",
    "critical",
    "The packet must remain backend-owned and server-only, so any frontend execution path stays blocked.",
    "Reviewed server-only boundary notes and blocked frontend posture.",
    "Preserve server-only ownership in the next batch.",
    "Keep the server-only boundary gate blocked.",
  ),
  createGateFailureSeed(
    "opaque-credential-gate",
    "opaque credential gate failure",
    "held / opaque credential references only",
    "critical",
    "Credential posture remains opaque references only, so no plaintext secrets or live credential reads exist.",
    "Reviewed opaque credential labels and no-secret posture.",
    "Carry opaque credential posture into the next batch with no frontend secret access.",
    "Keep the opaque credential gate blocked.",
  ),
  createGateFailureSeed(
    "privacy-redaction-gate",
    "privacy/redaction gate failure",
    "held / privacy redaction review incomplete",
    "high",
    "Privacy and redaction review remain incomplete, so packet acceptance stays held.",
    "Reviewed redaction notes and privacy blockers for held packet content.",
    "Preserve privacy review requirements in the manual approval handoff contract.",
    "Keep the privacy/redaction gate blocked.",
  ),
  createGateFailureSeed(
    "cost-rate-timeout-gate",
    "cost/rate/timeout gate failure",
    "held / cost rate timeout review incomplete",
    "high",
    "Cost, rate limit, timeout, and cancel posture remain manual review items and keep the packet held.",
    "Reviewed cost, rate, timeout, and cancel guard notes.",
    "Carry operational guard requirements into the next batch.",
    "Keep the cost/rate/timeout gate blocked.",
  ),
  createGateFailureSeed(
    "idempotency-replay-gate",
    "idempotency/replay gate failure",
    "held / idempotency replay block not proven",
    "critical",
    "Idempotency and replay protections remain unproven, so the packet cannot be accepted for any future handoff.",
    "Reviewed idempotency, replay-block, and deterministic run notes.",
    "Carry idempotency and replay requirements into the next batch.",
    "Keep the idempotency/replay gate blocked.",
  ),
  createGateFailureSeed(
    "single-run-lock-gate",
    "single-run lock gate failure",
    "held / single-run lock missing",
    "critical",
    "Single-run lock evidence remains missing, so the packet cannot claim deterministic admission or execution posture.",
    "Reviewed single-run lock requirements and held execution notes.",
    "Carry the single-run lock requirement into the next batch.",
    "Keep the single-run lock gate blocked.",
  ),
  createGateFailureSeed(
    "result-persistence-gate",
    "result persistence gate failure",
    "held / result persistence not implemented",
    "critical",
    "Result persistence is not implemented, so no result reference can be stored.",
    "Reviewed result persistence blockers and no-storage posture.",
    "Keep result persistence out of scope for the next batch.",
    "Keep the result persistence gate blocked.",
  ),
  createGateFailureSeed(
    "audit-persistence-gate",
    "audit persistence gate failure",
    "held / audit persistence not implemented",
    "critical",
    "Audit persistence is not implemented, so no audit record can be stored.",
    "Reviewed audit persistence blockers and no-audit-write posture.",
    "Keep audit persistence out of scope for the next batch.",
    "Keep the audit persistence gate blocked.",
  ),
  createGateFailureSeed(
    "approval-persistence-gate",
    "approval persistence gate failure",
    "held / approval persistence not implemented",
    "critical",
    "Approval persistence is not implemented, so no approval record can be stored.",
    "Reviewed approval persistence blockers and no-approval-write posture.",
    "Keep approval persistence out of scope for the next batch.",
    "Keep the approval persistence gate blocked.",
  ),
  createGateFailureSeed(
    "database-write-gate",
    "database write gate failure",
    "held / database write not implemented",
    "critical",
    "Database writes are not implemented, so packet review remains non-persistent by design.",
    "Reviewed database-write blockers and no-storage posture.",
    "Preserve the no-database-write boundary in the next batch.",
    "Keep the database write gate blocked.",
  ),
  createGateFailureSeed(
    "file-write-gate",
    "file write gate failure",
    "held / file write not implemented",
    "critical",
    "File writes are not implemented, so packet review cannot emit files or artifacts.",
    "Reviewed file-write blockers and no-artifact-write posture.",
    "Preserve the no-file-write boundary in the next batch.",
    "Keep the file write gate blocked.",
  ),
  createGateFailureSeed(
    "queue-dispatch-gate",
    "queue dispatch gate failure",
    "held / queue dispatch blocked",
    "critical",
    "Queue dispatch remains blocked, so the packet cannot schedule work.",
    "Reviewed queue dispatch blockers and blocked orchestration posture.",
    "Keep queues out of scope for the next batch.",
    "Keep the queue dispatch gate blocked.",
  ),
  createGateFailureSeed(
    "worker-dispatch-gate",
    "worker dispatch gate failure",
    "held / worker dispatch blocked",
    "critical",
    "Worker dispatch remains blocked, so the packet cannot hand off any execution.",
    "Reviewed worker dispatch blockers and blocked worker posture.",
    "Keep workers out of scope for the next batch.",
    "Keep the worker dispatch gate blocked.",
  ),
  createGateFailureSeed(
    "job-execution-gate",
    "job execution gate failure",
    "held / job execution blocked",
    "critical",
    "Job execution remains blocked, so the packet cannot become runnable.",
    "Reviewed job execution blockers and no-execution posture.",
    "Keep jobs out of scope for the next batch.",
    "Keep the job execution gate blocked.",
  ),
] as const satisfies readonly GateFailureSeed[];

const RECOVERY_READINESS_CHECKLIST_SEEDS = [
  createRecoveryReadinessChecklistSeed(
    "run-intent-reviewed",
    "run intent reviewed",
    "manual review required",
    "high",
    "A reviewed run intent reference and held packet-request evidence.",
    "Carry held run intent evidence into the manual approval handoff contract.",
    "operator",
    "Keep run intent review local and preview-only.",
  ),
  createRecoveryReadinessChecklistSeed(
    "approval-packet-reviewed",
    "approval packet reviewed",
    "manual review required",
    "high",
    "A reviewed approval packet digest and operator hold notes.",
    "Carry approval blockers into the manual approval handoff contract.",
    "operator",
    "Keep approval packet review held.",
  ),
  createRecoveryReadinessChecklistSeed(
    "manual-admission-reviewed",
    "manual admission reviewed",
    "manual review required",
    "critical",
    "Manual admission review showing the packet remains not admitted.",
    "Carry manual admission blockers into the next batch.",
    "operator",
    "Keep manual admission blocked.",
  ),
  createRecoveryReadinessChecklistSeed(
    "backend-admission-contract-reviewed",
    "backend admission contract reviewed",
    "backend future required",
    "critical",
    "Backend admission contract evidence proving server-only ownership remains required.",
    "Carry backend admission requirements into the manual approval handoff contract.",
    "backend future",
    "Keep backend admission contract review preview-only.",
  ),
  createRecoveryReadinessChecklistSeed(
    "dry-run-runner-contract-reviewed",
    "dry-run runner contract reviewed",
    "backend future required",
    "critical",
    "Runner contract references showing invocation remains blocked.",
    "Carry runner contract blockers into the next batch.",
    "backend future",
    "Keep runner contract review non-runnable.",
  ),
  createRecoveryReadinessChecklistSeed(
    "synthetic-runner-skeleton-reviewed",
    "synthetic runner skeleton reviewed",
    "backend future required",
    "critical",
    "Runner skeleton review evidence showing placeholder-only posture.",
    "Carry runner skeleton posture into the next batch.",
    "backend future",
    "Keep runner skeleton review static.",
  ),
  createRecoveryReadinessChecklistSeed(
    "result-capture-contract-reviewed",
    "result capture contract reviewed",
    "manual review required",
    "high",
    "Result capture contract references and no-capture evidence.",
    "Carry capture blockers into the manual approval handoff contract.",
    "operator",
    "Keep result capture contract blocked.",
  ),
  createRecoveryReadinessChecklistSeed(
    "result-capture-review-reviewed",
    "result capture review reviewed",
    "manual review required",
    "high",
    "Result capture review notes explaining why nothing is captured.",
    "Carry held capture review notes into the next batch.",
    "operator",
    "Keep result capture review held.",
  ),
  createRecoveryReadinessChecklistSeed(
    "audit-approval-join-contract-reviewed",
    "audit approval join contract reviewed",
    "manual review required",
    "high",
    "Audit/approval join contract references and non-persistent posture evidence.",
    "Carry audit/approval join contract blockers into the next batch.",
    "operator",
    "Keep audit/approval join contract review held.",
  ),
  createRecoveryReadinessChecklistSeed(
    "audit-approval-join-review-reviewed",
    "audit approval join review reviewed",
    "manual review required",
    "critical",
    "Audit/approval join review notes explaining why recovery remains held.",
    "Carry audit/approval review blockers into the manual approval handoff contract.",
    "operator",
    "Keep audit/approval join review held.",
  ),
  createRecoveryReadinessChecklistSeed(
    "evidence-packet-reviewed",
    "evidence packet reviewed",
    "manual review required",
    "high",
    "Evidence packet references, redaction notes, and blocked persistence evidence.",
    "Carry evidence packet review into the next batch without persisting it.",
    "operator",
    "Keep evidence packet preview-only.",
  ),
  createRecoveryReadinessChecklistSeed(
    "lineage-reviewed",
    "lineage reviewed",
    "manual review required",
    "high",
    "Lineage references linking run intent, admission, runner, result, audit, approval, and evidence.",
    "Carry lineage references into the next batch without writing them anywhere.",
    "operator",
    "Keep lineage review preview-only.",
  ),
  createRecoveryReadinessChecklistSeed(
    "stage-contract-reviewed",
    "stage contract reviewed",
    "manual review required",
    "high",
    "Stage contract review notes covering held stage transitions.",
    "Carry stage blockers into the next batch.",
    "operator",
    "Keep stage contract review held.",
  ),
  createRecoveryReadinessChecklistSeed(
    "packet-request-contract-reviewed",
    "packet request contract reviewed",
    "manual review required",
    "high",
    "Packet request contract evidence showing request remains not created.",
    "Carry the no-request-created posture into the next batch.",
    "operator",
    "Keep packet request posture unchanged.",
  ),
  createRecoveryReadinessChecklistSeed(
    "packet-response-contract-reviewed",
    "packet response contract reviewed",
    "manual review required",
    "high",
    "Packet response contract evidence showing response remains not received.",
    "Carry the no-response posture into the next batch.",
    "operator",
    "Keep packet response posture unchanged.",
  ),
  createRecoveryReadinessChecklistSeed(
    "packet-error-contract-reviewed",
    "packet error contract reviewed",
    "manual review required",
    "medium",
    "Packet error contract evidence showing error remains not received.",
    "Carry the no-error posture into the next batch.",
    "operator",
    "Keep packet error posture unchanged.",
  ),
  createRecoveryReadinessChecklistSeed(
    "packet-gates-reviewed",
    "packet gates reviewed",
    "manual review required",
    "critical",
    "Gate review notes covering blocked safety, persistence, and execution boundaries.",
    "Carry all blocked packet gates into the next batch.",
    "operator",
    "Keep packet gates blocked.",
  ),
  createRecoveryReadinessChecklistSeed(
    "packet-readiness-matrix-reviewed",
    "packet readiness matrix reviewed",
    "manual review required",
    "high",
    "Readiness matrix evidence showing the packet remains not executable and not persistent.",
    "Carry readiness posture into the manual approval handoff contract.",
    "operator",
    "Keep readiness at review-only.",
  ),
  createRecoveryReadinessChecklistSeed(
    "packet-acceptance-posture-reviewed",
    "packet acceptance posture reviewed",
    "manual review required",
    "high",
    "Acceptance posture evidence showing acceptance remains not accepted / preview-only.",
    "Carry acceptance blockers into the next batch.",
    "operator",
    "Keep acceptance posture held.",
  ),
  createRecoveryReadinessChecklistSeed(
    "privacy-redaction-reviewed",
    "privacy/redaction reviewed",
    "manual review required",
    "high",
    "Privacy and redaction notes showing the review remains incomplete.",
    "Carry privacy/redaction blockers into the next batch.",
    "safety review",
    "Keep privacy review open.",
  ),
  createRecoveryReadinessChecklistSeed(
    "cost-rate-reviewed",
    "cost/rate reviewed",
    "manual review required",
    "high",
    "Cost and rate-limit guard evidence for a future backend-owned handoff.",
    "Carry cost/rate guard posture into the next batch.",
    "operator",
    "Keep cost/rate review open.",
  ),
  createRecoveryReadinessChecklistSeed(
    "timeout-cancel-reviewed",
    "timeout/cancel reviewed",
    "manual review required",
    "high",
    "Timeout and cancel guard evidence for a future backend-owned handoff.",
    "Carry timeout/cancel guard posture into the next batch.",
    "operator",
    "Keep timeout/cancel review open.",
  ),
  createRecoveryReadinessChecklistSeed(
    "idempotency-replay-reviewed",
    "idempotency/replay reviewed",
    "backend future required",
    "critical",
    "Idempotency and replay-block evidence for a future backend-owned packet.",
    "Carry idempotency and replay requirements into the next batch.",
    "backend future",
    "Keep idempotency/replay review open.",
  ),
  createRecoveryReadinessChecklistSeed(
    "single-run-lock-reviewed",
    "single-run lock reviewed",
    "backend future required",
    "critical",
    "Single-run lock evidence for deterministic backend-owned packet handling.",
    "Carry single-run lock requirements into the next batch.",
    "backend future",
    "Keep single-run lock review open.",
  ),
  createRecoveryReadinessChecklistSeed(
    "result-persistence-still-blocked",
    "result persistence still blocked",
    "blocked",
    "critical",
    "Result persistence evidence confirming nothing is stored.",
    "Keep result persistence out of scope for the next batch.",
    "backend future",
    "Leave result persistence blocked.",
  ),
  createRecoveryReadinessChecklistSeed(
    "audit-persistence-still-blocked",
    "audit persistence still blocked",
    "blocked",
    "critical",
    "Audit persistence evidence confirming no audit writes exist.",
    "Keep audit persistence out of scope for the next batch.",
    "backend future",
    "Leave audit persistence blocked.",
  ),
  createRecoveryReadinessChecklistSeed(
    "approval-persistence-still-blocked",
    "approval persistence still blocked",
    "blocked",
    "critical",
    "Approval persistence evidence confirming no approval writes exist.",
    "Keep approval persistence out of scope for the next batch.",
    "backend future",
    "Leave approval persistence blocked.",
  ),
  createRecoveryReadinessChecklistSeed(
    "database-writes-still-blocked",
    "database writes still blocked",
    "blocked",
    "critical",
    "Database boundary evidence confirming no writes are implemented.",
    "Keep database writes out of scope for the next batch.",
    "backend future",
    "Leave database writes blocked.",
  ),
  createRecoveryReadinessChecklistSeed(
    "file-writes-still-blocked",
    "file writes still blocked",
    "blocked",
    "critical",
    "File boundary evidence confirming no writes are implemented.",
    "Keep file writes out of scope for the next batch.",
    "backend future",
    "Leave file writes blocked.",
  ),
  createRecoveryReadinessChecklistSeed(
    "queue-dispatch-still-blocked",
    "queue dispatch still blocked",
    "blocked",
    "critical",
    "Queue boundary evidence confirming no dispatch path exists.",
    "Keep queue dispatch out of scope for the next batch.",
    "backend future",
    "Leave queue dispatch blocked.",
  ),
  createRecoveryReadinessChecklistSeed(
    "worker-dispatch-still-blocked",
    "worker dispatch still blocked",
    "blocked",
    "critical",
    "Worker boundary evidence confirming no dispatch path exists.",
    "Keep worker dispatch out of scope for the next batch.",
    "backend future",
    "Leave worker dispatch blocked.",
  ),
  createRecoveryReadinessChecklistSeed(
    "job-execution-still-blocked",
    "job execution still blocked",
    "blocked",
    "critical",
    "Job boundary evidence confirming no runnable job path exists.",
    "Keep job execution out of scope for the next batch.",
    "backend future",
    "Leave job execution blocked.",
  ),
] as const satisfies readonly RecoveryReadinessChecklistSeed[];

const END_TO_END_PACKET_CONTRACTS =
  listBackendOwnedSyntheticDryRunEndToEndPacketContracts();
const END_TO_END_PACKET_STAGE_RECORDS = listSyntheticEndToEndPacketStageRecords();
const END_TO_END_PACKET_LINEAGE_RECORDS =
  listSyntheticEndToEndPacketLineageRecords();
const END_TO_END_PACKET_REQUEST_CONTRACTS =
  listSyntheticEndToEndPacketRequestContracts();
const END_TO_END_PACKET_RESPONSE_CONTRACTS =
  listSyntheticEndToEndPacketResponseContracts();
const END_TO_END_PACKET_ERROR_CONTRACTS = listSyntheticEndToEndPacketErrorContracts();
const END_TO_END_PACKET_GATE_RECORDS = listSyntheticEndToEndPacketGateRecords();
const END_TO_END_PACKET_READINESS_RECORDS =
  listSyntheticEndToEndPacketReadinessMatrixRecords();
const END_TO_END_PACKET_ACCEPTANCE_RECORDS =
  listSyntheticEndToEndPacketAcceptancePostureRecords();

const END_TO_END_PACKET_LINEAGE_BY_ID = new Map(
  END_TO_END_PACKET_LINEAGE_RECORDS.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_REQUEST_BY_ID = new Map(
  END_TO_END_PACKET_REQUEST_CONTRACTS.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_RESPONSE_BY_ID = new Map(
  END_TO_END_PACKET_RESPONSE_CONTRACTS.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_ERROR_BY_ID = new Map(
  END_TO_END_PACKET_ERROR_CONTRACTS.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_READINESS_BY_ID = new Map(
  END_TO_END_PACKET_READINESS_RECORDS.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_ACCEPTANCE_BY_ID = new Map(
  END_TO_END_PACKET_ACCEPTANCE_RECORDS.map((record) => [record.id, record] as const)
);
const END_TO_END_PACKET_STAGE_RECORDS_BY_PACKET_ID = new Map<
  EndToEndPacketContractId,
  EndToEndPacketStageContractRecord[]
>();

for (const record of END_TO_END_PACKET_STAGE_RECORDS) {
  const records = END_TO_END_PACKET_STAGE_RECORDS_BY_PACKET_ID.get(
    record.packetContractId
  );

  if (records) {
    records.push(record);
  } else {
    END_TO_END_PACKET_STAGE_RECORDS_BY_PACKET_ID.set(record.packetContractId, [
      record,
    ]);
  }
}

const DEFAULT_SOURCE_GATE_RECORD = resolveRequiredRecord(
  END_TO_END_PACKET_GATE_RECORDS.find(
    (record) => record.id === "audit-approval-join-review-gate"
  ),
  "Missing default end-to-end packet gate review record.",
);

const STAGE_FAILURE_LABELS_BY_ID = new Map(
  STAGE_FAILURE_SEEDS.map((seed) => [seed.id, seed.label] as const)
);
const GATE_FAILURE_LABELS_BY_ID = new Map(
  GATE_FAILURE_SEEDS.map((seed) => [seed.id, seed.label] as const)
);

function resolveRequiredRecord<T>(record: T | undefined, message: string): T {
  if (!record) {
    throw new Error(message);
  }

  return record;
}

function resolveRepresentativeStageKey(
  packetContractId: EndToEndPacketContractId
): EndToEndPacketStageContractRecord["key"] {
  const stageRecords =
    END_TO_END_PACKET_STAGE_RECORDS_BY_PACKET_ID.get(packetContractId) ?? [];

  const finalStageRecord =
    stageRecords.find((record) => record.stageId === "final-end-to-end-packet-stage") ??
    stageRecords[0];

  return resolveRequiredRecord(
    finalStageRecord,
    `Missing end-to-end packet stage records for ${packetContractId}.`
  ).key;
}

function mapStageLabels(
  stageIds: readonly EndToEndPacketStageFailureId[]
): readonly EndToEndPacketStageFailureLabel[] {
  return stageIds.map((stageId) =>
    resolveRequiredRecord(
      STAGE_FAILURE_LABELS_BY_ID.get(stageId),
      `Missing stage failure label for ${stageId}.`
    )
  );
}

function mapGateLabels(
  gateIds: readonly EndToEndPacketGateFailureId[]
): readonly EndToEndPacketGateFailureLabel[] {
  return gateIds.map((gateId) =>
    resolveRequiredRecord(
      GATE_FAILURE_LABELS_BY_ID.get(gateId),
      `Missing gate failure label for ${gateId}.`
    )
  );
}

function buildOperatorRequestPhrase(
  contract: BackendOwnedSyntheticDryRunEndToEndPacketContractRecord
): string {
  return `Review why the ${contract.requestLabel} synthetic dry-run end-to-end packet remains held.`;
}

export function buildStableEndToEndPacketReviewKey(
  reviewId: EndToEndPacketReviewId
): EndToEndPacketReviewKey {
  return `backend-owned-synthetic-dry-run-end-to-end-packet-review:${reviewId}`;
}

export function buildStableEndToEndPacketDecisionReviewKey(
  reviewId: EndToEndPacketReviewId
): EndToEndPacketDecisionReviewKey {
  return `backend-owned-synthetic-dry-run-end-to-end-packet-decision-review:${reviewId}`;
}

export function buildStableEndToEndPacketStageFailureReviewKey(
  reviewId: EndToEndPacketReviewId,
  failedStageId: EndToEndPacketStageFailureId
): EndToEndPacketStageFailureReviewKey {
  return `backend-owned-synthetic-dry-run-end-to-end-packet-stage-failure-review:${reviewId}:${failedStageId}`;
}

export function buildStableEndToEndPacketGateFailureReviewKey(
  reviewId: EndToEndPacketReviewId,
  failedGateId: EndToEndPacketGateFailureId
): EndToEndPacketGateFailureReviewKey {
  return `backend-owned-synthetic-dry-run-end-to-end-packet-gate-failure-review:${reviewId}:${failedGateId}`;
}

export function buildStableEndToEndPacketRecoveryPlanKey(
  reviewId: EndToEndPacketReviewId
): EndToEndPacketRecoveryPlanKey {
  return `backend-owned-synthetic-dry-run-end-to-end-packet-recovery-plan:${reviewId}`;
}

export function buildStableEndToEndPacketRecoveryReadinessChecklistKey(
  reviewId: EndToEndPacketReviewId,
  checklistId: EndToEndPacketRecoveryReadinessChecklistId
): EndToEndPacketRecoveryReadinessChecklistKey {
  return `backend-owned-synthetic-dry-run-end-to-end-packet-recovery-readiness:${reviewId}:${checklistId}`;
}

export function buildStableEndToEndPacketReviewAuditSummaryKey(
  reviewId: EndToEndPacketReviewId
): EndToEndPacketReviewAuditSummaryKey {
  return `backend-owned-synthetic-dry-run-end-to-end-packet-review-audit-summary:${reviewId}`;
}

export function buildStableEndToEndPacketAcceptancePostureKey(
  reviewId: EndToEndPacketReviewId
): EndToEndPacketAcceptancePostureKey {
  return `backend-owned-synthetic-dry-run-end-to-end-packet-acceptance-posture:${reviewId}`;
}

function buildReviewRecord(
  contract: BackendOwnedSyntheticDryRunEndToEndPacketContractRecord
): BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord {
  const lineage = resolveRequiredRecord(
    END_TO_END_PACKET_LINEAGE_BY_ID.get(contract.id),
    `Missing end-to-end packet lineage record for ${contract.id}.`
  );
  const requestContract = resolveRequiredRecord(
    END_TO_END_PACKET_REQUEST_BY_ID.get(contract.id),
    `Missing end-to-end packet request contract for ${contract.id}.`
  );
  const responseContract = resolveRequiredRecord(
    END_TO_END_PACKET_RESPONSE_BY_ID.get(contract.id),
    `Missing end-to-end packet response contract for ${contract.id}.`
  );
  const errorContract = resolveRequiredRecord(
    END_TO_END_PACKET_ERROR_BY_ID.get(contract.id),
    `Missing end-to-end packet error contract for ${contract.id}.`
  );
  const readinessRecord = resolveRequiredRecord(
    END_TO_END_PACKET_READINESS_BY_ID.get(contract.id),
    `Missing end-to-end packet readiness record for ${contract.id}.`
  );
  const acceptanceRecord = resolveRequiredRecord(
    END_TO_END_PACKET_ACCEPTANCE_BY_ID.get(contract.id),
    `Missing end-to-end packet acceptance record for ${contract.id}.`
  );

  return {
    id: contract.id,
    key: buildStableEndToEndPacketReviewKey(contract.id),
    reviewVersion:
      "backend-owned-synthetic-dry-run-end-to-end-packet-review-preview-v1",
    previewOnlyStatement: "end-to-end packet review is preview-only",
    source: contract.source,
    reviewMode: "preview-only",
    reviewPosture: "end-to-end packet review / not executable / not persistent",
    requestLabel: contract.requestLabel,
    label: `Backend-owned synthetic dry-run ${contract.requestLabel} end-to-end packet review`,
    operatorRequestPhrase: buildOperatorRequestPhrase(contract),
    workspaceTarget: contract.workspaceTarget,
    sourceEndToEndPacketContractReference: contract.key,
    sourceEndToEndStageContractReference: resolveRepresentativeStageKey(contract.id),
    sourceEndToEndLineageReference: lineage.key,
    sourceEndToEndPacketRequestReference: requestContract.key,
    sourceEndToEndPacketResponseReference: responseContract.key,
    sourceEndToEndPacketErrorReference: errorContract.key,
    sourceEndToEndPacketGateReference: DEFAULT_SOURCE_GATE_RECORD.key,
    sourceEndToEndPacketReadinessReference: readinessRecord.key,
    sourceEndToEndPacketAcceptanceReference: acceptanceRecord.key,
    sourceRunIntentReference: contract.sourceRunIntentReference,
    sourceApprovalPacketReference: contract.sourceApprovalPacketReference,
    sourceAdmissionContractReference: contract.sourceBackendAdmissionContractReference,
    sourceDryRunRunnerContractReference: contract.sourceDryRunRunnerContractReference,
    sourceSyntheticRunnerSkeletonReference: contract.sourceSyntheticRunnerSkeletonReference,
    sourceResultCaptureReviewReference: contract.sourceResultCaptureReviewReference,
    sourceAuditApprovalJoinReviewReference:
      contract.sourceAuditApprovalJoinReviewReference,
    selectedCapabilityFamily: contract.selectedCapabilityFamily,
    providerSlotLabel: contract.providerSlotLabel,
    backupProviderSlotLabel: contract.backupProviderSlotLabel,
    localPrivateAlternativeLabel: contract.localPrivateAlternativeLabel,
    packetState: contract.packetState,
    packetRequestState: contract.packetRequestState,
    packetInvocationState: contract.packetInvocationState,
    packetResponseState: responseContract.responseState,
    packetErrorState: errorContract.errorState,
    packetDecisionState: "held / not accepted",
    packetAcceptanceState: responseContract.packetAcceptanceState,
    admissionState: contract.admissionState,
    admissionTokenState: contract.admissionTokenState,
    admissionLeaseState: contract.admissionLeaseState,
    dryRunRequestState: contract.dryRunRequestState,
    runnerInvocationState: contract.runnerInvocationState,
    dryRunExecutionState: contract.dryRunExecutionState,
    providerResponseState: contract.providerResponseState,
    modelOutputState: contract.modelOutputState,
    syntheticFixtureResultState: contract.syntheticFixtureResultState,
    resultCaptureState: contract.resultCaptureState,
    resultPersistenceState: contract.resultPersistenceState,
    auditJoinState: contract.auditJoinState,
    approvalJoinState: contract.approvalJoinState,
    resultReferenceState: contract.resultReferenceState,
    evidencePacketState: contract.evidencePacketState,
    auditEnvelopeState: contract.auditEnvelopeState,
    approvalEnvelopeState: contract.approvalEnvelopeState,
    databaseWriteState: contract.databaseWriteState,
    fileWriteState: contract.fileWriteState,
    queueDispatchState: contract.queueDispatchState,
    workerDispatchState: contract.workerDispatchState,
    jobExecutionState: contract.jobExecutionState,
    providerCallPosture: contract.providerCallPosture,
    modelCallPosture: contract.modelCallPosture,
    promptSendingPosture: contract.promptSendingPosture,
    sdkPosture: contract.sdkPosture,
    credentialPosture: contract.credentialPosture,
    secretPosture: contract.secretPosture,
    frontendPosture: contract.frontendPosture,
    backendPosture: contract.backendPosture,
    executionPosture: contract.executionPosture,
    manualOperatorReviewRequired: "manual operator review required",
    manualRecoveryReviewRequired: "manual recovery review required",
    manualApprovalRequired: contract.manualApprovalRequired,
    manualConfirmationRequired: contract.manualConfirmationRequired,
    killSwitchRequired: contract.killSwitchRequired,
    auditRequired: contract.auditRequired,
    privacyRedactionRequired: contract.privacyRedactionRequired,
    costAcknowledgementRequired: contract.costAcknowledgementRequired,
    rateLimitGuardRequired: contract.rateLimitGuardRequired,
    timeoutCancelGuardRequired: contract.timeoutCancelGuardRequired,
    idempotencyRequired: contract.idempotencyRequired,
    replayBlockRequired: contract.replayBlockRequired,
    singleRunLockRequired: contract.singleRunLockRequired,
    noRetryExecution: contract.noRetryExecution,
    noFallbackExecution: contract.noFallbackExecution,
    nextManualApprovalHandoffContractRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    blockedDefaultReason: `${contract.blockedDefaultReason} Packet review remains held until the manual approval handoff contract is defined.`,
    nextSafeAction:
      "manual approval handoff contract comes next. Keep packet review preview-only and non-persistent.",
    currentReadiness:
      "end-to-end-packet-review-only / not executable / not persistent",
  };
}

const REVIEW_RECORDS = END_TO_END_PACKET_CONTRACTS.map(buildReviewRecord);
const REVIEW_RECORDS_BY_ID = new Map(REVIEW_RECORDS.map((record) => [record.id, record] as const));

function buildDecisionReviewRecord(
  review: BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord
): EndToEndPacketDecisionReviewRecord {
  const decisionSeed = resolveRequiredRecord(
    DECISION_SEEDS[review.id],
    `Missing end-to-end packet decision seed for ${review.id}.`
  );

  return {
    id: review.id,
    key: buildStableEndToEndPacketDecisionReviewKey(review.id),
    decisionReviewVersion:
      "backend-owned-synthetic-dry-run-end-to-end-packet-decision-review-preview-v1",
    previewOnlyStatement: "packet decision review is preview-only",
    endToEndPacketReviewId: review.id,
    sourcePacketContractReference: review.sourceEndToEndPacketContractReference,
    sourceStageContractReference: review.sourceEndToEndStageContractReference,
    sourceLineageReference: review.sourceEndToEndLineageReference,
    sourceRequestReference: review.sourceEndToEndPacketRequestReference,
    sourceResponseReference: review.sourceEndToEndPacketResponseReference,
    sourceErrorReference: review.sourceEndToEndPacketErrorReference,
    decisionState: "held / not accepted",
    packetReasonSummary: decisionSeed.packetReasonSummary,
    topBlockingStages: mapStageLabels(decisionSeed.topBlockingStageIds),
    topBlockingGates: mapGateLabels(decisionSeed.topBlockingGateIds),
    topMissingEvidence: decisionSeed.topMissingEvidence,
    operatorReviewNotes: decisionSeed.operatorReviewNotes,
    manualRecoveryRequirement: decisionSeed.manualRecoveryRequirement,
    manualApprovalHandoffDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    nextSafeAction: decisionSeed.nextSafeAction,
    explicitNoEndToEndPacketExecutionNoPersistenceStatement:
      "No end-to-end packet execution. No persistence.",
  };
}

const DECISION_REVIEW_RECORDS = REVIEW_RECORDS.map(buildDecisionReviewRecord);

function buildStageFailureReviewRecord(
  review: BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord,
  seed: StageFailureSeed
): EndToEndPacketStageFailureReviewRecord {
  return {
    key: buildStableEndToEndPacketStageFailureReviewKey(review.id, seed.id),
    stageFailureReviewVersion:
      "backend-owned-synthetic-dry-run-end-to-end-packet-stage-failure-review-preview-v1",
    previewOnlyStatement: "packet stage failure review is preview-only",
    endToEndPacketReviewId: review.id,
    failedStageId: seed.id,
    failedStageLabel: seed.label,
    stageState: seed.state,
    severity: seed.severity,
    affectedCapabilityFamily: review.selectedCapabilityFamily,
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation: `${review.requestLabel}: ${seed.operatorFacingExplanation}`,
    requiredEvidenceToUnblock: seed.requiredEvidenceToUnblock,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    manualApprovalHandoffDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
    explicitNoStagePassNoExecutionStatement: "No stage pass. No execution.",
  };
}

const STAGE_FAILURE_REVIEW_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  STAGE_FAILURE_SEEDS.map((seed) => buildStageFailureReviewRecord(review, seed))
);

function buildGateFailureReviewRecord(
  review: BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord,
  seed: GateFailureSeed
): EndToEndPacketGateFailureReviewRecord {
  return {
    key: buildStableEndToEndPacketGateFailureReviewKey(review.id, seed.id),
    gateFailureReviewVersion:
      "backend-owned-synthetic-dry-run-end-to-end-packet-gate-failure-review-preview-v1",
    previewOnlyStatement: "packet gate failure review is preview-only",
    endToEndPacketReviewId: review.id,
    failedGateId: seed.id,
    failedGateLabel: seed.label,
    gateState: seed.state,
    severity: seed.severity,
    affectedCapabilityFamily: review.selectedCapabilityFamily,
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation: `${review.requestLabel}: ${seed.operatorFacingExplanation}`,
    requiredEvidenceToUnblock: seed.requiredEvidenceToUnblock,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    manualApprovalHandoffDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
    explicitNoGatePassStatement: "No gate pass is granted.",
  };
}

const GATE_FAILURE_REVIEW_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  GATE_FAILURE_SEEDS.map((seed) => buildGateFailureReviewRecord(review, seed))
);

function buildRecoveryPlanPreviewRecord(
  review: BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord
): EndToEndPacketRecoveryPlanPreviewRecord {
  return {
    id: review.id,
    key: buildStableEndToEndPacketRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-synthetic-dry-run-end-to-end-packet-recovery-plan-preview-v1",
    previewOnlyStatement: "packet recovery plan is preview-only",
    endToEndPacketReviewId: review.id,
    recoveryPosture: "manual review only",
    runIntentRecovery:
      "Review the held run intent reference and keep packet request creation blocked.",
    approvalPacketRecovery:
      "Review the approval packet digest and carry operator approval blockers into the next batch.",
    manualAdmissionRecovery:
      "Review manual admission blockers and preserve not-admitted posture.",
    backendAdmissionRecovery:
      "Carry backend admission contract requirements into the manual approval handoff contract.",
    admissionTokenRecovery:
      "Keep admission token issuance unimplemented and document the blocked state.",
    admissionLeaseRecovery:
      "Keep admission lease creation unimplemented and document the blocked state.",
    runnerContractRecovery:
      "Carry runner contract blockers forward without invoking or dispatching anything.",
    syntheticRunnerSkeletonRecovery:
      "Preserve the synthetic runner skeleton as static placeholder evidence only.",
    resultCaptureRecovery:
      "Keep result capture review-only and do not capture or persist any result.",
    auditJoinRecovery:
      "Keep audit joins preview-only and non-persistent.",
    approvalJoinRecovery:
      "Keep approval joins preview-only and non-persistent.",
    evidencePacketRecovery:
      "Keep the evidence packet preview-only and redactable with no writes.",
    stageConsistencyRecovery:
      "Review stage-to-stage consistency and carry blocked transitions into the next batch.",
    lineageConsistencyRecovery:
      "Review lineage references and preserve non-persistent linkage only.",
    requestNotCreatedRecovery:
      "Keep packet request not created and document why request creation remains blocked.",
    responseNotReceivedRecovery:
      "Keep packet response not received and document why response remains absent.",
    errorNotReceivedRecovery:
      "Keep packet error not received and avoid inventing failure retries.",
    acceptanceUnresolvedRecovery:
      "Keep acceptance unresolved until the manual approval handoff contract is defined.",
    resultPersistenceMissingRecovery:
      "Do not implement result persistence; document the blocked state instead.",
    auditPersistenceMissingRecovery:
      "Do not implement audit persistence; document the blocked state instead.",
    approvalPersistenceMissingRecovery:
      "Do not implement approval persistence; document the blocked state instead.",
    databaseWriteBlockedRecovery:
      "Do not introduce database writes; preserve the blocked boundary.",
    fileWriteBlockedRecovery:
      "Do not introduce file writes; preserve the blocked boundary.",
    queueDispatchBlockedRecovery:
      "Do not introduce queue dispatch; preserve the blocked boundary.",
    workerDispatchBlockedRecovery:
      "Do not introduce worker dispatch; preserve the blocked boundary.",
    jobExecutionBlockedRecovery:
      "Do not introduce job execution; preserve the blocked boundary.",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    operatorActionRequired:
      "The operator must review the held packet and carry only inert references into the next batch.",
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    explicitNoRetryNoFallbackNoExecutionNoPersistenceStatement:
      "No retry. No fallback. No execution. No persistence.",
  };
}

const RECOVERY_PLAN_PREVIEW_RECORDS = REVIEW_RECORDS.map(
  buildRecoveryPlanPreviewRecord
);

function buildRecoveryReadinessChecklistRecord(
  review: BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord,
  seed: RecoveryReadinessChecklistSeed
): EndToEndPacketRecoveryReadinessChecklistRecord {
  return {
    key: buildStableEndToEndPacketRecoveryReadinessChecklistKey(
      review.id,
      seed.checklistId
    ),
    checklistVersion:
      "backend-owned-synthetic-dry-run-end-to-end-packet-recovery-readiness-checklist-v1",
    endToEndPacketReviewId: review.id,
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    manualApprovalHandoffContractDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

const RECOVERY_READINESS_CHECKLIST_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  RECOVERY_READINESS_CHECKLIST_SEEDS.map((seed) =>
    buildRecoveryReadinessChecklistRecord(review, seed)
  )
);

function buildReviewAuditSummaryRecord(
  review: BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord
): EndToEndPacketReviewAuditSummaryRecord {
  const lineage = resolveRequiredRecord(
    END_TO_END_PACKET_LINEAGE_BY_ID.get(review.id),
    `Missing lineage for review audit summary ${review.id}.`
  );
  const stageFailures = STAGE_FAILURE_REVIEW_RECORDS.filter(
    (record) => record.endToEndPacketReviewId === review.id
  );
  const gateFailures = GATE_FAILURE_REVIEW_RECORDS.filter(
    (record) => record.endToEndPacketReviewId === review.id
  );

  return {
    id: review.id,
    key: buildStableEndToEndPacketReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-synthetic-dry-run-end-to-end-packet-review-audit-summary-preview-v1",
    previewOnlyStatement: "packet review audit summary is preview-only",
    endToEndPacketReviewId: review.id,
    auditPosture: "preview-only",
    resultReferenceState: review.resultReferenceState,
    auditReferenceState: lineage.auditReferenceState,
    approvalReferenceState: lineage.approvalReferenceState,
    evidencePacketState: review.evidencePacketState,
    stageEvidenceSummary: stageFailures
      .slice(0, 4)
      .map((record) => record.failedStageLabel)
      .join(" | "),
    lineageEvidenceSummary:
      `${lineage.runIntentReference} | ${lineage.admissionReference} | ${lineage.runnerReference} | ${lineage.resultReference} | ${lineage.auditReference} | ${lineage.approvalReference} | ${lineage.evidencePacketReference}`,
    failedGateSummary: gateFailures
      .slice(0, 5)
      .map((record) => record.failedGateLabel)
      .join(" | "),
    recoverySummary:
      "Recovery is manual review only. Retry disabled. Fallback disabled. Manual approval handoff contract required next.",
    blockedActionSummary:
      "No prompt sending. No model calls. No provider execution. No queue dispatch. No worker dispatch. No job execution.",
    noResultPersistenceStatement: "No result persistence.",
    noAuditPersistenceStatement: "No audit persistence.",
    noApprovalPersistenceStatement: "No approval persistence.",
    noDatabaseWriteStatement: "No database write.",
    noFileWriteStatement: "No file write.",
    manualApprovalHandoffContractRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
  };
}

const REVIEW_AUDIT_SUMMARY_RECORDS = REVIEW_RECORDS.map(
  buildReviewAuditSummaryRecord
);

function buildAcceptancePostureRecord(
  review: BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord,
  acceptanceRecord: EndToEndPacketContractAcceptancePostureRecord
): EndToEndPacketAcceptancePostureRecord {
  return {
    id: review.id,
    key: buildStableEndToEndPacketAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-synthetic-dry-run-end-to-end-packet-acceptance-posture-preview-v1",
    previewOnlyStatement: "packet acceptance posture is preview-only",
    endToEndPacketReviewId: review.id,
    acceptanceState: "not accepted / preview-only",
    runIntentBlockers: acceptanceRecord.runIntentBlockers,
    admissionBlockers: acceptanceRecord.admissionBlockers,
    runnerBlockers: acceptanceRecord.runnerBlockers,
    resultCaptureBlockers: acceptanceRecord.resultCaptureBlockers,
    auditJoinBlockers: acceptanceRecord.auditJoinBlockers,
    approvalJoinBlockers: acceptanceRecord.approvalJoinBlockers,
    evidencePacketBlockers: acceptanceRecord.evidencePacketBlockers,
    stageBlockers: STAGE_FAILURE_SUMMARY_LINES,
    lineageBlockers: [
      `result reference state: ${review.resultReferenceState}`,
      `audit join state: ${review.auditJoinState}`,
      `approval join state: ${review.approvalJoinState}`,
    ],
    safetyBlockers: [
      review.manualOperatorReviewRequired,
      review.manualRecoveryReviewRequired,
      review.manualApprovalRequired,
      review.manualConfirmationRequired,
      review.killSwitchRequired,
      review.auditRequired,
    ],
    privacyBlockers: [
      review.privacyRedactionRequired,
      review.credentialPosture,
      review.secretPosture,
    ],
    costRateBlockers: [
      review.costAcknowledgementRequired,
      review.rateLimitGuardRequired,
      review.timeoutCancelGuardRequired,
      review.idempotencyRequired,
      review.replayBlockRequired,
      review.singleRunLockRequired,
    ],
    persistenceBlockers: acceptanceRecord.persistenceBlockers,
    databaseFileBlockers: [
      `database write is ${review.databaseWriteState}`,
      `file write is ${review.fileWriteState}`,
    ],
    queueWorkerJobBlockers: [
      `queue dispatch is ${review.queueDispatchState}`,
      `worker dispatch is ${review.workerDispatchState}`,
      `job execution is ${review.jobExecutionState}`,
    ],
    requiredEvidence: [
      ...acceptanceRecord.requiredEvidence,
      "Manual approval handoff contract requirement.",
    ],
    nextSafeAction:
      "manual approval handoff contract comes next. Keep acceptance preview-only and not accepted.",
    explicitNoEndToEndAcceptanceNoExecutionStatement:
      "No end-to-end acceptance. No execution.",
  };
}

const ACCEPTANCE_POSTURE_RECORDS = REVIEW_RECORDS.map((review) =>
  buildAcceptancePostureRecord(
    review,
    resolveRequiredRecord(
      END_TO_END_PACKET_ACCEPTANCE_BY_ID.get(review.id),
      `Missing acceptance posture seed for ${review.id}.`
    )
  )
);

export function listBackendOwnedSyntheticDryRunEndToEndPacketReviews():
  readonly BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord[] {
  return REVIEW_RECORDS;
}

export function listEndToEndPacketDecisionReviewRecords():
  readonly EndToEndPacketDecisionReviewRecord[] {
  return DECISION_REVIEW_RECORDS;
}

export function listEndToEndPacketStageFailureReviewRecords():
  readonly EndToEndPacketStageFailureReviewRecord[] {
  return STAGE_FAILURE_REVIEW_RECORDS;
}

export function listEndToEndPacketGateFailureReviewRecords():
  readonly EndToEndPacketGateFailureReviewRecord[] {
  return GATE_FAILURE_REVIEW_RECORDS;
}

export function listEndToEndPacketRecoveryPlanPreviews():
  readonly EndToEndPacketRecoveryPlanPreviewRecord[] {
  return RECOVERY_PLAN_PREVIEW_RECORDS;
}

export function listEndToEndPacketRecoveryReadinessChecklistRecords():
  readonly EndToEndPacketRecoveryReadinessChecklistRecord[] {
  return RECOVERY_READINESS_CHECKLIST_RECORDS;
}

export function listEndToEndPacketReviewAuditSummaries():
  readonly EndToEndPacketReviewAuditSummaryRecord[] {
  return REVIEW_AUDIT_SUMMARY_RECORDS;
}

export function listEndToEndPacketAcceptancePostureRecords():
  readonly EndToEndPacketAcceptancePostureRecord[] {
  return ACCEPTANCE_POSTURE_RECORDS;
}

export function groupEndToEndPacketReviewsByCapabilityFamily():
  readonly EndToEndPacketReviewCapabilityFamilyGroup[] {
  const groups = new Map<
    EndToEndPacketReviewCapabilityFamilyGroup["capabilityFamilyId"],
    BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord[]
  >();

  for (const review of REVIEW_RECORDS) {
    const reviews = groups.get(review.selectedCapabilityFamily.id);

    if (reviews) {
      reviews.push(review);
    } else {
      groups.set(review.selectedCapabilityFamily.id, [review]);
    }
  }

  return Array.from(groups.entries()).map(([capabilityFamilyId, reviews]) => ({
    capabilityFamilyId,
    capabilityFamilyLabel: reviews[0].selectedCapabilityFamily.label,
    reviewCount: reviews.length,
    reviews,
  }));
}

export function groupEndToEndPacketReviewsByWorkspaceTarget():
  readonly EndToEndPacketReviewWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedSyntheticDryRunEndToEndPacketReviewRecord[]
  >();

  for (const review of REVIEW_RECORDS) {
    const reviews = groups.get(review.workspaceTarget);

    if (reviews) {
      reviews.push(review);
    } else {
      groups.set(review.workspaceTarget, [review]);
    }
  }

  return Array.from(groups.entries()).map(([workspaceTarget, reviews]) => ({
    workspaceTarget,
    reviewCount: reviews.length,
    reviews,
  }));
}

export function buildEndToEndPacketReviewSummary():
  EndToEndPacketReviewSummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    reviewCount: REVIEW_RECORDS.length,
    decisionReviewCount: DECISION_REVIEW_RECORDS.length,
    stageFailureCount: STAGE_FAILURE_REVIEW_RECORDS.length,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    auditSummaryCount: REVIEW_AUDIT_SUMMARY_RECORDS.length,
    acceptancePostureCount: ACCEPTANCE_POSTURE_RECORDS.length,
    currentReadiness:
      "end-to-end-packet-review-only / not executable / not persistent",
    summaryLines: REVIEW_SUMMARY_LINES,
  };
}

export function buildEndToEndPacketStageFailureSummary():
  EndToEndPacketStageFailureSummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    stageFailureCount: STAGE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: STAGE_FAILURE_SUMMARY_LINES,
    topFailedStageLabels: STAGE_FAILURE_SUMMARY_LINES,
    nextSafeAction:
      "Keep stage failures review-only and carry the held packet into the manual approval handoff contract.",
  };
}

export function buildEndToEndPacketGateFailureSummary():
  EndToEndPacketGateFailureSummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: GATE_FAILURE_SUMMARY_LINES,
    topFailedGateLabels: GATE_FAILURE_SUMMARY_LINES,
    nextSafeAction:
      "Keep gate failures blocked and carry the held packet into the manual approval handoff contract.",
  };
}

export function buildEndToEndPacketRecoverySummary():
  EndToEndPacketRecoverySummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_REVIEW_RECOVERY_PREVIEW_BATCH,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    summaryLines: RECOVERY_SUMMARY_LINES,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    nextSafeAction:
      "Recovery remains manual review only until the manual approval handoff contract is defined.",
  };
}

export function buildManualApprovalHandoffContractChecklist():
  readonly string[] {
  return MANUAL_APPROVAL_HANDOFF_CONTRACT_CHECKLIST;
}

export function buildUniqueEndToEndPacketReviewDisplayStrings<
  T extends string,
>(values: readonly T[]): readonly T[] {
  return Array.from(new Set(values));
}
