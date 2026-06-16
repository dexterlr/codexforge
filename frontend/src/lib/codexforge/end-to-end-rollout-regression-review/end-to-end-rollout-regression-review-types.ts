export type EndToEndRolloutRegressionReviewStatus = "ready-for-review" | "blocked";

export type EndToEndRolloutRegressionReview = {
  id: string;
  rolloutRegressionReviewIdentity: string;
  regressionGroups: string[];
  workflowRegressionChecklist: string[];
  providerLocalConnectorAutomationRegressionChecklist: string[];
  fileTestRegressionChecklist: string[];
  feedbackRegressionChecklist: string[];
  deniedRegressionActions: string[];
  unresolvedRegressionBlockers: string[];
  rolloutHardeningRoute: string;
  finalLiveBoundarySignoffRoute: string;
  nextRecommendedAction: string;
  status: EndToEndRolloutRegressionReviewStatus;
  advancedRolloutRegressionReviewDetails: string;
};

export type EndToEndRolloutRegressionReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  regressionTestExecutionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  rolloutExecutionAllowedFromUi: false;
  hardeningApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type EndToEndRolloutRegressionReviewModel = {
  title: "End-to-end rollout regression review";
  summary: string;
  reviews: EndToEndRolloutRegressionReview[];
  boundary: EndToEndRolloutRegressionReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildEndToEndRolloutRegressionReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
