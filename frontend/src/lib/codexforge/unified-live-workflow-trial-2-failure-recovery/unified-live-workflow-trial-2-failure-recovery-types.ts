export type UnifiedLiveWorkflowTrialTwoFailureRecoveryStatus = "ready-for-review" | "blocked";

export type UnifiedLiveWorkflowTrialTwoFailureRecovery = {
  id: string;
  trialTwoFailureRecoveryIdentity: string;
  failureCategories: string[];
  recoveryActionGroups: string[];
  rollbackChecklist: string[];
  escalationChecklist: string[];
  deniedRecoveryShortcuts: string[];
  blockedRecoveryRisks: string[];
  hardeningPassRoute: string;
  betaDailyWorkflowRoute: string;
  nextRecommendedAction: string;
  status: UnifiedLiveWorkflowTrialTwoFailureRecoveryStatus;
  advancedRecoveryDetails: string;
};

export type UnifiedLiveWorkflowTrialTwoFailureRecoveryBoundary = {
  trialTwoFailureRecoveryReviewOnly: true;
  trialTwoFailureRecoveryDoesNotTriggerRecoveryAutomatically: true;
  recoveryActionsRequireExplicitOperatorApproval: true;
  unsafeRecoveryShortcutsRemainBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  recoveryAutoTriggerAllowedFromUi: false;
  rollbackExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  approvalDecisionPersistenceAllowedFromUi: false;
};

export type UnifiedLiveWorkflowTrialTwoFailureRecoveryModel = {
  title: "Unified live workflow trial 2 failure recovery";
  summary: string;
  reviews: UnifiedLiveWorkflowTrialTwoFailureRecovery[];
  boundary: UnifiedLiveWorkflowTrialTwoFailureRecoveryBoundary;
  recoveryLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedLiveWorkflowTrialTwoFailureRecoveryStableKey(
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
