import type {
  OperatorPreferencesReview,
  OperatorPreferencesReviewBoundary,
  OperatorPreferencesReviewModel,
} from "./operator-preferences-review-types";
import { buildOperatorPreferencesReviewStableKey } from "./operator-preferences-review-types";

export const OPERATOR_PREFERENCES_REVIEW_LANGUAGE = [
  "Operator preferences review",
  "Preferences review does not save preferences",
  "Preference changes require explicit approval",
  "Preferences are not stored in browser storage from this page",
  "Preference groups",
  "Safety preference guardrails",
] as const;

export function buildOperatorPreferencesReview(
  input: Omit<OperatorPreferencesReview, "id"> & { idHint: string }
): OperatorPreferencesReview {
  const { idHint, ...review } = input;
  return {
    id: buildOperatorPreferencesReviewStableKey("operator-preferences-review", idHint, input.status),
    ...review,
  };
}

export function buildOperatorPreferencesReviews(): OperatorPreferencesReview[] {
  return [
    buildOperatorPreferencesReview({
      idHint: "daily-review-preferences",
      status: "ready-for-review",
      preferencesReviewIdentity:
        "Preferences review identity: operator-preferences-review-daily-review-preferences.",
      preferenceGroups: [
        "Preference groups: review density, safety wording, notification cadence, preferred review sequence, and novice/expert mode preview.",
        "Preference groups: all values are previews and do not update operator settings from this page.",
      ],
      noviceExpertPreferencePreview: [
        "Novice/expert preference preview: novice mode favors plain-English explanations and visible approval reminders.",
        "Novice/expert preference preview: expert mode favors compact routes while keeping every approval gate visible.",
      ],
      safetyPreferenceGuardrails: [
        "Safety preference guardrails: preferences review does not save preferences.",
        "Safety preference guardrails: preference changes require explicit approval.",
        "Safety preference guardrails: preferences are not stored in browser storage from this page.",
      ],
      notificationReviewCadencePreview: [
        "Notification/review cadence preview: daily review, release review, and blocked-risk review are shown as suggestions only.",
        "Notification/review cadence preview: this page does not create reminders, schedules, automations, or notifications.",
      ],
      blockedPreferenceRisks: [
        "Blocked preference risks: browser storage writes, settings mutation, API calls, file writes, workflow execution, notification sending, and memory promotion stay blocked.",
        "Blocked preference risks: preference details are not sent to providers, connectors, GitHub, web/search, or local bridge endpoints.",
      ],
      workspacePersonalizationRoute:
        "Workspace personalization route: /workspace-personalization-review previews layout and route grouping without persisting layout changes.",
      savedReviewViewsRoute:
        "Saved review views route: /saved-review-views previews saved view presets without storing them.",
      nextRecommendedAction:
        "Next recommended action: review workspace personalization next, then review saved view presets before any approved preference change happens elsewhere.",
      advancedPreferenceDetails:
        "Advanced preference details: operator preferences review is review-only. Preferences review does not save preferences, preference changes require explicit approval, preferences are not stored in browser storage from this page, and this page does not mutate settings, persist personalization, save views, write browser storage, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/preference data without approval, run workflows, run shell commands, run git commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, read arbitrary local files, browse arbitrary local files, scan arbitrary projects, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildOperatorPreferencesReview({
      idHint: "blocked-auto-save",
      status: "blocked",
      preferencesReviewIdentity:
        "Preferences review identity: operator-preferences-review-blocked-auto-save.",
      preferenceGroups: [
        "Preference groups: blocked when a preference preview is treated as an automatic setting change.",
      ],
      noviceExpertPreferencePreview: [
        "Novice/expert preference preview: both modes remain previews until explicit approval happens outside this page.",
      ],
      safetyPreferenceGuardrails: [
        "Safety preference guardrails: preferences review does not save preferences.",
        "Safety preference guardrails: preference changes require explicit approval.",
      ],
      notificationReviewCadencePreview: [
        "Notification/review cadence preview: blocked because this page cannot create reminders or notification rules.",
      ],
      blockedPreferenceRisks: [
        "Blocked preference risks: automatic saves, browser storage writes, notification sending, workflow execution, and settings mutation remain blocked.",
      ],
      workspacePersonalizationRoute:
        "Workspace personalization route: /workspace-personalization-review remains preview-only.",
      savedReviewViewsRoute:
        "Saved review views route: /saved-review-views remains preview-only.",
      nextRecommendedAction:
        "Next recommended action: keep preference changes blocked until the operator approves a separate settings change outside this page.",
      advancedPreferenceDetails:
        "Advanced preference details: blocked preferences cannot recover by saving preferences, writing storage, mutating settings, calling APIs, creating reminders, sending notifications, executing tools, or promoting memory from this page.",
    }),
  ];
}

export function buildOperatorPreferencesReviewBoundary(): OperatorPreferencesReviewBoundary {
  return {
    operatorPreferencesReviewOnly: true,
    preferencesReviewDoesNotSavePreferences: true,
    preferenceChangesRequireExplicitApproval: true,
    preferencesAreNotStoredInBrowserStorageFromThisPage: true,
    settingsMutationAllowedFromUi: false,
    preferencePersistenceAllowedFromUi: false,
    personalizationPersistenceAllowedFromUi: false,
    savedViewPersistenceAllowedFromUi: false,
    localStorageWritesAllowedFromUi: false,
    sessionStorageWritesAllowedFromUi: false,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorPreferenceDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    tokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeOperatorPreferencesReview(
  model: Pick<OperatorPreferencesReviewModel, "reviews">
): string {
  return `Operator preferences review prepares ${model.reviews.length} preference preview posture(s). Preferences review does not save preferences, preference changes require explicit approval, and preferences are not stored in browser storage from this page.`;
}

export function buildOperatorPreferencesReviewModel(): OperatorPreferencesReviewModel {
  const reviews = buildOperatorPreferencesReviews();
  const model: OperatorPreferencesReviewModel = {
    title: "Operator preferences review",
    summary: "",
    reviews,
    boundary: buildOperatorPreferencesReviewBoundary(),
    preferenceLanguage: [...OPERATOR_PREFERENCES_REVIEW_LANGUAGE],
    advancedDetails: [
      "Operator preferences review",
      "Preferences review identity",
      "Preference groups",
      "Novice/expert preference preview",
      "Safety preference guardrails",
      "Notification/review cadence preview",
      "Blocked preference risks",
      "Workspace personalization route",
      "Saved review views route",
      "Next recommended action",
      "Preferences review does not save preferences",
      "Preference changes require explicit approval",
      "Preferences are not stored in browser storage from this page",
      "advanced preference details collapsed/secondary",
      "no preference persistence",
      "no localStorage writes",
      "no sessionStorage writes",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeOperatorPreferencesReview(model) };
}
