"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DryRunPackageReview } from "../comfyui-dry-run-types";

export function DryRunPackageReviewPanel({ review }: { review: DryRunPackageReview }) {
  return (
    <PreviewFoundationCard title="Package review">
      <PreviewFoundationCopy>{review.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={review.checks} />
    </PreviewFoundationCard>
  );
}
