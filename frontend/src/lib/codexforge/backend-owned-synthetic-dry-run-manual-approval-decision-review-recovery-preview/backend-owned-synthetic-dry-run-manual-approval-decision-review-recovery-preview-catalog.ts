import type { AiModelProviderWorkspaceTarget } from "../ai-provider-registry";
import {
  listManualApprovalHandoffEvidenceSummaries,
  type ManualApprovalHandoffEvidenceSummaryRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-handoff-contract";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionContracts,
  listApprovalOutcomePreviewRecords,
  listManualApprovalDecisionErrorContracts,
  listManualApprovalDecisionEvidenceSummaries,
  listManualApprovalDecisionGateRecords,
  listManualApprovalDecisionPackets,
  listManualApprovalDecisionReadinessMatrixRecords,
  listManualApprovalDecisionRequestContracts,
  listManualApprovalDecisionResponseContracts,
  type ApprovalOutcomePreviewId,
  type ApprovalOutcomePreviewLabel,
  type ApprovalOutcomePreviewRecord,
  type BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord,
  type ManualApprovalDecisionContractId,
  type ManualApprovalDecisionErrorContractRecord,
  type ManualApprovalDecisionGateId,
  type ManualApprovalDecisionGateLabel,
  type ManualApprovalDecisionGateRecord,
  type ManualApprovalDecisionPacketRecord,
  type ManualApprovalDecisionReadinessMatrixRecord,
  type ManualApprovalDecisionRequestContractRecord,
  type ManualApprovalDecisionResponseContractRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-contract";
import {
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_PHASE,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
  type BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
  type ManualApprovalDecisionAcceptancePostureKey,
  type ManualApprovalDecisionAcceptancePostureRecord,
  type ManualApprovalDecisionGateFailureReviewKey,
  type ManualApprovalDecisionGateFailureReviewRecord,
  type ManualApprovalDecisionGateFailureState,
  type ManualApprovalDecisionGateFailureSummary,
  type ManualApprovalDecisionOutcomeReviewKey,
  type ManualApprovalDecisionOutcomeReviewRecord,
  type ManualApprovalDecisionOutcomeReviewVersion,
  type ManualApprovalDecisionOutcomeSummary,
  type ManualApprovalDecisionRecoveryPlanKey,
  type ManualApprovalDecisionRecoveryPlanPreviewRecord,
  type ManualApprovalDecisionRecoveryReadinessChecklistId,
  type ManualApprovalDecisionRecoveryReadinessChecklistKey,
  type ManualApprovalDecisionRecoveryReadinessChecklistLabel,
  type ManualApprovalDecisionRecoveryReadinessChecklistRecord,
  type ManualApprovalDecisionRecoverySummary,
  type ManualApprovalDecisionReviewAuditSummaryKey,
  type ManualApprovalDecisionReviewAuditSummaryRecord,
  type ManualApprovalDecisionReviewCapabilityFamilyGroup,
  type ManualApprovalDecisionReviewCurrentReadiness,
  type ManualApprovalDecisionReviewId,
  type ManualApprovalDecisionReviewKey,
  type ManualApprovalDecisionReviewSectionTitle,
  type ManualApprovalDecisionReviewSeverity,
  type ManualApprovalDecisionReviewSummary,
  type ManualApprovalDecisionReviewWorkspaceGroup,
} from "./backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview-types";

type GateFailureSeed = Readonly<{
  state: ManualApprovalDecisionGateFailureState;
  severity: ManualApprovalDecisionReviewSeverity;
  operatorFacingExplanation: string;
  requiredRecoveryAction: string;
  nextSafeAction: string;
}>;

type RecoveryReadinessChecklistSeed = Readonly<{
  checklistId: ManualApprovalDecisionRecoveryReadinessChecklistId;
  label: ManualApprovalDecisionRecoveryReadinessChecklistLabel;
  state: ManualApprovalDecisionRecoveryReadinessChecklistRecord["state"];
  severity: ManualApprovalDecisionReviewSeverity;
  evidenceRequired: string;
  recoveryAction: string;
  owner: ManualApprovalDecisionRecoveryReadinessChecklistRecord["owner"];
  nextSafeAction: string;
}>;

const REVIEW_SUMMARY_LINES = [
  "backend-owned synthetic dry-run manual approval decision review and recovery preview only",
  "manual approval decision review is preview-only",
  "manual approval decision outcome review is preview-only",
  "manual approval decision gate failure review is preview-only",
  "manual approval decision recovery plan is preview-only",
  "manual approval decision recovery readiness is preview-only",
  "manual approval decision acceptance posture is preview-only",
  "decision state is draft / preview-only / not evaluated",
  "decision request is not created",
  "decision invocation is not invoked",
  "decision response is not received",
  "decision error is not received",
  "selected decision state is not selected",
  "approval outcome state is not decided",
  "operator approval state is not requested",
  "manual confirmation state is not captured",
  "approval token is not issued",
  "approval lease is not created",
  "approval reference is not persisted",
  "audit reference is not persisted",
  "result reference is not persisted",
  "evidence packet state is preview-only",
  "current readiness is manual-approval-decision-review-only / not decided / not executable / not persistent",
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
  "backend-owned minimal manual-gated synthetic dry-run execution MVP next",
] as const;

const OUTCOME_SUMMARY_LINES = [
  "approve synthetic packet preview",
  "deny synthetic packet preview",
  "defer synthetic packet preview",
  "request more evidence preview",
  "escalate safety review preview",
  "keep locked preview",
  "outcome state is preview-only / not selected",
  "operator approval state is not requested",
  "manual confirmation state is not captured",
  "approval token posture is not issued",
  "approval lease posture is not created",
  "persistence posture is not implemented",
  "No outcome selection. No approval.",
  "backend-owned minimal manual-gated synthetic dry-run execution MVP next",
] as const;

export const MANUAL_APPROVAL_DECISION_REVIEW_SECTION_TITLES: readonly ManualApprovalDecisionReviewSectionTitle[] =
  [
    "Backend-owned synthetic dry-run manual approval decision review",
    "Manual approval decision outcome review",
    "Manual approval decision gate failure review",
    "Manual approval decision recovery plan",
    "Manual approval decision recovery readiness",
    "Manual approval decision review audit summary",
    "Manual approval decision acceptance posture",
  ] as const;

const GATE_FAILURE_SUMMARY_LINES = [
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
  "No gate pass is granted.",
  "backend-owned minimal manual-gated synthetic dry-run execution MVP next",
] as const;

const RECOVERY_SUMMARY_LINES = [
  "manual approval decision recovery plan is preview-only",
  "manual approval decision recovery readiness is preview-only",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "selected decision not selected recovery",
  "approval outcome not decided recovery",
  "operator approval not requested recovery",
  "manual confirmation not captured recovery",
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
  "backend-owned minimal manual-gated synthetic dry-run execution MVP next",
] as const;

const MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_CHECKLIST = [
  "Convert preview-only decision reviews into a backend-owned minimal manual-gated synthetic dry-run execution MVP without exposing any frontend execution path.",
  "Keep manual approval request, manual confirmation capture, approval decision evaluation, token/lease issuance, and execution adapters server-only and kill-switch protected.",
  "Preserve no prompt sending, no model calls, no provider SDK imports, no provider execution, no queue dispatch, no worker dispatch, no job execution, and no persistence until backend gates are implemented.",
  "Introduce the smallest backend-owned manual-gated synthetic dry-run execution path only after operator review, safety review, privacy/redaction review, cost/rate/timeout review, idempotency/replay protection, and single-run lock coverage exist.",
  "Keep Athena product-first and preview-first while the MVP adds backend-only execution readiness without enabling frontend approval, persistence, or autonomous behavior.",
] as const;

const CURRENT_REVIEW_READINESS: ManualApprovalDecisionReviewCurrentReadiness =
  "manual-approval-decision-review-only / not decided / not executable / not persistent";

const DEFAULT_OUTCOME_ID: ApprovalOutcomePreviewId = "keep-locked-preview";
const DEFAULT_GATE_ID: ManualApprovalDecisionGateId = "handoff-review-gate";

function cloneList<T>(records: readonly T[]): readonly T[] {
  return [...records];
}

function cloneCapabilityFamily(
  family: BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["selectedCapabilityFamily"]
): BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord["selectedCapabilityFamily"] {
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
  resolveId: (record: T) => ManualApprovalDecisionReviewId
): ReadonlyMap<ManualApprovalDecisionReviewId, readonly T[]> {
  const grouped = new Map<ManualApprovalDecisionReviewId, T[]>();

  records.forEach((record) => {
    const id = resolveId(record);
    const existing = grouped.get(id);

    if (existing) {
      existing.push(record);
      return;
    }

    grouped.set(id, [record]);
  });

  return new Map(
    Array.from(grouped.entries(), ([id, items]) => [id, cloneList(items)])
  );
}

function groupReviewRecordsByCapabilityFamily(
  records: readonly BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord[]
): readonly ManualApprovalDecisionReviewCapabilityFamilyGroup[] {
  const grouped = new Map<
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord["selectedCapabilityFamily"]["id"],
    ManualApprovalDecisionReviewCapabilityFamilyGroup
  >();

  records.forEach((record) => {
    const capabilityFamilyId = record.selectedCapabilityFamily.id;
    const existing = grouped.get(capabilityFamilyId);

    if (existing) {
      grouped.set(capabilityFamilyId, {
        ...existing,
        reviewCount: existing.reviewCount + 1,
        reviews: [...existing.reviews, record],
      });
      return;
    }

    grouped.set(capabilityFamilyId, {
      capabilityFamilyId,
      capabilityFamilyLabel: record.selectedCapabilityFamily.label,
      reviewCount: 1,
      reviews: [record],
    });
  });

  return Array.from(grouped.values());
}

function groupReviewRecordsByWorkspaceTarget(
  records: readonly BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord[]
): readonly ManualApprovalDecisionReviewWorkspaceGroup[] {
  const grouped = new Map<
    AiModelProviderWorkspaceTarget,
    ManualApprovalDecisionReviewWorkspaceGroup
  >();

  records.forEach((record) => {
    const existing = grouped.get(record.workspaceTarget);

    if (existing) {
      grouped.set(record.workspaceTarget, {
        ...existing,
        reviewCount: existing.reviewCount + 1,
        reviews: [...existing.reviews, record],
      });
      return;
    }

    grouped.set(record.workspaceTarget, {
      workspaceTarget: record.workspaceTarget,
      reviewCount: 1,
      reviews: [record],
    });
  });

  return Array.from(grouped.values());
}

export function buildStableManualApprovalDecisionReviewKey(
  id: ManualApprovalDecisionReviewId
): ManualApprovalDecisionReviewKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-review:${id}`;
}

export function buildStableManualApprovalDecisionOutcomeReviewKey(
  id: ManualApprovalDecisionReviewId,
  outcomeId: ApprovalOutcomePreviewId
): ManualApprovalDecisionOutcomeReviewKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-outcome-review:${id}:${outcomeId}`;
}

