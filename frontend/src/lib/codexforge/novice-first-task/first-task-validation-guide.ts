import type { FirstTaskValidationGuide } from "./novice-first-task-types";

export function buildFirstTaskValidationGuide(): FirstTaskValidationGuide {
  return {
    title: "Validate separately",
    meaning: "Validation means checks you run after a change. CodexForge does not auto-run them here.",
    checklist: ["Run checks yourself", "Paste the output", "Mark pass, fail, or unknown", "Use recovery if needed"],
  };
}
