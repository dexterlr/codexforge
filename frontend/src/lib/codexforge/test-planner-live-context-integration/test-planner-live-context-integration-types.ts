export type TestPlannerLiveContextStatus = "review-ready" | "blocked";

export type TestPlannerLiveContextConfidence =
  | "high"
  | "medium"
  | "low"
  | "blocked";

export type TestPlannerLiveContextIntegration = {
  id: string;
  integrationIdentity: string;
  sourceProjectIntelligenceResult: string;
  sourcePatchPreviewLiveContext: string;
  affectedFilesModulesSummary: string;
  recommendedTestScope: string;
  recommendedCommandSummary: string;
  riskSecretsRedactionStatus: string;
  confidenceCoverageNote: string;
  executionTrialRoute: string;
  blockedReasons: string[];
  status: TestPlannerLiveContextStatus;
  confidence: TestPlannerLiveContextConfidence;
  advancedContextDetails: string;
};

export type TestPlannerLiveContextBoundary = {
  reviewedProjectIntelligenceRequired: true;
  reviewedPatchPreviewLiveContextRequired: true;
  liveContextRunsTestsAllowed: false;
  commandsExecutedFromPageAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  localActionExecutionAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  rawFetchAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  openAiCompatibleApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  secretValuesDisplayedAllowed: false;
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

export type TestPlannerLiveContextIntegrationModel = {
  title: "Test planner live context integration";
  summary: string;
  integrations: TestPlannerLiveContextIntegration[];
  boundary: TestPlannerLiveContextBoundary;
  contextLanguage: string[];
  advancedDetails: string[];
};

export function buildTestPlannerLiveContextIntegrationStableKey(
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
