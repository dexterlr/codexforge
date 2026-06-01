"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { WorkflowSafetySummary } from "../comfyui-workflow-safety-types";

export function WorkflowSafetySummaryPanel({ summary }: { summary: WorkflowSafetySummary }) {
  return (
    <PreviewFoundationCard title="Workflow safety summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>The inspector helps decide whether a workflow can proceed to parameter mapping or needs more review.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
