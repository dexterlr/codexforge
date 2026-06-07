export type ProjectIndexerLiveTrialStatus =
  | "review-required"
  | "ready-for-review"
  | "blocked";

export type ProjectIndexerLiveTrial = {
  id: string;
  liveTrialIdentity: string;
  trustedWorkspaceDependency: string;
  approvedBoundedRootSummary: string;
  indexScopeSummary: string;
  excludedPathsSummary: string;
  fileTypeCoverage: string;
  syncResultStatus: string;
  privacySecretsRedactionStatus: string;
  auditHandoff: string;
  recoveryRoute: string;
  serverSnapshotRoute: string;
  blockedReasons: string[];
  status: ProjectIndexerLiveTrialStatus;
  advancedIndexDetails: string;
};

export type ProjectIndexerLiveTrialBoundary = {
  approvedBoundedWorkspaceDataRequired: true;
  trustedWorkspaceRequired: true;
  arbitraryLocalFileCrawlingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  secretsReadAllowed: false;
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

export type ProjectIndexerLiveTrialModel = {
  title: "Project indexer live trial";
  summary: string;
  trials: ProjectIndexerLiveTrial[];
  boundary: ProjectIndexerLiveTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectIndexerLiveTrialStableKey(
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
