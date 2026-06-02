"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudFinalRenderSummary } from "../cloud-final-render-types";

export function CloudFinalRenderSummaryPanel({ summary }: { summary: CloudFinalRenderSummary }) {
  return (
    <PreviewFoundationCard title="Review summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          summary.request.providerOption,
          summary.readiness.status,
          summary.costReview.risk,
          summary.privacyReview.risk,
        ]}
      />
    </PreviewFoundationCard>
  );
}