export function buildStableManualApprovalDecisionGateFailureReviewKey(
  id: ManualApprovalDecisionReviewId,
  gateId: ManualApprovalDecisionGateId
): ManualApprovalDecisionGateFailureReviewKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-gate-failure-review:${id}:${gateId}`;
}

export function buildStableManualApprovalDecisionRecoveryPlanKey(
  id: ManualApprovalDecisionReviewId
): ManualApprovalDecisionRecoveryPlanKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-recovery-plan:${id}`;
}

export function buildStableManualApprovalDecisionRecoveryReadinessChecklistKey(
  id: ManualApprovalDecisionReviewId,
  checklistId: ManualApprovalDecisionRecoveryReadinessChecklistId
): ManualApprovalDecisionRecoveryReadinessChecklistKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-recovery-readiness:${id}:${checklistId}`;
}

export function buildStableManualApprovalDecisionReviewAuditSummaryKey(
  id: ManualApprovalDecisionReviewId
): ManualApprovalDecisionReviewAuditSummaryKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-review-audit-summary:${id}`;
}

export function buildStableManualApprovalDecisionAcceptancePostureKey(
  id: ManualApprovalDecisionReviewId
): ManualApprovalDecisionAcceptancePostureKey {
  return `backend-owned-synthetic-dry-run-manual-approval-decision-acceptance-posture:${id}`;
}

export function buildUniqueManualApprovalDecisionReviewDisplayStrings(
  values: readonly string[]
): readonly string[] {
  return Array.from(new Set(values));
}

const MANUAL_APPROVAL_DECISION_CONTRACTS =
  listBackendOwnedSyntheticDryRunManualApprovalDecisionContracts();
const MANUAL_APPROVAL_DECISION_PACKETS = listManualApprovalDecisionPackets();
const MANUAL_APPROVAL_DECISION_REQUEST_CONTRACTS =
  listManualApprovalDecisionRequestContracts();
const MANUAL_APPROVAL_DECISION_RESPONSE_CONTRACTS =
  listManualApprovalDecisionResponseContracts();
const MANUAL_APPROVAL_DECISION_ERROR_CONTRACTS =
  listManualApprovalDecisionErrorContracts();
const APPROVAL_OUTCOME_PREVIEW_RECORDS = listApprovalOutcomePreviewRecords();
const MANUAL_APPROVAL_DECISION_GATE_RECORDS =
  listManualApprovalDecisionGateRecords();
const MANUAL_APPROVAL_DECISION_READINESS_RECORDS =
  listManualApprovalDecisionReadinessMatrixRecords();
const MANUAL_APPROVAL_DECISION_EVIDENCE_SUMMARIES =
  listManualApprovalDecisionEvidenceSummaries();
const MANUAL_APPROVAL_HANDOFF_EVIDENCE_SUMMARIES =
  listManualApprovalHandoffEvidenceSummaries();

const PACKETS_BY_ID = new Map(
  MANUAL_APPROVAL_DECISION_PACKETS.map((record) => [record.id, record] as const)
);
const REQUEST_CONTRACTS_BY_ID = new Map(
  MANUAL_APPROVAL_DECISION_REQUEST_CONTRACTS.map(
    (record) => [record.id, record] as const
  )
);
const RESPONSE_CONTRACTS_BY_ID = new Map(
  MANUAL_APPROVAL_DECISION_RESPONSE_CONTRACTS.map(
    (record) => [record.id, record] as const
  )
);
const ERROR_CONTRACTS_BY_ID = new Map(
  MANUAL_APPROVAL_DECISION_ERROR_CONTRACTS.map(
    (record) => [record.id, record] as const
  )
);
const READINESS_BY_ID = new Map(
  MANUAL_APPROVAL_DECISION_READINESS_RECORDS.map(
    (record) => [record.id, record] as const
  )
);
const EVIDENCE_BY_ID = new Map(
  MANUAL_APPROVAL_DECISION_EVIDENCE_SUMMARIES.map(
    (record) => [record.id, record] as const
  )
);
const HANDOFF_EVIDENCE_BY_ID = new Map(
  MANUAL_APPROVAL_HANDOFF_EVIDENCE_SUMMARIES.map(
    (record) => [record.id, record] as const
  )
);
const OUTCOMES_BY_REVIEW_ID = groupRecordsById(
  APPROVAL_OUTCOME_PREVIEW_RECORDS,
  (record) => record.decisionContractId
);
const GATES_BY_REVIEW_ID = groupRecordsById(
  MANUAL_APPROVAL_DECISION_GATE_RECORDS,
  (record) => record.decisionContractId
);

