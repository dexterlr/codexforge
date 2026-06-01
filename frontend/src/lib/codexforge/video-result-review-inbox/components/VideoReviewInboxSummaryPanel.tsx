"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { VideoReviewInboxSummary } from "../video-review-inbox-types";

export function VideoReviewInboxSummaryPanel({ summary }: { summary: VideoReviewInboxSummary }) {
  return (
    <PreviewFoundationCard title="Video review summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>No generated results are shown until future artifacts are supplied by a guarded source.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
