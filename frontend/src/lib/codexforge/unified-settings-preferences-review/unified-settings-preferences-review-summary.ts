import type {
  UnifiedSettingsPreferencesReview,
  UnifiedSettingsPreferencesReviewBoundary,
  UnifiedSettingsPreferencesReviewModel,
} from "./unified-settings-preferences-review-types";
import { buildUnifiedSettingsPreferencesReviewStableKey } from "./unified-settings-preferences-review-types";

export const UNIFIED_SETTINGS_PREFERENCES_REVIEW_LANGUAGE = [
  "Unified settings and preferences review",
  "Unified settings and preferences review does not persist settings",
  "Settings changes require explicit operator approval",
  "Unsafe preference defaults remain blocked",
  "Preferences groups",
  "Privacy defaults checklist",
] as const;

export function buildUnifiedSettingsPreferencesReview(
  input: Omit<UnifiedSettingsPreferencesReview, "id"> & { idHint: string }
): UnifiedSettingsPreferencesReview {
  const { idHint, ...review } = input;
  return {
    id: buildUnifiedSettingsPreferencesReviewStableKey("unified-settings-preferences-review", idHint, input.status),
    ...review,
  };
}

export function buildUnifiedSettingsPreferencesReviews(): UnifiedSettingsPreferencesReview[] {
  return [
    buildUnifiedSettingsPreferencesReview({
      idHint: "privacy-first-defaults",
      status: "blocked",
      unifiedSettingsIdentity:
        "Unified settings identity: unified-settings-preferences-review-privacy-first-defaults.",
      preferencesGroups: [
        "Preferences groups: provider lane defaults, local model defaults, connector privacy defaults, automation safety defaults, cockpit display preferences, command palette preferences, evidence defaults, and result reuse defaults.",
      ],
      providerLocalConnectorAutomationPreferenceChecklist: [
        "Provider/local/connector/automation preference checklist: each lane keeps live access, storage, credential, output, schedule, and approval defaults blocked until explicit operator approval.",
      ],
      privacyDefaultsChecklist: [
        "Privacy defaults checklist: private evidence redacted, connector data not fetched, outputs not stored, credentials not displayed, and no browser storage writes from this page.",
      ],
      deniedSettingsShortcuts: [
        "Denied settings shortcuts: persist settings, save preferences, store credentials, store endpoints, store tokens, apply defaults, connect accounts, or enable live routing.",
      ],
      unresolvedSettingsBlockers: [
        "Unresolved settings blockers: unclear default scope, unsafe connector retention, endpoint ambiguity, output storage request, and hidden automation preference.",
      ],
      cockpitFinalPolishRoute:
        "Cockpit final polish route: /daily-operator-cockpit-final-polish reviews cockpit readiness without executing actions.",
      commandPalettePolishRoute:
        "Command palette polish route: /global-command-palette-final-polish reviews command discoverability without executing commands.",
      nextRecommendedAction:
        "Next recommended action: keep settings blocked until privacy defaults and lane preference checklists are approved outside this page.",
      advancedSettingsDetails:
        "Advanced settings details: unified settings and preferences review is review-only. Unified settings and preferences review does not persist settings, settings changes require explicit operator approval, and unsafe preference defaults remain blocked. It does not persist settings, save preferences, write localStorage, write sessionStorage, store credentials, store tokens, store endpoints, apply preferences, execute workflows, call providers, call local models, call connectors, create automations, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildUnifiedSettingsPreferencesReviewBoundary(): UnifiedSettingsPreferencesReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    unifiedSettingsPreferencesReviewDoesNotPersistSettings: true,
    settingsChangesRequireExplicitOperatorApproval: true,
    unsafePreferenceDefaultsRemainBlocked: true,
    settingsPersistenceAllowedFromUi: false,
    preferencePersistenceAllowedFromUi: false,
    localStorageWritesAllowedFromUi: false,
    sessionStorageWritesAllowedFromUi: false,
    tokenStorageAllowed: false,
    endpointStorageAllowed: false,
    credentialStorageAllowed: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
  };
}

export function summarizeUnifiedSettingsPreferencesReview(
  model: Pick<UnifiedSettingsPreferencesReviewModel, "reviews">
): string {
  return `Unified settings and preferences review summarizes ${model.reviews.length} settings posture without persisting settings. Settings changes require explicit operator approval, and unsafe preference defaults remain blocked.`;
}

export function buildUnifiedSettingsPreferencesReviewModel(): UnifiedSettingsPreferencesReviewModel {
  const reviews = buildUnifiedSettingsPreferencesReviews();
  const model: UnifiedSettingsPreferencesReviewModel = {
    title: "Unified settings and preferences review",
    summary: "",
    reviews,
    boundary: buildUnifiedSettingsPreferencesReviewBoundary(),
    settingsLanguage: [...UNIFIED_SETTINGS_PREFERENCES_REVIEW_LANGUAGE],
    advancedDetails: [
      "Unified settings and preferences review",
      "Unified settings identity",
      "Preferences groups",
      "Provider/local/connector/automation preference checklist",
      "Privacy defaults checklist",
      "Denied settings shortcuts",
      "Unresolved settings blockers",
      "Cockpit final polish route",
      "Command palette polish route",
      "Next recommended action",
      "Unified settings and preferences review does not persist settings",
      "Settings changes require explicit operator approval",
      "Unsafe preference defaults remain blocked",
      "advanced settings details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeUnifiedSettingsPreferencesReview(model) };
}
