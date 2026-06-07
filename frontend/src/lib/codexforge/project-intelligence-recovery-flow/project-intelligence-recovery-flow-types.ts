export type ProjectIntelligenceRecoveryFailureCategory =
  | "failed result"
  | "blocked scope"
  | "stale result"
  | "redaction follow-up";

export type ProjectIntelligenceRecovery = {
  id: string;
  recoveryIdentity: string;
  sourceProjectIntelligenceResult: string;
  failureCategory: ProjectIntelligenceRecoveryFailureCategory;
  staleBlockedScope: string;
  safeRecoveryChecklist: string[];
  retryEligibility: string;
  blockedRetryReasons: string[];
  redactionFollowUp: string;
  auditHandoff: string;
  nextRecommendedRoute: string;
  advancedRecoveryDetails: string;
};

export type ProjectIntelligenceRecoveryBoundary = {
  retryAutomaticAllowed: false;
  arbitraryRescanAllowed: false;
  recoveryMutationAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  rawFetchAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  directJarvisdCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretValuesDisplayedAllowed: false;
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

export type ProjectIntelligenceRecoveryFlowModel = {
  title: "Project intelligence recovery flow";
  summary: string;
  recoveries: ProjectIntelligenceRecovery[];
  boundary: ProjectIntelligenceRecoveryBoundary;
  recoveryLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectIntelligenceRecoveryFlowStableKey(
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
