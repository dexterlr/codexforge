import type { VideoPromptIntent, VideoPromptStyle } from "./video-prompt-builder-types";

export function buildVideoPromptStyle(intent: VideoPromptIntent): VideoPromptStyle {
  return {
    style: intent.promptType === "cinematic product shot" ? "clean cinematic product lighting" : "clear practical video draft style",
    lighting: "soft directional light with readable subject details",
    mood: "focused, calm, and easy to review",
  };
}
