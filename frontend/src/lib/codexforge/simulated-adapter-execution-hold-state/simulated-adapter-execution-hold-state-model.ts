import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_EXECUTION_HOLD_STATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterExecutionHoldStateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_EXECUTION_HOLD_STATE_LANGUAGE, buildSimulatedAdapterExecutionHoldStateStableKey };

const SIMULATED_ADAPTER_EXECUTION_HOLD_STATE_SLUG = "simulated-adapter-execution-hold-state";

export function buildSimulatedAdapterExecutionHoldState(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_EXECUTION_HOLD_STATE_SLUG, input);
}

export function buildSimulatedAdapterExecutionHoldStateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_EXECUTION_HOLD_STATE_SLUG);
}

export function buildSimulatedAdapterExecutionHoldStateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterExecutionHoldState(model: { simulatedAdapterExecutionHoldStateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_EXECUTION_HOLD_STATE_SLUG, model.simulatedAdapterExecutionHoldStateItems);
}

export function buildSimulatedAdapterExecutionHoldStateModel() {
  const simulatedAdapterExecutionHoldStateItems = buildSimulatedAdapterExecutionHoldStateItems();
  const simulatedAdapterExecutionHoldStateModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_EXECUTION_HOLD_STATE_SLUG, simulatedAdapterExecutionHoldStateItems);
  return { ...simulatedAdapterExecutionHoldStateModel, simulatedAdapterExecutionHoldStateItems };
}
