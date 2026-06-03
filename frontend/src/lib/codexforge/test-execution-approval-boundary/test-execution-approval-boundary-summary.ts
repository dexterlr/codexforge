import type {
  TestExecutionApproval,
  TestExecutionApprovalBoundary,
  TestExecutionApprovalBoundaryModel,
} from "./test-execution-approval-boundary-types";
import { buildTestExecutionApprovalBoundaryStableKey } from "./test-execution-approval-boundary-types";

export const TEST_EXECUTION_APPROVAL_BOUNDARY_LANGUAGE = [
  "Test execution approval boundary",
  "Tests are not executed from this page",
  "Future execution remains behind approved local boundary",
  "Approval is required before any test run",
  "Timeout policy",
  "Allowed scope",
] as const;

export function buildTestExecutionApproval(
  input: Omit<TestExecutionApproval, "id"> & { idHint: string }
): TestExecutionApproval {
  const { idHint, ...approval } = input;
  return {
    id: buildTestExecutionApprovalBoundaryStableKey(
      "test-execution-approval-boundary",
      idHint,
      input.status,
      input.workspaceTrustStatus
    ),
    ...approval,
  };
}

export function buildTestExecutionApprovals(): TestExecutionApproval[] {
  return [
    buildTestExecutionApproval({
      idHint: "approved-command-review",
      status: "review-required",
      executionRequestIdentity:
        "Execution request identity: reviewed test execution request for a selected test command; tests are not executed from this page.",
      selectedTestCommand:
        "Selected test command: a reviewed command summary from /test-command-planner and /local-command-approval, shown as review metadata only.",
      workingDirectoryScope:
        "Working directory scope: approved canonical frontend workspace label only, with no arbitrary path browsing.",
      workspaceTrustStatus:
        "review-required",
      commandApprovalStatus:
        "Command approval status: command intent, denied scope, and environment/secrets safety must be approved before any test run.",
      allowedScope:
        "Allowed scope: one selected command, one reviewed working directory scope, one timeout policy, and one explicit approval copy.",
      deniedScope:
        "Denied scope: unreviewed commands, arbitrary directories, file mutation, patch apply, provider calls, direct Jarvisd calls from arbitrary UI, secret display, and background execution.",
      timeoutPolicy:
        "Timeout policy: future approved local boundary must use a bounded timeout and capture timed-out status instead of hanging the UI.",
      approvalCopy:
        "Approval copy: I approve this selected test command, working directory scope, timeout policy, denied scope, and local-only execution boundary for one future test run.",
      blockedReasons: [
        "Tests are not executed from this page",
        "Future execution remains behind approved local boundary",
        "Approval is required before any test run",
      ],
      advancedExecutionDetails:
        "Advanced execution details: this page does not execute commands, run tests, call Jarvisd directly, mutate files, apply patches, call providers, or display secret values.",
    }),
    buildTestExecutionApproval({
      idHint: "blocked-untrusted-workspace",
      status: "blocked",
      executionRequestIdentity:
        "Execution request identity: blocked test execution request because workspace trust or command approval is missing.",
      selectedTestCommand:
        "Selected test command: none. Approval is required before any test run and no command is selected.",
      workingDirectoryScope:
        "Working directory scope: blocked until /workspace-trust-policy confirms the reviewed workspace scope.",
      workspaceTrustStatus: "blocked",
      commandApprovalStatus:
        "Command approval status: blocked until /local-command-approval reviews the selected test command.",
      allowedScope:
        "Allowed scope: explain the blocked state and route the operator back to planning and command approval.",
      deniedScope:
        "Denied scope: test execution, shell execution, local daemon execution, file mutation, patch apply, arbitrary file reads, provider calls, and memory promotion.",
      timeoutPolicy:
        "Timeout policy: unavailable while execution remains blocked.",
      approvalCopy:
        "Approval copy: not approved; create a reviewed test command plan and execution request first.",
      blockedReasons: [
        "Workspace trust missing",
        "Command approval missing",
        "Approved local boundary required",
      ],
      advancedExecutionDetails:
        "Advanced execution details: blocked execution requests remain review-only and cannot trigger future local daemon capabilities.",
    }),
  ];
}

export function buildTestExecutionApprovalBoundary(): TestExecutionApprovalBoundary {
  return {
    testsExecutedFromPageAllowed: false,
    approvalRequiredBeforeAnyTestRun: true,
    futureExecutionBehindApprovedLocalBoundary: true,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    runCommandCallAllowedFromUi: false,
    brokerExecutionCallAllowedFromUi: false,
    localExecutorApiCallAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesDisplayedAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeTestExecutionApprovalBoundary(
  model: Pick<TestExecutionApprovalBoundaryModel, "approvals">
): string {
  return `Test execution approval boundary prepares ${model.approvals.length} explicit approval shape(s). Tests are not executed from this page, future execution remains behind approved local boundary, and approval is required before any test run.`;
}

export function buildTestExecutionApprovalBoundaryModel(): TestExecutionApprovalBoundaryModel {
  const approvals = buildTestExecutionApprovals();
  const model: TestExecutionApprovalBoundaryModel = {
    title: "Test execution approval boundary",
    summary: "",
    approvals,
    boundary: buildTestExecutionApprovalBoundary(),
    approvalLanguage: [...TEST_EXECUTION_APPROVAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Test execution approval boundary",
      "Tests are not executed from this page",
      "Future execution remains behind approved local boundary",
      "Approval is required before any test run",
      "Execution request identity",
      "Selected test command",
      "Working directory scope",
      "Workspace trust status",
      "Command approval status",
      "Allowed scope",
      "Denied scope",
      "Timeout policy",
      "Approval copy",
      "Blocked reasons",
      "Approved local boundary required",
      "Advanced execution details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeTestExecutionApprovalBoundary(model) };
}
