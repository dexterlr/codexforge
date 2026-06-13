export type BetaOperatorDailyWorkflowTrialStatus = "ready-for-review" | "blocked";

export type BetaOperatorDailyWorkflowTrial = {
  id: string;
  betaDailyWorkflowIdentity: string;
  dailyWorkflowStageGroups: string[];
  operatorGoalsChecklist: string[];
  safetyApprovalChecklist: string[];
  deniedDailyWorkflowActions: string[];
  blockedDailyWorkflowRisks: string[];
  betaWorkflowReviewRoute: string;
  frictionPatchRoute: string;
  nextRecommendedAction: string;
  status: BetaOperatorDailyWorkflowTrialStatus;
  advancedDailyWorkflowDetails: string;
};

export type BetaOperatorDailyWorkflowTrialBoundary = {
  betaOperatorDailyWorkflowTrialReviewOnly: true;
  betaOperatorDailyWorkflowTrialDoesNotExecuteActions: true;
  betaWorkflowActionsRequireExplicitOperatorApproval: true;
  unapprovedDailyWorkflowPathsRemainBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  feedbackIngestionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
};

export type BetaOperatorDailyWorkflowTrialModel = {
  title: "Beta operator daily workflow trial";
  summary: string;
  trials: BetaOperatorDailyWorkflowTrial[];
  boundary: BetaOperatorDailyWorkflowTrialBoundary;
  dailyWorkflowLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaOperatorDailyWorkflowTrialStableKey(
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
