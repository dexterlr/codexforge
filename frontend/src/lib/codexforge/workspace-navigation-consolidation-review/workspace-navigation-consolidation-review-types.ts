export type WorkspaceNavigationConsolidationStatus = "ready-for-review" | "blocked";

export type WorkspaceNavigationConsolidationReview = {
  id: string;
  status: WorkspaceNavigationConsolidationStatus;
  consolidationReviewIdentity: string;
  sourceUnifiedHome: string;
  routeGroupSummary: string[];
  commandRegistryCoverage: string[];
  duplicateOverlapRisks: string[];
  noviceNavigationPolicy: string[];
  protectedRoutes: string[];
  nextRecommendedRoute: string;
  blockedReasons: string[];
  advancedNavigationDetails: string;
};

export type WorkspaceNavigationConsolidationBoundary = {
  navigationConsolidationDoesNotRemoveRouteCoverage: true;
  routeChangesRequireReviewBeforeRemoval: true;
  routeExecutedFromPage: false;
  routeCoverageRemovalAllowed: false;
  silentRegistryMutationAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  promptFileProjectDataAutoSendAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  runbookFileWriteAllowedFromUi: false;
  runbookExportAllowedFromUi: false;
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
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type WorkspaceNavigationConsolidationReviewModel = {
  title: "Workspace navigation consolidation review";
  summary: string;
  reviews: WorkspaceNavigationConsolidationReview[];
  boundary: WorkspaceNavigationConsolidationBoundary;
  navigationLanguage: string[];
  advancedDetails: string[];
};

export function buildWorkspaceNavigationConsolidationReviewStableKey(
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
