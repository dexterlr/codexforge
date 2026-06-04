export type JarvisdDaemonMvpLifecycleStatus =
  | "planned"
  | "configured"
  | "blocked"
  | "ready-for-approved-bridge";

export type JarvisdLocalDaemonMvpScaffold = {
  id: string;
  daemonScaffoldIdentity: string;
  localOnlyEndpointPolicy: string;
  lifecycleStatus: JarvisdDaemonMvpLifecycleStatus;
  lifecycleStatusLabel: string;
  requiredOperatorSetup: string[];
  supportedMvpSurfaces: string[];
  unsupportedActions: string[];
  auditDependency: string;
  permissionDependency: string;
  recoveryDependency: string;
  nextRecommendedRoute: string;
  blockedReasons: string[];
  advancedScaffoldDetails: string;
};

export type JarvisdLocalDaemonMvpScaffoldBoundary = {
  daemonProcessCreationAllowedFromFrontend: false;
  daemonInstallAllowedFromFrontend: false;
  daemonStartupAllowedFromFrontend: false;
  daemonDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  automaticLocalActionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  secretsDisplayedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  settingsAutoImportAllowed: false;
  settingsAutoExportSecretsAllowed: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  providerRegistryMutationAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdLocalDaemonMvpScaffoldModel = {
  title: "Jarvisd local daemon MVP scaffold";
  summary: string;
  scaffolds: JarvisdLocalDaemonMvpScaffold[];
  boundary: JarvisdLocalDaemonMvpScaffoldBoundary;
  scaffoldLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdLocalDaemonMvpScaffoldStableKey(
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
