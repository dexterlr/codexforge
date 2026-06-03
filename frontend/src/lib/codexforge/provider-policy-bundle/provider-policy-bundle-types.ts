export type ProviderPolicyBundleReviewStatus =
  | "ready-for-review"
  | "needs-approval"
  | "blocked";

export type ProviderPolicyBundle = {
  id: string;
  bundleIdentity: string;
  coveredProviders: string[];
  budgetGuardrailSummary: string;
  privacyClassifierSummary: string;
  auditLogPolicySummary: string;
  settingsExportImportPolicy: string;
  routerRecommendationPolicy: string;
  approvalRequirements: string[];
  excludedSecretFields: string[];
  reviewHandoff: string;
  reviewStatus: ProviderPolicyBundleReviewStatus;
  advancedPolicyDetails: string;
};

export type ProviderPolicyBundleBoundary = {
  policyBundlesAutoAppliedAllowed: false;
  providerRegistryMutationAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  secretsIncludedAllowed: false;
  settingsAutoExportAllowed: false;
  settingsAutoImportAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  arbitraryFileBrowsingAllowed: false;
};

export type ProviderPolicyBundleModel = {
  title: "Provider policy bundle";
  summary: string;
  bundles: ProviderPolicyBundle[];
  boundary: ProviderPolicyBundleBoundary;
  bundleLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderPolicyBundleStableKey(
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
