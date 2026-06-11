export type CreativeWorkflowReadinessAuditStatus = "ready-for-review" | "blocked";

export type CreativeWorkflowReadinessAudit = {
  id: string;
  creativeWorkflowReadinessIdentity: string;
  supportedCreativeWorkflowGroups: string[];
  localBridgeDependencySummary: string[];
  providerDependencySummary: string[];
  manualValidationChecklist: string[];
  deniedCreativeActions: string[];
  blockedCreativeReadinessRisks: string[];
  researchReadinessRoute: string;
  operatorCockpitRoute: string;
  nextRecommendedAction: string;
  status: CreativeWorkflowReadinessAuditStatus;
  advancedCreativeReadinessDetails: string;
};

export type CreativeWorkflowReadinessAuditBoundary = {
  creativeWorkflowReadinessAuditReviewOnly: true;
  creativeReadinessAuditDoesNotGenerateAssets: true;
  creativeExecutionRequiresExplicitOperatorApproval: true;
  blockedCreativeActionsStayBlocked: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  creativeWorkflowExecutionAllowedFromUi: false;
  assetGenerationAllowedFromUi: false;
  mediaGenerationAllowedFromUi: false;
  imageGenerationAllowedFromUi: false;
  videoGenerationAllowedFromUi: false;
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
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  testBuildSmokeExecutionAllowedFromUi: false;
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

export type CreativeWorkflowReadinessAuditModel = {
  title: "Creative workflow readiness audit";
  summary: string;
  audits: CreativeWorkflowReadinessAudit[];
  boundary: CreativeWorkflowReadinessAuditBoundary;
  readinessLanguage: string[];
  advancedDetails: string[];
};

export function buildCreativeWorkflowReadinessAuditStableKey(
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
