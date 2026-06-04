export type JarvisdKillSwitchShutdownStatus =
  | "review-only"
  | "blocked"
  | "approved-boundary-required";

export type JarvisdKillSwitchShutdownReview = {
  id: string;
  shutdownRequestIdentity: string;
  triggerReason: string;
  activeSessionSummary: string;
  inFlightCapabilitySummary: string;
  safeShutdownChecklist: string[];
  artifactOperationRetentionNote: string;
  requiredConfirmationCopy: string;
  recoveryConsoleRoute: string;
  auditHandoff: string;
  blockedReasons: string[];
  shutdownStatus: JarvisdKillSwitchShutdownStatus;
  advancedShutdownDetails: string;
};

export type JarvisdKillSwitchSafeShutdownBoundary = {
  killSwitchExecutionAllowedFromUi: false;
  safeShutdownExecutionAllowedFromUi: false;
  processKillAllowedFromUi: false;
  processRestartAllowedFromUi: false;
  processShutdownAllowedFromUi: false;
  daemonRestartAllowedFromUi: false;
  daemonShutdownAllowedFromUi: false;
  localStateMutationAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  daemonDirectCallAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  liveHandshakeAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  auditLogMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  artifactDeletionAllowedFromUi: false;
  settingsAutoImportAllowed: false;
  secretsDisplayedAllowed: false;
  secretsExportedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  processEnvDisplayAllowed: false;
  providerRegistryMutationAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdKillSwitchSafeShutdownModel = {
  title: "Jarvisd kill switch and safe shutdown";
  summary: string;
  shutdownReviews: JarvisdKillSwitchShutdownReview[];
  boundary: JarvisdKillSwitchSafeShutdownBoundary;
  shutdownLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdKillSwitchSafeShutdownStableKey(
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
