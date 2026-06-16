export type DailyBetaOneActivationHardeningPassStatus = "ready-for-review" | "blocked";

export type DailyBetaOneActivationHardeningPass = {
  id: string;
  dailyBetaOneActivationHardeningIdentity: string;
  hardeningGroups: string[];
  finalGateStatus: string[];
  controlledTrialStatus: string[];
  feedbackRegressionRecoveryStatus: string[];
  liveBoundaryStatus: string[];
  deniedHardeningActions: string[];
  unresolvedHardeningBlockers: string[];
  activationReleaseCandidateRoute: string;
  readinessLockRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneActivationHardeningPassStatus;
  advancedDailyBetaOneActivationHardeningPassDetails: string;
};

export type DailyBetaOneActivationHardeningPassBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  hardeningApplyAllowedFromUi: false;
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

export type DailyBetaOneActivationHardeningPassModel = {
  title: "Daily Beta 1 activation hardening pass";
  summary: string;
  hardeningPasses: DailyBetaOneActivationHardeningPass[];
  boundary: DailyBetaOneActivationHardeningPassBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneActivationHardeningPassStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
