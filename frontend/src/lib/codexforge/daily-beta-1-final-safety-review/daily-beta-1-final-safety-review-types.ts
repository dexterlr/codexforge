export type DailyBetaOneFinalSafetyReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneFinalSafetyReview = {
  id: string;
  dailyBetaOneFinalSafetyIdentity: string;
  safetyGroups: string[];
  approvalBoundaryChecklist: string[];
  dataPrivacyChecklist: string[];
  liveCapabilityChecklist: string[];
  rollbackRecoveryChecklist: string[];
  deniedSafetyShortcuts: string[];
  unresolvedSafetyBlockers: string[];
  dailyBetaOneReleaseCandidateRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneFinalSafetyReviewStatus;
  advancedDailyBetaOneFinalSafetyReviewDetails: string;
};

export type DailyBetaOneFinalSafetyReviewBoundary = {
  reviewOnly: true; approvalRequired: true; actionExecutionAllowedFromUi: false; workflowExecutionAllowedFromUi: false; dailyBetaOneLaunchAllowedFromUi: false; rolloutExecutionAllowedFromUi: false; goLiveAllowedFromUi: false; approvalAutomationAllowedFromUi: false; approvalDecisionPersistenceAllowedFromUi: false; releaseSignoffAutomationAllowedFromUi: false; finalSafetySignoffAutomationAllowedFromUi: false; regressionTestExecutionAllowedFromUi: false; documentationPublishAllowedFromUi: false; releaseNotesPublishAllowedFromUi: false; handoffSendAllowedFromUi: false; feedbackIngestionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; memoryMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type DailyBetaOneFinalSafetyReviewModel = {
  title: "Daily Beta 1 final safety review";
  summary: string;
  safetyReviews: DailyBetaOneFinalSafetyReview[];
  boundary: DailyBetaOneFinalSafetyReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneFinalSafetyReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
