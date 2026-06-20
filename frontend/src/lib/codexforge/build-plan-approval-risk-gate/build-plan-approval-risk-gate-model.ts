import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_RISK_GATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalRiskGateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_RISK_GATE_LANGUAGE, buildBuildPlanApprovalRiskGateStableKey };

const BUILD_PLAN_APPROVAL_RISK_GATE_SLUG = "build-plan-approval-risk-gate";

export function buildBuildPlanApprovalRiskGate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_RISK_GATE_SLUG, input);
}

export function buildBuildPlanApprovalRiskGateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_RISK_GATE_SLUG);
}

export function buildBuildPlanApprovalRiskGateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalRiskGate(model: { buildPlanApprovalRiskGateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_RISK_GATE_SLUG, model.buildPlanApprovalRiskGateItems);
}

export function buildBuildPlanApprovalRiskGateModel() {
  const buildPlanApprovalRiskGateItems = buildBuildPlanApprovalRiskGateItems();
  const buildPlanApprovalRiskGateModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_RISK_GATE_SLUG, buildPlanApprovalRiskGateItems);
  return { ...buildPlanApprovalRiskGateModel, buildPlanApprovalRiskGateItems };
}
