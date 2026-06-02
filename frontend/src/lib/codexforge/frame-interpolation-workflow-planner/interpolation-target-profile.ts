import type { InterpolationTargetProfile } from "./frame-interpolation-types";

export function buildInterpolationTargetProfile(input: Partial<InterpolationTargetProfile> = {}): InterpolationTargetProfile {
  return {
    id: input.id ?? "interpolation-target-profile",
    targetFps: input.targetFps ?? "30 fps final candidate",
    smoothnessTarget: input.smoothnessTarget ?? "natural",
    outputDuration: input.outputDuration ?? "same duration as the reviewed draft",
    plainEnglish:
      input.plainEnglish ??
      "A target FPS describes how many frames are planned per second. Higher FPS can feel smoother, but it can also reveal artifacts or make motion look unnatural.",
  };
}
