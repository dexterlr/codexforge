export type LocalFirstRouterDryRunLiveMetadataIntegrationStatus =
  | "ready-for-review"
  | "blocked";

export type LocalFirstRouterDryRunLiveMetadataIntegration = {
  id: string;
  integrationIdentity: string;
  sourceCostLatencyCalibration: string;
  sourceRouterRecommendationReview: string;
  sourcePolicyBundleExportReview: string;
  localFirstRoutingPreference: string;
  providerModelFallbackSummary: string;
  privacyPolicyConstraints: string[];
  dryRunDecisionSummary: string;
  approvalRequirement: string;
  blockedReasons: string[];
  status: LocalFirstRouterDryRunLiveMetadataIntegrationStatus;
  advancedMetadataDetails: string;
};

export type LocalFirstRouterDryRunLiveMetadataIntegrationBoundary = {
  routerMetadataAutoRoutesLiveTrafficAllowed: false;
  routerChangesWithoutReviewAllowed: false;
  routerConfigMutationAllowedFromUi: false;
  providerRegistryMutationAllowed: false;
  silentProviderRegistryMutationAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  autoRouteLiveProviderTrafficAllowed: false;
  routerRecommendationsAutoAppliedAllowed: false;
  providerRetryAllowedFromUi: false;
  apiKeyExportAllowed: false;
  secretExportAllowed: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
  apiKeyLocalStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  rawFetchAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type LocalFirstRouterDryRunLiveMetadataIntegrationModel = {
  title: "Local-first router dry run live metadata integration";
  summary: string;
  integrations: LocalFirstRouterDryRunLiveMetadataIntegration[];
  boundary: LocalFirstRouterDryRunLiveMetadataIntegrationBoundary;
  metadataLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalFirstRouterDryRunLiveMetadataIntegrationStableKey(
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
