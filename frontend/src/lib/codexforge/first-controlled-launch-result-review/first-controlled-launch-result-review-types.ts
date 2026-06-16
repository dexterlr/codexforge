export type FirstControlledLaunchResultReviewStatus = "ready-for-review" | "blocked";

export type FirstControlledLaunchResultReview = {
  id: string;
  controlledLaunchResultIdentity: string;
  resultGroups: string[];
  acceptanceChecklist: string[];
  rejectionChecklist: string[];
  reuseChecklist: string[];
  safetyReviewChecklist: string[];
  deniedResultActions: string[];
  unresolvedResultBlockers: string[];
  controlledLaunchRecoveryRoute: string;
  controlledLaunchHardeningRoute: string;
  nextRecommendedAction: string;
  status: FirstControlledLaunchResultReviewStatus;
  advancedFirstControlledLaunchResultReviewDetails: string;
};

export type FirstControlledLaunchResultReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  liveOutputStorageAllowedFromUi: false;
  resultIngestionAllowedFromUi: false;
  resultPersistenceAllowedFromUi: false;
  resultReuseAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type FirstControlledLaunchResultReviewModel = {
  title: "First controlled launch result review";
  summary: string;
  firstControlledLaunchResultReviews: FirstControlledLaunchResultReview[];
  boundary: FirstControlledLaunchResultReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstControlledLaunchResultReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
