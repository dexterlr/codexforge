import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BUILD_PLAN_EVIDENCE_MANIFEST_PACKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildBuildPlanEvidenceManifestPacketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { BUILD_PLAN_EVIDENCE_MANIFEST_PACKET_LANGUAGE, buildBuildPlanEvidenceManifestPacketStableKey };

const BUILD_PLAN_EVIDENCE_MANIFEST_PACKET_SLUG = "build-plan-evidence-manifest-packet";

export function buildBuildPlanEvidenceManifestPacket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(BUILD_PLAN_EVIDENCE_MANIFEST_PACKET_SLUG, input);
}

export function buildBuildPlanEvidenceManifestPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(BUILD_PLAN_EVIDENCE_MANIFEST_PACKET_SLUG);
}

export function buildBuildPlanEvidenceManifestPacketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeBuildPlanEvidenceManifestPacket(model: { buildPlanEvidenceManifestPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(BUILD_PLAN_EVIDENCE_MANIFEST_PACKET_SLUG, model.buildPlanEvidenceManifestPacketItems);
}

export function buildBuildPlanEvidenceManifestPacketModel() {
  const buildPlanEvidenceManifestPacketItems = buildBuildPlanEvidenceManifestPacketItems();
  const buildPlanEvidenceManifestPacketModel = buildBuildPlanBundleReviewModelForSlug(BUILD_PLAN_EVIDENCE_MANIFEST_PACKET_SLUG, buildPlanEvidenceManifestPacketItems);
  return { ...buildPlanEvidenceManifestPacketModel, buildPlanEvidenceManifestPacketItems };
}
