import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_RUNTIME_MANIFEST_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanRuntimeManifestPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_RUNTIME_MANIFEST_PACKET_LANGUAGE, buildBuildPlanRuntimeManifestPacketStableKey };

const BUILD_PLAN_RUNTIME_MANIFEST_PACKET_SLUG = "build-plan-runtime-manifest-packet";

export function buildBuildPlanRuntimeManifestPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_RUNTIME_MANIFEST_PACKET_SLUG, input);
}

export function buildBuildPlanRuntimeManifestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_RUNTIME_MANIFEST_PACKET_SLUG);
}

export function buildBuildPlanRuntimeManifestPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanRuntimeManifestPacket(model: { buildPlanRuntimeManifestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_RUNTIME_MANIFEST_PACKET_SLUG, model.buildPlanRuntimeManifestPacketItems);
}

export function buildBuildPlanRuntimeManifestPacketModel() {
  const buildPlanRuntimeManifestPacketItems = buildBuildPlanRuntimeManifestPacketItems();
  const buildPlanRuntimeManifestPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_RUNTIME_MANIFEST_PACKET_SLUG, buildPlanRuntimeManifestPacketItems);
  return { ...buildPlanRuntimeManifestPacketModel, buildPlanRuntimeManifestPacketItems };
}
