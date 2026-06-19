import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_EVIDENCE_STORE_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealEvidenceStoreWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_EVIDENCE_STORE_WIRING_PLAN_LANGUAGE, buildRealEvidenceStoreWiringPlanStableKey };

const REAL_EVIDENCE_STORE_WIRING_PLAN_SLUG = "real-evidence-store-wiring-plan";

export function buildRealEvidenceStoreWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_EVIDENCE_STORE_WIRING_PLAN_SLUG, input);
}

export function buildRealEvidenceStoreWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_EVIDENCE_STORE_WIRING_PLAN_SLUG);
}

export function buildRealEvidenceStoreWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealEvidenceStoreWiringPlan(model: { realEvidenceStoreWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_EVIDENCE_STORE_WIRING_PLAN_SLUG, model.realEvidenceStoreWiringPlanItems);
}

export function buildRealEvidenceStoreWiringPlanModel() {
  const realEvidenceStoreWiringPlanItems = buildRealEvidenceStoreWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_EVIDENCE_STORE_WIRING_PLAN_SLUG, realEvidenceStoreWiringPlanItems);
  return { ...model, realEvidenceStoreWiringPlanItems };
}
