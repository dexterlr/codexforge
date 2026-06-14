export type DailyBetaOneRegressionReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneRegressionReview = {
  id: string;
  dailyBetaOneRegressionIdentity: string;
  regressionGroups: string[];
  rolloutRegressionChecklist: string[];
  feedbackRegressionChecklist: string[];
  providerLocalConnectorAutomationRegressionChecklist: string[];
  approvalEvidenceResultRecoveryRegressionChecklist: string[];
  deniedRegressionActions: string[];
  unresolvedRegressionBlockers: string[];
  hardeningPassRoute: string;
  documentationRefreshRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneRegressionReviewStatus;
  advancedDailyBetaOneRegressionReviewDetails: string;
};

export type DailyBetaOneRegressionReviewBoundary = {
  reviewOnly: true; approvalRequired: true; actionExecutionAllowedFromUi: false; workflowExecutionAllowedFromUi: false; dailyBetaOneLaunchAllowedFromUi: false; rolloutExecutionAllowedFromUi: false; goLiveAllowedFromUi: false; approvalAutomationAllowedFromUi: false; approvalDecisionPersistenceAllowedFromUi: false; releaseSignoffAutomationAllowedFromUi: false; finalSafetySignoffAutomationAllowedFromUi: false; regressionTestExecutionAllowedFromUi: false; documentationPublishAllowedFromUi: false; releaseNotesPublishAllowedFromUi: false; handoffSendAllowedFromUi: false; feedbackIngestionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; memoryMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type DailyBetaOneRegressionReviewModel = {
  title: "Daily Beta 1 regression review";
  summary: string;
  regressionReviews: DailyBetaOneRegressionReview[];
  boundary: DailyBetaOneRegressionReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneRegressionReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
