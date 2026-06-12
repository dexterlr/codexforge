import type {
  LiveTrialFailureRecoveryReview,
  LiveTrialFailureRecoveryReviewBoundary,
  LiveTrialFailureRecoveryReviewModel,
} from "./live-trial-failure-recovery-review-types";
import { buildLiveTrialFailureRecoveryReviewStableKey } from "./live-trial-failure-recovery-review-types";

export const LIVE_TRIAL_FAILURE_RECOVERY_REVIEW_LANGUAGE = [
  "Live trial failure recovery review",
  "Live trial failure recovery review does not trigger recovery automatically",
  "Recovery actions require explicit operator approval",
  "Unsafe recovery shortcuts remain blocked",
  "Failure categories",
  "Recovery action groups",
] as const;

export function buildLiveTrialFailureRecoveryReview(
  input: Omit<LiveTrialFailureRecoveryReview, "id"> & { idHint: string }
): LiveTrialFailureRecoveryReview {
  const { idHint, ...review } = input;
  return {
    id: buildLiveTrialFailureRecoveryReviewStableKey("live-trial-failure-recovery-review", idHint, input.status),
    ...review,
  };
}

export function buildLiveTrialFailureRecoveryReviews(): LiveTrialFailureRecoveryReview[] {
  return [
    buildLiveTrialFailureRecoveryReview({
      idHint: "review-only-recovery-paths",
      status: "ready-for-review",
      liveTrialFailureRecoveryIdentity:
        "Live trial failure recovery identity: live-trial-failure-recovery-review-review-only-recovery-paths.",
      failureCategories: [
        "Failure categories: missing approval, stop condition reached, provider boundary risk, local model boundary risk, connector privacy risk, automation schedule risk, output handling risk, evidence ambiguity, file mutation risk, memory mutation risk, and secret exposure risk.",
        "Failure categories: categories are reviewed as labels and do not trigger recovery automatically.",
      ],
      recoveryActionGroups: [
        "Recovery action groups: stop, contain, notify operator manually, preserve manual notes, review approvals, review runbook, review evidence, choose manual rollback, and route follow-up review.",
        "Recovery action groups: recovery actions require explicit operator approval and this page does not run recovery.",
      ],
      rollbackChecklist: [
        "Rollback checklist: confirm stop owner, confirm approval owner, confirm affected boundary, confirm no file mutation from this page, confirm no output storage, confirm no memory promotion, and record manual recovery notes outside this page.",
        "Rollback checklist: rollback guidance is review-only and does not mutate files, apply patches, run git, run shell commands, or export files.",
      ],
      deniedRecoveryShortcuts: [
        "Denied recovery shortcuts: trigger recovery, rollback automatically, approve recovery, persist approvals, launch workflows, execute live actions, call providers, call local models, call connectors, create automations, write files, store outputs, or mutate memory.",
        "Denied recovery shortcuts: unsafe recovery shortcuts remain blocked until an operator approves a separate manual path.",
      ],
      escalationChecklist: [
        "Escalation checklist: unclear owner, repeated failure, unexpected live route, credential concern, local endpoint concern, connector privacy concern, automation timing concern, file mutation concern, memory concern, or missing rollback evidence.",
        "Escalation checklist: escalation stays manual and does not send notifications, create tasks, schedule reminders, start watches, create background jobs, or poll.",
      ],
      blockedRecoveryRisks: [
        "Blocked recovery risks: automatic recovery trigger, rollback execution, auto-approval, provider traffic, local bridge calls, connector data fetch, automation creation, output persistence, evidence ingestion, file mutation, memory mutation, and secret display.",
        "Blocked recovery risks: unresolved risks keep the controlled live workflow trial in review-only mode.",
      ],
      controlledLiveWorkflowRoute:
        "Controlled live workflow route: /first-controlled-live-workflow-trial previews the trial without executing live actions.",
      liveTrialRunbookRoute:
        "Live trial runbook route: /first-live-trial-runbook-review keeps rollback and stop conditions operator-controlled.",
      nextRecommendedAction:
        "Next recommended action: review the controlled live workflow trial only after runbook, checklist, and recovery paths are manually reviewed.",
      advancedRecoveryDetails:
        "Advanced recovery details: live trial failure recovery review is review-only. Live trial failure recovery review does not trigger recovery automatically, recovery actions require explicit operator approval, and unsafe recovery shortcuts remain blocked. It does not execute actions, launch live workflows, execute live actions, approve actions, persist approvals, trigger recovery, execute rollback, call provider APIs, test provider connections, route provider traffic, send prompts, store provider outputs, call local models, call local bridge endpoints, call connector APIs, connect connector accounts, fetch connector data, store connector data, create automations, run automations, persist automation rules, create reminders, schedule tasks, create schedules, create conditional watches, create background jobs, start polling loops, send notifications, generate creative assets, run research, execute coding workflows, apply patches, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, store outputs, store automation data, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildLiveTrialFailureRecoveryReview({
      idHint: "blocked-auto-recovery-shortcut",
      status: "blocked",
      liveTrialFailureRecoveryIdentity:
        "Live trial failure recovery identity: live-trial-failure-recovery-review-blocked-auto-recovery-shortcut.",
      failureCategories: [
        "Failure categories: blocked when failure handling implies automatic recovery, rollback execution, approval automation, live action execution, provider calls, connector calls, automation creation, file mutation, or memory mutation.",
      ],
      recoveryActionGroups: [
        "Recovery action groups: blocked because recovery actions require explicit operator approval.",
      ],
      rollbackChecklist: [
        "Rollback checklist: blocked until rollback remains a manual checklist and no file mutation or command execution is implied.",
      ],
      deniedRecoveryShortcuts: [
        "Denied recovery shortcuts: auto-recover, auto-rollback, approve recovery, execute workflow, execute live action, store output, mutate files, and mutate memory remain blocked.",
      ],
      escalationChecklist: [
        "Escalation checklist: blocked until an operator owns escalation and stop conditions stay manual.",
      ],
      blockedRecoveryRisks: [
        "Blocked recovery risks: recovery auto-trigger, rollback execution, auto-approval, output persistence, file mutation, and memory mutation.",
      ],
      controlledLiveWorkflowRoute:
        "Controlled live workflow route: /first-controlled-live-workflow-trial remains review-only.",
      liveTrialRunbookRoute:
        "Live trial runbook route: /first-live-trial-runbook-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep unsafe recovery shortcuts blocked and return to runbook and checklist review.",
      advancedRecoveryDetails:
        "Advanced recovery details: blocked live trial failure recovery review cannot recover by triggering recovery, executing rollback, approving actions, launching workflows, executing live actions, storing outputs, mutating files, or mutating memory.",
    }),
  ];
}

