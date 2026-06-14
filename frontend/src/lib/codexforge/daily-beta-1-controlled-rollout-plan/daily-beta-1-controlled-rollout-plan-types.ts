export type DailyBetaOneControlledRolloutPlanStatus = "ready-for-review" | "blocked";

export type DailyBetaOneControlledRolloutPlan = {
  id: string;
  dailyBetaOneRolloutPlanIdentity: string;
  rolloutStageGroups: string[];
  operatorCohortChecklist: string[];
  approvalGateChecklist: string[];
  rollbackChecklist: string[];
  monitoringReviewChecklist: string[];
  deniedRolloutActions: string[];
  unresolvedRolloutBlockers: string[];
  dailyBetaOneRolloutReviewRoute: string;
  dailyBetaOneFeedbackInboxRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneControlledRolloutPlanStatus;
  advancedRolloutPlanDetails: string;
};

export type DailyBetaOneControlledRolloutPlanBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaOneControlledRolloutPlanDoesNotExecuteRollout: true;
  rolloutActionsRequireExplicitOperatorApproval: true;
  unapprovedRolloutPathsRemainBlocked: true;
  rolloutExecutionAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  outputStorageAllowed: false;
};

export type DailyBetaOneControlledRolloutPlanModel = {
  title: "Daily Beta 1 controlled rollout plan";
  summary: string;
  plans: DailyBetaOneControlledRolloutPlan[];
  boundary: DailyBetaOneControlledRolloutPlanBoundary;
  rolloutPlanLanguage: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneControlledRolloutPlanStableKey(
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
