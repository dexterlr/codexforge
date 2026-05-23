export type WizardRoute =
  | "/"
  | "/start"
  | "/code-flow"
  | "/code-flow/trial"
  | "/code-flow/trial-review"
  | "/apply-validation"
  | "/workflow-results"
  | "/run-history"
  | "/ai"
  | "/files"
  | "/validation"
  | "/closed-loop"
  | "/creative"
  | "/artifacts/review"
  | "/local-bridge-health"
  | "/health-probe"
  | "/creative-mvp"
  | "/memory"
  | "/readiness"
  | "/consolidation";

export type WizardIntentId =
  | "fix-code"
  | "try-coding-flow"
  | "inspect-file"
  | "run-checks"
  | "review-failure"
  | "plan-creative"
  | "review-artifact"
  | "setup-local-tools"
  | "review-creative-mvp"
  | "manage-memory"
  | "audit-product";

export type WizardFlowId =
  | "code-fix"
  | "coding-trial"
  | "file-inspection"
  | "validation"
  | "failure-review"
  | "creative-plan"
  | "artifact-review"
  | "local-setup"
  | "creative-mvp-review"
  | "memory-review"
  | "product-audit";

export type WizardSafetyBadge =
  | "Review first"
  | "Approval required"
  | "No auto-run"
  | "No file writes"
  | "Preview only"
  | "Simulation only"
  | "Design only";

export type WizardStepStatus = "ready" | "current" | "waiting" | "done" | "blocked" | "optional" | "advanced";
export type WizardFlowStatus = "ready" | "in-progress" | "blocked" | "complete";

export type WizardIntent = {
  id: WizardIntentId;
  label: string;
  description: string;
  outcome: string;
  recommendedFlowId: WizardFlowId;
  primaryRoute: WizardRoute;
  secondaryRoute: WizardRoute;
  iconLabel: string;
  safetyBadge: WizardSafetyBadge;
  nextAction: string;
};

export type WizardStep = {
  id: string;
  order: number;
  title: string;
  instruction: string;
  userActionLabel: string;
  route: WizardRoute;
  routeLabel: string;
  expectedInput: string;
  expectedOutput: string;
  safetyNote: string;
  advancedDetailSummary: string;
  status: WizardStepStatus;
};

export type WizardFlow = {
  id: WizardFlowId;
  title: string;
  description: string;
  steps: WizardStep[];
  primaryAction: string;
  estimatedStepCountLabel: string;
  status: WizardFlowStatus;
  advancedRoutesHidden: WizardRoute[];
  safetySummary: string;
  finalHandoffRoute: WizardRoute;
};

export type WizardState = {
  selectedIntentId: WizardIntentId | null;
  selectedFlowId: WizardFlowId | null;
  currentStepId: string | null;
  completedStepIds: string[];
  blockedStepIds: string[];
  activeRoute: WizardRoute;
  lastUserChoiceLabel: string;
  nextAction: string;
};

export type WizardRouteHandoff = {
  destinationRoute: WizardRoute;
  routeLabel: string;
  whatToDoThere: string;
  whatToBring: string;
  whatToExpect: string;
  safetyNote: string;
  backRoute: "/start";
};

export type WizardNextAction = {
  label: string;
  description: string;
  route: WizardRoute;
  routeLabel: string;
  blocked: boolean;
  advancedActions: string[];
};

export type WizardProgress = {
  totalSteps: number;
  completedSteps: number;
  currentStep: number;
  blockedCount: number;
  optionalCount: number;
  progressLabel: string;
  nextStepLabel: string;
};

export type WizardCopy = {
  startHero: string;
  intentPicker: string;
  stepInstructions: string;
  blockedStates: string;
  emptyStates: string;
  completionStates: string;
  advancedDetails: string;
};

export type WorkflowWizardSummary = {
  selectedIntent: string;
  selectedFlow: string;
  currentStep: string;
  stepCount: number;
  blockerCount: number;
  primaryAction: string;
  nextSafeAction: string;
  advancedDetailsCount: number;
};
