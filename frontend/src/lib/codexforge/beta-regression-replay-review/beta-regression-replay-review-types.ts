export type BetaRegressionReplayReviewStatus = "ready-for-review" | "blocked";

export type BetaRegressionReplayReview = {
  id: string;
  regressionReplayIdentity: string;
  sourceFixPriorityMatrix: string;
  replayPlanGroups: string[];
  expectedValidationEvidence: string[];
  blockedReplayCases: string[];
  smokeBuildManualValidationNotes: string[];
  releaseNotesRoute: string;
  nextRecommendedAction: string;
  status: BetaRegressionReplayReviewStatus;
  advancedReplayDetails: string;
};

export type BetaRegressionReplayReviewBoundary = {
  betaRegressionReplayReviewOnly: true;
  regressionReplayReviewDoesNotRunTestsOrWorkflows: true;
  replayPlansRequireOperatorApproval: true;
  unresolvedRegressionsStayBlocked: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  promptFileProjectDataAutoSendAllowed: false;
  promptFileProjectConnectorDataAutoSendAllowed: false;
  promptFileProjectConnectorFeedbackDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  gitCommandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  fullSmokeSuiteExecutionFromUiAllowed: false;
  releasePublishAllowedFromUi: false;
  issueCreationAllowedFromUi: false;
  ticketCreationAllowedFromUi: false;
  externalFeedbackFetchAllowedFromUi: false;
  feedbackIngestionAllowedFromUi: false;
  fixApplicationAllowedFromUi: false;
  commitCreationAllowedFromUi: false;
  regressionReplayExecutionAllowedFromUi: false;
  releaseNotesPublishAllowedFromUi: false;
  releaseNotesExportAllowedFromUi: false;
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
  sessionStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type BetaRegressionReplayReviewModel = {
  title: "Beta regression replay review";
  summary: string;
  reviews: BetaRegressionReplayReview[];
  boundary: BetaRegressionReplayReviewBoundary;
  replayLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaRegressionReplayReviewStableKey(
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
