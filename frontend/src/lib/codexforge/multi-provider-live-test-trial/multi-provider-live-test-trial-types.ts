export type MultiProviderLiveTestTrialStatus =
  | "approval-required"
  | "blocked";

export type MultiProviderLiveTestTrial = {
  id: string;
  multiProviderTrialIdentity: string;
  selectedProviderProfiles: string[];
  modelEndpointSummary: string;
  payloadPrivacyClassification: string;
  budgetCostGuardrail: string;
  routingComparisonIntent: string;
  approvalStatusPerProvider: string[];
  expectedResponseShape: string;
  resultPersistenceRoute: string;
  blockedReasons: string[];
  status: MultiProviderLiveTestTrialStatus;
  advancedComparisonDetails: string;
};

export type MultiProviderLiveTestTrialBoundary = {
  explicitApprovalPerProviderRequired: true;
  providerRequestSentFromPageAllowed: false;
  providerApiCallsAllowedFromUi: false;
  openAiCompatibleApiCallsAllowedFromUi: false;
  anthropicApiCallsAllowedFromUi: false;
  promptOrFileAutoSendAllowed: false;
  automaticProviderSendAllowed: false;
  autoSpendTokensAllowed: false;
  autoRouteLiveProviderTrafficAllowed: false;
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

export type MultiProviderLiveTestTrialModel = {
  title: "Multi-provider live test trial";
  summary: string;
  trials: MultiProviderLiveTestTrial[];
  boundary: MultiProviderLiveTestTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildMultiProviderLiveTestTrialStableKey(
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
