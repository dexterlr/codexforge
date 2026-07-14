import type {
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  listAuditApprovalEvidencePacketPreviews,
  listAuditApprovalJoinErrorContracts,
  listAuditApprovalJoinGateRecords,
  listAuditApprovalJoinReadinessMatrixRecords,
  listAuditApprovalJoinRequestContracts,
  listAuditApprovalJoinResponseContracts,
  listBackendOwnedSyntheticDryRunAuditApprovalJoinContracts,
  listResultAuditApprovalLinkContracts,
  listSyntheticApprovalJoinContracts,
  listSyntheticAuditJoinContracts,
  type AuditApprovalEvidencePacketPreviewRecord,
  type AuditApprovalJoinContractId,
  type AuditApprovalJoinErrorContractRecord,
  type AuditApprovalJoinGateId,
  type AuditApprovalJoinGateRecord,
  type AuditApprovalJoinReadinessMatrixRecord,
  type AuditApprovalJoinRequestContractRecord,
  type AuditApprovalJoinResponseContractRecord,
  type BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord,
  type ResultAuditApprovalLinkContractRecord,
  type SyntheticApprovalJoinContractRecord,
  type SyntheticAuditJoinContractRecord,
} from "../backend-owned-synthetic-dry-run-audit-approval-join-contract";
import {
  listSyntheticResultEnvelopeContracts,
  type SyntheticResultEnvelopeContractRecord,
} from "../backend-owned-synthetic-dry-run-result-capture-contract";
import {
  listBackendOwnedSyntheticDryRunResultCaptureReviews,
  listResultCaptureAcceptancePostureRecords,
  type BackendOwnedSyntheticDryRunResultCaptureReviewRecord,
  type ResultCaptureAcceptancePostureRecord,
} from "../backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
  type AuditApprovalJoinAcceptancePostureKey,
  type AuditApprovalJoinAcceptancePostureRecord,
  type AuditApprovalJoinDecisionReviewKey,
  type AuditApprovalJoinDecisionReviewRecord,
  type AuditApprovalJoinGateFailureId,
  type AuditApprovalJoinGateFailureLabel,
  type AuditApprovalJoinGateFailureReviewKey,
  type AuditApprovalJoinGateFailureReviewRecord,
  type AuditApprovalJoinGateFailureState,
  type AuditApprovalJoinGateFailureSummary,
  type AuditApprovalJoinRecoveryPlanKey,
  type AuditApprovalJoinRecoveryPlanPreviewRecord,
  type AuditApprovalJoinRecoveryReadinessChecklistId,
  type AuditApprovalJoinRecoveryReadinessChecklistKey,
  type AuditApprovalJoinRecoveryReadinessChecklistLabel,
  type AuditApprovalJoinRecoveryReadinessChecklistRecord,
  type AuditApprovalJoinRecoverySummary,
  type AuditApprovalJoinReviewAuditSummaryKey,
  type AuditApprovalJoinReviewAuditSummaryRecord,
  type AuditApprovalJoinReviewCapabilityFamilyGroup,
  type AuditApprovalJoinReviewId,
  type AuditApprovalJoinReviewKey,
  type AuditApprovalJoinReviewSeverity,
  type AuditApprovalJoinReviewSummary,
  type AuditApprovalJoinReviewWorkspaceGroup,
  type BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord,
} from "./backend-owned-synthetic-dry-run-audit-approval-join-review-recovery-preview-types";

type AuditApprovalJoinDecisionSeed = Readonly<{
  topBlockingGateIds: readonly AuditApprovalJoinGateFailureId[];
  topMissingEvidence: readonly string[];
  operatorReviewNotes: readonly string[];
  joinReasonSummary: string;
  manualRecoveryRequirement: string;
  nextSafeAction: string;
}>;

