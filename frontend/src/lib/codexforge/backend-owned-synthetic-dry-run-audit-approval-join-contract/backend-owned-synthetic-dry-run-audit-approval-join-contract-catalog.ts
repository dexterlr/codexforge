import type {
  AiModelProviderWorkspaceTarget,
} from "../ai-provider-registry";
import {
  buildStableResultCaptureErrorKey,
  buildStableResultCaptureRequestKey,
  buildStableResultCaptureResponseKey,
  buildStableSyntheticResultCaptureContractKey,
  buildStableSyntheticResultEnvelopeKey,
  listBackendOwnedSyntheticDryRunResultCaptureContracts,
  listResultCaptureErrorContracts,
  listResultCaptureRequestContracts,
  listResultCaptureResponseContracts,
  listSyntheticResultEnvelopeContracts,
  type BackendOwnedSyntheticDryRunResultCaptureContractRecord,
  type ResultCaptureErrorContractRecord,
  type ResultCaptureRequestContractRecord,
  type ResultCaptureResponseContractRecord,
  type SyntheticResultEnvelopeContractRecord,
} from "../backend-owned-synthetic-dry-run-result-capture-contract";
import {
  buildStableResultCaptureAcceptancePostureKey,
  buildStableResultCaptureDecisionReviewKey,
  buildStableResultCaptureRecoveryPlanKey,
  buildStableResultCaptureRecoveryReadinessChecklistKey,
  buildStableResultCaptureReviewAuditSummaryKey,
  buildStableResultCaptureReviewKey,
  listBackendOwnedSyntheticDryRunResultCaptureReviews,
  listResultCaptureAcceptancePostureRecords,
  listResultCaptureDecisionReviews,
  listResultCaptureGateFailureReviewRecords,
  listResultCaptureRecoveryPlanPreviews,
  listResultCaptureRecoveryReadinessChecklistRecords,
  listResultCaptureReviewAuditSummaries,
  type BackendOwnedSyntheticDryRunResultCaptureReviewRecord,
  type ResultCaptureAcceptancePostureRecord,
  type ResultCaptureDecisionReviewRecord,
  type ResultCaptureGateFailureReviewRecord,
  type ResultCaptureRecoveryPlanPreviewRecord,
  type ResultCaptureRecoveryReadinessChecklistRecord,
  type ResultCaptureReviewAuditSummaryRecord,
} from "../backend-owned-synthetic-dry-run-result-capture-review-recovery-preview";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_PHASE,
  NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
  type AuditApprovalEvidencePacketPreviewRecord,
  type AuditApprovalEvidencePacketKey,
  type AuditApprovalJoinContractCapabilityFamilyGroup,
  type AuditApprovalJoinContractId,
  type AuditApprovalJoinContractKey,
  type AuditApprovalJoinContractSummary,
  type AuditApprovalJoinContractWorkspaceGroup,
  type AuditApprovalJoinErrorContractKey,
  type AuditApprovalJoinErrorContractRecord,
  type AuditApprovalJoinGateId,
  type AuditApprovalJoinGateKey,
  type AuditApprovalJoinGateRecord,
  type AuditApprovalJoinGateSeed,
  type AuditApprovalJoinGateSummary,
  type AuditApprovalJoinReadinessKey,
  type AuditApprovalJoinReadinessMatrixRecord,
  type AuditApprovalJoinReadinessSummary,
  type AuditApprovalJoinRequestContractKey,
  type AuditApprovalJoinRequestContractRecord,
  type AuditApprovalJoinResponseContractKey,
  type AuditApprovalJoinResponseContractRecord,
  type BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord,
  type ResultAuditApprovalLinkContractKey,
  type ResultAuditApprovalLinkContractRecord,
  type SyntheticApprovalJoinContractKey,
  type SyntheticApprovalJoinContractRecord,
  type SyntheticAuditJoinContractKey,
  type SyntheticAuditJoinContractRecord,
} from "./backend-owned-synthetic-dry-run-audit-approval-join-contract-types";

const AUDIT_APPROVAL_JOIN_SUMMARY_LINES = [
  "backend-owned synthetic dry-run audit and approval join contract only",
  "audit and approval join contract is preview-only",
  "audit join state is not persisted",
  "approval join state is not persisted",
  "result reference state is not persisted",
  "evidence packet is preview-only",
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
  "database write is not implemented",
  "file write is not implemented",
  "result id is not issued",
  "result digest is deterministic preview only",
  "audit and approval joins are not persisted",
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
  "backend-owned synthetic dry-run audit and approval join review and recovery preview next",
] as const;

const AUDIT_APPROVAL_JOIN_GATE_SUMMARY_LINES = [
  "synthetic result envelope",
  "result capture review",
  "result capture acceptance posture",
  "audit join contract",
  "approval join contract",
  "result-to-audit-approval link contract",
  "join request contract",
  "join response contract",
  "join error contract",
  "operator approval",
  "manual confirmation",
  "kill switch",
  "audit",
  "server-only boundary",
  "no frontend provider call",
  "no provider SDK import in frontend",
  "no prompt sending",
  "opaque credential reference",
  "no plaintext secrets",
  "privacy/redaction",
  "cost/rate/timeout",
  "idempotency/replay block",
  "single-run lock",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes",
] as const;

const AUDIT_APPROVAL_JOIN_READINESS_SUMMARY_LINES = [
  "join contract state",
  "audit join contract state",
  "approval join contract state",
  "result link contract state",
  "join request contract state",
  "join response contract state",
  "join error contract state",
  "gate schema state",
  "result capture review dependency",
  "result envelope dependency",
  "result digest dependency",
  "evidence packet dependency",
  "audit boundary state",
  "approval boundary state",
  "result persistence boundary state",
  "audit persistence boundary state",
  "approval persistence boundary state",
  "database boundary state",
  "file boundary state",
  "current readiness: join-contract-only / not persistent",
  "next safe action",
] as const;

const NEXT_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_CHECKLIST = [
  "Review audit join, approval join, result link, request, response, error, gate, readiness, and evidence packet records without creating persisted state.",
  "Keep audit envelopes, approval envelopes, append state, result references, database writes, and file writes explicitly unimplemented and blocked.",
  "Preserve no prompt sending, no model calls, no provider execution, no queue dispatch, no worker dispatch, and no job execution posture.",
  "Carry privacy/redaction, cost/rate/timeout, idempotency/replay block, single-run lock, manual approval, manual confirmation, and kill switch requirements into the next preview batch.",
  "Keep the next batch backend-owned, preview-only, deterministic, and frontend-safe while audit and approval join review and recovery preview comes next.",
] as const;

const AUDIT_JOIN_RECOVERY_READINESS_ID =
  "audit-join-preview-reviewed" as const;

const RESULT_CAPTURE_CONTRACTS =
  listBackendOwnedSyntheticDryRunResultCaptureContracts();
const RESULT_CAPTURE_REVIEWS =
  listBackendOwnedSyntheticDryRunResultCaptureReviews();
const RESULT_CAPTURE_DECISION_REVIEWS = listResultCaptureDecisionReviews();
const RESULT_CAPTURE_GATE_FAILURE_REVIEWS =
  listResultCaptureGateFailureReviewRecords();
const RESULT_CAPTURE_RECOVERY_PLANS = listResultCaptureRecoveryPlanPreviews();
const RESULT_CAPTURE_RECOVERY_READINESS =
  listResultCaptureRecoveryReadinessChecklistRecords();
