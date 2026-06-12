import type {
  FirstControlledLiveWorkflowTrial,
  FirstControlledLiveWorkflowTrialBoundary,
  FirstControlledLiveWorkflowTrialModel,
} from "./first-controlled-live-workflow-trial-types";
import { buildFirstControlledLiveWorkflowTrialStableKey } from "./first-controlled-live-workflow-trial-types";

export const FIRST_CONTROLLED_LIVE_WORKFLOW_TRIAL_LANGUAGE = [
  "First controlled live workflow trial",
  "First controlled live workflow trial does not execute live actions",
  "Controlled live actions require explicit operator approval",
  "Denied live action paths remain blocked",
  "Controlled workflow stages",
  "Validation evidence checklist",
] as const;

export function buildFirstControlledLiveWorkflowTrial(
  input: Omit<FirstControlledLiveWorkflowTrial, "id"> & { idHint: string }
): FirstControlledLiveWorkflowTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildFirstControlledLiveWorkflowTrialStableKey("first-controlled-live-workflow-trial", idHint, input.status),
    ...trial,
  };
}

export function buildFirstControlledLiveWorkflowTrials(): FirstControlledLiveWorkflowTrial[] {
  return [
    buildFirstControlledLiveWorkflowTrial({
      idHint: "review-only-controlled-trial-preview",
      status: "ready-for-review",
      firstControlledLiveWorkflowTrialIdentity:
        "First controlled live workflow trial identity: first-controlled-live-workflow-trial-review-only-controlled-trial-preview.",
      controlledWorkflowStages: [
        "Controlled workflow stages: review runbook, review operator checklist, review failure recovery, preview handoffs, review approval gates, review evidence checklist, confirm denied paths, and stop before execution.",
        "Controlled workflow stages: first controlled live workflow trial does not execute live actions.",
      ],
      providerLocalConnectorAutomationHandoffPreview: [
        "Provider/local/connector/automation handoff preview: provider handoff is only a label and does not call provider APIs, test provider connections, route provider traffic, send prompts, or store outputs.",
        "Provider/local/connector/automation handoff preview: local model handoff is only a label and does not call local models, local bridge endpoints, local tools, or local endpoints.",
        "Provider/local/connector/automation handoff preview: connector handoff is only a label and does not connect accounts, call connector APIs, fetch connector data, store connector data, or ingest evidence.",
        "Provider/local/connector/automation handoff preview: automation handoff is only a label and does not create automations, run workflows, persist rules, create reminders, schedule tasks, create watches, start polling loops, create background jobs, or send notifications.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: controlled live actions require explicit operator approval for every provider, local model, connector, automation, output handling, evidence handling, recovery, stop, file, and memory boundary.",
        "Approval gate checklist: approval is previewed here but not granted, automated, or persisted.",
      ],
      validationEvidenceChecklist: [
        "Validation evidence checklist: runbook reviewed, checklist reviewed, recovery reviewed, approval gates named, stop conditions named, denied paths named, output handling reviewed, evidence handling reviewed, and next operator action named.",
        "Validation evidence checklist: evidence is reviewed as copy and is not stored, exported, ingested, sent, or used to launch the trial from this page.",
      ],
      deniedLiveActionPaths: [
        "Denied live action paths: execute workflow, launch live workflow, execute live action, call providers, call local models, call local bridge endpoints, call connectors, create automations, approve actions, persist approvals, trigger recovery, store outputs, mutate files, or mutate memory.",
        "Denied live action paths: denied live action paths remain blocked until explicit operator approval exists outside this page.",
      ],
      blockedLiveTrialRisks: [
        "Blocked live trial risks: hidden traffic, missing approval, approval persistence, output storage, provider credential risk, local endpoint risk, connector privacy risk, automation schedule risk, recovery auto-trigger, file mutation, memory promotion, secret display, and route coverage removal.",
        "Blocked live trial risks: unresolved risks keep the first controlled live workflow trial review-only.",
      ],
      liveTrialRunbookRoute:
        "Live trial runbook route: /first-live-trial-runbook-review reviews runbook sections and stop conditions without running workflows.",
      failureRecoveryRoute:
        "Failure recovery route: /live-trial-failure-recovery-review prepares recovery paths without triggering recovery automatically.",
      nextRecommendedAction:
        "Next recommended action: keep this as a preview, resolve any blocked risk, and require explicit operator approval before any future live action outside this page.",
      advancedLiveTrialDetails:
        "Advanced live trial details: first controlled live workflow trial is review-only. First controlled live workflow trial does not execute live actions, controlled live actions require explicit operator approval, and denied live action paths remain blocked. It does not execute actions, launch live workflows, execute live actions, approve actions, persist approvals, trigger recovery, call provider APIs, test provider connections, route provider traffic, send prompts, store provider outputs, call local models, call local bridge endpoints, call connector APIs, connect connector accounts, fetch connector data, store connector data, create automations, run automations, persist automation rules, create reminders, schedule tasks, create schedules, create conditional watches, create background jobs, start polling loops, send notifications, generate creative assets, run research, execute coding workflows, apply patches, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, store outputs, store automation data, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFirstControlledLiveWorkflowTrial({
      idHint: "blocked-live-action-request",
      status: "blocked",
      firstControlledLiveWorkflowTrialIdentity:
        "First controlled live workflow trial identity: first-controlled-live-workflow-trial-blocked-live-action-request.",
      controlledWorkflowStages: [
        "Controlled workflow stages: blocked when any stage implies workflow execution, live workflow launch, live action execution, or live traffic routing.",
      ],
      providerLocalConnectorAutomationHandoffPreview: [
        "Provider/local/connector/automation handoff preview: blocked when a handoff implies provider calls, local model calls, connector calls, automation creation, output storage, file mutation, or memory mutation.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: blocked because controlled live actions require explicit operator approval outside this page.",
      ],
      validationEvidenceChecklist: [
        "Validation evidence checklist: blocked because evidence cannot be generated, stored, sent, exported, or ingested here.",
      ],
      deniedLiveActionPaths: [
        "Denied live action paths: workflow execution, live action execution, provider calls, local model calls, connector calls, automation creation, approval persistence, output storage, file mutation, and memory mutation remain blocked.",
      ],
      blockedLiveTrialRisks: [
        "Blocked live trial risks: live launch shortcut, auto-approval, recovery auto-trigger, output persistence, file mutation, and memory mutation.",
      ],
      liveTrialRunbookRoute:
        "Live trial runbook route: /first-live-trial-runbook-review remains review-only.",
      failureRecoveryRoute:
        "Failure recovery route: /live-trial-failure-recovery-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep denied live action paths blocked and return to runbook, checklist, and recovery review.",
      advancedLiveTrialDetails:
        "Advanced live trial details: blocked first controlled live workflow trial cannot recover by executing workflows, executing live actions, calling providers, calling local models, calling connectors, creating automations, storing outputs, mutating files, or mutating memory.",
    }),
  ];
}

