export type ProviderTestResultPersistenceStatus =
  | "passed"
  | "failed"
  | "blocked"
  | "timed out"
  | "needs review";

export type ProviderTestResultPersistenceRecord = {
  id: string;
  persistenceIdentity: string;
  sourceLiveTestTrial: string;
  providerModelSummary: string;
  resultStatus: ProviderTestResultPersistenceStatus;
  responseSummary: string;
  redactionStatus: string;
  costLatencySummary: string;
  retentionPolicy: string;
  reviewInboxHandoff: string;
  calibrationRoute: string;
  blockedReasons: string[];
  advancedResultDetails: string;
};

export type ProviderTestResultPersistenceBoundary = {
  resultsReviewedBeforeUseRequired: true;
  rawResponsesPrimaryAllowed: false;
  apiKeysPersistedAllowed: false;
  secretsPersistedAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticLiveTestAllowed: false;
  automaticProviderSendAllowed: false;
  autoSpendTokensAllowed: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerRegistryMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
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
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type ProviderTestResultPersistenceModel = {
  title: "Provider test result persistence";
  summary: string;
  records: ProviderTestResultPersistenceRecord[];
  boundary: ProviderTestResultPersistenceBoundary;
  persistenceLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderTestResultPersistenceStableKey(
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
