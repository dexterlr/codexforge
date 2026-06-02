"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ArtifactCaptureReview } from "../local-video-artifact-capture-types";

export function ArtifactCaptureReviewPanel({ review }: { review: ArtifactCaptureReview }) {
  return (
    <PreviewFoundationCard title="Artifact review">
      <PreviewFoundationCopy>{review.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`status: ${review.status}`, "review required", review.nextStep]} />
    </PreviewFoundationCard>
  );
}
