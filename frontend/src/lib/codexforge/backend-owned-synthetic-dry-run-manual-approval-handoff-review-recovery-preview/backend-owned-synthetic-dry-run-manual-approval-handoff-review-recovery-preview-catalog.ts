import type { AiModelProviderWorkspaceTarget } from "../ai-provider-registry";
import {
  listBackendOwnedSyntheticDryRunManualApprovalHandoffContracts,
  listManualApprovalHandoffEvidenceSummaries,
  listManualApprovalHandoffGateRecords,
  listManualApprovalHandoffPackets,
  listManualApprovalHandoffReadinessMatrixRecords,
  listManualApprovalHandoffRequestContracts,
  listManualApprovalHandoffResponseContracts,
  listManualApprovalHandoffErrorContracts,
  listManualApprovalScopeRecords,
  type BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord,
  type ManualApprovalHandoffEvidenceSummaryRecord,
  type ManualApprovalHandoffGateId,
  type ManualApprovalHandoffGateLabel,
  type ManualApprovalHandoffGateRecord,
  type ManualApprovalHandoffPacketRecord,
  type ManualApprovalHandoffReadinessMatrixRecord,
  type ManualApprovalHandoffRequestContractRecord,
  type ManualApprovalHandoffResponseContractRecord,
  type ManualApprovalHandoffErrorContractRecord,
  type ManualApprovalScopeRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-handoff-contract";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
  type BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord,
  type ManualApprovalHandoffAcceptancePostureKey,
  type ManualApprovalHandoffAcceptancePostureRecord,
  type ManualApprovalHandoffDecisionContractChecklist,
  type ManualApprovalHandoffDecisionReviewKey,
  type ManualApprovalHandoffDecisionReviewRecord,
  type ManualApprovalHandoffGateFailureReviewKey,
  type ManualApprovalHandoffGateFailureReviewRecord,
  type ManualApprovalHandoffGateFailureReviewVersion,
  type ManualApprovalHandoffGateFailureState,
  type ManualApprovalHandoffGateFailureSummary,
  type ManualApprovalHandoffRecoveryPlanKey,
  type ManualApprovalHandoffRecoveryPlanPreviewRecord,
  type ManualApprovalHandoffRecoveryReadinessChecklistId,
  type ManualApprovalHandoffRecoveryReadinessChecklistKey,
  type ManualApprovalHandoffRecoveryReadinessChecklistLabel,
  type ManualApprovalHandoffRecoveryReadinessChecklistRecord,
  type ManualApprovalHandoffRecoverySummary,
  type ManualApprovalHandoffReviewAuditSummaryKey,
  type ManualApprovalHandoffReviewAuditSummaryRecord,
  type ManualApprovalHandoffReviewCapabilityFamilyGroup,
  type ManualApprovalHandoffReviewCurrentReadiness,
  type ManualApprovalHandoffReviewId,
  type ManualApprovalHandoffReviewKey,
  type ManualApprovalHandoffReviewSectionTitle,
  type ManualApprovalHandoffReviewSeverity,
  type ManualApprovalHandoffReviewSummary,
  type ManualApprovalHandoffReviewWorkspaceGroup,
} from "./backend-owned-synthetic-dry-run-manual-approval-handoff-review-recovery-preview-types";

type GateFailureSeed = Readonly<{
  state: ManualApprovalHandoffGateFailureState;
  severity: ManualApprovalHandoffReviewSeverity;
  operatorFacingExplanation: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

type RecoveryReadinessChecklistSeed = Readonly<{
  checklistId: ManualApprovalHandoffRecoveryReadinessChecklistId;
  label: ManualApprovalHandoffRecoveryReadinessChecklistLabel;
  state: ManualApprovalHandoffRecoveryReadinessChecklistRecord["state"];
  severity: ManualApprovalHandoffReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ManualApprovalHandoffRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const REVIEW_SUMMARY_LINES = [
  "backend-owned synthetic dry-run manual approval handoff review and recovery preview only",
  "manual approval handoff review is preview-only",
  "manual approval handoff decision review is preview-only",
  "manual approval handoff gate failure review is preview-only",
  "manual approval handoff recovery plan is preview-only",
  "manual approval handoff recovery readiness is preview-only",
  "manual approval handoff acceptance posture is preview-only",
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
  "current readiness is manual-approval-handoff-review-only / not approved / not executable / not persistent",
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
  "backend-owned synthetic dry-run manual approval decision contract next",
] as const;

export const MANUAL_APPROVAL_HANDOFF_REVIEW_SECTION_TITLES: readonly ManualApprovalHandoffReviewSectionTitle[] =
  [
    "Backend-owned synthetic dry-run manual approval handoff review",
    "Manual approval handoff decision review",
    "Manual approval handoff gate failure review",
    "Manual approval handoff recovery plan",
    "Manual approval handoff recovery readiness",
    "Manual approval handoff review audit summary",
    "Manual approval handoff acceptance posture",
  ] as const;

const GATE_FAILURE_SUMMARY_LINES = [
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

const RECOVERY_SUMMARY_LINES = [
  "manual approval handoff recovery plan is preview-only",
  "manual approval handoff recovery readiness is preview-only",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "operator approval not requested recovery",
  "manual confirmation not captured recovery",
  "approval decision not evaluated recovery",
  "approval token not issued recovery",
  "approval lease not created recovery",
  "approval reference not persisted recovery",
  "audit reference not persisted recovery",
  "result reference not persisted recovery",
  "queue dispatch blocked recovery",
  "worker dispatch blocked recovery",
  "job execution blocked recovery",
  "result persistence missing recovery",
  "audit persistence missing recovery",
  "approval persistence missing recovery",
  "database write blocked recovery",
  "file write blocked recovery",
  "backend-owned synthetic dry-run manual approval decision contract next",
] as const;

const MANUAL_APPROVAL_DECISION_CONTRACT_CHECKLIST = [
  "Review why each backend-owned synthetic dry-run manual approval handoff remains not requested, not confirmed, not approved, not persisted, and not ready.",
  "Carry operator review notes, blocking gates, missing evidence, recovery posture, and acceptance blockers into the backend-owned synthetic dry-run manual approval decision contract batch.",
  "Keep approval requests uncreated, approval decisions unevaluated, approval tokens unissued, approval leases uncreated, and every approval, audit, result, database, and file reference non-persistent.",
  "Preserve no prompt sending, no model calls, no provider SDK imports, no provider execution, no queue dispatch, no worker dispatch, no job execution, no retry execution, and no fallback execution posture.",
  "Keep the next batch backend-owned, deterministic, frontend-safe, review-first, and focused on manual approval decision contract definitions only.",
] as const satisfies ManualApprovalHandoffDecisionContractChecklist;

const CURRENT_REVIEW_READINESS: ManualApprovalHandoffReviewCurrentReadiness =
  "manual-approval-handoff-review-only / not approved / not executable / not persistent";

const MANUAL_APPROVAL_HANDOFF_CONTRACTS =
  listBackendOwnedSyntheticDryRunManualApprovalHandoffContracts();
const MANUAL_APPROVAL_HANDOFF_PACKETS = listManualApprovalHandoffPackets();
const MANUAL_APPROVAL_HANDOFF_REQUEST_CONTRACTS =
  listManualApprovalHandoffRequestContracts();
const MANUAL_APPROVAL_HANDOFF_RESPONSE_CONTRACTS =
  listManualApprovalHandoffResponseContracts();
const MANUAL_APPROVAL_HANDOFF_ERROR_CONTRACTS =
  listManualApprovalHandoffErrorContracts();
const MANUAL_APPROVAL_SCOPE_RECORDS = listManualApprovalScopeRecords();
const MANUAL_APPROVAL_HANDOFF_GATE_RECORDS = listManualApprovalHandoffGateRecords();
const MANUAL_APPROVAL_HANDOFF_READINESS_RECORDS =
  listManualApprovalHandoffReadinessMatrixRecords();
const MANUAL_APPROVAL_HANDOFF_EVIDENCE_SUMMARIES =
  listManualApprovalHandoffEvidenceSummaries();

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
  resolveId: (record: T) => ManualApprovalHandoffReviewId
): ReadonlyMap<ManualApprovalHandoffReviewId, readonly T[]> {
  const grouped = new Map<ManualApprovalHandoffReviewId, T[]>();

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

function buildReviewLabel(requestLabel: string): string {
  return `Backend-owned ${requestLabel} synthetic dry-run manual approval handoff review`;
}

function buildOperatorRequestPhrase(
  contract: BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord
): string {
  return `Review why the ${contract.requestLabel} synthetic dry-run manual approval handoff remains held.`;
}

function buildReviewNextSafeAction(requestLabel: string): string {
  return `manual approval decision contract comes next. Keep the ${requestLabel} handoff review preview-only, not approved, not executable, and non-persistent.`;
}

export function buildStableManualApprovalHandoffReviewKey(
  reviewId: ManualApprovalHandoffReviewId
): ManualApprovalHandoffReviewKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-review:${reviewId}`;
}

export function buildStableManualApprovalHandoffDecisionReviewKey(
  reviewId: ManualApprovalHandoffReviewId
): ManualApprovalHandoffDecisionReviewKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-decision-review:${reviewId}`;
}

export function buildStableManualApprovalHandoffGateFailureReviewKey(
  reviewId: ManualApprovalHandoffReviewId,
  failedGateId: ManualApprovalHandoffGateId
): ManualApprovalHandoffGateFailureReviewKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-gate-failure-review:${reviewId}:${failedGateId}`;
}

export function buildStableManualApprovalHandoffRecoveryPlanKey(
  reviewId: ManualApprovalHandoffReviewId
): ManualApprovalHandoffRecoveryPlanKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-recovery-plan:${reviewId}`;
}

export function buildStableManualApprovalHandoffRecoveryReadinessChecklistKey(
  reviewId: ManualApprovalHandoffReviewId,
  checklistId: ManualApprovalHandoffRecoveryReadinessChecklistId
): ManualApprovalHandoffRecoveryReadinessChecklistKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-recovery-readiness:${reviewId}:${checklistId}`;
}

export function buildStableManualApprovalHandoffReviewAuditSummaryKey(
  reviewId: ManualApprovalHandoffReviewId
): ManualApprovalHandoffReviewAuditSummaryKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-review-audit-summary:${reviewId}`;
}

