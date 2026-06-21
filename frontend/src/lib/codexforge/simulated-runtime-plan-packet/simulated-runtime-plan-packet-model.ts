import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_PLAN_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimePlanPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_PLAN_PACKET_LANGUAGE, buildSimulatedRuntimePlanPacketStableKey };

const SIMULATED_RUNTIME_PLAN_PACKET_SLUG = "simulated-runtime-plan-packet";

export function buildSimulatedRuntimePlanPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_PLAN_PACKET_SLUG, input);
}

export function buildSimulatedRuntimePlanPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_PLAN_PACKET_SLUG);
}

export function buildSimulatedRuntimePlanPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimePlanPacket(model: { simulatedRuntimePlanPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_PLAN_PACKET_SLUG, model.simulatedRuntimePlanPacketItems);
}

export function buildSimulatedRuntimePlanPacketModel() {
  const simulatedRuntimePlanPacketItems = buildSimulatedRuntimePlanPacketItems();
  const simulatedRuntimePlanPacketModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_PLAN_PACKET_SLUG, simulatedRuntimePlanPacketItems);
  return { ...simulatedRuntimePlanPacketModel, simulatedRuntimePlanPacketItems };
}
