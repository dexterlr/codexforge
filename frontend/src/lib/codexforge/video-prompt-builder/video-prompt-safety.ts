import type { VideoPromptSafety } from "./video-prompt-builder-types";

export function buildVideoPromptSafety(): VideoPromptSafety {
  return {
    localDraftSuitability: "Suitable for a short local draft later after storyboard and keyframe review.",
    nothingGeneratedYet: true,
    providerCallsAllowed: false,
    comfyUiCallsAllowed: false,
    cloudSpendAllowed: false,
  };
}
