export type ProviderRunbookFinalizationStatus =
  | "ready-for-review"
  | "blocked";

export type ProviderRunbookFinalization = {
  id: string;
  runbookIdentity: string;
  sourceGovernanceAudit: string;
  sourcePolicyBundleExportReview: string;
  approvedProviderModelSummary: string;
  privacyClassifications: string[];
  budgetGuardrails: string[];
  retryGuidance: string;
  rollbackGuidance: string;
  operatorChecklist: string[];
  blockedReasons: string[];
  status: ProviderRunbookFinalizationStatus;
  advancedRunbookDetails: string;
};

export type ProviderRunbookFinalizationBoundary = {
  runbookIncludesApiKeysAllowed: false;
  runbookIncludesSecretsAllowed: false;
  apiKeyExportAllowed: false;
  secretExportAllowed: false;
  providerCredentialsIncludedAllowed: false;
  providerRoutingEnabledFromPageAllowed: false;
  providerRegistryMutationAllowed: false;
  silentProviderRegistryMutationAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerRetryAllowedFromUi: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
  apiKeyLocalStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  rawFetchAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type ProviderRunbookFinalizationModel = {
  title: "Provider runbook finalization";
  summary: string;
  finalizations: ProviderRunbookFinalization[];
  boundary: ProviderRunbookFinalizationBoundary;
  runbookLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderRunbookFinalizationStableKey(
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
