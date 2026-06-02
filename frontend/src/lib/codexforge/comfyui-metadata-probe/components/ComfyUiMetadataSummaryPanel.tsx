"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { ComfyUiMetadataSummary } from "../comfyui-metadata-probe-types";

export function ComfyUiMetadataSummaryPanel({ summary }: { summary: ComfyUiMetadataSummary }) {
  return (
    <PreviewFoundationCard title="Metadata readiness summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Unknown means no live metadata has been supplied yet. Unknown does not mean a workflow ran.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
