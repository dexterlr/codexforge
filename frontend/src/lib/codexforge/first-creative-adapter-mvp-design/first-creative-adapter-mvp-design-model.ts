import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_CREATIVE_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstCreativeAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_CREATIVE_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstCreativeAdapterMvpDesignStableKey };

const FIRST_CREATIVE_ADAPTER_MVP_DESIGN_SLUG = "first-creative-adapter-mvp-design";

export function buildFirstCreativeAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_CREATIVE_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstCreativeAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_CREATIVE_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstCreativeAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstCreativeAdapterMvpDesign(model: { firstCreativeAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_CREATIVE_ADAPTER_MVP_DESIGN_SLUG, model.firstCreativeAdapterMvpDesigns);
}

export function buildFirstCreativeAdapterMvpDesignModel() {
  const firstCreativeAdapterMvpDesigns = buildFirstCreativeAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_CREATIVE_ADAPTER_MVP_DESIGN_SLUG, firstCreativeAdapterMvpDesigns);
  return { ...model, firstCreativeAdapterMvpDesigns };
}
