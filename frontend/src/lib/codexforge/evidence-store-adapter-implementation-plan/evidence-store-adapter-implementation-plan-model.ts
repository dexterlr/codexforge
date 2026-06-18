import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildEvidenceStoreAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildEvidenceStoreAdapterImplementationPlanStableKey };

const EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "evidence-store-adapter-implementation-plan";

export function buildEvidenceStoreAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildEvidenceStoreAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildEvidenceStoreAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeEvidenceStoreAdapterImplementationPlan(model: { evidenceStoreAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.evidenceStoreAdapterImplementationPlans);
}

export function buildEvidenceStoreAdapterImplementationPlanModel() {
  const evidenceStoreAdapterImplementationPlans = buildEvidenceStoreAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(EVIDENCE_STORE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, evidenceStoreAdapterImplementationPlans);
  return { ...model, evidenceStoreAdapterImplementationPlans };
}
