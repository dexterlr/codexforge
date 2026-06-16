export type DailyBetaOneActivationFeedbackReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneActivationFeedbackReview = {
  id: string;
  dailyBetaOneActivationFeedbackIdentity: string;
  feedbackGroups: string[];
  usabilityFeedbackLane: string[];
  safetyFeedbackLane: string[];
  activationFeedbackLane: string[];
  releaseFeedbackLane: string[];
  deniedFeedbackActions: string[];
  unresolvedFeedbackBlockers: string[];
  regressionReviewRoute: string;
  hardeningPassRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneActivationFeedbackReviewStatus;
  advancedDailyBetaOneActivationFeedbackReviewDetails: string;
};

export type DailyBetaOneActivationFeedbackReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  feedbackIngestionAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneActivationFeedbackReviewModel = {
  title: "Daily Beta 1 activation feedback review";
  summary: string;
  feedbackReviews: DailyBetaOneActivationFeedbackReview[];
  boundary: DailyBetaOneActivationFeedbackReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneActivationFeedbackReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
