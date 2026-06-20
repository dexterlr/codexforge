import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_READY_TO_EXECUTE_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanReadyToExecutePacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_READY_TO_EXECUTE_PACKET_LANGUAGE, buildBuildPlanReadyToExecutePacketStableKey };

const BUILD_PLAN_READY_TO_EXECUTE_PACKET_SLUG = "build-plan-ready-to-execute-packet";

export function buildBuildPlanReadyToExecutePacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_READY_TO_EXECUTE_PACKET_SLUG, input);
}

export function buildBuildPlanReadyToExecutePacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_READY_TO_EXECUTE_PACKET_SLUG);
}

export function buildBuildPlanReadyToExecutePacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanReadyToExecutePacket(model: { buildPlanReadyToExecutePacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_READY_TO_EXECUTE_PACKET_SLUG, model.buildPlanReadyToExecutePacketItems);
}

export function buildBuildPlanReadyToExecutePacketModel() {
  const buildPlanReadyToExecutePacketItems = buildBuildPlanReadyToExecutePacketItems();
  const buildPlanReadyToExecutePacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_READY_TO_EXECUTE_PACKET_SLUG, buildPlanReadyToExecutePacketItems);
  return { ...buildPlanReadyToExecutePacketModel, buildPlanReadyToExecutePacketItems };
}
