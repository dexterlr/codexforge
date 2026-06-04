import type {
  CommandFailureRecovery,
  CommandFailureRecoveryBoundary,
  CommandFailureRecoveryFlowModel,
} from "./command-failure-recovery-flow-types";
import { buildCommandFailureRecoveryFlowStableKey } from "./command-failure-recovery-flow-types";

export const COMMAND_FAILURE_RECOVERY_FLOW_LANGUAGE = [
  "Command failure recovery flow",
  "Retry is never automatic",
  "Recovery does not execute commands",
  "No local process is killed or restarted from this page",
  "Safe recovery checklist",
  "Blocked retry reasons",
] as const;

export function buildCommandFailureRecovery(
  input: Omit<CommandFailureRecovery, "id"> & { idHint: string }
): CommandFailureRecovery {
  const { idHint, ...recovery } = input;
  return {
    id: buildCommandFailureRecoveryFlowStableKey(
      "command-failure-recovery-flow",
      idHint,
      input.failureCategory,
      input.retryEligibility
    ),
    ...recovery,
  };
}

export function buildCommandFailureRecoveries(): CommandFailureRecovery[] {
  return [
    buildCommandFailureRecovery({
      idHint: "failed-command-review",
      recoveryIdentity:
        "Recovery identity: command-failure-recovery-failed-command, a triage packet for a failed future command result.",
      sourceCommandResult:
        "Source command result: /command-result-capture provides command status, command summary, output summary, redaction status, affected files indicator, and blocked reasons.",
      failureCategory: "command failed",
      likelyCause:
        "Likely cause: the reviewed command returned a failure status, dependency issue, validation error, or missing local prerequisite.",
      safeRecoveryChecklist: [
        "Keep the failed command result visible for review.",
        "Confirm output summary and environment/secrets redaction status.",
        "Check whether affected files indicator is none, unknown, or reviewed summary only.",
        "Route human review to /review-inbox before retry planning.",
      ],
      retryEligibility: "eligible after review",
      blockedRetryReasons: [
        "Retry is never automatic",
        "Approved local boundary must be reviewed again",
        "Output summary needs human review",
      ],
      affectedScope:
        "Affected scope: reviewed command scope and affected files indicator only; recovery does not browse or open local files from UI.",
      nextRecommendedRoute:
        "Next recommended route: /review-inbox for disposition, then /command-dry-run only if a human creates a new reviewed command dry run.",
      auditHandoff:
        "Audit handoff: preserve recovery identity, source command result, failure category, likely cause, affected scope, checklist, and blocked retry reasons without mutating audit logs.",
      advancedRecoveryDetails:
        "Advanced recovery details: this flow does not retry commands automatically, execute commands, run shell commands, kill processes, restart processes, mutate files, call Jarvisd directly, call providers, mutate Brain graph, or auto-promote memory.",
    }),
    buildCommandFailureRecovery({
      idHint: "timeout-blocked",
      recoveryIdentity:
        "Recovery identity: command-failure-recovery-timeout-blocked.",
      sourceCommandResult:
        "Source command result: timed-out command result from /command-result-capture.",
      failureCategory: "timed out",
      likelyCause:
        "Likely cause: timeout policy was too short, local dependency hung, output exceeded review expectations, or command scope needs to be smaller.",
      safeRecoveryChecklist: [
        "Stop the retry path.",
        "Review timeout policy and expected output shape.",
        "Consider a smaller command plan through dry run.",
        "Keep audit handoff copy read-only.",
      ],
      retryEligibility: "blocked",
      blockedRetryReasons: [
        "Timeout policy needs review",
        "Retry is never automatic",
        "Approved local boundary missing",
      ],
      affectedScope:
        "Affected scope: timeout scope is command metadata only; no process is killed, restarted, or inspected from this page.",
      nextRecommendedRoute:
        "Next recommended route: /command-execution-trial for a smaller reviewed timeout policy after human review.",
      auditHandoff:
        "Audit handoff: copy timed-out recovery context to /jarvisd-audit-ingestion as review text only.",
      advancedRecoveryDetails:
        "Advanced recovery details: blocked timeout recovery remains triage-only and cannot trigger local execution, process control, hidden polling, retries, or file mutation.",
    }),
  ];
}

export function buildCommandFailureRecoveryBoundary(): CommandFailureRecoveryBoundary {
  return {
    retryAutomaticAllowed: false,
    recoveryExecutesCommandsAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
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

export function summarizeCommandFailureRecoveryFlow(
  model: Pick<CommandFailureRecoveryFlowModel, "recoveries">
): string {
  return `Command failure recovery flow prepares ${model.recoveries.length} recovery triage shape(s). Retry is never automatic, recovery does not execute commands, and no local process is killed or restarted from this page.`;
}

export function buildCommandFailureRecoveryFlowModel(): CommandFailureRecoveryFlowModel {
  const recoveries = buildCommandFailureRecoveries();
  const model: CommandFailureRecoveryFlowModel = {
    title: "Command failure recovery flow",
    summary: "",
    recoveries,
    boundary: buildCommandFailureRecoveryBoundary(),
    recoveryLanguage: [...COMMAND_FAILURE_RECOVERY_FLOW_LANGUAGE],
    advancedDetails: [
      "Command failure recovery flow",
      "Retry is never automatic",
      "Recovery does not execute commands",
      "No local process is killed or restarted from this page",
      "Recovery identity",
      "Source command result",
      "Failure category",
      "Likely cause",
      "Safe recovery checklist",
      "Retry eligibility",
      "Blocked retry reasons",
      "Affected scope",
      "Next recommended route",
      "Audit handoff",
      "Advanced recovery details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeCommandFailureRecoveryFlow(model) };
}
