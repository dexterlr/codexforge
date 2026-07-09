import "server-only";

import type { Route } from "next";
import type { JarvisVideoFirstProviderTrialResultReviewRecoveryPreview } from "../jarvis-video-first-provider-trial-result-review-recovery-preview";

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_PHASE_RANGE =
  "4330-4361 - Jarvis Video First Provider Trial Result Review and Recovery";

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_TITLE =
  "Jarvis Video First Provider Trial Result Review and Recovery";

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_VERSION =
  "jarvis-video-first-provider-trial-result-review-recovery-v1";

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RECOVERY_VERSION =
  "jarvis-video-first-provider-trial-recovery-v1";

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_RUNTIME_VERSION_REFERENCE =
  "jarvis-video-first-gated-provider-execution-trial-runtime-v1";

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_HIGHEST_PHASE =
  4361 as const;

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_LATEST_COMPLETED_BATCH =
  JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_PHASE_RANGE;

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_PREVIOUS_COMPLETED_BATCH =
  "4298-4329 - Jarvis Video First Gated Provider Execution Trial Runtime";

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_NEXT_LIKELY_BATCH =
  "next likely batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial";

export type JarvisVideoFirstProviderTrialResultReviewRecoveryEvidencePhaseRange =
  | "3434-3465"
  | "3466-3497"
  | "3498-3529"
  | "3530-3561"
  | "3754-3785"
  | "3786-3817"
  | "3818-3849"
  | "3882-3913"
  | "3946-3977"
  | "3978-4009"
  | "4010-4041"
  | "4042-4073"
  | "4074-4105"
  | "4106-4137"
  | "4138-4169"
  | "4170-4201"
  | "4202-4233"
  | "4234-4265"
  | "4266-4297"
  | "4298-4329";

export type JarvisVideoFirstProviderTrialResultReviewRecoveryEvidenceSource =
  Readonly<{
    phaseRange: JarvisVideoFirstProviderTrialResultReviewRecoveryEvidencePhaseRange;
    label: string;
    href: Route;
    summary: string;
    reviewMode: "inert-review-only-input";
  }>;

export type JarvisVideoFirstProviderTrialResultReviewRecoveryReference =
  Readonly<{
    label: string;
    posture: string;
    summary: string;
  }>;

export type JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord =
  Readonly<{
    title: string;
    posture: string;
    summary: string;
    items: readonly string[];
  }>;

export type JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistState =
  | "defined"
  | "review-only"
  | "required"
  | "blocked"
  | "not-implemented";

export type JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<
  ChecklistId extends string,
> = Readonly<{
  id: ChecklistId;
  title: string;
  summary: string;
  state: JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistState;
}>;

export type JarvisVideoFirstProviderTrialResultReviewRecoveryBlocker<
  BlockerId extends string,
> = Readonly<{
  id: BlockerId;
  title: string;
  summary: string;
}>;

export type JarvisVideoFirstProviderTrialResultReviewLaneId =
  | "success-review-lane"
  | "failure-review-lane"
  | "blocked-review-lane";

export type JarvisVideoFirstProviderTrialResultReviewLane = Readonly<{
  id: JarvisVideoFirstProviderTrialResultReviewLaneId;
  title: string;
  summary: string;
  items: readonly string[];
}>;

export type JarvisVideoFirstProviderTrialResultReviewStateId =
  | "success-review-defined"
  | "failure-review-defined"
  | "blocked-review-defined";

export type JarvisVideoFirstProviderTrialResultReviewStateRecord = Readonly<{
  id: JarvisVideoFirstProviderTrialResultReviewStateId;
  title: string;
  summary: string;
  envelopeKey: string;
}>;

export type JarvisVideoFirstProviderTrialResultReviewInputSignal =
  | "success"
  | "failure"
  | "blocked";

export type JarvisVideoFirstProviderTrialResultReviewInput = Readonly<{
  workspaceId: "jarvis-video";
  studioRoute: "/jarvis-video";
  runtimeVersionReference: typeof JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_RUNTIME_VERSION_REFERENCE;
  runtimeResultReference: string;
  runtimeBlockedResultReference: string;
  providerAttemptLabel: string;
  validationState: "provider-not-called";
  reviewSignal: JarvisVideoFirstProviderTrialResultReviewInputSignal;
  evidenceInputs: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryEvidencePhaseRange[];
}>;

export type JarvisVideoFirstProviderTrialResultReviewNormalizedInput =
  Readonly<{
    stableResultReviewKey: string;
    stableRecoveryKey: string;
    workspaceId: "jarvis-video";
    studioRoute: "/jarvis-video";
    reviewMode: "review-path-defined";
    recoveryMode: "review-only";
    runtimeVersionReference: typeof JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_RUNTIME_VERSION_REFERENCE;
    runtimeResultReference: string;
    runtimeBlockedResultReference: string;
    providerAttemptLabel: string;
    validationState: "provider-not-called";
    reviewSignal: JarvisVideoFirstProviderTrialResultReviewInputSignal;
    evidenceInputs: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryEvidencePhaseRange[];
  }>;

export type JarvisVideoFirstProviderTrialResultReviewClassification =
  | "success-review"
  | "failure-review"
  | "blocked-review";

export type JarvisVideoFirstProviderTrialProviderAttemptStatusEnvelope =
  Readonly<{
    providerAttemptStatusEnvelopeKey: string;
    runtimeResultReference: string;
    runtimeBlockedResultReference: string;
    providerAttemptState: "provider-not-called";
    validationState: "provider-not-called";
    summary: string;
    items: readonly string[];
  }>;

export type JarvisVideoFirstProviderTrialProviderResponseMetadataPlaceholder =
  Readonly<{
    providerResponseMetadataPlaceholderKey: string;
    posture: "placeholder-no-secrets";
    summary: string;
    items: readonly string[];
  }>;

export type JarvisVideoFirstProviderTrialResultReviewEnvelope =
  Readonly<{
    resultReviewEnvelopeKey: string;
    reviewState:
      | "success-review-envelope-defined"
      | "failure-review-envelope-defined"
      | "blocked-review-envelope-defined";
    title: string;
    summary: string;
    items: readonly string[];
  }>;

export type JarvisVideoFirstProviderTrialArtifactReviewPlaceholder =
  Readonly<{
    artifactReviewPlaceholderKey: string;
    posture: "placeholder-only";
    artifactState: "no artifact exists";
    summary: string;
    items: readonly string[];
  }>;

export type JarvisVideoFirstProviderTrialDecisionEnvelope =
  Readonly<{
    decisionEnvelopeKey: string;
    decisionState: "acceptance-defined" | "rejection-defined";
    title: string;
    summary: string;
    items: readonly string[];
  }>;

export type JarvisVideoFirstProviderTrialReviewSupportEnvelope =
  Readonly<{
    reviewEnvelopeKey: string;
    title: string;
    posture: "review-defined";
    summary: string;
    items: readonly string[];
  }>;

export type JarvisVideoFirstProviderTrialResultQualityChecklistId =
  | "result-envelope-review-defined"
  | "provider-not-called-validation-state"
  | "quality-checklist-review-only"
  | "artifact-placeholder-no-claim"
  | "audit-approval-review-only";

export type JarvisVideoFirstProviderTrialOperatorAcceptanceChecklistId =
  | "operator-acceptance-required"
  | "manual-promotion-blocked"
  | "server-only-adapter-required"
  | "result-review-path-defined"
  | "manual-gated-trial-next";

export type JarvisVideoFirstProviderTrialArtifactHandoffChecklistId =
  | "artifact-handoff-checklist-defined"
  | "artifact-review-placeholder"
  | "result-persistence-unimplemented"
  | "audit-persistence-unimplemented"
  | "approval-persistence-unimplemented";

export type JarvisVideoFirstProviderTrialExportPublishBlockerId =
  | "export-blocked"
  | "publish-blocked"
  | "no-artifact-exists"
  | "backend-only-path-required"
  | "operator-acceptance-before-promotion";

