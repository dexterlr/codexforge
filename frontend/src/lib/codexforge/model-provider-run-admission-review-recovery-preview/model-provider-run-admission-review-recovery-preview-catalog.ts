import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyLabel,
  AthenaModelRoutingCapabilityFamilyRecord,
} from "../athena-model-routing-provider-selection-preview";
import {
  listAdmissionGateEvaluationRecords,
  listManualAdmissionAuditPreviews,
  listManualGatedModelProviderRunAdmissionPreviews,
  listManualRunAdmissionBlockerMatrix,
  listRunAdmissionTicketPreviews,
  type ManualRunAdmissionAuditPreviewRecord,
  type ManualRunAdmissionBlockerId,
  type ManualRunAdmissionBlockerRecord,
  type ManualRunAdmissionGateEvaluationRecord,
  type ManualRunAdmissionPreviewRecord,
  type ManualRunAdmissionTicketPreviewRecord,
} from "../manual-gated-model-provider-run-admission-preview";
import {
  listModelProviderApprovalPackets,
  listModelProviderRunIntentPreviews,
  type ModelProviderApprovalPacketRecord,
  type ModelProviderRunIntentPreviewRecord,
} from "../model-provider-approval-packet-run-intent-preview";
import {
  MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
  MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
  PREVIOUS_COMPLETED_MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
  type ModelProviderAdmissionDecisionReviewRecord,
  type ModelProviderAdmissionDecisionReviewKey,
  type ModelProviderAdmissionGateFailureId,
  type ModelProviderAdmissionGateFailureLabel,
  type ModelProviderAdmissionGateFailureReviewKey,
  type ModelProviderAdmissionGateFailureReviewRecord,
  type ModelProviderAdmissionGateFailureState,
  type ModelProviderAdmissionGateFailureSummary,
  type ModelProviderAdmissionRecoveryPlanKey,
  type ModelProviderAdmissionRecoveryPlanPreviewRecord,
  type ModelProviderAdmissionRecoveryReadinessChecklistId,
  type ModelProviderAdmissionRecoveryReadinessChecklistKey,
  type ModelProviderAdmissionRecoveryReadinessChecklistLabel,
  type ModelProviderAdmissionRecoveryReadinessChecklistRecord,
  type ModelProviderAdmissionReviewAuditSummaryKey,
  type ModelProviderAdmissionReviewAuditSummaryRecord,
  type ModelProviderAdmissionReviewId,
  type ModelProviderReviewSeverity,
  type ModelProviderRunAdmissionReviewCapabilityFamilyGroup,
  type ModelProviderRunAdmissionReviewKey,
  type ModelProviderRunAdmissionReviewRecord,
  type ModelProviderRunAdmissionReviewSummary,
  type ModelProviderRunAdmissionReviewWorkspaceGroup,
  type ModelProviderAdmissionRecoverySummary,
} from "./model-provider-run-admission-review-recovery-preview-types";

type AdmissionDecisionSeed = Readonly<{
  blockerId: ManualRunAdmissionBlockerId;
  topBlockingGateIds: readonly ModelProviderAdmissionGateFailureId[];
  topMissingEvidence: readonly string[];
  operatorReviewNotes: readonly string[];
  admissionReasonSummary: string;
  manualRecoveryRequirement: string;
  nextSafeAction: string;
}>;

