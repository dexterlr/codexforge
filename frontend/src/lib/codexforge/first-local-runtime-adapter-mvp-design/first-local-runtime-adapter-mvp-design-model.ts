import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_LOCAL_RUNTIME_ADAPTER_MVP_DESIGN_LANGUAGE,
  buildFirstRealAdapterMvpDesign,
  buildFirstRealAdapterMvpDesignBoundary,
  buildFirstRealAdapterMvpDesignModelForSlug,
  buildFirstRealAdapterMvpDesignPackets,
  buildFirstRealAdapterMvpDesignStableKey as buildFirstLocalRuntimeAdapterMvpDesignStableKey,
  summarizeFirstRealAdapterMvpDesignForSlug,
  type FirstRealAdapterMvpDesignPacketInput,
} from "../first-real-adapter-mvp-design-kit";

export { FIRST_LOCAL_RUNTIME_ADAPTER_MVP_DESIGN_LANGUAGE, buildFirstLocalRuntimeAdapterMvpDesignStableKey };

const FIRST_LOCAL_RUNTIME_ADAPTER_MVP_DESIGN_SLUG = "first-local-runtime-adapter-mvp-design";

export function buildFirstLocalRuntimeAdapterMvpDesign(input: FirstRealAdapterMvpDesignPacketInput): UniversalExecutionReviewPacket {
  return buildFirstRealAdapterMvpDesign(FIRST_LOCAL_RUNTIME_ADAPTER_MVP_DESIGN_SLUG, input);
}

export function buildFirstLocalRuntimeAdapterMvpDesigns(): UniversalExecutionReviewPacket[] {
  return buildFirstRealAdapterMvpDesignPackets(FIRST_LOCAL_RUNTIME_ADAPTER_MVP_DESIGN_SLUG);
}

export function buildFirstLocalRuntimeAdapterMvpDesignBoundary() {
  return buildFirstRealAdapterMvpDesignBoundary();
}

export function summarizeFirstLocalRuntimeAdapterMvpDesign(model: { firstLocalRuntimeAdapterMvpDesigns: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstRealAdapterMvpDesignForSlug(FIRST_LOCAL_RUNTIME_ADAPTER_MVP_DESIGN_SLUG, model.firstLocalRuntimeAdapterMvpDesigns);
}

export function buildFirstLocalRuntimeAdapterMvpDesignModel() {
  const firstLocalRuntimeAdapterMvpDesigns = buildFirstLocalRuntimeAdapterMvpDesigns();
  const model = buildFirstRealAdapterMvpDesignModelForSlug(FIRST_LOCAL_RUNTIME_ADAPTER_MVP_DESIGN_SLUG, firstLocalRuntimeAdapterMvpDesigns);
  return { ...model, firstLocalRuntimeAdapterMvpDesigns };
}
