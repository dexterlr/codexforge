import "server-only";

import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterReviews,
} from "../min-text-adapter-review";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews,
} from "../min-text-capture-review";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews,
  listTextAdapterAuditApprovalJoinAcceptancePostureRecords,
  listTextAdapterAuditApprovalJoinReviewAuditSummaries,
} from "../min-text-aa-review";
import {
  buildStaticProviderSelectionServerRunRecord,
  listMinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecords,
  listOpaqueCredentialReferenceInputs,
  listOpaqueCredentialReferenceOutputs,
  listProviderAdapterSelectionAdmissionChecks,
  listProviderAdapterSelectionApprovalPreviews,
  listProviderAdapterSelectionAuditPreviews,
  listProviderAdapterSelectionEnvelopes,
  listProviderAdapterSelectionEvidencePreviews,
  listProviderAdapterSelectionInputs,
  listProviderAdapterSelectionOutputs,
  listProviderSlotMatrixRecords,
} from "./min-provider-select-catalog";
import type {
  MinimalProviderAdapterSelectionServerRunRecord,
  ProviderAdapterSelectionInputRecord,
  ProviderAdapterSelectionMvpId,
} from "./min-provider-select-types";

const STATIC_FIXTURE_ID: ProviderAdapterSelectionMvpId =
  "text-chat-provider-selection";

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

function assertTextAdapterDependenciesExist(): void {
  const review = listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews()[0];
  const acceptance = listTextAdapterAuditApprovalJoinAcceptancePostureRecords()[0];
  const auditSummary = listTextAdapterAuditApprovalJoinReviewAuditSummaries()[0];
  const resultCaptureReview =
    listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews()[0];
  const textAdapterReview =
    listBackendOwnedMinimalManualGatedTextModelAdapterReviews()[0];
  const manualApprovalDecisionReview =
    listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews()[0];

  if (
    !review ||
    !acceptance ||
    !auditSummary ||
    !resultCaptureReview ||
    !textAdapterReview ||
    !manualApprovalDecisionReview
  ) {
    throw new Error(
      "Missing text adapter audit/approval join review dependency exists validation."
    );
  }
}

export function selectMinimalManualGatedProviderAdapterAndCredentialReferenceMvp(
  input: ProviderAdapterSelectionInputRecord
): MinimalProviderAdapterSelectionServerRunRecord {
  assertTextAdapterDependenciesExist();

  const mvpRecord = findRequired(
    listMinimalManualGatedProviderAdapterSelectionCredentialReferenceMvpRecords(),
    (record) => record.stableId === input.stableId,
    `provider selection MVP record for ${input.stableId}`
  );
  const admissionCheck = findRequired(
    listProviderAdapterSelectionAdmissionChecks(),
    (record) => record.stableId === input.stableId,
    `provider selection admission check for ${input.stableId}`
  );
  const providerSlotMatrix = findRequired(
    listProviderSlotMatrixRecords(),
    (record) => record.stableId === input.stableId,
    `provider slot matrix for ${input.stableId}`
  );
  const opaqueCredentialReferenceInput = findRequired(
    listOpaqueCredentialReferenceInputs(),
    (record) => record.stableId === input.stableId,
    `opaque credential reference input for ${input.stableId}`
  );
  const opaqueCredentialReferenceOutput = findRequired(
    listOpaqueCredentialReferenceOutputs(),
    (record) => record.stableId === input.stableId,
    `opaque credential reference output for ${input.stableId}`
  );
  const envelope = findRequired(
    listProviderAdapterSelectionEnvelopes(),
    (record) => record.stableId === input.stableId,
    `provider selection envelope for ${input.stableId}`
  );
  const evidencePreview = findRequired(
    listProviderAdapterSelectionEvidencePreviews(),
    (record) => record.stableId === input.stableId,
    `provider selection evidence preview for ${input.stableId}`
  );
  const auditPreview = findRequired(
    listProviderAdapterSelectionAuditPreviews(),
    (record) => record.stableId === input.stableId,
    `provider selection audit preview for ${input.stableId}`
  );
  const approvalPreview = findRequired(
    listProviderAdapterSelectionApprovalPreviews(),
    (record) => record.stableId === input.stableId,
    `provider selection approval preview for ${input.stableId}`
  );
  const output = findRequired(
    listProviderAdapterSelectionOutputs(),
    (record) => record.stableId === input.stableId,
    `provider selection output for ${input.stableId}`
  );

  assertEqual(
    input.backendOwnedPosture,
    "backend-owned",
    "Backend-owned mode is required."
  );
  assertEqual(
    input.serverOnlyPosture,
    "server-only",
    "Server-only provider selection boundary is required."
  );
  assertEqual(
    input.providerSelectionPosture,
    "provider-selection",
    "Provider selection boundary mode is required."
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
    admissionCheck.admissionState,
    "accepted / backend-only / preview-slot-only / opaque-reference-only",
    "Provider selection admission must stay preview-only."
  );
  assertEqual(
    providerSlotMatrix.supportedCapabilityState,
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
    opaqueCredentialReferenceInput.credentialValueState,
    "not present / not read",
    "Credential input value must remain absent and unread."
  );
  assertEqual(
    opaqueCredentialReferenceOutput.credentialValueState,
    "not present / not read",
    "Credential output value must remain absent and unread."
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
    output.providerSdkImportState,
    "not imported",
    "Provider SDK imports must remain absent."
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
    output.providerExecutionState,
    "blocked",
    "Provider execution must remain blocked."
  );
  assertEqual(
    input.modelOutputPosture,
    "none",
    "Model call posture must remain none."
  );
  assertEqual(
    input.persistenceTargetPosture,
    "none",
    "Persistence target must remain none."
  );
  assertEqual(
    evidencePreview.evidencePreviewState,
    "preview-only / not persisted",
    "Evidence preview must remain non-persistent."
  );
  assertEqual(
    auditPreview.auditPreviewState,
    "preview-only / not persisted",
    "Audit preview must remain non-persistent."
  );

  return {
    ...buildStaticProviderSelectionServerRunRecord(input.stableId),
    capabilityFamily: mvpRecord.capabilityFamily,
    providerSelectionId: output.providerSelectionId,
    providerSlotId: output.providerSlotId,
    credentialReferenceId: output.credentialReferenceId,
    selectionDigest: output.selectionDigest,
    resultReference: output.resultReference,
    auditReference: output.auditReference,
    approvalReference: output.approvalReference,
    evidencePacketReference: output.evidencePacketReference,
    timestampPosture: output.timestampPosture,
    currentReadiness: output.currentReadiness,
  };
}

export function runMinimalManualGatedProviderSelectionCredentialReferenceMvpForStaticFixture():
  MinimalProviderAdapterSelectionServerRunRecord {
  const input = findRequired(
    listProviderAdapterSelectionInputs(),
    (record) => record.stableId === STATIC_FIXTURE_ID,
    `provider selection input for ${STATIC_FIXTURE_ID}`
  );

  return selectMinimalManualGatedProviderAdapterAndCredentialReferenceMvp(
    input
  );
}