const RESULT_CAPTURE_AUDIT_SUMMARIES = listResultCaptureReviewAuditSummaries();
const RESULT_CAPTURE_ACCEPTANCE_POSTURES =
  listResultCaptureAcceptancePostureRecords();
const SYNTHETIC_RESULT_ENVELOPES = listSyntheticResultEnvelopeContracts();
const RESULT_CAPTURE_REQUESTS = listResultCaptureRequestContracts();
const RESULT_CAPTURE_RESPONSES = listResultCaptureResponseContracts();
const RESULT_CAPTURE_ERRORS = listResultCaptureErrorContracts();

const RESULT_CAPTURE_CONTRACTS_BY_ID = new Map(
  RESULT_CAPTURE_CONTRACTS.map((record) => [record.id, record] as const)
);
const RESULT_CAPTURE_REVIEWS_BY_ID = new Map(
  RESULT_CAPTURE_REVIEWS.map((record) => [record.id, record] as const)
);
const RESULT_CAPTURE_DECISION_REVIEWS_BY_ID = new Map(
  RESULT_CAPTURE_DECISION_REVIEWS.map((record) => [record.resultCaptureReviewId, record] as const)
);
const RESULT_CAPTURE_RECOVERY_PLANS_BY_ID = new Map(
  RESULT_CAPTURE_RECOVERY_PLANS.map((record) => [record.resultCaptureReviewId, record] as const)
);
const RESULT_CAPTURE_AUDIT_SUMMARIES_BY_ID = new Map(
  RESULT_CAPTURE_AUDIT_SUMMARIES.map((record) => [record.resultCaptureReviewId, record] as const)
);
const RESULT_CAPTURE_ACCEPTANCE_POSTURES_BY_ID = new Map(
  RESULT_CAPTURE_ACCEPTANCE_POSTURES.map((record) => [record.resultCaptureReviewId, record] as const)
);
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
const RESULT_CAPTURE_RECOVERY_READINESS_BY_ID = new Map(
  RESULT_CAPTURE_RECOVERY_READINESS.map((record) => [record.checklistId, record] as const)
);
const RESULT_CAPTURE_GATE_FAILURE_REVIEWS_BY_ID = RESULT_CAPTURE_GATE_FAILURE_REVIEWS.reduce(
  (map, record) => {
    const existing = map.get(record.resultCaptureReviewId);

    if (existing) {
      existing.push(record);
      return map;
    }

    map.set(record.resultCaptureReviewId, [record]);
    return map;
  },
  new Map<AuditApprovalJoinContractId, ResultCaptureGateFailureReviewRecord[]>()
);

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneCapabilityFamily(
  family: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["selectedCapabilityFamily"]
): BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["selectedCapabilityFamily"] {
  return { ...family };
}

function requireResultCaptureContract(
  id: AuditApprovalJoinContractId
): BackendOwnedSyntheticDryRunResultCaptureContractRecord {
  const record = RESULT_CAPTURE_CONTRACTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture contract for ${id}`);
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

function requireDecisionReview(
  id: AuditApprovalJoinContractId
): ResultCaptureDecisionReviewRecord {
  const record = RESULT_CAPTURE_DECISION_REVIEWS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture decision review for ${id}`);
  }

  return record;
}

function requirePrimaryGateFailureReview(
  id: AuditApprovalJoinContractId
): ResultCaptureGateFailureReviewRecord {
  const records = RESULT_CAPTURE_GATE_FAILURE_REVIEWS_BY_ID.get(id);
  const record = records?.[0];

  if (!record) {
    throw new Error(`Missing result capture gate failure review for ${id}`);
  }

  return record;
}

function requireRecoveryPlan(
  id: AuditApprovalJoinContractId
): ResultCaptureRecoveryPlanPreviewRecord {
  const record = RESULT_CAPTURE_RECOVERY_PLANS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture recovery plan for ${id}`);
  }

  return record;
}

function requireRecoveryReadiness(
  checklistId: typeof AUDIT_JOIN_RECOVERY_READINESS_ID
): ResultCaptureRecoveryReadinessChecklistRecord {
  const record = RESULT_CAPTURE_RECOVERY_READINESS_BY_ID.get(checklistId);

  if (!record) {
    throw new Error(`Missing result capture recovery readiness record for ${checklistId}`);
  }

  return record;
}

function requireAuditSummary(
  id: AuditApprovalJoinContractId
): ResultCaptureReviewAuditSummaryRecord {
  const record = RESULT_CAPTURE_AUDIT_SUMMARIES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture audit summary for ${id}`);
  }

  return record;
}

function requireAcceptancePosture(
  id: AuditApprovalJoinContractId
): ResultCaptureAcceptancePostureRecord {
  const record = RESULT_CAPTURE_ACCEPTANCE_POSTURES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture acceptance posture for ${id}`);
  }

  return record;
}

function requireResultEnvelope(
  id: AuditApprovalJoinContractId
): SyntheticResultEnvelopeContractRecord {
  const record = SYNTHETIC_RESULT_ENVELOPES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing synthetic result envelope for ${id}`);
  }

  return record;
}

function requireRequestContract(
  id: AuditApprovalJoinContractId
): ResultCaptureRequestContractRecord {
  const record = RESULT_CAPTURE_REQUESTS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture request contract for ${id}`);
  }

  return record;
}

function requireResponseContract(
  id: AuditApprovalJoinContractId
): ResultCaptureResponseContractRecord {
  const record = RESULT_CAPTURE_RESPONSES_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture response contract for ${id}`);
  }

  return record;
}

function requireErrorContract(
  id: AuditApprovalJoinContractId
): ResultCaptureErrorContractRecord {
  const record = RESULT_CAPTURE_ERRORS_BY_ID.get(id);

  if (!record) {
    throw new Error(`Missing result capture error contract for ${id}`);
  }

  return record;
}

function buildJoinContractLabel(requestLabel: string): string {
  return `${requestLabel} audit and approval join contract`;
}

function buildAuditJoinLabel(requestLabel: string): string {
  return `${requestLabel} synthetic audit join contract`;
}

function buildApprovalJoinLabel(requestLabel: string): string {
  return `${requestLabel} synthetic approval join contract`;
}

function buildResultAuditApprovalLinkLabel(requestLabel: string): string {
  return `${requestLabel} result to audit and approval link contract`;
}

function buildJoinRequestLabel(requestLabel: string): string {
  return `${requestLabel} audit and approval join request contract`;
}

function buildJoinResponseLabel(requestLabel: string): string {
  return `${requestLabel} audit and approval join response contract`;
}

function buildJoinErrorLabel(requestLabel: string): string {
  return `${requestLabel} audit and approval join error contract`;
}

function buildEvidencePacketLabel(requestLabel: string): string {
  return `${requestLabel} audit and approval evidence packet preview`;
}

function buildJoinContractBlockedReason(requestLabel: string): string {
  return `Backend-owned synthetic dry-run audit and approval join contract remains preview-only for ${requestLabel} because no join request exists, no join invocation runs, no audit or approval join is persisted, and no database or file write path exists.`;
}

function buildJoinContractNextSafeAction(
  workspaceTarget: AiModelProviderWorkspaceTarget
): string {
  return `Prepare the backend-owned synthetic dry-run audit and approval join review and recovery preview for ${workspaceTarget} without enabling persistence or execution.`;
}

