"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CreativePromptMemoryReview } from "../creative-prompt-memory-types";

export function CreativePromptMemoryReviewPanel({ review }: { review: CreativePromptMemoryReview }) {
  return (
    <PreviewFoundationCard title="Review first">
      <PreviewFoundationCopy>{review.approvalReminder}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[...review.statuses, ...review.reviewSteps]} />
    </PreviewFoundationCard>
  );
}
