export type LiveTrialOperatorChecklistStatus = "ready-for-review" | "blocked";

export type LiveTrialOperatorChecklist = {
  id: string;
  liveTrialOperatorChecklistIdentity: string;
  operatorDecisionGroups: string[];
  goNoGoChecklist: string[];
  requiredEvidenceChecklist: string[];
  deniedChecklistShortcuts: string[];
  escalationChecklist: string[];
  blockedChecklistRisks: string[];
  failureRecoveryRoute: string;
  controlledLiveWorkflowRoute: string;
  nextRecommendedAction: string;
  status: LiveTrialOperatorChecklistStatus;
  advancedChecklistDetails: string;
};

export type LiveTrialOperatorChecklistBoundary = {
  liveTrialOperatorChecklistReviewOnly: true;
  liveTrialOperatorChecklistDoesNotApproveActions: true;
  everyGoNoGoDecisionRequiresExplicitOperatorApproval: true;
  deniedChecklistShortcutsRemainBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  liveWorkflowLaunchAllowedFromUi: false;
  liveActionExecutionAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  autoApprovalAllowedFromUi: false;
  actionsApprovedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  recoveryAutoTriggerAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerLiveConnectionTestsAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
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
  automationDataStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  routeCoverageRemovalAllowed: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type LiveTrialOperatorChecklistModel = {
  title: "Live trial operator checklist";
  summary: string;
  checklists: LiveTrialOperatorChecklist[];
  boundary: LiveTrialOperatorChecklistBoundary;
  checklistLanguage: string[];
  advancedDetails: string[];
};

export function buildLiveTrialOperatorChecklistStableKey(
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
