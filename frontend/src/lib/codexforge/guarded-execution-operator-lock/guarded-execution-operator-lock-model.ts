import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_EXECUTION_OPERATOR_LOCK_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedExecutionOperatorLockStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_EXECUTION_OPERATOR_LOCK_LANGUAGE, buildGuardedExecutionOperatorLockStableKey };

const GUARDED_EXECUTION_OPERATOR_LOCK_SLUG = "guarded-execution-operator-lock";

export function buildGuardedExecutionOperatorLock(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_EXECUTION_OPERATOR_LOCK_SLUG, input);
}

export function buildGuardedExecutionOperatorLockItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_EXECUTION_OPERATOR_LOCK_SLUG);
}

export function buildGuardedExecutionOperatorLockBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedExecutionOperatorLock(model: { guardedExecutionOperatorLockItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_EXECUTION_OPERATOR_LOCK_SLUG, model.guardedExecutionOperatorLockItems);
}

export function buildGuardedExecutionOperatorLockModel() {
  const guardedExecutionOperatorLockItems = buildGuardedExecutionOperatorLockItems();
  const guardedExecutionOperatorLockModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_EXECUTION_OPERATOR_LOCK_SLUG, guardedExecutionOperatorLockItems);
  return { ...guardedExecutionOperatorLockModel, guardedExecutionOperatorLockItems };
}