type GateFailureSeed = Readonly<{
  id: ModelProviderAdmissionGateFailureId;
  label: ModelProviderAdmissionGateFailureLabel;
  state: ModelProviderAdmissionGateFailureState;
  severity: ModelProviderReviewSeverity;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

type RecoveryReadinessChecklistSeed = Readonly<{
  checklistId: ModelProviderAdmissionRecoveryReadinessChecklistId;
  label: ModelProviderAdmissionRecoveryReadinessChecklistLabel;
  state:
    | ModelProviderAdmissionRecoveryReadinessChecklistRecord["state"]
    | "blocked";
  severity: ModelProviderReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ModelProviderAdmissionRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const REVIEW_SUMMARY_LINES = [
  "model provider run admission review and recovery preview only",
  "admission review is preview-only",
  "decision review is preview-only",
  "gate failure review is preview-only",
  "recovery plan is preview-only",
  "recovery readiness is preview-only",
  "run admission state is not admitted",
  "admission decision remains held",
  "admission token is not issued",
  "admission lease is not created",
  "admission ticket is not issued",
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
  "backend-owned model provider run admission contract next",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "gate failure review is preview-only",
  "run admission state is not admitted",
  "admission decision remains held",
  "queue dispatch is blocked",
  "worker dispatch is blocked",
  "job execution is blocked",
  "No provider execution",
  "No queue dispatch",
  "No worker dispatch",
  "No job execution",
  "No persistence",
] as const;

const RECOVERY_SUMMARY_LINES = [
  "recovery plan is preview-only",
  "recovery readiness is preview-only",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "queue dispatch is blocked",
  "worker dispatch is blocked",
  "job execution is blocked",
  "backend-owned model provider run admission contract next",
] as const;

const MANUAL_RUN_ADMISSION_PREVIEWS =
  listManualGatedModelProviderRunAdmissionPreviews();
const ADMISSION_GATE_EVALUATIONS = listAdmissionGateEvaluationRecords();
const ADMISSION_TICKET_PREVIEWS = listRunAdmissionTicketPreviews();
const MANUAL_RUN_ADMISSION_BLOCKERS = listManualRunAdmissionBlockerMatrix();
const MANUAL_ADMISSION_AUDIT_PREVIEWS = listManualAdmissionAuditPreviews();
const APPROVAL_PACKETS = listModelProviderApprovalPackets();
const RUN_INTENT_PREVIEWS = listModelProviderRunIntentPreviews();

const MANUAL_RUN_ADMISSION_PREVIEWS_BY_ID = new Map(
  MANUAL_RUN_ADMISSION_PREVIEWS.map((preview) => [preview.id, preview] as const)
);
const ADMISSION_GATE_EVALUATIONS_BY_ID = new Map(
  ADMISSION_GATE_EVALUATIONS.map((record) => [record.id, record] as const)
);
const ADMISSION_TICKET_PREVIEWS_BY_ID = new Map(
  ADMISSION_TICKET_PREVIEWS.map((ticket) => [ticket.id, ticket] as const)
);
const MANUAL_RUN_ADMISSION_BLOCKERS_BY_ID = new Map(
  MANUAL_RUN_ADMISSION_BLOCKERS.map((blocker) => [blocker.blockerId, blocker] as const)
);
const MANUAL_ADMISSION_AUDIT_PREVIEWS_BY_ID = new Map(
  MANUAL_ADMISSION_AUDIT_PREVIEWS.map((preview) => [preview.id, preview] as const)
);
const APPROVAL_PACKETS_BY_ID = new Map(
  APPROVAL_PACKETS.map((packet) => [packet.id, packet] as const)
);
const RUN_INTENT_PREVIEWS_BY_ID = new Map(
  RUN_INTENT_PREVIEWS.map((runIntent) => [runIntent.id, runIntent] as const)
);

const DECISION_SEEDS = {
  "conversational-planning-request": {
    blockerId: "no-manual-approval",
    topBlockingGateIds: [
      "operator-approval-gate",
      "manual-confirmation-gate",
      "single-run-lock-gate",
    ],
    topMissingEvidence: [
      "Explicit operator approval for the planning lane.",
      "Manual confirmation for the held planning review.",
      "Single-run lock evidence owned by the future backend contract.",
    ],
    operatorReviewNotes: [
      "Planning remains review-first and not admitted until the operator scope is explicit.",
      "No prompt may be sent while the planning lane remains held.",
    ],
    admissionReasonSummary:
      "Conversational planning remains held because operator approval and manual confirmation are missing, and no backend-owned single-run lock exists.",
    manualRecoveryRequirement:
      "Manual approval and confirmation must be reviewed before the planning lane can move into a backend-owned contract discussion.",
    nextSafeAction:
      "Review approval scope and keep the planning lane not admitted.",
  },
  "code-assistance-request": {
    blockerId: "no-manual-confirmation",
    topBlockingGateIds: [
      "manual-confirmation-gate",
      "idempotency-replay-gate",
      "single-run-lock-gate",
    ],
    topMissingEvidence: [
      "Operator confirmation for the code assistance lane.",
      "Idempotency and replay-block evidence for a future backend-owned run.",
      "A single-run lock contract that is server-only.",
    ],
    operatorReviewNotes: [
      "Code assistance cannot move from preview into admission while confirmation is unresolved.",
      "Frontend review must not simulate a token, lease, queue, or worker.",
    ],
    admissionReasonSummary:
      "Code assistance remains held because manual confirmation, idempotency evidence, and a backend single-run lock are all missing.",
    manualRecoveryRequirement:
      "Capture manual confirmation and carry idempotency, replay, and single-run lock proof into the backend-owned contract.",
    nextSafeAction:
      "Keep the code lane held and review the future backend contract checklist.",
  },
  "website-copy-code-request": {
    blockerId: "no-server-only-adapter",
    topBlockingGateIds: [
      "server-only-adapter-gate",
      "operator-approval-gate",
      "queue-dispatch-gate",
    ],
    topMissingEvidence: [
      "A server-only adapter contract for the website copy/code lane.",
      "Operator approval for a website-targeted provider handoff.",
      "Backend queue admission evidence for a future run.",
    ],
    operatorReviewNotes: [
      "Website copy/code work stays frontend-blocked until the server-only adapter exists.",
      "No queue or worker path is permitted from this product surface.",
    ],
    admissionReasonSummary:
      "Website copy/code remains held because the frontend cannot cross the server-only adapter boundary and no backend queue admission exists.",
    manualRecoveryRequirement:
      "Review the adapter contract, maintain the frontend block, and keep the website lane review-only until the backend contract exists.",
    nextSafeAction:
      "Review server-only adapter readiness and keep queue dispatch blocked.",
  },
  "product-video-request": {
    blockerId: "provider-execution-blocked-by-default",
    topBlockingGateIds: [
      "kill-switch-gate",
      "queue-dispatch-gate",
      "job-execution-gate",
    ],
    topMissingEvidence: [
      "A reviewed kill-switch release posture for the video lane.",
      "Backend queue admission evidence for video execution.",
      "A backend job execution contract for video runs.",
    ],
    operatorReviewNotes: [
      "Video execution remains fully blocked and the control console stays locked.",
      "No queue, worker, or job may start a video run from the frontend.",
    ],
    admissionReasonSummary:
      "Product video remains held because the kill switch stays engaged and no backend queue, worker, or job contract exists.",
    manualRecoveryRequirement:
      "Maintain the kill switch, preserve the locked console, and push all execution design into the backend-owned contract.",
    nextSafeAction:
      "Keep the video lane blocked and continue manual review only.",
  },
  "storyboard-image-request": {
    blockerId: "prompt-payload-not-reviewed",
    topBlockingGateIds: [
      "prompt-payload-review-gate",
      "privacy-redaction-gate",
      "opaque-credential-gate",
    ],
    topMissingEvidence: [
      "A reviewed redacted prompt payload for storyboard generation.",
      "Privacy and redaction evidence for the image lane.",
      "An opaque credential reference label for future backend use.",
    ],
    operatorReviewNotes: [
      "Storyboard prompts stay redacted placeholder only.",
      "The image lane must remain held until privacy and credential posture is review-complete.",
    ],
    admissionReasonSummary:
      "Storyboard image remains held because prompt payload review, privacy/redaction evidence, and opaque credential posture are incomplete.",
    manualRecoveryRequirement:
      "Review the redacted prompt posture, complete privacy checks, and keep credentials reference-only for the backend contract.",
    nextSafeAction:
      "Keep prompt transmission not sent and continue manual review.",
  },
  "audio-narration-request": {
    blockerId: "timeout-cancel-posture-missing",
    topBlockingGateIds: [
      "cost-rate-timeout-gate",
      "manual-confirmation-gate",
      "job-execution-gate",
    ],
    topMissingEvidence: [
      "Timeout and cancel posture for narration.",
      "Cost acknowledgement and rate guard evidence.",
      "A backend job execution contract for the narration lane.",
    ],
    operatorReviewNotes: [
      "Narration remains blocked while timing and cost controls are unresolved.",
      "No admitted job or retry path exists for voice generation.",
    ],
    admissionReasonSummary:
      "Audio narration remains held because cost/rate/timeout controls are incomplete and no backend job contract exists.",
    manualRecoveryRequirement:
      "Review timeout, cancellation, and cost posture manually before carrying the lane into the backend contract.",
    nextSafeAction:
      "Keep the narration lane not admitted and leave retries disabled.",
  },
  "transcription-caption-request": {
    blockerId: "rate-limit-posture-unknown",
    topBlockingGateIds: [
      "cost-rate-timeout-gate",
      "worker-dispatch-gate",
      "job-execution-gate",
    ],
    topMissingEvidence: [
      "A rate-limit posture for transcription/captioning.",
      "Worker isolation evidence for a future backend worker.",
      "Job execution evidence for backend-owned caption processing.",
    ],
    operatorReviewNotes: [
      "Captioning remains held because throughput limits are unknown.",
      "Frontend review cannot create a worker or job path for transcription.",
    ],
    admissionReasonSummary:
      "Transcription/caption remains held because rate-limit posture is unknown and worker/job execution remain backend-only future work.",
    manualRecoveryRequirement:
      "Review rate, worker isolation, and backend job evidence before the transcription lane can move beyond held review.",
    nextSafeAction:
      "Keep worker and job dispatch blocked for transcription.",
  },
  "embeddings-search-request": {
    blockerId: "audit-persistence-not-implemented",
    topBlockingGateIds: [
      "audit-gate",
      "persistence-gate",
      "queue-dispatch-gate",
    ],
    topMissingEvidence: [
      "Persisted audit evidence for retrieval review.",
      "Result and audit persistence contracts owned by the backend.",
      "Queue admission evidence for retrieval workloads.",
    ],
    operatorReviewNotes: [
      "Retrieval review stays preview-only because nothing is persisted.",
      "Queue and audit joins must remain future backend work.",
    ],
    admissionReasonSummary:
      "Embeddings/search remains held because audit and result persistence are not implemented and queue dispatch is blocked.",
    manualRecoveryRequirement:
      "Review the audit posture, leave persistence unimplemented, and carry retrieval execution design into the backend contract.",
    nextSafeAction:
      "Keep retrieval audit review preview-only and not persisted.",
  },
  "safety-moderation-review-request": {
    blockerId: "no-manual-approval",
    topBlockingGateIds: [
      "operator-approval-gate",
      "audit-gate",
      "approval-revocation-gate",
    ],
    topMissingEvidence: [
      "Reviewed approval scope for moderation.",
      "Audit evidence for moderation-specific review posture.",
      "Approval revocation review evidence for the moderation lane.",
    ],
    operatorReviewNotes: [
      "Moderation stays held until approval scope is explicit and auditable.",
      "Revocation posture must remain visible before any future backend-owned moderation run exists.",
    ],
    admissionReasonSummary:
      "Safety/moderation remains held because approval scope, audit evidence, and revocation review are still unresolved.",
    manualRecoveryRequirement:
      "Review moderation approval scope, audit posture, and revocation handling manually before the backend contract is discussed.",
    nextSafeAction:
      "Keep the moderation lane held and approval-gated.",
  },
  "local-private-inference-request": {
    blockerId: "provider-execution-blocked-by-default",
    topBlockingGateIds: [
      "server-only-adapter-gate",
      "kill-switch-gate",
      "worker-dispatch-gate",
    ],
    topMissingEvidence: [
      "A reviewed server-only local/private adapter contract.",
      "Kill-switch review evidence for local/private inference.",
      "Backend worker isolation evidence for local/private execution.",
    ],
    operatorReviewNotes: [
      "Local/private inference is still backend-only and not exempt from the held posture.",
      "The frontend cannot execute or dispatch local/private runs.",
    ],
    admissionReasonSummary:
      "Local/private inference remains held because execution is blocked by default, the kill switch stays active, and worker isolation remains backend future work.",
    manualRecoveryRequirement:
      "Preserve the backend-only boundary and review local/private execution only through the future backend contract.",
    nextSafeAction:
      "Keep the local/private lane blocked and not admitted.",
  },
  "audit-recovery-explanation-request": {
    blockerId: "result-persistence-not-implemented",
    topBlockingGateIds: [
      "dry-run-result-review-gate",
      "acceptance-matrix-gate",
      "persistence-gate",
    ],
    topMissingEvidence: [
      "Dry-run result review evidence for the audit/recovery lane.",
      "Resolved acceptance matrix evidence.",
      "Result persistence evidence owned by the backend contract.",
    ],
    operatorReviewNotes: [
      "Audit/recovery explanation remains review-only until dry-run evidence is accepted.",
      "No stored result or audit record exists in this frontend batch.",
    ],
    admissionReasonSummary:
      "Audit/recovery explanation remains held because dry-run review, acceptance criteria, and result persistence are unresolved.",
    manualRecoveryRequirement:
      "Review dry-run evidence and acceptance posture manually while leaving result persistence unimplemented until the backend contract.",
    nextSafeAction:
      "Keep the audit/recovery lane held and static.",
  },
} as const satisfies Readonly<
  Record<ModelProviderAdmissionReviewId, AdmissionDecisionSeed>
>;

const GATE_FAILURE_SEEDS = [
  {
    id: "operator-approval-gate",
    label: "operator approval gate failure",
    state: "held / approval missing",
    severity: "critical",
    operatorFacingExplanation:
      "Operator approval is still required and no admission may move forward without it.",
    requiredEvidenceToUnblock:
      "Explicit operator approval scoped to the held run admission review.",
    requiredRecoveryAction:
      "Review scope manually and keep provider execution blocked until backend-owned approval joins exist.",
    nextSafeAction:
      "Keep the lane held and continue manual approval review only.",
  },
  {
    id: "manual-confirmation-gate",
    label: "manual confirmation gate failure",
    state: "held / confirmation missing",
    severity: "high",
    operatorFacingExplanation:
      "Manual confirmation remains missing, so the run cannot move beyond held posture.",
    requiredEvidenceToUnblock:
      "A reviewed operator confirmation for the specific capability lane.",
    requiredRecoveryAction:
      "Capture confirmation in review-only form and do not simulate execution or admission.",
    nextSafeAction:
      "Leave confirmation unresolved and keep the run not admitted.",
  },
  {
    id: "kill-switch-gate",
    label: "kill switch gate failure",
    state: "held / kill switch engaged",
    severity: "critical",
    operatorFacingExplanation:
      "The kill switch stays engaged by default while execution remains blocked.",
    requiredEvidenceToUnblock:
      "A reviewed kill-switch posture owned by the future backend contract.",
    requiredRecoveryAction:
      "Preserve the kill switch and keep queue, worker, and job dispatch disabled.",
    nextSafeAction:
      "Keep the kill switch engaged and continue manual review only.",
  },
  {
    id: "audit-gate",
    label: "audit gate failure",
    state: "held / audit evidence missing",
    severity: "high",
    operatorFacingExplanation:
      "Audit evidence is static preview only and not persisted anywhere.",
    requiredEvidenceToUnblock:
      "Backend-owned audit joins and persisted evidence references.",
    requiredRecoveryAction:
      "Keep audit review preview-only and do not claim a persisted audit trail exists.",
    nextSafeAction:
      "Leave audit posture not persisted and not admitted.",
  },
  {
    id: "server-only-adapter-gate",
    label: "server-only adapter gate failure",
    state: "held / backend-only required",
    severity: "critical",
    operatorFacingExplanation:
      "The frontend cannot cross the server-only adapter boundary for admission or execution.",
    requiredEvidenceToUnblock:
      "A backend-owned server-only adapter contract for the lane.",
    requiredRecoveryAction:
      "Keep provider logic out of the frontend and review server-only contracts only.",
    nextSafeAction:
      "Maintain the frontend block and review adapter readiness.",
  },
  {
    id: "opaque-credential-gate",
    label: "opaque credential gate failure",
    state: "held / credential evidence missing",
    severity: "high",
    operatorFacingExplanation:
      "Credential posture remains opaque reference only and is not bound for use.",
    requiredEvidenceToUnblock:
      "An opaque credential reference label reviewed for backend-only use.",
    requiredRecoveryAction:
      "Do not expose or read secrets; keep credentials as opaque references only.",
    nextSafeAction:
      "Leave credential posture reference-only and backend future.",
  },
  {
    id: "prompt-payload-review-gate",
    label: "prompt payload review gate failure",
    state: "held / prompt payload not reviewed",
    severity: "high",
    operatorFacingExplanation:
      "Prompt payload posture is still redacted placeholder only and not approved for a future backend handoff.",
    requiredEvidenceToUnblock:
      "A reviewed redacted prompt payload posture with no prompt transmission.",
    requiredRecoveryAction:
      "Review the redacted payload manually and keep prompt sending not implemented.",
    nextSafeAction:
      "Do not send prompts and leave the payload under review.",
  },
  {
    id: "privacy-redaction-gate",
    label: "privacy/redaction gate failure",
    state: "held / privacy review incomplete",
    severity: "high",
    operatorFacingExplanation:
      "Privacy and redaction review remains incomplete for the held admission.",
    requiredEvidenceToUnblock:
      "A reviewed privacy/redaction checklist scoped to the lane.",
    requiredRecoveryAction:
      "Keep content redacted and preserve preview-only review posture.",
    nextSafeAction:
      "Leave privacy review incomplete and maintain the held decision.",
  },
  {
    id: "cost-rate-timeout-gate",
    label: "cost/rate/timeout gate failure",
    state: "held / cost rate timeout incomplete",
    severity: "high",
    operatorFacingExplanation:
      "Cost, rate, and timeout posture is incomplete and cannot guard a real run.",
    requiredEvidenceToUnblock:
      "Reviewed cost acknowledgement, rate-limit posture, and timeout/cancel evidence.",
    requiredRecoveryAction:
      "Keep rate controls review-only and do not admit or dispatch a run.",
    nextSafeAction:
      "Continue manual review and keep retries disabled.",
  },
  {
    id: "idempotency-replay-gate",
    label: "idempotency/replay gate failure",
    state: "held / idempotency replay not proven",
    severity: "high",
    operatorFacingExplanation:
      "Idempotency and replay protections do not exist beyond deterministic preview records.",
    requiredEvidenceToUnblock:
      "A backend-owned idempotency key and replay-block contract.",
    requiredRecoveryAction:
      "Keep idempotency and replay posture descriptive only and avoid any execution path.",
    nextSafeAction:
      "Leave replay posture blocked and review-only.",
  },
  {
    id: "single-run-lock-gate",
    label: "single-run lock gate failure",
    state: "held / single-run lock missing",
    severity: "critical",
    operatorFacingExplanation:
      "No single-run lock exists to protect admission, queueing, or execution.",
    requiredEvidenceToUnblock:
      "A backend-owned single-run lock contract tied to admission review.",
    requiredRecoveryAction:
      "Keep the single-run lock requirement visible and do not create a lease or job.",
    nextSafeAction:
      "Leave the lane held and lock-free in preview only.",
  },
  {
    id: "dry-run-result-review-gate",
    label: "dry-run result review gate failure",
    state: "held / dry-run review missing",
    severity: "high",
    operatorFacingExplanation:
      "Dry-run result review remains a prerequisite before admission recovery can be considered complete.",
    requiredEvidenceToUnblock:
      "A reviewed dry-run result record for the lane.",
    requiredRecoveryAction:
      "Use fixture-only dry-run evidence and keep provider execution blocked.",
    nextSafeAction:
      "Keep the lane held until dry-run review is accepted.",
  },
  {
    id: "acceptance-matrix-gate",
    label: "acceptance matrix gate failure",
    state: "held / acceptance matrix unresolved",
    severity: "high",
    operatorFacingExplanation:
      "Acceptance criteria remain unresolved, so no admission can progress beyond held.",
    requiredEvidenceToUnblock:
      "A reviewed acceptance matrix with unresolved items cleared.",
    requiredRecoveryAction:
      "Keep acceptance review manual and do not admit the run.",
    nextSafeAction:
      "Carry the unresolved acceptance matrix into the backend-owned contract discussion.",
  },
  {
    id: "approval-expiry-gate",
    label: "approval expiry gate failure",
    state: "held / approval expiry not validated",
    severity: "medium",
    operatorFacingExplanation:
      "Approval expiry review remains preview-only and no active admission window exists.",
    requiredEvidenceToUnblock:
      "A reviewed expiry posture owned by the backend approval contract.",
    requiredRecoveryAction:
      "Keep expiry review visible and do not claim an active admission lease exists.",
    nextSafeAction:
      "Leave approval expiry unresolved and the run held.",
  },
  {
    id: "approval-revocation-gate",
    label: "approval revocation gate failure",
    state: "held / approval revocation not validated",
    severity: "medium",
    operatorFacingExplanation:
      "Revocation review remains preview-only and prevents any claim of active admission authorization.",
    requiredEvidenceToUnblock:
      "A reviewed revocation posture with backend-owned approval joins.",
    requiredRecoveryAction:
      "Keep revocation posture descriptive only and do not issue any ticket or token.",
    nextSafeAction:
      "Leave revocation unresolved and maintain the held posture.",
  },
  {
    id: "persistence-gate",
    label: "persistence gate failure",
    state: "held / persistence not implemented",
    severity: "high",
    operatorFacingExplanation:
      "Result, audit, and approval persistence are not implemented in this frontend batch.",
    requiredEvidenceToUnblock:
      "Backend-owned result, audit, and approval persistence contracts.",
    requiredRecoveryAction:
      "Keep persistence claims out of the frontend and continue using preview-only references.",
    nextSafeAction:
      "Leave persistence unimplemented and continue review only.",
  },
  {
    id: "queue-dispatch-gate",
    label: "queue dispatch gate failure",
    state: "held / queue dispatch blocked",
    severity: "critical",
    operatorFacingExplanation:
      "Queue dispatch remains blocked and no run may be enqueued.",
    requiredEvidenceToUnblock:
      "A backend-owned queue admission contract.",
    requiredRecoveryAction:
      "Keep queue dispatch out of the frontend and leave the queue state not dispatched.",
    nextSafeAction:
      "Review queue posture only as a blocked future dependency.",
  },
  {
    id: "worker-dispatch-gate",
    label: "worker dispatch gate failure",
    state: "held / worker dispatch blocked",
    severity: "critical",
    operatorFacingExplanation:
      "Worker dispatch remains blocked and no worker may pick up a run.",
    requiredEvidenceToUnblock:
      "A backend-owned worker isolation and dispatch contract.",
    requiredRecoveryAction:
      "Keep worker orchestration future-only and do not simulate worker handoff.",
    nextSafeAction:
      "Leave worker dispatch not dispatched.",
  },
  {
    id: "job-execution-gate",
    label: "job execution gate failure",
    state: "held / job execution blocked",
    severity: "critical",
    operatorFacingExplanation:
      "Job execution remains blocked and no admitted job exists in this preview layer.",
    requiredEvidenceToUnblock:
      "A backend-owned job execution contract tied to admission review.",
    requiredRecoveryAction:
      "Do not create execution jobs, retries, or fallbacks from the frontend.",
    nextSafeAction:
      "Leave job execution not executed and continue manual review only.",
  },
] as const satisfies readonly GateFailureSeed[];

const RECOVERY_READINESS_CHECKLIST_SEEDS = [
  {
    checklistId: "approval-scope-reviewed",
    label: "approval scope reviewed",
    state: "manual review required",
    severity: "critical",
    evidenceRequired:
      "A reviewed approval scope for the held admission lane.",
    recoveryAction:
      "Manually review approval scope and keep the run held until backend-owned approval joins exist.",
    owner: "operator",
    nextSafeAction:
      "Keep approval scope review open and do not admit the run.",
  },
  {
    checklistId: "manual-confirmation-captured",
    label: "manual confirmation captured",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed manual confirmation record for the operator request.",
    recoveryAction:
      "Capture confirmation in review-only form and keep the lane not admitted.",
    owner: "operator",
    nextSafeAction:
      "Leave confirmation unresolved until the backend contract is defined.",
  },
  {
    checklistId: "kill-switch-reviewed",
    label: "kill switch reviewed",
    state: "manual review required",
    severity: "critical",
    evidenceRequired:
      "A reviewed kill-switch posture for the held admission lane.",
    recoveryAction:
      "Preserve the kill switch and continue blocking execution, queue, worker, and job paths.",
    owner: "safety review",
    nextSafeAction:
      "Keep the kill switch engaged.",
  },
  {
    checklistId: "audit-posture-reviewed",
    label: "audit posture reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed audit posture summary with failed gates and recovery notes.",
    recoveryAction:
      "Keep audit review preview-only and do not claim persisted evidence exists.",
    owner: "operator",
    nextSafeAction:
      "Leave audit posture review-only.",
  },
  {
    checklistId: "server-only-adapter-contract-ready",
    label: "server-only adapter contract ready",
    state: "backend future required",
    severity: "critical",
    evidenceRequired:
      "A backend-owned server-only adapter contract for the admission lane.",
    recoveryAction:
      "Carry the adapter requirement into the backend-owned admission contract batch.",
    owner: "backend future",
    nextSafeAction:
      "Do not add frontend provider logic.",
  },
  {
    checklistId: "opaque-credential-label-reviewed",
    label: "opaque credential label reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed opaque credential reference label for backend-only use.",
    recoveryAction:
      "Keep credentials opaque and do not expose secrets or key names in the frontend.",
    owner: "safety review",
    nextSafeAction:
      "Leave credential handling reference-only.",
  },
  {
    checklistId: "prompt-payload-redacted",
    label: "prompt payload redacted",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed redacted prompt payload posture with no prompt transmission.",
    recoveryAction:
      "Review payloads manually and keep prompt sending not implemented.",
    owner: "safety review",
    nextSafeAction:
      "Do not send prompts.",
  },
  {
    checklistId: "privacy-redaction-reviewed",
    label: "privacy/redaction reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed privacy/redaction checklist scoped to the lane.",
    recoveryAction:
      "Keep content redacted and preserve review-only posture.",
    owner: "safety review",
    nextSafeAction:
      "Leave privacy review incomplete until manually cleared.",
  },
  {
    checklistId: "cost-acknowledgement-reviewed",
    label: "cost acknowledgement reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed cost acknowledgement for the held run admission.",
    recoveryAction:
      "Keep cost posture visible and do not admit the lane until reviewed.",
    owner: "operator",
    nextSafeAction:
      "Continue cost review with no execution.",
  },
  {
    checklistId: "rate-limit-reviewed",
    label: "rate limit reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed rate-limit posture for the capability lane.",
    recoveryAction:
      "Keep rate posture descriptive only and avoid any live limiter implementation.",
    owner: "backend future",
    nextSafeAction:
      "Carry rate posture into the backend-owned contract.",
  },
  {
    checklistId: "timeout-cancel-reviewed",
    label: "timeout/cancel reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed timeout/cancel posture for future backend admission.",
    recoveryAction:
      "Keep timeout posture visible and do not create a lease or job.",
    owner: "backend future",
    nextSafeAction:
      "Continue timeout review only.",
  },
  {
    checklistId: "idempotency-replay-reviewed",
    label: "idempotency/replay reviewed",
    state: "backend future required",
    severity: "high",
    evidenceRequired:
      "A backend-owned idempotency and replay-block contract.",
    recoveryAction:
      "Keep idempotency and replay posture descriptive only in the frontend.",
    owner: "backend future",
    nextSafeAction:
      "Do not simulate retries, fallbacks, or replay protection from the frontend.",
  },
  {
    checklistId: "single-run-lock-reviewed",
    label: "single-run lock reviewed",
    state: "backend future required",
    severity: "critical",
    evidenceRequired:
      "A backend-owned single-run lock and lease contract.",
    recoveryAction:
      "Keep the single-run lock requirement visible and do not create a lease.",
    owner: "backend future",
    nextSafeAction:
      "Leave lease state not created.",
  },
  {
    checklistId: "dry-run-result-reviewed",
    label: "dry-run result reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed dry-run result record linked to the admission lane.",
    recoveryAction:
      "Use fixture-only evidence and keep provider execution blocked.",
    owner: "operator",
    nextSafeAction:
      "Review the dry-run result and keep the lane held.",
  },
  {
    checklistId: "acceptance-matrix-reviewed",
    label: "acceptance matrix reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed acceptance matrix with unresolved items cleared.",
    recoveryAction:
      "Keep acceptance review manual and do not admit the run.",
    owner: "operator",
    nextSafeAction:
      "Carry unresolved acceptance into the backend-owned contract.",
  },
  {
    checklistId: "expiry-revocation-reviewed",
    label: "expiry/revocation reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed approval expiry and revocation posture.",
    recoveryAction:
      "Keep lifecycle review visible and do not issue any ticket or token.",
    owner: "operator",
    nextSafeAction:
      "Leave expiry and revocation unresolved in preview only.",
  },
  {
    checklistId: "queue-dispatch-still-blocked",
    label: "queue dispatch still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "A backend-owned queue admission contract.",
    recoveryAction:
      "Keep queue dispatch blocked and out of the frontend.",
    owner: "backend future",
    nextSafeAction:
      "Leave queue state not dispatched.",
  },
  {
    checklistId: "worker-dispatch-still-blocked",
    label: "worker dispatch still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "A backend-owned worker isolation and dispatch contract.",
    recoveryAction:
      "Keep worker orchestration future-only and do not simulate worker handoff.",
    owner: "backend future",
    nextSafeAction:
      "Leave worker state not dispatched.",
  },
  {
    checklistId: "job-execution-still-blocked",
    label: "job execution still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "A backend-owned job execution contract tied to admission review.",
    recoveryAction:
      "Do not create jobs, retries, or fallbacks from the frontend.",
    owner: "backend future",
    nextSafeAction:
      "Leave job execution not executed.",
  },
  {
    checklistId: "persistence-still-blocked",
    label: "persistence still blocked",
    state: "blocked",
    severity: "high",
    evidenceRequired:
      "Backend-owned result, audit, and approval persistence contracts.",
    recoveryAction:
      "Keep persistence out of the frontend and use preview-only references only.",
    owner: "backend future",
    nextSafeAction:
      "Leave result, audit, and approval persistence not implemented.",
  },
] as const satisfies readonly RecoveryReadinessChecklistSeed[];

function cloneList<T>(values: readonly T[]): readonly T[] {
  return [...values];
}

function cloneCapabilityFamily(
  family: AthenaModelRoutingCapabilityFamilyRecord
): AthenaModelRoutingCapabilityFamilyRecord {
  return { ...family };
}

function cloneReview(
  review: ModelProviderRunAdmissionReviewRecord
): ModelProviderRunAdmissionReviewRecord {
  return {
    ...review,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
  };
}

function cloneDecisionReview(
  record: ModelProviderAdmissionDecisionReviewRecord
): ModelProviderAdmissionDecisionReviewRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
    topBlockingGates: cloneList(record.topBlockingGates),
    topMissingEvidence: cloneList(record.topMissingEvidence),
    operatorReviewNotes: cloneList(record.operatorReviewNotes),
  };
}

