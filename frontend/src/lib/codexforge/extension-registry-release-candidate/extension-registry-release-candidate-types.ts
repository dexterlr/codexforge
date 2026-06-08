export type ExtensionRegistryReleaseDecision =
  | "ready"
  | "ready with fixes"
  | "blocked";

export type ExtensionRegistryReleaseCandidate = {
  id: string;
  releaseCandidateIdentity: string;
  coveredExtensionSurfaces: string[];
  manifestSchemaReadiness: string;
  permissionPolicyReadiness: string;
  sandboxBoundaryReadiness: string;
  auditRecoveryReadiness: string;
  licenseSecurityReviewReadiness: string;
  knownGaps: string[];
  releaseDecision: ExtensionRegistryReleaseDecision;
  releaseDecisionLabel: string;
  nextRecommendedRoute: string;
  blockedReasons: string[];
  advancedReleaseDetails: string;
};

export type ExtensionRegistryReleaseCandidateBoundary = {
  registryReleaseCandidateReviewOnly: true;
  extensionsInstalledAutomatically: false;
  extensionsEnabledAutomatically: false;
  runtimeExecutionBehindApprovedBoundaries: true;
  extensionInstallAllowedFromUi: false;
  extensionEnablementAllowedFromUi: false;
  extensionRuntimeExecutorCreated: false;
  pluginRuntimeCreated: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  mcpRuntimeCreated: false;
  mcpServerCreated: false;
  mcpClientCreated: false;
  mcpToolCallsAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  providerRegistryMutationAllowed: false;
  jarvisdRegistryMutationAllowed: false;
  jarvisdPermissionAutoGrantAllowed: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
  thirdPartyLicenseSecurityReviewRequired: true;
  futureExtensionAdoptionRequiresLicenseSecurityReview: true;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerRetryAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
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

export type ExtensionRegistryReleaseCandidateModel = {
  title: "Extension registry release candidate";
  summary: string;
  candidates: ExtensionRegistryReleaseCandidate[];
  boundary: ExtensionRegistryReleaseCandidateBoundary;
  releaseLanguage: string[];
  advancedDetails: string[];
};

export function buildExtensionRegistryReleaseCandidateStableKey(
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
