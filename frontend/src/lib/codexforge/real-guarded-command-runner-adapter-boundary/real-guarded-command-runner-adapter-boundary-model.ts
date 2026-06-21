import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_GUARDED_COMMAND_RUNNER_ADAPTER_BOUNDARY_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildRealGuardedCommandRunnerAdapterBoundaryStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { REAL_GUARDED_COMMAND_RUNNER_ADAPTER_BOUNDARY_LANGUAGE, buildRealGuardedCommandRunnerAdapterBoundaryStableKey };

const REAL_GUARDED_COMMAND_RUNNER_ADAPTER_BOUNDARY_SLUG = "real-guarded-command-runner-adapter-boundary";

export function buildRealGuardedCommandRunnerAdapterBoundary(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(REAL_GUARDED_COMMAND_RUNNER_ADAPTER_BOUNDARY_SLUG, input);
}

export function buildRealGuardedCommandRunnerAdapterBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(REAL_GUARDED_COMMAND_RUNNER_ADAPTER_BOUNDARY_SLUG);
}

export function buildRealGuardedCommandRunnerAdapterBoundaryBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeRealGuardedCommandRunnerAdapterBoundary(model: { realGuardedCommandRunnerAdapterBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(REAL_GUARDED_COMMAND_RUNNER_ADAPTER_BOUNDARY_SLUG, model.realGuardedCommandRunnerAdapterBoundaryItems);
}

export function buildRealGuardedCommandRunnerAdapterBoundaryModel() {
  const realGuardedCommandRunnerAdapterBoundaryItems = buildRealGuardedCommandRunnerAdapterBoundaryItems();
  const realGuardedCommandRunnerAdapterBoundaryModel = buildBuildPlanBundleReviewModelForSlug(REAL_GUARDED_COMMAND_RUNNER_ADAPTER_BOUNDARY_SLUG, realGuardedCommandRunnerAdapterBoundaryItems);
  return { ...realGuardedCommandRunnerAdapterBoundaryModel, realGuardedCommandRunnerAdapterBoundaryItems };
}