function cloneGateFailureReview(
  record: ModelProviderAdmissionGateFailureReviewRecord
): ModelProviderAdmissionGateFailureReviewRecord {
  return {
    ...record,
    affectedCapabilityFamily: cloneCapabilityFamily(record.affectedCapabilityFamily),
  };
}

function cloneRecoveryPlan(
  record: ModelProviderAdmissionRecoveryPlanPreviewRecord
): ModelProviderAdmissionRecoveryPlanPreviewRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function cloneRecoveryReadinessChecklist(
  record: ModelProviderAdmissionRecoveryReadinessChecklistRecord
): ModelProviderAdmissionRecoveryReadinessChecklistRecord {
  return { ...record };
}

function cloneAuditSummary(
  record: ModelProviderAdmissionReviewAuditSummaryRecord
): ModelProviderAdmissionReviewAuditSummaryRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function uniqueCapabilityFamilies(
  families: readonly AthenaModelRoutingCapabilityFamilyRecord[]
): readonly AthenaModelRoutingCapabilityFamilyRecord[] {
  const uniqueFamilies = new Map<string, AthenaModelRoutingCapabilityFamilyRecord>();

  for (const family of families) {
    if (!uniqueFamilies.has(family.id)) {
      uniqueFamilies.set(family.id, cloneCapabilityFamily(family));
    }
  }

  return Array.from(uniqueFamilies.values());
}

