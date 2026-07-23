import {
  listSyntheticMvpManualApprovalFixtures,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews,
} from "../min-provider-admit-review";
import {
  buildProviderAdapterDryRunAuditApprovalJoinGateSummary,
  buildProviderAdapterDryRunAuditApprovalJoinReadinessSummary,
  buildProviderAdapterDryRunAuditApprovalJoinSummary,
  listMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpRecords,
  listProviderAdapterDryRunApprovalJoinOutputs,
  listProviderAdapterDryRunApprovalPreviews,
  listProviderAdapterDryRunAuditApprovalEvidencePreviews,
  listProviderAdapterDryRunAuditApprovalJoinAdmissionChecks,
  listProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaries,
  listProviderAdapterDryRunAuditApprovalJoinEnvelopes,
  listProviderAdapterDryRunAuditApprovalJoinErrors,
  listProviderAdapterDryRunAuditApprovalJoinGates,
  listProviderAdapterDryRunAuditApprovalJoinInputs,
  listProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecords,
  listProviderAdapterDryRunAuditApprovalJoinRequests,
  listProviderAdapterDryRunAuditApprovalJoinResponses,
  listProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaries,
  listProviderAdapterDryRunAuditJoinOutputs,
  listProviderAdapterDryRunAuditPreviews,
} from "../min-provider-audit-join/min-provider-audit-join-catalog";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews,
  listProviderDryRunResultCaptureOutputReviewRecords,
} from "../min-provider-capture-review";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews,
} from "../min-provider-review";
import type {
  ProviderAdapterDryRunApprovalJoinOutputRecord,
  ProviderAdapterDryRunApprovalPreviewRecord,
  ProviderAdapterDryRunAuditApprovalEvidencePreviewRecord,
  ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckRecord,
  ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryRecord,
  ProviderAdapterDryRunAuditApprovalJoinEnvelopeRecord,
  ProviderAdapterDryRunAuditApprovalJoinErrorRecord,
  ProviderAdapterDryRunAuditApprovalJoinGateRecord,
  ProviderAdapterDryRunAuditApprovalJoinGateSummary,
  ProviderAdapterDryRunAuditApprovalJoinInputRecord,
  ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord,
  ProviderAdapterDryRunAuditApprovalJoinReadinessSummary,
  ProviderAdapterDryRunAuditApprovalJoinRequestRecord,
  ProviderAdapterDryRunAuditApprovalJoinResponseRecord,
  ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryRecord,
  ProviderAdapterDryRunAuditApprovalJoinSummary,
  ProviderAdapterDryRunAuditJoinOutputRecord,
  ProviderAdapterDryRunAuditPreviewRecord,
  MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord,
} from "../min-provider-audit-join/min-provider-audit-join-types";
import type {
  BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord,
  ProviderDryRunResultCaptureOutputReviewRecord,
} from "../min-provider-capture-review";
import type {
  ProviderSelectionCredentialReferenceReviewRecord,
} from "../min-provider-review";
import type {
  ProviderDryRunAdmissionReviewRecord,
} from "../min-provider-admit-review";
import type {
  BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import type {
  SyntheticMvpManualApprovalFixtureRecord,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
  BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE,
  MINIMAL_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_SECTION_TITLES,
  NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
  PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
  type BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord,
  type MinimalProviderAdapterDryRunAuditApprovalJoinAcceptanceState,
  type MinimalProviderAdapterDryRunAuditApprovalJoinAcceptanceStatement,
  type MinimalProviderAdapterDryRunAuditApprovalJoinAuditPosture,
  type MinimalProviderAdapterDryRunAuditApprovalJoinFallbackPosture,
  type MinimalProviderAdapterDryRunAuditApprovalJoinNoLiveGatePassStatement,
  type MinimalProviderAdapterDryRunAuditApprovalJoinOutputReviewStatement,
  type MinimalProviderAdapterDryRunAuditApprovalJoinPreviewOnlyStatement,
  type MinimalProviderAdapterDryRunAuditApprovalJoinReadinessOwner,
  type MinimalProviderAdapterDryRunAuditApprovalJoinReadinessReviewState,
  type MinimalProviderAdapterDryRunAuditApprovalJoinRecoveryPosture,
  type MinimalProviderAdapterDryRunAuditApprovalJoinRecoveryStatement,
  type MinimalProviderAdapterDryRunAuditApprovalJoinRetryPosture,
  type MinimalProviderAdapterDryRunAuditApprovalJoinReviewCurrentReadiness,
  type MinimalProviderAdapterDryRunAuditApprovalJoinReviewId,
  type MinimalProviderAdapterDryRunAuditApprovalJoinReviewKey,
  type MinimalProviderAdapterDryRunAuditApprovalJoinReviewMode,
  type MinimalProviderAdapterDryRunAuditApprovalJoinReviewPosture,
  type MinimalProviderAdapterDryRunAuditApprovalJoinReviewSeverity,
  type MinimalProviderAdapterDryRunAuditApprovalJoinReviewSource,
  type ProviderAdapterDryRunAuditApprovalJoinAcceptancePostureKey,
  type ProviderAdapterDryRunAuditApprovalJoinAcceptancePostureRecord,
  type ProviderAdapterDryRunAuditApprovalJoinDeterministicPreviewReferences,
  type ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewId,
  type ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewKey,
  type ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewRecord,
  type ProviderAdapterDryRunAuditApprovalJoinGateFailureSummary,
  type ProviderAdapterDryRunAuditApprovalJoinOutputReviewKey,
  type ProviderAdapterDryRunAuditApprovalJoinOutputReviewRecord,
  type ProviderAdapterDryRunAuditApprovalJoinOutputReviewSummary,
  type ProviderAdapterDryRunAuditApprovalJoinRecoveryPlanKey,
  type ProviderAdapterDryRunAuditApprovalJoinRecoveryPlanPreviewRecord,
  type ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistKey,
  type ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistRecord,
  type ProviderAdapterDryRunAuditApprovalJoinRecoverySummary,
  type ProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryKey,
  type ProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryRecord,
  type ProviderAdapterDryRunAuditApprovalJoinReviewCapabilityFamilyGroup,
  type ProviderAdapterDryRunAuditApprovalJoinReviewCredentialReferenceGroup,
  type ProviderAdapterDryRunAuditApprovalJoinReviewDisplayStrings,
  type ProviderAdapterDryRunAuditApprovalJoinReviewProviderSlotGroup,
  type ProviderAdapterDryRunAuditApprovalJoinReviewSummary,
  type ProviderAdapterDryRunAuditApprovalJoinReviewWorkspaceGroup,
  type ProviderAdapterDryRunEndToEndPacketMvpChecklist,
} from "./min-provider-aa-review-types";

type ProviderAdapterAuditApprovalJoinReviewSourceBundle = Readonly<{
  joinMvpRecord: MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord;
  joinInputRecord: ProviderAdapterDryRunAuditApprovalJoinInputRecord;
  admissionCheckRecord: ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckRecord;
  auditJoinOutputRecord: ProviderAdapterDryRunAuditJoinOutputRecord;
  approvalJoinOutputRecord: ProviderAdapterDryRunApprovalJoinOutputRecord;
  envelopeRecord: ProviderAdapterDryRunAuditApprovalJoinEnvelopeRecord;
  auditPreviewRecord: ProviderAdapterDryRunAuditPreviewRecord;
  approvalPreviewRecord: ProviderAdapterDryRunApprovalPreviewRecord;
  evidencePreviewRecord: ProviderAdapterDryRunAuditApprovalEvidencePreviewRecord;
  safetyGateSummaryRecord: ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryRecord;
  blockedLivePersistenceSummaryRecord:
    ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryRecord;
  requestRecord: ProviderAdapterDryRunAuditApprovalJoinRequestRecord;
  responseRecord: ProviderAdapterDryRunAuditApprovalJoinResponseRecord;
  previewErrorRecord: ProviderAdapterDryRunAuditApprovalJoinErrorRecord;
  gateRecords: readonly ProviderAdapterDryRunAuditApprovalJoinGateRecord[];
  readinessRecords:
    readonly ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord[];
  aggregateSummary: ProviderAdapterDryRunAuditApprovalJoinSummary;
  aggregateGateSummary: ProviderAdapterDryRunAuditApprovalJoinGateSummary;
  aggregateReadinessSummary: ProviderAdapterDryRunAuditApprovalJoinReadinessSummary;
  sourceResultCaptureReviewRecord:
    BackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviewRecord;
  sourceResultCaptureOutputReviewRecord:
    ProviderDryRunResultCaptureOutputReviewRecord;
  sourceProviderSelectionReviewRecord:
    ProviderSelectionCredentialReferenceReviewRecord;
  sourceProviderAdmissionReviewRecord: ProviderDryRunAdmissionReviewRecord;
  sourceManualApprovalDecisionReviewRecord:
    BackendOwnedSyntheticDryRunManualApprovalDecisionReviewRecord;
  manualApprovalFixtureRecord: SyntheticMvpManualApprovalFixtureRecord;
  manualConfirmationFixtureRecord: SyntheticMvpManualApprovalFixtureRecord;
}>;

const REVIEW_SOURCE: MinimalProviderAdapterDryRunAuditApprovalJoinReviewSource =
  "Athena / Jarvis Provider Adapter Control Plane";
const REVIEW_MODE: MinimalProviderAdapterDryRunAuditApprovalJoinReviewMode =
  "preview-only";
const REVIEW_POSTURE: MinimalProviderAdapterDryRunAuditApprovalJoinReviewPosture =
  "minimal provider adapter dry-run audit approval join review / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent";
const CURRENT_READINESS: MinimalProviderAdapterDryRunAuditApprovalJoinReviewCurrentReadiness =
  "minimal-provider-dry-run-audit-approval-join-review-only / backend-only / dry-run-fixture-only / credential-reference-only / in-memory-only / not-live-provider-executing / not persistent";
const PREVIEW_ONLY_STATEMENT: MinimalProviderAdapterDryRunAuditApprovalJoinPreviewOnlyStatement =
  "provider adapter dry-run audit and approval join review is preview-only";
const OUTPUT_REVIEW_STATEMENT: MinimalProviderAdapterDryRunAuditApprovalJoinOutputReviewStatement =
  "Provider adapter dry-run audit approval join fixture only. No real output. No provider call. No persistence.";
const NO_LIVE_GATE_PASS_STATEMENT: MinimalProviderAdapterDryRunAuditApprovalJoinNoLiveGatePassStatement =
  "No live gate pass.";
const RECOVERY_STATEMENT: MinimalProviderAdapterDryRunAuditApprovalJoinRecoveryStatement =
  "No retry. No fallback. No provider execution. No prompt sending. No secret read. No persistence.";
const RECOVERY_POSTURE: MinimalProviderAdapterDryRunAuditApprovalJoinRecoveryPosture =
  "manual review only";
const RETRY_POSTURE: MinimalProviderAdapterDryRunAuditApprovalJoinRetryPosture =
  "disabled";
const FALLBACK_POSTURE: MinimalProviderAdapterDryRunAuditApprovalJoinFallbackPosture =
  "disabled";
const AUDIT_POSTURE: MinimalProviderAdapterDryRunAuditApprovalJoinAuditPosture =
  "preview-only";
const ACCEPTANCE_STATE: MinimalProviderAdapterDryRunAuditApprovalJoinAcceptanceState =
  "not accepted for live provider execution or persistence / provider adapter dry-run audit approval join fixture MVP accepted only";
const ACCEPTANCE_STATEMENT: MinimalProviderAdapterDryRunAuditApprovalJoinAcceptanceStatement =
  "Provider adapter dry-run audit approval join fixture accepted only. Live provider execution and persistence not accepted.";

const REVIEW_SUMMARY_LINES = [
  "Athena can review the backend-owned minimal manual-gated provider adapter dry-run audit and approval join MVP",
  PREVIEW_ONLY_STATEMENT,
  "server-only provider adapter dry-run audit and approval join helper exists",
  "provider adapter dry-run audit and approval join is produced in memory only",
  "deterministic provider adapter dry-run audit and approval join only",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "backup provider slot is preview-only",
  "local/private alternative is preview-only",
  "live provider execution is blocked",
  "provider response is not received from provider",
  "model output is not generated by provider/model",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no retry execution",
  "no fallback execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes",
  `current readiness: ${CURRENT_READINESS}`,
  `acceptance state: ${ACCEPTANCE_STATE}`,
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "provider adapter dry-run end-to-end packet MVP comes next",
] as const;

const OUTPUT_REVIEW_SUMMARY_LINES = [
  "Provider adapter dry-run audit and approval join output review",
  OUTPUT_REVIEW_STATEMENT,
  "join state: joined-provider-dry-run-fixture-in-memory-only",
  "audit join state: deterministic provider dry-run audit join in memory only",
  "approval join state: deterministic provider dry-run approval join in memory only",
  "credential boundary: opaque label only",
  "provider boundary: live execution blocked",
  "prompt boundary: prompt transmission state is not sent",
  "approval boundary: real approval absent",
  "persistence boundary: no result, audit, approval, database, or file persistence",
] as const;

const GATE_FAILURE_SUMMARY_LINES = [
  "Provider adapter dry-run audit and approval join gate failure review",
  NO_LIVE_GATE_PASS_STATEMENT,
  "backend-only boundary",
  "server-only helper boundary",
  "prompt sending blocked",
  "provider execution blocked",
  "real approval blocked",
  "queue, worker, and job dispatch blocked",
  "retry disabled",
  "fallback disabled",
  "persistence blocked",
] as const;

const RECOVERY_SUMMARY_LINES = [
  "Provider adapter dry-run audit and approval join recovery plan",
  "Provider adapter dry-run audit and approval join recovery readiness",
  RECOVERY_STATEMENT,
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "provider adapter dry-run end-to-end packet MVP comes next",
] as const;

const END_TO_END_PACKET_MVP_CHECKLIST_LINES: ProviderAdapterDryRunEndToEndPacketMvpChecklist =
  [
    NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    "provider adapter dry-run end-to-end packet MVP comes next",
    "Preserve the backend-only, dry-run-fixture-only, credential-reference-only, and in-memory-only boundaries.",
    "Carry the nine provider audit and approval join review records forward as packet evidence.",
    "Carry the 468 preview-only gate failure review records forward as packet blockers.",
    "Carry the 297 recovery readiness records forward as packet readiness evidence.",
    "Do not add live provider execution, prompt transmission, secret reads, real approval, retries, fallbacks, queue dispatch, worker dispatch, job execution, or persistence.",
  ] as const;

const EXPECTED_SOURCE_COUNT = 9;
const EXPECTED_UNIQUE_GATE_COUNT = 52;
const EXPECTED_TOTAL_GATE_COUNT = 468;
const EXPECTED_UNIQUE_READINESS_COUNT = 33;
const EXPECTED_TOTAL_READINESS_COUNT = 297;

const SOURCE_JOIN_MVP_RECORDS =
  listMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpRecords();
const SOURCE_JOIN_INPUT_RECORDS = listProviderAdapterDryRunAuditApprovalJoinInputs();
const SOURCE_JOIN_ADMISSION_CHECK_RECORDS =
  listProviderAdapterDryRunAuditApprovalJoinAdmissionChecks();
const SOURCE_AUDIT_JOIN_OUTPUT_RECORDS = listProviderAdapterDryRunAuditJoinOutputs();
const SOURCE_APPROVAL_JOIN_OUTPUT_RECORDS =
  listProviderAdapterDryRunApprovalJoinOutputs();
const SOURCE_ENVELOPE_RECORDS = listProviderAdapterDryRunAuditApprovalJoinEnvelopes();
const SOURCE_AUDIT_PREVIEW_RECORDS = listProviderAdapterDryRunAuditPreviews();
const SOURCE_APPROVAL_PREVIEW_RECORDS = listProviderAdapterDryRunApprovalPreviews();
const SOURCE_EVIDENCE_PREVIEW_RECORDS =
  listProviderAdapterDryRunAuditApprovalEvidencePreviews();
const SOURCE_SAFETY_GATE_SUMMARY_RECORDS =
  listProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaries();
const SOURCE_BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORDS =
  listProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaries();
const SOURCE_REQUEST_RECORDS = listProviderAdapterDryRunAuditApprovalJoinRequests();
const SOURCE_RESPONSE_RECORDS = listProviderAdapterDryRunAuditApprovalJoinResponses();
const SOURCE_PREVIEW_ERROR_RECORDS = listProviderAdapterDryRunAuditApprovalJoinErrors();
const SOURCE_GATE_RECORDS = listProviderAdapterDryRunAuditApprovalJoinGates();
const SOURCE_READINESS_RECORDS =
  listProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecords();
const SOURCE_AGGREGATE_SUMMARY = buildProviderAdapterDryRunAuditApprovalJoinSummary();
const SOURCE_AGGREGATE_GATE_SUMMARY =
  buildProviderAdapterDryRunAuditApprovalJoinGateSummary();
const SOURCE_AGGREGATE_READINESS_SUMMARY =
  buildProviderAdapterDryRunAuditApprovalJoinReadinessSummary();
const SOURCE_RESULT_CAPTURE_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews();
const SOURCE_RESULT_CAPTURE_OUTPUT_REVIEW_RECORDS =
  listProviderDryRunResultCaptureOutputReviewRecords();
const SOURCE_PROVIDER_SELECTION_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews();
const SOURCE_PROVIDER_ADMISSION_REVIEW_RECORDS =
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews();
const SOURCE_MANUAL_APPROVAL_DECISION_REVIEW_RECORDS =
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews();
const SOURCE_MANUAL_APPROVAL_FIXTURE_RECORDS =
  listSyntheticMvpManualApprovalFixtures();

function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function cloneList<T>(records: readonly T[]): readonly T[] {
  return records.map((record) => cloneDeep(record));
}

function uniqueStrings(values: readonly string[]): readonly string[] {
  const seen = new Set<string>();
  const unique: string[] = [];

  values.forEach((value) => {
    if (!seen.has(value)) {
      seen.add(value);
      unique.push(value);
    }
  });

  return unique;
}

function findRequiredByKey<T extends Readonly<{ key: string }>>(
  records: readonly T[],
  key: string,
  label: string
): T {
  const record = records.find((candidate) => candidate.key === key);

  if (!record) {
    throw new Error(`Missing ${label}: ${key}`);
  }

  return record;
}

function normalizeComparable(value: unknown): string {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null
  ) {
    return String(value);
  }

  return JSON.stringify(value);
}

