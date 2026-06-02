"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { ArtifactCaptureSummary } from "../local-video-artifact-capture-types";

export function ArtifactCaptureSummaryPanel({ summary }: { summary: ArtifactCaptureSummary }) {
  return (
    <PreviewFoundationCard title="Artifact capture MVP summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