export function uniqueAdmissionReviewDisplayStrings<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Array.from(new Set(values));
}

function buildCapabilityFamilyPool(): readonly AthenaModelRoutingCapabilityFamilyRecord[] {
  return uniqueCapabilityFamilies(
    RUN_INTENT_PREVIEWS.map((preview) => preview.capabilityFamily)
  );
}

function buildWorkspaceTargetPool(): readonly AiModelProviderWorkspaceTarget[] {
  return uniqueAdmissionReviewDisplayStrings(
    RUN_INTENT_PREVIEWS.map((preview) => preview.workspaceTarget)
  );
}

function selectCapabilityFamilies(
  capabilityIds?: readonly AiModelProviderCapabilityId[]
): readonly AthenaModelRoutingCapabilityFamilyRecord[] {
  if (!capabilityIds || capabilityIds.length === 0) {
    return buildCapabilityFamilyPool();
  }

  const selectedFamilies = RUN_INTENT_PREVIEWS.filter((preview) =>
    capabilityIds.includes(preview.capabilityFamily.id)
  ).map((preview) => preview.capabilityFamily);

  return uniqueCapabilityFamilies(selectedFamilies);
}

function selectWorkspaceTargets(
  workspaceTargets?: readonly AiModelProviderWorkspaceTarget[]
): readonly AiModelProviderWorkspaceTarget[] {
  if (!workspaceTargets || workspaceTargets.length === 0) {
    return buildWorkspaceTargetPool();
  }

  return uniqueAdmissionReviewDisplayStrings(workspaceTargets);
}

