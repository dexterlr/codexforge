import type {
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  listBackendOwnedSyntheticDryRunResultCaptureContracts,
  listResultCaptureAuditApprovalJoinPreviews,
  listResultCaptureErrorContracts,
  listResultCaptureGateRecords,
  listResultCaptureReadinessMatrixRecords,
  listResultCaptureRequestContracts,
  listResultCaptureResponseContracts,
  listSyntheticResultEnvelopeContracts,
  type BackendOwnedSyntheticDryRunResultCaptureContractRecord,
  type ResultCaptureAuditApprovalJoinPreviewRecord,
  type ResultCaptureContractId,
  type ResultCaptureErrorContractRecord,
  type ResultCaptureGateId,
  type ResultCaptureGateRecord,
  type ResultCaptureReadinessMatrixRecord,
  type ResultCaptureRequestContractRecord,
  type ResultCaptureResponseContractRecord,
  type SyntheticResultEnvelopeContractRecord,
} from "../backend-owned-synthetic-dry-run-result-capture-contract";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
  type BackendOwnedSyntheticDryRunResultCaptureReviewRecord,
  type ResultCaptureAcceptancePostureKey,
  type ResultCaptureAcceptancePostureRecord,
  type ResultCaptureDecisionReviewKey,
  type ResultCaptureDecisionReviewRecord,
  type ResultCaptureGateFailureId,
  type ResultCaptureGateFailureLabel,
  type ResultCaptureGateFailureReviewKey,
  type ResultCaptureGateFailureReviewRecord,
  type ResultCaptureGateFailureState,
  type ResultCaptureGateFailureSummary,
  type ResultCaptureRecoveryPlanKey,
  type ResultCaptureRecoveryPlanPreviewRecord,
  type ResultCaptureRecoveryReadinessChecklistId,
  type ResultCaptureRecoveryReadinessChecklistKey,
  type ResultCaptureRecoveryReadinessChecklistLabel,
  type ResultCaptureRecoveryReadinessChecklistRecord,
  type ResultCaptureRecoverySummary,
  type ResultCaptureReviewAuditSummaryKey,
  type ResultCaptureReviewAuditSummaryRecord,
  type ResultCaptureReviewCapabilityFamilyGroup,
  type ResultCaptureReviewId,
  type ResultCaptureReviewKey,
  type ResultCaptureReviewSeverity,
  type ResultCaptureReviewSummary,
  type ResultCaptureReviewWorkspaceGroup,
} from "./backend-owned-synthetic-dry-run-result-capture-review-recovery-preview-types";

type ResultCaptureDecisionSeed = Readonly<{
  topBlockingGateIds: readonly ResultCaptureGateFailureId[];
  topMissingEvidence: readonly string[];
  operatorReviewNotes: readonly string[];
  captureReasonSummary: string;
  manualRecoveryRequirement: string;
  nextSafeAction: string;
}>;