export function buildStableManualApprovalHandoffAcceptancePostureKey(
  reviewId: ManualApprovalHandoffReviewId
): ManualApprovalHandoffAcceptancePostureKey {
  return `backend-owned-synthetic-dry-run-manual-approval-handoff-acceptance-posture:${reviewId}`;
}

const PACKETS_BY_ID = new Map(
  MANUAL_APPROVAL_HANDOFF_PACKETS.map((record) => [record.id, record] as const)
);
const REQUEST_CONTRACTS_BY_ID = new Map(
  MANUAL_APPROVAL_HANDOFF_REQUEST_CONTRACTS.map((record) => [record.id, record] as const)
);
const RESPONSE_CONTRACTS_BY_ID = new Map(
  MANUAL_APPROVAL_HANDOFF_RESPONSE_CONTRACTS.map((record) => [record.id, record] as const)
);
const ERROR_CONTRACTS_BY_ID = new Map(
  MANUAL_APPROVAL_HANDOFF_ERROR_CONTRACTS.map((record) => [record.id, record] as const)
);
const READINESS_RECORDS_BY_ID = new Map(
  MANUAL_APPROVAL_HANDOFF_READINESS_RECORDS.map((record) => [record.id, record] as const)
);
const EVIDENCE_SUMMARIES_BY_ID = new Map(
  MANUAL_APPROVAL_HANDOFF_EVIDENCE_SUMMARIES.map((record) => [record.id, record] as const)
);
const SCOPES_BY_ID = groupRecordsById(
  MANUAL_APPROVAL_SCOPE_RECORDS,
  (record) => record.handoffContractId
);
const GATES_BY_ID = groupRecordsById(
  MANUAL_APPROVAL_HANDOFF_GATE_RECORDS,
  (record) => record.handoffContractId
);