export type JarvisVideoFirstProviderTrialResultReviewBlockerId =
  | "runtime-disabled-by-default"
  | "provider-not-called-validation-state"
  | "operator-acceptance-required"
  | "retry-fallback-review-only"
  | "result-audit-approval-persistence-unimplemented"
  | "export-publish-blocked"
  | "manual-gated-trial-future-batch";

export type JarvisVideoFirstProviderTrialManualTrialRequirementId =
  | "server-only-adapter-injection"
  | "manual-operator-approval"
  | "provider-response-capture-contract"
  | "result-audit-approval-persistence-contract"
  | "artifact-handoff-contract"
  | "export-publish-gateway-remains-blocked";

export type JarvisVideoFirstProviderTrialRecoveryBlockerId =
  | "recovery-review-only"
  | "retry-fallback-not-executable"
  | "kill-switch-remains-required"
  | "idempotency-single-call-replay-remain-required"
  | "adapter-wiring-manual-trial-future-batch";

export type JarvisVideoFirstProviderTrialTaxonomyItem<TaxonomyId extends string> =
  Readonly<{
    id: TaxonomyId;
    title: string;
    summary: string;
    posture: "review-only-taxonomy";
  }>;

export type JarvisVideoFirstProviderTrialTaxonomy<TaxonomyId extends string> =
  Readonly<{
    title: string;
    summary: string;
    items: readonly JarvisVideoFirstProviderTrialTaxonomyItem<TaxonomyId>[];
  }>;

export type JarvisVideoFirstProviderTrialProviderErrorTaxonomyId =
  | "provider-error-unavailable"
  | "provider-error-invalid-request"
  | "provider-error-contract-mismatch";

export type JarvisVideoFirstProviderTrialProviderRefusalTaxonomyId =
  | "provider-refusal-safety"
  | "provider-refusal-policy"
  | "provider-refusal-capability";

export type JarvisVideoFirstProviderTrialProviderTimeoutTaxonomyId =
  | "provider-timeout-request-window"
  | "provider-timeout-upstream-latency"
  | "provider-timeout-operator-cancel-window";

export type JarvisVideoFirstProviderTrialProviderRateLimitTaxonomyId =
  | "provider-rate-limit-per-minute"
  | "provider-rate-limit-per-operator"
  | "provider-rate-limit-global-guard";

export type JarvisVideoFirstProviderTrialProviderCostLimitTaxonomyId =
  | "provider-cost-limit-budget-cap"
  | "provider-cost-limit-resolution-cap"
  | "provider-cost-limit-duration-cap";

export type JarvisVideoFirstProviderTrialProviderSafetyBlockTaxonomyId =
  | "provider-safety-block-policy"
  | "provider-safety-block-privacy"
  | "provider-safety-block-rights";

export type JarvisVideoFirstProviderTrialRecoveryReviewEnvelope =
  Readonly<{
    recoveryEnvelopeKey: string;
    title: string;
    posture: "review-only";
    summary: string;
    items: readonly string[];
  }>;

export type JarvisVideoFirstProviderTrialResultReviewCheckpoint =
  Readonly<{
    highestDetectedPhase: typeof JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_HIGHEST_PHASE;
    latestCompletedBatch: string;
    previousCompletedBatch: string;
    nextLikelyBatch: string;
  }>;

export type JarvisVideoFirstProviderTrialResultReviewModel = Readonly<{
  resultReviewVersion: typeof JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_VERSION;
  providerTrialRuntimeReference: JarvisVideoFirstProviderTrialResultReviewRecoveryReference;
  runtimeResultReference: JarvisVideoFirstProviderTrialResultReviewRecoveryReference;
  runtimeBlockedResultReference: JarvisVideoFirstProviderTrialResultReviewRecoveryReference;
  providerAttemptStatusEnvelope: JarvisVideoFirstProviderTrialProviderAttemptStatusEnvelope;
  providerResponseMetadataPlaceholder: JarvisVideoFirstProviderTrialProviderResponseMetadataPlaceholder;
  providerNotCalledValidationState: JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord;
  successfulResultReviewEnvelope: JarvisVideoFirstProviderTrialResultReviewEnvelope;
  failedResultReviewEnvelope: JarvisVideoFirstProviderTrialResultReviewEnvelope;
  blockedResultReviewEnvelope: JarvisVideoFirstProviderTrialResultReviewEnvelope;
  artifactReviewPlaceholder: JarvisVideoFirstProviderTrialArtifactReviewPlaceholder;
  auditEnvelopeReference: JarvisVideoFirstProviderTrialResultReviewRecoveryReference;
  approvalJoinReference: JarvisVideoFirstProviderTrialResultReviewRecoveryReference;
  operatorReviewState: JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord;
  operatorAcceptanceEnvelope: JarvisVideoFirstProviderTrialDecisionEnvelope;
  operatorRejectionEnvelope: JarvisVideoFirstProviderTrialDecisionEnvelope;
  safetyReviewEnvelope: JarvisVideoFirstProviderTrialReviewSupportEnvelope;
  privacyRedactionReviewEnvelope: JarvisVideoFirstProviderTrialReviewSupportEnvelope;
  costRateDurationResolutionReviewEnvelope: JarvisVideoFirstProviderTrialReviewSupportEnvelope;
  timeoutCancelReviewEnvelope: JarvisVideoFirstProviderTrialReviewSupportEnvelope;
  firstProviderTrialResultReviewSummary: JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord;
  providerResultReviewLanes: readonly JarvisVideoFirstProviderTrialResultReviewLane[];
  successFailureBlockedReviewStates: readonly JarvisVideoFirstProviderTrialResultReviewStateRecord[];
  resultQualityChecklist: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialResultQualityChecklistId>[];
  operatorAcceptanceChecklist: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialOperatorAcceptanceChecklistId>[];
  artifactHandoffChecklist: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialArtifactHandoffChecklistId>[];
  exportPublishBlockerChecklist: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialExportPublishBlockerId>[];
  resultReviewBlockers: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryBlocker<JarvisVideoFirstProviderTrialResultReviewBlockerId>[];
  nextManualGatedTrialAcceptanceChecklist: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialManualTrialRequirementId>[];
  nextManualGatedTrialChecklist: JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord;
  evidenceSources: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryEvidenceSource[];
  normalizedRuntimeResultReviewInput: JarvisVideoFirstProviderTrialResultReviewNormalizedInput;
  activeReviewState: JarvisVideoFirstProviderTrialResultReviewClassification;
  checkpoint: JarvisVideoFirstProviderTrialResultReviewCheckpoint;
}>;

export type JarvisVideoFirstProviderTrialRecoveryModel = Readonly<{
  recoveryVersion: typeof JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RECOVERY_VERSION;
  recoveryMode: "review-only";
  retryReviewEnvelope: JarvisVideoFirstProviderTrialRecoveryReviewEnvelope;
  fallbackReviewEnvelope: JarvisVideoFirstProviderTrialRecoveryReviewEnvelope;
  timeoutRecoveryReviewEnvelope: JarvisVideoFirstProviderTrialRecoveryReviewEnvelope;
  costRateRecoveryReviewEnvelope: JarvisVideoFirstProviderTrialRecoveryReviewEnvelope;
  safetyRecoveryReviewEnvelope: JarvisVideoFirstProviderTrialRecoveryReviewEnvelope;
  privacyRedactionRecoveryReviewEnvelope: JarvisVideoFirstProviderTrialRecoveryReviewEnvelope;
  providerErrorTaxonomy: JarvisVideoFirstProviderTrialTaxonomy<JarvisVideoFirstProviderTrialProviderErrorTaxonomyId>;
  providerRefusalTaxonomy: JarvisVideoFirstProviderTrialTaxonomy<JarvisVideoFirstProviderTrialProviderRefusalTaxonomyId>;
  providerTimeoutTaxonomy: JarvisVideoFirstProviderTrialTaxonomy<JarvisVideoFirstProviderTrialProviderTimeoutTaxonomyId>;
  providerRateLimitTaxonomy: JarvisVideoFirstProviderTrialTaxonomy<JarvisVideoFirstProviderTrialProviderRateLimitTaxonomyId>;
  providerCostLimitTaxonomy: JarvisVideoFirstProviderTrialTaxonomy<JarvisVideoFirstProviderTrialProviderCostLimitTaxonomyId>;
  providerSafetyBlockTaxonomy: JarvisVideoFirstProviderTrialTaxonomy<JarvisVideoFirstProviderTrialProviderSafetyBlockTaxonomyId>;
  rollbackReviewEnvelope: JarvisVideoFirstProviderTrialRecoveryReviewEnvelope;
  killSwitchRecoveryState: JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord;
  idempotencyRecoveryState: JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord;
  replayBlockRecoveryState: JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord;
  singleCallLockRecoveryState: JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord;
  recoveryPlanReview: JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord;
  recoveryBlockers: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryBlocker<JarvisVideoFirstProviderTrialRecoveryBlockerId>[];
  nextAdapterWiringManualTrialRequirements: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialManualTrialRequirementId>[];
}>;

