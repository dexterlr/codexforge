export type ChangePlanLiveContextPlanningConfidence =
  | "high"
  | "medium"
  | "low"
  | "blocked";

export type CodebaseChangePlanLiveContextIntegration = {
  id: string;
  integrationIdentity: string;
  sourceProjectIntelligenceResult: string;
  changeRequestSummary: string;
  relevantFilesModulesSummary: string;
  dependencyRiskContext: string;
  secretsRedactionStatus: string;
  nonGoals: string;
  planningConfidence: ChangePlanLiveContextPlanningConfidence;
  patchPreviewRoute: string;
  blockedReasons: string[];
  advancedContextDetails: string;
};

export type CodebaseChangePlanLiveContextBoundary = {
  reviewedProjectIntelligenceRequired: true;
  liveContextModifiesFilesAllowed: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  rawFetchAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  livePatchGenerationAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  directJarvisdCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
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

export type CodebaseChangePlanLiveContextIntegrationModel = {
  title: "Codebase change plan live context integration";
  summary: string;
  integrations: CodebaseChangePlanLiveContextIntegration[];
  boundary: CodebaseChangePlanLiveContextBoundary;
  contextLanguage: string[];
  advancedDetails: string[];
};

export function buildCodebaseChangePlanLiveContextIntegrationStableKey(
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
