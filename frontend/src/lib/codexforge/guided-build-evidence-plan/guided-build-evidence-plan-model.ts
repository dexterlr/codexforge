import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_EVIDENCE_PLAN_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildEvidencePlanStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_EVIDENCE_PLAN_LANGUAGE, buildGuidedBuildEvidencePlanStableKey };

const GUIDED_BUILD_EVIDENCE_PLAN_SLUG = "guided-build-evidence-plan";

export function buildGuidedBuildEvidencePlan(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_EVIDENCE_PLAN_SLUG, input);
}

export function buildGuidedBuildEvidencePlanItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_EVIDENCE_PLAN_SLUG);
}

export function buildGuidedBuildEvidencePlanBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildEvidencePlan(model: { guidedBuildEvidencePlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_EVIDENCE_PLAN_SLUG, model.guidedBuildEvidencePlanItems);
}

export function buildGuidedBuildEvidencePlanModel() {
  const guidedBuildEvidencePlanItems = buildGuidedBuildEvidencePlanItems();
  const guidedBuildEvidencePlanModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_EVIDENCE_PLAN_SLUG, guidedBuildEvidencePlanItems);
  return { ...guidedBuildEvidencePlanModel, guidedBuildEvidencePlanItems };
}

