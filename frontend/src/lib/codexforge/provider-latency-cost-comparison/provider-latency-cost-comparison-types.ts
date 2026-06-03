export type ProviderLatencyCostClassification =
  | "local-runtime"
  | "cloud-provider"
  | "cloud-aggregator"
  | "blocked-until-reviewed";

export type ProviderLatencyCostConfidence =
  | "low"
  | "medium"
  | "high";

export type ProviderLatencyCostComparisonRow = {
  id: string;
  providerComparisonRow: string;
  latencySummary: string;
  tokenEstimate: string;
  costEstimate: string;
  qualityNote: string;
  localVsCloudClassification: ProviderLatencyCostClassification;
  privacyNote: string;
  confidenceLevel: ProviderLatencyCostConfidence;
  nextRecommendedRoute: string;
  advancedComparisonDetails: string;
};

export type ProviderLatencyCostComparisonBoundary = {
  providerApiCallsAllowedFromUi: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  costEstimateBillingTruthAllowed: false;
};

export type ProviderLatencyCostComparisonModel = {
  title: "Provider latency cost comparison";
  summary: string;
  rows: ProviderLatencyCostComparisonRow[];
  boundary: ProviderLatencyCostComparisonBoundary;
  comparisonLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderLatencyCostComparisonStableKey(
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
