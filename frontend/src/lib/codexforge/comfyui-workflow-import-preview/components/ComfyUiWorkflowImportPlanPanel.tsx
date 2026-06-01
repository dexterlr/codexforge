"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ComfyUiWorkflowImportPlan } from "../comfyui-workflow-import-types";

export function ComfyUiWorkflowImportPlanPanel({ plan }: { plan: ComfyUiWorkflowImportPlan }) {
  return (
    <PreviewFoundationCard title="Import preview plan">
      <PreviewFoundationCopy>These are review steps only. They explain what will be checked before the workflow can move forward.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={plan.steps} />
    </PreviewFoundationCard>
  );
}