function requireDecisionSeed(
  reviewId: ModelProviderAdmissionReviewId
): AdmissionDecisionSeed {
  return DECISION_SEEDS[reviewId];
}

function requireManualRunAdmissionPreview(
  reviewId: ModelProviderAdmissionReviewId
): ManualRunAdmissionPreviewRecord {
  const preview = MANUAL_RUN_ADMISSION_PREVIEWS_BY_ID.get(reviewId);

  if (!preview) {
    throw new Error(`Missing manual run admission preview: ${reviewId}`);
  }

  return preview;
}

function requireAdmissionGateEvaluation(
  reviewId: ModelProviderAdmissionReviewId
): ManualRunAdmissionGateEvaluationRecord {
  const record = ADMISSION_GATE_EVALUATIONS_BY_ID.get(reviewId);

  if (!record) {
    throw new Error(`Missing admission gate evaluation: ${reviewId}`);
  }

  return record;
}

function requireAdmissionTicketPreview(
  reviewId: ModelProviderAdmissionReviewId
): ManualRunAdmissionTicketPreviewRecord {
  const preview = ADMISSION_TICKET_PREVIEWS_BY_ID.get(reviewId);

  if (!preview) {
    throw new Error(`Missing admission ticket preview: ${reviewId}`);
  }

  return preview;
}

