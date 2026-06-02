"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoSafetyHandoff } from "../video-generation-safety-types";

export function VideoSafetyHandoffPanel({ handoff }: { handoff: VideoSafetyHandoff }) {
  return (
    <PreviewFoundationCard title="Copy safety audit handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={handoff.packet} />
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
