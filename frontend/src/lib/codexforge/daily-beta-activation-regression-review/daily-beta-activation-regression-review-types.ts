export type DailyBetaActivationRegressionReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationRegressionReview = {
  id: string;
  activationRegressionReviewIdentity: string;
  regressionGroups: string[];
  activationRegressionChecklist: string[];
  controlledTrialRegressionChecklist: string[];
  providerLocalConnectorAutomationRegressionChecklist: string[];
  feedbackRegressionChecklist: string[];
  deniedRegressionActions: string[];
  unresolvedRegressionBlockers: string[];
  finalHardeningRoute: string;
  activationCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationRegressionReviewStatus;
  advancedDailyBetaActivationRegressionReviewDetails: string;
};

export type DailyBetaActivationRegressionReviewBoundary = {
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

export type DailyBetaActivationRegressionReviewModel = {
  title: "Daily Beta activation regression review";
  summary: string;
  regressionReviews: DailyBetaActivationRegressionReview[];
  boundary: DailyBetaActivationRegressionReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationRegressionReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
