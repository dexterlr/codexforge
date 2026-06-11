import type {
  CrossLoopEvidenceTimeline,
  CrossLoopEvidenceTimelineBoundary,
  CrossLoopEvidenceTimelineModel,
} from "./cross-loop-evidence-timeline-types";
import { buildCrossLoopEvidenceTimelineStableKey } from "./cross-loop-evidence-timeline-types";

export const CROSS_LOOP_EVIDENCE_TIMELINE_LANGUAGE = [
  "Cross-loop evidence timeline",
  "Evidence timeline does not fetch external data",
  "Evidence is reviewed before ingestion",
  "Private evidence stays redacted until approved",
  "Evidence groups by loop",
  "Chronology preview",
] as const;

export function buildCrossLoopEvidenceTimeline(
  input: Omit<CrossLoopEvidenceTimeline, "id"> & { idHint: string }
): CrossLoopEvidenceTimeline {
  const { idHint, ...timeline } = input;
  return {
    id: buildCrossLoopEvidenceTimelineStableKey("cross-loop-evidence-timeline", idHint, input.status),
    ...timeline,
  };
}

export function buildCrossLoopEvidenceTimelines(): CrossLoopEvidenceTimeline[] {
  return [
    buildCrossLoopEvidenceTimeline({
      idHint: "reviewed-cross-loop-chronology",
      status: "ready-for-review",
      evidenceTimelineIdentity:
        "Evidence timeline identity: cross-loop-evidence-timeline-reviewed-cross-loop-chronology.",
      evidenceGroupsByLoop: [
        "Evidence groups by loop: coding result history, provider governance review, connector privacy review, research evidence inbox, project knowledge release candidate, automation review, and creative local bridge review.",
        "Evidence groups by loop: only already reviewed evidence labels, dates described in source summaries, and redacted notes are shown.",
      ],
      chronologyPreview: [
        "Chronology preview: review request, evidence capture, validation summary, privacy review, blocked gap, and next action appear in chronological order as static text.",
        "Chronology preview: the page does not fetch external data, poll sources, or build chronology from live systems.",
      ],
      trustFreshnessNotes: [
        "Trust/freshness notes: stale or missing evidence is marked as needing review rather than refreshed automatically.",
        "Trust/freshness notes: evidence with unclear origin, freshness, approval, or redaction status remains blocked.",
      ],
      redactionPrivacyNotes: [
        "Redaction and privacy notes: private evidence stays redacted until approved.",
        "Redaction and privacy notes: raw connector details, provider payloads, file contents, local paths, secrets, tokens, and private project details stay out of the timeline.",
      ],
      blockedEvidenceGaps: [
        "Blocked evidence gaps: missing validation, missing approval, private evidence, unclear freshness, unresolved safety concerns, and unreviewed source origin.",
        "Blocked evidence gaps: any request to fetch, ingest, scan, read, call APIs, write files, or promote memory stays blocked.",
      ],
      projectKnowledgeSearchRoute:
        "Project knowledge search route: /project-knowledge-search-preview previews safe search behavior without scanning files.",
      resultComparisonRoute:
        "Result comparison route: /result-comparison-review compares reviewed result summaries without rerunning workflows.",
      nextRecommendedAction:
        "Next recommended action: review blocked evidence gaps before previewing project knowledge search or result comparison.",
      advancedTimelineDetails:
        "Advanced timeline details: cross-loop evidence timeline is review-only. Evidence timeline does not fetch external data, evidence is reviewed before ingestion, and private evidence stays redacted until approved. It does not execute actions, approve actions, automate approval, fetch external data, ingest evidence, run workflows, run live search, persist search queries, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/search/evidence data without approval, scan projects, browse local files, crawl paths, read or open arbitrary local files, auto-open local files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCrossLoopEvidenceTimeline({
      idHint: "blocked-private-evidence-gap",
      status: "blocked",
      evidenceTimelineIdentity:
        "Evidence timeline identity: cross-loop-evidence-timeline-blocked-private-evidence-gap.",
      evidenceGroupsByLoop: [
        "Evidence groups by loop: blocked private evidence source remains redacted.",
      ],
      chronologyPreview: [
        "Chronology preview: blocked source appears as unavailable and is not refreshed, fetched, read, or ingested.",
      ],
      trustFreshnessNotes: [
        "Trust/freshness notes: freshness cannot be trusted until reviewed evidence exists.",
      ],
      redactionPrivacyNotes: [
        "Redaction and privacy notes: private evidence stays redacted until approved.",
      ],
      blockedEvidenceGaps: [
        "Blocked evidence gaps: private source has no approved redacted summary.",
      ],
      projectKnowledgeSearchRoute:
        "Project knowledge search route: /project-knowledge-search-preview remains simulated for review.",
      resultComparisonRoute:
        "Result comparison route: /result-comparison-review keeps historical summaries read-only.",
      nextRecommendedAction:
        "Next recommended action: keep the private evidence blocked until a reviewed redacted summary exists.",
      advancedTimelineDetails:
        "Advanced timeline details: blocked evidence gaps cannot recover by fetching external data, reading connectors, scanning files, ingesting evidence, writing files, mutating memory, or promoting memory from this page.",
    }),
  ];
}

export function buildCrossLoopEvidenceTimelineBoundary(): CrossLoopEvidenceTimelineBoundary {
  return {
    crossLoopEvidenceTimelineReviewOnly: true,
    evidenceTimelineDoesNotFetchExternalData: true,
    evidenceIsReviewedBeforeIngestion: true,
    privateEvidenceStaysRedactedUntilApproved: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    externalDataFetchingAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    liveSearchExecutionAllowedFromUi: false,
    searchQueryPersistenceAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorSearchEvidenceDataAutoSendAllowed: false,
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

export function summarizeCrossLoopEvidenceTimeline(
  model: Pick<CrossLoopEvidenceTimelineModel, "timelines">
): string {
  return `Cross-loop evidence timeline prepares ${model.timelines.length} evidence timeline posture(s). Evidence timeline does not fetch external data, evidence is reviewed before ingestion, and private evidence stays redacted until approved.`;
}

export function buildCrossLoopEvidenceTimelineModel(): CrossLoopEvidenceTimelineModel {
  const timelines = buildCrossLoopEvidenceTimelines();
  const model: CrossLoopEvidenceTimelineModel = {
    title: "Cross-loop evidence timeline",
    summary: "",
    timelines,
    boundary: buildCrossLoopEvidenceTimelineBoundary(),
    timelineLanguage: [...CROSS_LOOP_EVIDENCE_TIMELINE_LANGUAGE],
    advancedDetails: [
      "Cross-loop evidence timeline",
      "Evidence timeline identity",
      "Evidence groups by loop",
      "Chronology preview",
      "Trust/freshness notes",
      "Redaction and privacy notes",
      "Blocked evidence gaps",
      "Project knowledge search route",
      "Result comparison route",
      "Next recommended action",
      "Evidence timeline does not fetch external data",
      "Evidence is reviewed before ingestion",
      "Private evidence stays redacted until approved",
      "advanced timeline details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCrossLoopEvidenceTimeline(model) };
}
