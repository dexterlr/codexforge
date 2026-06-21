import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_RESULT_CAPTURE_CONTRACT_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWriteResultCaptureContractStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_RESULT_CAPTURE_CONTRACT_LANGUAGE, buildFileWriteResultCaptureContractStableKey };

const FILE_WRITE_RESULT_CAPTURE_CONTRACT_SLUG = "file-write-result-capture-contract";

export function buildFileWriteResultCaptureContract(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_RESULT_CAPTURE_CONTRACT_SLUG, input);
}

export function buildFileWriteResultCaptureContractItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_RESULT_CAPTURE_CONTRACT_SLUG);
}

export function buildFileWriteResultCaptureContractBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWriteResultCaptureContract(model: { fileWriteResultCaptureContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_RESULT_CAPTURE_CONTRACT_SLUG, model.fileWriteResultCaptureContractItems);
}

export function buildFileWriteResultCaptureContractModel() {
  const fileWriteResultCaptureContractItems = buildFileWriteResultCaptureContractItems();
  const fileWriteResultCaptureContractModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_RESULT_CAPTURE_CONTRACT_SLUG, fileWriteResultCaptureContractItems);
  return { ...fileWriteResultCaptureContractModel, fileWriteResultCaptureContractItems };
}
