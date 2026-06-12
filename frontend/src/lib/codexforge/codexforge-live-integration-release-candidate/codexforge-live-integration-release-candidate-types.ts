export type CodexForgeLiveIntegrationReleaseCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeLiveIntegrationReleaseCandidate = {
  id: string;
  liveIntegrationReleaseCandidateIdentity: string;
  providerLocalConnectorAutomationMatrix: string[];
  dryRunStatus: string;
  approvalFlowStatus: string;
  safetyBoundaryStatus: string;
  deniedLivePaths: string[];
  unresolvedLaunchBlockers: string[];
  operatorHomeRoute: string;
  liveTrialRunbookRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeLiveIntegrationReleaseCandidateStatus;
  advancedReleaseCandidateDetails: string;
};

export type CodexForgeLiveIntegrationReleaseCandidateBoundary = {
  codexForgeLiveIntegrationReleaseCandidateReviewOnly: true;
  liveIntegrationReleaseCandidateDoesNotGoLive: true;
  goingLiveRequiresExplicitOperatorApproval: true;
  deniedLivePathsRemainBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  liveWorkflowLaunchAllowedFromUi: false;
  liveTrafficRoutingAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  releasePublishingAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  autoApprovalAllowedFromUi: false;
  actionsApprovedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerLiveConnectionTestsAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorAccountConnectionAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  automationRulePersistenceAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  scheduleCreationAllowedFromUi: false;
  conditionalWatchCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  creativeAssetGenerationAllowedFromUi: false;
  researchExecutionAllowedFromUi: false;
  codingWorkflowExecutionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
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
  fileDeletionAllowedFromUi: false;
  evidenceAutoIngestionAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  extensionRuntimeExecutorCreated: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  localStorageApiKeyStorageAllowed: false;
  sessionStorageApiKeyStorageAllowed: false;
  tokenStorageAllowed: false;
  endpointStorageAllowed: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
  connectorDataStorageAllowed: false;
  automationDataStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  routeCoverageRemovalAllowed: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type CodexForgeLiveIntegrationReleaseCandidateModel = {
  title: "CodexForge live integration release candidate";
  summary: string;
  candidates: CodexForgeLiveIntegrationReleaseCandidate[];
  boundary: CodexForgeLiveIntegrationReleaseCandidateBoundary;
  releaseCandidateLanguage: string[];
  advancedDetails: string[];
};

export function buildCodexForgeLiveIntegrationReleaseCandidateStableKey(
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
