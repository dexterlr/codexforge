import type {
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import type {
  AthenaModelRoutingCapabilityFamilyRecord,
} from "../athena-model-routing-provider-selection-preview";
import {
  buildStableBackendDryRunRunnerGateSchemaKey,
  listBackendDryRunErrorContracts,
  listBackendDryRunRequestContracts,
  listBackendDryRunResponseContracts,
  listBackendDryRunRunnerHandoffPreviews,
  listBackendDryRunRunnerReadinessMatrixRecords,
  listBackendOwnedModelProviderDryRunRunnerContracts,
  type BackendDryRunErrorContractRecord,
  type BackendDryRunRequestContractRecord,
  type BackendDryRunResponseContractRecord,
  type BackendDryRunRunnerHandoffPreviewRecord,
  type BackendDryRunRunnerReadinessMatrixRecord,
  type BackendOwnedModelProviderDryRunRunnerContractRecord,
} from "../backend-owned-model-provider-dry-run-runner-contract";
import {
  BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
  type BackendDryRunRunnerAcceptancePostureKey,
  type BackendDryRunRunnerDecisionReviewKey,
  type BackendDryRunRunnerDecisionReviewRecord,
  type BackendDryRunRunnerGateFailureId,
  type BackendDryRunRunnerGateFailureLabel,
  type BackendDryRunRunnerGateFailureReviewKey,
  type BackendDryRunRunnerGateFailureReviewRecord,
  type BackendDryRunRunnerGateFailureState,
  type BackendDryRunRunnerGateFailureSummary,
  type BackendDryRunRunnerRecoveryPlanKey,
  type BackendDryRunRunnerRecoveryPlanPreviewRecord,
  type BackendDryRunRunnerRecoveryReadinessChecklistId,
  type BackendDryRunRunnerRecoveryReadinessChecklistKey,
  type BackendDryRunRunnerRecoveryReadinessChecklistLabel,
  type BackendDryRunRunnerRecoveryReadinessChecklistRecord,
  type BackendDryRunRunnerRecoverySummary,
  type BackendDryRunRunnerReviewAuditSummaryKey,
  type BackendDryRunRunnerReviewAuditSummaryRecord,
  type BackendDryRunRunnerReviewCapabilityFamilyGroup,
  type BackendDryRunRunnerReviewId,
  type BackendDryRunRunnerReviewKey,
  type BackendDryRunRunnerReviewSeverity,
  type BackendDryRunRunnerReviewSummary,
  type BackendDryRunRunnerReviewWorkspaceGroup,
  type BackendOwnedModelProviderDryRunRunnerAcceptancePostureRecord,
  type BackendOwnedModelProviderDryRunRunnerReviewRecord,
} from "./backend-owned-model-provider-dry-run-runner-review-recovery-preview-types";

type DryRunRunnerDecisionSeed = Readonly<{
  topBlockingGateIds: readonly BackendDryRunRunnerGateFailureId[];
  topMissingEvidence: readonly string[];
  operatorReviewNotes: readonly string[];
  runnerReasonSummary: string;
  manualRecoveryRequirement: string;
  nextSafeAction: string;
}>;

type DryRunRunnerGateFailureSeed = Readonly<{
  id: BackendDryRunRunnerGateFailureId;
  label: BackendDryRunRunnerGateFailureLabel;
  state: BackendDryRunRunnerGateFailureState;
  severity: BackendDryRunRunnerReviewSeverity;
  operatorFacingExplanation: string;
  requiredEvidenceToUnblock: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

type DryRunRunnerRecoveryReadinessChecklistSeed = Readonly<{
  checklistId: BackendDryRunRunnerRecoveryReadinessChecklistId;
  label: BackendDryRunRunnerRecoveryReadinessChecklistLabel;
  state: BackendDryRunRunnerRecoveryReadinessChecklistRecord["state"];
  severity: BackendDryRunRunnerReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: BackendDryRunRunnerRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const REVIEW_SUMMARY_LINES = [
  "backend-owned model provider dry-run runner review and recovery preview only",
  "dry-run runner review is preview-only",
  "dry-run runner decision review is preview-only",
  "dry-run runner gate failure review is preview-only",
  "dry-run runner recovery plan is preview-only",
  "dry-run runner recovery readiness is preview-only",
  "dry-run runner acceptance posture is preview-only",
  "dry-run request is not created",
  "dry-run invocation is not invoked",
  "dry-run execution is not executed",
  "dry-run response is not received",
  "dry-run error is not received",
  "provider response is not received",
  "model output is not generated",
  "fixture result is not produced",
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
  "backend-owned synthetic dry-run runner skeleton next",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "backend admission contract gate failure",
  "admission token gate failure",
  "admission lease gate failure",
  "operator approval gate failure",
  "manual confirmation gate failure",
  "approval expiry/revocation gate failure",
  "kill switch gate failure",
  "audit gate failure",
  "server-only boundary gate failure",
  "opaque credential gate failure",
  "prompt payload review gate failure",
  "privacy/redaction gate failure",
  "cost/rate/timeout gate failure",
  "idempotency/replay gate failure",
  "single-run lock gate failure",
  "dry-run request contract gate failure",
  "dry-run response contract gate failure",
  "dry-run error contract gate failure",
  "runner invocation gate failure",
  "provider adapter boundary gate failure",
  "queue/worker/job gates blocked",
  "persistence gate failure",
] as const;

const RECOVERY_SUMMARY_LINES = [
  "dry-run runner recovery plan is preview-only",
  "dry-run runner recovery readiness is preview-only",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "runner contract incomplete recovery",
  "dry-run request not created recovery",
  "runner invocation not invoked recovery",
  "dry-run execution not executed recovery",
  "provider response not received recovery",
  "model output not generated recovery",
  "fixture result not produced recovery",
  "queue/worker/job blocked recovery",
  "persistence recovery",
  "backend-owned synthetic dry-run runner skeleton next",
] as const;

const SYNTHETIC_DRY_RUN_RUNNER_SKELETON_CHECKLIST = [
  "Review dry-run runner decision posture before any synthetic backend-owned runner skeleton is drafted.",
  "Carry gate failures for admission, approval, safety, privacy, cost, idempotency, queue, worker, job, and persistence into the synthetic skeleton batch.",
  "Keep the synthetic runner skeleton backend-owned, preview-safe, and non-executable while request, invocation, and execution remain blocked.",
  "Preserve no prompt sending, no provider execution, no queue dispatch, no worker dispatch, no job execution, and no persistence posture in the next batch.",
  "Do not implement retries, fallbacks, live provider calls, or result persistence when the synthetic runner skeleton is introduced.",
] as const;

const BACKEND_DRY_RUN_RUNNER_CONTRACTS =
  listBackendOwnedModelProviderDryRunRunnerContracts();
const BACKEND_DRY_RUN_REQUEST_CONTRACTS = listBackendDryRunRequestContracts();
const BACKEND_DRY_RUN_RESPONSE_CONTRACTS = listBackendDryRunResponseContracts();
const BACKEND_DRY_RUN_ERROR_CONTRACTS = listBackendDryRunErrorContracts();
const BACKEND_DRY_RUN_RUNNER_READINESS =
  listBackendDryRunRunnerReadinessMatrixRecords();
const BACKEND_DRY_RUN_RUNNER_HANDOFFS = listBackendDryRunRunnerHandoffPreviews();

const BACKEND_DRY_RUN_REQUESTS_BY_ID = new Map(
  BACKEND_DRY_RUN_REQUEST_CONTRACTS.map((record) => [record.id, record] as const)
);
const BACKEND_DRY_RUN_RESPONSES_BY_ID = new Map(
  BACKEND_DRY_RUN_RESPONSE_CONTRACTS.map(
    (record) => [record.id, record] as const
  )
);
const BACKEND_DRY_RUN_ERRORS_BY_ID = new Map(
  BACKEND_DRY_RUN_ERROR_CONTRACTS.map((record) => [record.id, record] as const)
);
const BACKEND_DRY_RUN_READINESS_BY_ID = new Map(
  BACKEND_DRY_RUN_RUNNER_READINESS.map((record) => [record.id, record] as const)
);
const BACKEND_DRY_RUN_HANDOFFS_BY_ID = new Map(
  BACKEND_DRY_RUN_RUNNER_HANDOFFS.map((record) => [record.id, record] as const)
);

const DECISION_SEEDS = {
  "conversational-planning-request": {
    topBlockingGateIds: [
      "backend-admission-contract-gate",
      "operator-approval-gate",
      "runner-invocation-gate",
    ],
    topMissingEvidence: [
      "A reviewed backend admission contract reference for the planning lane.",
      "Explicit operator approval for a backend-owned planning dry-run.",
      "Synthetic backend runner skeleton evidence for invocation gating.",
    ],
    operatorReviewNotes: [
      "Planning remains contract-only and not executable.",
      "No prompt may be sent while the planning runner stays held.",
    ],
    runnerReasonSummary:
      "Conversational planning remains held because the backend admission dependency, operator approval, and runner invocation boundary are all still review-only.",
    manualRecoveryRequirement:
      "Review backend admission, approval, and invocation dependencies manually before the synthetic backend-owned runner skeleton is discussed.",
    nextSafeAction:
      "Keep the planning lane held and continue review-only runner analysis.",
  },
  "code-assistance-request": {
    topBlockingGateIds: [
      "manual-confirmation-gate",
      "idempotency-replay-gate",
      "single-run-lock-gate",
    ],
    topMissingEvidence: [
      "Manual confirmation for the code assistance lane.",
      "Synthetic idempotency and replay-block evidence.",
      "A single-run lock requirement carried into the backend skeleton.",
    ],
    operatorReviewNotes: [
      "Code assistance cannot move beyond held review while confirmation is missing.",
      "No retry or fallback posture may be simulated from the frontend.",
    ],
    runnerReasonSummary:
      "Code assistance remains held because manual confirmation, idempotency/replay proof, and single-run lock evidence are all absent.",
    manualRecoveryRequirement:
      "Carry confirmation, idempotency, and single-run lock review into the backend skeleton without creating a runnable path.",
    nextSafeAction:
      "Preserve the held code assistance posture and keep execution blocked.",
  },
  "website-copy-code-request": {
    topBlockingGateIds: [
      "server-only-boundary-gate",
      "provider-adapter-boundary-gate",
      "queue-dispatch-gate",
    ],
    topMissingEvidence: [
      "A server-only boundary review for website copy/code.",
      "Provider adapter boundary evidence for the future backend skeleton.",
      "Queue blocking evidence that remains explicit and unresolved.",
    ],
    operatorReviewNotes: [
      "Website copy/code remains frontend-blocked.",
      "No queue, worker, or job path may exist from this surface.",
    ],
    runnerReasonSummary:
      "Website copy/code remains held because the server-only boundary, provider adapter boundary, and queue dispatch boundary are all unresolved future backend work.",
    manualRecoveryRequirement:
      "Keep website copy/code review-only and carry the adapter and queue boundaries into the next synthetic skeleton batch.",
    nextSafeAction:
      "Review boundary posture only and keep the website lane not executable.",
  },
  "product-video-request": {
    topBlockingGateIds: [
      "kill-switch-gate",
      "job-execution-gate",
      "worker-dispatch-gate",
    ],
    topMissingEvidence: [
      "Kill-switch review for a future video lane backend handoff.",
      "Worker isolation proof for the synthetic runner skeleton.",
      "Job execution evidence owned by the backend skeleton.",
    ],
    operatorReviewNotes: [
      "Video generation remains fully locked above the fold.",
      "No queue, worker, or job is allowed from the frontend video console.",
    ],
    runnerReasonSummary:
      "Product video remains held because the kill switch stays engaged and no worker/job execution path exists beyond preview-only records.",
    manualRecoveryRequirement:
      "Preserve the locked video console and carry worker/job boundaries into the synthetic backend-owned runner skeleton.",
    nextSafeAction:
      "Keep the video lane blocked and maintain manual review only.",
  },
  "storyboard-image-request": {
    topBlockingGateIds: [
      "prompt-payload-review-gate",
      "privacy-redaction-gate",
      "opaque-credential-gate",
    ],
    topMissingEvidence: [
      "A reviewed redacted prompt payload posture for storyboard images.",
      "Privacy/redaction evidence for the image lane.",
      "An opaque credential label reserved for backend-only use.",
    ],
    operatorReviewNotes: [
      "Storyboard prompts remain redacted placeholder only.",
      "Credential posture stays opaque and non-executable.",
    ],
    runnerReasonSummary:
      "Storyboard image remains held because prompt payload review, privacy/redaction evidence, and opaque credential posture are all incomplete.",
    manualRecoveryRequirement:
      "Review prompt redaction, privacy posture, and opaque credentials without sending prompts or introducing secrets.",
    nextSafeAction:
      "Keep the image lane under review with prompt transmission not sent.",
  },
  "audio-narration-request": {
    topBlockingGateIds: [
      "cost-rate-timeout-gate",
      "runner-invocation-gate",
      "job-execution-gate",
    ],
    topMissingEvidence: [
      "Cost/rate/timeout review for the narration lane.",
      "Runner invocation evidence carried into the backend skeleton.",
      "A backend-only job execution boundary for narration.",
    ],
    operatorReviewNotes: [
      "Narration stays blocked while cost and timeout posture are incomplete.",
      "No execution, retry, or fallback path exists for audio generation.",
    ],
    runnerReasonSummary:
      "Audio narration remains held because cost/rate/timeout posture is incomplete and neither invocation nor job execution is available.",
    manualRecoveryRequirement:
      "Keep the narration lane held and carry timing, cost, and job boundaries into the synthetic backend runner skeleton.",
    nextSafeAction:
      "Continue manual review and keep narration execution disabled.",
  },
  "transcription-caption-request": {
    topBlockingGateIds: [
      "cost-rate-timeout-gate",
      "worker-dispatch-gate",
      "job-execution-gate",
    ],
    topMissingEvidence: [
      "Reviewed rate posture for transcription/captioning.",
      "Worker isolation evidence for a future caption worker.",
      "Job execution evidence for backend-owned caption handling.",
    ],
    operatorReviewNotes: [
      "Transcription remains blocked because throughput and worker posture are unresolved.",
      "Frontend review cannot create worker or job boundaries.",
    ],
    runnerReasonSummary:
      "Transcription/caption remains held because rate posture is unresolved and worker/job execution remain blocked future dependencies.",
    manualRecoveryRequirement:
      "Carry rate, worker, and job reviews into the synthetic backend runner skeleton with no runnable frontend path.",
    nextSafeAction:
      "Keep worker and job execution blocked for transcription.",
  },
  "embeddings-search-request": {
    topBlockingGateIds: [
      "audit-gate",
      "persistence-gate",
      "queue-dispatch-gate",
    ],
    topMissingEvidence: [
      "Audit evidence owned by a future backend-owned persistence layer.",
      "Result persistence proof for retrieval review.",
      "Queue dispatch posture for backend retrieval work.",
    ],
    operatorReviewNotes: [
      "Embeddings/search stays preview-only because nothing is persisted.",
      "Queue posture remains blocked and audit references are not persisted.",
    ],
    runnerReasonSummary:
      "Embeddings/search remains held because audit and persistence are not implemented and queue dispatch is still blocked.",
    manualRecoveryRequirement:
      "Preserve preview-only retrieval review and carry queue plus persistence work into the synthetic backend runner skeleton.",
    nextSafeAction:
      "Keep retrieval review static and not persisted.",
  },
  "safety-moderation-review-request": {
    topBlockingGateIds: [
      "operator-approval-gate",
      "audit-gate",
      "approval-expiry-revocation-gate",
    ],
    topMissingEvidence: [
      "Reviewed approval scope for moderation review.",
      "Audit evidence for the moderation lane.",
      "Approval expiry/revocation posture for a future backend run.",
    ],
    operatorReviewNotes: [
      "Moderation stays held until approval and audit posture are explicit.",
      "Expiry and revocation remain visible blockers.",
    ],
    runnerReasonSummary:
      "Safety/moderation remains held because approval scope, audit evidence, and approval expiry/revocation posture are still unresolved.",
    manualRecoveryRequirement:
      "Review moderation approval and audit posture manually before the synthetic backend runner skeleton is drafted.",
    nextSafeAction:
      "Keep the moderation lane held and audit-backed only as preview data.",
  },
  "local-private-inference-request": {
    topBlockingGateIds: [
      "server-only-boundary-gate",
      "kill-switch-gate",
      "provider-adapter-boundary-gate",
    ],
    topMissingEvidence: [
      "A server-only local/private boundary review.",
      "Kill-switch evidence for local/private inference.",
      "Provider adapter boundary proof for backend-owned local/private routing.",
    ],
    operatorReviewNotes: [
      "Local/private inference is still backend-only and not exempt from the held posture.",
      "The frontend cannot dispatch or invoke local/private runs.",
    ],
    runnerReasonSummary:
      "Local/private inference remains held because the server-only boundary, kill switch, and provider adapter boundary all remain unresolved backend dependencies.",
    manualRecoveryRequirement:
      "Preserve the backend-only local/private boundary and keep the lane review-only until the synthetic skeleton exists.",
    nextSafeAction:
      "Maintain the held local/private posture and keep execution blocked.",
  },
  "audit-recovery-explanation-request": {
    topBlockingGateIds: [
      "dry-run-response-contract-gate",
      "persistence-gate",
      "audit-gate",
    ],
    topMissingEvidence: [
      "A reviewed dry-run response contract for audit/recovery explanation.",
      "Persisted audit/result references owned by a future backend layer.",
      "Audit evidence for the blocked recovery path.",
    ],
    operatorReviewNotes: [
      "Audit/recovery explanation remains preview-only.",
      "No stored result or audit record exists in this frontend batch.",
    ],
    runnerReasonSummary:
      "Audit/recovery explanation remains held because response evidence, persistence, and audit references are all still preview-only and not executable.",
    manualRecoveryRequirement:
      "Keep audit/recovery explanation static and carry response plus persistence posture into the synthetic backend runner skeleton.",
    nextSafeAction:
      "Continue manual audit/recovery review with no runner invocation.",
  },
} as const satisfies Readonly<Record<BackendDryRunRunnerReviewId, DryRunRunnerDecisionSeed>>;

const GATE_FAILURE_SEEDS = [
  {
    id: "backend-admission-contract-gate",
    label: "backend admission contract gate failure",
    state: "held / backend admission contract missing",
    severity: "critical",
    operatorFacingExplanation:
      "The backend admission contract remains a source dependency and no runner review can move beyond held posture without it.",
    requiredEvidenceToUnblock:
      "A reviewed backend admission contract reference carried forward from the prior batch.",
    requiredRecoveryAction:
      "Review the backend admission contract manually and keep the runner not executable.",
    nextSafeAction:
      "Keep backend admission dependency visible and unresolved.",
  },
  {
    id: "admission-token-gate",
    label: "admission token gate failure",
    state: "held / admission token not issued",
    severity: "high",
    operatorFacingExplanation:
      "No admission token is issued, so no invocation or execution path may exist.",
    requiredEvidenceToUnblock:
      "A reviewed token contract reserved for future backend-only issuance.",
    requiredRecoveryAction:
      "Keep token posture descriptive only and do not issue or simulate a token.",
    nextSafeAction:
      "Leave admission token state not issued.",
  },
  {
    id: "admission-lease-gate",
    label: "admission lease gate failure",
    state: "held / admission lease not created",
    severity: "high",
    operatorFacingExplanation:
      "No admission lease exists, so no protected runner invocation window can be claimed.",
    requiredEvidenceToUnblock:
      "A reviewed lease contract reserved for future backend-only creation.",
    requiredRecoveryAction:
      "Keep lease posture descriptive only and do not create or simulate a lease.",
    nextSafeAction:
      "Leave admission lease state not created.",
  },
  {
    id: "operator-approval-gate",
    label: "operator approval gate failure",
    state: "held / operator approval missing",
    severity: "critical",
    operatorFacingExplanation:
      "Operator approval is still required and no runner path may move forward without it.",
    requiredEvidenceToUnblock:
      "Explicit operator approval scoped to the dry-run runner review.",
    requiredRecoveryAction:
      "Review approval scope manually and keep provider execution blocked.",
    nextSafeAction:
      "Keep the runner held and approval-gated.",
  },
  {
    id: "manual-confirmation-gate",
    label: "manual confirmation gate failure",
    state: "held / manual confirmation missing",
    severity: "high",
    operatorFacingExplanation:
      "Manual confirmation is missing, so the dry-run runner cannot move beyond held review.",
    requiredEvidenceToUnblock:
      "A reviewed manual confirmation record for the operator request.",
    requiredRecoveryAction:
      "Capture confirmation in review-only form and keep the runner non-executable.",
    nextSafeAction:
      "Leave manual confirmation unresolved.",
  },
  {
    id: "approval-expiry-revocation-gate",
    label: "approval expiry/revocation gate failure",
    state: "held / approval expiry revocation unresolved",
    severity: "medium",
    operatorFacingExplanation:
      "Approval expiry and revocation remain unresolved, so no active execution window can be claimed.",
    requiredEvidenceToUnblock:
      "A reviewed approval expiry and revocation posture for future backend-owned execution.",
    requiredRecoveryAction:
      "Keep expiry and revocation visible and do not claim active authorization exists.",
    nextSafeAction:
      "Leave approval expiry and revocation unresolved.",
  },
  {
    id: "kill-switch-gate",
    label: "kill switch gate failure",
    state: "held / kill switch engaged",
    severity: "critical",
    operatorFacingExplanation:
      "The kill switch remains engaged by default while runner execution stays blocked.",
    requiredEvidenceToUnblock:
      "A reviewed kill-switch posture owned by the future backend runner skeleton.",
    requiredRecoveryAction:
      "Preserve the kill switch and keep queue, worker, and job boundaries blocked.",
    nextSafeAction:
      "Keep the kill switch engaged.",
  },
  {
    id: "audit-gate",
    label: "audit gate failure",
    state: "held / audit evidence missing",
    severity: "high",
    operatorFacingExplanation:
      "Audit evidence is preview-only and not persisted anywhere in this batch.",
    requiredEvidenceToUnblock:
      "Reviewed backend-owned audit references and persistence posture.",
    requiredRecoveryAction:
      "Keep audit review preview-only and do not claim persisted evidence exists.",
    nextSafeAction:
      "Leave audit posture not persisted.",
  },
  {
    id: "server-only-boundary-gate",
    label: "server-only boundary gate failure",
    state: "held / server-only boundary required",
    severity: "critical",
    operatorFacingExplanation:
      "The dry-run runner remains backend-owned and the frontend cannot cross the server-only boundary.",
    requiredEvidenceToUnblock:
      "A reviewed server-only boundary carried into the synthetic backend runner skeleton.",
    requiredRecoveryAction:
      "Keep provider logic out of the frontend and preserve blocked frontend posture.",
    nextSafeAction:
      "Maintain the server-only boundary.",
  },
  {
    id: "opaque-credential-gate",
    label: "opaque credential gate failure",
    state: "held / opaque credential missing",
    severity: "high",
    operatorFacingExplanation:
      "Credentials remain opaque reference only and no execution-safe credential posture exists.",
    requiredEvidenceToUnblock:
      "A reviewed opaque credential label for backend-only use.",
    requiredRecoveryAction:
      "Do not expose or read secrets; keep credentials as opaque references only.",
    nextSafeAction:
      "Leave credential posture reference-only.",
  },
  {
    id: "prompt-payload-review-gate",
    label: "prompt payload review gate failure",
    state: "held / prompt payload not reviewed",
    severity: "high",
    operatorFacingExplanation:
      "Prompt payload posture is still redacted placeholder only and no prompt may be sent.",
    requiredEvidenceToUnblock:
      "A reviewed redacted prompt payload posture with no prompt transmission.",
    requiredRecoveryAction:
      "Review the redacted payload manually and keep prompt sending not implemented.",
    nextSafeAction:
      "Do not send prompts.",
  },
  {
    id: "privacy-redaction-gate",
    label: "privacy/redaction gate failure",
    state: "held / privacy redaction incomplete",
    severity: "high",
    operatorFacingExplanation:
      "Privacy and redaction review remain incomplete for the held runner posture.",
    requiredEvidenceToUnblock:
      "A reviewed privacy/redaction checklist scoped to the lane.",
    requiredRecoveryAction:
      "Keep content redacted and preserve review-only posture.",
    nextSafeAction:
      "Leave privacy review incomplete.",
  },
  {
    id: "cost-rate-timeout-gate",
    label: "cost/rate/timeout gate failure",
    state: "held / cost rate timeout incomplete",
    severity: "high",
    operatorFacingExplanation:
      "Cost, rate, and timeout posture are incomplete and cannot guard a future run.",
    requiredEvidenceToUnblock:
      "Reviewed cost acknowledgement, rate-limit posture, and timeout/cancel evidence.",
    requiredRecoveryAction:
      "Keep cost/rate/timeout posture review-only and do not admit or dispatch anything.",
    nextSafeAction:
      "Continue manual review with retries disabled.",
  },
  {
    id: "idempotency-replay-gate",
    label: "idempotency/replay gate failure",
    state: "held / idempotency replay not proven",
    severity: "high",
    operatorFacingExplanation:
      "Idempotency and replay protections do not exist beyond deterministic preview keys.",
    requiredEvidenceToUnblock:
      "A backend-owned idempotency key and replay-block contract.",
    requiredRecoveryAction:
      "Keep idempotency and replay posture descriptive only with no execution path.",
    nextSafeAction:
      "Leave replay posture blocked and review-only.",
  },
  {
    id: "single-run-lock-gate",
    label: "single-run lock gate failure",
    state: "held / single-run lock missing",
    severity: "critical",
    operatorFacingExplanation:
      "No single-run lock exists to protect invocation, dispatch, or execution.",
    requiredEvidenceToUnblock:
      "A backend-owned single-run lock contract tied to the synthetic runner skeleton.",
    requiredRecoveryAction:
      "Keep single-run lock visible and do not create a lease, queue, or job.",
    nextSafeAction:
      "Leave the runner lock-free in preview only.",
  },
  {
    id: "dry-run-request-contract-gate",
    label: "dry-run request contract gate failure",
    state: "held / dry-run request contract missing",
    severity: "high",
    operatorFacingExplanation:
      "No created request exists and the request contract remains review-only.",
    requiredEvidenceToUnblock:
      "A reviewed request contract ready to be consumed by a synthetic backend runner skeleton.",
    requiredRecoveryAction:
      "Keep request creation blocked and review request posture only.",
    nextSafeAction:
      "Leave dry-run request state not created.",
  },
  {
    id: "dry-run-response-contract-gate",
    label: "dry-run response contract gate failure",
    state: "held / dry-run response contract missing",
    severity: "high",
    operatorFacingExplanation:
      "No response exists and the response contract remains review-only.",
    requiredEvidenceToUnblock:
      "A reviewed response contract ready to be consumed by a synthetic backend runner skeleton.",
    requiredRecoveryAction:
      "Keep response receipt blocked and review response posture only.",
    nextSafeAction:
      "Leave dry-run response state not received.",
  },
  {
    id: "dry-run-error-contract-gate",
    label: "dry-run error contract gate failure",
    state: "held / dry-run error contract missing",
    severity: "high",
    operatorFacingExplanation:
      "No error exists and the error contract remains review-only.",
    requiredEvidenceToUnblock:
      "A reviewed error contract ready to be consumed by a synthetic backend runner skeleton.",
    requiredRecoveryAction:
      "Keep error receipt blocked and review error posture only.",
    nextSafeAction:
      "Leave dry-run error state not received.",
  },
  {
    id: "runner-invocation-gate",
    label: "runner invocation gate failure",
    state: "held / runner invocation blocked",
    severity: "critical",
    operatorFacingExplanation:
      "Runner invocation has not happened and remains explicitly blocked.",
    requiredEvidenceToUnblock:
      "Synthetic runner invocation wiring owned by the next backend-owned skeleton batch.",
    requiredRecoveryAction:
      "Keep invocation not invoked and do not create a live runner.",
    nextSafeAction:
      "Leave runner invocation not invoked.",
  },
  {
    id: "provider-adapter-boundary-gate",
    label: "provider adapter boundary gate failure",
    state: "held / provider adapter boundary blocked",
    severity: "critical",
    operatorFacingExplanation:
      "Provider adapter boundaries remain server-only and unavailable to the frontend review layer.",
    requiredEvidenceToUnblock:
      "A reviewed provider adapter boundary carried into the synthetic backend runner skeleton.",
    requiredRecoveryAction:
      "Keep provider adapters backend-only and do not import SDKs or call providers.",
    nextSafeAction:
      "Leave provider adapter boundary blocked.",
  },
  {
    id: "queue-dispatch-gate",
    label: "queue dispatch gate failure",
    state: "held / queue dispatch blocked",
    severity: "critical",
    operatorFacingExplanation:
      "Queue dispatch remains blocked and no runner may be queued.",
    requiredEvidenceToUnblock:
      "A backend-owned queue boundary in the synthetic runner skeleton.",
    requiredRecoveryAction:
      "Keep queue dispatch out of the frontend and leave it not dispatched.",
    nextSafeAction:
      "Leave queue dispatch blocked.",
  },
  {
    id: "worker-dispatch-gate",
    label: "worker dispatch gate failure",
    state: "held / worker dispatch blocked",
    severity: "critical",
    operatorFacingExplanation:
      "Worker dispatch remains blocked and no worker may pick up a run.",
    requiredEvidenceToUnblock:
      "A backend-owned worker isolation and dispatch boundary.",
    requiredRecoveryAction:
      "Keep worker orchestration future-only and do not simulate worker handoff.",
    nextSafeAction:
      "Leave worker dispatch blocked.",
  },
  {
    id: "job-execution-gate",
    label: "job execution gate failure",
    state: "held / job execution blocked",
    severity: "critical",
    operatorFacingExplanation:
      "Job execution remains blocked and no executable job exists in this preview layer.",
    requiredEvidenceToUnblock:
      "A backend-owned job execution boundary tied to the synthetic runner skeleton.",
    requiredRecoveryAction:
      "Do not create jobs, retries, or fallbacks from the frontend.",
    nextSafeAction:
      "Leave job execution not executed.",
  },
  {
    id: "persistence-gate",
    label: "persistence gate failure",
    state: "held / persistence not implemented",
    severity: "high",
    operatorFacingExplanation:
      "Result, audit, and approval persistence are not implemented in this batch.",
    requiredEvidenceToUnblock:
      "Backend-owned result, audit, and approval persistence contracts.",
    requiredRecoveryAction:
      "Keep persistence claims out of the frontend and continue using preview-only references.",
    nextSafeAction:
      "Leave persistence unimplemented.",
  },
] as const satisfies readonly DryRunRunnerGateFailureSeed[];

const RECOVERY_READINESS_CHECKLIST_SEEDS = [
  {
    checklistId: "backend-admission-contract-reviewed",
    label: "backend admission contract reviewed",
    state: "manual review required",
    severity: "critical",
    evidenceRequired:
      "A reviewed backend admission contract reference for the future runner path.",
    recoveryAction:
      "Review the prior contract manually and keep execution blocked.",
    owner: "operator",
    nextSafeAction:
      "Keep backend admission review open.",
  },
  {
    checklistId: "admission-token-contract-reviewed",
    label: "admission token contract reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed token contract posture for backend-only issuance.",
    recoveryAction:
      "Keep token review descriptive only and do not issue a token.",
    owner: "backend future",
    nextSafeAction:
      "Leave admission token state not issued.",
  },
  {
    checklistId: "admission-lease-contract-reviewed",
    label: "admission lease contract reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed lease contract posture for backend-only creation.",
    recoveryAction:
      "Keep lease review descriptive only and do not create a lease.",
    owner: "backend future",
    nextSafeAction:
      "Leave admission lease state not created.",
  },
  {
    checklistId: "runner-contract-reviewed",
    label: "runner contract reviewed",
    state: "manual review required",
    severity: "critical",
    evidenceRequired:
      "A reviewed backend-owned dry-run runner contract record.",
    recoveryAction:
      "Use the contract as a source boundary only and keep invocation blocked.",
    owner: "operator",
    nextSafeAction:
      "Continue contract review only.",
  },
  {
    checklistId: "dry-run-request-contract-reviewed",
    label: "dry-run request contract reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed dry-run request contract with redacted prompt posture.",
    recoveryAction:
      "Keep dry-run request creation blocked and review posture only.",
    owner: "operator",
    nextSafeAction:
      "Leave dry-run request not created.",
  },
  {
    checklistId: "dry-run-response-contract-reviewed",
    label: "dry-run response contract reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed dry-run response contract with no response received.",
    recoveryAction:
      "Keep dry-run response blocked and review posture only.",
    owner: "operator",
    nextSafeAction:
      "Leave dry-run response not received.",
  },
  {
    checklistId: "dry-run-error-contract-reviewed",
    label: "dry-run error contract reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed dry-run error contract with no error received.",
    recoveryAction:
      "Keep dry-run error blocked and review posture only.",
    owner: "operator",
    nextSafeAction:
      "Leave dry-run error not received.",
  },
  {
    checklistId: "runner-gate-schema-reviewed",
    label: "runner gate schema reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed runner gate schema across approval, safety, queue, worker, job, and persistence boundaries.",
    recoveryAction:
      "Review schema posture manually and keep all blocked gates explicit.",
    owner: "operator",
    nextSafeAction:
      "Continue gate schema review.",
  },
  {
    checklistId: "runner-readiness-matrix-reviewed",
    label: "runner readiness matrix reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed readiness matrix showing contract-only and not executable posture.",
    recoveryAction:
      "Keep readiness descriptive only and do not claim runner readiness exists.",
    owner: "operator",
    nextSafeAction:
      "Leave readiness not executable / contract-only.",
  },
  {
    checklistId: "dry-run-handoff-preview-reviewed",
    label: "dry-run handoff preview reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed handoff preview showing no handoff or execution occurs.",
    recoveryAction:
      "Keep handoff review static and do not create an execution handoff.",
    owner: "operator",
    nextSafeAction:
      "Continue handoff posture review only.",
  },
  {
    checklistId: "opaque-credential-label-reviewed",
    label: "opaque credential label reviewed",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed opaque credential label for backend-only reference.",
    recoveryAction:
      "Keep credentials opaque and do not expose or read secrets.",
    owner: "safety review",
    nextSafeAction:
      "Leave credentials reference-only.",
  },
  {
    checklistId: "prompt-payload-redacted",
    label: "prompt payload redacted",
    state: "manual review required",
    severity: "high",
    evidenceRequired:
      "A reviewed redacted prompt payload posture with no prompt transmission.",
    recoveryAction:
      "Keep prompt sending not implemented and preserve redaction.",
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
      "A reviewed privacy/redaction checklist for the held runner lane.",
    recoveryAction:
      "Keep content redacted and preserve review-only posture.",
    owner: "safety review",
    nextSafeAction:
      "Leave privacy posture under review.",
  },
  {
    checklistId: "cost-acknowledgement-reviewed",
    label: "cost acknowledgement reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed cost acknowledgement for the held dry-run lane.",
    recoveryAction:
      "Keep cost posture visible and do not create a run.",
    owner: "operator",
    nextSafeAction:
      "Continue cost review only.",
  },
  {
    checklistId: "rate-limit-reviewed",
    label: "rate limit reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed rate-limit posture for the capability lane.",
    recoveryAction:
      "Keep rate posture descriptive only and avoid live limiters.",
    owner: "backend future",
    nextSafeAction:
      "Carry rate posture into the synthetic skeleton batch.",
  },
  {
    checklistId: "timeout-cancel-reviewed",
    label: "timeout/cancel reviewed",
    state: "manual review required",
    severity: "medium",
    evidenceRequired:
      "A reviewed timeout/cancel posture for future backend dry-run execution.",
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
      "Keep idempotency and replay descriptive only in the frontend.",
    owner: "backend future",
    nextSafeAction:
      "Do not simulate replay protection or retries.",
  },
  {
    checklistId: "single-run-lock-reviewed",
    label: "single-run lock reviewed",
    state: "backend future required",
    severity: "critical",
    evidenceRequired:
      "A backend-owned single-run lock contract for invocation, queue, worker, and job protection.",
    recoveryAction:
      "Keep single-run lock as a visible future requirement only.",
    owner: "backend future",
    nextSafeAction:
      "Leave single-run lock unresolved until the synthetic skeleton batch.",
  },
  {
    checklistId: "queue-dispatch-still-blocked",
    label: "queue dispatch still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Proof that queue dispatch stays blocked in the current frontend-safe batch.",
    recoveryAction:
      "Keep queue dispatch not dispatched and do not enqueue anything.",
    owner: "backend future",
    nextSafeAction:
      "Leave queue dispatch blocked.",
  },
  {
    checklistId: "worker-dispatch-still-blocked",
    label: "worker dispatch still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Proof that worker dispatch stays blocked in the current frontend-safe batch.",
    recoveryAction:
      "Keep worker dispatch not dispatched and do not simulate worker pickup.",
    owner: "backend future",
    nextSafeAction:
      "Leave worker dispatch blocked.",
  },
  {
    checklistId: "job-execution-still-blocked",
    label: "job execution still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Proof that job execution stays blocked in the current frontend-safe batch.",
    recoveryAction:
      "Keep job execution not executed and do not create runnable jobs.",
    owner: "backend future",
    nextSafeAction:
      "Leave job execution blocked.",
  },
  {
    checklistId: "persistence-still-blocked",
    label: "persistence still blocked",
    state: "blocked",
    severity: "high",
    evidenceRequired:
      "Proof that result, audit, and approval persistence remain unimplemented.",
    recoveryAction:
      "Keep persistence absent and do not claim stored references exist.",
    owner: "backend future",
    nextSafeAction:
      "Leave persistence blocked.",
  },
  {
    checklistId: "provider-adapter-boundary-still-blocked",
    label: "provider adapter boundary still blocked",
    state: "blocked",
    severity: "critical",
    evidenceRequired:
      "Proof that provider adapter boundaries remain server-only and blocked.",
    recoveryAction:
      "Keep provider adapters out of the frontend and do not import SDKs.",
    owner: "backend future",
    nextSafeAction:
      "Leave provider adapter boundary blocked.",
  },
] as const satisfies readonly DryRunRunnerRecoveryReadinessChecklistSeed[];

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneCapabilityFamily(
  family: AthenaModelRoutingCapabilityFamilyRecord
): AthenaModelRoutingCapabilityFamilyRecord {
  return { ...family };
}

function requireRequest(
  id: BackendDryRunRunnerReviewId
): BackendDryRunRequestContractRecord {
  const record = BACKEND_DRY_RUN_REQUESTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing backend dry-run request contract for ${id}`);
  }

  return record;
}

function requireResponse(
  id: BackendDryRunRunnerReviewId
): BackendDryRunResponseContractRecord {
  const record = BACKEND_DRY_RUN_RESPONSES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing backend dry-run response contract for ${id}`);
  }

  return record;
}

function requireError(
  id: BackendDryRunRunnerReviewId
): BackendDryRunErrorContractRecord {
  const record = BACKEND_DRY_RUN_ERRORS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing backend dry-run error contract for ${id}`);
  }

  return record;
}

function requireReadiness(
  id: BackendDryRunRunnerReviewId
): BackendDryRunRunnerReadinessMatrixRecord {
  const record = BACKEND_DRY_RUN_READINESS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing backend dry-run readiness matrix for ${id}`);
  }

  return record;
}

