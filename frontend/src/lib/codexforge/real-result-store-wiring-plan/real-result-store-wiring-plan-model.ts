import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_RESULT_STORE_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealResultStoreWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_RESULT_STORE_WIRING_PLAN_LANGUAGE, buildRealResultStoreWiringPlanStableKey };

const REAL_RESULT_STORE_WIRING_PLAN_SLUG = "real-result-store-wiring-plan";

export function buildRealResultStoreWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_RESULT_STORE_WIRING_PLAN_SLUG, input);
}

export function buildRealResultStoreWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_RESULT_STORE_WIRING_PLAN_SLUG);
}

export function buildRealResultStoreWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealResultStoreWiringPlan(model: { realResultStoreWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_RESULT_STORE_WIRING_PLAN_SLUG, model.realResultStoreWiringPlanItems);
}

export function buildRealResultStoreWiringPlanModel() {
  const realResultStoreWiringPlanItems = buildRealResultStoreWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_RESULT_STORE_WIRING_PLAN_SLUG, realResultStoreWiringPlanItems);
  return { ...model, realResultStoreWiringPlanItems };
}
