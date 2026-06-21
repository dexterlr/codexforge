import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_ENVIRONMENT_GUARD_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandEnvironmentGuardStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_ENVIRONMENT_GUARD_LANGUAGE, buildCommandEnvironmentGuardStableKey };

const COMMAND_ENVIRONMENT_GUARD_SLUG = "command-environment-guard";

export function buildCommandEnvironmentGuard(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_ENVIRONMENT_GUARD_SLUG, input);
}

export function buildCommandEnvironmentGuardItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_ENVIRONMENT_GUARD_SLUG);
}

export function buildCommandEnvironmentGuardBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandEnvironmentGuard(model: { commandEnvironmentGuardItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_ENVIRONMENT_GUARD_SLUG, model.commandEnvironmentGuardItems);
}

export function buildCommandEnvironmentGuardModel() {
  const commandEnvironmentGuardItems = buildCommandEnvironmentGuardItems();
  const commandEnvironmentGuardModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_ENVIRONMENT_GUARD_SLUG, commandEnvironmentGuardItems);
  return { ...commandEnvironmentGuardModel, commandEnvironmentGuardItems };
}
