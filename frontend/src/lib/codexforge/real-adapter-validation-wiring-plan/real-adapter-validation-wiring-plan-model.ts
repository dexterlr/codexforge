import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_ADAPTER_VALIDATION_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealAdapterValidationWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_ADAPTER_VALIDATION_WIRING_PLAN_LANGUAGE, buildRealAdapterValidationWiringPlanStableKey };

const REAL_ADAPTER_VALIDATION_WIRING_PLAN_SLUG = "real-adapter-validation-wiring-plan";

export function buildRealAdapterValidationWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_ADAPTER_VALIDATION_WIRING_PLAN_SLUG, input);
}

export function buildRealAdapterValidationWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_ADAPTER_VALIDATION_WIRING_PLAN_SLUG);
}

export function buildRealAdapterValidationWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealAdapterValidationWiringPlan(model: { realAdapterValidationWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_ADAPTER_VALIDATION_WIRING_PLAN_SLUG, model.realAdapterValidationWiringPlanItems);
}

export function buildRealAdapterValidationWiringPlanModel() {
  const realAdapterValidationWiringPlanItems = buildRealAdapterValidationWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_ADAPTER_VALIDATION_WIRING_PLAN_SLUG, realAdapterValidationWiringPlanItems);
  return { ...model, realAdapterValidationWiringPlanItems };
}
