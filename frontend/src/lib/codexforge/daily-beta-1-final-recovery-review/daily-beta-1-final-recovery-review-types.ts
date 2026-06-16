export type DailyBetaOneFinalRecoveryReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneFinalRecoveryReview = {
  id: string;
  finalRecoveryReviewIdentity: string;
  recoveryGroups: string[];
  activationFailureCategories: string[];
  rollbackChecklist: string[];
  escalationChecklist: string[];
  operatorDecisionChecklist: string[];
  deniedRecoveryActions: string[];
  unresolvedFinalRecoveryBlockers: string[];
  finalHardeningRoute: string;
  dailyBetaOneActivationCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneFinalRecoveryReviewStatus;
  advancedDailyBetaOneFinalRecoveryReviewDetails: string;
};

export type DailyBetaOneFinalRecoveryReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  recoveryTriggerAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneFinalRecoveryReviewModel = {
  title: "Daily Beta 1 final recovery review";
  summary: string;
  finalRecoveryReviews: DailyBetaOneFinalRecoveryReview[];
  boundary: DailyBetaOneFinalRecoveryReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneFinalRecoveryReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