type AuditApprovalJoinGateFailureSeed = Readonly<{
  id: AuditApprovalJoinGateFailureId;
  label: AuditApprovalJoinGateFailureLabel;
  state: AuditApprovalJoinGateFailureState;
  severity: AuditApprovalJoinReviewSeverity;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

type AuditApprovalJoinRecoveryReadinessChecklistSeed = Readonly<{
  checklistId: AuditApprovalJoinRecoveryReadinessChecklistId;
  label: AuditApprovalJoinRecoveryReadinessChecklistLabel;
  state: AuditApprovalJoinRecoveryReadinessChecklistRecord["state"];
  severity: AuditApprovalJoinReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: AuditApprovalJoinRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const REVIEW_SUMMARY_LINES = [
  "backend-owned synthetic dry-run audit and approval join review and recovery preview only",
  "audit and approval join review is preview-only",
  "audit and approval join decision review is preview-only",
  "audit and approval join gate failure review is preview-only",
  "audit and approval join recovery plan is preview-only",
  "audit and approval join recovery readiness is preview-only",
  "audit and approval join acceptance posture is preview-only",
  "audit join state is not persisted",
  "approval join state is not persisted",
  "result reference state is not persisted",
  "evidence packet state is preview-only",
  "join request is not created",
  "join invocation is not invoked",
  "join response is not received",
  "join error is not received",
  "audit envelope state is not created",
  "approval envelope state is not created",
  "audit append state is not appended",
  "approval append state is not appended",
  "audit persistence is not implemented",
  "approval persistence is not implemented",
  "result persistence is not implemented",
  "artifact persistence is not implemented",
  "database write is not implemented",
  "file write is not implemented",
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
  "backend-owned synthetic dry-run end-to-end packet contract next",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "synthetic result envelope gate failure",
  "result capture review gate failure",
  "result capture acceptance posture gate failure",
  "audit join contract gate failure",
  "approval join contract gate failure",
  "result-to-audit-approval link gate failure",
  "join request contract gate failure",
  "join response contract gate failure",
  "join error contract gate failure",
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
  "audit and approval join recovery plan is preview-only",
  "audit and approval join recovery readiness is preview-only",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "missing audit evidence recovery",
  "missing approval evidence recovery",
  "missing result reference recovery",
  "missing evidence packet recovery",
  "join request not created recovery",
  "join response not received recovery",
  "join error not received recovery",
  "audit append not appended recovery",
  "approval append not appended recovery",
  "database/file blocked recovery",
  "backend-owned synthetic dry-run end-to-end packet contract next",
] as const;

const END_TO_END_PACKET_CONTRACT_CHECKLIST = [
  "Review held audit and approval join decisions before defining any end-to-end packet contract.",
  "Carry audit references, approval references, result references, and evidence packet state forward as preview-only and non-persistent.",
  "Keep join request, join response, join error, audit envelope, approval envelope, append state, and persistence paths explicitly unimplemented.",
  "Preserve no prompt sending, no model calls, no provider SDK imports, no provider execution, no queue dispatch, no worker dispatch, and no job execution posture.",
  "Require backend-only packet ownership, server-only adapters, manual approval, manual confirmation, kill switch, privacy/redaction, cost/rate/timeout, idempotency/replay, and single-run lock checks in the next batch.",
] as const;

const JOIN_CONTRACTS =
  listBackendOwnedSyntheticDryRunAuditApprovalJoinContracts();
const SYNTHETIC_AUDIT_JOIN_CONTRACTS = listSyntheticAuditJoinContracts();
const SYNTHETIC_APPROVAL_JOIN_CONTRACTS = listSyntheticApprovalJoinContracts();
const RESULT_AUDIT_APPROVAL_LINK_CONTRACTS =
  listResultAuditApprovalLinkContracts();
const JOIN_REQUEST_CONTRACTS = listAuditApprovalJoinRequestContracts();
const JOIN_RESPONSE_CONTRACTS = listAuditApprovalJoinResponseContracts();
const JOIN_ERROR_CONTRACTS = listAuditApprovalJoinErrorContracts();
const JOIN_GATE_RECORDS = listAuditApprovalJoinGateRecords();
const JOIN_READINESS_RECORDS = listAuditApprovalJoinReadinessMatrixRecords();
const EVIDENCE_PACKET_PREVIEWS = listAuditApprovalEvidencePacketPreviews();
const RESULT_CAPTURE_REVIEWS =
  listBackendOwnedSyntheticDryRunResultCaptureReviews();
const RESULT_CAPTURE_ACCEPTANCE_POSTURES =
  listResultCaptureAcceptancePostureRecords();
const SYNTHETIC_RESULT_ENVELOPES = listSyntheticResultEnvelopeContracts();

const SYNTHETIC_AUDIT_JOIN_CONTRACTS_BY_ID = new Map(
  SYNTHETIC_AUDIT_JOIN_CONTRACTS.map((record) => [record.id, record] as const)
);
const SYNTHETIC_APPROVAL_JOIN_CONTRACTS_BY_ID = new Map(
  SYNTHETIC_APPROVAL_JOIN_CONTRACTS.map((record) => [record.id, record] as const)
);
const RESULT_AUDIT_APPROVAL_LINK_CONTRACTS_BY_ID = new Map(
  RESULT_AUDIT_APPROVAL_LINK_CONTRACTS.map((record) => [record.id, record] as const)
);
const JOIN_REQUEST_CONTRACTS_BY_ID = new Map(
  JOIN_REQUEST_CONTRACTS.map((record) => [record.id, record] as const)
);
const JOIN_RESPONSE_CONTRACTS_BY_ID = new Map(
  JOIN_RESPONSE_CONTRACTS.map((record) => [record.id, record] as const)
);
const JOIN_ERROR_CONTRACTS_BY_ID = new Map(
  JOIN_ERROR_CONTRACTS.map((record) => [record.id, record] as const)
);
const JOIN_GATE_RECORDS_BY_ID = new Map(
  JOIN_GATE_RECORDS.map((record) => [record.id, record] as const)
);
const JOIN_READINESS_RECORDS_BY_ID = new Map(
  JOIN_READINESS_RECORDS.map((record) => [record.id, record] as const)
);
const EVIDENCE_PACKET_PREVIEWS_BY_ID = new Map(
  EVIDENCE_PACKET_PREVIEWS.map((record) => [record.id, record] as const)
);
const RESULT_CAPTURE_REVIEWS_BY_ID = new Map(
  RESULT_CAPTURE_REVIEWS.map((record) => [record.id, record] as const)
);
const RESULT_CAPTURE_ACCEPTANCE_POSTURES_BY_ID = new Map(
  RESULT_CAPTURE_ACCEPTANCE_POSTURES.map((record) => [
    record.resultCaptureReviewId,
    record,
  ] as const)
);
const SYNTHETIC_RESULT_ENVELOPES_BY_ID = new Map(
  SYNTHETIC_RESULT_ENVELOPES.map((record) => [record.id, record] as const)
);

const DECISION_SEEDS = {
  "conversational-planning-request": {
    topBlockingGateIds: [
      "synthetic-result-envelope-gate",
      "join-request-contract-gate",
      "audit-join-contract-gate",
    ],
    topMissingEvidence: [
      "A reviewed planning-lane synthetic result envelope.",
      "A backend-owned join request draft that remains not created.",
      "Manual audit evidence showing why the held planning join must stay non-persistent.",
    ],
    operatorReviewNotes: [
      "Planning remains held while no join request exists.",
      "Audit evidence remains preview-only and non-persistent.",
    ],
    joinReasonSummary:
      "Conversational planning remains held because the synthetic result envelope is preview-only, the join request is not created, and audit joins remain non-persistent.",
    manualRecoveryRequirement:
      "Review planning evidence, audit join posture, and backend-only packet requirements manually before any end-to-end packet contract is drafted.",
    nextSafeAction:
      "Keep the planning lane held and continue preview-only join review.",
  },
  "code-assistance-request": {
    topBlockingGateIds: [
      "join-request-contract-gate",
      "idempotency-replay-gate",
      "single-run-lock-gate",
    ],
    topMissingEvidence: [
      "A code-lane join request contract that remains not created.",
      "Idempotency and replay-block evidence for a future server-only packet.",
      "Single-run lock review for deterministic code assistance joins.",
    ],
    operatorReviewNotes: [
      "Code assistance remains not joined and not persisted.",
      "No retry or fallback path may be introduced from the frontend.",
    ],
    joinReasonSummary:
      "Code assistance remains held because no join request exists and the idempotency, replay, and single-run lock safeguards are still manual review items.",
    manualRecoveryRequirement:
      "Carry join request creation, replay protection, and lock review into the backend-owned end-to-end packet contract batch.",
    nextSafeAction:
      "Keep the code lane static, review-only, and not joined.",
  },
  "website-copy-code-request": {
    topBlockingGateIds: [
      "server-only-boundary-gate",
      "database-write-gate",
      "file-write-gate",
    ],
    topMissingEvidence: [
      "A server-only boundary review for website copy/code joins.",
      "Explicit database-write blocking evidence for website copy/code joins.",
      "Explicit file-write blocking evidence for website copy/code joins.",
    ],
    operatorReviewNotes: [
      "Website copy/code stays frontend-blocked.",
      "No database or file mutation path may be implied by this preview layer.",
    ],
    joinReasonSummary:
      "Website copy/code remains held because server-only boundaries, database writes, and file writes all stay blocked and unimplemented.",
    manualRecoveryRequirement:
      "Review boundary and write-block posture manually before any packet contract discussion continues.",
    nextSafeAction:
      "Keep the website lane not joined and non-persistent.",
  },
  "product-video-request": {
    topBlockingGateIds: [
      "kill-switch-gate",
      "queue-dispatch-gate",
      "job-execution-gate",
    ],
    topMissingEvidence: [
      "Kill-switch review for a future backend-owned video join packet.",
      "Queue-dispatch blocking evidence for product video joins.",
      "A job execution boundary that remains blocked and non-runnable.",
    ],
    operatorReviewNotes: [
      "Video generation remains locked above the fold.",
      "Queue, worker, and job execution stay blocked from the frontend video console.",
    ],
    joinReasonSummary:
      "Product video remains held because the kill switch stays required and queue/job execution remain blocked with no runnable backend packet.",
    manualRecoveryRequirement:
      "Preserve the locked video console and carry queue and job boundaries into the next backend-owned packet contract batch.",
    nextSafeAction:
      "Keep the video lane held and manual-review-only.",
  },
  "storyboard-image-request": {
    topBlockingGateIds: [
      "synthetic-result-envelope-gate",
      "privacy-redaction-gate",
      "opaque-credential-gate",
    ],
    topMissingEvidence: [
      "A reviewed storyboard-image result envelope.",
      "Privacy/redaction evidence for storyboard-image joins.",
      "An opaque credential label reserved for backend-only use.",
    ],
    operatorReviewNotes: [
      "Storyboard image output remains static placeholder only.",
      "Credential posture stays opaque and non-executable.",
    ],
    joinReasonSummary:
      "Storyboard image remains held because the synthetic envelope stays preview-only, privacy review is incomplete, and credential posture remains opaque.",
    manualRecoveryRequirement:
      "Review output envelope posture, privacy/redaction, and opaque credentials without introducing any live join execution.",
    nextSafeAction:
      "Keep the image lane under review with joins not created.",
  },
  "audio-narration-request": {
    topBlockingGateIds: [
      "cost-rate-timeout-gate",
      "join-response-contract-gate",
      "job-execution-gate",
    ],
    topMissingEvidence: [
      "Cost/rate/timeout review for audio narration joins.",
      "A backend-owned join response contract that remains not received.",
      "A blocked job execution boundary for narration packet handling.",
    ],
    operatorReviewNotes: [
      "Narration stays blocked while cost and timeout posture are incomplete.",
      "No job execution, retry, or fallback path exists for audio joins.",
    ],
    joinReasonSummary:
      "Audio narration remains held because cost/rate/timeout posture is incomplete, join response is not received, and job execution remains blocked.",
    manualRecoveryRequirement:
      "Carry cost, response, and job boundaries into the end-to-end packet contract batch with join posture still held.",
    nextSafeAction:
      "Continue manual review and keep narration joins disabled.",
  },
  "transcription-caption-request": {
    topBlockingGateIds: [
      "cost-rate-timeout-gate",
      "worker-dispatch-gate",
      "job-execution-gate",
    ],
    topMissingEvidence: [
      "Reviewed throughput posture for transcription/caption joins.",
      "Worker isolation evidence for caption handling.",
      "Job execution evidence for backend-owned caption packet review.",
    ],
    operatorReviewNotes: [
      "Transcription remains blocked because throughput and worker posture are unresolved.",
      "Frontend review cannot create worker or job boundaries.",
    ],
    joinReasonSummary:
      "Transcription/caption remains held because rate posture is unresolved and worker/job execution remain blocked future dependencies.",
    manualRecoveryRequirement:
      "Carry rate, worker, and job reviews into the backend-owned packet contract batch with no runnable path.",
    nextSafeAction:
      "Keep worker and job execution blocked for transcription joins.",
  },
  "embeddings-search-request": {
    topBlockingGateIds: [
      "result-to-audit-approval-link-gate",
      "result-persistence-gate",
      "audit-persistence-gate",
    ],
    topMissingEvidence: [
      "A reviewed result-to-audit-approval link posture for retrieval review.",
      "A result persistence contract owned by a future backend layer.",
      "Audit persistence evidence that remains explicitly unimplemented.",
    ],
    operatorReviewNotes: [
      "Embeddings/search stays preview-only because nothing is persisted.",
      "Result link and persistence blockers remain visible.",
    ],
    joinReasonSummary:
      "Embeddings/search remains held because result links are preview-only, result persistence is not implemented, and audit persistence remains blocked.",
    manualRecoveryRequirement:
      "Preserve preview-only retrieval review and carry link plus persistence work into the next backend-owned packet contract batch.",
    nextSafeAction:
      "Keep retrieval review static and not persisted.",
  },
  "safety-moderation-review-request": {
    topBlockingGateIds: [
      "operator-approval-gate",
      "audit-gate",
      "approval-join-contract-gate",
    ],
    topMissingEvidence: [
      "Reviewed approval scope for moderation joins.",
      "Audit evidence for the moderation lane.",
      "An approval join contract that keeps approval references non-persistent.",
    ],
    operatorReviewNotes: [
      "Moderation stays held until approval and audit posture are explicit.",
      "Approval joins remain visible blockers.",
    ],
    joinReasonSummary:
      "Safety/moderation remains held because approval scope, audit evidence, and approval joins are all still preview-only and non-persistent.",
    manualRecoveryRequirement:
      "Review moderation approval and audit posture manually before the end-to-end packet contract is drafted.",
    nextSafeAction:
      "Keep the moderation lane held and audit-backed only as preview data.",
  },
  "local-private-inference-request": {
    topBlockingGateIds: [
      "server-only-boundary-gate",
      "kill-switch-gate",
      "approval-join-contract-gate",
    ],
    topMissingEvidence: [
      "A server-only local/private boundary review for join packets.",
      "Kill-switch evidence for local/private inference review.",
      "An approval join contract for backend-owned local/private review.",
    ],
    operatorReviewNotes: [
      "Local/private inference is still backend-only and not exempt from held posture.",
      "The frontend cannot dispatch or capture local/private runs.",
    ],
    joinReasonSummary:
      "Local/private inference remains held because the server-only boundary, kill switch, and approval join dependency all remain unresolved backend work.",
    manualRecoveryRequirement:
      "Preserve the backend-only local/private boundary and keep the lane review-only until the packet contract exists.",
    nextSafeAction:
      "Maintain the held local/private posture and keep joins blocked.",
  },
  "audit-recovery-explanation-request": {
    topBlockingGateIds: [
      "audit-join-contract-gate",
      "approval-join-contract-gate",
      "evidence-packet-gate",
    ],
    topMissingEvidence: [
      "A reviewed audit join contract for recovery explanations.",
      "A reviewed approval join contract for recovery explanations.",
      "An evidence packet posture that remains preview-only and non-persistent.",
    ],
    operatorReviewNotes: [
      "Audit/recovery explanation remains descriptive only.",
      "No held explanation may imply a persisted audit or approval record exists.",
    ],
    joinReasonSummary:
      "Audit/recovery explanation remains held because join contracts and evidence packets are preview-only and no persisted linkage exists.",
    manualRecoveryRequirement:
      "Keep the explanation lane descriptive and carry contract plus evidence packet work into the next backend-owned packet batch.",
    nextSafeAction:
      "Keep the audit/recovery lane review-only and not joined.",
  },
} as const satisfies Readonly<
  Record<AuditApprovalJoinReviewId, AuditApprovalJoinDecisionSeed>
>;

const GATE_FAILURE_SEEDS = [
  {
    id: "synthetic-result-envelope-gate",
    label: "synthetic result envelope gate failure",
    state: "held / synthetic result envelope preview-only",
    severity: "critical",
    operatorFacingExplanation:
      "The synthetic result envelope remains preview-only, so joins cannot advance to any persisted or executable state.",
    requiredEvidenceToUnblock:
      "A reviewed synthetic result envelope with deterministic preview references only.",
    requiredRecoveryAction:
      "Review the envelope posture manually and carry it into the server-only packet contract.",
    nextSafeAction:
      "Keep the synthetic envelope preview-only.",
  },
  {
    id: "result-capture-review-gate",
    label: "result capture review gate failure",
    state: "held / result capture review preview-only",
    severity: "high",
    operatorFacingExplanation:
      "Result capture review remains preview-only, so downstream audit and approval joins must remain held.",
    requiredEvidenceToUnblock:
      "A reviewed result capture record showing held, non-persistent state.",
    requiredRecoveryAction:
      "Review result capture dependencies before defining any packet contract.",
    nextSafeAction:
      "Keep result capture review non-persistent.",
  },
  {
    id: "result-capture-acceptance-posture-gate",
    label: "result capture acceptance posture gate failure",
    state: "held / result capture acceptance posture preview-only",
    severity: "high",
    operatorFacingExplanation:
      "Result capture acceptance has not been granted, so join readiness remains blocked.",
    requiredEvidenceToUnblock:
      "Acceptance blockers and held posture evidence for the result capture layer.",
    requiredRecoveryAction:
      "Carry acceptance blockers into manual packet review without changing state.",
    nextSafeAction:
      "Keep acceptance posture not accepted.",
  },
  {
    id: "audit-join-contract-gate",
    label: "audit join contract gate failure",
    state: "held / audit join contract preview-only",
    severity: "critical",
    operatorFacingExplanation:
      "The audit join contract exists only as preview data and does not allow any persisted audit join.",
    requiredEvidenceToUnblock:
      "A reviewed audit join contract carried into the next backend-owned packet layer.",
    requiredRecoveryAction:
      "Preserve preview-only audit join posture until the packet contract is defined.",
    nextSafeAction:
      "Keep audit joins not persisted.",
  },
  {
    id: "approval-join-contract-gate",
    label: "approval join contract gate failure",
    state: "held / approval join contract preview-only",
    severity: "critical",
    operatorFacingExplanation:
      "The approval join contract remains preview-only and cannot create approval linkage or acceptance.",
    requiredEvidenceToUnblock:
      "A reviewed approval join contract with operator approval posture intact.",
    requiredRecoveryAction:
      "Keep approval joins non-persistent and manual-review-only.",
    nextSafeAction:
      "Keep approval joins not persisted.",
  },
  {
    id: "result-to-audit-approval-link-gate",
    label: "result-to-audit-approval link gate failure",
    state: "held / result-to-audit-approval link preview-only",
    severity: "critical",
    operatorFacingExplanation:
      "Result-to-audit-approval linkage remains a preview-only contract, so no durable linkage is available.",
    requiredEvidenceToUnblock:
      "A reviewed link contract and deterministic digest posture for future packet work.",
    requiredRecoveryAction:
      "Carry link review into the end-to-end packet contract with no persistence.",
    nextSafeAction:
      "Keep result linkage preview-only.",
  },
  {
    id: "join-request-contract-gate",
    label: "join request contract gate failure",
    state: "held / join request not created",
    severity: "critical",
    operatorFacingExplanation:
      "No audit/approval join request exists, so no invocation path may begin.",
    requiredEvidenceToUnblock:
      "A reviewed join request contract that remains non-runnable and not created.",
    requiredRecoveryAction:
      "Define packet request shape only in the next backend batch.",
    nextSafeAction:
      "Keep join request state not created.",
  },
  {
    id: "join-response-contract-gate",
    label: "join response contract gate failure",
    state: "held / join response not received",
    severity: "high",
    operatorFacingExplanation:
      "No join response exists because no backend request is created or invoked.",
    requiredEvidenceToUnblock:
      "A reviewed response contract showing held, non-received posture.",
    requiredRecoveryAction:
      "Carry response shape into the packet contract without simulating receipt.",
    nextSafeAction:
      "Keep join response state not received.",
  },
  {
    id: "join-error-contract-gate",
    label: "join error contract gate failure",
    state: "held / join error not received",
    severity: "medium",
    operatorFacingExplanation:
      "No join error exists because no executable join path exists and no retries are allowed.",
    requiredEvidenceToUnblock:
      "A reviewed error contract with manual recovery posture and no retry/fallback.",
    requiredRecoveryAction:
      "Carry error-handling shape into the packet contract without producing any live errors.",
    nextSafeAction:
      "Keep join error state not received.",
  },
  {
    id: "evidence-packet-gate",
    label: "evidence packet gate failure",
    state: "held / evidence packet preview-only",
    severity: "high",
    operatorFacingExplanation:
      "The evidence packet remains preview-only, so audit and approval evidence cannot become durable or accepted.",
    requiredEvidenceToUnblock:
      "A reviewed evidence packet preview with deterministic digest posture only.",
    requiredRecoveryAction:
      "Keep evidence packet review manual and preview-only until packet ownership moves server-side.",
    nextSafeAction:
      "Keep evidence packet state preview-only.",
  },
  {
    id: "operator-approval-gate",
    label: "operator approval gate failure",
    state: "held / operator approval missing",
    severity: "critical",
    operatorFacingExplanation:
      "Operator approval has not been granted, so approval joins cannot advance beyond held preview state.",
    requiredEvidenceToUnblock:
      "Explicit operator review evidence for the affected capability lane.",
    requiredRecoveryAction:
      "Keep approval manual and do not infer any accepted state.",
    nextSafeAction:
      "Keep operator approval required.",
  },
  {
    id: "manual-confirmation-gate",
    label: "manual confirmation gate failure",
    state: "held / manual confirmation missing",
    severity: "critical",
    operatorFacingExplanation:
      "Manual confirmation remains required before any backend packet definition could be considered safe.",
    requiredEvidenceToUnblock:
      "Manual confirmation notes that remain outside the frontend runtime.",
    requiredRecoveryAction:
      "Keep manual confirmation required and continue preview-only review.",
    nextSafeAction:
      "Keep manual confirmation required.",
  },
  {
    id: "kill-switch-gate",
    label: "kill switch gate failure",
    state: "held / kill switch review required",
    severity: "critical",
    operatorFacingExplanation:
      "Kill-switch review remains mandatory before any server-only packet wiring could be considered.",
    requiredEvidenceToUnblock:
      "Kill-switch coverage evidence for the affected join lane.",
    requiredRecoveryAction:
      "Carry kill-switch review into the next backend-owned packet batch.",
    nextSafeAction:
      "Keep kill switch required.",
  },
  {
    id: "audit-gate",
    label: "audit gate failure",
    state: "held / audit evidence missing",
    severity: "critical",
    operatorFacingExplanation:
      "Audit evidence remains incomplete, so no audit-backed join may be accepted or persisted.",
    requiredEvidenceToUnblock:
      "Preview-only audit evidence with privacy-safe redaction notes.",
    requiredRecoveryAction:
      "Keep audit posture manual and review-only.",
    nextSafeAction:
      "Keep audit required.",
  },
  {
    id: "server-only-boundary-gate",
    label: "server-only boundary gate failure",
    state: "held / server-only boundary required",
    severity: "critical",
    operatorFacingExplanation:
      "The join layer is frontend-blocked and requires server-only adapters for any future execution path.",
    requiredEvidenceToUnblock:
      "A server-only boundary review showing no frontend invocation path exists.",
    requiredRecoveryAction:
      "Carry boundary requirements into the backend packet contract and keep frontend blocked.",
    nextSafeAction:
      "Keep backend posture server-only required.",
  },
  {
    id: "opaque-credential-gate",
    label: "opaque credential gate failure",
    state: "held / opaque credential reference required",
    severity: "high",
    operatorFacingExplanation:
      "Only opaque credential references are allowed, so no secret-bearing join path may exist in the frontend.",
    requiredEvidenceToUnblock:
      "Opaque credential labels with no secret material exposed.",
    requiredRecoveryAction:
      "Keep credentials abstract and backend-owned.",
    nextSafeAction:
      "Keep opaque credential references only.",
  },
  {
    id: "privacy-redaction-gate",
    label: "privacy/redaction gate failure",
    state: "held / privacy redaction incomplete",
    severity: "critical",
    operatorFacingExplanation:
      "Privacy and redaction review is incomplete, so audit and approval evidence cannot move beyond preview state.",
    requiredEvidenceToUnblock:
      "Privacy/redaction evidence covering result, audit, and approval references.",
    requiredRecoveryAction:
      "Review privacy posture manually before packet work continues.",
    nextSafeAction:
      "Keep privacy/redaction required.",
  },
  {
    id: "cost-rate-timeout-gate",
    label: "cost/rate/timeout gate failure",
    state: "held / cost rate timeout review incomplete",
    severity: "high",
    operatorFacingExplanation:
      "Cost, rate, and timeout controls are not fully reviewed, so the join layer cannot progress toward runnable packet design.",
    requiredEvidenceToUnblock:
      "Cost acknowledgement, rate guard, and timeout/cancel evidence.",
    requiredRecoveryAction:
      "Carry cost/rate/timeout review into the next backend packet batch.",
    nextSafeAction:
      "Keep cost, rate, and timeout guards required.",
  },
  {
    id: "idempotency-replay-gate",
    label: "idempotency/replay gate failure",
    state: "held / idempotency replay block not proven",
    severity: "high",
    operatorFacingExplanation:
      "Idempotency and replay blocking remain unproven, so no packet-level join execution may be considered safe.",
    requiredEvidenceToUnblock:
      "Deterministic idempotency and replay-block review artifacts.",
    requiredRecoveryAction:
      "Keep idempotency and replay review manual and packet-boundary only.",
    nextSafeAction:
      "Keep idempotency and replay block required.",
  },
  {
    id: "single-run-lock-gate",
    label: "single-run lock gate failure",
    state: "held / single-run lock missing",
    severity: "high",
    operatorFacingExplanation:
      "Single-run lock posture is still missing, so held joins cannot claim concurrency safety.",
    requiredEvidenceToUnblock:
      "Single-run lock review for the affected capability lane.",
    requiredRecoveryAction:
      "Carry lock review into the next backend packet contract.",
    nextSafeAction:
      "Keep single-run lock required.",
  },
  {
    id: "result-persistence-gate",
    label: "result persistence gate failure",
    state: "held / result persistence not implemented",
    severity: "critical",
    operatorFacingExplanation:
      "Result persistence is explicitly not implemented, so no join may claim a durable result reference.",
    requiredEvidenceToUnblock:
      "A future backend persistence design that remains absent from this preview batch.",
    requiredRecoveryAction:
      "Keep result persistence unimplemented and non-runnable.",
    nextSafeAction:
      "Keep result persistence not implemented.",
  },
  {
    id: "audit-persistence-gate",
    label: "audit persistence gate failure",
    state: "held / audit persistence not implemented",
    severity: "critical",
    operatorFacingExplanation:
      "Audit persistence is explicitly not implemented, so no persisted audit join may exist.",
    requiredEvidenceToUnblock:
      "A future backend audit persistence design that remains out of scope here.",
    requiredRecoveryAction:
      "Keep audit persistence unimplemented and preview-only.",
    nextSafeAction:
      "Keep audit persistence not implemented.",
  },
  {
    id: "approval-persistence-gate",
    label: "approval persistence gate failure",
    state: "held / approval persistence not implemented",
    severity: "critical",
    operatorFacingExplanation:
      "Approval persistence is explicitly not implemented, so no approval record may be stored or accepted.",
    requiredEvidenceToUnblock:
      "A future backend approval persistence design that remains out of scope here.",
    requiredRecoveryAction:
      "Keep approval persistence unimplemented and preview-only.",
    nextSafeAction:
      "Keep approval persistence not implemented.",
  },
  {
    id: "database-write-gate",
    label: "database write gate failure",
    state: "held / database write not implemented",
    severity: "critical",
    operatorFacingExplanation:
      "Database writes remain unimplemented, so no join, audit, approval, or packet state may be stored.",
    requiredEvidenceToUnblock:
      "Explicit evidence that database mutation remains blocked from the frontend.",
    requiredRecoveryAction:
      "Keep database writes blocked and backend-future only.",
    nextSafeAction:
      "Keep database write state not implemented.",
  },
  {
    id: "file-write-gate",
    label: "file write gate failure",
    state: "held / file write not implemented",
    severity: "critical",
    operatorFacingExplanation:
      "File writes remain unimplemented, so no evidence packet, result artifact, or audit payload may be written.",
    requiredEvidenceToUnblock:
      "Explicit evidence that file mutation remains blocked from the frontend.",
    requiredRecoveryAction:
      "Keep file writes blocked and backend-future only.",
    nextSafeAction:
      "Keep file write state not implemented.",
  },
  {
    id: "queue-dispatch-gate",
    label: "queue dispatch gate failure",
    state: "held / queue dispatch blocked",
    severity: "high",
    operatorFacingExplanation:
      "Queue dispatch remains blocked, so no deferred join or packet execution may be scheduled.",
    requiredEvidenceToUnblock:
      "Explicit queue blocking evidence for the affected join lane.",
    requiredRecoveryAction:
      "Keep queue dispatch blocked and carry that posture forward.",
    nextSafeAction:
      "Keep queue dispatch blocked.",
  },
  {
    id: "worker-dispatch-gate",
    label: "worker dispatch gate failure",
    state: "held / worker dispatch blocked",
    severity: "high",
    operatorFacingExplanation:
      "Worker dispatch remains blocked, so no join recovery or packet worker path may be implied.",
    requiredEvidenceToUnblock:
      "Explicit worker blocking evidence for the affected join lane.",
    requiredRecoveryAction:
      "Keep worker dispatch blocked and frontend-safe.",
    nextSafeAction:
      "Keep worker dispatch blocked.",
  },
  {
    id: "job-execution-gate",
    label: "job execution gate failure",
    state: "held / job execution blocked",
    severity: "high",
    operatorFacingExplanation:
      "Job execution remains blocked, so no recovery, packet, or persistence job may run.",
    requiredEvidenceToUnblock:
      "Explicit job execution blocking evidence for the affected join lane.",
    requiredRecoveryAction:
      "Keep job execution blocked and do not simulate any runtime.",
    nextSafeAction:
      "Keep job execution blocked.",
  },
] as const satisfies readonly AuditApprovalJoinGateFailureSeed[];

const GATE_FAILURE_SEEDS_BY_ID = new Map(
  GATE_FAILURE_SEEDS.map((seed) => [seed.id, seed] as const)
);

const RECOVERY_READINESS_CHECKLIST_SEEDS = [
  {
    checklistId: "audit-join-contract-reviewed",
    label: "audit join contract reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A manual review note confirming the audit join contract remains preview-only and non-persistent.",
    recoveryAction:
      "Keep the audit join contract reviewed but held for the server-only packet batch.",
    owner: "operator",
    nextSafeAction:
      "Keep audit join contract review visible.",
  },
  {
    checklistId: "approval-join-contract-reviewed",
    label: "approval join contract reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A manual review note confirming the approval join contract remains preview-only and non-persistent.",
    recoveryAction:
      "Keep the approval join contract reviewed but held for the server-only packet batch.",
    owner: "operator",
    nextSafeAction:
      "Keep approval join contract review visible.",
  },
  {
    checklistId: "result-link-contract-reviewed",
    label: "result link contract reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed result-to-audit-approval link contract with deterministic digest posture only.",
    recoveryAction:
      "Carry result link review into the next packet batch without persistence.",
    owner: "operator",
    nextSafeAction:
      "Keep result link contract review visible.",
  },
  {
    checklistId: "join-request-contract-reviewed",
    label: "join request contract reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A join request contract review showing request state remains not created.",
    recoveryAction:
      "Keep request shape reviewed and non-runnable.",
    owner: "operator",
    nextSafeAction:
      "Keep join request state not created.",
  },
  {
    checklistId: "join-response-contract-reviewed",
    label: "join response contract reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A join response contract review showing response state remains not received.",
    recoveryAction:
      "Keep response shape reviewed and non-received.",
    owner: "operator",
    nextSafeAction:
      "Keep join response state not received.",
  },
  {
    checklistId: "join-error-contract-reviewed",
    label: "join error contract reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A join error contract review showing error state remains not received with no retry/fallback.",
    recoveryAction:
      "Keep error shape reviewed and non-executable.",
    owner: "operator",
    nextSafeAction:
      "Keep join error state not received.",
  },
  {
    checklistId: "join-gates-reviewed",
    label: "join gates reviewed",
    state: "manual review required",
    severity: "critical",
    evidenceRequired:
      "A gate review covering hold states across audit, approval, persistence, and execution boundaries.",
    recoveryAction:
      "Keep gate review current before the packet contract is defined.",
    owner: "operator",
    nextSafeAction:
      "Keep gate review visible to operators.",
  },
  {
    checklistId: "join-readiness-matrix-reviewed",
    label: "join readiness matrix reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed readiness matrix showing join-contract-only / not persistent posture.",
    recoveryAction:
      "Carry readiness review into the next backend packet layer.",
    owner: "operator",
    nextSafeAction:
      "Keep readiness matrix review visible.",
  },
  {
    checklistId: "evidence-packet-reviewed",
    label: "evidence packet reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed evidence packet preview showing deterministic digest posture only.",
    recoveryAction:
      "Keep evidence packet preview-only and non-persistent.",
    owner: "operator",
    nextSafeAction:
      "Keep evidence packet preview-only.",
  },
  {
    checklistId: "audit-evidence-reviewed",
    label: "audit evidence reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "Audit evidence review notes showing non-persistent preview posture.",
    recoveryAction:
      "Keep audit evidence manual and preview-only.",
    owner: "operator",
    nextSafeAction:
      "Keep audit evidence preview-only.",
  },
  {
    checklistId: "approval-evidence-reviewed",
    label: "approval evidence reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "Approval evidence review notes showing manual approval remains required.",
    recoveryAction:
      "Keep approval evidence manual and preview-only.",
    owner: "operator",
    nextSafeAction:
      "Keep approval evidence preview-only.",
  },
  {
    checklistId: "result-evidence-reviewed",
    label: "result evidence reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "Result evidence review notes showing result references remain non-persistent.",
    recoveryAction:
      "Keep result evidence preview-only and non-persistent.",
    owner: "operator",
    nextSafeAction:
      "Keep result evidence preview-only.",
  },
  {
    checklistId: "result-digest-reviewed",
    label: "result digest reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A result digest review confirming deterministic preview digest only posture.",
    recoveryAction:
      "Carry digest review into the next packet batch without introducing live hashing claims.",
    owner: "operator",
    nextSafeAction:
      "Keep deterministic preview digest only posture.",
  },
  {
    checklistId: "result-id-reviewed",
    label: "result id reviewed",
    state: "blocked",
    severity: "high",
    evidenceRequired:
      "Evidence that result ids remain not issued in this preview-only layer.",
    recoveryAction:
      "Keep result ids blocked until a future backend packet can own issuance.",
    owner: "backend future",
    nextSafeAction:
      "Keep result id state not issued.",
  },
  {
    checklistId: "privacy-redaction-reviewed",
    label: "privacy/redaction reviewed",
    state: "manual review required",
    severity: "critical",
    evidenceRequired:
      "Privacy/redaction review notes across result, audit, approval, and evidence packet references.",
    recoveryAction:
      "Keep privacy/redaction review manual before backend packet work continues.",
    owner: "safety review",
    nextSafeAction:
      "Keep privacy/redaction required.",
  },
  {
    checklistId: "cost-rate-reviewed",
    label: "cost/rate reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "Cost acknowledgement and rate guard review notes for held joins.",
    recoveryAction:
      "Carry cost and rate review into the packet contract batch.",
    owner: "operator",
    nextSafeAction:
      "Keep cost acknowledgement and rate guards required.",
  },
  {
    checklistId: "timeout-cancel-reviewed",
    label: "timeout/cancel reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "Timeout/cancel review notes for future backend packet handling.",
    recoveryAction:
      "Carry timeout/cancel review into the packet contract batch.",
    owner: "operator",
    nextSafeAction:
      "Keep timeout/cancel guard required.",
  },
  {
    checklistId: "idempotency-replay-reviewed",
    label: "idempotency/replay reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "Idempotency and replay-block review notes for held joins.",
    recoveryAction:
      "Carry idempotency/replay review into the packet contract batch.",
    owner: "operator",
    nextSafeAction:
      "Keep idempotency and replay block required.",
  },
  {
    checklistId: "single-run-lock-reviewed",
    label: "single-run lock reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "Single-run lock review notes for held joins.",
    recoveryAction:
      "Carry single-run lock review into the packet contract batch.",
    owner: "operator",
    nextSafeAction:
      "Keep single-run lock required.",
  },
  {
    checklistId: "audit-persistence-still-blocked",
    label: "audit persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Evidence that audit persistence remains explicitly unimplemented.",
    recoveryAction:
      "Keep audit persistence blocked and backend-future only.",
    owner: "backend future",
    nextSafeAction:
      "Keep audit persistence not implemented.",
  },
  {
    checklistId: "approval-persistence-still-blocked",
    label: "approval persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Evidence that approval persistence remains explicitly unimplemented.",
    recoveryAction:
      "Keep approval persistence blocked and backend-future only.",
    owner: "backend future",
    nextSafeAction:
      "Keep approval persistence not implemented.",
  },
  {
    checklistId: "result-persistence-still-blocked",
    label: "result persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Evidence that result persistence remains explicitly unimplemented.",
    recoveryAction:
      "Keep result persistence blocked and backend-future only.",
    owner: "backend future",
    nextSafeAction:
      "Keep result persistence not implemented.",
  },
  {
    checklistId: "database-writes-still-blocked",
    label: "database writes still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Evidence that database writes remain blocked from this preview-only layer.",
    recoveryAction:
      "Keep database writes blocked and outside frontend scope.",
    owner: "backend future",
    nextSafeAction:
      "Keep database write state not implemented.",
  },
  {
    checklistId: "file-writes-still-blocked",
    label: "file writes still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Evidence that file writes remain blocked from this preview-only layer.",
    recoveryAction:
      "Keep file writes blocked and outside frontend scope.",
    owner: "backend future",
    nextSafeAction:
      "Keep file write state not implemented.",
  },
  {
    checklistId: "queue-dispatch-still-blocked",
    label: "queue dispatch still blocked",
    state: "blocked",
    severity: "high",
    evidenceRequired:
      "Evidence that queue dispatch remains blocked for audit/approval join work.",
    recoveryAction:
      "Keep queue dispatch blocked and non-runnable.",
    owner: "backend future",
    nextSafeAction:
      "Keep queue dispatch blocked.",
  },
  {
    checklistId: "worker-dispatch-still-blocked",
    label: "worker dispatch still blocked",
    state: "blocked",
    severity: "high",
    evidenceRequired:
      "Evidence that worker dispatch remains blocked for audit/approval join work.",
    recoveryAction:
      "Keep worker dispatch blocked and non-runnable.",
    owner: "backend future",
    nextSafeAction:
      "Keep worker dispatch blocked.",
  },
  {
    checklistId: "job-execution-still-blocked",
    label: "job execution still blocked",
    state: "blocked",
    severity: "high",
    evidenceRequired:
      "Evidence that job execution remains blocked for audit/approval join work.",
    recoveryAction:
      "Keep job execution blocked and non-runnable.",
    owner: "backend future",
    nextSafeAction:
      "Keep job execution blocked.",
  },
] as const satisfies readonly AuditApprovalJoinRecoveryReadinessChecklistSeed[];

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneCapabilityFamily(
  family: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["selectedCapabilityFamily"]
): BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["selectedCapabilityFamily"] {
  return { ...family };
}

function requireSyntheticAuditJoinContract(
  id: AuditApprovalJoinContractId
): SyntheticAuditJoinContractRecord {
  const record = SYNTHETIC_AUDIT_JOIN_CONTRACTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic audit join contract for ${id}`);
  }

  return record;
}

function requireSyntheticApprovalJoinContract(
  id: AuditApprovalJoinContractId
): SyntheticApprovalJoinContractRecord {
  const record = SYNTHETIC_APPROVAL_JOIN_CONTRACTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic approval join contract for ${id}`);
  }

  return record;
}

