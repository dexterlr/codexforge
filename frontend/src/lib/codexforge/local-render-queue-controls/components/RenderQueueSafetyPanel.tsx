"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { RenderQueueSafety } from "../local-render-queue-types";

export function RenderQueueSafetyPanel({ safety }: { safety: RenderQueueSafety }) {
  return (
    <PreviewFoundationCard title="Queue safety">
      <PreviewFoundationPillList items={safety.notes} />
      <PreviewFoundationCopy>{safety.blocked}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
