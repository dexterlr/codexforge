import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_INTENT_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandIntentPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_INTENT_PACKET_LANGUAGE, buildSimulatedCommandIntentPacketStableKey };

const SIMULATED_COMMAND_INTENT_PACKET_SLUG = "simulated-command-intent-packet";

export function buildSimulatedCommandIntentPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_INTENT_PACKET_SLUG, input);
}

export function buildSimulatedCommandIntentPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_INTENT_PACKET_SLUG);
}

export function buildSimulatedCommandIntentPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandIntentPacket(model: { simulatedCommandIntentPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_INTENT_PACKET_SLUG, model.simulatedCommandIntentPacketItems);
}

export function buildSimulatedCommandIntentPacketModel() {
  const simulatedCommandIntentPacketItems = buildSimulatedCommandIntentPacketItems();
  const simulatedCommandIntentPacketModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_INTENT_PACKET_SLUG, simulatedCommandIntentPacketItems);
  return { ...simulatedCommandIntentPacketModel, simulatedCommandIntentPacketItems };
}