export type JarvisVideoFirstProviderTrialResultReviewRecoveryModel =
  Readonly<{
    reviewModel: JarvisVideoFirstProviderTrialResultReviewModel;
    recoveryModel: JarvisVideoFirstProviderTrialRecoveryModel;
    providerErrorTaxonomy: JarvisVideoFirstProviderTrialTaxonomy<JarvisVideoFirstProviderTrialProviderErrorTaxonomyId>;
    recoveryPlanReview: JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord;
    operatorAcceptanceChecklist: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialOperatorAcceptanceChecklistId>[];
    artifactHandoffChecklist: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialArtifactHandoffChecklistId>[];
    exportPublishBlockerChecklist: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialExportPublishBlockerId>[];
    nextManualGatedTrialChecklist: readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialManualTrialRequirementId>[];
    handoffSummary: JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord;
    checkpoint: JarvisVideoFirstProviderTrialResultReviewCheckpoint;
    displayMarkers: readonly string[];
  }>;

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function buildStableProviderTrialResultReviewKey(
  parts: readonly string[]
) {
  return parts.map(normalizeText).join("::");
}

export function buildStableProviderTrialRecoveryKey(
  parts: readonly string[]
) {
  return parts.map(normalizeText).join("::");
}

function buildSummaryRecord(
  title: string,
  posture: string,
  summary: string,
  items: readonly string[]
): JarvisVideoFirstProviderTrialResultReviewRecoverySummaryRecord {
  return {
    title,
    posture,
    summary,
    items,
  };
}

function buildReferenceRecord(
  label: string,
  posture: string,
  summary: string
): JarvisVideoFirstProviderTrialResultReviewRecoveryReference {
  return {
    label,
    posture,
    summary,
  };
}

function buildEvidenceSource(
  phaseRange: JarvisVideoFirstProviderTrialResultReviewRecoveryEvidencePhaseRange,
  label: string
): JarvisVideoFirstProviderTrialResultReviewRecoveryEvidenceSource {
  return {
    phaseRange,
    label,
    href: "/jarvis-video",
    summary: `${label} remains an inert review-only input carried forward for provider trial result review and recovery and does not execute.`,
    reviewMode: "inert-review-only-input",
  };
}

function buildReviewChecklistItem<ChecklistId extends string>(
  id: ChecklistId,
  title: string,
  summary: string,
  state: JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistState
): JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<ChecklistId> {
  return {
    id,
    title,
    summary,
    state,
  };
}

function buildReviewBlocker<BlockerId extends string>(
  id: BlockerId,
  title: string,
  summary: string
): JarvisVideoFirstProviderTrialResultReviewRecoveryBlocker<BlockerId> {
  return {
    id,
    title,
    summary,
  };
}

function buildTaxonomyItem<TaxonomyId extends string>(
  id: TaxonomyId,
  title: string,
  summary: string
): JarvisVideoFirstProviderTrialTaxonomyItem<TaxonomyId> {
  return {
    id,
    title,
    summary,
    posture: "review-only-taxonomy",
  };
}

function buildTaxonomy<TaxonomyId extends string>(
  title: string,
  summary: string,
  items: readonly JarvisVideoFirstProviderTrialTaxonomyItem<TaxonomyId>[]
): JarvisVideoFirstProviderTrialTaxonomy<TaxonomyId> {
  return {
    title,
    summary,
    items,
  };
}

export function normalizeRuntimeResultReviewInput(
  input: JarvisVideoFirstProviderTrialResultReviewInput
): JarvisVideoFirstProviderTrialResultReviewNormalizedInput {
  const runtimeResultReference = normalizeText(input.runtimeResultReference);
  const runtimeBlockedResultReference = normalizeText(
    input.runtimeBlockedResultReference
  );
  const providerAttemptLabel = normalizeText(input.providerAttemptLabel);
  const stableResultReviewKey = buildStableProviderTrialResultReviewKey([
    input.workspaceId,
    input.runtimeVersionReference,
    runtimeResultReference,
    input.reviewSignal,
  ]);
  const stableRecoveryKey = buildStableProviderTrialRecoveryKey([
    input.workspaceId,
    input.runtimeVersionReference,
    runtimeBlockedResultReference,
    input.validationState,
  ]);

  return {
    stableResultReviewKey,
    stableRecoveryKey,
    workspaceId: input.workspaceId,
    studioRoute: input.studioRoute,
    reviewMode: "review-path-defined",
    recoveryMode: "review-only",
    runtimeVersionReference: input.runtimeVersionReference,
    runtimeResultReference,
    runtimeBlockedResultReference,
    providerAttemptLabel,
    validationState: input.validationState,
    reviewSignal: input.reviewSignal,
    evidenceInputs: input.evidenceInputs,
  };
}

export function classifyStaticProviderTrialResultState(
  input: JarvisVideoFirstProviderTrialResultReviewNormalizedInput
): JarvisVideoFirstProviderTrialResultReviewClassification {
  if (
    input.reviewSignal === "blocked" ||
    input.runtimeBlockedResultReference.toLowerCase().indexOf("blocked") >= 0
  ) {
    return "blocked-review";
  }

  if (input.reviewSignal === "failure") {
    return "failure-review";
  }

  return "success-review";
}

function buildStaticResultReviewEnvelope(
  normalized: JarvisVideoFirstProviderTrialResultReviewNormalizedInput,
  reviewState:
    | "success-review-envelope-defined"
    | "failure-review-envelope-defined"
    | "blocked-review-envelope-defined",
  title: string,
  summary: string,
  items: readonly string[]
): JarvisVideoFirstProviderTrialResultReviewEnvelope {
  return {
    resultReviewEnvelopeKey: buildStableProviderTrialResultReviewKey([
      normalized.stableResultReviewKey,
      reviewState,
    ]),
    reviewState,
    title,
    summary,
    items,
  };
}

export function buildStaticSuccessReviewEnvelope(
  normalized: JarvisVideoFirstProviderTrialResultReviewNormalizedInput
) {
  return buildStaticResultReviewEnvelope(
    normalized,
    "success-review-envelope-defined",
    "successful result review envelope",
    "A successful result review envelope is defined as a static review shape only. It does not claim a provider was called, a result exists, or a video was generated.",
    [
      "successful result review envelope",
      "review path defined",
      "provider not-called validation state remains authoritative during validation",
      "operator acceptance required before promotion",
    ]
  );
}

export function buildStaticFailureReviewEnvelope(
  normalized: JarvisVideoFirstProviderTrialResultReviewNormalizedInput
) {
  return buildStaticResultReviewEnvelope(
    normalized,
    "failure-review-envelope-defined",
    "failed result review envelope",
    "A failed result review envelope is defined as a static review shape only. It does not execute retry, fallback, or any recovery path.",
    [
      "failed result review envelope",
      "recovery review only",
      "retry/fallback review only",
      "no retry execution",
      "no fallback execution",
    ]
  );
}

