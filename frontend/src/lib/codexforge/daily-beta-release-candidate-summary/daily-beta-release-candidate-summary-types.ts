export type DailyBetaReleaseCandidateSummaryStatus = "ready-for-review" | "blocked";

export type DailyBetaReleaseCandidateSummary = {
  id: string;
  releaseCandidateSummaryIdentity: string;
  summaryGroups: string[];
  activationReadinessSummary: string[];
  finalGateSummary: string[];
  feedbackRegressionHardeningSummary: string[];
  operatorReadinessSummary: string[];
  deniedSummaryActions: string[];
  unresolvedSummaryBlockers: string[];
  dailyBetaOneFinalCandidateRoute: string;
  finalOperatorReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaReleaseCandidateSummaryStatus;
  advancedDailyBetaReleaseCandidateSummaryDetails: string;
};

export type DailyBetaReleaseCandidateSummaryBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  releaseApprovalAutomationAllowedFromUi: false;
  releaseSettingsPersistenceAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  dailyBetaActivationAllowedFromUi: false;
  dailyBetaOneActivationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaReleaseCandidateSummaryModel = {
  title: "Daily Beta release candidate summary";
  summary: string;
  releaseCandidateSummaries: DailyBetaReleaseCandidateSummary[];
  boundary: DailyBetaReleaseCandidateSummaryBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaReleaseCandidateSummaryStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
