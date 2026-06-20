import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_RESULT_MANIFEST_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanResultManifestPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_RESULT_MANIFEST_PACKET_LANGUAGE, buildBuildPlanResultManifestPacketStableKey };

const BUILD_PLAN_RESULT_MANIFEST_PACKET_SLUG = "build-plan-result-manifest-packet";

export function buildBuildPlanResultManifestPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_RESULT_MANIFEST_PACKET_SLUG, input);
}

export function buildBuildPlanResultManifestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_RESULT_MANIFEST_PACKET_SLUG);
}

export function buildBuildPlanResultManifestPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanResultManifestPacket(model: { buildPlanResultManifestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_RESULT_MANIFEST_PACKET_SLUG, model.buildPlanResultManifestPacketItems);
}

export function buildBuildPlanResultManifestPacketModel() {
  const buildPlanResultManifestPacketItems = buildBuildPlanResultManifestPacketItems();
  const buildPlanResultManifestPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_RESULT_MANIFEST_PACKET_SLUG, buildPlanResultManifestPacketItems);
  return { ...buildPlanResultManifestPacketModel, buildPlanResultManifestPacketItems };
}
