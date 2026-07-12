import type {
  AiModelProviderCapabilityId,
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  listAdmissionDecisionReviews,
  listAdmissionRecoveryPlanPreviews,
  listAdmissionRecoveryReadinessChecklistRecords,
  listAdmissionReviewAuditSummaries,
  listGateFailureReviewRecords,
  listModelProviderRunAdmissionReviews,
  type ModelProviderAdmissionDecisionReviewRecord,
  type ModelProviderAdmissionGateFailureReviewRecord,
  type ModelProviderAdmissionRecoveryPlanPreviewRecord,
  type ModelProviderAdmissionRecoveryReadinessChecklistRecord,
  type ModelProviderAdmissionReviewAuditSummaryRecord,
  type ModelProviderRunAdmissionReviewRecord,
} from "../model-provider-run-admission-review-recovery-preview";
import {
  listModelProviderApprovalPackets,
  listModelProviderRunIntentPreviews,
  type ModelProviderApprovalPacketRecord,
  type ModelProviderRunIntentPreviewRecord,
} from "../model-provider-approval-packet-run-intent-preview";
import {
  BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
  BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_PHASE,
  NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
  PREVIOUS_COMPLETED_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
  type BackendAdmissionContractCapabilityFamilyGroup,
  type BackendAdmissionContractId,
  type BackendAdmissionContractKey,
  type BackendAdmissionContractSeed,
  type BackendAdmissionContractSummary,
  type BackendAdmissionContractWorkspaceGroup,
  type BackendAdmissionErrorContractKey,
  type BackendAdmissionErrorContractRecord,
  type BackendAdmissionRequestContractKey,
  type BackendAdmissionRequestContractRecord,
  type BackendAdmissionResponseContractKey,
  type BackendAdmissionResponseContractRecord,
  type BackendContractGateId,
  type BackendContractGateLabel,
  type BackendContractGateOwner,
  type BackendContractGateSchemaKey,
  type BackendContractGateSummary,
  type BackendContractReadinessMatrixKey,
  type BackendContractReadinessMatrixRecord,
  type BackendContractReadinessSummary,
  type BackendOwnedContractGateSchemaRecord,
  type BackendOwnedModelProviderRunAdmissionContractRecord,
} from "./backend-owned-model-provider-run-admission-contract-types";

const CONTRACT_SUMMARY_LINES = [
  "backend-owned model provider run admission contract only",
  "backend-owned contract is preview-only",
  "contract state: draft / preview-only",
  "admission request is not created",
  "backend response is not received",
  "backend error is not received",
  "admission token is not issued",
  "admission lease is not created",
  "admission ticket is not issued",
  "request/response/error contracts are preview-only",
  "gate schema is preview-only",
  "readiness matrix is preview-only",
  "current readiness is not executable / contract-only",
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
  "backend-owned dry-run runner contract next",
] as const;

const GATE_SUMMARY_LINES = [
  "operator approval",
  "manual confirmation",
  "approval expiry/revocation",
  "kill switch",
  "audit",
  "server-only boundary",
  "no frontend provider call",
  "no provider SDK import in frontend",
  "no prompt sending from frontend",
  "opaque credential reference",
  "privacy/redaction",
  "cost/rate/timeout",
  "idempotency/replay block",
  "single-run lock",
  "dry-run result review",
  "acceptance matrix review",
  "no queue dispatch until backend runner contract",
  "no worker dispatch until backend runner contract",
  "no job execution until backend runner contract",
] as const;

const READINESS_SUMMARY_LINES = [
  "contract draft state",
  "request contract state",
  "response contract state",
  "error contract state",
  "gate schema state",
  "credential boundary state",
  "safety boundary state",
  "audit boundary state",
  "approval boundary state",
  "queue/worker/job boundary state",
  "persistence boundary state",
  "current readiness: not executable / contract-only",
] as const;

const ADMISSION_REVIEWS = listModelProviderRunAdmissionReviews();
const ADMISSION_DECISION_REVIEWS = listAdmissionDecisionReviews();
const ADMISSION_GATE_FAILURE_REVIEWS = listGateFailureReviewRecords();
const ADMISSION_RECOVERY_PLANS = listAdmissionRecoveryPlanPreviews();
const ADMISSION_RECOVERY_READINESS =
  listAdmissionRecoveryReadinessChecklistRecords();
const ADMISSION_AUDIT_SUMMARIES = listAdmissionReviewAuditSummaries();
const APPROVAL_PACKETS = listModelProviderApprovalPackets();
const RUN_INTENT_PREVIEWS = listModelProviderRunIntentPreviews();

const ADMISSION_REVIEWS_BY_ID = new Map(
  ADMISSION_REVIEWS.map((review) => [review.id, review] as const)
);
const ADMISSION_DECISION_REVIEWS_BY_ID = new Map(
  ADMISSION_DECISION_REVIEWS.map((review) => [review.admissionReviewId, review] as const)
);
const ADMISSION_GATE_FAILURE_REVIEWS_BY_KEY = new Map(
  ADMISSION_GATE_FAILURE_REVIEWS.map((review) => [
    `${review.admissionReviewId}:${review.failedGateId}`,
    review,
  ] as const)
);
const ADMISSION_RECOVERY_PLANS_BY_ID = new Map(
  ADMISSION_RECOVERY_PLANS.map((plan) => [plan.admissionReviewId, plan] as const)
);
const ADMISSION_RECOVERY_READINESS_BY_ID = new Map(
  ADMISSION_RECOVERY_READINESS.map((record) => [record.checklistId, record] as const)
);
const ADMISSION_AUDIT_SUMMARIES_BY_ID = new Map(
  ADMISSION_AUDIT_SUMMARIES.map((summary) => [summary.admissionReviewId, summary] as const)
);
const APPROVAL_PACKETS_BY_ID = new Map(
  APPROVAL_PACKETS.map((packet) => [packet.id, packet] as const)
);
const RUN_INTENT_PREVIEWS_BY_ID = new Map(
  RUN_INTENT_PREVIEWS.map((preview) => [preview.id, preview] as const)
);

