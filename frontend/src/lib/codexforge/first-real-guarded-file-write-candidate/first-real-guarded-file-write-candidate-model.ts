import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_REAL_GUARDED_FILE_WRITE_CANDIDATE_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFirstRealGuardedFileWriteCandidateStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FIRST_REAL_GUARDED_FILE_WRITE_CANDIDATE_LANGUAGE, buildFirstRealGuardedFileWriteCandidateStableKey };

const FIRST_REAL_GUARDED_FILE_WRITE_CANDIDATE_SLUG = "first-real-guarded-file-write-candidate";

export function buildFirstRealGuardedFileWriteCandidate(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FIRST_REAL_GUARDED_FILE_WRITE_CANDIDATE_SLUG, input);
}

export function buildFirstRealGuardedFileWriteCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FIRST_REAL_GUARDED_FILE_WRITE_CANDIDATE_SLUG);
}

export function buildFirstRealGuardedFileWriteCandidateBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFirstRealGuardedFileWriteCandidate(model: { firstRealGuardedFileWriteCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FIRST_REAL_GUARDED_FILE_WRITE_CANDIDATE_SLUG, model.firstRealGuardedFileWriteCandidateItems);
}

export function buildFirstRealGuardedFileWriteCandidateModel() {
  const firstRealGuardedFileWriteCandidateItems = buildFirstRealGuardedFileWriteCandidateItems();
  const firstRealGuardedFileWriteCandidateModel = buildBuildPlanBundleReviewModelForSlug(FIRST_REAL_GUARDED_FILE_WRITE_CANDIDATE_SLUG, firstRealGuardedFileWriteCandidateItems);
  return { ...firstRealGuardedFileWriteCandidateModel, firstRealGuardedFileWriteCandidateItems };
}