function selectRepresentativeOutcome(
  reviewId: ManualApprovalDecisionReviewId
): ApprovalOutcomePreviewRecord {
  const outcomes = resolveRequiredRecord(
    OUTCOMES_BY_REVIEW_ID.get(reviewId),
    `Missing outcome previews for review ${reviewId}.`
  );

  return resolveRequiredRecord(
    outcomes.find((record) => record.outcomeId === DEFAULT_OUTCOME_ID) ??
      outcomes[0],
    `Missing representative outcome preview for review ${reviewId}.`
  );
}

function selectRepresentativeGate(
  reviewId: ManualApprovalDecisionReviewId
): ManualApprovalDecisionGateRecord {
  const gates = resolveRequiredRecord(
    GATES_BY_REVIEW_ID.get(reviewId),
    `Missing gate records for review ${reviewId}.`
  );

  return resolveRequiredRecord(
    gates.find((record) => record.id === DEFAULT_GATE_ID) ?? gates[0],
    `Missing representative gate record for review ${reviewId}.`
  );
}

function buildReviewRecord(
  contract: BackendOwnedSyntheticDryRunManualApprovalDecisionContractRecord,
  packet: ManualApprovalDecisionPacketRecord,
  requestContract: ManualApprovalDecisionRequestContractRecord,
  responseContract: ManualApprovalDecisionResponseContractRecord,
  errorContract: ManualApprovalDecisionErrorContractRecord,
  readiness: ManualApprovalDecisionReadinessMatrixRecord,
  handoffEvidenceSummary: ManualApprovalHandoffEvidenceSummaryRecord
): BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord {
  const representativeOutcome = selectRepresentativeOutcome(contract.id);
  const representativeGate = selectRepresentativeGate(contract.id);

  return {
    id: contract.id,
    key: buildStableManualApprovalDecisionReviewKey(contract.id),
    reviewVersion:
      "backend-owned-synthetic-dry-run-manual-approval-decision-review-preview-v1",
    previewOnlyStatement: "manual approval decision review is preview-only",
    source: contract.source,
    reviewMode: "preview-only",
    reviewPosture:
      "manual approval decision review / not evaluated / not persistent",
    requestLabel: contract.requestLabel,
    label: contract.label,
    workspaceTarget: contract.workspaceTarget,
    sourceManualApprovalDecisionContractReference: contract.key,
    sourceManualApprovalDecisionPacketReference: packet.key,
    sourceManualApprovalDecisionRequestReference: requestContract.key,
    sourceManualApprovalDecisionResponseReference: responseContract.key,
    sourceManualApprovalDecisionErrorReference: errorContract.key,
    sourceApprovalOutcomePreviewReference: representativeOutcome.key,
    sourceManualApprovalDecisionGateReference: representativeGate.key,
    sourceManualApprovalDecisionReadinessReference: readiness.key,
    sourceManualApprovalDecisionEvidenceSummaryReference:
      resolveRequiredRecord(
        EVIDENCE_BY_ID.get(contract.id),
        `Missing decision evidence summary for review ${contract.id}.`
      ).key,
    sourceManualApprovalHandoffReviewReference:
      contract.sourceManualApprovalHandoffReviewReference,
    sourceManualApprovalHandoffAcceptancePostureReference:
      contract.sourceManualApprovalHandoffAcceptancePostureReference,
    sourceManualApprovalHandoffEvidenceSummaryReference:
      handoffEvidenceSummary.key,
    sourceEndToEndPacketReviewReference:
      contract.sourceEndToEndPacketReviewReference,
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
    decisionState: contract.decisionState,
    decisionRequestState: contract.decisionRequestState,
    decisionInvocationState: contract.decisionInvocationState,
    decisionResponseState: contract.decisionResponseState,
    decisionErrorState: contract.decisionErrorState,
    selectedDecisionState: responseContract.selectedDecisionState,
    approvalOutcomeState: contract.approvalOutcomeState,
    operatorApprovalState: contract.operatorApprovalState,
    manualConfirmationState: contract.manualConfirmationState,
    approvalTokenState: contract.approvalTokenState,
    approvalLeaseState: contract.approvalLeaseState,
    approvalReferenceState: contract.approvalReferenceState,
    auditReferenceState: contract.auditReferenceState,
    resultReferenceState: contract.resultReferenceState,
    evidencePacketState: contract.evidencePacketState,
    handoffState: contract.handoffState,
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
    nextMinimalManualGatedSyntheticDryRunExecutionMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
    currentReadiness: CURRENT_REVIEW_READINESS,
  };
}

const REVIEW_RECORDS: readonly BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord[] =
  MANUAL_APPROVAL_DECISION_CONTRACTS.map((contract) =>
    buildReviewRecord(
      contract,
      resolveRequiredRecord(
        PACKETS_BY_ID.get(contract.id),
        `Missing decision packet for review ${contract.id}.`
      ),
      resolveRequiredRecord(
        REQUEST_CONTRACTS_BY_ID.get(contract.id),
        `Missing decision request contract for review ${contract.id}.`
      ),
      resolveRequiredRecord(
        RESPONSE_CONTRACTS_BY_ID.get(contract.id),
        `Missing decision response contract for review ${contract.id}.`
      ),
      resolveRequiredRecord(
        ERROR_CONTRACTS_BY_ID.get(contract.id),
        `Missing decision error contract for review ${contract.id}.`
      ),
      resolveRequiredRecord(
        READINESS_BY_ID.get(contract.id),
        `Missing decision readiness for review ${contract.id}.`
      ),
      resolveRequiredRecord(
        HANDOFF_EVIDENCE_BY_ID.get(contract.id),
        `Missing handoff evidence summary for review ${contract.id}.`
      )
    )
  );

function buildOutcomeReviewRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
  outcome: ApprovalOutcomePreviewRecord
): ManualApprovalDecisionOutcomeReviewRecord {
  return {
    key: buildStableManualApprovalDecisionOutcomeReviewKey(
      review.id,
      outcome.outcomeId
    ),
    outcomeReviewVersion:
      "backend-owned-synthetic-dry-run-manual-approval-decision-outcome-review-preview-v1",
    previewOnlyStatement:
      "manual approval decision outcome review is preview-only",
    decisionReviewId: review.id,
    sourceDecisionContractReference:
      review.sourceManualApprovalDecisionContractReference,
    sourceApprovalOutcomePreviewReference: outcome.key,
    outcomeLabel: outcome.outcomeLabel,
    outcomeState: outcome.outcomeState,
    operatorFacingExplanation:
      `${outcome.outcomeLabel} stays unselected because operator approval is not requested, manual confirmation is not captured, approval outcome is not decided, and persistence remains blocked.`,
    requiredEvidenceToSelectLater: cloneList(outcome.requiredEvidence),
    blockedActions: cloneList(outcome.blockedActions),
    allowedFutureActionsIfSelectedInFutureBackendPath: cloneList(
      outcome.allowedFutureActionsIfSelectedInFutureBackendPath
    ),
    disallowedActionsEvenIfSelected: cloneList(
      outcome.disallowedActionsEvenIfSelected
    ),
    currentSafetyPosture: outcome.currentSafetyPosture,
    approvalTokenPosture: outcome.approvalTokenPosture,
    approvalLeasePosture: outcome.approvalLeasePosture,
    persistencePosture: outcome.persistencePosture,
    nextSafeAction:
      `Keep ${outcome.outcomeLabel} preview-only and not selected until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH} exists backend-side.`,
    explicitNoOutcomeSelectionNoApprovalStatement:
      "No outcome selection. No approval.",
  };
}

