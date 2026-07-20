import "server-only";

import {
  listMinimalManualGatedTextModelAdapterMvpRecords,
  listTextAdapterFixtureResponses,
  listTextAdapterInputs,
  listTextAdapterRedactedPromptEnvelopes,
} from "../min-text-adapter";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterReviews,
  listTextAdapterOutputReviewRecords,
} from "../min-text-adapter-review";
import {
  listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews,
} from "../min-synth-e2e-review";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listSyntheticMvpManualApprovalFixtures,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import { buildNextTextAdapterResultCaptureReviewRecoveryChecklist } from "./min-text-capture-catalog";
import type {
  MinimalTextAdapterResultCaptureMvpId,
  MinimalTextAdapterResultCaptureMvpRunInput,
  MinimalTextAdapterResultCaptureMvpServerRunRecord,
} from "./min-text-capture-types";

const REQUEST_LABELS = {
  "conversational-planning-request": "conversational planning request",
} as const satisfies Record<MinimalTextAdapterResultCaptureMvpId, string>;

function resolveRequestLabel(id: MinimalTextAdapterResultCaptureMvpId): string {
  return REQUEST_LABELS[id];
}

function assertEqual<T extends string>(
  actual: T,
  expected: T,
  message: string
): void {
  if (actual !== expected) {
    throw new Error(message);
  }
}

function assertDefined<T>(
  value: T | undefined,
  message: string
): asserts value is T {
  if (typeof value === "undefined") {
    throw new Error(message);
  }
}

export function captureMinimalManualGatedTextModelAdapterResultMvp(
  input: MinimalTextAdapterResultCaptureMvpRunInput
): MinimalTextAdapterResultCaptureMvpServerRunRecord {
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
    input.resultCaptureMode,
    "result-capture",
    "Result capture mode is required."
  );
  assertEqual(
    input.manualGatedMode,
    "manual-gated",
    "Manual-gated fixture mode is required."
  );
  assertEqual(
    input.fixtureOnlyMode,
    "fixture-only",
    "Fixture-only mode is required."
  );

  assertDefined(
    input.sourceTextAdapterReview,
    "Minimal text adapter review dependency is required."
  );
  assertDefined(
    input.sourceTextAdapterDeterministicFixtureResponse,
    "Text adapter deterministic fixture response is required."
  );
  assertDefined(
    input.sourceTextAdapterOutputReview,
    "Text adapter output review is required."
  );
  assertDefined(
    input.sourceTextAdapterRedactedPromptEnvelope,
    "Text adapter redacted prompt envelope is required."
  );

  assertEqual(
    input.sourceTextAdapterDeterministicFixtureResponse.fixtureResponseState,
    "deterministic fixture response in memory only",
    "Text adapter output must remain deterministic fixture output only."
  );
  assertEqual(
    input.sourceTextAdapterDeterministicFixtureResponse.providerResponseState,
    "not received",
    "Provider response must remain absent."
  );
  assertEqual(
    input.sourceTextAdapterDeterministicFixtureResponse.modelOutputState,
    "not generated",
    "Model output must remain absent."
  );
  assertEqual(
    input.sourceTextAdapterRedactedPromptEnvelope.promptTransmissionState,
    "not sent",
    "Prompt transmission must remain blocked."
  );
  assertEqual(
    input.promptTransmissionState,
    "not sent",
    "Prompt sending must remain blocked."
  );
  assertEqual(
    input.providerSdkImportState,
    "not imported",
    "Provider SDK imports must remain absent."
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
    "Approval token issuance must remain blocked."
  );
  assertEqual(
    input.approvalLeaseState,
    "not created",
    "Approval lease issuance must remain blocked."
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
    input.providerExecutionState,
    "blocked",
    "Provider execution must remain blocked."
  );
  assertEqual(
    input.modelCallState,
    "blocked",
    "Model calls must remain blocked."
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

  return {
    textAdapterResultCaptureMvpId: input.textAdapterResultCaptureMvpId,
    requestLabel: resolveRequestLabel(input.textAdapterResultCaptureMvpId),
    sourceTextAdapterReviewReference: input.sourceTextAdapterReview.key,
    sourceTextAdapterInputReference: input.sourceTextAdapterInput.key,
    sourceTextAdapterDeterministicFixtureResponseReference:
      input.sourceTextAdapterDeterministicFixtureResponse.key,
    sourceTextAdapterOutputReviewReference:
      input.sourceTextAdapterOutputReview.key,
    sourceTextAdapterRedactedPromptEnvelopeReference:
      input.sourceTextAdapterRedactedPromptEnvelope.key,
    captureState: "captured-text-adapter-fixture-in-memory-only",
    textAdapterId: input.sourceTextAdapterMvp.textAdapterId,
    fixtureResponseId:
      input.sourceTextAdapterDeterministicFixtureResponse.responseId,
    captureId: `text-adapter-result-capture-preview:${input.textAdapterResultCaptureMvpId}`,
    captureDigest: `text-adapter-result-capture-digest-preview:${input.textAdapterResultCaptureMvpId}:in-memory-only`,
    normalizedOperatorIntent: input.normalizedOperatorIntent,
    // deterministic fixture result captured in memory only
    capturedResultPayload: {
      label: "static text adapter fixture output only",
      captureEnvelopeState: "preview-only",
      evidenceDigest:
        `text-adapter-result-capture-digest-preview:${input.textAdapterResultCaptureMvpId}:in-memory-only`,
      auditPreviewState: "preview-only / not persisted",
      approvalPreviewState: "preview-only",
    },
    providerResponseState: "not received",
    modelOutputState: "not generated",
    resultReference:
      `text-adapter-result-capture-result-reference-preview:${input.textAdapterResultCaptureMvpId}`,
    auditReference:
      `text-adapter-result-capture-audit-reference-preview:${input.textAdapterResultCaptureMvpId}`,
    approvalReference:
      `text-adapter-result-capture-approval-reference-preview:${input.textAdapterResultCaptureMvpId}`,
    evidencePacketReference:
      `text-adapter-result-capture-evidence-reference-preview:${input.textAdapterResultCaptureMvpId}`,
    timestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    currentReadiness:
      "minimal-text-adapter-result-capture-mvp-only / backend-only / fixture-only / in-memory-only / not persistent",
    nextTextAdapterResultCaptureReviewRecoveryChecklist:
      buildNextTextAdapterResultCaptureReviewRecoveryChecklist(),
  };
}

