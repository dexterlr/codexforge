import type {
  AutomationApprovalQueueReview,
  AutomationApprovalQueueReviewBoundary,
  AutomationApprovalQueueReviewModel,
} from "./automation-approval-queue-review-types";
import { buildAutomationApprovalQueueReviewStableKey } from "./automation-approval-queue-review-types";

export const AUTOMATION_APPROVAL_QUEUE_REVIEW_LANGUAGE = [
  "Automation approval queue review",
  "Automation approval queue does not approve actions automatically",
  "Automation approvals require explicit operator review",
  "Denied automation actions remain blocked",
  "Approval queue groups",
  "Pending action types",
] as const;

export function buildAutomationApprovalQueueReview(
  input: Omit<AutomationApprovalQueueReview, "id"> & { idHint: string }
): AutomationApprovalQueueReview {
  const { idHint, ...queue } = input;
  return {
    id: buildAutomationApprovalQueueReviewStableKey("automation-approval-queue-review", idHint, input.status),
    ...queue,
  };
}

export function buildAutomationApprovalQueueReviews(): AutomationApprovalQueueReview[] {
  return [
    buildAutomationApprovalQueueReview({
      idHint: "manual-review-queue",
      status: "pending-review",
      automationApprovalQueueIdentity:
        "Automation approval queue identity: automation-approval-queue-review-manual-review-queue.",
      approvalQueueGroups: [
        "Approval queue groups: dry-run follow-up, schedule safety review, connector/provider boundary review, and release candidate readiness.",
        "Approval queue groups: every item remains a preview until an operator reviews it outside automatic approval.",
      ],
      pendingActionTypes: [
        "Pending action types: run automation, create schedule, create reminder, create watch, send notification, call connector, call provider, mutate memory, or mutate files are listed only as blocked review categories.",
      ],
      operatorDecisionChecklist: [
        "Operator decision checklist: confirm owner, scope, data source, timing, denied shortcuts, rollback plan, and audit note before any future approval packet.",
        "Operator decision checklist: automation approvals require explicit operator review and cannot be inferred from queue position.",
      ],
      deniedApprovalShortcuts: [
        "Denied approval shortcuts: auto-approve, bulk approve, approve from UI, persist approval decision, run workflow, create automation, schedule task, or send notification.",
      ],
      retentionAndAuditNotes: [
        "Retention and audit notes: this page shows review copy only; it does not persist approval decisions, store automation data, store provider outputs, or append audit events.",
      ],
      blockedApprovalQueueRisks: [
        "Blocked approval queue risks: missing owner, unsafe schedule, connector fetch request, provider send request, unclear denied action, file mutation request, or memory promotion request.",
      ],
      scheduleSafetyRoute:
        "Schedule safety route: /automation-schedule-safety-review reviews cadence and notification timing without scheduling tasks.",
      automationReleaseCandidateRoute:
        "Automation release candidate route: /automation-integration-release-candidate summarizes readiness without running automations.",
      nextRecommendedAction:
        "Next recommended action: keep pending actions blocked, review schedule safety, and move only manually reviewed findings into the automation integration release candidate.",
      advancedQueueDetails:
        "Advanced queue details: automation approval queue review is review-only. Automation approval queue does not approve actions automatically, automation approvals require explicit operator review, and denied automation actions remain blocked. It does not approve actions, persist approval decisions, run workflows, create automations, persist automation rules, create reminders, schedule tasks, create schedules, create conditional watches, create background jobs, start polling loops, send notifications, call connector APIs, connect connector accounts, fetch connector data, store connector data, call providers, test provider connections, route provider traffic, send prompts to providers, store provider outputs, call local models, call local bridge endpoints, launch local tools, generate creative assets, run research, execute coding workflows, apply patches, browse web or search APIs, call GitHub APIs, scan arbitrary projects, browse local files, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, store outputs, store automation data, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildAutomationApprovalQueueReview({
      idHint: "blocked-shortcut-request",
      status: "blocked",
      automationApprovalQueueIdentity:
        "Automation approval queue identity: automation-approval-queue-review-blocked-shortcut-request.",
      approvalQueueGroups: [
        "Approval queue groups: blocked because the item asks for automatic approval or persistent approval state.",
      ],
      pendingActionTypes: [
        "Pending action types: blocked automatic approval, blocked schedule creation, and blocked notification send request.",
      ],
      operatorDecisionChecklist: [
        "Operator decision checklist: blocked until explicit operator review replaces the shortcut request.",
      ],
      deniedApprovalShortcuts: [
        "Denied approval shortcuts: automatic approval, approval persistence, workflow execution, and notification sending remain blocked.",
      ],
      retentionAndAuditNotes: [
        "Retention and audit notes: blocked shortcut requests are not written to audit storage from this page.",
      ],
      blockedApprovalQueueRisks: [
        "Blocked approval queue risks: shortcut approval, missing schedule safety, missing data boundary, or live execution request.",
      ],
      scheduleSafetyRoute:
        "Schedule safety route: /automation-schedule-safety-review keeps schedule shortcuts blocked.",
      automationReleaseCandidateRoute:
        "Automation release candidate route: /automation-integration-release-candidate stays review-only.",
      nextRecommendedAction:
        "Next recommended action: keep denied automation actions blocked and request a manual approval packet.",
      advancedQueueDetails:
        "Advanced queue details: blocked approval queue items cannot approve actions, persist decisions, run workflows, create automations, schedule tasks, send notifications, call connectors, call providers, mutate files, or mutate memory.",
    }),
  ];
}

export function buildAutomationApprovalQueueReviewBoundary(): AutomationApprovalQueueReviewBoundary {
  return {
    automationApprovalQueueReviewOnly: true,
    automationApprovalQueueDoesNotApproveActionsAutomatically: true,
    automationApprovalsRequireExplicitOperatorReview: true,
    deniedAutomationActionsRemainBlocked: true,
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

export function summarizeAutomationApprovalQueueReview(
  model: Pick<AutomationApprovalQueueReviewModel, "queues">
): string {
  return `Automation approval queue review previews ${model.queues.length} approval queue item(s). Automation approval queue does not approve actions automatically, automation approvals require explicit operator review, and denied automation actions remain blocked.`;
}

export function buildAutomationApprovalQueueReviewModel(): AutomationApprovalQueueReviewModel {
  const queues = buildAutomationApprovalQueueReviews();
  const model: AutomationApprovalQueueReviewModel = {
    title: "Automation approval queue review",
    summary: "",
    queues,
    boundary: buildAutomationApprovalQueueReviewBoundary(),
    queueLanguage: [...AUTOMATION_APPROVAL_QUEUE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Automation approval queue review",
      "automation approval queue identity",
      "Approval queue groups",
      "Pending action types",
      "operator decision checklist",
      "denied approval shortcuts",
      "retention and audit notes",
      "blocked approval queue risks",
      "schedule safety route",
      "automation release candidate route",
      "next recommended action",
      "Automation approval queue does not approve actions automatically",
      "Automation approvals require explicit operator review",
      "Denied automation actions remain blocked",
      "advanced queue details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeAutomationApprovalQueueReview(model) };
}
