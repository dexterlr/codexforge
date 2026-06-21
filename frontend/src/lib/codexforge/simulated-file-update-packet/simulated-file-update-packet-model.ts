import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_UPDATE_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileUpdatePacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_UPDATE_PACKET_LANGUAGE, buildSimulatedFileUpdatePacketStableKey };

const SIMULATED_FILE_UPDATE_PACKET_SLUG = "simulated-file-update-packet";

export function buildSimulatedFileUpdatePacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_UPDATE_PACKET_SLUG, input);
}

export function buildSimulatedFileUpdatePacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_UPDATE_PACKET_SLUG);
}

export function buildSimulatedFileUpdatePacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileUpdatePacket(model: { simulatedFileUpdatePacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_UPDATE_PACKET_SLUG, model.simulatedFileUpdatePacketItems);
}

export function buildSimulatedFileUpdatePacketModel() {
  const simulatedFileUpdatePacketItems = buildSimulatedFileUpdatePacketItems();
  const simulatedFileUpdatePacketModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_UPDATE_PACKET_SLUG, simulatedFileUpdatePacketItems);
  return { ...simulatedFileUpdatePacketModel, simulatedFileUpdatePacketItems };
}
