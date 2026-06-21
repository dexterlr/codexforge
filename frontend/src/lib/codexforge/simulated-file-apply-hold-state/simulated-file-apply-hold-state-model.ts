import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_APPLY_HOLD_STATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileApplyHoldStateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_APPLY_HOLD_STATE_LANGUAGE, buildSimulatedFileApplyHoldStateStableKey };

const SIMULATED_FILE_APPLY_HOLD_STATE_SLUG = "simulated-file-apply-hold-state";

export function buildSimulatedFileApplyHoldState(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_APPLY_HOLD_STATE_SLUG, input);
}

export function buildSimulatedFileApplyHoldStateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_APPLY_HOLD_STATE_SLUG);
}

export function buildSimulatedFileApplyHoldStateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileApplyHoldState(model: { simulatedFileApplyHoldStateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_APPLY_HOLD_STATE_SLUG, model.simulatedFileApplyHoldStateItems);
}

export function buildSimulatedFileApplyHoldStateModel() {
  const simulatedFileApplyHoldStateItems = buildSimulatedFileApplyHoldStateItems();
  const simulatedFileApplyHoldStateModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_APPLY_HOLD_STATE_SLUG, simulatedFileApplyHoldStateItems);
  return { ...simulatedFileApplyHoldStateModel, simulatedFileApplyHoldStateItems };
}
