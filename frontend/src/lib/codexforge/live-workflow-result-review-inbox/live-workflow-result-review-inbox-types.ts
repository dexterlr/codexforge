export type LiveWorkflowResultReviewInboxStatus = "ready-for-review" | "blocked";

export type LiveWorkflowResultReviewInbox = {
  id: string;
  liveWorkflowResultReviewIdentity: string;
  resultReviewGroups: string[];
  acceptanceRejectionChecklist: string[];
  redactionPrivacyRules: string[];
  deniedResultActions: string[];
  blockedResultRisks: string[];
  feedbackRoute: string;
  releaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: LiveWorkflowResultReviewInboxStatus;
  advancedResultDetails: string;
};

export type LiveWorkflowResultReviewInboxBoundary = {
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

export type LiveWorkflowResultReviewInboxModel = {
  title: "Live workflow result review inbox";
  summary: string;
  reviews: LiveWorkflowResultReviewInbox[];
  boundary: LiveWorkflowResultReviewInboxBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildLiveWorkflowResultReviewInboxStableKey(
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
