export type LocalProcessMonitorPreviewStatus = "preview-only" | "boundary-required" | "blocked";

export type LocalProcessMonitorPreview = {
  id: string;
  processGroupSummary: string;
  processStatusSummary: string;
  sourceCapability: string;
  readOnlyScope: string;
  refreshPolicy: string;
  healthDependency: string;
  permissionDependency: string;
  blockedReasons: string[];
  recoveryRoute: string;
  auditNote: string;
  status: LocalProcessMonitorPreviewStatus;
  advancedProcessDetails: string;
};

export type LocalProcessMonitorPreviewBoundary = {
  processDataMutationAllowedFromUi: false;
  liveMonitoringWithoutBoundaryAllowed: false;
  pollingFromArbitraryUiAllowed: false;
  processKillAllowedFromUi: false;
  processRestartAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  localStateMutationAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
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

export type LocalProcessMonitorPreviewModel = {
  title: "Local process monitor preview";
  summary: string;
  processGroups: LocalProcessMonitorPreview[];
  boundary: LocalProcessMonitorPreviewBoundary;
  previewLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalProcessMonitorPreviewStableKey(
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
