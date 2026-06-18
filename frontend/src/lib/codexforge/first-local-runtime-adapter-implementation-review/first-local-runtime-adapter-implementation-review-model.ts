import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildFirstLocalRuntimeAdapterImplementationReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { FIRST_LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE, buildFirstLocalRuntimeAdapterImplementationReviewStableKey };

const FIRST_LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_REVIEW_SLUG = "first-local-runtime-adapter-implementation-review";

export function buildFirstLocalRuntimeAdapterImplementationReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(FIRST_LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, input);
}

export function buildFirstLocalRuntimeAdapterImplementationReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(FIRST_LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_REVIEW_SLUG);
}

export function buildFirstLocalRuntimeAdapterImplementationReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeFirstLocalRuntimeAdapterImplementationReview(model: { firstLocalRuntimeAdapterImplementationReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(FIRST_LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, model.firstLocalRuntimeAdapterImplementationReviewItems);
}

export function buildFirstLocalRuntimeAdapterImplementationReviewModel() {
  const firstLocalRuntimeAdapterImplementationReviewItems = buildFirstLocalRuntimeAdapterImplementationReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(FIRST_LOCAL_RUNTIME_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, firstLocalRuntimeAdapterImplementationReviewItems);
  return { ...model, firstLocalRuntimeAdapterImplementationReviewItems };
}
