export type ProjectSearchLiveTrialStatus =
  | "review-required"
  | "redacted-preview"
  | "blocked";

export type ProjectSearchLiveTrial = {
  id: string;
  searchTrialIdentity: string;
  sourceIndexTrial: string;
  querySummary: string;
  approvedSearchScope: string;
  excludedPathsSummary: string;
  resultPreviewSummary: string;
  sensitiveMatchHandling: string;
  redactionStatus: string;
  filePreviewBridgeRoute: string;
  auditHandoff: string;
  serverSearchRoute: string;
  blockedReasons: string[];
  status: ProjectSearchLiveTrialStatus;
  advancedSearchDetails: string;
};

export type ProjectSearchLiveTrialBoundary = {
  approvedBoundedIndexedWorkspaceDataRequired: true;
  sourceIndexTrialRequired: true;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  sensitiveMatchesRedactedUntilReview: true;
  secretValuesDisplayedAllowed: false;
  directJarvisdCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  apiKeyLocalStorageAllowed: false;
  processEnvDisplayAllowed: false;
  auditLogMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type ProjectSearchLiveTrialModel = {
  title: "Project search live trial";
  summary: string;
  trials: ProjectSearchLiveTrial[];
  boundary: ProjectSearchLiveTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectSearchLiveTrialStableKey(
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
