export type MultiWorkflowTrialReviewStatus = "ready-for-review" | "blocked";

export type MultiWorkflowTrialReview = {
  id: string;
  multiWorkflowTrialReviewIdentity: string;
  trialComparisonGroups: string[];
  operatorReadinessChecklist: string[];
  approvalSafetyChecklist: string[];
  evidenceResultRecoveryReviewChecklist: string[];
  deniedTrialActions: string[];
  unresolvedTrialBlockers: string[];
  multiWorkflowRegressionRoute: string;
  multiWorkflowReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: MultiWorkflowTrialReviewStatus;
  advancedTrialDetails: string;
};

export type MultiWorkflowTrialReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  multiWorkflowTrialReviewDoesNotLaunchTrials: true;
  trialActionsRequireExplicitOperatorApproval: true;
  unresolvedTrialBlockersStayBlocked: true;
  trialLaunchAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  trialResultPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type MultiWorkflowTrialReviewModel = {
  title: "Multi-workflow trial review";
  summary: string;
  reviews: MultiWorkflowTrialReview[];
  boundary: MultiWorkflowTrialReviewBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildMultiWorkflowTrialReviewStableKey(
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
