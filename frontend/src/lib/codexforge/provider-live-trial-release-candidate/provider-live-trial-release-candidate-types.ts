export type ProviderLiveTrialReleaseCandidateStatus = "ready-for-review" | "blocked";

export type ProviderLiveTrialReleaseCandidate = {
  id: string;
  providerLiveTrialCandidateIdentity: string;
  liveCallGuardStatus: string[];
  firstProviderTrialStatus: string[];
  responseCaptureStatus: string[];
  costRateSafetyStatus: string[];
  deniedProviderLivePaths: string[];
  unresolvedProviderBlockers: string[];
  localModelLiveGuardRoute: string;
  localModelTrialRoute: string;
  nextRecommendedAction: string;
  status: ProviderLiveTrialReleaseCandidateStatus;
  advancedCandidateDetails: string;
};

export type ProviderLiveTrialReleaseCandidateBoundary = {
  providerLiveTrialReleaseCandidateReviewOnly: true;
  providerLiveTrialReleaseCandidateDoesNotRouteLiveProviderTraffic: true;
  providerLiveTrialReleaseRequiresExplicitApproval: true;
  unresolvedProviderBlockersStayBlocked: true;
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
  settingsPersistenceAllowedFromUi: false;
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

export type ProviderLiveTrialReleaseCandidateModel = {
  title: "Provider live trial release candidate";
  summary: string;
  candidates: ProviderLiveTrialReleaseCandidate[];
  boundary: ProviderLiveTrialReleaseCandidateBoundary;
  candidateLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderLiveTrialReleaseCandidateStableKey(
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
