import type {
  SafetyBoundaryMatrixFinalization,
  SafetyBoundaryMatrixFinalizationBoundary,
  SafetyBoundaryMatrixFinalizationModel,
} from "./safety-boundary-matrix-finalization-types";
import { buildSafetyBoundaryMatrixFinalizationStableKey } from "./safety-boundary-matrix-finalization-types";

export const SAFETY_BOUNDARY_MATRIX_FINALIZATION_LANGUAGE = [
  "Safety boundary matrix finalization",
  "Safety matrix does not execute anything",
  "Unresolved safety gaps stay blocked",
  "Approval gates remain required",
  "Covered boundary groups",
  "Memory boundaries",
] as const;

export function buildSafetyBoundaryMatrixFinalization(
  input: Omit<SafetyBoundaryMatrixFinalization, "id"> & { idHint: string }
): SafetyBoundaryMatrixFinalization {
  const { idHint, ...matrix } = input;
  return {
    id: buildSafetyBoundaryMatrixFinalizationStableKey(
      "safety-boundary-matrix-finalization",
      idHint,
      input.status
    ),
    ...matrix,
  };
}

export function buildSafetyBoundaryMatrixFinalizations(): SafetyBoundaryMatrixFinalization[] {
  return [
    buildSafetyBoundaryMatrixFinalization({
      idHint: "daily-cockpit-final-matrix",
      status: "ready-for-review",
      matrixIdentity:
        "Matrix identity: safety-boundary-matrix-finalization-daily-cockpit.",
      coveredBoundaryGroups: [
        "Covered boundary groups: execution, provider, connector, local file, automation, memory, approval, recovery, novice mode, and expert mode.",
        "Covered boundary groups: daily operator home, global review inbox, approval queue, result history, cross-loop safety audit inbox, guided recovery flow, novice first task, safety coach, assisted coding mode, and operator dashboard release candidate.",
      ],
      executionBoundaries: [
        "Execution boundaries: no action execution from UI, no workflow execution, no command execution, no shell command execution, no git command execution from UI, and no test/build/smoke execution from UI.",
        "Execution boundaries: approval gates remain required before any future execution-capable handoff.",
      ],
      providerBoundaries: [
        "Provider boundaries: no provider API calls, no web/search API calls, no prompt payload sent to providers, and no cloud provider API calls.",
        "Provider boundaries: prompt, file, project, and connector data is not sent without approval.",
      ],
      connectorBoundaries: [
        "Connector boundaries: no connector API calls, no connector sync, and no connector data sending without approval.",
        "Connector boundaries: private connector details remain review-only until an explicit operator decision exists.",
      ],
      localFileBoundaries: [
        "Local file boundaries: no arbitrary project scanning, no arbitrary local file browsing, no arbitrary path crawling, and no arbitrary file read/open from UI.",
        "Local file boundaries: no auto-open local files, no file mutation, no file write, no export/write behavior, no patch apply behavior, and no file deletion.",
      ],
      automationBoundaries: [
        "Automation boundaries: no reminder creation, no task scheduling, no automation creation, no background job creation, no notification sending, and no polling loops from UI.",
        "Automation boundaries: no workflow runs automatically and no recovery automation starts from this matrix.",
      ],
      memoryBoundaries: [
        "Memory boundaries: no memory/RAG ingestion, no memory auto-promotion, no Brain graph mutation, and no appendEvent/saveBrainGraph calls from UI.",
        "Memory boundaries: memory promotion remains an explicit review path and unresolved memory gaps stay blocked.",
      ],
      unresolvedGaps: [
        "Unresolved gaps: unresolved safety gaps stay blocked until the operator resolves the named boundary.",
        "Unresolved gaps: any gap involving execution, approval, provider, connector, local file, automation, or memory boundaries blocks the fast path.",
      ],
      recoveryPlaybookRoute:
        "Recovery playbook route: /failure-recovery-playbook-finalization reviews recovery guidance without running recovery automatically.",
      noviceModeRoute:
        "Novice mode route: /novice-mode-guided-flow-polish guides daily review while keeping approval checkpoints visible.",
      expertModeRoute:
        "Expert mode route: /expert-mode-fast-path-review reviews expert shortcuts while preserving explicit approval gates.",
      advancedMatrixDetails:
        "Advanced matrix details: the safety matrix does not execute anything, approve anything automatically, run workflows, run recovery, run rollback, call provider APIs, call connector APIs, call web/search APIs, call local bridge endpoints, launch local tools, send prompt/file/project/connector data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildSafetyBoundaryMatrixFinalization({
      idHint: "blocked-gap-handoff",
      status: "blocked",
      matrixIdentity:
        "Matrix identity: safety-boundary-matrix-finalization-blocked-gap-handoff.",
      coveredBoundaryGroups: [
        "Covered boundary groups: blocked execution, provider, connector, local file, automation, and memory gaps stay visible.",
      ],
      executionBoundaries: [
        "Execution boundaries: blocked execution gaps cannot be bypassed by novice mode or expert fast path.",
      ],
      providerBoundaries: [
        "Provider boundaries: blocked provider gaps prevent provider traffic until reviewed approval exists.",
      ],
      connectorBoundaries: [
        "Connector boundaries: blocked connector gaps prevent connector reads, writes, sync, or evidence capture from this page.",
      ],
      localFileBoundaries: [
        "Local file boundaries: blocked file gaps prevent local browsing, file reading, file writing, patching, exporting, or deletion from this page.",
      ],
      automationBoundaries: [
        "Automation boundaries: blocked automation gaps prevent reminders, schedules, notifications, background jobs, and polling loops from this page.",
      ],
      memoryBoundaries: [
        "Memory boundaries: blocked memory gaps prevent ingestion, auto-promotion, Brain graph mutation, appendEvent, and saveBrainGraph from this page.",
      ],
      unresolvedGaps: [
        "Unresolved gaps: unresolved safety gaps stay blocked.",
        "Unresolved gaps: approval gates remain required before retry, recovery, or fast path review.",
      ],
      recoveryPlaybookRoute:
        "Recovery playbook route: /failure-recovery-playbook-finalization explains manual recovery review.",
      noviceModeRoute:
        "Novice mode route: /novice-mode-guided-flow-polish explains blocked actions in plain English.",
      expertModeRoute:
        "Expert mode route: /expert-mode-fast-path-review cannot bypass blocked safety boundaries.",
      advancedMatrixDetails:
        "Advanced matrix details: blocked matrix items remain review-only and cannot trigger execution, recovery automation, rollback execution, approvals, provider calls, connector calls, local file access, automations, memory mutation, plugin execution, tool execution, agent execution, MCP runtime creation, token storage, secret display, or package install behavior.",
    }),
  ];
}

