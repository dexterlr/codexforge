export type DailyBetaOneFinalHardeningPassStatus = "ready-for-review" | "blocked";

export type DailyBetaOneFinalHardeningPass = {
  id: string;
  finalHardeningPassIdentity: string;
  hardeningGroups: string[];
  finalCandidateStatus: string[];
  finalOperatorReviewStatus: string[];
  finalRegressionRecoveryStatus: string[];
  liveBoundaryStatus: string[];
  deniedFinalHardeningActions: string[];
  unresolvedFinalHardeningBlockers: string[];
  dailyBetaOneActivationCandidateRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneFinalHardeningPassStatus;
  advancedDailyBetaOneFinalHardeningPassDetails: string;
};

export type DailyBetaOneFinalHardeningPassBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  hardeningApplyAllowedFromUi: false;
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

export type DailyBetaOneFinalHardeningPassModel = {
  title: "Daily Beta 1 final hardening pass";
  summary: string;
  finalHardeningPasses: DailyBetaOneFinalHardeningPass[];
  boundary: DailyBetaOneFinalHardeningPassBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneFinalHardeningPassStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
