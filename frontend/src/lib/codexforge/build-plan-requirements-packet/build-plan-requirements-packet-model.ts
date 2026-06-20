import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_REQUIREMENTS_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanRequirementsPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_REQUIREMENTS_PACKET_LANGUAGE, buildBuildPlanRequirementsPacketStableKey };

const BUILD_PLAN_REQUIREMENTS_PACKET_SLUG = "build-plan-requirements-packet";

export function buildBuildPlanRequirementsPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_REQUIREMENTS_PACKET_SLUG, input);
}

export function buildBuildPlanRequirementsPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_REQUIREMENTS_PACKET_SLUG);
}

export function buildBuildPlanRequirementsPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanRequirementsPacket(model: { buildPlanRequirementsPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_REQUIREMENTS_PACKET_SLUG, model.buildPlanRequirementsPacketItems);
}

export function buildBuildPlanRequirementsPacketModel() {
  const buildPlanRequirementsPacketItems = buildBuildPlanRequirementsPacketItems();
  const buildPlanRequirementsPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_REQUIREMENTS_PACKET_SLUG, buildPlanRequirementsPacketItems);
  return { ...buildPlanRequirementsPacketModel, buildPlanRequirementsPacketItems };
}
