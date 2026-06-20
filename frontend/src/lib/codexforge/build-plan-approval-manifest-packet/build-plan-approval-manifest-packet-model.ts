import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_MANIFEST_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalManifestPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_MANIFEST_PACKET_LANGUAGE, buildBuildPlanApprovalManifestPacketStableKey };

const BUILD_PLAN_APPROVAL_MANIFEST_PACKET_SLUG = "build-plan-approval-manifest-packet";

export function buildBuildPlanApprovalManifestPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_MANIFEST_PACKET_SLUG, input);
}

export function buildBuildPlanApprovalManifestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_MANIFEST_PACKET_SLUG);
}

export function buildBuildPlanApprovalManifestPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalManifestPacket(model: { buildPlanApprovalManifestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_MANIFEST_PACKET_SLUG, model.buildPlanApprovalManifestPacketItems);
}

export function buildBuildPlanApprovalManifestPacketModel() {
  const buildPlanApprovalManifestPacketItems = buildBuildPlanApprovalManifestPacketItems();
  const buildPlanApprovalManifestPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_MANIFEST_PACKET_SLUG, buildPlanApprovalManifestPacketItems);
  return { ...buildPlanApprovalManifestPacketModel, buildPlanApprovalManifestPacketItems };
}
