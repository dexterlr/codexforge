import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_WORKING_DIRECTORY_GUARD_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandWorkingDirectoryGuardStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_WORKING_DIRECTORY_GUARD_LANGUAGE, buildCommandWorkingDirectoryGuardStableKey };

const COMMAND_WORKING_DIRECTORY_GUARD_SLUG = "command-working-directory-guard";

export function buildCommandWorkingDirectoryGuard(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_WORKING_DIRECTORY_GUARD_SLUG, input);
}

export function buildCommandWorkingDirectoryGuardItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_WORKING_DIRECTORY_GUARD_SLUG);
}

export function buildCommandWorkingDirectoryGuardBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandWorkingDirectoryGuard(model: { commandWorkingDirectoryGuardItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_WORKING_DIRECTORY_GUARD_SLUG, model.commandWorkingDirectoryGuardItems);
}

export function buildCommandWorkingDirectoryGuardModel() {
  const commandWorkingDirectoryGuardItems = buildCommandWorkingDirectoryGuardItems();
  const commandWorkingDirectoryGuardModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_WORKING_DIRECTORY_GUARD_SLUG, commandWorkingDirectoryGuardItems);
  return { ...commandWorkingDirectoryGuardModel, commandWorkingDirectoryGuardItems };
}