function requireManualRunAdmissionBlocker(
  blockerId: ManualRunAdmissionBlockerId
): ManualRunAdmissionBlockerRecord {
  const blocker = MANUAL_RUN_ADMISSION_BLOCKERS_BY_ID.get(blockerId);

  if (!blocker) {
    throw new Error(`Missing manual run admission blocker: ${blockerId}`);
  }

  return blocker;
}

function requireManualAdmissionAuditPreview(
  reviewId: ModelProviderAdmissionReviewId
): ManualRunAdmissionAuditPreviewRecord {
  const preview = MANUAL_ADMISSION_AUDIT_PREVIEWS_BY_ID.get(reviewId);

  if (!preview) {
    throw new Error(`Missing manual admission audit preview: ${reviewId}`);
  }

  return preview;
}

function requireApprovalPacket(
  reviewId: ModelProviderAdmissionReviewId
): ModelProviderApprovalPacketRecord {
  const packet = APPROVAL_PACKETS_BY_ID.get(reviewId);

  if (!packet) {
    throw new Error(`Missing approval packet: ${reviewId}`);
  }

  return packet;
}

function requireRunIntent(
  reviewId: ModelProviderAdmissionReviewId
): ModelProviderRunIntentPreviewRecord {
  const runIntent = RUN_INTENT_PREVIEWS_BY_ID.get(reviewId);

  if (!runIntent) {
    throw new Error(`Missing run intent preview: ${reviewId}`);
  }

  return runIntent;
}

function requireGateFailureSeed(
  gateId: ModelProviderAdmissionGateFailureId
): GateFailureSeed {
  const seed = GATE_FAILURE_SEEDS.find((candidate) => candidate.id === gateId);

  if (!seed) {
    throw new Error(`Missing gate failure seed: ${gateId}`);
  }

  return seed;
}

function buildAffectedCapabilitySummary(
  capabilityFamilies: readonly AthenaModelRoutingCapabilityFamilyRecord[]
): string {
  return uniqueAdmissionReviewDisplayStrings(
    capabilityFamilies.map((family) => family.label)
  ).join(", ");
}

function buildAffectedWorkspaceSummary(
  workspaceTargets: readonly AiModelProviderWorkspaceTarget[]
): string {
  return uniqueAdmissionReviewDisplayStrings(workspaceTargets).join(", ");
}

export function buildStableAdmissionReviewKey(
  reviewId: ModelProviderAdmissionReviewId
): ModelProviderRunAdmissionReviewKey {
  return `model-provider-run-admission-review:${reviewId}`;
}

export function buildStableAdmissionDecisionReviewKey(
  reviewId: ModelProviderAdmissionReviewId
): ModelProviderAdmissionDecisionReviewKey {
  return `model-provider-admission-decision-review:${reviewId}`;
}

export function buildStableGateFailureReviewKey(
  reviewId: ModelProviderAdmissionReviewId,
  gateId: ModelProviderAdmissionGateFailureId
): ModelProviderAdmissionGateFailureReviewKey {
  return `model-provider-admission-gate-failure-review:${reviewId}:${gateId}`;
}

export function buildStableAdmissionRecoveryPlanKey(
  reviewId: ModelProviderAdmissionReviewId
): ModelProviderAdmissionRecoveryPlanKey {
  return `model-provider-run-admission-recovery-plan:${reviewId}`;
}

export function buildStableAdmissionRecoveryChecklistKey(
  checklistId: ModelProviderAdmissionRecoveryReadinessChecklistId
): ModelProviderAdmissionRecoveryReadinessChecklistKey {
  return `model-provider-run-admission-recovery-readiness:${checklistId}`;
}

export function buildStableAdmissionReviewAuditSummaryKey(
  reviewId: ModelProviderAdmissionReviewId
): ModelProviderAdmissionReviewAuditSummaryKey {
  return `model-provider-run-admission-review-audit-summary:${reviewId}`;
}

function buildAdmissionReview(
  preview: ManualRunAdmissionPreviewRecord,
  gateEvaluation: ManualRunAdmissionGateEvaluationRecord,
  ticketPreview: ManualRunAdmissionTicketPreviewRecord,
  blocker: ManualRunAdmissionBlockerRecord,
  auditPreview: ManualRunAdmissionAuditPreviewRecord,
  packet: ModelProviderApprovalPacketRecord,
  runIntent: ModelProviderRunIntentPreviewRecord
): ModelProviderRunAdmissionReviewRecord {
  return {
    id: preview.id,
    key: buildStableAdmissionReviewKey(preview.id),
    reviewVersion: "model-provider-run-admission-review-preview-v1",
    previewOnlyStatement: "admission review is preview-only",
    source: "Athena / Jarvis Model Gateway",
    reviewMode: "preview-only",
    admissionReviewPosture: "held / not admitted",
    label: preview.label,
    operatorRequestPhrase: preview.operatorRequestPhrase,
    workspaceTarget: preview.workspaceTarget,
    sourceAdmissionPreviewReference: preview.key,
    sourceAdmissionGateEvaluationReference: gateEvaluation.key,
    sourceAdmissionTicketPreviewReference: ticketPreview.key,
    sourceAdmissionBlockerReference: blocker.key,
    sourceAdmissionAuditPreviewReference: auditPreview.key,
    sourceApprovalPacketReference: packet.key,
    sourceRunIntentReference: runIntent.key,
    selectedCapabilityFamily: cloneCapabilityFamily(preview.selectedCapabilityFamily),
    providerSlotLabel: preview.providerSlotLabel,
    backupProviderSlotLabel: preview.backupProviderSlotLabel,
    localPrivateAlternativeLabel: preview.localPrivateAlternativeLabel,
    runAdmissionState: "not admitted",
    admissionDecisionState: "held",
    admissionTokenState: "not issued",
    admissionLeaseState: "not created",
    admissionTicketState: "preview-only / not issued",
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
    manualOperatorReviewRequired: "manual operator review required",
    manualRecoveryReviewRequired: "manual recovery review required",
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
    dryRunResultReviewRequired: "dry-run result review required",
    acceptanceMatrixReviewRequired: "acceptance matrix review required",
    approvalExpiryReviewRequired: "approval expiry review required",
    approvalRevocationReviewRequired: "approval revocation review required",
    noRetryExecution: "no retry execution",
    noFallbackExecution: "no fallback execution",
    resultCaptureRequiredInFuture: "result capture required in future",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    nextBackendOwnedRunAdmissionContractRequirement:
      "backend-owned model provider run admission contract next",
  };
}

const MODEL_PROVIDER_RUN_ADMISSION_REVIEWS = MANUAL_RUN_ADMISSION_PREVIEWS.map(
  (preview) => {
    const seed = requireDecisionSeed(preview.id);

    return buildAdmissionReview(
      preview,
      requireAdmissionGateEvaluation(preview.id),
      requireAdmissionTicketPreview(preview.id),
      requireManualRunAdmissionBlocker(seed.blockerId),
      requireManualAdmissionAuditPreview(preview.id),
      requireApprovalPacket(preview.id),
      requireRunIntent(preview.id)
    );
  }
);

