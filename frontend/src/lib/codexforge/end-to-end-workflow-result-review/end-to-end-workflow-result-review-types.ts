export type EndToEndWorkflowResultReviewStatus = "ready-for-review" | "blocked";

export type EndToEndWorkflowResultReview = {
  id: string;
  endToEndWorkflowResultIdentity: string;
  resultGroups: string[];
  acceptanceChecklist: string[];
  rejectionChecklist: string[];
  reuseChecklist: string[];
  safetyReviewChecklist: string[];
  deniedResultActions: string[];
  unresolvedResultBlockers: string[];
  endToEndRecoveryReviewRoute: string;
  endToEndHardeningRoute: string;
  nextRecommendedAction: string;
  status: EndToEndWorkflowResultReviewStatus;
  advancedResultReviewDetails: string;
};

export type EndToEndWorkflowResultReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  resultStorageAllowedFromUi: false;
  resultIngestionAllowedFromUi: false;
  resultAcceptanceAutomationAllowedFromUi: false;
  outputStorageAllowed: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  credentialStorageAllowed: false;
};

export type EndToEndWorkflowResultReviewModel = {
  title: "End-to-end workflow result review";
  summary: string;
  resultReviews: EndToEndWorkflowResultReview[];
  boundary: EndToEndWorkflowResultReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildEndToEndWorkflowResultReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
