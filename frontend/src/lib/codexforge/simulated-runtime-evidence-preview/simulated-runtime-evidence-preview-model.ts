import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_RUNTIME_EVIDENCE_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedRuntimeEvidencePreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_RUNTIME_EVIDENCE_PREVIEW_LANGUAGE, buildSimulatedRuntimeEvidencePreviewStableKey };

const SIMULATED_RUNTIME_EVIDENCE_PREVIEW_SLUG = "simulated-runtime-evidence-preview";

export function buildSimulatedRuntimeEvidencePreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_RUNTIME_EVIDENCE_PREVIEW_SLUG, input);
}

export function buildSimulatedRuntimeEvidencePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_RUNTIME_EVIDENCE_PREVIEW_SLUG);
}

export function buildSimulatedRuntimeEvidencePreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedRuntimeEvidencePreview(model: { simulatedRuntimeEvidencePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_RUNTIME_EVIDENCE_PREVIEW_SLUG, model.simulatedRuntimeEvidencePreviewItems);
}

export function buildSimulatedRuntimeEvidencePreviewModel() {
  const simulatedRuntimeEvidencePreviewItems = buildSimulatedRuntimeEvidencePreviewItems();
  const simulatedRuntimeEvidencePreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_RUNTIME_EVIDENCE_PREVIEW_SLUG, simulatedRuntimeEvidencePreviewItems);
  return { ...simulatedRuntimeEvidencePreviewModel, simulatedRuntimeEvidencePreviewItems };
}
