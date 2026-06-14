export type DailyBetaControlledOperatorTrialStatus = "ready-for-review" | "blocked";

export type DailyBetaControlledOperatorTrial = {
  id: string;
  dailyBetaControlledOperatorTrialIdentity: string;
  dailyBetaTrialGroups: string[];
  operatorTaskChecklist: string[];
  approvalGateChecklist: string[];
  evidenceResultRecoveryChecklist: string[];
  deniedTrialActions: string[];
  unresolvedDailyBetaTrialBlockers: string[];
  dailyBetaFeedbackReviewRoute: string;
  dailyBetaHardeningRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaControlledOperatorTrialStatus;
  advancedTrialDetails: string;
};

export type DailyBetaControlledOperatorTrialBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaControlledOperatorTrialDoesNotExecuteWorkflows: true;
  dailyBetaTrialActionsRequireExplicitOperatorApproval: true;
  unapprovedDailyBetaTrialPathsRemainBlocked: true;
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

export type DailyBetaControlledOperatorTrialModel = {
  title: "Daily Beta controlled operator trial";
  summary: string;
  trials: DailyBetaControlledOperatorTrial[];
  boundary: DailyBetaControlledOperatorTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildDailyBetaControlledOperatorTrialStableKey(
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
