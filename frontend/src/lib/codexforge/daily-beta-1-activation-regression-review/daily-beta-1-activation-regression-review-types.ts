export type DailyBetaOneActivationRegressionReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneActivationRegressionReview = {
  id: string;
  dailyBetaOneActivationRegressionIdentity: string;
  regressionGroups: string[];
  activationRegressionChecklist: string[];
  controlledTrialRegressionChecklist: string[];
  providerLocalConnectorAutomationRegressionChecklist: string[];
  feedbackRegressionChecklist: string[];
  deniedRegressionActions: string[];
  unresolvedRegressionBlockers: string[];
  recoveryReviewRoute: string;
  hardeningPassRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneActivationRegressionReviewStatus;
  advancedDailyBetaOneActivationRegressionReviewDetails: string;
};

export type DailyBetaOneActivationRegressionReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  regressionTestExecutionAllowedFromUi: false;
  fixApplicationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneActivationRegressionReviewModel = {
  title: "Daily Beta 1 activation regression review";
  summary: string;
  regressionReviews: DailyBetaOneActivationRegressionReview[];
  boundary: DailyBetaOneActivationRegressionReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneActivationRegressionReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
