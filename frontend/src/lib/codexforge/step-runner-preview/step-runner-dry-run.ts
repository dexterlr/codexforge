import {
  buildStepRunnerPreviewStableKey,
  uniqueStepRunnerPreviewStrings,
  type StepRunnerDryRunCheck,
  type StepRunnerDryRunPlan,
  type StepRunnerInput,
  type StepRunnerPolicy,
  type StepRunnerToolPlan,
} from "./step-runner-preview-types";

export function buildStepRunnerDryRunCheck(
  id: string,
  label: string,
  detail: string,
  required = true
): StepRunnerDryRunCheck {
  return {
    id: buildStepRunnerPreviewStableKey("step-runner-dry-run-check", id),
    label,
    detail,
    required,
  };
}

export function buildStepRunnerDryRunPlan(args: {
  input: StepRunnerInput;
  policy: StepRunnerPolicy;
  toolPlan: StepRunnerToolPlan;
}): StepRunnerDryRunPlan {
  const filesToInspect =
    args.input.impactedFiles.length > 0
      ? args.input.impactedFiles
      : ["No impacted files declared; inspect the active task context before future approval."];
  const memoriesToVerify =
    args.input.relatedMemories.length > 0
      ? args.input.relatedMemories.map((memory) => `${memory.label}: ${memory.summary}`)
      : ["No related memories declared; verify current source context directly."];
  const tests = uniqueStepRunnerPreviewStrings([
    "npm run build",
    "git diff --check",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-step-runner-preview.ps1",
    args.input.commandIntent === "run-tests"
      ? "Run targeted future tests only after approval."
      : "",
    args.input.commandIntent === "build-web-app"
      ? "Run future web build only after approval."
      : "",
  ]);
  const draft: StepRunnerDryRunPlan = {
    id: "step-runner-dry-run-plan",
    inputId: args.input.id,
    checksBeforeExecution: [
      buildStepRunnerDryRunCheck(
        "input-valid",
        "Validate Step Runner Input",
        "Confirm active task id, step id, selected tool intent, readiness status, and approval state are visible."
      ),
      buildStepRunnerDryRunCheck(
        "policy-visible",
        "Verify tool policy posture",
        "Confirm read-only, preview-only, approval-required, and blocked tool modes before any future run request."
      ),
      buildStepRunnerDryRunCheck(
        "approval-packet",
        "Review approval packet",
        "Confirm no-run guarantee, no file mutation guarantee, required approvals, checklist, and operator note."
      ),
      buildStepRunnerDryRunCheck(
        "safe-patch-preview",
        "Confirm Safe Patch Preview",
        "File mutation cannot proceed without Safe Patch Preview and a separate future write approval."
      ),
      buildStepRunnerDryRunCheck(
        "no-execution",
        "Hold execution boundary",
        "No step execution in Phase 25 and Future run requires approval."
      ),
    ],
    filesToInspect,
    memoriesToVerify,
    policiesToVerify: uniqueStepRunnerPreviewStrings([
      "Step Runner Policy",
      "Tool policy guard",
      "Safe Patch Preview",
      "Brain Merge Review",
      "Memory Review",
      ...args.policy.futureRunBlockedReasons,
      `${args.toolPlan.proposedTool.toolName}: ${args.toolPlan.proposedTool.mode}`,
    ]),
    testsToRunAfterFutureExecution: tests,
    rollbackNote:
      "Rollback note: future execution must preserve review evidence, capture changed files, and use the existing patch rollback path before any apply step.",
    stopConditions: [
      "Stop if readiness is missing or blocked.",
      "Stop if broker-execution is requested.",
      "Stop if approval packet is invalid or unapproved.",
      "Stop if Safe Patch Preview is missing for file mutation.",
      "Stop if command execution, file write, apply-diff, network call, AI call, or Brain graph mutation is requested from the preview UI.",
    ],
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeStepRunnerDryRunPlan(draft),
  };
}

export function summarizeStepRunnerDryRunPlan(plan: StepRunnerDryRunPlan): string[] {
  return [
    `Dry run plan has ${plan.checksBeforeExecution.length} checks before execution.`,
    `${plan.filesToInspect.length} file inspection notes and ${plan.memoriesToVerify.length} memory verification notes are listed.`,
    `${plan.testsToRunAfterFutureExecution.length} tests are listed for after future execution approval.`,
    `Stop conditions are explicit: ${plan.stopConditions.length} stop conditions.`,
  ];
}
