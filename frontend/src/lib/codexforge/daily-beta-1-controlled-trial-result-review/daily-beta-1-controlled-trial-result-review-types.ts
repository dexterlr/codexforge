export type DailyBetaOneControlledTrialResultReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneControlledTrialResultReview = {
  id: string;
  controlledTrialResultReviewIdentity: string;
  resultGroups: string[];
  trialEvidenceChecklist: string[];
  resultAcceptanceChecklist: string[];
  resultRejectionChecklist: string[];
  resultReuseChecklist: string[];
  deniedResultActions: string[];
  unresolvedResultBlockers: string[];
  recoveryReviewRoute: string;
  hardeningRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneControlledTrialResultReviewStatus;
  advancedControlledTrialResultReviewDetails: string;
};

export type DailyBetaOneControlledTrialResultReviewBoundary = {
  reviewOnly: true; approvalRequired: true; controlledTrialExecutionAllowedFromUi: false; resultStorageAllowedFromUi: false; resultAcceptanceAutomationAllowedFromUi: false; workflowExecutionAllowedFromUi: false; dailyBetaOneLaunchAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; memoryMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type DailyBetaOneControlledTrialResultReviewModel = {
  title: "Daily Beta 1 controlled trial result review";
  summary: string;
  resultReviews: DailyBetaOneControlledTrialResultReview[];
  boundary: DailyBetaOneControlledTrialResultReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneControlledTrialResultReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
