export type ExtensionPermissionPolicyBuilderStatus =
  | "mapped for review"
  | "needs review"
  | "blocked";

export type ExtensionPermissionPolicyBuilder = {
  id: string;
  status: ExtensionPermissionPolicyBuilderStatus;
  policyBuilderIdentity: string;
  sourceManifestSchemaReview: string;
  requestedCapabilities: string[];
  allowedPermissionScope: string[];
  deniedPermissionScope: string[];
  dataBoundaryPolicy: string;
  auditRecoveryRequirement: string;
  approvalRequirement: string;
  sandboxBoundaryRoute: string;
  blockedReasons: string[];
  advancedPermissionDetails: string;
};

export type ExtensionPermissionPolicyBuilderBoundary = {
  permissionPoliciesGrantAutomatically: false;
  permissionGrantAllowedFromUi: false;
  extensionPermissionsRequireExplicitReview: true;
  deniedScopesRemainBlocked: true;
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

export type ExtensionPermissionPolicyBuilderModel = {
  title: "Extension permission policy builder";
  summary: string;
  policies: ExtensionPermissionPolicyBuilder[];
  boundary: ExtensionPermissionPolicyBuilderBoundary;
  policyLanguage: string[];
  advancedDetails: string[];
};

export function buildExtensionPermissionPolicyBuilderStableKey(
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
