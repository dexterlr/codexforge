import type {
  CommandExecutionTrial,
  CommandExecutionTrialBoundary,
  CommandExecutionTrialGateModel,
} from "./command-execution-trial-gate-types";
import { buildCommandExecutionTrialGateStableKey } from "./command-execution-trial-gate-types";

export const COMMAND_EXECUTION_TRIAL_GATE_LANGUAGE = [
  "Command execution trial gate",
  "Commands are not executed from this page",
  "Approved local boundary is required before execution",
  "Env values and secrets are not exposed",
  "Timeout policy",
  "Required confirmation copy",
] as const;

export function buildCommandExecutionTrial(
  input: Omit<CommandExecutionTrial, "id"> & { idHint: string }
): CommandExecutionTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildCommandExecutionTrialGateStableKey(
      "command-execution-trial-gate",
      idHint,
      input.status,
      input.workspaceTrustStatus
    ),
    ...trial,
  };
}

export function buildCommandExecutionTrials(): CommandExecutionTrial[] {
  return [
    buildCommandExecutionTrial({
      idHint: "reviewed-local-command-trial",
      executionTrialIdentity:
        "Execution trial identity: command-execution-trial-reviewed-local-command, a review packet for one future approved local command execution request.",
      dryRunDependency:
        "Dry-run dependency: /command-dry-run must confirm command intent, working directory scope, expected effect summary, env/secrets safety note, and blocked reasons first.",
      commandApprovalBoundaryDependency:
        "Command approval boundary dependency: /local-command-approval must supply explicit approval copy and denied scope before execution can be considered.",
      workspaceTrustStatus: "review-required",
      allowedCommandScope:
        "Allowed command scope: one reviewed command summary, one approved working directory label, one bounded timeout, and one expected output shape.",
      deniedCommandScope:
        "Denied command scope: arbitrary shell commands, unreviewed working directories, secret printing, file mutation, patch apply, process control, provider sends, and direct Jarvisd calls from UI.",
      timeoutPolicy:
        "Timeout policy: future approved local boundary must use a bounded timeout and capture timed-out status instead of hanging the UI.",
      expectedOutputShape:
        "Expected output shape: status, command summary, output summary, redaction status, affected files indicator, and blocked reasons; raw output stays secondary later.",
      requiredConfirmationCopy:
        "Required confirmation copy: I approve this reviewed command, working directory scope, timeout policy, expected output shape, denied scope, and approved local boundary for one future local execution request.",
      blockedReasons: [
        "Commands are not executed from this page",
        "Approved local boundary is required before execution",
        "Env values and secrets are not exposed",
      ],
      status: "review-required",
      advancedTrialDetails:
        "Advanced trial details: this page does not execute commands, run shell commands, call runCommand, call brokerExecution, call local executor APIs, call Jarvisd directly, mutate files, or expose secrets.",
    }),
    buildCommandExecutionTrial({
      idHint: "missing-boundary-blocked",
      executionTrialIdentity:
        "Execution trial identity: command-execution-trial-missing-boundary-blocked.",
      dryRunDependency:
        "Dry-run dependency: blocked until a reviewed command dry run exists.",
      commandApprovalBoundaryDependency:
        "Command approval boundary dependency: blocked because explicit local command approval is missing.",
      workspaceTrustStatus: "blocked",
      allowedCommandScope:
        "Allowed command scope: no command scope is allowed while workspace trust and approval boundary are missing.",
      deniedCommandScope:
        "Denied command scope: command execution, shell execution, file mutation, test execution, process kill or restart, direct daemon calls, and provider API calls.",
      timeoutPolicy:
        "Timeout policy: unavailable while the execution request is blocked.",
      expectedOutputShape:
        "Expected output shape: none accepted while no approved local boundary exists.",
      requiredConfirmationCopy:
        "Required confirmation copy: not approved; return to dry run, command approval, and workspace trust review.",
      blockedReasons: [
        "Reviewed command dry run missing",
        "Command approval boundary missing",
        "Workspace trust missing",
      ],
      status: "blocked",
      advancedTrialDetails:
        "Advanced trial details: blocked trials stay review-only and cannot trigger command execution, local daemon capabilities, file writes, process control, or hidden retries.",
    }),
  ];
}

export function buildCommandExecutionTrialBoundary(): CommandExecutionTrialBoundary {
  return {
    commandsExecutedFromPageAllowed: false,
    approvedLocalBoundaryRequiredBeforeExecution: true,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    shellExecutionWithoutApprovalAllowed: false,
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

export function summarizeCommandExecutionTrialGate(
  model: Pick<CommandExecutionTrialGateModel, "trials">
): string {
  return `Command execution trial gate prepares ${model.trials.length} reviewed execution trial shape(s). Commands are not executed from this page, approved local boundary is required before execution, and env values and secrets are not exposed.`;
}

export function buildCommandExecutionTrialGateModel(): CommandExecutionTrialGateModel {
  const trials = buildCommandExecutionTrials();
  const model: CommandExecutionTrialGateModel = {
    title: "Command execution trial gate",
    summary: "",
    trials,
    boundary: buildCommandExecutionTrialBoundary(),
    trialLanguage: [...COMMAND_EXECUTION_TRIAL_GATE_LANGUAGE],
    advancedDetails: [
      "Command execution trial gate",
      "Commands are not executed from this page",
      "Approved local boundary is required before execution",
      "Env values and secrets are not exposed",
      "Execution trial identity",
      "Dry-run dependency",
      "Command approval boundary dependency",
      "Workspace trust status",
      "Allowed command scope",
      "Denied command scope",
      "Timeout policy",
      "Expected output shape",
      "Required confirmation copy",
      "Blocked reasons",
      "Advanced trial details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeCommandExecutionTrialGate(model) };
}