function requireHandoff(
  id: BackendDryRunRunnerReviewId
): BackendDryRunRunnerHandoffPreviewRecord {
  const record = BACKEND_DRY_RUN_HANDOFFS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing backend dry-run handoff preview for ${id}`);
  }

  return record;
}

function buildReviewLabel(
  contract: BackendOwnedModelProviderDryRunRunnerContractRecord
): string {
  const suffix = " backend-owned dry-run runner contract";

  if (contract.label.endsWith(suffix)) {
    return `${contract.label.slice(
      0,
      contract.label.length - suffix.length
    )} backend-owned dry-run runner review`;
  }

  return `${contract.label} review`;
}

function resolveGateFailureLabel(
  id: BackendDryRunRunnerGateFailureId
): BackendDryRunRunnerGateFailureLabel {
  const seed = GATE_FAILURE_SEEDS.find((record) => record.id === id);

  if (!seed) {
    throw new Error(`Missing gate failure label for ${id}`);
  }

  return seed.label;
}

export function uniqueDryRunRunnerReviewDisplayStrings<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Array.from(new Set(values));
}

export function buildStableBackendDryRunRunnerReviewKey(
  id: BackendDryRunRunnerReviewId
): BackendDryRunRunnerReviewKey {
  return `backend-owned-model-provider-dry-run-runner-review:${id}`;
}

export function buildStableDryRunRunnerDecisionReviewKey(
  id: BackendDryRunRunnerReviewId
): BackendDryRunRunnerDecisionReviewKey {
  return `backend-owned-model-provider-dry-run-runner-decision-review:${id}`;
}

export function buildStableDryRunRunnerGateFailureReviewKey(
  reviewId: BackendDryRunRunnerReviewId,
  gateId: BackendDryRunRunnerGateFailureId
): BackendDryRunRunnerGateFailureReviewKey {
  return `backend-owned-model-provider-dry-run-runner-gate-failure-review:${reviewId}:${gateId}`;
}

export function buildStableDryRunRunnerRecoveryPlanKey(
  id: BackendDryRunRunnerReviewId
): BackendDryRunRunnerRecoveryPlanKey {
  return `backend-owned-model-provider-dry-run-runner-recovery-plan:${id}`;
}

export function buildStableDryRunRunnerRecoveryReadinessChecklistKey(
  checklistId: BackendDryRunRunnerRecoveryReadinessChecklistId
): BackendDryRunRunnerRecoveryReadinessChecklistKey {
  return `backend-owned-model-provider-dry-run-runner-recovery-readiness:${checklistId}`;
}

export function buildStableDryRunRunnerReviewAuditSummaryKey(
  id: BackendDryRunRunnerReviewId
): BackendDryRunRunnerReviewAuditSummaryKey {
  return `backend-owned-model-provider-dry-run-runner-review-audit-summary:${id}`;
}

export function buildStableDryRunRunnerAcceptancePostureKey(
  id: BackendDryRunRunnerReviewId
): BackendDryRunRunnerAcceptancePostureKey {
  return `backend-owned-model-provider-dry-run-runner-acceptance-posture:${id}`;
}

function buildDryRunRunnerReview(
  contract: BackendOwnedModelProviderDryRunRunnerContractRecord
): BackendOwnedModelProviderDryRunRunnerReviewRecord {
  const request = requireRequest(contract.id);
  const response = requireResponse(contract.id);
  const error = requireError(contract.id);
  const readiness = requireReadiness(contract.id);
  const handoff = requireHandoff(contract.id);

  return {
    id: contract.id,
    key: buildStableBackendDryRunRunnerReviewKey(contract.id),
    reviewVersion: "backend-owned-model-provider-dry-run-runner-review-preview-v1",
    previewOnlyStatement: "dry-run runner review is preview-only",
    source: "Athena / Jarvis Model Gateway",
    reviewMode: "preview-only",
    reviewPosture: "runner contract review / not executable",
    label: buildReviewLabel(contract),
    operatorRequestPhrase: contract.operatorRequestPhrase,
    workspaceTarget: contract.workspaceTarget,
    sourceBackendDryRunRunnerContractReference: contract.key,
    sourceDryRunRequestContractReference: request.key,
    sourceDryRunResponseContractReference: response.key,
    sourceDryRunErrorContractReference: error.key,
    sourceDryRunRunnerGateSchemaReference:
      buildStableBackendDryRunRunnerGateSchemaKey("server-only-boundary"),
    sourceDryRunRunnerReadinessMatrixReference: readiness.key,
    sourceDryRunRunnerHandoffPreviewReference: handoff.key,
    sourceBackendAdmissionContractReference:
      contract.sourceBackendAdmissionContractReference,
    sourceRunIntentReference: contract.sourceRunIntentReference,
    selectedCapabilityFamily: cloneCapabilityFamily(
      contract.selectedCapabilityFamily
    ),
    providerSlotLabel: contract.providerSlotLabel,
    backupProviderSlotLabel: contract.backupProviderSlotLabel,
    localPrivateAlternativeLabel: contract.localPrivateAlternativeLabel,
    dryRunRunnerContractState: contract.dryRunRunnerContractState,
    dryRunRequestState: request.requestCreationState,
    dryRunInvocationState: request.runnerInvocationState,
    dryRunExecutionState: response.dryRunExecutionState,
    dryRunResponseState: response.responseState,
    dryRunErrorState: error.errorState,
    providerResponseState: response.providerResponseState,
    modelOutputState: response.modelOutputState,
    fixtureResultState: response.fixtureResultState,
    admissionTokenState: request.admissionTokenPosture,
    admissionLeaseState: request.admissionLeasePosture,
    queueDispatchState: response.queueDispatchState,
    workerDispatchState: response.workerDispatchState,
    jobExecutionState: response.jobExecutionState,
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
    resultCaptureRequiredInFuture: "result capture required in future",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    nextSyntheticDryRunRunnerSkeletonRequirement:
      "backend-owned synthetic dry-run runner skeleton next",
  };
}

function buildDecisionReview(
  review: BackendOwnedModelProviderDryRunRunnerReviewRecord
): BackendDryRunRunnerDecisionReviewRecord {
  const seed = DECISION_SEEDS[review.id];

  return {
    key: buildStableDryRunRunnerDecisionReviewKey(review.id),
    decisionReviewVersion:
      "backend-owned-model-provider-dry-run-runner-decision-review-preview-v1",
    previewOnlyStatement: "dry-run runner decision review is preview-only",
    dryRunRunnerReviewId: review.id,
    label: `${review.label} decision review`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    sourceRunnerContractReference: review.sourceBackendDryRunRunnerContractReference,
    sourceRequestContractReference: review.sourceDryRunRequestContractReference,
    sourceResponseContractReference: review.sourceDryRunResponseContractReference,
    sourceErrorContractReference: review.sourceDryRunErrorContractReference,
    decisionState: "held / not executable",
    runnerReasonSummary: seed.runnerReasonSummary,
    topBlockingGates: seed.topBlockingGateIds.map(resolveGateFailureLabel),
    topMissingEvidence: cloneList(seed.topMissingEvidence),
    operatorReviewNotes: cloneList(seed.operatorReviewNotes),
    manualRecoveryRequirement: seed.manualRecoveryRequirement,
    backendSkeletonDependency:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
    nextSafeAction: seed.nextSafeAction,
    explicitNoRunnerInvocationNoExecutionStatement:
      "No runner invocation. No execution. No provider execution. No model calls.",
  };
}

function buildGateFailureReview(
  review: BackendOwnedModelProviderDryRunRunnerReviewRecord,
  seed: DryRunRunnerGateFailureSeed
): BackendDryRunRunnerGateFailureReviewRecord {
  return {
    key: buildStableDryRunRunnerGateFailureReviewKey(review.id, seed.id),
    gateFailureReviewVersion:
      "backend-owned-model-provider-dry-run-runner-gate-failure-review-preview-v1",
    previewOnlyStatement: "dry-run runner gate failure review is preview-only",
    dryRunRunnerReviewId: review.id,
    label: `${seed.label} for ${review.selectedCapabilityFamily.label}`,
    failedGateId: seed.id,
    failedGateLabel: seed.label,
    gateState: seed.state,
    severity: seed.severity,
    affectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation: seed.operatorFacingExplanation,
    requiredEvidenceToUnblock: seed.requiredEvidenceToUnblock,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    backendSkeletonDependency:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
    nextSafeAction: seed.nextSafeAction,
    explicitNoGatePassStatement:
      "Gate remains blocked. No gate pass is granted.",
  };
}

function buildRecoveryPlan(
  review: BackendOwnedModelProviderDryRunRunnerReviewRecord
): BackendDryRunRunnerRecoveryPlanPreviewRecord {
  const lane = review.selectedCapabilityFamily.label;

  return {
    key: buildStableDryRunRunnerRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-model-provider-dry-run-runner-recovery-plan-preview-v1",
    previewOnlyStatement: "dry-run runner recovery plan is preview-only",
    dryRunRunnerReviewId: review.id,
    label: `${review.label} recovery plan`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    recoveryPosture: "manual review only",
    missingBackendAdmissionContractRecovery:
      `Review the backend admission contract dependency for ${lane} and keep the runner held until the synthetic backend-owned skeleton exists.`,
    admissionTokenNotIssuedRecovery:
      `Keep admission token state not issued for ${lane} and review future backend-only token posture.`,
    admissionLeaseNotCreatedRecovery:
      `Keep admission lease state not created for ${lane} and review future backend-only lease posture.`,
    missingManualApprovalRecovery:
      `Review operator approval requirements for ${lane} and do not allow a runnable path.`,
    missingManualConfirmationRecovery:
      `Review manual confirmation for ${lane} and keep the runner not executable.`,
    killSwitchActiveRecovery:
      `Keep the kill switch active for ${lane} while queue, worker, and job boundaries remain blocked.`,
    approvalExpiredRecovery:
      `Review approval expiry posture for ${lane} and do not claim an active execution window exists.`,
    approvalRevokedRecovery:
      `Review approval revocation posture for ${lane} and do not claim active authorization exists.`,
    missingOpaqueCredentialRecovery:
      `Keep credential posture opaque for ${lane} and do not expose or read secrets.`,
    promptPayloadNotReviewedRecovery:
      `Keep prompt payload redacted for ${lane} and do not send prompts.`,
    privacyRedactionIncompleteRecovery:
      `Review privacy and redaction posture for ${lane} before any backend skeleton discussion continues.`,
    costRateTimeoutIncompleteRecovery:
      `Review cost, rate, and timeout posture for ${lane} with execution still blocked.`,
    runnerContractIncompleteRecovery:
      `Use the dry-run runner contract for ${lane} as a source boundary only and keep it draft / preview-only.`,
    dryRunRequestNotCreatedRecovery:
      `Keep dry-run request state not created for ${lane} until a synthetic backend runner skeleton exists.`,
    runnerInvocationNotInvokedRecovery:
      `Keep runner invocation not invoked for ${lane} and do not add a live runner.`,
    dryRunExecutionNotExecutedRecovery:
      `Keep dry-run execution not executed for ${lane} and do not create provider execution paths.`,
    providerResponseNotReceivedRecovery:
      `Keep provider response state not received for ${lane} and do not simulate provider output.`,
    modelOutputNotGeneratedRecovery:
      `Keep model output state not generated for ${lane} and do not call models.`,
    fixtureResultNotProducedRecovery:
      `Keep fixture result state not produced for ${lane} and do not capture results.`,
    queueDispatchBlockedRecovery:
      `Keep queue dispatch blocked for ${lane} and do not enqueue anything.`,
    workerDispatchBlockedRecovery:
      `Keep worker dispatch blocked for ${lane} and do not simulate worker pickup.`,
    jobExecutionBlockedRecovery:
      `Keep job execution blocked for ${lane} and do not create runnable jobs.`,
    auditPersistenceMissingRecovery:
      `Keep audit persistence unimplemented for ${lane} and do not claim stored audit references exist.`,
    resultPersistenceMissingRecovery:
      `Keep result persistence unimplemented for ${lane} and do not claim stored results exist.`,
    approvalPersistenceMissingRecovery:
      `Keep approval persistence unimplemented for ${lane} and do not claim stored approvals exist.`,
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    operatorActionRequired:
      `Review ${lane} manually and carry blocked runner evidence into the synthetic backend-owned runner skeleton batch.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
    explicitNoRetryNoFallbackNoExecutionStatement:
      "No retry. No fallback. No execution. Manual review only.",
  };
}

