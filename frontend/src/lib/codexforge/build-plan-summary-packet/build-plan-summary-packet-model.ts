import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_SUMMARY_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanSummaryPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_SUMMARY_PACKET_LANGUAGE, buildBuildPlanSummaryPacketStableKey };

const BUILD_PLAN_SUMMARY_PACKET_SLUG = "build-plan-summary-packet";

export function buildBuildPlanSummaryPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_SUMMARY_PACKET_SLUG, input);
}

export function buildBuildPlanSummaryPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_SUMMARY_PACKET_SLUG);
}

export function buildBuildPlanSummaryPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanSummaryPacket(model: { buildPlanSummaryPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_SUMMARY_PACKET_SLUG, model.buildPlanSummaryPacketItems);
}

export function buildBuildPlanSummaryPacketModel() {
  const buildPlanSummaryPacketItems = buildBuildPlanSummaryPacketItems();
  const buildPlanSummaryPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_SUMMARY_PACKET_SLUG, buildPlanSummaryPacketItems);
  return { ...buildPlanSummaryPacketModel, buildPlanSummaryPacketItems };
}
