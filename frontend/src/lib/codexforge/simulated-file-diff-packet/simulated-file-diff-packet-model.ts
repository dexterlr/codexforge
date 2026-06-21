import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_DIFF_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileDiffPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_DIFF_PACKET_LANGUAGE, buildSimulatedFileDiffPacketStableKey };

const SIMULATED_FILE_DIFF_PACKET_SLUG = "simulated-file-diff-packet";

export function buildSimulatedFileDiffPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_DIFF_PACKET_SLUG, input);
}

export function buildSimulatedFileDiffPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_DIFF_PACKET_SLUG);
}

export function buildSimulatedFileDiffPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileDiffPacket(model: { simulatedFileDiffPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_DIFF_PACKET_SLUG, model.simulatedFileDiffPacketItems);
}

export function buildSimulatedFileDiffPacketModel() {
  const simulatedFileDiffPacketItems = buildSimulatedFileDiffPacketItems();
  const simulatedFileDiffPacketModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_DIFF_PACKET_SLUG, simulatedFileDiffPacketItems);
  return { ...simulatedFileDiffPacketModel, simulatedFileDiffPacketItems };
}
