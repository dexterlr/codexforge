import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BROAD_CONTROLLED_BUILDER_BETA_CANDIDATE_LANGUAGE,
  buildAdapterExecutionBetaBoundary,
  buildAdapterExecutionBetaBoundaryBoundary,
  buildAdapterExecutionBetaBoundaryModelForSlug,
  buildAdapterExecutionBetaBoundaryPackets,
  buildAdapterExecutionBetaBoundaryStableKey as buildBroadControlledBuilderBetaCandidateStableKey,
  summarizeAdapterExecutionBetaBoundaryForSlug,
  type AdapterExecutionBetaBoundaryPacketInput,
} from "../adapter-execution-beta-boundary-kit";

export { BROAD_CONTROLLED_BUILDER_BETA_CANDIDATE_LANGUAGE, buildBroadControlledBuilderBetaCandidateStableKey };

const BROAD_CONTROLLED_BUILDER_BETA_CANDIDATE_SLUG = "broad-controlled-builder-beta-candidate";

export function buildBroadControlledBuilderBetaCandidate(input: AdapterExecutionBetaBoundaryPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterExecutionBetaBoundary(BROAD_CONTROLLED_BUILDER_BETA_CANDIDATE_SLUG, input);
}

export function buildBroadControlledBuilderBetaCandidateItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterExecutionBetaBoundaryPackets(BROAD_CONTROLLED_BUILDER_BETA_CANDIDATE_SLUG);
}

export function buildBroadControlledBuilderBetaCandidateBoundary() {
  return buildAdapterExecutionBetaBoundaryBoundary();
}

export function summarizeBroadControlledBuilderBetaCandidate(model: { broadControlledBuilderBetaCandidateItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterExecutionBetaBoundaryForSlug(BROAD_CONTROLLED_BUILDER_BETA_CANDIDATE_SLUG, model.broadControlledBuilderBetaCandidateItems);
}

export function buildBroadControlledBuilderBetaCandidateModel() {
  const broadControlledBuilderBetaCandidateItems = buildBroadControlledBuilderBetaCandidateItems();
  const model = buildAdapterExecutionBetaBoundaryModelForSlug(BROAD_CONTROLLED_BUILDER_BETA_CANDIDATE_SLUG, broadControlledBuilderBetaCandidateItems);
  return { ...model, broadControlledBuilderBetaCandidateItems };
}
