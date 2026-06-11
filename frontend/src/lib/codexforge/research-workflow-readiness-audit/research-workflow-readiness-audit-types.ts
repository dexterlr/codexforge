export type ResearchWorkflowReadinessAuditStatus = "ready-for-review" | "blocked";

export type ResearchWorkflowReadinessAudit = {
  id: string;
  researchWorkflowReadinessIdentity: string;
  supportedResearchWorkflowGroups: string[];
  evidenceDependencySummary: string[];
  connectorProviderBoundarySummary: string[];
  freshnessConflictChecklist: string[];
  deniedResearchActions: string[];
  blockedResearchReadinessRisks: string[];
  codingReadinessRoute: string;
  operatorCockpitRoute: string;
  nextRecommendedAction: string;
  status: ResearchWorkflowReadinessAuditStatus;
  advancedResearchReadinessDetails: string;
};

export type ResearchWorkflowReadinessAuditBoundary = {
  researchWorkflowReadinessAuditReviewOnly: true;
  researchReadinessAuditDoesNotRunResearch: true;
  researchExecutionRequiresExplicitOperatorApproval: true;
  evidenceNotIngestedAutomatically: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  researchExecutionAllowedFromUi: false;
  browsingAllowedFromUi: false;
  searchAllowedFromUi: false;
  sourceFetchAllowedFromUi: false;
  externalDataFetchingAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  evidenceAutoIngestionAllowed: false;
  sourceAutoIngestionAllowed: false;
  sourceAutoFetchAllowed: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
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

export type ResearchWorkflowReadinessAuditModel = {
  title: "Research workflow readiness audit";
  summary: string;
  audits: ResearchWorkflowReadinessAudit[];
  boundary: ResearchWorkflowReadinessAuditBoundary;
  readinessLanguage: string[];
  advancedDetails: string[];
};

export function buildResearchWorkflowReadinessAuditStableKey(
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
