export type ComfyUiMetadataLiveBridgeStatus =
  | "approved-boundary-required"
  | "ready-for-workflow-validation"
  | "blocked";

export type ComfyUiMetadataLiveBridge = {
  id: string;
  bridgeIdentity: string;
  healthProbeDependency: string;
  approvedLocalBoundaryDependency: string;
  metadataSourceSummary: string;
  versionCapabilitySummary: string;
  nodeModelAvailabilitySummary: string;
  timeoutPolicy: string;
  redactionStatus: string;
  workflowValidatorRoute: string;
  blockedReasons: string[];
  status: ComfyUiMetadataLiveBridgeStatus;
  advancedMetadataDetails: string;
};

export type ComfyUiMetadataLiveBridgeBoundary = {
  approvedLocalBoundaryRequired: true;
  metadataReadsAllowedWithoutApproval: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
  arbitraryLocalEndpointCallsAllowedFromUi: false;
  rawComfyUiPollingLoopsAllowedFromUi: false;
  localEndpointDisplayAllowed: false;
  secretDisplayAllowed: false;
  localFileMutationAllowedFromUi: false;
  localProcessMutationAllowedFromUi: false;
  processKillRestartShutdownAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  autoRouteLiveProviderTrafficAllowed: false;
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
  packageInstallAllowedFromUi: false;
};

export type ComfyUiMetadataLiveBridgeModel = {
  title: "ComfyUI metadata live bridge";
  summary: string;
  bridges: ComfyUiMetadataLiveBridge[];
  boundary: ComfyUiMetadataLiveBridgeBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildComfyUiMetadataLiveBridgeStableKey(
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