export function buildFirstControlledLiveWorkflowTrialBoundary(): FirstControlledLiveWorkflowTrialBoundary {
  return {
    firstControlledLiveWorkflowTrialReviewOnly: true,
    firstControlledLiveWorkflowTrialDoesNotExecuteLiveActions: true,
    controlledLiveActionsRequireExplicitOperatorApproval: true,
    deniedLiveActionPathsRemainBlocked: true,
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

export function summarizeFirstControlledLiveWorkflowTrial(
  model: Pick<FirstControlledLiveWorkflowTrialModel, "trials">
): string {
  return `First controlled live workflow trial prepares ${model.trials.length} controlled trial preview(s). First controlled live workflow trial does not execute live actions, controlled live actions require explicit operator approval, and denied live action paths remain blocked.`;
}

export function buildFirstControlledLiveWorkflowTrialModel(): FirstControlledLiveWorkflowTrialModel {
  const trials = buildFirstControlledLiveWorkflowTrials();
  const model: FirstControlledLiveWorkflowTrialModel = {
    title: "First controlled live workflow trial",
    summary: "",
    trials,
    boundary: buildFirstControlledLiveWorkflowTrialBoundary(),
    trialLanguage: [...FIRST_CONTROLLED_LIVE_WORKFLOW_TRIAL_LANGUAGE],
    advancedDetails: [
      "First controlled live workflow trial",
      "first controlled live workflow trial identity",
      "Controlled workflow stages",
      "provider/local/connector/automation handoff preview",
      "approval gate checklist",
      "Validation evidence checklist",
      "denied live action paths",
      "blocked live trial risks",
      "live trial runbook route",
      "failure recovery route",
      "next recommended action",
      "First controlled live workflow trial does not execute live actions",
      "Controlled live actions require explicit operator approval",
      "Denied live action paths remain blocked",
      "advanced live trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstControlledLiveWorkflowTrial(model) };
}
