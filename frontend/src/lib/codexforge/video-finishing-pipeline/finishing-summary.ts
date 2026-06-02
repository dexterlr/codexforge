import type { FinishingSummary } from "./video-finishing-types";
import { buildFinishingExportPlan } from "./finishing-export-plan";
import { buildFinishingHandoff } from "./finishing-handoff";
import { buildDefaultFinishingPipeline } from "./finishing-pipeline";
import { buildDefaultFinishingQualityGates } from "./finishing-quality-gate";
import { buildFinishingResourcePlan } from "./finishing-resource-plan";

export function buildFinishingSummary(): FinishingSummary {
  const pipeline = buildDefaultFinishingPipeline();
  const qualityGates = buildDefaultFinishingQualityGates();
  const resourcePlan = buildFinishingResourcePlan();
  const exportPlan = buildFinishingExportPlan();
  const handoff = buildFinishingHandoff();

  return {
    pipeline,
    qualityGates,
    resourcePlan,
    exportPlan,
    handoff,
    summary: summarizeVideoFinishing({ pipeline, qualityGates, resourcePlan, exportPlan, handoff, summary: "" }),
  };
}

export function summarizeVideoFinishing(summary: FinishingSummary): string {
  return `${summary.pipeline.steps.length} finishing steps and ${summary.qualityGates.length} quality gates are planned with no video generation, no export, and no frame interpolation execution.`;
}
