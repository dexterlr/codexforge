import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_RUNTIME_BLUEPRINT_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildRuntimeBlueprintStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_RUNTIME_BLUEPRINT_LANGUAGE, buildGuidedBuildRuntimeBlueprintStableKey };

const GUIDED_BUILD_RUNTIME_BLUEPRINT_SLUG = "guided-build-runtime-blueprint";

export function buildGuidedBuildRuntimeBlueprint(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_RUNTIME_BLUEPRINT_SLUG, input);
}

export function buildGuidedBuildRuntimeBlueprintItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_RUNTIME_BLUEPRINT_SLUG);
}

export function buildGuidedBuildRuntimeBlueprintBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildRuntimeBlueprint(model: { guidedBuildRuntimeBlueprintItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_RUNTIME_BLUEPRINT_SLUG, model.guidedBuildRuntimeBlueprintItems);
}

export function buildGuidedBuildRuntimeBlueprintModel() {
  const guidedBuildRuntimeBlueprintItems = buildGuidedBuildRuntimeBlueprintItems();
  const guidedBuildRuntimeBlueprintModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_RUNTIME_BLUEPRINT_SLUG, guidedBuildRuntimeBlueprintItems);
  return { ...guidedBuildRuntimeBlueprintModel, guidedBuildRuntimeBlueprintItems };
}

