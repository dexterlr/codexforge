import type { InterpolationRiskReview } from "./frame-interpolation-types";

export function buildInterpolationRiskReview(input: Partial<InterpolationRiskReview> = {}): InterpolationRiskReview {
  return {
    id: input.id ?? "interpolation-risk-review",
    artifactRisk: input.artifactRisk ?? "medium artifact risk until source motion is reviewed",
    flickerRisk: input.flickerRisk ?? "flicker risk should be checked around fast cuts and bright flashes",
    safeReviewNotes:
      input.safeReviewNotes ??
      [
        "review source quality first",
        "avoid smoothing broken motion",
        "keep duration unchanged unless approved",
        "future approved execution required",
        "no-auto-run guarantee",
      ],
  };
}
