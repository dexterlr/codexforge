"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { RenderVersionHandoff } from "../render-version-history-types";

export function RenderVersionHandoffPanel({ handoff }: { handoff: RenderVersionHandoff }) {
  return (
    <PreviewFoundationCard title="Copy version handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={handoff.packet} />
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
