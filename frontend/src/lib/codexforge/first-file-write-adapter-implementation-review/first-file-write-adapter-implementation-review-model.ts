import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_FILE_WRITE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildFirstFileWriteAdapterImplementationReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { FIRST_FILE_WRITE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE, buildFirstFileWriteAdapterImplementationReviewStableKey };

const FIRST_FILE_WRITE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG = "first-file-write-adapter-implementation-review";

export function buildFirstFileWriteAdapterImplementationReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(FIRST_FILE_WRITE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, input);
}

export function buildFirstFileWriteAdapterImplementationReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(FIRST_FILE_WRITE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG);
}

export function buildFirstFileWriteAdapterImplementationReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeFirstFileWriteAdapterImplementationReview(model: { firstFileWriteAdapterImplementationReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(FIRST_FILE_WRITE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, model.firstFileWriteAdapterImplementationReviewItems);
}

export function buildFirstFileWriteAdapterImplementationReviewModel() {
  const firstFileWriteAdapterImplementationReviewItems = buildFirstFileWriteAdapterImplementationReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(FIRST_FILE_WRITE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, firstFileWriteAdapterImplementationReviewItems);
  return { ...model, firstFileWriteAdapterImplementationReviewItems };
}
