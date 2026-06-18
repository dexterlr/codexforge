import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_HARNESS_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildAdapterImplementationHarnessReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { ADAPTER_IMPLEMENTATION_HARNESS_REVIEW_LANGUAGE, buildAdapterImplementationHarnessReviewStableKey };

const ADAPTER_IMPLEMENTATION_HARNESS_REVIEW_SLUG = "adapter-implementation-harness-review";

export function buildAdapterImplementationHarnessReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(ADAPTER_IMPLEMENTATION_HARNESS_REVIEW_SLUG, input);
}

export function buildAdapterImplementationHarnessReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(ADAPTER_IMPLEMENTATION_HARNESS_REVIEW_SLUG);
}

export function buildAdapterImplementationHarnessReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeAdapterImplementationHarnessReview(model: { adapterImplementationHarnessReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(ADAPTER_IMPLEMENTATION_HARNESS_REVIEW_SLUG, model.adapterImplementationHarnessReviewItems);
}

export function buildAdapterImplementationHarnessReviewModel() {
  const adapterImplementationHarnessReviewItems = buildAdapterImplementationHarnessReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(ADAPTER_IMPLEMENTATION_HARNESS_REVIEW_SLUG, adapterImplementationHarnessReviewItems);
  return { ...model, adapterImplementationHarnessReviewItems };
}
