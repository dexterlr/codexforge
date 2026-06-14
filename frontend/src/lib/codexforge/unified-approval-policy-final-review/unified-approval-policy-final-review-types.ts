export type UnifiedApprovalPolicyFinalReviewStatus = "ready-for-review" | "blocked";

export type UnifiedApprovalPolicyFinalReview = {
  id: string;
  unifiedApprovalPolicyIdentity: string;
  approvalGroups: string[];
  providerLocalConnectorAutomationApprovalGates: string[];
  deniedApprovalShortcuts: string[];
  auditTrailChecklist: string[];
  rollbackChecklist: string[];
  unresolvedApprovalBlockers: string[];
  evidencePolicyRoute: string;
  resultPolicyRoute: string;
  nextRecommendedAction: string;
  status: UnifiedApprovalPolicyFinalReviewStatus;
  advancedApprovalPolicyDetails: string;
};

export type UnifiedApprovalPolicyFinalReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  unifiedApprovalPolicyFinalReviewDoesNotApplyApprovalPolicy: true;
  approvalPolicyChangesRequireExplicitOperatorApproval: true;
  deniedApprovalShortcutsStayBlocked: true;
  approvalPolicyMutationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  actionsApprovedFromUi: false;
  actionsExecutedFromUi: false;
  policyAutoApplyAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
};

export type UnifiedApprovalPolicyFinalReviewModel = {
  title: "Unified approval policy final review";
  summary: string;
  reviews: UnifiedApprovalPolicyFinalReview[];
  boundary: UnifiedApprovalPolicyFinalReviewBoundary;
  approvalLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedApprovalPolicyFinalReviewStableKey(
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
