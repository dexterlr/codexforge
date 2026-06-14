export type DailyBetaOneFeedbackInboxStatus = "ready-for-review" | "blocked";

export type DailyBetaOneFeedbackInbox = {
  id: string;
  dailyBetaOneFeedbackInboxIdentity: string;
  feedbackGroups: string[];
  usabilityFeedbackLane: string[];
  safetyFeedbackLane: string[];
  rolloutFeedbackLane: string[];
  releaseFeedbackLane: string[];
  deniedFeedbackActions: string[];
  unresolvedFeedbackBlockers: string[];
  dailyBetaHardeningRoute: string;
  dailyBetaOneCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneFeedbackInboxStatus;
  advancedFeedbackInboxDetails: string;
};

export type DailyBetaOneFeedbackInboxBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaOneFeedbackInboxDoesNotAutoIngestFeedback: true;
  dailyBetaOneFeedbackRequiresOperatorReviewBeforeUse: true;
  unsafeFeedbackShortcutsStayBlocked: true;
  feedbackIngestionAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
};

export type DailyBetaOneFeedbackInboxModel = {
  title: "Daily Beta 1 feedback inbox";
  summary: string;
  inboxes: DailyBetaOneFeedbackInbox[];
  boundary: DailyBetaOneFeedbackInboxBoundary;
  feedbackInboxLanguage: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneFeedbackInboxStableKey(
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
