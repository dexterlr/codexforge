export type JarvisdSafeFileSearchBridgeStatus =
  | "review-required"
  | "redacted-results"
  | "blocked";

export type JarvisdSafeFileSearchBridge = {
  id: string;
  searchBridgeIdentity: string;
  workspaceTrustDependency: string;
  indexSyncDependency: string;
  querySummary: string;
  allowedSearchScope: string;
  excludedPathsSummary: string;
  sensitiveMatchHandling: string;
  redactionStatus: string;
  resultCaptureRoute: string;
  auditHandoff: string;
  blockedReasons: string[];
  searchResultStatus: JarvisdSafeFileSearchBridgeStatus;
  advancedSearchDetails: string;
};

export type JarvisdSafeFileSearchBridgeBoundary = {
  approvedIndexedWorkspaceDataRequired: true;
  approvedLocalBoundaryRequired: true;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  liveSearchAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  liveHandshakeAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  sensitiveMatchesRedactedUntilReview: true;
  secretValuesDisplayedAllowed: false;
  secretsExportedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  apiKeyLocalStorageAllowed: false;
  processEnvDisplayAllowed: false;
  auditLogMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type JarvisdSafeFileSearchBridgeModel = {
  title: "Jarvisd safe file search bridge";
  summary: string;
  searches: JarvisdSafeFileSearchBridge[];
  boundary: JarvisdSafeFileSearchBridgeBoundary;
  searchLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdSafeFileSearchBridgeStableKey(
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