const CONTRACT_SEEDS = {
  "conversational-planning-request": {
    primaryGateFailureId: "operator-approval-gate",
    readinessChecklistId: "approval-scope-reviewed",
    nextSafeAction:
      "Review operator approval scope for conversational planning and keep the backend admission contract draft-only.",
  },
  "code-assistance-request": {
    primaryGateFailureId: "manual-confirmation-gate",
    readinessChecklistId: "manual-confirmation-captured",
    nextSafeAction:
      "Review manual confirmation posture for code assistance before any backend request shape is discussed.",
  },
  "website-copy-code-request": {
    primaryGateFailureId: "server-only-adapter-gate",
    readinessChecklistId: "server-only-adapter-contract-ready",
    nextSafeAction:
      "Keep website copy/code blocked behind the server-only boundary and review adapter readiness in the backend contract layer.",
  },
  "product-video-request": {
    primaryGateFailureId: "kill-switch-gate",
    readinessChecklistId: "kill-switch-reviewed",
    nextSafeAction:
      "Keep the video lane blocked by the kill switch and carry that requirement into the dry-run runner contract next.",
  },
  "storyboard-image-request": {
    primaryGateFailureId: "prompt-payload-review-gate",
    readinessChecklistId: "prompt-payload-redacted",
    nextSafeAction:
      "Keep storyboard prompt payloads redacted placeholders only and review prompt posture before any backend request exists.",
  },
  "audio-narration-request": {
    primaryGateFailureId: "cost-rate-timeout-gate",
    readinessChecklistId: "timeout-cancel-reviewed",
    nextSafeAction:
      "Review timeout, cancel, cost, and rate posture for narration before a backend runner contract is drafted.",
  },
  "transcription-caption-request": {
    primaryGateFailureId: "worker-dispatch-gate",
    readinessChecklistId: "worker-dispatch-still-blocked",
    nextSafeAction:
      "Keep worker dispatch blocked for transcription and preserve the held backend-only boundary.",
  },
  "embeddings-search-request": {
    primaryGateFailureId: "audit-gate",
    readinessChecklistId: "audit-posture-reviewed",
    nextSafeAction:
      "Keep embeddings/search audit-backed and non-persistent while the backend contract remains draft-only.",
  },
  "safety-moderation-review-request": {
    primaryGateFailureId: "privacy-redaction-gate",
    readinessChecklistId: "privacy-redaction-reviewed",
    nextSafeAction:
      "Keep safety/moderation review blocked until privacy and redaction review are carried into the backend contract.",
  },
  "local-private-inference-request": {
    primaryGateFailureId: "single-run-lock-gate",
    readinessChecklistId: "single-run-lock-reviewed",
    nextSafeAction:
      "Keep local/private inference contract-only until the backend single-run lock and server-only runner boundary are defined.",
  },
  "audit-recovery-explanation-request": {
    primaryGateFailureId: "acceptance-matrix-gate",
    readinessChecklistId: "acceptance-matrix-reviewed",
    nextSafeAction:
      "Keep audit/recovery explanation draft-only until the acceptance matrix and dry-run runner dependency are reviewed.",
  },
} as const satisfies Record<BackendAdmissionContractId, BackendAdmissionContractSeed>;

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneCapabilityFamily(
  family: BackendOwnedModelProviderRunAdmissionContractRecord["selectedCapabilityFamily"]
): BackendOwnedModelProviderRunAdmissionContractRecord["selectedCapabilityFamily"] {
  return { ...family };
}

function requireAdmissionReview(
  id: BackendAdmissionContractId
): ModelProviderRunAdmissionReviewRecord {
  const review = ADMISSION_REVIEWS_BY_ID.get(id);

  if (!review) {
    throw new Error(`Missing admission review for backend contract: ${id}`);
  }

  return review;
}

function requireAdmissionDecisionReview(
  id: BackendAdmissionContractId
): ModelProviderAdmissionDecisionReviewRecord {
  const review = ADMISSION_DECISION_REVIEWS_BY_ID.get(id);

  if (!review) {
    throw new Error(`Missing admission decision review for backend contract: ${id}`);
  }

  return review;
}

function requireGateFailureReview(
  id: BackendAdmissionContractId,
  gateFailureId: BackendAdmissionContractSeed["primaryGateFailureId"]
): ModelProviderAdmissionGateFailureReviewRecord {
  const review = ADMISSION_GATE_FAILURE_REVIEWS_BY_KEY.get(
    `${id}:${gateFailureId}`
  );

  if (!review) {
    throw new Error(
      `Missing gate failure review for backend contract: ${id}:${gateFailureId}`
    );
  }

  return review;
}

function requireRecoveryPlan(
  id: BackendAdmissionContractId
): ModelProviderAdmissionRecoveryPlanPreviewRecord {
  const plan = ADMISSION_RECOVERY_PLANS_BY_ID.get(id);

  if (!plan) {
    throw new Error(`Missing admission recovery plan for backend contract: ${id}`);
  }

  return plan;
}