export function buildStaticBlockedReviewEnvelope(
  normalized: JarvisVideoFirstProviderTrialResultReviewNormalizedInput
) {
  return buildStaticResultReviewEnvelope(
    normalized,
    "blocked-review-envelope-defined",
    "blocked result review envelope",
    "A blocked result review envelope is defined as the active posture while runtime remains disabled by default and provider not-called validation state remains in force.",
    [
      "blocked result review envelope",
      "runtime remains disabled by default",
      "provider not-called validation state",
      "no provider call during validation",
    ]
  );
}

function buildRecoveryReviewEnvelope(
  normalized: JarvisVideoFirstProviderTrialResultReviewNormalizedInput,
  title: string,
  summary: string,
  items: readonly string[]
): JarvisVideoFirstProviderTrialRecoveryReviewEnvelope {
  return {
    recoveryEnvelopeKey: buildStableProviderTrialRecoveryKey([
      normalized.stableRecoveryKey,
      title,
    ]),
    title,
    posture: "review-only",
    summary,
    items,
  };
}

export function buildStaticRecoveryPlanReview(
  normalized: JarvisVideoFirstProviderTrialResultReviewNormalizedInput
) {
  return buildSummaryRecord(
    "recovery plan review",
    "review-only",
    "Recovery plan review is defined as an inert manual review surface only. It stages retry, fallback, timeout, cost/rate, safety, privacy/redaction, rollback, and lock-state review without executing recovery.",
    [
      "recovery review only",
      "retry/fallback review only",
      "manual gated trial next",
      `Active result classification: ${classifyStaticProviderTrialResultState(normalized)}`,
    ]
  );
}

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_EVIDENCE_SOURCES =
  [
    buildEvidenceSource(
      "3434-3465",
      "Backend-Owned Video Provider Execution Runtime Readiness"
    ),
    buildEvidenceSource(
      "3466-3497",
      "First Backend-Owned Video Provider Execution Dry Run"
    ),
    buildEvidenceSource(
      "3498-3529",
      "First Backend-Owned Video Provider Execution Approval Packet"
    ),
    buildEvidenceSource(
      "3530-3561",
      "First Backend-Owned Video Provider Execution Adapter Readiness"
    ),
    buildEvidenceSource(
      "3754-3785",
      "First Jarvis-Controlled Video Adapter Plug-in"
    ),
    buildEvidenceSource(
      "3786-3817",
      "First Jarvis-Controlled Video Dry Run Workspace"
    ),
    buildEvidenceSource(
      "3818-3849",
      "First Jarvis-Controlled Video Approval Packet Workspace"
    ),
    buildEvidenceSource(
      "3882-3913",
      "First Jarvis-Controlled Video Backend Execution Readiness"
    ),
    buildEvidenceSource(
      "3946-3977",
      "First Jarvis-Controlled Video Controlled Execution Trial"
    ),
    buildEvidenceSource(
      "3978-4009",
      "First Jarvis-Controlled Video Backend Trial Runner Contract"
    ),
    buildEvidenceSource(
      "4010-4041",
      "First Jarvis-Controlled Video Trial Result Review and Recovery"
    ),
    buildEvidenceSource(
      "4042-4073",
      "Jarvis Video Studio Release Candidate"
    ),
    buildEvidenceSource(
      "4074-4105",
      "Jarvis Video Backend Execution Implementation Plan"
    ),
    buildEvidenceSource(
      "4106-4137",
      "Jarvis Video Backend Implementation Readiness Follow-Up"
    ),
    buildEvidenceSource(
      "4138-4169",
      "Jarvis Video Backend Runner Contract Hardening"
    ),
    buildEvidenceSource(
      "4170-4201",
      "Jarvis Video Backend Runner Foundation Dry-Run Admission"
    ),
    buildEvidenceSource(
      "4202-4233",
      "Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run"
    ),
    buildEvidenceSource(
      "4234-4265",
      "Jarvis Video Result Capture Audit Envelope and Approval Join"
    ),
    buildEvidenceSource(
      "4266-4297",
      "Jarvis Video First Gated Provider Execution Trial Preparation"
    ),
    buildEvidenceSource(
      "4298-4329",
      "Jarvis Video First Gated Provider Execution Trial Runtime"
    ),
  ] as const satisfies readonly JarvisVideoFirstProviderTrialResultReviewRecoveryEvidenceSource[];

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_EVIDENCE_INPUTS =
  JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_EVIDENCE_SOURCES.map(
    (source) => source.phaseRange
  );

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT =
  normalizeRuntimeResultReviewInput({
    workspaceId: "jarvis-video",
    studioRoute: "/jarvis-video",
    runtimeVersionReference:
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_RUNTIME_VERSION_REFERENCE,
    runtimeResultReference: "runtime result reference",
    runtimeBlockedResultReference: "runtime blocked result reference",
    providerAttemptLabel: "provider attempt status envelope",
    validationState: "provider-not-called",
    reviewSignal: "blocked",
    evidenceInputs:
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_EVIDENCE_INPUTS,
  });

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_CHECKPOINT = {
  highestDetectedPhase:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_HIGHEST_PHASE,
  latestCompletedBatch:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_LATEST_COMPLETED_BATCH,
  previousCompletedBatch:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_PREVIOUS_COMPLETED_BATCH,
  nextLikelyBatch:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_NEXT_LIKELY_BATCH.replace(
      /^next likely batch:\s*/i,
      ""
    ),
} as const satisfies JarvisVideoFirstProviderTrialResultReviewCheckpoint;

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RESULT_QUALITY_CHECKLIST =
  [
    buildReviewChecklistItem(
      "result-envelope-review-defined",
      "result envelope review defined",
      "A typed result envelope review path exists for success, failure, and blocked postures.",
      "defined"
    ),
    buildReviewChecklistItem(
      "provider-not-called-validation-state",
      "provider not-called validation state",
      "Validation keeps provider not-called as the authoritative state and does not claim a call happened.",
      "required"
    ),
    buildReviewChecklistItem(
      "quality-checklist-review-only",
      "quality checklist review only",
      "Quality review remains a manual review surface and does not promote or recover automatically.",
      "review-only"
    ),
    buildReviewChecklistItem(
      "artifact-placeholder-no-claim",
      "artifact placeholder no claim",
      "Artifact review remains placeholder only and does not claim an artifact exists.",
      "blocked"
    ),
    buildReviewChecklistItem(
      "audit-approval-review-only",
      "audit and approval review only",
      "Audit and approval references remain review-only until backend persistence exists.",
      "review-only"
    ),
  ] as const satisfies readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialResultQualityChecklistId>[];

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_OPERATOR_ACCEPTANCE_CHECKLIST = [
  buildReviewChecklistItem(
    "operator-acceptance-required",
    "operator acceptance required",
    "Operator acceptance is required before any promotion or future manual gated trial handoff.",
    "required"
  ),
  buildReviewChecklistItem(
    "manual-promotion-blocked",
    "manual promotion remains blocked",
    "Promotion remains blocked while provider runtime is disabled by default and persistence remains unimplemented.",
    "blocked"
  ),
  buildReviewChecklistItem(
    "server-only-adapter-required",
    "server-only adapter required",
    "Provider execution still requires an injected server-only adapter and is not callable from frontend.",
    "required"
  ),
  buildReviewChecklistItem(
    "result-review-path-defined",
    "result review path defined",
    "The provider trial result review path is defined as typed product data only.",
    "defined"
  ),
  buildReviewChecklistItem(
    "manual-gated-trial-next",
    "manual gated trial next",
    "The next advancement is first real provider adapter wiring and manual gated trial, not automatic promotion.",
    "required"
  ),
] as const satisfies readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialOperatorAcceptanceChecklistId>[];

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_ARTIFACT_HANDOFF_CHECKLIST = [
  buildReviewChecklistItem(
    "artifact-handoff-checklist-defined",
    "artifact handoff checklist defined",
    "Artifact handoff is staged as a checklist only.",
    "defined"
  ),
  buildReviewChecklistItem(
    "artifact-review-placeholder",
    "artifact review placeholder",
    "Artifact review remains placeholder only and does not claim a generated asset exists.",
    "blocked"
  ),
  buildReviewChecklistItem(
    "result-persistence-unimplemented",
    "result persistence remains unimplemented",
    "Result persistence is not implemented in this batch.",
    "not-implemented"
  ),
  buildReviewChecklistItem(
    "audit-persistence-unimplemented",
    "audit persistence remains unimplemented",
    "Audit persistence is not implemented in this batch.",
    "not-implemented"
  ),
  buildReviewChecklistItem(
    "approval-persistence-unimplemented",
    "approval persistence remains unimplemented",
    "Approval persistence is not implemented in this batch.",
    "not-implemented"
  ),
] as const satisfies readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialArtifactHandoffChecklistId>[];

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_EXPORT_PUBLISH_BLOCKERS = [
  buildReviewChecklistItem(
    "export-blocked",
    "export remains blocked",
    "Export remains blocked until a future backend-only artifact path exists.",
    "blocked"
  ),
  buildReviewChecklistItem(
    "publish-blocked",
    "publish remains blocked",
    "Publish remains blocked until a future backend-only artifact path exists.",
    "blocked"
  ),
  buildReviewChecklistItem(
    "no-artifact-exists",
    "no artifact exists",
    "Artifact state remains placeholder only and no artifact exists during validation.",
    "blocked"
  ),
  buildReviewChecklistItem(
    "backend-only-path-required",
    "backend-only execution path required",
    "Any future export or publish path must remain backend-only.",
    "required"
  ),
  buildReviewChecklistItem(
    "operator-acceptance-before-promotion",
    "operator acceptance before promotion",
    "Promotion to any later execution path requires explicit operator acceptance first.",
    "required"
  ),
] as const satisfies readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialExportPublishBlockerId>[];

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_REVIEW_BLOCKERS = [
  buildReviewBlocker(
    "runtime-disabled-by-default",
    "runtime disabled by default",
    "The provider trial runtime remains disabled by default and cannot execute from the current review layer."
  ),
  buildReviewBlocker(
    "provider-not-called-validation-state",
    "provider not-called validation state",
    "Validation keeps provider not-called as the authoritative state and does not allow a provider call."
  ),
  buildReviewBlocker(
    "operator-acceptance-required",
    "operator acceptance required",
    "Promotion remains blocked until an operator accepts the review outcome."
  ),
  buildReviewBlocker(
    "retry-fallback-review-only",
    "retry and fallback review only",
    "Retry and fallback remain review-only and do not execute."
  ),
  buildReviewBlocker(
    "result-audit-approval-persistence-unimplemented",
    "result/audit/approval persistence unimplemented",
    "Result, audit, approval, and artifact persistence remain unimplemented."
  ),
  buildReviewBlocker(
    "export-publish-blocked",
    "export/publish blocked",
    "Export and publish remain blocked because no artifact exists and no backend gateway is wired."
  ),
  buildReviewBlocker(
    "manual-gated-trial-future-batch",
    "manual gated trial future batch",
    "First real provider adapter wiring and manual gated trial remain a future batch."
  ),
] as const satisfies readonly JarvisVideoFirstProviderTrialResultReviewRecoveryBlocker<JarvisVideoFirstProviderTrialResultReviewBlockerId>[];

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_MANUAL_TRIAL_REQUIREMENTS = [
  buildReviewChecklistItem(
    "server-only-adapter-injection",
    "server-only adapter injection",
    "Provider execution still requires an injected server-only adapter.",
    "required"
  ),
  buildReviewChecklistItem(
    "manual-operator-approval",
    "manual operator approval",
    "Manual operator approval remains required before any real provider adapter trial.",
    "required"
  ),
  buildReviewChecklistItem(
    "provider-response-capture-contract",
    "provider response capture contract",
    "A real provider adapter wiring batch must add a server-only provider response capture contract.",
    "required"
  ),
  buildReviewChecklistItem(
    "result-audit-approval-persistence-contract",
    "result audit approval persistence contract",
    "A future batch must define persistence contracts before any promotion occurs.",
    "required"
  ),
  buildReviewChecklistItem(
    "artifact-handoff-contract",
    "artifact handoff contract",
    "A future batch must define artifact handoff before any export or publish surface can advance.",
    "required"
  ),
  buildReviewChecklistItem(
    "export-publish-gateway-remains-blocked",
    "export publish gateway remains blocked",
    "Export and publish stay blocked until the manual gated trial and later backend gateways exist.",
    "blocked"
  ),
] as const satisfies readonly JarvisVideoFirstProviderTrialResultReviewRecoveryChecklistItem<JarvisVideoFirstProviderTrialManualTrialRequirementId>[];

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_MODEL =
  {
    resultReviewVersion:
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_VERSION,
    providerTrialRuntimeReference: buildReferenceRecord(
      "provider trial runtime reference",
      "review-only runtime reference",
      "Provider trial runtime reference points to 4298-4329 - Jarvis Video First Gated Provider Execution Trial Runtime as an inert review-only input."
    ),
    runtimeResultReference: buildReferenceRecord(
      "runtime result reference",
      "static review reference",
      "Runtime result reference is a typed review reference only and does not claim a runtime result exists."
    ),
    runtimeBlockedResultReference: buildReferenceRecord(
      "runtime blocked result reference",
      "static blocked review reference",
      "Runtime blocked result reference carries forward the blocked runtime posture as an inert review-only input."
    ),
    providerAttemptStatusEnvelope: {
      providerAttemptStatusEnvelopeKey: buildStableProviderTrialResultReviewKey([
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
        "provider-attempt-status-envelope",
      ]),
      runtimeResultReference:
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.runtimeResultReference,
      runtimeBlockedResultReference:
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.runtimeBlockedResultReference,
      providerAttemptState: "provider-not-called",
      validationState: "provider-not-called",
      summary:
        "Provider attempt status envelope stays provider-not-called during validation and does not claim provider execution.",
      items: [
        "provider attempt status envelope",
        "provider not-called validation state",
        "no provider call during validation",
      ],
    },
    providerResponseMetadataPlaceholder: {
      providerResponseMetadataPlaceholderKey:
        buildStableProviderTrialResultReviewKey([
          JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
          "provider-response-metadata-placeholder",
        ]),
      posture: "placeholder-no-secrets",
      summary:
        "Provider response metadata placeholder, no secrets. This is typed static metadata only and does not expose request ids, tokens, headers, or provider content.",
      items: [
        "provider response metadata placeholder, no secrets",
        "no frontend secrets",
        "no plaintext secrets",
      ],
    },
    providerNotCalledValidationState: buildSummaryRecord(
      "provider not-called validation state",
      "validation-authoritative",
      "Provider not-called validation state remains authoritative throughout build and smoke validation.",
      [
        "provider not-called validation state",
        "no provider call during validation",
        "no live video generation during validation",
      ]
    ),
    successfulResultReviewEnvelope:
      buildStaticSuccessReviewEnvelope(
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT
      ),
    failedResultReviewEnvelope:
      buildStaticFailureReviewEnvelope(
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT
      ),
    blockedResultReviewEnvelope:
      buildStaticBlockedReviewEnvelope(
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT
      ),
    artifactReviewPlaceholder: {
      artifactReviewPlaceholderKey: buildStableProviderTrialResultReviewKey([
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
        "artifact-review-placeholder",
      ]),
      posture: "placeholder-only",
      artifactState: "no artifact exists",
      summary:
        "Artifact review placeholder remains static and does not claim an artifact exists.",
      items: [
        "artifact review placeholder",
        "artifact handoff placeholder",
        "no artifact exists",
      ],
    },
    auditEnvelopeReference: buildReferenceRecord(
      "audit envelope reference",
      "review-only audit reference",
      "Audit envelope reference points to 4234-4265 as an inert review-only input and does not persist audit state."
    ),
    approvalJoinReference: buildReferenceRecord(
      "approval join reference",
      "review-only approval reference",
      "Approval join reference points to 4234-4265 as an inert review-only input and does not persist approval state."
    ),
    operatorReviewState: buildSummaryRecord(
      "operator review state",
      "acceptance-required",
      "Operator review state remains acceptance-required before any promotion can occur.",
      [
        "operator review state",
        "operator acceptance required",
        "promotion remains blocked",
      ]
    ),
    operatorAcceptanceEnvelope: {
      decisionEnvelopeKey: buildStableProviderTrialResultReviewKey([
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
        "operator-acceptance-envelope",
      ]),
      decisionState: "acceptance-defined",
      title: "operator acceptance envelope",
      summary:
        "Operator acceptance envelope is defined as a manual promotion gate only and does not execute promotion.",
      items: [
        "operator acceptance envelope",
        "operator acceptance required",
        "manual gated trial next",
      ],
    },
    operatorRejectionEnvelope: {
      decisionEnvelopeKey: buildStableProviderTrialResultReviewKey([
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
        "operator-rejection-envelope",
      ]),
      decisionState: "rejection-defined",
      title: "operator rejection envelope",
      summary:
        "Operator rejection envelope is defined as a static rejection path only and does not trigger rollback execution.",
      items: [
        "operator rejection envelope",
        "recovery review only",
        "no rollback execution",
      ],
    },
    safetyReviewEnvelope: {
      reviewEnvelopeKey: buildStableProviderTrialResultReviewKey([
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
        "safety-review-envelope",
      ]),
      title: "safety review envelope",
      posture: "review-defined",
      summary:
        "Safety review envelope remains a typed review surface only and does not execute safety remediation.",
      items: [
        "safety review envelope",
        "safety review required",
        "review path defined",
      ],
    },
    privacyRedactionReviewEnvelope: {
      reviewEnvelopeKey: buildStableProviderTrialResultReviewKey([
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
        "privacy-redaction-review-envelope",
      ]),
      title: "privacy/redaction review envelope",
      posture: "review-defined",
      summary:
        "Privacy/redaction review envelope remains a typed review surface only and does not execute privacy or redaction mutation.",
      items: [
        "privacy/redaction review envelope",
        "privacy review required",
        "redaction review required",
      ],
    },
    costRateDurationResolutionReviewEnvelope: {
      reviewEnvelopeKey: buildStableProviderTrialResultReviewKey([
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
        "cost-rate-duration-resolution-review-envelope",
      ]),
      title: "cost/rate/duration/resolution review envelope",
      posture: "review-defined",
      summary:
        "Cost/rate/duration/resolution review envelope remains typed static review only and does not adjust runtime budgets or provider settings.",
      items: [
        "cost/rate/duration/resolution review envelope",
        "cost rate duration review only",
        "no provider tuning during validation",
      ],
    },
    timeoutCancelReviewEnvelope: {
      reviewEnvelopeKey: buildStableProviderTrialResultReviewKey([
        JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
        "timeout-cancel-review-envelope",
      ]),
      title: "timeout/cancel review envelope",
      posture: "review-defined",
      summary:
        "Timeout/cancel review envelope remains typed static review only and does not execute timeout recovery or cancel flows.",
      items: [
        "timeout/cancel review envelope",
        "timeout recovery review only",
        "no timeout recovery execution",
      ],
    },
    firstProviderTrialResultReviewSummary: buildSummaryRecord(
      "first provider trial result review summary",
      "review-path-defined",
      "First provider trial result review summary defines the future review lane without claiming a provider call, artifact, or live video.",
      [
        "review path defined",
        "recovery review only",
        "runtime remains disabled by default",
        "manual gated trial next",
      ]
    ),
    providerResultReviewLanes: [
      {
        id: "success-review-lane",
        title: "success review lane",
        summary:
          "Success review lane is defined as a future typed review posture only.",
        items: [
          "successful result review envelope",
          "operator acceptance envelope",
          "artifact handoff checklist",
        ],
      },
      {
        id: "failure-review-lane",
        title: "failure review lane",
        summary:
          "Failure review lane is defined as a future typed review posture only.",
        items: [
          "failed result review envelope",
          "provider error taxonomy",
          "recovery plan review",
        ],
      },
      {
        id: "blocked-review-lane",
        title: "blocked review lane",
        summary:
          "Blocked review lane is the active posture while runtime remains disabled by default.",
        items: [
          "blocked result review envelope",
          "provider not-called validation state",
          "export/publish blocker checklist",
        ],
      },
    ],
    successFailureBlockedReviewStates: [
      {
        id: "success-review-defined",
        title: "success review defined",
        summary:
          "The success review state exists as static product data only.",
        envelopeKey: buildStableProviderTrialResultReviewKey([
          JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
          "success-review-defined",
        ]),
      },
      {
        id: "failure-review-defined",
        title: "failure review defined",
        summary:
          "The failure review state exists as static product data only.",
        envelopeKey: buildStableProviderTrialResultReviewKey([
          JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
          "failure-review-defined",
        ]),
      },
      {
        id: "blocked-review-defined",
        title: "blocked review defined",
        summary:
          "The blocked review state exists as static product data only.",
        envelopeKey: buildStableProviderTrialResultReviewKey([
          JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT.stableResultReviewKey,
          "blocked-review-defined",
        ]),
      },
    ],
    resultQualityChecklist:
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RESULT_QUALITY_CHECKLIST,
    operatorAcceptanceChecklist:
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_OPERATOR_ACCEPTANCE_CHECKLIST,
    artifactHandoffChecklist:
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_ARTIFACT_HANDOFF_CHECKLIST,
    exportPublishBlockerChecklist:
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_EXPORT_PUBLISH_BLOCKERS,
    resultReviewBlockers: JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_REVIEW_BLOCKERS,
    nextManualGatedTrialAcceptanceChecklist:
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_MANUAL_TRIAL_REQUIREMENTS,
    nextManualGatedTrialChecklist: buildSummaryRecord(
      "next manual gated trial checklist",
      "future-required",
      "The next manual gated trial checklist is defined without wiring a real provider adapter yet.",
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_MANUAL_TRIAL_REQUIREMENTS.map(
        (item) => item.title
      )
    ),
    evidenceSources:
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_EVIDENCE_SOURCES,
    normalizedRuntimeResultReviewInput:
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT,
    activeReviewState: classifyStaticProviderTrialResultState(
      JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT
    ),
    checkpoint: JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_CHECKPOINT,
  } as const satisfies JarvisVideoFirstProviderTrialResultReviewModel;

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_ERROR_TAXONOMY =
  buildTaxonomy(
    "provider error taxonomy",
    "Provider error taxonomy is defined as static review-only data for future manual analysis.",
    [
      buildTaxonomyItem(
        "provider-error-unavailable",
        "provider unavailable",
        "Capture upstream unavailable posture without executing fallback."
      ),
      buildTaxonomyItem(
        "provider-error-invalid-request",
        "invalid request",
        "Capture invalid request posture without mutating prompts or settings."
      ),
      buildTaxonomyItem(
        "provider-error-contract-mismatch",
        "contract mismatch",
        "Capture adapter contract mismatch posture before any real adapter wiring batch."
      ),
    ]
  );

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_REFUSAL_TAXONOMY =
  buildTaxonomy(
    "provider refusal taxonomy",
    "Provider refusal taxonomy is defined as static review-only data.",
    [
      buildTaxonomyItem(
        "provider-refusal-safety",
        "safety refusal",
        "Capture a future provider safety refusal without executing fallback."
      ),
      buildTaxonomyItem(
        "provider-refusal-policy",
        "policy refusal",
        "Capture a future provider policy refusal without mutating policy posture."
      ),
      buildTaxonomyItem(
        "provider-refusal-capability",
        "capability refusal",
        "Capture a future provider capability refusal without routing to another provider."
      ),
    ]
  );

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_TIMEOUT_TAXONOMY =
  buildTaxonomy(
    "provider timeout taxonomy",
    "Provider timeout taxonomy is defined as static review-only data.",
    [
      buildTaxonomyItem(
        "provider-timeout-request-window",
        "request window timeout",
        "Capture a request window timeout as review-only."
      ),
      buildTaxonomyItem(
        "provider-timeout-upstream-latency",
        "upstream latency timeout",
        "Capture upstream latency posture as review-only."
      ),
      buildTaxonomyItem(
        "provider-timeout-operator-cancel-window",
        "operator cancel window timeout",
        "Capture operator cancel timing posture as review-only."
      ),
    ]
  );

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_RATE_LIMIT_TAXONOMY =
  buildTaxonomy(
    "provider rate-limit taxonomy",
    "Provider rate-limit taxonomy is defined as static review-only data.",
    [
      buildTaxonomyItem(
        "provider-rate-limit-per-minute",
        "per-minute rate limit",
        "Capture minute-window rate limits as review-only."
      ),
      buildTaxonomyItem(
        "provider-rate-limit-per-operator",
        "per-operator rate limit",
        "Capture operator-scoped rate limits as review-only."
      ),
      buildTaxonomyItem(
        "provider-rate-limit-global-guard",
        "global rate guard",
        "Capture global rate guard posture as review-only."
      ),
    ]
  );

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_COST_LIMIT_TAXONOMY =
  buildTaxonomy(
    "provider cost-limit taxonomy",
    "Provider cost-limit taxonomy is defined as static review-only data.",
    [
      buildTaxonomyItem(
        "provider-cost-limit-budget-cap",
        "budget cap",
        "Capture budget-cap posture as review-only."
      ),
      buildTaxonomyItem(
        "provider-cost-limit-resolution-cap",
        "resolution cap",
        "Capture resolution-cap posture as review-only."
      ),
      buildTaxonomyItem(
        "provider-cost-limit-duration-cap",
        "duration cap",
        "Capture duration-cap posture as review-only."
      ),
    ]
  );

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_SAFETY_BLOCK_TAXONOMY =
  buildTaxonomy(
    "provider safety-block taxonomy",
    "Provider safety-block taxonomy is defined as static review-only data.",
    [
      buildTaxonomyItem(
        "provider-safety-block-policy",
        "policy safety block",
        "Capture provider policy safety blocks as review-only."
      ),
      buildTaxonomyItem(
        "provider-safety-block-privacy",
        "privacy safety block",
        "Capture provider privacy safety blocks as review-only."
      ),
      buildTaxonomyItem(
        "provider-safety-block-rights",
        "rights safety block",
        "Capture provider rights safety blocks as review-only."
      ),
    ]
  );

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RECOVERY_BLOCKERS = [
  buildReviewBlocker(
    "recovery-review-only",
    "recovery review only",
    "Recovery remains review-only and does not execute retry, fallback, rollback, or replay."
  ),
  buildReviewBlocker(
    "retry-fallback-not-executable",
    "retry/fallback not executable",
    "Retry and fallback remain review-only and cannot execute in this batch."
  ),
  buildReviewBlocker(
    "kill-switch-remains-required",
    "kill switch remains required",
    "Kill switch posture remains required before any real adapter wiring batch."
  ),
  buildReviewBlocker(
    "idempotency-single-call-replay-remain-required",
    "idempotency single-call replay remain required",
    "Idempotency, single-call lock, and replay block remain required before manual gated trial advancement."
  ),
  buildReviewBlocker(
    "adapter-wiring-manual-trial-future-batch",
    "adapter wiring manual trial future batch",
    "First real provider adapter wiring and manual gated trial remain future work."
  ),
] as const satisfies readonly JarvisVideoFirstProviderTrialResultReviewRecoveryBlocker<JarvisVideoFirstProviderTrialRecoveryBlockerId>[];

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RECOVERY_MODEL = {
  recoveryVersion: JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RECOVERY_VERSION,
  recoveryMode: "review-only",
  retryReviewEnvelope: buildRecoveryReviewEnvelope(
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT,
    "retry review envelope",
    "Retry review envelope is defined as a static recovery review only and does not execute retry.",
    ["retry review envelope", "retry review only", "no retry execution"]
  ),
  fallbackReviewEnvelope: buildRecoveryReviewEnvelope(
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT,
    "fallback review envelope",
    "Fallback review envelope is defined as a static recovery review only and does not execute fallback.",
    [
      "fallback review envelope",
      "fallback review only",
      "no fallback execution",
    ]
  ),
  timeoutRecoveryReviewEnvelope: buildRecoveryReviewEnvelope(
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT,
    "timeout recovery review envelope",
    "Timeout recovery review envelope is defined as a static recovery review only and does not execute timeout recovery.",
    [
      "timeout recovery review envelope",
      "timeout recovery review only",
      "no timeout recovery execution",
    ]
  ),
  costRateRecoveryReviewEnvelope: buildRecoveryReviewEnvelope(
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT,
    "cost/rate recovery review envelope",
    "Cost/rate recovery review envelope is defined as a static recovery review only and does not adjust provider budgets.",
    [
      "cost/rate recovery review envelope",
      "cost rate recovery review only",
      "no cost/rate execution",
    ]
  ),
  safetyRecoveryReviewEnvelope: buildRecoveryReviewEnvelope(
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT,
    "safety recovery review envelope",
    "Safety recovery review envelope is defined as a static recovery review only and does not mutate safety posture.",
    [
      "safety recovery review envelope",
      "safety recovery review only",
      "review path defined",
    ]
  ),
  privacyRedactionRecoveryReviewEnvelope: buildRecoveryReviewEnvelope(
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT,
    "privacy/redaction recovery review envelope",
    "Privacy/redaction recovery review envelope is defined as a static recovery review only and does not mutate privacy or redaction state.",
    [
      "privacy/redaction recovery review envelope",
      "privacy redaction recovery review only",
      "no privacy/redaction execution",
    ]
  ),
  providerErrorTaxonomy:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_ERROR_TAXONOMY,
  providerRefusalTaxonomy:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_REFUSAL_TAXONOMY,
  providerTimeoutTaxonomy:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_TIMEOUT_TAXONOMY,
  providerRateLimitTaxonomy:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_RATE_LIMIT_TAXONOMY,
  providerCostLimitTaxonomy:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_COST_LIMIT_TAXONOMY,
  providerSafetyBlockTaxonomy:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_PROVIDER_SAFETY_BLOCK_TAXONOMY,
  rollbackReviewEnvelope: buildRecoveryReviewEnvelope(
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT,
    "rollback review envelope",
    "Rollback review envelope is defined as a static recovery review only and does not execute rollback.",
    ["rollback review envelope", "rollback review only", "no rollback execution"]
  ),
  killSwitchRecoveryState: buildSummaryRecord(
    "kill switch recovery state",
    "required",
    "Kill switch recovery state remains required before any future real provider adapter wiring batch.",
    ["kill switch recovery state", "hard kill switch", "review-only"]
  ),
  idempotencyRecoveryState: buildSummaryRecord(
    "idempotency recovery state",
    "required",
    "Idempotency recovery state remains required and review-only.",
    ["idempotency recovery state", "idempotency key required", "review-only"]
  ),
  replayBlockRecoveryState: buildSummaryRecord(
    "replay-block recovery state",
    "required",
    "Replay-block recovery state remains required and review-only.",
    ["replay-block recovery state", "replay block required", "review-only"]
  ),
  singleCallLockRecoveryState: buildSummaryRecord(
    "single-call-lock recovery state",
    "required",
    "Single-call-lock recovery state remains required and review-only.",
    ["single-call-lock recovery state", "single-call lock required", "review-only"]
  ),
  recoveryPlanReview: buildStaticRecoveryPlanReview(
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_INPUT
  ),
  recoveryBlockers: JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RECOVERY_BLOCKERS,
  nextAdapterWiringManualTrialRequirements:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_MANUAL_TRIAL_REQUIREMENTS,
} as const satisfies JarvisVideoFirstProviderTrialRecoveryModel;

