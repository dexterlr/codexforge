import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_RESULT_CAPTURE_CONTRACT_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandResultCaptureContractStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_RESULT_CAPTURE_CONTRACT_LANGUAGE, buildCommandResultCaptureContractStableKey };

const COMMAND_RESULT_CAPTURE_CONTRACT_SLUG = "command-result-capture-contract";

export function buildCommandResultCaptureContract(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_RESULT_CAPTURE_CONTRACT_SLUG, input);
}

export function buildCommandResultCaptureContractItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_RESULT_CAPTURE_CONTRACT_SLUG);
}

export function buildCommandResultCaptureContractBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandResultCaptureContract(model: { commandResultCaptureContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_RESULT_CAPTURE_CONTRACT_SLUG, model.commandResultCaptureContractItems);
}

export function buildCommandResultCaptureContractModel() {
  const commandResultCaptureContractItems = buildCommandResultCaptureContractItems();
  const commandResultCaptureContractModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_RESULT_CAPTURE_CONTRACT_SLUG, commandResultCaptureContractItems);
  return { ...commandResultCaptureContractModel, commandResultCaptureContractItems };
}
