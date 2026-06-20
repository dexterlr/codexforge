import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  UNIVERSAL_PROJECT_BUILDER_BOUNDARY_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildUniversalProjectBuilderBoundaryStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { UNIVERSAL_PROJECT_BUILDER_BOUNDARY_LANGUAGE, buildUniversalProjectBuilderBoundaryStableKey };

const UNIVERSAL_PROJECT_BUILDER_BOUNDARY_SLUG = "universal-project-builder-boundary";

export function buildUniversalProjectBuilderBoundary(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(UNIVERSAL_PROJECT_BUILDER_BOUNDARY_SLUG, input);
}

export function buildUniversalProjectBuilderBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(UNIVERSAL_PROJECT_BUILDER_BOUNDARY_SLUG);
}

export function buildUniversalProjectBuilderBoundaryBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeUniversalProjectBuilderBoundary(model: { universalProjectBuilderBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(UNIVERSAL_PROJECT_BUILDER_BOUNDARY_SLUG, model.universalProjectBuilderBoundaryItems);
}

export function buildUniversalProjectBuilderBoundaryModel() {
  const universalProjectBuilderBoundaryItems = buildUniversalProjectBuilderBoundaryItems();
  const universalProjectBuilderBoundaryModel = buildUniversalProjectBuilderReviewModelForSlug(UNIVERSAL_PROJECT_BUILDER_BOUNDARY_SLUG, universalProjectBuilderBoundaryItems);
  return { ...universalProjectBuilderBoundaryModel, universalProjectBuilderBoundaryItems };
}
