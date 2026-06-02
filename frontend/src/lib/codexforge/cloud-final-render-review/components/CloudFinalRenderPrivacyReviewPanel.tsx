"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudFinalRenderPrivacyReview } from "../cloud-final-render-types";

export function CloudFinalRenderPrivacyReviewPanel({ privacyReview }: { privacyReview: CloudFinalRenderPrivacyReview }) {
  return (
    <PreviewFoundationCard title="Privacy review">
      <PreviewFoundationCopy>{privacyReview.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`Risk: ${privacyReview.risk}`, ...privacyReview.requiredBeforeHandoff]} />
    </PreviewFoundationCard>
  );
}
