export type DailyBetaOneControlledTrialHardeningStatus = "ready-for-review" | "blocked";

export type DailyBetaOneControlledTrialHardening = {
  id: string;
  controlledTrialHardeningIdentity: string;
  hardeningGroups: string[];
  resultReviewStatus: string[];
  recoveryReviewStatus: string[];
  releaseCandidateReadinessChecklist: string[];
  boundaryReadinessChecklist: string[];
  deniedHardeningActions: string[];
  unresolvedHardeningBlockers: string[];
  backendBoundaryInventoryRoute: string;
  providerExecutionBoundaryRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneControlledTrialHardeningStatus;
  advancedControlledTrialHardeningDetails: string;
};

export type DailyBetaOneControlledTrialHardeningBoundary = {
  reviewOnly: true; approvalRequired: true; hardeningApplyAllowedFromUi: false; controlledTrialExecutionAllowedFromUi: false; workflowExecutionAllowedFromUi: false; fileMutationAllowedFromUi: false; memoryMutationAllowedFromUi: false; dailyBetaOneLaunchAllowedFromUi: false; boundaryProbeExecutionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type DailyBetaOneControlledTrialHardeningModel = {
  title: "Daily Beta 1 controlled trial hardening";
  summary: string;
  hardeningReviews: DailyBetaOneControlledTrialHardening[];
  boundary: DailyBetaOneControlledTrialHardeningBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneControlledTrialHardeningStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
