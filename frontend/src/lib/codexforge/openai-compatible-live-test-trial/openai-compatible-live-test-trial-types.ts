export type OpenAiCompatibleLiveTestTrialStatus =
  | "approval-required"
  | "blocked";

export type OpenAiCompatibleLiveTestTrial = {
  id: string;
  testTrialIdentity: string;
  providerProfile: string;
  baseUrlEndpointSummary: string;
  modelSummary: string;
  payloadPrivacyClassification: string;
  estimatedCostTokenGuardrail: string;
  approvalStatus: string;
  expectedResponseShape: string;
  resultCaptureRoute: string;
  blockedReasons: string[];
  status: OpenAiCompatibleLiveTestTrialStatus;
  advancedTrialDetails: string;
};

export type OpenAiCompatibleLiveTestTrialBoundary = {
  explicitApprovalRequired: true;
  apiRequestSentFromPageAllowed: false;
  openAiCompatibleApiCallsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  promptOrFileAutoSendAllowed: false;
  automaticProviderSendAllowed: false;
  autoSpendTokensAllowed: false;
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

export type OpenAiCompatibleLiveTestTrialModel = {
  title: "OpenAI compatible live test trial";
  summary: string;
  trials: OpenAiCompatibleLiveTestTrial[];
  boundary: OpenAiCompatibleLiveTestTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildOpenAiCompatibleLiveTestTrialStableKey(
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