export function runMinimalManualGatedTextAdapterResultCaptureMvpForStaticFixture():
  MinimalTextAdapterResultCaptureMvpServerRunRecord {
  const sourceTextAdapterMvp = listMinimalManualGatedTextModelAdapterMvpRecords().find(
    (record) => record.stableId === "conversational-planning-request"
  );
  const sourceTextAdapterInput = listTextAdapterInputs().find(
    (record) => record.stableId === "conversational-planning-request"
  );
  const sourceTextAdapterReview =
    listBackendOwnedMinimalManualGatedTextModelAdapterReviews().find(
      (record) => record.id === "conversational-planning-request"
    );
  const sourceTextAdapterDeterministicFixtureResponse =
    listTextAdapterFixtureResponses().find(
      (record) => record.stableId === "conversational-planning-request"
    );
  const sourceTextAdapterOutputReview = listTextAdapterOutputReviewRecords().find(
    (record) => record.id === "conversational-planning-request"
  );
  const sourceTextAdapterRedactedPromptEnvelope =
    listTextAdapterRedactedPromptEnvelopes().find(
      (record) => record.stableId === "conversational-planning-request"
    );
  const sourceSyntheticEndToEndPacketReview =
    listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews().find(
      (record) => record.id === "conversational-planning-request"
    );
  const sourceManualApprovalDecisionReview =
    listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews().find(
      (record) => record.id === "conversational-planning-request"
    );
  const manualApprovalFixture = listSyntheticMvpManualApprovalFixtures().find(
    (record) => record.executionMvpId === "conversational-planning-request"
  );
  const manualConfirmationFixture = listSyntheticMvpManualApprovalFixtures().find(
    (record) => record.executionMvpId === "conversational-planning-request"
  );

  assertDefined(sourceTextAdapterMvp, "Text adapter MVP record is required.");
  assertDefined(sourceTextAdapterInput, "Text adapter input record is required.");
  assertDefined(sourceTextAdapterReview, "Text adapter review record is required.");
  assertDefined(
    sourceTextAdapterDeterministicFixtureResponse,
    "Text adapter fixture response record is required."
  );
  assertDefined(
    sourceTextAdapterOutputReview,
    "Text adapter output review record is required."
  );
  assertDefined(
    sourceTextAdapterRedactedPromptEnvelope,
    "Text adapter redacted prompt envelope record is required."
  );
  assertDefined(
    sourceSyntheticEndToEndPacketReview,
    "Synthetic end-to-end packet review is required."
  );
  assertDefined(
    sourceManualApprovalDecisionReview,
    "Manual approval decision review is required."
  );
  assertDefined(manualApprovalFixture, "Manual approval fixture is required.");
  assertDefined(
    manualConfirmationFixture,
    "Manual confirmation fixture is required."
  );

  return captureMinimalManualGatedTextModelAdapterResultMvp({
    textAdapterResultCaptureMvpId: "conversational-planning-request",
    backendOwnedMode: "backend-owned",
    serverOnlyMode: "server-only",
    resultCaptureMode: "result-capture",
    manualGatedMode: "manual-gated",
    fixtureOnlyMode: "fixture-only",
    sourceTextAdapterMvp,
    sourceTextAdapterInput,
    sourceTextAdapterReview,
    sourceTextAdapterDeterministicFixtureResponse,
    sourceTextAdapterOutputReview,
    sourceTextAdapterRedactedPromptEnvelope,
    sourceSyntheticEndToEndPacketReview,
    sourceManualApprovalDecisionReview,
    manualApprovalFixture,
    manualConfirmationFixture,
    normalizedOperatorIntent: "static fixture only",
    promptTransmissionState: "not sent",
    providerSdkImportState: "not imported",
    providerResponseState: "not received",
    modelOutputState: "not generated",
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
    approvalRecordingState: "not recorded",
    approvalTokenState: "not issued",
    approvalLeaseState: "not created",
    frontendRequestState: "not created",
    apiRouteState: "not created",
    providerExecutionState: "blocked",
    modelCallState: "blocked",
    persistenceTargetPosture: "none",
    databaseWriteTargetState: "none",
    fileWriteTargetState: "none",
    queueDispatchState: "blocked",
    workerDispatchState: "blocked",
    jobExecutionState: "blocked",
  });
}