type ResultCaptureGateFailureSeed = Readonly<{
  id: ResultCaptureGateFailureId;
  label: ResultCaptureGateFailureLabel;
  state: ResultCaptureGateFailureState;
  severity: ResultCaptureReviewSeverity;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

type ResultCaptureRecoveryReadinessChecklistSeed = Readonly<{
  checklistId: ResultCaptureRecoveryReadinessChecklistId;
  label: ResultCaptureRecoveryReadinessChecklistLabel;
  state: ResultCaptureRecoveryReadinessChecklistRecord["state"];
  severity: ResultCaptureReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ResultCaptureRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const REVIEW_SUMMARY_LINES = [
  "backend-owned synthetic dry-run result capture review and recovery preview only",
  "synthetic result capture review is preview-only",
  "result capture decision review is preview-only",
  "result capture gate failure review is preview-only",
  "result capture recovery plan is preview-only",
  "result capture recovery readiness is preview-only",
  "result capture acceptance posture is preview-only",
  "result capture state is not captured",
  "result persistence is not implemented",
  "audit persistence is not implemented",
  "approval persistence is not implemented",
  "artifact persistence is not implemented",
  "database write is not implemented",
  "file write is not implemented",
  "provider response is not received",
  "model output is not generated",
  "synthetic fixture result is static placeholder only",
  "result id is not issued",
  "audit and approval joins are not persisted",
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
  "backend-owned synthetic dry-run audit and approval join contract next",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "synthetic runner skeleton gate failure",
  "synthetic output fixture gate failure",
  "synthetic error fixture gate failure",
  "synthetic result envelope gate failure",
  "result capture request gate failure",
  "result capture response gate failure",
  "result capture error gate failure",
  "audit join gate failure",
  "approval join gate failure",
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
  "artifact persistence gate failure",
  "database write gate failure",
  "file write gate failure",
  "queue/worker/job gates blocked",
] as const;

const RECOVERY_SUMMARY_LINES = [
  "result capture recovery plan is preview-only",
  "result capture recovery readiness is preview-only",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "result envelope review recovery",
  "capture request not created recovery",
  "capture response not received recovery",
  "audit join missing recovery",
  "approval join missing recovery",
  "persistence recovery",
  "database/file blocked recovery",
  "backend-owned synthetic dry-run audit and approval join contract next",
] as const;

const AUDIT_AND_APPROVAL_JOIN_CONTRACT_CHECKLIST = [
  "Review result capture decisions before introducing any audit or approval join contract shape.",
  "Carry held capture state, missing joins, and blocked persistence into the audit and approval join contract batch.",
  "Keep the next batch backend-owned, preview-safe, deterministic, and non-persistent while join references remain not persisted.",
  "Preserve no prompt sending, no model calls, no provider execution, no queue dispatch, no worker dispatch, and no job execution posture.",
  "Do not implement result persistence, audit persistence, approval persistence, database writes, or file writes when the join contract is introduced.",
] as const;

const RESULT_CAPTURE_CONTRACTS =
  listBackendOwnedSyntheticDryRunResultCaptureContracts();
const SYNTHETIC_RESULT_ENVELOPES = listSyntheticResultEnvelopeContracts();
const RESULT_CAPTURE_REQUESTS = listResultCaptureRequestContracts();
const RESULT_CAPTURE_RESPONSES = listResultCaptureResponseContracts();
const RESULT_CAPTURE_ERRORS = listResultCaptureErrorContracts();
const RESULT_CAPTURE_GATES = listResultCaptureGateRecords();
const RESULT_CAPTURE_READINESS = listResultCaptureReadinessMatrixRecords();
const RESULT_CAPTURE_JOIN_PREVIEWS = listResultCaptureAuditApprovalJoinPreviews();

const SYNTHETIC_RESULT_ENVELOPES_BY_ID = new Map(
  SYNTHETIC_RESULT_ENVELOPES.map((record) => [record.id, record] as const)
);
const RESULT_CAPTURE_REQUESTS_BY_ID = new Map(
  RESULT_CAPTURE_REQUESTS.map((record) => [record.id, record] as const)
);
const RESULT_CAPTURE_RESPONSES_BY_ID = new Map(
  RESULT_CAPTURE_RESPONSES.map((record) => [record.id, record] as const)
);
const RESULT_CAPTURE_ERRORS_BY_ID = new Map(
  RESULT_CAPTURE_ERRORS.map((record) => [record.id, record] as const)
);
const RESULT_CAPTURE_READINESS_BY_ID = new Map(
  RESULT_CAPTURE_READINESS.map((record) => [record.id, record] as const)
);
const RESULT_CAPTURE_JOIN_PREVIEWS_BY_ID = new Map(
  RESULT_CAPTURE_JOIN_PREVIEWS.map((record) => [record.id, record] as const)
);
const RESULT_CAPTURE_GATES_BY_ID = new Map(
  RESULT_CAPTURE_GATES.map((record) => [record.id, record] as const)
);

const DECISION_SEEDS = {
  "conversational-planning-request": {
    topBlockingGateIds: [
      "synthetic-result-envelope-gate",
      "result-capture-request-gate",
      "audit-join-gate",
    ],
    topMissingEvidence: [
      "A reviewed synthetic result envelope for the planning lane.",
      "A backend-owned capture request draft for the planning lane.",
      "An audit join contract preview that keeps review references non-persistent.",
    ],
    operatorReviewNotes: [
      "Planning remains review-only because no result is captured.",
      "The join contract is still the next safe backend-owned dependency.",
    ],
    captureReasonSummary:
      "Conversational planning remains held because the synthetic result envelope is preview-only, no capture request exists, and audit joins are not yet contract-defined.",
    manualRecoveryRequirement:
      "Review the planning lane envelope, capture request posture, and audit join dependency manually before any backend join contract is drafted.",
    nextSafeAction:
      "Keep the planning lane held and continue preview-only result capture review.",
  },
  "code-assistance-request": {
    topBlockingGateIds: [
      "result-capture-request-gate",
      "idempotency-replay-gate",
      "single-run-lock-gate",
    ],
    topMissingEvidence: [
      "A backend-owned capture request draft for the code lane.",
      "Deterministic idempotency and replay-block evidence.",
      "A single-run lock posture carried into the next join contract batch.",
    ],
    operatorReviewNotes: [
      "Code assistance remains not captured and not persisted.",
      "No retry or fallback posture may be introduced from the frontend.",
    ],
    captureReasonSummary:
      "Code assistance remains held because capture request creation is blocked and the idempotency, replay, and single-run safeguards are still review-only.",
    manualRecoveryRequirement:
      "Carry request creation, replay protection, and single-run lock review into the audit and approval join contract batch.",
    nextSafeAction:
      "Keep the code lane static and review-only with result capture held.",
  },
  "website-copy-code-request": {
    topBlockingGateIds: [
      "server-only-boundary-gate",
      "database-write-gate",
      "file-write-gate",
    ],
    topMissingEvidence: [
      "A server-only boundary review for website copy/code result capture.",
      "A backend-only database write contract that remains explicitly unimplemented.",
      "A backend-only file write contract that remains explicitly unimplemented.",
    ],
    operatorReviewNotes: [
      "Website copy/code stays frontend-blocked.",
      "No database or file write path may be implied from this batch.",
    ],
    captureReasonSummary:
      "Website copy/code remains held because server-only boundaries, database writes, and file writes all stay unimplemented and blocked.",
    manualRecoveryRequirement:
      "Review boundary and write-block posture manually before any join contract discussion continues.",
    nextSafeAction:
      "Keep the website lane not captured and not persistent.",
  },
  "product-video-request": {
    topBlockingGateIds: [
      "kill-switch-gate",
      "queue-dispatch-gate",
      "job-execution-gate",
    ],
    topMissingEvidence: [
      "Kill-switch review for future backend-owned video capture joins.",
      "Explicit queue blocking evidence for video result capture.",
      "A job execution boundary that remains blocked and non-runnable.",
    ],
    operatorReviewNotes: [
      "Video generation remains locked above the fold.",
      "Queue, worker, and job execution stay blocked from the frontend video console.",
    ],
    captureReasonSummary:
      "Product video remains held because the kill switch stays required and queue/job execution remains blocked with no backend join contract yet.",
    manualRecoveryRequirement:
      "Preserve the locked video console and carry queue and job boundaries into the next backend-owned join contract batch.",
    nextSafeAction:
      "Keep the video lane held and manual-review-only.",
  },
  "storyboard-image-request": {
    topBlockingGateIds: [
      "synthetic-output-fixture-gate",
      "privacy-redaction-gate",
      "opaque-credential-gate",
    ],
    topMissingEvidence: [
      "A reviewed synthetic output fixture for storyboard images.",
      "Privacy/redaction evidence for image result review.",
      "An opaque credential label reserved for backend-only use.",
    ],
    operatorReviewNotes: [
      "Storyboard image output remains static placeholder only.",
      "Credential posture stays opaque and non-executable.",
    ],
    captureReasonSummary:
      "Storyboard image remains held because the synthetic output fixture stays static, privacy review is incomplete, and credential posture remains opaque.",
    manualRecoveryRequirement:
      "Review output fixture posture, privacy/redaction, and opaque credentials without introducing live capture.",
    nextSafeAction:
      "Keep the image lane under review with result capture not created.",
  },
  "audio-narration-request": {
    topBlockingGateIds: [
      "cost-rate-timeout-gate",
      "result-capture-response-gate",
      "job-execution-gate",
    ],
    topMissingEvidence: [
      "Cost/rate/timeout review for audio narration capture.",
      "A backend-owned capture response contract that remains not received.",
      "A blocked job execution boundary for narration result handling.",
    ],
    operatorReviewNotes: [
      "Narration stays blocked while cost and timeout posture are incomplete.",
      "No job execution, retry, or fallback path exists for audio capture.",
    ],
    captureReasonSummary:
      "Audio narration remains held because cost/rate/timeout posture is incomplete, capture response is not received, and job execution remains blocked.",
    manualRecoveryRequirement:
      "Carry cost, response, and job boundaries into the audit and approval join contract batch with capture still held.",
    nextSafeAction:
      "Continue manual review and keep narration result capture disabled.",
  },
  "transcription-caption-request": {
    topBlockingGateIds: [
      "cost-rate-timeout-gate",
      "worker-dispatch-gate",
      "job-execution-gate",
    ],
    topMissingEvidence: [
      "Reviewed rate posture for transcription/caption capture.",
      "Worker isolation evidence for caption handling.",
      "Job execution evidence for backend-owned caption result capture.",
    ],
    operatorReviewNotes: [
      "Transcription remains blocked because throughput and worker posture are unresolved.",
      "Frontend review cannot create worker or job boundaries.",
    ],
    captureReasonSummary:
      "Transcription/caption remains held because rate posture is unresolved and worker/job execution remain blocked future dependencies.",
    manualRecoveryRequirement:
      "Carry rate, worker, and job reviews into the backend-owned join contract batch with no runnable path.",
    nextSafeAction:
      "Keep worker and job execution blocked for transcription capture.",
  },
  "embeddings-search-request": {
    topBlockingGateIds: [
      "result-persistence-gate",
      "audit-persistence-gate",
      "approval-join-gate",
    ],
    topMissingEvidence: [
      "A result persistence contract owned by a future backend layer.",
      "Audit persistence evidence that remains explicitly unimplemented.",
      "An approval join contract that keeps retrieval review linked but not persisted.",
    ],
    operatorReviewNotes: [
      "Embeddings/search stays preview-only because nothing is persisted.",
      "Audit and approval joins remain visible blockers.",
    ],
    captureReasonSummary:
      "Embeddings/search remains held because result and audit persistence are not implemented and approval joins are not yet contract-defined.",
    manualRecoveryRequirement:
      "Preserve preview-only retrieval review and carry join plus persistence work into the next backend-owned contract batch.",
    nextSafeAction:
      "Keep retrieval review static and not persisted.",
  },
  "safety-moderation-review-request": {
    topBlockingGateIds: [
      "operator-approval-gate",
      "audit-gate",
      "approval-join-gate",
    ],
    topMissingEvidence: [
      "Reviewed approval scope for moderation result capture.",
      "Audit evidence for the moderation lane.",
      "An approval join contract that keeps approval references non-persistent.",
    ],
    operatorReviewNotes: [
      "Moderation stays held until approval and audit posture are explicit.",
      "Approval joins remain visible blockers.",
    ],
    captureReasonSummary:
      "Safety/moderation remains held because approval scope, audit evidence, and approval joins are all still preview-only and not persisted.",
    manualRecoveryRequirement:
      "Review moderation approval and audit posture manually before the audit and approval join contract is drafted.",
    nextSafeAction:
      "Keep the moderation lane held and audit-backed only as preview data.",
  },
  "local-private-inference-request": {
    topBlockingGateIds: [
      "server-only-boundary-gate",
      "kill-switch-gate",
      "approval-join-gate",
    ],
    topMissingEvidence: [
      "A server-only local/private boundary review for capture joins.",
      "Kill-switch evidence for local/private inference review.",
      "An approval join contract for backend-owned local/private result review.",
    ],
    operatorReviewNotes: [
      "Local/private inference is still backend-only and not exempt from held posture.",
      "The frontend cannot dispatch or capture local/private runs.",
    ],
    captureReasonSummary:
      "Local/private inference remains held because the server-only boundary, kill switch, and approval join dependency all remain unresolved backend work.",
    manualRecoveryRequirement:
      "Preserve the backend-only local/private boundary and keep the lane review-only until the join contract exists.",
    nextSafeAction:
      "Maintain the held local/private posture and keep capture blocked.",
  },
  "audit-recovery-explanation-request": {
    topBlockingGateIds: [
      "audit-join-gate",
      "approval-join-gate",
      "result-capture-error-gate",
    ],
    topMissingEvidence: [
      "A reviewed audit join contract for recovery explanations.",
      "A reviewed approval join contract for recovery explanations.",
      "A capture error contract that remains not received and non-persistent.",
    ],
    operatorReviewNotes: [
      "Audit/recovery explanation remains preview-only.",
      "No stored result, audit record, or approval record exists in this batch.",
    ],
    captureReasonSummary:
      "Audit/recovery explanation remains held because audit joins, approval joins, and capture error handling are all still preview-only and not persisted.",
    manualRecoveryRequirement:
      "Review join dependencies and blocked capture error posture manually before the next backend-owned join contract is drafted.",
    nextSafeAction:
      "Keep audit/recovery explanation static and not persisted.",
  },
} as const satisfies Readonly<Record<ResultCaptureReviewId, ResultCaptureDecisionSeed>>;

const GATE_FAILURE_SEEDS = [
  {
    id: "synthetic-runner-skeleton-gate",
    label: "synthetic runner skeleton gate failure",
    state: "held / synthetic runner skeleton still review-only",
    severity: "high",
    operatorFacingExplanation:
      "The synthetic runner skeleton remains a reviewed dependency only and cannot drive any result capture transition.",
    requiredEvidenceToUnblock:
      "Backend-owned skeleton review evidence that still preserves inert result capture posture.",
    requiredRecoveryAction:
      "Keep the skeleton review-only and carry its dependency into the audit and approval join contract batch.",
    nextSafeAction:
      "Keep synthetic runner skeleton dependency visible with no execution path.",
  },
  {
    id: "synthetic-output-fixture-gate",
    label: "synthetic output fixture gate failure",
    state: "held / synthetic output fixture static placeholder only",
    severity: "high",
    operatorFacingExplanation:
      "Synthetic output fixtures remain static placeholders and cannot be treated as captured provider results.",
    requiredEvidenceToUnblock:
      "A reviewed static output fixture posture with explicit no-real-result boundaries.",
    requiredRecoveryAction:
      "Keep synthetic outputs placeholder-only and review the fixture envelope manually.",
    nextSafeAction:
      "Preserve fixture-only output posture and keep capture blocked.",
  },
  {
    id: "synthetic-error-fixture-gate",
    label: "synthetic error fixture gate failure",
    state: "held / synthetic error fixture static placeholder only",
    severity: "medium",
    operatorFacingExplanation:
      "Synthetic error fixtures remain placeholders and cannot be treated as live capture errors.",
    requiredEvidenceToUnblock:
      "A reviewed static error fixture posture that preserves no-retry and no-fallback boundaries.",
    requiredRecoveryAction:
      "Keep synthetic errors placeholder-only and review manual recovery posture.",
    nextSafeAction:
      "Preserve fixture-only error posture and keep capture blocked.",
  },
  {
    id: "synthetic-result-envelope-gate",
    label: "synthetic result envelope gate failure",
    state: "held / synthetic result envelope preview-only",
    severity: "critical",
    operatorFacingExplanation:
      "The synthetic result envelope is preview-only and cannot promote placeholder content into a captured result.",
    requiredEvidenceToUnblock:
      "A reviewed result envelope contract that still keeps provider response and model output not received.",
    requiredRecoveryAction:
      "Review result envelope references manually without claiming a real captured result exists.",
    nextSafeAction:
      "Keep the result envelope preview-only and deterministic.",
  },
  {
    id: "result-capture-request-gate",
    label: "result capture request gate failure",
    state: "held / result capture request not created",
    severity: "critical",
    operatorFacingExplanation:
      "No backend-owned result capture request exists, so result capture remains held by default.",
    requiredEvidenceToUnblock:
      "A future backend-owned capture request contract that remains non-runnable from the frontend.",
    requiredRecoveryAction:
      "Review request creation posture only and keep capture request state not created.",
    nextSafeAction:
      "Keep capture request creation blocked and preview-only.",
  },
  {
    id: "result-capture-response-gate",
    label: "result capture response gate failure",
    state: "held / result capture response not received",
    severity: "critical",
    operatorFacingExplanation:
      "No capture response is received because no request is created and no backend execution path exists.",
    requiredEvidenceToUnblock:
      "A future backend-owned capture response contract that remains explicitly not received.",
    requiredRecoveryAction:
      "Keep response state not received and preserve no-persistence boundaries.",
    nextSafeAction:
      "Keep capture response held and not received.",
  },
  {
    id: "result-capture-error-gate",
    label: "result capture error gate failure",
    state: "held / result capture error not received",
    severity: "high",
    operatorFacingExplanation:
      "No capture error is received because no request, response, or backend execution path exists.",
    requiredEvidenceToUnblock:
      "A future backend-owned capture error contract that remains non-executable and non-persistent.",
    requiredRecoveryAction:
      "Keep error state not received and preserve no-retry, no-fallback posture.",
    nextSafeAction:
      "Keep capture error handling preview-only and not persisted.",
  },
  {
    id: "audit-join-gate",
    label: "audit join gate failure",
    state: "held / audit join not persisted",
    severity: "critical",
    operatorFacingExplanation:
      "Audit joins remain not persisted, so review evidence cannot be joined to captured results.",
    requiredEvidenceToUnblock:
      "A backend-owned audit join contract that keeps review references explicit and non-persistent until later batches.",
    requiredRecoveryAction:
      "Carry audit join posture into the next batch without implementing persistence.",
    nextSafeAction:
      "Keep audit joins visible as missing and non-persistent.",
  },
  {
    id: "approval-join-gate",
    label: "approval join gate failure",
    state: "held / approval join not persisted",
    severity: "critical",
    operatorFacingExplanation:
      "Approval joins remain not persisted, so captured results cannot safely point at approval evidence.",
    requiredEvidenceToUnblock:
      "A backend-owned approval join contract that keeps approval references explicit and non-persistent until later batches.",
    requiredRecoveryAction:
      "Carry approval join posture into the next batch without implementing persistence.",
    nextSafeAction:
      "Keep approval joins visible as missing and non-persistent.",
  },
  {
    id: "operator-approval-gate",
    label: "operator approval gate failure",
    state: "held / operator approval missing",
    severity: "high",
    operatorFacingExplanation:
      "Operator approval is still required before any future backend-owned result capture path could be discussed.",
    requiredEvidenceToUnblock:
      "Explicit operator approval scope for future backend-owned result capture joins.",
    requiredRecoveryAction:
      "Keep approval missing and review the approval boundary manually.",
    nextSafeAction:
      "Keep operator approval required and capture held.",
  },
  {
    id: "manual-confirmation-gate",
    label: "manual confirmation gate failure",
    state: "held / manual confirmation missing",
    severity: "high",
    operatorFacingExplanation:
      "Manual confirmation remains required before any backend-owned capture path can advance.",
    requiredEvidenceToUnblock:
      "Manual confirmation posture carried into the audit and approval join contract.",
    requiredRecoveryAction:
      "Preserve manual confirmation as a visible blocker.",
    nextSafeAction:
      "Keep manual confirmation required and capture held.",
  },
  {
    id: "kill-switch-gate",
    label: "kill switch gate failure",
    state: "held / kill switch review required",
    severity: "high",
    operatorFacingExplanation:
      "Kill-switch posture remains required before any future capture execution path can exist.",
    requiredEvidenceToUnblock:
      "Kill-switch review evidence owned by a future backend-only execution path.",
    requiredRecoveryAction:
      "Keep the kill switch required and visible on all capture review records.",
    nextSafeAction:
      "Maintain kill-switch posture and keep capture blocked.",
  },
  {
    id: "audit-gate",
    label: "audit gate failure",
    state: "held / audit evidence missing",
    severity: "high",
    operatorFacingExplanation:
      "Audit evidence remains required and non-persistent, so capture stays held.",
    requiredEvidenceToUnblock:
      "Audit evidence requirements that remain visible and unresolved in preview-only posture.",
    requiredRecoveryAction:
      "Keep audit required and carry audit evidence posture into the next batch.",
    nextSafeAction:
      "Preserve audit posture and keep capture held.",
  },
  {
    id: "server-only-boundary-gate",
    label: "server-only boundary gate failure",
    state: "held / server-only boundary required",
    severity: "critical",
    operatorFacingExplanation:
      "Result capture remains server-only required and cannot be callable from frontend UI.",
    requiredEvidenceToUnblock:
      "A reviewed server-only boundary that still blocks frontend calls, fetches, and provider execution.",
    requiredRecoveryAction:
      "Keep frontend posture blocked and backend posture server-only required.",
    nextSafeAction:
      "Preserve server-only boundaries and keep capture blocked.",
  },
  {
    id: "opaque-credential-gate",
    label: "opaque credential gate failure",
    state: "held / opaque credential reference required",
    severity: "medium",
    operatorFacingExplanation:
      "Only opaque credential references are allowed, so no plaintext or frontend credential use may appear.",
    requiredEvidenceToUnblock:
      "Opaque credential reference labels for future backend-only result capture wiring.",
    requiredRecoveryAction:
      "Keep credential posture opaque and secret posture non-plaintext.",
    nextSafeAction:
      "Preserve opaque credential posture with no frontend secret reads.",
  },
  {
    id: "privacy-redaction-gate",
    label: "privacy/redaction gate failure",
    state: "held / privacy redaction incomplete",
    severity: "high",
    operatorFacingExplanation:
      "Privacy and redaction review remain incomplete, so captured outputs cannot be reviewed as acceptable results.",
    requiredEvidenceToUnblock:
      "Privacy and redaction evidence for future backend-owned capture joins.",
    requiredRecoveryAction:
      "Keep privacy/redaction required and review redaction posture manually.",
    nextSafeAction:
      "Preserve privacy posture and keep capture held.",
  },
  {
    id: "cost-rate-timeout-gate",
    label: "cost/rate/timeout gate failure",
    state: "held / cost rate timeout review incomplete",
    severity: "medium",
    operatorFacingExplanation:
      "Cost, rate, and timeout safeguards remain incomplete, so capture cannot be treated as ready.",
    requiredEvidenceToUnblock:
      "Cost acknowledgement, rate-limit, and timeout/cancel guard evidence for future backend-owned joins.",
    requiredRecoveryAction:
      "Keep cost/rate/timeout review visible and unresolved.",
    nextSafeAction:
      "Preserve cost/rate/timeout posture and keep capture held.",
  },
  {
    id: "idempotency-replay-gate",
    label: "idempotency/replay gate failure",
    state: "held / idempotency replay block not proven",
    severity: "high",
    operatorFacingExplanation:
      "Idempotency and replay-block posture remain required before captured results can be considered safe.",
    requiredEvidenceToUnblock:
      "Deterministic idempotency and replay-block requirements for a future backend-owned join contract.",
    requiredRecoveryAction:
      "Keep replay blocked and idempotency required.",
    nextSafeAction:
      "Preserve replay protection posture and keep capture held.",
  },
  {
    id: "single-run-lock-gate",
    label: "single-run lock gate failure",
    state: "held / single-run lock missing",
    severity: "high",
    operatorFacingExplanation:
      "Single-run lock posture remains required before any future capture path can advance.",
    requiredEvidenceToUnblock:
      "Single-run lock requirements carried into the backend-owned join contract.",
    requiredRecoveryAction:
      "Keep the single-run lock visible as a blocker.",
    nextSafeAction:
      "Preserve single-run lock posture and keep capture held.",
  },
  {
    id: "result-persistence-gate",
    label: "result persistence gate failure",
    state: "held / result persistence not implemented",
    severity: "critical",
    operatorFacingExplanation:
      "Result persistence is not implemented, so nothing can be treated as a stored captured result.",
    requiredEvidenceToUnblock:
      "A future backend-owned result persistence contract that remains absent in this batch.",
    requiredRecoveryAction:
      "Keep result persistence explicitly unimplemented.",
    nextSafeAction:
      "Preserve non-persistent result posture and keep capture held.",
  },
  {
    id: "audit-persistence-gate",
    label: "audit persistence gate failure",
    state: "held / audit persistence not implemented",
    severity: "critical",
    operatorFacingExplanation:
      "Audit persistence is not implemented, so no capture review evidence is stored.",
    requiredEvidenceToUnblock:
      "A future backend-owned audit persistence contract that remains absent in this batch.",
    requiredRecoveryAction:
      "Keep audit persistence explicitly unimplemented.",
    nextSafeAction:
      "Preserve non-persistent audit posture and keep capture held.",
  },
  {
    id: "approval-persistence-gate",
    label: "approval persistence gate failure",
    state: "held / approval persistence not implemented",
    severity: "critical",
    operatorFacingExplanation:
      "Approval persistence is not implemented, so no approval evidence is stored alongside result capture review.",
    requiredEvidenceToUnblock:
      "A future backend-owned approval persistence contract that remains absent in this batch.",
    requiredRecoveryAction:
      "Keep approval persistence explicitly unimplemented.",
    nextSafeAction:
      "Preserve non-persistent approval posture and keep capture held.",
  },
  {
    id: "artifact-persistence-gate",
    label: "artifact persistence gate failure",
    state: "held / artifact persistence not implemented",
    severity: "high",
    operatorFacingExplanation:
      "Artifact persistence is not implemented, so no captured artifact reference exists.",
    requiredEvidenceToUnblock:
      "A future backend-owned artifact persistence contract that remains absent in this batch.",
    requiredRecoveryAction:
      "Keep artifact persistence explicitly unimplemented.",
    nextSafeAction:
      "Preserve non-persistent artifact posture and keep capture held.",
  },
  {
    id: "database-write-gate",
    label: "database write gate failure",
    state: "held / database write not implemented",
    severity: "critical",
    operatorFacingExplanation:
      "Database writes are not implemented, so no capture state can be persisted.",
    requiredEvidenceToUnblock:
      "A future backend-owned database write contract that remains absent in this batch.",
    requiredRecoveryAction:
      "Keep database writes blocked and not implemented.",
    nextSafeAction:
      "Preserve no-database-write posture and keep capture held.",
  },
  {
    id: "file-write-gate",
    label: "file write gate failure",
    state: "held / file write not implemented",
    severity: "critical",
    operatorFacingExplanation:
      "File writes are not implemented, so no capture artifact or review file can be persisted.",
    requiredEvidenceToUnblock:
      "A future backend-owned file write contract that remains absent in this batch.",
    requiredRecoveryAction:
      "Keep file writes blocked and not implemented.",
    nextSafeAction:
      "Preserve no-file-write posture and keep capture held.",
  },
  {
    id: "queue-dispatch-gate",
    label: "queue dispatch gate failure",
    state: "held / queue dispatch blocked",
    severity: "medium",
    operatorFacingExplanation:
      "Queue dispatch remains blocked, so no backend-owned capture job can be enqueued.",
    requiredEvidenceToUnblock:
      "A future backend-owned queue boundary that remains blocked and non-runnable.",
    requiredRecoveryAction:
      "Keep queue dispatch blocked with no enqueue behavior.",
    nextSafeAction:
      "Preserve no-queue-dispatch posture and keep capture held.",
  },
  {
    id: "worker-dispatch-gate",
    label: "worker dispatch gate failure",
    state: "held / worker dispatch blocked",
    severity: "medium",
    operatorFacingExplanation:
      "Worker dispatch remains blocked, so no background capture worker can be assigned.",
    requiredEvidenceToUnblock:
      "A future backend-owned worker boundary that remains blocked and non-runnable.",
    requiredRecoveryAction:
      "Keep worker dispatch blocked with no pickup behavior.",
    nextSafeAction:
      "Preserve no-worker-dispatch posture and keep capture held.",
  },
  {
    id: "job-execution-gate",
    label: "job execution gate failure",
    state: "held / job execution blocked",
    severity: "medium",
    operatorFacingExplanation:
      "Job execution remains blocked, so no backend-owned result capture job can run.",
    requiredEvidenceToUnblock:
      "A future backend-owned job execution boundary that remains blocked and non-runnable.",
    requiredRecoveryAction:
      "Keep job execution blocked with no run behavior.",
    nextSafeAction:
      "Preserve no-job-execution posture and keep capture held.",
  },
] as const satisfies readonly ResultCaptureGateFailureSeed[];

const GATE_FAILURE_SEEDS_BY_ID = new Map(
  GATE_FAILURE_SEEDS.map((seed) => [seed.id, seed] as const)
);

const RECOVERY_READINESS_CHECKLIST_SEEDS = [
  {
    checklistId: "synthetic-runner-skeleton-reviewed",
    label: "synthetic runner skeleton reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed synthetic runner skeleton dependency reference for result capture review.",
    recoveryAction:
      "Keep the skeleton dependency visible and carry it into the next join contract batch.",
    owner: "operator",
    nextSafeAction: "Keep the skeleton dependency reviewed and non-executable.",
  },
  {
    checklistId: "synthetic-output-fixture-reviewed",
    label: "synthetic output fixture reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed static output fixture posture that preserves no-real-result boundaries.",
    recoveryAction:
      "Keep output fixtures placeholder-only and deterministic.",
    owner: "operator",
    nextSafeAction: "Keep output fixtures reviewed and placeholder-only.",
  },
  {
    checklistId: "synthetic-error-fixture-reviewed",
    label: "synthetic error fixture reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed static error fixture posture that preserves no-retry and no-fallback boundaries.",
    recoveryAction:
      "Keep error fixtures placeholder-only and deterministic.",
    owner: "operator",
    nextSafeAction: "Keep error fixtures reviewed and placeholder-only.",
  },
  {
    checklistId: "result-envelope-reviewed",
    label: "result envelope reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed synthetic result envelope contract for deterministic preview digest posture.",
    recoveryAction:
      "Keep the envelope preview-only and do not treat it as a captured result.",
    owner: "operator",
    nextSafeAction: "Keep result envelope review visible and non-persistent.",
  },
  {
    checklistId: "capture-request-contract-reviewed",
    label: "capture request contract reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed result capture request contract that remains not created.",
    recoveryAction:
      "Keep request creation blocked and preview-only.",
    owner: "operator",
    nextSafeAction: "Keep capture request contract reviewed and not created.",
  },
  {
    checklistId: "capture-response-contract-reviewed",
    label: "capture response contract reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed result capture response contract that remains not received.",
    recoveryAction:
      "Keep response receipt blocked and preview-only.",
    owner: "operator",
    nextSafeAction: "Keep capture response contract reviewed and not received.",
  },
  {
    checklistId: "capture-error-contract-reviewed",
    label: "capture error contract reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed result capture error contract that remains not received.",
    recoveryAction:
      "Keep error receipt blocked and preserve no-retry posture.",
    owner: "operator",
    nextSafeAction: "Keep capture error contract reviewed and not received.",
  },
  {
    checklistId: "capture-gates-reviewed",
    label: "capture gates reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed result capture gate set spanning approval, privacy, boundary, and persistence blockers.",
    recoveryAction:
      "Carry the gate set into the next join contract batch without granting any gate pass.",
    owner: "operator",
    nextSafeAction: "Keep capture gates reviewed and blocked.",
  },
  {
    checklistId: "capture-readiness-matrix-reviewed",
    label: "capture readiness matrix reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed readiness matrix showing capture-contract-only / not persistent posture.",
    recoveryAction:
      "Preserve readiness review and keep the current posture blocked.",
    owner: "operator",
    nextSafeAction: "Keep readiness reviewed and non-persistent.",
  },
  {
    checklistId: "audit-join-preview-reviewed",
    label: "audit join preview reviewed",
    state: "backend future required",
    severity: "critical",
    evidenceRequired:
      "A backend-owned audit join contract draft that remains absent from this batch.",
    recoveryAction:
      "Prepare the audit join contract next without persisting any references.",
    owner: "backend future",
    nextSafeAction: "Carry audit join review into the next backend-owned batch.",
  },
  {
    checklistId: "approval-join-preview-reviewed",
    label: "approval join preview reviewed",
    state: "backend future required",
    severity: "critical",
    evidenceRequired:
      "A backend-owned approval join contract draft that remains absent from this batch.",
    recoveryAction:
      "Prepare the approval join contract next without persisting any references.",
    owner: "backend future",
    nextSafeAction: "Carry approval join review into the next backend-owned batch.",
  },
  {
    checklistId: "result-digest-reviewed",
    label: "result digest reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed deterministic preview digest posture for synthetic result envelopes.",
    recoveryAction:
      "Keep digest posture preview-only and deterministic.",
    owner: "operator",
    nextSafeAction: "Keep digest review visible and non-persistent.",
  },
  {
    checklistId: "result-id-reviewed",
    label: "result id reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed result id posture showing result id not issued.",
    recoveryAction:
      "Keep result id not issued and review-only.",
    owner: "operator",
    nextSafeAction: "Keep result id posture reviewed and not issued.",
  },
  {
    checklistId: "privacy-redaction-reviewed",
    label: "privacy/redaction reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed privacy and redaction boundary for result capture previews.",
    recoveryAction:
      "Keep privacy/redaction required and unresolved for live execution.",
    owner: "safety review",
    nextSafeAction: "Preserve privacy posture and keep capture blocked.",
  },
  {
    checklistId: "cost-rate-reviewed",
    label: "cost/rate reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed cost acknowledgement and rate-limit posture for capture joins.",
    recoveryAction:
      "Keep cost and rate review visible and unresolved for execution.",
    owner: "safety review",
    nextSafeAction: "Preserve cost/rate posture and keep capture blocked.",
  },
  {
    checklistId: "timeout-cancel-reviewed",
    label: "timeout/cancel reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed timeout and cancel posture for future backend capture joins.",
    recoveryAction:
      "Keep timeout/cancel review visible and unresolved for execution.",
    owner: "safety review",
    nextSafeAction: "Preserve timeout/cancel posture and keep capture blocked.",
  },
  {
    checklistId: "idempotency-replay-reviewed",
    label: "idempotency/replay reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed idempotency and replay-block posture for future result capture runs.",
    recoveryAction:
      "Keep idempotency required and replay blocked.",
    owner: "operator",
    nextSafeAction: "Preserve replay protection posture and keep capture blocked.",
  },
  {
    checklistId: "single-run-lock-reviewed",
    label: "single-run lock reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed single-run lock posture for future result capture joins.",
    recoveryAction:
      "Keep the single-run lock requirement visible and unresolved.",
    owner: "operator",
    nextSafeAction: "Preserve single-run lock posture and keep capture blocked.",
  },
  {
    checklistId: "result-persistence-still-blocked",
    label: "result persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "A future backend-owned result persistence contract that does not exist in this batch.",
    recoveryAction:
      "Keep result persistence explicitly unimplemented.",
    owner: "backend future",
    nextSafeAction: "Preserve non-persistent result posture.",
  },
  {
    checklistId: "audit-persistence-still-blocked",
    label: "audit persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "A future backend-owned audit persistence contract that does not exist in this batch.",
    recoveryAction:
      "Keep audit persistence explicitly unimplemented.",
    owner: "backend future",
    nextSafeAction: "Preserve non-persistent audit posture.",
  },
  {
    checklistId: "approval-persistence-still-blocked",
    label: "approval persistence still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "A future backend-owned approval persistence contract that does not exist in this batch.",
    recoveryAction:
      "Keep approval persistence explicitly unimplemented.",
    owner: "backend future",
    nextSafeAction: "Preserve non-persistent approval posture.",
  },
  {
    checklistId: "database-writes-still-blocked",
    label: "database writes still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "A future backend-owned database write contract that does not exist in this batch.",
    recoveryAction:
      "Keep database writes explicitly blocked and not implemented.",
    owner: "backend future",
    nextSafeAction: "Preserve no-database-write posture.",
  },
  {
    checklistId: "file-writes-still-blocked",
    label: "file writes still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "A future backend-owned file write contract that does not exist in this batch.",
    recoveryAction:
      "Keep file writes explicitly blocked and not implemented.",
    owner: "backend future",
    nextSafeAction: "Preserve no-file-write posture.",
  },
  {
    checklistId: "queue-dispatch-still-blocked",
    label: "queue dispatch still blocked",
    state: "blocked",
    severity: "medium",
    evidenceRequired:
      "A future backend-owned queue boundary that remains blocked and non-runnable.",
    recoveryAction:
      "Keep queue dispatch explicitly blocked.",
    owner: "backend future",
    nextSafeAction: "Preserve no-queue-dispatch posture.",
  },
  {
    checklistId: "worker-dispatch-still-blocked",
    label: "worker dispatch still blocked",
    state: "blocked",
    severity: "medium",
    evidenceRequired:
      "A future backend-owned worker boundary that remains blocked and non-runnable.",
    recoveryAction:
      "Keep worker dispatch explicitly blocked.",
    owner: "backend future",
    nextSafeAction: "Preserve no-worker-dispatch posture.",
  },
  {
    checklistId: "job-execution-still-blocked",
    label: "job execution still blocked",
    state: "blocked",
    severity: "medium",
    evidenceRequired:
      "A future backend-owned job boundary that remains blocked and non-runnable.",
    recoveryAction:
      "Keep job execution explicitly blocked.",
    owner: "backend future",
    nextSafeAction: "Preserve no-job-execution posture.",
  },
] as const satisfies readonly ResultCaptureRecoveryReadinessChecklistSeed[];

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneCapabilityFamily(
  family: BackendOwnedSyntheticDryRunResultCaptureContractRecord["selectedCapabilityFamily"]
): BackendOwnedSyntheticDryRunResultCaptureContractRecord["selectedCapabilityFamily"] {
  return { ...family };
}

function requireEnvelope(id: ResultCaptureContractId): SyntheticResultEnvelopeContractRecord {
  const record = SYNTHETIC_RESULT_ENVELOPES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic result envelope for ${id}`);
  }

  return record;
}

function requireRequest(id: ResultCaptureContractId): ResultCaptureRequestContractRecord {
  const record = RESULT_CAPTURE_REQUESTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture request contract for ${id}`);
  }

  return record;
}