export function uniqueAuditApprovalJoinDisplayStrings<T extends string>(
  values: readonly T[]
): readonly T[] {
  return Array.from(new Set(values));
}

export function buildStableSyntheticAuditApprovalJoinContractKey(
  id: AuditApprovalJoinContractId
): AuditApprovalJoinContractKey {
  return `backend-owned-synthetic-dry-run-audit-approval-join-contract:${id}`;
}

export function buildStableSyntheticAuditJoinKey(
  id: AuditApprovalJoinContractId
): SyntheticAuditJoinContractKey {
  return `backend-owned-synthetic-dry-run-audit-join-contract:${id}`;
}

export function buildStableSyntheticApprovalJoinKey(
  id: AuditApprovalJoinContractId
): SyntheticApprovalJoinContractKey {
  return `backend-owned-synthetic-dry-run-approval-join-contract:${id}`;
}

export function buildStableResultAuditApprovalLinkKey(
  id: AuditApprovalJoinContractId
): ResultAuditApprovalLinkContractKey {
  return `backend-owned-synthetic-result-audit-approval-link-contract:${id}`;
}

export function buildStableAuditApprovalJoinRequestKey(
  id: AuditApprovalJoinContractId
): AuditApprovalJoinRequestContractKey {
  return `backend-owned-synthetic-audit-approval-join-request-contract:${id}`;
}

export function buildStableAuditApprovalJoinResponseKey(
  id: AuditApprovalJoinContractId
): AuditApprovalJoinResponseContractKey {
  return `backend-owned-synthetic-audit-approval-join-response-contract:${id}`;
}

export function buildStableAuditApprovalJoinErrorKey(
  id: AuditApprovalJoinContractId
): AuditApprovalJoinErrorContractKey {
  return `backend-owned-synthetic-audit-approval-join-error-contract:${id}`;
}

export function buildStableAuditApprovalJoinGateKey(
  id: AuditApprovalJoinGateId
): AuditApprovalJoinGateKey {
  return `backend-owned-synthetic-audit-approval-join-gate:${id}`;
}

export function buildStableAuditApprovalJoinReadinessKey(
  id: AuditApprovalJoinContractId
): AuditApprovalJoinReadinessKey {
  return `backend-owned-synthetic-audit-approval-join-readiness:${id}`;
}

export function buildStableAuditApprovalEvidencePacketKey(
  id: AuditApprovalJoinContractId
): AuditApprovalEvidencePacketKey {
  return `backend-owned-synthetic-audit-approval-evidence-packet:${id}`;
}

function buildJoinContractRecord(
  review: BackendOwnedSyntheticDryRunResultCaptureReviewRecord
): BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord {
  const contract = requireResultCaptureContract(review.id);
  const gateFailureReview = requirePrimaryGateFailureReview(review.id);
  const recoveryPlan = requireRecoveryPlan(review.id);
  const auditSummary = requireAuditSummary(review.id);
  requireDecisionReview(review.id);
  requireResultCaptureReview(review.id);
  requireAcceptancePosture(review.id);
  requireResultEnvelope(review.id);
  requireRequestContract(review.id);
  requireResponseContract(review.id);
  requireErrorContract(review.id);
  requireRecoveryReadiness(AUDIT_JOIN_RECOVERY_READINESS_ID);

  return {
    id: review.id,
    key: buildStableSyntheticAuditApprovalJoinContractKey(review.id),
    joinContractVersion:
      "backend-owned-synthetic-dry-run-audit-approval-join-contract-v1",
    previewOnlyStatement: "audit and approval join contract is preview-only",
    requestLabel: contract.requestLabel,
    label: buildJoinContractLabel(contract.requestLabel),
    workspaceTarget: contract.workspaceTarget,
    source: contract.source,
    owner: contract.owner,
    frontendMode: contract.frontendMode,
    contractMode: "contract-only",
    auditJoinPosture: "contract-defined / not persisted",
    approvalJoinPosture: "contract-defined / not persisted",
    resultReferencePosture: "preview-only / not persisted",
    evidencePacketPosture: "preview-only",
    joinRequestState: "not created",
    joinInvocationState: "not invoked",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    resultReferenceState: "not persisted",
    resultPersistenceState: "not implemented",
    auditPersistenceState: "not implemented",
    approvalPersistenceState: "not implemented",
    artifactPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    sourceResultCaptureReviewReference: buildStableResultCaptureReviewKey(
      review.id
    ),
    sourceResultCaptureDecisionReviewReference:
      buildStableResultCaptureDecisionReviewKey(review.id),
    sourceResultCaptureGateFailureReviewReference: gateFailureReview.key,
    sourceResultCaptureRecoveryPlanReference:
      buildStableResultCaptureRecoveryPlanKey(review.id),
    sourceResultCaptureRecoveryReadinessReference:
      buildStableResultCaptureRecoveryReadinessChecklistKey(
        AUDIT_JOIN_RECOVERY_READINESS_ID
      ),
    sourceResultCaptureAuditSummaryReference:
      buildStableResultCaptureReviewAuditSummaryKey(review.id),
    sourceResultCaptureAcceptancePostureReference:
      buildStableResultCaptureAcceptancePostureKey(review.id),
    sourceResultCaptureContractReference:
      buildStableSyntheticResultCaptureContractKey(review.id),
    sourceSyntheticResultEnvelopeReference:
      buildStableSyntheticResultEnvelopeKey(review.id),
    sourceResultCaptureRequestReference: buildStableResultCaptureRequestKey(
      review.id
    ),
    sourceResultCaptureResponseReference: buildStableResultCaptureResponseKey(
      review.id
    ),
    sourceResultCaptureErrorReference: buildStableResultCaptureErrorKey(review.id),
    sourceSyntheticRunnerSkeletonReference:
      contract.sourceSyntheticRunnerSkeletonReference,
    sourceRunIntentReference: contract.sourceRunIntentReference,
    selectedCapabilityFamily: cloneCapabilityFamily(
      contract.selectedCapabilityFamily
    ),
    providerSlotLabel: contract.providerSlotLabel,
    backupProviderSlotLabel: contract.backupProviderSlotLabel,
    localPrivateAlternativeLabel: contract.localPrivateAlternativeLabel,
    providerResponseState: contract.providerResponseState,
    modelOutputState: contract.modelOutputState,
    syntheticFixtureResultState: contract.syntheticFixtureResultState,
    resultIdState: contract.resultIdState,
    resultDigestPosture: contract.resultDigestPosture,
    promptSendingPosture: contract.promptSendingPosture,
    modelCallPosture: contract.modelCallPosture,
    providerCallPosture: contract.providerCallPosture,
    sdkPosture: contract.sdkPosture,
    credentialPosture: contract.credentialPosture,
    secretPosture: contract.secretPosture,
    frontendPosture: contract.frontendPosture,
    backendPosture: contract.backendPosture,
    executionPosture: contract.executionPosture,
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
    nextAuditApprovalJoinReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    blockedDefaultReason: buildJoinContractBlockedReason(contract.requestLabel),
    nextSafeAction:
      `${buildJoinContractNextSafeAction(contract.workspaceTarget)} ${auditSummary.recoverySummary} ${recoveryPlan.operatorActionRequired}`,
  };
}

