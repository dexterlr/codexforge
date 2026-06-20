import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_DETAIL_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalDetailPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_DETAIL_PACKET_LANGUAGE, buildBuildPlanApprovalDetailPacketStableKey };

const BUILD_PLAN_APPROVAL_DETAIL_PACKET_SLUG = "build-plan-approval-detail-packet";

export function buildBuildPlanApprovalDetailPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_DETAIL_PACKET_SLUG, input);
}

export function buildBuildPlanApprovalDetailPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_DETAIL_PACKET_SLUG);
}

export function buildBuildPlanApprovalDetailPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalDetailPacket(model: { buildPlanApprovalDetailPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_DETAIL_PACKET_SLUG, model.buildPlanApprovalDetailPacketItems);
}

export function buildBuildPlanApprovalDetailPacketModel() {
  const buildPlanApprovalDetailPacketItems = buildBuildPlanApprovalDetailPacketItems();
  const buildPlanApprovalDetailPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_DETAIL_PACKET_SLUG, buildPlanApprovalDetailPacketItems);
  return { ...buildPlanApprovalDetailPacketModel, buildPlanApprovalDetailPacketItems };
}
