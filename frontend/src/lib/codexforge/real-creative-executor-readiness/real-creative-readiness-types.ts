export type RealCreativeExecutorKind =
  | "blender"
  | "comfyui"
  | "unreal"
  | "ffmpeg"
  | "local-renderer"
  | "artifact-capture"
  | "manual-export"
  | "mixed-pipeline"
  | "unknown";

export type RealCreativeReadinessLevel =
  | "audit-only"
  | "dry-run-ready"
  | "health-probe-ready"
  | "executor-mvp-candidate"
  | "blocked";

export type RealCreativeReadinessAuditStatus =
  | "ready"
  | "needs-config"
  | "warning"
  | "blocker"
  | "unknown";

export type RealCreativeReadinessScore =
  | "ready-for-audit"
  | "dry-run-ready"
  | "health-probe-ready"
  | "mvp-candidate"
  | "blocked"
  | "unknown";

export type RealCreativeReadinessNextActionId =
  | "complete-local-bridge-setup"
  | "review-adapter-allowlist"
  | "define-artifact-output-root"
  | "run-sandbox-simulation"
  | "review-artifact-board"
  | "complete-approval-packet"
  | "define-kill-switch-plan"
  | "prepare-future-guarded-health-probe"
  | "prepare-real-executor-mvp-candidate"
  | "stop-and-stabilize";

export type RealCreativeReadinessSourceEvidence = {
  bridgeProfileExists: boolean;
  bridgeProfileConfigured: boolean;
  healthTargetExists: boolean;
  healthResultSupplied: boolean;
  localAppRequirementVisible: boolean;
  localEndpointRequirementVisible: boolean;
  artifactBoundaryVisible: boolean;
  safeProbePolicyExists: boolean;
  realProbeBlocked: boolean;
  executorDependsOnBridgeReadiness: boolean;
  adapterIdKnown: boolean;
  adapterKindKnown: boolean;
  adapterAllowlisted: boolean;
  allowedModeSafe: boolean;
  sideEffectsDocumented: boolean;
  approvalRequirementsDocumented: boolean;
  blockedModesDocumented: boolean;
  sourceRouteKnown: boolean;
  noBroadWildcardAdapters: boolean;
  noArbitraryCommandAdapter: boolean;
  projectRootBoundaryVisible: boolean;
  artifactOutputRootBoundaryVisible: boolean;
  noAbsoluteUnreviewedOutputPath: boolean;
  noParentDirectoryTraversal: boolean;
  noWriteTargetOutsideArtifactRoot: boolean;
  noExecutablePathUsedAsOutputPath: boolean;
  pathPlaceholdersMarked: boolean;
  futureExecutorRequiresPathValidation: boolean;
  windowsPathHandlingReviewed: boolean;
  longPathBehaviorReviewed: boolean;
  expectedArtifactTypesKnown: boolean;
  artifactCapturePlanExists: boolean;
  metadataPlanExists: boolean;
  provenancePlanExists: boolean;
  reviewRouteExists: boolean;
  retentionStrategyExists: boolean;
  overwritePolicyExists: boolean;
  partialOutputHandlingExists: boolean;
  failedOutputHandlingExists: boolean;
  generatedVsPlaceholderClear: boolean;
  sandboxRunExists: boolean;
  dryRunResultExists: boolean;
  fakeArtifactsLabeled: boolean;
  fakeLogsLabeled: boolean;
  verificationReportExists: boolean;
  noRealExecutionOccurred: boolean;
  cancellationSimulationExists: boolean;
  resultHandoffExists: boolean;
  futureExecutorPacketExists: boolean;
  evidenceIsContextNotAuthority: boolean;
  approvalPacketExists: boolean;
  approvedFlagPresent: boolean;
  acknowledgementListComplete: boolean;
  localAppRiskAcknowledged: boolean;
  artifactBoundaryAcknowledged: boolean;
  resourceTimeRiskAcknowledged: boolean;
  cancellationLimitsAcknowledged: boolean;
  rollbackLimitsAcknowledged: boolean;
  latestMessageAuthorityAcknowledged: boolean;
  highRiskExecutorExtraAcknowledgementPresent: boolean;
  cancellationPlanExists: boolean;
  queuedJobCancellationModeled: boolean;
  runningJobCancellationFutureOnly: boolean;
  partialArtifactHandlingModeled: boolean;
  logPreservationModeled: boolean;
  failureStateModeled: boolean;
  manualStopGuidancePresent: boolean;
  noCurrentProcessTermination: boolean;
  futureExecutorKillSwitchRequired: boolean;
  operatorStopActionDefined: boolean;
  uxOperatorClarityReady: boolean;
  smokeCoverageReady: boolean;
};

export type RealCreativeReadinessInput = {
  auditId: string;
  targetExecutorKind: RealCreativeExecutorKind;
  sourceBridgeHealthSummary: string[];
  sourceExecutorPolicySummary: string[];
  sourceSandboxSummary: string[];
  sourceArtifactReviewSummary: string[];
  sourceRenderJobSummary: string[];
  sourceApprovalSummary: string[];
  operatorIntent: string;
  targetReadinessLevel: RealCreativeReadinessLevel;
  noExecutionGuarantee: string;
  latestMessageAuthorityReminder: string;
  evidence: RealCreativeReadinessSourceEvidence;
};

