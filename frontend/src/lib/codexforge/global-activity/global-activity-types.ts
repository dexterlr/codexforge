export type GlobalActivityEventType =
  | "verification.ingested"
  | "verification.passed"
  | "verification.failed"
  | "regression.detected"
  | "regression.triaged"
  | "regression.fixQueued"
  | "patch.previewQueued"
  | "patch.previewComposed"
  | "apply.gatePrepared"
  | "apply.dryRunSimulated"
  | "apply.executionReviewed"
  | "postApply.verificationPrepared"
  | "memory.candidateCreated"
  | "brain.mergePreviewed"
  | "creative.planCreated"
  | "stabilization.reviewed"
  | "command.copied"
  | "route.opened"
  | "safety.blocked"
  | "unknown";

export type GlobalActivitySeverity = "blocker" | "warning" | "info" | "success" | "unknown";
export type GlobalActivityStatus = "needs-attention" | "review-required" | "queued" | "prepared" | "complete" | "blocked" | "unknown";
export type GlobalActivitySource =
  | "verification"
  | "regression-triage"
  | "regression-fix-queue"
  | "patch-preview"
  | "preview-diff"
  | "apply-gate"
  | "post-apply-verification"
  | "memory-review"
  | "brain-review"
  | "creative"
  | "stabilization"
  | "command-palette"
  | "navigation"
  | "safety"
  | "unknown";

export type GlobalActivitySurface =
  | "Verification Ingestion"
  | "Regression Triage"
  | "Regression Fix Queue"
  | "Patch Preview Queue"
  | "Preview Diff Composer"
  | "Patch Application Gate"
  | "Apply-Diff Dry Run"
  | "Apply-Diff Execution Gate"
  | "Post-Apply Verification"
  | "Memory Review"
  | "Brain Merge Review"
  | "Creative Production Studio"
  | "Stabilization Command Center"
  | "Command Palette"
  | "Navigation Shell"
  | "Global Activity Feed"
  | "Unknown";

export type GlobalActivityRoute =
  | "/"
  | "/activity"
  | "/ai"
  | "/brain"
  | "/files"
  | "/tasks"
  | "/memory"
  | "/creative"
  | "/capabilities"
  | "/stabilization"
  | "/history";

export type GlobalActivityEvent = {
  id: string;
  type: GlobalActivityEventType;
  title: string;
  detail: string;
  source: GlobalActivitySource;
  surface: GlobalActivitySurface;
  severity: GlobalActivitySeverity;
  priority: number;
  status: GlobalActivityStatus;
  relatedRoutes: GlobalActivityRoute[];
  relatedFiles: string[];
  relatedIds: string[];
  reviewRequired: boolean;
  nextActionLabel: string;
  timestampLabel?: string;
  sortKey?: string;
};

export type GlobalActivityEventInput = Partial<Omit<GlobalActivityEvent, "id">> & {
  id?: string;
  type: GlobalActivityEventType;
  title: string;
  detail?: string;
  source?: GlobalActivitySource;
  surface?: GlobalActivitySurface;
};

export type GlobalActivitySourceSummaryInput = {
  id?: string;
  title?: string;
  detail?: string;
  status?: string;
  severity?: GlobalActivitySeverity;
  routes?: readonly GlobalActivityRoute[];
  files?: readonly string[];
  relatedIds?: readonly string[];
  timestampLabel?: string;
  sortKey?: string;
  reviewRequired?: boolean;
  nextActionLabel?: string;
};

export type GlobalActivitySourceSummary = {
  source: GlobalActivitySource;
  eventCount: number;
  blockerCount: number;
  warningCount: number;
  reviewRequiredCount: number;
  summary: string[];
};

export type GlobalActivityFeed = {
  id: "global-activity-feed";
  events: GlobalActivityEvent[];
  eventCount: number;
  sourceCount: number;
  blockerCount: number;
  warningCount: number;
  reviewRequiredCount: number;
  highestPriorityEvent?: GlobalActivityEvent;
  nextSafeAction: string;
  summary: string[];
};

export type GlobalActivityFeedInput = {
  events?: readonly GlobalActivityEventInput[];
  verification?: readonly GlobalActivitySourceSummaryInput[];
  regressionTriage?: readonly GlobalActivitySourceSummaryInput[];
  regressionFixQueue?: readonly GlobalActivitySourceSummaryInput[];
  patchQueue?: readonly GlobalActivitySourceSummaryInput[];
  applyGate?: readonly GlobalActivitySourceSummaryInput[];
  memoryReview?: readonly GlobalActivitySourceSummaryInput[];
  creative?: readonly GlobalActivitySourceSummaryInput[];
  stabilization?: readonly GlobalActivitySourceSummaryInput[];
};

export type GlobalActivityFilterId =
  | "all"
  | "blockers"
  | "warnings"
  | "review required"
  | "verification"
  | "regression"
  | "patch workflow"
  | "apply gates"
  | "memory"
  | "creative"
  | "stabilization"
  | "safety";

export type GlobalActivityFeedFilter = {
  id: GlobalActivityFilterId;
  label: string;
  search: string;
  tokens: string[];
};

export type GlobalActivityTimelineGroupLabel =
  | "Needs attention"
  | "Verification"
  | "Regression workflow"
  | "Patch workflow"
  | "Apply workflow"
  | "Memory and Brain review"
  | "Creative production"
  | "Stabilization"
  | "Navigation and commands";

export type GlobalActivityTimelineGroup = {
  id: string;
  label: GlobalActivityTimelineGroupLabel;
  events: GlobalActivityEvent[];
  summary: string;
};

export type GlobalActivityTimeline = {
  id: "global-activity-timeline";
  groups: GlobalActivityTimelineGroup[];
  summary: string[];
};

export type GlobalActivityNextActionKind =
  | "review blocker"
  | "inspect failed verification"
  | "review regression triage"
  | "review regression fix queue"
  | "prepare Safe Patch Preview"
  | "compose preview diff"
  | "review apply gate"
  | "paste verification output"
  | "review memory candidate"
  | "review stabilization"
  | "commit clean checkpoint"
  | "continue next phase";

export type GlobalActivityNextAction = {
  id: string;
  kind: GlobalActivityNextActionKind;
  label: string;
  detail: string;
  route: GlobalActivityRoute;
  priority: number;
  reviewRequired: boolean;
};

export type GlobalActivityNextActionPlan = {
  id: "global-activity-next-action-plan";
  selected: GlobalActivityNextAction;
  candidates: GlobalActivityNextAction[];
  summary: string[];
};

export type GlobalActivityFeedSummary = {
  id: "global-activity-feed-summary";
  eventCount: number;
  visibleEventCount: number;
  blockerCount: number;
  warningCount: number;
  reviewRequiredCount: number;
  sourceCount: number;
  topSource: string;
  topRisk: string;
  nextSafeAction: string;
  summary: string[];
};

export function buildGlobalActivityStableKey(
  ...parts: Array<string | number | boolean | null | undefined | readonly string[]>
): string {
  return parts
    .flatMap((part) => (Array.isArray(part) ? part : [part]))
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
