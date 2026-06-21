import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_RUNNER_ADAPTER_CONTRACT_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandRunnerAdapterContractStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_RUNNER_ADAPTER_CONTRACT_LANGUAGE, buildCommandRunnerAdapterContractStableKey };

const COMMAND_RUNNER_ADAPTER_CONTRACT_SLUG = "command-runner-adapter-contract";

export function buildCommandRunnerAdapterContract(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_RUNNER_ADAPTER_CONTRACT_SLUG, input);
}

export function buildCommandRunnerAdapterContractItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_RUNNER_ADAPTER_CONTRACT_SLUG);
}

export function buildCommandRunnerAdapterContractBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandRunnerAdapterContract(model: { commandRunnerAdapterContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_RUNNER_ADAPTER_CONTRACT_SLUG, model.commandRunnerAdapterContractItems);
}

export function buildCommandRunnerAdapterContractModel() {
  const commandRunnerAdapterContractItems = buildCommandRunnerAdapterContractItems();
  const commandRunnerAdapterContractModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_RUNNER_ADAPTER_CONTRACT_SLUG, commandRunnerAdapterContractItems);
  return { ...commandRunnerAdapterContractModel, commandRunnerAdapterContractItems };
}
