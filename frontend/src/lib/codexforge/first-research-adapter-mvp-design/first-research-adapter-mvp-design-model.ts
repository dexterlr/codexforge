import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_RESEARCH_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstResearchAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_RESEARCH_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstResearchAdapterMvpDesignStableKey };

const FIRST_RESEARCH_ADAPTER_MVP_DESIGN_SLUG = "first-research-adapter-mvp-design";

export function buildFirstResearchAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_RESEARCH_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstResearchAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_RESEARCH_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstResearchAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstResearchAdapterMvpDesign(model: { firstResearchAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_RESEARCH_ADAPTER_MVP_DESIGN_SLUG, model.firstResearchAdapterMvpDesigns);
}

export function buildFirstResearchAdapterMvpDesignModel() {
  const firstResearchAdapterMvpDesigns = buildFirstResearchAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_RESEARCH_ADAPTER_MVP_DESIGN_SLUG, firstResearchAdapterMvpDesigns);
  return { ...model, firstResearchAdapterMvpDesigns };
}
