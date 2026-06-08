export type ProviderPolicyBundleExportReviewStatus =
  | "ready-for-review"
  | "blocked";

export type ProviderPolicyBundleExportReview = {
  id: string;
  exportReviewIdentity: string;
  sourceGovernanceAudit: string;
  includedNonSecretPolicyFields: string[];
  excludedSecretFields: string[];
  providerModelRoutingNotes: string;
  privacyClassifications: string[];
  budgetGuardrails: string[];
  compatibilityNotes: string;
  approvalRequirement: string;
  blockedReasons: string[];
  status: ProviderPolicyBundleExportReviewStatus;
  advancedBundleDetails: string;
};

export type ProviderPolicyBundleExportReviewBoundary = {
  policyBundleSecretsExportAllowed: false;
  apiKeyExportAllowed: false;
  secretExportAllowed: false;
  providerCredentialsExportAllowed: false;
  providerCredentialsIncludedAllowed: false;
  secretsIncludedAllowed: false;
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

export type ProviderPolicyBundleExportReviewModel = {
  title: "Provider policy bundle export review";
  summary: string;
  reviews: ProviderPolicyBundleExportReview[];
  boundary: ProviderPolicyBundleExportReviewBoundary;
  exportLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderPolicyBundleExportReviewStableKey(
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
