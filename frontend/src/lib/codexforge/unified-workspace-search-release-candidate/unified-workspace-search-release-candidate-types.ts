export type UnifiedWorkspaceSearchReleaseCandidateStatus = "ready-for-review" | "blocked";

export type UnifiedWorkspaceSearchReleaseCandidate = {
  id: string;
  unifiedSearchCandidateIdentity: string;
  sourceSearchPreviews: string[];
  searchScopeMatrix: string[];
  deniedSourceMatrix: string[];
  approvalGates: string[];
  privacyRedactionRequirements: string[];
  releaseBlockers: string[];
  providerReadinessRoute: string;
  connectorReadinessRoute: string;
  nextRecommendedAction: string;
  status: UnifiedWorkspaceSearchReleaseCandidateStatus;
  advancedCandidateDetails: string;
};

export type UnifiedWorkspaceSearchReleaseCandidateBoundary = {
  unifiedWorkspaceSearchReleaseCandidateReviewOnly: true;
  unifiedSearchCandidateDoesNotRunLiveSearch: true;
  liveSearchRequiresExplicitApproval: true;
  deniedSourcesRemainBlocked: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  liveSearchExecutionAllowedFromUi: false;
  searchExecutionAllowedFromUi: false;
  searchQueryPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  promptFileProjectConnectorSearchEvidenceDataAutoSendAllowed: false;
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
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
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

export type UnifiedWorkspaceSearchReleaseCandidateModel = {
  title: "Unified workspace search release candidate";
  summary: string;
  candidates: UnifiedWorkspaceSearchReleaseCandidate[];
  boundary: UnifiedWorkspaceSearchReleaseCandidateBoundary;
  candidateLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedWorkspaceSearchReleaseCandidateStableKey(
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
