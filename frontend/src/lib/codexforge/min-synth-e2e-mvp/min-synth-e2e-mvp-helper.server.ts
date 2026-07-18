import "server-only";

import {
  listSyntheticMvpExecutionResults,
  listSyntheticMvpManualApprovalFixtures,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  listSyntheticResultCaptureEvidencePackets,
  listSyntheticResultCaptureOutputs,
} from "../min-synth-result-capture";
import {
  listSyntheticApprovalJoinOutputs,
  listSyntheticAuditApprovalJoinEnvelopes,
  listSyntheticAuditJoinOutputs,
} from "../min-synth-audit-join";
import { buildNextEndToEndPacketReviewRecoveryChecklist } from "./min-synth-e2e-mvp-catalog";
import type {
  MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId,
  MinimalManualGatedSyntheticDryRunEndToEndPacketMvpRunInput,
  MinimalManualGatedSyntheticDryRunEndToEndPacketMvpServerRunRecord,
  SyntheticEndToEndPacketApprovalPreview,
  SyntheticEndToEndPacketAuditPreview,
  SyntheticEndToEndPacketDigest,
  SyntheticEndToEndPacketEvidencePreview,
  SyntheticEndToEndPacketId,
  SyntheticEndToEndPacketApprovalReference,
  SyntheticEndToEndPacketAuditReference,
  SyntheticEndToEndPacketEvidenceReference,
  SyntheticEndToEndPacketResultReference,
  SyntheticEndToEndPacketStageSummary,
} from "./min-synth-e2e-mvp-types";

const STATIC_FIXTURE_ID: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId =
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

function buildSyntheticEndToEndPacketId(
  id: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId
): SyntheticEndToEndPacketId {
  return `synthetic-end-to-end-packet-preview:${id}`;
}

function buildSyntheticEndToEndPacketDigest(
  id: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId
): SyntheticEndToEndPacketDigest {
  return `synthetic-end-to-end-packet-digest-preview:${id}:in-memory-only`;
}

function buildSyntheticEndToEndPacketResultReference(
  id: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId
): SyntheticEndToEndPacketResultReference {
  return `synthetic-end-to-end-packet-result-reference-preview:${id}`;
}

function buildSyntheticEndToEndPacketAuditReference(
  id: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId
): SyntheticEndToEndPacketAuditReference {
  return `synthetic-end-to-end-packet-audit-reference-preview:${id}`;
}

function buildSyntheticEndToEndPacketApprovalReference(
  id: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId
): SyntheticEndToEndPacketApprovalReference {
  return `synthetic-end-to-end-packet-approval-reference-preview:${id}`;
}

function buildSyntheticEndToEndPacketEvidenceReference(
  id: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId
): SyntheticEndToEndPacketEvidenceReference {
  return `synthetic-end-to-end-packet-evidence-reference-preview:${id}`;
}

function buildStageSummary():
  SyntheticEndToEndPacketStageSummary {
  return {
    label: "static synthetic placeholder only",
    executionStage: "deterministic synthetic execution in memory only",
    resultCaptureStage: "deterministic synthetic capture in memory only",
    auditJoinStage: "deterministic synthetic audit join in memory only",
    approvalJoinStage: "deterministic synthetic approval join in memory only",
    packetAssemblyStage: "assembled-synthetic-in-memory-only",
    recoveryState: "end-to-end packet review and recovery preview comes next",
  };
}

function buildEvidencePreview(
  id: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpId
): SyntheticEndToEndPacketEvidencePreview {
  return {
    label: "preview-only / not persisted",
    syntheticDigest: buildSyntheticEndToEndPacketDigest(id),
    evidenceSummaryLines: [
      "evidence packet reference is preview-only / not persisted",
      "synthetic execution reference is preview-only / not persisted",
      "synthetic capture reference is preview-only / not persisted",
      "synthetic audit join reference is preview-only / not persisted",
      "synthetic approval join reference is preview-only / not persisted",
    ],
  };
}

function buildAuditPreview(): SyntheticEndToEndPacketAuditPreview {
  return {
    label: "preview-only / not persisted",
    auditSummaryLines: [
      "audit reference is preview-only / not persisted",
      "audit preview is deterministic synthetic packet metadata only",
      "no audit persistence",
    ],
  };
}

