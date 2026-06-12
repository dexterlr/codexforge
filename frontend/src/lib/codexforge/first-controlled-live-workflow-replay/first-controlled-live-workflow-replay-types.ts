export type FirstControlledLiveWorkflowReplayStatus = "ready-for-review" | "blocked";

export type FirstControlledLiveWorkflowReplay = {
  id: string;
  liveWorkflowReplayIdentity: string;
  replayStages: string[];
  expectedActualComparisonGroups: string[];
  validationEvidenceChecklist: string[];
  deniedReplayActions: string[];
  blockedReplayRisks: string[];
  regressionMatrixRoute: string;
  failurePatchRoute: string;
  nextRecommendedAction: string;
  status: FirstControlledLiveWorkflowReplayStatus;
  advancedReplayDetails: string;
};

export type FirstControlledLiveWorkflowReplayBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  liveWorkflowLaunchAllowedFromUi: false;
  liveActionExecutionAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  autoApprovalAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  evidenceAutoIngestionAllowedFromUi: false;
  resultAutoIngestionAllowedFromUi: false;
  feedbackAutoIngestionAllowedFromUi: false;
  recoveryAutoTriggerAllowedFromUi: false;
  replayExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  conditionalWatchCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  creativeAssetGenerationAllowedFromUi: false;
  researchExecutionAllowedFromUi: false;
  codingWorkflowExecutionAllowedFromUi: false;
  testBuildSmokeExecutionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  hardeningApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
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
  automationDataStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  routeCoverageRemovalAllowed: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type FirstControlledLiveWorkflowReplayModel = {
  title: "First controlled live workflow replay";
  summary: string;
  reviews: FirstControlledLiveWorkflowReplay[];
  boundary: FirstControlledLiveWorkflowReplayBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildFirstControlledLiveWorkflowReplayStableKey(
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
