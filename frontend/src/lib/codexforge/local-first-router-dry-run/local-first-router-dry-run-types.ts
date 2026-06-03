export type LocalFirstRouterDryRunDecisionStatus =
  | "local-first"
  | "cloud-review-needed"
  | "blocked";

export type LocalFirstRouterDryRunScenario = {
  id: string;
  taskSummary: string;
  candidateLocalProviderModel: string;
  candidateCloudProviderModel: string;
  localFirstDecision: string;
  privacyClass: string;
  budgetGuardrailResult: string;
  capabilityFit: string;
  fallbackRoute: string;
  blockedReasons: string[];
  approvalHandoff: string;
  decisionStatus: LocalFirstRouterDryRunDecisionStatus;
  advancedRoutingDetails: string;
};

export type LocalFirstRouterDryRunBoundary = {
  dryRunLiveTrafficAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  routerConfigMutationAllowedFromUi: false;
  providerRegistryMutationAllowed: false;
  settingsAutoImportAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  arbitraryFileBrowsingAllowed: false;
};

export type LocalFirstRouterDryRunModel = {
  title: "Local-first router dry run";
  summary: string;
  scenarios: LocalFirstRouterDryRunScenario[];
  boundary: LocalFirstRouterDryRunBoundary;
  dryRunLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalFirstRouterDryRunStableKey(
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
