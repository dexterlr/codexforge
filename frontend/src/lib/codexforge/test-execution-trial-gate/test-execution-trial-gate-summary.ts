import type {
  TestExecutionTrial,
  TestExecutionTrialGateBoundary,
  TestExecutionTrialGateModel,
} from "./test-execution-trial-gate-types";
import { buildTestExecutionTrialGateStableKey } from "./test-execution-trial-gate-types";

export const TEST_EXECUTION_TRIAL_GATE_LANGUAGE = [
  "Test execution trial gate",
  "Tests are not executed from this page",
  "Approved local boundary is required before test execution",
  "Env values and secrets are not exposed",
  "Timeout policy",
  "Required confirmation copy",
] as const;

export function buildTestExecutionTrial(
  input: Omit<TestExecutionTrial, "id"> & { idHint: string }
): TestExecutionTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildTestExecutionTrialGateStableKey(
      "test-execution-trial-gate",
      idHint,
      input.status,
      input.workspaceTrustStatus
    ),
    ...trial,
  };
}

export function buildTestExecutionTrials(): TestExecutionTrial[] {
  return [
    buildTestExecutionTrial({
      idHint: "reviewed-test-execution-trial",
      status: "review-required",
      executionTrialIdentity:
        "Execution trial identity: test-execution-trial-reviewed-command, a review packet for one future approved local test execution request.",
      testCommandBridgeDependency:
        "Test command bridge dependency: /test-command-bridge must supply bridge identity, planner source, dry-run source, workspace scope, recommended command summary, env/secrets safety note, audit handoff, and blocked reasons first.",
      commandExecutionTrialDependency:
        "Command execution trial dependency: /command-execution-trial supplies allowed command scope, denied command scope, timeout policy, expected output shape, and required confirmation copy patterns.",
      workspaceTrustStatus: "review-required",
      allowedCommandScope:
        "Allowed command scope: one reviewed test command summary, one approved working directory label, one bounded timeout, one expected output shape, and one explicit confirmation copy.",
      deniedCommandScope:
        "Denied command scope: unreviewed commands, arbitrary shell scope, arbitrary directories, secret printing, file mutation, patch apply, process control, provider sends, GitHub API calls, and direct Jarvisd calls from UI.",
      timeoutPolicy:
        "Timeout policy: future approved local boundary must use a bounded timeout and capture timed-out status instead of hanging the UI.",
      expectedOutputShape:
        "Expected output shape: test status, command summary, output summary, failure summary, redaction status, affected files indicator, review inbox handoff, recovery route, and blocked reasons.",
      requiredConfirmationCopy:
        "Required confirmation copy: I approve this reviewed test command, working directory scope, timeout policy, expected output shape, denied scope, and approved local boundary for one future test execution request.",
      blockedReasons: [
        "Tests are not executed from this page",
        "Approved local boundary is required before test execution",
        "Env values and secrets are not exposed",
      ],
      advancedTrialDetails:
        "Advanced trial details: this page does not execute commands, run tests, call runCommand, call brokerExecution, call local executor APIs, call Jarvisd directly, mutate files, browse arbitrary files, or expose secrets.",
    }),
    buildTestExecutionTrial({
      idHint: "blocked-missing-test-bridge",
      status: "blocked",
      executionTrialIdentity:
        "Execution trial identity: test-execution-trial-missing-bridge-blocked.",
      testCommandBridgeDependency:
        "Test command bridge dependency: blocked until a reviewed test command bridge exists.",
      commandExecutionTrialDependency:
        "Command execution trial dependency: blocked because command execution trial shape is missing.",
      workspaceTrustStatus: "blocked",
      allowedCommandScope:
        "Allowed command scope: no command scope is allowed while bridge and workspace trust are missing.",
      deniedCommandScope:
        "Denied command scope: test execution, shell execution, local daemon execution, file mutation, patch apply, arbitrary file reads, process control, provider calls, GitHub API calls, and memory promotion.",
      timeoutPolicy:
        "Timeout policy: unavailable while the execution request is blocked.",
      expectedOutputShape:
        "Expected output shape: none accepted until the test command bridge and approved local boundary are reviewed.",
      requiredConfirmationCopy:
        "Required confirmation copy: not approved; return to test command bridge, command execution trial, and workspace trust review.",
      blockedReasons: [
        "Reviewed test command bridge missing",
        "Command execution trial dependency missing",
        "Workspace trust missing",
      ],
      advancedTrialDetails:
        "Advanced trial details: blocked trials stay review-only and cannot trigger test execution, local daemon capabilities, hidden retries, file writes, or process control.",
    }),
  ];
}

export function buildTestExecutionTrialGateBoundary(): TestExecutionTrialGateBoundary {
  return {
    testsExecutedFromPageAllowed: false,
    approvedLocalBoundaryRequiredBeforeTestExecution: true,
    envValuesSecretsExposedAllowed: false,
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

export function summarizeTestExecutionTrialGate(
  model: Pick<TestExecutionTrialGateModel, "trials">
): string {
  return `Test execution trial gate prepares ${model.trials.length} reviewed execution trial shape(s). Tests are not executed from this page, approved local boundary is required before test execution, and env values and secrets are not exposed.`;
}

export function buildTestExecutionTrialGateModel(): TestExecutionTrialGateModel {
  const trials = buildTestExecutionTrials();
  const model: TestExecutionTrialGateModel = {
    title: "Test execution trial gate",
    summary: "",
    trials,
    boundary: buildTestExecutionTrialGateBoundary(),
    trialLanguage: [...TEST_EXECUTION_TRIAL_GATE_LANGUAGE],
    advancedDetails: [
      "Test execution trial gate",
      "Tests are not executed from this page",
      "Approved local boundary is required before test execution",
      "Env values and secrets are not exposed",
      "Execution trial identity",
      "Test command bridge dependency",
      "Command execution trial dependency",
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
  return { ...model, summary: summarizeTestExecutionTrialGate(model) };
}
