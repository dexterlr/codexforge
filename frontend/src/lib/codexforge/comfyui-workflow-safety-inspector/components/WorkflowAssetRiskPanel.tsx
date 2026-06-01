"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { WorkflowAssetRisk } from "../comfyui-workflow-safety-types";

export function WorkflowAssetRiskPanel({ risks }: { risks: WorkflowAssetRisk[] }) {
  return (
    <PreviewFoundationCard title="Asset risks">
      <PreviewFoundationCopy>Models, input images, and external references are only listed. They are not opened or downloaded.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={risks.map((risk) => `${risk.asset}: ${risk.riskLabel}`)} />
    </PreviewFoundationCard>
  );
}
