export type UnifiedWorkspaceHomeReviewStatus = "ready-for-review" | "blocked";

export type UnifiedWorkspaceHomeReview = {
  id: string;
  status: UnifiedWorkspaceHomeReviewStatus;
  unifiedHomeIdentity: string;
  coveredLoopsSummary: string[];
  codingLoopStatus: string;
  providerLoopStatus: string;
  creativeLocalBridgeStatus: string;
  extensionLoopStatus: string;
  researchLoopStatus: string;
  connectorLoopStatus: string;
  automationLoopStatus: string;
  projectKnowledgeLoopStatus: string;
  navigationConsolidationRoute: string;
  blockedReasons: string[];
  advancedWorkspaceDetails: string;
};

export type UnifiedWorkspaceHomeReviewBoundary = {
  unifiedWorkspaceDoesNotExecuteActions: true;
  allExecutionBehindExplicitApprovalGates: true;
  reviewSurfaceNotAutomationSurface: true;
  actionsExecutedFromUi: false;
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

export type UnifiedWorkspaceHomeReviewModel = {
  title: "Unified workspace home review";
  summary: string;
  reviews: UnifiedWorkspaceHomeReview[];
  boundary: UnifiedWorkspaceHomeReviewBoundary;
  workspaceLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedWorkspaceHomeReviewStableKey(
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
