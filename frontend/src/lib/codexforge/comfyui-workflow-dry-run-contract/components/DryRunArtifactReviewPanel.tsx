"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DryRunArtifactReview } from "../comfyui-dry-run-types";

export function DryRunArtifactReviewPanel({ review }: { review: DryRunArtifactReview }) {
  return (
    <PreviewFoundationCard title="Artifact review">
      <PreviewFoundationCopy>{review.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={review.checks} />
    </PreviewFoundationCard>
  );
}
