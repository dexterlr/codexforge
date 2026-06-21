import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_MOVE_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileMovePacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_MOVE_PACKET_LANGUAGE, buildSimulatedFileMovePacketStableKey };

const SIMULATED_FILE_MOVE_PACKET_SLUG = "simulated-file-move-packet";

export function buildSimulatedFileMovePacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_MOVE_PACKET_SLUG, input);
}

export function buildSimulatedFileMovePacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_MOVE_PACKET_SLUG);
}

export function buildSimulatedFileMovePacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileMovePacket(model: { simulatedFileMovePacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_MOVE_PACKET_SLUG, model.simulatedFileMovePacketItems);
}

export function buildSimulatedFileMovePacketModel() {
  const simulatedFileMovePacketItems = buildSimulatedFileMovePacketItems();
  const simulatedFileMovePacketModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_MOVE_PACKET_SLUG, simulatedFileMovePacketItems);
  return { ...simulatedFileMovePacketModel, simulatedFileMovePacketItems };
}
