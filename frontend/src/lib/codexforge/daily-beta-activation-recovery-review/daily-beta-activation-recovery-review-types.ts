export type DailyBetaActivationRecoveryReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationRecoveryReview = {
  id: string;
  activationRecoveryIdentity: string;
  recoveryGroups: string[];
  activationFailureCategories: string[];
  rollbackChecklist: string[];
  escalationChecklist: string[];
  operatorDecisionChecklist: string[];
  deniedRecoveryActions: string[];
  unresolvedRecoveryBlockers: string[];
  activationHardeningRoute: string;
  activationReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationRecoveryReviewStatus;
  advancedDailyBetaActivationRecoveryReviewDetails: string;
};

export type DailyBetaActivationRecoveryReviewBoundary = {
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

export type DailyBetaActivationRecoveryReviewModel = {
  title: "Daily Beta activation recovery review";
  summary: string;
  recoveryReviews: DailyBetaActivationRecoveryReview[];
  boundary: DailyBetaActivationRecoveryReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationRecoveryReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
