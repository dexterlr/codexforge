export type DailyBetaActivationFeedbackInboxStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationFeedbackInbox = {
  id: string;
  activationFeedbackInboxIdentity: string;
  feedbackGroups: string[];
  usabilityFeedbackLane: string[];
  safetyFeedbackLane: string[];
  activationFeedbackLane: string[];
  releaseFeedbackLane: string[];
  deniedFeedbackActions: string[];
  unresolvedFeedbackBlockers: string[];
  regressionReviewRoute: string;
  finalHardeningRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationFeedbackInboxStatus;
  advancedDailyBetaActivationFeedbackInboxDetails: string;
};

export type DailyBetaActivationFeedbackInboxBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  feedbackIngestionAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaActivationFeedbackInboxModel = {
  title: "Daily Beta activation feedback inbox";
  summary: string;
  feedbackInboxes: DailyBetaActivationFeedbackInbox[];
  boundary: DailyBetaActivationFeedbackInboxBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationFeedbackInboxStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
