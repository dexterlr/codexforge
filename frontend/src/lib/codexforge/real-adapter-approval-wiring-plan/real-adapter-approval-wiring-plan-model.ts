import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_ADAPTER_APPROVAL_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealAdapterApprovalWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_ADAPTER_APPROVAL_WIRING_PLAN_LANGUAGE, buildRealAdapterApprovalWiringPlanStableKey };

const REAL_ADAPTER_APPROVAL_WIRING_PLAN_SLUG = "real-adapter-approval-wiring-plan";

export function buildRealAdapterApprovalWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_ADAPTER_APPROVAL_WIRING_PLAN_SLUG, input);
}

export function buildRealAdapterApprovalWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_ADAPTER_APPROVAL_WIRING_PLAN_SLUG);
}

export function buildRealAdapterApprovalWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealAdapterApprovalWiringPlan(model: { realAdapterApprovalWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_ADAPTER_APPROVAL_WIRING_PLAN_SLUG, model.realAdapterApprovalWiringPlanItems);
}

export function buildRealAdapterApprovalWiringPlanModel() {
  const realAdapterApprovalWiringPlanItems = buildRealAdapterApprovalWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_ADAPTER_APPROVAL_WIRING_PLAN_SLUG, realAdapterApprovalWiringPlanItems);
  return { ...model, realAdapterApprovalWiringPlanItems };
}
