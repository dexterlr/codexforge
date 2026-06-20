import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILDER_COST_PRIVACY_RISK_REVIEW_LANGUAGE,
  buildUniversalBuilderCockpitReview,
  buildUniversalBuilderCockpitReviewBoundary,
  buildUniversalBuilderCockpitReviewModelForSlug,
  buildUniversalBuilderCockpitReviewPackets,
  buildUniversalBuilderCockpitReviewStableKey as buildBuilderCostPrivacyRiskReviewStableKey,
  summarizeUniversalBuilderCockpitReviewForSlug,
  type UniversalBuilderCockpitReviewPacketInput,
} from "../universal-builder-cockpit-preview-kit";

export { BUILDER_COST_PRIVACY_RISK_REVIEW_LANGUAGE, buildBuilderCostPrivacyRiskReviewStableKey };

const BUILDER_COST_PRIVACY_RISK_REVIEW_SLUG = "builder-cost-privacy-risk-review";

export function buildBuilderCostPrivacyRiskReview(input: UniversalBuilderCockpitReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalBuilderCockpitReview(BUILDER_COST_PRIVACY_RISK_REVIEW_SLUG, input);
}

export function buildBuilderCostPrivacyRiskReviewItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalBuilderCockpitReviewPackets(BUILDER_COST_PRIVACY_RISK_REVIEW_SLUG);
}

export function buildBuilderCostPrivacyRiskReviewBoundary() {
  return buildUniversalBuilderCockpitReviewBoundary();
}

export function summarizeBuilderCostPrivacyRiskReview(model: { builderCostPrivacyRiskReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalBuilderCockpitReviewForSlug(BUILDER_COST_PRIVACY_RISK_REVIEW_SLUG, model.builderCostPrivacyRiskReviewItems);
}

export function buildBuilderCostPrivacyRiskReviewModel() {
  const builderCostPrivacyRiskReviewItems = buildBuilderCostPrivacyRiskReviewItems();
  const builderCostPrivacyRiskReviewModel = buildUniversalBuilderCockpitReviewModelForSlug(BUILDER_COST_PRIVACY_RISK_REVIEW_SLUG, builderCostPrivacyRiskReviewItems);
  return { ...builderCostPrivacyRiskReviewModel, builderCostPrivacyRiskReviewItems };
}
