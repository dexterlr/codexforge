export type MvpEndToEndGuidedTrialStatus = "ready-for-review" | "blocked";

export type MvpEndToEndGuidedTrialStep = {
  id: string;
  loopName: string;
  stepSummary: string;
  expectedReviewGate: string;
  simulatedOutcome: string;
  blockedActions: string[];
  route: string;
};

export type MvpEndToEndGuidedTrial = {
  id: string;
  guidedTrialIdentity: string;
  trialScenarioSummary: string;
  steps: MvpEndToEndGuidedTrialStep[];
  expectedReviewGates: string[];
  simulatedOutcomes: string[];
  blockedActions: string[];
  regressionMatrixRoute: string;
  releaseCandidateRoute: string;
  status: MvpEndToEndGuidedTrialStatus;
  advancedTrialDetails: string;
};

export type MvpEndToEndGuidedTrialBoundary = {
  guidedTrialReviewOnlyUntilApproved: true;
  noWorkflowRunsAutomatically: true;
  blockedActionsRemainBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  promptFileProjectDataAutoSendAllowed: false;
  promptFileProjectConnectorDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
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
  tokenStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type MvpEndToEndGuidedTrialModel = {
  title: "MVP end-to-end guided trial";
  summary: string;
  trials: MvpEndToEndGuidedTrial[];
  boundary: MvpEndToEndGuidedTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildMvpEndToEndGuidedTrialStableKey(
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