export function buildLiveTrialFailureRecoveryReviewBoundary(): LiveTrialFailureRecoveryReviewBoundary {
  return {
    liveTrialFailureRecoveryReviewOnly: true,
    liveTrialFailureRecoveryReviewDoesNotTriggerRecoveryAutomatically: true,
    recoveryActionsRequireExplicitOperatorApproval: true,
    unsafeRecoveryShortcutsRemainBlocked: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    liveWorkflowLaunchAllowedFromUi: false,
    liveActionExecutionAllowedFromUi: false,
    recoveryAutoTriggerAllowedFromUi: false,
    rollbackExecutionAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    autoApprovalAllowedFromUi: false,
    actionsApprovedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerLiveConnectionTestsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    automationRulePersistenceAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    conditionalWatchCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
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

export function summarizeLiveTrialFailureRecoveryReview(
  model: Pick<LiveTrialFailureRecoveryReviewModel, "recoveryReviews">
): string {
  return `Live trial failure recovery review prepares ${model.recoveryReviews.length} recovery posture(s). Live trial failure recovery review does not trigger recovery automatically, recovery actions require explicit operator approval, and unsafe recovery shortcuts remain blocked.`;
}

export function buildLiveTrialFailureRecoveryReviewModel(): LiveTrialFailureRecoveryReviewModel {
  const recoveryReviews = buildLiveTrialFailureRecoveryReviews();
  const model: LiveTrialFailureRecoveryReviewModel = {
    title: "Live trial failure recovery review",
    summary: "",
    recoveryReviews,
    boundary: buildLiveTrialFailureRecoveryReviewBoundary(),
    recoveryLanguage: [...LIVE_TRIAL_FAILURE_RECOVERY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Live trial failure recovery review",
      "live trial failure recovery identity",
      "Failure categories",
      "Recovery action groups",
      "rollback checklist",
      "denied recovery shortcuts",
      "escalation checklist",
      "blocked recovery risks",
      "controlled live workflow route",
      "live trial runbook route",
      "next recommended action",
      "Live trial failure recovery review does not trigger recovery automatically",
      "Recovery actions require explicit operator approval",
      "Unsafe recovery shortcuts remain blocked",
      "advanced recovery details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLiveTrialFailureRecoveryReview(model) };
}
