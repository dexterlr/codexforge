export type EndToEndWorkflowEvidenceReviewStatus = "ready-for-review" | "blocked";

export type EndToEndWorkflowEvidenceReview = {
  id: string;
  endToEndWorkflowEvidenceIdentity: string;
  evidenceGroups: string[];
  providerLocalConnectorFileTestEvidenceChecklist: string[];
  citationSourceChecklist: string[];
  redactionPrivacyChecklist: string[];
  operatorApprovalChecklist: string[];
  deniedEvidenceActions: string[];
  unresolvedEvidenceBlockers: string[];
  endToEndResultReviewRoute: string;
  endToEndRecoveryReviewRoute: string;
  nextRecommendedAction: string;
  status: EndToEndWorkflowEvidenceReviewStatus;
  advancedEvidenceReviewDetails: string;
};

export type EndToEndWorkflowEvidenceReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  evidenceIngestionAllowedFromUi: false;
  evidenceAutoIngestionAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  localModelOutputStorageAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  testOutputStorageAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type EndToEndWorkflowEvidenceReviewModel = {
  title: "End-to-end workflow evidence review";
  summary: string;
  evidenceReviews: EndToEndWorkflowEvidenceReview[];
  boundary: EndToEndWorkflowEvidenceReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildEndToEndWorkflowEvidenceReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
