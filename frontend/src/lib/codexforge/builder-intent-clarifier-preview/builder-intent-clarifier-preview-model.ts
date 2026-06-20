import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILDER_INTENT_CLARIFIER_PREVIEW_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuilderIntentClarifierPreviewStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILDER_INTENT_CLARIFIER_PREVIEW_LANGUAGE, buildBuilderIntentClarifierPreviewStableKey };

const BUILDER_INTENT_CLARIFIER_PREVIEW_SLUG = "builder-intent-clarifier-preview";

export function buildBuilderIntentClarifierPreview(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILDER_INTENT_CLARIFIER_PREVIEW_SLUG, input);
}

export function buildBuilderIntentClarifierPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILDER_INTENT_CLARIFIER_PREVIEW_SLUG);
}

export function buildBuilderIntentClarifierPreviewBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuilderIntentClarifierPreview(model: { builderIntentClarifierPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILDER_INTENT_CLARIFIER_PREVIEW_SLUG, model.builderIntentClarifierPreviewItems);
}

export function buildBuilderIntentClarifierPreviewModel() {
  const builderIntentClarifierPreviewItems = buildBuilderIntentClarifierPreviewItems();
  const builderIntentClarifierPreviewModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILDER_INTENT_CLARIFIER_PREVIEW_SLUG, builderIntentClarifierPreviewItems);
  return { ...builderIntentClarifierPreviewModel, builderIntentClarifierPreviewItems };
}
