export type DailyBetaActivationEvidenceReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationEvidenceReview = {
  id: string;
  activationEvidenceIdentity: string;
  evidenceGroups: string[];
  liveBoundaryEvidenceChecklist: string[];
  rolloutEvidenceChecklist: string[];
  citationSourceChecklist: string[];
  redactionPrivacyChecklist: string[];
  deniedEvidenceActions: string[];
  unresolvedEvidenceBlockers: string[];
  activationResultReviewRoute: string;
  activationRecoveryReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationEvidenceReviewStatus;
  advancedDailyBetaActivationEvidenceReviewDetails: string;
};

export type DailyBetaActivationEvidenceReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  evidenceIngestionAllowedFromUi: false;
  outputStorageAllowed: false;
  providerOutputStorageAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  credentialStorageAllowed: false;
};

export type DailyBetaActivationEvidenceReviewModel = {
  title: "Daily Beta activation evidence review";
  summary: string;
  evidenceReviews: DailyBetaActivationEvidenceReview[];
  boundary: DailyBetaActivationEvidenceReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationEvidenceReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
