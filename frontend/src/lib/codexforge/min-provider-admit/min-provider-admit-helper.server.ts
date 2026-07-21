import "server-only";

import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews,
  listProviderSelectionAcceptancePostureRecords,
  listProviderSelectionReviewAuditSummaries,
} from "../min-provider-review";
import {
  listMinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecords,
} from "../min-provider-select";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews,
} from "../min-text-capture-review";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews,
} from "../min-text-aa-review";
import {
  buildStaticProviderDryRunAdmissionServerRunRecord,
  listProviderDryRunApprovalPreviews,
  listProviderDryRunAdmissionChecks,
  listProviderDryRunAdmissionEnvelopes,
  listProviderDryRunEvidencePreviews,
  listProviderDryRunAdmissionInputs,
  listProviderDryRunAdmissionOutputs,
} from "./min-provider-admit-catalog";
import type {
  MinimalProviderDryRunAdmissionServerRunRecord,
  ProviderDryRunAdmissionInputRecord,
  ProviderDryRunAdmissionMvpId,
} from "./min-provider-admit-types";

const STATIC_FIXTURE_ID: ProviderDryRunAdmissionMvpId =
  "text-chat-provider-dry-run-admission";

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

function assertProviderSelectionReviewDependenciesExist(): void {
  const providerSelectionReview =
    listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews()[0];
  const providerSelectionAcceptance =
    listProviderSelectionAcceptancePostureRecords()[0];
  const providerSelectionAuditSummary =
    listProviderSelectionReviewAuditSummaries()[0];
  const providerSelectionMvp =
    listMinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecords()[0];
  const textAdapterAuditApprovalJoinReview =
    listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews()[0];
  const textAdapterResultCaptureReview =
    listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews()[0];
  const manualApprovalDecisionReview =
    listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews()[0];

  if (
    !providerSelectionReview ||
    !providerSelectionAcceptance ||
    !providerSelectionAuditSummary ||
    !providerSelectionMvp ||
    !textAdapterAuditApprovalJoinReview ||
    !textAdapterResultCaptureReview ||
    !manualApprovalDecisionReview
  ) {
    throw new Error(
      "Missing provider selection credential reference review dependency exists validation."
    );
  }
}

export function admitMinimalManualGatedProviderAdapterDryRunMvp(
  input: ProviderDryRunAdmissionInputRecord
): MinimalProviderDryRunAdmissionServerRunRecord {
  assertProviderSelectionReviewDependenciesExist();

  const admissionCheck = findRequired(
    listProviderDryRunAdmissionChecks(),
    (record) => record.stableId === input.stableId,
    `provider dry-run admission check for ${input.stableId}`
  );
  const envelope = findRequired(
    listProviderDryRunAdmissionEnvelopes(),
    (record) => record.stableId === input.stableId,
    `provider dry-run admission envelope for ${input.stableId}`
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
    listProviderDryRunAdmissionOutputs(),
    (record) => record.stableId === input.stableId,
    `provider dry-run admission output for ${input.stableId}`
  );

  assertEqual(
    input.backendOwnedPosture,
    "backend-owned",
    "Backend-owned mode is required."
  );
  assertEqual(
    input.serverOnlyPosture,
    "server-only",
    "Server-only provider dry-run admission boundary is required."
  );
  assertEqual(
    input.dryRunAdmissionPosture,
    "provider-dry-run-admission",
    "Provider dry-run admission boundary is required."
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
    admissionCheck.supportedCapabilityState,
    "supported by text adapter boundary",
    "Selected capability family must stay inside the text adapter boundary."
  );
  assertEqual(
    input.selectedProviderPosture,
    "preview slot only",
    "Selected provider slot must remain preview-only."
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
    output.providerSdkImportState,
    "not imported",
    "Provider SDK imports must remain absent."
  );
  assertEqual(
    output.providerExecutionState,
    "blocked",
    "Provider execution must remain blocked."
  );
  assertEqual(
    output.providerResponseState,
    "not received",
    "Provider response must remain absent."
  );
  assertEqual(
    output.modelOutputState,
    "not generated",
    "Model output must remain absent."
  );
  assertEqual(
    input.promptPayloadPosture,
    "redacted placeholder only",
    "Prompt payload posture must remain redacted preview-only."
  );
  assertEqual(
    envelope.promptTransmissionState,
    "not sent",
    "Prompt transmission must remain blocked."
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

  return buildStaticProviderDryRunAdmissionServerRunRecord(input.stableId);
}

export function runMinimalManualGatedProviderAdapterDryRunAdmissionMvpForStaticFixture(): MinimalProviderDryRunAdmissionServerRunRecord {
  const input = findRequired(
    listProviderDryRunAdmissionInputs(),
    (record) => record.stableId === STATIC_FIXTURE_ID,
    `provider dry-run admission input for ${STATIC_FIXTURE_ID}`
  );

  return admitMinimalManualGatedProviderAdapterDryRunMvp(input);
}
