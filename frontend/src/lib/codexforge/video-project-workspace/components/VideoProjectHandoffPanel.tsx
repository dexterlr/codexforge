"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoProjectHandoff } from "../video-project-workspace-types";

export function VideoProjectHandoffPanel({ handoff }: { handoff: VideoProjectHandoff }) {
  return (
    <PreviewFoundationCard title="Copy project handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={handoff.packet} />
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
