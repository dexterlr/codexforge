import "server-only";

import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listSyntheticMvpManualApprovalFixtures,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews,
  listSyntheticEndToEndPacketAcceptancePostureRecords,
  listSyntheticEndToEndPacketReviewAuditSummaries,
} from "../min-synth-e2e-review";
import { buildNextTextAdapterReviewRecoveryChecklist } from "./min-text-adapter-catalog";
import type {
  MinimalTextModelAdapterMvpId,
  MinimalTextModelAdapterPreviewId,
  MinimalTextModelAdapterMvpRunInput,
  MinimalTextModelAdapterMvpServerRunRecord,
  TextAdapterApprovalReference,
  TextAdapterAuditReference,
  TextAdapterDigest,
  TextAdapterEvidenceReference,
  TextAdapterRequestId,
  TextAdapterResponseId,
  TextAdapterResultReference,
} from "./min-text-adapter-types";

const STATIC_FIXTURE_ID: MinimalTextModelAdapterMvpId =
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

function buildTextAdapterPreviewId(
  id: MinimalTextModelAdapterMvpId
): MinimalTextModelAdapterPreviewId {
  return `text-model-adapter-preview:${id}`;
}

function buildTextAdapterRequestId(
  id: MinimalTextModelAdapterMvpId
): TextAdapterRequestId {
  return `text-model-adapter-request-preview:${id}`;
}

function buildTextAdapterResponseId(
  id: MinimalTextModelAdapterMvpId
): TextAdapterResponseId {
  return `text-model-adapter-response-preview:${id}`;
}

function buildTextAdapterDigest(
  id: MinimalTextModelAdapterMvpId
): TextAdapterDigest {
  return `text-model-adapter-digest-preview:${id}:fixture-only`;
}

function buildTextAdapterResultReference(
  id: MinimalTextModelAdapterMvpId
): TextAdapterResultReference {
  return `text-model-adapter-result-reference-preview:${id}`;
}

function buildTextAdapterAuditReference(
  id: MinimalTextModelAdapterMvpId
): TextAdapterAuditReference {
  return `text-model-adapter-audit-reference-preview:${id}`;
}

function buildTextAdapterApprovalReference(
  id: MinimalTextModelAdapterMvpId
): TextAdapterApprovalReference {
  return `text-model-adapter-approval-reference-preview:${id}`;
}

function buildTextAdapterEvidenceReference(
  id: MinimalTextModelAdapterMvpId
): TextAdapterEvidenceReference {
  return `text-model-adapter-evidence-reference-preview:${id}`;
}

export function runMinimalManualGatedTextModelAdapterMvp(
  input: MinimalTextModelAdapterMvpRunInput
): MinimalTextModelAdapterMvpServerRunRecord {
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
    input.adapterBoundaryMode,
    "adapter-boundary",
    "Adapter-boundary mode is required."
  );
  assertEqual(
    input.manualGatedMode,
    "manual-gated",
    "Manual-gated mode is required."
  );
  assertEqual(
    input.fixtureOnlyMode,
    "fixture-only",
    "Fixture-only mode is required."
  );
  assertEqual(
    input.sourceSyntheticEndToEndPacketReview.id,
    input.textAdapterMvpId,
    "Synthetic end-to-end packet review fixture is required."
  );
  assertEqual(
    input.sourceSyntheticEndToEndPacketReview.previewOnlyStatement,
    "minimal synthetic end-to-end packet review is preview-only",
    "Synthetic end-to-end packet review must remain preview-only."
  );
  assertEqual(
    input.sourceSyntheticEndToEndPacketReview.nextTextModelAdapterMvpRequirement,
    "5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP",
    "Synthetic end-to-end packet review must point to the text adapter MVP dependency."
  );
  assertEqual(
    input.sourceSyntheticEndToEndPacketAcceptancePosture.id,
    input.textAdapterMvpId,
    "Synthetic end-to-end packet acceptance posture is required."
  );
  assertEqual(
    input.sourceSyntheticEndToEndPacketAcceptancePosture.acceptanceState,
    "not accepted for live execution / synthetic end-to-end packet MVP accepted only",
    "Synthetic end-to-end packet acceptance posture must remain live-blocked."
  );
  assertEqual(
    input.sourceSyntheticEndToEndPacketAuditSummary.id,
    input.textAdapterMvpId,
    "Synthetic end-to-end packet audit summary is required."
  );
  assertEqual(
    input.sourceSyntheticEndToEndPacketAuditSummary.auditPosture,
    "preview-only",
    "Synthetic end-to-end packet audit summary must remain preview-only."
  );
  assertEqual(
    input.sourceManualApprovalDecisionReview.id,
    input.textAdapterMvpId,
    "Manual approval decision review is required."
  );
  assertEqual(
    input.manualApprovalFixture.executionMvpId,
    input.textAdapterMvpId,
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
    "Real approval request must remain absent."
  );
  assertEqual(
    input.manualApprovalFixture.approvalRecordingState,
    "not recorded",
    "Real approval recording must remain absent."
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
    input.manualConfirmationFixture.executionMvpId,
    input.textAdapterMvpId,
    "Manual confirmation fixture is required."
  );
  assertEqual(
    input.manualConfirmationFixture.manualConfirmationFixtureState,
    "preview-only",
    "Manual confirmation fixture must remain preview-only."
  );
  assertEqual(
    input.normalizedOperatorIntent,
    "static fixture only",
    "Normalized operator intent must remain static fixture only."
  );
  assertEqual(
    input.promptPayloadPosture,
    "redacted placeholder only",
    "Prompt payload must remain redacted."
  );
  assertEqual(
    input.promptTransmissionState,
    "not sent",
    "Prompt transmission must remain blocked."
  );
  assertEqual(
    input.providerPayloadPosture,
    "none",
    "Provider payload posture must remain none."
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
    input.approvalFixtureState,
    "preview-only",
    "Approval fixture state must remain preview-only."
  );
  assertEqual(
    input.manualConfirmationFixtureState,
    "preview-only",
    "Manual confirmation state must remain preview-only."
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
    input.persistenceTargetPosture,
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
    "Provider SDK import must remain absent."
  );
  assertEqual(
    input.providerExecutionState,
    "blocked",
    "Provider execution must remain blocked."
  );
  assertEqual(
    input.modelCallState,
    "blocked",
    "Model call must remain blocked."
  );

  return {
    textAdapterMvpId: input.textAdapterMvpId,
    requestLabel: input.sourceSyntheticEndToEndPacketReview.requestLabel,
    sourceSyntheticEndToEndPacketReviewReference:
      input.sourceSyntheticEndToEndPacketReview.key,
    sourceSyntheticEndToEndPacketAcceptancePostureReference:
      input.sourceSyntheticEndToEndPacketAcceptancePosture.key,
    sourceSyntheticEndToEndPacketAuditSummaryReference:
      input.sourceSyntheticEndToEndPacketAuditSummary.key,
    sourceManualApprovalDecisionReviewReference:
      input.sourceManualApprovalDecisionReview.key,
    sourceManualApprovalFixtureReference: input.manualApprovalFixture.key,
    sourceManualConfirmationFixtureReference:
      input.manualConfirmationFixture.key,
    adapterState: "completed-text-adapter-fixture-only",
    textAdapterId: buildTextAdapterPreviewId(input.textAdapterMvpId),
    requestId: buildTextAdapterRequestId(input.textAdapterMvpId),
    responseId: buildTextAdapterResponseId(input.textAdapterMvpId),
    adapterDigest: buildTextAdapterDigest(input.textAdapterMvpId),
    normalizedOperatorIntent: "static fixture only",
    redactedPromptPreview: "static placeholder only",
    deterministicFixtureResponse: "static placeholder only",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultReference: buildTextAdapterResultReference(input.textAdapterMvpId),
    auditReference: buildTextAdapterAuditReference(input.textAdapterMvpId),
    approvalReference: buildTextAdapterApprovalReference(input.textAdapterMvpId),
    evidencePacketReference:
      buildTextAdapterEvidenceReference(input.textAdapterMvpId),
    timestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    currentReadiness:
      "minimal-text-adapter-mvp-only / backend-only / fixture-only / not provider-capable / not persistent",
    nextTextAdapterReviewRecoveryChecklist:
      buildNextTextAdapterReviewRecoveryChecklist(),
  };
}

