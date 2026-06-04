export type JarvisdWorkspaceIndexSyncStatus =
  | "review-required"
  | "metadata-sync-ready"
  | "blocked";

export type JarvisdWorkspaceIndexSync = {
  id: string;
  indexSyncIdentity: string;
  trustedWorkspaceDependency: string;
  allowedRootsSummary: string;
  deniedRootsSummary: string;
  excludedPathsSummary: string;
  fileTypePolicy: string;
  syncStatus: JarvisdWorkspaceIndexSyncStatus;
  privacySecretsPolicy: string;
  auditHandoff: string;
  recoveryRoute: string;
  blockedReasons: string[];
  advancedSyncDetails: string;
};

export type JarvisdWorkspaceIndexSyncBoundary = {
  approvedLocalBoundaryRequired: true;
  trustedWorkspaceRequired: true;
  arbitraryLocalFileCrawlingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  secretsReadAllowed: false;
  secretValuesDisplayedAllowed: false;
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

export type JarvisdWorkspaceIndexSyncModel = {
  title: "Jarvisd workspace index sync";
  summary: string;
  syncs: JarvisdWorkspaceIndexSync[];
  boundary: JarvisdWorkspaceIndexSyncBoundary;
  syncLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdWorkspaceIndexSyncStableKey(
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
