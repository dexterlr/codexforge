import type {
  AutomationLiveExecutionGuardReview,
  AutomationLiveExecutionGuardReviewBoundary,
  AutomationLiveExecutionGuardReviewModel,
} from "./automation-live-execution-guard-review-types";
import { buildAutomationLiveExecutionGuardReviewStableKey } from "./automation-live-execution-guard-review-types";

export const AUTOMATION_LIVE_EXECUTION_GUARD_REVIEW_LANGUAGE = [
  "Automation live execution guard review",
  "Automation live execution guard review does not run automations",
  "Live automation requires explicit operator approval",
  "Unsafe automation execution stays blocked",
  "Execution guard groups",
  "Schedule rate-limit checklist",
] as const;

export function buildAutomationLiveExecutionGuardReview(
  input: Omit<AutomationLiveExecutionGuardReview, "id"> & { idHint: string }
): AutomationLiveExecutionGuardReview {
  const { idHint, ...review } = input;
  return {
    id: buildAutomationLiveExecutionGuardReviewStableKey(
      "automation-live-execution-guard-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildAutomationLiveExecutionGuardReviews(): AutomationLiveExecutionGuardReview[] {
  return [
    buildAutomationLiveExecutionGuardReview({
      idHint: "review-only-execution-guard",
      status: "ready-for-review",
      automationLiveExecutionGuardIdentity:
        "Automation live execution guard identity: automation-live-execution-guard-review-review-only-execution-guard.",
      executionGuardGroups: [
        "Execution guard groups: operator approval, dry-run replay, allowed action class, denied action class, schedule and rate limit, notification boundary, stop condition, audit note, and rollback owner.",
        "Execution guard groups: automation live execution guard review does not run automations.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: live automation requires explicit operator approval, visible scope, stop condition, rollback note, and no auto-approval.",
      ],
      scheduleRateLimitChecklist: [
        "Schedule rate-limit checklist: no schedule is created, no task is scheduled, no reminder is created, and no polling loop or background job starts from this page.",
      ],
      notificationBoundaryChecklist: [
        "Notification boundary checklist: no notification is sent, queued, scheduled, or persisted from this page.",
      ],
      deniedAutomationExecutionActions: [
        "Denied automation execution actions: run automations, create automations, persist automation rules, create schedules, create reminders, create tasks, create watches, start polling loops, create background jobs, send notifications, or approve actions automatically.",
        "Denied automation execution actions: call connectors, call providers, call local models, call local bridge endpoints, mutate files, mutate memory, execute tools, execute agents, or create MCP runtimes.",
      ],
      blockedExecutionRisks: [
        "Blocked execution risks: missing explicit approval, unsafe action class, unsafe cadence, notification send request, connector fetch request, provider send request, local bridge request, file mutation request, or memory promotion request.",
        "Blocked execution risks: unsafe automation execution stays blocked.",
      ],
      automationDryRunReplayRoute:
        "Automation dry-run replay route: /first-automation-live-dry-run-replay replays the automation plan in review mode without creating or executing automation.",
      automationApprovalTrialRoute:
        "Automation approval trial route: /first-automation-live-approval-trial reviews automation approvals without approving or executing anything.",
      nextRecommendedAction:
        "Next recommended action: review the automation live dry-run replay, then review the automation approval trial before any manual live release packet.",
      advancedGuardDetails:
        "Advanced guard details: automation live execution guard review is review-only. Automation live execution guard review does not run automations, live automation requires explicit operator approval, and unsafe automation execution stays blocked. It does not run automations, create automations, persist automation rules, create schedules, schedule tasks, create reminders, create watches, create background jobs, start polling loops, send notifications, approve actions, persist approval decisions, call connectors, connect accounts, fetch connector data, store connector data, call providers, send prompts, store outputs, call local models, call local bridge endpoints, execute workflows, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildAutomationLiveExecutionGuardReview({
      idHint: "blocked-live-execution-request",
      status: "blocked",
      automationLiveExecutionGuardIdentity:
        "Automation live execution guard identity: automation-live-execution-guard-review-blocked-live-execution-request.",
      executionGuardGroups: [
        "Execution guard groups: blocked because the request implies live automation execution.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: explicit operator approval is required outside this page.",
      ],
      scheduleRateLimitChecklist: [
        "Schedule rate-limit checklist: schedule creation and polling loops remain blocked.",
      ],
      notificationBoundaryChecklist: [
        "Notification boundary checklist: notification sending remains blocked.",
      ],
      deniedAutomationExecutionActions: [
        "Denied automation execution actions: automation execution, schedule creation, reminder creation, watch creation, polling, background jobs, notification sending, and auto-approval remain blocked.",
      ],
      blockedExecutionRisks: [
        "Blocked execution risks: unsafe automation execution stays blocked.",
      ],
      automationDryRunReplayRoute:
        "Automation dry-run replay route: /first-automation-live-dry-run-replay remains review-only.",
      automationApprovalTrialRoute:
        "Automation approval trial route: /first-automation-live-approval-trial remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep live automation blocked and return to dry-run replay review.",
      advancedGuardDetails:
        "Advanced guard details: blocked automation execution cannot recover by running automations, creating schedules, sending notifications, or approving actions automatically.",
    }),
  ];
}

export function buildAutomationLiveExecutionGuardReviewBoundary(): AutomationLiveExecutionGuardReviewBoundary {
  return {
    automationLiveExecutionGuardReviewOnly: true,
    automationLiveExecutionGuardReviewDoesNotRunAutomations: true,
    liveAutomationRequiresExplicitOperatorApproval: true,
    unsafeAutomationExecutionStaysBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
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
    connectorEvidenceAutoIngestionAllowed: false,
    evidenceAutoIngestionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
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
    connectorDataStorageAllowed: false,
    automationDataStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    routeCoverageRemovalAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeAutomationLiveExecutionGuardReview(
  model: Pick<AutomationLiveExecutionGuardReviewModel, "reviews">
): string {
  return `Automation live execution guard review prepares ${model.reviews.length} execution guard posture(s). Automation live execution guard review does not run automations, live automation requires explicit operator approval, and unsafe automation execution stays blocked.`;
}

export function buildAutomationLiveExecutionGuardReviewModel(): AutomationLiveExecutionGuardReviewModel {
  const reviews = buildAutomationLiveExecutionGuardReviews();
  const model: AutomationLiveExecutionGuardReviewModel = {
    title: "Automation live execution guard review",
    summary: "",
    reviews,
    boundary: buildAutomationLiveExecutionGuardReviewBoundary(),
    guardLanguage: [...AUTOMATION_LIVE_EXECUTION_GUARD_REVIEW_LANGUAGE],
    advancedDetails: [
      "Automation live execution guard review",
      "automation live execution guard identity",
      "Execution guard groups",
      "approval gate checklist",
      "Schedule rate-limit checklist",
      "notification boundary checklist",
      "denied automation execution actions",
      "blocked execution risks",
      "automation dry-run replay route",
      "automation approval trial route",
      "next recommended action",
      "Automation live execution guard review does not run automations",
      "Live automation requires explicit operator approval",
      "Unsafe automation execution stays blocked",
      "advanced guard details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeAutomationLiveExecutionGuardReview(model) };
}