function buildDecisionReview(
  review: ModelProviderRunAdmissionReviewRecord,
  seed: AdmissionDecisionSeed
): ModelProviderAdmissionDecisionReviewRecord {
  return {
    key: buildStableAdmissionDecisionReviewKey(review.id),
    decisionReviewVersion: "model-provider-run-admission-decision-review-preview-v1",
    previewOnlyStatement: "decision review is preview-only",
    admissionReviewId: review.id,
    label: review.label,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    sourceAdmissionPreviewReference: review.sourceAdmissionPreviewReference,
    sourceGateEvaluationReference: review.sourceAdmissionGateEvaluationReference,
    decisionState: "held / not admitted",
    admissionReasonSummary: seed.admissionReasonSummary,
    topBlockingGates: seed.topBlockingGateIds.map(
      (gateId) => requireGateFailureSeed(gateId).label
    ),
    topMissingEvidence: cloneList(seed.topMissingEvidence),
    operatorReviewNotes: cloneList(seed.operatorReviewNotes),
    manualRecoveryRequirement: seed.manualRecoveryRequirement,
    nextSafeAction: seed.nextSafeAction,
    explicitNoAdmissionNoExecutionStatement:
      "No admission. No execution. No provider execution. No model calls.",
  };
}

const ADMISSION_DECISION_REVIEWS = MODEL_PROVIDER_RUN_ADMISSION_REVIEWS.map(
  (review) => buildDecisionReview(review, requireDecisionSeed(review.id))
);

function buildGateFailureReview(
  review: ModelProviderRunAdmissionReviewRecord,
  seed: GateFailureSeed
): ModelProviderAdmissionGateFailureReviewRecord {
  return {
    key: buildStableGateFailureReviewKey(review.id, seed.id),
    gateFailureReviewVersion:
      "model-provider-run-admission-gate-failure-review-preview-v1",
    previewOnlyStatement: "gate failure review is preview-only",
    admissionReviewId: review.id,
    label: `${review.label} - ${seed.label}`,
    failedGateId: seed.id,
    failedGateLabel: seed.label,
    gateState: seed.state,
    severity: seed.severity,
    affectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation: seed.operatorFacingExplanation,
    requiredEvidenceToUnblock: seed.requiredEvidenceToUnblock,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    nextSafeAction: seed.nextSafeAction,
    explicitNoGatePassStatement:
      "Gate remains held. No gate pass is granted.",
  };
}

const ADMISSION_GATE_FAILURE_REVIEWS = MODEL_PROVIDER_RUN_ADMISSION_REVIEWS.flatMap(
  (review) => GATE_FAILURE_SEEDS.map((seed) => buildGateFailureReview(review, seed))
);