function requireResultAuditApprovalLinkContract(
  id: AuditApprovalJoinContractId
): ResultAuditApprovalLinkContractRecord {
  const record = RESULT_AUDIT_APPROVAL_LINK_CONTRACTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result-audit-approval link contract for ${id}`);
  }

  return record;
}

function requireJoinRequestContract(
  id: AuditApprovalJoinContractId
): AuditApprovalJoinRequestContractRecord {
  const record = JOIN_REQUEST_CONTRACTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing audit/approval join request contract for ${id}`);
  }

  return record;
}

function requireJoinResponseContract(
  id: AuditApprovalJoinContractId
): AuditApprovalJoinResponseContractRecord {
  const record = JOIN_RESPONSE_CONTRACTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing audit/approval join response contract for ${id}`);
  }

  return record;
}

function requireJoinErrorContract(
  id: AuditApprovalJoinContractId
): AuditApprovalJoinErrorContractRecord {
  const record = JOIN_ERROR_CONTRACTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing audit/approval join error contract for ${id}`);
  }

  return record;
}

function requireJoinGateRecord(
  id: AuditApprovalJoinGateId
): AuditApprovalJoinGateRecord {
  const record = JOIN_GATE_RECORDS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing audit/approval join gate record for ${id}`);
  }

  return record;
}

function requireJoinReadinessRecord(
  id: AuditApprovalJoinContractId
): AuditApprovalJoinReadinessMatrixRecord {
  const record = JOIN_READINESS_RECORDS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing audit/approval join readiness record for ${id}`);
  }

  return record;
}

