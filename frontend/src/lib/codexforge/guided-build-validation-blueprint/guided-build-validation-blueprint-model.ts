import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_VALIDATION_BLUEPRINT_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildValidationBlueprintStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_VALIDATION_BLUEPRINT_LANGUAGE, buildGuidedBuildValidationBlueprintStableKey };

const GUIDED_BUILD_VALIDATION_BLUEPRINT_SLUG = "guided-build-validation-blueprint";

export function buildGuidedBuildValidationBlueprint(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_VALIDATION_BLUEPRINT_SLUG, input);
}

export function buildGuidedBuildValidationBlueprintItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_VALIDATION_BLUEPRINT_SLUG);
}

export function buildGuidedBuildValidationBlueprintBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildValidationBlueprint(model: { guidedBuildValidationBlueprintItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_VALIDATION_BLUEPRINT_SLUG, model.guidedBuildValidationBlueprintItems);
}

export function buildGuidedBuildValidationBlueprintModel() {
  const guidedBuildValidationBlueprintItems = buildGuidedBuildValidationBlueprintItems();
  const guidedBuildValidationBlueprintModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_VALIDATION_BLUEPRINT_SLUG, guidedBuildValidationBlueprintItems);
  return { ...guidedBuildValidationBlueprintModel, guidedBuildValidationBlueprintItems };
}

