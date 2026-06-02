import type { CloudFinalRenderPrivacyReview } from "./cloud-final-render-types";

export function buildCloudFinalRenderPrivacyReview(
  input: Partial<CloudFinalRenderPrivacyReview> = {}
): CloudFinalRenderPrivacyReview {
  return {
    id: input.id ?? "cloud-final-render-privacy-review",
    risk: input.risk ?? "needs-review",
    plainEnglish:
      input.plainEnglish ??
      "Prompts, files, images, references, and private assets need review before any future manual cloud handoff.",
    requiredBeforeHandoff:
      input.requiredBeforeHandoff ??
      ["remove secrets", "review private faces/brands/files", "confirm only approved prompt and asset notes are copied"],
  };
}
