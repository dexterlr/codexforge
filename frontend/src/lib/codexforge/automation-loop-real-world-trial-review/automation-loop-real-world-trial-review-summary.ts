import type {
  AutomationLoopRealWorldTrialReview,
  AutomationLoopRealWorldTrialReviewBoundary,
  AutomationLoopRealWorldTrialReviewModel,
} from "./automation-loop-real-world-trial-review-types";
import { buildAutomationLoopRealWorldTrialReviewStableKey } from "./automation-loop-real-world-trial-review-types";

export const AUTOMATION_LOOP_REAL_WORLD_TRIAL_REVIEW_LANGUAGE = [
  "Automation loop real-world trial review",
  "Automation trial review does not create automations",
  "No background work runs from this page",
  "Notification delivery requires explicit approval",
  "Reminder watch schedule plan",
  "Manual validation checklist",
] as const;

export function buildAutomationLoopRealWorldTrialReview(
  input: Omit<AutomationLoopRealWorldTrialReview, "id"> & { idHint: string }
): AutomationLoopRealWorldTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildAutomationLoopRealWorldTrialReviewStableKey(
      "automation-loop-real-world-trial-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildAutomationLoopRealWorldTrialReviews(): AutomationLoopRealWorldTrialReview[] {
  return [
    buildAutomationLoopRealWorldTrialReview({
      idHint: "operator-reminder-watch-review",
      status: "ready-for-review",
      automationTrialIdentity:
        "Automation trial identity: automation-loop-real-world-trial-review-operator-reminder-watch-review.",
      sourceAutomationReleaseCandidate:
        "Source automation release candidate: /automation-release-candidate supplies reminder readiness, scheduled research readiness, conditional watch readiness, notification readiness, audit/recovery readiness, and known gaps.",
      operatorAutomationScenario:
        "Operator automation scenario: a real operator reviews reminder, watch, and schedule readiness before any reminder, schedule, automation, background work, or notification delivery exists.",
      reminderWatchSchedulePlan: [
        "Reminder watch schedule plan: describe the proposed reminder, scheduled check, or conditional watch in plain English without creating it.",
        "Reminder watch schedule plan: record trigger intent, delivery intent, privacy limits, manual validation, and approval gates.",
        "Reminder watch schedule plan: real evidence is reviewed before use and memory promotion remains blocked until approved.",
      ],
      approvalGates: [
        "Approval gates: explicit approval before any reminder creation.",
        "Approval gates: explicit approval before any task scheduling, watch activation, automation creation, background work, or notification delivery.",
        "Approval gates: explicit review before any provider, connector, file, memory, plugin, tool, agent, or MCP behavior.",
      ],
      deliveryPrivacyPolicy:
        "Delivery/privacy policy: notification delivery requires explicit approval, private connector values and tokens are never displayed, and no background work runs from this page.",
      blockedRealActions: [
        "Blocked real actions: reminder creation, schedule creation, task scheduling, automation creation, watch creation, watch activation, background checks, background jobs, background work, notification sending, notification delivery, and polling loops.",
        "Blocked real actions: connector API calls, Gmail API calls, Calendar API calls, Contacts API calls, Google API calls, connector data reads, OAuth request flow, provider calls, web/search calls, source fetching/browsing, commands, shell commands, git commands, tests, builds, smoke checks, patch apply behavior, commits, file mutation, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, extension runtime executor, MCP runtime, and MCP tool calls.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: confirm the plan is review-only and no automation was created.",
        "Manual validation checklist: confirm no background work runs from this page.",
        "Manual validation checklist: confirm notification delivery requires explicit approval.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: ready when the operator can describe the automation intent and approval gates without creating anything.",
        "Trial outcome notes: blocked if delivery, privacy, validation, or rollback notes are missing.",
      ],
      trialReportRoute:
        "Trial report route: /review-inbox receives the reviewed automation trial report after the operator manually records the outcome.",
      advancedAutomationTrialDetails:
        "Advanced automation trial details: automation loop real-world trial review is review-only and does not create automations, create reminders, create schedules, schedule tasks, create watches, activate watches, run background checks, create background jobs, run background work, send notifications, deliver notifications, start polling loops, call connector APIs, call Gmail APIs, call Calendar APIs, call Contacts APIs, call Google APIs, read connector data, request OAuth, call providers, call web/search APIs, fetch sources, browse sources, run commands, run tests, run builds, run smoke checks, apply patches, create commits, mutate files, export files, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildAutomationLoopRealWorldTrialReview({
      idHint: "blocked-background-work",
      status: "blocked",
      automationTrialIdentity:
        "Automation trial identity: automation-loop-real-world-trial-review-blocked-background-work.",
      sourceAutomationReleaseCandidate:
        "Source automation release candidate: blocked until /automation-release-candidate confirms reminder, watch, schedule, notification, and audit/recovery boundaries.",
      operatorAutomationScenario:
        "Operator automation scenario: blocked when a request asks this review page to create reminders, schedule tasks, activate watches, run background work, send notifications, or create automations.",
      reminderWatchSchedulePlan: [
        "Reminder watch schedule plan: blocked until trigger, schedule, delivery, privacy, and approval gates are explicit.",
      ],
      approvalGates: [
        "Approval gates: blocked because explicit approval is missing.",
      ],
      deliveryPrivacyPolicy:
        "Delivery/privacy policy: blocked because notification delivery and privacy boundaries are not reviewed.",
      blockedRealActions: [
        "Blocked real actions: every automation, notification, provider, connector, local file, command, memory, plugin, tool, agent, and MCP action remains blocked.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: blocked until the operator can confirm no background work or notification delivery started.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: blocked until automation intent and approval gates are reviewed.",
      ],
      trialReportRoute:
        "Trial report route: /review-inbox remains the report handoff after manual review.",
      advancedAutomationTrialDetails:
        "Advanced automation trial details: blocked automation reviews cannot recover by creating reminders, schedules, watches, automations, background jobs, notifications, provider calls, connector reads, file writes, memory promotion, Brain graph mutation, or MCP runtime behavior.",
    }),
  ];
}

