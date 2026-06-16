export type FirstControlledLaunchEvidenceReviewStatus = "ready-for-review" | "blocked";

export type FirstControlledLaunchEvidenceReview = {
  id: string;
  controlledLaunchEvidenceIdentity: string;
  evidenceGroups: string[];
  boundaryEvidenceChecklist: string[];
  launchMonitoringEvidenceChecklist: string[];
  citationSourceChecklist: string[];
  redactionPrivacyChecklist: string[];
  deniedEvidenceActions: string[];
  unresolvedEvidenceBlockers: string[];
  controlledLaunchResultRoute: string;
  controlledLaunchRecoveryRoute: string;
  nextRecommendedAction: string;
  status: FirstControlledLaunchEvidenceReviewStatus;
  advancedFirstControlledLaunchEvidenceReviewDetails: string;
};

export type FirstControlledLaunchEvidenceReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  evidenceIngestionAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  localModelOutputStorageAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  testOutputStorageAllowedFromUi: false;
  resultPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type FirstControlledLaunchEvidenceReviewModel = {
  title: "First controlled launch evidence review";
  summary: string;
  firstControlledLaunchEvidenceReviews: FirstControlledLaunchEvidenceReview[];
  boundary: FirstControlledLaunchEvidenceReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstControlledLaunchEvidenceReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