function buildRecoveryReadinessChecklistRecord(
  seed: DryRunRunnerRecoveryReadinessChecklistSeed
): BackendDryRunRunnerRecoveryReadinessChecklistRecord {
  return {
    key: buildStableDryRunRunnerRecoveryReadinessChecklistKey(seed.checklistId),
    checklistVersion:
      "backend-owned-model-provider-dry-run-runner-recovery-readiness-checklist-v1",
    previewOnlyStatement: "dry-run runner recovery readiness is preview-only",
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    syntheticRunnerSkeletonDependency:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

function buildReviewAuditSummary(
  review: BackendOwnedModelProviderDryRunRunnerReviewRecord,
  decision: BackendDryRunRunnerDecisionReviewRecord,
  recoveryPlan: BackendDryRunRunnerRecoveryPlanPreviewRecord
): BackendDryRunRunnerReviewAuditSummaryRecord {
  return {
    key: buildStableDryRunRunnerReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-model-provider-dry-run-runner-review-audit-summary-preview-v1",
    previewOnlyStatement:
      "dry-run runner review audit summary is preview-only",
    dryRunRunnerReviewId: review.id,
    label: `${review.label} audit summary`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    auditPosture: "preview-only",
    auditReferenceState: "not persisted",
    approvalReferenceState: "not persisted",
    resultReferenceState: "not persisted",
    evidenceSummary:
      `Review references remain preview-only for ${review.selectedCapabilityFamily.label}: ${review.sourceBackendDryRunRunnerContractReference}, ${review.sourceDryRunRequestContractReference}, ${review.sourceDryRunResponseContractReference}, and ${review.sourceDryRunErrorContractReference}.`,
    failedGateSummary: decision.topBlockingGates.join(" | "),
    recoverySummary:
      `${recoveryPlan.recoveryPosture}. ${recoveryPlan.retryPosture} retry posture. ${recoveryPlan.fallbackPosture} fallback posture.`,
    blockedActionSummary:
      "dry-run request is not created. runner invocation is not invoked. dry-run execution is not executed. queue dispatch is blocked. worker dispatch is blocked. job execution is blocked.",
    noPromptSendingStatement: "No prompt sending",
    noProviderExecutionStatement: "No provider execution",
    noRunnerInvocationStatement: "No runner invocation",
    noQueueDispatchStatement: "No queue dispatch",
    noWorkerDispatchStatement: "No worker dispatch",
    noJobExecutionStatement: "No job execution",
    noPersistenceStatement: "No persistence",
    syntheticRunnerSkeletonRequirement:
      "backend-owned synthetic dry-run runner skeleton next",
  };
}

function buildAcceptancePosture(
  review: BackendOwnedModelProviderDryRunRunnerReviewRecord
): BackendOwnedModelProviderDryRunRunnerAcceptancePostureRecord {
  const lane = review.selectedCapabilityFamily.label;

  return {
    key: buildStableDryRunRunnerAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-model-provider-dry-run-runner-acceptance-posture-preview-v1",
    previewOnlyStatement: "dry-run runner acceptance posture is preview-only",
    dryRunRunnerReviewId: review.id,
    label: `${review.label} acceptance posture`,
    workspaceTarget: review.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    acceptanceState: "not accepted / preview-only",
    acceptanceBlockers: [
      "dry-run request is not created",
      "dry-run invocation is not invoked",
      "dry-run execution is not executed",
      "dry-run response is not received",
      "dry-run error is not received",
    ],
    safetyBlockers: [
      "kill switch required",
      "manual confirmation required",
      "privacy/redaction required",
      "audit required",
    ],
    privacyBlockers: [
      "opaque credential references only",
      "prompt payload review incomplete",
      "privacy/redaction incomplete",
    ],
    costRateBlockers: [
      "cost acknowledgement required",
      "rate limit guard required",
      "timeout/cancel guard required",
    ],
    auditBlockers: [
      "audit required",
      "audit persistence not implemented",
    ],
    approvalBlockers: [
      "manual approval required",
      "manual confirmation required",
      "approval expiry/revocation review required",
    ],
    runnerBlockers: [
      "runner contract state is draft / preview-only",
      "runner invocation gate failure",
      "provider adapter boundary gate failure",
    ],
    queueWorkerJobBlockers: [
      "queue dispatch is blocked",
      "worker dispatch is blocked",
      "job execution is blocked",
    ],
    persistenceBlockers: [
      "result persistence not implemented",
      "audit persistence not implemented",
      "approval persistence not implemented",
    ],
    requiredEvidence: [
      `A reviewed backend admission contract for ${lane}.`,
      `A reviewed dry-run request/response/error contract triplet for ${lane}.`,
      "A synthetic backend-owned runner skeleton that keeps execution blocked while wiring inert state transitions.",
    ],
    nextSafeAction:
      `Keep ${lane} not accepted, keep the runner non-executable, and carry blockers into the synthetic backend-owned runner skeleton batch.`,
    explicitNoAcceptanceNoExecutionStatement:
      "No acceptance. No execution. No provider execution. No model calls.",
  };
}

const BACKEND_OWNED_DRY_RUN_RUNNER_REVIEWS =
  BACKEND_DRY_RUN_RUNNER_CONTRACTS.map(buildDryRunRunnerReview);
const DRY_RUN_RUNNER_DECISION_REVIEWS =
  BACKEND_OWNED_DRY_RUN_RUNNER_REVIEWS.map(buildDecisionReview);
const DRY_RUN_RUNNER_GATE_FAILURE_REVIEWS =
  BACKEND_OWNED_DRY_RUN_RUNNER_REVIEWS.flatMap((review) =>
    GATE_FAILURE_SEEDS.map((seed) => buildGateFailureReview(review, seed))
  );
const DRY_RUN_RUNNER_RECOVERY_PLAN_PREVIEWS =
  BACKEND_OWNED_DRY_RUN_RUNNER_REVIEWS.map(buildRecoveryPlan);
const DRY_RUN_RUNNER_RECOVERY_READINESS_CHECKLIST_RECORDS =
  RECOVERY_READINESS_CHECKLIST_SEEDS.map(buildRecoveryReadinessChecklistRecord);
const DRY_RUN_RUNNER_DECISION_REVIEWS_BY_ID = new Map(
  DRY_RUN_RUNNER_DECISION_REVIEWS.map((record) => [
    record.dryRunRunnerReviewId,
    record,
  ] as const)
);
const DRY_RUN_RUNNER_RECOVERY_PLANS_BY_ID = new Map(
  DRY_RUN_RUNNER_RECOVERY_PLAN_PREVIEWS.map((record) => [
    record.dryRunRunnerReviewId,
    record,
  ] as const)
);
const DRY_RUN_RUNNER_REVIEW_AUDIT_SUMMARIES =
  BACKEND_OWNED_DRY_RUN_RUNNER_REVIEWS.map((review) => {
    const decision = DRY_RUN_RUNNER_DECISION_REVIEWS_BY_ID.get(review.id);
    const recoveryPlan = DRY_RUN_RUNNER_RECOVERY_PLANS_BY_ID.get(review.id);

    if (!decision || !recoveryPlan) {
      throw new Error(`Missing audit summary dependencies for ${review.id}`);
    }

    return buildReviewAuditSummary(review, decision, recoveryPlan);
  });
const DRY_RUN_RUNNER_ACCEPTANCE_POSTURES =
  BACKEND_OWNED_DRY_RUN_RUNNER_REVIEWS.map(buildAcceptancePosture);

export function listBackendOwnedModelProviderDryRunRunnerReviews():
  readonly BackendOwnedModelProviderDryRunRunnerReviewRecord[] {
  return BACKEND_OWNED_DRY_RUN_RUNNER_REVIEWS.map((record) => ({
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  }));
}

export function listDryRunRunnerDecisionReviewRecords():
  readonly BackendDryRunRunnerDecisionReviewRecord[] {
  return DRY_RUN_RUNNER_DECISION_REVIEWS.map((record) => ({
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
    topBlockingGates: cloneList(record.topBlockingGates),
    topMissingEvidence: cloneList(record.topMissingEvidence),
    operatorReviewNotes: cloneList(record.operatorReviewNotes),
  }));
}

export function listDryRunRunnerGateFailureReviewRecords():
  readonly BackendDryRunRunnerGateFailureReviewRecord[] {
  return DRY_RUN_RUNNER_GATE_FAILURE_REVIEWS.map((record) => ({
    ...record,
    affectedCapabilityFamily: cloneCapabilityFamily(record.affectedCapabilityFamily),
  }));
}

export function listDryRunRunnerRecoveryPlanPreviews():
  readonly BackendDryRunRunnerRecoveryPlanPreviewRecord[] {
  return DRY_RUN_RUNNER_RECOVERY_PLAN_PREVIEWS.map((record) => ({
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  }));
}

export function listDryRunRunnerRecoveryReadinessChecklistRecords():
  readonly BackendDryRunRunnerRecoveryReadinessChecklistRecord[] {
  return DRY_RUN_RUNNER_RECOVERY_READINESS_CHECKLIST_RECORDS.map((record) => ({
    ...record,
  }));
}

export function listDryRunRunnerReviewAuditSummaries():
  readonly BackendDryRunRunnerReviewAuditSummaryRecord[] {
  return DRY_RUN_RUNNER_REVIEW_AUDIT_SUMMARIES.map((record) => ({
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  }));
}

export function listDryRunRunnerAcceptancePostureRecords():
  readonly BackendOwnedModelProviderDryRunRunnerAcceptancePostureRecord[] {
  return DRY_RUN_RUNNER_ACCEPTANCE_POSTURES.map((record) => ({
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
    acceptanceBlockers: cloneList(record.acceptanceBlockers),
    safetyBlockers: cloneList(record.safetyBlockers),
    privacyBlockers: cloneList(record.privacyBlockers),
    costRateBlockers: cloneList(record.costRateBlockers),
    auditBlockers: cloneList(record.auditBlockers),
    approvalBlockers: cloneList(record.approvalBlockers),
    runnerBlockers: cloneList(record.runnerBlockers),
    queueWorkerJobBlockers: cloneList(record.queueWorkerJobBlockers),
    persistenceBlockers: cloneList(record.persistenceBlockers),
    requiredEvidence: cloneList(record.requiredEvidence),
  }));
}

export function groupDryRunRunnerReviewsByCapabilityFamily():
  readonly BackendDryRunRunnerReviewCapabilityFamilyGroup[] {
  const groups = new Map<
    BackendDryRunRunnerReviewCapabilityFamilyGroup["capabilityFamilyId"],
    {
      capabilityFamilyLabel: BackendDryRunRunnerReviewCapabilityFamilyGroup["capabilityFamilyLabel"];
      reviews: BackendOwnedModelProviderDryRunRunnerReviewRecord[];
    }
  >();

  for (const review of BACKEND_OWNED_DRY_RUN_RUNNER_REVIEWS) {
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
    reviews: value.reviews.map((review) => ({
      ...review,
      selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    })),
  }));
}

