import type {
  TestResultCapture,
  TestResultCaptureBoundary,
  TestResultCaptureModel,
} from "./test-result-capture-types";
import { buildTestResultCaptureStableKey } from "./test-result-capture-types";

export const TEST_RESULT_CAPTURE_LANGUAGE = [
  "Test result capture",
  "Results are reviewed before promotion",
  "Raw output stays secondary",
  "Memory is not auto-promoted",
  "Failure summary",
  "Review inbox handoff",
] as const;

export function buildTestResultCapture(
  input: Omit<TestResultCapture, "id"> & { idHint: string }
): TestResultCapture {
  const { idHint, ...result } = input;
  return {
    id: buildTestResultCaptureStableKey(
      "test-result-capture",
      idHint,
      input.testStatus
    ),
    ...result,
  };
}

export function buildTestResultCaptures(): TestResultCapture[] {
  return [
    buildTestResultCapture({
      idHint: "failed-needs-review",
      resultIdentity:
        "Result identity: test-result-failed-needs-review, captured from a future approved local test outcome.",
      sourceExecutionTrial:
        "Source execution trial: /test-execution-trial supplies the test command bridge dependency, command execution trial dependency, workspace trust status, timeout policy, expected output shape, and confirmation copy.",
      testStatus: "failed",
      commandSummary:
        "Command summary: reviewed test command purpose and working directory label are shown without rerunning the command and without exposing environment values.",
      outputSummary:
        "Output summary: concise operator-readable status, failed area, and next review need stay above the fold; raw output stays secondary.",
      failureSummary:
        "Failure summary: failed assertions, build errors, missing dependency notes, timeout notes, or blocked status remain visible for review.",
      environmentSecretsRedactionStatus:
        "Environment/secrets redaction status: env values and secrets are redacted before review and secret values are never displayed.",
      affectedFilesIndicator:
        "Affected files indicator: reported as none, unknown, or reviewed summary only; this page does not browse, open, or mutate files.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox receives test status, command summary, output summary, failure summary, redaction status, affected files indicator, and blocked reasons before promotion.",
      recoveryRoute:
        "Recovery route: /test-failure-recovery-bridge handles failed, blocked, timed-out, or needs review test outcomes without retrying automatically.",
      blockedReasons: [
        "Results are reviewed before promotion",
        "Raw output stays secondary",
        "Memory is not auto-promoted",
      ],
      advancedOutputDetails:
        "Advanced output details: this capture surface does not execute commands, run tests, call appendEvent, call saveBrainGraph, mutate Brain graph, auto-promote memory, mutate files, call providers, or display secrets.",
    }),
    buildTestResultCapture({
      idHint: "timed-out-blocked",
      resultIdentity:
        "Result identity: test-result-timed-out-blocked-for-recovery.",
      sourceExecutionTrial:
        "Source execution trial: timed-out result remains linked to the reviewed timeout policy and explicit confirmation copy.",
      testStatus: "timed out",
      commandSummary:
        "Command summary: timed-out test command is summarized for review and not retried from this page.",
      outputSummary:
        "Output summary: timeout is retained as a status with short notes; raw output stays secondary and is not promoted.",
      failureSummary:
        "Failure summary: timeout needs recovery review before any smaller command plan or retry discussion.",
      environmentSecretsRedactionStatus:
        "Environment/secrets redaction status: any output candidate must remain redacted before review.",
      affectedFilesIndicator:
        "Affected files indicator: unknown until a reviewed result source says otherwise; no local files are inspected from UI.",
      reviewInboxHandoff:
        "Review inbox handoff: route timed-out status to /review-inbox before any retry discussion.",
      recoveryRoute:
        "Recovery route: /test-failure-recovery-bridge reviews timeout cause and retry eligibility without automatic retry.",
      blockedReasons: [
        "Timed-out test result needs recovery",
        "Retry is never automatic",
        "Promotion requires review",
      ],
      advancedOutputDetails:
        "Advanced output details: timed-out test results are not deleted, retried, hidden, auto-promoted, or converted into audit or graph state by this UI.",
    }),
  ];
}

export function buildTestResultCaptureBoundary(): TestResultCaptureBoundary {
  return {
    resultsReviewedBeforePromotionRequired: true,
    rawOutputPrimaryAllowed: false,
    memoryAutoPromotionAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
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

export function summarizeTestResultCapture(
  model: Pick<TestResultCaptureModel, "results">
): string {
  return `Test result capture prepares ${model.results.length} reviewed test result shape(s). Results are reviewed before promotion, raw output stays secondary, and memory is not auto-promoted.`;
}

export function buildTestResultCaptureModel(): TestResultCaptureModel {
  const results = buildTestResultCaptures();
  const model: TestResultCaptureModel = {
    title: "Test result capture",
    summary: "",
    results,
    boundary: buildTestResultCaptureBoundary(),
    resultLanguage: [...TEST_RESULT_CAPTURE_LANGUAGE],
    advancedDetails: [
      "Test result capture",
      "Results are reviewed before promotion",
      "Raw output stays secondary",
      "Memory is not auto-promoted",
      "Result identity",
      "Source execution trial",
      "Test status: passed, failed, blocked, timed out, needs review",
      "Command summary",
      "Output summary",
      "Failure summary",
      "Environment/secrets redaction status",
      "Affected files indicator",
      "Review inbox handoff",
      "Recovery route",
      "Blocked reasons",
      "Advanced output details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeTestResultCapture(model) };
}
