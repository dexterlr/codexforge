import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  UNIVERSAL_PROJECT_BUILDER_SAFETY_PLAN_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildUniversalProjectBuilderSafetyPlanStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { UNIVERSAL_PROJECT_BUILDER_SAFETY_PLAN_LANGUAGE, buildUniversalProjectBuilderSafetyPlanStableKey };

const UNIVERSAL_PROJECT_BUILDER_SAFETY_PLAN_SLUG = "universal-project-builder-safety-plan";

export function buildUniversalProjectBuilderSafetyPlan(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(UNIVERSAL_PROJECT_BUILDER_SAFETY_PLAN_SLUG, input);
}

export function buildUniversalProjectBuilderSafetyPlanItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(UNIVERSAL_PROJECT_BUILDER_SAFETY_PLAN_SLUG);
}

export function buildUniversalProjectBuilderSafetyPlanBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeUniversalProjectBuilderSafetyPlan(model: { universalProjectBuilderSafetyPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(UNIVERSAL_PROJECT_BUILDER_SAFETY_PLAN_SLUG, model.universalProjectBuilderSafetyPlanItems);
}

export function buildUniversalProjectBuilderSafetyPlanModel() {
  const universalProjectBuilderSafetyPlanItems = buildUniversalProjectBuilderSafetyPlanItems();
  const universalProjectBuilderSafetyPlanModel = buildUniversalProjectBuilderReviewModelForSlug(UNIVERSAL_PROJECT_BUILDER_SAFETY_PLAN_SLUG, universalProjectBuilderSafetyPlanItems);
  return { ...universalProjectBuilderSafetyPlanModel, universalProjectBuilderSafetyPlanItems };
}
