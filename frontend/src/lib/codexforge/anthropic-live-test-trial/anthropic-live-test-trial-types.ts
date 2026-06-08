export type AnthropicLiveTestTrialStatus =
  | "approval-required"
  | "blocked";

export type AnthropicLiveTestTrial = {
  id: string;
  testTrialIdentity: string;
  providerProfile: string;
  modelSummary: string;
  endpointApiFamilySummary: string;
  payloadPrivacyClassification: string;
  estimatedCostTokenGuardrail: string;
  approvalStatus: string;
  expectedResponseShape: string;
  resultCaptureRoute: string;
  blockedReasons: string[];
  status: AnthropicLiveTestTrialStatus;
  advancedTrialDetails: string;
};

export type AnthropicLiveTestTrialBoundary = {
  explicitApprovalRequired: true;
  apiRequestSentFromPageAllowed: false;
  anthropicApiCallsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  openAiCompatibleApiCallsAllowedFromUi: false;
  promptOrFileAutoSendAllowed: false;
  automaticProviderSendAllowed: false;
  autoSpendTokensAllowed: false;
  autoRouteLiveProviderTrafficAllowed: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
  apiKeyLocalStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  providerRegistryMutationAllowed: false;
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

export type AnthropicLiveTestTrialModel = {
  title: "Anthropic live test trial";
  summary: string;
  trials: AnthropicLiveTestTrial[];
  boundary: AnthropicLiveTestTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildAnthropicLiveTestTrialStableKey(
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
