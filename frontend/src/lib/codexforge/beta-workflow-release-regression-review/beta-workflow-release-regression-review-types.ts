export type BetaWorkflowReleaseRegressionReviewStatus = "ready-for-review" | "blocked";

export type BetaWorkflowReleaseRegressionReview = {
  id: string;
  betaWorkflowRegressionIdentity: string;
  regressionGroups: string[];
  providerLocalConnectorAutomationCoverageChecklist: string[];
  betaWorkflowRouteCoverageChecklist: string[];
  safetyRegressionChecklist: string[];
  deniedRegressionActions: string[];
  unresolvedRegressionRisks: string[];
  safetySignoffRoute: string;
  documentationReviewRoute: string;
  nextRecommendedAction: string;
  status: BetaWorkflowReleaseRegressionReviewStatus;
  advancedRegressionReviewDetails: string;
};

export type BetaWorkflowReleaseRegressionReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  betaWorkflowReleaseRegressionReviewDoesNotRunTests: true;
  regressionFixesRequireExplicitOperatorApproval: true;
  unresolvedBetaRegressionsStayBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  regressionTestExecutionAllowedFromUi: false;
  releaseApprovalAutomationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type BetaWorkflowReleaseRegressionReviewModel = {
  title: "Beta workflow release regression review";
  summary: string;
  reviews: BetaWorkflowReleaseRegressionReview[];
  boundary: BetaWorkflowReleaseRegressionReviewBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaWorkflowReleaseRegressionReviewStableKey(
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
