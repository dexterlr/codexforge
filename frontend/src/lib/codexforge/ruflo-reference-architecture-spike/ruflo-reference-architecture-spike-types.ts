export type RufloReferenceArchitectureSpike = {
  id: string;
  spikeIdentity: string;
  referenceScope: string;
  agentRegistryLessons: string;
  pluginMcpBoundaryLessons: string;
  memoryRagLessons: string;
  localRemoteModelRoutingLessons: string;
  risksGaps: string;
  codexForgeFitAssessment: string;
  nonGoals: string;
  nextRecommendedRoute: string;
  advancedReferenceDetails: string;
};

export type RufloReferenceArchitectureSpikeBoundary = {
  rufloCodeVendoredOrCopied: false;
  runtimeIntegrationAdded: false;
  rufloDependenciesAdded: false;
  externalToolsExecutedFromUi: false;
  networkDataFetchedFromUi: false;
  licenseSecurityReviewRequired: true;
  futureAdoptionRequiresExplicitImplementation: true;
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
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  arbitraryLocalEndpointCallsAllowedFromUi: false;
  rawComfyUiPollingLoopsAllowedFromUi: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
  renderJobMutationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  localFileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  artifactDeletionAllowed: false;
  patchApplyAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  localProcessMutationAllowedFromUi: false;
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type RufloReferenceArchitectureSpikeModel = {
  title: "Ruflo reference architecture spike";
  summary: string;
  spikes: RufloReferenceArchitectureSpike[];
  boundary: RufloReferenceArchitectureSpikeBoundary;
  referenceLanguage: string[];
  advancedDetails: string[];
};

export function buildRufloReferenceArchitectureSpikeStableKey(
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
