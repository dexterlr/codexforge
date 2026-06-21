import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_RECOVERY_CONTRACT_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandRecoveryContractStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_RECOVERY_CONTRACT_LANGUAGE, buildCommandRecoveryContractStableKey };

const COMMAND_RECOVERY_CONTRACT_SLUG = "command-recovery-contract";

export function buildCommandRecoveryContract(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_RECOVERY_CONTRACT_SLUG, input);
}

export function buildCommandRecoveryContractItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_RECOVERY_CONTRACT_SLUG);
}

export function buildCommandRecoveryContractBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandRecoveryContract(model: { commandRecoveryContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_RECOVERY_CONTRACT_SLUG, model.commandRecoveryContractItems);
}

export function buildCommandRecoveryContractModel() {
  const commandRecoveryContractItems = buildCommandRecoveryContractItems();
  const commandRecoveryContractModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_RECOVERY_CONTRACT_SLUG, commandRecoveryContractItems);
  return { ...commandRecoveryContractModel, commandRecoveryContractItems };
}