function assertEqual(actual: unknown, expected: unknown, label: string): void {
  if (normalizeComparable(actual) !== normalizeComparable(expected)) {
    throw new Error(
      `Unexpected ${label}. Expected ${normalizeComparable(expected)}, received ${normalizeComparable(actual)}.`
    );
  }
}

function extractCapabilityFamilyLabel(
  capabilityFamily:
    | string
    | Readonly<{
        id: string;
        label: string;
      }>
): string {
  return typeof capabilityFamily === "string"
    ? capabilityFamily
    : capabilityFamily.label;
}

function assertJoinStableIdentity(
  record:
    | MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord
    | ProviderAdapterDryRunAuditApprovalJoinInputRecord
    | ProviderAdapterDryRunAuditApprovalJoinAdmissionCheckRecord
    | ProviderAdapterDryRunAuditJoinOutputRecord
    | ProviderAdapterDryRunApprovalJoinOutputRecord
    | ProviderAdapterDryRunAuditApprovalJoinEnvelopeRecord
    | ProviderAdapterDryRunAuditPreviewRecord
    | ProviderAdapterDryRunApprovalPreviewRecord
    | ProviderAdapterDryRunAuditApprovalEvidencePreviewRecord
    | ProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryRecord
    | ProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryRecord
    | ProviderAdapterDryRunAuditApprovalJoinRequestRecord
    | ProviderAdapterDryRunAuditApprovalJoinResponseRecord
    | ProviderAdapterDryRunAuditApprovalJoinErrorRecord
    | ProviderAdapterDryRunAuditApprovalJoinGateRecord
    | ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord,
  joinMvpRecord: MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord,
  label: string
): void {
  assertEqual(record.stableId, joinMvpRecord.stableId, `${label} stableId`);
  assertEqual(
    record.requestIdentityId,
    joinMvpRecord.requestIdentityId,
    `${label} requestIdentityId`
  );
  assertEqual(
    record.capabilityFamily,
    joinMvpRecord.capabilityFamily,
    `${label} capabilityFamily`
  );
  assertEqual(
    record.workspaceTarget,
    joinMvpRecord.workspaceTarget,
    `${label} workspaceTarget`
  );
  assertEqual(
    record.providerSlotLabel,
    joinMvpRecord.providerSlotLabel,
    `${label} providerSlotLabel`
  );
  assertEqual(
    record.backupProviderSlotLabel,
    joinMvpRecord.backupProviderSlotLabel,
    `${label} backupProviderSlotLabel`
  );
  assertEqual(
    record.localPrivateAlternativeLabel,
    joinMvpRecord.localPrivateAlternativeLabel,
    `${label} localPrivateAlternativeLabel`
  );
  assertEqual(
    record.opaqueCredentialReferenceLabel,
    joinMvpRecord.opaqueCredentialReferenceLabel,
    `${label} opaqueCredentialReferenceLabel`
  );
}

