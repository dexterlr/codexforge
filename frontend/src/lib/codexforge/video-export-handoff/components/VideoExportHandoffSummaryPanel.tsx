"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { VideoExportHandoffSummary } from "../video-export-handoff-types";

export function VideoExportHandoffSummaryPanel({ summary }: { summary: VideoExportHandoffSummary }) {
  return (
    <PreviewFoundationCard title="Export handoff summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Copy export packet allowed; real export, upload, and file write remain manual or future-approved.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
