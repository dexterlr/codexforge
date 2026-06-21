import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_EXECUTION_HOLD_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandExecutionHoldStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_EXECUTION_HOLD_LANGUAGE, buildCommandExecutionHoldStableKey };

const COMMAND_EXECUTION_HOLD_SLUG = "command-execution-hold";

export function buildCommandExecutionHold(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_EXECUTION_HOLD_SLUG, input);
}

export function buildCommandExecutionHoldItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_EXECUTION_HOLD_SLUG);
}

export function buildCommandExecutionHoldBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandExecutionHold(model: { commandExecutionHoldItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_EXECUTION_HOLD_SLUG, model.commandExecutionHoldItems);
}

export function buildCommandExecutionHoldModel() {
  const commandExecutionHoldItems = buildCommandExecutionHoldItems();
  const commandExecutionHoldModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_EXECUTION_HOLD_SLUG, commandExecutionHoldItems);
  return { ...commandExecutionHoldModel, commandExecutionHoldItems };
}