function requireResponse(id: ResultCaptureContractId): ResultCaptureResponseContractRecord {
  const record = RESULT_CAPTURE_RESPONSES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture response contract for ${id}`);
  }

  return record;
}

function requireError(id: ResultCaptureContractId): ResultCaptureErrorContractRecord {
  const record = RESULT_CAPTURE_ERRORS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture error contract for ${id}`);
  }

  return record;
}

function requireReadiness(id: ResultCaptureContractId): ResultCaptureReadinessMatrixRecord {
  const record = RESULT_CAPTURE_READINESS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture readiness record for ${id}`);
  }

  return record;
}

function requireJoinPreview(
  id: ResultCaptureContractId
): ResultCaptureAuditApprovalJoinPreviewRecord {
  const record = RESULT_CAPTURE_JOIN_PREVIEWS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture join preview for ${id}`);
  }

  return record;
}

function requireGate(id: ResultCaptureGateId): ResultCaptureGateRecord {
  const record = RESULT_CAPTURE_GATES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture gate record for ${id}`);
  }

  return record;
}

function resolveResultCaptureGateId(
  id: ResultCaptureGateFailureId
): ResultCaptureGateId {
  switch (id) {
    case "synthetic-runner-skeleton-gate":
      return "synthetic-runner-skeleton";
    case "synthetic-output-fixture-gate":
      return "synthetic-output-fixture";
    case "synthetic-error-fixture-gate":
      return "synthetic-error-fixture";
    case "synthetic-result-envelope-gate":
      return "synthetic-result-envelope";
    case "result-capture-request-gate":
      return "result-capture-request";
    case "result-capture-response-gate":
      return "result-capture-response";
    case "result-capture-error-gate":
      return "result-capture-error";
    case "audit-join-gate":
      return "audit";
    case "approval-join-gate":
      return "operator-approval";
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
    case "artifact-persistence-gate":
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

export function uniqueResultCaptureReviewDisplayStrings<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Array.from(new Set(values));
}

export function buildStableResultCaptureReviewKey(
  id: ResultCaptureReviewId
): ResultCaptureReviewKey {
  return `backend-owned-synthetic-dry-run-result-capture-review:${id}`;
}

export function buildStableResultCaptureDecisionReviewKey(
  id: ResultCaptureReviewId
): ResultCaptureDecisionReviewKey {
  return `backend-owned-synthetic-dry-run-result-capture-decision-review:${id}`;
}

export function buildStableResultCaptureGateFailureReviewKey(
  reviewId: ResultCaptureReviewId,
  gateId: ResultCaptureGateFailureId
): ResultCaptureGateFailureReviewKey {
  return `backend-owned-synthetic-dry-run-result-capture-gate-failure-review:${reviewId}:${gateId}`;
}

export function buildStableResultCaptureRecoveryPlanKey(
  id: ResultCaptureReviewId
): ResultCaptureRecoveryPlanKey {
  return `backend-owned-synthetic-dry-run-result-capture-recovery-plan:${id}`;
}

export function buildStableResultCaptureRecoveryReadinessChecklistKey(
  checklistId: ResultCaptureRecoveryReadinessChecklistId
): ResultCaptureRecoveryReadinessChecklistKey {
  return `backend-owned-synthetic-dry-run-result-capture-recovery-readiness:${checklistId}`;
}

export function buildStableResultCaptureReviewAuditSummaryKey(
  id: ResultCaptureReviewId
): ResultCaptureReviewAuditSummaryKey {
  return `backend-owned-synthetic-dry-run-result-capture-review-audit-summary:${id}`;
}

export function buildStableResultCaptureAcceptancePostureKey(
  id: ResultCaptureReviewId
): ResultCaptureAcceptancePostureKey {
  return `backend-owned-synthetic-dry-run-result-capture-acceptance-posture:${id}`;
}

function buildReview(
  contract: BackendOwnedSyntheticDryRunResultCaptureContractRecord
): BackendOwnedSyntheticDryRunResultCaptureReviewRecord {
  const envelope = requireEnvelope(contract.id);
  const request = requireRequest(contract.id);
  const response = requireResponse(contract.id);
  const error = requireError(contract.id);
  const readiness = requireReadiness(contract.id);
  const joinPreview = requireJoinPreview(contract.id);
  const primaryFailureId = DECISION_SEEDS[contract.id].topBlockingGateIds[0];
  const primaryGate = requireGate(resolveResultCaptureGateId(primaryFailureId));

  return {
    id: contract.id,
    key: buildStableResultCaptureReviewKey(contract.id),
    reviewVersion:
      "backend-owned-synthetic-dry-run-result-capture-review-preview-v1",
    previewOnlyStatement: "synthetic result capture review is preview-only",
    source: "Athena / Jarvis Model Gateway",
    reviewMode: "preview-only",
    reviewPosture: "result capture review / not persistent",
    label: `${contract.requestLabel} result capture review`,
    operatorRequestPhrase: contract.requestLabel,
    workspaceTarget: contract.workspaceTarget,
    sourceResultCaptureContractReference: contract.key,
    sourceSyntheticResultEnvelopeReference: envelope.key,
    sourceResultCaptureRequestReference: request.key,
    sourceResultCaptureResponseReference: response.key,
    sourceResultCaptureErrorReference: error.key,
    sourceResultCaptureGateReference: primaryGate.key,
    sourceResultCaptureReadinessReference: readiness.key,
    sourceResultCaptureAuditApprovalJoinReference: joinPreview.key,
    sourceSyntheticRunnerSkeletonReference:
      contract.sourceSyntheticRunnerSkeletonReference,
    sourceSyntheticOutputFixtureReference:
      contract.sourceSyntheticOutputFixtureReference,
    sourceSyntheticErrorFixtureReference:
      contract.sourceSyntheticErrorFixtureReference,
    sourceRunIntentReference: contract.sourceRunIntentReference,
    selectedCapabilityFamily: cloneCapabilityFamily(
      contract.selectedCapabilityFamily
    ),
    providerSlotLabel: contract.providerSlotLabel,
    backupProviderSlotLabel: contract.backupProviderSlotLabel,
    localPrivateAlternativeLabel: contract.localPrivateAlternativeLabel,
    resultCaptureState: contract.resultCaptureState,
    resultPersistenceState: contract.resultPersistenceState,
    auditPersistenceState: contract.auditPersistenceState,
    approvalPersistenceState: contract.approvalPersistenceState,
    artifactPersistenceState: contract.artifactPersistenceState,
    databaseWriteState: contract.databaseWriteState,
    fileWriteState: contract.fileWriteState,
    providerResponseState: contract.providerResponseState,
    modelOutputState: contract.modelOutputState,
    syntheticFixtureResultState: contract.syntheticFixtureResultState,
    resultEnvelopeState: contract.resultEnvelopeState,
    resultIdState: contract.resultIdState,
    resultDigestPosture: contract.resultDigestPosture,
    auditJoinState: envelope.auditJoinState,
    approvalJoinState: envelope.approvalJoinState,
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
    nextAuditAndApprovalJoinContractRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
  };
}

function buildDecisionReview(
  review: BackendOwnedSyntheticDryRunResultCaptureReviewRecord
): ResultCaptureDecisionReviewRecord {
  const seed = DECISION_SEEDS[review.id];
  const topBlockingGates = seed.topBlockingGateIds.map((gateId) => {
    const gate = GATE_FAILURE_SEEDS_BY_ID.get(gateId);

    if (!gate) {
      throw new Error(`Missing result capture gate failure seed for ${gateId}`);
    }

    return gate.label;
  });

  return {
    key: buildStableResultCaptureDecisionReviewKey(review.id),
    decisionReviewVersion:
      "backend-owned-synthetic-dry-run-result-capture-decision-review-preview-v1",
    previewOnlyStatement: "result capture decision review is preview-only",
    resultCaptureReviewId: review.id,
    label: `${review.label} decision review`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    sourceCaptureContractReference: review.sourceResultCaptureContractReference,
    sourceEnvelopeReference: review.sourceSyntheticResultEnvelopeReference,
    sourceCaptureRequestReference: review.sourceResultCaptureRequestReference,
    sourceCaptureResponseReference: review.sourceResultCaptureResponseReference,
    sourceCaptureErrorReference: review.sourceResultCaptureErrorReference,
    decisionState: "held / not captured",
    captureReasonSummary: seed.captureReasonSummary,
    topBlockingGates,
    topMissingEvidence: cloneList(seed.topMissingEvidence),
    operatorReviewNotes: cloneList(seed.operatorReviewNotes),
    manualRecoveryRequirement: seed.manualRecoveryRequirement,
    auditApprovalJoinDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
    explicitNoResultCaptureNoPersistenceStatement:
      "No result capture. No persistence.",
  };
}

function buildGateFailureReview(
  review: BackendOwnedSyntheticDryRunResultCaptureReviewRecord,
  seed: ResultCaptureGateFailureSeed
): ResultCaptureGateFailureReviewRecord {
  return {
    key: buildStableResultCaptureGateFailureReviewKey(review.id, seed.id),
    gateFailureReviewVersion:
      "backend-owned-synthetic-dry-run-result-capture-gate-failure-review-preview-v1",
    previewOnlyStatement: "result capture gate failure review is preview-only",
    resultCaptureReviewId: review.id,
    label: `${review.label} ${seed.label}`,
    failedGateId: seed.id,
    failedGateLabel: seed.label,
    gateState: seed.state,
    severity: seed.severity,
    affectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation: seed.operatorFacingExplanation,
    requiredEvidenceToUnblock: seed.requiredEvidenceToUnblock,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    auditApprovalJoinDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
    explicitNoGatePassStatement:
      "Gate remains blocked. No gate pass is granted.",
  };
}

function buildRecoveryPlan(
  review: BackendOwnedSyntheticDryRunResultCaptureReviewRecord
): ResultCaptureRecoveryPlanPreviewRecord {
  const lane = review.selectedCapabilityFamily.label;

  return {
    key: buildStableResultCaptureRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-synthetic-dry-run-result-capture-recovery-plan-preview-v1",
    previewOnlyStatement: "result capture recovery plan is preview-only",
    resultCaptureReviewId: review.id,
    label: `${review.label} recovery plan`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    recoveryPosture: "manual review only",
    missingSyntheticOutputRecovery:
      `Review the synthetic output fixture posture for ${lane} and keep output placeholder-only until backend-owned join contracts exist.`,
    missingSyntheticErrorRecovery:
      `Review the synthetic error fixture posture for ${lane} and keep error handling placeholder-only until backend-owned join contracts exist.`,
    resultEnvelopeReviewRecovery:
      `Review the synthetic result envelope for ${lane} without treating it as a real captured result.`,
    captureRequestNotCreatedRecovery:
      `Keep capture request state not created for ${lane} and do not create a live backend request path.`,
    captureResponseNotReceivedRecovery:
      `Keep capture response state not received for ${lane} and do not simulate a received response.`,
    captureErrorNotReceivedRecovery:
      `Keep capture error state not received for ${lane} and preserve no-retry, no-fallback posture.`,
    resultIdNotIssuedRecovery:
      `Keep result id state not issued for ${lane} and do not claim stored references exist.`,
    digestPreviewReviewRecovery:
      `Keep digest posture deterministic preview only for ${lane} and do not generate runtime digests.`,
    auditJoinMissingRecovery:
      `Carry audit join review for ${lane} into the next backend-owned join contract batch with no persistence.`,
    approvalJoinMissingRecovery:
      `Carry approval join review for ${lane} into the next backend-owned join contract batch with no persistence.`,
    resultPersistenceMissingRecovery:
      `Keep result persistence unimplemented for ${lane} and do not claim stored capture results exist.`,
    auditPersistenceMissingRecovery:
      `Keep audit persistence unimplemented for ${lane} and do not claim stored audit evidence exists.`,
    approvalPersistenceMissingRecovery:
      `Keep approval persistence unimplemented for ${lane} and do not claim stored approval evidence exists.`,
    artifactPersistenceMissingRecovery:
      `Keep artifact persistence unimplemented for ${lane} and do not claim stored artifact references exist.`,
    databaseWriteBlockedRecovery:
      `Keep database writes blocked for ${lane} and do not introduce any database mutation path.`,
    fileWriteBlockedRecovery:
      `Keep file writes blocked for ${lane} and do not introduce any file mutation path.`,
    queueDispatchBlockedRecovery:
      `Keep queue dispatch blocked for ${lane} and do not enqueue anything.`,
    workerDispatchBlockedRecovery:
      `Keep worker dispatch blocked for ${lane} and do not simulate worker pickup.`,
    jobExecutionBlockedRecovery:
      `Keep job execution blocked for ${lane} and do not create runnable jobs.`,
    privacyRedactionRecovery:
      `Review privacy and redaction posture for ${lane} before any backend join contract discussion continues.`,
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    operatorActionRequired:
      `Review ${lane} manually and carry blocked result capture evidence into the backend-owned synthetic dry-run audit and approval join contract batch.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
    explicitNoRetryNoFallbackNoPersistenceStatement:
      "No retry. No fallback. No persistence. Manual review only.",
  };
}

