export type ProviderBudgetGuardrailReviewStatus =
  | "ready-for-review"
  | "warning"
  | "blocked";

export type ProviderBudgetGuardrailRecord = {
  id: string;
  providerProfileSummary: string;
  budgetScope: string;
  tokenLimit: string;
  spendLimit: string;
  perTestGuardrail: string;
  perDayPerSessionGuardrail: string;
  warningThreshold: string;
  blockedReason: string;
  approvalRequirement: string;
  reviewHandoff: string;
  reviewStatus: ProviderBudgetGuardrailReviewStatus;
  advancedGuardrailDetails: string;
};

export type ProviderBudgetGuardrailBoundary = {
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  budgetEstimateBillingTruthAllowed: false;
  providerRegistryMutationAllowed: false;
  routerConfigMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
  settingsAutoImportAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  arbitraryFileBrowsingAllowed: false;
};

export type ProviderBudgetGuardrailsModel = {
  title: "Provider budget guardrails";
  summary: string;
  guardrails: ProviderBudgetGuardrailRecord[];
  boundary: ProviderBudgetGuardrailBoundary;
  guardrailLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderBudgetGuardrailsStableKey(
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
