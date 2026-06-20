import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_RESULT_PLAN_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildResultPlanStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_RESULT_PLAN_LANGUAGE, buildGuidedBuildResultPlanStableKey };

const GUIDED_BUILD_RESULT_PLAN_SLUG = "guided-build-result-plan";

export function buildGuidedBuildResultPlan(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_RESULT_PLAN_SLUG, input);
}

export function buildGuidedBuildResultPlanItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_RESULT_PLAN_SLUG);
}

export function buildGuidedBuildResultPlanBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildResultPlan(model: { guidedBuildResultPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_RESULT_PLAN_SLUG, model.guidedBuildResultPlanItems);
}

export function buildGuidedBuildResultPlanModel() {
  const guidedBuildResultPlanItems = buildGuidedBuildResultPlanItems();
  const guidedBuildResultPlanModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_RESULT_PLAN_SLUG, guidedBuildResultPlanItems);
  return { ...guidedBuildResultPlanModel, guidedBuildResultPlanItems };
}

