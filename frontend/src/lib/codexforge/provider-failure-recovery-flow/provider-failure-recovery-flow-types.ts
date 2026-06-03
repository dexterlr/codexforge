export type ProviderFailureCauseCategory =
  | "credential-reference"
  | "network-or-endpoint"
  | "model-unavailable"
  | "rate-or-quota"
  | "privacy-or-scope"
  | "unknown";

export type ProviderFailureRecoveryCase = {
  id: string;
  failureSummary: string;
  providerAffected: string;
  likelyCauseCategory: ProviderFailureCauseCategory;
  safeRetryChecklist: string[];
  blockedRetryReasons: string[];
  privacySecretsCheck: string;
  spendTokenGuard: string;
  alternateProviderSuggestion: string;
  localFallbackSuggestion: string;
  recoveryHandoff: string;
};

export type ProviderFailureRecoveryBoundary = {
  automaticRetryAllowed: false;
  cloudFallbackWithoutApprovalAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  credentialDisplayAllowed: false;
  providerRegistryMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
};

export type ProviderFailureRecoveryModel = {
  title: "Provider failure recovery flow";
  summary: string;
  cases: ProviderFailureRecoveryCase[];
  boundary: ProviderFailureRecoveryBoundary;
  recoveryLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderFailureRecoveryStableKey(
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
