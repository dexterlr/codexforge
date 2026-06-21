import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_ROLLBACK_CONTRACT_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWriteRollbackContractStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_ROLLBACK_CONTRACT_LANGUAGE, buildFileWriteRollbackContractStableKey };

const FILE_WRITE_ROLLBACK_CONTRACT_SLUG = "file-write-rollback-contract";

export function buildFileWriteRollbackContract(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_ROLLBACK_CONTRACT_SLUG, input);
}

export function buildFileWriteRollbackContractItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_ROLLBACK_CONTRACT_SLUG);
}

export function buildFileWriteRollbackContractBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWriteRollbackContract(model: { fileWriteRollbackContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_ROLLBACK_CONTRACT_SLUG, model.fileWriteRollbackContractItems);
}

export function buildFileWriteRollbackContractModel() {
  const fileWriteRollbackContractItems = buildFileWriteRollbackContractItems();
  const fileWriteRollbackContractModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_ROLLBACK_CONTRACT_SLUG, fileWriteRollbackContractItems);
  return { ...fileWriteRollbackContractModel, fileWriteRollbackContractItems };
}
