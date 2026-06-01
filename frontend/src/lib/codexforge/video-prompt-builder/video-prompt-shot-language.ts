import type { VideoPromptShotLanguage } from "./video-prompt-builder-types";

export function buildVideoPromptShotLanguage(): VideoPromptShotLanguage {
  return {
    cameraMovement: "slow push-in, locked horizon, no sudden zooms",
    framing: "medium-wide opening frame, then a readable subject-focused frame",
    subjectMovement: "one clear motion that can be checked in a storyboard first",
  };
}
