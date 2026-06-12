import type {
  FirstLiveTrialRunbookReview,
  FirstLiveTrialRunbookReviewBoundary,
  FirstLiveTrialRunbookReviewModel,
} from "./first-live-trial-runbook-review-types";
import { buildFirstLiveTrialRunbookReviewStableKey } from "./first-live-trial-runbook-review-types";

export const FIRST_LIVE_TRIAL_RUNBOOK_REVIEW_LANGUAGE = [
  "First live trial runbook review",
  "Live trial runbook review does not run workflows",
  "Live trial execution requires explicit operator approval",
  "Stop conditions remain operator-controlled",
  "Runbook sections",
  "Rollback and stop conditions",
] as const;

export function buildFirstLiveTrialRunbookReview(
  input: Omit<FirstLiveTrialRunbookReview, "id"> & { idHint: string }
): FirstLiveTrialRunbookReview {
  const { idHint, ...runbook } = input;
  return {
    id: buildFirstLiveTrialRunbookReviewStableKey("first-live-trial-runbook-review", idHint, input.status),
    ...runbook,
  };
}

export function buildFirstLiveTrialRunbookReviews(): FirstLiveTrialRunbookReview[] {
  return [
    buildFirstLiveTrialRunbookReview({
      idHint: "review-only-runbook",
      status: "ready-for-review",
      firstLiveTrialRunbookIdentity:
        "First live trial runbook identity: first-live-trial-runbook-review-review-only-runbook.",
      runbookSections: [
        "Runbook sections: scope, operator roles, preflight, approval gates, handoff review, evidence review, rollback, stop conditions, escalation, and post-trial notes.",
        "Runbook sections: every section is review-only and live trial runbook review does not run workflows.",
      ],
      preflightChecklist: [
        "Preflight checklist: readiness review complete, dry-run reviewed, approval flow reviewed, live integration release candidate reviewed, operator named, stop owner named, and recovery owner named.",
        "Preflight checklist: provider, local model, connector, automation, file, memory, and credential boundaries remain blocked until explicit approval elsewhere.",
      ],
      requiredApprovalGates: [
        "Required approval gates: operator go/no-go approval, provider approval, local model approval, connector approval, automation approval, output handling approval, recovery approval, and stop-condition approval.",
        "Required approval gates: live trial execution requires explicit operator approval and no approval is persisted from this page.",
      ],
      deniedRunbookActions: [
        "Denied runbook actions: run workflows, launch live workflows, execute live actions, call providers, call local models, call connectors, create automations, approve actions, persist approvals, store outputs, mutate files, or mutate memory.",
        "Denied runbook actions: prompt sending, provider output persistence, connector data fetch, scheduled tasks, reminders, conditional watches, background jobs, polling loops, notifications, research, code apply, tool execution, agent execution, and MCP runtime creation stay blocked.",
      ],
      rollbackAndStopConditions: [
        "Rollback and stop conditions: operator stop, approval missing, unexpected provider path, unexpected connector path, local bridge risk, automation risk, credential risk, output handling risk, file mutation risk, memory mutation risk, or unclear evidence.",
        "Rollback and stop conditions: stop conditions remain operator-controlled and recovery does not trigger automatically.",
      ],
      blockedRunbookRisks: [
        "Blocked runbook risks: automatic launch, auto-approval, hidden provider traffic, local endpoint calls, connector account connection, automation creation, output storage, evidence ingestion, file mutation, memory promotion, and route coverage removal.",
        "Blocked runbook risks: unresolved risks stay blocked until reviewed in the operator checklist and failure recovery review.",
      ],
      operatorChecklistRoute:
        "Operator checklist route: /live-trial-operator-checklist reviews go/no-go readiness without approving actions.",
      failureRecoveryRoute:
        "Failure recovery route: /live-trial-failure-recovery-review prepares recovery paths without triggering recovery automatically.",
      nextRecommendedAction:
        "Next recommended action: review the live trial operator checklist, then review failure recovery before any controlled live workflow trial is proposed for explicit operator approval.",
      advancedRunbookDetails:
        "Advanced runbook details: first live trial runbook review is review-only. Live trial runbook review does not run workflows, live trial execution requires explicit operator approval, and stop conditions remain operator-controlled. It does not execute actions, launch live workflows, execute live actions, approve actions, persist approvals, trigger recovery, call provider APIs, test provider connections, route provider traffic, send prompts, store provider outputs, call local models, call local bridge endpoints, call connector APIs, connect connector accounts, fetch connector data, store connector data, create automations, run automations, persist automation rules, create reminders, schedule tasks, create schedules, create conditional watches, create background jobs, start polling loops, send notifications, generate creative assets, run research, execute coding workflows, apply patches, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, store outputs, store automation data, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFirstLiveTrialRunbookReview({
      idHint: "blocked-launch-shortcut",
      status: "blocked",
      firstLiveTrialRunbookIdentity:
        "First live trial runbook identity: first-live-trial-runbook-review-blocked-launch-shortcut.",
      runbookSections: [
        "Runbook sections: blocked when any section implies live workflow launch, approval automation, provider calls, connector calls, automation creation, file mutation, output storage, or memory mutation.",
      ],
      preflightChecklist: [
        "Preflight checklist: blocked until operator, approval, stop, recovery, provider, local model, connector, automation, file, output, and memory boundaries are reviewed.",
      ],
      requiredApprovalGates: [
        "Required approval gates: blocked because live trial execution requires explicit operator approval outside this page.",
      ],
      deniedRunbookActions: [
        "Denied runbook actions: live workflow launch, live action execution, provider calls, local model calls, connector calls, automation creation, approval persistence, output storage, file mutation, and memory mutation remain blocked.",
      ],
      rollbackAndStopConditions: [
        "Rollback and stop conditions: blocked until stop conditions remain operator-controlled and recovery stays manual.",
      ],
      blockedRunbookRisks: [
        "Blocked runbook risks: launch shortcut, auto-approval, recovery auto-trigger, provider traffic, connector data fetch, automation scheduling, output persistence, and file or memory mutation.",
      ],
      operatorChecklistRoute:
        "Operator checklist route: /live-trial-operator-checklist remains review-only.",
      failureRecoveryRoute:
        "Failure recovery route: /live-trial-failure-recovery-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep launch shortcuts blocked and return to checklist and recovery review.",
      advancedRunbookDetails:
        "Advanced runbook details: blocked first live trial runbook cannot recover by launching workflows, executing live actions, approving actions, calling providers, calling local models, calling connectors, creating automations, storing outputs, mutating files, or mutating memory.",
    }),
  ];
}

