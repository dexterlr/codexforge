"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { VideoArtifactHandoff } from "../local-video-artifact-types";

export function VideoArtifactHandoffPanel({ handoff }: { handoff: VideoArtifactHandoff }) {
  return (
    <PreviewFoundationCard title="Copy artifact handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
