import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_ARCHITECTURE_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanArchitecturePacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_ARCHITECTURE_PACKET_LANGUAGE, buildBuildPlanArchitecturePacketStableKey };

const BUILD_PLAN_ARCHITECTURE_PACKET_SLUG = "build-plan-architecture-packet";

export function buildBuildPlanArchitecturePacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_ARCHITECTURE_PACKET_SLUG, input);
}

export function buildBuildPlanArchitecturePacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_ARCHITECTURE_PACKET_SLUG);
}

export function buildBuildPlanArchitecturePacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanArchitecturePacket(model: { buildPlanArchitecturePacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_ARCHITECTURE_PACKET_SLUG, model.buildPlanArchitecturePacketItems);
}

export function buildBuildPlanArchitecturePacketModel() {
  const buildPlanArchitecturePacketItems = buildBuildPlanArchitecturePacketItems();
  const buildPlanArchitecturePacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_ARCHITECTURE_PACKET_SLUG, buildPlanArchitecturePacketItems);
  return { ...buildPlanArchitecturePacketModel, buildPlanArchitecturePacketItems };
}
