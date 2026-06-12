import type {
  AutomationScheduleSafetyReview,
  AutomationScheduleSafetyReviewBoundary,
  AutomationScheduleSafetyReviewModel,
} from "./automation-schedule-safety-review-types";
import { buildAutomationScheduleSafetyReviewStableKey } from "./automation-schedule-safety-review-types";

export const AUTOMATION_SCHEDULE_SAFETY_REVIEW_LANGUAGE = [
  "Automation schedule safety review",
  "Automation schedule safety review does not schedule tasks",
  "Scheduled automation requires explicit operator approval",
  "Unsafe schedule shortcuts stay blocked",
  "Schedule safety groups",
  "Cadence rate-limit checklist",
] as const;

export function buildAutomationScheduleSafetyReview(
  input: Omit<AutomationScheduleSafetyReview, "id"> & { idHint: string }
): AutomationScheduleSafetyReview {
  const { idHint, ...review } = input;
  return {
    id: buildAutomationScheduleSafetyReviewStableKey("automation-schedule-safety-review", idHint, input.status),
    ...review,
  };
}

export function buildAutomationScheduleSafetyReviews(): AutomationScheduleSafetyReview[] {
  return [
    buildAutomationScheduleSafetyReview({
      idHint: "safe-cadence-preview",
      status: "ready-for-review",
      automationScheduleSafetyIdentity:
        "Automation schedule safety identity: automation-schedule-safety-review-safe-cadence-preview.",
      scheduleSafetyGroups: [
        "Schedule safety groups: cadence, rate limit, quiet hours, notification restraint, connector/provider timing boundary, and denied shortcut review.",
        "Schedule safety groups: schedule rules stay descriptive only; no schedule, reminder, watch, polling loop, or background job is created.",
      ],
      cadenceRateLimitChecklist: [
        "Cadence rate-limit checklist: minimum spacing, maximum daily count, human-readable timing, retry restraint, and manual pause owner are visible.",
        "Cadence/rate-limit checklist: any schedule that implies polling, retries, or burst execution remains blocked.",
      ],
      quietHoursNotificationChecklist: [
        "Quiet-hours and notification checklist: quiet hours are reviewed as policy text only; no notification is sent and no delivery channel is configured.",
      ],
      deniedScheduleShortcuts: [
        "Denied schedule shortcuts: auto-schedule, schedule from dry-run, create task, create reminder, activate watch, start polling, start background job, or send notification.",
      ],
      connectorProviderTimingBoundaryNotes: [
        "Connector/provider timing boundary notes: connector calls, provider calls, local bridge calls, search calls, and GitHub calls are never triggered by schedule review.",
      ],
      blockedScheduleRisks: [
        "Blocked schedule risks: unsafe cadence, quiet-hours conflict, implied polling loop, notification send request, connector fetch request, provider send request, file mutation, or memory promotion.",
      ],
      automationReleaseCandidateRoute:
        "Automation release candidate route: /automation-integration-release-candidate summarizes schedule safety without running automations.",
      dryRunRoute:
        "Dry-run route: /automation-dry-run-trial-review previews automation behavior without creating automations.",
      nextRecommendedAction:
        "Next recommended action: keep schedule safety in review, send unresolved timing risks back to dry-run review, and require explicit operator approval before any scheduled automation.",
      advancedScheduleDetails:
        "Advanced schedule details: automation schedule safety review is review-only. Automation schedule safety review does not schedule tasks, scheduled automation requires explicit operator approval, and unsafe schedule shortcuts stay blocked. It does not schedule tasks, create schedules, create reminders, create watches, create automations, persist automation rules, persist approval decisions, create background jobs, start polling loops, send notifications, run workflows, call connector APIs, connect connector accounts, fetch connector data, store connector data, call providers, test provider connections, route provider traffic, send prompts to providers, store provider outputs, call local models, call local bridge endpoints, launch local tools, generate creative assets, run research, execute coding workflows, apply patches, browse web or search APIs, call GitHub APIs, scan arbitrary projects, browse local files, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, store outputs, store automation data, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildAutomationScheduleSafetyReview({
      idHint: "blocked-polling-shortcut",
      status: "blocked",
      automationScheduleSafetyIdentity:
        "Automation schedule safety identity: automation-schedule-safety-review-blocked-polling-shortcut.",
      scheduleSafetyGroups: [
        "Schedule safety groups: blocked because the proposed cadence implies polling, background work, or notification delivery.",
      ],
      cadenceRateLimitChecklist: [
        "Cadence rate-limit checklist: blocked until cadence is reviewed manually and polling is removed.",
      ],
      quietHoursNotificationChecklist: [
        "Quiet-hours and notification checklist: blocked until notification timing is reviewed without sending notifications.",
      ],
      deniedScheduleShortcuts: [
        "Denied schedule shortcuts: automatic schedule creation, polling loops, background jobs, and notification sending remain blocked.",
      ],
      connectorProviderTimingBoundaryNotes: [
        "Connector/provider timing boundary notes: blocked schedule cannot call connectors or providers.",
      ],
      blockedScheduleRisks: [
        "Blocked schedule risks: polling loop, missing operator approval, unsafe cadence, or live provider/connector request.",
      ],
      automationReleaseCandidateRoute:
        "Automation release candidate route: /automation-integration-release-candidate stays review-only.",
      dryRunRoute:
        "Dry-run route: /automation-dry-run-trial-review stays review-only.",
      nextRecommendedAction:
        "Next recommended action: keep unsafe schedule shortcuts blocked and return to dry-run review.",
      advancedScheduleDetails:
        "Advanced schedule details: blocked schedule safety items cannot schedule tasks, create schedules, create reminders, create watches, start polling loops, create background jobs, send notifications, call connectors, call providers, mutate files, or mutate memory.",
    }),
  ];
}

