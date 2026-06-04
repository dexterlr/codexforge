export type JarvisdRecoveryFailureCategory =
  | "daemon-unreachable"
  | "permission-denied"
  | "capability-blocked"
  | "audit-gap";

export type JarvisdRecoveryReviewStatus = "review-ready" | "needs-approval" | "blocked";

export type JarvisdRecoveryCase = {
  id: string;
  recoveryIdentity: string;
  sourceEventFailure: string;
  failureCategory: JarvisdRecoveryFailureCategory;
  safeRecoveryChecklist: string[];
  blockedRecoveryReasons: string[];
  permissionDependency: string;
  auditDependency: string;
  manualHandoff: string;
  escalationRoute: string;
  nextRecommendedRoute: string;
  reviewStatus: JarvisdRecoveryReviewStatus;
  advancedRecoveryDetails: string;
};

export type JarvisdRecoveryConsoleBoundary = {
  recoveryExecutionAllowedFromUi: false;
  processRestartAllowedFromUi: false;
  processKillAllowedFromUi: false;
  daemonResetAllowedFromUi: false;
  localProcessMutationAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  settingsAutoImportAllowed: false;
  secretsDisplayedAllowed: false;
  secretsExportedAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdRecoveryConsoleModel = {
  title: "Jarvisd recovery console";
  summary: string;
  cases: JarvisdRecoveryCase[];
  boundary: JarvisdRecoveryConsoleBoundary;
  recoveryLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdRecoveryConsoleStableKey(
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
