export type FirstControlledLaunchPlanStatus = "ready-for-review" | "blocked";

export type FirstControlledLaunchPlan = {
  id: string;
  firstControlledLaunchPlanIdentity: string;
  launchStageGroups: string[];
  operatorTaskChecklist: string[];
  boundaryApprovalChecklist: string[];
  rollbackMonitoringChecklist: string[];
  evidenceResultRecoveryChecklist: string[];
  deniedLaunchPlanActions: string[];
  unresolvedLaunchPlanBlockers: string[];
  controlledLaunchReviewRoute: string;
  controlledLaunchEvidenceRoute: string;
  nextRecommendedAction: string;
  status: FirstControlledLaunchPlanStatus;
  advancedFirstControlledLaunchPlanDetails: string;
};

export type FirstControlledLaunchPlanBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  controlledLaunchExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type FirstControlledLaunchPlanModel = {
  title: "First controlled launch plan";
  summary: string;
  firstControlledLaunchPlans: FirstControlledLaunchPlan[];
  boundary: FirstControlledLaunchPlanBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstControlledLaunchPlanStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
