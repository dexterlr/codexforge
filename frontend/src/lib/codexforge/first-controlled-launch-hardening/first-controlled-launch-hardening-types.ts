export type FirstControlledLaunchHardeningStatus = "ready-for-review" | "blocked";

export type FirstControlledLaunchHardening = {
  id: string;
  controlledLaunchHardeningIdentity: string;
  hardeningGroups: string[];
  launchReviewStatus: string[];
  evidenceResultRecoveryStatus: string[];
  boundaryReadinessStatus: string[];
  operatorReadinessChecklist: string[];
  deniedHardeningActions: string[];
  unresolvedHardeningBlockers: string[];
  controlledLaunchCandidateRoute: string;
  controlledLaunchHandoffRoute: string;
  nextRecommendedAction: string;
  status: FirstControlledLaunchHardeningStatus;
  advancedFirstControlledLaunchHardeningDetails: string;
};

export type FirstControlledLaunchHardeningBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  hardeningApplyAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type FirstControlledLaunchHardeningModel = {
  title: "First controlled launch hardening";
  summary: string;
  firstControlledLaunchHardenings: FirstControlledLaunchHardening[];
  boundary: FirstControlledLaunchHardeningBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstControlledLaunchHardeningStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
