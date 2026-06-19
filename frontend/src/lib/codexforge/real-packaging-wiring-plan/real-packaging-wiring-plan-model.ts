import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_PACKAGING_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealPackagingWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_PACKAGING_WIRING_PLAN_LANGUAGE, buildRealPackagingWiringPlanStableKey };

const REAL_PACKAGING_WIRING_PLAN_SLUG = "real-packaging-wiring-plan";

export function buildRealPackagingWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_PACKAGING_WIRING_PLAN_SLUG, input);
}

export function buildRealPackagingWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_PACKAGING_WIRING_PLAN_SLUG);
}

export function buildRealPackagingWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealPackagingWiringPlan(model: { realPackagingWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_PACKAGING_WIRING_PLAN_SLUG, model.realPackagingWiringPlanItems);
}

export function buildRealPackagingWiringPlanModel() {
  const realPackagingWiringPlanItems = buildRealPackagingWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_PACKAGING_WIRING_PLAN_SLUG, realPackagingWiringPlanItems);
  return { ...model, realPackagingWiringPlanItems };
}
