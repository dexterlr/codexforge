import type {
  SavedReviewViews,
  SavedReviewViewsBoundary,
  SavedReviewViewsModel,
} from "./saved-review-views-types";
import { buildSavedReviewViewsStableKey } from "./saved-review-views-types";

export const SAVED_REVIEW_VIEWS_LANGUAGE = [
  "Saved review views",
  "Saved review views are not stored from this page",
  "View presets require operator approval before use",
  "Private details stay redacted in view previews",
  "Proposed view presets",
  "Filter scope preview",
] as const;

export function buildSavedReviewViews(
  input: Omit<SavedReviewViews, "id"> & { idHint: string }
): SavedReviewViews {
  const { idHint, ...review } = input;
  return {
    id: buildSavedReviewViewsStableKey("saved-review-views", idHint, input.status),
    ...review,
  };
}

export function buildSavedReviewViewsList(): SavedReviewViews[] {
  return [
    buildSavedReviewViews({
      idHint: "daily-review-presets",
      status: "ready-for-review",
      savedViewsIdentity: "Saved views identity: saved-review-views-daily-review-presets.",
      proposedViewPresets: [
        "Proposed view presets: daily review, blocked risk review, beta release review, safety audit review, and validation evidence review.",
        "Proposed view presets: each preset is a preview and is not stored from this page.",
      ],
      filterScopePreview: [
        "Filter scope preview: status, route group, safety posture, review cadence, and redaction state are described without saving filters.",
        "Filter scope preview: private project, connector, file, preference, and feedback details stay redacted.",
      ],
      privacyRedactionRules: [
        "Privacy/redaction rules: private details stay redacted in view previews.",
        "Privacy/redaction rules: previews do not call providers, connectors, GitHub, web/search, or local bridge endpoints.",
      ],
      approvalAndSafetyRules: [
        "Approval and safety rules: saved review views are not stored from this page.",
        "Approval and safety rules: view presets require operator approval before use.",
      ],
      blockedSavedViewRisks: [
        "Blocked saved view risks: saving presets, browser storage writes, settings mutation, layout persistence, file writes, API calls, workflow execution, and memory mutation stay blocked.",
        "Blocked saved view risks: view previews cannot scan local projects, browse local files, crawl paths, or read arbitrary files.",
      ],
      preferencesRoute:
        "Preferences route: /operator-preferences-review previews preference options without saving preferences.",
      personalizationRoute:
        "Personalization route: /workspace-personalization-review previews layout groups without persisting layout changes.",
      nextRecommendedAction:
        "Next recommended action: review presets, keep private details redacted, and require operator approval before using any preset outside this page.",
      advancedSavedViewDetails:
        "Advanced saved view details: saved review views is review-only. Saved review views are not stored from this page, view presets require operator approval before use, private details stay redacted in view previews, and this page does not save preferences, persist personalization, save views, write browser storage, mutate settings, remove routes, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/preference data without approval, run workflows, run shell commands, run git commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, read arbitrary local files, browse arbitrary local files, scan arbitrary projects, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildSavedReviewViews({
      idHint: "blocked-private-preset",
      status: "blocked",
      savedViewsIdentity: "Saved views identity: saved-review-views-blocked-private-preset.",
      proposedViewPresets: [
        "Proposed view presets: blocked when a preset would expose private details or imply automatic storage.",
      ],
      filterScopePreview: [
        "Filter scope preview: blocked filters remain previews and are not stored.",
      ],
      privacyRedactionRules: [
        "Privacy/redaction rules: private details stay redacted in view previews.",
      ],
      approvalAndSafetyRules: [
        "Approval and safety rules: view presets require operator approval before use.",
      ],
      blockedSavedViewRisks: [
        "Blocked saved view risks: private details, storage writes, API calls, route removal, and memory mutation remain blocked.",
      ],
      preferencesRoute:
        "Preferences route: /operator-preferences-review remains preview-only.",
      personalizationRoute:
        "Personalization route: /workspace-personalization-review remains preview-only.",
      nextRecommendedAction:
        "Next recommended action: keep the preset blocked until redaction and approval are reviewed outside this page.",
      advancedSavedViewDetails:
        "Advanced saved view details: blocked saved review views cannot recover by storing views, writing storage, exposing private details, calling APIs, reading files, executing workflows, or mutating memory from this page.",
    }),
  ];
}

export function buildSavedReviewViewsBoundary(): SavedReviewViewsBoundary {
  return {
    savedReviewViewsReviewOnly: true,
    savedReviewViewsAreNotStoredFromThisPage: true,
    viewPresetsRequireOperatorApprovalBeforeUse: true,
    privateDetailsStayRedactedInViewPreviews: true,
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

export function summarizeSavedReviewViews(
  model: Pick<SavedReviewViewsModel, "reviews">
): string {
  return `Saved review views prepares ${model.reviews.length} proposed view preset posture(s). Saved review views are not stored from this page, view presets require operator approval before use, and private details stay redacted in view previews.`;
}

export function buildSavedReviewViewsModel(): SavedReviewViewsModel {
  const reviews = buildSavedReviewViewsList();
  const model: SavedReviewViewsModel = {
    title: "Saved review views",
    summary: "",
    reviews,
    boundary: buildSavedReviewViewsBoundary(),
    savedViewsLanguage: [...SAVED_REVIEW_VIEWS_LANGUAGE],
    advancedDetails: [
      "Saved review views",
      "Saved views identity",
      "Proposed view presets",
      "Filter scope preview",
      "Privacy/redaction rules",
      "Approval and safety rules",
      "Blocked saved view risks",
      "Preferences route",
      "Personalization route",
      "Next recommended action",
      "Saved review views are not stored from this page",
      "View presets require operator approval before use",
      "Private details stay redacted in view previews",
      "advanced saved view details collapsed/secondary",
      "no saved view persistence",
      "no localStorage writes",
      "no sessionStorage writes",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeSavedReviewViews(model) };
}