export function runMinimalManualGatedTextModelAdapterMvpForStaticFixture():
  MinimalTextModelAdapterMvpServerRunRecord {
  return runMinimalManualGatedTextModelAdapterMvp({
    textAdapterMvpId: STATIC_FIXTURE_ID,
    backendOwnedMode: "backend-owned",
    serverOnlyMode: "server-only",
    adapterBoundaryMode: "adapter-boundary",
    manualGatedMode: "manual-gated",
    fixtureOnlyMode: "fixture-only",
    sourceSyntheticEndToEndPacketReview: findRequired(
      listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews(),
      (record) => record.id === STATIC_FIXTURE_ID,
      `synthetic end-to-end packet review for ${STATIC_FIXTURE_ID}`
    ),
    sourceSyntheticEndToEndPacketAcceptancePosture: findRequired(
      listSyntheticEndToEndPacketAcceptancePostureRecords(),
      (record) => record.id === STATIC_FIXTURE_ID,
      `synthetic end-to-end packet acceptance posture for ${STATIC_FIXTURE_ID}`
    ),
    sourceSyntheticEndToEndPacketAuditSummary: findRequired(
      listSyntheticEndToEndPacketReviewAuditSummaries(),
      (record) => record.id === STATIC_FIXTURE_ID,
      `synthetic end-to-end packet audit summary for ${STATIC_FIXTURE_ID}`
    ),
    sourceManualApprovalDecisionReview: findRequired(
      listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews(),
      (record) => record.id === STATIC_FIXTURE_ID,
      `manual approval decision review for ${STATIC_FIXTURE_ID}`
    ),
    manualApprovalFixture: findRequired(
      listSyntheticMvpManualApprovalFixtures(),
      (record) => record.executionMvpId === STATIC_FIXTURE_ID,
      `manual approval fixture for ${STATIC_FIXTURE_ID}`
    ),
    manualConfirmationFixture: findRequired(
      listSyntheticMvpManualApprovalFixtures(),
      (record) => record.executionMvpId === STATIC_FIXTURE_ID,
      `manual confirmation fixture for ${STATIC_FIXTURE_ID}`
    ),
    normalizedOperatorIntent: "static fixture only",
    promptPayloadPosture: "redacted placeholder only",
    promptTransmissionState: "not sent",
    providerPayloadPosture: "none",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalRecordingState: "not recorded",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    persistenceTargetPosture: "none",
    databaseWriteTargetState: "none",
    fileWriteTargetState: "none",
    queueDispatchState: "blocked",
    workerDispatchState: "blocked",
    jobExecutionState: "blocked",
    providerSdkImportState: "not imported",
    providerExecutionState: "blocked",
    modelCallState: "blocked",
  });
}