function requireEvidencePacketPreview(
  id: AuditApprovalJoinContractId
): AuditApprovalEvidencePacketPreviewRecord {
  const record = EVIDENCE_PACKET_PREVIEWS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing audit/approval evidence packet preview for ${id}`);
  }

  return record;
}

function requireResultCaptureReview(
  id: AuditApprovalJoinContractId
): BackendOwnedSyntheticDryRunResultCaptureReviewRecord {
  const record = RESULT_CAPTURE_REVIEWS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture review for ${id}`);
  }

  return record;
}

function requireResultCaptureAcceptancePosture(
  id: AuditApprovalJoinContractId
): ResultCaptureAcceptancePostureRecord {
  const record = RESULT_CAPTURE_ACCEPTANCE_POSTURES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture acceptance posture for ${id}`);
  }

  return record;
}

function requireSyntheticResultEnvelope(
  id: AuditApprovalJoinContractId
): SyntheticResultEnvelopeContractRecord {
  const record = SYNTHETIC_RESULT_ENVELOPES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic result envelope for ${id}`);
  }

  return record;
}

function resolveAuditApprovalJoinGateId(
  id: AuditApprovalJoinGateFailureId
): AuditApprovalJoinGateId {
  switch (id) {
    case "synthetic-result-envelope-gate":
      return "synthetic-result-envelope";
    case "result-capture-review-gate":
      return "result-capture-review";
    case "result-capture-acceptance-posture-gate":
      return "result-capture-acceptance-posture";
    case "audit-join-contract-gate":
      return "audit-join-contract";
    case "approval-join-contract-gate":
      return "approval-join-contract";
    case "result-to-audit-approval-link-gate":
      return "result-audit-approval-link-contract";
    case "join-request-contract-gate":
      return "join-request-contract";
    case "join-response-contract-gate":
      return "join-response-contract";
    case "join-error-contract-gate":
      return "join-error-contract";
    case "evidence-packet-gate":
      return "result-capture-acceptance-posture";
    case "operator-approval-gate":
      return "operator-approval";
    case "manual-confirmation-gate":
      return "manual-confirmation";
    case "kill-switch-gate":
      return "kill-switch";
    case "audit-gate":
      return "audit";
    case "server-only-boundary-gate":
      return "server-only-boundary";
    case "opaque-credential-gate":
      return "opaque-credential-reference";
    case "privacy-redaction-gate":
      return "privacy-redaction";
    case "cost-rate-timeout-gate":
      return "cost-rate-timeout";
    case "idempotency-replay-gate":
      return "idempotency-replay-block";
    case "single-run-lock-gate":
      return "single-run-lock";
    case "result-persistence-gate":
      return "no-result-persistence";
    case "audit-persistence-gate":
      return "no-audit-persistence";
    case "approval-persistence-gate":
      return "no-approval-persistence";
    case "database-write-gate":
      return "no-database-writes";
    case "file-write-gate":
      return "no-file-writes";
    case "queue-dispatch-gate":
      return "no-queue-dispatch";
    case "worker-dispatch-gate":
      return "no-worker-dispatch";
    case "job-execution-gate":
      return "no-job-execution";
  }
}

