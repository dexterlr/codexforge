import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_ADAPTER_EVIDENCE_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedAdapterEvidencePreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_ADAPTER_EVIDENCE_PREVIEW_LANGUAGE, buildSimulatedAdapterEvidencePreviewStableKey };

const SIMULATED_ADAPTER_EVIDENCE_PREVIEW_SLUG = "simulated-adapter-evidence-preview";

export function buildSimulatedAdapterEvidencePreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_ADAPTER_EVIDENCE_PREVIEW_SLUG, input);
}

export function buildSimulatedAdapterEvidencePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_ADAPTER_EVIDENCE_PREVIEW_SLUG);
}

export function buildSimulatedAdapterEvidencePreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedAdapterEvidencePreview(model: { simulatedAdapterEvidencePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_ADAPTER_EVIDENCE_PREVIEW_SLUG, model.simulatedAdapterEvidencePreviewItems);
}

export function buildSimulatedAdapterEvidencePreviewModel() {
  const simulatedAdapterEvidencePreviewItems = buildSimulatedAdapterEvidencePreviewItems();
  const simulatedAdapterEvidencePreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_ADAPTER_EVIDENCE_PREVIEW_SLUG, simulatedAdapterEvidencePreviewItems);
  return { ...simulatedAdapterEvidencePreviewModel, simulatedAdapterEvidencePreviewItems };
}
