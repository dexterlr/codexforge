import type { ShotReusePlan, ShotTemplate } from "./shot-library-types";
import { buildDefaultShotTemplates } from "./shot-template";

export function buildShotReusePlan(templates: ShotTemplate[] = buildDefaultShotTemplates()): ShotReusePlan {
  return {
    id: "shot-reuse-plan-001",
    reusablePlanSteps: templates.map((template) => `Reuse ${template.label} as a storyboard or local draft shot template.`),
    reviewSteps: [
      "Pick a shot template that matches the goal.",
      "Review duration hint, keyframe need, and continuity notes.",
      "Copy the shot handoff into a storyboard or local video draft request.",
      "Keep this as a plan template, not a generation command.",
    ],
  };
}
