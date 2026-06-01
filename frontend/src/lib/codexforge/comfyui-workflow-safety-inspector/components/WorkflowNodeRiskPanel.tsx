"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { WorkflowNodeRisk } from "../comfyui-workflow-safety-types";

export function WorkflowNodeRiskPanel({ risks }: { risks: WorkflowNodeRisk[] }) {
  return (
    <PreviewFoundationCard title="Node risks">
      <PreviewFoundationCopy>Custom or unsupported nodes are not automatically trusted. They need a name, purpose, and review.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={risks.map((risk) => `${risk.nodeType}: ${risk.riskLabel}`)} />
    </PreviewFoundationCard>
  );
}
