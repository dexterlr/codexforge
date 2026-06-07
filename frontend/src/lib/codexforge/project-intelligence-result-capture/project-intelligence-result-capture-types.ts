export type ProjectIntelligenceResultStatus =
  | "passed"
  | "failed"
  | "blocked"
  | "needs review";

export type ProjectIntelligenceResult = {
  id: string;
  resultIdentity: string;
  sourceIndexTrial: string;
  sourceSearchTrial: string;
  sourceDependencyTrial: string;
  sourceRiskSecretsTrial: string;
  resultStatus: ProjectIntelligenceResultStatus;
  workspaceScopeSummary: string;
  findingsSummary: string;
  redactionStatus: string;
  riskSecretsFollowUp: string;
  reviewInboxHandoff: string;
  recoveryRoute: string;
  nextRecommendedRoute: string;
  blockedReasons: string[];
  advancedResultDetails: string;
};

export type ProjectIntelligenceResultCaptureBoundary = {
  reviewBeforeUseRequired: true;
  sourceLiveTrialsRequired: true;
  secretValuesRedacted: true;
  memoryAutoPromotionAllowed: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  rawFetchAllowedFromUi: false;
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
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type ProjectIntelligenceResultCaptureModel = {
  title: "Project intelligence result capture";
  summary: string;
  results: ProjectIntelligenceResult[];
  boundary: ProjectIntelligenceResultCaptureBoundary;
  resultLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectIntelligenceResultCaptureStableKey(
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
