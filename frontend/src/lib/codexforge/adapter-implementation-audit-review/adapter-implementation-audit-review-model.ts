import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_AUDIT_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildAdapterImplementationAuditReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { ADAPTER_IMPLEMENTATION_AUDIT_REVIEW_LANGUAGE, buildAdapterImplementationAuditReviewStableKey };

const ADAPTER_IMPLEMENTATION_AUDIT_REVIEW_SLUG = "adapter-implementation-audit-review";

export function buildAdapterImplementationAuditReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(ADAPTER_IMPLEMENTATION_AUDIT_REVIEW_SLUG, input);
}

export function buildAdapterImplementationAuditReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(ADAPTER_IMPLEMENTATION_AUDIT_REVIEW_SLUG);
}

export function buildAdapterImplementationAuditReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeAdapterImplementationAuditReview(model: { adapterImplementationAuditReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(ADAPTER_IMPLEMENTATION_AUDIT_REVIEW_SLUG, model.adapterImplementationAuditReviewItems);
}

export function buildAdapterImplementationAuditReviewModel() {
  const adapterImplementationAuditReviewItems = buildAdapterImplementationAuditReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(ADAPTER_IMPLEMENTATION_AUDIT_REVIEW_SLUG, adapterImplementationAuditReviewItems);
  return { ...model, adapterImplementationAuditReviewItems };
}