function buildRecoveryReadinessChecklistRecord(
  seed: ResultCaptureRecoveryReadinessChecklistSeed
): ResultCaptureRecoveryReadinessChecklistRecord {
  return {
    key: buildStableResultCaptureRecoveryReadinessChecklistKey(seed.checklistId),
    checklistVersion:
      "backend-owned-synthetic-dry-run-result-capture-recovery-readiness-checklist-v1",
    previewOnlyStatement: "result capture recovery readiness is preview-only",
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    auditApprovalJoinContractDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

function buildReviewAuditSummary(
  review: BackendOwnedSyntheticDryRunResultCaptureReviewRecord,
  decision: ResultCaptureDecisionReviewRecord,
  recoveryPlan: ResultCaptureRecoveryPlanPreviewRecord
): ResultCaptureReviewAuditSummaryRecord {
  return {
    key: buildStableResultCaptureReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-synthetic-dry-run-result-capture-review-audit-summary-preview-v1",
    previewOnlyStatement:
      "result capture review audit summary is preview-only",
    resultCaptureReviewId: review.id,
    label: `${review.label} audit summary`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    auditPosture: "preview-only",
    auditReferenceState: "not persisted",
    approvalReferenceState: "not persisted",
    resultReferenceState: "not persisted",
    evidenceSummary:
      `Review references remain preview-only for ${review.selectedCapabilityFamily.label}: ${review.sourceResultCaptureContractReference}, ${review.sourceSyntheticResultEnvelopeReference}, ${review.sourceResultCaptureRequestReference}, ${review.sourceResultCaptureResponseReference}, and ${review.sourceResultCaptureErrorReference}.`,
    failedGateSummary: decision.topBlockingGates.join(" | "),
    recoverySummary:
      `${recoveryPlan.recoveryPosture}. ${recoveryPlan.retryPosture} retry posture. ${recoveryPlan.fallbackPosture} fallback posture.`,
    blockedActionSummary:
      "result capture is not captured. result persistence is not implemented. audit persistence is not implemented. approval persistence is not implemented. database write is not implemented. file write is not implemented. queue dispatch is blocked. worker dispatch is blocked. job execution is blocked.",
    noResultPersistenceStatement: "No result persistence",
    noAuditPersistenceStatement: "No audit persistence",
    noApprovalPersistenceStatement: "No approval persistence",
    noDatabaseWriteStatement: "No database write",
    noFileWriteStatement: "No file write",
    auditApprovalJoinContractRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
  };
}

function buildAcceptancePosture(
  review: BackendOwnedSyntheticDryRunResultCaptureReviewRecord
): ResultCaptureAcceptancePostureRecord {
  const lane = review.selectedCapabilityFamily.label;

  return {
    key: buildStableResultCaptureAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-synthetic-dry-run-result-capture-acceptance-posture-preview-v1",
    previewOnlyStatement: "result capture acceptance posture is preview-only",
    resultCaptureReviewId: review.id,
    label: `${review.label} acceptance posture`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    acceptanceState: "not accepted / preview-only",
    acceptanceBlockers: [
      "result capture state is not captured",
      "provider response is not received",
      "model output is not generated",
      "result id is not issued",
    ],
    safetyBlockers: [
      "kill switch required",
      "manual confirmation required",
      "privacy/redaction required",
      "audit required",
    ],
    privacyBlockers: [
      "opaque credential references only",
      "no plaintext secrets",
      "privacy/redaction incomplete",
    ],
    costRateBlockers: [
      "cost acknowledgement required",
      "rate limit guard required",
      "timeout/cancel guard required",
    ],
    auditBlockers: [
      "audit required",
      "audit join not persisted",
      "audit persistence not implemented",
    ],
    approvalBlockers: [
      "manual approval required",
      "manual confirmation required",
      "approval join not persisted",
      "approval persistence not implemented",
    ],
    captureBlockers: [
      "synthetic result envelope gate failure",
      "result capture request gate failure",
      "result capture response gate failure",
      "result capture error gate failure",
    ],
    persistenceBlockers: [
      "result persistence not implemented",
      "audit persistence not implemented",
      "approval persistence not implemented",
      "artifact persistence not implemented",
    ],
    databaseFileBlockers: [
      "database write not implemented",
      "file write not implemented",
    ],
    queueWorkerJobBlockers: [
      "queue dispatch is blocked",
      "worker dispatch is blocked",
      "job execution is blocked",
    ],
    requiredEvidence: [
      `A reviewed result capture contract and deterministic envelope posture for ${lane}.`,
      `A reviewed audit and approval join contract for ${lane} that still keeps references non-persistent.`,
      "A backend-owned persistence design that remains absent from this preview-only batch.",
    ],
    nextSafeAction:
      `Keep ${lane} not accepted, keep result capture non-persistent, and carry blockers into the backend-owned synthetic dry-run audit and approval join contract batch.`,
    explicitNoAcceptanceNoPersistenceStatement:
      "No acceptance. No persistence. Preview-only.",
  };
}

const RESULT_CAPTURE_REVIEWS = RESULT_CAPTURE_CONTRACTS.map(buildReview);
const RESULT_CAPTURE_DECISION_REVIEWS =
  RESULT_CAPTURE_REVIEWS.map(buildDecisionReview);
const RESULT_CAPTURE_GATE_FAILURE_REVIEWS = RESULT_CAPTURE_REVIEWS.flatMap(
  (review) => GATE_FAILURE_SEEDS.map((seed) => buildGateFailureReview(review, seed))
);
const RESULT_CAPTURE_RECOVERY_PLAN_PREVIEWS =
  RESULT_CAPTURE_REVIEWS.map(buildRecoveryPlan);
const RESULT_CAPTURE_RECOVERY_READINESS_CHECKLIST_RECORDS =
  RECOVERY_READINESS_CHECKLIST_SEEDS.map(buildRecoveryReadinessChecklistRecord);
const RESULT_CAPTURE_DECISION_REVIEWS_BY_ID = new Map(
  RESULT_CAPTURE_DECISION_REVIEWS.map((record) => [
    record.resultCaptureReviewId,
    record,
  ] as const)
);
const RESULT_CAPTURE_RECOVERY_PLANS_BY_ID = new Map(
  RESULT_CAPTURE_RECOVERY_PLAN_PREVIEWS.map((record) => [
    record.resultCaptureReviewId,
    record,
  ] as const)
);
const RESULT_CAPTURE_REVIEW_AUDIT_SUMMARIES = RESULT_CAPTURE_REVIEWS.map(
  (review) => {
    const decision = RESULT_CAPTURE_DECISION_REVIEWS_BY_ID.get(review.id);
    const recoveryPlan = RESULT_CAPTURE_RECOVERY_PLANS_BY_ID.get(review.id);

    if (!decision || !recoveryPlan) {
      throw new Error(`Missing review audit summary dependencies for ${review.id}`);
    }

    return buildReviewAuditSummary(review, decision, recoveryPlan);
  }
);
const RESULT_CAPTURE_ACCEPTANCE_POSTURES =
  RESULT_CAPTURE_REVIEWS.map(buildAcceptancePosture);

function cloneReview(
  record: BackendOwnedSyntheticDryRunResultCaptureReviewRecord
): BackendOwnedSyntheticDryRunResultCaptureReviewRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function cloneDecisionReview(
  record: ResultCaptureDecisionReviewRecord
): ResultCaptureDecisionReviewRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
    topBlockingGates: cloneList(record.topBlockingGates),
    topMissingEvidence: cloneList(record.topMissingEvidence),
    operatorReviewNotes: cloneList(record.operatorReviewNotes),
  };
}

