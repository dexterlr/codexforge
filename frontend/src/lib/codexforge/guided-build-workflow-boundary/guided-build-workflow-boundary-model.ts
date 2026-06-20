import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_WORKFLOW_BOUNDARY_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildWorkflowBoundaryStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_WORKFLOW_BOUNDARY_LANGUAGE, buildGuidedBuildWorkflowBoundaryStableKey };

const GUIDED_BUILD_WORKFLOW_BOUNDARY_SLUG = "guided-build-workflow-boundary";

export function buildGuidedBuildWorkflowBoundary(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_WORKFLOW_BOUNDARY_SLUG, input);
}

export function buildGuidedBuildWorkflowBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_WORKFLOW_BOUNDARY_SLUG);
}

export function buildGuidedBuildWorkflowBoundaryBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildWorkflowBoundary(model: { guidedBuildWorkflowBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_WORKFLOW_BOUNDARY_SLUG, model.guidedBuildWorkflowBoundaryItems);
}

export function buildGuidedBuildWorkflowBoundaryModel() {
  const guidedBuildWorkflowBoundaryItems = buildGuidedBuildWorkflowBoundaryItems();
  const guidedBuildWorkflowBoundaryModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_WORKFLOW_BOUNDARY_SLUG, guidedBuildWorkflowBoundaryItems);
  return { ...guidedBuildWorkflowBoundaryModel, guidedBuildWorkflowBoundaryItems };
}

