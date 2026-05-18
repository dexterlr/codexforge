export type StabilizationSignalType =
  | "build-posture"
  | "smoke-posture"
  | "regression-posture"
  | "fix-queue-posture"
  | "patch-queue-posture"
  | "apply-gate-posture"
  | "verification-posture"
  | "rollback-posture"
  | "memory-review-posture"
  | "mission-readiness-posture"
  | "operator-warning"
  | "unknown";

export type StabilizationSeverity = "ready" | "info" | "warning" | "risk" | "blocker";

export type StabilizationSource =
  | "build"
  | "smoke"
  | "verification-ingestion"
  | "regression-triage"
  | "regression-fix-queue"
  | "grounded-fix-recommendation"
  | "patch-preview-queue"
  | "preview-diff-composer"
  | "patch-application-gate"
  | "apply-diff-dry-run"
  | "apply-diff-execution-gate"
  | "post-apply-verification"
  | "mission-control"
  | "memory-review"
  | "brain-merge-review"
  | "operator-note"
  | "stabilization-command-center"
  | "unknown";

export type StabilizationRelatedSurface =
  | "/stabilization"
  | "/mission"
  | "/ai"
  | "/files"
  | "/tasks"
  | "/memory"
  | "/memory-inbox"
  | "/brain"
  | "/runs"
  | "domain"
  | "smoke suite"
  | "unknown";

export type StabilizationSignal = {
  id: string;
  type: StabilizationSignalType;
  severity: StabilizationSeverity;
  title: string;
  detail: string;
  source: StabilizationSource;
  relatedSurface: StabilizationRelatedSurface;
  relatedFiles: string[];
  recommendedAction: string;
  reviewRequired: boolean;
};

export type StabilizationSignalSummary = {
  id: "stabilization-signal-summary";
  totalSignals: number;
  readyCount: number;
  infoCount: number;
  warningCount: number;
  riskCount: number;
  blockerCount: number;
  reviewRequiredCount: number;
  topSignal: StabilizationSignal | null;
  summary: string[];
};

export type StabilizationHealthDimensionId =
  | "build-health"
  | "smoke-health"
  | "regression-health"
  | "fix-queue-health"
  | "patch-queue-health"
  | "apply-gate-health"
  | "verification-health"
  | "rollback-readiness"
  | "memory-review-posture"
  | "mission-control-posture"
  | "latest-message-authority-posture"
  | "safety-posture";

export type StabilizationHealthLevel = "ready" | "needs-review" | "warning" | "blocked" | "unknown";

export type StabilizationHealthDimension = {
  id: StabilizationHealthDimensionId;
  label: string;
  level: StabilizationHealthLevel;
  score: number;
  detail: string;
  nextAction: string;
  relatedSignals: string[];
};

export type StabilizationHealthReport = {
  id: "stabilization-health-report";
  overallLevel: StabilizationHealthLevel;
  score: number;
  dimensions: StabilizationHealthDimension[];
  blockers: string[];
  warnings: string[];
  nextSafeAction: string;
  summary: string[];
};

export type StabilizationQueueRiskPosture = "ready" | "needs-review" | "warning" | "blocked" | "unknown";

export type StabilizationQueueRollupItem = {
  id: string;
  label: string;
  count: number;
  readyCount: number;
  blockedCount: number;
  highestPriority: string;
  riskPosture: StabilizationQueueRiskPosture;
  nextAction: string;
  targetRoute: StabilizationRelatedSurface;
};

export type StabilizationQueueRollup = {
  id: "stabilization-queue-rollup";
  items: StabilizationQueueRollupItem[];
  totalCount: number;
  readyCount: number;
  blockedCount: number;
  summary: string[];
};

export type StabilizationRiskCategory =
  | "build-break"
  | "smoke-break"
  | "browser-warning"
  | "UI-layout-risk"
  | "policy-boundary-risk"
  | "mutation-risk"
  | "stale-evidence-risk"
  | "rollback-risk"
  | "memory-authority-risk"
  | "latest-message-authority-risk"
  | "unknown-risk";

export type StabilizationRiskItem = {
  id: string;
  category: StabilizationRiskCategory;
  title: string;
  severity: StabilizationSeverity;
  source: StabilizationSource;
  relatedSurface: StabilizationRelatedSurface;
  mitigation: string;
  safePatchPreviewRequired: boolean;
  verificationRequired: boolean;
};

export type StabilizationRiskBoard = {
  id: "stabilization-risk-board";
  items: StabilizationRiskItem[];
  topRisk: StabilizationRiskItem | null;
  blockerCount: number;
  warningCount: number;
  summary: string[];
};

export type StabilizationReadinessStatus = "ready" | "needs-review" | "warning" | "blocked";

export type StabilizationReadinessCheck = {
  id: string;
  label: string;
  status: StabilizationReadinessStatus;
  detail: string;
  reviewRequired: boolean;
};

export type StabilizationReadiness = {
  id: "stabilization-readiness";
  checks: StabilizationReadinessCheck[];
  readyCount: number;
  warningCount: number;
  blockedCount: number;
  score: number;
  summary: string[];
};

export type StabilizationTimelineKind =
  | "verification-pasted"
  | "regression-detected"
  | "triage-created"
  | "fix-queued"
  | "patch-preview-queued"
  | "preview-diff-composed"
  | "apply-gate-prepared"
  | "dry-run-simulated"
  | "execution-gate-reviewed"
  | "post-apply-verification-prepared"
  | "stabilization-reviewed";

