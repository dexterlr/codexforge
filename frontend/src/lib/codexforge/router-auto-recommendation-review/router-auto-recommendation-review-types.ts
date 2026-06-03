export type RouterAutoRecommendationConfidence =
  | "low"
  | "medium"
  | "high";

export type RouterAutoRecommendationReviewItem = {
  id: string;
  taskSummary: string;
  candidateProviderModel: string;
  recommendationRationale: string;
  localFirstPreference: string;
  costLatencyQualityTradeoff: string;
  privacyReview: string;
  blockedReasons: string[];
  approvalRequirement: string;
  applyHandoff: string;
  fallbackRoute: string;
  confidenceLevel: RouterAutoRecommendationConfidence;
};

export type RouterAutoRecommendationReviewBoundary = {
  recommendationsAutoAppliedAllowed: false;
  liveTrafficAutoRoutedAllowed: false;
  routerConfigMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  tokenSpendAllowedFromUi: false;
  providerRegistryMutationAllowed: false;
};

export type RouterAutoRecommendationReviewModel = {
  title: "Router auto-recommendation review";
  summary: string;
  recommendations: RouterAutoRecommendationReviewItem[];
  boundary: RouterAutoRecommendationReviewBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildRouterAutoRecommendationReviewStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
