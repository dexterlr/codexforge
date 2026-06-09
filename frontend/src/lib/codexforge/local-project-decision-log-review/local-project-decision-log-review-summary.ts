import type {
  LocalProjectDecisionLogReview,
  LocalProjectDecisionLogReviewBoundary,
  LocalProjectDecisionLogReviewModel,
} from "./local-project-decision-log-review-types";
import { buildLocalProjectDecisionLogReviewStableKey } from "./local-project-decision-log-review-types";

export const LOCAL_PROJECT_DECISION_LOG_REVIEW_LANGUAGE = [
  "Local project decision log review",
  "Decisions are reviewed before becoming project memory",
  "Unresolved questions stay visible",
  "Memory promotion requires explicit review",
  "Rationale summary",
  "Runbook export route",
] as const;

export function buildLocalProjectDecisionLogReview(
  input: Omit<LocalProjectDecisionLogReview, "id"> & { idHint: string }
): LocalProjectDecisionLogReview {
  const { idHint, ...review } = input;
  return {
    id: buildLocalProjectDecisionLogReviewStableKey(
      "local-project-decision-log-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildLocalProjectDecisionLogReviews(): LocalProjectDecisionLogReview[] {
  return [
    buildLocalProjectDecisionLogReview({
      idHint: "local-knowledge-loop",
      status: "ready-for-review",
      decisionLogIdentity:
        "Decision log identity: local-project-decision-log-review-local-knowledge-loop.",
      sourceProjectSnapshotTimeline:
        "Source project snapshot/timeline: /local-project-snapshot-review and /local-project-change-timeline provide reviewed context before decisions are used.",
      decisionSummary:
        "Decision summary: local project knowledge stays review-only until an operator explicitly accepts each snapshot, timeline entry, decision, and runbook package.",
      rationaleSummary:
        "Rationale summary: reviewed local context can improve handoffs, but automatic scans, git reads, provider calls, file writes, and memory promotion would cross safety boundaries.",
      affectedProjectAreas: [
        "Affected project areas: route shell navigation and command registry.",
        "Affected project areas: local project intelligence review surfaces.",
        "Affected project areas: smoke coverage and safety marker language.",
      ],
      unresolvedQuestions: [
        "Unresolved questions stay visible: which future approved boundary may create project memory from reviewed decisions.",
        "Unresolved questions stay visible: which runbook format should be handed off after review.",
      ],
      memoryPromotionPolicy:
        "Memory promotion policy: decisions are reviewed before becoming project memory, memory promotion requires explicit review, and this page does not mutate Brain graph.",
      runbookExportRoute:
        "Runbook export route: /local-project-runbook-export-review reviews the runbook package before any handoff or export.",
      blockedReasons: [
        "Decisions are reviewed before becoming project memory",
        "Unresolved questions stay visible",
        "Memory promotion requires explicit review",
      ],
      advancedDecisionDetails:
        "Advanced decision details: this page does not scan arbitrary local projects, browse local files, crawl paths, read files, open files, read git history, run git commands, run shell commands, run tests, write files, export files, apply patches, delete files, call providers, call connectors, ingest memory, auto-promote memory, mutate Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, start polling loops, create reminders, create schedules, create automations, create background jobs, send notifications, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildLocalProjectDecisionLogReview({
      idHint: "blocked-unresolved-source",
      status: "blocked",
      decisionLogIdentity:
        "Decision log identity: local-project-decision-log-review-blocked-unresolved-source.",
      sourceProjectSnapshotTimeline:
        "Source project snapshot/timeline: blocked until snapshot and timeline review are complete.",
      decisionSummary:
        "Decision summary: blocked decisions remain visible as review copy and are not converted into project memory.",
      rationaleSummary:
        "Rationale summary: missing source context should not be repaired by reading files, reading git history, or calling providers from this page.",
      affectedProjectAreas: [
        "Affected project areas: blocked until reviewed scope exists.",
      ],
      unresolvedQuestions: [
        "Unresolved questions stay visible: source snapshot review is incomplete.",
        "Unresolved questions stay visible: change timeline review is incomplete.",
      ],
      memoryPromotionPolicy:
        "Memory promotion policy: memory promotion requires explicit review and remains blocked when source context is incomplete.",
      runbookExportRoute:
        "Runbook export route: /local-project-runbook-export-review remains blocked until decisions are reviewed.",
      blockedReasons: [
        "Source snapshot or timeline is missing",
        "Decisions are reviewed before becoming project memory",
        "Memory promotion requires explicit review",
      ],
      advancedDecisionDetails:
        "Advanced decision details: blocked decision log review cannot auto-promote memory, mutate Brain graph, call appendEvent, call saveBrainGraph, write files, export files, or read local project files.",
    }),
  ];
}

export function buildLocalProjectDecisionLogReviewBoundary(): LocalProjectDecisionLogReviewBoundary {
  return {
    decisionsReviewedBeforeProjectMemory: true,
    unresolvedQuestionsStayVisible: true,
    memoryPromotionRequiresExplicitReview: true,
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

export function summarizeLocalProjectDecisionLogReview(
  model: Pick<LocalProjectDecisionLogReviewModel, "reviews">
): string {
  return `Local project decision log review prepares ${model.reviews.length} reviewed decision state(s). Decisions are reviewed before becoming project memory, unresolved questions stay visible, and memory promotion requires explicit review.`;
}

export function buildLocalProjectDecisionLogReviewModel(): LocalProjectDecisionLogReviewModel {
  const reviews = buildLocalProjectDecisionLogReviews();
  const model: LocalProjectDecisionLogReviewModel = {
    title: "Local project decision log review",
    summary: "",
    reviews,
    boundary: buildLocalProjectDecisionLogReviewBoundary(),
    decisionLanguage: [...LOCAL_PROJECT_DECISION_LOG_REVIEW_LANGUAGE],
    advancedDetails: [
      "Local project decision log review",
      "Decisions are reviewed before becoming project memory",
      "Unresolved questions stay visible",
      "Memory promotion requires explicit review",
      "Decision log identity",
      "Source project snapshot/timeline",
      "Decision summary",
      "Rationale summary",
      "Affected project areas",
      "Unresolved questions",
      "Memory promotion policy",
      "Runbook export route",
      "Blocked reasons",
      "Advanced decision details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalProjectDecisionLogReview(model) };
}
