export type ProviderIntegrationHardeningPassStatus = "ready-for-review" | "blocked";

export type ProviderIntegrationHardeningPass = {
  id: string;
  providerIntegrationHardeningIdentity: string;
  hardeningGroups: string[];
  credentialBoundaryChecklist: string[];
  providerRoutingChecklist: string[];
  failoverCostSafetyChecklist: string[];
  deniedHardeningShortcuts: string[];
  unresolvedHardeningRisks: string[];
  connectorLivePermissionRoute: string;
  automationDryRunRoute: string;
  nextRecommendedAction: string;
  status: ProviderIntegrationHardeningPassStatus;
  advancedHardeningDetails: string;
};

export type ProviderIntegrationHardeningPassBoundary = {
  providerIntegrationHardeningPassReviewOnly: true;
  providerIntegrationHardeningDoesNotCallProviders: true;
  providerConfigurationChangesRequireExplicitOperatorApproval: true;
  unresolvedProviderRisksStayBlocked: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerConnectionAllowedFromUi: false;
  providerConnectionTestsAllowedFromUi: false;
  liveProviderTrafficAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  providerConfigurationChangesAllowedFromUi: false;
  providerSettingsPersistenceAllowedFromUi: false;
  providerSelectionPersistenceAllowedFromUi: false;
  providerPermissionPresetPersistenceAllowedFromUi: false;
  permissionGrantPersistenceAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  providerOutputIngestionAllowedFromUi: false;
  providerAuditEventPersistenceAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  promptFileProjectConnectorProviderModelOutputAuditDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  gitCommandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  memoryMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  extensionRuntimeExecutorCreated: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  credentialStorageAllowed: false;
  endpointStorageAllowed: false;
  tokenStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  sessionStorageApiKeyStorageAllowed: false;
  outputStorageAllowed: false;
  auditEventPersistenceAllowedFromUi: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ProviderIntegrationHardeningPassModel = {
  title: "Provider integration hardening pass";
  summary: string;
  hardeningPasses: ProviderIntegrationHardeningPass[];
  boundary: ProviderIntegrationHardeningPassBoundary;
  hardeningLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderIntegrationHardeningPassStableKey(
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
