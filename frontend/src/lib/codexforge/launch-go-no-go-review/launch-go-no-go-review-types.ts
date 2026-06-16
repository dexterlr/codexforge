export type LaunchGoNoGoReviewStatus = "ready-for-review" | "blocked";

export type LaunchGoNoGoReview = {
  id: string;
  launchGoNoGoIdentity: string;
  decisionGroups: string[];
  goCriteriaChecklist: string[];
  noGoCriteriaChecklist: string[];
  operatorApprovalChecklist: string[];
  escalationChecklist: string[];
  deniedGoNoGoActions: string[];
  unresolvedDecisionBlockers: string[];
  rollbackPlanRoute: string;
  monitoringPlanRoute: string;
  nextRecommendedAction: string;
  status: LaunchGoNoGoReviewStatus;
  advancedLaunchGoNoGoReviewDetails: string;
};

export type LaunchGoNoGoReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  launchAllowedFromUi: false;
  goNoGoAutoPassAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type LaunchGoNoGoReviewModel = {
  title: "Launch go/no-go review";
  summary: string;
  launchGoNoGoReviews: LaunchGoNoGoReview[];
  boundary: LaunchGoNoGoReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildLaunchGoNoGoReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
