"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudFinalRenderCostReview } from "../cloud-final-render-types";

export function CloudFinalRenderCostReviewPanel({ costReview }: { costReview: CloudFinalRenderCostReview }) {
  return (
    <PreviewFoundationCard title="Cost review">
      <PreviewFoundationCopy>{costReview.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`Risk: ${costReview.risk}`, ...costReview.requiredBeforeHandoff]} />
    </PreviewFoundationCard>
  );
}