export function listResultReviewBlockers(
  model: JarvisVideoFirstProviderTrialResultReviewModel
) {
  return model.resultReviewBlockers.map((item) => item.title);
}

export function listRecoveryBlockers(
  model: JarvisVideoFirstProviderTrialRecoveryModel
) {
  return model.recoveryBlockers.map((item) => item.title);
}

export function listNextManualGatedTrialRequirements(
  reviewModel: JarvisVideoFirstProviderTrialResultReviewModel,
  recoveryModel: JarvisVideoFirstProviderTrialRecoveryModel
) {
  return reviewModel.nextManualGatedTrialAcceptanceChecklist.map(
    (item) => item.title
  ).concat(
    recoveryModel.nextAdapterWiringManualTrialRequirements
      .map((item) => item.title)
      .filter((item, index, values) => values.indexOf(item) === index)
  );
}

export function buildResultReviewRecoveryHandoffSummary(
  reviewModel: JarvisVideoFirstProviderTrialResultReviewModel,
  recoveryModel: JarvisVideoFirstProviderTrialRecoveryModel
) {
  return buildSummaryRecord(
    "result review recovery handoff summary",
    "manual-gated-trial-next",
    "Provider result review path defined. Recovery review only. Provider execution still requires injected server-only adapter. No provider call happens during validation. First real provider adapter wiring and manual gated trial next.",
    [
      reviewModel.firstProviderTrialResultReviewSummary.items[0],
      reviewModel.firstProviderTrialResultReviewSummary.items[1],
      reviewModel.operatorAcceptanceChecklist[0].title,
      recoveryModel.recoveryPlanReview.items[2],
    ]
  );
}

