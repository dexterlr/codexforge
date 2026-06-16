export type DailyBetaActivationResultReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationResultReview = {
  id: string;
  activationResultIdentity: string;
  resultGroups: string[];
  acceptanceChecklist: string[];
  rejectionChecklist: string[];
  reuseChecklist: string[];
  safetyReviewChecklist: string[];
  deniedResultActions: string[];
  unresolvedResultBlockers: string[];
  activationRecoveryReviewRoute: string;
  activationHardeningRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationResultReviewStatus;
  advancedDailyBetaActivationResultReviewDetails: string;
};

export type DailyBetaActivationResultReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  liveOutputStorageAllowedFromUi: false;
  resultIngestionAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaActivationResultReviewModel = {
  title: "Daily Beta activation result review";
  summary: string;
  resultReviews: DailyBetaActivationResultReview[];
  boundary: DailyBetaActivationResultReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationResultReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
