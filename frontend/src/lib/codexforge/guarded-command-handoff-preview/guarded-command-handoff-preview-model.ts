import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_COMMAND_HANDOFF_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedCommandHandoffPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_COMMAND_HANDOFF_PREVIEW_LANGUAGE, buildGuardedCommandHandoffPreviewStableKey };

const GUARDED_COMMAND_HANDOFF_PREVIEW_SLUG = "guarded-command-handoff-preview";

export function buildGuardedCommandHandoffPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_COMMAND_HANDOFF_PREVIEW_SLUG, input);
}

export function buildGuardedCommandHandoffPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_COMMAND_HANDOFF_PREVIEW_SLUG);
}

export function buildGuardedCommandHandoffPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedCommandHandoffPreview(model: { guardedCommandHandoffPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_COMMAND_HANDOFF_PREVIEW_SLUG, model.guardedCommandHandoffPreviewItems);
}

export function buildGuardedCommandHandoffPreviewModel() {
  const guardedCommandHandoffPreviewItems = buildGuardedCommandHandoffPreviewItems();
  const guardedCommandHandoffPreviewModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_COMMAND_HANDOFF_PREVIEW_SLUG, guardedCommandHandoffPreviewItems);
  return { ...guardedCommandHandoffPreviewModel, guardedCommandHandoffPreviewItems };
}
