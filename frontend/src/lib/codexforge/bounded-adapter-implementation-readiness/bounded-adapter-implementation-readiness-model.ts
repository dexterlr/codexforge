import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BOUNDED_ADAPTER_IMPLEMENTATION_READINESS_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildBoundedAdapterImplementationReadinessStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { BOUNDED_ADAPTER_IMPLEMENTATION_READINESS_LANGUAGE, buildBoundedAdapterImplementationReadinessStableKey };

const BOUNDED_ADAPTER_IMPLEMENTATION_READINESS_SLUG = "bounded-adapter-implementation-readiness";

export function buildBoundedAdapterImplementationReadiness(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(BOUNDED_ADAPTER_IMPLEMENTATION_READINESS_SLUG, input);
}

export function buildBoundedAdapterImplementationReadinesses(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(BOUNDED_ADAPTER_IMPLEMENTATION_READINESS_SLUG);
}

export function buildBoundedAdapterImplementationReadinessBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeBoundedAdapterImplementationReadiness(model: { boundedAdapterImplementationReadinesses: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(BOUNDED_ADAPTER_IMPLEMENTATION_READINESS_SLUG, model.boundedAdapterImplementationReadinesses);
}

export function buildBoundedAdapterImplementationReadinessModel() {
  const boundedAdapterImplementationReadinesses = buildBoundedAdapterImplementationReadinesses();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(BOUNDED_ADAPTER_IMPLEMENTATION_READINESS_SLUG, boundedAdapterImplementationReadinesses);
  return { ...model, boundedAdapterImplementationReadinesses };
}
