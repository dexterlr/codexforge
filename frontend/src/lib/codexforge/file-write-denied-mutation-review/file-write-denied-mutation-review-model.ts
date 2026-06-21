import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_DENIED_MUTATION_REVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWriteDeniedMutationReviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_DENIED_MUTATION_REVIEW_LANGUAGE, buildFileWriteDeniedMutationReviewStableKey };

const FILE_WRITE_DENIED_MUTATION_REVIEW_SLUG = "file-write-denied-mutation-review";

export function buildFileWriteDeniedMutationReview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_DENIED_MUTATION_REVIEW_SLUG, input);
}

export function buildFileWriteDeniedMutationReviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_DENIED_MUTATION_REVIEW_SLUG);
}

export function buildFileWriteDeniedMutationReviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWriteDeniedMutationReview(model: { fileWriteDeniedMutationReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_DENIED_MUTATION_REVIEW_SLUG, model.fileWriteDeniedMutationReviewItems);
}

export function buildFileWriteDeniedMutationReviewModel() {
  const fileWriteDeniedMutationReviewItems = buildFileWriteDeniedMutationReviewItems();
  const fileWriteDeniedMutationReviewModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_DENIED_MUTATION_REVIEW_SLUG, fileWriteDeniedMutationReviewItems);
  return { ...fileWriteDeniedMutationReviewModel, fileWriteDeniedMutationReviewItems };
}
