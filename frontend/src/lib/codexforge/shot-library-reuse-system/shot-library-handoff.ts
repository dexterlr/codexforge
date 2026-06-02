import type { ShotLibraryHandoff, ShotTemplate } from "./shot-library-types";
import { buildDefaultShotTemplates } from "./shot-template";

export function buildShotLibraryHandoff(templates: ShotTemplate[] = buildDefaultShotTemplates()): ShotLibraryHandoff {
  return {
    id: "shot-library-handoff-001",
    copyLabel: "Copy shot handoff allowed",
    handoffText: templates
      .map(
        (template) =>
          `${template.label}: visual description ${template.visualDescription}; camera movement ${template.cameraMovement}; subject movement ${template.subjectMovement}; duration hint ${template.durationHint}; keyframe need ${template.keyframeNeed}.`
      )
      .join(" "),
  };
}