function buildReviewRecord(
  contract: BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord
): BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord {
  const packet = resolveRequiredRecord(
    PACKETS_BY_ID.get(contract.id),
    `Missing manual approval handoff packet for ${contract.id}.`
  );
  const requestContract = resolveRequiredRecord(
    REQUEST_CONTRACTS_BY_ID.get(contract.id),
    `Missing manual approval handoff request contract for ${contract.id}.`
  );
  const responseContract = resolveRequiredRecord(
    RESPONSE_CONTRACTS_BY_ID.get(contract.id),
    `Missing manual approval handoff response contract for ${contract.id}.`
  );
  const errorContract = resolveRequiredRecord(
    ERROR_CONTRACTS_BY_ID.get(contract.id),
    `Missing manual approval handoff error contract for ${contract.id}.`
  );
  const scopeRecord = resolveRequiredRecord(
    SCOPES_BY_ID.get(contract.id)?.[0],
    `Missing manual approval scope for ${contract.id}.`
  );
  const gateRecord = resolveRequiredRecord(
    GATES_BY_ID.get(contract.id)?.[0],
    `Missing manual approval handoff gate record for ${contract.id}.`
  );
  const readinessRecord = resolveRequiredRecord(
    READINESS_RECORDS_BY_ID.get(contract.id),
    `Missing manual approval handoff readiness record for ${contract.id}.`
  );
  const evidenceSummary = resolveRequiredRecord(
    EVIDENCE_SUMMARIES_BY_ID.get(contract.id),
    `Missing manual approval handoff evidence summary for ${contract.id}.`
  );

  return {
    id: contract.id,
    key: buildStableManualApprovalHandoffReviewKey(contract.id),
    reviewVersion:
      "backend-owned-synthetic-dry-run-manual-approval-handoff-review-preview-v1",
    previewOnlyStatement: "manual approval handoff review is preview-only",
    source: contract.source,
    reviewMode: "preview-only",
    reviewPosture: "manual approval handoff review / not approved / not persistent",
    requestLabel: contract.requestLabel,
    label: buildReviewLabel(contract.requestLabel),
    operatorRequestPhrase: buildOperatorRequestPhrase(contract),
    workspaceTarget: contract.workspaceTarget,
    sourceManualApprovalHandoffContractReference: contract.key,
    sourceManualApprovalHandoffPacketReference: packet.key,
    sourceManualApprovalHandoffRequestReference: requestContract.key,
    sourceManualApprovalHandoffResponseReference: responseContract.key,
    sourceManualApprovalHandoffErrorReference: errorContract.key,
    sourceManualApprovalScopeReference: scopeRecord.key,
    sourceManualApprovalHandoffGateReference: gateRecord.key,
    sourceManualApprovalHandoffReadinessReference: readinessRecord.key,
    sourceManualApprovalHandoffEvidenceSummaryReference: evidenceSummary.key,
    sourceEndToEndPacketReviewReference:
      contract.sourceEndToEndPacketReviewReference,
    sourceEndToEndPacketAcceptancePostureReference:
      contract.sourceEndToEndPacketAcceptancePostureReference,
    sourceEndToEndPacketAuditSummaryReference:
      contract.sourceEndToEndPacketReviewAuditSummaryReference,
    sourceRunIntentReference: contract.sourceRunIntentReference,
    sourceApprovalPacketReference: contract.sourceApprovalPacketReference,
    sourceManualAdmissionPreviewReference:
      contract.sourceManualAdmissionPreviewReference,
    sourceBackendAdmissionContractReference:
      contract.sourceBackendAdmissionContractReference,
    selectedCapabilityFamily: cloneCapabilityFamily(
      contract.selectedCapabilityFamily
    ),
    providerSlotLabel: contract.providerSlotLabel,
    backupProviderSlotLabel: contract.backupProviderSlotLabel,
    localPrivateAlternativeLabel: contract.localPrivateAlternativeLabel,
    handoffState: contract.handoffState,
    handoffRequestState: contract.handoffRequestState,
    handoffInvocationState: contract.handoffInvocationState,
    handoffResponseState: responseContract.responseState,
    handoffErrorState: errorContract.errorState,
    operatorApprovalState: contract.operatorApprovalState,
    manualConfirmationState: contract.manualConfirmationState,
    approvalDecisionState: contract.approvalDecisionState,
    approvalTokenState: contract.approvalTokenState,
    approvalLeaseState: contract.approvalLeaseState,
    approvalReferenceState: contract.approvalReferenceState,
    auditReferenceState: contract.auditReferenceState,
    resultReferenceState: contract.resultReferenceState,
    evidencePacketState: contract.evidencePacketState,
    endToEndPacketState: contract.endToEndPacketState,
    packetDecisionState: contract.packetDecisionState,
    admissionState: contract.admissionState,
    dryRunExecutionState: contract.dryRunExecutionState,
    resultCaptureState: contract.resultCaptureState,
    auditJoinState: contract.auditJoinState,
    approvalJoinState: contract.approvalJoinState,
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
    nextManualApprovalDecisionContractRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    currentReadiness: CURRENT_REVIEW_READINESS,
  };
}

const REVIEW_RECORDS = MANUAL_APPROVAL_HANDOFF_CONTRACTS.map(buildReviewRecord);
const REVIEW_RECORDS_BY_ID = new Map(
  REVIEW_RECORDS.map((record) => [record.id, record] as const)
);

const DECISION_BLOCKING_GATE_IDS: readonly ManualApprovalHandoffGateId[] = [
  "operator-approval-gate",
  "manual-confirmation-gate",
  "end-to-end-packet-review-gate",
  "evidence-packet-gate",
  "server-only-boundary-gate",
  "no-prompt-sending-gate",
  "no-provider-sdk-import-gate",
] as const;

function mapGateLabels(
  gateIds: readonly ManualApprovalHandoffGateId[]
): readonly ManualApprovalHandoffGateLabel[] {
  const labelById = new Map<ManualApprovalHandoffGateId, ManualApprovalHandoffGateLabel>(
    MANUAL_APPROVAL_HANDOFF_GATE_RECORDS.map((record) => [record.id, record.label] as const)
  );

  return gateIds.map((gateId) =>
    resolveRequiredRecord(
      labelById.get(gateId),
      `Missing manual approval handoff gate label for ${gateId}.`
    )
  );
}

function buildDecisionReviewRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord
): ManualApprovalHandoffDecisionReviewRecord {
  return {
    id: review.id,
    key: buildStableManualApprovalHandoffDecisionReviewKey(review.id),
    decisionReviewVersion:
      "backend-owned-synthetic-dry-run-manual-approval-handoff-decision-review-preview-v1",
    previewOnlyStatement: "manual approval handoff decision review is preview-only",
    handoffReviewId: review.id,
    sourceHandoffContractReference:
      review.sourceManualApprovalHandoffContractReference,
    sourceHandoffPacketReference: review.sourceManualApprovalHandoffPacketReference,
    sourceRequestReference: review.sourceManualApprovalHandoffRequestReference,
    sourceResponseReference: review.sourceManualApprovalHandoffResponseReference,
    sourceErrorReference: review.sourceManualApprovalHandoffErrorReference,
    decisionState: "held / approval not requested",
    approvalReasonSummary:
      `${review.requestLabel} remains held because operator approval is not requested, manual confirmation is not captured, approval decision evaluation does not exist yet, and execution and persistence stay blocked by default.`,
    topBlockingGates: mapGateLabels(DECISION_BLOCKING_GATE_IDS),
    topMissingEvidence: [
      "operator approval evidence that remains intentionally absent",
      "manual confirmation evidence that remains intentionally absent",
      "manual approval scope evidence that remains preview-only",
      "handoff evidence summary proving no persistence and no execution",
    ],
    operatorReviewNotes: [
      "No approval request is created in this batch.",
      "No approval, audit, result, database, or file persistence is introduced in this batch.",
      "Chat input stays inert/local only and does not send prompts or call models.",
    ],
    manualRecoveryRequirement:
      "Manual review must confirm blockers, evidence, safety posture, privacy posture, audit posture, and backend-only boundaries before the decision contract can exist.",
    manualApprovalDecisionDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    nextSafeAction: buildReviewNextSafeAction(review.requestLabel),
    explicitNoApprovalRequestNoApprovalPersistenceStatement:
      "No approval request. No approval persistence.",
  };
}

const DECISION_REVIEW_RECORDS = REVIEW_RECORDS.map(buildDecisionReviewRecord);

