import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_EVIDENCE_HANDOFF_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedEvidenceHandoffPreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_EVIDENCE_HANDOFF_PREVIEW_LANGUAGE, buildGuardedEvidenceHandoffPreviewStableKey };

const GUARDED_EVIDENCE_HANDOFF_PREVIEW_SLUG = "guarded-evidence-handoff-preview";

export function buildGuardedEvidenceHandoffPreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_EVIDENCE_HANDOFF_PREVIEW_SLUG, input);
}

export function buildGuardedEvidenceHandoffPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_EVIDENCE_HANDOFF_PREVIEW_SLUG);
}

export function buildGuardedEvidenceHandoffPreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedEvidenceHandoffPreview(model: { guardedEvidenceHandoffPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_EVIDENCE_HANDOFF_PREVIEW_SLUG, model.guardedEvidenceHandoffPreviewItems);
}

export function buildGuardedEvidenceHandoffPreviewModel() {
  const guardedEvidenceHandoffPreviewItems = buildGuardedEvidenceHandoffPreviewItems();
  const guardedEvidenceHandoffPreviewModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_EVIDENCE_HANDOFF_PREVIEW_SLUG, guardedEvidenceHandoffPreviewItems);
  return { ...guardedEvidenceHandoffPreviewModel, guardedEvidenceHandoffPreviewItems };
}