export function buildAutomationScheduleSafetyReviewBoundary(): AutomationScheduleSafetyReviewBoundary {
  return {
    automationScheduleSafetyReviewOnly: true,
    automationScheduleSafetyReviewDoesNotScheduleTasks: true,
    scheduledAutomationRequiresExplicitOperatorApproval: true,
    unsafeScheduleShortcutsStayBlocked: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    actionsApprovedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    automationRulePersistenceAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    conditionalWatchCreationAllowedFromUi: false,
    watchCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerLiveConnectionTestsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    creativeAssetGenerationAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    webSearchApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    evidenceAutoIngestionAllowedFromUi: false,
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
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    tokenStorageAllowed: false,
    endpointStorageAllowed: false,
    credentialStorageAllowed: false,
    outputStorageAllowed: false,
    automationDataStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    routeCoverageRemovalAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeAutomationScheduleSafetyReview(
  model: Pick<AutomationScheduleSafetyReviewModel, "reviews">
): string {
  return `Automation schedule safety review previews ${model.reviews.length} schedule safety item(s). Automation schedule safety review does not schedule tasks, scheduled automation requires explicit operator approval, and unsafe schedule shortcuts stay blocked.`;
}

export function buildAutomationScheduleSafetyReviewModel(): AutomationScheduleSafetyReviewModel {
  const reviews = buildAutomationScheduleSafetyReviews();
  const model: AutomationScheduleSafetyReviewModel = {
    title: "Automation schedule safety review",
    summary: "",
    reviews,
    boundary: buildAutomationScheduleSafetyReviewBoundary(),
    scheduleLanguage: [...AUTOMATION_SCHEDULE_SAFETY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Automation schedule safety review",
      "automation schedule safety identity",
      "Schedule safety groups",
      "Cadence rate-limit checklist",
      "quiet-hours and notification checklist",
      "denied schedule shortcuts",
      "connector/provider timing boundary notes",
      "blocked schedule risks",
      "automation release candidate route",
      "dry-run route",
      "next recommended action",
      "Automation schedule safety review does not schedule tasks",
      "Scheduled automation requires explicit operator approval",
      "Unsafe schedule shortcuts stay blocked",
      "advanced schedule details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeAutomationScheduleSafetyReview(model) };
}
