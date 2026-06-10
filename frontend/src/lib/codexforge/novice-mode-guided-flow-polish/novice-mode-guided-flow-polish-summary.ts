import type {
  NoviceModeGuidedFlowPolish,
  NoviceModeGuidedFlowPolishBoundary,
  NoviceModeGuidedFlowPolishModel,
} from "./novice-mode-guided-flow-polish-types";
import { buildNoviceModeGuidedFlowPolishStableKey } from "./novice-mode-guided-flow-polish-types";

export const NOVICE_MODE_GUIDED_FLOW_POLISH_LANGUAGE = [
  "Novice mode guided flow polish",
  "Novice mode guides but does not approve or execute",
  "Approval checkpoints stay visible",
  "Blocked actions stay blocked until resolved",
  "Recommended first review sequence",
  "Plain-English safety hints",
] as const;

export function buildNoviceModeGuidedFlowPolish(
  input: Omit<NoviceModeGuidedFlowPolish, "id"> & { idHint: string }
): NoviceModeGuidedFlowPolish {
  const { idHint, ...flow } = input;
  return {
    id: buildNoviceModeGuidedFlowPolishStableKey("novice-mode-guided-flow-polish", idHint, input.status),
    ...flow,
  };
}

export function buildNoviceModeGuidedFlowPolishes(): NoviceModeGuidedFlowPolish[] {
  return [
    buildNoviceModeGuidedFlowPolish({
      idHint: "daily-first-review",
      status: "ready-for-review",
      noviceFlowIdentity:
        "Novice flow identity: novice-mode-guided-flow-polish-daily-first-review.",
      recommendedFirstReviewSequence: [
        "Recommended first review sequence: start at the daily operator home, read the global review inbox, check the approval queue only when explicit approval is requested, then review result history before retry.",
        "Recommended first review sequence: open the safety matrix before recovery or expert fast path when a boundary is unclear.",
      ],
      plainEnglishSafetyHints: [
        "Plain-English safety hints: review-only means this page explains the next step but does not do it for you.",
        "Plain-English safety hints: approval required means a human operator must explicitly approve before an execution-capable path can proceed.",
        "Plain-English safety hints: blocked means stop and resolve the named safety gap first.",
      ],
      approvalCheckpoints: [
        "Approval checkpoints: approval checkpoints stay visible for execution, provider, connector, local file, automation, recovery, rollback, and memory boundaries.",
        "Approval checkpoints: novice mode guides but does not approve or execute.",
      ],
      blockedActionExplanations: [
        "Blocked action explanations: blocked actions stay blocked until resolved.",
        "Blocked action explanations: automatic approval, workflow execution, provider calls, connector calls, file mutation, memory promotion, and recovery automation stay unavailable from this page.",
      ],
      recoveryHandoff:
        "Recovery handoff: /failure-recovery-playbook-finalization explains manual recovery guidance without running recovery automatically.",
      dailyHomeRoute:
        "Daily home route: /daily-operator-home remains the first plain-English daily cockpit route.",
      expertFastPathRoute:
        "Expert fast path route: /expert-mode-fast-path-review is available for experienced operators, but still requires explicit approval.",
      nextRecommendedAction:
        "Next recommended action: review daily home, then follow the first unresolved approval checkpoint rather than trying to execute from this page.",
      advancedNoviceFlowDetails:
        "Advanced novice flow details: novice mode guides but does not approve or execute, does not run workflows, does not run recovery, does not run rollback, does not call provider APIs, call connector APIs, call web/search APIs, call local bridge endpoints, launch local tools, send prompt/file/project/connector data without approval, scan arbitrary projects, browse files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildNoviceModeGuidedFlowPolish({
      idHint: "blocked-action-explainer",
      status: "blocked",
      noviceFlowIdentity:
        "Novice flow identity: novice-mode-guided-flow-polish-blocked-action-explainer.",
      recommendedFirstReviewSequence: [
        "Recommended first review sequence: keep the item blocked, read the blocked reason, then open the recovery playbook or approval queue only for review.",
      ],
      plainEnglishSafetyHints: [
        "Plain-English safety hints: a blocked action is not a failure to click the right control; it means the safety boundary is not resolved yet.",
      ],
      approvalCheckpoints: [
        "Approval checkpoints: missing approval keeps the item blocked.",
      ],
      blockedActionExplanations: [
        "Blocked action explanations: blocked actions stay blocked until resolved and no shortcut hides that state.",
      ],
      recoveryHandoff:
        "Recovery handoff: /failure-recovery-playbook-finalization reviews the next manual recovery step.",
      dailyHomeRoute:
        "Daily home route: /daily-operator-home keeps the operator oriented before retry.",
      expertFastPathRoute:
        "Expert fast path route: /expert-mode-fast-path-review cannot bypass blocked safety boundaries.",
      nextRecommendedAction:
        "Next recommended action: resolve the blocked reason in the review inbox or approval queue before continuing.",
      advancedNoviceFlowDetails:
        "Advanced novice flow details: blocked novice flow items cannot become approved, executed, recovered, retried, rolled back, written, exported, patched, deleted, scheduled, notified, ingested, or promoted from this page.",
    }),
  ];
}

export function buildNoviceModeGuidedFlowPolishBoundary(): NoviceModeGuidedFlowPolishBoundary {
  return {
    noviceModeReviewOnly: true,
    noviceModeGuidesButDoesNotApproveOrExecute: true,
    approvalCheckpointsStayVisible: true,
    blockedActionsStayBlockedUntilResolved: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
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

export function summarizeNoviceModeGuidedFlowPolish(
  model: Pick<NoviceModeGuidedFlowPolishModel, "flows">
): string {
  return `Novice mode guided flow polish prepares ${model.flows.length} novice flow posture(s). Novice mode guides but does not approve or execute, approval checkpoints stay visible, and blocked actions stay blocked until resolved.`;
}

export function buildNoviceModeGuidedFlowPolishModel(): NoviceModeGuidedFlowPolishModel {
  const flows = buildNoviceModeGuidedFlowPolishes();
  const model: NoviceModeGuidedFlowPolishModel = {
    title: "Novice mode guided flow polish",
    summary: "",
    flows,
    boundary: buildNoviceModeGuidedFlowPolishBoundary(),
    noviceLanguage: [...NOVICE_MODE_GUIDED_FLOW_POLISH_LANGUAGE],
    advancedDetails: [
      "Novice mode guided flow polish",
      "Novice flow identity",
      "Recommended first review sequence",
      "Plain-English safety hints",
      "Approval checkpoints",
      "Blocked action explanations",
      "Recovery handoff",
      "Daily home route",
      "Expert fast path route",
      "Next recommended action",
      "Novice mode guides but does not approve or execute",
      "Approval checkpoints stay visible",
      "Blocked actions stay blocked until resolved",
      "advanced novice flow details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeNoviceModeGuidedFlowPolish(model) };
}
