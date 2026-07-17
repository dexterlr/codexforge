import "server-only";

import type {
  MinimalManualGatedSyntheticDryRunResultCaptureMvpId,
  MinimalManualGatedSyntheticDryRunResultCaptureMvpRunInput,
  MinimalManualGatedSyntheticDryRunResultCaptureMvpServerRunRecord,
} from "./min-synth-result-capture-types";

const REQUEST_LABELS = {
  "conversational-planning-request": "conversational planning request",
  "code-assistance-request": "code assistance request",
  "website-copy-code-request": "website copy/code request",
  "product-video-request": "product video request",
  "storyboard-image-request": "storyboard image request",
  "audio-narration-request": "audio narration request",
  "transcription-caption-request": "transcription/caption request",
  "embeddings-search-request": "embeddings/search request",
  "safety-moderation-review-request": "safety/moderation review request",
  "local-private-inference-request": "local/private inference request",
  "audit-recovery-explanation-request": "audit/recovery explanation request",
} as const satisfies Record<
  MinimalManualGatedSyntheticDryRunResultCaptureMvpId,
  string
>;

const NEXT_RESULT_CAPTURE_REVIEW_RECOVERY_CHECKLIST = [
  "Review the deterministic in-memory synthetic result capture envelope before adding review and recovery previews.",
  "Keep the result capture path backend-only, server-only, synthetic-only, and in-memory only.",
  "Do not create a frontend request or API route.",
  "Do not send prompts, call models, import provider SDKs, execute providers/plugins, or persist results, audit previews, or approval previews.",
  "result capture review and recovery preview comes next",
] as const;

function buildSyntheticResultCaptureId(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): `synthetic-result-capture-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}` {
  return `synthetic-result-capture-preview:${id}`;
}

function buildSyntheticResultCaptureDigest(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): `synthetic-result-capture-digest-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}:in-memory-only` {
  return `synthetic-result-capture-digest-preview:${id}:in-memory-only`;
}

function buildSyntheticResultCaptureResultReference(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): `synthetic-result-capture-result-reference-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}` {
  return `synthetic-result-capture-result-reference-preview:${id}`;
}

function buildSyntheticResultCaptureAuditReference(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): `synthetic-result-capture-audit-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}` {
  return `synthetic-result-capture-audit-preview:${id}`;
}

function buildSyntheticResultCaptureApprovalReference(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): `synthetic-result-capture-approval-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}` {
  return `synthetic-result-capture-approval-preview:${id}`;
}

function buildSyntheticResultCaptureEvidenceReference(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): `synthetic-result-capture-evidence-preview:${MinimalManualGatedSyntheticDryRunResultCaptureMvpId}` {
  return `synthetic-result-capture-evidence-preview:${id}`;
}

function resolveRequestLabel(
  id: MinimalManualGatedSyntheticDryRunResultCaptureMvpId
): string {
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

export function captureMinimalManualGatedSyntheticDryRunResultMvp(
  input: MinimalManualGatedSyntheticDryRunResultCaptureMvpRunInput
): MinimalManualGatedSyntheticDryRunResultCaptureMvpServerRunRecord {
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
    input.syntheticCaptureMode,
    "synthetic-only",
    "Synthetic-only capture mode is required."
  );
  assertEqual(
    input.manualGatedMode,
    "manual-gated",
    "Manual-gated fixture mode is required."
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
  assertEqual(
    input.syntheticExecutionResult.providerResponseState,
    "not received",
    "Synthetic execution result fixture must not include a provider response."
  );
  assertEqual(
    input.syntheticExecutionResult.modelOutputState,
    "not generated",
    "Synthetic execution result fixture must not include model output."
  );
  assertEqual(
    input.syntheticExecutionResult.inMemoryOnlyResultStatement,
    "synthetic execution result is produced in memory only",
    "Synthetic execution result fixture must remain in memory only."
  );
  assertEqual(
    input.syntheticExecutionResult.deterministicSyntheticResultStatement,
    "deterministic synthetic result only",
    "Synthetic execution result fixture must remain deterministic."
  );

  const requestLabel = resolveRequestLabel(input.resultCaptureMvpId);

  return {
    resultCaptureMvpId: input.resultCaptureMvpId,
    requestLabel,
    sourceSyntheticExecutionResultReference: input.syntheticExecutionResult.key,
    syntheticResultId: input.syntheticExecutionResult.resultId,
    captureState: "captured-synthetic-in-memory-only",
    resultState: "deterministic synthetic result captured in memory only",
    syntheticCaptureId: buildSyntheticResultCaptureId(input.resultCaptureMvpId),
    syntheticDigest: buildSyntheticResultCaptureDigest(input.resultCaptureMvpId),
    resultReference: buildSyntheticResultCaptureResultReference(
      input.resultCaptureMvpId
    ),
    auditReference: buildSyntheticResultCaptureAuditReference(
      input.resultCaptureMvpId
    ),
    approvalReference: buildSyntheticResultCaptureApprovalReference(
      input.resultCaptureMvpId
    ),
    evidenceReference: buildSyntheticResultCaptureEvidenceReference(
      input.resultCaptureMvpId
    ),
    resultPayload: {
      label: "static synthetic result capture placeholder only",
      captureEnvelopeState: "preview-only",
      evidenceDigest: buildSyntheticResultCaptureDigest(input.resultCaptureMvpId),
      auditPreviewState: "preview-only / not persisted",
      approvalPreviewState: "preview-only",
    },
    captureTimestampPosture: "static fixture label only / no real timestamp",
    persistenceState: "not implemented",
    currentReadiness:
      "minimal-synthetic-result-capture-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent",
    serverOnlyHelperStatement:
      "server-only synthetic result capture helper exists",
    deterministicSyntheticCaptureStatement:
      "deterministic synthetic capture only",
    inMemoryOnlyCaptureStatement:
      "synthetic result capture is produced in memory only",
    noFrontendRequestStatement: "no frontend request is created",
    noApiRouteStatement: "no API route is created",
    nextResultCaptureReviewRecoveryChecklist: [
      ...NEXT_RESULT_CAPTURE_REVIEW_RECOVERY_CHECKLIST,
    ],
  };
}

export function runMinimalManualGatedSyntheticDryRunResultCaptureMvpForStaticFixture(): MinimalManualGatedSyntheticDryRunResultCaptureMvpServerRunRecord {
  return captureMinimalManualGatedSyntheticDryRunResultMvp({
    resultCaptureMvpId: "conversational-planning-request",
    backendOwnedMode: "backend-owned",
    serverOnlyMode: "server-only",
    syntheticCaptureMode: "synthetic-only",
    manualGatedMode: "manual-gated",
    syntheticExecutionResult: {
      key: "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result:conversational-planning-request",
      executionMvpId: "conversational-planning-request",
      resultId: "synthetic-mvp-result-preview:conversational-planning-request",
      syntheticDigest:
        "synthetic-mvp-digest-preview:conversational-planning-request:approve-preview",
      providerResponseState: "not received",
      modelOutputState: "not generated",
      deterministicSyntheticResultStatement:
        "deterministic synthetic result only",
      inMemoryOnlyResultStatement:
        "synthetic execution result is produced in memory only",
    },
    approvalFixtureState: "preview-only",
    manualConfirmationFixtureState: "preview-only",
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
