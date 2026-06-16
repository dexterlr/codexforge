export type LaunchRollbackPlanReviewStatus = "ready-for-review" | "blocked";

export type LaunchRollbackPlanReview = {
  id: string;
  launchRollbackPlanIdentity: string;
  rollbackGroups: string[];
  stopConditionChecklist: string[];
  rollbackActionChecklist: string[];
  escalationChecklist: string[];
  evidenceLoggingChecklist: string[];
  deniedRollbackActions: string[];
  unresolvedRollbackBlockers: string[];
  monitoringPlanRoute: string;
  supportRunbookRoute: string;
  nextRecommendedAction: string;
  status: LaunchRollbackPlanReviewStatus;
  advancedLaunchRollbackPlanReviewDetails: string;
};

export type LaunchRollbackPlanReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  rollbackTriggerAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type LaunchRollbackPlanReviewModel = {
  title: "Launch rollback plan review";
  summary: string;
  launchRollbackPlanReviews: LaunchRollbackPlanReview[];
  boundary: LaunchRollbackPlanReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildLaunchRollbackPlanReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
