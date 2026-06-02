"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DryRunParameterReview } from "../comfyui-dry-run-types";

export function DryRunParameterReviewPanel({ review }: { review: DryRunParameterReview }) {
  return (
    <PreviewFoundationCard title="Parameter review">
      <PreviewFoundationCopy>{review.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={review.checks} />
    </PreviewFoundationCard>
  );
}
