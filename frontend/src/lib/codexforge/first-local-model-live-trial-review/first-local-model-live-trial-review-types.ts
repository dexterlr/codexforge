export type FirstLocalModelLiveTrialReviewStatus = "ready-for-review" | "blocked";

export type FirstLocalModelLiveTrialReview = {
  id: string;
  firstLocalModelLiveTrialIdentity: string;
  trialStages: string[];
  runtimeReadinessChecklist: string[];
  promptPrivacyChecklist: string[];
  approvalGateChecklist: string[];
  deniedLocalTrialActions: string[];
  blockedLocalTrialRisks: string[];
  localOutputCaptureRoute: string;
  localReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: FirstLocalModelLiveTrialReviewStatus;
  advancedTrialDetails: string;
};

export type FirstLocalModelLiveTrialReviewBoundary = {
  firstLocalModelLiveTrialReviewOnly: true;
  firstLocalModelLiveTrialReviewDoesNotInvokeLocalModels: true;
  localModelTrialRequiresExplicitOperatorApproval: true;
  unapprovedLocalModelCallsRemainBlocked: true;
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

export type FirstLocalModelLiveTrialReviewModel = {
  title: "First local model live trial review";
  summary: string;
  reviews: FirstLocalModelLiveTrialReview[];
  boundary: FirstLocalModelLiveTrialReviewBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildFirstLocalModelLiveTrialReviewStableKey(
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
