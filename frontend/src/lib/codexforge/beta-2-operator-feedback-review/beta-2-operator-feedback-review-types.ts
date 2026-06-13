export type BetaTwoOperatorFeedbackReviewStatus = "ready-for-review" | "blocked";

export type BetaTwoOperatorFeedbackReview = {
  id: string;
  betaTwoFeedbackIdentity: string;
  feedbackGroups: string[];
  usabilityFeedbackChecklist: string[];
  safetyFeedbackChecklist: string[];
  releaseFeedbackChecklist: string[];
  deniedFeedbackActions: string[];
  blockedFeedbackRisks: string[];
  betaTwoHardeningRoute: string;
  releaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: BetaTwoOperatorFeedbackReviewStatus;
  advancedFeedbackDetails: string;
};

export type BetaTwoOperatorFeedbackReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  betaTwoOperatorFeedbackReviewDoesNotAutoIngestFeedback: true;
  betaTwoFeedbackRequiresOperatorReviewBeforeUse: true;
  unsafeFeedbackShortcutsStayBlocked: true;
  actionsExecutedFromUi: false;
  feedbackIngestionAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
};

export type BetaTwoOperatorFeedbackReviewModel = {
  title: "Beta 2 operator feedback review";
  summary: string;
  reviews: BetaTwoOperatorFeedbackReview[];
  boundary: BetaTwoOperatorFeedbackReviewBoundary;
  feedbackLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaTwoOperatorFeedbackReviewStableKey(
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
