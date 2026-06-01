"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { ComfyUiWorkflowImportSummary } from "../comfyui-workflow-import-types";

export function ComfyUiWorkflowImportSummaryPanel({ summary }: { summary: ComfyUiWorkflowImportSummary }) {
  return (
    <PreviewFoundationCard title="Safe import summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>A beginner can read what the workflow contains before it reaches safety inspection or parameter mapping.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
