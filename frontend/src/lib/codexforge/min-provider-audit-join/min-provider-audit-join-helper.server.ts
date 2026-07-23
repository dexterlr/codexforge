import "server-only";

import {
  listSyntheticMvpManualApprovalFixtures,
} from "../backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp/backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-catalog";
import {
  listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews,
} from "../backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview/backend-owned-synthetic-dry-run-manual-approval-decision-review-recovery-preview-catalog";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews,
} from "../min-provider-admit-review/min-provider-admit-review-catalog";
import {
  listMinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecords,
  listProviderDryRunCapturedFixtureResultOutputs,
  listProviderDryRunResultCaptureApprovalPreviews,
  listProviderDryRunResultCaptureAuditPreviews,
  listProviderDryRunResultCaptureBlockedPersistenceSummaries,
  listProviderDryRunResultCaptureChecks,
  listProviderDryRunResultCaptureEnvelopes,
  listProviderDryRunResultCaptureEvidencePreviews,
  listProviderDryRunResultCaptureInputs,
  listProviderDryRunResultCaptureReadinessMatrixRecords,
  listProviderDryRunResultCaptureSafetyGateSummaries,
} from "../min-provider-capture/min-provider-capture-catalog";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews,
  listProviderDryRunResultCaptureOutputReviewRecords,
} from "../min-provider-capture-review/min-provider-capture-review-catalog";
import {
  listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews,
} from "../min-provider-review/min-provider-review-catalog";
import {
  listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews,
} from "../min-text-aa-review/min-text-aa-review-catalog";
import {
  buildNextProviderAdapterDryRunAuditApprovalJoinReviewRecoveryChecklist,
  buildProviderAdapterDryRunAuditApprovalJoinGateSummary,
  buildProviderAdapterDryRunAuditApprovalJoinReadinessSummary,
  buildProviderAdapterDryRunAuditApprovalJoinSummary,
  buildStableMinimalProviderAdapterDryRunAuditApprovalJoinMvpKey,
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
} from "./min-provider-audit-join-catalog";
import type {
  MinimalProviderAdapterDryRunAuditApprovalJoinMvpId,
  MinimalProviderAdapterDryRunAuditApprovalJoinMvpRunInput,
  MinimalProviderAdapterDryRunAuditApprovalJoinMvpServerRunRecord,
  ProviderAdapterDryRunAuditApprovalJoinGateRecord,
  ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord,
} from "./min-provider-audit-join-types";

const STATIC_FIXTURE_ID: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId =
  "code-assistance-request";

