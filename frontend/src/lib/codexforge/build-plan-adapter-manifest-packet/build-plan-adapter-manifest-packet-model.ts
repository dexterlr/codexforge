import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_ADAPTER_MANIFEST_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanAdapterManifestPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_ADAPTER_MANIFEST_PACKET_LANGUAGE, buildBuildPlanAdapterManifestPacketStableKey };

const BUILD_PLAN_ADAPTER_MANIFEST_PACKET_SLUG = "build-plan-adapter-manifest-packet";

export function buildBuildPlanAdapterManifestPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_ADAPTER_MANIFEST_PACKET_SLUG, input);
}

export function buildBuildPlanAdapterManifestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_ADAPTER_MANIFEST_PACKET_SLUG);
}

export function buildBuildPlanAdapterManifestPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanAdapterManifestPacket(model: { buildPlanAdapterManifestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_ADAPTER_MANIFEST_PACKET_SLUG, model.buildPlanAdapterManifestPacketItems);
}

export function buildBuildPlanAdapterManifestPacketModel() {
  const buildPlanAdapterManifestPacketItems = buildBuildPlanAdapterManifestPacketItems();
  const buildPlanAdapterManifestPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_ADAPTER_MANIFEST_PACKET_SLUG, buildPlanAdapterManifestPacketItems);
  return { ...buildPlanAdapterManifestPacketModel, buildPlanAdapterManifestPacketItems };
}
