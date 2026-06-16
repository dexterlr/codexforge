export type DailyBetaActivationDryRunReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationDryRunReview = {
  id: string;
  activationDryRunIdentity: string;
  dryRunGroups: string[];
  boundaryDryRunChecklist: string[];
  rolloutDryRunChecklist: string[];
  operatorDecisionChecklist: string[];
  rollbackChecklist: string[];
  deniedDryRunActions: string[];
  unresolvedDryRunBlockers: string[];
  activationEvidenceReviewRoute: string;
  activationResultReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationDryRunReviewStatus;
  advancedDailyBetaActivationDryRunReviewDetails: string;
};

export type DailyBetaActivationDryRunReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  activationDryRunExecutionAllowedFromUi: false;
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

export type DailyBetaActivationDryRunReviewModel = {
  title: "Daily Beta activation dry-run review";
  summary: string;
  dryRuns: DailyBetaActivationDryRunReview[];
  boundary: DailyBetaActivationDryRunReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationDryRunReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