export function uniqueAuditApprovalJoinReviewDisplayStrings<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Array.from(new Set(values));
}

export function buildStableAuditApprovalJoinReviewKey(
  id: AuditApprovalJoinReviewId
): AuditApprovalJoinReviewKey {
  return `backend-owned-synthetic-dry-run-audit-approval-join-review:${id}`;
}

export function buildStableAuditApprovalJoinDecisionReviewKey(
  id: AuditApprovalJoinReviewId
): AuditApprovalJoinDecisionReviewKey {
  return `backend-owned-synthetic-dry-run-audit-approval-join-decision-review:${id}`;
}

export function buildStableAuditApprovalJoinGateFailureReviewKey(
  reviewId: AuditApprovalJoinReviewId,
  gateId: AuditApprovalJoinGateFailureId
): AuditApprovalJoinGateFailureReviewKey {
  return `backend-owned-synthetic-dry-run-audit-approval-join-gate-failure-review:${reviewId}:${gateId}`;
}

export function buildStableAuditApprovalJoinRecoveryPlanKey(
  id: AuditApprovalJoinReviewId
): AuditApprovalJoinRecoveryPlanKey {
  return `backend-owned-synthetic-dry-run-audit-approval-join-recovery-plan:${id}`;
}

export function buildStableAuditApprovalJoinRecoveryReadinessChecklistKey(
  checklistId: AuditApprovalJoinRecoveryReadinessChecklistId
): AuditApprovalJoinRecoveryReadinessChecklistKey {
  return `backend-owned-synthetic-dry-run-audit-approval-join-recovery-readiness:${checklistId}`;
}

