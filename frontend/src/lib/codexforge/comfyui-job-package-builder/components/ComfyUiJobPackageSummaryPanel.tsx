"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { ComfyUiJobPackageSummary } from "../comfyui-job-package-types";

export function ComfyUiJobPackageSummaryPanel({ summary }: { summary: ComfyUiJobPackageSummary }) {
  return (
    <PreviewFoundationCard title="Package summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Ready for future approved submit means reviewed and prepared, not executed.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
