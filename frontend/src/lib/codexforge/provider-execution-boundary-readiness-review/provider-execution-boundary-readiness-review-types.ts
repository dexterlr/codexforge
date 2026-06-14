export type ProviderExecutionBoundaryReadinessReviewStatus = "ready-for-review" | "blocked";

export type ProviderExecutionBoundaryReadinessReview = {
  id: string;
  providerExecutionBoundaryIdentity: string;
  providerBoundaryGroups: string[];
  approvalGateChecklist: string[];
  promptPrivacyChecklist: string[];
  budgetRateLimitChecklist: string[];
  resultEvidenceChecklist: string[];
  deniedProviderExecutionActions: string[];
  unresolvedProviderBoundaryBlockers: string[];
  localModelExecutionReadinessRoute: string;
  connectorExecutionReadinessRoute: string;
  nextRecommendedAction: string;
  status: ProviderExecutionBoundaryReadinessReviewStatus;
  advancedProviderExecutionBoundaryDetails: string;
};

export type ProviderExecutionBoundaryReadinessReviewBoundary = {
  reviewOnly: true; approvalRequired: true; providerApiCallsAllowedFromUi: false; providerTrafficRoutingAllowedFromUi: false; promptSendingAllowedFromUi: false; providerOutputStorageAllowedFromUi: false; workflowExecutionAllowedFromUi: false; providerCredentialStorageAllowedFromUi: false; localModelCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type ProviderExecutionBoundaryReadinessReviewModel = {
  title: "Provider execution boundary readiness review";
  summary: string;
  providerReviews: ProviderExecutionBoundaryReadinessReview[];
  boundary: ProviderExecutionBoundaryReadinessReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildProviderExecutionBoundaryReadinessReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
