import type {
  LocalCommandExecutionApproval,
  LocalCommandExecutionApprovalBoundary,
  LocalCommandExecutionApprovalGateModel,
} from "./local-command-execution-approval-gate-types";
import { buildLocalCommandExecutionApprovalGateStableKey } from "./local-command-execution-approval-gate-types";

export const LOCAL_COMMAND_EXECUTION_APPROVAL_GATE_LANGUAGE = [
  "Local command execution approval gate",
  "Commands are not executed from this page",
  "Shell execution requires explicit approval",
  "Env values and secrets are never displayed",
  "Working directory scope",
  "Approval copy",
] as const;

export function buildLocalCommandExecutionApproval(
  input: Omit<LocalCommandExecutionApproval, "id"> & { idHint: string }
): LocalCommandExecutionApproval {
  const { idHint, ...command } = input;
  return {
    id: buildLocalCommandExecutionApprovalGateStableKey(
      "local-command-execution-approval-gate",
      idHint,
      input.status
    ),
    ...command,
  };
}

export function buildLocalCommandExecutionApprovals(): LocalCommandExecutionApproval[] {
  return [
    buildLocalCommandExecutionApproval({
      idHint: "manual-validation-preview",
      commandIdentity:
        "Command identity: reviewed local validation command proposal for an approved workspace.",
      commandIntent:
        "Command intent: validate a user-approved workspace task after file and trust boundaries are reviewed.",
      commandPreviewText:
        "Command preview text: reviewed command text would be shown as plain text only; commands are not executed from this page.",
      workingDirectoryScope:
        "Working directory scope: approved workspace root label only, never an arbitrary directory selected from the UI.",
      allowedScope:
        "Allowed scope: review command intent, working directory scope, risk level, approval copy, audit note, and blocked reasons.",
      deniedScope:
        "Denied scope: shell execution without approval, environment value display, secret display, arbitrary local browsing, file mutation, provider calls, and background local executor calls.",
      riskLevel: "high",
      environmentSecretsSafetyNote:
        "Env values and secrets are never displayed. The review copy names the safety rule, not the secret value.",
      approvalCopy:
        "Approval copy: I approve shell execution only after explicit review of the command, workspace, denied scope, and audit note; this page does not execute it.",
      auditNote:
        "Audit note: record command identity, command intent, preview text, working directory scope, approval state, and blocked reasons without environment values or secrets.",
      blockedReasons: [
        "Shell execution requires explicit approval",
        "Commands are not executed from this page",
        "Approved local boundary required",
      ],
      status: "review-required",
      advancedCommandDetails:
        "Advanced command details: this surface does not call runCommand, brokerExecution, local executor APIs, Jarvisd, or shell helpers from UI.",
    }),
    buildLocalCommandExecutionApproval({
      idHint: "secret-env-blocked",
      commandIdentity:
        "Command identity: environment-sensitive command remains blocked.",
      commandIntent:
        "Command intent: request is blocked when it would depend on showing environment values or secrets.",
      commandPreviewText:
        "Command preview text: withheld because environment values and secrets are never displayed.",
      workingDirectoryScope:
        "Working directory scope: no working directory is approved for blocked environment-sensitive commands.",
      allowedScope:
        "Allowed scope: explain why the command cannot be reviewed here without exposing secrets.",
      deniedScope:
        "Denied scope: printing environment values, storing credentials, shell execution, provider sends, file writes, and arbitrary daemon capability calls.",
      riskLevel: "blocked",
      environmentSecretsSafetyNote:
        "Env values and secrets are never displayed, exported, included, or stored.",
      approvalCopy:
        "Approval copy: not approved; provide a non-secret command review later through an approved local boundary.",
      auditNote:
        "Audit note: record that the command is blocked because secret or environment display would be unsafe.",
      blockedReasons: [
        "Env values and secrets are never displayed",
        "No explicit approval",
        "No approved local boundary",
      ],
      status: "blocked",
      advancedCommandDetails:
        "Advanced command details: blocked commands stay as review notes only and cannot call shell execution, local executor APIs, provider APIs, or registry mutation paths.",
    }),
  ];
}

export function buildLocalCommandExecutionApprovalBoundary(): LocalCommandExecutionApprovalBoundary {
  return {
    commandExecutionAllowedFromPage: false,
    shellExecutionWithoutApprovalAllowed: false,
    environmentValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    runCommandCallAllowedFromUi: false,
    brokerExecutionCallAllowedFromUi: false,
    localExecutorApiCallAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    fileMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeLocalCommandExecutionApprovalGate(
  model: Pick<LocalCommandExecutionApprovalGateModel, "commands">
): string {
  return `Local command execution approval gate prepares ${model.commands.length} reviewed command shape(s). Commands are not executed from this page, shell execution requires explicit approval, and env values and secrets are never displayed.`;
}

export function buildLocalCommandExecutionApprovalGateModel(): LocalCommandExecutionApprovalGateModel {
  const commands = buildLocalCommandExecutionApprovals();
  const model: LocalCommandExecutionApprovalGateModel = {
    title: "Local command execution approval gate",
    summary: "",
    commands,
    boundary: buildLocalCommandExecutionApprovalBoundary(),
    approvalLanguage: [...LOCAL_COMMAND_EXECUTION_APPROVAL_GATE_LANGUAGE],
    advancedDetails: [
      "Local command execution approval gate",
      "Commands are not executed from this page",
      "Shell execution requires explicit approval",
      "Env values and secrets are never displayed",
      "Command identity",
      "Command intent",
      "Command preview text",
      "Working directory scope",
      "Allowed scope",
      "Denied scope",
      "Risk level",
      "Environment and secrets safety note",
      "Approval copy",
      "Audit note",
      "Blocked reasons",
      "Approved local boundary required",
      "Nothing executes from arbitrary UI",
    ],
  };
  return { ...model, summary: summarizeLocalCommandExecutionApprovalGate(model) };
}
