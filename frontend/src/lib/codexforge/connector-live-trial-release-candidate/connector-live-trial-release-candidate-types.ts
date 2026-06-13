export type ConnectorLiveTrialReleaseCandidateStatus = "ready-for-review" | "blocked";

export type ConnectorLiveTrialReleaseCandidate = {
  id: string;
  connectorLiveTrialCandidateIdentity: string;
  liveAccessGuardStatus: string[];
  firstConnectorTrialStatus: string[];
  evidenceCaptureStatus: string[];
  redactionPrivacyStatus: string[];
  deniedConnectorLivePaths: string[];
  unresolvedConnectorBlockers: string[];
  automationLiveGuardRoute: string;
  automationDryRunReplayRoute: string;
  nextRecommendedAction: string;
  status: ConnectorLiveTrialReleaseCandidateStatus;
  advancedCandidateDetails: string;
};

export type ConnectorLiveTrialReleaseCandidateBoundary = {
  connectorLiveTrialReleaseCandidateReviewOnly: true;
  connectorLiveTrialReleaseCandidateDoesNotCallConnectorApis: true;
  connectorLiveTrialReleaseRequiresExplicitApproval: true;
  unresolvedConnectorBlockersStayBlocked: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorAccountConnectionAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  connectorPermissionPersistenceAllowedFromUi: false;
  permissionGrantPersistenceAllowedFromUi: false;
  connectorEvidenceAutoIngestionAllowed: false;
  evidenceAutoIngestionAllowedFromUi: false;
  evidenceSentToProvidersAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  automationRulePersistenceAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  scheduleCreationAllowedFromUi: false;
  conditionalWatchCreationAllowedFromUi: false;
  watchCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  creativeAssetGenerationAllowedFromUi: false;
  researchExecutionAllowedFromUi: false;
  codingWorkflowExecutionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  webSearchApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  gitCommandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  testBuildSmokeExecutionAllowedFromUi: false;
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

export type ConnectorLiveTrialReleaseCandidateModel = {
  title: "Connector live trial release candidate";
  summary: string;
  candidates: ConnectorLiveTrialReleaseCandidate[];
  boundary: ConnectorLiveTrialReleaseCandidateBoundary;
  candidateLanguage: string[];
  advancedDetails: string[];
};

export function buildConnectorLiveTrialReleaseCandidateStableKey(
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
