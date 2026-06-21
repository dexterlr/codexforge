import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CONTROLLED_DRY_RUN_EXECUTION_HANDOFF_RELEASE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildControlledDryRunExecutionHandoffReleaseCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { CONTROLLED_DRY_RUN_EXECUTION_HANDOFF_RELEASE_CANDIDATE_LANGUAGE, buildControlledDryRunExecutionHandoffReleaseCandidateStableKey };

const CONTROLLED_DRY_RUN_EXECUTION_HANDOFF_RELEASE_CANDIDATE_SLUG = "controlled-dry-run-execution-handoff-release-candidate";

export function buildControlledDryRunExecutionHandoffReleaseCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(CONTROLLED_DRY_RUN_EXECUTION_HANDOFF_RELEASE_CANDIDATE_SLUG, input);
}

export function buildControlledDryRunExecutionHandoffReleaseCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(CONTROLLED_DRY_RUN_EXECUTION_HANDOFF_RELEASE_CANDIDATE_SLUG);
}

export function buildControlledDryRunExecutionHandoffReleaseCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeControlledDryRunExecutionHandoffReleaseCandidate(model: { controlledDryRunExecutionHandoffReleaseCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(CONTROLLED_DRY_RUN_EXECUTION_HANDOFF_RELEASE_CANDIDATE_SLUG, model.controlledDryRunExecutionHandoffReleaseCandidateItems);
}

export function buildControlledDryRunExecutionHandoffReleaseCandidateModel() {
  const controlledDryRunExecutionHandoffReleaseCandidateItems = buildControlledDryRunExecutionHandoffReleaseCandidateItems();
  const controlledDryRunExecutionHandoffReleaseCandidateModel = buildBuildPlanBundleReviewModelForSlug(CONTROLLED_DRY_RUN_EXECUTION_HANDOFF_RELEASE_CANDIDATE_SLUG, controlledDryRunExecutionHandoffReleaseCandidateItems);
  return { ...controlledDryRunExecutionHandoffReleaseCandidateModel, controlledDryRunExecutionHandoffReleaseCandidateItems };
}
