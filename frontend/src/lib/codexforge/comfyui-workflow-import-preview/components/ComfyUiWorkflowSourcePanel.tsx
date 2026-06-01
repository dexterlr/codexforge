"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiWorkflowSource } from "../comfyui-workflow-import-types";

export function ComfyUiWorkflowSourcePanel({ sources }: { sources: ComfyUiWorkflowSource[] }) {
  return (
    <PreviewFoundationCard title="Workflow sources">
      <PreviewFoundationCopy>A source is where the workflow description comes from. Import preview means reviewing the source metadata without executing it.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={sources.map((source) => source.label)} />
    </PreviewFoundationCard>
  );
}
