"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { StylePresetHandoff } from "../style-preset-types";

export function StylePresetHandoffPanel({ handoff }: { handoff: StylePresetHandoff }) {
  return (
    <PreviewFoundationCard title="Style handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[handoff.handoffText]} />
    </PreviewFoundationCard>
  );
}
