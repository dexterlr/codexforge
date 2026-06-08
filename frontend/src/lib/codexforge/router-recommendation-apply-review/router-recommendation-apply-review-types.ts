export type RouterRecommendationApplyReviewStatus =
  | "approval-required"
  | "blocked";

export type RouterRecommendationApplyReviewItem = {
  id: string;
  reviewIdentity: string;
  sourceCalibrationDependency: string;
  providerModelRecommendationSummary: string;
  routingReason: string;
  costLatencyEvidenceSummary: string;
  reliabilitySignal: string;
  privacyPolicyImpact: string;
  approvalRequirement: string;
  rollbackNote: string;
  blockedReasons: string[];
  status: RouterRecommendationApplyReviewStatus;
  advancedRecommendationDetails: string;
};

export type RouterRecommendationApplyReviewBoundary = {
  routerRecommendationsAutoAppliedAllowed: false;
  routerConfigMutationAllowedFromUi: false;
  providerRegistryMutationAllowed: false;
  silentProviderRegistryMutationAllowed: false;
  providerRegistryChangeWithoutReviewAllowed: false;
  liveTrafficRoutedFromPageAllowed: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
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

export type RouterRecommendationApplyReviewModel = {
  title: "Router recommendation apply review";
  summary: string;
  recommendations: RouterRecommendationApplyReviewItem[];
  boundary: RouterRecommendationApplyReviewBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildRouterRecommendationApplyReviewStableKey(
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
