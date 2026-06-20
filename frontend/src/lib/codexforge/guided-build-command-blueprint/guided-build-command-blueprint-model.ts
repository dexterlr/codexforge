import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_COMMAND_BLUEPRINT_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildCommandBlueprintStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_COMMAND_BLUEPRINT_LANGUAGE, buildGuidedBuildCommandBlueprintStableKey };

const GUIDED_BUILD_COMMAND_BLUEPRINT_SLUG = "guided-build-command-blueprint";

export function buildGuidedBuildCommandBlueprint(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_COMMAND_BLUEPRINT_SLUG, input);
}

export function buildGuidedBuildCommandBlueprintItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_COMMAND_BLUEPRINT_SLUG);
}

export function buildGuidedBuildCommandBlueprintBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildCommandBlueprint(model: { guidedBuildCommandBlueprintItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_COMMAND_BLUEPRINT_SLUG, model.guidedBuildCommandBlueprintItems);
}

export function buildGuidedBuildCommandBlueprintModel() {
  const guidedBuildCommandBlueprintItems = buildGuidedBuildCommandBlueprintItems();
  const guidedBuildCommandBlueprintModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_COMMAND_BLUEPRINT_SLUG, guidedBuildCommandBlueprintItems);
  return { ...guidedBuildCommandBlueprintModel, guidedBuildCommandBlueprintItems };
}