export type RealCreativeReadinessValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type RealCreativeReadinessAuditItem = {
  itemId: string;
  label: string;
  status: RealCreativeReadinessAuditStatus;
  detail: string;
  evidence: string;
  critical: boolean;
  nextStep: string;
};

export type RealCreativeReadinessAudit = {
  auditId: string;
  targetExecutorKind: RealCreativeExecutorKind;
  status: RealCreativeReadinessAuditStatus;
  items: RealCreativeReadinessAuditItem[];
  blockerCount: number;
  warningCount: number;
  summary: string[];
};

export type BridgeReadinessAudit = RealCreativeReadinessAudit;
export type AdapterAllowlistAudit = RealCreativeReadinessAudit;
export type PathBoundaryAudit = RealCreativeReadinessAudit;
export type ArtifactOutputAudit = RealCreativeReadinessAudit;
export type DryRunEvidenceAudit = RealCreativeReadinessAudit;
export type ApprovalReadinessAudit = RealCreativeReadinessAudit;
export type KillSwitchReadinessAudit = RealCreativeReadinessAudit;

export type ExecutorReadinessScoreCategory =
  | "bridge health"
  | "adapter allowlist"
  | "path boundaries"
  | "artifact output"
  | "dry-run evidence"
  | "approval readiness"
  | "kill-switch readiness"
  | "UX/operator clarity"
  | "smoke coverage"
  | "future execution readiness";

export type ExecutorReadinessScore = {
  scoreId: string;
  category: ExecutorReadinessScoreCategory;
  score: RealCreativeReadinessScore;
  passed: boolean;
  critical: boolean;
  detail: string;
  blockedReasons: string[];
};

export type ExecutorReadinessScorecard = {
  scorecardId: string;
  targetExecutorKind: RealCreativeExecutorKind;
  scores: ExecutorReadinessScore[];
  overallScore: RealCreativeReadinessScore;
  executionAllowed: false;
  futureMvpCandidate: boolean;
  blockedReasons: string[];
  summary: string[];
};

export type RealCreativeReadinessNextAction = {
  actionId: RealCreativeReadinessNextActionId;
  label: string;
  route: string;
  reason: string;
  priority: number;
  copyPrompt: string;
};

export type RealCreativeReadinessNextActionPlan = {
  planId: string;
  selected: RealCreativeReadinessNextAction;
  candidates: RealCreativeReadinessNextAction[];
  summary: string[];
};

export type RealCreativeReadinessSummary = {
  targetExecutorKind: RealCreativeExecutorKind;
  auditStatus: RealCreativeReadinessAuditStatus;
  scorecardStatus: RealCreativeReadinessScore;
  blockerCount: number;
  warningCount: number;
  mvpCandidate: boolean;
  executionAllowed: false;
  nextSafeAction: string;
  summary: string[];
};

export type RealCreativeExecutorReadinessModel = {
  input: RealCreativeReadinessInput;
  inputValidation: RealCreativeReadinessValidation;
  bridgeReadinessAudit: BridgeReadinessAudit;
  adapterAllowlistAudit: AdapterAllowlistAudit;
  pathBoundaryAudit: PathBoundaryAudit;
  artifactOutputAudit: ArtifactOutputAudit;
  dryRunEvidenceAudit: DryRunEvidenceAudit;
  approvalReadinessAudit: ApprovalReadinessAudit;
  killSwitchReadinessAudit: KillSwitchReadinessAudit;
  scorecard: ExecutorReadinessScorecard;
  nextActionPlan: RealCreativeReadinessNextActionPlan;
  summary: RealCreativeReadinessSummary;
};

export const REAL_CREATIVE_EXECUTOR_KINDS: RealCreativeExecutorKind[] = [
  "blender",
  "comfyui",
  "unreal",
  "ffmpeg",
  "local-renderer",
  "artifact-capture",
  "manual-export",
  "mixed-pipeline",
  "unknown",
];

export const REAL_CREATIVE_READINESS_LEVELS: RealCreativeReadinessLevel[] = [
  "audit-only",
  "dry-run-ready",
  "health-probe-ready",
  "executor-mvp-candidate",
  "blocked",
];

export function buildRealCreativeReadinessStableId(
  prefix: string,
  parts: ReadonlyArray<string | number | boolean | null | undefined>
): string {
  const slug = parts
    .map((part) => String(part ?? "unknown").trim().toLowerCase())
    .join("-")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 112);

  return `${prefix}-${slug || "unknown"}`;
}

export function buildRealCreativeReadinessReactKey(
  ...parts: ReadonlyArray<string | number | boolean | null | undefined>
): string {
  return buildRealCreativeReadinessStableId("real-creative-readiness-key", parts);
}

export function summarizeRealCreativeAuditStatus(
  items: readonly RealCreativeReadinessAuditItem[]
): RealCreativeReadinessAuditStatus {
  if (items.some((item) => item.status === "blocker")) return "blocker";
  if (items.some((item) => item.status === "needs-config")) return "needs-config";
  if (items.some((item) => item.status === "warning")) return "warning";
  if (items.length === 0 || items.some((item) => item.status === "unknown")) return "unknown";
  return "ready";
}