export function buildStableAuditApprovalJoinReviewAuditSummaryKey(
  id: AuditApprovalJoinReviewId
): AuditApprovalJoinReviewAuditSummaryKey {
  return `backend-owned-synthetic-dry-run-audit-approval-join-review-audit-summary:${id}`;
}

export function buildStableAuditApprovalJoinAcceptancePostureKey(
  id: AuditApprovalJoinReviewId
): AuditApprovalJoinAcceptancePostureKey {
  return `backend-owned-synthetic-dry-run-audit-approval-join-acceptance-posture:${id}`;
}

function buildReview(
  contract: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord
): BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord {
  const auditJoinContract = requireSyntheticAuditJoinContract(contract.id);
  const approvalJoinContract = requireSyntheticApprovalJoinContract(contract.id);
  const resultLinkContract = requireResultAuditApprovalLinkContract(contract.id);
  const joinRequestContract = requireJoinRequestContract(contract.id);
  const joinResponseContract = requireJoinResponseContract(contract.id);
  const joinErrorContract = requireJoinErrorContract(contract.id);
  const readinessRecord = requireJoinReadinessRecord(contract.id);
  const evidencePacket = requireEvidencePacketPreview(contract.id);
  const resultCaptureReview = requireResultCaptureReview(contract.id);
  const resultCaptureAcceptancePosture =
    requireResultCaptureAcceptancePosture(contract.id);
  const resultEnvelope = requireSyntheticResultEnvelope(contract.id);
  const primaryGateId = DECISION_SEEDS[contract.id].topBlockingGateIds[0];
  const primaryGate = requireJoinGateRecord(
    resolveAuditApprovalJoinGateId(primaryGateId)
  );

  return {
    id: contract.id,
    key: buildStableAuditApprovalJoinReviewKey(contract.id),
    reviewVersion:
      "backend-owned-synthetic-dry-run-audit-approval-join-review-preview-v1",
    previewOnlyStatement: "audit and approval join review is preview-only",
    source: contract.source,
    reviewMode: "preview-only",
    reviewPosture: "audit and approval join review / not persistent",
    label: `${contract.requestLabel} audit and approval join review`,
    operatorRequestPhrase: contract.requestLabel,
    workspaceTarget: contract.workspaceTarget,
    sourceAuditApprovalJoinContractReference: contract.key,
    sourceSyntheticAuditJoinContractReference: auditJoinContract.key,
    sourceSyntheticApprovalJoinContractReference: approvalJoinContract.key,
    sourceResultToAuditApprovalLinkReference: resultLinkContract.key,
    sourceAuditApprovalJoinRequestReference: joinRequestContract.key,
    sourceAuditApprovalJoinResponseReference: joinResponseContract.key,
    sourceAuditApprovalJoinErrorReference: joinErrorContract.key,
    sourceAuditApprovalJoinGateReference: primaryGate.key,
    sourceAuditApprovalJoinReadinessReference: readinessRecord.key,
    sourceAuditApprovalEvidencePacketReference: evidencePacket.key,
    sourceResultCaptureReviewReference: resultCaptureReview.key,
    sourceResultCaptureAcceptancePostureReference:
      resultCaptureAcceptancePosture.key,
    sourceSyntheticResultEnvelopeReference: resultEnvelope.key,
    sourceRunIntentReference: contract.sourceRunIntentReference,
    selectedCapabilityFamily: cloneCapabilityFamily(
      contract.selectedCapabilityFamily
    ),
    providerSlotLabel: contract.providerSlotLabel,
    backupProviderSlotLabel: contract.backupProviderSlotLabel,
    localPrivateAlternativeLabel: contract.localPrivateAlternativeLabel,
    auditJoinState: contract.auditJoinState,
    approvalJoinState: contract.approvalJoinState,
    resultReferenceState: contract.resultReferenceState,
    evidencePacketState: evidencePacket.evidencePacketState,
    joinRequestState: contract.joinRequestState,
    joinInvocationState: contract.joinInvocationState,
    joinResponseState: joinResponseContract.responseState,
    joinErrorState: joinErrorContract.errorState,
    auditEnvelopeState: auditJoinContract.auditEnvelopeState,
    approvalEnvelopeState: approvalJoinContract.approvalEnvelopeState,
    auditAppendState: auditJoinContract.auditAppendState,
    approvalAppendState: approvalJoinContract.approvalAppendState,
    auditPersistenceState: contract.auditPersistenceState,
    approvalPersistenceState: contract.approvalPersistenceState,
    resultPersistenceState: contract.resultPersistenceState,
    artifactPersistenceState: contract.artifactPersistenceState,
    databaseWriteState: contract.databaseWriteState,
    fileWriteState: contract.fileWriteState,
    resultIdState: contract.resultIdState,
    resultDigestPosture: contract.resultDigestPosture,
    providerResponseState: contract.providerResponseState,
    modelOutputState: contract.modelOutputState,
    syntheticFixtureResultState: contract.syntheticFixtureResultState,
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
    nextEndToEndPacketContractRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
  };
}

function buildDecisionReview(
  review: BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord
): AuditApprovalJoinDecisionReviewRecord {
  const seed = DECISION_SEEDS[review.id];

  return {
    key: buildStableAuditApprovalJoinDecisionReviewKey(review.id),
    decisionReviewVersion:
      "backend-owned-synthetic-dry-run-audit-approval-join-decision-review-preview-v1",
    previewOnlyStatement: "audit and approval join decision review is preview-only",
    auditApprovalJoinReviewId: review.id,
    label: `${review.label} decision review`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    sourceJoinContractReference: review.sourceAuditApprovalJoinContractReference,
    sourceAuditJoinReference: review.sourceSyntheticAuditJoinContractReference,
    sourceApprovalJoinReference:
      review.sourceSyntheticApprovalJoinContractReference,
    sourceLinkContractReference: review.sourceResultToAuditApprovalLinkReference,
    decisionState: "held / not joined",
    joinReasonSummary: seed.joinReasonSummary,
    topBlockingGates: seed.topBlockingGateIds.map((id) => {
      const failureSeed = GATE_FAILURE_SEEDS_BY_ID.get(id);

      if (!failureSeed) {
        throw new Error(`Missing gate failure seed for ${id}`);
      }

      return failureSeed.label;
    }),
    topMissingEvidence: cloneList(seed.topMissingEvidence),
    operatorReviewNotes: cloneList(seed.operatorReviewNotes),
    manualRecoveryRequirement: seed.manualRecoveryRequirement,
    endToEndPacketDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
    explicitNoAuditApprovalJoinNoPersistenceStatement:
      "No audit/approval join. No persistence.",
  };
}

function buildGateFailureReview(
  review: BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord,
  seed: AuditApprovalJoinGateFailureSeed
): AuditApprovalJoinGateFailureReviewRecord {
  const lane = review.selectedCapabilityFamily.label;

  return {
    key: buildStableAuditApprovalJoinGateFailureReviewKey(review.id, seed.id),
    gateFailureReviewVersion:
      "backend-owned-synthetic-dry-run-audit-approval-join-gate-failure-review-preview-v1",
    previewOnlyStatement: "audit and approval join gate failure review is preview-only",
    auditApprovalJoinReviewId: review.id,
    label: `${review.label} ${seed.label}`,
    failedGateId: seed.id,
    failedGateLabel: seed.label,
    gateState: seed.state,
    severity: seed.severity,
    affectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation:
      `${seed.operatorFacingExplanation} Affected capability family: ${lane}.`,
    requiredEvidenceToUnblock:
      `${seed.requiredEvidenceToUnblock} Workspace target: ${review.workspaceTarget}.`,
    requiredRecoveryAction:
      `${seed.requiredRecoveryAction} Provider slot: ${review.providerSlotLabel}.`,
    endToEndPacketDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
    explicitNoGatePassStatement:
      "Gate remains blocked. No gate pass is granted.",
  };
}

