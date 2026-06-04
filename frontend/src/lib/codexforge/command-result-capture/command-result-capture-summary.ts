import type {
  CommandResult,
  CommandResultCaptureBoundary,
  CommandResultCaptureModel,
} from "./command-result-capture-types";
import { buildCommandResultCaptureStableKey } from "./command-result-capture-types";

export const COMMAND_RESULT_CAPTURE_LANGUAGE = [
  "Command result capture",
  "Results are reviewed before promotion",
  "Raw output stays secondary",
  "Memory is not auto-promoted",
  "Output summary",
  "Review inbox handoff",
] as const;

export function buildCommandResult(
  input: Omit<CommandResult, "id"> & { idHint: string }
): CommandResult {
  const { idHint, ...result } = input;
  return {
    id: buildCommandResultCaptureStableKey(
      "command-result-capture",
      idHint,
      input.commandStatus
    ),
    ...result,
  };
}

export function buildCommandResults(): CommandResult[] {
  return [
    buildCommandResult({
      idHint: "failed-needs-review",
      resultIdentity:
        "Result identity: command-result-failed-needs-review, captured from a future approved local command outcome.",
      sourceExecutionTrial:
        "Source execution trial: /command-execution-trial supplies dry-run dependency, command approval boundary dependency, workspace trust status, timeout policy, and expected output shape.",
      commandStatus: "failed",
      commandSummary:
        "Command summary: reviewed command purpose and working directory label are shown without rerunning the command and without exposing environment values.",
      outputSummary:
        "Output summary: concise operator-readable status, failure shape, and next review need stay above the fold; raw output stays secondary.",
      environmentSecretsRedactionStatus:
        "Environment/secrets redaction status: env values and secrets are redacted before review and secret values are never displayed.",
      affectedFilesIndicator:
        "Affected files indicator: reported as none, unknown, or reviewed summary only; this page does not browse, open, or mutate files.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox receives command status, command summary, output summary, redaction status, affected files indicator, and blocked reasons before promotion.",
      recoveryRoute:
        "Recovery route: /command-failure-recovery handles failed, blocked, timed-out, or needs review command outcomes without retrying automatically.",
      blockedReasons: [
        "Results are reviewed before promotion",
        "Raw output stays secondary",
        "Memory is not auto-promoted",
      ],
      advancedOutputDetails:
        "Advanced output details: this capture surface does not execute commands, call appendEvent, call saveBrainGraph, mutate Brain graph, auto-promote memory, mutate files, call providers, or display secrets.",
    }),
    buildCommandResult({
      idHint: "timed-out-blocked",
      resultIdentity:
        "Result identity: command-result-timed-out-blocked-for-recovery.",
      sourceExecutionTrial:
        "Source execution trial: timed-out result remains linked to the reviewed timeout policy and explicit approval copy.",
      commandStatus: "timed out",
      commandSummary:
        "Command summary: timed-out command is summarized for review and not retried from this page.",
      outputSummary:
        "Output summary: timeout is retained as a status with short notes; raw output stays secondary and is not promoted.",
      environmentSecretsRedactionStatus:
        "Environment/secrets redaction status: any output candidate must remain redacted before review.",
      affectedFilesIndicator:
        "Affected files indicator: unknown until a reviewed result source says otherwise; no local files are inspected from UI.",
      reviewInboxHandoff:
        "Review inbox handoff: route timed-out status to /review-inbox before any retry discussion.",
      recoveryRoute:
        "Recovery route: /command-failure-recovery reviews timeout cause and retry eligibility without automatic retry.",
      blockedReasons: [
        "Timed-out result needs recovery",
        "Retry is never automatic",
        "Promotion requires review",
      ],
      advancedOutputDetails:
        "Advanced output details: timed-out results are not deleted, retried, hidden, auto-promoted, or converted into audit or graph state by this UI.",
    }),
  ];
}

export function buildCommandResultCaptureBoundary(): CommandResultCaptureBoundary {
  return {
    resultsReviewedBeforePromotionRequired: true,
    rawOutputPrimaryAllowed: false,
    memoryAutoPromotionAllowed: false,
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

export function summarizeCommandResultCapture(
  model: Pick<CommandResultCaptureModel, "results">
): string {
  return `Command result capture prepares ${model.results.length} reviewed command result shape(s). Results are reviewed before promotion, raw output stays secondary, and memory is not auto-promoted.`;
}

export function buildCommandResultCaptureModel(): CommandResultCaptureModel {
  const results = buildCommandResults();
  const model: CommandResultCaptureModel = {
    title: "Command result capture",
    summary: "",
    results,
    boundary: buildCommandResultCaptureBoundary(),
    resultLanguage: [...COMMAND_RESULT_CAPTURE_LANGUAGE],
    advancedDetails: [
      "Command result capture",
      "Results are reviewed before promotion",
      "Raw output stays secondary",
      "Memory is not auto-promoted",
      "Result identity",
      "Source execution trial",
      "Command status: passed, failed, blocked, timed out, needs review",
      "Command summary",
      "Output summary",
      "Environment/secrets redaction status",
      "Affected files indicator",
      "Review inbox handoff",
      "Recovery route",
      "Blocked reasons",
      "Advanced output details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeCommandResultCapture(model) };
}
