import "server-only";

import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews,
} from "../min-provider-admit-review";
import {
  listMinimalManualGatedProviderAdapterDryRunExecutionMvpRecords,
  listProviderDryRunBlockedLiveExecutionSummaries,
  listProviderDryRunExecutionEnvelopes,
  listProviderDryRunExecutionOutputs,
  listProviderDryRunFixtureResponses,
} from "../min-provider-exec";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviews,
  listProviderDryRunExecutionAcceptancePostureRecords,
  listProviderDryRunExecutionReviewAuditSummaries,
} from "../min-provider-exec-review";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews,
} from "../min-provider-review";
import {
  buildStaticProviderDryRunResultCaptureServerRunRecord,
  listMinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecords,
  listProviderDryRunCapturedFixtureResultOutputs,
  listProviderDryRunResultCaptureApprovalPreviews,
  listProviderDryRunResultCaptureAuditPreviews,
  listProviderDryRunResultCaptureBlockedPersistenceSummaries,
  listProviderDryRunResultCaptureChecks,
  listProviderDryRunResultCaptureEnvelopes,
  listProviderDryRunResultCaptureEvidencePreviews,
  listProviderDryRunResultCaptureInputs,
} from "./min-provider-capture-catalog";
import type {
  MinimalProviderDryRunResultCaptureServerRunRecord,
  ProviderDryRunResultCaptureInputRecord,
  ProviderDryRunResultCaptureMvpId,
} from "./min-provider-capture-types";

const STATIC_FIXTURE_ID: ProviderDryRunResultCaptureMvpId =
  "text-chat-provider-dry-run-result-capture";

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

function assertProviderDryRunExecutionDependenciesExist(): void {
  const executionReview =
    listBackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviews()[0];
  const executionAcceptance =
    listProviderDryRunExecutionAcceptancePostureRecords()[0];
  const executionAuditSummary =
    listProviderDryRunExecutionReviewAuditSummaries()[0];
  const executionMvp =
    listMinimalManualGatedProviderAdapterDryRunExecutionMvpRecords()[0];
  const executionOutput = listProviderDryRunExecutionOutputs()[0];
  const executionFixtureResponse = listProviderDryRunFixtureResponses()[0];
  const executionEnvelope = listProviderDryRunExecutionEnvelopes()[0];
  const blockedLiveExecutionSummary =
    listProviderDryRunBlockedLiveExecutionSummaries()[0];
  const admissionReview =
    listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews()[0];
  const selectionReview =
    listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews()[0];
  const manualApprovalDecisionReview =
    listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews()[0];

  if (
    !executionReview ||
    !executionAcceptance ||
    !executionAuditSummary ||
    !executionMvp ||
    !executionOutput ||
    !executionFixtureResponse ||
    !executionEnvelope ||
    !blockedLiveExecutionSummary ||
    !admissionReview ||
    !selectionReview ||
    !manualApprovalDecisionReview
  ) {
    throw new Error(
      "Missing provider dry-run execution review, output, or fixture dependency validation."
    );
  }
}

