export type DailyBetaActivationHardeningPassStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationHardeningPass = {
  id: string;
  activationHardeningIdentity: string;
  hardeningGroups: string[];
  checklistDryRunEvidenceResultRecoveryStatus: string[];
  liveBoundaryStatus: string[];
  operatorReadinessChecklist: string[];
  deniedHardeningActions: string[];
  unresolvedHardeningBlockers: string[];
  activationReleaseCandidateRoute: string;
  operatorReadinessReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationHardeningPassStatus;
  advancedDailyBetaActivationHardeningPassDetails: string;
};

export type DailyBetaActivationHardeningPassBoundary = {
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

export type DailyBetaActivationHardeningPassModel = {
  title: "Daily Beta activation hardening pass";
  summary: string;
  hardeningPasses: DailyBetaActivationHardeningPass[];
  boundary: DailyBetaActivationHardeningPassBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationHardeningPassStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
