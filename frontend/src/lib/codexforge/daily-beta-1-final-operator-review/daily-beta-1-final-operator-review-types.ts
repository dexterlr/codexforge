export type DailyBetaOneFinalOperatorReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneFinalOperatorReview = {
  id: string;
  finalOperatorReviewIdentity: string;
  operatorReviewGroups: string[];
  operatorChecklist: string[];
  supportRollbackChecklist: string[];
  approvalBoundaryChecklist: string[];
  handoffChecklist: string[];
  deniedOperatorReviewActions: string[];
  unresolvedOperatorReviewBlockers: string[];
  finalRegressionReviewRoute: string;
  finalRecoveryReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneFinalOperatorReviewStatus;
  advancedDailyBetaOneFinalOperatorReviewDetails: string;
};

export type DailyBetaOneFinalOperatorReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  finalOperatorSignoffAutomationAllowedFromUi: false;
  dailyBetaOneActivationAllowedFromUi: false;
  handoffSendAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneFinalOperatorReviewModel = {
  title: "Daily Beta 1 final operator review";
  summary: string;
  finalOperatorReviews: DailyBetaOneFinalOperatorReview[];
  boundary: DailyBetaOneFinalOperatorReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneFinalOperatorReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
