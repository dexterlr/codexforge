export type ProjectRiskSecretsScanLiveTrialSeverity =
  | "low"
  | "medium"
  | "high"
  | "critical"
  | "blocked";

export type ProjectRiskSecretsScanLiveTrialStatus =
  | "review-required"
  | "redacted-preview"
  | "blocked";

export type ProjectRiskSecretsScanLiveTrial = {
  id: string;
  scanTrialIdentity: string;
  sourceTrialSummary: string;
  approvedScanScope: string;
  riskCategories: string;
  suspectedSecretIndicator: string;
  redactionStatus: string;
  severitySummary: string;
  severity: ProjectRiskSecretsScanLiveTrialSeverity;
  recommendedAction: string;
  resultReviewRoute: string;
  auditHandoff: string;
  blockedReasons: string[];
  status: ProjectRiskSecretsScanLiveTrialStatus;
  advancedFindingDetails: string;
};

export type ProjectRiskSecretsScanLiveTrialBoundary = {
  approvedBoundedWorkspaceDataRequired: true;
  sourceIndexSearchDependencyRequired: true;
  arbitraryLocalScanningAllowed: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  suspectedSecretsRedacted: true;
  secretValuesDisplayedAllowed: false;
  findingsSentToProvidersAutomaticallyAllowed: false;
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

export type ProjectRiskSecretsScanLiveTrialModel = {
  title: "Project risk secrets scan live trial";
  summary: string;
  trials: ProjectRiskSecretsScanLiveTrial[];
  boundary: ProjectRiskSecretsScanLiveTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectRiskSecretsScanLiveTrialStableKey(
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
