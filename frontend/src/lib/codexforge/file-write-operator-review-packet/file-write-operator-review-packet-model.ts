import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_OPERATOR_REVIEW_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWriteOperatorReviewPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_OPERATOR_REVIEW_PACKET_LANGUAGE, buildFileWriteOperatorReviewPacketStableKey };

const FILE_WRITE_OPERATOR_REVIEW_PACKET_SLUG = "file-write-operator-review-packet";

export function buildFileWriteOperatorReviewPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_OPERATOR_REVIEW_PACKET_SLUG, input);
}

export function buildFileWriteOperatorReviewPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_OPERATOR_REVIEW_PACKET_SLUG);
}

export function buildFileWriteOperatorReviewPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWriteOperatorReviewPacket(model: { fileWriteOperatorReviewPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_OPERATOR_REVIEW_PACKET_SLUG, model.fileWriteOperatorReviewPacketItems);
}

export function buildFileWriteOperatorReviewPacketModel() {
  const fileWriteOperatorReviewPacketItems = buildFileWriteOperatorReviewPacketItems();
  const fileWriteOperatorReviewPacketModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_OPERATOR_REVIEW_PACKET_SLUG, fileWriteOperatorReviewPacketItems);
  return { ...fileWriteOperatorReviewPacketModel, fileWriteOperatorReviewPacketItems };
}
