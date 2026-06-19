import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ACTUAL_EVIDENCE_STORE_BOUNDARY_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildActualEvidenceStoreBoundaryStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { ACTUAL_EVIDENCE_STORE_BOUNDARY_LANGUAGE, buildActualEvidenceStoreBoundaryStableKey };

const ACTUAL_EVIDENCE_STORE_BOUNDARY_SLUG = "actual-evidence-store-boundary";

export function buildActualEvidenceStoreBoundary(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(ACTUAL_EVIDENCE_STORE_BOUNDARY_SLUG, input);
}

export function buildActualEvidenceStoreBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(ACTUAL_EVIDENCE_STORE_BOUNDARY_SLUG);
}

export function buildActualEvidenceStoreBoundaryBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeActualEvidenceStoreBoundary(model: { actualEvidenceStoreBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(ACTUAL_EVIDENCE_STORE_BOUNDARY_SLUG, model.actualEvidenceStoreBoundaryItems);
}

export function buildActualEvidenceStoreBoundaryModel() {
  const actualEvidenceStoreBoundaryItems = buildActualEvidenceStoreBoundaryItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(ACTUAL_EVIDENCE_STORE_BOUNDARY_SLUG, actualEvidenceStoreBoundaryItems);
  return { ...model, actualEvidenceStoreBoundaryItems };
}
