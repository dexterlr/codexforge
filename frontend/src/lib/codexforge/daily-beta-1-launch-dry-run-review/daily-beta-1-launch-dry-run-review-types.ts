export type DailyBetaOneLaunchDryRunReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneLaunchDryRunReview = {
  id: string;
  launchDryRunReviewIdentity: string;
  dryRunGroups: string[];
  boundaryDryRunChecklist: string[];
  rolloutDryRunChecklist: string[];
  operatorDecisionChecklist: string[];
  rollbackChecklist: string[];
  deniedDryRunActions: string[];
  unresolvedDryRunBlockers: string[];
  launchEvidenceReviewRoute: string;
  launchResultReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneLaunchDryRunReviewStatus;
  advancedDailyBetaOneLaunchDryRunReviewDetails: string;
};

export type DailyBetaOneLaunchDryRunReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  launchDryRunExecutionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  dailyBetaOneLaunchAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  launchApprovalAutomationAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  resultPersistenceAllowedFromUi: false;
  launchReadinessLockAutomationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneLaunchDryRunReviewModel = {
  title: "Daily Beta 1 launch dry-run review";
  summary: string;
  launchDryRunReviews: DailyBetaOneLaunchDryRunReview[];
  boundary: DailyBetaOneLaunchDryRunReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneLaunchDryRunReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
