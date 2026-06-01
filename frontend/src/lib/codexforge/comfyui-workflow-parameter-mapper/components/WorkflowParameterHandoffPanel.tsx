"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { WorkflowParameterHandoff } from "../workflow-parameter-types";

export function WorkflowParameterHandoffPanel({ handoff }: { handoff: WorkflowParameterHandoff }) {
  return (
    <PreviewFoundationCard title="Copy parameter handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
