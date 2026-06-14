export type LocalModelExecutionBoundaryReadinessReviewStatus = "ready-for-review" | "blocked";

export type LocalModelExecutionBoundaryReadinessReview = {
  id: string;
  localModelExecutionBoundaryIdentity: string;
  localModelBoundaryGroups: string[];
  approvalGateChecklist: string[];
  localBridgeChecklist: string[];
  promptPrivacyChecklist: string[];
  resultEvidenceChecklist: string[];
  deniedLocalModelExecutionActions: string[];
  unresolvedLocalModelBoundaryBlockers: string[];
  connectorExecutionReadinessRoute: string;
  automationExecutionReadinessRoute: string;
  nextRecommendedAction: string;
  status: LocalModelExecutionBoundaryReadinessReviewStatus;
  advancedLocalModelExecutionBoundaryDetails: string;
};

export type LocalModelExecutionBoundaryReadinessReviewBoundary = {
  reviewOnly: true; approvalRequired: true; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; promptSendingAllowedFromUi: false; localModelOutputStorageAllowedFromUi: false; workflowExecutionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type LocalModelExecutionBoundaryReadinessReviewModel = {
  title: "Local model execution boundary readiness review";
  summary: string;
  localModelReviews: LocalModelExecutionBoundaryReadinessReview[];
  boundary: LocalModelExecutionBoundaryReadinessReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildLocalModelExecutionBoundaryReadinessReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
