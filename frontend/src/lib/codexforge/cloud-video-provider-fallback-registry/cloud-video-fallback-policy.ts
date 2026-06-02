import type { CloudVideoFallbackPolicy } from "./cloud-video-provider-types";

export function buildCloudVideoFallbackPolicy(
  input: Partial<CloudVideoFallbackPolicy> = {}
): CloudVideoFallbackPolicy {
  return {
    id: input.id ?? "cloud-video-fallback-policy",
    allowedWhen:
      input.allowedWhen ??
      [
        "local generation has been reviewed first",
        "local final quality is not good enough",
        "the provider capability is specific and worth paying for",
        "the operator approves a manual cloud review",
      ],
    blockedUntil:
      input.blockedUntil ??
      "Cloud fallback stays blocked until cost, privacy, prompt, asset, and final render review are complete.",
    plainEnglish:
      input.plainEnglish ??
      "Local generation saves money. Cloud is only a reviewed option for final quality later.",
    noAutoSubmitGuarantee: true,
  };
}
