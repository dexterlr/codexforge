import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_RESULT_STORE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildFirstResultStoreAdapterImplementationReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { FIRST_RESULT_STORE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE, buildFirstResultStoreAdapterImplementationReviewStableKey };

const FIRST_RESULT_STORE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG = "first-result-store-adapter-implementation-review";

export function buildFirstResultStoreAdapterImplementationReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(FIRST_RESULT_STORE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, input);
}

export function buildFirstResultStoreAdapterImplementationReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(FIRST_RESULT_STORE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG);
}

export function buildFirstResultStoreAdapterImplementationReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeFirstResultStoreAdapterImplementationReview(model: { firstResultStoreAdapterImplementationReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(FIRST_RESULT_STORE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, model.firstResultStoreAdapterImplementationReviewItems);
}

export function buildFirstResultStoreAdapterImplementationReviewModel() {
  const firstResultStoreAdapterImplementationReviewItems = buildFirstResultStoreAdapterImplementationReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(FIRST_RESULT_STORE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, firstResultStoreAdapterImplementationReviewItems);
  return { ...model, firstResultStoreAdapterImplementationReviewItems };
}
