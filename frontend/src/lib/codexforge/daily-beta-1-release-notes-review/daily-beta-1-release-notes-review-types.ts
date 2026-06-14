export type DailyBetaOneReleaseNotesReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneReleaseNotesReview = {
  id: string;
  dailyBetaOneReleaseNotesIdentity: string;
  releaseNoteGroups: string[];
  userVisibleChangeChecklist: string[];
  safetyLimitationChecklist: string[];
  knownBlockerChecklist: string[];
  validationEvidenceChecklist: string[];
  deniedReleaseNoteActions: string[];
  unresolvedReleaseNoteBlockers: string[];
  operatorHandoffPacketRoute: string;
  finalSafetyReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneReleaseNotesReviewStatus;
  advancedDailyBetaOneReleaseNotesReviewDetails: string;
};

export type DailyBetaOneReleaseNotesReviewBoundary = {
  reviewOnly: true; approvalRequired: true; actionExecutionAllowedFromUi: false; workflowExecutionAllowedFromUi: false; dailyBetaOneLaunchAllowedFromUi: false; rolloutExecutionAllowedFromUi: false; goLiveAllowedFromUi: false; approvalAutomationAllowedFromUi: false; approvalDecisionPersistenceAllowedFromUi: false; releaseSignoffAutomationAllowedFromUi: false; finalSafetySignoffAutomationAllowedFromUi: false; regressionTestExecutionAllowedFromUi: false; documentationPublishAllowedFromUi: false; releaseNotesPublishAllowedFromUi: false; handoffSendAllowedFromUi: false; feedbackIngestionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; memoryMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type DailyBetaOneReleaseNotesReviewModel = {
  title: "Daily Beta 1 release notes review";
  summary: string;
  releaseNotesReviews: DailyBetaOneReleaseNotesReview[];
  boundary: DailyBetaOneReleaseNotesReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneReleaseNotesReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
