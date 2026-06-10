import type {
  WorkspacePersonalizationReview,
  WorkspacePersonalizationReviewBoundary,
  WorkspacePersonalizationReviewModel,
} from "./workspace-personalization-review-types";
import { buildWorkspacePersonalizationReviewStableKey } from "./workspace-personalization-review-types";

export const WORKSPACE_PERSONALIZATION_REVIEW_LANGUAGE = [
  "Workspace personalization review",
  "Personalization review does not persist layout changes",
  "Safety areas cannot be hidden",
  "Route coverage remains protected",
  "Layout groups",
  "Route grouping preview",
] as const;

export function buildWorkspacePersonalizationReview(
  input: Omit<WorkspacePersonalizationReview, "id"> & { idHint: string }
): WorkspacePersonalizationReview {
  const { idHint, ...review } = input;
  return {
    id: buildWorkspacePersonalizationReviewStableKey("workspace-personalization-review", idHint, input.status),
    ...review,
  };
}

export function buildWorkspacePersonalizationReviews(): WorkspacePersonalizationReview[] {
  return [
    buildWorkspacePersonalizationReview({
      idHint: "route-layout-preview",
      status: "ready-for-review",
      personalizationReviewIdentity:
        "Personalization review identity: workspace-personalization-review-route-layout-preview.",
      layoutGroups: [
        "Layout groups: daily review, build/fix review, beta review, safety review, and advanced details.",
        "Layout groups: previews are not saved and do not change the live workspace layout.",
      ],
      routeGroupingPreview: [
        "Route grouping preview: daily onboarding, preferences, personalization, and saved review views stay visible together.",
        "Route grouping preview: existing route coverage stays protected and no route is removed by this page.",
      ],
      noviceExpertLayoutPreview: [
        "Novice/expert layout preview: novice layout keeps safety wording and approval gates prominent.",
        "Novice/expert layout preview: expert layout keeps compact route groups while preserving visible safety areas.",
      ],
      protectedSafetyAreas: [
        "Protected safety areas: approval gates, privacy boundaries, route coverage, blocked risks, memory boundaries, and execution warnings stay visible.",
        "Protected safety areas: safety areas cannot be hidden.",
      ],
      blockedPersonalizationRisks: [
        "Blocked personalization risks: layout persistence, browser storage writes, route removal, hidden safety areas, file writes, API calls, workflow execution, and memory mutation stay blocked.",
        "Blocked personalization risks: personalization previews cannot scan projects, browse files, or read local paths.",
      ],
      savedReviewViewsRoute:
        "Saved review views route: /saved-review-views previews view presets without storing them.",
      dailyOnboardingRoute:
        "Daily onboarding route: /daily-use-onboarding-polish reviews the first-day path before any personalization request is approved elsewhere.",
      nextRecommendedAction:
        "Next recommended action: review saved review views next while keeping safety areas and route coverage visible.",
      advancedPersonalizationDetails:
        "Advanced personalization details: workspace personalization review is review-only. Personalization review does not persist layout changes, safety areas cannot be hidden, route coverage remains protected, and this page does not save preferences, persist personalization, save views, write browser storage, mutate settings, remove routes, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/preference data without approval, run workflows, run shell commands, run git commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, read arbitrary local files, browse arbitrary local files, scan arbitrary projects, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildWorkspacePersonalizationReview({
      idHint: "blocked-hidden-safety",
      status: "blocked",
      personalizationReviewIdentity:
        "Personalization review identity: workspace-personalization-review-blocked-hidden-safety.",
      layoutGroups: [
        "Layout groups: blocked when a proposed layout hides safety checkpoints or route coverage.",
      ],
      routeGroupingPreview: [
        "Route grouping preview: route coverage remains protected and cannot be removed from this page.",
      ],
      noviceExpertLayoutPreview: [
        "Novice/expert layout preview: both previews must keep approval gates visible.",
      ],
      protectedSafetyAreas: [
        "Protected safety areas: safety areas cannot be hidden.",
      ],
      blockedPersonalizationRisks: [
        "Blocked personalization risks: hidden approval gates, route removal, layout persistence, and browser storage writes remain blocked.",
      ],
      savedReviewViewsRoute:
        "Saved review views route: /saved-review-views remains preview-only.",
      dailyOnboardingRoute:
        "Daily onboarding route: /daily-use-onboarding-polish remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep personalization blocked until safety areas and route coverage remain visible.",
      advancedPersonalizationDetails:
        "Advanced personalization details: blocked personalization cannot recover by persisting layout, writing storage, hiding safety, removing routes, reading files, calling APIs, running commands, or mutating memory from this page.",
    }),
  ];
}

export function buildWorkspacePersonalizationReviewBoundary(): WorkspacePersonalizationReviewBoundary {
  return {
    workspacePersonalizationReviewOnly: true,
    personalizationReviewDoesNotPersistLayoutChanges: true,
    safetyAreasCannotBeHidden: true,
    routeCoverageRemainsProtected: true,
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

export function summarizeWorkspacePersonalizationReview(
  model: Pick<WorkspacePersonalizationReviewModel, "reviews">
): string {
  return `Workspace personalization review prepares ${model.reviews.length} layout preview posture(s). Personalization review does not persist layout changes, safety areas cannot be hidden, and route coverage remains protected.`;
}

export function buildWorkspacePersonalizationReviewModel(): WorkspacePersonalizationReviewModel {
  const reviews = buildWorkspacePersonalizationReviews();
  const model: WorkspacePersonalizationReviewModel = {
    title: "Workspace personalization review",
    summary: "",
    reviews,
    boundary: buildWorkspacePersonalizationReviewBoundary(),
    personalizationLanguage: [...WORKSPACE_PERSONALIZATION_REVIEW_LANGUAGE],
    advancedDetails: [
      "Workspace personalization review",
      "Personalization review identity",
      "Layout groups",
      "Route grouping preview",
      "Novice/expert layout preview",
      "Protected safety areas",
      "Blocked personalization risks",
      "Saved review views route",
      "Daily onboarding route",
      "Next recommended action",
      "Personalization review does not persist layout changes",
      "Safety areas cannot be hidden",
      "Route coverage remains protected",
      "advanced personalization details collapsed/secondary",
      "no personalization persistence",
      "no saved view persistence",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeWorkspacePersonalizationReview(model) };
}
