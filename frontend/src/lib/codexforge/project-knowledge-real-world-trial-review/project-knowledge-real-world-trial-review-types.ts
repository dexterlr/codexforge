export type ProjectKnowledgeRealWorldTrialReviewStatus = "ready-for-review" | "blocked";

export type ProjectKnowledgeRealWorldTrialReview = {
  id: string;
  projectKnowledgeTrialIdentity: string;
  sourceProjectKnowledgeReleaseCandidate: string;
  operatorProjectScenario: string;
  snapshotTimelineDecisionRunbookReadiness: string;
  memoryPromotionBoundary: string;
  redactionChecklist: string[];
  blockedRealActions: string[];
  trialOutcomeNotes: string[];
  unifiedTrialReportRoute: string;
  status: ProjectKnowledgeRealWorldTrialReviewStatus;
  advancedProjectKnowledgeTrialDetails: string;
};

export type ProjectKnowledgeRealWorldTrialReviewBoundary = {
  projectKnowledgeTrialReviewOnly: true;
  projectKnowledgeTrialReviewDoesNotScanFiles: true;
  projectMemoryPromotionRequiresExplicitApproval: true;
  secretsAndLocalPathsStayRedacted: true;
  localProjectScanRunsFromPage: false;
  projectFilesReadFromPage: false;
  gitCommandsRunFromPage: false;
  memoryPromotedAutomatically: false;
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
  runbookFileWriteAllowedFromUi: false;
  runbookExportAllowedFromUi: false;
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

export type ProjectKnowledgeRealWorldTrialReviewModel = {
  title: "Project knowledge real-world trial review";
  summary: string;
  reviews: ProjectKnowledgeRealWorldTrialReview[];
  boundary: ProjectKnowledgeRealWorldTrialReviewBoundary;
  trialReviewLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectKnowledgeRealWorldTrialReviewStableKey(
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
