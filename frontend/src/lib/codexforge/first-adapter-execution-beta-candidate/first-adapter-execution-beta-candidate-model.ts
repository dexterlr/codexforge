import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_ADAPTER_EXECUTION_BETA_CANDIDATE_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildFirstAdapterExecutionBetaCandidateStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { FIRST_ADAPTER_EXECUTION_BETA_CANDIDATE_LANGUAGE, buildFirstAdapterExecutionBetaCandidateStableKey };

const FIRST_ADAPTER_EXECUTION_BETA_CANDIDATE_SLUG = "first-adapter-execution-beta-candidate";

export function buildFirstAdapterExecutionBetaCandidate(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(FIRST_ADAPTER_EXECUTION_BETA_CANDIDATE_SLUG, input);
}

export function buildFirstAdapterExecutionBetaCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(FIRST_ADAPTER_EXECUTION_BETA_CANDIDATE_SLUG);
}

export function buildFirstAdapterExecutionBetaCandidateBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeFirstAdapterExecutionBetaCandidate(model: { firstAdapterExecutionBetaCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(FIRST_ADAPTER_EXECUTION_BETA_CANDIDATE_SLUG, model.firstAdapterExecutionBetaCandidateItems);
}

export function buildFirstAdapterExecutionBetaCandidateModel() {
  const firstAdapterExecutionBetaCandidateItems = buildFirstAdapterExecutionBetaCandidateItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(FIRST_ADAPTER_EXECUTION_BETA_CANDIDATE_SLUG, firstAdapterExecutionBetaCandidateItems);
  return { ...model, firstAdapterExecutionBetaCandidateItems };
}