function requireReadinessRecord(
  checklistId: BackendAdmissionContractSeed["readinessChecklistId"]
): ModelProviderAdmissionRecoveryReadinessChecklistRecord {
  const record = ADMISSION_RECOVERY_READINESS_BY_ID.get(checklistId);

  if (!record) {
    throw new Error(
      `Missing admission recovery readiness record for backend contract: ${checklistId}`
    );
  }

  return record;
}

function requireAuditSummary(
  id: BackendAdmissionContractId
): ModelProviderAdmissionReviewAuditSummaryRecord {
  const summary = ADMISSION_AUDIT_SUMMARIES_BY_ID.get(id);

  if (!summary) {
    throw new Error(`Missing admission audit summary for backend contract: ${id}`);
  }

  return summary;
}

function requireApprovalPacket(
  id: BackendAdmissionContractId
): ModelProviderApprovalPacketRecord {
  const packet = APPROVAL_PACKETS_BY_ID.get(id);

  if (!packet) {
    throw new Error(`Missing approval packet for backend contract: ${id}`);
  }

  return packet;
}

function requireRunIntent(
  id: BackendAdmissionContractId
): ModelProviderRunIntentPreviewRecord {
  const preview = RUN_INTENT_PREVIEWS_BY_ID.get(id);

  if (!preview) {
    throw new Error(`Missing run intent for backend contract: ${id}`);
  }

  return preview;
}

function requireContractSeed(
  id: BackendAdmissionContractId
): BackendAdmissionContractSeed {
  const seed = CONTRACT_SEEDS[id];

  if (!seed) {
    throw new Error(`Missing backend contract seed: ${id}`);
  }

  return seed;
}

export function uniqueBackendContractDisplayStrings<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Array.from(new Set(values));
}

export function buildStableBackendAdmissionContractKey(
  id: BackendAdmissionContractId
): BackendAdmissionContractKey {
  return `backend-owned-model-provider-run-admission-contract:${id}`;
}

export function buildStableBackendAdmissionRequestContractKey(
  id: BackendAdmissionContractId
): BackendAdmissionRequestContractKey {
  return `backend-owned-model-provider-run-admission-request-contract:${id}`;
}

export function buildStableBackendAdmissionResponseContractKey(
  id: BackendAdmissionContractId
): BackendAdmissionResponseContractKey {
  return `backend-owned-model-provider-run-admission-response-contract:${id}`;
}

export function buildStableBackendAdmissionErrorContractKey(
  id: BackendAdmissionContractId
): BackendAdmissionErrorContractKey {
  return `backend-owned-model-provider-run-admission-error-contract:${id}`;
}

export function buildStableBackendContractGateSchemaKey(
  id: BackendContractGateId
): BackendContractGateSchemaKey {
  return `backend-owned-model-provider-run-admission-gate-schema:${id}`;
}

export function buildStableBackendContractReadinessMatrixKey(
  id: BackendAdmissionContractId
): BackendContractReadinessMatrixKey {
  return `backend-owned-model-provider-run-admission-readiness-matrix:${id}`;
}

function buildBackendAdmissionContractRecord(
  id: BackendAdmissionContractId
): BackendOwnedModelProviderRunAdmissionContractRecord {
  const seed = requireContractSeed(id);
  const review = requireAdmissionReview(id);
  const decisionReview = requireAdmissionDecisionReview(id);
  const gateFailureReview = requireGateFailureReview(
    id,
    seed.primaryGateFailureId
  );
  const recoveryPlan = requireRecoveryPlan(id);
  const readinessRecord = requireReadinessRecord(seed.readinessChecklistId);
  const auditSummary = requireAuditSummary(id);
  const approvalPacket = requireApprovalPacket(id);
  const runIntent = requireRunIntent(id);

  return {
    id,
    key: buildStableBackendAdmissionContractKey(id),
    contractVersion: "backend-owned-model-provider-run-admission-contract-v1",
    previewOnlyStatement: "backend-owned contract is preview-only",
    label: `${review.label} backend-owned admission contract`,
    operatorRequestPhrase: review.operatorRequestPhrase,
    workspaceTarget: review.workspaceTarget,
    source: "Athena / Jarvis Model Gateway",
    contractOwner: "backend-owned",
    frontendMode: "preview-only",
    contractMode: "contract-only",
    runAdmissionPosture: "contract-defined / not executable",
    providerCallPosture: "not implemented",
    modelCallPosture: "not implemented",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    sourceAdmissionReviewReference: review.key,
    sourceAdmissionDecisionReviewReference: decisionReview.key,
    sourceGateFailureReviewReference: gateFailureReview.key,
    sourceAdmissionRecoveryPlanReference: recoveryPlan.key,
    sourceAdmissionRecoveryReadinessReference: readinessRecord.key,
    sourceAdmissionAuditSummaryReference: auditSummary.key,
    sourceApprovalPacketReference: approvalPacket.key,
    sourceRunIntentReference: runIntent.key,
    selectedCapabilityFamily: cloneCapabilityFamily(review.selectedCapabilityFamily),
    providerSlotLabel: review.providerSlotLabel,
    backupProviderSlotLabel: review.backupProviderSlotLabel,
    localPrivateAlternativeLabel: review.localPrivateAlternativeLabel,
    admissionContractState: "draft / preview-only",
    admissionRequestState: "not created",
    admissionTokenState: "not issued",
    admissionLeaseState: "not created",
    admissionTicketState: "not issued",
    queueDispatchState: "not dispatched",
    workerDispatchState: "not dispatched",
    jobExecutionState: "not executed",
    resultCaptureState: "not implemented",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
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
    blockedDefaultReason:
      `${gateFailureReview.operatorFacingExplanation} Frontend preview does not create backend admission requests, tokens, leases, queues, workers, jobs, or persistence.`,
    nextSafeAction: seed.nextSafeAction,
    nextBackendOwnedDryRunRunnerContractRequirement:
      "backend-owned model provider dry-run runner contract next",
  };
}

