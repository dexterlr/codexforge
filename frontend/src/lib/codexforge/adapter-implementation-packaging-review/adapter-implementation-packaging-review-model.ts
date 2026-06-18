import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_PACKAGING_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildAdapterImplementationPackagingReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { ADAPTER_IMPLEMENTATION_PACKAGING_REVIEW_LANGUAGE, buildAdapterImplementationPackagingReviewStableKey };

const ADAPTER_IMPLEMENTATION_PACKAGING_REVIEW_SLUG = "adapter-implementation-packaging-review";

export function buildAdapterImplementationPackagingReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(ADAPTER_IMPLEMENTATION_PACKAGING_REVIEW_SLUG, input);
}

export function buildAdapterImplementationPackagingReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(ADAPTER_IMPLEMENTATION_PACKAGING_REVIEW_SLUG);
}

export function buildAdapterImplementationPackagingReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeAdapterImplementationPackagingReview(model: { adapterImplementationPackagingReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(ADAPTER_IMPLEMENTATION_PACKAGING_REVIEW_SLUG, model.adapterImplementationPackagingReviewItems);
}

export function buildAdapterImplementationPackagingReviewModel() {
  const adapterImplementationPackagingReviewItems = buildAdapterImplementationPackagingReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(ADAPTER_IMPLEMENTATION_PACKAGING_REVIEW_SLUG, adapterImplementationPackagingReviewItems);
  return { ...model, adapterImplementationPackagingReviewItems };
}
