import type { InterpolationSourceReview } from "./frame-interpolation-types";

export function buildInterpolationSourceReview(input: Partial<InterpolationSourceReview> = {}): InterpolationSourceReview {
  return {
    id: input.id ?? "interpolation-source-review",
    sourceQuality: input.sourceQuality ?? "source draft quality not verified yet",
    motionNotes: input.motionNotes ?? "fast motion, flicker, and cuts should be checked before smoothing",
    plainEnglish:
      input.plainEnglish ??
      "Frame interpolation means planning extra in-between frames so motion can look smoother. It cannot fix a bad draft, so review the source first.",
  };
}
