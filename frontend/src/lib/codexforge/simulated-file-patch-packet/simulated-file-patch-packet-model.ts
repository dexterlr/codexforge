import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_PATCH_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFilePatchPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_PATCH_PACKET_LANGUAGE, buildSimulatedFilePatchPacketStableKey };

const SIMULATED_FILE_PATCH_PACKET_SLUG = "simulated-file-patch-packet";

export function buildSimulatedFilePatchPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_PATCH_PACKET_SLUG, input);
}

export function buildSimulatedFilePatchPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_PATCH_PACKET_SLUG);
}

export function buildSimulatedFilePatchPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFilePatchPacket(model: { simulatedFilePatchPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_PATCH_PACKET_SLUG, model.simulatedFilePatchPacketItems);
}

export function buildSimulatedFilePatchPacketModel() {
  const simulatedFilePatchPacketItems = buildSimulatedFilePatchPacketItems();
  const simulatedFilePatchPacketModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_PATCH_PACKET_SLUG, simulatedFilePatchPacketItems);
  return { ...simulatedFilePatchPacketModel, simulatedFilePatchPacketItems };
}
