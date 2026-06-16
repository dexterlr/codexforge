export type EndToEndRolloutHardeningPassStatus = "ready-for-review" | "blocked";

export type EndToEndRolloutHardeningPass = {
  id: string;
  rolloutHardeningPassIdentity: string;
  hardeningGroups: string[];
  rolloutReviewStatus: string[];
  feedbackStatus: string[];
  regressionStatus: string[];
  boundaryReadinessChecklist: string[];
  deniedHardeningActions: string[];
  unresolvedHardeningBlockers: string[];
  finalLiveBoundarySignoffRoute: string;
  dailyBetaCandidateRoute: string;
  nextRecommendedAction: string;
  status: EndToEndRolloutHardeningPassStatus;
  advancedRolloutHardeningPassDetails: string;
};

export type EndToEndRolloutHardeningPassBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  hardeningApplyAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  rolloutExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type EndToEndRolloutHardeningPassModel = {
  title: "End-to-end rollout hardening pass";
  summary: string;
  passes: EndToEndRolloutHardeningPass[];
  boundary: EndToEndRolloutHardeningPassBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildEndToEndRolloutHardeningPassStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
