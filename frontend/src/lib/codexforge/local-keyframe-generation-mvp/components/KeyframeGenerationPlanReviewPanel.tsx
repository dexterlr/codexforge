"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { KeyframeGenerationPlanReview } from "../local-keyframe-generation-types";

export function KeyframeGenerationPlanReviewPanel({ review }: { review: KeyframeGenerationPlanReview }) {
  return (
    <PreviewFoundationCard title="Plan review">
      <PreviewFoundationCopy>{review.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`plan: ${review.planId}`, `selected shots: ${review.selectedShotCount}`, review.nextStep]} />
    </PreviewFoundationCard>
  );
}
