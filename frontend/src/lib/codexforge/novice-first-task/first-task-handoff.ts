import type { FirstTaskHandoff } from "./novice-first-task-types";

export function buildFirstTaskHandoff(): FirstTaskHandoff {
  return {
    title: "Copy result handoff",
    copyText: "First safe task handoff: one wording-only file, preview reviewed, approval required before apply, evidence captured, validation run separately, result reviewed, recovery route ready if needed.",
    nextRoute: "/run-history",
  };
}
