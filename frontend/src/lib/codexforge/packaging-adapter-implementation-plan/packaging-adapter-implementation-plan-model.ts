import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PACKAGING_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildPackagingAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { PACKAGING_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildPackagingAdapterImplementationPlanStableKey };

const PACKAGING_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "packaging-adapter-implementation-plan";

export function buildPackagingAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(PACKAGING_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildPackagingAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(PACKAGING_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildPackagingAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizePackagingAdapterImplementationPlan(model: { packagingAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(PACKAGING_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.packagingAdapterImplementationPlans);
}

export function buildPackagingAdapterImplementationPlanModel() {
  const packagingAdapterImplementationPlans = buildPackagingAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(PACKAGING_ADAPTER_IMPLEMENTATION_PLAN_SLUG, packagingAdapterImplementationPlans);
  return { ...model, packagingAdapterImplementationPlans };
}
