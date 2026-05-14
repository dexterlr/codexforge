"use client";

import { PreviewPlanListPanel } from "./PreviewPlanListPanel";
import type { ComfyUIWorkflowPlan } from "../creative-types";

export function ComfyUIWorkflowPanel({ plan }: { plan: ComfyUIWorkflowPlan }) {
  return (
    <PreviewPlanListPanel
      marker="comfyui"
      eyebrow="ComfyUI workflow plan"
      title="No ComfyUI execution"
      badge={plan.adapter}
      summary={plan.summary}
      groups={[
        ["Prompt nodes", plan.promptNodes],
        ["Model", [plan.modelCheckpointPlaceholder]],
        ["Sampler", [plan.samplerPlaceholder]],
        ["Seed policy", [plan.seedPolicy]],
        ["Input assets", plan.inputAssets],
        ["Output assets", plan.outputAssets],
        ["Workflow risk", plan.workflowRisks],
      ]}
    />
  );
}
