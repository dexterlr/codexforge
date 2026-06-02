"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { StylePresetReuse } from "../style-preset-types";

export function StylePresetReusePanel({ reuse }: { reuse: StylePresetReuse }) {
  return (
    <PreviewFoundationCard title="Reuse guidance">
      <PreviewFoundationCopy>Reuse the style direction, then review the final prompt before any separate creative workflow.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[...reuse.allowedReuse, ...reuse.reviewNeeded]} />
    </PreviewFoundationCard>
  );
}