function assertCurrentSourceShape(): void {
  const sourceCount = SOURCE_JOIN_MVP_RECORDS.length;
  const uniqueGateIds = uniqueStrings(SOURCE_GATE_RECORDS.map((record) => record.id));
  const uniqueReadinessIds = uniqueStrings(
    SOURCE_READINESS_RECORDS.map((record) => record.id)
  );

  assertEqual(sourceCount, EXPECTED_SOURCE_COUNT, "provider join source count");
  assertEqual(
    uniqueGateIds.length,
    EXPECTED_UNIQUE_GATE_COUNT,
    "unique provider join gate count"
  );
  assertEqual(
    SOURCE_GATE_RECORDS.length,
    EXPECTED_TOTAL_GATE_COUNT,
    "total provider join gate count"
  );
  assertEqual(
    uniqueReadinessIds.length,
    EXPECTED_UNIQUE_READINESS_COUNT,
    "unique provider join readiness count"
  );
  assertEqual(
    SOURCE_READINESS_RECORDS.length,
    EXPECTED_TOTAL_READINESS_COUNT,
    "total provider join readiness count"
  );
  assertEqual(
    SOURCE_GATE_RECORDS.length,
    sourceCount * uniqueGateIds.length,
    "gate multiplication count"
  );
  assertEqual(
    SOURCE_READINESS_RECORDS.length,
    sourceCount * uniqueReadinessIds.length,
    "readiness multiplication count"
  );

  SOURCE_JOIN_MVP_RECORDS.forEach((record) => {
    const gateCount = SOURCE_GATE_RECORDS.filter(
      (candidate) => candidate.stableId === record.stableId
    ).length;
    const readinessCount = SOURCE_READINESS_RECORDS.filter(
      (candidate) => candidate.stableId === record.stableId
    ).length;

    assertEqual(
      gateCount,
      uniqueGateIds.length,
      `${record.stableId} gate count`
    );
    assertEqual(
      readinessCount,
      uniqueReadinessIds.length,
      `${record.stableId} readiness count`
    );
  });
}

