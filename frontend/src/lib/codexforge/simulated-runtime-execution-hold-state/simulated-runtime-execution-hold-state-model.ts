import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_EXECUTION_HOLD_STATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeExecutionHoldStateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_EXECUTION_HOLD_STATE_LANGUAGE, buildSimulatedRuntimeExecutionHoldStateStableKey };

const SIMULATED_RUNTIME_EXECUTION_HOLD_STATE_SLUG = "simulated-runtime-execution-hold-state";

export function buildSimulatedRuntimeExecutionHoldState(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_EXECUTION_HOLD_STATE_SLUG, input);
}

export function buildSimulatedRuntimeExecutionHoldStateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_EXECUTION_HOLD_STATE_SLUG);
}

export function buildSimulatedRuntimeExecutionHoldStateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeExecutionHoldState(model: { simulatedRuntimeExecutionHoldStateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_EXECUTION_HOLD_STATE_SLUG, model.simulatedRuntimeExecutionHoldStateItems);
}

export function buildSimulatedRuntimeExecutionHoldStateModel() {
  const simulatedRuntimeExecutionHoldStateItems = buildSimulatedRuntimeExecutionHoldStateItems();
  const simulatedRuntimeExecutionHoldStateModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_EXECUTION_HOLD_STATE_SLUG, simulatedRuntimeExecutionHoldStateItems);
  return { ...simulatedRuntimeExecutionHoldStateModel, simulatedRuntimeExecutionHoldStateItems };
}
