export type CodexForgeExtensionArchitectureReleaseDecision =
  | "proceed"
  | "proceed with fixes"
  | "blocked";

export type CodexForgeExtensionArchitectureDecision = {
  id: string;
  architectureDecisionIdentity: string;
  sourceComparisonSurfaces: string[];
  recommendedExtensionShape: string;
  permissionModel: string;
  auditRecoveryModel: string;
  memoryRagPolicy: string;
  nonGoals: string;
  stagedRolloutRecommendation: string;
  releaseDecision: CodexForgeExtensionArchitectureReleaseDecision;
  releaseDecisionLabel: string;
  nextRecommendedRoute: string;
  blockedReasons: string[];
  advancedDecisionDetails: string;
};

export type CodexForgeExtensionArchitectureDecisionBoundary = {
  extensionArchitectureEnablesPluginsAutomatically: false;
  runtimeExecutionBehindApprovedBoundaries: true;
  pluginRuntimeCreated: false;
  pluginExecutionAllowedFromUi: false;
  mcpToolsEnabled: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  providerRegistryMutationAllowed: false;
  jarvisdRegistryMutationAllowed: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
  thirdPartyLicenseSecurityReviewRequired: true;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerRetryAllowedFromUi: false;
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
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
  renderJobMutationAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type CodexForgeExtensionArchitectureDecisionModel = {
  title: "CodexForge extension architecture decision";
  summary: string;
  decisions: CodexForgeExtensionArchitectureDecision[];
  boundary: CodexForgeExtensionArchitectureDecisionBoundary;
  decisionLanguage: string[];
  advancedDetails: string[];
};

export function buildCodexForgeExtensionArchitectureDecisionStableKey(
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
