export type ProviderGovernanceRealWorldTrialReviewStatus = "ready-for-review" | "blocked";

export type ProviderGovernanceRealWorldTrialReview = {
  id: string;
  providerTrialIdentity: string;
  sourceProviderGovernanceSurfaces: string;
  operatorProviderScenario: string;
  selectedProviderPolicySummary: string;
  budgetTokenGuardrailSummary: string;
  promptPrivacyReview: string;
  applyExportApprovalGates: string[];
  blockedRealActions: string[];
  trialOutcomeNotes: string[];
  projectKnowledgeTrialRoute: string;
  status: ProviderGovernanceRealWorldTrialReviewStatus;
  advancedProviderTrialDetails: string;
};

export type ProviderGovernanceRealWorldTrialReviewBoundary = {
  providerGovernanceTrialReviewOnly: true;
  providerGovernanceTrialReviewDoesNotCallProviders: true;
  tokenSpendingRequiresExplicitApproval: true;
  promptFileDataNotSentAutomatically: true;
  providerApiCallsAllowedFromUi: false;
  tokenSpendAllowedFromUi: false;
  autoSpendTokensAllowed: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  providerRegistryMutationAllowed: false;
  silentProviderRegistryMutationAllowed: false;
  policyApplyAllowedFromUi: false;
  exportWriteAllowedFromUi: false;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  codingTaskExecutionAllowedFromUi: false;
  taskExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commitCreationAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  automaticWebBrowsingAllowed: false;
  webBrowsingAllowedFromUi: false;
  sourceAutoFetchAllowed: false;
  connectorApiCallsAllowedFromUi: false;
  gmailApiCallsAllowedFromUi: false;
  calendarApiCallsAllowedFromUi: false;
  contactsApiCallsAllowedFromUi: false;
  googleApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  oauthRequestFlowAllowedFromUi: false;
  connectorAuthorizationAllowedFromUi: false;
  connectorDataReadFromPageAllowed: false;
  tokenStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  promptFileProjectDataAutoSendAllowed: false;
  promptFileProjectConnectorDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
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
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ProviderGovernanceRealWorldTrialReviewModel = {
  title: "Provider governance real-world trial review";
  summary: string;
  reviews: ProviderGovernanceRealWorldTrialReview[];
  boundary: ProviderGovernanceRealWorldTrialReviewBoundary;
  trialReviewLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderGovernanceRealWorldTrialReviewStableKey(
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
