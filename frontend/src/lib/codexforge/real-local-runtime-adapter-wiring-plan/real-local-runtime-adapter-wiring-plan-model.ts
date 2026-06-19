import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_LOCAL_RUNTIME_ADAPTER_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealLocalRuntimeAdapterWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_LOCAL_RUNTIME_ADAPTER_WIRING_PLAN_LANGUAGE, buildRealLocalRuntimeAdapterWiringPlanStableKey };

const REAL_LOCAL_RUNTIME_ADAPTER_WIRING_PLAN_SLUG = "real-local-runtime-adapter-wiring-plan";

export function buildRealLocalRuntimeAdapterWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_LOCAL_RUNTIME_ADAPTER_WIRING_PLAN_SLUG, input);
}

export function buildRealLocalRuntimeAdapterWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_LOCAL_RUNTIME_ADAPTER_WIRING_PLAN_SLUG);
}

export function buildRealLocalRuntimeAdapterWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealLocalRuntimeAdapterWiringPlan(model: { realLocalRuntimeAdapterWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_LOCAL_RUNTIME_ADAPTER_WIRING_PLAN_SLUG, model.realLocalRuntimeAdapterWiringPlanItems);
}

export function buildRealLocalRuntimeAdapterWiringPlanModel() {
  const realLocalRuntimeAdapterWiringPlanItems = buildRealLocalRuntimeAdapterWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_LOCAL_RUNTIME_ADAPTER_WIRING_PLAN_SLUG, realLocalRuntimeAdapterWiringPlanItems);
  return { ...model, realLocalRuntimeAdapterWiringPlanItems };
}
