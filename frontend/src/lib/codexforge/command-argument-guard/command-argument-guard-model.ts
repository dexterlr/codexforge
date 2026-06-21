import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_ARGUMENT_GUARD_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandArgumentGuardStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_ARGUMENT_GUARD_LANGUAGE, buildCommandArgumentGuardStableKey };

const COMMAND_ARGUMENT_GUARD_SLUG = "command-argument-guard";

export function buildCommandArgumentGuard(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_ARGUMENT_GUARD_SLUG, input);
}

export function buildCommandArgumentGuardItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_ARGUMENT_GUARD_SLUG);
}

export function buildCommandArgumentGuardBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandArgumentGuard(model: { commandArgumentGuardItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_ARGUMENT_GUARD_SLUG, model.commandArgumentGuardItems);
}

export function buildCommandArgumentGuardModel() {
  const commandArgumentGuardItems = buildCommandArgumentGuardItems();
  const commandArgumentGuardModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_ARGUMENT_GUARD_SLUG, commandArgumentGuardItems);
  return { ...commandArgumentGuardModel, commandArgumentGuardItems };
}
