export type FirstProviderLiveCallTrialReviewStatus = "ready-for-review" | "blocked";

export type FirstProviderLiveCallTrialReview = {
  id: string;
  firstProviderLiveCallTrialIdentity: string;
  trialStages: string[];
  providerRequestReviewChecklist: string[];
  approvalGateChecklist: string[];
  costRateLimitChecklist: string[];
  deniedProviderTrialActions: string[];
  blockedProviderTrialRisks: string[];
  providerResponseCaptureRoute: string;
  providerReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: FirstProviderLiveCallTrialReviewStatus;
  advancedTrialDetails: string;
};

export type FirstProviderLiveCallTrialReviewBoundary = {
  firstProviderLiveCallTrialReviewOnly: true;
  firstProviderLiveCallTrialReviewDoesNotSendProviderRequests: true;
  providerRequestsRequireExplicitOperatorApproval: true;
  unapprovedProviderCallsRemainBlocked: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerLiveConnectionTestsAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  providerResponseIngestionAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  scheduleCreationAllowedFromUi: false;
  conditionalWatchCreationAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  creativeAssetGenerationAllowedFromUi: false;
  researchExecutionAllowedFromUi: false;
  codingWorkflowExecutionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
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
  connectorDataStorageAllowed: false;
  automationDataStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  routeCoverageRemovalAllowed: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type FirstProviderLiveCallTrialReviewModel = {
  title: "First provider live call trial review";
  summary: string;
  reviews: FirstProviderLiveCallTrialReview[];
  boundary: FirstProviderLiveCallTrialReviewBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildFirstProviderLiveCallTrialReviewStableKey(
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
