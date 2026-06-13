export type BetaWorkflowSafetySignoffReviewStatus = "ready-for-review" | "blocked";

export type BetaWorkflowSafetySignoffReview = {
  id: string;
  betaWorkflowSafetySignoffIdentity: string;
  signoffGroups: string[];
  approvalBoundaryChecklist: string[];
  dataPrivacyChecklist: string[];
  providerLocalConnectorAutomationSafetyChecklist: string[];
  deniedSignoffShortcuts: string[];
  unresolvedSignoffBlockers: string[];
  documentationReviewRoute: string;
  onboardingFinalPassRoute: string;
  nextRecommendedAction: string;
  status: BetaWorkflowSafetySignoffReviewStatus;
  advancedSignoffDetails: string;
};

export type BetaWorkflowSafetySignoffReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  betaWorkflowSafetySignoffReviewDoesNotApproveReleaseAutomatically: true;
  safetySignoffRequiresExplicitOperatorApproval: true;
  unresolvedSafetyBlockersStayBlocked: true;
  actionsExecutedFromUi: false;
  releaseApprovalAllowedFromUi: false;
  signoffDecisionPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type BetaWorkflowSafetySignoffReviewModel = {
  title: "Beta workflow safety signoff review";
  summary: string;
  reviews: BetaWorkflowSafetySignoffReview[];
  boundary: BetaWorkflowSafetySignoffReviewBoundary;
  signoffLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaWorkflowSafetySignoffReviewStableKey(
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
