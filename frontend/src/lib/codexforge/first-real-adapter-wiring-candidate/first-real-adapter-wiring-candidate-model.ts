import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_REAL_ADAPTER_WIRING_CANDIDATE_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildFirstRealAdapterWiringCandidateStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { FIRST_REAL_ADAPTER_WIRING_CANDIDATE_LANGUAGE, buildFirstRealAdapterWiringCandidateStableKey };

const FIRST_REAL_ADAPTER_WIRING_CANDIDATE_SLUG = "first-real-adapter-wiring-candidate";

export function buildFirstRealAdapterWiringCandidate(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(FIRST_REAL_ADAPTER_WIRING_CANDIDATE_SLUG, input);
}

export function buildFirstRealAdapterWiringCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(FIRST_REAL_ADAPTER_WIRING_CANDIDATE_SLUG);
}

export function buildFirstRealAdapterWiringCandidateBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeFirstRealAdapterWiringCandidate(model: { firstRealAdapterWiringCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(FIRST_REAL_ADAPTER_WIRING_CANDIDATE_SLUG, model.firstRealAdapterWiringCandidateItems);
}

export function buildFirstRealAdapterWiringCandidateModel() {
  const firstRealAdapterWiringCandidateItems = buildFirstRealAdapterWiringCandidateItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(FIRST_REAL_ADAPTER_WIRING_CANDIDATE_SLUG, firstRealAdapterWiringCandidateItems);
  return { ...model, firstRealAdapterWiringCandidateItems };
}