const AUDIT_APPROVAL_JOIN_CONTRACTS = RESULT_CAPTURE_REVIEWS.map((review) =>
  buildJoinContractRecord(review)
);

function buildSyntheticAuditJoinContract(
  contract: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord
): SyntheticAuditJoinContractRecord {
  const auditSummary = requireAuditSummary(contract.id);

  return {
    id: contract.id,
    key: buildStableSyntheticAuditJoinKey(contract.id),
    auditJoinContractVersion:
      "backend-owned-synthetic-dry-run-audit-join-contract-v1",
    requestLabel: contract.requestLabel,
    label: buildAuditJoinLabel(contract.requestLabel),
    workspaceTarget: contract.workspaceTarget,
    joinContractId: contract.id,
    sourceResultCaptureReviewReference: contract.sourceResultCaptureReviewReference,
    sourceSyntheticResultEnvelopeReference:
      contract.sourceSyntheticResultEnvelopeReference,
    sourceResultCaptureAuditSummaryReference:
      contract.sourceResultCaptureAuditSummaryReference,
    auditJoinMode: "preview-only",
    auditReferenceState: "not persisted",
    auditEvidencePosture: "preview-only",
    auditEnvelopeState: "not created",
    auditAppendState: "not appended",
    auditPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    evidenceSummary: auditSummary.evidenceSummary,
    failedGateSummary: auditSummary.failedGateSummary,
    recoverySummary: auditSummary.recoverySummary,
    blockedActionSummary: auditSummary.blockedActionSummary,
    noAuditPersistenceStatement: "No audit persistence",
    noDatabaseWriteStatement: "No database write",
    noFileWriteStatement: "No file write",
    blockedDefaultReason:
      `Synthetic audit join contract remains preview-only for ${contract.requestLabel} because audit envelope creation, audit append, audit persistence, database writes, and file writes remain blocked by default.`,
    explicitNoAuditJoinNoPersistenceStatement:
      "No audit join. No persistence.",
  };
}

const SYNTHETIC_AUDIT_JOIN_CONTRACTS = AUDIT_APPROVAL_JOIN_CONTRACTS.map(
  (contract) => buildSyntheticAuditJoinContract(contract)
);

function buildSyntheticApprovalJoinContract(
  contract: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord
): SyntheticApprovalJoinContractRecord {
  const acceptancePosture = requireAcceptancePosture(contract.id);

  return {
    id: contract.id,
    key: buildStableSyntheticApprovalJoinKey(contract.id),
    approvalJoinContractVersion:
      "backend-owned-synthetic-dry-run-approval-join-contract-v1",
    requestLabel: contract.requestLabel,
    label: buildApprovalJoinLabel(contract.requestLabel),
    workspaceTarget: contract.workspaceTarget,
    joinContractId: contract.id,
    sourceResultCaptureReviewReference: contract.sourceResultCaptureReviewReference,
    sourceResultCaptureAcceptancePostureReference:
      contract.sourceResultCaptureAcceptancePostureReference,
    sourceRunIntentReference: contract.sourceRunIntentReference,
    approvalJoinMode: "preview-only",
    approvalReferenceState: "not persisted",
    approvalEvidencePosture: "preview-only",
    approvalEnvelopeState: "not created",
    approvalAppendState: "not appended",
    approvalPersistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    operatorApprovalRequirement: contract.manualApprovalRequired,
    manualConfirmationRequirement: contract.manualConfirmationRequired,
    approvalScopeSummary:
      `Approval scope for ${contract.selectedCapabilityFamily.label} remains review-only, backend-owned, and linked to ${contract.sourceRunIntentReference} without creating a persisted approval envelope.`,
    approvalBlockerSummary: acceptancePosture.approvalBlockers.join(" | "),
    noApprovalPersistenceStatement: "No approval persistence",
    noDatabaseWriteStatement: "No database write",
    noFileWriteStatement: "No file write",
    blockedDefaultReason:
      `Synthetic approval join contract remains preview-only for ${contract.requestLabel} because operator approval, manual confirmation, approval append, approval persistence, database writes, and file writes remain blocked by default.`,
    explicitNoApprovalJoinNoPersistenceStatement:
      "No approval join. No persistence.",
  };
}

const SYNTHETIC_APPROVAL_JOIN_CONTRACTS = AUDIT_APPROVAL_JOIN_CONTRACTS.map(
  (contract) => buildSyntheticApprovalJoinContract(contract)
);

function buildResultAuditApprovalLinkContract(
  contract: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord
): ResultAuditApprovalLinkContractRecord {
  return {
    id: contract.id,
    key: buildStableResultAuditApprovalLinkKey(contract.id),
    linkContractVersion:
      "backend-owned-synthetic-result-audit-approval-link-contract-v1",
    requestLabel: contract.requestLabel,
    label: buildResultAuditApprovalLinkLabel(contract.requestLabel),
    workspaceTarget: contract.workspaceTarget,
    joinContractId: contract.id,
    sourceResultCaptureContractReference:
      contract.sourceResultCaptureContractReference,
    sourceResultEnvelopeReference: contract.sourceSyntheticResultEnvelopeReference,
    sourceAuditJoinContractReference: buildStableSyntheticAuditJoinKey(
      contract.id
    ),
    sourceApprovalJoinContractReference: buildStableSyntheticApprovalJoinKey(
      contract.id
    ),
    resultReferenceState: "not persisted",
    resultIdState: contract.resultIdState,
    resultDigestPosture: contract.resultDigestPosture,
    auditLinkState: "preview-only / not persisted",
    approvalLinkState: "preview-only / not persisted",
    joinConsistencyState: "preview-only",
    evidencePacketState: "preview-only",
    resultLineagePosture: "static preview only",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    blockedDefaultReason:
      `Result to audit and approval link contract remains preview-only for ${contract.requestLabel} because result references are not persisted, result ids are not issued, and no database or file write path exists.`,
    explicitNoResultAuditApprovalLinkPersistedStatement:
      "No result-audit-approval link persisted.",
  };
}

const RESULT_AUDIT_APPROVAL_LINK_CONTRACTS =
  AUDIT_APPROVAL_JOIN_CONTRACTS.map((contract) =>
    buildResultAuditApprovalLinkContract(contract)
  );

function buildJoinRequestContract(
  contract: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord
): AuditApprovalJoinRequestContractRecord {
  return {
    id: contract.id,
    key: buildStableAuditApprovalJoinRequestKey(contract.id),
    requestContractVersion:
      "backend-owned-synthetic-audit-approval-join-request-contract-v1",
    requestLabel: contract.requestLabel,
    label: buildJoinRequestLabel(contract.requestLabel),
    workspaceTarget: contract.workspaceTarget,
    joinContractId: contract.id,
    sourceAuditJoinContractReference: buildStableSyntheticAuditJoinKey(
      contract.id
    ),
    sourceApprovalJoinContractReference: buildStableSyntheticApprovalJoinKey(
      contract.id
    ),
    sourceLinkContractReference: buildStableResultAuditApprovalLinkKey(
      contract.id
    ),
    joinRequestState: "not created",
    joinInvocationState: "not invoked",
    auditReferencePosture: "preview-only",
    approvalReferencePosture: "preview-only",
    resultReferencePosture: "preview-only / not persisted",
    evidencePacketPosture: "preview-only",
    persistenceTargetPosture: "not implemented",
    databaseWritePosture: "not implemented",
    fileWritePosture: "not implemented",
    blockedDefaultReason:
      `Audit and approval join request contract remains preview-only for ${contract.requestLabel} because no request is created, no invocation is performed, and persistence targets remain unimplemented.`,
    explicitNoJoinRequestCreatedStatement: "No join request created.",
  };
}

