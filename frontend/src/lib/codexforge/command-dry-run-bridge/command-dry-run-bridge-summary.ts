import type {
  CommandDryRun,
  CommandDryRunBoundary,
  CommandDryRunBridgeModel,
} from "./command-dry-run-bridge-types";
import { buildCommandDryRunBridgeStableKey } from "./command-dry-run-bridge-types";

export const COMMAND_DRY_RUN_BRIDGE_LANGUAGE = [
  "Command dry run bridge",
  "Dry run does not execute commands",
  "Env values and secrets are never displayed",
  "Shell execution requires explicit approval",
  "Expected effect summary",
  "Audit handoff",
] as const;

export function buildCommandDryRun(
  input: Omit<CommandDryRun, "id"> & { idHint: string }
): CommandDryRun {
  const { idHint, ...dryRun } = input;
  return {
    id: buildCommandDryRunBridgeStableKey(
      "command-dry-run-bridge",
      idHint,
      input.status
    ),
    ...dryRun,
  };
}

export function buildCommandDryRuns(): CommandDryRun[] {
  return [
    buildCommandDryRun({
      idHint: "reviewed-validation-command",
      dryRunIdentity:
        "Dry-run identity: command-dry-run-reviewed-validation-command, a model for a proposed command before execution is possible.",
      sourceCommandRequest:
        "Source command request: reviewed task, test planner, or operator request metadata only; command text is represented as review copy and not run.",
      workspaceTrustDependency:
        "Workspace trust dependency: /workspace-trust-policy must confirm the trusted workspace label and approved root before execution can be discussed.",
      commandApprovalDependency:
        "Command approval dependency: /local-command-approval must review command intent, working directory scope, approval copy, and denied scope first.",
      permissionEnforcementDependency:
        "Permission enforcement dependency: /jarvisd-runtime-enforcement must confirm matching command permission without granting permissions automatically.",
      commandIntent:
        "Command intent: validate a reviewed local change with a bounded command after the operator approves the command and local boundary.",
      workingDirectoryScope:
        "Working directory scope: approved canonical frontend workspace label only; no arbitrary directory is selected from this UI.",
      expectedEffectSummary:
        "Expected effect summary: the dry run predicts command intent, likely output category, timeout risk, and review handoff; dry run does not execute commands.",
      environmentSecretsSafetyNote:
        "Environment/secrets safety note: env values and secrets are never displayed, exported, included, or stored by this page.",
      auditHandoff:
        "Audit handoff: record dry-run identity, source request, workspace scope, permission dependency, expected effect summary, and blocked reasons for /jarvisd-audit-ingestion without mutating audit logs.",
      blockedReasons: [
        "Dry run does not execute commands",
        "Shell execution requires explicit approval",
        "Approved local boundary required",
      ],
      status: "review-required",
      advancedDryRunDetails:
        "Advanced dry-run details: this bridge does not run shell commands, call runCommand, call brokerExecution, call local executor APIs, call Jarvisd directly, browse files, mutate files, print environment values, or display secrets.",
    }),
    buildCommandDryRun({
      idHint: "unsafe-command-blocked",
      dryRunIdentity:
        "Dry-run identity: command-dry-run-unsafe-command-blocked.",
      sourceCommandRequest:
        "Source command request: blocked because the request depends on unreviewed scope, secret output, process control, or arbitrary local execution.",
      workspaceTrustDependency:
        "Workspace trust dependency: blocked until a trusted workspace label is reviewed and narrowed.",
      commandApprovalDependency:
        "Command approval dependency: blocked because explicit command approval copy is missing.",
      permissionEnforcementDependency:
        "Permission enforcement dependency: blocked because permission enforcement cannot validate broad local command scope.",
      commandIntent:
        "Command intent: unsafe or overbroad command request remains a warning, not an execution candidate.",
      workingDirectoryScope:
        "Working directory scope: none approved while the request is blocked.",
      expectedEffectSummary:
        "Expected effect summary: likely local mutation, secret exposure, or process impact cannot be accepted from this page.",
      environmentSecretsSafetyNote:
        "Environment/secrets safety note: env values and secrets are never displayed, even for blocked requests.",
      auditHandoff:
        "Audit handoff: blocked command context can be copied to audit review text, but the UI does not call appendEvent or mutate Jarvisd audit logs.",
      blockedReasons: [
        "Unreviewed command scope",
        "Secret or environment display risk",
        "No approved local boundary",
      ],
      status: "blocked",
      advancedDryRunDetails:
        "Advanced dry-run details: blocked command modeling cannot start daemons, execute shell commands, kill processes, restart processes, write files, delete files, apply patches, or call provider APIs.",
    }),
  ];
}

export function buildCommandDryRunBoundary(): CommandDryRunBoundary {
  return {
    dryRunDoesNotExecuteCommands: true,
    shellExecutionRequiresExplicitApproval: true,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    runCommandCallAllowedFromUi: false,
    brokerExecutionCallAllowedFromUi: false,
    localExecutorApiCallAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    processKillRestartShutdownAllowedFromUi: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsExportedAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeCommandDryRunBridge(
  model: Pick<CommandDryRunBridgeModel, "dryRuns">
): string {
  return `Command dry run bridge prepares ${model.dryRuns.length} reviewed command dry-run shape(s). Dry run does not execute commands, env values and secrets are never displayed, and shell execution requires explicit approval.`;
}

export function buildCommandDryRunBridgeModel(): CommandDryRunBridgeModel {
  const dryRuns = buildCommandDryRuns();
  const model: CommandDryRunBridgeModel = {
    title: "Command dry run bridge",
    summary: "",
    dryRuns,
    boundary: buildCommandDryRunBoundary(),
    dryRunLanguage: [...COMMAND_DRY_RUN_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Command dry run bridge",
      "Dry run does not execute commands",
      "Env values and secrets are never displayed",
      "Shell execution requires explicit approval",
      "Dry-run identity",
      "Source command request",
      "Workspace trust dependency",
      "Command approval dependency",
      "Permission enforcement dependency",
      "Command intent",
      "Working directory scope",
      "Expected effect summary",
      "Environment/secrets safety note",
      "Audit handoff",
      "Blocked reasons",
      "Approved local boundary required",
      "Advanced dry-run details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeCommandDryRunBridge(model) };
}
