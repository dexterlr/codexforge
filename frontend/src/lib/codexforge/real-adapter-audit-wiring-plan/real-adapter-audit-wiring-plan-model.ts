import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_ADAPTER_AUDIT_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealAdapterAuditWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_ADAPTER_AUDIT_WIRING_PLAN_LANGUAGE, buildRealAdapterAuditWiringPlanStableKey };

const REAL_ADAPTER_AUDIT_WIRING_PLAN_SLUG = "real-adapter-audit-wiring-plan";

export function buildRealAdapterAuditWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_ADAPTER_AUDIT_WIRING_PLAN_SLUG, input);
}

export function buildRealAdapterAuditWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_ADAPTER_AUDIT_WIRING_PLAN_SLUG);
}

export function buildRealAdapterAuditWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealAdapterAuditWiringPlan(model: { realAdapterAuditWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_ADAPTER_AUDIT_WIRING_PLAN_SLUG, model.realAdapterAuditWiringPlanItems);
}

export function buildRealAdapterAuditWiringPlanModel() {
  const realAdapterAuditWiringPlanItems = buildRealAdapterAuditWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_ADAPTER_AUDIT_WIRING_PLAN_SLUG, realAdapterAuditWiringPlanItems);
  return { ...model, realAdapterAuditWiringPlanItems };
}
