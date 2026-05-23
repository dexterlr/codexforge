export type ProductSimplificationRoute =
  | "/"
  | "/start"
  | "/code-flow"
  | "/code-flow/trial"
  | "/apply-validation"
  | "/workflow-results"
  | "/run-history"
  | "/ai"
  | "/files"
  | "/validation"
  | "/closed-loop"
  | "/creative"
  | "/creative-mvp"
  | "/creative-executor"
  | "/creative-sandbox"
  | "/local-bridge-health"
  | "/health-probe"
  | "/creative-readiness"
  | "/artifacts/review"
  | "/blender"
  | "/comfyui"
  | "/unreal"
  | "/video-render"
  | "/memory"
  | "/readiness";

export type ProductSimplificationSafetyBadge =
  | "Review first"
  | "Approval required"
  | "No auto-run"
  | "No file writes"
  | "Preview only"
  | "Simulation only"
  | "Design only";

export type UserIntentId =
  | "fix-code"
  | "try-coding-flow"
  | "inspect-project"
  | "run-validation"
  | "review-failure"
  | "create-artifact"
  | "review-artifact"
  | "setup-local-tools"
  | "plan-creative-execution"
  | "manage-memory"
  | "audit-readiness";

export type DisclosureLevel = "simple" | "standard" | "advanced" | "debug";

export type UserIntentOption = {
  id: UserIntentId;
  label: string;
  description: string;
  primaryRoute: ProductSimplificationRoute;
  recommendedRoute: ProductSimplificationRoute;
  secondaryRoutes: ProductSimplificationRoute[];
  userOutcome: string;
  hiddenAdvancedRoutes: ProductSimplificationRoute[];
  safetyPosture: ProductSimplificationSafetyBadge[];
  nextActionLabel: string;
};

export type GuidedWorkflowStep = {
  id: string;
  label: string;
  route: ProductSimplificationRoute;
  description: string;
  safety: ProductSimplificationSafetyBadge[];
};

export type GuidedWorkflow = {
  id: string;
  title: string;
  description: string;
  currentStep: string;
  steps: GuidedWorkflowStep[];
  primaryAction: string;
  secondaryAction: string;
  advancedDetailsSummary: string;
  safetySummary: string;
  routeTargets: ProductSimplificationRoute[];
};

export type SimplifiedPageCopy = {
  route: ProductSimplificationRoute;
  title: string;
  subtitle: string;
  primaryActionLabel: string;
  emptyStateTitle: string;
  emptyStateBody: string;
  safetyBadgeText: ProductSimplificationSafetyBadge;
  advancedDetailsLabel: string;
  nextStepLabel: string;
};

export type PrimaryAction = {
  route: ProductSimplificationRoute;
  label: string;
  description: string;
  kind: "focus" | "scroll" | "open" | "copy" | "prepare";
  safeOnly: true;
};

export type DisclosureSection = {
  id: string;
  title: string;
  summary: string;
  level: DisclosureLevel;
  defaultOpen: boolean;
  items: string[];
};

export type ProgressiveDisclosure = {
  route: ProductSimplificationRoute;
  level: DisclosureLevel;
  essentials: string[];
  sections: DisclosureSection[];
  nextAction: string;
  safetyBadges: ProductSimplificationSafetyBadge[];
};

export type FriendlyEmptyState = {
  route: ProductSimplificationRoute;
  title: string;
  body: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  routeSuggestion: ProductSimplificationRoute;
  safetyNote: string;
};

export type WorkflowShortcut = {
  id: string;
  label: string;
  description: string;
  href: ProductSimplificationRoute;
  primaryActionLabel: string;
  safetyBadges: ProductSimplificationSafetyBadge[];
};

export type ProductSimplificationSummary = {
  id: "product-simplification-summary";
  intentOptions: UserIntentOption[];
  workflows: GuidedWorkflow[];
  pageCopy: SimplifiedPageCopy[];
  primaryActions: PrimaryAction[];
  emptyStates: FriendlyEmptyState[];
  shortcuts: WorkflowShortcut[];
  safetyBadges: ProductSimplificationSafetyBadge[];
  recommendedNextAction: string;
  architectureSummary: string[];
};