const BACKEND_ADMISSION_CONTRACTS = RUN_INTENT_PREVIEWS.map((preview) =>
  buildBackendAdmissionContractRecord(preview.id)
);

function cloneContract(
  record: BackendOwnedModelProviderRunAdmissionContractRecord
): BackendOwnedModelProviderRunAdmissionContractRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function buildBackendAdmissionRequestContractRecord(
  contract: BackendOwnedModelProviderRunAdmissionContractRecord
): BackendAdmissionRequestContractRecord {
  return {
    id: contract.id,
    key: buildStableBackendAdmissionRequestContractKey(contract.id),
    requestContractVersion:
      "backend-owned-model-provider-run-admission-request-contract-v1",
    previewOnlyStatement: "request contract preview",
    backendAdmissionContractId: contract.id,
    sourceRunIntentReference: contract.sourceRunIntentReference,
    sourceAdmissionReviewReference: contract.sourceAdmissionReviewReference,
    targetCapabilityFamily: cloneCapabilityFamily(contract.selectedCapabilityFamily),
    targetProviderSlotLabel: contract.providerSlotLabel,
    workspaceTarget: contract.workspaceTarget,
    requestCreationState: "not created",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    credentialReferencePosture: "opaque label only",
    approvalReferencePosture: "preview-only",
    auditReferencePosture: "preview-only",
    idempotencyKeyPosture: "deterministic preview key only",
    replayBlockPosture: "replay block required",
    singleRunLockPosture: "single-run lock required",
    serverOnlyBoundaryRequirement: "server-only required",
    blockedDefaultReason:
      `Backend admission request creation stays blocked for ${contract.label} because the contract remains draft / preview-only and the frontend cannot cross the server-only boundary.`,
    explicitNoBackendRequestCreatedStatement:
      "No backend admission request is created.",
  };
}

const BACKEND_ADMISSION_REQUEST_CONTRACTS = BACKEND_ADMISSION_CONTRACTS.map(
  (contract) => buildBackendAdmissionRequestContractRecord(contract)
);

function cloneRequestContract(
  record: BackendAdmissionRequestContractRecord
): BackendAdmissionRequestContractRecord {
  return {
    ...record,
    targetCapabilityFamily: cloneCapabilityFamily(record.targetCapabilityFamily),
  };
}

function buildBackendAdmissionResponseContractRecord(
  contract: BackendOwnedModelProviderRunAdmissionContractRecord
): BackendAdmissionResponseContractRecord {
  return {
    id: contract.id,
    key: buildStableBackendAdmissionResponseContractKey(contract.id),
    responseContractVersion:
      "backend-owned-model-provider-run-admission-response-contract-v1",
    previewOnlyStatement: "response contract preview",
    backendAdmissionContractId: contract.id,
    requestContractReference: buildStableBackendAdmissionRequestContractKey(
      contract.id
    ),
    responseState: "not received",
    admissionDecisionState: "not evaluated",
    admissionTokenState: "not issued",
    admissionLeaseState: "not created",
    queueDispatchState: "not dispatched",
    workerDispatchState: "not dispatched",
    jobExecutionState: "not executed",
    resultState: "not available",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    blockedDefaultReason:
      `Backend admission response remains absent for ${contract.label} because no backend request, token, lease, queue, worker, or job exists yet.`,
    explicitNoBackendResponseReceivedStatement:
      "No backend admission response is received.",
  };
}

const BACKEND_ADMISSION_RESPONSE_CONTRACTS = BACKEND_ADMISSION_CONTRACTS.map(
  (contract) => buildBackendAdmissionResponseContractRecord(contract)
);

function cloneResponseContract(
  record: BackendAdmissionResponseContractRecord
): BackendAdmissionResponseContractRecord {
  return { ...record };
}

function buildValidationErrorExamples(
  contract: BackendOwnedModelProviderRunAdmissionContractRecord
): readonly string[] {
  return [
    `Validation rejects ${contract.label} because backend admission contract state is draft / preview-only.`,
    `Validation rejects ${contract.label} because prompt payload posture is redacted placeholder only and request creation is blocked.`,
    `Validation rejects ${contract.label} because server-only boundary evidence is required before any backend request exists.`,
  ] as const;
}

function buildAdmissionDenialExamples(
  contract: BackendOwnedModelProviderRunAdmissionContractRecord
): readonly string[] {
  return [
    `Admission denies ${contract.label} because manual approval is still required.`,
    `Admission denies ${contract.label} because manual confirmation is still required.`,
    `Admission denies ${contract.label} because queue, worker, and job execution remain blocked by default.`,
  ] as const;
}

