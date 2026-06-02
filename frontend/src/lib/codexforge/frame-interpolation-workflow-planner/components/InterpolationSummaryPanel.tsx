"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { InterpolationSummary } from "../frame-interpolation-types";

export function InterpolationSummaryPanel({ summary }: { summary: InterpolationSummary }) {
  return (
    <PreviewFoundationCard title="Interpolation summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Interpolation should come after draft review so smoother motion is not applied to the wrong draft.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
