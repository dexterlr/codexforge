import "server-only";

import { listSyntheticMvpManualApprovalFixtures } from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  listSyntheticResultCaptureApprovalPreviews,
  listSyntheticResultCaptureAuditPreviews,
  listSyntheticResultCaptureEvidencePackets,
  listSyntheticResultCaptureOutputs,
} from "../min-synth-result-capture";
import { buildNextAuditApprovalJoinReviewRecoveryChecklist } from "./min-synth-audit-join-catalog";
import type {
  MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId,
  MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRunInput,
  MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpServerRunRecord,
  SyntheticApprovalJoinId,
  SyntheticAuditApprovalJoinDigest,
  SyntheticAuditApprovalJoinPayload,
  SyntheticAuditApprovalJoinApprovalReference,
  SyntheticAuditApprovalJoinAuditReference,
  SyntheticAuditApprovalJoinEvidenceReference,
  SyntheticAuditApprovalJoinResultReference,
  SyntheticAuditJoinId,
} from "./min-synth-audit-join-types";

const STATIC_FIXTURE_ID: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId =
  "conversational-planning-request";

function assertEqual<T extends string>(
  actual: T,
  expected: T,
  message: string
): void {
  if (actual !== expected) {
    throw new Error(message);
  }
}

function findRequired<T>(
  records: readonly T[],
  predicate: (record: T) => boolean,
  label: string
): T {
  const record = records.find(predicate);

  if (!record) {
    throw new Error(`Missing ${label}.`);
  }

  return record;
}

