import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_DRY_RUN_HARNESS_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandDryRunHarnessStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_DRY_RUN_HARNESS_LANGUAGE, buildCommandDryRunHarnessStableKey };

const COMMAND_DRY_RUN_HARNESS_SLUG = "command-dry-run-harness";

export function buildCommandDryRunHarness(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_DRY_RUN_HARNESS_SLUG, input);
}

export function buildCommandDryRunHarnessItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_DRY_RUN_HARNESS_SLUG);
}

export function buildCommandDryRunHarnessBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandDryRunHarness(model: { commandDryRunHarnessItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_DRY_RUN_HARNESS_SLUG, model.commandDryRunHarnessItems);
}

export function buildCommandDryRunHarnessModel() {
  const commandDryRunHarnessItems = buildCommandDryRunHarnessItems();
  const commandDryRunHarnessModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_DRY_RUN_HARNESS_SLUG, commandDryRunHarnessItems);
  return { ...commandDryRunHarnessModel, commandDryRunHarnessItems };
}
