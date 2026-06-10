export type DashboardDensityNavigationPolishStatus = "ready-for-review" | "blocked";

export type DashboardDensityNavigationPolish = {
  id: string;
  dashboardPolishIdentity: string;
  currentNavigationGroups: string[];
  densityRisks: string[];
  noviceModeAdjustments: string[];
  expertFastPathAdjustments: string[];
  protectedRouteCoverage: string[];
  crossLoopSearchRoute: string;
  privacyAuditRoute: string;
  blockedReasons: string[];
  status: DashboardDensityNavigationPolishStatus;
  advancedDensityDetails: string;
};

export type DashboardDensityNavigationPolishBoundary = {
  dashboardDensityReviewOnly: true;
  dashboardDensityReviewDoesNotRemoveRouteCoverage: true;
  navigationChangesRequireReviewBeforeRemoval: true;
  noRouteIsExecutedFromThisPage: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  routeExecutionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  approvalAutomationAllowedFromUi: false;
  searchExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  promptFileProjectConnectorDataAutoSendAllowed: false;
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

export type DashboardDensityNavigationPolishModel = {
  title: "Dashboard density navigation polish";
  summary: string;
  reviews: DashboardDensityNavigationPolish[];
  boundary: DashboardDensityNavigationPolishBoundary;
  dashboardLanguage: string[];
  advancedDetails: string[];
};

export function buildDashboardDensityNavigationPolishStableKey(
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
