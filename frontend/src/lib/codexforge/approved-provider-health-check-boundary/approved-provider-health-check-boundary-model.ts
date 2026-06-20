import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  APPROVED_PROVIDER_HEALTH_CHECK_BOUNDARY_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildApprovedProviderHealthCheckBoundaryStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { APPROVED_PROVIDER_HEALTH_CHECK_BOUNDARY_LANGUAGE, buildApprovedProviderHealthCheckBoundaryStableKey };

const APPROVED_PROVIDER_HEALTH_CHECK_BOUNDARY_SLUG = "approved-provider-health-check-boundary";

export function buildApprovedProviderHealthCheckBoundary(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(APPROVED_PROVIDER_HEALTH_CHECK_BOUNDARY_SLUG, input);
}

export function buildApprovedProviderHealthCheckBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(APPROVED_PROVIDER_HEALTH_CHECK_BOUNDARY_SLUG);
}

export function buildApprovedProviderHealthCheckBoundaryBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeApprovedProviderHealthCheckBoundary(model: { approvedProviderHealthCheckBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(APPROVED_PROVIDER_HEALTH_CHECK_BOUNDARY_SLUG, model.approvedProviderHealthCheckBoundaryItems);
}

export function buildApprovedProviderHealthCheckBoundaryModel() {
  const approvedProviderHealthCheckBoundaryItems = buildApprovedProviderHealthCheckBoundaryItems();
  const approvedProviderHealthCheckBoundaryModel = buildModelRouterProviderReadinessReviewModelForSlug(APPROVED_PROVIDER_HEALTH_CHECK_BOUNDARY_SLUG, approvedProviderHealthCheckBoundaryItems);
  return { ...approvedProviderHealthCheckBoundaryModel, approvedProviderHealthCheckBoundaryItems };
}