const GATE_FAILURE_SEEDS: Readonly<Record<ManualApprovalHandoffGateId, GateFailureSeed>> =
  {
    "end-to-end-packet-review-gate": {
      state: "held / end-to-end packet review incomplete",
      severity: "critical",
      operatorFacingExplanation:
        "End-to-end packet review remains held, so handoff review cannot advance into any approval decision flow.",
      requiredRecoveryAction:
        "Re-review the end-to-end packet review and keep it preview-only and held.",
      nextSafeAction:
        "Keep end-to-end packet review references visible and defer all decision logic to the next batch.",
    },
    "packet-acceptance-posture-gate": {
      state: "held / packet acceptance posture incomplete",
      severity: "critical",
      operatorFacingExplanation:
        "Acceptance posture remains not accepted / preview-only, so no approval handoff can be considered accepted.",
      requiredRecoveryAction:
        "Preserve the not accepted / preview-only posture and document the blockers.",
      nextSafeAction:
        "Carry acceptance blockers into the manual approval decision contract batch.",
    },
    "evidence-packet-gate": {
      state: "held / evidence packet preview-only",
      severity: "high",
      operatorFacingExplanation:
        "Evidence is deterministic preview-only evidence and cannot be treated as live approval evidence.",
      requiredRecoveryAction:
        "Keep evidence packet review-only and non-persistent.",
      nextSafeAction:
        "Review evidence summaries without introducing storage or approval requests.",
    },
    "operator-approval-gate": {
      state: "held / operator approval not requested",
      severity: "critical",
      operatorFacingExplanation:
        "Operator approval is intentionally not requested in this batch.",
      requiredRecoveryAction:
        "Preserve the not requested posture and define decision-only contracts next.",
      nextSafeAction:
        "Do not request approval. Keep the record held.",
    },
    "manual-confirmation-gate": {
      state: "held / manual confirmation not captured",
      severity: "critical",
      operatorFacingExplanation:
        "Manual confirmation is intentionally not captured in this batch.",
      requiredRecoveryAction:
        "Preserve the not captured posture and define the future decision boundary only.",
      nextSafeAction:
        "Do not capture confirmation. Keep the record held.",
    },
    "approval-scope-gate": {
      state: "held / approval scope preview-only",
      severity: "high",
      operatorFacingExplanation:
        "Approval scope exists only as preview-only scope records and is not approved.",
      requiredRecoveryAction:
        "Review scope limits and keep them non-executable and non-approved.",
      nextSafeAction:
        "Carry scope review into the decision contract batch.",
    },
    "approval-expiry-gate": {
      state: "held / approval expiry not created",
      severity: "medium",
      operatorFacingExplanation:
        "No approval lease exists, so no expiry boundary exists yet.",
      requiredRecoveryAction:
        "Keep approval expiry handling undefined until the decision contract batch.",
      nextSafeAction:
        "Do not create approval expiry records.",
    },
    "approval-revocation-gate": {
      state: "held / approval revocation not evaluated",
      severity: "medium",
      operatorFacingExplanation:
        "No approval exists, so revocation remains intentionally unevaluated.",
      requiredRecoveryAction:
        "Keep revocation handling inert until a future backend-only decision layer exists.",
      nextSafeAction:
        "Do not introduce revocation state or persistence.",
    },
    "kill-switch-gate": {
      state: "held / kill switch review required",
      severity: "high",
      operatorFacingExplanation:
        "Kill switch review remains mandatory before any backend-only continuation is possible.",
      requiredRecoveryAction:
        "Preserve the kill switch requirement and keep execution blocked.",
      nextSafeAction:
        "Carry kill switch requirements into the decision contract batch.",
    },
    "audit-gate": {
      state: "held / audit evidence not persisted",
      severity: "high",
      operatorFacingExplanation:
        "Audit is required, but audit references remain intentionally non-persistent.",
      requiredRecoveryAction:
        "Review audit evidence summaries without adding audit persistence.",
      nextSafeAction:
        "Keep audit evidence preview-only and non-persistent.",
    },
    "privacy-redaction-gate": {
      state: "held / privacy/redaction review required",
      severity: "high",
      operatorFacingExplanation:
        "Privacy and redaction review remains required before any backend-only approval decision path could exist.",
      requiredRecoveryAction:
        "Preserve privacy/redaction blockers and opaque credential posture.",
      nextSafeAction:
        "Keep secrets opaque and preserve redaction review requirements.",
    },
    "cost-rate-timeout-gate": {
      state: "held / cost/rate/timeout guard review required",
      severity: "high",
      operatorFacingExplanation:
        "Cost acknowledgement, rate limiting, and timeout/cancel guardrails remain required and unevaluated.",
      requiredRecoveryAction:
        "Keep cost/rate/timeout reviews manual and preview-only.",
      nextSafeAction:
        "Carry guardrail review into the decision contract batch.",
    },
    "idempotency-replay-gate": {
      state: "held / idempotency and replay review required",
      severity: "high",
      operatorFacingExplanation:
        "Idempotency and replay protection remain required before any approval path can exist.",
      requiredRecoveryAction:
        "Keep idempotency and replay blockers explicit and non-executable.",
      nextSafeAction:
        "Do not add retry or replay behavior.",
    },
    "single-run-lock-gate": {
      state: "held / single-run lock not created",
      severity: "high",
      operatorFacingExplanation:
        "No single-run lock exists because execution remains blocked by default.",
      requiredRecoveryAction:
        "Keep lock creation out of this preview batch.",
      nextSafeAction:
        "Carry single-run lock requirements into the next batch only.",
    },
    "server-only-boundary-gate": {
      state: "held / server-only boundary required",
      severity: "critical",
      operatorFacingExplanation:
        "Frontend surfaces may review the records, but any real handoff path must remain backend-only.",
      requiredRecoveryAction:
        "Preserve frontend block and keep server-only adapters required.",
      nextSafeAction:
        "Do not add frontend-callable routes or execution paths.",
    },
    "opaque-credential-gate": {
      state: "held / opaque credential references only",
      severity: "high",
      operatorFacingExplanation:
        "Only opaque credential references are allowed and plaintext secrets remain forbidden.",
      requiredRecoveryAction:
        "Keep credential references opaque and avoid SDK execution paths.",
      nextSafeAction:
        "Do not surface credentials or secrets in frontend code.",
    },
    "no-plaintext-secrets-gate": {
      state: "held / plaintext secrets forbidden",
      severity: "high",
      operatorFacingExplanation:
        "Plaintext secrets remain forbidden across preview records and UI copy.",
      requiredRecoveryAction:
        "Preserve redaction and secret-free preview posture.",
      nextSafeAction:
        "Do not add secrets, storage, or key reads.",
    },
    "no-frontend-provider-call-gate": {
      state: "held / frontend provider calls blocked",
      severity: "critical",
      operatorFacingExplanation:
        "Frontend provider calls remain blocked and no network/provider calls may be introduced here.",
      requiredRecoveryAction:
        "Keep every review helper in-memory and deterministic.",
      nextSafeAction:
        "Do not add fetch, provider SDK, or live API paths.",
    },
    "no-provider-sdk-import-gate": {
      state: "held / provider SDK imports blocked",
      severity: "critical",
      operatorFacingExplanation:
        "Provider SDK imports remain blocked in frontend review code.",
      requiredRecoveryAction:
        "Keep provider integration references textual only.",
      nextSafeAction:
        "Do not import provider SDKs.",
    },
    "no-prompt-sending-gate": {
      state: "held / prompt sending blocked",
      severity: "critical",
      operatorFacingExplanation:
        "Prompt sending remains blocked and chat input must stay inert/local only.",
      requiredRecoveryAction:
        "Keep all prompt-related actions blocked and unimplemented.",
      nextSafeAction:
        "Do not send prompts or call models.",
    },
    "no-queue-dispatch-gate": {
      state: "held / queue dispatch blocked",
      severity: "high",
      operatorFacingExplanation:
        "Queue dispatch remains blocked because no backend execution path is implemented.",
      requiredRecoveryAction:
        "Preserve non-dispatched queue posture.",
      nextSafeAction:
        "Do not dispatch queues.",
    },
    "no-worker-dispatch-gate": {
      state: "held / worker dispatch blocked",
      severity: "high",
      operatorFacingExplanation:
        "Worker dispatch remains blocked because execution remains preview-only.",
      requiredRecoveryAction:
        "Preserve non-dispatched worker posture.",
      nextSafeAction:
        "Do not dispatch workers.",
    },
    "no-job-execution-gate": {
      state: "held / job execution blocked",
      severity: "high",
      operatorFacingExplanation:
        "Job execution remains blocked because no approval decision or backend execution path exists yet.",
      requiredRecoveryAction:
        "Preserve non-executed job posture.",
      nextSafeAction:
        "Do not execute jobs.",
    },
    "no-result-persistence-gate": {
      state: "held / result persistence blocked",
      severity: "high",
      operatorFacingExplanation:
        "Result references remain non-persistent and no result persistence exists in this batch.",
      requiredRecoveryAction:
        "Preserve preview-only result posture.",
      nextSafeAction:
        "Do not capture or persist results.",
    },
    "no-audit-persistence-gate": {
      state: "held / audit persistence blocked",
      severity: "high",
      operatorFacingExplanation:
        "Audit references remain non-persistent and no audit persistence exists in this batch.",
      requiredRecoveryAction:
        "Preserve preview-only audit posture.",
      nextSafeAction:
        "Do not persist audit records.",
    },
    "no-approval-persistence-gate": {
      state: "held / approval persistence blocked",
      severity: "critical",
      operatorFacingExplanation:
        "Approval references remain non-persistent and no approval record may be stored.",
      requiredRecoveryAction:
        "Preserve preview-only approval posture.",
      nextSafeAction:
        "Do not persist approval records.",
    },
    "no-database-write-gate": {
      state: "held / database write blocked",
      severity: "high",
      operatorFacingExplanation:
        "Database writes remain blocked because this preview batch defines only in-memory typed records.",
      requiredRecoveryAction:
        "Keep database writes unimplemented.",
      nextSafeAction:
        "Do not add database writes.",
    },
    "no-file-write-gate": {
      state: "held / file write blocked",
      severity: "high",
      operatorFacingExplanation:
        "File writes remain blocked because this preview batch must stay inert and non-persistent.",
      requiredRecoveryAction:
        "Keep file writes unimplemented.",
      nextSafeAction:
        "Do not add file writes.",
    },
  } as const;