function cloneGateFailureReview(
  record: ResultCaptureGateFailureReviewRecord
): ResultCaptureGateFailureReviewRecord {
  return {
    ...record,
    affectedCapabilityFamily: cloneCapabilityFamily(record.affectedCapabilityFamily),
  };
}

function cloneRecoveryPlan(
  record: ResultCaptureRecoveryPlanPreviewRecord
): ResultCaptureRecoveryPlanPreviewRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function cloneRecoveryReadinessChecklist(
  record: ResultCaptureRecoveryReadinessChecklistRecord
): ResultCaptureRecoveryReadinessChecklistRecord {
  return { ...record };
}

function cloneReviewAuditSummary(
  record: ResultCaptureReviewAuditSummaryRecord
): ResultCaptureReviewAuditSummaryRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function cloneAcceptancePosture(
  record: ResultCaptureAcceptancePostureRecord
): ResultCaptureAcceptancePostureRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
    acceptanceBlockers: cloneList(record.acceptanceBlockers),
    safetyBlockers: cloneList(record.safetyBlockers),
    privacyBlockers: cloneList(record.privacyBlockers),
    costRateBlockers: cloneList(record.costRateBlockers),
    auditBlockers: cloneList(record.auditBlockers),
    approvalBlockers: cloneList(record.approvalBlockers),
    captureBlockers: cloneList(record.captureBlockers),
    persistenceBlockers: cloneList(record.persistenceBlockers),
    databaseFileBlockers: cloneList(record.databaseFileBlockers),
    queueWorkerJobBlockers: cloneList(record.queueWorkerJobBlockers),
    requiredEvidence: cloneList(record.requiredEvidence),
  };
}

