import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILDER_ADAPTER_STACK_PREVIEW_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuilderAdapterStackPreviewStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILDER_ADAPTER_STACK_PREVIEW_LANGUAGE, buildBuilderAdapterStackPreviewStableKey };

const BUILDER_ADAPTER_STACK_PREVIEW_SLUG = "builder-adapter-stack-preview";

export function buildBuilderAdapterStackPreview(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILDER_ADAPTER_STACK_PREVIEW_SLUG, input);
}

export function buildBuilderAdapterStackPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILDER_ADAPTER_STACK_PREVIEW_SLUG);
}

export function buildBuilderAdapterStackPreviewBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuilderAdapterStackPreview(model: { builderAdapterStackPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILDER_ADAPTER_STACK_PREVIEW_SLUG, model.builderAdapterStackPreviewItems);
}

export function buildBuilderAdapterStackPreviewModel() {
  const builderAdapterStackPreviewItems = buildBuilderAdapterStackPreviewItems();
  const builderAdapterStackPreviewModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILDER_ADAPTER_STACK_PREVIEW_SLUG, builderAdapterStackPreviewItems);
  return { ...builderAdapterStackPreviewModel, builderAdapterStackPreviewItems };
}
