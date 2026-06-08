export type LocalOutputArtifactCaptureLiveBridgeStatus =
  | "capture-ready"
  | "needs review"
  | "blocked";

export type LocalOutputArtifactCaptureLiveBridge = {
  id: string;
  bridgeIdentity: string;
  sourceGenerationResult: string;
  approvedOutputRootDependency: string;
  artifactTypeSummary: string;
  capturedArtifactSummary: string;
  excludedPathsSummary: string;
  redactionSafetyStatus: string;
  thumbnailRoute: string;
  exportPackageRoute: string;
  blockedReasons: string[];
  status: LocalOutputArtifactCaptureLiveBridgeStatus;
  advancedArtifactDetails: string;
};

export type LocalOutputArtifactCaptureLiveBridgeBoundary = {
  approvedOutputRootsOnly: true;
  arbitraryLocalBrowsingAllowed: false;
  captureMutatesArtifacts: false;
  artifactDeletionAllowed: false;
  autoOpenLocalFilesAllowed: false;
  secretValuesDisplayedAllowed: false;
  fileMutationAllowedFromUi: false;
  localFileMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  arbitraryLocalEndpointCallsAllowedFromUi: false;
  rawComfyUiPollingLoopsAllowedFromUi: false;
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
  secretsDisplayedAllowed: false;
  apiKeyLocalStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  rawFetchAllowedFromUi: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  packageInstallAllowedFromUi: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
};

export type LocalOutputArtifactCaptureLiveBridgeModel = {
  title: "Local output artifact capture live bridge";
  summary: string;
  bridges: LocalOutputArtifactCaptureLiveBridge[];
  boundary: LocalOutputArtifactCaptureLiveBridgeBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalOutputArtifactCaptureLiveBridgeStableKey(
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
