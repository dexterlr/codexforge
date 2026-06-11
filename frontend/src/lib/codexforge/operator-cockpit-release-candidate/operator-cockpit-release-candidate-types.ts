export type OperatorCockpitReleaseCandidateStatus = "ready-with-fixes" | "blocked";

export type OperatorCockpitReleaseCandidate = {
  id: string;
  operatorCockpitReleaseCandidateIdentity: string;
  readinessGroups: string[];
  workflowReadinessSummary: string[];
  providerLocalConnectorAutomationReadinessSummary: string[];
  safetyApprovalSummary: string[];
  blockedReleaseCandidateRisks: string[];
  betaHardeningRoute: string;
  betaReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: OperatorCockpitReleaseCandidateStatus;
  advancedCockpitReadinessDetails: string;
};

export type OperatorCockpitReleaseCandidateBoundary = {
  operatorCockpitReleaseCandidateReviewOnly: true;
  operatorCockpitReleaseCandidateDoesNotExecuteWorkflows: true;
  cockpitReleaseRequiresExplicitOperatorApproval: true;
  unresolvedBlockersRemainBlocked: true;
  releasePublishAllowedFromUi: false;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  creativeWorkflowExecutionAllowedFromUi: false;
  researchExecutionAllowedFromUi: false;
  codingWorkflowExecutionAllowedFromUi: false;
  assetGenerationAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  promptFileProjectConnectorProviderWorkflowDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  testBuildSmokeExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
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

export type OperatorCockpitReleaseCandidateModel = {
  title: "Operator cockpit release candidate";
  summary: string;
  candidates: OperatorCockpitReleaseCandidate[];
  boundary: OperatorCockpitReleaseCandidateBoundary;
  cockpitLanguage: string[];
  advancedDetails: string[];
};

export function buildOperatorCockpitReleaseCandidateStableKey(
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
