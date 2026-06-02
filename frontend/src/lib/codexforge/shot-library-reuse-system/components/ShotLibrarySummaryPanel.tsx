"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { ShotLibrarySummary } from "../shot-library-types";

export function ShotLibrarySummaryPanel({ summary }: { summary: ShotLibrarySummary }) {
  return (
    <PreviewFoundationCard title="Shot library summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>
        What can be reused is the shot pattern: framing, movement, duration, keyframe need, and continuity notes.
      </PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
