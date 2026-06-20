import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_COMMAND_MANIFEST_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanCommandManifestPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_COMMAND_MANIFEST_PACKET_LANGUAGE, buildBuildPlanCommandManifestPacketStableKey };

const BUILD_PLAN_COMMAND_MANIFEST_PACKET_SLUG = "build-plan-command-manifest-packet";

export function buildBuildPlanCommandManifestPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_COMMAND_MANIFEST_PACKET_SLUG, input);
}

export function buildBuildPlanCommandManifestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_COMMAND_MANIFEST_PACKET_SLUG);
}

export function buildBuildPlanCommandManifestPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanCommandManifestPacket(model: { buildPlanCommandManifestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_COMMAND_MANIFEST_PACKET_SLUG, model.buildPlanCommandManifestPacketItems);
}

export function buildBuildPlanCommandManifestPacketModel() {
  const buildPlanCommandManifestPacketItems = buildBuildPlanCommandManifestPacketItems();
  const buildPlanCommandManifestPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_COMMAND_MANIFEST_PACKET_SLUG, buildPlanCommandManifestPacketItems);
  return { ...buildPlanCommandManifestPacketModel, buildPlanCommandManifestPacketItems };
}
