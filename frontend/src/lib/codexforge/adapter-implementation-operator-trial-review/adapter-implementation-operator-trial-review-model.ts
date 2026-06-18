import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_OPERATOR_TRIAL_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildAdapterImplementationOperatorTrialReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { ADAPTER_IMPLEMENTATION_OPERATOR_TRIAL_REVIEW_LANGUAGE, buildAdapterImplementationOperatorTrialReviewStableKey };

const ADAPTER_IMPLEMENTATION_OPERATOR_TRIAL_REVIEW_SLUG = "adapter-implementation-operator-trial-review";

export function buildAdapterImplementationOperatorTrialReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(ADAPTER_IMPLEMENTATION_OPERATOR_TRIAL_REVIEW_SLUG, input);
}

export function buildAdapterImplementationOperatorTrialReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(ADAPTER_IMPLEMENTATION_OPERATOR_TRIAL_REVIEW_SLUG);
}

export function buildAdapterImplementationOperatorTrialReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeAdapterImplementationOperatorTrialReview(model: { adapterImplementationOperatorTrialReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(ADAPTER_IMPLEMENTATION_OPERATOR_TRIAL_REVIEW_SLUG, model.adapterImplementationOperatorTrialReviewItems);
}

export function buildAdapterImplementationOperatorTrialReviewModel() {
  const adapterImplementationOperatorTrialReviewItems = buildAdapterImplementationOperatorTrialReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(ADAPTER_IMPLEMENTATION_OPERATOR_TRIAL_REVIEW_SLUG, adapterImplementationOperatorTrialReviewItems);
  return { ...model, adapterImplementationOperatorTrialReviewItems };
}
