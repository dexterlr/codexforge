export type LaunchMonitoringPlanReviewStatus = "ready-for-review" | "blocked";

export type LaunchMonitoringPlanReview = {
  id: string;
  launchMonitoringPlanIdentity: string;
  monitoringGroups: string[];
  evidenceLoggingChecklist: string[];
  alertNotificationChecklist: string[];
  operatorReviewCadenceChecklist: string[];
  privacyRedactionChecklist: string[];
  deniedMonitoringActions: string[];
  unresolvedMonitoringBlockers: string[];
  supportRunbookRoute: string;
  goNoGoCandidateRoute: string;
  nextRecommendedAction: string;
  status: LaunchMonitoringPlanReviewStatus;
  advancedLaunchMonitoringPlanReviewDetails: string;
};

export type LaunchMonitoringPlanReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  monitoringJobCreationAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type LaunchMonitoringPlanReviewModel = {
  title: "Launch monitoring plan review";
  summary: string;
  launchMonitoringPlanReviews: LaunchMonitoringPlanReview[];
  boundary: LaunchMonitoringPlanReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildLaunchMonitoringPlanReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