const AUDIT_APPROVAL_JOIN_REQUEST_CONTRACTS =
  AUDIT_APPROVAL_JOIN_CONTRACTS.map((contract) =>
    buildJoinRequestContract(contract)
  );

function buildJoinResponseContract(
  contract: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord
): AuditApprovalJoinResponseContractRecord {
  return {
    id: contract.id,
    key: buildStableAuditApprovalJoinResponseKey(contract.id),
    responseContractVersion:
      "backend-owned-synthetic-audit-approval-join-response-contract-v1",
    requestLabel: contract.requestLabel,
    label: buildJoinResponseLabel(contract.requestLabel),
    workspaceTarget: contract.workspaceTarget,
    joinContractId: contract.id,
    sourceJoinRequestReference: buildStableAuditApprovalJoinRequestKey(
      contract.id
    ),
    responseState: "not received",
    joinDecisionState: "not evaluated",
    auditJoinState: "not persisted",
    approvalJoinState: "not persisted",
    resultReferenceState: "not persisted",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    blockedDefaultReason:
      `Audit and approval join response contract remains preview-only for ${contract.requestLabel} because no request is created, no response is received, and no persisted join state exists.`,
    explicitNoJoinResponseNoPersistenceStatement:
      "No join response. No persistence.",
  };
}

const AUDIT_APPROVAL_JOIN_RESPONSE_CONTRACTS =
  AUDIT_APPROVAL_JOIN_CONTRACTS.map((contract) =>
    buildJoinResponseContract(contract)
  );

function buildJoinErrorContract(
  contract: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord
): AuditApprovalJoinErrorContractRecord {
  return {
    id: contract.id,
    key: buildStableAuditApprovalJoinErrorKey(contract.id),
    errorContractVersion:
      "backend-owned-synthetic-audit-approval-join-error-contract-v1",
    requestLabel: contract.requestLabel,
    label: buildJoinErrorLabel(contract.requestLabel),
    workspaceTarget: contract.workspaceTarget,
    joinContractId: contract.id,
    sourceJoinRequestReference: buildStableAuditApprovalJoinRequestKey(
      contract.id
    ),
    errorState: "not received",
    validationErrorExamples: [
      `Join request for ${contract.requestLabel} must remain preview-only and not created.`,
      "Audit evidence must remain preview-only and non-persistent.",
      "Approval evidence must remain preview-only and non-persistent.",
    ],
    missingResultReferenceExample:
      `Missing result reference for ${contract.requestLabel}: result reference state remains not persisted and result id state remains not issued.`,
    missingAuditEvidenceExample:
      `Missing audit evidence for ${contract.requestLabel}: audit evidence posture remains preview-only and audit envelope state remains not created.`,
    missingApprovalEvidenceExample:
      `Missing approval evidence for ${contract.requestLabel}: approval evidence posture remains preview-only and approval envelope state remains not created.`,
    auditPersistenceDeniedExample:
      `Audit persistence denied for ${contract.requestLabel}: audit persistence state remains not implemented.`,
    approvalPersistenceDeniedExample:
      `Approval persistence denied for ${contract.requestLabel}: approval persistence state remains not implemented.`,
    databaseWriteBlockedExample:
      `Database write blocked for ${contract.requestLabel}: database write state remains not implemented.`,
    fileWriteBlockedExample:
      `File write blocked for ${contract.requestLabel}: file write state remains not implemented.`,
    privacyRedactionDeniedExample:
      `Privacy/redaction denied for ${contract.requestLabel}: privacy/redaction required before any future backend-owned join path.`,
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    recoveryPosture: "manual review only",
    explicitNoJoinErrorNoRetryNoFallbackStatement:
      "No join error. No retry. No fallback.",
  };
}

const AUDIT_APPROVAL_JOIN_ERROR_CONTRACTS =
  AUDIT_APPROVAL_JOIN_CONTRACTS.map((contract) =>
    buildJoinErrorContract(contract)
  );

