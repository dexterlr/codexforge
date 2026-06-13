export type LocalModelLiveCallGuardReviewStatus = "ready-for-review" | "blocked";

export type LocalModelLiveCallGuardReview = {
  id: string;
  localModelLiveCallGuardIdentity: string;
  localRuntimeGuardGroups: string[];
  localBridgeBoundaryChecklist: string[];
  promptPrivacyChecklist: string[];
  approvalGateChecklist: string[];
  deniedLocalLiveCallActions: string[];
  blockedLocalCallRisks: string[];
  firstLocalModelTrialRoute: string;
  localModelOutputCaptureRoute: string;
  nextRecommendedAction: string;
  status: LocalModelLiveCallGuardReviewStatus;
  advancedGuardDetails: string;
};

export type LocalModelLiveCallGuardReviewBoundary = {
  localModelLiveCallGuardReviewOnly: true;
  localModelLiveCallGuardReviewDoesNotCallLocalModels: true;
  localModelCallsRequireExplicitOperatorApproval: true;
  localEndpointsStayPrivate: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localModelInvocationAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localEndpointStorageAllowedFromUi: false;
  localModelTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  localModelOutputStorageAllowedFromUi: false;
  localModelOutputIngestionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerLiveConnectionTestsAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  providerResponseIngestionAllowedFromUi: false;
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

export type LocalModelLiveCallGuardReviewModel = {
  title: "Local model live call guard review";
  summary: string;
  reviews: LocalModelLiveCallGuardReview[];
  boundary: LocalModelLiveCallGuardReviewBoundary;
  guardLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalModelLiveCallGuardReviewStableKey(
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
