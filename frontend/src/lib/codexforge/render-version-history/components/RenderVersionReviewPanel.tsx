"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { RenderVersionReview } from "../render-version-history-types";

export function RenderVersionReviewPanel({ reviews }: { reviews: RenderVersionReview[] }) {
  return (
    <PreviewFoundationCard title="Review status">
      <PreviewFoundationCopy>Review status explains keep, retry, needs review, not selected, or handoff only.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={reviews.map((review) => `${review.versionId}: ${review.decision}`)} />
    </PreviewFoundationCard>
  );
}
