import type { UpscaleTargetProfile } from "./local-upscale-workflow-types";

export function buildUpscaleTargetProfile(input: Partial<UpscaleTargetProfile> = {}): UpscaleTargetProfile {
  return {
    id: input.id ?? "upscale-target-profile",
    targetResolution: input.targetResolution ?? "1920x1080 final candidate",
    qualityTarget: input.qualityTarget ?? "balanced",
    plainEnglish:
      input.plainEnglish ??
      "A safe target profile picks the final size and quality level before any file changes. Bigger targets can look better but usually take longer on the local GPU.",
  };
}
