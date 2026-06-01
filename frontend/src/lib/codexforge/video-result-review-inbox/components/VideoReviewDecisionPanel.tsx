"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoReviewDecision } from "../video-review-inbox-types";

export function VideoReviewDecisionPanel({ decisions }: { decisions: VideoReviewDecision[] }) {
  return (
    <PreviewFoundationCard title="Review decisions">
      <PreviewFoundationCopy>Decisions are manual labels: keep, retry, compare, upscale later, interpolate later, recovery, or final candidate.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={decisions.map((decision) => `${decision.decision}: ${decision.plainEnglish}`)} />
    </PreviewFoundationCard>
  );
}
