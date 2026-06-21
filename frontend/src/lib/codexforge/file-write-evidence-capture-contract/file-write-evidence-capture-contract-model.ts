import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_EVIDENCE_CAPTURE_CONTRACT_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWriteEvidenceCaptureContractStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_EVIDENCE_CAPTURE_CONTRACT_LANGUAGE, buildFileWriteEvidenceCaptureContractStableKey };

const FILE_WRITE_EVIDENCE_CAPTURE_CONTRACT_SLUG = "file-write-evidence-capture-contract";

export function buildFileWriteEvidenceCaptureContract(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_EVIDENCE_CAPTURE_CONTRACT_SLUG, input);
}

export function buildFileWriteEvidenceCaptureContractItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_EVIDENCE_CAPTURE_CONTRACT_SLUG);
}

export function buildFileWriteEvidenceCaptureContractBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWriteEvidenceCaptureContract(model: { fileWriteEvidenceCaptureContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_EVIDENCE_CAPTURE_CONTRACT_SLUG, model.fileWriteEvidenceCaptureContractItems);
}

export function buildFileWriteEvidenceCaptureContractModel() {
  const fileWriteEvidenceCaptureContractItems = buildFileWriteEvidenceCaptureContractItems();
  const fileWriteEvidenceCaptureContractModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_EVIDENCE_CAPTURE_CONTRACT_SLUG, fileWriteEvidenceCaptureContractItems);
  return { ...fileWriteEvidenceCaptureContractModel, fileWriteEvidenceCaptureContractItems };
}
