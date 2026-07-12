import {
  buildStableDryRunDenialFailureKey,
  buildStableDryRunFixtureResultKey,
  buildStableDryRunRequestPacketKey,
  listDryRunDenialFailurePreviews,
  listDryRunFixtureResultPreviews,
  listDryRunRequestPacketPreviews,
  listManualGatedModelAdapterDryRunScenarios,
} from "../manual-gated-model-adapter-dry-run-harness";
import type {
  ManualGatedModelAdapterDryRunCapabilityFamilyLabel,
  ManualGatedModelAdapterDryRunDenialFailurePreviewRecord,
  ManualGatedModelAdapterDryRunFixtureResultPreviewRecord,
  ManualGatedModelAdapterDryRunRequestPacketPreviewRecord,
  ManualGatedModelAdapterDryRunScenarioId,
  ManualGatedModelAdapterDryRunScenarioRecord,
} from "../manual-gated-model-adapter-dry-run-harness";
import {
  MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH,
  MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_PHASE,
  NEXT_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
  PREVIOUS_COMPLETED_MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH,
} from "./model-adapter-dry-run-result-review-recovery-types";
import type {
  ModelAdapterDryRunAcceptanceMatrixKey,
  ModelAdapterDryRunAcceptanceMatrixRecord,
  ModelAdapterDryRunAcceptanceSummary,
  ModelAdapterDryRunQualityReviewKey,
  ModelAdapterDryRunQualityReviewRecord,
  ModelAdapterDryRunRecoveryPlanKey,
  ModelAdapterDryRunRecoveryPlanPreviewRecord,
  ModelAdapterDryRunRecoverySummary,
  ModelAdapterDryRunResultReviewCapabilityGroup,
  ModelAdapterDryRunResultReviewKey,
  ModelAdapterDryRunResultReviewRecord,
  ModelAdapterDryRunResultReviewSummary,
  ModelAdapterDryRunResultReviewWorkspaceGroup,
  ModelAdapterDryRunSafetyRedactionReviewRecord,
  ModelAdapterDryRunSafetyReviewKey,
} from "./model-adapter-dry-run-result-review-recovery-types";

const RESULT_REVIEW_VERSION =
  "jarvis-model-gateway-dry-run-result-review-v1" as const;
const QUALITY_REVIEW_VERSION =
  "jarvis-model-gateway-dry-run-quality-review-v1" as const;
const SAFETY_REVIEW_VERSION =
  "jarvis-model-gateway-dry-run-safety-redaction-review-v1" as const;
const RECOVERY_PLAN_VERSION =
  "jarvis-model-gateway-dry-run-recovery-plan-preview-v1" as const;
const ACCEPTANCE_MATRIX_VERSION =
  "jarvis-model-gateway-dry-run-acceptance-matrix-v1" as const;
const NEXT_BATCH_MARKER =
  "Athena model routing and provider selection preview next" as const;
const NEXT_BATCH_COPY =
  "Athena model routing and provider selection preview comes next.";

const RESULT_REVIEW_SUMMARY_LINES = [
  "model adapter dry-run result review and recovery only",
  "dry-run result review is fixture-only",
  "quality review is static preview only",
  "safety review is static preview only",
  "redaction review is static preview only",
  "recovery is manual review only",
  "dry-run acceptance matrix is preview-only",
  "no prompt sending",
  "no LLM/model calls",
  "no frontend provider call",
  "no frontend fetch/network call",
  "no provider SDK imports",
  "no provider execution",
  "no plugin execution",
  "no autonomous execution",
  "no live video generation",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no retry execution",
  "no fallback execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no persistent memory",
  "no browser storage",
  "no database writes",
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval required",
  "manual confirmation required",
  "kill switch required",
  "audit required",
  "opaque credential references only",
  "no plaintext secrets",
  NEXT_BATCH_MARKER,
  NEXT_BATCH_COPY,
] as const;

const SHARED_NO_LIVE_RESULT_REVIEW_STATEMENT =
  "dry-run result review is fixture-only. provider response is not received. model output is not generated. static fixture result only. no prompt sending. no LLM/model calls.";
const SHARED_NO_LIVE_QUALITY_STATEMENT =
  "quality review is static preview only. no provider quality result is available. no generated model output exists. no live quality result is measured.";
