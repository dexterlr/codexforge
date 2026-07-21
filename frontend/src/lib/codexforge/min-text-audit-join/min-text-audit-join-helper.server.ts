import "server-only";

import {
  listSyntheticMvpManualApprovalFixtures,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews,
  listTextAdapterResultCaptureOutputReviewRecords,
} from "../min-text-capture-review";
import {
  listMinimalManualGatedTextModelAdapterResultCaptureMvpRecords,
  listTextAdapterCapturedFixtureResultOutputs,
  listTextAdapterResultCaptureApprovalPreviews,
  listTextAdapterResultCaptureAuditPreviews,
  listTextAdapterResultCaptureEvidencePreviews,
} from "../min-text-capture";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterReviews,
} from "../min-text-adapter-review";
import {
  listTextAdapterRedactedPromptEnvelopes,
} from "../min-text-adapter";
import { buildNextTextAdapterAuditApprovalJoinReviewRecoveryChecklist } from "./min-text-audit-join-catalog";
import type {
  MinimalTextAdapterAuditApprovalJoinMvpId,
  MinimalTextAdapterAuditApprovalJoinMvpRunInput,
  MinimalTextAdapterAuditApprovalJoinMvpServerRunRecord,
  TextAdapterApprovalJoinId,
  TextAdapterAuditApprovalJoinDigest,
  TextAdapterAuditApprovalJoinApprovalReference,
  TextAdapterAuditApprovalJoinAuditReference,
  TextAdapterAuditApprovalJoinEvidenceReference,
  TextAdapterAuditApprovalJoinResultReference,
  TextAdapterAuditJoinId,
} from "./min-text-audit-join-types";

const STATIC_FIXTURE_ID: MinimalTextAdapterAuditApprovalJoinMvpId =
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

