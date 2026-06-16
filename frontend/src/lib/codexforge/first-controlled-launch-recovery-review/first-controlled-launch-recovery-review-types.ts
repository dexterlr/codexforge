export type FirstControlledLaunchRecoveryReviewStatus = "ready-for-review" | "blocked";

export type FirstControlledLaunchRecoveryReview = {
  id: string;
  controlledLaunchRecoveryIdentity: string;
  recoveryGroups: string[];
  launchFailureCategories: string[];
  rollbackChecklist: string[];
  escalationChecklist: string[];
  operatorDecisionChecklist: string[];
  deniedRecoveryActions: string[];
  unresolvedRecoveryBlockers: string[];
  controlledLaunchHardeningRoute: string;
  controlledLaunchCandidateRoute: string;
  nextRecommendedAction: string;
  status: FirstControlledLaunchRecoveryReviewStatus;
  advancedFirstControlledLaunchRecoveryReviewDetails: string;
};

export type FirstControlledLaunchRecoveryReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  recoveryTriggerAllowedFromUi: false;
  rollbackTriggerAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type FirstControlledLaunchRecoveryReviewModel = {
  title: "First controlled launch recovery review";
  summary: string;
  firstControlledLaunchRecoveryReviews: FirstControlledLaunchRecoveryReview[];
  boundary: FirstControlledLaunchRecoveryReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstControlledLaunchRecoveryReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
