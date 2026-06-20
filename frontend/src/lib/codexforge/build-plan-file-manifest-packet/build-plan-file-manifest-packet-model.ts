import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_FILE_MANIFEST_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanFileManifestPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_FILE_MANIFEST_PACKET_LANGUAGE, buildBuildPlanFileManifestPacketStableKey };

const BUILD_PLAN_FILE_MANIFEST_PACKET_SLUG = "build-plan-file-manifest-packet";

export function buildBuildPlanFileManifestPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_FILE_MANIFEST_PACKET_SLUG, input);
}

export function buildBuildPlanFileManifestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_FILE_MANIFEST_PACKET_SLUG);
}

export function buildBuildPlanFileManifestPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanFileManifestPacket(model: { buildPlanFileManifestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_FILE_MANIFEST_PACKET_SLUG, model.buildPlanFileManifestPacketItems);
}

export function buildBuildPlanFileManifestPacketModel() {
  const buildPlanFileManifestPacketItems = buildBuildPlanFileManifestPacketItems();
  const buildPlanFileManifestPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_FILE_MANIFEST_PACKET_SLUG, buildPlanFileManifestPacketItems);
  return { ...buildPlanFileManifestPacketModel, buildPlanFileManifestPacketItems };
}