function buildRecoveryPlan(
  review: BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord
): AuditApprovalJoinRecoveryPlanPreviewRecord {
  const lane = review.selectedCapabilityFamily.label;

  return {
    key: buildStableAuditApprovalJoinRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-synthetic-dry-run-audit-approval-join-recovery-plan-preview-v1",
    previewOnlyStatement: "audit and approval join recovery plan is preview-only",
    auditApprovalJoinReviewId: review.id,
    label: `${review.label} recovery plan`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    recoveryPosture: "manual review only",
    missingAuditEvidenceRecovery:
      `Review preview-only audit evidence for ${lane} and keep audit references non-persistent.`,
    missingApprovalEvidenceRecovery:
      `Review preview-only approval evidence for ${lane} and keep approval references non-persistent.`,
    missingResultReferenceRecovery:
      `Review result references for ${lane} without issuing result ids or persisting linkage.`,
    missingEvidencePacketRecovery:
      `Review the evidence packet for ${lane} as preview-only with deterministic digest posture only.`,
    joinRequestNotCreatedRecovery:
      `Keep join request creation blocked for ${lane} until the server-only end-to-end packet contract exists.`,
    joinResponseNotReceivedRecovery:
      `Keep join response absent for ${lane} and do not simulate any backend response.`,
    joinErrorNotReceivedRecovery:
      `Keep join error absent for ${lane} and preserve no-retry/no-fallback posture.`,
    auditEnvelopeNotCreatedRecovery:
      `Keep the audit envelope uncreated for ${lane} and do not claim any stored audit payload exists.`,
    approvalEnvelopeNotCreatedRecovery:
      `Keep the approval envelope uncreated for ${lane} and do not claim any stored approval payload exists.`,
    auditAppendNotAppendedRecovery:
      `Keep audit append state not appended for ${lane} until backend packet ownership exists.`,
    approvalAppendNotAppendedRecovery:
      `Keep approval append state not appended for ${lane} until backend packet ownership exists.`,
    resultLinkNotPersistedRecovery:
      `Keep result-to-audit-approval linkage preview-only for ${lane} and do not persist linkage.`,
    auditPersistenceMissingRecovery:
      `Keep audit persistence unimplemented for ${lane} and do not claim stored audit evidence exists.`,
    approvalPersistenceMissingRecovery:
      `Keep approval persistence unimplemented for ${lane} and do not claim stored approval evidence exists.`,
    resultPersistenceMissingRecovery:
      `Keep result persistence unimplemented for ${lane} and do not claim stored result references exist.`,
    artifactPersistenceMissingRecovery:
      `Keep artifact persistence unimplemented for ${lane} and do not claim stored packet artifacts exist.`,
    databaseWriteBlockedRecovery:
      `Keep database writes blocked for ${lane} and do not introduce any database mutation path.`,
    fileWriteBlockedRecovery:
      `Keep file writes blocked for ${lane} and do not introduce any file mutation path.`,
    privacyRedactionRecovery:
      `Review privacy and redaction posture for ${lane} before any backend packet discussion continues.`,
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    operatorActionRequired:
      `Review ${lane} manually and carry blocked audit/approval join evidence into the backend-owned synthetic dry-run end-to-end packet contract batch.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
    explicitNoRetryNoFallbackNoPersistenceStatement:
      "No retry. No fallback. No persistence. Manual review only.",
  };
}

function buildRecoveryReadinessChecklistRecord(
  seed: AuditApprovalJoinRecoveryReadinessChecklistSeed
): AuditApprovalJoinRecoveryReadinessChecklistRecord {
  return {
    key: buildStableAuditApprovalJoinRecoveryReadinessChecklistKey(
      seed.checklistId
    ),
    checklistVersion:
      "backend-owned-synthetic-dry-run-audit-approval-join-recovery-readiness-checklist-v1",
    previewOnlyStatement: "audit and approval join recovery readiness is preview-only",
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    endToEndPacketContractDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

function buildReviewAuditSummary(
  review: BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord,
  decision: AuditApprovalJoinDecisionReviewRecord,
  recoveryPlan: AuditApprovalJoinRecoveryPlanPreviewRecord
): AuditApprovalJoinReviewAuditSummaryRecord {
  return {
    key: buildStableAuditApprovalJoinReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-synthetic-dry-run-audit-approval-join-review-audit-summary-preview-v1",
    previewOnlyStatement:
      "audit and approval join review audit summary is preview-only",
    auditApprovalJoinReviewId: review.id,
    label: `${review.label} audit summary`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    auditPosture: "preview-only",
    auditReferenceState: "not persisted",
    approvalReferenceState: "not persisted",
    resultReferenceState: "not persisted",
    evidencePacketState: "preview-only",
    evidenceSummary:
      `Review references remain preview-only for ${review.selectedCapabilityFamily.label}: ${review.sourceAuditApprovalJoinContractReference}, ${review.sourceSyntheticAuditJoinContractReference}, ${review.sourceSyntheticApprovalJoinContractReference}, ${review.sourceResultToAuditApprovalLinkReference}, and ${review.sourceAuditApprovalEvidencePacketReference}.`,
    failedGateSummary: decision.topBlockingGates.join(" | "),
    recoverySummary:
      `${recoveryPlan.recoveryPosture}. ${recoveryPlan.retryPosture} retry posture. ${recoveryPlan.fallbackPosture} fallback posture.`,
    blockedActionSummary:
      "decision state is held / not joined. join request is not created. join invocation is not invoked. join response is not received. join error is not received. audit persistence is not implemented. approval persistence is not implemented. result persistence is not implemented. database write is not implemented. file write is not implemented.",
    noAuditPersistenceStatement: "No audit persistence",
    noApprovalPersistenceStatement: "No approval persistence",
    noResultPersistenceStatement: "No result persistence",
    noDatabaseWriteStatement: "No database write",
    noFileWriteStatement: "No file write",
    endToEndPacketContractRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
  };
}

function buildAcceptancePosture(
  review: BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord
): AuditApprovalJoinAcceptancePostureRecord {
  const lane = review.selectedCapabilityFamily.label;

  return {
    key: buildStableAuditApprovalJoinAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-synthetic-dry-run-audit-approval-join-acceptance-posture-preview-v1",
    previewOnlyStatement: "audit and approval join acceptance posture is preview-only",
    auditApprovalJoinReviewId: review.id,
    label: `${review.label} acceptance posture`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    acceptanceState: "not accepted / preview-only",
    acceptanceBlockers: [
      "decision state: held / not joined",
      "join request state: not created",
      "join invocation state: not invoked",
      "join response state: not received",
      "join error state: not received",
    ],
    safetyBlockers: [
      "manual confirmation required",
      "kill switch required",
      "audit required",
      "execution posture: blocked by default",
    ],
    privacyBlockers: [
      "privacy/redaction required",
      "opaque credential references only",
      "no plaintext secrets",
    ],
    costRateBlockers: [
      "cost acknowledgement required",
      "rate limit guard required",
      "timeout/cancel guard required",
    ],
    auditBlockers: [
      "audit join state: not persisted",
      "audit envelope state: not created",
      "audit append state: not appended",
      "audit persistence state: not implemented",
    ],
    approvalBlockers: [
      "approval join state: not persisted",
      "approval envelope state: not created",
      "approval append state: not appended",
      "approval persistence state: not implemented",
      "manual approval required",
    ],
    resultLinkBlockers: [
      "result reference state: not persisted",
      "result id state: not issued",
      "result digest posture: deterministic preview digest only",
    ],
    evidencePacketBlockers: [
      "evidence packet state: preview-only",
      "synthetic fixture result state: static placeholder only",
      "provider response state: not received",
      "model output state: not generated",
    ],
    persistenceBlockers: [
      "result persistence state: not implemented",
      "audit persistence state: not implemented",
      "approval persistence state: not implemented",
      "artifact persistence state: not implemented",
    ],
    databaseFileBlockers: [
      "database write state: not implemented",
      "file write state: not implemented",
    ],
    queueWorkerJobBlockers: [
      "queue dispatch is blocked",
      "worker dispatch is blocked",
      "job execution is blocked",
    ],
    requiredEvidence: [
      `A reviewed audit join contract and approval join contract for ${lane} that remain preview-only and non-persistent.`,
      `A reviewed evidence packet and deterministic digest posture for ${lane}.`,
      "A backend-owned packet design that still remains absent from this preview-only batch.",
    ],
    nextSafeAction:
      `Keep ${lane} not accepted, keep audit/approval joins non-persistent, and carry blockers into the backend-owned synthetic dry-run end-to-end packet contract batch.`,
    explicitNoAcceptanceNoPersistenceStatement:
      "No acceptance. No persistence. Preview-only.",
  };
}

const AUDIT_APPROVAL_JOIN_REVIEWS = JOIN_CONTRACTS.map(buildReview);
const AUDIT_APPROVAL_JOIN_DECISION_REVIEWS =
  AUDIT_APPROVAL_JOIN_REVIEWS.map(buildDecisionReview);
const AUDIT_APPROVAL_JOIN_GATE_FAILURE_REVIEWS =
  AUDIT_APPROVAL_JOIN_REVIEWS.flatMap((review) =>
    GATE_FAILURE_SEEDS.map((seed) => buildGateFailureReview(review, seed))
  );
const AUDIT_APPROVAL_JOIN_RECOVERY_PLAN_PREVIEWS =
  AUDIT_APPROVAL_JOIN_REVIEWS.map(buildRecoveryPlan);
const AUDIT_APPROVAL_JOIN_RECOVERY_READINESS_CHECKLIST_RECORDS =
  RECOVERY_READINESS_CHECKLIST_SEEDS.map(buildRecoveryReadinessChecklistRecord);
const AUDIT_APPROVAL_JOIN_DECISION_REVIEWS_BY_ID = new Map(
  AUDIT_APPROVAL_JOIN_DECISION_REVIEWS.map((record) => [
    record.auditApprovalJoinReviewId,
    record,
  ] as const)
);
const AUDIT_APPROVAL_JOIN_RECOVERY_PLANS_BY_ID = new Map(
  AUDIT_APPROVAL_JOIN_RECOVERY_PLAN_PREVIEWS.map((record) => [
    record.auditApprovalJoinReviewId,
    record,
  ] as const)
);
const AUDIT_APPROVAL_JOIN_REVIEW_AUDIT_SUMMARIES =
  AUDIT_APPROVAL_JOIN_REVIEWS.map((review) => {
    const decision = AUDIT_APPROVAL_JOIN_DECISION_REVIEWS_BY_ID.get(review.id);
    const recoveryPlan = AUDIT_APPROVAL_JOIN_RECOVERY_PLANS_BY_ID.get(review.id);

    if (!decision || !recoveryPlan) {
      throw new Error(`Missing review audit summary dependencies for ${review.id}`);
    }

    return buildReviewAuditSummary(review, decision, recoveryPlan);
  });
const AUDIT_APPROVAL_JOIN_ACCEPTANCE_POSTURES =
  AUDIT_APPROVAL_JOIN_REVIEWS.map(buildAcceptancePosture);

function cloneReview(
  record: BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord
): BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function cloneDecisionReview(
  record: AuditApprovalJoinDecisionReviewRecord
): AuditApprovalJoinDecisionReviewRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
    topBlockingGates: cloneList(record.topBlockingGates),
    topMissingEvidence: cloneList(record.topMissingEvidence),
    operatorReviewNotes: cloneList(record.operatorReviewNotes),
  };
}

function cloneGateFailureReview(
  record: AuditApprovalJoinGateFailureReviewRecord
): AuditApprovalJoinGateFailureReviewRecord {
  return {
    ...record,
    affectedCapabilityFamily: cloneCapabilityFamily(record.affectedCapabilityFamily),
  };
}

function cloneRecoveryPlan(
  record: AuditApprovalJoinRecoveryPlanPreviewRecord
): AuditApprovalJoinRecoveryPlanPreviewRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function cloneRecoveryReadinessChecklist(
  record: AuditApprovalJoinRecoveryReadinessChecklistRecord
): AuditApprovalJoinRecoveryReadinessChecklistRecord {
  return { ...record };
}

function cloneReviewAuditSummary(
  record: AuditApprovalJoinReviewAuditSummaryRecord
): AuditApprovalJoinReviewAuditSummaryRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function cloneAcceptancePosture(
  record: AuditApprovalJoinAcceptancePostureRecord
): AuditApprovalJoinAcceptancePostureRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
    acceptanceBlockers: cloneList(record.acceptanceBlockers),
    safetyBlockers: cloneList(record.safetyBlockers),
    privacyBlockers: cloneList(record.privacyBlockers),
    costRateBlockers: cloneList(record.costRateBlockers),
    auditBlockers: cloneList(record.auditBlockers),
    approvalBlockers: cloneList(record.approvalBlockers),
    resultLinkBlockers: cloneList(record.resultLinkBlockers),
    evidencePacketBlockers: cloneList(record.evidencePacketBlockers),
    persistenceBlockers: cloneList(record.persistenceBlockers),
    databaseFileBlockers: cloneList(record.databaseFileBlockers),
    queueWorkerJobBlockers: cloneList(record.queueWorkerJobBlockers),
    requiredEvidence: cloneList(record.requiredEvidence),
  };
}

export function listBackendOwnedSyntheticDryRunAuditApprovalJoinReviews():
  readonly BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord[] {
  return AUDIT_APPROVAL_JOIN_REVIEWS.map((record) => cloneReview(record));
}

export function listAuditApprovalJoinDecisionReviewRecords():
  readonly AuditApprovalJoinDecisionReviewRecord[] {
  return AUDIT_APPROVAL_JOIN_DECISION_REVIEWS.map((record) =>
    cloneDecisionReview(record)
  );
}

export function listAuditApprovalJoinGateFailureReviewRecords():
  readonly AuditApprovalJoinGateFailureReviewRecord[] {
  return AUDIT_APPROVAL_JOIN_GATE_FAILURE_REVIEWS.map((record) =>
    cloneGateFailureReview(record)
  );
}

export function listAuditApprovalJoinRecoveryPlanPreviews():
  readonly AuditApprovalJoinRecoveryPlanPreviewRecord[] {
  return AUDIT_APPROVAL_JOIN_RECOVERY_PLAN_PREVIEWS.map((record) =>
    cloneRecoveryPlan(record)
  );
}

export function listAuditApprovalJoinRecoveryReadinessChecklistRecords():
  readonly AuditApprovalJoinRecoveryReadinessChecklistRecord[] {
  return AUDIT_APPROVAL_JOIN_RECOVERY_READINESS_CHECKLIST_RECORDS.map((record) =>
    cloneRecoveryReadinessChecklist(record)
  );
}

export function listAuditApprovalJoinReviewAuditSummaries():
  readonly AuditApprovalJoinReviewAuditSummaryRecord[] {
  return AUDIT_APPROVAL_JOIN_REVIEW_AUDIT_SUMMARIES.map((record) =>
    cloneReviewAuditSummary(record)
  );
}

export function listAuditApprovalJoinAcceptancePostureRecords():
  readonly AuditApprovalJoinAcceptancePostureRecord[] {
  return AUDIT_APPROVAL_JOIN_ACCEPTANCE_POSTURES.map((record) =>
    cloneAcceptancePosture(record)
  );
}

export function groupAuditApprovalJoinReviewsByCapabilityFamily():
  readonly AuditApprovalJoinReviewCapabilityFamilyGroup[] {
  const groups = new Map<
    AuditApprovalJoinReviewCapabilityFamilyGroup["capabilityFamilyId"],
    {
      capabilityFamilyLabel: AuditApprovalJoinReviewCapabilityFamilyGroup["capabilityFamilyLabel"];
      reviews: BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord[];
    }
  >();

  for (const review of AUDIT_APPROVAL_JOIN_REVIEWS) {
    const existing = groups.get(review.selectedCapabilityFamily.id);

    if (existing) {
      existing.reviews.push(review);
      continue;
    }

    groups.set(review.selectedCapabilityFamily.id, {
      capabilityFamilyLabel: review.selectedCapabilityFamily.label,
      reviews: [review],
    });
  }

  return Array.from(groups.entries()).map(([capabilityFamilyId, value]) => ({
    capabilityFamilyId,
    capabilityFamilyLabel: value.capabilityFamilyLabel,
    reviewCount: value.reviews.length,
    reviews: value.reviews.map((review) => cloneReview(review)),
  }));
}

export function groupAuditApprovalJoinReviewsByWorkspaceTarget():
  readonly AuditApprovalJoinReviewWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedSyntheticDryRunAuditApprovalJoinReviewRecord[]
  >();

  for (const review of AUDIT_APPROVAL_JOIN_REVIEWS) {
    const existing = groups.get(review.workspaceTarget);

    if (existing) {
      existing.push(review);
      continue;
    }

    groups.set(review.workspaceTarget, [review]);
  }

  return Array.from(groups.entries()).map(([workspaceTarget, reviews]) => ({
    workspaceTarget,
    reviewCount: reviews.length,
    reviews: reviews.map((review) => cloneReview(review)),
  }));
}

export function buildAuditApprovalJoinReviewSummary():
  AuditApprovalJoinReviewSummary {
  const capabilityGroups = groupAuditApprovalJoinReviewsByCapabilityFamily();
  const workspaceGroups = groupAuditApprovalJoinReviewsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
    reviewCount: AUDIT_APPROVAL_JOIN_REVIEWS.length,
    decisionReviewCount: AUDIT_APPROVAL_JOIN_DECISION_REVIEWS.length,
    gateFailureReviewCount: AUDIT_APPROVAL_JOIN_GATE_FAILURE_REVIEWS.length,
    recoveryPlanCount: AUDIT_APPROVAL_JOIN_RECOVERY_PLAN_PREVIEWS.length,
    recoveryReadinessChecklistCount:
      AUDIT_APPROVAL_JOIN_RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    auditSummaryCount: AUDIT_APPROVAL_JOIN_REVIEW_AUDIT_SUMMARIES.length,
    acceptancePostureCount: AUDIT_APPROVAL_JOIN_ACCEPTANCE_POSTURES.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildAuditApprovalJoinGateFailureSummary():
  AuditApprovalJoinGateFailureSummary {
  const uniqueFailedGates = Array.from(
    new Map(
      AUDIT_APPROVAL_JOIN_GATE_FAILURE_REVIEWS.map((record) => [
        record.failedGateId,
        record,
      ] as const)
    ).values()
  );

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    gateFailureReviewCount: AUDIT_APPROVAL_JOIN_GATE_FAILURE_REVIEWS.length,
    uniqueFailedGateCount: uniqueFailedGates.length,
    criticalGateCount: uniqueFailedGates.filter(
      (record) => record.severity === "critical"
    ).length,
    highGateCount: uniqueFailedGates.filter(
      (record) => record.severity === "high"
    ).length,
    mediumGateCount: uniqueFailedGates.filter(
      (record) => record.severity === "medium"
    ).length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
  };
}

export function buildAuditApprovalJoinRecoverySummary():
  AuditApprovalJoinRecoverySummary {
  const blockedChecklistCount =
    AUDIT_APPROVAL_JOIN_RECOVERY_READINESS_CHECKLIST_RECORDS.filter(
      (record) => record.state === "blocked"
    ).length;

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    recoveryPlanCount: AUDIT_APPROVAL_JOIN_RECOVERY_PLAN_PREVIEWS.length,
    recoveryReadinessChecklistCount:
      AUDIT_APPROVAL_JOIN_RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    blockedChecklistCount,
    acceptancePostureCount: AUDIT_APPROVAL_JOIN_ACCEPTANCE_POSTURES.length,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_END_TO_END_PACKET_CONTRACT_BATCH,
    nextSafeAction:
      "Keep audit and approval join review preview-only, manual-review-only, and non-persistent until the backend-owned synthetic dry-run end-to-end packet contract is introduced.",
  };
}

export function buildEndToEndPacketContractChecklist():
  readonly string[] {
  return cloneList(END_TO_END_PACKET_CONTRACT_CHECKLIST);
}
