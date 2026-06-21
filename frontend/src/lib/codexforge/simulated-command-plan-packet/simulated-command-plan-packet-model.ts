import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_PLAN_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandPlanPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_PLAN_PACKET_LANGUAGE, buildSimulatedCommandPlanPacketStableKey };

const SIMULATED_COMMAND_PLAN_PACKET_SLUG = "simulated-command-plan-packet";

export function buildSimulatedCommandPlanPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_PLAN_PACKET_SLUG, input);
}

export function buildSimulatedCommandPlanPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_PLAN_PACKET_SLUG);
}

export function buildSimulatedCommandPlanPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandPlanPacket(model: { simulatedCommandPlanPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_PLAN_PACKET_SLUG, model.simulatedCommandPlanPacketItems);
}

export function buildSimulatedCommandPlanPacketModel() {
  const simulatedCommandPlanPacketItems = buildSimulatedCommandPlanPacketItems();
  const simulatedCommandPlanPacketModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_PLAN_PACKET_SLUG, simulatedCommandPlanPacketItems);
  return { ...simulatedCommandPlanPacketModel, simulatedCommandPlanPacketItems };
}
