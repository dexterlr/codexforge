import type {
  TaskReminderBoundaryReview,
  TaskReminderBoundaryReviewBoundary,
  TaskReminderBoundaryReviewModel,
} from "./task-reminder-boundary-review-types";
import { buildTaskReminderBoundaryReviewStableKey } from "./task-reminder-boundary-review-types";

export const TASK_REMINDER_BOUNDARY_REVIEW_LANGUAGE = [
  "Task reminder boundary review",
  "Task reminders require explicit approval",
  "No reminder is created from this page",
  "Notification delivery is not enabled here",
  "Delivery channel policy",
  "Conditional watch route",
] as const;

export function buildTaskReminderBoundaryReview(
  input: Omit<TaskReminderBoundaryReview, "id"> & { idHint: string }
): TaskReminderBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildTaskReminderBoundaryReviewStableKey("task-reminder-boundary-review", idHint, input.status),
    ...review,
  };
}

export function buildTaskReminderBoundaryReviews(): TaskReminderBoundaryReview[] {
  return [
    buildTaskReminderBoundaryReview({
      idHint: "operator-follow-up-review",
      status: "approval required",
      boundaryIdentity:
        "Boundary identity: task-reminder-boundary-review-operator-follow-up-review.",
      sourceNotificationCenter:
        "Source notification center: /operator-notification-center identifies a future follow-up category, but does not send or schedule anything.",
      reminderRequestSummary:
        "Reminder request summary: a human may later ask for one narrow task reminder tied to a reviewed operator handoff.",
      allowedReminderScope:
        "Allowed reminder scope: one plain-English reminder description, one reviewed owner, one reviewed due window, and one safe route handoff after explicit approval.",
      deniedReminderScope:
        "Denied reminder scope: recurring reminders, hidden schedules, connector-driven triggers, background checks, notification delivery, private connector details, and automatic task creation.",
      privacyRedactionPolicy: [
        "Privacy/redaction policy: reminder previews show category, safe route, and non-sensitive summary only.",
        "Privacy/redaction policy: raw connector values, message contents, calendar details, contact details, tokens, and secrets stay excluded.",
        "Privacy/redaction policy: anything private stays redacted before a human can approve future reminder creation.",
      ],
      deliveryChannelPolicy: [
        "Delivery channel policy: notification delivery is not enabled here.",
        "Delivery channel policy: no email, desktop, push, chat, SMS, webhook, or connector notification is sent from this page.",
        "Delivery channel policy: any future delivery channel needs its own explicit approval boundary.",
      ],
      approvalRequirement:
        "Approval requirement: task reminders require explicit approval before any future reminder exists.",
      conditionalWatchRoute:
        "Conditional watch route: /conditional-watch-review-inbox can review a proposed watch later, but no watch is activated here.",
      blockedReasons: [
        "Task reminders require explicit approval",
        "No reminder is created from this page",
        "Notification delivery is not enabled here",
      ],
      advancedReminderDetails:
        "Advanced reminder details: this task reminder boundary review does not create reminders, schedule tasks, create automations, create background jobs, run background work, send notifications, activate watches, call connector APIs, call Gmail APIs, call Calendar APIs, call Contacts APIs, call Google APIs, request OAuth, request connector authorization, read emails, read calendar events, read contacts, sync connector data, call providers, browse the web, refresh sources, update evidence, ingest memory, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, call MCP tools, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildTaskReminderBoundaryReview({
      idHint: "blocked-implicit-delivery",
      status: "blocked",
      boundaryIdentity:
        "Boundary identity: task-reminder-boundary-review-blocked-implicit-delivery.",
      sourceNotificationCenter:
        "Source notification center: blocked when a notification category implies delivery, scheduling, connector reads, or background work.",
      reminderRequestSummary:
        "Reminder request summary: blocked until the request is a human-reviewed reminder draft with no automatic delivery behavior.",
      allowedReminderScope:
        "Allowed reminder scope: blocked until a narrow task, owner, route, and safe summary are written in plain English.",
      deniedReminderScope:
        "Denied reminder scope: broad recurring reminders, connector-sourced private data, automatic notification sends, background jobs, polling loops, and automation triggers remain denied.",
      privacyRedactionPolicy: [
        "Privacy/redaction policy: blocked if private connector values could appear.",
        "Privacy/redaction policy: blocked if tokens, secrets, raw message content, calendar details, or contact details could be displayed.",
      ],
      deliveryChannelPolicy: [
        "Delivery channel policy: blocked because delivery channel approval is missing.",
        "Delivery channel policy: blocked because notification delivery is not enabled here.",
      ],
      approvalRequirement:
        "Approval requirement: blocked because explicit approval for future reminder creation is missing.",
      conditionalWatchRoute:
        "Conditional watch route: /conditional-watch-review-inbox remains review-only and cannot activate a watch.",
      blockedReasons: [
        "Explicit reminder approval missing",
        "Delivery channel approval missing",
        "Private data boundary unresolved",
      ],
      advancedReminderDetails:
        "Advanced reminder details: blocked reminder requests cannot imply reminder creation, task scheduling, cron behavior, interval timers, polling loops, automation creation, background job creation, notification sending, connector API calls, Google API calls, automatic email reads, automatic calendar reads, automatic contact reads, OAuth, connector authorization, token storage, secret display, provider calls, web browsing, source refresh, evidence updates, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, MCP tool calls, command execution, file mutation, patch application, file deletion, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildTaskReminderBoundary(): TaskReminderBoundaryReviewBoundary {
  return {
    taskReminderBoundaryReviewOnly: true,
    taskRemindersRequireExplicitApproval: true,
    noReminderCreatedFromPage: true,
    notificationDeliveryNotEnabledHere: true,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    backgroundWorkAllowedFromUi: false,
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
    promptFileSourceConnectorAutoSendAllowed: false,
    sourceAutoFetchAllowed: false,
    sourceAutoRefreshAllowed: false,
    freshnessAutoRecheckAllowed: false,
    evidenceAutoUpdateAllowed: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeTaskReminderBoundaryReview(
  model: Pick<TaskReminderBoundaryReviewModel, "reviews">
): string {
  return `Task reminder boundary review prepares ${model.reviews.length} reminder boundary posture(s). Task reminders require explicit approval, no reminder is created from this page, and notification delivery is not enabled here.`;
}

export function buildTaskReminderBoundaryReviewModel(): TaskReminderBoundaryReviewModel {
  const reviews = buildTaskReminderBoundaryReviews();
  const model: TaskReminderBoundaryReviewModel = {
    title: "Task reminder boundary review",
    summary: "",
    reviews,
    boundary: buildTaskReminderBoundary(),
    reminderLanguage: [...TASK_REMINDER_BOUNDARY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Task reminder boundary review",
      "Task reminders require explicit approval",
      "No reminder is created from this page",
      "Notification delivery is not enabled here",
      "Boundary identity",
      "Source notification center",
      "Reminder request summary",
      "Allowed reminder scope",
      "Denied reminder scope",
      "Privacy/redaction policy",
      "Delivery channel policy",
      "Approval requirement",
      "Conditional watch route",
      "Blocked reasons",
      "Advanced reminder details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeTaskReminderBoundaryReview(model) };
}
