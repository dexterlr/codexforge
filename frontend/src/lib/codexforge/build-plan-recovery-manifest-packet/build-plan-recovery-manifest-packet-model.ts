import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_RECOVERY_MANIFEST_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanRecoveryManifestPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_RECOVERY_MANIFEST_PACKET_LANGUAGE, buildBuildPlanRecoveryManifestPacketStableKey };

const BUILD_PLAN_RECOVERY_MANIFEST_PACKET_SLUG = "build-plan-recovery-manifest-packet";

export function buildBuildPlanRecoveryManifestPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_RECOVERY_MANIFEST_PACKET_SLUG, input);
}

export function buildBuildPlanRecoveryManifestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_RECOVERY_MANIFEST_PACKET_SLUG);
}

export function buildBuildPlanRecoveryManifestPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanRecoveryManifestPacket(model: { buildPlanRecoveryManifestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_RECOVERY_MANIFEST_PACKET_SLUG, model.buildPlanRecoveryManifestPacketItems);
}

export function buildBuildPlanRecoveryManifestPacketModel() {
  const buildPlanRecoveryManifestPacketItems = buildBuildPlanRecoveryManifestPacketItems();
  const buildPlanRecoveryManifestPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_RECOVERY_MANIFEST_PACKET_SLUG, buildPlanRecoveryManifestPacketItems);
  return { ...buildPlanRecoveryManifestPacketModel, buildPlanRecoveryManifestPacketItems };
}
