"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { VideoArtifactGallerySummary } from "../local-video-artifact-types";

export function VideoArtifactGallerySummaryPanel({ summary }: { summary: VideoArtifactGallerySummary }) {
  return (
    <PreviewFoundationCard title="Artifact gallery summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Generated videos will appear later only after a safe artifact path exists.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
