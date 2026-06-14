export type DailyBetaOneFeedbackTriageReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneFeedbackTriageReview = {
  id: string;
  dailyBetaOneFeedbackTriageIdentity: string;
  triageGroups: string[];
  usabilityFeedbackQueue: string[];
  safetyFeedbackQueue: string[];
  rolloutFeedbackQueue: string[];
  releaseFeedbackQueue: string[];
  severityPriorityChecklist: string[];
  deniedTriageActions: string[];
  unresolvedTriageBlockers: string[];
  regressionReviewRoute: string;
  hardeningPassRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneFeedbackTriageReviewStatus;
  advancedDailyBetaOneFeedbackTriageReviewDetails: string;
};

export type DailyBetaOneFeedbackTriageReviewBoundary = {
  reviewOnly: true; approvalRequired: true; actionExecutionAllowedFromUi: false; workflowExecutionAllowedFromUi: false; dailyBetaOneLaunchAllowedFromUi: false; rolloutExecutionAllowedFromUi: false; goLiveAllowedFromUi: false; approvalAutomationAllowedFromUi: false; approvalDecisionPersistenceAllowedFromUi: false; releaseSignoffAutomationAllowedFromUi: false; finalSafetySignoffAutomationAllowedFromUi: false; regressionTestExecutionAllowedFromUi: false; documentationPublishAllowedFromUi: false; releaseNotesPublishAllowedFromUi: false; handoffSendAllowedFromUi: false; feedbackIngestionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; memoryMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type DailyBetaOneFeedbackTriageReviewModel = {
  title: "Daily Beta 1 feedback triage review";
  summary: string;
  triageReviews: DailyBetaOneFeedbackTriageReview[];
  boundary: DailyBetaOneFeedbackTriageReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneFeedbackTriageReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