const OUTCOME_REVIEW_RECORDS: readonly ManualApprovalDecisionOutcomeReviewRecord[] =
  REVIEW_RECORDS.flatMap((review) =>
    resolveRequiredRecord(
      OUTCOMES_BY_REVIEW_ID.get(review.id),
      `Missing outcome previews for review ${review.id}.`
    ).map((outcome) => buildOutcomeReviewRecord(review, outcome))
  );

const GATE_FAILURE_SEEDS = new Map<
  ManualApprovalDecisionGateId,
  GateFailureSeed
>([
  [
    "handoff-review-gate",
    {
      state: "held / handoff review preview-only",
      severity: "critical",
      operatorFacingExplanation:
        "The handoff review remains linked as preview-only evidence, so the decision layer cannot advance into any approved or executable state.",
      requiredRecoveryAction:
        "Re-review the handoff record and keep it linked without promoting it into approval execution.",
      nextSafeAction:
        "Keep the handoff review visible and preview-only.",
    },
  ],
  [
    "decision-packet-gate",
    {
      state: "held / decision packet preview-only",
      severity: "high",
      operatorFacingExplanation:
        "The decision packet exists only as a preview-only packet and cannot become a live request or selected decision path.",
      requiredRecoveryAction:
        "Re-review packet scope, blockers, and selected-decision posture without creating a request.",
      nextSafeAction:
        "Keep the decision packet preview-only and not selected.",
    },
  ],
  [
    "operator-approval-gate",
    {
      state: "held / operator approval not requested",
      severity: "critical",
      operatorFacingExplanation:
        "Operator approval has not been requested and must remain absent in this review-only batch.",
      requiredRecoveryAction:
        "Document the blocked approval posture and defer any approval request to a future backend-only MVP.",
      nextSafeAction: "Do not request operator approval.",
    },
  ],
  [
    "manual-confirmation-gate",
    {
      state: "held / manual confirmation not captured",
      severity: "critical",
      operatorFacingExplanation:
        "Manual confirmation is intentionally uncaptured, so the decision layer cannot progress beyond review-only posture.",
      requiredRecoveryAction:
        "Document missing manual confirmation evidence and preserve the uncaptured state.",
      nextSafeAction: "Do not capture manual confirmation.",
    },
  ],
  [
    "approval-scope-gate",
    {
      state: "held / approval scope preview-only",
      severity: "high",
      operatorFacingExplanation:
        "Approval scope remains preview-only and cannot authorize any live or persistent action.",
      requiredRecoveryAction:
        "Re-review scope boundaries, disallowed actions, and server-only requirements.",
      nextSafeAction: "Keep approval scope preview-only.",
    },
  ],
  [
    "approval-expiry-gate",
    {
      state: "held / approval expiry not created",
      severity: "medium",
      operatorFacingExplanation:
        "Approval expiry does not exist because no approval has been issued or persisted.",
      requiredRecoveryAction:
        "Define future backend-only expiry handling without creating any expiry record now.",
      nextSafeAction: "Do not create approval expiry state.",
    },
  ],
  [
    "approval-revocation-gate",
    {
      state: "held / approval revocation not evaluated",
      severity: "medium",
      operatorFacingExplanation:
        "Approval revocation remains undefined because there is no issued approval to revoke.",
      requiredRecoveryAction:
        "Define future backend-only revocation posture without introducing revocation logic now.",
      nextSafeAction: "Do not evaluate approval revocation.",
    },
  ],
  [
    "approval-outcome-gate",
    {
      state: "held / approval outcome not decided",
      severity: "critical",
      operatorFacingExplanation:
        "No approval outcome has been selected, so the decision layer remains not decided and non-executable.",
      requiredRecoveryAction:
        "Keep every outcome review preview-only and unselected while evidence remains under manual review.",
      nextSafeAction: "Keep approval outcome state not decided.",
    },
  ],
  [
    "approval-token-gate",
    {
      state: "held / approval token not issued",
      severity: "high",
      operatorFacingExplanation:
        "Approval tokens are intentionally unissued and must remain absent from this preview-only batch.",
      requiredRecoveryAction:
        "Carry token requirements into a future backend-only MVP without issuing any token.",
      nextSafeAction: "Do not issue approval tokens.",
    },
  ],
  [
    "approval-lease-gate",
    {
      state: "held / approval lease not created",
      severity: "high",
      operatorFacingExplanation:
        "Approval leases are intentionally uncreated and cannot exist in the current review-only layer.",
      requiredRecoveryAction:
        "Carry lease requirements into a future backend-only MVP without creating any lease.",
      nextSafeAction: "Do not create approval leases.",
    },
  ],
  [
    "kill-switch-gate",
    {
      state: "held / kill switch review required",
      severity: "critical",
      operatorFacingExplanation:
        "Kill switch review remains mandatory before any backend-owned execution MVP can exist.",
      requiredRecoveryAction:
        "Keep kill switch evidence visible and unresolved until the backend-owned MVP is defined.",
      nextSafeAction: "Keep kill switch review required.",
    },
  ],
  [
    "audit-gate",
    {
      state: "held / audit evidence not persisted",
      severity: "critical",
      operatorFacingExplanation:
        "Audit evidence remains preview-only and non-persistent, so the decision layer cannot claim audit-backed execution readiness.",
      requiredRecoveryAction:
        "Preserve audit requirements, audit summary review, and non-persistent audit posture.",
      nextSafeAction: "Keep audit persistence blocked.",
    },
  ],
  [
    "privacy-redaction-gate",
    {
      state: "held / privacy/redaction review required",
      severity: "critical",
      operatorFacingExplanation:
        "Privacy/redaction requirements remain unresolved, so no decision can advance beyond preview-only posture.",
      requiredRecoveryAction:
        "Preserve privacy, redaction, opaque credential, and secret-free posture evidence.",
      nextSafeAction: "Keep privacy/redaction review required.",
    },
  ],
  [
    "cost-rate-timeout-gate",
    {
      state: "held / cost/rate/timeout review required",
      severity: "high",
      operatorFacingExplanation:
        "Cost, rate, and timeout/cancel guard review remains incomplete, preventing any safe execution readiness claim.",
      requiredRecoveryAction:
        "Preserve cost acknowledgement, rate limit, and timeout/cancel guard requirements without enabling execution.",
      nextSafeAction: "Keep cost/rate/timeout review required.",
    },
  ],
  [
    "idempotency-replay-gate",
    {
      state: "held / idempotency/replay review required",
      severity: "high",
      operatorFacingExplanation:
        "Idempotency and replay safeguards remain unresolved, so the decision layer cannot advance toward execution.",
      requiredRecoveryAction:
        "Preserve deterministic keys, replay blocking, and no-retry/no-fallback posture.",
      nextSafeAction: "Keep idempotency/replay review required.",
    },
  ],
  [
    "single-run-lock-gate",
    {
      state: "held / single-run lock not created",
      severity: "high",
      operatorFacingExplanation:
        "Single-run lock infrastructure does not exist yet, which blocks any move toward execution readiness.",
      requiredRecoveryAction:
        "Carry single-run lock requirements into the backend-only MVP without creating a lock now.",
      nextSafeAction: "Do not create a single-run lock.",
    },
  ],
  [
    "server-only-boundary-gate",
    {
      state: "held / server-only boundary required",
      severity: "critical",
      operatorFacingExplanation:
        "The decision layer must remain server-only in any future execution MVP, so frontend execution remains blocked by design.",
      requiredRecoveryAction:
        "Preserve server-only boundary notes and do not add any frontend execution path.",
      nextSafeAction: "Keep execution backend-only.",
    },
  ],
  [
    "opaque-credential-gate",
    {
      state: "held / opaque credential references only",
      severity: "high",
      operatorFacingExplanation:
        "Only opaque credential references are allowed, so any live credential material remains forbidden.",
      requiredRecoveryAction:
        "Preserve opaque credential references only and keep all secret material backend-side.",
      nextSafeAction: "Keep opaque credential references only.",
    },
  ],
  [
    "no-plaintext-secrets-gate",
    {
      state: "held / plaintext secrets forbidden",
      severity: "high",
      operatorFacingExplanation:
        "Plaintext secrets remain forbidden, so the review layer cannot expose, store, or accept them.",
      requiredRecoveryAction:
        "Preserve the no-plaintext-secret posture across all future backend-only work.",
      nextSafeAction: "Keep plaintext secrets forbidden.",
    },
  ],
  [
    "no-frontend-provider-call-gate",
    {
      state: "held / frontend provider calls blocked",
      severity: "critical",
      operatorFacingExplanation:
        "Frontend provider calls remain blocked, preventing any live provider traffic from Athena or Jarvis surfaces.",
      requiredRecoveryAction:
        "Keep provider-call posture not implemented and preserve frontend execution boundaries.",
      nextSafeAction: "Keep frontend provider calls blocked.",
    },
  ],
  [
    "no-provider-sdk-import-gate",
    {
      state: "held / provider SDK imports blocked",
      severity: "high",
      operatorFacingExplanation:
        "Provider SDK imports remain forbidden in the frontend, preventing accidental provider execution from UI code.",
      requiredRecoveryAction:
        "Preserve no-SDK-import posture and keep all provider adapters server-only in future work.",
      nextSafeAction: "Keep provider SDK imports blocked.",
    },
  ],
  [
    "no-prompt-sending-gate",
    {
      state: "held / prompt sending blocked",
      severity: "high",
      operatorFacingExplanation:
        "Prompt sending is unimplemented, so the review layer cannot create or dispatch any live decision payload.",
      requiredRecoveryAction:
        "Preserve no prompt sending posture and keep chat input inert/local only.",
      nextSafeAction: "Keep prompt sending blocked.",
    },
  ],
  [
    "no-queue-dispatch-gate",
    {
      state: "held / queue dispatch blocked",
      severity: "high",
      operatorFacingExplanation:
        "Queue dispatch remains blocked, so the decision layer cannot hand work to any background execution lane.",
      requiredRecoveryAction:
        "Keep queue dispatch unimplemented until the backend-owned MVP explicitly defines it.",
      nextSafeAction: "Keep queue dispatch blocked.",
    },
  ],
  [
    "no-worker-dispatch-gate",
    {
      state: "held / worker dispatch blocked",
      severity: "high",
      operatorFacingExplanation:
        "Worker dispatch remains blocked, so no execution worker can be launched from this review layer.",
      requiredRecoveryAction:
        "Keep worker dispatch unimplemented until the backend-owned MVP explicitly defines it.",
      nextSafeAction: "Keep worker dispatch blocked.",
    },
  ],
  [
    "no-job-execution-gate",
    {
      state: "held / job execution blocked",
      severity: "high",
      operatorFacingExplanation:
        "Job execution remains blocked, so the decision layer cannot enqueue or execute any synthetic dry-run job.",
      requiredRecoveryAction:
        "Keep job execution unimplemented until the backend-owned MVP explicitly defines it.",
      nextSafeAction: "Keep job execution blocked.",
    },
  ],
  [
    "no-result-persistence-gate",
    {
      state: "held / result persistence blocked",
      severity: "high",
      operatorFacingExplanation:
        "Result persistence is intentionally unimplemented, so no output reference or result record can be stored.",
      requiredRecoveryAction:
        "Preserve non-persistent result posture and keep result references absent.",
      nextSafeAction: "Keep result persistence blocked.",
    },
  ],
  [
    "no-audit-persistence-gate",
    {
      state: "held / audit persistence blocked",
      severity: "high",
      operatorFacingExplanation:
        "Audit persistence is intentionally unimplemented, so no audit record or audit join can be written.",
      requiredRecoveryAction:
        "Preserve non-persistent audit posture and keep audit references absent.",
      nextSafeAction: "Keep audit persistence blocked.",
    },
  ],
  [
    "no-approval-persistence-gate",
    {
      state: "held / approval persistence blocked",
      severity: "high",
      operatorFacingExplanation:
        "Approval persistence is intentionally unimplemented, so no approval reference or join can be stored.",
      requiredRecoveryAction:
        "Preserve non-persistent approval posture and keep approval references absent.",
      nextSafeAction: "Keep approval persistence blocked.",
    },
  ],
  [
    "no-database-write-gate",
    {
      state: "held / database write blocked",
      severity: "high",
      operatorFacingExplanation:
        "Database writes are intentionally unimplemented, so no manual approval decision data can be stored.",
      requiredRecoveryAction:
        "Preserve the no-database-write boundary until the backend-owned MVP explicitly defines a safe write path.",
      nextSafeAction: "Keep database writes blocked.",
    },
  ],
  [
    "no-file-write-gate",
    {
      state: "held / file write blocked",
      severity: "high",
      operatorFacingExplanation:
        "File writes are intentionally unimplemented, so no manual approval decision data can be written to disk.",
      requiredRecoveryAction:
        "Preserve the no-file-write boundary until the backend-owned MVP explicitly defines a safe write path.",
      nextSafeAction: "Keep file writes blocked.",
    },
  ],
]);

function buildGateFailureReviewRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
  gateRecord: ManualApprovalDecisionGateRecord
): ManualApprovalDecisionGateFailureReviewRecord {
  const seed = resolveRequiredRecord(
    GATE_FAILURE_SEEDS.get(gateRecord.id),
    `Missing gate failure seed for gate ${gateRecord.id}.`
  );

  return {
    key: buildStableManualApprovalDecisionGateFailureReviewKey(
      review.id,
      gateRecord.id
    ),
    gateFailureReviewVersion:
      "backend-owned-synthetic-dry-run-manual-approval-decision-gate-failure-review-preview-v1",
    previewOnlyStatement:
      "manual approval decision gate failure review is preview-only",
    decisionReviewId: review.id,
    failedGateId: gateRecord.id,
    failedGateLabel: gateRecord.label,
    gateState: seed.state,
    severity: seed.severity,
    affectedCapabilityFamily: cloneCapabilityFamily(
      review.selectedCapabilityFamily
    ),
    affectedWorkspaceTarget: review.workspaceTarget,
    operatorFacingExplanation: seed.operatorFacingExplanation,
    requiredEvidenceToUnblock: gateRecord.evidenceRequirement,
    requiredRecoveryAction: seed.requiredRecoveryAction,
    minimalSyntheticDryRunExecutionMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
    nextSafeAction: seed.nextSafeAction,
    explicitNoGatePassStatement: "No gate pass is granted.",
  };
}

const GATE_FAILURE_REVIEW_RECORDS: readonly ManualApprovalDecisionGateFailureReviewRecord[] =
  REVIEW_RECORDS.flatMap((review) =>
    resolveRequiredRecord(
      GATES_BY_REVIEW_ID.get(review.id),
      `Missing gate records for review ${review.id}.`
    ).map((gateRecord) => buildGateFailureReviewRecord(review, gateRecord))
  );

function buildRecoveryPlanPreviewRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): ManualApprovalDecisionRecoveryPlanPreviewRecord {
  return {
    id: review.id,
    key: buildStableManualApprovalDecisionRecoveryPlanKey(review.id),
    recoveryPlanVersion:
      "backend-owned-synthetic-dry-run-manual-approval-decision-recovery-plan-preview-v1",
    previewOnlyStatement:
      "manual approval decision recovery plan is preview-only",
    decisionReviewId: review.id,
    recoveryPosture: "manual review only",
    decisionContractRecovery:
      "Re-review the decision contract and keep decision state draft / preview-only / not evaluated.",
    decisionPacketRecovery:
      "Re-review the decision packet summary and keep the packet preview-only and not selected.",
    decisionRequestNotCreatedRecovery:
      "Preserve the request-not-created posture and do not create any decision request.",
    decisionResponseNotReceivedRecovery:
      "Preserve the response-not-received posture and do not receive any decision response.",
    decisionErrorNotReceivedRecovery:
      "Preserve the error-not-received posture and do not synthesize an execution error path.",
    selectedDecisionNotSelectedRecovery:
      "Preserve selected decision state: not selected and keep all outcomes preview-only.",
    approvalOutcomeNotDecidedRecovery:
      "Preserve approval outcome state: not decided and keep all outcome reviews unselected.",
    operatorApprovalNotRequestedRecovery:
      "Preserve operator approval state: not requested and do not request approval.",
    manualConfirmationNotCapturedRecovery:
      "Preserve manual confirmation state: not captured and do not capture confirmation.",
    approvalTokenNotIssuedRecovery:
      "Preserve approval token state: not issued and do not issue any token.",
    approvalLeaseNotCreatedRecovery:
      "Preserve approval lease state: not created and do not create any lease.",
    approvalReferenceNotPersistedRecovery:
      "Preserve approval reference state: not persisted and do not persist approval data.",
    auditReferenceNotPersistedRecovery:
      "Preserve audit reference state: not persisted and do not persist audit data.",
    resultReferenceNotPersistedRecovery:
      "Preserve result reference state: not persisted and do not persist result data.",
    approvalScopeRecovery:
      "Re-review decision scope, blocked actions, and server-only limits without approving scope.",
    approvalExpiryRevocationRecovery:
      "Carry approval expiry and revocation requirements forward without creating live approval state.",
    killSwitchRecovery:
      "Preserve kill switch requirements as mandatory blockers for the backend-only MVP.",
    privacyRedactionRecovery:
      "Preserve privacy/redaction review, opaque credential references only, and no plaintext secrets.",
    costRateTimeoutRecovery:
      "Preserve cost acknowledgement, rate limit guard, timeout/cancel guard, idempotency, replay block, and single-run lock requirements.",
    queueDispatchBlockedRecovery:
      "Preserve queue dispatch blocked posture and do not dispatch any queue work.",
    workerDispatchBlockedRecovery:
      "Preserve worker dispatch blocked posture and do not dispatch any worker work.",
    jobExecutionBlockedRecovery:
      "Preserve job execution blocked posture and do not execute any job.",
    resultPersistenceMissingRecovery:
      "Preserve missing result persistence and do not create result storage or result records.",
    auditPersistenceMissingRecovery:
      "Preserve missing audit persistence and do not create audit storage or audit records.",
    approvalPersistenceMissingRecovery:
      "Preserve missing approval persistence and do not create approval storage or approval records.",
    databaseWriteBlockedRecovery:
      "Preserve database write blocked posture and do not add database writes.",
    fileWriteBlockedRecovery:
      "Preserve file write blocked posture and do not add file writes.",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    operatorActionRequired:
      `The operator must review why ${review.requestLabel} remains not evaluated, not selected, not decided, not executable, and not persistent.`,
    nextSafeBatchRecommendation:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
    explicitNoRetryNoFallbackNoApprovalDecisionNoPersistenceStatement:
      "No retry. No fallback. No approval decision. No persistence.",
  };
}

const RECOVERY_PLAN_PREVIEW_RECORDS: readonly ManualApprovalDecisionRecoveryPlanPreviewRecord[] =
  REVIEW_RECORDS.map(buildRecoveryPlanPreviewRecord);

const RECOVERY_READINESS_CHECKLIST_SEEDS: readonly RecoveryReadinessChecklistSeed[] =
  [
    {
      checklistId: "decision-contract-reviewed",
      label: "decision contract reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Decision contract posture, blocked default reason, and next safe action.",
      recoveryAction:
        "Review the decision contract and keep it preview-only and non-persistent.",
      owner: "operator",
      nextSafeAction: "Keep decision contract review visible.",
    },
    {
      checklistId: "decision-packet-reviewed",
      label: "decision packet reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Decision packet summary, requested decision scope, and blocker summary.",
      recoveryAction:
        "Review the decision packet and keep the selected decision state not selected.",
      owner: "operator",
      nextSafeAction: "Keep the decision packet preview-only.",
    },
    {
      checklistId: "decision-request-contract-reviewed",
      label: "decision request contract reviewed",
      state: "manual review required",
      severity: "medium",
      evidenceRequired:
        "Decision request state, invocation state, and no request created statement.",
      recoveryAction:
        "Review request posture without creating a decision request.",
      owner: "operator",
      nextSafeAction: "Keep decision request creation blocked.",
    },
    {
      checklistId: "decision-response-contract-reviewed",
      label: "decision response contract reviewed",
      state: "manual review required",
      severity: "medium",
      evidenceRequired:
        "Decision response state, selected decision state, and no response/no approval statement.",
      recoveryAction:
        "Review response posture without receiving a response.",
      owner: "operator",
      nextSafeAction: "Keep decision response receipt blocked.",
    },
    {
      checklistId: "decision-error-contract-reviewed",
      label: "decision error contract reviewed",
      state: "manual review required",
      severity: "medium",
      evidenceRequired:
        "Decision error examples, retry posture, fallback posture, and recovery posture.",
      recoveryAction:
        "Review error posture without introducing retries or fallback.",
      owner: "operator",
      nextSafeAction: "Keep retry and fallback disabled.",
    },
    {
      checklistId: "approval-outcome-previews-reviewed",
      label: "approval outcome previews reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Outcome review records, blocked actions, and no-outcome-selection posture.",
      recoveryAction:
        "Review all preview-only outcomes and keep them not selected.",
      owner: "operator",
      nextSafeAction: "Keep approval outcome state not decided.",
    },
    {
      checklistId: "decision-gates-reviewed",
      label: "decision gates reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Decision gate records, evidence requirements, and blocked default reasons.",
      recoveryAction: "Review all decision gates and keep them blocked.",
      owner: "operator",
      nextSafeAction: "Carry gate blockers forward unchanged.",
    },
    {
      checklistId: "decision-readiness-matrix-reviewed",
      label: "decision readiness matrix reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Decision readiness matrix and current readiness string.",
      recoveryAction:
        "Review readiness and keep execution blocked by default.",
      owner: "operator",
      nextSafeAction:
        "Preserve manual-approval-decision-review-only readiness.",
    },
    {
      checklistId: "decision-evidence-summary-reviewed",
      label: "decision evidence summary reviewed",
      state: "manual review required",
      severity: "high",
      evidenceRequired:
        "Decision evidence summary, blocker evidence, gate evidence, and recovery evidence.",
      recoveryAction:
        "Review decision evidence summaries without persisting them.",
      owner: "operator",
      nextSafeAction: "Keep evidence packet preview-only.",
    },
    {
      checklistId: "handoff-review-reviewed",
      label: "handoff review reviewed",
      state: "manual review required",
      severity: "critical",
      evidenceRequired:
        "Source manual approval handoff review and held handoff posture.",
      recoveryAction:
        "Re-review handoff blockers without changing execution posture.",
      owner: "operator",
      nextSafeAction: "Keep handoff review preview-only.",
    },
    {
      checklistId: "handoff-acceptance-posture-reviewed",
      label: "handoff acceptance posture reviewed",
      state: "manual review required",
      severity: "critical",
      evidenceRequired:
        "Source handoff acceptance posture and not accepted / preview-only blockers.",
      recoveryAction:
        "Review handoff acceptance blockers and keep acceptance blocked.",
      owner: "operator",
      nextSafeAction: "Do not accept the decision layer.",
    },
    {
      checklistId: "operator-approval-evidence-reviewed",
      label: "operator approval evidence reviewed",
      state: "blocked",
      severity: "critical",
      evidenceRequired:
        "Operator approval evidence is intentionally absent in this preview batch.",
      recoveryAction:
        "Document the absence and keep operator approval not requested.",
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
      recoveryAction:
        "Document the absence and keep manual confirmation not captured.",
      owner: "operator",
      nextSafeAction: "Do not capture manual confirmation.",
    },
    {
      checklistId: "selected-decision-reviewed",
      label: "selected decision reviewed",
      state: "backend future required",
      severity: "critical",
      evidenceRequired:
        "Future backend-owned decision evaluation and selection mechanics.",
      recoveryAction:
        "Define selected-decision evaluation only in the backend-owned MVP and keep it absent here.",
      owner: "backend future",
      nextSafeAction: "Keep selected decision state not selected.",
    },
    {
      checklistId: "approval-token-reviewed",
      label: "approval token reviewed",
      state: "backend future required",
      severity: "high",
      evidenceRequired:
        "Future backend-only approval token contract definitions.",
      recoveryAction:
        "Keep approval token state not issued in this batch.",
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
      recoveryAction:
        "Keep approval lease state not created in this batch.",
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
      recoveryAction:
        "Keep approval reference state not persisted.",
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
      recoveryAction:
        "Keep result reference state not persisted.",
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
      recoveryAction:
        "Preserve privacy/redaction blockers and secret-free posture.",
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
      recoveryAction:
        "Preserve cost and rate blockers without enabling execution.",
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
      recoveryAction:
        "Preserve timeout/cancel blockers without enabling execution.",
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
      recoveryAction:
        "Preserve idempotency and replay blockers.",
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
      recoveryAction:
        "Keep single-run lock uncreated in this batch.",
      owner: "backend future",
      nextSafeAction: "Do not create a single-run lock.",
    },
    {
      checklistId: "queue-dispatch-still-blocked",
      label: "queue dispatch still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired: "Queue dispatch state: not dispatched.",
      recoveryAction:
        "Preserve queue dispatch blocked posture.",
      owner: "backend future",
      nextSafeAction: "Keep queue dispatch blocked.",
    },
    {
      checklistId: "worker-dispatch-still-blocked",
      label: "worker dispatch still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired: "Worker dispatch state: not dispatched.",
      recoveryAction:
        "Preserve worker dispatch blocked posture.",
      owner: "backend future",
      nextSafeAction: "Keep worker dispatch blocked.",
    },
    {
      checklistId: "job-execution-still-blocked",
      label: "job execution still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired: "Job execution state: not executed.",
      recoveryAction:
        "Preserve job execution blocked posture.",
      owner: "backend future",
      nextSafeAction: "Keep job execution blocked.",
    },
    {
      checklistId: "result-persistence-still-blocked",
      label: "result persistence still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired: "Result reference and result capture remain non-persistent.",
      recoveryAction:
        "Preserve result persistence blocked posture.",
      owner: "backend future",
      nextSafeAction: "Keep result persistence blocked.",
    },
    {
      checklistId: "audit-persistence-still-blocked",
      label: "audit persistence still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired: "Audit reference and audit join remain non-persistent.",
      recoveryAction:
        "Preserve audit persistence blocked posture.",
      owner: "backend future",
      nextSafeAction: "Keep audit persistence blocked.",
    },
    {
      checklistId: "approval-persistence-still-blocked",
      label: "approval persistence still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired:
        "Approval reference and approval join remain non-persistent.",
      recoveryAction:
        "Preserve approval persistence blocked posture.",
      owner: "backend future",
      nextSafeAction: "Keep approval persistence blocked.",
    },
    {
      checklistId: "database-writes-still-blocked",
      label: "database writes still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired: "Database write state: not implemented.",
      recoveryAction:
        "Preserve database write blocked posture.",
      owner: "backend future",
      nextSafeAction: "Keep database writes blocked.",
    },
    {
      checklistId: "file-writes-still-blocked",
      label: "file writes still blocked",
      state: "blocked",
      severity: "high",
      evidenceRequired: "File write state: not implemented.",
      recoveryAction:
        "Preserve file write blocked posture.",
      owner: "backend future",
      nextSafeAction: "Keep file writes blocked.",
    },
  ];

function buildRecoveryReadinessChecklistRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
  seed: RecoveryReadinessChecklistSeed
): ManualApprovalDecisionRecoveryReadinessChecklistRecord {
  return {
    key: buildStableManualApprovalDecisionRecoveryReadinessChecklistKey(
      review.id,
      seed.checklistId
    ),
    checklistVersion:
      "backend-owned-synthetic-dry-run-manual-approval-decision-recovery-readiness-checklist-v1",
    decisionReviewId: review.id,
    checklistId: seed.checklistId,
    label: seed.label,
    state: seed.state,
    severity: seed.severity,
    evidenceRequired: seed.evidenceRequired,
    recoveryAction: seed.recoveryAction,
    owner: seed.owner,
    currentPosture: "preview-only",
    minimalSyntheticDryRunExecutionMvpDependency:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
    nextSafeAction: seed.nextSafeAction,
  };
}

const RECOVERY_READINESS_CHECKLIST_RECORDS: readonly ManualApprovalDecisionRecoveryReadinessChecklistRecord[] =
  REVIEW_RECORDS.flatMap((review) =>
    RECOVERY_READINESS_CHECKLIST_SEEDS.map((seed) =>
      buildRecoveryReadinessChecklistRecord(review, seed)
    )
  );

function buildReviewAuditSummaryRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): ManualApprovalDecisionReviewAuditSummaryRecord {
  const outcomes = resolveRequiredRecord(
    OUTCOMES_BY_REVIEW_ID.get(review.id),
    `Missing outcome previews for review ${review.id}.`
  );
  const gateFailures = GATE_FAILURE_REVIEW_RECORDS.filter(
    (record) => record.decisionReviewId === review.id
  );

  return {
    id: review.id,
    key: buildStableManualApprovalDecisionReviewAuditSummaryKey(review.id),
    auditSummaryVersion:
      "backend-owned-synthetic-dry-run-manual-approval-decision-review-audit-summary-preview-v1",
    previewOnlyStatement:
      "manual approval decision review audit summary is preview-only",
    decisionReviewId: review.id,
    auditPosture: "preview-only",
    approvalReferenceState: review.approvalReferenceState,
    auditReferenceState: review.auditReferenceState,
    resultReferenceState: review.resultReferenceState,
    evidencePacketState: review.evidencePacketState,
    outcomeEvidenceSummary: outcomes
      .map((record) => `${record.outcomeLabel}: ${record.outcomeState}`)
      .join(" | "),
    failedGateSummary: gateFailures
      .map((record) => `${record.failedGateLabel}: ${record.gateState}`)
      .join(" | "),
    recoverySummary:
      "Recovery remains manual review only. Retry disabled. Fallback disabled. Selected decision remains not selected. Approval outcome remains not decided.",
    blockedActionSummary:
      "No approval request. No approval decision. No approval token. No approval lease. No provider execution. No prompt sending. No queue dispatch. No worker dispatch. No job execution.",
    noApprovalRequestStatement: "No approval request.",
    noApprovalDecisionStatement: "No approval decision.",
    noApprovalTokenStatement: "No approval token.",
    noApprovalLeaseStatement: "No approval lease.",
    noApprovalPersistenceStatement: "No approval persistence.",
    noAuditPersistenceStatement: "No audit persistence.",
    noResultPersistenceStatement: "No result persistence.",
    noDatabaseWriteStatement: "No database write.",
    noFileWriteStatement: "No file write.",
    minimalSyntheticDryRunExecutionMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
  };
}

const REVIEW_AUDIT_SUMMARY_RECORDS: readonly ManualApprovalDecisionReviewAuditSummaryRecord[] =
  REVIEW_RECORDS.map(buildReviewAuditSummaryRecord);

