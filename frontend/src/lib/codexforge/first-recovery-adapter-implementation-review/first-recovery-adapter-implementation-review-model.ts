import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_RECOVERY_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildFirstRecoveryAdapterImplementationReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { FIRST_RECOVERY_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE, buildFirstRecoveryAdapterImplementationReviewStableKey };

const FIRST_RECOVERY_ADAPTER_IMPLEMENTATION_REVIEW_SLUG = "first-recovery-adapter-implementation-review";

export function buildFirstRecoveryAdapterImplementationReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(FIRST_RECOVERY_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, input);
}

export function buildFirstRecoveryAdapterImplementationReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(FIRST_RECOVERY_ADAPTER_IMPLEMENTATION_REVIEW_SLUG);
}

export function buildFirstRecoveryAdapterImplementationReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeFirstRecoveryAdapterImplementationReview(model: { firstRecoveryAdapterImplementationReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(FIRST_RECOVERY_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, model.firstRecoveryAdapterImplementationReviewItems);
}

export function buildFirstRecoveryAdapterImplementationReviewModel() {
  const firstRecoveryAdapterImplementationReviewItems = buildFirstRecoveryAdapterImplementationReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(FIRST_RECOVERY_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, firstRecoveryAdapterImplementationReviewItems);
  return { ...model, firstRecoveryAdapterImplementationReviewItems };
}
