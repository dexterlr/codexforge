export type ConnectorLivePermissionTrialReviewStatus = "ready-for-review" | "blocked";

export type ConnectorLivePermissionTrialReview = {
  id: string;
  connectorLivePermissionTrialIdentity: string;
  connectorFamilies: string[];
  permissionScopeGroups: string[];
  approvalGateChecklist: string[];
  deniedConnectorActions: string[];
  privacyBoundaryNotes: string[];
  blockedPermissionTrialRisks: string[];
  dataRedactionRoute: string;
  evidenceHandoffRoute: string;
  nextRecommendedAction: string;
  status: ConnectorLivePermissionTrialReviewStatus;
  advancedPermissionDetails: string;
};

export type ConnectorLivePermissionTrialReviewBoundary = {
  connectorLivePermissionTrialReviewOnly: true;
  connectorLivePermissionTrialDoesNotConnectAccounts: true;
  connectorPermissionsRequireExplicitOperatorApproval: true;
  connectorDataStaysPrivateUntilApproved: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorAccountConnectionAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  permissionGrantPersistenceAllowedFromUi: false;
  privateConnectorDetailsDisplayedAllowed: false;
  evidenceAutoIngestionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
  webSearchApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  gitCommandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  testBuildSmokeExecutionAllowedFromUi: false;
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
  credentialStorageAllowed: false;
  endpointStorageAllowed: false;
  tokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  sessionStorageApiKeyStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  routeCoverageRemovalAllowed: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ConnectorLivePermissionTrialReviewModel = {
  title: "Connector live permission trial review";
  summary: string;
  trials: ConnectorLivePermissionTrialReview[];
  boundary: ConnectorLivePermissionTrialReviewBoundary;
  permissionLanguage: string[];
  advancedDetails: string[];
};

export function buildConnectorLivePermissionTrialReviewStableKey(
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
