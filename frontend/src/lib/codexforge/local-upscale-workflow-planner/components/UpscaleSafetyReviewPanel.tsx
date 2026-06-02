"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { UpscaleSafetyReview } from "../local-upscale-workflow-types";

export function UpscaleSafetyReviewPanel({ safety }: { safety: UpscaleSafetyReview }) {
  return (
    <PreviewFoundationCard title="Safety review">
      <PreviewFoundationCopy>Safe settings are reviewed before any future final-quality processing is approved.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={safety.safeSettings} />
    </PreviewFoundationCard>
  );
}
