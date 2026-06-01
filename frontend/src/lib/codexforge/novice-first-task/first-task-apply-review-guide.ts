import type { FirstTaskApplyReviewGuide } from "./novice-first-task-types";

export function buildFirstTaskApplyReviewGuide(): FirstTaskApplyReviewGuide {
  return {
    title: "Review apply request",
    meaning: "Apply means a file may change. CodexForge keeps that behind approval.",
    checklist: ["Read the diff", "Check the file path", "Confirm rollback notes", "Approval required"],
  };
}
