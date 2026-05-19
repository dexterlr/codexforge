export type ConsolidationReadinessLevel =
  | "ready"
  | "needs-review"
  | "warning"
  | "blocked"
  | "unknown";

export type CodexForgeSurfaceGroup =
  | "Command Deck"
  | "Brain Continuity"
  | "Memory"
  | "Engineering Workflow"
  | "Creative"
  | "History/Audit";

export type CodexForgeSurfaceRole = "primary" | "secondary";

export type CodexForgeSurfaceItem = {
  id: string;
  route: string;
  label: string;
  group: CodexForgeSurfaceGroup;
  role: CodexForgeSurfaceRole;
  keepVisible: boolean;
  consolidationTarget?: string;
  readiness: ConsolidationReadinessLevel;
  safetyPosture: string;
  recommendedOperatorUse: string;
};

export type CodexForgeSurfaceMap = {
  id: "codexforge-surface-map";
  items: CodexForgeSurfaceItem[];
  groupCount: number;
  primaryCount: number;
  secondaryCount: number;
  summary: string[];
};

export type RouteConsolidationClass =
  | "primary route"
  | "secondary audit route"
  | "deep governance route"
  | "workflow route"
  | "legacy/compat route"
  | "candidate for link-only access";

export type RouteConsolidationItem = {
  id: string;
  route: string;
  label: string;
  classification: RouteConsolidationClass;
  prominence: "primary" | "secondary" | "advanced/audit" | "link-only";
  keepRoute: boolean;
  targetSurface: string;
  rationale: string;
};

export type RouteConsolidationPlan = {
  id: "route-consolidation-plan";
  items: RouteConsolidationItem[];
  primaryRouteCount: number;
  secondaryRouteCount: number;
  deepRouteCount: number;
  linkOnlyCandidateCount: number;
  summary: string[];
};

export type CockpitConsolidationItem = {
  id: string;
  pattern: string;
  surfaces: string[];
  overlapRisk: "low" | "medium" | "high";
  recommendation: string;
  sharedModel: string;
};

export type CockpitConsolidationAudit = {
  id: "cockpit-consolidation-audit";
  items: CockpitConsolidationItem[];
  highOverlapCount: number;
  summary: string[];
};

export type SharedReadinessItem = {
  id: string;
  label: string;
  sourceRoute: string;
  readinessLevel: ConsolidationReadinessLevel;
  blockerCount: number;
  warningCount: number;
  nextAction: string;
  validationCommand: string;
  reviewRequired: boolean;
  routeHref: string;
};

export type SharedReadinessModel = {
  id: "shared-readiness-model";
  items: SharedReadinessItem[];
  readyCount: number;
  reviewCount: number;
  blockerCount: number;
  summary: string[];
};

export type SharedNextAction = {
  id: string;
  label: string;
  reason: string;
  priority: number;
  routeHref: string;
  copyPrompt: string;
};

export type SharedNextActionModel = {
  id: "shared-next-action-model";
  selected: SharedNextAction;
  candidates: SharedNextAction[];
  summary: string[];
};

export type SharedSafetyCopyItem = {
  id: string;
  label: string;
  copy: string;
  posture: "enforced" | "review-required" | "operator-visible";
};

export type SharedSafetyCopy = {
  id: "shared-safety-copy";
  items: SharedSafetyCopyItem[];
  summary: string[];
};

export type WorkflowEntrypoint = {
  id: string;
  label: string;
  route: string;
  readiness: ConsolidationReadinessLevel;
  missingPieces: string[];
  safetyBoundary: string;
  nextImplementationPhase: string;
  recommendedValidation: string;
};

export type WorkflowEntrypoints = {
  id: "workflow-entrypoints";
  items: WorkflowEntrypoint[];
  readyCount: number;
  summary: string[];
};

export type ConsolidationPlanItem = {
  id: string;
  title: string;
  detail: string;
  priority: number;
  routeHref: string;
  status: "planned" | "in-progress" | "ready";
};

export type ConsolidationPlan = {
  id: "consolidation-plan";
  items: ConsolidationPlanItem[];
  topRecommendation: string;
  summary: string[];
};

export type ConsolidationSummary = {
  id: "consolidation-summary";
  surfaceMap: CodexForgeSurfaceMap;
  routePlan: RouteConsolidationPlan;
  cockpitAudit: CockpitConsolidationAudit;
  readinessModel: SharedReadinessModel;
  nextActionModel: SharedNextActionModel;
  safetyCopy: SharedSafetyCopy;
  workflowEntrypoints: WorkflowEntrypoints;
  consolidationPlan: ConsolidationPlan;
  primaryRouteCount: number;
  secondaryRouteCount: number;
  deepRouteCount: number;
  consolidationCandidateCount: number;
  workflowEntrypointCount: number;
  topRecommendation: string;
  recommendedNextPhase: string;
  summary: string[];
};

export function buildConsolidationStableKey(
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