const AUDIT_APPROVAL_JOIN_GATE_SEEDS = [
  {
    id: "synthetic-result-envelope",
    label: "synthetic result envelope",
    owner: "backend join contract",
    requiredState: "synthetic result envelope remains preview-only and non-persistent",
    evidenceRequirement:
      "Synthetic result envelope reference and deterministic preview digest remain visible.",
    blockedDefaultReason:
      "Synthetic result envelope remains preview-only and cannot be persisted from the frontend.",
  },
  {
    id: "result-capture-review",
    label: "result capture review",
    owner: "backend join contract",
    requiredState: "result capture review remains reviewed / preview-only",
    evidenceRequirement:
      "Result capture review reference, decision review reference, and audit summary reference remain visible.",
    blockedDefaultReason:
      "Result capture review remains preview-only and blocks any live join creation.",
  },
  {
    id: "result-capture-acceptance-posture",
    label: "result capture acceptance posture",
    owner: "operator",
    requiredState: "result capture acceptance posture remains not accepted / preview-only",
    evidenceRequirement:
      "Acceptance blockers and approval blockers remain visible before any join review continues.",
    blockedDefaultReason:
      "Result capture acceptance posture remains blocked and no accepted join path exists.",
  },
  {
    id: "audit-join-contract",
    label: "audit join contract",
    owner: "backend join contract",
    requiredState: "audit join contract remains preview-only and not persisted",
    evidenceRequirement:
      "Audit join contract, audit evidence posture, and no audit persistence statements remain visible.",
    blockedDefaultReason:
      "Audit join contract remains preview-only and no persisted audit join exists.",
  },
  {
    id: "approval-join-contract",
    label: "approval join contract",
    owner: "operator",
    requiredState: "approval join contract remains preview-only and not persisted",
    evidenceRequirement:
      "Approval join contract, approval evidence posture, and operator approval requirement remain visible.",
    blockedDefaultReason:
      "Approval join contract remains preview-only and no persisted approval join exists.",
  },
  {
    id: "result-audit-approval-link-contract",
    label: "result-to-audit-approval link contract",
    owner: "backend join contract",
    requiredState: "result link contract remains preview-only and not persisted",
    evidenceRequirement:
      "Result-to-audit-approval link contract and join consistency posture remain visible.",
    blockedDefaultReason:
      "Result-to-audit-approval links remain preview-only and no persisted link exists.",
  },
  {
    id: "join-request-contract",
    label: "join request contract",
    owner: "backend join contract",
    requiredState: "join request contract remains not created and preview-only",
    evidenceRequirement:
      "Join request state, join invocation state, and evidence packet posture remain visible.",
    blockedDefaultReason:
      "Join request contract remains preview-only because no request is created.",
  },
  {
    id: "join-response-contract",
    label: "join response contract",
    owner: "backend join contract",
    requiredState: "join response contract remains not received and preview-only",
    evidenceRequirement:
      "Join response state and join decision state remain visible as not received and not evaluated.",
    blockedDefaultReason:
      "Join response contract remains preview-only because no response is received.",
  },
  {
    id: "join-error-contract",
    label: "join error contract",
    owner: "safety review",
    requiredState: "join error contract remains not received and preview-only",
    evidenceRequirement:
      "Join error posture, retry disabled posture, and fallback disabled posture remain visible.",
    blockedDefaultReason:
      "Join error contract remains preview-only because no join error is received and no retry or fallback path exists.",
  },
  {
    id: "operator-approval",
    label: "operator approval",
    owner: "operator",
    requiredState: "manual approval required",
    evidenceRequirement:
      "Manual approval requirement remains visible on join contracts and approval contracts.",
    blockedDefaultReason:
      "Operator approval remains required before any backend-owned join path can move past preview-only posture.",
  },
  {
    id: "manual-confirmation",
    label: "manual confirmation",
    owner: "operator",
    requiredState: "manual confirmation required",
    evidenceRequirement:
      "Manual confirmation requirement remains visible on join contracts and approval contracts.",
    blockedDefaultReason:
      "Manual confirmation remains required before any backend-owned join path can move past preview-only posture.",
  },
  {
    id: "kill-switch",
    label: "kill switch",
    owner: "safety review",
    requiredState: "kill switch required",
    evidenceRequirement:
      "Kill switch requirement remains visible across the join contract layer.",
    blockedDefaultReason:
      "Kill switch remains required before any backend-owned join path can exist.",
  },
  {
    id: "audit",
    label: "audit",
    owner: "safety review",
    requiredState: "audit required",
    evidenceRequirement:
      "Audit requirement and audit evidence posture remain visible across join records.",
    blockedDefaultReason:
      "Audit remains required before any backend-owned audit or approval join path can proceed.",
  },
  {
    id: "server-only-boundary",
    label: "server-only boundary",
    owner: "backend join contract",
    requiredState: "server-only boundary required",
    evidenceRequirement:
      "Frontend blocked posture and backend server-only requirement remain visible.",
    blockedDefaultReason:
      "Server-only boundary remains required because frontend join creation and persistence are blocked.",
  },
  {
    id: "no-frontend-provider-call",
    label: "no frontend provider call",
    owner: "backend join contract",
    requiredState: "no frontend provider call enforced",
    evidenceRequirement:
      "No frontend provider call posture remains visible on join records.",
    blockedDefaultReason:
      "Frontend provider calls remain blocked and cannot participate in audit or approval joins.",
  },
  {
    id: "no-provider-sdk-import-in-frontend",
    label: "no provider SDK import in frontend",
    owner: "backend join contract",
    requiredState: "no provider SDK import in frontend enforced",
    evidenceRequirement:
      "No provider SDK imports posture remains visible on join records.",
    blockedDefaultReason:
      "Provider SDK imports remain blocked in frontend join previews.",
  },
  {
    id: "no-prompt-sending",
    label: "no prompt sending",
    owner: "backend join contract",
    requiredState: "no prompt sending enforced",
    evidenceRequirement:
      "Prompt sending posture remains not implemented and blocked.",
    blockedDefaultReason:
      "Prompt sending remains not implemented and cannot contribute to audit or approval joins.",
  },
  {
    id: "opaque-credential-reference",
    label: "opaque credential reference",
    owner: "backend join contract",
    requiredState: "opaque credential references only",
    evidenceRequirement:
      "Opaque credential reference posture remains visible with no plaintext secrets.",
    blockedDefaultReason:
      "Only opaque credential references are allowed in the preview-only join contract layer.",
  },
  {
    id: "no-plaintext-secrets",
    label: "no plaintext secrets",
    owner: "safety review",
    requiredState: "no plaintext secrets enforced",
    evidenceRequirement:
      "No plaintext secrets posture remains visible on join records.",
    blockedDefaultReason:
      "Plaintext secrets remain blocked from all audit and approval join previews.",
  },
  {
    id: "privacy-redaction",
    label: "privacy/redaction",
    owner: "safety review",
    requiredState: "privacy/redaction required",
    evidenceRequirement:
      "Privacy/redaction requirement and preview-only evidence posture remain visible.",
    blockedDefaultReason:
      "Privacy/redaction remains required before any future backend-owned join review can proceed.",
  },
  {
    id: "cost-rate-timeout",
    label: "cost/rate/timeout",
    owner: "safety review",
    requiredState: "cost acknowledgement, rate limit guard, and timeout/cancel guard required",
    evidenceRequirement:
      "Cost, rate, and timeout guard posture remains visible on join records.",
    blockedDefaultReason:
      "Cost, rate, and timeout safeguards remain required before any future join review path.",
  },
  {
    id: "idempotency-replay-block",
    label: "idempotency/replay block",
    owner: "backend join contract",
    requiredState: "idempotency required and replay block required",
    evidenceRequirement:
      "Idempotency and replay block posture remains visible on the join contract layer.",
    blockedDefaultReason:
      "Idempotency and replay block remain required because no real join path may replay in preview-only posture.",
  },
  {
    id: "single-run-lock",
    label: "single-run lock",
    owner: "backend join contract",
    requiredState: "single-run lock required",
    evidenceRequirement:
      "Single-run lock requirement remains visible on preview-only join records.",
    blockedDefaultReason:
      "Single-run lock remains required before any backend-owned join execution path could exist.",
  },
  {
    id: "no-queue-dispatch",
    label: "no queue dispatch",
    owner: "backend join contract",
    requiredState: "no queue dispatch enforced",
    evidenceRequirement:
      "Queue dispatch blocked posture remains visible on join records.",
    blockedDefaultReason:
      "Queue dispatch remains blocked and cannot be used for audit or approval joins in this batch.",
  },
  {
    id: "no-worker-dispatch",
    label: "no worker dispatch",
    owner: "backend join contract",
    requiredState: "no worker dispatch enforced",
    evidenceRequirement:
      "Worker dispatch blocked posture remains visible on join records.",
    blockedDefaultReason:
      "Worker dispatch remains blocked and cannot be used for audit or approval joins in this batch.",
  },
  {
    id: "no-job-execution",
    label: "no job execution",
    owner: "backend join contract",
    requiredState: "no job execution enforced",
    evidenceRequirement:
      "Job execution blocked posture remains visible on join records.",
    blockedDefaultReason:
      "Job execution remains blocked and cannot be used for audit or approval joins in this batch.",
  },
  {
    id: "no-result-persistence",
    label: "no result persistence",
    owner: "backend join contract",
    requiredState: "result persistence remains not implemented",
    evidenceRequirement:
      "No result persistence posture remains visible on join contracts, links, requests, responses, errors, and evidence packets.",
    blockedDefaultReason:
      "Result persistence remains not implemented in this batch.",
  },
  {
    id: "no-audit-persistence",
    label: "no audit persistence",
    owner: "safety review",
    requiredState: "audit persistence remains not implemented",
    evidenceRequirement:
      "No audit persistence posture remains visible across join previews.",
    blockedDefaultReason:
      "Audit persistence remains not implemented in this batch.",
  },
  {
    id: "no-approval-persistence",
    label: "no approval persistence",
    owner: "operator",
    requiredState: "approval persistence remains not implemented",
    evidenceRequirement:
      "No approval persistence posture remains visible across join previews.",
    blockedDefaultReason:
      "Approval persistence remains not implemented in this batch.",
  },
  {
    id: "no-database-writes",
    label: "no database writes",
    owner: "backend join contract",
    requiredState: "database writes remain not implemented",
    evidenceRequirement:
      "No database write posture remains visible across requests, responses, errors, links, and evidence packets.",
    blockedDefaultReason:
      "Database writes remain not implemented in this batch.",
  },
  {
    id: "no-file-writes",
    label: "no file writes",
    owner: "backend join contract",
    requiredState: "file writes remain not implemented",
    evidenceRequirement:
      "No file write posture remains visible across requests, responses, errors, links, and evidence packets.",
    blockedDefaultReason:
      "File writes remain not implemented in this batch.",
  },
] as const satisfies readonly AuditApprovalJoinGateSeed[];

