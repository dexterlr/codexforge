export type BetaWorkflowDocumentationReviewStatus = "ready-for-review" | "blocked";

export type BetaWorkflowDocumentationReview = {
  id: string;
  betaWorkflowDocumentationIdentity: string;
  documentationGroups: string[];
  operatorRunbookChecklist: string[];
  checkpointDocChecklist: string[];
  safetyWordingChecklist: string[];
  deniedDocumentationShortcuts: string[];
  unresolvedDocumentationBlockers: string[];
  onboardingFinalPassRoute: string;
  betaTwoReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: BetaWorkflowDocumentationReviewStatus;
  advancedDocumentationDetails: string;
};

export type BetaWorkflowDocumentationReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  betaWorkflowDocumentationReviewDoesNotPublishDocumentationAutomatically: true;
  documentationChangesRequireExplicitOperatorApproval: true;
  staleDocumentationBlockersStayBlocked: true;
  actionsExecutedFromUi: false;
  documentationPublishAllowedFromUi: false;
  documentationApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  ciPassClaimAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type BetaWorkflowDocumentationReviewModel = {
  title: "Beta workflow documentation review";
  summary: string;
  reviews: BetaWorkflowDocumentationReview[];
  boundary: BetaWorkflowDocumentationReviewBoundary;
  documentationLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaWorkflowDocumentationReviewStableKey(
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
