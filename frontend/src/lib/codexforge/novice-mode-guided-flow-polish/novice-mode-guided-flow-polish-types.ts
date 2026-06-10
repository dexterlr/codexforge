export type NoviceModeGuidedFlowPolishStatus = "ready-for-review" | "blocked";

export type NoviceModeGuidedFlowPolish = {
  id: string;
  noviceFlowIdentity: string;
  recommendedFirstReviewSequence: string[];
  plainEnglishSafetyHints: string[];
  approvalCheckpoints: string[];
  blockedActionExplanations: string[];
  recoveryHandoff: string;
  dailyHomeRoute: string;
  expertFastPathRoute: string;
  nextRecommendedAction: string;
  status: NoviceModeGuidedFlowPolishStatus;
  advancedNoviceFlowDetails: string;
};

export type NoviceModeGuidedFlowPolishBoundary = {
  noviceModeReviewOnly: true;
  noviceModeGuidesButDoesNotApproveOrExecute: true;
  approvalCheckpointsStayVisible: true;
  blockedActionsStayBlockedUntilResolved: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  approvalAutomationAllowedFromUi: false;
  recoveryAutomationAllowedFromUi: false;
  rollbackExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localToolLaunchAllowedFromUi: false;
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

export type NoviceModeGuidedFlowPolishModel = {
  title: "Novice mode guided flow polish";
  summary: string;
  flows: NoviceModeGuidedFlowPolish[];
  boundary: NoviceModeGuidedFlowPolishBoundary;
  noviceLanguage: string[];
  advancedDetails: string[];
};

export function buildNoviceModeGuidedFlowPolishStableKey(
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
