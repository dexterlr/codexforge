export type UnifiedSettingsPreferencesReviewStatus = "ready-for-review" | "blocked";

export type UnifiedSettingsPreferencesReview = {
  id: string;
  unifiedSettingsIdentity: string;
  preferencesGroups: string[];
  providerLocalConnectorAutomationPreferenceChecklist: string[];
  privacyDefaultsChecklist: string[];
  deniedSettingsShortcuts: string[];
  unresolvedSettingsBlockers: string[];
  cockpitFinalPolishRoute: string;
  commandPalettePolishRoute: string;
  nextRecommendedAction: string;
  status: UnifiedSettingsPreferencesReviewStatus;
  advancedSettingsDetails: string;
};

export type UnifiedSettingsPreferencesReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  unifiedSettingsPreferencesReviewDoesNotPersistSettings: true;
  settingsChangesRequireExplicitOperatorApproval: true;
  unsafePreferenceDefaultsRemainBlocked: true;
  settingsPersistenceAllowedFromUi: false;
  preferencePersistenceAllowedFromUi: false;
  localStorageWritesAllowedFromUi: false;
  sessionStorageWritesAllowedFromUi: false;
  tokenStorageAllowed: false;
  endpointStorageAllowed: false;
  credentialStorageAllowed: false;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
};

export type UnifiedSettingsPreferencesReviewModel = {
  title: "Unified settings and preferences review";
  summary: string;
  reviews: UnifiedSettingsPreferencesReview[];
  boundary: UnifiedSettingsPreferencesReviewBoundary;
  settingsLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedSettingsPreferencesReviewStableKey(
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