function resolveSourceBundle(
  joinMvpRecord: MinimalProviderAdapterDryRunAuditApprovalJoinMvpRecord
): ProviderAdapterAuditApprovalJoinReviewSourceBundle {
  const gateRecords = SOURCE_GATE_RECORDS.filter(
    (record) => record.stableId === joinMvpRecord.stableId
  );
  const readinessRecords = SOURCE_READINESS_RECORDS.filter(
    (record) => record.stableId === joinMvpRecord.stableId
  );

  if (!gateRecords.length) {
    throw new Error(`Missing gate records for ${joinMvpRecord.stableId}.`);
  }

  if (!readinessRecords.length) {
    throw new Error(`Missing readiness records for ${joinMvpRecord.stableId}.`);
  }

  const bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle = {
    joinMvpRecord,
    joinInputRecord: findRequiredByKey(
      SOURCE_JOIN_INPUT_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-input:${joinMvpRecord.stableId}`,
      "provider audit approval join input"
    ),
    admissionCheckRecord: findRequiredByKey(
      SOURCE_JOIN_ADMISSION_CHECK_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-admission-check:${joinMvpRecord.stableId}`,
      "provider audit approval join admission check"
    ),
    auditJoinOutputRecord: findRequiredByKey(
      SOURCE_AUDIT_JOIN_OUTPUT_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-join-output:${joinMvpRecord.stableId}`,
      "provider audit join output"
    ),
    approvalJoinOutputRecord: findRequiredByKey(
      SOURCE_APPROVAL_JOIN_OUTPUT_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-join-output:${joinMvpRecord.stableId}`,
      "provider approval join output"
    ),
    envelopeRecord: findRequiredByKey(
      SOURCE_ENVELOPE_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-envelope:${joinMvpRecord.stableId}`,
      "provider audit approval join envelope"
    ),
    auditPreviewRecord: findRequiredByKey(
      SOURCE_AUDIT_PREVIEW_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview:${joinMvpRecord.stableId}`,
      "provider audit preview"
    ),
    approvalPreviewRecord: findRequiredByKey(
      SOURCE_APPROVAL_PREVIEW_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview:${joinMvpRecord.stableId}`,
      "provider approval preview"
    ),
    evidencePreviewRecord: findRequiredByKey(
      SOURCE_EVIDENCE_PREVIEW_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-evidence-preview:${joinMvpRecord.stableId}`,
      "provider audit approval evidence preview"
    ),
    safetyGateSummaryRecord: findRequiredByKey(
      SOURCE_SAFETY_GATE_SUMMARY_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-safety-gate-summary:${joinMvpRecord.stableId}`,
      "provider audit approval join safety gate summary"
    ),
    blockedLivePersistenceSummaryRecord: findRequiredByKey(
      SOURCE_BLOCKED_LIVE_PERSISTENCE_SUMMARY_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-blocked-live-persistence-summary:${joinMvpRecord.stableId}`,
      "provider audit approval join blocked live persistence summary"
    ),
    requestRecord: findRequiredByKey(
      SOURCE_REQUEST_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-request:${joinMvpRecord.stableId}`,
      "provider audit approval join request"
    ),
    responseRecord: findRequiredByKey(
      SOURCE_RESPONSE_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-response:${joinMvpRecord.stableId}`,
      "provider audit approval join response"
    ),
    previewErrorRecord: findRequiredByKey(
      SOURCE_PREVIEW_ERROR_RECORDS,
      `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-error:${joinMvpRecord.stableId}`,
      "provider audit approval join preview error"
    ),
    gateRecords,
    readinessRecords,
    aggregateSummary: SOURCE_AGGREGATE_SUMMARY,
    aggregateGateSummary: SOURCE_AGGREGATE_GATE_SUMMARY,
    aggregateReadinessSummary: SOURCE_AGGREGATE_READINESS_SUMMARY,
    sourceResultCaptureReviewRecord: findRequiredByKey(
      SOURCE_RESULT_CAPTURE_REVIEW_RECORDS,
      joinMvpRecord.sourceProviderDryRunResultCaptureReviewReference,
      "provider dry-run result capture review"
    ),
    sourceResultCaptureOutputReviewRecord: findRequiredByKey(
      SOURCE_RESULT_CAPTURE_OUTPUT_REVIEW_RECORDS,
      joinMvpRecord.sourceProviderDryRunResultCaptureOutputReviewReference,
      "provider dry-run result capture output review"
    ),
    sourceProviderSelectionReviewRecord: findRequiredByKey(
      SOURCE_PROVIDER_SELECTION_REVIEW_RECORDS,
      joinMvpRecord.sourceProviderSelectionCredentialReferenceReviewReference,
      "provider selection credential reference review"
    ),
    sourceProviderAdmissionReviewRecord: findRequiredByKey(
      SOURCE_PROVIDER_ADMISSION_REVIEW_RECORDS,
      joinMvpRecord.sourceProviderDryRunAdmissionReviewReference,
      "provider dry-run admission review"
    ),
    sourceManualApprovalDecisionReviewRecord: findRequiredByKey(
      SOURCE_MANUAL_APPROVAL_DECISION_REVIEW_RECORDS,
      joinMvpRecord.sourceManualApprovalDecisionReviewReference,
      "manual approval decision review"
    ),
    manualApprovalFixtureRecord: findRequiredByKey(
      SOURCE_MANUAL_APPROVAL_FIXTURE_RECORDS,
      joinMvpRecord.sourceManualApprovalFixtureReference,
      "manual approval fixture"
    ),
    manualConfirmationFixtureRecord: findRequiredByKey(
      SOURCE_MANUAL_APPROVAL_FIXTURE_RECORDS,
      joinMvpRecord.sourceManualConfirmationFixtureReference,
      "manual confirmation fixture"
    ),
  };

  assertJoinStableIdentity(bundle.joinInputRecord, joinMvpRecord, "join input");
  assertJoinStableIdentity(
    bundle.admissionCheckRecord,
    joinMvpRecord,
    "admission check"
  );
  assertJoinStableIdentity(
    bundle.auditJoinOutputRecord,
    joinMvpRecord,
    "audit join output"
  );
  assertJoinStableIdentity(
    bundle.approvalJoinOutputRecord,
    joinMvpRecord,
    "approval join output"
  );
  assertJoinStableIdentity(bundle.envelopeRecord, joinMvpRecord, "envelope");
  assertJoinStableIdentity(
    bundle.auditPreviewRecord,
    joinMvpRecord,
    "audit preview"
  );
  assertJoinStableIdentity(
    bundle.approvalPreviewRecord,
    joinMvpRecord,
    "approval preview"
  );
  assertJoinStableIdentity(
    bundle.evidencePreviewRecord,
    joinMvpRecord,
    "evidence preview"
  );
  assertJoinStableIdentity(
    bundle.safetyGateSummaryRecord,
    joinMvpRecord,
    "safety gate summary"
  );
  assertJoinStableIdentity(
    bundle.blockedLivePersistenceSummaryRecord,
    joinMvpRecord,
    "blocked live persistence summary"
  );
  assertJoinStableIdentity(bundle.requestRecord, joinMvpRecord, "request record");
  assertJoinStableIdentity(
    bundle.responseRecord,
    joinMvpRecord,
    "response record"
  );
  assertJoinStableIdentity(
    bundle.previewErrorRecord,
    joinMvpRecord,
    "preview error record"
  );
  bundle.gateRecords.forEach((record) =>
    assertJoinStableIdentity(record, joinMvpRecord, `gate ${record.id}`)
  );
  bundle.readinessRecords.forEach((record) =>
    assertJoinStableIdentity(record, joinMvpRecord, `readiness ${record.id}`)
  );

  assertEqual(
    bundle.sourceResultCaptureReviewRecord.reviewId,
    joinMvpRecord.stableId,
    "result capture review id agreement"
  );
  // Preserve the actual phase-6121 provenance chain as-is. The upstream
  // selection, admission, and manual approval references resolve through older
  // preview layers with stage-specific labels, so this review layer validates
  // reference resolution and workspace/request linkage rather than inventing a
  // parallel identity family.
  assertEqual(
    bundle.sourceProviderSelectionReviewRecord.workspaceTarget,
    joinMvpRecord.workspaceTarget,
    "provider selection workspace agreement"
  );
  assertEqual(
    bundle.sourceProviderAdmissionReviewRecord.workspaceTarget,
    joinMvpRecord.workspaceTarget,
    "provider admission workspace agreement"
  );
  assertEqual(
    bundle.sourceProviderAdmissionReviewRecord.reviewId,
    joinMvpRecord.requestIdentityId,
    "provider admission request identity agreement"
  );
  assertEqual(
    bundle.manualApprovalFixtureRecord.executionMvpId,
    bundle.sourceManualApprovalDecisionReviewRecord.id,
    "manual approval fixture identity agreement"
  );
  assertEqual(
    bundle.manualConfirmationFixtureRecord.executionMvpId,
    bundle.sourceManualApprovalDecisionReviewRecord.id,
    "manual confirmation fixture identity agreement"
  );

  return bundle;
}

function buildReviewKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId
): MinimalProviderAdapterDryRunAuditApprovalJoinReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review:${id}`;
}

function buildOutputReviewKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId
): ProviderAdapterDryRunAuditApprovalJoinOutputReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-output-review:${id}`;
}

function buildGateFailureReviewKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId,
  gateId: ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewId
): ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-gate-failure-review:${id}:${gateId}`;
}

function buildRecoveryPlanKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId
): ProviderAdapterDryRunAuditApprovalJoinRecoveryPlanKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-recovery-plan:${id}`;
}

function buildRecoveryReadinessChecklistKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId,
  readinessId: ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord["id"]
): ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-recovery-readiness:${id}:${readinessId}`;
}

function buildReviewAuditSummaryKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId
): ProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review-audit-summary:${id}`;
}

function buildAcceptancePostureKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId
): ProviderAdapterDryRunAuditApprovalJoinAcceptancePostureKey {
  return `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-acceptance-posture:${id}`;
}

function buildBoundaryStrings(
  bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle
): Readonly<{
  credentialBoundary: readonly string[];
  providerBoundary: readonly string[];
  promptBoundary: readonly string[];
  approvalBoundary: readonly string[];
  persistenceBoundary: readonly string[];
}> {
  return {
    credentialBoundary: [
      "credential reference is opaque label only",
      "credential value is not present",
      "credential value is not read",
      "env vars are not read",
      "provider key is not read",
    ],
    providerBoundary: [
      "selected provider slot is preview-only",
      "backup provider slot is preview-only",
      "local/private alternative is preview-only",
      bundle.joinMvpRecord.providerResponseState,
      bundle.joinMvpRecord.modelOutputState,
      "live provider execution is blocked",
    ],
    promptBoundary: [bundle.joinMvpRecord.promptTransmissionState],
    approvalBoundary: [
      "no real approval request",
      "no real approval recording",
      "approval fixture is preview-only",
      "manual confirmation fixture is preview-only",
      "approval token is not issued",
      "approval lease is not created",
    ],
    persistenceBoundary: [
      "no result persistence",
      "no audit persistence",
      "no approval persistence",
      "no database writes",
      "no file writes",
    ],
  };
}

function buildReviewFindings(
  bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle
): readonly string[] {
  return [
    PREVIEW_ONLY_STATEMENT,
    OUTPUT_REVIEW_STATEMENT,
    "server-only provider adapter dry-run audit and approval join helper exists",
    "provider adapter dry-run audit and approval join is produced in memory only",
    "deterministic provider adapter dry-run audit and approval join only",
    `source result capture review: ${bundle.sourceResultCaptureReviewRecord.key}`,
    `source provider selection review: ${bundle.sourceProviderSelectionReviewRecord.key}`,
    `source provider admission review: ${bundle.sourceProviderAdmissionReviewRecord.key}`,
    `source manual approval decision review: ${bundle.sourceManualApprovalDecisionReviewRecord.key}`,
  ];
}

function buildSafetyStatements(
  bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle
): readonly string[] {
  return [
    PREVIEW_ONLY_STATEMENT,
    "server-only provider adapter dry-run audit and approval join helper exists",
    "provider adapter dry-run audit and approval join is produced in memory only",
    "deterministic provider adapter dry-run audit and approval join only",
    "credential reference is opaque label only",
    "credential value is not present",
    "credential value is not read",
    "env vars are not read",
    "provider key is not read",
    "selected provider slot is preview-only",
    "backup provider slot is preview-only",
    "local/private alternative is preview-only",
    "live provider execution is blocked",
    bundle.joinMvpRecord.providerResponseState,
    bundle.joinMvpRecord.modelOutputState,
    bundle.joinMvpRecord.promptTransmissionState,
    "no frontend request is created",
    "no API route is created",
    "no real approval request",
    "no real approval recording",
    "approval fixture is preview-only",
    "manual confirmation fixture is preview-only",
    "approval token is not issued",
    "approval lease is not created",
    "no queue dispatch",
    "no worker dispatch",
    "no job execution",
    "no retry execution",
    "no fallback execution",
    "no result persistence",
    "no audit persistence",
    "no approval persistence",
    "no database writes",
    "no file writes",
    "recovery is manual review only",
    "retry disabled",
    "fallback disabled",
    `manual approval fixture: ${bundle.manualApprovalFixtureRecord.key}`,
    `manual confirmation fixture: ${bundle.manualConfirmationFixtureRecord.key}`,
    "provider adapter dry-run end-to-end packet MVP comes next",
  ];
}