function buildBackendAdmissionErrorContractRecord(
  contract: BackendOwnedModelProviderRunAdmissionContractRecord
): BackendAdmissionErrorContractRecord {
  return {
    id: contract.id,
    key: buildStableBackendAdmissionErrorContractKey(contract.id),
    errorContractVersion:
      "backend-owned-model-provider-run-admission-error-contract-v1",
    previewOnlyStatement: "error contract preview",
    backendAdmissionContractId: contract.id,
    requestContractReference: buildStableBackendAdmissionRequestContractKey(
      contract.id
    ),
    errorState: "not received",
    validationErrorExamples: buildValidationErrorExamples(contract),
    admissionDenialExamples: buildAdmissionDenialExamples(contract),
    killSwitchDenialExample:
      `Kill switch denial holds ${contract.label} because backend execution remains blocked by default.`,
    approvalStaleDenialExample:
      `Approval stale denial holds ${contract.label} because approval expiry and revocation review remain unresolved.`,
    credentialBoundaryDenialExample:
      `Credential boundary denial holds ${contract.label} because only opaque credential references are allowed.`,
    privacyRedactionDenialExample:
      `Privacy/redaction denial holds ${contract.label} because prompt posture remains redacted placeholder only.`,
    rateTimeoutDenialExample:
      `Rate/timeout denial holds ${contract.label} because cost, rate, and timeout guards remain contract-only.`,
    queueDispatchBlockedExample:
      `Queue dispatch stays blocked for ${contract.label} until the backend-owned dry-run runner contract exists.`,
    workerDispatchBlockedExample:
      `Worker dispatch stays blocked for ${contract.label} until the backend-owned dry-run runner contract exists.`,
    jobExecutionBlockedExample:
      `Job execution stays blocked for ${contract.label} until the backend-owned dry-run runner contract exists.`,
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    recoveryPosture: "manual review only",
    explicitNoBackendErrorReceivedStatement:
      "No backend admission error is received.",
  };
}

const BACKEND_ADMISSION_ERROR_CONTRACTS = BACKEND_ADMISSION_CONTRACTS.map(
  (contract) => buildBackendAdmissionErrorContractRecord(contract)
);

function cloneErrorContract(
  record: BackendAdmissionErrorContractRecord
): BackendAdmissionErrorContractRecord {
  return {
    ...record,
    validationErrorExamples: cloneList(record.validationErrorExamples),
    admissionDenialExamples: cloneList(record.admissionDenialExamples),
  };
}

