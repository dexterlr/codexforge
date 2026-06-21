import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_EXECUTION_HOLD_STATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandExecutionHoldStateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_EXECUTION_HOLD_STATE_LANGUAGE, buildSimulatedCommandExecutionHoldStateStableKey };

const SIMULATED_COMMAND_EXECUTION_HOLD_STATE_SLUG = "simulated-command-execution-hold-state";

export function buildSimulatedCommandExecutionHoldState(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_EXECUTION_HOLD_STATE_SLUG, input);
}

export function buildSimulatedCommandExecutionHoldStateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_EXECUTION_HOLD_STATE_SLUG);
}

export function buildSimulatedCommandExecutionHoldStateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandExecutionHoldState(model: { simulatedCommandExecutionHoldStateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_EXECUTION_HOLD_STATE_SLUG, model.simulatedCommandExecutionHoldStateItems);
}

export function buildSimulatedCommandExecutionHoldStateModel() {
  const simulatedCommandExecutionHoldStateItems = buildSimulatedCommandExecutionHoldStateItems();
  const simulatedCommandExecutionHoldStateModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_EXECUTION_HOLD_STATE_SLUG, simulatedCommandExecutionHoldStateItems);
  return { ...simulatedCommandExecutionHoldStateModel, simulatedCommandExecutionHoldStateItems };
}