export type StabilizationTimelineItem = {
  id: string;
  kind: StabilizationTimelineKind;
  label: string;
  detail: string;
  severity: StabilizationSeverity;
  source: StabilizationSource;
  relatedSurface: StabilizationRelatedSurface;
  suppliedAt: string | null;
};

export type StabilizationTimeline = {
  id: "stabilization-timeline";
  items: StabilizationTimelineItem[];
  summary: string[];
};

export type StabilizationNextActionKind =
  | "commit clean checkpoint"
  | "run targeted smoke manually"
  | "paste verification output"
  | "review regression triage"
  | "review regression fix queue"
  | "prepare Safe Patch Preview"
  | "compose preview diff"
  | "review apply gate"
  | "review runtime event executor"
  | "prepare rollback"
  | "stop and stabilize"
  | "continue next phase";

export type StabilizationNextAction = {
  id: string;
  action: StabilizationNextActionKind;
  title: string;
  detail: string;
  priority: "primary" | "secondary";
  targetRoute: StabilizationRelatedSurface;
  reviewRequired: boolean;
};

export type StabilizationNextActionPlan = {
  id: "stabilization-next-action-plan";
  selected: StabilizationNextAction;
  orderedActions: StabilizationNextAction[];
  blockers: string[];
  warnings: string[];
  validationCommands: string[];
  summary: string[];
};

export type StabilizationHandoff = {
  id: "stabilization-handoff";
  prompt: string;
  blockers: string[];
  warnings: string[];
  nextAction: string;
  validationCommands: string[];
  summary: string[];
};

export type StabilizationCommandCenterSessionSummary = {
  id: "stabilization-command-center-session-summary";
  overallHealth: StabilizationHealthLevel;
  blockerCount: number;
  warningCount: number;
  queueCount: number;
  readyQueueCount: number;
  blockedQueueCount: number;
  topRisk: string;
  nextSafeAction: string;
  validationRecommendation: string;
  summary: string[];
};

export type StabilizationSummaryLike = {
  id?: string | null;
  level?: string | null;
  posture?: string | null;
  status?: string | null;
  score?: number | null;
  signalCount?: number | null;
  totalSignals?: number | null;
  totalQueueItems?: number | null;
  count?: number | null;
  readyCount?: number | null;
  blockedCount?: number | null;
  blockerCount?: number | null;
  warningCount?: number | null;
  urgentCount?: number | null;
  targetFileCount?: number | null;
  approvalReady?: boolean | null;
  policyReady?: boolean | null;
  requestReady?: boolean | null;
  blocked?: boolean | null;
  nextSafeAction?: string | null;
  summary?: readonly string[] | null;
  checks?: readonly { status?: string | null; level?: string | null; detail?: string | null }[] | null;
  highestPriorityItem?: {
    title?: string | null;
    sourceRecommendationTitle?: string | null;
    primaryFile?: string | null;
  } | null;
};

export type StabilizationCommandCenterInput = {
  buildSummary?: StabilizationSummaryLike | null;
  smokeSummary?: StabilizationSummaryLike | null;
  verificationIngestionSummary?: StabilizationSummaryLike | null;
  regressionTriageSummary?: StabilizationSummaryLike | null;
  regressionFixQueueSummary?: StabilizationSummaryLike | null;
  groundedFixRecommendationSummary?: StabilizationSummaryLike | null;
  patchQueueSummary?: StabilizationSummaryLike | null;
  previewDiffComposerSummary?: StabilizationSummaryLike | null;
  applyGateSummary?: StabilizationSummaryLike | null;
  applyDiffDryRunSummary?: StabilizationSummaryLike | null;
  applyDiffExecutionGateSummary?: StabilizationSummaryLike | null;
  postApplyVerificationSummary?: StabilizationSummaryLike | null;
  missionReadinessSummary?: StabilizationSummaryLike | null;
  memoryReviewSummary?: StabilizationSummaryLike | null;
  brainMergeReviewSummary?: StabilizationSummaryLike | null;
  rollbackSummary?: StabilizationSummaryLike | null;
  manualOperatorNote?: string | null;
  relatedFiles?: readonly string[] | null;
  latestMessageAuthorityPreserved?: boolean | null;
  validationCommands?: readonly string[] | null;
};

export type StabilizationCommandCenterSummary = {
  id: "stabilization-command-center-summary";
  signals: StabilizationSignal[];
  signalSummary: StabilizationSignalSummary;
  health: StabilizationHealthReport;
  queueRollup: StabilizationQueueRollup;
  riskBoard: StabilizationRiskBoard;
  readiness: StabilizationReadiness;
  timeline: StabilizationTimeline;
  nextActionPlan: StabilizationNextActionPlan;
  handoff: StabilizationHandoff;
  sessionSummary: StabilizationCommandCenterSessionSummary;
};

export const STABILIZATION_VALIDATION_COMMANDS: readonly string[] = [
  "npm run build",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-stabilization-command-center.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-regression-fix-queue.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-regression-triage.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-verification-ingestion.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-mission-control.ps1",
  "npm run smoke:codexforge:server",
  "git diff --check",
];

export function buildStabilizationStableKey(
  ...parts: Array<string | number | boolean | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._/-]+/g, "-")
        .replace(/[/-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function uniqueStabilizationStrings(values: readonly (string | null | undefined)[]): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function readStabilizationCount(value: unknown, fallback = 0): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return fallback;
  return Math.round(numeric);
}

export function normalizeStabilizationValidationCommands(
  commands?: readonly string[] | null
): string[] {
  return uniqueStabilizationStrings([...(commands ?? []), ...STABILIZATION_VALIDATION_COMMANDS]);
}
