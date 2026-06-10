import type {
  ResearchLoopRealWorldTrialReview,
  ResearchLoopRealWorldTrialReviewBoundary,
  ResearchLoopRealWorldTrialReviewModel,
} from "./research-loop-real-world-trial-review-types";
import { buildResearchLoopRealWorldTrialReviewStableKey } from "./research-loop-real-world-trial-review-types";

export const RESEARCH_LOOP_REAL_WORLD_TRIAL_REVIEW_LANGUAGE = [
  "Research loop real-world trial review",
  "Research trial review does not browse or call providers",
  "Evidence and citations are reviewed before use",
  "Freshness checks require explicit approval",
  "Evidence collection plan",
  "Conflict handling summary",
] as const;

export function buildResearchLoopRealWorldTrialReview(
  input: Omit<ResearchLoopRealWorldTrialReview, "id"> & { idHint: string }
): ResearchLoopRealWorldTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildResearchLoopRealWorldTrialReviewStableKey(
      "research-loop-real-world-trial-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildResearchLoopRealWorldTrialReviews(): ResearchLoopRealWorldTrialReview[] {
  return [
    buildResearchLoopRealWorldTrialReview({
      idHint: "operator-evidence-review",
      status: "ready-for-review",
      researchTrialIdentity:
        "Research trial identity: research-loop-real-world-trial-review-operator-evidence-review.",
      sourceResearchReleaseCandidate:
        "Source research release candidate: /research-workspace-release-candidate supplies release posture, evidence inbox readiness, citation readiness, known gaps, and blocked reasons.",
      operatorResearchScenario:
        "Operator research scenario: a real operator reviews a research workflow plan, evidence collection plan, citation gates, freshness boundary, conflict handling summary, and outcome notes without browsing or provider calls.",
      evidenceCollectionPlan: [
        "Evidence collection plan: operator lists intended source types and review criteria without fetching sources.",
        "Evidence collection plan: source quality, attribution, date, conflict flags, and redaction status are reviewed before use.",
        "Evidence collection plan: real evidence is reviewed before use and memory promotion remains blocked until approved.",
      ],
      citationReviewGates: [
        "Citation/review gates: evidence and citations are reviewed before use.",
        "Citation/review gates: missing attribution, stale dates, weak evidence, or conflicts keep citations blocked.",
        "Citation/review gates: no auto-cite and no auto-citation finalization from this page.",
      ],
      freshnessBoundary:
        "Freshness boundary: freshness checks require explicit approval before any future source refresh, web request, search request, or provider call.",
      conflictHandlingSummary:
        "Conflict handling summary: conflicts stay visible for manual review and do not update claims, citations, summaries, reports, files, or memory automatically.",
      blockedRealActions: [
        "Blocked real actions: browsing, source fetching, source refresh, source ingestion, evidence ingestion, evidence update, auto-citation, citation finalization, provider calls, web/search calls, connector calls, commands, shell commands, git commands, tests, builds, smoke checks, file writes, exports, patch apply behavior, commits, and workflow execution.",
        "Blocked real actions: OAuth request flow, connector authorization, Gmail Calendar Contacts or Google API calls, connector data reads, token storage, reminders, schedules, automations, background jobs, notifications, polling loops, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, extension runtime executor, MCP runtime, and MCP tool calls.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: ready when the operator can explain what evidence would be collected and what remains blocked.",
        "Trial outcome notes: blocked if freshness, citation, conflict, or privacy review is skipped.",
      ],
      nextLoopRoute:
        "Next loop route: /connector-loop-real-world-trial-review reviews connector readiness without reading connector data.",
      advancedResearchTrialDetails:
        "Advanced research trial details: research loop real-world trial review is review-only and does not browse, call providers, call web/search APIs, fetch sources, refresh sources, ingest sources, ingest evidence, update evidence, auto-cite, finalize citations, export reports, write files, run commands, run tests, run builds, run smoke checks, apply patches, create commits, call connector APIs, call Gmail Calendar Contacts or Google APIs, request OAuth, authorize connectors, store tokens, scan arbitrary projects, browse local files, read arbitrary files, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildResearchLoopRealWorldTrialReview({
      idHint: "blocked-freshness-recheck",
      status: "blocked",
      researchTrialIdentity:
        "Research trial identity: research-loop-real-world-trial-review-blocked-freshness-recheck.",
      sourceResearchReleaseCandidate:
        "Source research release candidate: blocked until /research-workspace-release-candidate and the freshness boundary are reviewed before use.",
      operatorResearchScenario:
        "Operator research scenario: blocked when the workflow asks this page to browse, fetch sources, call a provider, refresh evidence, auto-cite, export a report, or promote memory.",
      evidenceCollectionPlan: [
        "Evidence collection plan: blocked until the operator states source scope and review gates.",
        "Evidence collection plan: blocked until freshness and conflict review are explicit.",
      ],
      citationReviewGates: [
        "Citation/review gates: blocked because evidence and citations have not been reviewed before use.",
      ],
      freshnessBoundary:
        "Freshness boundary: blocked because freshness checks require explicit approval.",
      conflictHandlingSummary:
        "Conflict handling summary: blocked because conflict handling is not reviewed.",
      blockedRealActions: [
        "Blocked real actions: every research, provider, connector, local file, command, automation, memory, plugin, tool, agent, and MCP action remains blocked.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: blocked until evidence, citations, freshness, and conflict handling are reviewed.",
      ],
      nextLoopRoute:
        "Next loop route: /connector-loop-real-world-trial-review remains the next review-only loop after research review.",
      advancedResearchTrialDetails:
        "Advanced research trial details: blocked research reviews cannot recover by browsing, calling providers, fetching sources, refreshing freshness, auto-citing, exporting reports, writing files, running commands, storing tokens, promoting memory, mutating Brain graph data, or creating an MCP runtime.",
    }),
  ];
}

