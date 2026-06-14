export type DailyBetaFeedbackReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaFeedbackReview = {
  id: string;
  dailyBetaFeedbackReviewIdentity: string;
  feedbackGroups: string[];
  usabilityFeedbackChecklist: string[];
  safetyFeedbackChecklist: string[];
  releaseFeedbackChecklist: string[];
  deniedFeedbackActions: string[];
  unresolvedFeedbackBlockers: string[];
  dailyBetaHardeningRoute: string;
  dailyBetaReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaFeedbackReviewStatus;
  advancedFeedbackDetails: string;
};

export type DailyBetaFeedbackReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaFeedbackReviewDoesNotAutoIngestFeedback: true;
  dailyBetaFeedbackRequiresOperatorReviewBeforeUse: true;
  unsafeFeedbackShortcutsStayBlocked: true;
  feedbackIngestionAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  outputStorageAllowed: false;
};

export type DailyBetaFeedbackReviewModel = {
  title: "Daily Beta feedback review";
  summary: string;
  reviews: DailyBetaFeedbackReview[];
  boundary: DailyBetaFeedbackReviewBoundary;
  feedbackLanguage: string[];
  advancedDetails: string[];
};

export function buildDailyBetaFeedbackReviewStableKey(
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