export function listBackendOwnedSyntheticDryRunResultCaptureReviews():
  readonly BackendOwnedSyntheticDryRunResultCaptureReviewRecord[] {
  return RESULT_CAPTURE_REVIEWS.map((record) => cloneReview(record));
}

export function listResultCaptureDecisionReviews():
  readonly ResultCaptureDecisionReviewRecord[] {
  return RESULT_CAPTURE_DECISION_REVIEWS.map((record) =>
    cloneDecisionReview(record)
  );
}

export function listResultCaptureGateFailureReviewRecords():
  readonly ResultCaptureGateFailureReviewRecord[] {
  return RESULT_CAPTURE_GATE_FAILURE_REVIEWS.map((record) =>
    cloneGateFailureReview(record)
  );
}

export function listResultCaptureRecoveryPlanPreviews():
  readonly ResultCaptureRecoveryPlanPreviewRecord[] {
  return RESULT_CAPTURE_RECOVERY_PLAN_PREVIEWS.map((record) =>
    cloneRecoveryPlan(record)
  );
}

export function listResultCaptureRecoveryReadinessChecklistRecords():
  readonly ResultCaptureRecoveryReadinessChecklistRecord[] {
  return RESULT_CAPTURE_RECOVERY_READINESS_CHECKLIST_RECORDS.map((record) =>
    cloneRecoveryReadinessChecklist(record)
  );
}

