import type {
  ScheduledResearchCheckBoundary,
  ScheduledResearchCheckBoundaryModel,
  ScheduledResearchCheckBoundaryReview,
} from "./scheduled-research-check-boundary-types";
import { buildScheduledResearchCheckBoundaryStableKey } from "./scheduled-research-check-boundary-types";

export const SCHEDULED_RESEARCH_CHECK_BOUNDARY_LANGUAGE = [
  "Scheduled research check boundary",
  "Scheduled research checks require explicit approval",
  "No research check is scheduled from this page",
  "No source is refreshed automatically",
  "Budget rate-limit policy",
  "Conditional watch route",
] as const;

export function buildScheduledResearchCheckBoundaryReview(
  input: Omit<ScheduledResearchCheckBoundaryReview, "id"> & { idHint: string }
): ScheduledResearchCheckBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildScheduledResearchCheckBoundaryStableKey(
      "scheduled-research-check-boundary",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildScheduledResearchCheckBoundaryReviews(): ScheduledResearchCheckBoundaryReview[] {
  return [
    buildScheduledResearchCheckBoundaryReview({
      idHint: "freshness-follow-up-cadence-review",
      status: "approval required",
      boundaryIdentity:
        "Boundary identity: scheduled-research-check-boundary-freshness-follow-up-cadence-review.",
      sourceResearchFreshnessBoundary:
        "Source research freshness boundary: /research-freshness-recheck-boundary supplies a reviewed stale-source concern, but no recheck runs here.",
      researchCheckSummary:
        "Research check summary: a human may later approve one narrow recurring review note for a known public source or claim.",
      allowedScheduleScope:
        "Allowed schedule scope: one reviewed claim, one safe source scope, one reviewed cadence description, one owner, and one manual review route after explicit approval.",
      deniedScheduleScope:
        "Denied schedule scope: hidden schedules, cron behavior, interval timers, polling loops, broad crawling, automatic source refresh, provider retries, evidence updates, and memory promotion.",
      sourceProviderBoundary:
        "Source/provider boundary: provider, query, source scope, privacy class, and allowed data fields stay governed by /web-research-provider-boundary before any future request.",
      budgetRateLimitPolicy:
        "Budget rate-limit policy: cap source count, token spend, provider spend, retry count, request cadence, and stale-source follow-up count before any approved future check.",
      approvalRequirement:
        "Approval requirement: scheduled research checks require explicit approval before any future schedule, watch, source refresh, web request, or provider request exists.",
      conditionalWatchRoute:
        "Conditional watch route: /conditional-watch-review-inbox can review a proposed condition later, but no watch is activated here.",
      blockedReasons: [
        "Scheduled research checks require explicit approval",
        "No research check is scheduled from this page",
        "No source is refreshed automatically",
      ],
      advancedScheduleDetails:
        "Advanced schedule details: this scheduled research check boundary does not create schedules, schedule tasks, create reminders, create automations, create background jobs, run background work, create cron behavior, start interval timers, start polling loops, browse the web, call search providers, call provider APIs, retry providers, send prompts, fetch sources, refresh sources, recheck freshness, update evidence, ingest evidence, call connector APIs, request OAuth, request connector authorization, read emails, read calendar events, read contacts, store tokens, display secrets, ingest memory, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildScheduledResearchCheckBoundaryReview({
      idHint: "blocked-broad-recurring-research",
      status: "blocked",
      boundaryIdentity:
        "Boundary identity: scheduled-research-check-boundary-blocked-broad-recurring-research.",
      sourceResearchFreshnessBoundary:
        "Source research freshness boundary: blocked until the freshness concern names the source, claim, privacy class, and review reason.",
      researchCheckSummary:
        "Research check summary: blocked when the request asks for broad recurring research or automatic source monitoring.",
      allowedScheduleScope:
        "Allowed schedule scope: blocked until cadence, source limit, budget, owner, and review route are explicit.",
      deniedScheduleScope:
        "Denied schedule scope: background browsing, automatic provider calls, source auto-fetching, evidence auto-update, unbounded retries, hidden schedules, and private data checks remain denied.",
      sourceProviderBoundary:
        "Source/provider boundary: blocked until provider and source scope are reviewed separately.",
      budgetRateLimitPolicy:
        "Budget rate-limit policy: blocked until source count, request cadence, retry cap, token cap, and spend cap are written in plain English.",
      approvalRequirement:
        "Approval requirement: blocked because explicit approval for future scheduled research is missing.",
      conditionalWatchRoute:
        "Conditional watch route: /conditional-watch-review-inbox remains review-only and cannot activate a watch.",
      blockedReasons: [
        "Allowed schedule scope missing",
        "Budget rate-limit policy missing",
        "Source/provider boundary missing",
      ],
      advancedScheduleDetails:
        "Advanced schedule details: blocked schedule requests cannot imply schedule creation, task scheduling, reminder creation, automation creation, background job creation, cron behavior, interval timers, polling loops, web/search/provider API calls, automatic provider send, source auto-fetching, source auto-refreshing, freshness auto-recheck, evidence auto-update, connector API calls, OAuth, connector authorization, token storage, secret display, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, MCP tool calls, command execution, file mutation, patch application, file deletion, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildScheduledResearchCheckBoundary(): ScheduledResearchCheckBoundary {
  return {
    scheduledResearchCheckBoundaryReviewOnly: true,
    scheduledResearchChecksRequireExplicitApproval: true,
    noResearchCheckScheduledFromPage: true,
    noSourceRefreshedAutomatically: true,
    scheduleCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    backgroundWorkAllowedFromUi: false,
    notificationSendAllowedFromUi: false,
    notificationDeliveryAllowedFromUi: false,
    automaticWebBrowsingAllowed: false,
    webBrowsingAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    automaticProviderCallsAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    promptFileSourceAutoSendAllowed: false,
    promptFileSourceConnectorAutoSendAllowed: false,
    sourceAutoSendAllowed: false,
    sourceAutoFetchAllowed: false,
    sourceAutoRefreshAllowed: false,
    sourceRefreshAllowedFromUi: false,
    sourceAutoIngestionAllowed: false,
    evidenceAutoIngestionAllowed: false,
    evidenceAutoUpdateAllowed: false,
    freshnessAutoRecheckAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    providerRetryAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    gmailApiCallsAllowedFromUi: false,
    calendarApiCallsAllowedFromUi: false,
    contactsApiCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    connectorAuthorizationAllowedFromUi: false,
    connectorTokenStorageAllowedFromUi: false,
    browserTokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    tokensDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    privateConnectorValuesDisplayedAllowed: false,
    connectorDataReadFromPageAllowed: false,
    connectorSyncAllowedFromUi: false,
    automaticConnectorReadsAllowed: false,
    automaticEmailReadsAllowed: false,
    automaticCalendarReadsAllowed: false,
    automaticContactReadsAllowed: false,
    emailDraftSendAllowedFromUi: false,
    calendarEventMutationAllowedFromUi: false,
    contactMutationAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionInstallAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpServerCreated: false,
    mcpClientCreated: false,
    mcpToolCallsAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    arbitraryLocalEndpointCallsAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    artifactDeletionAllowed: false,
    patchApplyAllowedFromUi: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeScheduledResearchCheckBoundary(
  model: Pick<ScheduledResearchCheckBoundaryModel, "reviews">
): string {
  return `Scheduled research check boundary prepares ${model.reviews.length} schedule boundary posture(s). Scheduled research checks require explicit approval, no research check is scheduled from this page, and no source is refreshed automatically.`;
}

export function buildScheduledResearchCheckBoundaryModel(): ScheduledResearchCheckBoundaryModel {
  const reviews = buildScheduledResearchCheckBoundaryReviews();
  const model: ScheduledResearchCheckBoundaryModel = {
    title: "Scheduled research check boundary",
    summary: "",
    reviews,
    boundary: buildScheduledResearchCheckBoundary(),
    scheduleLanguage: [...SCHEDULED_RESEARCH_CHECK_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Scheduled research check boundary",
      "Scheduled research checks require explicit approval",
      "No research check is scheduled from this page",
      "No source is refreshed automatically",
      "Boundary identity",
      "Source research freshness boundary",
      "Research check summary",
      "Allowed schedule scope",
      "Denied schedule scope",
      "Source/provider boundary",
      "Budget rate-limit policy",
      "Approval requirement",
      "Conditional watch route",
      "Blocked reasons",
      "Advanced schedule details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeScheduledResearchCheckBoundary(model) };
}
