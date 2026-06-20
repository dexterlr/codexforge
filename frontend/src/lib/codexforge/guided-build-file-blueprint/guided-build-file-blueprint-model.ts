import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_FILE_BLUEPRINT_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildFileBlueprintStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_FILE_BLUEPRINT_LANGUAGE, buildGuidedBuildFileBlueprintStableKey };

const GUIDED_BUILD_FILE_BLUEPRINT_SLUG = "guided-build-file-blueprint";

export function buildGuidedBuildFileBlueprint(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_FILE_BLUEPRINT_SLUG, input);
}

export function buildGuidedBuildFileBlueprintItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_FILE_BLUEPRINT_SLUG);
}

export function buildGuidedBuildFileBlueprintBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildFileBlueprint(model: { guidedBuildFileBlueprintItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_FILE_BLUEPRINT_SLUG, model.guidedBuildFileBlueprintItems);
}

export function buildGuidedBuildFileBlueprintModel() {
  const guidedBuildFileBlueprintItems = buildGuidedBuildFileBlueprintItems();
  const guidedBuildFileBlueprintModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_FILE_BLUEPRINT_SLUG, guidedBuildFileBlueprintItems);
  return { ...guidedBuildFileBlueprintModel, guidedBuildFileBlueprintItems };
}

