import type {
  FailureRecoveryPlaybookFinalization,
  FailureRecoveryPlaybookFinalizationBoundary,
  FailureRecoveryPlaybookFinalizationModel,
} from "./failure-recovery-playbook-finalization-types";
import { buildFailureRecoveryPlaybookFinalizationStableKey } from "./failure-recovery-playbook-finalization-types";

export const FAILURE_RECOVERY_PLAYBOOK_FINALIZATION_LANGUAGE = [
  "Failure recovery playbook finalization",
  "Recovery playbook does not run recovery automatically",
  "Recovery steps require operator approval",
  "Validation evidence is reviewed before retry",
  "Common failure categories",
  "Rollback guidance",
] as const;

export function buildFailureRecoveryPlaybookFinalization(
  input: Omit<FailureRecoveryPlaybookFinalization, "id"> & { idHint: string }
): FailureRecoveryPlaybookFinalization {
  const { idHint, ...playbook } = input;
  return {
    id: buildFailureRecoveryPlaybookFinalizationStableKey(
      "failure-recovery-playbook-finalization",
      idHint,
      input.status
    ),
    ...playbook,
  };
}

export function buildFailureRecoveryPlaybookFinalizations(): FailureRecoveryPlaybookFinalization[] {
  return [
    buildFailureRecoveryPlaybookFinalization({
      idHint: "manual-retry-review",
      status: "ready-for-review",
      recoveryPlaybookIdentity:
        "Recovery playbook identity: failure-recovery-playbook-finalization-manual-retry-review.",
      sourceSafetyMatrix:
        "Source safety matrix: /safety-boundary-matrix-finalization confirms execution, provider, connector, local file, automation, and memory boundaries before recovery guidance is used.",
      commonFailureCategories: [
        "Common failure categories: validation evidence missing, approval packet incomplete, provider boundary unclear, connector boundary unclear, local file boundary unclear, memory boundary unclear, and route handoff mismatch.",
        "Common failure categories: failed build or smoke evidence is reviewed as operator-provided evidence; this page does not run tests, builds, or smoke checks.",
      ],
      recommendedManualRecoverySteps: [
        "Recommended manual recovery steps: pause the failed route, identify the blocked boundary, review the approval queue, collect validation evidence, then decide whether a manual retry is still safe.",
        "Recommended manual recovery steps: use the novice route when the operator needs plain-English guidance, or use the expert route when the same gates are already understood.",
      ],
      validationEvidenceRequired: [
        "Validation evidence required: exact route reviewed, failure category, approval status, validation output supplied by the operator, rollback posture, and unresolved blocked reasons.",
        "Validation evidence required: validation evidence is reviewed before retry and never generated automatically by this page.",
      ],
      rollbackGuidance: [
        "Rollback guidance: rollback guidance is reviewed before retry, but rollback execution is not available from this page.",
        "Rollback guidance: file rollback, patch reversal, commit changes, shell commands, and local bridge calls remain outside this review surface.",
      ],
      escalationGuidance: [
        "Escalation guidance: escalate when safety matrix gaps remain unresolved, approval evidence is missing, private data exposure is unclear, or memory promotion was requested without review.",
        "Escalation guidance: unresolved blocked reasons stay blocked until the operator resolves the specific boundary.",
      ],
      noviceModeRoute:
        "Novice mode route: /novice-mode-guided-flow-polish explains the next safe review step without approving or executing it.",
      expertFastPathRoute:
        "Expert fast path route: /expert-mode-fast-path-review summarizes fast review shortcuts while preserving explicit approval.",
      blockedReasons: [
        "Blocked reasons: recovery steps require operator approval.",
        "Blocked reasons: recovery playbook does not run recovery automatically.",
        "Blocked reasons: validation evidence is reviewed before retry.",
      ],
      advancedRecoveryDetails:
        "Advanced recovery details: the failure recovery playbook does not run recovery automatically, run rollback, apply patches, mutate files, write files, delete files, run commands, run shell commands, run git commands, run tests, run builds, run smoke checks, call provider APIs, call connector APIs, call web/search APIs, call local bridge endpoints, launch local tools, send prompt/file/project/connector data without approval, scan arbitrary projects, browse files, crawl paths, read files, open files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFailureRecoveryPlaybookFinalization({
      idHint: "blocked-retry-evidence-gap",
      status: "blocked",
      recoveryPlaybookIdentity:
        "Recovery playbook identity: failure-recovery-playbook-finalization-blocked-retry-evidence-gap.",
      sourceSafetyMatrix:
        "Source safety matrix: /safety-boundary-matrix-finalization blocks retry when validation evidence, approval status, or boundary ownership is missing.",
      commonFailureCategories: [
        "Common failure categories: missing validation evidence, missing rollback posture, missing approval owner, or unresolved safety matrix gap.",
      ],
      recommendedManualRecoverySteps: [
        "Recommended manual recovery steps: keep retry blocked, review the missing evidence, and return to the approval queue before retry is considered.",
      ],
      validationEvidenceRequired: [
        "Validation evidence required: missing evidence must be supplied and reviewed before retry.",
      ],
      rollbackGuidance: [
        "Rollback guidance: rollback remains guidance only and does not execute from this page.",
      ],
      escalationGuidance: [
        "Escalation guidance: escalate to the global review inbox when blocked reasons span more than one loop.",
      ],
      noviceModeRoute:
        "Novice mode route: /novice-mode-guided-flow-polish shows blocked action explanations.",
      expertFastPathRoute:
        "Expert fast path route: /expert-mode-fast-path-review cannot bypass missing validation evidence.",
      blockedReasons: [
        "Blocked reasons: validation evidence is missing.",
        "Blocked reasons: operator approval is missing.",
        "Blocked reasons: unresolved safety gaps stay blocked.",
      ],
      advancedRecoveryDetails:
        "Advanced recovery details: blocked retry does not recover by running commands, applying patches, rolling back files, calling APIs, mutating memory, creating automations, or starting background jobs.",
    }),
  ];
}

