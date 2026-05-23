export type CodingFlowUxRoute =
  | "/start"
  | "/code-flow"
  | "/code-flow/trial"
  | "/code-flow/trial-review"
  | "/code-flow/ux-fixes"
  | "/files"
  | "/apply-validation"
  | "/validation"
  | "/workflow-results"
  | "/run-history"
  | "/closed-loop";

export type CodingFlowFrictionType =
  | "too-many-panels"
  | "unclear-primary-action"
  | "technical-wording"
  | "missing-next-step"
  | "duplicate-handoff"
  | "cramped-layout"
  | "validation-unclear"
  | "apply-blocked-unclear"
  | "result-capture-unclear"
  | "route-handoff-confusing"
  | "safety-warning-noisy"
  | "unknown";

export type CodingFlowUxSeverity = "low" | "medium" | "high" | "blocker" | "unknown";
export type CodingFlowUxPriority = "now" | "soon" | "later" | "ignore";
export type CodingFlowPanelPriorityLevel = "essential" | "recommended" | "advanced" | "debug" | "hidden";
export type CodingFlowResultGuidanceOutcomeId =
  | "validation-passed"
  | "validation-failed"
  | "apply-blocked"
  | "preview-missing"
  | "output-missing"
  | "result-needs-review"
  | "ready-to-commit"
  | "needs-closed-loop"
  | "unknown";

export type CodingFlowFriction = {
  frictionId: string;
  type: CodingFlowFrictionType;
  label: string;
  affectedRoute: CodingFlowUxRoute;
  userFacingSymptom: string;
  likelyCause: string;
  severity: CodingFlowUxSeverity;
  suggestedFix: string;
  fixRoute: CodingFlowUxRoute;
  priority: CodingFlowUxPriority;
};

export type CodingFlowCopyFix = {
  fixId: string;
  route: CodingFlowUxRoute;
  surface: string;
  beforeLabel: string;
  afterLabel: string;
  rule: string;
  nextCopy: string;
};

export type CodingFlowPrimaryActionFix = {
  actionId: string;
  route: CodingFlowUxRoute;
  label: string;
  reason: string;
  secondaryGroupLabel: string;
  noAutoApply: true;
  noAutoRun: true;
};

export type CodingFlowPanelPriorityItem = {
  itemId: string;
  route: CodingFlowUxRoute;
  panel: string;
  priority: CodingFlowPanelPriorityLevel;
  guidance: string;
};

export type CodingFlowPanelPriority = {
  priorityId: string;
  route: CodingFlowUxRoute;
  items: CodingFlowPanelPriorityItem[];
};

export type CodingFlowEmptyStateFix = {
  emptyStateId: string;
  state: string;
  route: CodingFlowUxRoute;
  missing: string;
  whyItMatters: string;
  nextAction: string;
  whereToGo: CodingFlowUxRoute;
  safetyNote: string;
};

export type CodingFlowValidationCopyFix = {
  copyId: string;
  title: string;
  guidance: string[];
  checks: { id: string; label: string; meaning: string; commandCopy: string }[];
  status: "simple-copy-ready";
};

export type CodingFlowResultGuidanceFix = {
  outcomeId: CodingFlowResultGuidanceOutcomeId;
  title: string;
  meaning: string;
  nextAction: string;
  route: CodingFlowUxRoute;
  copyableGuidance: string;
  safetyNote: string;
};

export type CodingFlowRouteHandoffFixItem = {
  handoffId: string;
  sourceRoute: CodingFlowUxRoute;
  destinationRoute: CodingFlowUxRoute;
  label: string;
  whatToDoThere: string;
  whatToBring: string;
  expectedOutcome: string;
  backRoute: CodingFlowUxRoute;
  avoidDuplicateLinks: true;
};

export type CodingFlowUxFixSummary = {
  summaryId: string;
  frictionCount: number;
  copyFixCount: number;
  primaryActionFixes: number;
  essentialPanelCount: number;
  emptyStateFixCount: number;
  validationCopyStatus: string;
  routeHandoffStatus: string;
  nextUxAction: string;
};

export function buildCodingFlowUxFixStableKey(prefix: string, value: string): string {
  return `${prefix}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item"}`;
}
