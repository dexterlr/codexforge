export type CodingLoopRealWorldTrialReviewStatus = "ready-for-review" | "blocked";

export type CodingLoopRealWorldTrialReview = {
  id: string;
  codingTrialIdentity: string;
  sourceFirstRealOperatorWorkflowTrial: string;
  operatorScenario: string;
  proposedCodingTask: string;
  expectedApprovalGates: string[];
  patchApplyBoundaries: string[];
  validationEvidenceSummary: string;
  blockedRealActions: string[];
  trialOutcomeNotes: string[];
  nextLoopRoute: string;
  status: CodingLoopRealWorldTrialReviewStatus;
  advancedCodingTrialDetails: string;
};

export type CodingLoopRealWorldTrialReviewBoundary = {
  codingTrialReviewOnly: true;
  codingTrialReviewDoesNotExecuteActions: true;
  patchesAndCommitsRequireExplicitApproval: true;
  validationEvidenceReviewedBeforeUse: true;
  realEvidenceReviewedBeforeUse: true;
  memoryPromotionBlockedUntilApproved: true;
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
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  gmailApiCallsAllowedFromUi: false;
  calendarApiCallsAllowedFromUi: false;
  contactsApiCallsAllowedFromUi: false;
  googleApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  webBrowsingAllowedFromUi: false;
  sourceAutoFetchAllowed: false;
  oauthRequestFlowAllowedFromUi: false;
  connectorAuthorizationAllowedFromUi: false;
  connectorDataReadFromPageAllowed: false;
  automaticEmailReadsAllowed: false;
  automaticCalendarReadsAllowed: false;
  automaticContactReadsAllowed: false;
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

export type CodingLoopRealWorldTrialReviewModel = {
  title: "Coding loop real-world trial review";
  summary: string;
  reviews: CodingLoopRealWorldTrialReview[];
  boundary: CodingLoopRealWorldTrialReviewBoundary;
  trialReviewLanguage: string[];
  advancedDetails: string[];
};

export function buildCodingLoopRealWorldTrialReviewStableKey(
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
