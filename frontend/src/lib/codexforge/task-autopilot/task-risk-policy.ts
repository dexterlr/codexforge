import type {
  TaskAutopilotRiskPolicy,
  TaskPolicyDecision,
  TaskSafeNextAction,
  TaskSuggestion,
} from "./task-autopilot-types";

export function buildTaskAutopilotRiskPolicy(): TaskAutopilotRiskPolicy {
  return {
    id: "task-autopilot-risk-policy",
    autoRunAllowed: false,
    autoFileWriteAllowed: false,
    directGraphMutationAllowed: false,
    allTasksRequireReview: true,
    rules: [
      {
        id: "no-auto-run",
        label: "No auto-run",
        state: "block",
        detail: "Task Autopilot never executes suggested tasks or shell commands.",
      },
      {
        id: "no-file-mutation",
        label: "No file mutation without preview",
        state: "block",
        detail: "Source file changes require Safe Patch Preview and explicit operator approval.",
      },
      {
        id: "no-direct-graph-mutation",
        label: "No direct graph mutation",
        state: "block",
        detail: "Memory and Brain graph changes must route through Memory Review and Brain Merge Review.",
      },
      {
        id: "patch-preview-route",
        label: "Patch tasks route to Safe Patch Preview",
        state: "route-review",
        detail: "Prepare-patch and fix tasks can only produce preview plans.",
      },
      {
        id: "memory-review-route",
        label: "Memory tasks route to Memory Review",
        state: "route-review",
        detail: "Promote-memory suggestions require visible Memory Review before persistence or merge.",
      },
      {
        id: "creative-preview-only",
        label: "Creative execution stays preview-only",
        state: "allow-preview",
        detail: "Creative planning can create briefs and handoff prompts, not execution.",
      },
    ],
    blockedCapabilities: [
      "broker execution",
      "pc-control",
      "camera-control",
      "diff application",
      "command runner",
      "direct graph write",
    ],
    summary: [
      "All suggested tasks are review required.",
      "Policy blocks auto-run, direct graph mutation, and file mutation without preview.",
      "Patch tasks route to Safe Patch Preview; memory tasks route to Memory Review; merge tasks require Brain Merge Review.",
    ],
  };
}

export function isTaskSuggestionAllowed(
  suggestion: TaskSuggestion,
  policy: TaskAutopilotRiskPolicy = buildTaskAutopilotRiskPolicy()
): TaskPolicyDecision {
  if (!policy.autoRunAllowed && suggestion.safeNextAction === "blocked") {
    return { allowed: false, safeNextAction: "blocked", reason: "Suggestion is blocked by risk policy." };
  }

  const nextAction: TaskSafeNextAction =
    suggestion.kind === "prepare-patch" || suggestion.kind === "fix"
      ? "open-safe-patch-preview"
      : suggestion.kind === "promote-memory"
        ? "open-memory-review"
        : suggestion.title.toLowerCase().includes("merge")
          ? "open-brain-merge-review"
          : "preview-plan";

  return {
    allowed: true,
    safeNextAction: nextAction,
    reason: "Allowed only as a visible review item and preview plan.",
  };
}

export function summarizeTaskAutopilotRiskPolicy(
  policy: TaskAutopilotRiskPolicy = buildTaskAutopilotRiskPolicy()
): string[] {
  return [
    policy.autoRunAllowed ? "Auto-run allowed." : "Policy blocks auto-run.",
    policy.autoFileWriteAllowed ? "File writes allowed." : "Policy blocks file mutation without preview.",
    policy.directGraphMutationAllowed ? "Graph mutation allowed." : "Policy blocks direct graph mutation.",
    "Every task suggestion remains review required before handoff.",
  ];
}
