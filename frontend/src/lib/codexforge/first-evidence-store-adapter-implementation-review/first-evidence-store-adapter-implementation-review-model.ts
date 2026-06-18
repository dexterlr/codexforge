import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildFirstEvidenceStoreAdapterImplementationReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { FIRST_EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE, buildFirstEvidenceStoreAdapterImplementationReviewStableKey };

const FIRST_EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG = "first-evidence-store-adapter-implementation-review";

export function buildFirstEvidenceStoreAdapterImplementationReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(FIRST_EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, input);
}

export function buildFirstEvidenceStoreAdapterImplementationReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(FIRST_EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG);
}

export function buildFirstEvidenceStoreAdapterImplementationReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeFirstEvidenceStoreAdapterImplementationReview(model: { firstEvidenceStoreAdapterImplementationReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(FIRST_EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, model.firstEvidenceStoreAdapterImplementationReviewItems);
}

export function buildFirstEvidenceStoreAdapterImplementationReviewModel() {
  const firstEvidenceStoreAdapterImplementationReviewItems = buildFirstEvidenceStoreAdapterImplementationReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(FIRST_EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, firstEvidenceStoreAdapterImplementationReviewItems);
  return { ...model, firstEvidenceStoreAdapterImplementationReviewItems };
}
