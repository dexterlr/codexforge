import {
  buildTaskAutopilotStableKey,
  type TaskPlanPreview,
  type TaskPlanStep,
  type TaskSuggestion,
  type TaskSuggestionKind,
} from "./task-autopilot-types";
import { buildTaskPromptHandoff } from "./task-handoff";

export function buildTaskPlanStep(args: {
  id: string;
  label: string;
  detail: string;
  gate: TaskPlanStep["gate"];
}): TaskPlanStep {
  return args;
}

function kindStep(kind: TaskSuggestionKind): TaskPlanStep {
  if (kind === "promote-memory") {
    return buildTaskPlanStep({
      id: "memory-review",
      label: "Route through Memory Review",
      detail: "Review confidence, contradiction risk, and source traceability before any promotion preview.",
      gate: "approval",
    });
  }
  if (kind === "prepare-patch" || kind === "fix" || kind === "refactor") {
    return buildTaskPlanStep({
      id: "safe-patch-preview",
      label: "Prepare Safe Patch Preview",
      detail: "Produce a preview plan or diff proposal only; no file mutation is allowed from Task Autopilot.",
      gate: "preview",
    });
  }
  if (kind === "test") {
    return buildTaskPlanStep({
      id: "test-plan",
      label: "List validation commands",
      detail: "Identify tests to run, but require operator approval before command execution.",
      gate: "approval",
    });
  }
  return buildTaskPlanStep({
    id: "preview-only-plan",
    label: "Build preview-only plan",
    detail: "Produce a safe task plan and handoff prompt for operator review.",
    gate: "preview",
  });
}

export function buildTaskPlanPreview(suggestion: TaskSuggestion): TaskPlanPreview {
  const memoriesToVerify = Array.from(
    new Set(suggestion.sourceSignals.flatMap((signal) => signal.relatedMemoryIds))
  ).sort();
  const testsToRun = suggestion.acceptanceChecks
    .filter((check) => check.toLowerCase().includes("test") || check.toLowerCase().includes("smoke"))
    .map((check) => `Approval required: ${check}`);

  const orderedSteps = [
    buildTaskPlanStep({
      id: "inspect-first",
      label: "Inspect first",
      detail: "Verify active context and current source before using recalled memory.",
      gate: "inspect",
    }),
    buildTaskPlanStep({
      id: "verify-memory",
      label: "Verify recalled memory",
      detail: "Treat recalled memory as context, not proof, and check for stale or contradictory hints.",
      gate: "review",
    }),
    kindStep(suggestion.kind),
    buildTaskPlanStep({
      id: "operator-approval",
      label: "Wait for operator approval",
      detail: "No command execution, file mutation, graph mutation, or active task creation occurs automatically.",
      gate: "approval",
    }),
    buildTaskPlanStep({
      id: "copy-handoff",
      label: "Copy handoff",
      detail: "Operator may copy the preview prompt into chat or another review surface.",
      gate: "handoff",
    }),
  ];

  const preview: TaskPlanPreview = {
    id: buildTaskAutopilotStableKey("task-plan-preview", suggestion.id),
    suggestionId: suggestion.id,
    goal: suggestion.goal,
    taskKind: suggestion.kind,
    orderedSteps,
    filesToInspect: suggestion.impactedFiles,
    memoriesToVerify,
    testsToRun: testsToRun.length ? testsToRun : ["No automatic test execution; define validation during review."],
    approvalGates: [
      "Review queue acceptance is required before handoff.",
      "Safe Patch Preview is required before file mutation.",
      "Memory Review is required before memory promotion.",
      "Brain Merge Review is required before graph mutation.",
      "Command execution requires explicit approval outside Task Autopilot.",
    ],
    rollbackNotes: [
      "No rollback is needed for this preview because Task Autopilot does not mutate files or graph state.",
      "Discard the handoff prompt or reject the review item to stop the task.",
    ],
    handoffPrompt: "",
    noMutationGuarantee:
      "Task Autopilot produces deterministic suggestions, review states, plan previews, and copy-only handoff prompts. It does not run tasks.",
    summary: [
      "Plan preview generated without execution.",
      "No file mutation without preview and no command execution without approval.",
    ],
  };

  return { ...preview, handoffPrompt: buildTaskPromptHandoff(suggestion, preview) };
}

export function summarizeTaskPlanPreview(plan: TaskPlanPreview | null): string[] {
  if (!plan) return ["No plan preview selected."];
  return [
    `Plan preview for ${plan.taskKind} task has ${plan.orderedSteps.length} ordered steps.`,
    `${plan.filesToInspect.length} files to inspect and ${plan.memoriesToVerify.length} memories to verify.`,
    "Preview only; no mutation or execution.",
  ];
}
