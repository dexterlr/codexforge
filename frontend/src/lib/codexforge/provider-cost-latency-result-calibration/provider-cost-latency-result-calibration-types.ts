export type ProviderCostLatencyResultCalibrationStatus =
  | "review-required"
  | "blocked";

export type ProviderCostLatencyResultCalibrationRecord = {
  id: string;
  calibrationIdentity: string;
  sourceProviderTestResults: string;
  providerModelSummary: string;
  tokenCostEstimateSummary: string;
  latencySummary: string;
  reliabilitySignal: string;
  budgetGuardrailStatus: string;
  routerRecommendationRoute: string;
  policyImpactNote: string;
  blockedReasons: string[];
  status: ProviderCostLatencyResultCalibrationStatus;
  advancedMetricDetails: string;
};

export type ProviderCostLatencyResultCalibrationBoundary = {
  autoUpdateRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  providerPolicyAutoChangeAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  autoSpendTokensAllowed: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerRegistryMutationAllowed: false;
  silentProviderRegistryMutationAllowed: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
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

export type ProviderCostLatencyResultCalibrationModel = {
  title: "Provider cost latency result calibration";
  summary: string;
  records: ProviderCostLatencyResultCalibrationRecord[];
  boundary: ProviderCostLatencyResultCalibrationBoundary;
  calibrationLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderCostLatencyResultCalibrationStableKey(
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
