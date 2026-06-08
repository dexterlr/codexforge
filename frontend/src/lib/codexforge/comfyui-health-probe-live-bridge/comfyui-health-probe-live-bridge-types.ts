export type ComfyUiHealthProbeLiveBridgeStatus =
  | "approved-boundary-required"
  | "ready-for-review"
  | "blocked";

export type ComfyUiHealthProbeLiveBridge = {
  id: string;
  bridgeIdentity: string;
  localEndpointSummary: string;
  approvedLocalBoundaryDependency: string;
  healthProbeStatus: string;
  versionCapabilitySummary: string;
  timeoutPolicy: string;
  redactionStatus: string;
  recoveryRoute: string;
  metadataBridgeRoute: string;
  blockedReasons: string[];
  status: ComfyUiHealthProbeLiveBridgeStatus;
  advancedHealthDetails: string;
};

export type ComfyUiHealthProbeLiveBridgeBoundary = {
  approvedLocalBoundaryRequired: true;
  comfyUiJobSubmissionAllowedFromPage: false;
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

export type ComfyUiHealthProbeLiveBridgeModel = {
  title: "ComfyUI health probe live bridge";
  summary: string;
  bridges: ComfyUiHealthProbeLiveBridge[];
  boundary: ComfyUiHealthProbeLiveBridgeBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildComfyUiHealthProbeLiveBridgeStableKey(
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
