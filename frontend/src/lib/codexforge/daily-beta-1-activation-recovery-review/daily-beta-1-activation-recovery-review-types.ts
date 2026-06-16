export type DailyBetaOneActivationRecoveryReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneActivationRecoveryReview = {
  id: string;
  dailyBetaOneActivationRecoveryIdentity: string;
  recoveryGroups: string[];
  activationFailureCategories: string[];
  rollbackChecklist: string[];
  escalationChecklist: string[];
  operatorDecisionChecklist: string[];
  deniedRecoveryActions: string[];
  unresolvedRecoveryBlockers: string[];
  hardeningPassRoute: string;
  activationReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneActivationRecoveryReviewStatus;
  advancedDailyBetaOneActivationRecoveryReviewDetails: string;
};

export type DailyBetaOneActivationRecoveryReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  recoveryTriggerAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneActivationRecoveryReviewModel = {
  title: "Daily Beta 1 activation recovery review";
  summary: string;
  recoveryReviews: DailyBetaOneActivationRecoveryReview[];
  boundary: DailyBetaOneActivationRecoveryReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneActivationRecoveryReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
