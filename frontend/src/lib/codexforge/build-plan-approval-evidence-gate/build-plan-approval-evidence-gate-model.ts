import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_APPROVAL_EVIDENCE_GATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanApprovalEvidenceGateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_APPROVAL_EVIDENCE_GATE_LANGUAGE, buildBuildPlanApprovalEvidenceGateStableKey };

const BUILD_PLAN_APPROVAL_EVIDENCE_GATE_SLUG = "build-plan-approval-evidence-gate";

export function buildBuildPlanApprovalEvidenceGate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_APPROVAL_EVIDENCE_GATE_SLUG, input);
}

export function buildBuildPlanApprovalEvidenceGateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_APPROVAL_EVIDENCE_GATE_SLUG);
}

export function buildBuildPlanApprovalEvidenceGateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanApprovalEvidenceGate(model: { buildPlanApprovalEvidenceGateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_APPROVAL_EVIDENCE_GATE_SLUG, model.buildPlanApprovalEvidenceGateItems);
}

export function buildBuildPlanApprovalEvidenceGateModel() {
  const buildPlanApprovalEvidenceGateItems = buildBuildPlanApprovalEvidenceGateItems();
  const buildPlanApprovalEvidenceGateModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_APPROVAL_EVIDENCE_GATE_SLUG, buildPlanApprovalEvidenceGateItems);
  return { ...buildPlanApprovalEvidenceGateModel, buildPlanApprovalEvidenceGateItems };
}
