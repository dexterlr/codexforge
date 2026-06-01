"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { WorkflowSafetyHandoff } from "../comfyui-workflow-safety-types";

export function WorkflowSafetyHandoffPanel({ handoff }: { handoff: WorkflowSafetyHandoff }) {
  return (
    <PreviewFoundationCard title="Copy safety handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
