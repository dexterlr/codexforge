import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_TARGET_SELECTION_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildTargetSelectionStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_TARGET_SELECTION_LANGUAGE, buildGuidedBuildTargetSelectionStableKey };

const GUIDED_BUILD_TARGET_SELECTION_SLUG = "guided-build-target-selection";

export function buildGuidedBuildTargetSelection(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_TARGET_SELECTION_SLUG, input);
}

export function buildGuidedBuildTargetSelectionItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_TARGET_SELECTION_SLUG);
}

export function buildGuidedBuildTargetSelectionBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildTargetSelection(model: { guidedBuildTargetSelectionItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_TARGET_SELECTION_SLUG, model.guidedBuildTargetSelectionItems);
}

export function buildGuidedBuildTargetSelectionModel() {
  const guidedBuildTargetSelectionItems = buildGuidedBuildTargetSelectionItems();
  const guidedBuildTargetSelectionModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_TARGET_SELECTION_SLUG, guidedBuildTargetSelectionItems);
  return { ...guidedBuildTargetSelectionModel, guidedBuildTargetSelectionItems };
}

