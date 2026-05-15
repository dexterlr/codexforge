import {
  buildExecutionReadinessStableKey,
  uniqueExecutionReadinessStrings,
  type ExecutionReadinessInput,
  type ExecutionReadinessTest,
  type ExecutionTestReadiness,
} from "./execution-readiness-types";

function hasImpactedPath(input: ExecutionReadinessInput, needles: string[]): boolean {
  const text = input.impactedFiles.join(" ").toLowerCase();
  return needles.some((needle) => text.includes(needle));
}

function buildTest(label: string, command: string, reason: string): ExecutionReadinessTest {
  return {
    id: buildExecutionReadinessStableKey("execution-readiness-test", command),
    label,
    command,
    reason,
    approvalRequired: true,
  };
}

export function selectExecutionReadinessTests(
  input: ExecutionReadinessInput
): ExecutionReadinessTest[] {
  const commands = uniqueExecutionReadinessStrings([
    "npm run build",
    "git diff --check",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-execution-readiness.ps1",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-task-activation.ps1",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-task-autopilot.ps1",
    input.mutationIntent === "none"
      ? ""
      : "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-patch-preview.ps1",
    hasImpactedPath(input, ["chat", "src/app/ai", "src\\app\\ai"])
      ? "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-chat-recall-context.ps1"
      : "",
    hasImpactedPath(input, ["brain", "graph"])
      ? "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-graph-ui.ps1"
      : "",
    hasImpactedPath(input, ["capability", "tool-policy"])
      ? "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-capability-cockpit.ps1"
      : "",
    ...input.suggestedTests,
  ]);

  return commands.map((command) => {
    if (command === "npm run build") {
      return buildTest("Build", command, "Verify the app compiles before future execution approval.");
    }
    if (command === "git diff --check") {
      return buildTest("Diff whitespace", command, "Check patch formatting before approval.");
    }
    if (command.includes("execution-readiness")) {
      return buildTest("Execution Readiness smoke", command, "Verify Phase 24 readiness cockpit and policy markers.");
    }
    if (command.includes("task-activation")) {
      return buildTest("Task Activation smoke", command, "Activated task inputs remain compatible.");
    }
    if (command.includes("task-autopilot")) {
      return buildTest("Task Autopilot smoke", command, "Autopilot signals and reviewed activation remain compatible.");
    }
    if (command.includes("patch-preview")) {
      return buildTest("Patch Preview smoke", command, "Safe Patch Preview is required for file mutation readiness.");
    }
    if (command.includes("chat-recall-context")) {
      return buildTest("Chat Recall smoke", command, "Chat workspace changes preserve recall handoff posture.");
    }
    if (command.includes("brain-graph")) {
      return buildTest("Brain Graph smoke", command, "Brain/graph impact requires graph UI smoke coverage.");
    }
    if (command.includes("capability-cockpit")) {
      return buildTest("Capability Cockpit smoke", command, "Capability or tool policy impact requires cockpit smoke coverage.");
    }

    return buildTest("Suggested check", command, "Suggested by the activated task readiness input.");
  });
}

export function buildExecutionTestReadiness(
  input: ExecutionReadinessInput
): ExecutionTestReadiness {
  const tests = selectExecutionReadinessTests(input);
  const draft: ExecutionTestReadiness = {
    id: "execution-test-readiness",
    inputId: input.id,
    tests,
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeExecutionTestReadiness(draft),
  };
}

export function summarizeExecutionTestReadiness(
  readiness: ExecutionTestReadiness
): string[] {
  return [
    `${readiness.tests.length} suggested checks are selected for readiness review.`,
    "No tests are run here; run-tests and command execution require approval.",
    "npm run build and git diff --check are baseline readiness checks.",
  ];
}
