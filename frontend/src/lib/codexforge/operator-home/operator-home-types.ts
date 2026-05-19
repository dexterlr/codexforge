export type OperatorHomeHealthLevel =
  | "ready"
  | "needs-review"
  | "warning"
  | "blocked"
  | "unknown";

export type OperatorHomeRiskPosture =
  | "readonly"
  | "preview-only"
  | "approval-required"
  | "operator-safe"
  | "blocked";

export type OperatorHomeRoutePath =
  | "/"
  | "/ai"
  | "/brain"
  | "/files"
  | "/tasks"
  | "/memory"
  | "/creative"
  | "/capabilities"
  | "/activity"
  | "/handoff"
  | "/stabilization"
  | "/history";

export type OperatorHomeRouteDomain =
  | "operator-home"
  | "cognition"
  | "engineering"
  | "tasks"
  | "memory"
  | "creative"
  | "capabilities"
  | "activity"
  | "handoff"
  | "stabilization"
  | "history";

export type OperatorHomeRouteAvailability = Partial<
  Record<OperatorHomeRoutePath, boolean>
>;

export type OperatorHomeRouteItem = {
  id: string;
  href: OperatorHomeRoutePath;
  label: string;
  description: string;
  domain: OperatorHomeRouteDomain;
  readiness: OperatorHomeHealthLevel;
  riskPosture: OperatorHomeRiskPosture;
  nextAction: string;
  badge: string;
  requiredReview: boolean;
};

export type OperatorHomeRouteRegistry = {
  id: "operator-home-route-registry";
  routes: OperatorHomeRouteItem[];
  summary: string[];
};

export type OperatorHomeCapability = {
  id: string;
  title: string;
  detail: string;
  posture: OperatorHomeRiskPosture;
  tags: string[];
};

export type OperatorHomeSurface = {
  id: "operator-home-surface";
  identity: string;
  title: string;
  subtitle: string;
  posture: string;
  capabilities: OperatorHomeCapability[];
  principles: string[];
  nextAction: string;
  summary: string[];
};

export type OperatorHomeHealthDimensionId =
  | "brain-runtime"
  | "ai-workspace"
  | "files-workflow"
  | "tasks-workflow"
  | "memory-workflow"
  | "creative-studio"
  | "capabilities"
  | "stabilization"
  | "patch-apply-safety"
  | "verification-readiness"
  | "latest-message-authority"
  | "local-first-safety";

export type OperatorHomeHealthDimension = {
  id: OperatorHomeHealthDimensionId;
  label: string;
  level: OperatorHomeHealthLevel;
  detail: string;
  nextAction: string;
  route: OperatorHomeRoutePath;
};

export type OperatorHomeHealthReport = {
  id: "operator-home-health";
  overallLevel: OperatorHomeHealthLevel;
  dimensions: OperatorHomeHealthDimension[];
  readyCount: number;
  warningCount: number;
  blockedCount: number;
  summary: string[];
};

export type OperatorHomeNextActionKind =
  | "review stabilization blockers"
  | "review regression fix queue"
  | "ingest verification output"
  | "review file workflow"
  | "review brain or memory"
  | "continue creative workflow"
  | "continue next phase"
  | "commit clean checkpoint";

export type OperatorHomeNextAction = {
  id: string;
  kind: OperatorHomeNextActionKind;
  title: string;
  detail: string;
  href: OperatorHomeRoutePath;
  priority: "primary" | "secondary";
  reviewRequired: boolean;
  prompt: string;
};

export type OperatorHomeNextActionPlan = {
  id: "operator-home-next-action-plan";
  selected: OperatorHomeNextAction;
  orderedActions: OperatorHomeNextAction[];
  blockers: string[];
  warnings: string[];
  validationCommands: string[];
  summary: string[];
};

export type OperatorHomeLaunchCard = {
  id: string;
  href: OperatorHomeRoutePath;
  label: string;
  description: string;
  badge: string;
  readiness: OperatorHomeHealthLevel;
  riskPosture: OperatorHomeRiskPosture;
};

export type OperatorHomeLauncherGroupId =
  | "core-cognition"
  | "engineering-workflow"
  | "stabilization-and-safety"
  | "activity-and-handoff"
  | "creative-production"
  | "memory-and-evidence"
  | "operator-history";

export type OperatorHomeLauncherGroup = {
  id: OperatorHomeLauncherGroupId;
  label: string;
  description: string;
  cards: OperatorHomeLaunchCard[];
};

export type OperatorHomeLauncher = {
  id: "operator-home-launcher";
  groups: OperatorHomeLauncherGroup[];
  summary: string[];
};

export type OperatorHomeSessionSummary = {
  id: "operator-home-session-summary";
  routeCount: number;
  readyCount: number;
  warningCount: number;
  blockedCount: number;
  primaryNextAction: string;
  safetyPosture: string;
  validationRecommendation: string;
  summary: string[];
};

export type OperatorHomeSummary = {
  id: "operator-home-summary";
  surface: OperatorHomeSurface;
  routes: OperatorHomeRouteRegistry;
  health: OperatorHomeHealthReport;
  nextActionPlan: OperatorHomeNextActionPlan;
  launcher: OperatorHomeLauncher;
  sessionSummary: OperatorHomeSessionSummary;
};

export type OperatorHomeStatusInput = {
  routeAvailability?: OperatorHomeRouteAvailability | null;
  stabilizationHasBlockers?: boolean | null;
  regressionFixQueueReadyCount?: number | null;
  verificationOutputNeedsIngestion?: boolean | null;
  fileWorkflowNeedsAttention?: boolean | null;
  brainReviewNeeded?: boolean | null;
  memoryReviewNeeded?: boolean | null;
  creativeWorkflowActive?: boolean | null;
  latestMessageAuthorityPreserved?: boolean | null;
  validationCommands?: readonly string[] | null;
};

export const OPERATOR_HOME_VALIDATION_COMMANDS: readonly string[] = [
  "npm run build",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-operator-home-dashboard.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-stabilization-command-center.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-mission-control.ps1",
  "npm run smoke:codexforge:server",
  "git diff --check",
];

export function buildOperatorHomeStableKey(
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

export function normalizeOperatorHomeValidationCommands(
  commands?: readonly string[] | null
): string[] {
  return Array.from(
    new Set([...(commands ?? []), ...OPERATOR_HOME_VALIDATION_COMMANDS])
  ).filter(Boolean);
}
