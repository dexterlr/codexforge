export type RealDailyWorkflowRecoveryReviewStatus = "ready-for-review" | "blocked";

export type RealDailyWorkflowRecoveryReview = {
  id: string;
  realDailyWorkflowRecoveryIdentity: string;
  recoveryGroups: string[];
  failureCategories: string[];
  rollbackChecklist: string[];
  escalationChecklist: string[];
  deniedRecoveryShortcuts: string[];
  blockedRecoveryRisks: string[];
  realDailyWorkflowHardeningRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: RealDailyWorkflowRecoveryReviewStatus;
  advancedRecoveryDetails: string;
};

export type RealDailyWorkflowRecoveryReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  realDailyWorkflowRecoveryReviewDoesNotTriggerRecovery: true;
  recoveryActionsRequireExplicitOperatorApproval: true;
  unsafeRecoveryShortcutsRemainBlocked: true;
  recoveryTriggerAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  hardeningApplyAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type RealDailyWorkflowRecoveryReviewModel = {
  title: "Real daily workflow recovery review";
  summary: string;
  reviews: RealDailyWorkflowRecoveryReview[];
  boundary: RealDailyWorkflowRecoveryReviewBoundary;
  recoveryLanguage: string[];
  advancedDetails: string[];
};

export function buildRealDailyWorkflowRecoveryReviewStableKey(
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
