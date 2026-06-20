import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_RECOVERY_GATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalRecoveryGateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_RECOVERY_GATE_LANGUAGE, buildBuildPlanApprovalRecoveryGateStableKey };

const BUILD_PLAN_APPROVAL_RECOVERY_GATE_SLUG = "build-plan-approval-recovery-gate";

export function buildBuildPlanApprovalRecoveryGate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_RECOVERY_GATE_SLUG, input);
}

export function buildBuildPlanApprovalRecoveryGateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_RECOVERY_GATE_SLUG);
}

export function buildBuildPlanApprovalRecoveryGateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalRecoveryGate(model: { buildPlanApprovalRecoveryGateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_RECOVERY_GATE_SLUG, model.buildPlanApprovalRecoveryGateItems);
}

export function buildBuildPlanApprovalRecoveryGateModel() {
  const buildPlanApprovalRecoveryGateItems = buildBuildPlanApprovalRecoveryGateItems();
  const buildPlanApprovalRecoveryGateModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_RECOVERY_GATE_SLUG, buildPlanApprovalRecoveryGateItems);
  return { ...buildPlanApprovalRecoveryGateModel, buildPlanApprovalRecoveryGateItems };
}
