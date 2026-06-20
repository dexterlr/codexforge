import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_RISK_REVIEW_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildRiskReviewStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_RISK_REVIEW_LANGUAGE, buildGuidedBuildRiskReviewStableKey };

const GUIDED_BUILD_RISK_REVIEW_SLUG = "guided-build-risk-review";

export function buildGuidedBuildRiskReview(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_RISK_REVIEW_SLUG, input);
}

export function buildGuidedBuildRiskReviewItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_RISK_REVIEW_SLUG);
}

export function buildGuidedBuildRiskReviewBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildRiskReview(model: { guidedBuildRiskReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_RISK_REVIEW_SLUG, model.guidedBuildRiskReviewItems);
}

export function buildGuidedBuildRiskReviewModel() {
  const guidedBuildRiskReviewItems = buildGuidedBuildRiskReviewItems();
  const guidedBuildRiskReviewModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_RISK_REVIEW_SLUG, guidedBuildRiskReviewItems);
  return { ...guidedBuildRiskReviewModel, guidedBuildRiskReviewItems };
}

