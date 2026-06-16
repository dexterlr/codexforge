export type DailyBetaOneLaunchResultReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneLaunchResultReview = {
  id: string;
  launchResultReviewIdentity: string;
  resultGroups: string[];
  acceptanceChecklist: string[];
  rejectionChecklist: string[];
  reuseChecklist: string[];
  safetyReviewChecklist: string[];
  deniedResultActions: string[];
  unresolvedResultBlockers: string[];
  launchCandidateRoute: string;
  launchReadinessLockRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneLaunchResultReviewStatus;
  advancedDailyBetaOneLaunchResultReviewDetails: string;
};

export type DailyBetaOneLaunchResultReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  liveOutputStorageAllowedFromUi: false;
  resultIngestionAllowedFromUi: false;
  resultPersistenceAllowedFromUi: false;
  resultReuseAutomationAllowedFromUi: false;
  dailyBetaOneLaunchAllowedFromUi: false;
  launchApprovalAutomationAllowedFromUi: false;
  launchDryRunExecutionAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  launchReadinessLockAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneLaunchResultReviewModel = {
  title: "Daily Beta 1 launch result review";
  summary: string;
  launchResultReviews: DailyBetaOneLaunchResultReview[];
  boundary: DailyBetaOneLaunchResultReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneLaunchResultReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