const GATE_SCHEMA_SEEDS = [
  {
    id: "operator-approval",
    label: "operator approval",
    owner: "operator",
    requiredState:
      "required / explicit operator approval must exist before backend admission can ever be created",
    evidenceRequirement:
      "Explicit operator approval scope for the selected capability family and workspace target.",
    blockedDefaultReason:
      "Frontend preview never creates backend admission without explicit operator approval.",
  },
  {
    id: "manual-confirmation",
    label: "manual confirmation",
    owner: "operator",
    requiredState:
      "required / manual confirmation must hold before backend-owned request creation exists",
    evidenceRequirement:
      "Manual confirmation record for the selected run-admission lane.",
    blockedDefaultReason:
      "Manual confirmation remains unsatisfied while the contract stays preview-only.",
  },
  {
    id: "approval-scope",
    label: "approval scope",
    owner: "operator",
    requiredState:
      "required / approval scope must stay explicit, bounded, and reviewable",
    evidenceRequirement:
      "Bounded approval scope covering workspace, capability family, and provider slot posture.",
    blockedDefaultReason:
      "Approval scope is not promoted from preview into backend admission in this batch.",
  },
  {
    id: "approval-expiry",
    label: "approval expiry",
    owner: "operator",
    requiredState:
      "required / approval expiry must be reviewed before backend request creation exists",
    evidenceRequirement:
      "Approval expiry review tied to the draft contract and future runner boundary.",
    blockedDefaultReason:
      "Approval expiry remains review-only in the frontend contract layer.",
  },
  {
    id: "approval-revocation",
    label: "approval revocation",
    owner: "operator",
    requiredState:
      "required / approval revocation must remain visible before backend execution exists",
    evidenceRequirement:
      "Revocation posture proving the backend path can be stopped before request, queue, worker, or job execution.",
    blockedDefaultReason:
      "Approval revocation remains contract-only and non-executable in the frontend preview.",
  },
  {
    id: "kill-switch",
    label: "kill switch",
    owner: "safety review",
    requiredState:
      "required / kill switch must stay reviewable and engaged-by-default until backend gates pass",
    evidenceRequirement:
      "Kill-switch evidence showing the run lane remains blocked by default.",
    blockedDefaultReason:
      "The contract layer preserves a blocked-by-default kill switch posture.",
  },
  {
    id: "audit",
    label: "audit",
    owner: "safety review",
    requiredState:
      "required / audit posture must exist even while audit persistence remains unavailable",
    evidenceRequirement:
      "Audit evidence requirements, audit summary reference, and blocked audit join state.",
    blockedDefaultReason:
      "Audit is required, but audit joins and persistence remain unavailable in this batch.",
  },
  {
    id: "server-only-boundary",
    label: "server-only boundary",
    owner: "backend-owned contract",
    requiredState:
      "required / server-only boundary must remain intact before any backend request exists",
    evidenceRequirement:
      "Server-only boundary proof linking the contract to backend-only execution.",
    blockedDefaultReason:
      "Frontend preview cannot cross the server-only boundary.",
  },
  {
    id: "no-frontend-provider-call",
    label: "no frontend provider call",
    owner: "backend-owned contract",
    requiredState:
      "required / frontend provider calls remain prohibited",
    evidenceRequirement:
      "Static frontend-safe preview proving no provider call path exists in the UI.",
    blockedDefaultReason:
      "Provider execution remains blocked from the frontend.",
  },
  {
    id: "no-provider-sdk-import-in-frontend",
    label: "no provider SDK import in frontend",
    owner: "backend-owned contract",
    requiredState:
      "required / provider SDK imports remain prohibited in the frontend",
    evidenceRequirement:
      "Frontend import boundary proof and static smoke coverage.",
    blockedDefaultReason:
      "Frontend preview keeps all provider SDK imports out of scope.",
  },
  {
    id: "no-prompt-sending-from-frontend",
    label: "no prompt sending from frontend",
    owner: "backend-owned contract",
    requiredState:
      "required / prompt sending remains blocked from the frontend",
    evidenceRequirement:
      "Prompt posture proof showing redacted placeholders only and no transmission state changes.",
    blockedDefaultReason:
      "Prompt transmission remains not sent in every contract record.",
  },
  {
    id: "opaque-credential-reference",
    label: "opaque credential reference",
    owner: "backend-owned contract",
    requiredState:
      "required / only opaque credential references may cross the contract boundary",
    evidenceRequirement:
      "Opaque credential reference label and no secret-value exposure.",
    blockedDefaultReason:
      "Credential handling remains reference-only and non-executable.",
  },
  {
    id: "no-plaintext-secrets",
    label: "no plaintext secrets",
    owner: "safety review",
    requiredState:
      "required / plaintext secrets remain prohibited",
    evidenceRequirement:
      "Secret posture proof showing no plaintext secrets and no browser storage usage.",
    blockedDefaultReason:
      "Secret posture remains locked to non-secret preview text only.",
  },
  {
    id: "privacy-redaction",
    label: "privacy/redaction",
    owner: "safety review",
    requiredState:
      "required / privacy and redaction review must remain explicit",
    evidenceRequirement:
      "Privacy/redaction evidence, prompt redaction posture, and blocked frontend transmission state.",
    blockedDefaultReason:
      "Privacy/redaction review remains contract-only and incomplete by design.",
  },
  {
    id: "cost-acknowledgement",
    label: "cost acknowledgement",
    owner: "operator",
    requiredState:
      "required / cost acknowledgement must remain explicit before backend request creation exists",
    evidenceRequirement:
      "Cost acknowledgement review and blocked execution posture for the capability family.",
    blockedDefaultReason:
      "Cost acknowledgement remains required and no backend request is created in this batch.",
  },
  {
    id: "rate-limit-guard",
    label: "rate limit guard",
    owner: "safety review",
    requiredState:
      "required / rate-limit guard must remain explicit before backend runner work exists",
    evidenceRequirement:
      "Rate-limit review evidence and blocked queue/worker/job posture.",
    blockedDefaultReason:
      "Rate-limit guard remains contract-only and non-executable.",
  },
  {
    id: "timeout-cancel-guard",
    label: "timeout/cancel guard",
    owner: "safety review",
    requiredState:
      "required / timeout and cancel guard must remain explicit before backend runner work exists",
    evidenceRequirement:
      "Timeout/cancel review evidence linked to the future backend runner boundary.",
    blockedDefaultReason:
      "Timeout/cancel guard remains contract-only and non-executable.",
  },
  {
    id: "idempotency",
    label: "idempotency",
    owner: "backend-owned contract",
    requiredState:
      "required / idempotency remains mandatory for every future backend request",
    evidenceRequirement:
      "Deterministic preview idempotency key posture and server-only enforcement requirement.",
    blockedDefaultReason:
      "Idempotency remains preview-only until the backend runner contract exists.",
  },
  {
    id: "replay-block",
    label: "replay block",
    owner: "backend-owned contract",
    requiredState:
      "required / replay block must remain explicit for future backend admission",
    evidenceRequirement:
      "Replay-block posture tied to the deterministic preview key and single-run lock.",
    blockedDefaultReason:
      "Replay block remains contract-only and blocked by default.",
  },
  {
    id: "single-run-lock",
    label: "single-run lock",
    owner: "backend-owned contract",
    requiredState:
      "required / single-run lock must remain explicit before backend dispatch exists",
    evidenceRequirement:
      "Single-run lock evidence and backend-only ownership for any future request.",
    blockedDefaultReason:
      "Single-run lock remains required and unimplemented in the frontend preview.",
  },
  {
    id: "dry-run-result-review",
    label: "dry-run result review",
    owner: "operator",
    requiredState:
      "required / dry-run result review must remain complete before backend runner work exists",
    evidenceRequirement:
      "Dry-run result review reference from the preceding preview-only review layer.",
    blockedDefaultReason:
      "Dry-run result review is required before the backend runner contract is considered.",
  },
  {
    id: "acceptance-matrix-review",
    label: "acceptance matrix review",
    owner: "operator",
    requiredState:
      "required / acceptance matrix review must remain explicit before backend runner work exists",
    evidenceRequirement:
      "Acceptance matrix review proof carried from the dry-run review chain.",
    blockedDefaultReason:
      "Acceptance matrix review remains unresolved in a non-executable frontend contract layer.",
  },
  {
    id: "admission-review-recovery",
    label: "admission review/recovery",
    owner: "operator",
    requiredState:
      "required / admission review and recovery evidence must remain linked before backend runner work exists",
    evidenceRequirement:
      "Admission review, decision review, gate failure review, recovery plan, readiness record, and audit summary references.",
    blockedDefaultReason:
      "Admission review/recovery stays preview-only and does not create backend admission.",
  },
  {
    id: "no-queue-dispatch-until-backend-runner-contract",
    label: "no queue dispatch until backend runner contract",
    owner: "backend-owned contract",
    requiredState:
      "required / queue dispatch must stay blocked until the backend-owned dry-run runner contract exists",
    evidenceRequirement:
      "Queue dispatch blocked posture and future backend runner dependency.",
    blockedDefaultReason:
      "Queue dispatch remains blocked by default in the contract-only layer.",
  },
  {
    id: "no-worker-dispatch-until-backend-runner-contract",
    label: "no worker dispatch until backend runner contract",
    owner: "backend-owned contract",
    requiredState:
      "required / worker dispatch must stay blocked until the backend-owned dry-run runner contract exists",
    evidenceRequirement:
      "Worker dispatch blocked posture and future backend runner dependency.",
    blockedDefaultReason:
      "Worker dispatch remains blocked by default in the contract-only layer.",
  },
  {
    id: "no-job-execution-until-backend-runner-contract",
    label: "no job execution until backend runner contract",
    owner: "backend-owned contract",
    requiredState:
      "required / job execution must stay blocked until the backend-owned dry-run runner contract exists",
    evidenceRequirement:
      "Job execution blocked posture and future backend runner dependency.",
    blockedDefaultReason:
      "Job execution remains blocked by default in the contract-only layer.",
  },
  {
    id: "no-persistence-until-future-backend-batch",
    label: "no persistence until future backend batch",
    owner: "backend-owned contract",
    requiredState:
      "required / persistence stays blocked until later backend-owned batches exist",
    evidenceRequirement:
      "Explicit result, audit, and approval non-persistence posture.",
    blockedDefaultReason:
      "Result, audit, and approval persistence remain out of scope in this batch.",
  },
] as const satisfies readonly {
  id: BackendContractGateId;
  label: BackendContractGateLabel;
  owner: BackendContractGateOwner;
  requiredState: string;
  evidenceRequirement: string;
  blockedDefaultReason: string;
}[];

