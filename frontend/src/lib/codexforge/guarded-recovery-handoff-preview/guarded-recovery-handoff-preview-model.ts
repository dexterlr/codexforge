import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_RECOVERY_HANDOFF_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedRecoveryHandoffPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_RECOVERY_HANDOFF_PREVIEW_LANGUAGE, buildGuardedRecoveryHandoffPreviewStableKey };

const GUARDED_RECOVERY_HANDOFF_PREVIEW_SLUG = "guarded-recovery-handoff-preview";

export function buildGuardedRecoveryHandoffPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_RECOVERY_HANDOFF_PREVIEW_SLUG, input);
}

export function buildGuardedRecoveryHandoffPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_RECOVERY_HANDOFF_PREVIEW_SLUG);
}

export function buildGuardedRecoveryHandoffPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedRecoveryHandoffPreview(model: { guardedRecoveryHandoffPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_RECOVERY_HANDOFF_PREVIEW_SLUG, model.guardedRecoveryHandoffPreviewItems);
}

export function buildGuardedRecoveryHandoffPreviewModel() {
  const guardedRecoveryHandoffPreviewItems = buildGuardedRecoveryHandoffPreviewItems();
  const guardedRecoveryHandoffPreviewModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_RECOVERY_HANDOFF_PREVIEW_SLUG, guardedRecoveryHandoffPreviewItems);
  return { ...guardedRecoveryHandoffPreviewModel, guardedRecoveryHandoffPreviewItems };
}
