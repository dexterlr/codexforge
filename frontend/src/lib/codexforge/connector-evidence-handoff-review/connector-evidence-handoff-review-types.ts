export type ConnectorEvidenceHandoffReviewStatus = "ready-for-review" | "blocked";

export type ConnectorEvidenceHandoffReview = {
  id: string;
  connectorEvidenceHandoffIdentity: string;
  evidenceHandoffGroups: string[];
  reviewBeforeUsePolicy: string[];
  citationSourceChecklist: string[];
  deniedHandoffActions: string[];
  memoryAndResearchBoundaryNotes: string[];
  blockedEvidenceHandoffRisks: string[];
  connectorReleaseCandidateRoute: string;
  automationDryRunRoute: string;
  nextRecommendedAction: string;
  status: ConnectorEvidenceHandoffReviewStatus;
  advancedHandoffDetails: string;
};

export type ConnectorEvidenceHandoffReviewBoundary = {
  connectorEvidenceHandoffReviewOnly: true;
  connectorEvidenceHandoffDoesNotIngestEvidenceAutomatically: true;
  connectorEvidenceRequiresOperatorReviewBeforeUse: true;
  privateConnectorEvidenceStaysRedacted: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorAccountConnectionAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  permissionGrantPersistenceAllowedFromUi: false;
  privateConnectorDetailsDisplayedAllowed: false;
  connectorEvidenceAutoIngestionAllowed: false;
  evidenceAutoIngestionAllowedFromUi: false;
  evidenceSentToProvidersAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
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
  credentialStorageAllowed: false;
  endpointStorageAllowed: false;
  tokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  sessionStorageApiKeyStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  routeCoverageRemovalAllowed: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ConnectorEvidenceHandoffReviewModel = {
  title: "Connector evidence handoff review";
  summary: string;
  reviews: ConnectorEvidenceHandoffReview[];
  boundary: ConnectorEvidenceHandoffReviewBoundary;
  handoffLanguage: string[];
  advancedDetails: string[];
};

export function buildConnectorEvidenceHandoffReviewStableKey(
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
