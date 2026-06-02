"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoDraftInputReview } from "../local-video-draft-types";

export function VideoDraftInputReviewPanel({ review }: { review: VideoDraftInputReview }) {
  return (
    <PreviewFoundationCard title="Input review">
      <PreviewFoundationCopy>{review.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          `prompt ready: ${review.promptReady}`,
          `storyboard ready: ${review.storyboardReady}`,
          `keyframes ready: ${review.keyframesReady}`,
          `workflow ready: ${review.workflowReady}`,
        ]}
      />
    </PreviewFoundationCard>
  );
}
