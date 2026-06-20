import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_RESULT_GATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalResultGateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_RESULT_GATE_LANGUAGE, buildBuildPlanApprovalResultGateStableKey };

const BUILD_PLAN_APPROVAL_RESULT_GATE_SLUG = "build-plan-approval-result-gate";

export function buildBuildPlanApprovalResultGate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_RESULT_GATE_SLUG, input);
}

export function buildBuildPlanApprovalResultGateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_RESULT_GATE_SLUG);
}

export function buildBuildPlanApprovalResultGateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalResultGate(model: { buildPlanApprovalResultGateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_RESULT_GATE_SLUG, model.buildPlanApprovalResultGateItems);
}

export function buildBuildPlanApprovalResultGateModel() {
  const buildPlanApprovalResultGateItems = buildBuildPlanApprovalResultGateItems();
  const buildPlanApprovalResultGateModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_RESULT_GATE_SLUG, buildPlanApprovalResultGateItems);
  return { ...buildPlanApprovalResultGateModel, buildPlanApprovalResultGateItems };
}
