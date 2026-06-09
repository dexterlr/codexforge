import type {
  LocalProjectChangeTimelineReview,
  LocalProjectChangeTimelineReviewBoundary,
  LocalProjectChangeTimelineReviewModel,
} from "./local-project-change-timeline-review-types";
import { buildLocalProjectChangeTimelineReviewStableKey } from "./local-project-change-timeline-review-types";

export const LOCAL_PROJECT_CHANGE_TIMELINE_REVIEW_LANGUAGE = [
  "Local project change timeline review",
  "Change timelines are reviewed before use",
  "No git history is read from this page",
  "Timeline entries are not auto-promoted to memory",
  "Reviewed change events",
  "Decision log route",
] as const;

export function buildLocalProjectChangeTimelineReview(
  input: Omit<LocalProjectChangeTimelineReview, "id"> & { idHint: string }
): LocalProjectChangeTimelineReview {
  const { idHint, ...review } = input;
  return {
    id: buildLocalProjectChangeTimelineReviewStableKey(
      "local-project-change-timeline-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildLocalProjectChangeTimelineReviews(): LocalProjectChangeTimelineReview[] {
  return [
    buildLocalProjectChangeTimelineReview({
      idHint: "reviewed-snapshot-window",
      status: "ready-for-review",
      timelineReviewIdentity:
        "Timeline review identity: local-project-change-timeline-review-reviewed-snapshot-window.",
      sourceProjectSnapshot:
        "Source project snapshot: /local-project-snapshot-review provides the reviewed scope summary before timeline review starts.",
      changeWindowSummary:
        "Change window summary: reviewed product and architecture changes since the latest project intelligence result, modeled without reading git history from this page.",
      reviewedChangeEvents: [
        "Reviewed change events: snapshot review created a stable local project state summary.",
        "Reviewed change events: local knowledge routes were connected in review order.",
        "Reviewed change events: safety boundaries kept scans, file reads, git commands, and memory promotion blocked.",
      ],
      validationFailureMarkers: [
        "Validation/failure markers: missing snapshot review blocks timeline use.",
        "Validation/failure markers: unresolved secrets or raw paths block downstream handoff.",
      ],
      regressionRiskFlags: [
        "Regression risk flags: route registry, command registry, and smoke coverage must stay in sync.",
        "Regression risk flags: timeline entries are not auto-promoted to memory.",
      ],
      decisionLogRoute:
        "Decision log route: /local-project-decision-log keeps reviewed timeline context separate from project memory.",
      runbookExportRoute:
        "Runbook export route: /local-project-runbook-export-review reviews handoff packaging before any export.",
      blockedReasons: [
        "Change timelines are reviewed before use",
        "No git history is read from this page",
        "Timeline entries are not auto-promoted to memory",
      ],
      advancedTimelineDetails:
        "Advanced timeline details: this page does not read git history, read local git metadata, scan arbitrary local projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, write files, export files, apply patches, delete files, call providers, call connectors, ingest memory, promote memory, mutate Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, start polling loops, create reminders, create schedules, create automations, create background jobs, send notifications, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildLocalProjectChangeTimelineReview({
      idHint: "blocked-missing-snapshot",
      status: "blocked",
      timelineReviewIdentity:
        "Timeline review identity: local-project-change-timeline-review-blocked-missing-snapshot.",
      sourceProjectSnapshot:
        "Source project snapshot: blocked until /local-project-snapshot-review is reviewed.",
      changeWindowSummary:
        "Change window summary: unavailable because this page will not read git history or local git metadata to fill missing context.",
      reviewedChangeEvents: [
        "Reviewed change events: blocked until snapshot review confirms scope.",
      ],
      validationFailureMarkers: [
        "Validation/failure markers: source snapshot missing.",
        "Validation/failure markers: no fallback git history read is allowed.",
      ],
      regressionRiskFlags: [
        "Regression risk flags: avoid using timeline text as memory until explicit review.",
      ],
      decisionLogRoute:
        "Decision log route: /local-project-decision-log remains blocked until timeline context is reviewed.",
      runbookExportRoute:
        "Runbook export route: /local-project-runbook-export-review remains blocked until snapshot, timeline, and decision log are reviewed.",
      blockedReasons: [
        "Source project snapshot is missing",
        "No git history is read from this page",
        "Timeline entries are not auto-promoted to memory",
      ],
      advancedTimelineDetails:
        "Advanced timeline details: blocked timeline review cannot recover by running git commands, reading local git metadata, scanning files, calling providers, writing files, exporting files, or promoting memory.",
    }),
  ];
}

export function buildLocalProjectChangeTimelineReviewBoundary(): LocalProjectChangeTimelineReviewBoundary {
  return {
    changeTimelinesReviewedBeforeUse: true,
    gitHistoryReadFromPage: false,
    localGitMetadataReadAllowedFromUi: false,
    timelineAutoPromotionAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    promptFileProjectDataAutoSendAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    runbookFileWriteAllowedFromUi: false,
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
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeLocalProjectChangeTimelineReview(
  model: Pick<LocalProjectChangeTimelineReviewModel, "reviews">
): string {
  return `Local project change timeline review prepares ${model.reviews.length} reviewed timeline state(s). Change timelines are reviewed before use, no git history is read from this page, and timeline entries are not auto-promoted to memory.`;
}

export function buildLocalProjectChangeTimelineReviewModel(): LocalProjectChangeTimelineReviewModel {
  const reviews = buildLocalProjectChangeTimelineReviews();
  const model: LocalProjectChangeTimelineReviewModel = {
    title: "Local project change timeline review",
    summary: "",
    reviews,
    boundary: buildLocalProjectChangeTimelineReviewBoundary(),
    timelineLanguage: [...LOCAL_PROJECT_CHANGE_TIMELINE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Local project change timeline review",
      "Change timelines are reviewed before use",
      "No git history is read from this page",
      "Timeline entries are not auto-promoted to memory",
      "Timeline review identity",
      "Source project snapshot",
      "Change window summary",
      "Reviewed change events",
      "Validation/failure markers",
      "Regression risk flags",
      "Decision log route",
      "Runbook export route",
      "Blocked reasons",
      "Advanced timeline details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalProjectChangeTimelineReview(model) };
}