function buildAuditApprovalJoinGateRecord(
  seed: AuditApprovalJoinGateSeed
): AuditApprovalJoinGateRecord {
  return {
    id: seed.id,
    key: buildStableAuditApprovalJoinGateKey(seed.id),
    gateVersion: "backend-owned-synthetic-audit-approval-join-gate-v1",
    label: seed.label,
    owner: seed.owner,
    requiredState: seed.requiredState,
    currentState: "preview-only / blocked",
    evidenceRequirement: seed.evidenceRequirement,
    blockedDefaultReason: seed.blockedDefaultReason,
    nextReviewRecoveryRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
  };
}

const AUDIT_APPROVAL_JOIN_GATES = AUDIT_APPROVAL_JOIN_GATE_SEEDS.map((seed) =>
  buildAuditApprovalJoinGateRecord(seed)
);

function buildReadinessRecord(
  contract: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord
): AuditApprovalJoinReadinessMatrixRecord {
  return {
    id: contract.id,
    key: buildStableAuditApprovalJoinReadinessKey(contract.id),
    readinessVersion: "backend-owned-synthetic-audit-approval-join-readiness-v1",
    requestLabel: contract.requestLabel,
    label: `${contract.requestLabel} audit and approval join readiness`,
    workspaceTarget: contract.workspaceTarget,
    selectedCapabilityFamily: cloneCapabilityFamily(
      contract.selectedCapabilityFamily
    ),
    joinContractState: "preview-only / contract-defined",
    auditJoinContractState: "preview-only / contract-defined",
    approvalJoinContractState: "preview-only / contract-defined",
    resultLinkContractState: "preview-only / contract-defined",
    joinRequestContractState: "preview-only",
    joinResponseContractState: "preview-only",
    joinErrorContractState: "preview-only",
    gateSchemaState: "preview-only / blocked",
    resultCaptureReviewDependency: "reviewed / preview-only",
    resultEnvelopeDependency: "reviewed / preview-only",
    resultDigestDependency: "deterministic preview digest only",
    evidencePacketDependency: "preview-only",
    auditBoundaryState: "preview-only / not persisted",
    approvalBoundaryState: "preview-only / not persisted",
    resultPersistenceBoundaryState: "not implemented",
    auditPersistenceBoundaryState: "not implemented",
    approvalPersistenceBoundaryState: "not implemented",
    databaseBoundaryState: "not implemented",
    fileBoundaryState: "not implemented",
    currentReadiness: "join-contract-only / not persistent",
    nextSafeAction: buildJoinContractNextSafeAction(contract.workspaceTarget),
  };
}

const AUDIT_APPROVAL_JOIN_READINESS_RECORDS =
  AUDIT_APPROVAL_JOIN_CONTRACTS.map((contract) => buildReadinessRecord(contract));

function buildEvidencePacketPreview(
  contract: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord
): AuditApprovalEvidencePacketPreviewRecord {
  return {
    id: contract.id,
    key: buildStableAuditApprovalEvidencePacketKey(contract.id),
    evidencePacketVersion:
      "backend-owned-synthetic-audit-approval-evidence-packet-v1",
    requestLabel: contract.requestLabel,
    label: buildEvidencePacketLabel(contract.requestLabel),
    workspaceTarget: contract.workspaceTarget,
    joinContractId: contract.id,
    sourceResultCaptureReviewReference: contract.sourceResultCaptureReviewReference,
    sourceResultEnvelopeReference: contract.sourceSyntheticResultEnvelopeReference,
    sourceAuditJoinReference: buildStableSyntheticAuditJoinKey(contract.id),
    sourceApprovalJoinReference: buildStableSyntheticApprovalJoinKey(contract.id),
    evidencePacketState: "preview-only",
    evidenceDigestPosture: "deterministic preview digest only",
    approvalEvidenceState: "preview-only",
    auditEvidenceState: "preview-only",
    resultEvidenceState: "preview-only",
    blockedActionEvidenceState: "preview-only",
    privacyRedactionEvidenceState: "preview-only",
    persistenceState: "not implemented",
    databaseWriteState: "not implemented",
    fileWriteState: "not implemented",
    blockedDefaultReason:
      `Audit and approval evidence packet preview remains preview-only for ${contract.requestLabel} because audit evidence, approval evidence, result evidence, blocked action evidence, privacy/redaction evidence, database writes, and file writes remain non-persistent.`,
    explicitNoEvidencePacketPersistenceStatement:
      "No evidence packet persistence.",
  };
}

const AUDIT_APPROVAL_EVIDENCE_PACKET_PREVIEWS =
  AUDIT_APPROVAL_JOIN_CONTRACTS.map((contract) =>
    buildEvidencePacketPreview(contract)
  );

function cloneJoinContract(
  record: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord
): BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function cloneAuditJoinContract(
  record: SyntheticAuditJoinContractRecord
): SyntheticAuditJoinContractRecord {
  return { ...record };
}

function cloneApprovalJoinContract(
  record: SyntheticApprovalJoinContractRecord
): SyntheticApprovalJoinContractRecord {
  return { ...record };
}

function cloneResultAuditApprovalLinkContract(
  record: ResultAuditApprovalLinkContractRecord
): ResultAuditApprovalLinkContractRecord {
  return { ...record };
}

function cloneJoinRequestContract(
  record: AuditApprovalJoinRequestContractRecord
): AuditApprovalJoinRequestContractRecord {
  return { ...record };
}

function cloneJoinResponseContract(
  record: AuditApprovalJoinResponseContractRecord
): AuditApprovalJoinResponseContractRecord {
  return { ...record };
}

function cloneJoinErrorContract(
  record: AuditApprovalJoinErrorContractRecord
): AuditApprovalJoinErrorContractRecord {
  return {
    ...record,
    validationErrorExamples: cloneList(record.validationErrorExamples),
  };
}

function cloneJoinGateRecord(
  record: AuditApprovalJoinGateRecord
): AuditApprovalJoinGateRecord {
  return { ...record };
}

function cloneReadinessRecord(
  record: AuditApprovalJoinReadinessMatrixRecord
): AuditApprovalJoinReadinessMatrixRecord {
  return {
    ...record,
    selectedCapabilityFamily: cloneCapabilityFamily(record.selectedCapabilityFamily),
  };
}

function cloneEvidencePacketPreview(
  record: AuditApprovalEvidencePacketPreviewRecord
): AuditApprovalEvidencePacketPreviewRecord {
  return { ...record };
}

export function listBackendOwnedSyntheticDryRunAuditApprovalJoinContracts():
  readonly BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord[] {
  return AUDIT_APPROVAL_JOIN_CONTRACTS.map((record) => cloneJoinContract(record));
}

export function listSyntheticAuditJoinContracts():
  readonly SyntheticAuditJoinContractRecord[] {
  return SYNTHETIC_AUDIT_JOIN_CONTRACTS.map((record) =>
    cloneAuditJoinContract(record)
  );
}

