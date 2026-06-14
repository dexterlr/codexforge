export type DailyBetaOneRolloutReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneRolloutReview = {
  id: string;
  dailyBetaOneRolloutReviewIdentity: string;
  rolloutReviewGroups: string[];
  readinessReviewChecklist: string[];
  operatorExperienceChecklist: string[];
  safetyRegressionChecklist: string[];
  rollbackReadinessChecklist: string[];
  deniedRolloutReviewActions: string[];
  unresolvedRolloutReviewBlockers: string[];
  dailyBetaOneFeedbackInboxRoute: string;
  dailyBetaHardeningRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneRolloutReviewStatus;
  advancedRolloutReviewDetails: string;
};

export type DailyBetaOneRolloutReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaOneRolloutReviewDoesNotProceedAutomatically: true;
  rolloutDecisionsRequireExplicitOperatorApproval: true;
  unresolvedRolloutReviewBlockersStayBlocked: true;
  rolloutAutoProceedAllowedFromUi: false;
  rolloutDecisionPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
};

export type DailyBetaOneRolloutReviewModel = {
  title: "Daily Beta 1 rollout review";
  summary: string;
  reviews: DailyBetaOneRolloutReview[];
  boundary: DailyBetaOneRolloutReviewBoundary;
  rolloutReviewLanguage: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneRolloutReviewStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