const GATES_BY_REVIEW_ID = groupRecordsById(
  MANUAL_APPROVAL_HANDOFF_GATE_RECORDS,
  (record) => record.handoffContractId
);

function buildGateFailureReviewRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord,
  gateRecord: ManualApprovalHandoffGateRecord
): ManualApprovalHandoffGateFailureReviewRecord {
  const seed = resolveRequiredRecord(
    GATE_FAILURE_SEEDS[gateRecord.id],
    `Missing gate failure seed for ${gateRecord.id}.`
  );

  return {
    key: buildStableManualApprovalHandoffGateFailureReviewKey(
      review.id,
      gateRecord.id
    ),
    gateFailureReviewVersion:
      "backend-owned-synthetic-dry-run-manual-approval-handoff-gate-failure-review-preview-v1",
    previewOnlyStatement:
      "manual approval handoff gate failure review is preview-only",
    handoffReviewId: review.id,
    failedGateId: gateRecord.id,
    failedGateLabel: gateRecord.label,
    gateState: seed.state,
    severity: seed.severity,
    affectedCapabilityFamily: cloneCapabilityFamily(
      review.selectedCapabilityFamily
    ),
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation:
      `${review.requestLabel}: ${seed.operatorFacingExplanation}`,
    requiredEvidenceToUnblock: gateRecord.evidenceRequirement,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    manualApprovalDecisionDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
    explicitNoGatePassStatement: "No gate pass is granted.",
  };
}

const GATE_FAILURE_REVIEW_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  resolveRequiredRecord(
    GATES_BY_REVIEW_ID.get(review.id),
    `Missing gate records for review ${review.id}.`
  ).map((gateRecord) => buildGateFailureReviewRecord(review, gateRecord))
);

function buildRecoveryPlanPreviewRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord
): ManualApprovalHandoffRecoveryPlanPreviewRecord {
  return {
    id: review.id,
    key: buildStableManualApprovalHandoffRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-synthetic-dry-run-manual-approval-handoff-recovery-plan-preview-v1",
    previewOnlyStatement: "manual approval handoff recovery plan is preview-only",
    handoffReviewId: review.id,
    recoveryPosture: "manual review only",
    endToEndPacketReviewRecovery:
      "Re-review the end-to-end packet review and keep packet acceptance held and preview-only.",
    acceptancePostureRecovery:
      "Preserve the not accepted / preview-only posture and carry its blockers forward.",
    evidencePacketRecovery:
      "Review the evidence packet digest without promoting it into live approval evidence.",
    operatorApprovalNotRequestedRecovery:
      "Keep operator approval not requested and document why approval creation remains blocked.",
    manualConfirmationNotCapturedRecovery:
      "Keep manual confirmation not captured and document why confirmation remains blocked.",
    approvalDecisionNotEvaluatedRecovery:
      "Keep approval decision not evaluated and defer decision logic to the next contract batch.",
    approvalTokenNotIssuedRecovery:
      "Keep approval token issuance unimplemented and non-persistent.",
    approvalLeaseNotCreatedRecovery:
      "Keep approval lease creation unimplemented and non-persistent.",
    approvalReferenceNotPersistedRecovery:
      "Do not persist approval references; preserve preview-only linkage.",
    auditReferenceNotPersistedRecovery:
      "Do not persist audit references; preserve preview-only linkage.",
    resultReferenceNotPersistedRecovery:
      "Do not persist result references; preserve preview-only linkage.",
    approvalScopeRecovery:
      "Re-review scope boundaries and keep them preview-only / not approved.",
    approvalExpiryRevocationRecovery:
      "Keep approval expiry and revocation handling undefined until the decision contract exists.",
    killSwitchRecovery:
      "Carry kill switch requirements into the next decision contract without enabling execution.",
    privacyRedactionRecovery:
      "Preserve privacy/redaction review, opaque credential posture, and no plaintext secret posture.",
    costRateTimeoutRecovery:
      "Preserve cost acknowledgement, rate limit, timeout/cancel, idempotency, replay, and single-run lock blockers.",
    queueDispatchBlockedRecovery:
      "Do not introduce queue dispatch; preserve the blocked boundary.",
    workerDispatchBlockedRecovery:
      "Do not introduce worker dispatch; preserve the blocked boundary.",
    jobExecutionBlockedRecovery:
      "Do not introduce job execution; preserve the blocked boundary.",
    resultPersistenceMissingRecovery:
      "Do not introduce result persistence; preserve the blocked boundary.",
    auditPersistenceMissingRecovery:
      "Do not introduce audit persistence; preserve the blocked boundary.",
    approvalPersistenceMissingRecovery:
      "Do not introduce approval persistence; preserve the blocked boundary.",
    databaseWriteBlockedRecovery:
      "Do not introduce database writes; preserve the blocked boundary.",
    fileWriteBlockedRecovery:
      "Do not introduce file writes; preserve the blocked boundary.",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    operatorActionRequired:
      `The operator must review why ${review.requestLabel} remains held without requesting or persisting approval.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    explicitNoRetryNoFallbackNoApprovalExecutionNoPersistenceStatement:
      "No retry. No fallback. No approval execution. No persistence.",
  };
}

const RECOVERY_PLAN_PREVIEW_RECORDS = REVIEW_RECORDS.map(
  buildRecoveryPlanPreviewRecord
);

const RECOVERY_READINESS_CHECKLIST_SEEDS: readonly RecoveryReadinessChecklistSeed[] =
  [
    {
      checklistId: "handoff-contract-reviewed",
      label: "handoff contract reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Manual approval handoff contract posture, blocked default reason, and next safe action.",
      recoveryAction:
        "Review the contract and keep it preview-only and non-persistent.",
      owner: "operator",
      nextSafeAction: "Keep contract review visible for the decision contract batch.",
    },
    {
      checklistId: "handoff-packet-reviewed",
      label: "handoff packet reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Handoff packet summary, requested approval scope, and blocked action summary.",
      recoveryAction:
        "Review the packet summary and keep approval requests uncreated.",
      owner: "operator",
      nextSafeAction: "Preserve packet posture as preview-only.",
    },
    {
      checklistId: "handoff-request-contract-reviewed",
      label: "handoff request contract reviewed",
      state: "manual review required",
      severity: "medium",
      evidenceRequired:
        "Request contract state, invocation state, and no request created statement.",
      recoveryAction: "Review request posture without creating a request.",
      owner: "operator",
      nextSafeAction: "Keep request creation blocked.",
    },
    {
      checklistId: "handoff-response-contract-reviewed",
      label: "handoff response contract reviewed",
      state: "manual review required",
      severity: "medium",
      evidenceRequired:
        "Response contract state, approval decision state, and no response/no approval statement.",
      recoveryAction: "Review response posture without receiving a response.",
      owner: "operator",
      nextSafeAction: "Keep response receipt blocked.",
    },
    {
      checklistId: "handoff-error-contract-reviewed",
      label: "handoff error contract reviewed",
      state: "manual review required",
      severity: "medium",
      evidenceRequired:
        "Error contract examples, retry posture, fallback posture, and recovery posture.",
      recoveryAction: "Review error posture without introducing retries or fallback.",
      owner: "operator",
      nextSafeAction: "Keep retry and fallback disabled.",
    },
    {
      checklistId: "manual-approval-scope-reviewed",
      label: "manual approval scope reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Scope records, blocked actions, and disallowed actions even if approved.",
      recoveryAction: "Review scope boundaries and keep them not approved.",
      owner: "operator",
      nextSafeAction: "Carry scope limits forward unchanged.",
    },
    {
      checklistId: "handoff-gates-reviewed",
      label: "handoff gates reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Gate records, evidence requirements, and blocked default reasons.",
      recoveryAction: "Review all gate blockers and keep them blocked.",
      owner: "operator",
      nextSafeAction: "Carry gate blockers into the decision contract batch.",
    },
    {
      checklistId: "handoff-readiness-matrix-reviewed",
      label: "handoff readiness matrix reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Readiness matrix record and current readiness string.",
      recoveryAction: "Review readiness and keep execution blocked.",
      owner: "operator",
      nextSafeAction: "Preserve manual-approval-handoff-review-only readiness.",
    },
    {
      checklistId: "handoff-evidence-summary-reviewed",
      label: "handoff evidence summary reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Evidence summary, blocker evidence, gate evidence, and recovery evidence.",
      recoveryAction: "Review evidence summaries without persisting them.",
      owner: "operator",
      nextSafeAction: "Keep evidence packet preview-only.",
    },
    {
      checklistId: "end-to-end-packet-review-reviewed",
      label: "end-to-end packet review reviewed",
      state: "manual review required",
      severity: "critical",
      evidenceRequired:
        "Source end-to-end packet review and held packet decision posture.",
      recoveryAction: "Re-review packet blockers without changing execution posture.",
      owner: "operator",
      nextSafeAction: "Keep packet review held / not accepted.",
    },
    {
      checklistId: "acceptance-posture-reviewed",
      label: "acceptance posture reviewed",
      state: "manual review required",
      severity: "critical",
      evidenceRequired:
        "Source acceptance posture and not accepted / preview-only blockers.",
      recoveryAction: "Review acceptance blockers and keep acceptance blocked.",
      owner: "operator",
      nextSafeAction: "Do not accept the handoff.",
    },
    {
      checklistId: "operator-approval-evidence-reviewed",
      label: "operator approval evidence reviewed",
      state: "blocked",
      severity: "critical",
      evidenceRequired:
        "Operator approval evidence is intentionally absent in this preview batch.",
      recoveryAction: "Document the absence and keep approval not requested.",
      owner: "operator",
      nextSafeAction: "Do not request operator approval.",
    },
    {
      checklistId: "manual-confirmation-evidence-reviewed",
      label: "manual confirmation evidence reviewed",
      state: "blocked",
      severity: "critical",
      evidenceRequired:
        "Manual confirmation evidence is intentionally absent in this preview batch.",
      recoveryAction: "Document the absence and keep manual confirmation not captured.",
      owner: "operator",
      nextSafeAction: "Do not capture manual confirmation.",
    },
    {
      checklistId: "approval-decision-reviewed",
      label: "approval decision reviewed",
      state: "backend future required",
      severity: "critical",
      evidenceRequired:
        "Future decision contract definitions for held / approval not requested state.",
      recoveryAction: "Define the decision contract next without evaluating approval.",
      owner: "backend future",
      nextSafeAction: "Decision contract comes next.",
    },
    {
      checklistId: "approval-token-reviewed",
      label: "approval token reviewed",
      state: "backend future required",
      severity: "high",
      evidenceRequired:
        "Future backend-only approval token contract definitions.",
      recoveryAction: "Keep approval token state not issued in this batch.",
      owner: "backend future",
      nextSafeAction: "Do not issue approval tokens.",
    },
    {
      checklistId: "approval-lease-reviewed",
      label: "approval lease reviewed",
      state: "backend future required",
      severity: "high",
      evidenceRequired:
        "Future backend-only approval lease contract definitions.",
      recoveryAction: "Keep approval lease state not created in this batch.",
      owner: "backend future",
      nextSafeAction: "Do not create approval leases.",
    },
    {
      checklistId: "approval-reference-reviewed",
      label: "approval reference reviewed",
      state: "blocked",
      severity: "high",
      evidenceRequired:
        "Approval reference state remains intentionally not persisted.",
      recoveryAction: "Keep approval reference state not persisted.",
      owner: "operator",
      nextSafeAction: "Do not persist approval references.",
    },
    {
      checklistId: "audit-reference-reviewed",
      label: "audit reference reviewed",
      state: "blocked",
      severity: "high",
      evidenceRequired:
        "Audit reference state remains intentionally not persisted.",
      recoveryAction: "Keep audit reference state not persisted.",
      owner: "operator",
      nextSafeAction: "Do not persist audit references.",
    },
    {
      checklistId: "result-reference-reviewed",
      label: "result reference reviewed",
      state: "blocked",
      severity: "high",
      evidenceRequired:
        "Result reference state remains intentionally not persisted.",
      recoveryAction: "Keep result reference state not persisted.",
      owner: "operator",
      nextSafeAction: "Do not persist result references.",
    },
    {
      checklistId: "privacy-redaction-reviewed",
      label: "privacy/redaction reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Privacy/redaction requirements, opaque credential posture, and no plaintext secret posture.",
      recoveryAction: "Preserve privacy/redaction blockers and secret-free posture.",
      owner: "safety review",
      nextSafeAction: "Keep privacy blockers explicit.",
    },
    {
      checklistId: "cost-rate-reviewed",
      label: "cost/rate reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Cost acknowledgement and rate limit guard requirements.",
      recoveryAction: "Preserve cost and rate blockers without enabling execution.",
      owner: "operator",
      nextSafeAction: "Keep cost and rate guardrails explicit.",
    },
    {
      checklistId: "timeout-cancel-reviewed",
      label: "timeout/cancel reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Timeout/cancel guard requirement and blocked execution posture.",
      recoveryAction: "Preserve timeout/cancel blockers without enabling execution.",
      owner: "operator",
      nextSafeAction: "Keep timeout/cancel guardrails explicit.",
    },
    {
      checklistId: "idempotency-replay-reviewed",
      label: "idempotency/replay reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Idempotency requirement, replay block requirement, and disabled retry/fallback posture.",
      recoveryAction: "Preserve idempotency and replay blockers.",
      owner: "operator",
      nextSafeAction: "Keep retries and fallbacks disabled.",
    },
    {
      checklistId: "single-run-lock-reviewed",
      label: "single-run lock reviewed",
      state: "backend future required",
      severity: "high",
      evidenceRequired:
        "Future backend-only single-run lock contract definitions.",
      recoveryAction: "Keep single-run lock uncreated in this batch.",
      owner: "backend future",
      nextSafeAction: "Do not create single-run locks.",
    },
    {
      checklistId: "queue-dispatch-still-blocked",
      label: "queue dispatch still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired:
        "Queue dispatch state: not dispatched.",
      recoveryAction: "Preserve queue dispatch blocked posture.",
      owner: "backend future",
      nextSafeAction: "Do not dispatch queues.",
    },
    {
      checklistId: "worker-dispatch-still-blocked",
      label: "worker dispatch still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired:
        "Worker dispatch state: not dispatched.",
      recoveryAction: "Preserve worker dispatch blocked posture.",
      owner: "backend future",
      nextSafeAction: "Do not dispatch workers.",
    },
    {
      checklistId: "job-execution-still-blocked",
      label: "job execution still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired:
        "Job execution state: not executed.",
      recoveryAction: "Preserve job execution blocked posture.",
      owner: "backend future",
      nextSafeAction: "Do not execute jobs.",
    },
    {
      checklistId: "result-persistence-still-blocked",
      label: "result persistence still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired:
        "Result reference state: not persisted. Result capture state: not captured.",
      recoveryAction: "Preserve result persistence blocked posture.",
      owner: "backend future",
      nextSafeAction: "Do not persist results.",
    },
    {
      checklistId: "audit-persistence-still-blocked",
      label: "audit persistence still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired:
        "Audit reference state: not persisted.",
      recoveryAction: "Preserve audit persistence blocked posture.",
      owner: "backend future",
      nextSafeAction: "Do not persist audit records.",
    },
    {
      checklistId: "approval-persistence-still-blocked",
      label: "approval persistence still blocked",
      state: "blocked",
      severity: "critical",
      evidenceRequired:
        "Approval reference state: not persisted.",
      recoveryAction: "Preserve approval persistence blocked posture.",
      owner: "backend future",
      nextSafeAction: "Do not persist approval records.",
    },
    {
      checklistId: "database-writes-still-blocked",
      label: "database writes still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired:
        "Database write state: not implemented.",
      recoveryAction: "Preserve database write blocked posture.",
      owner: "backend future",
      nextSafeAction: "Do not add database writes.",
    },
    {
      checklistId: "file-writes-still-blocked",
      label: "file writes still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired:
        "File write state: not implemented.",
      recoveryAction: "Preserve file write blocked posture.",
      owner: "backend future",
      nextSafeAction: "Do not add file writes.",
    },
  ] as const;

function buildRecoveryReadinessChecklistRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord,
  seed: RecoveryReadinessChecklistSeed
): ManualApprovalHandoffRecoveryReadinessChecklistRecord {
  return {
    key: buildStableManualApprovalHandoffRecoveryReadinessChecklistKey(
      review.id,
      seed.checklistId
    ),
    checklistVersion:
      "backend-owned-synthetic-dry-run-manual-approval-handoff-recovery-readiness-checklist-v1",
    handoffReviewId: review.id,
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    manualApprovalDecisionContractDependency:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

const RECOVERY_READINESS_CHECKLIST_RECORDS = REVIEW_RECORDS.flatMap((review) =>
  RECOVERY_READINESS_CHECKLIST_SEEDS.map((seed) =>
    buildRecoveryReadinessChecklistRecord(review, seed)
  )
);

function buildReviewAuditSummaryRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord
): ManualApprovalHandoffReviewAuditSummaryRecord {
  const evidenceSummary = resolveRequiredRecord(
    EVIDENCE_SUMMARIES_BY_ID.get(review.id),
    `Missing evidence summary for review audit summary ${review.id}.`
  );
  const gateFailures = GATE_FAILURE_REVIEW_RECORDS.filter(
    (record) => record.handoffReviewId === review.id
  );
  const recoveryPlan = resolveRequiredRecord(
    RECOVERY_PLAN_PREVIEW_RECORDS.find((record) => record.handoffReviewId === review.id),
    `Missing recovery plan for review audit summary ${review.id}.`
  );

  return {
    id: review.id,
    key: buildStableManualApprovalHandoffReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-synthetic-dry-run-manual-approval-handoff-review-audit-summary-preview-v1",
    previewOnlyStatement:
      "manual approval handoff review audit summary is preview-only",
    handoffReviewId: review.id,
    auditPosture: "preview-only",
    approvalReferenceState: review.approvalReferenceState,
    auditReferenceState: review.auditReferenceState,
    resultReferenceState: review.resultReferenceState,
    evidencePacketState: review.evidencePacketState,
    handoffEvidenceSummary:
      `${evidenceSummary.safetyEvidence} ${evidenceSummary.privacyEvidence}`,
    failedGateSummary: buildUniqueManualApprovalHandoffReviewDisplayStrings(
      gateFailures.map((record) => record.failedGateLabel)
    ).join(" | "),
    recoverySummary:
      `${recoveryPlan.recoveryPosture}. retry disabled. fallback disabled. ${recoveryPlan.operatorActionRequired}`,
    blockedActionSummary:
      "No prompt sending. No model calls yet. No provider SDKs imported. queue dispatch is blocked. worker dispatch is blocked. job execution is blocked.",
    noApprovalRequestStatement: "No approval request.",
    noApprovalPersistenceStatement: "No approval persistence.",
    noAuditPersistenceStatement: "No audit persistence.",
    noResultPersistenceStatement: "No result persistence.",
    noDatabaseWriteStatement: "No database write.",
    noFileWriteStatement: "No file write.",
    manualApprovalDecisionContractRequirement:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
  };
}

const REVIEW_AUDIT_SUMMARY_RECORDS = REVIEW_RECORDS.map(
  buildReviewAuditSummaryRecord
);

function buildAcceptancePostureRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord
): ManualApprovalHandoffAcceptancePostureRecord {
  return {
    id: review.id,
    key: buildStableManualApprovalHandoffAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-synthetic-dry-run-manual-approval-handoff-acceptance-posture-preview-v1",
    previewOnlyStatement:
      "manual approval handoff acceptance posture is preview-only",
    handoffReviewId: review.id,
    acceptanceState: "not accepted / preview-only",
    approvalBlockers: [
      "operator approval state: not requested",
      "approval decision state: not evaluated",
      "approval token is not issued",
      "approval lease is not created",
    ],
    manualConfirmationBlockers: [
      "manual confirmation state: not captured",
      "manual operator review required",
    ],
    evidencePacketBlockers: [
      "evidence packet state: preview-only",
      "handoff evidence digest is deterministic preview only",
    ],
    endToEndPacketBlockers: [
      "end-to-end packet state: draft / preview-only",
      "packet decision state: held / not accepted",
    ],
    safetyBlockers: [
      "kill switch required",
      "manual approval required",
      "audit required",
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
      "idempotency required",
      "replay block required",
      "single-run lock required",
    ],
    auditBlockers: [
      "audit reference state: not persisted",
      "audit join state: not persisted",
    ],
    resultBlockers: [
      "result capture state: not captured",
      "result reference state: not persisted",
    ],
    persistenceBlockers: [
      "approval reference state: not persisted",
      "audit reference state: not persisted",
      "result reference state: not persisted",
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
      "source end-to-end packet review",
      "source packet acceptance posture",
      "source handoff evidence summary",
      "manual approval scope review",
      "manual approval gate review",
      "manual approval decision contract definitions",
    ],
    nextSafeAction: buildReviewNextSafeAction(review.requestLabel),
    explicitNoApprovalAcceptanceNoExecutionStatement:
      "No approval acceptance. No execution.",
  };
}

const ACCEPTANCE_POSTURE_RECORDS = REVIEW_RECORDS.map(
  buildAcceptancePostureRecord
);

export function listBackendOwnedSyntheticDryRunManualApprovalHandoffReviews():
  readonly BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord[] {
  return cloneList(REVIEW_RECORDS);
}

export function listManualApprovalHandoffDecisionReviewRecords():
  readonly ManualApprovalHandoffDecisionReviewRecord[] {
  return cloneList(DECISION_REVIEW_RECORDS);
}

export function listManualApprovalHandoffGateFailureReviewRecords():
  readonly ManualApprovalHandoffGateFailureReviewRecord[] {
  return cloneList(GATE_FAILURE_REVIEW_RECORDS);
}

export function listManualApprovalHandoffRecoveryPlanPreviews():
  readonly ManualApprovalHandoffRecoveryPlanPreviewRecord[] {
  return cloneList(RECOVERY_PLAN_PREVIEW_RECORDS);
}

export function listManualApprovalHandoffRecoveryReadinessChecklistRecords():
  readonly ManualApprovalHandoffRecoveryReadinessChecklistRecord[] {
  return cloneList(RECOVERY_READINESS_CHECKLIST_RECORDS);
}

export function listManualApprovalHandoffReviewAuditSummaries():
  readonly ManualApprovalHandoffReviewAuditSummaryRecord[] {
  return cloneList(REVIEW_AUDIT_SUMMARY_RECORDS);
}

export function listManualApprovalHandoffAcceptancePostureRecords():
  readonly ManualApprovalHandoffAcceptancePostureRecord[] {
  return cloneList(ACCEPTANCE_POSTURE_RECORDS);
}

export function groupManualApprovalHandoffReviewsByCapabilityFamily():
  readonly ManualApprovalHandoffReviewCapabilityFamilyGroup[] {
  const groups = new Map<
    BackendOwnedSyntheticDryRunManualApprovalHandoffContractRecord["selectedCapabilityFamily"]["id"],
    BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord[]
  >();

  REVIEW_RECORDS.forEach((record) => {
    const existing = groups.get(record.selectedCapabilityFamily.id);

    if (existing) {
      existing.push(record);
      return;
    }

    groups.set(record.selectedCapabilityFamily.id, [record]);
  });

  return Array.from(groups.entries()).map(([capabilityFamilyId, reviews]) => ({
    capabilityFamilyId,
    capabilityFamilyLabel: reviews[0].selectedCapabilityFamily.label,
    reviewCount: reviews.length,
    reviews: cloneList(reviews),
  }));
}

export function groupManualApprovalHandoffReviewsByWorkspaceTarget():
  readonly ManualApprovalHandoffReviewWorkspaceGroup[] {
  const groups = new Map<
    AiModelProviderWorkspaceTarget,
    BackendOwnedSyntheticDryRunManualApprovalHandoffReviewRecord[]
  >();

  REVIEW_RECORDS.forEach((record) => {
    const existing = groups.get(record.workspaceTarget);

    if (existing) {
      existing.push(record);
      return;
    }

    groups.set(record.workspaceTarget, [record]);
  });

  return Array.from(groups.entries()).map(([workspaceTarget, reviews]) => ({
    workspaceTarget,
    reviewCount: reviews.length,
    reviews: cloneList(reviews),
  }));
}

export function buildManualApprovalHandoffReviewSummary():
  ManualApprovalHandoffReviewSummary {
  const capabilityGroups = groupManualApprovalHandoffReviewsByCapabilityFamily();
  const workspaceGroups = groupManualApprovalHandoffReviewsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    reviewCount: REVIEW_RECORDS.length,
    decisionReviewCount: DECISION_REVIEW_RECORDS.length,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    auditSummaryCount: REVIEW_AUDIT_SUMMARY_RECORDS.length,
    acceptancePostureCount: ACCEPTANCE_POSTURE_RECORDS.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    handoffState: REVIEW_RECORDS[0]?.handoffState ?? "draft / preview-only",
    currentReadiness: CURRENT_REVIEW_READINESS,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildManualApprovalHandoffGateFailureSummary():
  ManualApprovalHandoffGateFailureSummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    topFailedGateLabels: buildUniqueManualApprovalHandoffReviewDisplayStrings(
      GATE_FAILURE_REVIEW_RECORDS.map((record) => record.failedGateLabel)
    ),
    nextSafeAction:
      "manual approval decision contract comes next. Keep every gate blocked and preview-only.",
  };
}

export function buildManualApprovalHandoffRecoverySummary():
  ManualApprovalHandoffRecoverySummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_HANDOFF_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    currentReadiness: CURRENT_REVIEW_READINESS,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextSafeAction:
      "manual approval decision contract comes next. Keep recovery review manual-only and non-executable.",
  };
}

export function buildManualApprovalDecisionContractChecklist():
  ManualApprovalHandoffDecisionContractChecklist {
  return cloneList(MANUAL_APPROVAL_DECISION_CONTRACT_CHECKLIST);
}

export function buildUniqueManualApprovalHandoffReviewDisplayStrings<
  T extends string,
>(values: readonly T[]): readonly T[] {
  return Array.from(new Set(values));
}
