import {
  buildLocalBridgeHealthModel,
  summarizeLocalBridgeHealthSession,
} from "@/lib/codexforge/local-bridge-health";
import {
  buildGuardedCreativeExecutorModel,
  summarizeCreativeExecutorSession,
} from "@/lib/codexforge/guarded-creative-executor";
import {
  buildCreativeExecutionSandboxModel,
  summarizeCreativeExecutionSandboxSession,
} from "@/lib/codexforge/creative-execution-sandbox";
import {
  buildVideoRenderJobPreviewModel,
  summarizeVideoRenderSession,
} from "@/lib/codexforge/video-render-job-preview";
import type {
  RealCreativeExecutorKind,
  RealCreativeReadinessInput,
  RealCreativeReadinessLevel,
  RealCreativeReadinessSourceEvidence,
  RealCreativeReadinessValidation,
} from "./real-creative-readiness-types";
import {
  buildRealCreativeReadinessStableId,
  REAL_CREATIVE_EXECUTOR_KINDS,
  REAL_CREATIVE_READINESS_LEVELS,
} from "./real-creative-readiness-types";

const DEFAULT_EVIDENCE: RealCreativeReadinessSourceEvidence = {
  bridgeProfileExists: true,
  bridgeProfileConfigured: false,
  healthTargetExists: true,
  healthResultSupplied: true,
  localAppRequirementVisible: true,
  localEndpointRequirementVisible: true,
  artifactBoundaryVisible: true,
  safeProbePolicyExists: true,
  realProbeBlocked: true,
  executorDependsOnBridgeReadiness: true,
  adapterIdKnown: true,
  adapterKindKnown: true,
  adapterAllowlisted: true,
  allowedModeSafe: true,
  sideEffectsDocumented: true,
  approvalRequirementsDocumented: true,
  blockedModesDocumented: true,
  sourceRouteKnown: true,
  noBroadWildcardAdapters: true,
  noArbitraryCommandAdapter: true,
  projectRootBoundaryVisible: true,
  artifactOutputRootBoundaryVisible: true,
  noAbsoluteUnreviewedOutputPath: true,
  noParentDirectoryTraversal: true,
  noWriteTargetOutsideArtifactRoot: true,
  noExecutablePathUsedAsOutputPath: true,
  pathPlaceholdersMarked: true,
  futureExecutorRequiresPathValidation: true,
  windowsPathHandlingReviewed: true,
  longPathBehaviorReviewed: true,
  expectedArtifactTypesKnown: true,
  artifactCapturePlanExists: true,
  metadataPlanExists: true,
  provenancePlanExists: true,
  reviewRouteExists: true,
  retentionStrategyExists: true,
  overwritePolicyExists: false,
  partialOutputHandlingExists: true,
  failedOutputHandlingExists: true,
  generatedVsPlaceholderClear: true,
  sandboxRunExists: true,
  dryRunResultExists: true,
  fakeArtifactsLabeled: true,
  fakeLogsLabeled: true,
  verificationReportExists: true,
  noRealExecutionOccurred: true,
  cancellationSimulationExists: true,
  resultHandoffExists: true,
  futureExecutorPacketExists: true,
  evidenceIsContextNotAuthority: true,
  approvalPacketExists: true,
  approvedFlagPresent: true,
  acknowledgementListComplete: false,
  localAppRiskAcknowledged: false,
  artifactBoundaryAcknowledged: false,
  resourceTimeRiskAcknowledged: false,
  cancellationLimitsAcknowledged: false,
  rollbackLimitsAcknowledged: false,
  latestMessageAuthorityAcknowledged: false,
  highRiskExecutorExtraAcknowledgementPresent: false,
  cancellationPlanExists: true,
  queuedJobCancellationModeled: true,
  runningJobCancellationFutureOnly: true,
  partialArtifactHandlingModeled: true,
  logPreservationModeled: true,
  failureStateModeled: true,
  manualStopGuidancePresent: true,
  noCurrentProcessTermination: true,
  futureExecutorKillSwitchRequired: true,
  operatorStopActionDefined: true,
  uxOperatorClarityReady: true,
  smokeCoverageReady: true,
};

export function normalizeRealCreativeExecutorKind(kind: string | undefined): RealCreativeExecutorKind {
  return REAL_CREATIVE_EXECUTOR_KINDS.includes(kind as RealCreativeExecutorKind)
    ? (kind as RealCreativeExecutorKind)
    : "unknown";
}

export function normalizeRealCreativeReadinessLevel(level: string | undefined): RealCreativeReadinessLevel {
  return REAL_CREATIVE_READINESS_LEVELS.includes(level as RealCreativeReadinessLevel)
    ? (level as RealCreativeReadinessLevel)
    : "audit-only";
}

