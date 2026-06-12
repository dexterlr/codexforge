export type ProviderAuditTrailReviewStatus = "ready-for-review" | "blocked";

export type ProviderAuditTrailReview = {
  id: string;
  providerAuditTrailIdentity: string;
  auditEventGroups: string[];
  providerRequestResponseReviewPolicy: string[];
  redactionAndPrivacyRules: string[];
  deniedAuditActions: string[];
  retentionBoundaryChecklist: string[];
  blockedAuditTrailRisks: string[];
  hardeningPassRoute: string;
  providerSelectionRoute: string;
  nextRecommendedAction: string;
  status: ProviderAuditTrailReviewStatus;
  advancedAuditDetails: string;
};

export type ProviderAuditTrailReviewBoundary = {
  providerAuditTrailReviewReviewOnly: true;
  providerAuditTrailReviewDoesNotStoreProviderOutputs: true;
  providerAuditEventsRequireOperatorReview: true;
  privatePromptsAndOutputsStayRedacted: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerConnectionAllowedFromUi: false;
  providerConnectionTestsAllowedFromUi: false;
  liveProviderTrafficAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  providerOutputIngestionAllowedFromUi: false;
  providerOutputRetentionAllowedFromUi: false;
  providerAuditEventPersistenceAllowedFromUi: false;
  auditEventPersistenceAllowedFromUi: false;
  providerTrialDataPersistenceAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  promptFileProjectConnectorProviderModelOutputAuditDataAutoSendAllowed: false;
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
  memoryMutationAllowedFromUi: false;
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
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  sessionStorageApiKeyStorageAllowed: false;
  outputStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ProviderAuditTrailReviewModel = {
  title: "Provider audit trail review";
  summary: string;
  auditTrails: ProviderAuditTrailReview[];
  boundary: ProviderAuditTrailReviewBoundary;
  auditLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderAuditTrailReviewStableKey(
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
