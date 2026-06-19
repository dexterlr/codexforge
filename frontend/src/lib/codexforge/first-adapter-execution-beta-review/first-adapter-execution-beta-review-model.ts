import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_ADAPTER_EXECUTION_BETA_REVIEW_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildFirstAdapterExecutionBetaReviewStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { FIRST_ADAPTER_EXECUTION_BETA_REVIEW_LANGUAGE, buildFirstAdapterExecutionBetaReviewStableKey };

const FIRST_ADAPTER_EXECUTION_BETA_REVIEW_SLUG = "first-adapter-execution-beta-review";

export function buildFirstAdapterExecutionBetaReview(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(FIRST_ADAPTER_EXECUTION_BETA_REVIEW_SLUG, input);
}

export function buildFirstAdapterExecutionBetaReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(FIRST_ADAPTER_EXECUTION_BETA_REVIEW_SLUG);
}

export function buildFirstAdapterExecutionBetaReviewBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeFirstAdapterExecutionBetaReview(model: { firstAdapterExecutionBetaReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(FIRST_ADAPTER_EXECUTION_BETA_REVIEW_SLUG, model.firstAdapterExecutionBetaReviewItems);
}

export function buildFirstAdapterExecutionBetaReviewModel() {
  const firstAdapterExecutionBetaReviewItems = buildFirstAdapterExecutionBetaReviewItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(FIRST_ADAPTER_EXECUTION_BETA_REVIEW_SLUG, firstAdapterExecutionBetaReviewItems);
  return { ...model, firstAdapterExecutionBetaReviewItems };
}
