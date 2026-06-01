import type {
  VideoPromptHandoff,
  VideoPromptNegativeGuidance,
  VideoPromptShotLanguage,
  VideoPromptStructure,
  VideoPromptStyle,
} from "./video-prompt-builder-types";

export function buildVideoPromptHandoff(
  structure: VideoPromptStructure,
  style: VideoPromptStyle,
  shotLanguage: VideoPromptShotLanguage,
  negativeGuidance: VideoPromptNegativeGuidance
): VideoPromptHandoff {
  const prompt = `${structure.subject} in ${structure.scene}. Style: ${style.style}. Camera movement: ${shotLanguage.cameraMovement}. Lighting: ${style.lighting}. Mood: ${style.mood}. Duration target: ${structure.durationTarget}. Motion notes: ${structure.motionNotes}. Avoid: ${negativeGuidance.thingsToAvoid.join(", ")}.`;
  return {
    prompt,
    storyboardHandoff: `Storyboard next: split "${structure.subject}" into opening, main action, detail, and closing shots before any render.`,
    nextStep: "Copy this into the storyboard planner. Nothing is generated yet.",
  };
}