const SHARED_NO_LIVE_SAFETY_STATEMENT =
  "safety review is static preview only. redaction review is static preview only. privacy review is static preview only. no live safety result is available.";
const SHARED_NO_RETRY_NO_FALLBACK_STATEMENT =
  "No retry execution. No fallback execution. No provider execution. No model calls. No persistence.";

function cloneList<T>(values: readonly T[]): readonly T[] {
  return values.map((value) => value);
}

function cloneResultReview(
  review: ModelAdapterDryRunResultReviewRecord
): ModelAdapterDryRunResultReviewRecord {
  return { ...review };
}

function cloneQualityReview(
  review: ModelAdapterDryRunQualityReviewRecord
): ModelAdapterDryRunQualityReviewRecord {
  return {
    ...review,
    acceptanceCriteria: cloneList(review.acceptanceCriteria),
    blockedAcceptanceCriteria: cloneList(review.blockedAcceptanceCriteria),
    operatorReviewNotes: cloneList(review.operatorReviewNotes),
    missingEvidence: cloneList(review.missingEvidence),
  };
}

function cloneSafetyReview(
  review: ModelAdapterDryRunSafetyRedactionReviewRecord
): ModelAdapterDryRunSafetyRedactionReviewRecord {
  return { ...review };
}

function cloneRecoveryPlan(
  review: ModelAdapterDryRunRecoveryPlanPreviewRecord
): ModelAdapterDryRunRecoveryPlanPreviewRecord {
  return { ...review };
}

function cloneAcceptanceMatrix(
  record: ModelAdapterDryRunAcceptanceMatrixRecord
): ModelAdapterDryRunAcceptanceMatrixRecord {
  return {
    ...record,
    acceptanceCriteria: cloneList(record.acceptanceCriteria),
    blockerCriteria: cloneList(record.blockerCriteria),
    safetyCriteria: cloneList(record.safetyCriteria),
    privacyCriteria: cloneList(record.privacyCriteria),
    costRateCriteria: cloneList(record.costRateCriteria),
    auditCriteria: cloneList(record.auditCriteria),
    approvalCriteria: cloneList(record.approvalCriteria),
    serverOnlyCriteria: cloneList(record.serverOnlyCriteria),
    credentialIsolationCriteria: cloneList(record.credentialIsolationCriteria),
  };
}

const DRY_RUN_SCENARIOS = listManualGatedModelAdapterDryRunScenarios();
const DRY_RUN_REQUEST_PACKET_PREVIEWS = listDryRunRequestPacketPreviews();
const DRY_RUN_FIXTURE_RESULT_PREVIEWS = listDryRunFixtureResultPreviews();
const DRY_RUN_DENIAL_FAILURE_PREVIEWS = listDryRunDenialFailurePreviews();

const REQUEST_PACKET_BY_SCENARIO_ID = new Map(
  DRY_RUN_REQUEST_PACKET_PREVIEWS.map((record) => [
    record.dryRunScenarioId,
    record,
  ])
);
const FIXTURE_RESULT_BY_SCENARIO_ID = new Map(
  DRY_RUN_FIXTURE_RESULT_PREVIEWS.map((record) => [
    record.key.replace("athena-model-adapter-dry-run-fixture-result:", "") as ManualGatedModelAdapterDryRunScenarioId,
    record,
  ])
);
const DENIAL_FAILURE_BY_SCENARIO_ID = new Map(
  DRY_RUN_DENIAL_FAILURE_PREVIEWS.map((record) => [
    record.dryRunScenarioId,
    record,
  ])
);

