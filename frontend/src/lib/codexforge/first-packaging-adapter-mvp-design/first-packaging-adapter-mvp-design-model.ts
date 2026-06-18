import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_PACKAGING_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstPackagingAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_PACKAGING_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstPackagingAdapterMvpDesignStableKey };

const FIRST_PACKAGING_ADAPTER_MVP_DESIGN_SLUG = "first-packaging-adapter-mvp-design";

export function buildFirstPackagingAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_PACKAGING_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstPackagingAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_PACKAGING_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstPackagingAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstPackagingAdapterMvpDesign(model: { firstPackagingAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_PACKAGING_ADAPTER_MVP_DESIGN_SLUG, model.firstPackagingAdapterMvpDesigns);
}

export function buildFirstPackagingAdapterMvpDesignModel() {
  const firstPackagingAdapterMvpDesigns = buildFirstPackagingAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_PACKAGING_ADAPTER_MVP_DESIGN_SLUG, firstPackagingAdapterMvpDesigns);
  return { ...model, firstPackagingAdapterMvpDesigns };
}