export function buildResearchLoopRealWorldTrialReviewBoundary(): ResearchLoopRealWorldTrialReviewBoundary {
  return {
    researchTrialReviewOnly: true,
    researchTrialReviewDoesNotBrowseOrCallProviders: true,
    evidenceAndCitationsReviewedBeforeUse: true,
    freshnessChecksRequireExplicitApproval: true,
    realEvidenceReviewedBeforeUse: true,
    memoryPromotionBlockedUntilApproved: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    codingTaskExecutionAllowedFromUi: false,
    taskExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commitCreationAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    automaticWebBrowsingAllowed: false,
    webBrowsingAllowedFromUi: false,
    sourceAutoFetchAllowed: false,
    sourceAutoRefreshAllowed: false,
    evidenceAutoIngestionAllowed: false,
    evidenceAutoUpdateAllowed: false,
    evidenceAutoCitationAllowed: false,
    citationAutoFinalizationAllowed: false,
    freshnessAutoRecheckAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    gmailApiCallsAllowedFromUi: false,
    calendarApiCallsAllowedFromUi: false,
    contactsApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    connectorAuthorizationAllowedFromUi: false,
    connectorDataReadFromPageAllowed: false,
    automaticEmailReadsAllowed: false,
    automaticCalendarReadsAllowed: false,
    automaticContactReadsAllowed: false,
    tokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
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
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeResearchLoopRealWorldTrialReview(
  model: Pick<ResearchLoopRealWorldTrialReviewModel, "reviews">
): string {
  return `Research loop real-world trial review prepares ${model.reviews.length} research trial posture(s). Research trial review does not browse or call providers, evidence and citations are reviewed before use, and freshness checks require explicit approval.`;
}

export function buildResearchLoopRealWorldTrialReviewModel(): ResearchLoopRealWorldTrialReviewModel {
  const reviews = buildResearchLoopRealWorldTrialReviews();
  const model: ResearchLoopRealWorldTrialReviewModel = {
    title: "Research loop real-world trial review",
    summary: "",
    reviews,
    boundary: buildResearchLoopRealWorldTrialReviewBoundary(),
    trialReviewLanguage: [...RESEARCH_LOOP_REAL_WORLD_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Research loop real-world trial review",
      "Research trial review does not browse or call providers",
      "Evidence and citations are reviewed before use",
      "Freshness checks require explicit approval",
      "Real evidence is reviewed before use",
      "Memory promotion remains blocked until approved",
      "Research trial identity",
      "Source research release candidate",
      "Operator research scenario",
      "Evidence collection plan",
      "Citation/review gates",
      "Freshness boundary",
      "Conflict handling summary",
      "Blocked real actions",
      "Trial outcome notes",
      "Next loop route",
      "advanced research trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchLoopRealWorldTrialReview(model) };
}
