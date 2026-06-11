export type ControlledProviderIntegrationPlanStatus = "ready-for-review" | "blocked";

export type ControlledProviderIntegrationPlan = {
  id: string;
  providerIntegrationPlanIdentity: string;
  providerFamilies: string[];
  openAICompatibleApiLane: string[];
  localModelLane: string[];
  creativeProviderLane: string[];
  researchCodingProviderLane: string[];
  keyTokenSafetyRules: string[];
  approvalGates: string[];
  blockedProviderIntegrationRisks: string[];
  localModelTrialRoute: string;
  betaReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: ControlledProviderIntegrationPlanStatus;
  advancedProviderIntegrationDetails: string;
};

export type ControlledProviderIntegrationPlanBoundary = {
  controlledProviderIntegrationPlanReviewOnly: true;
  providerIntegrationPlanDoesNotConnectProviders: true;
  providerTrafficRequiresExplicitApproval: true;
  keysAndTokensNeverDisplayedOrStoredHere: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  openAICompatibleProviderApiCallsAllowedFromUi: false;
  providerConnectionAllowedFromUi: false;
  providerConnectionTestsAllowedFromUi: false;
  liveProviderTrafficAllowedFromUi: false;
  providerKeyStorageAllowedFromUi: false;
  providerTokenStorageAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  promptFileProjectConnectorProviderModelDataAutoSendAllowed: false;
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
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
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
  tokenStorageAllowed: false;
  endpointStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  sessionStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ControlledProviderIntegrationPlanModel = {
  title: "Controlled provider integration plan";
  summary: string;
  plans: ControlledProviderIntegrationPlan[];
  boundary: ControlledProviderIntegrationPlanBoundary;
  providerIntegrationLanguage: string[];
  advancedDetails: string[];
};

export function buildControlledProviderIntegrationPlanStableKey(
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
