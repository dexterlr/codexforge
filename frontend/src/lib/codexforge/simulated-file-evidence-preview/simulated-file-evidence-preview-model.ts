import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_FILE_EVIDENCE_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedFileEvidencePreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_FILE_EVIDENCE_PREVIEW_LANGUAGE, buildSimulatedFileEvidencePreviewStableKey };

const SIMULATED_FILE_EVIDENCE_PREVIEW_SLUG = "simulated-file-evidence-preview";

export function buildSimulatedFileEvidencePreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_FILE_EVIDENCE_PREVIEW_SLUG, input);
}

export function buildSimulatedFileEvidencePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_FILE_EVIDENCE_PREVIEW_SLUG);
}

export function buildSimulatedFileEvidencePreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedFileEvidencePreview(model: { simulatedFileEvidencePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_FILE_EVIDENCE_PREVIEW_SLUG, model.simulatedFileEvidencePreviewItems);
}

export function buildSimulatedFileEvidencePreviewModel() {
  const simulatedFileEvidencePreviewItems = buildSimulatedFileEvidencePreviewItems();
  const simulatedFileEvidencePreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_FILE_EVIDENCE_PREVIEW_SLUG, simulatedFileEvidencePreviewItems);
  return { ...simulatedFileEvidencePreviewModel, simulatedFileEvidencePreviewItems };
}
