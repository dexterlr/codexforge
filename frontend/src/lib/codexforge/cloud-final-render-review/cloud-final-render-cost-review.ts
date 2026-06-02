import type { CloudFinalRenderCostReview } from "./cloud-final-render-types";

export function buildCloudFinalRenderCostReview(
  input: Partial<CloudFinalRenderCostReview> = {}
): CloudFinalRenderCostReview {
  return {
    id: input.id ?? "cloud-final-render-cost-review",
    risk: input.risk ?? "credit-based",
    plainEnglish:
      input.plainEnglish ??
      "Cloud final renders may use credits or paid subscription limits. No credits are spent in this review.",
    requiredBeforeHandoff:
      input.requiredBeforeHandoff ??
      ["confirm budget", "confirm retry limit", "confirm final render is worth paid quality"],
  };
}
