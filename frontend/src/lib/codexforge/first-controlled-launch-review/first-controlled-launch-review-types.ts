export type FirstControlledLaunchReviewStatus = "ready-for-review" | "blocked";

export type FirstControlledLaunchReview = {
  id: string;
  firstControlledLaunchReviewIdentity: string;
  launchReviewGroups: string[];
  launchPlanStatus: string[];
  boundaryApprovalChecklist: string[];
  operatorDecisionChecklist: string[];
  rollbackMonitoringChecklist: string[];
  deniedLaunchReviewActions: string[];
  unresolvedLaunchReviewBlockers: string[];
  controlledLaunchEvidenceRoute: string;
  controlledLaunchResultRoute: string;
  nextRecommendedAction: string;
  status: FirstControlledLaunchReviewStatus;
  advancedFirstControlledLaunchReviewDetails: string;
};

export type FirstControlledLaunchReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  controlledLaunchExecutionAllowedFromUi: false;
  controlledLaunchAutoProceedAllowedFromUi: false;
  launchDecisionPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  launchApprovalAutomationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type FirstControlledLaunchReviewModel = {
  title: "First controlled launch review";
  summary: string;
  firstControlledLaunchReviews: FirstControlledLaunchReview[];
  boundary: FirstControlledLaunchReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstControlledLaunchReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
