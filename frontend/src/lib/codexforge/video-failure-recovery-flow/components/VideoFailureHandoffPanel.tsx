"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { VideoFailureHandoff } from "../video-failure-recovery-types";

export function VideoFailureHandoffPanel({ handoff }: { handoff: VideoFailureHandoff }) {
  return (
    <PreviewFoundationCard title="Copy recovery handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