function buildDeterministicPreviewReferences(
  bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinDeterministicPreviewReferences {
  return {
    requestReference: bundle.requestRecord.key,
    responseReference: bundle.responseRecord.key,
    previewErrorReference: bundle.previewErrorRecord.key,
    resultReference: bundle.joinMvpRecord.resultReference,
    auditReference: bundle.joinMvpRecord.auditReference,
    approvalReference: bundle.joinMvpRecord.approvalReference,
    evidenceReference: bundle.joinMvpRecord.evidenceReference,
    gateReferences: bundle.gateRecords.map((record) => record.key),
    readinessReferences: bundle.readinessRecords.map((record) => record.key),
  };
}

function buildReviewRecord(
  bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle
): BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord {
  const key = buildReviewKey(bundle.joinMvpRecord.stableId);

  return {
    id: bundle.joinMvpRecord.stableId,
    stableReviewId: bundle.joinMvpRecord.stableId,
    key,
    stableReviewKey: key,
    reviewVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review-preview-v1",
    source: REVIEW_SOURCE,
    reviewMode: REVIEW_MODE,
    reviewPosture: REVIEW_POSTURE,
    previewOnlyStatement: PREVIEW_ONLY_STATEMENT,
    label: `Provider audit approval join review for ${bundle.joinMvpRecord.reviewLabel}`,
    reviewLabel: bundle.joinMvpRecord.reviewLabel,
    sourceJoinReviewLabel: bundle.joinMvpRecord.reviewLabel,
    requestLabel: bundle.joinMvpRecord.requestLabel,
    requestIdentityId: bundle.joinMvpRecord.requestIdentityId,
    capabilityFamily: bundle.joinMvpRecord.capabilityFamily,
    workspaceTarget: bundle.joinMvpRecord.workspaceTarget,
    providerSlotLabel: bundle.joinMvpRecord.providerSlotLabel,
    backupProviderSlotLabel: bundle.joinMvpRecord.backupProviderSlotLabel,
    localPrivateAlternativeLabel:
      bundle.joinMvpRecord.localPrivateAlternativeLabel,
    opaqueCredentialReferenceLabel:
      bundle.joinMvpRecord.opaqueCredentialReferenceLabel,
    severity: "high",
    currentReadiness: CURRENT_READINESS,
    sourceMinimalProviderAdapterDryRunAuditApprovalJoinMvpReference:
      bundle.joinMvpRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinInputReference:
      bundle.joinInputRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinAdmissionCheckReference:
      bundle.admissionCheckRecord.key,
    sourceProviderAdapterDryRunAuditJoinOutputReference:
      bundle.auditJoinOutputRecord.key,
    sourceProviderAdapterDryRunApprovalJoinOutputReference:
      bundle.approvalJoinOutputRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinEnvelopeReference:
      bundle.envelopeRecord.key,
    sourceProviderAdapterDryRunAuditPreviewReference:
      bundle.auditPreviewRecord.key,
    sourceProviderAdapterDryRunApprovalPreviewReference:
      bundle.approvalPreviewRecord.key,
    sourceProviderAdapterDryRunAuditApprovalEvidencePreviewReference:
      bundle.evidencePreviewRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaryReference:
      bundle.safetyGateSummaryRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaryReference:
      bundle.blockedLivePersistenceSummaryRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinRequestReference:
      bundle.requestRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinResponseReference:
      bundle.responseRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinPreviewErrorReference:
      bundle.previewErrorRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinGateReferences:
      bundle.gateRecords.map((record) => record.key),
    sourceProviderAdapterDryRunAuditApprovalJoinReadinessReferences:
      bundle.readinessRecords.map((record) => record.key),
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateSummaryReference:
      bundle.aggregateSummary.version,
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateGateSummaryReference:
      bundle.aggregateGateSummary.version,
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateReadinessSummaryReference:
      bundle.aggregateReadinessSummary.version,
    sourceProviderDryRunResultCaptureReviewReference:
      bundle.sourceResultCaptureReviewRecord.key,
    sourceProviderDryRunResultCaptureOutputReviewReference:
      bundle.sourceResultCaptureOutputReviewRecord.key,
    sourceProviderSelectionCredentialReferenceReviewReference:
      bundle.sourceProviderSelectionReviewRecord.key,
    sourceProviderDryRunAdmissionReviewReference:
      bundle.sourceProviderAdmissionReviewRecord.key,
    sourceManualApprovalDecisionReviewReference:
      bundle.sourceManualApprovalDecisionReviewRecord.key,
    sourceManualApprovalFixtureReference:
      bundle.manualApprovalFixtureRecord.key,
    sourceManualConfirmationFixtureReference:
      bundle.manualConfirmationFixtureRecord.key,
    auditJoinId: bundle.joinMvpRecord.auditJoinId,
    approvalJoinId: bundle.joinMvpRecord.approvalJoinId,
    joinDigest: bundle.joinMvpRecord.joinDigest,
    resultReference: bundle.joinMvpRecord.resultReference,
    auditReference: bundle.joinMvpRecord.auditReference,
    approvalReference: bundle.joinMvpRecord.approvalReference,
    evidenceReference: bundle.joinMvpRecord.evidenceReference,
    deterministicPreviewReferences: buildDeterministicPreviewReferences(bundle),
    reviewFindings: buildReviewFindings(bundle),
    blockedLiveActions:
      bundle.blockedLivePersistenceSummaryRecord.blockedLiveActions,
    safetyStatements: buildSafetyStatements(bundle),
    nextSafeAction:
      "Advance to the backend-owned minimal manual-gated provider adapter dry-run end-to-end packet MVP without enabling provider execution or persistence in this review batch.",
  };
}

function buildOutputReviewRecord(
  bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinOutputReviewRecord {
  const boundaries = buildBoundaryStrings(bundle);

  return {
    id: bundle.joinMvpRecord.stableId,
    key: buildOutputReviewKey(bundle.joinMvpRecord.stableId),
    outputReviewVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-output-review-preview-v1",
    providerAdapterDryRunAuditApprovalJoinReviewId: bundle.joinMvpRecord.stableId,
    sourceMinimalProviderAdapterDryRunAuditApprovalJoinMvpReference:
      bundle.joinMvpRecord.key,
    sourceProviderAdapterDryRunAuditJoinOutputReference:
      bundle.auditJoinOutputRecord.key,
    sourceProviderAdapterDryRunApprovalJoinOutputReference:
      bundle.approvalJoinOutputRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinEnvelopeReference:
      bundle.envelopeRecord.key,
    sourceProviderAdapterDryRunAuditPreviewReference:
      bundle.auditPreviewRecord.key,
    sourceProviderAdapterDryRunApprovalPreviewReference:
      bundle.approvalPreviewRecord.key,
    sourceProviderAdapterDryRunAuditApprovalEvidencePreviewReference:
      bundle.evidencePreviewRecord.key,
    joinState: bundle.joinMvpRecord.joinState,
    auditJoinState: bundle.joinMvpRecord.auditJoinState,
    approvalJoinState: bundle.joinMvpRecord.approvalJoinState,
    auditJoinId: bundle.joinMvpRecord.auditJoinId,
    approvalJoinId: bundle.joinMvpRecord.approvalJoinId,
    joinDigest: bundle.joinMvpRecord.joinDigest,
    resultReference: bundle.joinMvpRecord.resultReference,
    auditReference: bundle.joinMvpRecord.auditReference,
    approvalReference: bundle.joinMvpRecord.approvalReference,
    evidenceReference: bundle.joinMvpRecord.evidenceReference,
    credentialBoundary: boundaries.credentialBoundary,
    providerBoundary: boundaries.providerBoundary,
    promptBoundary: boundaries.promptBoundary,
    approvalBoundary: boundaries.approvalBoundary,
    persistenceBoundary: boundaries.persistenceBoundary,
    operatorFacingExplanation:
      "The reviewed output is the deterministic joined fixture produced in memory only. It is not provider output, not model output, and not a persisted approval artifact.",
    remainingBlockers: bundle.blockedLivePersistenceSummaryRecord.blockedLiveActions,
    nextSafeAction:
      "Keep the joined fixture review-only and carry its references into the end-to-end packet MVP checklist.",
    explicitProviderAdapterDryRunAuditApprovalJoinFixtureOnlyNoRealOutputNoProviderCallNoPersistenceStatement:
      OUTPUT_REVIEW_STATEMENT,
  };
}

function buildGateSeverity(
  gateId: ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewId
): MinimalProviderAdapterDryRunAuditApprovalJoinReviewSeverity {
  if (
    gateId.includes("persistence") ||
    gateId.includes("database") ||
    gateId.includes("file") ||
    gateId.includes("approval") ||
    gateId.includes("queue") ||
    gateId.includes("worker") ||
    gateId.includes("job") ||
    gateId.includes("provider-execution")
  ) {
    return "critical";
  }

  if (
    gateId.includes("provider") ||
    gateId.includes("prompt") ||
    gateId.includes("credential") ||
    gateId.includes("environment") ||
    gateId.includes("model")
  ) {
    return "high";
  }

  return "medium";
}

function buildGateRecoveryAction(
  gateRecord: ProviderAdapterDryRunAuditApprovalJoinGateRecord
): string {
  if (
    gateRecord.id.includes("approval") ||
    gateRecord.id.includes("token") ||
    gateRecord.id.includes("lease")
  ) {
    return "Keep approval fixture-only behavior in place and continue to block real approval request, recording, token issuance, and lease creation.";
  }

  if (
    gateRecord.id.includes("queue") ||
    gateRecord.id.includes("worker") ||
    gateRecord.id.includes("job")
  ) {
    return "Keep queue, worker, and job dispatch disabled while the next batch remains preview-only and manual-review-driven.";
  }

  if (
    gateRecord.id.includes("persistence") ||
    gateRecord.id.includes("database") ||
    gateRecord.id.includes("file")
  ) {
    return "Keep result, audit, approval, database, and file persistence disabled and review only the in-memory references.";
  }

  if (
    gateRecord.id.includes("provider") ||
    gateRecord.id.includes("model") ||
    gateRecord.id.includes("prompt")
  ) {
    return "Keep provider execution, model calls, and prompt sending blocked while the deterministic preview chain is reviewed manually.";
  }

  return "Re-review the deterministic source chain and preserve the preview-only boundary without enabling any blocked live action.";
}

function buildGateFailureExplanation(
  gateRecord: ProviderAdapterDryRunAuditApprovalJoinGateRecord
): string {
  return `Preview-only gate review confirms ${gateRecord.label} remains ${gateRecord.currentState}; live action ${gateRecord.blockedLiveAction} stays blocked in this fixture-only phase.`;
}

function buildGateFailureReviewRecord(
  bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle,
  gateRecord: ProviderAdapterDryRunAuditApprovalJoinGateRecord
): ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewRecord {
  return {
    id: bundle.joinMvpRecord.stableId,
    key: buildGateFailureReviewKey(bundle.joinMvpRecord.stableId, gateRecord.id),
    gateFailureReviewVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-gate-failure-review-preview-v1",
    providerAdapterDryRunAuditApprovalJoinReviewId: bundle.joinMvpRecord.stableId,
    sourceMinimalProviderAdapterDryRunAuditApprovalJoinMvpReference:
      bundle.joinMvpRecord.key,
    sourceGateId: gateRecord.id,
    sourceGateKey: gateRecord.key,
    requiredState: gateRecord.requiredState,
    currentState: gateRecord.currentState,
    evidence: gateRecord.evidence,
    blockedLiveAction: gateRecord.blockedLiveAction,
    severity: buildGateSeverity(gateRecord.id),
    capabilityFamily: bundle.joinMvpRecord.capabilityFamily,
    workspaceTarget: bundle.joinMvpRecord.workspaceTarget,
    providerSlotLabel: bundle.joinMvpRecord.providerSlotLabel,
    opaqueCredentialReferenceLabel:
      bundle.joinMvpRecord.opaqueCredentialReferenceLabel,
    failureExplanation: buildGateFailureExplanation(gateRecord),
    manualRecoveryAction: buildGateRecoveryAction(gateRecord),
    retryState: RETRY_POSTURE,
    fallbackState: FALLBACK_POSTURE,
    nextSafeAction:
      "Keep the gate blocked and fold the boundary into the next backend-owned end-to-end packet MVP review checklist.",
    explicitNoLiveGatePassStatement: NO_LIVE_GATE_PASS_STATEMENT,
  };
}

function resolveBlockedAutomatedAction(
  readinessId: ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord["id"]
): string {
  if (readinessId.includes("provider")) {
    return "live provider execution";
  }

  if (readinessId.includes("prompt")) {
    return "prompt sending";
  }

  if (readinessId.includes("model")) {
    return "model calls";
  }

  if (readinessId.includes("frontend")) {
    return "frontend request creation";
  }

  if (readinessId.includes("api-route")) {
    return "API route creation";
  }

  if (readinessId.includes("queue")) {
    return "queue dispatch";
  }

  if (readinessId.includes("worker")) {
    return "worker dispatch";
  }

  if (readinessId.includes("job")) {
    return "job execution";
  }

  if (readinessId.includes("result-persistence")) {
    return "result persistence";
  }

  if (readinessId.includes("audit-persistence")) {
    return "audit persistence";
  }

  if (readinessId.includes("approval-persistence")) {
    return "approval persistence";
  }

  if (readinessId.includes("database")) {
    return "database writes";
  }

  if (readinessId.includes("file")) {
    return "file writes";
  }

  return "none";
}

function resolveReadinessReviewState(
  readinessRecord: ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord
): MinimalProviderAdapterDryRunAuditApprovalJoinReadinessReviewState {
  if (
    readinessRecord.id === "provider-boundary-state" ||
    readinessRecord.id === "prompt-boundary-state" ||
    readinessRecord.id === "model-boundary-state" ||
    readinessRecord.id === "frontend-boundary-state" ||
    readinessRecord.id === "api-route-boundary-state"
  ) {
    return "backend future required";
  }

  if (resolveBlockedAutomatedAction(readinessRecord.id) !== "none") {
    return "blocked";
  }

  return "reviewed";
}

function resolveReadinessOwner(
  readinessRecord: ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord
): MinimalProviderAdapterDryRunAuditApprovalJoinReadinessOwner {
  if (
    readinessRecord.id === "server-only-helper-state" ||
    readinessRecord.id === "privacy-redaction-state" ||
    readinessRecord.id === "kill-switch-state" ||
    readinessRecord.id === "single-run-lock-state" ||
    readinessRecord.id === "idempotency-replay-state" ||
    readinessRecord.id === "timeout-cancel-state"
  ) {
    return "safety review";
  }

  if (resolveReadinessReviewState(readinessRecord) !== "reviewed") {
    return "backend future";
  }

  return "operator";
}

function buildReadinessManualAction(
  readinessRecord: ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord
): string {
  const reviewState = resolveReadinessReviewState(readinessRecord);
  const blockedAction = resolveBlockedAutomatedAction(readinessRecord.id);

  if (reviewState === "backend future required") {
    return `Plan the next backend-owned packet stage for ${readinessRecord.label} without enabling ${blockedAction}.`;
  }

  if (reviewState === "blocked") {
    return `Keep ${blockedAction} blocked and preserve the preview-only posture for ${readinessRecord.label}.`;
  }

  return `Preserve ${readinessRecord.label} as reviewed preview evidence and carry it forward unchanged.`;
}

function buildRecoveryPlanPreviewRecord(
  bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinRecoveryPlanPreviewRecord {
  const blockedReadinessRecords = bundle.readinessRecords.filter(
    (record) => resolveReadinessReviewState(record) !== "reviewed"
  );

  return {
    id: bundle.joinMvpRecord.stableId,
    key: buildRecoveryPlanKey(bundle.joinMvpRecord.stableId),
    recoveryPlanVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-recovery-plan-preview-v1",
    providerAdapterDryRunAuditApprovalJoinReviewId: bundle.joinMvpRecord.stableId,
    reviewedSourceReferences: [
      bundle.joinMvpRecord.key,
      bundle.joinInputRecord.key,
      bundle.admissionCheckRecord.key,
      bundle.auditJoinOutputRecord.key,
      bundle.approvalJoinOutputRecord.key,
      bundle.envelopeRecord.key,
      bundle.auditPreviewRecord.key,
      bundle.approvalPreviewRecord.key,
      bundle.evidencePreviewRecord.key,
      bundle.safetyGateSummaryRecord.key,
      bundle.blockedLivePersistenceSummaryRecord.key,
      bundle.requestRecord.key,
      bundle.responseRecord.key,
      bundle.previewErrorRecord.key,
      bundle.sourceResultCaptureReviewRecord.key,
      bundle.sourceResultCaptureOutputReviewRecord.key,
      bundle.sourceProviderSelectionReviewRecord.key,
      bundle.sourceProviderAdmissionReviewRecord.key,
      bundle.sourceManualApprovalDecisionReviewRecord.key,
      bundle.manualApprovalFixtureRecord.key,
      bundle.manualConfirmationFixtureRecord.key,
    ],
    blockedGateCount: bundle.gateRecords.length,
    blockedReadinessCount: blockedReadinessRecords.length,
    recoveryPosture: RECOVERY_POSTURE,
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    requiredManualChecks: [
      "Review the joined audit, approval, and evidence references in memory only.",
      "Confirm all gate records remain preview-only and do not pass live execution.",
      "Confirm all readiness rows preserve backend-only and not-persistent boundaries.",
      "Reconfirm approval fixture and manual confirmation fixture remain deterministic previews.",
      "Carry the deterministic request, response, and preview-error records into the next packet checklist.",
    ],
    blockedAutomatedActions:
      bundle.blockedLivePersistenceSummaryRecord.blockedLiveActions,
    nextSafeAction:
      "Continue with manual review only and prepare the end-to-end packet MVP without enabling any blocked automation.",
    explicitNoRetryNoFallbackNoProviderNoPromptNoSecretNoPersistenceStatement:
      RECOVERY_STATEMENT,
  };
}

function buildRecoveryReadinessChecklistRecord(
  bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle,
  readinessRecord: ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord
): ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistRecord {
  return {
    id: bundle.joinMvpRecord.stableId,
    key: buildRecoveryReadinessChecklistKey(
      bundle.joinMvpRecord.stableId,
      readinessRecord.id
    ),
    checklistVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-recovery-readiness-checklist-v1",
    providerAdapterDryRunAuditApprovalJoinReviewId: bundle.joinMvpRecord.stableId,
    sourceReadinessId: readinessRecord.id,
    sourceReadinessKey: readinessRecord.key,
    label: readinessRecord.label,
    currentSourceState: readinessRecord.state,
    evidence: readinessRecord.evidence,
    owner: resolveReadinessOwner(readinessRecord),
    reviewState: resolveReadinessReviewState(readinessRecord),
    manualAction: buildReadinessManualAction(readinessRecord),
    blockedAutomatedAction: resolveBlockedAutomatedAction(readinessRecord.id),
    currentReadiness: CURRENT_READINESS,
    nextSafeAction: readinessRecord.nextSafeAction,
  };
}

function buildReviewAuditSummaryRecord(
  bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryRecord {
  return {
    id: bundle.joinMvpRecord.stableId,
    key: buildReviewAuditSummaryKey(bundle.joinMvpRecord.stableId),
    auditSummaryVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-review-audit-summary-preview-v1",
    providerAdapterDryRunAuditApprovalJoinReviewId: bundle.joinMvpRecord.stableId,
    auditPosture: AUDIT_POSTURE,
    sourceMinimalProviderAdapterDryRunAuditApprovalJoinMvpReference:
      bundle.joinMvpRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinRequestReference:
      bundle.requestRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinResponseReference:
      bundle.responseRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinPreviewErrorReference:
      bundle.previewErrorRecord.key,
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateSummaryReference:
      bundle.aggregateSummary.version,
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateGateSummaryReference:
      bundle.aggregateGateSummary.version,
    sourceProviderAdapterDryRunAuditApprovalJoinAggregateReadinessSummaryReference:
      bundle.aggregateReadinessSummary.version,
    sourceProviderAdapterDryRunAuditApprovalJoinGateCount: bundle.gateRecords.length,
    sourceProviderAdapterDryRunAuditApprovalJoinReadinessCount:
      bundle.readinessRecords.length,
    joinReferenceState: "preview-only / not persisted",
    captureReferenceState: "preview-only / not persisted",
    auditReferenceState: "preview-only / not persisted",
    approvalReferenceState: "preview-only / not persisted",
    evidenceReferenceState: "preview-only / not persisted",
    serverOnlyJoinHelperEvidenceSummary:
      "server-only provider adapter dry-run audit and approval join helper exists",
    deterministicJoinEvidenceSummary:
      "deterministic provider adapter dry-run audit and approval join only",
    failedGateSummary: `${bundle.gateRecords.length} preview-only gate reviews remain blocked for live actions.`,
    recoverySummary: `${bundle.readinessRecords.length} readiness rows remain review-only; recovery is manual review only.`,
    blockedActionSummary:
      "No live provider execution. No prompt sending. No real approval. No persistence.",
    noProviderOutputStatement: "No provider output.",
    noModelOutputStatement: "No model output.",
    noPromptSendingStatement: "No prompt sending.",
    noResultPersistenceStatement: "No result persistence.",
    noAuditPersistenceStatement: "No audit persistence.",
    noApprovalPersistenceStatement: "No approval persistence.",
    noDatabaseWriteStatement: "No database write.",
    noFileWriteStatement: "No file write.",
    nextProviderAdapterDryRunEndToEndPacketMvpRequirement:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
  };
}

function buildAcceptancePostureRecord(
  bundle: ProviderAdapterAuditApprovalJoinReviewSourceBundle
): ProviderAdapterDryRunAuditApprovalJoinAcceptancePostureRecord {
  return {
    id: bundle.joinMvpRecord.stableId,
    key: buildAcceptancePostureKey(bundle.joinMvpRecord.stableId),
    acceptancePostureVersion:
      "backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-acceptance-posture-preview-v1",
    providerAdapterDryRunAuditApprovalJoinReviewId: bundle.joinMvpRecord.stableId,
    acceptanceState: ACCEPTANCE_STATE,
    fixtureOnlyAcceptanceSummary:
      "Acceptance is limited to the deterministic provider audit approval join fixture only.",
    backendOnlyAcceptanceSummary:
      "Acceptance is limited to backend-only review and does not include any frontend-callable execution path.",
    serverOnlyAcceptanceSummary:
      "Acceptance depends on the existing server-only helper and does not authorize client-side execution.",
    inMemoryOnlyAcceptanceSummary:
      "Acceptance covers in-memory references only and does not extend to persisted records.",
    credentialReferenceBoundarySummary:
      "Credential reference remains an opaque label only and no credential value or provider key is read.",
    providerExecutionBlockers: [
      "live provider execution is blocked",
      "provider response is not received from provider",
      "model output is not generated by provider/model",
    ],
    promptTransmissionBlockers: [
      "prompt transmission state is not sent",
    ],
    approvalBlockers: [
      "no real approval request",
      "no real approval recording",
      "approval fixture is preview-only",
      "manual confirmation fixture is preview-only",
    ],
    tokenLeaseBlockers: [
      "approval token is not issued",
      "approval lease is not created",
    ],
    queueWorkerJobDispatchBlockers: [
      "no queue dispatch",
      "no worker dispatch",
      "no job execution",
    ],
    retryFallbackBlockers: ["retry disabled", "fallback disabled"],
    resultPersistenceBlockers: ["no result persistence"],
    auditPersistenceBlockers: ["no audit persistence"],
    approvalPersistenceBlockers: ["no approval persistence"],
    databaseFileWriteBlockers: ["no database writes", "no file writes"],
    credentialReferenceBlockers: [
      "credential reference is opaque label only",
      "credential value is not present",
      "credential value is not read",
      "env vars are not read",
      "provider key is not read",
    ],
    requiredEvidence: [
      bundle.joinMvpRecord.resultReference,
      bundle.joinMvpRecord.auditReference,
      bundle.joinMvpRecord.approvalReference,
      bundle.joinMvpRecord.evidenceReference,
      bundle.requestRecord.key,
      bundle.responseRecord.key,
      bundle.previewErrorRecord.key,
    ],
    nextSafeAction:
      "Limit acceptance to the deterministic fixture MVP and carry all live execution and persistence blockers forward to the next packet batch.",
    explicitProviderAdapterDryRunAuditApprovalJoinFixtureAcceptedLiveProviderExecutionAndPersistenceNotAcceptedStatement:
      ACCEPTANCE_STATEMENT,
  };
}

function groupByString<T>(
  records: readonly T[],
  pickGroupValue: (record: T) => string
): ReadonlyArray<Readonly<{ value: string; records: readonly T[] }>> {
  return uniqueStrings(records.map((record) => pickGroupValue(record))).map(
    (value) => ({
      value,
      records: records.filter((record) => pickGroupValue(record) === value),
    })
  );
}

assertCurrentSourceShape();

const SOURCE_BUNDLES = SOURCE_JOIN_MVP_RECORDS.map((record) =>
  resolveSourceBundle(record)
);

const REVIEW_RECORDS = SOURCE_BUNDLES.map((bundle) => buildReviewRecord(bundle));
const OUTPUT_REVIEW_RECORDS = SOURCE_BUNDLES.map((bundle) =>
  buildOutputReviewRecord(bundle)
);
const GATE_FAILURE_REVIEW_RECORDS = SOURCE_BUNDLES.flatMap((bundle) =>
  bundle.gateRecords.map((gateRecord) =>
    buildGateFailureReviewRecord(bundle, gateRecord)
  )
);
const RECOVERY_PLAN_PREVIEW_RECORDS = SOURCE_BUNDLES.map((bundle) =>
  buildRecoveryPlanPreviewRecord(bundle)
);
const RECOVERY_READINESS_CHECKLIST_RECORDS = SOURCE_BUNDLES.flatMap((bundle) =>
  bundle.readinessRecords.map((readinessRecord) =>
    buildRecoveryReadinessChecklistRecord(bundle, readinessRecord)
  )
);
const REVIEW_AUDIT_SUMMARY_RECORDS = SOURCE_BUNDLES.map((bundle) =>
  buildReviewAuditSummaryRecord(bundle)
);
const ACCEPTANCE_POSTURE_RECORDS = SOURCE_BUNDLES.map((bundle) =>
  buildAcceptancePostureRecord(bundle)
);

export function buildStableMinimalProviderAdapterDryRunAuditApprovalJoinReviewKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId
): MinimalProviderAdapterDryRunAuditApprovalJoinReviewKey {
  return buildReviewKey(id);
}

export function buildStableProviderAdapterDryRunAuditApprovalJoinOutputReviewKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId
): ProviderAdapterDryRunAuditApprovalJoinOutputReviewKey {
  return buildOutputReviewKey(id);
}

export function buildStableProviderAdapterDryRunAuditApprovalJoinGateFailureReviewKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId,
  gateId: ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewId
): ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewKey {
  return buildGateFailureReviewKey(id, gateId);
}

export function buildStableProviderAdapterDryRunAuditApprovalJoinRecoveryPlanKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId
): ProviderAdapterDryRunAuditApprovalJoinRecoveryPlanKey {
  return buildRecoveryPlanKey(id);
}

