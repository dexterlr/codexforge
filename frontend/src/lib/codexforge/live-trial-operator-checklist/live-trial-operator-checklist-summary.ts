import type {
  LiveTrialOperatorChecklist,
  LiveTrialOperatorChecklistBoundary,
  LiveTrialOperatorChecklistModel,
} from "./live-trial-operator-checklist-types";
import { buildLiveTrialOperatorChecklistStableKey } from "./live-trial-operator-checklist-types";

export const LIVE_TRIAL_OPERATOR_CHECKLIST_LANGUAGE = [
  "Live trial operator checklist",
  "Live trial operator checklist does not approve actions",
  "Every go/no-go decision requires explicit operator approval",
  "Denied checklist shortcuts remain blocked",
  "Operator decision groups",
  "Go no-go checklist",
] as const;

export function buildLiveTrialOperatorChecklist(
  input: Omit<LiveTrialOperatorChecklist, "id"> & { idHint: string }
): LiveTrialOperatorChecklist {
  const { idHint, ...checklist } = input;
  return {
    id: buildLiveTrialOperatorChecklistStableKey("live-trial-operator-checklist", idHint, input.status),
    ...checklist,
  };
}

export function buildLiveTrialOperatorChecklists(): LiveTrialOperatorChecklist[] {
  return [
    buildLiveTrialOperatorChecklist({
      idHint: "review-only-go-no-go",
      status: "ready-for-review",
      liveTrialOperatorChecklistIdentity:
        "Live trial operator checklist identity: live-trial-operator-checklist-review-only-go-no-go.",
      operatorDecisionGroups: [
        "Operator decision groups: runbook owner, go/no-go owner, provider owner, local model owner, connector owner, automation owner, recovery owner, stop owner, and evidence owner.",
        "Operator decision groups: every group is a review checkpoint and live trial operator checklist does not approve actions.",
      ],
      goNoGoChecklist: [
        "Go no-go checklist: readiness reviewed, dry-run reviewed, approval flow reviewed, live integration release candidate reviewed, runbook reviewed, recovery reviewed, stop conditions named, and evidence requirements named.",
        "Go no-go checklist: every go/no-go decision requires explicit operator approval outside this page.",
      ],
      requiredEvidenceChecklist: [
        "Required evidence checklist: runbook version label, operator owner, approval gate list, stop-condition list, rollback notes, failure category list, denied action list, output handling plan, and manual review notes.",
        "Required evidence checklist: evidence is reviewed as text and is not ingested, stored, exported, or sent from this page.",
      ],
      deniedChecklistShortcuts: [
        "Denied checklist shortcuts: approve all, skip go/no-go, persist approval, launch live workflow, execute live action, call providers, call local models, call connectors, create automations, trigger recovery, store outputs, mutate files, or mutate memory.",
        "Denied checklist shortcuts: denied checklist shortcuts remain blocked even when every review item looks ready.",
      ],
      escalationChecklist: [
        "Escalation checklist: missing operator, unclear owner, unresolved provider risk, local endpoint risk, connector privacy risk, automation schedule risk, output storage risk, file mutation risk, memory promotion risk, stop-condition uncertainty, or recovery ambiguity.",
        "Escalation checklist: escalation stays manual and does not create notifications, background jobs, tasks, reminders, watches, schedules, or polling loops.",
      ],
      blockedChecklistRisks: [
        "Blocked checklist risks: automatic approval, approval decision persistence, hidden live traffic, local bridge calls, connector account connection, automation creation, recovery auto-trigger, output persistence, evidence ingestion, file mutation, memory mutation, and secret exposure.",
        "Blocked checklist risks: unresolved risks remain blocked until the operator explicitly resolves them outside this page.",
      ],
      failureRecoveryRoute:
        "Failure recovery route: /live-trial-failure-recovery-review prepares recovery paths without triggering recovery automatically.",
      controlledLiveWorkflowRoute:
        "Controlled live workflow route: /first-controlled-live-workflow-trial previews the controlled trial without executing live actions.",
      nextRecommendedAction:
        "Next recommended action: review failure recovery, then preview the first controlled live workflow trial only as a review-only plan.",
      advancedChecklistDetails:
        "Advanced checklist details: live trial operator checklist is review-only. Live trial operator checklist does not approve actions, every go/no-go decision requires explicit operator approval, and denied checklist shortcuts remain blocked. It does not execute actions, launch live workflows, execute live actions, approve actions, persist approvals, trigger recovery, call provider APIs, test provider connections, route provider traffic, send prompts, store provider outputs, call local models, call local bridge endpoints, call connector APIs, connect connector accounts, fetch connector data, store connector data, create automations, run automations, persist automation rules, create reminders, schedule tasks, create schedules, create conditional watches, create background jobs, start polling loops, send notifications, generate creative assets, run research, execute coding workflows, apply patches, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, store outputs, store automation data, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildLiveTrialOperatorChecklist({
      idHint: "blocked-auto-approval-shortcut",
      status: "blocked",
      liveTrialOperatorChecklistIdentity:
        "Live trial operator checklist identity: live-trial-operator-checklist-blocked-auto-approval-shortcut.",
      operatorDecisionGroups: [
        "Operator decision groups: blocked when a group implies approval automation or missing human ownership.",
      ],
      goNoGoChecklist: [
        "Go no-go checklist: blocked because every go/no-go decision requires explicit operator approval.",
      ],
      requiredEvidenceChecklist: [
        "Required evidence checklist: blocked until evidence is reviewed manually and no output storage or evidence ingestion is implied.",
      ],
      deniedChecklistShortcuts: [
        "Denied checklist shortcuts: approve all, launch workflow, execute action, trigger recovery, persist approval, and store output shortcuts remain blocked.",
      ],
      escalationChecklist: [
        "Escalation checklist: blocked until unclear ownership and stop-condition ambiguity are escalated manually.",
      ],
      blockedChecklistRisks: [
        "Blocked checklist risks: auto-approval, approval persistence, live action execution, recovery auto-trigger, provider calls, connector calls, automation creation, output storage, file mutation, and memory mutation.",
      ],
      failureRecoveryRoute:
        "Failure recovery route: /live-trial-failure-recovery-review remains review-only.",
      controlledLiveWorkflowRoute:
        "Controlled live workflow route: /first-controlled-live-workflow-trial remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep denied checklist shortcuts blocked and return to runbook and recovery review.",
      advancedChecklistDetails:
        "Advanced checklist details: blocked live trial operator checklist cannot recover by approving actions, persisting approval decisions, launching workflows, executing live actions, triggering recovery, storing outputs, mutating files, or mutating memory.",
    }),
  ];
}

