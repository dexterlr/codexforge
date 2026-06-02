import type { UpscaleSourceReview } from "./local-upscale-workflow-types";

export function buildUpscaleSourceReview(input: Partial<UpscaleSourceReview> = {}): UpscaleSourceReview {
  return {
    id: input.id ?? "upscale-source-review",
    draftSelected: input.draftSelected ?? false,
    sourceResolution: input.sourceResolution ?? "draft resolution not supplied yet",
    reviewStatus: input.reviewStatus ?? "review required before final-quality planning",
    plainEnglish:
      input.plainEnglish ??
      "Upscaling means taking a draft that already exists and planning a higher-resolution version. The draft should be reviewed first so weak motion or wrong content is not polished by accident.",
  };
}
