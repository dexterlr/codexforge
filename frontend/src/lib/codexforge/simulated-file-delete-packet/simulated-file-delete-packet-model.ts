import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_DELETE_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileDeletePacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_DELETE_PACKET_LANGUAGE, buildSimulatedFileDeletePacketStableKey };

const SIMULATED_FILE_DELETE_PACKET_SLUG = "simulated-file-delete-packet";

export function buildSimulatedFileDeletePacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_DELETE_PACKET_SLUG, input);
}

export function buildSimulatedFileDeletePacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_DELETE_PACKET_SLUG);
}

export function buildSimulatedFileDeletePacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileDeletePacket(model: { simulatedFileDeletePacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_DELETE_PACKET_SLUG, model.simulatedFileDeletePacketItems);
}

export function buildSimulatedFileDeletePacketModel() {
  const simulatedFileDeletePacketItems = buildSimulatedFileDeletePacketItems();
  const simulatedFileDeletePacketModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_DELETE_PACKET_SLUG, simulatedFileDeletePacketItems);
  return { ...simulatedFileDeletePacketModel, simulatedFileDeletePacketItems };
}
