import type { FirstTaskPreviewGuide } from "./novice-first-task-types";

export function buildFirstTaskPreviewGuide(): FirstTaskPreviewGuide {
  return {
    title: "Preview first",
    meaning: "Preview means you can read the proposed wording change before anything is changed.",
    checklist: ["One file only", "Wording only", "No package or runtime file", "No auto-apply"],
  };
}
