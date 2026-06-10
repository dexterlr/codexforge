export type UnifiedWorkspaceRealWorldTrialReportStatus = "ready-for-review" | "blocked";

export type UnifiedWorkspaceRealWorldTrialReport = {
  id: string;
  unifiedReportIdentity: string;
  sourceRealWorldTrialReviews: string[];
  codingTrialOutcome: string;
  researchTrialOutcome: string;
  connectorTrialOutcome: string;
  automationTrialOutcome: string;
  creativeLocalBridgeTrialOutcome: string;
  providerGovernanceTrialOutcome: string;
  projectKnowledgeTrialOutcome: string;
  crossLoopRisks: string[];
  releaseReadinessRecommendation: string;
  blockedReasons: string[];
  dailyOperatorPolishRoute: string;
  status: UnifiedWorkspaceRealWorldTrialReportStatus;
  advancedReportDetails: string;
};

export type UnifiedWorkspaceRealWorldTrialReportBoundary = {
  unifiedWorkspaceTrialReportReviewOnly: true;
  unifiedTrialReportReviewedBeforeExportOrUse: true;
  noReportFileWrittenFromPage: true;
  unresolvedLoopRisksStayBlocked: true;
  reportExportAllowedFromUi: false;
  reportFileWrittenFromPage: false;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  codingTaskExecutionAllowedFromUi: false;
  taskExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commitCreationAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  automaticWebBrowsingAllowed: false;
  webBrowsingAllowedFromUi: false;
  sourceAutoFetchAllowed: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  gmailApiCallsAllowedFromUi: false;
  calendarApiCallsAllowedFromUi: false;
  contactsApiCallsAllowedFromUi: false;
  googleApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  oauthRequestFlowAllowedFromUi: false;
  connectorAuthorizationAllowedFromUi: false;
  connectorDataReadFromPageAllowed: false;
  tokenStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  promptFileProjectDataAutoSendAllowed: false;
  promptFileProjectConnectorDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
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
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type UnifiedWorkspaceRealWorldTrialReportModel = {
  title: "Unified workspace real-world trial report";
  summary: string;
  reports: UnifiedWorkspaceRealWorldTrialReport[];
  boundary: UnifiedWorkspaceRealWorldTrialReportBoundary;
  reportLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedWorkspaceRealWorldTrialReportStableKey(
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