export function buildStableProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId,
  readinessId: ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord["id"]
): ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistKey {
  return buildRecoveryReadinessChecklistKey(id, readinessId);
}

export function buildStableProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId
): ProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryKey {
  return buildReviewAuditSummaryKey(id);
}

export function buildStableProviderAdapterDryRunAuditApprovalJoinAcceptancePostureKey(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinReviewId
): ProviderAdapterDryRunAuditApprovalJoinAcceptancePostureKey {
  return buildAcceptancePostureKey(id);
}

export function listBackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviews():
  readonly BackendOwnedMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinReviewRecord[] {
  return cloneList(REVIEW_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinOutputReviewRecords():
  readonly ProviderAdapterDryRunAuditApprovalJoinOutputReviewRecord[] {
  return cloneList(OUTPUT_REVIEW_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinGateFailureReviewRecords():
  readonly ProviderAdapterDryRunAuditApprovalJoinGateFailureReviewRecord[] {
  return cloneList(GATE_FAILURE_REVIEW_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinRecoveryPlanPreviews():
  readonly ProviderAdapterDryRunAuditApprovalJoinRecoveryPlanPreviewRecord[] {
  return cloneList(RECOVERY_PLAN_PREVIEW_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistRecords():
  readonly ProviderAdapterDryRunAuditApprovalJoinRecoveryReadinessChecklistRecord[] {
  return cloneList(RECOVERY_READINESS_CHECKLIST_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaries():
  readonly ProviderAdapterDryRunAuditApprovalJoinReviewAuditSummaryRecord[] {
  return cloneList(REVIEW_AUDIT_SUMMARY_RECORDS);
}

export function listProviderAdapterDryRunAuditApprovalJoinAcceptancePostureRecords():
  readonly ProviderAdapterDryRunAuditApprovalJoinAcceptancePostureRecord[] {
  return cloneList(ACCEPTANCE_POSTURE_RECORDS);
}

export function groupProviderAdapterDryRunAuditApprovalJoinReviewsByCapabilityFamily():
  readonly ProviderAdapterDryRunAuditApprovalJoinReviewCapabilityFamilyGroup[] {
  return groupByString(
    REVIEW_RECORDS,
    (record) => record.capabilityFamily
  ).map(({ records }) => {
    const firstRecord = records[0];

    if (!firstRecord) {
      throw new Error("Missing capability family review group.");
    }

    return {
      capabilityFamily: firstRecord.capabilityFamily,
      reviewCount: records.length,
      reviews: cloneList(records),
    };
  });
}

export function groupProviderAdapterDryRunAuditApprovalJoinReviewsByWorkspaceTarget():
  readonly ProviderAdapterDryRunAuditApprovalJoinReviewWorkspaceGroup[] {
  return groupByString(REVIEW_RECORDS, (record) => record.workspaceTarget).map(
    ({ records }) => {
      const firstRecord = records[0];

      if (!firstRecord) {
        throw new Error("Missing workspace review group.");
      }

      return {
        workspaceTarget: firstRecord.workspaceTarget,
        reviewCount: records.length,
        reviews: cloneList(records),
      };
    }
  );
}

export function groupProviderAdapterDryRunAuditApprovalJoinReviewsByProviderSlot():
  readonly ProviderAdapterDryRunAuditApprovalJoinReviewProviderSlotGroup[] {
  return groupByString(REVIEW_RECORDS, (record) => record.providerSlotLabel).map(
    ({ records }) => {
      const firstRecord = records[0];

      if (!firstRecord) {
        throw new Error("Missing provider slot review group.");
      }

      return {
        providerSlotLabel: firstRecord.providerSlotLabel,
        reviewCount: records.length,
        reviews: cloneList(records),
      };
    }
  );
}

export function groupProviderAdapterDryRunAuditApprovalJoinReviewsByCredentialReference():
  readonly ProviderAdapterDryRunAuditApprovalJoinReviewCredentialReferenceGroup[] {
  return groupByString(
    REVIEW_RECORDS,
    (record) => record.opaqueCredentialReferenceLabel
  ).map(({ records }) => {
    const firstRecord = records[0];

    if (!firstRecord) {
      throw new Error("Missing credential reference review group.");
    }

    return {
      credentialReferenceLabel: firstRecord.opaqueCredentialReferenceLabel,
      reviewCount: records.length,
      reviews: cloneList(records),
    };
  });
}

export function buildProviderAdapterDryRunAuditApprovalJoinReviewSummary():
  ProviderAdapterDryRunAuditApprovalJoinReviewSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    highestDetectedPhase:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_PHASE,
    latestCompletedBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_MVP_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    reviewCount: REVIEW_RECORDS.length,
    outputReviewCount: OUTPUT_REVIEW_RECORDS.length,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    auditSummaryCount: REVIEW_AUDIT_SUMMARY_RECORDS.length,
    acceptancePostureCount: ACCEPTANCE_POSTURE_RECORDS.length,
    capabilityFamilyGroupCount:
      groupProviderAdapterDryRunAuditApprovalJoinReviewsByCapabilityFamily().length,
    workspaceTargetGroupCount:
      groupProviderAdapterDryRunAuditApprovalJoinReviewsByWorkspaceTarget().length,
    providerSlotGroupCount:
      groupProviderAdapterDryRunAuditApprovalJoinReviewsByProviderSlot().length,
    credentialReferenceGroupCount:
      groupProviderAdapterDryRunAuditApprovalJoinReviewsByCredentialReference()
        .length,
    currentReadiness: CURRENT_READINESS,
    acceptanceState: ACCEPTANCE_STATE,
    summaryLines: cloneList(REVIEW_SUMMARY_LINES),
  };
}

export function buildProviderAdapterDryRunAuditApprovalJoinOutputReviewSummary():
  ProviderAdapterDryRunAuditApprovalJoinOutputReviewSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    outputReviewCount: OUTPUT_REVIEW_RECORDS.length,
    outputReviewStatement: OUTPUT_REVIEW_STATEMENT,
    summaryLines: cloneList(OUTPUT_REVIEW_SUMMARY_LINES),
    nextSafeAction:
      "Keep the joined fixture output review-only and carry it into the next packet batch.",
  };
}

export function buildProviderAdapterDryRunAuditApprovalJoinGateFailureSummary():
  ProviderAdapterDryRunAuditApprovalJoinGateFailureSummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    gateFailureCount: GATE_FAILURE_REVIEW_RECORDS.length,
    noLiveGatePassStatement: NO_LIVE_GATE_PASS_STATEMENT,
    summaryLines: cloneList(GATE_FAILURE_SUMMARY_LINES),
    topFailedGateLabels: uniqueStrings(
      GATE_FAILURE_REVIEW_RECORDS.map((record) => record.sourceGateId)
    ),
    nextSafeAction:
      "Keep every gate preview-only and do not allow any live gate pass in this batch.",
  };
}

export function buildProviderAdapterDryRunAuditApprovalJoinRecoverySummary():
  ProviderAdapterDryRunAuditApprovalJoinRecoverySummary {
  return {
    currentBatch:
      BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH,
    nextLikelyBatch:
      NEXT_BACKEND_OWNED_MINIMAL_MANUAL_GATED_PROVIDER_ADAPTER_DRY_RUN_END_TO_END_PACKET_MVP_BATCH,
    recoveryPlanCount: RECOVERY_PLAN_PREVIEW_RECORDS.length,
    readinessChecklistCount: RECOVERY_READINESS_CHECKLIST_RECORDS.length,
    currentReadiness: CURRENT_READINESS,
    recoveryPosture: RECOVERY_POSTURE,
    retryPosture: RETRY_POSTURE,
    fallbackPosture: FALLBACK_POSTURE,
    recoveryStatement: RECOVERY_STATEMENT,
    summaryLines: cloneList(RECOVERY_SUMMARY_LINES),
    nextSafeAction:
      "Continue with manual review only and carry the recovery evidence into the end-to-end packet MVP.",
  };
}

export function buildProviderAdapterDryRunEndToEndPacketMvpChecklist():
  ProviderAdapterDryRunEndToEndPacketMvpChecklist {
  return cloneList(END_TO_END_PACKET_MVP_CHECKLIST_LINES);
}

export function uniqueProviderAdapterDryRunAuditApprovalJoinReviewDisplayStrings():
  ProviderAdapterDryRunAuditApprovalJoinReviewDisplayStrings {
  return cloneList(
    uniqueStrings([
      ...MINIMAL_PROVIDER_ADAPTER_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_SECTION_TITLES,
      ...REVIEW_SUMMARY_LINES,
      ...OUTPUT_REVIEW_SUMMARY_LINES,
      ...GATE_FAILURE_SUMMARY_LINES,
      ...RECOVERY_SUMMARY_LINES,
      ...END_TO_END_PACKET_MVP_CHECKLIST_LINES,
      ...REVIEW_RECORDS.map((record) => record.label),
      ...REVIEW_RECORDS.map((record) => record.reviewLabel),
      ...REVIEW_RECORDS.flatMap((record) => record.reviewFindings),
      ...REVIEW_RECORDS.flatMap((record) => record.safetyStatements),
      ...OUTPUT_REVIEW_RECORDS.map(
        (record) => record.operatorFacingExplanation
      ),
      ...GATE_FAILURE_REVIEW_RECORDS
        .slice(0, EXPECTED_UNIQUE_GATE_COUNT)
        .map((record) => record.sourceGateId),
      ...RECOVERY_READINESS_CHECKLIST_RECORDS
        .slice(0, EXPECTED_UNIQUE_READINESS_COUNT)
        .map((record) => record.label),
    ])
  );
}
