import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_EXECUTION_HOLD_STATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanExecutionHoldStateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_EXECUTION_HOLD_STATE_LANGUAGE, buildBuildPlanExecutionHoldStateStableKey };

const BUILD_PLAN_EXECUTION_HOLD_STATE_SLUG = "build-plan-execution-hold-state";

export function buildBuildPlanExecutionHoldState(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_EXECUTION_HOLD_STATE_SLUG, input);
}

export function buildBuildPlanExecutionHoldStateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_EXECUTION_HOLD_STATE_SLUG);
}

export function buildBuildPlanExecutionHoldStateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanExecutionHoldState(model: { buildPlanExecutionHoldStateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_EXECUTION_HOLD_STATE_SLUG, model.buildPlanExecutionHoldStateItems);
}

export function buildBuildPlanExecutionHoldStateModel() {
  const buildPlanExecutionHoldStateItems = buildBuildPlanExecutionHoldStateItems();
  const buildPlanExecutionHoldStateModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_EXECUTION_HOLD_STATE_SLUG, buildPlanExecutionHoldStateItems);
  return { ...buildPlanExecutionHoldStateModel, buildPlanExecutionHoldStateItems };
}
