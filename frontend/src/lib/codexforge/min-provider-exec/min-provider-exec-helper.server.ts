import "server-only";

import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews,
} from "../min-provider-review";
import {
  listMinimalManualGatedProviderAdapterDryRunAdmissionMvpRecords,
  listProviderDryRunAdmissionOutputs,
} from "../min-provider-admit";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews,
  listProviderDryRunAdmissionAcceptancePostureRecords,
  listProviderDryRunAdmissionReviewAuditSummaries,
} from "../min-provider-admit-review";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews,
} from "../min-text-aa-review";
import {
  buildStaticProviderDryRunExecutionServerRunRecord,
  listProviderDryRunApprovalPreviews,
  listProviderDryRunEvidencePreviews,
  listProviderDryRunExecutionEnvelopes,
  listProviderDryRunExecutionInputs,
  listProviderDryRunExecutionOutputs,
  listProviderDryRunExecutionPlans,
  listProviderDryRunFixtureResponses,
} from "./min-provider-exec-catalog";
import type {
  MinimalProviderDryRunExecutionServerRunRecord,
  ProviderDryRunExecutionInputRecord,
  ProviderDryRunExecutionMvpId,
} from "./min-provider-exec-types";

const STATIC_FIXTURE_ID: ProviderDryRunExecutionMvpId =
  "text-chat-provider-dry-run-execution";

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
  const admissionReview =
    listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews()[0];
  const admissionAcceptance =
    listProviderDryRunAdmissionAcceptancePostureRecords()[0];
  const admissionAuditSummary =
    listProviderDryRunAdmissionReviewAuditSummaries()[0];
  const admissionMvp =
    listMinimalManualGatedProviderAdapterDryRunAdmissionMvpRecords()[0];
  const admissionOutput = listProviderDryRunAdmissionOutputs()[0];
  const providerSelectionReview =
    listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews()[0];
  const textAdapterAuditApprovalJoinReview =
    listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews()[0];
  const manualApprovalDecisionReview =
    listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews()[0];

  if (
    !admissionReview ||
    !admissionAcceptance ||
    !admissionAuditSummary ||
    !admissionMvp ||
    !admissionOutput ||
    !providerSelectionReview ||
    !textAdapterAuditApprovalJoinReview ||
    !manualApprovalDecisionReview
  ) {
    throw new Error(
      "Missing provider dry-run execution dependency validation."
    );
  }
}

export function executeMinimalManualGatedProviderAdapterDryRunMvp(
  input: ProviderDryRunExecutionInputRecord
): MinimalProviderDryRunExecutionServerRunRecord {
  assertProviderDryRunExecutionDependenciesExist();

  const executionPlan = findRequired(
    listProviderDryRunExecutionPlans(),
    (record) => record.stableId === input.stableId,
    `provider dry-run execution plan for ${input.stableId}`
  );
  const executionEnvelope = findRequired(
    listProviderDryRunExecutionEnvelopes(),
    (record) => record.stableId === input.stableId,
    `provider dry-run execution envelope for ${input.stableId}`
  );
  const fixtureResponse = findRequired(
    listProviderDryRunFixtureResponses(),
    (record) => record.stableId === input.stableId,
    `provider dry-run fixture response for ${input.stableId}`
  );
  const evidencePreview = findRequired(
    listProviderDryRunEvidencePreviews(),
    (record) => record.stableId === input.stableId,
    `provider dry-run evidence preview for ${input.stableId}`
  );
  const approvalPreview = findRequired(
    listProviderDryRunApprovalPreviews(),
    (record) => record.stableId === input.stableId,
    `provider dry-run approval preview for ${input.stableId}`
  );
  const output = findRequired(
    listProviderDryRunExecutionOutputs(),
    (record) => record.stableId === input.stableId,
    `provider dry-run execution output for ${input.stableId}`
  );

  assertEqual(
    input.backendOwnedPosture,
    "backend-owned",
    "Backend-owned mode is required."
  );
  assertEqual(
    input.serverOnlyPosture,
    "server-only",
    "Server-only provider dry-run execution boundary is required."
  );
  assertEqual(
    input.dryRunExecutionPosture,
    "provider-dry-run-execution",
    "Provider dry-run execution boundary is required."
  );
  assertEqual(
    input.manualGatedPosture,
    "manual-gated",
    "Manual-gated fixture mode is required."
  );
  assertEqual(
    input.fixtureOnlyPosture,
    "fixture-only",
    "Fixture-only mode is required."
  );
  assertEqual(
    input.dryRunIntentState,
    "preview-only",
    "Dry-run execution intent must remain preview-only."
  );
  assertEqual(
    executionPlan.supportedCapabilityState,
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
    "Provider keys must remain unread."
  );
  assertEqual(
    input.providerSdkImportState,
    "not imported",
    "Provider SDK imports must remain absent."
  );
  assertEqual(
    executionEnvelope.promptPayloadPosture,
    "redacted placeholder only",
    "Prompt payload posture must remain redacted preview-only."
  );
  assertEqual(
    executionEnvelope.promptTransmissionState,
    "not sent",
    "Prompt transmission must remain blocked."
  );
  assertEqual(
    fixtureResponse.fixtureResponseState,
    "deterministic dry-run fixture response only",
    "Only deterministic fixture response output is allowed."
  );
  assertEqual(
    output.providerSdkImportState,
    "not imported",
    "Provider SDK imports must remain absent."
  );
  assertEqual(
    output.liveProviderExecutionState,
    "blocked",
    "Live provider execution must remain blocked."
  );
  assertEqual(
    output.providerResponseState,
    "not received from provider",
    "Provider response must remain absent."
  );
  assertEqual(
    output.modelOutputState,
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

  return buildStaticProviderDryRunExecutionServerRunRecord(input.stableId);
}

export function runMinimalManualGatedProviderDryRunExecutionMvpForStaticFixture(): MinimalProviderDryRunExecutionServerRunRecord {
  const input = findRequired(
    listProviderDryRunExecutionInputs(),
    (record) => record.stableId === STATIC_FIXTURE_ID,
    `provider dry-run execution input for ${STATIC_FIXTURE_ID}`
  );

  return executeMinimalManualGatedProviderAdapterDryRunMvp(input);
}
