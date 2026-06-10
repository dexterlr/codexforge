import type {
  FirstRealOperatorWorkflowTrial,
  FirstRealOperatorWorkflowTrialBoundary,
  FirstRealOperatorWorkflowTrialModel,
} from "./first-real-operator-workflow-trial-types";
import { buildFirstRealOperatorWorkflowTrialStableKey } from "./first-real-operator-workflow-trial-types";

export const FIRST_REAL_OPERATOR_WORKFLOW_TRIAL_LANGUAGE = [
  "First real operator workflow trial",
  "First real workflow trial requires explicit approval",
  "No real action runs from this page",
  "Blocked actions remain blocked until approved",
  "Operator scenario",
  "Manual validation checklist",
] as const;

export function buildFirstRealOperatorWorkflowTrial(
  input: Omit<FirstRealOperatorWorkflowTrial, "id"> & { idHint: string }
): FirstRealOperatorWorkflowTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildFirstRealOperatorWorkflowTrialStableKey("first-real-operator-workflow-trial", idHint, input.status),
    ...trial,
  };
}

export function buildFirstRealOperatorWorkflowTrials(): FirstRealOperatorWorkflowTrial[] {
  return [
    buildFirstRealOperatorWorkflowTrial({
      idHint: "guided-real-operator-dry-prep",
      status: "ready-for-review",
      workflowTrialIdentity:
        "Workflow trial identity: first-real-operator-workflow-trial-guided-real-operator-dry-prep.",
      sourceReleaseRunbook:
        "Source release runbook: /foundation-release-runbook-finalization supplies the reviewed release checklist, validation checklist, rollback/recovery checklist, privacy/secrets checklist, operator handoff checklist, first real workflow route, and blocked reasons.",
      operatorScenario:
        "Operator scenario: a real operator prepares one narrow CodexForge foundation workflow using reviewed runbook steps, visible approval gates, manual validation notes, and a report handoff without starting the real action from this page.",
      trialPreparationChecklist: [
        "Trial preparation checklist: confirm the operator has reviewed the release runbook.",
        "Trial preparation checklist: confirm the scenario is narrow, reversible, and manually observable.",
        "Trial preparation checklist: confirm every real action has a separate explicit approval gate.",
        "Trial preparation checklist: confirm no provider, connector, web/search, command, file, memory, automation, plugin, tool, agent, or MCP action starts here.",
      ],
      approvalGates: [
        "Approval gates: explicit operator approval is required before any real workflow action.",
        "Approval gates: explicit provider/connector approval is required before any future API call.",
        "Approval gates: explicit local file and command approval is required before any future local action.",
        "Approval gates: explicit memory approval is required before any future memory ingestion or promotion.",
      ],
      blockedRealActions: [
        "Blocked real actions: workflow execution.",
        "Blocked real actions: provider API calls, connector API calls, and web/search API calls.",
        "Blocked real actions: commands, shell commands, git commands, build checks, smoke checks, and tests.",
        "Blocked real actions: file reads, file writes, file exports, patch apply behavior, file deletion, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, reminders, schedules, automations, notifications, polling loops, plugin execution, tool execution, agent execution, extension runtime executor, MCP runtime, and MCP tool calls.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: operator records what was reviewed, what was approved, and what remained blocked.",
        "Manual validation checklist: operator confirms no real action ran from this page.",
        "Manual validation checklist: operator routes the trial report to the review inbox after manual review.",
      ],
      realWorldTrialReportRoute:
        "Real-world trial report route: /review-inbox receives the reviewed trial report after the operator manually records the outcome.",
      blockedReasons: [
        "Blocked reason: first real workflow trial requires explicit approval.",
        "Blocked reason: no real action runs from this page.",
        "Blocked reason: blocked actions remain blocked until approved.",
      ],
      advancedWorkflowTrialDetails:
        "Advanced workflow trial details: first real operator workflow trial is review-only and does not execute workflows, run real actions, run builds, run smoke checks, run tests, run commands, run shell commands, run git commands, scan arbitrary local projects, browse local files, crawl paths, read files, open files, write files, export files, apply patches, delete files, call provider APIs, call connector APIs, call web/search APIs, send prompt/file/project/connector data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFirstRealOperatorWorkflowTrial({
      idHint: "blocked-unapproved-real-action",
      status: "blocked",
      workflowTrialIdentity:
        "Workflow trial identity: first-real-operator-workflow-trial-blocked-unapproved-real-action.",
      sourceReleaseRunbook:
        "Source release runbook: blocked until /foundation-release-runbook-finalization is reviewed before use.",
      operatorScenario:
        "Operator scenario: blocked if the requested real trial skips approval, tries to run a workflow, calls a provider, calls a connector, reads local files, runs commands, writes files, exports files, or promotes memory.",
      trialPreparationChecklist: [
        "Trial preparation checklist: blocked until scenario scope is narrow and approved.",
        "Trial preparation checklist: blocked until manual validation steps are present.",
      ],
      approvalGates: [
        "Approval gates: blocked because explicit approval is missing.",
      ],
      blockedRealActions: [
        "Blocked real actions: every real action remains blocked until approved.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: blocked until operator report fields are reviewed.",
      ],
      realWorldTrialReportRoute:
        "Real-world trial report route: /review-inbox remains the report handoff after manual review.",
      blockedReasons: [
        "Blocked reason: missing explicit approval.",
        "Blocked reason: real action requested from a review page.",
      ],
      advancedWorkflowTrialDetails:
        "Advanced workflow trial details: blocked workflow trial cannot recover by executing workflows, calling APIs, writing files, storing tokens, promoting memory, mutating Brain graph data, creating automations, sending notifications, or starting background work.",
    }),
  ];
}

export function buildFirstRealOperatorWorkflowTrialBoundary(): FirstRealOperatorWorkflowTrialBoundary {
  return {
    firstRealWorkflowTrialRequiresExplicitApproval: true,
    noRealActionRunsFromPage: true,
    blockedActionsRemainBlockedUntilApproved: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    releaseShippingExecutionAllowedFromUi: false,
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
    notificationSendingAllowedFromUi: false,
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
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeFirstRealOperatorWorkflowTrial(
  model: Pick<FirstRealOperatorWorkflowTrialModel, "trials">
): string {
  return `First real operator workflow trial prepares ${model.trials.length} guided real trial posture(s). First real workflow trial requires explicit approval, no real action runs from this page, and blocked actions remain blocked until approved.`;
}

export function buildFirstRealOperatorWorkflowTrialModel(): FirstRealOperatorWorkflowTrialModel {
  const trials = buildFirstRealOperatorWorkflowTrials();
  const model: FirstRealOperatorWorkflowTrialModel = {
    title: "First real operator workflow trial",
    summary: "",
    trials,
    boundary: buildFirstRealOperatorWorkflowTrialBoundary(),
    workflowTrialLanguage: [...FIRST_REAL_OPERATOR_WORKFLOW_TRIAL_LANGUAGE],
    advancedDetails: [
      "First real operator workflow trial",
      "First real workflow trial requires explicit approval",
      "No real action runs from this page",
      "Blocked actions remain blocked until approved",
      "Workflow trial identity",
      "Source release runbook",
      "Operator scenario",
      "Trial preparation checklist",
      "Approval gates",
      "Blocked real actions",
      "Manual validation checklist",
      "Real-world trial report route",
      "Blocked reasons",
      "advanced workflow trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstRealOperatorWorkflowTrial(model) };
}
