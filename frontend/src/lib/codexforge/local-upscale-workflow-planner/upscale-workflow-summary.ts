import type { UpscaleWorkflowSummary } from "./local-upscale-workflow-types";
import { buildUpscaleResourceEstimate } from "./upscale-resource-estimate";
import { buildUpscaleSafetyReview } from "./upscale-safety-review";
import { buildUpscaleSourceReview } from "./upscale-source-review";
import { buildUpscaleTargetProfile } from "./upscale-target-profile";
import { buildUpscaleWorkflowHandoff } from "./upscale-workflow-handoff";
import { buildDefaultUpscaleWorkflowPlan } from "./upscale-workflow-plan";

export function buildUpscaleWorkflowSummary(): UpscaleWorkflowSummary {
  const plan = buildDefaultUpscaleWorkflowPlan();
  const sourceReview = buildUpscaleSourceReview();
  const targetProfile = buildUpscaleTargetProfile({
    targetResolution: plan.targetResolution,
    qualityTarget: plan.qualityTarget,
  });
  const resourceEstimate = buildUpscaleResourceEstimate({ gpuTimePosture: plan.gpuTimePosture });
  const safetyReview = buildUpscaleSafetyReview();
  const handoff = buildUpscaleWorkflowHandoff();

  return {
    plan,
    sourceReview,
    targetProfile,
    resourceEstimate,
    safetyReview,
    handoff,
    summary: summarizeUpscaleWorkflow({ plan, sourceReview, targetProfile, resourceEstimate, safetyReview, handoff, summary: "" }),
  };
}

export function summarizeUpscaleWorkflow(summary: UpscaleWorkflowSummary): string {
  return `Upscale planning targets ${summary.plan.targetResolution} from a reviewed draft, with ${summary.plan.gpuTimePosture.toLowerCase()} and no upscale execution.`;
}
