import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_CREATE_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileCreatePacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_CREATE_PACKET_LANGUAGE, buildSimulatedFileCreatePacketStableKey };

const SIMULATED_FILE_CREATE_PACKET_SLUG = "simulated-file-create-packet";

export function buildSimulatedFileCreatePacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_CREATE_PACKET_SLUG, input);
}

export function buildSimulatedFileCreatePacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_CREATE_PACKET_SLUG);
}

export function buildSimulatedFileCreatePacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileCreatePacket(model: { simulatedFileCreatePacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_CREATE_PACKET_SLUG, model.simulatedFileCreatePacketItems);
}

export function buildSimulatedFileCreatePacketModel() {
  const simulatedFileCreatePacketItems = buildSimulatedFileCreatePacketItems();
  const simulatedFileCreatePacketModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_CREATE_PACKET_SLUG, simulatedFileCreatePacketItems);
  return { ...simulatedFileCreatePacketModel, simulatedFileCreatePacketItems };
}