export function captureMinimalManualGatedProviderAdapterDryRunResultMvp(
  input: ProviderDryRunResultCaptureInputRecord
): MinimalProviderDryRunResultCaptureServerRunRecord {
  assertProviderDryRunExecutionDependenciesExist();

  const mvpRecord = findRequired(
    listMinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecords(),
    (record) => record.stableId === input.stableId,
    `provider dry-run result capture MVP record for ${input.stableId}`
  );
  const captureCheck = findRequired(
    listProviderDryRunResultCaptureChecks(),
    (record) => record.stableId === input.stableId,
    `provider dry-run result capture check for ${input.stableId}`
  );
  const capturedOutput = findRequired(
    listProviderDryRunCapturedFixtureResultOutputs(),
    (record) => record.stableId === input.stableId,
    `provider dry-run captured fixture result output for ${input.stableId}`
  );
  const captureEnvelope = findRequired(
    listProviderDryRunResultCaptureEnvelopes(),
    (record) => record.stableId === input.stableId,
    `provider dry-run result capture envelope for ${input.stableId}`
  );
  const evidencePreview = findRequired(
    listProviderDryRunResultCaptureEvidencePreviews(),
    (record) => record.stableId === input.stableId,
    `provider dry-run result capture evidence preview for ${input.stableId}`
  );
  const auditPreview = findRequired(
    listProviderDryRunResultCaptureAuditPreviews(),
    (record) => record.stableId === input.stableId,
    `provider dry-run result capture audit preview for ${input.stableId}`
  );
  const approvalPreview = findRequired(
    listProviderDryRunResultCaptureApprovalPreviews(),
    (record) => record.stableId === input.stableId,
    `provider dry-run result capture approval preview for ${input.stableId}`
  );
  const blockedPersistenceSummary = findRequired(
    listProviderDryRunResultCaptureBlockedPersistenceSummaries(),
    (record) => record.stableId === input.stableId,
    `provider dry-run result capture blocked persistence summary for ${input.stableId}`
  );

  assertEqual(
    input.backendOwnedPosture,
    "backend-owned",
    "Backend-owned mode is required."
  );
  assertEqual(
    input.serverOnlyPosture,
    "server-only",
    "Server-only provider dry-run result capture boundary is required."
  );
  assertEqual(
    input.dryRunResultCapturePosture,
    "provider-dry-run-result-capture",
    "Provider dry-run result capture boundary is required."
  );
  assertEqual(
    input.manualGatedPosture,
    "manual-gated",
    "Manual-gated fixture mode is required."
  );
  assertEqual(
    input.fixtureOnlyPosture,
    "fixture-only",
    "Fixture-only result capture mode is required."
  );
  assertEqual(
    captureCheck.providerDryRunExecutionReviewDependencyState,
    "available / preview-only",
    "Provider dry-run execution review dependency must exist."
  );
  assertEqual(
    captureCheck.providerDryRunExecutionOutputDependencyState,
    "available / deterministic fixture-only",
    "Provider dry-run execution output dependency must exist."
  );
  assertEqual(
    captureCheck.providerDryRunFixtureResponseDependencyState,
    "available / deterministic fixture-only",
    "Provider dry-run fixture response dependency must exist."
  );
  assertEqual(
    captureCheck.supportedCapabilityState,
    "supported by text adapter boundary",
    "Selected capability family must stay inside the text adapter boundary."
  );
  assertEqual(
    input.selectedProviderPosture,
    "preview slot only",
    "Selected provider slot must remain preview-only."
  );
  assertEqual(
    input.backupProviderPosture,
    "preview slot only",
    "Backup provider slot must remain preview-only."
  );
  assertEqual(
    input.localPrivateAlternativePosture,
    "preview slot only",
    "Local/private alternative must remain preview-only."
  );
  assertEqual(
    input.credentialReferencePosture,
    "opaque-reference-only",
    "Credential reference must remain opaque label only."
  );
  assertEqual(
    input.credentialValueState,
    "not present / not read",
    "Credential value must remain absent and unread."
  );
  assertEqual(
    input.envVarState,
    "not read",
    "Env vars must remain unread."
  );
  assertEqual(
    input.providerKeyState,
    "not read",
    "Provider key must remain unread."
  );
  assertEqual(
    captureEnvelope.promptPayloadPosture,
    "redacted placeholder only",
    "Prompt payload posture must remain redacted preview-only."
  );
  assertEqual(
    captureEnvelope.promptTransmissionState,
    "not sent",
    "Prompt transmission must remain blocked."
  );
  assertEqual(
    capturedOutput.providerSdkImportState,
    "not imported",
    "Provider SDK imports must remain absent."
  );
  assertEqual(
    mvpRecord.liveProviderExecutionState,
    "blocked",
    "Live provider execution must remain blocked."
  );
  assertEqual(
    capturedOutput.providerResponseState,
    "not received from provider",
    "Provider response must remain absent."
  );
  assertEqual(
    capturedOutput.modelOutputState,
    "not generated by provider/model",
    "Provider/model output must remain absent."
  );
  assertEqual(
    approvalPreview.approvalFixtureState,
    "preview-only",
    "Approval fixture must remain preview-only."
  );
  assertEqual(
    approvalPreview.manualConfirmationFixtureState,
    "preview-only",
    "Manual confirmation fixture must remain preview-only."
  );
  assertEqual(
    approvalPreview.approvalTokenState,
    "not issued",
    "Approval token issuance must remain blocked."
  );
  assertEqual(
    approvalPreview.approvalLeaseState,
    "not created",
    "Approval lease issuance must remain blocked."
  );
  assertEqual(
    evidencePreview.evidencePreviewState,
    "preview-only / not persisted",
    "Evidence preview must remain preview-only."
  );
  assertEqual(
    auditPreview.auditPreviewState,
    "preview-only / not persisted",
    "Audit preview must remain preview-only."
  );
  assertEqual(
    blockedPersistenceSummary.resultPersistenceState,
    "not implemented",
    "Result persistence must remain unimplemented."
  );
  assertEqual(
    blockedPersistenceSummary.auditPersistenceState,
    "not implemented",
    "Audit persistence must remain unimplemented."
  );
  assertEqual(
    blockedPersistenceSummary.approvalPersistenceState,
    "not implemented",
    "Approval persistence must remain unimplemented."
  );
  assertEqual(
    blockedPersistenceSummary.databaseWriteState,
    "not implemented",
    "Database writes must remain unimplemented."
  );
  assertEqual(
    blockedPersistenceSummary.fileWriteState,
    "not implemented",
    "File writes must remain unimplemented."
  );
  assertEqual(
    blockedPersistenceSummary.queueDispatchState,
    "blocked",
    "Queue dispatch must remain blocked."
  );
  assertEqual(
    blockedPersistenceSummary.workerDispatchState,
    "blocked",
    "Worker dispatch must remain blocked."
  );
  assertEqual(
    blockedPersistenceSummary.jobExecutionState,
    "blocked",
    "Job execution must remain blocked."
  );

  return buildStaticProviderDryRunResultCaptureServerRunRecord(input.stableId);
}

export function runMinimalManualGatedProviderDryRunResultCaptureMvpForStaticFixture(): MinimalProviderDryRunResultCaptureServerRunRecord {
  const input = findRequired(
    listProviderDryRunResultCaptureInputs(),
    (record) => record.stableId === STATIC_FIXTURE_ID,
    `provider dry-run result capture input for ${STATIC_FIXTURE_ID}`
  );

  return captureMinimalManualGatedProviderAdapterDryRunResultMvp(input);
}
