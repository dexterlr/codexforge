export type LaunchSupportRunbookReviewStatus = "ready-for-review" | "blocked";

export type LaunchSupportRunbookReview = {
  id: string;
  launchSupportRunbookIdentity: string;
  supportRunbookGroups: string[];
  operatorSupportChecklist: string[];
  knownLimitationChecklist: string[];
  recoveryRollbackChecklist: string[];
  escalationChecklist: string[];
  deniedSupportRunbookActions: string[];
  unresolvedSupportBlockers: string[];
  goNoGoCandidateRoute: string;
  firstControlledLaunchPlanRoute: string;
  nextRecommendedAction: string;
  status: LaunchSupportRunbookReviewStatus;
  advancedLaunchSupportRunbookReviewDetails: string;
};

export type LaunchSupportRunbookReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  supportRunbookPublishAllowedFromUi: false;
  handoffSendAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type LaunchSupportRunbookReviewModel = {
  title: "Launch support runbook review";
  summary: string;
  launchSupportRunbookReviews: LaunchSupportRunbookReview[];
  boundary: LaunchSupportRunbookReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildLaunchSupportRunbookReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