function buildApprovalPreview():
  SyntheticEndToEndPacketApprovalPreview {
  return {
    label: "preview-only / not persisted",
    approvalSummaryLines: [
      "approval reference is preview-only / not persisted",
      "approval fixture is preview-only",
      "manual confirmation fixture is preview-only",
      "approval token is not issued",
      "approval lease is not created",
      "no approval persistence",
    ],
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
  };
}

export function buildMinimalManualGatedSyntheticDryRunEndToEndPacketMvp(
  input: MinimalManualGatedSyntheticDryRunEndToEndPacketMvpRunInput
): MinimalManualGatedSyntheticDryRunEndToEndPacketMvpServerRunRecord {
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
    input.syntheticPacketMode,
    "synthetic-only",
    "Synthetic-only packet mode is required."
  );
  assertEqual(
    input.manualGatedMode,
    "manual-gated",
    "Manual-gated fixture mode is required."
  );
  assertEqual(
    input.syntheticExecutionResult.executionMvpId,
    input.endToEndPacketMvpId,
    "Synthetic execution result is required."
  );
  assertEqual(
    input.syntheticExecutionResult.executionState,
    "completed-synthetic-mvp-only",
    "Synthetic execution result must remain deterministic."
  );
  assertEqual(
    input.syntheticExecutionResult.inMemoryOnlyResultStatement,
    "synthetic execution result is produced in memory only",
    "Synthetic execution result must remain in memory only."
  );
  assertEqual(
    input.syntheticResultCaptureOutput.resultCaptureMvpId,
    input.endToEndPacketMvpId,
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
    input.syntheticAuditJoinOutput.auditApprovalJoinMvpId,
    input.endToEndPacketMvpId,
    "Synthetic audit join output is required."
  );
  assertEqual(
    input.syntheticAuditJoinOutput.auditJoinState,
    "deterministic synthetic audit join in memory only",
    "Synthetic audit join output must remain in memory only."
  );
  assertEqual(
    input.syntheticApprovalJoinOutput.auditApprovalJoinMvpId,
    input.endToEndPacketMvpId,
    "Synthetic approval join output is required."
  );
  assertEqual(
    input.syntheticApprovalJoinOutput.approvalJoinState,
    "deterministic synthetic approval join in memory only",
    "Synthetic approval join output must remain in memory only."
  );
  assertEqual(
    input.syntheticAuditApprovalJoinEnvelope.auditApprovalJoinMvpId,
    input.endToEndPacketMvpId,
    "Synthetic audit approval join envelope is required."
  );
  assertEqual(
    input.syntheticAuditApprovalJoinEnvelope.joinState,
    "joined-synthetic-in-memory-only",
    "Synthetic audit approval join envelope must remain in memory only."
  );
  assertEqual(
    input.syntheticEvidencePacket.resultCaptureMvpId,
    input.endToEndPacketMvpId,
    "Synthetic evidence packet is required."
  );
  assertEqual(
    input.syntheticEvidencePacket.evidencePacketState,
    "preview-only / not persisted",
    "Synthetic evidence packet must remain preview-only."
  );
  assertEqual(
    input.manualApprovalFixture.executionMvpId,
    input.endToEndPacketMvpId,
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
    input.approvalFixtureState,
    "preview-only",
    "Approval fixture must remain preview-only."
  );
  assertEqual(
    input.manualConfirmationFixtureState,
    "preview-only",
    "Manual confirmation fixture must remain preview-only."
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
    input.auditReferenceState,
    "preview-only / not persisted",
    "Audit reference must remain preview-only."
  );
  assertEqual(
    input.approvalReferenceState,
    "preview-only / not persisted",
    "Approval reference must remain preview-only."
  );
  assertEqual(
    input.resultReferenceState,
    "preview-only / not persisted",
    "Result reference must remain preview-only."
  );
  assertEqual(
    input.evidencePacketReferenceState,
    "preview-only / not persisted",
    "Evidence packet reference must remain preview-only."
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
  assertEqual(
    input.promptState,
    "not sent",
    "Prompt sending must remain blocked."
  );
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
    endToEndPacketMvpId: input.endToEndPacketMvpId,
    requestLabel: input.syntheticResultCaptureOutput.requestLabel,
    sourceSyntheticExecutionResultReference: input.syntheticExecutionResult.key,
    sourceSyntheticResultCaptureOutputReference:
      input.syntheticResultCaptureOutput.key,
    sourceSyntheticAuditJoinOutputReference:
      input.syntheticAuditJoinOutput.key,
    sourceSyntheticApprovalJoinOutputReference:
      input.syntheticApprovalJoinOutput.key,
    packetState: "assembled-synthetic-in-memory-only",
    executionState: "deterministic synthetic execution in memory only",
    resultCaptureState: "deterministic synthetic capture in memory only",
    auditJoinState: "deterministic synthetic audit join in memory only",
    approvalJoinState: "deterministic synthetic approval join in memory only",
    syntheticExecutionId: input.syntheticExecutionResult.resultId,
    syntheticCaptureId: input.syntheticResultCaptureOutput.syntheticCaptureId,
    syntheticAuditJoinId: input.syntheticAuditJoinOutput.syntheticAuditJoinId,
    syntheticApprovalJoinId:
      input.syntheticApprovalJoinOutput.syntheticApprovalJoinId,
    syntheticEndToEndPacketId: buildSyntheticEndToEndPacketId(
      input.endToEndPacketMvpId
    ),
    syntheticPacketDigest: buildSyntheticEndToEndPacketDigest(
      input.endToEndPacketMvpId
    ),
    resultReference: buildSyntheticEndToEndPacketResultReference(
      input.endToEndPacketMvpId
    ),
    auditReference: buildSyntheticEndToEndPacketAuditReference(
      input.endToEndPacketMvpId
    ),
    approvalReference: buildSyntheticEndToEndPacketApprovalReference(
      input.endToEndPacketMvpId
    ),
    evidencePacketReference: buildSyntheticEndToEndPacketEvidenceReference(
      input.endToEndPacketMvpId
    ),
    stageSummary: buildStageSummary(),
    evidencePreview: buildEvidencePreview(input.endToEndPacketMvpId),
    auditPreview: buildAuditPreview(),
    approvalPreview: buildApprovalPreview(),
    packetTimestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    currentReadiness:
      "minimal-synthetic-end-to-end-packet-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent",
    serverOnlyHelperStatement:
      "server-only synthetic end-to-end packet helper exists",
    deterministicSyntheticPacketStatement:
      "deterministic synthetic end-to-end packet only",
    inMemoryOnlyPacketStatement:
      "synthetic end-to-end packet is produced in memory only",
    noFrontendRequestStatement: "no frontend request is created",
    noApiRouteStatement: "no API route is created",
    nextEndToEndPacketReviewRecoveryChecklist:
      buildNextEndToEndPacketReviewRecoveryChecklist(),
  };
}

