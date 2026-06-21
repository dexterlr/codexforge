import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_DRY_RUN_EXECUTION_ARM_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFirstDryRunExecutionArmCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FIRST_DRY_RUN_EXECUTION_ARM_CANDIDATE_LANGUAGE, buildFirstDryRunExecutionArmCandidateStableKey };

const FIRST_DRY_RUN_EXECUTION_ARM_CANDIDATE_SLUG = "first-dry-run-execution-arm-candidate";

export function buildFirstDryRunExecutionArmCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FIRST_DRY_RUN_EXECUTION_ARM_CANDIDATE_SLUG, input);
}

export function buildFirstDryRunExecutionArmCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FIRST_DRY_RUN_EXECUTION_ARM_CANDIDATE_SLUG);
}

export function buildFirstDryRunExecutionArmCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFirstDryRunExecutionArmCandidate(model: { firstDryRunExecutionArmCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FIRST_DRY_RUN_EXECUTION_ARM_CANDIDATE_SLUG, model.firstDryRunExecutionArmCandidateItems);
}

export function buildFirstDryRunExecutionArmCandidateModel() {
  const firstDryRunExecutionArmCandidateItems = buildFirstDryRunExecutionArmCandidateItems();
  const firstDryRunExecutionArmCandidateModel = buildBuildPlanBundleReviewModelForSlug(FIRST_DRY_RUN_EXECUTION_ARM_CANDIDATE_SLUG, firstDryRunExecutionArmCandidateItems);
  return { ...firstDryRunExecutionArmCandidateModel, firstDryRunExecutionArmCandidateItems };
}
