import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_EXECUTION_PREFLIGHT_CHECKLIST_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedExecutionPreflightChecklistStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_EXECUTION_PREFLIGHT_CHECKLIST_LANGUAGE, buildGuardedExecutionPreflightChecklistStableKey };

const GUARDED_EXECUTION_PREFLIGHT_CHECKLIST_SLUG = "guarded-execution-preflight-checklist";

export function buildGuardedExecutionPreflightChecklist(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_EXECUTION_PREFLIGHT_CHECKLIST_SLUG, input);
}

export function buildGuardedExecutionPreflightChecklistItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_EXECUTION_PREFLIGHT_CHECKLIST_SLUG);
}

export function buildGuardedExecutionPreflightChecklistBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedExecutionPreflightChecklist(model: { guardedExecutionPreflightChecklistItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_EXECUTION_PREFLIGHT_CHECKLIST_SLUG, model.guardedExecutionPreflightChecklistItems);
}

export function buildGuardedExecutionPreflightChecklistModel() {
  const guardedExecutionPreflightChecklistItems = buildGuardedExecutionPreflightChecklistItems();
  const guardedExecutionPreflightChecklistModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_EXECUTION_PREFLIGHT_CHECKLIST_SLUG, guardedExecutionPreflightChecklistItems);
  return { ...guardedExecutionPreflightChecklistModel, guardedExecutionPreflightChecklistItems };
}
