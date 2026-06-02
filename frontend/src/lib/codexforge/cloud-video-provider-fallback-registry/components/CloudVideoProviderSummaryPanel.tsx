"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudVideoProviderSummary } from "../cloud-video-provider-types";

export function CloudVideoProviderSummaryPanel({ summary }: { summary: CloudVideoProviderSummary }) {
  return (
    <PreviewFoundationCard title="Registry summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          `${summary.providerCount} fallback profile(s)`,
          `${summary.reviewedFallbackCount} review-only option(s)`,
          `${summary.highRiskCount} credit-risk option(s)`,
        ]}
      />
      <PreviewFoundationCopy>{summary.recommendedFirstStep}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