function buildSyntheticAuditJoinId(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditJoinId {
  return `synthetic-audit-join-preview:${id}`;
}

function buildSyntheticApprovalJoinId(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticApprovalJoinId {
  return `synthetic-approval-join-preview:${id}`;
}

function buildSyntheticAuditApprovalJoinDigest(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinDigest {
  return `synthetic-audit-approval-join-digest-preview:${id}:in-memory-only`;
}

function buildSyntheticAuditApprovalJoinResultReference(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinResultReference {
  return `synthetic-audit-approval-join-result-reference-preview:${id}`;
}

function buildSyntheticAuditApprovalJoinAuditReference(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinAuditReference {
  return `synthetic-audit-approval-join-audit-reference-preview:${id}`;
}

function buildSyntheticAuditApprovalJoinApprovalReference(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinApprovalReference {
  return `synthetic-audit-approval-join-approval-reference-preview:${id}`;
}

function buildSyntheticAuditApprovalJoinEvidenceReference(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinEvidenceReference {
  return `synthetic-audit-approval-join-evidence-preview:${id}`;
}

function buildSyntheticAuditApprovalJoinPayload(
  id: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpId
): SyntheticAuditApprovalJoinPayload {
  return {
    label: "static synthetic audit and approval join placeholder only",
    joinEnvelopeState: "preview-only",
    evidenceDigest: buildSyntheticAuditApprovalJoinDigest(id),
    auditPreviewState: "preview-only / not persisted",
    approvalPreviewState: "preview-only / not persisted",
    evidencePreviewState: "preview-only / not persisted",
  };
}

export function joinMinimalManualGatedSyntheticDryRunAuditAndApprovalMvp(
  input: MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpRunInput
): MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpServerRunRecord {
  assertEqual(
    input.backendOwnedMode,
    "backend-owned",
    "Backend-owned mode is required."
  );
  assertEqual(
    input.serverOnlyMode,
    "server-only",
    "Server-only mode is required."
  );
  assertEqual(
    input.syntheticJoinMode,
    "synthetic-only",
    "Synthetic-only join mode is required."
  );
  assertEqual(
    input.manualGatedMode,
    "manual-gated",
    "Manual-gated fixture mode is required."
  );
  assertEqual(
    input.syntheticResultCaptureOutput.resultCaptureMvpId,
    input.auditApprovalJoinMvpId,
    "Synthetic result capture output is required."
  );
  assertEqual(
    input.syntheticResultCaptureOutput.captureState,
    "captured-synthetic-in-memory-only",
    "Synthetic result capture output must remain captured in memory only."
  );
  assertEqual(
    input.syntheticResultCaptureOutput.inMemoryOnlyCaptureStatement,
    "synthetic result capture is produced in memory only",
    "Synthetic result capture output must remain in memory only."
  );
  assertEqual(
    input.syntheticResultCaptureOutput.deterministicSyntheticCaptureStatement,
    "deterministic synthetic capture only",
    "Synthetic result capture output must remain deterministic."
  );
  assertEqual(
    input.syntheticResultCaptureOutput.persistenceState,
    "not implemented",
    "Synthetic result capture output must remain non-persistent."
  );
  assertEqual(
    input.syntheticResultCaptureOutput.providerResponseState,
    "not received",
    "Synthetic result capture output must not include a provider response."
  );
  assertEqual(
    input.syntheticResultCaptureOutput.modelOutputState,
    "not generated",
    "Synthetic result capture output must not include model output."
  );
  assertEqual(
    input.syntheticAuditPreview.resultCaptureMvpId,
    input.auditApprovalJoinMvpId,
    "Synthetic audit preview is required."
  );
  assertEqual(
    input.syntheticAuditPreview.auditState,
    "preview-only / not persisted",
    "Synthetic audit preview must remain preview-only."
  );
  assertEqual(
    input.syntheticAuditPreview.explicitNoAuditPersistenceStatement,
    "no audit persistence",
    "Synthetic audit preview must remain non-persistent."
  );
  assertEqual(
    input.syntheticApprovalPreview.resultCaptureMvpId,
    input.auditApprovalJoinMvpId,
    "Synthetic approval preview is required."
  );
  assertEqual(
    input.syntheticApprovalPreview.approvalState,
    "preview-only / not persisted",
    "Synthetic approval preview must remain preview-only."
  );
  assertEqual(
    input.syntheticApprovalPreview.approvalFixtureState,
    "preview-only",
    "Approval fixture must remain preview-only."
  );
  assertEqual(
    input.syntheticApprovalPreview.manualConfirmationFixtureState,
    "preview-only",
    "Manual confirmation fixture must remain preview-only."
  );
  assertEqual(
    input.syntheticApprovalPreview.approvalTokenState,
    "not issued",
    "Approval token must remain absent."
  );
  assertEqual(
    input.syntheticApprovalPreview.approvalLeaseState,
    "not created",
    "Approval lease must remain absent."
  );
  assertEqual(
    input.syntheticApprovalPreview.explicitNoApprovalPersistenceStatement,
    "no approval persistence",
    "Synthetic approval preview must remain non-persistent."
  );
  assertEqual(
    input.syntheticEvidencePacket.resultCaptureMvpId,
    input.auditApprovalJoinMvpId,
    "Synthetic evidence packet is required."
  );
  assertEqual(
    input.syntheticEvidencePacket.evidencePacketState,
    "preview-only / not persisted",
    "Synthetic evidence packet must remain preview-only."
  );
  assertEqual(
    input.manualApprovalFixture.executionMvpId,
    input.auditApprovalJoinMvpId,
    "Manual approval fixture is required."
  );
  assertEqual(
    input.manualApprovalFixture.approvalFixtureState,
    "preview-only",
    "Approval fixture must remain preview-only."
  );
  assertEqual(
    input.manualApprovalFixture.manualConfirmationFixtureState,
    "preview-only",
    "Manual confirmation fixture must remain preview-only."
  );
  assertEqual(
    input.manualApprovalFixture.approvalRequestState,
    "not created",
    "Real approval requests must remain absent."
  );
  assertEqual(
    input.manualApprovalFixture.approvalRecordingState,
    "not recorded",
    "Approval recording must remain blocked."
  );
  assertEqual(
    input.manualApprovalFixture.approvalTokenIssuanceState,
    "not issued",
    "Approval token issuance must remain blocked."
  );
  assertEqual(
    input.manualApprovalFixture.approvalLeaseIssuanceState,
    "not created",
    "Approval lease issuance must remain blocked."
  );
  assertEqual(
    input.manualApprovalFixture.explicitPreviewOnlyStatement,
    "approval fixture is preview-only",
    "Manual approval fixture must remain preview-only."
  );
  assertEqual(
    input.approvalRecordingState,
    "not recorded",
    "Approval recording must remain blocked."
  );
  assertEqual(
    input.approvalTokenState,
    "not issued",
    "Approval token must remain absent."
  );
  assertEqual(
    input.approvalLeaseState,
    "not created",
    "Approval lease must remain absent."
  );
  assertEqual(
    input.providerResponseState,
    "not received",
    "Provider response must remain absent."
  );
  assertEqual(
    input.modelOutputState,
    "not generated",
    "Model output must remain absent."
  );
  assertEqual(input.promptState, "not sent", "Prompt sending must remain blocked.");
  assertEqual(
    input.frontendRequestState,
    "not created",
    "Frontend request must remain absent."
  );
  assertEqual(
    input.apiRouteState,
    "not created",
    "API route must remain absent."
  );
  assertEqual(
    input.persistenceTargetState,
    "none",
    "Persistence target must remain absent."
  );
  assertEqual(
    input.databaseWriteTargetState,
    "none",
    "Database write target must remain absent."
  );
  assertEqual(
    input.fileWriteTargetState,
    "none",
    "File write target must remain absent."
  );
  assertEqual(
    input.queueDispatchState,
    "blocked",
    "Queue dispatch must remain blocked."
  );
  assertEqual(
    input.workerDispatchState,
    "blocked",
    "Worker dispatch must remain blocked."
  );
  assertEqual(
    input.jobExecutionState,
    "blocked",
    "Job execution must remain blocked."
  );
  assertEqual(
    input.providerSdkImportState,
    "not imported",
    "Provider SDK imports must remain absent."
  );
  assertEqual(
    input.providerExecutionState,
    "blocked",
    "Provider execution must remain blocked."
  );

  return {
    auditApprovalJoinMvpId: input.auditApprovalJoinMvpId,
    requestLabel: input.syntheticResultCaptureOutput.requestLabel,
    sourceSyntheticResultCaptureOutputReference:
      input.syntheticResultCaptureOutput.key,
    sourceSyntheticAuditPreviewReference: input.syntheticAuditPreview.key,
    sourceSyntheticApprovalPreviewReference: input.syntheticApprovalPreview.key,
    sourceSyntheticEvidencePacketReference: input.syntheticEvidencePacket.key,
    sourceManualApprovalFixtureReference: input.manualApprovalFixture.key,
    joinState: "joined-synthetic-in-memory-only",
    auditJoinState: "deterministic synthetic audit join in memory only",
    approvalJoinState: "deterministic synthetic approval join in memory only",
    syntheticResultCaptureId:
      input.syntheticResultCaptureOutput.syntheticCaptureId,
    syntheticAuditJoinId: buildSyntheticAuditJoinId(input.auditApprovalJoinMvpId),
    syntheticApprovalJoinId: buildSyntheticApprovalJoinId(
      input.auditApprovalJoinMvpId
    ),
    syntheticJoinDigest: buildSyntheticAuditApprovalJoinDigest(
      input.auditApprovalJoinMvpId
    ),
    resultReference: buildSyntheticAuditApprovalJoinResultReference(
      input.auditApprovalJoinMvpId
    ),
    auditReference: buildSyntheticAuditApprovalJoinAuditReference(
      input.auditApprovalJoinMvpId
    ),
    approvalReference: buildSyntheticAuditApprovalJoinApprovalReference(
      input.auditApprovalJoinMvpId
    ),
    evidencePacketReference: buildSyntheticAuditApprovalJoinEvidenceReference(
      input.auditApprovalJoinMvpId
    ),
    joinPayload: buildSyntheticAuditApprovalJoinPayload(
      input.auditApprovalJoinMvpId
    ),
    joinTimestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    currentReadiness:
      "minimal-synthetic-audit-approval-join-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent",
    serverOnlyHelperStatement:
      "server-only synthetic audit and approval join helper exists",
    deterministicSyntheticJoinStatement:
      "deterministic synthetic audit and approval join only",
    inMemoryOnlyJoinStatement:
      "synthetic audit and approval join is produced in memory only",
    noFrontendRequestStatement: "no frontend request is created",
    noApiRouteStatement: "no API route is created",
    nextAuditApprovalJoinReviewRecoveryChecklist:
      buildNextAuditApprovalJoinReviewRecoveryChecklist(),
  };
}

export function runMinimalManualGatedSyntheticAuditApprovalJoinMvpForStaticFixture():
  MinimalManualGatedSyntheticDryRunAuditApprovalJoinMvpServerRunRecord {
  return joinMinimalManualGatedSyntheticDryRunAuditAndApprovalMvp({
    auditApprovalJoinMvpId: STATIC_FIXTURE_ID,
    backendOwnedMode: "backend-owned",
    serverOnlyMode: "server-only",
    syntheticJoinMode: "synthetic-only",
    manualGatedMode: "manual-gated",
    syntheticResultCaptureOutput: findRequired(
      listSyntheticResultCaptureOutputs(),
      (record) => record.resultCaptureMvpId === STATIC_FIXTURE_ID,
      `synthetic result capture output for ${STATIC_FIXTURE_ID}`
    ),
    syntheticAuditPreview: findRequired(
      listSyntheticResultCaptureAuditPreviews(),
      (record) => record.resultCaptureMvpId === STATIC_FIXTURE_ID,
      `synthetic audit preview for ${STATIC_FIXTURE_ID}`
    ),
    syntheticApprovalPreview: findRequired(
      listSyntheticResultCaptureApprovalPreviews(),
      (record) => record.resultCaptureMvpId === STATIC_FIXTURE_ID,
      `synthetic approval preview for ${STATIC_FIXTURE_ID}`
    ),
    syntheticEvidencePacket: findRequired(
      listSyntheticResultCaptureEvidencePackets(),
      (record) => record.resultCaptureMvpId === STATIC_FIXTURE_ID,
      `synthetic evidence packet for ${STATIC_FIXTURE_ID}`
    ),
    manualApprovalFixture: findRequired(
      listSyntheticMvpManualApprovalFixtures(),
      (record) => record.executionMvpId === STATIC_FIXTURE_ID,
      `manual approval fixture for ${STATIC_FIXTURE_ID}`
    ),
    approvalRecordingState: "not recorded",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    promptState: "not sent",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    persistenceTargetState: "none",
    databaseWriteTargetState: "none",
    fileWriteTargetState: "none",
    queueDispatchState: "blocked",
    workerDispatchState: "blocked",
    jobExecutionState: "blocked",
    providerSdkImportState: "not imported",
    providerExecutionState: "blocked",
  });
}
