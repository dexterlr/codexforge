export type MultiWorkflowOperatorTrialPlanStatus = "ready-for-review" | "blocked";

export type MultiWorkflowOperatorTrialPlan = {
  id: string;
  multiWorkflowTrialPlanIdentity: string;
  workflowCandidateGroups: string[];
  operatorTaskChecklist: string[];
  approvalGateChecklist: string[];
  providerLocalConnectorAutomationHandoffChecklist: string[];
  evidenceResultRecoveryChecklist: string[];
  deniedPlanningActions: string[];
  unresolvedPlanningBlockers: string[];
  multiWorkflowTrialReviewRoute: string;
  multiWorkflowRegressionRoute: string;
  nextRecommendedAction: string;
  status: MultiWorkflowOperatorTrialPlanStatus;
  advancedPlanningDetails: string;
};

export type MultiWorkflowOperatorTrialPlanBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  multiWorkflowOperatorTrialPlanDoesNotExecuteWorkflows: true;
  multiWorkflowTrialsRequireExplicitOperatorApproval: true;
  unapprovedWorkflowPlansRemainBlocked: true;
  workflowExecutionAllowedFromUi: false;
  trialLaunchAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type MultiWorkflowOperatorTrialPlanModel = {
  title: "Multi-workflow operator trial plan";
  summary: string;
  plans: MultiWorkflowOperatorTrialPlan[];
  boundary: MultiWorkflowOperatorTrialPlanBoundary;
  planningLanguage: string[];
  advancedDetails: string[];
};

export function buildMultiWorkflowOperatorTrialPlanStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
