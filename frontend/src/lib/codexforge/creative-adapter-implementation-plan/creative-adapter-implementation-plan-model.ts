import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  CREATIVE_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildCreativeAdapterImplementationPlanStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { CREATIVE_ADAPTER_IMPLEMENTATION_PLAN_LANGUAGE, buildCreativeAdapterImplementationPlanStableKey };

const CREATIVE_ADAPTER_IMPLEMENTATION_PLAN_SLUG = "creative-adapter-implementation-plan";

export function buildCreativeAdapterImplementationPlan(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(CREATIVE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, input);
}

export function buildCreativeAdapterImplementationPlans(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(CREATIVE_ADAPTER_IMPLEMENTATION_PLAN_SLUG);
}

export function buildCreativeAdapterImplementationPlanBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeCreativeAdapterImplementationPlan(model: { creativeAdapterImplementationPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(CREATIVE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, model.creativeAdapterImplementationPlans);
}

export function buildCreativeAdapterImplementationPlanModel() {
  const creativeAdapterImplementationPlans = buildCreativeAdapterImplementationPlans();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(CREATIVE_ADAPTER_IMPLEMENTATION_PLAN_SLUG, creativeAdapterImplementationPlans);
  return { ...model, creativeAdapterImplementationPlans };
}
