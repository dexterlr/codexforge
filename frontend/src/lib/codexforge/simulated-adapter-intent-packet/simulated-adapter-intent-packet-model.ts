import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_INTENT_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterIntentPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_INTENT_PACKET_LANGUAGE, buildSimulatedAdapterIntentPacketStableKey };

const SIMULATED_ADAPTER_INTENT_PACKET_SLUG = "simulated-adapter-intent-packet";

export function buildSimulatedAdapterIntentPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_INTENT_PACKET_SLUG, input);
}

export function buildSimulatedAdapterIntentPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_INTENT_PACKET_SLUG);
}

export function buildSimulatedAdapterIntentPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterIntentPacket(model: { simulatedAdapterIntentPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_INTENT_PACKET_SLUG, model.simulatedAdapterIntentPacketItems);
}

export function buildSimulatedAdapterIntentPacketModel() {
  const simulatedAdapterIntentPacketItems = buildSimulatedAdapterIntentPacketItems();
  const simulatedAdapterIntentPacketModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_INTENT_PACKET_SLUG, simulatedAdapterIntentPacketItems);
  return { ...simulatedAdapterIntentPacketModel, simulatedAdapterIntentPacketItems };
}
