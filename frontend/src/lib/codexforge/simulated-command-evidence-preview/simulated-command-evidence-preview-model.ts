import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  SIMULATED_COMMAND_EVIDENCE_PREVIEW_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildSimulatedCommandEvidencePreviewStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { SIMULATED_COMMAND_EVIDENCE_PREVIEW_LANGUAGE, buildSimulatedCommandEvidencePreviewStableKey };

const SIMULATED_COMMAND_EVIDENCE_PREVIEW_SLUG = "simulated-command-evidence-preview";

export function buildSimulatedCommandEvidencePreview(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(SIMULATED_COMMAND_EVIDENCE_PREVIEW_SLUG, input);
}

export function buildSimulatedCommandEvidencePreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(SIMULATED_COMMAND_EVIDENCE_PREVIEW_SLUG);
}

export function buildSimulatedCommandEvidencePreviewBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeSimulatedCommandEvidencePreview(model: { simulatedCommandEvidencePreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(SIMULATED_COMMAND_EVIDENCE_PREVIEW_SLUG, model.simulatedCommandEvidencePreviewItems);
}

export function buildSimulatedCommandEvidencePreviewModel() {
  const simulatedCommandEvidencePreviewItems = buildSimulatedCommandEvidencePreviewItems();
  const simulatedCommandEvidencePreviewModel = buildBuildPlanBundleReviewModelForSlug(SIMULATED_COMMAND_EVIDENCE_PREVIEW_SLUG, simulatedCommandEvidencePreviewItems);
  return { ...simulatedCommandEvidencePreviewModel, simulatedCommandEvidencePreviewItems };
}
