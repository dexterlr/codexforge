"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoDraftComparison } from "../video-draft-comparison-types";

export function VideoDraftComparisonPanel({ comparison }: { comparison: VideoDraftComparison }) {
  return (
    <PreviewFoundationCard title="Comparison categories">
      <PreviewFoundationCopy>Compare drafts by prompt, workflow, keyframes, duration, quality, artifacts, cost posture, and next action.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={comparison.categories} />
    </PreviewFoundationCard>
  );
}
