import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_COCKPIT_INTEGRATION_CONTRACT_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandCockpitIntegrationContractStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_COCKPIT_INTEGRATION_CONTRACT_LANGUAGE, buildCommandCockpitIntegrationContractStableKey };

const COMMAND_COCKPIT_INTEGRATION_CONTRACT_SLUG = "command-cockpit-integration-contract";

export function buildCommandCockpitIntegrationContract(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_COCKPIT_INTEGRATION_CONTRACT_SLUG, input);
}

export function buildCommandCockpitIntegrationContractItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_COCKPIT_INTEGRATION_CONTRACT_SLUG);
}

export function buildCommandCockpitIntegrationContractBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandCockpitIntegrationContract(model: { commandCockpitIntegrationContractItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_COCKPIT_INTEGRATION_CONTRACT_SLUG, model.commandCockpitIntegrationContractItems);
}

export function buildCommandCockpitIntegrationContractModel() {
  const commandCockpitIntegrationContractItems = buildCommandCockpitIntegrationContractItems();
  const commandCockpitIntegrationContractModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_COCKPIT_INTEGRATION_CONTRACT_SLUG, commandCockpitIntegrationContractItems);
  return { ...commandCockpitIntegrationContractModel, commandCockpitIntegrationContractItems };
}
