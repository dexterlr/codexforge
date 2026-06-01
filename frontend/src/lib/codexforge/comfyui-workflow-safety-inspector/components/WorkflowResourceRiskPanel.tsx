"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { WorkflowResourceRisk } from "../comfyui-workflow-safety-types";

export function WorkflowResourceRiskPanel({ risks }: { risks: WorkflowResourceRisk[] }) {
  return (
    <PreviewFoundationCard title="Resource risks">
      <PreviewFoundationCopy>Resolution, duration, frame count, and batch size affect local time, heat, and memory pressure.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={risks.map((risk) => `${risk.resource}: ${risk.riskLabel}`)} />
    </PreviewFoundationCard>
  );
}
