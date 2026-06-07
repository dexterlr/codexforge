export type PatchPreviewLiveContextStatus =
  | "review-required"
  | "blocked";

export type PatchPreviewWorkbenchLiveContextIntegration = {
  id: string;
  integrationIdentity: string;
  sourceChangePlanLiveContext: string;
  sourceProjectIntelligenceResult: string;
  affectedFilesSummary: string;
  dependencyRiskContext: string;
  redactionStatus: string;
  hunkContextSummary: string;
  approvalRoute: string;
  rollbackNote: string;
  blockedReasons: string[];
  status: PatchPreviewLiveContextStatus;
  advancedPatchContextDetails: string;
};

export type PatchPreviewWorkbenchLiveContextBoundary = {
  reviewedChangePlanLiveContextRequired: true;
  reviewedProjectIntelligenceRequired: true;
  previewAppliesPatchesAllowed: false;
  rawDiffsPrimaryAllowed: false;
  suspectedSecretsRedacted: true;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  rawFetchAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
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

export type PatchPreviewWorkbenchLiveContextIntegrationModel = {
  title: "Patch preview workbench live context integration";
  summary: string;
  integrations: PatchPreviewWorkbenchLiveContextIntegration[];
  boundary: PatchPreviewWorkbenchLiveContextBoundary;
  patchContextLanguage: string[];
  advancedDetails: string[];
};

export function buildPatchPreviewWorkbenchLiveContextIntegrationStableKey(
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
