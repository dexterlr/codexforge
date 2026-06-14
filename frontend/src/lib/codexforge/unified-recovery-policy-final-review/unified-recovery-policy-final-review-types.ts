export type UnifiedRecoveryPolicyFinalReviewStatus = "ready-for-review" | "blocked";

export type UnifiedRecoveryPolicyFinalReview = {
  id: string;
  unifiedRecoveryPolicyIdentity: string;
  recoveryGroups: string[];
  rollbackChecklist: string[];
  escalationChecklist: string[];
  providerLocalConnectorAutomationRecoveryMatrix: string[];
  deniedRecoveryShortcuts: string[];
  unresolvedRecoveryBlockers: string[];
  settingsRoute: string;
  cockpitFinalPolishRoute: string;
  nextRecommendedAction: string;
  status: UnifiedRecoveryPolicyFinalReviewStatus;
  advancedRecoveryPolicyDetails: string;
};

export type UnifiedRecoveryPolicyFinalReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  unifiedRecoveryPolicyFinalReviewDoesNotTriggerRecovery: true;
  recoveryPolicyChangesRequireExplicitOperatorApproval: true;
  unsafeRecoveryShortcutsStayBlocked: true;
  recoveryTriggerAllowedFromUi: false;
  recoveryPolicyMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type UnifiedRecoveryPolicyFinalReviewModel = {
  title: "Unified recovery policy final review";
  summary: string;
  reviews: UnifiedRecoveryPolicyFinalReview[];
  boundary: UnifiedRecoveryPolicyFinalReviewBoundary;
  recoveryLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedRecoveryPolicyFinalReviewStableKey(
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
