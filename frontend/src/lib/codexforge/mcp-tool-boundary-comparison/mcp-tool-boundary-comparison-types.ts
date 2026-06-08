export type McpToolBoundaryComparison = {
  id: string;
  comparisonIdentity: string;
  sourcePluginRegistryComparison: string;
  mcpCapabilityCategories: string[];
  permissionBoundaryMapping: string;
  signedRequestAuditMapping: string;
  localRemoteToolRiskSplit: string;
  deniedToolScope: string[];
  approvalRequirement: string;
  memoryRagRoute: string;
  blockedReasons: string[];
  advancedBoundaryDetails: string;
};

export type McpToolBoundaryComparisonBoundary = {
  mcpSupportReviewOnly: true;
  mcpRuntimeCreated: false;
  mcpServerCreated: false;
  mcpClientCreated: false;
  mcpToolsExecutedFromPage: false;
  mcpToolCallsAllowedFromUi: false;
  externalToolsExecutedFromUi: false;
  localCommandsExecutedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  explicitPermissionBoundariesRequired: true;
  signedRequestAuditRequiredBeforeExecution: true;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerRetryAllowedFromUi: false;
  providerRegistryMutationAllowed: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
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
  thirdPartyCodeVendoredOrCopied: false;
};

export type McpToolBoundaryComparisonModel = {
  title: "MCP tool boundary comparison";
  summary: string;
  comparisons: McpToolBoundaryComparison[];
  boundary: McpToolBoundaryComparisonBoundary;
  boundaryLanguage: string[];
  advancedDetails: string[];
};

export function buildMcpToolBoundaryComparisonStableKey(
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
