export type DailyBetaOneLaunchEvidenceReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneLaunchEvidenceReview = {
  id: string;
  launchEvidenceReviewIdentity: string;
  evidenceGroups: string[];
  liveBoundaryEvidenceChecklist: string[];
  rolloutEvidenceChecklist: string[];
  citationSourceChecklist: string[];
  redactionPrivacyChecklist: string[];
  deniedEvidenceActions: string[];
  unresolvedEvidenceBlockers: string[];
  launchResultReviewRoute: string;
  launchCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneLaunchEvidenceReviewStatus;
  advancedDailyBetaOneLaunchEvidenceReviewDetails: string;
};

export type DailyBetaOneLaunchEvidenceReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  evidenceIngestionAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  localModelOutputStorageAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  testOutputStorageAllowedFromUi: false;
  resultPersistenceAllowedFromUi: false;
  dailyBetaOneLaunchAllowedFromUi: false;
  launchApprovalAutomationAllowedFromUi: false;
  launchDryRunExecutionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneLaunchEvidenceReviewModel = {
  title: "Daily Beta 1 launch evidence review";
  summary: string;
  launchEvidenceReviews: DailyBetaOneLaunchEvidenceReview[];
  boundary: DailyBetaOneLaunchEvidenceReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneLaunchEvidenceReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
