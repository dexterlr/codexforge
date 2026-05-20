export type ProductReadinessLevel = "excellent" | "good" | "needs-work" | "blocked" | "unknown";
export type ProductReadinessRisk = "low" | "medium" | "high" | "blocked" | "unknown";
export type ProductSmokeStatus = "covered" | "partial" | "duplicate-risk" | "missing" | "unknown";
export type FunctionalWorkflowStatus = "functional" | "preview-only" | "scaffolded" | "blocked" | "missing" | "unknown";

export type ProductRoutePath =
  | "/"
  | "/ai"
  | "/brain"
  | "/files"
  | "/tasks"
  | "/memory"
  | "/memory-inbox"
  | "/creative"
  | "/video-render"
  | "/blender"
  | "/unreal"
  | "/comfyui"
  | "/creative-bridge"
  | "/capabilities"
  | "/activity"
  | "/readiness"
  | "/consolidation"
  | "/validation"
  | "/stabilization"
  | "/handoff"
  | "/brain-continuity"
  | "/brain-snapshots"
  | "/snapshot-restore"
  | "/runtime-replay"
  | "/runtime-journal"
  | "/brain-governance"
  | "/history";

export type ProductReadinessRouteAvailability = Partial<Record<ProductRoutePath, boolean>>;

export type ProductRouteReadinessItem = {
  id: string;
  route: ProductRoutePath;
  label: string;
  surfaceGroup: string;
  readiness: ProductReadinessLevel;
  smokeCovered: boolean;
  shellNavigationCovered: boolean;
  commandPaletteCovered: boolean;
  safetyCopyPresent: boolean;
  mutationRisk: ProductReadinessRisk;
  uxRisk: ProductReadinessRisk;
  consolidationCandidate: boolean;
  recommendedAction: string;
};

export type ProductRouteReadinessAudit = {
  id: string;
  items: ProductRouteReadinessItem[];
  readyCount: number;
  smokeCoveredCount: number;
  consolidationCandidateCount: number;
  summary: string[];
};

export type ProductSmokeCoverageItem = {
  id: string;
  label: string;
  script: string;
  status: ProductSmokeStatus;
  smokeScriptExists: boolean;
  managedSuiteInclusion: boolean;
  duplicateSuiteEntryRisk: boolean;
  targetedValidationCommand: string;
  upstreamSmokeDependency: string;
  safetyAssertionsPresent: boolean;
  mojibakeAssertionsPresent: boolean;
  forbiddenDependencyAssertionsPresent: boolean;
  missingSmokeGap: string;
};

export type ProductSmokeCoverageAudit = {
  id: string;
  items: ProductSmokeCoverageItem[];
  coveredCount: number;
  missingCount: number;
  duplicateRiskCount: number;
  summary: string[];
};

export type ProductSafetyPostureItem = {
  id: string;
  label: string;
  passed: boolean;
  severity: ProductReadinessRisk;
  evidence: string;
  recommendedAction: string;
};

export type ProductSafetyPostureAudit = {
  id: string;
  items: ProductSafetyPostureItem[];
  blockerCount: number;
  passedCount: number;
  summary: string[];
};

export type ProductUxConsistencyItem = {
  id: string;
  label: string;
  passed: boolean;
  risk: ProductReadinessRisk;
  evidence: string;
  recommendedAction: string;
};

export type ProductUxConsistencyAudit = {
  id: string;
  items: ProductUxConsistencyItem[];
  riskCount: number;
  passedCount: number;
  summary: string[];
};

export type ProductModuleConsolidationItem = {
  id: string;
  label: string;
  risk: ProductReadinessRisk;
  suppliedModuleLabels: string[];
  consolidationGroup: string;
  evidence: string;
  recommendedAction: string;
};

export type ProductModuleConsolidationAudit = {
  id: string;
  items: ProductModuleConsolidationItem[];
  candidateCount: number;
  summary: string[];
};

export type ProductFunctionalWorkflowItem = {
  id: string;
  label: string;
  status: FunctionalWorkflowStatus;
  missingPieces: string[];
  safetyBlockers: string[];
  nextFunctionalPhase: string;
  routeEntryPoints: ProductRoutePath[];
  validationNeeded: string[];
};

export type ProductFunctionalWorkflowAudit = {
  id: string;
  items: ProductFunctionalWorkflowItem[];
  functionalCount: number;
  blockedCount: number;
  summary: string[];
};

export type ProductReadinessScore = {
  id: string;
  category: string;
  score: ProductReadinessLevel;
  detail: string;
  recommendedAction: string;
};

export type ProductReadinessScorecard = {
  id: string;
  scores: ProductReadinessScore[];
  overallReadiness: ProductReadinessLevel;
  summary: string[];
};

export type ProductReadinessNextAction = {
  id: string;
  label: string;
  reason: string;
  priority: number;
  route?: ProductRoutePath;
  copyPrompt: string;
};

export type ProductReadinessNextActionPlan = {
  id: string;
  selected: ProductReadinessNextAction;
  candidates: ProductReadinessNextAction[];
  summary: string[];
};

export type ProductReadinessSummary = {
  id: string;
  overallReadiness: ProductReadinessLevel;
  routeCount: number;
  smokeCoverageCount: number;
  safetyBlockerCount: number;
  uxRiskCount: number;
  duplicateConsolidationCount: number;
  functionalWorkflowCount: number;
  topRisk: string;
  recommendedNextPhase: string;
  routeAudit: ProductRouteReadinessAudit;
  smokeAudit: ProductSmokeCoverageAudit;
  safetyAudit: ProductSafetyPostureAudit;
  uxAudit: ProductUxConsistencyAudit;
  moduleAudit: ProductModuleConsolidationAudit;
  workflowAudit: ProductFunctionalWorkflowAudit;
  scorecard: ProductReadinessScorecard;
  nextActions: ProductReadinessNextActionPlan;
  summary: string[];
};

export function buildProductReadinessStableKey(...parts: readonly string[]): string {
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
