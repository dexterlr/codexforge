import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  REAL_FILE_WRITE_ADAPTER_WIRING_PLAN_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildRealFileWriteAdapterWiringPlanStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { REAL_FILE_WRITE_ADAPTER_WIRING_PLAN_LANGUAGE, buildRealFileWriteAdapterWiringPlanStableKey };

const REAL_FILE_WRITE_ADAPTER_WIRING_PLAN_SLUG = "real-file-write-adapter-wiring-plan";

export function buildRealFileWriteAdapterWiringPlan(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(REAL_FILE_WRITE_ADAPTER_WIRING_PLAN_SLUG, input);
}

export function buildRealFileWriteAdapterWiringPlanItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(REAL_FILE_WRITE_ADAPTER_WIRING_PLAN_SLUG);
}

export function buildRealFileWriteAdapterWiringPlanBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeRealFileWriteAdapterWiringPlan(model: { realFileWriteAdapterWiringPlanItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(REAL_FILE_WRITE_ADAPTER_WIRING_PLAN_SLUG, model.realFileWriteAdapterWiringPlanItems);
}

export function buildRealFileWriteAdapterWiringPlanModel() {
  const realFileWriteAdapterWiringPlanItems = buildRealFileWriteAdapterWiringPlanItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(REAL_FILE_WRITE_ADAPTER_WIRING_PLAN_SLUG, realFileWriteAdapterWiringPlanItems);
  return { ...model, realFileWriteAdapterWiringPlanItems };
}