export function buildSafetyBoundaryMatrixFinalizationBoundary(): SafetyBoundaryMatrixFinalizationBoundary {
  return {
    safetyMatrixReviewOnly: true,
    safetyMatrixDoesNotExecuteAnything: true,
    unresolvedSafetyGapsStayBlocked: true,
    approvalGatesRemainRequired: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    approvalAutomationAllowedFromUi: false,
    recoveryAutomationAllowedFromUi: false,
    rollbackExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchAllowedFromUi: false,
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

export function summarizeSafetyBoundaryMatrixFinalization(
  model: Pick<SafetyBoundaryMatrixFinalizationModel, "matrices">
): string {
  return `Safety boundary matrix finalization prepares ${model.matrices.length} safety matrix posture(s). Safety matrix does not execute anything, unresolved safety gaps stay blocked, and approval gates remain required.`;
}

export function buildSafetyBoundaryMatrixFinalizationModel(): SafetyBoundaryMatrixFinalizationModel {
  const matrices = buildSafetyBoundaryMatrixFinalizations();
  const model: SafetyBoundaryMatrixFinalizationModel = {
    title: "Safety boundary matrix finalization",
    summary: "",
    matrices,
    boundary: buildSafetyBoundaryMatrixFinalizationBoundary(),
    matrixLanguage: [...SAFETY_BOUNDARY_MATRIX_FINALIZATION_LANGUAGE],
    advancedDetails: [
      "Safety boundary matrix finalization",
      "Matrix identity",
      "Covered boundary groups",
      "Execution boundaries",
      "Provider boundaries",
      "Connector boundaries",
      "Local file boundaries",
      "Automation boundaries",
      "Memory boundaries",
      "Unresolved gaps",
      "Recovery playbook route",
      "Expert/novice mode routes",
      "Safety matrix does not execute anything",
      "Unresolved safety gaps stay blocked",
      "Approval gates remain required",
      "advanced matrix details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeSafetyBoundaryMatrixFinalization(model) };
}