export function buildRealCreativeReadinessInput(
  input: Partial<RealCreativeReadinessInput> = {}
): RealCreativeReadinessInput {
  const targetExecutorKind = normalizeRealCreativeExecutorKind(
    input.targetExecutorKind ?? "mixed-pipeline"
  );
  const targetReadinessLevel = normalizeRealCreativeReadinessLevel(input.targetReadinessLevel);
  const bridge = buildLocalBridgeHealthModel();
  const executor = buildGuardedCreativeExecutorModel();
  const sandbox = buildCreativeExecutionSandboxModel();
  const render = buildVideoRenderJobPreviewModel();
  const evidence = { ...DEFAULT_EVIDENCE, ...input.evidence };

  return {
    auditId:
      input.auditId ??
      buildRealCreativeReadinessStableId("real-creative-readiness-audit", [
        targetExecutorKind,
        targetReadinessLevel,
      ]),
    targetExecutorKind,
    sourceBridgeHealthSummary:
      input.sourceBridgeHealthSummary ?? summarizeLocalBridgeHealthSession(bridge.summary),
    sourceExecutorPolicySummary:
      input.sourceExecutorPolicySummary ?? summarizeCreativeExecutorSession(executor.summary),
    sourceSandboxSummary:
      input.sourceSandboxSummary ?? summarizeCreativeExecutionSandboxSession(sandbox.summary),
    sourceArtifactReviewSummary:
      input.sourceArtifactReviewSummary ?? [
        "Creative Artifact Review Board is review-only and copy-only.",
        "Sandbox artifact placeholders, render queue manifests, Blender packets, ComfyUI manifests, and Unreal packets are visible for review.",
        "No artifact files are written from the board.",
      ],
    sourceRenderJobSummary:
      input.sourceRenderJobSummary ?? summarizeVideoRenderSession(render.summary),
    sourceApprovalSummary:
      input.sourceApprovalSummary ?? [
        `Guarded Creative Executor approval ready: ${String(executor.summary.approvalReady)}.`,
        `Video Render approval ready: ${String(render.summary.approvalReady)}.`,
        "Approval defaults blocked for real execution until a future phase explicitly enables execution.",
      ],
    operatorIntent:
      input.operatorIntent ??
      "Audit whether a future real creative executor could ever become safe; do not launch apps, probe endpoints, execute commands, render, or write files.",
    targetReadinessLevel,
    noExecutionGuarantee:
      input.noExecutionGuarantee ??
      "Phase 70 is audit-only: no real execution, no render execution, no command execution, no local HTTP calls, no provider calls, no artifact file writes, and execution allowed false.",
    latestMessageAuthorityReminder:
      input.latestMessageAuthorityReminder ??
      "Preserve latest-message authority: newest operator instruction controls the current audit and can keep execution blocked.",
    evidence,
  };
}

export function validateRealCreativeReadinessInput(
  input: RealCreativeReadinessInput
): RealCreativeReadinessValidation {
  const blockedReasons = [
    input.auditId ? "" : "audit id required",
    input.targetExecutorKind === "unknown" ? "known target executor kind required" : "",
    input.operatorIntent ? "" : "operator intent required",
    input.noExecutionGuarantee.toLowerCase().includes("execution allowed false")
      ? ""
      : "execution allowed false guarantee required",
    input.noExecutionGuarantee.toLowerCase().includes("no real execution")
      ? ""
      : "no real execution guarantee required",
    input.latestMessageAuthorityReminder.toLowerCase().includes("latest-message authority")
      ? ""
      : "latest-message authority reminder required",
  ].filter(Boolean);
  const warnings = [
    input.targetReadinessLevel === "executor-mvp-candidate"
      ? "Executor MVP candidate can only be a future candidate; Phase 70 still blocks execution."
      : "",
    input.evidence.bridgeProfileConfigured
      ? ""
      : "Bridge profile configuration is not complete in the default readiness evidence.",
    input.evidence.acknowledgementListComplete
      ? ""
      : "Approval acknowledgement list is incomplete in the default readiness evidence.",
  ].filter(Boolean);

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
  };
}

export function summarizeRealCreativeReadinessInput(input: RealCreativeReadinessInput): string[] {
  return [
    `${input.auditId} targets ${input.targetExecutorKind} at ${input.targetReadinessLevel}.`,
    `Operator intent: ${input.operatorIntent}`,
    `Source bridge health summary: ${input.sourceBridgeHealthSummary.join(" ")}`,
    `Source executor policy summary: ${input.sourceExecutorPolicySummary.join(" ")}`,
    `Source sandbox summary: ${input.sourceSandboxSummary.join(" ")}`,
    `Source artifact review summary: ${input.sourceArtifactReviewSummary.join(" ")}`,
    `Source render job summary: ${input.sourceRenderJobSummary.join(" ")}`,
    `Source approval summary: ${input.sourceApprovalSummary.join(" ")}`,
    input.noExecutionGuarantee,
    input.latestMessageAuthorityReminder,
  ];
}
