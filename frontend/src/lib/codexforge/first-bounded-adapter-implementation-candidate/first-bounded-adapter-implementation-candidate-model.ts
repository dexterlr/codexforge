import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_BOUNDED_ADAPTER_IMPLEMENTATION_CANDIDATE_LANGUAGE,
  buildBoundedAdapterImplementationPlan,
  buildBoundedAdapterImplementationPlanBoundary,
  buildBoundedAdapterImplementationPlanModelForSlug,
  buildBoundedAdapterImplementationPlanPackets,
  buildBoundedAdapterImplementationPlanStableKey as buildFirstBoundedAdapterImplementationCandidateStableKey,
  summarizeBoundedAdapterImplementationPlanForSlug,
  type BoundedAdapterImplementationPlanPacketInput,
} from "../bounded-adapter-implementation-plan-kit";

export { FIRST_BOUNDED_ADAPTER_IMPLEMENTATION_CANDIDATE_LANGUAGE, buildFirstBoundedAdapterImplementationCandidateStableKey };

const FIRST_BOUNDED_ADAPTER_IMPLEMENTATION_CANDIDATE_SLUG = "first-bounded-adapter-implementation-candidate";

export function buildFirstBoundedAdapterImplementationCandidate(input: BoundedAdapterImplementationPlanPacketInput): UniversalExecutionReviewPacket {
  return buildBoundedAdapterImplementationPlan(FIRST_BOUNDED_ADAPTER_IMPLEMENTATION_CANDIDATE_SLUG, input);
}

export function buildFirstBoundedAdapterImplementationCandidates(): UniversalExecutionReviewPacket[] {
  return buildBoundedAdapterImplementationPlanPackets(FIRST_BOUNDED_ADAPTER_IMPLEMENTATION_CANDIDATE_SLUG);
}

export function buildFirstBoundedAdapterImplementationCandidateBoundary() {
  return buildBoundedAdapterImplementationPlanBoundary();
}

export function summarizeFirstBoundedAdapterImplementationCandidate(model: { firstBoundedAdapterImplementationCandidates: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBoundedAdapterImplementationPlanForSlug(FIRST_BOUNDED_ADAPTER_IMPLEMENTATION_CANDIDATE_SLUG, model.firstBoundedAdapterImplementationCandidates);
}

export function buildFirstBoundedAdapterImplementationCandidateModel() {
  const firstBoundedAdapterImplementationCandidates = buildFirstBoundedAdapterImplementationCandidates();
  const model = buildBoundedAdapterImplementationPlanModelForSlug(FIRST_BOUNDED_ADAPTER_IMPLEMENTATION_CANDIDATE_SLUG, firstBoundedAdapterImplementationCandidates);
  return { ...model, firstBoundedAdapterImplementationCandidates };
}
