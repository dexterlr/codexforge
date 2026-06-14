export type MultiWorkflowRegressionReviewStatus = "ready-for-review" | "blocked";

export type MultiWorkflowRegressionReview = {
  id: string;
  multiWorkflowRegressionIdentity: string;
  regressionGroups: string[];
  workflowCoverageChecklist: string[];
  approvalEvidenceResultRecoveryRegressionChecklist: string[];
  providerLocalConnectorAutomationRegressionChecklist: string[];
  deniedRegressionActions: string[];
  unresolvedRegressionBlockers: string[];
  multiWorkflowReleaseCandidateRoute: string;
  controlledLiveSignoffRoute: string;
  nextRecommendedAction: string;
  status: MultiWorkflowRegressionReviewStatus;
  advancedRegressionDetails: string;
};

export type MultiWorkflowRegressionReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  multiWorkflowRegressionReviewDoesNotRunTests: true;
  regressionFixesRequireExplicitOperatorApproval: true;
  unresolvedRegressionsStayBlocked: true;
  testExecutionFromUiAllowed: false;
  workflowExecutionAllowedFromUi: false;
  fixApplicationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
};

export type MultiWorkflowRegressionReviewModel = {
  title: "Multi-workflow regression review";
  summary: string;
  reviews: MultiWorkflowRegressionReview[];
  boundary: MultiWorkflowRegressionReviewBoundary;
  regressionLanguage: string[];
  advancedDetails: string[];
};

export function buildMultiWorkflowRegressionReviewStableKey(
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
