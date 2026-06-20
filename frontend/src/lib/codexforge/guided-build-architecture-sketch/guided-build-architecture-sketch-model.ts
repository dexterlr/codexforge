import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_ARCHITECTURE_SKETCH_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildArchitectureSketchStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_ARCHITECTURE_SKETCH_LANGUAGE, buildGuidedBuildArchitectureSketchStableKey };

const GUIDED_BUILD_ARCHITECTURE_SKETCH_SLUG = "guided-build-architecture-sketch";

export function buildGuidedBuildArchitectureSketch(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_ARCHITECTURE_SKETCH_SLUG, input);
}

export function buildGuidedBuildArchitectureSketchItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_ARCHITECTURE_SKETCH_SLUG);
}

export function buildGuidedBuildArchitectureSketchBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildArchitectureSketch(model: { guidedBuildArchitectureSketchItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_ARCHITECTURE_SKETCH_SLUG, model.guidedBuildArchitectureSketchItems);
}

export function buildGuidedBuildArchitectureSketchModel() {
  const guidedBuildArchitectureSketchItems = buildGuidedBuildArchitectureSketchItems();
  const guidedBuildArchitectureSketchModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_ARCHITECTURE_SKETCH_SLUG, guidedBuildArchitectureSketchItems);
  return { ...guidedBuildArchitectureSketchModel, guidedBuildArchitectureSketchItems };
}

