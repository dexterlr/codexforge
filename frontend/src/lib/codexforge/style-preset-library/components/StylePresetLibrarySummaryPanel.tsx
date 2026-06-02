"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { StylePresetLibrarySummary } from "../style-preset-types";

export function StylePresetLibrarySummaryPanel({ summary }: { summary: StylePresetLibrarySummary }) {
  return (
    <PreviewFoundationCard title="Style preset library summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>
        A style preset is a reusable visual direction for prompts, keyframes, and drafts. It does not generate anything by itself.
      </PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
