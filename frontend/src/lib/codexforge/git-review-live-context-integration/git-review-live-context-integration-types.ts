export type GitReviewLiveContextStatus = "review-ready" | "blocked";

export type GitReviewLiveContextIntegration = {
  id: string;
  integrationIdentity: string;
  sourceProjectIntelligenceResult: string;
  sourcePatchPreviewLiveContext: string;
  sourceTestResultCapture: string;
  changedFilesSummary: string;
  diffReviewSummary: string;
  validationCoverage: string;
  riskSecretsRedactionStatus: string;
  commitTrialRoute: string;
  blockedReasons: string[];
  status: GitReviewLiveContextStatus;
  advancedGitContextDetails: string;
};

export type GitReviewLiveContextBoundary = {
  reviewedProjectIntelligenceRequired: true;
  reviewedPatchPreviewLiveContextRequired: true;
  reviewedTestResultCaptureRequired: true;
  liveContextRunsGitAllowed: false;
  commitCreationAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  localActionExecutionAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  pushBranchesTagsAllowedFromUi: false;
  branchCreationAllowedFromUi: false;
  tagCreationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  openAiCompatibleApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  secretValuesDisplayedAllowed: false;
  suspectedSecretsRedacted: true;
  apiKeyLocalStorageAllowed: false;
  sessionTokenStorageAllowedInBrowser: false;
  signingMaterialStorageAllowedInBrowser: false;
  processEnvDisplayAllowed: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type GitReviewLiveContextIntegrationModel = {
  title: "Git review live context integration";
  summary: string;
  integrations: GitReviewLiveContextIntegration[];
  boundary: GitReviewLiveContextBoundary;
  contextLanguage: string[];
  advancedDetails: string[];
};

export function buildGitReviewLiveContextIntegrationStableKey(
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
