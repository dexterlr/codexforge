export type DailyBetaOneControlledTrialRecoveryReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneControlledTrialRecoveryReview = {
  id: string;
  controlledTrialRecoveryReviewIdentity: string;
  recoveryGroups: string[];
  failureCategories: string[];
  rollbackChecklist: string[];
  escalationChecklist: string[];
  operatorDecisionChecklist: string[];
  deniedRecoveryActions: string[];
  unresolvedRecoveryBlockers: string[];
  hardeningRoute: string;
  backendBoundaryInventoryRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneControlledTrialRecoveryReviewStatus;
  advancedControlledTrialRecoveryReviewDetails: string;
};

export type DailyBetaOneControlledTrialRecoveryReviewBoundary = {
  reviewOnly: true; approvalRequired: true; recoveryTriggerAllowedFromUi: false; controlledTrialExecutionAllowedFromUi: false; workflowExecutionAllowedFromUi: false; fileMutationAllowedFromUi: false; dailyBetaOneLaunchAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; memoryMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type DailyBetaOneControlledTrialRecoveryReviewModel = {
  title: "Daily Beta 1 controlled trial recovery review";
  summary: string;
  recoveryReviews: DailyBetaOneControlledTrialRecoveryReview[];
  boundary: DailyBetaOneControlledTrialRecoveryReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneControlledTrialRecoveryReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
