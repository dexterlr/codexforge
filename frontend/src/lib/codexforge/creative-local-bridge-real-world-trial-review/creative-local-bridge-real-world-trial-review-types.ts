export type CreativeLocalBridgeRealWorldTrialReviewStatus = "ready-for-review" | "blocked";

export type CreativeLocalBridgeRealWorldTrialReview = {
  id: string;
  creativeTrialIdentity: string;
  sourceFirstRealOperatorWorkflowTrial: string;
  operatorCreativeScenario: string;
  localBridgeToolReadinessSummary: string;
  blenderUnrealComfyUiBoundarySummary: string;
  renderGenerationApprovalGates: string[];
  artifactReviewChecklist: string[];
  blockedRealActions: string[];
  trialOutcomeNotes: string[];
  providerGovernanceTrialRoute: string;
  status: CreativeLocalBridgeRealWorldTrialReviewStatus;
  advancedCreativeTrialDetails: string;
};

export type CreativeLocalBridgeRealWorldTrialReviewBoundary = {
  creativeLocalBridgeTrialReviewOnly: true;
  creativeLocalBridgeTrialReviewDoesNotLaunchLocalTools: true;
  renderAndGenerationJobsRequireExplicitApproval: true;
  artifactsReviewedBeforeUse: true;
  localBridgeEndpointCallsAllowedFromUi: false;
  localToolLaunchAllowedFromUi: false;
  blenderLaunchAllowedFromUi: false;
  unrealLaunchAllowedFromUi: false;
  comfyUiLaunchAllowedFromUi: false;
  renderGenerationJobExecutionAllowedFromUi: false;
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
  providerApiCallsAllowedFromUi: false;
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

export type CreativeLocalBridgeRealWorldTrialReviewModel = {
  title: "Creative local bridge real-world trial review";
  summary: string;
  reviews: CreativeLocalBridgeRealWorldTrialReview[];
  boundary: CreativeLocalBridgeRealWorldTrialReviewBoundary;
  trialReviewLanguage: string[];
  advancedDetails: string[];
};

export function buildCreativeLocalBridgeRealWorldTrialReviewStableKey(
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
