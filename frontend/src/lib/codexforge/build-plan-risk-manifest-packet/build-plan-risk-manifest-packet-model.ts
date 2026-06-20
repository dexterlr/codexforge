import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_RISK_MANIFEST_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanRiskManifestPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_RISK_MANIFEST_PACKET_LANGUAGE, buildBuildPlanRiskManifestPacketStableKey };

const BUILD_PLAN_RISK_MANIFEST_PACKET_SLUG = "build-plan-risk-manifest-packet";

export function buildBuildPlanRiskManifestPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_RISK_MANIFEST_PACKET_SLUG, input);
}

export function buildBuildPlanRiskManifestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_RISK_MANIFEST_PACKET_SLUG);
}

export function buildBuildPlanRiskManifestPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanRiskManifestPacket(model: { buildPlanRiskManifestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_RISK_MANIFEST_PACKET_SLUG, model.buildPlanRiskManifestPacketItems);
}

export function buildBuildPlanRiskManifestPacketModel() {
  const buildPlanRiskManifestPacketItems = buildBuildPlanRiskManifestPacketItems();
  const buildPlanRiskManifestPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_RISK_MANIFEST_PACKET_SLUG, buildPlanRiskManifestPacketItems);
  return { ...buildPlanRiskManifestPacketModel, buildPlanRiskManifestPacketItems };
}
