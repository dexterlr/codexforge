export type FirstRealEndToEndWorkflowTrialPlanStatus = "ready-for-review" | "blocked";

export type FirstRealEndToEndWorkflowTrialPlan = {
  id: string;
  endToEndWorkflowTrialPlanIdentity: string;
  workflowStageGroups: string[];
  providerLocalConnectorAutomationHandoffChecklist: string[];
  filePatchTestExecutionChecklist: string[];
  approvalGateChecklist: string[];
  evidenceResultRecoveryChecklist: string[];
  deniedWorkflowTrialPlanActions: string[];
  unresolvedWorkflowPlanBlockers: string[];
  endToEndTrialReviewRoute: string;
  endToEndEvidenceReviewRoute: string;
  nextRecommendedAction: string;
  status: FirstRealEndToEndWorkflowTrialPlanStatus;
  advancedWorkflowTrialPlanDetails: string;
};

export type FirstRealEndToEndWorkflowTrialPlanBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type FirstRealEndToEndWorkflowTrialPlanModel = {
  title: "First real end-to-end workflow trial plan";
  summary: string;
  workflowTrialPlans: FirstRealEndToEndWorkflowTrialPlan[];
  boundary: FirstRealEndToEndWorkflowTrialPlanBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstRealEndToEndWorkflowTrialPlanStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
