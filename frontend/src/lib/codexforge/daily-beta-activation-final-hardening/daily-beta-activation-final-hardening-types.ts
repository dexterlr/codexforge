export type DailyBetaActivationFinalHardeningStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationFinalHardening = {
  id: string;
  activationFinalHardeningIdentity: string;
  finalHardeningGroups: string[];
  finalGateStatus: string[];
  controlledTrialStatus: string[];
  feedbackRegressionStatus: string[];
  liveBoundaryStatus: string[];
  deniedFinalHardeningActions: string[];
  unresolvedFinalHardeningBlockers: string[];
  activationCandidateRoute: string;
  releaseHandoffRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationFinalHardeningStatus;
  advancedDailyBetaActivationFinalHardeningDetails: string;
};

export type DailyBetaActivationFinalHardeningBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  hardeningApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaActivationFinalHardeningModel = {
  title: "Daily Beta activation final hardening";
  summary: string;
  finalHardenings: DailyBetaActivationFinalHardening[];
  boundary: DailyBetaActivationFinalHardeningBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationFinalHardeningStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
