import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_PACKAGING_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildFirstPackagingAdapterImplementationReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { FIRST_PACKAGING_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE, buildFirstPackagingAdapterImplementationReviewStableKey };

const FIRST_PACKAGING_ADAPTER_IMPLEMENTATION_REVIEW_SLUG = "first-packaging-adapter-implementation-review";

export function buildFirstPackagingAdapterImplementationReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(FIRST_PACKAGING_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, input);
}

export function buildFirstPackagingAdapterImplementationReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(FIRST_PACKAGING_ADAPTER_IMPLEMENTATION_REVIEW_SLUG);
}

export function buildFirstPackagingAdapterImplementationReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeFirstPackagingAdapterImplementationReview(model: { firstPackagingAdapterImplementationReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(FIRST_PACKAGING_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, model.firstPackagingAdapterImplementationReviewItems);
}

export function buildFirstPackagingAdapterImplementationReviewModel() {
  const firstPackagingAdapterImplementationReviewItems = buildFirstPackagingAdapterImplementationReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(FIRST_PACKAGING_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, firstPackagingAdapterImplementationReviewItems);
  return { ...model, firstPackagingAdapterImplementationReviewItems };
}
