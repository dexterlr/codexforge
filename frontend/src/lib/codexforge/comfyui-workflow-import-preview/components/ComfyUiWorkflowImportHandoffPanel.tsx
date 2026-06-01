"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { ComfyUiWorkflowImportHandoff } from "../comfyui-workflow-import-types";

export function ComfyUiWorkflowImportHandoffPanel({ handoff }: { handoff: ComfyUiWorkflowImportHandoff }) {
  return (
    <PreviewFoundationCard title="Copy import handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
