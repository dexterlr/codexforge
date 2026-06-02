"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { VideoProjectWorkspaceSummary } from "../video-project-workspace-types";

export function VideoProjectWorkspaceSummaryPanel({ summary }: { summary: VideoProjectWorkspaceSummary }) {
  return (
    <PreviewFoundationCard title="Workspace summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Latest version, missing assets, and export readiness are review labels only until future approved persistence exists.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