export function groupDryRunRunnerReviewsByWorkspaceTarget():
  readonly BackendDryRunRunnerReviewWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedModelProviderDryRunRunnerReviewRecord[]
  >();

  for (const review of BACKEND_OWNED_DRY_RUN_RUNNER_REVIEWS) {
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
    reviews: reviews.map((review) => ({
      ...review,
      selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    })),
  }));
}

export function buildDryRunRunnerReviewSummary():
  BackendDryRunRunnerReviewSummary {
  const capabilityGroups = groupDryRunRunnerReviewsByCapabilityFamily();
  const workspaceGroups = groupDryRunRunnerReviewsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
    reviewCount: BACKEND_OWNED_DRY_RUN_RUNNER_REVIEWS.length,
    decisionReviewCount: DRY_RUN_RUNNER_DECISION_REVIEWS.length,
    gateFailureReviewCount: DRY_RUN_RUNNER_GATE_FAILURE_REVIEWS.length,
    recoveryPlanCount: DRY_RUN_RUNNER_RECOVERY_PLAN_PREVIEWS.length,
    recoveryReadinessChecklistCount:
      DRY_RUN_RUNNER_RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    auditSummaryCount: DRY_RUN_RUNNER_REVIEW_AUDIT_SUMMARIES.length,
    acceptancePostureCount: DRY_RUN_RUNNER_ACCEPTANCE_POSTURES.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildDryRunRunnerGateFailureSummary():
  BackendDryRunRunnerGateFailureSummary {
  const uniqueFailedGates = Array.from(
    new Map(
      DRY_RUN_RUNNER_GATE_FAILURE_REVIEWS.map((record) => [
        record.failedGateId,
        record,
      ] as const)
    ).values()
  );

  return {
    currentBatch:
      BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH,
    gateFailureReviewCount: DRY_RUN_RUNNER_GATE_FAILURE_REVIEWS.length,
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
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
  };
}

export function buildDryRunRunnerRecoverySummary():
  BackendDryRunRunnerRecoverySummary {
  const blockedChecklistCount =
    DRY_RUN_RUNNER_RECOVERY_READINESS_CHECKLIST_RECORDS.filter(
      (record) => record.state === "blocked"
    ).length;

  return {
    currentBatch:
      BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH,
    recoveryPlanCount: DRY_RUN_RUNNER_RECOVERY_PLAN_PREVIEWS.length,
    recoveryReadinessChecklistCount:
      DRY_RUN_RUNNER_RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    blockedChecklistCount,
    acceptancePostureCount: DRY_RUN_RUNNER_ACCEPTANCE_POSTURES.length,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH,
    nextSafeAction:
      "Keep the runner review-only, manual-review-only, and non-executable until the synthetic backend-owned dry-run runner skeleton is introduced.",
  };
}

export function buildSyntheticDryRunRunnerSkeletonChecklist():
  readonly string[] {
  return cloneList(SYNTHETIC_DRY_RUN_RUNNER_SKELETON_CHECKLIST);
}