export function listResultCaptureReviewAuditSummaries():
  readonly ResultCaptureReviewAuditSummaryRecord[] {
  return RESULT_CAPTURE_REVIEW_AUDIT_SUMMARIES.map((record) =>
    cloneReviewAuditSummary(record)
  );
}

export function listResultCaptureAcceptancePostureRecords():
  readonly ResultCaptureAcceptancePostureRecord[] {
  return RESULT_CAPTURE_ACCEPTANCE_POSTURES.map((record) =>
    cloneAcceptancePosture(record)
  );
}

export function groupResultCaptureReviewsByCapabilityFamily():
  readonly ResultCaptureReviewCapabilityFamilyGroup[] {
  const groups = new Map<
    ResultCaptureReviewCapabilityFamilyGroup["capabilityFamilyId"],
    {
      capabilityFamilyLabel: ResultCaptureReviewCapabilityFamilyGroup["capabilityFamilyLabel"];
      reviews: BackendOwnedSyntheticDryRunResultCaptureReviewRecord[];
    }
  >();

  for (const review of RESULT_CAPTURE_REVIEWS) {
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

export function groupResultCaptureReviewsByWorkspaceTarget():
  readonly ResultCaptureReviewWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedSyntheticDryRunResultCaptureReviewRecord[]
  >();

  for (const review of RESULT_CAPTURE_REVIEWS) {
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

export function buildResultCaptureReviewSummary():
  ResultCaptureReviewSummary {
  const capabilityGroups = groupResultCaptureReviewsByCapabilityFamily();
  const workspaceGroups = groupResultCaptureReviewsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
    reviewCount: RESULT_CAPTURE_REVIEWS.length,
    decisionReviewCount: RESULT_CAPTURE_DECISION_REVIEWS.length,
    gateFailureReviewCount: RESULT_CAPTURE_GATE_FAILURE_REVIEWS.length,
    recoveryPlanCount: RESULT_CAPTURE_RECOVERY_PLAN_PREVIEWS.length,
    recoveryReadinessChecklistCount:
      RESULT_CAPTURE_RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    auditSummaryCount: RESULT_CAPTURE_REVIEW_AUDIT_SUMMARIES.length,
    acceptancePostureCount: RESULT_CAPTURE_ACCEPTANCE_POSTURES.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildResultCaptureGateFailureSummary():
  ResultCaptureGateFailureSummary {
  const uniqueFailedGates = Array.from(
    new Map(
      RESULT_CAPTURE_GATE_FAILURE_REVIEWS.map((record) => [
        record.failedGateId,
        record,
      ] as const)
    ).values()
  );

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    gateFailureReviewCount: RESULT_CAPTURE_GATE_FAILURE_REVIEWS.length,
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
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
  };
}

export function buildResultCaptureRecoverySummary():
  ResultCaptureRecoverySummary {
  const blockedChecklistCount =
    RESULT_CAPTURE_RECOVERY_READINESS_CHECKLIST_RECORDS.filter(
      (record) => record.state === "blocked"
    ).length;

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    recoveryPlanCount: RESULT_CAPTURE_RECOVERY_PLAN_PREVIEWS.length,
    recoveryReadinessChecklistCount:
      RESULT_CAPTURE_RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    blockedChecklistCount,
    acceptancePostureCount: RESULT_CAPTURE_ACCEPTANCE_POSTURES.length,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
    nextSafeAction:
      "Keep result capture review-only, manual-review-only, and non-persistent until the backend-owned synthetic dry-run audit and approval join contract is introduced.",
  };
}

export function buildAuditAndApprovalJoinContractChecklist():
  readonly string[] {
  return cloneList(AUDIT_AND_APPROVAL_JOIN_CONTRACT_CHECKLIST);
}
