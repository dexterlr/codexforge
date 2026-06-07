import type {
  TestCommandBridge,
  TestCommandBridgeBoundary,
  TestCommandBridgeModel,
} from "./test-command-bridge-types";
import { buildTestCommandBridgeStableKey } from "./test-command-bridge-types";

export const TEST_COMMAND_BRIDGE_LANGUAGE = [
  "Test command bridge",
  "Test commands are not run from this page",
  "Env values and secrets are never displayed",
  "Execution remains behind approved local boundary",
  "Recommended command summary",
  "Audit handoff",
] as const;

export function buildTestCommandBridge(
  input: Omit<TestCommandBridge, "id"> & { idHint: string }
): TestCommandBridge {
  const { idHint, ...bridge } = input;
  return {
    id: buildTestCommandBridgeStableKey(
      "test-command-bridge",
      idHint,
      input.status,
      input.riskLevel
    ),
    ...bridge,
  };
}

export function buildTestCommandBridges(): TestCommandBridge[] {
  return [
    buildTestCommandBridge({
      idHint: "focused-test-command-handoff",
      status: "review-required",
      riskLevel: "medium",
      bridgeIdentity:
        "Bridge identity: test-command-bridge-focused-handoff, a future handoff shape for one reviewed test command.",
      sourceTestCommandPlanner:
        "Source test command planner: /test-command-planner supplies the reviewed test intent, command summary, duration/risk, and blocked reasons.",
      sourceCommandDryRunBridge:
        "Source command dry-run bridge: /command-dry-run supplies command intent, expected effect summary, env/secrets safety note, and audit handoff without running anything.",
      workspaceTrustDependency:
        "Workspace trust dependency: /workspace-trust-policy must confirm the canonical workspace label before a local boundary can be considered.",
      permissionEnforcementDependency:
        "Permission enforcement dependency: /jarvisd-runtime-enforcement must confirm matching permission rules without granting Jarvisd permissions automatically.",
      recommendedCommandSummary:
        "Recommended command summary: use the smallest reviewed test command that covers the changed area; test commands are not run from this page.",
      workingDirectoryScope:
        "Working directory scope: approved canonical frontend workspace label only; this UI does not browse or select arbitrary directories.",
      expectedDurationRisk:
        "Expected duration/risk: short to medium local validation with review-required machine impact and bounded timeout planning.",
      environmentSecretsSafetyNote:
        "Environment/secrets safety note: env values and secrets are never displayed, exported, included, or stored by this page.",
      auditHandoff:
        "Audit handoff: preserve bridge identity, source planner, dry-run source, workspace trust dependency, permission dependency, recommended command summary, and blocked reasons for later audit review without mutating logs.",
      blockedReasons: [
        "Test commands are not run from this page",
        "Execution remains behind approved local boundary",
        "Env values and secrets are never displayed",
      ],
      advancedBridgeDetails:
        "Advanced bridge details: this bridge does not execute commands, run tests, run shell commands, call runCommand, call brokerExecution, call local executor APIs, call Jarvisd directly, browse files, mutate files, print environment values, or display secrets.",
    }),
    buildTestCommandBridge({
      idHint: "blocked-untrusted-scope",
      status: "blocked",
      riskLevel: "blocked",
      bridgeIdentity:
        "Bridge identity: test-command-bridge-blocked-untrusted-scope.",
      sourceTestCommandPlanner:
        "Source test command planner: blocked because the planner has not supplied a reviewed command summary and blocked reasons.",
      sourceCommandDryRunBridge:
        "Source command dry-run bridge: blocked until command dry-run metadata confirms expected effect and denied scope.",
      workspaceTrustDependency:
        "Workspace trust dependency: blocked until the canonical workspace label is reviewed.",
      permissionEnforcementDependency:
        "Permission enforcement dependency: blocked because runtime permission enforcement cannot validate broad local scope.",
      recommendedCommandSummary:
        "Recommended command summary: none. The bridge does not guess commands from arbitrary UI context.",
      workingDirectoryScope:
        "Working directory scope: none approved while workspace trust is missing.",
      expectedDurationRisk:
        "Expected duration/risk: blocked because timeout, machine impact, and command scope cannot be reviewed.",
      environmentSecretsSafetyNote:
        "Environment/secrets safety note: env values and secrets are never displayed, even when the bridge is blocked.",
      auditHandoff:
        "Audit handoff: blocked bridge context can be copied for review, but this UI does not auto-ingest audit events or mutate Jarvisd audit logs.",
      blockedReasons: [
        "Reviewed test command planner source missing",
        "Command dry-run bridge source missing",
        "Approved local boundary missing",
      ],
      advancedBridgeDetails:
        "Advanced bridge details: blocked bridges cannot start daemons, open sockets, execute shell commands, run tests, browse files, write files, delete files, apply patches, or call provider APIs.",
    }),
  ];
}

export function buildTestCommandBridgeBoundary(): TestCommandBridgeBoundary {
  return {
    testCommandsRunFromPageAllowed: false,
    executionBehindApprovedLocalBoundaryRequired: true,
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

export function summarizeTestCommandBridge(
  model: Pick<TestCommandBridgeModel, "bridges">
): string {
  return `Test command bridge prepares ${model.bridges.length} reviewed bridge handoff shape(s). Test commands are not run from this page, env values and secrets are never displayed, and execution remains behind approved local boundary.`;
}

export function buildTestCommandBridgeModel(): TestCommandBridgeModel {
  const bridges = buildTestCommandBridges();
  const model: TestCommandBridgeModel = {
    title: "Test command bridge",
    summary: "",
    bridges,
    boundary: buildTestCommandBridgeBoundary(),
    bridgeLanguage: [...TEST_COMMAND_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Test command bridge",
      "Test commands are not run from this page",
      "Env values and secrets are never displayed",
      "Execution remains behind approved local boundary",
      "Bridge identity",
      "Source test command planner",
      "Source command dry-run bridge",
      "Workspace trust dependency",
      "Permission enforcement dependency",
      "Recommended command summary",
      "Working directory scope",
      "Expected duration/risk",
      "Environment/secrets safety note",
      "Audit handoff",
      "Blocked reasons",
      "Advanced bridge details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeTestCommandBridge(model) };
}
