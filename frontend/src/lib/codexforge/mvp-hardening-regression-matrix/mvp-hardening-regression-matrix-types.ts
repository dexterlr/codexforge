export type MvpHardeningRegressionMatrixStatus = "ready-for-review" | "blocked";

export type MvpHardeningRegressionMatrixLoopCoverage = {
  id: string;
  loopName: string;
  coverageSummary: string;
  safetyBoundaryCoverage: string;
  routeNavigationCoverage: string;
};

export type MvpHardeningRegressionMatrix = {
  id: string;
  regressionMatrixIdentity: string;
  sourceGuidedTrial: string;
  coreLoopCoverage: MvpHardeningRegressionMatrixLoopCoverage[];
  buildSmokeCoverageSummary: string;
  safetyBoundaryCoverage: string;
  routeNavigationCoverage: string;
  knownGaps: string[];
  releaseCandidateRoute: string;
  blockedReasons: string[];
  status: MvpHardeningRegressionMatrixStatus;
  advancedRegressionDetails: string;
};

export type MvpHardeningRegressionMatrixBoundary = {
  regressionMatrixReviewOnly: true;
  regressionMatrixDoesNotRunTestsFromPage: true;
  hardeningChecksReviewedBeforeRelease: true;
  unresolvedRegressionsStayBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  promptFileProjectDataAutoSendAllowed: false;
  promptFileProjectConnectorDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  regressionChecksRunFromUiAllowed: false;
  releaseShippingExecutionAllowedFromUi: false;
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
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type MvpHardeningRegressionMatrixModel = {
  title: "MVP hardening regression matrix";
  summary: string;
  matrices: MvpHardeningRegressionMatrix[];
  boundary: MvpHardeningRegressionMatrixBoundary;
  regressionLanguage: string[];
  advancedDetails: string[];
};

export function buildMvpHardeningRegressionMatrixStableKey(
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
