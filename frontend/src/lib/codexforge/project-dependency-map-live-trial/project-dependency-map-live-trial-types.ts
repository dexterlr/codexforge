export type ProjectDependencyMapLiveTrialStatus =
  | "review-required"
  | "metadata-ready"
  | "unknown"
  | "blocked";

export type ProjectDependencyMapLiveTrial = {
  id: string;
  dependencyTrialIdentity: string;
  sourceIndexTrial: string;
  dependencySourceSummary: string;
  internalModuleRelationshipSummary: string;
  externalPackageSummary: string;
  staleUnknownMarkers: string;
  riskNote: string;
  commandDryRunRoute: string;
  riskScanRoute: string;
  auditHandoff: string;
  approvedMetadataRoute: string;
  blockedReasons: string[];
  status: ProjectDependencyMapLiveTrialStatus;
  advancedDependencyDetails: string;
};

export type ProjectDependencyMapLiveTrialBoundary = {
  approvedIndexedMetadataRequired: true;
  sourceIndexTrialRequired: true;
  packageInstallAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  directJarvisdCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  secretValuesDisplayedAllowed: false;
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
};

export type ProjectDependencyMapLiveTrialModel = {
  title: "Project dependency map live trial";
  summary: string;
  trials: ProjectDependencyMapLiveTrial[];
  boundary: ProjectDependencyMapLiveTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectDependencyMapLiveTrialStableKey(
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
