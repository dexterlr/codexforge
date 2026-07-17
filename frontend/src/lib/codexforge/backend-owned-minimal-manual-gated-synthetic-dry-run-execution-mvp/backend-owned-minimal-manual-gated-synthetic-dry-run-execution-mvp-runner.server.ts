import "server-only";

import type {
  MinimalManualGatedSyntheticDryRunExecutionMvpId,
  MinimalManualGatedSyntheticDryRunExecutionMvpRunInput,
  MinimalManualGatedSyntheticDryRunExecutionMvpServerRunRecord,
} from "./backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-types";

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
} as const satisfies Record<MinimalManualGatedSyntheticDryRunExecutionMvpId, string>;

const NEXT_EXECUTION_REVIEW_RECOVERY_CHECKLIST = [
  "Review the deterministic synthetic result envelope before adding recovery previews.",
  "Keep the execution path backend-only, server-only, and in-memory only.",
  "Do not create a frontend request or API route.",
  "Do not send prompts, call models, import provider SDKs, or execute providers/plugins.",
  "execution review and recovery preview comes next",
] as const;

function buildSyntheticMvpResultId(
  executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId
): `synthetic-mvp-result-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}` {
  return `synthetic-mvp-result-preview:${executionMvpId}`;
}

function buildSyntheticMvpDigest(
  executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId
): `synthetic-mvp-digest-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}:approve-preview` {
  return `synthetic-mvp-digest-preview:${executionMvpId}:approve-preview`;
}

function buildSyntheticMvpAuditReference(
  executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId
): `synthetic-mvp-audit-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}` {
  return `synthetic-mvp-audit-preview:${executionMvpId}`;
}

function buildSyntheticMvpApprovalReference(
  executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId
): `synthetic-mvp-approval-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}` {
  return `synthetic-mvp-approval-preview:${executionMvpId}`;
}

function buildSyntheticMvpResultReference(
  executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId
): `synthetic-mvp-result-envelope-preview:${MinimalManualGatedSyntheticDryRunExecutionMvpId}` {
  return `synthetic-mvp-result-envelope-preview:${executionMvpId}`;
}

function resolveRequestLabel(
  executionMvpId: MinimalManualGatedSyntheticDryRunExecutionMvpId
): string {
  return REQUEST_LABELS[executionMvpId];
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

export function runMinimalManualGatedSyntheticDryRunMvp(
  input: MinimalManualGatedSyntheticDryRunExecutionMvpRunInput
): MinimalManualGatedSyntheticDryRunExecutionMvpServerRunRecord {
  const requestLabel = resolveRequestLabel(input.executionMvpId);

  assertEqual(
    input.executionMode,
    "synthetic-only",
    "Synthetic-only execution mode is required."
  );
  assertEqual(
    input.executionOwnership,
    "backend-owned",
    "Backend-owned execution mode is required."
  );
  assertEqual(
    input.manualApprovalDecisionFixtureState,
    "preview-only",
    "Manual approval decision fixture must exist and remain preview-only."
  );
  assertEqual(
    input.previewOnlyDecisionState,
    "preview-only",
    "Manual approval decision fixture must stay preview-only."
  );
  assertEqual(
    input.selectedDecisionFixture,
    "static synthetic approve-preview fixture",
    "Selected decision fixture must be the static synthetic approve-preview fixture."
  );
  assertEqual(
    input.manualConfirmationFixtureState,
    "preview-only",
    "Manual confirmation fixture must stay preview-only."
  );
  assertEqual(
    input.killSwitchFixtureState,
    "inactive",
    "Kill switch fixture must remain inactive."
  );
  assertEqual(
    input.providerExecutionRequestState,
    "blocked",
    "Provider execution must remain blocked."
  );
  assertEqual(
    input.promptSendingRequestState,
    "blocked",
    "Prompt sending must remain blocked."
  );
  assertEqual(
    input.modelCallRequestState,
    "blocked",
    "Model calls must remain blocked."
  );
  assertEqual(
    input.queueDispatchRequestState,
    "blocked",
    "Queue dispatch must remain blocked."
  );
  assertEqual(
    input.workerDispatchRequestState,
    "blocked",
    "Worker dispatch must remain blocked."
  );
  assertEqual(
    input.jobExecutionRequestState,
    "blocked",
    "Job execution must remain blocked."
  );
  assertEqual(
    input.persistenceRequestState,
    "blocked",
    "Persistence must remain blocked."
  );

  return {
    executionMvpId: input.executionMvpId,
    requestLabel,
    acceptedSyntheticAdmission: "yes, as fixture-only",
    resultId: buildSyntheticMvpResultId(input.executionMvpId),
    syntheticDigest: buildSyntheticMvpDigest(input.executionMvpId),
    auditReference: buildSyntheticMvpAuditReference(input.executionMvpId),
    approvalReference: buildSyntheticMvpApprovalReference(input.executionMvpId),
    resultReference: buildSyntheticMvpResultReference(input.executionMvpId),
    executionState: "completed-synthetic-mvp-only",
    persistenceState: "not implemented",
    currentReadiness:
      "minimal-synthetic-execution-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent",
    serverOnlyHelperStatement: "server-only synthetic execution helper exists",
    deterministicSyntheticResultStatement:
      "deterministic synthetic result only",
    inMemoryOnlyResultStatement:
      "synthetic execution result is produced in memory only",
    noFrontendRequestStatement: "no frontend request is created",
    noApiRouteStatement: "no API route is created",
    nextExecutionReviewRecoveryChecklist: [
      ...NEXT_EXECUTION_REVIEW_RECOVERY_CHECKLIST,
    ],
  };
}
