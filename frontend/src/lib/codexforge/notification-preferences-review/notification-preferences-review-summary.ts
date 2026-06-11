import type {
  NotificationPreferencesReview,
  NotificationPreferencesReviewBoundary,
  NotificationPreferencesReviewModel,
} from "./notification-preferences-review-types";
import { buildNotificationPreferencesReviewStableKey } from "./notification-preferences-review-types";

export const NOTIFICATION_PREFERENCES_REVIEW_LANGUAGE = [
  "Notification preferences review",
  "Notification preferences are not saved from this page",
  "No notifications are sent from this page",
  "Notification delivery requires explicit approval",
  "Notification groups",
  "Urgency cadence preview",
] as const;

export function buildNotificationPreferencesReview(
  input: Omit<NotificationPreferencesReview, "id"> & { idHint: string }
): NotificationPreferencesReview {
  const { idHint, ...review } = input;
  return {
    id: buildNotificationPreferencesReviewStableKey("notification-preferences-review", idHint, input.status),
    ...review,
  };
}

export function buildNotificationPreferencesReviews(): NotificationPreferencesReview[] {
  return [
    buildNotificationPreferencesReview({
      idHint: "daily-review-notifications",
      status: "ready-for-review",
      notificationPreferencesIdentity:
        "Notification preferences identity: notification-preferences-review-daily-review-notifications.",
      notificationGroups: [
        "Notification groups: daily review, blocked safety risk, validation evidence, approval request, and release readiness.",
        "Notification groups: every group is a preview and is not saved from this page.",
      ],
      urgencyCadencePreview: [
        "Urgency cadence preview: quiet daily summary, immediate blocked-risk review, and manual release checklist review are shown as suggestions only.",
        "Urgency cadence preview: this page does not create notifications, reminders, schedules, automations, polling loops, or background jobs.",
      ],
      privacyRedactionRules: [
        "Privacy/redaction rules: private file names, connector details, prompt text, project details, tokens, API keys, and secrets stay out of notification previews.",
        "Privacy/redaction rules: notification preference data is not sent to providers, connectors, GitHub, web/search, or local bridge endpoints.",
      ],
      deliveryApprovalGates: [
        "Delivery approval gates: notification delivery requires explicit approval.",
        "Delivery approval gates: notification preferences are not saved from this page and no notifications are sent from this page.",
      ],
      blockedNotificationRisks: [
        "Blocked notification risks: saving notification preferences, creating notifications, sending notifications, writing browser storage, mutating settings, and creating automations stay blocked.",
        "Blocked notification risks: notification delivery cannot bypass approval policy, redaction, or saved review view boundaries.",
      ],
      approvalPolicyPresetsRoute:
        "Approval policy presets route: /approval-policy-presets reviews policy presets without changing live approval policy.",
      savedReviewViewsRoute:
        "Saved review views route: /saved-review-views previews saved view presets without storing them.",
      nextRecommendedAction:
        "Next recommended action: review delivery approval gates, then inspect approval policy presets before any separate approved notification change happens elsewhere.",
      advancedNotificationDetails:
        "Advanced notification details: notification preferences review is review-only. Notification preferences are not saved from this page, no notifications are sent from this page, notification delivery requires explicit approval, and this page does not create notifications, send notifications, save notification preferences, save preferences, persist personalization, save views, mutate settings, change approval policy, persist approval presets, run recovery, persist recovery presets, write browser storage, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/preference data without approval, run workflows, run shell commands, run git commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, read arbitrary local files, browse arbitrary local files, scan arbitrary projects, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildNotificationPreferencesReview({
      idHint: "blocked-auto-delivery",
      status: "blocked",
      notificationPreferencesIdentity:
        "Notification preferences identity: notification-preferences-review-blocked-auto-delivery.",
      notificationGroups: [
        "Notification groups: blocked when a preference preview implies automatic notification creation or delivery.",
      ],
      urgencyCadencePreview: [
        "Urgency cadence preview: blocked because cadence preview cannot create reminders, schedules, notifications, or polling loops.",
      ],
      privacyRedactionRules: [
        "Privacy/redaction rules: blocked previews keep private details redacted and do not call APIs.",
      ],
      deliveryApprovalGates: [
        "Delivery approval gates: notification delivery requires explicit approval before use.",
      ],
      blockedNotificationRisks: [
        "Blocked notification risks: automatic delivery, browser storage writes, settings mutation, notification creation, and notification sending remain blocked.",
      ],
      approvalPolicyPresetsRoute:
        "Approval policy presets route: /approval-policy-presets remains review-only.",
      savedReviewViewsRoute:
        "Saved review views route: /saved-review-views remains preview-only.",
      nextRecommendedAction:
        "Next recommended action: keep automatic notification delivery blocked until a separate approved delivery policy exists outside this page.",
      advancedNotificationDetails:
        "Advanced notification details: blocked notification preferences cannot recover by saving preferences, creating notifications, sending notifications, writing storage, changing policy, calling APIs, executing workflows, or mutating memory from this page.",
    }),
  ];
}

export function buildNotificationPreferencesReviewBoundary(): NotificationPreferencesReviewBoundary {
  return {
    notificationPreferencesReviewOnly: true,
    notificationPreferencesAreNotSavedFromThisPage: true,
    noNotificationsAreSentFromThisPage: true,
    notificationDeliveryRequiresExplicitApproval: true,
    notificationPreferencePersistenceAllowedFromUi: false,
    notificationCreationAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    settingsMutationAllowedFromUi: false,
    preferencePersistenceAllowedFromUi: false,
    personalizationPersistenceAllowedFromUi: false,
    savedViewPersistenceAllowedFromUi: false,
    approvalPolicyMutationAllowedFromUi: false,
    approvalPresetPersistenceAllowedFromUi: false,
    recoveryExecutionAllowedFromUi: false,
    recoveryPresetPersistenceAllowedFromUi: false,
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

export function summarizeNotificationPreferencesReview(
  model: Pick<NotificationPreferencesReviewModel, "reviews">
): string {
  return `Notification preferences review prepares ${model.reviews.length} notification preference preview posture(s). Notification preferences are not saved from this page, no notifications are sent from this page, and notification delivery requires explicit approval.`;
}

export function buildNotificationPreferencesReviewModel(): NotificationPreferencesReviewModel {
  const reviews = buildNotificationPreferencesReviews();
  const model: NotificationPreferencesReviewModel = {
    title: "Notification preferences review",
    summary: "",
    reviews,
    boundary: buildNotificationPreferencesReviewBoundary(),
    notificationLanguage: [...NOTIFICATION_PREFERENCES_REVIEW_LANGUAGE],
    advancedDetails: [
      "Notification preferences review",
      "Notification preferences identity",
      "Notification groups",
      "Urgency cadence preview",
      "Privacy/redaction rules",
      "Delivery approval gates",
      "Blocked notification risks",
      "Approval policy presets route",
      "Saved review views route",
      "Next recommended action",
      "Notification preferences are not saved from this page",
      "No notifications are sent from this page",
      "Notification delivery requires explicit approval",
      "advanced notification details collapsed/secondary",
      "no notification preference persistence",
      "no notification creation",
      "no notification sending",
      "no localStorage writes",
      "no sessionStorage writes",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeNotificationPreferencesReview(model) };
}
