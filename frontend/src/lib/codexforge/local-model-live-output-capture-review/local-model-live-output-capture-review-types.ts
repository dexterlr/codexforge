export type LocalModelLiveOutputCaptureReviewStatus = "ready-for-review" | "blocked";

export type LocalModelLiveOutputCaptureReview = {
  id: string;
  localModelOutputCaptureIdentity: string;
  outputCaptureGroups: string[];
  redactionChecklist: string[];
  safetyReviewChecklist: string[];
  operatorReviewChecklist: string[];
  deniedOutputActions: string[];
  blockedOutputRisks: string[];
  localReleaseCandidateRoute: string;
  providerLiveTrialRoute: string;
  nextRecommendedAction: string;
  status: LocalModelLiveOutputCaptureReviewStatus;
  advancedOutputDetails: string;
};

export type LocalModelLiveOutputCaptureReviewBoundary = {
  localModelLiveOutputCaptureReviewOnly: true;
  localModelLiveOutputCaptureReviewDoesNotStoreModelOutputs: true;
  localModelOutputsRequireOperatorReviewBeforeUse: true;
  unsafeLocalModelOutputsRemainBlocked: true;
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

export type LocalModelLiveOutputCaptureReviewModel = {
  title: "Local model live output capture review";
  summary: string;
  reviews: LocalModelLiveOutputCaptureReview[];
  boundary: LocalModelLiveOutputCaptureReviewBoundary;
  outputLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalModelLiveOutputCaptureReviewStableKey(
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
