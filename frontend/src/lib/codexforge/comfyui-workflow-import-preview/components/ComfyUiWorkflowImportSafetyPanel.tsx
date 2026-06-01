"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiWorkflowImportSafety } from "../comfyui-workflow-import-types";

export function ComfyUiWorkflowImportSafetyPanel({ safety }: { safety: ComfyUiWorkflowImportSafety }) {
  return (
    <PreviewFoundationCard title="Import safety">
      <PreviewFoundationCopy>{safety.label}: safe summary first, raw JSON secondary, and no workflow execution.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["No ComfyUI API call", "No asset download", "No prompt sent", "No workflow run"]} />
    </PreviewFoundationCard>
  );
}
