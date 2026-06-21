import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_PREFLIGHT_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandPreflightReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_PREFLIGHT_REVIEW_LANGUAGE, buildCommandPreflightReviewStableKey };

const COMMAND_PREFLIGHT_REVIEW_SLUG = "command-preflight-review";

export function buildCommandPreflightReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_PREFLIGHT_REVIEW_SLUG, input);
}

export function buildCommandPreflightReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_PREFLIGHT_REVIEW_SLUG);
}

export function buildCommandPreflightReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandPreflightReview(model: { commandPreflightReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_PREFLIGHT_REVIEW_SLUG, model.commandPreflightReviewItems);
}

export function buildCommandPreflightReviewModel() {
  const commandPreflightReviewItems = buildCommandPreflightReviewItems();
  const commandPreflightReviewModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_PREFLIGHT_REVIEW_SLUG, commandPreflightReviewItems);
  return { ...commandPreflightReviewModel, commandPreflightReviewItems };
}
