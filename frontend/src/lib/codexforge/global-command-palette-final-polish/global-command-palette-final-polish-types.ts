export type GlobalCommandPaletteFinalPolishStatus = "ready-for-review" | "blocked";

export type GlobalCommandPaletteFinalPolish = {
  id: string;
  commandPalettePolishIdentity: string;
  commandGroups: string[];
  routeDiscoverabilityChecklist: string[];
  duplicateCommandChecklist: string[];
  safetyCommandChecklist: string[];
  deniedCommandActions: string[];
  unresolvedCommandBlockers: string[];
  releaseReadinessDashboardRoute: string;
  foundationMilestoneReviewRoute: string;
  nextRecommendedAction: string;
  status: GlobalCommandPaletteFinalPolishStatus;
  advancedCommandPaletteDetails: string;
};

export type GlobalCommandPaletteFinalPolishBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  globalCommandPaletteFinalPolishDoesNotExecuteCommands: true;
  commandChangesRequireExplicitOperatorApproval: true;
  unsafeCommandShortcutsRemainBlocked: true;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  settingsPersistenceAllowedFromUi: false;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
};

export type GlobalCommandPaletteFinalPolishModel = {
  title: "Global command palette final polish";
  summary: string;
  reviews: GlobalCommandPaletteFinalPolish[];
  boundary: GlobalCommandPaletteFinalPolishBoundary;
  commandLanguage: string[];
  advancedDetails: string[];
};

export function buildGlobalCommandPaletteFinalPolishStableKey(
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