function assertEqual<T extends string | number>(
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

function findRequiredById<T extends Readonly<{ id: string }>>(
  records: readonly T[],
  id: string,
  label: string
): T {
  const record = records.find((candidate) => candidate.id === id);

  if (!record) {
    throw new Error(`Missing ${label}: ${id}`);
  }

  return record;
}

function extractSlotIdentity(label: string): string {
  const normalized = label.toLowerCase();

  if (normalized.includes("openai-compatible")) {
    return "openai-compatible";
  }

  if (normalized.includes("anthropic-compatible")) {
    return "anthropic-compatible";
  }

  if (normalized.includes("gemini-compatible")) {
    return "gemini-compatible";
  }

  if (normalized.includes("local/private")) {
    return "local-private";
  }

  if (normalized.includes("fallback disabled")) {
    return "fallback-disabled";
  }

  return normalized;
}

function assertKnownSlotIdentity(label: string, message: string): void {
  const slotIdentity = extractSlotIdentity(label);

  if (
    ![
      "openai-compatible",
      "anthropic-compatible",
      "gemini-compatible",
      "local-private",
      "fallback-disabled",
    ].includes(slotIdentity)
  ) {
    throw new Error(message);
  }
}

function buildStaticFixtureRunInput(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): MinimalProviderAdapterDryRunAuditApprovalJoinMvpRunInput {
  const review = findRequiredById(
    listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews().map(
      (record) => ({ ...record, id: record.reviewId })
    ),
    id,
    "provider dry-run result capture review"
  );
  const admissionReview = findRequiredByKey(
    listBackendOwnedMinimalManualGatedProviderAdapterDryRunAdmissionReviews(),
    review.sourceProviderDryRunAdmissionReviewReference,
    "provider dry-run admission review"
  );
  const selectionReview = findRequiredByKey(
    listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews(),
    review.sourceProviderSelectionCredentialReferenceReviewReference,
    "provider selection credential reference review"
  );
  const textAdapterAuditApprovalJoinReview = findRequiredByKey(
    listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews(),
    selectionReview.sourceTextAdapterAuditApprovalJoinReviewReference,
    "text adapter audit approval join review"
  );
  const decisionReview = findRequiredByKey(
    listBackendOwnedSyntheticDryRunManualApprovalDecisionReviews(),
    textAdapterAuditApprovalJoinReview.sourceManualApprovalDecisionReviewReference,
    "manual approval decision review"
  );
  const manualFixture = listSyntheticMvpManualApprovalFixtures().find(
    (candidate) => candidate.executionMvpId === decisionReview.id
  );

  assertDefined(
    manualFixture,
    `Manual approval fixture is required for ${decisionReview.id}.`
  );

  return {
    providerAdapterDryRunAuditApprovalJoinMvpId: id,
    backendOwnedMode: "backend-owned",
    serverOnlyMode: "server-only",
    auditApprovalJoinMode: "audit-approval-join",
    manualGatedMode: "manual-gated",
    fixtureOnlyMode: "fixture-only",
    credentialReferenceOnlyMode: "credential-reference-only",
    inMemoryOnlyMode: "in-memory-only",
    sourceProviderDryRunResultCaptureReview: review,
    sourceProviderDryRunResultCaptureMvp: findRequiredByKey(
      listMinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecords(),
      review.sourceProviderDryRunResultCaptureMvpReference,
      "provider dry-run result capture MVP"
    ),
    sourceProviderDryRunResultCaptureInput: findRequiredByKey(
      listProviderDryRunResultCaptureInputs(),
      review.sourceProviderDryRunResultCaptureInputReference,
      "provider dry-run result capture input"
    ),
    sourceProviderDryRunResultCaptureCheck: findRequiredByKey(
      listProviderDryRunResultCaptureChecks(),
      review.sourceProviderDryRunResultCaptureCheckReference,
      "provider dry-run result capture check"
    ),
    sourceProviderDryRunCapturedFixtureResultOutput: findRequiredByKey(
      listProviderDryRunCapturedFixtureResultOutputs(),
      review.sourceProviderDryRunCapturedFixtureResultOutputReference,
      "captured provider dry-run fixture result output"
    ),
    sourceProviderDryRunResultCaptureEnvelope: findRequiredByKey(
      listProviderDryRunResultCaptureEnvelopes(),
      review.sourceProviderDryRunResultCaptureEnvelopeReference,
      "provider dry-run result capture envelope"
    ),
    sourceProviderDryRunResultCaptureOutputReview:
      findRequiredByKey(
        listProviderDryRunResultCaptureOutputReviewRecords().map((record) => ({
          ...record,
          key: record.key,
        })),
        `backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-output-review:${id}`,
        "provider dry-run result capture output review"
      ),
    sourceProviderDryRunResultCaptureAuditPreview: findRequiredByKey(
      listProviderDryRunResultCaptureAuditPreviews(),
      review.sourceProviderDryRunResultCaptureAuditPreviewReference,
      "provider dry-run audit preview"
    ),
    sourceProviderDryRunResultCaptureApprovalPreview: findRequiredByKey(
      listProviderDryRunResultCaptureApprovalPreviews(),
      review.sourceProviderDryRunResultCaptureApprovalPreviewReference,
      "provider dry-run approval preview"
    ),
    sourceProviderDryRunResultCaptureEvidencePreview: findRequiredByKey(
      listProviderDryRunResultCaptureEvidencePreviews(),
      review.sourceProviderDryRunResultCaptureEvidencePreviewReference,
      "provider dry-run evidence preview"
    ),
    sourceProviderDryRunResultCaptureSafetyGateSummary: findRequiredByKey(
      listProviderDryRunResultCaptureSafetyGateSummaries(),
      review.sourceProviderDryRunResultCaptureSafetyGateSummaryReference,
      "provider dry-run safety gate summary"
    ),
    sourceProviderDryRunResultCaptureBlockedPersistenceSummary:
      findRequiredByKey(
        listProviderDryRunResultCaptureBlockedPersistenceSummaries(),
        review.sourceProviderDryRunResultCaptureBlockedPersistenceSummaryReference,
        "provider dry-run blocked persistence summary"
      ),
    sourceProviderDryRunResultCaptureReadinessMatrix: findRequiredByKey(
      listProviderDryRunResultCaptureReadinessMatrixRecords(),
      review.sourceProviderDryRunResultCaptureReadinessMatrixReference,
      "provider dry-run readiness matrix record"
    ),
    sourceProviderDryRunAdmissionReview: admissionReview,
    sourceProviderSelectionCredentialReferenceReview: selectionReview,
    sourceManualApprovalDecisionReview: decisionReview,
    manualApprovalFixture: manualFixture,
    manualConfirmationFixture: manualFixture,
  };
}

function findRequiredGateRecords(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): readonly ProviderAdapterDryRunAuditApprovalJoinGateRecord[] {
  const records = listProviderAdapterDryRunAuditApprovalJoinGates().filter(
    (record) => record.stableId === id
  );

  if (records.length === 0) {
    throw new Error(`Missing provider audit approval join gates for ${id}.`);
  }

  return records;
}

function findRequiredReadinessRecords(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId
): readonly ProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecord[] {
  const records =
    listProviderAdapterDryRunAuditApprovalJoinReadinessMatrixRecords().filter(
      (record) => record.stableId === id
    );

  if (records.length === 0) {
    throw new Error(`Missing provider audit approval join readiness for ${id}.`);
  }

  return records;
}

export function joinMinimalManualGatedProviderAdapterDryRunAuditAndApprovalMvp(
  input: MinimalProviderAdapterDryRunAuditApprovalJoinMvpRunInput
): MinimalProviderAdapterDryRunAuditApprovalJoinMvpServerRunRecord {
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
    "Manual-gated mode is required."
  );
  assertEqual(
    input.fixtureOnlyMode,
    "fixture-only",
    "Fixture-only mode is required."
  );
  assertEqual(
    input.credentialReferenceOnlyMode,
    "credential-reference-only",
    "Credential-reference-only mode is required."
  );
  assertEqual(
    input.inMemoryOnlyMode,
    "in-memory-only",
    "In-memory-only mode is required."
  );

  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.reviewId,
    input.providerAdapterDryRunAuditApprovalJoinMvpId,
    "Provider dry-run result capture review id must match the join id."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunResultCaptureMvpReference,
    input.sourceProviderDryRunResultCaptureMvp.key,
    "Provider dry-run result capture MVP reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunResultCaptureInputReference,
    input.sourceProviderDryRunResultCaptureInput.key,
    "Provider dry-run result capture input reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunResultCaptureCheckReference,
    input.sourceProviderDryRunResultCaptureCheck.key,
    "Provider dry-run result capture check reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunCapturedFixtureResultOutputReference,
    input.sourceProviderDryRunCapturedFixtureResultOutput.key,
    "Captured provider dry-run fixture result reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunResultCaptureEnvelopeReference,
    input.sourceProviderDryRunResultCaptureEnvelope.key,
    "Provider dry-run result capture envelope reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunResultCaptureAuditPreviewReference,
    input.sourceProviderDryRunResultCaptureAuditPreview.key,
    "Provider dry-run audit preview reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunResultCaptureApprovalPreviewReference,
    input.sourceProviderDryRunResultCaptureApprovalPreview.key,
    "Provider dry-run approval preview reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunResultCaptureEvidencePreviewReference,
    input.sourceProviderDryRunResultCaptureEvidencePreview.key,
    "Provider dry-run evidence preview reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunResultCaptureSafetyGateSummaryReference,
    input.sourceProviderDryRunResultCaptureSafetyGateSummary.key,
    "Provider dry-run safety gate summary reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunResultCaptureBlockedPersistenceSummaryReference,
    input.sourceProviderDryRunResultCaptureBlockedPersistenceSummary.key,
    "Provider dry-run blocked persistence summary reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunResultCaptureReadinessMatrixReference,
    input.sourceProviderDryRunResultCaptureReadinessMatrix.key,
    "Provider dry-run readiness matrix reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderDryRunAdmissionReviewReference,
    input.sourceProviderDryRunAdmissionReview.key,
    "Provider dry-run admission review reference must resolve."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.sourceProviderSelectionCredentialReferenceReviewReference,
    input.sourceProviderSelectionCredentialReferenceReview.key,
    "Provider selection credential reference review must resolve."
  );

  assertEqual(
    input.sourceProviderDryRunResultCaptureMvp.stableId,
    input.sourceProviderDryRunResultCaptureInput.stableId,
    "Provider dry-run result capture stable ids must agree."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureMvp.stableId,
    input.sourceProviderDryRunResultCaptureCheck.stableId,
    "Provider dry-run result capture check stable id must agree."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureMvp.stableId,
    input.sourceProviderDryRunCapturedFixtureResultOutput.stableId,
    "Captured provider dry-run fixture result stable id must agree."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureMvp.stableId,
    input.sourceProviderDryRunResultCaptureEnvelope.stableId,
    "Provider dry-run result capture envelope stable id must agree."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureMvp.stableId,
    input.sourceProviderDryRunResultCaptureAuditPreview.stableId,
    "Provider dry-run audit preview stable id must agree."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureMvp.stableId,
    input.sourceProviderDryRunResultCaptureApprovalPreview.stableId,
    "Provider dry-run approval preview stable id must agree."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureMvp.stableId,
    input.sourceProviderDryRunResultCaptureEvidencePreview.stableId,
    "Provider dry-run evidence preview stable id must agree."
  );

  assertEqual(
    input.sourceProviderDryRunAdmissionReview.reviewId,
    input.sourceProviderSelectionCredentialReferenceReview.reviewId,
    "Admission review and provider selection review ids must agree."
  );
  assertEqual(
    input.manualApprovalFixture.executionMvpId,
    input.sourceManualApprovalDecisionReview.id,
    "Manual approval fixture id must agree."
  );
  assertEqual(
    input.manualConfirmationFixture.executionMvpId,
    input.sourceManualApprovalDecisionReview.id,
    "Manual confirmation fixture id must agree."
  );

  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.selectedCapabilityFamily,
    input.sourceProviderDryRunAdmissionReview.selectedCapabilityFamily,
    "Provider dry-run review and admission capability families must agree."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.selectedCapabilityFamily,
    input.sourceProviderSelectionCredentialReferenceReview.selectedCapabilityFamily,
    "Provider dry-run review and selection capability families must agree."
  );

  const sourceTextAdapterAuditApprovalJoinReview = findRequiredByKey(
    listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews(),
    input.sourceProviderSelectionCredentialReferenceReview
      .sourceTextAdapterAuditApprovalJoinReviewReference,
    "text adapter audit approval join review"
  );

  assertEqual(
    sourceTextAdapterAuditApprovalJoinReview.sourceManualApprovalDecisionReviewReference,
    input.sourceManualApprovalDecisionReview.key,
    "Manual approval decision review must resolve from the selection review source join chain."
  );

  assertKnownSlotIdentity(
    input.sourceProviderDryRunResultCaptureReview.providerSlotLabel,
    "Selected provider slot label must remain a known preview-only label."
  );
  assertKnownSlotIdentity(
    input.sourceProviderDryRunResultCaptureReview.backupProviderSlotLabel,
    "Backup provider slot label must remain a known preview-only label."
  );
  assertKnownSlotIdentity(
    input.sourceProviderDryRunResultCaptureReview.localPrivateAlternativeLabel,
    "Local/private alternative label must remain a known preview-only label."
  );
  assertKnownSlotIdentity(
    input.sourceProviderDryRunAdmissionReview.providerSlotLabel,
    "Admission review selected provider slot label must remain a known preview-only label."
  );
  assertKnownSlotIdentity(
    input.sourceProviderDryRunAdmissionReview.backupProviderSlotLabel,
    "Admission review backup provider slot label must remain a known preview-only label."
  );
  assertKnownSlotIdentity(
    input.sourceProviderDryRunAdmissionReview.localPrivateAlternativeLabel,
    "Admission review local/private alternative label must remain a known preview-only label."
  );
  assertKnownSlotIdentity(
    input.sourceProviderSelectionCredentialReferenceReview.providerSlotLabel,
    "Selection review selected provider slot label must remain a known preview-only label."
  );
  assertKnownSlotIdentity(
    input.sourceProviderSelectionCredentialReferenceReview.backupProviderSlotLabel,
    "Selection review backup provider slot label must remain a known preview-only label."
  );
  assertKnownSlotIdentity(
    input.sourceProviderSelectionCredentialReferenceReview.localPrivateAlternativeLabel,
    "Selection review local/private alternative label must remain a known preview-only label."
  );

  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.selectedProviderSlotState,
    "preview-only",
    "Selected provider slot must remain preview-only."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.backupProviderSlotState,
    "preview-only",
    "Backup provider slot must remain preview-only."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.localPrivateAlternativeState,
    "preview-only",
    "Local/private alternative must remain preview-only."
  );
  assertEqual(
    input.sourceProviderSelectionCredentialReferenceReview.selectedProviderSlotState,
    "preview-only",
    "Selected provider slot must remain preview-only in selection review."
  );
  assertEqual(
    input.sourceProviderSelectionCredentialReferenceReview.backupProviderSlotState,
    "preview-only",
    "Backup provider slot must remain preview-only in selection review."
  );
  assertEqual(
    input.sourceProviderSelectionCredentialReferenceReview.localPrivateAlternativeState,
    "preview-only",
    "Local/private alternative must remain preview-only in selection review."
  );

  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.credentialReferenceState,
    "opaque label only",
    "Credential reference must remain opaque-label-only."
  );
  assertEqual(
    input.sourceProviderSelectionCredentialReferenceReview.credentialReferenceState,
    "opaque label only",
    "Provider selection credential reference must remain opaque-label-only."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.credentialValueState,
    "not present / not read",
    "Credential value must remain absent."
  );
  assertEqual(
    input.sourceProviderSelectionCredentialReferenceReview.credentialValueState,
    "not present / not read",
    "Selection review credential value must remain absent."
  );
  assertEqual(
    input.sourceProviderDryRunAdmissionReview.credentialValueState,
    "not present / not read",
    "Admission review credential value must remain absent."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.envVarState,
    "not read",
    "Env vars must remain unread."
  );
  assertEqual(
    input.sourceProviderSelectionCredentialReferenceReview.envVarState,
    "not read",
    "Selection review env vars must remain unread."
  );
  assertEqual(
    input.sourceProviderDryRunAdmissionReview.envVarState,
    "not read",
    "Admission review env vars must remain unread."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.providerKeyState,
    "not read",
    "Provider key must remain unread."
  );
  assertEqual(
    input.sourceProviderSelectionCredentialReferenceReview.providerKeyState,
    "not read",
    "Selection review provider key must remain unread."
  );
  assertEqual(
    input.sourceProviderDryRunAdmissionReview.providerKeyState,
    "not read",
    "Admission review provider key must remain unread."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.providerSdkImportState,
    "not imported",
    "Provider SDK import must remain blocked."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.liveProviderExecutionState,
    "blocked",
    "Live provider execution must remain blocked."
  );
  assertEqual(
    input.sourceProviderDryRunCapturedFixtureResultOutput.captureState,
    "captured-provider-dry-run-fixture-result-in-memory-only",
    "Captured provider dry-run fixture result must remain in memory only."
  );
  assertEqual(
    input.sourceProviderDryRunCapturedFixtureResultOutput.providerResponseState,
    "not received from provider",
    "Provider response must remain absent."
  );
  assertEqual(
    input.sourceProviderDryRunCapturedFixtureResultOutput.modelOutputState,
    "not generated by provider/model",
    "Model output must remain absent."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureOutputReview.providerResponseState,
    "not received from provider",
    "Output review must preserve absent provider response."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureOutputReview.modelOutputState,
    "not generated by provider/model",
    "Output review must preserve absent model output."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureEnvelope.promptTransmissionState,
    "not sent",
    "Prompt transmission must remain blocked."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.promptTransmissionState,
    "not sent",
    "Review prompt transmission must remain blocked."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureAuditPreview.auditPreviewState,
    "preview-only / not persisted",
    "Audit preview must remain preview-only."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureApprovalPreview.approvalPreviewState,
    "preview-only / not persisted",
    "Approval preview must remain preview-only."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureEvidencePreview.evidencePreviewState,
    "preview-only / not persisted",
    "Evidence preview must remain preview-only."
  );

  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.approvalFixtureState,
    "preview-only",
    "Approval fixture review state must remain preview-only."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.manualConfirmationFixtureState,
    "preview-only",
    "Manual confirmation review state must remain preview-only."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.approvalTokenState,
    "not issued",
    "Approval token must remain absent."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureReview.approvalLeaseState,
    "not created",
    "Approval lease must remain absent."
  );
  assertEqual(
    input.manualApprovalFixture.approvalFixtureState,
    "preview-only",
    "Manual approval fixture must remain preview-only."
  );
  assertEqual(
    input.manualApprovalFixture.approvalRequestState,
    "not created",
    "Real approval request must remain absent."
  );
  assertEqual(
    input.manualApprovalFixture.approvalRecordingState,
    "not recorded",
    "Approval recording must remain absent."
  );
  assertEqual(
    input.manualApprovalFixture.approvalTokenIssuanceState,
    "not issued",
    "Approval token issuance must remain absent."
  );
  assertEqual(
    input.manualApprovalFixture.approvalLeaseIssuanceState,
    "not created",
    "Approval lease issuance must remain absent."
  );
  assertEqual(
    input.manualConfirmationFixture.manualConfirmationFixtureState,
    "preview-only",
    "Manual confirmation fixture must remain preview-only."
  );

  assertEqual(
    input.sourceProviderDryRunCapturedFixtureResultOutput.resultPersistenceState,
    "not implemented",
    "Result persistence must remain blocked."
  );
  assertEqual(
    input.sourceProviderDryRunCapturedFixtureResultOutput.auditPersistenceState,
    "not implemented",
    "Audit persistence must remain blocked."
  );
  assertEqual(
    input.sourceProviderDryRunCapturedFixtureResultOutput.approvalPersistenceState,
    "not implemented",
    "Approval persistence must remain blocked."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureBlockedPersistenceSummary.resultPersistenceState,
    "not implemented",
    "Blocked persistence summary must preserve result persistence state."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureBlockedPersistenceSummary.auditPersistenceState,
    "not implemented",
    "Blocked persistence summary must preserve audit persistence state."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureBlockedPersistenceSummary.approvalPersistenceState,
    "not implemented",
    "Blocked persistence summary must preserve approval persistence state."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureBlockedPersistenceSummary.databaseWriteState,
    "not implemented",
    "Database writes must remain blocked."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureBlockedPersistenceSummary.fileWriteState,
    "not implemented",
    "File writes must remain blocked."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureBlockedPersistenceSummary.queueDispatchState,
    "blocked",
    "Queue dispatch must remain blocked."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureBlockedPersistenceSummary.workerDispatchState,
    "blocked",
    "Worker dispatch must remain blocked."
  );
  assertEqual(
    input.sourceProviderDryRunResultCaptureBlockedPersistenceSummary.jobExecutionState,
    "blocked",
    "Job execution must remain blocked."
  );

  const mvpRecord = findRequiredByKey(
    listMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpRecords(),
    buildStableMinimalProviderAdapterDryRunAuditApprovalJoinMvpKey(
      input.providerAdapterDryRunAuditApprovalJoinMvpId
    ),
    "provider audit approval join MVP"
  );
  const inputRecord = findRequiredByKey(
    listProviderAdapterDryRunAuditApprovalJoinInputs(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-input:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider audit approval join input"
  );
  const admissionCheckRecord = findRequiredByKey(
    listProviderAdapterDryRunAuditApprovalJoinAdmissionChecks(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-admission-check:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider audit approval join admission check"
  );
  const auditJoinOutputRecord = findRequiredByKey(
    listProviderAdapterDryRunAuditJoinOutputs(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-join-output:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider audit join output"
  );
  const approvalJoinOutputRecord = findRequiredByKey(
    listProviderAdapterDryRunApprovalJoinOutputs(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-join-output:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider approval join output"
  );
  const envelopeRecord = findRequiredByKey(
    listProviderAdapterDryRunAuditApprovalJoinEnvelopes(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-envelope:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider audit approval join envelope"
  );
  const auditPreviewRecord = findRequiredByKey(
    listProviderAdapterDryRunAuditPreviews(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-preview:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider audit preview"
  );
  const approvalPreviewRecord = findRequiredByKey(
    listProviderAdapterDryRunApprovalPreviews(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-approval-preview:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider approval preview"
  );
  const evidencePreviewRecord = findRequiredByKey(
    listProviderAdapterDryRunAuditApprovalEvidencePreviews(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-evidence-preview:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider audit approval evidence preview"
  );
  const safetyGateSummaryRecord = findRequiredByKey(
    listProviderAdapterDryRunAuditApprovalJoinSafetyGateSummaries(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-safety-gate-summary:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider audit approval join safety gate summary"
  );
  const blockedLivePersistenceSummaryRecord = findRequiredByKey(
    listProviderAdapterDryRunAuditApprovalJoinBlockedLivePersistenceSummaries(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-blocked-live-persistence-summary:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider audit approval join blocked live persistence summary"
  );
  const requestRecord = findRequiredByKey(
    listProviderAdapterDryRunAuditApprovalJoinRequests(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-request:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider audit approval join request"
  );
  const responseRecord = findRequiredByKey(
    listProviderAdapterDryRunAuditApprovalJoinResponses(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-response:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider audit approval join response"
  );
  const errorRecord = findRequiredByKey(
    listProviderAdapterDryRunAuditApprovalJoinErrors(),
    `backend-owned-minimal-manual-gated-provider-adapter-dry-run-audit-approval-join-error:${input.providerAdapterDryRunAuditApprovalJoinMvpId}`,
    "provider audit approval join error"
  );

  const gateRecords = findRequiredGateRecords(
    input.providerAdapterDryRunAuditApprovalJoinMvpId
  );
  const readinessRecords = findRequiredReadinessRecords(
    input.providerAdapterDryRunAuditApprovalJoinMvpId
  );

  const baseRecord = {
    mvpRecord,
    inputRecord,
    admissionCheckRecord,
    auditJoinOutputRecord,
    approvalJoinOutputRecord,
    envelopeRecord,
    auditPreviewRecord,
    approvalPreviewRecord,
    evidencePreviewRecord,
    safetyGateSummaryRecord,
    blockedLivePersistenceSummaryRecord,
    requestRecord,
    responseRecord,
    errorRecord,
    gateRecords,
    readinessRecords,
    summary: buildProviderAdapterDryRunAuditApprovalJoinSummary(),
    gateSummary: buildProviderAdapterDryRunAuditApprovalJoinGateSummary(),
    readinessSummary: buildProviderAdapterDryRunAuditApprovalJoinReadinessSummary(),
    nextReviewRecoveryChecklist:
      buildNextProviderAdapterDryRunAuditApprovalJoinReviewRecoveryChecklist(),
  };

  const serializedDeterministicResult = JSON.stringify(baseRecord);

  return {
    ...baseRecord,
    serializedDeterministicResult,
  };
}

export function runMinimalManualGatedProviderAdapterDryRunAuditApprovalJoinMvpForStaticFixture(
  id: MinimalProviderAdapterDryRunAuditApprovalJoinMvpId = STATIC_FIXTURE_ID
): MinimalProviderAdapterDryRunAuditApprovalJoinMvpServerRunRecord {
  return joinMinimalManualGatedProviderAdapterDryRunAuditAndApprovalMvp(
    buildStaticFixtureRunInput(id)
  );
}
