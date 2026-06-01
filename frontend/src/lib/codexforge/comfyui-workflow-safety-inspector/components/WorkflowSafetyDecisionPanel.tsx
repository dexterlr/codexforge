"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { WorkflowSafetyDecision } from "../comfyui-workflow-safety-types";

export function WorkflowSafetyDecisionPanel({ decision }: { decision: WorkflowSafetyDecision }) {
  return (
    <PreviewFoundationCard title="Safety decision">
      <PreviewFoundationCopy>{decision.label}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{decision.explanation}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`Status: ${decision.status}`, "Approval required", "No render button"]} />
    </PreviewFoundationCard>
  );
}