export function listSyntheticApprovalJoinContracts():
  readonly SyntheticApprovalJoinContractRecord[] {
  return SYNTHETIC_APPROVAL_JOIN_CONTRACTS.map((record) =>
    cloneApprovalJoinContract(record)
  );
}

export function listResultAuditApprovalLinkContracts():
  readonly ResultAuditApprovalLinkContractRecord[] {
  return RESULT_AUDIT_APPROVAL_LINK_CONTRACTS.map((record) =>
    cloneResultAuditApprovalLinkContract(record)
  );
}

export function listAuditApprovalJoinRequestContracts():
  readonly AuditApprovalJoinRequestContractRecord[] {
  return AUDIT_APPROVAL_JOIN_REQUEST_CONTRACTS.map((record) =>
    cloneJoinRequestContract(record)
  );
}

export function listAuditApprovalJoinResponseContracts():
  readonly AuditApprovalJoinResponseContractRecord[] {
  return AUDIT_APPROVAL_JOIN_RESPONSE_CONTRACTS.map((record) =>
    cloneJoinResponseContract(record)
  );
}

export function listAuditApprovalJoinErrorContracts():
  readonly AuditApprovalJoinErrorContractRecord[] {
  return AUDIT_APPROVAL_JOIN_ERROR_CONTRACTS.map((record) =>
    cloneJoinErrorContract(record)
  );
}

export function listAuditApprovalJoinGateRecords():
  readonly AuditApprovalJoinGateRecord[] {
  return AUDIT_APPROVAL_JOIN_GATES.map((record) => cloneJoinGateRecord(record));
}

export function listAuditApprovalJoinReadinessMatrixRecords():
  readonly AuditApprovalJoinReadinessMatrixRecord[] {
  return AUDIT_APPROVAL_JOIN_READINESS_RECORDS.map((record) =>
    cloneReadinessRecord(record)
  );
}

export function listAuditApprovalEvidencePacketPreviews():
  readonly AuditApprovalEvidencePacketPreviewRecord[] {
  return AUDIT_APPROVAL_EVIDENCE_PACKET_PREVIEWS.map((record) =>
    cloneEvidencePacketPreview(record)
  );
}

function buildCapabilityFamilyGroup(
  capabilityFamilyLabel: BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["selectedCapabilityFamily"]["label"],
  contracts: readonly BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord[]
): AuditApprovalJoinContractCapabilityFamilyGroup {
  const firstContract = contracts[0];

  if (!firstContract) {
    throw new Error(
      `Cannot build audit approval join capability family group without contracts: ${capabilityFamilyLabel}`
    );
  }

  return {
    capabilityFamilyId: firstContract.selectedCapabilityFamily.id,
    capabilityFamilyLabel,
    contractCount: contracts.length,
    contracts: contracts.map((contract) => cloneJoinContract(contract)),
  };
}

export function groupAuditApprovalJoinContractsByCapabilityFamily():
  readonly AuditApprovalJoinContractCapabilityFamilyGroup[] {
  const groups = new Map<
    BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord["selectedCapabilityFamily"]["label"],
    BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord[]
  >();

  for (const contract of AUDIT_APPROVAL_JOIN_CONTRACTS) {
    const label = contract.selectedCapabilityFamily.label;
    const existing = groups.get(label);

    if (existing) {
      existing.push(contract);
      continue;
    }

    groups.set(label, [contract]);
  }

  return Array.from(groups.entries()).map(([label, contracts]) =>
    buildCapabilityFamilyGroup(label, contracts)
  );
}

function buildWorkspaceGroup(
  workspaceTarget: AiModelProviderWorkspaceTarget,
  contracts: readonly BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord[]
): AuditApprovalJoinContractWorkspaceGroup {
  return {
    workspaceTarget,
    contractCount: contracts.length,
    contracts: contracts.map((contract) => cloneJoinContract(contract)),
  };
}

export function groupAuditApprovalJoinContractsByWorkspaceTarget():
  readonly AuditApprovalJoinContractWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedSyntheticDryRunAuditApprovalJoinContractRecord[]
  >();

  for (const contract of AUDIT_APPROVAL_JOIN_CONTRACTS) {
    const existing = groups.get(contract.workspaceTarget);

    if (existing) {
      existing.push(contract);
      continue;
    }

    groups.set(contract.workspaceTarget, [contract]);
  }

  return Array.from(groups.entries()).map(([workspaceTarget, contracts]) =>
    buildWorkspaceGroup(workspaceTarget, contracts)
  );
}

export function buildAuditApprovalJoinContractSummary():
  AuditApprovalJoinContractSummary {
  const capabilityGroups = groupAuditApprovalJoinContractsByCapabilityFamily();
  const workspaceGroups = groupAuditApprovalJoinContractsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    contractCount: AUDIT_APPROVAL_JOIN_CONTRACTS.length,
    auditJoinContractCount: SYNTHETIC_AUDIT_JOIN_CONTRACTS.length,
    approvalJoinContractCount: SYNTHETIC_APPROVAL_JOIN_CONTRACTS.length,
    resultLinkContractCount: RESULT_AUDIT_APPROVAL_LINK_CONTRACTS.length,
    requestContractCount: AUDIT_APPROVAL_JOIN_REQUEST_CONTRACTS.length,
    responseContractCount: AUDIT_APPROVAL_JOIN_RESPONSE_CONTRACTS.length,
    errorContractCount: AUDIT_APPROVAL_JOIN_ERROR_CONTRACTS.length,
    gateCount: AUDIT_APPROVAL_JOIN_GATES.length,
    readinessRecordCount: AUDIT_APPROVAL_JOIN_READINESS_RECORDS.length,
    evidencePacketCount: AUDIT_APPROVAL_EVIDENCE_PACKET_PREVIEWS.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    summaryLines: cloneList(AUDIT_APPROVAL_JOIN_SUMMARY_LINES),
  };
}

export function buildAuditApprovalJoinGateSummary():
  AuditApprovalJoinGateSummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    gateCount: AUDIT_APPROVAL_JOIN_GATES.length,
    backendJoinContractGateCount: AUDIT_APPROVAL_JOIN_GATES.filter(
      (record) => record.owner === "backend join contract"
    ).length,
    operatorGateCount: AUDIT_APPROVAL_JOIN_GATES.filter(
      (record) => record.owner === "operator"
    ).length,
    safetyReviewGateCount: AUDIT_APPROVAL_JOIN_GATES.filter(
      (record) => record.owner === "safety review"
    ).length,
    summaryLines: cloneList(AUDIT_APPROVAL_JOIN_GATE_SUMMARY_LINES),
  };
}

export function buildAuditApprovalJoinReadinessSummary():
  AuditApprovalJoinReadinessSummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    readinessRecordCount: AUDIT_APPROVAL_JOIN_READINESS_RECORDS.length,
    currentReadiness: "join-contract-only / not persistent",
    nextSafeAction:
      "Keep backend-owned synthetic dry-run audit and approval join contracts preview-only, non-persistent, and move to join review and recovery preview next.",
    summaryLines: cloneList(AUDIT_APPROVAL_JOIN_READINESS_SUMMARY_LINES),
  };
}

export function buildNextAuditApprovalJoinReviewAndRecoveryChecklist():
  readonly string[] {
  return cloneList(NEXT_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_CHECKLIST);
}
