export type JarvisdFileReadPreviewBridgeStatus =
  | "review-required"
  | "redacted-preview"
  | "blocked";

export type JarvisdFileReadPreviewBridge = {
  id: string;
  previewBridgeIdentity: string;
  sourceWorkspaceTrust: string;
  fileOperationApprovalDependency: string;
  permissionRuntimeEnforcementDependency: string;
  signedRequestDependency: string;
  allowedPathScopeSummary: string;
  deniedPathScopeSummary: string;
  redactionStatus: string;
  previewResultStatus: JarvisdFileReadPreviewBridgeStatus;
  auditHandoff: string;
  blockedReasons: string[];
  advancedPreviewDetails: string;
};

export type JarvisdFileReadPreviewBridgeBoundary = {
  approvedScopeRequired: true;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  directFileReadAllowedFromUi: false;
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

export type JarvisdFileReadPreviewBridgeModel = {
  title: "Jarvisd file read preview bridge";
  summary: string;
  previews: JarvisdFileReadPreviewBridge[];
  boundary: JarvisdFileReadPreviewBridgeBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdFileReadPreviewBridgeStableKey(
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
