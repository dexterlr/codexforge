export type JarvisdLocalApiHandshakeReadinessStatus =
  | "designed"
  | "waiting-for-approved-boundary"
  | "blocked";

export type JarvisdLocalApiHandshake = {
  id: string;
  handshakeIdentity: string;
  daemonEndpointSummary: string;
  localhostOnlyPolicy: string;
  versionRequirement: string;
  protocolVersion: string;
  nonceChallengePlaceholderShape: string;
  timeoutPolicy: string;
  retryPolicy: string;
  healthVersionDependency: string;
  readinessStatus: JarvisdLocalApiHandshakeReadinessStatus;
  blockedReasons: string[];
  advancedHandshakeDetails: string;
};

export type JarvisdLocalApiHandshakeBoundary = {
  automaticHandshakeAllowedFromUi: false;
  liveHandshakeAllowedFromArbitraryUi: false;
  rawFetchAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  endpointSecretStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  signingMaterialStorageAllowedInBrowser: false;
  daemonDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  secretsDisplayedAllowed: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  processEnvDisplayAllowed: false;
  settingsAutoImportAllowed: false;
  providerRegistryMutationAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdLocalApiHandshakeModel = {
  title: "Jarvisd local API handshake";
  summary: string;
  handshakes: JarvisdLocalApiHandshake[];
  boundary: JarvisdLocalApiHandshakeBoundary;
  handshakeLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdLocalApiHandshakeStableKey(
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