export function buildFirstLiveTrialRunbookReviewBoundary(): FirstLiveTrialRunbookReviewBoundary {
  return {
    firstLiveTrialRunbookReviewOnly: true,
    liveTrialRunbookReviewDoesNotRunWorkflows: true,
    liveTrialExecutionRequiresExplicitOperatorApproval: true,
    stopConditionsRemainOperatorControlled: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    liveWorkflowLaunchAllowedFromUi: false,
    liveActionExecutionAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    autoApprovalAllowedFromUi: false,
    actionsApprovedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    recoveryAutoTriggerAllowedFromUi: false,
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

export function summarizeFirstLiveTrialRunbookReview(
  model: Pick<FirstLiveTrialRunbookReviewModel, "runbooks">
): string {
  return `First live trial runbook review prepares ${model.runbooks.length} runbook posture(s). Live trial runbook review does not run workflows, live trial execution requires explicit operator approval, and stop conditions remain operator-controlled.`;
}

export function buildFirstLiveTrialRunbookReviewModel(): FirstLiveTrialRunbookReviewModel {
  const runbooks = buildFirstLiveTrialRunbookReviews();
  const model: FirstLiveTrialRunbookReviewModel = {
    title: "First live trial runbook review",
    summary: "",
    runbooks,
    boundary: buildFirstLiveTrialRunbookReviewBoundary(),
    runbookLanguage: [...FIRST_LIVE_TRIAL_RUNBOOK_REVIEW_LANGUAGE],
    advancedDetails: [
      "First live trial runbook review",
      "first live trial runbook identity",
      "Runbook sections",
      "preflight checklist",
      "required approval gates",
      "denied runbook actions",
      "Rollback and stop conditions",
      "blocked runbook risks",
      "operator checklist route",
      "failure recovery route",
      "next recommended action",
      "Live trial runbook review does not run workflows",
      "Live trial execution requires explicit operator approval",
      "Stop conditions remain operator-controlled",
      "advanced runbook details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstLiveTrialRunbookReview(model) };
}
