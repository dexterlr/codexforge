import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_REAL_ADAPTER_MVP_CANDIDATE_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstRealAdapterMvpCandidateStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_REAL_ADAPTER_MVP_CANDIDATE_LANGUAGE, buildFirstRealAdapterMvpCandidateStableKey };

const FIRST_REAL_ADAPTER_MVP_CANDIDATE_SLUG = "first-real-adapter-mvp-candidate";

export function buildFirstRealAdapterMvpCandidate(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_REAL_ADAPTER_MVP_CANDIDATE_SLUG, input);
}

export function buildFirstRealAdapterMvpCandidates(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_REAL_ADAPTER_MVP_CANDIDATE_SLUG);
}

export function buildFirstRealAdapterMvpCandidateBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstRealAdapterMvpCandidate(model: { firstRealAdapterMvpCandidates: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_REAL_ADAPTER_MVP_CANDIDATE_SLUG, model.firstRealAdapterMvpCandidates);
}

export function buildFirstRealAdapterMvpCandidateModel() {
  const firstRealAdapterMvpCandidates = buildFirstRealAdapterMvpCandidates();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_REAL_ADAPTER_MVP_CANDIDATE_SLUG, firstRealAdapterMvpCandidates);
  return { ...model, firstRealAdapterMvpCandidates };
}
