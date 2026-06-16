export type EndToEndRolloutFeedbackInboxStatus = "ready-for-review" | "blocked";

export type EndToEndRolloutFeedbackInbox = {
  id: string;
  rolloutFeedbackInboxIdentity: string;
  feedbackGroups: string[];
  usabilityFeedbackLane: string[];
  safetyFeedbackLane: string[];
  rolloutFeedbackLane: string[];
  releaseFeedbackLane: string[];
  deniedFeedbackActions: string[];
  unresolvedFeedbackBlockers: string[];
  rolloutRegressionRoute: string;
  rolloutHardeningRoute: string;
  nextRecommendedAction: string;
  status: EndToEndRolloutFeedbackInboxStatus;
  advancedRolloutFeedbackInboxDetails: string;
};

export type EndToEndRolloutFeedbackInboxBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  feedbackIngestionAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  rolloutExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type EndToEndRolloutFeedbackInboxModel = {
  title: "End-to-end rollout feedback inbox";
  summary: string;
  inboxes: EndToEndRolloutFeedbackInbox[];
  boundary: EndToEndRolloutFeedbackInboxBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildEndToEndRolloutFeedbackInboxStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
