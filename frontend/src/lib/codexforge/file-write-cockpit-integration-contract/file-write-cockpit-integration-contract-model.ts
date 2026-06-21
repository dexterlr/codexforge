import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_COCKPIT_INTEGRATION_CONTRACT_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWriteCockpitIntegrationContractStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_COCKPIT_INTEGRATION_CONTRACT_LANGUAGE, buildFileWriteCockpitIntegrationContractStableKey };

const FILE_WRITE_COCKPIT_INTEGRATION_CONTRACT_SLUG = "file-write-cockpit-integration-contract";

export function buildFileWriteCockpitIntegrationContract(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_COCKPIT_INTEGRATION_CONTRACT_SLUG, input);
}

export function buildFileWriteCockpitIntegrationContractItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_COCKPIT_INTEGRATION_CONTRACT_SLUG);
}

export function buildFileWriteCockpitIntegrationContractBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWriteCockpitIntegrationContract(model: { fileWriteCockpitIntegrationContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_COCKPIT_INTEGRATION_CONTRACT_SLUG, model.fileWriteCockpitIntegrationContractItems);
}

export function buildFileWriteCockpitIntegrationContractModel() {
  const fileWriteCockpitIntegrationContractItems = buildFileWriteCockpitIntegrationContractItems();
  const fileWriteCockpitIntegrationContractModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_COCKPIT_INTEGRATION_CONTRACT_SLUG, fileWriteCockpitIntegrationContractItems);
  return { ...fileWriteCockpitIntegrationContractModel, fileWriteCockpitIntegrationContractItems };
}