function buildAcceptancePostureRecord(
  review: BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord
): ManualApprovalDecisionAcceptancePostureRecord {
  const outcomes = resolveRequiredRecord(
    OUTCOMES_BY_REVIEW_ID.get(review.id),
    `Missing outcome previews for review ${review.id}.`
  );

  const requiredEvidence = buildUniqueManualApprovalDecisionReviewDisplayStrings(
    outcomes.flatMap((outcome) => outcome.requiredEvidence)
  );

  return {
    id: review.id,
    key: buildStableManualApprovalDecisionAcceptancePostureKey(review.id),
    acceptancePostureVersion:
      "backend-owned-synthetic-dry-run-manual-approval-decision-acceptance-posture-preview-v1",
    previewOnlyStatement:
      "manual approval decision acceptance posture is preview-only",
    decisionReviewId: review.id,
    acceptanceState: "not accepted / preview-only",
    approvalBlockers: [
      `operator approval state: ${review.operatorApprovalState}`,
      review.manualApprovalRequired,
    ],
    manualConfirmationBlockers: [
      `manual confirmation state: ${review.manualConfirmationState}`,
      review.manualConfirmationRequired,
    ],
    outcomeBlockers: [
      `selected decision state: ${review.selectedDecisionState}`,
      `approval outcome state: ${review.approvalOutcomeState}`,
    ],
    tokenLeaseBlockers: [
      `approval token state: ${review.approvalTokenState}`,
      `approval lease state: ${review.approvalLeaseState}`,
    ],
    evidencePacketBlockers: [
      `evidence packet state: ${review.evidencePacketState}`,
      "manual approval decision evidence summary is preview-only",
    ],
    handoffBlockers: [
      `handoff state: ${review.handoffState}`,
      "manual approval handoff review remains preview-only",
    ],
    endToEndPacketBlockers: [
      `end-to-end packet state: ${review.endToEndPacketState}`,
      `packet decision state: ${review.packetDecisionState}`,
    ],
    safetyBlockers: [
      review.killSwitchRequired,
      review.auditRequired,
      review.executionPosture,
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
    ],
    auditBlockers: [
      `audit reference state: ${review.auditReferenceState}`,
      `audit join state: ${review.auditJoinState}`,
    ],
    resultBlockers: [
      `result reference state: ${review.resultReferenceState}`,
      `result capture state: ${review.resultCaptureState}`,
    ],
    persistenceBlockers: [
      `approval reference state: ${review.approvalReferenceState}`,
      `approval join state: ${review.approvalJoinState}`,
      "no approval persistence",
      "no audit persistence",
      "no result persistence",
    ],
    databaseFileBlockers: [
      `database write state: ${review.databaseWriteState}`,
      `file write state: ${review.fileWriteState}`,
    ],
    queueWorkerJobBlockers: [
      `queue dispatch state: ${review.queueDispatchState}`,
      `worker dispatch state: ${review.workerDispatchState}`,
      `job execution state: ${review.jobExecutionState}`,
    ],
    requiredEvidence,
    nextSafeAction:
      `Keep ${review.requestLabel} in review-only posture until ${NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH}.`,
    explicitNoDecisionAcceptanceNoExecutionStatement:
      "No decision acceptance. No execution.",
  };
}

const ACCEPTANCE_POSTURE_RECORDS: readonly ManualApprovalDecisionAcceptancePostureRecord[] =
  REVIEW_RECORDS.map(buildAcceptancePostureRecord);

export function listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews(): readonly BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord[] {
  return cloneList(REVIEW_RECORDS);
}

export function listManualApprovalDecisionOutcomeReviewRecords(): readonly ManualApprovalDecisionOutcomeReviewRecord[] {
  return cloneList(OUTCOME_REVIEW_RECORDS);
}

export function listManualApprovalDecisionGateFailureReviewRecords(): readonly ManualApprovalDecisionGateFailureReviewRecord[] {
  return cloneList(GATE_FAILURE_REVIEW_RECORDS);
}

export function listManualApprovalDecisionRecoveryPlanPreviews(): readonly ManualApprovalDecisionRecoveryPlanPreviewRecord[] {
  return cloneList(RECOVERY_PLAN_PREVIEW_RECORDS);
}

export function listManualApprovalDecisionRecoveryReadinessChecklistRecords(): readonly ManualApprovalDecisionRecoveryReadinessChecklistRecord[] {
  return cloneList(RECOVERY_READINESS_CHECKLIST_RECORDS);
}

export function listManualApprovalDecisionReviewAuditSummaries(): readonly ManualApprovalDecisionReviewAuditSummaryRecord[] {
  return cloneList(REVIEW_AUDIT_SUMMARY_RECORDS);
}

export function listManualApprovalDecisionAcceptancePostureRecords(): readonly ManualApprovalDecisionAcceptancePostureRecord[] {
  return cloneList(ACCEPTANCE_POSTURE_RECORDS);
}

export function groupManualApprovalDecisionReviewsByCapabilityFamily(): readonly ManualApprovalDecisionReviewCapabilityFamilyGroup[] {
  return groupReviewRecordsByCapabilityFamily(REVIEW_RECORDS);
}

export function groupManualApprovalDecisionReviewsByWorkspaceTarget(): readonly ManualApprovalDecisionReviewWorkspaceGroup[] {
  return groupReviewRecordsByWorkspaceTarget(REVIEW_RECORDS);
}

export function buildManualApprovalDecisionReviewSummary(): ManualApprovalDecisionReviewSummary {
  const capabilityGroups =
    groupManualApprovalDecisionReviewsByCapabilityFamily();
  const workspaceGroups = groupManualApprovalDecisionReviewsByWorkspaceTarget();

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_CONTRACT_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
    reviewCount: REVIEW_RECORDS.length,
    outcomeReviewCount: OUTCOME_REVIEW_RECORDS.length,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    auditSummaryCount: REVIEW_AUDIT_SUMMARY_RECORDS.length,
    acceptancePostureCount: ACCEPTANCE_POSTURE_RECORDS.length,
    capabilityFamilyGroupCount: capabilityGroups.length,
    workspaceTargetGroupCount: workspaceGroups.length,
    decisionState:
      REVIEW_RECORDS[0]?.decisionState ?? "draft / preview-only / not evaluated",
    currentReadiness: CURRENT_REVIEW_READINESS,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildManualApprovalDecisionOutcomeSummary(): ManualApprovalDecisionOutcomeSummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
    outcomeReviewCount: OUTCOME_REVIEW_RECORDS.length,
    summaryLines: cloneList(OUTCOME_SUMMARY_LINES),
    nextSafeAction:
      "Keep all outcome reviews preview-only and not selected.",
  };
}

export function buildManualApprovalDecisionGateFailureSummary(): ManualApprovalDecisionGateFailureSummary {
  const topFailedGateLabels = buildUniqueManualApprovalDecisionReviewDisplayStrings(
    GATE_FAILURE_REVIEW_RECORDS.map((record) => record.failedGateLabel)
  ) as readonly ManualApprovalDecisionGateLabel[];

  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    topFailedGateLabels,
    nextSafeAction:
      "Keep every decision gate blocked until the backend-only MVP exists.",
  };
}

export function buildManualApprovalDecisionRecoverySummary(): ManualApprovalDecisionRecoverySummary {
  return {
    currentBatch:
      BACKEND_OWNED_SYNTHETIC_DRY_RUN_MANUAL_APPROVAL_DECISION_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_BATCH,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    currentReadiness: CURRENT_REVIEW_READINESS,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextSafeAction:
      "Keep recovery manual-review-only while execution and persistence remain blocked.",
  };
}

export function buildMinimalManualGatedSyntheticDryRunExecutionMvpChecklist(): readonly string[] {
  return cloneList(MINIMAL_MANUAL_GATED_SYNTHETIC_DRY_RUN_EXECUTION_MVP_CHECKLIST);
}
