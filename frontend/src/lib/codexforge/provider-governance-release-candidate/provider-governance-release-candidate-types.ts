export type ProviderGovernanceReleaseCandidateDecision =
  | "ready"
  | "ready with fixes"
  | "blocked";

export type ProviderGovernanceReleaseCandidate = {
  id: string;
  releaseCandidateIdentity: string;
  coveredProviderSurfaces: string[];
  runbookReadiness: string;
  policyBundleReadiness: string;
  routerDryRunReadiness: string;
  liveTestReadiness: string;
  resultPersistenceReadiness: string;
  knownGaps: string[];
  releaseDecision: ProviderGovernanceReleaseCandidateDecision;
  releaseDecisionLabel: string;
  nextRecommendedRoute: string;
  blockedReasons: string[];
  advancedReleaseDetails: string;
};

export type ProviderGovernanceReleaseCandidateBoundary = {
  releaseCandidateEnablesProvidersAllowed: false;
  liveRoutingWithoutApprovalAllowed: false;
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
  apiKeyExportAllowed: false;
  secretExportAllowed: false;
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

export type ProviderGovernanceReleaseCandidateModel = {
  title: "Provider governance release candidate";
  summary: string;
  candidates: ProviderGovernanceReleaseCandidate[];
  boundary: ProviderGovernanceReleaseCandidateBoundary;
  releaseLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderGovernanceReleaseCandidateStableKey(
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
