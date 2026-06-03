import type {
  TestCommandPlan,
  TestCommandPlannerBoundary,
  TestCommandPlannerModel,
} from "./test-command-planner-types";
import { buildTestCommandPlannerStableKey } from "./test-command-planner-types";

export const TEST_COMMAND_PLANNER_LANGUAGE = [
  "Test command planner",
  "Test commands are not run from this page",
  "Shell execution requires explicit approval",
  "Env values and secrets are never displayed",
  "Recommended command summary",
  "Execution approval route",
] as const;

export function buildTestCommandPlan(
  input: Omit<TestCommandPlan, "id"> & { idHint: string }
): TestCommandPlan {
  const { idHint, ...plan } = input;
  return {
    id: buildTestCommandPlannerStableKey(
      "test-command-planner",
      idHint,
      input.status,
      input.riskLevel
    ),
    ...plan,
  };
}

export function buildTestCommandPlans(): TestCommandPlan[] {
  return [
    buildTestCommandPlan({
      idHint: "focused-patch-validation",
      status: "review-required",
      riskLevel: "medium",
      testPlanIdentity:
        "Test plan identity: focused validation plan for a reviewed patch result or source change plan.",
      sourceChangePlanPatchResult:
        "Source change plan / patch result: /patch-result-capture or /patch-preview-workbench supplies the reviewed change, risk notes, and validation intent.",
      recommendedCommandSummary:
        "Recommended command summary: run the smallest reviewed build, type, or smoke command that covers the changed area; test commands are not run from this page.",
      workingDirectoryScope:
        "Working directory scope: approved canonical frontend workspace label only, never an arbitrary directory chosen by this UI.",
      expectedDurationRisk:
        "Expected duration/risk: short to medium local validation with review-required risk because shell execution can use local machine resources.",
      environmentSecretsSafetyNote:
        "Env values and secrets are never displayed. The planner names the safety rule and never prints environment values.",
      requiredApproval:
        "Required approval: shell execution requires explicit approval through a command and test execution boundary before any future local run.",
      commandApprovalRoute:
        "Command approval route: /local-command-approval reviews the command intent, command text summary, workspace, and denied scope.",
      executionApprovalRoute:
        "Execution approval route: /test-execution-approval is required before any future approved local boundary could run the selected test command.",
      blockedReasons: [
        "Test commands are not run from this page",
        "Shell execution requires explicit approval",
        "Env values and secrets are never displayed",
      ],
      advancedCommandDetails:
        "Advanced command details: command text stays secondary. This planner does not execute commands, call runCommand, call brokerExecution, call local executor APIs, call Jarvisd, browse files, mutate files, call providers, or display secrets.",
    }),
    buildTestCommandPlan({
      idHint: "blocked-missing-approval",
      status: "blocked",
      riskLevel: "blocked",
      testPlanIdentity:
        "Test plan identity: blocked validation plan because command approval and execution approval are missing.",
      sourceChangePlanPatchResult:
        "Source change plan / patch result: unavailable or unreviewed, so no test command recommendation can proceed.",
      recommendedCommandSummary:
        "Recommended command summary: none. A command is not guessed from arbitrary UI context and no tests are run automatically.",
      workingDirectoryScope:
        "Working directory scope: blocked until workspace trust and command approval identify the reviewed scope.",
      expectedDurationRisk:
        "Expected duration/risk: blocked because duration and machine impact cannot be reviewed without an approved command plan.",
      environmentSecretsSafetyNote:
        "Env values and secrets are never displayed, exported, included, or stored.",
      requiredApproval:
        "Required approval: explicit command approval and explicit test execution approval are both required.",
      commandApprovalRoute:
        "Command approval route: /local-command-approval remains the next safe command review route.",
      executionApprovalRoute:
        "Execution approval route: /test-execution-approval remains blocked until a selected command is reviewed.",
      blockedReasons: [
        "Source change plan or patch result missing",
        "Command approval missing",
        "Approved local boundary required",
      ],
      advancedCommandDetails:
        "Advanced command details: blocked plans stay planning-only and cannot trigger local execution, provider calls, file reads, file writes, patch apply, or memory promotion.",
    }),
  ];
}

export function buildTestCommandPlannerBoundary(): TestCommandPlannerBoundary {
  return {
    planningOnly: true,
    testsRunFromPageAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    shellExecutionWithoutApprovalAllowed: false,
    runCommandCallAllowedFromUi: false,
    brokerExecutionCallAllowedFromUi: false,
    localExecutorApiCallAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    environmentValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeTestCommandPlanner(
  model: Pick<TestCommandPlannerModel, "plans">
): string {
  return `Test command planner prepares ${model.plans.length} reviewed test command plan shape(s). Test commands are not run from this page, shell execution requires explicit approval, and env values and secrets are never displayed.`;
}

export function buildTestCommandPlannerModel(): TestCommandPlannerModel {
  const plans = buildTestCommandPlans();
  const model: TestCommandPlannerModel = {
    title: "Test command planner",
    summary: "",
    plans,
    boundary: buildTestCommandPlannerBoundary(),
    planningLanguage: [...TEST_COMMAND_PLANNER_LANGUAGE],
    advancedDetails: [
      "Test command planner",
      "Test commands are not run from this page",
      "Shell execution requires explicit approval",
      "Env values and secrets are never displayed",
      "Test plan identity",
      "Source change plan / patch result",
      "Recommended command summary",
      "Working directory scope",
      "Expected duration/risk",
      "Environment/secrets safety note",
      "Required approval",
      "Command approval route",
      "Execution approval route",
      "Blocked reasons",
      "Approved local boundary required",
      "Advanced command details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeTestCommandPlanner(model) };
}
