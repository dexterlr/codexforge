export type DailyBetaActivationOperatorReadinessReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationOperatorReadinessReview = {
  id: string;
  activationOperatorReadinessIdentity: string;
  readinessGroups: string[];
  operatorChecklist: string[];
  supportRollbackChecklist: string[];
  approvalBoundaryChecklist: string[];
  handoffChecklist: string[];
  deniedReadinessActions: string[];
  unresolvedReadinessBlockers: string[];
  activationReleaseCandidateRoute: string;
  checkpointDocsRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationOperatorReadinessReviewStatus;
  advancedDailyBetaActivationOperatorReadinessReviewDetails: string;
};

export type DailyBetaActivationOperatorReadinessReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaActivationAllowedFromUi: false;
  handoffSendAllowedFromUi: false;
  operatorReadinessSignoffAutomationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaActivationOperatorReadinessReviewModel = {
  title: "Daily Beta activation operator readiness review";
  summary: string;
  readinessReviews: DailyBetaActivationOperatorReadinessReview[];
  boundary: DailyBetaActivationOperatorReadinessReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationOperatorReadinessReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
