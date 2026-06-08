export type AgentPluginRegistryComparison = {
  id: string;
  comparisonIdentity: string;
  sourceReferenceSpikes: string[];
  codexForgeRegistryRequirements: string;
  pluginManifestLessons: string;
  permissionScopeLessons: string;
  auditRecoveryRequirements: string;
  sandboxingNonGoals: string;
  risksGaps: string[];
  mcpBoundaryRoute: string;
  nextRecommendedRoute: string;
  advancedComparisonDetails: string;
};

export type AgentPluginRegistryComparisonBoundary = {
  pluginComparisonExecutesPlugins: false;
  pluginRuntimeCreated: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
  rufloCodeVendoredOrCopied: false;
  odysseusCodeVendoredOrCopied: false;
  rufloRuntimeIntegrationAdded: false;
  odysseusRuntimeIntegrationAdded: false;
  licenseSecurityReviewRequired: true;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerRetryAllowedFromUi: false;
  providerRegistryMutationAllowed: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  jarvisdPermissionAutoGrantAllowed: false;
  daemonProcessCreationAllowedFromFrontend: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  localProcessMutationAllowedFromUi: false;
  processKillRestartShutdownAllowedFromUi: false;
  arbitraryLocalEndpointCallsAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  artifactDeletionAllowed: false;
  patchApplyAllowedFromUi: false;
  apiKeyExportAllowed: false;
  secretExportAllowed: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
  apiKeyLocalStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  memoryAutoPromotionAllowed: false;
  memoryRagIngestionAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
  renderJobMutationAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type AgentPluginRegistryComparisonModel = {
  title: "Agent plugin registry comparison";
  summary: string;
  comparisons: AgentPluginRegistryComparison[];
  boundary: AgentPluginRegistryComparisonBoundary;
  registryLanguage: string[];
  advancedDetails: string[];
};

export function buildAgentPluginRegistryComparisonStableKey(
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
