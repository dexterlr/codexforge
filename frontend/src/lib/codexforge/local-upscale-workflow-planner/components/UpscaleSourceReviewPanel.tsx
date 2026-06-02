"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { UpscaleSourceReview } from "../local-upscale-workflow-types";

export function UpscaleSourceReviewPanel({ sourceReview }: { sourceReview: UpscaleSourceReview }) {
  return (
    <PreviewFoundationCard title="Source draft review">
      <PreviewFoundationCopy>{sourceReview.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          sourceReview.draftSelected ? "Draft selected" : "Draft still needs selection",
          sourceReview.sourceResolution,
          sourceReview.reviewStatus,
        ]}
      />
    </PreviewFoundationCard>
  );
}
