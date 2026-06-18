import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_RESULT_STORE_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstResultStoreAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_RESULT_STORE_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstResultStoreAdapterMvpDesignStableKey };

const FIRST_RESULT_STORE_ADAPTER_MVP_DESIGN_SLUG = "first-result-store-adapter-mvp-design";

export function buildFirstResultStoreAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_RESULT_STORE_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstResultStoreAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_RESULT_STORE_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstResultStoreAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstResultStoreAdapterMvpDesign(model: { firstResultStoreAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_RESULT_STORE_ADAPTER_MVP_DESIGN_SLUG, model.firstResultStoreAdapterMvpDesigns);
}

export function buildFirstResultStoreAdapterMvpDesignModel() {
  const firstResultStoreAdapterMvpDesigns = buildFirstResultStoreAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_RESULT_STORE_ADAPTER_MVP_DESIGN_SLUG, firstResultStoreAdapterMvpDesigns);
  return { ...model, firstResultStoreAdapterMvpDesigns };
}
