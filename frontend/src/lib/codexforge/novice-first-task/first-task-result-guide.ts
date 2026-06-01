import type { FirstTaskResultGuide } from "./novice-first-task-types";

export function buildFirstTaskResultGuide(): FirstTaskResultGuide {
  return {
    title: "Review outcome",
    meaning: "The result is your calm summary of what changed and what the checks said.",
    checklist: ["Record the file", "Record the wording change", "Record validation", "Save recovery notes if anything failed"],
  };
}
