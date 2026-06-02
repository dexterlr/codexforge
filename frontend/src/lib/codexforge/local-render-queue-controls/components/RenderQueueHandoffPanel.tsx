"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { RenderQueueHandoff } from "../local-render-queue-types";

export function RenderQueueHandoffPanel({ handoff }: { handoff: RenderQueueHandoff }) {
  return (
    <PreviewFoundationCard title="Copy queue handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
