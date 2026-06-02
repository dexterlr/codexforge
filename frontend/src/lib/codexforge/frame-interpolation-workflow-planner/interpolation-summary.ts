import type { InterpolationSummary } from "./frame-interpolation-types";
import { buildInterpolationHandoff } from "./interpolation-handoff";
import { buildInterpolationResourceEstimate } from "./interpolation-resource-estimate";
import { buildInterpolationRiskReview } from "./interpolation-risk-review";
import { buildInterpolationSourceReview } from "./interpolation-source-review";
import { buildInterpolationTargetProfile } from "./interpolation-target-profile";
import { buildDefaultInterpolationWorkflowPlan } from "./interpolation-workflow-plan";

export function buildInterpolationSummary(): InterpolationSummary {
  const plan = buildDefaultInterpolationWorkflowPlan();
  const sourceReview = buildInterpolationSourceReview();
  const targetProfile = buildInterpolationTargetProfile({
    targetFps: plan.targetFps,
    smoothnessTarget: plan.smoothnessTarget,
    outputDuration: plan.outputDuration,
  });
  const riskReview = buildInterpolationRiskReview();
  const resourceEstimate = buildInterpolationResourceEstimate({ localGpuTimePosture: plan.localGpuTimePosture });
  const handoff = buildInterpolationHandoff();

  return {
    plan,
    sourceReview,
    targetProfile,
    riskReview,
    resourceEstimate,
    handoff,
    summary: summarizeInterpolationWorkflow({ plan, sourceReview, targetProfile, riskReview, resourceEstimate, handoff, summary: "" }),
  };
}

export function summarizeInterpolationWorkflow(summary: InterpolationSummary): string {
  return `Interpolation planning moves from ${summary.plan.sourceFps} to ${summary.plan.targetFps} with ${summary.plan.smoothnessTarget} smoothness and no frame interpolation execution.`;
}