const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_HANDOFF_SUMMARY =
  buildResultReviewRecoveryHandoffSummary(
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_MODEL,
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RECOVERY_MODEL
  );

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_CHECKPOINT =
  JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_CHECKPOINT;

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_DISPLAY_MARKERS =
  [
    "4330-4361 - Jarvis Video First Provider Trial Result Review and Recovery",
    "Jarvis Video First Provider Trial Result Review and Recovery",
    "Highest detected phase: 4361",
    "Latest completed batch: 4330-4361 - Jarvis Video First Provider Trial Result Review and Recovery",
    "Previous completed batch: 4298-4329 - Jarvis Video First Gated Provider Execution Trial Runtime",
    "Next likely batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial",
    "result review version",
    "provider trial runtime reference",
    "runtime result reference",
    "runtime blocked result reference",
    "provider attempt status envelope",
    "provider response metadata placeholder, no secrets",
    "provider not-called validation state",
    "successful result review envelope",
    "failed result review envelope",
    "blocked result review envelope",
    "artifact review placeholder",
    "audit envelope reference",
    "approval join reference",
    "operator review state",
    "operator acceptance envelope",
    "operator rejection envelope",
    "safety review envelope",
    "privacy/redaction review envelope",
    "cost/rate/duration/resolution review envelope",
    "timeout/cancel review envelope",
    "result quality checklist",
    "provider result review lanes",
    "artifact handoff checklist",
    "export/publish blocker checklist",
    "result review blockers",
    "next manual gated trial acceptance checklist",
    "recovery version",
    "recovery mode: review only",
    "retry review envelope",
    "fallback review envelope",
    "timeout recovery review envelope",
    "cost/rate recovery review envelope",
    "safety recovery review envelope",
    "privacy/redaction recovery review envelope",
    "provider error taxonomy",
    "provider refusal taxonomy",
    "provider timeout taxonomy",
    "provider rate-limit taxonomy",
    "provider cost-limit taxonomy",
    "provider safety-block taxonomy",
    "rollback review envelope",
    "kill switch recovery state",
    "idempotency recovery state",
    "replay-block recovery state",
    "single-call-lock recovery state",
    "recovery blockers",
    "next adapter wiring/manual trial requirements",
    "first provider trial result review and recovery only",
    "provider result review path defined",
    "Provider trial result review is defined",
    "recovery review only",
    "Recovery review is defined",
    "no provider call during validation",
    "no live video generation during validation",
    "provider adapter injection required",
    "operator acceptance required",
    "retry/fallback review only",
    "no retry execution",
    "no fallback execution",
    "no frontend provider call",
    "no queue dispatch",
    "no worker dispatch",
    "no job execution",
    "no result persistence",
    "no audit persistence",
    "no approval persistence",
    "no artifact persistence",
    "export/publish blocked",
    "backend-only execution path required",
    "server-only boundary required",
    "first real provider adapter wiring/manual gated trial in a future batch",
    "Next step is first real provider adapter wiring and manual gated trial",
  ] as const satisfies readonly string[];

