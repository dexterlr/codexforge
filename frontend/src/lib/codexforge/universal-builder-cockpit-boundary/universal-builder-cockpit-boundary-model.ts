import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  UNIVERSAL_BUILDER_COCKPIT_BOUNDARY_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildUniversalBuilderCockpitBoundaryStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { UNIVERSAL_BUILDER_COCKPIT_BOUNDARY_LANGUAGE, buildUniversalBuilderCockpitBoundaryStableKey };

const UNIVERSAL_BUILDER_COCKPIT_BOUNDARY_SLUG = "universal-builder-cockpit-boundary";

export function buildUniversalBuilderCockpitBoundary(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(UNIVERSAL_BUILDER_COCKPIT_BOUNDARY_SLUG, input);
}

export function buildUniversalBuilderCockpitBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(UNIVERSAL_BUILDER_COCKPIT_BOUNDARY_SLUG);
}

export function buildUniversalBuilderCockpitBoundaryBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeUniversalBuilderCockpitBoundary(model: { universalBuilderCockpitBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(UNIVERSAL_BUILDER_COCKPIT_BOUNDARY_SLUG, model.universalBuilderCockpitBoundaryItems);
}

export function buildUniversalBuilderCockpitBoundaryModel() {
  const universalBuilderCockpitBoundaryItems = buildUniversalBuilderCockpitBoundaryItems();
  const universalBuilderCockpitBoundaryModel = buildUniversalBuilderCockpitReviewModelForSlug(UNIVERSAL_BUILDER_COCKPIT_BOUNDARY_SLUG, universalBuilderCockpitBoundaryItems);
  return { ...universalBuilderCockpitBoundaryModel, universalBuilderCockpitBoundaryItems };
}
