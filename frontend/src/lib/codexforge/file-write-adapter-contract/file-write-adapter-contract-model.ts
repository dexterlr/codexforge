import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_ADAPTER_CONTRACT_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWriteAdapterContractStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_ADAPTER_CONTRACT_LANGUAGE, buildFileWriteAdapterContractStableKey };

const FILE_WRITE_ADAPTER_CONTRACT_SLUG = "file-write-adapter-contract";

export function buildFileWriteAdapterContract(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_ADAPTER_CONTRACT_SLUG, input);
}

export function buildFileWriteAdapterContractItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_ADAPTER_CONTRACT_SLUG);
}

export function buildFileWriteAdapterContractBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWriteAdapterContract(model: { fileWriteAdapterContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_ADAPTER_CONTRACT_SLUG, model.fileWriteAdapterContractItems);
}

export function buildFileWriteAdapterContractModel() {
  const fileWriteAdapterContractItems = buildFileWriteAdapterContractItems();
  const fileWriteAdapterContractModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_ADAPTER_CONTRACT_SLUG, fileWriteAdapterContractItems);
  return { ...fileWriteAdapterContractModel, fileWriteAdapterContractItems };
}
