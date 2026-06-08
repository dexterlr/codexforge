export type ProviderFailureRetryTrialStatus =
  | "approval-required"
  | "blocked";

export type ProviderFailureRetryTrial = {
  id: string;
  retryTrialIdentity: string;
  sourceProviderTestResult: string;
  failureCategory: string;
  providerModelSummary: string;
  retryEligibility: string;
  blockedRetryReasons: string[];
  adjustedPayloadPrivacyNote: string;
  costGuardrail: string;
  requiredApprovalCopy: string;
  nextRecommendedRoute: string;
  status: ProviderFailureRetryTrialStatus;
  advancedRetryDetails: string;
};

export type ProviderFailureRetryTrialBoundary = {
  retryAutomaticAllowed: false;
  providerRetryAllowedFromUi: false;
  retryRequestSentFromPageAllowed: false;
  providerRequestSentFromPageAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerRegistryMutationAllowed: false;
  silentProviderRegistryMutationAllowed: false;
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

export type ProviderFailureRetryTrialModel = {
  title: "Provider failure retry trial";
  summary: string;
  trials: ProviderFailureRetryTrial[];
  boundary: ProviderFailureRetryTrialBoundary;
  retryLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderFailureRetryTrialStableKey(
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
