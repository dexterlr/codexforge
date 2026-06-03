export type JarvisdContractReadinessStatus =
  | "ready-for-review"
  | "boundary-required"
  | "blocked";

export type JarvisdLocalDaemonContract = {
  id: string;
  daemonIdentity: string;
  localEndpointPolicy: string;
  protocolBoundary: string;
  capabilityNegotiationShape: string;
  permissionModelSummary: string;
  auditRequirement: string;
  healthProbeRoute: string;
  capabilityRegistryRoute: string;
  permissionBoundaryRoute: string;
  blockedReasons: string[];
  readinessStatus: JarvisdContractReadinessStatus;
  advancedContractDetails: string;
};

export type JarvisdLocalDaemonContractBoundary = {
  daemonClientEnabledFromUi: false;
  automaticDaemonCallAllowed: false;
  commandExecutionAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  fileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  secretsDisplayedAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdLocalDaemonContractModel = {
  title: "Jarvisd local daemon contract";
  summary: string;
  contracts: JarvisdLocalDaemonContract[];
  boundary: JarvisdLocalDaemonContractBoundary;
  contractLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdLocalDaemonContractStableKey(
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
