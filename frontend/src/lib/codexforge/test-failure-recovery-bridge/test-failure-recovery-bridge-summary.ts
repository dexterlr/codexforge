import type {
  TestFailureRecoveryBridge,
  TestFailureRecoveryBridgeBoundary,
  TestFailureRecoveryBridgeModel,
} from "./test-failure-recovery-bridge-types";
import { buildTestFailureRecoveryBridgeStableKey } from "./test-failure-recovery-bridge-types";

export const TEST_FAILURE_RECOVERY_BRIDGE_LANGUAGE = [
  "Test failure recovery bridge",
  "Retry is never automatic",
  "Recovery does not execute commands",
  "No fixes or patches are applied automatically",
  "Safe recovery checklist",
  "Blocked retry reasons",
] as const;

export function buildTestFailureRecoveryBridge(
  input: Omit<TestFailureRecoveryBridge, "id"> & { idHint: string }
): TestFailureRecoveryBridge {
  const { idHint, ...recovery } = input;
  return {
    id: buildTestFailureRecoveryBridgeStableKey(
      "test-failure-recovery-bridge",
      idHint,
      input.failureCategory,
      input.retryEligibility
    ),
    ...recovery,
  };
}

export function buildTestFailureRecoveryBridges(): TestFailureRecoveryBridge[] {
  return [
    buildTestFailureRecoveryBridge({
      idHint: "failed-test-review",
      recoveryIdentity:
        "Recovery identity: test-failure-recovery-failed-test, a triage packet for a failed future approved test result.",
      sourceTestResultCapture:
        "Source test result capture: /test-result-capture provides test status, command summary, output summary, failure summary, redaction status, affected files indicator, review inbox handoff, recovery route, and blocked reasons.",
      failureCategory: "test failed",
      likelyCause:
        "Likely cause: failed assertion, build error, dependency issue, validation mismatch, or missing local prerequisite from the reviewed output summary.",
      safeRecoveryChecklist: [
        "Keep the failed test result visible for review.",
        "Confirm output summary, failure summary, and environment/secrets redaction status.",
        "Check whether affected files indicator is none, unknown, or reviewed summary only.",
        "Route human review to /review-inbox before retry planning.",
      ],
      retryEligibility: "eligible after review",
      blockedRetryReasons: [
        "Retry is never automatic",
        "Approved local boundary must be reviewed again",
        "Failure summary needs human review",
      ],
      patchPlanningRoute:
        "Patch planning route: /codebase-change-plan prepares reviewed follow-up work without applying patches.",
      commandRecoveryRoute:
        "Command recovery route: /command-failure-recovery can review command-level failure context without executing commands.",
      auditHandoff:
        "Audit handoff: preserve recovery identity, source test result capture, failure category, likely cause, checklist, retry eligibility, blocked retry reasons, patch planning route, and command recovery route without mutating audit logs.",
      advancedRecoveryDetails:
        "Advanced recovery details: this bridge does not retry tests automatically, execute commands, run shell commands, apply patches, mutate files, call Jarvisd directly, call providers, mutate Brain graph, or auto-promote memory.",
    }),
    buildTestFailureRecoveryBridge({
      idHint: "timeout-blocked",
      recoveryIdentity:
        "Recovery identity: test-failure-recovery-timeout-blocked.",
      sourceTestResultCapture:
        "Source test result capture: timed-out or blocked result from /test-result-capture.",
      failureCategory: "timed out",
      likelyCause:
        "Likely cause: timeout policy was too short, local dependency hung, output exceeded review expectations, or test command scope needs to be smaller.",
      safeRecoveryChecklist: [
        "Stop the retry path.",
        "Review timeout policy and expected output shape.",
        "Consider a smaller command plan through the test command bridge.",
        "Keep audit handoff copy read-only.",
      ],
      retryEligibility: "blocked",
      blockedRetryReasons: [
        "Timeout policy needs review",
        "Retry is never automatic",
        "Approved local boundary missing",
      ],
      patchPlanningRoute:
        "Patch planning route: /patch-preview-workbench remains available only for reviewed patch context and does not apply patches.",
      commandRecoveryRoute:
        "Command recovery route: /command-failure-recovery reviews timeout recovery without process control or hidden retries.",
      auditHandoff:
        "Audit handoff: copy timed-out recovery context to /jarvisd-audit-ingestion as review text only.",
      advancedRecoveryDetails:
        "Advanced recovery details: blocked timeout recovery remains triage-only and cannot trigger local execution, process control, hidden polling, retries, patch apply, or file mutation.",
    }),
  ];
}

export function buildTestFailureRecoveryBridgeBoundary(): TestFailureRecoveryBridgeBoundary {
  return {
    retryAutomaticAllowed: false,
    recoveryExecutesCommandsAllowed: false,
    automaticFixesPatchesAllowed: false,
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

export function summarizeTestFailureRecoveryBridge(
  model: Pick<TestFailureRecoveryBridgeModel, "recoveries">
): string {
  return `Test failure recovery bridge prepares ${model.recoveries.length} recovery triage shape(s). Retry is never automatic, recovery does not execute commands, and no fixes or patches are applied automatically.`;
}

export function buildTestFailureRecoveryBridgeModel(): TestFailureRecoveryBridgeModel {
  const recoveries = buildTestFailureRecoveryBridges();
  const model: TestFailureRecoveryBridgeModel = {
    title: "Test failure recovery bridge",
    summary: "",
    recoveries,
    boundary: buildTestFailureRecoveryBridgeBoundary(),
    recoveryLanguage: [...TEST_FAILURE_RECOVERY_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Test failure recovery bridge",
      "Retry is never automatic",
      "Recovery does not execute commands",
      "No fixes or patches are applied automatically",
      "Recovery identity",
      "Source test result capture",
      "Failure category",
      "Likely cause",
      "Safe recovery checklist",
      "Retry eligibility",
      "Blocked retry reasons",
      "Patch planning route",
      "Command recovery route",
      "Audit handoff",
      "Advanced recovery details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeTestFailureRecoveryBridge(model) };
}
