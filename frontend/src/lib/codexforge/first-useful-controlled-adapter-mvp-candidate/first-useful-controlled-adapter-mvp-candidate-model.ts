import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_USEFUL_CONTROLLED_ADAPTER_MVP_CANDIDATE_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildFirstUsefulControlledAdapterMvpCandidateStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { FIRST_USEFUL_CONTROLLED_ADAPTER_MVP_CANDIDATE_LANGUAGE, buildFirstUsefulControlledAdapterMvpCandidateStableKey };

const FIRST_USEFUL_CONTROLLED_ADAPTER_MVP_CANDIDATE_SLUG = "first-useful-controlled-adapter-mvp-candidate";

export function buildFirstUsefulControlledAdapterMvpCandidate(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(FIRST_USEFUL_CONTROLLED_ADAPTER_MVP_CANDIDATE_SLUG, input);
}

export function buildFirstUsefulControlledAdapterMvpCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(FIRST_USEFUL_CONTROLLED_ADAPTER_MVP_CANDIDATE_SLUG);
}

export function buildFirstUsefulControlledAdapterMvpCandidateBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeFirstUsefulControlledAdapterMvpCandidate(model: { firstUsefulControlledAdapterMvpCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(FIRST_USEFUL_CONTROLLED_ADAPTER_MVP_CANDIDATE_SLUG, model.firstUsefulControlledAdapterMvpCandidateItems);
}

export function buildFirstUsefulControlledAdapterMvpCandidateModel() {
  const firstUsefulControlledAdapterMvpCandidateItems = buildFirstUsefulControlledAdapterMvpCandidateItems();
  const model = buildAdapterImplementationReviewModelForSlug(FIRST_USEFUL_CONTROLLED_ADAPTER_MVP_CANDIDATE_SLUG, firstUsefulControlledAdapterMvpCandidateItems);
  return { ...model, firstUsefulControlledAdapterMvpCandidateItems };
}