function resolveRequiredRequestPacket(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ManualGatedModelAdapterDryRunRequestPacketPreviewRecord {
  const requestPacket = REQUEST_PACKET_BY_SCENARIO_ID.get(scenarioId);
  if (!requestPacket) {
    throw new Error(`Missing dry-run request packet preview: ${scenarioId}`);
  }

  return requestPacket;
}

function resolveRequiredFixtureResult(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ManualGatedModelAdapterDryRunFixtureResultPreviewRecord {
  const fixtureResult = FIXTURE_RESULT_BY_SCENARIO_ID.get(scenarioId);
  if (!fixtureResult) {
    throw new Error(`Missing dry-run fixture result preview: ${scenarioId}`);
  }

  return fixtureResult;
}

function resolveRequiredDenialFailure(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ManualGatedModelAdapterDryRunDenialFailurePreviewRecord {
  const denialFailure = DENIAL_FAILURE_BY_SCENARIO_ID.get(scenarioId);
  if (!denialFailure) {
    throw new Error(`Missing dry-run denial/failure preview: ${scenarioId}`);
  }

  return denialFailure;
}

function buildAcceptanceCriteria(
  scenario: ManualGatedModelAdapterDryRunScenarioRecord
): readonly string[] {
  return [
    `${scenario.label} remains fixture-only inside ${scenario.workspaceTarget}.`,
    "Provider response is not received and model output is not generated.",
    "Manual operator review, manual recovery review, operator approval, manual confirmation, kill switch, audit, and server-only boundaries stay visible together.",
  ] as const;
}

function buildBlockedAcceptanceCriteria(
  scenario: ManualGatedModelAdapterDryRunScenarioRecord
): readonly string[] {
  return [
    scenario.blockedDefaultReason,
    "Prompt sending is not implemented.",
    "Live provider execution is blocked by default.",
    "Result, audit, and approval persistence are not implemented.",
  ] as const;
}

function buildOperatorReviewNotes(
  scenario: ManualGatedModelAdapterDryRunScenarioRecord
): readonly string[] {
  return [
    `${scenario.capabilityFamilyLabel} review remains static preview only.`,
    "Manual operator review required before any routing or provider-selection discussion.",
    "Review denial/failure posture and acceptance blockers without enabling execution.",
  ] as const;
}

function buildMissingEvidence(
  scenario: ManualGatedModelAdapterDryRunScenarioRecord
): readonly string[] {
  return [
    `No live provider response for ${scenario.label}.`,
    "No generated model output.",
    "No persisted result, audit, or approval record.",
  ] as const;
}

function buildAcceptanceMatrixNextAction(
  capabilityFamilyLabel: ManualGatedModelAdapterDryRunCapabilityFamilyLabel
): string {
  return `Keep ${capabilityFamilyLabel} blocked / fixture-only and complete manual review before Athena model routing and provider selection preview comes next.`;
}

export function buildStableModelAdapterDryRunReviewKey(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ModelAdapterDryRunResultReviewKey {
  return `athena-model-adapter-dry-run-result-review:${scenarioId}`;
}

export function buildStableDryRunQualityReviewKey(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ModelAdapterDryRunQualityReviewKey {
  return `athena-model-adapter-dry-run-quality-review:${scenarioId}`;
}

export function buildStableDryRunSafetyReviewKey(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ModelAdapterDryRunSafetyReviewKey {
  return `athena-model-adapter-dry-run-safety-review:${scenarioId}`;
}

export function buildStableDryRunRecoveryPlanKey(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ModelAdapterDryRunRecoveryPlanKey {
  return `athena-model-adapter-dry-run-recovery-plan:${scenarioId}`;
}

export function buildStableDryRunAcceptanceMatrixKey(
  scenarioId: ManualGatedModelAdapterDryRunScenarioId
): ModelAdapterDryRunAcceptanceMatrixKey {
  return `athena-model-adapter-dry-run-acceptance-matrix:${scenarioId}`;
}

function buildResultReviewRecord(
  scenario: ManualGatedModelAdapterDryRunScenarioRecord
): ModelAdapterDryRunResultReviewRecord {
  return {
    key: buildStableModelAdapterDryRunReviewKey(scenario.id),
    reviewVersion: RESULT_REVIEW_VERSION,
    dryRunScenarioId: scenario.id,
    capabilityId: scenario.adapterCapabilityId,
    capabilityFamilyLabel: scenario.capabilityFamilyLabel,
    workspaceTarget: scenario.workspaceTarget,
    dryRunRequestPacketReference: buildStableDryRunRequestPacketKey(scenario.id),
    fixtureResultReference: buildStableDryRunFixtureResultKey(scenario.id),
    source: "Jarvis Model Gateway / Athena",
    reviewMode: "fixture-only dry-run result review",
    resultPosture: "static fixture only",
    modelOutputPosture: "not generated",
    providerResponsePosture: "not received",
    promptSendingPosture: "not implemented",
    sdkPosture: "no SDK imports",
    credentialPosture: "opaque credential references only",
    secretPosture: "no plaintext secrets",
    environmentPosture: "no env var reads",
    frontendPosture: "blocked",
    backendPosture: "server-only required",
    executionPosture: "blocked by default",
    manualOperatorReviewRequired: "manual operator review required",
    manualRecoveryReviewRequired: "manual recovery review required",
    operatorApprovalRequired: "operator approval required",
    manualConfirmationRequired: "manual confirmation required",
    killSwitchRequired: "kill switch required",
    auditRequired: "audit required",
    credentialIsolationRequired: "credential isolation required",
    privacyRedactionRequired: "privacy/redaction required",
    costAcknowledgementRequired: "cost acknowledgement required",
    rateLimitGuardRequired: "rate limit guard required",
    timeoutCancelGuardRequired: "timeout/cancel guard required",
    idempotencyRequired: "idempotency required",
    replayBlockRequired: "replay block required",
    singleDryRunLockRequired: "single dry-run lock required",
    resultCaptureRequiredInFuture: "result capture required in future",
    resultPersistenceState: "result persistence not implemented",
    auditPersistenceState: "audit persistence not implemented",
    approvalPersistenceState: "approval persistence not implemented",
    nextModelRoutingProviderSelectionRequirement: NEXT_BATCH_MARKER,
    blockedDefaultReason: scenario.blockedDefaultReason,
    noLiveResultReviewStatement: SHARED_NO_LIVE_RESULT_REVIEW_STATEMENT,
  };
}

function buildQualityReviewRecord(
  scenario: ManualGatedModelAdapterDryRunScenarioRecord
): ModelAdapterDryRunQualityReviewRecord {
  return {
    key: buildStableDryRunQualityReviewKey(scenario.id),
    qualityReviewVersion: QUALITY_REVIEW_VERSION,
    dryRunScenarioId: scenario.id,
    capabilityId: scenario.adapterCapabilityId,
    capabilityFamilyLabel: scenario.capabilityFamilyLabel,
    workspaceTarget: scenario.workspaceTarget,
    dryRunRequestPacketReference: buildStableDryRunRequestPacketKey(scenario.id),
    fixtureResultReference: buildStableDryRunFixtureResultKey(scenario.id),
    qualityState: "static preview only",
    providerQualityState: "not measured",
    modelOutputState: "not generated",
    acceptanceCriteria: buildAcceptanceCriteria(scenario),
    blockedAcceptanceCriteria: buildBlockedAcceptanceCriteria(scenario),
    operatorReviewNotes: buildOperatorReviewNotes(scenario),
    missingEvidence: buildMissingEvidence(scenario),
    requiredRecoveryAction:
      "Compare blocked acceptance criteria with the recovery plan preview and keep the scenario inside manual review only posture.",
    nextSafeAction: buildAcceptanceMatrixNextAction(
      scenario.capabilityFamilyLabel
    ),
    noLiveQualityResultStatement: SHARED_NO_LIVE_QUALITY_STATEMENT,
  };
}

function buildSafetyReviewRecord(
  scenario: ManualGatedModelAdapterDryRunScenarioRecord
): ModelAdapterDryRunSafetyRedactionReviewRecord {
  return {
    key: buildStableDryRunSafetyReviewKey(scenario.id),
    safetyRedactionReviewVersion: SAFETY_REVIEW_VERSION,
    dryRunScenarioId: scenario.id,
    capabilityId: scenario.adapterCapabilityId,
    capabilityFamilyLabel: scenario.capabilityFamilyLabel,
    workspaceTarget: scenario.workspaceTarget,
    fixtureResultReference: buildStableDryRunFixtureResultKey(scenario.id),
    safetyReviewState: "static preview only",
    redactionReviewState: "static preview only",
    privacyReviewState: "static preview only",
    promptLeakageCheckState: "static preview only",
    credentialLeakageCheckState: "static preview only",
    tokenLeakageCheckState: "static preview only",
    unsafeOutputCheckState: "static preview only",
    requiredOperatorReview: "manual operator review required",
    blockedDefaultReason: scenario.blockedDefaultReason,
    noLiveSafetyResultStatement: SHARED_NO_LIVE_SAFETY_STATEMENT,
  };
}

function buildRecoveryPlanRecord(
  scenario: ManualGatedModelAdapterDryRunScenarioRecord
): ModelAdapterDryRunRecoveryPlanPreviewRecord {
  const denialFailure = resolveRequiredDenialFailure(scenario.id);

  return {
    key: buildStableDryRunRecoveryPlanKey(scenario.id),
    recoveryPlanVersion: RECOVERY_PLAN_VERSION,
    dryRunScenarioId: scenario.id,
    capabilityId: scenario.adapterCapabilityId,
    capabilityFamilyLabel: scenario.capabilityFamilyLabel,
    workspaceTarget: scenario.workspaceTarget,
    denialFailurePreviewReference: buildStableDryRunDenialFailureKey(
      scenario.id
    ),
    fixtureResultReference: buildStableDryRunFixtureResultKey(scenario.id),
    recoveryPosture: "manual review only",
    retryPosture: "disabled",
    fallbackPosture: "disabled",
    timeoutCancelPosture: denialFailure.timeoutCancelPosture,
    missingApprovalRecovery:
      "missing approval recovery: keep the scenario locked, require operator approval, and stop before any backend handoff.",
    killSwitchBlockedRecovery:
      "kill switch blocked recovery: preserve the kill switch posture and treat the scenario as review-only until the operator clears the block.",
    missingOpaqueCredentialRecovery:
      "missing opaque credential recovery: restore an opaque credential label only, keep secret material hidden, and leave execution blocked.",
    promptNotSentRecovery:
      "prompt not sent recovery: confirm fixture-only posture, preserve redacted placeholder payloads, and do not attempt prompt sending.",
    providerNotCalledRecovery:
      "provider not called recovery: record the blocked provider posture, keep provider execution blocked, and do not switch to a live adapter.",
    resultNotGeneratedRecovery:
      "result not generated recovery: keep the fixture result as the only review artifact and do not claim generated output exists.",
    auditNotPersistedRecovery:
      "audit not persisted recovery: keep audit review in-memory only and document the missing persistence as an explicit blocker.",
    approvalNotPersistedRecovery:
      "approval not persisted recovery: preserve approval review as preview-only and do not claim an approved persisted state exists.",
    resultNotPersistedRecovery:
      "result not persisted recovery: maintain static fixture references only and do not create or imply a persisted result store.",
    operatorActionRequired:
      "Manual operator review required. Review denial/failure posture, quality blockers, safety blockers, and acceptance blockers before moving to the next preview batch.",
    nextSafeBatchRecommendation: NEXT_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
    noRetryNoFallbackNoExecutionStatement:
      SHARED_NO_RETRY_NO_FALLBACK_STATEMENT,
  };
}

function buildAcceptanceMatrixRecord(
  scenario: ManualGatedModelAdapterDryRunScenarioRecord
): ModelAdapterDryRunAcceptanceMatrixRecord {
  return {
    key: buildStableDryRunAcceptanceMatrixKey(scenario.id),
    acceptanceMatrixVersion: ACCEPTANCE_MATRIX_VERSION,
    scenarioId: scenario.id,
    capabilityId: scenario.adapterCapabilityId,
    capabilityFamilyLabel: scenario.capabilityFamilyLabel,
    workspaceTarget: scenario.workspaceTarget,
    acceptanceCriteria: buildAcceptanceCriteria(scenario),
    blockerCriteria: buildBlockedAcceptanceCriteria(scenario),
    safetyCriteria: [
      "safety review is static preview only",
      "unsafe output check remains static preview only",
      "provider execution stays blocked until backend-only gates exist",
    ] as const,
    privacyCriteria: [
      "privacy review is static preview only",
      "redaction review is static preview only",
      "prompt and credential leakage checks remain static preview only",
    ] as const,
    costRateCriteria: [
      "cost acknowledgement required",
      "rate limit guard required",
      "timeout/cancel guard required",
    ] as const,
    auditCriteria: [
      "audit required",
      "audit persistence not implemented",
      "manual audit review required",
    ] as const,
    approvalCriteria: [
      "operator approval required",
      "manual confirmation required",
      "approval persistence not implemented",
    ] as const,
    serverOnlyCriteria: [
      "server-only adapters required",
      "backend-only execution path required",
      "frontend posture remains blocked",
    ] as const,
    credentialIsolationCriteria: [
      "credential isolation required",
      "opaque credential references only",
      "no plaintext secrets",
    ] as const,
    currentState: "blocked / fixture-only",
    operatorDecisionState: "pending manual review",
    nextAction: buildAcceptanceMatrixNextAction(
      scenario.capabilityFamilyLabel
    ),
  };
}

const MODEL_ADAPTER_DRY_RUN_RESULT_REVIEWS = DRY_RUN_SCENARIOS.map((scenario) =>
  buildResultReviewRecord(scenario)
);

const DRY_RUN_QUALITY_REVIEWS = DRY_RUN_SCENARIOS.map((scenario) =>
  buildQualityReviewRecord(scenario)
);

const DRY_RUN_SAFETY_REVIEWS = DRY_RUN_SCENARIOS.map((scenario) =>
  buildSafetyReviewRecord(scenario)
);

const DRY_RUN_RECOVERY_PLAN_PREVIEWS = DRY_RUN_SCENARIOS.map((scenario) =>
  buildRecoveryPlanRecord(scenario)
);

const DRY_RUN_ACCEPTANCE_MATRIX_RECORDS = DRY_RUN_SCENARIOS.map((scenario) =>
  buildAcceptanceMatrixRecord(scenario)
);

export function listModelAdapterDryRunResultReviews(): readonly ModelAdapterDryRunResultReviewRecord[] {
  return MODEL_ADAPTER_DRY_RUN_RESULT_REVIEWS.map((review) =>
    cloneResultReview(review)
  );
}

export function listDryRunQualityReviews(): readonly ModelAdapterDryRunQualityReviewRecord[] {
  return DRY_RUN_QUALITY_REVIEWS.map((review) => cloneQualityReview(review));
}

export function listDryRunSafetyRedactionReviews(): readonly ModelAdapterDryRunSafetyRedactionReviewRecord[] {
  return DRY_RUN_SAFETY_REVIEWS.map((review) => cloneSafetyReview(review));
}

export function listDryRunRecoveryPlanPreviews(): readonly ModelAdapterDryRunRecoveryPlanPreviewRecord[] {
  return DRY_RUN_RECOVERY_PLAN_PREVIEWS.map((review) =>
    cloneRecoveryPlan(review)
  );
}

export function listDryRunAcceptanceMatrixRecords(): readonly ModelAdapterDryRunAcceptanceMatrixRecord[] {
  return DRY_RUN_ACCEPTANCE_MATRIX_RECORDS.map((record) =>
    cloneAcceptanceMatrix(record)
  );
}

function groupReviewsByLabel(
  labels: readonly ManualGatedModelAdapterDryRunCapabilityFamilyLabel[]
): readonly ModelAdapterDryRunResultReviewCapabilityGroup[] {
  const reviews = listModelAdapterDryRunResultReviews();

  return labels.map((capabilityFamilyLabel) => {
    const matchingReviews = reviews.filter(
      (review) => review.capabilityFamilyLabel === capabilityFamilyLabel
    );

    return {
      capabilityFamilyLabel,
      reviewCount: matchingReviews.length,
      reviews: matchingReviews,
    };
  });
}

export function groupResultReviewsByCapabilityFamily(): readonly ModelAdapterDryRunResultReviewCapabilityGroup[] {
  const labels = Array.from(
    new Set(
      DRY_RUN_SCENARIOS.map((scenario) => scenario.capabilityFamilyLabel)
    )
  );

  return groupReviewsByLabel(labels);
}

export function groupResultReviewsByWorkspaceTarget(): readonly ModelAdapterDryRunResultReviewWorkspaceGroup[] {
  const reviews = listModelAdapterDryRunResultReviews();
  const workspaceTargets = Array.from(
    new Set(reviews.map((review) => review.workspaceTarget))
  );

  return workspaceTargets.map((workspaceTarget) => {
    const matchingReviews = reviews.filter(
      (review) => review.workspaceTarget === workspaceTarget
    );

    return {
      workspaceTarget,
      reviewCount: matchingReviews.length,
      reviews: matchingReviews,
    };
  });
}

export function buildDryRunResultReviewSummary(): ModelAdapterDryRunResultReviewSummary {
  const resultReviews = listModelAdapterDryRunResultReviews();
  const qualityReviews = listDryRunQualityReviews();
  const safetyReviews = listDryRunSafetyRedactionReviews();
  const recoveryPlans = listDryRunRecoveryPlanPreviews();
  const acceptanceMatrixRecords = listDryRunAcceptanceMatrixRecords();
  const capabilityGroups = groupResultReviewsByCapabilityFamily();
  const workspaceGroups = groupResultReviewsByWorkspaceTarget();

  return {
    currentBatch: MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH,
    highestDetectedPhase: MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_PHASE,
    latestCompletedBatch: MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH,
    previousCompletedBatch:
      PREVIOUS_COMPLETED_MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH,
    nextLikelyBatch: NEXT_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
    resultReviewCount: resultReviews.length,
    qualityReviewCount: qualityReviews.length,
    safetyReviewCount: safetyReviews.length,
    recoveryPlanCount: recoveryPlans.length,
    acceptanceMatrixCount: acceptanceMatrixRecords.length,
    capabilityFamilyCount: capabilityGroups.length,
    workspaceTargetCount: workspaceGroups.length,
    summaryLines: cloneList(RESULT_REVIEW_SUMMARY_LINES),
  };
}

export function buildDryRunRecoverySummary(): ModelAdapterDryRunRecoverySummary {
  const recoveryPlans = listDryRunRecoveryPlanPreviews();

  return {
    currentBatch: MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH,
    nextLikelyBatch: NEXT_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
    recoveryPlanCount: recoveryPlans.length,
    manualReviewOnlyCount: recoveryPlans.filter(
      (plan) => plan.recoveryPosture === "manual review only"
    ).length,
    retryDisabledCount: recoveryPlans.filter(
      (plan) => plan.retryPosture === "disabled"
    ).length,
    fallbackDisabledCount: recoveryPlans.filter(
      (plan) => plan.fallbackPosture === "disabled"
    ).length,
    summaryLines: [
      "recovery is manual review only",
      "retry disabled",
      "fallback disabled",
      "no retry execution",
      "no fallback execution",
      "provider execution remains blocked",
      NEXT_BATCH_COPY,
    ] as const,
  };
}

export function buildDryRunAcceptanceSummary(): ModelAdapterDryRunAcceptanceSummary {
  const acceptanceMatrixRecords = listDryRunAcceptanceMatrixRecords();

  return {
    currentBatch: MODEL_ADAPTER_DRY_RUN_RESULT_REVIEW_RECOVERY_BATCH,
    nextLikelyBatch: NEXT_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
    acceptanceMatrixCount: acceptanceMatrixRecords.length,
    blockedFixtureOnlyCount: acceptanceMatrixRecords.filter(
      (record) => record.currentState === "blocked / fixture-only"
    ).length,
    pendingManualReviewCount: acceptanceMatrixRecords.filter(
      (record) => record.operatorDecisionState === "pending manual review"
    ).length,
    summaryLines: [
      "dry-run acceptance matrix is preview-only",
      "acceptance criteria remain static review only",
      "operator decision state remains pending manual review",
      NEXT_BATCH_COPY,
    ] as const,
  };
}

export function buildNextModelRoutingAndProviderSelectionChecklist(): readonly string[] {
  return [
    NEXT_MODEL_ROUTING_PROVIDER_SELECTION_PREVIEW_BATCH,
    NEXT_BATCH_MARKER,
    NEXT_BATCH_COPY,
    "Review capability-family coverage and workspace targeting without enabling provider execution.",
    "Keep provider response not received and model output not generated until backend-only execution exists.",
    "Carry acceptance blockers, safety blockers, privacy blockers, cost/rate blockers, and audit blockers into the routing preview.",
    "Continue with no prompt sending, no LLM/model calls, no provider SDK imports, no retry execution, no fallback execution, and no persistence.",
  ] as const;
}
