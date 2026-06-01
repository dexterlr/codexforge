"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { WorkflowOutputRisk } from "../comfyui-workflow-safety-types";

export function WorkflowOutputRiskPanel({ risks }: { risks: WorkflowOutputRisk[] }) {
  return (
    <PreviewFoundationCard title="Output risks">
      <PreviewFoundationCopy>Future artifacts should have a clear destination so review and recovery are easy later.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={risks.map((risk) => `${risk.destination}: ${risk.riskLabel}`)} />
    </PreviewFoundationCard>
  );
}
