import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_OPERATOR_SIGNOFF_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanOperatorSignoffPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_OPERATOR_SIGNOFF_PACKET_LANGUAGE, buildBuildPlanOperatorSignoffPacketStableKey };

const BUILD_PLAN_OPERATOR_SIGNOFF_PACKET_SLUG = "build-plan-operator-signoff-packet";

export function buildBuildPlanOperatorSignoffPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_OPERATOR_SIGNOFF_PACKET_SLUG, input);
}

export function buildBuildPlanOperatorSignoffPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_OPERATOR_SIGNOFF_PACKET_SLUG);
}

export function buildBuildPlanOperatorSignoffPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanOperatorSignoffPacket(model: { buildPlanOperatorSignoffPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_OPERATOR_SIGNOFF_PACKET_SLUG, model.buildPlanOperatorSignoffPacketItems);
}

export function buildBuildPlanOperatorSignoffPacketModel() {
  const buildPlanOperatorSignoffPacketItems = buildBuildPlanOperatorSignoffPacketItems();
  const buildPlanOperatorSignoffPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_OPERATOR_SIGNOFF_PACKET_SLUG, buildPlanOperatorSignoffPacketItems);
  return { ...buildPlanOperatorSignoffPacketModel, buildPlanOperatorSignoffPacketItems };
}
