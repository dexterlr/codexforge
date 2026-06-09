export type OperatorDashboardReleaseDecision = "ready" | "ready with fixes" | "blocked";

export type OperatorDashboardLoopCard = {
  id: string;
  loopName: string;
  releaseReadiness: string;
  safetyReadiness: string;
  nextRoute: string;
};

export type OperatorDashboardReleaseCandidate = {
  id: string;
  dashboardReleaseIdentity: string;
  coveredLoopCards: OperatorDashboardLoopCard[];
  releaseReadinessByLoop: string[];
  safetyAuditReadiness: string;
  navigationReadiness: string;
  knownGaps: string[];
  releaseDecision: OperatorDashboardReleaseDecision;
  guidedTrialRoute: string;
  nextRecommendedRoute: string;
  advancedDashboardDetails: string;
};

export type OperatorDashboardReleaseBoundary = {
  operatorDashboardReleaseReviewOnly: true;
  dashboardDoesNotRunWorkflowsAutomatically: true;
  executionBehindExplicitApprovalGates: true;
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

export type OperatorDashboardReleaseCandidateModel = {
  title: "Operator dashboard release candidate";
  summary: string;
  candidates: OperatorDashboardReleaseCandidate[];
  boundary: OperatorDashboardReleaseBoundary;
  dashboardLanguage: string[];
  advancedDetails: string[];
};

export function buildOperatorDashboardReleaseCandidateStableKey(
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
