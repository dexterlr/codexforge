export type BetaTrialIntakeReviewStatus = "ready-for-review" | "blocked";

export type BetaTrialIntakeReview = {
  id: string;
  betaIntakeIdentity: string;
  trialScopeSummary: string[];
  participantCriteria: string[];
  riskPrivacyChecklist: string[];
  approvalGates: string[];
  onboardingReadiness: string[];
  feedbackInboxRoute: string;
  blockedIntakeReasons: string[];
  nextRecommendedAction: string;
  status: BetaTrialIntakeReviewStatus;
  advancedIntakeDetails: string;
};

export type BetaTrialIntakeReviewBoundary = {
  betaTrialIntakeReviewOnly: true;
  betaTrialIntakeRequiresExplicitApproval: true;
  noInvitesAreSentFromThisPage: true;
  participantDataIsNotCollectedAutomatically: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
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
  inviteSendingAllowedFromUi: false;
  participantDataCollectionAllowedFromUi: false;
  externalFeedbackFetchAllowedFromUi: false;
  feedbackIngestionAllowedFromUi: false;
  issueCreationAllowedFromUi: false;
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

export type BetaTrialIntakeReviewModel = {
  title: "Beta trial intake review";
  summary: string;
  reviews: BetaTrialIntakeReview[];
  boundary: BetaTrialIntakeReviewBoundary;
  intakeLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaTrialIntakeReviewStableKey(
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
