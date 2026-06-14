export type DailyOperatorCockpitFinalPolishStatus = "ready-for-review" | "blocked";

export type DailyOperatorCockpitFinalPolish = {
  id: string;
  dailyOperatorCockpitPolishIdentity: string;
  cockpitReadinessGroups: string[];
  navigationClarityChecklist: string[];
  reviewInboxClarityChecklist: string[];
  approvalQueueClarityChecklist: string[];
  deniedCockpitActions: string[];
  unresolvedCockpitBlockers: string[];
  commandPalettePolishRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: DailyOperatorCockpitFinalPolishStatus;
  advancedCockpitDetails: string;
};

export type DailyOperatorCockpitFinalPolishBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyOperatorCockpitFinalPolishDoesNotExecuteActions: true;
  cockpitChangesRequireExplicitOperatorApproval: true;
  unresolvedCockpitBlockersStayBlocked: true;
  actionsExecutedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
};

export type DailyOperatorCockpitFinalPolishModel = {
  title: "Daily operator cockpit final polish";
  summary: string;
  reviews: DailyOperatorCockpitFinalPolish[];
  boundary: DailyOperatorCockpitFinalPolishBoundary;
  cockpitLanguage: string[];
  advancedDetails: string[];
};

export function buildDailyOperatorCockpitFinalPolishStableKey(
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
