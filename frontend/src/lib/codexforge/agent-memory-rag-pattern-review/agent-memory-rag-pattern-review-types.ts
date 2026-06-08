export type AgentMemoryRagPatternReview = {
  id: string;
  reviewIdentity: string;
  sourceReferenceSpikes: string[];
  memoryRagPatternLessons: string;
  dataSourceBoundaries: string;
  redactionPrivacyRules: string;
  reviewInboxDependency: string;
  promotionPolicy: string;
  deniedIngestionScope: string;
  extensionArchitectureRoute: string;
  blockedReasons: string[];
  advancedReviewDetails: string;
};

export type AgentMemoryRagPatternReviewBoundary = {
  memoryRagAutoIngestionAllowed: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  memoryPromotionRequiresExplicitReview: true;
  secretRedactionBeforeReviewRequired: true;
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
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
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
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
  renderJobMutationAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type AgentMemoryRagPatternReviewModel = {
  title: "Agent memory RAG pattern review";
  summary: string;
  reviews: AgentMemoryRagPatternReview[];
  boundary: AgentMemoryRagPatternReviewBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildAgentMemoryRagPatternReviewStableKey(
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
