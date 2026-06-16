export type DailyBetaOneFinalRegressionReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneFinalRegressionReview = {
  id: string;
  finalRegressionReviewIdentity: string;
  regressionGroups: string[];
  activationRegressionChecklist: string[];
  operatorReadinessRegressionChecklist: string[];
  providerLocalConnectorAutomationRegressionChecklist: string[];
  fileTestRegressionChecklist: string[];
  deniedRegressionActions: string[];
  unresolvedFinalRegressionBlockers: string[];
  finalRecoveryReviewRoute: string;
  finalHardeningRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneFinalRegressionReviewStatus;
  advancedDailyBetaOneFinalRegressionReviewDetails: string;
};

export type DailyBetaOneFinalRegressionReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  regressionTestExecutionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fixApplicationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneFinalRegressionReviewModel = {
  title: "Daily Beta 1 final regression review";
  summary: string;
  finalRegressionReviews: DailyBetaOneFinalRegressionReview[];
  boundary: DailyBetaOneFinalRegressionReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneFinalRegressionReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
