import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_ADAPTER_BLUEPRINT_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildAdapterBlueprintStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_ADAPTER_BLUEPRINT_LANGUAGE, buildGuidedBuildAdapterBlueprintStableKey };

const GUIDED_BUILD_ADAPTER_BLUEPRINT_SLUG = "guided-build-adapter-blueprint";

export function buildGuidedBuildAdapterBlueprint(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_ADAPTER_BLUEPRINT_SLUG, input);
}

export function buildGuidedBuildAdapterBlueprintItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_ADAPTER_BLUEPRINT_SLUG);
}

export function buildGuidedBuildAdapterBlueprintBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildAdapterBlueprint(model: { guidedBuildAdapterBlueprintItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_ADAPTER_BLUEPRINT_SLUG, model.guidedBuildAdapterBlueprintItems);
}

export function buildGuidedBuildAdapterBlueprintModel() {
  const guidedBuildAdapterBlueprintItems = buildGuidedBuildAdapterBlueprintItems();
  const guidedBuildAdapterBlueprintModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_ADAPTER_BLUEPRINT_SLUG, guidedBuildAdapterBlueprintItems);
  return { ...guidedBuildAdapterBlueprintModel, guidedBuildAdapterBlueprintItems };
}