export function buildAutomationLoopRealWorldTrialReviewBoundary(): AutomationLoopRealWorldTrialReviewBoundary {
  return {
    automationTrialReviewOnly: true,
    automationTrialReviewDoesNotCreateAutomations: true,
    noBackgroundWorkRunsFromPage: true,
    notificationDeliveryRequiresExplicitApproval: true,
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
    reminderCreationAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    watchCreationAllowedFromUi: false,
    watchActivationAllowedFromUi: false,
    backgroundCheckAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    backgroundWorkAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    notificationDeliveryAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
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

export function summarizeAutomationLoopRealWorldTrialReview(
  model: Pick<AutomationLoopRealWorldTrialReviewModel, "reviews">
): string {
  return `Automation loop real-world trial review prepares ${model.reviews.length} automation trial posture(s). Automation trial review does not create automations, no background work runs from this page, and notification delivery requires explicit approval.`;
}

export function buildAutomationLoopRealWorldTrialReviewModel(): AutomationLoopRealWorldTrialReviewModel {
  const reviews = buildAutomationLoopRealWorldTrialReviews();
  const model: AutomationLoopRealWorldTrialReviewModel = {
    title: "Automation loop real-world trial review",
    summary: "",
    reviews,
    boundary: buildAutomationLoopRealWorldTrialReviewBoundary(),
    trialReviewLanguage: [...AUTOMATION_LOOP_REAL_WORLD_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Automation loop real-world trial review",
      "Automation trial review does not create automations",
      "No background work runs from this page",
      "Notification delivery requires explicit approval",
      "Real evidence is reviewed before use",
      "Memory promotion remains blocked until approved",
      "Automation trial identity",
      "Source automation release candidate",
      "Operator automation scenario",
      "Reminder watch schedule plan",
      "Approval gates",
      "Delivery/privacy policy",
      "Blocked real actions",
      "Manual validation checklist",
      "Trial outcome notes",
      "Trial report route",
      "advanced automation trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeAutomationLoopRealWorldTrialReview(model) };
}
