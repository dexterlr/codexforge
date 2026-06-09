import type {
  ConditionalWatchReviewBoundary,
  ConditionalWatchReviewInboxModel,
  ConditionalWatchReviewItem,
} from "./conditional-watch-review-inbox-types";
import { buildConditionalWatchReviewInboxStableKey } from "./conditional-watch-review-inbox-types";

export const CONDITIONAL_WATCH_REVIEW_INBOX_LANGUAGE = [
  "Conditional watch review inbox",
  "Conditional watches are reviewed before activation",
  "No watch is activated from this page",
  "No background check runs from this page",
  "Trigger condition summary",
  "Automation release route",
] as const;

export function buildConditionalWatchReviewItem(
  input: Omit<ConditionalWatchReviewItem, "id"> & { idHint: string }
): ConditionalWatchReviewItem {
  const { idHint, ...item } = input;
  return {
    id: buildConditionalWatchReviewInboxStableKey(
      "conditional-watch-review-inbox",
      idHint,
      input.approvalStatus
    ),
    ...item,
  };
}

export function buildConditionalWatchReviewItems(): ConditionalWatchReviewItem[] {
  return [
    buildConditionalWatchReviewItem({
      idHint: "reminder-and-research-watch-review",
      inboxIdentity:
        "Inbox identity: conditional-watch-review-inbox-reminder-and-research-watch-review.",
      sourceReminderBoundary:
        "Source reminder boundary: /task-reminder-boundary supplies reviewed reminder scope, but no reminder or watch exists here.",
      sourceScheduledResearchBoundary:
        "Source scheduled research boundary: /scheduled-research-check-boundary supplies reviewed schedule scope, but no schedule or source check exists here.",
      proposedWatchSummary:
        "Proposed watch summary: a human can review a future condition that would route a safe follow-up back to the operator.",
      triggerConditionSummary:
        "Trigger condition summary: condition text must name the reviewed route, safe status change, required human approval, and no private data access.",
      dataAccessBoundary:
        "Data access boundary: proposed watches can reference reviewed metadata and route state only; connector data, provider results, web sources, local files, memory ingestion, and private values are denied.",
      approvalStatus: "needs approval",
      blockedWatchReasons: [
        "Conditional watches are reviewed before activation",
        "No watch is activated from this page",
        "No background check runs from this page",
      ],
      automationReleaseRoute:
        "Automation release route: /automation-release-candidate audits readiness after reminder, scheduled research, watch, and notification boundaries are reviewed.",
      auditHandoff:
        "Audit handoff: record the proposed condition, data boundary, approval status, blocked reasons, and next route for manual review only.",
      advancedWatchDetails:
        "Advanced watch details: this conditional watch review inbox does not create watches, activate watches, create automations, create reminders, schedule tasks, create schedules, create background jobs, run background checks, start cron behavior, start interval timers, start polling loops, send notifications, call connector APIs, call Gmail APIs, call Calendar APIs, call Contacts APIs, call Google APIs, request OAuth, request connector authorization, read emails, read calendar events, read contacts, sync connector data, browse the web, call search providers, call provider APIs, fetch sources, refresh sources, update evidence, ingest memory, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, call MCP tools, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildConditionalWatchReviewItem({
      idHint: "blocked-private-trigger",
      inboxIdentity:
        "Inbox identity: conditional-watch-review-inbox-blocked-private-trigger.",
      sourceReminderBoundary:
        "Source reminder boundary: blocked until reminder scope is narrow, redacted, and approval-ready.",
      sourceScheduledResearchBoundary:
        "Source scheduled research boundary: blocked until schedule scope, source/provider boundary, and budget policy are approved.",
      proposedWatchSummary:
        "Proposed watch summary: blocked when the condition implies private connector reads, automatic source checks, or automation activation.",
      triggerConditionSummary:
        "Trigger condition summary: blocked when the trigger is broad, private, hidden, recurring, or depends on background work.",
      dataAccessBoundary:
        "Data access boundary: blocked when connector data, source refresh, provider results, local files, or memory changes are needed to evaluate the condition.",
      approvalStatus: "blocked",
      blockedWatchReasons: [
        "Explicit watch approval missing",
        "Data access boundary unresolved",
        "Background check behavior implied",
      ],
      automationReleaseRoute:
        "Automation release route: /automation-release-candidate stays blocked until watch conditions remain review-only.",
      auditHandoff:
        "Audit handoff: keep the blocked condition in review with no activation, no background check, and no automation creation.",
      advancedWatchDetails:
        "Advanced watch details: blocked watch requests cannot imply watch creation, watch activation, background checks, background jobs, polling loops, cron behavior, interval timers, automation creation, reminder creation, schedule creation, notification sending, connector API calls, Google API calls, automatic email reads, automatic calendar reads, automatic contact reads, OAuth, connector authorization, token storage, secret display, web/search/provider API calls, source auto-fetching, source auto-refreshing, freshness auto-recheck, evidence auto-update, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, MCP tool calls, command execution, file mutation, patch application, file deletion, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildConditionalWatchReviewBoundary(): ConditionalWatchReviewBoundary {
  return {
    conditionalWatchReviewOnly: true,
    conditionalWatchesReviewedBeforeActivation: true,
    noWatchActivatedFromPage: true,
    noBackgroundCheckRunsFromPage: true,
    watchCreationAllowedFromUi: false,
    watchActivationAllowedFromUi: false,
    backgroundCheckAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    backgroundWorkAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    notificationSendAllowedFromUi: false,
    notificationDeliveryAllowedFromUi: false,
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
    freshnessAutoRecheckAllowed: false,
    evidenceAutoIngestionAllowed: false,
    evidenceAutoUpdateAllowed: false,
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

export function summarizeConditionalWatchReviewInbox(
  model: Pick<ConditionalWatchReviewInboxModel, "items">
): string {
  return `Conditional watch review inbox prepares ${model.items.length} watch review item(s). Conditional watches are reviewed before activation, no watch is activated from this page, and no background check runs from this page.`;
}

export function buildConditionalWatchReviewInboxModel(): ConditionalWatchReviewInboxModel {
  const items = buildConditionalWatchReviewItems();
  const model: ConditionalWatchReviewInboxModel = {
    title: "Conditional watch review inbox",
    summary: "",
    items,
    boundary: buildConditionalWatchReviewBoundary(),
    inboxLanguage: [...CONDITIONAL_WATCH_REVIEW_INBOX_LANGUAGE],
    advancedDetails: [
      "Conditional watch review inbox",
      "Conditional watches are reviewed before activation",
      "No watch is activated from this page",
      "No background check runs from this page",
      "Inbox identity",
      "Source reminder boundary",
      "Source scheduled research boundary",
      "Proposed watch summary",
      "Trigger condition summary",
      "Data access boundary",
      "Approval status",
      "Blocked watch reasons",
      "Automation release route",
      "Audit handoff",
      "Advanced watch details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConditionalWatchReviewInbox(model) };
}
