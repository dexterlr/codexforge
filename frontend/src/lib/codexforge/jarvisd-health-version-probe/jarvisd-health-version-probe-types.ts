export type JarvisdHealthProbeStatus =
  | "not-run"
  | "ready-for-boundary"
  | "blocked";

export type JarvisdHealthVersionProbe = {
  id: string;
  daemonEndpointSummary: string;
  localhostOnlyPolicy: string;
  versionRequirement: string;
  healthStatus: string;
  timeoutPolicy: string;
  retryPolicy: string;
  capabilityRegistryDependency: string;
  permissionBoundaryDependency: string;
  auditHandoff: string;
  blockedReasons: string[];
  probeStatus: JarvisdHealthProbeStatus;
  advancedProbeDetails: string;
};

export type JarvisdHealthVersionProbeBoundary = {
  automaticProbeAllowed: false;
  daemonFetchAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  fileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  secretsDisplayedAllowed: false;
  credentialStorageAllowed: false;
  environmentValueDisplayAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdHealthVersionProbeModel = {
  title: "Jarvisd health and version probe";
  summary: string;
  probes: JarvisdHealthVersionProbe[];
  boundary: JarvisdHealthVersionProbeBoundary;
  probeLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdHealthVersionProbeStableKey(
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