export function buildLiveTrialOperatorChecklistBoundary(): LiveTrialOperatorChecklistBoundary {
  return {
    liveTrialOperatorChecklistReviewOnly: true,
    liveTrialOperatorChecklistDoesNotApproveActions: true,
    everyGoNoGoDecisionRequiresExplicitOperatorApproval: true,
    deniedChecklistShortcutsRemainBlocked: true,
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

export function summarizeLiveTrialOperatorChecklist(
  model: Pick<LiveTrialOperatorChecklistModel, "checklists">
): string {
  return `Live trial operator checklist prepares ${model.checklists.length} operator checklist posture(s). Live trial operator checklist does not approve actions, every go/no-go decision requires explicit operator approval, and denied checklist shortcuts remain blocked.`;
}

export function buildLiveTrialOperatorChecklistModel(): LiveTrialOperatorChecklistModel {
  const checklists = buildLiveTrialOperatorChecklists();
  const model: LiveTrialOperatorChecklistModel = {
    title: "Live trial operator checklist",
    summary: "",
    checklists,
    boundary: buildLiveTrialOperatorChecklistBoundary(),
    checklistLanguage: [...LIVE_TRIAL_OPERATOR_CHECKLIST_LANGUAGE],
    advancedDetails: [
      "Live trial operator checklist",
      "live trial operator checklist identity",
      "Operator decision groups",
      "Go no-go checklist",
      "required evidence checklist",
      "denied checklist shortcuts",
      "escalation checklist",
      "blocked checklist risks",
      "failure recovery route",
      "controlled live workflow route",
      "next recommended action",
      "Live trial operator checklist does not approve actions",
      "Every go/no-go decision requires explicit operator approval",
      "Denied checklist shortcuts remain blocked",
      "advanced checklist details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLiveTrialOperatorChecklist(model) };
}
