export type LocalModelLiveTrialReleaseCandidateStatus = "ready-for-review" | "blocked";

export type LocalModelLiveTrialReleaseCandidate = {
  id: string;
  localModelLiveTrialCandidateIdentity: string;
  liveCallGuardStatus: string[];
  firstLocalModelTrialStatus: string[];
  outputCaptureStatus: string[];
  localEndpointPrivacyStatus: string[];
  deniedLocalModelLivePaths: string[];
  unresolvedLocalModelBlockers: string[];
  connectorLiveAccessRoute: string;
  automationLiveGuardRoute: string;
  nextRecommendedAction: string;
  status: LocalModelLiveTrialReleaseCandidateStatus;
  advancedCandidateDetails: string;
};

export type LocalModelLiveTrialReleaseCandidateBoundary = {
  localModelLiveTrialReleaseCandidateReviewOnly: true;
  localModelLiveTrialReleaseCandidateDoesNotRouteLiveLocalModelTraffic: true;
  localModelLiveTrialReleaseRequiresExplicitApproval: true;
  unresolvedLocalModelBlockersStayBlocked: true;
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
  settingsPersistenceAllowedFromUi: false;
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

export type LocalModelLiveTrialReleaseCandidateModel = {
  title: "Local model live trial release candidate";
  summary: string;
  candidates: LocalModelLiveTrialReleaseCandidate[];
  boundary: LocalModelLiveTrialReleaseCandidateBoundary;
  candidateLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalModelLiveTrialReleaseCandidateStableKey(
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
