import type { VideoPromptNegativeGuidance } from "./video-prompt-builder-types";

export function buildVideoPromptNegativeGuidance(): VideoPromptNegativeGuidance {
  return {
    thingsToAvoid: ["flicker", "extra limbs", "unreadable text", "fast cuts", "camera shake", "cloud-only assumptions"],
    plainEnglish: "The avoid list keeps the future local draft short, readable, and easier to fix.",
  };
}
