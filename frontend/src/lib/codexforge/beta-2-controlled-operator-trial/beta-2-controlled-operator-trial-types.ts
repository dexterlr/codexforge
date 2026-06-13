export type BetaTwoControlledOperatorTrialStatus = "ready-for-review" | "blocked";

export type BetaTwoControlledOperatorTrial = {
  id: string;
  betaTwoControlledOperatorTrialIdentity: string;
  trialStageGroups: string[];
  operatorTaskChecklist: string[];
  approvalGateChecklist: string[];
  evidenceResultChecklist: string[];
  deniedTrialActions: string[];
  blockedTrialRisks: string[];
  operatorFeedbackReviewRoute: string;
  betaTwoHardeningRoute: string;
  nextRecommendedAction: string;
  status: BetaTwoControlledOperatorTrialStatus;
  advancedTrialDetails: string;
};

export type BetaTwoControlledOperatorTrialBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  betaTwoControlledOperatorTrialDoesNotExecuteWorkflows: true;
  betaTwoTrialActionsRequireExplicitOperatorApproval: true;
  unapprovedBetaTwoTrialPathsRemainBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type BetaTwoControlledOperatorTrialModel = {
  title: "Beta 2 controlled operator trial";
  summary: string;
  trials: BetaTwoControlledOperatorTrial[];
  boundary: BetaTwoControlledOperatorTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaTwoControlledOperatorTrialStableKey(
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