const BACKEND_CONTRACT_GATE_SCHEMA_RECORDS:
  readonly BackendOwnedContractGateSchemaRecord[] = GATE_SCHEMA_SEEDS.map(
  (seed) => ({
    key: buildStableBackendContractGateSchemaKey(seed.id),
    gateSchemaVersion:
      "backend-owned-model-provider-run-admission-gate-schema-v1",
    previewOnlyStatement: "gate schema is preview-only",
    id: seed.id,
    label: seed.label,
    owner: seed.owner,
    requiredState: seed.requiredState,
    currentFrontendState: "preview-only",
    evidenceRequirement: seed.evidenceRequirement,
    blockedDefaultReason: seed.blockedDefaultReason,
    nextBackendContractRequirement:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
  })
);

function cloneGateSchemaRecord(
  record: BackendOwnedContractGateSchemaRecord
): BackendOwnedContractGateSchemaRecord {
  return { ...record };
}

function buildBackendContractReadinessMatrixRecord(
  contract: BackendOwnedModelProviderRunAdmissionContractRecord
): BackendContractReadinessMatrixRecord {
  return {
    id: contract.id,
    key: buildStableBackendContractReadinessMatrixKey(contract.id),
    readinessMatrixVersion:
      "backend-owned-model-provider-run-admission-readiness-matrix-v1",
    previewOnlyStatement: "readiness matrix is preview-only",
    label: `${contract.selectedCapabilityFamily.label} readiness matrix`,
    workspaceTarget: contract.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(contract.selectedCapabilityFamily),
    contractDraftState: "draft / preview-only",
    requestContractState: "not created",
    responseContractState: "not received",
    errorContractState: "not received",
    gateSchemaState: "preview-only",
    credentialBoundaryState: "opaque credential references only",
    safetyBoundaryState: "manual review only / blocked",
    auditBoundaryState: "preview-only / not persisted",
    approvalBoundaryState: "preview-only / not persisted",
    queueBoundaryState: "not dispatched",
    workerBoundaryState: "not dispatched",
    jobBoundaryState: "not executed",
    persistenceBoundaryState: "not implemented",
    dryRunRunnerDependency:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
    currentReadiness: "not executable / contract-only",
    nextSafeAction: contract.nextSafeAction,
  };
}

const BACKEND_CONTRACT_READINESS_MATRIX_RECORDS =
  BACKEND_ADMISSION_CONTRACTS.map((contract) =>
    buildBackendContractReadinessMatrixRecord(contract)
  );

function cloneReadinessMatrixRecord(
  record: BackendContractReadinessMatrixRecord
): BackendContractReadinessMatrixRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

export function listBackendOwnedModelProviderRunAdmissionContracts():
  readonly BackendOwnedModelProviderRunAdmissionContractRecord[] {
  return BACKEND_ADMISSION_CONTRACTS.map((record) => cloneContract(record));
}

export function listBackendAdmissionRequestContracts():
  readonly BackendAdmissionRequestContractRecord[] {
  return BACKEND_ADMISSION_REQUEST_CONTRACTS.map((record) =>
    cloneRequestContract(record)
  );
}

export function listBackendAdmissionResponseContracts():
  readonly BackendAdmissionResponseContractRecord[] {
  return BACKEND_ADMISSION_RESPONSE_CONTRACTS.map((record) =>
    cloneResponseContract(record)
  );
}

export function listBackendAdmissionErrorContracts():
  readonly BackendAdmissionErrorContractRecord[] {
  return BACKEND_ADMISSION_ERROR_CONTRACTS.map((record) =>
    cloneErrorContract(record)
  );
}

export function listBackendOwnedContractGateSchemaRecords():
  readonly BackendOwnedContractGateSchemaRecord[] {
  return BACKEND_CONTRACT_GATE_SCHEMA_RECORDS.map((record) =>
    cloneGateSchemaRecord(record)
  );
}

export function listBackendContractReadinessMatrixRecords():
  readonly BackendContractReadinessMatrixRecord[] {
  return BACKEND_CONTRACT_READINESS_MATRIX_RECORDS.map((record) =>
    cloneReadinessMatrixRecord(record)
  );
}