export function buildFailureRecoveryPlaybookFinalizationBoundary(): FailureRecoveryPlaybookFinalizationBoundary {
  return {
    recoveryPlaybookReviewOnly: true,
    recoveryPlaybookDoesNotRunRecoveryAutomatically: true,
    recoveryStepsRequireOperatorApproval: true,
    validationEvidenceReviewedBeforeRetry: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    approvalAutomationAllowedFromUi: false,
    recoveryAutomationAllowedFromUi: false,
    rollbackExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
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

export function summarizeFailureRecoveryPlaybookFinalization(
  model: Pick<FailureRecoveryPlaybookFinalizationModel, "playbooks">
): string {
  return `Failure recovery playbook finalization prepares ${model.playbooks.length} recovery playbook posture(s). Recovery playbook does not run recovery automatically, recovery steps require operator approval, and validation evidence is reviewed before retry.`;
}

export function buildFailureRecoveryPlaybookFinalizationModel(): FailureRecoveryPlaybookFinalizationModel {
  const playbooks = buildFailureRecoveryPlaybookFinalizations();
  const model: FailureRecoveryPlaybookFinalizationModel = {
    title: "Failure recovery playbook finalization",
    summary: "",
    playbooks,
    boundary: buildFailureRecoveryPlaybookFinalizationBoundary(),
    recoveryLanguage: [...FAILURE_RECOVERY_PLAYBOOK_FINALIZATION_LANGUAGE],
    advancedDetails: [
      "Failure recovery playbook finalization",
      "Recovery playbook identity",
      "Source safety matrix",
      "Common failure categories",
      "Recommended manual recovery steps",
      "Validation evidence required",
      "Rollback guidance",
      "Escalation guidance",
      "Novice mode route",
      "Expert fast path route",
      "Blocked reasons",
      "Recovery playbook does not run recovery automatically",
      "Recovery steps require operator approval",
      "Validation evidence is reviewed before retry",
      "advanced recovery details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFailureRecoveryPlaybookFinalization(model) };
}
