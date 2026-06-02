"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { InterpolationRiskReview } from "../frame-interpolation-types";

export function InterpolationRiskReviewPanel({ risk }: { risk: InterpolationRiskReview }) {
  return (
    <PreviewFoundationCard title="Motion risk review">
      <PreviewFoundationCopy>{risk.artifactRisk}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{risk.flickerRisk}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={risk.safeReviewNotes} />
    </PreviewFoundationCard>
  );
}
