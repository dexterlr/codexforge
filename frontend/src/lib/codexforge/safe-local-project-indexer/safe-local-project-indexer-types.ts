export type SafeLocalProjectIndexerStatus = "review-required" | "ready-for-review" | "blocked";

export type SafeLocalProjectIndex = {
  id: string;
  projectIdentity: string;
  trustedWorkspaceStatus: SafeLocalProjectIndexerStatus;
  allowedRootsSummary: string;
  deniedRootsSummary: string;
  indexScope: string;
  fileTypeSummary: string;
  excludedPathsSummary: string;
  privacySecretsPolicy: string;
  auditNote: string;
  blockedReasons: string[];
  advancedIndexDetails: string;
};

export type SafeLocalProjectIndexerBoundary = {
  indexingBehindApprovedLocalBoundary: true;
  arbitraryLocalFileCrawlingAllowed: false;
  secretsReadAllowed: false;
  secretsDisplayedAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  localActionsWithoutReviewAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type SafeLocalProjectIndexerModel = {
  title: "Safe local project indexer";
  summary: string;
  indexes: SafeLocalProjectIndex[];
  boundary: SafeLocalProjectIndexerBoundary;
  indexerLanguage: string[];
  advancedDetails: string[];
};

export function buildSafeLocalProjectIndexerStableKey(
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