function buildRecoveryPlan(
  review: ModelProviderRunAdmissionReviewRecord
): ModelProviderAdmissionRecoveryPlanPreviewRecord {
  return {
    key: buildStableAdmissionRecoveryPlanKey(review.id),
    recoveryPlanVersion: "model-provider-run-admission-recovery-plan-preview-v1",
    previewOnlyStatement: "recovery plan is preview-only",
    admissionReviewId: review.id,
    label: review.label,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    recoveryPosture: "manual review only",
    missingManualApprovalRecovery:
      `Review manual approval for ${review.label} and keep the lane held until the backend-owned contract exists.`,
    missingManualConfirmationRecovery:
      `Capture manual confirmation for ${review.label} in review-only form and keep the run not admitted.`,
    killSwitchActiveRecovery:
      `Preserve the kill switch for ${review.label} and do not enable queue, worker, or job execution.`,
    approvalExpiredRecovery:
      `Review approval expiry for ${review.label} without issuing any admission token or lease.`,
    approvalRevokedRecovery:
      `Treat ${review.label} as revoked/held until operator review is refreshed through a backend-owned approval path.`,
    missingOpaqueCredentialRecovery:
      `Keep ${review.label} tied to opaque credential references only and do not expose secrets.`,
    promptPayloadNotReviewedRecovery:
      `Review the redacted prompt posture for ${review.label} without sending any prompt.`,
    privacyRedactionIncompleteRecovery:
      `Complete privacy and redaction review for ${review.label} before discussing backend execution posture.`,
    costRateTimeoutIncompleteRecovery:
      `Review cost acknowledgement, rate limits, and timeout/cancel posture for ${review.label} and keep execution blocked.`,
    dryRunReviewMissingRecovery:
      `Review the linked dry-run result evidence for ${review.label} before any backend-owned admission contract is considered ready.`,
    acceptanceMatrixUnresolvedRecovery:
      `Resolve acceptance criteria for ${review.label} and keep the lane not admitted until review is complete.`,
    auditPersistenceMissingRecovery:
      `Keep audit persistence as future backend-only work for ${review.label}; do not claim persisted audit evidence exists.`,
    resultPersistenceMissingRecovery:
      `Keep result capture and persistence future-only for ${review.label}; no stored result exists in this batch.`,
    approvalPersistenceMissingRecovery:
      `Keep approval persistence future-only for ${review.label}; no admission ledger exists in this batch.`,
    queueDispatchBlockedRecovery:
      `Leave queue dispatch blocked for ${review.label} until a backend-owned admission contract exists.`,
    workerDispatchBlockedRecovery:
      `Leave worker dispatch blocked for ${review.label} until backend worker isolation is defined.`,
    jobExecutionBlockedRecovery:
      `Leave job execution blocked for ${review.label} and do not create retries or fallbacks.`,
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    operatorActionRequired:
      `Review held admission evidence, failed gates, recovery posture, and the next backend-owned contract requirements for ${review.label}.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
    explicitNoRetryNoFallbackNoExecutionStatement:
      "No retry. No fallback. No execution. Manual review only.",
  };
}

const ADMISSION_RECOVERY_PLAN_PREVIEWS = MODEL_PROVIDER_RUN_ADMISSION_REVIEWS.map(
  (review) => buildRecoveryPlan(review)
);

function buildRecoveryReadinessChecklistRecord(
  seed: RecoveryReadinessChecklistSeed
): ModelProviderAdmissionRecoveryReadinessChecklistRecord {
  return {
    key: buildStableAdmissionRecoveryChecklistKey(seed.checklistId),
    checklistVersion:
      "model-provider-run-admission-recovery-readiness-checklist-v1",
    previewOnlyStatement: "recovery readiness is preview-only",
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    backendContractDependency:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

const ADMISSION_RECOVERY_READINESS_CHECKLIST = RECOVERY_READINESS_CHECKLIST_SEEDS.map(
  (seed) => buildRecoveryReadinessChecklistRecord(seed)
);

function buildAdmissionReviewAuditSummary(
  review: ModelProviderRunAdmissionReviewRecord,
  decisionReview: ModelProviderAdmissionDecisionReviewRecord
): ModelProviderAdmissionReviewAuditSummaryRecord {
  const gateFailures = ADMISSION_GATE_FAILURE_REVIEWS.filter(
    (record) => record.admissionReviewId === review.id
  );
  const topGateLabels = uniqueAdmissionReviewDisplayStrings(
    gateFailures
      .filter((record) => record.severity !== "medium")
      .slice(0, 5)
      .map((record) => record.failedGateLabel)
  );
  const recoveryPlan = ADMISSION_RECOVERY_PLAN_PREVIEWS.find(
    (record) => record.admissionReviewId === review.id
  );

  if (!recoveryPlan) {
    throw new Error(`Missing admission recovery plan preview: ${review.id}`);
  }

  return {
    key: buildStableAdmissionReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "model-provider-run-admission-review-audit-summary-preview-v1",
    previewOnlyStatement: "audit summary is preview-only",
    admissionReviewId: review.id,
    label: review.label,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    auditPosture: "preview-only",
    auditReferenceState: "not persisted",
    approvalReferenceState: "not persisted",
    resultReferenceState: "not persisted",
    evidenceSummary:
      `Evidence for ${review.label} remains limited to the manual admission preview, held gate evaluation, preview-only ticket, blocker reference, audit preview, approval packet, and run intent preview.`,
    failedGateSummary:
      topGateLabels.length > 0
        ? `Top failed gates: ${topGateLabels.join(", ")}.`
        : "Top failed gates remain preview-only and held.",
    recoverySummary:
      `${decisionReview.manualRecoveryRequirement} ${recoveryPlan.explicitNoRetryNoFallbackNoExecutionStatement}`,
    blockedActionSummary:
      `Blocked actions for ${review.label} remain explicit: no provider execution, no queue dispatch, no worker dispatch, no job execution, and no persistence.`,
    noProviderExecutionStatement: "No provider execution",
    noQueueDispatchStatement: "No queue dispatch",
    noWorkerDispatchStatement: "No worker dispatch",
    noJobExecutionStatement: "No job execution",
    noPersistenceStatement: "No persistence",
    backendOwnedContractRequirement:
      "backend-owned model provider run admission contract next",
  };
}

const ADMISSION_REVIEW_AUDIT_SUMMARIES = MODEL_PROVIDER_RUN_ADMISSION_REVIEWS.map(
  (review) =>
    buildAdmissionReviewAuditSummary(
      review,
      ADMISSION_DECISION_REVIEWS.find(
        (decisionReview) => decisionReview.admissionReviewId === review.id
      ) ??
        (() => {
          throw new Error(`Missing admission decision review: ${review.id}`);
        })()
    )
);

export function listModelProviderRunAdmissionReviews():
  readonly ModelProviderRunAdmissionReviewRecord[] {
  return MODEL_PROVIDER_RUN_ADMISSION_REVIEWS.map((review) => cloneReview(review));
}

export function listAdmissionDecisionReviews():
  readonly ModelProviderAdmissionDecisionReviewRecord[] {
  return ADMISSION_DECISION_REVIEWS.map((record) => cloneDecisionReview(record));
}

export function listGateFailureReviewRecords():
  readonly ModelProviderAdmissionGateFailureReviewRecord[] {
  return ADMISSION_GATE_FAILURE_REVIEWS.map((record) =>
    cloneGateFailureReview(record)
  );
}

export function listAdmissionRecoveryPlanPreviews():
  readonly ModelProviderAdmissionRecoveryPlanPreviewRecord[] {
  return ADMISSION_RECOVERY_PLAN_PREVIEWS.map((record) =>
    cloneRecoveryPlan(record)
  );
}

export function listAdmissionRecoveryReadinessChecklistRecords():
  readonly ModelProviderAdmissionRecoveryReadinessChecklistRecord[] {
  return ADMISSION_RECOVERY_READINESS_CHECKLIST.map((record) =>
    cloneRecoveryReadinessChecklist(record)
  );
}

export function listAdmissionReviewAuditSummaries():
  readonly ModelProviderAdmissionReviewAuditSummaryRecord[] {
  return ADMISSION_REVIEW_AUDIT_SUMMARIES.map((record) => cloneAuditSummary(record));
}

export function groupAdmissionReviewsByCapabilityFamily():
  readonly ModelProviderRunAdmissionReviewCapabilityFamilyGroup[] {
  const groups = new Map<
    string,
    {
      capabilityFamilyId: AiModelProviderCapabilityId;
      capabilityFamilyLabel: AthenaModelRoutingCapabilityFamilyLabel;
      reviews: ModelProviderRunAdmissionReviewRecord[];
    }
  >();

  for (const review of MODEL_PROVIDER_RUN_ADMISSION_REVIEWS) {
    const existingGroup = groups.get(review.selectedCapabilityFamily.id);

    if (existingGroup) {
      existingGroup.reviews.push(cloneReview(review));
      continue;
    }

    groups.set(review.selectedCapabilityFamily.id, {
      capabilityFamilyId: review.selectedCapabilityFamily.id,
      capabilityFamilyLabel: review.selectedCapabilityFamily.label,
      reviews: [cloneReview(review)],
    });
  }

  return Array.from(groups.values()).map((group) => ({
    capabilityFamilyId: group.capabilityFamilyId,
    capabilityFamilyLabel: group.capabilityFamilyLabel,
    reviewCount: group.reviews.length,
    reviews: group.reviews,
  }));
}

export function groupAdmissionReviewsByWorkspaceTarget():
  readonly ModelProviderRunAdmissionReviewWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    ModelProviderRunAdmissionReviewRecord[]
  >();

  for (const review of MODEL_PROVIDER_RUN_ADMISSION_REVIEWS) {
    const currentGroup = groups.get(review.workspaceTarget) ?? [];
    currentGroup.push(cloneReview(review));
    groups.set(review.workspaceTarget, currentGroup);
  }

  return Array.from(groups.entries()).map(([workspaceTarget, reviews]) => ({
    workspaceTarget,
    reviewCount: reviews.length,
    reviews,
  }));
}

export function buildAdmissionReviewSummary():
  ModelProviderRunAdmissionReviewSummary {
  const capabilityGroups = groupAdmissionReviewsByCapabilityFamily();
  const workspaceGroups = groupAdmissionReviewsByWorkspaceTarget();

  return {
    currentBatch: MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
    reviewCount: MODEL_PROVIDER_RUN_ADMISSION_REVIEWS.length,
    decisionReviewCount: ADMISSION_DECISION_REVIEWS.length,
    gateFailureReviewCount: ADMISSION_GATE_FAILURE_REVIEWS.length,
    recoveryPlanCount: ADMISSION_RECOVERY_PLAN_PREVIEWS.length,
    recoveryReadinessChecklistCount:
      ADMISSION_RECOVERY_READINESS_CHECKLIST.length,
    auditSummaryCount: ADMISSION_REVIEW_AUDIT_SUMMARIES.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildGateFailureSummary():
  ModelProviderAdmissionGateFailureSummary {
  return {
    currentBatch: MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
    gateFailureReviewCount: ADMISSION_GATE_FAILURE_REVIEWS.length,
    criticalGateFailureCount: ADMISSION_GATE_FAILURE_REVIEWS.filter(
      (record) => record.severity === "critical"
    ).length,
    highGateFailureCount: ADMISSION_GATE_FAILURE_REVIEWS.filter(
      (record) => record.severity === "high"
    ).length,
    mediumGateFailureCount: ADMISSION_GATE_FAILURE_REVIEWS.filter(
      (record) => record.severity === "medium"
    ).length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
  };
}

export function buildAdmissionRecoverySummary():
  ModelProviderAdmissionRecoverySummary {
  return {
    currentBatch: MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
    recoveryPlanCount: ADMISSION_RECOVERY_PLAN_PREVIEWS.length,
    recoveryReadinessChecklistCount:
      ADMISSION_RECOVERY_READINESS_CHECKLIST.length,
    manualReviewOnlyCount: ADMISSION_RECOVERY_PLAN_PREVIEWS.filter(
      (record) => record.recoveryPosture === "manual review only"
    ).length,
    retryDisabledCount: ADMISSION_RECOVERY_PLAN_PREVIEWS.filter(
      (record) => record.retryPosture === "disabled"
    ).length,
    fallbackDisabledCount: ADMISSION_RECOVERY_PLAN_PREVIEWS.filter(
      (record) => record.fallbackPosture === "disabled"
    ).length,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
  };
}

export function buildBackendOwnedRunAdmissionContractChecklist():
  readonly string[] {
  const capabilitySummary = buildAffectedCapabilitySummary(
    selectCapabilityFamilies()
  );
  const workspaceSummary = buildAffectedWorkspaceSummary(
    selectWorkspaceTargets()
  );

  return [
    "Define a backend-owned run admission contract that issues no frontend admission tokens or leases.",
    "Carry operator approval, manual confirmation, kill switch, audit, and privacy/redaction review into the backend-owned contract.",
    "Keep credentials opaque-reference-only and preserve the server-only adapter boundary.",
    "Define queue admission, worker isolation, job execution, idempotency, replay block, and single-run lock as backend-only responsibilities.",
    "Keep retry and fallback disabled until backend-owned evidence exists.",
    `Covered capability families remain preview-only: ${capabilitySummary}.`,
    `Covered workspace targets remain preview-only: ${workspaceSummary}.`,
    `Next likely batch: ${NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH}.`,
  ] as const;
}
