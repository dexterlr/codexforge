import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_VALIDATION_MANIFEST_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanValidationManifestPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_VALIDATION_MANIFEST_PACKET_LANGUAGE, buildBuildPlanValidationManifestPacketStableKey };

const BUILD_PLAN_VALIDATION_MANIFEST_PACKET_SLUG = "build-plan-validation-manifest-packet";

export function buildBuildPlanValidationManifestPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_VALIDATION_MANIFEST_PACKET_SLUG, input);
}

export function buildBuildPlanValidationManifestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_VALIDATION_MANIFEST_PACKET_SLUG);
}

export function buildBuildPlanValidationManifestPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanValidationManifestPacket(model: { buildPlanValidationManifestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_VALIDATION_MANIFEST_PACKET_SLUG, model.buildPlanValidationManifestPacketItems);
}

export function buildBuildPlanValidationManifestPacketModel() {
  const buildPlanValidationManifestPacketItems = buildBuildPlanValidationManifestPacketItems();
  const buildPlanValidationManifestPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_VALIDATION_MANIFEST_PACKET_SLUG, buildPlanValidationManifestPacketItems);
  return { ...buildPlanValidationManifestPacketModel, buildPlanValidationManifestPacketItems };
}