export function runMinimalManualGatedSyntheticDryRunEndToEndPacketMvpForStaticFixture():
  MinimalManualGatedSyntheticDryRunEndToEndPacketMvpServerRunRecord {
  return buildMinimalManualGatedSyntheticDryRunEndToEndPacketMvp({
    endToEndPacketMvpId: STATIC_FIXTURE_ID,
    backendOwnedMode: "backend-owned",
    serverOnlyMode: "server-only",
    syntheticPacketMode: "synthetic-only",
    manualGatedMode: "manual-gated",
    syntheticExecutionResult: findRequired(
      listSyntheticMvpExecutionResults(),
      (record) => record.executionMvpId === STATIC_FIXTURE_ID,
      `synthetic execution result for ${STATIC_FIXTURE_ID}`
    ),
    syntheticResultCaptureOutput: findRequired(
      listSyntheticResultCaptureOutputs(),
      (record) => record.resultCaptureMvpId === STATIC_FIXTURE_ID,
      `synthetic result capture output for ${STATIC_FIXTURE_ID}`
    ),
    syntheticAuditJoinOutput: findRequired(
      listSyntheticAuditJoinOutputs(),
      (record) => record.auditApprovalJoinMvpId === STATIC_FIXTURE_ID,
      `synthetic audit join output for ${STATIC_FIXTURE_ID}`
    ),
    syntheticApprovalJoinOutput: findRequired(
      listSyntheticApprovalJoinOutputs(),
      (record) => record.auditApprovalJoinMvpId === STATIC_FIXTURE_ID,
      `synthetic approval join output for ${STATIC_FIXTURE_ID}`
    ),
    syntheticAuditApprovalJoinEnvelope: findRequired(
      listSyntheticAuditApprovalJoinEnvelopes(),
      (record) => record.auditApprovalJoinMvpId === STATIC_FIXTURE_ID,
      `synthetic audit approval join envelope for ${STATIC_FIXTURE_ID}`
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
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalRecordingState: "not recorded",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    auditReferenceState: "preview-only / not persisted",
    approvalReferenceState: "preview-only / not persisted",
    resultReferenceState: "preview-only / not persisted",
    evidencePacketReferenceState: "preview-only / not persisted",
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
