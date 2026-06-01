"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { VideoReviewHandoff } from "../video-review-inbox-types";

export function VideoReviewHandoffPanel({ handoff }: { handoff: VideoReviewHandoff }) {
  return (
    <PreviewFoundationCard title="Copy review note">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
