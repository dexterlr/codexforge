export type LiveBackendBoundaryInventoryStatus = "ready-for-review" | "blocked";

export type LiveBackendBoundaryInventory = {
  id: string;
  liveBackendBoundaryInventoryIdentity: string;
  boundaryGroups: string[];
  providerBoundaryStatus: string[];
  localModelBoundaryStatus: string[];
  connectorBoundaryStatus: string[];
  automationBoundaryStatus: string[];
  fileTestExecutionBoundaryStatus: string[];
  evidenceLoggingBoundaryStatus: string[];
  deniedInventoryActions: string[];
  unresolvedBackendBoundaryGaps: string[];
  providerExecutionReadinessRoute: string;
  localModelExecutionReadinessRoute: string;
  nextRecommendedAction: string;
  status: LiveBackendBoundaryInventoryStatus;
  advancedLiveBackendBoundaryInventoryDetails: string;
};

export type LiveBackendBoundaryInventoryBoundary = {
  reviewOnly: true; approvalRequired: true; boundaryProbeExecutionAllowedFromUi: false; backendCallsAllowedFromUi: false; liveExecutionProofClaimedByUi: false; workflowExecutionAllowedFromUi: false; providerApiCallsAllowedFromUi: false; localModelCallsAllowedFromUi: false; localBridgeEndpointCallsAllowedFromUi: false; connectorApiCallsAllowedFromUi: false; automationCreationAllowedFromUi: false; fileMutationAllowedFromUi: false; outputStorageAllowed: false; credentialStorageAllowed: false;
};

export type LiveBackendBoundaryInventoryModel = {
  title: "Live backend boundary inventory";
  summary: string;
  inventories: LiveBackendBoundaryInventory[];
  boundary: LiveBackendBoundaryInventoryBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildLiveBackendBoundaryInventoryStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
