import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_RECOVERY_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildAdapterImplementationRecoveryReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { ADAPTER_IMPLEMENTATION_RECOVERY_REVIEW_LANGUAGE, buildAdapterImplementationRecoveryReviewStableKey };

const ADAPTER_IMPLEMENTATION_RECOVERY_REVIEW_SLUG = "adapter-implementation-recovery-review";

export function buildAdapterImplementationRecoveryReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(ADAPTER_IMPLEMENTATION_RECOVERY_REVIEW_SLUG, input);
}

export function buildAdapterImplementationRecoveryReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(ADAPTER_IMPLEMENTATION_RECOVERY_REVIEW_SLUG);
}

export function buildAdapterImplementationRecoveryReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeAdapterImplementationRecoveryReview(model: { adapterImplementationRecoveryReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(ADAPTER_IMPLEMENTATION_RECOVERY_REVIEW_SLUG, model.adapterImplementationRecoveryReviewItems);
}

export function buildAdapterImplementationRecoveryReviewModel() {
  const adapterImplementationRecoveryReviewItems = buildAdapterImplementationRecoveryReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(ADAPTER_IMPLEMENTATION_RECOVERY_REVIEW_SLUG, adapterImplementationRecoveryReviewItems);
  return { ...model, adapterImplementationRecoveryReviewItems };
}