function assertDefined<T>(
  value: T | undefined,
  message: string
): asserts value is T {
  if (typeof value === "undefined") {
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

function buildTextAdapterAuditJoinId(
  id: MinimalTextAdapterAuditApprovalJoinMvpId
): TextAdapterAuditJoinId {
  return `text-adapter-audit-join-preview:${id}`;
}

function buildTextAdapterApprovalJoinId(
  id: MinimalTextAdapterAuditApprovalJoinMvpId
): TextAdapterApprovalJoinId {
  return `text-adapter-approval-join-preview:${id}`;
}

function buildTextAdapterAuditApprovalJoinDigest(
  id: MinimalTextAdapterAuditApprovalJoinMvpId
): TextAdapterAuditApprovalJoinDigest {
  return `text-adapter-audit-approval-join-digest-preview:${id}:in-memory-only`;
}

function buildTextAdapterAuditApprovalJoinResultReference(
  id: MinimalTextAdapterAuditApprovalJoinMvpId
): TextAdapterAuditApprovalJoinResultReference {
  return `text-adapter-audit-approval-join-result-reference-preview:${id}`;
}

function buildTextAdapterAuditApprovalJoinAuditReference(
  id: MinimalTextAdapterAuditApprovalJoinMvpId
): TextAdapterAuditApprovalJoinAuditReference {
  return `text-adapter-audit-approval-join-audit-reference-preview:${id}`;
}

function buildTextAdapterAuditApprovalJoinApprovalReference(
  id: MinimalTextAdapterAuditApprovalJoinMvpId
): TextAdapterAuditApprovalJoinApprovalReference {
  return `text-adapter-audit-approval-join-approval-reference-preview:${id}`;
}

function buildTextAdapterAuditApprovalJoinEvidenceReference(
  id: MinimalTextAdapterAuditApprovalJoinMvpId
): TextAdapterAuditApprovalJoinEvidenceReference {
  return `text-adapter-audit-approval-join-evidence-reference-preview:${id}`;
}

export function joinMinimalManualGatedTextModelAdapterAuditAndApprovalMvp(
  input: MinimalTextAdapterAuditApprovalJoinMvpRunInput
): MinimalTextAdapterAuditApprovalJoinMvpServerRunRecord {
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
    input.auditApprovalJoinMode,
    "audit-approval-join",
    "Audit and approval join mode is required."
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
    input.sourceTextAdapterResultCaptureReview,
    "Minimal text adapter result capture review dependency is required."
  );
  assertDefined(
    input.sourceTextAdapterCapturedFixtureResultOutput,
    "Text adapter captured fixture result output is required."
  );
  assertDefined(
    input.sourceTextAdapterResultCaptureOutputReview,
    "Text adapter result capture output review is required."
  );
  assertDefined(
    input.sourceTextAdapterResultCaptureAuditPreview,
    "Text adapter audit preview is required."
  );
  assertDefined(
    input.sourceTextAdapterResultCaptureApprovalPreview,
    "Text adapter approval preview is required."
  );
  assertDefined(
    input.sourceTextAdapterResultCaptureEvidencePreview,
    "Text adapter evidence preview is required."
  );
  assertDefined(
    input.sourceTextAdapterRedactedPromptEnvelope,
    "Text adapter redacted prompt envelope is required."
  );
  assertDefined(
    input.sourceMinimalTextAdapterReview,
    "Minimal text adapter review dependency is required."
  );
  assertDefined(
    input.sourceManualApprovalDecisionReview,
    "Manual approval decision review is required."
  );
  assertDefined(input.manualApprovalFixture, "Manual approval fixture is required.");
  assertDefined(
    input.manualConfirmationFixture,
    "Manual confirmation fixture is required."
  );

  assertEqual(
    input.sourceTextAdapterResultCaptureMvp.stableId,
    input.textAdapterAuditApprovalJoinMvpId,
    "Minimal text adapter result capture MVP dependency is required."
  );
  assertEqual(
    input.sourceTextAdapterResultCaptureReview.id,
    input.textAdapterAuditApprovalJoinMvpId,
    "Minimal text adapter result capture review dependency is required."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.stableId,
    input.textAdapterAuditApprovalJoinMvpId,
    "Text adapter captured fixture result output is required."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.captureState,
    "captured-text-adapter-fixture-in-memory-only",
    "Text adapter captured fixture result must remain in memory only."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.capturedResultState,
    "deterministic fixture result captured in memory only",
    "Text adapter captured fixture result must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.providerResponseState,
    "not received",
    "Provider response must remain absent."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.modelOutputState,
    "not generated",
    "Model output must remain absent."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.resultPersistenceState,
    "not implemented",
    "Text adapter result capture must remain non-persistent."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.auditPersistenceState,
    "not implemented",
    "Audit persistence must remain blocked."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.approvalPersistenceState,
    "not implemented",
    "Approval persistence must remain blocked."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.resultReference,
    `text-adapter-result-capture-result-reference-preview:${input.textAdapterAuditApprovalJoinMvpId}`,
    "Text adapter result reference must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.auditReference,
    `text-adapter-result-capture-audit-reference-preview:${input.textAdapterAuditApprovalJoinMvpId}`,
    "Text adapter audit reference must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.approvalReference,
    `text-adapter-result-capture-approval-reference-preview:${input.textAdapterAuditApprovalJoinMvpId}`,
    "Text adapter approval reference must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterCapturedFixtureResultOutput.evidencePacketReference,
    `text-adapter-result-capture-evidence-reference-preview:${input.textAdapterAuditApprovalJoinMvpId}`,
    "Text adapter evidence reference must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterResultCaptureAuditPreview.stableId,
    input.textAdapterAuditApprovalJoinMvpId,
    "Text adapter audit preview is required."
  );
  assertEqual(
    input.sourceTextAdapterResultCaptureAuditPreview.auditPreviewState,
    "preview-only / not persisted",
    "Text adapter audit preview must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterResultCaptureApprovalPreview.stableId,
    input.textAdapterAuditApprovalJoinMvpId,
    "Text adapter approval preview is required."
  );
  assertEqual(
    input.sourceTextAdapterResultCaptureApprovalPreview.approvalPreviewState,
    "preview-only / not persisted",
    "Text adapter approval preview must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterResultCaptureApprovalPreview.approvalFixtureState,
    "preview-only",
    "Approval fixture must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterResultCaptureApprovalPreview.manualConfirmationFixtureState,
    "preview-only",
    "Manual confirmation fixture must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterResultCaptureApprovalPreview.approvalTokenState,
    "not issued",
    "Approval token must remain absent."
  );
  assertEqual(
    input.sourceTextAdapterResultCaptureApprovalPreview.approvalLeaseState,
    "not created",
    "Approval lease must remain absent."
  );
  assertEqual(
    input.sourceTextAdapterResultCaptureEvidencePreview.stableId,
    input.textAdapterAuditApprovalJoinMvpId,
    "Text adapter evidence preview is required."
  );
  assertEqual(
    input.sourceTextAdapterResultCaptureEvidencePreview.evidencePreviewState,
    "preview-only / not persisted",
    "Text adapter evidence preview must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterRedactedPromptEnvelope.stableId,
    input.textAdapterAuditApprovalJoinMvpId,
    "Text adapter redacted prompt envelope is required."
  );
  assertEqual(
    input.sourceTextAdapterRedactedPromptEnvelope.promptEnvelopeState,
    "redacted preview only",
    "Text adapter redacted prompt envelope must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterRedactedPromptEnvelope.promptPayloadPosture,
    "redacted placeholder only",
    "Text adapter redacted prompt envelope must remain redacted placeholder only."
  );
  assertEqual(
    input.sourceTextAdapterRedactedPromptEnvelope.promptTransmissionState,
    "not sent",
    "Prompt transmission must remain blocked."
  );
  assertEqual(
    input.sourceTextAdapterRedactedPromptEnvelope.providerPayloadPosture,
    "none",
    "Provider payload must remain absent."
  );
  assertEqual(
    input.sourceTextAdapterRedactedPromptEnvelope.privacyRedactionPosture,
    "preview-only",
    "Privacy redaction must remain preview-only."
  );
  assertEqual(
    input.sourceTextAdapterRedactedPromptEnvelope.killSwitchState,
    "fixture-only",
    "Kill switch fixture is required."
  );
  assertEqual(
    input.sourceMinimalTextAdapterReview.id,
    input.textAdapterAuditApprovalJoinMvpId,
    "Minimal text adapter review dependency is required."
  );
  assertEqual(
    input.sourceManualApprovalDecisionReview.id,
    input.textAdapterAuditApprovalJoinMvpId,
    "Manual approval decision review is required."
  );
  assertEqual(
    input.manualApprovalFixture.executionMvpId,
    input.textAdapterAuditApprovalJoinMvpId,
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
    "Approval fixture must remain preview-only."
  );
  assertEqual(
    input.manualConfirmationFixture.executionMvpId,
    input.textAdapterAuditApprovalJoinMvpId,
    "Manual confirmation fixture is required."
  );
  assertEqual(
    input.manualConfirmationFixture.manualConfirmationFixtureState,
    "preview-only",
    "Manual confirmation fixture must remain preview-only."
  );
  assertEqual(
    input.promptTransmissionState,
    "not sent",
    "Prompt transmission must remain blocked."
  );
  assertEqual(
    input.providerSdkImportState,
    "not imported",
    "Provider SDK import must remain blocked."
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
    "Queue, worker, and job dispatch must remain blocked."
  );
  assertEqual(
    input.workerDispatchState,
    "blocked",
    "Queue, worker, and job dispatch must remain blocked."
  );
  assertEqual(
    input.jobExecutionState,
    "blocked",
    "Queue, worker, and job dispatch must remain blocked."
  );

  return {
    textAdapterAuditApprovalJoinMvpId: input.textAdapterAuditApprovalJoinMvpId,
    requestLabel: input.sourceTextAdapterResultCaptureMvp.requestLabel,
    sourceTextAdapterResultCaptureReviewReference:
      input.sourceTextAdapterResultCaptureReview.key,
    sourceTextAdapterCapturedFixtureResultOutputReference:
      input.sourceTextAdapterCapturedFixtureResultOutput.key,
    sourceTextAdapterAuditPreviewReference:
      input.sourceTextAdapterResultCaptureAuditPreview.key,
    sourceTextAdapterApprovalPreviewReference:
      input.sourceTextAdapterResultCaptureApprovalPreview.key,
    sourceTextAdapterEvidencePreviewReference:
      input.sourceTextAdapterResultCaptureEvidencePreview.key,
    sourceTextAdapterRedactedPromptEnvelopeReference:
      input.sourceTextAdapterRedactedPromptEnvelope.key,
    joinState: "joined-text-adapter-fixture-in-memory-only",
    auditJoinState: "deterministic audit join in memory only",
    approvalJoinState: "deterministic approval join in memory only",
    textAdapterId: input.sourceTextAdapterCapturedFixtureResultOutput.textAdapterId,
    resultCaptureId:
      input.sourceTextAdapterCapturedFixtureResultOutput.captureId,
    auditJoinId: buildTextAdapterAuditJoinId(
      input.textAdapterAuditApprovalJoinMvpId
    ),
    approvalJoinId: buildTextAdapterApprovalJoinId(
      input.textAdapterAuditApprovalJoinMvpId
    ),
    joinDigest: buildTextAdapterAuditApprovalJoinDigest(
      input.textAdapterAuditApprovalJoinMvpId
    ),
    redactedPromptReference: input.sourceTextAdapterRedactedPromptEnvelope.key,
    capturedFixtureResponseReference:
      input.sourceTextAdapterCapturedFixtureResultOutput.key,
    resultReference: buildTextAdapterAuditApprovalJoinResultReference(
      input.textAdapterAuditApprovalJoinMvpId
    ),
    auditReference: buildTextAdapterAuditApprovalJoinAuditReference(
      input.textAdapterAuditApprovalJoinMvpId
    ),
    approvalReference: buildTextAdapterAuditApprovalJoinApprovalReference(
      input.textAdapterAuditApprovalJoinMvpId
    ),
    evidencePreviewReference: buildTextAdapterAuditApprovalJoinEvidenceReference(
      input.textAdapterAuditApprovalJoinMvpId
    ),
    providerResponseState: "not received",
    modelOutputState: "not generated",
    timestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    currentReadiness:
      "minimal-text-adapter-audit-approval-join-mvp-only / backend-only / fixture-only / in-memory-only / not persistent",
    serverOnlyHelperStatement:
      "server-only text adapter audit and approval join helper exists",
    deterministicTextAdapterJoinStatement:
      "deterministic text adapter audit and approval join only",
    inMemoryOnlyJoinStatement:
      "text adapter audit and approval join is produced in memory only",
    noFrontendRequestStatement: "no frontend request is created",
    noApiRouteStatement: "no API route is created",
    nextTextAdapterAuditApprovalJoinReviewRecoveryChecklist:
      buildNextTextAdapterAuditApprovalJoinReviewRecoveryChecklist(),
  };
}

export function runMinimalManualGatedTextAdapterAuditApprovalJoinMvpForStaticFixture():
  MinimalTextAdapterAuditApprovalJoinMvpServerRunRecord {
  const sourceTextAdapterResultCaptureMvp =
    listMinimalManualGatedTextModelAdapterResultCaptureMvpRecords().find(
      (record) => record.stableId === STATIC_FIXTURE_ID
    );
  const sourceTextAdapterResultCaptureReview =
    listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews().find(
      (record) => record.id === STATIC_FIXTURE_ID
    );
  const sourceTextAdapterCapturedFixtureResultOutput =
    listTextAdapterCapturedFixtureResultOutputs().find(
      (record) => record.stableId === STATIC_FIXTURE_ID
    );
  const sourceTextAdapterResultCaptureOutputReview =
    listTextAdapterResultCaptureOutputReviewRecords().find(
      (record) => record.id === STATIC_FIXTURE_ID
    );
  const sourceTextAdapterResultCaptureAuditPreview =
    listTextAdapterResultCaptureAuditPreviews().find(
      (record) => record.stableId === STATIC_FIXTURE_ID
    );
  const sourceTextAdapterResultCaptureApprovalPreview =
    listTextAdapterResultCaptureApprovalPreviews().find(
      (record) => record.stableId === STATIC_FIXTURE_ID
    );
  const sourceTextAdapterResultCaptureEvidencePreview =
    listTextAdapterResultCaptureEvidencePreviews().find(
      (record) => record.stableId === STATIC_FIXTURE_ID
    );
  const sourceTextAdapterRedactedPromptEnvelope =
    listTextAdapterRedactedPromptEnvelopes().find(
      (record) => record.stableId === STATIC_FIXTURE_ID
    );
  const sourceMinimalTextAdapterReview =
    listBackendOwnedMinimalManualGatedTextModelAdapterReviews().find(
      (record) => record.id === STATIC_FIXTURE_ID
    );
  const sourceManualApprovalDecisionReview =
    listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews().find(
      (record) => record.id === STATIC_FIXTURE_ID
    );
  const manualApprovalFixture = listSyntheticMvpManualApprovalFixtures().find(
    (record) => record.executionMvpId === STATIC_FIXTURE_ID
  );
  const manualConfirmationFixture = listSyntheticMvpManualApprovalFixtures().find(
    (record) => record.executionMvpId === STATIC_FIXTURE_ID
  );

  assertDefined(
    sourceTextAdapterResultCaptureMvp,
    "Text adapter result capture MVP record is required."
  );
  assertDefined(
    sourceTextAdapterResultCaptureReview,
    "Text adapter result capture review record is required."
  );
  assertDefined(
    sourceTextAdapterCapturedFixtureResultOutput,
    "Text adapter captured fixture result output is required."
  );
  assertDefined(
    sourceTextAdapterResultCaptureOutputReview,
    "Text adapter result capture output review record is required."
  );
  assertDefined(
    sourceTextAdapterResultCaptureAuditPreview,
    "Text adapter audit preview is required."
  );
  assertDefined(
    sourceTextAdapterResultCaptureApprovalPreview,
    "Text adapter approval preview is required."
  );
  assertDefined(
    sourceTextAdapterResultCaptureEvidencePreview,
    "Text adapter evidence preview is required."
  );
  assertDefined(
    sourceTextAdapterRedactedPromptEnvelope,
    "Text adapter redacted prompt envelope is required."
  );
  assertDefined(
    sourceMinimalTextAdapterReview,
    "Minimal text adapter review record is required."
  );
  assertDefined(
    sourceManualApprovalDecisionReview,
    "Manual approval decision review record is required."
  );
  assertDefined(manualApprovalFixture, "Manual approval fixture is required.");
  assertDefined(
    manualConfirmationFixture,
    "Manual confirmation fixture is required."
  );

  return joinMinimalManualGatedTextModelAdapterAuditAndApprovalMvp({
    textAdapterAuditApprovalJoinMvpId: STATIC_FIXTURE_ID,
    backendOwnedMode: "backend-owned",
    serverOnlyMode: "server-only",
    auditApprovalJoinMode: "audit-approval-join",
    manualGatedMode: "manual-gated",
    fixtureOnlyMode: "fixture-only",
    sourceTextAdapterResultCaptureMvp,
    sourceTextAdapterResultCaptureReview,
    sourceTextAdapterCapturedFixtureResultOutput,
    sourceTextAdapterResultCaptureOutputReview,
    sourceTextAdapterResultCaptureAuditPreview,
    sourceTextAdapterResultCaptureApprovalPreview,
    sourceTextAdapterResultCaptureEvidencePreview,
    sourceTextAdapterRedactedPromptEnvelope,
    sourceMinimalTextAdapterReview,
    sourceManualApprovalDecisionReview,
    manualApprovalFixture,
    manualConfirmationFixture,
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
