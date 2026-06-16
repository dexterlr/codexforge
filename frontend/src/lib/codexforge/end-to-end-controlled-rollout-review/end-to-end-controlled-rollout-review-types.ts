export type EndToEndControlledRolloutReviewStatus = "ready-for-review" | "blocked";

export type EndToEndControlledRolloutReview = {
  id: string;
  controlledRolloutReviewIdentity: string;
  rolloutReviewGroups: string[];
  readinessReviewChecklist: string[];
  operatorExperienceChecklist: string[];
  safetyRegressionChecklist: string[];
  rollbackReadinessChecklist: string[];
  deniedRolloutReviewActions: string[];
  unresolvedRolloutReviewBlockers: string[];
  rolloutFeedbackInboxRoute: string;
  rolloutRegressionReviewRoute: string;
  nextRecommendedAction: string;
  status: EndToEndControlledRolloutReviewStatus;
  advancedControlledRolloutReviewDetails: string;
};

export type EndToEndControlledRolloutReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  rolloutProceedAutomationAllowedFromUi: false;
  rolloutDecisionPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  rolloutExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type EndToEndControlledRolloutReviewModel = {
  title: "End-to-end controlled rollout review";
  summary: string;
  reviews: EndToEndControlledRolloutReview[];
  boundary: EndToEndControlledRolloutReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildEndToEndControlledRolloutReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
