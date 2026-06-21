import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_EVIDENCE_CAPTURE_CONTRACT_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandEvidenceCaptureContractStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_EVIDENCE_CAPTURE_CONTRACT_LANGUAGE, buildCommandEvidenceCaptureContractStableKey };

const COMMAND_EVIDENCE_CAPTURE_CONTRACT_SLUG = "command-evidence-capture-contract";

export function buildCommandEvidenceCaptureContract(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_EVIDENCE_CAPTURE_CONTRACT_SLUG, input);
}

export function buildCommandEvidenceCaptureContractItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_EVIDENCE_CAPTURE_CONTRACT_SLUG);
}

export function buildCommandEvidenceCaptureContractBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandEvidenceCaptureContract(model: { commandEvidenceCaptureContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_EVIDENCE_CAPTURE_CONTRACT_SLUG, model.commandEvidenceCaptureContractItems);
}

export function buildCommandEvidenceCaptureContractModel() {
  const commandEvidenceCaptureContractItems = buildCommandEvidenceCaptureContractItems();
  const commandEvidenceCaptureContractModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_EVIDENCE_CAPTURE_CONTRACT_SLUG, commandEvidenceCaptureContractItems);
  return { ...commandEvidenceCaptureContractModel, commandEvidenceCaptureContractItems };
}
