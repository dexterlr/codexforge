import type {
  OperatorNotificationCenterShell,
  OperatorNotificationCenterShellBoundary,
  OperatorNotificationCenterShellModel,
} from "./operator-notification-center-shell-types";
import { buildOperatorNotificationCenterShellStableKey } from "./operator-notification-center-shell-types";

export const OPERATOR_NOTIFICATION_CENTER_SHELL_LANGUAGE = [
  "Operator notification center shell",
  "Notification center does not send notifications yet",
  "Notification delivery requires explicit approval",
  "Private connector research details stay redacted",
  "Notification categories",
  "Reminder boundary route",
] as const;

export function buildOperatorNotificationCenterShell(
  input: Omit<OperatorNotificationCenterShell, "id"> & { idHint: string }
): OperatorNotificationCenterShell {
  const { idHint, ...center } = input;
  return {
    id: buildOperatorNotificationCenterShellStableKey(
      "operator-notification-center-shell",
      idHint,
      input.status
    ),
    ...center,
  };
}

export function buildOperatorNotificationCenterShells(): OperatorNotificationCenterShell[] {
  return [
    buildOperatorNotificationCenterShell({
      idHint: "future-review-categories",
      status: "shell ready",
      notificationCenterIdentity:
        "Notification center identity: operator-notification-center-shell-future-review-categories.",
      sourceConnectorResearchOperatorLoops: [
        "Source loop: connector release candidate review.",
        "Source loop: research release candidate review.",
        "Source loop: operator runbook and review inbox loop.",
      ],
      notificationCategories: [
        "Notification categories: connector approval review needed.",
        "Notification categories: redaction review blocked.",
        "Notification categories: research freshness review needed.",
        "Notification categories: operator handoff ready.",
      ],
      priorityPolicy: [
        "Priority policy: high priority when explicit review is blocking a safe next step.",
        "Priority policy: normal priority for informational handoff categories.",
        "Priority policy: blocked priority when private data is unresolved or approval is missing.",
      ],
      privacyRedactionPolicy: [
        "Privacy/redaction policy: private connector research details stay redacted.",
        "Privacy/redaction policy: notification previews show category and safe route only.",
        "Privacy/redaction policy: secrets, tokens, raw connector values, and raw research details are excluded.",
      ],
      deliveryChannelNonGoals: [
        "Delivery channel non-goals: no email, desktop, push, chat, SMS, webhook, or provider notification is sent from this shell.",
        "Delivery channel non-goals: no reminder is created from this shell.",
        "Delivery channel non-goals: no scheduled task, scheduled research run, or automation is created from this shell.",
      ],
      reminderBoundaryRoute:
        "Reminder boundary route: future reminder approval remains outside this shell and requires explicit approval before any reminder exists.",
      scheduledResearchBoundaryRoute:
        "Scheduled research boundary route: future scheduled research approval remains outside this shell and requires explicit approval before any scheduled task exists.",
      blockedReasons: [
        "Notification center does not send notifications yet",
        "Notification delivery requires explicit approval",
        "Private connector research details stay redacted",
      ],
      advancedNotificationDetails:
        "Advanced notification details: this operator notification center shell does not send notifications, create reminders, schedule tasks, create automations, call connector APIs, call Gmail APIs, call Calendar APIs, call Contacts APIs, call Google APIs, call provider APIs, request OAuth, request connector authorization, read emails, read calendar events, read contacts, sync connector data, store tokens, display secrets, display private connector values, send connector or research details to providers, ingest memory, promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildOperatorNotificationCenterShell({
      idHint: "blocked-delivery-request",
      status: "blocked",
      notificationCenterIdentity:
        "Notification center identity: operator-notification-center-shell-blocked-delivery-request.",
      sourceConnectorResearchOperatorLoops: [
        "Source loop: blocked connector notification request.",
        "Source loop: blocked research scheduling request.",
      ],
      notificationCategories: [
        "Notification categories: blocked delivery channel request.",
        "Notification categories: blocked reminder request.",
        "Notification categories: blocked scheduled research request.",
      ],
      priorityPolicy: [
        "Priority policy: blocked until explicit delivery approval exists.",
        "Priority policy: blocked until private details stay redacted.",
      ],
      privacyRedactionPolicy: [
        "Privacy/redaction policy: blocked if private connector research details are unresolved.",
        "Privacy/redaction policy: blocked if a token, secret, or raw value could be displayed.",
      ],
      deliveryChannelNonGoals: [
        "Delivery channel non-goals: no notification delivery behavior.",
        "Delivery channel non-goals: no reminder creation behavior.",
        "Delivery channel non-goals: no scheduling or automation behavior.",
      ],
      reminderBoundaryRoute:
        "Reminder boundary route: blocked until a separate reminder approval surface exists.",
      scheduledResearchBoundaryRoute:
        "Scheduled research boundary route: blocked until a separate scheduled research approval surface exists.",
      blockedReasons: [
        "Delivery approval missing",
        "Reminder boundary missing",
        "Scheduled research boundary missing",
      ],
      advancedNotificationDetails:
        "Advanced notification details: blocked notification requests cannot imply notification send, reminder creation, task scheduling, automation creation, connector API calls, Google API calls, provider API calls, OAuth, connector authorization, token storage, secret display, private value display, provider send, memory ingestion, memory promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, command execution, file mutation, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildOperatorNotificationCenterShellBoundary(): OperatorNotificationCenterShellBoundary {
  return {
    operatorNotificationCenterShellOnly: true,
    notificationCenterDoesNotSendNotificationsYet: true,
    notificationDeliveryRequiresExplicitApproval: true,
    privateConnectorResearchDetailsStayRedacted: true,
    notificationSendAllowedFromUi: false,
    notificationDeliveryAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
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
    connectorEvidenceAutoIngestionAllowed: false,
    connectorEvidenceAutoPromotionAllowed: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    automaticProviderCallsAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptFileSourceConnectorAutoSendAllowed: false,
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

export function summarizeOperatorNotificationCenterShell(
  model: Pick<OperatorNotificationCenterShellModel, "centers">
): string {
  return `Operator notification center shell prepares ${model.centers.length} notification review posture(s). Notification center does not send notifications yet, notification delivery requires explicit approval, and private connector research details stay redacted.`;
}

export function buildOperatorNotificationCenterShellModel(): OperatorNotificationCenterShellModel {
  const centers = buildOperatorNotificationCenterShells();
  const model: OperatorNotificationCenterShellModel = {
    title: "Operator notification center shell",
    summary: "",
    centers,
    boundary: buildOperatorNotificationCenterShellBoundary(),
    notificationLanguage: [...OPERATOR_NOTIFICATION_CENTER_SHELL_LANGUAGE],
    advancedDetails: [
      "Operator notification center shell",
      "Notification center does not send notifications yet",
      "Notification delivery requires explicit approval",
      "Private connector research details stay redacted",
      "Notification categories",
      "Reminder boundary route",
      "Notification center identity",
      "Source connector research operator loops",
      "Priority policy",
      "Privacy/redaction policy",
      "Delivery channel non-goals",
      "Scheduled research boundary route",
      "Blocked reasons",
      "Advanced notification details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeOperatorNotificationCenterShell(model) };
}