export const JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_MODEL = {
  reviewModel: JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_MODEL,
  recoveryModel: JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RECOVERY_MODEL,
  providerErrorTaxonomy:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RECOVERY_MODEL.providerErrorTaxonomy,
  recoveryPlanReview:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RECOVERY_MODEL.recoveryPlanReview,
  operatorAcceptanceChecklist:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_MODEL.operatorAcceptanceChecklist,
  artifactHandoffChecklist:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_MODEL.artifactHandoffChecklist,
  exportPublishBlockerChecklist:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_MODEL.exportPublishBlockerChecklist,
  nextManualGatedTrialChecklist:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_MODEL.nextManualGatedTrialAcceptanceChecklist,
  handoffSummary:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_HANDOFF_SUMMARY,
  checkpoint: JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_CHECKPOINT,
  displayMarkers:
    JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_DISPLAY_MARKERS,
} as const satisfies JarvisVideoFirstProviderTrialResultReviewRecoveryModel;

export function buildStaticJarvisVideoFirstProviderTrialResultReviewRecoveryPreview() {
  const model = JARVIS_VIDEO_FIRST_PROVIDER_TRIAL_RESULT_REVIEW_RECOVERY_MODEL;

  return {
    title: "Provider trial result review and recovery",
    statusBadge: "review path defined",
    summary:
      "Provider trial result review path defined. Recovery review only. Runtime remains disabled by default. Provider execution still requires injected server-only adapter. No provider call happens during validation. Operator acceptance is required before promotion. Retry and fallback remain review-only. Result/audit/approval persistence remain unimplemented. Export/publish remains blocked. Next step is first real provider adapter wiring and manual gated trial.",
    highlights: model.reviewModel.firstProviderTrialResultReviewSummary.items,
    productStatements: [
      "Provider trial result review is defined",
      "Recovery review is defined",
      "Runtime remains disabled by default",
      "Provider execution still requires injected server-only adapter",
      "No provider call happens during validation",
      "Operator acceptance is required before promotion",
      "Retry and fallback remain review-only",
      "Result/audit/approval persistence remain unimplemented",
      "Export/publish remains blocked",
      "Next step is first real provider adapter wiring and manual gated trial",
    ],
    reviewLanes: model.reviewModel.providerResultReviewLanes.map(
      (lane) => lane.title
    ),
    recoveryLanes: [
      model.recoveryModel.retryReviewEnvelope.title,
      model.recoveryModel.fallbackReviewEnvelope.title,
      model.recoveryModel.timeoutRecoveryReviewEnvelope.title,
      model.recoveryModel.costRateRecoveryReviewEnvelope.title,
    ],
    operatorAcceptanceChecklist: model.operatorAcceptanceChecklist.map(
      (item) => item.title
    ),
    artifactHandoffChecklist: model.artifactHandoffChecklist.map(
      (item) => item.title
    ),
    exportPublishBlockers: model.exportPublishBlockerChecklist.map(
      (item) => item.title
    ),
    nextManualGatedTrialChecklist: listNextManualGatedTrialRequirements(
      model.reviewModel,
      model.recoveryModel
    ),
    evidenceInputCount: model.reviewModel.evidenceSources.length,
    checkpoint: model.checkpoint,
  } as const satisfies JarvisVideoFirstProviderTrialResultReviewRecoveryPreview;
}