export function groupBackendContractsByCapabilityFamily():
  readonly BackendAdmissionContractCapabilityFamilyGroup[] {
  const groups = new Map<
    AiModelProviderCapabilityId,
    {
      capabilityFamilyLabel: BackendOwnedModelProviderRunAdmissionContractRecord["selectedCapabilityFamily"]["label"];
      contracts: BackendOwnedModelProviderRunAdmissionContractRecord[];
    }
  >();

  for (const contract of BACKEND_ADMISSION_CONTRACTS) {
    const existing = groups.get(contract.selectedCapabilityFamily.id);

    if (existing) {
      existing.contracts.push(cloneContract(contract));
      continue;
    }

    groups.set(contract.selectedCapabilityFamily.id, {
      capabilityFamilyLabel: contract.selectedCapabilityFamily.label,
      contracts: [cloneContract(contract)],
    });
  }

  return Array.from(groups.entries()).map(([capabilityFamilyId, group]) => ({
    capabilityFamilyId,
    capabilityFamilyLabel: group.capabilityFamilyLabel,
    contractCount: group.contracts.length,
    contracts: group.contracts,
  }));
}

export function groupBackendContractsByWorkspaceTarget():
  readonly BackendAdmissionContractWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedModelProviderRunAdmissionContractRecord[]
  >();

  for (const contract of BACKEND_ADMISSION_CONTRACTS) {
    const currentGroup = groups.get(contract.workspaceTarget) ?? [];
    currentGroup.push(cloneContract(contract));
    groups.set(contract.workspaceTarget, currentGroup);
  }

  return Array.from(groups.entries()).map(([workspaceTarget, contracts]) => ({
    workspaceTarget,
    contractCount: contracts.length,
    contracts,
  }));
}

export function buildBackendAdmissionContractSummary():
  BackendAdmissionContractSummary {
  const capabilityGroups = groupBackendContractsByCapabilityFamily();
  const workspaceGroups = groupBackendContractsByWorkspaceTarget();

  return {
    currentBatch: BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
    contractCount: BACKEND_ADMISSION_CONTRACTS.length,
    requestContractCount: BACKEND_ADMISSION_REQUEST_CONTRACTS.length,
    responseContractCount: BACKEND_ADMISSION_RESPONSE_CONTRACTS.length,
    errorContractCount: BACKEND_ADMISSION_ERROR_CONTRACTS.length,
    gateSchemaCount: BACKEND_CONTRACT_GATE_SCHEMA_RECORDS.length,
    readinessMatrixCount: BACKEND_CONTRACT_READINESS_MATRIX_RECORDS.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    contractState: "draft / preview-only",
    currentReadiness: "not executable / contract-only",
    summaryLines: cloneList(CONTRACT_SUMMARY_LINES),
  };
}

export function buildBackendContractGateSummary(): BackendContractGateSummary {
  return {
    currentBatch: BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
    gateCount: BACKEND_CONTRACT_GATE_SCHEMA_RECORDS.length,
    operatorOwnedGateCount: BACKEND_CONTRACT_GATE_SCHEMA_RECORDS.filter(
      (record) => record.owner === "operator"
    ).length,
    backendOwnedGateCount: BACKEND_CONTRACT_GATE_SCHEMA_RECORDS.filter(
      (record) => record.owner === "backend-owned contract"
    ).length,
    safetyReviewGateCount: BACKEND_CONTRACT_GATE_SCHEMA_RECORDS.filter(
      (record) => record.owner === "safety review"
    ).length,
    summaryLines: cloneList(GATE_SUMMARY_LINES),
  };
}

export function buildBackendContractReadinessSummary():
  BackendContractReadinessSummary {
  return {
    currentBatch: BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH,
    readinessMatrixCount: BACKEND_CONTRACT_READINESS_MATRIX_RECORDS.length,
    currentReadiness: "not executable / contract-only",
    nextSafeAction:
      "Keep the backend-owned admission contract draft-only and review the dry-run runner contract next while requests, queues, workers, jobs, and persistence remain blocked.",
    summaryLines: cloneList(READINESS_SUMMARY_LINES),
  };
}

function buildAffectedCapabilitySummary(
  groups: readonly BackendAdmissionContractCapabilityFamilyGroup[]
): string {
  return uniqueBackendContractDisplayStrings(
    groups.map((group) => group.capabilityFamilyLabel)
  ).join(", ");
}

function buildAffectedWorkspaceSummary(
  groups: readonly BackendAdmissionContractWorkspaceGroup[]
): string {
  return uniqueBackendContractDisplayStrings(
    groups.map((group) => group.workspaceTarget)
  ).join(", ");
}

export function buildNextBackendOwnedDryRunRunnerContractChecklist():
  readonly string[] {
  const capabilitySummary = buildAffectedCapabilitySummary(
    groupBackendContractsByCapabilityFamily()
  );
  const workspaceSummary = buildAffectedWorkspaceSummary(
    groupBackendContractsByWorkspaceTarget()
  );

  return [
    "Keep backend-owned run admission contracts draft / preview-only while request creation, response receipt, error receipt, and ticket issuance remain blocked.",
    "Define the backend-owned dry-run runner request, response, and denial path without creating live provider execution, queue dispatch, worker dispatch, or job execution.",
    "Carry operator approval, manual confirmation, kill switch, audit, privacy/redaction, cost, rate, timeout, idempotency, replay block, and single-run lock gates into the runner contract.",
    "Keep credentials opaque-reference-only and preserve the server-only boundary with no frontend provider calls and no provider SDK imports.",
    "Keep retry and fallback disabled while the dry-run runner contract stays backend-owned and non-persistent.",
    `Covered capability families remain contract-only: ${capabilitySummary}.`,
    `Covered workspace targets remain contract-only: ${workspaceSummary}.`,
    `Next likely batch: ${NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH}.`,
  ] as const;
}
