export type ProviderGovernanceMvpAuditDecision =
  | "ready"
  | "ready with fixes"
  | "blocked";

export type ProviderGovernanceMvpAudit = {
  id: string;
  auditIdentity: string;
  coveredProviderSurfaces: string[];
  liveTestBoundaryReadiness: string;
  testResultPersistenceReadiness: string;
  costLatencyCalibrationReadiness: string;
  routerRecommendationReadiness: string;
  retrySafetyReadiness: string;
  privacyPolicyReadiness: string;
  knownGaps: string[];
  auditDecision: ProviderGovernanceMvpAuditDecision;
  auditDecisionLabel: string;
  nextRecommendedRoute: string;
  advancedAuditDetails: string;
};

export type ProviderGovernanceMvpAuditBoundary = {
  governanceAuditEnablesLiveRoutingAllowed: false;
  providerPolicyAutoChangeAllowed: false;
  providerRegistryMutationAllowed: false;
  silentProviderRegistryMutationAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerRetryAllowedFromUi: false;
  secretsInspectionAllowedFromUi: false;
  secretsDisplayedAllowed: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
  apiKeyExportAllowed: false;
  secretExportAllowed: false;
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

export type ProviderGovernanceMvpAuditModel = {
  title: "Provider governance MVP audit";
  summary: string;
  audits: ProviderGovernanceMvpAudit[];
  boundary: ProviderGovernanceMvpAuditBoundary;
  auditLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderGovernanceMvpAuditStableKey(
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
