import type { AssistedCodingGoal, AssistedCodingGoalId, AssistedCodingNeed } from "./assisted-coding-mode-types";

const goalNeeds: Record<AssistedCodingGoalId, AssistedCodingNeed> = {
  "small-ui-issue": "file",
  wording: "patch-preview",
  "review-patch": "apply-review",
  "capture-validation": "validation-result",
  "recover-validation": "failure-recovery",
  "prepare-demo": "demo",
  "understand-safe": "none",
};

export function buildAssistedCodingGoal(id: AssistedCodingGoalId, title: string, plainEnglish: string): AssistedCodingGoal {
  return { id, title, plainEnglish, need: goalNeeds[id] };
}

export function buildDefaultAssistedCodingGoals(): AssistedCodingGoal[] {
  return [
    buildAssistedCodingGoal("small-ui-issue", "Fix a small UI issue", "Pick one safe file before any patch preview."),
    buildAssistedCodingGoal("wording", "Improve wording", "Preview the copy change before review."),
    buildAssistedCodingGoal("review-patch", "Review a patch", "Use guarded apply review; approval stays separate."),
    buildAssistedCodingGoal("capture-validation", "Capture validation output", "Paste validation output after the manual run."),
    buildAssistedCodingGoal("recover-validation", "Recover from failed validation", "Route the failure into a calm recovery step."),
    buildAssistedCodingGoal("prepare-demo", "Prepare a demo", "Open the demo flow after evidence is clear."),
    buildAssistedCodingGoal("understand-safe", "Understand what is safe", "Read the safety promise before choosing a task."),
  ];
}
