"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { InterpolationSourceReview } from "../frame-interpolation-types";

export function InterpolationSourceReviewPanel({ sourceReview }: { sourceReview: InterpolationSourceReview }) {
  return (
    <PreviewFoundationCard title="Source motion review">
      <PreviewFoundationCopy>{sourceReview.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[sourceReview.sourceQuality, sourceReview.motionNotes]} />
    </PreviewFoundationCard>
  );
}
