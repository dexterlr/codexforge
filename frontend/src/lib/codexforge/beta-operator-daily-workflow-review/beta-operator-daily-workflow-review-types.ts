export type BetaOperatorDailyWorkflowReviewStatus = "ready-for-review" | "blocked";

export type BetaOperatorDailyWorkflowReview = {
  id: string;
  betaWorkflowReviewIdentity: string;
  reviewGroups: string[];
  usabilityChecklist: string[];
  safetyClarityChecklist: string[];
  feedbackReviewChecklist: string[];
  deniedFeedbackActions: string[];
  blockedReviewRisks: string[];
  frictionPatchRoute: string;
  releaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: BetaOperatorDailyWorkflowReviewStatus;
  advancedWorkflowReviewDetails: string;
};

export type BetaOperatorDailyWorkflowReviewBoundary = {
  betaOperatorDailyWorkflowReviewOnly: true;
  betaOperatorDailyWorkflowReviewDoesNotAutoIngestFeedback: true;
  betaWorkflowFeedbackRequiresOperatorReviewBeforeUse: true;
  unsafeFeedbackShortcutsStayBlocked: true;
  feedbackIngestionAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  approvalDecisionPersistenceAllowedFromUi: false;
};

export type BetaOperatorDailyWorkflowReviewModel = {
  title: "Beta operator daily workflow review";
  summary: string;
  reviews: BetaOperatorDailyWorkflowReview[];
  boundary: BetaOperatorDailyWorkflowReviewBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaOperatorDailyWorkflowReviewStableKey(
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
