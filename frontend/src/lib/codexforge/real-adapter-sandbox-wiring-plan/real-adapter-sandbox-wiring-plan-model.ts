import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_ADAPTER_SANDBOX_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealAdapterSandboxWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_ADAPTER_SANDBOX_WIRING_PLAN_LANGUAGE, buildRealAdapterSandboxWiringPlanStableKey };

const REAL_ADAPTER_SANDBOX_WIRING_PLAN_SLUG = "real-adapter-sandbox-wiring-plan";

export function buildRealAdapterSandboxWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_ADAPTER_SANDBOX_WIRING_PLAN_SLUG, input);
}

export function buildRealAdapterSandboxWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_ADAPTER_SANDBOX_WIRING_PLAN_SLUG);
}

export function buildRealAdapterSandboxWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealAdapterSandboxWiringPlan(model: { realAdapterSandboxWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_ADAPTER_SANDBOX_WIRING_PLAN_SLUG, model.realAdapterSandboxWiringPlanItems);
}

export function buildRealAdapterSandboxWiringPlanModel() {
  const realAdapterSandboxWiringPlanItems = buildRealAdapterSandboxWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_ADAPTER_SANDBOX_WIRING_PLAN_SLUG, realAdapterSandboxWiringPlanItems);
  return { ...model, realAdapterSandboxWiringPlanItems };
}
