import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_INTENT_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeIntentPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_INTENT_PACKET_LANGUAGE, buildSimulatedRuntimeIntentPacketStableKey };

const SIMULATED_RUNTIME_INTENT_PACKET_SLUG = "simulated-runtime-intent-packet";

export function buildSimulatedRuntimeIntentPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_INTENT_PACKET_SLUG, input);
}

export function buildSimulatedRuntimeIntentPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_INTENT_PACKET_SLUG);
}

export function buildSimulatedRuntimeIntentPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeIntentPacket(model: { simulatedRuntimeIntentPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_INTENT_PACKET_SLUG, model.simulatedRuntimeIntentPacketItems);
}

export function buildSimulatedRuntimeIntentPacketModel() {
  const simulatedRuntimeIntentPacketItems = buildSimulatedRuntimeIntentPacketItems();
  const simulatedRuntimeIntentPacketModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_INTENT_PACKET_SLUG, simulatedRuntimeIntentPacketItems);
  return { ...simulatedRuntimeIntentPacketModel, simulatedRuntimeIntentPacketItems };
}
