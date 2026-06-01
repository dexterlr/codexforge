export type AssistedCodingGoalId =
  | "small-ui-issue"
  | "wording"
  | "review-patch"
  | "capture-validation"
  | "recover-validation"
  | "prepare-demo"
  | "understand-safe";

export type AssistedCodingNeed =
  | "none"
  | "file"
  | "patch-preview"
  | "apply-review"
  | "evidence"
  | "validation-result"
  | "failure-recovery"
  | "run-history"
  | "demo"
  | "review-inbox";

export type AssistedCodingGoal = {
  id: AssistedCodingGoalId;
  title: string;
  need: AssistedCodingNeed;
  plainEnglish: string;
};

export type AssistedCodingStep = {
  id: string;
  title: string;
  route: string;
  safeBecause: string;
  stillManual: string;
};

export type AssistedCodingNextAction = {
  label: string;
  href: string;
  reason: string;
  safeBecause: string;
  stillManual: string;
};

export type AssistedCodingSafetyState = {
  status: "safe-guide" | "review-required";
  promises: string[];
};

export type AssistedCodingRouteRecommendation = {
  href: string;
  label: string;
  reason: string;
};

export type AssistedCodingReviewState = {
  needsReview: boolean;
  label: string;
  route: string;
};

export type AssistedCodingHandoff = {
  title: string;
  copyText: string;
};

export type AssistedCodingModeSummary = {
  title: string;
  subtitle: string;
  primaryAction: string;
  goals: AssistedCodingGoal[];
  steps: AssistedCodingStep[];
  nextAction: AssistedCodingNextAction;
  safety: AssistedCodingSafetyState;
  routeRecommendation: AssistedCodingRouteRecommendation;
  reviewState: AssistedCodingReviewState;
  handoff: AssistedCodingHandoff;
};
