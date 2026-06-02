import type { CreativeCloudFallbackPolicy } from "./creative-cost-saver-types";

export function buildCreativeCloudFallbackPolicy(input: Partial<CreativeCloudFallbackPolicy> = {}): CreativeCloudFallbackPolicy {
  return {
    id: input.id ?? "creative-cloud-fallback-policy",
    allowedWhen:
      input.allowedWhen ??
      [
        "the local draft is reviewed and worth finishing",
        "local upscale or interpolation cannot meet the target",
        "the operator chooses cloud as a manual later step",
      ],
    blockedUntil:
      input.blockedUntil ??
      "Cloud fallback stays blocked until review, explicit approval, and an approved execution path exist.",
    plainEnglish:
      input.plainEnglish ??
      "Cloud final renders are optional later. This page only explains when they might be worth it.",
  };
}
