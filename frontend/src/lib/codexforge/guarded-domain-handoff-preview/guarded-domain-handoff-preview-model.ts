import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_DOMAIN_HANDOFF_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedDomainHandoffPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_DOMAIN_HANDOFF_PREVIEW_LANGUAGE, buildGuardedDomainHandoffPreviewStableKey };

const GUARDED_DOMAIN_HANDOFF_PREVIEW_SLUG = "guarded-domain-handoff-preview";

export function buildGuardedDomainHandoffPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_DOMAIN_HANDOFF_PREVIEW_SLUG, input);
}

export function buildGuardedDomainHandoffPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_DOMAIN_HANDOFF_PREVIEW_SLUG);
}

export function buildGuardedDomainHandoffPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedDomainHandoffPreview(model: { guardedDomainHandoffPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_DOMAIN_HANDOFF_PREVIEW_SLUG, model.guardedDomainHandoffPreviewItems);
}

export function buildGuardedDomainHandoffPreviewModel() {
  const guardedDomainHandoffPreviewItems = buildGuardedDomainHandoffPreviewItems();
  const guardedDomainHandoffPreviewModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_DOMAIN_HANDOFF_PREVIEW_SLUG, guardedDomainHandoffPreviewItems);
  return { ...guardedDomainHandoffPreviewModel, guardedDomainHandoffPreviewItems };
}
