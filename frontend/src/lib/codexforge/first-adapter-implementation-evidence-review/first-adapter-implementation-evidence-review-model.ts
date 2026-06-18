import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_ADAPTER_IMPLEMENTATION_EVIDENCE_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildFirstAdapterImplementationEvidenceReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { FIRST_ADAPTER_IMPLEMENTATION_EVIDENCE_REVIEW_LANGUAGE, buildFirstAdapterImplementationEvidenceReviewStableKey };

const FIRST_ADAPTER_IMPLEMENTATION_EVIDENCE_REVIEW_SLUG = "first-adapter-implementation-evidence-review";

export function buildFirstAdapterImplementationEvidenceReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(FIRST_ADAPTER_IMPLEMENTATION_EVIDENCE_REVIEW_SLUG, input);
}

export function buildFirstAdapterImplementationEvidenceReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(FIRST_ADAPTER_IMPLEMENTATION_EVIDENCE_REVIEW_SLUG);
}

export function buildFirstAdapterImplementationEvidenceReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeFirstAdapterImplementationEvidenceReview(model: { firstAdapterImplementationEvidenceReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(FIRST_ADAPTER_IMPLEMENTATION_EVIDENCE_REVIEW_SLUG, model.firstAdapterImplementationEvidenceReviewItems);
}

export function buildFirstAdapterImplementationEvidenceReviewModel() {
  const firstAdapterImplementationEvidenceReviewItems = buildFirstAdapterImplementationEvidenceReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(FIRST_ADAPTER_IMPLEMENTATION_EVIDENCE_REVIEW_SLUG, firstAdapterImplementationEvidenceReviewItems);
  return { ...model, firstAdapterImplementationEvidenceReviewItems };
}
